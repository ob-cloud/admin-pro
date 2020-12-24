<template>
  <div class="viewPassword-box clearfix">
    <div v-if="!pwd">
      <div class="loading-center-absolute" style="margin: 0 auto">
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
    <div v-if="brand==0&&pwd">
      <div class="des" style="margin-top: 56px;font-weight: 500;">{{fullAddress}}</div>
      <div class="password" style="margin: 13px 0 49px 0;">{{ pwd }}</div>
      <div class="buttonStyle cursor" @click="closeThis()" style="margin: 0 auto">关闭</div>
      <div style="height: 40px;"></div>
    </div>
    <div v-if="(brand==1||brand==2)&&pwd">
      <div class="password" style="margin-top: 49px;">{{ pwd }}</div>
      <div class="des" style="margin: 13px 0 50px 0;">密码失效时间：{{$moment(expiredTime).format('YYYY.MM.DD HH:mm')}}</div>
      <div class="buttonStyle cursor" @click="closeThis()" style="margin: 0 auto">关闭</div>
      <div style="height: 40px;"></div>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/smartDevices";

export default {
  name: "viewPassword",
  components: {
  },
  props: {
    brand:{
      type : Number,
      required : true,
    },
    fullAddress:{
      type: String,
    },
    lockId: {
      type: String,
      required : true,
    },
  },
  data() {
    return {
      pwd:'',
      expiredTime:''
    }
  },
  created() {
    this.getPassword();
  },
  mounted() {

  },
  methods: {
    getPassword(){
      if(this.brand==1||this.brand==2){
        API.doorLockGetTempPwd({id:this.lockId}).then(res => {
          if(res.code === '200'){
            this.pwd = res.data.pwd;
            this.expiredTime = res.data.expiredTime;
          }
        });
      }
      if(this.brand == 0){
        API.doorLockPwdView({id:this.lockId}).then(res => {
          if(res.code === '200'){
            this.pwd = res.data;
          }
        });

      }
    },
    closeThis(){
      this.$emit('closeThis');
    },
  },
  filters: {
  }
}
</script>

<style scoped lang="less">
  .viewPassword-box{
    min-height: 260px;
    .des{
      color: #111111;
      font-size: 16px;
      text-align: center;
    }
    .password{
      color: #000000;
      font-size: 28px;
      font-weight: 500;
      text-align: center;
    }
    .buttonStyle{
      width: 180px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #0A87F8;
      border-radius: 5px;
      color: #ffffff;
      font-size: 14px;
    }
    .loading-center-absolute{
      padding-top:80px;
      height: 50px;
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
  }
</style>