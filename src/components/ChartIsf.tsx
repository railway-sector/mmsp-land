import { useRef, useState, useEffect, memo } from "react";
import { isfLayer, piechart_isf, queryc_isf } from "../layers";
import { pieChartData, thousands_separators } from "../query";
import { ArcgisMap } from "@arcgis/map-components/components/arcgis-map";
import {
  primaryLabelColor,
  statusIsf,
  statusIsfField,
  statusIsfQuery,
  valueLabelColor,
} from "../uniqueValues";
import { locationKeys } from "../interfaceKeys";
import type { SelectedLocation, ChartResponse } from "../interfaceKeys";
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

/// Draw chart
const ChartIsf = memo(() => {
  const arcgisMap = document.querySelector("arcgis-map") as ArcgisMap;
  const [chartPanelwidth, setChartPanelwidth] = useState<any>();

  //--- 1. Location state
  const { data: selectedLocation } = useQuery<SelectedLocation | any>({
    queryKey: locationKeys.selected,
    queryFn: async () => ({}),
    staleTime: Infinity,
  });
  const cpackage = selectedLocation?.cpackage;
  const landType = selectedLocation?.landType;
  const landSection = selectedLocation?.landSection;

  //--- 2. Streamlined Data Fetching with useQuery
  const { data, isLoading } = useQuery<ChartResponse | any>({
    queryKey: [cpackage, landType, landSection, statusIsfField],
    queryFn: async () => {
      queryc_isf.qValues = [
        cpackage,
        landType,
        landSection,
        statusIsf,
        isfLayer,
      ];
      queryDefinitionExpression({
        queryExpression: queryc_isf.queryExpression(),
        featureLayer: [isfLayer],
      });

      const chartData = await pieChartData({
        piechart: piechart_isf,
        qChart: queryc_isf,
        layer: isfLayer,
        statusList: statusIsfQuery, //statusIsf,
        statusField: statusIsfField,
        statisticField: statusIsfField,
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
    const crender = new ChartPieSeriesRender(
      chart,
      pieSeries,
      legend,
      root,
      queryc_isf,
      undefined,
      statusIsfField,
      arcgisMap?.view,
      setChartPanelwidth,
      chartData,
      new_pieSeriesScale,
      "FAMILIES",
      new_pieInnerLabelFontSize,
      new_pieInnerValueFontSize,
      isfLayer,
      statusIsfQuery,
      false,
      false,
    );
    crender.chartDataRenderer();

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
          <dt
            style={{ color: primaryLabelColor, fontSize: `${new_fontSize}px` }}
          >
            TOTAL FAMILIES
          </dt>
          <dd
            style={{
              color: valueLabelColor,
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
