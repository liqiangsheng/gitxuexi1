function $_(id){
				return document.getElementById(id)
			}

function lunbotu(){
		   //1, 先获取数据
				ajax({
					url: "json/luobo.json", 
					data:{}, 
					success: function(data){ 
//						console.log(data);
						
						var arr = JSON.parse(data);
						for (var i=0; i<arr.length; i++) {
							var obj = arr[i];
							
							//创建li节点
							var li = document.createElement("li");   
							$_("list1").appendChild(li);
							li.innerHTML = "<img src='"+ obj.img +"' >";
						
							var li3 = document.createElement("li");
							$_("list2").appendChild(li3);
							li3.innerHTML = i+1;
							if (i == 0) {
								li3.className = "active";
							}
						}
						
						//轮播
						lunbo();
					}
				})
				
				
				
				//轮播
				function lunbo(){
				
					var lunbo = $_("lunbo");
					var list1 = $_("list1");
					var li1= list1.getElementsByTagName("li");
					var list2 = $_("list2");
					var ali2 = list2.getElementsByTagName("li");
					
					
					//复制第1张图到最后
					list1.appendChild( li1[0].cloneNode(true) );
					
					//li的数量
					var size = li1.length; //5
					
					//每个li的宽度
					var liW = li1[0].offsetWidth;
					
					//ul的宽度
					list1.style.width = size*liW + "px";
					
//					
					//自动轮播
					var index = 0; //表示即将显示的图片下标（li下标）
					var timer = setInterval(function(){
						index++;
						move1();
					}, 3000);
					
					//移动到第index张图
					function move1(){
						
						//控制右边界
						if (index >= size){
							list1.style.left = 0; //非动画方式变到第1张图（index=0）   
							index = 1; //即将显示第2张图（index=1）
						}
						
						//控制左边界
						if (index < 0){
							list1.style.left = -liW*(size-1) + "px"; 
							index = size-2; 
						}
						
						//动画移动
						move(list1, {left:-index*liW});
						
						//改变list2中li的选中状态
						for (var i=0; i<ali2.length; i++) {
							if (i == index) {
								ali2[i].className = "active"; //选中状态
							}
							else {
								ali2[i].className = ""; //非选中状态
							}
						}
						if (index == size-1) {
							ali2[0].className = "active"; //选中状态
						}
						
					}
					
					//list2中li添加移入事件
					for (var i=0; i<ali2.length; i++) {
						ali2[i].index = i;
						ali2[i].onmouseenter = function(){
							index = this.index;
							move1();
						}
					}
					
					//上一页
					$_("prev").onclick = function(){
						index++;
						move1();
					}
					//下一页
					$_("next").onclick = function(){
						index--;
						move1();
					}
					
					
					//移入lunbo
					lunbo.onmouseenter = function(){
						clearInterval(timer);
						$_("prev").style.display="block";
						$_("next").style.display="block";
					}
					//移出lunbo
					lunbo.onmouseleave = function(){
						clearInterval(timer);
						timer = setInterval(function(){
							index++;
							move1();
							
						}, 3000);
						
							$_("prev").style.display="none";
						    $_("next").style.display="none";
					}
				}
				
	
}

function lunbo1(){
	
	var tiaoxuan_box=$_("tiaoxuan_box");
	var div=tiaoxuan_box.getElementsByTagName("div");
	
//	alert(div)
	//自动播放
	var index=0;
	//开定时器
	var temp=setInterval(function(){
		index++;
		move2()
	},2000)
	
	//改变图片
	
	function move2(){
		
		if(index>=div.length){
			index=0;
		}
		if(index<0){
			index=div.length-1
		}
		
		for(var i=0;i<div.length;i++){
			if(index==i){
				
				move(div[i],{opacity:100})
//				
				
			}else{
				move(div[i],{opacity:0})
//				
			}
		}
		
	}
	
	
	
	
}


function lunbo2(){
	
	   let list5=$_("list5");
//	   console.log(list5)
	   let lis1=list5.getElementsByTagName("li");
//	   alert(lis1);
      let list5_box=$_("list5_box");
      let div=list5_box.getElementsByTagName("div")
//    alert(div.length)
	   
	   
	   let index=0;
	   
	   let temp1=setInterval(()=>{
	   	
	   	  index++;
	   	  
	   	  move3();
	   	
	   },2000)
	   
	   
	   function move3(){
	   	
		   	if(index>=lis1.length){
		   		index=0;
		   	}
	   	
	   	    if(index<0){
	   	    	index=lis1.length-1;
	   	    }
	   	    
	   	    for(let i=0;i<lis1.length;i++){
	   	    	if(index==i){
	   	    		lis1[i].className="active3";
//	   	    		div[i].className="active2";
                    move(div[i],{opacity:100})
	   	    	}else{
	   	    		lis1[i].className="";
	   	    		move(div[i],{opacity:0})
	   	    	}
	   	    	
	   	    	lis1[i].onmousemove=function(){
	   	    		
	   	    		 for(let i=0;i<lis1.length;i++){
	   	    		 	//
	   	    		 	move(div[i],{opacity:0})
	   	    		 	
	   	    		 	lis1[i].className="";
	   	    		 }
	   	    		 
	   	    		this.className="active3";
	   	    		// 定义a等于当前的li
	   	    		var a = lis1[i];
//	   	    		//a的下标等于i
	   	    		a.index = i;
	   	    		//定义变量等于当前下标
	   	    		var z_index  =  this.index;
//	   	    		console.log(z_index)
//                   让div的下标等于li的下标改变div的透明度
	   	    		move(div[z_index],{opacity:100})
	   	    	}
	   	    	
	   	    }
	   	    
	   	    list5_box.onmousemove=list5.onmousemove=()=>{
	   	    	clearInterval(temp1);
	   	    	
	   	    }
	   	    
	   	     list5_box.onmouseout=list5.onmouseout=()=>{
	   	     	clearInterval(temp1);
	   	    	temp1=setInterval(()=>{
	   	
		   	  	index++
		   	  
		   	 	 move3();
	   	
	  			 },2000)
	   	    }
	   }
	
}



function lunbo3(){
	
	    var dizhi_left=$_("dizhi_left");
	    var div=dizhi_left.getElementsByTagName("div");
	    
	    var box8=$_("box8");
	    var div1=box8.getElementsByTagName("section");
//	    alert(div1.length)
  
//     var divW=div[0].offsetWidth;
//     var size=div.length;
//     dizhi_left.style.width=divW*size+"px";


	    var index=0;
	    
	    var temp=setInterval(function(){
	    	
	    	index++;
	    	
	    	move4();
	    	
	    },3000)
	    
	    function move4(){
	    	
	    	if(index>=div.length){
	    		index=0
	    	}
	    	if(index<0){
	    		index=div.length-1;
	    	}
	    	
	    	for(var i=0;i<div.length;i++){
			if(index==i){
				
				move(div[i],{opacity:100})
				div1[i].className="active5";
				
			}else{
				move(div[i],{opacity:0})
				div1[i].className="";
			}
		}
	    	
	    	
	    	
	    }
	
	
	
}




function lunbo4(){
	
	    var box10=$_("box10");
	    var div=box10.getElementsByTagName("div");
//	      alert(div)
	    var box9=$_("box9");
	    var div1=box9.getElementsByTagName("div");
//	    alert(div1.length)


	   box10.appendChild( div[0].cloneNode(true) );
  
       var divW=div[0].offsetWidth;
       var size=div.length;
       box10.style.width=divW*size+"px";
//     alert( box10.style.width)

	    var index=0;
	    
	    var temp=setInterval(function(){
	    	
	    	index++;
	    	
	    	move4();
	    	
	    },3000)
	    
	    function move4(){
	    	
	    	if(index>=size){
	    		box10.style.left=0;
	    		index=1;
	    	}
	    	if(index<0){
	    		box10.style.left=-divW*(size-1)+"px";
	    		index=size-2;
	    	}
	    	
	    	
	    	
	    	//动画移动
//			move(box10, {left:-index-1*divW});
			
			for(var i=0;i<div1.length;i++){
			if(i==index){
				
				move(box10, {left:-index*divW});
				div1[i].className="active6";
				
			}else{
				move(box10, {left:-index*divW});
				div1[i].className="";
			}
			if(index==size-1){
				div1[0].className="active6";
			}
		}
		
			
		}
	    	
	    	
		

}

