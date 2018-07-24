var express = require('express');
var router = express.Router();
var userData = require('../data_source/mongodb/schema/userData');
var jwt = require('jsonwebtoken');
var config = require('../config');

/*router.post('/authenticate', function (req, res) {
    console.log(JSON.stringify(req.body));
    console.log(req.body.user.userName);
    res.json({success: true, message: 'Dummy authentication'});

});*/

router.post('/authenticate', function (req, res) {
    //Content-Type   application/x-www-form-urlencoded
    //Rest client Request parameters
    userData.getUserData().find({userName: req.body.user.userName})
        .then(function (doc) {
            if (doc[0]) {
                if (doc[0].password !== req.body.user.password) {
                    res.json({status: false, message: 'Authentication failed. Wrong password.'});
                } else {
                    const payload = {
                        userName: doc[0].userName,
                        role: doc[0].role
                    };
                    var token = jwt.sign(payload, config.secret, {
                        expiresIn: 60 * 60
                        /*expiresIn : 60*60*24*/
                    });
                    res.json({
                        status: true,
                        message: 'Authentication success.',
                        token: token,
                        expires: 60 * 60,
                        profileId: doc[0].profileId,
                        userName: doc[0].userName
                    });
                }

            } else {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            }
        })
        .catch(function(err){
            res.json({success: false, message: err});
        });
});

router.get('/test', function (req, res) {

    res.json({success: true, message: 'Dummy authentication'});

});


module.exports = router;