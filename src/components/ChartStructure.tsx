/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useRef, useState, memo } from "react";
import {
  piechart_struc,
  queryc_struc,
  queryc_struc2,
  queryc_struc3,
  structureLayer,
} from "../layers";
import { pieChartData, thousands_separators, fieldStatistic } from "../query";
import {
  primaryLabelColor,
  statusStructureField,
  statusStructureQuery,
  structureRemarksField,
  valueLabelColor,
} from "../uniqueValues";
import { ArcgisMap } from "@arcgis/map-components/components/arcgis-map";
import { locationKeys } from "../interfaceKeys";
import type { SelectedLocation, ChartResponse } from "../interfaceKeys";
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

/// Draw chart
const ChartStructure = memo(() => {
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
    queryKey: [
      cpackage,
      landType,
      landSection,
      statusStructureField,
      structureLayer,
    ],
    queryFn: async () => {
      const query_qValues = [cpackage, landType, landSection];

      queryc_struc.qValues = query_qValues;
      queryc_struc.qExpression = `${statusStructureField} >= 1`;

      queryDefinitionExpression({
        queryExpression: queryc_struc.queryExpression(),
        featureLayer: [structureLayer],
      });

      //--- Pie chart data
      const chartData = await pieChartData({
        piechart: piechart_struc,
        qChart: queryc_struc,
        layer: structureLayer,
        statusList: statusStructureQuery,
        statusField: statusStructureField,
        statisticField: statusStructureField,
        statisticType: "count",
      });

      //--- numbe of demolished structures
      queryc_struc2.qValues = query_qValues;
      queryc_struc2.qExpression = `${structureRemarksField} = 'Demolished'`;
      const demolished = await fieldStatistic({
        qChart: queryc_struc2.queryExpression(),
        layer: structureLayer,
        statisticField: structureRemarksField,
        statisticType: "count",
      });

      //--- number of structures subject to demolition
      queryc_struc3.qValues = query_qValues;
      queryc_struc3.qExpression = `${structureRemarksField} IS NOT NULL`;
      const tobe_demolish = await fieldStatistic({
        qChart: queryc_struc3.queryExpression(),
        layer: structureLayer,
        statisticField: structureRemarksField,
        statisticType: "count",
      });

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
    const crender = new ChartPieSeriesRender(
      chart,
      pieSeries,
      legend,
      root,
      queryc_struc,
      undefined,
      statusStructureField,
      arcgisMap?.view,
      setChartPanelwidth,
      chartData,
      new_pieSeriesScale,
      "STRUCTURES",
      new_pieInnerLabelFontSize,
      new_pieInnerValueFontSize,
      structureLayer,
      statusStructureQuery,
      false,
      true,
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
          src="https://EijiGorilla.github.io/Symbols/House_Logo.svg"
          alt="Land Logo"
          height={`${new_imageSize}%`}
          width={`${new_imageSize}%`}
          style={{ marginTop: "10px", marginLeft: "20px" }}
        />
        <dl style={{ alignItems: "center", marginRight: "25px" }}>
          <dt
            style={{ color: primaryLabelColor, fontSize: `${new_fontSize}px` }}
          >
            TOTAL STRUCTURES
          </dt>
          <dd
            style={{
              color: valueLabelColor,
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
          <dt
            style={{ color: primaryLabelColor, fontSize: `${new_fontSize}px` }}
          >
            DEMOLISHED
          </dt>
          <dd
            style={{
              color: valueLabelColor,
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
