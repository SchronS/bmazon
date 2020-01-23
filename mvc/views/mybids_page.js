var mybidsView = function (model) {
    this.model = model;
    this.loadEvent = new Event(this);
    this.init();
}

mybidsView.prototype.init = function () {
    this.cacheObjects();
    this.handlers();
    this.enable();
};

mybidsView.prototype.cacheObjects = function () {

    this.$container = $("body");
    this.$back_button = $("#back");
    this.$info = $("#info");

    return this;
};

mybidsView.prototype.load = function () {
    this.loadEvent.notify();
}

mybidsView.prototype.loaded = function (data) {
    this.show(data);
}

mybidsView.prototype.back = function () {
    window.location.assign("/user_management");
}

mybidsView.prototype.handlers = function () {
    this.loadHandler = this.load.bind(this);
    this.loadedHandler = this.loaded.bind(this);

    this.backHandler = this.back.bind(this);
}

mybidsView.prototype.enable = function () {
    $(document).on('load', this.loadHandler());
    this.$back_button.click(this.backHandler);

    this.model.loadEvent.attach(this.loadedHandler);

    return this;
}

mybidsView.prototype.show = function (data) {
    var html = '';
    for (var i = 0; i < data.length; i++) {
        var date = data[i].time.split('T')
        var time = date[1].split('.');
        html += '<div class="table_row">';
        html += '<div class="table_column">';
        html += '<p>' + data[i].itemID_fk +'</p>';
        html += '</div>';
        html += '<div class="table_column">';
        html += '<p>' + data[i].name +'</p>';
        html += '</div>';
        html += '<div class="table_column">';
        html += '<p>' + data[i].username_fk +'</p>';
        html += '</div>';
        html += '<div class="table_column">';
        html += '<p>' + data[i].amount +'</p>';
        html += '</div>';
        html += '<div class="table_column">';
        html += '<p>' + date[0] + ' ' + time[0] +'</p>';
        html += '</div>';
        html += '</div>';
    };
    $('.mb_inner_container').append(html);
    // $('.search').on('keyup',function(){
    //     var input = $(this).val();
    // });
}

function equalsIgnoringCase(text, other) {
    return text.localeCompare(other, undefined, { sensitivity: 'base' }) === 0;
}