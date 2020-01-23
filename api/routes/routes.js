'use strict';
var multer = require('multer');
var upload = multer({dest:'/images'});
module.exports = function(app) {
    //--------------------------------------------------User Routes--------------------------------------------------\\
    var user_controller = require('../controller/users');
    
    app.route('/users')
        .get(user_controller.list_all_users);

    app.route('/user_management')
        .get(user_controller.user_mangagement_page)
        .post(user_controller.list_all_users);

    app.route('/user_management/update')
        .get(user_controller.update_page)
        .post(user_controller.selected_user);
    
    app.route('/user_management/info')
        .get(user_controller.info_page)
        .post(user_controller.user_info);

    app.route('/user_management/delete')
        .post(user_controller.delete_user);
    
    app.route('/user_management/update/submit')
        .post(user_controller.update_user);

    app.route('/getRole')
        .post(user_controller.get_role);

    //--------------------------------------------------Login Routes--------------------------------------------------\\
    var login_controller = require('../controller/login');

    app.route('/')
        .get(login_controller.indexpage)
        .post(login_controller.login);

    app.route('/register')
        .get(login_controller.register_page)
        .post(login_controller.register_user);

    //--------------------------------------------------Item Routes--------------------------------------------------\\
    var item_controller = require('../controller/items');

    app.route('/main')
        .get(item_controller.mainpage)
        .post(item_controller.load_items);

    app.route('/main/myitems')
        .get(item_controller.myitems_page)
        .post(item_controller.load_myitems);

    app.route('/main/myitems/addItem')
        .get(item_controller.addItem_page)
        .post(item_controller.add_item);

    app.route('/saveImages')
        .post(item_controller.saveImages);

    app.route('/itemInfo')
        .get(item_controller.itemInfo_page)
        .post(item_controller.load_item);

    app.route('/updateItemBids')
        .post(item_controller.update_item_bid);

    app.route('/deleteItem')
        .post(item_controller.delete_item);  
    
    app.route('/updateItem')
        .post(item_controller.update_item);

    app.route('/getAllItems')
        .get(item_controller.get_all_items);

    //--------------------------------------------------Bids Routes--------------------------------------------------\\
    var bids_controller = require('../controller/bids');

    app.route('/addBid')
        .post(bids_controller.add_bid);

    app.route('/main/mybids')
        .get(bids_controller.mybids_page)
        .post(bids_controller.load_mybids);

    //--------------------------------------------------Categories Routes--------------------------------------------------\\
    var categories_controller = require('../controller/categories');

    app.route('/getCategories')
        .get(categories_controller.get_all_categories);

    //--------------------------------------------------Messages Routes--------------------------------------------------\\
    var messages_controller = require('../controller/messages');

    app.route('/main/messages')
        .get(messages_controller.messages_page)
        .post(messages_controller.load_available_users_messages);

    app.route('/main/new_message')
        .get(messages_controller.new_message_page)
        .post(messages_controller.send_message);

    app.route('/check_messages')
        .get(messages_controller.check_messages);

    app.route('/changeState')
        .post(messages_controller.change_state);

    app.route('/delete_message')
        .post(messages_controller.delete_message);
};