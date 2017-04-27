/**
 * Created by Aaron on 2017/4/24.
 */
;(function ($) {
    var canvas,
        context,
        waterMarkCanvas,
        waterMarkContext,
        magnifierCanvas,
        magnifierCanvasContext,
        addWaterMark = false,
        waterContent = "AaronDeng",
        isMouseDown = false,
        lastPosition = {x: 0, y: 0},
        currentPosition = {x: 0, y: 0},
        totalMovePosition = {x: 0, y:0},
        scale = 1,
        imageUrl,
        image,
        magnifierScale = 2,
        magnifierRadius = 100;

    $.fn.extend({
            "drawMyImage": function (url, currentScale) {
                canvas = document.getElementById(this.attr("id"));
                waterMarkCanvas = document.getElementById("waterMarkCanvas");
                magnifierCanvas = document.getElementById("magnifierCanvas");
                try {
                    context = canvas.getContext("2d");
                    waterMarkContext = waterMarkCanvas.getContext("2d");
                    magnifierCanvasContext = magnifierCanvas.getContext("2d");
                } catch (e) {
                    throw "function 'drawMyImage' only supported by canvas tag and must be have id for attribute";
                    return;
                }
                addListen();
                imageUrl = url;
                scale = currentScale;
                image = new Image();
                image.src = imageUrl;
                image.onload = function () {
                    draw(totalMovePosition.x, totalMovePosition.y);
                };
            }
        }
    );

    function draw(moveX, moveY) {
        var drawScale = Math.min(canvas.width / image.width, canvas.height / image.height) * scale;//等比缩放
        var drawWidth = image.width * drawScale;
        var drawHeight = image.height * drawScale;
        var dx = (canvas.width - drawWidth ) / 2;
        var dy = (canvas.height - drawHeight) / 2;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, dx + moveX, dy + moveY, drawWidth, drawHeight);
        waterMarkCanvas.width = canvas.width;
        waterMarkCanvas.height = canvas.height * 0.2;
        if(addWaterMark){
            waterMarkContext.textBaseline = "middle";
            waterMarkContext.textAlign = "center";
            waterMarkContext.font = "italic 36px sans-serif ";
            waterMarkContext.globalAlpha = 0.1;
            waterMarkContext.fillStyle = "#fff";
            waterMarkContext.fillText(waterContent, waterMarkCanvas.width/2, waterMarkCanvas.height/2);
            context.drawImage(waterMarkCanvas, 0, canvas.height - waterMarkCanvas.height);
        }
        if(isMagnifier && !addWaterMark){
            magnifierRadius = canvas.height / 4;
            magnifierCanvas.width = canvas.width * magnifierScale;
            magnifierCanvas.height = canvas.height * magnifierScale;
            drawScale = Math.min(magnifierCanvas.width / image.width, magnifierCanvas.height / image.height) * scale;//等比缩放
            drawWidth = image.width * drawScale;
            drawHeight = image.height * drawScale;
            dx = (magnifierCanvas.width - drawWidth ) / 2;
            dy = (magnifierCanvas.height - drawHeight) / 2;
            magnifierCanvasContext.drawImage(image, dx + moveX *magnifierScale , dy + moveY *magnifierScale, drawWidth, drawHeight);
            context.save();
            context.strokeStyle = "#fff";
            context.lineWidth = 3;
            context.beginPath();
            context.arc(currentPosition.x, currentPosition.y, magnifierRadius, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
            context.stroke();
            context.clip();
            var sx = currentPosition.x * magnifierScale - magnifierRadius;
            var sy = currentPosition.y * magnifierScale - magnifierRadius;
            context.drawImage(magnifierCanvas,
                sx, sy,
                magnifierRadius*2, magnifierRadius*2,
                currentPosition.x - magnifierRadius, currentPosition.y - magnifierRadius,
                magnifierRadius*2, magnifierRadius*2);
            context.restore();
        }
    }

    function getCanvasMousePosition(x, y) {
        var position = {};
        position.x = Math.round(x - canvas.getBoundingClientRect().left);//缩放页面仍可正确的计算出相对位置
        position.y = Math.round(y - canvas.getBoundingClientRect().top);
        return position;
    }

    function addListen() {
        canvas.onmousedown = function (e) {
            isMouseDown = true;
            lastPosition = getCanvasMousePosition(e.clientX, e.clientY);
        };
        canvas.onmousemove = function (e) {
            currentPosition = getCanvasMousePosition(e.clientX, e.clientY);
            var moveX = currentPosition.x - lastPosition.x;
            var moveY = currentPosition.y - lastPosition.y;
            if(isMouseDown){
                draw(moveX + totalMovePosition.x, moveY + totalMovePosition.y);
            }
            if(isMagnifier && !isMouseDown){
                draw(totalMovePosition.x, totalMovePosition.y);
            }
        };

        canvas.onmouseup = function (e) {
            if(isMouseDown){
                var position = getCanvasMousePosition(e.clientX, e.clientY)
                totalMovePosition.x += position.x - lastPosition.x;
                totalMovePosition.y += position.y - lastPosition.y;
                lastPosition = position;
            }
            isMouseDown = false;
        };
        canvas.onmouseout = function () {
            isMouseDown = false;
        }
    }

})(jQuery);