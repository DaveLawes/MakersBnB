ENV['ENVIRONMENT'] = 'test'

require './app'
require 'capybara/rspec'
require 'simplecov'
require 'simplecov-console'

SimpleCov.formatter = SimpleCov::Formatter::MultiFormatter.new([
  SimpleCov::Formatter::Console,
])
SimpleCov.start

Capybara.app = MakersBnb

RSpec.configure do |config|
  config.before(:suite) do
    ActiveRecord::Base.logger = nil
    ActiveRecord::Base.connection.execute(File.read("db/setup/users.sql"))
    ActiveRecord::Base.connection.execute(File.read("db/setup/properties.sql"))
  end

  config.before(:each) do
    User.delete_all
    Property.delete_all
  end
end
