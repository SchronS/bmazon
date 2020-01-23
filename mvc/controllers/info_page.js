var infoController = function(model, view) {
    this.model = model;
    this.view = view;

    this.init();
}

infoController.prototype.init = function() {
    this.handlers();
    this.enable();
}

infoController.prototype.load = function() {
    this.model.load();
}

infoController.prototype.handlers = function() {
    this.loadHandler = this.load.bind(this);
}

infoController.prototype.enable = function() {
    this.view.loadEvent.attach(this.loadHandler())

    return this;
}