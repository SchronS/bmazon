var newMessageView = function (model) {
    this.model = model;
    this.submitEvent = new Event(this);
    this.init();
}

newMessageView.prototype.init = function () {
    this.cacheObjects();
    this.handlers();
    this.enable();
};

newMessageView.prototype.cacheObjects = function () {
    return this;
};

newMessageView.prototype.handlers = function () {
    this.submitHandler = this.submit.bind(this);
};

newMessageView.prototype.submit = function (data) {
    this.submitEvent.notify(data);
};

newMessageView.prototype.enable = function () {
    var dest = $('.dest_text_val');
    var msg = $('.message_val');
    var _this = this;

    $('.send_msg').on('click',function(){
        var data = [];
        data.push(dest.val(),msg.val());
        _this.submit(data);
    });

    return this;
};