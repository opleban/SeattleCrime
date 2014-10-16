class SODAQuery
  attr_reader :seattle_crime_client

  def initialize
    @seattle_crime_client = SODA::Client.new({:domain => 'data.seattle.gov', :app_token => 'jSj3qjGlEI09fjgkmKDHrH4mp'})
  end

  def get_CenturyLink_data
    response = seattle_crime_client.get("3k2p-39jp", { "$where" => "within_circle(incident_location, 47.595941, -122.331515, 1610)"})
  end
end