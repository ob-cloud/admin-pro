<template>
    <div class="content-main">
        <div class="content">
            <slot></slot>
        </div>
        <div class="footer">
            <p>
                <a href="https://saas.52ejia.cn/#/login" target="_blank" v-if="GlobalConfig.SYSTEM_NAME=='壹家管家'">壹家官网</a>
                <a href="https://www.byteox.com/" target="_blank" v-else>寓盟官网</a>
                <icon-font type="iconyumengtubiao_zijieniulogo"/>
              <a href="https://saas.52ejia.cn/#/login" target="_blank" v-if="GlobalConfig.SYSTEM_NAME=='壹家管家'">帮助文档</a>
              <a href="http://help.byteox.com/" target="_blank" v-else>帮助文档</a>
            </p>
            <p>
                Copyright  © 由字节牛科技提供技术支持
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="less">
    .content-main{
        padding: 20px;
        height: calc(100vh - 100px);
        overflow: auto;
        .content{
            min-height: calc(100vh - 220px);
            overflow: auto;
            padding: 20px;
            background-color: #ffffff;
        }
        .footer{
            margin-top: 20px;
            text-align: center;
            color: @secondaryFontColor;
            p{
                height: 30px;
                line-height: 30px;
            }
            a{
                color: @secondaryFontColor;
            }
            i{
                margin: 0 30px;
                font-size: 22px;
            }
        }
    }
</style>
