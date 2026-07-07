/* eslint-disable @typescript-eslint/no-unused-expressions */
import { lotLayer, querycExpro } from "../layers";
import Query from "@arcgis/core/rest/support/Query";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-list";
import "@esri/calcite-components/components/calcite-list-item";
import "@esri/calcite-components/components/calcite-shell-panel";
import "@esri/calcite-components/components/calcite-action";
import "@esri/calcite-components/components/calcite-avatar";
import "@esri/calcite-components/components/calcite-action-bar";
import { lotIssueListField } from "../uniqueValues";
import { ArcgisMap } from "@arcgis/map-components/dist/components/arcgis-map";
import { useQuery } from "@tanstack/react-query";
import { locationKeys } from "../interfaceKeys";
import type { SelectedLocation } from "../interfaceKeys";
import { useMemo } from "react";

// Zoom in to selected lot from expropriation list
let highlightSelect: any;
async function resultClickHandler(event: any) {
  const arcgisMap = document.querySelector("arcgis-map") as ArcgisMap;

  const queryExtent = new Query({
    objectIds: [event.target.value],
  });

  const result = await lotLayer.queryExtent(queryExtent);
  result.extent &&
    arcgisMap?.goTo({
      target: result.extent,
      zoom: 17,
    });

  const layerView = await arcgisMap?.whenLayerView(lotLayer);
  highlightSelect && highlightSelect.remove();
  highlightSelect = layerView.highlight([event.target.value]);

  arcgisMap?.view.on("click", () => {
    layerView.filter = null;
    highlightSelect.remove();
  });
}

const ListIssueLot = () => {
  //--- 1. Location state
  const { data: selectedLocation } = useQuery<SelectedLocation | any>({
    queryKey: locationKeys.selected,
    queryFn: async () => ({}),
    staleTime: Infinity,
  });
  const cpackage = selectedLocation?.cpackage;
  const landtype = selectedLocation?.landType;
  const landsection = selectedLocation?.landSection;

  //--- queryFeatures function
  async function queryFeatures() {
    const query = lotLayer.createQuery();

    querycExpro.qValues = [cpackage, landtype, landsection];
    querycExpro.qExpression = `${lotIssueListField} IS NOT NULL`;
    query.where = querycExpro.queryExpression();
    query.outFields = ["*"];
    query.returnGeometry = true;

    return await lotLayer?.queryFeatures(query);
  }

  //--- Obtain queried Features
  const { data } = useQuery<any>({
    queryKey: [cpackage, landtype, landsection, lotIssueListField],
    queryFn: () => queryFeatures(),
    select: (response) => {
      return response.features;
    },
  });

  //--- Unique list
  const exproItem =
    data &&
    data.map((feature: any, index: number) => {
      const attributes = feature.attributes;
      return {
        id: index,
        lotid: attributes.Id,
        cp: attributes.Package,
        landtype: attributes.Type,
        issue: attributes.Issue,
        landsection: attributes.Station1,
        objectid: attributes.OBJECTID,
      };
    });

  const uniqueExproItems = useMemo(() => {
    if (!exproItem) return [];
    const seen = new Map<any, any>();
    for (const item of exproItem) {
      if (!seen.has(item.objectid)) seen.set(item.objectid, item);
    }
    return [...seen.values()];
  }, [exproItem]);

  return (
    <>
      <calcite-list id="result-list" label="exproListLabel">
        {uniqueExproItems.map((result: any) => (
          // need 'key' to upper div and inside CalciteListItem
          <calcite-list-item
            key={result.id}
            label={result.lotid}
            description={result.issue}
            value={result.objectid}
            selected={undefined}
            oncalciteListItemSelect={(event: any) => resultClickHandler(event)}
            style={{ "--calcite-list-label-text-color": "red" }}
          >
            <calcite-chip
              value={result.cp}
              label={""}
              slot="content-end"
              scale="s"
              id="exproListChip"
            >
              <calcite-avatar
                full-name={result.landsection}
                scale="s"
                style={{ marginTop: "3px" }}
              ></calcite-avatar>
              <span
                style={{
                  top: -7,
                  bottom: 1,
                  position: "relative",
                  paddingLeft: "3px",
                }}
              >
                {result.cp}
              </span>
            </calcite-chip>
          </calcite-list-item>
        ))}
      </calcite-list>
    </>
  );
};

export default ListIssueLot;
