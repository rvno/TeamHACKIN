$(document).ready(function(){
  var correctCharacters = $('#typingContent pre').text().split("");
  var characterIndex = 0;
  var start_time = new Date();
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
    var current_time = start_time
    if(correctCharacters[characterIndex] === String.fromCharCode(keyCode)){
      highlightGreen(characterIndex);
      characterIndex += 1;
      highlightCurrent();
    }else if(correctCharacters[characterIndex] === "\n" && keyCode === 13){
      console.log('return entered');
      characterIndex += 1;
      highlightCurrent();
    } else {
      highlightRed(characterIndex);
    }
  }

  $("html").keypress(function(keyEvent){
    keyEvent.preventDefault();
    checkKeyPress(keyEvent.keyCode);
  })

  preparePage();
});