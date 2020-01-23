var mainModel = function() {
    this.loadEvent = new Event(this);
}

mainModel.prototype.load = function() {
    $.ajax({
        url: '/main',
        type: 'POST',
        dataType: 'json',
        success: (data) => {
            this.loadEvent.notify(data);
        }
    });
};