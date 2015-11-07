$(document).ready(function(){
  var correctCharacters = $('#typingContent pre').text().split("");
  var characterIndex = 0;
  var start_time = new Date();
  var mistake = false;

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
    mistake = true;
  }

  checkKeyPress = function(keyCode){
    updateCPM();

    if(correctCharacters[characterIndex] === String.fromCharCode(keyCode)){
      highlightGreen(characterIndex);
      characterIndex += 1;
      highlightCurrent();
    }else if(correctCharacters[characterIndex] === "\n" && keyCode === 13){
      console.log('return entered');
      characterIndex += 1;
      highlightCurrent();
    }else if(keyCode === 8){
      if(mistake){

        console.log('backspace entered');
        highlightCurrent();
        mistake = false;
      }
    } else {
      highlightRed(characterIndex);

    }
  }
  function updateCPM(){
    //words typed
      //there is a space between every 2 words, so basically every space represents one word. ish
      // console.log(typeof correctCharacters);
    var characters_typed = correctCharacters.join("").substr(0,characterIndex).length;
    console.log(characters_typed);
    //time
    var time_spent = (new Date()).getTime() - start_time;
    $('#cpm').html(characters_typed/(time_spent/60000));
  }
  $("html").keypress(function(keyEvent){
    keyEvent.preventDefault();
    checkKeyPress(keyEvent.keyCode);
  })
  $("html").keyup(function(keyEvent){
    keyEvent.preventDefault();
    // console.log(keyEvent.keyCode);
    if(keyEvent.keyCode===8){
      checkKeyPress(keyEvent.keyCode);
    }
  });
  preparePage();
});