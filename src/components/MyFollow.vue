<template>
  <div class="myFollow">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
      <div class="mFolLisCls" v-for="(item,index) in list" :key="index" v-if="list.length>0">
        <div class="mFolLisCls-left">
          <img :src="item.logo" alt="" class="mFolLisCls-head">
          <div class="mFLCName">
            {{item.nickName}}
            <img v-if="item.managerFlag == '1'" src="../assets/ico_manager.png" alt="">
          </div>
        </div>
        <div class="mFFolBtn" v-if="item.followerState=='0'" @click="followFunBtn(index,item.userId)">关注</div>
        <div class="mFLCAFollow" v-else-if="item.followerState=='1'" @click="cancelFollowFun(index,item.userId)">已关注</div>
      </div>
    </div>

    <div v-if="list.length<=0" style="position: absolute;left: 50%;top: 50%;-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%)">
      <img src="../assets/empty.png" alt="" class="emptyImg">
    </div>

    <div class="cancelBtnCls" v-if="isCancelBtnClsFlag">
      <div class="canBtnDialog">
        <div class="canBtnDialogTop">确认不再关注？</div>
        <div class="canBtnDialogBottom">
          <span @click="canBtnDialogBBtn">取消</span>
          <span @click="conBtnDialogBBtn(isCancelBtnClsFlagIndex,followId)">确认</span>
        </div>
      </div>
    </div>
    <div class="more_loading" v-show="!queryLoading">
      <vue-loading type="spin" v-show="moreLoading&&!allLoaded" color="#4397f1" :size="{ width: '30px', height: '30px' }"></vue-loading>
      <p class="baseCls" v-show="allLoaded">停，到底了</p>
    </div>
    <vue-loading class="icon_loading" type="bars" color="#4397f1" :size="{ width: '50px', height: '50px' }" v-show="loadingShow"></vue-loading>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  export default{
    name: 'MyFollow',
    data(){
      return {
        isCancelBtnClsFlagIndex:null,
        isCancelBtnClsFlag: false,
        list: [],
        followId:'',
        queryLoading: false,
        moreLoading: false,
        allLoaded: false,
        pageNum:1,
        loadingShow:false
      }
    },
    components: {},
    created: function () {
      this.getFollowerSelect();
    },
    methods: {
      getFollowerSelect(){
        var params = {
          current:1,
          size:10
        };
        this.loadingShow = true;
        this.$axios.post("http://circle-api.dotstable.com/app/circle/followerSelect",params).then(res=>{
          if(res.data.code == 0){
            this.list = res.data.data.records;
            this.loadingShow = false;
          }else{
            console.log(res.data.msg);
            this.loadingShow = false;
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
        var params = {
          current: this.pageNum,
          size: 10
        };
        this.$axios.post("http://circle-api.dotstable.com/app/circle/followerSelect",params).then(res => {
          if(res.data.code == 0){
            if(res.data.data.records.length !== 0){
              this.list = this.list.concat(res.data.data.records);
            }else{
              this.allLoaded = true;
            }
            this.moreLoading = this.allLoaded;
          }else{
            Toast({
              message: res.data.msg,
              duration: 2000
            });
            this.moreLoading = false;
          }
        }).catch(err=>{
          this.moreLoading = false;
        })
      },
      cancelFollowFun(i,id){
        this.isCancelBtnClsFlag = true;
        this.followId = id;
        this.isCancelBtnClsFlagIndex = i;
      },
      /*取消*/
      canBtnDialogBBtn(){
        this.isCancelBtnClsFlag = false;
      },
      conBtnDialogBBtn(i,id){
        var params = {
          beUserId:id ,
        };
        this.$axios.post("http://circle-api.dotstable.com/app/circle/cancelFollower", params).then(res => {
          if (res.data.code === 0) {
            this.list[i].followerState = '0';
            this.isCancelBtnClsFlag = false;
          } else {
            console.log(res.data.msg);
          }
        });
      },
      /*关注粉丝*/
      followFunBtn(i,id) {
        var params = {
          beUserId: id,
        };
        this.$axios.post("http://circle-api.dotstable.com/app/circle/saveFollower",params).then(res => {
          console.log(res.data, "新增关注");
          if (res.data.code === 0) {
            Toast({
              message: res.data.msg,
              duration: 2000
            });
            this.list[i].followerState = 1;
          } else {
            console.log(res.data.msg);
          }
        });
      },
    },
    destroyed:function () {
      this.loadingShow = false;
    }
  }
</script>
<style scoped>
  .mFolLisCls {
    padding: 8px 17px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    border-bottom: 1px solid #eeeeee;
    line-height: 44px;
  }
  .mFolLisCls .mFolLisCls-left{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
  }
  .mFolLisCls .mFolLisCls-head {
    width: 44px;
    height: 44px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .mFolLisCls .mFLCName {
    margin-left: 12px;
    font-size: 15px;
    color: #333333;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
  }
  .mFolLisCls .mFLCName img{
    width: 14px;
    height: 14px;
    margin-left: 10px;
  }
  .mFolLisCls .mFLCAFollow {
    width: 60px;
    height: 30px;
    border-radius: 8px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #DFDFDF;
    color: #999999;
    font-size: 12px;
  }

  .mFolLisCls .mFFolBtn {
    width: 60px;
    height: 30px;
    border-radius: 8px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #1D7CE5;
    color: #1D7CE5;
  }
  .cancelBtnCls {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0.6);
    z-index: 999999;
  }
  .cancelBtnCls .canBtnDialog {
    width: 80%;
    height: 100px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -40%;
  }
  .cancelBtnCls .canBtnDialog .canBtnDialogTop {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    border-bottom: 1px solid #EFEFEF;
  }
  .cancelBtnCls .canBtnDialog .canBtnDialogBottom {
    display: flex;
    display: -webkit-flex;
  }
  .cancelBtnCls .canBtnDialog .canBtnDialogBottom span {
    flex: 1;
     -webkit-flex: 1;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #047BFF;
  }
  .cancelBtnCls .canBtnDialog .canBtnDialogBottom span:nth-child(1) {
    border-right: 1px solid #EFEFEF;
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
  .emptyImg{
    width: 250px;
    opacity: 0.7
  }
  .icon_loading{
    position: fixed;
    left: 50%;
    top:50%;
    margin-left: -25px!important;
    margin-top: -25px!important;
  }
</style>
