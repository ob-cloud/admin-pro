<template>
  <div class="withDrawWarning-box">
    <div class="line-1">
      <img src="../../assets/wallet/withdraw.png">
    </div>
    <div class="line-2">当前时间不可提现，请您在指定时间内操作提现</div>
    <div class="line-3">可提现时间：8:00 - 22:00</div>
    <div class="line-4 cursor" @click="closeThis">关闭</div>
  </div>
</template>

<script>
export default {
  name: "withDrawWarning",
  methods: {
    closeThis(){
      this.$emit('closeThis');
    },
  }
}
</script>

<style lang="less" scoped>
  .withDrawWarning-box{
    .line-1{
      text-align: center;
      img{
        width: 84px;
        height: 84px;
      }
    }
    .line-2{
      margin-top: 25px;
      font-size: 14px;
      color: #111111;
      text-align: center;
    }
    .line-3{
      margin: 12px 0 50px 0;
      font-size: 18px;
      color: #111111;
      text-align: center;
    }
    .line-4{
      width: 140px;
      height: 40px;
      line-height: 40px;
      color: #ffffff;
      font-size: 14px;
      background: #0A87F8;
      text-align: center;
      margin: 0 auto;
      border-radius:5px;
    }
  }
</style>