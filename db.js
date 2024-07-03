const mongoose = require('mongoose');
const uri = process.env.DB_URL;
const db_name = process.env.DB_NAME;

module.exports.connectDB = function () {
    return new Promise((resolve, reject) => {
        if(mongoose.connection.readyState == 1){
            resolve(console.log('DB Already Connected!'));
        }else{
            console.log('DB Connecting...')
            mongoose.connect(uri, {
                useNewUrlParser: true,
                dbName: db_name,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }).then(() => resolve(console.log('DB Connected!')))
                .catch((e) => {
                    reject(console.log('Database access error', e));
                });
        }
    });
};

module.exports.disconnectDB = function () {
    return new Promise((resolve, reject) => {
        mongoose.connection.close(function () {
            resolve(console.log('Connection closed!'));
        });
    });
};