var sql = require('../../connect_db');

var user = function (user) {
    this.username = user.username;
    this.password = user.password;
};

user.identify_user = function (username, password, result) {
    var filter = [username, password];
    sql.query("select * from tedi.users where username= ? and password= ?;", filter, function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

user.registerUser = function (data, result) {
    sql.query("insert into tedi.users " +
        "values(?,?,?,?,?,?,?,?,?,?);", data, function (err, res) {
            if (err) {
                //console.log("Error: ",err);
                return result(null, err);
            }
            else {
                return result(null, res);
            }
        });
}

module.exports = user;