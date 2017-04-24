/**
 * Created by Aaron on 2017/4/21.
 */
;(function ($) {
    var WINDOW_WIDTH = 1000,
         WINDOW_HEIGHT = 1000,
         spotLight = {
            R: 150,
            X: 200,
            Y: 200,
            vx: 10,
            vy: 10
         };
    $.fn.extend({
        "spotLight": function () {
            var canvas = document.getElementById(this.attr("id"));
            var context;
            try {
                context = canvas.getContext("2d");
            }catch (e){
                throw "function 'spotLight' only supported by canvas tag and must be have id for attribute";
                return;
            }
            WINDOW_WIDTH = canvas.width;
            WINDOW_HEIGHT = canvas.height;
            /*canvas.addEventListener("mousemove", function (event) {
                update(event, this);
                render(context);
            });*/
            setInterval(function () {
                render(context);
                update();
            }, 40);
        }
    });

    function update(event, _this) {
        /*spotLight.X = event.clientX - _this.offsetLeft;
        spotLight.Y = event.clientY - _this.offsetTop;*/

        spotLight.X += spotLight.vx;
        spotLight.Y += spotLight.vy;
        if(spotLight.X >= WINDOW_WIDTH - spotLight.R || spotLight.X <= spotLight.R){
            spotLight.vx = -spotLight.vx;
        }
        if(spotLight.Y >= WINDOW_HEIGHT - spotLight.R || spotLight.Y <= spotLight.R){
            spotLight.vy = -spotLight.vy;
        }
    }

    function render(context) {
        context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        context.save();
        context.beginPath();
        context.fillStyle = "black";
        context.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        context.beginPath();
        context.fillStyle = "#fff";
        context.strokeStyle = "#000";
        context.arc(spotLight.X, spotLight.Y, spotLight.R, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
        context.clip();
        context.fillStyle = "blue";
        context.shadowColor = "#aaa";
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 5;
        context.textAlign = "center";
        context.textBaseline ="middle";
        context.font = "italic bold 150px Arial";
        context.fillText("CANVAS", context.canvas.width / 2, context.canvas.height / 2);
        context.fillText("CANVAS", context.canvas.width / 4, context.canvas.height / 4);
        context.fillText("CANVAS", context.canvas.width / 4*3, context.canvas.height / 4);
        context.fillText("CANVAS", context.canvas.width / 4, context.canvas.height / 4*3);
        context.fillText("CANVAS", context.canvas.width / 4*3, context.canvas.height / 4*3);
        context.restore();
    }
})(jQuery);