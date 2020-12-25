<template>
  <div class="HtmlPanel-box" @mousemove="getLoadUrl()">
    <iframe id="show-iframe" frameborder="0" scrolling="yes" style="background-color:transparent; width: 100%;
          top: 0;left:0;bottom:0;height: calc(100vh - 150px);" :src='url'
             >
    </iframe>
    <div style="width: 100%;position: absolute;top:398px;" v-if="signedSuccessFlag">
      <div class="cursor" @click="goToWithdraw" style="border-radius:5px;margin:0 auto;text-align: center;width: 160px;
      height: 40px;line-height:40px;color: #ffffff;font-size: 14px;background:rgba(10,135,248,0.01);"></div>
    </div>
  </div>
</template>
<style>
</style>
<script>
export default{
  // 使用时请使用 :url.sync=""传值
  props: {
    url: {
      required: true
    },
    accountId:{
      type:String,
      required:true,
    },
  },
  data () {
    return {
      signedSuccessFlag:false,
    }
  },
  watch: {
    url () {
    },
  },
  created() {
  },
  mounted () {
  },
  methods: {
    getLoadUrl(){
      let iframeSrc = document.getElementById("show-iframe").src;
      if(iframeSrc.indexOf('walletSign')>-1){
        this.signedSuccessFlag = true;
      }
    },
    goToWithdraw(){
      this.$emit('signedSuccess');
    },
  },

}
</script>

<style scoped lang="less">
.HtmlPanel-box{
  min-height: calc(100vh - 150px);
  overflow-y: auto;
  position: relative;
}
</style>