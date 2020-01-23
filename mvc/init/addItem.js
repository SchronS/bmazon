$(function() {
    var model = new addItemModel(),
        view = new addItemView(model),
        controller = new addItemController(model, view);
});