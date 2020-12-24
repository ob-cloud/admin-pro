<template>
  <div class="notice-box">
    <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
    <content-top>
      <div class="status-box f-fl">
        <div class="status">
          <p :class="{ active: activeIndex === index }" @click="changeStatus(item.query,index)" v-for="(item,index) in statusData " :key="index">
            <span >{{ item.title }}</span>
            <span :style="{ color: item.color }" v-if="item.status">({{ item.status }})</span>
          </p>
        </div>
      </div>
      <div class="search-box f-fr">
        <search-dialog ref="searchDialogId" placeholder="消息内容" :showDeptEmp="false" :show-employee="false" :showCityTown="false" :searchList="searchList" @search="assetsFormData"></search-dialog>
      </div>
    </content-top>
    <content-main>
      <skeleton-notice v-show="spinLoading"></skeleton-notice>
      <div class="table" v-show="!spinLoading">
        <div class="checkOption" v-show="checkedCount > 0" id="checkOption">
          <div class="dealOption">
                        <span class="headSpan">已选中
                            <span class="themeColor">{{checkedCount}}</span> 项
                            <a-divider type="vertical" />
                        </span>
            <span class="cursor" @click="noticesBatchRead">
                            <span class="themeColor"><icon-font type="iconyumengtubiao_xuanzhong-1"></icon-font></span>
                            <span class="themeColor" style="margin-left: 6px">标记为已读</span>
                            <a-divider type="vertical" />
                        </span>
            <span class="cursor" @click="noticesBatchDelete">
                            <span class="themeColor"><icon-font type="iconyumengtubiao_shanchu-"></icon-font></span>
                            <span class="themeColor" style="margin-left: 6px">批量删除</span>
                        </span>
          </div>
          <div class="themeColor cancelOption cursor">
            <span @click="cancelOption ">取消选择</span>
          </div>
        </div>
        <a-table rowKey="id" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" size="middle" :customRow="openDetail" :bordered="true" :pagination="false" :columns="tableColumns" @change="handleTableChange" :dataSource="tableData">
          <div slot="content" slot-scope="text,record" :style="'width:'+(screenWidth-400)+'px;'">
            <a-popover>
              <template slot="content">
                <p style="padding: 8px 18px;">
                  {{text?text:'-'}}
                </p>
              </template>
              <div class="clearfix" type="primary">
                <div class="IconRadius f-fl" v-if="record.isRead==0"></div>
                <div class="f-fl overHidde" style="line-height:22px;max-width: calc(100% - 12px)" :style="record.isRead==1?'color:#777777;':'color:#111111;'">
                  <span>{{text?text:'-'}}</span>
                </div>
              </div>
            </a-popover>
          </div>
          <div slot="createTime" slot-scope="text,record" :style="record.isRead==1?'color:#777777;':'color:#111111;'">
            {{text?$moment(text).format('YYYY.MM.DD HH:mm:ss'):'-'}}
          </div>
          <div slot="action" slot-scope="text, record">
            <a-popover :title="null" trigger="hover" placement="bottom">
              <template slot="content">
                <div v-if="record.isRead==0" @click.stop="noticeRead(record)" class="action cursor" style="text-align:center;">标记已读</div>
                <div @click.stop="noticeDelete(record)" class="action cursor" style="text-align:center;">删除</div>
              </template>
              <div style="width: 100%;height: 100%">
                <icon-font type="iconyumengtubiao_gengduo-" class="moreColor cursor"></icon-font>
              </div>
            </a-popover>
          </div>
        </a-table>
        <div class="contFoot" v-show="tableData.length>0" style="padding-right: 20px;">
          <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
        </div>
      </div>
    </content-main>
    <!-- 流水详情 -->
    <a-modal destroyOnClose centered v-model="flowDetailDialog" :footer="null" :maskClosable="false" class="ownModalBorder" title="" :bodyStyle="{padding:'20px'}" :closable="false" @cancel="cancelDetail()" width="1000px">
      <flow-detail :flowDetailId="bizId"  @closeThis="cancelDetail()"></flow-detail>
    </a-modal>
    <!-- 账单详情 -->
    <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="账单详情" width="1000px" v-model="billDetailDialog" class="ownModalBorder titDialog" @cancel="cancelDetail()">
      <bill-detail :billId="bizId" @saveSuccess="cancelDetail()"></bill-detail>
    </a-modal>
    <!-- 合同详情 -->
    <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="合同详情" width="1000px" v-model="lookTenantDialog" class="ownModalBorder titDialog" @cancel="cancelDetail()">
      <contract-detail :tenantContract="bizId" :workflowTab="false" @saveHouseDetail="cancelDetail()" @deleteOk="cancelDetail()" @initTenantContract="cancelDetail()"></contract-detail>
    </a-modal>
    <!-- 房间详情 -->
    <a-modal destroyOnClose centered width="1000px" :maskClosable="false" v-model="houseInfoDialog"
             :footer="null" class="ownModalBorder thousandDialog titDialog" @cancel="cancelDetail()">
      <template slot="title">
        <div>{{houseAlias?houseAlias+'/':houseAlias}}{{address}}</div>
      </template>
      <!-- 整租 -->
      <whole-house-detail :roomTitle="modalTitle" :goToActive="goToActive" @changeTitle="changeTitle" @deleteSuccess="cancelDetail()"></whole-house-detail >
    </a-modal>
    <!-- 合租子房间详情 -->
    <a-modal destroyOnClose centered width="1000px" :maskClosable="false" v-model="shareChildInfoDialog"
             :footer="null" class="ownModalBorder thousandDialog titDialog" @cancel="cancelDetail()">
      <template slot="title">
        <div style="vertical-align: middle">{{houseAlias?houseAlias+'/':houseAlias}}{{address}}</div>
      </template>
      <!-- 合租 -->
      <child-detail :roomTitle="modalTitle" :goToActive="goToActive" @cancel="cancelDetail()" @changeTitle="changeTitle"></child-detail>
    </a-modal>
    <!-- 房间详情 -->
    <a-modal destroyOnClose centered :maskClosable="false" :footer="null" width="1000px"
             v-model="lookCentralizedDialog" class="ownModalBorder titDialog" @cancel="lookCentralizedDialog=false;">
      <template slot="title">
        <span style="vertical-align: middle">{{address}}</span>
      </template>
      <centralized-house-detail :roomTitle="modalTitle" :goToActive="goToActive" @cancel="cancelDetail()" @deleteSuccess="cancelDetail()" @changeAddress="changeAddress"></centralized-house-detail>
    </a-modal>
    <!-- 租客线索预约详情 -->
    <a-modal destroyOnClose centered  :footer="null" :maskClosable="false" width="1000px" v-model="tenantSourceDetailsDialog" class="ownModalBorder titDialog" title="资源详情" @cancel="cancelDetail()">
      <tenant-source-details ref="sourceDetails" @changeSourceId="cancelDetail()" :sourceId="bizId" @deleteRefrsh="cancelDetail()"></tenant-source-details>
    </a-modal>
    <!-- 预约详情 -->
    <a-modal destroyOnClose centered  :footer="null" :maskClosable="false" width="800px" v-model="appointmentDetailsDialog" class="ownModalBorder titDialog" title="预约详情" @cancel="cancelDetail()">
      <appointment-details :appointmentId="bizId"></appointment-details>
    </a-modal>
    <!-- 业主线索详情 -->
    <a-modal destroyOnClose centered  :footer="null" :maskClosable="false" width="1000px" v-model="ownerSourceDetailsDialog" class="ownModalBorder titDialog" title="资源详情" @cancel="cancelDetail()">
      <owner-source-details @changeSourceId="cancelDetail()" ref="sourceDetails" :sourceId="bizId" :clueHouseType="clueHouseType" @deleteRefrsh="cancelDetail()"></owner-source-details>
    </a-modal>
    <!-- 维修工单详情 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="repairDetailDialog" class="ownModalBorder titDialog" title="工单详情" @cancel="cancelDetail()">
      <repair-detail :repairId="bizId" @cancelDetails="cancelDetail()"></repair-detail>
    </a-modal>
    <!-- 工单详情 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="cleanDetailDialog" class="ownModalBorder titDialog" title="工单详情" @cancel="cancelDetail()">
      <clean-detail :cleanId="bizId" @cancelDetails="cancelDetail()"></clean-detail>
    </a-modal>
    <!-- 工单详情 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="complaintDetailDialog" class="ownModalBorder titDialog" title="工单详情" @cancel="cancelDetail()">
      <complaint-detail :complaintId="bizId" @deleteDetails="cancelDetail()"></complaint-detail>
    </a-modal>
    <!-- 工单详情 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="distributionDetailDialog" class="ownModalBorder titDialog" title="工单详情" @cancel="cancelDetail()">
      <distribution-detail :distributionId="bizId" @cancelDetails="cancelDetail()"></distribution-detail>
    </a-modal>
    <!-- 门锁详情 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="lockDetailsDialog" class="ownModalBorder titDialog" title="门锁详情" @cancel="cancelDetail()">
      <lock-details :lock-id="bizId" @unBindSuccess="cancelDetail()"></lock-details>
    </a-modal>
    <!-- 电表详情 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="electricDetailsDialog" class="ownModalBorder titDialog" title="电表详情" @cancel="cancelDetail()">
      <electric-detail :electricMeterId="bizId" @unBindSuccess="cancelDetail()"></electric-detail>
    </a-modal>
    <!-- 租客合同详情 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="tenantDetailsFlag" class="ownModalBorder titDialog" :title="detailsTitle" @cancel="cancelDetail">
      <workflow-tenant-details :bizId="bizId" :bizScene="bizScene" :fromType="fromType" :isViewed="isViewed" :auditInstanceId="auditInstanceId" :isCcInstanceView="isCcInstanceView" :auditEmpNameList="auditEmpNameList"></workflow-tenant-details>
    </a-modal>
    <!-- 业主合同详情 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="ownerDetailsFlag" class="ownModalBorder titDialog" :title="detailsTitle" @cancel="cancelDetail">
      <workflow-owner-details :bizId="bizId" :fromType="fromType" :isViewed="isViewed" :auditInstanceId="auditInstanceId" :isCcInstanceView="isCcInstanceView" :auditEmpNameList="auditEmpNameList"></workflow-owner-details>
    </a-modal>
    <!-- 账单流水详情 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="billWaterDetailsFlag" class="ownModalBorder titDialog" :title="detailsTitle" @cancel="cancelDetail">
      <workflow-bill-water-details :bizId="bizId" :fromType="fromType" :isViewed="isViewed" :auditInstanceId="auditInstanceId" :isCcInstanceView="isCcInstanceView" :auditEmpNameList="auditEmpNameList"></workflow-bill-water-details>
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue';
import SearchDialog from '@/components/SearchDialog';
import SkeletonNotice from '../skeleton/notice/index';
import * as API from "@/api/notice";
import FlowDetail from '../wallet/flowDetail';
import BillDetail from '../finance/bill/billDetails'
import ContractDetail from '../contract/tenant/contractDetails';
import WholeHouseDetail from '../house/whole/WholeHouseDetail';
import ChildDetail from '../house/share/ChildDetail';
import CentralizedHouseDetail from '../house/centralized/CentralizedHouseDetail';
import TenantSourceDetails from '../source/tenant/sourceDetails';
import OwnerSourceDetails from '../source/owner/sourceDetails';
import AppointmentDetails from '../source/tenant/appointmentDetails';
import RepairDetail from '../workorder/repair/details';
import CleanDetail from '../workorder/cleaning/details';
import ComplaintDetail from '../workorder/complaint/details';
import DistributionDetail from '../workorder/distribution/details';
import LockDetails from '../smartDevices/lock/lockDetails';
import ElectricDetail from '../smartDevices/electric/electricDetail';
import WorkflowTenantDetails from '../workflow/tenantDetails';
import WorkflowOwnerDetails from '../workflow/ownerDetails';
import WorkflowBillWaterDetails from '../workflow/billWaterDetails';
export default {
  name: "index",
  components: {
    SearchDialog,
    SkeletonNotice,
    FlowDetail,
    BillDetail,
    ContractDetail,
    WholeHouseDetail,
    ChildDetail,
    CentralizedHouseDetail,
    TenantSourceDetails,
    OwnerSourceDetails,
    AppointmentDetails,
    RepairDetail,
    CleanDetail,
    ComplaintDetail,
    DistributionDetail,
    LockDetails,
    ElectricDetail,
    WorkflowTenantDetails,
    WorkflowOwnerDetails,
    WorkflowBillWaterDetails,
  },
  data() {
    let threeDayComplete = Vue.prototype.$moment().startOf('day').add(-2, 'days').valueOf();
    let oneWeekComplete = Vue.prototype.$moment().startOf('day').add(-6, 'days').valueOf();
    let currentBeginTime = Vue.prototype.$moment().startOf('day').valueOf();
    let currentEndTime = Vue.prototype.$moment().endOf('day').valueOf();
    return {
      spinLoading:false,
      searchVisible:false,
      sendData: {
        current: 1,                     // 当前页数
        size: 20,                       // 每页返回的记录数量
        fuzzyKeyword: '',               // 模糊匹配关键词
        fuzzyQueryType: 0,             //模糊查询类型【0、全部，1、内容】
        type:'',                       //类型
        isRead:'',                     //消息状态
        createTimeBegin:'',             //通知开始时间
        createTimeEnd:'',             //通知结束时间
      },
      pagination: {
        total: 0,
        current: 1,
        pageSize: 20,//每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["20", "30", "40", "50"],//每页中显示的数据
        showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
      },
      searchList:[
        {
          key: 'fuzzyQueryType',
          list: [
            {
              label: '综合检索',
              value: 0,
            },
            {
              label: '消息内容',
              value: 1
            },
          ],
        },
        {
          key: 'isRead',
          title: '消息状态',
          currentActiveIndex: 0,
          list: [
            {
              label: '不限',
              value: ''
            },
            {
              label: '未读',
              value: 0
            },
            {
              label: '已读',
              value: 1
            },
          ],
        },
        {
          key: ['createTimeBegin', 'createTimeEnd'],
          title: '通知时间',
          currentActiveIndex: 0,
          list: [
            {
              label: '不限',
              value: ['', '']
            },
            {
              label: '今天',
              value: [currentBeginTime, currentEndTime]
            },
            {
              label: '近3天',
              value: [threeDayComplete, currentEndTime]
            },
            {
              label: '近7天',
              value: [oneWeekComplete, currentEndTime]
            },
            {
              label: '自定义',
              value: ['', '']
            }
          ],
        },
      ],
      activeIndex: 0,
      statusData:[
        {
          title: '全部',
          status: 0,
          string: 'total',
          query: null,
          color: '#FB4246',
        },
        {
          title: '钱包消息 ',
          status: 0,
          string: 'wallet',
          query: 1,
          color: '#FB4246'
        },
        {
          title: '财务消息 ',
          status: 0,
          string: 'bill',
          query: 2,
          color: '#FB4246'
        },
        {
          title: '合约消息 ',
          status: 0,
          string: 'contract',
          query: 3,
          color: '#FB4246'
        },
        {
          title: '房源消息 ',
          status: 0,
          string: 'house',
          query: 4,
          color: '#FB4246'
        },
        {
          title: '线索消息 ',
          status: 0,
          string: 'clue',
          query: 5,
          color: '#FB4246'
        },
        {
          title: '工单消息 ',
          status: 0,
          string: 'workorder',
          query: 6,
          color: '#FB4246'
        },
        {
          title: '审批消息 ',
          status: 0,
          string: 'workflow',
          query: 7,
          color: '#FB4246'
        },
        {
          title: '智能设备消息 ',
          status: 0,
          string: 'smartDevice',
          query: 8,
          color: '#FB4246'
        },
      ],
      tableColumns:[
        {
          title: '消息内容',
          dataIndex: 'content',
          key: 'content',
          align: 'left',
          scopedSlots: { customRender: 'content' },
        },
        {
          title: '时间',
          dataIndex: 'createTime',
          key: 'createTime',
          scopedSlots: { customRender: 'createTime' },
          align: 'left',
          width: '184px',
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: '80px',
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
      tableData: [
        {
          createTime:1601481600000,
          content:'测试测试1111.。。。。',
          id:'1',
        },
      ],
      selectedRowKeys:[],
      checkedCount:0,
      screenWidth: document.body.clientWidth,     // 屏幕宽
      bizId:'',                                   //业务id
      flowDetailDialog:false,
      billDetailDialog:false,
      lookTenantDialog:false,
      houseInfoDialog:false,
      shareChildInfoDialog:false,
      lookCentralizedDialog:false,
      goToActive:'',
      houseAlias:'',
      address:'',
      modalTitle:{
        houseId:'',
      },
      tenantSourceDetailsDialog:false,
      appointmentDetailsDialog:false,
      ownerSourceDetailsDialog:false,
      clueHouseType:1,
      repairDetailDialog:false,
      cleanDetailDialog:false,
      complaintDetailDialog:false,
      distributionDetailDialog:false,
      lockDetailsDialog:false,
      electricDetailsDialog:false,
      tenantDetailsFlag:false,
      ownerDetailsFlag:false,
      billWaterDetailsFlag:false,
      freshFlag:false,
      auditEmpNameList:[],
      fromType:0,
      isViewed:1,
      auditInstanceId:'',
      isCcInstanceView:1,
      detailsTitle:'审核详情',
      bizScene:11,
    }
  },
  created() {
    this.initData();
  },
  provide() {
    return {
      reloadHouseDiagram: this.initData
    };
  },
  mounted(){
  },
  methods: {
    cancelDetail(){
      this.flowDetailDialog = false;
      this.billDetailDialog = false;
      this.lookTenantDialog = false;
      this.houseInfoDialog = false;
      this.shareChildInfoDialog = false;
      this.lookCentralizedDialog = false;
      this.tenantSourceDetailsDialog = false;
      this.appointmentDetailsDialog = false;
      this.ownerSourceDetailsDialog = false;
      this.repairDetailDialog = false;
      this.cleanDetailDialog = false;
      this.complaintDetailDialog = false;
      this.distributionDetailDialog = false;
      this.lockDetailsDialog = false;
      this.electricDetailsDialog = false;
      this.tenantDetailsFlag = false;
      this.ownerDetailsFlag = false;
      this.billWaterDetailsFlag = false;
      if(this.freshFlag){
        this.initData();
        this.freshFlag = false;
      }
    },
    changeTitle(houseAlias,address){
      this.houseAlias = houseAlias;
      if(address) {
        this.address = address;
      }
    },
    changeAddress(address){
      this.address = address;
    },
    cancelOption(){
      //取消选中，取消相关操作
      this.selectedRowKeys = [];
      //清除操作图层
      this.layerChange(-1);
    },
    noticeRead(data){
      let dataList = [];
      dataList.push(data.id);
      API.pushMessageBatchRead(dataList).then(res => {
        if (res.code === '200') {
          this.$message.success('阅读成功');
          this.initData();
        }
      })
    },
    noticesBatchRead(){
      API.pushMessageBatchRead(this.selectedRowKeys).then(res => {
        if (res.code === '200') {
          this.$message.success('阅读成功');
          this.selectedRowKeys = [];
          this.checkedCount = 0;
          this.initData();
        }
      })
    },
    noticesBatchDelete(){
      let _this = this;
      this.$modal.confirm({
        title: '已选择'+ this.selectedRowKeys.length + '条消息，确定要删除吗？',
        content: '删除后将不可恢复',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.pushMessageBatchDelete(_this.selectedRowKeys).then(res => {
            if (res.code === '200') {
              _this.$message.success('消息删除成功');
              _this.selectedRowKeys = [];
              _this.checkedCount = 0;
              _this.initData();
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    noticeDelete(data){
      let _this = this;
      let typeName = data.title;
      this.$modal.confirm({
        title: '确定要删除于'+ this.$moment(data.createTime).format('YYYY.MM.DD HH:mm:ss') +'接受到的 「' + typeName + '」 的消息吗？',
        content: '删除后将不可恢复',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          let dataList = [];
          dataList.push(data.id);
          API.pushMessageBatchDelete(dataList).then(res => {
            if (res.code === '200') {
              _this.$message.success('消息删除成功');
              _this.initData();
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    handleTableChange(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
    },
    openDetail(record) {
      return {
        on: {
          click: () => {
            //根据不同的消息类型进入不同的详情
            let extraParam = JSON.parse(record.extraParam);
            this.bizId = extraParam.id;
            if(!this.bizId){
              //不存在，不允许打开
              return ;
            }
            //钱包
            if(record.subType==11||record.subType==12||record.subType==13){
              this.flowDetailDialog = true;
            }
            //账单
            if(record.subType==21||record.subType==22||record.subType==23||record.subType==24){
              this.billDetailDialog = true;
            }
            //合同
            if(record.subType==31||record.subType==32){
              this.lookTenantDialog = true;
            }
            //房源
            if(record.subType==41||record.subType==42||record.subType==43||record.subType==44){
              if(record.subType==41||record.subType==42||record.subType==43){
                this.goToActive = '3';
              }
              if(record.subType==44){
                this.goToActive = '2';
              }
              //1、整租，2、合租，3、集中；
              if(extraParam.type==1){
                this.houseAlias = '';
                this.address = '房源详情';
                this.modalTitle = {
                  houseId: this.bizId,
                }
                this.houseInfoDialog = true;
              }
              if(extraParam.type==2){
                this.houseAlias = '';
                this.address = '房源详情';
                this.modalTitle = {
                  roomId: this.bizId,
                }
                this.shareChildInfoDialog = true;
              }
              if(extraParam.type==3){
                let buildingProjectId = extraParam.buildingProjectId;
                this.modalTitle = {
                  roomId: this.bizId,
                  housePid:this.bizId,
                  buildingProjectId:buildingProjectId,
                }
                this.address = '房源详情';
                this.lookCentralizedDialog = true;
              }
            }
            //线索
            if(record.subType==51||record.subType==52||record.subType==53||record.subType==54||record.subType==55||record.subType==56||record.subType==57){
              if(record.subType==51||record.subType==54||record.subType==56){
                this.tenantSourceDetailsDialog = true;
              }
              if(record.subType==52||record.subType==55||record.subType==57){
                this.ownerSourceDetailsDialog = true;
              }
              if(record.subType==53){
                this.appointmentDetailsDialog = true;
              }
            }
            //工单
            if(record.subType==61||record.subType==62||record.subType==63||record.subType==64){
              if(record.subType==61){
                this.repairDetailDialog = true;
              }
              if(record.subType==62){
                this.cleanDetailDialog = true;
              }
              if(record.subType==63){
                this.complaintDetailDialog = true;
              }
              if(record.subType==64){
                this.distributionDetailDialog = true;
              }
            }
            //审批流相关
            if(record.subType==71||record.subType==72||record.subType==73||record.subType==74){
              let bizScene = 11;
              if(extraParam.bizScene){
                bizScene = Number(extraParam.bizScene);
              }
              //{71、待审批提醒，72、审批抄送通知，73、审批驳回提醒，74、审批通过提醒
              if(record.subType==71){
                this.fromType = 1;
                this.isCcInstanceView = 0;
              }
              if(record.subType==72){
                this.fromType = 4;
                this.isCcInstanceView = 1;
              }
              if(record.subType==73||record.subType==74){
                this.fromType = 3;
                this.isCcInstanceView = 0;
              }
              this.auditInstanceId = extraParam.auditInstanceId;
              if(bizScene == 11||bizScene == 12||bizScene == 13) {
                this.tenantDetailsFlag = true;
                this.bizScene = bizScene;

                if(bizScene == 11){
                  this.detailsTitle = '租客签约(电子合同)-审核详情';
                }
                else if(bizScene == 12){
                  this.detailsTitle = '租客签约(纸质合同)-审核详情';
                }
                else if(bizScene == 13){
                  this.detailsTitle = '租客退租-审核详情';
                }
              }
              if(bizScene == 21) {
                this.ownerDetailsFlag = true;
                this.detailsTitle = '业主签约-审核详情';
              }
              if(bizScene == 31){
                this.billWaterDetailsFlag = true;
                this.detailsTitle = '账务流水-审核详情';
              }
            }
            //智能设备
            if(record.subType==81||record.subType==82||record.subType==83){
              if(record.subType==81||record.subType==82){
                this.lockDetailsDialog = true;
              }
              if(record.subType==83){
                this.electricDetailsDialog = true;
              }
            }
            //如果是未读的
            if(record.isRead==0){
              this.freshFlag = true;
              //消息已阅读，标记已阅读
              let dataList = [];
              dataList.push(record.id);
              API.pushMessageBatchRead(dataList).then(res => {
                if (res.code === '200') {
                }
              })
            }
          }
        }
      }
    },
    //***表格相关**//
    onSelectChange(selectedRowKeys) {
      //表格选中项发生变化时的回调
      this.selectedRowKeys = selectedRowKeys;
      this.checkedCount = selectedRowKeys.length;
      //先清空，再添加，防止添加重复
      // this.selectedRowNames = [];
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
      this.getData();
      this.getStatusCount();
    },
    getStatusCount(){
      API.pushMessageStatusStat(this.sendData).then(res => {
        if (res.code === '200') {
          let resData = res.data;
          for (let item of this.statusData) {
            item.status = resData[item.string];
          }
        }
      })
    },
    getData(){
      this.spinLoading = true;
      API.pushMessageList(this.sendData).then(res => {
        // console.log(res)
        if (res&&res.code === "200") {
          const checkRes = res.data;
          this.tableData = checkRes.records;
          this.pagination.total = res.data.total;
        }
        this.spinLoading = false;
      })
    },
    changeStatus(val,index){
      if(this.activeIndex == index){
        return ;
      }
      this.activeIndex = index;
      this.sendData.type = val;
      this.initData();
    },
    assetsFormData(data){
      this.selectedRowKeys = [];
      this.checkedCount = 0;
      this.searchVisible = false;
      this.sendData.isRead = data.isRead;
      this.sendData.createTimeBegin = data.createTimeBegin;
      this.sendData.createTimeEnd = data.createTimeEnd;
      this.sendData.fuzzyQueryType = data.fuzzyQueryType;
      this.sendData.fuzzyKeyword = data.fuzzyKeyword;
      this.initData();
    },
    onSizeChange(current) {
      this.sendData.current = current;
      this.initData();
    },
    onShowSizeChange(current, pageSize) {
      this.sendData.current = current;
      this.sendData.size = pageSize;
      this.pagination.pageSize = pageSize;
      this.initData();
    },
  },
  filters: {

  }
}
</script>

<style scoped lang="less">
  .notice-box{
    /deep/ .content-main{
      padding: 14px;
    }
    /deep/ .content-main .content{
      padding: 0;
    }
    .content-top {
      min-width: 1300px; // overflow: hidden;
    }
    .table{
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
        margin-left: 64px;
        line-height: 42px;
        width: calc(100% - 160px);
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
        background:#FE3C38;
      }
      .contFoot {
        margin-top: 0px;
        width: 100%;
        height: 56px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 20px; // position: absolute;
        // bottom: 0px;
        // right: 0;
        background-color: #fff;
      }
      & /deep/.ant-table-tbody>tr>td {
        &:not(:first-child) {
          cursor: pointer;
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
  }
</style>
<style scoped lang="less">
.status {
  display: flex;
  width: 100%;
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
</style>