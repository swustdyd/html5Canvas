/**
 * Created by Aaron on 2017/4/24.
 */
;(function($){
    var gridWidth = Math.min(800, $(window).width() - 20, $(window).height());
    var gridHeight = gridWidth;
    var isMouseDown = false;
    var canvas;
    var context;
    var lastPosition = {x: 0, y: 0};
    var lastTimestamp = 0;
    var lastLineWidth = -1;
    var stroke_color = "#000";
    var maxLineWidth = 20;
    var minLineWidth = 1;
    var maxStrokeV = 10;
    var minStrokeV = 0.1
    $.fn.extend({
        "handWriting": function () {
            canvas = document.getElementById(this.attr("id"));
            try {
                context = canvas.getContext("2d");
            }catch (e){
                throw "function 'handwriting' only supported by canvas tag and must be have id for attribute";
                return;
            }
            canvas.width = gridWidth;
            canvas.height = gridHeight;
            drawGrid(context);//勾画米字格
            canvas.onmousedown = function (e) {//鼠标按下
                e.preventDefault();
                startStroke({x: e.clientX, y: e.clientY});
                console.log("mouse down");
            };

            canvas.onmousemove = function (e) {//鼠标移动
                e.preventDefault();
                if(isMouseDown){
                    moveStroke({x: e.clientX, y: e.clientY});
                    console.log("mouse move");
                }
            };

            canvas.onmouseout = function (e) {
                e.preventDefault();
                endStroke();
                console.log("mouse out");
            };

            canvas.onmouseup = function (e) {
                e.preventDefault();
                endStroke();
                console.log("mouse up");
            };

            canvas.addEventListener("touchstart", function (e) {
                e.preventDefault();
                var touch = e.touches[0];
                startStroke({x: touch.pageX, y: touch.pageY});
            });
            canvas.addEventListener("touchmove", function (e) {
                e.preventDefault();
                var touch = e.touches[0];
                moveStroke({x: touch.pageX, y: touch.pageY});
            });
            canvas.addEventListener("touchend", function (e) {
                e.preventDefault();
                endStroke();
            });

        }
    });

    function startStroke(point) {
        isMouseDown = true;
        lastPosition = getCanvasMousePosition(point.x, point.y);
        lastTimestamp = +new Date();
    }
    function endStroke() {
        isMouseDown = false;
    }
    function moveStroke(point) {
        var currentPosition = getCanvasMousePosition(point.x, point.y);
        var currentTimestamp = +new Date();
        var time = currentTimestamp - lastTimestamp;
        var d = getDistance(currentPosition, lastPosition);
        var currentWidth = getLineWidth(time, d);
        context.save();
        context.beginPath();
        context.moveTo(lastPosition.x, lastPosition.y);
        context.lineTo(currentPosition.x, currentPosition.y);
        context.strokeStyle = stroke_color;
        context.lineWidth = currentWidth;
        context.lineCap = "round";//线段的两端为圆形，平滑显示
        context.lineJoin = "round";//线段相交处绘制填充的弧结合
        context.closePath();
        context.stroke();
        context.restore();
        lastPosition = currentPosition;
        lastTimestamp = currentTimestamp;
        lastLineWidth = currentWidth;
    }

    function getLineWidth(time, d) {
        var result;
        var v = d / time;
        if(v < minStrokeV){
            result = maxLineWidth;
        }else if(v > maxStrokeV){
            result = minLineWidth;
        }else {
            result = maxLineWidth - (v - minStrokeV)/(maxStrokeV - minStrokeV)*(maxLineWidth - minLineWidth);
        }
        if(lastLineWidth == -1){
            return result;
        }
        return result * 1 / 3 + lastLineWidth * 2 / 3;
    }

    function getDistance(position1, position2) {
        return Math.sqrt((position1.x - position2.x)*(position1.x - position2.x)
                + (position1.y - position2.y)*(position1.y - position2.y));
    }
    
    function getCanvasMousePosition(x, y) {
        var position = {};
        position.x = Math.round(x - canvas.getBoundingClientRect().left);//缩放页面仍可正确的计算出相对位置
        position.y = Math.round(y - canvas.getBoundingClientRect().top);
        return position;
    }

    function drawGrid() {
        context.save();
        context.strokeStyle = "#ff0000";

        context.beginPath();
        context.moveTo(3, 3);
        context.lineTo(gridWidth - 3, 3);
        context.lineTo(gridWidth - 3, gridHeight - 3);
        context.lineTo(3, gridHeight - 3);
        context.closePath();
        context.lineWidth = 6;
        context.stroke();

        context.moveTo(3, 3);
        context.lineTo(gridWidth - 3, gridHeight - 3);
        context.moveTo(gridWidth / 2, 3);
        context.lineTo(gridWidth / 2, gridHeight - 3);
        context.moveTo(3, gridHeight / 2);
        context.lineTo(gridWidth - 3, gridHeight / 2);
        context.moveTo(3, gridHeight - 3);
        context.lineTo(gridWidth - 3, 3);
        context.lineWidth = 1;
        context.stroke();
        context.restore();
    }
})(jQuery);