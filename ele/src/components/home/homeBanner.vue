<template>
    <div class="banner">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="list in bannerList">
                 <ul class="banner-list">
                    <li class="banner-item" v-for="item in list">
                        <img :src="handleUrl(item.imagePath)"/>
                        <p>{{item.name}}</p>
                    </li>
        	   </ul>
            </div>
        </div>
    </div>
  
</template>
<script>
import {mapState} from "vuex"
import {getHomeBanner} from "../../services/home/homeServices.js"
import {handleUrl} from "../../common/conmon.js"
let  bannerSwiper = null;
export default {
    data(){
        return {
            bannerList : []
        }
    },
    //计算属性里面写 传来的值 经度纬度把全局数据变为自己的数据
    computed: mapState(["latitude","longitude"]),

    methods:{
        // 全局数据变为自己的组件
        handleUrl,
        //发送请求的得到数据
        getData(){
            getHomeBanner(this.latitude,this.longitude).then(result=>{
                // console.log(result)
                // console.log(result[0].name)
                this.bannerList = result;

            })
        }
    },
    created(){
        this.$event.$on("init-data",()=>{
            //有了经纬度，可以请求banner数据
             this.getData();
        });
        
    },
    	mounted(){
		//创建轮播图
		bannerSwiper = new Swiper('.banner', {
//			loop: true
		});
    },
    updated(){
		//更新轮播图
		bannerSwiper.update();
	}
  
}
</script>
<style>
.banner{
      width: 100%;
  }
.banner-list{
	width: 100%;
    padding: 5px;
	overflow: hidden;
}
.banner-item{
	width: 20%;
	float: left;
    margin:5px 7px; 
}
.banner-item img{
	width: 100%;
}
.banner-item p{
	width: 100%;
	text-align: center;
    color: #666;
    font-size: 12px;

}
</style>