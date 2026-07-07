/* eslint-disable @typescript-eslint/no-unused-expressions */
import { use, useEffect, useRef, useState } from "react";
import {
  handedOverLotLayer,
  lotLayer,
  piechart,
  publicLotLayer,
  queryc_lot,
  subterraenanLots18_layer,
  tobeHandedOverLotLayer,
} from "../layers";
import {
  pieChartData,
  thousands_separators,
  zoomToLayer,
  fieldStatistic,
} from "../query";
import "@esri/calcite-components/components/calcite-checkbox";
import "@esri/calcite-components/components/calcite-label";
import {
  default_bkColor,
  handedOverField,
  lot_id_field,
  lotStatusField,
  primaryLabelColor,
  statusLotQuery,
  tobeHandedOverField,
  white_bkColor,
} from "../uniqueValues";
import { ArcgisMap } from "@arcgis/map-components/dist/components/arcgis-map";
// import { chartRenderer } from "../chartRenderer";
import { useQuery } from "@tanstack/react-query";
import {
  timesliderFieldKeys,
  locationKeys,
  dateDisplayKeys,
  timesliderKeys,
} from "../interfaceKeys";
import type {
  SelectedLocation,
  TimesliderFieldsTypes,
  ChartResponse,
  DisplayDates,
  TimeSliderState,
} from "../interfaceKeys";
import { MyContext } from "./ChartMain";
import { queryDefinitionExpression } from "../queryDefinition";
import {
  chartSetter,
  legendSetter,
  rootSetter,
  seriesSetter,
} from "../chartSetter";
import ChartPieSeriesRender from "chart-pie-series-render";

const ChartLot = () => {
  const { updateBkColor } = use(MyContext);
  const arcgisMap = document.querySelector("arcgis-map") as ArcgisMap;
  const [chartPanelwidth, setChartPanelwidth] = useState<any>();
  const [bkcolorSwitch, setBkcolorSwitch] = useState<boolean>(false);
  const [labelColor, setLabelColor] = useState<any>(primaryLabelColor);

  //--- Update background color
  useEffect(() => {
    updateBkColor(bkcolorSwitch ? white_bkColor : default_bkColor);
    setLabelColor(bkcolorSwitch ? default_bkColor : primaryLabelColor);
  }, [bkcolorSwitch]);

  //--- 0. As of date
  const { data: newAsOfDate } = useQuery<DisplayDates | any>({
    queryKey: dateDisplayKeys.selected,
    queryFn: async () => ({}),
    staleTime: Infinity,
  });

  //--- 1. Location state
  const { data: selectedLocation } = useQuery<SelectedLocation | any>({
    queryKey: locationKeys.selected,
    queryFn: async () => ({}),
    staleTime: Infinity,
  });
  const cpackage = selectedLocation?.cpackage;
  const landType = selectedLocation?.landType;
  const landSection = selectedLocation?.landSection;

  //--- Updated fields for timeslider
  const { data: newStates } = useQuery<TimesliderFieldsTypes | any>({
    queryKey: timesliderFieldKeys.selected,
    queryFn: async () => ({}),
    staleTime: Infinity,
  });
  const status_field = newStates?.statusdateField;
  const ho_JVfield = newStates?.newHandedOverJVfield;
  const ho_NYfield = newStates?.newHandedoverNYfield;

  //--- timeslider state
  const { data: time } = useQuery<TimeSliderState | any>({
    queryKey: timesliderKeys.selected,
    queryFn: async () => ({}),
    staleTime: Infinity,
  });
  const timesliderstate = time?.timesliderstate;

  //--- New status field by timeslider state
  const stats_field = timesliderstate ? status_field : lotStatusField;

  //--- 2. Streamlined Data Fetching with useQuery
  const { data, isLoading } = useQuery<ChartResponse | any>({
    queryKey: [
      cpackage,
      landType,
      landSection,
      lotStatusField,
      status_field,
      timesliderstate,
      lotLayer,
    ],
    queryFn: async () => {
      queryc_lot.qValues = [cpackage, landType, landSection];

      queryDefinitionExpression({
        queryExpression: queryc_lot.queryExpression(),
        featureLayer: [
          lotLayer,
          handedOverLotLayer,
          publicLotLayer,
          tobeHandedOverLotLayer,
          subterraenanLots18_layer,
        ],
      });

      //--- chart data
      const chartData = await pieChartData({
        piechart: piechart,
        qChart: queryc_lot,
        layer: lotLayer,
        statusList: statusLotQuery,
        statusField: stats_field,
        statisticField: stats_field,
        statisticType: "count",
      });

      //--- total number of lots (public + private)
      const totaln = await fieldStatistic({
        qChart: queryc_lot.queryExpression(),
        layer: lotLayer,
        statisticField: lot_id_field,
        statisticType: "count",
      });

      //--- Number of handed-over lots (GC to JV)
      const total_ho = await fieldStatistic({
        qChart: queryc_lot.queryExpression(),
        layer: lotLayer,
        statisticField: timesliderstate ? ho_JVfield : handedOverField,
        statisticType: "sum",
      });

      //--- Number of To-be-handed-over lots (to JV)
      const total_tobe_ho = await fieldStatistic({
        qChart: queryc_lot.queryExpression(),
        layer: lotLayer,
        statisticField: timesliderstate ? ho_NYfield : tobeHandedOverField,
        statisticType: "sum",
      });

      //--- Public lot number
      const public_lotn = totaln - chartData[1];

      //--- Percent handed over
      const perc_ho = ((total_ho / totaln) * 100).toFixed(1);

      //--- Percent to-be-handed-over
      const perc_tob_ho = ((total_tobe_ho / totaln) * 100).toFixed(1);

      if (!timesliderstate) {
        zoomToLayer(lotLayer, arcgisMap);
      }

      return {
        chartData: chartData[0] || [],
        lotNumber: totaln,
        publicn: public_lotn,
        total_ho: total_ho,
        total_tob_ho: total_tobe_ho,
        perc_ho: perc_ho,
        perc_tobe_ho: perc_tob_ho,
      };
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // staleTime: Infinity,
  });
  const chartData = data?.chartData || [];
  const lotNumber = data?.lotNumber || 0;
  const total_handedOver = data?.total_ho || 0;
  const total_tobe_handedOver = data?.total_tob_ho || 0;
  const public_lotn = data?.publicn || 0;
  const perc_handedOver = data?.perc_ho || 0;
  const perce_tobe_handedOver = data?.perc_tobe_ho || 0;

  // Chart Resize parameters
  const new_fontSize = chartPanelwidth / 22.3;
  const new_valueSize = new_fontSize * 1.55;
  const new_imageSize = chartPanelwidth * 0.028;
  // const new_asofDateSize = chartPanelwidth * 0.032;
  const new_pieSeriesScale = 220;
  const new_pieInnerValueFontSize = "1.1rem";
  const new_pieInnerLabelFontSize = "0.45em";

  // 1. Land Acquisition
  const pieSeriesRef = useRef<unknown | any | undefined>({});
  const legendRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const chartID = "pie-two";

  // 1. Pie Chart for Land Acquisition
  useEffect(() => {
    // maybeDisposeRoot(chartID);

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

    //
    const crender = new ChartPieSeriesRender(
      chart,
      pieSeries,
      legend,
      root,
      queryc_lot,
      undefined,
      stats_field,
      arcgisMap?.view,
      setChartPanelwidth,
      chartData,
      new_pieSeriesScale,
      "PRIVATE LOTS",
      new_pieInnerLabelFontSize,
      new_pieInnerValueFontSize,
      lotLayer,
      statusLotQuery,
      bkcolorSwitch,
      false,
    );
    crender.chartDataRenderer();

    return () => {
      root.dispose();
    };
  }, [chartID, chartData, bkcolorSwitch]);

  useEffect(() => {
    pieSeriesRef.current?.data.setAll(chartData);
    legendRef.current?.data.setAll(pieSeriesRef.current.dataItems);
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <img
          src="https://EijiGorilla.github.io/Symbols/Land_logo.png"
          alt="Land Logo"
          height={`${new_imageSize}%`}
          width={`${new_imageSize}%`}
          style={{ marginTop: "15px", marginLeft: "20px" }}
        />
        <dl style={{ alignItems: "center" }}>
          <dt
            style={{
              color: labelColor,
              fontSize: `${new_fontSize}px`,
            }}
          >
            TOTAL LOTS
          </dt>
          <dd
            style={{
              color: labelColor,
              fontSize: `${new_valueSize}px`,
              fontWeight: "bold",
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
              opacity: isLoading ? 0 : 1,
            }}
          >
            {thousands_separators(lotNumber)}
          </dd>
        </dl>

        {/* Public Lot Number */}
        <dl style={{ alignItems: "center", marginRight: "20px" }}>
          <dt
            style={{
              color: labelColor,
              fontSize: `${new_fontSize}px`,
            }}
          >
            PUBLIC LOTS
          </dt>
          <dd
            style={{
              color: labelColor,
              fontSize: `${new_valueSize}px`,
              fontWeight: "bold",
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
              opacity: isLoading ? 0 : 1,
            }}
          >
            {thousands_separators(public_lotn)}
          </dd>
        </dl>
      </div>

      <div
        style={{
          float: "right",
          marginRight: "5px",
        }}
      >
        {!newAsOfDate?.asOfDate ? "" : "As of " + newAsOfDate?.asOfDate}
      </div>

      {/* Lot Chart */}
      <div
        id={chartID}
        style={{
          width: "100%",
          height: "55vh",
          backgroundColor: "rgb(0,0,0,0)",
          color: "white",
          marginBottom: "3%",
          opacity: isLoading ? 0 : 1,
        }}
      ></div>

      {/* Handed-Over */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <dl style={{ justifyContent: "space-between" }}>
          <dt style={{ color: labelColor, fontSize: `${new_fontSize}px` }}>
            <div style={{ marginBottom: "5px" }}>Handed Over</div>
            <div style={{ fontSize: "1.0rem" }}>(GC to JV)</div>
          </dt>
          <dd
            style={{
              color: labelColor,
              fontSize: `${new_valueSize}px`,
              fontWeight: "bold",
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
              opacity: isLoading ? 0 : 1,
            }}
          >
            {perc_handedOver}% ({thousands_separators(total_handedOver)})
          </dd>
        </dl>

        <dl style={{ justifyContent: "space-between" }}>
          <dt style={{ color: labelColor, fontSize: `${new_fontSize}px` }}>
            <div style={{ marginBottom: "5px" }}>To be Handed Over</div>
            <div style={{ fontSize: "1.0rem" }}>(to JV)</div>
          </dt>
          <dd
            style={{
              color: labelColor,
              fontSize: `${new_valueSize}px`,
              fontWeight: "bold",
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
              opacity: isLoading ? 0 : 1,
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
          color: labelColor,
          fontSize: "12px",
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "10px",
          marginLeft: "10px",
        }}
      >
        <span style={{ marginRight: "5px" }}>BLK BG</span>
        <calcite-switch
          oncalciteSwitchChange={(event: any) =>
            setBkcolorSwitch(event.target.checked)
          }
        ></calcite-switch>{" "}
        <span style={{ marginLeft: "5px" }}>WHT BG</span>
      </div>
    </>
  );
}; // End of lotChartgs

export default ChartLot;
