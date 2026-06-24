import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MapDisplay from "./components/MapDisplay";
import ActionPanel from "./components/ActionPanel";
import Header from "./components/Header";
import ChartMain from "./components/ChartMain";
import { authenticate } from "./autho";

//--- Create a client
const queryClient = new QueryClient();

export function App(): React.JSX.Element {
  const [loggedInState, setLoggedInState] = useState<boolean>(false);
  useEffect(() => {
    authenticate(setLoggedInState, "GYpYnxk4m4HlEI34");
  }, []);

  return (
    <>
      {loggedInState && (
        <calcite-shell
          // content-behind
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #555",
            "--calcite-color-background": "#2b2b2b",
          }}
        >
          <QueryClientProvider client={queryClient}>
            <ChartMain />
            <ActionPanel />
            <MapDisplay />
            <Header />
          </QueryClientProvider>
        </calcite-shell>
      )}
    </>
  );
}
