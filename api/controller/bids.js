var bids = require('../model/bids');

exports.add_bid = function(req,res){
    var username = req.userId;
    var itemID = req.body.itemID;
    var amount = req.body.amount;

    bids.addBid(username,itemID,amount,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    });
};

exports.mybids_page = function(req,res){
    res.render('mybids.html');
};

exports.load_mybids = function(req,res){
    var username = req.userId;
    bids.loadMybids(username,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    });
};