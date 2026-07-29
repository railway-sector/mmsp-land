import "@arcgis/map-components/components/arcgis-time-slider";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import {
  toAsofdate,
  toDateList,
  updateLotSymbology,
  useDateFields,
  yearMonthDay,
} from "../query";
import { use } from "react";
import { MyContext } from "../contexts/MyContext";
import { lotLayer } from "../layers";

export default function Timeslider() {
  const {
    updateAsofdate,
    updateTimesliderOn,
    updateNewStatusField,
    updateNewJvField,
    updateNewNyField,
  } = use(MyContext);

  const arcgisMap = document.querySelector("arcgis-map");

  //---------------------------------------------
  //  Call date list for the time slider
  //---------------------------------------------
  const { data: dateList } = useDateFields(lotLayer);

  //------------------------------------
  //     Activate time slider
  //------------------------------------
  arcgisMap?.viewOnReady(() => {
    const timeSlider: any = document.querySelector("arcgis-time-slider");

    if (!dateList) return;
    const datesObj: any = dateList && toDateList(dateList?.dateFields);

    //--- Define start and end dates of time-slider
    timeSlider.fullTimeExtent = {
      start: datesObj[0],
      end: datesObj.at(-1),
    };

    //--- Define timestamps where the slider stops.
    timeSlider.stops = { dates: datesObj };

    reactiveUtils.watch(
      () => timeSlider?.timeExtent,
      (timeExtent) => {
        if (!timeExtent) return;

        //--- Extract year, month, and day
        const { year, month, day } = yearMonthDay(timeExtent.end);

        //--- Update asOfDate
        updateAsofdate(toAsofdate(timeExtent.end));

        //--- Update date fields for time slider:
        const mm = String(month).padStart(2, "0");
        const dd = String(day).padStart(2, "0");
        const new_date_field = `x${year}${mm}${dd}`;

        //--- Update date fields changed with time stapms
        updateNewStatusField(`${new_date_field}_NVS`);
        updateNewJvField(`${new_date_field}_JV`);
        updateNewNyField(`${new_date_field}_NY`);

        updateLotSymbology(`${new_date_field}_NVS`);
      },
    );
    // });
  });

  return (
    <>
      <span style={{ fontSize: "16px", color: "#d1d5db", margin: "auto" }}>
        Historical Progress on Land Acquisition
      </span>
      <div>
        <arcgis-time-slider
          referenceElement="arcgis-map"
          slot="bottom"
          layout="auto"
          mode="cumulative-from-start"
          onarcgisPropertyChange={() => updateTimesliderOn(true)}
        ></arcgis-time-slider>
      </div>
    </>
  );
}
