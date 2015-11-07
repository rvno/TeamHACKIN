$(document).ready(function(){
  var correctCharacters = $('#typingContent pre').text().split("");
  var characterIndex = 0;
  var incorrectStrokes = {};
  var start_time = new Date();

  showStats = function(){
    updateWastedStrokes();
    updateTopMissedKeys();
    updateCPM();
  };

  function updateCPM(){
    var characters_typed = correctCharacters.join("").substr(0,characterIndex).length;
    console.log(characters_typed);
    //time
    var time_spent = (new Date()).getTime() - start_time;
    $('#cpm').html(characters_typed/(time_spent/60000));
  }

  updateWastedStrokes = function(){
    var totalStrokes = 0;

    for (var keyCode in incorrectStrokes) {
      totalStrokes += incorrectStrokes[keyCode];
      console.log(totalStrokes);
    }

    $('#stats span#strokes').text(totalStrokes);
  }

  updateTopMissedKeys = function(){

  };

  trackIncorrectStroke = function(keyCode){
    incorrectStrokes[keyCode] = incorrectStrokes[keyCode] + 1 || 1;
  };

  highlightCurrent = function(){
    highlightYellow(characterIndex);
  };

  preparePage = function(){
    var highlightable = [];
    correctCharacters.forEach(function(value, index, a){
      highlightable.push("<span data-character-index='"+ index +"'>"+ value +"</span>");
    });

    $('#typingContent pre').html(highlightable.join(""));
    highlightCurrent();
  }

  highlightGreen = function(index){
    $('span[data-character-index='+ index +']').removeClass().addClass('green');
  };

  highlightYellow = function(index){
    $('span[data-character-index='+ index +']').removeClass().addClass('yellow');
  }

  highlightRed = function(index){
    $('span[data-character-index='+ index +']').removeClass().addClass('red');
  }

  checkKeyPress = function(keyCode){
    if(correctCharacters[characterIndex] === String.fromCharCode(keyCode)){
      highlightGreen(characterIndex);
      characterIndex += 1;
      highlightCurrent();
    }else if(correctCharacters[characterIndex] === "\n" && keyCode === 13){
      console.log('return entered');
      characterIndex += 1;
      highlightCurrent();
    } else {
      trackIncorrectStroke(keyCode);
      highlightRed(characterIndex);
    }
    showStats();
  }

  $("html").keypress(function(keyEvent){
    checkKeyPress(keyEvent.keyCode);
  })

  preparePage();

});