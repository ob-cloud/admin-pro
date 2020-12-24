<template>
    <div class="walletWarning-box">
        <div class="title">独立门店钱包负责人绑定须知</div>
        <div class="content">
            <div class="cont-tit">
                请仔细阅读并理解以下条款，继续为对立门店开设钱包知即视为您已完全理解以下内容：
            </div>
            <div class="cont-item">
                1、您知晓，绑定为门店钱包负责人后，该门店账户下的全部资金（包括但不限于现有资金及未来可能产生的资金）仅可通过该负责人或由该负责人指定相应的人员来充值、提现、转账。
            </div>
            <div class="cont-item">
                2、您确认，您提交的负责人各项信息均真实、准确、有效、合法、完整，因您的原因（包括但不限于提供的信息不真实、不准确、无效、不完整或损害第三方合法权益）造成的一切风险或损失均由您自行承担。
            </div>
            <div class="cont-item">
                3、您确认并授权该负责人管理、使用该门店钱包账户，确认并委托该负责人代为收取该门店账户下全部资金。您清楚，该负责人在授权范围内的行为导致的一切后果均由您承担。
            </div>
            <div class="cont-item">
                4、您理解，为该部门绑定负责人后，您需督促该负责人仔细阅读并严格履行《本平台服务协议》等寓盟平台规则的全部内容。否则，您需承担因该负责人的违规/违约行为导致的一切后果。
            </div>
        </div>
        <div class="footer cursor" @click="closeThis">我知道了</div>
    </div>
</template>

<script>
export default {
    name: 'serviceAgreement',
    components: {},
    props: {
    },
    data() {
        return {};
    },
    created() {
    },
    methods: {
        closeThis(){
            this.$emit('closeThis');
        },
    },
    watch: {
    }
};
</script>

<style lang="less" scoped>
.walletWarning-box {
    width: 100%;
    max-height: calc(100vh - 100px);
    .title{
        margin-bottom: 34px;
        color: #111111;
        font-size:22px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        text-align: center;
    }
    .content{
        max-height: calc(100vh - 210px);
        overflow: auto;
        padding:25px 5px 100px 5px;
        color: #111111;
        font-size: 14px;
        line-height: 20px;
        .cont-item{
            font-size: 14px;
            margin-top: 25px;
        }
        .cont-tit{
            font-size: 16px;
            font-weight: 500;
            color: #333333;
        }
    }
    .footer{
        text-align: center;
        margin-top: 20px;
        color: #0A87F8;
        font-size: 18px;
    }
}
</style>

