var indexView = function (model) {
    this.model = model;
    this.submitEvent = new Event(this);
    this.registerEvent = new Event(this);
    this.init();
}

indexView.prototype.init = function () {
    this.cacheObjects();
    this.handlers();
    this.enable();
};

indexView.prototype.cacheObjects = function () {
    this.$container = $('.login_container');
    this.$username = $('.login_username');
    this.$password = $('.login_password');
    this.$register_button = $('.register_button');
    this.$submit_button = $('.login_button');
    return this;
};

indexView.prototype.submit = function (data) {
    this.show(data);
}

indexView.prototype.submitButton = function () {
    let data = [];
    data.push(this.$username.val());
    data.push(this.$password.val());
    this.submitEvent.notify(data);
}

indexView.prototype.registerButton = function(){
    this.registerEvent.notify();
}

indexView.prototype.handlers = function () {
    this.submitButtonHandler = this.submitButton.bind(this);
    this.registerButtonHandler = this.registerButton.bind(this);

    this.submitHandler = this.submit.bind(this);
}

indexView.prototype.enable = function () {
    this.$submit_button.click(this.submitButtonHandler);
    this.$register_button.click(this.registerButtonHandler);

    this.model.submitEvent.attach(this.submitHandler);

    return this;
}

indexView.prototype.show = function (data) {
    if(data !== "User found"){
        alert(data);
    }
    
}