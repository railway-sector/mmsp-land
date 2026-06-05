import "@arcgis/map-components/components/arcgis-expand";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-search";
import "@arcgis/map-components/components/arcgis-locate";
import "@arcgis/map-components/components/arcgis-zoom";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-navigation";
import "@esri/calcite-components/components/calcite-navigation-logo";
import "@arcgis/ai-components/components/arcgis-assistant";
import {
  accessRoadOptionsGroupLayer,
  alignmentLine,
  boundaryGroupLayer,
  depotBuildingsGroupLayer,
  evsBoundaryPoGroupLayer,
  isfLayer,
  lotGroupLayer,
  lotLayer,
  // lotLayerStatusRenderer,
  stationLayer,
  structureLayer,
  structuresGroupLayer,
} from "../layers";
import type { ArcgisMap } from "@arcgis/map-components/components/arcgis-map";
import type { ArcgisSearch } from "@arcgis/map-components/components/arcgis-search";
import { use, useEffect } from "react";
import { MyContext } from "../contexts/MyContext";
import { dateUpdate } from "../Query";

export default function MapDisplay() {
  const {
    updateDatefields,
    updateNewHandedoverJVfield,
    updateNewHandedoverNYfield,
    updateStatusdatefield,
    updateAsofdate,
    updateLatestasofdate,
  } = use(MyContext);

  const arcgisMap = document.querySelector("arcgis-map") as ArcgisMap;
  const arcgisSearch = document.querySelector("arcgis-search") as ArcgisSearch;

  useEffect(() => {
    lotLayer.when(() => {
      const all_fields: string[] = [];
      lotLayer?.fields.map((field) => {
        all_fields.push(field.name);
      });

      const temp = all_fields.filter((field: any) => field.startsWith("x"));
      const date_fields = [...new Set(temp.map((item) => item.split("_")[0]))];

      // Re-order date fields in ascending order
      date_fields.sort((a: any, b: any) => {
        const a_date: any = new Date(
          Number(a.slice(1, 5)),
          Number(a.slice(5, 7)) - 1,
          Number(a.slice(7, 9)),
        );
        const b_date: any = new Date(
          Number(b.slice(1, 5)),
          Number(b.slice(5, 7)) - 1,
          Number(b.slice(7, 9)),
        );
        return a_date - b_date;
      });

      const latest_date = date_fields[date_fields.length - 1];
      updateDatefields(date_fields);
      updateStatusdatefield(`${latest_date}_NVS`);
      updateNewHandedoverJVfield(`${latest_date}_JV`);
      updateNewHandedoverNYfield(`${latest_date}_NY`);

      // Default lot layer renderer
      // lotLayerStatusRenderer.field = `${latest_date}_NVS`;
      // lotLayer.renderer = lotLayerStatusRenderer;
      //----------------------------------------//
      //      As of date and latest date        //
      //----------------------------------------//
      dateUpdate().then((response) => {
        updateAsofdate(response[0][0]);
        updateLatestasofdate(response[0][2]);
      });
    });
  }, []);

  arcgisMap?.viewOnReady(() => {
    // console.log(mapView);
    arcgisMap?.map?.add(lotGroupLayer);
    arcgisMap?.map?.add(depotBuildingsGroupLayer);
    arcgisMap?.map?.add(evsBoundaryPoGroupLayer);
    arcgisMap?.map?.add(structuresGroupLayer);
    arcgisMap?.map?.add(isfLayer);
    arcgisMap?.map?.add(boundaryGroupLayer);
    arcgisMap?.map?.add(stationLayer);
    arcgisMap?.map?.add(alignmentLine);
    arcgisMap?.map?.add(accessRoadOptionsGroupLayer);

    // Search components
    const sources: any = [
      {
        layer: lotLayer,
        searchFields: ["LotID"],
        displayField: "LotID",
        exactMatch: false,
        outFields: ["LotID"],
        name: "Lot ID",
        placeholder: "example: 10083",
      },
      {
        layer: structureLayer,
        searchFields: ["StrucID"],
        displayField: "StrucID",
        exactMatch: false,
        outFields: ["StrucID"],
        name: "Structure ID",
        placeholder: "example: MCRP-01-01-ML028",
      },
    ];

    arcgisSearch.allPlaceholder = "LotID, StructureID, Chainage";
    arcgisSearch.includeDefaultSourcesDisabled = true;
    arcgisSearch.locationDisabled = true;
    arcgisMap.hideAttribution = true;
    arcgisSearch?.sources.push(...sources);
  });

  return (
    <>
      <arcgis-map
        id="test-map"
        basemap="dark-gray-vector"
        ground="world-elevation"
        center="121.0194387, 14.6972616"
        zoom={10}
        // onarcgisViewReadyChange={(event: any) => {
        //   setMapView(event.target);
        // }}
      >
        <arcgis-compass slot="top-right"></arcgis-compass>
        <arcgis-expand close-on-esc slot="top-right" mode="floating">
          <arcgis-search></arcgis-search>
        </arcgis-expand>
        <arcgis-zoom slot="bottom-right"></arcgis-zoom>
        <arcgis-locate slot="top-right"></arcgis-locate>
      </arcgis-map>
    </>
  );
}
