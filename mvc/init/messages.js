$(function() {
    var model = new messagesModel(),
        view = new messagesView(model),
        controller = new messagesController(model, view);
}
);