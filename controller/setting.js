var express = require('express');
var router = express.Router();
var userSetting = require('../data_source/mongodb/schema/userSetting');

router.get('/get-user-setting', function (req, res, next) {
    userSetting.getUserSetting().find({ profileId: req.query.profileId})
        .then(function (doc) {
            if(doc[0]){
                res.send({status: true, setting: doc[0]});
            }else {
                res.json({status: false, error: 'Setting not found'});
            }
        })
        .catch(function(err){
            res.json({status: false, error: err});
        });
});

router.post('/update-setting', function (req, res, next) {
    userSetting.getUserSetting().find({ profileId: req.body.setting.profileId})
        .then(function (doc) {
/*            var setting = {
                profileId: req.body.setting.profileId,
                location: req.body.setting.location,
                birthDay: req.body.setting.birthDay,
                sex: req.body.setting.sex,
                picture: req.body.setting.picture,
                description: req.body.setting.description,
                mobile: req.body.setting.mobile
            };*/
            var setting = {
                profileId: req.body.setting.profileId,
                location: 'A',
                birthDay: new Date(),
                sex: 'C',
                picture: 'D',
                description: 'E',
                mobile: 'F'
            };
            if(doc[0]){
                var key = {'profileId':req.body.setting.profileId};
                userSetting.getUserSetting().findOneAndUpdate(key, setting, {upsert: true},  function(err) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({status : false, message: 'Setting update failed'})
                    } else {
                        res.status(200).json({status : true, message: 'Setting update success'})
                    }
                });
            }else{
                var data = userSetting.createUserSetting(setting);
                data.save(function(err) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({status : false, message: 'Setting create failed'})
                    } else {
                        res.status(200).json({status : true, message: 'Setting create success'})
                    }
                });
            }
        })
        .catch(function(err){
            res.json({error: err});
        });

});

router.post('/upsert-setting', function (req, res, next) {
    /*            var setting = {
                profileId: req.body.setting.profileId,
                location: req.body.setting.location,
                birthDay: req.body.setting.birthDay,
                sex: req.body.setting.sex,
                picture: req.body.setting.picture,
                description: req.body.setting.description,
                mobile: req.body.setting.mobile
            };*/
    var setting = {
        profileId: req.body.setting.profileId,
        location: 'A',
        birthDay: new Date(),
        sex: 'C',
        picture: 'D',
        description: 'E',
        mobile: 'F'
    };
    var key = {'profileId':req.body.setting.profileId};
    userSetting.getUserSetting().findOneAndUpdate(key, setting, {upsert: true},  function(err) {
        if (err) {
            console.log(err);
            res.status(500).json({status : false, message: 'Setting update failed'})
        } else {
            res.status(200).json({status : true, message: 'Setting update success'})
        }
    }).catch(function(err){
        res.json({error: err});
    });
});

module.exports = router;