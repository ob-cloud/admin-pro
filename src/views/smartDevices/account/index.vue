<template>
  <div class="account-box">
    <div class="loadingCircle" id="loadingCircle" v-show="spinLoading"></div>
    <div class="add-btn-wrap" @click="addAccount()" v-mark="['mk_smartDevices_account_bdzh']">
      <icon-font type="iconyumengtubiao_tianjia" /> 授权账号
    </div>
    <content-top>
      <div class="status-box f-fl">
        <top-title :activeIndex="statusActiveIndex" :statusData="statusData" @changeStatus="changeStatus"></top-title>
      </div>
      <div class="search-box f-fr">
        <a-input-search v-model="sendData.fuzzyKeyword" placeholder="账号标识/账号说明" style="width: 472px;" @pressEnter="onSearch" @search="onSearch" />
      </div>
    </content-top>
    <content-main>
      <skeleton-account v-show="spinLoading"></skeleton-account>
      <div class="table" v-show="!spinLoading">
        <a-table rowKey="id" :bordered="true" :customRow="openDetail" :pagination="false" :columns="tableColumns" :dataSource="tableData">
          <div slot="bindTime" slot-scope="text">
            {{text?$moment(text).format('YYYY.MM.DD HH:mm'):'-'}}
          </div>
          <div slot="comment" slot-scope="text">
            <a-popover>
              <template slot="content">
                <p style="padding: 6px 18px;">
                  {{text}}
                </p>
              </template>
              <div type="primary" class=" overHidde" style="max-width: 420px;">
                {{text}}
              </div>
            </a-popover>
          </div>
          <div slot="action" slot-scope="text, record">
            <a-popover :title="null" trigger="hover" v-if="checkOpts(record) == true">
              <template slot="content">
                <div v-if="record.btnArr.indexOf('1') != -1" @click="openEditComment(record)" class="action cursor" >修改说明</div>
                <div v-if="record.btnArr.indexOf('2') != -1" @click="unBind(record)" class="action cursor" >解绑</div>
              </template>
              <div style="width: 100%;height: 100%">
                <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
              </div>
            </a-popover>
          </div>
        </a-table>
        <div class="contFoot" v-show="tableData.length>0">
          <a-pagination size="small" :total="pagination.total" :current="pagination.current" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
        </div>
      </div>
    </content-main>
    <!-- 修改备注 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="commentEditDialog" class="ownModalBorder titDialog" title="修改账号说明">
      <comment-edit :id="id" :comment="comment" @cancelEdit="commentEditDialog=false;" @editSuccess="editSuccess"></comment-edit>
    </a-modal>
    <!-- 详情 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="accountDetailDialog" class="ownModalBorder titDialog" title="果加账号详情" @cancel="initData">
      <account-detail :id="id" @unBindSuccess="unBindSuccess" @refreshinfoFun="refreshinfoFun"></account-detail>
    </a-modal>
    <!-- 绑定账号 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="bindAccountDialog" class="ownModalBorder titDialog" title="绑定账号">
      <bind-account :brand="sendData.brand" @addSuccess="addSuccess"  @authSuccess="authSuccess"></bind-account>
    </a-modal>
  </div>
</template>

<script>
import TopTitle from '@/components/TopStatus/title';
import SkeletonAccount from '../../skeleton/smartDevices/account';
import BindAccount from './bindAccount';
import CommentEdit from './commentEdit';
import AccountDetail from './accountDetail';
import * as API from "@/api/smartDevices";
export default {
  name: "index",
  components: {
    TopTitle,
    SkeletonAccount,
    BindAccount,
    CommentEdit,
    AccountDetail,
  },
  data() {
    return{
      spinLoading:false,
      statusActiveIndex:0,
      statusData:[
        {
          title: '云丁',
          status: 1,
          mark:['mk_smartDevices_account_ck'],
        },
        {
          title: '果加',
          status: 2,
          mark:['mk_smartDevices_account_ck'],
        },
        {
          title: '蜂电',
          status: 3,
          mark:['mk_smartDevices_account_ck'],
        },
        {
          title: '超仪',
          status: 4,
          mark:['mk_smartDevices_account_ck'],
        },
      ],
      sendData:{
        current: 1,                     // 当前页数
        size: 10,                       // 每页返回的记录数量
        fuzzyKeyword: '',               // 模糊匹配关键词
        fuzzyQueryType: 0,              //模糊查询类型(0、全部；1、账号标识；2、账号说明)
        brand:1,
        bindTimeBegin:'',
        bindTimeEnd:'',
      },
      tableColumns_common: [
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
          title: '授权账号',
          dataIndex: 'thirdPartyAccountId',
          key: 'thirdPartyAccountId',
          align: 'left',
          scopedSlots: { customRender: 'thirdPartyAccountId' },
          width: '330px'
        },
        {
          title: '授权绑定时间',
          dataIndex: 'bindTime',
          key: 'bindTime',
          scopedSlots: { customRender: 'bindTime' },
          align: 'left',
          width: '387px'
        },
        {
          title: '账号说明',
          key: 'comment',
          dataIndex: 'comment',
          scopedSlots: { customRender: 'comment' },
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
      tableColumns_chaoyi: [
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
          title: '账号应用ID',
          dataIndex: 'thirdPartyAppId',
          key: 'thirdPartyAppId',
          align: 'left',
          scopedSlots: { customRender: 'thirdPartyAppId' },
          width: '330px'
        },
        {
          title: '授权绑定时间',
          dataIndex: 'bindTime',
          key: 'bindTime',
          scopedSlots: { customRender: 'bindTime' },
          align: 'left',
          width: '387px'
        },
        {
          title: '账号说明',
          key: 'comment',
          dataIndex: 'comment',
          scopedSlots: { customRender: 'comment' },
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
      tableColumns:[],
      tableData:[],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,//每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
      },
      bindAccountDialog:false,
      commentEditDialog:false,
      accountDetailDialog:false,
      id:'',
      comment:'',
      permissions:[],
      isRefresh:false,
    }
  },
  created() {
    //获取当前页面参数
    switch (this.$route.params.bindType) {
      case 1:
        this.statusActiveIndex = 0;
        this.sendData.brand = 1;
        break;
      case 2:
        this.statusActiveIndex = 1;
        this.sendData.brand = 2;
        break;
    }
    this.initTableColumns();
    this.accountList();
  },
  methods: {
    initData(){
      this.accountDetailDialog = false;
      if(this.isRefresh){
        this.accountList();
        this.isRefresh = false;
      }
    },
    refreshinfoFun(res){
      this.isRefresh = res;
    },
    initTableColumns(){
      if(this.sendData.brand!=4){
        let tableColumns = [];
        this.tableColumns_common.forEach((item)=>{
          tableColumns.push(item);
        });
        this.tableColumns = tableColumns;
      }
      else{
        let tableColumns = [];
        this.tableColumns_chaoyi.forEach((item)=>{
          tableColumns.push(item);
        });
        this.tableColumns = tableColumns;
      }
    },
    authSuccess(){
      this.bindAccountDialog = false;
      this.accountList();
    },
    unBindSuccess(){
      this.accountDetailDialog = false;
      this.accountList();
    },
    editSuccess(){
      this.commentEditDialog = false;
      this.accountList();
    },
    openEditComment(record){
      this.id = record.id;
      this.comment = record.comment;
      this.commentEditDialog = true;
    },
    unBind(record){
      let _this = this;
      let id = record.id;
      let accountName = record.thirdPartyAccountId;
      if(record.brand == 4){
        accountName = record.thirdPartyAppId;
      }
      this.$modal.confirm({
        title: '确定要解绑 「' + record.brandName + '/' + accountName + '」 账号吗？',
        content: '解绑后，该账号上已绑定的门锁、水电表将同步全部解除绑定',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.lockAuthAccountUnBind({id:id}).then(res => {
            // console.log(res)
            if (res.code == 200) {
              _this.$message.success('解绑成功！');
              _this.accountList();
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    checkOpts(record){
      if(!this.permissions||this.permissions.length==0){
        this.permissions = JSON.parse(sessionStorage.getItem('permissions'));
      }
      let markArr = ['mk_smartDevices_account_jbzh','mk_smartDevices_account_xgzhsm'];
      let btnArr = [];
      markArr.forEach(ele => {
        this.permissions.some(function(value){
          if (ele == value.mark){
            if(value.mark == 'mk_smartDevices_account_jbzh'){
              btnArr.push('1');
            }else if(value.mark == 'mk_smartDevices_account_xgzhsm'){
              btnArr.push('2');
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
    addSuccess(){
      this.bindAccountDialog = false;
      this.accountList();
    },
    cancelAdd(){
      this.bindAccountDialog = false;
    },
    changeStatus(item){
      this.sendData.brand = item.status;
      this.initTableColumns();
      this.accountList();
    },
    onSearch(){
      this.accountList();
    },
    addAccount(){
      this.bindAccountDialog = true;
    },
    assetsFormData(){
    },
    accountList(){
      API.lockAuthAccountList(this.sendData).then(res => {
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
      });
    },
    openDetail(record){
      return {
        on: {
          click: () => {
            this.id = record.id;
            this.accountDetailDialog = true;
          }
        }
      }
    },
    onSizeChange(current) {
      this.sendData.current = current;
      this.pagination.current = current;
      this.accountList();
    },
    onShowSizeChange(current, pageSize) {
      this.sendData.current = current;
      this.sendData.size = pageSize;
      this.pagination.pageSize = pageSize;
      this.pagination.current = current;
      this.accountList();
    },
  },
  filters: {
  },
}
</script>

<style scoped lang="less">
  .account-box{
    .content-top {
      min-width: 1300px; // overflow: hidden;
    }
    .table {
      min-width: 1200px;
      .action:hover {
        background-color: @themeBgColor;
        color: @themeColor;
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
    .search-box{
      /deep/ .ant-input{
        border-radius: 18px;
      }
    }
    & /deep/.ant-table-tbody>tr>td {
      padding: 12px 6px;
      &:not(:first-child) {
        cursor: pointer;
        padding: 12px 20px;
      }
    }
    & /deep/.ant-table-thead > tr > th{
      padding: 12px 6px;
      &:not(:first-child) {
        padding: 12px 20px;
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
    /deep/ .content-main{
      padding: 14px 14px 12px 14px;
    }
    /deep/ .content-main .content{
      padding: 0px;
    }
  }
</style>