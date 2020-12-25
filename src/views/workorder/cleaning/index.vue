<template>
    <!-- 保洁 -->
    <div class="cleanBox">
        <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
        <div class="add-btn-wrap" @click="addClean(true)" v-mark="['mk_workorder_clean_tjgd']">
            <icon-font type="iconyumengtubiao_tianjia" />添加保洁
        </div>
        <content-top>
            <div class="status-box f-fl">
                <top-status :activeIndex="statusActiveIndex" :statusData="statusData" @changeStatus="changeStatus"></top-status>
            </div>
            <div class="f-fr cursor exportExcel-box" v-mark="['mk_workorder_clean_dc']"><span @click="exportExcel"><icon-font class="f-ftc-blue" type="iconyumengtubiao_xiazai1" /></span></div>
            <div class="search-box f-fr">
                <search-dialog resMark="mk_workorder_clean" ref="searchDialog" placeholder="申请人姓名/申请人电话/房源编号/房源地址/项目名称/门牌号" :showCityTown="false" :searchList="searchList" @search="assetsFormData"></search-dialog>
            </div>
        </content-top>
        <content-main>
            <skeleton-cleaning v-show="spinLoading"></skeleton-cleaning>
            <div class="table" v-show="!spinLoading">
                <a-table rowKey="id" :bordered="true" :customRow="openDetail" :pagination="false" :columns="tableColumns" :dataSource="tableData">
                <div slot="status" slot-scope="status">
                    <div v-if="status==1" class="fontProhibit fontProhibitColor">
                        <div class="prohibitBg1 IconRadius prohibitBg f-fl"></div>
                        <div>
                            <span>待处理</span>
                        </div>
                    </div>
                    <div v-if="status==2" class="fontProhibit fontProhibitColor">
                        <div class="prohibitBg2 IconRadius prohibitBg f-fl"></div>
                        <div>
                            <span>处理中</span>
                        </div>
                    </div>
                    <div v-else-if="status==3" class="fontProhibit fontProhibitColor">
                        <div class="prohibitBg3  IconRadius prohibitBg f-fl"></div>
                        <div>
                            <span>待验收</span>
                        </div>
                    </div>
                    <div v-else-if="status==4" class="fontProhibit fontProhibitColor">
                        <div class="prohibitBg4  IconRadius prohibitBg f-fl"></div>
                        <div>
                            <span>已完成</span>
                        </div>
                    </div>
                    <div v-else-if="status==5" class="fontProhibit fontProhibitColor">
                        <div class="prohibitBg5  IconRadius prohibitBg f-fl"></div>
                        <div>
                            <span>已取消</span>
                        </div>
                    </div>
                </div>
                <div slot="sourceType" slot-scope="text,record">
                    <div>
                        <span v-if="record.sourceType==1" class="tenant">租客</span>
                        <span v-if="record.sourceType==2" class="company">公司</span>
                        <span style="margin-left: 5px">{{record.applyName}}-{{record.applyPhone}}</span>
                    </div>
                </div>
                <div slot="locationInfo" slot-scope="text,record">
                    <a-popover>
                        <template slot="content">
                            <p style="padding: 8px 18px;">
                                <span v-if="record.houseAlias" class="houseAddress" style="min-width: 63px;">{{record.houseAlias}}</span>
                                <span style="margin-left: 2px">{{record.fullAddress}}</span>
                            </p>
                        </template>
                        <div class="f-fl" style="width:100%;position: relative;" type="primary">
                            <p class="overHidde" style="xline-height:22px;">
                                <span v-if="record.houseAlias" class="houseAddress" style="min-width: 63px;">{{record.houseAlias}}</span>
                                <span style="margin-left: 2px">{{record.fullAddress}}</span>
                            </p>
                        </div>
                    </a-popover>
                </div>
                <div slot="visitDate" slot-scope="text,record">
                    {{record.visitDate?$moment(record.visitDate).format('YYYY.MM.DD'):'-'}} {{record.visitTime|visitTimeVal}}
                </div>
                <div slot="cleanType" slot-scope="cleanType">
                    {{cleanType|cleanTypeVal}}
                </div>
                <div slot="maxMoney" slot-scope="text,record">
                    {{record.minMoney?record.minMoney/100:''}}-{{text?text/100:''}} 元
                </div>
                <div slot="leasePeriod" slot-scope="leasePeriod">
                    {{leasePeriod==1?'一个月':leasePeriod==2?'三个月':leasePeriod==3?'半年':leasePeriod==4?'一年':leasePeriod==5 ?'一年以上':'-'}}
                </div>
                <div slot="createTime" slot-scope="createTime">
                    {{$moment(createTime).format('YYYY.MM.DD HH:mm')}}
                </div>
                <div slot="promotionDesc" slot-scope="text">
                    <a-popover>
                        <template slot="content">
                            <p style="max-width:250px;padding: 8px 18px;">
                                <span style="margin-left: 2px">{{text}}</span>
                            </p>
                        </template>
                        <div class="f-fl" style="max-width: 250px;position: relative;" type="primary">
                            <p class="overHidde" style="xline-height:22px;">
                                <span style="margin-left: 2px">{{text|blankVal}}</span>
                            </p>
                        </div>
                    </a-popover>
                </div>
                <div slot="action" slot-scope="text, record" v-if="(record.status!=4||record.isAppraisal!=1||!record.houseId)">
                    <a-popover :title="null" trigger="hover" v-if="checkOpts(record) == true">
                        <template slot="content">
                            <div v-if="record.status==1" @click.stop="assignmentClean(record,1)" class="action cursor" v-mark="['mk_workorder_clean_pd']">派单</div>
                            <div v-if="record.status==2" @click.stop="assignmentClean(record,2)" class="action cursor" v-mark="['mk_workorder_clean_gp']">改派</div>
                            <div v-if="record.status==1||record.status==2" @click.stop="editClean(record)" class="action cursor" v-mark="['mk_workorder_clean_bjgd']">编辑</div>
                            <div v-if="record.status==1||record.status==2" @click.stop="completeClean(record)" class="action cursor" v-mark="['mk_workorder_clean_wc']">完成</div>
                            <div v-if="record.status==1||record.status==2" @click.stop="cancelClean(record)" class="action cursor" v-mark="['mk_workorder_clean_qxgd']">取消</div>
                            <div v-if="record.status==3" @click.stop="checkClean(record)" class="action cursor" v-mark="['mk_workorder_clean_ysgd']">验收</div>
                            <div v-if="(record.status==3||record.status==4)&&record.showAppraisalButton==1&&record.isAppraisal==0" @click.stop="rateClean(record)" class="action cursor" v-mark="['mk_workorder_clean_pjgd']">评价</div>
                            <div v-if="record.status==5" @click.stop="deleteChild(record)" class="action cursor" v-mark="['mk_workorder_clean_scgd']">删除</div>
                            <div v-if="!record.houseId" @click.stop="associated(record)" class="action cursor" v-mark="['mk_workorder_clean_glfy']">关联房源</div>
                        </template>
                        <div style="width: 100%;height: 100%">
                            <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
                        </div>
                    </a-popover>
                </div>
            </a-table>
                <div class="contFoot" v-show="tableData.length>0">
                    <a-pagination size="small" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
                </div>
            </div>
        </content-main>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" v-model="addCleanDialog" class="ownModalBorder titDialog" :title="addCleanTitle" @cancel="refreshPageOnlyCancel">
            <add-clean :cleanId="cleanId" @cancelSave="refreshPageOnlyCancel" @successSave="refreshPage"></add-clean>
        </a-modal>
        <!-- 关联房源弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="associatedDialog" class="ownModalBorder titDialog" title="关联房源" @cancel="refreshPageOnlyCancel">
            <associated-detail :infoData="infoData" @cancelAssociated="refreshPageOnlyCancel" @successAssociated="refreshPage"></associated-detail>
        </a-modal>
        <!-- 取消工单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="cancelCleanDialog" class="ownModalBorder titDialog" title="取消工单" @cancel="refreshPageOnlyCancel">
            <cancel-clean :infoData="infoData" @cancelCancel="refreshPageOnlyCancel" @successCancel="refreshPage"></cancel-clean>
        </a-modal>
        <!-- 派单/改派 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="assignmentDialog" class="ownModalBorder titDialog" :title="assignmentTitle" @cancel="refreshPageOnlyCancel">
            <assignment-detail :cleanId="cleanId" :assignmentType="assignmentType" @cancelAssignment="refreshPageOnlyCancel" @successAssignment="refreshPage"></assignment-detail>
        </a-modal>
        <!-- 完成 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="completeDialog" class="ownModalBorder titDialog" title="完成工单" @cancel="refreshPageOnlyCancel">
            <complete-detail :cleanId="cleanId" :deptId="deptId" @cancelComplete="refreshPageOnlyCancel" @successComplete="refreshPage"></complete-detail>
        </a-modal>
        <!-- 评价工单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="rateDialog" class="ownModalBorder titDialog" title="取消工单" @cancel="refreshPageOnlyCancel">
            <rate-clean :cleanId="cleanId" @cancelRate="refreshPageOnlyCancel" @successRate="refreshPage"></rate-clean>
        </a-modal>
        <!-- 验收工单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="checkDialog" class="ownModalBorder titDialog" title="验收工单" @cancel="refreshPageOnlyCancel">
            <check-clean :cleanId="cleanId" @cancelCheck="refreshPageOnlyCancel" @successCheck="refreshPage"></check-clean>
        </a-modal>
        <!-- 工单详情 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="detailDialog" class="ownModalBorder titDialog" title="工单详情" @cancel="isRefreshFun">
            <clean-detail @refreshinfoFun="refreshinfoFun" :cleanId="cleanId" @cancelDetails="refreshPage"></clean-detail>
        </a-modal>
        <!-- 导出框-->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="exportExcelShow" class="ownModalBorder titDialog" title="导出提示">
          <exportExcel @close="exportExcelShow=false" :exportData="exportData" :exportUrl='exportUrl'></exportExcel>
        </a-modal>
    </div>
</template>

<script>
    import Vue from 'vue';
    import TopStatus from '@/components/TopStatus/index';
    import AssociatedDetail from './associated';
    import AssignmentDetail from './assignment';
    import CompleteDetail from './complete';
    import RateClean from './rate';
    import AddClean from './add';
    import CancelClean from './cancel';
    import CheckClean from './check';
    import CleanDetail from './details';
    import SearchDialog from '@/components/SearchDialog';
    import SkeletonCleaning from '../../skeleton/workorder/cleaning';
    import  * as API from '@/api/workorder';
    import exportExcel from '@/components/exportExcel/index';

    export default {
        name: "clean",
        components: {
            TopStatus,
            SearchDialog,
            RateClean,
            AddClean,
            CancelClean,
            AssociatedDetail,
            AssignmentDetail,
            CompleteDetail,
            CheckClean,
            CleanDetail,
            SkeletonCleaning,
            exportExcel,
        },
        data() {
            let currentTime = Vue.prototype.$moment().startOf('day').valueOf();
            let todayDay = Vue.prototype.$moment().add(1, 'days').valueOf();
            let threeDay = Vue.prototype.$moment().add(2, 'days').valueOf();
            let oneWeek = Vue.prototype.$moment().add(6, 'days').valueOf();
            return {
                searchList: [
                    {
                        key: 'fuzzyQueryType',
                        list: [
                            {
                                label: '综合检索',
                                value: 0,
                            },
                            {
                                label: '申请人姓名',
                                value: 1
                            },
                            {
                                label: '申请人电话',
                                value: 2
                            },
                            {
                                label: '房源编号',
                                value: 3,
                            },
                            {
                                label: '房源地址',
                                value: 4
                            },
                            {
                                label: '项目名称',
                                value: 5
                            },
                            {
                                label: '门牌号',
                                value: 6
                            },
                        ],
                    },
                    {
                        key: 'sourceType',
                        title: '工单来源',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '租客',
                                value: 1
                            },
                            {
                                label: '公司',
                                value: 2
                            },
                        ],
                    },
                    {
                        key: 'cleanType',
                        title: '保洁类型',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '日常保洁',
                                value: 1
                            },
                            {
                                label: '深度保洁',
                                value: 2
                            },
                            {
                                label: '开荒保洁',
                                value: 3
                            },
                            {
                                label: '擦玻璃',
                                value: 4
                            },
                            {
                                label: '空调清理',
                                value: 5
                            },
                            {
                                label: '油烟机清洗',
                                value: 6
                            },
                            {
                                label: '冰箱清洗',
                                value: 7
                            }, {
                                label: '除螨清洁',
                                value: 8
                            },
                            {
                                label: '皮质家具护理',
                                value: 9
                            },
                            {
                                label: '其他',
                                value: 10
                            }
                        ],
                    },
                    {
                        key: ['visitDateStart', 'visitDateEnd'],
                        title: '期望上门时间',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '不限',
                                value: ['', '']
                            },
                            {
                                label: '今天',
                                value: [currentTime, todayDay]
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
                                label: '自定义',
                                value: ['', '']
                            }
                        ],
                        style:'margin-bottom:10px;'
                    },
                    {
                        key: 'visitTime',
                        title: '',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部时段',
                                value: null,
                                checked:true,
                            },
                            {
                                label: '9:00-13:00',
                                value: 1,
                                checked:false,
                            },
                            {
                                label: '13:00-16:00',
                                value: 2,
                                checked:false,
                            },
                            {
                                label: '18:00-22:00',
                                value: 3,
                                checked:false,
                            },
                        ],
                        type:'checkbox',
                    },
                    {
                        key: 'isAppraisal',
                        title: '是否评价',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '否',
                                value: 0
                            },
                            {
                                label: '是',
                                value: 1
                            },
                        ],
                    },
                ],
                placement: 'right',  //抽屉搜索框位置
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
                        dataIndex: 'status',
                        key: 'status',
                        align: 'left',
                        scopedSlots: { customRender: 'status' },
                        width: '6%',
                    },
                    {
                        title: '来源/申请人信息',
                        dataIndex: 'sourceType',
                        key: 'sourceType',
                        scopedSlots: { customRender: 'sourceType' },
                        align: 'left',
                        width: '16%',
                    },
                    {
                        title: '保洁地址',
                        dataIndex: 'locationInfo',
                        key: 'locationInfo',
                        scopedSlots: { customRender: 'locationInfo' },
                        align: 'left',
                        width: '21%',
                    },
                    {
                        title: '期望上门时间',
                        key: 'visitDate',
                        dataIndex: 'visitDate',
                        scopedSlots: { customRender: 'visitDate' },
                        align: 'left',
                        width: '13%',
                    },
                    {
                        title: '保洁类型',
                        key: 'cleanType',
                        dataIndex: 'cleanType',
                        align: 'left',
                        scopedSlots: { customRender: 'cleanType' },
                        width: '8.1%',
                    },
                    {
                        title: '需求描述',
                        key: 'promotionDesc',
                        dataIndex: 'promotionDesc',
                        scopedSlots: { customRender: 'promotionDesc' },
                        align: 'left',
                        width: '14.6%',
                    },
                    {
                        title: '申报时间',
                        key: 'createTime',
                        dataIndex: 'createTime',
                        scopedSlots: { customRender: 'createTime' },
                        align: 'left',
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
                pagination: {
                    total: 0,
                    current: 0,
                    pageSize: 10,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
                statusData: [
                    {
                        title: '全部',
                        status: 0,
                        string: 'total',
                        query: null,
                        color: '#0A87F8'
                    },
                    {
                        title: '待处理',
                        status: 0,
                        string: 'pending',
                        query: 1,
                        color: '#FB4246'
                    },
                    {
                        title: '处理中',
                        status: 0,
                        string: 'processing',
                        query: 2,
                        color: '#03C683'
                    },
                    {
                        title: '待验收',
                        status: 0,
                        string: 'acceptance',
                        query: 3,
                        color: '#FFA036'
                    },
                    {
                        title: '已完成',
                        status: 0,
                        string: 'completed',
                        query: 4,
                        color: '#0A87F8'
                    },
                    {
                        title: '已取消',
                        status: 0,
                        string: 'cancel',
                        query: 5,
                        color: '#666666'
                    }
                ],
                sendData: {
                    current: 1,                     // 当前页数
                    size: 10,                       // 每页返回的记录数量
                    fuzzyKeyword: '',               // 模糊匹配关键词
                    fuzzyQueryType: 0,              //模糊查询类型【0、全部，1、客户姓名，2、客户电话】
                    sort: '',                       // 排序字段
                    updateTime: '',                 // 修改时间
                    status:'',                      //保洁状态【1、待处理，2、处理中，3、待验收，4、处理完成，5、已取消】
                    deptId:'',                      //部门
                    maintainerId:'',                 //人员
                    sourceType:'',                  //工单来源
                    isAppraisal:'',                 //是否评价【0、否，1、是】
                    cleanType:'',                  //保洁类型
                    visitDateStart:'',              //期望上门最早日期
                    visitDateEnd:'',                //期望上门最晚日期
                    visitTime:''                    //期望上门时间【1、9点-13点，2、13点-18点，3、18点-22点】
                },
                statusActiveIndex:0,
                cleanId:'',
                cleanDetailsDialog:false,
                addCleanDialog:false,
                cancelCleanDialog:false,
                addCleanTitle:'',
                searchVisible: false,
                associatedDialog:false,
                assignmentDialog:false,
                rateDialog:false,
                checkDialog:false,
                completeDialog:false,
                detailDialog:false,
                assignmentTitle:'',
                infoData:{},
                assignmentType:1,
                isAcceptance:0,
                spinLoading:true,
                isRefresh:false,
                deptId:'',
              exportUrl: '/workorder/clean/list_export',
              exportData:{},
              exportExcelShow:false,
            }
        },
        created() {
            switch (this.$route.params.search) {
                case 'index':
                    this.statusActiveIndex = 0;
                    this.sendData.status = '';
                    break;
                case 'pending':
                    this.statusActiveIndex = 1;
                    this.sendData.status = 1;
                    break;
                case 'processing':
                    this.statusActiveIndex = 2;
                    this.sendData.status = 2;
                    break;
                case 'acceptance':
                    this.statusActiveIndex = 3;
                    this.sendData.status = 3;
                    break;
            }
            this.initData();
        },
        methods: {
            // 导出
            exportExcel() {
              this.exportData = Object.assign({}, this.sendData);
              this.exportExcelShow = true;
            },
            checkOpts(record){
                let markArr = []
                let flag = false;
                if (record.status==1) {
                    markArr.push('mk_workorder_clean_pd','mk_workorder_clean_bjgd','mk_workorder_clean_wc','mk_workorder_clean_qxgd');
                }
                if(record.status==2) {
                    markArr.push('mk_workorder_clean_gp','mk_workorder_clean_bjgd','mk_workorder_clean_wc','mk_workorder_clean_qxgd');
                }
                if(record.status==3&&this.isAcceptance==1){
                    markArr.push('mk_workorder_clean_ysgd');
                }
                if((record.status==3||record.status==4)&&record.showAppraisalButton==1&&record.isAppraisal==0){
                    markArr.push('mk_workorder_clean_pjgd');
                }
                if(record.status==5) {
                    markArr.push('mk_workorder_clean_scgd');
                }
                if(!record.houseId){
                    markArr.push('mk_workorder_clean_glfy');
                }
                JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                    if (markArr.includes(value.mark)){
                        flag = true
                    }
                })
                return flag
            },
            initData(){
                this.getIsAcceptance();
                this.getData();
            },
            getIsAcceptance(){
                API.cleanIsAcceptance().then(res => {
                    if (res.code === '200') {
                        this.isAcceptance = res.data;
                        if(this.isAcceptance == 0){
                            this.statusData = [
                                {
                                    title: '全部',
                                    status: 0,
                                    string: 'total',
                                    query: null,
                                    color: '#0A87F8'
                                },
                                {
                                    title: '待处理',
                                    status: 0,
                                    string: 'pending',
                                    query: 1,
                                    color: '#FB4246'
                                },
                                {
                                    title: '处理中',
                                    status: 0,
                                    string: 'processing',
                                    query: 2,
                                    color: '#03C683'
                                },
                                {
                                    title: '已完成',
                                    status: 0,
                                    string: 'completed',
                                    query: 4,
                                    color: '#0A87F8'
                                },
                                {
                                    title: '已取消',
                                    status: 0,
                                    string: 'cancel',
                                    query: 5,
                                    color: '#666666'
                                }
                            ];
                        }
                        else if(this.isAcceptance == 1){
                            this.statusData = [
                                {
                                    title: '全部',
                                    status: 0,
                                    string: 'total',
                                    query: null,
                                    color: '#0A87F8'
                                },
                                {
                                    title: '待处理',
                                    status: 0,
                                    string: 'pending',
                                    query: 1,
                                    color: '#FB4246'
                                },
                                {
                                    title: '处理中',
                                    status: 0,
                                    string: 'processing',
                                    query: 2,
                                    color: '#03C683'
                                },
                                {
                                    title: '待验收',
                                    status: 0,
                                    string: 'acceptance',
                                    query: 3,
                                    color: '#FFA036'
                                },
                                {
                                    title: '已完成',
                                    status: 0,
                                    string: 'completed',
                                    query: 4,
                                    color: '#0A87F8'
                                },
                                {
                                    title: '已取消',
                                    status: 0,
                                    string: 'cancel',
                                    query: 5,
                                    color: '#666666'
                                }
                            ];
                        }
                        this.getStatusCount();
                    }
                })
            },
            refreshPageOnlyCancel(){
                this.addCleanDialog = false;
                this.associatedDialog = false;
                this.cancelCleanDialog = false;
                this.assignmentDialog = false;
                this.completeDialog = false;
                this.rateDialog = false;
                this.checkDialog = false;
                this.detailDialog = false;
                this.infoData = {};
                this.cleanId = '';
            },
            refreshPage(){
                this.addCleanDialog = false;
                this.associatedDialog = false;
                this.cancelCleanDialog = false;
                this.assignmentDialog = false;
                this.completeDialog = false;
                this.rateDialog = false;
                this.checkDialog = false;
                this.detailDialog = false;
                this.infoData = {};
                this.cleanId = '';
                this.initData();
            },
            //关联房源
            associated(record) {
                this.infoData = record;
                this.associatedDialog = true;
            },
            getStatusCount() {
                API.cleanStatusStat(this.sendData).then(res => {
                    // console.log(res)
                    if (res.code === '200') {
                        let total = 0;
                        let conut = res.data;
                        for (let item of this.statusData) {
                            item.status = conut[item.string];
                            if (item.query) {
                                total += item.status;
                            }
                        }
                        this.statusData[0].status = total;
                    }
                })
            },
            getData() {
                this.spinLoading = true;
                API.cleanList(this.sendData).then(res => {
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
            addClean(){
                this.cleanId = '';
                this.addCleanTitle = '添加保洁';
                this.addCleanDialog = true;
            },
            editClean(record){
                this.cleanId = record.id;
                this.addCleanTitle = '修改工单信息';
                this.addCleanDialog = true;
            },
            completeClean(record){
                this.cleanId = record.id;
                this.deptId = record.deptId;
                this.completeDialog = true;
            },
            assignmentClean(record,val){
                this.cleanId = record.id;
                this.assignmentDialog = true;
                this.assignmentType = val;
                if(val == 1){
                    this.assignmentTitle = '派单';
                }
                else if(val == 2){
                    this.assignmentTitle = '改派';
                }
            },
            deleteChild(record) {
                let _this = this;
                let id = record.id
                this.$modal.confirm({
                    title: '确定要删除 「' + record.applyName + '/' + record.applyPhone + '」 保洁的工单信息吗？',
                    content: '删除后将不可恢复',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        API.cleanDelete(id).then(res => {
                            // console.log(res)
                            if (res.code == 200) {
                                _this.$message.success('删除成功！');
                            }else{
                                _this.$message.error('删除失败！');
                            }
                            setTimeout(() => {
                                _this.initData();
                            }, 500)
                        })
                    },
                    onCancel() {
                    },
                });
            },
            cancelClean(record){
                this.infoData = record;
                this.cancelCleanDialog = true;
            },
            rateClean(record){
                this.cleanId = record.id;
                this.rateDialog = true;
            },
            checkClean(record){
                this.cleanId = record.id;
                this.checkDialog = true;
            },
            changeStatus(option) {
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.sendData.status = option.query;
                this.getData();
            },
            openSearchDrawer() {
                //弹出搜索框
                this.searchVisible = true;
            },
            closeSearchDrawer() {
                //关闭搜索框
                this.searchVisible = false;
            },
            assetsFormData(data) {
                this.searchVisible = false;
                this.sendData.fuzzyQueryType = data.fuzzyQueryType;
                this.sendData.fuzzyKeyword = data.fuzzyKeyword;
                this.sendData.deptId = data.deptId;
                this.sendData.maintainerId = data.maintainerId;
                this.sendData.sourceType = data.sourceType;
                this.sendData.cleanType = data.cleanType;
                this.sendData.isAppraisal = data.isAppraisal;
                this.sendData.visitDateStart = data.visitDateStart;
                this.sendData.visitDateEnd = data.visitDateEnd;
                this.sendData.visitTime = data.visitTime;
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.initData();
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
            openDetail(record) {
                return {
                    on: {
                        click: () => {
                            this.cleanId = record.id;
                            this.detailDialog = true;
                        }
                    }
                }
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
                this.detailDialog = false;
                this.isRefresh = false
            },
        },
        filters: {
            visitTimeVal(val) {
                return val == 1 ? '9:00-13:00' : val == 2 ? '13:00-18:00' : val == 3 ? '18:00-22:00': '-';
            },
            cleanTypeVal(val) {
                return val == 1 ? '日常保洁' : val == 2 ? '深度保洁' : val == 3 ? '开荒保洁' : val == 4 ? '擦玻璃' : val == 5 ? '空调清理' : val == 6 ? '油烟机清洗' : val == 7 ? '冰箱清洗' : val == 8 ? '除螨清洁' : val == 9 ? '皮质家具护理' : val == 10 ? '其他': '-';
            },
            blankVal(val){
                if(!val){
                    return '-';
                }else{
                    return  val;
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .cleanBox {
        .content-top {
            min-width: 1300px; // overflow: hidden;
        }
        .content-main {
            padding: 0;
            & /deep/ .content {
                // overflow:visible;
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
                    background: rgba(255, 160, 54, 1);
                }
            }
            .fontProhibit {
                .prohibitBg1 {
                    background: #FB4246;
                }
                .prohibitBg2 {
                    background: #03C683;
                }
                .prohibitBg3 {
                    background: #FFA036;
                }
                .prohibitBg4 {
                    background: #0A87F8;
                }
                .prohibitBg5 {
                    background: #666666;
                }
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
            .tenant{
                width: 34px;
                height: 20px;
                line-height: 20px;
                border-radius: 2px;
                border: 1px solid #91D5FF;
                color: #1890ff;
                background-color: #E6F7FF;
                font-size: 12px;
                text-align: center;
                padding: 3px 5px;
            }
            .company{
                width: 34px;
                height: 20px;
                line-height: 20px;
                border-radius: 2px;
                border: 1px solid #ffe58f;
                color: #faad14;
                background-color: #fffbe6;
                font-size: 12px;
                text-align: center;
                padding: 3px 5px;
            }
            .houseAddress{
                height:20px;
                border-radius:2px;
                color: #0A87F8;
                background-color: #f0f8ff;
                font-size: 12px;
                text-align: center;
                padding: 5px 5px;
            }
            .time{
                min-width:55px;
                height:20px;
                border-radius:2px;
                border:1px solid rgba(10,135,248,1);
                color: #0A87F8;
                font-size: 12px;
                text-align: center;
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
        .font-span {
            width: 20px;
            display: inline-block;
            font-size: 20px;
        }
        .signType1 {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(10, 135, 248, 1);
            color: rgba(10, 135, 248, 1);
            border-radius: 50%;
            line-height: 18px;
            font-size: 12px;
            text-align: center;
            margin-top: 5px;
        }
        .signType2 {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(3, 198, 131, 1);
            color: rgba(3, 198, 131, 1);
            border-radius: 50%;
            line-height: 18px;
            font-size: 12px;
            text-align: center;
            margin-top: 5px;
        }
        .address-span {
            display: inline-block;
            max-width: 300px;
        }
        .isCertified-font {
            position: absolute;
            color: rgba(251, 66, 70, 0.5);
            z-index: 2;
            top: 5px;
            width: 27px;
            height: 24px;
            left: -18px; //         svg{
            //             height: 100%;
            //             width: 100%;
            //             use{
            // height: 100%;
            //             width: 100%;
            //             }
            //         }
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
</style>
