import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { colorStructureHex } from "./uniqueValues";

// Dispose function
export function maybeDisposeRoot(divId: any) {
  am5.array.each(am5.registry.rootElements, (root: any) => {
    if (root.dom.id === divId) {
      root.dispose();
    }
  });
}

interface rootSetterType {
  chartID: any;
  mytheme?: any;
}

export function rootSetter({ chartID, mytheme }: rootSetterType) {
  const root = am5.Root.new(chartID);
  root.container.children.clear();
  root._logo?.dispose();

  if (mytheme) {
    root?.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
      mytheme && mytheme.new(root),
    ]);
  } else {
    root?.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
    ]);
  }

  // Set themesf

  return root;
}

export function chartSetter(root: any) {
  const chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      layout: root.verticalLayout,
    }),
  );

  return chart;
}

interface seriesSetterType {
  chart: any;
  root: any;
  categoryField: any;
  valueField: any;
  legendValueText: any;
  radius: number;
  innerRadius: number;
  scale: number;
}
export function seriesSetter({
  chart,
  root,
  categoryField,
  valueField,
  legendValueText,
  radius,
  innerRadius,
  scale,
}: seriesSetterType) {
  const pieSeries = chart.series.push(
    am5percent.PieSeries.new(root, {
      name: "Series",
      categoryField: categoryField,
      valueField: valueField,
      legendValueText: legendValueText,
      radius: am5.percent(radius), // outer radius
      innerRadius: am5.percent(innerRadius),
      scale: scale,
    }),
  );

  return pieSeries;
}

interface legendSetterType {
  chart: any;
  root: any;
  centerX: number;
  centerY?: number;
  x?: number;
  y?: number;
}

export function legendSetter({
  chart,
  root,
  centerX,
  x = 0,
}: legendSetterType) {
  const legend = chart.children.push(
    am5.Legend.new(root, {
      centerX: am5.percent(centerX),
      x: am5.percent(x),
    }),
  );

  return legend;
}

export class MyTheme extends am5.Theme {
  patterns: am5.LinePattern[] | undefined | any;
  currentPattern: number | any | undefined;
  setupDefaultRules() {
    // eslint-disable-next-line prefer-const
    let theme = this;

    const gap = 4;
    const rotation = 135;
    const strokeWidth = 1.1;
    const fillOpacity = 0;
    const width = 10;
    const height = 10;

    const patterns = colorStructureHex.map((color: any) => {
      return Object.assign(
        am5.LinePattern.new(this._root, {
          color: am5.color(color),
          gap: gap,
          rotation: rotation,
          strokeWidth: strokeWidth,
          fillOpacity: fillOpacity,
          width: width,
          height: height,
        }),
      );
    });

    this.patterns = patterns;

    this.currentPattern = 0;
    this.rule("Slice").setAll({
      fillOpacity: 0,
    });

    this.rule("Slice").setup = function (target) {
      target.set("fillPattern", theme.patterns[theme.currentPattern]);
      theme.currentPattern++;
      if (theme.currentPattern === theme.patterns?.length) {
        theme.currentPattern = 0;
      }
    };
  }
}
