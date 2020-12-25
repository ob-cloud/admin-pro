<template>
  <div class="unSignedContractWarning-box">
     <!-- <div>此账户还未签订《通商云电子协议》，不可提现</div>
      <div>去签订</div>-->
    <div v-if="isSignedContract==0">
      <div style="text-align: center">
        <img style="width: 84px;height: 84px;" src="../../assets/wallet/unSignContract.png">
      </div>
      <div style="margin-top: 24px;color: #111111;font-size: 16px;text-align: center">
        此账户还未签订《通商云电子协议》，不可提现
      </div>
      <div style="text-align: center">
        <a-button size="large" type="primary" :loading="saveLoading" @click="openSigned()" style="text-align:center;width: 140px;height: 40px;line-height: 40px;color: #ffffff;background: #0A87F8;border-radius:5px;margin-top: 34px;">
        去签订
        </a-button>
      </div>
    </div>
    <div v-if="isSignedContract==1">
      <div class="signSuccess-box">
        <div class="successRadiusStyle" style="text-align: center;">
          <icon-font type="iconyumengtubiao_xuanzhong-"></icon-font>
        </div>
        <div style="text-align: center;color: #111111;font-size: 16px;margin-top: 25px;margin-bottom: 30px;">签订成功</div>
        <div class="cursor" @click="signedSuccess" style="border-radius:5px;margin:0 auto;text-align: center;width: 160px;height: 40px;line-height:40px;color: #ffffff;font-size: 14px;background: #0A87F8;">去提现</div>
      </div>
    </div>
      <!--<html-panel :url="url1"></html-panel>-->
    <a-modal destroyOnClose centered v-model="htmlPannelDialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'40px 0px 0px 0px'}" @cancel="htmlPannelDialog=false" width="1250px">
      <html-panel :url="url" :accountId="accountId" @signedSuccess="signedSuccess"></html-panel>
    </a-modal>
  </div>
</template>

<script>
import HtmlPanel from './HtmlPanel';
import * as API from "@/api/wallet";
export default {
  name: "unSignedContractWarning",
  components: {
    HtmlPanel,
  },
  props: {
    accountId:{
      type:String,
      required:true,
    },
  },
  data() {
    return {
      url: '',
      htmlPannelDialog:false,
      isSignedContract:0,
      saveLoading:false,
    }
  },
  mounted () {
  },
  created() {

  },
  methods: {
    signedSuccess(){
      this.htmlPannelDialog = false;
      this.$emit('signedSuccess');
    },
    openSigned(){
      //延迟500ms 防止调接口报错
      this.saveLoading = true;
      setTimeout(()=>{
        let parameter ={
          source:1,
          walletAccountId:this.accountId,
        };
        API.signContractApply(parameter).then(res => {
          if(!res){
            this.saveLoading = false;
          }
          if (res.code === '200') {
            this.isSignedContract = res.data.isSignedContract;
            this.saveLoading = false;
            if(this.isSignedContract == 0){
              this.url = res.data.signUrl;
              this.htmlPannelDialog = true;
            }
          }
          else{
            this.saveLoading = false;
          }
        });
      },500);
    },
  }
}
</script>

<style scoped lang="less">
  .unSignedContractWarning-box{
    .signSuccess-box{
      width: 100%;
      margin-top: 16px;
      .successRadiusStyle{
        margin: 0 auto;
        width:84px;
        height:84px;
        line-height: 84px;
        background:rgba(82,196,26,1);
        border-radius: 50%;
        text-align: center;
        svg{
          width: 84px;
          height: 84px;
          color: #FFFFFF;
        }
      }
    }
  }
</style>