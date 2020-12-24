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
import {electricMeterOperationResult} from "@/api/smartDevices";
export default {
  name: "loading",
  props: {
    resultDesc:{
      type:String,
      required:true
    },
    resultData:{
      type:Object,
      required:true,
    },
    resultType:{
      type:Number,
      required:true,
    },
  },
  data() {
    return {
      timer:null,
      result:0,
      seconds:30,
    }
  },
  created() {
  },

  mounted(){
    this.timer = setInterval(() => {
      setTimeout(this.getElectricMeterOperationResult, 0)
    }, 3000);
  },
  methods: {
    //30秒每秒调接口
    getElectricMeterOperationResult(){
      if(this.result == 2){
        this.$emit('setSuccess',this.resultType);
        //防止继续调用
        return ;
      }
      if(this.seconds == 0){
        this.$emit('setFailure',this.resultType);
        //防止继续调用
        return ;
      }
      this.seconds = this.seconds - 3;
      electricMeterOperationResult(this.resultData).then(res=>{
        if(res.code === '200'){
          //1：处理中；2：成功；3：失败
          this.result = res.data.result;
        }
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
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