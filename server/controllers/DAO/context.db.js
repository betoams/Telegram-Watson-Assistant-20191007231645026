'use strict';

/**
 * This file contains all of the web and hybrid functions for interacting with
 * Cloudant service.
 *
 * @summary   Functions for Cloudant.
 * @author  Rabah Zeineddine
 * 
 *
 */

var fs = require('fs');

var database = void 0;

var DATABASE_NAME = "contexts";

var initCloudant = function initCloudant(callback) {
    var cloudantURL = process.env.CLOUDANT_URL;
    var cloudant = require('cloudant')({
        url: cloudantURL,
        plugin: 'retry',
        retryAttempts: 10,
        retryTimeout: 500
    });

    // Create the accounts Logs if it doesn't exist
    cloudant.db.create(DATABASE_NAME, function (err, body) {
        if (err) {
            console.log('Database already exists: ' + DATABASE_NAME);
        } else {
            console.log('New database created: ' + DATABASE_NAME);
        }
    });

    database = cloudant.db.use(DATABASE_NAME);
    callback(false);
};

var getDatabase = function getDatabase(callback) {
    if (database == undefined) {
        initCloudant(function (error) {
            if (error) {
                callback(database);
            } else {
                callback(database);
            }
        });
    } else {
        callback(database);
    }
};

module.exports = {
    getDatabase: getDatabase
};