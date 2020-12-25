<template>
    <div class="addBankCard-box">
        <div class="addBankCard-name">
            <div class="addBankCard-name-title">持卡人信息</div>
            <div class="addBankCard-name-content">
                <div class="addBankCard-name-content1 f-fl">
                    <span class="font-style1">持卡人姓名：</span>
                    <span class="font-style2">{{addBankCardForm.cardholder}}</span>
                </div>
                <div class="addBankCard-name-content2 f-fl">
                    <span class="font-style1">持卡人身份证号：</span>
                    <span class="font-style2">{{idCardNo}}</span>
                </div>
            </div>
        </div>
        <div class="contentStyle">
            <div class="titleStyle" style="margin-top: 24px;">
                银行卡信息
            </div>
            <div>
                <label-item class="u-bottom-border" title="银行卡号" :mustFill="true" :maxSize="20" :valLength="addBankCardForm.bankCardNo.length">
                    <a-input placeholder="请输入银行卡号" v-model="addBankCardForm.bankCardNo" v-validate="'naturalNum'" @blur="getBankName" maxlength="20"></a-input>
                </label-item>
            </div>
            <div style="margin-top: 20px;">
                <label-item class="u-no-border" title="开户行" :mustFill="true">
                    <a-input placeholder="请输入开户行" v-model="addBankCardForm.bankName" :disabled="true" ></a-input>
                </label-item>
            </div>
            <div style="margin-top: 20px;">
                <label-item class="u-bottom-border" title="支行名称" :mustFill="true" :maxSize="20" :valLength="addBankCardForm.branchBankName.length">
                    <a-input placeholder="请输入支行名称" v-model="addBankCardForm.branchBankName" maxlength="20"></a-input>
                </label-item>
            </div>
            <div style="margin-top: 20px;">
                <label-item class="u-bottom-border" title="银行预留手机号" :mustFill="true" :maxSize="11" :valLength="addBankCardForm.bankReservedPhone.length">
                    <a-input placeholder="请输入银行预留手机号" v-model="addBankCardForm.bankReservedPhone" v-validate="'naturalNum'" maxlength="11"></a-input>
                </label-item>
            </div>
            <div style="margin-top: 20px;">
                <label-item title="银行卡有效期">
                  <div class="cardSvg" style="margin-top: 9px;">
                    <a-input style="width: 140px;height: 34px;line-height: 34px;text-align: center" placeholder="月份" maxlength="2" v-model="month" v-validate="'naturalNum'"></a-input>
                    <span style="font-size: 14px;color: #BBBBBB;margin: 0 20px;">/</span>
                    <a-input style="width: 140px;height: 34px;line-height: 34px;text-align: center" placeholder="年份" maxlength="2" v-model="year" v-validate="'naturalNum'"></a-input>
                    <icon-font class="cursor" @click="viewImg" type="iconyumengtubiao_yanjing-1"/>
                    <span class="cursor" @click="viewImg" >查看示例</span>
                  </div>
                </label-item>
            </div>
        </div>
        <div class="clearfix" style="width: 100%;padding:28px 20px 20px 0;">
            <div class="buttonDiv f-fr">
                <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
                    取消
                </a-button>
                <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="addBankCard">
                    保存
                </a-button>
            </div>
        </div>
      <!-- 预览图片 -->
      <a-modal centered :visible="previewVisible" :footer="null" @cancel="cancelPreviewImage">
        <img alt="example" style="width: 100%;padding: 26px 0;" :src="previewImage" />
      </a-modal>
    </div>
</template>

<script>
    import * as API from  '@/api/wallet';
    import {getBankName} from '@/api/public';
    export default {
        name: "addBankCard",
        components: {
        },
        props: {
            accountId:{
                type:String,
                required:true,
            },
        },
        data() {
            return {
                idCardNo:'',
                addBankCardForm:{
                    bankCardNo:'',
                    bankName:'',
                    bankReservedPhone:'',
                    bindAccountId:'',
                    branchBankName:'',
                    cardholder:'',
                    cvv2:'',
                    idCardNo:'',
                    isSafeCard:'',
                    validThru:'',
                },
              month:'',
              year:'',
              saveLoading:false,
              previewVisible:false,
              previewImage:'https://oss.byteox.com/byteox/2020-09-01/a01deb04f050424ca73c0bdaa726a979.png',
            }
        },
        created() {
          this.addBankCardForm.bindAccountId = this.accountId;
            this.waGetOwnerInfo();
        },
        methods: {
          cancelPreviewImage(){
            this.previewVisible = false;
          },
          viewImg(){
            this.previewVisible = true;
          },
            getBankName(){
                if(this.addBankCardForm.bankCardNo){
                    getBankName(this.addBankCardForm.bankCardNo).then(res => {
                        if (res.code === '200') {
                            this.addBankCardForm.bankName = res.data;
                        }
                        if(!this.addBankCardForm.bankName){
                          this.$message.warning('未识别到开户行信息，请检查卡号是否输入有误');
                        }
                    });
                }
            },
            waGetOwnerInfo(){
                API.waGetOwnerInfo(this.accountId).then(res => {
                    if (res.code === '200') {
                        this.addBankCardForm.cardholder = res.data.name;
                        this.idCardNo = res.data.idCardNo
                    }
                });
            },
            addBankCard(){
                if(this.checkData()){
                  //有效期处理
                  if(this.month&&this.year){
                    if(this.month<1){
                      this.$message.warning('月份不能小于1');
                      return ;
                    }
                    else if(this.month>12){
                      this.$message.warning('月份不能大于12');
                      return ;
                    }
                    if(this.year<20){
                      this.$message.warning('年份不能小于20');
                      return ;
                    }
                    if(this.year>99){
                      this.$message.warning('年份不能大于99');
                      return ;
                    }
                    if(this.month.length==1){
                      this.addBankCardForm.validThru = '0'+this.month + '' +this.year;
                    }
                    else{
                      this.addBankCardForm.validThru = this.month + '' +this.year;
                    }
                  }
                  this.saveLoading = true;
                    API.bankCardBind(this.addBankCardForm).then(res=>{
                        if(!res){
                          this.saveLoading = false;
                        }
                        if(res.code === '200'){
                            this.$message.info('绑定银行卡成功');
                          this.saveLoading = false;
                            this.$emit('success');
                        }
                        else{
                            this.$message.error('绑定银行卡失败');
                          this.saveLoading = false;
                        }
                    });
                }
            },
            checkData(){
                if(!this.addBankCardForm.bindAccountId){
                    this.$message.warning('参数有误');
                    return false;
                }
                if(!this.addBankCardForm.bankCardNo){
                    this.$message.warning('请输入银行卡号');
                    return false;
                }
                if(!this.addBankCardForm.bankName){
                    this.$message.warning('请检查银行卡号是否输入正确');
                    return false;
                }
                if(!this.addBankCardForm.branchBankName){
                    this.$message.warning('请输入支行名称');
                    return false;
                }
                if(!this.addBankCardForm.bankReservedPhone){
                    this.$message.warning('请输入银行预留手机号');
                    return false;
                }
                if(this.month&&!this.year){
                  this.$message.warning('请输入年份');
                  return false;
                }
              if(this.year&&!this.month){
                this.$message.warning('请输入月份');
                return false;
              }
                return  true;
            },
            cancelSave(){
                this.$emit('cancel');
            },
        },
    }
</script>

<style scoped lang="less">
    .addBankCard-box{
        max-height: calc(100vh - 100px);
        overflow-y: auto;
        overflow-x: hidden;
        .addBankCard-name{
            padding: 14px 20px 0 20px;
            width:520px;
            height:84px;
            background:rgba(233,241,255,0.99);
            .addBankCard-name-title{
                color: #111111;
                font-size: 16px;
                font-weight: 500;
            }
            .addBankCard-name-content{
                margin-top: 10.5px;
                .addBankCard-name-content1{
                    width: 180px;
                }
                .addBankCard-name-content2{
                    width: 300px;
                }
                .font-style1{
                    color: #777777;
                    font-size: 14px;
                }
                .font-style2{
                    color: #111111;
                    font-size: 14px;
                }
            }
        }
        .contentStyle {
            padding: 0 20px 20px;
            .titleStyle {
                font-size: 18px;
                font-weight: 500;
                color: #111111;
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
      .cardSvg{
        color:#0A87F8;
        i{
          vertical-align: -0.25em;
          margin-left: 56px;
          padding-right: 5px;
        }
        svg{
          width: 16px;
          height: 16px;
        }
      }
    }
</style>