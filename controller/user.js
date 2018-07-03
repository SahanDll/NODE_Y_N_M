var express = require('express');
var router = express.Router();
var userData = require('../data_source/mongodb/schema/userData');

router.get('/get-user-all', function (req, res, next) {
    userData.getUserData().find()
        .then(function (doc) {
            if(doc){
                res.send(JSON.stringify(doc));
            }else {
                res.json({error: 'Server Error'});
            }
        })
        .catch(function(err){
            res.json({error: err});
        });
});

router.get('/get-user-name', function (req, res, next) {
    userData.getUserData().find({ userName: req.query.userName})
        .then(function (doc) {
            if(doc){
                res.send(JSON.stringify(doc));
            }else {
                res.json({error: 'User not found'});
            }
        })
        .catch(function(err){
            res.json({error: err});
        });
});

router.post('/add-user', function (req, res, next) {
    userData.getUserData().find({ email: req.body.user.email})
        .then(function (doc) {
            if(doc[0]){
                res.status(200).json({status : false, message: 'Email already used'})
            }else{
                var user = {
                    userName: req.body.user.userName,
                    email: req.body.user.email,
                    password: req.body.user.password,
                    gcmToken: req.body.user.gcmToken,
                    uuid: req.body.user.uuid,
                    role: 1,
                    created: new Date()
                };
                var data = userData.createUserData(user);
                data.save(function(err) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({status : false, message: 'User create failed'})
                    } else {
                        res.status(200).json({status : true, message: 'User create success'})
                    }
                });
            }
        })
        .catch(function(err){
            res.json({error: err});
        });

});


module.exports = router;