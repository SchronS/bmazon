$(function() {
    var model = new indexModel(),
        view = new indexView(model),
        controller = new indexController(model, view);
});