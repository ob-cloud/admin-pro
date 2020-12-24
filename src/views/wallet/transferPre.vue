<template>
    <div class="transferPre-box">
        <div class="transferPre-title" style="margin-top: 4px;">收款方</div>
        <div>
            <label-item class="u-bottom-border" title="指定钱包账户" :mustFill="true">
                <a-select style="width: 100%" :showSearch="true" :filterOption="(inputValue,option)=>filterOption(inputValue,option)" placeholder="请选择" v-model="receiveAccountId" @change="handleChange">
                    <a-select-option v-for="item in waSimpleList" :key="item.id" :value="item.id" :disabled="item.disabled">
                        <span class="aliasStyle">{{ item.alias }}</span><span class="phoneStyle" v-if="!item.disabled">({{item.name}}{{item.phone?'-' + item.phone:item.phone}})</span><span v-if="item.disabled" style="margin-left: 6px;font-size: 12px;">(当前)</span><span v-if="item.disabled" style="color: #ffa036;font-size: 12px;margin-left: 2px;font-weight: 200;">不可转入当前钱包账户</span>
                    </a-select-option>
                </a-select>
            </label-item>
        </div>
        <div class="transferPre-title">转账金额(元)</div>
        <div :class="money?'moneyStyle':''">
            <label-item class="u-bottom-border" style="position: relative">
                <a-input v-model="money" :placeholder="placeholderTitle" v-validate="'money'" @blur="checkMaxMoneny"></a-input>
                <div class="monetStyle">￥</div>
            </label-item>
        </div>
        <div class="clearfix" style="width: 100%;padding-top:80px;">
            <div class="buttonDiv f-fr">
                <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
                    取消
                </a-button>
                <a-button size="large" type="primary" class="formItemMarginButton saveFont" :style="money&&Number(money)>0.00&&Number(money)<=canTransferAmount?'':'background:rgba(10,135,248,0.4);'" :disabled="money&&Number(money)>0.00&&Number(money)<=canTransferAmount?false:true" :loading="saveLoading" @click="transferPre">
                    下一步
                </a-button>
            </div>
        </div>
        <!-- 转账 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="transferDialog" class="ownModalBorder titDialog" title="确认转账信息" @cancel="cancelTransfer">
            <transfer :transferPreObj="transferPreObj" @cancel="transferDialog=false;" @success="transferSuccess" @successClose="successClose" @refreshinfoFun="refreshinfoFun"></transfer>
        </a-modal>
    </div>
</template>

<script>
    import * as API from '@/api/wallet';
    import Transfer from './transfer';
    export default {
        name: "transferPre",
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
            Transfer,
        },
        data() {
            return {
                money:'',                   //金额
                waSimpleList:[],            //指定钱包账户集合
                canTransferAmount:0.00,        //可转金额
                placeholderTitle:'可转账金额', //可转金额描述
                receiveAccountId:undefined,     //指定转账钱包账户id
                receiveAccountName:'',          //指定转账钱包账户名称
                transactionFlowId:'',           //交易单ID
                transferDialog:false,
                saveLoading:false,
                isRefresh:false,
                transferPreObj:{
                  accountId:'',
                  ownerPhone:'',
                  accountUserType:1,
                  isOwner:0,
                  receiveAccountId:'',
                  receiveAccountName:'',
                  money:'',
                  transactionVerifyMode:1,  //验证模式 1、普通检验；9、强检验
                  isSetPayPwd:0,      //是否设置交易密码
                },
            }
        },
        created() {
            this.waAmountStat();
            this.waListSimple();
            this.getTransactionVerifyMode();
        },
        methods: {
            //来自自定义搜索
            filterOption(inputValue,option){
              if(!inputValue){
                return true;
              }
              return option.componentOptions.children[0].children[0].text.indexOf(inputValue) > -1;
            },
            refreshinfoFun(val){
                this.$emit('refreshinfoFun',val);
            },
            getTransactionVerifyMode(){
              API.getTransactionVerifyMode({id:this.accountId}).then(res => {
                if (res.code === '200') {
                  this.transferPreObj.transactionVerifyMode = res.data.transactionVerifyMode;
                  this.transferPreObj.isSetPayPwd = res.data.isSetPayPwd;
                }
              });
            },
            successClose(){
                this.transferDialog=false;
                this.$emit('transferSuccess');
                this.isRefresh = false;
            },
            cancelTransfer(){
                if(this.isRefresh){
                    this.transferDialog=false;
                    this.$emit('transferSuccess');
                    this.isRefresh = false;
                }
            },
            handleChange(){
                this.waSimpleList.forEach((item)=>{
                    if(this.receiveAccountId == item.id){
                        this.receiveAccountName = item.name;
                    }
                })

            },
            checkMaxMoneny(){
                if(this.money) {
                    let money = Number(this.money);
                    if (money > this.canTransferAmount) {
                        this.$message.warning('转账金额不能超过' + this.canTransferAmount + '元');
                        this.money = this.canTransferAmount;
                    }
                }
            },
            transferSuccess(){
                this.isRefresh = true;
            },
            waAmountStat(){
                API.waAmountStat(this.accountId).then(res => {
                    if (res.code === '200') {
                        this.canTransferAmount = (res.data.allAmount/100 - res.data.freezenAmount/100).toFixed(2);
                        this.placeholderTitle = '可转账 '+ this.canTransferAmount + ' 元';
                    }
                });
            },
            waListSimple(){
                API.waListSimple().then(res =>{
                    if(res.code === '200'){
                        this.waSimpleList = res.data;
                        this.waSimpleList.forEach((item)=>{
                            if(item.id == this.accountId){
                                item.disabled =true;
                            }
                            else{
                                item.disabled =false;
                            }
                        })
                    }
                })
            },
            cancelSave(){
                this.$emit('cancel');
            },
            transferPre(){
                if(!this.receiveAccountId){
                    this.$message.warning('请选择指定转账钱包账户');
                    return;
                }
                if(!this.money||this.money==0.00){
                    this.$message.warning('请输入转账金额');
                    return;
                }
                let money = Number(this.money);
                if(money>this.canTransferAmount){
                    this.$message.warning('超出可转账金额');
                    return;
                }
                this.transferPreObj.accountId = this.accountId;
                this.transferPreObj.ownerPhone = this.ownerPhone;
                this.transferPreObj.accountUserType = this.accountUserType;
                this.transferPreObj.isOwner = this.isOwner;
                this.transferPreObj.isSetPayPwd = this.isSetPayPwd;
                this.transferPreObj.receiveAccountId = this.receiveAccountId;
                this.transferPreObj.receiveAccountName = this.receiveAccountName;
                this.transferPreObj.money = this.money;
                this.transferDialog = true;
            },
        },
    }
</script>

<style lang="less" scoped>
    .transferPre-box{
        padding: 20px;
        .aliasStyle{
          color: #111111;
        }
        .phoneStyle{
          color: #777777;
          margin-left: 6px;
        }
        /deep/ .ant-input{
            font-size: 18px;
            height: 40px;
            line-height: 40px;
            padding-left: 30px;
        }
        .moneyStyle{
            /deep/ .ant-input{
                font-size: 24px;
                color:#111111;
            }
        }
        /deep/ .ant-select-selection__rendered{
            margin-left: 0px;
        }
        .transferPre-title{
            color: #111111;
            font-size: 18px;
            font-weight: 500;
            margin: 49px 0 10px 0;
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
    }
</style>