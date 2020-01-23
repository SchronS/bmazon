var item = require('../model/items');
var fs = require('fs');
var uuidv4 = require('uuid/v4');
var js2xmlparser = require("js2xmlparser");

exports.mainpage = function (req, res) {
    res.render('main.html');
}

exports.featured_preview = function (req, res) {
    item.featuredPreview(function (err, featured_items) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(featured_items);
        }
    });
}

exports.load_items = function (req, res) {
    item.loadItems(function (err, items) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(items);
        }
    });
}

exports.myitems_page = function (req, res) {
    res.render('myitems.html');
}

exports.addItem_page = function (req, res) {
    res.render('addItem.html');
}

exports.load_myitems = function (req, res) {
    username = req.userId
    item.loadmyItems(username, function (err, items) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(items);
        }
    });
}

exports.saveImages = function (req, res) {
    var images_names = [];
    if (req.body.images !== undefined && req.body.images !== null && req.body.images !== []) {
        for (var i = 0; i < req.body.images.length; i++) {
            contents = req.body.images[i].split(',')[1];
            names = uuidv4();
            fs.writeFileSync("./images/" + names + ".png", contents, 'base64', err => console.log(err));
            images_names.push(names + ".png");
        }
    };
    if (req.body.displayImage !== undefined && req.body.displayImage !== null && req.body.displayImage !== '') {
        contents = req.body.displayImage.split(',')[1];
        var displayName = uuidv4();
        fs.writeFileSync("./images/" + displayName + ".png", contents, 'base64', err => console.log(err));
        displayName += ".png";
    };
    res.send({ imagesNames: images_names, displayName: displayName });
}

exports.add_item = function (req, res) {
    var name = req.body.name;
    var category = req.body.category;
    var currently = req.body.first_bid;
    var buy_price = req.body.buy_price;
    var first_bid = req.body.first_bid;
    var number_of_bids = 0;
    var location = req.body.location;
    var started = req.body.started;
    var ends = req.body.ends;
    var seller_fk = req.userId;
    var description = req.body.description;
    var image = req.body.image;
    var other_images = req.body.other_images;

    item.addItem(name, category, currently, buy_price, first_bid, number_of_bids, location, started, ends, seller_fk, description, image, other_images, function (err, item) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(item);
        }
    });
};

exports.itemInfo_page = function (req, res) {
    res.render('itemInfo.html');
};

exports.load_item = function (req, res) {
    var id = req.body.id;
    item.loadItem(id, function (err, item) {
        if (err) {
            res.send(err);
        }
        else {
            item[0]['user_requests'] = req.userId;
            res.send(item);
        }
    });
};

exports.update_item_bid = function (req, res) {
    var itemID = req.body.itemID;
    var currently = req.body.currently;
    item.updateItemBid(itemID, currently, function (err, item) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(item);
        }
    });
};

exports.delete_item = function(req,res){
    var itemID = req.body.id;
    item.deleteItem(itemID, function (err, item) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(item);
        }
    });
};

exports.update_item = function(req,res){
    var name = req.body.name;
    var category = req.body.category;
    var currently = req.body.first_bid;
    var buy_price = req.body.buy_price;
    var first_bid = req.body.first_bid;
    var number_of_bids = 0;
    var location = req.body.location;
    var started = req.body.started;
    var ends = req.body.ends;
    var seller_fk = req.userId;
    var description = req.body.description;
    var image = req.body.image;
    var other_images = req.body.other_images;
    var itemID = req.query.id;

    item.updateItem(itemID, name, category, currently, buy_price, first_bid, number_of_bids, location, started, ends, seller_fk, description, image, other_images, function (err, item) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(item);
        }
    });
};

exports.get_all_items = function (req, res) {
    var type = req.query.id;
    item.getAllItems(function (err, items) {
        if (err) {
            res.send(err);
        }
        else {
            if(type == 2){
                var xml = js2xmlparser.parse("allItems", items);
                res.set('Content-Type', 'text/xml');
                return res.send(xml);
            }
            res.send(items);
        }
    });
}