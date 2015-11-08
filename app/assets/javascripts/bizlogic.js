$(document).ready(function(){
  var correctCharacters = $('#typingContent pre').text().split("");
  var correctWords = 0;
  var characterIndex = 0;
  var incorrectStrokes = {};
  var start_time = new Date();
  var mistake = false;
  var finished = false;

  $(document).keyup(function(e) {
    if (e.keyCode === 27) typingFinished();
  });

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



  // Dom Logic
  var toggleText = function(){
    $('#typingContent').hide(transitionTime);
    $('#options').show(transitionTime);
    $('#stats').show(transitionTime);
    $('html').off();
  }
  var typingFinished = function(e){
    toggleText();
    showChart(incorrectStrokes);
    $('#doneButton').hide();
  }

  $('#doneButton').on("click", typingFinished);
  var isFinished = function(){
    if(finished){
      return true;
    }else if(characterIndex>=correctCharacters.length){
      finished = true
      typingFinished();
      toggleText();
      return true;
    }else{
      return false;
    }
  };

  var showStats = function(){
    updateWastedStrokes();
    updateWPM();
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

  var preparePage = function(){
    var highlightable = [];
    $('#options').hide();
    $('#stats').hide();
    correctCharacters.forEach(function(value, index, a){
      if(value==="\n"){value=" "+value};
      highlightable.push("<span data-character-index='"+ index +"'>"+ value +"</span>");
    });
    $('#typingContent pre').html(highlightable.join(""));
    goToNextNonWhitespace();
    highlightCurrent();
  }

  var highlightCurrent = function(){
    highlightYellow(characterIndex);
  };

  var highlightGreen = function(index){
    $('span[data-character-index='+ index +']').removeClass().addClass('green');
  };

  var highlightYellow = function(index){
    $('span[data-character-index='+ index +']').removeClass().addClass('yellow');
  }

  var highlightRed = function(index){
    $('span[data-character-index='+ index +']').removeClass().addClass('red');
  }




  // Stat Logic
  var updateWPM = function(){
    var time_spent = (new Date()).getTime() - start_time;
    $('#wpm').html(Math.ceil(correctWords/(time_spent/60000)));
  }

  var updateWastedStrokes = function(){
    var totalStrokes = 0;
    for (var keyCode in incorrectStrokes)
      totalStrokes += incorrectStrokes[keyCode];

    $('#stats span#strokes').text(totalStrokes);
  }

  var trackIncorrectStroke = function(keyCode){
    incorrectStrokes[keyCode] = incorrectStrokes[keyCode] + 1 || 1;
  };


  var validateKeyCorrectness = function(keyCode, currentChar) {
    var charIsCorrect = (currentChar === String.fromCharCode(keyCode));
    var newline = (correctCharacters[characterIndex] === "\n" && keyCode === 13);

    if (isFinished())
      return;

    if ((charIsCorrect || newline) && !mistake) {
      highlightGreen(characterIndex);
      characterIndex++;
      if (newline) {
        goToNextNonWhitespace();
        isFinished();
      }
      highlightCurrent();
    } else if (keyCode === 8 && mistake) {
      highlightCurrent();
      mistake = false;
    } else {
      trackIncorrectStroke(currentChar.charCodeAt(0));
      highlightRed(characterIndex);
      mistake = true;
    }
  }

  var updateWordCount = function(keyCode, currentChar) {
    var newWordChars = {"\n": 13, " ": 32, "/": 47, "=": 61, ".": 46, ">": 62, ")": 41, ";": 59};
    if (newWordChars[currentChar] === keyCode && !mistake)
      correctWords++;
  }

  var checkKeyPress = function(keyCode){
    var currentChar = correctCharacters[characterIndex];
    updateWordCount(keyCode, currentChar);
    validateKeyCorrectness(keyCode, currentChar);
    showStats();
  }

  $("html").keypress(function(keyEvent){
    keyEvent.preventDefault();
    if(keyEvent.which !== 8)
      checkKeyPress(keyEvent.keyCode);
  })

  $("html").keyup(function(keyEvent){
    if(keyEvent.which === 8)
      checkKeyPress(keyEvent.keyCode);
  });

  preparePage();

});