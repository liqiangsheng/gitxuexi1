<template>
    <header class="head  one-bottom-px">
            <div class="info">
                <p class="location">
                    <router-link to="/home/location">
                        {{locationName+"..."}}
                    </router-link>
                </p>
                <div class="weather">
                    <span class="span">{{weatherInfo.temperature}}°</span></br>
                    <span class="span1">{{weatherInfo.description}}</span>
                    <img :src="handleUrl(weatherInfo.image_hash)"/> 
                </div>
            </div>
            <div class="search">
                <router-link to="/home/search">
                        搜索商家、商品名称
                    </router-link>
                 
            </div>
            <div  class="hot-word">
                <ul>
                    
                    <li v-for="word in wordArr">{{word}}</li>
                </ul>
            </div>
    </header>
</template>
<script>
import {mapState} from 'vuex'
import {getLocation,getWeather,getHotWord} from "../../services/home/homeServices.js"
import {handleUrl} from "../../common/conmon.js"
import center from "../../common/notificationCenter.js"
// console.log(center.$on)
export default {

   data(){
       return {
            locationName:"",
            weatherInfo: {},
			wordArr: []
       }
   },

  //计算属性里面写 传来的值 经度纬度把全局数据变为自己的数据
  computed:mapState(["longitude","latitude"]),


  methods:{
       handleUrl,
      //封装方法
     
      getData(){
          //转发消息记得去webpack-dev-server里面改httpProxyMiddleware
          /**
           *
           *  app.use("/bgs",httpProxyMiddleware({
                target:"https://restapi.ele.me",
                changeOrigin:true
                })); 
           * 
           * 
           */
        //地址
        // console.log("getData")
        getLocation(this.latitude,this.longitude).then((result)=>{
            // console.log(result)
            this.locationName = result;
        })
          
        //天气
         getWeather(this.latitude, this.longitude).then(result=>{
            //  console.log(result)
				this.weatherInfo = result;
			})

        //热门搜索词汇
        getHotWord(this.latitude, this.longitude).then(result=>{
            // console.log(result)
				this.wordArr = result;
			})
      }
  },
  created(){
       this.$store.dispatch("getLocation");
    //   console.log(this.$event.$on)
      //监听不到东西
         this.$event.$on("init-data",()=>{
        //   console.log('监听到了');
          this.getData();
      });
      //第一次进入app并且定位成功，更换地址时也要执行
     
  }

}
</script>
<style scoped>

  .head{
      width: 100%;
      height: 150px;
      background:mediumturquoise;
  }

  .head .info{
	width: 100%;
	height: 30px;
    margin-bottom:40px;
}
.head .info .location{
	/* float: left; */
    left: 5%;
    transform: translateY(20px);
    font-weight: 900;
    color: #fff;
    position: absolute;
  
}
.head .info .location a{
    color: #fff;
}
.head .info .weather{
	
   /* margin-bottom: 40px; */
   position: relative;
    /* margin: 5%; */
}
.head .info .weather img{
   width: 30px;
   height: 30px;
   position: absolute;
   right: 10px;
   top: 10px;
    
}
.head .info .weather .span1{

   position: absolute;
   font-size: 12px;
   right: 40px;
   top: 30px;
   color: #fff;
   margin-right: 5px;
    
}
.head .info .weather .span{

   position: absolute;
   right: 40px;
   top: 10px;
   font-size: 12px;
   color: #fff;
   margin-right: 5px;
    
}

.head .search{
	width: 90%;
	height: 30px;
	background: #fff;
	margin-left: 5%;
    text-align: center;
    line-height: 30px;

}
.head .hot-word{
    margin-top: 10px;
	width: 90%;
	height: 20px;
    margin-left: 5%;
    overflow: auto;
}
.head .hot-word ul{
    width: 200%;
}
.head .hot-word li{

    display: inline-block;
    margin-right: 20px;
    text-align: center;
    color:#fff;
}

</style>