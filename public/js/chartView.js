function OverviewChart(){};

OverviewChart.prototype.draw = function(data){
  var data = data.sort(function(obj1, obj2) {
    return obj2.total - obj1.total;
  });
  console.log(data);
  var chart = nv.models.discreteBarChart()
    .x(function(d) { return d.event_clearance_group })
    .y(function(d) { return +d.total })
    .tooltips(true)
    .transitionDuration(350)
    .margin({top: 10, right: 10, bottom: 10, left: 40});

  chart.xAxis.axisLabel("Types of Crimes");
  d3.select("#overview-bar-chart").append("svg");
  d3.select("#overview-bar-chart svg")
    .datum([{values:data}])
    .call(chart);

  nv.utils.windowResize(chart.update);
};
