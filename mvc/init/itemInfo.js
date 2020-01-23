$(function () {
    var model = new itemInfonfoModel(),
        view = new itemInfoView(model),
        controller = new itemInfoController(model, view);
}
);