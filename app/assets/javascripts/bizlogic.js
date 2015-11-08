$(document).ready(function(){
  var correctCharacters = $('#typingContent pre').text().split("");
  var characterIndex = 0;
  var incorrectStrokes = {};
  var start_time = new Date();
  var mistake = false;
  // /*
  //    * this swallows backspace keys on any non-input element.
  //    * stops backspace -> back
  //    */
  var rx = /INPUT|SELECT|TEXTAREA/i;

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
  showStats = function(){
    updateWastedStrokes();
    updateTopMissedKeys();
    updateCPM();
  };
  var goToNextNonWhitespace = function(){
    while(characterIndex<correctCharacters.length){
      console.log(characterIndex);
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
    // console.log(characters_typed);
    //time
    var time_spent = (new Date()).getTime() - start_time;
    $('#cpm').html(characters_typed/(time_spent/60000));
  }

  updateWastedStrokes = function(){
    var totalStrokes = 0;

    for (var keyCode in incorrectStrokes) {
      totalStrokes += incorrectStrokes[keyCode];
      // console.log(totalStrokes);
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
      if(value==="\n"){value=" "+value};
      highlightable.push("<span data-character-index='"+ index +"'>"+ value +"</span>");
    });

    $('#typingContent pre').html(highlightable.join(""));
    goToNextNonWhitespace();
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
    console.log(keyCode)
    if(correctCharacters[characterIndex] === String.fromCharCode(keyCode) && !mistake){
      highlightGreen(characterIndex);
      characterIndex += 1;
      highlightCurrent();
    }else if(correctCharacters[characterIndex] === "\n" && keyCode === 13 && !mistake){
      highlightGreen(characterIndex);
      characterIndex += 1;
      goToNextNonWhitespace();
      highlightCurrent();
    }else if(keyCode === 8){
      if(mistake){//a mistake was made
        console.log('backspace entered');
        highlightCurrent();
        mistake = false;
      }else{//a mistake hasnt been made
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
    // debugger
    console.log(keyEvent.keyCode)
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