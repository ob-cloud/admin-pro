<template>
    <div class="myCc-box">
        <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
        <content-top>
            <div class="status-box f-fl">
                <div class="status">
                    <p :class="{ active: currentActiveIndex === index }" :key="index" v-for="(item,index) in statusData" @click="changeStatus(item,index)">
                        <span>{{ item.title }}</span>
                        <span v-if="item.status && item.status === 2" :style="{ color: item.color }">({{ notViewTotal }})</span>
                    </p>
                </div>
            </div>
            <div class="search-box f-fr">
                <search-dialog placeholder="标题/内容" deptTitle="部门/人员" :showDeptEmp="true" :showEmployee="true" :showCityTown="false" :searchList="searchList" @search="assetsFormData"></search-dialog>
            </div>
        </content-top>
        <content-main>
            <skeleton-my-done v-show="spinLoading"></skeleton-my-done>
            <div class="table" v-show="!spinLoading">
                <a-table rowKey="auditInstanceCcId" :bordered="true" :customRow="openDetail" :pagination="false" :columns="tableColumns" :dataSource="tableData">
                    <div slot="bizStatus" slot-scope="text,record">
                        <div class="bizStatusStyle clearfix">
                            <div class=" IconRadius todoBg f-fl" v-if="record.isViewed==0"></div>
                            <div class=" IconRadius passBg f-fl" v-if="record.isViewed==1"></div>
                            <div class="overHidde f-fl" :style="record.isViewed==0?'max-width:90px;':'max-width:120px;'">
                                <span v-if="text==1">{{record.auditProcess}}</span>
                                <span v-if="text==9">审批通过</span>
                                <span v-if="text==5">审批驳回</span>
                                <span v-if="text==6">已撤销</span>
                            </div>
                            <div class="unreadStyle f-fr" v-if="record.isViewed==0">
                                未读
                            </div>
                        </div>
                    </div>
                    <div slot="myTitle" slot-scope="text">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    {{text}}
                                </p>
                            </template>
                            <div style="position: relative;max-width: 300px;" type="primary">
                                <p class="overHidde" style="line-height:22px;">
                                    {{text}}
                                </p>
                            </div>
                        </a-popover>
                    </div>
                    <div slot="content" slot-scope="text">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    {{text}}
                                </p>
                            </template>
                            <div style="position: relative;" :style="'max-width:'+screenWidth*0.47+'px;'" type="primary">
                                <p class="overHidde" style="line-height:22px;">
                                    {{text}}
                                </p>
                            </div>
                        </a-popover>
                    </div>
                </a-table>
                <div class="contFoot" v-show="tableData.length>0">
                    <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
                </div>
            </div>
        </content-main>
        <!-- 租客合同详情 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="tenantDetailsFlag" class="ownModalBorder titDialog" :title="detailsTitle" @cancel="isRefreshFun">
            <tenant-details :bizId="bizId" :bizScene="bizScene" :fromType="fromType" :isViewed="isViewed" @refreshinfoFun="refreshinfoFun" :auditInstanceId="auditInstanceId" :isCcInstanceView="isCcInstanceView" :auditEmpNameList="auditEmpNameList"></tenant-details>
        </a-modal>
        <!-- 业主合同详情 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="ownerDetailsFlag" class="ownModalBorder titDialog" :title="detailsTitle" @cancel="isRefreshFun">
            <owner-details :bizId="bizId" :fromType="fromType" :isViewed="isViewed" @refreshinfoFun="refreshinfoFun" :auditInstanceId="auditInstanceId" :isCcInstanceView="isCcInstanceView" :auditEmpNameList="auditEmpNameList"></owner-details>
        </a-modal>
        <!-- 账单流水详情 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="billWaterDetailsFlag" class="ownModalBorder titDialog" :title="detailsTitle" @cancel="isRefreshFun">
            <bill-water-details :bizId="bizId" :fromType="fromType" :isViewed="isViewed" @refreshinfoFun="refreshinfoFun" :auditInstanceId="auditInstanceId" :isCcInstanceView="isCcInstanceView" :auditEmpNameList="auditEmpNameList"></bill-water-details>
        </a-modal>
        <!-- 账单详情 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="billDetailsFlag" class="ownModalBorder titDialog" :title="detailsTitle" @cancel="billDetailsFlag=false">
          <bill-details :bizId="bizId" :fromType="fromType" :isViewed="isViewed"  @refreshinfoFun="refreshinfoFun" :auditInstanceId="auditInstanceId" :auditEmpNameList="auditEmpNameList" :isCcInstanceView="isCcInstanceView"></bill-details>
        </a-modal>
    </div>
</template>

<script>
    import SearchDialog from '@/components/SearchDialog';
    import SkeletonMyDone from '../../skeleton/workflow/myDone';
    import TenantDetails from '../tenantDetails';
    import OwnerDetails from '../ownerDetails';
    import BillWaterDetails from '../billWaterDetails';
    import BillDetails from '../billDetails';
    import  * as API from '@/api/workflow';
    export default {
        name: "myTodo",
        components: {
            SearchDialog,
            SkeletonMyDone,
            TenantDetails,
            OwnerDetails,
            BillWaterDetails,
            BillDetails,
        },
        data() {
            return {
                spinLoading:true,
                statusData: [
                    {
                        title: '全部',
                        status: 1,
                    },
                    {
                        title: '未读',
                        status: 2,
                        color:'#FFA036',
                    },
                    {
                        title: '已读',
                        status: 3,
                    },
                ],
                currentActiveIndex:0,
                searchList: [
                    {
                        key: 'fuzzyQueryType',
                        list: [
                            {
                                label: '综合检索',
                                value: 0,
                            },
                            {
                                label: '标题',
                                value: 1,
                            },
                            {
                                label: '内容',
                                value: 2,
                            },
                        ],
                    },
                    {
                        key: 'status',
                        title: '审批状态',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '审批中',
                                value: 1
                            },
                            {
                                label: '审批完成',
                                value: 9
                            },
                            {
                                label: '已撤销',
                                value: 6
                            },
                            {
                                label: '已驳回',
                                value: 5
                            },
                        ],
                    },
                    {
                        key: 'bizScene',
                        title: '审批类型',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '租客签约(电子合同)',
                                value: 11
                            },
                            {
                                label: '租客签约(纸质合同)',
                                value: 12
                            },
                            {
                              label: '租客退租',
                              value: 13
                            },
                            {
                                label: '业主签约',
                                value: 21
                            },
                            {
                                label: '账务流水',
                                value: 31
                            },
                            {
                              label: '付款申请',
                              value: 32
                            },
                        ],
                    },
                ],
                sendData: {
                    current: 1,                     // 当前页数
                    size: 20,                       // 每页返回的记录数量
                    fuzzyKeyword: '',               // 模糊匹配关键词
                    fuzzyQueryType: 0,              //模糊查询类型【0、全部，1、客户姓名，2、客户电话】
                    deptId:'',                //部门
                    submitterId:'',           //人员
                    bizScene:'',               //审批模块
                    status:'',
                    isViewed:'',
                },
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 20,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["20", "30", "40", "50"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
                auditInstanceId:'',
                bizId:'',
              bizScene:11,
                auditInstanceCcId:'',
                tableColumns:[
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
                        title: '审批状态',
                        dataIndex: 'bizStatus',
                        key: 'bizStatus',
                        scopedSlots: { customRender: 'bizStatus' },
                        align: 'left',
                        width:'12%',
                    },
                    {
                        title: '审批类型',
                        dataIndex: 'bizSceneName',
                        key: 'bizSceneName',
                        align: 'left',
                        width:'11%',
                    },
                    {
                        title: '标题',
                        dataIndex: 'title',
                        key: 'title',
                        scopedSlots: { customRender: 'myTitle' },
                        align: 'left',
                        width:'21%',
                    },
                    {
                        title: '内容',
                        key: 'content',
                        dataIndex: 'content',
                        scopedSlots: { customRender: 'content' },
                        align: 'left',
                    },
                ],
                tableData:[],
                notViewTotal:0,
                tenantDetailsFlag:false,
                detailsTitle:'审核详情',
                ownerDetailsFlag:false,
                billWaterDetailsFlag:false,
                fromType:4,
                isCcInstanceView:1,
                auditEmpNameList:[],
                isViewed:1,
                isRefresh:false,
                screenWidth: document.body.clientWidth,     // 屏幕宽
                billDetailsFlag:false,
            }
        },
        created() {
            switch (this.$route.params.search) {
              case 'unDo':
                this.currentActiveIndex = 1;
                this.sendData.isViewed = 0;
                break;
            }
            this.initData();
        },
        methods: {
            refreshinfoFun(res){  //详情有改变的操作  就改变状态
                if(res){
                    this.isRefresh = res
                }
            },
            initData(){
                this.ccMeDataStat();
                this.listCcMeInstance();
            },
            isRefreshFun() {
                this.tenantDetailsFlag = false;
                this.ownerDetailsFlag = false;
                this.billWaterDetailsFlag = false;
                this.billDetailsFlag = false;
                if(this.isRefresh){
                    this.initData();
                }
            },
            ccMeDataStat(){
                API.ccMeDataStat(this.sendData).then(res => {
                    if (res&&res.code === "200") {
                        this.notViewTotal = res.data.notViewTotal;
                    }
                });
            },
            listCcMeInstance() {
                this.spinLoading = true;
                API.listCcMeInstance(this.sendData).then(res => {
                    if (res&&res.code === "200") {
                        this.tableData = res.data.records;
                        this.tableData.forEach(function(element, index) {
                            element.num = index + 1;
                        }, this);
                        this.pagination.total = res.data.total;
                        this.statusData[0].status = res.data.total;
                    }
                    this.spinLoading = false;
                })
            },
            changeStatus(option,index){
                if(option.title == '全部'){
                    this.sendData.isViewed = undefined;
                } else if(option.title == '未读'){
                    this.sendData.isViewed = 0;
                } else if(option.title == '已读'){
                    this.sendData.isViewed = 1;
                }
                this.currentActiveIndex = index;
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.listCcMeInstance();
            },
            assetsFormData(data) {
                this.searchVisible = false;
                this.sendData.fuzzyQueryType = data.fuzzyQueryType;
                this.sendData.fuzzyKeyword = data.fuzzyKeyword;
                this.sendData.deptId = data.deptId;
                this.sendData.submitterId = data.maintainerId;
                this.sendData.bizScene = data.bizScene;
                this.sendData.status = data.status;
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.initData();
            },
            openDetail(record) {
                return {
                    on: {
                        click: () => {
                            if(record.bizScene == 11||record.bizScene == 12||record.bizScene == 13) {
                                this.tenantDetailsFlag = true;
                                this.bizScene = record.bizScene;
                                if(record.bizScene == 11){
                                  this.detailsTitle = '租客签约(电子合同)-审核详情';
                                }
                                else if(record.bizScene == 12){
                                  this.detailsTitle = '租客签约(纸质合同)-审核详情';
                                }
                                else if(record.bizScene == 13){
                                  this.detailsTitle = '租客退租-审核详情';
                                }
                            }
                            if(record.bizScene == 21) {
                                this.ownerDetailsFlag = true;
                                this.detailsTitle = '业主签约-审核详情';
                            }
                            if(record.bizScene == 31){
                                this.billWaterDetailsFlag = true;
                                this.detailsTitle = '账务流水-审核详情';
                            }
                            if(record.bizScene == 32){
                              this.billDetailsFlag = true;
                              this.detailsTitle = '付款申请-审核详情';
                            }
                            this.bizId = record.bizId;
                            this.auditInstanceId = record.auditInstanceId;
                            this.isViewed = record.isViewed
                        }
                    }
                }
            },
            onSizeChange(current) {
                this.sendData.current = current;
                this.listCcMeInstance();
            },
            onShowSizeChange(current, pageSize) {
                this.sendData.current = current;
                this.sendData.size = pageSize;
                this.pagination.pageSize = pageSize;
                this.listCcMeInstance();
            },
        },
    }
</script>

<style scoped lang="less">
    .myCc-box{
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
            min-width: 1200px;
            .bizStatusStyle {
                color: #111111;
                .IconRadius {
                    margin-top: 8px;
                    margin-right: 5px;
                    width: 6px;
                    height: 6px;
                    border-radius: 4px;
                }
                .todoBg{
                    background: #FFA036;
                }
                .backBg{
                    background: #777777;
                }
                .passBg{
                    background: #0A87F8;
                }
                .rejectBg{
                    background: #FB4246;
                }
                .unreadStyle{
                    width:32px;
                    border-radius:2px;
                    border:0.5px solid rgba(255,160,54,1);
                    color: rgba(255,160,54,1);
                    text-align: center;
                    font-size: 12px;
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
            & /deep/ .ant-popover {
                .ant-popover-inner-content {
                    padding: 0;
                    .action {
                        padding: 8px 16px;
                    }
                    .action:hover {
                        cursor: pointer;
                        background: rgba(10, 135, 248, 0.1);
                    }
                }
            }
        }
    }
    /deep/ .content-main .content{
        padding: 0;
    }
</style>