<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
  import { Toast } from "mint-ui";
  export default {
    name: "App",
    data() {
      return {
      };
    },
    mounted() {
      this.getClientType();
    },
    methods: {
      /*判断环境*/
      getClientType() {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          this.$store.state.clientType = 1;
        } else if (isIOS) {
          this.$store.state.clientType = 2;
        } else {
          this.$store.state.clientType = 3;
        }
      }
    }
  };
</script>

<style>
  html,
  body {
    margin: 0;
    height: 100%;
    background-color: #fff;
    font-size: 12px;
  }
  #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  a,button,input,optgroup,select,textarea {
    -webkit-tap-highlight-color:rgba(0,0,0,0);
  }
</style>
