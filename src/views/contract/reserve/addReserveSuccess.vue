<template>
  <div class="addReserveSuccess-box">
    <div style="height: 46px;">
    </div>
    <div style="text-align: center">
      <!--iconyumengtubiao_xuanzhong-1-->
      <icon-font type="iconyumengtubiao_xuanzhong-1" />
    </div>
    <div style="margin-top: 20px;text-align: center;color: #111111;font-size: 14px;font-weight: 600;">预定成功</div>
    <div style="margin-top: 8px;text-align: center;color: #777777;font-size: 14px;">
      租客有<span style="color: #0a87f8;">{{maxTime}}</span>分钟支付时间，超时自动失效，您可重新发起</div>
    <div style="height: 46px;">
    </div>
    <div class="buttonStyle cursor" @click="colseThis">
        关闭
    </div>
    <div style="height: 30px;">
    </div>
  </div>
</template>

<script>
export default {
  name: "addReserveSuccess",
  props: {
    maxTime:{
      type:Number,
      default:60,
    }
  },
  data() {
    return {}
  },
  created() {

  },
  methods: {
    colseThis(){
      this.$emit('colseThis');
    }
  },
}
</script>

<style scoped lang="less">
  .addReserveSuccess-box{
    svg{
      width: 42px;
      height: 40px;
      color: #0A87F8;
    }
    .buttonStyle{
      width: 120px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: #1677FF;
      color: #ffffff;
      font-size: 14px;
      margin: 0 auto;
      border-radius: 4px;
    }
  }
</style>