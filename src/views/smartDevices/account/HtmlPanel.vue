<template>
  <div class="HtmlPanel-box">
    <iframe ref="iframe" id="show-iframe" frameborder="0" scrolling="yes" style="background-color:transparent; width: 100%;
          top: 0;left:0;bottom:0;height: calc(100vh - 150px);" :src='url'
             >
    </iframe>
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
  },
  data () {
    return {
    }
  },
  watch: {
    url () {
    },
  },
  created() {
    let _this = this;
    window.addEventListener('message', function (e) {
      _this.$emit('authSuccess');
    }, false);
  },
  mounted () {

  },
  methods: {
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