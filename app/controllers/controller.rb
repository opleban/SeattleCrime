get '/' do
  @nfl_teams = NFLTeams.alphabetized_teams
  erb :index
end

get '/crimes.json' do
  case params[:type]
  when "map"
    return SODAQuery.new.get_all_crime_data_by_date(params[:date]).to_json if params[:date]
    return SODAQuery.new.get_all_crime_data.to_json
  when "chart"
    SODAQuery.new.get_aggregate_crime_data.to_json
  end
end