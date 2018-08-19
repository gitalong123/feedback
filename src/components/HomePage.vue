<template>
  <div class="home-page">
    <section class="selArray" @touchmove.prevent>
      <!--分类查询-->
      <div class="selAll">
        <el-select v-model="allInfo" placeholder="全部" @change="handleSelect($event)" @focus="isSelect = false">
          <el-option key="" label="全部" value=""></el-option>
          <el-option v-for="item in allOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <!--获取城市信息-->
      <div class="selAreas" @click="handleFocus">
        <el-cascader :placeholder="selectAddress" :options="areasOptions" @change="handleChange" change-on-select clearable></el-cascader>
      </div>
    </section>

    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <!--定位显示圈子-->
      <section>
        <div v-if="list.length>0" style="padding-bottom:.5rem" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
          <div class="conDetails" v-for="(item,index) in list" :key="index">
            <!--left-->
            <div class="conDeLeft">
              <div @click.prevent="goHisCircle(item.userId)">
                <img v-if="!item.logo" src="../assets/head.jpg" alt="head">
                <img v-else :src="item.logo" alt="head">
              </div>
            </div>
            <!--right-->
            <div class="conDeRight">
              <div v-show="currentUserId != item.userId">
                <div v-if="item.followerState == '0'" class="folBtn" @click.stop="followFun(index,item.userId)">关注</div>
                <div v-if="item.followerState == '1'" class="hasFoledBtn" @click.stop="followFun(index,item.userId)">已关注</div>
              </div>
              <!--昵称-->
              <div class="conDeRTop">
                <span>{{item.nickName}}</span>
                <img v-if="item.managerFlag == '1'" src="../assets/ico_manager.png" alt="">
              </div>
              <!--发表时间-->
              <div class="conDeRTime">
                <span>{{item.createDate}}</span>
                <i>{{item.className}}</i>
              </div>
              <!--内容文字-->
              <div class="conDeRDetails" @click="goCircleDetails(item.id)">
                <span>#{{item.tabName}}#</span>
                {{item.content}}
              </div>

              <!--内容-->
              <div class="conDeRImages">
                <!--视频-->
                <div v-if="item.videoUrl" class="video-class">
                  <img src="../assets/VideoPlay.png" v-if="!item.isPlay && !isIOS">
                  <video v-if="!isIOS" :src="item.videoUrl" :poster="item.previewUrl" style="object-fit: fill" :autoplay="playStatus" preload="none" @click="videoPlay($event, index)"  @pause="isVideoPlay(item.isVideo, index)" controlslist="nodownload">
                    您的浏览器不支持 video 标签。
                  </video>
                  <video v-if="isIOS" :src="item.videoUrl" :poster="item.previewUrl" style="object-fit: fill" :autoplay="playStatus"controls controlslist="nodownload">
                    您的浏览器不支持 video 标签。
                  </video>
                </div>
                <!--图片-->
                <div v-if="item.imgArray">
                  <img v-if="image" v-for="(image,index) in item.imgArray" :key="index" :src="image" alt="" @click.prevent="imgSwipeBtn(item.imgArray,index)">
                </div>
              </div>

              <div class="conBottom">
                <div class="conBaddress">{{item.address}}</div>

                <!--评论-->
                <div class="conBInfo" @click.stop="conBInfoBtn(item.reviewNum,index,item.id)">
                  <img src="../assets/ico_comment.png" alt=""> {{item.reviewNum}}
                </div>

                <!--点赞-->
                <div class="conBPraise" @click.stop="conBPraiseBtn(item.upvoteNum,index,item.id)">
                  <img v-if="item.upvoteState =='0'" src="../assets/ico_like.png" alt="">
                  <img v-if="item.upvoteState =='1'" src="../assets/ico_like_xiao.png" alt=""> {{item.upvoteNum}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else style="position: absolute;left: 50%;top: 50%;-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%)">
          <img src="../assets/empty.png" alt="" class="emptyImg">
        </div>
      </section>
    </mt-loadmore>

    <!--右下悬浮-->
    <!-- <div class="releaseCls" @click="releaseFun" v-if="ifReleaseBtn">
      <img src="../assets/ico_release.png" alt="">
    </div> -->

    <!--选择发布类型-->
    <!-- <div class="releaseBg" v-show="isReleaseBg"> </div>
    <transition name="release-fade">
      <div class="relBgLis" v-show="isReleaseBg">
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

    <!--图片预览-->
    <div @touchmove.prevent v-if="ifSwipeLis">
      <mt-popup v-model="ifSwipeLis" popup-transition="popup-fade" class="swipeCls">
        <mt-swipe :auto="0" :defaultIndex="itemsIndex">
          <mt-swipe-item v-for="(item, index) in itemImgArr" :key="index">
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

    <!--不再关注提示-->
    <div class="cancelBtnCls" v-if="isCancelBtnClsFlag">
      <div class="canBtnDialog">
        <div class="canBtnDialogTop">确认不再关注？</div>
        <div class="canBtnDialogBottom">
          <span @click.self="canBtnDialogBBtn">取消</span>
          <span @click.self="conBtnDialogBBtn(isCancelBtnClsFlagIndex,followId)">确认</span>
        </div>
      </div>
    </div>

    <!--评论输入框-->
    <div class="commentMask" v-show="commentShow" @click="commentShow = !commentShow"></div>
    <transition name="slide-fade">
      <div class="circleComment" v-show="commentShow">
        <textarea class="input-area" cols="25" rows="" @focus="isFixed = true" @blur="isFixed = false" placeholder="这是你的评论..." v-model="commentContent" onpropertychange="this.style.height = this.scrollHeight + 'px';"  oninput="this.style.height='auto';this.style.height = this.scrollHeight + 'px'"></textarea>
        <div class="circleComment-btn" :class="commentContent!='' ? 'CommentSend' : ''" @click="SendCircleComment(commentNumber,commentIndex,commentCircleId)">发送</div>
      </div>
    </transition>

    <div class="more_loading" v-show="!queryLoading">
      <vue-loading type="spin" v-show="moreLoading&&!allLoaded" color="#4397f1" :size="{ width: '30px', height: '30px' }"></vue-loading>
      <p class="baseCls" v-show="allLoaded">停，到底了</p>
    </div>
    <vue-loading class="icon_loading" type="bars" color="#4397f1" :size="{ width: '50px', height: '50px' }" v-show="loadingShow"></vue-loading>
    <HelloWorld></HelloWorld>
    <div class="select-bg" v-if="isSelect" @touchmove.prevent @click="isSelect = false"></div>
  </div>
</template>
<script>
import { Toast, Popup, Swipe, SwipeItem, Loadmore } from "mint-ui";
import { Cascader, Select, Option } from "element-ui";
import HelloWorld from "@/components/HelloWorld.vue";
import { getAreaInfo } from "../../commonFunction/address2.js";
import router from "../router";
import store from "../store";
export default {
  name: "HomePage",
  components: {
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem,
    "mt-loadmore": Loadmore,
    "el-cascader": Cascader,
    "el-select": Select,
    "el-option": Option,
    "mt-popup": Popup,
    HelloWorld
  },
  data() {
    return {
      isIOS: false,
      isSelect: false,
      popupVisible: false,
      isCancelBtnClsFlagIndex: null,
      isCancelBtnClsFlag: false,
      active: false,
      ifSwipeLis: false,
      itemsIndex: null,
      itemsImgAll: [],
      itemImgArr: [],
      list: [],
      allOptions: [],
      allInfo: "",
      areasOptions: [],
      followId: "",
      commentContent: "",
      commentShow: false,
      commentCircleId: "",
      commentIndex: "",
      commentNumber: "",
      circleClassId: "",
      queryLoading: false,
      moreLoading: false,
      allLoaded: false,
      pageNum: 1,
      playStatus: false,
      controls: true,
      provinceId: "",
      cityId: "",
      areaId: "",
      loadingShow: false,
      selectAddress: "区域",
      locationLng: this.$store.state.lngLat.split(",")[0],
      locationLat: this.$store.state.lngLat.split(",")[1],
      currentUserId: "",
      url1: "",
      url2: "",
      reqUrl: "",
      reqUrlCrypt: "",
      reqSign: "",
      rspData: "",
      managerFlag: "",
      isFixed: false
    };
  },
  created: function() {
    this.currentUserId = this.$store.state.currentUserId;
    this.areasOptions = getAreaInfo();
    this.getAllOptions();
  },
  watch: {
    "$route.name": function(val) {
      if (val == "HomePage") {
        this.moreLoading = false;
        this.allLoaded = false;
        this.pageNum = 1;
        this.getIndexSelect(
          this.circleClassId,
          this.provinceId,
          this.cityId,
          this.areaId,
          this.locationLng,
          this.locationLat,
          this.pageNum
        );
      }
    },
    "$store.state.show": function(val) {
      if (val == true) {
        let _this = this;
        _this.getPreLogin();
        window["loginForResponse"] = function(url, urlCrypted, sign, avatar) {
          _this.loginForResponse(url, urlCrypted, sign, avatar);
        };
      }
    }
  },
  mounted() {
    let _this = this;
    _this.getManager();
    window["userHNInfoQryForResponse"] = function(managerFlag) {
      _this.userHNInfoQryForResponse(managerFlag);
    };
    _this.getPreLogin();
    window["loginForResponse"] = function(url, urlCrypted, sign, avatar) {
      _this.loginForResponse(url, urlCrypted, sign, avatar);
    };
    this.getLngLat();
    window["locationForResponse"] = function(lngLat) {
      let lng = lngLat.split(",")[0];
      let lat = lngLat.split(",")[1];
      _this.$store.state.lngLat = lngLat;
      _this.getAmapByLngAndLat(lng, lat);
    };
  },
  methods: {
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
      this.moreLoading = false;
      this.allLoaded = false;
      this.pageNum = 1;
      this.getIndexSelect(
        this.circleClassId,
        this.provinceId,
        this.cityId,
        this.areaId,
        this.locationLng,
        this.locationLat,
        1
      );
    },
    /*登陆集成*/
    getPreLogin() {
      let params = { url: location.href };
      this.$axios
        .post("http://circle-api.dotstable.com/app/user/preLogin", params)
        .then(res => {
          this.url1 = res.data;
          let u = navigator.userAgent;
          let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
          let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          let url = res.data.data.url;
          let urlCrypted = res.data.data.urlCrypted;
          let sign = res.data.data.sign;
          this.reqUrl = url;
          this.reqUrlCrypt = urlCrypted;
          this.reqSign = sign;
          if (isAndroid) {
            window.demo.clickOnAndroid(url, urlCrypted, sign);
          } else if (isIOS) {
            window.location.href =
              "objc://loginBank:/," + url + "," + urlCrypted + "," + sign;
          }
        });
    },
    /*惠农标识*/
    getManager() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.demo.userHNInfoQry();
      } else if (isIOS) {
        window.location.href = "objc://userHNInfoQry/";
      }
    },
    userHNInfoQryForResponse(managerFlag) {
      this.managerFlag = managerFlag;
    },
    /*提交后台*/
    loginForResponse(url, urlCrypted, sign, avatar) {
      let params = {
        url: url,
        data: urlCrypted,
        sign: sign,
        avatar: avatar,
        managerFlag: this.managerFlag
      };
      this.rspData = JSON.stringify(params);
      this.$axios
        .post("http://circle-api.dotstable.com/app/user/login", params)
        .then(res => {
          this.url2 = res.data.data.token;
          this.$store.state.userToken = this.url2;
          this.$store.state.currentUserId = res.data.data.currentUserId;
          this.currentUserId = res.data.data.currentUserId;

          let _this = this;
          _this.getIndexSelect(
            this.circleClassId,
            this.provinceId,
            this.cityId,
            this.areaId,
            this.locationLng,
            this.locationLat,
            1
          );
        });
    },
    /*逆向地理编码*/
    getAmapByLngAndLat(lng, lat) {
      this.locationLng = lng;
      this.locationLat = lat;
    },

    isVideoPlay(item, index) {
      this.list[index].isPlay = false;
      this.$set(this.list, index, this.list[index]);
    },
    /*视频播放*/
    videoPlay(event, index) {
      let video = document.getElementsByTagName("video");
      let _dom = event.path[0];
      if (this.list[index].isPlay) {
        event.path[0].pause();
        this.list[index].isPlay = false;
        this.$set(this.list, index, this.list[index]);
      } else {
        for (let i = 0; i < video.length; i++) {
          video[i].pause();
          this.list[i].isPlay = false;
          this.$set(this.list, i, this.list[i]);
        }
        _dom.play();
        this.list[index].isPlay = true;
        this.$set(this.list, index, this.list[index]);
      }
    },
    /*获取分类*/
    getAllOptions() {
      this.$axios
        .post("http://circle-api.dotstable.com/app/circle/classSelect")
        .then(res => {
          if (res.data.code == 0) {
            this.allOptions = res.data.data.records;
          } else {
            console.log(res.data.msg);
          }
        });
    },
    /*分类帅选*/
    handleSelect(key) {
      this.moreLoading = false;
      this.allLoaded = false;
      this.list = [];
      this.pageNum = 1;
      this.circleClassId = key;
      this.getIndexSelect(
        key,
        this.provinceId,
        this.cityId,
        this.areaId,
        this.locationLng,
        this.locationLat,
        1
      );
    },
    /*城市定位*/
    handleChange(value) {
      if(value.length == 3 || value.length == 0){
        this.isSelect = false;
      }
      this.provinceId = value[0];
      this.cityId = value[1];
      this.areaId = value[2];
      this.moreLoading = false;
      this.allLoaded = false;
      this.pageNum = 1;
      this.list = [];
      this.getIndexSelect(
        this.circleClassId,
        this.provinceId,
        this.cityId,
        this.areaId,
        this.locationLng,
        this.locationLat,
        1
      );
    },
    handleFocus(){
      this.isSelect = !this.isSelect;
    },
    /*定位并获取圈子*/
    getIndexSelect(classId, provinceId, cityId, areaId, lng, lat, current) {
      let params = {
        classId: classId,
        provinceId: provinceId,
        cityId: cityId,
        areaId: areaId,
        lng: lng,
        lat: lat,
        current: current,
        size: 6
      };
      this.loadingShow = true;
      this.$axios
        .post("http://circle-api.dotstable.com/app/circle/indexSelect", params)
        .then(res => {
          if (res.data.code == 0) {
            this.list = res.data.data.records;
            /*处理图片地址转化为字符串*/
            for (let i = 0; i < this.list.length; i++) {
              let imgArray = [];
              let imgLoopArray = [];
              let imgItem = { title: "惠农", url: null };
              this.list[i].isPlay = false;
              if (this.list[i].photoUrl != null) {
                imgArray = this.list[i].photoUrl.split(",");
                this.list[i]["imgArray"] = imgArray;
                for (let k = 0; k < imgArray.length; k++) {
                  imgItem.url = imgArray[k];
                  imgLoopArray.push(imgItem);
                }
                this.itemsImgAll[i] = imgLoopArray;
              }
            }
            this.loadingShow = false;
          } else {
            this.loadingShow = false;
          }
        })
        .catch(err => {
          this.loadingShow = false;
        });
    },

    /*加载更多*/
    loadMore() {
      console.log(this.circleClassId);
      // 防止多次加载
      if (this.allLoaded) {
        this.moreLoading = true;
        return;
      }
      if (this.queryLoading) {
        return;
      }
      this.moreLoading = !this.queryLoading;
      this.pageNum++;
      let params = {
        classId: this.circleClassId,
        provinceId: this.provinceId,
        cityId: this.cityId,
        areaId: this.areaId,
        lng: this.locationLng,
        lat: this.locationLat,
        current: this.pageNum,
        size: 9
      };
      this.$axios
        .post("http://circle-api.dotstable.com/app/circle/indexSelect", params)
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data.records.length !== 0) {
              this.list = this.list.concat(res.data.data.records);
              /*处理图片地址转化为字符串*/
              for (let i = 0; i < this.list.length; i++) {
                let imgArray = [];
                let imgLoopArray = [];
                let imgItem = { title: "惠农", url: null };
                if (this.list[i].photoUrl != null) {
                  imgArray = this.list[i].photoUrl.split(",");
                  this.list[i]["imgArray"] = imgArray;
                  for (let k = 0; k < imgArray.length; k++) {
                    imgItem.url = imgArray[k];
                    imgLoopArray.push(imgItem);
                  }
                  this.itemsImgAll[i] = imgLoopArray;
                }
              }
            } else {
              this.allLoaded = true;
            }
            this.moreLoading = this.allLoaded;
          } else {
            Toast({
              message: res.data.msg,
              duration: 2000
            });
            this.moreLoading = false;
          }
        })
        .catch(err => {
          this.moreLoading = false;
        });
    },

    /*是否关注*/
    followFun(i, id) {
      if (this.list[i].followerState == 0) {
        let params = {
          beUserId: id
        };
        this.$axios.post("http://circle-api.dotstable.com/app/circle/saveFollower", params)
          .then(res => {
            console.log("关注", res);
            if (res.data.code == 0) {
              Toast({
                message: res.data.msg,
                duration: 2000
              });
              this.list.forEach((item, index) => {
                if (item.userId == this.list[i].userId) {
                  item.followerState = 1;
                }
              });
            } else {
              console.log("关注失败", res.data.msg);
            }
          });
      } else if (this.list[i].followerState == 1) {
        this.isCancelBtnClsFlag = true;
        this.followId = id;
        this.isCancelBtnClsFlagIndex = i;
      }
    },
    canBtnDialogBBtn() {
      this.isCancelBtnClsFlag = false;
    },
    conBtnDialogBBtn(i, id) {
      console.log(id);
      console.log(i);
      let params = {
        beUserId: id
      };
      this.$axios
        .post(
          "http://circle-api.dotstable.com/app/circle/cancelFollower",
          params
        )
        .then(res => {
          console.log(res.data, "取消关注");
          this.isCancelBtnClsFlag = false;
          if (res.data.code == 0) {
            this.isCancelBtnClsFlag = false;
            this.list.forEach((item, index) => {
              if (item.userId == this.list[i].userId) {
                item.followerState = 0;
              }
            });
          } else {
            console.log(res.data.msg);
          }
        })
        .catch(err => {
          this.isCancelBtnClsFlag = false;
          console.log(res.data.msg);
        });
    },
    /*-----------------------------------------*/
    /*图片轮播*/
    imgSwipeBtn(item, i) {
      this.ifSwipeLis = true;
      this.itemsIndex = i;
      this.itemImgArr = item;
      document.body.style.overflow = "hidden";
    },
    /*关闭预览*/
    closeCls() {
      this.ifSwipeLis = false;
      document.body.style.overflow = "auto";
    },
    /*-----------------------------------------------*/
    /*点赞*/
    conBPraiseBtn(e, i, id) {
      let params = {
        circleId: id
      };
      this.$axios
        .post("http://circle-api.dotstable.com/app/circle/saveUpvote", params)
        .then(res => {
          if (res.data.code == 0) {
             if (Number(this.list[i].upvoteState) === 0) {
                this.list[i].upvoteNum = e + 1;
                this.list[i].upvoteState = 1;
              } else if (Number(this.list[i].upvoteState) === 1) {
                this.list[i].upvoteNum = e - 1;
                this.list[i].upvoteState = 0;
              }
          } else {
            console.log(res.data.msg);
          }
        });
    },
    /*评论*/
    conBInfoBtn(e, i, id) {
      this.commentShow = true;
      this.commentCircleId = id;
      this.commentIndex = i;
      this.commentNumber = e;
    },
    SendCircleComment(e, i, id) {
      let params = {
        circleId: id,
        reviewId: "",
        content: this.commentContent
      };
      this.$axios
        .post("http://circle-api.dotstable.com/app/circle/saveReview", params)
        .then(res => {
          if (res.data.code == 0) {
            this.commentShow = false;
            this.list[i].reviewNum = e + 1;
            this.commentContent = "";
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
    /*-----------------------------------------------------*/
    /*发布圈子*/
    goPublish(id) {
      this.$store.state.circleKindsId = id;
      this.$router.push({ path: "/ReleaseCircle", query: { classId: id } });
      this.cancelBtn();
    },
    /*圈子详情*/
    goCircleDetails(id) {
      this.$router.push({ path: "/CircleDetails", query: { circleId: id } });
    },
    /*他的圈子*/
    goHisCircle(userId) {
      if (userId == this.currentUserId) {
        this.$router.push({ path: "/MyCircle" });
      } else {
        this.$router.push({ path: "/HisCircle", query: { userId: userId } });
      }
    },
    /*------------------------------------------------------*/
    /*获取定位*/
    getLngLat() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.demo && window.demo.getLocationOnAndroid();
      } else if (isIOS) {
        this.isIOS = true
        window.location.href = "objc://getLocation/";
      }
    }
  },
  destroyed: function() {
    this.loadingShow = false;
  }
};
</script>
<style>
  .select-bg{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 66;
  }
.mint-tabbar > .mint-tab-item.is-selected {
  background: none;
}
.home-page {
  padding: 45px 0 50px 0;
  background-color: #ffffff;
}
.selArray {
  height: 30px;
  line-height: 30px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  position: fixed;
  background-color: #ffffff;
  z-index: 99;
  top: 0;
  border-bottom: 1px solid #e5e5e5;
  width: 100%;
  padding: 8px 0;
}

.selAll {
  flex: 1;
  position: relative;
  border-right: 1px solid #f4f4f4;
}
.selAll .el-input__inner {
  border: none;
  text-align: center;
  color: #666666;
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 13px;
}
.selAll .el-input__inner {
  text-align: center;
  font-size: 13px;
}
.selArray input::-webkit-input-placeholder {
  color: #666666;
  font-size: 14px;
}
.selArray input::-moz-placeholder {
  color: #666666;
  font-size: 14px;
}
.selArray input:-moz-placeholder {
  color: #666666;
  font-size: 14px;
}
.selArray input:-ms-input-placeholder {
  color: #666666;
  font-size: 14px;
}
.selAreas {
  flex: 1;
  text-align: center;
  position: relative;
}
.selAreas .el-input__inner {
  border: none;
  text-align: center;
  color: #666666;
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 13px;
}
.selAreas .el-cascader__label {
  text-align: center;
  font-size: 13px;
  padding-left: 5px;
}
.selAreas img {
  width: 11px;
  height: 6px;
  position: absolute;
  top: 50%;
  left: 65%;
  margin-left: -6px;
  margin-top: -3px;
}

/*圈子详情*/
/*left*/
.conDetails {
  padding: 17px 12px 15px 12px;
  border-bottom: 1px solid #f4f4f4;
  display: flex;
  display: -webkit-flex;
  position: relative;
  font-size: 14px;
}
.conDetails:last-child {
  border-bottom: none;
}
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

.conDeRDetails {
  text-align: left;
  margin-top: 14px;
  font-size: 15px;
  color: #333333;
  line-height: 20px;
  word-break: break-all;
}
.conDeRDetails span {
  color: #3590ec;
}
.conDeRImages {
  margin-top: 10px;
}

.conDeRImages .video-class {
  position: relative;
}
.conDeRImages .video-class img {
  width: 60px;
  height: 60px;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.conDeRImages img {
  width: 80px;
  height: 80px;
  margin-right: 5px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.conDeRImages video {
  width: 100%;
  margin: 0;
  padding: 0;
  height: 200px;
  background: #000;
}
  /*video::-webkit-media-controls-fullscreen-button {
    display: block!important;
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
.conDeRImages .VideoControls {
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

.folBtn img {
  width: 10px;
  height: 10px;
  position: absolute;
  top: 8px;
  left: 5px;
}

.conBottom {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  font-size: 12px;
  margin-top: 10px;
}

.conBaddress {
  flex: 1;
  color: #18b2f9;
}

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

.releaseCls {
  position: fixed;
  right: 20px;
  bottom: 100px;
  z-index: 59;
}

.releaseCls > img {
  width: 62px;
  height: 62px;
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

.swipeCls {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4)!important;
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
/* .mint-swipe-items-wrap > div.is-active{
    position: relative;
  } */
.swipeCls > img {
  width: 20px;
  height: 20px;
  position: fixed;
  top: 20px;
  left: 20px;
}

.conBInfoInput {
  width: 100%;
  margin-top: 5px;
}

.conBInfoInput textarea {
  width: 100%;
  padding: 2px 5px;
  border: 1px solid #eee;
  margin-right: 15px;
}

.cancelBtnCls {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6)!important;
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
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  color: #047bff;
}

.cancelBtnCls .canBtnDialog .canBtnDialogBottom span:nth-child(1) {
  border-right: 1px solid #efefef;
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
  border-top: 1px solid #4397f1;
  z-index: 889;
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
  padding: 7px 5px 0 5px;
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
.release-fade-enter-active {
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
}
.release-fade-leave-active {
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
}
.release-fade-enter {
  transform: translateX(50px);
  -webkit-transform: translateX(50px);
}
.release-fade-leave-to {
  transform: translateX(100px);
  -webkit-transform: translateX(100px);
}
.icon_loading {
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -25px !important;
  margin-top: -25px !important;
}
.emptyImg {
  width: 250px;
  opacity: 0.7;
}
</style>
