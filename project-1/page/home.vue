<template>
 
  <div class="handle" id="home">

       <ul class="homelist">
          <li v-for="(item,index) in homeList" 
          @click="btnhomeIndex(index)" 
          :class="{homeactive:index == homeIndex }">
                {{item.title}}
          </li>
        </ul>
      
  </div>
  
</template>
<script>
 export default{
      data(){
          return {
               homeList:[
                  {title:"QQ"},
                  {title:"百度"},
                  {title:"新浪"},
                  {title:"支付宝"},
                  {title:"github"},
                  {title:"gulp"},
                  {title:"svn"},
                  {title:"express"},
               ],
               homeIndex:0
          }
      },
    
      methods:{
          btnhomeIndex(index){
            this.homeIndex = index
          }
      }
  }
    

    
</script>
<style>
  #home{
      background: pink;
  }
  
     .homelist{
    width: 25.2%;
    height:100%;
  }
  .homelist li{
     color: black;
     font-size: 14px;
     height: 60px;
     border: 2px solid black;
     text-align: center;
     line-height: 60px;
     border-top:none; 
      /* border-right:none;  */
  }
  .homelist li.homeactive{
    background: #666;
    color:#fff;
  }

</style>
