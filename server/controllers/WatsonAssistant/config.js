"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.workspace = exports.assistant = undefined;

var _dotenv = require("dotenv");

var _watsonDeveloperCloud = require("watson-developer-cloud");

(0, _dotenv.load)();

var assistant = exports.assistant = new _watsonDeveloperCloud.AssistantV1({
    username: process.env.WATSON_ASSISTANT_USERNAME,
    password: process.env.WATSON_ASSISTANT_PASSWORD,
    version: process.env.WATSON_ASSISTANT_VERSION
});

var workspace = exports.workspace = process.env.WATSON_ASSISTANT_WORKSPACE;