<template>
  <div class="unOpen-box">
      <div style="text-align: center;">
        <img style="width: 130px;height: 122px;" src="../../assets/login/no-collect.png">
      </div>
      <div style="color: #BBBBBB;font-size: 14px;margin-top: 20px;text-align: center;" v-if="clickPlatform==2">发房渠道「58租房」未开通</div>
      <div style="color: #BBBBBB;font-size: 14px;margin-top: 20px;text-align: center;"  v-if="clickPlatform==3">发房渠道「58品牌公寓馆」未开通</div>
      <div style="color: #BBBBBB;font-size: 14px;margin-top: 20px;text-align: center;"  v-if="clickPlatform==4">发房渠道「闲鱼租房」未开通</div>
      <div style="color: #BBBBBB;font-size: 14px;margin-top: 20px;text-align: center;"  v-if="clickPlatform==5">发房渠道「贝壳租房」未开通</div>
      <div style="color: #777777;font-size: 14px;margin-top: 9px;text-align: center;">
        请联系管理员去开通
      </div>
  </div>
</template>

<script>
export default {
  name: "unOpen",
  components: {
  },
  props: {
    clickPlatform:{
      Type:Number,
      default:1,
    },
  },
  data() {
    return {
    }
  },
  created() {

  },
  methods: {
    openClickPlatform(){
      //跳转至开通页面
      this.$emit('goToConfig',this.clickPlatform);
    },
  },
  filters: {

  }
}
</script>

<style lang="less" scoped>
  .unOpen-box{

  }
</style>