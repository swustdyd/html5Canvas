/**
 * Created by Aaron on 2017/4/24.
 */
;(function ($) {
    var canvas,
        context,
        waterMarkCanvas,
        waterMarkContext,
        addWaterMark = true,
        waterContent = "AaronDeng";

    $.fn.extend({
            "drawMyImage": function (url, scale) {
                canvas = document.getElementById(this.attr("id"));
                waterMarkCanvas = document.getElementById("waterMarkCanvas");
                try {
                    context = canvas.getContext("2d");
                    waterMarkContext = waterMarkCanvas.getContext("2d");
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
                    waterMarkCanvas.width = canvas.width;
                    waterMarkCanvas.height = canvas.height * 0.2;
                    if(addWaterMark){
                        waterMarkContext.textBaseline = "middle";
                        waterMarkContext.textAlign = "center";
                        waterMarkContext.font = "italic 36px sans-serif ";
                        waterMarkContext.globalAlpha = 0.1;
                        waterMarkContext.fillStyle = "#fff";
                        //alert(waterMarkCanvas.width)
                        waterMarkContext.fillText(waterContent, waterMarkCanvas.width/2, waterMarkCanvas.height/2);
                    }
                    context.drawImage(waterMarkCanvas, 0, canvas.height - waterMarkCanvas.height);
                }
            }
        }
    );

})(jQuery);