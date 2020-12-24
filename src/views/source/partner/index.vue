<template>
    <!-- 合作公司 -->
    <div class="partnerBox">
        <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
        <div class="add-btn-wrap" @click="addPartner(true)">
            <icon-font type="iconyumengtubiao_tianjia" />添加合作公司
        </div>
        <content-top>
            <div class="status-box f-fl">
                <top-status :statusData="statusData" @changeStatus="changeStatus"></top-status>
            </div>
            <div class="search-box f-fr">
                <search-dialog placeholder="公司名称" :showDeptEmp="false" :showEmployee="false" :showCityTown="false" :searchList="searchList" @search="assetsFormData"></search-dialog>
            </div>
        </content-top>
        <content-main>
            <skeleton-partner v-show="spinLoading"></skeleton-partner>
            <div class="table" v-show="!spinLoading">
                <a-table rowKey="id" :bordered="true" :customRow="openDetail" :pagination="false" :columns="tableColumns" :dataSource="tableData">
                    <div slot="isCooperation" slot-scope="text">
                        <div v-if="text==1" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg1 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>合作中</span>
                            </div>
                        </div>
                        <div v-if="text==0" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg2 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>终止合作</span>
                            </div>
                        </div>
                    </div>
                    <div slot="partnerBizMode" slot-scope="text">
                        {{text|blankVal}}
                    </div>
                    <div slot="createTime" slot-scope="text">
                        {{$moment(text).format('YYYY.MM.DD HH:mm')}}
                    </div>
                    <div slot="action" slot-scope="text, record">
                        <a-popover :title="null" trigger="hover ">
                            <template slot="content">
                                <div v-if="record.isCooperation==1" class="action cursor" @click.stop="cooperationChange(record.id,0,record.partnerName)">终止合作</div>
                                <div v-if="record.isCooperation==0" class="action cursor" @click.stop="cooperationChange(record.id,1,record.partnerName)">再次合作</div>
                            </template>
                            <div style="width: 100%;height: 100%">
                                <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
                            </div>
                        </a-popover>
                    </div>
                </a-table>
                <div class="contFoot" v-show="tableData.length>0">
                    <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
                </div>
            </div>
        </content-main>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="addPartnerDialog" class="ownModalBorder titDialog" title="添加合作公司">
            <add-partner @cancelAddPartner="cancelAddPartner"></add-partner>
        </a-modal>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="partnerDetailsDialog" class="ownModalBorder titDialog" title="合作公司详情">
            <partner-details :partnerData="partnerData" @cancelPartnerDetails="cancelPartnerDetails"></partner-details>
        </a-modal>
    </div>
</template>

<script>
    import SearchDialog from '@/components/SearchDialog';
    import TopStatus from '@/components/TopStatus/index';
    import AddPartner from './addPartner';
    import PartnerDetails from './partnerDetails';
    import SkeletonPartner from '../../skeleton/source/partner';
    import  * as API from '@/api/source';
    export default {
        name: "partner",
        components: {
            TopStatus,
            SearchDialog,
            AddPartner,
            PartnerDetails,
            SkeletonPartner,
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
                        ],
                    },
                    {
                        key: 'partnerBizMode',
                        title: '运营模式',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '合/整租',
                                value: '合/整租'
                            },
                            {
                                label: '独栋',
                                value: '独栋'
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
                        title: '合作状态',
                        dataIndex: 'isCooperation',
                        key: 'isCooperation',
                        align: 'left',
                        scopedSlots: { customRender: 'isCooperation' },
                    },
                    {
                        title: '公寓名称',
                        dataIndex: 'partnerName',
                        key: 'partnerName',
                        align: 'left',
                    },
                    {
                        title: '覆盖城市',
                        dataIndex: 'partnerBizCity',
                        key: 'partnerBizCity',
                        align: 'left',
                    },
                    {
                        title: '运营模式',
                        dataIndex: 'partnerBizMode',
                        key: 'partnerBizMode',
                        scopedSlots: { customRender: 'partnerBizMode' },
                        align: 'left',
                    },
                    {
                        title: '添加合作公司时间',
                        key: 'createTime',
                        dataIndex: 'createTime',
                        scopedSlots: { customRender: 'createTime' },
                        align: 'left',
                        width: '19%',
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
                    current: 1,
                    pageSize: 10,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
                statusData: [
                    {
                        title: '全部',
                        status: 0,
                        string: 'allTotal',
                        query: null,
                    },
                    {
                        title: '合作中',
                        status: 1,
                        string: 'coopIngTotal',
                        query: 1,
                        color: '#0A87F8'
                    },
                    {
                        title: '合作终止',
                        status: 2,
                        string: 'coopEndTotal',
                        query: 0,
                        color: '#777777'
                    },
                ],
                sendData: {
                    current: 1,                     // 当前页数
                    size: 10,                       // 每页返回的记录数量
                    fuzzyKeyword: '',               // 模糊匹配关键词
                    fuzzyQueryType: 0,              //模糊查询类型【0、全部，1、客户姓名，2、客户电话】
                    sort: '',                       // 排序字段
                    updateTime: '',                 // 修改时间
                    isCooperation:'',                //是否合作【1、是；0：否】
                    partnerBizMode:'',               //伙伴经营模式（1.分散(合/整租)；2.集中)
                },
                paraData: {},
                searchVisible:false,                //搜索框
                addPartnerDialog:false,             //是否显示添加框
                partnerDetailsDialog:false,         //是否显示详情
                partnerData:{
                    partnerId:'',                       //选中id
                    isCooperation:'',                   //合作状态
                    partnerName:'',                     //公寓名称
                    partnerBizMode:'',                  //运营模式
                    partnerBizCity:'',                  //运营城市
                    createTime:'',
                    creater:'',
                    updateTime:'',
                    updater:'',
                },                     //详情显示数据
                spinLoading:true,
            }
        },
        created() {
            this.initData();
        },
        methods: {
            initData() {
                this.resourcePartnerStat();
                this.resourcePartnerList();
            },
            resourcePartnerList(){
                this.spinLoading = true;
                API.resourcePartnerList(this.sendData).then(res => {
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
            resourcePartnerStat(){
                let parameter = Object.assign({}, this.sendData);
                parameter.isCooperation = null;
                API.resourcePartnerStat(parameter).then(res => {
                    if (res.code === '200') {
                        let resData = res.data;
                        for (let item of this.statusData) {
                            item.status = resData[item.string];
                        }
                    }
                })
            },
            addPartner(){
                this.addPartnerDialog = true;
            },
            cancelAddPartner(){
                this.addPartnerDialog = false;
                this.initData();
            },
            cancelPartnerDetails(){
                this.partnerDetailsDialog = false;
                this.initData();
            },
            changeStatus(option) {
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.sendData.isCooperation = option.query;
                this.sendData.current = 1;
                this.resourcePartnerList();
            },
            assetsFormData(data) {
                this.searchVisible = false;
                this.sendData.fuzzyQueryType = data.fuzzyQueryType;
                this.sendData.fuzzyKeyword = data.fuzzyKeyword;
                this.sendData.partnerBizMode = data.partnerBizMode;
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.initData();
            },
            openDetail(record) {
                return {
                    on: {
                        click: () => {
                            this.partnerDetailsDialog = true;
                            this.partnerData = {
                                partnerId:record.id,                                    //选中id
                                isCooperation:record.isCooperation,                     //合作状态
                                partnerName:record.partnerName,                         //公寓名称
                                partnerBizMode:record.partnerBizMode,                   //运营模式
                                partnerBizCity:record.partnerBizCity,                   //运营城市
                                createTime:record.createTime,
                                creater:record.creater,
                                updateTime:record.updateTime,
                                updater:record.updater,
                            };
                        }
                    }
                }
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
            cooperationChange(id,status,name){
                let title = '';
                let content='';
                let afterContent=''
                if(status == 1){
                    title = '确定要再次和「'+name+'」的合作吗？';
                    content = '再次合作，不清空原先已经合作过的数据';
                    afterContent='再次合作';
                }
                else if(status == 0){
                    title = '确定要终止和「'+name+'」的合作关系吗？';
                    content = '终止后，您的资源将不可再共享给该公寓';
                    afterContent='终止合作';
                }
                let _this = this;
                this.$modal.confirm({
                    title: title,
                    content: content,
                    width:"433px",
                    height:"192px",
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                        API.cooperationChange(id,status).then(res=>{
                            if (res.code === '200') {
                                _this.$message.success(afterContent+'成功');
                                _this.initData();
                            } else {
                                _this.$message.success(afterContent+'失败');
                                _this.initData();
                            }
                        })
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                });
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
    .partnerBox {
        .content-top {
            min-width: 1300px;
        }
        .content-main {
            padding: 0;
            & /deep/ .content {
                padding: 0;
                margin: 20px;
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
                    background: #0A87F8;
                }
                .prohibitBg2 {
                    background: #777777;
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
            .urgencyLevel1{
                width:36px;
                height:20px;
                border-radius:2px;
                border:1px solid rgba(251,66,70,1);
                color: #FB4246;
                font-size: 12px;
                text-align: center;
            }
            .urgencyLevel2{
                width:36px;
                height:20px;
                border-radius:2px;
                border:1px solid rgba(255,160,54,1);
                color: #FFA036;
                font-size: 12px;
                text-align: center;
            }
            .urgencyLevel3{
                width:36px;
                height:20px;
                border-radius:2px;
                border:1px solid rgba(3,198,131,1);
                color: #03C683;
                font-size: 12px;
                text-align: center;
            }
            .urgencyLevel4{
                width:36px;
                height:20px;
                border-radius:2px;
                border:1px solid rgba(10,135,248,1);
                color: #0A87F8;
                font-size: 12px;
                text-align: center;
            }
            .time{
                width:55px;
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
            margin-right: 20px;
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
            left: -18px;
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