<template>
 
  <div class="handle" id="sett">
     <setfenzhi v-if="setIndex == 0"></setfenzhi>
     <setfenzhi1 v-if="setIndex == 1"></setfenzhi1>
     <setfenzhi2 v-if="setIndex == 2"></setfenzhi2>
  
        <ul class="setlist">
        <li v-for="(item,index) in setList" 
        @click="btnsetIndex(index)" 
        :class="{setactive:index == setIndex}">
               {{item.title}}
          </li>
        </ul>
     
  </div>
  
</template>
<script>
import Setfenzhi from "../fenzhi/setfenzi"
import Setfenzhi1 from "../fenzhi/setfenzi1"
import Setfenzhi2 from "../fenzhi/setfenzi2"

  export default{
      data(){
          return {
               setList:[
                  {title:"个人信息"},
                  {title:"密码修改"},
                  {title:"详细资料"},
                  
               ],
               setIndex:0
          }
      },
      components:{
        setfenzhi :Setfenzhi,
        setfenzhi1 :Setfenzhi1,
        setfenzhi2 :Setfenzhi2,
        
      },
      methods:{
        btnsetIndex(index){
          this.setIndex = index
        }
      }
  }
    
</script>
<style>
  #sett{
      background: yellow;
  }
   .setlist{
    width: 25.1%;
    height:100%;
  }
  .setlist li{
     color: black;
     font-size: 14px;
     height: 60px;
     border: 2px solid black;
     text-align: center;
     line-height: 60px;
     border-top:none; 
      border-right:none; 
  }
   .setlist li.setactive{
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