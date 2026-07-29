import { createContext } from "react";

type MyDropdownContextType = {
  asofdate: any;
  updateAsofdate: any;
  timesliderOn: any;
  updateTimesliderOn: any;
  newStatusField: any;
  updateNewStatusField: any;
  newJvField: any;
  updateNewJvField: any;
  newNyField: any;
  updateNewNyField: any;
  cpackage: any;
  updateCpackage: any;
  landtype: any;
  updateLandtype: any;
  landsection: any;
  updateLandsection: any;
  bkColor: any;
  updateBkColor: any;
};

const initialState = {
  asofdate: undefined,
  updateAsofdate: undefined,
  timesliderOn: undefined,
  updateTimesliderOn: undefined,
  newStatusField: undefined,
  updateNewStatusField: undefined,
  newJvField: undefined,
  updateNewJvField: undefined,
  newNyField: undefined,
  updateNewNyField: undefined,
  cpackage: undefined,
  updateCpackage: undefined,
  landtype: undefined,
  updateLandtype: undefined,
  landsection: undefined,
  updateLandsection: undefined,
  bkColor: undefined,
  updateBkColor: undefined,
};

export const MyContext = createContext<MyDropdownContextType>({
  ...initialState,
});
