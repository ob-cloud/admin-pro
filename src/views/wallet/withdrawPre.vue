<template>
    <div class="withdrawPre-box">
        <div class="clearfix" style="margin-top: 4px;">
            <div class="titleStyle f-fl">选择提现银行卡</div>
            <div class="operationStyle f-fr cursor" @click="goAddBank"><icon-font type="iconyumengtubiao_tianjia" style="margin-right: 4px;" />添加银行卡</div>
        </div>
        <div class="bankCardListStyle">
            <div class="bankCardListEmptyStyle" v-if="bankCardList.length==0">
                未绑定银行卡，请先添加银行卡
            </div>
            <div v-for="(item) in bankCardList" :key="item.id" :class="bankCardId==item.id?'clickStyle':'unClickStyle'" class="bankCardItemStyle clearfix cursor" @click="bankCardId=item.id">
              <div class="clearfix" style="width: 480px;height: 66px;">
                <img style="margin-left: 12px;" class="f-fl itemBox" v-bind:src="require('../../assets/wallet/'+item.url+'.png')" alt="picture">
                <div class="fontStyle itemBox f-fl" style="margin-top: 12px;">
                  <div class="itemBox" style="color: #111111;font-size: 14px;">{{item.cardholder}}</div>
                  <div class="itemBox" style="color: #777777;font-size: 13px;">{{item.bankName}} ( {{item.bankCardNo}} )</div>
                </div>
                <div class="iconStyle itemBox f-fr" v-if="bankCardId==item.id"><icon-font class="selectStyle itemBox" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="iconStyle itemBox f-fr" v-else><icon-font class="unSelectStyle itemBox" type="iconyumengtubiao_danxuan-weixuanze" /></div>
              </div>
            </div>
        </div>
        <div style="margin: 29px 0 4px 0;">
            <div class="titleStyle">提现金额</div>
        </div>
        <div :class="money?'moneyStyle':''">
            <label-item class="u-bottom-border" style="position: relative">
                <a-input v-model="money" :placeholder="placeholderTitle" v-validate="'money'" @blur="checkMaxMoneny"></a-input>
                <div class="monetStyle">￥</div>
              <div class="allPutStyle" @click="allPutSet">
                全部提现
              </div>
            </label-item>
        </div>
        <div class="clearfix" style="width: 100%;padding-top:70px;">
            <div class="buttonDiv f-fr">
                <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
                    取消
                </a-button>
                <a-button size="large" type="primary" class="formItemMarginButton saveFont" :style="money&&Number(money)>0.00&&Number(money)<=canTransferAmount?'':'background:rgba(10,135,248,0.4);'" :disabled="money&&Number(money)>0.00&&Number(money)<=canTransferAmount?false:true" :loading="saveLoading" @click="withdrawPre">
                    下一步
                </a-button>
            </div>
        </div>
        <!-- 添加银行卡 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="addBankCardDialog" class="ownModalBorder titDialog" :title="addBankCardTitle" @cancel="addBankCardDialog=false;">
            <add-bank-card :accountId="accountId" @cancel="addBankCardDialog=false;" @success="successAddBankCard()"></add-bank-card>
        </a-modal>
        <!-- 提现 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="withdrawDialog" class="ownModalBorder titDialog" title="确认提现信息" @cancel="cancelWithdraw">
            <withdraw :withdrawPreObj="withdrawPreObj" @cancel="withdrawDialog=false;" @success="withdrawSuccess" @successClose="successClose" @refreshinfoFun="refreshinfoFun"></withdraw>
        </a-modal>
    </div>
</template>

<script>
    import Withdraw from './withdraw';
    import AddBankCard from './addBankCard';
    import * as API from '@/api/wallet';
    export default {
        name: "withdrawPre",
        props: {
            accountId: {
              type: String,
              required: true,
            },
            ownerPhone: {
              type: String,
              required: true,
            },
            accountUserType:{
              type:Number,
            },
            isOwner:{
              type:Number,
            },
            isSetPayPwd:{
              type:Number,
            },
        },
        components: {
            Withdraw,
            AddBankCard,
        },
        data() {
            return {
                withdrawDialog:false,
                transactionFlowId:'',
                bankCardList:[],
                bankNameHaveIconList : [
                  '上海浦东发展银行','中国中兴银行','中国光大银行','中国农业银行','中国工商银行',
                  '中国建设银行','中国民生银行','中国银行','交通银行','兴业银行',
                  '华夏银行','平安银行','广东发展银行','恒丰银行','招商银行',
                  '浙商银行','渤海银行'
                ],
                money:'',
                placeholderTitle:'可提现金额', //可转金额描述
                canTransferAmount:0.00,
                saveLoading:false,
                bankCardId:'',
                addBankCardDialog:false,
                addBankCardTitle:'绑定银行卡',
                isRefresh:false,
                withdrawPreObj:{
                  accountId:'',
                  ownerPhone:'',
                  accountUserType:1,
                  isOwner:0,
                  bankCardId:'',
                  money:'',
                  transactionVerifyMode:1,  //验证模式 1、普通检验；9、强检验
                  isSetPayPwd:0,      //是否设置交易密码
                },
            }
        },
        created() {
            this.waAmountStat();
            this.listSimpleByWaId();
            this.getTransactionVerifyMode();
        },
        methods: {
          refreshinfoFun(val){
            this.$emit('refreshinfoFun',val);
          },
          getTransactionVerifyMode(){
            API.getTransactionVerifyMode({id:this.accountId}).then(res => {
              if (res.code === '200') {
                this.withdrawPreObj.transactionVerifyMode = res.data.transactionVerifyMode;
                this.withdrawPreObj.isSetPayPwd = res.data.isSetPayPwd;
              }
            });
          },
          goAddBank(){
            if(this.accountUserType==2&&this.bankCardList.length>=2){
              this.$message.warning('企业钱包账户，仅支持绑定一张法人银行卡');
              return ;
            }
            this.addBankCardDialog = true;
          },
          successClose(){
            this.withdrawDialog=false;
            this.$emit('withdrawSuccess');
            this.isRefresh = false;
          },
          cancelWithdraw(){
            if(this.isRefresh){
              this.withdrawDialog=false;
              this.$emit('withdrawSuccess');
              this.isRefresh = false;
            }
          },
            successAddBankCard(){
                this.addBankCardDialog = false;
                this.listSimpleByWaId();
            },
            cancelSave(){
                this.$emit('cancel');
            },
          allPutSet(){
              this.money = this.canTransferAmount;
          },
            withdrawPre(){
                if(!this.bankCardId){
                    this.$message.warning('请选择提现银行卡');
                    return;
                }
                if(!this.money||this.money==0.00){
                    this.$message.warning('请输入提现金额');
                    return;
                }
                let money = Number(this.money);
                if(money>this.canTransferAmount){
                  this.$message.warning('超出可提现金额');
                  return;
                }
                this.withdrawPreObj.accountId = this.accountId;
                this.withdrawPreObj.ownerPhone = this.ownerPhone;
                this.withdrawPreObj.accountUserType = this.accountUserType;
                this.withdrawPreObj.isOwner = this.isOwner;
                this.withdrawPreObj.isSetPayPwd = this.isSetPayPwd;
                this.withdrawPreObj.bankCardId = this.bankCardId
                this.withdrawPreObj.money = this.money;
                this.withdrawDialog = true;
            },
            waAmountStat(){
                API.waAmountStat(this.accountId).then(res => {
                    if (res.code === '200') {
                        this.canTransferAmount = (res.data.allAmount/100 - res.data.freezenAmount/100).toFixed(2);
                        this.placeholderTitle = '可提现 '+ this.canTransferAmount + ' 元';
                    }
                });
            },
            checkMaxMoneny(){
                if(this.money){
                    let money = Number(this.money);
                    if(money > this.canTransferAmount){
                        this.$message.warning('提现金额不能超过'+this.canTransferAmount+'元');
                        this.money = this.canTransferAmount;
                    }
                }
            },
            listSimpleByWaId(){
                API.listSimpleByWaId(this.accountId).then(res => {
                    if (res.code === '200') {
                        this.bankCardList = res.data;
                        this.bankCardList.forEach((item,index)=>{
                          if(index==0){
                            this.bankCardId = item.id;
                          }
                            if(this.bankNameHaveIconList.indexOf(item.bankName)>-1){
                                item.url = item.bankName;
                            }
                            else{
                                item.url = 'other';
                            }
                        });
                    }
                });
            },
            withdrawSuccess(){
                this.isRefresh = true;
            },
        },
    }
</script>

<style lang="less" scoped>
    .withdrawPre-box{
        max-height: calc(100vh - 100px);
        overflow-y: auto;
        overflow-x: hidden;
        padding: 20px;
      .moneyStyle{
        /deep/ .ant-input{
          font-size: 24px;
          color:#111111;
        }
      }
        .titleStyle{
            font-size: 18px;
            font-weight: 500;
            color: #111111;
        }
        .operationStyle{
            font-size: 14px;
            color: #0A87F8;
            line-height: 27px;
            i{
                vertical-align: -0.1em;
            }
            svg{
                width: 12px;
                height: 12px;
            }
        }
        .bankCardListStyle{
            margin-top: 14px;
          .unClickStyle{
            width: 100%;
            border:1px solid rgba(238,238,238,1);
            background: #ffffff;
            border-radius:4px;
            svg{
              width: 18px;
              height: 18px;
              color: #666666;
            }
          }
          .unClickStyle :hover {
            border:1px solid rgba(10,135,248,0.3);
            background:rgba(245,250,255,1);
            border-radius:4px;
            .itemBox {
              //去除子元素hover事件
              border: none!important;
              background:rgba(10,135,248,0.00);
            }
            svg{
              width: 18px;
              height: 18px;
              color: #0A87F8;
              border: none!important;
            }
          }
          .clickStyle{
            border:1px solid rgba(10,135,248,0.3);
            background:rgba(245,250,255,1);
            border-radius:4px;
            svg{
              width: 18px;
              height: 18px;
              color: #0A87F8;
            }
          }
            .bankCardItemStyle{
                border-radius:4px;
                height: 66px;
                margin-bottom: 10px;
                border-radius:4px;
                .iconStyle{
                    margin:22px 15px 0 14px;
                    svg{
                        width: 20px;
                        height: 20px;
                    }
                    .selectStyle{
                        color: #0A87F8;
                    }
                    unSelectStyle{
                        color: #666666;
                    }
                }
                .splitStyle{
                    width: 1px;
                    height: 20px;
                    background: #EEEEEE;
                    margin: 14px 15px;
                }
                img{
                    width: 20px;
                    height: 20px;
                    margin-top: 23px;
                    margin-right: 10px;
                }
                .fontStyle{
                    color: #111111;
                    font-size: 14px;
                    font-weight:500;
                }
            }
            .bankCardListEmptyStyle{
                height: 68px;
                line-height: 68px;
                color: #BBBBBB;
                border: 0.5px solid #EEEEEE;
                border-radius: 4px;
                text-align: center;
            }
        }
        /deep/ .ant-input{
            font-size: 18px;
            height: 40px;
            line-height: 40px;
            padding-left: 30px;
        }
        .monetStyle{
            position: absolute;
            left:0px;
            top:0px;
            font-size: 24px;
            font-weight: 500;
            height: 40px;
            line-height: 40px;
          color:#111111;
        }
      .allPutStyle{
        position: absolute;
        right: 0px;
        top:10px;
        font-size: 14px;
        color: #0A87F8;
        cursor: pointer;
      }
      .buttonDivIcon{
        i{
          vertical-align: -0.05em;
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
        /deep/ .ant-empty-description{
            color: #BBBBBB;
        }
    }
</style>