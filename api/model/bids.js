var sql = require('../../connect_db');
var moment = require('moment');

var bids = function(bids){
    this.itemID_fk = bids.itemID_fk;
    this.username_fk = bids.username_fk;
    this.amount = bids.amount;
    this.time = bids.time;
}

bids.addBid = function(username_fk,itemID_fk,amount,result){
    let time = moment().format( 'YYYY-MM-DD  HH:mm:ss.000' );
    sql.query("insert into tedi.bids values(?,?,?,?)",[itemID_fk,username_fk,amount,time],function(err,res){
        if(err){
            console.log("Error: ",err);
            result(null,err);
        }
        else{
            result(null,{currently:amount});
        }
    });
};

bids.loadMybids = function(username_fk,result){
    sql.query("select bids.* , items.name from tedi.bids,tedi.items where bids.itemID_fk = items.itemID and bids.username_fk = ?  order by bids.itemID_fk , bids.amount DESC",username_fk,function(err,res){
        if(err){
            console.log("Error: ",err);
            result(null,err);
        }
        else{
            result(null,res);
        }
    });
}

module.exports = bids;