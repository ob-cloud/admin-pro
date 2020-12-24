<template>
  <div class="accountList-box">
    <div class="basicsInfo">
      <div class="table">
        <div class="table-title">
          <div style="max-width: 5.5%;text-align: center;background: #F5F7FF;font-size:14px;color: #666666;">序号</div>
          <div style="max-width: 31%;text-align: left;padding-left: 21px;background: #F5F7FF;font-size:14px;color: #666666;">闲鱼会员名</div>
          <div style="max-width: 45.5%;text-align: left;padding-left: 21px;background: #F5F7FF;font-size:14px;color: #666666;">闲鱼账号所属人</div>
          <div style="max-width: 18%;text-align: center;background: #F5F7FF;font-size:14px;color: #666666;">操作</div>
        </div>
        <div class="house-data u-no-border" v-for="(item,index) in accountList" :key="index">
          <div style="max-width: 5.5%;text-align: center;">{{item.num}}</div>
          <div class="cursor" @click="openAccountDetail(item)" style="max-width: 31%;text-align: left;padding-left: 21px;">{{item.nick}}</div>
          <div class="overHidde cursor" @click="openAccountDetail(item)" style="max-width: 45.5%;text-align: left;padding-left: 21px;">{{item.userName}}</div>
          <div class="operateStyle" style="max-width: 18%;text-align: center;">
            <span class="cursor" v-if="item.status==1||item.status==3" v-mark="['mk_extension_config_glgj']" @click="openAgentList(item)" style="color: #0A87F8;">管理管家</span>
            <span class="cursor" v-if="item.status==0" v-mark="['mk_extension_config_bdzh']" @click="openErWeiMaXy(item)" style="color: #0A87F8;">闲鱼扫码授权</span>
            <span style="border-right: 1px dashed #DDDDDD;margin: 0 15px;"></span>
            <span class="cursor" v-mark="['mk_extension_config_jbzh']" @click="deleteAccount(item)" style="color: #FB4246;">解绑账号</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 开通闲鱼(目前该功能不会出现，暂时不删除了，防止需求变更) -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="OpenXyDialog" class="ownModalBorder titDialog" title="开通‘闲鱼租房’" @cancel="isRefreshFun">
      <open-xy @cancelOpen="cancelOpen" @refreshinfoFun="refreshinfoFun" @closeThis="openErWeiMaXySuccess"></open-xy>
    </a-modal>
    <!-- 管家列表 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="agentListDialog" class="ownModalBorder titDialog" :title="agentListTitle">
      <agent-list :clientKeyId="clientKeyId"></agent-list>
    </a-modal>
    <!-- 账号详情 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="accountDetailDialog" class="ownModalBorder titDialog" title="闲鱼租房账号详情">
      <account-detail :clientKeyId="clientKeyId" @deleteSuccess="deleteAccountSuccess"></account-detail>
    </a-modal>
    <!-- 二维码页面 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="erWeiMaXyDialog" class="ownModalBorder titDialog" title="扫码授权绑定" @cancel="openErWeiMaXySuccess">
      <er-wei-ma-xy @closeThis="openErWeiMaXySuccess"></er-wei-ma-xy>
    </a-modal>
  </div>
</template>

<script>
import * as API from "@/api/extension";
import OpenXy from './openXy';
import AgentList from './agentList';
import AccountDetail from './accountDetail';
import ErWeiMaXy from './erWeiMaXy';
export default {
  name: "accountList",
  components: {
    OpenXy,
    AgentList,
    AccountDetail,
    ErWeiMaXy,
  },
  props: {
    xyId:{
      Type:String,
    }
  },
  data() {
    return {
      OpenXyDialog:false,
      agentListDialog:false,
      agentListTitle:'',
      accountDetailDialog:false,
      accountList:[],
      clientKeyId:'',
      isRefresh:false,
      erWeiMaXyDialog:false,
      id:'',
    }
  },
  created() {
    if(this.xyId){
      API.fishUserRefreshStatus(this.xyId).then(res => {
        this.getAccountList();
      });
    }
    else{
      this.getAccountList();
    }

  },
  methods:{
    openErWeiMaXy(item){
      this.id = item.id;
      this.erWeiMaXyDialog = true;
    },
    openErWeiMaXySuccess(){
      API.fishUserRefreshStatus(this.id).then(res => {
        if(!res){
          this.erWeiMaXyDialog = false;
          this.OpenXyDialog = false;
        }
        if (res.code == 200) {
          this.erWeiMaXyDialog = false;
          this.OpenXyDialog = false;
          setTimeout(()=>{
            this.getAccountList();
          },300);
        }
        else{
          this.erWeiMaXyDialog = false;
          this.OpenXyDialog = false;
        }
      });
    },
    //暂时不会执行
    refreshinfoFun(res){
      this.isRefresh = true;
      this.id = res;
    },
    //暂时不会执行
    isRefreshFun(){
      this.cancelOpen();
      if(this.isRefresh){
        this.openErWeiMaXySuccess();
      }
      this.isRefresh = false;
    },
    deleteAccountSuccess(){
      this.accountDetailDialog = false;
      this.clientKeyId = '';
      this.$emit('deleteSuccess');
      this.getAccountList();
    },
    openAccountDetail(item){
      this.clientKeyId = item.id;
      this.accountDetailDialog = true;
    },
    openAgentList(item){
      this.agentListDialog = true;
      this.agentListTitle = '管理闲鱼租房管家信息';
      this.clientKeyId = item.id;
    },
    deleteAccount(item){
      let that = this;
      this.$modal.confirm({
        title: '确定要解除绑定闲鱼账号吗？',
        content: '解绑后，该账号下已上架所有房源将同步从闲鱼租房平台上下架；且房源将无法在推广到闲鱼租房平台上',
        width:"433px",
        height:"192px",
        okText: '确认',
        cancelText: '取消',
        onOk() {
          that.fishUserDelHouseUser(item.id);
        },
        onCancel() {
        },
      });
    },
    fishUserDelHouseUser(id){
      API.fishUserDelHouseUser({id:id}).then(res => {
        if (res.code === "200") {
          this.$message.success('账号解绑成功');
          this.$emit('deleteSuccess');
          this.getAccountList();
        }
        else{
          this.$message.error('账号解绑失败');
        }
      });
    },
    cancelOpen(){
      this.OpenXyDialog = false;
    },
    getAccountList(){
      API.fishUserListFishUser({}).then(res => {
        if (res && res.code === "200") {
          this.accountList = res.data;
          this.accountList.forEach(function(element, index) {
            element.num = index + 1;
          }, this);
        }
      });
    },
  },
  filters: {
  },
}
</script>

<style lang="less" scoped>
  .accountList-box{
    min-width: 996px;
    padding: 19px 14px 0 18px;
    .basicsInfo{
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .item{
        display: flex;
        justify-content: flex-start;
        margin-right: 15px;
      }
      .table{
        width: 100%;
        border-left: 1px solid #EEEEEE;
        border-top: 1px solid #EEEEEE;
        font-size: 14px;
        .table-title{
          display: flex;
          background:rgba(246,247,251,1);
          color: #666666;
          & > div {
            flex: 1;
            height: 46px;
            line-height: 46px;
            border-right: 1px solid #EEEEEE;
            border-bottom: 1px solid #EEEEEE;
          }
          .mustFill{
            margin-left: 2px;
            color: #FB4246;
          }
        }
        .house-data {
          display: flex;
          & > div {
            flex: 1;
            height: 46px;
            line-height: 46px;
            text-align: left;
            border-right: 1px solid #EEEEEE;
            border-bottom: 1px solid #EEEEEE;
            background-color: #ffffff;
            .delete-icon {
              color: red;
              font-size: 14px;
            }
          }
          .operateStyle{
            span:first-child {
              border-right: none;
            }
            span:last-child{
              border-right: none;
            }
          }
        }
      }
      .add-item-style{
        width: 104px;
        height: 38px;
        line-height: 38px;
        font-size: 14px;
        border-radius:4px;
        border:1px solid rgba(10,135,248,1);
        text-align: center;
        color: #0A87F8;
        i{
          vertical-align: 0em;
          margin-right: 4px;
        }
        svg{
          width: 12px;
          height: 12px;
        }
      }
      .continueAddStyle{
        font-size: 14px;
        color: #0A87F8;
        text-align: center !important;
        i{
          vertical-align: 0em;
          margin-right: 8px;
        }
        svg{
          width: 12px;
          height: 12px;
        }
      }
    }
  }
</style>