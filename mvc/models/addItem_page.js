var addItemModel = function () {
    this.submitEvent = new Event(this);
    this.getCategoriesEvent = new Event(this);
    this.editEvent = new Event(this);
}

addItemModel.prototype.submit = function (data) {
    $.ajax({
        url: '/register',
        type: 'POST',
        data: { data: data },
        dataType: 'json',
        success: (result) => {
            this.submitEvent.notify(result);
        }
    });
};

addItemModel.prototype.getCategories = function () {
    $.ajax({
        url: '/getCategories',
        type: 'GET',
        dataType: 'json',
        success: (result) => {
            this.getCategoriesEvent.notify(result);
        }
    });
};

addItemModel.prototype.saveImages = function (data) {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    var flag = data[0];
    data = data.filter(function (item) {
        return item !== 'edit';
    });
    data = data.filter(function (item) {
        return item !== 'add';
    });
    $.ajax({
        url: '/saveImages',
        type: 'POST',
        dataType: 'json',
        data: {
            displayImage: data[0],
            images: data[1]
        },
        success: (result) => {
            if (flag == 'edit') {
                $.ajax({
                    url: '/updateItem?id=' + id,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        image: result.displayName,
                        other_images: result.imagesNames.toString(),
                        name: data[2],
                        first_bid: data[3],
                        buy_price: data[4],
                        category: data[5].toString(),
                        started: data[6],
                        ends: data[7],
                        description: data[8],
                        location: data[9]
                    },
                    success: (res) => {
                        window.location.assign('/main/myitems');
                    }
                });
            } else {
                $.ajax({
                    url: '/main/myitems/addItem',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        image: result.displayName,
                        other_images: result.imagesNames.toString(),
                        name: data[2],
                        first_bid: data[3],
                        buy_price: data[4],
                        category: data[5].toString(),
                        started: data[6],
                        ends: data[7],
                        description: data[8],
                        location: data[9]
                    },
                    success: (res) => {
                        window.location.assign('/main/myitems');
                    }
                });
            }
        }
    });
};

addItemModel.prototype.edit = function (id) {
    $.ajax({
        url: '/itemInfo',
        type: 'POST',
        dataType: 'json',
        data: { id: id },
        success: (result) => {
            this.editEvent.notify(result);
        }
    });
};