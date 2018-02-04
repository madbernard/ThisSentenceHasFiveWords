var seeColorsButton,
  textBody,
  sentenceEnds = /\n|[.?!]['"]*\s+/;

document.addEventListener('DOMContentLoaded', function(event) {
  init();
});

function init (){
  // provision elements
  seeColorsButton = document.getElementById('seeColorsButton');
  textBody = document.getElementById('textBody');

  // set listeners
  seeColorsButton.onclick = processText;

  document.getElementById('fiveWordsTitle').focus();
}

function processText (){
  var text = textBody.value;
  var sentenceArray = text.split(sentenceEnds);
  console.log('sentenceArray you did it', sentenceArray);
}

