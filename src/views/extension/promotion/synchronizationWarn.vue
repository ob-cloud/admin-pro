<template>
  <div class="oneKeyPutSuccess-box">
    <div class="line-1">
      正在从"{{currentPlatform|formatCurrentPlatform}}平台"同步最新发布状态，请耐心等待返回结果
    </div>
    <div class="line-2">
      取决于上架房源数量，一般在 2 小时内
    </div>
    <div class="line-3 cursor" @click="confirm()">
      关闭
    </div>
  </div>
</template>

<script>
export default {
  name: "oneKeyPutSuccess",
  components: {
  },
  props: {
    currentPlatform: {
      type: Number,
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
    formatCurrentPlatform: function(value) {
       let title = '-';
       if(value==1){
         title = '官网/官微信';
       }
      else if(value==2){
        title = '58租房';
      }
      else if(value==3){
        title = '58品牌公寓馆';
      }
      else if(value==4){
        title = '闲鱼租房';
      }
      else if(value==5){
        title = '贝壳租房';
      }
       return title;
    },
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
    }
    .line-2{
      color: #777777;
      font-size: 14px;
      margin: 19px 0 57px 0;
      text-align: center;
    }
    .line-3{
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