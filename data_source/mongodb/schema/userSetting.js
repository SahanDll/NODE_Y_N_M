var mongo = require('../mongo');

var Schema = mongo.getSchema();

var userSettingSchema = new Schema({
    profileId: {type: Number, required: true},
    location: {type: String, required: true},
    birthDay: {type: Date, required: true},
    sex: {type: String, required: true},
    picture: {type: String, required: true},
    description: {type: String, required: false},
    mobile: {type: String, required: false}
}, {collection: 'userSetting'});

var UserSetting = mongo.getMongoose().model('userSetting', userSettingSchema);

function getUserSetting() {
    return UserSetting;
}

function createUserSetting(setting) {
    return new UserSetting(setting);
}


module.exports.getUserSetting = getUserSetting;
module.exports.createUserSetting = createUserSetting;