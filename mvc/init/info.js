$(function() {
    var model = new infoModel(),
        view = new infoView(model),
        controller = new infoController(model, view);
}
);