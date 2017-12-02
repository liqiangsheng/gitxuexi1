<template>
<transition name="fade">
      <div class="page" id="search">
          <div class="searchHeader one-bottom-px">
            <span @click="shangback()">〈</span>
            <input type="search" placeholder="输入商家、商品名称 " v-model="searchVal">
            <b>搜索</b>
          </div>
          <div class="hotSearch">
            <div class="p">热门搜索
              <ul>
                  <li v-for="hotList in getHotData">
                    {{hotList}}
                  </li>
              </ul>
            </div>
            <ul class="searchList">
              <li v-for="item in searchResult" class="one-bottom-px">
                  {{item}}
              </li>
            </ul>
          </div>

      </div>
  </transition>
</template>
<script>
import {mapState} from "vuex"
import {searchList,getHotWord} from "../../services/home/homeServices.js"
let timer;
export default {
      data(){
        // console.log(searchVal)
        // console.log(searchResult)
         return{
            searchVal:"",
            searchResult:"",
            getHotData:[]
         }
      },
      computed:mapState(["latitude","longitude"]),
   methods:{
        getSearch(){
          // console.log(this.searchVal)
           searchList(this.searchVal,this.latitude,this.longitude)
           .then(result=>{
              // console.log(result)
              if(result){
                 this.searchVal =result.searchName;
                  this.searchResult = result.searchArr;
              }else{
                   this.searchVal="";
                   this.searchResult=["搜索不到商品"]
              }
              
           })
        },
        
        shangback(){
           this.$router.back();
        }
   },
  
  created(){
          this.$watch('searchVal', (newVal)=>{
            if(newVal==""){
             document.querySelector(".searchList").style.display="none";
            }else{
              //当用户在1秒之内没有输入内容之后再发送请求
              clearTimeout(timer);
              timer = setTimeout(()=>{
                this.getSearch();
                document.querySelector(".searchList").style.display="block";
              }, 100);

            }
          
        });

       getHotWord(this.latitude,this.longitude)
       .then((resultA)=>{
            //  console.log(resultA)
            this.getHotData=resultA
            
          })
            
  }
}
</script>
<style>
.fade-enter{
	transform: translateX(100%);
}
.fade-enter-to{
	transform: translateX(0);
}
 .fade-enter-active{
	transition: transform 2s;
}
.fade-leave{
	transform: translateX(0	);
}
.fade-leave-to{
	transform: translateX(100%);
}
 .fade-leave-active{
	transition: transform 2s;
}
#search{
  background: #fff;
}
#search .searchHeader{
  width: 100%;
  height: 50px;
  padding:10px 0px; 
  line-height: 50px;
  position: relative;
}
#search .searchHeader span{
  display: inline-block;
  font-size: 24px;
  color: #666;
  position: absolute;
  top:14px;
}
#search .searchHeader input{
  width: 65%;
  height: 30px;
  margin-left: 12%;
  background: #ccc;
  border: none;
  border-radius:3px; 
}
#search .searchHeader b{
  display: inline-block;
  font-size: 26px;
   position: absolute;
   top:13px;
   right: 10px;
}
#search .hotSearch{
  width: 100%;
  position: absolute;
  top: 71px;
  bottom: 0;
  left: 0;
}
#search .hotSearch .p{
  width: 100%;
  
}
#search .hotSearch .p ul li{
  
   padding: 0 10px;
   height: 30px;
   border: 1px solid #666;
   float: left;
   margin:1%;  
   line-height: 30px;
   text-align: center;
   border-radius:3px; 
   font-size: 16px;

}
#search .hotSearch .searchList{
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: none;
  overflow: auto;
}
#search .hotSearch .searchList li{
  widows: 100%;
  height: 50px;
  background:#ccc;
  font-size: 16px;
  line-height: 50px;
}
#search .hotSearch .searchList.router-link-active li{
  background: #fff;
}
</style>
