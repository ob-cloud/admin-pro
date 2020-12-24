<template>
  <div class="batchOverdraftSetResult-box">
    <div style="text-align: center;">
      <span v-if="coldWaterCheckedCount"><span style="color: #0A87F8;font-size: 16px;font-weight: 500">{{coldWaterCheckedCount}}</span>个冷水表</span>
      {{coldWaterCheckedCount>0&&hoteWaterCheckedCount>0?'和':''}}
      <span v-if="hoteWaterCheckedCount"><span style="color: #0A87F8;font-size: 16px;font-weight: 500">{{hoteWaterCheckedCount}}</span>个热水表</span>
      正在设置<span style="color: #111111;font-weight: 500">新透支额度</span>
    </div>
    <div style="text-align: center;color: #777777;margin-top: 16px;">
      一般需要5-30分钟，请耐心等待！或者在5分钟后刷新列表查看
    </div>
    <div style="height: 45px;">
    </div>
    <div @click="closeThis()" style="margin:0 auto;width: 180px;text-align:center;height: 40px;line-height:40px;background: #0A87F8;color:#ffffff;border-radius: 5px;">关闭</div>
  </div>
</template>

<script>
export default {
  name: "batchOverdraftSetResult",
  props: {
    selectedRowKeys:{
      type:Array,
      required:true,
    },
    coldWaterCheckedCount:{
      type:Number,
    },
    hoteWaterCheckedCount:{
      type:Number,
    },
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    closeThis(){
      this.$emit('closeThis');
    },
  }
}
</script>

<style scoped lang="less">
.batchOverdraftSetResult-box{
  padding-top: 50px;
  height: 266px;
}
</style>