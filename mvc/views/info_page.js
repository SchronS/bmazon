var infoView = function(model) {
    this.model = model;
    this.loadEvent = new Event(this);
    this.init();
}

infoView.prototype.init = function() {
    this.cacheObjects();
    this.handlers();
    this.enable();
};

infoView.prototype.cacheObjects = function() {

    this.$container = $("body");
    this.$back_button = $("#back");
    this.$info = $("#info");

    return this;
};

infoView.prototype.load = function(){
    this.loadEvent.notify();
}

infoView.prototype.loaded = function(data) {
    this.show(data);
}

infoView.prototype.back = function(){
    window.location.assign("/user_management");
}

infoView.prototype.handlers = function() {
    this.loadHandler = this.load.bind(this);
    this.loadedHandler = this.loaded.bind(this);

    this.backHandler = this.back.bind(this);
}

infoView.prototype.enable = function() {
    $(document).on('load',this.loadHandler());
    this.$back_button.click(this.backHandler);

    this.model.loadEvent.attach(this.loadedHandler);

    return this;
}

infoView.prototype.show = function(data) {
    let $info = this.$info;
    if(data[0].username == null){
        $info.append("<p>No bids found for this user</p>")
    }else{
        $info.append("<p>Username: " + data[0].username + "</p>"+
                     "<p>Name: " + data[0].name + "</p>"+
                     "<p>Lastname: " + data[0].lastname + "</p>"+
                     "<p>Total Bids: " + data[0].total_bids + "</p>"+
                     "<p>Total Amount Bidded: " + data[0].total_amount_bidded + "$</p>");
    }
}