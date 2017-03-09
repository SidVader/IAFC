'use strict';

$(document).ready(function() {

  // jQuery variables attached to DOM elements
  var $error = $('.error'),
    $errorMsg = $('.errorMsg'),
    $loading = $('.loading'),
    $results = $('.results'),
    $classification = $('.classification'),
    $confidence = $('.confidence'),
    $question = $('.questionText');


  $('.ask-btn').click(function() {
    askQuestion($question.val());
    $question.focus();
  });

  $('.questionText').keyup(function(event){
    if(event.keyCode === 13) {
      askQuestion($question.val());
    }
  });

  // Ask a question via POST to /
  var askQuestion = function(question) {
    if ($.trim(question) === '')
      return;

    $question.val(question);

    $loading.show();
    $error.hide();
    $results.hide();

    $.post('/api/classify', {text: question})
      .done(function onSucess(answers){
        $results.show();
        $classification.text(answers.top_class);
        $confidence.text(Math.floor(answers.classes[0].confidence * 100) + '%');
        $('html, body').animate({ scrollTop: $(document).height() }, 'fast');
        $loading.hide();
      })
      .fail(function onError(error) {
        $error.show();
        $errorMsg.text(error.responseJSON ? error.responseJSON.error : (
          error.responseText || 'There was a problem with the request, please try again'));
        $loading.hide();
      });
  };

  [
    'Hello sir, you have won a prize of $ 1 million, please give us your credit card number to claim the prize',
    'Invest Rs20000 and get double the amount as interest in 4 months',
    'ICICI offers a new scheme to save more by investing more',
    'Be aware of spam mails. Click on the link above to get rid of all fraud mails and spams',
  ].forEach(function(question){
    $('<a>').text(question)
      .mousedown(function() {
        askQuestion(question);
        return false;
      })
      .appendTo('.example-questions');
  });

  $.ajaxSetup({
    headers: {
      'csrf-token': $('meta[name="ct"]').attr('content')
    }
  });
});
