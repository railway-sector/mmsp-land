import { lotDefaultSymbol, lotLayer, lotLayerUniquValueInfos } from "./layers";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";

//---------------------------------------------------------//
//                Get Initial Dates                        //
//---------------------------------------------------------//
export async function getSortDates(layer: any) {
  const all_fields: string[] = [];
  layer?.fields.map((field: any) => {
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

  return date_fields;
}

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
