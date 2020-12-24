<template>
    <div class="transfer-box">
        <div class="add-btn-wrap" style="width: 132px;" @click="addTransferInfo" v-mark="['mk_set_config_skzhpz_tj']">
            <icon-font type="iconyumengtubiao_tianjia" />配置账号
        </div>
        <div class="tansfer-table" v-show="!spinLoading">
            <a-table rowKey="id" :customRow="openDetail" :bordered="true" :pagination="false" :columns="tableColumns" :dataSource="tableData">
                <div slot="isEnable" slot-scope="text">
                    <div class="IconRadius f-fl" :class="text==1?'approved':'reject'"></div>
                    <div>
                        <span class="auditStatusNameFont">{{text==1?'启用':'禁用'}}</span>
                    </div>
                </div>
                <div slot="alipay" slot-scope="text,record">
                    {{record.alipay==null?'-':record.alipay.name+'-'+record.alipay.account}}
                </div>
                <div slot="wxpay" slot-scope="text,record">
                    {{record.wxpay==null?'-':record.wxpay.name+'-'+record.wxpay.account}}
                </div>
                <div slot="unionpay" slot-scope="text,record">
                    {{record.unionpay?record.unionpay.accountName+'-'+record.unionpay.cardNo:'-'}}
                </div>
                <div slot="walletAccountAlias" slot-scope="text,record">
                    {{record.onlinePay&&record.onlinePay.walletAccountAlias?record.onlinePay.walletAccountAlias:'-'}}
                </div>
                <div slot="renterBearHandlingFeePercent" slot-scope="text,record">
                    {{record.onlinePay&&record.onlinePay.renterBearHandlingFeePercent?'租客承担'+record.onlinePay.renterBearHandlingFeePercent+'%，剩余部分由公寓承担':record.onlinePay&&record.onlinePay.renterBearHandlingFeePercent==0?'公寓承担100%':'-'}}
                </div>
              <div slot="isAllocationSet" slot-scope="text">
                {{text==1?'已设置':'未设置'}}
              </div>
                <div slot="action" slot-scope="text, record">
                    <a-popover :title="null" trigger="hover" v-if="checkOpts(record) == true">
                        <template slot="content">
                            <div @click.stop="openCollectionAccountDialog(record)" class="action cursor" v-mark="['mk_set_config_skzhpz_fzsz']">分账设置</div>
                            <div v-if="record.isEnable==0" @click.stop="enable(record)" class="action cursor"  v-mark="['mk_set_config_skzhpz_jy']">启用</div>
                            <div v-if="record.isEnable==1" @click.stop="disable(record)" class="action cursor" v-mark="['mk_set_config_skzhpz_qy']">禁用</div>
                            <div @click.stop="deleteTransfer(record)" class="action cursor" v-mark="['mk_set_config_skzhpz_sc']">删除</div>
                        </template>
                        <div style="width: 100%;height: 100%">
                            <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
                        </div>
                    </a-popover>
                </div>
            </a-table>
            <div class="contFoot" v-show="tableData.length>0" style="padding-right: 20px;">
                <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
            </div>
        </div>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" v-model="addTransferDialog" class="ownModalBorder titDialog" title="收款账号配置" @cancel="addTransferDialog=false">
            <add-transfer @cancelSave="addTransferDialog=false" @successSave="successSave"></add-transfer>
        </a-modal>
        <!-- 账号详情 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="账号详情" width="1000px" v-model="transferDetailsDialog" class="ownModalBorder titDialog" @cancel="isRefreshFun">
            <transfer-details @refreshinfoFun="refreshinfoFun" :id="id" @successDelete="successDelete"></transfer-details>
        </a-modal>
        <!-- 分账设置 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" :title="collectionAccountTitle" width="800px" v-model="collectionAccountDialog" class="ownModalBorder titDialog" @cancel="collectionAccountDialog=false">
            <collection-account :id="id" :walletAccountId="walletAccountId" :collectionAccountDept="collectionAccountDept" @cancelSave="cancelSaveCollectionAccount"  @saveSuccess="saveSuccessCollectionAccount"></collection-account>
        </a-modal>
    </div>
</template>

<script>
    import * as API from '@/api/setConfig';
    import AddTransfer from './addTransfer';
    import TransferDetails  from './transferDetails';
    import CollectionAccount from './collectionAccount';

    export default {
        name: "transfer",
        components: {
            AddTransfer,
            TransferDetails,
            CollectionAccount,
        },
        data(){
            return {
                sendData:{
                    current: 1,                     // 当前页数
                    size: 10,                       // 每页返回的记录数量
                    fuzzyQueryType:'',
                    fuzzyKeyword:'',
                    deptId:'',
                    isEnable:'',
                },
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
                        dataIndex: 'isEnable',
                        key: 'isEnable',
                        align: 'left',
                        scopedSlots: { customRender: 'isEnable' },
                        width: '70px',
                    },
                    {
                        title: '门店',
                        dataIndex: 'deptName',
                        key: 'deptName',
                        scopedSlots: { customRender: 'deptName' },
                        align: 'left',
                        width: '100px'
                    },
                    {
                        title: '线下转账收款账号',
                        children: [
                            {
                                title: '支付宝',
                                dataIndex: 'alipay',
                                key: 'alipay',
                                scopedSlots: { customRender: 'alipay' },
                            },
                            {
                                title: '微信',
                                dataIndex: 'wxpay',
                                key: 'wxpay',
                                scopedSlots: { customRender: 'wxpay' },
                            },
                            {
                                title: '银行卡',
                                dataIndex: 'unionpay',
                                key: 'unionpay',
                                scopedSlots: { customRender: 'unionpay' },
                            },
                        ]
                    },
                    {
                        title: '线上收款账号',
                        children: [
                            {
                                title: '钱包账号',
                                dataIndex: 'walletAccountAlias',
                                key: 'walletAccountAlias',
                                scopedSlots: { customRender: 'walletAccountAlias' },
                                width:'200px'
                            },
                            {
                                title: '手续费承担',
                                dataIndex: 'renterBearHandlingFeePercent',
                                key: 'renterBearHandlingFeePercent',
                                scopedSlots: { customRender: 'renterBearHandlingFeePercent' },
                                width:'250px'
                            },
                            {
                                title: '分账设置',
                                dataIndex: 'isAllocationSet',
                                key: 'isAllocationSet',
                              scopedSlots: { customRender: 'isAllocationSet' },
                                width:'75px'
                            },
                        ]
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
                tableData:[],
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
                id:'',
                transferDetailsDialog:false,
                spinLoading:true,
                isRefresh:false,
                addTransferDialog:false,
                collectionAccountDialog:false,
                collectionAccountTitle:'',
              collectionAccountDept:'',
              walletAccountId:'',     //分账配置用的（当前钱包）
            }
        },
        created() {
            this.initData();
        },
        methods: {
          cancelSaveCollectionAccount(res){
            this.collectionAccountDialog = false;
            if(res){
              this.initData();
            }
          },
            saveSuccessCollectionAccount(){
                this.collectionAccountDialog = false;
                this.initData();
            },
            openCollectionAccountDialog(data){
                if(data.onlinePay&&data.onlinePay.walletAccountId){
                  this.walletAccountId = data.onlinePay.walletAccountId;
                }
                else{
                  this.walletAccountId = '';
                }
                if(!this.walletAccountId){
                  this.$message.warning('请配置线上钱包账户，再进行分账设置');
                  return ;
                }
              this.id = data.id;
                this.collectionAccountDialog = true;
                this.collectionAccountTitle = "'"+data.deptName+"'设置分账";
                this.collectionAccountDept = data.deptName;
            },
            enable(data){
                let _this = this;
                let id = data.id;
                this.$modal.confirm({
                    title: '确定要启用 「' + data.deptName + '」 的收款账号吗？',
                    content: '启用后，本部门的租客在线上转账时会直接转入本门店设置的账号内',
                    okText: '确定',
                    cancelText: '取消',
                    icon: () => <icon-font type="iconyumengtubiao_chenggong" style="color:green" />,
                    onOk() {
                        API.collectionAccountEnableDisable(id,1).then(res => {
                            // console.log(res)
                            if (res.code == 200) {
                                _this.$message.success('操作成功！');
                                setTimeout(() => {
                                    _this.initData();
                                }, 500)

                            }
                        })
                    },
                    onCancel() {
                    },
                });
            },
            disable(data){
                    let _this = this;
                    let id = data.id;
                    this.$modal.confirm({
                        title: '确定要禁用 「' + data.deptName + '」 的收款账号吗？',
                        content: '禁用后，本部门的租客在线上转账时将直接转入上级门店的收款账号内',
                        okText: '确定',
                        cancelText: '取消',
                        onOk() {
                            API.collectionAccountEnableDisable(id,0).then(res => {
                                // console.log(res)
                                if (res.code == 200) {
                                    _this.$message.success('操作成功！');
                                    setTimeout(() => {
                                        _this.initData();
                                    }, 500)

                                }
                            })
                        },
                        onCancel() {
                        },
                    });
            },
            deleteTransfer(data){
                let _this = this;
                let id = data.id;
                this.$modal.confirm({
                    title: '确定要删除 「' + data.deptName + '」 的收款账号吗？',
                    content: '删除后，本部门的租客在线上转账时将直接转入上级门店的收款账号内',
                    okText: '确定',
                    cancelText: '取消',
                    icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
                    onOk() {
                    API.collectionAccountRemove(id).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            _this.$message.success('操作成功！');
                            setTimeout(() => {
                                _this.initData();
                            }, 500)

                        }
                    })
                },
                onCancel() {
                },
            });
            },
            checkOpts(record){
                let markArr = []
                let flag = false;
                if (record.isEnable==1) {
                    markArr.push('mk_set_config_skzhpz_fzsz','mk_set_config_skzhpz_jy','mk_set_config_skzhpz_sc');
                }
                if(record.isEnable==0) {
                    markArr.push('mk_set_config_skzhpz_fzsz','mk_set_config_skzhpz_qy','mk_set_config_skzhpz_sc');
                }
                JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                    if (markArr.includes(value.mark)){
                        flag = true
                    }
                })
                return flag
            },
            addTransferInfo(){
                this.addTransferDialog = true;
            },
            refreshinfoFun(res){  //详情有改变的操作  就改变状态
                if(res){
                    this.isRefresh = res
                }
            },
            successSave(){
                this.addTransferDialog = false;
                this.initData();
            },
            successDelete(){
                this.transferDetailsDialog = false;
                this.initData();
            },
            isRefreshFun(){      //根据详情有改变数据的操作 需要刷新
                if(this.isRefresh){
                    this.initData();
                }
                this.transferDetailsDialog = false;
                this.isRefresh = false
            },
            initData() {
                this.spinLoading = true;
                API.collectionAccountList(this.sendData).then(res => {
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
            assetsFormData(data) {
                if(data.fuzzyQueryType) {
                    this.sendData.fuzzyQueryType = data.fuzzyQueryType;
                } else{
                    this.sendData.fuzzyQueryType = 0;
                }
                this.sendData.fuzzyKeyword = data.fuzzyKeyword;
                this.sendData.deptId = data.deptId;
                this.sendData.isEnable = data.isEnable;
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.initData();
            },
            openDetail(record) {
                return {
                    on: {
                        click: () => {
                            this.id = record.id;
                            this.transferDetailsDialog = true;
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
        }
    }
</script>

<style lang="less" scoped>
.transfer-box {
    padding: 10px;
    .search{

    }
    .tansfer-table {
        .IconRadius {
            margin-top: 8px;
            margin-right: 5px;
            width: 6px;
            height: 6px;
            border-radius: 4px;
        }
        .approved {
            background-color:#0A87F8;
        }
        .reject {
            background-color: #777777;
        }
        .auditStatusNameFont{
            color: #5A5A5A;
            font-size: 14px;
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