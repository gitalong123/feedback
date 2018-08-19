<template>
  <div>
    <footer class="footer-menu" :style="isReleaseBg ? 'z-index: 9999' : ''">
      <router-link tag="div" to="/HomePage" replace class="footer-item">
        <div v-if="$store.state.activeFooterMenu === 'HomePage'">
          <img src="../assets/shouye.png" alt="HomePage">
          <p class="footer-desc" style="color: #3590EC">首页</p>
        </div>
        <div v-else>
          <img src="../assets/shouyehui.png" alt="HomePage">
          <p class="footer-desc">首页</p>
        </div>
      </router-link>
      <div class="footer-item">
        <div class="publish-bg"></div>
        <div class="border-bg"></div>
        <div class="publish-btn" @click.stop="cancelBtn">
          <img src="../assets/phone.png" alt="HomePage">
        </div>
      </div>
      <router-link tag="div" to="/MyCircle" replace class="footer-item" @click="isReleaseBg = false">
        <div v-if="$store.state.activeFooterMenu === 'MyCircle'">
          <img src="../assets/wo.png" alt="MyCircle">
          <p class="footer-desc" style="color: #3590EC">我的</p>
        </div>

        <div v-else>
          <img src="../assets/wohui.png" alt="MyCircle">
          <p class="footer-desc">我的</p>
        </div>
      </router-link>
    </footer>
    <!--选择发布类型-->
    <div class="releaseBg" v-show="isReleaseBg" @click="cancelBtn" @touchmove.prevent></div>
    <transition name="release-fade" @touchmove.prevent>
      <div class="publish-relBgLis" v-show="isReleaseBg" :style="isReleaseBg ? 'z-index: 8888' : ''">
        <div class="relBgLsDetails" @click="goPublish('2')">
          <img src="../assets/ico_casual.png" alt="">
          <span>休闲娱乐</span>   
        </div>
        <div class="relBgLsDetails" @click="goPublish('1')">
          <img src="../assets/ico_service.png" alt="">
          <span>生活服务</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isReleaseBg: false
    };
  },
  watch: {
    $route(val){
      if(val.name !== 'HomePage'){
        this.isReleaseBg = false
      }
    }
  },
  methods:{
    cancelBtn(){
      if(this.isReleaseBg){
        this.isReleaseBg = false
      }else{
        this.isReleaseBg = true
      }
    },
        /*发布圈子*/
    goPublish(id) {
      this.$store.state.circleKindsId = id;
      this.$router.push({ path: "/ReleaseCircle", query: { classId: id } });
    },
  }
};
</script>
<style scoped>
.footer-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  display: -webkit-flex;
  background-color: #ffffff;
  border-top: 1px solid #cccccc;
  /* background-color: #F6F6F7; */
  /* box-shadow: 0 2px 10px rgba(102,102,102,0.4); */
  z-index: 65;
}
.footer-item {
  position: relative;
  flex: 1;
  -webkit-flex: 1;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
  text-align: center;
  /* cursor: pointer; */
}
.footer-item img {
  height: 24px;
  width: 24px;
}
.footer-item .publish-bg {
  width: 100%;
  height: 55px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background: #ffffff;
}
.footer-item .border-bg {
  width: 62px;
  height: 62px;
  position: absolute;
  border-radius: 50%;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  top: -20px;
  left: 50%;
  margin-left: -31px;
  z-index: 9;
}
.footer-item .publish-btn {
  width: 55px;
  height: 55px;
  position: absolute;
  border-radius: 50%;
  top: -15px;
  left: 50%;
  margin-left: -26.5px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
  z-index: 99;
}
.footer-item .publish-btn img {
  width: 50px;
  height: 50px;
}
.footer-desc {
  margin: 0;
  padding: 0;
  font-size: 10px;
  color: #999999;
  text-align: center;
}

.release-fade-enter-active {
  transition: all 0.3s ease;
   -webkit-transition: all 0.3s ease;
}
.release-fade-leave-active {
  transition: all 0.2s ease;
   -webkit-transition: all 0.2s ease;
}
.release-fade-enter {
  transform: translateY(200px);
   -webkit-transform: translateY(200px);
}
.release-fade-leave-to {
  transform: translateY(200px);
   -webkit-transform: translateY(200px);
}
.publish-relBgLis{
  width: 100%;
  height: 200px;
  position: fixed;
  bottom: 0;
  background: rgba(255, 255, 255, .9);
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
}
.relBgLsDetails{
  display: flex;
  display: -webkit-flex;
  flex-direction:column;
  -webkit-flex-direction:column;
  align-items: center;
  -webkit-align-items: center;
  padding-top: 35px;
}
.relBgLsDetails:last-child{
  margin-left: 40px
}
.relBgLsDetails:first-child{
  margin-right: 40px;
}
.publish-relBgLis img{
  width: 70px;
}
.publish-relBgLis span{
  font-size: 16px;
  color: #333333
}
</style>
