import "@esri/calcite-components/components/calcite-tabs";
import "@esri/calcite-components/components/calcite-tab";
import "@esri/calcite-components/components/calcite-tab-nav";
import "@esri/calcite-components/components/calcite-tab-title";
import "@esri/calcite-components/components/calcite-switch";
import "@esri/calcite-components/components/calcite-panel";
import "@esri/calcite-components/components/calcite-shell-panel";
import { use, useState } from "react";
import "../index.css";
import { labelColor } from "../uniqueValues";
import ChartStructure from "./ChartStructure";
import ChartIsf from "./ChartIsf";
import ListExpropriation from "./ListExpropriation";
import ListIssueLot from "./ListIssueLot";
import ChartLot from "./ChartLot";
import { MyContext } from "../contexts/MyContext";

function ChartMain() {
  const { bkColor } = use(MyContext);

  const [panelWidth, setPanelWidth] = useState<string>("40%");
  const [panelHeader, setPanelHeader] = useState<string>("Chart");
  const [tabName, setTabName] = useState<string>("Land");

  const handleTabChange = (event: any) => {
    setTabName(event.target.selectedTitle.textContent);
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
        id="chart-panel"
        collapseDirection="up"
        style={{
          "--calcite-panel-heading-text-color": labelColor,
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
        <calcite-tabs layout="center" scale="m">
          <calcite-tab-nav
            slot="title-group"
            id="thetabs"
            oncalciteTabChange={handleTabChange}
          >
            <calcite-tab-title>Land</calcite-tab-title>
            <calcite-tab-title>Structure</calcite-tab-title>
            <calcite-tab-title>ISF</calcite-tab-title>
            <calcite-tab-title>ExproList</calcite-tab-title>
            <calcite-tab-title>IssueList</calcite-tab-title>
          </calcite-tab-nav>

          {/* CalciteTab: Lot */}
          <calcite-tab style={{ backgroundColor: bkColor }}>
            <ChartLot />
          </calcite-tab>

          {/* CalciteTab: Structure */}
          <calcite-tab>
            {tabName === "Structure" && <ChartStructure />}
          </calcite-tab>

          {/* CalciteTab: Non-Land Owner */}
          <calcite-tab>{tabName === "ISF" && <ChartIsf />}</calcite-tab>

          {/* CalciteTab: List of Lodts under Expropriation */}
          <calcite-tab>
            {tabName === "ExproList" && <ListExpropriation />}
          </calcite-tab>

          {/* CalciteTab: List of Lot issues */}
          <calcite-tab>
            {tabName === "IssueList" && <ListIssueLot />}
          </calcite-tab>
        </calcite-tabs>
      </calcite-panel>
    </>
  );
}

export default ChartMain;
