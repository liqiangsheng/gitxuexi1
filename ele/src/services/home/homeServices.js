//首页的 服务 请求 axios
// 引aiox
import axios from "axios"

import Url_Api from "../../common/urlApi"

//请求地址
export function getLocation(lat,lon){
    // ES6依赖请求。resolve成功  reject失败
    return new Promise((resolve,reject)=>{
        // `{}`模板字符串解析
         axios.get(`${Url_Api.locationUrl}?latitude=${lat}&longitude=${lon}`)
         
         .then((response)=>{
            // console.log(response);
             const  locationName =response.data.name;
             resolve(locationName)
         })
    })
} ;



//天气

export function getWeather(lat,lon){
    // ES6依赖请求。resolve成功  reject失败
    return new Promise((resolve,reject)=>{
        // `{}`模板字符串解析
         axios.get(`${Url_Api.weatherUrl}?latitude=${lat}&longitude=${lon}`)
         .then((response)=>{
            // console.log(response);
            resolve(response.data)
         })
    })
} ;


//热门搜索词汇
export function getHotWord(lat,lon){
    // ES6依赖请求。resolve成功  reject失败
    return new Promise((resolve,reject)=>{
        // `{}`模板字符串解析
         axios.get(`${Url_Api.hotWordUrl}?latitude=${lat}&longitude=${lon}`)
         .then((response)=>{
            // console.log(response);
             let words = response.data.map(item=>{
                 return item.word
             })
             resolve(words)
         })
    })
} ;
//地址搜索
export function getLocationList(keyword,lat,lon){
           return new Promise((resolve,reject)=>{
               axios.get(`${Url_Api.locationListUrl}?keyword=${keyword}&offset=0&limit=20&longitude=${lon}&latitude=${lat}`)
               .then(response=>{
                // console.log(response) 
                 let newData = response.data.map((item)=>{
                     let newItem= {};
                     newItem.name = item.name;
                     newItem.address = item.address; 
                     newItem.latitude = item.latitude;
                     newItem.longitude = item.longitude;
                     return newItem;
                 })
                      resolve(newData)
               })
           })
};
//请求轮播图数据
 export function getHomeBanner(lat,lon){
        return new Promise((resolve,reject)=>{
             axios.get(`${Url_Api.bannerUrl}?latitude=${lat}&longitude=${lon}&templates[]=main_template`)
             .then(response=>{
                //  console.log(response)
                 let newData = response.data[0].entries.map((item)=>{
                     return {
                         name : item.name,
                         imagePath:item.image_hash
                     }
                 })
                //  resolve(newData);
                let newArr = [];
                //如果 数据的长度大于0；
                while(newData.length>0){
                    // 那么数组进行分割
                    let arr =newData.splice(0,8);
                    // console.log(arr)
                    newArr.push(arr)
                    // console.log(newArr)
                }
                 resolve(newArr);
             })
        })
 };
 //请求商家列表数据
  export function getHomeList(lat,lon,offset,limit){
       return new Promise((resolve,reject)=>{
           axios.get(`${Url_Api.homeListUrl}?latitude=${lat}&longitude=${lon}&offset=${offset}&limit=${limit}&extras[]=activities&extras[]=tags&extra_filters=home
           &terminal=h5`).then((response)=>{
            //    console.log(response)
              let newData  = response.data.map(item=>{
                  let  newItem ={};
                  //id
                  newItem.id = item.id;
                  //图片
                  newItem.image_path = item.image_path;
                //   名称
                  newItem.name = item.name;
                //   活动
                  newItem.activities = item.activities;
                //   配送费
                  newItem.tips = item.piecewise_agent_fee.tips;
                //   评分
                  newItem.rating = item.rating;
                //   月卖
                  newItem.recent_order_num = item.recent_order_num;
                //   "口碑人气好店"
                  newItem.reason = item.recommend.reason;
                //   距离
                  newItem.distance = item.distance;
                    //配送时间
                  newItem.order_lead_time = item.order_lead_time

               
                  //使用变量记录item的展开状态
				 newItem.isexpend = false;
                 return newItem
              })
              resolve(newData)
           })
       })
  };
//  piecewise_agent_fee.tips 配送费
//rating 评分
//recent_order_num 月卖
//recommend.reason "口碑人气好店"
//distance距离

// order_lead_time配送时间

//商家，商品搜索，
export function searchList(keyword,lat,lon){
    // console.log(keyword)
    // console.log(`${Url_Api.searchUrl}?latitude=${lat}&longitude=${lon}`)
     return new Promise((resolve,reject)=>{
         axios.get(`${Url_Api.searchUrl}?kw=${keyword}&latitude=${lat}&longitude=${lon}`)
        //  axios.get(`${URL_API.locationUrl}?latitude=${lat}&longitude=${lon}`)
         .then(response=>{
            //  console.log(response.data.search_word)
            //  console.log(response.data.words)
            //  console.log(response.data.restaurants.search_word)
            let searchData ={}
            searchData.searchName = response.data.search_word;
            searchData.searchArr = response.data.words;

            resolve(searchData)
            // console.log(searchData.searchNam)
         })
        
     })
};
//这是商家详情
export function getSellerMenu(id){
    return new Promise((resolve,resject)=>{
      axios.get(`${Url_Api.sellerMenuUrl}?restaurant_id=${id}`)
      .then(response=>{
        //   console.log(response.data) 
          let menu = response.data.map(menuItem=>{
              let newItem= {};
              //类别
              newItem.name = menuItem.name
              //类别简介
              newItem.description = menuItem.description;
            //   类别图片 grey_icon_url
              newItem.icon_url = menuItem.icon_url;
              //实物
              newItem.foods  = menuItem.foods.map(food=>{
                let newFood = {}
                //食物名字
                newFood.name = food .name;
                // 食物图片
                newFood.image_path = food.image_path;
                //评价月销售
                newFood.tips = food.tips;
                //食物广告
                newFood.description =food.description;
                //食物Id
                newFood.item_id=food.item_id;
                //评价分
                newFood.rating = food.rating;
                //价格
                newFood.specifications = food.specifications;
                newFood.attrs = food.attrs;
                newFood.count = 0;
                newFood.price = food.specfoods.map(priceItem=>{
                    return priceItem.price;
                })
                
                return newFood;
              })
              return newItem

          })
        //   console.log(menu)
        resolve(menu)

      })
    })
}
// 商家全部 头部
export function sellerMenuUrlHeader(id,lat,lon){
    return new Promise((resolve,resject)=>{
       axios.get(`${Url_Api.sellerMenuUrlHeader}/${id}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=${lat}&longitude=${lon}`) 
       .then(response=>{
        //    console.log(response.data)

           
                
                let sellerMenuUrlHeaderItem={}
                // 综合评价
                sellerMenuUrlHeaderItem.rating =response.data.rating
                //"配送费¥5"
                sellerMenuUrlHeaderItem.piecewise_agent_fee=response.data.piecewise_agent_fee.tips
                // "深圳市福田区莲花街道中心区26-3中国凤凰大厦3栋102"
                sellerMenuUrlHeaderItem.address=response.data.address
                // "吉野家（凤凰大厦店）"
                sellerMenuUrlHeaderItem.name = response.data.name;
                // "85139853da509325ab060a0afff465dapng"
                sellerMenuUrlHeaderItem.image_path =response.data.image_path;
                // "欢迎订购吉野家，百年品质，始终如一。"
                sellerMenuUrlHeaderItem.promotion_info=response.data.promotion_info;
                sellerMenuUrlHeaderItem.activities=response.data.activities.map(activitiesItem=>{
                    let sellerMenuUrlItem = {};
                    // "新用户立减(不与其他活动共享)"
                    sellerMenuUrlItem.name =activitiesItem.name;
                    //"新用户下单立减17元(不与其它活动同享)"
                    sellerMenuUrlItem.tips =activitiesItem.tips;
                    sellerMenuUrlItem.icon_color=activitiesItem.icon_color;
                    // "首"
                    sellerMenuUrlItem.icon_name =activitiesItem.icon_name;
                    sellerMenuUrlItem.isexpend =false;
                    return sellerMenuUrlItem
                })
                resolve(sellerMenuUrlHeaderItem)
            // console.log(sellerMenuUrlHeaderItem)
           })
        
       
    })
}

//   用户评价	

export function sellerRating(id,offset,limit){
    return new Promise((resolve,resject)=>{
       axios.get(`${Url_Api.sellerRating}${id}/ratings?has_content=true&offset=${offset}&limit=${limit}`)
       .then(response=>{
        // console.log(response)
           let Rating=response.data.map(itemRatin=>{
                //    日期rated_at
                let newRating ={}
                newRating.rated_at=itemRatin.rated_at;
                //    匿名用户username
                newRating.username =itemRatin.username;
                 //  评级   rating
                newRating.rating=itemRatin.rating;
                // "干净卫生" 
                newRating.tags = itemRatin.tags;
                // 评价的商品图片和买了什么 （数组）
                newRating.order_images=itemRatin.order_images
                return (newRating)
           })
       
          resolve(Rating)
       })
    })
} 
// 全部 满意 不满意 有图
export function sellerRatingV(id){
   return new Promise((resolve,resject)=>{
    axios.get(`${Url_Api.sellerRatingV}${id}/ratings/tags`).then(response=>{
        // console.log(response)
        let newRatingV = response.data.map(item=>{
            let RatingV ={}
            RatingV.count = item.count;
            RatingV.name  = item.name;
            return RatingV;
        })
        resolve(newRatingV)
    })
   })
}

//综合评价
export function sellerScores(id){
    return new Promise((resolve,resject)=>{
        axios.get(`${Url_Api.sellerScores}${id}/ratings/scores`).then(response=>{
            // console.log(response.data)
            
            let newScores = {}
            // 送餐时间
            newScores.deliver_time=response.data.deliver_time;
            // 食物评价
            newScores.food_score=response.data.food_score;
            // 高于评价
            newScores.order_rating_amount=response.data.order_rating_amount;
            // 综合评价
            newScores.overall_score=response.data.overall_score;
            // 服务评价
            newScores.service_score=response.data.service_score;
            resolve(newScores)
        })
    })
}