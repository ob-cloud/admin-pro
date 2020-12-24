<template>
  <div class="fengDianCommon-box">
    <div style="height: 28px;">
    </div>
    <div style="text-align: center">
      <img style="width: 66px;height: 66px;" src="../../../assets/smartDevice/fengDian.png" />
    </div>
    <div style="margin-top: 16px;text-align: center;color: #666666;font-size: 14px;">{{ desc }}</div>
    <div style="height: 26px;">
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
  name: "fengDianCommon",
  props: {
    desc:{
      type:String,
      required:true,
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
  .fengDianCommon-box{
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