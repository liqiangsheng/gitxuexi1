<template>
<div class="cart">
	<div class="bar">
		<div class="cartLeft">
			<p>购物车</p>
			<span v-if="isShow">{{num}}</span>
		</div>

		<div class="cartCenter">
			<span>￥{{priceNumber}}</span>
			<p>{{cartItem.piecewise_agent_fee}}</p>
		</div>

		<div class="cartRight">
			<span>去结算</span>
	</div>
	</div>
	
	<div class="cover"></div>
</div>
</template>

<script>
//购物车
 import {mapState} from "vuex"
 import {sellerMenuUrlHeader} from "../../../services/home/homeServices.js"

 export default{
    props:{
		id :String
	},
	data(){
		// console.log(this.id)
		return{
		   cartItem:{},
		//    总价
		   priceNumber:0,
		//    数量
		   num:0,
		   isShow:-1
		}
	},
	computed:mapState(["latitude","longitude"]),
	created(){
		sellerMenuUrlHeader(this.id,this.latitude,this.longitude)
		.then(result=>{
			// console.log(result)
			this.cartItem =result;
		});
		
		// console.log(this.$store.state.cart.list)
		let number = this.$store.state.cart.list.map((item)=>{
			   let numb={};
			   numb.goods = item.goods.map((good)=>{
				   let goodNum = {};
				   goodNum.count =good.count;
				   return goodNum
			   });
			  return numb
		})
		// console.log(number)
	   let sum =0
	   number.map((i)=>{
		//    console.log(i)
		    i.goods.map((cou)=>{
			 return  sum+=cou.count
		   })
	   })
	 console.log(sum)
	 this.num =sum;
	 this.isShow=sum;
	}

 }

</script>

<style>
.cart{
	width: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
}

.cart .bar .cartLeft{
	width: 35px;
	height: 35px;
	background:blue;
	border: 5px solid #999;
	border-radius: 50%;
	position: absolute;
	left: 10px;
	top: -10px;

}
.cart .bar .cartLeft p{
	color: #fff;
	font-size: 10px;
	text-align: center;
}
.cart .bar .cartLeft span{
	width: 16px;height: 16px;
	background: red;
	position: absolute;
	right: -5px;
	top:-7px;
	font-size:12px;
	border-radius: 50%;
	text-align: center;
	color: #fff;

}
.cart .bar .cartCenter{
	width: 100px;
	height: 40px;
	position: absolute;
	left: 65px;
	top: 0;
}
.cart .bar .cartCenter p{
    color: #fff;
	font-size: 10px;
}
.cart .bar .cartCenter span{
	font-size: 16px;
	color:red;
}
.cart .bar .cartRight{
	width: 100px;
	height: 40px;
	background: green;
	position: absolute;
	right:0;
	top: 0;
	text-align: center;
	color: #fff;
	line-height: 40px;
}
.cart .bar{
	width: 100%;
	height: 40px;
	background: #999;
	position: relative;
}
</style>