# TeamHACK1N
2nd Place Project for DBC's November Hackathon!

Check it out on [Heroku](http://hack1n-slash.herokuapp.com/)!

##The Team
  * Team Lead: Harvey Ngo
  * Team Members: Adam Fluke, Chris Scott, Kevin Yan, Isaac (Jose) Taveras, Noah Wiener
  * Idea Credit: Chris Scott

##The Concept
HACK1N-Slash is a typing demo that tracks a user's typing speed and accuracy.  In order to practice typing in a user's language of choice, users can paste URLs from any project on github, and test their typing in that file format.  When they complete the file or are done typing, the app displays details on typing speed and accuracy, including a chart of their most frequently missed characters.

## Take a Look Inside the App
![](public/demo.gif)
![](public/splash.png)
![](public/chart.png)


##Technologies Used
  * Backend: Rails, PostgreSQL
  * Frontend: Javascript, jQuery, Chart.JS, HTML, CSS
  * Design: Photoshop

##User Stories
  * A user can type in or paste a GitHub URL to begin.
  * A user can select from a pre-existing category to begin.
  * A user can see where he/she is making mistakes.
  * A user can finish the typing excercise early by pressing the ESC button or clicking Done.
  * A user can see his/her most frequent incorrect keystrokes, WPM, etc.
  * A user can enter another URL or click on another category to begin typing again.

##Challenges We Faced
  * Event Delegation - We had to sort through the code a few times in order to find out where we had to halt our event listeners for key events to allow the rest of the page to function properly.
  * Rails Forms w/Partials - We used partials to dry out our code, but noticed that the type attribute of our forms would change after submitting them and navigating to a new page. We handled these by adding url and html attributes with specific values in order to overcome this.

##Next Steps
  * Refactor
  * Make calls to the GitHub API to provide an interface where users may navigate through repos to select files.
  * Implement OAuth to allow users to save their stats and challenge friends
  * Speed Ranks

##Run HACK1N-Slash Locally:

  1. Clone the repo - 'git clone https://github.com/hdngo/TeamHACKIN.git'
  2. Throw up a server by running 'python -m SimpleHTTPServer'
