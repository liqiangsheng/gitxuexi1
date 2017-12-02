<template>
<transition name="buy">
   <div class="sellerBuy">
        <ul class="buyList">
            <h3>{{foodd.name}}</h3>
            <p>{{sellerBuy.name}}</p>
            <li v-for="(item,index) in sellerBuy.values" 
            :class="{active:index ==itemIndexAB}"
            @click="itemIndexA(index)">{{item}}</li>
            <button @click="button()">确定</button>
        </ul>
   </div>
</transition>
</template>

<script>
    export default{
        props:{
          foodd:Object
        },
      
       data(){
        //    console.log(this.foodd)
          return {
              sellerBuy:{},
              itemIndexAB:0
          }
       },
       created(){
           this.sellerBuy=this.foodd.specifications[0];
        //    console.log(this.sellerBuy)

       },
       methods:{
           itemIndexA(index){
              this.itemIndexAB=index
           },
           button(){
               alert("购买成功")
               this.$event.$emit("closeBuy")
           }
       },
       
       
    }
</script>
<style>
.buy-enter{
    opacity: 0;
}
.buy-enter-to{
    opacity: 1;
}
.buy-enter-active{
    transition: all 2s;
}

.sellerBuy{
    width: 100%;
    position: absolute;
    top: 30px;bottom: 0;
    left: 0;
}
.sellerBuy .buyList{
   width: 100%;
 }
 .sellerBuy .buyList h3{
    width: 100%;
    text-align: center;
    font-size: 14px;
    margin-bottom: 20px;
  
 }
 .sellerBuy .buyList p{
     width:90%;
     padding:5px 5%;
     margin-bottom: 20px;
     
 }
 .sellerBuy .buyList li.active{
     border-color: blue;
     color:blue; 
 }
 .sellerBuy .buyList li{
     margin-left: 5%;
     display: inline-block;
     border: 1px solid #ccc;
     border-radius: 5px;
 }
  .sellerBuy .buyList button{
      position: absolute;
      bottom: 10px;
      left: 5%;
  }
  

</style>
