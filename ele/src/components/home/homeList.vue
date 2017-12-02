<template>
<div>
   <div class="tuijian">-----商家推荐-----</div>
   <ul class="list">
         <li class="item one-bottom-px" v-for="listItem in listData">
            <div class="item-image">
              <img :src="handleUrl(listItem.image_path)" />
            </div>
            <div class="item-content">
                <h3 class="item-contentName" 
                @click="toDetail(listItem)">{{listItem.name}}</h3>
                <p class="item-contentNum">月销售{{listItem.recent_order_num}}单</p>
                <p class="item-contentTips">￥0起送　|　{{listItem.tips}}   <span class="item-contentDistance">{{listItem.distance}}m|{{listItem.order_lead_time}}分钟</span></p>
              
                <p class="item-contentReason">"{{listItem.reason}}"</p>
                <div class="activities-info one-top-px">
                    <ul class="activities">
                        <li v-for="(activity, index) in listItem.activities" 
                            v-if="index<=1 || listItem.isexpend">
                            <span :style="{background: '#'+activity.icon_color}">
                              {{activity.icon_name}}
                            </span>
                            {{activity.description}}
                        </li>
                      </ul>

                     <!-- // 展开活动 -->
                    <div class="btn" v-if="listItem.activities.length>0"
                        @click="activityActon(listItem)">
                        {{listItem.activities.length}}个活动<span class="btnLength"></span>
                    </div>
                </div>
              
            </div>
          </li>
        
   </ul>
</div>   
</template>
<script>
import {mapState} from "vuex" 
import {getHomeList} from "../../services/home/homeServices"
 import {handleUrl} from "../../common/conmon.js"
export default {
  data(){
     return {
          offset:0,
          limit:20,
          listData:[]
     }
  },
  //  把共有数据私有
  computed:mapState(["latitude","longitude"]),
  methods:{
        // 把工用的转自己用
       handleUrl,
        getData(){
           getHomeList(this.latitude,this.longitude,this.offset,this.limit)
           .then(result=>{
              // console.log(result)
              //现在的拼接加载来的数据
              this.listData = this.listData.concat(result);
              //关闭父组件加载更多
              if(this.bottomRefreshCallback){
                  this.bottomRefreshCallback();
              }
              this.$emit("refreshContent")
           })
        },
        	//展开活动的点击事件
        activityActon(listItem){
          //  listItem.isexpend为flase 取反就为真true
          listItem.isexpend =!listItem.isexpend 
        },
        //进入商家详情页
        toDetail(listItem){
           this.$router.push("/home/seller-detail/"+listItem.id)
        }
        

  },
  created(){
    //请求列表数据 监听init-data
    this.$event.$on("init-data",()=>{
       this.getData()
    });
    //请求更多列表数据
    this.$event.$on("bottomRefresh-list",(callback)=>{
          this.getData();
          this.bottomRefreshCallback=callback;
    });
   
  }
  
}
</script>
<style>
.tuijian{
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color:#999;
  
}
.list{
	width: 100%;
}
.list .item{
	display: flex;
	padding: 6px;
}
.item .item-image{
	width: 60px;
	height: 60px;
}
.item .item-image img{
	width: 100%;
}
.item .item-content{
	flex: 1;
  
}

.item .item-content .activities{
	color: #999;
	font-size: 12px;
  padding: 10px 0;
}
.item .item-content .activities span{
	color: #fff;
	border-radius: 2px;
	font-size: 12px;
	padding: 2px;
}
.item .item-content .activities li{
	margin-bottom: 10px;
}
.item .item-content .activities-info{
	position: relative;
}
.item .item-content .activities-info .btn{
	position: absolute;
	top: 2px;
	right: 2px;
   margin-top: 3px;
   font-size: 12px;
   color: #999;
}
  .item .item-content .activities-info .btn .btnLength{
    display: inline-block;
    width:0;
    height: 0;
    border-left:7px solid transparent ; 
    border-right:7px solid transparent ; 
    border-top:7px solid #999 ; 
    border-botto:0px ; 
  }
 .item .item-content .item-contentName{
  font-size:14px;
  font-weight: 900;
}
 .item .item-content  .item-contentNum,.item-contentTips{
   font-size:12px;
  
  
 }
 .item .item-content .item-contentNum{
      margin-left:40%;  
      width: 50%;
 }
 .item .item-content .item-contentTips{
   width: 100%;
   margin: 3px 0;
 }
  .item .item-content .item-contentTips .item-contentDistance{
    float: right;
    color: #999;
  }
 .item .item-content .item-contentReason{
   width: 100%;
   margin-bottom:3px;
   color: red;
 }
</style>