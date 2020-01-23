var usermanageModel = function() {
    this.loadEvent = new Event(this);
}

usermanageModel.prototype.load = function() {
    $.ajax({
        url: '/user_management',
        type: 'POST',
        dataType: 'json',
        success: (data) => {
            this.loadEvent.notify(data);
        }
    });
};

usermanageModel.prototype.delete = function(username){
    $.ajax({
        url: '/user_management/delete',
        type: 'POST',
        dataType: 'json',
        success: (data)=>{
            console.log(username + " deleted");
        }
    })
}