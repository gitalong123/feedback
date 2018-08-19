// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from './axios/index'
import 'lib-flexible/flexible'
import 'video.js/dist/video-js.css'
import AMap from 'vue-amap';
import store from './store'
import VueLoading  from 'vue-loading-template'
Vue.use(VueLoading);
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

Vue.config.productionTip = false;
// Vue.use(Mint);
Vue.use(AMap);
AMap.initAMapApiLoader({
  key: '2352aa77c41f3f7b762221270e7520c5',
  plugin: ['AMap.Geolocation']
});
Vue.prototype.$axios = axios;

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
