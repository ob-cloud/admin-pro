<template>
  <div class="openGuidanceXy-box">
      <div class="title">贝壳租房开通流程</div>
      <div class="content" style="margin-top: 18px;">
        <div class="content-follow clearfix">
          <div class="content-follow-left f-fl">
            <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">1</div>
            <div class="content-follow-left-line" style="height: 40px;"></div>
          </div>
          <div class="content-follow-right f-fl">
            <div style="color: #111111;font-size: 14px;margin-top: 2px;">
              开通贝壳广厦账号
            </div>
            <div style="height: 40px;width: 100%">
            </div>
          </div>
        </div>
        <div class="content-follow clearfix">
          <div class="content-follow-left f-fl">
            <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">2</div>
            <div class="content-follow-left-line" style="height: 40px;"></div>
          </div>
          <div class="content-follow-right f-fl">
            <div style="color: #111111;font-size: 14px;margin-top: 2px;">
              在贝壳缴纳保证金
            </div>
            <div style="height: 40px;width: 100%">
            </div>
          </div>
        </div>
        <div class="content-follow clearfix">
          <div class="content-follow-left f-fl">
            <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">3</div>
            <div class="content-follow-left-line" style="height: 40px;"></div>
          </div>
          <div class="content-follow-right f-fl">
            <div style="color: #111111;font-size: 14px;margin-top: 2px;">
              联系贝壳BD人员获取 "appId" 和 "appKey" 信息
            </div>
            <div style="height: 40px;width: 100%">
            </div>
          </div>
        </div>
        <div class="content-follow clearfix">
          <div class="content-follow-left f-fl">
            <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">4</div>
          </div>
          <div class="content-follow-right f-fl">
            <div style="color: #111111;font-size: 14px;margin-top: 2px;">
              在'管理系统'申请开通页面输入已有信息
            </div>
            <div style="height: 88px;width: 100%">
            </div>
          </div>
        </div>
      </div>
      <div class="footer cursor" @click="closeThis">我知道了</div>
  </div>
</template>

<script>
export default {
  name: "openGuidanceXy",
  components: {
  },
  props: {
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
  },
  watch: {
  },
}
</script>

<style lang="less" scoped>
  .openGuidanceXy-box{
    width: 100%;
    max-height: calc(100vh - 100px);
    padding: 0 18px 0 20px;
    overflow: auto;
    .content{
      color: #111111;
      font-size: 14px;
      line-height: 20px;
      width: 100%;
      .content-follow{
        width: 100%;
        .content-follow-left{
          width: 24px;
          .radius-font {
            width: 24px;
            height: 24px;
            line-height: 24px;
            border-radius: 50%;
            font-size:16px;
            text-align: center;
          }
          .content-follow-left-line{
            margin: 0 0 0 12px;
            height: 47px;
            border-left: 0.5px dashed #AED4F5;
          }
        }
        .content-follow-right{
          margin-left: 10px;
          .follow-right-line-one{
            .name{
              font-size: 14px;
              color: #111111;
              font-weight:400;
            }
            .date{
              color: #777;
              font-size: 12px;
            }
          }
          .follow-right-line-two{
            font-size: 13px;
            color: #999999;
          }
          .follow-info{
            margin-top: 6px;
            width: 269px;
            min-height: 29px;
            line-height:29px;
            background-color: rgba(247,248,251,1);
          }
          .viewStyle{
            margin-left: 30px;
            i{
              vertical-align: -0.25em;
            }
            svg{
              width: 16px;
              height: 16px;
            }
          }
        }
      }
    }
    .title{
      margin-bottom: 24px;
      color: #111111;
      font-size:22px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      text-align: center;
    }
    .footer{
      text-align: center;
      margin-top: 20px;
      color: #0A87F8;
      font-size: 18px;
    }
  }
</style>