<template>
    <div class="openWalletConfirm-box">
        <div class="infoStyle clearfix">
            <div class="infoIconStyle f-fl">
              <a-icon type="exclamation-circle"></a-icon>
            </div>
            <div class="infoFontStyle f-fl" v-if="fromTypeFlag==1">
              <div class="infoFontStyle1">钱包账户开通成功，请绑定手机号</div>
              <div class="infoFontStyle2">绑定手机号后，此钱包账户才可进行提现等操作</div>
            </div>
            <div class="infoFontStyle f-fl" v-if="fromTypeFlag==2">
              <div class="infoFontStyle1">此钱包账户还未绑定手机号</div>
              <div class="infoFontStyle2">绑定手机号后，此钱包账户才可进行提现等操作</div>
            </div>
        </div>
        <div class="contentStyle">
            <div class="phoneStyle">
                <span>开通人手机号：</span><span>{{phone}}</span>
            </div>
            <div class="titleStyle" style="margin-top: 19px;">
                验证码<span class="mustFillStyle" style="margin-left: 2px;">*</span>
            </div>
            <div class="clearfix" style="margin-top: 3.5px;">
                <label-item style="width: 100%;position: relative" class="u-bottom-border f-fl">
                    <a-input v-model="verifyCode" placeholder="请输入验证码"></a-input>
                    <div class="verifyCodeStyle canGet cursor" v-if="canGetVerification" @click="getVerifyCode">获取验证码</div>
                    <div class="verifyCodeStyle canNotGet" v-else>{{intervalText}}</div>
                </label-item>
            </div>
            <div class="clearfix" style="width: 100%;margin-top:50px;">
                <div class="buttonDiv">
                    <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="bindPhone">
                        确认绑定
                    </a-button>
                </div>
            </div>
        </div>
        <!-- 设置密码提醒 -->
        <a-modal destroyOnClose :maskClosable="false" :maskStyle="maskStyle" centered v-model="setPwdWarningDialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'110px 0px 110px 0px'}" @cancel="noSetPwdFun" width="520px">
          <set-pwd-warning @goToSetPwd="goToSetPwd"></set-pwd-warning>
        </a-modal>
        <!-- 通商云支付 -->
        <a-modal destroyOnClose centered v-model="htmlPannelDialog" :footer="null" class="ownModalBorder titDialog" :maskClosable="false" title="设置交易密码" :bodyStyle="{padding:'0px 0px 0px 0px'}" @cancel="cancelSetPwd" width="1250px">
          <html-panel :url="url" @authSuccess="setSuccess"></html-panel>
        </a-modal>
    </div>
</template>

<script>
    import {waSendBindPhoneVerifyCode,bindPhoneAndSetPayPwdApply} from '@/api/wallet.js';
    import HtmlPanel from '../smartDevices/account/HtmlPanel';
    import SetPwdWarning from './setPwdWarning';
    export default {
        name: "openWalletConfirm",
        components: {
          HtmlPanel,
          SetPwdWarning,
        },
        props: {
            id:{
                type:String,
            },
            phone:{
                type:String,
            },
            fromTypeFlag:{
              type:Number,
              default:1,        //来源：1、来自钱包添加；2、来自首页重新绑定
            },
        },
        data() {
            return{
                saveLoading:false,
                verifyCode:'',
                canGetVerification: true,
                countdown: 60,
                intervalText: '60s后重新获取',
                htmlPannelDialog:false,
                url:'',
                setPwdWarningDialog:false,
                maskStyle:{backgroundColor:'rgba(0,0,0,0.05)'},
            }
        },
        created() {

        },
        methods: {
            goToSetPwd(){
              this.setPwdWarningDialog = false;
              this.htmlPannelDialog = true;
            },
            noSetPwdFun(){
              this.setPwdWarningDialog = false;
              this.$emit('successBindPhone');
            },
            cancelSetPwd(){
              this.htmlPannelDialog=false;
              //密码设置成功的回调
              setTimeout(()=>{
                this.$emit('successBindPhone');
              },500);
            },
            bindPhone(){
                if(!this.verifyCode){
                    this.$message.warning('请输入验证码');
                    return
                }
                let parameter ={
                    accountId:this.id,
                    verifyCode:this.verifyCode,
                    source:1,
                };
                this.saveLoading = true;
                bindPhoneAndSetPayPwdApply(parameter).then(res=>{
                    if(!res){
                      this.saveLoading = false;
                    }
                    if(res.code === '200'){
                      this.saveLoading = false;
                        this.$message.info('钱包账户绑定手机号成功');
                        if(res.data){
                          this.url = res.data
                          this.setPwdWarningDialog = true;
                        }
                        else{
                          this.url = '';
                          this.$emit('successBindPhone');
                        }
                    }
                    else{
                      this.saveLoading = false;
                        this.$message.error('钱包账户绑定手机号失败');
                    }
                });
            },
            setSuccess(){
              this.htmlPannelDialog = false;
              //密码设置成功的回调
              setTimeout(()=>{
                this.$emit('successBindPhone');
              },500);
            },
            getVerifyCode(){
                if(this.canGetVerification) {
                  this.canGetVerification = false;
                  this.settime();
                  waSendBindPhoneVerifyCode({id: this.id}).then(res => {
                    if (!res) {
                      this.$message.error('验证码获取失败');
                    }
                    if (res.code === '200') {
                      this.$message.info('验证码获取成功');
                    } else {
                      this.$message.error('验证码获取失败');
                    }
                  });
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
        },
    }
</script>

<style lang="less" scoped>
    .openWalletConfirm-box{
        .infoStyle {
            height: 80px;
            background: #E9F1FF;
            padding:15px 0 0 20px;
            .font1Style{
                color: #777777;
                font-size: 16px;
            }
            .font2Style{
                color: #111111;
                font-size: 16px;
            }
          .infoIconStyle{
              svg{
                background: #0A87F8;
                color:#FFFFFF;
                width: 22px;
                height: 22px;
                border-radius: 50%;
              }
          }
          .infoFontStyle{
            margin-left: 10px;
            .infoFontStyle1{
              color: #111111;
              font-size: 16px;
              font-weight: 500;
            }
            .infoFontStyle2{
              font-size: 14px;
              color: #777777;
              margin-top: 6px;
            }
          }
        }
        .contentStyle{
            padding: 0 30px 30px;
            .phoneStyle{
              color: #777777;
              font-size: 16px;
              margin-top: 29px;
            }
            .titleStyle {
                font-size: 16px;
                font-weight: 500;
                color: #111111;
            }
            .mustFillStyle {
                color: @wranColor;
            }
            .buttonDiv {
              text-align: center;
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
            .verifyCodeStyle {
                position:absolute;
                height: 32px;
                line-height: 32px;
                top: 0px;
                right: 0px;
            }
            .canGet {
              color:#0A87F8;
            }
            .canNotGet {
              color: #777777;
            }
        }
      /deep/ .ant-input{
        color: #111111;
      }
    }
</style>