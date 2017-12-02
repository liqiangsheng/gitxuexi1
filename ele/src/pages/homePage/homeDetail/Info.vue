<template>
<div class="info">
	 <ul class="infoList one-bottom-px">
		 <h5>活动与服务</h5>
		 <li v-for="item in infoList.activities">
			 <b>{{item.icon_name}}</b>
			 <span>{{item.tips}}</span>
		 </li>
	 </ul>
	 <div class="infoSeller one-bottom-px">
		 <h5>商家信息</h5>
		 <p>{{infoList.promotion_info}}</p>
	 </div>
	  
	  <div class="infoTel one-bottom-px">
		 <h5>商家电话</h5>
		 <p>4000888888</p>
	 </div>

	 <div class="infoAddress one-bottom-px">
		 <h5>商家地址</h5>
		 <p>{{infoList.address}}</p>
	 </div>

	 <div class="infoTime one-bottom-px">
		 <h5>营业时间</h5>
		 <p>08；00-22:00</p>
	 </div>
	 <div class="infoZizi one-bottom-px">
		 <h5>营业资质</h5>
		 <p>〉</p>
	 </div>
</div>
</template>

<script>
import {mapState} from "vuex"
import {sellerMenuUrlHeader} from "../../../services/home/homeServices.js"

export default{
	props:{
		id:String
	},
	data(){
		console.log(this.id)
		return{
            infoList:{}
		}
	},
	computed:mapState(["latitude","longitude"]),
	created(){
		sellerMenuUrlHeader(this.id,this.latitude,this.longitude).then(result=>{
			console.log(result)
			// activities-> icon_name tips
			// promotion_info
			// 78787878
			// address
			this.infoList = result;
		})
	}
}

</script>

<style>
 .info{
	 width: 100%;
	 position: absolute;
	 top: 181px;
	 bottom: 0;
	 left: 0;
	 padding-left: 10px;
	 overflow:auto;	
 }
 .info div{
	 padding: 10px 0 ;
 }

.info .infoList{
	width: 100%;
	overflow: auto;
}
.info .infoList h5{
	font-size: 16px;
	margin: 5px 0;
}

.info .infoList li{
	margin-bottom: 3px;
}
.info .infoSeller{
	width: 100%;
	overflow: auto;
}
.info .infoSeller h5,.info .infoTel h5,.info .infoAddress h5,.info .infoZizi h5,.info .infoTime h5{
	display: inline-block;
	font-size: 16px;
	
}
.info .infoSeller p,.info .infoTel p{
	display: inline-block;
	font-size: 10px;
}
.info .infoTel p{
	float: right;
	margin-right: 5px;
}
.info .infoAddress p{
	font-size: 12px;
}

.info .infoZizi p{
	font-size: 18px;
	float: right;
	margin-right: 5px;
	
}
</style>