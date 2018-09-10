require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/flash'
require 'fileutils'

class MakersBnb < Sinatra::Base
  enable :sessions
  register Sinatra::Flash

  get "/" do
    "Hello, World!"
  end

  run! if app_file == $0
end
