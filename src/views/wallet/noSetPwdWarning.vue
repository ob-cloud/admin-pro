<template>
  <div class="noSetPwdWarning-box">
    <div>
      <a-empty description="还未设置交易密码，请先设置"></a-empty>
      <div v-if="isOwner==1" class="ownerStyle cursor" @click="setAllinpayPwd">现在去设置<icon-font style="margin-left: 5px;" type="iconyumengtubiao_zhishi"/></div>
      <div v-else class="notOwnerStyle">请联系钱包负责人设置</div>
    </div>
    <!-- 通商云设置密码 -->
    <a-modal destroyOnClose centered v-model="htmlPannelDialog" :footer="null" class="ownModalBorder titDialog" :maskClosable="false" title="设置交易密码" :bodyStyle="{padding:'0px 0px 0px 0px'}" @cancel="getSetPwdCon" width="1250px">
      <html-panel :url="url" @authSuccess="setSuccess"></html-panel>
    </a-modal>
  </div>
</template>

<script>
import HtmlPanel from '../smartDevices/account/HtmlPanel';
import * as API from "@/api/wallet";
export default {
  name: "noSetPwdWarning",
  components: {
    HtmlPanel
  },
  props: {
    isOwner:{
      type:Number,
    },
    accountId:{
      type:String,
    },
  },
  data() {
    return {
      htmlPannelDialog:false,
      url:'',
      isSetPayPwd:0,
    }
  },
  created() {
  },
  methods: {
    getSetPwdCon(){
      this.htmlPannelDialog = false;
      let _this = this;
      if (this.isSetPayPwd == 0) {
        setTimeout(()=>{
          API.getPayPwdSetStatus({id:this.accountId}).then(res=>{
            if(res.code === '200'){
              if(res.data==1){
                _this.isSetPayPwd = 1;
                _this.$emit('setSuccess');
              }
              else{
                _this.$emit('closeThis');
              }
            }
          },500);
        })

      }
    },
    setAllinpayPwd(){
      let parameter = {
        accountId:this.accountId,
        source:1,
      };
      if(this.url){
        this.htmlPannelDialog = true;
        return ;
      }
      API.setPayPwdApply(parameter).then(res=>{
        if(res.code === '200'){
          this.url = res.data
          this.htmlPannelDialog = true;
        }
      });
    },
    setSuccess(){
      this.htmlPannelDialog = false;
      this.$emit('setSuccess');
    },
  }
}
</script>

<style lang="less" scoped>
  .noSetPwdWarning-box{
    .ownerStyle{
      margin: 10px 0 40px 0;
      text-align: center;
      color: #0A87F8;
      font-size: 15px;
    }
    .notOwnerStyle{
      text-align: center;
      color: #666666;
      font-size: 15px;
      margin: 10px 0 40px 0;
    }
  }
</style>