(function() {
    Magnifying = function(options) {
        var defaultOpts = {
            parentId: undefined, //容器ID
            bigImgUrl: undefined, //大图的Url
            smallImgUrl: undefined //小图的Url
        }

        for (var key in options) {
            defaultOpts[key] = options[key];
        }

        var main = document.getElementById(defaultOpts.parentId);
        // var ospan = document.getElementById("magOspan");
        // if(!ospan){
        // 	ospan = document.createElement("span")
        // 	ospan.setAttribute("id","magOspan"); 
        // 	var first=odiv1.firstChild;//得到父容器的第一个元素 
        // 	odiv1.insertBefore(ospan,first);
        // }
        var smallImgDiv = document.getElementById("magSmallImgDiv"),
            bigImgWidth = 0,
            bigImgHeight = 0;
        if (!smallImgDiv) {
            smallImgDiv = document.createElement("div");
            smallImgDiv.setAttribute("id", "magSmallImgDiv");
            smallImgDiv.innerHTML = '<span id="magOspan"></span><img id="mag_small_img" alt="加载中..." src="" />'
            main.appendChild(smallImgDiv);
            document.getElementById("mag_small_img").src = defaultOpts.smallImgUrl;
        };

        var bigImgDiv = document.getElementById("magBigImgDiv");
        if (!bigImgDiv) {
            bigImgDiv = document.createElement("div");
            bigImgDiv.setAttribute("id", "magBigImgDiv");
            bigImgDiv.innerHTML = '<img id="mag_max_img" alt="加载中..." src="" />'
            main.appendChild(bigImgDiv);
            var img_big = document.getElementById("mag_max_img");
            img_big.src = defaultOpts.bigImgUrl;
            if (img_big.naturalWidth) { // 现代浏览器
		        bigImgWidth = img_big.naturalWidth
		        bigImgHeight = img_big.naturalHeight
		    } else { // IE6/7/8
		        var image = new Image()
		        image.onload = function() {
		        	bigImgWidth = image.width
		        	bigImgHeight = image.height;
		        }
		        image.src = img_big.src
		    }
            document.getElementById("mag_max_img").src = defaultOpts.bigImgUrl;
        };

        var max_img = document.getElementById("mag_max_img");
        var ospan = document.getElementById("magOspan");
        smallImgDiv.onmousemove = function(event) {
            ospan.style.display = "block"
            bigImgDiv.style.display = "block"
            var event = window.event || event;
            var l = event.clientX - offsetLeft(smallImgDiv) - ospan.offsetWidth / 2; //鼠标移入时小块在鼠标中心点
            var t = event.clientY - offsetTop(smallImgDiv) - ospan.offsetHeight / 2; //鼠标移入时小块在鼠标中心点
            //限定鼠标移动范围
            if (l < 0) {
                l = 0;
            } else if (l > smallImgDiv.offsetWidth - ospan.offsetWidth) {
                l = smallImgDiv.offsetWidth - ospan.offsetWidth;
            };
            if (t < 0) {
                t = 0;
            } else if (t > smallImgDiv.offsetHeight - ospan.offsetHeight) {
                t = smallImgDiv.offsetHeight - ospan.offsetHeight;
            };
            ospan.style.left = l + "px"; //鼠标移入时小块中心点跟着移动
            ospan.style.top = t + "px"; //鼠标移入时小块中心点跟着移动
            document.title = l + "|" + t; //测试
            var percentX = l / (smallImgDiv.offsetWidth - ospan.offsetWidth); //算出X向比例
            var percentY = t / (smallImgDiv.offsetHeight - ospan.offsetHeight); //算出Y向比例

            max_img.style.left = -percentX * (bigImgWidth - bigImgDiv.offsetWidth) + "px"; //根据比例算出大图left
            max_img.style.top = -percentY * (bigImgHeight - bigImgDiv.offsetHeight) + "px"; //根据比例算出大图TOP
        }
        smallImgDiv.onmouseout = function() {
            ospan.style.display = "none";
            bigImgDiv.style.display = "none";
        }

        var offsetTop = function(elements) {
            var top = elements.offsetTop;
            var parent = elements.offsetParent;
            while (parent !== null) {
                top += parent.offsetTop;
                parent = parent.offsetParent;
            }
            return top;
        };

        var offsetLeft = function(elements) {
            var left = elements.offsetLeft;
            var parent = elements.offsetParent;
            while (parent !== null) {
                left += parent.offsetLeft;
                parent = parent.offsetParent;
            }
            return left;
        };
    }

    // AMD and CommonJS module compatibility
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return Magnifying;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = Magnifying;
    }
})();
