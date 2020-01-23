var updateModel = function() {
    this.loadEvent = new Event(this);
}

updateModel.prototype.load = function() {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    $.ajax({
        url: '/user_management/update',
        type: 'POST',
        dataType: 'json',
        data: {username: username},
        success: (data) => {
            this.loadEvent.notify(data);
        }
    });
};

updateModel.prototype.submit = function(data) {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    $.ajax({
        url: '/user_management/update/submit',
        type: 'POST',
        dataType: 'json',
        data: {data: data ,username: username},
        success: () =>{
            window.location.assign("/user_management");
        }
    });
};