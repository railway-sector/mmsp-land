import "@esri/calcite-components/components/calcite-tabs";
import "@esri/calcite-components/components/calcite-tab";
import "@esri/calcite-components/components/calcite-tab-nav";
import "@esri/calcite-components/components/calcite-tab-title";
import "@esri/calcite-components/components/calcite-switch";
import "@esri/calcite-components/components/calcite-panel";
import "@esri/calcite-components/components/calcite-shell-panel";
import { useState } from "react";
import "../index.css";
import { primaryLabelColor } from "../uniqueValues";
import ChartStructure from "./ChartStructure";
import ChartIsf from "./ChartIsf";
import ListExpropriation from "./ListExpropriation";
import ListIssueLot from "./ListIssueLot";
import { createContext } from "react";
import ChartLot from "./ChartLot";

type bkColorSwitchType = {
  bkColor: any;
  updateBkColor: any;
};

const initialState = {
  bkColor: undefined,
  updateBkColor: undefined,
};

export const MyContext = createContext<bkColorSwitchType>({
  ...initialState,
});

function ChartMain() {
  const [panelWidth, setPanelWidth] = useState<string>("40%");
  const [panelHeader, setPanelHeader] = useState<string>("Chart");
  const [bkColor, setBkColor] = useState<any>("#2b2b2b");
  const updateBkColor = (newBkColor: any) => {
    setBkColor(newBkColor);
  };

  const handlePanelCollapse = (event: any) => {
    const collapse_state = event.target.collapsed;

    if (collapse_state) {
      setPanelWidth("50px");
      setPanelHeader("");
    } else {
      setPanelWidth("40%");
      setPanelHeader("Chart");
    }
  };
  return (
    <>
      <calcite-panel
        scale="s"
        slot="panel-end"
        collapsible
        heading={panelHeader}
        // headingLevel={3}
        id="chart-panel"
        collapseDirection="up"
        style={{
          "--calcite-panel-heading-text-color": primaryLabelColor,
          borderStyle: "solid",
          borderRightWidth: 5,
          borderLeftWidth: 5,
          borderBottomWidth: 5,
          borderColor: "#555555",
          width: panelWidth,
          overflowY: "auto",
          display: "block", // without adding display, background will not disappear.
        }}
        onClick={handlePanelCollapse}
      >
        <calcite-tabs
          layout="center"
          scale="m"
          style={
            {
              // backgroundColor: bkColor,
            }
          }
        >
          <calcite-tab-nav slot="title-group" id="thetabs">
            <calcite-tab-title className="Land">Land</calcite-tab-title>
            <calcite-tab-title className="Structure">
              Structure
            </calcite-tab-title>
            <calcite-tab-title className="NLO">ISF</calcite-tab-title>
            <calcite-tab-title className="ExproList">
              ExproList
            </calcite-tab-title>
            <calcite-tab-title className="IssueList">
              IssueList
            </calcite-tab-title>
          </calcite-tab-nav>

          {/* CalciteTab: Lot */}
          <calcite-tab
            style={{
              backgroundColor: bkColor,
            }}
          >
            <MyContext value={{ bkColor, updateBkColor }}>
              <ChartLot />
            </MyContext>
          </calcite-tab>

          {/* CalciteTab: Structure */}
          <calcite-tab>
            <ChartStructure />
          </calcite-tab>

          {/* CalciteTab: Non-Land Owner */}
          <calcite-tab>
            <ChartIsf />
          </calcite-tab>

          {/* CalciteTab: List of Lodts under Expropriation */}
          <calcite-tab>
            <ListExpropriation />
          </calcite-tab>

          {/* CalciteTab: List of Lot issues */}
          <calcite-tab>
            <ListIssueLot />
          </calcite-tab>
        </calcite-tabs>
      </calcite-panel>
    </>
  );
}

export default ChartMain;
