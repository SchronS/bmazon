var messagesController = function(model, view) {
    this.model = model;
    this.view = view;

    this.init();
}

messagesController.prototype.init = function() {
    this.handlers();
    this.enable();
}

messagesController.prototype.load = function() {
    this.model.load();
}

messagesController.prototype.handlers = function() {
    this.loadHandler = this.load.bind(this);
    this.changeStateHandler = this.changeState.bind(this);
    this.deleteMessageHandler = this.deleteMessage.bind(this);
}

messagesController.prototype.changeState = function(id){
    this.model.changeState(id);
}

messagesController.prototype.deleteMessage = function(id){
    this.model.deleteMessage(id);
}

messagesController.prototype.enable = function() {
    this.view.loadEvent.attach(this.loadHandler());
    this.view.changeStateEvent.attach(this.changeStateHandler);
    this.view.deleteMessageEvent.attach(this.deleteMessageHandler);

    return this;
}