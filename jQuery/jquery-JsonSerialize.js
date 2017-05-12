/**
 * Created by Aaron on 2017/5/12.
 */
;(function ($) {
    $.fn.extend({
        "jsonSerialize": function () {
            var obj = {};
            $(this).children().each(function () {
                if($(this).attr("name")){
                    var value = getElementValue(this);
                    if(value){
                        obj[$(this).attr("name")] = value;
                    }else {
                        throw "can not serialize tag that name is " + $(this).attr("name")
                            + " and value type of tag is " + typeof value;
                    }
                }
            });
            return JSON.stringify(obj);
        }
    });

    function getElementValue(_this) {
        var value;
        var tagName = String($(_this)[0].tagName).toLowerCase();
        switch (tagName){
            case "input":
                value = $(_this).val();
                break;
            default: value = $(_this).text();
        }
        return undefined;
    }
})(jQuery);
