import "@arcgis/map-components/components/arcgis-expand";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-search";
import "@arcgis/map-components/components/arcgis-zoom";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-navigation";
import "@esri/calcite-components/components/calcite-navigation-logo";
import type { ArcgisMap } from "@arcgis/map-components/components/arcgis-map";
import "@arcgis/ai-components/components/arcgis-assistant";
import "@arcgis/ai-components/components/arcgis-assistant-data-exploration-agent";
import "@arcgis/ai-components/components/arcgis-assistant-navigation-agent"; // if you uncomment this below
import "@arcgis/ai-components/components/arcgis-assistant-help-agent";

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
import type { ArcgisSearch } from "@arcgis/map-components/components/arcgis-search";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  timesliderFieldKeys,
  datefieldKeys,
  dateDisplayKeys,
} from "../interfaceKeys";
import type {
  TimesliderFieldsTypes,
  DateFieldsType,
  DisplayDates,
} from "../interfaceKeys";
import { getSortDates } from "../queryTimeslider";
import { dateUpdate } from "../query";

export default function MapDisplay() {
  const queryClient = useQueryClient();

  // 1. Use React Refs instead of document.querySelector
  const arcgisMap = document.querySelector("arcgis-map") as ArcgisMap;
  const arcgisSearch = document.querySelector("arcgis-search") as ArcgisSearch;

  //--- As of Date and days Passed
  const { data: newAsOfDate } = useQuery<DisplayDates | any>({
    queryKey: [dateDisplayKeys.selected],
    queryFn: () => dateUpdate(),
    select: (response) => {
      return {
        asOfDate: response[0][0],
        daysPass: response[0][1],
      };
    },
    staleTime: Infinity,
  });
  queryClient.setQueryData<DisplayDates>(dateDisplayKeys.selected, newAsOfDate);

  //--- Prepare initial date array
  const { data: dateList } = useQuery<TimesliderFieldsTypes | any>({
    queryKey: [timesliderFieldKeys.selected, lotLayer], // lotLayer is a dependency
    queryFn: async () => {
      return {};
    },
    staleTime: Infinity,
  });
  queryClient.setQueryData<TimesliderFieldsTypes>(
    timesliderFieldKeys.selected,
    dateList,
  );

  //--- Dates array for time slider
  const { data: dateField } = useQuery<DateFieldsType | any>({
    queryKey: [datefieldKeys.selected, lotLayer], // lotLayer is a dependency
    queryFn: async () => {
      const response = await dateUpdate();
      return {
        dateFields: await getSortDates(lotLayer),
        latestasofdate: response[0][2],
      };
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  queryClient.setQueryData<DateFieldsType>(datefieldKeys.selected, dateField);

  //--- Add layers to scene view
  arcgisMap?.viewOnReady(() => {
    // const assistant: any = document.querySelector("arcgis-assistant");
    // assistant.view = arcgisMap?.view;

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
        // item-id="0cb9e3756b45406c9c8b73bbbc91a22f"
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

        {/* <arcgis-assistant>
          <arcgis-assistant-navigation-agent></arcgis-assistant-navigation-agent>
        </arcgis-assistant> */}
      </arcgis-map>
    </>
  );
}
