get '/' do
  @nfl_teams = NFLTeams.alphabetized_teams
  erb :index
end

get '/crimes.json' do
  content_type :json
  SODAQuery.new.get_crime_data_by_date(params[:date])
end