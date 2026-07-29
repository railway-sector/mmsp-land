/* eslint-disable @typescript-eslint/no-unused-expressions */
import { lotLayer } from "../layers";
import Query from "@arcgis/core/rest/support/Query";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-list";
import "@esri/calcite-components/components/calcite-list-item";
import "@esri/calcite-components/components/calcite-shell-panel";
import "@esri/calcite-components/components/calcite-action";
import "@esri/calcite-components/components/calcite-avatar";
import "@esri/calcite-components/components/calcite-action-bar";
import { cp_f, lot_issue_f, lot_section_f, lot_type_f } from "../uniqueValues";
import { ArcgisMap } from "@arcgis/map-components/dist/components/arcgis-map";
import { useQuery } from "@tanstack/react-query";
import { memo, use, useMemo } from "react";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { MyContext } from "../contexts/MyContext";
import { makeQuery } from "../query";

// Zoom in to selected lot from expropriation list
let highlightSelect: any;
async function resultClickHandler(event: any) {
  const arcgisMap = document.querySelector("arcgis-map") as ArcgisMap;
  const queryExtent = new Query({
    objectIds: [event.target.value],
  });
  const result = await lotLayer.queryExtent(queryExtent);
  result.extent && arcgisMap?.goTo({ target: result.extent, zoom: 17 });

  const layerView = await arcgisMap?.whenLayerView(lotLayer);
  highlightSelect && highlightSelect.remove();
  highlightSelect = layerView.highlight([event.target.value]);
  arcgisMap?.view.on("click", () => {
    layerView.filter = null;
    highlightSelect.remove();
  });
}

//--- Return expro lots
interface QueryFeaturesType {
  layer: FeatureLayer;
  queryc: any;
}

async function queryFeatures({ layer, queryc }: QueryFeaturesType) {
  const query = lotLayer.createQuery();
  query.where = queryc.queryExpression();
  query.outFields = ["*"];
  query.returnGeometry = true;

  return await layer?.queryFeatures(query);
}

const ListIssueLot = memo(() => {
  const { cpackage, landtype, landsection } = use(MyContext);

  //--- Make query expression
  const qV = [cpackage, landtype, landsection];
  const qF = [cp_f, lot_type_f, lot_section_f];
  const queryc_issue = makeQuery(qV, qF, `${lot_issue_f} IS NOT NULL`);

  //--- Obtain queried Features
  const { data } = useQuery<any>({
    queryKey: [cpackage, landtype, landsection, lot_issue_f],
    queryFn: () => queryFeatures({ layer: lotLayer, queryc: queryc_issue }),
    select: (response) => {
      return response.features;
    },
    staleTime: Infinity,
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
});

export default ListIssueLot;
