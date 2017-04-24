/**
 * Created by Aaron on 2017/4/24.
 */
;(function ($) {
    var canvas,
        context,
        waterMarkCanvas,
        waterMarkContext,
        addWaterMark = true,
        waterContent = "dyd";

    $.fn.extend({
            "drawMyImage": function (url, scale) {
                canvas = document.getElementById(this.attr("id"));
                waterMarkCanvas = document.getElementById("waterMarkCanvas");
                waterMarkCanvas.width = canvas.width * 0.2;
                waterMarkCanvas.height = canvas.height * 0.1;
                try {
                    context = canvas.getContext("2d");
                    waterMarkContext = waterMarkCanvas.getContext("2d");
                } catch (e) {
                    throw "function 'drawMyImage' only supported by canvas tag and must be have id for attribute";
                    return;
                }
                if(addWaterMark){
                    waterMarkContext.strokeStyle = "rgba(255,255,255,0.5)";
                    waterMarkContext.baseline = "middle";
                    waterMarkContext.textAlign = "right";
                    waterMarkContext.font = "24px sans-serif italic";
                    waterMarkContext.fillText(waterContent, waterMarkCanvas.width/2, waterMarkCanvas.height/2);
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
                    context.drawImage(waterMarkCanvas, canvas.width/2, canvas.height - waterMarkCanvas.height);
                    /*context.drawImage(image, 20, 20, image.width - 20, image.height - 20,
                        image.width, image.height, image.width - 20, image.height - 20);*/
                }
            }
        }
    );

})(jQuery);