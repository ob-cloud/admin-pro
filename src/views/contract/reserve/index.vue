<template>
    <!-- 预定管理 -->
    <div class="reserveBox">
        <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
        <div class="add-btn-wrap" @click="addReserve" v-mark="['mk_contract_reserve_tjyd']">
            <icon-font type="iconyumengtubiao_tianjia" /> 添加预定
        </div>
        <content-top>
            <div class="status-box f-fl">
                <top-status :activeIndex="statusActiveIndex" :statusData="statusData" @changeStatus="changeStatus"></top-status>
            </div>
            <div class="f-fr cursor exportExcel-box" v-mark="['mk_contract_tenant_dc']"><span @click="exportExcel"><icon-font class="f-ftc-blue" type="iconyumengtubiao_xiazai1" /></span></div>
            <div class="search-box f-fr">
                   <search-dialog deptTitle="预定维护人" :deptEmpTitleOtherFlag="true" deptPlaceholder="请选择预定维护人或维护人所属部门" ref="searchDialogId" resMark="mk_house_book" placeholder="房源编号/小区地址/房间号/项目名称/预定人姓名/电话" :searchList="searchList" @search="assetsFormData"></search-dialog>
            </div>
        </content-top>
        <content-main>
            <skeleton-reserve v-show="spinLoading"></skeleton-reserve>
            <div class="table" v-show="!spinLoading">
                <a-table rowKey="id" :bordered="true" :customRow="openDetail" :pagination="false" :columns="tableColumns" :dataSource="tableData">
                    <div slot="bookStatus" slot-scope="bookStatus">
                        <div v-if="bookStatus==1" class="fontProhibit fontProhibitColor">
                            <div class="IconRadius prohibitBg6 f-fl"></div>
                            <div>
                                <span>待支付</span>
                            </div>
                        </div>
                        <div v-else-if="bookStatus==2" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg2 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>待使用</span>
                            </div>
                        </div>
                        <div v-else-if="bookStatus==3" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg3 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>已使用</span>
                            </div>
                        </div>
                        <div v-else-if="bookStatus==4" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg4  IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>已退定</span>
                            </div>
                        </div>
                        <div v-else-if="bookStatus==5" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg5 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>已作废</span>
                            </div>
                        </div>
                        <div v-else-if="bookStatus==6" class="fontProhibit fontProhibitColor">
                            <div class="IconRadius prohibitBg5 prohibitBg f-fl"></div>
                            <div>
                                <span>预定失败</span>
                            </div>
                        </div>
                        <div v-else-if="bookStatus==7" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg2 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>待确认</span>
                            </div>
                        </div>
                    </div>
                    <div slot="name" slot-scope="text,record">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;" v-if="viewRenterPhoneFlag"> {{text}}-{{record.phone}}</p>
                              <p style="padding: 8px 18px;" v-else> {{text}}-{{record.phone|formatPhone}}</p>
                            </template>
                            <p class="overHidde" style="width:80%;" type="primary" v-if="viewRenterPhoneFlag">{{text}}-{{record.phone}}</p>
                          <p class="overHidde" style="width:80%;" type="primary" v-else>{{text}}-{{record.phone|formatPhone}}</p>
                        </a-popover>

                    </div>
                    <div slot="houseAddress" slot-scope="text,record">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.houseAddress}} </p>

                            </template>
                            <p class="overHidde" style="width: 80%" type="primary">
                                <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.houseAddress}}</p>
                        </a-popover>
                    </div>
                    <div slot="signDate" slot-scope="text">
                        {{text|formatTime}}
                    </div>
                    <div slot="rentMonth" slot-scope="text">
                        <span>{{text ? text+'个月' : '-'}}</span>
                    </div>
                    <div slot="money" slot-scope="text">
                        {{text/100}}
                    </div>
                    <!-- <a slot="gender" slot-scope="text" href="javascript:;">{{text==1?'男':'女'}}</a> -->
                    <!-- <div slot="name" slot-scope="text, record">
                                <div class="nameColumn">
                                    <div class="name">
                                        {{record.name}}
                                    </div>
                                    <div v-if="record.isLeader=='1'" class="leaderFlag">
                                        <div class="leaderLength">
                                            <span>领导</span>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                    <div slot="action" slot-scope="text, record">
                        <a-popover :title="null" trigger="hover" v-if="checkOpts(record)==true">
                            <template slot="content">
                                <div v-if="record.btnArr.indexOf('1') != -1" @click.stop="addContract(record)" class="action cursor">签约</div>
                                <div v-if="record.btnArr.indexOf('2') != -1" @click.stop="unsubscribe(record)" class="action cursor">退定</div>
                                <div v-if="record.btnArr.indexOf('3') != -1" @click.stop="invalidFun(record)" class="action cursor">作废</div>
                                <div v-if="record.btnArr.indexOf('4') != -1" @click.stop="inviteToPay(record)" class="action cursor">邀请租客支付</div>
                                <div v-if="record.btnArr.indexOf('5') != -1" @click.stop="deleteFun(record)" class="action cursor">删除</div>
                                <div v-if="record.btnArr.indexOf('6') != -1" @click.stop="associated(record)" class="action cursor">关联房源</div>
                            </template>
                            <div style="width: 100%;height: 100%">
                                <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
                            </div>
                        </a-popover>
                    </div>
                </a-table>
                <div class="contFoot" v-show="tableData.length>0">
                    <a-pagination size="small" :total="pagination.total" v-model="pagination.current" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
                </div>
            </div>
        </content-main>

        <!-- 添加预定弹框 -->
        <a-modal destroyOnClose  centered  :footer="null" :maskClosable="false" width="800px" v-model="addReserveDialog" class="ownModalBorder titDialog" title="添加预定" @cancel="handleCancelres">
            <add-reserve @saveSuccess="addSaveSuccess" @cancelUp="addReserveDialog = false"></add-reserve>
        </a-modal>
        <!-- 预定详情弹框 -->
        <a-modal destroyOnClose centered  :footer="null" :maskClosable="false" width="1000px" v-model="reserveDetailDialog" class="ownModalBorder titDialog" title="预定详情" @cancel="isRefreshFun">
            <reserve-detail @refreshinfoFun="refreshinfoFun" :reserveId="reserveId" @deleteSuccess="deleteSuccess" @addContractIng="addContractIng"></reserve-detail>
        </a-modal>
        <!-- 退定弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="unsubscribeDialog" class="ownModalBorder titDialog" title="退定">
            <unsubscribe-detail :reserveId="reserveId" @saveSuccess="successFun" @closeThis="unsubscribeDialog=false"></unsubscribe-detail>
        </a-modal>
        <!-- 作废弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="invalidDialog" class="ownModalBorder titDialog" title="作废">
            <invalid-detail :reserveId="reserveId" @saveSuccess="successFun" @closeThis="invalidDialog=false"></invalid-detail>
        </a-modal>
        <!-- 关联房源弹框 -->
        <a-modal destroyOnClose centered  :footer="null" :maskClosable="false" width="520px" v-model="associatedDialog" class="ownModalBorder titDialog" title="关联房源">
            <associated-detail :reserveId="reserveId" @saveSuccess="successFun" @closeThis="associatedDialog=false"></associated-detail>
        </a-modal>
        <!-- 添加合同弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="addContractDialog" class="ownModalBorder titDialog" title="添加合同" :confirmLoading="confirmLoading">
            <add-contract :reserveFul='reserveFul' :reserveData="reserveData" @cancelUp="addContractDialog = false" @saveSuccess="addContractSuccess" @cancelSaveTenantContract="cancelSaveTenantContract"></add-contract>
        </a-modal>
        <!-- 导出框-->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="exportExcelShow" class="ownModalBorder titDialog" title="导出提示">
          <exportExcel @close="exportExcelShow=false" :exportData="exportData" :exportUrl='exportUrl'></exportExcel>
        </a-modal>
    </div>
</template>

<script>
import Vue from 'vue'
import unsubscribeDetail from './unsubscribe';
import invalidDetail from './invalid';
import associatedDetail from './associated';
import TopStatus from '@/components/TopStatus/index';
import addReserve from './addReserve';
import reserveDetail from './reserveDetail';
import SkeletonReserve from '../../skeleton/contract/reserve';
import { getReserveList, getSecondsRemaining,sendPaymentMsg, getReserveStatus, deleteReserve, getReserveInfo } from '@/api/reserve'
import addContract from '../tenant/addTenantContract';
import { getDateHaoMiao } from '@/utils/util';
import SearchDialog from '@/components/SearchDialog';
import exportExcel from '@/components/exportExcel/index';
export default {

    name: "reserve",
    components: {
        TopStatus,
        addReserve,
        reserveDetail,
        associatedDetail,
        invalidDetail,
        unsubscribeDetail,
        addContract,
        SearchDialog,
        SkeletonReserve,
        exportExcel,
    },
    data() {
        let currentTime = Vue.prototype.$moment().startOf('day').valueOf();
        let threeDay = Vue.prototype.$moment().add(2, 'days').valueOf();
        let oneWeek = Vue.prototype.$moment().add(6, 'days').valueOf();
        let oneMonth = Vue.prototype.$moment().add(29, 'days').valueOf();
        let currentEndTime = Vue.prototype.$moment().endOf('day').valueOf();
        let currentWeekBeginTime = Vue.prototype.$moment().startOf('week').valueOf();
        let currentWeekEndTime = Vue.prototype.$moment().endOf('week').valueOf();
        let currentMonthBeginTime = Vue.prototype.$moment().startOf('month').valueOf();
        let currentMonthEndTime = Vue.prototype.$moment().endOf('month').valueOf();
        return {
            placement: 'right',  //抽屉搜索框位置
            searchList: [
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
                            label: '小区地址',
                            value: 2
                        },
                        {
                            label: '房间号',
                            value: 3
                        },
                        {
                            label: '项目名称',
                            value: 4
                        },
                        {
                            label: '预定人姓名',
                            value: 5
                        },
                        {
                            label: '预定人电话',
                            value: 6
                        }
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
                    key: ['signDateStart', 'signDateEnd'],
                    title: '最晚签约日',
                    currentActiveIndex: 0,
                    list: [
                        {
                            label: '不限',
                            value: ['', '']
                        },
                        {
                            label: '近3天',
                            value: [currentTime, threeDay]
                        },
                        {
                            label: '近7天',
                            value: [currentTime, oneWeek]
                        },
                        {
                            label: '本月内',
                            value: [currentTime, oneMonth]
                        },
                        {
                            label: '自定义',
                            value: ['', '']
                        }
                    ],
                },
                {
                    key: ['rentMonthStart', 'rentMonthEnd'],
                    title: '预计租住时长',
                    currentActiveIndex: 0,
                    list: [
                        {
                            label: '不限',
                            value: ['', '']
                        },
                        {
                            label: '1个月',
                            value: [1, 1]
                        },
                        {
                            label: '3个月',
                            value: [3, 3]
                        },
                        {
                            label: '6个月',
                            value: [6, 6]
                        },
                        {
                            label: '12个月',
                            value: [12, 12]
                        },
                        {
                            label: '自定义',
                            type: 'input',
                            value: ['', '']
                        }
                    ],
                },
                {
                key: ['createTimeBegin', ' createTimeEnd'],
                title: '提交时间',
                currentActiveIndex: 0,
                list: [
                  {
                    label: '不限',
                    value: ['', '']
                  },
                  {
                    label: '今天',
                    value: [currentTime, currentEndTime]
                  },
                  {
                    label: '本周',
                    value: [currentWeekBeginTime, currentWeekEndTime]
                  },
                  {
                    label: '本月',
                    value: [currentMonthBeginTime, currentMonthEndTime]
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
                    title: '序号',
                    dataIndex: 'num',
                    key: 'num',
                    align: 'center',
                    width: '50px',
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
                {
                    title: '状态',
                    dataIndex: 'bookStatus',
                    key: 'bookStatus',
                    align: 'left',
                    scopedSlots: { customRender: 'bookStatus' },
                    width: '9.8%',
                },
                {
                    title: '预定人信息',
                    dataIndex: 'name',
                    key: 'name',
                    scopedSlots: { customRender: 'name' },
                    align: 'left',
                    width: '20%',
                },
                {
                    title: '房源信息',
                    dataIndex: 'houseAddress',
                    key: 'houseAddress',
                    scopedSlots: { customRender: 'houseAddress' },
                    align: 'left',
                    width: '33%',
                },
                {
                    title: '最晚签约日',
                    key: 'signDate',
                    dataIndex: 'signDate',
                    scopedSlots: { customRender: 'signDate' },
                    align: 'left',
                    width: '9%',
                },
                {
                    title: '预计租期',
                    key: 'rentMonth',
                    dataIndex: 'rentMonth',
                    align: 'left',
                    scopedSlots: { customRender: 'rentMonth' },
                    width: '9%',
                },
                {
                    title: '定金（元）',
                    key: 'money',
                    dataIndex: 'money',
                    scopedSlots: { customRender: 'money' },
                    align: 'left',
                    width: '8%',
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
            tableData: [],
            confirmLoading: false,
            addReserveDialog: false,
            reserveDetailDialog: false,
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,//每页中显示10条数据
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
            },
          statusActiveIndex:0,
            statusData: [
                {
                    title: '全部',
                    status: 0,
                    string: 'total',
                    query: null,
                },
                {
                    title: '待支付',
                    status: 0,
                    string: 'toBePay',
                    query: 1,
                    color: 'rgb(251, 66, 70)'
                },
                {
                    title: '待使用',
                    status: 0,
                    string: 'toBeUseQuantity',
                    query: 2,
                    color: '#FFAF6D'
                },
                {
                    title: '已使用',
                    status: 0,
                    string: 'usedQuantity',
                    query: 3,
                    color: '#0A87F8'

                },
                {
                    title: '预定失败',
                    status: 0,
                    string: 'bookFailed',
                    query: 6,
                    color: '#666666'

                },
                {
                    title: '已退定',
                    status: 0,
                    string: 'cancelQuantity',
                    query: 4,
                    color: '#666666'
                },
                {
                    title: '已作废',
                    status: 0,
                    string: 'obsoletedQuantity',
                    query: 5,
                    color: '#666666'
                }
            ],
            sendData: {
                status: null,
                current: 1,                     // 当前页数
                size: 10,                       // 每页返回的记录数量
                fuzzyKeyword: '',               // 模糊匹配关键词
                fuzzyQueryType: 0,              //模糊查询类型【0、全部，1、房源编号，2、房源地址，3、门牌号，4、项目名称，5、预定人姓名，6、预定人电话】
                areaId: '',                      // 区域id
                cityId: '',                      // 城市id
                communityId: '',                 // 小区ID
                deptId: '',                      // 部门ID
                maintainerId: '',               // 负责人ID

                houseType: '',                  // 房源类型（1分散2独栋）
                rentMonthEnd: null,             // 最晚签约日-结束时间（单位/月）
                rentMonthStart: null,           // 最晚签约日-开始时间（单位/月）
                rentMonthType: null,            // 预计租住时间【1、1个月，2、3个月，3、6个月，4、12个月，9、自定义】
                signDateEnd: null,                // 最晚签约日-结束时间
                signDateStart: null,              // 最晚签约日-开始时间
                signDateType: null,               // 最晚签约日【1、3天，2、7天，3、本月，9、自定义】


                sort: '',                       // 排序字段
                bookStatus: null,               // 房间状态（1：空置；2：预定；3：已租；4：配置；5：锁房；6：锁房待签字；7：无效；8：关闭）
                tenantId: '',                   // 租户ID
                townId: '',                     // 商圈id
                updateTime: '',                 // 修改时间
                vacantDaysBegin: '',            // 空置天数区间开始
                vacantDaysEnd: '',              // 空置天数区间结束
                createTimeBegin:'',
                createTimeEnd:'',
            },
            reserveId: '',
            invalidDialog: false,
            unsubscribeDialog: false,
            associatedDialog: false,
            addContractDialog: false,
            reserveData: {},
            reserveFul: true,
            spinLoading:true,
            isRefresh:false,
            viewRenterPhoneFlag:false,
            exportExcelShow:false,
            exportUrl: '/pc2b/house_book/list_export',
            exportData:{},
        }
    },
    created() {
      switch (this.$route.params.search) {
        case 'pending':
          this.statusActiveIndex = 2;
          this.sendData.bookStatus = 2;
          break;
        case 'todayQuantity':
          break;
        case 'weekQuantity':
          break;
        case 'monthQuantity':
          break;
      }
    },
  mounted(){
    let initString = '';
    switch (this.$route.params.search) {
      case 'pending':
        initString = 'pending';
        break;
      case 'todayQuantity':
        initString = 'todayQuantity';
        break;
      case 'weekQuantity':
        initString = 'weekQuantity';
        break;
      case 'monthQuantity':
        initString = 'monthQuantity';
        break;
    }
    if(initString=='todayQuantity'){
      this.$refs.searchDialogId.searchList[4].currentActiveIndex = 1
      this.$refs.searchDialogId.searchDataArr.push({
        title: this.$refs.searchDialogId.searchList[4].title,
        val: this.$refs.searchDialogId.searchList[4].list[1].label,
      })
      this.$refs.searchDialogId.searchData.createTimeBegin = Vue.prototype.$moment().startOf('day').valueOf();
      this.$refs.searchDialogId.searchData.createTimeEnd = Vue.prototype.$moment().endOf('day').valueOf();
      this.$refs.searchDialogId.confirm();
    }
    else if(initString=='weekQuantity'){
      this.$refs.searchDialogId.searchList[4].currentActiveIndex = 2;
      this.$refs.searchDialogId.searchDataArr.push({
        title: this.$refs.searchDialogId.searchList[4].title,
        val: this.$refs.searchDialogId.searchList[4].list[2].label,
      })
      this.$refs.searchDialogId.searchData.createTimeBegin = Vue.prototype.$moment().startOf('week').valueOf();
      this.$refs.searchDialogId.searchData.createTimeEnd = Vue.prototype.$moment().endOf('week').valueOf();
      this.$refs.searchDialogId.confirm();
    }
    else if(initString=='monthQuantity'){
      this.$refs.searchDialogId.searchList[4].currentActiveIndex = 3;
      this.$refs.searchDialogId.searchDataArr.push({
        title: this.$refs.searchDialogId.searchList[4].title,
        val: this.$refs.searchDialogId.searchList[4].list[3].label,
      })
      this.$refs.searchDialogId.searchData.createTimeBegin = Vue.prototype.$moment().startOf('month').valueOf();
      this.$refs.searchDialogId.searchData.createTimeEnd = Vue.prototype.$moment().endOf('month').valueOf();
      this.$refs.searchDialogId.confirm();
    }
    else{
      this.initViewRenter();
      this.inif();
    }
  },
    methods: {
      // 导出
      exportExcel() {
        this.exportData = Object.assign({}, this.sendData);
        this.exportExcelShow = true;
      },
      initViewRenter(){
        let isExit = false;
        this.permissions = JSON.parse(sessionStorage.getItem('permissions'));
        this.permissions.some(function(value){
          if (value.mark == 'mk_contract_reserve_zkdh'){
            isExit = true;
          }
        });
        this.viewRenterPhoneFlag = isExit;
      },
      checkOpts(record){
        //1、签约；2、退定；3、作废；4、邀请租客支付；5、删除；6、关联房源
        //防止this.permissions没值
        if(!this.permissions||this.permissions.length==0){
          this.permissions = JSON.parse(sessionStorage.getItem('permissions'));
        }
        let markArr = [];
        let btnArr = [];
        if(record.bookStatus==1){
          markArr.push('mk_contract_reserve_yqzkzf')
          markArr.push('mk_contract_reserve_zf');
        }
        if(record.bookStatus==2){
          markArr.push('mk_contract_tenant_tjht');
          markArr.push('mk_contract_reserve_td');
          markArr.push('mk_contract_reserve_zf');
        }
        if(record.bookStatus==5||record.bookStatus==6){
          markArr.push('mk_contract_reserve_sc');
        }
        if(record.houseId==''||record.houseId==null){
          markArr.push('mk_contract_reserve_glfy');
        }
        //判断资源权限
        markArr.forEach(ele => {
          this.permissions.some(function(value){
            if (ele == value.mark){
              if(value.mark == 'mk_contract_tenant_tjht'){
                btnArr.push('1');
              }else if(value.mark == 'mk_contract_reserve_td'){
                btnArr.push('2');
              }else if(value.mark == 'mk_contract_reserve_zf'){
                btnArr.push('3');
              }else if(value.mark == 'mk_contract_reserve_yqzkzf'){
                btnArr.push('4');
              }else if(value.mark == 'mk_contract_reserve_sc'){
                btnArr.push('5');
              }else if(value.mark == 'mk_contract_reserve_glfy'){
                btnArr.push('6');
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
      inif() {
            this.getData();
            this.getStatusCount();
        },
        addContract(res) {
            if (res) {
                getReserveInfo(res.id).then(res => {
                    if (res.code === "200") {
                        this.reserveData = res.data;
                        this.addContractDialog = true;
                    }
                })
            }

        },
        handleCancel() {
            this.addContractDialog = false;
        },
        cancelSaveTenantContract(){
            this.addContractDialog = false;
        },
        addContractSuccess(data) {
            let _this = this;
            setTimeout(function() {
                _this.addContractDialog = false;
                _this.inif();
            }, 500);
        },
        addContractIng(res) {
            if (res) {
                this.reserveDetailDialog = false;
                getReserveInfo(this.reserveId).then(res => {
                    if (res.code === "200") {
                        this.reserveData = res.data;
                        this.addContractDialog = true;
                    }
                })
            }
        },
        assetsFormData(data) {
            // console.log(data)
            this.sendData.fuzzyQueryType = data.fuzzyQueryType;
            this.sendData.fuzzyKeyword = data.fuzzyKeyword;
            this.sendData.rentMonthType = data.rentMonthType
            this.sendData.rentMonthStart = data.rentMonthStart;
            this.sendData.rentMonthEnd = data.rentMonthEnd;
            this.sendData.signDateType = data.signDateType
            this.sendData.signDateStart = data.signDateStart;
            this.sendData.signDateEnd = data.signDateEnd;
            this.sendData.houseType = data.houseType;
            this.sendData.areaId = data.areaId
            this.sendData.cityId = data.cityId;
            this.sendData.communityId = data.townId;
            this.sendData.deptId = data.deptId;
            this.sendData.maintainerId = data.maintainerId;
            this.sendData.createTimeBegin = data.createTimeBegin;
            this.sendData.createTimeEnd = data.createTimeEnd;
            this.sendData.current = 1;
            this.pagination.current = 1;
            this.inif();
        },
        getStatusCount() {
            getReserveStatus(this.sendData).then(res => {
                // console.log(res)
                if (res.code === '200') {
                    let total = 0;
                    let conut = res.data;
                    for (let item of this.statusData) {
                        if (item.query) {
                            item.status = conut[item.string];
                            if (item.query != 8) {
                                total += conut[item.string];
                            }
                        }
                    }
                    this.statusData[0].status = total;
                }
            })
        },
        getData() {
            this.spinLoading = true;
            getReserveList(this.sendData).then(res => {
                if (res&&res.code === "200") {
                    this.tableData = res.data.records;
                    this.tableData.forEach(function(element, index) {
                        element.num = index + 1;
                    }, this);
                    this.pagination.total = res.data.total;
                }
                this.spinLoading = false;
            })
        },
        openDetail(record) {
            return {
                on: {
                    click: () => {
                        this.reserveId = record.id;
                        this.reserveDetailDialog = true;
                    }
                }
            }
        },
        changeStatus(option) {
            this.sendData.current = 1;
            this.pagination.current = 1;
            this.sendData.bookStatus = option.query;
            this.getData();
        },
        addReserve() {
            this.addReserveDialog = true;
        },
        handleCancelres() {
            this.addReserveDialog = false;
        },
        onSizeChange(current) {
            this.sendData.current = current;
            this.inif();
        },
        onShowSizeChange(current, pageSize) {
            this.sendData.current = current;
            this.sendData.size = pageSize;
            this.pagination.pageSize = pageSize;
            this.inif();
        },


        addSaveSuccess(res) {
            if(res){
                this.addReserveDialog = false;
                let _this = this;
                setTimeout(function() {
                    _this.inif();
                }, 500);
            }
        },
      //邀请租客支付
      inviteToPay(record){
        let id = record.id;
        let _this = this;
        getSecondsRemaining(id).then(res => {
          if (res.code === "200") {
            let time = '';
            if(res.data&&res.data.seconds){
              time = parseInt(res.data.seconds / 60);
            }
            this.$modal.confirm({
              title: '确定要给租客 「' + record.name + '/' + record.phone + '」 发送预定支付短信吗？',
              content: '租客还有'+ time +'分钟支付时间，超时自动失效，您可重新发起',
              width: "433px",
              height: "192px",
              okText: '确认',
              cancelText: '取消',
              onOk() {
                sendPaymentMsg(id).then(res=>{
                  if (res.code === "200") {
                    _this.$message.success('短信发送成功');
                  }
                  else{
                    _this.$message.error('短信发送失败');
                  }
                });
              },
              onCancel() {
              },
            });
          }
        });
      },
        //作废
        invalidFun(res) {
            this.reserveId = res.id;
            this.invalidDialog = true;
        },
        //退定
        unsubscribe(res) {
            this.reserveId = res.id;
            this.unsubscribeDialog = true;

        },
        //删除
        deleteFun(record) {
            let _this = this;
            this.$modal.confirm({
                title: '确定要删除员工 「' + record.name + '/' + record.phone + '」 的预定信息吗吗？',
                content: '删除后将不可恢复',
                width: "433px",
                height: "192px",
                okText: '确认',
                cancelText: '取消',
                icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
                onOk() {
                    _this.remove(record.id);
                },
                onCancel() {
                },
            });
        },
        remove(id) {
            //删除员工
            let _this = this;
            deleteReserve(id).then(res => {
                if (res.code === "200") {
                    _this.$message.success('删除成功！');

                    setTimeout(function() {
                        _this.inif();
                    }, 500);
                }

            });
        },
        //关联房源
        associated(res) {
            this.reserveId = res.id;
            this.associatedDialog = true;
        },
        successFun(res) {
            if (res) {
                this.unsubscribeDialog = false;
                this.associatedDialog = false;
                this.invalidDialog = false;
                let _this = this;
                setTimeout(function() {
                    _this.inif();
                }, 500);
            }


        },
        deleteSuccess(res) {
            if (res) {
                this.reserveDetailDialog = false;
                let _this = this;
                setTimeout(function() {
                    _this.inif();
                }, 500);
            }
        },
        refreshinfoFun(res){  //详情有改变的操作  就改变状态
            if(res){
                this.isRefresh = res
            }  
        },
        isRefreshFun(){      //根据详情有改变数据的操作 需要刷新
            if(this.isRefresh){
                this.inif();
            }
            this.reserveDetailDialog = false;
            this.isRefresh = false
        },
    },
    filters: {
        formatTime: function(value) {
            if (!value) return '-';
            value = getDateHaoMiao(value);
            return value;
        },
      formatPhone:function (value) {
        var str = String(value)
        var len = str.length;
        var prev,next;
        if (len >= 7) {
          prev = str.slice(-len,-8)
          next = str.slice(-4)
          str = prev+"****"+next
        } else if (len < 7 && len >= 6) {
          prev = str.slice(-len,-4)
          next = str.slice(-2)
          str = prev + "**" + next
        }
        if(!value){
          str = '-';
        }
        return str
      },
    }
}
</script>

<style scoped lang="less">
.reserveBox {
    .content-top {
        min-width: 1300px;
        overflow: hidden;
    }
    .content-main {
        padding: 0;
        & /deep/ .content {
            padding: 0;
            margin: 20px;
        }
    }
    & /deep/ .exportExcel-box{
      width:24px;
      height: 24px;
      margin-left:6px;
      margin-top: 4px;
      & /deep/  svg{
        width:24px;
        height: 24px;
      }
    }
    .search-box {
        &/deep/ .ant-input {
            border-radius: 50px;
        }
    }
    .userManageOperate {
        margin-right: 14px;
        float: right;
        .userSearch {
            float: left;
            margin-right: 15px;
        }
    }
    .table {
        min-width: 1200px;
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
            .normalBg {
                background-color: #3DB302;
            }
        }
        .fontProhibit {
            .prohibitBg2 {
                background: rgba(255, 160, 54, 1);
            }
            .prohibitBg3 {
                background: rgba(10, 135, 248, 1);
            }
            .prohibitBg4,
            .prohibitBg5 {
                background: rgba(119, 119, 119, 1);
            }
          .prohibitBg6 {
            background: rgb(251, 66, 70);
          }
        }
        .fontNormalColor {
            color: #3DB302;
        }
        .fontProhibitColor {
            color: #111111;
        }
        .nameColumn {
            width: 100%;
            .name {
                float: left;
            }
            .leaderFlag {
                color: #777777;
                border: 1px solid #777777;
                border-radius: 10px;
                width: 36px;
                float: left;
                margin-left: 4px;
                .leaderLength {
                    width: 27px;
                    margin-left: 5px;
                    font-size: 12px;
                }
            }
        }
    }
    .contFoot {
        margin-top: 15px;
        width: 100%;
        height: 56px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 20px; // position: absolute;
        // bottom: 0px;
        // right: 0;
        background-color: #fff;
        & /deep/ .ant-pagination {
            margin-right: 11px;
        }
    }
    & /deep/.ant-table-tbody>tr>td {
        padding: 12px 6px;
        &:not(:first-child) {
            cursor: pointer;
        }
    }
    & /deep/.ant-table-thead > tr > th{
        padding: 12px 6px;
    }
    & /deep/.ant-popover {
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
}
</style>


