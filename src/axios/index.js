/*引入Vue框架*/
import Vue from 'vue';
/*引入资源请求插件*/
import axios from 'axios';
import store from '../store'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// http request 拦截器
axios.interceptors.request.use(function (config) {
  config.headers.token = store.state.userToken;//已登录用户，设置为获取到的Token值
  config.headers.clientType = store.state.clientType;//客户端类型
  return config;
}, function (error) {
  return Promise.reject(error);
});
// http response 拦截器
axios.interceptors.response.use(function(response){
  if(response.data.code==101||response.data.code==102){//101登录token已过期,102登录token不正确
    store.state.show = true;
  }else{
    store.state.show = false;
    return response
  }
}, function (error) {
  return Promise.reject(error);
});
export default axios;
