

//创建xhr对象
function createXHR(){
	if (window.XMLHttpRequest) {  
		return new XMLHttpRequest(); //IE7+，非IE
	}
	return ActiveXObject("Microsoft.XMLHTTP"); //IE6
}

/*
			type: 请求方式
			url : 接口
			data: 参数
			async: 是否异步
			
			success: 请求成功后的回调
			error: 请求失败后的回调
			 */
			/*
			ajax({
				type: "get", 
				url: "http://60.205.181.47/myPHPCode2/checkname.php",
				data: {regname:"zhangsan", age:22},  
				async: true,
				
				success: function(data){
					console.log("成功:" + data);
				},
				error: function(data){
					console.log("失败: " + data);
				}
			})
			*/
			
			
			//简化调用
//			ajax({
//				url: "http://60.205.181.47/myPHPCode2/checkname.php",
//				data: {regname:"zhangsan1"},  
//				
//				success: function(data){
//					console.log("成功:" + data);
//				}
//			})
//			
//*/

function ajax(obj){
	
	//默认参数
	obj.type = obj.type || "get"; //默认请求方式为get
	obj.async = obj.async==undefined ? true : obj.async ; //默认为异步请求
	
	//1， xhr对象
	var xhr = createXHR();
	
	//2, open
	//{regname:"zhangsan", age:22}  => "regname=zhangsan&age=22"
	var paramStr = getParams(obj.data);
	
	if (obj.type.toLowerCase() == "get") {
		obj.url += paramStr ? ("?" + paramStr) : "";
	}
	xhr.open(obj.type, obj.url, obj.async);
	
	//3， send
	if (obj.type.toLowerCase() == "get") {
		xhr.send(null);
	}
	else if (obj.type.toLowerCase() == "post") {
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(paramStr);
	}
	
	//4, 接收数据
	if (obj.async == true) { //异步
		
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4) {
				callback();
			}
		}
	}
	else  { //同步
		callback();
	}
	
	function callback(){
		if (xhr.status == 200) {
			//请求成功， 回调
			if (obj.success) {
				obj.success(xhr.responseText);
			}
		}
		else {
			//请求失败, 回调
			if (obj.error) {
				obj.error(xhr.status);
			}
		}
	}
	
}

//{regname:"zhangsan", age:22}  => "regname=zhangsan&age=22"
function getParams(obj){
	var arr = [];
	for (var key in obj) {
		var str = key + "=" + obj[key];
		arr.push(str);
	}
	return arr.join("&");
}





