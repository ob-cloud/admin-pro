<template>
    <!-- 账单管理 -->
    <div class="bill-water-box">
        <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
        <content-top>
            <div class="status-box f-fl">
                <top-status :activeIndex="statusActiveIndex" :statusData="statusData" @changeStatus="changeStatus"></top-status>
            </div>
            <div class="f-fr cursor exportExcel-box" v-mark="['mk_finance_bill_flow_dc']"><span @click="exportExcel"><icon-font class="f-ftc-blue" type="iconyumengtubiao_xiazai1" /></span></div>
            <div class="search-box f-fr">
                <search-dialog resMark="mk_fin_bill_flow" dept-title="所属人" :billSpecialFlag="true" deptPlaceholder="请选择所属部门或人员" placeholder="房源编号/小区地址/门牌号/收(付)款人姓名/收(付)款人电话" :showCityTown="false" :searchList="searchList" @search="assetsFormData"></search-dialog>
            </div>
        </content-top>
        <div class="statiscStyle" v-if="!spinLoading">
          <span style="color: #777777;">差值：</span><span style="color: #111111;border-right: 1px solid #E8E8E8;padding-right: 20px;">{{ (amountDiffTotal/100).toFixed(2)}}元</span>
          <span style="color: #777777;margin-left: 19px;">收入：</span><span style="color: #0A87F8;">{{ (incomeAmountTotal/100).toFixed(2)}}元</span>
          <span style="color: #777777;margin-left: 19px;">支出：</span><span style="color: #FB4246;">{{ (expendAmountTotal/100).toFixed(2)}}元</span>
        </div>
        <content-main>
            <skeleton-bill-water v-show="spinLoading"></skeleton-bill-water>
            <div class="table" v-show="!spinLoading">
                <a-table rowKey="id" :customRow="openDetail" :bordered="true" :pagination="false" :columns="tableColumns" @change="handleTableChange" :dataSource="tableData">
                    <div slot="status" slot-scope="text,record">
                        <div class="clearfix">
                            <div class="IconRadius normalBg f-fl" style="background-color:#0a87f8" v-if="text==1"></div>
                            <div class="IconRadius normalBg f-fl" style="background-color:#777777" v-if="text==2"></div>
                            <div class="status f-fl">{{record.statusName}}</div>
                            <a-popover>
                                <template slot="content">
                                    <p style="padding: 8px 18px;">
                                        <span v-if="record.auditStatus==1">{{record.auditProcess}}</span>
                                        <span v-if="record.auditStatus==9">审批通过</span>
                                        <span v-if="record.auditStatus==5">审批驳回</span>
                                        <span v-if="record.auditStatus==6">已撤销</span>
                                    </p>
                                </template>
                                <div class="statusRadius status1 f-fr" v-if="record.auditStatus&&record.auditStatus==1" ><icon-font type="iconyumengtubiao_daishenpirenyuan"></icon-font></div>
                                <div class="statusRadius status9 f-fr" v-if="record.auditStatus&&record.auditStatus==9" ><icon-font type="iconshenhetongguo1x"></icon-font></div>
                                <div class="statusRadius status5 f-fr" v-if="record.auditStatus&&record.auditStatus==5" ><icon-font type="iconshenhebohui1x"></icon-font></div>
                                <div class="statusRadius status6 f-fr" v-if="record.auditStatus&&record.auditStatus==6" ><icon-font type="iconliebiao-yichexiao1x"></icon-font></div>
                            </a-popover>
                        </div>
                    </div>
                    <div slot="fullAddress" slot-scope="text,record">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                                </p>
                            </template>
                            <div type="primary" class="overHidde" style="width: 95%">
                                <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                            </div>
                        </a-popover>
                    </div>
                    <div slot="payerName" slot-scope="text,record">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    <span>{{record.payerName}} -</span>{{record.payerPhone}}
                                </p>
                            </template>
                            <div class="f-fl" type="primary">
                                <p class="overHidde" style="line-height:22px;">
                                    <span>{{record.payerName}} -</span>{{record.payerPhone}}
                                </p>
                            </div>
                        </a-popover>
                    </div>
                    <div slot="totalMoney" slot-scope="text">
                        <span v-if="text < 0" class="shou-zhi">支</span>
                        <span v-else class="shou-shou">收</span>
                        {{Math.abs(text)/100}}
                    </div>
                    <div slot="practicalTime" slot-scope="text">
                        {{$moment(text).format('YYYY.MM.DD')}}
                    </div>
                    <div slot="paymentMethodName" slot-scope="text">
                      {{text?text:'-'}}
                    </div>
                    <div slot="affirmTime" slot-scope="text">
                        {{$moment(text).format('YYYY.MM.DD HH:mm')}}
                    </div>
                    <div slot="feeSubjects" slot-scope="text">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    <span>{{text}}</span>
                                </p>
                            </template>
                            <div class="f-fl" type="primary">
                                <p class="overHidde" style="line-height:22px;width:150px">
                                    <span>{{text}}</span>
                                </p>
                            </div>
                        </a-popover>
                    </div>
                    <div slot="action" slot-scope="text, record">
                        <a-popover :title="null" trigger="hover" v-if="checkOpts(record) == true">
                            <template slot="content">
                                <div v-if="(record.auditStatus == 0||record.auditStatus == 9)&&record.status==1" class="action cursor" v-mark="['mk_finance_bill_flow_zf']" @click="billFlowCancellation(record)">作废</div>
                                <div v-if="record.auditStatus==1&&(record.auditRelationType==1||record.auditRelationType==5)" class="action cursor" @click="openUrgeHander(record)">催办</div>
                                <div v-if="record.auditStatus==1&&(record.auditRelationType==1||record.auditRelationType==5)" class="action cursor" @click="revoke(record)">撤销</div>
                                <div v-if="record.auditStatus==1&&(record.auditRelationType==2||record.auditRelationType==5)" class="action cursor" @click="openFlowDetail(record)">审批</div>
                                <div v-if="record.status==2" class="action cursor" v-mark="['mk_finance_bill_flow_sc']" @click="billFlowRemove(record)">删除</div>
                            </template>
                            <div style="width: 100%;height: 100%">
                                <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
                            </div>
                        </a-popover>
                    </div>
                </a-table>
                <div class="contFoot" v-show="tableData.length>0" style="padding-right: 20px;">
                    <a-pagination size="small"  v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
                </div>
            </div>
        </content-main>
        <!-- 账单流水详情 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="流水详情" width="1000px" v-model="billWaterDialog" class="ownModalBorder titDialog" @cancel="isRefreshFun">
            <bill-water-details :billWaterId="billWaterId" :workflowTab="workflowTab" :auditInstanceId="auditInstanceId" @refreshinfoFun="refreshinfoFun" @saveSuccess="deleteSuccess"></bill-water-details>
        </a-modal>
        <!-- 导出框-->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="exportExcelShow" class="ownModalBorder titDialog" title="导出提示">
            <exportExcel @closeThis="exportExcelShow=false" @saveSure="saveSuccess" :exportData="exportData" :exportUrl='exportUrl'></exportExcel>
        </a-modal>
        <!--催办 -->
        <a-modal title="" width="433px" v-model='warningDialog' class="myLaunch-box-special-Dialog titDialog" @ok="urgeHander" @cancel="sendMessageFlag=true;warningDialog=false" okText="确定" cancelText="取消" :closable="false">
            <div class="content">
                <a-icon class="contentCircle" type="question-circle"/>
                <span class="contentTitle">确定要给当前审批人发送消息提醒吗？</span>
                <div class="confirm-content">确定后会以消息的形式通知到当前审批人</div>
                <div class="confirm-warning">当前审批人：{{auditEmpNameList.join('、')}}</div>
                <div class="confirm-check"><a-checkbox v-model="sendMessageFlag" @change="onChange">短信通知当前审批人</a-checkbox></div>
            </div>
        </a-modal>
    </div>
</template>

<script>
    import Vue from 'vue'
    import TopStatus from '@/components/TopStatus/index';
    import SearchDialog from '@/components/SearchDialog';
    import * as API from '@/api/billDetailWater';
    import  {revoke,urgeHander} from '@/api/workflow';
    import  billWaterDetails from './billWaterDetails';
    import exportExcel from '@/components/exportExcel/index';
    import SkeletonBillWater from '../../skeleton/finance/billWater';
    export default {
        name: "bill",
        components: {
            SearchDialog,
            billWaterDetails,
            exportExcel,
            TopStatus,
            SkeletonBillWater,
        },
        data() {
            let currentTime = Vue.prototype.$moment().startOf('day').valueOf();
            let threeDay = Vue.prototype.$moment().add(2, 'days').valueOf();
            let oneWeek = Vue.prototype.$moment().add(6, 'days').valueOf();
            let startMonth = Vue.prototype.$moment().startOf('month').valueOf();
            let oneMonth = Vue.prototype.$moment().endOf('month').valueOf();
            return {
                sendData: {
                    current: 1,                     // 当前页数
                    size: 10,                       // 每页返回的记录数量
                    fuzzyKeyword: '',               // 模糊匹配关键词
                    fuzzyQueryType: 0,             //模糊查询类型【0、全部，1、房源编号，2、小区地址，3、门牌号，4、收付款人姓名，5、收付款人电话】
                    isSearchCount: 1,                //是否查询总记录数（1.是（默认）；2.否）
                    deptId: '',                     // 部门ID
                    maintainerId: '',              // 负责人ID
                  affirmEmpDeptId:'',              //确认人部门ID
                  affirmEmpId:'',                  //确认人id
                  affirmEmpIdList:[],              //确认人集合
                    bizType: '',                     //业务类型【1、房源，2、租客，3、业主】
                    createTime: null,               // 创建时间
                    affirmTimeBegin: null,          // 确认时间开始
                    affirmTimeEnd: null,            // 确认时间结束
                    practicalTimeBegin: null,         // 实际收付款时间开始
                    practicalTimeEnd: null,           // 实际收付款时间结束
                    sort: 'fbf_update_time',                       // 排序字段 创建时间 fb_create_time 更新时间 fb_update_time 应收付时间 fb_predict_time 完成时间 fb_finish_time
                    tenantId: '',                   // 租户ID
                    updateTime: '',                 // 修改时间
                    vacantDaysBegin: '',            // 空置天数区间开始
                    vacantDaysEnd: '',              // 空置天数区间结束
                    isOccur:null,                   //是否发生
                    feeDirection:null,              //费用方向
                    order:'desc',                       //排序类型(asc/desc)
                },
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
                                label: '门牌号',
                                value: 3
                            },
                            {
                                label: '收付款人姓名',
                                value: 4
                            },
                            {
                                label: '收付款人电话',
                                value: 5
                            }
                        ],
                    },
                    {
                        key: 'bizType',
                        title: '账单所属',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '房源',
                                value: 1
                            },
                            {
                                label: '租客',
                                value: 2
                            },
                            {
                                label: '业主',
                                value: 3
                            },
                          {
                            label: '分账',
                            value: 4
                          },
                          {
                            label: '手续费',
                            value: 5
                          },
                        ],
                    },
                    {
                        key: 'feeDirection',
                        title: '支付类型',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '收入',
                                value: 1
                            },
                            {
                                label: '支出',
                                value: 2
                            },
                        ],
                    },
                    {
                        key: 'auditStatus',
                        title: '审批状态',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '待审批',
                                value: 1
                            },
                            {
                                label: '审批通过',
                                value: 9
                            },
                            {
                                label: '审批驳回',
                                value: 5
                            },
                            {
                                label: '已撤销',
                                value: 6
                            },
                        ],
                    },
                    {
                        key: 'billType',
                        title: '流水来源',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '租约',
                                value: 1
                            },
                            {
                                label: '定金',
                                value: 2
                            },
                            {
                                label: '退款',
                                value: 3
                            },
                            {
                                label: '退定',
                                value: 4
                            },
                            {
                                label: '押金',
                                value: 5
                            },
                            {
                                label: '仪表',
                                value: 6
                            },
                            {
                                label: '记账',
                                value: 7
                            },
                            {
                                label: '其他费用',
                                value: 8
                            },
                          {
                            label: '分账',
                            value: 10
                          },
                          {
                            label: '手续费',
                            value: 11
                          },
                        ],
                    },
                    {
                        key: 'paymentMethod',
                        title: '收/付款途径',
                        currentActiveIndex: 0,
                        list: [],
                    },
                    {
                        key: ['practicalTimeBegin', 'practicalTimeEnd'],
                        title: '实际收/付时间',
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
                                value: [startMonth, oneMonth]
                            },
                            {
                                label: '自定义',
                                value: ['', '']
                            }
                        ],
                    },
                    {
                        key: ['affirmTimeBegin', 'affirmTimeEnd'],
                        title: '处理时间',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '不限',
                                value: ['', '']
                            },
                            {
                                label: '今天已收款',
                                value: [currentTime, currentTime]
                            },
                            {
                                label: '3天内已收款',
                                value: [currentTime, threeDay]
                            },
                            {
                                label: '7天内已收款',
                                value: [currentTime, oneWeek]
                            },
                            {
                                label: '自定义',
                                value: ['', '']
                            }
                        ],
                    }
                ],
                tableColumns: [
                    {
                        title: '序号',
                        dataIndex: 'index',
                        key: 'index',
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
                        dataIndex: 'status',
                        key: 'status',
                        scopedSlots: { customRender: 'status' },
                        align: 'left',
                        width: '100px',
                    },
                    {
                        title: '房源信息',
                        dataIndex: 'fullAddress',
                        key: 'fullAddress',
                        scopedSlots: { customRender: 'fullAddress' },
                        align: 'left',
                        // width: '270px',
                    },
                    {
                        title: '收/付款人信息',
                        dataIndex: 'payerName',
                        key: 'payerName',
                        scopedSlots: { customRender: 'payerName' },
                        align: 'left',
                        // width: '208px',
                    },
                    {
                        title: '金额（元）',
                        key: 'totalMoney',
                        dataIndex: 'totalMoney',
                        scopedSlots: { customRender: 'totalMoney' },
                        align: 'left',
                        // width: '96px',
                    },
                  {
                    title: '收/付款途径',
                    key: 'paymentMethodName',
                    dataIndex: 'paymentMethodName',
                    scopedSlots: { customRender: 'paymentMethodName' },
                    align: 'left',
                    // width: '96px',
                  },
                    {
                        title: '实际支付时间',
                        key: 'practicalTime',
                        dataIndex: 'practicalTime',
                        align: 'left',
                        scopedSlots: { customRender: 'practicalTime' },
                        // width: '170px',
                    },
                    {
                        title: '来源',
                        key: 'billTypeName',
                        dataIndex: 'billTypeName',
                        align: 'left',
                        // width: '96px',
                        
                    },
                    {
                        title: '费用摘要',
                        key: 'feeSubjects',
                        dataIndex: 'feeSubjects',
                        scopedSlots: { customRender: 'feeSubjects' },
                        align: 'left',
                        width: '170px',
                    },
                    {
                        title: '确认人',
                        key: 'affirmEmpName',
                        dataIndex: 'affirmEmpName',
                        align: 'left',
                        // width: '170px',
                    },
                    // {
                    //     title: '处理时间',
                    //     key: 'affirmTime',
                    //     dataIndex: 'affirmTime',
                    //     scopedSlots: { customRender: 'affirmTime' },
                    //     align: 'left',
                    //     // width: '170px',
                    // },
                    {
                        title: '操作',
                        key: 'action',
                        scopedSlots: { customRender: 'action' },
                        align: 'center',
                        width: '68px',
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
                statusData: [
                    {
                        title: '全部',
                        status: 0,
                        string: 'dataTotal',
                        query: null,
                    },
                    {
                        title: '正常',
                        status: 0,
                        string: 'normalTotal',
                        query: 1,
                        color: '#0A87F8'
                    },
                    {
                        title: '已作废',
                        status: 0,
                        string: 'cancellationTotal',
                        query: 2,
                        color: '#777777'
                    },
                ],
                statusActiveIndex:0,
                tableData: [],
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
                billWaterId: '',
                auditInstanceId:'',
                billWaterDialog:false,
                exportExcelShow:false,
                exportUrl: '/pc2b/bill_flow/list_export',
                exportData:{},
                spinLoading:true,
                warningDialog:false,
                auditEmpNameList:[],
                sendMessageFlag:true,
                isRefresh:false,
                workflowTab:false,
              amountDiffTotal:0,
              expendAmountTotal:0,
              incomeAmountTotal:0,
            }
        },
        created() {
            this.initPayMethodDictionary();
            this.initData();
        },
        methods: {
            urgeHander(){
                let parameter ={
                    auditInstanceId:this.auditInstanceId,
                    isSmsNotify:this.sendMessageFlag?1:0,
                };
                this.warningDialog = false;
                urgeHander(parameter).then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.$message.success('催办成功！');
                        this.warningDialog = false;
                    }else{
                        this.$message.error('催办失败！');
                    }
                })
            },
            onChange(e){
                this.sendMessageFlag = e.target.checked;
            },
            billFlowCancellation(record) {
                let _this = this;
                let id = record.id;
                let name = '';
                if(record.totalMoney>0){
                    name = '收款'
                }
                else{
                    name = '付款';
                }
                this.$modal.confirm({
                    title: '确定要作废 「' + record.payerName + '/' + record.payerPhone + '」 '+ name +'的流水吗？',
                    content: '确定后，此流水将作废；且该流水所属的账单将复原',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        API.billFlowCancellation({id:id}).then(res => {
                            // console.log(res)
                            if (res.code == 200) {
                                _this.$message.success('作废成功！');
                                setTimeout(()=>{
                                    _this.initData();
                                },500);

                            }else{
                                _this.$message.error('作废失败！');
                            }
                        })
                    },
                    onCancel() {
                    },
                });
            },
            billFlowRemove(record) {
                let _this = this;
                let id = record.id;
                let moneyOperate = record.totalMoney>0?'收款':'付款';
                this.$modal.confirm({
                    title: '确定要删除 「' + record.payerName + '/' + record.payerPhone + '」 '+ moneyOperate +'的流水吗？',
                    content: '删除后将不可恢复，请谨慎操作！',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        API.billFlowRemove({id:id}).then(res => {
                            // console.log(res)
                            if (res.code == 200) {
                                _this.$message.success('删除成功！');
                                setTimeout(()=>{
                                    _this.initData();
                                },500);
                            }else{
                                _this.$message.error('删除失败！');
                            }
                        })
                    },
                    onCancel() {
                    },
                });
            },
            openUrgeHander(record){
                this.auditEmpNameList = record.auditEmpNameList;
                this.warningDialog = true;
                this.auditInstanceId = record.auditInstanceId;
            },
            openFlowDetail(record){
                this.billWaterId = record.id;
                this.auditInstanceId = record.auditInstanceId;
                this.billWaterDialog = true;
                this.workflowTab = true;
            },
            revoke(record) {
                let _this = this;
                let parameter = {
                    auditInstanceId : record.auditInstanceId,
                    bizScene:31,
                };
                this.$modal.confirm({
                    title: '你确定要撤销申请吗？',
                    content: '',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        revoke(parameter).then(res => {
                            // console.log(res)
                            if (res.code == 200) {
                                if(res.data.successFlag==1){
                                    _this.$message.success('撤销申请成功！');
                                    setTimeout(()=> {
                                        _this.initData();
                                    },500);
                                }
                                else{
                                    _this.$message.error(res.data.errorMsg);
                                }
                            }else{
                                _this.$message.error('撤销申请失败！');
                            }
                        })
                    },
                    onCancel() {
                    },
                });
            },
            checkOpts(record){
                let markArr = [];
                let flag = false;
                if(record.auditStatus == 0){
                    //未开启流程 （作废、删除）
                    if(record.status==1){
                        markArr.push('mk_finance_bill_flow_zf','mk_finance_bill_flow_sc');
                    }
                    if(record.status==2){
                        markArr.push('mk_finance_bill_flow_sc');
                    }
                    JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                        if (markArr.includes(value.mark)){
                            flag = true
                        }
                    })
                }
                else{
                    if(record.status==2){
                        markArr.push('mk_finance_bill_flow_sc');
                        JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                            if (markArr.includes(value.mark)){
                                flag = true
                            }
                        })
                    } else{
                        //开启了流程
                        if(record.auditRelationType==0){
                            //无关系  审核通过只有删除操作（若有删除权限）
                            if(record.auditStatus == 9 ){
                                markArr.push('mk_finance_bill_flow_zf');
                                JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                                    if (markArr.includes(value.mark)){
                                        flag = true
                                    }
                                })
                            }
                        }
                        if(record.auditRelationType==1||record.auditRelationType==5||record.auditRelationType==2){
                            flag = true;
                        }
                    }
                }
                return flag;
            },
            changeStatus(option) {
                this.sendData.status = option.query;
                this.billFlowListStat();
                this.billFlowList();
            },
            initPayMethodDictionary(){
                API.getPayMethodDictionary().then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        let resData= res.data;
                        let searchListList = [];
                        let objTemp1 = {};
                        objTemp1.label = '全部';
                        objTemp1.value = null;
                        searchListList.push(objTemp1);
                        for (let i = 0; i < resData.length; i++) {
                            let objTemp = {};
                            objTemp.label = resData[i].name;
                            objTemp.value = resData[i].id;
                            searchListList.push(objTemp);
                        }
                        this.searchList.forEach((item)=>{
                            if(item.key=='paymentMethod'){
                                item.list = searchListList;
                            }
                        });

                    }
                });
            },
            billFlowListStat(){
                API.billFlowListStat(this.sendData).then(res => {
                    if (res.code === '200') {
                        let conut = res.data;
                        for (let item of this.statusData) {
                            item.status = conut[item.string];
                        }
                      this.amountDiffTotal = conut.amountDiffTotal;
                      this.expendAmountTotal = conut.expendAmountTotal;
                      this.incomeAmountTotal = conut.incomeAmountTotal;
                    }
                });
            },
            billFlowList(){
                this.spinLoading = true;
                API.billFlowList(this.sendData).then(res => {
                    if (res&&res.code === "200") {
                        if(res.data == null){
                            this.tableData = [];
                        }else{
                            this.tableData = res.data.records;
                            this.pagination.total = res.data.total;
                            this.tableData.forEach((item, index)=>{
                                item.index = index + 1;
                            });
                        }
                    }
                    setTimeout(()=>{
                        this.spinLoading = false;
                    },500)
                })
            },
            initData() {
                this.billFlowListStat();
                this.billFlowList();
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
            assetsFormData(data) {
                this.searchVisible = false;
                if(data.fuzzyQueryType) {
                    this.sendData.fuzzyQueryType = data.fuzzyQueryType;
                } else{
                    this.sendData.fuzzyQueryType = 0;
                }
                this.sendData.fuzzyKeyword = data.fuzzyKeyword;
                this.sendData.affirmTimeBegin = data.affirmTimeBegin
                this.sendData.affirmTimeEnd = data.affirmTimeEnd
                // this.sendData.quiteDateType = data.quiteDateType;
                this.sendData.practicalTimeBegin = data.practicalTimeBegin;
                this.sendData.practicalTimeEnd = data.practicalTimeEnd
                this.sendData.bizType = data.bizType;
                this.sendData.deptId = data.deptId;
                this.sendData.maintainerId = data.maintainerId;
              this.sendData.affirmEmpDeptId = data.affirmEmpDeptId;
              this.sendData.affirmEmpId = data.affirmEmpId;
              if(this.sendData.affirmEmpId){
                let affirmEmpIdList = [];
                affirmEmpIdList.push(this.sendData.affirmEmpId);
                this.sendData.affirmEmpIdList = affirmEmpIdList;
              }
              else{
                this.sendData.affirmEmpIdList = [];
              }
                this.sendData.billType = data.billType;
                this.sendData.paymentMethod = data.paymentMethod;
                this.sendData.feeDirection = data.feeDirection;
                this.sendData.auditStatus = data.auditStatus;
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.initData();
            },
            handleTableChange(pagination) {
                this.pagination.current = pagination.current;
                this.pagination.pageSize = pagination.pageSize;
            },
            //***其他***//
            openDetail(record) {
                return {
                    on: {
                        click: () => {
                            this.billWaterId = record.id;
                            this.auditInstanceId = record.auditInstanceId;
                            this.billWaterDialog = true;
                            this.workflowTab = false;
                        }
                    }
                }
            },
            // 导出
            exportExcel() {
                this.exportData = Object.assign({}, this.sendData);
                // this.exportData.total = this.pagination.total;
                this.exportExcelShow = true;
            },
            saveSuccess(res) {
                if (res) {
                    setTimeout(() => {
                        this.initData();
                    }, 500)
                }
            },
            deleteSuccess(){
                this.billWaterDialog = false;
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
                this.billWaterDialog = false;
                this.isRefresh = false
            },
        },
        filters: {
        }
    }

</script>

<style lang="less" scoped>
    .bill-water-box {
        & /deep/ .content-main {
          padding: 0px 14px;
            .content {
                padding: 0;
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
      .content-top {
        min-width: 1300px; // overflow: hidden;
      }
      .statiscStyle{
        margin: 10px 14px;
        background: #FFFFFF;
        height: 38px;
        line-height: 38px;
        padding: 0 14px;
        font-size: 14px;
      }
        .table {
            min-width: 1200px; // margin: 0 10px 0 10px;
            position: relative;
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
            .toReceivables{
                background-color:#0A87F8;
            }
            .toPay {
                background-color:#FFA036;
            }
            .complete {
                background-color: #03C683;
            }
            .nameColumn {
                width: 100%;
                .name {
                    float: left;
                }
                .leaderFlag {
                    color: #777777;
                    border: 0.5px solid #DDDDDD;
                    border-radius: 10px;
                    float: left;
                    margin-left: 4px;
                    padding-right: 4px;
                    .leaderLength {
                        width: auto;
                        margin-left: 5px;
                        font-size: 12px;
                    }
                }
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
            .shou-zhi {
                display: inline-block;
                height: 20px;
                width: 20px;
                color: #FB4246;
                border: 1px solid #FB4246;
                border-radius: 50%;
                text-align: center; // margin: 0 10px;
                line-height: 20px;
                font-size: 12px;
            }
            .shou-shou {
                display: inline-block;
                height: 20px;
                width: 20px;
                color: #0A87F8;
                border: 1px solid #0A87F8;
                border-radius: 50%;
                text-align: center; // margin: 0 10px;
                line-height: 20px;
                font-size: 12px;
            }
            & /deep/ .ant-table-thead>tr {
                height: 46px;
            }
            & /deep/ .ant-table-thead>tr>th{
                padding: 12px 9px;
            }
            & /deep/ .ant-table-tbody>tr>td {
                padding: 12px 9px;
                &:not(:first-child) {
                    cursor: pointer;
                }
            }
        }

        & /deep/ .ant-popover {
            .ant-popover-inner-content {
                text-align: center;
                padding: 5px 0;
                .action {
                    padding: 8px 18px;
                }
                .action:hover {
                    cursor: pointer;
                    background: rgba(10, 135, 248, 0.1);
                }
            }
        }
    }
    .status{
        color: #111111;
        font-size: 14px;
    }
    .statusRadius{
        width:20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border-radius: 50%;
        i{
            vertical-align: -0.1em
        }
    }
    .status1{
        color: #FFA036;
        border: 1px solid #FFA036;
    }
    .status9{
        color: #0A87F8;
        border: 1px solid #0A87F8;
    }
    .status5{
        color: #FB4246;
        border: 1px solid #FB4246;
    }
    .status6{
        color: #777777;
        border: 1px solid #777777;
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
    /deep/ .content-main .content{
        padding: 0;
    }
    .content{
        position: relative;
        padding: 32px 32px 0;
        .contentCircle{
            float: left;
            margin-right: 16px;
            font-size: 22px;
            color:#faad14;
        }
        .contentTitle{
            display: block;
            overflow: hidden;
            color: rgba(0, 0, 0, 0.85);
            font-weight: 500;
            font-size: 16px;
            line-height: 1.4;
        }
        .confirm-content{
            margin-top: 7px;
            margin-left: 38px;
            color: rgba(0, 0, 0, 0.65);
            font-size: 14px;
        }
        .confirm-warning{
            margin-left: 38px;
            width:331px;
            padding: 8.5px 0 8.5px 10px;
            background:rgba(245,247,254,1);
            border-radius:4px;
            margin-top: 15px;
        }
        .confirm-check{
            position: absolute;
            bottom:-75px;
            left: 70px;
        }
    }
</style>
<style lang="less">
    .myLaunch-box-special-Dialog{
        .ant-modal-header {
            border-bottom: none;
            height: 50px;
            line-height: 50px;
        }
        .ant-modal-footer {
            padding: 50px 32px 24px 32px;
            border-top: none;
        }
    }
</style>
