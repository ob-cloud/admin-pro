<template>
    <div class="addTransfer-box">
        <div class="title" style="margin: 4px 0 6px 0">门店</div>
        <div class="deptTree" style="width: 100%;">
          <label-item title="" class="u-bottom-border">
            <a-select style="width: 100%;height: 34px;" :showSearch="true" :filterOption="(inputValue,option)=>filterOption(inputValue,option)" placeholder="请选择配置收款账号的门店" @change="selectDept">
              <a-select-option v-for="(item) in storeDeptList" :key="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </label-item>
        </div>
        <div class="title" style="margin: 24px 0 15px 0">收款账号配置</div>
        <div class="detail">
            <div class="top clearfix">
                <div @click="changeTabIndex(1)" class="tabItem leftBorderRadius cursor f-fl" :class="tabIndex==1?'color_tab':'color_not_tab'">线下转账</div>
                <div @click="changeTabIndex(2)" class="tabItem rightBorderRadius cursor f-fl" :class="tabIndex==2?'color_tab':'color_not_tab'">线上支付</div>
            </div>
            <div class="detail_content height_tab1" v-if="tabIndex==1">
                <div class="clearfix" style="width: 100%">
                    <div class="titleIcon f-fl" style="margin-top: 20px;margin-left: 2px"></div>
                    <div class="title f-fl" style="margin-top: 17px;margin-left: 6px">支付宝</div>
                </div>
                <div class="clearfix" style="width: 100%;margin-top: 7px;">
                    <label-item title="账号" class="u-bottom-border f-fl" style="width:50%;padding: 0 10px">
                        <a-input placeholder="请输入支付宝账号" maxLength="20" v-model="alipay.account"></a-input>
                    </label-item>
                    <label-item title="真实姓名" class="u-bottom-border f-fl" style="width:50%;padding: 0 10px">
                        <a-input placeholder="请输入真实姓名" maxLength="10" v-model="alipay.name"></a-input>
                    </label-item>
                </div>
                <div class="clearfix" style="width: 100%;margin-top: 20px;">
                    <div class="u-bottom-border f-fl" style="width:50%;padding: 0 10px">
                        <div style="width: 100%"><a-checkbox v-model="alipay.advancedModeFlag"><span style="font-size: 12px;">收款时，自动生成账单金额</span></a-checkbox></div>
                        <div style="width: 100%;margin-top:18px;padding-left: 23px;" v-if="alipay.advancedModeFlag"><span style="color:#777777;font-size: 12px">PID</span><span class="cursor" @click="addTransferHelpShow=true" style="color:#0A87F8;font-size: 12px;margin-left: 10px;">查看获取流程</span></div>
                        <div style="width: 100%;padding-left: 23px;" v-if="alipay.advancedModeFlag"><a-input v-model="alipay.pid" maxLength="20" placeholder="请填写支付宝账号PID信息"></a-input></div>
                    </div>
                    <div class="u-bottom-border f-fl clearfix" style="width:50%;padding: 0 10px">
                        <div class="f-fl" style="color: #333333;font-size: 12px;">请上传收款二维码：</div>
                        <own-upload class="f-fl" v-show="!alipay.advancedModeFlag" :addRealDelete="false" :picList="item2_1" :uploadParms="sendData2_1" :maxLength="1" :showTips="false" ref="img2_1">
                            <div style="padding-top: 15px;">
                                <a-icon style="color: #BBBBBB" type="plus"/>
                                <div class="ant-upload-text">上传</div>
                                <div class="ant-upload-text">收款二维码</div>
                            </div>
                        </own-upload>
                        <div v-show="alipay.advancedModeFlag" class="autoStyle f-fl">
                            <div style="padding-top: 24px;">
                                <div class="ant-upload-text">系统自动为</div>
                                <div class="ant-upload-text">您生成收款二</div>
                                <div class="ant-upload-text">维码</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="margin-top: 7px;width:100%;height:6px;background:rgba(247,248,251,1);"></div>
                <div class="clearfix" style="width: 100%">
                    <div class="titleIcon f-fl" style="margin-top: 20px;margin-left: 2px"></div>
                    <div class="title f-fl" style="margin-top: 17px;margin-left: 6px">微信</div>
                </div>
                <div class="clearfix" style="width: 100%;margin-top: 7px;">
                    <label-item title="账号" class="u-bottom-border f-fl" style="width:50%;padding: 0 10px">
                        <a-input placeholder="请输入微信账号" maxLength="20" v-model="wxpay.account"></a-input>
                    </label-item>
                    <label-item title="真实姓名" class="u-bottom-border f-fl" style="width:50%;padding: 0 10px">
                        <a-input placeholder="请输入真实姓名" v-model="wxpay.name" maxLength="10"></a-input>
                    </label-item>
                </div>
                <div class="clearfix" style="width: 100%;margin-top: 20px;">
                    <div class="u-bottom-border f-fl" style="width:50%;padding: 0 10px">
                        <div style="width: 100%"><a-checkbox :disabled="true"><span style="font-size: 12px;">收款时，自动生成账单金额</span></a-checkbox></div>
                        <div style="width: 100%;padding-left: 20px;"><span style="font-size: 12px;color: #FFA036;">（暂不支持）</span></div>
                    </div>
                    <div class="u-bottom-border f-fl clearfix" style="width:50%;padding: 0 10px">
                        <div class="f-fl" style="color: #333333;font-size: 12px;">请上传收款二维码：</div>
                        <own-upload class="f-fl" :addRealDelete="false" :uploadParms="sendData2_2" :picList="item2_2" :maxLength="1" :showTips="false" ref="img2_2">
                            <div style="padding-top: 15px;">
                                <a-icon style="color: #BBBBBB" type="plus"/>
                                <div class="ant-upload-text">上传</div>
                                <div class="ant-upload-text">收款二维码</div>
                            </div>
                        </own-upload>
                    </div>
                </div>
                <div style="margin-top: 7px;width:100%;height:6px;background:rgba(247,248,251,1);"></div>
                <div class="clearfix" style="width: 100%">
                    <div class="titleIcon f-fl" style="margin-top: 20px;margin-left: 2px"></div>
                    <div class="title f-fl" style="margin-top: 17px;margin-left: 6px">银行卡</div>
                </div>
                <div class="clearfix" style="width: 100%;margin-top: 7px;">
                    <label-item title="卡号" class="u-bottom-border f-fl" style="width:50%;padding: 0 10px">
                        <a-input placeholder="请输入银行卡号" maxLength="20" v-model="unionpay.cardNo"></a-input>
                    </label-item>
                    <label-item title="开户名" class="u-bottom-border f-fl" style="width:50%;padding: 0 10px">
                        <a-input placeholder="请输入开户名" maxLength="20" v-model="unionpay.accountName"></a-input>
                    </label-item>
                </div>
                <div class="clearfix" style="width: 100%;margin-top: 20px;">
                    <label-item title="开户银行" class="u-bottom-border f-fl" style="width:50%;padding: 0 10px">
                        <a-input placeholder="请输入开户银行" maxLength="20" v-model="unionpay.bank"></a-input>
                    </label-item>
                    <label-item title="开户支行" class="u-bottom-border f-fl" style="width:50%;padding: 0 10px">
                        <a-input placeholder="请输入开户支行" v-model="unionpay.subBranch"></a-input>
                    </label-item>
                </div>
            </div>
            <div class="detail_content height_tab2" v-if="tabIndex==2">
                <div class="clearfix" style="width: 100%">
                    <div class="titleIcon f-fl" style="margin-top: 23px;margin-left: 2px"></div>
                    <div class="title f-fl" style="margin-top: 20px;margin-left: 6px">平台钱包</div>
                </div>
              <div class="certificationStatusStyle" v-if="certificationStatus==0">
                <img src="../../../../assets/wallet/unAuthentication.png" />
                <div style="margin-top: 15px;" class="fontSize12 color1">对不起，您的企业未认证，无法使用钱包功能</div>
                <div @click="openAuthentication()" style="margin: 13px 0 50px 0;" class="fontSize14 color2 cursor">立即认证<icon-font style="margin-left: 9px;" type="iconyumengtubiao_zhishi"/></div>
              </div>
              <div class="certificationStatusStyle" v-if="certificationStatus==1">
                <img src="../../../../assets/wallet/authenticationing.png" />
                <div style="margin-top: 13px;" class="fontSize14 color3">您提交的认证资料我们已经收到</div>
                <div style="margin: 1px 0 50px 0;" class="fontSize12 color3">正在紧急审核中，请耐心等待～</div>
              </div>
              <div v-if="certificationStatus==2">
                <div class="clearfix" style="width: 100%;margin-top: 7px;">
                  <label-item title="绑定平台钱包账户" class="u-bottom-border walletStyle f-fl" style="width:50%;padding: 0 10px" :mustFill="true">
                    <a-select style="width: 220px" placeholder="请选择" v-model="onlinePay.walletAccountId" :showSearch="true" :filterOption="(inputValue,option)=>filterOptionWallet(inputValue,option)">
                      <div slot="dropdownRender" slot-scope="menu">
                        <v-nodes :vnodes="menu" />
                        <a-divider v-mark="['mk_wallet_ktqb']" style="margin: 4px 0;" />
                        <div v-mark="['mk_wallet_ktqb']"
                            style="padding: 4px 8px 8px 8px;color: #0A87F8; cursor: pointer;"
                            @mousedown="e => e.preventDefault()"
                            @click="goToAdd"
                        >
                          开通新钱包账号<icon-font type="iconyumengtubiao_zhishi"/>
                        </div>
                      </div>
                      <a-select-option v-for="item in waSimpleList" :key="item.id" :value="item.id">
                        {{ item.alias }}
                      </a-select-option>
                    </a-select>
                  </label-item>
                  <label-item title="账单确认人" class="u-bottom-border f-fl confirmEmployeeStyle" style="width:50%;padding: 0 10px;position: relative" :mustFill="true">
                    <dept-employee-tree style="width: 220px;" :bottomBorder="false" placeholder="请选择" :defaultValue="onlinePay.billAffirmEmpName" @selectChange="selectDeptEmp" ref="selectDeptEmp" placement="bottomLeft" :disableDept="true"></dept-employee-tree>
                    <div class="toolTip">
                      <a-tooltip placement="top" title="线上支付所产生流水的负责人">
                        <icon-font style="font-size: 12px;color: #FFA036;" type="iconyumengtubiao_bangzhu" />
                      </a-tooltip>
                    </div>
                  </label-item>
                </div>
                <div class="clearfix" style="width: 100%;margin-top: 20px;">
                  <label-item title="支付手续费" class="u-bottom-border" style="width:50%;padding: 0 10px" :mustFill="true">
                    <span class="f-fl" style="height: 32px;line-height: 32px;">租客承担</span>
                    <a-input style="width: 120px;text-align: center;" class="f-fl" placeholder="请输入" v-validate="'naturalNum|min(0)|max(100)'" v-model="onlinePay.renterBearHandlingFeePercent"></a-input>
                    <span class="f-fl" style="height: 32px;line-height: 32px;">%</span>
                  </label-item>
                </div>
                <div class="clearfix" style="width: 100%;margin-top: 20px;padding: 0 10px;">
                  <div style="width: 100%;padding: 10px;background: #FFF7EE;color: #FFA036;font-size: 12px;">
                    设置独立钱包账户后，此门店将拥有独立的账户余额，也可绑定独立的银行卡 进行充值提现。所有此门店的流水、财务、余额将独立负责，不进入总店账户。 交易密码也需要独立设置使用
                  </div>
                </div>
              </div>
              <div class="certificationStatusStyle" v-if="certificationStatus==3">
                <img src="../../../../assets/wallet/unAuthentication.png" />
                <div style="margin-top: 15px;" class="fontSize12 color1">企业信息认证失败</div>
                <div style="margin-top: 1px;" class="fontSize12 color1">{{failReason?failReason:'-'}}</div>
                <div @click="openAuthentication()" style="margin: 13px 0 50px 0;" class="fontSize14 color2 cursor">重新认证<icon-font style="margin-left: 9px;" type="iconyumengtubiao_zhishi"/></div>
              </div>
            </div>
        </div>
        <div class="clearfix" style="width: 100%;margin-top:28px;" v-if="showFlag">
            <div class="buttonDiv f-fr">
                <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
                    取消
                </a-button>
                <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="saveTransfer">
                    保存
                </a-button>
            </div>
        </div>
        <!-- PID获取文档 -->
        <a-modal centered v-model="addTransferHelpShow" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'24px 0 24px 24px'}" @cancel="addTransferHelpShow=false" width="800px">
            <add-transfer-help @closeThis="addTransferHelpShow=false"></add-transfer-help>
        </a-modal>
        <!-- 开通钱包 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" v-model="openWalletShow" class="ownModalBorder titDialog" title="开通平台钱包账户" @cancel="isRefreshFun" width="800px">
            <open-wallet @cancelOpenWallet="cancelOpenWallet" @saveUnBindPhone="successBindPhone" @successBindPhone="successBindPhone" @cancelBindPhone="cancelBindPhone"  @refreshinfoFun="refreshinfoFun"></open-wallet>
        </a-modal>
      <!-- 添加企业认证 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="521px" v-model="addAuthenticationDialog" class="ownModalBorder titDialog" title="立即认证">
        <add-authentication @cancelAdd="cancelAuthentication()" @addSuccess="initCertificationStatus()"></add-authentication>
      </a-modal>
    </div>
</template>

<script>
    import DeptEmployeeTree from '@/components/DeptEmployeeTree';
    import  AddTransferHelp from './addTransferHelp';
    import OpenWallet from '../../../wallet/openWallet';
    import  AddAuthentication from '../../company/addAuthentication';
    import * as API from '@/api/setConfig';
    import {listStoreDept} from '@/api/decision';
    import {waListSimple} from '@/api/wallet';
    import {getCertificationStatus} from '@/api/enterprise';

    export default {
        name: "addTransfer",
        components: {
            DeptEmployeeTree,
            AddTransferHelp,
            OpenWallet,
            AddAuthentication,
            VNodes: {
                functional: true,
                render: (h, ctx) => ctx.props.vnodes,
            },
        },
        data() {
            return {
                tabIndex:1,         //1、线下转账；2、线上支付
                sendData2_1: {},
                sendData2_2: {},
                item2_1: [],
                item2_2: [],
                alipay:{
                    account:'',
                    advancedMode:'',
                    advancedModeFlag:false,
                    name:'',
                    pid:'',
                    qrCodeUrl:'',
                },
                unionpay:{
                    accountName:'',
                    bank:'',
                    cardNo:'',
                    subBranch:'',
                },
                wxpay:{
                    account:'',
                    name:'',
                    qrCodeUrl:'',
                },
                onlinePay:{
                    billAffirmEmpId:'',
                    billAffirmEmpName:'',
                    renterBearHandlingFeePercent:100,
                    walletAccountAlias:'',
                    walletAccountId:undefined,
                },
                saveLoading:false,
                deptId:'',
                addTransferHelpShow:false,
                id:'',
                waSimpleList:[],
                openWalletShow:false,
                isRefresh:false,
                certificationStatus:0,    //0.未申请；1.待审批；2.已审批通过；3.已驳回
                failReason:'',            //驳回原因
                addAuthenticationDialog:false,
                showFlag:true,
              storeDeptList:[],
            }
        },
        mounted(){
            this.sendData2_1 = { //
                // 上传时附带的额外参数
                bizId: '', // 房源id
                bizType: 20, // 图片大类标识 租客
                subBizType: 3, // 图片子类标识 身份证正面
                orderIndex: 1 // 排序值
            }
            this.sendData2_2 = {
                // 上传时附带的额外参数
                bizId: '', // 房源id
                bizType: 20, // 图片大类标识  租客
                subBizType: 4, // 图片子类标识 身份证反面
                orderIndex: 2 // 排序值
            }
        },
        created() {
          this.listStoreDept();
            this.waListSimple();
            this.getCertificationStatus();
        },
        methods: {
          //来自钱包自定义搜索
          filterOptionWallet(inputValue,option){
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
          listStoreDept(){
            listStoreDept().then(res => {
              if (res.code === '200') {
                this.storeDeptList = res.data;
              }
            });
          },
          changeTabIndex(val){
            this.tabIndex = val;
            if(val==1){
              this.showFlag = true;
            }
            else{
              if(this.certificationStatus==0||this.certificationStatus==1||this.certificationStatus==3) {
                this.showFlag = false;
              }
              else if(this.certificationStatus==2) {
                this.showFlag = true;
              }
            }
          },
          cancelAuthentication(){
            this.addAuthenticationDialog = false;
          },
          initCertificationStatus(){
            this.addAuthenticationDialog = false;
            this.certificationStatus = 1;
          },
          openAuthentication(){
            this.addAuthenticationDialog = true;
          },
          cancelBindPhone(){
            this.openWalletShow=false;
            this.isRefresh = false;
            this.waListSimple();
          },
            successBindPhone(){
                this.openWalletShow=false;
                this.isRefresh = false;
                this.waListSimple();
            },
            refreshinfoFun(res){  //若添加钱包账号了，刷新钱包列表
                if(res){
                    this.isRefresh = res
                }
            },
            isRefreshFun(){      //若添加钱包账号了，刷新钱包列表
                if(this.isRefresh){
                    this.waListSimple();
                }
                this.openWalletShow=false;
                this.isRefresh = false;
            },
            cancelOpenWallet(){
                this.openWalletShow = false;
            },
            goToAdd(){
                this.openWalletShow = true;
            },
            waListSimple(){
                waListSimple().then(res =>{
                    if(res.code === '200'){
                        this.waSimpleList = res.data;
                    }
                })
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
                }
              })
            },
            selectDeptEmp(selectObj){
                if (selectObj.type == 'employee') {
                    this.onlinePay.billAffirmEmpId = selectObj.id;
                    this.onlinePay.billAffirmEmpName = selectObj.name;
                }
            },
            //选择负责人
            selectDept(selectObj) {
                this.deptId = selectObj;
                //防止后台接口报错
                if(!this.deptId){
                    return;
                }
                API.collectionAccountViewByDept(this.deptId).then(res => {
                    if (res.code === '200') {
                        let copyTransfer = res.data;
                        if(copyTransfer){
                            this.id = copyTransfer.id;
                            if(copyTransfer.alipay){
                                this.alipay = copyTransfer.alipay;
                                if(copyTransfer.alipay.advancedMode&&copyTransfer.alipay.advancedMode==1){
                                    this.alipay.advancedModeFlag = true;
                                }
                                else{
                                    this.alipay.advancedModeFlag = false;
                                }
                                this.item2_1 = [];
                                if(this.$refs.img2_1)
                                {
                                    this.$refs.img2_1.picsList = [];
                                }
                                if(copyTransfer.alipay.qrCodeUrl){
                                    let pic={
                                        bizId:'1',
                                        bizType:9,
                                        id:'1',
                                        origin:copyTransfer.alipay.qrCodeUrl,
                                      middle:copyTransfer.alipay.qrCodeUrl,
                                        status:'done',
                                    };
                                    this.item2_1.push(pic);
                                }
                            }
                            else{
                                this.item2_1 = [];
                                if(this.$refs.img2_1)
                                {
                                    this.$refs.img2_1.picsList = [];
                                }
                                this.alipay = {
                                    account:'',
                                    advancedMode:'',
                                    advancedModeFlag:false,
                                    name:'',
                                    pid:'',
                                    qrCodeUrl:'',
                                };
                            }
                            if(copyTransfer.wxpay){
                                this.wxpay = copyTransfer.wxpay;
                                this.item2_2 = [];
                                if(this.$refs.img2_2)
                                {
                                    this.$refs.img2_2.picsList = [];
                                }
                                if(copyTransfer.wxpay.qrCodeUrl){
                                    let pic={
                                        bizId:'1',
                                        bizType:9,
                                        id:'1',
                                        origin:copyTransfer.wxpay.qrCodeUrl,
                                      middle:copyTransfer.wxpay.qrCodeUrl,
                                        status:'done',
                                    };
                                    this.item2_2.push(pic);
                                }
                            }
                            else{
                                this.wxpay = {
                                    account:'',
                                    name:'',
                                    qrCodeUrl:'',
                                };
                                this.item2_2 = [];
                                if(this.$refs.img2_2)
                                {
                                    this.$refs.img2_2.picsList = [];
                                }
                            }
                            if(copyTransfer.unionpay){
                                this.unionpay = copyTransfer.unionpay;
                            }
                            else{
                                this.unionpay = {
                                    accountName:'',
                                    bank:'',
                                    cardNo:'',
                                    subBranch:'',
                                };
                            }
                            if(copyTransfer.onlinePay){
                              this.onlinePay = copyTransfer.onlinePay;
                            }
                            else{
                              this.onlinePay = {
                                billAffirmEmpId:'',
                                billAffirmEmpName:'',
                                renterBearHandlingFeePercent:100,
                                walletAccountAlias:'',
                                walletAccountId:undefined,
                              };
                            }
                        }
                        else{
                            this.item2_1 = [];
                            if(this.$refs.img2_1)
                            {
                                this.$refs.img2_1.picsList = [];
                            }
                            this.item2_2 = [];
                            if(this.$refs.img2_2)
                            {
                                this.$refs.img2_2.picsList = [];
                            }
                            this.id = '';
                            this.alipay = {
                                account:'',
                                advancedMode:'',
                                advancedModeFlag:false,
                                name:'',
                                pid:'',
                                qrCodeUrl:'',
                            };
                            this.wxpay = {
                                account:'',
                                name:'',
                                qrCodeUrl:'',
                            };
                            this.unionpay = {
                                accountName:'',
                                bank:'',
                                cardNo:'',
                                subBranch:'',
                            };
                        }
                    }
                })
            },
            cancelSave(){
                this.$emit('cancelSave');
            },
            saveTransfer(){
                if (this.$refs.img2_1&&this.$refs.img2_1.picsList.length != 0) {
                    this.alipay.qrCodeUrl = this.$refs.img2_1.picsList[0].origin;
                }
                if (this.$refs.img2_2&&this.$refs.img2_2.picsList.length != 0) {
                    this.wxpay.qrCodeUrl = this.$refs.img2_2.picsList[0].origin;
                }
                //检验配置部门
                if(!this.deptId){
                    this.$message.warning('请选择需要配置账号的部门');
                    return;
                }
                //检验配置账号
                //检查支付宝配置完整性
                if(this.alipay.advancedModeFlag){
                    this.alipay.advancedMode = 1;
                    if(!this.alipay.account||!this.alipay.name||!this.alipay.pid){
                        this.$message.warning('请完善配置的支付宝收款账号信息');
                        return;
                    }
                }else{
                    this.alipay.advancedMode = 0;
                    if(this.alipay.account||this.alipay.name||this.alipay.qrCodeUrl){
                        if(!this.alipay.account||!this.alipay.name||!this.alipay.qrCodeUrl){
                            this.$message.warning('请完善配置的支付宝收款账号信息');
                            return;
                        }
                    }
                }
                //检查微信配置完整性
                if(this.wxpay.account||this.wxpay.name||this.wxpay.qrCodeUrl){
                    if(!this.wxpay.account||!this.wxpay.name||!this.wxpay.qrCodeUrl){
                        this.$message.warning('请完善配置的微信收款账号信息');
                        return;
                    }
                }
                //检查银行卡配置完整性
                if(this.unionpay.accountName||this.unionpay.bank||this.unionpay.cardNo||this.unionpay.subBranch){
                    if(!this.unionpay.accountName||!this.unionpay.bank||!this.unionpay.cardNo||!this.unionpay.subBranch){
                        this.$message.warning('请完善配置的银行卡收款账号信息');
                        return;
                    }
                }
                if(this.onlinePay.billAffirmEmpId||this.onlinePay.walletAccountId){
                    if(!this.onlinePay.billAffirmEmpId||!this.onlinePay.renterBearHandlingFeePercent||!this.onlinePay.walletAccountId){
                        this.$message.warning('请完善线上支付信息');
                        return;
                    }
                }
                //检查必填一个
                if(!this.unionpay.accountName&&!this.wxpay.account&&!this.alipay.account&&!this.onlinePay.billAffirmEmpId){
                    this.$message.warning('请至少完善一类收款账号信息');
                    return;
                }
                //设置为空
                let unionpay = this.unionpay;
                if(!this.unionpay.accountName){
                    unionpay = null;
                }
                let wxpay = this.wxpay;
                if(!this.wxpay.account){
                    wxpay = null;
                }
                let alipay = this.alipay;
                if(!this.alipay.account){
                    alipay = null;
                }
                let onlinePay = this.onlinePay;
                if(!this.onlinePay.walletAccountId){
                    onlinePay = null;
                }
                else{
                    this.waSimpleList.forEach((item)=>{
                        if(item.id == this.onlinePay.walletAccountId){
                            onlinePay.walletAccountAlias = item.name;
                        }
                    });
                }
                this.saveLoading = true;
                if(this.id){
                    let data ={
                        alipay:alipay,
                        unionpay:unionpay,
                        wxpay:wxpay,
                        onlinePay:onlinePay,
                        id:this.id,
                    };
                    API.collectionAccountEdit(data).then(res => {
                        if(!res){
                            this.saveLoading= false;
                        }
                        if (res.code === '200') {
                            this.$message.success('收款账号信息修改成功');
                            this.$emit('successSave');
                        } else {
                            this.saveLoading = false;
                            this.$message.success('收款账号信息修改失败');
                        }
                    });
                }else{
                    let data ={
                        deptId:this.deptId,
                        alipay:alipay,
                        unionpay:unionpay,
                        wxpay:wxpay,
                        onlinePay:onlinePay,
                    };
                    API.collectionAccountAdd(data).then(res => {
                        if(!res){
                            this.saveLoading= false;
                        }
                        if (res.code === '200') {
                            this.$message.success('收款账号配置成功');
                            this.$emit('successSave');
                        } else {
                            this.saveLoading = false;
                            this.$message.success('收款账号配置失败');
                        }
                        if(!res){
                            this.saveLoading= false
                        }
                    });
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    .addTransfer-box{
        padding: 20px;
        height: calc(100vh - 100px);
        overflow: auto;
        .title{
            font-size: 18px;
            color: #111111;
            font-weight: 500;
        }
        .deptTree{
            /deep/ .tree-wrap .overHiddeSpan .ant-input{
                width: 100%;
            }
            /deep/ .ant-input-affix-wrapper .ant-input-suffix{
                right: 0px;
            }
        }
        .detail{
            .top{
                .color_tab{
                    color: #0A87F8;
                    background:rgba(247,250,252,1);
                    border:1px solid rgba(10,135,248,1);
                }
                .leftBorderRadius{
                    border-radius:4px 0px 0px 0px;
                }
                .rightBorderRadius{
                    border-radius:0px 4px 0px 0px;
                }
                .color_not_tab{
                    color: #BBBBBB;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(221,221,221,1);
                }
                .tabItem{
                    width: 114px;
                    height: 34px;
                    line-height: 34px;
                    font-size: 14px;
                    text-align: center;
                }
            }
            .detail_content{
                width:480px;
                border-radius:0px 4px 4px 4px;
                border:1px solid rgba(238,238,238,1);
                .titleIcon{
                    width:2px;
                    height:14px;
                    background:rgba(10,135,248,1);
                }
                .title{
                    font-size: 14px;
                    color: #111111;
                }
                .ant-upload-text{
                    font-size: 12px;
                    color: #666666;
                }
                .autoStyle{
                    width:88px;
                    height:88px;
                    background:rgba(246,247,248,1);
                    border-radius:4px;
                    border: 1px dashed #d9d9d9;
                    margin-right: 10px;
                    margin-bottom: 10px;
                    .ant-upload-text{
                        font-size: 12px;
                        color:#FFA036;
                        text-align: center;
                    }
                }
                .certificationStatusStyle{
                    idth: 100%;
                    text-align: center;
                    img{
                      margin-top: 50px;
                      height: 121px;
                      width: 293px;
                    }
                  .fontSize14{
                    font-size: 14px;
                  }
                  .fontSize12{
                    font-size: 12px;
                  }
                  .color1{
                    color: #777777;
                  }
                  .color2{
                    color: #0A87F8;
                  }
                  .color3{
                    color: #FFA036;
                  }
                }
                /deep/ .enclosureStyle .ant-upload.ant-upload-select-picture-card{
                    width: 88px;
                    height: 88px;
                }
                /deep/ .enclosure{
                    width: 88px;
                    height: 88px;
                }
                /deep/ .file-list .enclosure-img-list{
                    width: 88px;
                    height: 88px;
                }
                /deep/ .enclosure .ant-upload.ant-upload-select-picture-card > .ant-upload{
                    width: 88px;
                    height: 88px;
                }
                /deep/ .file-list .enclosure-img-list > div img{
                    max-width: 88px;
                    max-height: 88px;
                }
                .walletStyle{
                    /deep/ svg{
                        width: 14px;
                        height: 14px;
                    }
                    /deep/ .ant-select-selection__rendered{
                        margin-left: 0px;
                    }
                }
                .confirmEmployeeStyle{
                    /deep/ .tree-wrap .ant-input-affix-wrapper{
                        width: 220px !important;
                    }
                    /deep/ .tree{
                        margin-left: -180px;
                    }
                }
                .toolTip{
                    position: absolute;
                    top: 6px;
                    left:84px;
                    /deep/ .ant-tooltip-inner{
                        height: 30px;
                        width: 200px;
                        text-align: center;
                    }
                }
            }
            .height_tab1{
                height:740px;
            }
            .height_tab2{
                height: 362px;
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