class SODAQuery
  APP_TOKEN = 'jSj3qjGlEI09fjgkmKDHrH4mp'
  MILE_IN_METERS = '1610'
  attr_reader :seattle_crime_client

  def initialize
    @seattle_crime_client = SODA::Client.new({:domain => 'data.seattle.gov', :app_token => APP_TOKEN})
  end

  def get_crime_data_by_date(date)
    response = seattle_crime_client.get("3k2p-39jp", {$where => "within_circle(incident_location, 47.595941, -122.331515, #{MILE_IN_METERS}) AND date_trunc_ymd(at_scene_time)=date_trunc_ymd(#{date})"});
  end
end