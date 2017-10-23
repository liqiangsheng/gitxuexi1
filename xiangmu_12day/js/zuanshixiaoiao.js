$(function(){
	
	//头部
	//购物车
	$("#gouwu").hover(function(){
		
		 $("#gouwu").css({border:"1px solid deeppink","border-bottom":0,background:"#fff"})
         $("#shangpin").show();
		
	},function(){
		 $("#gouwu").css({border:0,background:"peachpuff"})
		 $("#shangpin").hide();
	})
	//订单
	$("#niao").hover(function(){
		
		 $("#niao").css({border:"1px solid deeppink","border-bottom":0,background:"#fff"})
         $("#niaocao").show();
		
	},function(){
		 $("#niao").css({border:0,background:"peachpuff"})
		 $("#niaocao").hide();
	})
	//订单
	$("#guanwang").hover(function(){
		
		 $("#guanwang").css({border:"1px solid deeppink","border-bottom":0,background:"#fff"})
         $("#guanw").show();
		
	},function(){
		 $("#guanwang").css({border:0,background:"peachpuff"})
		 $("#guanw").hide();
	})
	  
    
	
	
	
	  // 导航的tab切换
	  //box2———1
	 $("#list3 li").eq(1).hover(function(){
	  	
	  		$(".box2").show().children("div").eq(0).show();
	  	
	 
	  },function(){
	  	
	  		$(".box2").hide().children("div").eq(0).hide();
	  	
	  });
	  
	$("#box2_1").hover(function(){
	  	
	  		$(".box2").show().children("div").eq(0).show();
	  },function(){
	  	
	  	  $(".box2").hide().children("div").eq(0).hide();
	  })
	  
	   
	  
	 //box2———2
	  
	 $("#list3 li").eq(2).hover(function(){
	  	
	  		$(".box2").show().children("div").eq(1).show();
	  	
	 
	  },function(){
	  	
	  		$(".box2").hide().children("div").eq(1).hide();
	  	
	  });
	  
	$("#box2_2").hover(function(){
	  	
	  		$(".box2").show().children("div").eq(1).show();
	  },function(){
	  	
	  	  $(".box2").hide().children("div").eq(1).hide();
	  })
	  
	  
	  //box2———3
	  $("#list3 li").eq(3).hover(function(){
	  	
	  		$(".box2").show().children("div").eq(2).show();
	  	
	 
	  },function(){
	  	
	  		$(".box2").hide().children("div").eq(2).hide();
	  	
	  });
	  
	$("#box2_3").hover(function(){
	  	
	  		$(".box2").show().children("div").eq(2).show();
	  },function(){
	  	
	  	  $(".box2").hide().children("div").eq(2).hide();
	  })
	  
	 //box2———4
	   
	  $("#list3 li").eq(4).hover(function(){
	  	
	  		$(".box2").show().children("div").eq(3).show();
	  	
	 
	  },function(){
	  	
	  		$(".box2").hide().children("div").eq(3).hide();
	  	
	  });
	  
	$("#box2_4").hover(function(){
	  	
	  		$(".box2").show().children("div").eq(3).show();
	  },function(){
	  	
	  	  $(".box2").hide().children("div").eq(3).hide();
	  })
	
//box2———5
	   
	   
	  $("#list3 li").eq(5).hover(function(){
	  	
	  		$(".box2").show().children("div").eq(4).show();
	  	
	 
	  },function(){
	  	
	  		$(".box2").hide().children("div").eq(4).hide();
	  	
	  });
	  
	$("#box2_5").hover(function(){
	  	
	  		$(".box2").show().children("div").eq(4).show();
	  },function(){
	  	
	  	  $(".box2").hide().children("div").eq(4).hide();
	  })
	
	
	   //box2———6
	   
	 $("#list3 li").eq(6).hover(function(){
	  	
	  		$(".box2").show().children("div").eq(5).show();
	  	
	 
	  },function(){
	  	
	  		$(".box2").hide().children("div").eq(5).hide();
	  	
	  });
	  
	$("#box2_6").hover(function(){
	  	
	  		$(".box2").show().children("div").eq(5).show();
	  },function(){
	  	
	  	  $(".box2").hide().children("div").eq(5).hide();
	  })
	  
	  
	  //改变box2里所有a
	  $(".box2").find("a").hover(function(){
	  	$(this).css("color","red")
	  },function(){
	  	$(this).css("color","black")
	  })
	 
	
	 //大轮播
		lunbotu();
		//轮播2
		lunbo1();
		//轮播3
		lunbo2();
		//轮播4
		lunbo3();
		//轮播5
		lunbo4()
		
	//婚戒推荐全球美钻
	    
	     $("#list6").css("width",$("#list6 a").size()*$("#list6 a").eq(0).outerWidth(true))
//	     console.log($("#list6 a").size()*$("#list6 a").eq(0).outerWidth(true))
	     
        var i=0;
	   $("#leftye").click(function(){
		   	
              i++
		     
		   	if(i>$("#list6 a").size()-4){
		   			
		   	  i=$("#list6 a").size()-4;
		   	    
		   	}
		   	 $("#list6").animate({left:-298*i})

		})

	
	   $("#rightye").click(function(){
	   	
	     	  i--
	     	  
	   		if(i<0){
		   		
		   	   i=0;
		   	   
		   	   
		   	}
	   		$("#list6").animate({left:-298*i})
       })
	
	
	
	
	// jax取商品列表
		var arr=[];
		$.get("json/shangpingliebiao.json",function(date){
	     	
//	     	 console.log(date)
	     	arr=date;
	     	
	     	for(var i=0;i<arr.length;i++){
	     		
	     		var obj=arr[i];
	     		
	     		var div=$("<div></div>").appendTo(".liebiao")
	     		$("<img src="+obj.img+">").appendTo(div)
	     		$("<p>"+obj.name+"</p>").appendTo(div)
	     		$("<strong>"+obj.jiage1+obj.jiage+"</strong>").appendTo(div)
	     		$("<span>"+obj.shouchu+"</span>").appendTo(div)
	     		$("<span>"+obj.pinglun+"</span>").appendTo(div)	
	     	}
	    })
	
	    
	    //委托给商品的父亲
	
	    $(".liebiao").on("click","div",function(){
	    	
	    	var index = $(this).index();
	    	
	    	var obj=arr[index];
	    	
//	    	console.log(obj),
	    	
	    	location.href="shangpingliebiao.html?id="+obj.id;
	    })
	
	
	
	
			//聊天窗口
			$("#drap").click(function(){
				$(".drap").show();
			})
			
			//拖拽
			
			$(".drap_1").mousedown(function(e){
				 e.preventDefault();
				 e.stopPropagation()
				 
				 var disX=e.offsetX;
				 var disy=e.offsetY;
			    $(document).mousemove(function(e){
			    	e.preventDefault();
			    	
			    	 $(".drap").css({left:e.pageX-disX,top:e.pageY-disy})
			    	
			    })
			    
			    $(document).mouseup(function(){
			    	
					$(document).off("mousemove mouseup");
				})
				
			})
			
		   //关闭
				
			$(".guanbi").click(function(){
					$(".drap").hide();
				})
			
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//固定定位的二维码
	$("#erweima").hover(function(){
		$("#erweima1").show();
	},function(){
		$("#erweima1").hide();
	})
	$("#erweima1").hover(function(){
		$("#erweima1").show();
	},function(){
		$("#erweima1").hide();
	})
	
	$("#gouwu1").click(function(){
		location.href="zhuanshixiaoniaocat.html";
	})
	
	
	
	
	
})
