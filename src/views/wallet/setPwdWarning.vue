<template>
  <div class="setPwdWarning-box">
    <div class="line-1">
      <img src="../../assets/wallet/ok.png">
    </div>
    <div class="line-2">手机绑定成功</div>
    <div class="line-3 cursor" @click="goToSetPwd">设置交易密码<icon-font type="iconyumengtubiao_zhishi" style="margin-left: 4px;"></icon-font></div>
  </div>
</template>

<script>
export default {
  name: "withDrawWarning",
  methods: {
    goToSetPwd(){
      this.$emit('goToSetPwd');
    },
  }
}
</script>

<style lang="less" scoped>
  .setPwdWarning-box{
    .line-1{
      text-align: center;
      img{
        width: 84px;
        height: 84px;
      }
    }
    .line-2{
      margin-top: 20px;
      font-size: 14px;
      color: #111111;
      text-align: center;
    }
    .line-3{
      margin: 20px 0 0 0;
      font-size: 15px;
      text-align: center;
      color: #0A87F8;
    }
  }
</style>