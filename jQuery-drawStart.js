/**
 * Created by Aaron on 2017/4/19.
 */
;(function ($) {
    var _defaultStyle = {
        fillStyle: "#fb3",
        strokeStyle: "#fb3",
        lineWidth: "1",
        lineJoin: "round",
        lineCap: "round"
    };
    var _defaultR = 20,
        _defaultX = 5,
        _defaultY = 5,
        _defaultRot = 0;
    /**
     * 勾画一个标准的星星
     * @param context canvas的上下文环境
     */
    function startPath(context) {
        context.beginPath();
        var i = 0;
        for(; i < 5; i++){
            var xR = Math.cos((18 + i * 72 ) / 180 * Math.PI) * _defaultR;
            var yR = -Math.sin((18 + i * 72 ) / 180 * Math.PI) * _defaultR;
            var xr = Math.cos((54 + i * 72 ) / 180 * Math.PI) * 0.5 * _defaultR;
            var yr = -Math.sin((54 + i * 72 ) / 180 * Math.PI) * 0.5 * _defaultR;
            context.lineTo(xR, yR);
            context.lineTo(xr, yr);
        }
        context.closePath();
    }

    /**
     * 设置星星的样式
     * @param context
     */
    function setStyle(context) {
        context.fillStyle = _defaultStyle.fillStyle;
        context.lineWidth = _defaultStyle.lineWidth;
        context.strokeStyle = _defaultStyle.strokeStyle
        context.lineJoin = _defaultStyle.lineJoin;//线条连接样式，bevel：平头， round：圆角， miter: 一般与miterLimit结合使用，画出比较尖锐的角
        context.lineCap = _defaultStyle.lineCap;//线条两端的线条样式
    }

    $.fn.extend({
        /**
         * 勾画一个星星，并设置样式、位移、旋转角度
         * @param R 星星的半径
         * @param x X轴的偏移量
         * @param y Y轴的偏移量
         * @param rot 旋转的角度，正数为顺时针旋转
         * @param style 星星的样式：fillStyle、lineWidth、strokeStyle、lineJoin、lineCap
         */
        "drawStart": function (R, x, y, rot, style) {
            _defaultR = R || _defaultR;
            _defaultX = x || _defaultX;
            _defaultY = y || _defaultY;
            _defaultRot = rot || _defaultRot;
            _defaultStyle = $.extend(_defaultStyle, style);
            var context;
            //alert(this.attr("id"))
            try {
                context = document.getElementById(this.attr("id")).getContext("2d");
            }catch (e){
                throw "function 'drawStart' only supported by canvas tag or must be have id for attribute";
                return;
            }
            context.save();//保存当前context的状态
            context.translate(_defaultX, _defaultY);
            context.rotate( _defaultRot / 180 * Math.PI);
            setStyle(context);//设置划线的样式
            startPath(context);//设置划线的路劲
            context.fill();
            context.stroke();
            context.restore();//返回到最近一次save()的context状态
        }
    });
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
})(jQuery);