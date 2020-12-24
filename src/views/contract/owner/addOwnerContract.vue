<template>
    <div id="addOwnerContract" class="addOwnerContract-box">
        <label-item title="房源信息" border :mustFill="true">
            <div class="u-bottom-border address" :class="(searchAddressHaveValue==false&&this.communityList.length==0)?'noSearchAddress':''" v-if="!searchLoading">
                <a-select showSearch :placeholder="placeholder" :disabled="ownerContract!==''||addressFul" :value="contractForm.fullAddress" :class="{ 'must-fill-border': mustFillBorder  }" style="width: 100%;" :defaultActiveFirstOption="false"
                          :showArrow="false" :filterOption="false" @change="getCommunity" @search="selectCommunity" :not-found-content="null" @focus="focusCommunity" @blur="isEmpty" >
                    <a-select-option v-for="(item,index) in communityList" :key="item.houseId">{{ item.viewAddress }}</a-select-option>
                </a-select>
            </div>
            <div class="u-bottom-border address" :class="(searchAddressHaveValue==false&&this.communityList.length==0)?'noSearchAddress':''" v-else>
                <a-select showSearch :placeholder="placeholder" :disabled="ownerContract!==''||addressFul" :value="contractForm.fullAddress" :class="{ 'must-fill-border': mustFillBorder  }" style="width: 100%;" :defaultActiveFirstOption="false"
                          :showArrow="false" :filterOption="false" @change="getCommunity" @search="selectCommunity" @focus="focusCommunity" @blur="isEmpty" >
                    <div slot="notFoundContent">
                        <div style="width:100%;text-align: center;color: #FFA036;font-size: 14px;margin-top: 65px;" :style="!contractMustRelated?'':'margin-bottom: 65px;'">未在系统中检索到该房源，请核对房源信息是否输入有误</div>
                        <div v-if="!contractMustRelated" style="width:100%;text-align: center;color: #000000;font-size: 14px;margin-bottom: 130px;">您也可以先添加，后续再进行关联操作</div>
                    </div>
                    <a-select-option v-for="(item,index) in communityList" :key="item.houseId">{{ item.viewAddress }}</a-select-option>
                </a-select>
            </div>
            <div class="close-icon-style cursor" v-if="contractForm.fullAddress&&canClearHouseIdflag" @click="clearFullAddress">
                <icon-font class="close-icon cursor" type="iconyumengtubiao_guanbi-3" />
            </div>
            <p v-if="errFul" class="err-p">未在系统检测到该房源信息；您可以先添加业主合同信息，后续再进行关联操作</p>
            <p v-if="mustRelatedFul" class="err-p-red">请完善合同地址：在合同地址框内输入地址并在检索结果中选择</p>
        </label-item>
        <label-item title="业主信息" border class="title-tiem">
            <a-row :gutter="30">
                <a-col class="width-140 f-fl">
                    <label-item title="姓名" :mustFill="true">
                        <div class="u-bottom-border gender-box">
                            <a-input v-model="contractForm.contractSignerForm.name" placeholder="请输入姓名" @change="changePayeeName" />
                            <div class="gender-span">
                                <span :class="{ genderNan:genderNanIng}" @click="genderNan">先生</span>
                                <span :class="{ genderNv:genderNvIng}" @click="genderNv">女士</span>
                            </div>
                        </div>
                    </label-item>
                </a-col>
                <a-col class="width-140 f-fl">
                    <label-item title="电话" :mustFill="true">
                        <div class="u-bottom-border">
                            <a-input v-model="contractForm.contractSignerForm.phone" :maxlength="11" @keyup.native="mixin_integerFilter('contractForm.contractSignerForm.phone')" @blur="checkPhone(contractForm.contractSignerForm.phone)" placeholder="请输入电话" />
                        </div>
                    </label-item>
                </a-col>
                <a-col class="width-280 f-fl">
                    <label-item title="身份信息" :mustFill="true">
                        <div class="u-bottom-border address">
                            <a-select v-model="contractForm.contractSignerForm.certificateType" @blur="checkIdentityCard" style="min-width: 120px" :disabled="certificateDis">
                                <a-select-option :value="1">身份证</a-select-option>
                                <a-select-option :value="2">护照</a-select-option>
                                <a-select-option :value="3">港澳通行证</a-select-option>
                                <a-select-option :value="4">台湾同胞证</a-select-option>
                                <a-select-option :value="5">企业营业执照</a-select-option>
                                <a-select-option :value="6">其他</a-select-option>
                            </a-select>
                            <a-input v-model="contractForm.contractSignerForm.certificateNo" @blur="checkIdentityCard(contractForm.contractSignerForm.certificateNo,contractForm.contractSignerForm.certificateType)" :maxlength="20" placeholder="请输入" />
                        </div>
                    </label-item>
                </a-col>
            </a-row>
            <a-row :gutter="30" style="margin-top:13px;">
                <a-col class="width-140 f-fl">
                  <label-item title="收款人姓名">
                    <div class="u-bottom-border">
                        <a-input v-model="contractForm.contractSignerForm.payeeName" :maxlength="20" placeholder="请输入姓名" />
                    </div>
                  </label-item>
                </a-col>
                <a-col class="width-280 f-fl" style="width: 520px;">
                    <label-item title="收款账号信息" :mustFill="true">
                        <div class="u-bottom-border address">
                            <a-select v-model="contractForm.contractSignerForm.paymentType" style="min-width: 80px" @change="selectPaymentType">
                                <a-select-option :value="1">银联</a-select-option>
                                <a-select-option :value="2">支付宝</a-select-option>
                                <a-select-option :value="3">微信</a-select-option>
                            </a-select>
                            <a-input :style="contractForm.contractSignerForm.paymentType==1?'width: 260px':'width: 400px'" v-model="contractForm.contractSignerForm.paymentNo" :maxlength="19" placeholder="请输入账号" @blur="getBankName"/>
                            <div class="dividerClass" v-if="contractForm.contractSignerForm.paymentType == 1"></div>
                            <a-input style="width: 140px" v-if="contractForm.contractSignerForm.paymentType == 1" v-model="contractForm.contractSignerForm.bank" :maxlength="10" placeholder="所属银行" />
                        </div>
                    </label-item>
                </a-col>
                <a-col class="width-140 f-fl" style="width: 320px;">
                    <label-item title="紧急联系人姓名">
                        <div class="u-bottom-border address">
                            <a-select v-model="contractForm.contractSignerForm.emergencyType" style="min-width: 100px">
                                <a-select-option v-for="(item,index) in relationshipList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                            <a-input v-model="contractForm.contractSignerForm.emergencyName" :maxlength="11" placeholder="请输入" />
                        </div>
                    </label-item>
                </a-col>
                <a-col class="width-140 f-fl">
                    <label-item title="紧急联系人电话">
                        <div class="u-bottom-border address">
                            <a-input v-model="contractForm.contractSignerForm.emergencyPhone" @keyup.native="mixin_integerFilter('contractForm.contractSignerForm.emergencyPhone')" @blur="checkPhone(contractForm.contractSignerForm.emergencyPhone)" :maxlength="11" placeholder="请输入" />
                        </div>
                    </label-item>
                </a-col>
            </a-row>
        </label-item>
        <div class="titlepz f-clearfix">
            证件信息
            <span>（附件支持格式：jpg、png、jpeg）</span>
            <!-- 上传图片 -->
        </div>
        <div class="f-clearfix uplodList">
            <own-upload style="padding-right: 15px" class="f-fl" :picList="item2_1" :uploadParms="sendData2_1" :maxLength="1" :showTips="false" ref="img2_1">
                <img src="../../../assets/login/idzheng.png" style="width: 120px;height: 76px" class="choose" />
            </own-upload>
            <own-upload style="padding-right: 15px" class="f-fl" :picList="item2_2" :uploadParms="sendData2_2" :maxLength="1" :showTips="false" ref="img2_2">
                <img src="../../../assets/login/idfan.png" style="width: 120px;height: 76px" class="choose" />
            </own-upload>
        </div>
        <div class="f-clearfix upload-p">
            <p class="f-fl">
                <span style="font-size: 12px;color: #777777">身份证正面</span>
                <span style="color:red">*</span>
            </p>
            <p class="f-fl">
                <span style="font-size: 12px;color: #777777">身份证反面</span>
                <span style="color:red">*</span>
            </p>
        </div>
        <label-item title="合同信息" border class="title-tiem">
            <a-row :gutter="30">
                <a-col class="width-140 f-fl">
                    <label-item title="签约类型">
                        <div class="u-bottom-border gender-box">
                            <a-select v-model="contractForm.signType" style="min-width: 140px">
                                <a-select-option :value='1'>新签</a-select-option>
                                <a-select-option :value='2'>续签</a-select-option>
                            </a-select>
                        </div>
                    </label-item>
                </a-col>
                <a-col class="width-140 f-fl">
                    <label-item title="合同编号">
                        <div class="u-bottom-border">
                            <a-input v-model="contractForm.contractNo" placeholder="请输入" />
                        </div>
                    </label-item>
                </a-col>
                <a-col class="width-280 f-fl">
                    <label-item title="合同周期" :mustFill="true">
                        <div class="contentSlot">
                            <div class="contract-times">
                                <div class="text-date-picker u-no-border address">
                                    <!--<a-range-picker v-model="timeDateList" :format="dateFormat" @change="onChange" :allowClear="false" /> -->
                                    <a-date-picker
                                            v-model="contractForm.beginTime"
                                            :disabledDate="disabledStartDate"
                                            :format="dateFormat"
                                            placeholder="开始"
                                            @openChange="handleStartOpenChange"
                                            :allowClear="false"
                                            @change="changeDate"
                                    />
                                    <a-date-picker
                                            v-model="contractForm.endTime"
                                            :disabledDate="disabledEndDate"
                                            :format="dateFormat"
                                            placeholder="结束"
                                            :open="endOpen"
                                            @openChange="handleEndOpenChange"
                                            :allowClear="false"
                                            @change="changeDate"
                                    />
                                </div>
                                <div class="splitStyle">-</div>
                            </div>
                            <ul class="year-radio">
                                <li @click="quickSelectYear(1);changeQuickDate()">1年</li>
                                <li @click="quickSelectYear(2);changeQuickDate()">2年</li>
                                <li @click="quickSelectYear(3);changeQuickDate()">3年</li>
                                <li @click="quickSelectYear(5);changeQuickDate()">5年</li>
                            </ul>
                            <div class="common-time">总计{{timeDate}}</div>
                        </div>
                    </label-item>
                </a-col>
                <a-col class="width-140 f-fl">
                    <label-item title="月租金" :mustFill="true" addonAfter="元/月">
                        <div class="u-bottom-border address mosaic">
                            <a-input placeholder="请输入月租金" v-model="contractForm.price" @input.native="priceReg1" />
                        </div>
                    </label-item>
                </a-col>
                <a-col class="width-140 f-fl">
                    <label-item title="押金" :mustFill="true" addonAfter="元">
                        <div class="u-bottom-border address mosaic">
                            <a-input placeholder="请输入押金" v-model="contractForm.deposit" @input.native="priceReg2" />
                        </div>
                    </label-item>
                </a-col>
                <a-col class="width-140 f-fl">
                    <label-item title="付款方式" :mustFill="true">
                        <div class="u-bottom-border address payment">
                            <p class="pay1">押</p>
                            <a-select v-model="contractForm.depositMonth" @change="resetGrading" style="width:50%">
                                <a-select-option v-for="(item,index) in options12" :key="index" :value="item.value">{{item.value===90?'自定义':item.value}}</a-select-option>
                            </a-select>
                            <p class="pay2" :class="{ 'nonePay': contractForm.periodMonth !==99  }" v-if="contractForm.periodMonth!==99">付</p>
                            <a-select v-model="contractForm.periodMonth" @change="resetGrading" style="width:50%" class="fu-box" :class="{ 'fu-nonebox': contractForm.periodMonth ==99  }">
                                <a-select-option v-for="(item,index) in options13" :key="index" :value="item.value">{{item.value===99?'一次性付':item.value}}</a-select-option>
                            </a-select>
                        </div>
                    </label-item>
                </a-col>
            </a-row>
            <a-row :gutter="30" class="bgBox">
                <a-col class="width-140 f-fl" style="margin-top: 26px;">
                    <label-item title="免租期" :mustFill="true" addonAfter="天">
                        <div class="u-bottom-border address mosaic">
                            <a-input v-model="contractForm.freeDays" style="text-align: center" @keyup.native="resetGrading"/>
                        </div>
                    </label-item>
                </a-col>
                <a-col class="width-280 f-fl" style="margin-left:15px;margin-right: 30px;">
                    <label-item class="u-bottom-border" title="收租日设置" :mustFill="true">
                        <a-radio-group class="payPattern f-fl" name="radioGroup" v-model="contractForm.payPattern" @change="payPatternChange(true)" style="argin-left: 9px;">
                            <a-radio :value="1">提前</a-radio>
                            <a-radio :value="2">固定</a-radio>
                            <a-radio :value="3">固定</a-radio>
                        </a-radio-group>
                        <div class="payPatternBox u-bottom-border">
                            <p>
                                <a-input placeholder="请输入" style="text-align: center" v-model="payPatternValue1" />天付款</p>
                            <p>
                                <a-input placeholder="请输入" style="text-align: center" v-model="payPatternValue2" />号付款
                                <span>(每期第一个月）</span>
                            </p>
                            <p>
                                <a-input placeholder="请输入" style="text-align: center" v-model="payPatternValue3" />号付款
                                <span>(每期提前一个月）</span>
                            </p>
                        </div>
                    </label-item>
                </a-col>
                <a-col class="width-280 f-fl" style="margin-right: 30px;position: relative;">
                    <label-item class="u-bottom-border" title="零散租期设置" :mustFill="true">
                        <a-tooltip placement="top"  title="请先完善合同周期及租金信息再进行设置">
                            <icon-font style="color:#FFA036;font-size:14px;position: absolute;left: 0px;top: 5px;width:180px" type="iconyumengtubiao_bangzhu" v-if="contractForm.beginTime === '' || this.contractForm.endTime === '' || !this.contractForm.price" />
                        </a-tooltip>
                        <a-radio-group class="isFirst" name="radioGroup" v-model="contractForm.isFirst" :disabled="(contractForm.beginTime === '' ||
                                 this.contractForm.endTime === '' || !this.contractForm.price)" >
                            <a-radio :value="2">不设置</a-radio>
                            <a-radio :value="1">零散租期前置</a-radio>
                            <a-radio :value="0">零散租期后置</a-radio>
                        </a-radio-group>
                    </label-item>
                </a-col>
                <a-col class="width-280 f-fl"  style="position: relative;">
                    <label-item class="u-bottom-border" title="自定义付款周期设置" :mustFill="true">
                          <a-tooltip placement="top"  title="请先完善合同周期及租金信息再进行设置">
                            <icon-font style="color:#FFA036;font-size:14px;position: absolute;left: 30px;top: 5px;width:200px" type="iconyumengtubiao_bangzhu" v-if="contractForm.beginTime === '' || this.contractForm.endTime === '' || !this.contractForm.price" />
                        </a-tooltip>  
                        <a-radio-group class="isFirst" name="radioGroup" v-model="custom" @change="fenkanshowFk" :disabled="(contractForm.beginTime === '' ||
                                 this.contractForm.endTime === '' || !this.contractForm.price)" >
                            <a-radio :value="1">不自定义</a-radio>
                            <a-radio :value="2">自定义</a-radio>
                        </a-radio-group>
                       
                    </label-item>
                </a-col>
            </a-row>
            <a-row>
                <!-- 分阶费用 -->
                <grading-dialog :beginTime="contractForm.beginTime" :endTime="contractForm.endTime" :gradingData="postGradingData" @haveGrading="changeGradingStatus" :openGradingMath="openGradingMath" :resetGradingMath="resetGradingMath" @emitGrading="getGrading" @emitZeroAfter="emitZeroAfter" @emitZeroBefore="emitZeroBefore" :tenantFirst="contractForm.isFirst" v-if="customshow" :custom="custom" :price="contractForm.price*100"></grading-dialog>
            </a-row>
        </label-item>
        <div class="contract-other cursor" @click="addExpenses(true)" v-if="otherExpenses.length==0">
            <icon-font style="font-size:16px;" type="iconyumengtubiao_tianjiazijian" /> 其他费用
        </div>
        <label-item title="加收费用" v-else>
            <div class="contract-modular" style="width:648px;">
                <div class="content-row">
                    <div class="together-item">
                        <div class="together-detail">
                            <div class="together-title">
                                <div style="max-width: 190px">费用类型</div>
                                <div style="max-width: 222px">付款方式 </div>
                                <div style="max-width: 277px">金额 </div>
                                <div style="max-width: 62px;text-align: center">操作</div>
                            </div>
                            <div class="together-data u-no-border" v-for="(item,index) in otherExpenses" :key="index">
                                <div style="max-width: 190px;text-align: left;padding: 0 9px;">
                                    <a-cascader class="myCascader" style="width: 140px;" placeholder="请选择" :allowClear="false" :options="costTabsContent" :fieldNames="elcostcascaderValue" @change="(value) => costSelect(value, index)"></a-cascader>
                                </div>
                                <div class="feiyong" style="max-width: 222px;text-align: left;">
                                    <a-select v-model="item.periodMonth" @change="resetGrading" style="min-width: 140px;padding: 0 9px;" :class="{ 'fu-nonebox': item.periodMonth ==99  }">
                                        <a-select-option v-for="(item,index) in options14" :key="index" :value="item.value">{{item.value===99?'一次性付':item.value===100?'随房租付':item.value===1?'月付':item.value===2?'2月付':item.value===3?'季付':item.value===6?'半年付':item.value===12?'年付':'自定义'}}</a-select-option>
                                    </a-select>
                                </div>
                                <div style="max-width: 277px">
                                    <span v-if="item.periodMonth===99">共</span>
                                    <a-input style="width:140px;" v-model="item.price" @keyup.native="mixin_moneyFilter('otherExpenses.'+index+'.price',99999999.99)"></a-input>
                                    <span v-if="item.periodMonth===99">元</span>
                                    <span v-else>元/月</span>
                                </div>
                                <div class="options f-clearfix" style="max-width: 62px">
                                    <icon-font @click="reduceExpenses(index)" class="fl delete-icon" type="iconyumengtubiao_shanchu-"></icon-font>
                                </div>
                            </div>
                            <div class="together-foot cursor">
                                <p @click="addExpenses(false)">
                                    <icon-font style="font-size:16px;color:#0A87F8;" type="iconyumengtubiao_tianjiazijian" /> 其他费用</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </label-item>
        <label-item class="u-bottom-border" style="width: 100%" title="合同补充说明" :valLength="contractForm.addExplanation.length" :maxSize="200">
            <a-textarea v-model="contractForm.addExplanation" maxlength="200" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入" />
        </label-item>
        <div class="titlepz f-clearfix">
            合同附件
            <span>（附件支持格式：jpg、png、jpeg、pdf）</span>
            <!-- 上传图片 -->
        </div>
        <upload-file :picList="contractForm.fileIds" accept=".jpg, .jpeg, .png, .pdf" :uploadParms="sendData3_2" :showTips="false" ref="img3_2">
            <img src="../../../assets/login/other.png" style="width: 120px;height: 76px" class="choose" />
        </upload-file>
        <label-item class="maintainer u-bottom-border" title="签约信息" border style="margin-bottom: 50px;">
            <a-row :gutter="30">
              <a-col class=" f-fl" style="width:300px">
                <label-item title="所属门店(部门)" :mustFill="true" v-if="!contractForm.houseId">
                  <store-tree resMark="mk_contract_owner" :defaultValue='contractForm.deptName' @cancelOtherTree="cancelOtherTree(1)" placement="topLeft" ref="selectDept" width="200px" @selectChange="selectDept" :show-employee="false"></store-tree>
                </label-item>
              </a-col>
                <a-col class=" f-fl" style="width:300px" v-if="!contractForm.houseId">
                    <label-item title="维护人">
                        <dept-employee-tree resMark="mk_contract_owner" ref="selectMaintainer" @cancelOtherTree="cancelOtherTree(2)" @selectChange="selectDeptEmp" placement="topLeft" :disableDept="true" :defaultValue="contractForm.signMaintainName" placeholder='请选择维护人'>
                        </dept-employee-tree>
                    </label-item>
                </a-col>
                <a-col class=" f-fl" style="width:300px">
                    <label-item title="签约人" :mustFill="true">
                        <dept-employee-tree resMark="mk_contract_owner" ref="selectEmp" @cancelOtherTree="cancelOtherTree(3)" @selectChange="singDeptEmp" placement="topLeft" v-if="contractForm.signEmpName" :defaultValue="contractForm.signEmpName"  :disableDept="true" placeholder='请选择签约人'>
                        </dept-employee-tree>
                    </label-item>
                </a-col>
                <a-col class="width-140 f-fl">
                    <label-item class="u-bottom-border" title="签约时间" :mustFill="true">
                        <!-- <div> -->
                        <a-date-picker placeholder="签约日期" v-model="contractForm.signTime" format="YYYY-MM-DD" />
                        <!-- </div>   -->
                    </label-item>
                </a-col>
            </a-row>

        </label-item>

        <div class="clearfix" style="margin:0;">
            <a-button class="f-fr save-contract" type="warning" @click="saveContract" :loading="saveLoading" >核对账单</a-button>
            <a-button class="f-fr quxiao" style="margin-right:20px;" @click="cancelSaveOwnerContract" type="warning">取消</a-button>
            <div class="f-fr checkBillStyle">
              <a-checkbox v-model="isProduceRentDepositFlag">
                <span style="color: #111111;font-size: 14px;">生成房屋租金和押金账单</span>
                <span style="color: #FFA036;font-size: 12px;"> (此设置只针对租金和押金账单是否生成；不影响生成加收费用项账单)</span></a-checkbox>
            </div>
        </div>
        <!-- 账单预览 -->
        <bill-preview @confirmBill="confirmBill" :phone="contractForm.phone" ref="saveBillOwner" :houseId="contractForm.houseId" :deptId="contractForm.deptId" :postBillData="postBillData" v-if="billPreviewShow" :billData="billData" :show="billPreviewShow" @closeThis="billPreviewShow=false;saveLoading = false" @listDatafu="listDatafu" @paymentMethod="paymentMethodfu" :contractMedium="contractForm.contractMedium"></bill-preview>
    </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment';
import gradingDialog from './gradingOwner';
import {
    getContractTime,
    listFeeSubjectWithoutRentalFee,
    checkCard,
} from '@/api/contract.js';
import {
    ownerContractView,
    ownerContractCalView,
    ownerContractAdd,
    ownerContractReset,
} from '@/api/ownerContract.js';
import { getBankName } from '@/api/public.js';
import { searchHouse } from '@/api/reserve';
import { employeeUserInfo } from '@/api/enterprise';
import billPreview from './billPreview';
import DeptEmployeeTree from '@/components/DeptEmployeeTree';
import UploadFile from '@/components/OwnUpload/uploadFile';
import StoreTree from '@/components/DeptEmployeeTree/store';
import { bizDecisionGet } from '@/api/decision';
import {CURRENTDEPTID} from "@/store/mutation-types";
export default {
    name: "addOwnerContract",
    components: {
        gradingDialog,
        billPreview,
        DeptEmployeeTree,
        UploadFile,
      StoreTree,
    },
    props: {
        ownerContract: {   //合同ID
            type: String,
            default: ''
        },
        contractResetStatus: {  //重置合同
            type: Boolean,
            default: false
        },
        reserveFul:{       //预定列表录入合同
            type: Boolean,
            default: false
        },
        reserveData:{
            type:Object,
            required: false
        },
        houseFul:{        //房源详情录入合同
            type: Boolean,
            default: false
        },
        roomData:{
            type:Object,
            required: false
        }
    },
    data() {
        return {
            addressFul:false, // 预定签约时or房源签约 则不可更改房源地址
            certificateDis: false,  //身份信息下拉
            contractForm: {
                fullAddress: undefined,//房源地址
                contractMedium: 1,  //合同类型【1-纸质,2-电子】
                contractNo: '', //合同编号
                signType: 1,//签约类型【1-新签,2-续签】
                beginTime: undefined, //合同开始时间
                endTime: undefined,//合同结束时间
                price: '', //租金
                deposit: '', //押金
                periodMonth: 3, //付几（99-全付 100-随房租付 90-自定义）
                depositMonth: 1,//押几
                freeDays:0,//免租天数
                payPatternValue: 0,//收租模式值
                payPattern: 1, //收租模式【1-提前付款天数,2-固定付款日期,3-提前一个月固定付款日期】
                isFirst: 2,
                addExplanation: '', //合同补充说明
                maintainerId: '', // 维护人ID【默认签约人ID】
                signTime: null,//签约时间
                signEmpName: '',
                signMaintainName: '',
                otherExpenses: '', //其他费用集合【json】
                billInfos: [], //费用类型账单集合
                houseType: 0,
                contractPid: '', //续签的合同id（上一份合同id）
                houseId: '',  //房源id
                id: '', // 合同ID
                paymentMethod: '', //处理完成账单的支付方式
                signEmpId: '',//签约人ID
                sublevelContract: '',//分阶合同【json】
                fileIds: [],
                contractSignerForm:{
                    name: '',//真实姓名
                    gender: 1, //性别【1-男,2-女】
                    phone: '', //手机号
                    certificateType:1,//证件类型
                    certificateNo: '',//证件号码
                    payeeName:'',
                    paymentType: 1,//收付款方式【1银联2支付宝3微信4美团5携程】
                    paymentNo: '',//支付号码
                    bank:'',//所属银行
                    emergencyType: '1',//紧急联系人性质【1-父母2-兄弟姐妹3-同事4-同学5-朋友6-亲属7-配偶8-其它】
                    emergencyName: '', //紧急联系人姓名
                    emergencyPhone: '',//紧急联系人电话
                    fileIds:[],//附件信息
                },//合同租户信息
                contractId: '',//合同ID
                templateId: '',//合同模板ID
              deptName:'',
              deptId:'',
            },
            item2_1: [],
            item2_2: [],
            sendData2_1: {},
            sendData2_2: {},
            sendData3_2: {},
            imgId2_1: '',
            imgId2_2: '',
            imgId2_6: '',
            imgList2_4: [],
            imgList3_2: [],
            timeDateList: [],                   //合同周期
            dateFormat: 'YYYY.MM.DD',           //日期选择器格式
            timeDate: '',                       //合同周期时间回显
            payPatternValue1: '0',
            payPatternValue2: '',
            payPatternValue3: '',
            custom: 1,
            options13: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }, { value: 99 }],
            options12: [{ value: 90 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }],
            options14: [{ value:99 }, { value: 100 },{ value: 1 },{ value: 2 }, { value: 3 }, { value: 6 }, { value: 12 }],
            costTabsContent: [], // 费用类型
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
            elcostcascaderValue: {
                value: 'id',
                label: 'name',
                children: 'metaList'
            },
            scatteredInfoAfter: {},
            scatteredInfoBefore: {},
            placeholder: '请输入房源编号/小区地址/项目名称/门牌号信息检索房源',
            communityList: [],
            genderNanIng: true,
            genderNvIng: false,
            fileIds: [], //附件信息
            mustFillBorder: false,  //检验相关
            errFul: false,          //检验相关
            lastCheck: false,       //检验相关
            postGradingData: {},    //分阶相关
            openGradingMath: 0,     //分阶相关
            resetGradingMath: 0,    //分阶相关
            gradingData: [],        //分阶相关
            customshow: false,      //分阶相关
            otherExpenses: [],      // 其他费用
            billData: {},           //账单预览相关
            postBillData: {},        //账单预览相关
            billPreviewShow: false, //账单预览相关
            tempSignEmpInfo:{
                id:'',
                name:'',
            },
            fullAddressOld:'',
            saveLoading:false,
            endOpen: false,
            searchAddressHaveValue:false,
            searchLoading:false,
            checkedFeeSubjectIds:[], //已选择的费用科目
            originCostTabsContent:[],//原始的所有费用科目
            canClearHouseIdflag:true,
            contractMustRelated:false,
            mustRelatedFul:false,
            isProduceRentDepositFlag:true,
        }
    },
    created() {
        this.getCost();
        if(this.houseFul){
            this.canClearHouseIdflag = false;
        }
        if (this.ownerContract) {   // 续签模式
            ownerContractView(this.ownerContract).then(res => {
                if (res.code === '200') {
                    this.echoContract(res.data);
                  //防止2接口异步bug
                  this.getUserInfo();
                }
            });
            this.canClearHouseIdflag = false;
        } else {
            this.init();
          //防止2接口异步bug
          this.getUserInfo();
        }
        this.bizDecisionGetFun();
    },
    mounted() {
        this.sendData2_1 = { //
            // 上传时附带的额外参数
            bizId: '', // 房源id
            bizType: 2, // 图片大类标识 租客
            subBizType: 1, // 图片子类标识 身份证正面
            orderIndex: 1 // 排序值
        }
        this.sendData2_2 = {
            // 上传时附带的额外参数
            bizId: '', // 房源id
            bizType: 2, // 图片大类标识  租客
            subBizType: 2, // 图片子类标识 身份证反面
            orderIndex: 2 // 排序值
        }
        this.sendData3_2 = {
            // 上传时附带的额外参数
            bizId: '', // 房源id
            bizType: 3, // 图片大类标识 // 合同
            subBizType: 2, // 图片子类标识 // 合同附件
            orderIndex: 1 // 排序值
        }
    },
    methods: {
        changePayeeName(){
          this.contractForm.contractSignerForm.payeeName = this.contractForm.contractSignerForm.name;
          this.$forceUpdate();
        },
        //获取决策配置
        bizDecisionGetFun(){
            let paramter ={
                bizPoint: 'CONTRACT_BASE_RULE',
                // empId: id,
                mark: 'OWNER_CONTRACT_MUST_RELATED',
                module: 'CONTRACT'
            };
            bizDecisionGet(paramter).then(res=>{
                if(res.data&&res.data.onOff==1){
                    this.contractMustRelated = true;
                }
                else{
                    this.contractMustRelated = false;
                }
            });
        },
        changeDate(){
            if (!this.contractForm.beginTime || !this.contractForm.endTime) {
                return;
            }
            this.getCoTime();
        },
        disabledStartDate(startValue){
            const endValue = this.contractForm.endTime;
            if(!endValue || !startValue){
                return false;
            }
            return startValue.valueOf()- 86400000  >= endValue.valueOf();
        },
        disabledEndDate(endValue) {
            const startValue = this.contractForm.beginTime;
            if (!endValue || !startValue) {
                return false;
            }
            return startValue.valueOf() - 86400000 >= endValue.valueOf();

        },
        handleStartOpenChange(open) {
            if (!open&&!this.contractForm.endTime) {
                this.endOpen = true;
            }
        },
        handleEndOpenChange(open) {
            this.endOpen = open;
        },
        getUserInfo(){
            employeeUserInfo().then(res => {
                this.contractForm.signEmpId = res.data.empId;
                this.contractForm.signEmpName = res.data.name;
                if(!this.contractForm.deptId){
                    this.contractForm.deptId = res.data.deptId;
                    this.contractForm.deptName = res.data.deptName;
                }
                this.tempSignEmpInfo.id = res.data.empId;
                this.tempSignEmpInfo.name = res.data.name;
                this.initMaintainInfo();
            });
        },
        //房源地址相关
        isEmpty(res) {
            if (!this.contractForm.houseId) {
                this.mustFillBorder = true
            } else {
                this.mustFillBorder = false
            }
            if(this.fullAddressOld != res){
               this.contractForm.houseId = ''
               this.mustFillBorder = true
               this.errFul = true;
            }else{
               this.mustFillBorder = false
               this.errFul = false;
            }
            if(this.contractMustRelated && !this.contractForm.houseId){
                this.errFul = false;
                this.mustRelatedFul = true;
            }
        },
        clearFullAddress(){
            this.contractForm.fullAddress = undefined;
            this.contractForm.houseId = '';
            this.communityList = [];
        },
        getCommunity(communityId) {
            this.contractForm.houseId = communityId;
            this.mustFillBorder = false;
            this.communityList.forEach(function(e) {
                if (e.houseId == communityId) {
                    this.contractForm.fullAddress = e.fullAddress;
                    this.fullAddressOld = e.fullAddress;
                    this.contractForm.maintainerId = e.maintainerId;
                    this.$set(this.contractForm,'signMaintainName',e.maintainerName)
                    this.errFul = false;
                    this.mustRelatedFul = false;
                }
            }, this);
        },
        focusCommunity(searchVal){
            if(searchVal== undefined||searchVal==''){
                this.searchAddressHaveValue = false;
                this.communityList = [];
            }else{
                this.searchAddressHaveValue = true;
            }
        },
        selectCommunity(searchVal) {
            if(searchVal== undefined||searchVal==''){
                this.searchAddressHaveValue = false;
                this.communityList = [];
                this.searchLoading = false;
                return;
            }else{
                this.searchAddressHaveValue = true;
            }
            let data = {
                fuzzyKeyword: searchVal,
                useBiz:3,
            }
            this.contractForm.fullAddress = searchVal;
            searchHouse(data).then(res => {
                if (res.code == "200") {
                    if (res.data.length > 0) {
                        this.communityList = res.data;
                        this.errFul = false;
                    } else {
                        this.communityList = [];
                        this.errFul = true;
                    }
                    if(this.contractMustRelated){
                        this.mustRelatedFul = false;
                    }
                    this.searchLoading = true;
                }

            })
        },
        //修改性别相关
        genderNan() {
            this.genderNanIng = true;
            this.genderNvIng = false;
            this.contractForm.contractSignerForm.gender = 1;
        },
        genderNv() {
            this.genderNanIng = false;
            this.genderNvIng = true;
            this.contractForm.contractSignerForm.gender = 2;
        },
        
        //检查身份信息
        checkIdentityCard(certificateNo, certificateType) {
            if (certificateType === 1) {
                if (certificateNo === '') {
                    this.$message.error('请输入证件号');
                    return true;
                } else {
                    checkCard(certificateNo).then(res => {
                        if (res === undefined) {
                            this.$message.error('请输入正确身份证号');
                            return true;
                        } else {
                            if (res.code === '200') {
                                return false;
                            } else {
                                this.$message.error('请输入正确身份证号');
                                return true;
                            }
                        }

                    });
                }
            } else {
                if (certificateNo === '') {

                    this.$message.error('请输入证件号');
                    return true;
                } else {
                    return false;
                }
            }
        },
        //选择 银联/微信/支付宝
        selectPaymentType(value){
            if(value!=1){
                this.contractForm.contractSignerForm.bank ="";
            }
        },
        //获取银行卡所属银行
        getBankName(){
            if(this.contractForm.contractSignerForm.paymentType==1&&this.contractForm.contractSignerForm.paymentNo){
                getBankName(this.contractForm.contractSignerForm.paymentNo).then(res => {
                    if (res.data ) {
                        this.contractForm.contractSignerForm.bank = res.data;
                    }
                })
            }
        },
        //修改合同周期
        onChange(date, dateString) {
            this.contractForm.beginTime = date[0];
            this.contractForm.endTime = date[1];
            this.getCoTime();
        },
        //选择年/月修改合同周期
        quickSelectYear(year) {
            // 快速选择合同期限的结束时间
            if (this.contractForm.beginTime !== '') {
                // $moment(this.contractForm.beginTime).format('lll')
                let start = this.$moment(this.contractForm.beginTime).format('YYYY-MM-DD').split('-');
                let yue = start[1];
                let nian = start[0] * 1 + year;
                let endString = nian + '/' + yue + '/' + start[2];
                let end = new Date(endString);
                end = end.getTime() - 86400000;
                this.contractForm.endTime = this.$moment(end);
                let data = []
                data.push(moment(this.contractForm.beginTime));

                data.push(moment(this.contractForm.endTime));
                this.timeDateList = data;
            } else {
                this.$message.error('请先选择一个开始日期');
            }
            this.getCoTime();
        },
        changeQuickDate() {
            this.resetGradingMath = Math.random();
            this.resetGrading();
        },
        resetGrading() {
            // 重置分解信息
            if (this.gradingData.length > 0) {
                this.showGrading();
            }
            if (this.contractForm.isFirst !== 2) {
                this.showGrading();
            }
        },
        showGrading() {
            let postData = {
                beginTime: this.contractForm.beginTime,
                endTime: this.contractForm.endTime,
                freeDays: this.contractForm.freeDays,
                periodMonth: this.contractForm.periodMonth,
                price: this.contractForm.price,
                payPattern: this.contractForm.payPattern,
                payPatternValue: this.contractForm.payPatternValue,
                deposit: this.contractForm.deposit,
                signType: this.contractForm.signType,
                isFirst:this.contractForm.isFirst,
            };
            // 触发分阶
            this.postGradingData = postData;
            this.openGradingMath = Math.random();
        },
        fenkanshowFk() {
            if (
                this.contractForm.beginTime === '' ||
                this.contractForm.endTime === ''
            ) {
                this.$message.error('请选择合同期限后再设置分阶');
                this.custom = 1;
                return;
            }

            if (!this.contractForm.price) {
                this.$message.error('请设置租金后再设置分阶');
                this.custom = 1;
                return;
            }
            if (this.custom === 2) {
                this.customshow = true;
                this.openGradingMath = Math.random();
                this.showGrading();
            } else {
                this.customshow = false;
            }
        },
        init() {
            let date = new Date();
            this.contractForm.signTime = this.$moment(date.getTime())
            this.contractForm.beginTime = this.$moment(Vue.prototype.$moment().startOf('day').valueOf());
            if(this.reserveFul){ //如果是预定管理的签约
               this.reserveFun(this.reserveData);
            }
            if(this.houseFul){ //如果是房源详情的签约
               this.houseFun(this.roomData);
            }
            this.quickSelectYear(1); // 初始   合同默认为一年
        },
        reserveFun(res){
          this.addressFul = true;
          this.contractForm.fullAddress = res.houseAddress;
          this.contractForm.houseId = res.houseId;
          this.contractForm.housePid = res.housePid;
          this.contractForm.name = res.name;
          this.contractForm.phone = res.phone;
          this.contractForm.gender = res.gender;
          this.contractForm.certificateType = res.certificateType;
          this.contractForm.certificateNo = res.certificateNo;
          if(res.deptId){
            this.contractForm.deptId = res.deptId;
            this.$set(this.contractForm,'deptName',res.deptName);
          }
          if(this.contractForm.certificateType !=1){
             this.contractForm.certificateType = 1;
             this.contractForm.certificateNo = ''
          }
        },
        initMaintainInfo(){
            //初始化为负责人
            if(!this.contractForm.maintainerId){
                this.contractForm.maintainerId = this.contractForm.signEmpId;
                this.$set(this.contractForm,'signMaintainName',this.contractForm.signEmpName)
            }
        },
        houseFun(res){
          this.addressFul = true;
          this.contractForm.fullAddress = res.cityName+res.areaName+res.townName+res.fullAddress;
          //防止独栋不存在housePid
          if(res.housePid){
              this.contractForm.houseId = res.housePid;
              this.contractForm.housePid = res.housePid;
          }else{
              this.contractForm.houseId = res.id;
              this.contractForm.housePid = res.id;
          }
          if(res.deptId){
            this.contractForm.deptId = res.deptId;
            this.$set(this.contractForm,'deptName',res.deptName)
          }
          else{
            if (res.houseInfo) {
              this.contractForm.deptId = res.houseInfo.deptId;
              this.$set(this.contractForm,'deptName',res.houseInfo.deptName)
            }
          }
          if(res.maintainerId){
            this.contractForm.maintainerId = res.maintainerId;
            this.$set(this.contractForm,'signMaintainName',res.maintainerName)
          }
          else {
              if (res.houseInfo) {
                  this.contractForm.maintainerId = res.houseInfo.maintainerId;
                  this.$set(this.contractForm, 'signMaintainName', res.houseInfo.maintainer)
              }
          }
        },
        echoContract(data) {
            // 续签 回显数据
            let contract = data;
            let copyContract = Object.assign({}, contract),
                ownerContractViewDTO = copyContract.ownerContractViewDTO,    //合同信息集合
                contractSigner = copyContract.contractSigner  //个人信息集合
                ;
            this.fileIds = contractSigner.fileDTOList; // 租客图片
            this.otherExpenses = []
            let contractForm = {
                contractSignerForm: {
                    name: contractSigner.name,//真实姓名
                    gender: contractSigner.gender, //性别【1-男,2-女】
                    phone: contractSigner.phone, //手机号
                    tenantId: contractSigner.id, //租户ID
                    certificateType: contractSigner.certificateType, //证件类型【1-身份证，2-护照，3-港澳通行证，4-台湾同胞证，5-军官证，6-驾驶证】
                    certificateNo: contractSigner.certificateNo,//证件号码
                    paymentType: contractSigner.paymentType,//收付款方式【1银联2支付宝3微信4美团5携程】
                    paymentNo: contractSigner.paymentNo,//支付号码
                    bank: contractSigner.bank,//银行
                    emergencyType: contractSigner.emergencyType,//紧急联系人性质【1-父母2-兄弟姐妹3-同事4-同学5-朋友6-亲属7-配偶8-其它】
                    emergencyPhone: contractSigner.emergencyPhone,//紧急联系人电话
                    emergencyName: contractSigner.emergencyName, //紧急联系人姓名
                },
                freeDays:ownerContractViewDTO.freeDays,
                contractId: contractSigner.contractId,//合同ID
                billInfos: [], //费用类型账单集合
                contractMedium: ownerContractViewDTO.contractMedium,  //合同类型【1-纸质,2-电子】
                fullAddress: ownerContractViewDTO.fullAddress,//房源地址
                contractNo: '', //合同编号
                signType: ownerContractViewDTO.signType,//签约类型【1-新签,2-续签】
                price: ownerContractViewDTO.price / 100, //租金
                deposit: ownerContractViewDTO.deposit / 100, //押金
                periodMonth: ownerContractViewDTO.periodMonth, //付几（99-全付 100-随房租付 90-自定义）
                depositMonth: ownerContractViewDTO.depositMonth,//押几
                payPatternValue: ownerContractViewDTO.payPatternValue,//收租模式值
                payPattern: ownerContractViewDTO.payPattern, //收租模式【1-提前付款天数,2-固定付款日期,3-提前一个月固定付款日期】
                isFirst: 2,
                addExplanation: ownerContractViewDTO.addExplanation, //合同补充说明
                maintainerId: ownerContractViewDTO.maintainerId, // 维护人ID【房源维护人】
                signMaintainName:ownerContractViewDTO.maintainerName, // 维护人ID【房源维护人】
                signTime: this.$moment(new Date().getTime()),//签约时间
                contractPid: ownerContractViewDTO.contractPid, //续签的合同id（上一份合同id）
                houseId: ownerContractViewDTO.houseId,  //房源id
                id: this.ownerContract, // 合同ID
                otherExpenses: [], //其他费用集合【json】
                paymentMethod: '', //处理完成账单的支付方式
                signEmpName:this.tempSignEmpInfo.name,
                signEmpId:this.tempSignEmpInfo.id,
                sublevelContract: '',//分阶合同【json】
                templateId: ownerContractViewDTO.templateId,//合同模板ID
                fileIds: ownerContractViewDTO.fileDTOList,
                deptId:ownerContractViewDTO.deptId,
                deptName:ownerContractViewDTO.deptName,
            };
            //重置负责人，若有房源维护人，
            if(ownerContractViewDTO.maintainerId){
                this.contractForm.maintainerId = ownerContractViewDTO.maintainerId;
                this.contractForm.signEmpName = ownerContractViewDTO.maintainerName;
                this.$set(this.contractForm,'signMaintainName',this.contractForm.signEmpName)
            }
            if(ownerContractViewDTO.deptId){
              this.contractForm.deptId = ownerContractViewDTO.deptId;
              this.contractForm.deptName = ownerContractViewDTO.deptName;
              this.$set(this.contractForm,'deptName',this.contractForm.deptName)
            }
            if (contractForm.fileIds == null) {
                contractForm.fileIds = [];
            }else{
                contractForm.fileIds.forEach(function(e) {
                    e.notRealDelete = true;
                });
            }
            if (contractSigner.fileDTOList) {
                contractSigner.fileDTOList.forEach(function(e) {
                    e.notRealDelete = true;
                    if (e.subBizType == 1) {
                        this.item2_1.push(e)
                    } else if (e.subBizType == 2) {
                        this.item2_2.push(e)
                    }
                }, this);
            }


            if (contractForm.payPattern == 1) {
                this.payPatternValue1 = contractForm.payPatternValue;
            } else if (contractForm.payPattern == 2) {
                this.payPatternValue2 = contractForm.payPatternValue;
            } else {
                this.payPatternValue3 = contractForm.payPatternValue;
            }
            if (this.contractResetStatus) {
                //如果重置续签需要传pid
                if(contractForm.signType == 2){
                    contractForm.contractPid = this.ownerContract;
                }
                let end = new Date(ownerContractViewDTO.endTime)
                let begin = new Date(ownerContractViewDTO.beginTime)
                let endStamp = end.getTime();
                let begStamp = begin.getTime();
                contractForm.beginTime = this.$moment(begStamp);
                contractForm.endTime = this.$moment(endStamp);
                contractForm.contractNo = ownerContractViewDTO.contractNo;

            } else {
                contractForm.signType = 2; // 续签
                contractForm.id = '';
                contractForm.contractPid = this.ownerContract;
                let endTime = ownerContractViewDTO.endTime;
                let time = new Date(endTime);

                let stamp = time.getTime() + 86400000;
                contractForm.beginTime = this.$moment(stamp);
                contractForm.endTime = null;
            }
            this.contractForm = contractForm;
            if (this.contractForm.gender === 1) {
                this.genderNanIng = true;
                this.genderNvIng = false;
            } else {
                this.genderNanIng = false;
                this.genderNvIng = true;
            }
            if (this.contractResetStatus) {
                let data = []
                data.push(moment(this.contractForm.beginTime));
                data.push(moment(this.contractForm.endTime));
                this.timeDateList = data;
                // 如果是重置合同
                this.getCoTime();
            } else {
                this.quickSelectYear(1); // 初始   合同默认为一年
            }
            this.checkIdentityCard();
        },
        // 获取费用类型
        getCost(filterIndex, type, id) {
            const params = 'FEESUBJECT';
            listFeeSubjectWithoutRentalFee(params).then(res => {
                // console.log(res)
                if (res.code === "200") {
                    this.originCostTabsContent = res.data;
                    this.costTabsContent = res.data;
                }
            })
        },
        priceReg1(e) {
            // 通过正则过滤小数点后两位
            let a = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
            this.contractForm.deposit = a;
            e.target.value = a;
            this.contractForm.price = a;
            this.resetGrading();
        },
        priceReg2(e) {
            // 通过正则过滤小数点后两位
            let a = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
            this.contractForm.deposit = a;
            e.target.value = a;

        },
        changeGradingStatus(have) {
            if (have) {
                this.showGrading();
            } else {
                this.gradingData = [];
            }
        },
        getGrading(gradingData) {
            if ('subLevelsData' in gradingData) {
                this.gradingData = gradingData.subLevelsData;
            }
        },
        emitZeroAfter(data) {
            this.scatteredInfoAfter = data;
        },
        emitZeroBefore(data) {
            this.scatteredInfoBefore = data;
        },
        getCoTime() {
            let postData = {
                beginDate: this.contractForm.beginTime,
                endDate: this.contractForm.endTime
            };
          if(this.contractForm.deptId){
            postData.deptId = this.contractForm.deptId;
          }
          else{
            postData.deptId = this.$ls.get(CURRENTDEPTID);
          }
            getContractTime(postData).then(res => {
                if (res.code === '200') {
                    this.timeDate =
                        res.data.year + '年' + res.data.mon + '月' + res.data.day + '日';
                }
            });
        },
        addExpenses(firstFlag) {
            //若不是第一次要，判断之前的数据是否保存完全
            if(!firstFlag){
                let temp = false;
                this.otherExpenses.forEach((item)=>{
                    if(!item.feeSubjectId){
                        temp = true;
                    }
                    if(!item.price){
                        temp = true;
                    }
                });
                if(temp){
                    this.$message.error('请完善费用信息');
                    return;
                }
                //获取所有选中费用科目
                this.checkedFeeSubjectIds = [];
                this.otherExpenses.forEach((item)=>{
                    this.checkedFeeSubjectIds.push(item.feeSubjectId);
                });
                this.costTabsContent = this.originCostTabsContent;
                this.costTabsContent.forEach((item)=>{
                    item.metaList.forEach((temp)=>{
                        let pos = this.checkedFeeSubjectIds.indexOf(temp.id);
                        if(pos > -1){
                            temp.disabled = true;
                        }
                    })
                });
                this.otherExpenses.push({
                    periodMonth: 99,
                    desc: '',
                    feeSubjectId: '',
                    payType: '',
                    price: 0
                });
            }
            else {
                this.otherExpenses.push({
                    periodMonth: 99,
                    desc: '',
                    feeSubjectId: '',
                    payType: '',
                    price: 0
                });
                this.checkedFeeSubjectIds = [];
                this.costTabsContent = this.originCostTabsContent;
                this.costTabsContent.forEach((item)=>{
                    item.metaList.forEach((temp)=>{
                        temp.disabled = false;
                    })
                })
            }
        },
        reduceExpenses(index) {
            this.otherExpenses.splice(index, 1);
            this.checkedFeeSubjectIds = [];
            this.otherExpenses.forEach((item)=>{
                this.checkedFeeSubjectIds.push(item.feeSubjectId);
            });
            this.costTabsContent = this.originCostTabsContent;
            this.costTabsContent.forEach((item)=>{
                item.metaList.forEach((temp)=>{
                    let pos = this.checkedFeeSubjectIds.indexOf(temp.id);
                    if(pos > -1){
                        temp.disabled = true;
                    }else{
                        temp.disabled = false;
                    }
                })
            });
        },
        payPatternChange(val) {
            if (this.contractForm.payPattern == 1) {
                this.contractForm.payPatternValue = this.payPatternValue1;
                if(val) {
                    this.payPatternValue2 = '';
                    this.payPatternValue3 = '';
                }
            } else if (this.contractForm.payPattern == 2) {
                this.contractForm.payPatternValue = this.payPatternValue2;
                if(val) {
                    this.payPatternValue1 = '';
                    this.payPatternValue3 = '';
                }
            } else {
                this.contractForm.payPatternValue = this.payPatternValue3;
                if(val) {
                    this.payPatternValue1 = '';
                    this.payPatternValue2 = '';
                }
            }
        },
        // 费用类型方法
        costSelect(value, index) {
            if (value[1]) {
                let obj = this.otherExpenses[index];
                obj.feeSubjectId = value[1];
                this.otherExpenses.splice(index, 1, obj);
            } else {
                let obj = this.otherExpenses[index];
                obj.feeSubjectId = value[0];
                this.otherExpenses.splice(index, 1, obj);
            }
        },
        confirmBill() {
            // 确认账单 保存合同
            let postDataForm = Object.assign({}, this.contractForm);
            let postData = postDataForm;

            postData.deposit =  Math.round(postData.deposit * 100);
            postData.price =  Math.round(postData.price * 100);

            let gradingData = JSON.parse(JSON.stringify(this.gradingData));
            for (let item of gradingData) {
                item.price =  Math.round(item.price * 100);
                delete item.periodNumOptions;
            }
             let otherExpenses = JSON.parse(JSON.stringify(this.otherExpenses));
            for (let item of otherExpenses) {
                item.price =  Math.round(item.price * 100);
                for (let pay of this.costTabsContent) {
                for (let Content of pay.metaList) {
                    if (item.feeSubjectId === Content.id) {
                    item.feeSubjectName = Content.name;
                    }
                }
                }
            }

            postData.otherExpenses = otherExpenses;
            postData.stagedList = gradingData;
            postData.billInfos = this.listData;
            postData.paymentMethod = this.paymentMethod;
            let fileIds = [];
            if (this.imgId2_1) {
                fileIds.push(this.imgId2_1);
            }
            if (this.imgId2_2) {
                fileIds.push(this.imgId2_2);
            }
            if (this.imgId2_6) {
                fileIds.push(this.imgId2_6);
            }
            this.imgList2_4.forEach(function(e) {
                fileIds.push(e);
            }, this);


            let fileImgss = [];
            this.imgList3_2.forEach(function(e) {
                fileImgss.push(e);
            }, this);
            postData.fileIds = fileImgss;
            postData.contractSignerForm.fileIds = fileIds;
            if(this.contractResetStatus){ //重置合同
                ownerContractReset(postData).then(res => {
                    if (res.code === '200') {
                        this.$refs.saveBillOwner.saveLoadingChange();
                        this.$refs.saveBillOwner.simpleCloseThis();
                        this.saveLoading = false;
                        this.$message.success('业主合同重置成功');
                        this.$emit('saveSuccess',true, res.data);
                    }else{         
                        this.$refs.saveBillOwner.saveLoadingChange();
                    }
                });
            }else{
                ownerContractAdd(postData).then(res => {
                    if (res.code === '200') {
                        this.$refs.saveBillOwner.saveLoadingChange();
                        this.$refs.saveBillOwner.simpleCloseThis();
                        this.$message.success('保存业主合同成功');
                        this.$emit('saveSuccess', true);
                    }else{
                        this.$refs.saveBillOwner.saveLoadingChange();
                    }
                });
            }


        },
        listDatafu(data) {
            this.listData = data;
        },
        paymentMethodfu(data) {
            this.paymentMethod = data;
        },
        cancelSaveOwnerContract(){
            this.$emit('cancelSaveOwnerContract');
        },
        saveContract() {
            if(moment(this.contractForm.endTime)<moment(this.contractForm.beginTime)){
                this.$message.warning('租客合同选择的开始日期不能超过截止日期');
                return;
            }
            if (this.$refs.img2_1.picsList.length != 0) {
                this.imgId2_1 = this.$refs.img2_1.picsList[0].id;
            }
            if (this.$refs.img2_2.picsList.length != 0) {
                this.imgId2_2 = this.$refs.img2_2.picsList[0].id;
            }
            if (this.$refs.img3_2.picsList.length != 0) {
                let imgObj3_2 = this.$refs.img3_2.picsList;
                let arrImg = [];
                if (imgObj3_2.length > 0) {
                    imgObj3_2.forEach(function(e) {
                        arrImg.push(e.id)
                    }, this);
                }
                this.imgList3_2 = arrImg;
            }
            if (this.checkDate()) {
                if (
                    this.otherExpenses.some(e => {
                        return (
                            e.feeSubjectId === '' || e.periodMonth === '' || e.price === ''
                        );
                    })
                ) {
                    this.$message.warning('请填写完整的其他费用');
                    return;
                }
              if (!this.contractForm.deptId) {
                this.$message.warning('请选择所属门店(部门)！');
                return;
              }

                if (this.contractForm.payPattern === 2) {
                    if (
                        this.contractForm.payPatternValue > 31 ||
                        this.contractForm.payPatternValue === 0
                    ) {
                        return;
                    }
                }
                let scatteredInfoBefore = JSON.parse(
                    JSON.stringify(this.scatteredInfoBefore)
                );
                let scatteredInfoAfter = JSON.parse(
                    JSON.stringify(this.scatteredInfoAfter)
                );

                let otherExpenses = JSON.parse(JSON.stringify(this.otherExpenses));
                for (let item of otherExpenses) {
                    item.price =  Math.round(item.price * 100);
                    for (let pay of this.costTabsContent) {
                        for (let Content of pay.metaList) {
                            if (item.feeSubjectId === Content.id) {
                                item.feeSubjectName = Content.name;
                            }
                        }
                    }
                }

                let postData = {
                    beginTime: this.contractForm.beginTime,
                    deposit:  Math.round(this.contractForm.deposit * 100),
                    depositMonth: this.contractForm.depositMonth,
                    endTime: this.contractForm.endTime,
                    freeDays: this.contractForm.freeDays,
                    isFirst: this.contractForm.isFirst,
                    otherExpenses: otherExpenses,
                    payPattern: this.contractForm.payPattern,
                    payPatternValue: this.contractForm.payPatternValue,
                    periodMonth: this.contractForm.periodMonth,
                    price:  Math.round(this.contractForm.price * 100),
                    signType: this.contractForm.signType,
                    houseId: this.contractForm.houseId,
                    phone: this.contractForm.contractSignerForm.phone,
                    isProduceRentDeposit:this.isProduceRentDepositFlag?1:0,
                };

                if (this.ownerContract) {
                    postData.contractId = this.ownerContract;
                    postData.contractPid = this.ownerContract;
                }
                if (this.gradingData.length > 0) {
                    // postData.subLevels = this.gradingData;
                    let gradingData = JSON.parse(JSON.stringify(this.gradingData));
                    for (let item of gradingData) {
                        item.price =  Math.round(item.price * 100);
                    }
                    postData.stagedList = gradingData;
                }
                this.lastCheckIdentityCard(this.contractForm.contractSignerForm.certificateNo, this.contractForm.contractSignerForm.certificateType,postData)
            }
        },
        lastCheckIdentityCard(certificateNo, certificateType,postData) {
            if (certificateType === 1) {
                if (certificateNo === '') {
                    this.$message.error('请输入证件号');
                    return true;
                } else {
                    checkCard(certificateNo).then(res => {
                        if (res === undefined) {
                            this.$message.error('请输入正确身份证号');
                            return true;
                        } else {
                            if (res.code === '200') {
                                this.calcBillPreview(postData);
                            } else {
                                this.$message.error('请输入正确身份证号');
                                return true;
                            }
                        }

                    });
                }
            } else {
                if (certificateNo === '') {

                    this.$message.error('请输入证件号');
                    return true;
                } else {
                    this.calcBillPreview(postData);
                }
            }
        },
        calcBillPreview(postData) {
            this.saveLoading = true;
            ownerContractCalView(postData).then(res => {
                if (res.code === '200') {
                    this.postBillData = postData;
                    this.billData = [...res.data];
                    this.billPreviewShow = Math.random();
                } else {
                    this.$message.error('预览账单失败');
                    this.saveLoading = false;
                }
            });
        },
        checkDate() {
            this.lastCheck = true;
            if (!this.contractForm.fullAddress) {
                this.$message.warning('请输入房源地址!');
                return false;
            }
            //判断是否要关联房源
            if(this.contractMustRelated&&!this.contractForm.houseId){
                this.$message.warning('请完善合同地址：在合同地址框内输入地址并在检索结果中选择');
                return false;
            }
            if (!this.contractForm.contractSignerForm.name) {
                this.$message.warning('请输入姓名!');
                return false;
            }
            if (this.checkPhone(this.contractForm.contractSignerForm.phone)) {
                // 这个是判断字段传的是否正确  电话号码
                return false;
            }
            if (this.contractForm.contractSignerForm.emergencyPhone&&this.checkPhone(this.contractForm.contractSignerForm.emergencyPhone)) {
                // 这个是判断字段传的是否正确  电话号码
                return false;
            }
            if(!this.contractForm.contractSignerForm.certificateNo){
                this.$message.warning('请输入身份信息!');
                return false;
            }
            if (!this.contractForm.contractSignerForm.paymentNo) {
                this.$message.warning('请输入收款账号!');
                return false;
            }
            if (!this.imgId2_1) {
                this.$message.warning('请上传身份证正面!');
                return false;
            }
            if (!this.imgId2_2) {
                this.$message.warning('请上传身份证反面!');
                return false;
            }
            if (!this.contractForm.price) {
                this.$message.warning('请输入月租金!');
                return false;
            }
            if (!this.contractForm.deposit&&this.contractForm.deposit!=0) {
                this.$message.warning('请输入押金!');
                return false;
            }
            if (!this.contractForm.freeDays) {
                if(this.contractForm.freeDays!=0){
                    this.$message.warning('请设置免租期天数!');
                    return false;
                }
            }
            this.payPatternChange(false);
            if (!this.contractForm.payPatternValue) {
                if(this.contractForm.payPatternValue == '') {
                    this.$message.warning('请设置收租日!');
                    return false;
                }
                if(this.contractForm.payPatternValue!=0) {
                    this.$message.warning('请设置收租日!');
                    return false;
                }
            }
            if (!this.contractForm.houseId&&!this.contractForm.deptId) {
                this.$message.warning('请选择所属门店(部门)！');
                return false;
            }
            if (!this.contractForm.signEmpId) {
                this.$message.warning('请选择签约人!');
                return false;
            }
            return true;
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
                this.requiredPhone = false;
                return false;
            }
        },
      cancelOtherTree(val){
        if(val==1){
          if (this.$refs.selectEmp) {
            this.$refs.selectEmp.showTree = false
          }
          if (this.$refs.selectMaintainer) {
            this.$refs.selectMaintainer.showTree = false
          }
        }
        if(val==2){
          if (this.$refs.selectDept) {
            this.$refs.selectDept.showTree = false
          }
          if (this.$refs.selectEmp) {
            this.$refs.selectEmp.showTree = false
          }
        }
        if(val==3){
          if (this.$refs.selectDept) {
            this.$refs.selectDept.showTree = false
          }
          if (this.$refs.selectMaintainer) {
            this.$refs.selectMaintainer.showTree = false
          }
        }
      },
        singDeptEmp(selectObj) {
            if (selectObj.type == 'employee') {
                this.contractForm.signEmpId = selectObj.id;
                this.contractForm.signEmpName = selectObj.name;
            }
        },
      selectDept(selectObj){
        if (selectObj.type == 'dept') {
          this.contractForm.deptId = selectObj.id;
          this.contractForm.deptName = selectObj.name;
        }
        if(!selectObj.type&&!selectObj.name){
          this.contractForm.deptId = '';
          this.contractForm.deptName = '';
        }
      },
        selectDeptEmp(selectObj) {
            if (selectObj.type == 'employee') {
                this.contractForm.maintainerId = selectObj.id;
                this.contractForm.signMaintainName = selectObj.name;
            }
          if(!selectObj.type&&!selectObj.name){
            this.contractForm.maintainerId = '';
            this.contractForm.signMaintainName = '';
          }
        },
    }

}
</script>

<style scoped lang="less">
.addOwnerContract-box {
    padding: 0 20px 20px 20px;
    height: calc(100vh - 150px);
    overflow: auto;
    .addFellowBox {
        width: 140px;
        height: 40px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(10, 135, 248, 1);
        line-height: 40px;
        text-align: center;
        margin-top: 20px;
    }
    .contract-other {
        width: 140px;
        height: 40px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(10, 135, 248, 1);
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(10, 135, 248, 1);
        line-height: 40px;
        text-align: center;
    }
    .contract-modular {
        width: 1160px; // padding: 13px 0 5px 18px;
        .titleInfo {
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            position: relative;
            box-sizing: border-box;
            margin: 11px 0;
            b {
                font-weight: normal;
            }
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
                            padding: 0 9px;
                            height: 100%;
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
    }
    .contentSlot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #dddddd;
        .contract-times {
            width: 60%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            .splitStyle{
                position: absolute;
                left: 85px;
                top:5px
            }
            & /deep/ .text-date-picker {
                // width: 45%;
                line-height: 1;
                height: auto;
                .ant-calendar-range-picker-input {
                    text-align: left; // font-size:12px;
                }
                .ant-calendar-picker-icon {
                    display: none;
                }
                .ant-calendar-range-picker-separator {
                    line-height: 30px;
                }
            }
            &>span {
                width: 10%;
                text-align: left;
            }
        }
        .year-radio {
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            li {
                width: 28px;
                height: auto;
                line-height: 1;
                text-align: center;
                border: 1px solid #e2e2e2;
                padding: 2px 0;
                border-radius: 3px;
                cursor: pointer;
                margin-left: 2px;
                font-size: 12px;
                background: rgba(246, 247, 248, 1);
            }
            .active {
                background: rgba(22, 213, 173, 0.1);
                ;
                color: #0A87F8;
                border: 1px solid #0A87F8;
            }
        }
        .common-time {
            position: absolute;
            top: 2px;
            right: 10px;
            z-index: 2;
            font-size: 12px;
        }
    }

    &>div {
        margin-bottom: 20px;
    }
    .address {
        display: flex; // width: calc(50% - 15px);
        width: 100%;
        position:relative;
        .must-fill-border {
            & /deep/ .ant-select-selection {
                border-bottom: 1px solid red;
            }
        }
        .dividerClass{
            height: 15px;
            width: 1px;
            position: absolute;
            border: 0.5px solid #BBBBBB;
            right: 155px;
            bottom: 8px;
        }
    }
    .close-icon-style{
        position: absolute;
        right: 5px;
        top: 55px;
        .close-icon{
            color: #FB4246;
            font-size: 14px
        }
    }
    .noSearchAddress{
        /deep/ .ant-select-dropdown--empty{
            display: none;
        }
    }
    .mosaic {
        position: relative;
        & /deep/.ant-input {
            // width:100%;
            padding: 0 38px 0 0;
        }
        span {
            line-height: 32px;
            position: absolute;
            right: 0;
        }
    }
    .payment {
        position: relative;
        .pay1 {
            line-height: 32px;
            position: absolute;
            left: 0;
            z-index: 2;
        }
        .pay2 {
            line-height: 32px; //    position: absolute;
            //    left: 76px;
            z-index: 2;
        }
        .nonePay {
            position: absolute;
            left: 72px;
        }
        .fu-nonebox {
            & /deep/.ant-select-selection {
                .ant-select-selection-selected-value {
                    padding-left: 0;
                    padding-right: 0px;
                }
                .ant-select-selection__rendered {
                    margin-right: 0;
                }
            }
        }
        & /deep/.ant-select-selection-selected-value {
            padding-left: 16px;
            padding-right: 0px;
            text-align: center;
            width: 86%;
        }
        .fu-box {
            & /deep/.ant-select-selection-selected-value {
                padding-left: 16px;
                padding-right: 0px;
            }
        }
        & /deep/.ant-select-arrow {
            right: 0;
        }
    }
    .together-data .feiyong {
        .nonePay {
            position: absolute;
            left: 50px;
            top: 5px;
        }
    }
    .bgBox {
        .width-280 {
            width: 310px;
            height: 155px;
            background: rgba(247, 248, 251, 1);
            border-radius: 4px;
            border: 1px solid rgba(221, 221, 221, 1);
            margin-top: 26px;
            .isFirst {
                & /deep/ .ant-radio-wrapper {
                    width: 100%;
                    margin-top: 16px;
                }
            }
            .payPattern {
                width: 55px;
                & /deep/.ant-radio-wrapper {
                    height: 20px;
                    line-height: 20px;
                    margin-top: 14px;
                }
            }
            .payPatternBox {
                //   width:calc(100% - 120px);
                & /deep/.ant-input {
                    width: 60px;
                    background: none;
                    height: 20px;
                }
                p {
                    margin-top: 14px;
                }
            }
        }
    }
    .err-p {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 160, 54, 1);
        line-height: 17px;
        position: absolute;
    }
    .err-p-red{
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FB4246;
        line-height: 17px;
        position: absolute;
    }
    .titlepz {
        margin-bottom: 10px;
        padding-top: 4px;
        margin-top: 6px;
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
    .uplodList{
        margin-bottom:0;
    }
    .upload-p{
      p{
          text-align: center;
          width: 120px;
          margin-right: 9px;
      }
    }
    .gender-box {
        position: relative;
        & /deep/ .ant-input {
            padding: 0 70px 0 0;
        }
        .gender-span {
            position: absolute;
            width: 66px;
            right: 0;
            top: 6px;
            span {
                margin-left: 0 !important;
                cursor: pointer;
            }
            span+span {
                margin-left: 5px !important;
            }
            .genderNan,
            .genderNv {
                color: #0A87F8;
            }
        }
    }
    .width-140 {
        width: 169px; // overflow: hidden;
    }
    .width-280 {
        width: 340px;
    }
    & /deep/ .label-item .ant-select-selection__rendered {
        margin-left: 0;
    }
    .save-contract {
        width: 120px;
        height: 40px;
        background: rgba(10, 135, 248, 1);
        border-radius: 5px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
    }
    .quxiao {
        width: 120px;
        height: 40px;
        border-radius: 5px;
    }
    .checkBillStyle{
      height: 40px;
      line-height: 40px;
    }
    & /deep/ .ant-input,& /deep/ .ant-select-selection__rendered,& /deep/ .ant-select-selection--single{
       height: 32px;
       font-size: 14px;
        line-height: 32px;
    }
    & /deep/.label-item .addon-after{
       height: 32px;
       font-size: 14px;
       line-height: 32px;
    }
    &/deep/ .title-tiem{
         .ft-bolder{
             height: 36px;
             margin-bottom: 2px;
        }
    }
    &/deep/ .label-item textarea.ant-input{
        padding:4px 0;
        line-height: 20px;
    }
    /deep/ .ant-input{
        padding: 0;
    }
    /deep/ .ant-cascader-picker-label{
        padding: 0px;
    }
}

.public-config {
    label {
        width: 96px;
        margin: 10px 0;
    }
}
.maintainer{
    /deep/ .ft-bolder{
        height: 30px !important;
        line-height: 30px !important;
    }
}
</style>
