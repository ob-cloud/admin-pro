<template>
  <!-- 来自房源单个绑定门锁 -->
  <div class="bindLock-box">
    <div class="addressStyle">
      <span style="margin-right: 4px;">房源地址：</span><span>{{ roomData.houseAlias?roomData.houseAlias+' / ':'' }}{{ roomData.cityName }}{{ roomData.areaName }}{{ roomData.fullAddress }}</span>
    </div>
    <div class="detail">
      <div class="title">选择绑定电表的品牌/账号</div>
      <div class="bindLock-box-accounts">
        <div class="bindLick-account clearfix">
          <div class="itemStyle cursor f-fl" :class="bindForm.brand==0?'clickStyle':'unClickStyle'" @click="changeOtherBrand()">
            <div class="otherStyle svgStyle f-fl"><icon-font  type="iconmensuo"></icon-font></div>
            <div class="littleTitle f-fl" style="height: 34px;line-height: 34px;margin-left: 11px;font-size: 14px;">普通电表</div>
            <div v-if="bindForm.brand == 0" :class="bindForm.brand == 0 ?'triangle-top-right-click':'triangle-top-right-unClick'">
            </div>
            <icon-font v-if="bindForm.brand == 0" class="triangle-top-right-choose" type="iconyumengtubiao_xuanzhong-"/>
          </div>
          <div v-if="authAccountList.length>0" :style="index%2==0?'margin-right:0px;':''" class="itemStyle cursor f-fl" v-for="(item,index) in authAccountList" :key="item.id" @click="changeBrand(item)" :class="bindForm.authAccountId==item.id?'clickStyle':'unClickStyle'">
            <div class="yunDingStyle svgStyle f-fl" v-if="item.brand == 1"><icon-font  type="iconyunding"></icon-font></div>
            <div class="guoJiaStyle svgStyle f-fl" v-if="item.brand == 2"><icon-font  type="iconguojia"></icon-font></div>
            <div class="fengDianStyle svgStyle f-fl" v-if="item.brand == 3"><icon-font  type="iconfengdian"></icon-font></div>
            <div class="fengDianStyle svgStyle f-fl" v-if="item.brand == 4"><icon-font  type="iconchaoyi"></icon-font></div>
            <div class="f-fl" style="margin-left: 10px;">
              <div class="littleTitle overHidde" style="line-height: 18px;max-width: 175px;" v-if="item.brand == 4">{{item.thirdPartyAppId}}</div>
              <div class="littleTitle overHidde" style="line-height: 18px;max-width: 175px;" v-else>{{item.thirdPartyAccountId}}</div>
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
          <div class="itemStyle cursor f-fl" style="background: #F6F7F8;" :style="haveMargin.fengDian?'':'margin-right:0px;'" v-if="!acceptPlat.fengDian" @click="goToAuth(3)">
            <div class="unHaveStyle svgStyle f-fl" ><icon-font  type="iconfengdian"></icon-font></div>
            <div class="f-fl" style="margin-left: 10px;">
              <div class="title" style="line-height: 18px;color: #777777;">蜂电</div>
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
      <div class="title" style="margin-top: 20px;">电表信息</div>
      <div v-if="bindForm.brand==0">
        <div style="margin-top: 10px;border-bottom: 1px solid #dddddd;">
          <label-item class="u-bottom-border" title="表数统计方式" :must-fill="true">
            <div style="height: 32px;line-height: 32px;">
              <a-radio-group v-model="mixBrandElectricMeter.billingMethod">
            <a-radio :value="1">余数</a-radio>
            <a-radio :value="2">底数</a-radio>
            <a-radio :value="3">金额</a-radio>
          </a-radio-group>
            </div>
          </label-item>
        </div>
        <div style="margin-top: 20px;position: relative;">
          <label-item class="u-bottom-border" title="电费单价" :must-fill="true">
            <a-input placeholder="可输入 0.01 - 9.99" v-model="mixBrandElectricMeter.unitPrice" v-validate="'area|max(9.99)'"></a-input>
          </label-item>
          <div style="position: absolute;color: #777777;font-size: 14px;right: 0px;top: 30px;">元/度</div>
        </div>
        <div style="margin-top: 20px;">
          <label-item class="u-bottom-border" title="电表描述" :maxSize="50" :valLength="mixBrandElectricMeter.name.length">
            <a-input placeholder="请输入" v-model="mixBrandElectricMeter.name" maxlength="50"></a-input>
          </label-item>
        </div>
      </div>
      <div v-if="bindForm.brand==1">
        <div style="margin-top: 10px;">
          <label-item class="u-bottom-border" title="云丁电表" :must-fill="true">
            <div class="clearfix cursor" style="padding: 5px 0;border-bottom: 1px solid #DDDDDD;" @click="selectElectricMeter">
              <div class="f-fl">
                <p class="overHidde" style="max-width:300px;color: #111111;font-size: 13px;" v-if="yundingElectricMeter.houseAddress">{{ yundingElectricMeter.houseAddress }}</p>
                <span style="color: #BBBBBB;font-size: 13px;" v-else>请选择电表</span>
              </div>
              <div class="f-fr" style="margin-right: 10px;color: #0A87F8;font-size: 14px;"><icon-font type="iconyumengtubiao_jiantouxiangyou"></icon-font></div>
            </div>
          </label-item>
        </div>
        <div style="margin-top: 20px;position: relative;">
          <label-item class="u-bottom-border" title="电费单价" :must-fill="true">
            <a-input placeholder="可输入 0.01 - 9.99" v-model="yundingElectricMeter.unitPrice" v-validate="'area|max(9.99)'"></a-input>
          </label-item>
          <div style="position: absolute;color: #777777;font-size: 14px;right: 0px;top: 30px;">元/度</div>
        </div>
      </div>
      <div v-if="bindForm.brand==2">
        <div style="margin-top: 10px;">
          <label-item class="u-bottom-border" title="果加电表" :must-fill="true">
            <div class="clearfix cursor" style="padding: 5px 0;border-bottom: 1px solid #DDDDDD;" @click="selectElectricMeter">
              <div class="f-fl">
                <p class="overHidde" style="max-width:430px;color: #111111;font-size: 13px;" v-if="guojiaElectricMeter.houseAddress">{{ guojiaElectricMeter.houseAddress }}</p>
                <span style="color: #BBBBBB;font-size: 13px;" v-else>请选择电表</span>
              </div>
              <div class="f-fr" style="margin-right: 10px;color: #0A87F8;font-size: 14px;"><icon-font type="iconyumengtubiao_jiantouxiangyou"></icon-font></div>
            </div>
          </label-item>
        </div>
      </div>
      <div v-if="bindForm.brand==3">
        <div style="margin-top: 10px;">
          <label-item class="u-bottom-border" title="蜂电电表" :must-fill="true">
            <div class="clearfix cursor" style="padding: 5px 0;border-bottom: 1px solid #DDDDDD;" @click="selectElectricMeter">
              <div class="f-fl">
                <p class="overHidde" style="max-width:430px;color: #111111;font-size: 13px;" v-if="powerbeeElectricMeter.houseAddress">{{ powerbeeElectricMeter.houseAddress }}</p>
                <span style="color: #BBBBBB;font-size: 13px;" v-else>请选择电表</span>
              </div>
              <div class="f-fr" style="margin-right: 10px;color: #0A87F8;font-size: 14px;"><icon-font type="iconyumengtubiao_jiantouxiangyou"></icon-font></div>
            </div>
          </label-item>
        </div>
        <div style="margin-top: 20px;position: relative;">
          <label-item class="u-bottom-border" title="电费单价" :must-fill="true">
            <a-input placeholder="可输入 0.01 - 9.99" v-model="powerbeeElectricMeter.unitPrice" v-validate="'area|max(9.99)'"></a-input>
          </label-item>
          <div style="position: absolute;color: #777777;font-size: 14px;right: 0px;top: 30px;">元/度</div>
        </div>
      </div>
      <div v-if="bindForm.brand==4">
        <div style="margin-top: 10px;">
          <label-item class="u-bottom-border" title="超仪电表" :must-fill="true">
            <div class="clearfix cursor" style="padding: 5px 0;border-bottom: 1px solid #DDDDDD;" @click="selectElectricMeter">
              <div class="f-fl">
                <p class="overHidde" style="max-width:430px;color: #111111;font-size: 13px;" v-if="joyElectricMeter.houseAddress">{{ joyElectricMeter.houseAddress }}</p>
                <span style="color: #BBBBBB;font-size: 13px;" v-else>请选择电表</span>
              </div>
              <div class="f-fr" style="margin-right: 10px;color: #0A87F8;font-size: 14px;"><icon-font type="iconyumengtubiao_jiantouxiangyou"></icon-font></div>
            </div>
          </label-item>
        </div>
        <div style="margin-top: 20px;position: relative;">
          <label-item class="u-bottom-border" title="电费单价" :must-fill="true">
            <a-input placeholder="可输入 0.01 - 9.99" v-model="joyElectricMeter.unitPrice" v-validate="'area|max(9.99)'"></a-input>
          </label-item>
          <div style="position: absolute;color: #777777;font-size: 14px;right: 0px;top: 30px;">元/度</div>
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
    <!-- 果加电表列表 -->
 <!--   <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="guoJiaLockListDialog" class="ownModalBorder titDialog" title="选择电表">
      <guo-jia-lock-list :houseObj="houseObj" :selectedElectricIds="selectedElectricIds" @cancelSelect="cancelSelect" @confirmSelect="confirmSelect_guojia"></guo-jia-lock-list>
    </a-modal>-->
    <!-- 云丁电表列表 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="YunDingElectricListDialog" class="ownModalBorder titDialog" title="选择电表">
      <yun-ding-electric-list :houseObj="houseObj" :selectedElectricIds="selectedElectricIds" @cancelSelect="cancelSelect" @confirmSelect="confirmSelect_yunding"></yun-ding-electric-list>
    </a-modal>
    <!-- 蜂电电表列表 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="fengDianElectricListDialog" class="ownModalBorder titDialog" title="选择电表">
      <feng-dian-electric-list :houseObj="houseObj" :selectedElectricIds="selectedElectricIds" @cancelSelect="cancelSelect" @confirmSelect="confirmSelect_fengdian"></feng-dian-electric-list>
    </a-modal>
    <!-- 超仪电表列表 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="ChaoYiElectricListDialog" class="ownModalBorder titDialog" title="选择电表">
      <chaoyi-eletric-list :houseObj="houseObj" :selectedElectricIds="selectedElectricIds" @cancelSelect="cancelSelect" @confirmSelect="confirmSelect_chaoyi"></chaoyi-eletric-list>
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
import YunDingElectricList from './yunDingElectricList';
import FengDianElectricList from './fengDianElectricList';
import ChaoyiEletricList from './chaoyiEletricList';
import * as API from "@/api/smartDevices";
import GoBindAccount from '../lock/goBindAccount';
import BindAccount from '../account/bindAccount';

export default {
  name: "bindLock",
  components: {
    YunDingElectricList,
    FengDianElectricList,
    ChaoyiEletricList,
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
        mixBrandElectricMeter:{}, //杂牌门锁绑定数据列表
        yundingElectricMeter:{},  //云丁
        guojiaElectricMeter:{},
        joyElectricMeter:{},
      },
      mixBrandElectricMeter:{
        billingMethod:1,
         name:'',
        unitPrice:'',
      },
      saveLoading:false,
      YunDingElectricListDialog:false,
      yundingElectricMeter:{
        unitPrice:'',
      },
      powerbeeElectricMeter:{
        unitPrice:'',
      },
      joyElectricMeter:{
        unitPrice:'',
      },
      guoJiaLockListDialog:false,
      fengDianElectricListDialog:false,
      ChaoYiElectricListDialog:false,
      guojiaElectricMeter:{},
      selectedElectricIds:[],
      houseObj:{
        authAccountId:'',
        houseAlias:'',
        fullAddress:'',
        index:'',
        electricIndex:-1,      //绑定门锁的位置
        electricId:'',
      },
      goToBindDialog:false,
      goToBindType:1,         //1、云丁；2、果加；3、蜂电
      acceptPlat:{
        yunDing:false,
        fengDian:false,
        chaoYi:false,
      },
      haveMargin:{
        yunDing:false,
        fengDian:false,
        chaoYi:false,
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
    selectElectricMeter(){
      this.houseObj.authAccountId = this.bindForm.authAccountId;
      this.houseObj.houseAlias = this.roomData.houseAlias;
      this.houseObj.fullAddress = this.roomData.fullAddress;
      if(this.bindForm.brand == 1){
        this.houseObj.electricId = this.yundingElectricMeter.uuid;
        this.YunDingElectricListDialog = true;
      }
      if(this.bindForm.brand == 2){
        this.houseObj.electricId = this.guojiaElectricMeter.uuid;
        this.guoJiaLockListDialog = true;
      }
      if(this.bindForm.brand == 3){
        this.houseObj.electricId = this.powerbeeElectricMeter.uuid;
        this.fengDianElectricListDialog = true;
      }
      if(this.bindForm.brand == 4){
        this.houseObj.electricId = this.joyElectricMeter.deviceId;
        this.ChaoYiElectricListDialog = true;
      }
    },
    confirmSelect_yunding(selectedObj){
      this.YunDingElectricListDialog = false;
      let unitPrice = this.yundingElectricMeter.unitPrice;
      this.yundingElectricMeter = selectedObj;
      if(unitPrice){
        this.yundingElectricMeter.unitPrice = unitPrice;
      }
      this.yundingElectricMeter.houseAddress = selectedObj.houseAddress;
    },
    confirmSelect_guojia(selectedObj){
      this.guoJiaLockListDialog = false;
      let unitPrice = this.guojiaElectricMeter.unitPrice;
      this.guojiaElectricMeter = selectedObj;
      if(unitPrice){
        this.guojiaElectricMeter.unitPrice = unitPrice;
      }
      this.guojiaElectricMeter.houseAddress = selectedObj.houseAddress;
    },
    confirmSelect_fengdian(selectedObj){
      this.fengDianElectricListDialog = false;
      let unitPrice = this.powerbeeElectricMeter.unitPrice;
      this.powerbeeElectricMeter = selectedObj;
      if(unitPrice){
        this.powerbeeElectricMeter.unitPrice = unitPrice;
      }
      this.powerbeeElectricMeter.houseAddress = selectedObj.houseAddress;
    },
    confirmSelect_chaoyi(selectedObj){
      this.ChaoYiElectricListDialog = false;
      let unitPrice = this.joyElectricMeter.unitPrice;
      this.joyElectricMeter = selectedObj;
      if(unitPrice){
        this.joyElectricMeter.unitPrice = unitPrice;
      }
      this.joyElectricMeter.houseAddress = selectedObj.houseAddress;
    },
    cancelSelect(){
      this.YunDingElectricListDialog = false;
      this.guoJiaLockListDialog = false;
      this.fengDianElectricListDialog = false;
      this.ChaoYiElectricListDialog = false;
    },
    cancelBind(){
      this.$emit('cancelBind');
    },
    confirmBind(){
      let parameter ={};
      //门锁类型
      if(this.bindForm.brand == 0){
        //检验必填性
        if(!this.mixBrandElectricMeter.billingMethod){
          this.$message.warning('请选择表数统计方式');
          return ;
        }
        if(!this.mixBrandElectricMeter.unitPrice){
          this.$message.warning('请输入电费单价');
          return ;
        }
        //构造参数
        parameter ={
          brand:0,
          houseInfo:{
            houseId:this.roomData.id,
          },
          mixBrandElectricMeter:this.mixBrandElectricMeter,
        };
      }
      if(this.bindForm.brand == 1){
        //检验必填性
        if(!this.yundingElectricMeter.uuid){
          this.$message.warning('请选择一云丁电表绑定');
          return ;
        }
        if(!this.yundingElectricMeter.unitPrice){
          this.$message.warning('请输入电费单价');
          return ;
        }
        //构造参数
        parameter = {
          authAccountId:this.bindForm.authAccountId,
          brand:1,
          houseInfo:{
            houseId:this.roomData.id,
            deviceHouseId:this.yundingElectricMeter.deviceHouseId,
            deviceHousePid:this.yundingElectricMeter.deviceHousePid,
          },
          yundingElectricMeter:this.yundingElectricMeter,
        };
      }
      if(this.bindForm.brand == 2){
        //检验必填性
        if(!this.guojiaElectricMeter.uuid){
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
          guojiaElectricMeter:this.guojiaElectricMeter,
        };
      }
      if(this.bindForm.brand == 3){
        //检验必填性
        if(!this.powerbeeElectricMeter.uuid){
          this.$message.warning('请选择一蜂电电表绑定');
          return ;
        }
        if(!this.powerbeeElectricMeter.unitPrice){
          this.$message.warning('请输入电费单价');
          return ;
        }
        //构造参数
        parameter = {
          authAccountId:this.bindForm.authAccountId,
          brand:3,
          houseInfo:{
            houseId:this.roomData.id,
            deviceHouseId:this.powerbeeElectricMeter.deviceHouseId,
            deviceHousePid:this.powerbeeElectricMeter.deviceHousePid,
          },
          powerbeeElectricMeter:this.powerbeeElectricMeter,
        };
      }
      if(this.bindForm.brand == 4){
        //检验必填性
        if(!this.joyElectricMeter.uuid){
          this.$message.warning('请选择一蜂电电表绑定');
          return ;
        }
        if(!this.joyElectricMeter.unitPrice){
          this.$message.warning('请输入电费单价');
          return ;
        }
        //构造参数
        parameter = {
          authAccountId:this.bindForm.authAccountId,
          brand:4,
          houseInfo:{
            houseId:this.roomData.id,
          },
          joyElectricMeter:this.joyElectricMeter,
        };
      }
      this.saveLoading = true;
      API.electricMeterSingleBind(parameter).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.saveLoading = false;
          this.$message.success('电表绑定成功');
          this.$emit('bindSuccess');
        }
        else{
          this.$message.error('电表绑定失败');
          this.saveLoading = false;
        }
      });
    },
    changeOtherBrand(){
      this.bindForm.brand = 0;
      //清空其他
      this.bindForm.authAccountId = '';
      this.yundingElectricMeter = {};
      this.guojiaElectricMeter = {};
      this.powerbeeElectricMeter = {};
    },
    changeBrand(item){
      if(this.bindForm.brand == item.brand&&this.bindForm.authAccountId == item.id){
        //不用做任何改变
        return ;
      }
      if(item.brand == 2){
        this.$message.warning('即将上线，敬请期待~');
        return ;
      }
      this.mixBrandElectricMeter = {
        billingMethod:1,
        name:'',
        unitPrice:'',
      };
      this.selectedElectricIds = [];
      this.bindForm.brand = item.brand;
      this.bindForm.authAccountId = item.id;
      this.houseObj.authAccountId = item.id;
      this.yundingElectricMeter = {};
      this.guojiaElectricMeter = {};
      this.powerbeeElectricMeter = {};
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
            if(item.brand == 3){
              this.acceptPlat.fengDian = true;
              this.authAccountList.push(item);
            }
            if(item.brand == 4){
              this.acceptPlat.chaoYi = true;
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
          if(!this.acceptPlat.fengDian){
            double = (double+1)%2;
            if(double){
              this.haveMargin.fengDian = false;
            }
            else{
              this.haveMargin.fengDian = true;
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
          .chaoyiStyle{
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