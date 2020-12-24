<template>
  <!-- 来自房源单个绑定门锁 -->
  <div class="bindLock-box">
    <div class="addressStyle">
      <span style="margin-right: 4px;">房源地址：</span><span>{{ roomData.houseAlias?roomData.houseAlias+' / ':'' }}{{ roomData.cityName }}{{ roomData.areaName }}{{ roomData.fullAddress }}</span>
    </div>
    <div class="detail">
      <div class="title">选择绑定水表的品牌/账号</div>
      <div class="bindLock-box-accounts">
        <div class="bindLick-account clearfix">
          <div class="itemStyle cursor f-fl" :class="bindForm.brand==0?'clickStyle':'unClickStyle'" @click="changeOtherBrand()">
            <div class="otherStyle svgStyle f-fl"><icon-font  type="iconmensuo"></icon-font></div>
            <div class="littleTitle f-fl" style="height: 34px;line-height: 34px;margin-left: 11px;font-size: 14px;">普通水表</div>
            <div v-if="bindForm.brand == 0" :class="bindForm.brand == 0 ?'triangle-top-right-click':'triangle-top-right-unClick'">
            </div>
            <icon-font v-if="bindForm.brand == 0" class="triangle-top-right-choose" type="iconyumengtubiao_xuanzhong-"/>
          </div>
          <div v-if="authAccountList.length>0" :style="index%2==0?'margin-right:0px;':''" class="itemStyle cursor f-fl" v-for="(item,index) in authAccountList" :key="item.id" @click="changeBrand(item)" :class="bindForm.authAccountId==item.id?'clickStyle':'unClickStyle'">
            <div class="yunDingStyle svgStyle f-fl" v-if="item.brand == 1"><icon-font  type="iconyunding"></icon-font></div>
            <div class="guoJiaStyle svgStyle f-fl" v-if="item.brand == 2"><icon-font  type="iconguojia"></icon-font></div>
            <div class="fengDianStyle svgStyle f-fl" v-if="item.brand == 3"><icon-font  type="iconfengdian"></icon-font></div>
            <div class="chaoyi svgStyle f-fl" v-if="item.brand == 4"><icon-font  type="iconchaoyi"></icon-font></div>
            <div class="f-fl" style="margin-left: 10px;">
              <div class="littleTitle overHidde" style="line-height: 18px;max-width: 175px;" v-if="item.brand == 1">{{item.thirdPartyAccountId}}</div>
              <div class="littleTitle overHidde" style="line-height: 18px;max-width: 175px;" v-if="item.brand == 4">{{item.thirdPartyAppId}}</div>
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
          <div class="itemStyle cursor f-fl" style="background: #F6F7F8;" :style="haveMargin.chaoYi?'':'margin-right:0px;'" v-if="!acceptPlat.chaoYi" @click="goToAuth(4)">
            <div class="unHaveStyle svgStyle f-fl" ><icon-font  type="iconchaoyi"></icon-font></div>
            <div class="f-fl" style="margin-left: 10px;">
              <div class="title" style="line-height: 18px;color: #777777;">超仪</div>
              <div class="overHidde" style="font-size: 12px;color: #777777;line-height: 16px;max-width: 120px;">未授权账号</div>
            </div>
          </div>
        </div>
      </div>
      <div class="title" style="margin-top: 20px;">水表信息</div>
      <div v-if="bindForm.brand==0">
        <div style="margin-top: 10px;border-bottom: 1px solid #dddddd;">
          <label-item class="u-bottom-border" title="表数统计方式" :must-fill="true">
            <div style="height: 32px;line-height: 32px;">
              <a-radio-group v-model="mixBrandWaterMeter.billingMethod">
            <a-radio :value="1">余数</a-radio>
            <a-radio :value="2">底数</a-radio>
            <a-radio :value="3">金额</a-radio>
          </a-radio-group>
            </div>
          </label-item>
        </div>
        <div style="margin-top: 20px;position: relative;">
          <label-item class="u-bottom-border" title="水费单价" :must-fill="true">
            <a-input placeholder="请输入" v-model="mixBrandWaterMeter.unitPrice" v-validate="'money|max(99.99)'"></a-input>
          </label-item>
          <div style="position: absolute;color: #777777;font-size: 14px;right: 0px;top: 30px;">元/m³</div>
        </div>
        <div style="margin-top: 20px;">
          <label-item class="u-bottom-border" title="水表描述" :maxSize="50" :valLength="mixBrandWaterMeter.name.length">
            <a-input placeholder="请输入" v-model="mixBrandWaterMeter.name" maxlength="50"></a-input>
          </label-item>
        </div>
      </div>
      <div v-if="bindForm.brand==1">
        <div style="margin-top: 10px;">
          <label-item class="u-bottom-border" title="云丁水表" :must-fill="true">
            <div class="clearfix cursor" style="padding: 5px 0;border-bottom: 1px solid #DDDDDD;" @click="selectElectricMeter">
              <div class="f-fl">
                <p class="overHidde" style="max-width:300px;color: #111111;font-size: 13px;" v-if="yundingWaterMeter.houseAddress">{{ yundingWaterMeter.houseAddress }}</p>
                <span style="color: #BBBBBB;font-size: 13px;" v-else>请选择水表</span>
              </div>
              <div class="f-fr" style="margin-right: 10px;color: #0A87F8;font-size: 14px;"><icon-font type="iconyumengtubiao_jiantouxiangyou"></icon-font></div>
            </div>
          </label-item>
        </div>
        <div style="margin-top: 20px;position: relative;">
          <label-item class="u-bottom-border" title="水费单价" :must-fill="true">
            <a-input placeholder="请输入" v-model="yundingWaterMeter.unitPrice" v-validate="'money|max(99999)'"></a-input>
          </label-item>
          <div style="position: absolute;color: #777777;font-size: 14px;right: 0px;top: 30px;">元/m³</div>
        </div>
      </div>
      <div v-if="bindForm.brand==4">
        <div style="margin-top: 10px;">
          <label-item class="u-bottom-border" title="超仪水表" :must-fill="true">
            <div class="clearfix cursor" style="padding: 5px 0;border-bottom: 1px solid #DDDDDD;" @click="selectElectricMeter">
              <div class="f-fl">
                <p class="overHidde" style="max-width:300px;color: #111111;font-size: 13px;" v-if="joyWaterMeter.houseAddress">{{ joyWaterMeter.houseAddress }}</p>
                <span style="color: #BBBBBB;font-size: 13px;" v-else>请选择水表</span>
              </div>
              <div class="f-fr" style="margin-right: 10px;color: #0A87F8;font-size: 14px;"><icon-font type="iconyumengtubiao_jiantouxiangyou"></icon-font></div>
            </div>
          </label-item>
        </div>
        <div style="margin-top: 20px;position: relative;">
          <label-item class="u-bottom-border" title="水费单价" :must-fill="true">
            <a-input placeholder="请输入" v-model="joyWaterMeter.unitPrice" v-validate="'money|max(99999)'"></a-input>
          </label-item>
          <div style="position: absolute;color: #777777;font-size: 14px;right: 0px;top: 30px;">元/m³</div>
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
    <!-- 云丁水表列表 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="YunDingWaterListDialog" class="ownModalBorder titDialog" :title="selectTitle">
      <yun-ding-water-list :houseObj="houseObj" :selectedWaterIds="selectedWaterIds" @cancelSelect="cancelSelect" @confirmSelect="confirmSelect_yunding"></yun-ding-water-list>
    </a-modal>
    <!-- 超仪表列表 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="chaoyiWaterListDialog" class="ownModalBorder titDialog" :title="selectTitle">
      <chaoyi-water-list :houseObj="houseObj" :selectedWaterIds="selectedWaterIds" @cancelSelect="cancelSelect" @confirmSelect="confirmSelect_chaoyi"></chaoyi-water-list>
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
import YunDingWaterList from './yunDingWaterList';
import ChaoyiWaterList from './chaoyiWaterList';
import * as API from "@/api/smartDevices";
import GoBindAccount from '../lock/goBindAccount';
import BindAccount from '../account/bindAccount';

export default {
  name: "bindLock",
  components: {
    YunDingWaterList,
    ChaoyiWaterList,
    GoBindAccount,
    BindAccount,
  },
  props: {
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
        mixBrandWaterMeter:{}, //杂牌门锁绑定数据列表
        yundingWaterMeter:{},  //云丁
        joyWaterMeter:{},
        meterType:1,
      },
      mixBrandWaterMeter:{
        billingMethod:1,
         name:'',
        unitPrice:'',
      },
      saveLoading:false,
      YunDingWaterListDialog:false,
      yundingWaterMeter:{
        unitPrice:'',
      },
      chaoyiWaterListDialog:false,
      joyWaterMeter:{
        unitPrice:'',
      },
      selectedWaterIds:[],
      houseObj:{
        authAccountId:'',
        houseAlias:'',
        fullAddress:'',
        index:'',
        waterIndex:-1,      //绑定门锁的位置
        waterId:'',
        meterType:1,
      },
      goToBindDialog:false,
      goToBindType:1,         //1、云丁；2、果加；3、蜂电
      acceptPlat:{
        yunDing:false,
        chaoyi:false,
      },
      haveMargin:{
        yunDing:false,
        chaoYi:false,
      },
      bindAccountDialog:false,
      selectTitle:'选择冷水表'
    }
  },
  created() {
    this.houseObj.meterType = this.roomData.meterType;
    this.bindForm.meterType = this.roomData.meterType;
    if(this.roomData.meterType==1){
      this.selectTitle = '选择冷水表';
    }
    else if(this.roomData.meterType==2){
      this.selectTitle = '选择热水表';
    }
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
    selectElectricMeter(){
      this.houseObj.authAccountId = this.bindForm.authAccountId;
      this.houseObj.houseAlias = this.roomData.houseAlias;
      this.houseObj.fullAddress = this.roomData.fullAddress;
      if(this.bindForm.brand == 1){
        this.houseObj.waterId = this.yundingWaterMeter.uuid;
        this.YunDingWaterListDialog = true;
      }
      if(this.bindForm.brand == 4){
        this.houseObj.waterId = this.joyWaterMeter.deviceId;
        this.chaoyiWaterListDialog = true;
      }
    },
    confirmSelect_yunding(selectedObj){
      this.YunDingWaterListDialog = false;
      let unitPrice = this.yundingWaterMeter.unitPrice;
      this.yundingWaterMeter = selectedObj;
      if(unitPrice){
        this.yundingWaterMeter.unitPrice = unitPrice;
      }
      this.yundingWaterMeter.houseAddress = selectedObj.houseAddress;
    },
    confirmSelect_chaoyi(selectedObj){
      this.chaoyiWaterListDialog = false;
      let unitPrice = this.joyWaterMeter.unitPrice;
      this.joyWaterMeter = selectedObj;
      if(unitPrice){
        this.joyWaterMeter.unitPrice = unitPrice;
      }
      this.joyWaterMeter.houseAddress = selectedObj.houseAddress;
    },
    cancelSelect(){
      this.YunDingWaterListDialog = false;
      this.chaoyiWaterListDialog = false;
    },
    cancelBind(){
      this.$emit('cancelBind');
    },
    confirmBind(){
      let parameter ={};
      //门锁类型
      if(this.bindForm.brand == 0){
        //检验必填性
        if(!this.mixBrandWaterMeter.billingMethod){
          this.$message.warning('请选择表数统计方式');
          return ;
        }
        if(!this.mixBrandWaterMeter.unitPrice){
          this.$message.warning('请输入水费单价');
          return ;
        }
        //构造参数
        parameter ={
          brand:0,
          houseInfo:{
            houseId:this.roomData.id,
          },
          mixBrandWaterMeter:this.mixBrandWaterMeter,
          meterType:this.roomData.meterType,
        };
      }
      if(this.bindForm.brand == 1){
        //检验必填性
        if(!this.yundingWaterMeter.uuid){
          this.$message.warning('请选择一云丁水表绑定');
          return ;
        }
        if(!this.yundingWaterMeter.unitPrice){
          this.$message.warning('请输入水费单价');
          return ;
        }
        //构造参数
        parameter = {
          authAccountId:this.bindForm.authAccountId,
          brand:1,
          houseInfo:{
            houseId:this.roomData.id,
            deviceHouseId:this.yundingWaterMeter.deviceHouseId,
            deviceHousePid:this.yundingWaterMeter.deviceHousePid,
          },
          yundingWaterMeter:this.yundingWaterMeter,
          meterType:this.roomData.meterType,
        };
      }
      if(this.bindForm.brand == 4){
        //检验必填性
        if(!this.joyWaterMeter.deviceId){
          this.$message.warning('请选择一超仪水表绑定');
          return ;
        }
        if(!this.joyWaterMeter.unitPrice){
          this.$message.warning('请输入水费单价');
          return ;
        }
        //构造参数
        parameter = {
          authAccountId:this.bindForm.authAccountId,
          brand:4,
          houseInfo:{
            houseId:this.roomData.id,
            deviceHouseId:this.yundingWaterMeter.deviceHouseId,
            deviceHousePid:this.yundingWaterMeter.deviceHousePid,
          },
          joyWaterMeter:this.joyWaterMeter,
          meterType:this.roomData.meterType,
        };
      }
      this.saveLoading = true;
      API.waterMeterBind(parameter).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.saveLoading = false;
          this.$message.success('水表绑定成功');
          this.$emit('bindSuccess');
        }
        else{
          this.$message.error('水表绑定失败');
          this.saveLoading = false;
        }
      });
    },
    changeOtherBrand(){
      this.bindForm.brand = 0;
      //清空其他
      this.bindForm.authAccountId = '';
      this.yundingWaterMeter = {};
    },
    changeBrand(item){
      if(this.bindForm.brand == item.brand&&this.bindForm.authAccountId == item.id){
        //不用做任何改变
        return ;
      }
      if(item.brand == 2||item.brand == 3){
        this.$message.warning('即将上线，敬请期待~');
        return ;
      }
      this.mixBrandWaterMeter = {
        billingMethod:1,
        name:'',
        unitPrice:'',
      };
      this.selectedWaterIds = [];
      this.bindForm.brand = item.brand;
      this.bindForm.authAccountId = item.id;
      this.houseObj.authAccountId = item.id;
      this.yundingWaterMeter = {};
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
            if(item.brand == 4){
              this.acceptPlat.chaoyi = true;
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
          if(!this.acceptPlat.chaoYi){
            double = (double+1)%2;
            if(double){
              this.haveMargin.chaoYi = false;
            }
            else{
              this.haveMargin.chaoYi = true;
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
      /deep/ span.ant-radio + *{
        padding-left: 5px;
        padding-right: 12px;
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
          .fengDianStyle{
            background:#1EA7BB;
            border-radius: 6px;
          }
          .chaoyi{
            background:#13c2c2;
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