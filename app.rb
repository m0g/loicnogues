require 'sinatra'
require 'json'

class Social
  VARIABLES = [ :name, :link ]

  def self.get_all
    json = JSON.parse(File.read('content/home.json'))

    json['socials'].map do |social|
      self.new social
    end
  end

  def initialize skill
    skill.each do |key, variable|
      instance_variable_set "@#{key}", variable
    end
  end

  VARIABLES.each do |variable|
    define_method variable do
      instance_variable_get "@#{variable}"
    end
  end
end

class Skill
  VARIABLES = [ :name, :level ]

  def initialize skill
    skill.each do |key, variable|
      instance_variable_set "@#{key}", variable
    end
  end

  VARIABLES.each do |variable|
    define_method variable do
      instance_variable_get "@#{variable}"
    end
  end
end

class Post
  VARIABLES = [ :title, :name, :content ]

  def self.get_all
    json = JSON.parse(File.read('content/home.json'))

    json['posts'].map do |post|
      self.new post['id']
    end
  end

  def initialize id
    post = JSON.parse File.read "content/post-#{id.to_s}-1.json"

    post.each do |key, variable|

      unless variable.is_a? String or variable.is_a? Integer
        variable = variable.map do |skill|
          Skill.new skill
        end
      end

      instance_variable_set "@#{key}", variable
    end
  end

  VARIABLES.each do |variable|
    define_method variable do
      instance_variable_get "@#{variable}"
    end
  end
end

get '/' do
  erb :index, locals: {
    posts: Post::get_all,
    socials: Social::get_all
  }
end

not_found do
  erb :not_found
end
