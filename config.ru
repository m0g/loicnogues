require 'rubygems'
require 'sinatra'
require 'rack'

require './app.rb'

set :root, Pathname(__FILE__).dirname
run Sinatra::Application
