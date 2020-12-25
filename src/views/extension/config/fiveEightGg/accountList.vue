<template>
  <div class="accountList-box">
    <div class="basicsInfo">
      <div class="table">
        <div class="table-title">
          <div style="max-width: 5.5%;text-align: center;background: #F5F7FF;font-size:14px;color: #666666;">序号</div>
          <div style="max-width: 21%;text-align: left;padding-left: 21px;background: #F5F7FF;font-size:14px;color: #666666;">账号所属城市</div>
          <div style="max-width: 25%;text-align: left;padding-left: 21px;background: #F5F7FF;font-size:14px;color: #666666;">公寓ID</div>
          <div style="max-width: 31%;text-align: left;padding-left: 21px;background: #F5F7FF;font-size:14px;color: #666666;">Appid</div>
          <div style="max-width: 17.5%;text-align: center;background: #F5F7FF;font-size:14px;color: #666666;">操作</div>
        </div>
        <div class="house-data u-no-border" v-for="(item,index) in accoutList" :key="index">
          <div style="max-width: 5.5%;text-align: center;">{{item.num}}</div>
          <div class="cursor" @click="openAccountDetail(item)" style="max-width: 21%;text-align: left;padding-left: 21px;">{{item.cityName}}</div>
          <div class="overHidde cursor" @click="openAccountDetail(item)" style="max-width: 25%;text-align: left;padding-left: 21px;">{{item.clientId}}</div>
          <div class="overHidde cursor" @click="openAccountDetail(item)" style="max-width: 31%;text-align: left;padding-left: 21px;">{{item.clientAppid}}</div>
          <div style="max-width: 17.5%;text-align: center;">
            <span class="cursor" v-mark="['mk_extension_config_glgj']" @click="openAgentList(item)" style="color: #0A87F8;">管理管家</span>
            <span style="border-right: 1px dashed #DDDDDD;margin: 0 15px;"></span>
            <span class="cursor" v-mark="['mk_extension_config_jbzh']" @click="deleteAccount(item)" style="color: #FB4246;">解绑账号</span>
          </div>
        </div>
        <div class="house-data u-no-border cursor" v-mark="['mk_extension_config_bdzh']" @click="Open58ggDialog=true;" v-if="accoutList.length==0">
          <div class="continueAddStyle">
            <icon-font type="iconyumengtubiao_tianjia" />绑定账号
          </div>
        </div>
        <div class="house-data u-no-border cursor" v-mark="['mk_extension_config_bdzh']" @click="Open58ggDialog=true;" v-if="accoutList.length>0">
          <div class="continueAddStyle">
            <icon-font type="iconyumengtubiao_tianjia" />继续绑定账号
          </div>
        </div>
      </div>
    </div>
    <!-- 开通58公寓馆 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="Open58ggDialog" class="ownModalBorder titDialog" title="申请开通‘58品牌公寓馆’">
      <open58gg @cancelOpen="cancelOpen" @openSuccess="open58ggSuccess"></open58gg>
    </a-modal>
    <!-- 58公寓馆管家列表 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="agentListDialog" class="ownModalBorder titDialog" :title="agentListTitle">
      <agent-list :clientKeyId="clientKeyId"></agent-list>
    </a-modal>
    <!-- 账号详情 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="accountDetailDialog" class="ownModalBorder titDialog" title="58品牌公寓馆账号详情">
      <account-detail :clientKeyId="clientKeyId" @deleteSuccess="deleteAccountSuccess"></account-detail>
    </a-modal>
  </div>
</template>

<script>
import * as API from "@/api/extension";
import Open58gg from './open58gg';
import AgentList from './agentList';
import AccountDetail from './accountDetail';
export default {
  name: "accountList",
  components: {
    Open58gg,
    AgentList,
    AccountDetail,
  },
  props: {

  },
  data() {
    return {
      Open58ggDialog:false,
      agentListDialog:false,
      agentListTitle:'',
      accountDetailDialog:false,
      accoutList:[],
      clientKeyId:'',
    }
  },
  created() {
    this.getAccountList();
  },
  methods:{
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
      this.agentListTitle = '管理58品牌公寓馆"'+ item.cityName +'"管家信息';
      this.clientKeyId = item.id;
    },
    deleteAccount(item){
      let that = this;
      this.$modal.confirm({
        title: '确定要解除"' + item.cityName + '"绑定的58品牌公寓馆账号吗？',
        content: '解绑后，该账号下已上架所有房源将同步从58品牌公寓馆平台上下架；且房源将无法在推广到58品牌公寓馆平台上',
        width:"433px",
        height:"192px",
        okText: '确认',
        cancelText: '取消',
        onOk() {
          that.wubaDelete(item.id);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    wubaDelete(id){
      API.wubaDelete({id:id}).then(res => {
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
      this.Open58ggDialog = false;
    },
    open58ggSuccess(){
      this.Open58ggDialog = false;
      this.getAccountList();
    },
    getAccountList(){
      API.wubaFlatsList({}).then(res => {
        if (res && res.code === "200") {
          this.accoutList = res.data;
          this.accoutList.forEach(function(element, index) {
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