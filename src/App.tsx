import { useState, useEffect, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MapDisplay from "./components/MapDisplay";
import ActionPanel from "./components/ActionPanel";
import Header from "./components/Header";
import ChartMain from "./components/ChartMain";
import { authenticate } from "./autho";
import { MyContext } from "./contexts/MyContext";
import { dark_bkColor } from "./uniqueValues";

//--- Create a client
const queryClient = new QueryClient();

export function App(): React.JSX.Element {
  //------------------------
  //  Authenticate viewers
  //------------------------
  const [loggedInState, setLoggedInState] = useState<boolean>(false);
  useEffect(() => {
    authenticate(setLoggedInState, "GYpYnxk4m4HlEI34");
  }, []);

  //------------------------
  //  Create Context
  //------------------------
  const [asofdate, setAsofdate] = useState<any>();
  const updateAsofdate = useCallback((newAsofdate: any) => {
    setAsofdate(newAsofdate);
  }, []);

  const [timesliderOn, setTimesliderOn] = useState<boolean>(false);
  const updateTimesliderOn = useCallback((newState: boolean) => {
    setTimesliderOn(newState);
  }, []);

  const [newStatusField, setNewStatusField] = useState<any>();
  const updateNewStatusField = useCallback((newField: any) => {
    setNewStatusField(newField);
  }, []);

  const [newJvField, setNewJvField] = useState<any>();
  const updateNewJvField = useCallback((newField: any) => {
    setNewJvField(newField);
  }, []);

  const [newNyField, setNewNyField] = useState<any>();
  const updateNewNyField = useCallback((newField: any) => {
    setNewNyField(newField);
  }, []);

  const [cpackage, setCpackage] = useState<any>();
  const updateCpackage = useCallback((newC: any) => {
    setCpackage(newC);
  }, []);

  const [landtype, setLandtype] = useState<any>();
  const updateLandtype = useCallback((newB: any) => {
    setLandtype(newB);
  }, []);

  const [landsection, setLandsection] = useState<any>();
  const updateLandsection = useCallback((newB: any) => {
    setLandsection(newB);
  }, []);

  const [bkColor, setBkColor] = useState<any>(dark_bkColor);
  const updateBkColor = useCallback((newB: any) => {
    setBkColor(newB);
  }, []);

  return (
    <>
      {loggedInState && (
        <calcite-shell
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #555",
            "--calcite-color-background": "#2b2b2b",
          }}
        >
          <MyContext
            value={{
              asofdate,
              updateAsofdate,
              timesliderOn,
              updateTimesliderOn,
              newStatusField,
              updateNewStatusField,
              newJvField,
              updateNewJvField,
              newNyField,
              updateNewNyField,
              cpackage,
              updateCpackage,
              landtype,
              updateLandtype,
              landsection,
              updateLandsection,
              bkColor,
              updateBkColor,
            }}
          >
            <QueryClientProvider client={queryClient}>
              <Header />
              <ChartMain />
              <ActionPanel />
              <MapDisplay />
            </QueryClientProvider>
          </MyContext>
        </calcite-shell>
      )}
    </>
  );
}
