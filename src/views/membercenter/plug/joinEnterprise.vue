<template>
    <div class="joinEnterprise-info">
        <div class="mainBody">
            <div class="leftBg f-fl">
            </div>
            <div class="rightCot f-fr">
                <div class="title">
                    加入企业
                </div>
                <div class="addEnter part">
                    <div class="add_title f-fl">
                        企业号<span class="must">*</span>
                    </div>
                    <div class="part_value f-fl">
                        <a-input v-model="tenantId" maxlength="8" placeholder="请输入企业号" @keyup.native="searchCheckAndGetName"></a-input>
                    </div>
                </div>
                <div class="add-text" v-if="showwarn == 1">企业号是自己的唯一标识，请向管理员或者已经在企业中的成员索要企业号</div>
                <div class="add-text" v-else-if="showwarn == 2">
                        <p style="color:red">未找到企业信息，请核实是否输入错误</p>
                </div>
                <div class="add-text" v-else><p class="companyName" style="color:#0A87F8">{{companyName}}</p></div>
                <div class="part">
                    <div>
                        真实姓名<span class="must">*</span>
                    </div>
                    <div class="part_value u-bottom-border">
                        <a-input maxlength="25" v-model="userName" show-word-limit placeholder="请输入您的姓名"></a-input>
                    </div>
                </div>
                <div class="part">
                    <div>
                        身份证号<span class="must">*</span>
                    </div>
                    <div class="part_value u-bottom-border">
                        <a-input v-model="idCardNo" maxlength="18"  placeholder="请输入您的身份证号"></a-input>
                    </div>
                </div>
                <div class="footer">
                    <div>
                        <a-button :loading="isloading" @click="joinCompany">申请加入</a-button>
                    </div>
                    <div style="clear:both;"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import debounce from 'lodash/debounce';
import {
    checkAndGetName, independentApply
} from '@/api/enterprise';
export default {
    name: 'joinEnterprise',
    components: {},
    props: {
    },
    data() {
        // this.lastFetchId = 0;
        // this.fetchUser = debounce(this.fetchUser, 800);
        return {
            userName: '',
            idCardNo: '',
            remoteLoading: false,
            pwdType: 'password',
            tenantId: '',
            isloading: false,
            showwarn: 1,
            tenantSHow: true,
            companyName: '',
        };
    },
    created() {
        this.empAccountId = this.$ls.get('empAccountId');
    },
    methods: {
        fallback() {
            this.$router.push({
                path: '/enterpriseList'
            });
        },
        searchCheckAndGetName() {
            if (this.tenantId.length == 8) {
                checkAndGetName(this.tenantId).then(res => {
                    if(res === undefined){
                      this.showwarn = 2;
                      this.tenantSHow = false;
                    //   this.tenantId = ''
                    }
                    if (res.code === '200') {
                        this.companyName = res.data;
                        this.tenantSHow = true;
                        if (this.companyName == '') {
                        this.showwarn = 2;
                        } else {
                        this.showwarn = 3;
                        }
                    }
                    
                }

                );
            } else {
                this.companyName = '';
            }
        },
        changeSeePwd() {
            this.eyes = !this.eyes;
            if (this.eyes) {
                this.pwdType = 'text';
            } else {
                this.pwdType = 'password';
            }
        },
        joinCompany() { 
            const _this = this;
            if (this.checkDate()) {
                const sendDate = {
                    name: this.userName,
                    idCardNo: this.idCardNo,
                    password: this.idCardNo,
                    tenantId: this.tenantId,
                    accountId: this.empAccountId
                };
      
                this.isloading = true;
                independentApply(sendDate).then(res => {
                    this.isloading = false;
                    if (res.code === '200') {
                        this.isloading = false;
                        this.$router.push({
                            path: `/enterpriseOk?staus=ok&name=${this.companyName}`
                        });
                    } else {
                        this.isloading = false;
                    }

                });
            }
        },
        checkDate() { 
            if (!this.tenantId || !this.tenantSHow) {
                this.$message.error('请输入企业号!');
                return false;
            }
            if (!this.userName) {
                this.$message.error('请输入您的姓名!');
                return false;
            }
            if (!this.idCardNo) {
                this.$message.error('请输入身份证号!');
                return false;
            } else {
                let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
                if (!reg.test(this.idCardNo)) {
                    this.$message.error('请输入正确身份证号');
                    return false;
                }
            }
            return true;
        }
    },

    watch: {
    }
};
</script>

<style lang="less" scoped>
.joinEnterprise-info {
    width: 100%; //   padding: 0 20px 30px;
    .logo-wrap {
        background: url("../../../assets/login/registeredcompany.png") no-repeat;
        background-size: cover; // display: flex;
        text-align: center;
        height: 60px;
        line-height: 60px;

        img {
            display: inline-block;
            width: 42px;
            height: 37px;
            vertical-align: middle;
        }
        .logoName {
            display: inline-block;
            height: 37px;
            line-height: 37px;
            vertical-align: middle;
            margin-left: 10px;
            font-size: 18px;
            color: #fff;
        }
    }
    .fallback {
        .anticon {
            transform: rotate(180deg);
            -webkit-transform: rotate(180deg);
            -moz-transform: rotate(180deg);
            -o-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
        }
        margin-top: 20px;
        margin-left: 40px;
        width:120px;
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Regular,
        PingFang SC;
        font-weight:400;
        color:rgba(51,
        51,
        51,
        1);
        line-height:22px;
    }
    .mainBody {
        width: 100%;
        height: calc(100vh - 102px); // height: 100%;
        overflow: auto;
        .leftBg {
            width: 634px;
            height: 100%;
            background: url("../../../assets/login/JoinCompanyBg.png") no-repeat 0 -38px;
        }
        .rightCot {
            width: calc(100% - 634px);
            height: 100%;
            .title {
                margin: 38px auto 0;
                width: 480px;
                height: 46px;
                font-size: 33px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: rgba(10, 135, 248, 1);
                line-height: 46px;
            }
            .addEnter {
                overflow: hidden;
                .add_title {
                    line-height: 32px;
                    color: #fff;
                    text-align: center;
                    width: 76px;
                    height: 32px;
                    background: rgba(10, 135, 248, 1);
                    border-radius: 4px 0px 0px 4px;
                    .must {
                        color: #fff;
                    }
                }
            }
            .add-text {
                width: 480px;
                margin: 10px auto 0;
                height: 17px;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(255, 160, 54, 1);
                line-height: 17px;
            }
        }
    }
    .partOne {
        margin: 40px auto 0!important;
    }
    .part {
        width: 480px;
        margin: 25px auto 0;
        .must {
            display: inline-block;
            margin-left: 4px;
            color: #d0021b;
            font-size: 16px;
            line-height: 21px;
        }
        .border-bm {
            border-bottom: 1px solid #dddddd;
        }
        .part_value {
            // border-bottom: 1px solid #dddddd;
            .input_wrap {
                width: calc(100% - 100px);
            }
            .verification {
                width: 100px;
                height: 38px;
                line-height: 38px; // color: @mainColor;
                cursor: pointer;
                text-align: right;
            }
            .eyes_wrap {
                text-align: right; // padding-right: 30px;
            }
        }
    }
    .footer {
        margin: 56px auto 0;
        width: 480px;
        height: 44px;
    }
}
</style>
<style lang="less">
.joinEnterprise-info {
    .ant-form-item {
        margin-bottom: 0;
        .ant-select-selection--multiple .ant-select-selection__rendered {
            margin-left: 0;
            .ant-select-selection__placeholder {
                margin-left: 0;
            }
        }
    }
    .footer {
        >div {
            .ant-btn {
                background: linear-gradient(316deg, rgba(22, 137, 213, 1) 0%, rgba(45, 145, 231, 1) 100%);
                border-radius: 5px;
                width: 480px;
                height: 44px;
                color: #fff;
            }
        }
    }
    .addEnter {
        .ant-input {
          width: 404px;
          border-radius: 0 4px 4px 0;
        }
    }
}
</style>

