import React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "arcgis-assistant": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "arcgis-assistant-navigation-agent": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "arcgis-assistant-data-exploration-agent": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "arcgis-assistant-help-agent": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "arcgis-assistant-knowledge-agent": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      // Add other arcgis custom elements here if needed
    }
  }
}
