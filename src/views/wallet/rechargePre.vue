<template>
    <div class="rechargePre-box">
        <div class="rechargePre-title">充值金额(元)</div>
        <div :class="money?'moneyStyle':''" style="position: relative;">
            <label-item class="u-bottom-border" style="position: relative">
                <a-input v-model="money" placeholder="请输入充值金额" v-validate="'money|max(99999)'" @change="getRechargeHandlingFee"></a-input>
                <div class="monetStyle">￥</div>
            </label-item>
            <div class="warningStyle" v-if="amountTotal">
              <span>本次手续费：</span><span class="colorFeilv">{{ (handlingFee/100).toFixed(2)}}</span><span>元（费率：{{onlinePayRate}}）；合计：</span><span class="colorTotal">{{ (amountTotal/100).toFixed(2)}}</span><span>元</span>
            </div>
        </div>
        <div class="clearfix" style="width: 100%;padding-top:142px;">
            <div class="buttonDiv f-fr">
                <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
                    取消
                </a-button>
                <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="rechargePre">
                    确认充值
                </a-button>
            </div>
        </div>
        <!--  二维码支付 -->
        <a-modal centered v-model="rechargeDialog" :footer="null" :bodyStyle="{padding:'0px'}" class="ownModalBorder" title="" @cancel="rechargeDialog=false" width="520px">
            <recharge :QRCode="QRCode" @rechargeSuccess="rechargeSuccess"></recharge>
        </a-modal>
    </div>
</template>

<script>
    import Recharge from './recharge';
    import * as API from '@/api/wallet';
    export default {
        name: "rechargePre",
        props: {
            accountId: {
                type: String,
                required: true,
            },
        },
        components: {
            Recharge,
        },
        data() {
            return {
                money:'',
                rechargeDialog:false,
                QRCode:'',
                saveLoading:false,
                onlinePayRate:undefined,
                handlingFee:undefined,
                amountTotal:undefined,
            }
        },
        created() {
        },
        methods: {
            getRechargeHandlingFee(){
              if(this.money&&this.money>0){
                let parameter = {amount:this.money*100};
                API.getRechargeHandlingFee(parameter).then(res=>{
                  if(res.code === '200'){
                    this.onlinePayRate = res.data.onlinePayRate;
                    this.handlingFee = res.data.handlingFee;
                    this.amountTotal = res.data.amountTotal;
                  }
                });
              }
              else{
                this.onlinePayRate = undefined;
                this.handlingFee = undefined;
                this.amountTotal = undefined;
              }
            },
            rechargeSuccess(){
                this.$emit('rechargeSuccess');
            },
            cancelSave(){
                this.$emit('cancel');
            },
            rechargePre(){
                if(!this.money){
                    this.$message.warning('请输入充值金额');
                    return;
                }
                let parameter = {
                    accountId:this.accountId,
                    amount: Math.round(this.money*100),
                };
                this.saveLoading = true;
                API.bizPreRecharge(parameter).then(res=>{
                    if(!res){
                        this.saveLoading = false;
                    }
                    if(res.code === '200'){
                        this.QRCode = res.data;
                        this.saveLoading = false;
                        if(this.QRCode){
                            this.rechargeDialog = true;
                        }
                    }
                    else{
                        this.saveLoading = false;
                    }
                });
            },
        },
    }
</script>

<style lang="less" scoped>
    .rechargePre-box{
        padding: 20px;
        /deep/ .ant-input{
            font-size: 18px;
            height: 40px;
            line-height: 40px;
            padding-left: 30px;
        }
        .warningStyle{
          position: absolute;
          color: #111111;
          font-size: 14px;
          top:45px;
          .colorFeilv{
            color: #FFA036;
          }
          .colorTotal{
            color: #0a87f8;
          }
        }
        .moneyStyle{
        /deep/ .ant-input{
          font-size: 24px;
          color:#111111;
        }
      }
        .rechargePre-title{
            color: #111111;
            font-size: 18px;
            font-weight: 500;
            margin: 19px 0 10px 0;
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