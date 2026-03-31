import { createContext } from "react";

type MyDropdownContextType = {
  contractp: any;
  landtype: any;
  landsection: any;
  statusdate: any;
  timesliderstate: any;
  chartPanelwidth: any;
  backgroundcolorSwitch: any;
  updateContractcps: any;
  updateLandtype: any;
  updateLandsection: any;
  updateStatusdate: any;
  updateTimesliderstate: any;
  updateChartPanelwidth: any;
  updateBackgroundcolorSwitch: any;
};

const initialState = {
  contractp: undefined,
  landtype: undefined,
  landsection: undefined,
  statusdate: undefined,
  timesliderstate: undefined,
  chartPanelwidth: undefined,
  backgroundcolorSwitch: undefined,
  updateContractcps: undefined,
  updateLandtype: undefined,
  updateLandsection: undefined,
  updateStatusdate: undefined,
  updateTimesliderstate: undefined,
  updateChartPanelwidth: undefined,
  updateBackgroundcolorSwitch: undefined,
};

export const MyContext = createContext<MyDropdownContextType>({
  ...initialState,
});
