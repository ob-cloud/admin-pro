<template>
    <div class="rate-clean">
        <div class="rate clearfix">
            <div class="f-fl font">评价星级</div>
            <div class="f-fl star">
                <a-rate v-model="parData.star" />
            </div>
        </div>
        <div class="rate clearfix">
            <div class="f-fl font">是否已解决</div>
            <div class="f-fl solve clearfix">
                <div class="f-fl"><a-checkbox v-model="solved" @change="onChangeSolved">已解决</a-checkbox></div>
                <div class="f-fl"><a-checkbox v-model="unSolve" @change="onChangeUnSolve">未解决</a-checkbox></div>
            </div>
        </div>
        <label-item
                class="item u-bottom-border"
                style="width: 480px;margin: 10px 0 70px 20px"
                title="评价内容"
                :valLength="parData.appraiseContent.length"
                :maxSize="200"
        >
            <a-textarea v-model="parData.appraiseContent"
                        maxlength="200"
                        placeholder="请输入"
                        :autosize="{ minRows: 1, maxRows: 5 }"
            />
        </label-item>
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
import  * as API from '@/api/workorder';

export default {
    components: {
    },
    props: {
        cleanId:{
            type: String,
            required: true
        },
    },
    data() {
        return {
            parData: {
                id: '',              //保洁id
                appraiseContent:'',    //评价内容
                star:5,                //评价星级：数字几就是几星
                appraiseIsSolve:1,      //评价结果：是否解决【0、否，1、是】
            },
            unSolve:false,
            solved:true,
        };
    },
    created() {
    },
    methods: {
        onChangeUnSolve(e) {
            if(e.target.checked){
                this.parData.appraiseIsSolve = 0;
                this.solved = false;
            }
            else{
                this.parData.appraiseIsSolve = 1;
                this.solved = true;
            }
        },
        onChangeSolved(e) {
            if(e.target.checked){
                this.parData.appraiseIsSolve = 1;
                this.unSolve = false;
            }
            else{
                this.parData.appraiseIsSolve = 0;
                this.unSolve = true;
            }
        },
        save() {
            this.parData.id = this.cleanId;
            let data = JSON.parse(JSON.stringify(this.parData));
            API.cleanAppraise(data).then(res => {
                if (res.code === "200") {
                    this.$message.success('评价成功！');
                    this.$emit('successRate');
                }
                else{
                    this.$message.error('评价失败！');
                }
            })

        },
        cancelSave() {
            this.$emit('cancelRate');
        }
    },
    filters: {
    },
    watch: {
    }
};
</script>

<style lang="less" scoped>
.rate-clean
{
    height: 100%;
    width: 100%;
    position: relative;
    .rate{
        margin: 15px 0 0 20px;
        .font{
            font-size:14px;
            font-weight:500;
            color: #777777;
            height: 30px;
            line-height: 30px;
        }
        .star{
            margin-left: 40px;
        }
        .solve{
            margin-left: 30px;
            width: 300px;
        }
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
