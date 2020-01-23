var addItemView = function (model) {
    this.model = model;
    this.submitEvent = new Event(this);
    this.getCategoriesEvent = new Event(this);
    this.saveImagesEvent = new Event(this);
    this.editEvent = new Event(this);
    this.init();
    this.displayImages = null;
    this.images = {};
    this.categories = [];
    this.loaction = '';
    this.changed = [];
    this.map;
}

addItemView.prototype.init = function () {
    this.cacheObjects();
    this.handlers();
    this.enable();
};

addItemView.prototype.cacheObjects = function () {
    this.categories_button = $('.addItem_categories_button');
    this.submit_button = $('.addItem_button');

    return this;
};

addItemView.prototype.displayImage = function (input, container) {
    var _this = this;
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(container).attr('src', e.target.result);
            if (Object.entries(container).toString() === Object.entries($('.added_image')).toString()) {
                _this.displayImages = e.target.result;
            } else {
                _this.images[$(container).attr('id')] = e.target.result;
            }

        }
        reader.readAsDataURL(input.files[0]);
    }
}

addItemView.prototype.getCategories = function () {
    this.getCategoriesEvent.notify();
}

addItemView.prototype.categories = function (result) {
    this.cats = result;
    this.show(result);
}

addItemView.prototype.submit = function (result) {
    this.show(result);
}

addItemView.prototype.edit = function (result) {
    var _this = this;
    if (result[0].number_of_bids !== 0) {
        window.location.assign('/main');
    }
    if (result[0].seller_fk !== result[0].user_requests) {
        window.location.assign('/main');
    } else {
        $($('.title').children()).text("Edit Item");
        if(result[0].image !== null){
            $('.added_image').attr('src', '/images/' + result[0].image);
            $('.add_image').css({ 'visibility': 'hidden', 'display': 'none' });
            $('.added_image').css({ 'visibility': 'visible', 'display': 'flex' });
            $('.clear_image').css({ 'visibility': 'visible', 'display': 'flex' });
        }
        $('.addItem_name').val(result[0].name);
        $('.addItem_fisrt_bid').val(result[0].first_bid);
        $('.addItem_sell_price').val(result[0].buy_price);
        this.categories.push(result[0].category.split(','));
        $('#start').html($('#start').html().replace($('#start').text(), result[0].started.split('T')[0]));
        $('#date_start').val(result[0].started.split('T')[0]);
        $('#end').html($('#end').html().replace($('#end').text(), result[0].ends.split('T')[0]));
        $('#date_end').val(result[0].ends.split('T')[0]);
        $('.addItem_description').text(result[0].description);
        var location = result[0].location.split(',');
        L.marker([location[0], location[1]]).addTo(this.map);
        _this.loaction = location[0] + ',' + location[1];
        var html = '';
        var other_images = result[0].other_images.split(',');
        for (var i = 0; i < other_images.length; i++) {
            if (other_images[i] !== '') {
                html += '<div class="additional_images_container"> ' +
                    '<img style="visibility:visible;display:flex" class="additional_image_added" src="/images/' + other_images[i] + '" id=' + i + 1 + '> ' +
                    '<input type="file" class="additional_file_image" accept="image/*"> ' +
                    '<input style="visibility:visible;display:flex" type="button" class="clear_added_image" value="clear"> ' +
                    '</div>';
            }
        }
        $('.additional_images_wrap_container').prepend(html);
        $('.clear_added_image').click(function () {
            $($($(this).parent()).children('.additional_image_added')).attr('src', '');
            $($($(this).parent()).children('.additional_images')).css({ 'display': 'flex', 'visibility': 'visible' });
            $($($(this).parent()).children('.additional_image_added')).css({ 'display': 'none', 'visibility': 'hidden' });
            $(this).css({ 'display': 'none', 'visibility': 'hidden' });
            $($(this).parent()).remove();
        });
        $('.addItem_button').remove();
        var button_html = '';
        button_html += '<input type="button" class="editItem_button general_button" value="Edit Item" name="EditItem">';
        $('.addItem_buttons_container').append(button_html);
        $('.editItem_button').on('click',function(){
            var flag = 'edit';
            _this.saveImages(flag);
        });
    }
}

addItemView.prototype.checkEdit = function () {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    if (id !== null) {
        this.editEvent.notify(id);
    }
}

addItemView.prototype.handlers = function () {
    this.submitHandler = this.submit.bind(this);
    this.getCategoriesHandler = this.getCategories.bind(this);
    this.categoriesHandler = this.categories.bind(this);
    this.saveImagesHandler = this.saveImages.bind(this);
    this.editHandler = this.edit.bind(this);
    this.checkEditHandler = this.checkEdit.bind(this);
}

addItemView.prototype.enable = function () {
    this.model.getCategoriesEvent.attach(this.categoriesHandler);
    this.model.submitEvent.attach(this.submitHandler);
    this.model.editEvent.attach(this.editHandler);


    $(document).ready(this.checkEditHandler);

    var _this = this;
    $('.add_image').on('click', function () {
        $('.addItem_display_image').trigger('click');
    });

    $('.additional_images').each(function () {
        $(this).click(function () {
            $($($(this).parent()).children('.additional_file_image')).trigger('click');
        });
    });

    $('.added_image').on('click', function () {
        $('.addItem_display_image').trigger('click');
    });

    $('#date_start').on('change', function () {
        day = $(this).val();
        if (day !== '') {
            $('#start').html($('#start').html().replace($('#start').text(), day));
            $('#date_end').attr('min', day);
        }
    }).change();

    $('#date_end').on('change', function () {
        day = $(this).val();
        if (day !== '') {
            $('#end').html($('#end').html().replace($('#end').text(), day));
            $('#date_start').attr('max', day);
        }
    }).change();

    $(document).on('load', this.show_map());

    var blobFile;
    $(document).on('change', '.addItem_display_image', function () {
        blobFile = $(this)[0].files[0];
        var formData = new FormData();
        formData.append("blob", blobFile);
        _this.displayImage(this, $('.added_image'));
        $('.added_image').css({ 'display': 'flex', 'visibility': 'visible' });
        $('.clear_image').css({ 'display': 'flex', 'visibility': 'visible' });
        $('.add_image').css({ 'display': 'none', 'visibility': 'hidden' });
    });

    var id_ai = 1;
    $(document).on('change', '.additional_file_image', function () {
        var html = '';
        blobFile = $(this)[0].files[0];
        var formData = new FormData();
        formData.append("blob", blobFile);
        _this.displayImage(this, $($($(this).parent()).children('.additional_image_added')));
        $($($(this).parent()).children('.additional_image_added')).css({ 'display': 'flex', 'visibility': 'visible' });
        $($($(this).parent()).children('.clear_added_image')).css({ 'display': 'flex', 'visibility': 'visible' });
        $($($(this).parent()).children('.additional_images')).css({ 'display': 'none', 'visibility': 'hidden' });
        html += '<div class="additional_images_container"> ' +
            '<div class="additional_images fas fa-plus"></div> ' +
            '<img class="additional_image_added" src="#" id=' + id_ai + '> ' +
            '<input type="file" class="additional_file_image" accept="image/*"> ' +
            '<input type="button" class="clear_added_image" value="clear"> ' +
            '</div>';
        id_ai += 1;
        $('.additional_images_wrap_container').append(html);
        $('.additional_images').each(function () {
            $(this).click(function () {
                $($($(this).parent()).children('.additional_file_image')).trigger('click');
            });
        });
        $('.clear_added_image').each(function () {
            $(this).click(function () {
                $($($(this).parent()).children('.additional_image_added')).attr('src', '');
                $($($(this).parent()).children('.additional_images')).css({ 'display': 'flex', 'visibility': 'visible' });
                $($($(this).parent()).children('.additional_image_added')).css({ 'display': 'none', 'visibility': 'hidden' });
                $(this).css({ 'display': 'none', 'visibility': 'hidden' });
                $($(this).parent()).remove();
                delete _this.images[$($($(this).parent()).children('.additional_image_added')).attr('id')];
            });
        });
    });

    $('.clear_added_image').click(function () {
        $($($(this).parent()).children('.additional_image_added')).attr('src', '');
        $($($(this).parent()).children('.additional_images')).css({ 'display': 'flex', 'visibility': 'visible' });
        $($($(this).parent()).children('.additional_image_added')).css({ 'display': 'none', 'visibility': 'hidden' });
        $(this).css({ 'display': 'none', 'visibility': 'hidden' });
        $($(this).parent()).remove();
    });

    $('.clear_image').click(function () {
        $('.added_image').attr('src', '');
        $('.add_image').css({ 'display': 'flex', 'visibility': 'visible' });
        $('.added_image').css({ 'display': 'none', 'visibility': 'hidden' });
        $(this).css({ 'display': 'none', 'visibility': 'hidden' });
        _this.displayImages = null;
    });

    this.categories_button.click(this.getCategoriesHandler);
    this.submit_button.click(this.saveImagesHandler);

    return this;
}

addItemView.prototype.saveImages = function (flag) {
    this.name = $('.addItem_name').val();
    if (this.name.length < 3) {
        anchorTo('basicAnchor');
        $('.addItem_name').css('border', '2px solid rgb(196, 48, 0)');
        return;
    } else {
        $('.addItem_name').css('border', '1px solid #cccccc');
    }
    this.sbp = $('.addItem_fisrt_bid').val();
    if (this.sbp.length < 1) {
        anchorTo('basicAnchor');
        $('.addItem_fisrt_bid').css('border', '2px solid rgb(196, 48, 0)');
        return;
    } else {
        $('.addItem_fisrt_bid').css('border', '1px solid #cccccc');
    }
    this.sp = $('.addItem_sell_price').val();
    if (this.sp.length < 1) {
        this.sp = 0;
    }
    if (this.categories.length == 0) {
        anchorTo('basicAnchor');
        $('.addItem_categories_button').css({ 'box-shadow': '0 2px 4px 0 rgba(255, 1, 1, 0.37), 0 4px 10px 0 rgba(255, 1, 1, 0.37)', 'border': '2px solid rgb(196, 48, 0)' });
        $('.form_categories_container').css({ 'box-shadow': '0 2px 4px 0 rgba(255, 1, 1, 0.37), 0 4px 10px 0 rgba(255, 1, 1, 0.37)' });
        return;
    } else {
        $('.addItem_categories_button').css({ 'box-shadow': '', 'border': '' });
        $('.form_categories_container').css({ 'box-shadow': '' });
    }
    this.start = $('#date_start').val();
    this.end = $('#date_end').val();
    if (this.start == '' || this.end == '') {
        anchorTo('basicAnchor');
        $('.calendar_start_end').css({ 'box-shadow': '0 2px 4px 0 rgba(255, 1, 1, 0.37), 0 4px 10px 0 rgba(255, 1, 1, 0.37)' });
        return;
    } else {
        $('.calendar_start_end').css({ 'box-shadow': '' });
    }
    this.desc = $('.addItem_description').val();
    if (this.desc.length == 0) {
        this.desc = 'No Description.';
    }
    if (this.loaction == '') {
        $('.leaflet-container').css({ 'box-shadow': '0 2px 4px 0 rgba(255, 1, 1, 0.37), 0 4px 10px 0 rgba(255, 1, 1, 0.37)' });
        return;
    } else {
        $('.leaflet-container').css({ 'box-shadow': '' });
    }
    var data = [];
    if(flag !== 'edit'){
        flag = 'add';
    }
    data.push(flag,this.displayImages, this.images, this.name, this.sbp, this.sp, this.categories, this.start, this.end, this.desc, this.loaction);
    this.saveImagesEvent.notify(data);
}

addItemView.prototype.show_categories = function (result) {
    var _this = this;
    var categories_container = $('.form_categories_container');
    var curr_category = '';
    var html = '';
    for (var i = 0; i < result.length; i++) {
        if (result[i].category !== curr_category) {
            curr_category = result[i].category;
            html += '<div class="categories_list">';
            html += '<a class="checkbox_wrapper">';
            html += '<div class="fas fa-check checked_checkbox" id="' + curr_category + '"></div>';
            html += '</a><span>' + curr_category + '</span>';
            html += '</div>';
        }
    }
    categories_container.append(html);
    categories_container.change(function () {
        $(this).css({ 'display': 'flex', 'visibility': 'visible' });
        $(_this.categories_button).css({ 'display': 'none', 'visibility': 'hidden' });
    }).change();

    if (categories_container.css('visibility') == 'visible') {
        categories_container.css('opacity', 1);
    }

    var inputs = $(categories_container).children();
    $(inputs).each(function () {
        $(this).click(function () {
            var check = $(this).children('a').children('div');
            var this_cat = this;
            var this_cat_a = $(this).children('a');
            var this_cat_id = $($(this_cat_a).children('div')).attr('id');
            if ($(check).css('visibility') == 'hidden') {
                $(check).css('visibility', 'visible');
                while (_this.categories.length != 0) {
                    _this.categories.pop();
                }
                _this.categories.push(this_cat_id);
                $(inputs).each(function () {
                    if (this_cat !== this) {
                        $(this).css({ 'display': 'none', 'visibility': 'hidden' });
                    } else {
                        var html = '';
                        html += '<div class="subcategories_container">';
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].sub_categories !== 'Other' && result[i].category == this_cat_id) {
                                curr_subcategory = result[i].sub_categories;
                                html += '<div class="categories_list">';
                                html += '<a class="checkbox_wrapper">';
                                html += '<div class="fas fa-check checked_checkbox" id="' + curr_subcategory + '"></div>';
                                html += '</a><span>' + curr_subcategory + '</span>';
                                html += '</div>';
                            } else if (result[i].sub_categories == 'Other') {
                                var other_flag = i;
                            }
                        }
                        html += '<div class="categories_list">';
                        html += '<a class="checkbox_wrapper">';
                        html += '<div class="fas fa-check checked_checkbox" id="' + result[other_flag].sub_categories + '"></div>';
                        html += '</a><span>' + result[other_flag].sub_categories + '</span>';
                        html += '</div>';
                        html += '</div>';
                        categories_container.append(html);
                        var sub_categories = $('.subcategories_container');
                        $(sub_categories.children()).each(function () {
                            $(this).click(function () {
                                var check = $(this).children('a').children('div');
                                var sub_id = $(check).attr('id');
                                if ($(check).css('visibility') == 'hidden') {
                                    $(check).css('visibility', 'visible');
                                    _this.categories.push(sub_id);
                                } else {
                                    $(check).css('visibility', 'hidden');
                                    _this.categories = _this.categories.filter(function (item) {
                                        return item !== sub_id;
                                    });
                                }
                            });
                        });
                    }
                });
            } else {
                $(check).css('visibility', 'hidden');
                $(categories_container.children('.subcategories_container')).remove();
                $(inputs).each(function () {
                    $(this).css({ 'display': 'flex', 'visibility': 'visible' });
                });
                while (_this.categories.length != 0) {
                    _this.categories.pop();
                }
            }
        });
    });

}

addItemView.prototype.show_map = function () {
    var _this = this;
    var map = L.map('mapid').setView([37.98, 23.72], 13);
    L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var searchControl = new L.esri.Controls.Geosearch().addTo(map);

    var results = new L.LayerGroup().addTo(map);

    searchControl.on('results', function (data) {
        results.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
            results.addLayer(L.marker(data.results[i].latlng));
            _this.loaction = data.results[i].latlng.lat + ',' + data.results[i].latlng.lng;
        }
    });

    this.map = map;

    setTimeout(function () { $('.pointer').fadeOut('slow'); }, 3400);

}

addItemView.prototype.show = function (result) {
    this.show_categories(result);
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