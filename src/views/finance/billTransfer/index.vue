<template>
    <!-- 租客转账通知 -->
    <div class="bill-transfer-box">
        <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
        <content-top>
            <div class="status-box f-fl">
                <top-status :statusData="statusData" @changeStatus="changeStatus"></top-status>
            </div>
            <div class="search-box f-fr">
                <search-dialog resMark="mk_fin_bill_transfer" placeholder="房源编号/房源地址/门牌号/项目名称/转账人姓名/转账人电话" :showCityTown="false" :searchList="searchList" @search="assetsFormData"></search-dialog>
            </div>
        </content-top>
        <content-main>
            <skeleton-bill-transfer v-show="spinLoading"></skeleton-bill-transfer>
            <div class="table" v-show="!spinLoading">
                <a-table rowKey="id" :customRow="openDetail" :bordered="true" :pagination="false" :columns="tableColumns" :dataSource="tableData">
                    <div slot="auditStatusName" slot-scope="text">
                        <div class="IconRadius f-fl" :class="text=='待处理'?'toBeReviewed':text=='审核通过'?'approved':'reject'"></div>
                        <div>
                            <span class="auditStatusNameFont">{{text}}</span>
                        </div>
                    </div>
                    <div slot="fullAddress" slot-scope="text,record">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                                </p>
                            </template>
                            <div type="primary" class="overHidde" style="max-width: 250px;">
                                <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                            </div>
                        </a-popover>
                    </div>
                    <div slot="payerName" slot-scope="text,record">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    <span>{{record.payerName}} /</span>{{record.payerPhone}}
                                </p>
                            </template>
                            <div class="f-fl" type="primary">
                                <p class="overHidde" style="line-height:22px;max-width: 148px;">
                                    <span>{{record.payerName}} /</span>{{record.payerPhone}}
                                </p>
                            </div>
                        </a-popover>
                    </div>
                    <div slot="billName" slot-scope="text">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    <span>{{text}}</span>
                                </p>
                            </template>
                            <div class="f-fl" type="primary">
                                <p class="overHidde" style="line-height:22px;max-width: 110px;">
                                    <span>{{text}}</span>
                                </p>
                            </div>
                        </a-popover>
                    </div>
                    <div slot="occurredMoney" slot-scope="text">
                        {{Math.abs(text)/100}}
                    </div>
                    <div slot="createTime" slot-scope="text">
                        {{$moment(text).format('YYYY.MM.DD HH:mm')}}
                    </div>
                    <div slot="collectionAccount" slot-scope="text">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    <span>{{text}}</span>
                                </p>
                            </template>
                            <div class="f-fl" type="primary">
                                <p class="overHidde" style="line-height:22px;max-width: 135px;">
                                    <span>{{text}}</span>
                                </p>
                            </div>
                        </a-popover>
                    </div>
                    <div slot="action" slot-scope="text, record" v-if="checkOpts(record) == true">
                        <a-popover :title="null" trigger="hover" placement="bottom" >
                            <template slot="content">
                                <div v-if="record.auditStatus==1" @click.stop="approvedView(record)" class="action cursor" v-mark="['mk_finance_transfer_shtg']" style="text-align:center;">审核通过</div>
                                <div v-if="record.auditStatus==1" @click.stop="rejectView(record)" class="action cursor" v-mark="['mk_finance_transfer_shbh']" style="text-align:center;">审核驳回</div>
                                <div @click.stop="viewBillDetail(record)" class="action cursor" v-mark="['mk_finance_bill_ck']" style="text-align:center;">查看所属账单</div>
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
        <!-- 审核处理转账通知 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" :width="passRejectWith" v-model="billProcessDialog" class="ownModalBorder titDialog" title="转账审核" @cancel="billProcessDialog=false">
            <bill-process @closeThis="billProcessDialog=false" @saveSure="saveSuccess" :id="id" :billId="billId" :operateTypeReg="operateTypeReg"></bill-process>
        </a-modal>
        <!-- 账单详情 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="账单详情" width="1000px" v-model="billDetailDialog" class="ownModalBorder titDialog" @cancel="isRefreshFun">
            <bill-detail @refreshinfoFun="refreshinfoFun" :billId="billId" @saveSuccess="saveSuccess"></bill-detail>
        </a-modal>
        <!-- 转账详情 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="转账详情" width="1000px" v-model="billTransferDetailsDialog" class="ownModalBorder titDialog" @cancel="isRefreshFun">
            <bill-transfer-details @refreshinfoFun="refreshinfoFun" :id="id" @saveSuccess="saveSuccess"></bill-transfer-details>
        </a-modal>
    </div>
</template>

<script>
    import Vue from 'vue'
    import SearchDialog from '@/components/SearchDialog';
    import TopStatus from '@/components/TopStatus/index';
    import { billTransferList,billTransferBizStat } from '@/api/billDetailWater';
    import  billDetail from '../bill/billDetails';
    import  billProcess from './billTransferPass';
    import  SkeletonBillTransfer from '../../skeleton/finance/billTransfer';
    import billTransferDetails from './billTransferDetails';
    export default {
        name: "bill",
        components: {
            TopStatus,
            SearchDialog,
            billDetail,
            billProcess,
            SkeletonBillTransfer,
            billTransferDetails,
        },
        data() {
            let currentTime = Vue.prototype.$moment().startOf('day').valueOf();
            let beforeThreeDay = Vue.prototype.$moment().add(-2, 'days').valueOf();
            let beforeSevenDay = Vue.prototype.$moment().add(-6, 'days').valueOf();
            return {
                sendData: {
                    current: 1,                     // 当前页数
                    size: 10,                       // 每页返回的记录数量
                    fuzzyKeyword: '',               // 模糊匹配关键词
                    fuzzyQueryType: 0,             //模糊查询类型【0、全部，1、房源编号，2、小区地址，3、门牌号，4、收付款人姓名，5、收付款人电话】
                    isSearchCount: 1,                //是否查询总记录数（1.是（默认）；2.否）
                    deptId: '',                     // 部门ID
                    maintainerId: '',              // 负责人ID
                    paymentAccountType: '',        //收付款账号类型【1、银行卡，2、支付宝，3、微信】
                    occurredMoneyBegin:'',
                    occurredMoneyEnd:'',
                    createTimeBegin:'',
                    createTimeEnd:'',
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
                                label: '房源地址',
                                value: 2
                            },
                            {
                                label: '门牌号',
                                value: 3
                            },
                            {
                                label: '项目名称',
                                value: 4
                            },
                            {
                                label: '转账人姓名',
                                value: 5
                            },
                            {
                                label: '转账人电话',
                                value: 6
                            }
                        ],
                    },
                    {
                        key: 'paymentAccountType',
                        title: '收款账号类型',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '支付宝',
                                value: 2
                            },
                            {
                                label: '微信',
                                value: 3
                            },
                            {
                                label: '银行卡',
                                value: 1
                            }
                        ],
                    },
                    {
                        key: ['occurredMoneyBegin', 'occurredMoneyEnd'],
                        title: '转账金额',
                        placeholderNames:['最小金额','最大金额'],
                        currentActiveIndex: 0,
                        value_start:'',
                        value_end:'',
                        list: [
                            {
                                label: '自定义',
                                type: 'input',
                                value: ['', '']
                            }
                        ],
                        type:'input',
                    },
                    {
                        key: ['createTimeBegin', 'createTimeEnd'],
                        title: '提交时间',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: ['', '']
                            },
                            {
                                label: '今天提交',
                                value: [currentTime, currentTime]
                            },
                            {
                                label: '3天内提交',
                                value: [beforeThreeDay, currentTime]
                            },
                            {
                                label: '7天内提交',
                                value: [beforeSevenDay, currentTime]
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
                        dataIndex: 'auditStatusName',
                        key: 'auditStatusName',
                        align: 'left',
                        scopedSlots: { customRender: 'auditStatusName' },
                        width: '100px',
                    },
                    {
                        title: '房源信息',
                        dataIndex: 'fullAddress',
                        key: 'fullAddress',
                        scopedSlots: { customRender: 'fullAddress' },
                        align: 'left',

                    },
                    {
                        title: '转账人信息',
                        dataIndex: 'payerName',
                        key: 'payerName',
                        scopedSlots: { customRender: 'payerName' },
                        align: 'left',
                    },
                    {
                        title: '转账账单摘要',
                        key: 'billName',
                        dataIndex: 'billName',
                        scopedSlots: { customRender: 'billName' },
                        align: 'left',
                    },
                    {
                        title: '提交时间',
                        key: 'createTime',
                        dataIndex: 'createTime',
                        align: 'left',
                        scopedSlots: { customRender: 'createTime' },
                    },
                    {
                        title: '转账金额（元）',
                        key: 'occurredMoney',
                        dataIndex: 'occurredMoney',
                        scopedSlots: { customRender: 'occurredMoney' },
                        align: 'left',
                    },
                    {
                        title: '收付款账号类型',
                        key: 'paymentAccountTypeName',
                        dataIndex: 'paymentAccountTypeName',
                        align: 'left',
                    },
                    {
                        title: '收付款账号',
                        key: 'collectionAccount',
                        dataIndex: 'collectionAccount',
                        scopedSlots: { customRender: 'collectionAccount' },
                        align: 'left',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        scopedSlots: {customRender: 'action'},
                        align: 'center',
                        width: '80px',
                        customCell: () => {
                            return {
                                on: {
                                    click: () => {
                                        event.stopPropagation();
                                    }
                                }
                            }
                        },
                    }
                ],
                statusData: [
                    {
                        title: '全部',
                        status: 0,
                        string: 'dataTotal',
                        query: null,
                    },
                    {
                        title: '待处理',
                        status: 0,
                        string: 'auditingTotal',
                        query: 1,
                        color: '#FB4246'
                    },
                    {
                        title: '审核通过',
                        status: 0,
                        string: 'auditPassTotal',
                        query: 2,
                        color: '#0A87F8'
                    },
                    {
                        title: '已驳回',
                        status: 0,
                        string: 'auditRejectTotal',
                        query: 3,
                        color: '#777777'
                    }
                ],
                tableData: [],
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
                billDetailId: '',
                billDetailDialog:false,
                billProcessDialog:false,
                billTransferDetailsDialog:false,
                spinLoading:true,
                billId:'',
                id:'',
                operateTypeReg:1,
                isRefresh:false,
                passRejectWith:'1000px',
            }
        },
        created() {
            this.initData();
        },
        methods: {
            approvedView(record){
                this.operateTypeReg = 1;
                this.billId = record.billId;
                this.billProcessDialog = true;
                this.id = record.id;
                this.passRejectWith = '1000px';
            },
            rejectView(record){
                this.operateTypeReg = 2;
                this.billProcessDialog = true;
                this.billId = record.billId;
                this.id = record.id;
                this.passRejectWith = '800px';
            },
            viewBillDetail(record){
                this.billId = record.billId;
                this.billDetailDialog = true;
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
                this.billDetailDialog = false;
                this.isRefresh = false
            },
            checkOpts(record){
                let markArr = []
                let flag = false;
                if (record.auditStatus==1){
                    markArr.push('mk_finance_bill_ck','mk_finance_transfer_shtg','mk_finance_transfer_shbh');
                }
                if(record.auditStatus==2||record.auditStatus==3){
                    markArr.push('mk_finance_bill_ck');
                }
                JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                    if (markArr.includes(value.mark)){
                        flag = true
                    }
                })
                return flag
            },
            initData() {
                this.getData();
                this.getStatusCount();
            },
            getData() {
                this.spinLoading = true;
                billTransferList(this.sendData).then(res => {
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
                    this.spinLoading = false;
                })
            },
            getStatusCount() {
                billTransferBizStat(this.sendData).then(res => {
                    if (res.code === '200') {
                        let resData = res.data;
                        for (let item of this.statusData) {
                            item.status = resData[item.string];
                        }
                    }
                })
            },
            saveSuccess(res) {
                this.billProcessDialog = false;
                this.billDetailDialog = false;
                if (res) {
                    setTimeout(() => {
                        this.initData();
                    }, 500)
                }
            },
            changeStatus(option) {
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.sendData.auditStatus = option.query;
                this.getStatusCount();
                this.getData();
            },
            onSizeChange(current) {
                this.sendData.current = current;
                this.getData();
            },
            onShowSizeChange(current, pageSize) {
                this.sendData.current = current;
                this.sendData.size = pageSize;
                this.pagination.pageSize = pageSize;
                this.getData();
            },
            assetsFormData(data) {
                if(data.fuzzyQueryType) {
                    this.sendData.fuzzyQueryType = data.fuzzyQueryType;
                } else{
                    this.sendData.fuzzyQueryType = 0;
                }
                this.sendData.fuzzyKeyword = data.fuzzyKeyword;
                this.sendData.deptId = data.deptId;
                this.sendData.maintainerId = data.maintainerId;
                this.sendData.paymentAccountType = data.paymentAccountType;
                this.sendData.occurredMoneyBegin = data.occurredMoneyBegin?Math.round(data.occurredMoneyBegin*100):'';
                this.sendData.occurredMoneyEnd = data.occurredMoneyEnd?Math.round(data.occurredMoneyEnd*100):'';
                this.sendData.createTimeBegin = data.createTimeBegin;
                this.sendData.createTimeEnd = data.createTimeEnd;
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.initData();
            },
            //***其他***//
            openDetail(record) {
                return {
                    on: {
                        click: () => {
                            this.id = record.id;
                            this.billTransferDetailsDialog = true;
                        }
                    }
                }
            },
        },
        filters: {

        }
    }

</script>

<style lang="less" scoped>
    .bill-transfer-box {
        & /deep/ .content-main {
            .content {
                padding: 0;
            }
        }
      .content-top {
        min-width: 1300px; // overflow: hidden;
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
            .toBeReviewed{
                background-color:#FB4246;
            }
            .approved {
                background-color:#0A87F8;
            }
            .reject {
                background-color: #777777;
            }
            .auditStatusNameFont{
                color: #111111;
                font-size: 14px;
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
                    padding: 8px 10px;
                }
                .action:hover {
                    cursor: pointer;
                    background: rgba(10, 135, 248, 0.1);
                }
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
</style>
