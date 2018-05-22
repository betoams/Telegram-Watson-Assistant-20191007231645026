"use strict";

var _dotenv = require("dotenv");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _nodeTelegramBotApi = require("node-telegram-bot-api");

var _nodeTelegramBotApi2 = _interopRequireDefault(_nodeTelegramBotApi);

var _WatsonAssistant = require("../WatsonAssistant");

var _SpeechToText = require("../SpeechToText");

var _TextToSpeech = require("../TextToSpeech");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(0, _dotenv.load)();

// replace the value below with the Telegram token you receive from @BotFather
var token = process.env.TELEGRAM_KEY;

// Create a bot that uses 'polling' to fetch new updates
var bot = new _nodeTelegramBotApi2.default(token, {
  polling: true
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(msg) {
    var assistantResp, voice, transcript, _assistantResp, audioResponse, audioOptions;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!msg.text) {
              _context.next = 13;
              break;
            }

            _context.prev = 1;
            _context.next = 4;
            return (0, _WatsonAssistant.chat)(msg.text, msg.chat.id.toString());

          case 4:
            assistantResp = _context.sent;

            bot.sendMessage(msg.chat.id, assistantResp.output.text[0]);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);

            bot.sendMessage(msg.chat.id, 'Desculpe, estou tendo problemas com o sistema da central de atendimento...Tente novamente mais tarde!');

          case 11:
            _context.next = 44;
            break;

          case 13:
            if (!msg.voice) {
              _context.next = 44;
              break;
            }

            _context.prev = 14;
            _context.next = 17;
            return getVoice(msg.voice.file_id);

          case 17:
            voice = _context.sent;

            if (voice.err) {
              _context.next = 37;
              break;
            }

            _context.next = 21;
            return (0, _SpeechToText.stt)(voice.buffer);

          case 21:
            transcript = _context.sent;

            if (transcript.err) {
              _context.next = 34;
              break;
            }

            _context.next = 25;
            return (0, _WatsonAssistant.chat)(transcript.transcript, msg.chat.id.toString());

          case 25:
            _assistantResp = _context.sent;
            _context.next = 28;
            return (0, _TextToSpeech.tts)(_assistantResp.output.text[0]);

          case 28:
            audioResponse = _context.sent;
            audioOptions = {
              contentType: 'audio/wav'
            };

            bot.sendVoice(msg.chat.id, audioResponse);
            _fs2.default.unlink(audioResponse);
            _context.next = 35;
            break;

          case 34:
            bot.sendMessage(msg.chat.id, transcript.transcript);

          case 35:
            _context.next = 38;
            break;

          case 37:
            bot.sendMessage(msg.chat.id, 'Desculpe...Eu não entendi, poderia falar mais perto?');

          case 38:
            _context.next = 44;
            break;

          case 40:
            _context.prev = 40;
            _context.t1 = _context["catch"](14);

            console.log(_context.t1);
            bot.sendMessage(msg.chat.id, 'Desculpe, estou tendo problemas com o sistema da central de atendimento...Tente novamente mais tarde!');

          case 44:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 8], [14, 40]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

var getVoice = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(voiceFileId) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              _axios2.default.get('https://api.telegram.org/bot' + process.env.TELEGRAM_KEY + '/getFile?file_id=' + voiceFileId).then(function (resp) {
                console.log('1');
                _axios2.default.request({
                  responseType: 'arraybuffer',
                  url: 'https://api.telegram.org/file/bot' + process.env.TELEGRAM_KEY + '/' + resp.data.result.file_path,
                  method: 'get',
                  headers: {
                    'Content-Type': 'audio/mpeg'
                  }
                }).then(function (result) {
                  resolve({
                    err: false,
                    buffer: result.data
                  });
                }).catch(function (error) {
                  resolve({
                    err: true
                  });
                });
              }).catch(function (erro) {
                console.log(erro);
                resolve({
                  err: true
                });
              });
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getVoice(_x2) {
    return _ref2.apply(this, arguments);
  };
}();