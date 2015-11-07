$(document).ready(function(){
  var correctCharacters = $('#typingContent pre').text().split("");
  var characterIndex = 0;

  preparePage = function(){
    var highlightable = [];
    correctCharacters.forEach(function(value, index, a){
      highlightable.push("<span data-character-index='"+ index +"'>"+ value +"</span>");
    });

    $('#typingContent pre').html(highlightable.join(""));
  }

  highlightGreen = function(index){
    $('span[data-character-index='+ index +']').addClass('green');
  };

  checkKeyPress = function(keyCode){
    if(correctCharacters[characterIndex] === String.fromCharCode(keyCode)){
      highlightGreen(characterIndex);
      characterIndex += 1;
    }

    if(correctCharacters[characterIndex] === "\n" && keyCode === 13){
      console.log('return entered');
      characterIndex += 1;
    }
  }

  $("html").keypress(function(keyEvent){
    checkKeyPress(keyEvent.keyCode);
  })

  preparePage();
});