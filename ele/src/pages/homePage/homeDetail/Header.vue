<template>
<div>
	<transition name="huodong">
	 <ul class="huodongList" v-show="isShow">
		 <h4 class=" one-bottom-px">{{sellerNewHeader.name}}</h4>
		 <li class="one-bottom-px" v-for="headerFootList1 in sellerNewHeader.activities">

              {{headerFootList1.icon_name}}
			  {{headerFootList1.tips}}
		 </li>
		      <p class="one-top-px">
				  <b>商家简述</b>
				  </br>
			    {{sellerNewHeader.promotion_info}}
			 </p>
		 <span @click="huodongListBack()">X</span>
	 </ul>
	 </transition>
	 <div class="headerA">
		  <div class="headerImg" :style="backgroundImg"></div>
			<div class="header">
				<div class="header-head">
					<span @click="sellerBack()" class="back">〈</span>
				</div>
				<div class="headerCenter">
					<div class="headerImages">
						<img :src="handleUrl(sellerNewHeader.image_path)"/>
					</div>
					<div class="headerName">
						<h4>{{sellerNewHeader.name}}</h4>
						<p>　　/　　/{{sellerNewHeader.piecewise_agent_fee}}</p>
						<b>{{sellerNewHeader.promotion_info}}</b>
					</div>
				</div>
				<!-- 活动 -->
				<div class="headerFoot">
					<p v-for="headerFootList in sellerNewHeader.activities">
						{{headerFootList.icon_name}}
						{{headerFootList.tips}}
						
					</p>
					<div class="houdong1" @click="houdongList()">
						<span class="houdong"></span>
						<span v-if="sellerNewHeader.activities">{{sellerNewHeader.activities.length}}个活动</span>
						
					</div>
				</div>
			</div>
	 </div>
</div>
</template>

<script>
import {mapState} from "vuex"
import {sellerMenuUrlHeader} from "../../../services/home/homeServices.js"
import {handleUrl} from "../../../common/conmon.js"
export default{
	props:{
        id:String
	},
  data(){
	//    console.log(this.id)
	  return {
		  sellerNewHeader:{},
		  isShow:false,
		  backgroundImg:{
			backgroundImage:"",
			backgroundSize: "cover",
			filter: "blur(20px)"
	      }
	  }
  },
  computed:mapState(["latitude","longitude"]),
  methods:{
	  handleUrl,
	 
	  sellerBack(){
		  this.$router.back();
	  },
	  houdongList(){
		  this.isShow=true;
	  },
	  huodongListBack(){
		  this.isShow=false;
	  }
  },
  created(){
	  sellerMenuUrlHeader(this.id,this.latitude,this.longitude)
	  .then(result=>{
		 
		  this.sellerNewHeader = result;
		//   console.log(handleUrl)
		  this.backgroundImg.backgroundImage ="url("+handleUrl(result.image_path)+")";
		//    console.log(this.sellerNewHeader.activities)
		//    console.log(this.backgroundImg.background)
	  })
  },
 
}
</script>

<style>
.huodong-enter{
	transform: rotateY(360deg)
}
.huodong-enter-to{
	transform: rotateY(0)
}
.huodong-enter-active{
	transition: all 2S;
}
.huodong-leave{
	transform: translateY(0)
}
.huodong-leave-to{
	transform: translateY(100%)
}
.huodong-leave-active{
	transition: all 2S;
}
.huodongList{
   width: 100%;
   position: absolute;
   top:0;
   bottom:0;
   left: 0;
   background: black;
   z-index: 11;
   overflow: auto;
}
.huodongList h4{
	width: 100%;
	height: 150px;
	text-align: center;
	line-height: 150px;
	color: #999;
	font-size: 20px;
}
.huodongList li{
	width: 100%;
	color: #999;
	height: 30px;
	font-size: 12px;
	line-height: 30px;
}
.huodongList p{
	color: #fff;
	margin-top: 30px;
	font-size: 14px;
	/* text-indent: 20px; */
	width: 100%;
	padding: 10px 0;
}
.huodongList p b{
	text-align: center;
	margin-left: 40%;
	font-size: 20px;
	
}
.huodongList span{
	display: inline-block;
	width:50px;
	height: 50px;
	position: absolute;
	left: 40%;
	bottom:20px;
	border-radius: 50%;
	text-align: center;
	line-height: 50px;
	color: #999;
	font-size: 30px;
	background: red;

}
.headerA{
	width: 100%;
	 height: 150px;
	 position: relative;
}
.headerImg{
	position: absolute;
	left:0;
	top:0;
	width: 100%;
	height: 150px;
}
 .header{
	 position: absolute;
	left:0;
	top:0;
	 width: 100%;
	 height: 150px;
	 /* background:red; */
	 z-index: 2;
	 overflow: hidden;
 }
 .header .header-head{
	 width: 100%;
	 height: 20px;
	 margin-top:3px; 
 }

 .header .header-head .back{
	 display: inline-block;
	 font-size: 16px;
	 font-weight: 900;
	 color:#999;
	 margin-left: 10px;	
 }
 .header .headerCenter{
	 width:100%;
	 height: 90px;
	 /* background: #fff; */
	 display: flex;
	 padding-top: 5px;
 }
  .header .headerCenter .headerImages{
      width: 70px;
	  /* height: 100%; */
  }
  .header .headerCenter .headerImages img{
      width: 50px;
	  height: 50px;
	  padding: 0 10px;
  }
  .header .headerCenter .headerName{
	  flex: 1;
  }
  .header .headerCenter .headerName h4{
	  width: 100%;
	  font-size:14px;
	  font-weight: 900;
	  color: #fff;
	  margin-left: 3px;
  }
  .header .headerCenter .headerName p{
	  width: 100%;
	  font-size: 12px;
	  color: #fff;
	 

  }
  .header .headerCenter .headerName b{
	  display: inline-block;
	   width: 100%;
	  font-size: 12px;
	  height: 32px;
	  color: #fff;
	  overflow: auto;
  }
  .header .headerFoot{
	  width: 100%;
	  height: 30px;
	  overflow: auto;
	  position: relative;
  }

 .header .headerFoot p{
	 color: #fff;
	 font-size: 12px;
	 overflow: auto;
	 
 }
 .header .headerFoot .houdong1{
    position: absolute;
	 right: 0;top: 0;
	 color: #fff;
	 font-size:10px;
 }
 .header .headerFoot .houdong1 .houdong{
	 display: inline-block;
	 width: 0;
	 height: 0;
	 border-left:10px solid transparent;
	 border-right:  10px solid transparent;
	 border-top: 10px solid #ccc;
	 border-bottom: none;
	
 }
</style>