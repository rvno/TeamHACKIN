$(document).ready(function(){
  var correctCharacters = $('#typingContent pre').text().split("");
  var characterIndex = 0;

  checkKeyPress = function(keyCode){
    console.log('keyCode');
    console.log(keyCode);
    console.log('string entered');
    console.log(String.fromCharCode(keyCode));
    console.log('expected');
    console.log(correctCharacters[characterIndex]);
    console.log('array');
    console.log(correctCharacters);
    console.log('current index');
    console.log(characterIndex);
    if(correctCharacters[characterIndex] === String.fromCharCode(keyCode)){
      console.log('correct letter');
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

});