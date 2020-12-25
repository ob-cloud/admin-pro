<template>
  <div class="erWeiMaXy">
    <div>
      <img style="width: 258px;height: 258px;" src="../../../../assets/extension/xyQrcode.jpg">
    </div>
    <div style="margin-top: 9px;color: #111111;font-size: 16px;">请用闲鱼APP进行扫码授权</div>
    <div style="margin-top: 35px;">
      <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="closeThis">
        已扫码授权
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "erWeiMaXy",
  props: {
  },
  data() {
    return {}
  },
  created() {
  },
  methods:{
    closeThis(){
      this.$emit('closeThis');
    },
  },
  filters: {
  },
}
</script>

<style lang="less" scoped>
  .erWeiMaXy{
    padding: 30px 0 20px 0;
    text-align: center;
  }
</style>