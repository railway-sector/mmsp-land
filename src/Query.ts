/* eslint-disable react-hooks/rules-of-hooks */
import {
  dateTable,
  lotDefaultSymbol,
  lotLayer,
  lotLayerUniquValueInfos,
} from "./layers";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";

//----------------------------------------//
//------ Symbology of lot layer ----------//
//----------------------------------------//
export function updateLotSymbology(new_date_field: any) {
  try {
    const lotLayerRenderer = new UniqueValueRenderer({
      field: new_date_field,
      defaultSymbol: lotDefaultSymbol, // autocasts as new SimpleFillSymbol()
      uniqueValueInfos: lotLayerUniquValueInfos,
    });
    lotLayer.renderer = lotLayerRenderer;
  } catch (error) {
    console.error("Error fetching data from FeatureServer:", error);
  }
}

// Updat date
export async function dateUpdate() {
  const query = dateTable.createQuery();
  query.where = "category = 'Land Acquisition'"; // "project = 'N2'" + ' AND ' + "category = 'Land Acquisition'";

  return dateTable.queryFeatures(query).then((response: any) => {
    const stats = response.features;
    const dates = stats.map((result: any) => {
      // get today and date recorded in the table
      const today = new Date();
      const date = new Date(result.attributes.date);

      // Calculate the number of days passed since the last update
      const time_passed = today.getTime() - date.getTime();
      const days_passed = Math.round(time_passed / (1000 * 3600 * 24));

      const year = date.getFullYear();
      const month = date.toLocaleString("en-US", {
        month: "long",
      });
      const day = date.getDate();
      const as_of_date = year < 1990 ? "" : `${month} ${day}, ${year}`;
      return [as_of_date, days_passed, date];
    });
    return dates;
  });
}

// Thousand separators function
export function thousands_separators(num: any) {
  if (num) {
    const num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
}

export function zoomToLayer(layer: any, view: any) {
  return layer.queryExtent().then((response: any) => {
    view
      ?.goTo(response.extent, {
        //response.extent
        //speedFactor: 2,
      })
      .catch(function (error: any) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
  });
}
