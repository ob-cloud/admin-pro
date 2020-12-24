<template>
    <div class="promote-default-box">
        <a-empty description="没有可配置的信息" style="margin-top: 75px;"></a-empty>
    </div>
</template>

<script>
    export default {
        name: "promoteDefault"
    }
</script>

<style scoped lang="less">
    .promote-default-box{
        /deep/ .ant-empty-description{
            color: #BBBBBB;
        }
    }
</style>