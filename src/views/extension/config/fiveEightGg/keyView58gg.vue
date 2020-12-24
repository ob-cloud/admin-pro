<template>
  <div class="keyView58gg-box">
    <div class="warnningStyle clearfix cursor">
      <div class="f-fl" style="width: 24px;margin:0 12px 0 20px;height: 90px;padding-top: 14px;">
        <icon-font type="icontongzhi"/>
      </div>
      <div class="f-fl" style="padding: 9px 20px 9px 0;font-size: 12px;width: calc(100% - 56px);">
        <div style="width: 100%;">私钥和公钥信息请复制保存在本地；</div>
        <div style="width: 100%;">复制公钥前往58品牌公寓馆后台管理系统(<span class="cursor" @click="handlePreview('https://house.58.com/index')" style="color: #0A87F8;" >https://house.58.com/index</span>)生成相应</div>
        <div style="width: 100%;">的Appid信息， </div>
        <div style="width: 100%;">与此私钥配套使用(此私钥在系统内绑定账号时填入)</div>
      </div>
    </div>
    <div class="contentStyle">
      <div style="width: 100%">
        <div class="clearfix" style="font-size:16px;height:38px;line-height:38px;background:rgba(247,248,251,1);border-radius:4px 4px 0px 0px;padding-left: 10px;border:1px solid rgba(238,238,238,1);">
          <div class="f-fl" style="color: #111111;">私钥</div>
          <div @click="_copy(privateKey)" class="f-fr cursor" style="margin-right: 20px;color: #0A87F8;font-size: 16px;">复制</div>
          <div class="f-fr" style="width:1px;height:24px;background-color: #EEEEEE;margin-right: 20px;margin-top: 7px;"></div>
        </div>
        <div style="background:rgba(255,255,255,1);border-radius:0px 0px 4px 4px;border:1px solid rgba(238,238,238,1);border-top:none;padding: 12px 10px 18px;">
          {{privateKey?privateKey:'-'}}
        </div>
      </div>
      <div style="width: 100%;margin-top: 30px;">
        <div class="clearfix" style="font-size:16px;height:38px;line-height:38px;background:rgba(247,248,251,1);border-radius:4px 4px 0px 0px;padding-left: 10px;border:1px solid rgba(238,238,238,1);">
          <div class="f-fl" style="color: #111111;">公钥</div>
          <div @click="_copy(publicKey)" class="f-fr cursor" style="margin-right: 20px;color: #0A87F8;font-size: 16px;">复制</div>
          <div class="f-fr" style="width:1px;height:24px;background-color: #EEEEEE;margin-right: 20px;margin-top: 7px;"></div>
        </div>
        <div style="background:rgba(255,255,255,1);border-radius:0px 0px 4px 4px;border:1px solid rgba(238,238,238,1);border-top:none;padding: 12px 10px 18px;">
          {{publicKey?publicKey:'-'}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {promotionGetOpensslKey} from '@/api/extension';
export default {
  name: "keyView58gg",
  data() {
    return {
      privateKey:'',
      publicKey:''
    }
  },
  created() {
    this.promotionGetOpensslKey();
  },
  methods: {
    promotionGetOpensslKey(){
      promotionGetOpensslKey().then(res => {
        if (res&&res.code === "200") {
          if(res.data){
            this.privateKey = res.data.privateKey;
            this.publicKey = res.data.publicKey;
          }
        }
      })
    },
    handlePreview(val) {
      window.open(val);
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
  .keyView58gg-box{
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    .warnningStyle{
      height: 90px;
      color: #FFA036;
      background: #FFF7EE;
      svg{
        width: 24px;
        height: 24px;
        vertical-align: -0.25em;
      }
    }
    .contentStyle{
      padding: 20px 20px 36px;
    }
  }
</style>