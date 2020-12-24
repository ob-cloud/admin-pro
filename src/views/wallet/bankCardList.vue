<template>
    <div class="bankCardList-box ">
        <div class="bankCardList-total">已绑定<span class="bankCardList-total-font"> {{bankCardList.length}} </span>张卡</div>
        <div class="bankCardList-detail clearfix">
            <div class="bankItemStyle f-fl cursor" v-for="(item,index) in bankCardList" :style="index%3==2?'margin-right:0px;':''" @click="viewBankCard(item)">
                <div class="bankIcon clearfix">
                    <img class="f-fl" v-bind:src="require('../../assets/wallet/'+item.url+'.png')" alt="picture">
                    <div class="f-fl bankIcon-font" >{{item.bankName}}</div>
                    <div class="f-fr bankIcon-operate cursor" @click.stop="unBindBankCard(item)"><icon-font style="margin-right: 2px;" type="iconjiechu" />解绑</div>
                </div>
                <div class="bankCardNoStyle">{{item.bankCardNo}}</div>
                <div class="cardholderStyle">{{item.cardholder}}</div>
            </div>
            <div class="addBankStyle f-fl cursor" @click="addBankCard">
                <div style="margin-top: 35.5px;text-align: center;font-size: 18px;color: #0A87F8;"><icon-font type="iconyumengtubiao_tianjia" /></div>
                <div style="text-align: center;font-size: 18px;color: #0A87F8;">添加银行卡</div>
            </div>
        </div>
        <!-- 添加银行卡 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="addBankCardDialog" class="ownModalBorder titDialog" :title="addBankCardTitle" @cancel="addBankCardDialog=false;">
            <add-bank-card :accountId="accountId" @cancel="addBankCardDialog=false;" @success="successAddBankCard()"></add-bank-card>
        </a-modal>
        <!-- 查看银行卡信息 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="bankCardDetailDialog" class="ownModalBorder titDialog" title="查看银行卡信息" @cancel="bankCardDetailDialog=false;">
            <bank-card-detail :id="id" @successUnBind="successUnBind"></bank-card-detail>
        </a-modal>
    </div>
</template>

<script>
    import * as API from  '@/api/wallet';
    import AddBankCard from './addBankCard';
    import BankCardDetail from './bankCardDetail';
    export default {
        name: "bankCardList",
        components: {
            AddBankCard,
            BankCardDetail,
        },
        props: {
            accountId:{
                type:String,
                required:true,
            },
            accountUserType:{
              type:Number,
              required:true,
            },
        },
        data() {
            return {
                bankCardList:[],
                addBankCardDialog:false,
                addBankCardTitle:'绑定银行卡',
                bankCardDetailDialog:false,
                id:'',
                bankNameHaveIconList : [
                    '上海浦东发展银行','中国中兴银行','中国光大银行','中国农业银行','中国工商银行',
                    '中国建设银行','中国民生银行','中国银行','交通银行','兴业银行',
                    '华夏银行','平安银行','广东发展银行','恒丰银行','招商银行',
                    '浙商银行','渤海银行'
                ],
              addFlag:true,     //是否允许添加；
            }
        },
        created() {
            this.listSimpleByWaId();
        },
        methods: {
            successUnBind(){
                //解绑后刷新数据
                this.bankCardDetailDialog = false;
                this.listSimpleByWaId();
                this.id = '';
            },
            viewBankCard(item){
                this.id = item.id;
                this.bankCardDetailDialog = true;
            },
            unBindBankCard(item){
                let _this =this;
                if(item.isAllowUnbind==0){
                  this.$message.warning('企业银行卡不支持解绑,如需变更请联系对接财务');
                  return ;
                }
                this.$modal.confirm({
                    title: '确定要解绑 「' + item.bankName + ' (' + item.bankCardNo + ')」吗？',
                    content: '解绑后，不可恢复，请谨慎操作',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        API.bankCardUnBind({id:item.id}).then(res => {
                            if (res.code == 200) {
                                _this.$message.success('解绑成功！');
                                setTimeout(() => {
                                    _this.listSimpleByWaId();
                                }, 500)
                            }
                            else{
                                _this.$message.success('解绑失败！');
                            }
                        });
                    },
                    onCancel() {
                        // console.log('Cancel');
                    },
                });

            },
            addBankCard(){
              if(!this.addFlag){
                this.$message.warning('企业钱包账户，仅支持绑定一张法人银行卡');
                return ;
              }
                this.addBankCardDialog = true;
                this.id = '';
                this.addBankCardTitle = '绑定银行卡';
            },
            successAddBankCard(){
                this.addBankCardDialog = false;
                this.listSimpleByWaId();
            },
            listSimpleByWaId(){
                API.listSimpleByWaId(this.accountId).then(res => {
                    if (res.code === '200') {
                        this.bankCardList = res.data;
                        this.bankCardList.forEach((item)=>{
                            if(this.bankNameHaveIconList.indexOf(item.bankName)>-1){
                                item.url = item.bankName;
                            }
                            else{
                                item.url = 'other';
                            }
                        });
                      if(this.accountUserType==2&&this.bankCardList.length>=2){
                        this.addFlag = false;
                      } else{
                        this.addFlag = true;
                      }
                    }
                });
            }
        },
    }
</script>

<style scoped lang="less">
    .bankCardList-box{
        padding: 20px 20px 75px 20px;
        .bankCardList-total{
            font-size: 18px;
            color: #111111;
            font-weight: 600;
            margin: 4.5px 0 18.5px 0;
            .bankCardList-total-font{
                font-size: 18px;
                font-weight: 600;
                color: #0A87F8;
            }
        }
        .bankCardList-detail{
            .bankItemStyle{
                .bankIcon{
                    img{
                        width: 16px;
                        height: 16px;
                        margin-top: 2.5px;
                        margin-right: 6px;
                    }
                    .bankIcon-font{
                        color: #111111;
                        font-size: 15px;
                    }
                    .bankIcon-operate{
                        margin-left: 20px;
                        line-height: 22px;
                        color: #0A87F8;
                    }
                }
                .bankCardNoStyle{
                    font-size: 15px;
                    color: #111111;
                    margin-top: 15px;
                }
                .cardholderStyle{
                    font-size: 14px;
                    color: #777777;
                    margin-top: 5px;
                }
                width:306px;
                height:125px;
                background:rgba(239,246,254,1);
                border-radius:6px;
                margin: 0 20px 20px 0;
                padding: 20px 15px;
            }
            .addBankStyle{
                width:306px;
                height:125px;
                background:rgba(239,246,254,1);
                border-radius:6px;
                margin-bottom: 20px;
            }
        }
    }
</style>