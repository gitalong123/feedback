<template>
  <div class="myCircle">
    <div style="padding-bottom: 20px;">
      <!--head-->
      <section class="relDetails">
        <!--left-->
        <div class="relDLeft">
          <img v-if="!logo" class="relDeImg" src="../assets/head.jpg"/>
          <img v-else class="relDeImg" :src="logo"/>
        </div>
        <!--right-->
        <div class="relDRight">
          <div class="relDRName">
            {{nickName}}
            <img v-if="managerFlag=='1'" src="../assets/ico_manager.png" alt="">
          </div>
          <div class="relDRLike">
            <router-link to="/MyFollow" tag="div" class="aColorChange">
              <div class="followNum">
                关注
                <span>{{followerNum}}</span>
              </div>
            </router-link>
            <router-link to="/MyFans" tag="div" class="aColorChange">
              <div class="followNum">
                粉丝
                <span>{{fansNum}}</span>
              </div>
            </router-link>
          </div>
        </div>
      </section>
      <!--content-->
      <section class="relDetailsList" v-if="list.length>0" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
        <div class="relDetailsList-con" v-for="(item,index) in list">
          <!--content-left-->
          <div class="relDeLeft">
            <p>{{item.day}}</p>
            {{item.createDate|yearAndMonth}}
          </div>
          <!--content-right-->
          <div style="display: flex;align-items: center;display: -webkit-flex;-webkit-align-items: center;" @click="goCircleDetails(item.circleId)">
            <div class="relDImg" v-if="item.photoUrl || item.previewUrl">
              <img v-if="item.photoUrl" :src="item.photoUrl" alt="">
              <img v-if="item.previewUrl" :src="item.previewUrl" alt="">
            </div>
            <div class="relDeRight">
              <div>
                <div class="relDeRightTop">{{item.content}}</div>
              </div>
              <div class="relDeRightBottom">
                <div class="conBInfo">
                  <img src="../assets/ico_comment.png" alt="">
                  {{item.reviewNum}}
                </div>
                <div class="conBPraise">
                  <img src="../assets/ico_like.png" alt="">
                  {{item.upvoteNum}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div v-else style="position: absolute;left: 50%;top: 50%;-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%)">
        <img src="../assets/empty.png" alt="" class="emptyImg">
      </div>
    </div>
    <!--右下悬浮-->
    <!-- <div class="releaseCls" @click="releaseFun" v-if="ifReleaseBtn">
      <img src="../assets/ico_release.png" alt="">
    </div> -->
    <!--选择发布类型-->
    <!-- <div class="releaseBg" v-if="isReleaseBg"> </div>
    <transition name="release-fade" >
      <div class="relBgLis" v-if="isReleaseBg">
        <div class="relBgLsDetails" @click="goPublish('1')">
          生活服务
          <img src="../assets/ico_service.png" alt="">
        </div>
        <div class="relBgLsDetails" @click="goPublish('2')">
          休闲娱乐
          <img src="../assets/ico_casual.png" alt="">
        </div>
        <div class="relBgLsDetails" @click="cancelBtn">
          <img src="../assets/ico_cancel.png" alt="">
        </div>
      </div>
    </transition> -->


    <div class="more_loading" v-show="!queryLoading">
      <vue-loading type="spin" v-show="moreLoading&&!allLoaded" color="#4397f1" :size="{ width: '30px', height: '30px' }"></vue-loading>
      <p class="baseCls" v-show="allLoaded">停，到底了</p>
    </div>
    <vue-loading class="icon_loading" type="bars" color="#4397f1" :size="{ width: '50px', height: '50px' }" v-show="loadingShow"></vue-loading>
    <HelloWorld></HelloWorld>
  </div>
</template>
<script>
  import HelloWorld from '@/components/HelloWorld.vue'
  export default{
    name: 'MyCircle',
    filters:{
      yearAndMonth:function(val){
        return val.replace("-","/").substring(0,7);
      }
    },
    components: {
      HelloWorld
    },
    data(){
      return {
        nickName:'',
        managerFlag: '',
        logo: '',
        fansNum: '',
        followerNum: '',
        followFlag: true,
        cancelFollowFlag: false,
        list:[],
        queryLoading: false,
        moreLoading: false,
        allLoaded: false,
        pageNum:1,
        // isReleaseBg: false,
        // ifReleaseBtn: true,
        loadingShow:false
      }
    },
    created: function () {
      this.getMySelec();
    },
    /*watch: {
      "$route.name": function(val) {
        if (val == "MyCircle") {
          this.moreLoading = false;
          this.allLoaded = false;
          this.pageNum = 1;
          this.getMySelec();
        }
      }
    },*/
    methods: {
      getMySelec(){
      	let params = {
          current: this.pageNum,
          size: 10
      	};
      	this.loadingShow = true;
        this.$axios.post("http://circle-api.dotstable.com/app/circle/mySelec",params).then(res=>{
          if(res.data.code==0){
            this.list = res.data.data.records;
            this.nickName = res.data.data.nickName;
            this.managerFlag = res.data.data.managerFlag;
            this.followerNum = res.data.data.followerNum;
            this.fansNum = res.data.data.fansNum;
            this.logo = res.data.data.logo;
            this.loadingShow = false;
          }else{
            this.loadingShow = false;
            console.log(res.data.msg)
          }
        }).catch(err=>{
          this.loadingShow = false;
        })
      },
      /*加载更多*/
      loadMore() {
        // 防止多次加载
        if(this.allLoaded){
          this.moreLoading = true;
          return;
        }
        if(this.queryLoading){
          return;
        }
        this.moreLoading = !this.queryLoading;
        this.pageNum++;
        let params = {
          current: this.pageNum,
          size: 8
        };
        this.$axios.post("http://circle-api.dotstable.com/app/circle/mySelec", params).then(res => {
          if(res.data.code==0){
            if(res.data.data.records.length !== 0){
              this.list = this.list.concat(res.data.data.records);
            }else{
              this.allLoaded = true;
            }
            this.moreLoading = this.allLoaded;
          }else{
            console.log(res.data.msg);
            this.moreLoading = false;
          }
        }).catch(err => {
          this.moreLoading = false;
        })
      },
      /*圈子详情*/
      goCircleDetails(id){
        this.$router.push({path:'/CircleDetails',query:{circleId:id}})
      },
      /*右下展开*/
      // releaseFun (){
      //   this.ifReleaseBtn = false;
      //   this.isReleaseBg = true;
      // },
      /*右下关闭*/
      // cancelBtn (){
      //   this.ifReleaseBtn = true;
      //   this.isReleaseBg = false;
      // },
      /*发布圈子*/
      goPublish(id){
        this.$store.state.circleKindsId = id;
        this.$router.push({path:'/ReleaseCircle',query:{classId:id}});
        this.cancelBtn();
      },
    },
    destroyed:function () {
      this.loadingShow = false;
    }
  }
</script>
<style scoped>
  .myCircle{
    padding-bottom: 50px;
  }
  .relDetails {
    width: 100%;
    height: 115px;
    background-color: #0374e7;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    margin-bottom: 20px;
  }
  .relDLeft {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 26px;
  }
  .relDLeft .relDeImg {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .relDRight {
    margin-left: 15px;
    color: #ffffff;
  }
  .relDRight .relDRName {
    font-size: 18px;
  }
  .relDRight .relDRName img {
    width: 14px;
    height: 14px;
    margin-left: 3px;
  }
  .relDRight .relDRLike {
    display: flex;
    display: -webkit-flex;
    font-size: 15px;
    margin-top: 10px;
  }
  .relDRLike .followNum {
    margin-right: 33px;
  }
  .relDRLike .followNum span{
    padding-left: 5px;
  }
  /*内容*/
  .relDetailsList {
    display: flex;
    display: -webkit-flex;
    margin-top: 20px;
    flex-direction: column;
    -webkit-flex-direction: column;
  }
  .relDetailsList .relDetailsList-con{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    padding: 10px;
    border-bottom: 1px solid #f7f7f7;
  }
  .relDetailsList .relDetailsList-con:last-child{
    border-bottom: none;
  }
  .relDeLeft {
    width: 70px;
    text-align: center;
    font-size: 11px;
    color: #666666;
    flex: none;
  }
  .relDeLeft p {
    font-size: 25px;
    color: #333333;
    margin: 0;
  }

  .relDImg {
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 3px;
  }
  .relDImg img {
    width: 80px;
    height: 80px;
    border-radius: 3px;
  }
  .relDeRight {
    flex: 1;
     -webkit-flex: 1;
    padding:0 11px 0 6px;
  }
  .relDeRight .relDeRightTop {
    height: 40px;
    line-height: 20px;
    font-size: 15px;
    margin: 5px 0 0 5px;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    word-break: break-all;
  }
  .relDeRightBottom {
    display: flex;
    display: -webkit-flex;
    margin-top: 15px;
    margin-left: 5px;
  }
  .conBInfo {
    margin-right: 20px;
    text-align: right;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    font-size: 11px;
    color: #666666;
  }
  .conBInfo img {
    width: 15px;
    height: 15px;
    display: block;
    margin-right: 7px;
  }

  .conBPraise {
    padding-right: 10px;
    text-align: right;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    font-size: 11px;
    color: #666666;
  }

  .conBPraise img {
    width: 15px;
    height: 15px;
    display: block;
    margin-right: 7px;
  }

  .conBInfoInput {
    width: 74%;
    margin-left: 18%;
    margin-top: 5px;
    margin-right: 8%;
  }

  .conBInfoInput textarea {
    width: 100%;
    padding: 2px 5px;
    border: 1px solid #eee;
    margin-right: 15px;
  }
  .releaseCls {
    position: fixed;
    right: 20px;
    bottom: 100px;
    z-index: 99;
  }

  .releaseCls > img {
    width: 62px;
    height: 62px;
  }
  .baseCls {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    background-color: #f4f4f4;
    color: #999;
    margin: 0;
  }
  .releaseBg {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  .relBgLis {
    position: fixed;
    right: 20px;
    bottom: 165px;
    color: #ffffff;
    line-height: 30px;
    z-index: 9999;
  }

  .relBgLis .relBgLsDetails {
    line-height: 60px;
    padding-right: 70px;
    font-size: 14px;
    position: relative;
    margin-top: 10px;
  }

  .relBgLis .relBgLsDetails img {
    width: 62px;
    height: 62px;
    position: absolute;
    top: 0;
    right: 0;
  }
  .release-fade-enter-active{
    transition: all .3s ease;
    -webkit-transition: all .3s ease;
  }
  .release-fade-leave-active{
    transition: all .2s ease;
    -webkit-transition: all .2s ease;
  }
  .release-fade-enter{
    transform: translateX(50px);
    -webkit-transform: translateX(50px);
  }
  .release-fade-leave-to{
    transform: translateX(100px);
    -webkit-transform: translateX(100px);
  }
  .icon_loading{
    position: fixed;
    left: 50%;
    top:50%;
    margin-left: -25px!important;
    margin-top: -25px!important;
  }
  .emptyImg{
    width: 250px;
    opacity: 0.7
  }
</style>
