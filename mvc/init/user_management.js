$(function() {
    var model = new usermanageModel(),
        view = new usermanageView(model),
        controller = new usermanageController(model, view);
}
);