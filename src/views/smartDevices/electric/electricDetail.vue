<template>
  <div class="electricDetail">
    <div class="child-detail">
      <div class="house-address clearfix">
        <div class="f-fl">
          <span>已绑房源地址：</span>
          <span v-if="electricDetailData.houseAlias">{{electricDetailData.houseAlias}} /</span> {{electricDetailData.cityName}}{{electricDetailData.areaName}}{{electricDetailData.fullAddress}}
        </div>
        <div class="rentStyle f-fr" v-if="electricDetailData.renterName">
          <icon-font type="iconren" style="margin-right: 5px;" />在租租客：{{electricDetailData.renterName}}-{{electricDetailData.renterPhone}}
        </div>
      </div>
      <div class="top f-clearfix">
        <div class="f-fl title">
          <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
          <span style="margin-top: 9px;" v-if="!skeletonLoading" class="radius-font" :class="electricDetailData.status==-1?'radius-font-error':electricDetailData.status==2?'radius-font-close':'radius-font-person'"><icon-font type="icondianbiao" /></span>
          <div >
            <label-item title="当前状态">
              <div class="clearfix">
                <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                <div class="f-fl" v-if="!skeletonLoading">{{electricDetailData.valveStatus==-1?'未知':electricDetailData.valveStatus==2?'已断电':'供电中'}}</div>
                <div class="f-fl itemStyle" :class="electricDetailData.status==1?'onLineStyle':'offLineStyle'" v-if="!skeletonLoading">{{electricDetailData.statusName?electricDetailData.statusName:"-"}}</div>
                <div class="sync_info_style f-fl cursor" @click="syncInfo" v-if="!skeletonLoading&&electricDetailData.brand!=0">
                  <icon-font :class="{'imgrotate_common':syncInfoLoading}" style="margin-right: 3px;" type="iconyumengtubiao_zhongzhi" />同步
                </div>
              </div>
            </label-item>
          </div>
        </div>
        <div class="f-fl detail">
          <div class="blank-box"></div>
          <div class="item" :style="electricDetailData.brand==0?'width:240px;':'width:160px;'">
            <span class="bgColorStyle animate-box" style="margin-top: 7px;width: 32px;height: 32px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
            <span style="margin-top: 7px;" class="radius-font  radius-font-person" v-if="!skeletonLoading&&electricDetailData.brand==0">
                            <icon-font type="icondianbiaobeifen2" />
                        </span>
            <span style="margin-top: 7px;" class="radius-font  radius-font-yunding" v-if="!skeletonLoading&&electricDetailData.brand==1">
                            <icon-font type="iconyunding1" />
                        </span>
            <span style="margin-top: 7px;" class="radius-font  radius-font-guojia" v-if="!skeletonLoading&&electricDetailData.brand==2">
                            <icon-font type="iconguojia1" />
                        </span>
            <label-item title="电表品牌" :skeletonLoading="skeletonLoading">
              <div>{{electricDetailData.brand==0?'普通电表':electricDetailData.brand==1?'云丁':electricDetailData.brand==2?'果加':electricDetailData.brand==3?'蜂电':electricDetailData.brand==4?'超仪':'-'}}</div>
            </label-item>
          </div>
          <div class="item"  :style="electricDetailData.brand==0?'width:240px;':'width:160px;'">
            <span class="bgColorStyle animate-box" style="margin-top: 7px;width: 32px;height: 32px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
            <span style="margin-top: 7px;" class="radius-font" v-show="!skeletonLoading">
                            <icon-font type="icon-yumengtubiao_fukuanfangshi" />
                        </span>
            <label-item title="付费模式" :skeletonLoading="skeletonLoading">
              <div>{{electricDetailData.paymentModeName?electricDetailData.paymentModeName:"-"}}</div>
            </label-item>
          </div>
          <div class="item"  :style="electricDetailData.brand==0?'width:240px;':'width:180px;'">
            <span class="bgColorStyle animate-box" style="margin-top: 7px;width: 32px;height: 32px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
            <span style="margin-top: 7px;" class="radius-font radius-font-price" v-show="!skeletonLoading">
                            <icon-font type="icon-yumengtubiao_zujin" />
                        </span>
            <label-item title="电费单价" :skeletonLoading="skeletonLoading">
              <div>{{electricDetailData.unitPrice?electricDetailData.unitPrice+' 元/度':"-"}}</div>
            </label-item>
          </div>
          <div class="item"  style="width:220px;" v-if="electricDetailData.brand!=0&&electricDetailData.paymentMode==1">
            <span class="bgColorStyle animate-box" style="margin-top: 7px;width: 32px;height: 32px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
            <span style="margin-top: 7px;" class="radius-font radius-font-person" v-show="!skeletonLoading">
                            <icon-font type="iconmensuodianliang" />
                        </span>
            <label-item title="剩余电量" :skeletonLoading="skeletonLoading">
              <div>
                <span style="color: #111111">{{electricDetailData.surplusPower||electricDetailData.surplusPower==0?electricDetailData.surplusPower+' 度':"-"}}</span>
                <span style="color: #777777">{{electricDetailData.availableBalance||electricDetailData.availableBalance==0?'(可用余额:'+electricDetailData.availableBalance+' 元)':"-"}}</span>
              </div>
            </label-item>
          </div>
          <div class="item"  style="width:220px;" v-if="electricDetailData.brand!=0&&electricDetailData.paymentMode==2">
            <span class="bgColorStyle animate-box" style="margin-top: 7px;width: 32px;height: 32px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
            <span style="margin-top: 7px;" class="radius-font radius-font-person" v-show="!skeletonLoading">
                            <icon-font type="iconmensuodianliang" />
                        </span>
            <label-item title="当前用电量" :skeletonLoading="skeletonLoading">
              <div>
                {{electricDetailData.powerUsed?electricDetailData.powerUsed+' 度':"-"}}
              </div>
            </label-item>
          </div>
        </div>
      </div>
      <div class="tabs-content">
        <a-tabs size="small" defaultActiveKey="1" @change="handleCallback">
          <a-tab-pane key="1">
              <span slot="tab">
                  <icon-font type="icondianbiaobeifen2" />电表信息
              </span>
              <div class="basic-info">
                <div class="input-info">
                  <label-item class="item" style="width: 100%" title="电表名称/描述" :skeletonLoading="skeletonLoading">
                    <span>{{electricDetailData.name?electricDetailData.name:'-'}}</span>
                  </label-item>
                  <label-item class="item" title="电表品牌" :skeletonLoading="skeletonLoading">
                    <span>{{electricDetailData.brand==0?'普通电表':electricDetailData.brand==1?'云丁':electricDetailData.brand==2?'果加':electricDetailData.brand==3?'蜂电':electricDetailData.brand==4?'超仪':'-'}}</span>
                  </label-item>
                  <label-item class="item" title="设备型号" :skeletonLoading="skeletonLoading" v-if="electricDetailData.brand!=0">
                    <span>{{electricDetailData.modelName?electricDetailData.modelName:"-"}}</span>
                  </label-item>
                  <label-item class="item" title="设备序列号/编码" :skeletonLoading="skeletonLoading" v-if="electricDetailData.brand!=0">
                    <span>{{electricDetailData.sn?electricDetailData.sn:"-"}}</span>
                  </label-item>
                  <label-item class="item" title="付费模式" :skeletonLoading="skeletonLoading" v-if="electricDetailData.brand!=0">
                    <span>{{electricDetailData.paymentModeName?electricDetailData.paymentModeName:"-"}}</span>
                  </label-item>
                  <label-item class="item" title="电费单价" :skeletonLoading="skeletonLoading">
                    <span>{{electricDetailData.unitPrice?electricDetailData.unitPrice+' 元/度':"-"}}</span>
                  </label-item>
                  <label-item class="item" title="总充电量" style="width: 220px;margin-right: 19px;" :skeletonLoading="skeletonLoading" v-if="electricDetailData.brand!=0&&electricDetailData.paymentMode == 1">
                    <span>{{electricDetailData.totalCharge||electricDetailData.totalCharge==0?electricDetailData.totalCharge+' 度':electricDetailData.totalCharge==0?electricDetailData.totalCharge+' 度':"-"}}{{electricDetailData.totalChargeRefTime?'  ('+$moment(electricDetailData.totalChargeRefTime).format('YYYY.MM.DD HH:mm:ss')+')刷新':''}}</span>
                  </label-item>
                  <label-item class="item" title="当前用电量" style="width: 220px;margin-right: 19px;" :skeletonLoading="skeletonLoading" v-if="electricDetailData.brand!=0">
                    <span>{{electricDetailData.powerUsed||electricDetailData.powerUsed==0?electricDetailData.powerUsed+' 度':"-"}}{{electricDetailData.powerUsed?'  ('+$moment(electricDetailData.powerUsedRefTime).format('YYYY.MM.DD HH:mm:ss')+')刷新':''}}</span>
                  </label-item>
                  <label-item class="item" title="透支额度" style="width: 220px;margin-right: 0px;" :skeletonLoading="skeletonLoading" v-if="electricDetailData.brand!=0&&electricDetailData.paymentMode == 1">
                    <span>{{electricDetailData.overdraft?electricDetailData.overdraft+' 度':"-"}}</span>
                  </label-item>
                  <label-item class="item" title="剩余电量" style="width: 220px;margin-right: 0px;" :skeletonLoading="skeletonLoading" v-if="electricDetailData.brand!=0&&electricDetailData.paymentMode == 1">
                    <span>{{electricDetailData.surplusPower||electricDetailData.surplusPower==0?electricDetailData.surplusPower+' 度':"-"}}{{electricDetailData.availableBalance||electricDetailData.availableBalance==0?'(可用余额:'+electricDetailData.availableBalance+' 元)':"-"}}</span>
                  </label-item>
                </div>
              </div>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab" v-if="electricDetailData.paymentMode==1&&electricDetailData.brand!=0">
                <icon-font type="iconchaobiaojilu" />充值记录
            </span>
            <span slot="tab" v-else>
                <icon-font type="iconchaobiaojilu" />抄表记录
            </span>
            <div v-if="electricDetailData.paymentMode==1&&electricDetailData.brand!=0">
              <charge-amount-history-list ref="chargeAmountHistoryList" :electricMeterId="electricMeterId"></charge-amount-history-list>
            </div>
            <div v-else>
              <reading-history-list ref="readingHistoryList" :readingObj="readingObj" :electricMeterId="electricMeterId"></reading-history-list>
            </div>
          </a-tab-pane>
          <a-tab-pane key="3">
            <span slot="tab">
                <icon-font type="iconchaobiaojilu" />修改单价记录
            </span>
            <div v-if="editHistoryList_price.length==0">
              <div style="text-align: center; margin-top: 41px;">
                <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
              </div>
              <div style="color: #BBBBBB;font-size: 14px;margin: 19px 0 0 0;text-align: center;">没有单价修改记录哟～</div>
            </div>
            <div v-if="editHistoryList_price.length>0" class="content-follow" v-for="(history,index) in editHistoryList_price" :key="index" :style="index==0?'margin-top: 10px;':''">
              <div class="content-follow-node">
                {{$moment(history.createTime).format('YYYY.MM.DD HH:mm')}}
              </div>
              <div class="content-follow-left">
                <div class="radius-font-follow">
                  <div class="inner-radius-font"></div>
                </div>
                <div class="content-follow-left-line" v-if="index<editHistoryList_price.length-1"></div>
              </div>
              <div class="content-follow-right">
                <div>
                  <span style="color: #111111;font-size: 14px;margin-right: 8px;">{{history.operatorName}}</span>
                  <span style="color: #777777;font-size: 14px;">将{{history.typeName}}由</span>
                  <span style="color: #111111;font-size: 14px;">「{{history.originValue}}元/度」</span>
                  <span style="color: #777777;font-size: 14px;">修改为</span>
                  <span style="color: #111111;font-size: 14px;">「{{history.newValue}}元/度」</span>
                </div>
                <div style="font-size: 12px;color: #777777;">
                  {{history.comment}}
                </div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="4" v-if="electricDetailData.paymentMode==1">
            <span slot="tab" >
                <icon-font type="iconchaobiaojilu" />修改透支额度记录
            </span>
            <div v-if="editHistoryList_overDraft.length==0">
              <div style="text-align: center; margin-top: 41px;">
                <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
              </div>
              <div style="color: #BBBBBB;font-size: 14px;margin: 19px 0 0 0;text-align: center;">没有透支额度修改记录哟～</div>
            </div>
            <div v-if="editHistoryList_overDraft.length>0" class="content-follow" v-for="(history,index) in editHistoryList_overDraft" :key="index" :style="index==0?'margin-top: 10px;':''">
              <div class="content-follow-node">
                {{$moment(history.createTime).format('YYYY.MM.DD HH:mm')}}
              </div>
              <div class="content-follow-left">
                <div class="radius-font-follow">
                  <div class="inner-radius-font"></div>
                </div>
                <div class="content-follow-left-line" v-if="index<editHistoryList_overDraft.length-1"></div>
              </div>
              <div class="content-follow-right">
                <div>
                  <span style="color: #111111;font-size: 14px;margin-right: 8px;">{{history.operatorName}}</span>
                  <span style="color: #777777;font-size: 14px;">将{{history.typeName}}由</span>
                  <span style="color: #111111;font-size: 14px;">「{{history.originValue}}{{electricDetailData.billingMethod==3?'元':'度'}}」</span>
                  <span style="color: #777777;font-size: 14px;">修改为</span>
                  <span style="color: #111111;font-size: 14px;">「{{history.newValue}}{{electricDetailData.billingMethod==3?'元':'度'}}」</span>
                </div>
                <div style="font-size: 12px;color: #777777;">
                  {{history.comment}}
                </div>
              </div>
            </div>
          </a-tab-pane>
          <div slot="tabBarExtraContent" class="tabs-options">
            <div>
              <div @click="goChargeAmount" v-if="outterMarkList.indexOf('1')!=-1">
                <icon-font type="iconchongdiandianliang" />
                <span>&nbsp;充值电量</span>
              </div>
              <div @click="goPowerOn" v-if="outterMarkList.indexOf('2')!=-1">
                <icon-font type="iconyumengtubiao_jihuo" />
                <span>&nbsp;启动供电</span>
              </div>
              <div @click="goManualReading" v-if="outterMarkList.indexOf('3')!=-1">
                <icon-font type="iconchaobiaojilu" />
                <span>&nbsp;抄表</span>
              </div>
              <div @click="goPowerOff" v-if="outterMarkList.indexOf('4')!=-1">
                <icon-font type="iconduandian" />
                <span>&nbsp;断电</span>
              </div>
              <div @click="goClearing" v-if="outterMarkList.indexOf('5')!=-1">
                <icon-font type="iconqingling" />
                <span>&nbsp;清零</span>
              </div>
              <div @click="goUnitPriceSet" v-if="outterMarkList.indexOf('6')!=-1">
                <icon-font type="iconyumengtubiao_bianji-" />
                <span>&nbsp;修改电费单价</span>
              </div>
              <div @click="goOverdraftSet" v-if="outterMarkList.indexOf('7')!=-1">
                <icon-font type="iconyumengtubiao_bianji-" />
                <span>&nbsp;修改透支额度</span>
              </div>
              <div @click="goPaymentModeSet" v-if="outterMarkList.indexOf('8')!=-1">
                <icon-font type="iconyumengtubiao_qiehuanweiliebiao" />
                <span>&nbsp;调整付费模式</span>
              </div>
              <div @click="unBind" v-if="outterMarkList.indexOf('9')!=-1">
                <icon-font type="iconjiechu" />
                <span>&nbsp;解绑</span>
              </div>
              <div class="poperStyle" v-if="showMoreOperate">
                <a-popover placement="bottomRight" >
                  <div>
                    <icon-font type="iconyumengtubiao_gengduo-1" />
                    &nbsp;更多
                  </div>
                  <template slot="content">
                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('4')>-1" @click="goPowerOff">断电</div>
                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('5')>-1" @click="goClearing">清零</div>
                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('6')>-1" @click="goUnitPriceSet">修改电费单价</div>
                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('7')>-1" @click="goOverdraftSet">修改透支额度</div>
                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('8')>-1" @click="goPaymentModeSet">调整付费模式</div>
                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('9')>-1" @click="unBind">解绑</div>
                  </template>
                </a-popover>
              </div>
            </div>
          </div>
        </a-tabs>
      </div>
    </div>
    <!-- 抄表 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="manualReadingDialog" class="ownModalBorder titDialog" title="抄表">
      <manual-reading :electricMeterId="electricMeterId" @cancelSet="cancelSet" @readingSuccess="readingSuccess"></manual-reading>
    </a-modal>
    <!-- 单价设置 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="unitPriceSetDialog" class="ownModalBorder titDialog" title="修改电费单价">
      <unit-price-set :electricMeterId="electricMeterId" @cancelSet="cancelSet" @setSuccess="unitPriceSetSuccess"></unit-price-set>
    </a-modal>
    <!-- 充值电量 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="chargeAmountDialog" class="ownModalBorder titDialog" title="充值电量">
      <charge-amount :electricMeterId="electricMeterId" @cancelSet="cancelSet" @chargeAmountSuccess="chargeAmountSuccess" @genSuccess="genSuccess"></charge-amount>
    </a-modal>
    <!-- 透支额度设置 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="overdraftSetDialog" class="ownModalBorder titDialog" title="设置透支额度">
      <overdraft-set :electricMeterId="electricMeterId" @cancelSet="cancelSet" @setSuccess="overdraftSetSuccess"></overdraft-set>
    </a-modal>
    <!-- 预付费设置 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="paymentModeSetDialog" class="ownModalBorder titDialog" title="调整付费模式">
      <payment-mode-set :electricMeterId="electricMeterId" @cancelSet="cancelSet" @setSuccess="paymentModeSetSuccess"></payment-mode-set>
    </a-modal>
    <!-- 操作结果 -->
    <a-modal destroyOnClose centered :footer="null" :closable="false" :maskClosable="false" width="520px" v-model="loadingDialog" class="ownModalBorder" title="">
      <electric-loading :resultData="resultData" :resultType="resultType" :resultDesc="resultDesc" @setFailure="setFailure" @setSuccess="setSuccess"></electric-loading>
    </a-modal>
    <!-- 蜂电操作提示 -->
    <a-modal destroyOnClose centered v-model="fengDianCommonDialog" :closable="false" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'0px 0px 0px 0px'}" width="432px">
      <feng-dian-common :desc="fengDianCommonDesc" @colseThis="colseThis_fengDian"></feng-dian-common>
    </a-modal>
    <!-- 蜂电操作提示 -->
    <a-modal destroyOnClose centered v-model="fengDianChargeAmountDialog" :closable="false" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'0px 0px 0px 0px'}" width="432px">
      <feng-dian-charge-amount :fengDianSn="electricDetailData.sn" @colseThis="colseThis_fengDian"></feng-dian-charge-amount>
    </a-modal>
    <!-- 超仪操作提示 -->
    <a-modal destroyOnClose centered :footer="null" :closable="false" :maskClosable="false" width="520px" v-model="onlyLoadingDialog" class="ownModalBorder" title="">
      <loading :resultDesc="onlyLoadingDesc"></loading>
    </a-modal>
  </div>
</template>

<script>
import * as API from "@/api/smartDevices";
import ReadingHistoryList from './readingHistoryList';
import ChargeAmountHistoryList from './chargeAmountHistoryList';
import ManualReading from './manualReading';
import UnitPriceSet from './unitPriceSet';
import ChargeAmount from './chargeAmount';
import OverdraftSet from './overdraftSet';
import PaymentModeSet from './paymentModeSet';
import ElectricLoading from './electricLoading';
import FengDianCommon from './fengDianCommon';
import FengDianChargeAmount from './fengDianChargeAmount';
import Loading from './../common/loading';

export default {
  name: "electricDetail",
  components: {
    ReadingHistoryList,
    ChargeAmountHistoryList,
    ManualReading,
    UnitPriceSet,
    ChargeAmount,
    OverdraftSet,
    PaymentModeSet,
    ElectricLoading,
    FengDianCommon,
    FengDianChargeAmount,
    Loading,
  },
  props: {
    electricMeterId:{
      type:String,
      required:true,
    }
  },
  data() {
    return {
      electricDetailData:{},
      activekey:'1',
      editHistoryList_price:[],
      editHistoryList_overDraft:[],
      readingObj:{
        houseAlias:'',
        fullAddress:'',
        electricMeterId:'',
        houseId:'',
        billingMethod:'',
        brand:'',
        renterName:'',
        renterPhone:'',
        renterPaymentType:'',
        renterPaymentNo:'',
        renterBank:'',
      },
      manualReadingDialog:false,
      unitPriceSetDialog:false,
      chargeAmountDialog:false,
      overdraftSetDialog:false,
      paymentModeSetDialog:false,
      loadingDialog:false,
      resultData:{},
      resultDesc:'',
      resultType:0,
      showMoreOperate:false,          //是否显示更多按钮
      innerMarkList:[],               //更多里面的mark
      outterMarkList:[],              //更多外面的mark
      fengDianCommonDialog:false,
      fengDianCommonDesc:'',
      fengDianChargeAmountDialog:false,
      syncInfoLoading:false,
      onlyLoadingDialog:false,
      onlyLoadingDesc:'操作中，请耐心等待...',
    }
  },
  created() {
    this.getElectricDetail();
  },
  methods: {
    syncInfo(){
      this.syncInfoLoading = true;
      API.electricMeterSyncInfo({id:this.electricMeterId}).then(res => {
        if (res.code == 200) {
          this.syncInfoLoading = false;
          this.$message.success('同步成功！');
          this.getElectricDetail();
        }
      })
    },
    colseThis_fengDian(){
      this.fengDianChargeAmountDialog = false;
      this.fengDianCommonDialog = false;
    },
    getPermission(){
      let permissions = JSON.parse(sessionStorage.getItem('permissions'));
      let markArr = [];
      let btnArr = [];
      let brand = this.electricDetailData.brand;
      if((brand==1||brand==2||brand==3||brand==4)&&this.electricDetailData.paymentMode==1&&(this.electricDetailData.status==1||this.electricDetailData.status==2)){
        markArr.push('mk_smartDevices_electric_czdl');
      }
      if((brand==1||brand==2||brand==3||brand==4)&&this.electricDetailData.valveStatus==2){
        markArr.push('mk_smartDevices_electric_qdgd');
      }
      if(brand==0){
        markArr.push('mk_smartDevices_electric_cb');
      }
      if((brand==1||brand==2||brand==3||brand==4)&&this.electricDetailData.paymentMode==2&&(this.electricDetailData.status==1||this.electricDetailData.status==2)){
        markArr.push('mk_smartDevices_electric_cb');
      }
      if((brand==1||brand==2||brand==3||brand==4)&&(this.electricDetailData.valveStatus==1||this.electricDetailData.valveStatus==0)){
        markArr.push('mk_smartDevices_electric_dd');
      }
      if((brand==1||brand==2||brand==3||brand==4)&&(this.electricDetailData.status==1||this.electricDetailData.status==2)){
        markArr.push('mk_smartDevices_electric_dbql');
      }
      if(this.electricDetailData.status==1||this.electricDetailData.status==2){
        markArr.push('mk_smartDevices_electric_xgdfdj');
      }
      if((brand==1||brand==2||brand==3||brand==4)&&this.electricDetailData.paymentMode==1&&(this.electricDetailData.status==1||this.electricDetailData.status==2)){
        markArr.push('mk_smartDevices_electric_xgtzed');
      }
      if((brand==1||brand==2||brand==3||brand==4)&&(this.electricDetailData.status==1||this.electricDetailData.status==2)){
        markArr.push('mk_smartDevices_electric_tzffms');
      }
      markArr.push('mk_smartDevices_electric_jbdb');
      //判断资源权限
      markArr.forEach(ele => {
        permissions.some(function(value){
          if (ele == value.mark){
            if(value.mark == 'mk_smartDevices_electric_czdl'){
              btnArr.push('1');
            }else if(value.mark == 'mk_smartDevices_electric_qdgd'){
              btnArr.push('2');
            }else if(value.mark == 'mk_smartDevices_electric_cb'){
              btnArr.push('3');
            }else if(value.mark == 'mk_smartDevices_electric_dd'){
              btnArr.push('4');
            }else if(value.mark == 'mk_smartDevices_electric_dbql'){
              btnArr.push('5');
            }else if(value.mark == 'mk_smartDevices_electric_xgdfdj'){
              btnArr.push('6');
            }else if(value.mark == 'mk_smartDevices_electric_xgtzed'){
              btnArr.push('7');
            }else if(value.mark == 'mk_smartDevices_electric_tzffms'){
              btnArr.push('8');
            }else if(value.mark == 'mk_smartDevices_electric_jbdb'){
              btnArr.push('9');
            }
            return true;
          }
        });

      });
      //显示更多逻辑
      this.outterMarkList = [];
      this.innerMarkList = [];
      if(btnArr.length>4){
        this.showMoreOperate = true;
        for (let i = 0; i < btnArr.length; i++) {
          if(i>2){
            this.innerMarkList.push(btnArr[i]);
          }
          else{
            this.outterMarkList.push(btnArr[i]);
          }
        }
      }
      else{
        this.showMoreOperate = false;
        this.outterMarkList = btnArr;
        this.innerMarkList = [];
      }
    },
    cancelSet(){
      this.manualReadingDialog = false;
      this.unitPriceSetDialog = false;
      this.chargeAmountDialog = false;
      this.overdraftSetDialog = false;
      this.paymentModeSetDialog = false;
    },
    unitPriceSetSuccess(){
      this.unitPriceSetDialog = false;
      this.getElectricDetail();
      if(this.activekey == 3){
        this.getModifyLogList(3);
      }
      this.$emit('refreshinfoFun', true);
    },
    readingSuccess(){
      this.manualReadingDialog = false;
      this.getElectricDetail();
      this.$refs.readingHistoryList && this.$refs.readingHistoryList.initData();
    },
    setSuccess(resultType){
      if(resultType==1){
        this.$message.success('充值电量成功');
        this.$refs.chargeAmountHistoryList && this.$refs.chargeAmountHistoryList.initData();
      }
      if(resultType==2){
        this.$message.success('供电成功');
      }
      if(resultType==3){
        this.$message.success('抄表成功');
        this.$refs.readingHistoryList && this.$refs.readingHistoryList.initData();
      }
      if(resultType==4){
        this.$message.success('断电成功');
      }
      if(resultType==5){
        this.$message.success('清零成功');
      }
      if(resultType==7){
        this.$message.success('透支额度修改成功');
      }
      this.loadingDialog = false;
      this.overdraftSetDialog = false;
      this.getElectricDetail();
    },
    setFailure(resultType){
      if(resultType==1){
        this.$message.error('充值电量失败');
      }
      if(resultType==2){
        this.$message.error('供电失败');
      }
      if(resultType==3){
        this.$message.error('抄表失败');
      }
      if(resultType==4){
        this.$message.error('断电失败');
      }
      if(resultType==5){
        this.$message.error('清零失败');
      }
      if(resultType==7){
        this.$message.error('透支额度修改失败');
      }
      this.loadingDialog = false;
      this.overdraftSetDialog = false;
    },
    goChargeAmount(){
      if(this.electricDetailData.brand==1) {
        this.chargeAmountDialog = true;
      }
      if(this.electricDetailData.brand==3) {
        this.fengDianChargeAmountDialog = true;
      }
    },
    goOverdraftSet(){
      if(this.electricDetailData.brand==1||this.electricDetailData.brand==4) {
        this.overdraftSetDialog = true;
      }
      if(this.electricDetailData.brand==3) {
        this.fengDianCommonDialog = true;
        this.fengDianCommonDesc = '该设备不支持修改透支额度';
      }
    },
    goPowerOn(){
      //供电
      let _this =this;
      let id =this.electricDetailData.id
      this.$modal.confirm({
        title: '确定要将「' + this.electricDetailData.fullAddress + '」房间绑定的电表启动供电吗？',
        content: '启动供电后，该房间恢复供电模式',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.electricMeterPowerOn({id:id}).then(res => {
            if (res.code == 200) {
              _this.resultData =res.data;
              if(_this.resultData.operationId) {
                _this.resultDesc = '正在启动供电，请稍后···';
                _this.loadingDialog = true;
                _this.resultType = 2;
              }
              else {
                _this.$message.success('操作成功');
              }
              _this.$emit('refreshinfoFun', true);
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    goPowerOff(){
      //断电
      let _this =this;
      let id =this.electricDetailData.id;
      this.$modal.confirm({
        title: '确定要将「' + this.electricDetailData.fullAddress + '」房间绑定的电表断电吗？',
        content: '断电后，该房间里将不可再使用任何电器',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.electricMeterPowerOff({id:id}).then(res => {
            if (res.code == 200) {
              _this.resultData =res.data;
              if(_this.resultData.operationId){
                _this.resultDesc = '正在断电中，请稍后···';
                _this.loadingDialog = true;
                _this.resultType = 4;
              }
              else {
                _this.$message.success('操作成功');
              }
              _this.$emit('refreshinfoFun', true);
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    goClearing(){
      if(this.electricDetailData.brand==1||this.electricDetailData.brand==4){
        //清零
        let _this =this;
        let id =this.electricDetailData.id;
        this.$modal.confirm({
          title: '确定要清空电表「' + this.electricDetailData.name+'-'+ this.electricDetailData.sn+ '」上已用电量(电表读数)或已充值电量吗？',
          content: '该操作会清空电表已用电量(电表读数)和已充值电量，透支额度不会清除；清空后不可恢复，请谨慎操作',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            API.electricMeterClearing({electricMeterId:id}).then(res => {
              if (res.code == 200) {
                _this.resultData =res.data;
                if(_this.resultData.operationId) {
                  _this.resultDesc = '正在清零读数，请稍后···';
                  _this.loadingDialog = true;
                  _this.resultType = 5;
                }
                else {
                  _this.$message.success('操作成功');
                }
              }
            })
          },
          onCancel() {
            // console.log('Cancel');
          },
        });
      }
      if(this.electricDetailData.brand==3) {
        this.fengDianCommonDialog = true;
        this.fengDianCommonDesc = '该设备不支持电表清零';
      }
    },
    goPaymentModeSet(){
      if(this.electricDetailData.brand==1) {
        this.paymentModeSetDialog = true;
      }
      if(this.electricDetailData.brand==3||this.electricDetailData.brand==4) {
        this.fengDianCommonDialog = true;
        this.fengDianCommonDesc = '该设备不支持调整付费模式';
      }
    },
    goUnitPriceSet(){
      if(this.electricDetailData.brand==1||this.electricDetailData.brand==0||this.electricDetailData.brand==4) {
        this.unitPriceSetDialog = true;
      }
      if(this.electricDetailData.brand==3) {
        this.fengDianCommonDialog = true;
        this.fengDianCommonDesc = '该设备不支持修改电费单价';
      }
    },
    goManualReading(){
      //抄表
      if(this.electricDetailData.brand==0){
        this.manualReadingDialog = true;
      }
      if(this.electricDetailData.brand==1||this.electricDetailData.brand==4) {
        //直接调抄表接口
        let parameter = {
          electricMeterId: this.electricMeterId,
        }
        if(this.electricDetailData.brand==4){
          this.onlyLoadingDialog = true;
        }
        API.electricMeterManualReading(parameter).then(res => {
          if(!res&&this.electricDetailData.brand==4){
            setTimeout(()=>{
              this.onlyLoadingDialog = false;
            },2000);
          }
          if (res.code === '200') {
            this.resultData = res.data;
            if(this.resultData.operationId) {
              this.loadingDialog = true;
              this.resultDesc = '抄表中...';
              this.resultType = 3;
            }
            else {
              this.onlyLoadingDialog = false;
            }
          } else {
            if(this.electricDetailData.brand==4){
              this.onlyLoadingDialog = false;
            }
            this.$message.error('抄表失败');
          }
        });
      }
      if(this.electricDetailData.brand==3) {
        this.fengDianCommonDialog = true;
        this.fengDianCommonDesc = '该设备不支持抄表';
      }
    },
    paymentModeSetSuccess(){
      this.paymentModeSetDialog = false;
      this.getElectricDetail();
      this.$emit('refreshinfoFun', true);
    },
    overdraftSetSuccess(){
      this.overdraftSetDialog = false;
      this.getElectricDetail();
      if(this.activekey == 4){
        this.getModifyLogList(4);
      }
    },
    genSuccess(){
      this.chargeAmountDialog = false;
      this.getElectricDetail();
      this.$refs.chargeAmountHistoryList && this.$refs.chargeAmountHistoryList.initData();
    },
    chargeAmountSuccess(){
      this.chargeAmountDialog = false;
      this.getElectricDetail();
      this.$refs.chargeAmountHistoryList && this.$refs.chargeAmountHistoryList.initData();
    },
    unBind(){
      //解绑
      let _this =this;
      let id =this.electricDetailData.id
      this.$modal.confirm({
        title: '确定要将房源「' + this.electricDetailData.fullAddress + '」房间绑定的电表吗？',
        content: '解绑后不可恢复，请谨慎操作',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.electricMeterUnbind({id:id}).then(res => {
            if (res.code == 200) {
              _this.$message.success('电表解绑成功！');
              _this.$emit('unBindSuccess');
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },

    handleCallback(val){
      this.activekey = val;
      if(this.activekey == 1){
        this.getElectricDetail();
      }
      else if(this.activekey == 2){
        if(this.electricDetailData.paymentMode==1&&this.electricDetailData.brand!=0){
          this.$refs.chargeAmountHistoryList && this.$refs.chargeAmountHistoryList.initData();
        }
        else{
          this.$refs.readingHistoryList && this.$refs.readingHistoryList.initData();
        }
      }
      if(this.activekey == 3){
        this.getModifyLogList(3);
      }
      if(this.activekey == 4){
        this.getModifyLogList(4);
      }
    },
    getElectricDetail(){
      this.skeletonLoading = true;
      API.electricMeterView({id:this.electricMeterId}).then(res => {
        if(res.code === '200'){
          this.electricDetailData = res.data;
          this.readingObj.houseAlias = this.electricDetailData.houseAlias;
          this.readingObj.fullAddress = this.electricDetailData.cityName + this.electricDetailData.areaName + this.electricDetailData.fullAddress ;
          this.readingObj.houseId = this.electricDetailData.houseId;
          this.readingObj.electricMeterId = this.electricMeterId;
          this.readingObj.billingMethod =this.electricDetailData.billingMethod;
          this.readingObj.brand =this.electricDetailData.brand;
          this.readingObj.renterName = this.electricDetailData.renterName;
          this.readingObj.renterPhone = this.electricDetailData.renterPhone;
          this.readingObj.renterPaymentType =this.electricDetailData.renterPaymentType;
          this.readingObj.renterPaymentNo = this.electricDetailData.renterPaymentNo;
          this.readingObj.renterBank = this.electricDetailData.renterBank;
          this.getPermission();
          this.skeletonLoading = false;
        }
      });
    },
    getModifyLogList(val){
      let type = 1;
      if(val==4){
        type = 2;
      }
      if(val==3){
        type = 1;
      }
      let param = {
        electricMeterId : this.electricDetailData.id,
        type:type,
      };
      API.modifyLogList(param).then(res => {
        if(res.code === '200'){
          if(val==3){
            this.editHistoryList_price = res.data.records;
          }
          if(val==4){
            this.editHistoryList_overDraft = res.data.records;
          }
        }
      });
    },
  },
  filters: {

  },
  watch: {

  }
}
</script>

<style scoped lang="less">
  .electricDetail{
    .house-address {
      width: 100%;
      height: 40px;
      background: rgba(233, 241, 255, 1);
      opacity: 0.99;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(119, 119, 119, 1);
      line-height: 40px;
      padding: 0 20px;
      .rentStyle{
        i{
          vertical-align: -0.18em;
        }
        svg{
          width: 16px;
          height: 16px;
          color: #0A87F8;
        }
      }
    }
    .child-detail {
      min-height: 652px;
      max-height: calc(100vh - 230px);
      overflow: auto;
      .top {
        padding: 20px 20px 0 20px;
        margin-bottom: 30px;
        /deep/ .label-item .sync_info_style{
          height: 21px;
          line-height: 21px;
          margin-left: 5px;
          font-size: 12px;
          color: #0a87f8;
          svg{
            width: 12px;
            height: 12px;
          }
        }
        .title {
          display: flex;
          align-items: center;
          width: 190px;
          height: 44px;
          border-right: 1px dashed @borderColor;
          .itemStyle{
            font-size: 12px;
            width: 32px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 2px;
            margin: 3px 0 0 4px;
          }
          .onLineStyle{
            background: rgba(3,198,131,0.1);
            color: #03C683;
          }
          .offLineStyle{
            background: rgba(119,119,119,0.1);
            color: #777777;
          }
          .radius-font {
            width: 44px;
            height: 44px;
            line-height: 44px;
            border-radius: 50%;
            font-size:28px;
          }
          .status1 {
            background: rgba(251, 66, 70, 0.1);
            color: #FB4246;
          }
          .status2 {
            background: rgba(3, 198, 131, 0.1);
            color: #03C683;
          }
          .status3 {
            background: rgba(119, 119, 119, 0.1);
            color: #777777;
          }
          .status4 {
            background: rgba(10, 135, 248, 0.1);
            color: #0A87F8;
          }
          .color-status1 {
            color: #FFA036;
          }
          .color-status2 {
            color: #0A87F8;
          }
          .color-status3,
          .color-status4 {
            color: #777777;
          }
          .color-status8 {
            color: #03C683;
          }
          .edit-status-icon {
            vertical-align: middle;
            margin-left: 8px;
            color: @themeColor;
          }
          p{
            font-size:12px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
          }
          >div{
            div{
              font-size:14px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(17,17,17,1);
            }
          }
        }

        .detail {
          display: flex;
          width: calc(100% - 190px);
          flex-wrap: wrap;
          .item {
            display: flex;
            align-items: center;
            font-size: 12px; // padding-left: 40px;
            input {
              width: 180px;
              padding-right: 10px;
            }
            & /deep/ .ant-select {
              width: 180px;
            }
            .radius-font {
              font-size:18px;
            }
            p{
              font-size:12px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(153,153,153,1);
            }
            >div{
              div{
                font-size:12px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(17,17,17,1);
              }
            }
          }
          .blank-box {
            width: 30px;
            height: 30px;
          }
        }
        .radius-font-person {
          color: #0A87F8;
          background-color: fade(#0A87F8, 10%);
        }
        .radius-font-yunding {
          color: #14AEB8;
          background-color: fade(#14AEB8, 10%);
        }
        .radius-font-guojia{
          color: #424242;
          background-color: fade(#424242, 10%);
        }
        .radius-font-fengdian {
          color: #1EA7BB;
          background-color: fade(#1EA7BB, 10%);
        }
        .radius-font-price {
          color: #03C683;
          background-color: fade(#03C683, 10%);
        }
        .radius-font-online {
          background: rgba(3, 198, 131, 0.1);
          color: #03C683;
        }
        .radius-font-close {
          color: #777777;
          background-color: fade(#777777, 10%);
        }
        .radius-font-error {
          color: #FB4246;
          background-color: fade(#FB4246, 10%);
        }
      }
      .radius-font {
        display: inline-block;
        margin-right: 10px;
        width: 32px;
        height: 32px;
        line-height: 32px ;
        font-size: 12px;
        color: #FFA036;
        text-align: center;
        background-color: fade(#FFA036, 10%);
        border-radius: 16px;
      }
      .tabs-content {
        padding: 0 20px;
        // height: 400px;
        // min-height: calc(100vh - 390px);
        .basic-info {
          .input-info {
            display: flex;
            flex-wrap: wrap;
            .item {
              margin: 0 39px 20px 0;
              width: 200px;
              & /deep/ .title {
                margin-bottom: 4px;
              }
              & /deep/ .ant-select {
                width: 100%;
              }

            }
            .public-config {
              display: flex;
              flex-wrap: wrap;
              label {
                width: 100px;
                margin: 10px 0 20px 0;
                padding: 0;
              }
            }
          }
        }
        .content-follow{
          display: flex;
          justify-content: flex-start;
          .content-follow-node{
            width: 160px;
            padding-right: 15px;
            font-size: 14px;
            min-height: 60px;
            color: #777777;
            font-size: 14px;
          }
          .content-follow-left{
            width: 32px;
            .radius-font-follow {
              display: inline-block;
              margin-right: 10px;
              width: 16px;
              height: 16px;
              line-height: 16px ;
              font-size: 12px;
              background-color: fade(#0A87F8, 10%);
              border-radius: 50%;
              .inner-radius-font{
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #0A87F8;
                margin:4px 0 0 4px;
              }
            }
            .content-follow-left-line{
              margin: 0 0 0 8px;
              height: calc(100% - 16px);
              border-left: 1px dashed #AED4F5;
            }
            svg{
              width: 16px;
              height: 16px;
            }
            i{
              vertical-align: -0.25em;
            }
          }
          .content-follow-right {
            margin-left: 10px;
            margin-bottom: 19px;
            width: 100%;
          }
        }
      }
    }
    .tabs-options {
      font-size: 0;
      cursor: pointer;
      div {
        text-align: right;
        display: inline-block;
        font-size: 14px;
        padding: 0  0 0 14px;
        color: #0a87f8;
        span {
          border-right: 1px dashed #ccc;
        }
      }
      div:last-child {
        span {
          margin-right: 0;
          border-right: none;
        }
      }
      &>span {
        display: inline-block;
        padding: 0 10px;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        border: 1px solid #DDDDDD;
        background-color: #F6F7F8;
        border-radius: 4px;
      }
      &>span:last-child {
        margin-left: 10px;
        border: 1px solid #0a87f8;
        background-color: #0a87f8;
        color: #ffffff;
      }
      .poperStyle{
        div{
          padding: 0;
        }
        & /deep/ .ant-popover {
          position: fixed;
          .ant-popover-inner-content {
            padding: 5px 0;
            width: 120px;
            text-align: center;
            .action {
              color: #111111;
              width: 100%;
              height: 36px;
              line-height: 36px;
            }
            .action:hover {
              color: #0a87f8;
              cursor: pointer;
              background: rgba(10, 135, 248, 0.1);
            }
          }
        }
      }

    }
    .bottom {
      padding: 0 20px;
      height: 50px;
      line-height: 50px;
      border-top: 1px dashed #DDDDDD;
      color: @secondaryFontColor;
      span:first-child {
        display: inline-block;
        margin-right: 20px;
        padding-right: 20px;
        height: 20px;
        line-height: 20px;
        border-right: 1px dashed #DDDDDD;
      }
    }

    .radius-font {
      display: inline-block;
      margin-right: 10px;
      width: 60px;
      height: 24px;
      line-height: 24px;
      font-size: 14px;
      color: #FFA036;
      text-align: center;
      background-color: fade(#FFA036, 10%);
      border-radius: 12px;
    }
    .radius-font-person {
      color: #0A87F8;
      background-color: fade(#0A87F8, 10%);
    }
    & /deep/ .ant-tabs-nav .ant-tabs-tab {
      margin: 0 30px 0 0;
      padding: 8px 0;
    }
    & /deep/ .ant-tabs .ant-tabs-small-bar .ant-tabs-tab{
      padding: 8px 0;
    }
    & /deep/ .ant-tabs-top-content {
      font-size: 12px;
      color: @mainFontColor;
    }
    .animate-box{
      flex-wrap: wrap;
      animation: skeleton-blink 1.2s ease infinite;
      -webkit-animation: skeleton-blink 1.2s ease infinite;
      background-image: -webkit-gradient(linear, left top, right top, color-stop(25%, #f0f0f0), color-stop(37%, #e3e3e3), color-stop(63%, #f0f0f0));
      background-image: -o-linear-gradient(left, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
      background-image: linear-gradient(90deg, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
      background-size: 400% 100%;
    }
    @-webkit-keyframes skeleton-blink {
      0% {
        background-position: 100% 50%
      }

      to {
        background-position: 0 50%
      }
    }
    @keyframes skeleton-blink {
      0% {
        background-position: 100% 50%
      }

      to {
        background-position: 0 50%
      }

    }
    @-webkit-keyframes changeright{
      0%{-webkit-transform:rotate(0deg);}
      50%{-webkit-transform:rotate(-180deg);}
      100%{-webkit-transform:rotate(-360deg);}
    }
    .imgrotate_common{
      -webkit-animation:changeright 3s linear infinite;
    }
  }
</style>