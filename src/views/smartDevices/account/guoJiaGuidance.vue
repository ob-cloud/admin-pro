<template>
  <div class="guoJiaGuidance">
      <div class="title">秘钥获取流程</div>
      <div class="content" style="margin-top: 18px;">
        <div class="content-follow clearfix">
          <div class="content-follow-left f-fl">
            <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">1</div>
            <div class="content-follow-left-line" style="height: 420px;"></div>
          </div>
          <div class="content-follow-right f-fl">
            <div style="width: 673px;color: #111111;font-size: 14px;margin-top: 2px;">
              登录火河官网直接登录进入客户中心
            </div>
            <div style="width: 100%">
              <div class="clearfix" style="width: 600px;height:38px;line-height:38px;background:rgba(247,248,251,1);border-radius:4px;padding-left: 10px;margin-top: 12px;">
                <div class="f-fl">http://www.huohetech.com</div>
                <div @click="_copy('http://www.huohetech.com')" class="f-fr cursor" style="margin-right: 20px;color: #0A87F8;font-size: 16px;">复制</div>
                <div class="f-fr" style="width:1px;height:24px;background-color: #EEEEEE;margin-right: 20px;margin-top: 7px;"></div>
              </div>
            </div>
            <div class="cursor" style="width: 100%;margin: 10px 0 40px 0;" @click="handlePreview(1)">
              <img style="width: 600px;height: 319px;" src="https://oss.byteox.com/byteox/2020-09-08/f033637cc7024607b99c0b5b372f2f74.png">
            </div>
          </div>
        </div>
        <div class="content-follow clearfix">
          <div class="content-follow-left f-fl">
            <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">2</div>
            <div class="content-follow-left-line" style="height: 390px;"></div>
          </div>
          <div class="content-follow-right f-fl">
            <div style="margin-top: 2px;">
              <span style="color: #111111;font-size: 14px;">点击申请开通PaaS系统</span>
              <span style="color: #777777;font-size: 12px;margin-left: 5px;">（点击申请开通PaaS系统）</span>
            </div>
            <div class="cursor" style="width: 100%;margin: 10px 0 40px 0;" @click="handlePreview(2)">
              <img style="width: 600px;height: 341px;" src="https://oss.byteox.com/byteox/2020-09-08/c6db4bed508d491faca9c8cb625d9f4d.png">
            </div>
          </div>
        </div>
        <div class="content-follow clearfix">
          <div class="content-follow-left f-fl">
            <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">3</div>
            <div class="content-follow-left-line" style="height: 250px;"></div>
          </div>
          <div class="content-follow-right f-fl">
            <div style="width: 673px;color: #111111;font-size: 14px;margin-top: 2px;">
              开通PaaS系统后，再次进入PaaS系统
            </div>
            <div class="cursor" style="width: 100%;margin: 10px 0 40px 0;" @click="handlePreview(3)">
              <img style="width: 800px;height: 235px;" src="https://oss.byteox.com/byteox/2020-09-08/c28c8c0c8a364faaa86cf21dbc306367.png">
            </div>
          </div>
        </div>
        <div class="content-follow clearfix">
          <div class="content-follow-left f-fl">
            <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">4</div>
          </div>
          <div class="content-follow-right f-fl">
            <div style="width: 100%;color: #111111;font-size: 14px;margin-top: 2px;">
              弹窗提示“下发短信验证码给，账户注册手机号”，点击确定；填写收到的验证码信息进行验证即可查看账号密钥
            </div>
            <div class="cursor" style="width: 100%;margin: 10px 0 20px 0;" @click="handlePreview(4)">
              <img style="width: 800px;height: 1339px;" src="https://oss.byteox.com/byteox/2020-09-08/0a2f8ecaf7384a3abf444677c48a1e39.png">
            </div>
          </div>
        </div>
      </div>
      <div class="footer cursor" @click="closeThis">我知道了</div>
  </div>
</template>

<script>
export default {
  name: "openGuidance58",
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
    handlePreview(val) {
      let url='';
      if(val==1){
        url = 'https://oss.byteox.com/byteox/2020-09-08/f033637cc7024607b99c0b5b372f2f74.png';
      }
      else if(val==2){
        url = 'https://oss.byteox.com/byteox/2020-09-08/c6db4bed508d491faca9c8cb625d9f4d.png';
      }
      else if(val==3){
        url = 'https://oss.byteox.com/byteox/2020-09-08/c28c8c0c8a364faaa86cf21dbc306367.png';
      }
      else if(val==4){
        url = 'https://oss.byteox.com/byteox/2020-09-08/0a2f8ecaf7384a3abf444677c48a1e39.png';
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
  .guoJiaGuidance{
    width: 100%;
    height: calc(100vh - 100px);
    padding: 0 0px 0 20px;
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