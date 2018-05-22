'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.chat = undefined;

var _config = require('./config.js');

var _url = require('url');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var userDAO = require('../DAO');

var chat = exports.chat = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(text, sender) {
        var userContext, contex, assistantResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        userContext = "";
                        _context.next = 3;
                        return pegaContext(sender, userContext);

                    case 3:
                        contex = _context.sent;
                        _context.next = 6;
                        return chamaAssistant(sender, contex, text);

                    case 6:
                        assistantResponse = _context.sent;
                        return _context.abrupt('return', assistantResponse);

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function chat(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var chamaAssistant = function chamaAssistant(sender, contex, text) {
    return new Promise(function (resolve, reject) {
        _config.assistant.message({
            workspace_id: _config.workspace,
            input: {
                text: text
            },
            headers: {},
            context: contex
        }, function (err, result, response) {
            if (err) reject(err);else {
                userDAO.updateUser(sender, result.context).then(function (resultFinal) {
                    resolve(result);
                });
            }
        });
    });
};

var pegaContext = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(sender, userContext) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', new Promise(function (resolve, reject) {
                            userDAO.getUserById(sender).then(function (resultado) {
                                if (resultado[0] == null) {
                                    userContext = {
                                        conversation_id: "023b8ecf-c7b9-4fc1-93b2-45f92e685270",
                                        "system": {
                                            "dialog_stack": [{
                                                "dialog_node": "root"
                                            }],
                                            "dialog_turn_counter": 1,
                                            "dialog_request_counter": 1,
                                            "_node_output_map": {
                                                "node_2_1526056249898": [0]
                                            },
                                            "branch_exited": true,
                                            "branch_exited_reason": "completed"
                                        }
                                    };
                                    var user = {
                                        "_id": sender,
                                        "context": userContext
                                    };
                                    userDAO.insertUser(user).then(function (resultadoInsert) {
                                        resolve(resultadoInsert);
                                    });
                                } else {
                                    resolve(resultado[0].context);
                                }
                            });
                        }));

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function pegaContext(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();