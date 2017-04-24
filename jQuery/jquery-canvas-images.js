/**
 * Created by Aaron on 2017/4/24.
 */
;(function ($) {
    var canvas,
        context;
    $.fn.extend({
            "drawMyImage": function (url, scale) {
                canvas = document.getElementById(this.attr("id"));
                try {
                    context = canvas.getContext("2d");
                } catch (e) {
                    throw "function 'drawMyImage' only supported by canvas tag and must be have id for attribute";
                    return;
                }
                var image = new Image();
                image.src = url;
                image.onload = function () {
                    var drawScale = Math.min(canvas.width / image.width, canvas.height / image.height) * scale;//等比缩放
                    var drawWidth = image.width * drawScale;
                    var drawHeight = image.height * drawScale;
                    var dx = (canvas.width - drawWidth ) / 2;
                    var dy = (canvas.height - drawHeight) / 2;
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(image, dx, dy, drawWidth, drawHeight);
                    /*context.drawImage(image, 20, 20, image.width - 20, image.height - 20,
                        image.width, image.height, image.width - 20, image.height - 20);*/
                }
            }
        }
    );

})(jQuery);