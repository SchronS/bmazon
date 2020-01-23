var myitemsController = function(model, view) {
    this.model = model;
    this.view = view;

    this.init();
}

myitemsController.prototype.init = function() {
    this.handlers();
    this.enable();
}

myitemsController.prototype.load = function() {
    this.model.load();
}

myitemsController.prototype.handlers = function() {
    this.loadHandler = this.load.bind(this);
}

myitemsController.prototype.enable = function() {
    this.view.loadEvent.attach(this.loadHandler())

    return this;
}