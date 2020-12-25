<template>
  <div class="openGuidance58gg-box">
      <div class="title">查看58品牌公寓馆"公寓ID/Appid</div>
      <div class="content" style="margin-top: 18px;">
        <div class="content-follow clearfix">
          <div class="content-follow-left f-fl">
            <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">1</div>
            <div class="content-follow-left-line" style="height: 98px;"></div>
          </div>
          <div class="content-follow-right f-fl">
            <div style="width: 673px;color: #111111;font-size: 14px;margin-top: 2px;">
              复制地址进入58品牌公寓馆后台管理系统并登录
            </div>
            <div style="width: 100%">
              <div class="clearfix" style="width: 600px;height:38px;line-height:38px;background:rgba(247,248,251,1);border-radius:4px;padding-left: 10px;margin-top: 12px;">
                <div class="f-fl">https://house.58.com/index</div>
                <div @click="_copy('https://house.58.com/index')" class="f-fr cursor" style="margin-right: 20px;color: #0A87F8;font-size: 16px;">复制</div>
                <div class="f-fr" style="width:1px;height:24px;background-color: #EEEEEE;margin-right: 20px;margin-top: 7px;"></div>
              </div>
            </div>
            <div style="height: 30px;width: 100%">
            </div>
          </div>
        </div>
        <div class="content-follow clearfix">
          <div class="content-follow-left f-fl">
            <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">2</div>
            <div class="content-follow-left-line" style="height: 379px;"></div>
          </div>
          <div class="content-follow-right f-fl">
            <div style="width: 100%;color: #111111;font-size: 14px;margin-top: 2px;">
              登录成功后，进入 '基本信息' 选择 'API信息' 模块，获取公寓ID
            </div>
            <div class="cursor" style="width: 100%;margin: 10px 0 20px 0;" @click="handlePreview(1)">
              <img style="width: 600px;height: 339px;" src="https://oss.byteox.com/byteox/2020-08-18/ff245ac3a4dc4b7abb00d2dbee5b87bb.png">
            </div>
          </div>
        </div>
        <div class="content-follow clearfix">
          <div class="content-follow-left f-fl">
            <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">3</div>
          </div>
          <div class="content-follow-right f-fl">
            <div style="width: 100%;color: #111111;font-size: 14px;margin-top: 2px;">
              <span>填写标题和公钥获取Appid信息</span>
              <span class="viewStyle cursor" style="color: #0A87F8;" @click="keyView58ggDialog=true;"><icon-font type="iconyumengtubiao_yanjing-1" ></icon-font> 查看公钥</span>
            </div>
            <div class="cursor" style="width: 100%;margin: 10px 0 30px 0; " @click="handlePreview(2)">
              <img style="width: 600px;height: 341px;" src="https://oss.byteox.com/byteox/2020-08-18/30cb98f32d0e4aadb43ade8a39022360.png">
            </div>
          </div>
        </div>
      </div>
      <div class="footer cursor" @click="closeThis">我知道了</div>
    <!-- 验收工单 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="keyView58ggDialog" class="ownModalBorder titDialog" title="查看公/私钥" @cancel="keyView58ggDialog=false;">
      <key-view58gg></key-view58gg>
    </a-modal>
  </div>
</template>

<script>
import keyView58gg from './keyView58gg'
export default {
  name: "openGuidance58",
  components: {
    keyView58gg,
  },
  props: {
  },
  data() {
    return {
      keyView58ggDialog:false,
    }
  },
  created() {
  },
  methods: {
    handlePreview(val) {
      let url='';
      if(val==1){
        url = 'https://oss.byteox.com/byteox/2020-08-18/ff245ac3a4dc4b7abb00d2dbee5b87bb.png';
      }
      else if(val==2){
        url = 'https://oss.byteox.com/byteox/2020-08-18/30cb98f32d0e4aadb43ade8a39022360.png';
      }
      window.open(url);
    },
    closeThis(){
      this.$emit('closeThis');
    },
    _copy(txt){
      var oInput = document.createElement('input');
      oInput.value =  txt ;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand('Copy'); // 执行浏览器复制命令
      oInput.className = 'oInput';
      oInput.style.display = 'none';
      this.$message.info('复制成功');
    },
  },
  watch: {
  },
}
</script>

<style lang="less" scoped>
  .openGuidance58gg-box{
    width: 100%;
    height: calc(100vh - 100px);
    padding: 0 18px 0 20px;
    .levelStyle{
      padding: 20px 0 20px 30px;
      width:920px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 15px 0px rgba(184,184,184,0.1);
      border-radius:8px;
      border:1px solid rgba(246,247,251,1);
    }
    .content{
      color: #111111;
      font-size: 14px;
      line-height: 20px;
      width: 100%;
      height: calc(100vh - 206px);
      overflow: auto;
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
  ::-webkit-scrollbar{
    width: 2px;
  }
</style>