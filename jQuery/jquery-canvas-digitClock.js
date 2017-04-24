/**
 * Created by Aaron on 2017/4/18.
 */
;(function ($) {
    var digit = [
            [
                [0,0,1,1,1,0,0],
                [0,1,1,0,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,0,1,1,0],
                [0,0,1,1,1,0,0]
            ],//0
            [
                [0,0,0,1,1,0,0],
                [0,1,1,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [1,1,1,1,1,1,1]
            ],//1
            [
                [0,1,1,1,1,1,0],
                [1,1,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,0,0],
                [0,0,1,1,0,0,0],
                [0,1,1,0,0,0,0],
                [1,1,0,0,0,0,0],
                [1,1,0,0,0,1,1],
                [1,1,1,1,1,1,1]
            ],//2
            [
                [1,1,1,1,1,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,0,0],
                [0,0,1,1,1,0,0],
                [0,0,0,0,1,1,0],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0]
            ],//3
            [
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,1,0],
                [0,0,1,1,1,1,0],
                [0,1,1,0,1,1,0],
                [1,1,0,0,1,1,0],
                [1,1,1,1,1,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,0,1,1,0],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,1,1]
            ],//4
            [
                [1,1,1,1,1,1,1],
                [1,1,0,0,0,0,0],
                [1,1,0,0,0,0,0],
                [1,1,1,1,1,1,0],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0]
            ],//5
            [
                [0,0,0,0,1,1,0],
                [0,0,1,1,0,0,0],
                [0,1,1,0,0,0,0],
                [1,1,0,0,0,0,0],
                [1,1,0,1,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0]
            ],//6
            [
                [1,1,1,1,1,1,1],
                [1,1,0,0,0,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,0,0],
                [0,0,0,1,1,0,0],
                [0,0,1,1,0,0,0],
                [0,0,1,1,0,0,0],
                [0,0,1,1,0,0,0],
                [0,0,1,1,0,0,0]
            ],//7
            [
                [0,1,1,1,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,1,1,0]
            ],//8
            [
                [0,1,1,1,1,1,0],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [1,1,0,0,0,1,1],
                [0,1,1,1,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,0,1,1],
                [0,0,0,0,1,1,0],
                [0,0,0,1,1,0,0],
                [0,1,1,0,0,0,0]
            ],//9
            [
                [0,0,0,0],
                [0,0,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,0,0],
                [0,0,0,0]
            ]//:
        ];
    var WINDOW_WIDTH = 1024;
    var WINDOW_HEIGHT = 768;
    var RADIUS = 8;
    var MARGIN_TOP = 60;
    var MARGIN_LEFT = 30;
    var DIGIT_COLOR = "rgb(0, 102, 153)";
    var endTime = +new Date();
    endTime += 3600 * 1000;//设置一小时倒计时
    var currentShowSeconds = 0;
    var balls = [];
    var ballsColor = ["#12175a", "#5A392B", "#5A1F58", "#F569DE", "#2BEF2B", "#F51B1B", "#1EEDF5", "#F5E419"];
    $.fn.extend({
        "digitClock": function(){
            var canvas = document.getElementById(this.attr("id"));
            var context;
            try {
                context = canvas.getContext("2d");
            }catch (e){
                throw "function 'startClock' only supported by canvas tag and must be have id for attribute";
                return;
            }
            WINDOW_WIDTH = canvas.width;
            WINDOW_HEIGHT = canvas.height;
            MARGIN_LEFT = Math.ceil(WINDOW_WIDTH / 10);
            MARGIN_TOP = Math.floor(WINDOW_HEIGHT / 5);
            RADIUS = Math.ceil(WINDOW_WIDTH * 4 / 5 / 108) - 1;
            setInterval(function () {
                render(context);
                update();
            }, 40);
        }
    });

    function getCurrentSeconds(){
        var ret = endTime - new Date();
        ret = Math.round(ret / 1000);
        return ret >= 0 ? ret : 0;
    }

    function update() {
        var nextShowSeconds = getCurrentSeconds();
        var nextHours = parseInt(nextShowSeconds / 3600);
        var nextMinutes = parseInt((nextShowSeconds - nextHours * 3600) / 60);
        var nextSeconds = nextShowSeconds % 60;
        var currentHours = parseInt(currentShowSeconds / 3600);
        var currentMinutes = parseInt((currentShowSeconds - currentHours * 3600) / 60);
        var currentSecond = currentShowSeconds % 60;
        if(nextSeconds !== currentSecond){
            if(parseInt(nextHours/10) != parseInt(currentHours/10)){
                addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(nextHours/10));
            }
            if(parseInt(nextHours%10) != parseInt(currentHours%10)){
                addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(nextHours%10));
            }
            if(parseInt(nextMinutes/10) != parseInt(currentMinutes/10)){
                addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMinutes/10));
            }
            if(parseInt(nextMinutes%10) != parseInt(currentMinutes%10)){
                addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMinutes%10));
            }
            if(parseInt(nextSeconds/10) != parseInt(currentSecond/10)){
                addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds/10));
            }
            if(parseInt(nextSeconds%10) != parseInt(currentSecond%10)){
                addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds%10));
            }
            currentShowSeconds = nextShowSeconds;
        }
        updateBalls();
    }

    function addBalls(x, y, num) {
        var i =0;
        for(; i < digit[num].length; i++){
            var j =0;
            for(; j < digit[num][i].length; j++){
                if(digit[num][i][j] === 1){
                    var addBall = {
                        x: x + j * 2 *(RADIUS + 1) + (RADIUS + 1),
                        y: y + i * 2 *(RADIUS + 1) + (RADIUS + 1),
                        color: ballsColor[Math.floor(Math.random() * ballsColor.length)],
                        vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * Math.ceil(WINDOW_WIDTH / 300),
                        vy: -10,
                        g: 2 + Math.random()
                    }
                    balls.push(addBall);
                }
            }
        }
    }

    function updateBalls() {
        var i = 0;
        var countViewBalls = 0;
        for(; i < balls.length; i++){
            balls[i].x += balls[i].vx;
            balls[i].y += balls[i].vy;
            balls[i].vy += balls[i].g;
            if(balls[i].y >= WINDOW_HEIGHT - RADIUS){
                balls[i].y = WINDOW_HEIGHT - RADIUS;
                balls[i].vy = -balls[i].vy * 0.6;
            }

        }
        i = 0;
        for(; i < balls.length; i++){
            if(balls[i].x + RADIUS > 0 && balls[i].x < WINDOW_WIDTH + RADIUS ){
                balls[countViewBalls++] = balls[i];
            }
        }
        balls.splice(countViewBalls, balls.length);
    }

    function render(context){
        context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        var hours = parseInt(currentShowSeconds / 3600);
        var minutes = parseInt((currentShowSeconds - hours * 3600) / 60);
        var seconds = currentShowSeconds % 60;

        renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), context);
        renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours%10), context);
        renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, context);
        renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes/10), context);
        renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes%10), context);
        renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, context);
        renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds/10), context);
        renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds%10), context);
        var i = 0;
        /*if(balls.length > 2000){
         balls.splice(0, 1000);
         }*/
        for(; i < balls.length; i++){
            context.fillStyle = balls[i].color;
            context.beginPath();
            context.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
        }
        //console.log(balls.length);
    }

    function renderDigit(x, y, num, context){
        context.fillStyle = DIGIT_COLOR;
        var i =0;
        for(; i < digit[num].length; i++){
            var j =0;
            for(; j < digit[num][i].length; j++){
                if(digit[num][i][j] === 1){
                    context.beginPath();
                    context.arc(x + j * 2 *(RADIUS + 1) + (RADIUS + 1),
                        y + i * 2 *(RADIUS + 1) + (RADIUS + 1),
                        RADIUS,
                        0,
                        2 * Math.PI
                    );
                    context.closePath();
                    context.fill();
                }
            }
        }
    }
})(jQuery);
