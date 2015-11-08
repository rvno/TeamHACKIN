$(document).ready(function(){
  var correctCharacters = $('#typingContent pre').text().split("");
  var characterIndex = 0;
  var incorrectStrokes = {};
  var start_time = new Date();
  var mistake = false;
  var finished = false;
  var rx = /INPUT|SELECT|TEXTAREA/i;
  var transitionTime = 500;
  $(document).bind("keydown keypress", function(e){
      if( e.which == 8 ){ // 8 == backspace
          if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
              e.preventDefault();
          }
      }
  });

  $('.textarea').bind('keyup, mouseup', function(e) {
    if(e.which == 9) { e.preventDefault(); }
  });
  var toggleText = function(){
    $('#typingContent').hide(transitionTime);
    $('#options').show(transitionTime);
    $('#stats').show(transitionTime);
  }
  var isFinished = function(){
    if(finished){
      return true;
    }else if(characterIndex>=correctCharacters.length){
      finished = true
      //showChart(incorrectStrokes);
      toggleText();
      return true;
    }else{
      return false;
    }
  };

  var showStats = function(){
    updateWastedStrokes();
    updateCPM();
  };

  var goToNextNonWhitespace = function(){
    while(characterIndex<correctCharacters.length){
      if(correctCharacters[characterIndex]===" "|| correctCharacters[characterIndex]==="\n"|| correctCharacters[characterIndex]==="\t"){
        highlightGreen(characterIndex);
        characterIndex++;
      }
      else{
        break;
      }
    }
  }

  function updateCPM(){
    var characters_typed = correctCharacters.join("").substr(0,characterIndex).length;
    var time_spent = (new Date()).getTime() - start_time;
    $('#cpm').html(characters_typed/(time_spent/60000));
  }

  var updateWastedStrokes = function(){
    var totalStrokes = 0;

    for (var keyCode in incorrectStrokes) {
      totalStrokes += incorrectStrokes[keyCode];
    }

    $('#stats span#strokes').text(totalStrokes);
  }

  var trackIncorrectStroke = function(keyCode){
    incorrectStrokes[keyCode] = incorrectStrokes[keyCode] + 1 || 1;
  };

  var highlightCurrent = function(){
    highlightYellow(characterIndex);
  };

  var preparePage = function(){
    var highlightable = [];
    correctCharacters.forEach(function(value, index, a){
      if(value==="\n"){value=" "+value};
      highlightable.push("<span data-character-index='"+ index +"'>"+ value +"</span>");
    });
    $('#typingContent pre').html(highlightable.join(""));
    goToNextNonWhitespace();
    highlightCurrent();
  }

  var highlightGreen = function(index){
    $('span[data-character-index='+ index +']').removeClass().addClass('green');
  };

  var highlightYellow = function(index){
    $('span[data-character-index='+ index +']').removeClass().addClass('yellow');
  }

  var highlightRed = function(index){
    $('span[data-character-index='+ index +']').removeClass().addClass('red');
  }

  var checkKeyPress = function(keyCode){
    if(isFinished()){
      return;
    }else if(correctCharacters[characterIndex] === String.fromCharCode(keyCode) && !mistake){
      highlightGreen(characterIndex);
      characterIndex += 1;
      highlightCurrent();
    }else if(correctCharacters[characterIndex] === "\n" && keyCode === 13 && !mistake){
      highlightGreen(characterIndex);
      characterIndex += 1;
      goToNextNonWhitespace();
      isFinished();
      highlightCurrent();
    }else if(keyCode === 8){
      if(mistake){//a mistake was made
        highlightCurrent();
        mistake = false;
      }else{
        //a mistake hasnt been made
        //we may want it to be able to go back? not really...
      }
    } else {
      trackIncorrectStroke(keyCode);
      highlightRed(characterIndex);
      mistake = true;
    }
    showStats();
  }

  $("html").keypress(function(keyEvent){
    keyEvent.preventDefault();
    if(keyEvent.which !== 8){
      checkKeyPress(keyEvent.keyCode);
    }
  })

  $("html").keyup(function(keyEvent){

    if(keyEvent.which === 8){
        checkKeyPress(keyEvent.keyCode);
    }
  });

  preparePage();

});