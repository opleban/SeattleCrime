# The extractor I used to pull out the Seahawks home game schedule.
require "json"
json = File.read('NFL2014.json')
games = JSON.parse(json)
seahawk_games = []
games["weeks"].each do |week|
  sea_game = week["games"].select{ |game| game["home"] == "SEA" }
  seahawk_games += sea_game
end

puts seahawk_games.to_json