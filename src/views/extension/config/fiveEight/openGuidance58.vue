<template>
  <div class="openGuidance58-box">
    <div class="title">58租房开通流程</div>
    <div class="openGuidance58-content">
      <div class="levelStyle" style="padding: 16.5px 0 20px 30px;">
        <div style="font-size: 18px;color: #111111;font-weight: 500;">绑定账号</div>
        <div style="font-size: 14px;margin-top: 9px;">
          <span style="color: #111111;">输入58租房平台账号、密码、授权码等信息开通绑定账号</span>
          <span style="color: #777777;">(若还未有58租房平台推广账号，可以联系当地58、安居客的城市助理)</span>
        </div>
      </div>
      <div class="levelStyle" style="margin-top: 20px;">
        <div style="font-size: 18px;color: #111111;font-weight: 500;">获取clientId和clientSecret(秘钥)流程</div>
        <div class="content" style="margin-top: 18px;">
          <div class="content-follow clearfix">
            <div class="content-follow-left f-fl">
              <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">1</div>
              <div class="content-follow-left-line" style="height: 318px;"></div>
            </div>
            <div class="content-follow-right f-fl">
              <div style="width: 720px;color: #111111;font-size: 14px;margin-top: 2px;height: 38px;">打开58经纪人房产开放平台（https://hugopenapi.58.com/openapi?qnumber=esf_openapi_authorization_code#/）；登录58经纪人房产开放平台</div>
              <div style="width: 100%">
                <div class="clearfix" style="width: 670px;height:38px;line-height:38px;background:rgba(247,248,251,1);border-radius:4px;padding-left: 10px;margin-top: 12px;">
                  <div class="f-fl">https://hugopenapi.58.com/openapi?qnumber=esf_openapi_authorization_code#/</div>
                  <div @click="_copy('https://hugopenapi.58.com/openapi?qnumber=esf_openapi_authorization_code#/')" class="f-fr cursor" style="margin-right: 20px;color: #0A87F8;font-size: 16px;">复制</div>
                  <div class="f-fr" style="width:1px;height:24px;background-color: #EEEEEE;margin-right: 20px;margin-top: 7px;"></div>
                </div>
              </div>
              <div class="cursor" style="padding-top: 10px;height: 240px;" @click="handlePreview(5)">
                <img style="width: 670px;height: 230px;" src="https://oss.byteox.com/byteox/2020-08-16/b6b6563e39f9466fbecf25bca39343ba.png">
              </div>
              <div style="height: 30px;width: 100%">
              </div>
            </div>
          </div>
          <div class="content-follow clearfix">
            <div class="content-follow-left f-fl">
              <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">2</div>
              <div class="content-follow-left-line" style="height: 415px;"></div>
            </div>
            <div class="content-follow-right f-fl">
              <div style="width: 100%;color: #111111;font-size: 14px;margin-top: 2px;">
                登录后，点击上面菜单栏密钥管理，点击申请
              </div>
              <div class="cursor" style="width: 100%;margin: 10px 0 20px 0;" @click="handlePreview(6)">
                <img style="width: 670px;height: 375px;" src="https://oss.byteox.com/byteox/2020-08-16/a6bdf116ec74468d82d0049f9669dc91.png">
              </div>
            </div>
          </div>
          <div class="content-follow clearfix">
            <div class="content-follow-left f-fl">
              <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">3</div>
            </div>
            <div class="content-follow-right f-fl">
              <div style="width: 100%;color: #111111;font-size: 14px;margin-top: 2px;">获取提供的clientId和clientSecret(秘钥)</div>
              <div class="cursor" style="width: 100%;margin: 10px 0 10px 0; " @click="handlePreview(7)">
                <img style="width: 670px;height: 499px;" src="https://oss.byteox.com/byteox/2020-08-16/8554e75ccc014c23850561cbdf4afc4c.png">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="levelStyle" style="margin-top: 20px;">
        <div style="font-size: 18px;color: #111111;font-weight: 500;position: relative;">
          获取授权码流程
          <div class="cursor" @click="handlePreview(8)" style="position: absolute;right: 30px;top:3px;font-size: 14px;color: #0A87F8;">直接查看58经纪人平台授权码获取流程<icon-font style="margin-left: 5px;" type="iconyumengtubiao_zhishi"/></div>
        </div>
        <div class="content" style="margin-top: 18px;">
          <div class="content-follow clearfix">
            <div class="content-follow-left f-fl">
              <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">1</div>
              <div class="content-follow-left-line" style="height: 358px;"></div>
            </div>
            <div class="content-follow-right f-fl">
              <div style="width: 100%;color: #111111;font-size: 14px;margin-top: 2px;"><span>打开网络门店网址（http://mendian.58ganji.com），登录</span><span style="font-weight: 500;">网络门店公司总账号</span></div>
              <div style="width: 100%">
                <div class="clearfix" style="width: 600px;height:38px;line-height:38px;background:rgba(247,248,251,1);border-radius:4px;padding-left: 10px;margin-top: 12px;">
                  <div class="f-fl">http://mendian.58ganji.com</div>
                  <div @click="_copy('http://mendian.58ganji.com')" class="f-fr cursor" style="margin-right: 20px;color: #0A87F8;font-size: 16px;">复制</div>
                  <div class="f-fr" style="width:1px;height:24px;background-color: #EEEEEE;margin-right: 20px;margin-top: 7px;"></div>
                </div>
              </div>
              <div class="cursor" style="padding-top: 10px;" @click="handlePreview(1)">
                  <img style="width: 600px;height: 280px;" src="https://oss.byteox.com/byteox/2020-08-16/ba6cd5deb6cf4efdaed3c7dd590220ce.png">
              </div>
              <div style="height: 30px;width: 100%">

              </div>
            </div>
          </div>
          <div class="content-follow clearfix">
            <div class="content-follow-left f-fl">
              <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">2</div>
              <div class="content-follow-left-line" style="height: 393px;"></div>
            </div>
            <div class="content-follow-right f-fl">
              <div style="width: 100%;color: #111111;font-size: 14px;margin-top: 2px;">
                登录后，点击左侧菜单中的“开放平台-授权管理”，点击【获取授权码】
              </div>
              <div class="cursor" style="width: 100%;margin: 10px 0 20px 0;" @click="handlePreview(2)">
                <img style="width: 600px;height: 353px;" src="https://oss.byteox.com/byteox/2020-08-16/b9d918f81dab46a89d5e89bfd9d8731e.png">
              </div>
            </div>
          </div>
          <div class="content-follow clearfix">
            <div class="content-follow-left f-fl">
              <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">3</div>
              <div class="content-follow-left-line" style="height: 546px;"></div>
            </div>
            <div class="content-follow-right f-fl">
              <div style="width: 100%;color: #111111;font-size: 14px;margin-top: 2px;">此时会弹出短信验证框，请按引导完成短信验证</div>
              <div class="cursor" style="width: 100%;margin: 10px 0 30px 0; " @click="handlePreview(3)">
                <img style="width: 600px;height: 506px;" src="https://oss.byteox.com/byteox/2020-08-16/c65d28afec134231833dd578dafa09a6.png">
              </div>
            </div>
          </div>
          <div class="content-follow clearfix">
            <div class="content-follow-left f-fl">
              <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">4</div>
            </div>
            <div class="content-follow-right f-fl">
              <div style="width: 100%;color: #111111;font-size: 14px;margin-top: 2px;">验证通过后即可获取到授权码</div>
              <div class="cursor" style="width: 100%;margin: 10px 0 10px 0;" @click="handlePreview(4)">
                <img style="width: 600px;height: 302px;" src="https://oss.byteox.com/byteox/2020-08-16/e3689ca5ff25453da5383aafc8e70ce9.png">
              </div>
            </div>
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
  components: {},
  props: {
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
    handlePreview(val) {
      let url='';
      if(val==1){
        url = 'https://oss.byteox.com/byteox/2020-08-16/ba6cd5deb6cf4efdaed3c7dd590220ce.png';
      }
      else if(val==2){
        url = 'https://oss.byteox.com/byteox/2020-08-16/b9d918f81dab46a89d5e89bfd9d8731e.png';
      }
      else if(val==3){
        url = 'https://oss.byteox.com/byteox/2020-08-16/c65d28afec134231833dd578dafa09a6.png';
      }
      else if(val==4){
        url = 'https://oss.byteox.com/byteox/2020-08-16/e3689ca5ff25453da5383aafc8e70ce9.png';
      }
      else if(val==5){
        url = 'https://oss.byteox.com/byteox/2020-08-16/b6b6563e39f9466fbecf25bca39343ba.png';
      }
      else if(val==6){
        url = 'https://oss.byteox.com/byteox/2020-08-16/a6bdf116ec74468d82d0049f9669dc91.png';
      }
      else if(val==7){
        url = 'https://oss.byteox.com/byteox/2020-08-16/8554e75ccc014c23850561cbdf4afc4c.png';
      }
      else if(val==8){
        url = 'https://hugopenapi.58.com/openapi?qnumber=esf_openapi_authorization_code#/faq?documentId=5ef85667e15f880152ed1209';
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
  .openGuidance58-box{
    width: 100%;
    height: calc(100vh - 100px);
    padding: 0 18px 0 20px;
    .openGuidance58-content{
      height: calc(100vh - 206px);
      overflow: auto;
    }
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