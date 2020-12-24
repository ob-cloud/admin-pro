<template>
  <div class="batchProcessResult">
    <div class="numStyle" :class="batchType==3?'numStyle2':'numStyle1'">
      <span>（已选择</span><span style="color: #0A87F8;">「{{ changeCount }}」</span><span>间房源）</span>
    </div>
    <div style="width: 100%;text-align: center;font-size: 16px;color: #111111;font-weight: 500;margin-top: 60px;">
      <span v-if="batchType==1">正在批量修改{{changeCount}}间房源价格</span>
      <span v-if="batchType==2">正在批量修改{{changeCount}}间房源信息</span>
      <span v-if="batchType==3">{{changeCount}}间房源正在转移中</span>
    </div>
    <div style="width: 100%;text-align: center;font-size: 16px;color: #111111;font-weight: 500;margin-top: 10px;">预计需要5分钟，请耐心等待...或5分钟后手动刷新数据查看</div>
    <div style="width: 100%;text-align: center;font-size: 14px;color: #777777;margin-top: 30px;">为保证数据准确性，请勿短时间内重复操作</div>
    <div style="height: 60px;"></div>
    <div class="cursor" @click="goBack" style="margin: 0 auto;width: 100px;background: #0787F8;border-radius: 4px;text-align: center;height: 40px;line-height: 40px;color: #ffffff;">确定</div>
    <div style="height: 40px;"></div>
  </div>
</template>

<script>
export default {
  name: "batchProcessResult",
  props: {
    changeCount:{
      Type:Number,
    },
    batchType:{
      Type:Number,
    },
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
    goBack(){
      this.$emit('goBack');
    },
  },
  filters: {
  }
}
</script>

<style lang="less" scoped>
  .batchProcessResult{
    position: relative;
    .numStyle{
      color: #777777;
      font-size: 12px;
      position: absolute;
      top:-95px;
    }
    .numStyle1{
      left: 154px;
    }
    .numStyle2{
      left: 124px;
    }
  }
</style>