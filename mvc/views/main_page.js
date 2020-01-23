var mainView = function (model) {
    this.model = model;
    this.loadEvent = new Event(this);
    this.init();
    this.$categories_selected = [];
}

mainView.prototype.init = function () {
    this.cacheObjects();
    this.handlers();
    this.enable();
};

mainView.prototype.cacheObjects = function () {

    this.$items_container = $("#myitems");
    return this;
};

mainView.prototype.addItem = function () {
    $.ajax({
        url: '/getRole',
        type: 'POST',
        dataType: 'json',
        success: (response) => {
            if (response[0].role == 'guest') {
                alert('Invalid Action!')
            } else {
                 window.location.assign(window.location.href + '/addItem');
            }
        }
    });
   
}

mainView.prototype.load = function () {
    this.loadEvent.notify();
}

mainView.prototype.loaded = function (data) {
    this.show(data);
}

mainView.prototype.handlers = function () {
    this.loadHandler = this.load.bind(this);
    this.loadedHandler = this.loaded.bind(this);
    this.addItemHandler = this.addItem.bind(this);
}

mainView.prototype.enable = function () {
    $(document).on('load', this.loadHandler());

    $('.addItem_button').click(this.addItemHandler);

    $(window).scroll(function () {
        var side_menu = $('.sticker');
        var main_item_container = $('.main_item_container');
        var items_table = $('.items_table');
        if ($(this).scrollTop() > 250) {
            items_table.addClass('dropshadow');
            main_item_container.removeClass('dropshadow');
            side_menu.addClass('sticky');
            side_menu.css("--top_padding", "30px");
        } else {
            side_menu.removeClass('sticky');
            items_table.removeClass('dropshadow');
            main_item_container.addClass('dropshadow');
        }
    });

    $('.search').on('keyup',function(){
        var this_search = this;
        $('.item-description').each(function(){
            var target = $($(this).parent()).parent();
            var input = ($(this_search).val()).toUpperCase();
            var string = ($($(this).children('p')).text()).toUpperCase();
            var flag = 0;
            for(var i = 0; i < input.length; i++){
                if(input.length > string.length){
                    flag = 1;
                    break;
                }
                if(input[i] !== string[i]){
                    flag = 1;
                }
            }
            if(flag == 0){
                $(target).css({'visibility': 'visible','display':'flex'});
            }else{
                $(target).css({'visibility': 'hidden','display':'none'});
            }
            if(input.length == 0){
                $(target).css({'visibility': 'visible','display':'flex'});
            }
        });
    });

    var this_view = this;

    $(document).on("click", ".checkbox_wrapper", function () {
        var category_clicked = $(this).children('.checked_checkbox').get(0).id;
        if ($(this).children('.checked_checkbox').css("visibility") == 'visible') {
            this_view.$categories_selected = this_view.$categories_selected.filter(function (item) {
                return item !== category_clicked;
            });
            $(this).children('.checked_checkbox').css("visibility", "hidden");
            $('.item-container').each(function () {
                if (this_view.$categories_selected == []) {
                    $(this).css({ "visibility": "visible", "display": "inline-flex" });
                    return true;
                }
                var item_categories = this.id.split(',');
                var flag = 0;
                for (var i = 0; i < item_categories.length; i++) {
                    for (var y = 0; y < this_view.$categories_selected.length; y++) {
                        if (item_categories[i] == this_view.$categories_selected[y]) {
                            flag++;
                            break;
                        }
                    }
                }
                if (flag == this_view.$categories_selected.length) {
                    $(this).css({ "visibility": "visible", "display": "inline-flex" });
                } else {
                    $(this).css({ "visibility": "hidden", "display": "none" });
                }
            });
        } else {
            this_view.$categories_selected.push(category_clicked);
            $(this).children('.checked_checkbox').css("visibility", "visible");
            $('.item-container').each(function () {
                var item_categories = this.id.split(',');
                var flag = 0;
                for (var i = 0; i < item_categories.length; i++) {
                    if (category_clicked === item_categories[i]) {
                        flag = 1;
                        break;
                    }
                }
                if (flag == 0) {
                    $(this).css({ "visibility": "hidden", "display": "none" });
                }
            });
        };
        // flexItemContainer();
        // flexFont();
    });

    // window.onload = function(event) {
    //     flexItemContainer();
    //     flexFont();
    // };
    // window.onresize = function(event) {
    //     flexItemContainer();
    //     flexFont();
    // };

    this.model.loadEvent.attach(this.loadedHandler);

    return this;
}

mainView.prototype.show = function (data) {
    var $items_container = this.$items_container;
    var categories = []

    var html = '';
    var html_categories = '';
    if (data && data.length !== 0) {
        html += '<div class="inner_items_table">';
        for (var i = 0; i < data.length; i++) {
            var item_categories = data[i].category.split(',');
            for (var k = 0; k < item_categories.length; k++) {
                if (categories.indexOf(item_categories[k]) < 0) {
                    categories.push(item_categories[k]);
                }
            }
            html += '<div id="' + data[i].category + '" class="flexItemContainer item-container">';
            if (data[i].image !== null) {
                if (data[i].image.length == 0) {
                    html += '<img class="placeholder_img" src ="/images/placeholder-600x400.png" id="' + data[i].itemID + '-i">';
                } else {
                    html += '<img class="placeholder_img" src ="/images/' + data[i].image + '" id="' + data[i].itemID + '-i">';
                }
            } else {
                html += '<img class="placeholder_img" src ="/images/placeholder-600x400.png" id="' + data[i].itemID + '-i">';
            }
            html += '<div class="item-description-hidden">';
            html += '<div class="item-description">';
            html += '<div class="item-desc-rows" style="justify-content:center">';
            html += '<p class="item_title flexFont" id="' + data[i].itemID + '-t">' + data[i].name + '</p>';
            html += '</div>';
            html += '<div class="item-desc-rows">';
            if (data[i].description.length > 147) {
                var long_decription = data[i].description.substring(0, 147);
                html += '<p class="flexFont">' + long_decription + '...</p>';
            } else {
                html += '<p class="flexFont">' + data[i].description + '</p>';
            }
            html += '</div>';
            html += '<div class="item-desc-rows">';
            html += '<button class="button more_info" id="' + data[i].itemID + '">More Info</button>';
            html += '</div>';
            html += '<p id="' + data[i].itemID + '-t">' + data[i].name + '</p>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        };
        html += '</div>';
        html += '</div>';
        html += '<div class="spacer" style="--spacer_height: 200px">';
        html_categories += '<div class="categories_inner_container">';
        for (var s = 0; s < categories.length; s++) {
            html_categories += '<div class="categories_list">'
            html_categories += '<a class="checkbox_wrapper"><div id="' + categories[s] + '" class="fas fa-check checked_checkbox"><input type="checkbox" value="' + categories[s] + '"></div></a><span>' + categories[s] + '</span>';
            html_categories += '</div>';
        }
        html_categories += '</div>';
    } else {
        html += '<div class="row">';
        html += '<div class="col-xl-3 empty-item-container">';
        html += '<p>No items found.</p>';
        html += '</div></div>';
    }
    $(".categories_container").append(html_categories);
    $items_container.append(html);
    $('.more_info').on('click', function () {
        window.location.assign('/itemInfo?id=' + $(this).attr('id'));
    });
}