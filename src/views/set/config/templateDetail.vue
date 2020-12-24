<template>
    <!-- 轮播附件预览 -->
    <div class="template-detail-content">
        <div class="txt" v-html="templateHtml"></div>
    </div>
</template>
<script>
export default {
  name: 'templateDetail',
  props: {
      templateTxt: {
          type: String
      },
  },
  data() {
    return {
        visible:false,
        templateHtml:'',
    };
  },
  components: {  },
  created() {
      this.templateHtml = this.templateTxt;
  },
  mounted() {},
  methods: {
  },
  watch: {}
};
</script>
<style  scoped lang='less'>
    .template-detail-content{
        width: 100%;
        height: calc(100vh - 120px);
        overflow:auto;
        .txt {
            margin: 0 auto;
            width: 90%;
        }
        /deep/ p {
            display: block;
            -webkit-margin-before: 1em;
            -webkit-margin-after: 1em;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
        }
        /deep/ h2 {
            display: block;
            font-size: 1.5em;
            -webkit-margin-before: 0.83em;
            -webkit-margin-after: 0.83em;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
            font-weight: bold;
        }
        /deep/ h3 {
            display: block;
            font-size: 1.17em;
            -webkit-margin-before: 1em;
            -webkit-margin-after: 1em;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
            font-weight: bold;
        }
        /deep/ h4 {
            display: block;
            -webkit-margin-before: 1.33em;
            -webkit-margin-after: 1.33em;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
            font-weight: bold;
        }
    }
</style>
