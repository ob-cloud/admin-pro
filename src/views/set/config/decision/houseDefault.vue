<template>
    <div class="house-default-box">
        <a-empty description="没有可配置的信息" style="margin-top: 75px;"></a-empty>
    </div>
</template>

<script>
    export default {
        name: "houseDefault"
    }
</script>

<style scoped lang="less">
    .house-default-box{
        /deep/ .ant-empty-description{
            color: #BBBBBB;
        }
    }
</style>