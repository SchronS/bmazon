var mybidsController = function(model, view) {
    this.model = model;
    this.view = view;

    this.init();
}

mybidsController.prototype.init = function() {
    this.handlers();
    this.enable();
}

mybidsController.prototype.load = function() {
    this.model.load();
}

mybidsController.prototype.handlers = function() {
    this.loadHandler = this.load.bind(this);
}

mybidsController.prototype.enable = function() {
    this.view.loadEvent.attach(this.loadHandler())

    return this;
}