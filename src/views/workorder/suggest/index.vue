<template>
    <!-- 建议 -->
    <div class="suggestBox">
        <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
        <content-top>
            <div class="status-box f-fl">
                <top-status :activeIndex="statusActiveIndex" :statusData="statusData" @changeStatus="changeStatus"></top-status>
            </div>
            <div class="f-fr cursor exportExcel-box" v-mark="['mk_workorder_suggest_dc']"><span @click="exportExcel"><icon-font class="f-ftc-blue" type="iconyumengtubiao_xiazai1" /></span></div>
            <div class="search-box f-fr">
                <search-dialog resMark="mk_workorder_complaint" ref="searchDialog" placeholder="建议人姓名/建议人电话" :showCityTown="false" :showDeptEmp="false"  :showEmployee="false" :searchList="searchList" @search="assetsFormData"></search-dialog>
            </div>
        </content-top>
        <content-main>
            <skeleton-suggest v-show="spinLoading"></skeleton-suggest>
            <div class="table" v-show="!spinLoading">
                <a-table rowKey="id" :bordered="true" :customRow="openDetail" :pagination="false" :columns="tableColumns" :dataSource="tableData">
                <div slot="status" slot-scope="status">
                    <div v-if="status==1" class="fontProhibit fontProhibitColor">
                        <div class="prohibitBg1 IconRadius prohibitBg f-fl"></div>
                        <div>
                            <span>待处理</span>
                        </div>
                    </div>
                    <div v-else-if="status==2" class="fontProhibit fontProhibitColor">
                        <div class="prohibitBg2  IconRadius prohibitBg f-fl"></div>
                        <div>
                            <span>已处理</span>
                        </div>
                    </div>
                    <div v-else-if="status==3" class="fontProhibit fontProhibitColor">
                        <div class="prohibitBg3  IconRadius prohibitBg f-fl"></div>
                        <div>
                            <span>已作废</span>
                        </div>
                    </div>
                </div>
                <div slot="applyName" slot-scope="text,record">
                    <div>
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
                    {{$moment(record.visitDate).format('YYYY.MM.DD')}} {{record.visitTime|visitTimeVal}}
                </div>
                <div slot="createTime" slot-scope="createTime">
                    {{$moment(createTime).format('YYYY.MM.DD HH:mm')}}
                </div>
                <div slot="promotionDesc" slot-scope="text">
                    <a-popover>
                        <template slot="content">
                            <p style="max-width:800px;padding: 8px 18px;">
                                <span style="margin-left: 2px">{{text}}</span>
                            </p>
                        </template>
                        <div class="f-fl" style="max-width: 400px;position: relative;" type="primary">
                            <p class="overHidde" style="xline-height:22px;">
                                <span style="margin-left: 2px">{{text|blankVal}}</span>
                            </p>
                        </div>
                    </a-popover>
                </div>
                <div slot="action" slot-scope="text, record">
                    <a-popover :title="null" trigger="hover" v-if="checkOpts(record) == true">
                        <template slot="content">
                            <div v-if="record.status==1" @click.stop="operateSuggest(record,1)" class="action cursor" v-mark="['mk_workorder_suggest_cl']">处理</div>
                            <div v-if="record.status==1" @click.stop="operateSuggest(record,2)" class="action cursor" v-mark="['mk_workorder_suggest_zf']">作废</div>
                            <div v-if="record.status==3" @click.stop="deleteChild(record)" class="action cursor" v-mark="['mk_workorder_suggest_sc']">删除</div>
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
        <!-- 处理建议 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="checkDialog" class="ownModalBorder titDialog" :title="checkDialogTitle" @cancel="cancelCheck">
            <check-suggest :suggestId="suggestId" :operateTypeReg="operateType" @successCheck="successCheck" @cancelCheck="cancelCheck"></check-suggest>
        </a-modal>
        <!-- 建议详情 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="detailDialog" class="ownModalBorder titDialog" title="建议详情" @cancel="isRefreshFun">
            <suggest-detail @refreshinfoFun="refreshinfoFun" :suggestId="suggestId" @deleteDetails="deleteDetails"></suggest-detail>
        </a-modal>
        <!-- 导出框-->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="exportExcelShow" class="ownModalBorder titDialog" title="导出提示">
          <exportExcel @close="exportExcelShow=false" :exportData="exportData" :exportUrl='exportUrl'></exportExcel>
        </a-modal>
    </div>
</template>

<script>
    import TopStatus from '@/components/TopStatus/index';
    import SearchDialog from '@/components/SearchDialog';
    import  CheckSuggest from './check';
    import  SuggestDetail from './details';
    import  SkeletonSuggest from '../../skeleton/workorder/suggest';
    import  * as API from '@/api/workorder';
    import exportExcel from '@/components/exportExcel/index';

    export default {
        name: "complaint",
        components: {
            TopStatus,
            SearchDialog,
            CheckSuggest,
            SuggestDetail,
            SkeletonSuggest,
            exportExcel,
        },
        data() {
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
                                label: '建议人姓名',
                                value: 1
                            },
                            {
                                label: '建议人电话',
                                value: 2
                            },
                        ],
                    },
                    {
                        key: 'suggestType',
                        title: '建议类型',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '产品设计',
                                value: 1
                            },
                            {
                                label: '家具/家电配套',
                                value: 2
                            },
                            {
                                label: '管家服务',
                                value: 3
                            },
                            {
                                label: '维修/保洁服务',
                                value: 4
                            },
                            {
                                label: '系统相关',
                                value: 5
                            },
                            {
                                label: '其他',
                                value: 6
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
                        width: '10%',
                    },
                    {
                        title: '建议人',
                        dataIndex: 'applyName',
                        key: 'applyName',
                        scopedSlots: { customRender: 'applyName' },
                        align: 'left',
                        width: '16%',
                    },
                    {
                        title: '建议类型',
                        key: 'suggestTypeName',
                        dataIndex: 'suggestTypeName',
                        align: 'left',
                        width: '15%',
                    },
                    {
                        title: '建议内容',
                        key: 'promotionDesc',
                        dataIndex: 'promotionDesc',
                        scopedSlots: { customRender: 'promotionDesc' },
                        align: 'left',
                        width: '35%',
                    },
                    {
                        title: '提交时间',
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
                        title: '已处理',
                        status: 0,
                        string: 'processed',
                        query: 2,
                        color: '#0A87F8'
                    },
                    {
                        title: '已作废',
                        status: 0,
                        string: 'obsolete',
                        query: 3,
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
                    status:'',                      //投诉状态【1、待处理，2、处理中，3、待验收，4、处理完成，5、已取消】
                    deptId:'',                      //部门
                    maintainerId:'',                 //人员
                    suggestType:'',               //投诉类型
                },
                statusActiveIndex:0,
                suggestId:'',
                operateType:1,          //1、处理；2、作废
                checkDialog:false,
                checkDialogTitle:'处理',
                searchVisible: false,
                detailDialog:false,
                infoData:{},
                spinLoading:true,
                isRefresh:false,
                exportUrl: '/workorder/suggest/list_export',
                exportData:{},
                exportExcelShow:false,
            }
        },
        created() {
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
                    markArr.push('mk_workorder_suggest_cl','mk_workorder_suggest_zf');
                }
                if(record.status==3){
                    markArr.push('mk_workorder_suggest_sc');
                }
                JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                    if (markArr.includes(value.mark)){
                        flag = true
                    }
                })
                return flag
            },
            cancelCheck(){
                this.checkDialog = false;
            },
            successCheck(){
                this.checkDialog = false;
                this.infoData = {};
                this.suggestId = '';
                this.initData();
            },
            deleteDetails(){
                this.detailDialog = false;
                this.infoData = {};
                this.suggestId = '';
                this.initData();
            },
            getStatusCount() {
                API.suggestStatusStat(this.sendData).then(res => {
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
            suggestStatusStat(){
                API.suggestStatusStat(this.sendData).then(res => {
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
                });
            },
            initData(){
                this.getStatusCount();
                this.suggestList();
            },
            suggestList() {
                this.spinLoading = true;
                API.suggestList(this.sendData).then(res => {
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
            operateSuggest(record,val){
                if(val==1){
                    this.checkDialogTitle = '处理';
                }
                if(val == 2){
                    this.checkDialogTitle = '作废';
                }
                this.suggestId = record.id;
                this.operateType = val;
                this.checkDialog = true;
            },
            deleteChild(record) {
                let _this = this;
                let id = record.id
                this.$modal.confirm({
                    title: '确定要删除 「' + record.applyName + '/' + record.applyPhone + '」 提交的建议信息吗？',
                    content: '删除后将不可恢复',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        API.suggestRemove(id).then(res => {
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
            changeStatus(option) {
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.sendData.status = option.query;
                this.suggestList();
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
                this.sendData.suggestType = data.suggestType;
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.initData();
            },
            onSizeChange(current) {
                this.sendData.current = current;
                this.suggestList();
            },
            onShowSizeChange(current, pageSize) {
                this.sendData.current = current;
                this.sendData.size = pageSize;
                this.pagination.pageSize = pageSize;
                this.suggestList();
            },
            openDetail(record) {
                return {
                    on: {
                        click: () => {
                            this.suggestId = record.id;
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
    .suggestBox {
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
                    background: #0A87F8;
                }
                .prohibitBg3 {
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
                padding: 0;
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
</style>
