var usermanageController = function(model, view) {
    this.model = model;
    this.view = view;

    this.init();
}

usermanageController.prototype.init = function() {
    this.handlers();
    this.enable();
}

usermanageController.prototype.load = function(data) {
    this.model.load();
}

usermanageController.prototype.delete = function(username){
    this.model.delete(username);
}

usermanageController.prototype.handlers = function() {
    this.loadHandler = this.load.bind(this);
    this.deleteHandler = this.delete.bind(this);
}

usermanageController.prototype.enable = function() {
    this.view.loadEvent.attach(this.loadHandler());
    this.view.deleteEvent.attach(this.deleteHandler);

    return this;
}