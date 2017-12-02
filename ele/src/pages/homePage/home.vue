<!--首页-->
<template>
   <div>
		<div class="page" id="home">
			
			<!-- 滚动试图包裹 wrap-->
			<div class="wrap">
                <div class="refresh" :class="{up: isUp}">
					<img :src="topRefreshImg" :class="{active: isTopRefreshActive}"/>
					<span>{{topRefresh}}</span>
			    </div>
				
					<header-com></header-com>
					<banner-com></banner-com>
					<scroll-com></scroll-com>
					<list-com @refreshContent="refreshContent"></list-com>
				<!-- 上拉加载更多 -->
				<div class="loadmore" :class="{down: isDown}">
					<img :src="topRefreshImg" :class="{active: isBottomRefreshActive}"/>
					<span>{{bottomRefresh}}</span>
				</div>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
//引入首页的4个大组件
import HomeHeader from "../../components/home/homeHeader.vue" 
import HomeBanner from "../../components/home/homeBanner.vue" 
import HomeScroll from "../../components/home/homeScroll.vue" 
import HomeLise from "../../components/home/homeList.vue" 
let isroll = null;
export default{
data(){
	return{
		topRefresh:"下拉更新",
		isUp:false,
		topRefreshImg:"/static/iamges/jiantou1.jpg",
		isTopRefreshActive:false,

		bottomRefresh:"上拉加载",
		isDown:false,
		bottomRefreshImg:"/static/iamges/jiantou1.jpg",
		isBottomRefreshActive:false
		
	}
},

components:{
	//头部
	"header-com" : HomeHeader,
	//轮播
	"banner-com" : HomeBanner,
	//滚动
	"scroll-com" : HomeScroll,
	//列表
	"list-com" : HomeLise
},
methods:{
	refreshContent(){
		// 刷新获取滚动高
		isroll.refresh();
		setTimeout(() => {
			// console.log(222)
			//计算滚动视图的真实可滚动的范围
			let realMaxScroll = document.querySelector("#home").offsetHeight-document.querySelector('#home .wrap').offsetHeight;
			
			//跟当前你的位置做比较，判断是否有空白区域
			if(isroll.y<realMaxScroll){
				//回到最底部
				console.log(111)
				isroll.scrollTo(0,realMaxScroll);
			}
		}, 100);

	}
},
mounted(){
	//滚动
	 isroll = new IScroll("#home",{
        //  滚动流畅写3
		 probeType:3
	 });
	 //进入页面直接进入到40 的位置
	isroll.scrollTo(0,-40);
	     //开始监听
	isroll.on("scrollStart",()=>{
		//   刷新页面
		 isroll.refresh();
	 });
	 //监控滚动
    isroll.on("scroll",()=>{
	 //下拉刷新
	 if(isroll.y >=0){
		  //已经达到刷新条件
		  this.topRefresh="可以更新";
		  this.isUp = true;
	 }else if(isroll.y<0&&isroll.y>=-40){
		//没有达到刷新条件
		this.topRefresh="下拉更新";
		this.isUp = false;
	 }
	 //上拉加载更多
	 // 最高拉度到+40的高度之间
     if(isroll.y>isroll.maxScrollY&&isroll.y<isroll.maxScrollY+40){
		 //上拉了，但是还没有达到上拉加载更多的条件
		 this.bottomRefresh="上拉加载";
		 this.isDown = false;
	 }else if(isroll.y<=isroll.maxScrollY){
		 this.bottomRefresh="松手加载更多";
		 this.isDown = true;
	 }

	})
	// 结束监听
	isroll.on("scrollEnd",()=>{
		//判断停止位置，是否是需要刷新
		if(isroll.y>=0){
			//可以刷新了
			this.topRefresh="正在更新";
			this.topRefreshImg ="static/iamges/jiazai.jpg";
			this.isTopRefreshActive=true;
			//请求刷新数据
			
			// 这里刷新数据
			setTimeout(() => {
				   this.topRefresh="下拉更新";
					this.topRefreshImg ="static/iamges/jiantou1.jpg";
					this.isUp = false;
					isroll.scrollTo(0,-40);
					window.location.reload();
			}, 1000);
			
		};
		//加载更多
		if(isroll.y<=isroll.maxScrollY){
		   //达到了条件
			   this.bottomRefresh="正在加载更多";
			   this.bottomRefreshImg="static/iamges/jiazai.jpg",
			   this.isBottomRefreshActive=true;
			   //请求更多数据
			   this.$event.$emit("bottomRefresh-list",()=>{
				   this.bottomRefresh="上拉加载";
				   this.bottomRefreshImg="static/iamges/jiantou1.jpg";
				   this.isBottomRefreshActive=false;
				   isroll.scrollTo(0,isroll.maxScrollY+40);
			   })
		}
	})
}
}

</script>
  
<style>
#home .wrap .refresh,.loadmore{
	width: 100%;
	height: 40px;
	/* background: red; */
	text-align: center;
	line-height: 40px;
}
#home .wrap .refresh img,.loadmore img{
	width: 18px;
	height: 18px;
	display: inline-block;
	transform: rotate(180deg) translateY(-2px);

}
#home .wrap .refresh span{
	display: inline-block;
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
/* c3动画 */
#home .refresh img.active,.loadmore img.active{
	animation: refresh-ani infinite 500ms linear;
}
  
#home .wrap .loadmore img{
	transform:translateY(2px);
}
</style>