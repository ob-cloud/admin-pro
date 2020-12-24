<template>
    <!-- 注销钱包 -->
    <div class="cancellation-box">
        <div class="line1 clearfix">
            <div class="line1-line1 f-fl"><div style="text-align: center">?</div></div>
            <div class="line1-line2 f-fl">
                <div>确定要注销「{{accountName}}」的钱包账户吗？</div>
            </div>
        </div>
        <div class="line2">
            注销后，本店的线上收款将直接进入上级门店开通的钱包账户 内；且账户不可恢复，请谨慎操作
        </div>
        <div class="line3">
            <div class="line3-line1"><span class="line3-yanzheng">验证信息</span><span class="line3-phone">本账户开通人手机号：{{phoneEncryption}}</span></div>
            <div class="line3-line2" :class="isPass?'border_blue':'border_dddddd'">
                <drag-verify :width="416" :height="38" :handler-icon="handlerIcon" :success-icon="successIcon" text="向右滑动完成验证" success-text="验证通过" background="#FFFFFF" color="#111111" progress-bar-bg="#E6F3FE" completedBg="#E6F3FE" text-size="14px" :circle="false" @passcallback="isPass=true" ref="regVerify"></drag-verify>
            </div>
            <div class="line3-line3">
                <div class="part_value clearfix">
                    <div class="input_wrap f-fl u-no-border">
                        <a-input style="width: 280px;margin-left: 10px;" v-model="verification" maxlength="6" @input.native="phoneChangeVerification" placeholder="请输入验证码"></a-input>
                    </div>
                    <div class="f-fl">
                        <span><a-divider type="vertical" style="height: 24px"/></span>
                    </div>
                    <div class="verification f-fl">
                        <span style="text-align: center" v-if="canGetVerification" :class="isPass?'isPass':''" @click="getVerification">获取验证码</span>
                        <span style="text-align: center" v-else>{{intervalText}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="line4">
            <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelCancellation">
                取消
            </a-button>
            <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="cancellation">
                保存
            </a-button>
        </div>
    </div>
</template>

<script>
    import dragVerify from 'vue-drag-verify';
    import 'font-awesome/css/font-awesome.min.css'
    import * as API from '@/api/wallet';
    export default {
        name: "companyInfo",
        props: {
            accountId: {
                type: String,
                required: true,
            },
            accountName: {
                type: String,
                required: true,
            },
        },
        components: {
            dragVerify,
        },
        data() {
            return {
                verification: '',
                canGetVerification: true,
                countdown: 60,
                intervalText: '60s后重新获取',
                isPass: false,
                handlerIcon: "fa fa-angle-right",
                successIcon: "fa fa-check",
                saveLoading:false,
                phoneEncryption:'',
            };
        },
        created: function () {
            this.waGetOwnerInfo();
        },
        methods: {
            waGetOwnerInfo(){
                API.waGetOwnerInfo(this.accountId).then(res => {
                    if (res.code === '200') {
                        this.phoneEncryption = res.data.phone;
                    }
                });
            },
            resetPhone(phone) {
                var str = String(phone)
                var len = str.length;
                if (len >= 7) {
                    var reg = str.slice(-8, -4)
                    return str.replace(reg, "****")
                } else if (len < 7 && len >= 6) {
                    //1234567
                    var reg = str.slice(-4, -2)
                    return str.replace(reg, "**")
                }
            },
            settime() {
                const _this = this;
                if (_this.countdown == 0) {
                    _this.canGetVerification = true;
                    _this.intervalText = '获取验证码';
                    _this.countdown = 60;
                    return false;
                } else {
                    _this.canGetVerification = false;
                    _this.intervalText = _this.countdown + 's后重新获取';
                    _this.countdown--;
                }
                setTimeout(function() {
                    _this.settime();
                }, 1000);
            },
            // 发送验证码
            getVerification() {
                const _this = this;
                if (!_this.$refs.regVerify.isPassing) {
                    _this.$message.warning('请将滑块拖动到右侧');
                    return;
                } else {
                    if (_this.canGetVerification) {
                        _this.canGetVerification = false;
                        let sendData = {id:_this.accountId};
                        _this.settime();
                        API.waSendCancelVerifyCode(sendData).then(res => {
                            if (res.code === '200') {
                                this.$message.success('短信发送成功，请注意接收！');
                            }
                        });
                    }
                }
            },
            phoneChangeVerification(e){
                e.target.value = e.target.value.replace(/[^\.\d]/g, '');
                this.verification = e.target.value;
            },
            cancellation(){
                if(!this.verification){
                    this.$message.error('请输入验证码');
                    return;
                }
                let sendData ={
                    verifyCode:this.verification,
                    id:this.accountId,
                };
                API.waCancellation(sendData).then(res => {
                    if(!res){
                        this.saveLoading = false;
                    }
                    if (res.code == "200") {
                        this.$message.info('钱包注销成功');
                        this.saveLoading = false;
                        this.$emit('success');
                    } else {
                        this.$message.error('钱包注销成功');
                        this.saveLoading = false;
                    }
                });
            },
            cancelCancellation(){
                this.$emit('cancel');
            },
        },
    };


</script>

<style lang="less" scoped>
    .cancellation-box{
        background:rgba(255,255,255,1);
        width: 520px;
        padding: 20px;
        .line1{
            line-height: 24px;
            .line1-line1{
                width: 22px;
                height: 22px;
                background-color: #FAAD14;
                color: #FFFFFF;
                border-radius: 50%;
            }
            .line1-line2{
                width: 448px;
                padding-left: 10px;
                color: #111111;
                font-size: 16px;
                font-weight: 500;
            }
        }
        .line2{
            width: 100%;
            padding:15px 6px 0 32px;
        }
        .line3{
            width: 448px;
            height: 172px;
            background: #F7F8FB;
            margin: 20px 0 20px 32px;
            padding: 15px;
            .line3-line1{
                .line3-yanzheng{
                    color: #111111;
                    font-weight:400;
                    font-size: 16px;
                }
                .line3-phone{
                    color: #777777;
                    font-weight:400;
                    font-size: 16px;
                    margin-left: 15px;
                }
            }
            .border_blue{
                border: 1px solid #0A87F8;
            }
            .border_dddddd{
                border: 1px solid #DDDDDD;
            }
            .line3-line2{
                margin-top: 12px;
                /deep/ .drag_verify{
                    border-radius: 4px;
                    color: #111111!important;
                }
                /deep/ .drag_verify .dv_handler {
                    width: 40px !important;
                    height: 40px !important;
                    margin-top: -1px;
                    border: 1px solid #dddddd;
                }
                /deep/ .dv_handler_ok_bg {
                    background: #0A87F8!important;
                }
                /deep/ .drag_verify .dv_handler_ok_bg i{
                    color: #FFFFFF;
                }
                /deep/ .dv_text {
                    color: #111111!important;
                }
            }
            .line3-line3 {
                margin-top: 15px;
                width: 418px;
                height: 38px;
                line-height: 38px;
                background-color: #FFFFFF;
                .part_value {
                    .input_wrap {
                        width: 300px;
                    }
                    .verification {
                        height: 38px;
                        line-height: 38px;
                        width: 100px;
                        color: #999999;
                        cursor: pointer;
                        text-align: center;
                    }

                    .isPass {
                        color: #0A87F8;
                    }

                    .eyes_wrap {
                        text-align: right;
                        // padding-right: 30px;
                    }
                }
            }
        }
        .line4 {
            text-align: right;
            .formItemMarginButton {
                width: 120px;
                height: 40px;
                margin-left: 18px;
                margin-top: 20px;
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