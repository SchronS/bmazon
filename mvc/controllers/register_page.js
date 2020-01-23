var registerController = function (model, view) {
    this.model = model;
    this.view = view;

    this.init();
}

registerController.prototype.init = function () {
    this.handlers();
    this.enable();
}

registerController.prototype.submit = function (data) {
    this.model.submit(data);
}

registerController.prototype.handlers = function () {
    this.submitHandler = this.submit.bind(this);
}

registerController.prototype.enable = function () {
    this.view.submitEvent.attach(this.submitHandler);

    return this;
}