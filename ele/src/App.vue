<template>
  <div id="app">
  	
  	  <nav class="foot one-top-px">
  	  	<router-link class="tab" v-for="item in foot" :to="item.path" >
				<span class="icon iconfont" :class="item.icon"></span>
			    <span class="text">{{item.title}}</span>	
		</router-link>
  	  </nav>
  	
  	 
      <keep-alive>
      	  <router-view></router-view>
      </keep-alive>
      
      
  </div>
</template>

<script>
     export default{
     	 data(){
     	 	 return {
     	 	 	 foot:[
						{title:"首页",icon:"icon-eleme",path:"/home"},
						{title:"发现",icon:"icon-discover",path:"/discover"},
						{title:"订单",icon:"icon-order",path:"/order"},
						{title:"我的",icon:"icon-me",path:"/me"}
					]
     	 	 }
     	 }
     }
</script>

<style scoped>
 .foot{
	 width: 100%;
	 height: 49px;
	 position: absolute;
	 left: 0;
	 bottom: 0;
	 display: flex;
 }
 .foot .tab{
	 flex: 1;
	
	
	 
 }
 .foot .tab.router-link-active span{
	 color:blue;
 }
 .foot .tab span{
	 display: block;
	  color:#666;
 }
  .foot .tab .icon{
	    width: 100%;
		height: 30px;
		font-size: 20px;
		text-align: center;
		line-height: 32px;

  }
  .foot .tab .text{
       width: 100%;
		height: 19px;
		text-align: center;
		line-height: 17px;
		font-size: 12px;
  }
  

</style>
