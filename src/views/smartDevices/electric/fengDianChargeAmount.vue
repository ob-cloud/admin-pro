<template>
  <!--蜂电充值 -->
  <div class="fengDianChargeAmount-box">
    <div class="line1 clearfix">
      <div class="line1-line1 f-fl"><div style="text-align: center">?</div></div>
      <div class="line1-line2 f-fl">
        充值电量：请登录微信公众号搜索"powerbee蜂电"进行充值
      </div>
    </div>
    <div style="height: 20px;">

    </div>
    <div class="line2">
      请复制保存电表序列号
    </div>
    <div class="line3 clearfix">
      <div class="f-fl">{{fengDianSn}}</div>
      <div class="f-fr cursor" style="margin-right: 10px;color: #0A87F8;" @click="_copy(fengDianSn)">复制</div>
      <div class="f-fr line3-split"></div>
    </div>
    <div style="height: 36px;"></div>
    <div class="buttonStyle cursor" @click="colseThis">
      关闭
    </div>
  </div>
</template>

<script>
export default {
  name: "fengDianChargeAmount",
  props: {
    fengDianSn:{
      type: String,
      required: "",
    },
  },
  components: {

  },
  data() {
    return {}
  },
  created: function () {
  },
  methods: {
    colseThis(){
      this.$emit('colseThis');
    },
    _copy(txt){
      var oInput = document.createElement('input');
      oInput.value = txt;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand('Copy'); // 执行浏览器复制命令
      oInput.className = 'oInput';
      oInput.style.display = 'none';
      this.$message.info('复制成功');
    },
  },
}
</script>

<style lang="less" scoped>
  .fengDianChargeAmount-box{
    padding: 32px 32px 30px 32px;
    .line1{
      height: 24px;
      line-height: 24px;
      .line1-line1{
        width: 22px;
        height: 22px;
        background-color: #FAAD14;
        color: #FFFFFF;
        border-radius: 50%;
      }
      .line1-line2{
        width: calc(100% - 22px);
        padding-left: 16px;
        color: #111111;
        font-size: 16px;
        font-weight: 500;
      }
    }
    .line2{
      margin: 20px 0 0 38px;
      color: #666666;
      font-size: 14px;
    }
    .line3{
      margin: 5px 0 0 38px;
      padding-left: 10px;
      width: 318px;
      height: 30px;
      line-height: 30px;
      background: #E9F1FF;
      border-radius: 2px;
      .line3-split{
        height: 16px;
        margin: 7px 9px 0 0;
        border-left: 1px solid #dddddd;
      }
    }
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