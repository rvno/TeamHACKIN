class WelcomeController < ApplicationController
  def index
  end

  def create
    url = params['/']['url']
    redirect_to "/type/?url=#{url}"
  end

  def show
    url = format_url(params['url'])
    @filetype = url.split(/[\/,\.]/).last
    @filename = url.split(/[\/,\.]/)[-2]
    @content = HTTParty.get(url).body.split("\n")
  rescue
    @content = nil
  end

  private
    def format_url url
      url.gsub!(/github.com/, 'raw.githubusercontent.com')
      url.gsub!(/blob\//, '')
    end
end
