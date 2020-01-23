$(function() {
    var model = new registerModel(),
        view = new registerView(model),
        controller = new registerController(model, view);
});