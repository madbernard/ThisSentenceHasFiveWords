var seeColorsButton,
  textBody,
  sentenceEnds = /(\n|[.?!]+['"]*\s+)/, // todo, not "mr. dr. etc"
  wordBreaks = /\w[-–—]\w|\s+/,
  sentenceInfo,
  processedText;

document.addEventListener('DOMContentLoaded', function(event) {
  init();
});

function init (){
  // identify elements
  seeColorsButton = document.getElementById('seeColorsButton');
  textBody = document.getElementById('textBody');
  displayArea = document.getElementById('display');

  // set listeners
  seeColorsButton.onclick = processText;

  document.getElementById('fiveWordsTitle').focus();
}

function processText (){
  var text = textBody.value;
  var wordsAndEndsArray = text.split(sentenceEnds);

  var sentenceArray = [];

  for (var i = 0; i < wordsAndEndsArray.length; i = i + 2) {
    if (wordsAndEndsArray[i+1]) {
      sentenceArray.push( wordsAndEndsArray[i] + wordsAndEndsArray[i+1] );
    }
    else {
      sentenceArray.push(wordsAndEndsArray[i]);
    }
  }

  sentenceInfo = sentenceArray.map(function loadObject (sentence) {
    // there's a space after each period, so subtract 1 "word"
    var length = sentence.split(wordBreaks).length - 1;
    if (length) {
      return {
        sentence: sentence,
        length: length,
        // todo before make html check length bounds
        html: '<span class="l-' + length + '">' + sentence + '</span>'
      };
    }
  });
  console.log('sentenceInfo you did it', sentenceInfo);
  displayText();
}

function displayText (){
  // var joiner = ' '
  // todo: collect choices of spacing, join with those
  processedText = sentenceInfo.map(function collectHTML (obj){
    return obj.html;
  }).join('');
  console.log('processedText you did it', processedText);
  displayArea.innerHTML = processedText;
}
