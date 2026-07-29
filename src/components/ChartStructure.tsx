/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useRef, useState, memo, use } from "react";
import { structureLayer } from "../layers";
import {
  pieChartData,
  thousands_separators,
  fieldStatistic,
  makeQuery,
  PieChartRender,
} from "../query";
import {
  cp_f,
  lot_section_f,
  lot_type_f,
  valueColor,
  str_remarks_f,
  str_status_f,
  str_status_q,
  labelColor,
} from "../uniqueValues";
import { ArcgisMap } from "@arcgis/map-components/components/arcgis-map";
import type { ChartResponse } from "../interfaceKeys";
import { useQuery } from "@tanstack/react-query";
import { queryDefinitionExpression } from "../queryDefinition";
import {
  chartSetter,
  legendSetter,
  maybeDisposeRoot,
  MyTheme,
  rootSetter,
  seriesSetter,
} from "../chartSetter";
import ChartPieSeriesRender from "chart-pie-series-render";
import { MyContext } from "../contexts/MyContext";
import ChartPieSeries from "chart-pie-series";

/// Draw chart
const ChartStructure = memo(() => {
  const { cpackage, landtype, landsection } = use(MyContext);

  const arcgisMap = document.querySelector("arcgis-map") as ArcgisMap;
  const [chartPanelwidth, setChartPanelwidth] = useState<any>();

  //--- Generate Chart data
  const qV = [cpackage, landtype, landsection];
  const qF = [cp_f, lot_type_f, lot_section_f];
  const queryc_str = makeQuery(qV, qF, `${str_status_f} >= 1`);

  const { data, isLoading } = useQuery<ChartResponse | any>({
    queryKey: [cpackage, landtype, landsection, str_status_f, structureLayer],
    queryFn: async () => {
      queryDefinitionExpression({
        queryExpression: queryc_str.queryExpression(),
        featureLayer: [structureLayer],
      });

      const queryc2_str = makeQuery(qV, qF, `${str_remarks_f} = 'Demolished'`);
      const queryc3_str = makeQuery(qV, qF, `${str_remarks_f} IS NOT NULL`);

      const [chartData, demolished, tobe_demolish] = await Promise.all([
        // Chart data
        pieChartData({
          piechart: new ChartPieSeries(),
          qChart: queryc_str,
          layer: structureLayer,
          statusList: str_status_q,
          statusField: str_status_f,
          statisticField: str_status_f,
          statisticType: "count",
        }),

        //--- numbe of demolished structures
        fieldStatistic({
          qChart: queryc2_str.queryExpression(),
          layer: structureLayer,
          statisticField: str_remarks_f,
          statisticType: "count",
        }),

        //--- number of structures subject to demolition
        fieldStatistic({
          qChart: queryc3_str.queryExpression(),
          layer: structureLayer,
          statisticField: str_remarks_f,
          statisticType: "count",
        }),
      ]);

      //--- percent demolished
      const perce_demolished = Math.round((demolished / tobe_demolish) * 100);

      return {
        chartData: chartData[0] || [],
        totalNumber: chartData[1],
        demolishedn: demolished,
        percDemolished: perce_demolished,
      };
    },
    staleTime: Infinity,
  });

  //--- Call chart data
  const chartData = data?.chartData || [];
  const totaln = data?.totalNumber || 0;
  const demolished_n = data?.demolishedn;
  const percDemolish_n = data?.percDemolished;

  const new_fontSize = chartPanelwidth / 22.3;
  const new_valueSize = new_fontSize * 1.55;
  const new_imageSize = chartPanelwidth * 0.03;
  // const new_asofDateSize = chartPanelwidth * 0.032;
  const new_pieSeriesScale = 220;
  const new_pieInnerValueFontSize = "1.2rem";
  const new_pieInnerLabelFontSize = "0.45em";

  // 1. Structure
  const pieSeriesRef = useRef<unknown | any | undefined>({});
  const legendRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const chartID = "structure-chart";

  useEffect(() => {
    maybeDisposeRoot(chartID);

    const root = rootSetter({ chartID: chartID, mytheme: MyTheme });
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
      scale: 1.7,
    });
    pieSeriesRef.current = pieSeries;
    chart.series.push(pieSeries);

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
      qChart: queryc_str,
      q2Expression: undefined,
      status_field: str_status_f,
      view: arcgisMap?.view,
      updateChartPanelwidth: setChartPanelwidth,
      data: chartData,
      seriesScale: new_pieSeriesScale,
      innerLabel: "STRUCTURES",
      innerLabelFontSize: new_pieInnerLabelFontSize,
      innerValueFontSize: new_pieInnerValueFontSize,
      layer: structureLayer,
      statusArray: str_status_q,
      bkg_color_switch: false,
      seriesFillHash: true,
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
          src="https://EijiGorilla.github.io/Symbols/House_Logo.svg"
          alt="Land Logo"
          height={`${new_imageSize}%`}
          width={`${new_imageSize}%`}
          style={{ marginTop: "10px", marginLeft: "20px" }}
        />
        <dl style={{ alignItems: "center", marginRight: "8%" }}>
          <dt style={{ color: labelColor, fontSize: `${new_fontSize}px` }}>
            TOTAL STRUCTURES
          </dt>
          <dd
            style={{
              color: valueColor,
              fontSize: `${new_valueSize}px`,
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
      {/* Structure Chart */}
      <div
        id={chartID}
        style={{
          height: "55vh",
          backgroundColor: "rgb(0,0,0,0)",
          color: "white",
          marginBottom: "7%",
          opacity: isLoading ? 0 : 1,
        }}
      ></div>

      {/* Demolished number */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <img
          src="https://EijiGorilla.github.io/Symbols/Structure_Demolished.svg"
          alt="Land Logo"
          height={`${new_imageSize}%`}
          width={"55px"}
          style={{ marginTop: "10px", marginLeft: "20px" }}
        />
        <dl style={{ alignItems: "center", marginRight: "35px" }}>
          <dt style={{ color: labelColor, fontSize: `${new_fontSize}px` }}>
            DEMOLISHED
          </dt>
          <dd
            style={{
              color: valueColor,
              fontSize: `${new_valueSize}px`,
              fontWeight: "bold",
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
              opacity: isLoading ? 0 : 1,
            }}
          >
            {percDemolish_n}% ({thousands_separators(demolished_n)})
          </dd>
        </dl>
      </div>
    </>
  );
}); // End of lotChartgs

export default ChartStructure;
