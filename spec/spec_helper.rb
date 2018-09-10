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
  config.before[:suite] do
    ActiveRecord::Base.logger = nil
    ["users", "properties"].each do |table|
      ActiveRecord::Base.connection.execute(File.read("db/setup/#{table}.sql"))
    end
  end

  config.before(:each) do
    User.delete_all
    Message.delete_all
end
