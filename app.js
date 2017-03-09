'use strict';

var express    = require('express'),
  app          = express(),
  watson       = require('watson-developer-cloud');

// Bootstrap application settings
require('./config/express')(app);

// Create the service wrapper
var nlClassifier = watson.natural_language_classifier({
  url : 'https://gateway.watsonplatform.net/natural-language-classifier/api',
  username : '018b972b-8833-4f1b-a1f9-7cb8da9c6dcb',
  password : 'U4Ai6QqVXISb',
  version  : 'v1'

});

// render index page
app.get('/', function(req, res) {
  res.render('index', {
    ct: req._csrfToken,
    ga: process.env.GOOGLE_ANALYTICS
  });
});

// Call the pre-trained classifier with body.text
// Responses are json
app.post('/api/classify', function(req, res, next) {
  var params = {
    classifier: process.env.CLASSIFIER_ID || '2d7ae7x101-nlc-3723', // pre-trained classifier
    text: req.body.text
  };

  nlClassifier.classify(params, function(err, results) {
    if (err)
      return next(err);
    else
      res.json(results);
  });
});

require('./config/error-handler')(app);

module.exports = app;
