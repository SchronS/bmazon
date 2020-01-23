$(function() {
    var model = new newMessageModel(),
        view = new newMessageView(model),
        controller = new newMessageController(model, view);
}
);