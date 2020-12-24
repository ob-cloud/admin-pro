<template>
    <div class="decision-box">
        <div class="decision f-clearfix">
            <div class="left">
                <div class="dictionaryList f-clearfix">
                    <a-list itemLayout="horizontal" v-if="decisionDataList.length>0" :dataSource="decisionDataList" :split="false">
                        <a-list-item slot="renderItem" slot-scope="item" class="listItemClass"
                                     @click="leftItemClick(item)">
                            <a-list-item-meta>
                                <div slot="title" class="listItemNameClass f-clearfix cursor">
                                    <div :class="item.module==module?'bgClick f-clearfix':'f-clearfix'">
                                        <div class="itemIcon" v-if="item.module=='RESOURCE'">
                                            <icon-font type="icon-yumengtubiao_jueceguanli-ziyuan"/>
                                        </div>
                                        <div class="itemIcon" v-if="item.module=='HOUSE'">
                                            <icon-font type="iconyumengtubiao_fangyuan-2"/>
                                        </div>
                                        <div class="itemIcon" v-if="item.module=='CONTRACT'">
                                            <icon-font type="iconyumengtubiao_heyue"/>
                                        </div>
                                        <div class="itemIcon" v-if="item.module=='FINANCE'">
                                            <icon-font type="iconyumengtubiao_caiwuzhangdan"/>
                                        </div>
                                        <div class="itemIcon" v-if="item.module=='AFTER_RENT'">
                                            <icon-font type="icon-yumengtubiao_jueceguanli-zuhou"/>
                                        </div>
                                        <div class="itemIcon" v-if="item.module=='MARKETING'">
                                            <icon-font type="iconyingxiaotuiguang"/>
                                        </div>
                                        <div class="itemIcon" v-if="item.module=='SMART_DEVICE'">
                                          <icon-font type="iconzhinengshebei"/>
                                        </div>
                                        <div class="itemIcon" v-if="item.module=='WALLET'">
                                          <icon-font type="iconqiandai"/>
                                        </div>
                                        <div class="itemName">{{item.name}}</div>
                                    </div>
                                </div>
                            </a-list-item-meta>
                        </a-list-item>
                    </a-list>
                </div>
            </div>
            <div class="right">
                <div class="right-header">
                    <div class="right-header-left clearfix">
                        <span class="title f-fl">门店：</span>
                        <label-item title="" class="u-no-border deptStyle f-fl">
                            <a-select style="width: 120px;height: 34px;" placeholder="请选择门店" :showSearch="true" :filterOption="(inputValue,option)=>filterOption(inputValue,option)" @change="handleChange" :default-value="storeDeptId" v-if="storeDeptList&&storeDeptList.length>0">
                                <a-select-option v-for="(item) in storeDeptList" :key="item.id">
                                    {{ item.name }}
                                </a-select-option>
                            </a-select>
                        </label-item>
                    </div>
                    <div class="right-header-center clearfix">
                        <div class="item item-left cursor f-fl" :class="activekey==1?'active-item':'not-active-item item-left-not-active'" @click="changeActivekey(1)">决策配置</div>
                        <div class="item item-right cursor f-fl" :class="activekey==2?'active-item':'not-active-item item-right-not-active'" @click="changeActivekey(2)">默认字段配置</div>
                    </div>
                </div>
                <div v-if="module=='RESOURCE'&&activekey==1">
                    <resource-decision v-if="storeDeptId" :storeDeptId="storeDeptId" :storeDeptName="storeDeptName" :firstStoreDeptId="firstStoreDeptId"></resource-decision>
                </div>
                <div v-if="module=='RESOURCE'&&activekey==2">
                    <resource-default v-if="storeDeptId" :storeDeptId="storeDeptId" :storeDeptName="storeDeptName"></resource-default>
                </div>
                <div v-if="module=='HOUSE'&&activekey==1">
                    <house-decision v-if="storeDeptId" :storeDeptId="storeDeptId" :storeDeptName="storeDeptName"></house-decision>
                </div>
                <div v-if="module=='HOUSE'&&activekey==2">
                    <house-default v-if="storeDeptId" :storeDeptId="storeDeptId" :storeDeptName="storeDeptName"></house-default>
                </div>
                <div v-if="module=='CONTRACT'&&activekey==1">
                    <contract-decision v-if="storeDeptId" :storeDeptId="storeDeptId" :firstStoreDeptId="firstStoreDeptId"></contract-decision>
                </div>
                <div v-if="module=='CONTRACT'&&activekey==2">
                    <contract-default v-if="storeDeptId" :storeDeptId="storeDeptId" :storeDeptName="storeDeptName"></contract-default>
                </div>
                <div v-if="module=='FINANCE'&&activekey==1">
                    <finance-decision v-if="storeDeptId" :storeDeptId="storeDeptId" :storeDeptName="storeDeptName" :firstStoreDeptId="firstStoreDeptId"></finance-decision>
                </div>
                <div v-if="module=='FINANCE'&&activekey==2">
                    <finance-default v-if="storeDeptId" :storeDeptId="storeDeptId" :storeDeptName="storeDeptName"></finance-default>
                </div>
                <div v-if="module=='AFTER_RENT'&&activekey==1">
                    <after-renter-decision v-if="storeDeptId" :storeDeptId="storeDeptId" :storeDeptName="storeDeptName" :firstStoreDeptId="firstStoreDeptId"></after-renter-decision>
                </div>
                <div v-if="module=='AFTER_RENT'&&activekey==2">
                    <after-renter-default v-if="storeDeptId" :storeDeptId="storeDeptId" :storeDeptName="storeDeptName"></after-renter-default>
                </div>
                <div v-if="module=='MARKETING'&&activekey==1">
                    <promote-decision v-if="storeDeptId" :storeDeptId="storeDeptId" :storeDeptName="storeDeptName"></promote-decision>
                </div>
                <div v-if="module=='MARKETING'&&activekey==2">
                    <promote-default v-if="storeDeptId" :storeDeptId="storeDeptId" :storeDeptName="storeDeptName"></promote-default>
                </div>
                <div v-if="module=='SMART_DEVICE'&&activekey==1">
                  <smart-devices-decision v-if="storeDeptId" :storeDeptId="storeDeptId" :storeDeptName="storeDeptName"></smart-devices-decision>
                </div>
                <div v-if="module=='SMART_DEVICE'&&activekey==2">
                  <smart-devices-default v-if="storeDeptId" :storeDeptId="storeDeptId" :storeDeptName="storeDeptName"></smart-devices-default>
                </div>
                <div v-if="module=='WALLET'&&activekey==1">
                  <wallet-decision v-if="storeDeptId" :storeDeptId="storeDeptId" :firstStoreDeptId="firstStoreDeptId" :storeDeptName="storeDeptName"></wallet-decision>
                </div>
                <div v-if="module=='WALLET'&&activekey==2">
                  <wallet-default v-if="storeDeptId" :storeDeptId="storeDeptId" :storeDeptName="storeDeptName"></wallet-default>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import  * as API from '@/api/decision';
    import ResourceDecision from './resourceDecision';
    import ResourceDefault from './resourceDefault';
    import HouseDecision from './houseDecision';
    import HouseDefault from './houseDefault';
    import ContractDecision from './contractDecision';
    import ContractDefault from './contractDefault';
    import FinanceDecision from './financeDecision';
    import FinanceDefault from './financeDefault';
    import AfterRenterDecision from './afterRenterDecision';
    import AfterRenterDefault from './afterRenterDefault';
    import PromoteDecision from './promoteDecision';
    import PromoteDefault from './promoteDefault';
    import SmartDevicesDecision from './smartDevicesDecision';
    import SmartDevicesDefault from './smartDevicesDefault';
    import WalletDecision from './walletDecision';
    import WalletDefault from './walletDefault';
    export default {
        name: "index",
        components: {
            ResourceDecision,
            ResourceDefault,
            HouseDecision,
            HouseDefault,
            ContractDecision,
            ContractDefault,
            FinanceDecision,
            FinanceDefault,
            AfterRenterDecision,
            AfterRenterDefault,
            PromoteDecision,
            PromoteDefault,
            SmartDevicesDecision,
            SmartDevicesDefault,
            WalletDecision,
            WalletDefault,
        },
        data() {
            return {
                decisionDataList: [],
                module: "RESOURCE",             //初始化模块（房源、合约....）
                activekey:1,        //1、决策配置；2、默认字段配置
                storeDeptList:[],   //门店列表
                storeDeptId:'',
                storeDeptName:'',
                firstStoreDeptId:'',    //总店id
            }
        },
        created: function () {
            this.listStoreDept();
            this.initDecisionList(true);
        },
        methods: {
          //来自自定义搜索
          filterOption(inputValue,option){
            if(!inputValue){
              return true;
            }
            return option.componentOptions.children[0].text.indexOf(inputValue) > -1;
          },
            //左侧某一项点击
            leftItemClick(item) {
                //点击左侧列表项，获取字典列表
                this.module = item.module;
                //this.initDecisionList();
            },
            changeActivekey(val){
                this.activekey = val;
            },
            listStoreDept(){
                API.listStoreDept().then(res => {
                    if (res.code === '200') {
                        this.storeDeptList = res.data;
                        if(this.storeDeptList&&this.storeDeptList.length>0){
                            this.storeDeptId = this.storeDeptList[0].id;
                            this.storeDeptName = this.storeDeptList[0].name;
                            this.firstStoreDeptId = this.storeDeptList[0].id;
                        }
                    }
                });
            },
            handleChange(value){
                this.storeDeptId = value;
                this.storeDeptList.forEach((item)=>{
                  if(item.id == this.storeDeptId){
                    this.storeDeptName = item.name;
                  }
                })
            },
            //页面初始化
            initDecisionList(init) {
                if(init){
                    this.module = 'RESOURCE';
                }
                this.decisionDataList = [
                    {module:'RESOURCE',name:"线索管理"},
                    {module:'HOUSE',name:"房源管理"},
                    {module:'CONTRACT',name:"合约管理"},
                    {module:'FINANCE',name:"财务管理"},
                    {module:'AFTER_RENT',name:"工单服务"},
                    {module:'SMART_DEVICE',name:"智能设备"},
                    {module:'WALLET',name:"钱包管理"},
                ];
            }
        }
    }
</script>

<style scoped lang="less">
    .decision-box {
        height: 100%;
      min-width: 1270px;
        .decision   {
            background-color: #F1F2F5;
            height: 100%;
            .left {
                width: 166px;
                background-color: #FFFFFF;
                float: left;
                position: absolute;
                height: calc(100vh - 135px);
                .dictionaryList  {
                    margin-top: 15px;
                    .listItemClass {
                        height: 40px;
                        line-height: 40px;
                        margin-left: 22px;
                        .itemIcon {
                            float: left;
                        }
                        .itemName {
                            float: left;
                            margin-left: 8px;
                        }
                    }
                    .bgClick {
                        color: @themeColor;
                    }
                }
            }
            .right {
                width: calc(100% - 174px);
                background-color: #FFFFFF;
                float: right;
                min-height: calc(100vh - 220px);
                padding: 10px;
                .right-header{
                    height: 34px;
                    border-bottom: 1px solid #EEEEEE;
                    position: relative;
                    margin-bottom: 25px;
                    .right-header-left{
                        width: 184px;
                        height: 34px;
                        padding: 0 10px;
                        line-height: 34px;
                        position: absolute;
                        background:rgba(246,247,251,1);
                        border-radius:4px 4px 0px 0px;
                        left: 0;
                        .title{
                            color: #777777;
                            font-size: 14px;
                        }
                    }
                    .right-header-center{
                        margin: 0 auto;
                        width: 220px;
                        .item{
                            width:110px;
                            text-align: center;
                            font-size: 14px;
                        }
                        .item-left-not-active{
                            border-radius:4px 0 0px 0px;
                            border-right: none !important;
                        }
                        .item-right-not-active{
                            border-radius:0 4px 0px 0px;
                            border-left: none !important;
                        }
                        .active-item{
                            height: 34px;
                            line-height: 34px;
                            background:rgba(10,135,248,1);
                            color: #FFFFFF;
                            border-radius:4px 4px 0px 0px;
                        }
                        .not-active-item{
                            margin-top: 4px;
                            height:30px;
                            line-height: 30px;
                            background:rgba(246,247,248,1);
                            color: #777777;
                            border:1px solid rgba(238,238,238,1);
                        }
                    }
                }
            }
        }
        & /deep/  svg{
            width:16px;
            height: 16px;
        }
        .deptStyle{
            /deep/ .ant-select-selection{
                background:rgba(246,247,251,1);
            }
            /deep/ .ant-select-arrow{
                margin-bottom: 10px;
            }
            /deep/ svg{
                width: 12px;
                height: 12px;
            }
        }

    }
</style>