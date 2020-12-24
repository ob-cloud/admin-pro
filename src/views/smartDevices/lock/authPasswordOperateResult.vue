<template>
  <div class="authPasswordOperateResult-box">
    <div v-if="operateType==1" class="line1">
      密码删除中…
    </div>
    <div v-if="operateType==2" class="line1">
      密码冻结中…
    </div>
    <div v-if="operateType==3" class="line1">
      密码解冻中…
    </div>
    <div class="line2">
      预计需要<span> 1 </span>分钟，<span> 1 </span>分钟后刷新列表查看
    </div>
    <div class="line3 cursor" @click="closeThis">
        关闭
    </div>
    <div style="height: 6px;">

    </div>
  </div>
</template>

<script>
export default {
  name: "authPasswordOperateResult",
  components: {
  },
  props: {
    operateType:{
      type:Number,
      default:1,
    },
  },
  data() {
    return {}
  },
  created() {

  },
  mounted() {
  },
  methods: {
    closeThis(){
      this.$emit('closeThis');
    },
  },
}
</script>

<style scoped lang="less">
  .authPasswordOperateResult-box{
    .line1{
      color: #000000;
      font-size: 18px;
      font-weight: 500;
      margin-top: 26px;
      text-align: center;
    }
    .line2{
      margin: 18px 0 46px 0;
      text-align: center;
      color: #000000;
      font-size: 14px;
      span{
        color: #0A87F8;
      }
    }
    .line3{
      margin: 0 auto;
      width: 180px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #ffffff;
      background: #0A87F8;
      border-radius: 5px;
    }
  }
</style>