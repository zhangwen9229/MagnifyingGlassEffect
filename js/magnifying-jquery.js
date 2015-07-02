$(function() {
    $("#div1").mousemove(function(e) {
        $("#div2").show();
        $("#ospan").show();
        var x = e.pageX - $(this).offset().left - $("#ospan").width() / 2;; //让小块中心点和鼠标位置相同
        var y = e.pageY - $(this).offset().top - $("#ospan").height() / 2; //让小块中心点和鼠标位置相同
        ////限定鼠标移动范围
        if (x < 0) {
            x = 0;
        } else if (x > $(this).width() - $("#ospan").width()) {
            x = $(this).width() - $("#ospan").width();
        }
        if (y < 0) {
            y = 0;
        } else if (y > $(this).height() - $("#ospan").height()) {
            y = $(this).height() - $("#ospan").height();
        }
        $("#ospan").css("left", x); //鼠标移入时小块中心点跟着移动
        $("#ospan").css("top", y); //鼠标移入时小块中心点跟着移动
        document.title = x + "|" + y; //测试
        var percentX = x / ($(this).width() - $("#ospan").height()); //算出X向比例
        var percentY = y / ($(this).height() - $("#ospan").width()); //算出Y向比例
        //document.title=percentX + "|" + percentY;
        $("#max_img").css("left", -percentX * (1280 - $("#div2").width())); //根据比例算出大图left
        $("#max_img").css("top", -percentY * (800 - $("#div2").height())); //根据比例算出大图TOP
    })
    $("#div1").mouseout(function() {
        $("#div2").hide();
        $("#ospan").hide();
    })
})
