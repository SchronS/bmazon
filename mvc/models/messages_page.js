var messagesModel = function() {
    this.loadEvent = new Event(this);
}

messagesModel.prototype.load = function() {
    $.ajax({
        url: '/main/messages',
        type: 'POST',
        dataType: 'json',
        success: (data) => {
            this.loadEvent.notify(data);
        }
    });
};

messagesModel.prototype.changeState = function(id){
    $.ajax({
        url: '/changeState',
        type: 'POST',
        dataType: 'json',
        data: {id:id},
    });
};

messagesModel.prototype.deleteMessage = function(id){
    $.ajax({
        url: '/delete_message',
        type: 'POST',
        dataType: 'json',
        data: {id:id},
        success: (data) => {
            window.location.assign('/main/messages');
        }
    });
};