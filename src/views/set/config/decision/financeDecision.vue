<template>
    <div class="finance-decision-box">
        <div class="source">
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">自动发送催租短信</div>
            </div>
            <div class="describe">
                开启后，租客账单逾期未收，系统会自动发送催租短信给租客，线下收租的请及时进行收款操作，避免租客收到不必要的催租短信
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" v-if="finance1.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="f-fl allCheck clearfix cursor" v-if="finance1.onOff==0" @click="changeResrource(finance1,1)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="f-fl inputStyleDiv" style="margin-left: 4px;" v-if="finance1.onOff">提前 <a-input class="inputStyle" placeholder="请输入" v-model="finance1.value" v-validate="'naturalNum'"></a-input>   天<span class="mustFill">*</span></div>
                </div>
                <div class="f-fl margin50">
                    <div class="checked allCheck clearfix" v-if="finance1.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="finance1.onOff==1" @click="changeResrource(finance1,0)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(finance1)">
                    保存
                </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">逾期交租收取滞纳金</div>
            </div>
            <div class="describe">
                <div style="height:22px;line-height: 22px;">开启后，租客若逾期未缴纳房屋租金，将于每日0点自动生成当日滞纳金账单。「举例：房屋租金账单的应收款日为1月1日，且已逾期未付；1月2日0点自动生成滞纳金账单，开启后，线下收租请及时进行收款操作，避免租客收到不必要的滞纳金账单。</div>
                <div style="margin-top: 25px"><span style="color: #111111">日滞纳金</span>=房屋租金账单金额 * 日滞纳金比例。根据国家有关规定，一年内，每笔房屋租金账单产生的滞纳金不得超出原账单金额的24%，达到24%时滞纳金将不再增长。</div>
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" v-if="finance2.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="f-fl allCheck clearfix cursor" v-if="finance2.onOff==0" @click="changeResrource(finance2,1)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="f-fl inputStyleDiv" style="margin-left: 4px;" v-if="finance2.onOff">
                        <div style="margin-bottom: 3px;">
                            逾期
                            <a-input class="inputStyle" placeholder="请输入" v-model="finance2.value.overdays" v-validate="'naturalNum'"></a-input>
                            天，开始收取滞纳金
                            <span class="mustFill">*</span>
                        </div>
                        <div>
                            滞纳金比例千分之
                            <a-input class="inputStyle" placeholder="请输入" v-model="finance2.value.percent" v-validate="'area'"></a-input><span class="mustFill">*</span>
                            <span style="color: #FFA036;margin-left: 5px;">(填写阿里伯数字，50封顶，支持小数点后)</span>
                        </div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="checked allCheck clearfix" v-if="finance2.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="finance2.onOff==1" @click="changeResrource(finance2,0)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(finance2)">
                    保存
                </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">添加记账时，是否必须关联系统内的房源或合同</div>
            </div>
            <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
                ① 可不关联：添加记账时，可先不关联房源或合同，录入完成后再关联在房源或合同上
            </div>
            <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
                ② 必须关联：添加记账时，必须关联已录入至系统内的房源或合同上
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="finance3.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&finance3.onOff==1" @click="changeResrource(finance3,0)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                    <div class="allCheck f-fl clearfix" v-if="storeDeptId!=firstStoreDeptId&&finance3.onOff==1">
                        <div class="f-fl" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="finance3.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&finance3.onOff==0" @click="changeResrource(finance3,1)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                    <div class="allCheck clearfix" v-if="storeDeptId!=firstStoreDeptId&&finance3.onOff==0">
                        <div class="f-fl" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(finance3,true)" v-if="storeDeptId==firstStoreDeptId">
                    保存
                </a-button>
                <div class="formItemMarginButton unClickStyle f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    保存
                </div>
                <div class="warning f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    <a-icon type="exclamation-circle" style="margin-right: 5px;"/>仅支持在总店设置
                </div>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
              <div class="blueStyle f-fl"></div>
              <div class="titleFont f-fl">已产生流水的账单是否允许作废</div>
            </div>
            <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
              ① 设置允许后，可直接作废此账单。作废成功后，此账单的明细和流水将同步删除。
            </div>
            <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
              ② 设置不允许后，需要将此账单已产生的流水作废后，才可以作废此账单。
            </div>
            <div class="checkBox clearfix">
              <div class="f-fl clearfix">
                <div class="allCheck f-fl checked" v-if="finance4.onOff==1">
                  <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                  <div class="f-fl fontStyle">允许</div>
                </div>
                <div class="allCheck f-fl clearfix cursor" v-if="finance4.onOff==0" @click="changeResrource(finance4,1)">
                  <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                  <div class="f-fl fontStyle">允许</div>
                </div>
              </div>
              <div class="f-fl margin50">
                <div class="allCheck checked clearfix" v-if="finance4.onOff==0">
                  <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                  <div class="f-fl fontStyle">不允许</div>
                </div>
                <div class="allCheck clearfix cursor" v-if="finance4.onOff==1" @click="changeResrource(finance4,0)">
                  <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                  <div class="f-fl fontStyle">不允许</div>
                </div>
              </div>
            </div>
            <div class="saveButton clearfix">
              <a-button size="large" type="primary" class="formItemMarginButton" @click="save(finance4)">
                保存
              </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
              <div class="blueStyle f-fl"></div>
              <div class="titleFont f-fl">线上支付的流水是否允许作废</div>
            </div>
            <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
              ① 设置允许后，线上钱包支付来的流水也可作废；作废成功后，账单将复原
            </div>
            <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
              ② 设置不允许后，线上钱包支付来的流水不可作废
            </div>
            <div class="checkBox clearfix">
              <div class="f-fl clearfix">
                <div class="allCheck f-fl checked" v-if="finance5.onOff==1">
                  <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                  <div class="f-fl fontStyle">允许</div>
                </div>
                <div class="allCheck f-fl clearfix cursor" v-if="finance5.onOff==0" @click="changeResrource(finance5,1)">
                  <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                  <div class="f-fl fontStyle">允许</div>
                </div>
              </div>
              <div class="f-fl margin50">
                <div class="allCheck checked clearfix" v-if="finance5.onOff==0">
                  <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                  <div class="f-fl fontStyle">不允许</div>
                </div>
                <div class="allCheck clearfix cursor" v-if="finance5.onOff==1" @click="changeResrource(finance5,0)">
                  <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                  <div class="f-fl fontStyle">不允许</div>
                </div>
              </div>
            </div>
            <div class="saveButton clearfix">
              <a-button size="large" type="primary" class="formItemMarginButton" @click="save(finance5)">
                保存
              </a-button>
            </div>
        </div>
        <a-modal destroyOnClose centered :footer="null" width="520px" :maskClosable="false" v-model="confirmSaveDialog" class="ownModalBorder titDialog" title="提示" @cancel="confirmSaveDialog=false">
          <confirm-save :storeDeptName="storeDeptName" :storeDeptId="storeDeptId" :onlyFirstStoreDeptFlag="onlyFirstStoreDeptFlag" :data="data" @cancelSave="confirmSaveDialog=false" @successSave="successSave"></confirm-save>
        </a-modal>
    </div>
</template>

<script>
    import ConfirmSave from './confirmSave';
    import  * as API from '@/api/decision';
    export default {
        name: "resourceDecision",
        components: {
          ConfirmSave,
        },
        props: {
            storeDeptId: {
                type: String,
            },
            storeDeptName: {
              type: String,
            },
            firstStoreDeptId: {
                type: String,
            },
        },
        data() {
            return {
                finance1:{},
                finance2:{},
                finance3:{},
                finance4:{},
                finance5:{},
                financeDefault1:{
                    onOff:false,
                    value:'',
                    module:'FINANCE',
                    mark:'FINANCE_BILL_PAY_URGE_AUTO_SEND_MSG',
                    bizPoint:'FINANCE_BILL',
                    chooseType:5,
                    id:'',
                    comment:'',
                    name:'账单自动发送催租短信',
                },
                financeDefault2:{
                    onOff:false,
                    value:{
                        overdays:undefined,
                        percent:undefined,
                    },
                    module:'FINANCE',
                    mark:'FINANCE_BILL_OVERDUE_LATE_FEE',
                    bizPoint:'FINANCE_BILL',
                    chooseType:5,
                    id:'',
                    comment:'',
                    name:'账单逾期产生滞纳金',
                },
                financeDefault3:{
                    onOff:false,
                    value:'',
                    module:'FINANCE',
                    mark:'FINANCE_BILL_MUST_RELATED',
                    bizPoint:'FINANCE_BILL',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'账单添加必须关联系统内的房源',
                },
                financeDefault4:{
                  onOff:true,
                  value:'',
                  module:'FINANCE',
                  mark:'FINANCE_BILL_HAVE_FLOW_ABANDON',
                  bizPoint:'FINANCE_BILL',
                  chooseType:2,
                  id:'',
                  comment:'',
                  name:'已产生流水的账单是否允许作废',
                },
                financeDefault5:{
                  onOff:true,
                  value:'',
                  module:'FINANCE',
                  mark:'FINANCE_BILL_FOLOW_ONLINE_ABANDON',
                  bizPoint:'FINANCE_BILL',
                  chooseType:2,
                  id:'',
                  comment:'',
                  name:'线上支付的流水支付允许作废',
                },
                data:{},
                confirmSaveDialog:false,
                onlyFirstStoreDeptFlag:false,
            }
        },
        created: function () {
            this.initDecisionList();
        },
        methods: {
            successSave(){
              this.confirmSaveDialog = false;
              this.initDecisionList();
            },
            changeResrource(data,val){
                data.onOff = val;
                if(val == 0){
                    data.value = '';
                }
            },
            save(data,val){
                //开启的带输入框的要求必填值
                if((data.chooseType == 5&&data.onOff==1)||data.chooseType == 1){
                    if(!data.value){
                        this.$message.warning('请输入必填项');
                        return;
                    }
                }
                if(data.chooseType == 5&&data.onOff==1&&data.mark == 'FINANCE_BILL_OVERDUE_LATE_FEE'){
                    if(!data.value.overdays||!data.value.percent){
                        this.$message.warning('请输入必填项');
                        return;
                    }
                }
                //设置分店id
                data.storeId = this.storeDeptId;
                this.confirmSaveDialog = true;
                this.data = data;
                if(val){
                  this.onlyFirstStoreDeptFlag = val;
                }
                else{
                  this.onlyFirstStoreDeptFlag = false;
                }
            },
            initDecisionList(){
                let parameter = {
                    module: 'FINANCE',
                    storeId:this.storeDeptId,
                };
                API.decisionList(parameter).then(res => {
                    if (res.code === '200') {
                        this.finance1 = Object.assign({},this.financeDefault1);
                        this.finance2 = Object.assign({},this.financeDefault2);
                        this.finance3 = Object.assign({},this.financeDefault3);
                        this.finance4 = Object.assign({},this.financeDefault4);
                        this.finance5 = Object.assign({},this.financeDefault5);
                        if(res.data && res.data.length > 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                //财务相关
                                if(res.data[i].mark == 'FINANCE_BILL_PAY_URGE_AUTO_SEND_MSG'){
                                    this.finance1 = res.data[i];
                                }
                                else if(res.data[i].mark == 'FINANCE_BILL_OVERDUE_LATE_FEE'){
                                    this.finance2 = res.data[i];
                                    if(this.finance2.onOff==1){
                                        this.finance2.value = JSON.parse(this.finance2.value);
                                    }
                                }
                                else if(res.data[i].mark == 'FINANCE_BILL_MUST_RELATED'){
                                    this.finance3 = res.data[i];
                                }
                                else if(res.data[i].mark == 'FINANCE_BILL_HAVE_FLOW_ABANDON'){
                                  this.finance4 = res.data[i];
                                }
                                else if(res.data[i].mark == 'FINANCE_BILL_FOLOW_ONLINE_ABANDON'){
                                  this.finance5 = res.data[i];
                                }
                            }
                        }
                    }
                });
            },
        },
        watch:{
            storeDeptId() {
                this.initDecisionList();
            },
        },
    }
</script>

<style scoped lang="less">
    .source{
        .title{
            width: 100%;
            .blueStyle{
                width:4px;
                height:16px;
                background:rgba(10,135,248,1);
                border-radius:2px;
            }
            .titleFont{
                height:16px;
                line-height: 16px;
                font-size:16px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:#111111;
                margin-left: 10px;
            }
        }
        .moreDescribe{
            min-height:34px;
        }
        .describe{
            margin: 10px 20px 0 14px;
            padding-left: 5px;
            line-height: 34px;
            background:rgba(247,248,251,1);
            color: #777777;
        }
        .checkBox{
            margin: 14px 0 0 14px;
            .allCheck{
                height: 24px;
                line-height: 24px;
            }
            .checked{
                color: #0A87F8;
                .iconSize{
                    width: 16px;
                    height: 16px;
                }
            }
            .unEditStyle{
                color: #BBBBBB !important;
            }
            .fontStyle{
                margin-left: 8px;
                height:24px;
                font-size:14px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:#111111;
                line-height:24px;
            }
            .inputStyleDiv {
                margin-left: 15px;
                font-size: 12px;
                .mustFill{
                    color:#FB4246;
                    margin-left: 4px;
                }
            }
            .inputStyle {
                width: 56px;
                height: 24px;
            }
            .margin50{
                margin-left: 50px;
            }
            /deep/ .ant-input{
                padding: 4px 5px;
                font-size: 12px;
            }
        }
        .saveButton{
            margin: 20px 0 20px 14px;
            .formItemMarginButton{
                width:100px;
                height:28px;
                background:rgba(10,135,248,1);
                border-radius:4px;
                color: #FFFFFF;
            }
            .unClickStyle{
                background:#DDDDDD !important;
                color: #FFFFFF;
                border:none;
                text-align: center;
                height: 28px;
                line-height: 28px;
            }
            .warning{
                height: 28px;
                line-height: 28px;
                color: #FFA036;
                font-size: 12px;
                margin-left: 13px;
                svg{
                    width: 14px;
                    height: 14px;
                }
            }
        }
        .line{
            margin: 0 20px 20px 14px;
            height:1px;
            border: 1px dashed #DDDDDD;
        }
    }
</style>