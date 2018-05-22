'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.speechToText = undefined;

var _watsonDeveloperCloud = require('watson-developer-cloud');

var _dotenv = require('dotenv');

(0, _dotenv.load)();

var speechToText = exports.speechToText = new _watsonDeveloperCloud.SpeechToTextV1({
  username: process.env.STT_USERNAME,
  password: process.env.STT_PASSWORD,
  url: 'https://stream.watsonplatform.net/speech-to-text/api/'
});