<template>
 
  <div class="handle" id="shop">
        <shopfenzhi v-if="shopIndex == 0"></shopfenzhi>
        <shopfenzhi1 v-if="shopIndex == 1"></shopfenzhi1>
        <shopfenzhi2 v-if="shopIndex == 2"></shopfenzhi2>
        <shopfenzhi3 v-if="shopIndex == 3"></shopfenzhi3>
        <ul class="shoplist">
          <li v-for="(item,index) in shopList" 
          @click="btnshopIndex(index)" 
          :class="{shopactive:index == shopIndex }">
                {{item.title}}
          </li>
        </ul>
  </div>
  
</template>
<script>
import Shopfenzhi from "../fenzhi/shopfenzi"
import Shopfenzhi1 from "../fenzhi/shopfenzi1"
import Shopfenzhi2 from "../fenzhi/shopfenzi2"
import Shopfenzhi3 from "../fenzhi/shopfenzi3"
  export default{
      data(){
          return {
               shopList:[
                  {title:"商家列表"},
                  {title:"商家增加"},
                  {title:"商家删除"},
                  {title:"商家修改"}
               ],
               shopIndex:0
          }
      },
      components:{
        shopfenzhi :Shopfenzhi,
        shopfenzhi1 :Shopfenzhi1,
        shopfenzhi2 :Shopfenzhi2,
        shopfenzhi3 :Shopfenzhi3
      },
      methods:{
          btnshopIndex(index){
            this.shopIndex = index
          }
      }
  }
    
</script>
<style>
  #shop{
      background: blueviolet;
  }
     .shoplist{
    width: 25.1%;
    height:100%;
  }
  .shoplist li{
     color: black;
     font-size: 14px;
     height: 60px;
     border: 2px solid black;
     text-align: center;
     line-height: 60px;
     border-top:none; 
      border-right:none; 
  }
  .shoplist li.shopactive{
    background: #666;
    color:#fff;
  }
  .hand-fenzhi{
    height: 100%;
    position: absolute;
    left:25.1%;
    top: 0;
    right: 0;
    border: 2px solid #000;
    border-top:none;

  }
</style>