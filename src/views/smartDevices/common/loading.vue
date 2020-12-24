<template>
  <div class="loading-box">
    <div>
      <div class="loading-center-absolute clearfix" style="margin: 0 auto;">
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
      </div>
    </div>
    <div class="warningStyle">{{ resultDesc }}</div>
  </div>
</template>

<script>
export default {
  name: "loading",
  props: {
    resultDesc:{
      type:String,
      required:true
    },
  },
  data() {
    return {
    }
  },
  created() {
  },

  mounted(){
  },
  methods: {
  },
  beforeDestroy() {
  }
}
</script>

<style scoped lang="less">
.loading-box{
  .loading-center-absolute{
    padding-top:38px;
    width: 100px;
    .object {
      width: 6px;
      height: 50px;
      margin-right: 4px;
      background-color: #EEEEEE;
      animation: animate 1s infinite;
      float: left;
      display: block;
    }
    .object:nth-child(10){
      -webkit-animation-delay: 0.9s;
      animation-delay: 0.9s;
    }
    .object:nth-child(9){
      -webkit-animation-delay: 0.8s;
      animation-delay: 0.8s;
    }
    .object:nth-child(8){
      -webkit-animation-delay: 0.7s;
      animation-delay: 0.7s;
    }
    .object:nth-child(7){
      -webkit-animation-delay: 0.6s;
      animation-delay: 0.6s;
    }
    .object:nth-child(6){
      -webkit-animation-delay: 0.5s;
      animation-delay: 0.5s;
    }
    .object:nth-child(5){
      -webkit-animation-delay: 0.4s;
      animation-delay: 0.4s;
    }
    .object:nth-child(4){
      -webkit-animation-delay: 0.3s;
      animation-delay: 0.3s;
    }
    .object:nth-child(3){
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s;
    }
    .object:nth-child(2){
      -webkit-animation-delay: 0.1s;
      animation-delay: 0.1s;
    }
    @-webkit-keyframes animate {
      50% {
        -ms-transform: scaleY(0);
        -webkit-transform: scaleY(0);
        transform: scaleY(0);
      }
    }
    @keyframes animate {
      50% {
        -ms-transform: scaleY(0);
        -webkit-transform: scaleY(0);
        transform: scaleY(0);
      }
    }
  }
  .warningStyle{
    color: #111111;
    font-size: 16px;
    text-align: center;
    padding: 30px 0 36px 0;
  }
}
</style>