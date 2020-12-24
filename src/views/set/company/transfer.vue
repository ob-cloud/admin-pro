<template>
    <!-- 转让企业 -->
    <div class="transfer-box">
        <div class="line1">用户</div>
        <div class="line2">
            <dept-employee-tree width="100%" @selectChange="selectDept" placement="bottomRight" ref="selectDeptEmp" minWidth="250px" ></dept-employee-tree>
        </div>
        <div class="line3">
            <div class="line3-line1"><span class="line3-yanzheng">验证信息</span><span class="line3-phone">管理员账号：{{phoneEncryption}}</span></div>
            <div class="line3-line2" :class="isPass?'border_blue':'border_dddddd'">
                <drag-verify :width="448" :height="38" :handler-icon="handlerIcon" :success-icon="successIcon" text="向右滑动完成验证" success-text="验证通过" background="#FFFFFF" color="#111111" progress-bar-bg="#E6F3FE" completedBg="#E6F3FE" text-size="14px" :circle="false" @passcallback="isPass=true" ref="regVerify"></drag-verify>
            </div>
            <div class="line3-line3">
                <div class="part_value clearfix">
                    <div class="input_wrap f-fl u-no-border">
                        <a-input style="width: 300px;margin-left: 10px;" v-model="sendData.verifyCode" maxlength="6" @input.native="phoneChangeVerification" placeholder="请输入验证码"></a-input>
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
            你可以将企业转让给企业任意成员，转让后你的角色将变为普通成员，无法再管理当前企业，此操作无法撤销，请谨慎！
        </div>
        <div class="line5">
            <a-button size="large" class="formItemMarginButton cancelFont" @click="cacelTransferCompany">
                取消
            </a-button>
            <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="transferCompany" :loading="saveLoading">
                保存
            </a-button>
        </div>
    </div>
</template>

<script>
    import dragVerify from 'vue-drag-verify';
    import DeptEmployeeTree from '@/components/DeptEmployeeTree';
    import 'font-awesome/css/font-awesome.min.css';
    import { sendVerifyCode } from '@/api/enterprise';
    import * as API from '@/api/setCompany';

    export default {
        name: "companyInfo",
        props: {
            apartmentName: {
                type: String,
                required: "",
            },
            phone: {
                type: String,
                required: "",
            },
        },
        components: {
            DeptEmployeeTree,
            dragVerify,
        },
        data() {
            return {
                canGetVerification: true,
                countdown: 60,
                intervalText: '60s后重新获取',
                isPass: false,
                handlerIcon: "fa fa-angle-right",
                successIcon: "fa fa-check",
                saveLoading:false,
                phoneEncryption:'',
                sendData:{
                    empId:'',
                    verifyCode:'',
                }
            };
        },
        created: function () {
            this.phoneEncryption = this.resetPhone(this.phone);
        },
        methods: {
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
                if (!_this.phone) {
                    this.$message.error('请输入手机号!');
                    return;
                }
                if (!_this.$refs.regVerify.isPassing) {
                    _this.$message.warning('请将滑块拖动到右侧');
                    return;
                } else {
                    const regTel = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                    if (regTel.test(_this.phone)) {
                        if (_this.canGetVerification) {
                            _this.canGetVerification = false;
                            let sendData = _this.phone;
                            _this.settime();
                            sendVerifyCode(sendData).then(res => {
                                if (res.code === '200') {
                                    this.$message.success('短信发送成功，请注意接收！');
                                }
                            });
                        }
                    } else {
                        this.$message.error('手机号有误');
                    }
                }
            },
            phoneChangeVerification(e){
                e.target.value = e.target.value.replace(/[^\.\d]/g, '');
                this.sendData.verifyCode = e.target.value;
            },
            //选择负责人
            selectDept(selectObj) {
                if(selectObj.type == 'employee'){
                    this.sendData.empId = selectObj.id;
                }
            },
            transferCompany(){
                if(!this.sendData.empId){
                    this.$message.error('请选择转让人');
                    return;
                }
                if(!this.sendData.verifyCode){
                    this.$message.error('请输入验证码');
                    return;
                }
                API.organizationTransferEnterprise(this.sendData).then(res => {
                    if (res.code == "200") {
                        this.$message.info('转让成功');
                        sessionStorage.clear();
                        this.$router.go(0);
                    } else {
                        this.$message.error('转让失败');
                        this.saveLoading = false;
                    }
                });
            },
            cacelTransferCompany(){
                this.$emit('cancel');
            },
        },
    };


</script>

<style lang="less" scoped>
.transfer-box{
    background:rgba(255,255,255,1);
    width: 520px;
    padding: 25px 20px 20px 20px;
    overflow: auto;
    .line1{
        color: #777777;
        font-size: 12px;
    }
    .line2{
        width: 100%;
    }
    .line3{
        width: 480px;
        height: 172px;
        background: #F7F8FB;
        margin: 25px 0 20px 0;
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
            width: 450px;
            height: 38px;
            line-height: 38px;
            background-color: #FFFFFF;
            .part_value {
                .input_wrap {
                    width: 320px;
                }
                .verification {
                    height: 38px;
                    line-height: 38px;
                    width: 104px;
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
    .line4{
        color: #111111;
        font-size: 12px;
        padding-bottom: 15px;
    }
    .line5 {
        text-align: right;
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