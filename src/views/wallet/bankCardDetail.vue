<template>
    <div class="bankCardDetail-box">
        <div class="titleStyle" style="margin-top: 4px;">持卡人信息</div>
        <div style="margin-top: 13px;"><span class="fontStyle1">持卡人姓名：</span><span class="fontStyle2">{{bankCardDetail.cardholder}}</span></div>
        <div style="margin-top: 14px;"><span class="fontStyle1">持卡人身份证号：</span><span class="fontStyle2">{{bankCardDetail.idCardNo}}</span></div>
        <div class="titleStyle" style="margin-top: 28.5px;">银行卡信息</div>
        <div style="margin-top: 13px;"><span class="fontStyle1">银行卡号：</span><span class="fontStyle2">{{bankCardDetail.bankCardNo}}</span></div>
        <div style="margin-top: 14px;"><span class="fontStyle1">开 户 行：</span><span class="fontStyle2">{{bankCardDetail.bankName}}</span></div>
        <div style="margin-top: 14px;"><span class="fontStyle1">支 行：</span><span class="fontStyle2">{{bankCardDetail.branchBankName}}</span></div>
        <div style="margin-top: 14px;"><span class="fontStyle1">银行卡预留手机号：</span><span class="fontStyle2">{{bankCardDetail.bankReservedPhone}}</span></div>
        <div style="margin-top: 14px;"><span class="fontStyle1">银行卡有效期：</span><span class="fontStyle2">{{bankCardDetail.validThru?bankCardDetail.validThru:'-'}}</span></div>
        <div class="clearfix" style="width: 100%;padding:60px 0px 0px 0;">
            <div class="buttonDiv f-fr">
                <a-button size="large" type="primary" :loading="saveLoading" class="formItemMarginButton saveFont" @click="unBindBankCard">
                    解绑
                </a-button>
            </div>
        </div>
    </div>
</template>

<script>
    import * as API from  '@/api/wallet';
    export default {
        name: "bankCardDetail",
        components: {

        },
        props: {
            id:{
                type:String,
                required:true,
            }
        },
        data() {
            return {
                bankCardDetail:{
                },
                saveLoading:false,
            }
        },
        created() {
            this.bankCardView();
        },
        methods: {
            bankCardView(){
                API.bankCardView({id:this.id}).then(res => {
                    if (res.code == 200) {
                        this.bankCardDetail = res.data;
                    }
                });
            },
            unBindBankCard(){
                let _this =this;
                let item = this.bankCardDetail;
                this.$modal.confirm({
                    title: '确定要解绑 「' + item.bankName + ' (' + item.bankCardNo + ')」吗？',
                    content: '解绑后，不可恢复，请谨慎操作',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        _this.saveLoading = true;
                        API.bankCardUnBind({id:item.id}).then(res => {
                            if(!res){
                                _this.saveLoading = false;
                            }
                            if (res.code == 200) {
                                _this.$message.success('解绑成功！');
                                _this.saveLoading = false;
                                _this.$emit('successUnBind');
                            }
                            else{
                                _this.$message.success('解绑失败！');
                                _this.saveLoading = false;
                            }
                        });
                    },
                    onCancel() {
                        // console.log('Cancel');
                    },
                });
            },
        }
    }
</script>

<style scoped lang="less">
    .bankCardDetail-box{
        padding: 20px;
        .titleStyle{
            font-size: 18px;
            font-weight: 500;
            color: #111111;
        }
        .fontStyle1{
            color: #777777;
            font-size: 14px;
        }
        .fontStyle2{
            color: #111111;
            font-size: 14px;
        }
        .buttonDiv {
            .formItemMarginButton {
                width: 120px;
                height: 40px;
                margin-left: 18px;
                border: none;
            }
            .saveFont {
                color: #FFFFFF;
                background-color: #F27476;
            }
        }
    }
</style>