class WelcomeController < ApplicationController
  def index
  end

  def create
    url = params['/']['url']
    redirect_to "/type/?url=#{url}"
  end

  def show
    url = format_url(params['url'])
    @content = HTTParty.get(url).body.split("\n")

  rescue
    @content = ["this didn't work"]
  end

  private
    def format_url url
      url.gsub!(/github.com/, 'raw.githubusercontent.com')
      url.gsub!(/blob\//, '')
    end
end
