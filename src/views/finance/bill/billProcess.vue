<template>
    <div class="billProcess-info" @click="clickOutside">
        <!-- 处理账单 -->
        <div class="child-detail">
            <div class="house-address clearfix">
                <span class="f-fl">房源地址：</span>
                <span class="f-fl" v-if="info.houseAlias">{{info.houseAlias}} /</span> {{info.fullAddress}}
                <span class="unBindStyle f-fr cursor" @click="unLock" v-if="info.isOnlinePaying==1"><icon-font style="margin-right: 5px;" type="iconjiechu"></icon-font>解除绑定</span>
              <span class="unBindWarningStyle f-fr" v-if="info.isOnlinePaying==1"><a-icon style="margin-right: 5px;" type="exclamation-circle" />正在线上支付此账单，已锁定，无法进行线下操作</span>
            </div>
            <div class="bill-top">
                <span class="span-p" style="padding-right: 20px;">已{{alreadyMoney>0?'收':alreadyMoney<0?'付':'收(付)'}}：<span >{{alreadyMoney?Math.abs(alreadyMoney.toFixed(2)):0.00}}</span>元</span>
                <span class="border-p span-p" style="padding-left: 20px;padding-right: 20px;">待{{WaitMoney>0?'收':WaitMoney<0?'付':'收(付)'}}：<span style="color:#FFA036">{{WaitMoney?Math.abs(WaitMoney.toFixed(2)):0.00}}</span>元</span>
                <span class="span-p" style="padding-left: 20px;">预计收(付)日期：{{$moment(info.predictTime).format('YYYY.MM.DD')}}</span>
                <div class="f-fr cursor" @click="openWater" v-if="occurredMoneyFul" style="color:#0A87F8"><icon-font type="iconyumengtubiao_yanjing-1" style="font-size:16px;"/>查看历史收(付)记录</div>
            </div>
            <div class="content-row">
                <div class="together-item">
                    <div class="together-detail">
                        <div class="together-title" >
                            <div style="max-width: 120px">费用科目</div>
                            <div style="max-width: 150px">应收（付）</div>
                            <div style="max-width: 150px">已收（付）</div>
                            <div style="max-width: 150px">待收(付)</div>
                            <div style="max-width: 160px">本次实收(付)</div>
                             <div style="max-width: 230px;">余额处理</div>
                        </div>
                        <div class="together-data u-no-border" v-for="(item,index) in BillExpenses" :key="index">
                            <div style="max-width: 120px" class="itemBg">
                                <span class="together-span">{{item.feeSubjectName}}</span>
                            </div>
                            <div style="max-width: 150px" class="itemBg">
                                <span class="together-span">
                                <span style="color:#0A87F8;font-size:16px;" v-if="item.feeDirection == 1"> + </span>
                                <span style="color:rgba(251,66,70,1);font-size:16px;" v-else-if="item.feeDirection == 2"> - </span> {{item.originalMoney}} 元</span>
                            </div>
                            <div style="max-width: 150px;text-align: left;padding-left: 10px;" class="itemBg">
                                <span style="color:#0A87F8;font-size:16px;" v-if="item.feeDirection == 1&&item.occurredMoney!=0"> + </span>
                                <span style="color:rgba(251,66,70,1);font-size:16px;" v-else-if="item.feeDirection == 2&&item.occurredMoney!=0"> - </span> 
                                <span >{{item.occurredMoney}} 元{{item.exemptMoney&&item.exemptMoney>0?'(免收'+item.exemptMoney/100+'元)':''}}</span>
                            </div>
                            <div style="max-width: 150px;text-align: left;padding-left: 10px;" class="itemBg">
                                <span style="color:#0A87F8;font-size:16px;" v-if="item.feeDirection == 1&&item.notOccurredMoney!=0"> + </span>
                                <span style="color:rgba(251,66,70,1);font-size:16px;" v-else-if="item.feeDirection == 2&&item.notOccurredMoney!=0"> - </span> 
                                <span >{{item.notOccurredMoney}} 元</span>
                            </div>
                            <div style="max-width: 160px" :style="item.notOccurredMoney==0?'background: #F6F7F8 !important;':''">
                                <span style="color:#0A87F8;font-size:16px;" v-if="item.feeDirection == 1&&item.money!=0"> + </span>
                                <span style="color:rgba(251,66,70,1);font-size:16px;" v-else-if="item.feeDirection == 2&&item.money!=0"> - </span> 
                                <a-input style="width:116px;padding: 0 4px;" v-model="item.money" :disabled="item.notOccurredMoney==0" @input.native="inputChange($event,item)" v-validate="'moneyZero|max(' + item.notOccurredMoney + ')'" ></a-input>
                                <span>元</span>
                            </div>
                            <div class="f-clearfix itemBg" style="max-width: 230px">
                                <div class="f-fl" style="text-align: left;padding: 0 0 0 9px;" v-if="item.notOccurredMoney!=0">余
                                    <span  style="color:#0A87F8;font-size:16px;" v-if="item.feeDirection == 1&&item.notOccurredMoney-item.money !=0"> + </span>
                                    <span  style="color:rgba(251,66,70,1);font-size:16px;" v-else-if="item.feeDirection == 2&&item.notOccurredMoney-item.money !=0"> - </span> 
                                    {{(item.notOccurredMoney-item.money).toFixed(2)}}元</div>
                                <div class="u-no-border f-fr" v-if="(item.notOccurredMoney-item.money)>0" style="width: 106px;margin-right: 9px;">
                                    <a-select v-model="item.solution" style="min-width: 100px" @change="solytionChange">
                                        <a-select-option :value="1">继续提醒</a-select-option>
                                        <a-select-option :value="2">免收</a-select-option>
                                    </a-select>
                                </div>
                                <div class="f-fl" style="text-align: left;padding: 0 9px;">
                                    <span v-if="item.notOccurredMoney == 0">暂无余额</span>
                                </div>
                            </div>
                        </div>
                        <div class="together-foot">
                            <p class="f-fl" style="margin-left:12px">本次实{{totalMoney>=0?'收':'付'}}总额：
                                <span style="color:#0A87F8;" v-if="totalMoney>=0">+{{totalMoney.toFixed(2)}}元 </span>
                                <span style="color:#FB4246;" v-else>{{totalMoney.toFixed(2)}}元  </span>
                                <span v-if="remaining!=0">,</span>
                                <span style="color:#FFA036;" v-if="remaining!=0"> 
                                        剩余待{{  remaining>=0 ? '收':'付'}} {{remaining.toFixed(2)}}元</span>
                            </p>

                                <div class="u-no-border f-fr" v-if="remindDateFul">
                                    剩余款项提醒<span style="color:#FB4246;margin-left:6px;margin-right:6px;font-size: 14px;">*</span>
                                     <a-date-picker v-model="contractForm.remindDate" format="YYYY-MM-DD"/>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="cont">
                <label-item leftLine title="账单备注" class="u-bottom-border" :maxSize="500" style="margin-top: 24px;" :valLength="contractForm.comment.length" >
                    <a-textarea style="margin-top: 5px;" v-model="contractForm.comment" maxlength="500" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入" />
                </label-item>
                <label-item leftLine title="收(付)款详情" style="margin-top: 25px;">
                    <a-row :gutter="30" style="margin-top: 4px;">
                        <a-col :span="8" v-if="showSelectPaymentType">
                          <label-item title="付款方式" class="u-bottom-border radioStyle">
                            <a-radio-group v-model="contractForm.paymentType" @change="changePaymentType">
                              <a-radio :value="1" :disabled="info.contractAuditStatus==1">
                                线上钱包付款
                              </a-radio>
                              <a-radio :value="2">
                                线下付款
                              </a-radio>
                            </a-radio-group>
                          </label-item>
                        </a-col>
                        <a-col :span="8" v-if="contractForm.paymentType==1">
                          <label-item title="收款钱包账号" class="u-bottom-border" :mustFill="true">
                            <div class="searchInputStyle" id="searchInputStyle">
                              <a-input
                                  placeholder="输入钱包名称/钱包绑定手机号检索"
                                  v-model="walletName" :allowClear="true"
                                  class="input-with-select"
                                  @click="showBlock=true"
                                  @compositionstart.native="cpLock=false"
                                  @compositionend.native="cpLock=true"
                                  @input.native="listCollectionAccount"
                              />
                              <div class="blocks" v-show="walletName&&showBlock">
                                <ul v-if="collectionAccountList&&collectionAccountList.length>0">
                                  <li class="overHidde"
                                      v-for="(item,index) in collectionAccountList"
                                      :key="index"
                                      @click="chooseWallet(item)"
                                      style="cursor: pointer;"
                                      v-if="item.alias"
                                  >
                                    {{item.alias}}({{item.name?item.name+'-':''}}{{item.phone}})
                                  </li>
                                  <li style="cursor: pointer;" class="overHidde" v-else>
                                    {{item.name?item.name+'-':''}}{{item.phone}}
                                  </li>
                                </ul>
                                <a-empty style="padding: 20px 0" v-if="!collectionAccountList||collectionAccountList.length==0"></a-empty>
                              </div>
                            </div>
                          </label-item>
                        </a-col>
                        <a-col :span="4" v-if="contractForm.paymentType==2">
                          <label-item title="支付途径" class="u-bottom-border" :mustFill="true">
                            <a-select v-model="contractForm.paymentMethod" style="width:100%" placeholder="请选择">
                              <a-select-option v-for="(item,index) in costTabsContent" :key="index" :disabled="item.disabled" :value="item.id">{{item.name}}</a-select-option>
                            </a-select>
                          </label-item>
                        </a-col>
                        <a-col :span="4" v-if="contractForm.paymentType==2">
                            <label-item title="实际收(付)款日期" class="u-bottom-border" :mustFill="true">
                                <a-date-picker placeholder="选择日期" :disabled-date="disabledEndDate" v-model="contractForm.practicalTime" format="YYYY-MM-DD" />
                            </label-item>
                        </a-col>
                        <a-col :span="showSelectPaymentType?8:16">
                            <label-item title="支付备注" class="u-bottom-border">
                                <a-input v-model="contractForm.paymentNote" placeholder="请输入" />
                            </label-item>
                        </a-col>
                    </a-row>
                </label-item>
                <div class="titlepz f-clearfix">
                    支付凭证
                    <span>（附件支持格式：jpg、png、jpeg）</span>
                    <!-- 上传图片 -->
                </div>
                <own-upload :pic-list="payVoucherList" :uploadParms="sendData4_2" :showTips="false" ref="imgBill4_2"></own-upload>
                <div style="width:100%;" class="clearfix">
                    <a-button @click="saveBill" type="warning" class="saveBtn f-fr" style="width:98px;" :loading="isloading">确定</a-button>
                    <a-button @click="cancel" type="warning" class="f-fr cancelBtn" style="width:98px;">取消</a-button>
                </div>
            </div>
        </div>
        <!-- 流水 -->
        <a-modal destroyOnClose centered  :maskClosable="false" :footer="null" width="1000px" v-model="openWaterFul" class="ownModalBorder titDialog" title="历史收(付)记录">
            <open-water @closeThis="openWaterFul=false" :billId="billId" :houseAlias="info.houseAlias" :fullAddress="info.fullAddress"></open-water>
        </a-modal>
        <!-- 确认付款信息 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="confirmPayInfoDialog" class="ownModalBorder titDialog" title="确认账单信息" @cancel="confirmPayInfoDialog=false">
          <confirm-pay-info :billId="billId" :billBizId="billBizId" @saveSuccess="confirmPayInfoSuccess" @closeThis="confirmPayInfoDialog=false"></confirm-pay-info>
        </a-modal>
    </div>
</template>

<script>
import Vue from 'vue'
import { listEnableDict } from '@/api/contract';
import {getBillByBillId, billHandle, onlinePayUnlock} from '@/api/bill';
import {listCollectionAccount} from '@/api/wallet';
import openWater from './openWater';
import ConfirmPayInfo from './confirmPayInfo';
export default {
    name: "billProcess",
    props: {
        billId: {
            type: String
        },
    },
    components: {
        openWater,
        ConfirmPayInfo,
    },
    data() {
        return {
            info: {},
            alreadyMoney: '',
            WaitMoney: '',
            contractForm: {
                billId: '',
                comment: '',
                detailList: [],
                paymentType:2,
                paymentMethod: '',
                recvWalletAccountId:'',
                practicalTime: null,
                remindDate: null,
                payVoucherIdList: [],
                billDetailList:[]
            },
            costTabsContent: [],
            sendData4_2: {},
            imgList4_2: [],
            isloading:false,
            BillExpenses:[],
            openWaterFul:false,
            occurredMoneyFul:false,
            totalNum:0,
            remindDateFul:false,
            collectionAccountList:[],
            walletName:'',
            cpLock:true,
            showBlock: false,
            payVoucherList:[],
            showSelectPaymentType:false,
            selectedPaymentType:false,
            confirmPayInfoDialog:false,
            billBizId:'',
            source_listAccount:null,
        }
    },
    mounted() {
        this.sendData4_2 = {
            // 上传时附带的额外参数
            bizId: '', //
            bizType: 4, // 图片大类标识  收支
            subBizType: 2, // 图片子类标识 支付凭证
            indexNum: 1 // 排序值
        }
    },
    created() {
        this.getBill();
        this.getCost();
        let date = new Date();
        this.contractForm.practicalTime = this.$moment(date.getTime());
    },
    computed: {
        totalMoney() {
            let total = 0;
            for (let item of this.BillExpenses) {
                if (item.feeDirection === 1) {
                total += item.money * 1;
                } else {
                total -= item.money * 1;
                }
            }
            if(total>=0){
              this.showSelectPaymentType = false;
            }
            else {
              if(this.info.storeWalletAccountId){
                this.showSelectPaymentType = true;
              }
              else{
                this.showSelectPaymentType = false;
              }
            }
            return total;
        },
        remaining() {
            let num = 0;
            for (let e of this.BillExpenses) {
                if (e.solution != '2') {
                    // 非免收的都要计算
                    if (e.feeDirection === 1) {
                    num += (e.notOccurredMoney - e.money) *1;
                    } else {
                    num -= (e.notOccurredMoney - e.money)*1;
                    }
                }
            }
            this.totalNum = num;
            return num;
        },
    },
    methods: {
      cancelQuest(){
        if (typeof this.source_listAccount === 'function') {
          this.source_listAccount('终止请求');//取消请求
        }
      },
      confirmPayInfoSuccess(){
          this.confirmPayInfoDialog = false;
          this.$emit('saveSure',true);
      },
      clickOutside(event){
        const current = document.getElementById("searchInputStyle");
        if(current){
          if(!current.contains(event.target)){
            this.showBlock = false;
          }
        }
      },
      chooseWallet(item){
        let name = item.name? item.name + '-':'';
        if(item.alias){
          this.walletName = item.alias + '(' + name + item.phone + ')';
        }
        else {
          this.walletName = name + item.phone;
        }

        this.contractForm.recvWalletAccountId = item.id;
        this.showBlock = false;
      },
      listCollectionAccount(){
        this.cancelQuest();
        let parameter = {
          current:1,
          size:20,
        };
        if(this.walletName){
          parameter.fuzzyKeyword = this.walletName;
        }
        listCollectionAccount(parameter, this).then(res => {
          if (res.code == 200) {
            this.collectionAccountList = res.data.records;
          }
        }) .catch(err => {
          console.log(err);
        });
      },
      changePaymentType(){
        this.selectedPaymentType = true;
      },
      unLock(){
        let _this = this;
        let id = this.billId;
        this.$modal.confirm({
          title: '确定要解除 「' + this.info.payerName + '/' + this.info.payerPhone + '」 的账单锁定吗？',
          content: '解除锁定后，租客支付将受影响；请确认租客已退出该笔账单的线上支付',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            onlinePayUnlock({id:id}).then(res => {
              if (res.code == 200) {
                _this.$message.success('操作成功！');
                setTimeout(() => {
                  _this.getBill();
                }, 500)
                _this.$emit('refreshinfoFun', true);
              }
            })
          },
          onCancel() {
          },
        });
      },
      disabledEndDate(endValue){
        let tomorrowDay = Vue.prototype.$moment().startOf('day').add(1,'day').valueOf();
        if(endValue>tomorrowDay){
            return true;
        }
        return false;
      },
        getCost() {
            listEnableDict('7bf14df972f64b94b7da8d3ff88ead18').then(res => {
                this.costTabsContent = res.data;
                this.costTabsContent.forEach((data) => {
                    if(data.name === '平台钱包'){
                      data.disabled = true;
                    }
                    if (data.name === '现金') {
                        this.contractForm.paymentMethod = data.id;
                    }
                });
            });

        },
        getBill() {
            getBillByBillId(this.billId).then(res => {
                if (res.code === '200') {
                    this.info = res.data;
                    let occurredMoney = 0;
                    let notOccurredMoney = 0;
                    this.BillExpenses = this.info.detailList
                    this.BillExpenses.forEach(function(e) {
                        if(e.occurredMoney>0){
                            this.occurredMoneyFul = true
                        }
                        e.occurredMoney = e.occurredMoney / 100;
                        e.notOccurredMoney = e.notOccurredMoney / 100;
                        e.originalMoney = e.originalMoney / 100
                        this.$set(e, 'money', e.notOccurredMoney);
                        this.$set(e, 'solution', 0);
                        if (e.occurredMoney) {
                            if (e.feeDirection === 1) {
                               occurredMoney += e.occurredMoney * 1;
                            } else {
                               occurredMoney -= e.occurredMoney * 1;
                            }
                        }
                        this.alreadyMoney = occurredMoney;
                        if (e.notOccurredMoney) {
                           if (e.feeDirection === 1) {
                               notOccurredMoney += e.notOccurredMoney * 1;
                            } else {
                               notOccurredMoney -= e.notOccurredMoney * 1;
                            } 
                        }
                        this.WaitMoney = notOccurredMoney;
                    }, this);
                    this.$set(this.contractForm,'comment',this.info.comment);
                    this.$set(this.contractForm,'paymentNote',this.info.paymentNote);
                    this.contractForm.recvWalletAccountId = this.info.recvWalletAccountId;
                    let name = this.info.recvWalletName? this.info.recvWalletName + '-':'';
                    if(this.info.recvWalletAlias){
                      this.walletName = this.info.recvWalletAlias + '(' + name + this.info.recvWalletPhone + ')';
                    }
                    else{
                      this.walletName = name + this.info.recvWalletPhone;
                    }
                    if(this.info.payVoucherList){
                      this.payVoucherList = this.info.payVoucherList;
                      this.payVoucherList.forEach((item)=>{
                        item.notRealDelete = true;
                      });
                    }
                }
            })
        },
        cancel() {
           this.$emit('closeThis', true);
        },
        checkDate() {
            if (this.contractForm.paymentType==1&&!this.contractForm.recvWalletAccountId) {
              this.$message.error('请选择收款钱包账号!');
              return false;
            }
            if (this.contractForm.paymentType==2&&!this.contractForm.practicalTime) {
                this.$message.error('请选择实际收(付)款日期!');
                return false;
            }
            if (this.totalNum!=0 && !this.contractForm.remindDate) {
                this.$message.error('请选择提醒日期!');
                return false;
            }
            return true;
        },
        saveBill() {
            if (this.$refs.imgBill4_2.picsList.length != 0) {
                let imgObj4_2 = this.$refs.imgBill4_2.picsList;
                let arrImg = [];
                if (imgObj4_2.length > 0) {
                    imgObj4_2.forEach(function(e) {
                        arrImg.push(e.id)
                    }, this);
                }
                this.imgList4_2 = arrImg;
            }
            if (this.checkDate()) {
                let arrItem = [];
                for (let i = 0, len = this.BillExpenses.length; i < len; i++) {
                    if (this.BillExpenses[i].notOccurredMoney != 0) {
                        let obj = {
                            billDetailId: this.BillExpenses[i].id,
                            money: Math.round(this.BillExpenses[i].money * 100),
                            solution: this.BillExpenses[i].solution
                        };

                        arrItem.push(obj);
                    }
                }
                let fileIds = [];
                this.imgList4_2.forEach(function(e) {
                    fileIds.push(e);
                }, this);
                if (fileIds.length == 0) {
                    fileIds = '';
                }
                let params = {
                    billId: this.billId,
                    comment: this.contractForm.comment,
                    billDetailList: arrItem,
                    recvWalletAccountId: this.contractForm.recvWalletAccountId,
                    paymentType: this.contractForm.paymentType,
                    paymentMethod: this.contractForm.paymentMethod,
                    paymentNote: this.contractForm.paymentNote,
                    practicalTime: this.$moment(this.contractForm.practicalTime).format('YYYY-MM-DD'),
                    payVoucherIdList: fileIds,
                };
                if(this.contractForm.remindDate){
                    params.remindDate = this.$moment(this.contractForm.remindDate).format('YYYY-MM-DD');
                }
                this.isloading = true;
                billHandle(params).then(res => {
                        if(!res){
                          this.isloading = false;
                        }
                        if (res.code === '200') {
                            if(res.data.isInitiatePay==1){
                                this.billBizId = res.data.billBizId;
                                this.confirmPayInfoDialog = true;
                            }
                            else{
                              this.$message.success('操作成功');
                              this.$emit('saveSure',true);
                           }

                        }
                        this.isloading = false;
                    })
                .catch(err => {
                    this.isloading = false;
                    console.log(err);
                });
            }
        },
        openWater(){
          this.openWaterFul = true;
        },
        inputChange(e,val){
            if(val.notOccurredMoney-val.money == 0){
                val.solution = 0;
            }else{
               val.solution = 1;
            }
            this.solytionChange()
        },
        solytionChange(){
            this.remindDateFul  = false;
            this.BillExpenses.forEach((da, j) => {
                if (da.solution == 1) {
                    this.remindDateFul = true;
                    return
                }
            });
      
            if(this.remindDateFul){
            this.contractForm.remindDate = this.$moment(this.info.predictTime);
            }
        },
        setBlur(index) {
          if (
              Number(this.list[index].inputone) >
              this.list[index].notOccurredMoney / 100 ||
              Number(this.list[index].inputone) < 0
          ) {
              Message({
              message: `输入的金额不能小于0，也不能大于${this.list[index]
                  .notOccurredMoney / 100}`,
              type: 'error',
              duration: 1 * 1000
              });
              delete this.list[index].inputone;
              this.$set(this.list[index], 'inputone', 0);
              delete this.list[index].surplus;
              this.$set(
              this.list[index],
              'surplus',
              this.list[index].notOccurredMoney / 100
              );
          } else {
              delete this.list[index].surplus;
              this.$set(
              this.list[index],
              'surplus',
              (this.list[index].notOccurredMoney * 1 -
                  (this.list[index].inputone * 1).toFixed(2) * 10000 / 100) /
                  100
              );
              this.list[index].inputShow = 1;
          }
          if (this.list[index].surplus == 0) {
              this.list[index].solution = '';
          }
        },
    },

}
</script>

<style scoped lang="less">
.billProcess-info {

    .cont {
        margin: 0 20px;
        & /deep/ .label-item .title{
            font-size: 14px;
            color: #111;
            font-weight: 500;
        }
        .ant-col-4 ,.ant-col-16 {
            & /deep/ .label-item .title{
                font-size: 12px;
                color: @secondaryFontColor;
            }
        }
        .radioStyle{
          /deep/ .ant-radio-group {
            padding: 7px 0 5px 0;
          }
          border-bottom: 1px solid #dddddd;
        }
        .searchInputStyle{
          position: absolute;
          z-index: 99;
          width: 100%;
          .input-with-select{
            width: calc(100%);
            height: 34px;
          }
          .blocks {
            width: 100%;
            border-radius: 3px;
            border: 1px solid rgba(226, 226, 226, 1);
            position: absolute;
            left: 0px;
            top: 36px;
            z-index: 100;
            background-color: #fff;
          }
          .blocks ul {
            max-height: 170px;
            overflow-y: auto;
          }
          .blocks li {
            height: 34px;
            line-height: 34px;
            padding-left: 10px;
            padding-right: 10px;
            overflow: hidden;
            position: relative;
          }
          .blocks li:hover {
            background-color: #E6F3FE;
          }
          .blocks .el-icon-search {
            position: absolute;
            left: 6px;
            top: 10px;
            font-size: 14px;
            font-weight: 900;
          }
        }
    }
    .house-address {
        width: 100%;
        height: 40px;
        background: rgba(233, 241, 255, 1);
        opacity: 0.99;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(119, 119, 119, 1);
        line-height: 40px;
        padding: 0 20px;
      .unBindStyle{
        color: #0A87F8;
        margin-left: 15px;
      }
      .unBindWarningStyle{
        color: #FFA036
      }
    }
    .bill-top {
        height: 20px;
        width: 100%;
        margin-top: 20px;
        margin-bottom: 11px;
        padding: 0 20px;
        >.span-p {
            float: left;
            height: 20px;
            // width: 130px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(17, 17, 17, 1);

        }
        .border-p {
            border-left: 1px solid #DDDDDD;
            border-right: 1px solid #DDDDDD;
        }
    }
    .child-detail {
        height: calc(100vh - 150px);
        overflow: auto;
    }
    .bottom {
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
        border-top: 1px solid #DDDDDD;
        color: @secondaryFontColor;
        span:first-child {
            display: inline-block;
            margin-right: 20px;
            padding-right: 20px;
            height: 20px;
            line-height: 20px;
            border-right: 1px dashed #DDDDDD;
        }
    }


    .content-row {
        margin: 0 20px;
        .together-item {
            margin-bottom: 20px;
            .delete-icon {
                color: red;
                font-size: 14px;
            }
            .together-detail {
                border-left: 1px solid @borderColor;
                border-top: 1px solid @borderColor;
                text-align: center;
                font-size: 12px;
                .together-title {
                    display: flex;
                    background: rgba(247, 248, 251, 1);
                    text-align: left;
                    &>div {
                        padding: 0px 9px;
                        flex: 1;
                        height: 40px;
                        line-height: 40px;
                        border-right: 1px solid @borderColor;
                        border-bottom: 1px solid @borderColor;
                    }
                    .must-fill {
                        color: #FB4246;
                    }
                }
                .together-data {
                    position: relative;
                    display: flex;
                    &>div {
                        flex: 1;
                        height: 100%;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        border-right: 1px solid @borderColor;
                        border-bottom: 1px solid @borderColor;
                        background-color: #ffffff;
                        .popover:hover {
                            height: 39px;
                            line-height: 38px;
                            border: 1px solid @themeColor;
                            cursor: pointer;
                        }
                    }
                    .payPattern {
                        padding: 0 9px;
                    }
                    input {
                        // text-align: center;
                        padding: 0 9px; // height: 24px;
                        height: calc(100% - 2px); // text-align: left;
                    }
                    input:focus {
                        border: 1px solid @themeColor!important;
                    }
                    .select-border {
                        border: 1px solid @themeColor;
                    }
                    .options {
                        i,
                        span {
                            display: inline-block;
                            width: 50%;
                            height: 39px;
                            cursor: pointer;
                        }
                        i {
                            line-height: 39px;
                            font-size: 14px;
                        }
                        span {
                            padding: 3px 4px;
                            line-height: 18px;
                            background-color: #DCEFFF;
                            color: @themeColor;
                        }
                    }
                    .togeAddress {
                        padding: 0 9px;
                        display: flex; // width: calc(50% - 15px);
                        width: 100%;
                        height: 100%;
                        & /deep/ .ant-select-selection__rendered {
                            // margin-left: 16px;
                            margin-top: 6px;
                        }
                    }
                    .together-span {
                        float: left;
                        margin-left: 10px;
                    }
                }
                .together-foot {
                    height: 40px;
                    line-height: 40px;
                    border-right: 1px solid @borderColor;
                    border-bottom: 1px solid @borderColor;
                    .togetherAdd {
                        width: 100px;
                        margin: 0 auto;
                        text-align: center;
                    }
                }
            }
        }
    }
    .titlepz {
        margin-top: 20px;
        margin-bottom: 10px;
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 17px;
        span {
            // width:195px;
            height: 17px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 160, 54, 1);
            line-height: 17px;
        }
    }
    .itemBg{
        background: #F6F7F8!important;
    }
    .saveBtn {
  width: 120px;
  height: 40px;
  background: rgba(10, 135, 248, 1);
  border-radius: 5px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.cancelBtn {
  width: 120px;
  height: 40px;
  background: rgba(246, 247, 248, 1);
  border-radius: 5px;
  border: 1px solid rgba(221, 221, 221, 1);
  margin-right: 20px;
  margin-bottom: 20px;
}
    /deep/ .label-item .ant-select-selection__rendered{
        margin-left: 0px;
    }
}
</style>
