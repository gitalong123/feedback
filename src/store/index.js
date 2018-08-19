import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

const state = {
  activeFooterMenu: "HomePage",
  show:false,
  userToken:'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzQ4NTUwOTUsInVzZXJJZCI6OX0.hFR1CDhX-miAVa1UE5c2y-3f44fFmlJfgRHQexDvUaI',
  // userToken:'',
  currentUserId:'',
  clientType:'',
  circleKindsId:'1',
  getTabLabel:'请选择心情标签',
  tableId:'',
  lngLat:'113.65,34.76'
}

export default new vuex.Store({
  state
})
