const db = require('./context.db');


let database;

db.getDatabase((result) => {
    database = result;
});

export const getUserById = (id) => {
    return new Promise((resolve, reject) => {
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
        })
    })
}

export const updateUser = (userID,body) => {
    return new Promise((resolve, reject) => {
        database.get(userID, function (err, result) {
            if (!err) {
            
            result.context = body;
              insertUser(result).then((response) => {
                  resolve(response);
              }) 
            } else {
                reject({
                    error: true,
                    error_reason: 'INTERNAL_SERVER_ERROR',
                    statusCode: 500
                });
            }
        })
    })   
}

export const insertUser = (form) => {
    return new Promise((resolve, reject) => {
        database.insert(form, (err, doc) => {
            if (err) {
                reject(err)
            } else {
                resolve(doc);
            }
        })
    })
}
