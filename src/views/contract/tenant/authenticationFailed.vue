<template>
    <div class="authenticationFailed-info">
        <div class="f-clearfix">
            <div class="f-fl left-box">
                <p class="cursor" @click="goReturn(0)">返回修改证件号
                    <icon-font type="iconyumengtubiao_fanhui" />
                </p>
            </div>
            <div class="f-fl right-box">
                <p class="title1">实名认证失败</p>
                <p class="title2">可能原因</p>
                <p class="title3">1、身份证号输入有误</p>
                <p class="title3">2、姓名和身份证号不匹配</p>
                <p class="title3">3、手机号非该身份证号办理</p>
                <p class="title4 cursor" @click="goReturn(1)">继续签约</p>
                <p class="title5">
                    <icon-font type="iconyumengtubiao_tishi" />签署合同将自动跳过实名认证，请线下打印该合同并签字留存</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    props: {

    },
    computed: {
    },
    data() {
        return {


        };
    },
    created() {

    },
    methods: {
        goReturn(val) {
            this.$emit('closeThis', val);
        }
    },
    watch: {
    }
};
</script>

<style lang="less" scoped>
// @import url("../../../assets/css/color.less");
.authenticationFailed-info {
    height: 100%;
    width: 100%;
    font-size: 14px; // padding: 1px 20px 0 20px;
    position: relative;
    .left-box {
        margin: 60px 0 121px 96px;
        width: 420px;
        height: 420px;
        background: url("../../../assets/login/failure.png") no-repeat;
        >p {
            width: 150px;
            height: 25px;
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(10, 135, 248, 1);
            line-height: 25px;
            position: relative;
            ;
            top: 340px;
            left: 132px;
        }
    }
    .right-box {
        margin: 60px 0 0 60px;
        width: 420px;
        height: 420px;
        .title1 {
            width: 144px;
            height: 33px;
            font-size: 24px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(17, 17, 17, 1);
            line-height: 33px;
            margin-top: 74px;
        }
        .title2 {
            width: 72px;
            height: 25px;
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(119, 119, 119, 1);
            line-height: 25px;
            margin-top: 40px;
        }
        .title3 {
            width: 240px;
            height: 25px;
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(17, 17, 17, 1);
            line-height: 25px;
            margin-top: 17px;
        }
        .title4 {
            margin-top: 70px;
            width: 120px;
            height: 40px;
            background: rgba(10, 135, 248, 1);
            border-radius: 5px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 40px;
            text-align: center;
        }
        .title5 {
            width: 350px;
            height: 17px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 160, 54, 1);
            line-height: 17px;
            margin-top: 16px;
        }
    }
}
</style>
