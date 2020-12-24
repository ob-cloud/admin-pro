<template>
  <div class="waterDetail">
    <div class="child-detail">
      <div class="house-address clearfix">
        <div class="f-fl">
          <span>已绑房源地址：</span>
          <span v-if="waterDetailData.houseAlias">{{waterDetailData.houseAlias}} /</span> {{waterDetailData.cityName}}{{waterDetailData.areaName}}{{waterDetailData.fullAddress}}
        </div>
        <div class="rentStyle f-fr" v-if="waterDetailData.renterName">
          <icon-font type="iconren" style="margin-right: 5px;" />在租租客：{{waterDetailData.renterName}}-{{waterDetailData.renterPhone}}
        </div>
      </div>
      <div class="top f-clearfix">
        <div class="f-fl title">
          <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
          <span style="margin-top: 9px;" v-if="!skeletonLoading" class="radius-font" :class="waterDetailData.valveStatus==-1?'radius-font-error':waterDetailData.valveStatus==2?'radius-font-close':'radius-font-person'"><icon-font type="iconshuibiao" /></span>
          <div >
            <label-item title="当前状态">
              <div class="clearfix">
                <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                <div class="f-fl" v-if="!skeletonLoading">{{waterDetailData.valveStatus==-1?'未知':waterDetailData.valveStatus==2?'已断水':'供水中'}}</div>
                <div class="f-fl itemStyle" :class="waterDetailData.status==1?'onLineStyle':'offLineStyle'" v-if="!skeletonLoading">{{waterDetailData.statusName?waterDetailData.statusName:"-"}}</div>
                <div class="sync_info_style f-fl cursor" @click="syncInfo" v-if="!skeletonLoading&&waterDetailData.brand!=0">
                  <icon-font :class="{'imgrotate_common':syncInfoLoading}" style="margin-right: 3px;" type="iconyumengtubiao_zhongzhi" />同步
                </div>
              </div>
            </label-item>
          </div>
        </div>
        <div class="f-fl detail">
          <div class="blank-box"></div>
          <div class="item"  style="width:180px;">
            <span class="bgColorStyle animate-box" style="margin-top: 7px;width: 32px;height: 32px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
            <span style="margin-top: 7px;" class="radius-font  radius-font-person" v-if="!skeletonLoading&&waterDetailData.brand==0">
                            <icon-font type="iconshuibiao" />
                        </span>
            <span style="margin-top: 7px;" class="radius-font  radius-font-yunding" v-if="!skeletonLoading&&waterDetailData.brand==1">
                            <icon-font type="iconyunding1" />
                        </span>
            <span style="margin-top: 7px;" class="radius-font  radius-font-guojia" v-if="!skeletonLoading&&waterDetailData.brand==2">
                            <icon-font type="iconguojia1" />
                        </span>
            <span style="margin-top: 7px;" class="radius-font  radius-font-chaoyi" v-if="!skeletonLoading&&waterDetailData.brand==4">
                            <icon-font type="iconchaoyi" />
                        </span>
            <label-item title="水表品牌" :skeletonLoading="skeletonLoading">
              <div>{{waterDetailData.brand==0?'普通水表':waterDetailData.brand==1?'云丁':waterDetailData.brand==2?'果加':waterDetailData.brand==3?'蜂电':waterDetailData.brand==4?'超仪':'-'}}</div>
            </label-item>
          </div>
          <div class="item"  style="width:180px;">
            <span class="bgColorStyle animate-box" style="margin-top: 7px;width: 32px;height: 32px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
            <span style="margin-top: 7px;" class="radius-font radius-font-person" v-show="!skeletonLoading&&waterDetailData.meterType==1">
                <icon-font type="iconlengshuibiao" />
            </span>
            <span style="margin-top: 7px;" class="radius-font" v-show="!skeletonLoading&&waterDetailData.meterType==2">
                <icon-font type="iconreshuibiao" />
            </span>
            <label-item title="水资源类型" :skeletonLoading="skeletonLoading">
              <div>
                <span>{{waterDetailData.meterType==1?'冷水':waterDetailData.meterType==2?'热水':"-"}}</span>
              </div>
            </label-item>
          </div>
          <div class="item"  style="width:180px;">
            <span class="bgColorStyle animate-box" style="margin-top: 7px;width: 32px;height: 32px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
            <span style="margin-top: 7px;" class="radius-font" v-show="!skeletonLoading">
                            <icon-font type="icon-yumengtubiao_fukuanfangshi" />
                        </span>
            <label-item title="付费模式" :skeletonLoading="skeletonLoading">
              <div>{{waterDetailData.paymentModeName?waterDetailData.paymentModeName:"-"}}</div>
            </label-item>
          </div>
          <div class="item"  style="width:180px;">
            <span class="bgColorStyle animate-box" style="margin-top: 7px;width: 32px;height: 32px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
            <span style="margin-top: 7px;" class="radius-font radius-font-price" v-show="!skeletonLoading">
                            <icon-font type="icon-yumengtubiao_zujin" />
                        </span>
            <label-item title="水费单价" :skeletonLoading="skeletonLoading">
              <div>{{waterDetailData.unitPrice?waterDetailData.unitPrice+' 元/m³':"-"}}</div>
            </label-item>
          </div>
        </div>
      </div>
      <div class="tabs-content">
        <a-tabs size="small" defaultActiveKey="1" @change="handleCallback">
          <a-tab-pane key="1">
              <span slot="tab">
                  <icon-font type="icondianbiaobeifen2" />水表信息
              </span>
              <div class="basic-info">
                <div class="input-info">
                  <label-item class="item" style="width: 100%" title="水表名称/描述" :skeletonLoading="skeletonLoading">
                    <span>{{waterDetailData.name?waterDetailData.name:'-'}}</span>
                  </label-item>
                  <label-item class="item" title="水表品牌" :skeletonLoading="skeletonLoading">
                    <span>{{waterDetailData.brand==0?'普通水表':waterDetailData.brand==1?'云丁':waterDetailData.brand==2?'果加':waterDetailData.brand==3?'蜂电':waterDetailData.brand==4?'超仪':'-'}}</span>
                  </label-item>
                  <label-item class="item" title="设备型号" :skeletonLoading="skeletonLoading" v-if="waterDetailData.brand!=0">
                    <span>{{waterDetailData.modelName?waterDetailData.modelName:"-"}}</span>
                  </label-item>
                  <label-item class="item" title="设备序列号/编码" :skeletonLoading="skeletonLoading" v-if="waterDetailData.brand!=0">
                    <span>{{waterDetailData.sn?waterDetailData.sn:"-"}}</span>
                  </label-item>
                  <label-item class="item" title="水资源类型" :skeletonLoading="skeletonLoading">
                    <span>{{waterDetailData.meterType==1?'冷水':waterDetailData.meterType==2?'热水':"-"}}</span>
                  </label-item>
                  <label-item class="item" title="付费模式" :skeletonLoading="skeletonLoading">
                    <span>{{waterDetailData.paymentModeName?waterDetailData.paymentModeName:"-"}}</span>
                  </label-item>
                  <label-item class="item" title="水费单价" :skeletonLoading="skeletonLoading">
                    <span>{{waterDetailData.unitPrice?waterDetailData.unitPrice+' 元/m³':"-"}}</span>
                  </label-item>
                  <label-item class="item" title="透支额度" style="width: 220px;margin-right: 0px;" :skeletonLoading="skeletonLoading" v-if="waterDetailData.brand!=0&&waterDetailData.paymentMode == 1">
                    <span>{{waterDetailData.overdraft?waterDetailData.overdraft+' m³':"-"}}</span>
                  </label-item>
                  <label-item class="item" title="总充值水量" style="width: 220px;margin-right: 19px;" :skeletonLoading="skeletonLoading" v-if="waterDetailData.brand!=0&&waterDetailData.paymentMode == 1">
                    <span>{{waterDetailData.totalCharge||waterDetailData.totalCharge==0?waterDetailData.totalCharge+' m³':waterDetailData.totalCharge==0?waterDetailData.totalCharge+' m³':"-"}}{{waterDetailData.totalChargeRefTime?'  ('+$moment(waterDetailData.totalChargeRefTime).format('YYYY.MM.DD HH:mm:ss')+')刷新':''}}</span>
                  </label-item>
                  <label-item class="item" title="当前用水量" style="width: 220px;margin-right: 19px;" :skeletonLoading="skeletonLoading" v-if="waterDetailData.brand!=0">
                    <span>{{waterDetailData.waterUsed||waterDetailData.waterUsed==0?waterDetailData.waterUsed+' m³':"-"}}{{waterDetailData.waterUsed?'  ('+$moment(waterDetailData.usedRefTime).format('YYYY.MM.DD HH:mm:ss')+')刷新':''}}</span>
                  </label-item>
                </div>
              </div>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab" v-if="waterDetailData.paymentMode==1&&waterDetailData.brand!=0">
                <icon-font type="iconchaobiaojilu" />充值记录
            </span>
            <span slot="tab" v-else>
                <icon-font type="iconchaobiaojilu" />抄表记录
            </span>
            <div v-if="waterDetailData.paymentMode==1&&waterDetailData.brand!=0">
              <charge-amount-history-list ref="chargeAmountHistoryList" :waterId="waterId"></charge-amount-history-list>
            </div>
            <div v-else>
              <reading-history-list ref="readingHistoryList" :readingObj="readingObj" :waterId="waterId" ></reading-history-list>
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
                  <span style="color: #111111;font-size: 14px;">「{{history.originValue}}元/m³」</span>
                  <span style="color: #777777;font-size: 14px;">修改为</span>
                  <span style="color: #111111;font-size: 14px;">「{{history.newValue}}元/m³」</span>
                </div>
                <div style="font-size: 12px;color: #777777;">
                  {{history.comment}}
                </div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="4" v-if="waterDetailData.paymentMode==1">
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
                  <span style="color: #111111;font-size: 14px;">「{{history.originValue}}{{waterDetailData.billingMethod==3?'元':'m³'}}」</span>
                  <span style="color: #777777;font-size: 14px;">修改为</span>
                  <span style="color: #111111;font-size: 14px;">「{{history.newValue}}{{waterDetailData.billingMethod==3?'元':'m³'}}」</span>
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
                <span>&nbsp;充值</span>
              </div>
              <div @click="goPowerOn" v-if="outterMarkList.indexOf('9')!=-1">
                <icon-font type="iconyumengtubiao_jihuo" />
                <span>&nbsp;启动供水</span>
              </div>
              <div @click="goManualReading" v-if="outterMarkList.indexOf('2')!=-1">
                <icon-font type="iconchaobiaojilu" />
                <span>&nbsp;抄表</span>
              </div>
              <div @click="goPowerOff" v-if="outterMarkList.indexOf('8')!=-1">
                <icon-font type="iconduandian" />
                <span>&nbsp;断水</span>
              </div>
              <div @click="goClearing" v-if="outterMarkList.indexOf('3')!=-1">
                <icon-font type="iconqingling" />
                <span>&nbsp;清零</span>
              </div>
              <div @click="goUnitPriceSet" v-if="outterMarkList.indexOf('4')!=-1">
                <icon-font type="iconyumengtubiao_bianji-" />
                <span>&nbsp;修改水费单价</span>
              </div>
              <div @click="goOverdraftSet" v-if="outterMarkList.indexOf('5')!=-1">
                <icon-font type="iconyumengtubiao_bianji-" />
                <span>&nbsp;修改透支额度</span>
              </div>
              <div @click="goPaymentModeSet" v-if="outterMarkList.indexOf('6')!=-1">
                <icon-font type="iconyumengtubiao_qiehuanweiliebiao" />
                <span>&nbsp;调整付费模式</span>
              </div>
              <div @click="unBind" v-if="outterMarkList.indexOf('7')!=-1">
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
                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('3')>-1" @click="goClearing">清零</div>
                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('4')>-1" @click="goUnitPriceSet">修改水费单价</div>
                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('5')>-1" @click="goOverdraftSet">修改透支额度</div>
                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('6')>-1" @click="goPaymentModeSet">调整付费模式</div>
                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('7')>-1" @click="unBind">解绑</div>
                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('8')>-1" @click="goPowerOff">断水</div>
                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('9')>-1" @click="goPowerOn">启动供水</div>
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
      <manual-reading :waterId="waterId" @cancelSet="cancelSet" @readingSuccess="readingSuccess"></manual-reading>
    </a-modal>
    <!-- 单价设置 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="unitPriceSetDialog" class="ownModalBorder titDialog" title="修改水费单价">
      <unit-price-set :waterId="waterId" @cancelSet="cancelSet" @setSuccess="unitPriceSetSuccess"></unit-price-set>
    </a-modal>
    <!-- 充值 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="chargeAmountDialog" class="ownModalBorder titDialog" title="充值">
      <charge-amount :waterId="waterId" @chargeAmountSuccess="chargeAmountSuccess" @genSuccess="genSuccess"></charge-amount>
    </a-modal>
    <!-- 透支额度设置 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="overdraftSetDialog" class="ownModalBorder titDialog" title="设置透支额度">
      <overdraft-set :waterId="waterId" @cancelSet="cancelSet" @setSuccess="overdraftSetSuccess"></overdraft-set>
    </a-modal>
    <!-- 预付费设置 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="paymentModeSetDialog" class="ownModalBorder titDialog" title="调整付费模式">
      <payment-mode-set :waterId="waterId" @cancelSet="cancelSet" @setSuccess="paymentModeSetSuccess"></payment-mode-set>
    </a-modal>
    <!-- 操作结果 -->
    <a-modal destroyOnClose centered :footer="null" :closable="false" :maskClosable="false" width="520px" v-model="loadingDialog" class="ownModalBorder" title="">
      <water-loading :resultData="resultData" :resultType="resultType" :resultDesc="resultDesc" @setFailure="setFailure" @setSuccess="setSuccess"></water-loading>
    </a-modal>
    <!-- 不支持 -->
    <a-modal destroyOnClose centered v-model="fengDianCommonDialog" :closable="false" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'0px 0px 0px 0px'}" width="432px">
      <feng-dian-common :desc="fengDianCommonDesc" @colseThis="colseThis_fengDian"></feng-dian-common>
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
import WaterLoading from './waterLoading';
import FengDianCommon from './../electric/fengDianCommon';
import Loading from './../common/loading';

export default {
  name: "waterDetail",
  components: {
    ReadingHistoryList,
    ChargeAmountHistoryList,
    ManualReading,
    UnitPriceSet,
    ChargeAmount,
    OverdraftSet,
    PaymentModeSet,
    WaterLoading,
    FengDianCommon,
    Loading,
  },
  props: {
    waterId:{
      type:String,
      required:true,
    }
  },
  data() {
    return {
      waterDetailData:{},
      activekey:'1',
      editHistoryList_price:[],
      editHistoryList_overDraft:[],
      readingObj:{
        houseAlias:'',
        fullAddress:'',
        waterId:'',
        houseId:'',
        billingMethod:'',
        brand:'',
        renterName:'',
        renterPhone:'',
        renterPaymentType:'',
        renterPaymentNo:'',
        renterBank:'',
        meterType:1,
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
      syncInfoLoading:false,
      fengDianCommonDialog:false,
      fengDianCommonDesc:'',
      onlyLoadingDialog:false,
      onlyLoadingDesc:'操作中，请耐心等待...',
    }
  },
  created() {
    this.getWaterDetail();
  },
  methods: {
    colseThis_fengDian(){
      this.fengDianCommonDialog = false;
    },
    syncInfo(){
      this.syncInfoLoading = true;
      API.waterMeterSyncInfo({id:this.waterId}).then(res => {
        if (res.code == 200) {
          this.syncInfoLoading = false;
          this.$message.success('同步成功！');
          this.getWaterDetail();
        }
      })
    },
    getPermission(){
      let permissions = JSON.parse(sessionStorage.getItem('permissions'));
      let markArr = [];
      let btnArr = [];
      let brand = this.waterDetailData.brand;
      if((brand==1||brand==2||brand==3||brand==4)&&this.waterDetailData.paymentMode==1&&(this.waterDetailData.status==1||this.waterDetailData.status==2)){
        markArr.push('mk_smartDevices_water_cz');
      }
      if((brand==1||brand==2||brand==3||brand==4)&&this.waterDetailData.valveStatus==2){
        markArr.push('mk_smartDevices_water_qdgs');
      }
      if(brand==0){
        markArr.push('mk_smartDevices_water_cb');
      }
      if((brand==1||brand==2||brand==3||brand==4)&&this.waterDetailData.paymentMode==2&&(this.waterDetailData.status==1||this.waterDetailData.status==2)){
        markArr.push('mk_smartDevices_water_cb');
      }
      if((brand==1||brand==2||brand==3||brand==4)&&(this.waterDetailData.valveStatus==1||this.waterDetailData.valveStatus==0)){
        markArr.push('mk_smartDevices_water_ds');
      }
      if((brand==1||brand==2||brand==3||brand==4)&&(this.waterDetailData.status==1||this.waterDetailData.status==2)){
        markArr.push('mk_smartDevices_water_ql');
      }
      if(this.waterDetailData.status==1||this.waterDetailData.status==2){
        markArr.push('mk_smartDevices_water_xgsfdj');
      }
      if((brand==1||brand==2||brand==3||brand==4)&&this.waterDetailData.paymentMode==1&&(this.waterDetailData.status==1||this.waterDetailData.status==2)){
        markArr.push('mk_smartDevices_water_xgtzed');
      }
      if((brand==1||brand==2||brand==3||brand==4)&&(this.waterDetailData.status==1||this.waterDetailData.status==2)){
        markArr.push('mk_smartDevices_water_tzffms');
      }
      markArr.push('mk_smartDevices_water_jb');
      //判断资源权限
      markArr.forEach(ele => {
        permissions.some(function(value){
          if (ele == value.mark){
            if(value.mark == 'mk_smartDevices_water_cz'){
              btnArr.push('1');
            }else if(value.mark == 'mk_smartDevices_water_cb'){
              btnArr.push('2');
            }else if(value.mark == 'mk_smartDevices_water_ql'){
              btnArr.push('3');
            }else if(value.mark == 'mk_smartDevices_water_xgsfdj'){
              btnArr.push('4');
            }else if(value.mark == 'mk_smartDevices_water_xgtzed'){
              btnArr.push('5');
            }else if(value.mark == 'mk_smartDevices_water_tzffms'){
              btnArr.push('6');
            }else if(value.mark == 'mk_smartDevices_water_jb'){
              btnArr.push('7');
            }else if(value.mark == 'mk_smartDevices_water_ds'){
              btnArr.push('8');
            }else if(value.mark == 'mk_smartDevices_water_qdgs'){
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
      this.getWaterDetail();
      if(this.activekey == 3){
        this.getModifyLogList(3);
      }
      this.$emit('refreshinfoFun', true);
    },
    readingSuccess(){
      this.manualReadingDialog = false;
      this.getWaterDetail();
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
        this.$message.success('���表成功');
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
      this.getWaterDetail();
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
      if(this.waterDetailData.brand==1||this.waterDetailData.brand==4) {
        //this.chargeAmountDialog = true;
        this.fengDianCommonDialog = true;
        this.fengDianCommonDesc = '该设备暂不支持充值';
      }
    },
    goOverdraftSet(){
      if(this.waterDetailData.brand==1||this.waterDetailData.brand==4) {
        //this.overdraftSetDialog = true;
        this.fengDianCommonDialog = true;
        this.fengDianCommonDesc = '该设备暂不支持修改透支额度';
      }
    },
    goPowerOn(){
      if(this.waterDetailData.brand==1||this.waterDetailData.brand==4){
        this.fengDianCommonDialog = true;
        this.fengDianCommonDesc = '该设备暂不支持启动供水';
      }
      //供电
      // let _this =this;
      // let id =this.waterDetailData.id
      // this.$modal.confirm({
      //   title: '确定要将「' + this.waterDetailData.fullAddress + '」房间绑定的电表启动供电吗？',
      //   content: '启动供电后，该房间恢复供电模式',
      //   okText: '确定',
      //   cancelText: '取消',
      //   onOk() {
      //     API.electricMeterPowerOn({id:id}).then(res => {
      //       if (res.code == 200) {
      //         _this.resultData =res.data;
      //         _this.resultDesc = '正在启动供电，请稍后···';
      //         _this.loadingDialog = true;
      //         _this.resultType = 2;
      //         _this.$emit('refreshinfoFun', true);
      //       }
      //     })
      //   },
      //   onCancel() {
      //     // console.log('Cancel');
      //   },
      // });
    },
    goPowerOff(){
      //断电
      if(this.waterDetailData.brand == 1||this.waterDetailData.brand==4){
        this.fengDianCommonDialog = true;
        this.fengDianCommonDesc = '该设备暂不支持断水';
      }
      // let _this =this;
      // let id =this.waterDetailData.id;
      // this.$modal.confirm({
      //   title: '确定要将「' + this.waterDetailData.fullAddress + '」房间绑定的电表断电吗？',
      //   content: '断电后，该房间里将不可再使用任何电器',
      //   okText: '确定',
      //   cancelText: '取消',
      //   onOk() {
      //     API.electricMeterPowerOff({id:id}).then(res => {
      //       if (res.code == 200) {
      //         _this.resultData =res.data;
      //         _this.resultDesc = '正在断电中，请稍后···';
      //         _this.loadingDialog = true;
      //         _this.resultType = 4;
      //         _this.$emit('refreshinfoFun', true);
      //       }
      //     })
      //   },
      //   onCancel() {
      //     // console.log('Cancel');
      //   },
      // });
    },
    goClearing(){
      if(this.waterDetailData.brand==1||this.waterDetailData.brand==4){
        //清零
        this.fengDianCommonDialog = true;
        this.fengDianCommonDesc = '该设备暂不支持清零';
        // let _this =this;
        // let id =this.waterDetailData.id;
        // this.$modal.confirm({
        //   title: '确定要清空电表「' + this.waterDetailData.name+'-'+ this.waterDetailData.sn+ '」上已用电量(电表读数)或已充值电量吗？',
        //   content: '该操作会清空电表已用电量(电表读数)和已充值电量，透支额度不会清除；清空后不可恢复，请谨慎操作',
        //   okText: '确定',
        //   cancelText: '取消',
        //   onOk() {
        //     API.electricMeterClearing({waterId:id}).then(res => {
        //       if (res.code == 200) {
        //         _this.resultData =res.data;
        //         _this.resultDesc = '正在清零读数，请稍后···';
        //         _this.loadingDialog = true;
        //         _this.resultType = 5;
        //       }
        //     })
        //   },
        //   onCancel() {
        //     // console.log('Cancel');
        //   },
        // });
      }
    },
    goPaymentModeSet(){
      if(this.waterDetailData.brand==1||this.waterDetailData.brand==4) {
        //this.paymentModeSetDialog = true;
        this.fengDianCommonDialog = true;
        this.fengDianCommonDesc = '该设备暂不支持调整付费模式';
      }
    },
    goUnitPriceSet(){
      if(this.waterDetailData.brand==1||this.waterDetailData.brand==0||this.waterDetailData.brand==4) {
        this.unitPriceSetDialog = true;
      }
    },
    goManualReading(){
      //抄表
      if(this.waterDetailData.brand==0){
        this.manualReadingDialog = true;
      }
      if(this.waterDetailData.brand==1) {
        //直接调抄表接口
        let parameter = {
          waterMeterId: this.waterId,
        }
        API.waterMeterManualReading(parameter).then(res => {
          if (res.code === '200') {
            this.loadingDialog = true;
            this.resultData = res.data;
            this.resultDesc = '抄表中...';
            this.resultType = 3;
          } else {
            this.$message.error('抄表失败');
          }
        });
      }
      if(this.waterDetailData.brand==4){
        //直接调抄表接口
        let parameter = {
          waterMeterId: this.waterId,
        }
        this.onlyLoadingDialog = true;
        API.waterMeterManualReading(parameter).then(res => {
          if(!res){
            setTimeout(()=>{
              this.onlyLoadingDialog = false;
            },2000);
          }
          if (res.code === '200') {
            this.onlyLoadingDialog = false;
            this.getWaterDetail();
          } else {
            this.onlyLoadingDialog = false;
            this.$message.error('抄表失败');
          }
        });
      }
    },
    paymentModeSetSuccess(){
      this.paymentModeSetDialog = false;
      this.getWaterDetail();
      this.$emit('refreshinfoFun', true);
    },
    overdraftSetSuccess(){
      this.overdraftSetDialog = false;
      this.getWaterDetail();
      if(this.activekey == 4){
        this.getModifyLogList(4);
      }
    },
    genSuccess(){
      this.chargeAmountDialog = false;
      this.getWaterDetail();
      this.$refs.chargeAmountHistoryList && this.$refs.chargeAmountHistoryList.initData();
    },
    chargeAmountSuccess(){
      this.chargeAmountDialog = false;
      this.getWaterDetail();
      this.$refs.chargeAmountHistoryList && this.$refs.chargeAmountHistoryList.initData();
    },
    unBind(){
      //解绑
      let _this =this;
      let id =this.waterDetailData.id
      this.$modal.confirm({
        title: '确定要将房源「' + this.waterDetailData.fullAddress + '」房间绑定的水表吗？',
        content: '解绑后不可恢复，请谨慎操作',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.waterMeterUnbind({id:id}).then(res => {
            if (res.code == 200) {
              _this.$message.success('水表解绑成功！');
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
        this.getWaterDetail();
      }
      else if(this.activekey == 2){
        if(this.waterDetailData.paymentMode==1&&this.waterDetailData.brand!=0){
          this.$refs.chargeAmountHistoryList && this.$refs.chargeAmountHistoryList.initData();
        }
        else{
          this.$refs.readingHistoryList && this.$refs.readingHistoryList.initData();
        }
      }
      else if(this.activekey == 3){
        this.getModifyLogList(3);
      }
      else if(this.activekey == 4){
        this.getModifyLogList(4);
      }
    },
    getWaterDetail(){
      this.skeletonLoading = true;
      API.waterMeterView({id:this.waterId}).then(res => {
        if(res.code === '200'){
          this.waterDetailData = res.data;
          this.readingObj.houseAlias = this.waterDetailData.houseAlias;
          this.readingObj.fullAddress = this.waterDetailData.cityName + this.waterDetailData.areaName + this.waterDetailData.fullAddress ;
          this.readingObj.houseId = this.waterDetailData.houseId;
          this.readingObj.waterId = this.waterId;
          this.readingObj.billingMethod =this.waterDetailData.billingMethod;
          this.readingObj.brand =this.waterDetailData.brand;
          this.readingObj.renterName = this.waterDetailData.renterName;
          this.readingObj.renterPhone = this.waterDetailData.renterPhone;
          this.readingObj.renterPaymentType =this.waterDetailData.renterPaymentType;
          this.readingObj.renterPaymentNo = this.waterDetailData.renterPaymentNo;
          this.readingObj.renterBank = this.waterDetailData.renterBank;
          this.readingObj.meterType = this.waterDetailData.meterType;
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
        waterMeterId : this.waterDetailData.id,
        type:type,
      };
      API.waterMeterModifyLogList(param).then(res => {
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
  .waterDetail{
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
        .radius-font-chaoyi{
          color: #13c2c2;
          background-color: fade(#13c2c2, 10%);
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