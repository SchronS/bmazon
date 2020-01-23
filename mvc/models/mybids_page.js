var mybidsModel = function() {
    this.loadEvent = new Event(this);
}

mybidsModel.prototype.load = function() {
    $.ajax({
        url: '/main/mybids',
        type: 'POST',
        dataType: 'json',
        success: (data) => {
            this.loadEvent.notify(data);
        }
    });
};