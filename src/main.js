import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 修复刷新数据之后，Scroll插件高度错误导致页面不可完整上滑问题
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
