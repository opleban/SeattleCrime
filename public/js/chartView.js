function OverviewChart(){
  d3.json("/crimes.json", function(data){
    var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.type })
      .y(function(d) { return +d.count })
      .staggerLabels(true)
      .tooltips(true)
      .showValues(false)
      .transitionDuration(350);

    chart.xAxis.axisLabel("Types of Crimes");
    d3.select("#overview-bar-chart").append("svg");
    d3.select("#overview-bar-chart svg")
      .datum([{values:data}])
      .call(chart);

    nv.utils.windowResize(chart.update);
    return chart;
  });
}