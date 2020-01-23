var registerModel = function () {
    this.submitEvent = new Event(this);
}

registerModel.prototype.submit = function (data) {
    $.ajax({
        url: '/register',
        type: 'POST',
        data: { data: data },
        dataType: 'json',
        success: (result) => {
            this.submitEvent.notify(result);
        }
    });
};