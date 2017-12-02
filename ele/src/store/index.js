import Vue from "vue"
import Vuex from "vuex"


//使用vuex
Vue.use(Vuex)
// 引购物车
import cartModule from "./cart.js"
import center from "../common/notificationCenter.js"
//console.log(center.$emit)
// 页面公用的经度纬度 初始值
const state = {
    //经度
    longitude : null,
    //纬度
    latitude : null,
    
};
// 修改state的值
const mutations = {
    initLocation(state,params){
        state.longitude = params.lon;
        state.latitude  =  params.lat;
      
     }
};

const actions = {
    getLocation(stroe){
         //异步执行地理定位
         setTimeout(()=>{
             let lon = 114.059563;
             let lat = 22.54286;
          

             stroe.commit("initLocation",{
                lon,
                lat,
               
            });
            // console.log("ddd")
            //通知组件去根据经纬度请求数据
            center.$emit("init-data")
            
         },200)
    },
    //app修改地址
    changeLocation(store,params){
        store.commit("initLocation",params);
        //通知组件去根据经纬度重新请求数据
        center.$emit("init-data")
    }
}

// console.log(cartModule);

export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules:{
        cart:cartModule
    }
})