<template>
    <div class="house-decision-box">
        <div class="source">
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">房源自动关闭</div>
            </div>
            <div class="describe">
                业主合同退租后，房源自动置为关闭状态
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="house1.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="house1.onOff==0" @click="changeResrource(house1,1)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="house1.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="house1.onOff==1" @click="changeResrource(house1,0)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(house1)">
                    保存
                </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
              <div class="blueStyle f-fl"></div>
              <div class="titleFont f-fl">房源配置是否和物资管理强关联</div>
            </div>
            <div class="describe">
              开启强关联后，房源物品配置只可从仓库调取
            </div>
            <div class="checkBox clearfix">
              <div class="f-fl clearfix">
                <div class="allCheck f-fl checked" v-if="house2.onOff==1">
                  <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                  <div class="f-fl fontStyle">强关联</div>
                </div>
                <div class="allCheck f-fl clearfix cursor" v-if="house2.onOff==0" @click="changeResrource(house2,1)">
                  <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                  <div class="f-fl fontStyle">强关联</div>
                </div>
              </div>
              <div class="f-fl margin50">
                <div class="allCheck checked clearfix" v-if="house2.onOff==0">
                  <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                  <div class="f-fl fontStyle">不强关联</div>
                </div>
                <div class="allCheck clearfix cursor" v-if="house2.onOff==1" @click="changeResrource(house2,0)">
                  <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                  <div class="f-fl fontStyle">不强关联</div>
                </div>
              </div>
            </div>
            <div class="saveButton">
              <a-button size="large" type="primary" class="formItemMarginButton" @click="save(house2)">
                保存
              </a-button>
            </div>
        </div>
      <a-modal destroyOnClose centered :footer="null" width="520px" :maskClosable="false" v-model="confirmSaveDialog" class="ownModalBorder titDialog" title="提示" @cancel="confirmSaveDialog=false">
        <confirm-save :storeDeptName="storeDeptName" :storeDeptId="storeDeptId" :data="data" @cancelSave="confirmSaveDialog=false" @successSave="successSave"></confirm-save>
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
        },
        data() {
            return {
                house1:{},
                houseDefault1:{
                    onOff:false,
                    value:'',
                    module:'HOUSE',
                    mark:'HOUSE_CONTRACT_CLOSE',
                    bizPoint:'HOUSE_RULE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'业主合同退租后,房源自动关闭',
                },
                house2:{},
                houseDefault2:{
                  onOff:false,
                  value:'',
                  module:'HOUSE',
                  mark:'HOUSE_STRONG_ASSOCIATION_ASSETS',
                  bizPoint:'HOUSE_RULE',
                  chooseType:2,
                  id:'',
                  comment:'',
                  name:'房源配置是否和物资管理强关联',
                },
                data:{},
                confirmSaveDialog:false,
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
            save(data){
                //开启的带输入框的要求必填值
                if((data.chooseType == 5&&data.onOff==1)||data.chooseType == 1){
                    if(!data.value){
                        this.$message.warning('请输入必填项');
                        return;
                    }
                }
                //设置分店id
                data.storeId = this.storeDeptId;
                this.confirmSaveDialog = true;
                this.data = data;
            },
            initDecisionList(){
                let parameter = {
                    module: 'HOUSE',
                    storeId:this.storeDeptId,
                };
                API.decisionList(parameter).then(res => {
                    if (res.code === '200') {
                        this.house1 = Object.assign({},this.houseDefault1);
                        this.house2 = Object.assign({},this.houseDefault2);
                        if(res.data && res.data.length > 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                //房源自动关闭
                                if(res.data[i].mark == 'HOUSE_CONTRACT_CLOSE'){
                                    this.house1 = res.data[i];
                                }
                                //房源配置是否和资产管理强关联
                                if(res.data[i].mark == 'HOUSE_STRONG_ASSOCIATION_ASSETS'){
                                  this.house2 = res.data[i];
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
        .describe{
            margin: 10px 20px 0 14px;
            padding-left: 5px;
            min-height:34px;
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
        }
        .line{
            margin: 0 20px 20px 14px;
            height:1px;
            border: 1px dashed #DDDDDD;
        }
    }
</style>