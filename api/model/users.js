var sql = require('../../connect_db');

var user = function(user){
    this.username = user.username;
    this.password = user.password;
    this.name = user.name;
    this.lastname = user.lastname;
    this.mail = user.mail;
    this.phone = user.phone;
    this.address = user.address;
    this.geolocation = user.geolocation;
    this.afm = user.afm;
    this.role = user.role;
};

user.getAllUsers = function(result){
    sql.query("select * from tedi.users",function(err,res){
        if(err){
            console.log("Error: ",err);
            result(null,err);
        }
        else{
            result(null,res);
        }
    });
};

user.getUserInfo = function(username,result){
    var sql_query = "select users.username,users.name,users.lastname,count(bids.itemID_fk) as total_bids,sum(bids.amount) as total_amount_bidded from users,bids "+
                    "where users.username = bids.username_fk "+
                    "and username = ?;";
    sql.query(sql_query,username,function(err,res){
        if(err){
            console.log("Error: ",err);
            result(null,err);
        }
        else{
            result(null,res);
        }
    })
}

user.deleteUser = function(username,result){
    var sql_query_u = "delete from tedi.users "+
                      "where users.username = ?;";
    var sql_query_b = "delete from tedi.bids "+
                      "where bids.username_fk = ?;";
    sql.query(sql_query_u,username,function(err,res){
        if(err){
            console.log("Error: ",err);
            result(null,err);
        }
        else{
            result(null,res);
        }
    })
    sql.query(sql_query_b,username,function(err,res){
        if(err){
            console.log("Error: ",err);
            result(null,err);
        }
        else{
            result(null,res);
        }
    })
}

user.selectedUser = function(username,result){
    var sql_query = "select * from tedi.users where users.username =?;";
    sql.query(sql_query,username,function(err,res){
        if(err){
            console.log("Error: ",err);
            result(null,err);
        }
        else{
            result(null,res);
        }
    })
}

user.updateUser = function(username,data,result){
    data.push(username);
    if(username !== data[0]){
        var sql_query_b = "update tedi.bids "+
                        "set bids.username_fk = ? "+
                        "where username_fk = ?;"
        sql.query(sql_query_b,[data[0],username],function(err){
            if(err){
                console.log("Error: ",err);
                result(null,err);
            }
        });
    }
    var sql_query_u = "update tedi.users "+
                    "set users.username = ?,"+
                        "users.password = ?,"+
                        "users.name = ?,"+
                        "users.lastname = ?,"+
                        "users.mail = ?,"+
                        "users.phone = ?,"+
                        "users.address = ?,"+
                        "users.geolocation = ?,"+
                        "users.afm = ?,"+
                        "users.role = ?, "+
                        "users.activated = ? "+
                    "where users.username = ?";
    sql.query(sql_query_u,data,function(err,res){
        if(err){
            console.log("Error: ",err);
            result(null,err);
        }
        else{
            result(null,res);
        }
    });
}

user.getRole = function(username,result){
    sql.query("select users.role from tedi.users where username = ?",username,function(err,res){
        if(err){
            console.log("Error: ",err);
            result(null,err);
        }
        else{
            result(null,res);
        }
    });
}

module.exports = user;