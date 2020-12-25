<template>
  <div class="oneKeyPutSuccess-box">
    <div class="line-1" v-if="oneKeyPutType==1">
      <span class="line-font1">{{total}}</span>
      <span>套房源正在上架至</span>
      <span class="line-font3">{{selectedPlatformName}}</span>
      <span>平台</span>
    </div>
    <div class="line-1" v-if="oneKeyPutType==2">
      <span class="line-font1">{{total}}</span>
      <span>套房源正在从</span>
      <span class="line-font3">{{selectedPlatformName}}</span>
      <span>平台下架</span>
    </div>
    <div class="line-2">
      一般在 2 小时内，请耐心等待...
    </div>
    <div class="line-3" v-if="oneKeyPutType==1">
      或者在 5分钟后操作同步发布状态，查看上架信息
    </div>
    <div class="line-3" v-if="oneKeyPutType==2">
      或者在 5分钟后操作同步发布状态，查看下架信息
    </div>
    <div class="line-4 cursor" @click="confirm()">
      确定
    </div>
  </div>
</template>

<script>
export default {
  name: "oneKeyPutSuccess",
  components: {
  },
  props: {
    oneKeyPutType: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
    },
    selectedPlatformName:{
      type:String,
    },
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
    confirm(){
      this.$emit('colseThis');
    },
  },
  filters: {
  },
}
</script>

<style lang="less" scoped>
  .oneKeyPutSuccess-box{
    padding: 30px;
    .line-1{
      margin-top: 9px;
      text-align: center;
      color: #111111;
      font-size: 16px;
      .line-font1{
        font-weight: 500;
      }
      .line-font3{
        font-size: 18px;
        margin: 0 5px;
        font-weight: 500;
      }
    }
    .line-2{
      color: #111111;
      font-size: 14px;
      margin-top: 10px;
      text-align: center;
    }
    .line-3{
      color: #777777;
      font-size: 14px;
      margin: 20px 0 50px 0;
      text-align: center;
    }
    .line-4{
      margin: 0 auto;
      text-align: center;
      width:120px;
      height:40px;
      line-height: 40px;
      background:rgba(10,135,248,1);
      border-radius:5px;
      color: #ffffff;
      font-size: 14px;
    }
  }
</style>