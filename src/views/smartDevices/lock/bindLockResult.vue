<template>
  <div class="bindLockResult-box">
    <div class="bindLockResult-box-line1">
      成功绑定<span style="color: #0A87F8;">{{bindLockResult.successTotal}}</span>套房源，<span style="color: #FB4246;">{{bindLockResult.failTotal}}</span>套绑定失败
    </div>
    <div class="buttonStyle cursor" @click="viewFailHouseList()" v-if="bindLockResult.failTotal">查看绑定失败的房源</div>
    <div class="buttonStyle cursor" @click="closeThis()" v-else>关闭</div>
    <div style="height: 68px;">
    </div>
  </div>
</template>

<script>
export default {
  name: "bindLockResult",
  components: {

  },
  props: {
    bindLockResult: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  created() {

  },
  methods: {
    closeThis(){
      this.$emit('closeThis');
    },
    viewFailHouseList(){
      this.$emit('viewFailHouseList');
    },
  }
}
</script>

<style scoped lang="less">
  .bindLockResult-box{
    .bindLockResult-box-line1{
      margin: 59px 0 39px;
      color: #111111;
      font-size: 16px;
      text-align: center;
    }
    .buttonStyle{
      margin: 0 auto;
      width: 180px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #ffffff;
      background: #0A87F8;
      border-radius: 5px;
    }
  }
</style>