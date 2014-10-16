require 'rake'

require ::File.expand_path('../config/environment', __FILE__)


desc 'Start IRB with application environment loaded'
task "console" do
  exec "irb -r./config/environment"
end

task :default  => :spec
