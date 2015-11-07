$(document).ready(function(){
  var correctCharacters = $('#typingContent pre').text().split("");
  var characterIndex = 0;
  var incorrectStrokes = {};

  showStats = function(){
    updateWastedStrokes();
    updateTopMissedKeys();
  };

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
      showStats();
    }
  }

  $("html").keypress(function(keyEvent){
    checkKeyPress(keyEvent.keyCode);
  })

  preparePage();
});