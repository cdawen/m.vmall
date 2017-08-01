window.onload=function(){
    leftSwipe(".cate_left");
    leftSwipe(".cate_right");
}
    //1、可以滑动  （touch  Y   改造setTransform）
    //2、往下滑动如果超出一定距离，不能滑动
    //3、往上滑动如果超出一定距离，不能滑动
    //4、当滑动大于最大定位区间，定位回去
    //5、当滑动小于最小定位区间，定位回去
    //6、点击ul的时候，改变当前li的样式（now）
    //7、点击的时候，被点击的li滑动到最顶端，如果滑动到最顶端超出定位区间，保持原位
function leftSwipe(str){
    //获取事件源和相关元素
    var parentBox = document.querySelector(str);
    var childBox = parentBox.querySelector("ul");
    var h = parentBox.offsetHeight;
    var H = childBox.offsetHeight;
    //缓冲距离
    var distance = 100;
    //最大定位距离
    var maxPositon = 0;
    //最小定位距离
    var minPosition = h-H;
    //最大滑动距离
    var maxSwipe = maxPositon+distance;
    //最小滑动距离
    var minSwipe = minPosition-distance;
    //还需要滑动相关变量
    var start = 0;//记录开始滑动的位置
    var move = 0;//记录滑动时的位置
    var isMove = false;//记录是否滑动
    var moveY = 0;//记录滑动的距离
    var currY = 0;//记录当前的位置


    //1、可以滑动  （touch  Y   改造setTransform）
    childBox.addEventListener("touchstart", function(){
        start = event.touches[0].pageY;
    });
    childBox.addEventListener("touchmove",function(){
        isMove = true;
        move = event.touches[0].pageY;
        moveY = move - start;
        if(moveY+currY<maxSwipe&&moveY+currY>minSwipe){
            chinasofti.removeTransition(childBox);
            chinasofti.setTransform(childBox, currY+moveY,"Y")
        }
        
    });
    childBox.addEventListener("touchend",function(){
        if(isMove){
            if(moveY+currY>maxPositon){
                currY = maxPositon;
            }else if(moveY+currY<minPosition){
                currY = minPosition
            }else{
                currY = moveY + currY;
            }
        }
        chinasofti.addTransition(childBox);
        chinasofti.setTransform(childBox,currY,"Y");
        start = 0;//记录开始滑动的位置
        move = 0;//记录滑动时的位置
        isMove = false;//记录是否滑动
        moveY = 0;//记录滑动的距离        
    })    
    //7、点击的时候，被点击的li滑动到最顶端，如果滑动到最顶端超出定位区间，保持原位
    chinasofti.tap(childBox,function(){
        var currLi = event.target.parentNode;
        var liArr = childBox.children;
        //6、点击ul的时候，改变当前li的样式（now）
        for(var i = 0;i<liArr.length;i++){
            liArr[i].index = i;
            liArr[i].className="";
        }
        currLi.className = "now";
        if(-currLi.index*currLi.offsetHeight>minPosition){
            currY = -currLi.index*currLi.offsetHeight;
        }else{
            currY = minPosition;
        }
            chinasofti.addTransition(childBox);
            chinasofti.setTransform(childBox,currY,"Y");

    })
}