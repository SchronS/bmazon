var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",//your username
    password: "toor",//your password
    database : "tedi",
    multipleStatements: true
});

con.connect(function(err) {
    if (err) throw err;
});

module.exports = con;
