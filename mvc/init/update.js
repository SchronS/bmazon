$(function() {
    var model = new updateModel(),
        view = new updateView(model),
        controller = new updateController(model, view);
}
);