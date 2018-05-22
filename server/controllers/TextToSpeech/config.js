'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textToSpeech = undefined;

var _watsonDeveloperCloud = require('watson-developer-cloud');

var _dotenv = require('dotenv');

(0, _dotenv.load)();

var textToSpeech = exports.textToSpeech = new _watsonDeveloperCloud.TextToSpeechV1({
  username: process.env.TTS_USERNAME,
  password: process.env.TTS_PASSWORD,
  url: 'https://stream.watsonplatform.net/text-to-speech/api/'
});