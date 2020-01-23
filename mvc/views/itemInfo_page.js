var itemInfoView = function (model) {
    this.model = model;
    this.loadEvent = new Event(this);
    this.submitEvent = new Event(this);
    this.deleteEvent = new Event(this);
    this.init();
}

itemInfoView.prototype.init = function () {
    this.cacheObjects();
    this.handlers();
    this.enable();
};

itemInfoView.prototype.cacheObjects = function () {

    this.$container = $("body");
    this.$back_button = $("#back");
    this.$info = $("#info");

    return this;
};

itemInfoView.prototype.load = function () {
    this.loadEvent.notify();
}

itemInfoView.prototype.loaded = function (data) {
    this.show(data);
}

itemInfoView.prototype.submit = function (data) {
    var info = [];
    var bid = parseInt($('.add_bid').val(), 10);
    var currently = parseInt(data[0].currently, 10);
    if ($('.add_bid').val() == '') {
        anchorTo('basicAnchor');
        $('.add_bid').css('border', '2px solid rgb(196, 48, 0)');
        return;
    } else {
        $('.add_bid').css('border', '1px solid #cccccc');
    }
    if (bid <= currently) {
        anchorTo('basicAnchor');
        $('.add_bid').css('border', '2px solid rgb(196, 48, 0)');
        return;
    } else {
        $('.add_bid').css('border', '1px solid #cccccc');
    }
    info.push(data[0].itemID, bid);
    this.submitEvent.notify(info);
}

itemInfoView.prototype.handlers = function () {
    this.loadHandler = this.load.bind(this);
    this.loadedHandler = this.loaded.bind(this);
    this.submitHandler = this.submit.bind(this);
}

itemInfoView.prototype.enable = function () {
    $(document).on('load', this.loadHandler());
    this.$back_button.click(this.backHandler);

    this.model.loadEvent.attach(this.loadedHandler);

    return this;
}

itemInfoView.prototype.show = function (data) {
    var _this = this;
    if (data[0].image !== null) {
        $('.show_image').attr('src', '/images/' + data[0].image);
    } else {
        $($('.show_image').parent()).remove();
    }
    $('#name').text(data[0].name);
    $('#sbp').append('<span class="price">' + data[0].currently + '<i class="fas fa-euro-sign"></i></span>');
    if (data[0].buy_price == 0) {
        $('#sp').remove();
    } else {
        $('#sp').append('<span class="price">' + data[0].buy_price + '<i class="fas fa-euro-sign"></i></span>');
    }
    $('.submit_bid').on('click', function () {
        if (confirm("Are you sure?")) {
            _this.submit(data);
        }
    });
    $('#desc').text(data[0].description);
    $('#started').html($('#started').html().replace($('#started').text(), data[0].started.slice(0, 10)));
    $('#ends').html($('#ends').html().replace($('#ends').text(), data[0].ends.slice(0, 10)));
    var location = data[0].location.split(',');
    var map = L.map('mapid').setView([location[0], location[1]], 13);
    L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([location[0], location[1]]).addTo(map);
    var other_images = data[0].other_images.split(',');
    var html = '';
    for (var i = 0; i < other_images.length; i++) {
        html += '<div class="itemInfo_inputs_inner_container"> ' +
            '<img class="show_additional_image" src="/images/' + other_images[i] + '"> ' +
            '</div>';
    };
    $('.additional_images_wrap_container').append(html);
    if (data[0].seller_fk == data[0].user_requests) {
        if (data[0].number_of_bids == 0) {
            var html = '';
            html += '<div class="edit_container">';
            html += '<div class="edit_innter_container">';
            html += '<div class="button_edit_container">'
            html += '<button class="general_button delete_btn">Delete</button>';
            html += '</div>'
            html += '<div class="button_edit_container">'
            html += '<button class="general_button edit_btn">Edit</button>';
            html += '</div></div></div>'
            $('.inner_itemInfo_container').append(html);
            $('.delete_btn').on('click', function () {
                _this.deleteEvent.notify(data[0].itemID);
            });
            $('.edit_btn').on('click', function () {
                window.location.assign("/main/myitems/addItem?id=" + data[0].itemID);
            });
        }
    }
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function anchorTo(anchor) {
    const this_anchor = document.getElementById(anchor);
    const yCoordinate = this_anchor.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
        top: yCoordinate,
        behavior: 'smooth'
    });
}