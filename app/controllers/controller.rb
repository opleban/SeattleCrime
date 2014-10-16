get '/' do
  @century_link_crimes = SODAQuery.new.get_CenturyLink_data.to_json
  erb :index
end