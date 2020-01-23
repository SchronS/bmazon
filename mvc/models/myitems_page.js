var myitemsModel = function() {
    this.loadEvent = new Event(this);
}

myitemsModel.prototype.load = function() {
    $.ajax({
        url: '/main/myitems',
        type: 'POST',
        dataType: 'json',
        success: (data) => {
            this.loadEvent.notify(data);
        }
    });
};