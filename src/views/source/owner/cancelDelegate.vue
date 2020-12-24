<template>
    <div class="cancel-repair">
        <div class="title">
            确定要取消客户「{{infoData.name}}-{{infoData.phone}}」提交的房源委托信息吗？
        </div>
        <div style="height: 100px;margin-bottom: 50px">
            <label-item
                    class="item u-bottom-border"
                    style="width: 480px;margin: 0 0 0 20px"
                    title="取消原因"
                    :valLength="reason.length"
                    :maxSize="200"
            >
                <a-textarea v-model="reason"
                            maxlength="200"
                            placeholder="请输入"
                            :autosize="{ minRows: 1, maxRows: 5 }"
                />
            </label-item>
        </div>
        <div class="foot">
            <a-button size="large" type="primary" html-type="submit" class="btn" @click="save">
                保存
            </a-button>
            <a-button size="large" html-type="submit" class="btn" @click="cancelSave">
                取消
            </a-button>
        </div>
    </div>
</template>

<script>
import  * as API from '@/api/source';

export default {
    components: {
    },
    props: {
        infoData: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            reason:'',
        };
    },
    created() {
    },
    methods: {
        save() {
            let parameter = {
                id:this.infoData.id,
                reason:this.reason,
            };
            API.delegateCancel(parameter).then(res => {
                if (res.code === "200") {
                    this.$message.success('取消成功！');
                }
                else{
                    this.$message.error('取消失败！');
                }
                this.$emit('successCancelDelegate');
            })

        },
        cancelSave() {
            this.$emit('cancelCancelDelegate');
        }
    },
    filters: {
    },
    watch: {
    }
};
</script>

<style lang="less" scoped>
.cancel-repair {
    height: 100%;
    width: 100%;
    position: relative;
    .title{
        margin: 25px 0 20px 20px;
        color: #111111;
        font-size: 16px;
        height: 24px;
        line-height: 24px;
    }
    .foot {
        height: 80px;
        padding: 20px;
        .btn {
            margin-left: 20px;
            width: 120px;
            height: 40px; // background:rgba(10,135,248,1);
            border-radius: 5px;
            float: right;
        }
    }
}
</style>
