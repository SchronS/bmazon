$(function() {
    var model = new mybidsModel(),
        view = new mybidsView(model),
        controller = new mybidsController(model, view);
}
);