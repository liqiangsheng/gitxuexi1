<template>
<div class="block menu">
	<!-- 类别 -->
	<div class="menu-nav">
		  <div id="sellerbuy" v-if="ifshow>=0">
			  <a class="close" @click="close()">X</a>
			  <sellerBuy :foodd="foodd"></sellerBuy>
		  </div>
		<ul class="wrap">
			
			<li v-for="(menuItem, index) in menuList"
			class="one-bottom-px"
			:class="{active: index==selectMenuIndex}"
			@click="menuAction(index)">
				{{menuItem.name}}
			</li>
		</ul>
	</div>
     <!-- 食物分栏 -->
	<div class="menu-list">
		<ul class="wrap">
			<li class="menu-sm-list" v-for="(menuItem, index) in menuList">
				<h3 class="title one-bottom-px">
					{{menuItem.name}}
					<span>{{menuItem.description}}</span>
					
				</h3>
				<ul class="foods">
					<li class="food one-bottom-px" v-for="(food,foodIndex) in menuItem.foods">
						<div class="food-img">
							<img :src="handleUrl(food.image_path)" />
						</div>
						<div class="food-content">
							<h4>{{food.name}}</h4>
							<p class="foodDescription">{{food.description}}</p>
							<p class="foodTips">{{food.tips}}</p>
							<div class="price">
								<span v-for="price in food.price">
									￥{{price}}
								</span>
								<b class="odd" @click="add(food,foodIndex)">+</b>
								<div class="oddReduce" v-if="isShow ==foodIndex">
									<strong class="reduce" @click="reduce(food,foodIndex)">-</strong>
									<a class="num" v-if="isShow ==foodIndex">{{food.count?food.count:foodA}}</a>	 
							    </div>
								
							</div>
						</div>
					</li>
				</ul>
			</li>
		</ul> 
		

	</div>

</div>
</template>

<script>
import {handleUrl} from "../../../common/conmon.js"
import {getSellerMenu} from "../../../services/home/homeServices.js"
import SellerBuy from "./menu/sellerbuy"
export default {
	//接受sellerdetail传来的ID
	props: {
		//   类型 
		id: String
	},
	data(){
		return {
			menuList: [],
			selectMenuIndex: 0,
			isShow:-1,
			ifshow:-1,
			menuIndex:0,
			foodd:{},
			foodA:0
			
		}
	},
	components:{
		sellerBuy:SellerBuy
	},
	methods: {
		//让全局的变自己的 解析图片
		handleUrl,
		//左边菜单栏点击事件
		menuAction(index){
			//1.让左边的菜单按钮选中
			this.selectMenuIndex = index;
			//2.让右边的菜单滚动到对应位置上
			let offsetHeight = 0;
			for(let i = 0; i < index; i++){
				offsetHeight -= this.heightArr[i];
			}
			// console.log(offsetHeight)
			//    滚动到位置和用时间
			this.menuScroll.scrollTo(0, offsetHeight, 100);
		},
		handleList(){
			//取得每个li
			let smallListDoms = document.querySelectorAll('.menu-sm-list');
			this.heightArr = [];
			for (let i = 0; i < smallListDoms.length; i++) {
				this.heightArr.push(smallListDoms[i].offsetHeight);
			}
			// console.log(this.heightArr);
			//获得类别的每个li
			let navLiDoms = document.querySelectorAll('.menu-nav li');
			this.navHeightArr = [];
			for (let i = 0; i < navLiDoms.length; i++) {
				this.navHeightArr.push(navLiDoms[i].offsetHeight);
			}
			// console.log(this.navHeightArr);
		},
		add(food,foodIndex){
          //添加商品到购物车
			this.$store.dispatch("cart/addGoods",{
				sellerId:this.id,
				foodname: food.name,
				item_id: food.item_id,
				foodImg: food.image_path,
				specification:food.specification,
				attr:food.attr,
				pirce:food.price,
				count:1,
			})
			
			 if(food.specifications.length>0){
				 this.ifshow=foodIndex;
			 }else{
				  food.count++;
				
			 }
              
			  this.isShow=foodIndex;
			  this.foodd=food;
			//   this.$event.$emit("seller-buy",food)
			
		    // console.log(food)
			// console.log(foodIndex)
		},
		
		reduce(food,foodIndex){

			//去购物车删除
			this.$store.dispatch("cart/reduceGoods",{
				sellerId:this.id,
				item_id: food.item_id,
				count: food.count
			})
			
			   food.count--;
			
			 if(food.count<=0){
				 food.count=0;
				 this.isShow=-1;
			 }
			 this.isShow=foodIndex;
		},
		close(){
			this.ifshow=-1;
		}
		
	},
	created(){
		//请求菜单数据
		getSellerMenu(this.id)
		.then(result=>{
			// console.log(result);
			this.menuList = result;
		});
		this.$event.$on("closeBuy",()=>{
			// console.log(1111)
			this.ifshow=-1;
			this.foodA++;
			
		})
		
	},
	mounted(){
		this.navScroll = new IScroll('.menu-nav', {});
		this.menuScroll = new IScroll('.menu-list', {
			probeType: 3
		});
		//监听菜单的滚动，让菜单栏对应的按钮选中
		this.menuScroll.on('scroll', ()=>{
			for (let i = 0; i < this.heightArr.length; i++) {
				let min = 0;
				let max = 0;
				for (let j = 0; j < i; j++) {
					min += this.heightArr[j];
				}
				max = min+this.heightArr[i];
//				console.log('index='+i+':'+min+"~"+max);
				
				let y = this.menuScroll.y * (-1);
				//如果menuScroll.y值介于max和min之间,那么this.selectMenuIndex = i
				if( y > min && y < max ){
					this.selectMenuIndex = i;
					//判断左边的按钮是否可见。
					let y = 0;
					for(let i = 0; i < this.selectMenuIndex; i++){
						y -= this.navHeightArr[i];
					}
					// console.log(y)
					//是否可以滚动到y的位置
					if(y > this.navScroll.maxScrollY){
						this.navScroll.scrollTo(0, y, 100);
					}
					break;
				}
				
			}

			
		});
		
		
	},
	updated(){
	    //刷新页面数据
		this.navScroll.refresh();
		this.menuScroll.refresh();
		//如果还不知道列表高度，去取得列表高度
		if(!this.heightArr){
			this.handleList();
		}
	}

}
</script>

<style>
  .menu .menu-nav #sellerbuy{
	  width: 80%;
	  height: 350px;
	  background:#fff;
	  position: absolute;
	  left: 10%;
	  top: -70px;
	  z-index: 11;
	 
  }
  .menu .menu-nav #sellerbuy .close{
	  display: inline-block;
	  width: 20px;
	  height: 20px;
	  border: 1px solid#666;
	  position:absolute;
	  top:10px;
	  right: 10px;
	  text-align: center;
	  line-height: 20px;
	  color: #333; 
  }
.menu{
	display: flex;
	bottom: 40px!important;
}
.menu .menu-nav{
	width: 70px;
	overflow: hidden;
}
.menu .menu-nav li{
	padding: 14px 6px;
	font-size: 12px;
	line-height: 14px;
	color: #666;
	background: #f5f5f5;
}
.menu .menu-nav li.active{
	color: red;
	background: #fff;
}
.menu .menu-list{
	margin-left: 4px;
	flex: 1;
	overflow: hidden;
}
.menu .menu-sm-list .title{
	font-size: 14px;
	color: #666666;
}
.menu .menu-sm-list .title span{
	font-size: 12px;
	font-weight: normal;
	color: #999;
}
.food{
	display: flex;
	padding: 10px 8px 10px 0px;
}
.food .food-img{
	width: 60px;
	height: 60px;
}
.food .food-img img{
	width: 100%;
}
.food .food-content{
	flex: 1;
}
.food .food-content h4{
	width: 100%;
	font-size:12px;
	font-weight: 900;
	margin-left: 3px;
}
.food .food-content .foodDescription{
	width: 100%;
	font-size: 10px;
	color: #999;
	margin-left: 3px;
}
.food .food-content .foodTips{
	width: 100%;
	font-size: 10px;
	margin-left: 3px;
}
.food .food-content .price{
	width: 100%;
}
  .food .food-content .price .oddReduce{
	  width: 60px;
	  height: 20px;
	  /* background: red; */
	  display:inline-block;
	  float: right; 
	  overflow: hidden;
	  /* display: none; */
  }
   .food .food-content .price .reduce{
	  display: inline-block;
		width: 20px;
		height: 20px;
		background: blue;
		color: #fff;
		text-align: center;
		line-height: 20px;
		border-radius: 50%;
		float: left;
  }
    .food .food-content .price .num{
	   display: inline-block;
		color: black;
		text-align: center;
		line-height: 20px;
		float:right ;
		margin-right: 10px;
		font-size: 14px;
  }
.food .food-content .price span{
	font-size: 16px;
	color: red;
}
.food .food-content .price .odd{
	display: inline-block;
	width: 20px;
	height: 20px;
	background: blue;
	color: #fff;
	text-align: center;
	line-height: 20px;
	border-radius: 50%;
	float: right;
}

</style>