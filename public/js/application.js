if ($("#map").length){
  var map = new MapController();
  DataFetcher.getMapData(map.draw.bind(map));
}

if ($("#overview-bar-chart").length){
  var chart = new OverviewChart();
  DataFetcher.getChartData(chart.draw.bind(chart));
}

$(".team-selection, .year-selection").change(function(){
  var team = $(".team-selection").find("option:selected").attr("value");
  var year = $(".year-selection").find("option:selected").attr("value");
  if (team && year){
    var games = getGame(team, year);
  }
});

function getGame(team, year){
  var noGamesFound = true;
  d3.json("js/NFL" + year + ".json", function(data){
    data.forEach(function(game){
      if (game.away === team){
        noGamesFound = false;
        return DataFetcher.getMapData(map.draw.bind(map), game.scheduled);
      }
    });
    if (noGamesFound){
      map.clear();
      alert("No games found!");
    }
  });
}