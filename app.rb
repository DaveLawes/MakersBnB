require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/flash'
require 'fileutils'

if ENV['ENVIRONMENT'] == 'test'
  FileUtils.touch("db/makersbnb-test.sqlite3")
  set :database, { adapter: "sqlite3", database: "./db/makersbnb-test.sqlite3" }
else
  set :database, { adapter: "sqlite3", database: "./db/makersbnb.sqlite3" }
end

require './lib/user'
require './lib/property'

class MakersBnb < Sinatra::Base
  enable :sessions
  register Sinatra::Flash

  # before {@active = nil} #Change to active something something

  get "/" do
    if session[:user_id] != nil
      user = User.find(session[:user_id])
      if user.present?
        @active = user.name
      end
    end
    p @active

    erb :index
  end

  get "/login" do
    erb :login
  end

  get "/register" do
    erb :register
  end

  post "/register" do
    user = User.create(
      name: params[:name],
      email: params[:email],
      password: params[:password]
    )
    session[:user_id] = user.id
    redirect "/"

    # if user.valid?
    #   session[:user_id] = user.id
    #   redirect "/"
    # else
    #   flash[:user_error] =
    #   user.errors.full_messages.join(", ")
    #   redirect "/register"
    # end

  end

  run! if app_file == $0
end
