"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stt = undefined;

var _config = require("./config");

var _uuid = require("uuid");

var _uuid2 = _interopRequireDefault(_uuid);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require("mkdirp");

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var stt = exports.stt = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(voice) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt("return", new Promise(function (resolve, reject) {

                            (0, _mkdirp2.default)('server/tmp', function () {
                                console.log("imprimir aqui porra " + __dirname);
                                var outputFilename = 'server/tmp/' + (0, _uuid2.default)() + '.oga';
                                _fs2.default.writeFileSync(outputFilename, voice);

                                var params = {
                                    // From file
                                    audio: _fs2.default.createReadStream(outputFilename),
                                    content_type: 'audio/ogg',
                                    model: 'pt-BR_BroadbandModel'
                                };

                                _config.speechToText.recognize(params, function (error, text) {
                                    if (!error && text.results.length > 0) {
                                        _fs2.default.unlink(outputFilename);
                                        resolve({ err: false, transcript: text.results[0].alternatives[0].transcript });
                                    } else {
                                        resolve({ err: true, transcript: "Desculpe...Eu não entendi, poderia falar mais perto?" });
                                    }
                                });
                            });
                        }));

                    case 1:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function stt(_x) {
        return _ref.apply(this, arguments);
    };
}();