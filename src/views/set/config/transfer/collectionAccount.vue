<template>
    <div class="collectionAccount-box">
        <div class="warnningStyle clearfix cursor">
            <div class="f-fl" style="width: 24px;margin:0 12px 0 20px;height: 54px;line-height: 54px;">
                <icon-font type="icontongzhi"/>
            </div>
            <div class="f-fl" style="padding: 9px 20px 9px 0;font-size: 12px;width: calc(100% - 56px);">
                设置分账比例后，签署了合同的租约相应账单通过在线支付的部分会自动按照比例将资金本门店分至指定的门店账户， 配置后即时生效， 请谨慎修改！
            </div>
        </div>
        <div class="contentStyle">
            <div class="titleStyle" style="margin: 3.5px 0 5px 0;">
                分账账户设置
            </div>
            <div class="clearfix">
                <label-item title="请选择分账收款账户" :must-fill="true" class="u-bottom-border f-fl" style="width: 250px;margin-right: 30px;">
                    <a-select style="width: 100%;" :showSearch="true" :filterOption="(inputValue,option)=>filterOption(inputValue,option)" placeholder="请选择指定账户" v-model="allocationSettingForm.transferAccountId">
                        <a-select-option v-for="item in transferAccountList" :disabled="item.disabled" :key="item.id" :value="item.id">
                            {{ item.alias }}
                        </a-select-option>
                    </a-select>
                </label-item>
              <label-item title="请选择分账收款门店" :must-fill="true" class="u-bottom-border f-fl" style="width: 250px;margin-right: 30px;">
                <a-select style="width: 250px;height: 34px;" placeholder="请选择分账收款门店" :showSearch="true" :filterOption="(inputValue,option)=>filterOption_dept(inputValue,option)" @change="handleChange" v-model="allocationSettingForm.transferStoreId">
                  <a-select-option v-for="(item) in storeDeptList" :key="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </label-item>
              <label-item title="" class="f-fl" style="margin-top: 36px;">
                <a-checkbox v-model="isOfflineReceiveAllocation">
                  开通线下收款分账
                </a-checkbox>
              </label-item>
            </div>
            <div class="clearfix" style="margin-top: 28.5px;">
                <div class="titleStyle f-fl">费用分账配置</div><div class="f-fl" style="height: 27px;line-height: 27px;"><a-icon type="exclamation-circle" style="color: #FFA036;margin:0 4px 0 10px;font-size: 12px;" /><span style="color: #FFA036;font-size: 12px;">配置的费用项在租客通过在线支付时，此费用金额会自动根据设置的比例将资金分至指定的账户内</span></div>
            </div>

            <div class="basicsInfo" style="margin-top: 13.5px;">
                <div class="headStyle clearfix">
                  <div class="itemStyle f-fl leftStyle cursor" :class="allocationSettingForm.isWholeAllocation==0?'selectedStyle':'unSelectedStyle'" @click="allocationSettingForm.isWholeAllocation=0">自定义分账</div>
                  <div class="itemStyle f-fl rightStyle cursor" :class="allocationSettingForm.isWholeAllocation==1?'selectedStyle':'unSelectedStyle'"  @click="allocationSettingForm.isWholeAllocation=1">全部分账</div>
                </div>
                <div class="table">
                    <div class="table-title">
                        <div style="max-width: 250px;text-align: left;padding-left: 12px;color: #777777;font-size: 13px;border-radius:4px 0px 0px 0px;">费用科目</div>
                        <div style="max-width: 443px;text-align: left;padding-left: 14px;color: #777777;font-size: 13px;" v-if="allocationSettingForm.isWholeAllocation==0">分账金额</div>
                        <div style="max-width: 65px;text-align: center;color: #777777;font-size: 13px;border-radius:0px 4px 0px 0px;" v-if="allocationSettingForm.isWholeAllocation==0">操作</div>
                        <div style="max-width: 508px;text-align: left;padding-left: 14px;color: #777777;font-size: 13px;" v-if="allocationSettingForm.isWholeAllocation==1">分账百分比</div>
                    </div>
                    <div class="house-data u-no-border" v-if="allocationSettingForm.costAllocation.length==0&&allocationSettingForm.isWholeAllocation==0">
                        <div class="addStyle" style="height: 130px;">
                            <div style="margin-top: 27px;text-align: center;color: #BBBBBB;">还未设置线上支付单笔费用分成</div>
                            <div class="cursor" style="height: 30px;line-height: 30px;text-align: center;color: #0A87F8;" @click="addCostAllocationObj(true)"><icon-font style="margin-right: 2px;" type="iconyumengtubiao_tianjia" />添加</div>
                        </div>
                    </div>
                    <div class="house-data u-no-border" v-if="allocationSettingForm.isWholeAllocation==0" v-for="(item,index) in allocationSettingForm.costAllocation" :key="index">
                        <div style="max-width: 250px;padding-left: 12px;">
                            <a-cascader class="myCascader" style="width: 200px;" placeholder="请选择" v-model="allocationCost_ids[index]" :options="costTabsContent_01" :allowClear="false" :fieldNames="elcostcascaderValue" @change="(value) => costSelect(value, index,item,1)"></a-cascader>
                        </div>
                        <div class="clearfix" style="max-width: 443px;padding-left: 12px;">
                            <label-item title="" class="u-no-border f-fl">
                                <a-select style="width: 120px;height: 34px;" :allowClear="false" placeholder="请选择" v-model="item.allocationType" @change="changeAllocationType(item,index)">
                                    <a-select-option :value="1">固定金额</a-select-option>
                                    <a-select-option :value="2">百分比</a-select-option>
                                </a-select>
                            </label-item>
                            <div class="house-data-item-left f-fl" style="padding-left: 21px;" v-show="item.allocationType==1">
                                <span  class="addonBeforeStyle">¥</span>
                                <a-input style="width: 80px" v-model="allocationCost_inputs[index]" v-validate="'money'" placeholder="请输入" />
                                <span  class="addonAfterStyle">元</span>
                            </div>
                            <div class="house-data-item-left f-fl" style="padding-left: 21px;" v-show="item.allocationType==2">
                                <a-input style="width: 80px" v-model="allocationCost_inputs[index]" v-validate="'naturalNum|min(1)|max(100)'" placeholder="请输入" />
                                <span  class="addonAfterStyle">%</span>
                            </div>
                        </div>
                        <div style="max-width: 65px;text-align: center;">
                            <icon-font @click="deleteSubject(index,1)" class="delete-icon" type="iconyumengtubiao_shanchu-"></icon-font>
                        </div>
                    </div>
                    <div class="house-data u-no-border" v-if="allocationSettingForm.costAllocation.length>0&&allocationSettingForm.isWholeAllocation==0">
                        <div class="addStyle cursor" style="text-align: center;color: #0A87F8;" @click="addCostAllocationObj(false)"><icon-font style="margin-right: 2px;" type="iconyumengtubiao_tianjia" />继续添加</div>
                    </div>
                    <div class="house-data u-no-border" v-if="allocationSettingForm.isWholeAllocation==1">
                        <div style="max-width: 250px;padding-left: 12px;">分账所有费用项</div>
                        <div class="clearfix" style="max-width: 508px;padding-left: 14px;">
                          <div class="f-fl" style="width: 120px;position: relative">
                            <span>百分比</span>
                            <div style="position: absolute;width: 1px;height: 16px;background: #EEEEEE;right: 0px;top:14px;"></div>
                          </div>
                          <div class="house-data-item-left f-fl" style="padding-left: 21px;">
                            <a-input style="width: 80px" v-model="allocationSettingForm.wholeAllocationPercent" v-validate="'naturalNum|min(1)|max(100)'" placeholder="请输入" />
                            <span  class="addonAfterStyle">%</span>
                          </div>
                        </div>
                    </div>
                    <div class="house-data u-no-border" style="border-radius:0px 0px 4px 4px;">
                        <div style="height: 95px;background: #FAFBFC;border-radius:0px 0px 4px 4px;">
                            <div style="margin: 8px 0 0 11px;"><span style="color: #111111;font-size: 14px;">手续费承担</span><span style="font-size: 12px;color: #777777;margin-left: 5px;">(入账/分账时所产生的手续费由哪方承担)</span></div>
                            <div style="height: 26px;line-height: 26px;margin-left: 11px;">
                                <a-radio-group v-model="allocationSettingForm.handlingFeeBearType">
                                    <a-radio :value="1">
                                        各自承担自己所得
                                    </a-radio>
                                    <a-radio :value="2">
                                        分账到指定账户承担100%
                                    </a-radio>
                                    <a-radio :value="3">
                                        当前账户承担100%
                                    </a-radio>
                                </a-radio-group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix" style="margin-top: 28.5px;">
                <div class="titleStyle f-fl">每月固定分成</div><div class="f-fl" style="height: 27px;line-height: 27px;"><a-icon type="exclamation-circle" style="color: #FFA036;margin:0 4px 0 10px;font-size: 12px;" /><span style="color: #FFA036;font-size: 12px;">每月固定日期从此钱包账户分成</span></div>
            </div>
            <div class="basicsInfo" style="margin-top: 13.5px;">
                <div class="table">
                    <div class="table-title">
                        <div style="max-width: 250px;text-align: left;padding-left: 12px;color: #777777;font-size: 13px;">费用科目</div>
                        <div style="max-width: 175px;text-align: left;padding-left: 14px;color: #777777;font-size: 13px;">分成金额</div>
                        <div style="max-width: 268px;text-align: left;padding-left: 20px;color: #777777;font-size: 13px;">扣款日期</div>
                        <div style="max-width: 65px;text-align: center;color: #777777;font-size: 13px;">操作</div>
                    </div>
                    <div class="house-data u-no-border" v-if="allocationSettingForm.monthAllocation.length==0" style="border-radius:0px 0px 4px 4px;">
                        <div class="addStyle" style="height: 130px;border-radius: 0px 0px 4px 4px;">
                            <div style="margin-top: 27px;text-align: center;color: #BBBBBB;">还未设置每月固定分成费用</div>
                            <div class="cursor" style="height: 30px;line-height: 30px;text-align: center;color: #0A87F8;" @click="addMonthAllocationObj(true)"><icon-font style="margin-right: 2px;" type="iconyumengtubiao_tianjia" />添加</div>
                        </div>
                    </div>
                    <div class="house-data u-no-border" v-for="(item,index) in allocationSettingForm.monthAllocation" :key="index" style="border-radius:0px 0px 4px 4px;">
                        <div style="max-width: 250px;padding-left: 12px;">
                            <a-cascader class="myCascader" style="width: 200px;" placeholder="请选择" v-model="allocationAmount_ids[index]" :options="costTabsContent_02" :allowClear="false" :fieldNames="elcostcascaderValue" @change="(value) => costSelect(value, index,item,2)"></a-cascader>
                        </div>
                        <div style="max-width: 175px;text-align: left;padding-left: 14px;">
                            <div class="house-data-item-left" style="margin-left: 0px;">
                                <a-input style="width: 100px" v-model="allocationAmount_inputs[index]" v-validate="'money'" placeholder="请输入" />
                                <span  class="addonAfterStyle">元</span>
                            </div>
                        </div>
                        <div style="max-width: 268px;text-align: left;padding-left: 20px;">
                            <div class="house-data-item-left">
                                <span  class="addonBeforeStyle" style="left:-40px;">每月</span>
                                <a-select style="width: 120px;height: 34px;" placeholder="请选择" v-model="item.withholdDay">
                                    <a-select-option v-for="item in withholdDayList" :key="item.id" :value="item.id">
                                        {{ item.name }}
                                    </a-select-option>
                                </a-select>
                            </div>
                        </div>
                        <div style="max-width: 65px;text-align: center;">
                            <icon-font @click="deleteSubject(index,2)" class="delete-icon" type="iconyumengtubiao_shanchu-"></icon-font>
                        </div>
                    </div>
                    <div class="house-data u-no-border" v-if="allocationSettingForm.monthAllocation.length>0" style="border-radius:0px 0px 4px 4px;">
                        <div class="addStyle cursor" style="text-align: center;color: #0A87F8;border-radius:0px 0px 4px 4px;" @click="addMonthAllocationObj(false)"><icon-font style="margin-right: 2px;" type="iconyumengtubiao_tianjia" />继续添加</div>
                    </div>
                </div>
            </div>
            <div class="clearfix" style="width: 100%;margin-top:50px;">
                <div class="buttonDiv f-fr">
                    <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
                        取消
                    </a-button>
                    <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="save">
                        保存
                    </a-button>
                </div>
                <div class="f-fr cursor" style="height: 40px;line-height: 40px;" @click="closeAllocationSetting" v-if="detailId">
                  <icon-font type="iconyumengtubiao_jinyong" style="color: #0A87F8;margin:0 4px 0 10px;font-size: 14px;" />
                  <span style="color: #0A87F8;font-size: 14px;">关闭分账</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as API from '@/api/setConfig';
    import {waListAllAccount} from '@/api/wallet';
    import  {listStoreDept} from '@/api/decision';
    import {
        dictionaryListDict,
    } from '@/api/contract.js';
    export default {
        name: "collectionAccount",
        components: {
        },
        props: {
            id:{
                type:String,
            },
          walletAccountId:{
            type:String,
          },
          collectionAccountDept:{
            type:String,
          },
        },
        data() {
            return {
                transferAccountList:[],
                allocationSettingForm:{
                    costAllocation:[],
                    transferAccountId:undefined,
                    transferStoreId:undefined,
                    isOfflineReceiveAllocation:0,
                    handlingFeeBearType:1,          //1：各自承担所得；2：受让账户承担；3：当前账户承担
                    id:'',
                    monthAllocation:[],
                    isWholeAllocation:0,            //是否是全部分账（1：是；0：否）
                    wholeAllocationPercent:'',      //全部分账百分比（x100后的值）
                },
                elcostcascaderValue: {
                    value: 'id',
                    label: 'name',
                    children: 'metaList'
                },
                costTabsContent_01: [], // 费用分账配置
                checkedFeeSubjectIds_01:[], //已选择的费用科目(费用分账配置)
                costTabsContent_02: [], // 每月固定分成
                checkedFeeSubjectIds_02:[], //已选择的费用科目(每月固定分成)
                originCostTabsContent:[],//原始的所有费用科目
                costAllocationObj:{
                    feeSubjectId:'',
                    allocationType:1,
                    allocationValue:'',
                    allocationValue_input:'',
                },
                monthAllocationObj:{
                    feeSubjectId:'',
                    allocationAmount:'',
                    withholdDay:15,
                    allocationAmount_input:'',
                },
                withholdDayList:[],
                saveLoading:false,
              allocationCost_inputs:[],
              allocationAmount_inputs:[],
              allocationCost_ids:[],
              allocationAmount_ids:[],
              isOfflineReceiveAllocation:false,
              storeDeptList:[],
              detailId:'',
            }
        },
        mounted(){

        },
        created() {
            this.getAllocationSetting();
            this.getWithholdDayList();
            this.listTransferAccount();
            this.listStoreDept();
            this.getCost();
        },
        methods: {
          listStoreDept(){
            listStoreDept().then(res => {
              if (res.code === '200') {
                this.storeDeptList = res.data;
              }
            });
          },
          handleChange(value){
            this.allocationSettingForm.transferStoreId = value;
          },
          //来自自定义搜索
          filterOption_dept(inputValue,option){
            if(!inputValue){
              return true;
            }
            return option.componentOptions.children[0].text.indexOf(inputValue) > -1;
          },
          //来自自定义搜索
          filterOption(inputValue,option){
            if(!inputValue){
              return true;
            }
            return option.componentOptions.children[0].text.indexOf(inputValue) > -1;
          },
          changeAllocationType(item,index){
            if( item.allocationType == 2 && this.allocationCost_inputs[index]>100){
                this.$message.warning('最大值不能大于100');
              this.allocationCost_inputs[index] = 100;
            }
          },
            getAllocationSetting(){
                API.getAllocationSetting({id:this.id}).then(res =>{
                    if(res.code === '200'){
                        this.allocationSettingForm = res.data;
                        this.detailId = res.data.id;
                        if(!this.allocationSettingForm.transferAccountId){
                            this.allocationSettingForm.transferAccountId = undefined;
                        }
                        if(!this.allocationSettingForm.transferStoreId){
                          this.allocationSettingForm.transferStoreId = undefined;
                        }
                        if(this.allocationSettingForm.isOfflineReceiveAllocation==1){
                          this.isOfflineReceiveAllocation = true;
                        }
                        else{
                          this.isOfflineReceiveAllocation = false;
                        }
                        if(!this.allocationSettingForm.handlingFeeBearType||this.allocationSettingForm.handlingFeeBearType==null){
                            this.allocationSettingForm.handlingFeeBearType = 1;
                        }
                        this.allocationCost_inputs = [];
                        this.allocationCost_ids = [];
                        if(this.allocationSettingForm.costAllocation){
                            this.allocationSettingForm.costAllocation.forEach((item)=>{
                                item.id = [];
                                item.id.push(item.feeSubjectPid);
                                item.id.push(item.feeSubjectId);
                              this.allocationCost_ids.push(item.id);
                              if(item.allocationType == 1){
                                this.allocationCost_inputs.push(item.allocationValue/100);
                              }
                              else{
                                this.allocationCost_inputs.push(item.allocationValue);
                              }
                            });
                        }
                        this.allocationAmount_inputs = [];
                      this.allocationAmount_ids = [];
                        if(this.allocationSettingForm.monthAllocation){
                            this.allocationSettingForm.monthAllocation.forEach((item)=>{
                              this.allocationAmount_inputs.push(item.allocationAmount/100);
                                item.id = [];
                                item.id.push(item.feeSubjectPid);
                                item.id.push(item.feeSubjectId);
                              this.allocationAmount_ids.push(item.id);
                            });
                        }
                    }
                })
            },
          closeAllocationSetting(){
            let _this = this;
            this.$modal.confirm({
              title: '确定要关闭 「' + this.collectionAccountDept + '」 的分账吗？',
              content: '关闭后，收入的金额，将不会分到其他账户',
              okText: '确定',
              cancelText: '取消',
              onOk() {
                API.closeAllocationSetting({id:_this.detailId}).then(res => {
                  // console.log(res)
                  if (res.code == 200) {
                    _this.$message.success('分账关闭成功！');
                    setTimeout(() => {
                      _this.$emit('cancelSave',true);
                    }, 500)

                  }
                })
              },
              onCancel() {
              },
            });
          },
            cancelSave(){
                this.$emit('cancelSave');
            },
            checkData(){
                //检验
                if(!this.allocationSettingForm.transferAccountId){
                    this.$message.warning('请选择分账指定账户');
                    return false;
                }
                if(!this.allocationSettingForm.transferStoreId){
                  this.$message.warning('请选择分账收款门店');
                  return false;
                }
                if(((this.allocationSettingForm.isWholeAllocation==0&&this.allocationSettingForm.costAllocation.length==0)
                    ||(this.allocationSettingForm.isWholeAllocation==1&&!this.allocationSettingForm.wholeAllocationPercent))&&this.allocationSettingForm.monthAllocation.length==0){
                    this.$message.warning('请完善分账配置');
                    return false;
                }
                if(this.allocationSettingForm.isWholeAllocation==1&&!this.allocationSettingForm.wholeAllocationPercent){
                  this.$message.warning('请设置费用分账配置');
                  return false;
                }
                if(this.allocationSettingForm.isWholeAllocation==0&&this.allocationSettingForm.costAllocation.length==0){
                  this.$message.warning('请设置费用分账配置');
                  return false;
                }
                if(this.allocationSettingForm.isWholeAllocation==0&&this.allocationSettingForm.costAllocation.length>0){
                    let temp = false;
                    this.allocationSettingForm.costAllocation.forEach((item,index)=>{
                        if(!item.feeSubjectId||!this.allocationCost_inputs[index]){
                            temp = true;
                        }
                        if(item.allocationType == 1){
                            item.allocationValue =  Math.round(this.allocationCost_inputs[index] * 100);
                        }
                        else{
                            item.allocationValue = this.allocationCost_inputs[index];
                        }
                    });
                    if(temp){
                        this.$message.warning('请完善费用分账配置信息');
                        return false;
                    }
                }
                if(this.allocationSettingForm.monthAllocation.length>0){
                    let temp = false;
                    this.allocationSettingForm.monthAllocation.forEach((item,index)=>{
                        if(!item.feeSubjectId||!this.allocationAmount_inputs[index]||!item.withholdDay){
                            temp = true;
                        }
                        item.allocationAmount =  Math.round(this.allocationAmount_inputs[index] * 100);
                    });
                    if(temp){
                        this.$message.warning('请完善每月固定分成信息');
                        return false;
                    }
                }
                return true;
            },
            save(){
                if(this.checkData()){
                    this.saveLoading = true;
                    this.allocationSettingForm.id = this.id;
                    if(this.isOfflineReceiveAllocation){
                      this.allocationSettingForm.isOfflineReceiveAllocation = 1;
                    }
                    else{
                      this.allocationSettingForm.isOfflineReceiveAllocation = 0;
                    }
                    API.allocationSetting(this.allocationSettingForm).then(res =>{
                        if(!res){
                            this.saveLoading = false;
                        }
                        if(res.code === '200'){
                            this.$message.info('线上支付分账设置成功');
                            this.saveLoading = false;
                            this.$emit('saveSuccess');
                        }
                        else{
                            this.$message.error('线上支付分账设置失败');
                            this.saveLoading = false;
                        }
                    })
                }
            },
            getWithholdDayList(){
                this.withholdDayList = [];
                for (let i = 0; i < 31; i++) {
                    let obj = {
                        id: i+1,
                        name:(i+1)+'号',
                    };
                    this.withholdDayList.push(obj);
                }
            },
            addCostAllocationObj(firstFlag){
                let obj = Object.assign({},this.costAllocationObj);
                if(!firstFlag){
                    let temp = false;
                    this.allocationSettingForm.costAllocation.forEach((item,index)=>{
                        if(!item.feeSubjectId||!this.allocationCost_inputs[index]){
                            temp = true;
                        }
                    });
                    if(temp){
                        this.$message.warning('请完善费用分账配置信息');
                        return;
                    }
                    //获取所有选中费用科目
                    this.checkedFeeSubjectIds_01 = [];
                    this.allocationSettingForm.costAllocation.forEach((item)=>{
                        this.checkedFeeSubjectIds_01.push(item.feeSubjectId);
                    });
                    this.costTabsContent_01 = this.initOriginCostTabsContent();
                    this.costTabsContent_01.forEach((item)=>{
                        item.metaList.forEach((temp)=>{
                            let pos = this.checkedFeeSubjectIds_01.indexOf(temp.id);
                            if(pos > -1){
                                temp.disabled = true;
                            }
                            else{
                                temp.disabled = false;
                            }
                        })
                    });
                    this.allocationCost_inputs.push('');
                    this.allocationCost_ids.push([]);
                    this.allocationSettingForm.costAllocation.push(obj);
                }
                else{
                    this.checkedFeeSubjectIds_01 = [];
                    this.costTabsContent_01 = this.initOriginCostTabsContent();
                    this.costTabsContent_01.forEach((item)=>{
                        item.metaList.forEach((temp)=>{
                            temp.disabled = false;
                        })
                    });
                  this.allocationCost_inputs.push('');
                  this.allocationCost_ids.push([]);
                    this.allocationSettingForm.costAllocation.push(obj);
                }
            },
            addMonthAllocationObj(firstFlag){
                let obj = Object.assign({},this.monthAllocationObj);
                if(!firstFlag){
                    let temp = false;
                    this.allocationSettingForm.monthAllocation.forEach((item,index)=>{
                        if(!item.feeSubjectId||!this.allocationAmount_inputs[index]||!item.withholdDay){
                            temp = true;
                        }
                    });
                    if(temp){
                        this.$message.warning('请完善每月固定分成信息');
                        return;
                    }
                    //获取所有选中费用科目
                    this.checkedFeeSubjectIds_02 = [];
                    this.allocationSettingForm.monthAllocation.forEach((item)=>{
                        this.checkedFeeSubjectIds_02.push(item.feeSubjectId);
                    });
                    this.costTabsContent_02 = this.initOriginCostTabsContent();
                    this.costTabsContent_02.forEach((item)=>{
                        item.metaList.forEach((temp)=>{
                            let pos = this.checkedFeeSubjectIds_02.indexOf(temp.id);
                            if(pos > -1){
                                temp.disabled = true;
                            }
                            else{
                                temp.disabled = false;
                            }
                        })
                    });
                  this.allocationAmount_inputs.push('');
                  this.allocationAmount_ids.push([]);
                    this.allocationSettingForm.monthAllocation.push(obj);
                }
                else{
                    this.checkedFeeSubjectIds_02 = [];
                    this.costTabsContent_02 = this.initOriginCostTabsContent();
                    this.costTabsContent_02.forEach((item)=>{
                        item.metaList.forEach((temp)=>{
                            temp.disabled = false;
                        })
                    })
                  this.allocationAmount_inputs.push('');
                  this.allocationAmount_ids.push([]);
                    this.allocationSettingForm.monthAllocation.push(obj);
                }
            },
            deleteSubject(index,val){
                if(val==1){
                    this.allocationSettingForm.costAllocation.splice(index,1);
                  this.allocationCost_inputs.splice(index,1);
                  this.allocationCost_ids.splice(index,1);
                    this.checkedFeeSubjectIds_01 = [];
                    this.allocationSettingForm.costAllocation.forEach((item)=>{
                        this.checkedFeeSubjectIds_01.push(item.feeSubjectId);
                    });
                    this.costTabsContent_01 = this.initOriginCostTabsContent();
                    this.costTabsContent_01.forEach((item)=>{
                        item.metaList.forEach((temp)=>{
                            let pos = this.checkedFeeSubjectIds_01.indexOf(temp.id);
                            if(pos > -1){
                                temp.disabled = true;
                            }else{
                                temp.disabled = false;
                            }
                        })
                    });
                }
                else if(val==2){
                    this.allocationSettingForm.monthAllocation.splice(index,1);
                  this.allocationAmount_inputs.splice(index,1);
                  this.allocationAmount_ids.splice(index,1);
                    this.checkedFeeSubjectIds_02 = [];
                    this.allocationSettingForm.monthAllocation.forEach((item)=>{
                        this.checkedFeeSubjectIds_02.push(item.feeSubjectId);
                    });
                    this.costTabsContent_02 = this.initOriginCostTabsContent();
                    this.costTabsContent_02.forEach((item)=>{
                        item.metaList.forEach((temp)=>{
                            let pos = this.checkedFeeSubjectIds_02.indexOf(temp.id);
                            if(pos > -1){
                                temp.disabled = true;
                            }else{
                                temp.disabled = false;
                            }
                        })
                    });
                }
            },
            //重置集合
            initOriginCostTabsContent() {
                let temp = [];
                this.originCostTabsContent.forEach((item)=>{
                    let obj =Object.assign({},item);
                    temp.push(obj);
                });
                return temp;
            },
            // 费用类型方法
            costSelect(value, index,item,val) {
              if(val==1){
                this.allocationCost_ids[index] = value;
              }
              else if(val==2){
                this.allocationAmount_ids[index] = value;
              }
              item.id = value;
                if (value[1]) {
                    item.feeSubjectId = value[1];
                } else {
                    item.feeSubjectId = value[0];
                }
                this.originCostTabsContent.forEach((temp)=>{
                    temp.metaList.forEach((metaTemp)=> {
                        if (metaTemp.id == item.feeSubjectId) {
                            item.feeSubjectName = metaTemp.name;
                        }
                    });
                });
            },
            // 获取费用类型
            getCost() {
                const params = 'FEESUBJECT';
                dictionaryListDict(params).then(res => {
                    if (res.code === "200") {
                        this.originCostTabsContent = res.data;
                        this.costTabsContent_01 = res.data;
                        this.costTabsContent_02 = res.data;
                    }
                })
            },
            listTransferAccount(){
              waListAllAccount().then(res =>{
                    if(res.code === '200'){
                        this.transferAccountList = res.data;
                        if(this.transferAccountList){
                            this.transferAccountList.forEach((item)=>{
                                //若是当前账户id则禁用
                                if(item.id == this.walletAccountId){
                                    item.disabled = true;
                                }
                                else{
                                    item.disabled = false;
                                }
                            })
                        }
                    }
                })
            },
        }
    }
</script>

<style lang="less" scoped>
    .collectionAccount-box{
        max-height: calc(100vh - 100px);
        overflow-y: auto;
        .warnningStyle{
            height: 54px;
            color: #FFA036;
            background: #FFF7EE;
            svg{
                width: 24px;
                height: 24px;
                vertical-align: -0.25em;
            }
        }
        .contentStyle{
            padding: 20px;
            .titleStyle{
                font-size: 18px;
                font-weight: 500;
                color: #111111;
            }
            .mustFillStyle{
                color: @wranColor;
            }
            /deep/ .ant-select-selection__rendered{
                margin-left: 0px;
            }
            .basicsInfo{
                width: 100%;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                .headStyle{
                  .itemStyle{
                    width: 88px;
                    text-align: center;
                  }
                  .leftStyle{
                    border-radius: 4px 4px 0px 0px;
                  }
                  .rightStyle{
                    border-radius: 0px 0px 4px 4px;
                  }
                  .selectedStyle{
                    height: 28px;
                    line-height: 28px;
                    background: #0A87F8;
                    border: 1px solid #0A87F8;
                    color: #ffffff;
                  }
                  .unSelectedStyle{
                    height: 26px;
                    line-height: 26px;
                    margin-top: 2px;
                    background: #F6F7F8;
                    border-radius: 4px 4px 0px 0px;
                    border: 1px solid #E8E8E8;
                  }
                }
                .table{
                    width: 758px;
                    border-left: 1px solid #EEEEEE;
                    border-top: 1px solid #EEEEEE;
                    font-size: 12px;
                    border-radius:4px;
                    .table-title{
                        display: flex;
                        background:#F6F7FB;
                        color: #666666;
                        border-radius:4px 4px 0px 0px;
                        & > div {
                            flex: 1;
                            height: 40px;
                            line-height: 40px;
                            border-right: 1px solid #EEEEEE;
                            border-bottom: 1px solid #EEEEEE;
                        }
                        .mustFill{
                            margin-left: 2px;
                            color: #FB4246;
                        }
                    }
                    .house-data {
                        display: flex;
                        /deep/ span.ant-radio + *{
                            padding-right: 8px;
                            padding-left: 2px;
                            color: #333333;
                        }
                        /deep/ .ant-cascader-picker-label{
                            padding: 0px;
                        }
                        & > div {
                            flex: 1;
                            height: 46px;
                            line-height: 46px;
                            text-align: left;
                            border-right: 1px solid #EEEEEE;
                            border-bottom: 1px solid #EEEEEE;
                            background-color: #ffffff;
                            color: #333333;
                            font-size: 14px;
                            .delete-icon {
                                color: red;
                                font-size: 14px;
                            }
                        }
                        .continueAddStyle{
                            font-size: 14px;
                            color: #0A87F8;
                            text-align: center !important;
                            i{
                                vertical-align: 0em;
                                margin-right: 8px;
                            }
                            svg{
                                width: 12px;
                                height: 12px;
                            }
                        }
                        .operateStyle{
                            .width-59{
                                width: 59px;
                            }
                            .width-101{
                                width: 101px;
                            }
                            .width-87{
                                width: 87px;
                            }
                            .checkedStyle{
                                color: #0A87F8;
                                margin-left: 6px;
                            }
                            .itemStyle{
                                border-radius:2px;
                                height:24px;
                                line-height: 24px;
                                margin: 11px 20px 11px 0;
                                padding-left: 5px;
                            }
                            .selected{
                                background: #F5F7FE;
                            }
                            .unSelect{
                                background: #F4F4F4;
                            }
                        }
                        .house-data-item-left{
                            margin-left: 40px;
                            position: relative;
                            .addonBeforeStyle{
                                font-size: 14px;
                                color: rgba(0, 0, 0, 0.65);
                                position: absolute;
                                left: 0;
                            }
                            .addonAfterStyle{
                                font-size: 14px;
                                color: rgba(0, 0, 0, 0.65);
                            }
                        }
                        .addStyle{
                            i{
                                vertical-align: -0.15em;
                            }
                        }
                    }
                    .mustFillStyle{
                        /deep/ svg{
                            width: 12px;
                            height: 12px;
                        }
                        .mustFillFont{
                            color: #777777;
                            font-size: 13px;
                            .editStyle{
                                margin-right: 2px;
                                color: #777777;
                            }
                        }
                    }
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
    }
</style>