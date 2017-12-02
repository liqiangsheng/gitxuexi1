<template>
<transition name="location">
    <div class="page subpage" id="locationA">
         <div class="locationA-hander one-bottom-px">
              <span @click="callback()">〈</span>
             <b>请选择收货地址</b>
         </div>
         <div class="locationA-list">
                <div>
                    <input type="search" placeholder="请输入地址" v-model="inputVal">
                    <ul class="result-list">
                        <li v-for="item in result" class="one-bottom-px" @click="changeLocation(item)">
                            <h3>{{item.name}}</h3>
                            <p>{{item.address}}</p>
                        </li>
                    </ul>
                </div>
        </div>
    </div>
    </transition>
</template>
<script>
import {mapState} from "vuex"
import {getLocationList} from "../../services/home/homeServices.js"
let timer = null;
let locationAiscoll;
export default {
   data(){
       return {
           inputVal:"",
           result:[]
       }
   },
   //计算属性里面写 传来的值 经度纬度把全局数据变为自己的数据
   computed:mapState(["latitude","longitude"]),
   methods:{
      //请求地址列表
         requestData(){
             getLocationList(this.inputVal,this.latitude,this.longitude)
             .then((result)=>{
                //  console.log(result)
                   this.result = result;
             })
         },
         //还回
         callback(){
              this.$router.back();
         },

      //选择地址的点击事件
      changeLocation(item){
          //将数据告诉store
               this.$store.dispatch("changeLocation",{
                   //把定位回首页
                    lat:item.latitude,
                    lon:item.longitude
               })
                //返回上一页
             this.$router.back();
      }

     
   },
   created(){
       //监听用户输入的值
       this.$watch("inputVal",(newVal)=>{
           //当用户在1秒之内没有输入内容之后再发送请求
          //监听时先清空
          clearTimeout(timer)
          timer=setTimeout(()=>{
            //   console.log('发送请求出去');
              this.requestData();
          },1000)
       })
   },
   mounted(){
       //滚动视图
         locationAiscoll = new IScroll(".locationA-list",{

       })
   },
   updated(){
       //刷新数据
       locationAiscoll.refresh()
   }
}
</script>
<style>
.location-enter{
    transform: scaleX(0)
}
.location-enter-to{
    transform: scaleX(360deg)
}
.location-enter-active{
    transition: all 2S;
}
.location-leave{
    transform: scaleX(360deg)
}
.location-leave-to{
    transform: scaleX(0)
}
.location-leave-active{
    transition: all 2S;
}
  #locationA {
      background: #fff; 
  }
  #locationA .locationA-hander{
      width: 100%;
      height: 40px;
      position: relative;
      background: darkturquoise;
      text-align: center;
      line-height: 40px;
       color: #fff;
  }
  #locationA .locationA-hander span{
      position: absolute;
      left: 10px; 
  }
  #locationA .locationA-list{
      width: 100%;
      position: absolute;
      top: 41px;
      left: 0;
      bottom: 0;
      overflow: hidden;
  }
   
  #locationA .locationA-list input{
      width: 90%;
      margin-left: 5%;
      background: #efefef;
      border: none;
      height: 20px;
  }
  #locationA .locationA-list input{
      width: 90%;
      margin-left: 5%;
      background: #efefef;
      border: none;
      height: 20px;
  }
  #locationA .locationA-list .result-list{
      width: 90%;
      margin-left: 5%;
  }
  
</style>
