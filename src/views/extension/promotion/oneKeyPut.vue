<template>
  <!-- 一键上下架 -->
  <div class="oneKeyPut-box">
    <div class="oneKeyPut-box1">
      已选择 {{ total }} 套房源
    </div>
    <div class="oneKeyPut-box2">
      <div v-if="oneKeyPutType==1" class="oneKeyPut-box2-title">上架渠道</div>
      <div v-if="oneKeyPutType==2" class="oneKeyPut-box2-title">下架渠道</div>
      <ul class="oneKeyPut-platfrom" style="margin-top: 14px;">
        <li v-for="(item) in platformList" class="cursor f-clearfix" :class="selectedPlatform.indexOf(item.platform)>-1?'selectedStyle':'unSelectedStyle'" @click="changeSelectedPlatform(item.platform)"  v-if="item.status==1">
          <div class="clearfix" style="width: 480px;height: 100%;padding: 0 15px;">
            <div class="f-fl itemBox">
              <img class="itemBox" style="width: 24px;height: 24px;" v-if="item.platform==1" src="../../../assets/extension/promotion-gwgw.png" >
              <img class="itemBox" style="width: 24px;height: 24px;" v-if="item.platform==2" src="../../../assets/extension/promotion-58.png" >
              <img class="itemBox" style="width: 24px;height: 24px;" v-if="item.platform==3" src="../../../assets/extension/promotion-58gg.png" >
              <img class="itemBox" style="width: 24px;height: 24px;" v-if="item.platform==4" src="../../../assets/extension/promotion-xy.png" >
              <img class="itemBox" style="width: 24px;height: 24px;" v-if="item.platform==5" src="../../../assets/extension/promotion-bk.png" >
            </div>
            <div class="f-fl itemBox" v-if="item.platform==1" style="margin-left: 10px;line-height: 48px;color: #111111;">官网/官微</div>
            <div class="f-fl itemBox" v-if="item.platform==2" style="margin-left: 10px;line-height: 48px;color: #111111;">58租房</div>
            <div class="f-fl itemBox" v-if="item.platform==3" style="margin-left: 10px;line-height: 48px;color: #111111;">58公寓馆</div>
            <div class="f-fl itemBox" v-if="item.platform==4" style="margin-left: 10px;line-height: 48px;color: #111111;">闲鱼租房</div>
            <div class="f-fl itemBox" v-if="item.platform==5" style="margin-left: 10px;line-height: 48px;color: #111111;">贝壳租房</div>
            <div class="unCheckStyle itemBox f-fr" v-if="selectedPlatform.indexOf(item.platform)==-1">
              <icon-font class="itemBox" type="iconyumengtubiao_duoxuan-weixuanze" />
            </div>
            <div class="checkStyle itemBox f-fr" v-if="selectedPlatform.indexOf(item.platform)>-1">
              <icon-font class="itemBox" type="iconyumengtubiao_duoxuan-yixuanze" />
            </div>
          </div>
        </li>
      </ul>
      <div class="clearfix">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelOneKeyPut">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="oneKeyPut" :loading="saveLoading">
            {{oneKeyPutType==2?'确定下架':'确定上架'}}
          </a-button>
        </div>
      </div>
    </div>
    <!-- 一键上下架成功提示页面 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="oneKeyPutSuccessDialog" class="ownModalBorder titDialog" :title="oneKeyPutSuccessTitle" @cancel="colseThis">
      <one-key-put-success :total="total" :selectedPlatformName="selectedPlatformName" :oneKeyPutType="oneKeyPutType" @colseThis="colseThis"></one-key-put-success>
    </a-modal>
  </div>
</template>

<script>
import * as API from "@/api/extension";
import oneKeyPutSuccess from './oneKeyPutSuccess';

export default {
  name: "oneKeyPut",
  components: {
    oneKeyPutSuccess,
  },
  props: {
    oneKeyPutType: {
      type: Number,
      required: true,
    },
    total:{
      type:Number,
    },
    sendData:{
      type:Object,
    },
    clickPlatform:{
      Type:Number,
      default:1,
    },
    selectedRowKeys:{
      Type:Array,
    },
    checkAllFlag:{
      Type:Boolean,
    }
  },
  data() {
    return {
      platformList:[],
      saveLoading:false,
      selectedPlatform:[],
      oneKeyPutSuccessDialog:false,
      oneKeyPutSuccessTitle:'批量上架',
      selectedPlatformName:'',
    }
  },
  created() {
    this.selectedPlatform.push(this.clickPlatform);
    let selectNames = [];
    selectNames.push('官网/官微');
    this.selectedPlatformName = selectNames.join('、');
    this.promotionListPlatform();
  },
  methods: {
    colseThis(){
      this.$emit('colseThis');
    },
    cancelOneKeyPut(){
      this.$emit('cancelOneKeyPut');
    },
    oneKeyPut(){
      let typeName = this.oneKeyPutType==1?'上架':'下架';
      if(this.selectedPlatform.length==0){
        this.$message.warning('请选择要'+typeName+'平台');
        return ;
      }
      if(this.checkAllFlag){
        let parameter = Object.assign({},this.sendData);
        parameter.selectedPlatform = this.selectedPlatform;
        if(this.oneKeyPutType == 1){
          //一键上架
          API.promotionHouseOneKeyPutOn(parameter).then(res => {
          });
        }
        else if(this.oneKeyPutType == 2){
          //一键下架
          API.promotionHouseOneKeyPutOff(parameter).then(res => {
          });
        }
      }
      else{
        let parameter = {
          houseIdList: this.selectedRowKeys,
          platformList: this.selectedPlatform,
        };
        if(this.oneKeyPutType == 1) {
          API.promotionHouseListPutOn(parameter).then(res => {
          });
        }
        else if(this.oneKeyPutType == 2){
          API.promotionHouseListOffShelf(parameter).then(res => {
          });
        }
      }

      //跳转
      this.oneKeyPutSuccessDialog = true;
      this.oneKeyPutSuccessTitle = '批量'+typeName;
      let selectNames= [];
      this.selectedPlatform.forEach((item)=>{
        if(item==1){
          selectNames.push('官网/官微');
        }
        else if(item==2){
          selectNames.push('58租房');
        }
        else if(item==3){
          selectNames.push('58品牌公寓馆');
        }
        else if(item==4){
          selectNames.push('闲鱼租房');
        }
        else if(item==5){
          selectNames.push('贝壳租房');
        }
      })
      this.selectedPlatformName = selectNames.join('、')
    },
    changeSelectedPlatform(val){
      let pos = this.selectedPlatform.indexOf(val);
      if(pos>-1){
        this.selectedPlatform.splice(pos,1);
      }
      else{
        this.selectedPlatform.push(val);
      }
    },
    promotionListPlatform(){
      API.promotionListPlatform().then(res => {
        if (res&&res.code === "200") {
          if(res.data == null){
            this.platformList = [];
          }else{
            this.platformList = res.data;
          }
        }
      })
    },
  },
  filters: {
  }
}
</script>

<style lang="less" scoped>
  .oneKeyPut-box{
    .oneKeyPut-box1{
      font-size: 16px;
      color: #111111;
      height:40px;
      line-height: 40px;
      background:rgba(233,241,255,0.99);
      padding-left: 20px;
    }
    .oneKeyPut-box2{
      padding: 20px;
      .oneKeyPut-box2-title{
        margin-top: 4px;
        font-weight:500;
        color: #111111;
        font-size: 18px;
      }
      .oneKeyPut-platfrom{
        .selectedStyle {
          background:rgba(10,135,248,0.06);
          border:1px solid rgba(10,135,248,0.3);
          svg{
            color: #0A87F8;
          }
        }
        .unSelectedStyle {
          border:1px solid rgba(238,238,238,1);
          background:#ffffff;
          svg {
            color: #777777;
          }
        }
        li{
          width: 480px;
          height: 50px;
          line-height: 50px;
          font-size: 14px;
          font-weight: 500;
          border-radius:4px;
          margin-bottom: 10px;
          .unCheckStyle{
            color:#777777;
            svg{
              width: 18px;
              height: 18px;
            }
          }
          .checkStyle{
            color: #0A87F8;
            svg{
              width: 18px;
              height: 18px;
            }
          }
        }
        .unSelectedStyle :hover {
          background:rgba(10,135,248,0.06);
          border:1px solid rgba(10,135,248,0.3);
          border-radius:4px;
          .itemBox {
            //去除子元素hover事件
            border: none!important;
            background:rgba(10,135,248,0.00);
          }
          svg{
            color: #0A87F8;
          }
        }
        .selectedStyle :hover{

        }

        .selectedStyle:hover{
          //没有任何变化
        }
      }
      .buttonDiv {
        margin-top: 50px;
        .formItemMarginButton {
          width: 120px;
          height: 40px;
          margin-left: 18px;
        }
        .cancelFont {
          color: #666666;
        }
        .saveFont {
          color: #FFFFFF;
          background-color: #0A87F8;
        }
      }
    }
  }
</style>