var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

router.post('/register', registerUser);

function registerUser(req, res, next) {

    var user;

    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            message: 'Please fill out all fields'
        });
    }

    user = new UserModel();

    user.username = req.body.username;

    user.setPassword(req.body.password);

    user.save(function saveUserCallback(err) {

        if (err) {
            return next(err);
        }

        return res.json({
            token: user.generateJWT()
        });
    });
}

module.exports = router;
