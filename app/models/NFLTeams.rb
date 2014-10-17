class NFLTeams
  TEAM_NAMES = {"DAL" => "Dallas Cowboys", "SF" => "San Francisco 49ers", "JAC" => "Jacksonville Jaguars", "TEN" => "Tennessee Titans", "GB" => "Green Bay Packers", "TB" => "Tampa Bay Buccaneers", "MIN" => "Minnesota Vikings", "NO" => "New Orleans Saints", "ARI" => "Arizona Cardinals", "STL" => "St. Louis Rams", "NE" => "New England Patriots", "NYJ" => "New York Jets"}

  def self.alphabetized_teams
    TEAM_NAMES.sort_by{|short, long| long }
  end

end