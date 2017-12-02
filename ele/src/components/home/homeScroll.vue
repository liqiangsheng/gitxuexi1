<template>
    <div class="scroll">
          <div class="img"><img src="/static/iamges/1.webp"></div>
          <div class="scroll-center">
              <div class="scroll-centerLeft">
                  <h2>限量抢购</h2>
                  <p>超值美味 9.9元起</p>
                   <p><span class="span2">996人</span>正在抢</p>
                  <img src="/static/iamges/2.webp"/>
              </div>
              <div class="scroll-centerRight">
                  <h2>热卖套餐</h2>
                  <p>销量最高，好评最多</p>
                   <p>TOP　100></p>
                   <img src="/static/iamges/3.webp"/>
              </div>
              
          </div>
          <div class="scroll-foot">
              <div class="scroll-footLeft">
                  <h2>天天特价</h2>
                  <p>低至1折</p>
                  
                   <img src="/static/iamges/4.webp"/>
              </div>
              <div class="scroll-footCenter">
                  <h2>乐享鲜果</h2>
                  <p>鲜果乐享7折</p>
                   <img src="/static/iamges/5.webp"/>
              </div>
              <div class="scroll-footRight">
                  <h2>品质优选</h2>
                  <p>尖货来袭</p>
                   
                   <img src="/static/iamges/6.webp"/>
              </div>
             
          </div>
    </div>
  
</template>
<script>
export default {
  
}
</script>
<style>
  .scroll{
      width: 100%;
      
  }
  .scroll .img {
      width: 94%;
      height: 80px;
      margin-left: 3%;
  }
   .scroll .img img{
      width: 100%;
      height: 80px;
     
  }
  .scroll .scroll-center{
      width: 90%;
       display: flex;
      height: 200px;
      margin-left: 5%;
      /* background: red; */
  }
.scroll .scroll-center div{
    flex:1;
}

.scroll .scroll-foot{
      width: 90%;
       display: flex;
      height: 140px;
      margin-left: 5%;
}
.scroll .scroll-foot div{
    flex:1;
}
.scroll .scroll-foot img{
     width: 100px;
     height: 100px;
 }
.scroll .scroll-center .scroll-centerLeft h2{
   font-size:16px;
   font-weight: 900;
   color:red;
}
.scroll .scroll-center .scroll-centerLeft,.scroll-centerRight p:nth-child(2){
    font-size: 12px;
    color: #ccc;
}
.scroll .scroll-center .scroll-centerLeft p:nth-child(3){
    font-size: 14px;
}
.scroll .scroll-center .scroll-centerLeft p:nth-child(3) span{
    color: red;
}
.scroll .scroll-center .scroll-centerLeft img{
    position: absolute;
      width: 45%;
      height: 140px;
      left: 10px;

}
.scroll .scroll-center .scroll-centerRight img{
    position: absolute;
      width: 45%;
      height: 140px;
      right: 10px;

}
.scroll .scroll-center .scroll-centerRight h2{
    font-size:16px;
    font-weight: 900;
}
.scroll .scroll-center .scroll-centerRight p:nth-child(3){
    color:darkkhaki;
}

.scroll .scroll-foot  h2{
    text-align: center;
    font-size: 16px;
}
.scroll .scroll-foot  p{
    text-align: center;
    font-size: 14px;
}
.scroll .scroll-foot .scroll-footLeft p{
    color: red;
} 
</style>