var SeattleMap = function(){
  var that = this;
  that.map = L.map("map", {center:[47.595372, -122.331363], zoom:14})
             .addLayer(new L.TileLayer("http://{s}.tiles.mapbox.com/v3/opleban.j9f7bfle/{z}/{x}/{y}.png"));
  that.markers = L.markerClusterGroup();
};

SeattleMap.prototype.draw = function(data){
  var that = this;
  that.markers.clearLayers();
  data.forEach(function(crime){
    var marker = new L.marker([crime.incident_location.latitude,crime.incident_location.longitude], {at_scene_time:crime.at_scene_time, event_clearance_group: crime.event_clearance_group, event_clearance_subgroup: crime.event_clearance_subgroup, hundred_block_location: crime.hundred_block_location})
      .bindPopup("<p>Location: " + crime.hundred_block_location + "<br/> Type: " + crime.event_clearance_subgroup + "<br/> Date: " + crime.at_scene_time + "</p>");
    that.markers.addLayer(marker);
  });
  that.map.addLayer(that.markers);
};

SeattleMap.prototype.clear = function(){
  var that = this;
  that.markers.clearLayers();
}