import center from "../common/notificationCenter.js"
const state = {
    //购物车数据
   list:[
        //商家数据
       {
            //  商家id
           sellerId:null,
           //这是用户添加商家的商品到购物车的数据
               goods:
               [
                    // 每个商家的多样东西
                    {
                        //商品id 名字  图片   规格  数量
                         name:null,
                         image:null,
                         item_id:null,
                         specification:"",
                         attr:"",
                         count:0

                    }
               ]
       }
   ]
  
}

// 修改state的值
const mutations = {
    addGoods(store,params){
                 
                console.log(store)
                //查找这个商家有没有商品添加到购物车
                let isExist = false;
                store.state.list.map((seller)=>{
                    if(seller.sellerId==params.sellerId){
                        //该商家已经有商品添加到购物车了
                        let isExist = true;
                        //将商品添加到商家对应的goods字段中去
                        //判断这个商品有没有添加购物车
                        let isFoodExist = false;
                        seller.goods.map((good)=>{
                        if(good.item_id == params.item_id 
                            && good.specification == params.specification
                            && good.attr == params.attr){
                                //有，那么数量叠加
                                good.count += params.count;
        
                                isFoodExist = true;
                            }
                        })
                        if(!isFoodExist){
                            //没有，那么将商品数据push进入goods字段中去
                            seller.goods.push({
                                name: params.foodname,
                                image: params.foodImg,
                                item_id: params.item_id,
                                specification: params.specification,
                                attr: params.attr,
                                count: params.count,
                                
                            })
                        }
                    }
                })
                if(!isExist){
                    //该商家从来没有商品添加到购物车
                    //将这个商家的商家数据以及商品数据push到state的list中去
                    //1创建商家数据
                    // console.log(params)
                    let newSeller ={
                        sellerId: params.sellerId,
                        goods: []
                    }
                   // console.log(newSeller)
                    //2将商品数据添加到goods中
                    newSeller.goods.push({
                        name: params.foodname,
                        image: params.foodImg,
                        item_id: params.item_id,
                        specification: params.specification,
                        attr: params.attr,
                        count: params.count,
                        
                    })
                    store.state.list.push(newSeller);
                }
            }
}


const actions={
   getCart(stroe){
       stroe.commit("addGoods",{
           sellerId:this.sellerId,
           goods:this.goods
       })
       center.$emit("addGoods",{})

   }
    
}

export default{
    namespaced:true,
    state,
    actions,
    mutations
    
}