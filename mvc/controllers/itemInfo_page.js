var itemInfoController = function(model, view) {
    this.model = model;
    this.view = view;

    this.init();
}

itemInfoController.prototype.init = function() {
    this.handlers();
    this.enable();
}

itemInfoController.prototype.load = function() {
    this.model.load();
}

itemInfoController.prototype.submit = function(info){
    this.model.submit(info);
}

itemInfoController.prototype.delete = function(id){
    this.model.delete(id);
}

itemInfoController.prototype.handlers = function() {
    this.loadHandler = this.load.bind(this);
    this.submitHandler = this.submit.bind(this);
    this.deleteHandler = this.delete.bind(this);
}

itemInfoController.prototype.enable = function() {
    this.view.loadEvent.attach(this.loadHandler());
    this.view.submitEvent.attach(this.submitHandler);
    this.view.deleteEvent.attach(this.deleteHandler);

    return this;
}