<template>
  <div class="agentDetail-box">
    <div class="agentDetail-title clearfix">
      <div class="agentDetail-title1 f-fl">
        <icon-font style="color: #FFFFFF;margin: 4px 0 0 4px;" type="iconxianyuzufang" />
      </div>
      <div class="agentDetail-title2 f-fl">
        闲鱼租房账号
      </div>
      <div class="agentDetail-title3 cursor f-fr" @click="deleteAccount" v-mark="['mk_extension_config_jbzh']">
        解绑账号
      </div>
    </div>
    <div class="agentDetail-content clearfix">
      <label-item class="item f-fl" title="闲鱼会员名">
        <span class="itemFont">{{accountInfo.nick?accountInfo.nick:'-'}}</span>
      </label-item>
      <label-item class="item f-fl" title="账号所属人">
        <span class="itemFont">{{accountInfo.userName}}-{{accountInfo.userPhone}}</span>
      </label-item>
      <label-item class="item f-fl" style="margin-top: 15px;" title="绑定时间">
        <span class="itemFont">{{$moment(accountInfo.createTime).format('YYYY.MM.DD HH:mm')}}</span>
      </label-item>
      <label-item class="item f-fl" style="margin-top: 15px;" title="绑定人">
        <span class="itemFont">{{accountInfo.createrName?accountInfo.createrName:'-'}}</span>
      </label-item>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/extension";
export default {
  name: "agentDetail",
  components: {

  },
  props: {
    clientKeyId:{
      Type:String,
      required:true,
    },
  },
  data() {
    return {
      accountInfo:{
        cityName:'',
        clientId:'',
        clientSecret:'',
        createTime:'',
        createrName:''
      },
    }
  },
  created() {
    this.fishUserViewHouseUser();
  },
  methods:{
    deleteAccount(){
      let that = this;
      this.$modal.confirm({
        title: '确定要解除绑定闲鱼账号吗？',
        content: '解绑后，该账号下已上架所有房源将同步从闲鱼租房平台上下架；且房源将无法在推广到闲鱼租房平台上',
        width:"433px",
        height:"192px",
        okText: '确认',
        cancelText: '取消',
        onOk() {
          that.fishUserDelHouseUser();
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    fishUserDelHouseUser(){
      API.fishUserDelHouseUser({id:this.clientKeyId}).then(res => {
        if (res.code === "200") {
          this.$message.success('账号解绑成功');
          this.$emit('deleteSuccess');
        }
        else{
          this.$message.error('账号解绑失败');
        }
      });
    },
    fishUserViewHouseUser(){
      API.fishUserViewHouseUser(this.clientKeyId).then(res => {
        if (res && res.code === "200") {
          this.accountInfo = res.data;
        }
      });
    },
  },
  filters: {
  },
}
</script>

<style lang="less" scoped>
  .agentDetail-box{
    .agentDetail-title{
      margin-top: 10px;
      padding: 0 20px;
      height:65px;
      background:rgba(245,247,254,1);
      .agentDetail-title1{
        width: 32px;
        height: 32px;
        background:rgb(255, 215, 1);
        border-radius:50%;
        margin-top: 16px;
        svg{
          width: 24px;
          height: 24px;
        }
      }
      .agentDetail-title2{
        font-size: 18px;
        color: #111111;
        margin: 20px 0 0 10px;
      }
      .agentDetail-title3{
        width:88px;
        height:32px;
        background:rgba(10,135,248,1);
        color: #ffffff;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        margin-top: 16px;
        border-radius: 4px;
      }
    }
    .agentDetail-content{
      padding: 20px 20px 90px 20px;
      /deep/ .label-item .title{
        font-size: 14px;
      }
      .item {
        width: 240px;
        .itemFont{
          font-size: 14px;
          color: #111111;
        }
      }
    }
  }
</style>