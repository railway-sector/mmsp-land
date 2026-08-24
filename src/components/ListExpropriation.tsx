/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
import { lotLayer } from "../layers";
import Query from "@arcgis/core/rest/support/Query";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-list";
import "@esri/calcite-components/components/calcite-list-item";
import "@esri/calcite-components/components/calcite-shell-panel";
import "@esri/calcite-components/components/calcite-action";
import "@esri/calcite-components/components/calcite-chip";
import "@esri/calcite-components/components/calcite-chip-group";
import "@esri/calcite-components/components/calcite-avatar";
import "@esri/calcite-components/components/calcite-action-bar";
import {
  cp_f,
  lot_section_f,
  lot_status_f,
  lot_status_q,
  lot_type_f,
} from "../uniqueValues";
import { ArcgisMap } from "@arcgis/map-components/dist/components/arcgis-map";
import "../index.css";
import { useQuery } from "@tanstack/react-query";
import { memo, use, useMemo } from "react";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { MyContext } from "../contexts/MyContext";
import QueryExpressionLayers from "query-layers-expression";

//--- Zoom in to selected lot from expropriation list
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

//--- List component
const ListExpropriation = memo(() => {
  const { cpackage, landtype, landsection } = use(MyContext);

  //--- Status value for Expro
  const exproV = lot_status_q.filter((e: any) =>
    e.category.includes("For Expro"),
  )[0]?.value;

  //--- Query expression
  const q = new QueryExpressionLayers({
    qFields: [cp_f, lot_type_f, lot_section_f],
    qValues: [cpackage, landtype, landsection],
    qExpression: `${lot_status_f} = ${exproV}`,
  });

  //--- Obtain queried Features
  const { data } = useQuery<any>({
    queryKey: [cpackage, landtype, landsection, lot_status_f],
    queryFn: () => queryFeatures({ layer: lotLayer, queryc: q }),
    select: (response) => {
      return response.features;
    },
    staleTime: Infinity,
  });

  const exproItem =
    data &&
    data.map((f: any, index: number) => {
      const attributes = f.attributes;
      return {
        id: index,
        lotid: attributes.Id,
        cp: attributes.Package,
        landtype: attributes.Type,
        landowner: attributes.OWNER,
        landsection: attributes.Station1,
        objectid: attributes.OBJECTID,
      };
    });

  //--- When exproItem is not changed, do not render
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
      <calcite-list
        id="result-list"
        label="exproListLabel"
        displayMode="nested"
      >
        {uniqueExproItems.map((f: any) => (
          // need 'key' to upper div and inside CalciteListItem
          <calcite-list-item
            key={f.id}
            expanded
            label={f.lotid}
            description={f.landowner}
            value={f.objectid}
            selected={undefined}
            oncalciteListItemSelect={(event: any) => resultClickHandler(event)}
            style={{ "--calcite-list-label-text-color": "red" }}
          >
            <calcite-chip
              value={f.cp}
              label={""}
              slot="content-end"
              scale="s"
              id="exproListChip"
            >
              <calcite-avatar
                full-name={f.landsection}
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
                {f.cp}
              </span>
            </calcite-chip>
          </calcite-list-item>
        ))}
      </calcite-list>
    </>
  );
});

export default ListExpropriation;
