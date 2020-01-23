var flexFont = function () {
    var divs = document.getElementsByClassName("flexFont");
    for(var i = 0; i < divs.length; i++) {
        var relFontsize = divs[i].offsetWidth*0.05;
        divs[i].style.fontSize = relFontsize+'px';
    }
    return;
};

var flexItemContainer = function () {
    var divs = document.getElementsByClassName("flexItemContainer");
    for(var i = 0; i < divs.length; i++) {
        var relWidth = $(window).innerWidth()*0.2;
        var relHeight = $(window).innerHeight()*0.38;
        divs[i].style.height = relWidth+'px';
        divs[i].style.width = relWidth+'px';
    }
    return;
};
