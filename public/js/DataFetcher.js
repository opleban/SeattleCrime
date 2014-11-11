var DataFetcher = (function(options){

  var getMapData = function(callbackFn, date){
    var query = "/crimes.json?type=map";
    if (date)
      query += "&date=" + date;
    d3.json(query, function(data){
      callbackFn(data);
    });
  };

  var getChartData = function(callbackFn){
    var query = "/crimes.json?type=chart";
    d3.json("/crimes.json?type=chart", function(data){
      callbackFn(data);
    });
  };

  return {
    getMapData: getMapData,
    getChartData: getChartData
  };
}());