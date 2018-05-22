"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tts = undefined;

var _config = require("./config");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _uuid = require("uuid");

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var tts = exports.tts = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(text) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt("return", new Promise(function (resolve, reject) {

                            var params = {
                                text: text,
                                voice: 'pt-BR_IsabelaVoice',
                                accept: 'audio/wav'
                            };

                            // Synthesize speech, correct the wav header, then save to disk
                            // (wav header requires a file length, but this is unknown until after the header is already generated and sent)
                            _config.textToSpeech.synthesize(params, function (err, audio) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                _config.textToSpeech.repairWavHeader(audio);
                                var filePath = 'server/tmp/' + (0, _uuid2.default)() + '.wav';
                                _fs2.default.writeFileSync(filePath, audio);
                                resolve(filePath);
                            });
                        }));

                    case 1:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function tts(_x) {
        return _ref.apply(this, arguments);
    };
}();