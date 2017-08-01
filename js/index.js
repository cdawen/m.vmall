window.onload=function(){
	search();   //头部渐变
    slider(".banner",5000);    //轮播图开始
    notice(".news_move",5);    //公告滚动
    toTop("toTop");	     //回到顶部
	leftSwipe(".choiceness_content_box");   //左右滑动图
	ajax();   //Ajax数据请求
}
//---------------------头部渐变开始----------------------
function search(){
    //需求分析：
    //当页面滚动不超过轮播图时，随着滚动越多，不透明度越高
    //当页面滚动超过轮播图时，不透明度固定不变
    //获取事件源
    var search = document.querySelector(".header_box");
    var banner = document.querySelector(".banner");
    var height = banner.offsetHeight;
    var opacity = 0;
    console.log(opacity);
    window.onscroll=function(){
        if(document.body.scrollTop<height){
            opacity = document.body.scrollTop/height*0.95;
        }else{
            opacity = 0.95;
        }
        search.style.background="rgba(255,255,255,"+opacity+")";
    }
}
//---------------------头部渐变结束----------------------

//-------------------图片轮播开始----------------------
function slider(node,timer){
    //需求分析
    //1、自动轮播 (定时器 过渡)
    //2、小圆点随着图片滚动(监听图片显示的索引，然后设置当前样式now)
    //3、图片能滑动(touch)
    //4、滑动不超过一定距离 吸附回去 (过渡)
    //5、滑动超过一定距离 滚动到下一张(过渡)    
    //0、获取事件源和相关元素
    var box = document.querySelector(node);
    var imgUl = box.children[0];
    var dotUl = box.children[1];
    var imgLis = imgUl.children;
    var dotLis = dotUl.children;
    var width = box.offsetWidth;
    var num = 1;
    //1、自动轮播 (定时器 过渡)
    clearInterval(box.timer);
    box.timer = setInterval(function(){
        num++;
        chinasofti.addTransition(imgUl);
        chinasofti.setTransform(imgUl,-num*width);
    }, timer)
    
    chinasofti.addTransitionEnd(imgUl, function(){
        if(num>imgLis.length-2){
            num = 1;
            chinasofti.removeTransition(imgUl);
            chinasofti.setTransform(imgUl,-num*width);
        }else if(num==0){
            num = imgLis.length-2;
            chinasofti.removeTransition(imgUl);
            chinasofti.setTransform(imgUl,-num*width);
        }
        light();
    })
    //2、小圆点随着图片滚动(监听图片显示的索引，然后设置当前样式now)
    function light(){
        for(var i =0;i<dotLis.length;i++){
            dotLis[i].className = "";
        }
        dotLis[num-1].className = "now";
    }   
    //4、滑动不超过一定距离 吸附回去 (过渡)
    //5、滑动超过一定距离 滚动到下一张(过渡)
    var startX = 0 ;
    var moveX = 0 ;
    var endX = 0;
    var isMove = false;
    var distance = 0;
    imgUl.addEventListener("touchstart", function(e){
        clearInterval(box.timer);
        startX = e.touches[0].clientX;
    })
    imgUl.addEventListener("touchmove", function(e){
        moveX = e.touches[0].clientX;
        isMove = true;
        //3、图片能滑动(touch)
            distance = moveX - startX;
            chinasofti.removeTransition(imgUl);
            chinasofti.setTransform(imgUl,-num*width+distance);        
    })
    imgUl.addEventListener("touchend", function(e){
        endX = moveX;
        if(isMove){
            if(Math.abs(distance)>width/3){
              if(distance>0){
                    num--;
              }else{
                    num++;
              }
                chinasofti.addTransition(imgUl);
                chinasofti.setTransform(imgUl,-num*width);

            }else{
                chinasofti.addTransition(imgUl);
                chinasofti.setTransform(imgUl,-num*width);
            }
        }
        clearInterval(box.timer);
        box.timer = setInterval(function(){
        num++;
        chinasofti.addTransition(imgUl);
        chinasofti.setTransform(imgUl,-num*width);
        }, timer)
        startX = 0 ;
        moveX = 0 ;
        endX = 0;
        isMove = false;
        distance = 0;
    });    
}
//-------------------图片轮播结束----------------------

//-------------------精选左右滑动图开始----------------------
function leftSwipe(str){	
//	var Div = document.querySelector(parent);
//	var w = Div.offsetWidth;
//	var Ul = document.querySelector(child);
//	var W = Ul.offsetWidth;
	var parentBox = document.querySelector(str);
    var childBox = parentBox.querySelector("ul");
    var w = parentBox.offsetWidth;
    var W = childBox.offsetWidth;
    
	var maxPosition = 0;
	var minPosition = w - W;
	
	var distance = 100;
	
	var maxSwipe = maxPosition + distance;
	var minSwipe = minPosition - distance;
	
	function addTransition(){
		childBox.style.transition = "all 0.2s";
		childBox.style.webkitTransition = "all 0.2s";
	}
	function removeTransition(){
		childBox.style.transition = "";
		childBox.style.webkitTransition="";
	}
	function setTransform(distance){
		if(distance>maxPosition){
			distance = distance/2;
		}
		if(distance<minPosition){
			distance = distance + (minPosition-distance)/2;
		}
		childBox.style.transform = 'translateX('+distance+'px)';
		childBox.style.webkitTransform = 'translateX('+distance+'px)';
	}
	
	var startX = 0;
	var moveX = 0;
	var isMove = false;
	var currX = 0;
	
	childBox.addEventListener('touchstart',function(e){
		startX = e.touches[0].clientX;
	});
	childBox.addEventListener('touchmove',function(e){
		isMove = true;
		moveX = e.touches[0].clientX;

		if(currX+moveX-startX>minSwipe&&currX+moveX-startX<maxSwipe){
			removeTransition();
			setTransform(currX+moveX-startX);
		}
	});
	childBox.addEventListener('touchend',function(e){
		if(isMove){
			if(currX+moveX-startX>maxPosition){
				currX = maxPosition;
			}else if(currX+moveX-startX<minPosition){	
				currX = minPosition;
			}else{
				currX = currX +moveX-startX;
			}
			addTransition();
			setTransform(currX);
			startX = 0;
			moveX =0;
			isMove = false;
			currX = currX + moveX-startX;
		}
		
	});
}
//-------------------精选左右滑动图开始----------------------
	
//-------------------公告滚动开始----------------------
function notice(node,num){
	//信息滚动
	var news_move = document.querySelector(node);
	var index = 0;
	/*添加过渡*/
		function addMove(){
			news_move.style.transition = "all 1s ease-out";
	        news_move.style.webkitTransition = "all 1s ease-out";
		}
    /*移除过渡*/
        function removeMove(){
            news_move.style.transition = "";
            news_move.style.webkitTransition = "";
        }
    /*设置位移*/
        function setMove(index){
            news_move.style.transform = "translateY("+index+"rem)";
            news_move.style.webkitTransform = "translateY("+index+"rem)";
        }        
    /*定时器*/
        var timer= setInterval(function(){
        	addMove();
//          (index++ > 4)?index=0:index;
			index++;
			if(index>(num-1)){
				index=0;
				removeMove();
				setMove(-index);
            }
            setMove(-index);
        },3000);
}
//-------------------公告滚动结束----------------------

//-------------------回到顶部开始----------------------
function toTop(node){
	var toTops = document.getElementById(node);
	var clientHeight = document.documentElement.clientHeight;
	var timer = null;
	var isTop = true;
	window.onscroll = function(){
		var osTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(osTop>=clientHeight){
			toTops.style.display = 'block';
		}else{
			toTops.style.display = 'none';
		}
		if(!isTop){
			clearInterval(timer);
		}
		isTop = false;
	}
	toTops.onclick = function(){
		timer = setInterval(function(){
			var osTop = document.documentElement.scrollTop || document.body.scrollTop;
			var ispeed = Math.floor( -osTop / 6 );
			document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
			isTop = true;
			if(osTop == 0){
				clearInterval(timer);
			}
		},30);
	}
}
//-------------------回到顶部结束----------------------

//-----------------Ajax请求数据开始--------------------
function ajax(){
	//分别获取手机，平板，穿戴的内容DOM元素及其下面的ul元素
	var choiceness_box = document.querySelector('#choiceness_content_box');
	var choiceness_box_ul = choiceness_box.querySelector("ul");
	var phone = document.querySelector('.phone');
	var slab = document.querySelector('.slab'); 
	var dress = document.querySelector('.dress');
//	var product_class = document.querySelector('.product_class');
   	
    var xhr = new XMLHttpRequest();
	xhr.open('get','index.json');
	xhr.send(null);
	xhr.onreadystatechange=function(){
      if(xhr.status == 200 && xhr.readyState == 4){
    		var data = xhr.responseText;
    		data = JSON.parse(data);
    		
			var choiceness_html = template('choiceness_li',{data:data});
    		var phone_html = template('phone_render',{data:data});
    		var slab_html = template('slab_render',{data:data});
    		var dress_html = template('dress_render',{data:data});
//  		var product_html = template('product_render',{data:data});

			choiceness_box_ul.innerHTML = choiceness_html;
      		phone.innerHTML = phone_html;
      		slab.innerHTML = slab_html;
      		dress.innerHTML = dress_html;
//    		product_class.innerHTML = product_html;
       }
    }
}
//-----------------Ajax请求数据结束--------------------