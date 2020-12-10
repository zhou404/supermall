import Vue from "vue";
import Vuex from 'vuex';

// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: []     //用数组对购物车商品进行保存，结构：[{商品01},{商品02},{商品03}]
  },
  mutations: {
    addCart(state, payload) {
      state.cartList.push(payload)
    }
  }
})

// 3.挂载Vue实例上
export default  store
