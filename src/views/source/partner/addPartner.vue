<template>
    <div class="addPartnerBox">
        <div class="assign-user-detail">
            <div style="width: 100%"><span class="font1">根据企业号检索企业信息&nbsp;&nbsp;&nbsp;</span><span class="font2">(企业号是企业的唯一标识,请向管理员索要企业号)</span></div>
            <div style="width: 100%;margin-top: 10px">
                <label-item >
                    <div class="u-bottom-border normalWidth">
                        <a-input placeholder="请输入企业号" v-model="partnerTenantId" maxlength="8" @keyup.native="searchCheckAndGetName"/>
                    </div>
                </label-item>
            </div>
            <div v-if="partnerTenantId">
                <div v-if="partnerName" class="partnerName">{{partnerName}}</div>
                <div v-if="!partnerName" class="warning">未找到相关企业，请检查企业号输入是否正确</div>
            </div>
        </div>
        <div class="buttonDiv">
            <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelAddPartner">
                取消
            </a-button>
            <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="addPartner">
                保存
            </a-button>
        </div>
    </div>
</template>

<script>
    import  * as API from '@/api/source';
    export default {
        name: "assignUser",
        components: {
        },
        data() {
            return {
                partnerName:'',
                partnerTenantId:'',
                partnerBizMode:'',
            }
        },
        methods: {
            cancelAddPartner(){
                this.$emit('cancelAddPartner');
            },
            addPartner(){
                let sendData={
                    partnerName:this.partnerName,
                    partnerTenantId:this.partnerTenantId,
                    partnerBizMode:this.partnerBizMode,
                };
                API.resourcePartnerAdd(sendData).then(res=>{
                    if (res.code === '200') {
                        this.$message.success('添加成功');
                    } else {
                        this.$message.success('添加失败');
                    }
                    this.$emit('cancelAddPartner');
                })
            },
            searchCheckAndGetName() {
                if (this.partnerTenantId.length == 8) {
                    API.checkAndGetName(this.partnerTenantId).then(res => {
                            if(res === undefined){
                                this.partnerName = '';
                            }
                            if (res.code === '200') {
                                this.partnerName = res.data.name;
                                this.partnerBizMode =res.data.bizMode;
                            }
                        }
                    );
                } else {
                    this.partnerName = '';
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .addPartnerBox{
        position:relative;
        height: 270px;
        .assign-user-detail {
            margin:20px 20px 0 20px;
            .font1{
                color: #333333;
                font-size: 14px;
            }
            .font2{
                color: #FFA036;
                font-size: 12px;
            }
            .partnerName{
                margin-top: 10px;
                color: #0A87F8;
                font-size: 14px;
                width: 100%;
            }
            .warning{
                margin-top: 10px;
                color: #FB4246;
                font-size: 12px;
                width: 100%;
            }
        }
        .buttonDiv {
            position: absolute;
            bottom: 0px;
            right: 20px;
            height: 75px;
            .formItemMarginButton {
                width: 120px;
                height: 40px;
                margin-left: 18px;
                margin-top: 15px;
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
