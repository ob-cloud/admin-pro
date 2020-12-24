<template>
    <div class="imgPre-box">
        <div class="imgShow">
        </div>
        <div class="txt"><div class="templateTxt" v-html="templateTxt"></div></div>
    </div>
</template>

<script>
    export default {
        name: "delegatePre",
        components: {
        },
        props: {
            templateTxt: {
                type: String
            },
        },
        data() {
            return {

            };
        },
        created: function () {
        },
        methods:{

        },
    };
</script>

<style scoped lang="less">
    .imgPre-box{
        width: 520px;
        height:calc(100vh - 10px);
        overflow: auto;
        padding: 30px 95px;
        position: relative;
        .imgShow{
            width: 328px;
            height: 675px;
            background: url("../../../assets/product/delegate_pre.png") no-repeat #F0F4FF;
            background-size: 328px 675px;
        }
        .txt{
            position: absolute;
            top: 120px;
            left: 110px;
            height: 510px;
            width: 300px;
            box-shadow:0px 0px 10px 0px rgba(10,135,248,0.5);
            border-radius:4px;
            border:1px solid rgba(10,135,248,1);
            overflow-x: hidden;
            overflow-y: auto;
            .templateTxt{
                width: 99%;
                margin: 0 auto;
                height: 500px;
            }
        }
    }
</style>