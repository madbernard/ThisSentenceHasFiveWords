var seeColorsButton,
  textBody,
  sentenceEnds = /(\n|[.?!]+['"]*\s+)/, // todo, not "mr. dr. etc"
  wordBreaks = /\w[-–—]\w|\s+/,
  endSpaces = /\s+$/,
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

  // split with capture regex results in [text, capture, text, capture]
  for (var i = 0; i < wordsAndEndsArray.length; i = i + 2) {
    // todo: check match against sentenceEnds, turn \n into <br>
    if (wordsAndEndsArray[i+1]) {
      var sentenceWithEnd = wordsAndEndsArray[i] + wordsAndEndsArray[i+1];
      sentenceArray.push(sentenceWithEnd.replace(endSpaces, ''));
    }
    else {
      sentenceArray.push(wordsAndEndsArray[i].replace(endSpaces, ''));
    }
  }

  sentenceInfo = sentenceArray.map(function loadObject (sentence) {
    var length = sentence.split(wordBreaks).length;
    return {
      sentence: sentence,
      length: length,
      // todo before make html check length bounds
      html: '<span class="l-' + length + '">' + sentence + '</span>'
    };
  });
  console.log('sentenceInfo you did it', sentenceInfo);
  displayText();
}

function displayText (){
  // &ensp; comes out to 8px (0.5 rem) which fits span negative margins
  processedText = sentenceInfo.map(function collectHTML (obj){
    return obj.html;
  }).join('&ensp;');
  console.log('processedText you did it', processedText);
  displayArea.innerHTML = processedText;
}
