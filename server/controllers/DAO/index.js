'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var db = require('./context.db');

var database = void 0;

db.getDatabase(function (result) {
    database = result;
});

var getUserById = exports.getUserById = function getUserById(id) {
    return new Promise(function (resolve, reject) {
        database.find({
            selector: {
                "_id": id
            },
            fields: []
        }, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result.docs);
            }
        });
    });
};

var updateUser = exports.updateUser = function updateUser(userID, body) {
    return new Promise(function (resolve, reject) {
        database.get(userID, function (err, result) {
            if (!err) {

                result.context = body;
                insertUser(result).then(function (response) {
                    resolve(response);
                });
            } else {
                reject({
                    error: true,
                    error_reason: 'INTERNAL_SERVER_ERROR',
                    statusCode: 500
                });
            }
        });
    });
};

var insertUser = exports.insertUser = function insertUser(form) {
    return new Promise(function (resolve, reject) {
        database.insert(form, function (err, doc) {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        });
    });
};