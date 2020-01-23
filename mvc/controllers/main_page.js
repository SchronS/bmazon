var mainController = function(model, view) {
    this.model = model;
    this.view = view;

    this.init();
}

mainController.prototype.init = function() {
    this.handlers();
    this.enable();
}

mainController.prototype.load = function() {
    this.model.load();
}

mainController.prototype.handlers = function() {
    this.loadHandler = this.load.bind(this);
}

mainController.prototype.enable = function() {
    this.view.loadEvent.attach(this.loadHandler())

    return this;
}