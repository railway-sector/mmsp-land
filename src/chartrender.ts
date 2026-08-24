import * as am5 from "@amcharts/amcharts5";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Query from "@arcgis/core/rest/support/Query";

//-- Define interface
interface CommonTypes {
  pieSeries: any;
  statusArray: StatusQueryItem[];
  status_field: string;
  qChart: any;
  q2Expression?: string;
  layer: FeatureLayer;
  view: any; // arcgisScene?.view
}

//---- Pie Chart renderer
interface ChartType extends CommonTypes {
  chart: any;
  legend: any;
  root: any;
  updateChartPanelwidth: any;
  data: any;
  seriesScale: any;
  seriesOpacity: number;
  innerLabel?: string | any;
  innerLabelFontSize?: string | any;
  innerValueFontSize?: string | any;
  bkg_color_switch?: boolean | undefined;
  seriesFillHash?: boolean | undefined;
}

interface StatusQueryItem {
  category: string;
  value: number | string;
  color: string;
}

//--- Pie series propertie function
function pieSeriesProperties(
  root: any,
  data: any,
  pieSeries: any,
  seriesOpacity: number,
  innerLabel: string,
  innerLabelFontX: any,
  innerValueFontX: any,
  bkg_color_switch?: boolean | undefined,
  seriesFillHash?: boolean | undefined,
) {
  // values inside a donut
  let inner_label = pieSeries.children.push(
    am5.Label.new(root, {
      text: !bkg_color_switch
        ? `[#ffffff]{valueSum}[/]\n[fontSize: ${innerLabelFontX}; #d3d3d3; verticalAlign: super]${innerLabel}[/]`
        : `[#000000]{valueSum}[/]\n[fontSize: 0.5em; #000000; verticalAlign: super]${innerLabel}[/]`,
      fontSize: `${innerValueFontX}`,
      centerX: am5.percent(50),
      centerY: am5.percent(40),
      populateText: true,
      oversizedBehavior: "fit",
      textAlign: "center",
    }),
  );

  pieSeries.onPrivate("width", (width: any) => {
    inner_label.set("maxWidth", width * 0.7);
  });

  // Set slice opacity and stroke color
  pieSeries.slices.template.setAll({
    toggleKey: "none",
    fillOpacity: seriesFillHash ? 0 : seriesOpacity,
    stroke: am5.color("#ffffff"),
    strokeWidth: 0.5,
    strokeOpacity: 1,
    templateField: "sliceSettings",
    tooltipText: '{category}: {valuePercentTotal.formatNumber("#.")}%',
  });

  // Disabling labels and ticksll
  pieSeries.labels.template.set("visible", false);
  pieSeries.ticks.template.set("visible", false);

  pieSeries.data.setAll(data);

  // Disabling labels and ticksll
  pieSeries.labels.template.setAll({
    visible: false,
    scale: 0,
  });

  // pieSeries.labels.template.set('visible', true);
  pieSeries.ticks.template.setAll({
    visible: false,
    scale: 0,
  });
}

//--- Legend property function
function legendProperties(legend: any) {
  legend.labels.template.setAll({
    oversizedBehavior: "truncate",
    fill: am5.color("#ffffff"),
  });

  legend.valueLabels.template.setAll({
    textAlign: "right",
    fill: am5.color("#ffffff"),
  });

  legend.itemContainers.template.setAll({
    paddingTop: 3,
    paddingBottom: 1,
  });

  legend.markers.template.setAll({
    width: 17,
    height: 17,
  });

  legend.markerRectangles.template.setAll({
    cornerRadiusTL: 10,
    cornerRadiusTR: 10,
    cornerRadiusBL: 10,
    cornerRadiusBR: 10,
  });
}

//--- Layer view function
type layerViewQueryProps = {
  layer?: FeatureLayer | any;
  qExpression?: any;
  view: any;
  qChart?: any;
};

export const highlightFilterLayerView = async ({
  layer,
  view,
  qChart,
}: layerViewQueryProps) => {
  const query = layer?.createQuery();
  const qe = qChart.queryExpression();
  query.where = qe;
  let highlightSelect: any;

  const layerView = await view?.whenLayerView(layer);
  const results = await layer?.queryObjectIds(query);

  const queryExt = new Query({ objectIds: results });
  const qExtResult = await layer?.queryExtent(queryExt);
  if (qExtResult?.extent) {
    view?.goTo(qExtResult.extent);
  }

  highlightSelect && highlightSelect.remove();
  highlightSelect = layerView.highlight(results);

  layerView.filter = new FeatureFilter({ where: qe });
  view?.on("click", () => {
    layerView.filter = new FeatureFilter({
      where: undefined,
    });
    //-- Reset q/q2Expression; else, statusLA is not cleared.
    qChart.qExpression = undefined;
    qChart.q2Expression = undefined;
    highlightSelect && highlightSelect.remove();
  });
};

//---- Dynamic chart size
export function responsiveChart(
  chart: any,
  pieSeries: any,
  legend: any,
  pieSeriesScale: any,
  bkg_color_switch?: boolean | undefined,
) {
  chart.onPrivate("width", (width: any) => {
    const availableSpace = width * 0.7; // original 0.7
    const new_fontSize = width / 29;
    const new_pieSeries_scale = width / pieSeriesScale;
    const new_legendMarkerSize = width * 0.045;

    //--- legend and pieSeries properties to be dynamically changed
    legend.labels.template.setAll({
      width: availableSpace,
      maxWidth: availableSpace,
      fontSize: new_fontSize,
      fill: !bkg_color_switch ? am5.color("#ffffff") : am5.color("#000000"),
    });

    legend.valueLabels.template.setAll({
      fontSize: new_fontSize,
      fill: !bkg_color_switch ? am5.color("#ffffff") : am5.color("#000000"),
    });

    legend.markers.template.setAll({
      width: new_legendMarkerSize,
      height: new_legendMarkerSize,
    });

    pieSeries.animate({
      key: "scale",
      to: new_pieSeries_scale,
      duration: 100,
    });
  });
}

//--- Click event function
function clickSeries({
  pieSeries,
  statusArray,
  status_field,
  qChart,
  q2Expression,
  layer,
  view,
}: CommonTypes) {
  pieSeries.slices.template.events.on("click", (ev: any) => {
    const selected: any = ev.target.dataItem?.dataContext;
    const find = statusArray.find(
      (emp: any) => emp.category === selected.category,
    );
    const statusSelected = find?.value;
    const queryField =
      typeof statusSelected === "number"
        ? `${status_field} = ${statusSelected}`
        : `${status_field} = '${statusSelected}'`;

    qChart.qExpression = queryField;
    qChart.q2Expression = q2Expression ?? undefined;

    highlightFilterLayerView({
      layer,
      view,
      qChart,
    });
  });
}

class ChartPieSeriesRender {
  chart: any;
  pieSeries: any;
  legend: any;
  root: any;
  qChart: any;
  q2Expression?: string | undefined | any;
  status_field: any;
  view: any;
  updateChartPanelwidth: any;
  data: any;
  seriesScale: any;
  seriesOpacity: number;
  innerLabel?: any;
  innerLabelFontSize?: any;
  innerValueFontSize?: any;
  layer: FeatureLayer | any;
  statusArray: StatusQueryItem[] = [];
  bkg_color_switch?: boolean | undefined;
  seriesFillHash?: boolean | undefined;

  constructor(options: ChartType) {
    this.chart = options.chart;
    this.pieSeries = options.pieSeries;
    this.legend = options.legend;
    this.root = options.root;
    this.qChart = options.qChart;
    this.q2Expression = options.q2Expression;
    this.status_field = options.status_field;
    this.view = options.view;
    this.updateChartPanelwidth = options.updateChartPanelwidth;
    this.data = options.data;
    this.seriesScale = options.seriesScale;
    this.seriesOpacity = options.seriesOpacity;
    this.innerLabel = options.innerLabel;
    this.innerLabelFontSize = options.innerLabelFontSize;
    this.innerValueFontSize = options.innerValueFontSize;
    this.layer = options.layer;
    this.statusArray = options.statusArray;
    this.bkg_color_switch = options.bkg_color_switch;
    this.seriesFillHash = options.seriesFillHash;
  }

  chartDataRenderer = async () => {
    //--- Pie series property
    pieSeriesProperties(
      this.root,
      this.data,
      this.pieSeries,
      this.seriesOpacity,
      this.innerLabel,
      this.innerLabelFontSize,
      this.innerValueFontSize,
      this.bkg_color_switch,
      this.seriesFillHash,
    );

    //--- Legend properties
    legendProperties(this.legend);

    //--- Click pie series
    clickSeries({
      pieSeries: this.pieSeries,
      statusArray: this.statusArray,
      status_field: this.status_field,
      qChart: this.qChart,
      q2Expression: this.q2Expression,
      layer: this.layer,
      view: this.view,
    });

    //--- Responseive chart
    responsiveChart(
      this.chart,
      this.pieSeries,
      this.legend,
      this.seriesScale,
      this.bkg_color_switch,
    );
    this.chart.onPrivate("width", (width: any) => {
      this.updateChartPanelwidth(width);
    });

    // this.pieSeries.appear(1000, 100);
  };
}

export default ChartPieSeriesRender;
