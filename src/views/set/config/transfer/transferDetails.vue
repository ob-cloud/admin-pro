<template>
    <div class="billTransfer-box">
        <div class="child-detail">
            <div class="top f-clearfix">
                 <div class="f-fl title">
                     <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                     <span style="margin-top: 9px;" class="radius-font status4" v-if="copyTransfer.isEnable==1&&!skeletonLoading"><icon-font type="iconyumengtubiao_xuanzhong-" /></span>
                     <span style="margin-top: 9px;" class="radius-font status3" v-else-if="copyTransfer.isEnable==0&&!skeletonLoading"><icon-font type="iconjingangqujinyong" /></span>
                     <div>
                         <label-item title="当前状态">
                             <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                             <div class="statusColor4" v-if="copyTransfer.isEnable==1&&!skeletonLoading">启用</div>
                             <div class="statusColor2" v-if="copyTransfer.isEnable==2&&!skeletonLoading">禁用</div>
                         </label-item>
                    </div>
                </div> 
                <div class="f-fl detail">
                    <div class="blank-box"></div>
                    <div class="item" style="width:182px">
                        <span style="margin-top: 8px;" class="radius-font radius-font-person">
                            <icon-font type="iconmendian" />
                        </span>
                        <label-item title="门店" :skeletonLoading="skeletonLoading">
                            <div>
                                {{copyTransfer.deptName}}
                            </div>
                        </label-item>
                    </div>
                </div>
            </div>
            <div class="tabs-content">
                <a-tabs size="small" defaultActiveKey="1" @change="handleCallback">
                    <a-tab-pane key="1">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_caiwuzhangdan" /> 账单信息
                        </span>
                        <div class="basic-info">
                            <div class="clearfix">
                                <div class="titleIcon f-fl"></div>
                                <div class="title f-fl">线下转账</div>
                            </div>
                            <div style="border:1px solid rgba(244,244,244,1);border-radius:4px 4px 4px 4px;margin-bottom: 21px;">
                                <div class="littleTitle clearfix" style="width: 100%;background:#F6F7F8;border-radius:4px 4px 0px 0px;height: 40px;line-height: 40px;">
                                    <div class="titleStyle f-fl" style="margin-left: 14px">支付宝</div>
                                    <div class="operateStyle f-fr cursor" v-if="!isAlipayEdit&&alipay&&!alipay.account" @click="isAlipayEdit=true;"><icon-font style="margin-right: 2px;" type="iconbangding" />绑定账号</div>
                                    <div class="operateStyle f-fr cursor" v-if="!isAlipayEdit&&alipay&&alipay.account" @click="cancelBind(1)"><icon-font style="margin-right: 2px;" type="iconjiechu" />解除绑定</div>
                                    <div class="operateStyle f-fr" v-if="isAlipayEdit">
                                      <a-button style="height: 28px;text-align: center" class="cancelStyle cursor" @click="cancelSaveAccount(1)">取消</a-button>
                                      <a-button style="height: 28px;text-align: center" class="saveStyle cursor" :loading="alipayLoading" @click="saveAccount(1)">保存</a-button>
                                    </div>
                                </div>
                                <div class="input-info" v-if="!isAlipayEdit&&alipay&&!alipay.account">
                                    <div class="unConfigStyle">未配置支付宝收款信息~</div>
                                </div>
                                <div class="input-info" v-if="!isAlipayEdit&&alipay&&alipay.account">
                                    <label-item class="item margin1" title="账号" :skeletonLoading="skeletonLoading">
                                        <span>{{alipay.account|blankVal}}</span>
                                    </label-item>
                                    <label-item class="item margin1" title="真实姓名" :skeletonLoading="skeletonLoading">
                                        <span>{{alipay.name|blankVal}}</span>
                                    </label-item>
                                    <label-item class="item margin1" title="收款时，是否自动生成账单金额" :skeletonLoading="skeletonLoading">
                                        <span>{{alipay.advancedMode==1?'是':'否'}}</span>
                                    </label-item>
                                    <label-item class="item margin1" style="margin-right: 0;" title="收款二维码" :skeletonLoading="skeletonLoading">
                                        <div class="showImg" v-if="alipay&&alipay.advancedMode==0">
                                            <div class="showImgDetail cursor" @click="handlePreview(alipay.qrCodeUrl)"><img :src="alipay.qrCodeUrl" /></div>
                                        </div>
                                        <span v-if="alipay&&alipay.advancedMode==1" style="color: #FFA036;font-size: 12px;">系统已自动为您生成收款二维码</span>
                                    </label-item>
                                    <label-item style="position: relative" v-if="alipay&&alipay.account&&alipay.advancedMode==1" class="item margin1" title="PID" :skeletonLoading="skeletonLoading">
                                        <span>{{alipay.pid|blankVal}}</span>
                                    </label-item>
                                </div>
                                <div class="input-info" v-if="isAlipayEdit">
                                <label-item class="item margin1" title="账号" :skeletonLoading="skeletonLoading">
                                    <a-input v-model="alipay.account" maxLength="20" placeholder="请输入支付宝账号" />
                                </label-item>
                                <label-item class="item margin1" title="真实姓名" :skeletonLoading="skeletonLoading">
                                    <a-input v-model="alipay.name" maxLength="10" placeholder="请输入真实姓名" />
                                </label-item>
                                <label-item class="item margin1" title="收款时，是否自动生成账单金额" :skeletonLoading="skeletonLoading">
                                    <div class="checkBox clearfix">
                                        <div class="f-fl clearfix">
                                            <div class="f-fl allCheck checked" v-if="alipay.advancedMode==1">
                                                <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                                                <div class="f-fl fontStyle">是</div>
                                            </div>
                                            <div class="f-fl allCheck clearfix cursor" v-if="alipay.advancedMode==0" @click="alipay.advancedMode=1">
                                                <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                                                <div class="f-fl fontStyle">是</div>
                                            </div>
                                        </div>
                                        <div class="f-fl margin15">
                                            <div class="allCheck checked clearfix" v-if="alipay.advancedMode==0">
                                                <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                                                <div class="f-fl fontStyle">否</div>
                                            </div>
                                            <div class="allCheck  clearfix cursor" v-if="alipay.advancedMode==1" @click="alipay.advancedMode=0">
                                                <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                                                <div class="f-fl fontStyle">否</div>
                                            </div>
                                        </div>
                                    </div>
                                </label-item>
                                <label-item class="item margin1" title="收款二维码" style="margin-right: 0;" :skeletonLoading="skeletonLoading">
                                    <span v-if="alipay&&alipay.advancedMode==1" style="color: #FFA036;font-size: 12px;">系统已自动为您生成收款二维码</span>
                                    <div class="showImg" v-if="alipay&&alipay.advancedMode==0">
                                        <own-upload class="f-fl" v-show="!alipay.advancedModeFlag" :addRealDelete="false" :picList="item2_1" :uploadParms="sendData2_1" :maxLength="1" :showTips="false" ref="img2_1">
                                            <div style="padding-top: 15px;">
                                                <a-icon style="color: #BBBBBB" type="plus"/>
                                                <div class="ant-upload-text">上传</div>
                                                <div class="ant-upload-text">收款二维码</div>
                                            </div>
                                        </own-upload>
                                    </div>
                                </label-item>
                                <label-item style="position: relative" v-if="alipay&&alipay.advancedMode==1" class="item margin1" title="PID" :skeletonLoading="skeletonLoading">
                                    <a-input v-model="alipay.pid" maxLength="20" placeholder="请填写支付宝账号PID信息"/>
                                    <div class="cursor" @click="addTransferHelpShow=true" style="position:absolute;color:#0A87F8;font-size: 12px;right: 10px;top:10px;">查看获取流程</div>
                                </label-item>
                            </div>
                            </div>
                            <div style="border:1px solid rgba(244,244,244,1);border-radius:4px 4px 4px 4px;margin-bottom: 21px;">
                                <div class="littleTitle clearfix" style="width: 100%;width: 100%;background:#F6F7F8;border-radius:4px 4px 0px 0px;height: 40px;line-height: 40px;">
                                    <div class="titleStyle f-fl" style="margin-left: 14px">微信</div>
                                    <div class="operateStyle f-fr cursor" v-if="!isWxpayEdit&&wxpay&&!wxpay.account" @click="isWxpayEdit=true;"><icon-font style="margin-right: 2px;" type="iconbangding" />绑定账号</div>
                                    <div class="operateStyle f-fr cursor" v-if="!isWxpayEdit&&wxpay&&wxpay.account" @click="cancelBind(2)"><icon-font style="margin-right: 2px;" type="iconjiechu" />解除绑定</div>
                                    <div class="operateStyle f-fr" v-if="isWxpayEdit">
                                      <a-button style="height: 28px;text-align: center" class="cancelStyle cursor" @click="cancelSaveAccount(2)">取消</a-button>
                                      <a-button style="height: 28px;text-align: center" class="saveStyle cursor" :loading="wxpayLoading" @click="saveAccount(2)">保存</a-button>
                                    </div>
                                </div>
                                <div class="input-info" v-if="!isWxpayEdit&&wxpay&&!wxpay.account">
                                    <div class="unConfigStyle">未配置微信收款信息~</div>
                                </div>
                                <div class="input-info" v-if="!isWxpayEdit&&wxpay&&wxpay.account">
                                    <label-item class="item margin1" title="账号" :skeletonLoading="skeletonLoading">
                                        <span>{{wxpay.account|blankVal}}</span>
                                    </label-item>
                                    <label-item class="item margin1" title="真实姓名" :skeletonLoading="skeletonLoading">
                                        <span>{{wxpay.name|blankVal}}</span>
                                    </label-item>
                                    <label-item class="item margin1" title="收款时，是否自动生成账单金额" :skeletonLoading="skeletonLoading">
                                        <span>否</span>
                                    </label-item>
                                    <label-item class="item margin1" title="收款二维码" style="margin-right: 0;" :skeletonLoading="skeletonLoading">
                                        <div class="showImg">
                                            <div class="showImgDetail cursor" @click="handlePreview(wxpay.qrCodeUrl)"><img :src="wxpay.qrCodeUrl" /></div>
                                        </div>
                                    </label-item>
                                </div>
                                <div class="input-info" v-if="isWxpayEdit">
                                    <label-item class="item margin1" title="账号" :skeletonLoading="skeletonLoading">
                                        <a-input v-model="wxpay.account" maxLength="20" placeholder="请输入微信账号" />
                                    </label-item>
                                    <label-item class="item margin1" title="真实姓名" :skeletonLoading="skeletonLoading">
                                        <a-input v-model="wxpay.name" maxLength="10" placeholder="请输入真实姓名" />
                                    </label-item>
                                    <label-item class="item margin1" title="收款时，是否自动生成账单金额" :skeletonLoading="skeletonLoading">
                                        <div class="checkBox clearfix">
                                            <div class="f-fl clearfix">
                                                <div class="f-fl allCheck checked clearfix">
                                                    <div class="f-fl radiusStyle"></div>
                                                    <div class="f-fl fontStyle" style="margin-left: 5px">是</div>
                                                </div>
                                            </div>
                                            <div class="f-fl margin15">
                                                <div class="allCheck checked clearfix">
                                                    <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                                                    <div class="f-fl fontStyle">否</div>
                                                </div>
                                            </div>
                                        </div>
                                    </label-item>
                                    <label-item class="item margin1" title="收款二维码" style="margin-right: 0;" :skeletonLoading="skeletonLoading">
                                        <div class="showImg">
                                            <own-upload class="f-fl" :addRealDelete="false" :picList="item2_2" :uploadParms="sendData2_2" :maxLength="1" :showTips="false" ref="img2_2">
                                                <div style="padding-top: 15px;">
                                                    <a-icon style="color: #BBBBBB" type="plus"/>
                                                    <div class="ant-upload-text">上传</div>
                                                    <div class="ant-upload-text">收款二维码</div>
                                                </div>
                                            </own-upload>
                                        </div>
                                    </label-item>
                                </div>
                            </div>
                            <div style="border:1px solid rgba(244,244,244,1);border-radius:4px 4px 4px 4px;">
                                <div class="littleTitle clearfix" style="width: 100%;width: 100%;background:#F6F7F8;border-radius:4px 4px 0px 0px;height: 40px;line-height: 40px;">
                                    <div class="titleStyle f-fl" style="margin-left: 14px">银行卡</div>
                                    <div class="operateStyle f-fr cursor" v-if="!isUnionpayEdit&&unionpay&&!unionpay.cardNo" @click="isUnionpayEdit=true;"><icon-font style="margin-right: 2px;" type="iconbangding" />绑定账号</div>
                                    <div class="operateStyle f-fr cursor" v-if="!isUnionpayEdit&&unionpay&&unionpay.cardNo" @click="cancelBind(3)"><icon-font style="margin-right: 2px;" type="iconjiechu" />解除绑定</div>
                                    <div class="operateStyle f-fr" v-if="isUnionpayEdit">
                                      <a-button style="height: 28px;text-align: center" class="cancelStyle cursor" @click="cancelSaveAccount(3)">取消</a-button>
                                      <a-button style="height: 28px;text-align: center" class="saveStyle cursor" :loading="unionpayLoading" @click="saveAccount(3)">保存</a-button>
                                    </div>
                                </div>
                                <div class="input-info" v-if="!isUnionpayEdit&&unionpay&&!unionpay.cardNo">
                                    <div class="unConfigStyle">未配置银行卡收款信息~</div>
                                </div>
                                <div class="input-info" v-if="!isUnionpayEdit&&unionpay&&unionpay.cardNo">
                                    <label-item class="item margin1" title="卡号" :skeletonLoading="skeletonLoading">
                                        <span>{{unionpay.cardNo|blankVal}}</span>
                                    </label-item>
                                    <label-item class="item margin1" title="开户银行" :skeletonLoading="skeletonLoading">
                                        <span>{{unionpay.bank|blankVal}}</span>
                                    </label-item>
                                    <label-item class="item margin1" title="开户支行" :skeletonLoading="skeletonLoading">
                                        <span>{{unionpay.subBranch|blankVal}}</span>
                                    </label-item>
                                    <label-item class="item margin1" title="开户名" style="margin-right: 0;" :skeletonLoading="skeletonLoading">
                                        <span>{{unionpay.accountName|blankVal}}</span>
                                    </label-item>
                                </div>
                                <div class="input-info" v-if="isUnionpayEdit">
                                    <label-item class="item margin1" title="卡号" :skeletonLoading="skeletonLoading">
                                        <a-input v-model="unionpay.cardNo" maxLength="20" placeholder="请输入银行卡号" />
                                    </label-item>
                                    <label-item class="item margin1" title="开户银行" :skeletonLoading="skeletonLoading">
                                        <a-input v-model="unionpay.bank" maxLength="20" placeholder="请输入开户银行"/>
                                    </label-item>
                                    <label-item class="item margin1" title="开户支行" :skeletonLoading="skeletonLoading">
                                        <a-input v-model="unionpay.subBranch"  placeholder="请输入开户支行" />
                                    </label-item>
                                    <label-item class="item margin1" title="开户名" style="margin-right: 0;" :skeletonLoading="skeletonLoading">
                                        <a-input v-model="unionpay.accountName" maxLength="20" placeholder="请输入开户名" />
                                    </label-item>
                                </div>
                            </div>
                            <div class="clearfix" style="margin-top: 30px;">
                                <div class="titleIcon f-fl"></div>
                                <div class="title f-fl" style="margin-top: 4px;">线上支付</div>
                            </div>
                            <div style="border:1px solid rgba(244,244,244,1);border-radius:4px 4px 4px 4px;margin-bottom: 21px;">
                                <div class="littleTitle clearfix" style="width: 100%;background:#F6F7F8;border-radius:4px 4px 0px 0px;height: 40px;line-height: 40px;">
                                    <div class="titleStyle f-fl" style="margin-left: 14px">线上支付</div>
                                    <div class="operateStyle f-fr cursor" v-if="certificationStatus==2&&!isOnlinepayEdit&&onlinePay&&!onlinePay.walletAccountAlias" @click="onlinepayEdit"><icon-font style="margin-right: 2px;" type="iconbangding" />绑定账号</div>
                                    <div class="operateStyle f-fr cursor" v-if="!isOnlinepayEdit&&onlinePay&&onlinePay.walletAccountAlias" @click="cancelBind(4)"><icon-font style="margin-right: 2px;" type="iconjiechu" />解除绑定</div>
                                    <div class="operateStyle f-fr" v-if="isOnlinepayEdit">
                                        <a-button style="height: 28px;text-align: center" class="cancelStyle cursor" @click="cancelSaveAccount(4)">取消</a-button>
                                        <a-button style="height: 28px;text-align: center" class="saveStyle cursor" :loading="onlinePayLoading" @click="saveAccount(4)">保存</a-button>
                                    </div>
                                </div>
                                <div class="input-info" v-if="certificationStatus==2&&!isOnlinepayEdit&&onlinePay&&!onlinePay.walletAccountAlias">
                                    <div class="unConfigStyle">未配置线上支付信息~</div>
                                </div>
                                <!-- 未申请 -->
                                <div class="input-info" v-if="certificationStatus==0">
                                    <div style="color: #777777;font-size: 14px;margin-top: 16px;text-align: center;width: 100%;">您的企业未认证，无法使用钱包功能</div>
                                    <div @click="openAuthentication()" style="margin: 10px 0 16px 0;width: 100%;text-align: center;color: #0A87F8;" class="fontSize14 color2 cursor">立即认证<icon-font style="margin-left: 8px;" type="iconyumengtubiao_zhishi"/></div>
                                </div>
                                <!-- 未申请中 -->
                                <div class="input-info" v-if="certificationStatus==1">
                                  <div style="color: #FFA036;font-size: 14px;margin-top:16px;text-align: center;width: 100%;color: #FFA036;">您提交的认证资料我们已经收到</div>
                                  <div style="color: #FFA036;font-size: 14px;margin-bottom:16px;text-align: center;width: 100%;color: #FFA036;">正在紧急审核中 </div>
                                </div>
                                <!-- 申请驳回 -->
                                <div class="input-info" v-if="certificationStatus==3">
                                  <div style="color: #777777;font-size: 14px;margin-top: 16px;text-align: center;width: 100%;">企业信息认证失败</div>
                                  <div style="color: #777777;font-size: 14px;text-align: center;width: 100%;">
                                    {{ failReason }}</div>
                                  <div @click="openAuthentication()" style="margin: 10px 0 16px 0;color: #0A87F8;width: 100%;text-align: center;" class="fontSize14 color2 cursor">重新认证<icon-font style="margin-left: 8px;" type="iconyumengtubiao_zhishi"/></div>
                                </div>
                                <div class="input-info" v-if="!isOnlinepayEdit&&onlinePay&&onlinePay.walletAccountAlias">
                                    <label-item class="item margin1" title="钱包账户" :skeletonLoading="skeletonLoading">
                                        <span>{{onlinePay.walletAccountAlias|blankVal}}</span>
                                    </label-item>
                                    <label-item class="item margin1" title="账单确认人" :skeletonLoading="skeletonLoading">
                                        <span>{{onlinePay.billAffirmEmpName|blankVal}}</span>
                                    </label-item>
                                    <label-item class="item margin1" style="width: 400px;margin-right: 0px;" title="支付手续费" :skeletonLoading="skeletonLoading">
                                        <span v-if="onlinePay.renterBearHandlingFeePercent">租客承担 {{onlinePay.renterBearHandlingFeePercent}}% ，剩余部分由公寓承担</span>
                                        <span v-else-if="onlinePay.renterBearHandlingFeePercent==0">公寓承担100%</span>
                                        <span v-else>-</span>
                                    </label-item>
                                </div>
                                <div class="input-info" v-if="isOnlinepayEdit">
                                    <label-item class="item margin1" title="钱包账户" :skeletonLoading="skeletonLoading">
                                        <a-select placeholder="请选择" v-model="onlinePay.walletAccountId" :showSearch="true" :filterOption="(inputValue,option)=>filterOption(inputValue,option)">
                                            <div slot="dropdownRender" slot-scope="menu" >
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
                                            <a-select-option v-for="item in waSimpleList" v-if="listFreshFlag" :key="item.id" :value="item.id">
                                                {{ item.alias }}
                                            </a-select-option>
                                        </a-select>
                                    </label-item>
                                    <label-item class="item margin1" title="账单确认人" :skeletonLoading="skeletonLoading">
                                        <dept-employee-tree :bottomBorder="false" placeholder="请选择" :defaultValue="onlinePay.billAffirmEmpName" @selectChange="selectDeptEmp" ref="selectDeptEmp" placement="topLeft" :disableDept="true"></dept-employee-tree>
                                    </label-item>
                                    <label-item class="item margin1 u-bottom-border" style="width: 400px;" title="支付手续费" :skeletonLoading="skeletonLoading">
                                        <span class="f-fl" style="height: 32px;line-height: 32px;">租客承担</span>
                                        <a-input style="width: 120px;text-align: center;color: #111111;" class="f-fl" placeholder="请输入" v-validate="'naturalNum|min(0)|max(100)'" v-model="onlinePay.renterBearHandlingFeePercent"></a-input>
                                        <span class="f-fl" style="height: 32px;line-height: 32px;">%；</span>
                                        <span class="f-fl" style="height: 32px;line-height: 32px;color: #333333;">剩余部分由公寓承担</span>
                                    </label-item>
                                </div>
                            </div>
                        </div>
                    </a-tab-pane>
                    <div slot="tabBarExtraContent" class="tabs-options">
                        <div v-if="activekey == 1&&!isEdit&&!skeletonLoading">
                            <div @click="openCollectionAccountDialog(copyTransfer)" v-mark="['mk_set_config_skzhpz_fzsz']">
                                <icon-font type="iconyumengtubiao_fenpei" />
                                <span>&nbsp;分账设置</span>
                            </div>
                            <div v-if="copyTransfer.isEnable==1" @click="disable(copyTransfer)" v-mark="['mk_set_config_skzhpz_jy']">
                                <icon-font type="iconyumengtubiao_jinyong" />
                                <span>&nbsp;禁用</span>
                            </div>
                            <div v-if="copyTransfer.isEnable==0" @click="enable(copyTransfer)" v-mark="['mk_set_config_skzhpz_qy']">
                                <icon-font type="iconqiyong" />
                                <span>&nbsp;启用</span>
                            </div>
                            <div @click="deleteTransfer(copyTransfer)" v-mark="['mk_set_config_skzhpz_sc']">
                                <icon-font type="iconyumengtubiao_shanchu-" />
                                <span>&nbsp;删除</span>
                            </div>
                        </div>
                    </div>
                </a-tabs>
            </div>
            <div class="bottom">
                <span>{{copyTransfer.creater}}创建于 {{$moment(copyTransfer.createTime).format('lll')}}</span>
                <span>{{copyTransfer.updater}}更新于 {{$moment(copyTransfer.updateTime).format('lll')}}</span>
            </div>
        </div>

        <a-modal centered :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
        <!-- PID获取文档 -->
        <a-modal centered v-model="addTransferHelpShow" :footer="null" :bodyStyle="{padding:'24px 0 24px 24px'}" class="ownModalBorder" title="" @cancel="addTransferHelpShow=false" width="800px">
            <add-transfer-help @closeThis="addTransferHelpShow=false"></add-transfer-help>
        </a-modal>
        <!-- 开通钱包 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" v-model="openWalletShow" class="ownModalBorder titDialog" title="开通平台钱包账户" @cancel="isRefreshFun" width="800px">
            <open-wallet @cancelOpenWallet="cancelOpenWallet" @saveUnBindPhone="successBindPhone" @successBindPhone="successBindPhone" @cancelBindPhone="cancelBindPhone" @refreshinfoFun="refreshinfoFun"></open-wallet>
        </a-modal>
        <!-- 分账设置 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" :title="collectionAccountTitle" width="800px" v-model="collectionAccountDialog" class="ownModalBorder titDialog" @cancel="collectionAccountDialog=false">
            <collection-account :id="id" :collectionAccountDept="collectionAccountDept" @cancelSave="cancelSaveCollectionAccount"  @saveSuccess="saveSuccessCollectionAccount"></collection-account>
        </a-modal>
        <!-- 添加企业认证 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="521px" v-model="addAuthenticationDialog" class="ownModalBorder titDialog" title="立即认证">
          <add-authentication @cancelAdd="cancelAuthentication()" @addSuccess="initCertificationStatus()"></add-authentication>
        </a-modal>
    </div>
</template>

<script>
import * as API from '@/api/setConfig';
import  AddTransferHelp from './addTransferHelp';
import DeptEmployeeTree from '@/components/DeptEmployeeTree';
import OpenWallet from '../../../wallet/openWallet';
import CollectionAccount from './collectionAccount';
import {waListSimple} from '@/api/wallet';
import {getCertificationStatus} from '@/api/enterprise';
import AddAuthentication from "@/views/set/company/addAuthentication";
export default {
    name: "billDetails",
    props: {
        id: {
            type: String
        },
    },
    components: {
        AddTransferHelp,
        DeptEmployeeTree,
        OpenWallet,
        CollectionAccount,
        AddAuthentication,
        VNodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes,
        },
    },
    data() {
        return {
            previewVisible: false,
            previewImage: '',
            activekey: 1,
            isEdit: false,
            isAlipayEdit:false,
            isWxpayEdit:false,
            isUnionpayEdit:false,
            isOnlinepayEdit:false,
            activeIndex: 0,
            copyTransfer: {},//账单view展示DTO
            showList: [],
            skeletonLoading:true,
            alipay:{
                account:'',
                advancedMode:'',
                advancedModeFlag:false,
                name:'',
                pid:'',
                qrCodeUrl:'',
            },
            alipayCopy:{},
            unionpay:{
                accountName:'',
                bank:'',
                cardNo:'',
                subBranch:'',
            },
            unionpayCopy:{},
            wxpay:{
                account:'',
                name:'',
                qrCodeUrl:'',
            },
            wxpayCopy:{},
            onlinePayCopy:{},
            onlinePay:{
                billAffirmEmpId:'',
                billAffirmEmpName:'',
                renterBearHandlingFeePercent:100,
                walletAccountAlias:'',
                walletAccountId:undefined,
            },
            addTransferHelpShow:false,
            alipayReUpload:false,
            wxpayReUpload:false,
            sendData2_1: {},
            sendData2_2: {},
            item2_1: [],
            item2_2: [],
            openWalletShow:false,
            isRefresh:false,
            collectionAccountDialog:false,
            collectionAccountTitle:'',
          collectionAccountDept:'',
            certificationStatus:0,    //0.未申请；1.待审批；2.已审批通过；3.已驳回
            failReason:'',            //驳回原因
            addAuthenticationDialog:false,
            showFlag:true,
          alipayLoading:false,
          unionpayLoading:false,
          wxpayLoading:false,
          onlinePayLoading:false,
          listFreshFlag:false,
          waSimpleList:[],
        }
    },
    created() {
        this.getTransfer();
        this.waListSimple();
        this.getCertificationStatus();
    },
    mounted() {
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
    methods: {
        //来自钱包自定义搜索
        filterOption(inputValue,option){
          if(!inputValue){
            return true;
          }
          return option.componentOptions.children[0].text.indexOf(inputValue) > -1;
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
        openCollectionAccountDialog(data){
          if(!this.onlinePay.walletAccountId){
            this.$message.warning('此门店未设置线上收款账号，不可设置分账信息；分账信息仅对线上支付生效');
            return ;
          }
            this.collectionAccountDialog = true;
            this.collectionAccountTitle = "'"+data.deptName+"'设置分账";
            this.collectionAccountDept = data.deptName;
        },
      cancelSaveCollectionAccount(res){
        this.collectionAccountDialog = false;
        if(res){
          this.$emit('refreshinfoFun',true);
          this.getTransfer();
        }
      },
        saveSuccessCollectionAccount(){
          this.$emit('refreshinfoFun',true);
            this.collectionAccountDialog = false;
            this.getTransfer();
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
        selectDeptEmp(selectObj){
            if (selectObj.type == 'employee') {
                this.onlinePay.billAffirmEmpId = selectObj.id;
                this.onlinePay.billAffirmEmpName = selectObj.name;
            }
        },
        waListSimple(){
          this.listFreshFlag = false;
            waListSimple().then(res =>{
                if(res.code === '200'){
                    this.listFreshFlag = true;
                    this.waSimpleList = res.data;
                }
            })
        },
        onlinepayEdit(){
            this.isOnlinepayEdit=true;
            this.onlinePay = {
                billAffirmEmpId:'',
                billAffirmEmpName:'',
                renterBearHandlingFeePercent:100,
                walletAccountAlias:'',
                walletAccountId:undefined,
            };
        },
        cancelBind(val){
            //解绑操作
            let unBindTarget = '';
            let title = '';
            let warnningTitle = '';
            let warnningContent = '';
            if(val==1){
                unBindTarget = 11;
                title = '支付宝收款信息';
                warnningTitle = '确定解绑「' + this.copyTransfer.deptName + '」的支付宝收款信息吗？';
                warnningContent = '解除绑定后，租客将无法保存该支付宝信息进行转账，请谨慎操作';
            }
            else if(val==2){
                unBindTarget = 12;
                title = '微信收款信息';
                warnningTitle = '确定解绑「' + this.copyTransfer.deptName + '」的微信收款信息吗？';
                warnningContent = '解除绑定后，租客将无法保存该微信信息进行转账，请谨慎操作';
            }
            else if(val==3){
                unBindTarget = 13;
                title = '银行卡收款信息';
                warnningTitle = '确定解绑「' + this.copyTransfer.deptName + '」的银行卡收款信息吗？';
                warnningContent = '解除绑定后，租客将无法保存该银行信息进行转账， 请谨慎操作';
            }
            else if(val==4){
                unBindTarget = 21;
                title = '线上支付信息';
                warnningTitle = '确定解除钱包「'+ this.onlinePayCopy.walletAccountAlias + '」与门店「' + this.copyTransfer.deptName + '」的绑定信息吗？';
                warnningContent = '解除绑定后，租客线上支付将不可用，请谨慎操作';
            }
            let _this = this;
            let data ={
                unBindTarget:unBindTarget,
                id:this.id,
            };
            this.$modal.confirm({
                title: warnningTitle,
                content: warnningContent,
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    API.collectionAccountUnBind(data).then(res => {
                        if (res.code === '200') {
                            _this.$message.success(title+'解绑成功');
                            _this.$emit('refreshinfoFun',true);
                            _this.getTransfer();
                        } else {
                            this.$message.success(title+'解绑失败');
                        }
                    });
                },
                onCancel() {
                },
            });
        },
        cancelSaveAccount(val){
            if(val==1){
                this.isAlipayEdit=false;
                this.alipay = {
                    account:'',
                    advancedMode:'',
                    advancedModeFlag:false,
                    name:'',
                    pid:'',
                    qrCodeUrl:'',
                };
            }
            else if(val == 2){
                this.isWxpayEdit = false;
                this.wxpay = {
                    account:'',
                    name:'',
                    qrCodeUrl:'',
                };
            }
            else if(val == 3){
                this.isUnionpayEdit=false;
                this.unionpay = {
                    accountName:'',
                    bank:'',
                    cardNo:'',
                    subBranch:'',
                };
            }
            else if(val == 4){
                this.isOnlinepayEdit=false;
                this.onlinePay = {
                    billAffirmEmpId:'',
                    billAffirmEmpName:'',
                    renterBearHandlingFeePercent:100,
                    walletAccountAlias:'',
                    walletAccountId:undefined,
                };
            }
        },
        saveAccount(val){
            //修改操作
            if(val==1){
                if (this.$refs.img2_1&&this.$refs.img2_1.picsList.length != 0) {
                    this.alipay.qrCodeUrl = this.$refs.img2_1.picsList[0].origin;
                }
                if(this.alipay.advancedMode == 1){
                    this.alipay.qrCodeUrl = '';
                    if(!this.alipay.account||!this.alipay.name||!this.alipay.pid){
                        this.$message.warning('请完善配置的支付宝收款账号信息');
                        return;
                    }
                }
                else{
                    this.alipay.pid = '';
                    if(!this.alipay.account||!this.alipay.name||!this.alipay.qrCodeUrl){
                        this.$message.warning('请完善配置的支付宝收款账号信息');
                        return;
                    }
                }
                let data ={
                    alipay:this.alipay,
                    id:this.id,
                };
                this.alipayLoading = true;
                API.collectionAccountEdit(data).then(res => {
                  if(!res){
                    this.alipayLoading = false;
                  }
                    if (res.code === '200') {
                      this.alipayLoading = false;
                        this.$message.success('支付宝收款账号信息修改成功');
                        this.$emit('refreshinfoFun',true);
                        this.getTransfer()
                    } else {
                      this.alipayLoading = false;
                        this.$message.success('支付宝收款账号信息修改失败');
                    }
                    this.isAlipayEdit = !this.isAlipayEdit;
                });
            }
            else if(val==2){
                if (this.$refs.img2_2.picsList.length != 0) {
                    this.wxpay.qrCodeUrl = this.$refs.img2_2.picsList[0].origin;
                }
                if(!this.wxpay.account||!this.wxpay.name||!this.wxpay.qrCodeUrl){
                    this.$message.warning('请完善配置的微信收款账号信息');
                    return;
                }
                let data ={
                    wxpay:this.wxpay,
                    id:this.id,
                };
                this.wxpayLoading = true;
                API.collectionAccountEdit(data).then(res => {
                  if(!res){
                    this.wxpayLoading = false;
                  }
                    if (res.code === '200') {
                      this.wxpayLoading = false;
                        this.$message.success('微信收款账号信息修改成功');
                        this.$emit('refreshinfoFun',true);
                        this.getTransfer()
                    } else {
                      this.wxpayLoading = false;
                        this.$message.success('微信收款账号信息修改失败');
                    }
                    this.isWxpayEdit = !this.isWxpayEdit;
                });
            }
            else if(val==3){
                //检查银行卡配置完整性
                if(!this.unionpay.accountName||!this.unionpay.bank||!this.unionpay.cardNo||!this.unionpay.subBranch){
                    this.$message.warning('请完善配置的银行卡收款账号信息');
                    return;
                }
                let data ={
                    unionpay:this.unionpay,
                    id:this.id,
                };
                this.unionpayLoading = true;
                API.collectionAccountEdit(data).then(res => {
                  if(!res){
                    this.unionpayLoading = false;
                  }
                    if (res.code === '200') {
                      this.unionpayLoading = false;
                        this.$message.success('银行卡收款账号信息修改成功');
                        this.$emit('refreshinfoFun',true);
                        this.getTransfer()
                    } else {
                      this.unionpayLoading = false;
                        this.$message.success('银行卡收款账号信息修改失败');
                    }
                    this.isUnionpayEdit = !this.isUnionpayEdit;
                });
            }
            else if(val==4){
                //检查在线支付配置完整性
                if(!this.onlinePay.billAffirmEmpId||!this.onlinePay.walletAccountId||!this.onlinePay.renterBearHandlingFeePercent){
                    this.$message.warning('请完善线上支付信息');
                    return;
                }
                this.waSimpleList.forEach((item)=>{
                    if(item.id == this.onlinePay.walletAccountId){
                        this.onlinePay.walletAccountAlias = item.name;
                    }
                });
                let data ={
                    onlinePay:this.onlinePay,
                    id:this.id,
                };
              this.onlinePayLoading = true;
                API.collectionAccountEdit(data).then(res => {
                  if(!res){
                    this.onlinePayLoading = false;
                  }
                    if (res.code === '200') {
                      this.onlinePayLoading = false;
                        this.$message.success('线上支付信息修改成功');
                        this.$emit('refreshinfoFun',true);
                        this.getTransfer();
                    } else {
                      this.onlinePayLoading = false;
                        this.$message.success('线上支付信息修改失败');
                    }
                    this.isOnlinepayEdit = !this.isOnlinepayEdit;
                });
            }
        },
        enable(data){
            let _this = this;
            let id = data.id;
            this.$modal.confirm({
                title: '确定要启用 「' + data.deptName + '」 的收款账号吗？',
                content: '启用后，本部门的租客在线上转账时会直接转入本门店设置的账号内',
                okText: '确定',
                cancelText: '取消',
                icon: () => <icon-font type="iconyumengtubiao_chenggong" style="color:green" />,
                onOk() {
                    API.collectionAccountEnableDisable(id,1).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            _this.$message.success('操作成功！');
                            _this.$emit('refreshinfoFun',true);
                            _this.getTransfer();
                        }
                    })
                },
                onCancel() {
                },
            });
        },
        disable(data){
            let _this = this;
            let id = data.id;
            this.$modal.confirm({
                title: '确定要禁用 「' + data.deptName + '」 的收款账号吗？',
                content: '禁用后，本部门的租客在线上转账时将直接转入上级门店的收款账号内',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    API.collectionAccountEnableDisable(id,0).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            _this.$message.success('操作成功！');
                            _this.$emit('refreshinfoFun',true);
                            _this.getTransfer();
                        }
                    })
                },
                onCancel() {
                },
            });
        },
        deleteTransfer(data){
            let _this = this;
            let id = data.id;
            this.$modal.confirm({
                title: '确定要删除 「' + data.deptName + '」 的收款账号吗？',
                content: '删除后，本部门的租客在线上转账时将直接转入上级门店的收款账号内',
                okText: '确定',
                cancelText: '取消',
                icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
                onOk() {
                API.collectionAccountRemove(id).then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        _this.$message.success('操作成功！');
                        _this.$emit('successDelete');
                    }
                })
            },
            onCancel() {
            },
        });
        },
        getTransfer() {
            this.skeletonLoading = true;
            API.collectionAccountView(this.id).then(res => {
                if (res.code === '200') {
                    let temp = res.data;
                    this.copyTransfer = Object.assign({}, temp);
                    if(this.copyTransfer.alipay){
                        this.alipay = this.copyTransfer.alipay;
                        this.item2_1 = [];
                        if(this.copyTransfer.alipay.qrCodeUrl){
                            let pic={
                                bizId:'1',
                                bizType:9,
                                id:'1',
                                origin:this.copyTransfer.alipay.qrCodeUrl,
                                status:'done',
                            };
                            this.item2_1.push(pic);
                        }
                    }
                    if(this.copyTransfer.wxpay){
                        this.wxpay = this.copyTransfer.wxpay;
                        this.item2_2 = [];
                        if(this.copyTransfer.wxpay.qrCodeUrl){
                            let pic={
                                bizId:'1',
                                bizType:9,
                                id:'1',
                                origin:this.copyTransfer.wxpay.qrCodeUrl,
                                status:'done',
                            };
                            this.item2_2.push(pic);
                        }
                    }
                    if(this.copyTransfer.unionpay){
                        this.unionpay = this.copyTransfer.unionpay;
                    }
                    if(this.copyTransfer.onlinePay){
                        this.onlinePay = this.copyTransfer.onlinePay;
                        if(!this.onlinePay.walletAccountId){
                            this.onlinePay.walletAccountId = undefined;
                        }
                    }
                    this.alipayCopy = Object.assign({},this.alipay);
                    this.wxpayCopy = Object.assign({},this.wxpay);
                    this.unionpayCopy = Object.assign({},this.unionpay);
                    this.onlinePayCopy = Object.assign({},this.onlinePay);
                }
                this.skeletonLoading = false;
            })
        },
        editData() {
            this.isEdit = true;
        },
        handleCallback(val) {
            this.activekey = val;
        },
        handlePreview(file) {
            this.previewImage = file;
            this.previewVisible = true;
        },
        handleCancel() {
            this.previewVisible = false;
        },
        editSuccess(res){
          if(res){
            this.isEdit = false;
            this.getTransfer();
            this.$emit('refreshinfoFun', true);
          }
        },
        billProcessFun() {
            this.billProcessDialog = true;
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
    }

}
</script>

<style scoped lang="less">
.billTransfer-box {
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
    .child-detail {
        height: calc(100vh - 150px);
        overflow: auto;
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
            margin-bottom: 25px;
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
                    color: #FFA036;
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
                width: calc(100% - 160px);
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
                    width: 50px;
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
                .titleIcon{
                    width:3px;
                    height:16px;
                    background:rgba(10,135,248,1);
                    margin-top: 7px;
                }
                .title{
                    color: #111111;
                    font-size: 16px;
                    font-weight: 500;
                    margin-bottom: 11px;
                    padding-left: 12px;
                    margin-top: 4px;
                }
                .littleTitle{
                    .titleStyle{
                        font-size: 14px;
                        color: #111111;
                    }
                    .operateStyle{
                        margin-right: 14px;
                        color: #0A87F8;
                        span{
                            height: 24px;
                            line-height: 24px;
                            border-radius:4px;
                            font-size: 14px;
                            padding: 5px 17px;
                        }
                        .saveStyle{
                            background: #0A87F8;
                            color: #FFFFFF;
                        }
                        .cancelStyle{
                            background:rgba(246,247,248,1);
                            border:1px solid rgba(221,221,221,1);
                            color: #666666;
                            margin-right: 10px;
                        }
                    }
                }
                .input-info {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    padding: 14px;
                    .unConfigStyle{
                        color: #111111;
                        font-size: 12px;
                        margin: 1px 0 6px 0;
                    }
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
                    .showImg {
                        .showImgDetail{
                            height: 88px;
                            width: 88px;
                            line-height: 88px;
                            border: 1px solid #eeeeee;
                            background-color: #f6f7f8;
                            text-align: center;
                            overflow: hidden;
                            img {
                                width: auto;
                                max-width: 88px;
                                height: auto;
                                max-height: 88px;
                                overflow: hidden;
                            }
                        }
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
            }
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
    .checkBox{
        .allCheck{
            height: 24px;
            line-height: 24px;
            i{
                vertical-align: -0.25em;
                svg{
                    width: 16px;
                    height: 16px;
                }
            }
            .radiusStyle{
                background-color: #DDDDDD;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                margin-top: 4px;
            }
        }
        .checked{
            color: #0A87F8;
            .iconSize{
                width: 16px;
                height: 16px;
            }
        }
        .fontStyle{
            margin-left: 2px;
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
        }
        .inputStyle {
            width: 56px;
            height: 24px;
        }
        .margin15{
            margin-left: 15px;
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
        margin: 0;
    }
    & /deep/ .anticon {
        margin-right: 1px;
    }
    /deep/ .ant-input{
        padding: 7px 5px;
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
    .active {
        border-color: @themeColor!important;
        color: @themeColor!important;
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
</style>
