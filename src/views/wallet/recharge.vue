<template>
   <div class="recharge-box">
        <div class="qrCodeStyle1">
            <img  :src="QRCode" alt="">
        </div>
       <div class="qrCodeStyle2 clearfix">
           <icon-font class="f-fl" type="iconzhifubao" style="margin-right: 10px;color: #25ABEE;"></icon-font>
           <icon-font class="f-fl"  type="iconweixin" style="margin-right: 10px;color: #5FC058;"></icon-font>
           <div class="fontStyle f-fl">使用支付宝，微信扫码支付</div>
       </div>
       <div class="iRechargedStyle cursor" @click="rechargeSuccess">
           我已充值
       </div>
   </div>
</template>

<script>
    export default {
        name: "recharge",
        props: {
            QRCode: {
                type: String,
                required: true,
            },
        },
        methods: {
            rechargeSuccess(){
                this.$emit('rechargeSuccess');
            },
        }
    }
</script>

<style lang="less" scoped>
    .recharge-box{
        padding-top: 51px;
        .qrCodeStyle1{
            margin: 0 auto;
            width:300px;
            height:300px;
            border:1px dashed rgba(187,187,187,1);
            img{
                width: 298px;
                height: 298px;
            }
        }
        .qrCodeStyle2{
            margin: 20px 0 0 120px;
            svg{
                width: 35px;
                height: 35px;
            }
            .fontStyle{
                font-size: 16px;
                font-weight: 500;
                height: 35px;
                line-height: 35px;
            }
        }
        .iRechargedStyle{
            margin-top: 37px;
            border-top: 1px solid #EEEEEE;
            height: 60px;
            line-height: 60px;
            font-size: 16px;
            color: #0A87F8;
            font-weight: 500;
            text-align: center;
        }
    }
</style>