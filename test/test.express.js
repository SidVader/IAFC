'use strict';

var app = require('../app');
var request = require('supertest');
var nock = require('nock');

describe('express', function() {

  it('load home page when GET /', function(done) {
    request(app).get('/').expect(200, done);
  });

  it('404 when page not found', function(done) {
    request(app).get('/foo/bar').expect(404, done);
  });

  it('200 when calling classify', function(done) {
    var server = 'https://gateway.watsonplatform.net:443',
      classifier_id = '<classifier-id>',
      path = '/api/classify',
      text = 'classify me';

    var response = {
      classifier_id: classifier_id,
      text: text,
      top_class: 'bar',
      classes: [{
        class_name: 'bar',
        confidence: 0.99
      }, {
        class_name: 'foo',
        confidence: 0.01
      }]
    };
    nock(server)
      .post('/natural-language-classifier/api/v1/classifiers/%3Cclassifier-id%3E/classify',
        { text: text})
      .reply(200, response);

    request(app)
      .post(path)
      .send({text: text})
      .expect(200, response, done);
  });

});