<template>
  <div class="selectorLabel">
    <div class="sLCls">
      <div class="sLClsTitle">请选择心情标签</div>
      <div class="sLClsList" v-for="(item,index) in list" @click="selListBar(index)">
        <img class="sLClsLeft" src="../assets/ico_newlable.png" alt="">
        <div class="sLClsCenter">
          <div>{{item.tagTitle}}</div>
          <!--<div>{{item.tilDetails}}</div>-->
        </div>
        <img v-if="item.isSLabelFlag" class="sLClsRight" src="../assets/nochose.png" alt="">
        <img v-else class="sLClsRight" src="../assets/choseone.png" alt="">
      </div>
    </div>
    <div class="sLClsBtn" @click="selectTag">确定</div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  export default{
    name: 'SelectorLabel',
    components: {
    },
    data(){
      return {
        isSLabelFlagIndex: null,
        list: [],
        getTabLabel:'',
        tableId:'',
      }
    },
    created: function () {
      this.getTabSelect();
    },

    methods: {
      /*标签列表*/
      getTabSelect(){
        this.$axios.post("http://circle-api.dotstable.com/app/circle/tabSelect").then(res => {
          for(let i=0;i<res.data.data.records.length;i++){
            let jsonObj = {tagTitle:null,id:"",isSLabelFlag:true};
            jsonObj.tagTitle = res.data.data.records[i].name;
            jsonObj.id = res.data.data.records[i].id;
            this.list.push(jsonObj);
          }
        });
      },
      /*选择标签*/
      selListBar(i){
        var _this = this;
        if(this.list[i].isSLabelFlag == false){
          this.list[i].isSLabelFlag = true;
        }else{
          if(this.list[i].isSLabelFlag){
            this.getTabLabel = this.list[i].tagTitle;
            this.tableId = this.list[i].id;
          }else{
            this.getTabLabel =this.list[0].tagTitle;
            this.tableId = this.list[0].id;
          }
          for (var k =0;k < _this.list.length;k++){
            _this.list[k].isSLabelFlag = true;
          }
          this.list[i].isSLabelFlag = !this.list[i].isSLabelFlag;
        }
      },
      /*确定标签*/
      selectTag(){
        if(this.getTabLabel == '' || this.tableId == ''){
          Toast({
            message: '请选择心情标签',
            duration: 1000
          });
          return
        }
        this.$store.state.getTabLabel = this.getTabLabel;
        this.$store.state.tableId = this.tableId;
        this.$router.push({path:'/ReleaseCircle'})
      },
    }
  }
</script>
<style scoped>
  .sLCls {
    margin: 22px 20px;
  }
  .sLCls .sLClsTitle {
    text-align: left;
    font-size: 14px;
    color: #333333;
    margin-bottom: 5px;
  }
  .sLClsList {
    display: flex;
    display: -webkit-flex;
    position: relative;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 9px;
    margin: 5px 0;
  }
  .sLClsList .sLClsLeft{
    width: 37px;
    height: 37px;
  }
  .sLClsList .sLClsCenter {
    margin-left: 10px;
    line-height: 37px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
  }
  .sLClsList .sLClsCenter div:nth-child(1){
    color: #333333;
    font-size: 14px;
    line-height: 20px;
  }
  .sLClsList .sLClsCenter div:nth-child(2){
    color: #A0A0A0;
    font-size: 10px;
    line-height: 15px;
  }
  .sLClsList .sLClsRight {
    width: 15px;
    height: 15px;
    position:absolute;
    top: 20px;
    right: 10px;
  }
  .sLClsBtn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #ffffff;
    font-size: 15px;
    background-color: #0374e7;
  }
</style>
