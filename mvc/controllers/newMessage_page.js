var newMessageController = function(model, view) {
    this.model = model;
    this.view = view;

    this.init();
}

newMessageController.prototype.init = function() {
    this.handlers();
    this.enable();
}

newMessageController.prototype.submit = function(data) {
    this.model.submit(data);
}

newMessageController.prototype.handlers = function() {
    this.submitHandler = this.submit.bind(this);
}

newMessageController.prototype.enable = function() {
    this.view.submitEvent.attach(this.submitHandler)

    return this;
}