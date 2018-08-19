<template>
  <div style="position: relative;height: 100%">
    <div class="releaseCircle" v-if="isBlo" style="height: 90%;overflow: auto">
      <div :class="{none:isNone}">
        <div class="rCInput">
          <textarea maxlength="500" v-model="textareaInput" placeholder="此刻的想法..." id="circleInput" />
        </div>
        <!--上传图片-->
        <div class="rCImages">
          <img v-if="imgList.length>0" v-for="(item,index) in imgList" :src="item" @click="scalePicture(item,index)" :key="index">
          <div v-if="videoUrl.length>0" class="videoBox">
            <video :src="videoUrl[1]" x-webkit-airplay="true" :poster="videoUrl[0]" :autoplay="playStatus" preload="none" @click="videoPlay($event)" controls controlslist="nodownload" x5-video-player-type="h5" playsinline webkit-playsinline>
              您的浏览器不支持 video 标签。
            </video>
            <img src="../assets/ico_del.png" class="delVideo" @click="delVideo">
          </div>
          <img src="../assets/pic_add.png" @click.prevent="uploadFile" v-if="upLoadIsSHow && videoUrl.length === 0">
        </div>

        <!--选取地址-->
        <div class="rCAddressCls" @click="getMoreAdddress">
          <img class="addressIco" src="../assets/ico_position.png" alt="">
          <div>{{addressInfo}}</div>
          <img class="addressMore" src="../assets/ico_more.png" alt="">
        </div>

        <!-- 地址选项 -->
        <transition name="slide-top">
          <div v-if="isAddress" class="selectAddress">
            <div class="canConBtn">
              <span @click="cancelBtnFuc" class="cancelBtn">取消</span>
              <span @click="confirmBtnFuc" class="confirmBtn">确定</span>
            </div>
            <mt-picker :slots="slots" showToolBar="true" value-key="name" @change="onValuesChange">
            </mt-picker>
          </div>
        </transition>

        <!-- 选取标签 -->
        <div class="rCAddressCls" style="margin-bottom: 50px;" @click="addNext">
          <img class="addressIco biaoqian" src="../assets/ico_label.png" alt="">
          <div>{{info}}</div>
          <img class="addressMore" src="../assets/ico_more.png" alt="">
        </div>
        <!--发表圈子 -->
        <div class="releaseBtn" @click="publishCircle">发表</div>
      </div>

      <!-- 照片预览 -->
      <div class="swipeCls scaleImgBox" v-bind:class="{none:!isNone}">
        <div style="height:100%;position: relative;">
          <img :src="imgList[itemsIndex]" style="width: 100%;position:absolute;margin: auto;top: 0;left: 0;bottom: 0;right: 0;" v-if="imgList.length>0">
          <img src="../assets/ico_del.png" class="delIcon" @click="delImgUrl">
        </div>
        <img class="closeCls" @click.self="closeCls" src="../assets/ico_close.png" alt="">
      </div>

      <!--背景-->
      <div class="Mask" v-if="isupload" @touchmove.prevent></div>
      <div class="Mask2" v-if="isAddress"></div>
      <div class="loadingMask" v-if="loadingShow"></div>
    </div>
    <div v-if="!isBlo">
      <router-view />
    </div>
    <vue-loading class="icon_loading" type="bars" color="#4397f1" :size="{ width: '50px', height: '50px' }" v-show="loadingShow"></vue-loading>

    <!--调取相机视频-->
    <transition name="slide-fade">
      <div v-if="isupload" class="UploadVideoImg">
        <div class="UploadVideoImg-video" @click="uploadConfirmBtnVideo">
          拍摄视频
        </div>
        <div class="UploadVideoImg-img" @click="uploadConfirmBtnCamera">
          拍照
        </div>
        <div class="UploadVideoImg-img" @click="uploadConfirmBtnImg">
          从手机相册中拉取
        </div>
        <div class="UploadVideoImg-no" @click="uploadCancelBtnFuc">
          取消
        </div>
      </div>
    </transition>
  </div>

</template>
<script>
import { Toast, Picker } from "mint-ui";
import { getAreaInfo } from "../../commonFunction/address.js";
//获取地理位置信息
const address = getAreaInfo();
const transParams = new Object();
export default {
  name: "ReleaseCircle",
  data() {
    return {
      isBlo: true,
      isupload: false, //上传
      imgUrl: [],
      videoUrl: [],
      playStatus: false,
      imgList: [],
      upLoadIsSHow: true,

      isAddress: false, //地址
      myAdress: null,
      addressInfo: "所在位置",
      addressId: "",
      textareaInput: "",
      addressArry: [],
      address1: [],
      addressIdArr: [],
      info: this.$store.state.getTabLabel,
      tagId: this.$store.state.tableId,
      classIdValues: "",
      itemsIndex: 0,
      isNone: false,
      loadingShow: false,
      slots: [
        {
          flex: 1,
          values: address[0].childs,
          defaultIndex: 0,
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: address[0].childs[0].childs,
          defaultIndex: 10,
          className: "slot5",
          textAlign: "center"
        }
      ]
    };
  },
  components: {
    "mt-picker": Picker
  },
  created: function() {
    /*上传文件原生回调*/
    let _this = this;
    window["getImgUrl"] = function(imgUrl) {
      _this.getImgUrl(imgUrl);
    };
    window["getVideoUrl"] = function(videoUrl) {
      _this.getVideoUrl(videoUrl);
    };
  },
  mounted() {
    /*分类id*/
    this.classIdValues = this.$route.query.classId;
    this.demo();
  },
  watch: {
    "$route.name": function(val) {
      if (val == "ReleaseCircle") {
        this.isBlo = true;
      } else {
        this.isBlo = false;
      }
    },
    "$store.state.getTabLabel": function(val) {
      this.info = val;
    },
    "$store.state.tableId": function(val) {
      this.tagId = val;
    },
    imgList(val){
      if(val.length >= 9){
        this.upLoadIsSHow = false
      }
    }
  },
  methods: {
    addNext() {
      this.$router.push({ path: "/ReleaseCircle/SelectorLabel" });
    },
    /*获取经纬度*/
    demo() {
      let _this = this;
      transParams.lng = this.$store.state.lngLat.split(",")[0];
      transParams.lat = this.$store.state.lngLat.split(",")[1];
      let params = {
        lng: this.$store.state.lngLat.split(",")[0],
        lat: this.$store.state.lngLat.split(",")[1]
      };
      _this.$axios
        .post(
          "http://circle-api.dotstable.com/app/amap/getAmapByLngAndLat",
          params
        )
        .then(res => {
          if (res.data.code == 0) {
            _this.addressInfo = res.data.data.address;
            transParams.provinceId = res.data.data.provinceId;
            transParams.cityId = res.data.data.cityId;
            transParams.areaId = res.data.data.areaId;
            transParams.address = res.data.data.address;
          } else {
            _this.addressInfo = "请点击选择位置";
          }
        });
    },
    /*---------------------------------------*/
    /*调取地址*/
    getMoreAdddress() {
      this.isAddress = true;
    },
    /*取消地址*/
    cancelBtnFuc() {
      this.isAddress = false;
    },
    /*选择地址*/
    confirmBtnFuc() {
      this.isAddress = false;
      let _this = this;
      AMap.plugin("AMap.DistrictSearch", function(cityName) {
        let districtSearch = new AMap.DistrictSearch({
          // 关键字对应的行政区级别，country表示国家
          level: "city",
          //  显示下级行政区级数，1表示返回下一级行政区
          subdistrict: 2
        });
        // 搜索所有省/直辖市信息
        districtSearch.search("河南省", function(status, result) {
          // 查询成功时，result即为对应的行政区信息
          transParams.provinceId = result.districtList[0].adcode; //省ID
          let cityArray = result.districtList[0].districtList;
          for (let i = 0; i < cityArray.length; i++) {
            if (_this.addressArry[0].name == cityArray[i].name) {
              transParams.lng = cityArray[i].center.lng;
              transParams.lat = cityArray[i].center.lat;
              transParams.cityId = cityArray[i].adcode;
              // transParams.areaId =
              for (let j = 0; j < cityArray[i].districtList.length; j++) {
                if (
                  _this.addressArry[1].name == cityArray[i].districtList[j].name
                ) {
                  transParams.areaId = cityArray[i].districtList[j].adcode;
                }
              }
            }
          }
        });
      });
    },
    /*获取地址*/
    onValuesChange(picker, values) {
      this.addressArry = values;
      if (!values[0]) {
        this.$nextTick(() => {
          if (this.myAdress) {
            // 赋默认值
          } else {
            console.log("object");
            picker.setValues([address[0].childs, address[0].childs[0].childs]);
            this.addressInfo =
              address[0].name +
              "-" +
              address[0].childs[0].name +
              "-" +
              address[0].childs[0].childs[0].name;
            transParams.address = this.addressInfo;
            transParams.cityId = address[0].childs[0].code;
            transParams.areaId = address[0].childs[0].childs[0].code;
          }
        });
      } else {
        let _this = this;
        _this.addressInfo =
          address[0].name +
          "-" +
          _this.addressArry[0].name +
          "-" +
          _this.addressArry[1].name;
        console.log(this.addressArry);
        let cityName = _this.addressArry[0].name;
        console.log(cityName, "cityName");

        transParams.address = this.addressInfo;
        transParams.cityId = this.addressArry[0].code;
        transParams.areaId = this.addressArry[1].code;
        picker.setSlotValues(1, values[0].childs);
        let town = [];
        if (values[1]) {
          town = values[1].childs;
        }
        picker.setSlotValues(2, town);
      }
    },
    /*--------------------------------*/
    /*显示调取原生按钮*/
    uploadFile() {
      this.isupload = true;
    },
    /*取消*/
    uploadCancelBtnFuc() {
      this.isupload = false;
    },
    /*确定交互*/
    uploadConfirmBtnVideo() {
      if (this.imgList.length > 0) {
        Toast({
          message: "请您选择相册或拍照",
          duration: 1000
        });
        return;
      } else if (this.videoUrl.length > 0) {
        Toast({
          message: "只能选择单个视频",
          duration: 1000
        });
        return;
      }
      this.isupload = false;
      let u = navigator.userAgent;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.demo.goVideo();
      } else if (isIOS) {
        location.href = "objc://goVideo";
      }
    },
    uploadConfirmBtnImg() {
      if (this.videoUrl.length > 0) {
        Toast({
          message: "请您选择视频",
          duration: 1000
        });
        return;
      }
      this.isupload = false;
      let u = navigator.userAgent;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.demo.goPicture();
      } else if (isIOS) {
        location.href = "objc://goPicture";
      }
    },
    uploadConfirmBtnCamera() {
      if (this.videoUrl.length > 0) {
        Toast({
          message: "请您选择视频",
          duration: 1000
        });
        return;
      }
      this.isupload = false;
      let u = navigator.userAgent;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.demo.goCamera();
      } else if (isIOS) {
        location.href = "objc://goCamera";
      }
    },
    /*填充图片*/
    getImgUrl(imgUrl) {
      this.imgUrl = imgUrl.split("*");
      let imgListNum = this.imgList.length + this.imgUrl.length;
      if (imgListNum > 9) {
        Toast({
          message: "上传图片不能大于9张",
          duration: 1000
        });
      } else if (imgListNum == 9) {
        this.upLoadIsSHow = false;
        this.imgList = this.imgList.concat(this.imgUrl);
      } else {
        this.imgList = this.imgList.concat(this.imgUrl);
      }
    },
    //获得视频url
    getVideoUrl(videoUrl) {
      this.videoUrl = videoUrl.split("*");
    },
    /*--------------------------------*/
    /*视频播放*/
    videoPlay(event) {
      let _dom = event.target;
      _dom.pause();
    },
    /*删除视频*/
    delVideo() {
      this.videoUrl = [];
    },
    /*删除图片*/
    delImgUrl() {
      this.isNone = false;
      if (this.itemsIndex != 0 && this.itemsIndex) {
        this.imgList.splice(this.itemsIndex, 1);
        this.itemsIndex = 0;
      } else {
        this.imgList.splice(0, 1);
        if (this.imgList.length == 0) {
          this.imgList = [];
        }
      }
      if (this.imgList.length < 9) {
        this.upLoadIsSHow = true;
      }
    },
    /*点击放大图片*/
    scalePicture(item, index) {
      this.isNone = true;
      this.itemsIndex = index;
    },
    /*关闭*/
    closeCls() {
      this.isNone = false;
    },
    /*--------------------------------*/
    /*发布圈子*/
    publishCircle() {
      if (!this.textareaInput) {
        Toast({
          message: "请填写您的想法",
          duration: 1000
        });
        return;
      }
      if (!this.tagId) {
        Toast({
          message: "选择您的心情标签",
          duration: 1000
        });
        return;
      }
      if (!this.classIdValues) {
        this.classIdValues = this.$store.state.circleKindsId;
      }
      transParams.classId = this.classIdValues;
      transParams.tabId = this.tagId;
      transParams.content = this.textareaInput;
      let photoUrl = "";
      if (this.imgList.length > 0) {
        for (let i = 0; i < this.imgList.length; i++) {
          photoUrl += this.imgList[i].split("base64,")[1] + ",";
        }
        transParams.photoUrl = photoUrl;
        /*transParams.photoUrl = photoUrl.substring(0, photoUrl.length-1);*/
      } else {
        this.imgList = "";
        transParams.photoUrl = this.imgList;
      }
      if (this.videoUrl.length > 0) {
        transParams.previewUrl = this.videoUrl[0].split("base64,")[1];
        transParams.videoUrl = this.videoUrl[1].split("base64,")[1];
      } else {
        transParams.previewUrl = "";
        transParams.videoUrl = "";
      }
      this.loadingShow = true;
      this.$axios
        .post("http://circle-api.dotstable.com/app/circle/publish", transParams)
        .then(res => {
          if (res.data.code == 0) {
            /*获得上传文件签名*/
            if (this.imgList.length > 0) {
              let params = { type: 1 };
              this.$axios
                .post(
                  "http://circle-api.dotstable.com/app/file/getUploadSign",
                  params
                )
                .then(res => {
                  if (res.data.code == 0) {
                    console.log(res.data.msg);
                  } else {
                    console.log(res.data.msg);
                  }
                });
            } else if (this.videoUrl.length > 0) {
              let params = { type: 2 };
              this.$axios
                .post(
                  "http://circle-api.dotstable.com/app/file/getUploadSign",
                  params
                )
                .then(res => {
                  if (res.data.code == 0) {
                    console.log(res.data.msg);
                  } else {
                    console.log(res.data.msg);
                  }
                });
            } else {
              let params = { type: 3 };
              this.$axios
                .post(
                  "http://circle-api.dotstable.com/app/file/getUploadSign",
                  params
                )
                .then(res => {
                  if (res.data.code == 0) {
                    console.log(res.data.msg);
                  } else {
                    console.log(res.data.msg);
                  }
                });
            }
            this.loadingShow = false;
            Toast({
              message: res.data.msg,
              duration: 2000
            });
            this.$store.state.getTabLabel = "请选择心情标签";
            this.$store.state.tableId = "";
            this.$router.push({ path: "/" });
          } else if (res.data.code == 20003) {
            this.loadingShow = false;
            Toast({
              message: res.data.msg,
              duration: 2000
            });
          } else {
            this.loadingShow = false;
            Toast({
              message: res.data.msg,
              duration: 2000
            });
          }
        })
        .catch(err => {
          this.loadingShow = false;
          Toast({
            message: res.data.msg,
            duration: 2000
          });
        });
    }
  }
};
</script>
<style scoped>
.none {
  display: none;
}
.releaseCircle {
  padding-bottom: 50px;
}
/*发表按钮*/
.releaseBtn {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 45px;
  line-height: 45px;
  background-color: #0374e7;
  font-size: 17px;
  text-align: center;
  color: #fff;
}
/*发表内容*/
.rCInput {
  width: 84%;
  margin: auto;
  padding-top: 20px;
}
.rCInput textarea {
  width: 98%;
  height: 120px;
  margin: 0;
  border: none;
  outline: none;
  resize: none;
  font-size: 15px;
}
.rCInput textarea::-webkit-input-placeholder {
  color: #cccccc;
}
.rCInput textarea:-moz-placeholder {
  color: #cccccc;
}
.rCInput textarea::-moz-placeholder {
  color: #cccccc;
}
.rCInput textarea:-ms-input-placeholder {
  color: #cccccc;
}
/*发表图片*/
.rCImages {
  padding: 20px 40px 20px 30px;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  border-bottom: 1px solid #f5f5f5;
}
.rCImages img {
  width: 94px;
  height: 94px;
  margin: 2px;
  border-radius: 3px;
}
.rCImages video {
  width: 100%;
  text-align: left;
  border-radius: 3px;
}
.rCImages .videoBox {
  position: relative;
}
.rCImages .videoBox .delVideo {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
}
/*下弹出框*/
.selectAddress {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  position: fixed;
  z-index: 4;
  bottom: 0;
}
.canConBtn {
  height: 50px;
  line-height: 50px;
  background-color: #ffffff;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 179px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  border-bottom: 1px solid #f4f4f4;
  font-size: 15px;
  z-index: 888;
}
.cancelBtn {
  width: 50px;
  margin-left: 15px;
  color: #000;
  text-align: center;
}
.confirmBtn {
  width: 50px;
  margin-right: 15px;
  color: #0374e7;
  text-align: center;
}
.pickerClsBg .picker {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
}
.rCAddressCls {
  display: flex;
  display: -webkit-flex;
  position: relative;
  border-bottom: 1px solid #f5f5f5;
  padding: 10px 0;
  line-height: 40px;
  font-size: 15px;
  color: #333333;
}
.biaoqian {
  width: 17px !important;
  height: 17px !important;
}
.rCAddressCls .addressIco {
  width: 14px;
  height: 17px;
  margin-left: 30px;
  margin-right: 10px;
  margin-top: 10px;
}
.rCAddressCls .addressMore {
  width: 6px;
  height: 10px;
  position: absolute;
  top: 25px;
  right: 20px;
}
#amap-demo1 {
  height: 300px;
  margin-bottom: 20px;
  margin-top: -30px;
}
.scaleImgBox {
  position: relative;
}

.swipeCls {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1222;
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
.swipeCls .closeCls {
  width: 20px;
  height: 20px;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 999;
}
.delIcon {
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 10%;
  right: 10%;
}
.UploadVideoImg {
  height: auto;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
}
.UploadVideoImg > div {
  height: 50px;
  background-color: #ffffff;
  font-size: 17px;
  color: #333333;
  text-align: center;
}
.UploadVideoImg .UploadVideoImg-video {
  height: 50px;
  line-height: 50px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
}
.UploadVideoImg .UploadVideoImg-img {
  line-height: 50px;
  border-top: 1px solid #f4f4f4;
}
.UploadVideoImg .UploadVideoImg-no {
  line-height: 50px;
  /*margin-top: 5px;*/
  border-top: 5px solid #cccccc;
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
.slide-top-enter-active {
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
}
.slide-top-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  -webkit-transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-top-enter,
.slide-top-leave-to {
  transform: translateY(400px);
  -webkit-transform: translateY(400px);
}
.Mask {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
.Mask2 {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
.icon_loading {
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -25px !important;
  margin-top: -25px !important;
  z-index: 333;
}
.loadingMask {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 33;
}
</style>
