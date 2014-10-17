if ($("#map").length){
  var seattleMap = new MapController();
  $(".team-selection, .year-selection").change(function(){
    var team = $(".team-selection").find("option:selected").attr("value");
    var year = $(".year-selection").find("option:selected").attr("value");
    if (team && year){
      getGames(team, year);
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
    });
  }
  // seattleMap.getCrimeData();
  // seattleMap.overlayCensusTractPane();
}