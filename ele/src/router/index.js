import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
import Home from "../pages/homePage/home.vue"
import Discover from "../pages/discoverPage/discover.vue"
import Order from "../pages/orderPage/order.vue"
import Me from "../pages/mePage/me.vue"
// 引HomeHeader里面的子文件
import LocationA from "../pages/homePage/locationA.vue"
import Search from "../pages/homePage/search.vue"
import SearchResult from "../pages/homePage/searchResult.vue"
import SellerDetail from "../pages/homePage/sellerDetail.vue";


export default new Router({
  routes: [
			  {
			      path: '/home',
						component: Home,
						children:[
							{
								path:"location",
								component : LocationA
							},
							{
								path:"search",
								component: Search
							},
							{
								path:"search/:keyword",
								component : SearchResult
							},
							{
								path: 'seller-detail/:id',
								component: SellerDetail
							}
						]
			   },
			   
			   {
			      path: '/discover',
			      component: Discover
			   },
			   
			   {
			      path: '/order',
			      component: Order
			    },
			    
			    {
			      path: '/me',
			      component: Me
			    },
			    
			    {
			      path: '*',
			      redirect: "/home"
			    }
  ]
})
