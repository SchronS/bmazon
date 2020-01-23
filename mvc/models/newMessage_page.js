var newMessageModel = function() {
    this.submitEvent = new Event(this);
}

newMessageModel.prototype.submit = function(data) {
    $.ajax({
        url: '/main/new_message',
        type: 'POST',
        dataType: 'json',
        data: {data:data},
        success: () => {
            window.location.assign('/main/messages');
        }
    });
};