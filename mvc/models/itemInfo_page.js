var itemInfonfoModel = function () {
    this.loadEvent = new Event(this);
}

itemInfonfoModel.prototype.load = function () {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    $.ajax({
        url: '/itemInfo',
        type: 'POST',
        dataType: 'json',
        data: { id: id },
        success: (data) => {
            this.loadEvent.notify(data);
        }
    });
};

itemInfonfoModel.prototype.submit = function (info) {
    $.ajax({
        url: '/getRole',
        type: 'POST',
        dataType: 'json',
        success: (response) => {
            if (response[0].role == 'guest') {
                alert('Invalid Action!')
            } else {
                $.ajax({
                    url: '/addBid',
                    type: 'POST',
                    dataType: 'json',
                    data: { itemID: info[0], amount: info[1] },
                    success: (result) => {
                        $.ajax({
                            url: '/updateItemBids',
                            type: 'POST',
                            dataType: 'json',
                            data: { itemID: info[0], currently: result.currently },
                            success: (data) => {
                                window.location.assign('/itemInfo?id=' + info[0]);
                            }
                        });
                    }
                });
            }
        }
    })

};

itemInfonfoModel.prototype.delete = function (id) {
    $.ajax({
        url: '/deleteItem',
        type: 'POST',
        dataType: 'json',
        data: { id: id },
        success: (data) => {
            window.location.assign('/main');
        }
    });
}