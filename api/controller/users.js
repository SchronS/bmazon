var user = require('../model/users');

exports.list_all_users = function(req,res){
    user.getAllUsers(function(err,users){
        if(err){
            res.send(err);
        }
        else{
            res.send(users);
        }
    });
};

exports.user_mangagement_page = function(req,res){
    res.render('user_management.html');
};

exports.info_page = function(req,res){
    res.render('info.html');
};

exports.update_page = function(req,res){
    res.render('update.html');
};

exports.selected_user = function(req,res){
    username = req.body.username;
    user.selectedUser(username,function(err,user){
        if(err){
            res.send(err);
        }
        else{
            res.send(user);
        }
    });
}

exports.user_info = function(req,res){
    username = req.body.username;
    user.getUserInfo(username,function(err,user_info){
        if(err){
            res.send(err);
        }
        else{
            res.send(user_info);
        }
    });
};

exports.delete_user = function(req,res){
    username = req.body.username;
    user.deleteUser(username,function(err){
        if(err){
            res.send(err);
        }
    });
};

exports.update_user = function(req,res){
    data = req.body.data;
    username = req.body.username;
    user.updateUser(username,data,function(err,response){
        if(err){
            res.send(err);
        }
        else{
            res.send(response);
        }
    });
};

exports.get_role = function(req,res){
    username = req.userId;
    user.getRole(username,function(err,response){
        if(err){
            res.send(err);
        }
        else{
            res.send(response);
        }
    });
}