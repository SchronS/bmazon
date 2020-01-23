var indexModel = function () {
    this.username = "";
    this.password = "";
    this.submitEvent = new Event(this);
    this.registerEvent = new Event(this);
}

indexModel.prototype.submit = function (data) {

    this.username = data[0];
    this.password = data[1];
    $.ajax({
        url: '/',
        type: 'POST',
        data: { username: this.username, password: this.password },
        dataType: 'json',
        success: (data) => {
            document.cookie = 'access_token=' + data.token;
            this.submitEvent.notify(data.msg);
            if (typeof data.location !== 'undefined') {
                window.location.assign(data.location);
            }

        }
    });
};

indexModel.prototype.register = function(){
    window.location.assign('/register');
}