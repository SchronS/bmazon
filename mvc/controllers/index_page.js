var indexController = function (model, view) {
    this.model = model;
    this.view = view;

    this.init();
}

indexController.prototype.init = function () {
    this.handlers();
    this.enable();
}

indexController.prototype.submit = function (data) {
    this.model.submit(data);
}

indexController.prototype.register = function(){
    this.model.register();
}

indexController.prototype.handlers = function () {
    this.submitHandler = this.submit.bind(this);
    this.registerHandler = this.register.bind(this);
}

indexController.prototype.enable = function () {
    this.view.submitEvent.attach(this.submitHandler);
    this.view.registerEvent.attach(this.registerHandler);

    return this;
}