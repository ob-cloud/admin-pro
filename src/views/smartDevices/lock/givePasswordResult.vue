<template>
  <div class="givePasswordResult-box">
    <div class="addressStyle">
      <icon-font type="iconfangyuan1" style="margin-right: 5px;" />{{address}}
    </div>
    <div class="resultStyle">
      <div class="item clearfix" v-for="(item) in result">
        <div class="item1 f-fl">{{item.roomName=='大门'?item.roomName:item.roomName+'间'}}</div>
        <div class="item2 f-fl" v-if="item.isSucceed==1">
          <div class="line1">{{item.pwd}}</div>
          <div class="line2"><icon-font type="icon1-yumengtubiao_shijian" style="margin-right: 5px;" />{{$moment(item.startTime).format('YYYY.MM.DD HH:mm')}} - {{$moment(item.endTime).format('YYYY.MM.DD HH:mm')}}</div>
        </div>
        <div class="flex failStyle f-fl" v-else style="width: 412px;height: 68px;padding:0 10px;">
          <p>密码授权失败：{{ item.failMsg }}</p>
        </div>
      </div>
    </div>
    <div class="clearfix">
      <div class="f-fl" style="color:#FFA036;font-size: 13px;height: 40px;line-height: 40px; ">
        <a-icon type="exclamation-circle" style="color: #FFA036;margin-right: 5px;font-size: 14px;" />密码生效预计需要1分钟，请在1分钟后开门
      </div>
      <div class="closeStyle f-fr cursor" @click="closeThis">
        关闭
      </div>
    </div>
    <div style="height: 14px;">
    </div>
  </div>
</template>

<script>
export default {
  name: "givePasswordResult",
  components: {
  },
  props: {
    result:{
      type:Array,
      required:true,
    },
    address:{
      type:String,
      required: true,
    },
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
    closeThis(){
      this.$emit('closeThis');
    },
  },
  filters: {
  },
  watch:{
    result(val){
      this.result = val;
    },
  }
}
</script>

<style scoped lang="less">
  .givePasswordResult-box{
    padding: 20px;
    .addressStyle{
      font-size: 14px;
      color: #111111;
    }
    .resultStyle{
      margin: 25px 0 65px 0;
      .item{
        width: 480px;
        height: 68px;
        background: #FFFFFF;
        box-shadow: 0px 0px 10px 0px rgba(119, 119, 119, 0.1);
        border-radius: 4px;
        border: 1px solid #F4F4F4;
        .item1{
          width: 66px;
          height: 66px;
          line-height: 66px;
          text-align: center;
          color: #0a87f8;
          background: #E6F3FE;
          border-radius: 4px 0px 0px 4px;
          font-size: 16px;
          font-weight: 600;
        }
        .item2{
          padding: 12px 0 12px 20px;
          .line1{
            color: #111111;
            font-size: 16px;
            font-weight: 600;
          }
          .line2{
            color: #777777;
            font-size: 12px;
            i{
              vertical-align: -0.1em;
            }
          }
        }
        .failStyle{
          color: #FB4246;
          font-size: 16px;
        }
        .flex{
          /*flex 布局*/
          display: flex;
          /*实现垂直居中*/
          align-items: center;
        }
      }
    }
    .closeStyle{
      width: 180px;
      height: 40px;
      line-height: 40px;
      background: #0A87F8;
      border-radius: 5px;
      text-align: center;
      color: #ffffff;
    }
  }
</style>