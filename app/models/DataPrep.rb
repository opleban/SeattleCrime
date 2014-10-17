class DataPrep
  # not a very efficient operation, need to refactor, ideally I will pull this information using SoQL straight from the API.
  def self.prepare_bar_chart(crime_data)
    crime_data_by_type = crime_data.group_by {|datum| datum["event_clearance_group"] }
    crime_data_by_type.map{ |type, crimes| {type:type, count:crimes.count} }
  end
end