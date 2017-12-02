
<template>
<div class="Rating">
	 <div class="wrap">
		   <div class="RatingTop">
			    <li>
					<b>{{parseInt((ScoresList.overall_score)*10)/10}}</b>
					 <p>综合评价</p>
					 <span>高于周边商家{{ScoresList.order_rating_amount}}%</span>
				</li>
				<div>
                   <p>服务态度　<span>{{parseInt((ScoresList.service_score)*10)/10}}</span></p>
				   <p>菜品评价　<span>{{parseInt((ScoresList.food_score)*10)/10}}</span></p>
				   <p>送达时间　{{parseInt((ScoresList.deliver_time)*10)/10}}分钟</p>
				</div>
		   </div>

			<div class="RatingCenter one-bottom-px">
				
				<li v-for="(ratingCenter,index) in RatingListV"
				@click="RatingCenter(index)"
				:class="{active:RatingListVIndex==index}">
					{{ratingCenter.name}}({{ratingCenter.count}})
					
				</li>
			</div>

			<ul  class="RatingBottom">
				
				<li class="one-bottom-px RatingBottomLi" v-for="rating in RatingList">
					<div class="user">
						<div>用户</div>
					</div>
					<div class="userName">
						<p>{{rating.username}}　{{rating.rated_at}}</p>
						<span>{{rating.rating}}星</span>
						<div class="userNameImages" v-for="img in rating.order_images">
							<img :src="handleUrl(img.image_hash)"></br>
								<a v-for="name in img.food_names">{{name}}</a>
						</div>
						
					</div>
				</li>
			</ul>
			<div class="ratingA">
                 <img :src="RatingImg" :class="{active: RatingPisUp}"/>
				 <p>{{RatingP}}</p>
			</div>
	 </div>
</div>
</template>

<script>
// 评价
import {sellerRating,sellerRatingV,sellerScores} from "../../../services/home/homeServices.js"	
import {handleUrl} from "../../../common/conmon.js"
let RatingScroll
export default{
	props:{
		id:String
	},
	data(){
		// console.log(this.id)
		return{
		  RatingList:[],
		  RatingListV:{},
		  ScoresList:{},
		  RatingListVIndex:0,
		  offset:0,
		  limit:20,
		  RatingP:"上拉加载",
		  RatingImg:"../../../../static/iamges/jiantou1.jpg",
		  isUp:false,
		  RatingPisUp:false

		}
	},
	created(){
		//用户评价 获取数据
		 this.getData();
		
		// 全部 满意 不满意 有图
		sellerRatingV(this.id).then(result=>{
			// console.log(result)	
			
			this.RatingListV =result;
			// console.log(result)
		})
		// 综合评价
		sellerScores(this.id).then(result=>{
			// console.log(result)
			this.ScoresList=result;
		});
		 
		
		 
	},
	methods:{
		handleUrl,
		RatingCenter(index){
			this.RatingListVIndex=index;
			
		},
		//用户评价 获取数据
		getData(){
			sellerRating(this.id,this.offset,this.limit).then(result=>{
			// console.log(result)
			this.RatingList =this.RatingList.concat(result);
			        this.RatingP = "上拉加载";
					this.RatingPisUp=false;
					this.RatingImg="../../../../static/iamges/jiantou1.jpg";
					RatingScroll.scrollTo(0,RatingScroll.maxScrollY);
		})
		}
	},
	mounted(){
		RatingScroll = new IScroll(".Rating",{
          probeType:3
		})
		RatingScroll.on("scrollStart",()=>{
           RatingScroll.refresh()
		});
		//  console.log(RatingScroll.y)
		setTimeout(()=>{
			// console.log(222)
			//计算滚动视图的真实可滚动的范围
			RatingScroll.refresh()
			let RatingMaxScroll=document.querySelector(".Rating").offsetHeight-document.querySelector('.Rating .wrap').offsetHeight;
			// console.log(RatingMaxScroll)
			//跟当前你的位置做比较，判断是否有空白区域
			if(RatingScroll.y<RatingMaxScroll){
				// console.log(111)
				RatingScroll.scrollTo(0,RatingMaxScroll-180);
				

			}
		},100);
		//监控滚动
		RatingScroll.on("scroll",()=>{
			//上拉加载更多
			if(RatingScroll.y>RatingScroll.maxScrollY&&RatingScroll.y<RatingScroll.maxScrollY+40){
				//上拉了，但是还没有达到上拉加载更多的条件
				this.RatingP = "上拉加载";
				this.isUp=false;
			}else if(RatingScroll.y<=RatingScroll.maxScrollY){
                  this.RatingP = "松手加载";
				  this.isUp=true;  
			}
		});
		RatingScroll.on("scrollEnd",()=>{
			//加载更多
			if(RatingScroll.y<=RatingScroll.maxScrollY){
				this.RatingP = "正在加载";
				this.RatingPisUp=true;
				this.RatingImg="../../../../static/iamges/jiazai.jpg";
                // this.$event.$emit("xxxxx",()=>{
				// 	this.RatingP = "上拉加载";
				// 	this.RatingPisUp=false;
				// 	this.RatingImg="../../../../static/iamges/jiantou1.jpg";
				// 	RatingScroll.scrollTo(0,RatingScroll.maxScrollY+180);
				// })
                 this.getData();


			}
		})
		 
	}
}
</script>

<style>
.Rating{
	width: 100%;
	position: absolute;
	left: 0;
	top: 181px;
	bottom: 0px;
	overflow: hidden;
}
.Rating .RatingTop{
	width: 100%;
	height: 100px;
	margin-bottom:5px;
	padding: 10px;
	display: flex;


}
.Rating .RatingTop li{
	width: 30%;
	height: 80px;
	border-right:1px solid black;
	font-size:12px;  
	text-align: center;
}
.Rating .RatingTop li b{
	
	font-size: 16px;
	color: red;	
}
.Rating .RatingTop div{
	flex: 1;
}
.Rating .RatingTop div p{
  margin:0 0 10px 10px; 
}
.Rating .RatingTop div p span{
	color: red;	
}
.Rating .RatingCenter{
	width: 100%;
	height: 30px;
	display: flex;
}
.Rating .RatingCenter li{
  flex:1;
  margin-left:3px; 
  background: mediumaquamarine;
  text-align: center;
  line-height: 30px;
  color: #fff;
  border-radius: 3px;
}
.Rating .RatingCenter li.active{
	background: blue;
}
.Rating  .RatingBottom{
	width: 100%;
	
}

.Rating  .RatingBottom .RatingBottomLi{
	width: 100%;
	display: flex;
	height: 140px;
}
.Rating  .RatingBottom .RatingBottomLi .user{
	width: 40px;
	height: 100%;
}
.Rating  .RatingBottom .RatingBottomLi .user div{
	width: 35px;
	height: 35px;
	background: blue;
	border-radius: 50%;
	color:#fff;
	font-size: 12px;
	text-align: center;
	line-height: 35px;
	margin: 10px 2px;
	
} 
.Rating  .RatingBottom .RatingBottomLi  .userName{
	width: 100%;
	height: 100%;
	flex:1;
}
.Rating  .RatingBottom .RatingBottomLi  .userName .userNameImages{
	width: 100%;
	height: 96px;

}
.Rating  .RatingBottom .RatingBottomLi  .userName .userNameImages img{
	display: inline-block;
	width: 60px;
	height: 60px;
	margin-right:5px;
}
.Rating  .RatingBottom .RatingBottomLi  .userName .userNameImages a{
	display: inline-block;
	font-size: 12px;
	color: #999;
}
.Rating  .ratingA{
	widows: 100%;
	height: 40px;
	text-align: center;
	line-height: 40px;
}
.Rating  .ratingA img{
	display: inline-block;
	width: 20px;
	height: 20px;
	transform: translateY(3px)
}
/* c3动画 */
@keyframes refresh-ani{
	from{
		transform: rotate(0);
	}
	to{
		transform: rotate(360deg);
	}
}
.Rating  .ratingA img.active{
	animation: refresh-ani infinite 500ms linear;
}
.Rating  .ratingA p{
	display: inline-block;
}

</style>