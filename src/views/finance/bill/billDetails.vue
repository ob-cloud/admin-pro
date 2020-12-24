<template>
    <div class="billDetails-box">
        <div class="child-detail">
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
            <div class="top f-clearfix">
                 <div class="f-fl title" style="width: 200px">
                     <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                     <span style="margin-top: 9px;" class="radius-font status1" v-if="copyBill.billStatus==1&&!skeletonLoading"><icon-font type="icon-yumengtubiao_zhangdan" /></span>
                     <span style="margin-top: 9px;" class="radius-font status2" v-else-if="copyBill.billStatus==2&&!skeletonLoading"><icon-font type="iconyumengtubiao_xuanzhong-" /></span>
                     <span style="margin-top: 9px;" class="radius-font status3" v-else-if="copyBill.billStatus==9&&!skeletonLoading"><icon-font type="icon-yumengtubiao_zhangdanzuofei" /></span>
                     <div>
                         <label-item title="当前状态" class="clearfix" style="width: 140px;">
                             <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                             <div class="statusColor4 f-fl" v-if="copyBill.billStatus==1&&!skeletonLoading">{{copyBill.billStatusName}} <span class="color-status1" v-if="copyBill.overdueDays > 0">逾期({{copyBill.overdueDays}})天</span></div>
                             <div class="statusColor2 f-fl" v-else-if="copyBill.billStatus==2&&!skeletonLoading">{{copyBill.billStatusName}}</div>
                             <div class="statusColor3 f-fl" v-else-if="copyBill.billStatus==9&&!skeletonLoading">{{copyBill.billStatusName}}</div>
                             <div class="f-fl overHidde" v-if="copyBill.billBizInfo" style="max-width: 90px;" :style="copyBill.billBizInfo.bizAuditStatus==1?'color: #FFA036;':copyBill.billBizInfo.bizAuditStatus==9?'color: #0A87F8;':''">
                               <span v-if="copyBill.billBizInfo.bizAuditStatus==1" class="aduitStatus1 overHidde" >{{copyBill.billBizInfo.auditProcess}}</span>
                               <span v-if="copyBill.billBizInfo.bizAuditStatus==9&&copyBill.billBizInfo.isPaid==0" class="aduitStatus2 overHidde" >审批通过待付款</span>
                             </div>
                         </label-item>
                    </div>
                </div> 
                <div class="f-fl detail">
                    <div class="blank-box"></div>
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
                <a-tabs size="small" defaultActiveKey="1" v-model="activekey" @change="handleCallback">
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
                                <label-item class="item" title="周期" :skeletonLoading="skeletonLoading">
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
                                  <span v-else>{{copyBill.payerPhone|blankVal}}</span>
                                </label-item>
                                <label-item class="item"  v-else title="收款人电话" :skeletonLoading="skeletonLoading">
                                  <span v-if="copyBill.bizType==2&&!permission.renterViewPhoneFlag">{{copyBill.payerPhone|formatPhone}}</span>
                                  <span v-else-if="copyBill.bizType==3&&!permission.ownerViewPhoneFlag">{{copyBill.payerPhone|formatPhone}} </span>
                                  <span v-else>{{copyBill.payerPhone|blankVal}}</span>
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
                                <label-item class="item"  v-if="copyBill.totalMoney>=0" title="付款人账号" :skeletonLoading="skeletonLoading">
                                    <span v-if="copyBill.paymentAccountType == 1">{{copyBill.bankName ? copyBill.bankName :'-'}}-{{copyBill.paymentAccount?copyBill.paymentAccount:'-'}}</span>
                                    <span v-else-if="copyBill.paymentAccountType == 2">{{copyBill.paymentAccount?copyBill.paymentAccount:'-'}}</span>
                                    <span v-else>{{copyBill.paymentAccount?copyBill.paymentAccount:'-'}}</span>
                                </label-item>
                                <label-item class="item"  v-else title="收款人账号" :skeletonLoading="skeletonLoading">
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
                            <!-- <div class="bill-item"> -->

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
                                            <div :style="showAduitFlag?'max-width: 159px':'max-width: 190px'">
                                                <span class="together-span" style="color:#0A87F8;font-weight: 500;" v-if="originalMoney>=0">
                                                     {{originalMoney/100}}元</span>
                                                <span class="together-span" style="color:#FB4246;font-weight: 500;" v-else>
                                                     {{originalMoney/100}}元</span>
                                            </div>
                                            <div :style="showAduitFlag?'max-width: 159px':'max-width: 190px'">
                                                <span class="together-span" style="color:#0A87F8;font-weight: 500;" v-if="occurredMoney>=0">
                                                     {{occurredMoney/100}}元</span>
                                                <span class="together-span" style="color:#FB4246;font-weight: 500;" v-else>
                                                     {{occurredMoney/100}}元</span>
                                            </div>
                                            <div :style="showAduitFlag?'max-width: 159px':'max-width: 190px'">
                                                <span class="together-span" style="color:#0A87F8;font-weight: 500;" v-if="notOccurredMoney>=0">
                                                     {{notOccurredMoney/100}}元</span>
                                                <span class="together-span" style="color:#FB4246;font-weight: 500;" v-else>
                                                     {{notOccurredMoney/100}}元</span>     
                                            </div>
                                            <div v-if="showAduitFlag" style="background: #FFFBF7;max-width: 160px">
                                                <span class="together-span" style="color: #FFA036;font-weight: 500">
                                                  {{ (Math.abs(copyBill.billBizInfo.totalAuditMoney)/100).toFixed(2)}}元
                                                </span>
                                            </div>
                                        </div>
                                        <div class="together-data u-no-border" v-if="showAduitFlag">
                                          <div class="clearfix" style="padding-right: 20px;background: #FFFBF7;">
                                            <span class="f-fr" style="color: #111111;font-size: 14px;" v-if="copyBill.billBizInfo.recvWalletAccountName">{{copyBill.billBizInfo.recvWalletAccountName}}({{copyBill.billBizInfo.recvWalletName}}{{copyBill.billBizInfo.recvWalletName?'-'+copyBill.billBizInfo.recvWalletPhone:copyBill.billBizInfo.recvWalletPhone}})</span>
                                            <span class="f-fr" style="color: #111111;font-size: 14px;" v-else>{{copyBill.billBizInfo.recvWalletName}}{{copyBill.billBizInfo.recvWalletName?'-'+copyBill.billBizInfo.recvWalletPhone:copyBill.billBizInfo.recvWalletPhone}}</span>
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
                                            <img src="../../../assets/workflow/pass.png" style="width: 80px;height: 80px;">
                                        </div>
                                        <div class="auditStatus" v-if="item.auditStatus==5">
                                            <img src="../../../assets/workflow/reject.png" style="width: 80px;height: 80px;">
                                        </div>
                                        <div class="auditStatus" v-if="item.auditStatus==6">
                                            <img src="../../../assets/workflow/back.png" style="width: 80px;height: 80px;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="2" v-if="copyBill.billBizInfo">
                          <span slot="tab">
                              <icon-font type="iconyumengtubiao_yuyue" /> 审批记录
                          </span>
                      <biz-workflow-detail v-show="nodeList&&nodeList.length>0" :nodeList="nodeList"></biz-workflow-detail>
                      <div v-show="!nodeList||nodeList.length==0" style="height: 200px;"><a-empty description="未开启审批，无审批记录" style="margin-top: 50px;"></a-empty></div>
                    </a-tab-pane>
                    <div slot="tabBarExtraContent" class="tabs-options">
                        <div v-show="activekey == 1&&copyBill.contractIsAllowHanlder==1&&!fromAduit&&billOperaterFlag">
                            <div @click="billProcessFun" v-if="outterMarkList.indexOf('1')>-1">
                                <icon-font v-if="copyBill.totalMoney<0" type="icon-yumengtubiao_fukuan" />
                                <icon-font v-else type="icon-yumengtubiao_shoukuan" />
                                <span v-if="copyBill.totalMoney<0">&nbsp;付款</span>
                                <span v-else>&nbsp;收款</span>
                            </div>
                            <div @click="collectionFun(copyBill.id)" v-if="outterMarkList.indexOf('2')>-1">
                                <icon-font type="iconyumengtubiao_fasong" />
                                <span>&nbsp;催收</span>
                            </div>
                            <div @click="editData" v-if="outterMarkList.indexOf('3')>-1">
                                <icon-font type="iconyumengtubiao_bianji-" />
                                <span>&nbsp;编辑</span>
                            </div>
                            <div @click="backChild"  v-if="outterMarkList.indexOf('15')>-1">
                              <icon-font type="iconyumengtubiao_zhongzhi" />
                              <span>&nbsp;账单复原</span>
                            </div>
                            <div @click="printFun" v-if="outterMarkList.indexOf('14')>-1">
                                <icon-font type="iconyumengtubiao_dayin" />
                                <span>&nbsp;打印明细</span>
                            </div>
                            <div @click="toVoidFun" v-if="outterMarkList.indexOf('4')>-1">
                                <icon-font type="iconyumengtubiao_jinyong" />
                                <span>&nbsp;作废</span>
                            </div>
                            <div @click="deleteChild"  v-if="outterMarkList.indexOf('5')>-1">
                                <icon-font type="iconyumengtubiao_shanchu-" />
                                <span>&nbsp;删除</span>
                            </div>
                            <div @click="associated" v-if="outterMarkList.indexOf('6')>-1">
                                <icon-font type="icon-yumengtubiao_guanlian" />
                                <span>&nbsp;关联房源</span>
                            </div>
                            <div @click="associatedZk" v-if="outterMarkList.indexOf('7')>-1">
                                <icon-font type="icon-yumengtubiao_guanlian" />
                                <span>&nbsp;关联租客</span>
                            </div>
                            <div @click="associatedYz" v-if="outterMarkList.indexOf('8')>-1">
                                <icon-font type="icon-yumengtubiao_guanlian" />
                                <span>&nbsp;关联业主</span>
                            </div>
                            <div v-mark="['mk_finance_bill_clzd']" @click="goConfirmPay" v-show="copyBill.billBizInfo&&copyBill.billBizInfo.bizAuditStatus==9&&copyBill.billBizInfo.isPaid==0">
                              <icon-font type="iconyumengtubiao_fanhui"/>
                              <span>&nbsp;确认付款</span>
                            </div>
                            <a-popover placement="bottomRight" v-if="showMoreOperate">
                                <div>
                                    <icon-font type="iconyumengtubiao_gengduo-1" />
                                    &nbsp;更多
                                </div>
                                <template slot="content">
                                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('14')>-1" @click="printFun">打印明细</div>
                                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('4')>-1" @click="toVoidFun">作废</div>
                                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('6')>-1"  @click="associated">关闭房源</div>
                                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('7')>-1"  @click="associatedZk">关联租客</div>
                                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('8')>-1"  @click="associatedYz">关联业主</div>
                                </template>
                            </a-popover>
                        </div>
                        <div v-show="activekey==2">
                          <div @click="openUrgeHander" v-show="copyBill.billBizInfo&&copyBill.billBizInfo.bizAuditStatus==1&&(copyBill.billBizInfo.auditRelationType==1||copyBill.billBizInfo.auditRelationType==5)">
                            <icon-font type="iconyumengtubiao_cuishou"/>
                            <span>&nbsp;催办</span>
                          </div>
                          <div @click="revoke" v-show="copyBill.billBizInfo&&copyBill.billBizInfo.bizAuditStatus==1&&(copyBill.billBizInfo.auditRelationType==1||copyBill.billBizInfo.auditRelationType==5)">
                            <icon-font type="iconyumengtubiao_fanhui"/>
                            <span>&nbsp;撤销</span>
                          </div>
                          <div @click="pass" v-show="copyBill.billBizInfo&&copyBill.billBizInfo.bizAuditStatus==1&&(copyBill.billBizInfo.auditRelationType==2||copyBill.billBizInfo.auditRelationType==5)">
                            <icon-font type="iconyumengtubiao_jihuo"/>
                            <span>&nbsp;审批通过</span>
                          </div>
                          <div @click="reject" v-show="copyBill.billBizInfo&&copyBill.billBizInfo.bizAuditStatus==1&&(copyBill.billBizInfo.auditRelationType==2||copyBill.billBizInfo.auditRelationType==5)">
                            <icon-font type="iconyumengtubiao_fanhui"/>
                            <span>&nbsp;审批驳回</span>
                          </div>
                          <div @click="billProcessFun" v-show="copyBill.billBizInfo&&(copyBill.billBizInfo.bizAuditStatus==5||copyBill.billBizInfo.bizAuditStatus==6)&&(copyBill.billBizInfo.auditRelationType==1||copyBill.billBizInfo.auditRelationType==5)">
                            <icon-font v-if="copyBill.totalMoney<0" type="icon-yumengtubiao_fukuan" />
                            <icon-font v-else type="icon-yumengtubiao_shoukuan" />
                            <span v-if="copyBill.totalMoney<0">&nbsp;重新提交</span>
                            <span v-else>&nbsp;重新提交</span>
                          </div>
                          <div v-mark="['mk_finance_bill_clzd']" @click="goConfirmPay" v-show="copyBill.billBizInfo&&copyBill.billBizInfo.bizAuditStatus==9&&copyBill.billBizInfo.isPaid==0">
                            <icon-font type="iconyumengtubiao_fanhui"/>
                            <span>&nbsp;确认付款</span>
                          </div>
                        </div>
                    </div>
                </a-tabs>
            </div>
            <div class="bottom">
                <span>{{copyBill.creater}}创建于 {{$moment(copyBill.createTime).format('lll')}}</span>
                <span>{{copyBill.updater}}更新于 {{$moment(copyBill.updateTime).format('lll')}}</span>
            </div>
        </div>

        <a-modal centered :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
        <!-- 编辑账单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="editBillDialog" class="ownModalBorder titDialog" title="编辑账单信息">
            <edit-bill @saveSuccess="editSuccess" :billId="billId" @closeThis="editBillDialog=false"></edit-bill>
        </a-modal>
        <!-- 处理账单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="billProcessDialog" class="ownModalBorder titDialog" title="账单处理" @cancel="isRefreshFun">
            <bill-process @closeThis="billProcessDialog=false" @refreshinfoFun="refreshinfoFun" @saveSure="successFun" :billId="billId"></bill-process>
        </a-modal>
        <!-- 打印明细 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="690px" v-model="printFul" class="ownModalBorder titDialog" title="打印账单明细">
            <print-info @closeThis="printFul=false" :billId="billId"></print-info>
        </a-modal>
        <!-- 关联房源弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="associatedDialog" class="ownModalBorder titDialog" title="关联房源" @cancel="associatedDialog=false">
            <associated-detail :infoData="copyBill" @saveSuccess="initData" @closeThis="associatedDialog=false"></associated-detail>
        </a-modal>
        <!-- 关联租客弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="associatedDialogZk" class="ownModalBorder titDialog" title="关联租客" @cancel="associatedDialogZk=false">
            <associated-zk :infoData="copyBill" @saveSuccess="initData" @closeThis="associatedDialogZk=false"></associated-Zk>
        </a-modal>
        <!-- 关联业主弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="associatedDialogYz" class="ownModalBorder titDialog" title="关联业主" @cancel="associatedDialogYz=false">
            <associated-Yz :infoData="copyBill" @saveSuccess="initData" @closeThis="associatedDialogYz=false"></associated-Yz>
        </a-modal>
        <!--催办 -->
        <a-modal title="" width="433px" v-model='warningDialog' class="myLaunch-box-special-Dialog titDialog" @ok="urgeHander" @cancel="sendMessageFlag=true;warningDialog=false" okText="确定" cancelText="取消" :closable="false">
          <div class="content">
            <a-icon class="contentCircle" type="question-circle"/>
            <span class="contentTitle">确定要给当前审批人发送消息提醒吗？</span>
            <div class="confirm-content">确定后会以消息的形式通知到当前审批人</div>
            <div class="confirm-warning">当前审批人：{{auditEmpNameList.join('、')}}</div>
            <div class="confirm-check"><a-checkbox v-model="sendMessageFlag" @change="onChangeSendMessageFlag">短信通知当前审批人</a-checkbox></div>
          </div>
        </a-modal>
        <!-- 审核 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="examineDialog" class="ownModalBorder titDialog" :title="examineTitle" @cancel="examineDialog=false">
          <examine :auditInstanceId="auditInstanceId" :auditResult="auditResult" @cancelExamine="examineDialog=false" @successExamine="successExamine"></examine>
        </a-modal>
        <!-- 确认付款信息 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="confirmPayInfoDialog" class="ownModalBorder titDialog" title="确认账单信息" @cancel="confirmPayInfoDialog=false">
          <confirm-pay-info :billId="billId" :billBizId="billBizId" @saveSuccess="confirmPayInfoSuccess" @closeThis="confirmPayInfoDialog=false"></confirm-pay-info>
        </a-modal>
    </div>
</template>

<script>
import { billView,billAuditView, billDelete,billCancel,billPayUrge,onlinePayUnlock,billCancelRevert } from '@/api/bill';
import editBill from './editBill';
import billProcess from './billProcess';
import printInfo from './printInfo';
import associatedDetail from './associated';
import associatedZk from './associatedZk';
import associatedYz from './associatedYz';
import ConfirmPayInfo from './confirmPayInfo';
import {listActionNode, revoke, urgeHander} from "@/api/workflow";
import Examine from '../../workflow/examine';
import BizWorkflowDetail from '@/views/workflow/bizWorkflowDetail';
export default {
    name: "billDetails",
    props: {
        billId: {
            type: String
        },
        fromDetailId:{
            type: String
        },
        fromFlowId:{
            type: String
        },
        fromAduit:{
            type:Boolean,
            default:false, //来自账单
        },
        billOperaterFlag:{
          type:Boolean,
          default:true,  //来自合同
        },
        workflowTab:{
          type: Boolean,
          default:false,
        }
    },
    components: {
        editBill,
        billProcess,
        printInfo,
        associatedDetail,
        associatedZk,
        associatedYz,
        Examine,
        BizWorkflowDetail,
        ConfirmPayInfo,
    },
    data() {
        return {
            cancelRentDialog: false,
            previewVisible: false,
            previewImage: '',
            activekey: '1',
            contract: {},
            isEdit: false,
            houseTagConfig: [],
            housePublicConfig: [],
            activeIndex: 0,
            copyBill: {},//账单view展示DTO
            channelList: [],
            occupationList: [
                {
                    label: '制造（生产/工艺/制造）',
                    value: '1'
                },
                {
                    label: '房产（房产/建筑）',
                    value: '2'
                },
                {
                    label: '金融（金融/银行/投资/保险）',
                    value: '3'
                },
                {
                    label: '医疗(医疗/护理/制药)',
                    value: '4'
                },
                {
                    label: '文化（文化/广告/传媒）',
                    value: '5'
                },
                {
                    label: '法律（律师/法务）',
                    value: '6'
                },
                {
                    label: '教育（教育/培训）',
                    value: '7'
                },
                {
                    label: '行政（公务员/行政/事业单位）',
                    value: '8'
                },
                {
                    label: '个体经营',
                    value: '9'
                },
                {
                    label: '贸易',
                    value: '10'
                },
                {
                    label: '物流',
                    value: '11'
                },
                {
                    label: '模特',
                    value: '12'
                },
                {
                    label: '空姐',
                    value: '13'
                },
                {
                    label: '学生',
                    value: '14'
                },
                {
                    label: '其它',
                    value: '15'
                }
            ],
            relationshipList: [
                {
                    label: '父母',
                    value: '1'
                },
                {
                    label: '兄弟姐妹',
                    value: '2'
                },
                {
                    label: '同事',
                    value: '3'
                },
                {
                    label: '同学',
                    value: '4'
                },
                {
                    label: '朋友',
                    value: '5'
                },
                {
                    label: '亲属',
                    value: '6'
                },
                {
                    label: '配偶',
                    value: '7'
                },
                {
                    label: '其他',
                    value: '8'
                }
            ],
            togetherList: [],
            showList: [],
            originalMoney:'',
            occurredMoney:'',
            notOccurredMoney:'',
            editBillDialog:false,
            billProcessDialog:false,
            printFul:false,
            associatedDialog:false,
            associatedDialogZk:false,
            associatedDialogYz:false,
            skeletonLoading:true,
            showMoreOperate:false,          //是否显示更多按钮
            permissions:[],                 //所有的权限mark
            innerMarkList:[],               //更多里面的mark
            outterMarkList:[],              //更多外面的mark
            permission:{
              renterViewPhoneFlag:false,
              ownerViewPhoneFlag:false,
              isRefresh:false,
            },
            nodeList:[],
            warningDialog:false,
            auditEmpNameList:[],
            sendMessageFlag:true,
            auditInstanceId:'',   //审批id
            examineDialog:false,
            examineTitle:'审核通过',
            auditResult:1,   //1、审核、2、驳回
            confirmPayInfoDialog:false,
            billBizId:'',
            showAduitFlag:false,
        }
    },
    created() {
        this.getBill();
    },
    mounted() {

    },
    methods: {
      goConfirmPay(){
        this.confirmPayInfoDialog = true;
      },
      successExamine(){
        this.$emit('refreshinfoFun', true);
        this.examineDialog = false;
        this.initData();
      },
      onChangeSendMessageFlag(e){
        this.sendMessageFlag = e.target.checked;
      },
      pass(){
        this.examineDialog = true;
        this.auditResult = 1;
        this.examineTitle = '审核通过';
      },
      reject(){
        this.examineDialog = true;
        this.auditResult = 2;
        this.examineTitle = '审核驳回';
      },
      revoke() {
        let _this = this;
        let parameter = {
          auditInstanceId : this.auditInstanceId,
          bizScene:32,
        };
        this.$modal.confirm({
          title: '你确定要撤销申请吗？',
          content: '',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            revoke(parameter).then(res => {
              if (res.code == 200) {
                if(res.data.successFlag==1){
                  _this.$message.success('撤销申请成功！');
                  _this.$emit('refreshinfoFun', true);
                  setTimeout(()=> {
                    _this.getBill();
                  },500);
                }
                else{
                  _this.$message.error(res.data.errorMsg);
                }
              }else{
                _this.$message.error('撤销申请失败！');
              }
            })
          },
          onCancel() {
          },
        });
      },
      urgeHander(){
        let parameter ={
          auditInstanceId:this.copyBill.billBizInfo.auditInstanceId,
          isSmsNotify:this.sendMessageFlag?1:0,
        };
        this.warningDialog = false;
        urgeHander(parameter).then(res => {
          if (res.code == 200) {
            this.$message.success('催办成功！');
            this.warningDialog = false;
          }else{
            this.$message.error('催办失败！');
          }
        })
      },
      openUrgeHander(){
        this.auditEmpNameList = this.copyBill.billBizInfo.auditEmpNameList;
        this.warningDialog = true;
        this.auditInstanceId = this.copyBill.billBizInfo.auditInstanceId;
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
      unLock(){
        let _this = this;
        let id = this.copyBill.id;
        this.$modal.confirm({
          title: '确定要解除 「' + this.copyBill.payerName + '/' + this.copyBill.payerPhone + '」 的账单锁定吗？',
          content: '解除锁定后，租客支付将受影响；请确认租客已退出该笔账单的线上支付',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            onlinePayUnlock({id:id}).then(res => {
              // console.log(res)
              if (res.code == 200) {
                _this.$message.success('操作成功！');
                setTimeout(() => {
                  _this.getBill();
                }, 500)

              }
            })
          },
          onCancel() {
          },
        });
      },
      confirmPayInfoSuccess(){
        this.confirmPayInfoDialog = false;
        this.handleCallback('1');
        setTimeout(()=>{
          this.getBill();
        },500);
        this.$emit('refreshinfoFun', true);
      },
        initData(){
            this.associatedDialog = false;
            this.associatedDialogZk = false;
            this.associatedDialogYz = false;
            this.confirmPayInfoDialog = false;
            this.getBill();
            this.$emit('refreshinfoFun', true);
        },
        listActionNode() {
          let parameter = {
            auditInstanceId: this.auditInstanceId,
          };
          listActionNode(parameter).then(res => {
            if (res.code === '200') {
              this.nodeList = res.data;
              if(this.workflowTab){
                this.handleCallback('2');
              }
            }
          })
        },
        getBill() {
            this.skeletonLoading = true;
            this.showAduitFlag = false;
            if(this.fromAduit){
                let parameter = {
                    id:this.billId,
                    fromFlowId:this.fromFlowId,
                    fromDetailId:this.fromDetailId,
                };
                billAuditView(parameter).then(res => {
                    if (res.code === '200') {
                        let bill = res.data;
                        this.copyBill = Object.assign({}, bill);
                        if(this.copyBill.billBizInfo){
                          this.auditInstanceId = this.copyBill.billBizInfo.auditInstanceId;
                          this.billBizId = this.copyBill.billBizInfo.billBizId;
                          this.listActionNode();
                          if(this.copyBill.billBizInfo.bizAuditStatus==1||this.copyBill.billBizInfo.bizAuditStatus==5
                              ||this.copyBill.billBizInfo.bizAuditStatus==6||(this.copyBill.billBizInfo.bizAuditStatus==9&&this.copyBill.billBizInfo.isPaid==0)) {
                              this.showAduitFlag = true;
                          }
                        }
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
                        this.getPermission();
                    }
                    this.skeletonLoading = false;
                })
            }
            else{
                billView(this.billId).then(res => {
                    if (res.code === '200') {
                        let bill = res.data;
                        this.copyBill = Object.assign({}, bill);
                        if(this.copyBill.billBizInfo){
                          this.auditInstanceId = this.copyBill.billBizInfo.auditInstanceId;
                          this.billBizId = this.copyBill.billBizInfo.billBizId;
                          this.listActionNode();
                          if(this.copyBill.billBizInfo.bizAuditStatus==1||this.copyBill.billBizInfo.bizAuditStatus==5
                              ||this.copyBill.billBizInfo.bizAuditStatus==6||(this.copyBill.billBizInfo.bizAuditStatus==9&&this.copyBill.billBizInfo.isPaid==0)) {
                            this.showAduitFlag = true;
                          }
                        }
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
                        this.getPermission();
                    }
                    this.skeletonLoading = false;
                })
            }
        },
        getPermission(){
            //按钮权限处理
            //1、处理账单；2、催收；3、编辑；4、作废；5、删除；6、关联房源；7、关联租客；8、关联业主；10、催办；11、撤销；12、审批；9、重新提交；13、确认付款;14、打印;15、还原
            if(!this.permissions||this.permissions.length==0){
              this.permissions = JSON.parse(sessionStorage.getItem('permissions'));
            }
            let markArr = [];
            let btnArr = [];

            if(this.copyBill.billBizInfo){
              //啥都不显示
            }
            else{
              if(this.copyBill.billStatus==1){
                markArr.push('mk_finance_bill_clzd','mk_finance_bill_bjzd','mk_finance_bill_zf');
                if(this.copyBill.bizType==2&&this.copyBill.notOccurredMoney>0){
                  markArr.push('mk_finance_bill_cszd');
                }
              }
              if(this.copyBill.isAllowHouseRelation==1){
                markArr.push('mk_finance_bill_glfy');
              }
              if(this.copyBill.isAllowRCRelation==1){
                markArr.push('mk_finance_bill_glzk');
              }
              if(this.copyBill.isAllowOCRelation==1){
                markArr.push('mk_finance_bill_glyz');
              }
              if(this.copyBill.billStatus==2){
                markArr.push('mk_finance_bill_zf');
              }
              if(this.copyBill.billStatus==9){
                markArr.push('mk_finance_bill_fy');
                markArr.push('mk_finance_bill_sc');
              }
              markArr.push('mk_finance_bill_dy');
            }
            //判断资源权限
            let renterViewPhoneFlag = false;
            let mk_contract_owner_yzdh = false;
            markArr.forEach(ele => {
              this.permissions.some(function(value){
                if (ele == value.mark){
                  if(value.mark == 'mk_finance_bill_clzd'){
                    btnArr.push('1');
                  }else if(value.mark == 'mk_finance_bill_cszd'){
                    btnArr.push('2');
                  }else if(value.mark == 'mk_finance_bill_bjzd'){
                    btnArr.push('3');
                  }else if(value.mark == 'mk_finance_bill_zf'){
                    btnArr.push('4');
                  }else if(value.mark == 'mk_finance_bill_sc'){
                    btnArr.push('5');
                  }else if(value.mark == 'mk_finance_bill_glfy'){
                    btnArr.push('6');
                  }else if(value.mark == 'mk_finance_bill_glzk'){
                    btnArr.push('7');
                  }else if(value.mark == 'mk_finance_bill_glyz'){
                    btnArr.push('8');
                  }else if(value.mark == 'mk_finance_bill_dy'){
                    btnArr.push('14');
                  }else if(value.mark == 'mk_contract_tenant_zkdh'){
                    renterViewPhoneFlag = true;
                  }else if(value.mark == 'mk_contract_owner_yzdh'){
                    mk_contract_owner_yzdh = true;
                  }else if(value.mark == 'mk_finance_bill_fy'){
                    btnArr.push('15');
                  }
                  return true;
                }
              });
            });
            this.permission.renterViewPhoneFlag = renterViewPhoneFlag;
            this.permission.ownerViewPhoneFlag = mk_contract_owner_yzdh;

            this.outterMarkList = [];
            this.innerMarkList = [];
            if(btnArr.length>4){
                this.showMoreOperate = true;
                for (let i = 0; i < btnArr.length; i++) {
                    if(i>2){
                        this.innerMarkList.push(btnArr[i]);
                    }
                    else{
                        this.outterMarkList.push(btnArr[i]);
                    }
                }
            }
            else{
                this.showMoreOperate = false;
                this.outterMarkList = btnArr;
                this.innerMarkList = [];
            }
        },
        listShow(index) {
            this.showList[index].show = !this.showList[index].show;
        },
        editData() {
            this.editBillDialog = true;

        },
        successFun(res) {
            if (res) {
                this.billProcessDialog = false;
                setTimeout(() => {
                    this.getBill();
                }, 1000)
                this.$emit('refreshinfoFun', true);
            }
        },
        handleCallback(val) {
            this.activekey = val;
        },
        handlePreview(file) {
            this.previewImage = file.url || file.origin;
            this.previewVisible = true;
        },
        handleCancel() {
            this.previewVisible = false;
        },
        editSuccess(res){
          if(res){
            this.editBillDialog = false;
            this.getBill();
            this.$emit('refreshinfoFun', true);
          }
        },
        billProcessFun() {
            this.billProcessDialog = true;
        },
        collectionFun(id) {
            let _this = this;
            let parameter = id;
            this.$modal.confirm({
                title: '确定要发送催收短信吗？',
                content: '发送成功后，租客将会收到交租的短信',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    billPayUrge(parameter).then(res => {
                        // console.log(res)
                        if (res.code === '200') {
                            _this.$message.success('操作成功！');
                            setTimeout(() => {
                                _this.getBill();
                            }, 500)
                            _this.$emit('refreshinfoFun', true);
                        }
                    })

                },
                onCancel() {
                    // console.log('Cancel');
                },
            });
        },
        toVoidFun() {
            let _this = this;
            this.$modal.confirm({
                title: '确定要作废 「' + _this.copyBill.payerName + '/' + _this.copyBill.payerPhone + '」 的账单吗？',
                content: '作废后，此账单将无效，请谨慎操作。',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    billCancel(_this.billId).then(res => {
                        // console.log(res)
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
                    // console.log('Cancel');
                },
            });
        },
        backChild(){
          let _this = this;
          this.$modal.confirm({
            title: '确定要还原 「' + _this.copyBill.payerName + '/' + _this.copyBill.payerPhone + '」 的账单吗？',
            content: '复原后，明细和流水将同步复原',
            okText: '确定',
            cancelText: '取消',
            onOk() {
              billCancelRevert(_this.billId).then(res => {
                // console.log(res)
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
              // console.log('Cancel');
            },
          });
        },
        deleteChild() {
            let _this = this;
            this.$modal.confirm({
                title: '确定要删除 「' + _this.copyBill.payerName + '/' + _this.copyBill.payerPhone + '」 的账单吗？',
                content: '删除后将不可恢复',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    billDelete(_this.billId).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            _this.$message.success('操作成功！');
                            _this.$emit('saveSuccess',res);
                        }
                    })
                },
                onCancel() {
                    // console.log('Cancel');
                },
            });
        },
        printFun(){
            this.printFul = true;
        },
        //关联房源
        associated() {
            this.associatedDialog = true;
        },
        //关联租客
        associatedZk() {
            this.associatedDialogZk = true;
        },
        //关联业主
        associatedYz() {
            this.associatedDialogYz = true;
        },
    },
    filters: {
      blankVal(val){
        if(!val){
          return '-';
        }else{
          return  val;
        }
      },
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
        overflow: auto;
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
            .aduitStatus1{
              font-size: 12px;
              color: #FFA036;
              padding-left: 5px;
            }
            .aduitStatus2{
              font-size: 12px;
              color: #0A87F8;
              padding-left: 5px;
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
                        margin: 0 39px 20px 0;
                        width: 200px;
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
}
.content{
  position: relative;
  padding: 32px 32px 0;
  .contentCircle{
    float: left;
    margin-right: 16px;
    font-size: 22px;
    color:#faad14;
  }
  .contentTitle{
    display: block;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 16px;
    line-height: 1.4;
  }
  .confirm-content{
    margin-top: 7px;
    margin-left: 38px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
  }
  .confirm-warning{
    margin-left: 38px;
    width:331px;
    padding: 8.5px 0 8.5px 10px;
    background:rgba(245,247,254,1);
    border-radius:4px;
    margin-top: 15px;
  }
  .confirm-check{
    position: absolute;
    bottom:-75px;
    left: 70px;
  }
}
</style>
<style lang="less">
.myLaunch-box-special-Dialog{
  .ant-modal-header {
    border-bottom: none;
    height: 50px;
    line-height: 50px;
  }
  .ant-modal-footer {
    padding: 50px 32px 24px 32px;
    border-top: none;
  }
}
</style>
