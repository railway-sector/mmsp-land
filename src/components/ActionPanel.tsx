import "@esri/calcite-components/components/calcite-panel";
import "@esri/calcite-components/components/calcite-list-item";
import "@esri/calcite-components/components/calcite-shell-panel";
import "@esri/calcite-components/components/calcite-action";
import "@esri/calcite-components/components/calcite-action-bar";
import { use, useEffect, useState } from "react";
import "@arcgis/map-components/components/arcgis-basemap-gallery";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-time-slider";
import { defineActions, lot_status_f } from "../uniqueValues";
import Timeslider from "./Timeslider";
import { MyContext } from "../contexts/MyContext";
import { toAsofdate, updateLotSymbology, useDateFields } from "../query";
import { lotLayer } from "../layers";

function ActionPanel() {
  const { updateAsofdate, updateTimesliderOn } = use(MyContext);
  const shellPanel: any = document.getElementById("left-shell-panel");
  const timeSlider = document.querySelector("arcgis-time-slider");

  //-----------------------------------------
  //   Define active & next widget states
  //-----------------------------------------
  const [activeWidget, setActiveWidget] = useState(null);
  const [nextWidget, setNextWidget] = useState(null);

  //--- Click action handler function for active & next widget
  const handleActionClick = (event: any) => {
    const id = event.target.id;
    setNextWidget(id);
    setActiveWidget(nextWidget === activeWidget ? null : nextWidget);
  };

  //---------------------------------------------
  //  Call date list for the time slider
  //---------------------------------------------
  const { data } = useDateFields(lotLayer);

  useEffect(() => {
    if (activeWidget) {
      const actionActiveWidget: any = document.querySelector(
        `[data-panel-id=${activeWidget}]`,
      );
      actionActiveWidget.hidden = true;
      shellPanel.collapsed = true;

      //------------------------------------------
      //  Reset timeslider to default state
      //------------------------------------------
      if (timeSlider) {
        timeSlider.timeExtent = null;
        shellPanel.collapsed = true;

        if (!data) return; // wait until the query has resolved.

        //-- Update As of date
        updateAsofdate(toAsofdate(data?.latestdate));

        //--- Time-slider off
        updateTimesliderOn(false);

        //--- Reset to default symbology
        updateLotSymbology(lot_status_f);
      }
    }

    if (nextWidget !== activeWidget) {
      const actionNextWidget: any = document.querySelector(
        `[data-panel-id=${nextWidget}]`,
      );
      actionNextWidget.hidden = false;
      shellPanel.collapsed = false;

      //--- Manually collapse shellPanel when
      if (nextWidget === "timeslider") {
        shellPanel.collapsed = true;
      }

      if (nextWidget === "handedover-charts") {
        shellPanel.collapsed = true;
      }
    }
  });

  return (
    <>
      <calcite-shell-panel
        slot="panel-start"
        id="left-shell-panel"
        displayMode="dock"
        collapsed
        style={{ "--calcite-shell-panel-background-color": "#2b2b2b" }}
      >
        <calcite-action-bar
          slot="action-bar"
          style={{
            borderStyle: "solid",
            borderRightWidth: 4.5,
            borderLeftWidth: 4.5,
            borderBottomWidth: 4.5,
            borderColor: "#555555",
          }}
        >
          <calcite-action
            data-action-id="layers"
            icon="layers"
            text="layers"
            id="layers"
            onClick={handleActionClick}
          ></calcite-action>

          <calcite-action
            data-action-id="basemaps"
            icon="basemap"
            text="basemaps"
            id="basemaps"
            onClick={handleActionClick}
          ></calcite-action>

          <calcite-action
            data-action-id="timeslider"
            icon="sliders-horizontal"
            text="Land Status Change"
            id="timeslider"
            onClick={handleActionClick}
          ></calcite-action>

          <calcite-action
            data-action-id="information"
            icon="information"
            text="Information"
            id="information"
            onClick={handleActionClick}
          ></calcite-action>
        </calcite-action-bar>

        <calcite-panel heading="Layers" data-panel-id="layers" hidden>
          <arcgis-layer-list
            referenceElement="arcgis-map"
            selectionMode="multiple"
            visibilityAppearance="checkbox"
            show-filter
            filter-placeholder="Filter layers"
            listItemCreatedFunction={defineActions}
          ></arcgis-layer-list>
        </calcite-panel>

        <calcite-panel heading="Basemaps" data-panel-id="basemaps" hidden>
          <arcgis-basemap-gallery referenceElement="arcgis-map"></arcgis-basemap-gallery>
        </calcite-panel>

        <calcite-panel data-panel-id="timeslider" hidden></calcite-panel>

        <calcite-panel
          className="timeSeries-panel"
          height-scale="l"
          data-panel-id="charts"
          hidden
        ></calcite-panel>

        <calcite-panel heading="Description" data-panel-id="information" hidden>
          {nextWidget === "information" ? (
            <div style={{ paddingLeft: "20px" }}>
              This smart map shows the progress on the following:
              <ul>
                <li>Land Aquisition, </li>
                <li>Structures, </li>
                <li>ISF (Informal Settlers Families), </li>
                <li>Lots under Expropriation, </li>
              </ul>
              <div style={{ paddingLeft: "20px" }}>
                <li>
                  The source of data: <b>Master List tables</b> provided by the
                  Social & Environmental Team.
                </li>
              </div>
            </div>
          ) : (
            <div className="informationDiv" hidden></div>
          )}
        </calcite-panel>
      </calcite-shell-panel>

      {nextWidget === "timeslider" && nextWidget !== activeWidget && (
        <Timeslider />
      )}
    </>
  );
}

export default ActionPanel;
