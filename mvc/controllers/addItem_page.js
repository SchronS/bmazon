var addItemController = function (model, view) {
    this.model = model;
    this.view = view;

    this.init();
}

addItemController.prototype.init = function () {
    this.handlers();
    this.enable();
}

addItemController.prototype.getCategories = function () {
    this.model.getCategories();
}

addItemController.prototype.submit = function (data) {
    this.model.submit(data);
}

addItemController.prototype.saveImages = function (data) {
    this.model.saveImages(data);
}

addItemController.prototype.edit = function(id){
    this.model.edit(id);
}

addItemController.prototype.handlers = function () {
    this.submitHandler = this.submit.bind(this);
    this.getCategoriesHandler = this.getCategories.bind(this);
    this.saveImagesHandler = this.saveImages.bind(this);
    this.editHandler = this.edit.bind(this);
}

addItemController.prototype.enable = function () {
    this.view.submitEvent.attach(this.submitHandler);
    this.view.getCategoriesEvent.attach(this.getCategoriesHandler);
    this.view.saveImagesEvent.attach(this.saveImagesHandler);
    this.view.editEvent.attach(this.editHandler);

    return this;
}