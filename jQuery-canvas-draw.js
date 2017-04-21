/**
 * Created by Aaron on 2017/4/19.
 */
;(function ($) {
    /** 图像变换矩阵
     *  a c e
     *  b d f
     *  0 0 1
     * * * * * * * * * * * *
     *  a,d 水平、垂直缩放
     *  b,c 水平、垂直倾斜
     *  e,f 水平、垂直位移
     *  transform(a, b, c, d, e, f)//在上一个transform方法中叠加设置
     *  setTransform(a, b, c, d, e, f)//重置状态，并设置transform
     */
    var _defaultStyle = {
        fillStyle: "#fb3",
        strokeStyle: "#fb3",
        lineWidth: "1",
        lineJoin: "round",
        lineCap: "round"
    };
    var _customerStyle = {};
    var _defaultR = 20,
        _defaultX = 5,
        _defaultY = 5,
        _defaultRot = 0;

    $.fn.extend({
        /**
         * 勾画一个星星，并设置样式、位移、旋转角度
         * @param {number} R 星星的半径
         * @param {number} x X轴的偏移量
         * @param {number} y Y轴的偏移量
         * @param {number} rot 旋转的角度，正数为顺时针旋转
         * @param { { } } [style] 星星的样式：fillStyle、lineWidth、strokeStyle、lineJoin、lineCap
         */
        "drawStart": function (R, x, y, rot, style) {
            R = R || _defaultR;
            x = x || _defaultX;
            y = y || _defaultY;
            rot = rot || _defaultRot;
            $.extend(_customerStyle, _defaultStyle, style);//合并样式
            var context = getCanvasContext(this, "drawStart");
            if(context == undefined || context == null) return;
            context.save();//保存当前context的状态
            context.translate(x, y);
            context.rotate( rot / 180 * Math.PI);
            setStyle(context);//设置划线的样式
            startPath(context, R);//设置划线的路径
            context.fill();
            context.stroke();
            context.restore();//返回到最近一次save()的context状态
        },

        /**
         * 勾画一个空心的圆角矩形
         * @param {number} x X轴的偏移量
         * @param {number} y y轴的偏移量
         * @param {number} width
         * @param {number} height
         * @param {number} radius
         * @param { { } } [style]
         * @param {number} [rot]
         */
        "drawRoundRect": function (x, y, width, height, radius, style, rot) {
            radius = radius || _defaultR;
            x = x || _defaultX;
            y = y || _defaultY;
            rot = rot || _defaultRot;
            $.extend(_customerStyle, _defaultStyle, style);//合并样式
            var context = getCanvasContext(this, "drawRoundRect");
            if(context == undefined || context == null) return;
            context.save();
            setStyle(context);
            context.rotate(rot / 180 * Math.PI);
            context.translate(x, y);
            roundReact(width, height, radius, context);
            context.stroke();
            context.restore();
        },

        /**
         * 勾画一个的圆角矩形
         * @param {number} x X轴的偏移量
         * @param {number} y y轴的偏移量
         * @param {number} width
         * @param {number} height
         * @param {number} radius
         * @param { { } } [style]
         * @param {number} [rot]
         */
        "fillRoundRect": function (x, y, width, height, radius, style, rot) {
            radius = radius || _defaultR;
            x = x || _defaultX;
            y = y || _defaultY;
            rot = rot || _defaultRot;
            $.extend(_customerStyle, _defaultStyle, style);//合并样式
            var context = getCanvasContext(this, "fillRoundRect");
            if(context == undefined || context == null) return;
            context.save();
            setStyle(context);
            context.translate(x, y);
            context.rotate(rot / 180 * Math.PI);
            roundReact(width, height, radius, context);
            context.fill();
            context.stroke();
            context.restore();
        },

        /**
         * 勾画一个月亮
         * @param {number} x 外围弧度的圆心的 X 坐标
         * @param {number} y 外围弧度的圆心的 Y 坐标
         * @param {number} radius 外围弧度的圆心半径
         * @param {number} d 控制月亮宽度的变量，反比关系
         * @param { { } } [style]
         * @param {number} [rot]
         */
        "fillMoon": function (x, y, d, radius, style, rot) {
            radius = radius || _defaultR;
            x = x || _defaultX;
            y = y || _defaultY;
            rot = rot || _defaultRot;
            $.extend(_customerStyle, _defaultStyle, style);//合并样式
            var context = getCanvasContext(this, "fillMoon");
            if(context == undefined || context == null) return;
            context.save();
            setStyle(context);
            context.translate(x, y);
            context.rotate(rot / 180 * Math.PI);
            pathMoon(d, radius, context);
            context.fill();
            context.restore();
        }
    });

    /**
     * 勾画月亮的轮廓
     * @param d
     * @param radius
     * @param context
     */
    function pathMoon(d, radius, context) {
        d = d > radius * 1000 ? radius * 1000 : d;
        context.beginPath();
        context.arc(0, 0, radius, 1.5 * Math.PI, 0.5 * Math.PI);
        context.moveTo(0, radius);
        context.arcTo(d, 0, 0, -radius, dis(radius, d) * radius / d);
        //context.quadraticCurveTo(d, 0, 0, -radius);
        context.closePath();
    }
    function dis(d, radius) {
        return Math.sqrt( radius * radius + d * d);
    }

    /**
     * 设置圆角矩形的path
     * @param {number} width  矩形的宽
     * @param {number} height 矩形的高
     * @param {number} radius 圆角半径
     * @param context
     */
    function roundReact(width, height, radius, context) {
        radius = Math.min(radius, width/2, height/2);//半径的最大值为width、height的一半
        context.beginPath();
        context.arc(width - radius, height - radius, radius, 0 * Math.PI, 0.5 * Math.PI);
        context.arc(radius, height - radius, radius, 0.5 * Math.PI, 1 * Math.PI);
        context.arc(radius, radius, radius, 1 * Math.PI, 1.5 * Math.PI);
        context.arc(width - radius, radius, radius, 1.5 * Math.PI, 2 * Math.PI);
        context.closePath();
    }

    /**
     * 勾画一个标准的星星
     * @param context canvas的上下文环境
     */
    function startPath(context, R) {
        context.beginPath();
        var i = 0;
        for(; i < 5; i++){
            var xR = Math.cos((18 + i * 72 ) / 180 * Math.PI) * R;
            var yR = -Math.sin((18 + i * 72 ) / 180 * Math.PI) * R;
            var xr = Math.cos((54 + i * 72 ) / 180 * Math.PI) * 0.5 * R;
            var yr = -Math.sin((54 + i * 72 ) / 180 * Math.PI) * 0.5 * R;
            context.lineTo(xR, yR);
            context.lineTo(xr, yr);
        }
        context.closePath();
    }

    /**
     * 设置convas的样式
     * @param context
     */
    function setStyle(context) {
        context.fillStyle = _customerStyle.fillStyle;
        context.lineWidth = _customerStyle.lineWidth;
        context.strokeStyle = _customerStyle.strokeStyle
        context.lineJoin = _customerStyle.lineJoin;//线条连接样式，bevel：平头， round：圆角， miter: 一般与miterLimit结合使用，画出比较尖锐的角
        context.lineCap = _customerStyle.lineCap;//线条两端的线条样式
        _customerStyle = {};
    }

    /**
     * 获取canvas的上下文环境
     * @param _this 当前的DOM节点
     * @param functionName 调用方法名
     * @returns {*}
     */
    function getCanvasContext(_this, functionName) {
        var context;
        try {
            context = document.getElementById(_this.attr("id")).getContext("2d");
        }catch (e){
            throw "function '" + functionName + "' only supported by canvas tag and must be have id for attribute";
            return;
        }
        return context;
    }
})(jQuery);