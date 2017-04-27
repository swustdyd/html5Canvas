/**
 * Created by Aaron on 2017/4/22.
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
    var WINDOW_WIDTH = 500;
    var WINDOW_HEIGHT = 300;
    var RADIUS = 8;
    var MARGIN_TOP = 60;
    var MARGIN_LEFT = 30;
    var currentShowSeconds = 0;
    var balls = [];
    var clockBalls = [];
    var clockBallsColor = "#fff";
    var ballsColor = ["#12175a", "#5A392B", "#5A1F58", "#F569DE", "#2BEF2B", "#F51B1B", "#1EEDF5", "#F5E419"];
    var isMoving = false;
    var speed = 10;
    var isBacking = false;
    var backTime = 1.5;
    var fps = 24;
    var endTime = +new Date();
    var timer;
    var globalContext;
    $.fn.extend({
        /**
         * 倒计时方法
         * @param {number} [time] 倒计时，单位小时 <= 99
         */
        "digitClock2": function(time){
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
            time = Math.min( time || 1, 99);
            endTime += Math.floor(time * 3600 * 1000);
            globalContext = context;
            canvas.addEventListener("click", function () {
                if(!isMoving){
                    setClockSpeed();
                    isMoving = !isMoving;
                    balls = [];
                    currentShowSeconds = 0
                }else{
                    setBackPath();
                    isBacking = true;
                }
            });
           timer = setInterval(function () {
                if(isMoving){
                    updateMovingBalls();
                    renderMovingBalls(context);
                }else{
                    render(context);
                    update();
                    isBacking = false;
                }
            }, 1000/fps);
        }
    });

    function setBackPath() {
        var i = 0;
        for (; i < clockBalls.length; i++){
            var dX = clockBalls[i].targetX - clockBalls[i].x;
            var dY = clockBalls[i].targetY - clockBalls[i].y;
            var d = Math.sqrt(dX*dX + dY*dY);
            var vy = dY / fps / backTime;
            var vx = vy * dX / dY;
            clockBalls[i].vx = vx;
            clockBalls[i].vy = vy;
        }
    }

    function getCurrentSeconds(){
        /*var date  = new Date();
        var hours = +date.getHours();
        var minutes = +date.getMinutes();
        var seconds = +date.getSeconds();
        var ret = hours *3600 + minutes * 60 + seconds;*/
        var ret = endTime - new Date();
        ret = Math.floor( ret / 1000 );
        return ret >= 0 ? ret : 0;
    }

    function setClockSpeed() {
        var i = 0;
        for(; i < clockBalls.length; i++){
            clockBalls[i].vx = Math.random() * speed * Math.pow(-1, Math.ceil(Math.random() * 1000));
            clockBalls[i].vy = Math.random() * speed * Math.pow(-1, Math.ceil(Math.random() * 1000));
            clockBalls[i].color = ballsColor[Math.floor(Math.random() * ballsColor.length)];
            //clockBalls[i].color = clockBallsColor;
        }
    }

    function renderMovingBalls(context) {
        context.save();
        context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        context.fillStyle = "#000";
        context.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        context.globalAlpha = 0.8;
        var i = 0;
        for(; i < clockBalls.length; i++){
            context.beginPath();
            context.fillStyle = clockBalls[i].color;
            context.arc(clockBalls[i].x, clockBalls[i].y, clockBalls[i].r, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
        }
        context.restore();
    }

    function updateMovingBalls() {
        var i = 0;
        for(; i < clockBalls.length; i++){
            if( isBacking && (Math.abs(clockBalls[i].x - clockBalls[i].targetX) <= 1
                || Math.abs(clockBalls[i].y - clockBalls[i].targetY) <= 1)){
                clockBalls[i].hasBack = true;
                continue;
            }
            clockBalls[i].x += clockBalls[i].vx;
            clockBalls[i].y += clockBalls[i].vy;
            if(clockBalls[i].x + clockBalls[i].r >= WINDOW_WIDTH ){
                clockBalls[i].x = WINDOW_WIDTH - clockBalls[i].r;
                clockBalls[i].vx = -clockBalls[i].vx;
            }
            if(clockBalls[i].x <= clockBalls[i].r ){
                clockBalls[i].x = clockBalls[i].r;
                clockBalls[i].vx = -clockBalls[i].vx;
            }
            if(clockBalls[i].y + clockBalls[i].r >= WINDOW_HEIGHT ){
                clockBalls[i].y = WINDOW_HEIGHT - clockBalls[i].r;
                clockBalls[i].vy = -clockBalls[i].vy;
            }
            if(clockBalls[i].y <= clockBalls[i].r){
                clockBalls[i].y = clockBalls[i].r;
                clockBalls[i].vy = -clockBalls[i].vy;
            }
        }
        var allHasBack = 0;
        i = 0;
        for(; i < clockBalls.length; i++){
            if(clockBalls[i].hasBack){
                allHasBack++;
            }
        }
        if(clockBalls.length - allHasBack <= 5){
            setTimeout(function () {
                isMoving = !isMoving;
            }, 100);
        }
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
        if(nextShowSeconds == 0){
            setTimeout(function () {
                clearInterval(timer);
                render(globalContext);
            }, 1000 * 20);
        }
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
                        /*vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * Math.ceil(WINDOW_WIDTH / 300),*/
                        vx: -WINDOW_WIDTH / 300,
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
        clockBalls = [];
        context.fillStyle = "#000";
        context.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
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
        if(balls.length > 2000){
         balls.splice(0, 1000);
         }
        context.save();
        for(; i < balls.length; i++){
            context.fillStyle = balls[i].color;
            context.beginPath();
            context.globalAlpha = 0.8;
            context.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
        }
        context.restore();
    }

    function renderDigit(x, y, num, context){
        context.fillStyle = clockBallsColor;
        var i =0;
        for(; i < digit[num].length; i++){
            var j =0;
            for(; j < digit[num][i].length; j++){
                if(digit[num][i][j] === 1){
                    var clockBall = {
                        x: x + j * 2 *(RADIUS + 1) + (RADIUS + 1),
                        y:  y + i * 2 *(RADIUS + 1) + (RADIUS + 1),
                        r: RADIUS,
                        vx: 0,
                        vy: 0,
                        targetX: x + j * 2 *(RADIUS + 1) + (RADIUS + 1),
                        targetY: y + i * 2 *(RADIUS + 1) + (RADIUS + 1)
                    };
                    context.beginPath();
                    context.arc(clockBall.x, clockBall.y, clockBall.r, 0, 2 * Math.PI);
                    context.closePath();
                    context.fill();
                    clockBalls.push(clockBall);
                }
            }
        }
    }
})(jQuery);
