if ($("#map").length){
  var seattleMap = new MapController();
  seattleMap.getCrimeData();
}

if ($("#overview-bar-chart").length){
  var barChart = new OverviewChart();
}

$(".team-selection, .year-selection").change(function(){
  var team = $(".team-selection").find("option:selected").attr("value");
  var year = $(".year-selection").find("option:selected").attr("value");
  if (team && year){
    var games = getGames(team, year);
  }
});

function getGames(team, year){
  d3.json("js/NFL" + year + ".json", function(collection){
    var games = [];
    collection.forEach(function(game){
      if (game.away == team){
        games.push(game);
      }
    });
    if (games.length){
    //for now I'm just getting crime data for an indidivudal game, to simplify my SoQL query
      getCrimeData(games[0]);
    }
  });
}

function getCrimeData(game){
  d3.json("/crimes.json?date=" + game.scheduled, function(collection){
    console.log(collection);
  });
}