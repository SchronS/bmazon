$(function() {
    var model = new mainModel(),
        view = new mainView(model),
        controller = new mainController(model, view);
}
);