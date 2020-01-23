var message = require('../model/messages');

exports.messages_page = function (req, res) {
    res.render('messages.html');
};

exports.load_available_users_messages = function(req,res){
    username = req.userId;
    message.loadAvailableUsersMessages(username,function(err,user_message){
        if(err){
            res.send(err);
        }
        else{
            res.send(user_message);
        }
    });
};

exports.new_message_page = function(req,res){
    res.render('newMessage.html');
};

exports.send_message = function(req,res){
    sender = req.userId;
    receiver = req.body.data[0];
    msg = req.body.data[1];
    message.sendMessage(sender,receiver,msg,function(err,user_message){
        if(err){
            res.send(err);
        }
        else{
            res.send(user_message);
        }
    });
};

exports.check_messages = function(req,res){
    username = req.userId;
    message.checkMessages(username,function(err,messages_count){
        if(err){
            res.send(err);
        }
        else{
            res.send(messages_count);
        }
    });
};

exports.change_state = function(req,res){
    id = req.body.id;
    message.changeState(id,function(err,response){
        if(err){
            res.send(err);
        }
        else{
            res.send(response);
        }
    });
};

exports.delete_message = function(req,res){
    id = req.body.id;
    message.deleteMessage(id,function(err,response){
        if(err){
            res.send(err);
        }
        else{
            res.send(response);
        }
    });
};