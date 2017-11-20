<template>
 
  <div class="handle" id="buy">
    <buyfenzhi v-if="buyIndex==0"></buyfenzhi>
    <buyfenzhi1 v-if="buyIndex==1"></buyfenzhi1>
    <buyfenzhi2 v-if="buyIndex==2"></buyfenzhi2>
    <buyfenzhi3 v-if="buyIndex==3"></buyfenzhi3>
      <ul class="buylist">
          <li v-for="(item,index) in buyList" 
          @click="btnbuyIndex(index)" 
          :class="{buyactive:index == buyIndex }">
               {{item.title}}
          </li>

      </ul>

      
  </div>
  
</template>
<script>
import Buyfenzhi from "../fenzhi/buyfenzi"
import Buyfenzhi1 from "../fenzhi/buyfenzi1"
import Buyfenzhi2 from "../fenzhi/buyfenzi2"
import Buyfenzhi3 from "../fenzhi/buyfenzi3"
  export default{
      data(){
          return {
               buyList:[
                  {title:"商品列表"},
                  {title:"商品增加"},
                  {title:"商品删除"},
                  {title:"商品修改"}
               ],
               buyIndex:0
          }
      },
      methods:{
            btnbuyIndex(index){
              this.buyIndex = index;
            }
      },
      components:{
        buyfenzhi :Buyfenzhi,
        buyfenzhi1 :Buyfenzhi1,
        buyfenzhi2 :Buyfenzhi2,
        buyfenzhi3 :Buyfenzhi3
      }
  }
    
</script>
<style>
  #buy{
      background: blue;
  }
  .buylist{
    width: 25.1%;
    height:100%;
  }
  .buylist li{
     color: black;
     font-size: 14px;
     height: 60px;
     border: 2px solid black;
     text-align: center;
     line-height: 60px;
     border-top:none; 
      border-right:none; 
  }
  .buylist li.buyactive{
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