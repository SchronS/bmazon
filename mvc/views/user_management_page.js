var usermanageView = function(model) {
    this.model = model;
    this.loadEvent = new Event(this);
    this.deleteEvent = new Event(this);
    this.init();
}

usermanageView.prototype.init = function() {
    this.cacheObjects();
    this.handlers();
    this.enable();
};

usermanageView.prototype.cacheObjects = function() {
    this.$container = $("body");
    return this;
};

usermanageView.prototype.load = function(){
    this.loadEvent.notify();
}

usermanageView.prototype.loaded = function(data){
    this.show(data);
}

usermanageView.prototype.info = function(key){
    window.location.assign(window.location.href + '/info?username='+ key);
}

usermanageView.prototype.update = function(key){
    window.location.assign(window.location.href + '/update?username='+ key);
}

usermanageView.prototype.delete = function(key){
    var r = confirm("Are you sure?");
    if (r == true)
    {
        $.ajax({
            url: '/user_management/delete',
            type: 'POST',
            dataType: 'json',
            data: {username: key},
            success: ()=>{
                console.log(key + " deleted");
            }
        });
        document.getElementById(key).parentNode.parentNode.remove();
    }
}

usermanageView.prototype.handlers = function() {
    this.loadHandler = this.load.bind(this);
    this.infoHandler = this.info.bind(this);
    this.loadedHandler = this.loaded.bind(this);
    this.delete = this.delete.bind(this);
}

usermanageView.prototype.enable = function() {
    $(document).on('load',this.loadHandler());

    $('.s_button').on('click',function(){
        window.location.assign('/getAllItems?id=1');
    });

    $('.x_button').on('click',function(){
        window.location.assign('/getAllItems?id=2');
    });

    this.model.loadEvent.attach(this.loadedHandler);

    return this;
}

usermanageView.prototype.show = function(data) {
    let $container = this.$container;
    $container.append("<div class='container-fluid' id='table' style='width: 80%'></div>");
    var html = $("#table");
    $(html).load("./templates/user_management_loaded.html",function(){
        var table = $("#dynamic-table");
        if(data !== "undefined"){
            var keys = Object.keys(data[0]);
                if(keys !== "undefined"){
                    var htmlth = '';
                    htmlth += '<thead>';
                    for(var i=0; i < keys.length;i++){
                        htmlth += "<th>" + keys[i] + '</th>';
                    }
                    htmlth += "<th style='border-left: 2px solid #cdd0d4;'>actions</th>";
                    htmlth += '</thead>';
                }
            table.append(htmlth);
        }
        var htmltd = '';
        htmltd += '<tbody>';
        for(var y = 0; y < data.length;y++) {
            var element = data[y];
            if(element !== "undefined"){
                htmltd += '<tr>';
                var keys = Object.keys(data[0]);
                if(keys !== "undefined"){
                    for(var i=0; i < keys.length;i++){
                        var key = keys[i];
                        htmltd += "<td>" + element[key] + '</td>';
                    }
                    htmltd += "<td style='border-left: 2px solid #cdd0d4;'>";
                    htmltd += "<button id='" + element[keys[0]] + "' style='margin-right: 5px' onclick='usermanageView.prototype.info(this.id)'>i</button>";
                    htmltd += "<button id='" + element[keys[0]] + "' style='margin-right: 5px' onclick='usermanageView.prototype.delete(this.id)'>x</button>";
                    htmltd += "<button id='" + element[keys[0]] + "' onclick='usermanageView.prototype.update(this.id)'>u</button></td>";
                    htmltd += '</tr>';
                }
            };
        };
        htmltd += "</tbody>";
        table.append(htmltd);
    });
};