<template>
    <div id="wallet" :class="hasWallet?'showAllStyle':'notShowAllStyle'">
        <div class="loadingCircle" id="loadingCircle" v-if="allLoading"></div>
        <div class="add-btn-wrap" @click="openWallet()" v-if="showAddNewWalletFlag">
          <icon-font type="iconyumengtubiao_tianjia" />开通新钱包
        </div>
        <div v-show="!allLoading&&hasWallet" class="deptStyle clearfix">
            <div class="f-fl">查看账户：</div>
            <label-item title="" class="u-no-border f-fl">
                <a-select class="aliasStyle" style="min-width: 120px;height: 34px;" :showSearch="true" :filterOption="(inputValue,option)=>filterOption(inputValue,option)" :allowClear="waAuthList.length==1?false:true" v-model="accountId" placeholder="全部" @change="handleChange" v-if="waAuthList&&waAuthList.length>0">
                    <a-select-option v-for="(item) in waAuthList" :key="item.id">
                        {{ item.alias }}
                    </a-select-option>
                </a-select>
            </label-item>
        </div>
        <content-main v-show="!allLoading&&hasWallet&&isBindPhone==1">
            <div class="staticStyle clearfix">
                <div class="staticStyleLeft f-fl" v-if="!moneyTotalLoading">
                    <div class="staticStyleLeft1 clearfix">
                      <div class="fontTitle f-fl size16">余额 (元)</div>
                      <div class="operateStyle cursor f-fr" @mouseenter="popoverVisible=true" v-if="accountId&&(isOwner==1||(isOwner==0&&(operationList.indexOf(5)>-1||operationList.indexOf(6)>-1))||haveResourceEditAlias)">
                        <a-popover trigger="hover" v-model="popoverVisible"  placement="bottom" v-if="isOwner==1||(isOwner==0&&(operationList.indexOf(5)>-1||operationList.indexOf(6)>-1))||haveResourceEditAlias">
                          <template slot="content">
                            <div class="action cursor" v-if="operationList.indexOf(5)>-1" @click="popoverVisible=false;bankCardListDialog=true;">银行卡管理</div>
                            <div class="action cursor" v-if="operationList.indexOf(6)>-1" @click="popoverVisible=false;authorizeListDialog=true;">账户管理人</div>
                            <div class="action cursor" v-if="isOwner==1" @click="setAllinpayPwd()">{{isSetPayPwd==1?'重置交易密码':'设置交易密码'}}</div>
                            <div class="action cursor" v-if="haveResourceEditAlias" @click="goEditAlias()">修改钱包名称</div>
                            <div class="action cursor" v-if="isOwner==1" @click="changePhone()">变更手机号</div>
                            <div class="action cursor" v-if="isOwner==1" @click="popoverVisible=false;cancellationDialog=true;">注销账号</div>
                          </template>
                          <icon-font  type="iconyumengtubiao_peizhi"></icon-font>
                        </a-popover>
                      </div>
                    </div>
                    <div style="margin-top: 10px;">
                      <span class="size20" style="margin-right: 8px;">¥</span>
                      <span class="size24">{{amountData.allAmount?amountData.allAmount.toFixed(2):'0.00'}}</span>
                    </div>
                    <div class="frozenStyle clearfix" :style="amountData.freezenAmount?'background:rgba(246,247,248,1);':''">
                      <span v-if="amountData.freezenAmount">
                        冻结：{{amountData.freezenAmount.toFixed(2)}}元
                        <a-tooltip placement="bottom" title="银行正在处理中的金额">
                          <a-icon type="exclamation-circle" class="f-fr" style="color: #777777;margin:7px 11px 0 0;font-size: 12px;" />
                        </a-tooltip>
                      </span>
                    </div>
                    <div class="dealStyle clearfix">
                        <div class="cursor" v-if="operationList.indexOf(2)>-1" @click="rechargePreDialog=true;">充值</div>
                        <div class="cursor" v-if="operationList.indexOf(3)>-1" @click="openWithdrawPreDialog">提现</div>
                        <div class="cursor" v-if="operationList.indexOf(4)>-1" @click="transferPreDialog=true;">转账</div>
                    </div>
                </div>
              <div class="staticStyleLeft f-fl" v-if="moneyTotalLoading">
                <div class="staticStyleLeft1 clearfix" style="height: 180px;">
                  <div class="fontTitle f-fl size16">余额 (元)</div>
                  <div class="loading-center" style="height: 90px;margin-top: 70px;padding-left: 60px;">
                    <div class="loading-center-absolute">
                      <div class="object"></div>
                      <div class="object"></div>
                      <div class="object"></div>
                      <div class="object"></div>
                      <div class="object"></div>
                      <div class="object"></div>
                      <div class="object"></div>
                      <div class="object"></div>
                      <div class="object"></div>
                      <div class="object"></div>
                    </div>
                  </div>
                </div>
              </div>
                <div class="staticStyleRight f-fl">
                    <div class="top clearfix">
                        <div class="topItem f-fl cursor" :class="dayRange==7?'selectedStyle':'unSelectStyle'" @click="changeDayRange(7)">近7日收支</div>
                        <div class="topItem f-fl cursor" :class="dayRange==30?'selectedStyle':'unSelectStyle'" @click="changeDayRange(30)">近30日收支</div>
                    </div>
                    <div class="chart-wrap">
                        <div id="wallet-c1"></div>
                    </div>
                </div>
            </div>
            <div class="tableStyle">
                <div class="clearfix">
                    <div class="tableTopStyle f-fl clearfix">
                        <div class="tableTopStyle1 f-fl">交易流水</div>
                        <div class="tableTopStyle2 f-fl">入账：<span class="tableTopStyle2Font1">{{tfStatData.incomeTotal?tfStatData.incomeTotal.toFixed(2):'0.00'}}</span>元</div>
                        <div class="spiltStyle f-fl"></div>
                        <div class="tableTopStyle2 f-fl">出账：<span class="tableTopStyle2Font2">{{tfStatData.expendTotal?tfStatData.expendTotal.toFixed(2):'0.00'}}</span>元</div>
                    </div>
                    <div class="f-fr cursor exportExcel-box" v-mark="['mk_wallet_dc']"><span @click="exportExcel"><icon-font class="f-ftc-blue" type="iconyumengtubiao_xiazai1" /></span></div>
                    <div class="f-fr tableSearchStyle">
                        <search-dialog  placeholder="来源/流水号/摘要" :showDeptEmp="false" :showEmployee="false" :showCityTown="false" :showCostType="true" showCostTypePlaceholder="费用科目" showCostTypeDefaultName="不限" :searchList="searchList" @search="assetsFormData"></search-dialog>
                    </div>
                </div>
                <div class="table" v-show="!tableDataLoading">
                    <a-table rowKey="id" :locale="tablenodata" :bordered="true" :customRow="openDetail" :pagination="false" :columns="tableColumns" :dataSource="tableData">
                        <div slot="status" slot-scope="status">
                            <div v-if="status==0" class="fontNormal clearfix f-fl">
                                <div class="IconRadius normalBg f-fl"></div>
                                <div class="f-fl">
                                    <span type="primary" style="color: #111111">待支付</span>
                                </div>
                            </div>
                            <div v-if="status==1" class="fontNormal clearfix f-fl">
                                <div class="IconRadius normalBg f-fl"></div>
                                <div class="f-fl">
                                    <span type="primary" style="color: #111111">交易中</span>
                                </div>
                            </div>
                            <div v-if="status==2" class="fontProhibit clearfix f-fl">
                                <div class="IconRadius prohibitBg5 f-fl"></div>
                                <div class="f-fl">
                                    <span type="primary" style="color: #111111">交易失败</span>
                                </div>
                            </div>
                            <div v-if="status==3" class="fontProhibit clearfix f-fl">
                                <div class="IconRadius prohibitBg2 f-fl"></div>
                                <div class="f-fl">
                                    <span type="primary" style="color: #111111">交易成功</span>
                                </div>
                            </div>
                            <div v-if="status==4" class="fontProhibit clearfix f-fl">
                                <div class="IconRadius prohibitBg2 f-fl"></div>
                                <div class="f-fl">
                                    <span type="primary" style="color: #111111">交易成功-有退款</span>
                                </div>
                            </div>
                            <div v-if="status==5" class="fontProhibit clearfix f-fl">
                                <div class="IconRadius prohibitBg6 f-fl"></div>
                                <div class="f-fl">
                                    <span type="primary" style="color: #111111">交易关闭</span>
                                </div>
                            </div>
                        </div>
                        <div slot="amount" slot-scope="text,record">
                            <span v-if="record.direction==1" style="color: #0A87F8;">+</span>
                            <span v-else-if="record.direction==2" style="color: #FB4246;">-</span>
                            {{text?(text/100).toFixed(2):'0.00'}}
                        </div>
                        <div slot="source" slot-scope="text">
                            <a-popover>
                                <template slot="content">
                                    <p style="padding: 8px;">{{text?text:'-'}}</p>
                                </template>
                                <div style="max-width:270px;">
                                    <p class="overHidde"  type="primary">{{text?text:'-'}}</p>
                                </div>
                            </a-popover>
                        </div>
                        <div slot="walletAlias" slot-scope="text">
                            <a-popover>
                                <template slot="content">
                                    <p style="width:100px;text-align:center;">{{text}}</p>
                                </template>
                                <div style="max-width:120px;">
                                    <p class="overHidde" type="primary">{{text}}</p>
                                </div>
                            </a-popover>
                        </div>
                        <div slot="belongTypeName" slot-scope="text">
                            {{text?text:'-'}}
                        </div>
                        <div slot="summary" slot-scope="text">
                          <a-popover>
                            <template slot="content">
                              <p style="text-align:center;">{{text}}</p>
                            </template>
                            <div style="max-width:150px;" class="overHidde">
                              {{text?text:'-'}}
                            </div>
                          </a-popover>
                        </div>
                        <div slot="transactionChannelTypeName" slot-scope="text">
                            {{text?text:'-'}}
                        </div>
                        <div slot="transactionTime" slot-scope="text">
                            {{text?$moment(text).format('YYYY.MM.DD HH:mm'):'-'}}
                        </div>
                        <div slot="completedTime" slot-scope="text">
                            {{text?$moment(text).format('YYYY.MM.DD HH:mm'):'-'}}
                        </div>
                    </a-table>
                    <div class="contFoot" v-show="tableData.length>0">
                        <a-pagination size="small" :total="pagination.total" :current="pagination.current" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
                    </div>
                </div>
              <div class="table" v-show="tableDataLoading">
                <skeleton-table-detail></skeleton-table-detail>
              </div>
            </div>
        </content-main>
        <content-main v-show="!allLoading&&walletTab==0">
            <div class="no-permissions-wrap">
                <img src="./../../assets/no-wallet-permission.png">
                <div class="tips">您没有权限查看哦～请联系负责人设置！</div>
            </div>
        </content-main>
      <!-- 有钱包，但是钱包未绑定手机号 -->
      <content-main v-if="!allLoading&&hasWallet&&isBindPhone==0">
        <div class="no-bind-phone">
          <div class="fontStyle0"><icon-font type="icontongzhi"/></div>
          <div class="fontStyle1">此钱包账户还未绑定手机号</div>
          <div class="fontStyle2">绑定手机号后，此钱包账户才可进行提现等操作</div>
          <div style="height:30px;"></div>
          <div class="fontStyle4 cursor" @click="openWalletBindPhone()">立即绑定<icon-font style="margin-left: 5px;" type="iconyumengtubiao_zhishi"/></div>
          <div style="height:21px;"></div>
          <div class="fontStyle5 cursor" v-if="isOwner==1" @click="cancellationDialog=true;">注销账号</div>
        </div>
      </content-main>
      <!-- 企业信息未申请认证 -->
      <content-main v-if="!allLoading&&walletTab==1&&certificationStatus==0&&!hasWallet">
        <div class="no-permissions-wrap">
          <img src="./../../assets/wallet/unAuthentication.png">
          <div class="tips" style="margin-bottom: 0px;">您的企业未认证，无法使用钱包功能</div>
          <div class="tips_next cursor" @click="openAuthentication()">立即认证<icon-font style="margin-left: 5px;" type="iconyumengtubiao_zhishi"/></div>
        </div>
      </content-main>
      <!-- 企业认证信息审核中 -->
      <content-main v-if="!allLoading&&walletTab==1&&certificationStatus==1&&!hasWallet">
        <div class="no-permissions-wrap">
          <img src="./../../assets/wallet/authenticationing.png">
          <div class="tips" style="color: #FFA036;">您提交的认证资料我们已经收到，正在紧急审核中，请耐心等待～</div>
        </div>
      </content-main>
      <!-- 企业认证成功、但是没有钱包 -->
      <content-main v-if="!allLoading&&walletTab==1&&certificationStatus==2&&!hasWallet">
        <div class="no-permissions-wrap">
          <img src="./../../assets/no-wallet-permission.png">
          <div class="tips" style="margin-bottom: 0px;">没有可管理的钱包哟～{{walletTab==1&&!haveResourceKaiTong?'请联系管理员设置':''}}</div>
          <div class="tips_next cursor" v-if="haveResourceKaiTong" @click="openWallet()">立即开通<icon-font style="margin-left: 5px;" type="iconyumengtubiao_zhishi"/></div>
        </div>
      </content-main>
      <!-- 企业信息认证驳回 -->
      <content-main v-if="!allLoading&&walletTab==1&&certificationStatus==3&&!hasWallet">
        <div class="no-permissions-wrap">
          <img src="./../../assets/wallet/unAuthentication.png">
          <div class="tips" style="margin-bottom: 0px;">企业信息认证失败</div>
          <div style="font-size: 16px;color: #777777;">{{failReason}}</div>
          <div class="tips_next cursor" @click="openAuthentication()">重新认证<icon-font style="margin-left: 5px;" type="iconyumengtubiao_zhishi"/></div>
        </div>
      </content-main>
      <!-- 骨架屏 -->
      <div v-if="allLoading" class="deptStyle" style="height: 50px;padding-top: 12px;">
        <div class="bgColorStyle animate-box" style="width: 141px;height: 26px;"></div>
      </div>
      <content-main v-if="allLoading">
          <skeleton-all></skeleton-all>
      </content-main>
        <!-- 账户管理人 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="authorizeListDialog" class="ownModalBorder titDialog" title="账户管理人" @cancel="authorizeListDialog=false;">
            <authorize-list :accountId="accountId" :accountUserType="accountUserType"></authorize-list>
        </a-modal>
        <!-- 注销账户 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="cancellationDialog" class="ownModalBorder titDialog" title="注销钱包账户" @cancel="cancellationDialog=false;">
            <cancellation :accountId="accountId" :accountName="accountName" @cancel="cancellationDialog=false;" @success="cancellationSuccess"></cancellation>
        </a-modal>
        <!-- 银行卡列表 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="bankCardListDialog" class="ownModalBorder titDialog" title="银行卡管理" @cancel="bankCardListDialog=false;">
            <bank-card-list :accountId="accountId" :accountUserType="accountUserType"></bank-card-list>
        </a-modal>
        <!-- 充值 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="rechargePreDialog" class="ownModalBorder titDialog" title="充值余额" @cancel="rechargePreDialog=false;">
            <recharge-pre :accountId="accountId" @cancel="rechargePreDialog=false;" @rechargeSuccess="rechargeSuccess"></recharge-pre>
        </a-modal>
        <!-- 转账 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="transferPreDialog" class="ownModalBorder titDialog" title="转账" @cancel="isRefreshFun">
            <transfer-pre :accountId="accountId" :isOwner="isOwner" :isSetPayPwd="isSetPayPwd" :accountUserType="accountUserType" :ownerPhone="ownerPhone" @refreshinfoFun="refreshinfoFun" @cancel="isRefreshFun" @transferSuccess="isRefreshFun"></transfer-pre>
        </a-modal>
        <!-- 提现 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="withdrawPreDialog" class="ownModalBorder titDialog" title="提现" @cancel="isRefreshFun">
            <withdraw-pre :accountId="accountId" :isOwner="isOwner" :isSetPayPwd="isSetPayPwd" :accountUserType="accountUserType" :ownerPhone="ownerPhone"  @refreshinfoFun="refreshinfoFun" @cancel="isRefreshFun" @withdrawSuccess="isRefreshFun"></withdraw-pre>
        </a-modal>
        <!-- 流水详情 -->
        <a-modal destroyOnClose centered v-model="flowDetailDialog" :footer="null" :maskClosable="false" class="ownModalBorder" title="" :bodyStyle="{padding:'20px'}" :closable="false" @cancel="flowDetailDialog=false" width="1000px">
            <flow-detail :flowDetailId="flowDetailId"  @closeThis="flowDetailDialog=false"></flow-detail>
        </a-modal>
        <!-- 导出框-->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="exportExcelShow" class="ownModalBorder titDialog" title="导出提示">
            <exportExcel @close="exportExcelShow=false" :exportData="exportData" :exportUrl='exportUrl'></exportExcel>
        </a-modal>
        <!-- 添加企业认证 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="521px" v-model="addAuthenticationDialog" class="ownModalBorder titDialog" title="立即认证">
          <add-authentication @cancelAdd="cancelAuthentication()" @addSuccess="initCertificationStatus()"></add-authentication>
        </a-modal>
        <!-- 开通钱包 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" v-model="openWalletShow" class="ownModalBorder titDialog" title="开通平台钱包账户" @cancel="isRefreshFunBefore" width="800px">
          <open-wallet @cancelOpenWallet="cancelOpenWallet" @saveUnBindPhone="successBindPhone" @successBindPhone="successBindPhone" @cancelBindPhone="cancelBindPhone" @refreshinfoFun="refreshinfoFun"></open-wallet>
        </a-modal>
        <!-- 绑定手机号 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" v-model="openConfirmDialog" class="ownModalBorder titDialog" title="绑定手机号" @cancel="openConfirmDialog=false" width="520px">
          <open-wallet-confirm :id="accountId" :phone="ownerPhone" :fromTypeFlag="fromTypeFlag" @successBindPhone="successBindPhone"></open-wallet-confirm>
        </a-modal>
      <!-- 未开通提示页面 -->
      <a-modal destroyOnClose centered v-model="unSignedDiloag" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'56px 0px 48px 0px'}" @cancel="unSignedDiloag=false" width="520px">
        <un-signed-contract-warning :accountId="accountId" @signedSuccess="signedSuccess"></un-signed-contract-warning>
      </a-modal>
      <!-- 提现时间不在8.00-22.00提醒 -->
      <a-modal destroyOnClose centered v-model="withdrawTimeDialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'47px 0px 46px 0px'}" @cancel="withdrawTimeDialog=false" width="520px">
        <with-draw-warning @closeThis="withdrawTimeDialog=false;"></with-draw-warning>
      </a-modal>
      <!-- 变更手机号 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="changePhoneDialog" class="ownModalBorder titDialog" title="变更手机号" @cancel="changePhoneFun">
        <change-phone :accountId="accountId" :phone="ownerPhone" @cancelBind="cancelChange" @goBankAuth="goBankAuth" @successUnBindPhone="successUnBindPhone" @successBindPhone="successChangePhone"></change-phone>
      </a-modal>
      <!-- 原手机号注销 变更手机号(此功能受限于通商云暂时没用)-->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="bankAuthDialog" class="ownModalBorder titDialog" title="变更手机号" @cancel="bankAuthDialog=false;">
        <bank-card-auth :accountId="accountId" @cancel="bankAuthDialog=false;" @successAuth="successChangePhone()"></bank-card-auth>
      </a-modal>
      <!-- 通商云设置密码-->
      <a-modal destroyOnClose centered v-model="htmlPannelDialog" :footer="null" class="ownModalBorder titDialog" :maskClosable="false" :title="setPayPwdTitle" :bodyStyle="{padding:'0px 0px 0px 0px'}" @cancel="getSetPwdCon" width="1250px">
        <html-panel :url="url" @authSuccess="setSuccess"></html-panel>
      </a-modal>
      <!-- 修改钱包名称 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="editAliasDialog" class="ownModalBorder titDialog" title="修改钱包名称" @cancel="editAliasDialog=false">
        <edit-wallet-alias :accountId="accountId" :accountName="accountName" @cancelSave="editAliasDialog=false" @editSuccess="editAliasSuccess"></edit-wallet-alias>
      </a-modal>
    </div>
</template>

<script>
    import Vue from 'vue';
    import G2 from '@antv/g2';
    import { DataSet } from '@antv/data-set';
    import SearchDialog from '@/components/SearchDialog';
    import ExportExcel from '@/components/exportExcel/index';
    import * as API from  '@/api/wallet';
    import Cancellation from './cancellation';
    import AuthorizeList from './authorizeList';
    import BankCardList from './bankCardList';
    import RechargePre from './rechargePre';
    import TransferPre from './transferPre';
    import WithdrawPre from './withdrawPre';
    import FlowDetail from './flowDetail';
    import  AddAuthentication from '../set/company/addAuthentication';
    import OpenWallet from './openWallet';
    import OpenWalletConfirm from './openWalletConfirm';
    import UnSignedContractWarning from './unSignedContractWarning';
    import SkeletonAll from '../skeleton/wallet/all';
    import SkeletonTableDetail from '../skeleton/wallet/tableDetail';
    import WithDrawWarning from './withDrawWarning';
    import ChangePhone from './changePhone';
    import {getCertificationStatus} from '@/api/enterprise';
    import HtmlPanel from '../smartDevices/account/HtmlPanel';
    import EditWalletAlias from './editWalletAlias';
    import BankCardAuth from './bankCardAuth';
    export default {
        name: "index",
        components: {
            SearchDialog,
            Cancellation,
            AuthorizeList,
            BankCardList,
            RechargePre,
            TransferPre,
            WithdrawPre,
            FlowDetail,
            ExportExcel,
            AddAuthentication,
            OpenWallet,
            OpenWalletConfirm,
            UnSignedContractWarning,
            SkeletonAll,
            SkeletonTableDetail,
            WithDrawWarning,
            ChangePhone,
            HtmlPanel,
            EditWalletAlias,
            BankCardAuth,
        },
        data() {
            let currentTime = Vue.prototype.$moment().startOf('day').valueOf();
            let currentMonth = Vue.prototype.$moment().startOf('month').valueOf();
            let beforeOneDay = Vue.prototype.$moment().add(-1, 'days').valueOf();   //昨天
            let nextOneDay = Vue.prototype.$moment().add(1, 'days').valueOf();   //明天
            let oneMonth = Vue.prototype.$moment().endOf('month').valueOf();
            return {
                hasWallet: false,
                showAddNewWalletFlag:false,
                isBindPhone:0,   //是否绑定手机号 1：是；0：否
                walletTab:0,     //0:没有资源权限；1、有资源权限
                ownerPhone:'',   //拥有者手机号
                certificationStatus:0,  //0.未申请；1.待审批；2.已审批通过；3.已驳回
                addAuthenticationDialog:false,
                fromTypeFlag:2,         //绑定手机号来源
                failReason:'',          //认证失败原因
                openWalletShow:false,   //开通钱包显示
                openConfirmDialog:false, //绑定手机号
                waAuthList:[],   //账户集合
                accountId:undefined,    //钱包id
                accountUserType:1,         //默认个人账户 1、个人；2、企业
                isSignedContract:0,   //是否签通商云电子协议（提现）
                accountName:'',  //钱包别名
                operationList:[],
                isOwner:0,
                isSetPayPwd:0,
                setPayPwdTitle:'设置交易密码',
                dayRange:7,       //7、最近7天；30、最近30天
                tfDate:[],        //报表集合
                chart:null,       //报表
                sendData:{
                    fuzzyQueryType:0,
                    fuzzyKeyword:'',
                    amountMax:'',
                    amountMin:'',
                    belongType:'',
                    completedTimeBegin:'',
                    completedTimeEnd:'',
                    current:1,
                    direction:'',
                    feeSubjectIdList:'',
                    payChannel:'',
                    size:10,
                    status:'',
                    transactionTimeBegin:'',
                    transactionTimeEnd:'',
                    accountId:'',
                },
                searchList:[
                    {
                        key: 'fuzzyQueryType',
                        list: [
                            {
                                label: '综合检索',
                                value: 0,
                            },
                            {
                                label: '来源',
                                value: 1
                            },
                            {
                                label: '流水号',
                                value: 2
                            },
                            {
                              label: '摘要',
                              value: 3
                            },
                        ],
                    },
                    {
                        key: 'status',
                        title: '支付状态',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '交易中',
                                value: 1
                            },
                            {
                                label: '交易成功',
                                value: 3
                            },
                            {
                                label: '交易失败',
                                value: 2
                            },
                        ],
                    },
                    {
                        key: 'belongType',
                        title: '类型',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '租客',
                                value: 2
                            },
                            {
                                label: '业主',
                                value: 3
                            },
                            {
                                label: '房源',
                                value: 1
                            },
                            {
                                label: '充值',
                                value: 11
                            },
                            {
                                label: '提现',
                                value: 12
                            },
                            {
                                label: '转账',
                                value: 13
                            },
                            {
                                label: '分账',
                                value: 21
                            },
                            {
                              label: '手续费',
                              value: 31
                            },
                            {
                              label: '扫码付',
                              value: 41
                            },
                            {
                              label: '服务订购',
                              value: 51
                            },
                        ],
                    },
                    {
                        key: 'payChannel',
                        title: '支付方式',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '平台账户',
                                value: 'wallet'
                            },
                            {
                                label: '支付宝',
                                value: 'VSP511'
                            },
                            {
                                label: '微信',
                                value: 'VSP501'
                            },
                        ],
                    },
                    {
                        key: 'direction',
                        title: '交易类型',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '收入',
                                value: 1
                            },
                            {
                                label: '支出',
                                value: 2
                            },
                        ],
                    },
                    {
                        key: ['completedTimeBegin', 'completedTimeEnd'],
                        title: '到账日期',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '不限',
                                value: ['', '']
                            },
                            {
                                label: '昨天',
                                value: [beforeOneDay, currentTime]
                            },
                            {
                                label: '今天',
                                value: [currentTime, nextOneDay]
                            },
                            {
                                label: '本月内',
                                value: [currentMonth, oneMonth]
                            },
                            {
                                label: '自定义',
                                value: ['', '']
                            }
                        ],
                    },
                    {
                        key: ['transactionTimeBegin', 'transactionTimeEnd'],
                        title: '交易日期',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '不限',
                                value: ['', '']
                            },
                            {
                                label: '昨天',
                                value: [beforeOneDay, currentTime]
                            },
                            {
                                label: '今天',
                                value: [currentTime, nextOneDay]
                            },
                            {
                                label: '本月内',
                                value: [currentMonth, oneMonth]
                            },
                            {
                                label: '自定义',
                                value: ['', '']
                            }
                        ],
                    },
                    {
                        key: ['amountMin', 'amountMax'],
                        title: '交易金额',
                        placeholderNames:['最低金额','最高金额'],
                        currentActiveIndex: 0,
                        value_start:'',
                        value_end:'',
                        list: [
                            {
                                label: '自定义',
                                type: 'input',
                                value: ['', '']
                            }
                        ],
                        type:'input',
                    },
                ],
                tableColumns:[
                    {
                        title: '序号',
                        dataIndex: 'num',
                        key: 'num',
                        align: 'center',
                        width: '50px',
                        customCell:() =>{
                            return {
                                on:{
                                    click:()=>{
                                        event.stopPropagation();
                                    }
                                }
                            }
                        },
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
                        align: 'left',
                        scopedSlots: { customRender: 'status' },
                    },
                    {
                        title: '流水号',
                        dataIndex: 'serialNumber',
                        key: 'serialNumber',
                        align: 'left',
                        scopedSlots: { customRender: 'serialNumber' },
                    },
                    {
                        title: '来源',
                        dataIndex: 'source',
                        key: 'source',
                        align: 'left',
                        scopedSlots: { customRender: 'source' },
                    },
                    {
                        title: '类型',
                        dataIndex: 'belongTypeName',
                        key: 'belongTypeName',
                        scopedSlots: { customRender: 'belongTypeName' },
                        align: 'left',
                    },
                    {
                        title: '摘要',
                        dataIndex: 'summary',
                        key: 'summary',
                        align: 'left',
                        scopedSlots: { customRender: 'summary' },
                    },
                    {
                        title: '支付方式',
                        dataIndex: 'transactionChannelTypeName',
                        key: 'transactionChannelTypeName',
                        scopedSlots: { customRender: 'transactionChannelTypeName' },
                        align: 'left',
                    },
                    {
                        title: '交易金额',
                        dataIndex: 'amount',
                        key: 'amount',
                        align: 'left',
                        scopedSlots: { customRender: 'amount' },
                    },
                    {
                        title: '交易时间',
                        dataIndex: 'transactionTime',
                        key: 'transactionTime',
                        align: 'left',
                        scopedSlots: { customRender: 'transactionTime' },
                    },
                    {
                        title: '交易完成时间',
                        dataIndex: 'completedTime',
                        key: 'completedTime',
                        align: 'left',
                        scopedSlots: { customRender: 'completedTime' },
                    },
                    {
                        title: '所属账户',
                        dataIndex: 'walletAlias',
                        key: 'walletAlias',
                        align: 'left',
                        scopedSlots: { customRender: 'walletAlias' },
                    },
                ],
                tableData:[],
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
                amountData:{
                    allAmount:0,
                    freezenAmount:0,
                },
                tfStatData:{
                    expendTotal:0.00,
                    incomeTotal:0.00,
                },
                walletId:'',
                cancellationDialog:false,           //是否注销账户
                authorizeListDialog:false,          //账户管理人
                bankCardListDialog:false,           //银行卡列表
                rechargePreDialog:false,            //充值
                transferPreDialog:false,            //转账
                withdrawPreDialog:false,            //提现
                flowDetailDialog:false,             //流水详情显示
                changePhoneDialog:false,            //变更手机号
                editAliasDialog:false,              //修改钱包名称
                changePhoneFlag:0,                  //0、初始化的值；1、解绑后的值；2、绑定手机号的值
                popoverVisible:false,
                exportData:{},
                exportUrl: '/wallet/tf/list_export',
                exportExcelShow:false,
                isRefresh:false,
                flowDetailId:'',
                unSignedDiloag:false,
                moneyTotalLoading:true,
                tableDataLoading:true,
                allLoading:true,
                withdrawTimeDialog:false,
                haveResourceKaiTong:false,
                haveResourceEditAlias:false,
                htmlPannelDialog:false,
                url:'',
                bankAuthDialog:false,
                tablenodata:{emptyText:()=>(
                        <div>
                           <div style="margin-top:44px;"><img src="https://oss.byteox.com/byteox/2020-08-06/871d57080603453abf83550480cb9e64.png" width="130"/></div>
                           <div style="margin:20px 0 calc(100vh - 690px) 0;color:#BBBBBB;font-size:14px;">还未产生交易明细哦～</div>
                        </div>
                )},
            }
        },
        created() {
            this.initHaveResource();
        },
        mounted() {

        },
        methods: {
          goBankAuth(){
            this.changePhoneDialog = false;
            this.bankAuthDialog = true;
          },
          successBankAuth(){

          },
          getSetPwdCon(){
            this.htmlPannelDialog = false;
            if (this.isSetPayPwd == 0) {
              API.getPayPwdSetStatus({id:this.accountId}).then(res=>{
                if(res.code === '200'){
                  this.isSetPayPwd = res.data;
                }
              });
            }
          },
          setAllinpayPwd(){
            this.popoverVisible = false;
            let parameter = {
              accountId:this.accountId,
              source:1,
            };
            if(this.isSetPayPwd == 1){
              this.setPayPwdTitle = '重置交易密码';
            } else{
              this.setPayPwdTitle = '设置交易密码';
            }
            this.url = '';
            API.setPayPwdApply(parameter).then(res=>{
              if(res.code === '200'){
                  this.url = res.data
                  this.htmlPannelDialog = true;
              }
            });
          },
          goEditAlias(){
            this.editAliasDialog = true;
          },
          changePhone(){
            this.popoverVisible = false;
            this.changePhoneDialog = true;
          },
          //来自自定义搜索
          filterOption(inputValue,option){
            if(!inputValue){
              return true;
            }
            return option.componentOptions.children[0].text.indexOf(inputValue) > -1;
          },
          initHaveResource(){
            let permissions = JSON.parse(sessionStorage.getItem('permissions'));
            let hasWalletResource = false;
            let kaiTongFlag = false;
            let editAliasFlag = false;
            permissions.some(function(value){
              if (value.mark == 'mk_wallet_ck'){
                hasWalletResource = true;
              }
              if (value.mark == 'mk_wallet_ktqb'){
                kaiTongFlag = true;
              }
              if (value.mark == 'mk_wallet_xgqbmc'){
                editAliasFlag = true;
              }
            });
            if(kaiTongFlag){
              this.haveResourceKaiTong = true;
            }
            if(editAliasFlag){
              this.haveResourceEditAlias = true;
            }
            if(hasWalletResource){
              this.walletTab = 1;
              this.getCertificationStatus();
            }
            else {
              this.walletTab = 0;
              this.hasWallet = false;
              this.showAddNewWalletFlag = false;
              this.allLoading = false;
            }
          },
          signedSuccess(){
            this.unSignedDiloag = false;
            this.withdrawPreDialog = true;
            this.isSignedContract = 1;
          },
          openWithdrawPreDialog(){
            const time = new Date();
            const hour = time.getHours();
            if(hour>7&&hour<22){
              if(this.isSignedContract == 1){
                this.withdrawPreDialog = true;
              }
              else{
                let parameter ={
                  source:1,
                  walletAccountId:this.accountId,
                };
                API.signContractApply(parameter).then(res => {
                  if (res.code === '200') {
                    this.isSignedContract = res.data.isSignedContract
                    if(this.isSignedContract == 0){
                      this.unSignedDiloag = true;
                    }
                    else{
                      this.withdrawPreDialog = true;
                    }
                  }
                });
              }
            }
            else{
              this.withdrawTimeDialog = true;
            }
          },
          openWalletBindPhone(){
            this.openConfirmDialog = true;
          },
          openWallet(){
            this.openWalletShow = true;
          },
          openAuthentication(){
            this.addAuthenticationDialog = true;
          },
          cancelAuthentication(){
            this.addAuthenticationDialog = false;
          },
          initCertificationStatus(){
            this.addAuthenticationDialog = false;
            this.certificationStatus = 1;
          },
          isRefreshFunBefore(){
            //来自开通钱包的调用
            if(this.isRefresh){
              this.waListAuth();
            }
          },
          cancelOpenWallet(){
            this.openWalletShow = false;
          },
          cancelBindPhone(){
            this.openWalletShow = false;
            this.waListAuth();
          },
          cancelChange(val){
            this.changePhoneFlag = val;
            if(val==0){
              this.changePhoneDialog = false;
            }
            if(val==1){
              this.changePhoneDialog = false;
              this.waListAuth(this.accountId);
            }
          },
          setSuccess(){
            setTimeout(()=>{
              this.htmlPannelDialog = false;
              //通商云支付密码设置成功后的回调
              this.waListAuth(this.accountId);
            },500)
          },
          successUnBindPhone(){
            this.changePhoneFlag = 1;
            this.waListAuth(this.accountId);
          },
          successChangePhone(){
            this.changePhoneDialog = false;
            this.changePhoneFlag = 2;
            this.waListAuth(this.accountId);
            this.changePhoneFlag = 0;
          },
          editAliasSuccess(val){
            this.accountName = val;
            this.editAliasDialog = false;
            this.waListAuth(this.accountId);
          },
          changePhoneFun(){
            this.changePhoneDialog = false;
          },
          successBindPhone(){
            this.openWalletShow = false;
            this.openConfirmDialog = false;
            this.waListAuth();
          },
            refreshinfoFun(res){  //详情有改变的操作  就改变状态
                if(res){
                    this.isRefresh = res
                }
            },
            rechargeSuccess(){
                this.rechargePreDialog = false;
                setTimeout(()=>{
                    this.initData();
                },500)
            },
            isRefreshFun(){      //根据详情有改变数据的操作 需要刷新
                //flag 是否延迟
                this.transferPreDialog = false;
                this.withdrawPreDialog = false;
                this.changePhoneDialog = false;
                if(this.isRefresh){
                    this.initData();
                    //重置刷新flag
                    this.isRefresh = false;
                }
            },
            exportExcel(){
                this.exportData = Object.assign({}, this.sendData);
                // this.exportData.total = this.pagination.total;
                this.exportExcelShow = true;
            },
            initData(){
                this.waAmountStat();
                this.tfDateStat();
                this.tfStat();
                this.tfList();
            },
            cancellationSuccess(){
                this.cancellationDialog=false;
                //清空数据
                this.accountId = '';     //用于首页显示  全部
                this.accountName = '';
                this.operationList = [];        //用于页面操作权限限制
                this.isOwner = 0;
                this.isSetPayPwd = 0;
                this.sendData.accountId = '';   //用于搜索及其他入口参数
                this.isSignedContract = 0;
                this.waListAuth();
            },
            tfList(){
                this.tableDataLoading = true;
                API.tfList(this.sendData).then(res => {
                    if (res.code === '200') {
                        this.tableDataLoading = false;
                        this.tableData = res.data.records;
                        this.tableData.forEach(function(element, index) {
                            element.num = index + 1;
                        }, this);
                        this.pagination.total = res.data.total;
                    }
                });
            },
            tfStat(){
                API.tfStat(this.sendData).then(res => {
                    if (res.code === '200') {
                        this.tfStatData.expendTotal = res.data.expendTotal/100;
                        this.tfStatData.incomeTotal = res.data.incomeTotal/100;
                    }
                });
            },
            onSizeChange(current){
                this.sendData.current = current;
                this.pagination.current = current;
                this.tfStat();
                this.tfList();
            },
          onShowSizeChange(current, pageSize){
                this.sendData.current = current;
                this.sendData.size = pageSize;
                this.pagination.pageSize = pageSize;
                this.pagination.current = current;
                this.tfStat();
                this.tfList();
            },
            openDetail(record){
                return {
                    on: {
                        click: () => {
                            this.flowDetailId = record.id;
                            this.flowDetailDialog = true;
                        }
                    }
                }
            },
            assetsFormData(data){
                this.searchVisible = false;
                this.sendData.fuzzyQueryType = data.fuzzyQueryType;
                this.sendData.fuzzyKeyword = data.fuzzyKeyword;
                this.sendData.amountMax = data.amountMax? Math.round(data.amountMax*100):'';
                this.sendData.amountMin = data.amountMin? Math.round(data.amountMin*100):'';
                this.sendData.belongType = data.belongType;
                this.sendData.completedTimeBegin = data.completedTimeBegin
                this.sendData.completedTimeEnd = data.completedTimeEnd;
                this.sendData.direction = data.direction
                this.sendData.feeSubjectIdList = data.feeSubjectIdList
                this.sendData.payChannel = data.payChannel;
                this.sendData.status = data.status;
                this.sendData.transactionTimeBegin = data.transactionTimeBegin
                this.sendData.transactionTimeEnd = data.transactionTimeEnd;
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.tfStat();
                this.tfList();
            },
            changeDayRange(val){
                this.dayRange = val;
                this.tfDateStat();
            },
            handleChange(value){
                if(!value){
                    value = '';
                    this.accountId = undefined;
                    this.isSignedContract = 0;
                    this.accountName = '';
                    this.operationList = [];        //用于页面操作权限限制
                    this.isOwner = 0;
                    this.isSetPayPwd = 0;
                    this.isBindPhone = 1;           //可以切换，清空，说明有钱包
                    this.ownerPhone = '';
                    this.accountUserType = 1;
                }
                else{
                    this.accountId = value;
                    this.waAuthList.forEach((item)=>{
                      if(item.id == value){
                        this.accountName  = item.alias;
                        this.operationList = item.operationList;
                        this.isOwner = item.isOwner;
                        this.isSetPayPwd = item.isSetPayPwd;
                        this.isBindPhone = item.isBindPhone;
                        this.ownerPhone = item.ownerPhone;
                        this.isSignedContract = item.isSignedContract;
                        this.accountUserType = item.userType;
                      }
                    });
                }
                this.sendData.accountId = value;
                if(this.isBindPhone==1){
                  this.initData();
                }
            },
          getCertificationStatus(){
            getCertificationStatus().then(res =>{
              if(res.code === '200'){
                this.certificationStatus = res.data.status;
                if(res.data.failReason){
                  this.failReason = res.data.failReason;
                }
                else{
                  this.failReason = "";
                }
                this.hasWallet = false;
                this.showAddNewWalletFlag = false;
                if(this.certificationStatus == 2){
                  this.waListAuth();
                }
                else{
                  this.allLoading = false;
                }
              }
            })
          },
            waListAuth(val){
                if(this.haveResourceKaiTong){
                  this.showAddNewWalletFlag = true;
                }
                API.waListAuth().then(res => {
                    if (res.code === '200') {
                        this.waAuthList = res.data;
                        if(this.waAuthList.length>0){
                            this.hasWallet = true;
                            //如果只有一个钱包只显示一个
                            if(this.waAuthList.length == 1){
                                this.accountId = this.waAuthList[0].id;
                                this.accountName  = this.waAuthList[0].alias;
                                this.operationList = this.waAuthList[0].operationList;
                                this.isOwner = this.waAuthList[0].isOwner;
                                this.isSetPayPwd = this.waAuthList[0].isSetPayPwd;
                                this.sendData.accountId = this.waAuthList[0].id;
                                this.isBindPhone = this.waAuthList[0].isBindPhone;
                                this.ownerPhone = this.waAuthList[0].ownerPhone;
                                this.isSignedContract = this.waAuthList[0].isSignedContract;
                                this.accountUserType = this.waAuthList[0].userType;
                                if(this.isBindPhone == 1){
                                  this.initData();
                                }
                                else{
                                  this.allLoading = false;
                                }
                            }
                            else{
                              if(val){
                                this.waAuthList.forEach((item)=>{
                                  if(item.id == val){
                                    this.isBindPhone = item.isBindPhone;
                                    this.ownerPhone = item.ownerPhone;
                                    this.isSetPayPwd = item.isSetPayPwd;
                                  }
                                });
                              }
                              else{
                                let obj = {
                                  id:'',
                                  alias:'全部'
                                };
                                this.waAuthList.splice(0,0,obj);
                                this.isBindPhone = 1;  //显示绑定手机号
                                this.initData();
                              }
                            }
                        }
                        else{
                            //没有开通钱包账户 相当于没有开通钱包
                            this.hasWallet = false;
                          this.allLoading = false;
                        }
                    }
                });
            },
            waAmountStat(){
                this.moneyTotalLoading = true;
                API.waAmountStat(this.sendData.accountId).then(res => {
                    if (res.code === '200') {
                      this.moneyTotalLoading = false;
                        this.amountData.allAmount = res.data.allAmount/100;
                        this.amountData.freezenAmount = res.data.freezenAmount/100;
                    }
                });
            },
            tfDateStat(){
                let parameter = {
                    accountId:this.sendData.accountId,
                    dayRange:this.dayRange,
                };
                this.tfDate = [];
              this.allLoading = false;
                API.tfDateStat(parameter).then(res => {
                    if (res.code === '200') {
                        this.tfDate = res.data;
                        const data = [];
                        this.tfDate.forEach(val=>{
                            let item = {
                                'month': val.dateStr,
                                '收入': val.incomeTotal/100,
                                '支出': val.expendTotal/100,
                            }
                            data.push(item)
                        });
                        const ds = new DataSet();
                        const dv = ds.createView().source(data);

                        // fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
                        dv.transform({
                            type: 'fold',
                            fields: [ '收入', '支出'], // 展开字段集
                            key: 'date', // key字段
                            value: 'Yaxis' // value字段
                        });
                        let option = {
                            container: 'wallet-c1',
                            forceFit: true,
                            padding: [30,70,30,70],
                            height: 150,
                        }
                        if(!this.chart){
                            this.chart = new G2.Chart(option);
                        }
                        this.renderChart(this.chart,dv,'元')
                    }
                });
            },
            renderChart(chart,data,unit){
                chart.source(data, {
                    date: {
                        range: [ 0, 1 ],
                    },
                });
                chart.tooltip({
                    crosshairs: {
                        type: 'line'
                    },
                    itemTpl: '<li data-index={index}>' +
                        '<p style="display: inline-block;float: left"><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
                        '{name}</p>' + '<span style="display: inline-block; float: right; margin-left: 30px;">{value}' + unit + '</span>' +
                        '</li>'
                });
                chart
                    .line()
                    .position('month*Yaxis')
                    .color('date',['#59A8EB','#E67F65'])
                    .shape('smooth');
                chart
                    .point()
                    .position('month*Yaxis')
                    .color('date',['#59A8EB','#E67F65'])
                    .size(4)
                    .shape('circle')
                    .style({
                        stroke: '#fff',
                        lineWidth: 1
                    });
                chart.legend(true, {
                    position: 'top-right',
                });
                chart.render();
            }
        },
    }
</script>

<style scoped lang="less">
  .showAllStyle{
    min-width: 1200px;
    & /deep/ .content-main{
      padding: 14px;
      .content{
        min-height: calc(100vh - 140px);
        padding: 0px;
        background-color: #f0f2f5;
      }
    }
  }
  .notShowAllStyle{
    min-width: 1200px;
    & /deep/ .content-main{
      height: calc(100vh - 50px);
      padding: 14px;
      .content{
        min-height: calc(100vh - 50px);
        padding: 0px;
        background-color: #f0f2f5;
      }
    }
  }
    #wallet{
      min-width: 1200px;
        height: calc(100vh - 50px);

        .deptStyle{
            height: 50px;
            line-height: 50px;
            background: #FFFFFF;
            padding: 0 20px;
            font-size: 14px;
            color: #777777;
            border-bottom: 1px solid #f0f2f5;
            /deep/ .ant-select-selection-selected-value{
                color: #111111;
                font-weight:500;
            }
            svg{
                width: 20px;
                height: 20px;
            }
            .aliasStyle{
                /deep/ .ant-select-selection__placeholder{
                    color: #111111;
                }
            }
        }
        .staticStyle{
            margin-bottom: 14px;
            height: 180px;
            .staticStyleLeft{
                width: 260px;
                height: 180px;
                margin-right: 14px;
                background: #FFFFFF;
                color: #333333;
                padding-left: 20px;
                border-radius:4px;
                .staticStyleLeft1{
                  .fontTitle{
                    margin-top: 18.5px;
                  }
                  .operateStyle{
                    margin: 20px 19px 0 0;
                    svg{
                      width: 20px;
                      height: 20px;
                      color: #666666;
                    }
                    & /deep/ .ant-popover {
                      .ant-popover-inner-content {
                        text-align: left;
                        padding: 5px 0;
                        width: 110px;
                        .action {
                          padding: 8px 12px;
                        }
                        .action:hover {
                          cursor: pointer;
                          background: rgba(10, 135, 248, 0.1);
                        }
                      }
                    }
                  }
                }

                .size16{
                    font-size: 16px;
                    color: #333333;
                }
                .size20{
                    font-size: 20px;
                    color: #333333;
                }
                .size24{
                    font-size: 24px;
                    color: #333333;
                    font-weight: 600;
                }
                .frozenStyle{
                    width:170px;
                    height:26px;
                    line-height: 28px;
                    padding-left: 10px;
                    border-radius:13px;
                    margin-top: 3.5px;
                    color: #777777;
                    /deep/ .ant-tooltip-inner{
                      padding: 6px 13px;
                    }
                }
                .dealStyle{
                    margin-top: 16px;
                  padding-right: 9px;
                  display: flex;
                    div{
                      flex: 1;
                        margin-right: 11px;
                        width: 66px;
                        height: 28px;
                        line-height: 29px;
                        text-align: center;
                        background:rgba(10,135,248,0.8);
                        border-radius:4px;
                        color: #FFFFFF;
                    }
                }
            }
            .staticStyleRight{
                width: calc(100% - 274px);
                height: 180px;
                background: #FFFFFF;
                border-radius:4px;
                .top{
                    margin-left: 5px;
                    height: 30px;
                    line-height: 30px;
                    .topItem{
                        width: 96px;
                        text-align: center;
                        font-size: 13px;
                    }
                    .selectedStyle{
                        background:#F1F8FF;
                        border-radius:0px 0px 4px 4px;
                        color: #333333;
                    }
                    .unSelectStyle{
                        color: #777777;
                    }
                }
                .chart-wrap{
                    text-align: center;
                    position: relative;
                    height: 150px;
                }
            }
        }
        .tableStyle{
            min-height: calc(100vh - 322px);
            height: auto;
            background: #FFFFFF;
            border-radius:4px;
            padding: 0 14px 20px 14px;
            width: 100%;
            & /deep/ .exportExcel-box{
                width:24px;
                height: 24px;
                margin-left:6px;
                margin-top: 16px;
                & /deep/  svg{
                    width:24px;
                    height: 24px;
                }
            }
            .tableTopStyle{
                height: 56px;
                line-height: 56px;
                display:table-cell; /*按照单元格的样式显示元素*/
                vertical-align:bottom; /*底对齐*/
                .tableTopStyle1{
                    color: #333333;
                    font-size: 16px;
                    font-weight: 500;
                    margin-right: 20px;
                }
                .tableTopStyle2{
                    color: #777777;
                    font-size: 14px;
                    .tableTopStyle2Font1{
                        color: #0A87F8;
                    }
                    .tableTopStyle2Font2{
                        color: #FB4246;
                    }
                }
                .spiltStyle{
                    width: 15px;
                    margin-left: 15px;
                    border-left: 1px dashed #EEEEEE;
                    height: 14px;
                    margin-top: 21px;
                }
            }
            .tableSearchStyle{
                height: 56px;
                line-height: 56px;
            }
        }
        .table {
            min-width: 1200px;
            .action:hover {
                background-color: @themeBgColor;
                color: @themeColor;
            }
            .IconRadius {
                margin-top: 8px;
                margin-right: 5px;
                width: 6px;
                height: 6px;
                border-radius: 4px;
            }
            .fontNormal {
                .normalBg {
                    background: rgba(255, 160, 54, 1);
                }
            }
            .fontProhibit {
                .prohibitBg2 {
                    background: rgba(10, 135, 248, 1);
                }
                .prohibitBg3 {
                    background: #03C683;
                }
                .prohibitBg4 {
                    background: #9F6EEC;
                }
                .prohibitBg5 {
                    background: #FB4246;
                }
                .prohibitBg6 {
                    background: rgba(119, 119, 119, 1);
                }
            } // .fontNormalColor {
            //     color: #3DB302;
            // }
            .statusRadius{
                width:20px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border-radius: 50%;
                i{
                    vertical-align: -0.1em
                }
            }
            .status1{
                color: #FFA036;
                border: 1px solid #FFA036;
            }
            .status9{
                color: #0A87F8;
                border: 1px solid #0A87F8;
            }
            .status5{
                color: #FB4246;
                border: 1px solid #FB4246;
            }
            .status6{
                color: #777777;
                border: 1px solid #777777;
            }
            .fontProhibitColor {
                color: #111111;
            }
            .nameColumn {
                width: 100%;
                .name {
                    float: left;
                }
                .leaderFlag {
                    color: #777777;
                    border: 1px solid #777777;
                    border-radius: 10px;
                    width: 36px;
                    float: left;
                    margin-left: 4px;
                    .leaderLength {
                        width: 27px;
                        margin-left: 5px;
                        font-size: 12px;
                    }
                }
            }
        }
        .contFoot {
            margin-top: 30px;
            width: 100%;
            height: 24px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-right: 20px; // position: absolute;
            // bottom: 0px;
            // right: 0;
            background-color: #fff;
            & /deep/ .ant-pagination {
                margin-right: 11px;
            }
        }
        & /deep/.ant-table-tbody>tr>td {
            padding: 12px 6px;
            &:not(:first-child) {
                cursor: pointer;
            }
        }
        & /deep/.ant-table-thead > tr > th{
            padding: 12px 6px;
        }
        /deep/ .search-dialog .search-input-wrap .search-list{
            top: 17px;
        }
    }
    .no-permissions-wrap{
        padding-top: 80px;
        height: calc(100vh - 80px);
        text-align: center;
        background-color: #ffffff;
        overflow: hidden;
        .title{
            font-size: 24px!important;
            color: #111111;
        }
        .bg-title{
            margin-top: -30px;
            height:56px;
            font-size:40px;
            font-family:Arial-Black,Arial;
            font-weight:900;
            color:rgba(17,17,17,.05);
            line-height:56px;
        }
        .tips{
            margin: 20px auto 80px auto;
            color: #777777;
            font-size: 16px;
        }
        .tips_next{
          font-size: 16px;
          color: #0A87F8;
          margin-top: 21px;
        }
        img{
            width: 489px;
            height: 201px;
        }
    }
    .no-bind-phone{
      padding-top: 140px;
      text-align: center;
      height: calc(100vh - 128px);
      background-color: #ffffff;
      overflow: hidden;
      .fontStyle0{
        svg {
          width: 66px;
          height: 66px;
          color: #FFA036;
        }
      }
      .fontStyle1{
         color: #111111;
         font-size: 16px;
        margin-top: 19px;
      }
      .fontStyle2{
        color: #777777;
        font-size: 14px;
        margin-top: 13px;
      }
      .fontStyle3{
        color: #0A87F8;
        font-size: 16px;
        margin-top: 23px;
      }
      .fontStyle4{
        margin: 0 auto;
        width: 230px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: #0A87F8;
        border-radius: 4px;
        color: #FFFFFF;
        font-size: 16px;
      }
      .fontStyle5{
        margin: 0 auto;
        width: 230px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        border-radius: 4px;
        border: 1px solid #0A87F8;
        color: #0A87F8;
        font-size: 16px;
      }
    }
    .loading-center-absolute{
      height: 50px;
      .object {
        width: 6px;
        height: 50px;
        margin-right: 4px;
        background-color: #EEEEEE;
        animation: animate 1s infinite;
        float: left;
        display: block;
      }
      .object:nth-child(10){
        -webkit-animation-delay: 0.9s;
        animation-delay: 0.9s;
      }
      .object:nth-child(9){
        -webkit-animation-delay: 0.8s;
        animation-delay: 0.8s;
      }
      .object:nth-child(8){
        -webkit-animation-delay: 0.7s;
        animation-delay: 0.7s;
      }
      .object:nth-child(7){
        -webkit-animation-delay: 0.6s;
        animation-delay: 0.6s;
      }
      .object:nth-child(6){
        -webkit-animation-delay: 0.5s;
        animation-delay: 0.5s;
      }
      .object:nth-child(5){
        -webkit-animation-delay: 0.4s;
        animation-delay: 0.4s;
      }
      .object:nth-child(4){
        -webkit-animation-delay: 0.3s;
        animation-delay: 0.3s;
      }
      .object:nth-child(3){
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
      }
      .object:nth-child(2){
        -webkit-animation-delay: 0.1s;
        animation-delay: 0.1s;
      }
      @-webkit-keyframes animate {
        50% {
          -ms-transform: scaleY(0);
          -webkit-transform: scaleY(0);
          transform: scaleY(0);
        }
      }
      @keyframes animate {
        50% {
          -ms-transform: scaleY(0);
          -webkit-transform: scaleY(0);
          transform: scaleY(0);
        }
      }
    }
  .bgColorStyle{
    background:rgba(244,245,247,1);
  }
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
</style>