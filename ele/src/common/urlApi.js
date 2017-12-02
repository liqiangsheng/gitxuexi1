//处理路径  各个路径的不同之处
export default {
    /*
	 获得地址
	 参数：
	 	latitude   纬度
	 	longitude  经度
      */
      locationUrl :"/bgs/poi/reverse_geo_coding",


      /*
	 获得天气
	 参数：
	 	latitude   纬度
	 	longitude  经度
      */
      weatherUrl :"/bgs/weather/current",



      /*
	 获得热门搜索词汇
	 参数：
	 	latitude   纬度
	 	longitude  经度
      */
	  hotWordUrl: '/shopping/v3/hot_search_words',
	  /*
	 搜索得到地址列表
	 参数：
	 	?keyword=搜索关键字
		&offset=0&limit=20 请求的长度以及位置
		&longitude=114.059563&latitude=22.54286 经纬度
	 * */
	locationListUrl:'/bgs/poi/search_poi_nearby',
	/*
	 首页轮播图
	 latitude=22.534607&longitude=113.972976 经度纬度
	 &templates[]=main_template
	 * */
	bannerUrl: '/shopping/v2/entries',
		/*
	 首页商家列表数据
	 ?latitude=22.54286&longitude=114.059563
	 &offset=20&limit=20
	 &extras[]=activities&extras[]=tags&extra_filters=home
	 &terminal=h5
	 * */
	homeListUrl: '/shopping/restaurants',
 /**
  * 商家，商品搜索
  搜索商家商品
  https://restapi.ele.me/shopping/v1/typeahead?kw=%E7%B2%A5&latitude=22.534607&longitude=113.972976		

https://restapi.ele.me
/shopping/v1/typeahead
?kw=%E7%B2%A5&latitude=22.534607&longitude=113.972976

参数：
	 	latitude   纬度
		 longitude  经度
		 kw    关键字
      */
  
   searchUrl:'/shopping/v1/typeahead',

/*
商家详情
店铺
https://restapi.ele.me
/shopping/restaurant/150997101
?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=22.54286&longitude=114.059563


买家评论
https://restapi.ele.me
/ugc/v3/restaurants/150997101/ratings
?has_content=true&offset=0&limit=10

商家全部
https://restapi.ele.me
/shopping/v2/menu
?restaurant_id=150997101
*/
/*
参数：
id 商家id
*/
   sellerMenuUrl: '/shopping/v2/menu',

/*
商家全部 头部
https://restapi.ele.me
/shopping/restaurant/157069791?
extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=22.534607&longitude=113.972976		
	
*/
  sellerMenuUrlHeader:"/shopping/restaurant",

//   用户评价		
//   https://restapi.ele.me
//   /ugc/v3/restaurants/
//    773621/ratings?has_content=true&offset=0&limit=10
// 参数id
  sellerRating:"/ugc/v3/restaurants/",

//   全部 满意 不满意 有图
//   https://restapi.ele.me
//   /ugc/v2/restaurants/
//   773621/ratings/tags
// 参数id

// 全部 满意 不满意 有图
 sellerRatingV:"/ugc/v2/restaurants/",
//综合评价
//  https://restapi.ele.me
// /ugc/v2/restaurants/
// 773621/ratings/scores
sellerScores:"/ugc/v2/restaurants/"
}	