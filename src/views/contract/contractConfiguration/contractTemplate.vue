<template>
    <!-- 电子合同模板首页 -->
    <div class="temple-box">
        <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
        <skeleton-contract-configuration v-show="spinLoading"></skeleton-contract-configuration>
        <div class="table" v-show="!spinLoading">
            <a-table rowKey="id" :bordered="true" :customRow="openDetail" :pagination="false" :columns="tableColumns" :dataSource="tableData">
                <div slot="serialNumber" slot-scope="text,record,index">
                   {{index+1}}
                </div>
                <div slot="certInfo">
                    是否认证
                    <a-tooltip placement="top" title="认证后，该合同具备法律效应">
                        <a-icon type="exclamation-circle" style="color: #FFA036;" />
                    </a-tooltip>
                </div>
                <div slot="backupEmail" slot-scope="text">
                    {{text?text:'-'}}
                </div>
                <div slot="createTime" slot-scope="text">
                    {{text|formatTime}}
                </div>
                <div slot="status" slot-scope="text">
                    <div v-if="text==1" >
                        启用
                    </div>
                    <div v-if="text==2" >
                        禁用
                    </div>
                </div>
                <div slot="certPlatform" slot-scope="text,record">
                    <div v-if="text==0" >
                        <span style="color: #FB4246;">未认证</span>&nbsp;
                        <span style="color: #FB4246;">（</span>
                        <span style="color: #FFA036;">模板未认证，签约电子合同不具备法律效应</span>
                        <span style="color: #FB4246;">）</span>
                    </div>
                    <div v-if="text==1" >
                        <span style="color: #0A87F8;">已认证</span>&nbsp;
                        <span style="color: #777777;">（</span>
                        <span style="color: #777777;">认证主体：</span>
                        <span style="color: #777777;">{{record.certBody}}）</span>
                    </div>
                </div>
                <div slot="action" slot-scope="text, record">
                    <a-popover :title="null" trigger="hover">
                        <template slot="content">
                            <div v-if="record.certPlatform==0 && record.status==1" class="action cursor" @click="authentication(record)" style="text-align:center;">认证</div>
                            <div class="action cursor" @click="preview(record.id)" style="text-align:center;">预览</div>
                            <div class="action cursor" @click="edit(record.id)" style="text-align:center;">编辑</div>
                            <div class="action cursor" @click="copy(record.id)" style="text-align:center;">复制</div>
                            <div v-if="record.status==1" class="action cursor" @click="enableDisable(record.id,record.name,2)" style="text-align:center;">禁用</div>
                            <div v-if="record.status==2" class="action cursor" @click="enableDisable(record.id,record.name,1)" style="text-align:center;">启用</div>
                            <div class="action cursor" @click="remove(record.id,record.name)" style="text-align:center;">删除</div>
                        </template>
                        <div style="width: 100%;height: 100%">
                            <icon-font type="iconyumengtubiao_gengduo-" class="moreColor cursor"></icon-font>
                        </div>
                    </a-popover>
                </div>
            </a-table>
            <div class="contFoot" v-show="tableData.length>0">
                <!-- 分页 -->
                <a-pagination size="small" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
            </div>
        </div>
        <div>
            <add-template ref="addTemplateChild" v-show="addTemplateShow"></add-template>
            <a-modal title="模板预览" centered v-model="showPreview" class="ownModalBorder titDialog" style="overflow-y: hidden" width="1000px" :footer="null" :destroyOnClose="true" :maskClosable="false">
                <template-detail :templateTxt="appendEditorTxt"></template-detail>
            </a-modal>
            <a-modal title="模板认证" centered style="min-height: 600px" v-model="listVisible" class="ownModalBorder titDialog scroll"
                     :footer="null" :maskClosable="false"
                     width="1000px" :destroyOnClose="true">
                <authentication-list @closeListModal="closeListModal" @successAuthentication="successAuthentication" :templateId="templateId"></authentication-list>
            </a-modal>
            <!-- 其他子组件 -->
            <a-modal destroyOnClose centered title="认证" v-model="addAuthenticationVisible" class="ownModalBorder titDialog"
                     :footer="null" :maskClosable="false" width="800px">
                <add-authentication :authenticationId="''"  @closeCurrent="closeAddAuthentication" @cancelCloseCurrent="cancelCloseCurrent"
                                    :templateId="templateId"  :operateTypeReg="4"></add-authentication>
            </a-modal>
        </div>
    </div>
</template>

<script>
import addTemplate from './addTemplate';
import templateDetail from './templateDetail';
import authenticationList from './authenticationList';
import addAuthentication from './addAuthentication';
import SkeletonContractConfiguration from '../../skeleton/contract/contractConfiguration';
import { getDateHaoMiao } from '@/utils/util';

import {
    econtTemplateList,
    econtTemplateEnableDisable,
    econtTemplateRemove,
    econtTemplatePreview,
    econtListCertBody,
} from '@/api/contractTemple';
//表字段信息
const tableColumns = [
    {
        title: '序号',
        width: '8%',
        key:"序号",
        align: 'center',
        scopedSlots: { customRender: 'serialNumber' },
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
        align: 'center',
        scopedSlots: { customRender: 'status' },
        width: '6%',
    },
    {
        title: '模板名称',
        dataIndex: 'name',
        key: 'name',
        align: 'left',
        width: '15%',
    },
    {
        title: '接收邮箱',
        dataIndex: 'backupEmail',
        key: 'backupEmail',
        scopedSlots: { customRender: 'backupEmail' },
        align: 'left',
        width: '19%',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        scopedSlots: { customRender: 'createTime' },
        align: 'left',
        width: '15%',
    },
    {
        key: 'certPlatform',
        dataIndex: 'certPlatform',
        align: 'left',
        width: '30%',
        scopedSlots: { customRender: 'certPlatform' },
        slots: { title: 'certInfo' },
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
        align: 'center',
        width:'50px',
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
];
//分页
const pagination = {
    total: 0,
    current: 1,
    pageSize: 10,//每页中显示10条数据
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
}

export default {
    name: "contractTemplate",
    components: {
        addTemplate,
        templateDetail,
        authenticationList,
        addAuthentication,
        SkeletonContractConfiguration,
    },
    data() {
        return {
            tableColumns:tableColumns,          //列表属性
            tableData:[],                       //表数据
            pagination:pagination,              //分页相关
            showPreview:false,                  //预览组件是否可用
            appendEditorTxt:"",                 //预览内容
            listVisible:false,                  //认证列表
            templateId:"",                //认证id
            addTemplateShow:false,        //是否添加模板
            searchCriteria :{
                current: 1,
                size: 10,
                certPlatform:"",
                name:null,
                status:"",              //搜索条件
            },
            spinLoading:true,
            addAuthenticationVisible:false,
        }
    },
    created(){
       this.econtTemplateList();
    },
    methods: {
        cancelCloseCurrent(){
            this.addAuthenticationVisible = false;
        },
        closeAddAuthentication(){
            this.addAuthenticationVisible = false;
            this.econtTemplateList();
        },
        openDetail(record) {
            return {
                on: {
                    click: () => {
                        this.preview(record.id);
                    }
                }
            }
        },
        //关闭搜索框
        onSizeChange(current){
            this.searchCriteria.current = current;
            this.econtTemplateList();
        },
        onShowSizeChange(current, pageSize) {
            this.searchCriteria.current = current;
            this.searchCriteria.size = pageSize;
            this.pagination.pageSize = pageSize;
            this.econtTemplateList();
        },
        //禁用启用
        enableDisable(id,name,op){
            let parameter = {};
            parameter.id =id;
            parameter.op =op;
            let title = "";
            let content = "";
            let opName= "";
            let that = this;
            if(op == 1){
                title="确定要启用模板 「"+name +"」 吗？";
                content ="启用后，再次签约时此模板可使用";
                opName ="启用";
                //启用禁用确认
                this.$modal.confirm({
                    title: title,
                    content: content,
                    width: "433px",
                    height: "192px",
                    okText: '确认',
                    cancelText: '取消',
                    icon: () => <icon-font type="iconyumengtubiao_chenggong" style="color:green" />,
                    onOk() {
                    that.econtTemplateEnableDisable(parameter,opName);
                },
                onCancel() {
                },
            });
            }
            else if(op == 2){
                title="确定要禁用模板 「"+name +"」 吗？";
                content ="禁用后，再次签约时此模板将不可使用";
                opName ="禁用";

                //启用禁用确认
                this.$modal.confirm({
                    title: title,
                    content: content,
                    width: "433px",
                    height: "192px",
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                    that.econtTemplateEnableDisable(parameter,opName);
                },
                onCancel() {
                },
            });
            }

        },
        remove(id,name){
            let parameter = {};
            parameter.id =id;
            let that = this;
            //启用禁用确认
            this.$modal.confirm({
                title: "确定要删除模板「"+name +"」 吗？",
                content: "删除后，再次签约时此模板不可用",
                width: "433px",
                height: "192px",
                okText: '确认',
                cancelText: '取消',
                icon: () => <icon-font type="iconyumengtubiao_shanchu-1" style="color:#f5222d" />,
                onOk() {
                    that.econtTemplateRemove(parameter);
                },
                onCancel() {
                },
            });
        },
        authentication(record){
            let parameter = 1;
            this.templateId = record.id;
            econtListCertBody(parameter).then(res => {
                let tempList = res.data;
                if(tempList&&tempList.length>0){
                    this.listVisible = true;
                }
                else{
                    this.addAuthenticationVisible = true;
                }
            });

        },
        preview(id){
            let parameter = {};
            parameter.id = id;
            this.econtTemplatePreview(parameter);
        },
        edit(id){
            this.addTemplateShow = true;
            this.$refs.addTemplateChild.getMsgFromEdit(id);
        },
        copy(id){
            let parameter = {};
            parameter.id = id;
            econtTemplatePreview(parameter).then(res => {
                this.addTemplateShow = true;
                this.$refs.addTemplateChild.getMsgFromCopy(res.data.content);
            });
        },
        //打开添加模板
        openAddTemple() {
            this.templateId = "";
            this.addTemplateShow = true;
            this.$refs.addTemplateChild.getMsgFromAdd();
        },
        //接收参数
        assetsFormData(data) {
            this.searchCriteria.name = data.fuzzyKeyword;
            this.searchCriteria.status = data.status;
            this.searchCriteria.certPlatform = data.certPlatform;
            this.searchCriteria.current = 1;
            this.pagination.current = 1;
            this.econtTemplateList();
        },
        //来自子组件
        closeListModal(){
            this.listVisible = false;
        },
        successAuthentication(){
            this.listVisible = false;
            this.econtTemplateList();
        },
        //构造table key
        addKey(arr) {
            //table数据增加key属性值
            if (arr.length > 0) {
                arr.forEach((item) => { //利用foreach循环遍历
                    item.key = item.id;
                });
            }
        },
        //***********与api有关***********//
        //***模板列表***//
        econtTemplateList(){
            this.spinLoading = true;
            econtTemplateList(this.searchCriteria).then(res => {
                this.addKey(res.data.records);
                const pagination = { ...this.pagination };
                pagination.total = res.data.total;
                this.pagination = pagination;
                this.tableData = res.data.records;
                this.spinLoading = false;
            });
        },
        //***启用/禁用模板***//
        econtTemplateEnableDisable(parameter,opName) {
            econtTemplateEnableDisable(parameter).then(res => {
                if (res.code == "200") {
                    this.$message.info(opName + '成功');
                } else {
                    this.$message.error(opName + '失败');
                }
                this.econtTemplateList();
            });
        },
        //***删除模板***//
        econtTemplateRemove(parameter) {
            econtTemplateRemove(parameter).then(res => {
                if (res.code == "200") {
                    this.$message.info( '删除成功');
                } else {
                    this.$message.error( '删除失败');
                }
                this.econtTemplateList();
            });
        },
        //***模板预览***//
        econtTemplatePreview(parameter){
            econtTemplatePreview(parameter).then(res => {
                this.showPreview = true;
                this.appendEditorTxt = res.data.fullContent;
            });
        },
    },
    filters: {
        formatTime: function(value) {
            if (!value) return '-';
            value = getDateHaoMiao(value,"秒");
            return value;
        },
    }
}
</script>

<style scoped lang="less">
    .temple-box {
        width: 100%;
        margin: 0 auto;
        .titleSearch {
            height: 50px;
            line-height: 50px;
            .title {
                float: left;
            }
            .search {
                float: right;
                /deep/ .ant-input {
                    border-radius: 50px;
                }
                .searchButton {
                    width: 450px;
                }
            }
        }
      .table{
        min-width: 1200px;
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
</style>
<style lang="less" scoped>
    /deep/ .ant-popover-inner-content{
        text-align: center;
        padding: 5px 0;
        .action{
            padding: 8px 18px;
        }
        .action:hover{
            cursor: pointer;
            color: @themeColor;
            background:rgba(10,135,248,0.1);
        }
    }
</style>
