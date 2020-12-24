<template>
  <!-- 来自房源单个绑定门锁 -->
  <div class="bindLock-box">
    <div class="addressStyle">
      <span style="margin-right: 4px;">房源地址：</span><span>{{ roomData.houseAlias?roomData.houseAlias+' / ':'' }}{{ roomData.cityName }}{{ roomData.areaName }}{{ roomData.fullAddress }}</span>
    </div>
    <div class="detail">
      <div class="title">选择绑定门锁的品牌/账号</div>
      <div class="bindLock-box-accounts">
        <div class="bindLick-account clearfix">
          <div class="itemStyle cursor f-fl" :class="bindForm.brand==0?'clickStyle':'unClickStyle'" @click="changeOtherBrand()">
            <div class="otherStyle svgStyle f-fl"><icon-font  type="iconmensuo"></icon-font></div>
            <div class="littleTitle f-fl" style="height: 34px;line-height: 34px;margin-left: 11px;font-size: 14px;">普通智能门锁</div>
            <div v-if="bindForm.brand == 0" :class="bindForm.brand == 0 ?'triangle-top-right-click':'triangle-top-right-unClick'">
            </div>
            <icon-font v-if="bindForm.brand == 0" class="triangle-top-right-choose" type="iconyumengtubiao_xuanzhong-"/>
          </div>
          <div v-if="authAccountList.length>0" :style="index%2==0?'margin-right:0px;':''" class="itemStyle cursor f-fl" v-for="(item,index) in authAccountList" :key="item.id" @click="changeBrand(item)" :class="bindForm.authAccountId==item.id?'clickStyle':'unClickStyle'">
            <div class="yunDingStyle svgStyle f-fl" v-if="item.brand == 1"><icon-font  type="iconyunding"></icon-font></div>
            <div class="guoJiaStyle svgStyle f-fl" v-if="item.brand == 2"><icon-font  type="iconguojia"></icon-font></div>
            <div class="f-fl" style="margin-left: 10px;">
              <div class="littleTitle overHidde" style="line-height: 18px;max-width: 175px;">{{item.thirdPartyAccountId}}</div>
              <div class="overHidde" style="font-size: 12px;color: #777777;line-height: 16px;max-width: 120px;">{{item.comment}}</div>
            </div>
            <div v-if="bindForm.authAccountId==item.id" :class="bindForm.authAccountId==item.id ?'triangle-top-right-click':'triangle-top-right-unClick'"></div>
            <icon-font v-if="bindForm.authAccountId==item.id" class="triangle-top-right-choose" type="iconyumengtubiao_xuanzhong-"/>
          </div>
          <div class="itemStyle cursor f-fl" style="background: #F6F7F8;" :style="haveMargin.yunDing?'':'margin-right:0px;'" v-if="!acceptPlat.yunDing" @click="goToAuth(1)">
            <div class="unHaveStyle svgStyle f-fl"><icon-font  type="iconyunding"></icon-font></div>
            <div class="f-fl" style="margin-left: 10px;">
              <div class="title" style="line-height: 18px;color: #777777;">云丁</div>
              <div class="overHidde" style="font-size: 12px;color: #777777;line-height: 16px;max-width: 120px;">未授权账号</div>
            </div>
          </div>
          <div class="itemStyle cursor f-fl" style="background: #F6F7F8;" :style="haveMargin.guojia?'':'margin-right:0px;'" v-if="!acceptPlat.guojia" @click="goToAuth(2)">
            <div class="unHaveStyle svgStyle f-fl" ><icon-font  type="iconguojia"></icon-font></div>
            <div class="f-fl" style="margin-left: 10px;">
              <div class="title" style="line-height: 18px;color: #777777;">果加</div>
              <div class="overHidde" style="font-size: 12px;color: #777777;line-height: 16px;max-width: 120px;">未授权账号</div>
            </div>
          </div>
        </div>
      </div>
      <div class="title" style="margin-top: 20px;">门锁信息</div>
      <div v-if="bindForm.brand==0">
        <div style="margin-top: 20px;">
          <label-item class="u-bottom-border" title="门锁密码" :must-fill="true" :maxSize="10" :valLength="mixBrandLock.pwd.length">
            <a-input placeholder="6-10位数字" v-model="mixBrandLock.pwd" maxlength="10" v-validate="'naturalNum'"></a-input>
          </label-item>
        </div>
        <div style="margin-top: 20px;">
          <label-item class="u-bottom-border" title="门锁描述" :maxSize="50" :valLength="mixBrandLock.custName.length">
            <a-input placeholder="请输入" v-model="mixBrandLock.custName" maxlength="50"></a-input>
          </label-item>
        </div>
      </div>
      <div v-if="bindForm.brand==1">
        <div style="margin-top: 10px;">
          <label-item class="u-bottom-border" title="云丁门锁" :must-fill="true">
            <div class="clearfix cursor" style="padding: 5px 0;border-bottom: 1px solid #DDDDDD;" @click="selectLock">
              <div class="f-fl">
                <p class="overHidde" style="max-width:300px;color: #111111;font-size: 13px;" v-if="yundingLock.houseAddress">{{ yundingLock.houseAddress }}</p>
                <span style="color: #BBBBBB;font-size: 13px;" v-else>请选择门锁</span>
              </div>
              <div class="f-fr" style="margin-right: 10px;color: #0A87F8;font-size: 14px;"><icon-font type="iconyumengtubiao_jiantouxiangyou"></icon-font></div>
            </div>
          </label-item>
        </div>
      </div>
      <div v-if="bindForm.brand==2">
        <div style="margin-top: 10px;">
          <label-item class="u-bottom-border" title="果加门锁" :must-fill="true">
            <div class="clearfix cursor" style="padding: 5px 0;border-bottom: 1px solid #DDDDDD;" @click="selectLock">
              <div class="f-fl">
                <p class="overHidde" style="max-width:430px;color: #111111;font-size: 13px;" v-if="guojiaLock.houseAddress">{{ guojiaLock.houseAddress }}</p>
                <span style="color: #BBBBBB;font-size: 13px;" v-else>请选择门锁</span>
              </div>
              <div class="f-fr" style="margin-right: 10px;color: #0A87F8;font-size: 14px;"><icon-font type="iconyumengtubiao_jiantouxiangyou"></icon-font></div>
            </div>
          </label-item>
        </div>
      </div>
      <div class="clearfix" style="width: 100%;" :style="bindForm.brand==0?'padding-top: 44px;':'padding-top:66px;'">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelBind">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="confirmBind">
            保存
          </a-button>
        </div>
      </div>
    </div>
    <!-- 果加门锁列表 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="guoJiaLockListDialog" class="ownModalBorder titDialog" title="选择门锁">
      <guo-jia-lock-list :houseObj="houseObj" :selectedLockIds="selectedLockIds" @cancelSelect="cancelSelect" @confirmSelect="confirmSelect_guojia"></guo-jia-lock-list>
    </a-modal>
    <!-- 云丁门锁列表 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="YunDingLockListDialog" class="ownModalBorder titDialog" title="选择门锁">
      <yun-ding-lock-list :houseObj="houseObj" :selectedLockIds="selectedLockIds" @cancelSelect="cancelSelect" @confirmSelect="confirmSelect_yunding"></yun-ding-lock-list>
    </a-modal>
    <!-- 去绑定页面 -->
    <a-modal destroyOnClose centered v-model="goToBindDialog" :footer="null" class="ownModalBorder" title="" @cancel="goToBindDialog=false;" width="520px">
      <go-bind-account :goToBindType="goToBindType" @goToBindAccount="goToBindAccount"></go-bind-account>
    </a-modal>
    <!-- 绑定账号 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="bindAccountDialog" class="ownModalBorder titDialog" title="绑定账号">
      <bind-account :brand="goToBindType" @addSuccess="addSuccess" @authSuccess="authSuccess"></bind-account>
    </a-modal>
  </div>
</template>

<script>
import YunDingLockList from './yunDingLockList';
import GuoJiaLockList from './guoJiaLockList';
import * as API from "@/api/smartDevices";
import GoBindAccount from './goBindAccount';
import BindAccount from '../account/bindAccount';

export default {
  name: "bindLock",
  components: {
    YunDingLockList,
    GuoJiaLockList,
    GoBindAccount,
    BindAccount,
  },
  props: {
    houseType:{
      type:Number,
      required: true,
    },
    roomData:{
      type:Object,
      required:true,
    },
  },
  data() {
    return {
      authAccountList:[],
      bindForm:{
        authAccountId:'',   //绑定的授权账号ID（非杂牌锁必传）
        brand:0,            //品牌（0：杂牌；1：云丁；2：果加）
        mixBrandLock:{}, //杂牌门锁绑定数据列表
        yundingLock:{},  //云丁
        guojiaLock:{},
      },
      mixBrandLock:{
        custName:'',
        pwd:'',
        sn:'',
      },
      saveLoading:false,
      YunDingLockListDialog:false,
      yundingLock:{},
      guoJiaLockListDialog:false,
      guojiaLock:{},
      selectedLockIds:[],
      houseObj:{
        authAccountId:'',
        houseAlias:'',
        fullAddress:'',
        index:'',
        lockIndex:-1,      //绑定门锁的位置
        lockId:'',
      },
      goToBindDialog:false,
      goToBindType:1,         //1、云丁；2、果加
      acceptPlat:{
        yunDing:false,
        guojia:false,
      },
      haveMargin:{
        yunDing:false,
        guojia:false,
      },
      bindAccountDialog:false,
    }
  },
  created() {
    this.authAccountListSimpleAll();
  },
  mounted() {
  },
  methods: {
    authSuccess(){
      this.bindAccountDialog = false;
      this.authAccountListSimpleAll();
    },
    addSuccess(){
      this.bindAccountDialog = false;
      this.authAccountListSimpleAll();
    },
    goToBindAccount(){
      this.goToBindDialog = false;
      this.bindAccountDialog = true;
    },
    goToAuth(val){
      this.goToBindDialog = true;
      this.goToBindType = val;
    },
    selectLock(){
      this.houseObj.authAccountId = this.bindForm.authAccountId;
      this.houseObj.houseAlias = this.roomData.houseAlias;
      this.houseObj.fullAddress = this.roomData.fullAddress;
      if(this.bindForm.brand == 1){
        this.houseObj.lockId = this.yundingLock.uuid;
        this.YunDingLockListDialog = true;
      }
      if(this.bindForm.brand == 2){
        this.houseObj.lockId = this.guojiaLock.uuid;
        this.guoJiaLockListDialog = true;
      }
    },
    confirmSelect_yunding(selectedObj){
      this.YunDingLockListDialog = false;
      this.yundingLock = selectedObj;
      this.yundingLock.lockAddress = selectedObj.houseAddress;
    },
    confirmSelect_guojia(selectedObj){
      this.guoJiaLockListDialog = false;
      this.guojiaLock = selectedObj;
      this.guojiaLock.lockAddress = selectedObj.houseAddress;
    },
    cancelSelect(){
      this.YunDingLockListDialog = false;
      this.guoJiaLockListDialog = false;
    },
    cancelBind(){
      this.$emit('cancelBind');
    },
    confirmBind(){
      let parameter ={};
      //门锁类型
      if(this.bindForm.brand == 0){
        //检验必填性
        if(!this.mixBrandLock.pwd){
          this.$message.warning('请输入门锁密码');
          return ;
        }
        if(this.mixBrandLock.pwd.length>10||this.mixBrandLock.pwd.length<6){
          this.$message.warning('请输入正确门锁密码');
          return ;
        }
        //构造参数
        parameter ={
          brand:0,
          houseInfo:{
            houseId:this.roomData.id,
          },
          mixBrandLock:this.mixBrandLock,
        };
      }
      if(this.bindForm.brand == 1){
        //检验必填性
        if(!this.yundingLock.uuid){
          this.$message.warning('请选择一云丁门锁绑定');
          return ;
        }
        //构造参数
        parameter = {
          authAccountId:this.bindForm.authAccountId,
          brand:1,
          houseInfo:{
            houseId:this.roomData.id,
          },
          yundingLock:this.yundingLock,
        };
      }
      if(this.bindForm.brand == 2){
        //检验必填性
        if(!this.guojiaLock.uuid){
          this.$message.warning('请选择一果加门锁绑定');
          return ;
        }
        //构造参数
        parameter = {
          authAccountId:this.bindForm.authAccountId,
          brand:2,
          houseInfo:{
            houseId:this.roomData.id,
          },
          guojiaLock:this.guojiaLock,
        };
      }
      this.saveLoading = true;
      API.doorLockSingleBind(parameter).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.saveLoading = false;
          this.$message.success('绑锁成功');
          this.$emit('bindSuccess');
        }
        else{
          this.$message.error('绑锁失败');
          this.saveLoading = false;
        }
      });
    },
    changeOtherBrand(){
      this.bindForm.brand = 0;
      //清空其他
      this.bindForm.authAccountId = '';
      this.yundingLock = {};
      this.guojiaLock = {};
    },
    changeBrand(item){
      if(this.bindForm.brand == item.brand&&this.bindForm.authAccountId == item.id){
        //不用做任何改变
        return ;
      }
      this.mixBrandLock = {
        custName:'',
        pwd:'',
        sn:'',
      };
      this.bindForm.brand = item.brand;
      this.bindForm.authAccountId = item.id;
      this.houseObj.authAccountId = item.id;
      this.selectedLockIds = [];
      this.yundingLock = {};
      this.guojiaLock = {};
    },
    authAccountListSimpleAll(){
      API.authAccountListSimpleAll().then(res => {
        if (res&&res.code === "200") {
          this.authAccountList = [];
          res.data.forEach((item)=>{
            if(item.brand == 1){
              this.acceptPlat.yunDing = true;
              this.authAccountList.push(item);
            }
            if(item.brand == 2){
              this.acceptPlat.guojia = true;
              this.authAccountList.push(item);
            }
          });
          let double = this.authAccountList.length%2;
          if(!this.acceptPlat.yunDing){
            double = (double+1)%2;
            if(double){
              this.haveMargin.yunDing = false;
            }
            else{
              this.haveMargin.yunDing = true;
            }
          }
          if(!this.acceptPlat.guojia){
            double = (double+1)%2;
            if(double){
              this.haveMargin.guojia = false;
            }
            else{
              this.haveMargin.guojia = true;
            }
          }
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
  .bindLock-box{
    .addressStyle{
      width: 520px;
      height: 40px;
      line-height: 40px;
      background: #E9F1FF;
      font-size: 13px;
      color: #777777;
      padding-left: 20px;
    }
    .detail{
      padding: 20px;
      .title{
        font-size: 16px;
        color: #111111;
        font-weight: 500;
      }
      .littleTitle{
        font-size: 14px;
        color: #111111;
        font-weight: 500;
      }
      /deep/ .ant-input{
        color: #111111;
      }
      .bindLock-box-accounts{
        padding: 11px 0 10px 0;
        border-bottom: 8px solid #F6F7F8;
        .itemStyle{
          width: 233px;
          height: 50px;
          border-radius: 5px;
          margin:0 10px 10px 0;
          padding: 7px 0px 7px 10px;
          position: relative;
          .triangle-top-right-choose {
            position: absolute;
            color: #FFFFFF;
            top: 2px;
            right: 2px;
          }
          .triangle-top-right-click {
            position: absolute;
            width: 0;
            border: 16px solid #0A87F8;
            border-bottom: 16px solid transparent;
            border-left: 16px solid transparent;
            border-top-right-radius: 4px;
            top: 0px;
            right: 0px;
          }
          .svgStyle{
            width: 34px;
            height: 34px;
            padding: 6px;
            svg{
              width: 22px;
              height: 22px;
              color: #ffffff;
            }
          }
          .otherStyle{
            background: #23AFFA;
            border-radius: 6px;
          }
          .yunDingStyle{
            background: #14AEB8;
            border-radius: 6px;
          }
          .guoJiaStyle{
            background: #424242;
            border-radius: 6px;
          }
          .unHaveStyle{
            background: #999999;
            border-radius: 6px;
          }
          svg{
            width: 15px;
            height: 15px;
            color: #ffffff;
          }
        }
        .unClickStyle{
          border: 1px solid #DDDDDD;
          background: #FFFFFF;
        }
        .clickStyle{
          box-shadow: 0px 2px 8px 0px rgba(2, 19, 34, 0.1);
          border: 1px solid #0A87F8;
          background: #F5FAFF;
        }
      }
      .buttonDiv {
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