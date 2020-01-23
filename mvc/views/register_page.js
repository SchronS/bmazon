var registerView = function (model) {
    this.model = model;
    this.submitEvent = new Event(this);
    this.init();
}

registerView.prototype.init = function () {
    this.cacheObjects();
    this.handlers();
    this.enable();
};

registerView.prototype.cacheObjects = function () {
    this.$inputs = $('.register_inputs_inner_container').children('input');
    this.$submit_button = $('.register_button');

    return this;
};

registerView.prototype.submit = function (result) {
    this.show(result);
}

registerView.prototype.submitButton = function () {
    var data = [];
    var $pass = $(this.$inputs).filter(".register_password");
    var $re_pass = $(this.$inputs).filter(".register_re_password");
    if ($pass.val() !== $re_pass.val()) {
        $($re_pass).addClass("invalid_input");
    } else {
        for (var i = 0; i < this.$inputs.length; i++) {
            data.push($(this.$inputs[i]).val());
        }
        this.submitEvent.notify(data);
    }
}

registerView.prototype.handlers = function () {
    this.submitButtonHandler = this.submitButton.bind(this);

    this.submitHandler = this.submit.bind(this);
}

registerView.prototype.enable = function () {
    this.$submit_button.click(this.submitButtonHandler);

    this.model.submitEvent.attach(this.submitHandler);

    return this;
}

registerView.prototype.show = function (result) {
    if(result.valid == 0){
        var $username = $(this.$inputs).filter(".register_username");
        if($($username).hasClass('invalid_input'))
        {
            var invalid_text = $($username.parent()).children('.invalid_text');
            $(invalid_text).hide().stop().fadeIn("slow");
        }else{
            $username.addClass("invalid_input");
            $($username.parent()).append("<p class='invalid_text'>"+ result.response +"</p>");
            var invalid_text = $($username.parent()).children('.invalid_text');
            $(invalid_text).hide().stop().fadeIn("slow");
        }

    }else{
        $(".register_container").remove();
        html = '';
        html += '<div class="register_success_container">';
        html += '<div class="register_success_inner_container">';
        html += '<p>'+ result.response +'</p>';
        html += '<input type="button" class="return_button" value="Return">';
        html += '</div></div>';
        $(html).appendTo('body');
        this.$return = $('.register_return');
        $(this.$return).click(function(){
            window.location.assign("/");
        });
    }
}