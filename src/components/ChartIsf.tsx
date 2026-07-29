import { useRef, useState, useEffect, memo, use } from "react";
import { isfLayer } from "../layers";
import {
  makeQuery,
  pieChartData,
  PieChartRender,
  thousands_separators,
} from "../query";
import { ArcgisMap } from "@arcgis/map-components/components/arcgis-map";
import {
  cp_f,
  isf_status_f,
  isf_status_q,
  lot_section_f,
  lot_type_f,
  labelColor,
  valueColor,
} from "../uniqueValues";
import type { ChartResponse } from "../interfaceKeys";
import { useQuery } from "@tanstack/react-query";
import { queryDefinitionExpression } from "../queryDefinition";
import {
  chartSetter,
  legendSetter,
  maybeDisposeRoot,
  rootSetter,
  seriesSetter,
} from "../chartSetter";
import ChartPieSeriesRender from "chart-pie-series-render";
import { MyContext } from "../contexts/MyContext";
import ChartPieSeries from "chart-pie-series";

const ChartIsf = memo(() => {
  const { cpackage, landtype, landsection } = use(MyContext);

  const arcgisMap = document.querySelector("arcgis-map") as ArcgisMap;
  const [chartPanelwidth, setChartPanelwidth] = useState<any>();

  //--- Generate Chart data
  const qV = [cpackage, landtype, landsection];
  const qF = [cp_f, lot_type_f, lot_section_f];
  const queryc_isf = makeQuery(qV, qF, `${isf_status_f} IS NOT NULL`);

  //--- 2. Streamlined Data Fetching with useQuery
  const { data, isLoading } = useQuery<ChartResponse | any>({
    queryKey: [cpackage, landtype, landsection, isf_status_f],
    queryFn: async () => {
      queryDefinitionExpression({
        queryExpression: queryc_isf.queryExpression(),
        featureLayer: [isfLayer],
      });

      const chartData = await pieChartData({
        piechart: new ChartPieSeries(),
        qChart: queryc_isf,
        layer: isfLayer,
        statusList: isf_status_q,
        statusField: isf_status_f,
        statisticField: isf_status_f,
        statisticType: "count",
      });

      return {
        chartData: chartData[0] || [],
        totalNumber: chartData[1],
      };
    },
    staleTime: Infinity,
  });
  const chartData = data?.chartData || [];
  const totaln = data?.totalNumber || 0;

  const new_fontSize = chartPanelwidth / 22.3;
  // const new_valueSize = new_fontSize * 1.55;
  const new_imageSize = chartPanelwidth * 0.03;
  // const new_asofDateSize = chartPanelwidth * 0.032;
  const new_pieSeriesScale = 220;
  const new_pieInnerValueFontSize = "1.2rem";
  const new_pieInnerLabelFontSize = "0.45em";

  const pieSeriesRef = useRef<unknown | any | undefined>({});
  const legendRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const chartID = "isf-pie";

  useEffect(() => {
    maybeDisposeRoot(chartID);

    const root = rootSetter({ chartID: chartID });
    const chart = chartSetter(root);
    chartRef.current = chart;

    const pieSeries = seriesSetter({
      chart: chart,
      root: root,
      categoryField: "category",
      valueField: "value",
      legendValueText: "{valuePercentTotal.formatNumber('#.')}% ({value})",
      radius: 45,
      innerRadius: 28,
      scale: 1.6,
    });
    pieSeriesRef.current = pieSeries;
    chart.series.push(pieSeries);

    // Legend
    const legend = legendSetter({
      chart: chart,
      root: root,
      centerX: 50,
      x: 50,
    });
    legendRef.current = legend;
    legend.data.setAll(pieSeries.dataItems);

    // Render chart
    PieChartRender({
      render: new ChartPieSeriesRender(),
      chart,
      pieSeries: pieSeries,
      legend,
      root,
      qChart: queryc_isf,
      q2Expression: undefined,
      status_field: isf_status_f,
      view: arcgisMap?.view,
      updateChartPanelwidth: setChartPanelwidth,
      data: chartData,
      seriesScale: new_pieSeriesScale,
      innerLabel: "HOUSEHOLDS",
      innerLabelFontSize: new_pieInnerLabelFontSize,
      innerValueFontSize: new_pieInnerValueFontSize,
      layer: isfLayer,
      statusArray: isf_status_q,
      bkg_color_switch: false,
      seriesFillHash: undefined,
    });

    return () => {
      root.dispose();
    };
  }, [chartID, chartData]);

  useEffect(() => {
    pieSeriesRef.current?.data.setAll(chartData);
    legendRef.current?.data.setAll(pieSeriesRef.current.dataItems);
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <img
          src="https://EijiGorilla.github.io/Symbols/NLO_Logo.svg"
          alt="Land Logo"
          height={`${new_imageSize}%`}
          width={`${new_imageSize}%`}
          style={{ marginTop: "20px", marginLeft: "20px" }}
        />
        <dl style={{ alignItems: "center", marginRight: "30px" }}>
          <dt style={{ color: labelColor, fontSize: `${new_fontSize}px` }}>
            TOTAL FAMILIES
          </dt>
          <dd
            style={{
              color: valueColor,
              fontSize: "1.9rem",
              fontWeight: "bold",
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
              opacity: isLoading ? 0 : 1,
            }}
          >
            {thousands_separators(totaln)}
          </dd>
        </dl>
      </div>

      <div
        id={chartID}
        style={{
          width: "100%",
          height: "55vh",
          backgroundColor: "rgb(0,0,0,0)",
          color: "white",
          opacity: isLoading ? 0 : 1,
        }}
      ></div>
    </>
  );
}); // End of lotChartgs

export default ChartIsf;
