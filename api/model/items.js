var sql = require('../../connect_db');

var item = function (item) {
    this.itemID = item.itemID;
    this.category = item.category;
    this.currently = item.currently;
    this.buy_price = item.buy_price;
    this.first_bid = item.first_bid;
    this.number_of_bids = item.number_of_bids;
    this.location = item.location;
    this.started = item.started;
    this.ends = item.ends;
    this.seller_fk = item.seller_fk;
    this.description = item.description;
};

item.loadItems = function (result) {
    sql_query = "select * from tedi.items";
    sql.query(sql_query, function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

item.loadmyItems = function (username, result) {
    sql_query = "select * from tedi.items " +
        "where items.seller_fk = ?;";
    sql.query(sql_query, username, function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

item.addItem = function (name, category, currently, buy_price, first_bid, number_of_bids, location, started, ends, seller_fk, description, image, other_images, result) {
    data = [];
    data.push(name, category, currently, buy_price, first_bid, number_of_bids, location, started, ends, seller_fk, description, image, other_images);
    sql.query("insert into tedi.items (name, category, currently, buy_price, first_bid, number_of_bids, location, started, ends, seller_fk, description, image, other_images) values(?,?,?,?,?,?,?,?,?,?,?,?,?)", data, function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

item.loadItem = function(id, result){
    sql.query("select * from tedi.items where items.itemID = ?", id, function(err,res){
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

item.updateItemBid = function(itemID, currently,result){
    sql.query("update tedi.items set items.currently = ? , items.number_of_bids = items.number_of_bids + 1 where items.itemID = ?",[currently,itemID], function(err,res){
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

item.deleteItem = function(itemID,result){
    sql.query("delete from tedi.items where items.itemID = ?",itemID,function(err,res){
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

item.updateItem = function (itemID ,name, category, currently, buy_price, first_bid, number_of_bids, location, started, ends, seller_fk, description, image, other_images, result) {
    data = [];
    id = parseInt(itemID,10);
    data.push(name, category, currently, buy_price, first_bid, number_of_bids, location, started, ends, seller_fk, description, image, other_images,id);
    sql_query = "update tedi.items set items.name = ?, items.category = ?, items.currently = ?, items.buy_price = ?, items.first_bid = ?, items.number_of_bids = ?, "+
                "items.location = ?, items.started = ?, items.ends = ?, items.seller_fk = ?, items.description = ?, "+
                "items.image = ?, items.other_images = ? where items.itemID = ?";
    sql.query(sql_query, data, function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

item.getAllItems = function (result) {
    sql_query = "select * from tedi.items";
    sql.query(sql_query, function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = item;