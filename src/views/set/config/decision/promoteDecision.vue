<template>
    <div class="promote-decision-box">
        <div class="source">
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">空置房源自动上架</div>
            </div>
            <div class="describe">
                新录房源及房源状态变更为"空置"(包含租客合同退租、手动变更房源状态)，该房源自动上架到自有平台及第三方平台
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="promote1.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="promote1.onOff==0" @click="changeResrource(promote1,1)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="promote1.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="promote1.onOff==1" @click="changeResrource(promote1,0)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(promote1)">
                    保存
                </a-button>
            </div>
        </div>
    </div>
</template>

<script>
    import  * as API from '@/api/decision';
    export default {
        name: "resourceDecision",
        components: {
        },
        props: {
            storeDeptId: {
                type: String,
            },
        },
        data() {
            return {
                promote1:{},
                promoteDefault1:{
                    onOff:false,
                    value:'',
                    module:'MARKETING',
                    mark:'VACANT_HOUSE_AUTO_PUSH',
                    bizPoint:'PROMOTE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'空置房源自动上架',
                },
            }
        },
        created: function () {
            this.initDecisionList();
        },
        methods: {
            changeResrource(data,val){
                data.onOff = val;
                if(val == 0){
                    data.value = '';
                }
            },
            save(data){
                //开启的带输入框的要求必填值
                if((data.chooseType == 5&&data.onOff==1)||data.chooseType == 1){
                    if(!data.value){
                        this.$message.warning('请输入必填项');
                        return;
                    }
                }
                //设置分店id
                data.storeId = this.storeDeptId;
                if(data.id){
                    API.decisionEdit(data).then(res => {
                        if (res.code === '200') {
                            this.$message.info('修改成功');
                        }
                        this.initDecisionList();
                    });
                }else{
                    API.decisionAdd(data).then(res => {
                        if (res.code === '200') {
                            this.$message.info('添加成功');
                        }
                        this.initDecisionList();
                    });
                }
            },
            initDecisionList(){
                let parameter = {
                    module: 'MARKETING',
                    storeId:this.storeDeptId,
                };
                API.decisionList(parameter).then(res => {
                    if (res.code === '200') {
                        this.promote1 = Object.assign({},this.promoteDefault1);
                        if(res.data && res.data.length > 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                //房源相关
                                if(res.data[i].mark == 'VACANT_HOUSE_AUTO_PUSH'){
                                    this.promote1 = res.data[i];
                                }
                            }
                        }
                    }
                });
            },
        },
        watch:{
            storeDeptId() {
                this.initDecisionList();
            },
        },
    }
</script>

<style scoped lang="less">
    .source{
        .title{
            width: 100%;
            .blueStyle{
                width:4px;
                height:16px;
                background:rgba(10,135,248,1);
                border-radius:2px;
            }
            .titleFont{
                height:16px;
                line-height: 16px;
                font-size:16px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:#111111;
                margin-left: 10px;
            }
        }
        .describe{
            margin: 10px 20px 0 14px;
            padding-left: 5px;
            min-height:34px;
            line-height: 34px;
            background:rgba(247,248,251,1);
            color: #777777;
        }
        .checkBox{
            margin: 14px 0 0 14px;
            .allCheck{
                height: 24px;
                line-height: 24px;
            }
            .checked{
                color: #0A87F8;
                .iconSize{
                    width: 16px;
                    height: 16px;
                }
            }
            .fontStyle{
                margin-left: 8px;
                height:24px;
                font-size:14px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:#111111;
                line-height:24px;
            }
            .inputStyleDiv {
                margin-left: 15px;
                font-size: 12px;
                .mustFill{
                    color:#FB4246;
                    margin-left: 4px;
                }
            }
            .inputStyle {
                width: 56px;
                height: 24px;
            }
            .margin50{
                margin-left: 50px;
            }
            /deep/ .ant-input{
                padding: 4px 5px;
                font-size: 12px;
            }
        }
        .saveButton{
            margin: 20px 0 20px 14px;
            .formItemMarginButton{
                width:100px;
                height:28px;
                background:rgba(10,135,248,1);
                border-radius:4px;
                color: #FFFFFF;
            }
        }
        .line{
            margin: 0 20px 20px 14px;
            height:1px;
            border: 1px dashed #DDDDDD;
        }
    }
</style>