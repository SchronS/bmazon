var messagesView = function (model) {
    this.model = model;
    this.loadEvent = new Event(this);
    this.changeStateEvent = new Event(this);
    this.deleteMessageEvent = new Event(this);
    this.init();
}

messagesView.prototype.init = function () {
    this.cacheObjects();
    this.handlers();
    this.enable();
};

messagesView.prototype.cacheObjects = function () {
    return this;
};

messagesView.prototype.handlers = function () {
    this.loadHandler = this.load.bind(this);
    this.loadedHandler = this.loaded.bind(this);
};

messagesView.prototype.load = function () {
    this.loadEvent.notify();
};

messagesView.prototype.loaded = function (data) {
    this.show(data);
};

messagesView.prototype.show = function (result) {
    var html = '';
    var htmls = '';
    var _this = this;

    var data = result[0];
    var sent_data = result[1];

    for (var i = 0; i < data.length; i++) {
        if (data[i].state == 0) {
            html += '<div class="message_entry" id="' + data[i].id + '">' +
                '<div class="message_name">' +
                '<p>' + data[i].sender + '</p>' +
                '</div>' +
                '<div class="message_text">';
            if (data[i].message.length > 80) {
                var long_message = data[i].message.substring(0, 80);
                html += '<p>' + long_message + '...</p>';
            } else {
                html += '<p>' + data[i].message + '</p>';
            }
            html += '</div>' +
                '</div>';
        } else {
            html += '<div class="message_entry_read message_entry" id="' + data[i].id + '">' +
                '<div class="message_name">' +
                '<p class="text_read">' + data[i].sender + '</p>' +
                '</div>' +
                '<div class="message_text">';
            if (data[i].message.length > 80) {
                var long_message = data[i].message.substring(0, 80);
                html += '<p class="text_read">' + long_message + '...</p>';
            } else {
                html += '<p class="text_read">' + data[i].message + '</p>';
            }
            html += '</div>' +
                '</div>';
        }
    };
    $('.message_display_inner').append(html);

    for (var i = 0; i < sent_data.length; i++) {
        htmls += '<div class="message_entry" id="' + sent_data[i].id + '">' +
            '<div class="message_name">' +
            '<p>' + sent_data[i].receiver + '</p>' +
            '</div>' +
            '<div class="message_text">';
        if (sent_data[i].message.length > 80) {
            var long_message = sent_data[i].message.substring(0, 80);
            htmls += '<p>' + long_message + '...</p>';
        } else {
            htmls += '<p>' + sent_data[i].message + '</p>';
        }
        htmls += '</div>' +
            '</div>';
    };
    $('.message_display_inner_sent').append(htmls);

    var selected_message;

    $(document).on('click', '.message_entry', function () {
        var extented_message_html = '';
        var flag = 0;
        for (var y = 0; y < result.length; y++) {
            for (var i = 0; i < result[y].length; i++) {
                if ($(this).attr('id') == result[y][i].id) {
                    selected_message = result[y][i];
                    flag = 1;
                    break;
                }
            }
            if (flag == 1) {
                break;
            }
        }
        $('.message_display_inner').css({ 'visibility': 'hidden', 'display': 'none' });
        $('.message_display_inner_sent').css({ 'visibility': 'hidden', 'display': 'none' });
        extented_message_html += '<div class="message_display_inner" id="current_message">' +
            '<div class="sender">';
        if (y == 0) {
            extented_message_html += '<h4>From: ' + selected_message.sender + '</h4>';
        } else {
            extented_message_html += '<h4>To: ' + selected_message.receiver + '</h4>';
        }
        extented_message_html += '</div>' +
            '<div class="message">' +
            '<p>' + selected_message.message + '</p>' +
            '</div>';
        if (y == 0) {
            extented_message_html += '<button class="reply">Reply</button>';
            _this.changeState(selected_message.id);
        }
        extented_message_html += '<button class="delete_msg">Delete</button>';
        extented_message_html += '</div>';

        $('.message_display').append(extented_message_html);
    });

    $(document).on('click', '.reply', function () {
        window.location.assign('/main/new_message');
    });

    $(document).on('click', '.delete_msg', function () {
        _this.deleteMessage(selected_message.id);
    });
};

messagesView.prototype.changeState = function (id) {
    this.changeStateEvent.notify(id);
}

messagesView.prototype.deleteMessage = function (id) {
    this.deleteMessageEvent.notify(id);
}

messagesView.prototype.enable = function () {
    $(document).on('load', this.loadHandler());

    $('.inbox').on('click', function () {
        window.location.assign('/main/messages');
    });

    $('.sent').on('click', function () {
        $('#current_message').remove();
        $('.message_display_inner').css({ 'visibility': 'hidden', 'display': 'none' });
        $('.message_display_inner_sent').css({ 'visibility': 'visible', 'display': 'flex', 'flex-direction': 'column' });
    });

    $('.compose').on('click', function () {
        window.location.assign('/main/new_message');
    });

    this.model.loadEvent.attach(this.loadedHandler);

    return this;
};

