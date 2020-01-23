var jwt = require('jsonwebtoken');
var config = require('./config');
var sql = require('../connect_db');

exports.verify = function (token, req, res, next) {
  if(req.originalUrl == "/register") return next();
  if (!token && req.originalUrl !== "/") return res.redirect("/");

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err && req.originalUrl !== "/") return res.redirect("/");

    if (decoded) {
      var datetime = new Date();
      if (decoded.exp < datetime.toISOString && req.originalUrl !== "/") {
        return res.redirect("/");
      }
      if (decoded.id) {
        req.userId = decoded.id;
        var regex = new RegExp('/user_management[A-Za-z0-9?!/=]*');
        var url = req.originalUrl.match(regex)
        if (req.originalUrl == url) {
          sql.query("select users.role from tedi.users where users.username = ?", decoded.id, function (err, result) {
            if(err){
              console.log(err);
              return res.redirect("/");
            }else{
              req.userRole = result[0].role;
              if(result[0].role !== "admin"){
                return res.redirect("/main");
              }
            }
            next();
          });
        }else{
          next();
        }
      }else{
        return res.redirect("/");
      }
    }else{
      next();
    }
    
  });
};