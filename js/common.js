var chinasofti={};
//命名空间
chinasofti.addTransition = function(obj){
        obj.style.transition = "all 0.5s";
        obj.style.webkitTransition = "all 0.5s";
    }
chinasofti.setTransform=function (obj,distance,direction){
        if(direction){
            obj.style.transform = "translate"+direction+"("+distance+"px)";
            obj.style.webkitTransform = "translate"+direction+"("+distance+"px)";
        }else{
            obj.style.transform = "translateX("+distance+"px)";
            obj.style.webkitTransform = "translateX("+distance+"px)";
        }
    }
chinasofti.removeTransition=function (obj){
        obj.style.transition = "";
        obj.style.webkitTransition = "";
    }
chinasofti.addTransitionEnd=function(obj,fn){
    obj.addEventListener("transitionEnd",fn);
    obj.addEventListener("webkitTransitionEnd",fn);
}
chinasofti.tap = function(obj,fn){
    var start = 0;//记录手指放到屏幕上的时间
    var distance = 0 ;
    var end = 0 ;//记录手指离开屏幕上的时间
    var isMove = false;//记录是否滑动
    obj.addEventListener("touchstart",function(){
        start = (new Date()).getTime();
    });
    obj.addEventListener("touchmove",function(){
        isMove = true;
    });
    obj.addEventListener("touchend",function(){
        end = (new Date()).getTime();
        distance = end - start;
        if(distance<150&&!isMove){
            fn();
            console.log("发生了tip事件")
        }
        start = 0;
        move = 0 ;
        end = 0 ;
        isMove = false;
    })
}