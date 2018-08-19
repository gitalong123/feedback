<template>
  <div class="circleDetails">

    <div class="conDetails" v-if="list">
      <!--left-->
      <div>
        <div @click.prevent="goHisCircle(list.userId)">
          <img class="conDeLeft" :src="list.logo" alt="head">
        </div>
      </div>
      <!--right-->
      <div class="conDeRight">
        <div v-show="currentUserId != list.userId">
          <div v-if="list.followerState =='0'" class="folBtn" @click="followFun(list.userId)">关注</div>
          <div v-else class="hasFoledBtn" @click="cancelFollowFun(list.userId)">已关注</div>
        </div>
        <!--昵称-->
        <div class="conDeRTop">
          <span>{{list.nickName}}</span>
          <img v-if="list.managerFlag == '1'" src="../assets/ico_manager.png" alt="">
        </div>
        <!--发表时间-->
        <div class="conDeRTime">
          <span>{{list.createDate}}</span>
          <i>{{list.className}}</i>
        </div>
        <!--内容文字-->
        <div class="conDeRDetails">
          <span>#{{list.tabName}}#</span>
          {{list.content}}
        </div>
        <!--内容图片-->
        <div class="conDeRImagesDetail">
          <img v-if="list.imgArray" @click.prevent="imgSwipeBtn(list.imgArray,index)" v-for="(image,index) in list.imgArray" :key="index" :src="image" alt="">
          <div style="position: relative" v-if="list.previewUrl">
            <video :src="list.videoUrl" x-webkit-airplay="true" :poster="list.previewUrl.split(',')[0]" :autoplay="playStatus" @click="videoPlay($event)" controls controlslist="nodownload" x5-video-player-type="h5" playsinline webkit-playsinline style="object-fit:fill">
              您的浏览器不支持 video 标签。
            </video>
          </div>
        </div>

        <div class="conBottom">
          <div class="conBaddress">{{list.address}}</div>
          <div class="deleteMyCircle" v-if="currentUserId == list.userId" @click="isDeleteMyCircle">删除</div>
          <!--评论-->
          <div class="conBInfo" @click.stop="conBInfoBtn(circleId)">
            <img src="../assets/ico_comment.png" alt=""> {{list.reviewNum}}
          </div>

          <!--点赞-->
          <div class="conBPraise" @click="conBPraiseBtn(list.upvoteNum,circleId)">
            <img v-if="list.upvoteState =='0'" src="../assets/ico_like.png" alt="">
            <img v-if="list.upvoteState =='1'" src="../assets/ico_like_xiao.png" alt=""> {{list.upvoteNum}}
          </div>
        </div>
        <div v-if="list.reviewNum>0 || list.upvoteNum>0">
          <!--点赞用户-->
          <div class="praiseNumbers">
            <p class="triangle_border_up"></p>
            <img src="../assets/ico_like_xiao.png" alt="">
            <span v-for="nicks in list.upvotes">{{nicks.nickName}}
            <em>、</em>
          </span>
          </div>
          <!--评论内容-->
          <div class="praiseNumDetails">
            <div class="praiseNumDeList" v-for="item in list.reviews" @click="conBInfoBtnOther(circleId,item.userId,item.reviewId,item.nickName)">
            <span class="replayName">
              {{item.nickName}}
              <span v-if="item.parentNickName ==null">:</span>
            </span>
              <span v-if="item.parentNickName">
              回复
              <span class="replayName">{{item.parentNickName}}:</span>
            </span>
              <span>{{item.content}}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!--评论输入框-->
    <div class="commentMask" v-show="commentShow" @click="commentShow = !commentShow"></div>
    <transition name="slide-fade">
      <div class="circleComment" v-show="commentShow">
        <textarea class="input-area" cols="25" rows="" :placeholder="thisNickName" v-model="commentContent" onpropertychange="this.style.height = this.scrollHeight + 'px';"  oninput="this.style.height='auto';this.style.height = this.scrollHeight + 'px'"></textarea>
        <div class="circleComment-btn" :class="commentContent!='' ? 'CommentSend' : ''" @click="SendCircleComment(commentCircleId,reviewId)">发送</div>
      </div>
    </transition>
    <!--轮播-->
    <div @touchmove.prevent v-if="ifSwipeLis">
      <mt-popup v-model="ifSwipeLis" popup-transition="popup-fade" class="swipeCls">
        <mt-swipe :defaultIndex="itemsIndex" :auto="0">
          <mt-swipe-item v-for="(item,index) in items" :key="index">
            <div rel="external nofollow" style="height:100%;position: relative;">
              <img :src="item" class="swipeClsImg" style="
              width: 100%;
              position:absolute;
              margin: auto;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;" />
              <span class="desc"></span>
            </div>
          </mt-swipe-item>
        </mt-swipe>
        <img @click.self="closeCls" src="../assets/ico_close.png" alt="">
      </mt-popup>
    </div>
    <!--关注按钮-->
    <div class="cancelBtnCls" v-if="isCancelBtnClsFlag">
      <div class="canBtnDialog">
        <div class="canBtnDialogTop">确认不再关注？</div>
        <div class="canBtnDialogBottom">
          <span @click="canBtnDialogBBtn">取消</span>
          <span @click="conBtnDialogBBtn(followId)">确认</span>
        </div>
      </div>
    </div>
    <!--删除按钮-->
    <div class="cancelBtnCls" v-if="isDeleteBtnClsFlag">
      <div class="canBtnDialog">
        <div class="canBtnDialogTop">确认删除吗？</div>
        <div class="canBtnDialogBottom">
          <span @click="DelBtnDialogBBtn">取消</span>
          <span @click="deleteMyCircle(circleId)">确认</span>
        </div>
      </div>
    </div>
    <!--删除评论-->
    <div class="deleteReplay" v-if="deleteReplayShow">
      <div class="deleteReplay-con">
        <p @click="getDeleteReplay(delReviewId)">删除</p>
        <p @click="cancelDeleteReplay">取消</p>
      </div>
    </div>
    <vue-loading class="icon_loading" type="bars" color="#4397f1" :size="{ width: '50px', height: '50px' }" v-show="loadingShow"></vue-loading>
  </div>
</template>
<script>
import { Toast, Popup, Swipe, SwipeItem } from "mint-ui";
export default {
  name: "CircleDetails",
  data() {
    return {
      deleteReplayShow: false,
      isCancelBtnClsFlag: false,
      isDeleteBtnClsFlag: false,
      ifSwipeLis: false,
      ifReleaseBtn: true,
      isReleaseBg: false,
      itemsIndex: null,
      items: [],
      list: "",
      followId: "",
      commentContent: "",
      commentShow: false,
      commentCircleId: "",
      circleId: "",
      praiseNickName: "",
      reviewId: "",
      playStatus: false,
      controls: true,
      loadingShow: false,
      currentUserId: "",
      delReviewId:'',
      thisNickName:'你的评论...'
    };
  },
  components: {
    "mt-popup": Popup,
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem
  },
  mounted() {
    this.circleId = this.$route.query.circleId;
    this.currentUserId = this.$store.state.currentUserId;
    this.getSaveReview();
  },
  methods: {
    /*视频播放*/
    videoPlay(event) {
      let _dom = event.target;
      _dom.pause();
    },
    /*圈子详情*/
    getSaveReview() {
      var params = {
        circleId: this.circleId
      };
      // this.loadingShow = true;
      this.$axios
        .post("http://circle-api.dotstable.com/app/circle/detail", params)
        .then(res => {
          if (res.data.code === 0) {
            this.list = res.data.data;
            /*处理图片地址转化为字符串*/
            var imgArray = [];
            var imgLoopArray = [];
            var imgItem = { title: "惠农", url: null };
            if (this.list.photoUrl != null) {
              imgArray = this.list.photoUrl.split(",");
              this.list["imgArray"] = imgArray;
              for (var k = 0; k < imgArray.length; k++) {
                imgItem.url = imgArray[k];
                imgLoopArray.push(imgItem);
              }
              // this.items[i] = imgLoopArray;
            }
            // this.loadingShow = false;
          } else {
            // this.loadingShow = false;
            console.log(res.data.msg);
          }
        });
    },
    /*轮播图*/
    imgSwipeBtn(item, index) {
      this.ifSwipeLis = true;
      this.items = item;
      this.itemsIndex = index;
    },
    closeCls() {
      this.ifSwipeLis = false;
    },
    /*关注*/
    followFun(id) {
      console.log(id);
      var params = {
        beUserId: id
      };
      this.$axios
        .post("http://circle-api.dotstable.com/app/circle/saveFollower", params)
        .then(res => {
          if (res.data.code === 0) {
            Toast({
              message: res.data.msg,
              duration: 2000
            });
            this.list.followerState = 1;
          } else {
            console.log(res.data.msg);
          }
        });
    },
    cancelFollowFun(id) {
      this.isCancelBtnClsFlag = true;
      this.followId = id;
    },
    /*取消*/
    canBtnDialogBBtn() {
      this.isCancelBtnClsFlag = false;
    },
    conBtnDialogBBtn(id) {
      var params = {
        beUserId: id
      };
      this.$axios
        .post(
          "http://circle-api.dotstable.com/app/circle/cancelFollower",
          params
        )
        .then(res => {
          console.log(res.data, "取消关注");
          if (res.data.code === 0) {
            this.list.followerState = "0";
            this.isCancelBtnClsFlag = false;
          } else {
            console.log(res.data.msg);
          }
        });
    },

    /*评论*/
    conBInfoBtn(id) {
      this.commentShow = true;
      this.reviewId = '';
      this.commentCircleId = id;
    },
      conBInfoBtnOther(id,userId,reviewId,name) {
          this.reviewId = userId;
          if (userId == this.currentUserId) {
              this.deleteReplayShow = true;
              this.delReviewId = reviewId
          } else {
              this.thisNickName = '回复'+name+':'
              this.commentShow = true;
              this.commentCircleId = id;
          }
      },
    SendCircleComment(id, reviewId) {
      let params = {
        circleId: id,
        reviewId: reviewId,
        content: this.commentContent
      };
      this.$axios
        .post("http://circle-api.dotstable.com/app/circle/saveReview", params)
        .then(res => {
          if (res.data.code === 0) {
            this.thisNickName = '你的评论..';
            this.commentContent = '';
            this.commentShow = false;
            this.getSaveReview();
          }else if(res.data.code == 20003){
            Toast({
              message: res.data.msg,
              duration: 2000
            });
          }else {
            console.log(res.data.msg);
          }
        }).catch(err=>{
        Toast({
          message: res.data.msg,
          duration: 2000
        });
      })
    },
    // 删除
    getDeleteReplay(id) {
      let params = {
        reviewId: id
      };
      this.$axios
        .post("http://circle-api.dotstable.com/app/circle/delReview", params)
        .then(res => {
          if (res.data.code == 0) {
            this.deleteReplayShow = false;
              Toast({
                  message: res.data.msg,
                  duration: 2000
              });
            this.getSaveReview();
          } else {
            this.deleteReplayShow = false;
              Toast({
                  message: res.data.msg,
                  duration: 2000
              });
          }
        }).catch(err=>{
          this.deleteReplayShow = false;
      })
    },
    cancelDeleteReplay() {
      this.deleteReplayShow = false;
    },
    /*点赞*/
    conBPraiseBtn(e, id) {
      var params = {
        circleId: id
      };
      this.$axios
        .post("http://circle-api.dotstable.com/app/circle/saveUpvote", params)
        .then(res => {
          if (res.data.code == 0) {
            if (this.list.upvoteState == "0") {
              this.list.upvoteNum = e + 1;
              this.list.upvoteState = 1;
            } else if (this.list.upvoteState == "1") {
              this.list.upvoteNum = e - 1;
              this.list.upvoteState = 0;
            }
            this.getSaveReview();
          } else {
            console.log(res.data.msg);
          }
        });
    },
    /*删除*/
    isDeleteMyCircle() {
      this.isDeleteBtnClsFlag = true;
    },
    DelBtnDialogBBtn() {
      this.isDeleteBtnClsFlag = false;
    },
    deleteMyCircle(id) {
      let params = {
        circleId: id
      };
      this.$axios
        .post("http://circle-api.dotstable.com/app/circle/delCircle", params)
        .then(res => {
          if (res.data.code == 0) {
            this.isDeleteBtnClsFlag = false;
            this.$router.go(-1);
          } else {
            console.log(res.data.msg);
          }
        });
    },
    /*他的圈子*/
    goHisCircle(userId) {
      if (userId == this.currentUserId) {
        this.$router.push({ path: "/MyCircle" });
      } else {
        this.$router.push({ path: "/HisCircle", query: { userId: userId } });
      }
    }
  },
  destroyed: function() {
    this.loadingShow = false;
  }
};
</script>
<style scoped>
.circleDetails {
  background-color: #ffffff;
  height: 100%;
}
.conDetails {
  padding: 17px 12px 15px 12px;
  display: flex;
  display: -webkit-flex;
  position: relative;
  font-size: 14px;
  border-bottom: none;
}
/*left*/
.conDetails .conDeLeft {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
}
.conDetails .conDeLeft img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
}
/*right*/
.conDetails .conDeRight {
  flex: 5;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;
}
/*关注*/
.folBtn {
  width: 50px;
  height: 20px;
  line-height: 20px;
  padding: 3px 5px;
  text-align: center;
  color: #1577e4;
  position: absolute;
  top: 26px;
  right: 15px;
  border: 1px solid #1577e4;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  z-index: 2;
}

.hasFoledBtn {
  width: 50px;
  height: 20px;
  line-height: 20px;
  padding: 3px 5px;
  text-align: center;
  color: #9e9e9e;
  position: absolute;
  top: 26px;
  right: 15px;
  border: 1px solid #9e9e9e;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  z-index: 2;
}
/*名字和经理标识*/
.conDeRight .conDeRTop {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  font-size: 15px;
  color: #333333;
}
.conDeRight .conDeRTop img {
  width: 14px;
  height: 14px;
  margin-left: 10px;
}
/*时间*/
.conDeRTime {
  margin-top: 5px;
  font-size: 11px;
}
.conDeRTime span {
  color: #999999;
}
.conDeRTime i {
  color: #18b2f9;
  font-style: normal;
  margin-left: 10px;
}
/*内容*/
.conDeRDetails {
  text-align: left;
  margin-top: 14px;
  font-size: 15px;
  color: #333333;
  line-height: 20px;
}
.conDeRDetails span {
  color: #3590ec;
}
.conDeRImagesDetail {
  margin-top: 10px;
}
.conDeRImagesDetail img {
  width: 80px;
  height: 80px;
  margin-right: 5px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.conDeRImagesDetail video {
  width: 100%;
  margin: 0;
  padding: 0;
}
/*video::-webkit-media-controls-fullscreen-button {
  display: block;
}
video::-webkit-media-controls-current-time-display {
  display: block !important;
}
video::-webkit-media-controls-panel {
  background: none;
}
video::-webkit-media-controls-enclosure {
  overflow: hidden;
}
video::-webkit-media-controls-panel {
  width: calc(100% + 30px);
}*/
video::-webkit-media-controls-mute-button {
  display: none;
}
video::-webkit-media-controls-volume-slider {
  display: none;
}
video::-webkit-media-controls-time-remaining-display {
  display: block !important;
}
video::-webkit-media-controls-time-remaining-display{
  display: none!important;
}
.conDeRImagesDetail .VideoControls {
  position: absolute;
  background: url("../assets/VideoPlay.png") no-repeat;
  background-size: contain;
  width: 30px;
  height: 30px;
  top: 50%;
  left: 50%;
  margin-left: -15px;
  margin-top: -15px;
}
.conBottom {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  font-size: 12px;
  margin-top: 10px;
  align-items: center;
  -webkit-align-items: center;
}
.conBaddress {
  flex: 1;
  color: #18b2f9;
}
/*删除*/
.deleteMyCircle {
  font-size: 11px;
  color: #666666;
  margin-right: 20px;
}
/*评论和点赞*/
.conBInfo {
  margin-right: 20px;
  text-align: right;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
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
}
.conBPraise img {
  width: 15px;
  height: 15px;
  display: block;
  margin-right: 7px;
}

/*评论area*/
.commentMask {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 888;
}
.circleComment {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  position: fixed;
  bottom: 0;
  background: #f5f5f5;
  width: 100%;
  padding: 15px 0;
  z-index: 889;
  box-shadow: 0 -4px 5px -3px rgba(67, 151, 241, 0.5);
}
.circleComment .input-area {
  box-sizing: border-box;
  width: 100%;
  resize: none;
  border: none;
  overflow-y: hidden;
  outline: none;
  font-size: 14px;
  background: none;
  border-bottom: #cccccc;
  word-wrap: break-word;
  background: rgb(255, 255, 255);
  height: 35px;
  margin: 0 5px;
  border-radius: 5px;
  padding: 7px 5px 0px 5px;
}
.circleComment .circleComment-btn {
  flex: none;
  padding: 8px 15px;
  border: 1px solid #ebebeb;
  border-radius: 5px;
  color: #ebebeb;
  margin-right: 10px;
  font-size: 14px;
}
.circleComment .CommentSend {
  border: 1px solid #4397f1;
  color: #ffffff;
  background-color: #4397f1;
}
.circleComment textarea::-webkit-input-placeholder {
  color: #cccccc;
}
.circleComment textarea:-moz-placeholder {
  color: #cccccc;
}
.circleComment textarea::-moz-placeholder {
  color: #cccccc;
}
.circleComment textarea:-ms-input-placeholder {
  color: #cccccc;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
   -webkit-transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
   -webkit-transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(400px);
   -webkit-transform: translateY(400px);
}

/*点赞用户*/
.praiseNumbers {
  position: relative;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  align-items: center;
  -webkit-align-items: center;
  color: #2883eb;
  font-size: 15px;
  background-color: #f3f3f5;
  margin-top: 19px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding-left: 8px;
}
.praiseNumbers .triangle_border_up {
  width: 0;
  height: 0;
  border-width: 0 10px 10px;
  border-style: solid;
  border-color: transparent transparent #f3f3f5; /*透明 透明  灰*/
  position: absolute;
  top: -23px;
  left: 18px;
}
.praiseNumbers img {
  width: 13px;
  height: 13px;
  padding: 5px 5px 5px 0;
}
/*.praiseNumbers span {
    padding-top: 4px;
  }*/
.praiseNumbers span:last-child em {
  display: none;
}
.praiseNumDeList .replayName {
  color: #3589ec;
}
  .deleteReplay{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9999;
  }
  .deleteReplay .deleteReplay-con{
    width: 80%;
    height: 90px;
    background: #fff;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -45px;
    margin-left: -40%;

  }
  .deleteReplay .deleteReplay-con p{
    padding-left: 20px;
    line-height: 45px;
    margin: 0;
    font-size: 14px;
    color: #333333;
  }
  .deleteReplay .deleteReplay-con p:first-child{
    border-bottom: 1px solid #f4f4f4;
  }
.praiseNumDetails {
  border-top: 1px solid #e9e9e9;
  background-color: #f3f3f5;
  padding: 5px 5px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.praiseNumDetails .praiseNumDeList {
  margin: 3px 0;
  word-break: break-all;
}
.cancelBtnCls {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
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
  border-bottom: 1px solid #efefef;
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
  color: #047bff;
}
.cancelBtnCls .canBtnDialog .canBtnDialogBottom span:nth-child(1) {
  border-right: 1px solid #efefef;
}

.swipeCls {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.swipeCls > div {
  width: 90%;
  height: 80%;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.swipeCls > img {
  width: 20px;
  height: 20px;
  position: fixed;
  top: 10px;
  left: 10px;
}
.icon_loading {
  position: fixed;
  left: 55%;
  top: 50%;
  margin-left: -25px !important;
  margin-top: -25px !important;
}
</style>
