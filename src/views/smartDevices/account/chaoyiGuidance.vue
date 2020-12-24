<template>
  <div class="chaoYiGuidance">
      <div class="title">超仪账号绑定流程</div>
      <div class="content clearfix" style="margin-top: 18px;">
        <div class="header">
          <div class="header1">绑定超仪设备账号</div>
          <div class="header2" style="margin-top: 12px;">1、获取超仪应用ID和应用密钥</div>
          <div class="header2" style="margin: 8px 0 19px 0;">2、绑定推送地址<span style="color: #777777;font-size: 13px;">(通知地址)</span></div>
        </div>
        <div class="content-follow clearfix" style="padding-top: 22px;">
          <div class="content-follow-left f-fl">
            <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">1</div>
            <div class="content-follow-left-line" style="height: 1250px;"></div>
          </div>
          <div class="content-follow-right f-fl">
            <div style="margin-top: 2px;">
              <span style="color: #111111;font-size: 16px;font-weight: 600;">获取超仪应用ID和应用密钥</span>
            </div>
            <div class="clearfix" style="margin-top: 12px;">
              <div class="f-fl" style="width: 18px;height: 18px;background: #E3F3FF;border-radius: 50%;">
                <div class="f-fl" style="width: 9px;height: 9px;background: #FFFFFF;border-radius: 50%;margin: 4.5px 0 0 4.5px;"></div>
              </div>
              <span style="color: #111111;font-size: 14px;margin-left: 4px;font-weight: 400;">登录超仪合一智能抄表系统</span>
            </div>
            <div style="width: 100%;margin-left: 20px;">
              <div class="clearfix" style="width: 600px;height:38px;line-height:38px;background:rgba(247,248,251,1);border-radius:4px;padding-left: 10px;margin-top: 12px;">
                <div class="f-fl">https://amr.metx.com.cn/</div>
                <div @click="_copy('https://amr.metx.com.cn/')" class="f-fr cursor" style="margin-right: 20px;color: #0A87F8;font-size: 16px;">复制</div>
                <div class="f-fr" style="width:1px;height:24px;background-color: #EEEEEE;margin-right: 20px;margin-top: 7px;"></div>
              </div>
            </div>
            <div class="cursor" style="width: 100%;margin: 10px 0 20px 20px;" @click="handlePreview(1)">
              <img style="width: 600px;height: 425px;" src="https://oss.byteox.com/byteox/vlayhlva/2/31a14bfe88d34d3c80a6093e3972314b.png">
            </div>
            <div class="clearfix" style="margin: 2px 0 0 0px;">
              <div class="f-fl" style="width: 18px;height: 18px;background: #E3F3FF;border-radius: 50%;">
                <div class="f-fl" style="width: 9px;height: 9px;background: #FFFFFF;border-radius: 50%;margin: 4.5px 0 0 4.5px;"></div>
              </div>
              <span style="color: #111111;font-size: 14px;margin-left: 4px;">进入【系统管理 - 应用设置】查看应用ID和应用密钥</span>
            </div>
            <div class="cursor" style="width: 100%;margin: 10px 0 20px 20px;" @click="handlePreview(2)">
              <img style="width: 638px;height: 269px;" src="https://oss.byteox.com/byteox/vlayhlva/2/7808965e839a4ff99def7d9a99ffc961.png">
            </div>
            <div class="clearfix" style="margin: 2px 0 0 18px;">
              <div class="f-fl" style="width: 18px;height: 18px;background: #E3F3FF;border-radius: 50%;">
              </div>
              <span style="color: #111111;font-size: 14px;margin-left: 4px;">没有应用时，创建应用获取相应的应用ID和应用密钥</span>
            </div>
            <div class="cursor" style="width: 100%;margin: 10px 0 20px 20px;" @click="handlePreview(3)">
              <img style="width: 600px;height: 300px;" src="https://oss.byteox.com/byteox/vlayhlva/2/dd3fcc486fdf469cbe4f1a58763b32ec.png">
            </div>
            <div class="clearfix">
              <div class="f-fl" style="width: 18px;height: 18px;background: #E3F3FF;border-radius: 50%;">
                <div class="f-fl" style="width: 9px;height: 9px;background: #FFFFFF;border-radius: 50%;margin: 4.5px 0 0 4.5px;"></div>
              </div>
              <span style="color: #111111;font-size: 14px;margin-left: 4px;">进入【系统管理 - 应用设置】查看应用ID和应用密钥</span>
            </div>
          </div>
        </div>
        <div class="content-follow clearfix">
          <div class="content-follow-left f-fl">
            <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">2</div>
          </div>
          <div class="content-follow-right f-fl">
            <div style="width: 673px;color: #111111;font-size: 16px;margin-top: 2px;font-weight: 600;">
              绑定推送地址<span style="color: #777777;font-size: 14px;font-weight: 400;">(通知地址)</span>
            </div>
            <div class="clearfix" style="margin: 12px 0 0 0px;">
              <div class="f-fl" style="width: 18px;height: 18px;background: #E3F3FF;border-radius: 50%;">
                <div class="f-fl" style="width: 9px;height: 9px;background: #FFFFFF;border-radius: 50%;margin: 4.5px 0 0 4.5px;"></div>
              </div>
              <span style="color: #111111;font-size: 14px;margin-left: 4px;">进入【系统管理 - 推送地址】设置推送地址</span>
            </div>
            <div style="width: 100%;margin-left: 20px;">
              <div class="clearfix" style="width: 600px;height:38px;line-height:38px;background:rgba(247,248,251,1);border-radius:4px;padding-left: 10px;margin-top: 12px;">
                <div class="f-fl">https://gw.yumeng.work/isc/joy/event_callback</div>
                <div @click="_copy('https://gw.yumeng.work/isc/joy/event_callback')" class="f-fr cursor" style="margin-right: 20px;color: #0A87F8;font-size: 16px;">复制</div>
                <div class="f-fr" style="width:1px;height:24px;background-color: #EEEEEE;margin-right: 20px;margin-top: 7px;"></div>
              </div>
            </div>
            <div class="cursor" style="width: 100%;margin: 10px 0 40px 20px;" @click="handlePreview(4)">
              <img style="width: 600px;height: 312px;" src="https://oss.byteox.com/byteox/vlayhlva/2/8b1651bc6d394a1f8dae493f6cabf71d.png">
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
        url = 'https://oss.byteox.com/byteox/vlayhlva/2/31a14bfe88d34d3c80a6093e3972314b.png';
      }
      else if(val==2){
        url = 'https://oss.byteox.com/byteox/vlayhlva/2/7808965e839a4ff99def7d9a99ffc961.png';
      }
      else if(val==3){
        url = 'https://oss.byteox.com/byteox/vlayhlva/2/dd3fcc486fdf469cbe4f1a58763b32ec.png';
      }
      else if(val==4) {
        url = 'https://oss.byteox.com/byteox/vlayhlva/2/8b1651bc6d394a1f8dae493f6cabf71d.png';
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
  .chaoYiGuidance{
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
      .header{
          .header1{
            font-size: 18px;
            font-weight: 600;
            color: #111111;
          }
          .header2{
            font-size: 16px;
            font-weight: 400;
            color: #111111;
          }
          border-bottom:10px solid #F6F7F8;
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