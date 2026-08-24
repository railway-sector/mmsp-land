/* eslint-disable @typescript-eslint/no-unused-expressions */
import { use, useEffect, useMemo, useRef, useState } from "react";
import {
  handedOverLotLayer,
  lotLayer,
  publicLotLayer,
  subterraenanLots18_layer,
  tobeHandedOverLotLayer,
} from "../layers";
import {
  thousands_separators,
  zoomToLayer,
  fieldStatistic,
  useDateFields,
  toAsofdate,
} from "../query";
import "@esri/calcite-components/components/calcite-checkbox";
import "@esri/calcite-components/components/calcite-label";
import {
  cp_f,
  dark_bkColor,
  labelColor,
  lot_ho_f,
  lot_id_f,
  lot_section_f,
  lot_status_f,
  lot_status_q,
  lot_type_f,
  lot_xho_f,
  opacity,
  valueColor,
  white_bkColor,
} from "../uniqueValues";
import { ArcgisMap } from "@arcgis/map-components/dist/components/arcgis-map";
import { useQuery } from "@tanstack/react-query";
import type { ChartResponse } from "../interfaceKeys";
import { queryDefinitionExpression } from "../queryDefinition";
import {
  chartSetter,
  legendSetter,
  rootSetter,
  seriesSetter,
} from "../chartSetter";
// import ChartPieSeriesRender from "chart-pie-series-render";
import { MyContext } from "../contexts/MyContext";
import ChartPieSeries from "chart-pie-series";
import ChartPieSeriesRender from "../chartrender";
import QueryExpressionLayers from "query-layers-expression";

function useLotData(
  cpackage: string,
  landtype: string,
  landsection: string,
  statusField: string,
  hoField: string,
  xhoField: string,
  baseFilter: any,
) {
  return useQuery<ChartResponse | any>({
    queryKey: [
      cpackage,
      landtype,
      landsection,
      statusField,
      lot_status_f,
      lotLayer,
      baseFilter,
    ],
    queryFn: async () => {
      const q1 = new QueryExpressionLayers({
        ...baseFilter,
      });

      const q2 = new QueryExpressionLayers({
        ...baseFilter,
        qExpression: `${statusField} IS NULL`,
      });

      queryDefinitionExpression({
        queryExpression: q1.queryExpression(),
        featureLayer: [
          lotLayer,
          handedOverLotLayer,
          publicLotLayer,
          tobeHandedOverLotLayer,
          subterraenanLots18_layer,
        ],
      });

      const sharedArgs = { where: q1.queryExpression(), layer: lotLayer };

      const [chartData, totaln, publicn, total_ho, total_tobe_ho] =
        await Promise.all([
          //--- chart data
          new ChartPieSeries({
            ...sharedArgs,
            statusList: lot_status_q,
            statusField: statusField,
            statisticField: statusField,
            statisticType: "count",
          }).pieSeries(),

          //--- total number of lots (public + private)
          fieldStatistic({
            ...sharedArgs,
            statisticField: lot_id_f,
            statisticType: "count",
          }),

          //--- Public lot
          fieldStatistic({
            where: q2.queryExpression(),
            layer: lotLayer,
            statisticField: lot_id_f,
            statisticType: "count",
          }),

          //--- Number of handed-over lots (GC to JV)
          fieldStatistic({
            ...sharedArgs,
            statisticField: hoField,
            statisticType: "sum",
          }),

          //--- Number of To-be-handed-over lots (to JV)
          fieldStatistic({
            ...sharedArgs,
            statisticField: xhoField,
            statisticType: "sum",
          }),
        ]);

      //--- Percent handed over
      const perc_ho = ((total_ho / totaln) * 100).toFixed(1);

      //--- Percent to-be-handed-over
      const perc_tobe_ho = ((total_tobe_ho / totaln) * 100).toFixed(1);

      return {
        chartData: chartData || [],
        totaln,
        publicn,
        total_ho,
        total_tobe_ho,
        perc_ho,
        perc_tobe_ho,
        q1,
      };
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // staleTime: Infinity,
  });
}

const ChartLot = () => {
  const {
    asofdate,
    timesliderOn,
    newStatusField,
    newJvField,
    newNyField,
    cpackage,
    landtype,
    landsection,
    updateBkColor,
  } = use(MyContext);
  const arcgisMap = document.querySelector("arcgis-map") as ArcgisMap;
  const [chartPanelwidth, setChartPanelwidth] = useState<any>();
  const [isbkSwitch, setIsBkSwitch] = useState<boolean>(false);

  //--- Initial date to display
  const { data: dateList } = useDateFields(lotLayer);
  const latestDate = toAsofdate(dateList?.latestdate);

  //--- Update background color
  useEffect(() => {
    updateBkColor(isbkSwitch ? white_bkColor : dark_bkColor);
  }, [isbkSwitch]);

  //--- Update label & vale color
  const label_col = useMemo(
    () => (isbkSwitch ? dark_bkColor : labelColor),
    [isbkSwitch],
  );

  const value_col = useMemo(
    () => (isbkSwitch ? dark_bkColor : valueColor),
    [isbkSwitch],
  );

  //--- Base filter
  const baseFilter = {
    qFields: [cp_f, lot_type_f, lot_section_f],
    qValues: [cpackage, landtype, landsection],
  };

  //--- Generate chart data
  const { data, isLoading } = useLotData(
    cpackage,
    landtype,
    landsection,
    timesliderOn ? newStatusField : lot_status_f,
    timesliderOn ? newJvField : lot_ho_f,
    timesliderOn ? newNyField : lot_xho_f,
    baseFilter,
  );

  const chartData = data?.chartData || [];
  const lotNumber = data?.totaln || 0;
  const total_handedOver = data?.total_ho || 0;
  const total_tobe_handedOver = data?.total_tobe_ho || 0;
  const public_lotn = data?.publicn || 0;
  const perc_handedOver = data?.perc_ho || 0;
  const perce_tobe_handedOver = data?.perc_tobe_ho || 0;

  // Chart Resize parameters
  const new_fontSize = chartPanelwidth / 28;
  const new_valueSize = chartPanelwidth / 16;
  const new_pieSeriesScale = 220;
  const new_pieInnerValueFontSize = "1.1rem";
  const new_pieInnerLabelFontSize = "0.45em";

  // 1. Land Acquisition
  const pieSeriesRef = useRef<unknown | any | undefined>({});
  const legendRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const chartID = "pie-two";

  const zoomFiltersRef = useRef(
    `${cpackage}-${landtype}-${landsection}-${timesliderOn}`,
  );

  //---  Pie Chart Renderer
  useEffect(() => {
    const currentZoomFilters = `${cpackage}-${landtype}-${landsection}-${timesliderOn}`;

    if (currentZoomFilters !== zoomFiltersRef.current) {
      zoomFiltersRef.current = currentZoomFilters;
      if (!timesliderOn) zoomToLayer(lotLayer, arcgisMap?.view);
    }

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
      scale: 1.7,
    });

    pieSeries.slices.template.setAll({
      fillOpacity: 0.9,
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

    // chart renderer
    new ChartPieSeriesRender({
      chart,
      pieSeries: pieSeries,
      legend,
      root,
      qChart: data?.q1,
      q2Expression: undefined,
      status_field: timesliderOn ? newStatusField : lot_status_f,
      view: arcgisMap?.view,
      updateChartPanelwidth: setChartPanelwidth,
      data: chartData,
      seriesScale: new_pieSeriesScale,
      seriesOpacity: opacity,
      innerLabel: "PRIVATE LOTS",
      innerLabelFontSize: new_pieInnerLabelFontSize,
      innerValueFontSize: new_pieInnerValueFontSize,
      layer: lotLayer,
      statusArray: lot_status_q,
      bkg_color_switch: isbkSwitch,
      seriesFillHash: undefined,
    }).chartDataRenderer();

    return () => {
      root.dispose();
    };
  }, [chartID, chartData, isbkSwitch]);

  useEffect(() => {
    pieSeriesRef.current?.data.setAll(chartData);
    legendRef.current?.data.setAll(pieSeriesRef.current.dataItems);
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", gap: "65px" }}>
        <dl style={{ alignItems: "center" }}>
          <dt style={{ color: label_col, fontSize: `${new_fontSize}px` }}>
            TOTAL LOTS
          </dt>
          <dd
            style={{
              color: value_col,
              fontSize: `${new_valueSize}px`,
              fontWeight: "bold",
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
              opacity: isLoading ? 0 : 1,
              textAlign: "center",
            }}
          >
            {thousands_separators(lotNumber)}
          </dd>
        </dl>

        {/* Public Lot Number */}
        <dl style={{ alignItems: "center", marginRight: "6%" }}>
          <dt style={{ color: label_col, fontSize: `${new_fontSize}px` }}>
            PUBLIC LOTS
          </dt>
          <dd
            style={{
              color: value_col,
              fontSize: `${new_valueSize}px`,
              fontWeight: "bold",
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
              opacity: isLoading ? 0 : 1,
              textAlign: "center",
            }}
          >
            {thousands_separators(public_lotn)}
          </dd>
        </dl>
      </div>

      <div style={{ color: value_col, float: "right", marginRight: "5px" }}>
        {asofdate ? `As of ${asofdate}` : `As of ${latestDate}`}
      </div>

      {/* Lot Chart */}
      <div
        id={chartID}
        style={{
          width: "100%",
          height: "55vh",
          backgroundColor: "rgb(0,0,0,0)",
          color: "white",
          marginTop: "5%",
          opacity: isLoading ? 0 : 1,
        }}
      ></div>

      {/* Handed-Over */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "2%",
          marginRight: "2%",
        }}
      >
        <dl style={{ justifyContent: "space-between" }}>
          <dt style={{ color: label_col, fontSize: `${new_fontSize}px` }}>
            <div style={{ marginBottom: "5px" }}>HANDED-OVER (GC to JV)</div>
          </dt>
          <dd
            style={{
              color: value_col,
              fontSize: `${new_valueSize}px`,
              fontWeight: "bold",
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
              opacity: isLoading ? 0 : 1,
              textAlign: "center",
            }}
          >
            {perc_handedOver}% ({thousands_separators(total_handedOver)})
          </dd>
        </dl>

        <dl style={{ justifyContent: "space-between" }}>
          <dt style={{ color: label_col, fontSize: `${new_fontSize}px` }}>
            <div style={{ marginBottom: "5px" }}>TO BE HANDED-OVER (to JV)</div>
          </dt>
          <dd
            style={{
              color: value_col,
              fontSize: `${new_valueSize}px`,
              fontWeight: "bold",
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
              opacity: isLoading ? 0 : 1,
              textAlign: "center",
            }}
          >
            {perce_tobe_handedOver}% (
            {thousands_separators(total_tobe_handedOver)})
          </dd>
        </dl>
      </div>
      {/* switch white and black background */}
      <div
        style={{
          color: label_col,
          fontSize: "12px",
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "3%",
        }}
      >
        <span style={{ marginRight: "5px" }}>BLK BG</span>
        <calcite-switch
          oncalciteSwitchChange={(event: any) =>
            setIsBkSwitch(event.target.checked)
          }
        ></calcite-switch>{" "}
        <span style={{ marginLeft: "5px" }}>WHT BG</span>
      </div>
    </>
  );
};

export default ChartLot;
