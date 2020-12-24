<template>
    <div class="openWallet-box">
        <div class="warnningStyle clearfix cursor">
            <div class="f-fl" style="width: 24px;margin:0 12px 0 20px;height: 54px;line-height: 54px;">
                <icon-font type="icontongzhi"/>
            </div>
            <div class="f-fl" style="padding: 9px 20px 9px 0;font-size: 12px;width: calc(100% - 56px);">
                开通钱包绑定门店后，此门店将拥有独立的账户余额，也可绑定独立的银行卡进行充值提现转账。所有此门店的流水、财务、余额将 独立负责，不进入总店账户。此门店钱包的交易密码也将独立设置及使用
            </div>
        </div>
        <div class="userTypeStyle">
          <div :class="addWalletForm.userType==1?'selectedStyle':'unSelectStyle cursor'" @click="changeUserType(1)">
            <div :class="addWalletForm.userType==1?'item':''">个人账户</div>
          </div>
          <div :class="addWalletForm.userType==2?'selectedStyle':'unSelectStyle cursor'" @click="changeUserType(2)">
            <div :class="addWalletForm.userType==2?'item':''">企业账户</div>
          </div>
        </div>
        <div class="contentStyle">
            <div class="titleStyle" style="margin-top: 3.5px;">
                钱包名称<span class="mustFillStyle">*</span>
            </div>
            <div>
                <label-item class="u-bottom-border" :maxSize="15" :valLength="addWalletForm.alias.length">
                    <a-input placeholder="请输入方便记忆的钱包名称" v-model="addWalletForm.alias" maxLength="15"></a-input>
                </label-item>
            </div>
            <div class="clearfix" style="margin-top: 28.5px;">
              <div class="titleStyle f-fl">账户开通信息</div>
              <div class="f-fl" style="height: 27px;line-height: 27px;"><a-icon type="exclamation-circle" style="color: #FFA036;margin:0 4px 0 10px;font-size: 12px;" /><span style="color: #FFA036;font-size: 12px;">请填写真实的信息，以免开通失败</span></div>
            </div>
            <div v-if="addWalletForm.userType==1">
              <div class="clearfix">
                  <label-item class="u-bottom-border f-fl item" title="姓名" :mustFill="true">
                      <dept-employee-tree style="width: 220px;" :bottomBorder="false" :showPhone="false" :fromType="fromType"  placeholder="请选择" @selectChange="selectDeptEmp" ref="selectDeptEmp" placement="bottomLeft" :disableDept="true"></dept-employee-tree>
                  </label-item>
                  <label-item class="u-bottom-border f-fl item" title="手机号" :mustFill="true">
                      <a-input placeholder="请输入" v-model="addWalletForm.phone"></a-input>
                  </label-item>
                  <label-item class="u-bottom-border f-fl item" style="margin-right: 0px;" title="身份证号" :mustFill="true">
                      <a-input placeholder="请输入" v-model="addWalletForm.idCardNo"></a-input>
                  </label-item>
              </div>
              <div style="margin-top: 25.5px;">
                  <label-item class="u-bottom-border f-clearfix" title="证件照" :mustFill="true" style="position: relative;">
                      <own-upload class="f-fl" style="padding-right: 15px;margin-top: 8.5px;"  :picList="item2_4" :uploadParms="sendData2_4" :maxLength="1" :maxPicSize="1" :showTips="false" ref="img2_4">
                          <img src="../../assets/login/idzheng.png" style="width: 120px;height: 76px" class="choose" />
                      </own-upload>
                      <own-upload class="f-fl" style="padding-right: 15px;margin-top: 8.5px;"  :picList="item2_5" :uploadParms="sendData2_5" :maxLength="1" :maxPicSize="1" :showTips="false" ref="img2_5">
                          <img src="../../assets/login/idfan.png" style="width: 120px;height: 76px" class="choose" />
                      </own-upload>
                      <div class="f-fl" style="padding-right: 15px;margin-top: 8.5px;">
                          <div style="color: #777777;font-size: 12px;margin-top: 20px;width: 100%;">请提供个人有效证件</div>
                          <div style="color: #777777;font-size: 12px;">正反面原件照或复印件</div>
                      </div>
                    <div style="position: absolute;color: #999999;font-size: 12px;top:3px;left:46px;">(最大支持1M)</div>
                  </label-item>
              </div>
              <div class="f-clearfix upload-p">
                  <p class="f-fl"><span style="font-size: 12px;">身份证正面</span></p>
                  <p class="f-fl"><span style="font-size: 12px;">身份证反面</span></p>
              </div>
            </div>
            <div v-if="addWalletForm.userType==2" class="useType2Style">
              <div class="itemStyle clearfix">
                <div class="leftLine f-fl"></div>
                <div class="itemTitleStyle f-fl">公司信息</div>
              </div>
              <div class="clearfix">
                <label-item class="u-bottom-border f-fl item" title="公司名称" :mustFill="true">
                  <a-input placeholder="请输入" v-model="addWalletForm.enterpriseInfo.name"></a-input>
                </label-item>
                <label-item class="u-bottom-border f-fl item" title="是否三合一" :mustFill="true">
                  <div style="height: 32px;line-height: 32px;border-bottom: 1px solid #dddddd;">
                    <a-radio-group v-model="addWalletForm.enterpriseInfo.isThreeInOne">
                      <a-radio :value="1">是</a-radio>
                      <a-radio :value="0">否</a-radio>
                    </a-radio-group>
                  </div>
                </label-item>
                <label-item class="u-bottom-border f-fl item" style="margin-right: 0px;" title="统一社会信用" :mustFill="true" v-if="addWalletForm.enterpriseInfo.isThreeInOne==1">
                  <a-input placeholder="请输入" v-model="addWalletForm.enterpriseInfo.unifiedCreditCode"></a-input>
                </label-item>
                <label-item class="u-bottom-border f-fl item" style="margin-right: 0px;" title="营业执照号" :mustFill="true" v-if="addWalletForm.enterpriseInfo.isThreeInOne==0">
                  <a-input placeholder="请输入" v-model="addWalletForm.enterpriseInfo.bizLicenseNo"></a-input>
                </label-item>
              </div>
              <div class="clearfix" v-if="addWalletForm.enterpriseInfo.isThreeInOne==0" style="margin-top: 14px;">
                <label-item class="u-bottom-border f-fl item" title="组织机构代码" :mustFill="true">
                  <a-input placeholder="请输入" v-model="addWalletForm.enterpriseInfo.organizationCode"></a-input>
                </label-item>
                <label-item class="u-bottom-border f-fl item" title="税务登记证号" :mustFill="true" >
                  <a-input placeholder="请输入" v-model="addWalletForm.enterpriseInfo.taxRegCode"></a-input>
                </label-item>
              </div>
              <div class="clearfix" style="margin-top: 14px;">
                <label-item class="u-bottom-border f-fl item" title="营业执照" :mustFill="true" style="position: relative;">
                  <own-upload class="f-fl" style="padding-right: 15px;margin-top: 8.5px;"  :picList="item2_1" :uploadParms="sendData2_1" :maxLength="1" :maxPicSize="1" :showTips="false" ref="img2_1">
                  </own-upload>
                  <div style="position: absolute;color: #999999;font-size: 12px;top:9px;left:60px;">(最大支持1M)</div>
                </label-item>
                <label-item class="u-bottom-border f-fl item" title="组织机构代码证" v-if="addWalletForm.enterpriseInfo.isThreeInOne==0" :mustFill="true" style="position: relative;">
                  <own-upload class="f-fl" style="padding-right: 15px;margin-top: 8.5px;"  :picList="item2_2" :uploadParms="sendData2_2" :maxLength="1" :maxPicSize="1" :showTips="false" ref="img2_2">
                  </own-upload>
                  <div style="position: absolute;color: #999999;font-size: 12px;top:9px;left:94px;">(最大支持1M)</div>
                </label-item>
                <label-item class="u-bottom-border f-fl item" v-if="addWalletForm.enterpriseInfo.isThreeInOne==0" style="margin-right: 0px;position: relative;" title="税务登记证" :mustFill="true">
                  <own-upload class="f-fl" style="padding-right: 15px;margin-top: 8.5px;"  :picList="item2_3" :uploadParms="sendData2_3" :maxLength="1" :maxPicSize="1" :showTips="false" ref="img2_3">
                  </own-upload>
                  <div style="position: absolute;color: #999999;font-size: 12px;top:9px;left:70px;">(最大支持1M)</div>
                </label-item>
              </div>
              <div class="itemStyle clearfix" style="margin-top: 20px;">
                <div class="leftLine f-fl"></div>
                <div class="itemTitleStyle f-fl">对公账户信息</div>
              </div>
              <div class="clearfix">
                <label-item class="u-bottom-border f-fl item" title="对公银行卡号" :mustFill="true">
                  <a-input placeholder="请输入" v-model="addWalletForm.enterpriseInfo.pubAccountNo"></a-input>
                </label-item>
                <label-item class="u-bottom-border f-fl item" title="开户银行名称" :mustFill="true" >
                  <a-input placeholder="请输入" v-model="addWalletForm.enterpriseInfo.bankName"></a-input>
                </label-item>
                <label-item class="u-bottom-border f-fl item" style="margin-right: 0px;" title="开户行支行名称" :mustFill="true" >
                  <a-input placeholder="请输入" v-model="addWalletForm.enterpriseInfo.branchBankName"></a-input>
                </label-item>
              </div>
              <div class="clearfix" style="margin-top: 10px;">
                <label-item class="u-bottom-border f-fl item" style="margin-right: 0px;position: relative;" title="支行行号" :mustFill="true" >
                  <a-input placeholder="请输入12位数字" v-model="addWalletForm.enterpriseInfo.branchBankNo" v-validate="'naturalNum'" maxlength="12"></a-input>
                  <div style="position: absolute;top:6px;left:58px;"><a-icon type="exclamation-circle" style="color: #FFA036;margin:0 4px 0 0px;font-size: 12px;" /><span style="color: #FFA036;font-size: 12px;">请拨打对应银行客服查询</span></div>
                </label-item>
              </div>
              <div class="itemStyle clearfix" style="margin-top: 30px;">
                <div class="leftLine f-fl"></div>
                <div class="itemTitleStyle f-fl">法人信息</div>
                <div class="f-fl" style="height: 24px;line-height: 24px;">
                  <a-icon type="exclamation-circle" style="color: #FFA036;margin:0 4px 0 10px;font-size: 12px;" /><span style="color: #FFA036;font-size: 12px;">请填写真实的信息，以免开通失败！设置开通人后，此人员默认为该账户的管理人及提现负责人</span>
                </div>
              </div>
              <div>
                <div class="clearfix">
                  <label-item class="u-bottom-border f-fl item" title="法人姓名" :mustFill="true">
                    <dept-employee-tree style="width: 220px;" :bottomBorder="false" :showPhone="false" :fromType="fromType"  placeholder="请选择" @selectChange="selectDeptEmp" ref="selectDeptEmp" placement="bottomLeft" :disableDept="true"></dept-employee-tree>
                  </label-item>
                  <label-item class="u-bottom-border f-fl item" title="法人手机号" :mustFill="true">
                    <a-input placeholder="请输入" v-model="addWalletForm.phone"></a-input>
                  </label-item>
                  <label-item class="u-bottom-border f-fl item" style="margin-right: 0px;" title="法人身份证号" :mustFill="true">
                    <a-input placeholder="请输入" v-model="addWalletForm.idCardNo"></a-input>
                  </label-item>
                </div>
                <div style="margin-top: 20px;">
                  <label-item class="u-bottom-border f-clearfix" title="法人证件照" :mustFill="true" style="position: relative;">
                    <own-upload class="f-fl" style="padding-right: 15px;margin-top: 8.5px;"  :picList="item2_4" :uploadParms="sendData2_4" :maxLength="1" :maxPicSize="1" :showTips="false" ref="img2_4">
                      <img src="../../assets/login/idzheng.png" style="width: 120px;height: 76px" class="choose" />
                    </own-upload>
                    <own-upload class="f-fl" style="padding-right: 15px;margin-top: 8.5px;"  :picList="item2_5" :uploadParms="sendData2_5" :maxLength="1" :maxPicSize="1" :showTips="false" ref="img2_5">
                      <img src="../../assets/login/idfan.png" style="width: 120px;height: 76px" class="choose" />
                    </own-upload>
                    <div class="f-fl" style="padding-right: 15px;margin-top: 8.5px;">
                      <div style="color: #777777;font-size: 12px;margin-top: 20px;width: 100%;">请提供法人有效证件</div>
                      <div style="color: #777777;font-size: 12px;">正反面原件照或复印件</div>
                    </div>
                    <div style="position: absolute;color: #999999;font-size: 12px;top:3px;left:70px;">(最大支持1M)</div>
                  </label-item>
                </div>
                <div class="f-clearfix upload-p">
                  <p class="f-fl"><span style="font-size: 12px;">身份证正面</span></p>
                  <p class="f-fl"><span style="font-size: 12px;">身份证反面</span></p>
                </div>
              </div>
            </div>
            <div class="clearfix" style="margin-top: 25.5px;">
                <div class="titleStyle f-fl">账户管理人</div><div class="f-fl" style="height: 27px;line-height: 27px;"><a-icon type="exclamation-circle" style="color: #FFA036;margin:0 4px 0 10px;font-size: 12px;" /><span style="color: #FFA036;font-size: 12px;">该钱包账户如需多人管理，可设置多个管理人同时进行管理；默认开通人拥有所有权限</span></div>
            </div>
            <div class="basicsInfo" style="margin-top: 13.5px;">
                <div class="table">
                    <div class="table-title">
                        <div style="max-width: 100px;text-align: left;padding-left: 12px;color: #777777;font-size: 13px;">管理人</div>
                        <div style="max-width: 593px;text-align: left;padding-left: 14px;color: #777777;font-size: 13px;">权限</div>
                        <div style="max-width: 65px;text-align: center;color: #777777;font-size: 13px;">操作</div>
                    </div>
                    <div class="house-data u-no-border" v-for="(item,index) in addWalletForm.authorizeList" :key="index">
                        <div class="clearfix" style="max-width: 100px;padding-left: 12px;" >
                            <icon-font style="color: #0A87F8;margin-right: 10px;" type="iconren"/>{{item.empName}}
                        </div>
                        <div class="clearfix operateStyle" style="max-width: 593px;padding-left: 14px;" >
                            <div class="itemStyle width-59 f-fl" :class="item.operationList.indexOf(1)>-1?'selected':'unSelect'">查看<icon-font class="checkedStyle" v-show="item.operationList.indexOf(1)>-1" type="iconyumengtubiao_xuanzhong-" /></div>
                            <div class="itemStyle width-59 f-fl" :class="item.operationList.indexOf(2)>-1?'selected':'unSelect'">充值<icon-font class="checkedStyle" v-show="item.operationList.indexOf(2)>-1" type="iconyumengtubiao_xuanzhong-" /></div>
                            <div class="itemStyle width-59 f-fl" :class="item.operationList.indexOf(3)>-1?'selected':'unSelect'">提现<icon-font class="checkedStyle" v-show="item.operationList.indexOf(3)>-1" type="iconyumengtubiao_xuanzhong-" /></div>
                            <div class="itemStyle width-59 f-fl" :class="item.operationList.indexOf(4)>-1?'selected':'unSelect'">转账<icon-font class="checkedStyle" v-show="item.operationList.indexOf(4)>-1" type="iconyumengtubiao_xuanzhong-" /></div>
                            <div class="itemStyle width-101 f-fl" :class="item.operationList.indexOf(5)>-1?'selected':'unSelect'">银行卡管理<icon-font class="checkedStyle" v-show="item.operationList.indexOf(5)>-1" type="iconyumengtubiao_xuanzhong-" /></div>
                            <div class="itemStyle width-87 f-fl" :class="item.operationList.indexOf(6)>-1?'selected':'unSelect'">人员管理<icon-font class="checkedStyle" v-show="item.operationList.indexOf(6)>-1" type="iconyumengtubiao_xuanzhong-" /></div>
                            <div class="itemStyle width-66 f-fl selected" v-if="item.transactionVerifyMode==1">普通验证</div>
                            <div class="itemStyle width-52 f-fl selected" v-else>强验证</div>
                        </div>
                        <div class="clearfix" style="max-width: 65px;padding-left: 11px;" >
                            <div class="f-fl cursor" style="margin-right: 10px;" v-if="item.empId!=addWalletForm.ownerId" @click="editAuthorizeObj(index)">
                                <icon-font style="color: #0A87F8;" type="iconyumengtubiao_bianji-" />
                            </div>
                            <div class="f-fl cursor" v-if="item.empId!=addWalletForm.ownerId" @click="deleteAuthorizeObj(index)">
                                <icon-font style="color: #FB4246;" type="iconyumengtubiao_shanchu-" />
                            </div>
                        </div>
                    </div>
                    <div class="house-data u-no-border cursor" @click="AddAuthorizeObj()" v-if="addWalletForm.ownerId">
                        <div class="continueAddStyle">
                            <icon-font type="iconyumengtubiao_tianjia" />添加管理人
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix" style="width: 100%;margin-top:52px;">
                <div class="f-fl" style="height: 40px;line-height: 40px;">
                    <a-checkbox v-model="checkReadFlag"  @change="onChange"></a-checkbox><span class="cursor" style="padding: 0 5px;color: #777777" @click="checkReadFlag=!checkReadFlag">我已知晓并同意</span><span class="cursor" style="color:#0A87F8;" @click="showReadDialog=true;">《独立门店钱包负责人绑定须知》</span>
                </div>
                <div class="buttonDiv f-fr">
                    <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelOpenWallet">
                        取消
                    </a-button>
                    <a-button size="large" type="primary" class="formItemMarginButton saveFont" style="width: 200px;" :style="!checkReadFlag?'background:rgba(10,135,248,0.4);;':''" :loading="saveLoading" :disabled="!checkReadFlag" @click="openWallet">
                      开通并绑定手机号
                    </a-button>
                </div>
            </div>
        </div>
        <!-- 添加/编辑账户管理人 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" v-model="addManagerUserDialog" class="ownModalBorder titDialog" :title="addManagerUserTitle" @cancel="addManagerUserDialog=false" width="520px">
            <add-manager-user :userType="addWalletForm.userType" :obj="obj" :objIndex="objIndex" :selectedEmpId="selectedEmpId" :ownerId="addWalletForm.ownerId" @cancelAddUser="cancelAddUser" @successAddUser="successAddUser"></add-manager-user>
        </a-modal>
        <!-- 独立门店钱包负责人绑定须知 -->
        <a-modal centered v-model="showReadDialog" :footer="null" class="ownModalBorder" title="" @cancel="showReadDialog=false;" width="800px">
            <wallet-warning @closeThis="showReadDialog=false"></wallet-warning>
        </a-modal>
        <!-- 确认开通-验证码 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" v-model="openConfirmDialog" class="ownModalBorder titDialog" title="绑定手机号" @cancel="cancelBindPhone()" width="520px">
            <open-wallet-confirm :id="id" :phone="addWalletForm.phone" @closeThis="openConfirmDialog=false" @successBindPhone="successBindPhone"></open-wallet-confirm>
        </a-modal>
    </div>
</template>

<script>
    import DeptEmployeeTree from '@/components/DeptEmployeeTree/customer';
    import AddManagerUser from './openWalletAddManagerUser';
    import WalletWarning from './walletWarning';
    import OpenWalletConfirm from './openWalletConfirm';
    import {checkCard} from '@/api/contract.js';
    import * as API from '@/api/wallet.js';
    export default {
        name: "openWallet",
        components: {
            DeptEmployeeTree,
            AddManagerUser,
            WalletWarning,
            OpenWalletConfirm,
        },
        data() {
            return {
              sendData2_1: {},
              sendData2_2: {},
              sendData2_3: {},
                sendData2_4: {},
                sendData2_5: {},
              item2_1: [],
              item2_2: [],
              item2_3: [],
                item2_4: [],
                item2_5: [],
              imgId2_1: '',
              imgId2_2: '',
              imgId2_3: '',
                imgId2_4: '',
                imgId2_5: '',
                addWalletForm:{
                    alias:'',
                    idCardNo:'',
                    name:'',
                    phone:'',
                    userType:1,         //1、个人；2、企业
                    ownerId:'',
                    idCardPhotoIdList:[],
                    authorizeList:[],
                  enterpriseInfo:{
                    bankName:'',
                    bizLicenseNo:'',
                    branchBankName:'',
                    branchBankNo:'',
                    isThreeInOne:1,
                    name:'',
                    organizationCode:'',
                    pubAccountNo:'',
                    taxRegCode:'',
                    unifiedCreditCode:'',
                    certPicIdList:[],
                  },
                },
                addManagerUserDialog:false,
                addManagerUserTitle:'添加账户管理人',
                addObj:{
                    empId:'',
                    empName:'',
                    operationList:[1],
                    transactionVerifyMode:1,
                },
                obj:{},
                objIndex:0,
                checkReadFlag:false,
                showReadDialog:false,
                openConfirmDialog:false,
                saveLoading:false,
                id:'',
              fromType:2,
              selectedEmpId:[],
            }
        },
        mounted() {
          this.sendData2_1 = { //
            // 上传时附带的额外参数
            bizId: '', // 房源id
            bizType: 23, // 图片大类标识 钱包
            subBizType: 1, // 图片子类标识 企业营业执照
            orderIndex: 1 // 排序值
          }
          this.sendData2_2 = { //
            // 上传时附带的额外参数
            bizId: '', // 房源id
            bizType: 23, // 图片大类标识 钱包
            subBizType: 2, // 图片子类标识 企业机构代码证
            orderIndex: 1 // 排序值
          }
          this.sendData2_3 = { //
            // 上传时附带的额外参数
            bizId: '', // 房源id
            bizType: 23, // 图片大类标识 钱包
            subBizType: 3, // 图片子类标识 企业税务登记证
            orderIndex: 1 // 排序值
          }
            this.sendData2_4 = { //
                // 上传时附带的额外参数
                bizId: '', // 房源id
                bizType: 23, // 图片大类标识 钱包
                subBizType: 4, // 图片子类标识 身份证正面
                orderIndex: 1 // 排序值
            }
            this.sendData2_5 = {
                // 上传时附带的额外参数
                bizId: '', // 房源id
                bizType: 23, // 图片大类标识  钱包
                subBizType: 5, // 图片子类标识 身份证反面
                orderIndex: 2 // 排序值
            }
        },
        methods: {
          changeUserType(val){
            if(this.addWalletForm.userType == val){
              return ;
            }
            this.addWalletForm.userType = val;
          },
          cancelBindPhone(){
            let _this = this;
            this.$modal.confirm({
              title: '确定要取消绑定手机号吗？',
              content: '不绑定手机号，该钱包将不可使用提现、转账等功能；请谨慎操作',
              okText: '返回绑定',
              cancelText: '暂不绑定',
              onOk() {
                _this.openConfirmDialog = true;
              },
              onCancel() {
                _this.openConfirmDialog = false;
                _this.$emit('cancelBindPhone');
              },
            });
          },
            successBindPhone(){
                this.openConfirmDialog =false;
                this.$emit('successBindPhone');
            },
            onChange(e) {
                this.checkReadFlag = e.target.checked;
            },
            checkPhone(phone) {
                if (!phone) {
                    this.$message.error('请输入手机号');
                    return true;
                }
                if (!/^0?(13|14|15|16|17|18|19)[0-9]{9}$/.test(phone)) {
                    if (this.lastCheck) {
                        this.lastCheck = false;
                        this.$message.error('手机号码输入错误');
                        return true;
                    } else {
                        this.$message.error('手机号码输入错误');
                        return true;
                    }
                } else {
                    return false;
                }
            },
            checkData(){
                //必填检验
                if(!this.addWalletForm.alias){
                    this.$message.warning('请输入钱包名称');
                    return false;
                }
                if(this.addWalletForm.userType==1){
                  this.addWalletForm.name =  this.$refs.selectDeptEmp.selectName;
                  if(!this.addWalletForm.name){
                    this.$message.warning('请输入开通人姓名');
                    return false;
                  }
                  if(!this.addWalletForm.ownerId){
                    this.$message.warning('请选择开通人');
                    return false;
                  }
                  if(!this.addWalletForm.phone){
                    this.$message.warning('请输入开通人电话号码');
                    return false;
                  }
                  else{
                    if (this.checkPhone(this.addWalletForm.phone)) {
                      // 这个是判断字段传的是否正确  电话号码
                      return false;
                    }
                  }
                  if(!this.addWalletForm.idCardNo){
                    this.$message.warning('请输入开通人身份证号');
                    return false;
                  }
                  if (!this.imgId2_4) {
                    this.$message.warning('请上传开通人身份证正面!');
                    return false;
                  }
                  if (!this.imgId2_5) {
                    this.$message.warning('请上传开通人身份证反面!');
                    return false;
                  }
                }
                else if(this.addWalletForm.userType==2){
                  if(!this.addWalletForm.enterpriseInfo.name){
                    this.$message.warning('请输入公司名称');
                    return false;
                  }
                  if(this.addWalletForm.enterpriseInfo.isThreeInOne==1){
                    if(!this.addWalletForm.enterpriseInfo.unifiedCreditCode){
                      this.$message.warning('请输入统一社会信用');
                      return false;
                    }
                    if(!this.imgId2_1){
                      this.$message.warning('请上传营业执照!');
                      return false;
                    }
                  }
                  else if(this.addWalletForm.enterpriseInfo.isThreeInOne==0){
                    if(!this.addWalletForm.enterpriseInfo.bizLicenseNo){
                      this.$message.warning('请输入营业执照号');
                      return false;
                    }
                    if(!this.addWalletForm.enterpriseInfo.organizationCode){
                      this.$message.warning('请输入组织机构代码');
                      return false;
                    }
                    if(!this.addWalletForm.enterpriseInfo.taxRegCode){
                      this.$message.warning('请输入税务登记证号');
                      return false;
                    }
                    if(!this.imgId2_1){
                      this.$message.warning('请上传营业执照!');
                      return false;
                    }
                    if(!this.imgId2_2){
                      this.$message.warning('请上传组织机构代码证!');
                      return false;
                    }
                    if(!this.imgId2_3){
                      this.$message.warning('请上传税务登记证!');
                      return false;
                    }
                  }
                  else{
                    this.$message.warning('请选择是否三合一');
                    return false;
                  }

                  if(!this.addWalletForm.enterpriseInfo.pubAccountNo){
                    this.$message.warning('请输入对公银行卡号');
                    return false;
                  }
                  if(!this.addWalletForm.enterpriseInfo.bankName){
                    this.$message.warning('请输入开户银行名称');
                    return false;
                  }
                  if(!this.addWalletForm.enterpriseInfo.branchBankName){
                    this.$message.warning('请输入开户行支行名称');
                    return false;
                  }
                  if(!this.addWalletForm.enterpriseInfo.branchBankNo){
                    this.$message.warning('请输入支行行号');
                    return false;
                  }
                  if(this.addWalletForm.enterpriseInfo.branchBankNo.length!=12){
                    this.$message.warning('请输入正确的支行行号');
                    return false;
                  }
                  this.addWalletForm.name =  this.$refs.selectDeptEmp.selectName;
                  if(!this.addWalletForm.name){
                    this.$message.warning('请输入法人姓名');
                    return false;
                  }
                  if(!this.addWalletForm.ownerId){
                    this.$message.warning('请选择法人');
                    return false;
                  }
                  if(!this.addWalletForm.phone){
                    this.$message.warning('请输入法人电话号码');
                    return false;
                  }
                  else{
                    if (this.checkPhone(this.addWalletForm.phone)) {
                      // 这个是判断字段传的是否正确  电话号码
                      return false;
                    }
                  }

                  if(!this.addWalletForm.idCardNo){
                    this.$message.warning('请输入法人身份证号');
                    return false;
                  }
                  if (!this.imgId2_4) {
                    this.$message.warning('请上传法人身份证正面!');
                    return false;
                  }
                  if (!this.imgId2_5) {
                    this.$message.warning('请上传法人身份证反面!');
                    return false;
                  }
                }
            },
            openWallet(){
                if(this.$refs.img2_1&&this.$refs.img2_1.picsList.length != 0){
                  this.imgId2_1 = this.$refs.img2_1.picsList[0].id;
                }
                if(this.$refs.img2_2&&this.$refs.img2_2.picsList.length != 0){
                  this.imgId2_2 = this.$refs.img2_2.picsList[0].id;
                }
                if(this.$refs.img2_3&&this.$refs.img2_3.picsList.length != 0){
                  this.imgId2_3 = this.$refs.img2_3.picsList[0].id;
                }
                if (this.$refs.img2_4&&this.$refs.img2_4.picsList.length != 0) {
                    this.imgId2_4 = this.$refs.img2_4.picsList[0].id;
                }
                if (this.$refs.img2_5&&this.$refs.img2_5.picsList.length != 0) {
                    this.imgId2_5 = this.$refs.img2_5.picsList[0].id;
                }
                let checkDataResult = this.checkData();
                if(checkDataResult == false){
                    return;
                }
                if(this.addWalletForm.userType==2){
                  this.addWalletForm.enterpriseInfo.certPicIdList = [];
                  if(this.addWalletForm.enterpriseInfo.isThreeInOne==1){
                    //三合一
                    this.addWalletForm.enterpriseInfo.certPicIdList.push(this.imgId2_1);
                  }
                  else{
                    //非三合一
                    this.addWalletForm.enterpriseInfo.certPicIdList.push(this.imgId2_1);
                    this.addWalletForm.enterpriseInfo.certPicIdList.push(this.imgId2_2);
                    this.addWalletForm.enterpriseInfo.certPicIdList.push(this.imgId2_3);
                  }
                }
              this.addWalletForm.idCardPhotoIdList = [];
                this.addWalletForm.idCardPhotoIdList.push(this.imgId2_4);
                this.addWalletForm.idCardPhotoIdList.push(this.imgId2_5);
                this.saveLoading = true;
                checkCard(this.addWalletForm.idCardNo).then(res => {
                    if (res === undefined) {
                        this.$message.error('请输入正确身份证号');
                        this.saveLoading = false;
                        return;
                    } else {
                        if (res.code === '200') {
                            API.waCreate(this.addWalletForm).then(res=>{
                                if(!res){
                                    this.saveLoading = false;
                                }
                                if(res.code === '200'){
                                    this.id = res.data;
                                    this.saveLoading = false;
                                    this.$emit('refreshinfoFun',true);
                                    this.openConfirmDialog = true;
                                }
                                else{
                                    this.saveLoading = false;
                                }
                            });

                        } else {
                            this.saveLoading = false;
                            this.$message.error('请输入正确身份证号');
                            return;
                        }
                    }
                });
            },
            cancelOpenWallet(){
                this.$emit('cancelOpenWallet');
            },
            successAddUser(obj,objIndex){
                this.addManagerUserDialog = false;
                this.addWalletForm.authorizeList[objIndex] = obj
            },
            cancelAddUser(){
                this.addManagerUserDialog = false;
            },
            editAuthorizeObj(index){
                this.objIndex = index;
                this.addManagerUserDialog = true;
                this.obj = this.addWalletForm.authorizeList[index];
            },
            deleteAuthorizeObj(index){
                this.addWalletForm.authorizeList.splice(index,1);
            },
            AddAuthorizeObj(){
                this.objIndex = this.addWalletForm.authorizeList.length;
                this.addManagerUserDialog = true;
                this.obj = Object.assign({},this.addObj);
              this.selectedEmpId = [];
              this.addWalletForm.authorizeList.forEach((item)=>{
                this.selectedEmpId.push(item.empId);
              });
            },
            selectDeptEmp(selectObj){
                if (selectObj.type == 'employee') {
                    //若是修改  记录下上一个管理人
                    let temp = this.addWalletForm.ownerId;
                    this.addWalletForm.ownerId = selectObj.id;
                    this.addWalletForm.name = selectObj.name;
                    this.addWalletForm.phone = selectObj.phone;
                    this.addWalletForm.idCardNo = selectObj.idCardNo;
                    //是否是修改
                    if(temp){
                        let pos = -1;
                        this.addWalletForm.authorizeList.forEach((item,index)=>{
                            if(item.isOwner == 1){
                                item.empId = selectObj.id;//变更拥有者
                                item.empName = selectObj.name;//变更拥有者
                            }
                            if(item.isOwner!=1&&item.empId == this.addWalletForm.ownerId){
                                pos = index;
                            }
                        });
                        if (pos>-1){
                            this.addWalletForm.authorizeList.splice(pos,1);
                        }
                    }
                    else{
                        let obj = {
                            empId: selectObj.id,
                            empName:selectObj.name,
                            isOwner:1,          //是否是拥有者
                            operationList:[1,2,3,4,5,6],
                            transactionVerifyMode:1,
                        };
                        let tempObj = Object.assign({},obj);
                        this.addWalletForm.authorizeList.push(tempObj);
                    }
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    .openWallet-box{
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
      .userTypeStyle{
        display: flex;
        height: 40px;
        & > div{
          flex:1;
          width: 50%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-weight: 500;
          .item{
            width: 66px;
            margin: 0 auto;
            border-bottom: 2px solid #0A87F8;
          }
        }
        .unSelectStyle{
          color: #777777;
          background: #F2F2F2;
        }
        .selectedStyle{
          color: #0A87F8;
          background: #F5F6FE;;
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
            .item{
                width: 232px;
                margin-right: 30px;
            }
            .upload-p{
                p{
                    text-align: center;
                    width: 120px;
                    margin-right: 9px;
                }
            }
            .basicsInfo{
                width: 100%;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                .table{
                    width: 756px;
                    border-left: 1px solid #EEEEEE;
                    border-top: 1px solid #EEEEEE;
                    font-size: 12px;
                    .table-title{
                        display: flex;
                        background:#F6F7FB;
                        color: #666666;
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
                            .width-66{
                                width: 66px;
                            }
                            .width-52{
                                width: 52px;
                            }
                            .checkedStyle{
                                color: #0A87F8;
                                margin-left: 6px;
                            }
                            .itemStyle{
                                border-radius:2px;
                                height:24px;
                                line-height: 24px;
                                margin: 11px 10px 11px 0;
                                padding-left: 5px;
                            }
                            .selected{
                                background: #F5F7FE;
                                color: #333333;
                            }
                            .unSelect{
                                background: #F4F4F4;
                                color: #777777;
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
          .useType2Style{
            .itemStyle{
              margin: 15px 0 0 0;
              .leftLine{
                height: 14px;
                background: #0A87F8;
                width: 2px;
                margin: 3px 8px 0 0;
              }
              .itemTitleStyle{
                font-size: 16px;
                color: #111111;
              }
            }
          }
        }
        /deep/ .ant-upload.ant-upload-select-picture-card{
            margin-bottom: 0px;
        }
    }
</style>