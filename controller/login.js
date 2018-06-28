var express = require('express');
var router = express.Router();

router.post('/authenticate', function (req, res) {
    console.log(JSON.stringify(req.body));
    console.log(req.body.user.userName);
    res.json({success: true, message: 'Dummy authentication'});

});

router.get('/test', function (req, res) {

    res.json({success: true, message: 'Dummy authentication'});

});


module.exports = router;