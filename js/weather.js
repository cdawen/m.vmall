window.onload=function(){
	var tbody = document.getElementsByTagName('tbody')[0];
			var btn = document.getElementsByTagName('input')[1];
			var city = document.getElementsByTagName('input')[0];
			var body = document.body;
			btn.onclick=function () {
			    //对城市名进行编码
			    var cityName = encodeURIComponent(city.value);
			    //需要一个script标签，返回一个函数调用
			    var script = document.createElement('script');
			    script.src = 'http://v.juhe.cn/weather/index?format=2&cityname='+cityName+'&key=3f5eb27f10385a9c7c01d352200cd95c&callback=report';
			    body.appendChild(script);
			    //需要一个全局函数，这个函数可以对实参进行操作
			    window.report=function (data) {
			        tbody.innerHTML="";
			        for(var i=0;i<data.result.future.length;i++){
			            tbody.innerHTML+="<tr><td>"+data.result.future[i].date+"</td><td>"+data.result.future[i].temperature+"</td><td>"+data.result.future[i].weather+"</td></tr>"
			        }
			        body.removeChild(script);
			    }
			};
}
