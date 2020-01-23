var sql = require('../../connect_db');

var message = function (message) {
    this.sender = message.sender;
    this.receiver = message.receiver;
    this.message = message.message;
};

message.loadAvailableUsersMessages = function (user, result) {
    sql_query = "select * from tedi.messages where messages.receiver = ? order by messages.id DESC; " +
        "select * from tedi.messages where messages.sender = ? order by messages.id DESC; ";
    sql.query(sql_query, [user, user], function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

message.sendMessage = function (sender, receiver, msg, result) {
    sql_query = "insert into tedi.messages(sender,receiver,message,state) values(?,?,?,0)";
    sql.query(sql_query, [sender, receiver, msg], function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

message.checkMessages = function (username, result) {
    sql.query('select count(state) as new_messages from tedi.messages where state = 0 and receiver = ?;', username, function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

message.changeState = function (id, result) {
    sql.query('update tedi.messages set messages.state = 1 where messages.id = ?', id, function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

message.deleteMessage = function (id, result) {
    sql.query('delete from tedi.messages where messages.id = ?', id, function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = message;