$.ajax({
    url: "/views/header.html",
    success: (data) => {
        $('body').prepend(data);
        $.ajax({
            url: "/check_messages",
            success: (data) => {
                if (data[0].new_messages !== 0) {
                    $('.header_message').attr('text-content', data[0].new_messages);
                } else {
                    $('.header_message').addClass('no_content');
                }
            }
        });
    },
    dataType: 'html'
});

var logo_click = function () {
    window.location.assign('/main');
}

var myItems_click = function () {
    window.location.assign('/main/myitems');
}

var myBids_click = function () {
    window.location.assign('/main/mybids');
}

var messages_click = function () {
    window.location.assign('/main/messages');
}