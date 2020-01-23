var user = require('../model/login');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

exports.login = function (req, res) {
    username = req.body.username;
    password = req.body.password;
    user.identify_user(username, password, function (err, user) {
        if (err) {
            res.send(err);
        }
        else {
            if (user.length == 0) {
                res.send({ msg: "Invalid username or password.\nPlease try again." });
            }
            else if (user[0].username == username && user[0].password == password) {
                var token = jwt.sign({ id: user[0].username }, config.secret, { expiresIn: 3600 });
                if (user[0].role == "admin") {
                    res.send({ location: '/user_management', msg: "User found", token: token });
                    res.end();
                } else if (user[0].role == "guest" || user[0].role == "seller" || user[0].role == "bidder") {
                    res.send({ location: '/main', msg: "User found", token: token });
                    res.end();
                }

            }
        }
    });
};

exports.register_user = function (req, res) {
    data = req.body.data;
    user.registerUser(data, function (err, user) {
        if (err) {
            res.send(err);
        }
        else {
            if(user.code == "ER_DUP_ENTRY")
            {
                res.send({response:"Username already exists!",valid: 0});
            }else{
                res.send({response:"User was successfully created!",valid: 1});
            }
        }
    });
}

exports.indexpage = function (req, res) {
    res.render('index.html');
};

exports.register_page = function (req, res) {
    res.render('register.html');
}
