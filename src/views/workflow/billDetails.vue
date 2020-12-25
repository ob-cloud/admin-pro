<template>
    <div class="billDetails-box clearfix">
        <div class="child-detail f-fl">
            <div class="house-address">
                <span>房源地址：</span>
                <span v-if="copyBill.houseAlias">{{copyBill.houseAlias}} /</span> {{copyBill.cityName}}{{copyBill.areaName}}{{copyBill.fullAddress}}
                <span class="contractAuditStatus1 f-fr" v-if="copyBill.contractAuditStatus&&copyBill.contractAuditStatus==1"><icon-font style="margin-right: 5px;" type="iconyumengtubiao_daishenpirenyuan"></icon-font>关联合同审批中</span>
                <span class="contractAuditStatus5 f-fr" v-if="copyBill.contractAuditStatus&&copyBill.contractAuditStatus==5"><icon-font style="margin-right: 5px;" type="iconshenhebohui1x"></icon-font>审核驳回</span>
                <span class="contractAuditStatus6 f-fr" v-if="copyBill.contractAuditStatus&&copyBill.contractAuditStatus==6"><icon-font style="margin-right: 5px;" type="iconliebiao-yichexiao1x"></icon-font>已撤销</span>
            </div>
            <div class="onLinePayStyle" v-if="copyBill.isOnlinePaying==1">
              <span class="f-fl"><a-icon style="margin-right: 5px;color: #333333" type="exclamation-circle" />正在线上支付此账单，已锁定，无法进行线下操作</span>
              <span class="unBindStyle f-fr cursor" @click="unLock"><icon-font style="margin-right: 5px;" type="iconjiechu"></icon-font>解除绑定</span>
            </div>
            <div class="auditStatus" v-if="auditStatus==9">
              <img src="../../assets/workflow/pass.png" style="width: 80px;height: 80px;">
            </div>
            <div class="auditStatus" v-if="auditStatus==5">
              <img src="../../assets/workflow/reject.png" style="width: 80px;height: 80px;">
            </div>
            <div class="auditStatus" v-if="auditStatus==6">
              <img src="../../assets/workflow/back.png" style="width: 80px;height: 80px;">
            </div>
            <div class="top f-clearfix">
                <div class="f-fl detail">
                    <div class="item" style="width:198px">
                        <span style="margin-top: 7px;" class="radius-font  radius-font-person">
                            <icon-font type="iconyumengtubiao_jiaosequanxian" />
                        </span>
                        <label-item v-if="copyBill.totalMoney>=0" title="付款人信息" :skeletonLoading="skeletonLoading">
                          <div v-if="copyBill.bizType==2&&!permission.renterViewPhoneFlag">{{copyBill.payerName}} - {{copyBill.payerPhone|formatPhone}}</div>
                          <div v-else-if="copyBill.bizType==3&&!permission.ownerViewPhoneFlag">{{copyBill.payerName}} - {{copyBill.payerPhone|formatPhone}}</div>
                          <div v-else>{{copyBill.payerName}} - {{copyBill.payerPhone}}</div>
                        </label-item>
                        <label-item v-else title="收款人信息" :skeletonLoading="skeletonLoading">
                            <div v-if="copyBill.bizType==2&&!permission.renterViewPhoneFlag">{{copyBill.payerName}} - {{copyBill.payerPhone|formatPhone}}</div>
                          <div v-else-if="copyBill.bizType==3&&!permission.ownerViewPhoneFlag">{{copyBill.payerName}} - {{copyBill.payerPhone|formatPhone}}</div>
                          <div v-else>{{copyBill.payerName}} - {{copyBill.payerPhone}}</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:150px">
                        <span style="margin-top: 7px;" class="radius-font radius-font-red" v-if="copyBill.notOccurredMoney<0">
                            <icon-font type="icon-yumengtubiao_zujin" />
                        </span>
                        <span style="margin-top: 7px;" class="radius-font radius-font-person" v-else>
                            <icon-font type="icon-yumengtubiao_zujin" />
                        </span>
                        <div v-if="copyBill.billStatus == 1||copyBill.billStatus == 9">
                            <label-item v-if="copyBill.notOccurredMoney<0" title="待付金额" :skeletonLoading="skeletonLoading">
                                <div>
                                    <span v-if="copyBill.billStatus == 1||copyBill.billStatus == 9">{{Math.abs(copyBill.notOccurredMoney)/100}}元</span>
                                    <span v-else-if="copyBill.billStatus == 2">{{Math.abs(copyBill.occurredMoney)/100}}元</span>
                                </div>
                            </label-item>
                            <label-item v-else title="待收金额" :skeletonLoading="skeletonLoading">
                                <div>
                                    <span v-if="copyBill.billStatus == 1||copyBill.billStatus == 9">{{Math.abs(copyBill.notOccurredMoney)/100}}元</span>
                                    <span v-else-if="copyBill.billStatus == 2">{{Math.abs(copyBill.occurredMoney)/100}}元</span>
                                </div>
                            </label-item>
                        </div>
                        <div v-else-if="copyBill.billStatus == 2">
                            <label-item v-if="copyBill.notOccurredMoney<0" title="实付金额" :skeletonLoading="skeletonLoading">
                                <div>
                                    <span v-if="copyBill.billStatus == 1||copyBill.billStatus == 9">{{Math.abs(copyBill.notOccurredMoney)/100}}元</span>
                                    <span v-else-if="copyBill.billStatus == 2">{{Math.abs(copyBill.occurredMoney)/100}}元</span>
                                </div>
                            </label-item>
                            <label-item v-else title="实收金额" :skeletonLoading="skeletonLoading">
                                <div>
                                    <span v-if="copyBill.billStatus == 1||copyBill.billStatus == 9">{{Math.abs(copyBill.notOccurredMoney)/100}}元</span>
                                    <span v-else-if="copyBill.billStatus == 2">{{Math.abs(copyBill.occurredMoney)/100}}元</span>
                                </div>
                            </label-item>
                        </div>
                    </div>
                    <div class="item" style="width:182px">
                        <span style="margin-top: 7px;" class="radius-font radius-font-yellow">
                            <icon-font type="icon-yumengtubiao_fukuanfangshi" />
                        </span>
                        <label-item title="账单摘要" :skeletonLoading="skeletonLoading">
                            <div class="overHidde" style="max-width: 140px;">
                                {{copyBill.billName}}
                            </div>
                        </label-item>
                    </div>
                    <div class="item" style="width:180px">
                        <span style="margin-top: 7px;" class="radius-font  radius-font-greed">
                            <icon-font type="icon-yumengtubiao_riqi" />
                        </span>
                        <div v-if="copyBill.billStatus == 1||copyBill.billStatus == 9">
                            <label-item v-if="copyBill.notOccurredMoney<0" title="预计待付日期" :skeletonLoading="skeletonLoading">
                                <div>
                                    <span v-if="copyBill.billStatus == 1||copyBill.billStatus == 9">
                                       {{$moment(copyBill.predictTime).format('YYYY.MM.DD')}}
                                    </span>
                                    <span v-else-if="copyBill.billStatus == 2">{{$moment(copyBill.finishTime).format('YYYY.MM.DD')}}</span>
                                </div>
                            </label-item>
                            <label-item v-else title="预计待收日期" :skeletonLoading="skeletonLoading">
                                <div>
                                    <span v-if="copyBill.billStatus == 1||copyBill.billStatus == 9">
                                       {{$moment(copyBill.predictTime).format('YYYY.MM.DD')}}
                                    </span>
                                    <span v-else-if="copyBill.billStatus == 2">{{$moment(copyBill.finishTime).format('YYYY.MM.DD')}}</span>
                                </div>
                            </label-item>
                        </div>
                        <div v-else-if="copyBill.billStatus == 2">
                            <label-item  title="完成时间" :skeletonLoading="skeletonLoading">
                                <div>
                                    <span v-if="copyBill.billStatus == 1||copyBill.billStatus == 9">
                                       {{$moment(copyBill.predictTime).format('YYYY.MM.DD')}}
                                    </span>
                                    <span v-else-if="copyBill.billStatus == 2">{{$moment(copyBill.practicalTime).format('YYYY.MM.DD')}}</span>
                                </div>
                            </label-item>
                        </div>
                    </div>
                   
                </div>
            </div>
            <div class="tabs-content">
                <a-tabs size="small" defaultActiveKey="1" v-model="activekey">
                    <a-tab-pane key="1">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_caiwuzhangdan" /> 账单信息
                        </span>
                        <div class="basic-info">
                            <div class="input-info">
                                <label-item class="item" title="账单所属" :skeletonLoading="skeletonLoading">
                                    <span>{{ copyBill.bizTypeName?copyBill.bizTypeName:'-' }}</span>

                                </label-item>
                                <label-item class="item" title="账单摘要" :skeletonLoading="skeletonLoading">
                                    <span>{{copyBill.billName}}</span>

                                </label-item>
                                <label-item class="item" title="金额" :skeletonLoading="skeletonLoading">
                                    应<span v-if="copyBill.totalMoney<0">付</span>
                                    <span v-else-if="copyBill.totalMoney==0">收</span>
                                    <span v-else-if="copyBill.totalMoney>0">收</span>{{Math.abs(copyBill.totalMoney)/100}}元 /
                                    已<span v-if="copyBill.occurredMoney<0">付</span><span v-if="copyBill.occurredMoney==0">收</span><span v-else-if="copyBill.occurredMoney>0">收</span>
                                    {{Math.abs(copyBill.occurredMoney)/100}}元
                                </label-item>
                                <label-item class="item" title="周期" :skeletonLoading="skeletonLoading" style="margin-right: 0">
                                    <span>{{copyBill.endTime?$moment(copyBill.beginTime).format('YYYY.MM.DD')+' - '+$moment(copyBill.endTime).format('YYYY.MM.DD'):'-'}}</span>

                                </label-item>
                                <label-item class="item"  v-if="copyBill.totalMoney>=0" title="付款人姓名" :skeletonLoading="skeletonLoading">
                                    <span>{{copyBill.payerName}}</span>
                                </label-item>
                                <label-item class="item"  v-else title="收款人姓名" :skeletonLoading="skeletonLoading">
                                    <span>{{copyBill.payerName}}</span>
                                </label-item>
                                <label-item class="item"  v-if="copyBill.totalMoney>=0" title="付款人电话" :skeletonLoading="skeletonLoading">
                                    <span v-if="copyBill.bizType==2&&!permission.renterViewPhoneFlag">{{copyBill.payerPhone|formatPhone}}</span>
                                  <span v-else-if="copyBill.bizType==3&&!permission.ownerViewPhoneFlag">{{copyBill.payerPhone|formatPhone}} </span>
                                  <span v-else>{{copyBill.payerPhone}}</span>
                                </label-item>
                                <label-item class="item"  v-else title="收款人电话" :skeletonLoading="skeletonLoading">
                                  <span v-if="copyBill.bizType==2&&!permission.renterViewPhoneFlag">{{copyBill.payerPhone|formatPhone}}</span>
                                  <span v-else-if="copyBill.bizType==3&&!permission.ownerViewPhoneFlag">{{copyBill.payerPhone|formatPhone}} </span>
                                  <span v-else>{{copyBill.payerPhone}}</span>
                                </label-item>
                                <label-item class="item"  v-if="copyBill.totalMoney>=0" title="付款人账号类型" :skeletonLoading="skeletonLoading">
                                    <span v-if="copyBill.paymentAccountType == 1">银联-{{copyBill.bankName ? copyBill.bankName :'-'}}</span>
                                    <span v-else-if="copyBill.paymentAccountType == 2">支付宝</span>
                                    <span v-else>微信</span>
                                </label-item>
                                <label-item class="item"  v-else title="收款人账号类型" :skeletonLoading="skeletonLoading">
                                    <span v-if="copyBill.paymentAccountType == 1">银联-{{copyBill.bankName ? copyBill.bankName :'-'}}</span>
                                    <span v-else-if="copyBill.paymentAccountType == 2">支付宝</span>
                                    <span v-else>微信</span>
                                </label-item>
                                <label-item class="item"  v-if="copyBill.totalMoney>=0" title="付款人账号" :skeletonLoading="skeletonLoading" style="margin-right: 0">
                                    <span v-if="copyBill.paymentAccountType == 1">{{copyBill.bankName ? copyBill.bankName :'-'}}-{{copyBill.paymentAccount?copyBill.paymentAccount:'-'}}</span>
                                    <span v-else-if="copyBill.paymentAccountType == 2">{{copyBill.paymentAccount?copyBill.paymentAccount:'-'}}</span>
                                    <span v-else>{{copyBill.paymentAccount?copyBill.paymentAccount:'-'}}</span>
                                </label-item>
                                <label-item class="item"  v-else title="收款人账号" :skeletonLoading="skeletonLoading" style="margin-right: 0">
                                    <span v-if="copyBill.paymentAccountType == 1">{{copyBill.paymentAccount?copyBill.paymentAccount:'-'}}</span>
                                    <span v-else-if="copyBill.paymentAccountType == 2">{{copyBill.paymentAccount?copyBill.paymentAccount:'-'}}</span>
                                    <span v-else>{{copyBill.paymentAccount?copyBill.paymentAccount:'-'}}</span>
                                </label-item>
                                <label-item class="item"  v-if="copyBill.totalMoney<0" title="预计付款日期" :skeletonLoading="skeletonLoading">
                                     <span>{{copyBill.predictTime?$moment(copyBill.predictTime).format('YYYY.MM.DD'):'-'}}</span>
                                </label-item>
                                <label-item class="item"  v-else title="预计收款日期" :skeletonLoading="skeletonLoading">
                                     <span>{{copyBill.predictTime?$moment(copyBill.predictTime).format('YYYY.MM.DD'):'-'}}</span>
                                </label-item>
                                <label-item class="item"   title="实际完成时间" :skeletonLoading="skeletonLoading">
                                  <span>{{copyBill.practicalTime? $moment(copyBill.practicalTime).format('YYYY.MM.DD'):'-'}}</span>
                                </label-item>
                                <label-item class="item"   title="操作完成时间" :skeletonLoading="skeletonLoading">
                                    <span>{{copyBill.finishTime? $moment(copyBill.finishTime).format('YYYY.MM.DD'):'-'}}</span>
                                </label-item>
                                <label-item class="item" style="width: 100%;margin: 0 0 20px 0;" title="账单备注" :skeletonLoading="skeletonLoading">
                                    <span>{{copyBill.comment?copyBill.comment:'-'}}</span>

                                </label-item>
                                <label-item class="item" style="width: 100%;" :style="copyBill.billAnnexList&&copyBill.billAnnexList.length>0?'margin-bottom:10px':'margin-bottom:20px'" title="账单附件" :skeletonLoading="skeletonLoading">
                                    <div class="showImg f-clearfix">
                                        <span v-if="!copyBill.billAnnexList||copyBill.billAnnexList.length == 0">-</span>
                                        <div class="f-fl cursor" v-for="(item,i) in copyBill.billAnnexList" :key="i">
                                            <div><img :src="item.small" alt="" @click="handlePreview(item)"></div>
                                        </div>
                                    </div>
                                </label-item>
                                <label-item class="item" style="width: 100%;margin: 0 0 0 0;" title="" v-if="copyBill.billStatus==9">
                                    作废信息
                                </label-item>
                                <label-item class="item"   title="操作人" v-if="copyBill.billStatus==9" :skeletonLoading="skeletonLoading">
                                    <span>{{copyBill.updater}}</span>
                                </label-item>
                                <label-item class="item"   title="操作时间" v-if="copyBill.billStatus==9" :skeletonLoading="skeletonLoading">
                                    <span>{{copyBill.updateTime? $moment(copyBill.updateTime).format('YYYY.MM.DD'):'-'}}</span>
                                </label-item>
                            </div>

                            <div class="content-row">
                                <div class="together-item">
                                    <div class="f-clearfix">
                                        <div class="title-name f-fl"> 账单明细 </div>
                                    </div>
                                  <div class="together-detail">
                                    <div class="together-title">
                                      <div :style="showAduitFlag?'max-width: 160px':'max-width: 190px'">收支类型</div>
                                      <div :style="showAduitFlag?'max-width: 160px':'max-width: 200px'">费用科目</div>
                                      <div :style="showAduitFlag?'max-width: 160px':'max-width: 190px'">应收(付)</div>
                                      <div :style="showAduitFlag?'max-width: 160px':'max-width: 190px'">已收(付)</div>
                                      <div :style="showAduitFlag?'max-width: 160px':'max-width: 190px'">待收(付)</div>
                                      <div style="max-width: 160px;color: #FFA036;" v-if="showAduitFlag">本次申请付款金额</div>
                                    </div>
                                    <div class="together-data u-no-border" v-for="(item,index) in copyBill.feeInfoList" :key="index">
                                      <div :style="showAduitFlag?'max-width: 160px':'max-width: 190px'">
                                        <span class="together-span" style="color:#0A87F8;" v-if="item.isOccur == 1 && item.feeDirection == 1">已收</span>
                                        <span class="together-span" style="color:#FB4246;" v-else-if="item.isOccur == 1 && item.feeDirection == 2">已付</span>
                                        <span class="together-span" style="color:#0A87F8;" v-else-if="item.isOccur == 0 && item.feeDirection == 1">待收</span>
                                        <span class="together-span" style="color:#FB4246;" v-else-if="item.isOccur == 0 && item.feeDirection == 2">待付</span>
                                      </div>
                                      <div :style="showAduitFlag?'max-width: 160px':'max-width: 200px'">
                                        <span class="together-span">{{item.feeSubjectName}}</span>
                                      </div>
                                      <div :style="showAduitFlag?'max-width: 160px':'max-width: 190px'">
                                                <span class="together-span">
                                                <span style="color:#0A87F8;font-size:16px;" v-if="item.feeDirection == 1&&item.originalMoney!=0"> + </span>
                                                <span style="color:rgba(251,66,70,1);font-size:16px;" v-else-if="item.feeDirection == 2&&item.originalMoney!=0"> - </span>
                                                    {{item.originalMoney/100}}元</span>
                                      </div>
                                      <div :style="showAduitFlag?'max-width: 160px':'max-width: 190px'">
                                                <span class="together-span">
                                                <span style="color:#0A87F8;font-size:16px;" v-if="item.feeDirection == 1&&item.occurredMoney!=0"> + </span>
                                                <span style="color:rgba(251,66,70,1);font-size:16px;" v-else-if="item.feeDirection == 2&&item.occurredMoney!=0"> - </span>
                                                    {{item.occurredMoney/100}}元
                                                    <span style="color: rgb(153, 153, 153); font-size: 12px;" v-if="item.exemptMoney>0">{{item.exemptMoney&&item.exemptMoney>0?item.feeDirection == 1?'(免收'+item.exemptMoney/100+'元)':'(免支'+item.exemptMoney/100+'元)':''}}</span>
                                                </span>
                                      </div>
                                      <div :style="showAduitFlag?'max-width: 160px':'max-width: 190px'">
                                                <span class="together-span">
                                                <span style="color:#0A87F8;font-size:16px;" v-if="item.feeDirection == 1&&item.notOccurredMoney!=0"> + </span>
                                                <span style="color:rgba(251,66,70,1);font-size:16px;" v-else-if="item.feeDirection == 2&&item.notOccurredMoney!=0"> - </span>
                                                    {{item.notOccurredMoney/100}}元</span>
                                      </div>
                                      <div v-if="showAduitFlag" style="background: #FFFBF7;">
                                              <span class="together-span">
                                                <span style="color:rgba(251,66,70,1);font-size:16px;" v-if="item.auditMoney!=0&&item.feeDirection==2"> - </span>
                                                <span style="color:rgb(10, 135, 248);font-size:16px;" v-if="item.auditMoney!=0&&item.feeDirection==1"> + </span>
                                                {{ (Math.abs(item.auditMoney)/100).toFixed(2)}}元
                                              </span>
                                      </div>
                                    </div>
                                    <div class="together-data u-no-border">
                                      <div :style="showAduitFlag?'max-width: 320px':'max-width: 390px'">
                                        总计：
                                      </div>
                                      <div :style="showAduitFlag?'max-width: 132.5px':'max-width: 190px'">
                                                <span class="together-span" style="color:#0A87F8;font-weight: 500;" v-if="originalMoney>=0">
                                                     {{originalMoney/100}}元</span>
                                        <span class="together-span" style="color:#FB4246;font-weight: 500;" v-else>
                                                     {{originalMoney/100}}元</span>
                                      </div>
                                      <div :style="showAduitFlag?'max-width: 132.5px':'max-width: 190px'">
                                                <span class="together-span" style="color:#0A87F8;font-weight: 500;" v-if="occurredMoney>=0">
                                                     {{occurredMoney/100}}元</span>
                                        <span class="together-span" style="color:#FB4246;font-weight: 500;" v-else>
                                                     {{occurredMoney/100}}元</span>
                                      </div>
                                      <div :style="showAduitFlag?'max-width: 132.5px':'max-width: 190px'">
                                                <span class="together-span" style="color:#0A87F8;font-weight: 500;" v-if="notOccurredMoney>=0">
                                                     {{notOccurredMoney/100}}元</span>
                                        <span class="together-span" style="color:#FB4246;font-weight: 500;" v-else>
                                                     {{notOccurredMoney/100}}元</span>
                                      </div>
                                      <div v-if="showAduitFlag" style="background: #FFFBF7;max-width: 132.5px">
                                                <span class="together-span" style="color: #FFA036;font-weight: 500">
                                                  {{ (Math.abs(copyBill.billBizInfo.totalAuditMoney)/100).toFixed(2)}}元
                                                </span>
                                      </div>
                                    </div>
                                    <div class="together-data u-no-border" v-if="showAduitFlag">
                                      <div class="clearfix" style="padding-right: 20px;background: #FFFBF7;">
                                        <span class="f-fr" style="color: #111111;font-size: 14px;" v-if="copyBill.billBizInfo.recvWalletAccountName">{{copyBill.billBizInfo.recvWalletAccountName}}({{copyBill.billBizInfo.recvWalletName}}{{copyBill.billBizInfo.recvWalletName?'-'+copyBill.billBizInfo.recvWalletPhone:copyBill.billBizInfo.recvWalletPhone}})</span>
                                        <span class="f-fr" style="color: #111111;font-size: 14px;" v-else>{{!copyBill.billBizInfo.recvWalletName&&!copyBill.billBizInfo.recvWalletPhone?'-':''}}{{copyBill.billBizInfo.recvWalletName}}{{copyBill.billBizInfo.recvWalletName?'-'+copyBill.billBizInfo.recvWalletPhone:copyBill.billBizInfo.recvWalletPhone}}</span>
                                        <span class="f-fr" style="color: #777777;font-size: 14px;">收款账号：</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                            <div class="together-item" v-if="copyBill.feeFlowList">
                                <div class="f-clearfix">
                                    <div class="title-name f-fl">账单流水 </div>
                                </div>
                            </div>
                            <div class="content-row">
                                <div v-if="copyBill.feeFlowList&&copyBill.feeFlowList.length===0" style="margin-bottom: 20px;color: rgb(153, 153, 153);">未产生流水记录</div>
                                <div class="bill-detail f-clearfix" v-for="(item,index) in copyBill.feeFlowList" :key="index">
                                    <div class="bill-status f-fl" style="height: 50px;">
                                        <div style="color:rgba(10,135,248,1);width: 100%" v-if="item.status == 1">正常</div>
                                        <div style="color:#777777;width: 100%" v-if="item.status == 2">已作废</div>
                                        <div style="width: 100%" v-if="item.auditStatus == 1"><span class="aduit-status contractAuditStatus1">审批中</span></div>
                                        <div style="width: 100%" v-if="item.auditStatus == 9"><span class="aduit-status contractAuditStatus9">审批通过</span></div>
                                        <div style="width: 100%" v-if="item.auditStatus == 5"><span class="aduit-status contractAuditStatus5">审批驳回</span></div>
                                        <div style="width: 100%" v-if="item.auditStatus == 6"><span class="aduit-status contractAuditStatus6">已撤销</span></div>
                                    </div>
                                    <div class="bill-item f-fl">
                                        <div class="it-title f-clearfix">
                                            <div class="f-fl it-border-box">
                                                <div class="it-top-border"></div>
                                                <div class="it-border"></div>
                                                <div class="it-left-border"></div>
                                            </div>
                                            <div class="f-fl">
                                                <span style="color:rgba(17,17,17,1);">{{item.affirmEmpName}}</span><span style="color: #FFA036;">({{item.affirmEmpTypeName}})</span>
                                                <span style="color:rgba(119,119,119,1);margin:0 10px;">于</span>
                                                <span style="color:rgba(17,17,17,1);">{{$moment(item.practicalTime).format('YYYY年MM月DD日')}}</span>
                                                <span class="paymentMethodNameStyle">{{item.paymentMethodName}}</span>
                                                <span  v-if="item.feeDirection == 1" style="color: #0A87F8;margin-right: 10px;">收取</span>
                                                <span v-else style="color: #FB4246;margin-right: 10px;">支出</span>
                                                <span>{{Math.abs(item.totalMoney)/100}}元</span>
                                            </div>
                                            <div class="f-fr title-right">
                                                <!-- <span style="color:#FFA036"></span> -->
                                                <span v-if="!showList[index].show" @click="listShow(index)" class="cursor" style="color:#0A87F8;margin-left:20px;">查看明细
                                                    <icon-font style="margin-left:10px;font-size:14px;" type="iconyumengtubiao_jiantouxiangyou" />
                                                </span>
                                                <span v-else @click="listShow(index)" class="cursor" style="color:#0A87F8;margin-left:20px;"> 收起
                                                    <icon-font style="margin-left:10px;font-size:14px;" type="iconyumengtubiao_jiantouxiangxia" />
                                                </span>
                                            </div>
                                        </div>
                                        <div class="item-info">
                                            <div class="item-info-top">支付备注：
                                                <span>{{item.paymentNote?item.paymentNote:'-'}}</span>
                                            </div>
                                            <div class="item-info-top f-clearfix" :style="item.payVoucherList&&item.payVoucherList.length>0?'':'padding-bottom:10px'" >
                                                <div class="f-fl">支付凭证：</div>
                                                <div class="f-fl showImg f-clearfix">
                                                    <div class="f-fl cursor" v-if="item.payVoucherList&&item.payVoucherList.length>0" v-for="(img,i) in item.payVoucherList" :key="i">
                                                        <div @click="handlePreview(img)"><img :src="img.small" alt="" ></div>
                                                    </div>
                                                    <span v-if="!item.payVoucherList||item.payVoucherList.length==0">-</span>
                                                </div>
                                            </div>
                                            <div class="info-item-info" v-if="showList[index].show">
                                                <p style="color: #777">明细</p>
                                                <ul class="f-clearfix">
                                                    <li class="f-fl" v-for="(res,i) in item.flowItemList" :key="i">{{res.feeSubjectName}}<span :style="res.feeDirection==1?'color: #0A87F8;':'color: #FB4246;'">{{res.feeDirection==1?'收款':'付款'}}</span>  {{res.amount/100}}元<span style="color: rgb(153, 153, 153);font-size: 12px">{{(res.exemptAmount>0&&res.feeDirection==1)?'(免收':''}}{{(res.exemptAmount>0&&res.feeDirection==2)?'(免支':''}}{{res.exemptAmount>0?res.exemptAmount/100+'元)':''}}</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="auditStatus" v-if="item.auditStatus==9">
                                            <img src="../../assets/workflow/pass.png" style="width: 80px;height: 80px;">
                                        </div>
                                        <div class="auditStatus" v-if="item.auditStatus==5">
                                            <img src="../../assets/workflow/reject.png" style="width: 80px;height: 80px;">
                                        </div>
                                        <div class="auditStatus" v-if="item.auditStatus==6">
                                            <img src="../../assets/workflow/back.png" style="width: 80px;height: 80px;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a-tab-pane>
                </a-tabs>
            </div>
            <div class="bottom">
                <span>{{copyBill.creater}}创建于 {{$moment(copyBill.createTime).format('lll')}}</span>
                <span>{{copyBill.updater}}更新于 {{$moment(copyBill.updateTime).format('lll')}}</span>
            </div>
        </div>
        <div class="f-fl">
          <div class="skeletonLoadingListStyle" v-show="skeletonLoading">
            <div class="clearfix">
              <div class="f-fl">
                <div class="bgColorStyle animate-box" style="width:32px;height: 32px;border-radius: 50%"></div>
              </div>
              <div class="f-fl" style="margin-left: 10px;width: calc(100% - 42px)">
                <div class="clearfix" style="width: 100%">
                  <div class="bgColorStyle animate-box f-fl" style="width: 51px;height: 20px;"></div>
                  <div class="bgColorStyle animate-box f-fr" style="width: 115px;height: 17px;"></div>
                </div>
                <div class="bgColorStyle animate-box" style="width: 100%;height: 36px;margin-top:7px">
                </div>
              </div>
            </div>
            <div class="clearfix" style="margin-top: 25px">
              <div class="f-fl">
                <div class="bgColorStyle animate-box" style="width:32px;height: 32px;border-radius: 50%"></div>
              </div>
              <div class="f-fl" style="margin-left: 10px;width: calc(100% - 42px)">
                <div class="clearfix" style="width: 100%">
                  <div class="bgColorStyle animate-box f-fl" style="width: 51px;height: 20px;"></div>
                  <div class="bgColorStyle animate-box f-fr" style="width: 115px;height: 17px;"></div>
                </div>
                <div class="bgColorStyle animate-box" style="width: 100%;height: 36px;margin-top:7px">
                </div>
              </div>
            </div>
            <div class="clearfix" style="margin-top: 25px">
              <div class="f-fl">
                <div class="bgColorStyle animate-box" style="width:32px;height: 32px;border-radius: 50%"></div>
              </div>
              <div class="f-fl" style="margin-left: 10px;width: calc(100% - 42px)">
                <div class="clearfix" style="width: 100%">
                  <div class="bgColorStyle animate-box f-fl" style="width: 51px;height: 20px;"></div>
                  <div class="bgColorStyle animate-box f-fr" style="width: 115px;height: 17px;"></div>
                </div>
                <div class="bgColorStyle animate-box" style="width: 100%;height: 36px;margin-top:7px">
                </div>
              </div>
            </div>
          </div>
        </div>
        <workflow-detail @successExamine="successExamine" @withdrawSuccess="withdrawSuccess" :auditInstanceId="auditInstanceId" :fromType="fromTypeNew" :auditStatus="auditStatus" v-if="!skeletonLoading" :nodeList="nodeList" :auditEmpNameList="auditEmpNameList"></workflow-detail>
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
import { auditViewPaymentApply } from '@/api/bill';
import {auditInstanceView} from "@/api/workflow";
import workflowDetail from './workflowDetail';
export default {
    name: "billDetails",
    props: {
      bizId: {
        type: String
      },
      taskId:{
        type: String
      },
      auditInstanceId:{
        type: String
      },
      fromType:{
        type:Number,
        default:1,//来自场景1、待我审批的；2、我已审批的、3、我发起的，4、抄送我的
      },
      isCcInstanceView:{
        type:Number,
        default:0,//是否来自抄送
      },
      auditEmpNameList:{
        type:Array,
      },
      isViewed:{
        type:Number,
        default:1,//是否来自抄送
      },
    },
    components: {
        workflowDetail,
    },
    data() {
        return {
            previewVisible: false,
            previewImage: '',
            activekey: '1',
            isEdit: false,
            activeIndex: 0,
            copyBill: {},//账单view展示DTO
            showList: [],
            originalMoney:'',
            occurredMoney:'',
            notOccurredMoney:'',
            editBillDialog:false,
            billProcessDialog:false,
            printFul:false,
            associatedDialogZk:false,
            associatedDialogYz:false,
            skeletonLoading:true,
            showMoreOperate:false,          //是否显示更多按钮
            innerMarkList:[],               //更多里面的mark
            outterMarkList:[],              //更多外面的mark
            permission:{
              renterViewPhoneFlag:false,
              ownerViewPhoneFlag:false,
              isRefresh:false,
            },
            nodeList:[],
            warningDialog:false,
            sendMessageFlag:true,
            examineDialog:false,
            examineTitle:'审核通过',
            auditResult:1,   //1、审核、2、驳回
            confirmPayInfoDialog:false,
            fromTypeNew:1,
            auditStatus:undefined,
            showAduitFlag:false,
        }
    },
    created() {
        this.getBill();
        this.auditInstanceView();
        this.fromTypeNew = this.fromType;
    },
    mounted() {

    },
    methods: {
      withdrawSuccess(){
        this.$emit('refreshinfoFun',true);
        this.fromTypeNew = 5;
        this.auditInstanceView();
      },
      goConfirmPay(){
        this.confirmPayInfoDialog = true;
      },
      successExamine(val){
        this.$emit('refreshinfoFun',true);
        this.auditInstanceView();
        if(val==0){
          this.fromTypeNew = 5;//审批过后不是审批人
        }
      },
      refreshinfoFun(res){  //详情有改变的操作  就改变状态
        if(res){
          this.isRefresh = res
        }
      },
      isRefreshFun(){      //根据详情有改变数据的操作 需要刷新
        if(this.isRefresh){
          this.getBill();
        }
        this.isRefresh = false
      },
        getBill() {
            this.skeletonLoading = true;
            auditViewPaymentApply(this.bizId).then(res => {
                  if (res.code === '200') {
                      let bill = res.data;
                      this.copyBill = Object.assign({}, bill);
                      if (this.copyBill.feeFlowList) {
                          let arry = []
                          this.copyBill.feeFlowList.forEach(function(e) {
                              let obj = {
                                  show: false
                              }
                              arry.push(obj)
                          }, this);
                          this.showList = arry;
                      }
                      let originalMoney = 0;
                      let occurredMoney = 0;
                      let notOccurredMoney = 0;
                      this.copyBill.feeInfoList.forEach(function(e) {
                          if (e.originalMoney) {
                              if (e.feeDirection === 1) {
                                  originalMoney += e.originalMoney * 1;
                              } else {
                                  originalMoney -= e.originalMoney * 1;
                              }
                          }
                          if (e.occurredMoney) {
                              if (e.feeDirection === 1) {
                                  occurredMoney += e.occurredMoney * 1;
                              } else {
                                  occurredMoney -= e.occurredMoney * 1;
                              }
                          }
                          if (e.notOccurredMoney) {
                              if (e.feeDirection === 1) {
                                  notOccurredMoney += e.notOccurredMoney * 1;
                              } else {
                                  notOccurredMoney -= e.notOccurredMoney * 1;
                              }
                          }
                      }, this);
                      this.originalMoney = originalMoney;
                      this.occurredMoney = occurredMoney;
                      this.notOccurredMoney = notOccurredMoney;
                      if(this.copyBill.billBizInfo){
                        this.auditInstanceId = this.copyBill.billBizInfo.auditInstanceId;
                        this.billBizId = this.copyBill.billBizInfo.billBizId;
                        if(this.copyBill.billBizInfo.bizAuditStatus==1||this.copyBill.billBizInfo.bizAuditStatus==5
                            ||this.copyBill.billBizInfo.bizAuditStatus==6||(this.copyBill.billBizInfo.bizAuditStatus==9&&this.copyBill.billBizInfo.isPaid==0)) {
                          this.showAduitFlag = true;
                        }
                      }
                  }
                  this.skeletonLoading = false;
              })
        },
        auditInstanceView() {
          let parameter = {
            auditInstanceId: this.auditInstanceId,
            isCcInstanceView: this.isCcInstanceView,
          };
          auditInstanceView(parameter).then(res => {
            if (res.code === '200') {
              this.nodeList = res.data.nodeList;
              this.auditStatus = res.data.auditStatus;
            }
          })
        },
        listShow(index) {
            this.showList[index].show = !this.showList[index].show;
        },
        handlePreview(file) {
            this.previewImage = file.url || file.origin;
            this.previewVisible = true;
        },
        handleCancel() {
            this.previewVisible = false;
        },
    },
    filters: {
        certificate(val) {
            return val == 1 ? '身份证' : val == 2 ? '护照' : val == 3 ? '港澳通行证' : val == 4 ? '台湾同胞证' : val == 5 ? '军官证' : val == 6 ? '驾驶证' : '-';
        },
        emergency(val) {
            return val == '1' ? '父母' : val == '2' ? '兄弟姐妹' : val == '3' ? '同事' : val == '4' ? '同学' : val == '5' ? '朋友' : val == '6' ? '亲属' : val == '7' ? '配偶' : val == '8' ? '其他' : '-';
        },
      formatPhone:function (value) {
        var str = String(value)
        var len = str.length;
        var prev,next;
        if (len >= 7) {
          prev = str.slice(-len,-8)
          next = str.slice(-4)
          str = prev+"****"+next
        } else if (len < 7 && len >= 6) {
          prev = str.slice(-len,-4)
          next = str.slice(-2)
          str = prev + "**" + next
        }
        if(!value){
          str = '-';
        }
        return str
      },
    }

}
</script>

<style scoped lang="less">
.billDetails-box {
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
    }
    .onLinePayStyle{
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      color: #111111;
      font-size: 14px;
      background: #F6F7F8;
      .unBindStyle{
        color: #0A87F8;
        margin-left: 15px;
      }
      .unBindWarningStyle{
        color: #FFA036
      }
    }
    .child-detail {
        height: calc(100vh - 150px);
        width: 840px;
        overflow: auto;
        position: relative;
        .auditStatus{
          position: absolute;
          right: 20px;
          top:0px;
        }
        .status1 {
          background: rgba(255,160,54,0.1);
          color: #FFA036;
        }
        .status2 {
          background: rgba(10,135,248,0.1);
          color: #0A87F8;
        }
        .status3 {
          background: rgba(3, 198, 131, 0.1);
          color: #03C683 ;
        }
        .color-status1 {
          color: #FFA036;
        }
        .color-status2 {
          color: #0A87F8;
        }
        .color-status3 {
          color: #03C683;
        }
        .color-status-text {
          color: #111111;
        }
        .contractAuditStatus1{
            color: #FFA036;
        }
        .contractAuditStatus9{
            color: #0A87F8;
        }
        .contractAuditStatus5{
            color: #FB4246;
        }
        .contractAuditStatus6{
            color: #777777;
        }
        .status1 {
            background: rgba(251, 66, 70, 0.1);
            color: #FB4246;
        }
        .status2 {
            background: rgba(3, 198, 131, 0.1);
            color: #03C683;
        }
        .status3 {
            background: rgba(119, 119, 119, 0.1);
            color: #777777;
        }
        .status4 {
            background: rgba(10, 135, 248, 0.1);
            color: #0A87F8;
        }
        .color-status1 {
            color: #FB4246;
        }
        .color-status2 {
            color: #03C683;
        }
        .color-status3 {
            color: #777777;
        }
        .color-status4 {
            color: #0A87F8;
        }
        .top {
            padding: 20px 20px 0 20px;
            margin-bottom: 30px;
            .title {
                display: flex;
                align-items: center;
                width: 138px;
                height: 44px;
                border-right: 1px dashed @borderColor;
                .radius-font {
                    width: 44px;
                    height: 44px;
                    line-height: 44px;
                    border-radius: 50%;
                    font-size:28px;
                }
                .status1 {
                    background: rgba(251, 66, 70, 0.1);
                    color: #FB4246;
                }
                .status2 {
                    background: rgba(3, 198, 131, 0.1);
                    color: #03C683;
                }
                .status3 {
                    background: rgba(119, 119, 119, 0.1);
                    color: #777777;
                }
                .status4 {
                    background: rgba(10, 135, 248, 0.1);
                    color: #0A87F8;
                }
                .color-status1 {
                    color: #FB4246;
                }
                .color-status2 {
                    color: #0A87F8;
                }
                .color-status3,
                .color-status4 {
                    color: #777777;
                }
                .color-status8 {
                    color: #03C683;
                }
                .label-item {
                    width: 80px;
                }
                .edit-status-icon {
                    vertical-align: middle;
                    margin-left: 8px;
                    color: @themeColor;
                }
                p{
                    font-size:12px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                }
                >div{
                    div{
                        font-size:14px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(17,17,17,1);
                    }  
                }
            }

            .detail {
                display: flex;
                flex-wrap: wrap;
                .item {
                    display: flex;
                    align-items: center;
                    width: 200px;
                    font-size: 12px; // padding-left: 40px;
                    input {
                        width: 180px;
                        padding-right: 10px;
                    }
                    & /deep/ .ant-select {
                        width: 180px;
                    }
                    .radius-font {
                        font-size:18px;
                    }
                    p{
                        font-size:12px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                    }
                    >div{
                        div{
                            font-size:12px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(17,17,17,1);
                        }  
                    }
                }
                .blank-box {
                    width: 30px;
                    height: 30px;
                }
            }
            .radius-font-person {
                color: #0A87F8;
                background-color: fade(#0A87F8, 10%);
            }
            .radius-font-greed {
                color: #03C683;
                background-color: fade(#03C683, 10%);
            }
            .radius-font-red {
                color: #F84246;
                background-color: fade(#F84246, 10%);
            }
            .radius-font-yellow {
                color: #FFA036;
                background-color: fade(#FFA036, 10%);
            }
            .radius-font-close {
                color: #777777;
                background-color: fade(#F6F7F8, 100%);
            }
        }
        .radius-font {
            display: inline-block;
            margin-right: 10px;
            width: 32px;
            height: 32px;
            line-height: 32px ;
            font-size: 12px;
            color: #FFA036;
            text-align: center;
            background-color: fade(#FFA036, 10%);
            border-radius: 16px;
        }
        .tabs-content {
            padding: 0 20px;
            // min-height: calc(100vh - 388px);
            .basic-info {
                .input-info {
                    display: flex;
                    flex-wrap: wrap;
                    .item {
                        margin: 0 20px 20px 0;
                        width: 180px;
                        & /deep/ .title {
                            margin-bottom: 4px;
                        }
                        & /deep/ .ant-select {
                            width: 100%;
                        }

                    }
                    .public-config {
                        display: flex;
                        flex-wrap: wrap;
                        label {
                            width: 100px;
                            margin: 10px 0 20px 0;
                            padding: 0;
                        }
                    }
                }
            }
        }
    }
    .showImg {
        >div {
            height: 66px;
            width: 105px;
            margin-right: 10px;
            margin-bottom: 10px;
            >div{
                width: 100%;
                height: 100%;
                line-height: 66px;
                border: 1px solid #eeeeee;
                background-color: #f6f7f8;
                text-align: center;
                border-radius: 6px;
                overflow: hidden;
                img {
                    width: auto;
                    max-width: 105px;
                    height: auto;
                    max-height: 66px;
                    overflow: hidden;
                }
            }
            p {
                color: rgba(119, 119, 119, 1);
                font-size: 12px;
                text-align: center;
                margin-top: 5px;
            }
        }
        >div:last-child{
            margin-right: 0px;
        }
    }
    .bottom {
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
        border-top: 1px dashed #DDDDDD;
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

    .radius-font {
        display: inline-block;
        margin-right: 10px;
        width: 60px;
        height: 24px;
        font-size: 14px;
        color: #FFA036;
        text-align: center;
        background-color: fade(#FFA036, 10%);
        border-radius: 12px;
    }
    .radius-font-person {
        color: #0A87F8;
        background-color: fade(#0A87F8, 10%);
    }
    .tabs-options {
        font-size: 0;
        cursor: pointer;
        div {
            text-align: right;
            display: inline-block;
            font-size: 14px;
            padding: 0  0 0 14px;
            color: #0a87f8;
        }
        div:last-child {
            span {
                margin-right: 0;
                border-right: none;
            }
        }
        &>span {
            display: inline-block;
            padding: 0 10px;
            height: 24px;
            line-height: 24px;
            font-size: 14px;
            border: 1px solid #DDDDDD;
            background-color: #F6F7F8;
            border-radius: 4px;
        }
        &>span:last-child {
            margin-left: 10px;
            border: 1px solid #0a87f8;
            background-color: #0a87f8;
            color: #ffffff;
        }
        & /deep/ .ant-popover {
            position: fixed;
            .ant-popover-inner-content {
                padding: 0;
                width: 100px;
                .action {
                    padding: 8px 18px;
                }
                .action:hover {
                    cursor: pointer;
                    background: rgba(10, 135, 248, 0.1);
                }
            }
        }
    }
    & /deep/ .ant-tabs-nav .ant-tabs-tab {
      margin: 0 30px 0 0;
      padding: 8px 0;
    }
    & /deep/ .anticon {
        margin-right: 1px;
    }
    & /deep/ .ant-input,
    .ant-select,
    .ant-checkbox-wrapper,
    .ant-select-dropdown {
        font-size: 12px;
        height: 24px;
        color: @mainFontColor;
    }
    & /deep/ .ant-select-selection__rendered,
    & /deep/ .ant-select-selection--single {
        font-size: 12px;
        height: 24px;
        line-height: 24px;
    }
    & /deep/ .ant-select-dropdown-menu {
        font-size: 12px;
    }
    & /deep/ .label-item .addon-after {
        font-size: 12px;
        height: 24px;
        line-height: 24px;
    }
    & /deep/ .ant-tabs-top-content {
        font-size: 12px;
        color: @mainFontColor;
    }
    .addon-after-position {
        position: absolute;
        top: 4px;
        z-index: 2;
        font-size: 12px;
    }
    .status-tags {
        padding: 4px 15px;
        margin-right: 10px;
        border-color: @borderColor!important;
        color: @mainFontColor!important;
        cursor: pointer;
    }
    .active {
        border-color: @themeColor!important;
        color: @themeColor!important;
    }
    .content-row {
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
                        // padding: 0 9px;
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
    .title-name {
        margin-left: 10px;
        height: 42px;
        line-height: 42px;
        font-weight: 600; // border-bottom: 1px solid #f3f3f2;
        position: relative;
    }
    .title-name::before {
        content: "";
        position: absolute;
        top: 14px;
        left: -9px;
        height: 14px;
        width: 2px;
        background: #0A87F8;
        -webkit-transition: all 0.3s ease;
        -webkit-box-shadow: 0 0 4px 0 @borderColor;
        box-shadow: 0 0 4px 0 @borderColor;
    }
    .content-row {
        &>.bill-detail:nth-child(1) {
            .it-top-border {
                border-left: none!important;
            }
        }
        &>.bill-detail:nth-last-child(1) {
            .item-info {
                border: none!important;
            }
            .it-left-border {
                border-left: none!important;
            }
        }
    }
    .bill-detail {}
    .bill-status {
        width: 60px;
        margin-right: 6px;
        text-align: right;
        line-height: 20px;
        .aduit-status{
            border-radius: 2px;
            padding: 2px;
        }
        .contractAuditStatus1{
            color: #FFA036;
            background-color: fade(#FFA036, 10%);
        }
        .contractAuditStatus9{
            color: #0A87F8;
            background-color: fade(#0A87F8, 10%);
        }
        .contractAuditStatus5{
            color: #FB4246;
            background-color: fade(#FB4246, 10%);
        }
        .contractAuditStatus6{
            color: #777777;
            background-color: fade(#777777, 10%);
        }
    }
    .bill-item {
        width: calc(100% - 66px);
        position: relative;
        .auditStatus{
            position: absolute;
            right: 5px;
            top:10px;
        }
        .it-title {
            width: 100%;
            height: 20px;
            .it-border-box {
                display: inline-block;
                height: 20px;
                width: 10px;
                margin-right: 16px;
                .it-border {
                    height: 10px;
                    width: 10px;
                    border-radius: 50%;
                    background: rgba(10, 135, 248, 1); // margin-top:6px;
                }
                .it-left-border {
                    height: 5px;
                    width: 5px;
                    margin-left: 4px;
                    border-left: 1px solid #DDDDDD;
                }
                .it-top-border {
                    height: 5px;
                    width: 5px;
                    margin-left: 4px;
                    border-left: 1px solid #DDDDDD;
                }
            }
            .shou-box {
                display: inline-block;
                height: 20px;
                width: 20px;
                color: #0A87F8;
                border: 1px solid #0A87F8;
                border-radius: 50%;
                text-align: center;
                margin: 0 10px;
                line-height: 20px;
            }
            .zhi-box{
               display: inline-block;
                height: 20px;
                width: 20px;
                color: #FB4246;
                border: 1px solid #FB4246;
                border-radius: 50%;
                text-align: center;
                margin: 0 10px;
                line-height: 20px; 
            }
        }
        .item-info {
            border-left: 1px solid #DDDDDD;
            margin-left: 4px;
            padding: 0 0 32px 0;
            >.item-info-top {
                padding-top: 12px;
                margin-left: 19px;
            }
            .info-item-info {
                margin-left: 19px;
                width: 863px; // height:68px;
                background: rgba(246, 247, 248, 1);
                p {
                    padding: 10px;
                }
                ul {
                    padding-left: 10px;
                    padding-bottom: 10px;
                    li {
                        width: 300px;
                    }
                }
            }
        }
        .paymentMethodNameStyle{
          color: #0A87F8;
          background-color: #f0f8ff;
          padding: 3px 7px;
          margin: 0 10px;
          font-size: 13px;
          border-radius: 2px;
        }
    }
    & /deep/ .ant-select-selection--multiple {
        //   height: 24px;
        min-height: 24px;
        .ant-select-selection__rendered>ul>li {
            height: 20px;
            margin-top: 1px;
            line-height: 20px;
        }
    }
    & /deep/ .upload .check-pic {
        width: 149px;
        height: 95px;
        padding-top: 0;
    }
    & /deep/ .file-list {
        width: 149px;
        height: 102px;
    }
    & /deep/ .ant-tabs .ant-tabs-small-bar .ant-tabs-tab{
       padding: 8px 0;
    }
    // & /deep/ .ant-tabs-ink-bar{
    //    width: 82px!important;
    // }
    .animate-box{
        flex-wrap: wrap;
        animation: skeleton-blink 1.2s ease infinite;
        -webkit-animation: skeleton-blink 1.2s ease infinite;
        background-image: -webkit-gradient(linear, left top, right top, color-stop(25%, #f0f0f0), color-stop(37%, #e3e3e3), color-stop(63%, #f0f0f0));
        background-image: -o-linear-gradient(left, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
        background-image: linear-gradient(90deg, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
        background-size: 400% 100%;
    }
    @-webkit-keyframes skeleton-blink {
        0% {
            background-position: 100% 50%
        }

        to {
            background-position: 0 50%
        }
    }
    @keyframes skeleton-blink {
        0% {
            background-position: 100% 50%
        }

        to {
            background-position: 0 50%
        }

    }
    .skeletonLoadingListStyle{
      padding: 10px 20px 80px 20px;
      width: 352px;
    }
}
</style>