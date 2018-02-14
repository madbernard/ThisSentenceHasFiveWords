var seeColorsButton,
  textBody,
  lineBreaks = /[\n\r\u2028\u2029]/,
  sentenceEnds = /([\n\r\u2028\u2029]|[.?!]+['"]*\s+)/, // todo, not "mr. dr. etc"
  wordBreaks = /\w[-–—]\w|\s+/,
  endSpaces = /\s+$/,
  sentenceInfo,
  processedText,
  userParagraph = '<p class=\"userWords\">';

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

  var sentenceArray = [userParagraph];

  // split with capture regex results in [text, capture, text, capture]
  for (var i = 0; i < wordsAndEndsArray.length; i = i + 2) {
    if (wordsAndEndsArray[i+1]) {
      var end = wordsAndEndsArray[i+1].replace(lineBreaks, '</p>' + userParagraph);
      var sentenceWithEnd = wordsAndEndsArray[i] + end;
      sentenceArray.push(sentenceWithEnd.replace(endSpaces, ''));
    }
    else {
      sentenceArray.push(wordsAndEndsArray[i].replace(endSpaces, ''));
    }
  }
  sentenceArray.push('</p>');


  sentenceInfo = sentenceArray.map(function prepareObject (sentence) {
    // todo: everything is wrapped in a span of l-2 for <p class="etc">
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
