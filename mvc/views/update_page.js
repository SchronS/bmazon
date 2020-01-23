var updateView = function(model) {
    this.model = model;
    this.loadEvent = new Event(this);
    this.submitEvent = new Event(this);
    this.init();
}

updateView.prototype.init = function() {
    this.cacheObjects();
    this.handlers();
    this.enable();
};

updateView.prototype.cacheObjects = function() {

    this.$inputs = $('.update_inputs_inner_container').children('input,a,select');
    this.$submit_button = $(".update_button");
    this.$back_button = $(".return_button");

    return this;
};

updateView.prototype.load = function(){
    this.loadEvent.notify();
}

updateView.prototype.loaded = function(data) {
    this.show(data);
}

updateView.prototype.back = function(){
    window.location.assign("/user_management");
}

updateView.prototype.submit = function(){
    var data = []
    for(var i = 0; i < this.$inputs.length;i++){
        if(this.$inputs[i].id  !== '' && this.$inputs[i].id  !== 'submit'){
            console.log(this.$inputs[i].id);
            data.push(this.$inputs[i].value);
        }
    }
    this.submitEvent.notify(data);
}

updateView.prototype.handlers = function() {
    this.loadHandler = this.load.bind(this);
    this.loadedHandler = this.loaded.bind(this);

    this.backHandler = this.back.bind(this);
    this.submitHandler = this.submit.bind(this);
}

updateView.prototype.enable = function() {
    $(document).on('load',this.loadHandler());
    this.$back_button.click(this.backHandler);
    this.$submit_button.click(this.submitHandler);

    $(".checkbox_wrapper").click(function(){
        if($(this).val()==1){
            var check = $(this).children('.checked_checkbox');
            $(check).css("visibility","hidden");
            $(this).val(0);
        }else{
            var check = $(this).children('.checked_checkbox');
            $(check).css("visibility","visible");
            $(this).val(1);
        }
    });

    this.model.loadEvent.attach(this.loadedHandler);

    return this;
}

updateView.prototype.show = function(data) {
    for(var i = 0; i < this.$inputs.length;i++){
        if(this.$inputs[i].id  !== ''){
            this.$inputs[i].value = data[0][this.$inputs[i].id];
        }
    }
    $(".checkbox_wrapper").each(function(){
        if($(this).val()==1){
            var check = $(this).children('.checked_checkbox');
            $(check).css("visibility","visible");
        }
    });
}