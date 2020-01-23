$(function() {
    var model = new myitemsModel(),
        view = new myitemsView(model),
        controller = new myitemsController(model, view);
}
);