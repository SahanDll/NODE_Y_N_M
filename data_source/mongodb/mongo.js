var mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);
mongoose.connect('mongodb://localhost:27017/ynm', { //db where data is stored
    "auth": { "authSource": "admin" }, //db where user created
    "user": "root",
    "pass": "password"
});

var Schema = mongoose.Schema;

function getSchema() {
    return Schema;
}

function getMongoose() {
    return mongoose;
}

function getAutoIncrement() {
    return autoIncrement;
}

module.exports.getSchema = getSchema;
module.exports.getMongoose = getMongoose;
module.exports.getAutoIncrement = getAutoIncrement;