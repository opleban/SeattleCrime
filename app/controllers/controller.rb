get '/' do
  @nfl_teams = NFLTeams.alphabetized_teams
  erb :index
end