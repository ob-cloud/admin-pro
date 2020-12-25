<template>
  <div class="electric-box">
    <div class="loadingCircle" id="loadingCircle" v-show="spinLoading"></div>
    <div class="add-btn-wrap" @click="addElectric()" v-mark="['mk_smartDevices_electric_bddb']">
      <icon-font type="iconyumengtubiao_tianjia" /> 绑定电表
    </div>
    <content-top>
      <div class="status-box f-fl">
        <div class="status">
          <p :class="{ active: activeIndex === 0 }" @click="changeStatus(null,0)">
            <span >{{ statusData[0].title }}</span>
          </p>
          <p :class="{ active: activeIndex === 1 }" @click="changeStatus(1,1)">
            <span >{{ statusData[1].title }}</span>
            <span :style="{ color: statusData[1].color }">({{ statusData[1].status }})</span>
          </p>
          <p :class="{ active: activeIndex === 2 }" @click="changeStatus(2,2)">
            <span >{{ statusData[2].title }}</span>
            <span :style="{ color: statusData[2].color }">({{ statusData[2].status }})</span>
          </p>
          <p :class="{ active: activeIndex === 3 }" @click="changeStatus(-1,3)">
            <span >{{ statusData[3].title }}</span>
            <span :style="{ color: statusData[3].color }">({{ statusData[3].status }})</span>
          </p>
          <div style="height: 14px;width: 1px;background: #dddddd;margin: 18px 20px 0 0;"></div>
          <p>
            <a-checkbox v-model="onlineFlag" @change="onOfflineChange"><span >{{ statusData[4].title }}</span><span :style="{ color: statusData[4].color }">({{ statusData[4].status }})</span></a-checkbox>
          </p>
          <p>
            <a-checkbox v-model="offlineFlag" @change="onOfflineChange"><span >{{ statusData[5].title }}</span><span :style="{ color: statusData[5].color }">({{ statusData[5].status }})</span></a-checkbox>
          </p>
        </div>
      </div>
      <div class="search-box f-fr">
        <search-dialog placeholder="房源编号/房源地址/项目地址/设备序列号/编码" :showCityTown="true" :searchList="searchList" @search="assetsFormData"></search-dialog>
      </div>
    </content-top>
    <content-main>
      <skeleton-electric-list v-show="spinLoading"></skeleton-electric-list>
      <div class="table" v-show="!spinLoading">
        <div class="checkOption" v-show="checkedCount > 0" id="checkOption">
          <div class="dealOption">
            <span class="headSpan">已选中
              <span class="themeColor">{{checkedCount}}</span> 项
              <a-divider type="vertical" />
            </span>
            <span class="cursor" @click="goBatchPriceSet">
              <span class="themeColor"><icon-font type="iconyumengtubiao_bianji-"></icon-font></span>
              <span class="themeColor" style="margin-left: 6px">批量修改单价</span>
              <a-divider type="vertical" />
            </span>
            <span class="cursor" @click="goBatchOverdraftSet">
              <span class="themeColor"><icon-font type="iconyumengtubiao_bianji-"></icon-font></span>
              <span class="themeColor" style="margin-left: 6px">批量修改透支额度</span>
              <a-divider type="vertical" />
            </span>
            <span class="cursor" @click="goBatchPaymentModeSet">
              <span class="themeColor"><icon-font type="iconyumengtubiao_bianji-"></icon-font></span>
              <span class="themeColor" style="margin-left: 6px">批量调整付费模式</span>
              <a-divider type="vertical" />
            </span>
            <span class="cursor" @click="batchUnBind">
              <span class="themeColor"><icon-font type="iconjiechu"></icon-font></span>
              <span class="themeColor" style="margin-left: 6px">批量解绑</span>
            </span>
          </div>
          <div class="themeColor cancelOption cursor">
            <span @click="cancelOption ">取消选择</span>
          </div>
        </div>
        <a-table rowKey="id" :bordered="true" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :customRow="openDetail" :pagination="false" :columns="tableColumns" :dataSource="tableData">
          <div slot="statusName" slot-scope="text,record">
            <div v-if="(record.valveStatus==1||record.valveStatus==0)" class="fontNormal clearfix">
              <div class="IconRadius onLine f-fl"></div>
              <div class="f-fl">
                <span type="primary" style="color: #111111">供电</span>
              </div>
              <div class="itemStyle f-fl" :class="record.status==1?'onLineStyle':'offLineStyle'">
                {{record.status==1?'在线':'离线'}}
              </div>
            </div>
            <div v-if="record.valveStatus==2" class="fontNormal clearfix">
              <div class="IconRadius error f-fl"></div>
              <div class="f-fl">
                <span type="primary" style="color: #111111">断电</span>
              </div>
              <div class="itemStyle f-fl" :class="record.status==1?'onLineStyle':'offLineStyle'">
                {{record.status==1?'在线':'离线'}}
              </div>
            </div>
            <div v-if="record.valveStatus==-1" class="fontNormal clearfix">
              <div class="IconRadius error f-fl"></div>
              <div class="f-fl">
                <span type="primary" style="color: #111111">未知</span>
              </div>
              <div class="itemStyle f-fl" :class="record.status==1?'onLineStyle':'offLineStyle'">
                {{record.status==1?'在线':'离线'}}
              </div>
            </div>
          </div>
          <div slot="brand" slot-scope="text">
            {{text==0?'普通电表':text==1?'云丁':text==2?'果加':text==3?'蜂电':text==4?'超仪':'-'}}
          </div>
          <div slot="sn" slot-scope="text">
            {{text?text:'-'}}
          </div>
          <div slot="paymentModeName" slot-scope="text">
            {{text?text:'-'}}
          </div>
          <div slot="fullAddress" slot-scope="text,record">
            <a-popover>
              <template slot="content">
                <p style="padding: 8px 18px;">
                  <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                </p>
              </template>
              <div class="f-fl" style="width:375px;" type="primary">
                <p class="overHidde" style="line-height:22px;">
                  <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                </p>
              </div>
            </a-popover>
          </div>
          <div slot="action" slot-scope="text, record">
            <a-popover :title="null" trigger="hover" v-if="checkOpts(record) == true">
              <template slot="content" >
                <div v-if="record.btnArr.indexOf('1') != -1" class="action cursor" @click="goChargeAmount(record)">充值电量</div>
                <div v-if="record.btnArr.indexOf('2') != -1" class="action cursor" @click="goPowerOn(record)">启动供电</div>
                <div v-if="record.btnArr.indexOf('3') != -1" class="action cursor" @click="goManualReading(record)">抄表</div>
                <div v-if="record.btnArr.indexOf('4') != -1" class="action cursor" @click="goPowerOff(record)">断电</div>
                <div v-if="record.btnArr.indexOf('5') != -1" class="action cursor" @click="goClearing(record)">清零</div>
                <div v-if="record.btnArr.indexOf('6') != -1" class="action cursor" @click="goUnitPriceSet(record)">修改电费单价</div>
                <div v-if="record.btnArr.indexOf('7') != -1" class="action cursor" @click="goOverdraft(record)">修改透支额度</div>
                <div v-if="record.btnArr.indexOf('8') != -1" class="action cursor" @click="goPaymentModeSet(record)">调整付费模式</div>
                <div v-if="record.btnArr.indexOf('9') != -1" class="action cursor" @click="unBind(record)">解绑</div>
              </template>
              <div style="width: 100%;height: 100%">
                <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
              </div>
            </a-popover>
          </div>
        </a-table>
        <div class="contFoot" v-show="tableData.length>0">
          <a-pagination size="small" :total="pagination.total" :current="pagination.current" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
        </div>
      </div>
    </content-main>
    <!-- 绑定电表 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1300px" v-model="batchBindElectricDialog" class="ownModalBorder titDialog" title="绑定电表">
      <batch-bind-electric @cancelBind="cancelBind" @bindComplete="bindComplete"></batch-bind-electric>
    </a-modal>
    <!-- 绑定电表结果 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="bindElectricResultDialog" class="ownModalBorder titDialog" title="绑定结果" @cancel="closeBindResult()">
      <bind-electric-result :bindElectricResult="bindElectricResult" @closeThis="closeBindResult()" @viewFailHouseList="viewFailHouseList()"></bind-electric-result>
    </a-modal>
    <!-- 失败房源的批量绑定 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="failureBindElectricDialog" class="ownModalBorder titDialog" title="绑定失败的房源">
      <failure-bind-electric :bindElectricResult="bindElectricResult" :bindElectricBrand="bindElectricBrand" :bindLockAuthAccountId="bindElectricAuthAccountId" @cancelBind="cancelBind" @bindComplete="bindComplete"></failure-bind-electric>
    </a-modal>
    <!-- 充值电量 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="chargeAmountDialog" class="ownModalBorder titDialog" title="充值电量">
      <charge-amount :electricMeterId="electricMeterId" @chargeAmountSuccess="chargeAmountSuccess" @genSuccess="genSuccess"></charge-amount>
    </a-modal>
    <!-- 单价设置 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="unitPriceSetDialog" class="ownModalBorder titDialog" title="修改电费单价">
      <unit-price-set :electricMeterId="electricMeterId" @cancelSet="cancelSet" @setSuccess="unitPriceSetSuccess"></unit-price-set>
    </a-modal>
    <!-- 透支额度设置 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="overdraftSetDialog" class="ownModalBorder titDialog" title="设置透支额度">
      <overdraft-set :electricMeterId="electricMeterId" @cancelSet="cancelSet" @setSuccess="overdraftSetSuccess"></overdraft-set>
    </a-modal>
    <!-- 预付费设置 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="paymentModeSetDialog" class="ownModalBorder titDialog" title="调整付费模式">
      <payment-mode-set :electricMeterId="electricMeterId" @cancelSet="cancelSet" @setSuccess="paymentModeSetSuccess"></payment-mode-set>
    </a-modal>
    <!-- 抄表 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="manualReadingDialog" class="ownModalBorder titDialog" title="抄表">
      <manual-reading :electricMeterId="electricMeterId" @cancelSet="cancelSet" @readingSuccess="readingSuccess"></manual-reading>
    </a-modal>
    <!-- 透支额度批量设置 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="batchOverdraftSetDialog" class="ownModalBorder titDialog" title="批量设置透支额度">
      <batch-overdraft-set :selected-row-keys="selectedRowKeys" @cancelSet="cancelSet" @closeThis="batchSetOverdraftSuccess"></batch-overdraft-set>
    </a-modal>
    <!-- 批量设置单价 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="batchPriceSetDialog" class="ownModalBorder titDialog" title="批量修改电费单价">
      <batch-price-set :selected-row-keys="selectedRowKeys" @cancelSet="cancelSet" @setSuccess="batchSetPriceSuccess"></batch-price-set>
    </a-modal>
    <!-- 批量设置付费模式-->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="batchPaymentModeSetDialog" class="ownModalBorder titDialog" title="批量调整付费模式">
      <batch-payment-mode-set :selected-row-keys="selectedRowKeys" @cancelSet="cancelSet" @setSuccess="batchSetPaymentModeSuccess"></batch-payment-mode-set>
    </a-modal>
    <!-- 操作结果 -->
    <a-modal destroyOnClose centered :footer="null" :closable="false" :maskClosable="false" width="520px" v-model="loadingDialog" class="ownModalBorder" title="">
      <electric-loading :resultData="resultData" :resultType="resultType" :resultDesc="resultDesc" @setFailure="setFailure" @setSuccess="setSuccess"></electric-loading>
    </a-modal>
    <!-- 电表详情 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="electricDetailsDialog" class="ownModalBorder titDialog" title="电表详情" @cancel="isRefreshFun">
      <electric-detail :electricMeterId="electricMeterId" @refreshinfoFun="refreshinfoFun" @unBindSuccess="unBindSuccessFromDetail"></electric-detail>
    </a-modal>
    <!-- 蜂电操作提示 -->
    <a-modal destroyOnClose centered v-model="fengDianCommonDialog" :closable="false" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'0px 0px 0px 0px'}" width="432px">
      <feng-dian-common :desc="fengDianCommonDesc" @colseThis="colseThis_fengDian"></feng-dian-common>
    </a-modal>
    <!-- 蜂电操作提示 -->
    <a-modal destroyOnClose centered v-model="fengDianChargeAmountDialog" :closable="false" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'0px 0px 0px 0px'}" width="432px">
      <feng-dian-charge-amount :fengDianSn="fengDianSn" @colseThis="colseThis_fengDian"></feng-dian-charge-amount>
    </a-modal>
    <!-- 超仪操作提示 -->
    <a-modal destroyOnClose centered :footer="null" :closable="false" :maskClosable="false" width="520px" v-model="onlyLoadingDialog" class="ownModalBorder" title="">
      <loading :resultDesc="onlyLoadingDesc"></loading>
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue';
import SearchDialog from '@/components/SearchDialog';
import SkeletonElectricList from '../../skeleton/smartDevices/electricList';
import BatchBindElectric from './batchBindElectricNew';
import BindElectricResult from './bindElectricResult';
import FailureBindElectric from './failureBindElectric';
import UnitPriceSet from './unitPriceSet';
import OverdraftSet from './overdraftSet';
import PaymentModeSet from './paymentModeSet';
import ElectricLoading from './electricLoading';
import BatchOverdraftSet from './batchOverdraftSet';
import BatchPriceSet from './batchPriceSet';
import BatchPaymentModeSet from './batchPaymentModeSet';
import ManualReading from './manualReading';
import ChargeAmount from './chargeAmount';
import ElectricDetail from './electricDetail';
import FengDianCommon from './fengDianCommon';
import FengDianChargeAmount from './fengDianChargeAmount';
import Loading from './../common/loading';
import * as API from "@/api/smartDevices";
export default {
  name: "index",
  components: {
    BatchPriceSet,
    BatchPaymentModeSet,
    SearchDialog,
    SkeletonElectricList,
    BatchBindElectric,
    BindElectricResult,
    FailureBindElectric,
    UnitPriceSet,
    OverdraftSet,
    PaymentModeSet,
    ElectricLoading,
    BatchOverdraftSet,
    ManualReading,
    ElectricDetail,
    ChargeAmount,
    FengDianCommon,
    FengDianChargeAmount,
    Loading,
  },
  data() {
    let beforeThirtyDayTime = Vue.prototype.$moment().startOf('day').add(-29, 'days').valueOf();
    let beforeTwoDayTime = Vue.prototype.$moment().startOf('day').add(-2, 'days').valueOf();
    let todayBeginTime = Vue.prototype.$moment().startOf('day').valueOf();
    let todayEndTime = Vue.prototype.$moment().endOf('day').valueOf();
    return{
      spinLoading:false,
      activeIndex:0,
      sendData:{
        current:1,
        size:20,
        onlineStatusType:'',     //在线状态类型（1：在线；2：离线；9：在线但电量低；）
        fuzzyQueryType:'',
        fuzzyKeyword:'',
        bindTimeBegin:'',
        bindTimeEnd:'',
        brand:'',
        houseType:'',
        paymentMode:'',
        status:'',
      },
      statusData: [
        {
          title: '全部',
          status: 0,
          string: 'dataTotal',
          query: null,
        },
        {
          title: '供电 ',
          status: 0,
          string: 'powerSupplyTotal',
          query: 1,
          color: '#0A87F8',
        },
        {
          title: '断电',
          status: 0,
          string: 'powerOffTotal',
          query: 12,
          color: '#777777',
        },
        {
          title: '异常',
          status: 0,
          string: 'errTotal',
          query: 9,
          color: '#FB4246',
        },
        {
          title: '在线',
          status: 0,
          string: 'normalTotal',
          query: 9,
          color: '#03C683',
        },
        {
          title: '离线',
          status: 0,
          string: 'abnormalTotal',
          query: 9,
          color: '#777777',
        },
      ],
      searchList:[
        {
          key: 'fuzzyQueryType',
          list: [
            {
              label: '综合检索',
              value: 0,
            },
            {
              label: '房源编号',
              value: 1
            },
            {
              label: '房源地址',
              value: 2
            },
            {
              label: '项目地址',
              value: 3
            },
            {
              label: '设备序列号/门锁编码',
              value: 4
            },
          ],
        },
        {
          key: 'brand',
          title: '电表类型',
          currentActiveIndex: 0,
          list: [
            {
              label: '全部',
              value: null
            },
            {
              label: '普通电表',
              value: 0
            },
            {
              label: '云丁',
              value: 1
            },
            // {
            //   label: '果加',
            //   value: 2
            // },
            {
              label: '蜂电',
              value: 3
            },
            {
              label: '超仪',
              value: 4
            },
          ],
        },
        {
          key: 'paymentMode',
          title: '电表付费模式',
          currentActiveIndex: 0,
          list: [
            {
              label: '全部',
              value: null
            },
            {
              label: '预付费',
              value: 1
            },
            {
              label: '后付费',
              value: 2
            },
          ],
        },
        {
          key: 'houseType',
          title: '房源类型',
          currentActiveIndex: 0,
          list: [
            {
              label: '全部',
              value: null
            },
            {
              label: '合租',
              value: 2
            },
            {
              label: '整租',
              value: 1
            },
            {
              label: '独栋',
              value: 3
            }
          ],
        },
        {
          key: ['bindTimeBegin', 'bindTimeEnd'],
          title: '绑表时间',
          currentActiveIndex: 0,
          list: [
            {
              label: '不限',
              value: ['', '']
            },
            {
              label: '今天',
              value: [todayBeginTime, todayEndTime]
            },
            {
              label: '7天内',
              value: [beforeTwoDayTime, todayEndTime]
            },
            {
              label: '30天内',
              value: [beforeThirtyDayTime, todayEndTime]
            },
            {
              label: '自定义',
              value: ['', '']
            }
          ],
        },
      ],
      tableColumns: [
        {
          title: '设备状态',
          dataIndex: 'statusName',
          key: 'statusName',
          scopedSlots: { customRender: 'statusName' },
          align: 'left',
          width: '122px',
        },
        {
          title: '设备品牌',
          dataIndex: 'brand',
          key: 'brand',
          scopedSlots: { customRender: 'brand' },
          align: 'left',
          width: '140px',

        },
        {
          title: '设备序列号/编码',
          key: 'sn',
          dataIndex: 'sn',
          scopedSlots: { customRender: 'sn' },
          align: 'left',
          width: '200px',
        },
        {
          title: '单价（元/度）',
          dataIndex: 'unitPrice',
          key: 'unitPrice',
          scopedSlots: { customRender: 'unitPrice' },
          align: 'left',
          width: '150px',
        },
        {
          title: '付费模式',
          dataIndex: 'paymentModeName',
          key: 'paymentModeName',
          scopedSlots: { customRender: 'paymentModeName' },
          align: 'left',
          width: '150px',
        },
        {
          title: '已绑房源地址',
          key: 'fullAddress',
          dataIndex: 'fullAddress',
          align: 'left',
          scopedSlots: { customRender: 'fullAddress' },
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: '110px',
          customCell:() =>{
            return {
              on:{
                click:()=>{
                  event.stopPropagation();
                }
              }
            }
          },
        },
      ],
      tableData:[],
      selectedRowKeys:[],
      checkedCount:0,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 20,//每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
      },
      electricDetailsDialog:false,
      electricMeterId:'',
      batchBindElectricDialog:false,
      failureBindElectricDialog:false,
      bindElectricResult:{},
      bindElectricBrand:0,
      bindElectricAuthAccountId:'',
      bindElectricResultDialog:false,
      unitPriceSetDialog:false,
      overdraftSetDialog:false,
      paymentModeSetDialog:false,
      batchOverdraftSetDialog:false,
      batchPriceSetDialog:false,
      batchPaymentModeSetDialog:false,
      manualReadingDialog:false,
      chargeAmountDialog:false,
      resultData:{},
      resultDesc:'',
      loadingDialog:false,
      resultType:0,   //1、充值电量；2、启动供电；3、抄表；4、断电；5、清零；6、 修改电费单价；7、修改透支额度；8、调整付费模式；9、解绑
      isRefresh:false,
      fengDianCommonDialog:false,
      fengDianChargeAmountDialog:false,
      fengDianCommonDesc:'',
      fengDianSn:'',
      onlineFlag:false,
      offlineFlag:false,
      onlyLoadingDialog:false,
      onlyLoadingDesc:'操作中，请耐心等待...',
    }
  },
  created() {
    switch (this.$route.params.search) {
      case 'all':
        break;
      case 'powerSupply':
        this.activeIndex = 1;
        this.sendData.valveStatus = 1;
        break;
      case 'powerOff':
        this.activeIndex = 2;
        this.sendData.valveStatus = 2;
        break;
      case 'error':
        this.activeIndex = 3;
        this.sendData.valveStatus = -1;
        break;
    }
    this.initData();
  },
  methods: {
    onOfflineChange(){
      if((this.onlineFlag&&this.offlineFlag)||(!this.onlineFlag&&!this.offlineFlag)){
        this.sendData.status = '';
      }
      else if(this.onlineFlag&&!this.offlineFlag){
        this.sendData.status = 1;
      }
      else if(!this.onlineFlag&&this.offlineFlag){
        this.sendData.status = 2;
      }
      this.electricMeterList();
    },
    colseThis_fengDian(){
      this.fengDianChargeAmountDialog = false;
      this.fengDianCommonDialog = false;
    },
    unBindSuccessFromDetail(){
      this.electricDetailsDialog = false;
      this.initData();
    },
    refreshinfoFun(res){  //详情有改变的操作  就改变状态
      if(res){
        this.isRefresh = res
      }
    },
    isRefreshFun(){      //根据详情有改变数据的操作 需要刷新
      if(this.isRefresh){
        this.initData();
      }
      this.electricDetailsDialog = false;
      this.isRefresh = false
    },
    batchSetOverdraftSuccess(){
      this.batchOverdraftSetDialog = false;
      this.initData();
    },
    batchSetPriceSuccess(){
      this.batchPriceSetDialog = false;
      this.initData();
    },
    batchSetPaymentModeSuccess(){
      this.batchPaymentModeSetDialog = false;
      this.initData();
    },
    setFailure(resultType){
      this.loadingDialog = false;
      this.overdraftSetDialog = false;
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
    },
    setSuccess(resultType){
      if(resultType==1){
        this.$message.success('充值电量成功');
      }
      if(resultType==2){
        this.$message.success('供电成功');
      }
      if(resultType==3){
        this.$message.success('抄表成功');
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
      this.initData();
    },
    goChargeAmount(record){
      //充值电量
      if(record.brand == 1){
        this.electricMeterId = record.id;
        this.chargeAmountDialog = true;
      }
      if(record.brand == 3){
        this.fengDianChargeAmountDialog = true;
        this.fengDianSn = record.sn;
      }
    },
    goManualReading(record){
      //抄表
      if(record.brand==0){
        this.electricMeterId = record.id;
        this.manualReadingDialog = true;
      }
      if(record.brand==1||record.brand==4) {
        //直接调抄表接口
        let parameter = {
          electricMeterId:record.id,
        }
        if(record.brand==4){
          this.onlyLoadingDialog = true;
        }
        API.electricMeterManualReading(parameter).then(res=>{
          if(!res&&record.brand==4){
            setTimeout(()=>{
              this.onlyLoadingDialog = false;
            },2000);
          }
          if(res.code === '200'){
            this.resultData = res.data;
            if(this.resultData.operationId){
              this.loadingDialog = true;
              this.resultDesc = '抄表中...';
              this.resultType = 3;
            }
            else{
              this.onlyLoadingDialog = false;
            }
          }
          else{
            if(record.brand==4){
              this.onlyLoadingDialog = false;
            }
            this.$message.error('抄表失败');
          }
        });
      }
      if(record.brand==3){
        this.fengDianCommonDialog = true;
        this.fengDianCommonDesc = '该设备不支持抄表';
      }
    },
    goPowerOn(record){
      //供电
      let _this =this;
      let id =record.id
      this.$modal.confirm({
        title: '确定要将「' + record.fullAddress + '」房间绑定的电表启动供电吗？',
        content: '启动供电后，该房间恢复供电模式',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.electricMeterPowerOn({id:id}).then(res => {
            if (res.code == 200) {
              _this.resultData = res.data;
              if(_this.resultData.operationId) {
                _this.resultDesc = '正在启动供电，请稍后···';
                _this.loadingDialog = true;
                _this.resultType = 2;
              }
              else{
                _this.$message.success('操作成功');
              }
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    goPowerOff(record){
      //断电
      let _this =this;
      let id =record.id
      this.$modal.confirm({
        title: '确定要将「' + record.fullAddress + '」房间绑定的电表断电吗？',
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
              else{
                _this.$message.success('操作成功');
              }
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    goClearing(record){
      //清零
      if(record.brand==1||record.brand==4) {
        let _this = this;
        let id = record.id
        this.$modal.confirm({
          title: '确定要清空电表「' + record.name + '-' + record.sn + '」上已用电量(电表读数)或已充值电量吗？',
          content: '该操作会清空电表已用电量(电表读数)和已充值电量，透支额度不会清除；清空后不可恢复，请谨慎操作',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            API.electricMeterClearing({electricMeterId: id}).then(res => {
              if (res.code == 200) {
                _this.resultData = res.data;
                if(_this.resultData.operationId) {
                  _this.resultDesc = '正在清零读数，请稍后···';
                  _this.loadingDialog = true;
                  _this.resultType = 5;
                }
                else{
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
      if(record.brand==3) {
        this.fengDianCommonDialog = true;
        this.fengDianCommonDesc = '该设备不支持电表清零';
      }
    },
    readingSuccess(){
      this.manualReadingDialog = false;
      this.electricMeterList();
    },
    paymentModeSetSuccess(){
      this.paymentModeSetDialog = false;
      this.electricMeterList();
    },
    overdraftSetSuccess(){
      this.overdraftSetDialog = false;
      this.electricMeterList();
    },
    unitPriceSetSuccess(){
      this.unitPriceSetDialog = false;
      this.electricMeterList();
    },
    genSuccess(){
      this.chargeAmountDialog = false;
      this.electricMeterList();
    },
    chargeAmountSuccess(){
      this.chargeAmountDialog = false;
      this.electricMeterList();
    },
    cancelSet(){
      this.unitPriceSetDialog = false;
      this.paymentModeSetDialog = false;
      this.overdraftSetDialog = false;
      this.batchOverdraftSetDialog = false;
      this.batchPriceSetDialog = false;
      this.batchPaymentModeSetDialog = false;
      this.manualReadingDialog = false;
    },
    goPaymentModeSet(record){
      if(record.brand==1) {
        this.electricMeterId = record.id;
        this.paymentModeSetDialog = true;
      }
      if(record.brand==3||record.brand==4) {
        this.fengDianCommonDialog = true;
        this.fengDianCommonDesc = '该设备不支持调整付费模式';
      }
    },
    goUnitPriceSet(record){
      if(record.brand==1||record.brand==0||record.brand==4) {
        this.electricMeterId = record.id;
        this.unitPriceSetDialog = true;
      }
      if(record.brand==3) {
        this.fengDianCommonDialog = true;
        this.fengDianCommonDesc = '该设备不支持修改电费单价';
      }
    },
    goOverdraft(record){
      if(record.brand==1||record.brand==4) {
        this.electricMeterId = record.id;
        this.overdraftSetDialog = true;
      }
      if(record.brand==3) {
        this.fengDianCommonDialog = true;
        this.fengDianCommonDesc = '该设备不支持修改透支额度';
      }
    },
    unBind(record){
      //解绑
      let _this =this;
      let id =record.id
      this.$modal.confirm({
        title: '确定要将房源「' + record.fullAddress + '」房间绑定的电表吗？',
        content: '解绑后不可恢复，请谨慎操作',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.electricMeterUnbind({id:id}).then(res => {
            if (res.code == 200) {
              _this.$message.success('电表解绑成功！');
              _this.initData();
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    checkOpts(record){
      if(!this.permissions||this.permissions.length==0){
        this.permissions = JSON.parse(sessionStorage.getItem('permissions'));
      }
      let markArr = ['mk_smartDevices_electric_czdl','mk_smartDevices_electric_qdgd','mk_smartDevices_electric_cb','mk_smartDevices_electric_dd','mk_smartDevices_electric_dbql','mk_smartDevices_electric_xgdfdj','mk_smartDevices_electric_xgtzed','mk_smartDevices_electric_tzffms','mk_smartDevices_electric_jbdb'];
      let btnArr = [];
      markArr.forEach(ele => {
        this.permissions.some(function(value){
          if (ele == value.mark){
            //智能电表、预付费、供电/断电 -> 充值电量
            if(value.mark == 'mk_smartDevices_electric_czdl'&&(record.brand==1||record.brand==2||record.brand==3||record.brand==4)&&record.paymentMode==1&&(record.status==1||record.status==2)){
              btnArr.push('1');
            }
            //智能电表、断电 -> 启动供电
            if(value.mark == 'mk_smartDevices_electric_qdgd'&&(record.brand==1||record.brand==2||record.brand==3||record.brand==4)&&record.valveStatus==2){
              btnArr.push('2');
            }
            // 智能电表/普通电表、后付费、供电/断电 -> 抄表
            if(value.mark == 'mk_smartDevices_electric_cb'&&record.brand==0){
              btnArr.push('3');
            }
            if(value.mark == 'mk_smartDevices_electric_cb'&&(record.brand==1||record.brand==2||record.brand==3||record.brand==4)&&record.paymentMode==2&&(record.status==1||record.status==2)){
              btnArr.push('3');
            }
            // 智能电表、供电 -> 断电
            if(value.mark == 'mk_smartDevices_electric_dd'&&(record.brand==1||record.brand==2||record.brand==3||record.brand==4)&&(record.valveStatus==1||record.valveStatus==0)){
              btnArr.push('4');
            }
            // 智能电表、供电/断电  -> 清零
            if(value.mark == 'mk_smartDevices_electric_dbql'&&(record.brand==1||record.brand==2||record.brand==3||record.brand==4)&&(record.status==1||record.status==2)){
              btnArr.push('5');
            }
            //  智能电表/普通电表、供电/断电 -> 修改电费单价
            if(value.mark == 'mk_smartDevices_electric_xgdfdj'&&(record.brand==0||record.brand==1||record.brand==2||record.brand==3||record.brand==4)&&(record.status==1||record.status==2)){
              btnArr.push('6');
            }
            // 智能电表、预付费、供电/断电 -> 修改透支额度
            if(value.mark == 'mk_smartDevices_electric_xgtzed'&&(record.brand==1||record.brand==2||record.brand==3||record.brand==4)&&record.paymentMode==1&&(record.status==1||record.status==2)){
              btnArr.push('7');
            }
            // 智能电表、供电/断电  -> 调整付费模式
            if(value.mark == 'mk_smartDevices_electric_tzffms'&&(record.brand==1||record.brand==2||record.brand==3||record.brand==4)&&(record.status==1||record.status==2)){
              btnArr.push('8');
            }
            // 所有             ->解绑
            if(value.mark == 'mk_smartDevices_electric_jbdb'){
              btnArr.push('9');
            }
            return true;
          }
        });

      });
      record.btnArr = btnArr;
      if(btnArr.length > 0){
        return true;
      }
      return false;
    },
    viewFailHouseList(){
      this.bindElectricResultDialog = false;
      //打开绑锁失败房源
      this.failureBindElectricDialog = true;
    },
    closeBindResult(){
      this.batchBindElectricDialog = false;
      this.bindElectricResultDialog = false;
      this.failureBindElectricDialog = false;
      this.bindElectricResult = {};
      this.initData();
    },
    goBatchPriceSet(){
      this.batchPriceSetDialog = true;
    },
    goBatchOverdraftSet(){
      this.batchOverdraftSetDialog = true;
    },
    goBatchPaymentModeSet(){
      this.batchPaymentModeSetDialog = true;
    },
    batchUnBind(){
      //批量解绑
      let _this = this;
      let parameter = {
        idList:this.selectedRowKeys,
      };
      this.$modal.confirm({
        title: '确定要将选择的 ' + this.selectedRowKeys.length+ '个 电表解绑吗？',
        content: '解绑后，该电表上的抄表记录和充值记录会同步清空；且解绑后不可恢复，请谨慎操作',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.batchUnbind(parameter).then(res => {
            if (res.code == 200) {
              _this.$message.success('电表批量解绑成功！');
              _this.initData();
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    cancelOption(){
      //取消选中，取消相关操作
      this.selectedRowKeys = [];
      //清除操作图层
      this.layerChange(-1);
    },
    bindComplete(bindElectricResult,bindElectricBrand,bindElectricAuthAccountId){
      this.batchBindElectricDialog = false;
      this.bindElectricResultDialog = true;
      this.bindElectricResult = bindElectricResult;
      this.bindElectricBrand = bindElectricBrand;
      this.bindElectricAuthAccountId = bindElectricAuthAccountId;
    },
    cancelBind(){
      this.batchBindElectricDialog = false;
      this.failureBindElectricDialog = false;
    },
    openDetail(record){
      return {
        on: {
          click: () => {
            this.electricMeterId = record.id;
            this.electricDetailsDialog = true;
          }
        }
      }
    },
    addElectric(){
      this.batchBindElectricDialog = true;
    },
    //***表格相关**//
    onSelectChange(selectedRowKeys) {
      //表格选中项发生变化时的回调
      this.selectedRowKeys = selectedRowKeys;
      this.checkedCount = selectedRowKeys.length;
      //先清空，再添加，防止添加重复
      if (selectedRowKeys.length > 0) {
        this.layerChange(1);
      } else {
        this.layerChange(-1);
      }
    },
    layerChange(index) {
      let checkOptionDoc = document.getElementById("checkOption");
      if (checkOptionDoc != null) {
        document.getElementById("checkOption").style.zIndex = index;
      }
    },
    initData(){
      //清空选择项
      this.selectedRowKeys = [];
      this.checkedCount = 0;
      this.electricMeterListStat();
      this.electricMeterList();
    },
    electricMeterListStat(){
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.status = '';
      API.electricMeterListStat(sendData).then(res => {
        if (res.code === '200') {
          let count = res.data;
          for (let item of this.statusData) {
            item.status = count[item.string];
          }
        }
      })
    },
    electricMeterList(){
      this.spinLoading = true;
      API.electricMeterList(this.sendData).then(res => {
        if (res&&res.code === "200") {
          const checkRes = res.data;
          this.tableData = checkRes.records;
          this.pagination.total = res.data.total;
        }
        this.spinLoading = false;
      })
    },
    onSizeChange(current) {
      this.sendData.current = current;
      this.pagination.current = current;
      this.initData();
    },
    onShowSizeChange(current, pageSize) {
      this.sendData.current = current;
      this.sendData.size = pageSize;
      this.pagination.pageSize = pageSize;
      this.initData();
    },
    assetsFormData(data){
      this.sendData.fuzzyQueryType = data.fuzzyQueryType;
      this.sendData.fuzzyKeyword = data.fuzzyKeyword;
      this.sendData.cityId = data.cityId;
      this.sendData.areaId = data.areaId;
      this.sendData.townId = data.townId;
      this.sendData.deptId = data.deptId;
      this.sendData.maintainerId = data.maintainerId;
      this.sendData.brand = data.brand;
      this.sendData.paymentMode = data.paymentMode;
      this.sendData.houseType = data.houseType;
      this.sendData.bindTimeBegin = data.bindTimeBegin;
      this.sendData.bindTimeEnd = data.bindTimeEnd;
      this.sendData.current = 1;
      this.pagination.current = 1;
      this.initData();
    },
    changeStatus(status,index){
      if(this.activeIndex == index){
        return ;
      }
      else{
        this.sendData.current = 1;
        this.pagination.current = 1;
        this.activeIndex = index;
        this.sendData.valveStatus = status;
        this.electricMeterListStat();
        this.electricMeterList();
      }
    },
  },
  filters: {
  },
}
</script>

<style scoped lang="less">
  .electric-box{
    .content-top {
      min-width: 1300px; // overflow: hidden;
    }
    .status-box{
      .status {
        display: flex;
        .active {
          color: #0A87F8;
          border-bottom: 2px solid #0A87F8;
        }
        &>p {
          box-sizing: border-box;
          margin-right: 20px;
          height: 50px;
          line-height: 50px;
          cursor: pointer;
          .leftLine{
            border-left: 1px dashed #dddddd;
            padding-left: 20px;
          }
        }
      }
    }
    .table{
      min-width: 1270px;
      .houseAddress{
        height:20px;
        border-radius:2px;
        color: #0A87F8;
        background-color: #f0f8ff;
        font-size: 12px;
        text-align: center;
        padding: 5px 5px;
        margin-right: 5px;
      }
      .checkOption {
        .fontSpacing {
          margin-left: 3px;
          margin-right: 3px;
        }
        position: absolute;
        z-index: -1;
        background-color: #fafafa;
        height: 45px;
        margin-top: 1px;
        margin-left: 60px;
        line-height: 45px;
        width: calc(100% - 162px);
        .dealOption {
          float: left;
          .headSpan {
            color: #111111;
            margin-left: 14px;
            font-size: 14px;
          }
        }
        .cancelOption {
          font-size: 14px;
          margin-right: 20px;
          float: right;
        }
        .themeColor{
          color: #0A87F8;
        }
      }
      .action:hover {
        background-color: @themeBgColor;
        color: @themeColor;
      }
      .IconRadius {
        margin-top: 8px;
        margin-right: 5px;
        width: 6px;
        height: 6px;
        border-radius: 4px;
      }
      .fontNormal {
        .onLine {
          background: #0A87F8;
        }
        .offLine{
          background: #777777;
        }
        .error{
          background: #FB4246;
        }
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
      }
      & /deep/ .ant-popover {
        .ant-popover-inner-content {
          text-align: center;
          padding: 5px 0;
          .action {
            padding: 8px 10px;
          }
          .action:hover {
            cursor: pointer;
            background: rgba(10, 135, 248, 0.1);
          }
        }
      }
    }
    .contFoot {
      width: 100%;
      height: 56px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: 20px; // position: absolute;
      background-color: #fff;
      .contFootSvgStyle{
        i{
          vertical-align: -0.2em;
        }
        svg{
          width: 16px;
          height: 16px;
        }
      }
    }
    & /deep/ .ant-table-thead>tr {
      height: 46px;
    }
    & /deep/ .ant-table-thead>tr>th{
      padding: 8px 9px;
    }
    & /deep/ .ant-table-tbody>tr>td {
      padding: 12px 9px;
      &:not(:first-child) {
        cursor: pointer;
      }
    }
    /deep/ .content-main{
      padding: 14px;
    }
    /deep/ .content-main .content{
      padding: 0px;
    }
  }
</style>