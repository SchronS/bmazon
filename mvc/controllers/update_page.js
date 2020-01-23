var updateController = function(model, view) {
    this.model = model;
    this.view = view;

    this.init();
}

updateController.prototype.init = function() {
    this.handlers();
    this.enable();
}

updateController.prototype.load = function() {
    this.model.load();
}

updateController.prototype.submit = function(data){
    this.model.submit(data);
}

updateController.prototype.handlers = function() {
    this.loadHandler = this.load.bind(this);
    this.submitHandler = this.submit.bind(this);
}

updateController.prototype.enable = function() {
    this.view.loadEvent.attach(this.loadHandler());
    this.view.submitEvent.attach(this.submitHandler);

    return this;
}