import Vue from 'vue'
import App from './login.vue'
// import router from '../../router'
import store from '../../store'
Vue.config.productionTip = false

import api from "@/api"
Vue.prototype.$api = api
/*按需引入组件*/
import {
    Popup,
    Button,
    Field
} from 'vant'
Vue.use(Popup)
   .use(Button)
   .use(Field)
/*屏幕适配*/
import 'amfe-flexible'
/*公共基本样式*/
import '../../assets/css/base.css'


new Vue({
  // router,
  store,
  render: h => h(App)
}).$mount('#login')
