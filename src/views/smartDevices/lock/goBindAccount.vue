<template>
  <div class="goBindAccount-box">
      <div style="text-align: center;margin-top: 50px;">
        <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
      </div>
      <div  style="text-align: center;margin: 19px 0;color: #777777;font-size: 14px;" v-if="goToBindType==1">未授权「云丁」账号</div>
    <div  style="text-align: center;margin: 19px 0;color: #777777;font-size: 14px;" v-if="goToBindType==2">未授权「果加」账号</div>
    <div  style="text-align: center;margin: 19px 0;color: #777777;font-size: 14px;" v-if="goToBindType==3">未授权「蜂电」账号</div>
    <div  style="text-align: center;margin: 19px 0;color: #777777;font-size: 14px;" v-if="goToBindType==4">未授权「超仪」账号</div>
      <div class="cursor" @click="goToBindAccount" style="text-align: center;color: #0A87F8;font-size: 16px;padding-bottom: 56px;">立即绑定<icon-font style="margin-left: 9px;" type="iconyumengtubiao_zhishi"/></div>
  </div>
</template>

<script>
export default {
  name: "goBindAccount",
  components: {
  },
  props: {
    goToBindType:{
      type:Number,
      default:1,
    }
  },
  data() {
    return {}
  },
  created() {

  },
  methods: {
    goToBindAccount(){
      this.$emit('goToBindAccount');
    },
  },
}
</script>

<style scoped lang="less">
  .goBindAccount-box{

  }
</style>