<template>
    <div class="setCc-box">
        <div class="setCc-title">
            <span class="big-title">抄送人设置</span><span class="small-title">(非必填项)</span>
        </div>
        <div style="min-height: 100px">
            <dept-user-multiple :selectIdList="ccPeopleIdList" :selectNameList="ccPeopleNameList"  @selectChange="setCc" placeholderName="请选择抄送人" :selectInputStyle="'width:481px;min-height:34px;padding:6px 0 0 0'" :currentInputInputStyle="'height:28px'" :currentSelectStyle="'width:481px;'"></dept-user-multiple>
        </div>
        <div class="clearfix" style="width: 100%;margin-top:45px;">
            <div class="buttonDiv f-fr">
                <a-button size="large" @click="cancelSet" class="formItemMarginButton cancelFont">
                    取消
                </a-button>
                <a-button size="large" @click="confirmSet" type="primary" class="formItemMarginButton saveFont">
                    保存
                </a-button>
            </div>
        </div>
    </div>
</template>

<script>
    import DeptUserMultiple from '@/components/DeptEmployeeTree/deptUserMultiple';
    export default {
        name: "setCc",
        components: {
            DeptUserMultiple,
        },
        props: {
            ccPeopleIdList:{
                type: Array,
            },
            ccPeopleNameList:{
                type: Array,
            },
        },
        data() {
            return {
                currentSelectId:[],
                currentSelectName:[],
            }
        },
        watch: {
        },
        created: function () {
        },
        methods: {
            setCc(currentSelectId,currentSelectName){
                this.currentSelectId = currentSelectId;
                this.currentSelectName = currentSelectName;
            },
            cancelSet(){
                this.$emit('cancelSet');
            },
            confirmSet(){
                this.$emit('successSet',this.currentSelectId,this.currentSelectName);
            },
        }
    }
</script>

<style lang="less" scoped>
    .setCc-box{
        padding: 20px;
        .setCc-title{
            margin: 5px 0;
            .big-title{
                color: #333333;
                font-size: 18px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                line-height:25px;
            }
            .small-title{
                color: #777777;
                font-size:14px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                line-height:20px;
                margin-left: 5px;
            }
        }
        .buttonDiv {
            .formItemMarginButton {
                width: 120px;
                height: 40px;
                margin-left: 18px;
            }
            .cancelFont {
                color: #666666;
            }
            .saveFont {
                color: #FFFFFF;
                background-color: #0A87F8;
            }
        }
    }

</style>