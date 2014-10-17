get '/' do
  @nfl_teams = NFLTeams.alphabetized_teams
  erb :index
end

get '/crimes.json' do
  if params[:date].nil?
    content_type :json
    crime_data = SODAQuery.new.get_all_crime_data
    DataPrep.prepare_bar_chart(crime_data).to_json
  else
    content_type :json
    SODAQuery.new.get_crime_data_by_date(params[:date]).to_json
  end
end