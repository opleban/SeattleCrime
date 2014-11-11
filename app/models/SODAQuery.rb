class SODAQuery
  APP_TOKEN = 'jSj3qjGlEI09fjgkmKDHrH4mp'
  MILE_IN_METERS = 1610
  attr_reader :seattle_crime_client

  def initialize
    @seattle_crime_client = SODA::Client.new({:domain => 'data.seattle.gov', :app_token => APP_TOKEN})
  end

  def get_all_crime_data
    seattle_crime_client.get("3k2p-39jp", { "$where" => "within_circle(incident_location, 47.595941, -122.331515, #{MILE_IN_METERS})"})
  end

  def get_all_crime_data_by_date(date)
    date = date[0..10]
    start_date_stamp = date + "00:00:00"
    end_date_stamp  = date + "23:59:59"
    seattle_crime_client.get("3k2p-39jp", { "$where" => "within_circle(incident_location, 47.595941, -122.331515, #{MILE_IN_METERS}) AND at_scene_time >= '#{start_date_stamp}' AND at_scene_time <= '#{end_date_stamp}'"})
  end

  def get_aggregate_crime_data
    seattle_crime_client.get("3k2p-39jp", { "$select" => "event_clearance_group, count(*) AS total", "$where" => "within_circle(incident_location, 47.595941, -122.331515, #{MILE_IN_METERS}) AND at_scene_time >= '01-01-2014'", "$group" => "event_clearance_group"})
  end
end