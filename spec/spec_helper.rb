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

# RSpec.configure do |config|  
# end
