<template>
  <div id="app">

       
                  
            <ul class="list">
              <li v-for="(item, index) in listAll"
              @click="btn(index)"
              :class="{active:index ==listAllindex}">
                  {{item.title}}
              </li>
              
            </ul>
      
          <home v-if="listAllindex ==0"></home>
          <buy v-if="listAllindex ==1"></buy>
          <shop v-if="listAllindex ==2"></shop>
          <sett v-if="listAllindex ==3"></sett>
           
       
    
  </div>
</template>

<script>
import Home from "../page/home"
import Buy from "../page/buy"
import Shop from "../page/shop"
import Sett from "../page/set"
export default {
 
  data () {
    return {
         listAll:[
           {title : '后台管理'},
           {title : '商品管理'},
           {title : '商家管理'},
           {title : '设置管理'}
         ],
         
           listAllindex: 1
          
          
        
    }
  },
  components:{
     home : Home,
     buy : Buy,
     shop : Shop,
     sett : Sett
  },
  methods:{
    btn(index){
        this.listAllindex = index
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
}

#app .list{
  width:100%;
  height:60px;
  display: flex;
  /* border: 2px solid black; */
}
#app .list li{
  flex: 1;
  line-height: 60px;
  text-align: center;
  border:2px solid black ;
  border-right: none;
  font-size: 20px;
  font-weight: 900;
}
#app .list li.active{
  background: #999;
  color: black;
}
#app .list li:last-child{
   border-right: 2px solid black;
}
.handle{
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 60px;
  /* border: 1px solid #000; */
}


</style>
