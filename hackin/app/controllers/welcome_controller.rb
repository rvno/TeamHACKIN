class WelcomeController < ApplicationController
  def index
  end

  def create
    url = params['/']['url']
    format_url(url)
  end

  def show
  end

  private
    def format_url url
      url.gsub!(/github.com/, 'raw.githubusercontent.com')
      url.gsub!(/blob\//, '')
      fail
    end
end

