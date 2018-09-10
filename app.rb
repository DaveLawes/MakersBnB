require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/flash'
require 'fileutils'
require './lib/user'
require './lib/property'

if ENV['ENVIRONMENT'] == 'test'
  FileUtils.touch("db/makersbnb-test.sqlite3")
  set :database, { adapter: "sqlite3", database: "./db/makersbnb-test.sqlite3" }
else
  set :database, { adapter: "sqlite3", database: "./db/makersbnb.sqlite3" }
end


class MakersBnb < Sinatra::Base
  enable :sessions
  register Sinatra::Flash

  get "/" do
    "Hello, World!"
    erb :index
  end

  get "/login" do
    erb :login
  end

  run! if app_file == $0
end
