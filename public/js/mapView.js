MapController = function(){
  this.map = L.map("map", {center:[47.595372, -122.331363], zoom:14})
             .addLayer(new L.TileLayer("http://{s}.tiles.mapbox.com/v3/opleban.j9f7bfle/{z}/{x}/{y}.png"));
};

MapController.prototype.getCrimeData = function(){
  var map = this.map;
  d3.json("js/CenturyLinkCrime.json", function(collection){
    var markers = L.markerClusterGroup();
    collection.forEach(function(crime){
      var marker = new L.marker([crime.incident_location.latitude,crime.incident_location.longitude], {at_scene_time:crime.at_scene_time, event_clearance_group: crime.event_clearance_group, event_clearance_subgroup: crime.event_clearance_subgroup, hundred_block_location: crime.hundred_block_location})
        .bindPopup("<p>Location: " + crime.hundred_block_location + "<br/> Type: " + crime.event_clearance_subgroup + "<br/> Date: " + crime.at_scene_time + "</p>");
      markers.addLayer(marker);

    });
    map.addLayer(markers);
  });
};

//This function is not currently used. Before, I had the idea of mapping crime based on the census tract, however the census tracts were too large relative to the area around CenturyLink Field, and did not provide enough variation for a significant comparison.

MapController.prototype.overlayCensusTractPane = function(){
  var map = this.map;
  var svg = d3.select(map.getPanes().overlayPane).append("svg");
  var g = svg.append("g").attr("class", "leaflet-zoom-hide");

  d3.json("js/king_census.json", function(collection){
    //insert tooltip here
    var transform = d3.geo.transform({point:projectPoint}),
        path = d3.geo.path().projection(transform);

    var feature = g.selectAll("path")
        .data(collection.features)
        .enter().append("path");
    map.on("viewreset", reset);
    reset();

    function reset(){
      var bounds = path.bounds(collection),
      topLeft = bounds[0],
      bottomRight = bounds[1];

      svg.attr("width", bottomRight[0] - topLeft[0])
          .attr("height", bottomRight[1] - topLeft[1])
          .style("left", topLeft[0] + "px")
          .style("top", topLeft[1] + "px");

      g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

      feature.attr("d", path);
    }
    function projectPoint(x, y) {
      var point = map.latLngToLayerPoint(new L.LatLng(y, x));
      this.stream.point(point.x, point.y);
    }
  });
};