var infoModel = function() {
    this.loadEvent = new Event(this);
}

infoModel.prototype.load = function() {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    $.ajax({
        url: '/user_management/info',
        type: 'POST',
        dataType: 'json',
        data: {username: username},
        success: (data) => {
            this.loadEvent.notify(data);
        }
    });
};