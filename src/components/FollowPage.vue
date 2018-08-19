<template>
  <div @click="bodyClickBtn">
    <!--<div class="topBar">
      <img src="../assets/ico_back.png" class="topBarOne" alt="返回按钮">关注
    </div>-->
    <div class="selArray">
      <div class="selAll">
        <el-select v-model="allInfo" placeholder="全部">
          <el-option
            v-for="item in allOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="selAreas">
        <div class="block">
          <el-cascader
            :options="areasOptions"
            v-model="selectedOptions"
            @change="handleChange">
          </el-cascader>
        </div>
      </div>
    </div>
    <div class="conDetails" v-for="(item,index) in list">
      <router-link to="/HisCircle">
        <img class="conDeLeft" :src="item.portrait" alt="">
      </router-link>
      <div class="conDeRight">
        <div v-if="item.followFlag" class="folBtn" @click="followFun(index)">关注</div>
        <div v-if="item.cancelFollowFlag" class="hasFoledBtn" @click="cancelFollowFun(index)">已关注</div>
        <div class="conDeRTop">{{item.name}}<img src="../assets/ico_manager.png" alt=""></div>
        <div class="conDeRTime">{{item.time}}<a href="#">{{item.quanzi}}</a></div>

        <router-link to="/CircleDetails">
          <div class="conDeRDetails">{{item.details}}</div>
        </router-link>
        <div class="conDeRImages">
          <img @click="imgSwipeBtn" v-for="(image,index) in item.images" :key="index" :src="image" alt="">
        </div>
        <div class="conBottom">
          <div class="conBaddress">{{item.conBaddress}}</div>
          <div class="conBInfo" @click.stop="conBInfoBtn(item.conBInfoNum,index)">
            <img src="../assets/ico_comment.png" alt="">
            {{item.conBInfoNum}}
          </div>
          <div class="conBPraise" @click="conBPraiseBtn(item.conBPraiseNum,index)">
            <img v-if="item.unPraise" src="../assets/ico_like.png" alt="">
            <img v-if="item.hasPraise" src="../assets/ico_like_xiao.png" alt="">
            {{item.conBPraiseNum}}
          </div>
        </div>
        <div class="conBInfoInput" v-if="item.isDesc">
          <textarea maxlength="200" @input="descInput" v-model="item.desc"/>
        </div>
      </div>
    </div>
    <div class="releaseCls" @click="releaseFun" v-if="ifReleaseBtn">
      <img src="../assets/ico_release.png" alt="">
    </div>
    <div class="releaseBg" v-if="isReleaseBg">
      <div class="relBgLis">
        <div class="relBgLsDetails">休闲娱乐
          <router-link to="/ReleaseCircle"><img src="../assets/ico_casual.png" alt=""></router-link>
        </div>
        <div class="relBgLsDetails">休闲娱乐
          <router-link to="/ReleaseCircle">
            <img src="../assets/ico_service.png" alt="">
          </router-link>
        </div>
        <div class="relBgLsDetails" @click="cancelBtn"><img src="../assets/ico_cancel.png" alt=""></div>
      </div>
    </div>
    <div v-if="ifSwipeLis" class="swipeCls">
      <div>
        <mt-swipe :auto="2000">
          <mt-swipe-item v-for="item in items" :key="item.id">
            <div rel="external nofollow">
              <img :src="item.url" class="swipeClsImg" style="width: 100%;"/>
              <span class="desc"></span>
            </div>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <img @click="closeCls" src="../assets/ico_close.png" alt="">
    </div>
    <div class="cancelBtnCls" v-if="isCancelBtnClsFlag">
      <div class="canBtnDialog">
        <div class="canBtnDialogTop">确认不再关注？</div>
        <div class="canBtnDialogBottom">
          <span @click="canBtnDialogBBtn">取消</span>
          <span @click="conBtnDialogBBtn">确认</span>
        </div>
      </div>
    </div>
    <div class="baseCls">停，到底了</div>
  </div>
</template>
<script>
  import imgUrl from "../assets/images.png"
  import imgUrl1 from "../assets/images1.png"
  import imgUrl2 from "../assets/images2.png"
  import imgUrl3 from "../assets/images3.png"
  import imgUrl4 from "../assets/images4.png"
  import imgPortrait1 from "../assets/portrait.png"
  import imgPortrait2 from "../assets/portrait2.png"
  import scroll1 from "../assets/scroll1.png"
  import {Swipe, SwipeItem} from 'mint-ui'
  export default {
    name: 'FollowPage',
    components: {
      'mt-swipe': Swipe,
      'mt-swipe-item': SwipeItem,
    },
    computed: {},
    data () {
      return {
        isCancelBtnClsFlagIndex:null,
        isCancelBtnClsFlag:false,
        active: false,
        ifSwipeLis: false,
        ifReleaseBtn: true,
        isReleaseBg: false,
        items: [{
          title: '你的名字', url: scroll1
        }, {
          title: '我的名字', url: imgUrl1
        }, {
          title: '我的名字', url: imgUrl2
        }, {
          title: '我的名字', url: imgUrl3
        }, {
          title: '我的名字', url: imgUrl4
        }],
        list: [{
          followFlag: true,
          cancelFollowFlag: false,
          name: '张涵予',
          time: '2018-06-08 18:23',
          quanzi: '娱乐休息圈子',
          details: '清明上河图，中国十大传世名画之一。为北宋风俗画，' +
          '北宋画家张择端仅见的存世精品，属国宝级文物，现藏于北京故宫博物馆',
          images: [imgUrl, imgUrl1, imgUrl2, imgUrl3, imgUrl4],
          conBInfoNum: 12,
          conBPraiseNum: 24,
          unPraise: true,
          hasPraise: false,
          desc: "@张涵予0",
          isDesc: false,
          portrait: imgPortrait1,
          conBaddress:"北京-故宫博物馆"
        }, {
          followFlag: true,
          cancelFollowFlag: false,
          name: '黎明',
          time: '2018-06-08 18:23',
          quanzi: '娱乐休息圈子',
          details: '清明上河图，中国十大传世名画之一。为北宋风俗画，' +
          '北宋画家张择端仅见的存世精品，属国宝级文物，现藏于北京故宫博物馆',
          images: [imgUrl, imgUrl1, imgUrl2, imgUrl3, imgUrl4],
          conBInfoNum: 10,
          conBPraiseNum: 20,
          unPraise: true,
          hasPraise: false,
          desc: "@黎明",
          isDesc: false,
          portrait: imgPortrait2,
          conBaddress:"北京-天安门广场"
        }],
        allOptions: [{
          value: '1',
          label: '生活服务'
        }, {
          value: '2',
          label: '休闲娱乐'
        }],
        allInfo: '',
        areasOptions: [{
          value: 'henna',
          label: '河南',
          children: [{
            value: 'zhengzhou',
            label: '郑州',
          }, {
            value: 'kaifeng',
            label: '开封',
          }]
        }],
        selectedOptions: []
      }
    },
    methods: {
      bodyClickBtn(){
        /*for(var i =0;i<this.list.length;i++){
         this.list[i].isDesc = false;
         }*/
      },
      followFun(i) {
        this.list[i].followFlag = !this.list[i].followFlag;
        this.list[i].cancelFollowFlag = !this.list[i].cancelFollowFlag;
        this.isCancelBtnClsFlagIndex = i;
      },
      cancelFollowFun(i){
        this.isCancelBtnClsFlag = true;
      },
      canBtnDialogBBtn(){
        this.isCancelBtnClsFlag = false;
      },
      conBtnDialogBBtn(){
        this.isCancelBtnClsFlag = false;
        this.list[this.isCancelBtnClsFlagIndex].followFlag = !this.list[this.isCancelBtnClsFlagIndex].followFlag;
        this.list[this.isCancelBtnClsFlagIndex].cancelFollowFlag = !this.list[this.isCancelBtnClsFlagIndex].cancelFollowFlag;
      },
      handleChange(value) {
        console.log(value);
      },
      releaseFun (){
        this.ifReleaseBtn = false;
        this.isReleaseBg = true;
      },
      cancelBtn (){
        this.ifReleaseBtn = true;
        this.isReleaseBg = false;
      },
      imgSwipeBtn (){
        this.ifSwipeLis = true;
      },
      closeCls (){
        this.ifSwipeLis = false;
      },
      conBPraiseBtn(e, i){
        if (this.list[i].unPraise) {
          this.list[i].conBPraiseNum = e + 1;
          this.list[i].unPraise = false;
          this.list[i].hasPraise = true;
        } else if (this.list[i].hasPraise) {
          this.list[i].conBPraiseNum = e - 1;
          this.list[i].unPraise = true;
          this.list[i].hasPraise = false;
        }
      },
      conBInfoBtn(e, i){
        this.list[i].isDesc = !this.list[i].isDesc;
      },
      descInput(){
      }
    }
  }
</script>
<style scoped>
  a:link {
    text-decoration: none;
    color: #000000;
  }

  a:visited {
    text-decoration: none;
    color: #000000;
  }

  a:hover {
    text-decoration: none;
    color: #000000;
  }

  .topBar {
    width: 100%;
    height: 64px;
    background-color: #0374e7;
    text-align: center;
    line-height: 80px;
    color: #fff;
    font-size: 16px;
    position: relative;
  }

  .topBarOne {
    width: 8px;
    height: 14px;
    position: absolute;
    bottom: 15px;
    left: 16px;
  }

  .selArray {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    display: -webkit-flex;
  }

  .selAll {
    flex: 1;
    -webkit-flex: 1;
    position: relative;
  }

  .selAreas {
    flex: 1;
     -webkit-flex: 1;
    text-align: center;
    position: relative;
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

  .conDeRTime {
    margin-top: 5px;
    font-size: 12px;
  }

  .conDetails {
    padding: 0 12px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    display: -webkit-flex;
    margin-top: 16px;
    padding-bottom: 10px;
    position: relative;
    font-size: 14px;
  }

  .conDetails .conDeLeft {
    width: 44px;
    height: 44px;
    padding-right: 10px;
  }

  .conDetails .conDeRight {
    flex: 5;
    -webkit-flex: 5;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
  }
  .conDeRight .conDeRTop {
    position: relative;
  }
  .conDeRight .conDeRTop img{
    width: 14px;
    height: 14px;
    position: absolute;
    top: 3px;
    left: 45px;
  }
  .conDeRDetails {
    text-align: left;
    margin-top: 10px;
  }

  .conDeRImages {
    margin-top: 10px;
  }

  .conDeRImages img {
    width: 80px;
    height: 80px;
    margin-right: 5px;
  }

  .folBtn {
    width: 50px;
    height: 20px;
    line-height: 20px;
    padding: 3px 5px;
    text-align: center;
    color: #1577e4;
    position: absolute;
    top: 0;
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
    color: #9E9E9E;
    position: absolute;
    top: 0;
    right: 15px;
    border: 1px solid #9E9E9E;
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
     -webkit-flex: 1;
    color: #18b2f9;
  }

  .conBInfo {
    width: 35px;
    position: relative;
    padding-right: 10px;
    text-align: right;
  }

  .conBInfo img {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 0;
    left: 0px;
  }

  .conBPraise {
    width: 35px;
    position: relative;
    padding-right: 10px;
    text-align: right;
  }

  .conBPraise img {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .releaseCls {
    position: fixed;
    right: 20px;
    bottom: 100px;
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
  }

  .relBgLis {
    position: fixed;
    right: 20px;
    bottom: 200px;
    color: #ffffff;
    line-height: 30px;
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 12;
  }

  .swipeCls > div {
    width: 100%;
    height: 200px;
    position: absolute;
    top: 50%;
    margin-top: -100px;
  }

  .swipeCls > img {
    width: 20px;
    height: 20px;
    position: fixed;
    top: 10px;
    left: 10px;
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
    background-color: #ddd;color: #999;
  }
</style>
