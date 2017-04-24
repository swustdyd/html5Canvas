/**
 * Created by Aaron on 2017/4/21.
 */
;(function ($) {
    var WINDOW_WIDTH = 500;
    var WINDOW_HEIGHT = 500;
    var xSpeed = 10;
    var ySpeed = 10;
    var ballsNum = 100;
    var balls = [];
    var ballsColor = ["#12175a", "#5A392B", "#5A1F58", "#F569DE", "#2BEF2B", "#F51B1B", "#1EEDF5", "#F5E419"];
    $.fn.extend({
        "ballAnimate": function(){
            WINDOW_WIDTH = this.width();
            WINDOW_HEIGHT = this.height();
            var canvas = document.getElementById(this.attr("id"));
            var context;
            try {
                context = canvas.getContext("2d");
            }catch (e){
                throw "function 'ballAnimate' only supported by canvas tag and must be have id for attribute";
                return;
            }
            canvas.width = WINDOW_WIDTH;
            canvas.height = WINDOW_HEIGHT;
            addBalls();
            //render(context);
            setInterval(function () {
                render(context);
                update();
            }, 40);
        }
    });

    function update() {
        var i = 0;
        for(; i < balls.length; i++){
            balls[i].x = balls[i].x + balls[i].vx;
            balls[i].y = balls[i].y + balls[i].vy;
            if(balls[i].x >= WINDOW_WIDTH - balls[i].r || balls[i].x <= balls[i].r){
                balls[i].vx = -balls[i].vx;
            }
            if(balls[i].y >= WINDOW_HEIGHT - balls[i].r || balls[i].y <= balls[i].r){
                balls[i].vy = -balls[i].vy;
            }
        }
    }

    function addBalls() {
        var i =0;
        for(; i < ballsNum; i++){
            var ballsR = 20 + Math.random() * 20;
            var ballX = ballsR + Math.random() * ( WINDOW_WIDTH - 2 * ballsR);
            var ballY = ballsR + Math.random() * ( WINDOW_HEIGHT - 2 * ballsR);
            var addBall = {
                color: ballsColor[Math.floor(Math.random() * ballsColor.length)],
                vx: xSpeed * Math.pow(-1, Math.ceil(Math.random() * 1000)) * Math.random() + 1,
                vy: ySpeed * Math.pow(-1, Math.ceil(Math.random() * 1000)) * Math.random() + 1,
                r: ballsR,
                x: ballX ,
                y: ballY
            }
            balls.push(addBall);
        }
    }

    function render(context){
        context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        context.globalCompositeOperation = "xor";
        var i = 0;
        for(; i < balls.length; i++){
            context.fillStyle = balls[i].color;
            context.beginPath();
            context.arc(balls[i].x, balls[i].y, balls[i].r, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
        }
    }

})(jQuery);
