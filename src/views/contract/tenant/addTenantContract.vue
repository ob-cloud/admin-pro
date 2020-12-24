<template>
  <div id="addTenantContract" class="addTenantContract-box">
    <label-item title="房源信息" border :mustFill="true">
      <div class="u-bottom-border address" :class="(searchAddressHaveValue==false&&this.communityList.length==0)?'noSearchAddress':''" v-if="!searchLoading">
        <a-select showSearch :placeholder="placeholder" :disabled="tenantContract!==''||addressFul" :value="contractForm.fullAddress" :class="{ 'must-fill-border': mustFillBorder  }" style="width: 100%;" :defaultActiveFirstOption="false"
                  :showArrow="false" :filterOption="false" @change="getCommunity" @search="selectCommunity" :not-found-content="null" @focus="focusCommunity" @blur="isEmpty" >
          <a-select-option v-for="(item) in communityList" :key="item.houseId">{{ item.viewAddress }}</a-select-option>
        </a-select>
      </div>
      <div class="u-bottom-border address" :class="(searchAddressHaveValue==false&&this.communityList.length==0)?'noSearchAddress':''" v-else>
        <a-select showSearch :placeholder="placeholder" :disabled="tenantContract!==''||addressFul" :value="contractForm.fullAddress" :class="{ 'must-fill-border': mustFillBorder  }" style="width: 100%;" :defaultActiveFirstOption="false"
                  :showArrow="false" :filterOption="false" @change="getCommunity" @search="selectCommunity" @focus="focusCommunity" @blur="isEmpty" >
          <div slot="notFoundContent">
            <div style="width:100%;text-align: center;color: #FFA036;font-size: 14px;margin-top: 65px;" :style="!contractMustRelated?'':'margin-bottom: 65px;'">未在系统中检索到该房源，请核对房源信息是否输入有误</div>
            <div v-if="!contractMustRelated" style="width:100%;text-align: center;color: #000000;font-size: 14px;margin-bottom: 130px;">您也可以先添加，后续再进行关联操作</div>
          </div>
          <a-select-option v-for="(item) in communityList" :key="item.houseId">{{ item.viewAddress }}</a-select-option>
        </a-select>
      </div>
      <div class="close-icon-style cursor" v-if="contractForm.fullAddress&&canClearHouseIdflag" @click="clearFullAddress">
        <icon-font class="close-icon cursor" type="iconyumengtubiao_guanbi-3" />
      </div>
      <p v-if="errFul" class="err-p">未在系统检测到该房源信息；您可以先添加合同信息，后续再进行关联操作</p>
      <p v-if="mustRelatedFul" class="err-p-red">请完善合同地址：在合同地址框内输入地址并在检索结果中选择</p>
    </label-item>
    <label-item title="合同类型" border>
      <div class="contract-model f-clearfix">
        <div class="f-fl f-clearfix" :class="{active: contractForm.contractMedium == 2}" @click="contractMedium2" v-if="simpleList&&simpleList.length>0&&fieldsObj.contractMedium.contractMedium_02.checked==1">
          <div>
            <div class="type-boder">
              <icon-font style="font-size:16px;" type="iconyumengtubiao_dianzihetong" />
              <span class="contractType">新签电子合同</span>
              <span class="font-12">（需要租客在线上完成签约）</span>
            </div>
            <div class="f-clearfix">
              <div class="f-fl htmb">合同模板
                <span style="color:#FB4246">*</span>
              </div>
              <div class="f-fl board-box">
                <a-select v-model="contractForm.templateId" placeholder="请选择" style="min-width: 100px" @change="templateIdChange">
                  <a-select-option v-for="(item,index) in simpleList" :key="index" :value="item.id">{{item.name}}</a-select-option>
                </a-select>
              </div>
            </div>
            <div>适用于新签租客场景，采用CA电子合同，实名认证租客身份，具备法律效应</div>
          </div>

          <img src="../../../assets/login/selected.png" class="choose" />
        </div>
        <div class="f-fl f-clearfix" :class="{active: contractForm.contractMedium == 2}" style="background-color: #f6f7f8" v-if="!simpleList||simpleList.length==0&&fieldsObj.contractMedium.contractMedium_02.checked == 1">
          <div>
            <div class="type-boder">
              <icon-font style="font-size:16px;" type="iconyumengtubiao_dianzihetong" />
              <span class="contractType">新签电子合同</span>
              <span class="font-12">（需要租客在线上完成签约）</span>
            </div>
            <div style="color:#FFA036;margin-top: 10px;">没有已认证过的合同模版，请先前往"合约管理-合同配置"页进行认证</div>
          </div>
        </div>
        <div class="f-fl" :class="{active: contractForm.contractMedium == 1}" @click="contractMedium1" v-if="fieldsObj.contractMedium.contractMedium_01.checked == 1">
          <div>
            <div class="type-boder">
              <icon-font style="font-size:16px;" type="iconyumengtubiao_zhizhihetong" />
              <span class="contractType">已签纸质合同代理</span>
            </div>
            <div class="htmb">适用于已与租客签订了纸质合同的场景，将合同信息补录到系统中，管理方便</div>
            <div>
              <a-checkbox v-model="contractForm.sendFlg">是否短信通知租客确认租约信息</a-checkbox>
            </div>
          </div>
          <img src="../../../assets/login/selected.png" class="choose" />
        </div>
      </div>
    </label-item>
    <label-item title="承租信息" border  class="title-tiem">
      <a-row :gutter="30">
        <a-col class="width-140 f-fl">
          <label-item title="姓名" :mustFill="true">
            <div class="u-bottom-border gender-box">
              <a-input v-model="contractForm.name" placeholder="请输入姓名" />
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
              <a-input v-model="contractForm.phone" :maxlength="11" @keyup.native="mixin_integerFilter('contractForm.phone')" @blur="checkPhone(contractForm.phone)" placeholder="请输入电话" />
            </div>
          </label-item>
        </a-col>
        <a-col class="width-280 f-fl">
          <label-item title="身份信息" :mustFill="fieldsObj.certificateType.required == 1||contractForm.contractMedium==2">
            <div class="u-bottom-border address">
              <a-select v-model="contractForm.certificateType" @blur="checkIdentityCard" style="min-width: 120px" :disabled="this.contractForm.contractMedium == 2">
                <a-select-option v-for="(item) in certificateTypeList" :disabled="item.disabled" :key="item.id" :value="item.id">{{item.value}}</a-select-option>
              </a-select>
              <a-input v-model="contractForm.certificateNo" @blur="checkIdentityCard(contractForm.certificateNo,contractForm.certificateType)" :maxlength="20" placeholder="请输入证件号码" />
            </div>
          </label-item>
        </a-col>
        <a-col class="width-140 f-fl">
          <div class="addFellowBox cursor" @click="addFellow" v-if="togetherList.length=== 0">
            <icon-font style="font-size:16px;color:#0A87F8;" type="iconyumengtubiao_tianjiazijian" /> 添加同住人
          </div>
        </a-col>
      </a-row>
    </label-item>
    <div class="contract-modular" v-if="togetherList.length != 0">
      <div class="titleInfo">
        <span></span>
        <b style="margin-right:26px;">同住人信息</b>
      </div>
      <div class="content-row">
        <div class="together-item">
          <div class="together-detail">
            <div class="together-title">
              <div style="max-width: 222px">同住人姓名<span style="color:#FB4246"  v-if="fieldsObj.togetherName.required == 1">*</span></div>
              <div style="max-width: 222px">电话
                <span style="color:#FB4246" v-if="fieldsObj.togetherPhone.required == 1">*</span>
              </div>
              <div style="max-width: 277px">性别
                <span style="color:#FB4246" v-if="fieldsObj.togetherName.required == 1">*</span>
              </div>
              <div style="max-width: 376px">身份信息
                <span style="color:#FB4246" v-if="fieldsObj.togetherCertificateType.required == 1">*</span>
              </div>
              <div style="max-width: 62px;text-align: center;">操作</div>
            </div>
            <div class="together-data u-no-border" v-for="(item,index) in togetherList" :key="index">
              <div style="max-width: 222px">
                <a-input v-model="item.name" placeholder="请输入" />
              </div>
              <div style="max-width: 222px">
                <a-input v-mustFill:[clickSave] :maxlength="11" v-model="item.phone" @blur="checkPhone(item.phone)" placeholder="请输入" />
              </div>
              <div style="max-width: 277px">
                <a-radio-group class="payPattern f-fl" v-model="item.gender">
                  <a-radio :value="1">男</a-radio>
                  <a-radio :value="2">女</a-radio>
                </a-radio-group>
              </div>
              <div style="max-width: 376px">
                <div class="u-bottom-border togeAddress">
                  <a-select v-model="item.certificationType" style="min-width: 110px">
                    <a-select-option v-for="(item) in togetherCertificateTypeList" :disabled="item.disabled" :key="item.id" :value="item.id">{{item.value}}</a-select-option>
                  </a-select>
                  <a-input v-model="item.certificateNo" :maxlength="20" style="height: 39px;line-height: 39px;" @blur="checkIdentityCard(item.certificateNo,item.certificationType)" placeholder="请输入" />
                </div>
              </div>
              <div class="options f-clearfix" style="max-width: 62px">
                <icon-font @click="reduceFellow(index)" class="fl delete-icon" type="iconyumengtubiao_shanchu-"></icon-font>
              </div>
            </div>
            <div class="together-foot">
              <p @click="addFellow" class="togetherAdd cursor">
                <icon-font style="font-size:16px;color:#0A87F8;vertical-align: middle" type="iconyumengtubiao_tianjiazijian" /> <span style="vertical-align: middle">添加同住人</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="titlepz f-clearfix">
      身份证信息
      <span>（附件支持格式：jpg、png、jpeg）</span>
      <!-- 上传图片 -->
    </div>
    <div class="f-clearfix uplodList">
      <own-upload class="f-fl" style="padding-right: 15px"  :picList="item2_1" :uploadParms="sendData2_1" :maxLength="1" :showTips="false" ref="img2_1">
        <img src="../../../assets/login/idzheng.png" style="width: 120px;height: 76px" class="choose" />
      </own-upload>
      <own-upload class="f-fl" style="padding-right: 15px"  :picList="item2_2" :uploadParms="sendData2_2" :maxLength="1" :showTips="false" ref="img2_2">
        <img src="../../../assets/login/idfan.png" style="width: 120px;height: 76px" class="choose" />
      </own-upload>
      <own-upload class="f-fl" style="padding-right: 15px"  :picList="item2_6" :uploadParms="sendData2_6" :maxLength="1" :showTips="false" ref="img2_6">
        <img src="../../../assets/login/shouid.png" style="width: 120px;height: 76px" class="choose" />
      </own-upload>
    </div>
    <div class="f-clearfix upload-p">
      <p class="f-fl"><span style="font-size: 12px;">身份证正面</span><span style="color:red" v-if="fieldsObj.idzhengPng.required == 1">*</span></p>
      <p class="f-fl"><span style="font-size: 12px;">身份证反面</span><span style="color:red" v-if="fieldsObj.idfanPng.required == 1">*</span></p>
      <p class="f-fl"><span style="font-size: 12px;">手持身份证</span><span style="color:red" v-if="fieldsObj.shouidPng.required == 1">*</span></p>
    </div>
    <div class="titlepz f-clearfix">
      其它证件
      <span style="color:red" v-if="fieldsObj.otherPng.required == 1">*</span>
      <span>（附件支持格式：jpg、png、jpeg;可上传多张）</span>
      <!-- 上传图片 -->
    </div>
    <div class="f-clearfix uplodList">
      <own-upload class="f-fl"  style="width:560px;" :picList="item2_4" :uploadParms="sendData2_4" :showTips="false" ref="img2_4">
        <img src="../../../assets/login/other.png" style="width: 120px;height: 76px" class="choose" />
      </own-upload>
    </div>
    <div class="more-item" v-if="moreFul">
      <a-row :gutter="30">
        <a-col class="width-140 f-fl">
          <label-item title="客户来源" :mustFill="fieldsObj.customerResource.required == 1">
            <div class="u-bottom-border">
              <a-select v-model="contractForm.customerResource" placeholder="请选择" style="min-width: 139px">
                <a-select-option v-for="(item) in channelList" :disabled="item.disabled" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
              </a-select>
            </div>
          </label-item>
        </a-col>
        <a-col class="width-140 f-fl">
          <label-item title="职业" :mustFill="fieldsObj.profession.required == 1">
            <div class="u-bottom-border">
              <a-select v-model="contractForm.profession" style="width: 139px">
                <a-select-option v-for="(item,index) in occupationList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
              </a-select>
            </div>
          </label-item>
        </a-col>
        <a-col class="width-280 f-fl">
          <label-item title="工作单位" :mustFill="fieldsObj.employer.required == 1">
            <div class="u-bottom-border address">
              <a-input v-model="contractForm.employer" :maxlength="20" placeholder="请输入" />
            </div>
          </label-item>
        </a-col>
        <a-col class="width-140 f-fl">
          <label-item title="爱好" :mustFill="fieldsObj.interest.required == 1">
            <div class="u-bottom-border interestBox">
              <a-select mode="multiple" :showArrow="true" v-model="interest" style="width: 100%" @change="interestChange" :maxTagCount="1" placeholder="请选择">
                <a-select-option v-for="(item,index) in hobbyList" :value="item.id" :key="index">{{item.name}}</a-select-option>
              </a-select>
            </div>
          </label-item>
        </a-col>
        <a-col class="width-280 f-fl">
          <label-item title="承租人收付款账号信息" :mustFill="fieldsObj.paymentType.required == 1">
            <div class="u-bottom-border address">
              <a-select v-model="contractForm.paymentType" style="min-width: 69px">
                <a-select-option v-for="(item) in paymentTypeList" :disabled="item.disabled" :key="item.id" :value="item.id">{{item.value}}</a-select-option>
              </a-select>
              <a-input style="width: 150px" v-model="contractForm.paymentNo" :maxlength="19" placeholder="请输入账号" @blur="getBankName"/>
              <div class="dividerClass" v-if="contractForm.paymentType == 1"></div>
              <a-input style="width: 90px" v-if="contractForm.paymentType == 1" v-model="contractForm.bank" :maxlength="10" placeholder="所属银行" />
            </div>
          </label-item>
        </a-col>
      </a-row>
      <a-row :gutter="30" style="margin-top:8px;">
        <a-col class="width-280 f-fl">
          <label-item title="紧急联系人姓名" :mustFill="fieldsObj.emergencyType.required == 1">
            <div class="u-bottom-border address">
              <a-select v-model="contractForm.emergencyType" style="min-width: 120px">
                <a-select-option v-for="(item,index) in relationshipList" :disabled="item.disabled" :key="index" :value="item.value">{{item.label}}</a-select-option>
              </a-select>
              <a-input v-model="contractForm.emergencyName" :maxlength="11" placeholder="请输入" />
            </div>
          </label-item>
        </a-col>
        <a-col class="width-280 f-fl">
          <label-item title="紧急联系人电话" :mustFill="fieldsObj.emergencyType.required == 1">
            <div class="u-bottom-border address">
              <a-input v-model="contractForm.emergencyPhone" :maxlength="11" placeholder="请输入" />
            </div>
          </label-item>
        </a-col>
      </a-row>
    </div>
    <div class="contract-more">
      <a class="more" @click="moreFun" v-if="!moreFul">
        更多信息
        <icon-font style="font-size:16px;" type="iconyumengtubiao_jiantouxiangyou" />
      </a>
      <a class="more more-font" @click="moreFun" v-else>
        收起更多信息
        <icon-font style="font-size:16px;" type="iconyumengtubiao_jiantouxiangyou" />
      </a>
    </div>
    <label-item title="合同信息" border class="title-tiem">
      <div style="position: absolute;top:16px;left:75px;color: #ffa036;font-size: 12px;" v-if="this.ownerEndTime">业主合同结束日期：{{$moment(this.ownerEndTime).format('YYYY-MM-DD')}}</div>
      <a-row :gutter="30">
        <a-col class="width-140 f-fl">
          <label-item title="签约类型">
            <div class="u-bottom-border gender-box">
              <a-select v-model="contractForm.signType" style="min-width: 140px" :disabled="resetXuQianFlag">
                <a-select-option :value='1'>新签</a-select-option>
                <a-select-option :value='2'>续签</a-select-option>
              </a-select>
            </div>
          </label-item>
        </a-col>
        <a-col class="width-140 f-fl">
          <label-item title="合同编号"  :mustFill="fieldsObj.contractNo.required == 1">
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
                  <!-- <a-range-picker v-model="timeDateList" :format="dateFormat" @change="onChange" :disabledDate="disabledEndDate" :allowClear="false" /> -->
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
                <li @click="quickSelectYear(1);changeQuickDate()">1月</li>
                <li @click="quickSelectYear(3);changeQuickDate()">3月</li>
                <li @click="quickSelectYear(6);changeQuickDate()">6月</li>
                <li @click="quickSelectYear(12);changeQuickDate()">1年</li>
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
            <div class="u-bottom-border address payment" v-if="fieldsObj.depositPeriodType.depositPeriodTypeDiy == 0">
              <p class="pay1">押</p>
              <a-select v-model="contractForm.depositMonth"  style="width:50%" class="depositPeriodTypeDiy0_Style">
                <a-select-option v-for="(item,index) in options12" :key="index" :value="item.value">{{item.value===90?'自定义':item.value}}</a-select-option>
              </a-select>
              <p class="pay2" :class="{ 'nonePay': contractForm.periodMonth !==99  }" v-if="contractForm.periodMonth!==99">付</p>
              <a-select v-model="contractForm.periodMonth"  style="width:50%" class="depositPeriodTypeDiy0_Style" :class="{ 'fu-nonebox': contractForm.periodMonth ==99  }">
                <a-select-option v-for="(item,index) in options13" :key="index" :value="item.value">{{item.value===99?'一次性付':item.value}}</a-select-option>
              </a-select>
            </div>
            <div class="u-bottom-border address payment" v-if="fieldsObj.depositPeriodType.depositPeriodTypeDiy == 1">
              <a-select v-model="payListIndex"  @change="paymentListChange" style="width:100%" class="fu-box">
                <a-select-option v-for="(item,index) in payList" :key="index" :value="item.payListIndex">{{item.value}}</a-select-option>
              </a-select>
            </div>
          </label-item>
        </a-col>
      </a-row>
      <a-row :gutter="30" class="bgBox">
        <a-col class="width-280 f-fl">
          <label-item class="u-bottom-border" title="收租日设置" :mustFill="true">
            <a-radio-group class="payPattern f-fl" name="radioGroup" v-model="contractForm.payPattern" @change="payPatternChange" style="argin-left: 9px;">
              <a-radio :value="1" v-if="fieldsObj.payPattern.payPattern_01.checked == 1">提前</a-radio>
              <a-radio :value="2" v-if="fieldsObj.payPattern.payPattern_02.checked == 1">固定</a-radio>
              <a-radio :value="3" v-if="fieldsObj.payPattern.payPattern_03.checked == 1">固定</a-radio>
            </a-radio-group>
            <div class="payPatternBox u-bottom-border">
              <p v-if="fieldsObj.payPattern.payPattern_01.checked == 1">
                <a-input placeholder="请输入" style="text-align: center" v-model="payPatternValue1" />天收租
              </p>
              <p v-if="fieldsObj.payPattern.payPattern_02.checked == 1">
                <a-input placeholder="请输入" style="text-align: center" v-model="payPatternValue2" />号收租
                <span>(每期第一个月）</span>
              </p>
              <p v-if="fieldsObj.payPattern.payPattern_03.checked == 1">
                <a-input placeholder="请输入" style="text-align: center" v-model="payPatternValue3" />号收租
                <span>(每期提前一个月）</span>
              </p>
            </div>
          </label-item>
        </a-col>
        <a-col class="width-280 f-fl" style="position: relative;">
          <label-item class="u-bottom-border" title="零散租期设置" :mustFill="true" >
            <a-tooltip placement="top"  title="请先完善合同周期及租金信息再进行设置">
              <icon-font style="color:#FFA036;font-size:14px;position: absolute;left: 0px;top: 5px;width:180px" type="iconyumengtubiao_bangzhu" v-if="contractForm.beginTime === '' || this.contractForm.endTime === '' || !this.contractForm.price" />
            </a-tooltip>
            <a-radio-group class="zeroRentPeriod" name="radioGroup" :disabled="(contractForm.beginTime === '' ||
                                 this.contractForm.endTime === '' || !this.contractForm.price)" @change="fenkanshow" v-model="contractForm.zeroRentPeriod">
              <a-radio :value="4">不设置</a-radio>
              <a-radio :value="1">零散租期前置</a-radio>
              <a-radio :value="2">零散租期后置</a-radio>
              <a-radio :value="3">零散租期前后置</a-radio>
            </a-radio-group>
          </label-item>
        </a-col>
        <a-col class="width-280 f-fl" style="position: relative;">
          <label-item class="u-bottom-border" title="自定义付款周期设置" :mustFill="true" >
            <a-tooltip placement="top" style="width:200px;" title="请先完善合同周期及租金信息再进行设置">
              <icon-font style="color:#FFA036;font-size:14px;position: absolute;left: 30px;top: 5px;width:180px" type="iconyumengtubiao_bangzhu" v-if="contractForm.beginTime === '' || this.contractForm.endTime === '' || !this.contractForm.price" />
            </a-tooltip>
            <a-radio-group class="zeroRentPeriod" name="radioGroup" v-model="custom" @change="fenkanshowFk" :disabled="(contractForm.beginTime === '' ||
                                   this.contractForm.endTime === '' || !this.contractForm.price)">
              <a-radio :value="1">不自定义</a-radio>
              <a-radio :value="2">自定义</a-radio>
            </a-radio-group>
          </label-item>
        </a-col>
      </a-row>
      <a-row>
        <!-- 分阶费用 -->
        <grading-dialog :beginTime="contractForm.beginTime" :endTime="contractForm.endTime" :gradingData="postGradingData" @haveGrading="changeGradingStatus" :openGradingMath="openGradingMath" :resetGradingMath="resetGradingMath" @emitGrading="getGrading" @emitZeroAfter="emitZeroAfter" @emitZeroBefore="emitZeroBefore" :tenantFirst="contractForm.zeroRentPeriod" v-if="customshow" :custom="custom" :price="contractForm.price*100"></grading-dialog>
      </a-row>
    </label-item>
    <div class="contract-other cursor" @click="addExpenses(true)" v-if="otherExpenses.length==0">
      <icon-font style="font-size:16px;" type="iconyumengtubiao_tianjiazijian" /> 其他费用
    </div>
    <label-item title="加收费用" v-else>
      <div class="contract-modular" style="width:800px;">
        <div class="content-row">
          <div class="together-item">
            <div class="together-detail">
              <div class="together-title">
                <div style="max-width: 222px;">费用类型</div>
                <div style="max-width: 222px;">付款方式 </div>
                <div style="max-width: 400px;">金额 </div>
                <div style="max-width: 62px;text-align: center">操作</div>
              </div>
              <div class="together-data u-no-border" v-for="(item,index) in otherExpenses" :key="index">
                <div style="max-width: 222px;text-align: left;padding: 0 9px;">
                  <a-cascader class="myCascader" :allowClear="false" placeholder="请选择" v-model="item.id" :options="costTabsContent" :fieldNames="elcostcascaderValue" @change="(value) => costSelect(value, index)"></a-cascader>
                </div>
                <div class="payment feiyong" style="max-width: 222px;text-align: left;padding: 0 9px;">
                  <a-select v-model="item.periodMonth" @change="resetGrading" style="min-width: 140px" class="fu-box" :class="{ 'fu-nonebox': item.periodMonth ==99  }">
                    <a-select-option v-for="(item,index) in options14" :key="index" :value="item.value">{{item.value===99?'一次性付':item.value===100?'随房租付':item.value===1?'月付':item.value===2?'2月付':item.value===3?'季付':item.value===6?'半年付':item.value===12?'年付':'自定义'}}</a-select-option>
                  </a-select>
                </div>
                <div  class="clearfix" style="max-width: 400px;padding:0 9px;">
                  <label-item title="" class="u-no-border deptStyle f-fl">
                    <a-select style="width: 120px;height: 34px;" :allowClear="false" placeholder="请选择" v-model="item.type">
                      <a-select-option :value="1">按固定金额</a-select-option>
                      <a-select-option :value="2">按租金百分比</a-select-option>
                    </a-select>
                  </label-item>
                  <div class="house-data-item-left f-fl" style="padding-left: 15px;" v-show="item.type==1">
                    <span  class="addonBeforeStyle">¥</span>
                    <a-input style="width: 80px" v-model="item.price" v-validate="'money'" placeholder="请输入" />
                    <span  class="addonAfterStyle">元</span>
                  </div>
                  <div class="house-data-item-left f-fl" style="padding-left: 15px;" v-show="item.type==2">
                    <a-input style="width: 80px" v-model="item.percent" v-validate="'naturalNum|min(1)|max(100)'" placeholder="请输入" />
                    <span  class="addonAfterStyle">%</span>
                  </div>
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
      <span style="color:red" v-if="fieldsObj.fileIds.required == 1">*</span>
      <span>（附件支持格式：jpg、png、jpeg、pdf）</span>
      <!-- 上传图片 -->
    </div>
    <upload-file :picList="contractForm.fileIds" accept=".jpg, .jpeg, .png, .pdf" :uploadParms="sendData3_2" :showTips="false" ref="img3_2">
      <img src="../../../assets/login/other.png" style="width: 120px;height: 76px" class="choose" />
    </upload-file>
    <div class="clearfix" style="width: 100%;height: 40px;">
      <div class="f-fl" style="height: 40px;line-height: 40px;font-size: 16px;color: #111111;font-weight: 500;margin-right: 20px;">物业交割单</div>
      <div class="editDeliveryStyle commmonDeliveryStyle f-fl cursor" v-if="propertyDeliveryAddForm" @click="addDeliveryDialog = true">
        已设置交割单信息 <icon-font style="font-size:16px;color:#0A87F8;" type="iconyumengtubiao_bianji-1" />
      </div>
      <div class="addDeliveryStyle commmonDeliveryStyle f-fl cursor" v-else @click="addDeliveryDialog = true">
        <icon-font style="font-size:16px;color:#0A87F8;" type="iconyumengtubiao_tianjiazijian" /> 添加交割信息
      </div>
    </div>
    <label-item class="maintainer u-bottom-border" title="签约信息" border style="margin-bottom: 50px;">
      <a-row :gutter="30">
        <a-col class=" f-fl" style="width:300px">
          <label-item title="所属门店(部门)" :mustFill="true" v-if="!contractForm.houseId">
            <store-tree resMark="mk_contract_owner" @cancelOtherTree="cancelOtherTree(1)" :defaultValue='contractForm.deptName' placement="topLeft" ref="selectDept" width="200px" @selectChange="selectDept" :show-employee="false"></store-tree>
          </label-item>
        </a-col>
        <a-col class=" f-fl" style="width:300px" v-if="!contractForm.houseId">
          <label-item title="维护人">
            <dept-employee-tree resMark="mk_contract_renter" ref="selectMaintainer" @cancelOtherTree="cancelOtherTree(2)" @selectChange="selectDeptEmp" placement="topLeft" :disableDept="true" :defaultValue="contractForm.signMaintainName" placeholder='请选择维护人'>
            </dept-employee-tree>
          </label-item>
        </a-col>
        <a-col class=" f-fl" style="width:300px">
          <label-item title="签约人" :mustFill="true">
            <dept-employee-tree resMark="mk_contract_renter" ref="selectEmp" @cancelOtherTree="cancelOtherTree(3)" @selectChange="singDeptEmp" placement="topLeft" :disableDept="true" v-if="contractForm.signEmpName" :defaultValue="contractForm.signEmpName" placeholder='请选择签约人'>
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
      <a-button class="f-fr save-contract" type="warning" @click="saveContract" :loading="saveLoading">核对账单</a-button>
      <a-button class="f-fr quxiao" style="margin-right:20px;" type="warning" @click="cancelSaveTenantContract">取消</a-button>
      <div class="f-fr checkBillStyle">
        <a-checkbox v-model="isProduceRentDepositFlag" :disabled="fieldsObj.isProduceRentDeposit.unEditable==1">
        <span style="color: #111111;font-size: 14px;">生成房屋租金和押金账单</span>
        <span style="color: #FFA036;font-size: 12px;"> (此设置只针对租金和押金账单是否生成；不影响生成加收费用项账单)</span></a-checkbox>
      </div>
    </div>
    <!-- 账单预览 -->
    <bill-preview @confirmBill="confirmBill" @isUseBook="isUseBookFun" ref="saveBill" :phone="contractForm.phone" :houseId="contractForm.houseId" :deptId="contractForm.deptId" :postBillData="postBillData" v-if="billPreviewShow" :billData="billData" :show="billPreviewShow" @closeThis="billPreviewShow=false;saveLoading = false" @listDatafu="listDatafu" @paymentMethod="paymentMethodfu" :contractMedium="contractForm.contractMedium"></bill-preview>
    <!-- 添加合同弹框 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="authenticationFailedFul" class="ownModalBorder titDialog" :title="null">
      <authentication-failed @closeThis="goOn"></authentication-failed>
    </a-modal>
    <!-- 添加合同物业交割 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="addDeliveryDialog" class="ownModalBorder titDialog" title="物业交割单">
      <add-delivery :deliveryConfig="fieldsObj.deliveryConfig" :deliveryResetFlag="deliveryResetFlag" :houseId="contractForm.houseId" :deliveryHouseType="deliveryHouseType" :propertyDeliveryAddForm="propertyDeliveryAddForm" @cancelAdd="cancelAddDeliveryInfo" @addDeliveryInfo="addDeliveryInfo" ></add-delivery>
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment';
import gradingDialog from './gradingTenant';
import { employeeUserInfo } from '@/api/enterprise';
import {
  getContractTime,
  renterContract,
  renterContractAdd,
  tenantContractReset,
  listEnableDict,
  listFeeSubjectWithoutRentalFee,
  checkCard,
  getSimpleList,
  tenantContractDetail,
  viewContractDelivery,
} from '@/api/contract.js';
import { getBankName } from '@/api/public.js';
import {
  getOwnerBaseSimple,
} from '@/api/ownerContract.js';
import { searchHouse } from '@/api/reserve'
import billPreview from './billPreview';
import authenticationFailed from './authenticationFailed';
import DeptEmployeeTree from '@/components/DeptEmployeeTree';
import StoreTree from '@/components/DeptEmployeeTree/store';
import UploadFile from '@/components/OwnUpload/uploadFile';
import AddDelivery from './addDelivery';
import { moduleFieldConfigGet,bizDecisionGet } from '@/api/decision';
import { CURRENTDEPTID } from '@/store/mutation-types';
export default {
  name: "addTenantContract",
  components: {
    gradingDialog,
    billPreview,
    DeptEmployeeTree,
    StoreTree,
    authenticationFailed,
    UploadFile,
    AddDelivery,
  },
  props: {
    tenantContract: {   //合同ID
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
    },
    sourceFul:{       //来自线索
      type: Boolean,
      default: false
    },
    sourceObj:{
      type:Object,
      required: false
    },
  },
  data() {
    return {
      propertyDeliveryAddForm:undefined,
      deliveryHouseType: 3,           //默认整租/独栋
      addDeliveryDialog:false,       //添加物业交割
      authenticationFailedFul: false, //实名认证失败
      certificateDis: true,
      electronicsShow: true, // 租客签约进来 状态变为false
      billData: {},
      billPreviewShow: false,
      elcostcascaderValue: {
        value: 'id',
        label: 'name',
        children: 'metaList'
      },
      moreFul: false,
      fileIds: [], //附件信息

      contractForm: {
        name: '',//真实姓名
        certificateNo: '',//证件号码
        profession: '', //职业【1-制造（生产/工艺/制造），2-房产（房产/建筑），3-金融（金融/银行/投资/保险），4-医疗(医疗/护理/制药)，5-文化（文化/广告/传媒），6-法律（律师/法务），7-教育（教育/培训）， 8-行政（公务员/行政/事业单位）， 9-个体经营，10-贸易，11-物流，12-模特，13-空姐，14-学生，15-其它】
        employer: '', //工作单位
        gender: 1, //性别【1-男,2-女】
        interest: '',//爱好
        self: true,
        phone: '', //手机号
        tenantId: '', //租户ID
        certificateType: 1, //证件类型【1-身份证，2-护照，3-港澳通行证，4-台湾同胞证，5-军官证，6-驾驶证】
        customerResource: '', //渠道来源【字典】
        emergencyPhone: '',//紧急联系人电话
        emergencyType: '1',//紧急联系人性质【1-父母2-兄弟姐妹3-同事4-同学5-朋友6-亲属7-配偶8-其它】
        emergencyName: '', //紧急联系人姓名
        paymentType: 1,//收付款方式【1银联2支付宝3微信4美团5携程】
        bank:'',
        paymentNo: '',//支付号码
        contractId: '',//合同ID
        togetherList: [], //同住人集合
        billInfos: [], //费用类型账单集合
        contractMedium: 2,  //合同类型【1-纸质,2-电子】
        houseType: 0,
        fullAddress: undefined,//房源地址
        contractNo: '', //合同编号
        signType: 1,//签约类型【1-新签,2-续签】
        beginTime: undefined, //合同开始时间
        endTime: undefined,//合同结束时间
        price: '', //租金
        deposit: '', //押金
        periodMonth: 3, //付几（99-全付 100-随房租付 90-自定义）
        depositMonth: 1,//押几
        payPatternValue: 0,//收租模式值
        payPattern: 1, //收租模式【1-提前付款天数,2-固定付款日期,3-提前一个月固定付款日期】
        zeroRentPeriod: 4,
        addExplanation: '', //合同补充说明
        maintainerId: '', // 维护人ID【默认签约人ID】
        signTime: null,//签约时间
        signEmpName: '',
        signMaintainName: '',
        sendFlg: false, //是否发送租约给租户确认【0-否；1-是】
        isFinancialMonthly: false,
        contractPid: '', //续签的合同id（上一份合同id）
        houseId: '',  //房源id
        id: '', // 合同ID
        otherExpenses: '', //其他费用集合【json】
        paymentMethod: '', //处理完成账单的支付方式
        signEmpId: '',//签约人ID
        sublevelContract: '',//分阶合同���json】
        templateId: '',//合同模板ID
        fileIds: [],
        isUseBook: 0,   //定金是否抵扣：0、否，1、是
        bookIdList: [],
        certPlatform: 0,
        deptId:'',
        deptName:'',
      },
      interest: [],
      placeholder: '请输入房源编号/小区地址/项目名称/门牌号信息检索房源',
      nowTime: new Date().getTime(),
      houseData: {
        cityId: '',                     // 城市id
        communityId: '',
      },
      dateFormat: 'YYYY.MM.DD',           //日期选择器格式
      imgNum: '2-4',
      imgNum3_2: '3-2',
      loading: false,
      imageUrl: '',
      moneyType: [
        {
          type: 1,
          value: "现金"
        },
        {
          type: 2,
          value: "支付宝"
        },
        {
          type: 3,
          value: "微信"
        },
        {
          type: 4,
          value: "转账"
        },
        {
          type: 5,
          value: "其他"
        },
      ],
      hobbyList: [],
      channelList: [],
      sendData: {
        // 上传时附带的额外参数
        bizId: '', // 房源id
        bizType: 12, // 图片大类标识  凭证
        subBizType: 1, // 图片子类标识 预定凭证
        orderIndex: 1 // 排序值
      },
      previewVisible: false,
      previewImage: '',
      picList: [],
      communityList: [],
      mustFillBorder: false,
      clickSave: false,
      errFul: false,
      genderNanIng: true,
      genderNvIng: false,
      togetherList: [],
      costTabsContent: [], // 费用类型
      occupationList: [
        {
          label: '请选择',
          value: ''
        },
        {
          label: 'IT（计算机/互联网/通讯）',
          value: '0'
        },
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
          value: '1',
          disabled: false
        },
        {
          label: '兄弟姐妹',
          value: '2',
          disabled: false
        },
        {
          label: '同事',
          value: '3',
          disabled: false
        },
        {
          label: '同学',
          value: '4',
          disabled: false
        },
        {
          label: '朋友',
          value: '5',
          disabled: false
        },
        {
          label: '亲属',
          value: '6',
          disabled: false
        },
        {
          label: '配偶',
          value: '7',
          disabled: false
        },
        {
          label: '其他',
          value: '8',
          disabled: false
        }
      ],
      signTypeList: [
        {
          label: '新签',
          value: 1,
        },
        {
          label: '续签',
          value: 2,
        }
      ],
      options13: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }, { value: 99 }],
      options12: [{ value: 90 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }],
      options14: [{ value:99 }, { value: 100 },{ value: 1 },{ value: 2 }, { value: 3 }, { value: 6 }, { value: 12 }],
      payPatternValue1: 15,
      payPatternValue2: '',
      payPatternValue3: '',
      custom: 1,
      postGradingData: {},
      openGradingMath: 0,
      resetGradingMath: 0,
      gradingData: [],
      customshow: false,
      quickMonth: '', // 快速选择合同期限
      timeDate: '',
      timeDateList: [],
      signTimeDateList: {},
      otherExpenses: [], // 其他费用
      lastCheck: false,
      scatteredInfoAfter: {},
      scatteredInfoBefore: {},
      simpleList: [],
      sendData2_1: {},
      sendData2_2: {},
      sendData2_4: {},
      sendData2_6: {},
      sendData3_2: {},
      imgId2_1: '',
      imgId2_2: '',
      imgId2_6: '',
      imgList2_4: [],
      imgList3_2: [],
      item2_1: [],
      item2_2: [],
      item2_6: [],
      item2_4: [],
      postBillData: {},
      addressFul:false, // 预定签约时or房源签约 则不可更改房源地址
      ownerEndTime:null,//业主合同结束日期
      tempSignEmpInfo:{
        id:'',
        name:'',
      },
      fullAddressOld:'', // 旧的地址
      saveLoading:false,
      checkedFeeSubjectIds:[], //已选择的费用科目
      originCostTabsContent:[],//原始的所有费用科目
      endOpen: false,
      searchAddressHaveValue:false,
      searchLoading:false,
      canClearHouseIdflag:true,
      fieldsObj:{
        togetherPhone: { required: 0 },
        gender: { default: 1 },
        togetherGender: { default: 1 },
        contractNo: { required: 0 },
        isProduceRentDeposit:{
          required:0,     //是否必填
          unEditable:0,  //是否不可修改
          default:1,     //初始值
        },
        payPattern: { payPattern_01: { default: "15", checked: 1 }, payPattern_02: { checked: 1 }, payPattern_03: { checked: 1 }, required: 1 },
        otherPng: { required: 0 },
        paymentType: { unEditable: 0, required: 0,default: 1 },
        contractMedium: { default: 1, contractMedium_02: { templateIdList: [],templateDefaultList:[],templateNameList:[],templateList:[], checked: 1 }, contractMedium_01: { sendFlag: 0, checked: 1 } },
        idfanPng: { required: 1 },
        interest: { required: 0 },
        fileIds: { required: 0 },
        employer: { required: 0 },
        shouidPng: { required: 0 },
        customerResource: { unEditable: 0, required: 0 },
        profession: { required: 0 },
        otherExpenses: [],
        certificateNo: { required: 1 },
        togetherName: { required: 0 },
        depositPeriodType: {
          depositPeriodTypeDiy:0,
          depositPeriodTypeList_01:[],
          depositPeriodTypeList_02:[
            {default: 1, periodType: 3, deposit: 1}
          ]
        },
        paymentNo: { required: 0 },
        emergencyType: { unEditable: 0, required: 0,default: '1' },
        togetherCertificateType: { unEditable: 0, required: 0 ,default: 1},
        idzhengPng: { required: 1 },
        certificateType: { unEditable: 0, required: 1,default: 1 },
        deliveryConfig:{
          scenePic:0,        //必须现场拍照 0、可以不；1、必须
          required:0,      //1、现场；0、可后续
          goodList:[],
          goodDefault:0,   //0、默认；1、自定义配置
          roomList:[
            {
              houseType:2,
              type:1,
              roomType:1,
              names:[
                {comment:'',fileIds:[],valueType:4,value:0,name:'床',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'床头柜',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'床垫',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'衣柜',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'书桌',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'书架',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'椅子',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'空调',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'空调遥控器',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'房间门钥匙',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'门禁卡',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'电视',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'电视遥控器',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒遥控器',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'热水壶',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'穿衣镜',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'窗帘',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'晾衣架',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'台灯',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'垃圾桶',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'接线板',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'鞋柜',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'电视柜',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'沙发',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'茶几',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'智能锁',selected:true,},
              ],
              indeterminate:false,
              selectAll:true,
            },
            {
              houseType:2,
              type:2,
              roomType:1,
              names:[
                {comment:'',fileIds:[],valueType:4,value:0,name:'空调',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'冰箱',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'洗衣机',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'电视',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'路由器',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'热水器',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'微波炉油烟机',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'厨宝',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'浴霸',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'灶具',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'沙发',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'茶几',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'餐桌',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'餐椅',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'空调遥控器',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'电视遥控器',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒遥控器',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'钥匙',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'门禁卡',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'智能锁',selected:true,},
              ],
              indeterminate:false,
              selectAll:true,
            },
            {
              houseType:1,
              type:1,
              roomType:1,
              names:[
                {comment:'',fileIds:[],valueType:4,value:0,name:'床',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'床头柜',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'床垫',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'衣柜',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'书桌',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'书架',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'椅子',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'空调',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'空调遥控器',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'房间门钥匙',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'门禁卡',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'电视',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'电视遥控器',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒遥控器',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'热水壶',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'穿衣镜',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'窗帘',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'晾衣架',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'台灯',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'垃圾桶',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'接线板',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'鞋柜',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'电视柜',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'沙发',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'茶几',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'冰箱',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'洗衣机',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'路由器',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'热水器',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'微波炉',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'油烟机',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'厨宝',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'浴霸',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'灶具',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'餐桌',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'餐椅',selected:true,},
                {comment:'',fileIds:[],valueType:4,value:0,name:'智能锁',selected:true,},
              ],
              indeterminate:false,
              selectAll:true,
            },
          ],
        },
      },
      contractMustRelated:false,
      mustRelatedFul:false,
      deptId:"",
      payList:[],
      payListIndex:0,
      certificateTypeList:[
        {
          value: '身份证',
          id: 1,
          disabled: false
        },
        {
          value: '护照',
          id: 2,
          disabled: false
        },
        {
          value: '港澳通行证',
          id: 3,
          disabled: false
        },
        {
          value: '台湾同胞证',
          id: 4,
          disabled: false
        },
        {
          value: '企业营业执照',
          id: 5,
          disabled: false
        },
        {
          value: '其他',
          id: 6,
          disabled: false
        },
      ],
      togetherCertificateTypeList:[
        {
          value: '身份证',
          id: 1,
          disabled: false
        },
        {
          value: '护照',
          id: 2,
          disabled: false
        },
        {
          value: '港澳通行证',
          id: 3,
          disabled: false
        },
        {
          value: '台湾同胞证',
          id: 4,
          disabled: false
        },
        {
          value: '企业营业执照',
          id: 5,
          disabled: false
        },
        {
          value: '其他',
          id: 6,
          disabled: false
        },
      ],
      paymentTypeList:[
        {
          value: '银联',
          id: 1,
          disabled: false
        },
        {
          value: '支付宝',
          id: 2,
          disabled: false
        },
        {
          value: '微信',
          id: 3,
          disabled: false
        },
      ],
      resetXuQianFlag:false,
      deliveryResetFlag:false,
      isProduceRentDepositFlag:true,
    }
  },
  created() {
    this.deptId =  this.$ls.get(CURRENTDEPTID);
    this.getCost();
    this.getDict();
    if(this.houseFul){
      this.canClearHouseIdflag = false;
    }
    if (this.tenantContract) {   // 续签模式
      tenantContractDetail(this.tenantContract).then(res => {
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
    this.sendData2_4 = {
      // 上传时附带的额外参数
      bizId: '', // 房源id
      bizType: 2, // 图片大类标识  租客
      subBizType: 4, // 图片子类标识 其他证明
      orderIndex: 4 // 排序值
    }
    this.sendData2_6 = {
      // 上传时附带的额外参数
      bizId: '', // 房源id
      bizType: 2, // 图片大类标识  租客
      subBizType: 6, // 图片子类标识 手持半身
      orderIndex: 3 // 排序值
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
    cancelAddDeliveryInfo(){
      this.addDeliveryDialog = false;
    },
    addDeliveryInfo(propertyDeliveryAddForm){
      this.addDeliveryDialog = false;
      this.propertyDeliveryAddForm = propertyDeliveryAddForm;
    },
    initSelect(){
      //身份信息
      if(this.fieldsObj.certificateType.unEditable==1&&this.fieldsObj.certificateType.default){
        this.certificateTypeList.forEach((item)=>{
          if(item.id == this.fieldsObj.certificateType.default){
            item.disabled = false;
          }
          else{
            item.disabled = true;
          }
        });
      }
      else{
        this.certificateTypeList.forEach((item)=>{
          item.disabled = false;
        });
      }
      //客户来源
      if(this.fieldsObj.customerResource.unEditable==1&&this.fieldsObj.customerResource.default){
        this.channelList.forEach((item)=>{
          if(item.id == this.fieldsObj.customerResource.default ){
            item.disabled = false;
          }
          else{
            item.disabled = true;
          }
        });
      }
      else{
        this.channelList.forEach((item)=>{
          item.disabled = false;
        });
      }
      //与紧急联系人关系
      if(this.fieldsObj.emergencyType.unEditable==1&&this.fieldsObj.emergencyType.default){
        this.relationshipList.forEach((item)=>{
          if(item.value == this.fieldsObj.emergencyType.default){
            item.disabled = false;
          }
          else{
            item.disabled = true;
          }
        });
      }
      else{
        this.relationshipList.forEach((item)=>{
          item.disabled = false;
        });
      }
      //承租人收付款账号类型
      if(this.fieldsObj.paymentType.unEditable==1&&this.fieldsObj.paymentType.default){
        this.paymentTypeList.forEach((item)=>{
          if(item.id == this.fieldsObj.paymentType.default){
            item.disabled = false;
          }
          else{
            item.disabled = true;
          }
        });
      }
      else{
        this.paymentTypeList.forEach((item)=>{
          item.disabled = false;
        });
      }
      //同住人身份类型
      if(this.fieldsObj.togetherCertificateType.unEditable==1&&this.fieldsObj.togetherCertificateType.default){
        this.togetherCertificateTypeList.forEach((item)=>{
          if(item.id == this.fieldsObj.togetherCertificateType.default){
            item.disabled = false;
          }
          else{
            item.disabled = true;
          }
        });
      }
      else{
        this.togetherCertificateTypeList.forEach((item)=>{
          item.disabled = false;
        });
      }
    },
    //获取决策配置
    bizDecisionGetFun(){
      let paramter ={
        bizPoint: 'CONTRACT_BASE_RULE',
        // empId: id,
        mark: 'RENTER_CONTRACT_MUST_RELATED',
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
    //获取初始化配置
    moduleFieldConfigGetFun(val,initialization){
      let paramter ={
        features:'default',
        moduleMark: 'contract.renterContract',
        deptId:val
      };
      moduleFieldConfigGet(paramter).then(res=>{
        if(res&&res.data&&res.data.fieldsObj){
          this.fieldsObj = res.data.fieldsObj;
          //初始化默认值
          if (initialization) {
            if(this.fieldsObj.gender.default){
              this.contractForm.gender = this.fieldsObj.gender.default;
              if(this.contractForm.gender==1){
                this.genderNanIng = true;
                this.genderNvIng = false;
              }
              else if(this.contractForm.gender==2){
                this.genderNanIng = false;
                this.genderNvIng = true;
              }
            }
            if(this.fieldsObj.certificateType.default){
              this.contractForm.certificateType = this.fieldsObj.certificateType.default;
            }
            if(this.fieldsObj.customerResource.default){
              this.contractForm.customerResource = this.fieldsObj.customerResource.default;
            }
            if(this.fieldsObj.paymentType.default){
              this.contractForm.paymentType = this.fieldsObj.paymentType.default*1;
            }
            if(this.fieldsObj.emergencyType.default){
              this.contractForm.emergencyType = this.fieldsObj.emergencyType.default;
            }
            if(this.fieldsObj.payPattern.payPattern_01.checked == 1){
              this.contractForm.payPattern = 1;

            }else if(this.fieldsObj.payPattern.payPattern_01.checked == 0 && this.fieldsObj.payPattern.payPattern_02.checked == 1 ){
              this.contractForm.payPattern = 2;

            }else if(this.fieldsObj.payPattern.payPattern_01.checked == 0 && this.fieldsObj.payPattern.payPattern_02.checked == 0 ){
              this.contractForm.payPattern = 3;

            }
            this.payPatternValue1 = this.fieldsObj.payPattern.payPattern_01.default ? this.fieldsObj.payPattern.payPattern_01.default : '';
            this.payPatternValue2 = this.fieldsObj.payPattern.payPattern_02.default ? this.fieldsObj.payPattern.payPattern_02.default : '';
            this.payPatternValue3 = this.fieldsObj.payPattern.payPattern_03.default ? this.fieldsObj.payPattern.payPattern_03.default : '';
            if(this.fieldsObj.depositPeriodType.depositPeriodTypeDiy == 0){
              if(this.fieldsObj.depositPeriodType.depositPeriodTypeList_02[0].default == 1){
                this.contractForm.depositMonth = this.fieldsObj.depositPeriodType.depositPeriodTypeList_02[0].deposit;
                this.contractForm.periodMonth = this.fieldsObj.depositPeriodType.depositPeriodTypeList_02[0].periodType;
              }
            }else{
              let payList = [];
              this.fieldsObj.depositPeriodType.depositPeriodTypeList_01.forEach((v,i)=>{
                if(v.default == 1){
                  this.payListIndex = i
                }
                let deposit = '';
                let periodType = '';
                let text = '';
                if(v.deposit == 90){
                  deposit = '自定义';
                }else{
                  deposit = v.deposit;
                }
                if(v.periodType == 99){
                  periodType = '一次性付';
                }else{
                  periodType = v.periodType;
                }
                if(v.periodType == 99){
                  text = ' 押 ' + deposit + ' 一次性付 ';
                }else{
                  text = ' 押 ' + deposit + ' 付 ' + periodType;
                }
                let obj = {
                  value : text,
                  payListIndex: i
                }
                payList.push(obj)

              })
              this.payList = payList;
              this.contractForm.depositMonth = this.fieldsObj.depositPeriodType.depositPeriodTypeList_01[this.payListIndex].deposit;
              this.contractForm.periodMonth = this.fieldsObj.depositPeriodType.depositPeriodTypeList_01[this.payListIndex].periodType;
            }
            if(this.fieldsObj.otherExpenses.length>0){
              this.otherExpenses = this.fieldsObj.otherExpenses;
            }
            this.contractForm.contractMedium = this.fieldsObj.contractMedium.default;
            //电子合同，不让选择身份类型；纸质允许
            if(this.contractForm.contractMedium == 2){
              this.certificateDis = true;
            }
            else{
              if(this.fieldsObj.certificateType.unEditable == 1){
                this.certificateDis = true;
              }
              else{
                this.certificateDis = false;
              }
            }
            this.contractForm.sendFlg = this.fieldsObj.contractMedium.contractMedium_01.sendFlag == 1;
            if(!this.fieldsObj.isProduceRentDeposit){
              let obj = {
                required:0,     //是否必填
                unEditable:0,  //是否不可修改
                default:1,     //初始值
              };
              this.$set(this.fieldsObj, 'isProduceRentDeposit', obj);
            }
          }
          else{
            //下拉框的值，重置的时候必须初始化
            if(this.fieldsObj.depositPeriodType.depositPeriodTypeDiy == 1){
              let payList = [];
              this.fieldsObj.depositPeriodType.depositPeriodTypeList_01.forEach((v,i)=>{
                if(v.default == 1){
                  this.payListIndex = i
                }
                let deposit = '';
                let periodType = '';
                let text = '';
                if(v.deposit == 90){
                  deposit = '自定义';
                }else{
                  deposit = v.deposit;
                }
                if(v.periodType == 99){
                  periodType = '一次性付';
                }else{
                  periodType = v.periodType;
                }
                if(v.periodType == 99){
                  text = ' 押 ' + deposit + ' 一次性付 ';
                }else{
                  text = ' 押 ' + deposit + ' 付 ' + periodType;
                }
                let obj = {
                  value : text,
                  payListIndex: i
                }
                payList.push(obj)

              })
              this.payList = payList;
              this.contractForm.depositMonth = this.fieldsObj.depositPeriodType.depositPeriodTypeList_01[this.payListIndex].deposit;
              this.contractForm.periodMonth = this.fieldsObj.depositPeriodType.depositPeriodTypeList_01[this.payListIndex].periodType;
            }
            //其他费用
            if(this.fieldsObj.otherExpenses.length>0){
              this.otherExpenses = this.fieldsObj.otherExpenses;
            }
            if(!this.fieldsObj.isProduceRentDeposit){
              let obj = {
                required:0,     //是否必填
                unEditable:0,  //是否不可修改
                default:1,     //初始值
              };
              this.$set(this.fieldsObj, 'isProduceRentDeposit', obj);
            }
          }
        }else{
          this.fieldsObj = {
            togetherPhone: { required: 0 },
            gender: { default: 1 },
            togetherGender: { default: 1 },
            contractNo: { required: 0 },
            isProduceRentDeposit:{
              required:0,     //是否必填
              unEditable:0,  //是否不可修改
              default:1,     //初始值
            },
            payPattern: { payPattern_01: { default: "15", checked: 1 }, payPattern_02: { checked: 1 }, payPattern_03: { checked: 1 }, required: 1 },
            otherPng: { required: 0 },
            paymentType: { unEditable: 0, required: 0,default: 1 },
            contractMedium: { default: 1, contractMedium_02: { templateList:[],templateIdList: [],templateDefaultList:[],templateNameList:[], checked: 1 }, contractMedium_01: { sendFlag: 0, checked: 1 } },
            idfanPng: { required: 1 },
            interest: { required: 0 },
            fileIds: { required: 0 },
            employer: { required: 0 },
            shouidPng: { required: 0 },
            customerResource: { unEditable: 0, required: 0 },
            profession: { required: 0 },
            otherExpenses: [],
            certificateNo: { required: 1 },
            togetherName: { required: 0 },
            depositPeriodType: {
              depositPeriodTypeDiy:0,
              depositPeriodTypeList_01:[],
              depositPeriodTypeList_02:[
                {default: 1, periodType: 3, deposit: 1}
              ]
            },
            paymentNo: { required: 0 },
            emergencyType: { unEditable: 0, required: 0,default: '1' },
            togetherCertificateType: { unEditable: 0, required: 0,default: 1 },
            idzhengPng: { required: 1 },
            certificateType: { unEditable: 0, required: 1,default: 1 },
            deliveryConfig:{
              scenePic:0,        //必须现场拍照 0、可以不；1、必须
              required:0,      //1、现场；0、可后续
              goodList:[],
              goodDefault:0,   //0、默认；1、自定义配置
              roomList:[
                {
                  houseType:2,
                  type:1,
                  roomType:1,
                  names:[
                    {comment:'',fileIds:[],valueType:4,value:0,name:'床',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'床头柜',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'床垫',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'衣柜',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'书桌',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'书架',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'椅子',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'空调',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'空调遥控器',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'房间门钥匙',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'门禁卡',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'电视',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'电视遥控器',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒遥控器',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'热水壶',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'穿衣镜',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'窗帘',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'晾衣架',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'台灯',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'垃圾桶',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'接线板',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'鞋柜',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'电视柜',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'沙发',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'茶几',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'智能锁',selected:true,},
                  ],
                  indeterminate:false,
                  selectAll:true,
                },
                {
                  houseType:2,
                  type:2,
                  roomType:1,
                  names:[
                    {comment:'',fileIds:[],valueType:4,value:0,name:'空调',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'冰箱',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'洗衣机',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'电视',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'路由器',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'热水器',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'微波炉油烟机',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'厨宝',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'浴霸',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'灶具',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'沙发',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'茶几',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'餐桌',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'餐椅',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'空调遥控器',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'电视遥控器',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒遥控器',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'钥匙',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'门禁卡',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'智能锁',selected:true,},
                  ],
                  indeterminate:false,
                  selectAll:true,
                },
                {
                  houseType:1,
                  type:1,
                  roomType:1,
                  names:[
                    {comment:'',fileIds:[],valueType:4,value:0,name:'床',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'床头柜',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'床垫',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'衣柜',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'书桌',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'书架',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'椅子',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'空调',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'空调遥控器',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'房间门钥匙',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'门禁卡',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'电视',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'电视遥控器',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒遥控器',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'热水壶',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'穿衣镜',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'窗帘',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'晾衣架',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'台灯',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'垃圾桶',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'接线板',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'鞋柜',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'电视柜',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'沙发',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'茶几',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'冰箱',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'洗衣机',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'路由器',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'热水器',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'微波炉',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'油烟机',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'厨宝',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'浴霸',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'灶具',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'餐桌',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'餐椅',selected:true,},
                    {comment:'',fileIds:[],valueType:4,value:0,name:'智能锁',selected:true,},
                  ],
                  indeterminate:false,
                  selectAll:true,
                },
              ],
            },
          }

        }
        if(this.contractForm.houseId){
          this.getSimpleListFun(this.contractForm.houseId);
        }else{
          this.getSimpleListFun()
        }
        this.initSelect();
        if(this.fieldsObj.isProduceRentDeposit.default==0){
          this.isProduceRentDepositFlag = false;
        }
        else {
          this.isProduceRentDepositFlag = true;
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
      let continueFlag = false;
      if(this.ownerEndTime){
        let temp =this.ownerEndTime + 86400000;
        continueFlag = (temp <= endValue.valueOf());
      }
      if(continueFlag){
        return continueFlag;
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
    //获取银行卡所属银行
    getBankName(){
      if(this.contractForm.paymentType==1&&this.contractForm.paymentNo){
        getBankName(this.contractForm.paymentNo).then(res => {
          if (res.data ) {
            this.contractForm.bank = res.data;
          }
        })
      }
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
    getSimpleListFun(id) {
      getSimpleList(id).then(res => {
        if (res.code == "200") {
          this.simpleList = res.data;
          //若不存在合同模板，只能是纸质合同了
          if(this.simpleList.length==0){
            this.contractForm.contractMedium = 1;
            if(this.fieldsObj.certificateType.unEditable==1){
              this.certificateDis = true;
            }
            else{
              this.certificateDis = false;
            }
          }else{
            if(this.fieldsObj.contractMedium.contractMedium_02.templateList.length > 0){
              this.simpleList = this.fieldsObj.contractMedium.contractMedium_02.templateList;
              this.fieldsObj.contractMedium.contractMedium_02.templateDefaultList.forEach((v,i)=>{
                if(v == 1){
                  this.contractForm.templateId =  this.simpleList[i].id
                }
              })
            }
            //默认第一个
            if(!this.contractForm.templateId){
              this.contractForm.templateId = this.simpleList[0].id;
            }
          }
        }
      });
    },
    getOwnerBaseSimpleFun(housePid) {
      if (housePid) {
        getOwnerBaseSimple(housePid).then(res => {
          if (res.code == "200") {
            if(res.data){
              if (res.data.isAllowExceed == 0) {
                this.ownerEndTime = res.data.endTime;
              } else if (res.data.isAllowExceed == 1) {
                this.ownerEndTime = null;
              }
            }
            else{
              this.ownerEndTime = null;
            }
          }
        });
      }
    },
    init() {
      let date = new Date();
      this.contractForm.signTime = this.$moment(date.getTime())
      this.contractForm.beginTime = this.$moment(Vue.prototype.$moment().startOf('day').valueOf());
      if(this.houseFul || this.reserveFul||this.sourceFul){
        if(this.houseFul){ //如果是房源详情的签约
          this.houseFun(this.roomData);
        }
        if(this.reserveFul){ //如果是预定管理的签约
          this.reserveFun(this.reserveData);
          this.canClearHouseIdflag = false;
        }
        if(this.sourceFul){
          this.sourceFun(this.sourceObj);
          this.moduleFieldConfigGetFun(this.deptId,true)
        }
      }else{
        this.moduleFieldConfigGetFun(this.deptId,true)
      }
      //来自线索
      if(this.sourceFul&&this.sourceObj.leasePeriod){
        if(this.sourceObj.leasePeriod==1){
          this.quickSelectYear(1,true); // 初始   合同默认为一年
        }
        else if(this.sourceObj.leasePeriod==2){
          this.quickSelectYear(3,true); // 初始   合同默认为一年
        }
        else if(this.sourceObj.leasePeriod==3){
          this.quickSelectYear(6,true); // 初始   合同默认为一年
        }
        else{
          this.quickSelectYear(12,true); // 初始   合同默认为一年
        }
      }
      else{
        this.quickSelectYear(12,true); // 初始   合同默认为一年
      }

    },
    initMaintainInfo(){
      if(!this.contractForm.maintainerId){
        this.contractForm.maintainerId = this.contractForm.signEmpId;
        this.$set(this.contractForm,'signMaintainName',this.contractForm.signEmpName)
      }
    },
    houseFun(res){
      this.addressFul = true;
      this.contractForm.fullAddress = res.cityName+res.areaName+res.townName+res.fullAddress;
      this.contractForm.houseId = res.id;
      //防止出现问题
      //this.contractForm.housePid = res.id;
      this.contractForm.price = res.actualPrice/100;
      this.contractForm.deposit = res.actualPrice/100;
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
      if(res.deptId){
        this.contractForm.deptId = res.deptId;
        this.$set(this.contractForm,'deptName',res.deptName)
      }
      else{
        if (res.houseInfo) {
          this.contractForm.deptId = res.houseInfo.deptId;
          this.$set(this.contractForm, 'deptName', res.houseInfo.deptName)
        }
      }
      if(this.contractForm.deptId){
        this.moduleFieldConfigGetFun(this.contractForm.deptId,true);
      }else{
        this.moduleFieldConfigGetFun(this.deptId,true)
      }
      //与决策相关：是否允许超过业主合同结束时间
      this.getOwnerBaseSimpleFun(res.housePid);
      //获取房源详情
      this.deliveryHouseType = res.houseType;
    },
    reserveFun(res){
      this.addressFul = true;
      this.contractForm.fullAddress = res.houseAddress;
      this.contractForm.houseId = res.houseId;
      //防止出现问题
      //this.contractForm.housePid = res.housePid;
      this.contractForm.name = res.name;
      this.contractForm.phone = res.phone;
      this.contractForm.gender = res.gender;
      this.contractForm.certificateType = res.certificateType;
      this.contractForm.certificateNo = res.certificateNo;
      if(res.houseId) {
        this.contractForm.price = res.actualPrice / 100;
        this.contractForm.deposit = res.actualPrice / 100;
        this.contractForm.maintainerId = res.maintainerId;
        this.$set(this.contractForm,'signMaintainName',res.maintainerName);
        this.contractForm.deptId = res.deptId;
        this.$set(this.contractForm,'deptName',res.deptName)
      }
      if(this.contractForm.certificateType !=1){
        this.contractForm.certificateType = 1;
        this.contractForm.certificateNo = ''
      }
      if(this.contractForm.deptId){
        this.moduleFieldConfigGetFun(this.contractForm.deptId,true);
      }else{
        this.moduleFieldConfigGetFun(this.deptId,true)
      }
      //与决策相关：是否允许超过业主合同结束时间
      this.getOwnerBaseSimpleFun(res.housePid);
    },
    sourceFun(res){
      this.contractForm.name = res.name;
      this.contractForm.phone = res.phone;
      if(res.gender){
        if(res.gender==1){
          this.genderNan();
        }
        else if(res.gender==2){
          this.genderNv();
        }
      }
    },
    echoContract(data) {
      // 续签 回显数据
      let contract = data;
      let copyContract = Object.assign({}, contract);
      let renterContractViewDTO = copyContract.renterContractViewDTO;    //合同信息集合
      let contractSigner = copyContract.contractSigner;   //个人信息集合
      //初始化决策合同结束日期
      this.getOwnerBaseSimpleFun(renterContractViewDTO.housePid);
      this.togetherList = contractSigner ? contractSigner.togetherList : [];
      this.fileIds = contractSigner ? contractSigner.fileDTOList : []; // 租客图片
      if(contractSigner&&contractSigner.interestIdList){
        this.interest = contractSigner.interestIdList
      }else{
        this.interest = [];
      }

      let templateIdTemp = '';
      if(renterContractViewDTO.templateId){
        templateIdTemp = renterContractViewDTO.templateId;
      }
      else{
        if(this.simpleList&&this.simpleList.length>0){
          //默认第一个
          templateIdTemp = this.simpleList[0].id;
        }
      }
      this.otherExpenses = [];
      let contractForm = {
        name: contractSigner.name,//真实姓名
        certificateNo: contractSigner.certificateNo,//证件号码
        profession: contractSigner.profession, //职业【1-制造（生产/工艺/制造），2-房产（房产/建筑），3-金融（金融/银行/投资/保险），4-医疗(医疗/护理/制药)，5-文化（文化/广告/传媒），6-法律（律师/法务），7-教育（教育/培训）， 8-行政（公务员/行政/事业单位）， 9-个体经营，10-贸易，11-物流，12-模特，13-空姐，14-学生，15-其它】
        employer: contractSigner.employer, //工作单位
        gender: contractSigner.gender, //性别【1-男,2-女】
        phone: contractSigner.phone, //手机号
        tenantId: contractSigner.id, //租户ID
        certificateType: contractSigner.certificateType, //证件类型【1-身份证，2-护照，3-港澳通行证，4-台湾同胞证，5-军官证，6-驾驶证】
        customerResource: contractSigner.customerResource, //渠道来源【字典】
        emergencyPhone: contractSigner.emergencyPhone,//紧急联系人电话
        emergencyType: contractSigner.emergencyType,//紧急联系人性质【1-父母2-兄弟姐妹3-同事4-同学5-朋友6-亲属7-配偶8-其它】
        emergencyName: contractSigner.emergencyName, //紧急联系人姓名
        bank:contractSigner.bank,       //所属yinhang
        paymentType: contractSigner.paymentType,//收付款方式【1银联2支付宝3微信4美团5携程】
        paymentNo: contractSigner.paymentNo,//支付号码
        contractId: contractSigner.contractId,//合同ID
        togetherList: [], //同住人集合
        billInfos: [], //费用类型账单集合
        contractMedium: renterContractViewDTO.contractMedium,  //合同类型【1-纸质,2-电子】
        fullAddress: renterContractViewDTO.fullAddress,//房源地址
        contractNo: '', //合同编号
        signType: 2,//签约类型【1-新签,2-续签】
        price: renterContractViewDTO.price / 100, //租金
        deposit: renterContractViewDTO.deposit / 100, //押金
        periodMonth: renterContractViewDTO.periodMonth, //付几（99-全付 100-随房租付 90-自定义）
        depositMonth: renterContractViewDTO.depositMonth,//押几
        payPatternValue: renterContractViewDTO.payPatternValue,//收租模式值
        payPattern: renterContractViewDTO.payPattern, //收租模式【1-提前付款天数,2-固定付款日期,3-提前一个月固定付款日期】
        zeroRentPeriod: 4,
        addExplanation: renterContractViewDTO.addExplanation, //合同补充说明
        maintainerId: renterContractViewDTO.maintainerId, // 维护人ID【默认签约人ID】
        signMaintainName:renterContractViewDTO.maintainerName, // 维护人ID【房源维护人】
        deptId:renterContractViewDTO.deptId,//所属部门ID（门店）
        deptName:renterContractViewDTO.deptName,//所属部门名称（门店）
        signTime: this.$moment(new Date().getTime()),//签约时间
        sendFlg: false, //是否发送租约给租户确认【0-否；1-是】
        contractPid: renterContractViewDTO.contractPid, //续签的合同id（上一份合同id）
        houseId: renterContractViewDTO.houseId,  //房源id
        id: this.tenantContract, // 合同ID
        otherExpenses: [], //其他费用集合【json】
        paymentMethod: '', //处理完成账单的支付方式
        sublevelContract: '',//分阶合同【json】
        templateId: templateIdTemp,//合同模板ID
        fileIds: renterContractViewDTO.fileDTOList,
        signEmpName:this.tempSignEmpInfo.name,
        signEmpId:this.tempSignEmpInfo.id,
      };
      //重置负责人，若有房源维护人，
      if(renterContractViewDTO.maintainerId){
        this.contractForm.maintainerId = renterContractViewDTO.maintainerId;
        this.contractForm.signEmpName = renterContractViewDTO.maintainerName;
        this.$set(this.contractForm,'signMaintainName',this.contractForm.signEmpName)
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
          } else if (e.subBizType == 4) {
            this.item2_4.push(e)
          } else if (e.subBizType == 6) {
            this.item2_6.push(e)
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
        // 如果是重置合同
        if(this.tenantContract){
          contractForm.signType = renterContractViewDTO.signType;
          if(contractForm.signType == 2){
            this.resetXuQianFlag = true;
          }
          else{
            this.resetXuQianFlag = false;
          }
        }else{
          contractForm.signType = 1;
          this.resetXuQianFlag = false;
        }
        contractForm.contractPid = renterContractViewDTO.contractPid;
        let end = new Date(renterContractViewDTO.endTime)
        let begin = new Date(renterContractViewDTO.beginTime)
        let endStamp = end.getTime();
        let begStamp = begin.getTime();
        contractForm.beginTime = this.$moment(begStamp);
        contractForm.endTime = this.$moment(endStamp);
        contractForm.contractNo = renterContractViewDTO.contractNo;
        if(!contractForm.paymentType){
          contractForm.paymentType = 1;
        }
        if(renterContractViewDTO.houseId&&renterContractViewDTO.housePid&&renterContractViewDTO.houseId!=renterContractViewDTO.housePid){
          this.deliveryHouseType = 2;
        }
        else{
          this.deliveryHouseType = 3;
        }
        this.deliveryResetFlag = true;
      } else {
        contractForm.signType = 2; // 续签
        contractForm.id = '';
        contractForm.contractPid = this.tenantContract;
        let endTime = renterContractViewDTO.endTime;
        let time = new Date(endTime);

        let stamp = time.getTime() + 86400000;
        contractForm.beginTime = this.$moment(stamp);
        contractForm.endTime = null;
        if(!contractForm.paymentType){
          contractForm.paymentType = 1;
        }
        if(renterContractViewDTO.houseId&&renterContractViewDTO.housePid&&renterContractViewDTO.houseId!=renterContractViewDTO.housePid){
          this.deliveryHouseType = 2;
        }
        else{
          this.deliveryHouseType = 3;
        }
        this.deliveryResetFlag = true;
      }
      this.contractForm = contractForm;
      if (this.contractForm.gender === 1) {
        this.genderNanIng = true;
        this.genderNvIng = false;
      } else {
        this.genderNanIng = false;
        this.genderNvIng = true;
      }
      if (this.contractForm.contractMedium === 2) {
        this.contractForm.certificateType = 1;
        this.certificateDis = true;
      }
      else{
        this.certificateDis = false;
      }
      this.simpleList.forEach(function(e) {
        this.contractForm.certPlatform = e.certPlatform;
      }, this);
      if (this.contractResetStatus) {
        let data = []
        data.push(moment(this.contractForm.beginTime));
        setTimeout(()=>{
          if(this.ownerEndTime&&moment(this.contractForm.endTime)>this.ownerEndTime){
            this.contractForm.endTime = moment(this.ownerEndTime);
          }
          data.push(moment(this.contractForm.endTime));
          this.timeDateList = data;
          if(this.contractForm.endTime){
            this.getCoTime();
          }
        },500);
      } else {
        this.quickSelectYear(12,true); // 初始   合同默认为一年
      }
      this.checkIdentityCard();

      if(this.contractForm.deptId){
        this.moduleFieldConfigGetFun(this.contractForm.deptId);
      }else{
        this.moduleFieldConfigGetFun(this.deptId)
      }
      //获取合同物业交割
      this.getPropertyDeliveryAddForm();
    },
    getPropertyDeliveryAddForm(){
      //this.tenantContract
      viewContractDelivery(this.tenantContract).then(res => {
        if (res.code === '200') {
          if(res.data&&res.data.propertyDeliverySignForm){
              this.propertyDeliveryAddForm = res.data.propertyDeliverySignForm
          }
          else{
            this.propertyDeliveryAddForm = undefined;
          }
        }
      });
    },
    getDict() {
      // 爱好
      listEnableDict('aa0d5464605944538c06b01ef8a0a2ff').then(res => {
        this.hobbyList = res.data;
      });
      // 客户来源
      listEnableDict('add63a4f45ba444e8ca3c57ec4193a35').then(res => {
        this.channelList = res.data;
        let obj = {
          id: '',
          name: '请选择'
        }
        this.channelList.unshift(obj);
        // this.contractForm.customerResource = this.channelList[0].id;
        if(this.sourceFul&&this.sourceObj.bizType==2&&this.sourceObj.sourceChannelId){
          //调整租客线索-来自线索
          this.channelList.forEach((item)=>{
            if(this.sourceObj.sourceChannelId == item.id){
              this.contractForm.customerResource = item.id;
            }
          })
        }
        if(this.sourceFul&&this.sourceObj.bizType==1){
          //调整租客线索-来自预约
          this.channelList.forEach((item)=>{
            if(item.name == '网络获取'){
              this.contractForm.customerResource = item.id;
            }
          })
        }
      });
    },
    // 获取费用类型
    getCost(filterIndex, type, id) {
      const params = 'FEESUBJECT';
      listFeeSubjectWithoutRentalFee(params).then(res => {
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
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleCancel() {
      this.previewVisible = false;
    },
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
      this.contractForm.price = '';
      this.contractForm.deposit = '';
      this.communityList = [];
      this.deliveryHouseType = 3;
    },
    getCommunity(communityId) {
      this.contractForm.houseId = communityId;
      this.mustFillBorder = false;
      let housePid ='';
      this.communityList.forEach(function(e) {
        if (e.houseId == communityId) {
          housePid = e.housePid;
          this.fullAddressOld = e.fullAddress;
          this.contractForm.fullAddress = e.fullAddress;
          this.contractForm.maintainerId = e.maintainerId;
          this.contractForm.deptId = e.deptId;
          this.deliveryHouseType = e.houseType;
          this.contractForm.price = e.actualPrice/100;
          this.contractForm.deposit = e.actualPrice/100;
          this.$set(this.contractForm,'signMaintainName',e.maintainerName)
          this.$set(this.contractForm,'deptName',e.deptName)
          this.errFul = false;
          this.mustRelatedFul = false;
        }
      }, this);
      // this.getSimpleListFun(communityId);
      this.getOwnerBaseSimpleFun(housePid);
      this.moduleFieldConfigGetFun(this.contractForm.deptId);
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
        this.deliveryHouseType = 3;
        return;
      }else{
        this.searchAddressHaveValue = true;
      }
      let data = {
        fuzzyKeyword: searchVal,
        useBiz:2,
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
            this.errFul = false;
            this.mustRelatedFul = true;
          }
          this.searchLoading = true;
        }

      })
    },
    chooseModel() {

    },
    genderNan() {
      this.genderNanIng = true;
      this.genderNvIng = false;
      this.contractForm.gender = 1;
    },
    genderNv() {
      this.genderNanIng = false;
      this.genderNvIng = true;
      this.contractForm.gender = 2;
    },
    reduceFellow(index) {
      this.togetherList.splice(index, 1);
    },
    addFellow() {
      let certificationType = 1;
      let gender = 1;
      if(this.fieldsObj.togetherCertificateType.default){
        certificationType = this.fieldsObj.togetherCertificateType.default;
      }
      if(this.fieldsObj.togetherGender.default){
        gender = this.fieldsObj.togetherGender.default;
      }
      //检验必填
      let checkEach = true;
      this.togetherList.forEach((e) => {
        if (this.fieldsObj.togetherName.required == 1 && !e.name) {
          this.$message.warning('请填写同住人姓名');
          checkEach = false;
          return;
        }
        if (this.fieldsObj.togetherPhone.required == 1 && !e.phone) {
          this.$message.warning('请填写同住人电话');
          checkEach = false;
          return;
        }
        if (this.fieldsObj.togetherCertificateType.required == 1 && !e.certificateNo) {
          this.$message.warning('请填写同住人证件号码');
          checkEach = false;
          return;
        }
        if (this.fieldsObj.togetherCertificateType.required == 1 && !e.certificationType) {
          checkEach = false;
          this.$message.warning('请选择同住人证件类型');
          return;
        }
      });
      if (checkEach == false) {
        return false;
      }
      this.togetherList.push({
        name: '',
        gender: gender,
        phone: '',
        certificateNo: '',
        certificationType: certificationType
      });
    },
    moreFun() {
      this.moreFul = !this.moreFul;
    },
    onChange(date) {
      this.resetGradingMath = Math.random();
      this.contractForm.zeroRentPeriod = 4;
      this.custom = 1;
      this.contractForm.beginTime = date[0];
      this.contractForm.endTime = date[1];
      this.getCoTime();
    },
    resetGrading() {
      // 重置分解信息
      if (this.gradingData.length > 0) {
        this.showGrading();
      }
      if (this.contractForm.zeroRentPeriod !== 4) {
        this.showGrading();
      }
    },
    fenkanshow() {
      this.customshow = false;
      this.custom = 1;
      this.scatteredInfoAfter = {};
      this.scatteredInfoBefore = {};
      if (
          this.contractForm.beginTime === '' ||
          this.contractForm.endTime === ''
      ) {
        this.contractForm.zeroRentPeriod = 4
        this.$message.error('请选择合同期限后再设置分阶');
        return;
      }

      if (!this.contractForm.price) {
        this.contractForm.zeroRentPeriod = 4
        this.$message.error('请设置租金后再设置分阶');
        return;
      }
      if (this.contractForm.zeroRentPeriod !== 4) {
        setTimeout(() => {
          this.customshow = true;
        }, 1);
      } else {
        this.customshow = false;
      }
    },
    fenkanshowFk(e) {
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
      if (this.custom === 2 || this.contractForm.zeroRentPeriod !== 4) {
        this.customshow = true;
        this.showGrading();
      } else {
        this.customshow = false;

      }
    },
    changeGradingStatus(have) {
      if (have) {
        this.showGrading();
      } else {
        this.gradingData = [];
      }
    },
    showGrading() {
      let postData = {
        beginTime: this.contractForm.beginTime,
        endTime: this.contractForm.endTime,
        periodMonth: this.contractForm.periodMonth,
        price: this.contractForm.price,
        payPattern: this.contractForm.payPattern,
        payPatternValue: this.contractForm.payPatternValue,
        deposit: this.contractForm.deposit,
        signType: this.contractForm.signType
      };
      // 触发分阶
      this.postGradingData = postData;
      this.openGradingMath = Math.random();
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
    changeQuickDate() {
      this.resetGradingMath = Math.random();
      this.contractForm.zeroRentPeriod = 4;
      this.custom = 1;
    },
    quickSelectYear(month,val) {
      //val:是否初始化
      if(this.quickMonth!=month){
        this.resetGradingMath = Math.random();
        this.contractForm.zeroRentPeriod = 4;
        this.custom = 1;
      }
      // 快速选择合同期限的结束时间
      this.quickMonth = month;
      if (this.contractForm.beginTime !== '') {
        let start = this.$moment(this.contractForm.beginTime).format('YYYY-MM-DD').split('-');
        let yue = start[1];
        let nian = start[0] * 1;
        yue = start[1] * 1 + month;
        if (yue > 12) {
          yue = yue - 12;
          nian = nian + 1;
        }
        let endString = nian + '/' + yue + '/' + start[2];
        let end = new Date(endString);
        end = end.getTime() - 86400000;
        this.contractForm.endTime = this.$moment(end);
        let data = []
        data.push(moment(this.contractForm.beginTime));
        if(val){
          //延迟500ms等待，页面初始化时，等待业主合同结束时间返回计算合同周期
          setTimeout(()=>{
            if(this.ownerEndTime&&moment(this.contractForm.endTime)>this.ownerEndTime){
              this.contractForm.endTime = moment(this.ownerEndTime);
            }
            data.push(moment(this.contractForm.endTime));
            this.timeDateList = data;
            this.getCoTime();
          },500);
        }else{
          data.push(moment(this.contractForm.endTime));
          this.timeDateList = data;
          this.getCoTime();
        }
      } else {
        this.$message.error('请先选择一个开始日期');
      }
    },
    getCoTime() {
      let postData = {
        beginDate: this.contractForm.beginTime,
        endDate: this.contractForm.endTime,
      };
      if(this.contractForm.deptId){
        postData.deptId = this.contractForm.deptId;
      }
      else{
        postData.deptId = this.deptId;
      }
      getContractTime(postData).then(res => {
        if (res.code === '200') {
          this.contractForm.endTime = moment(res.data.endDate);
          if(res.data.prompt){
            this.$message.error(res.data.prompt);
          }
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
          if(item.type==1&&!item.price&&item.price==0){
            temp = true;
          }
          if(item.type==2&&!item.percent){
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
          price: 0,
          type:1
        });
      }
      else {
        this.otherExpenses.push({
          periodMonth: 99,
          desc: '',
          feeSubjectId: '',
          payType: '',
          price: 0,
          type:1
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
    interestChange(val) {
      this.interest = val;
    },
    payPatternChange(val) {
      if (this.contractForm.payPattern == 1) {
        this.contractForm.payPatternValue = this.payPatternValue1;
      } else if (this.contractForm.payPattern == 2) {
        this.contractForm.payPatternValue = this.payPatternValue2;
      } else {
        this.contractForm.payPatternValue = this.payPatternValue3;
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
    isUseBookFun(data) {
      this.contractForm.bookIdList = data;
    },
    confirmBill() {
      // 确认账单 保存合同
      let postDataForm = Object.assign({}, this.contractForm);
      postDataForm.interest = this.interest;
      let postData = {
        contractSignerForm: {
          // 合同租户信息表Form
          name: postDataForm.name,
          bank:postDataForm.bank,
          certificateNo: postDataForm.certificateNo,
          profession: postDataForm.profession,
          employer: postDataForm.employer,
          gender: postDataForm.gender,
          interest: postDataForm.interest,
          self: postDataForm.self,
          phone: postDataForm.phone,
          nationality: postDataForm.nationality,
          certificateType: postDataForm.certificateType,
          customerResource: postDataForm.customerResource,
          emergencyPhone: postDataForm.emergencyPhone,
          emergencyType: postDataForm.emergencyType,
          emergencyName: postDataForm.emergencyName,
          paymentType: postDataForm.paymentType,
          paymentNo: postDataForm.paymentNo,
          // id:postDataForm.tenantId,
          // contractId:postDataForm.contractId
        },
        // houseAlias: postDataForm.houseAlias,
        fullAddress: postDataForm.fullAddress,
        // maintainerDeptId: postDataForm.maintainerDeptId,
        housePid: postDataForm.housePid,
        // maintainerId: postDataForm.maintainerId,
        houseId: postDataForm.houseId,
        contractPid:postDataForm.contractPid,
        id:postDataForm.id,
        contractMedium: postDataForm.contractMedium,
        templateId: postDataForm.templateId,
        houseType: postDataForm.houseType,
        contractNo: postDataForm.contractNo,
        signType: postDataForm.signType,
        beginTime: postDataForm.beginTime,
        endTime: postDataForm.endTime,
        price: postDataForm.price,
        deposit: postDataForm.deposit,
        periodMonth: postDataForm.periodMonth,
        depositMonth: postDataForm.depositMonth,
        payPatternValue: postDataForm.payPatternValue,
        payPattern: postDataForm.payPattern,
        zeroRentPeriod: postDataForm.zeroRentPeriod,
        addExplanation: postDataForm.addExplanation,
        signTime: postDataForm.signTime,
        signEmpId: postDataForm.signEmpId,
        signDeptId: postDataForm.signDeptId,
        maintainerId: postDataForm.maintainerId,
        isUseBook: postDataForm.isUseBook,
        bookIdList: postDataForm.bookIdList,
        certPlatform:postDataForm.certPlatform,
        notCertified : postDataForm.notCertified ? 1 :0,
        deptId:this.contractForm.deptId,
      };
      // console.log(postData.notCertified)
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

      postData.contractSignerForm.togetherList = this.togetherList;
      postData.otherExpenses = otherExpenses;
      postData.customizeInfoList = gradingData;
      postData.billInfos = this.listData;
      postData.paymentMethod = this.contractForm.paymentMethod;
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
      if (this.contractForm.contractMedium === 1) {
        postData.sendFlg = this.contractForm.sendFlg ? 1 : 0;
      }
      if (this.contractForm.contractMedium === 2) {
        postData.isFinancialMonthly = this.contractForm.isFinancialMonthly
            ? 1
            : 0;
      }
      //来自线索
      if(this.sourceFul){
        postData.bizType = this.sourceObj.bizType;
        postData.bizId = this.sourceObj.bizId;
      }
      //物业交割
      if(this.propertyDeliveryAddForm){
        let fileIds = [];
        this.propertyDeliveryAddForm.fileDTOList&&this.propertyDeliveryAddForm.fileDTOList.forEach((item)=>{
          fileIds.push(item.id);
        });
        let propertyDeliveryAddForm ={
          comment:this.propertyDeliveryAddForm.comment,
          fileIds:fileIds,
          pubDeliveryNoteList:this.propertyDeliveryAddForm.pubDeliveryNoteList,
          pubHydropwerList:this.propertyDeliveryAddForm.pubHydropwerList,
          roomDeliveryNoteList:this.propertyDeliveryAddForm.roomDeliveryNoteList,
          roomHydropwerList:this.propertyDeliveryAddForm.roomHydropwerList,
          sceneType:1,
        };
        postData.propertyDeliveryAddForm = propertyDeliveryAddForm;
      }
      if(this.contractResetStatus){ //重置合同
        tenantContractReset(postData).then(res => {
          if (res.code === '200') {
            this.$refs.saveBill.saveLoadingChange();
            this.$refs.saveBill.simpleCloseThis();
            this.saveLoading = false;
            this.$message.success('租客合同重置成功');
            this.$emit('saveSuccess', true, res.data);
          }else{
            this.$refs.saveBill.saveLoadingChange();
          }
        });
      }else{
        renterContractAdd(postData).then(res => {
          if(!res){
            this.saveLoading = false;
            this.$refs.saveBill&&this.$refs.saveBill.saveLoadingChange();
            return;
          }
          if (res.code === '200') {
            if (res.data.isCertified == 0) {
              this.billPreviewShow = false;
              this.authenticationFailedFul = true;
            } else {
              this.$message.success('保存租客合同成功');
              this.$emit('saveSuccess', true);
            }

          }else{
            this.saveLoading = false;
            this.$refs.saveBill.saveLoadingChange();
          }
        });
      }


    },
    listDatafu(data) {
      this.listData = data;
    },
    paymentMethodfu(data) {
      this.contractForm.paymentMethod = data;
    },
    cancelSaveTenantContract(){
      this.$emit('cancelSaveTenantContract');
    },
    saveContract() {
      if(moment(this.contractForm.endTime)<moment(this.contractForm.beginTime)){
        this.$message.warning('租客合同选择的开始日期不能超过截止日期');
        return;
      }
      if(this.ownerEndTime&&moment(this.contractForm.endTime)>this.ownerEndTime){
        this.$message.warning('租客合同选择的截止日期不能超过业主合同的截止日期'+this.$moment(this.ownerEndTime).format('YYYY-MM-DD').split('-'));
        return;
      }
      if (this.$refs.img2_1.picsList.length != 0) {
        this.imgId2_1 = this.$refs.img2_1.picsList[0].id;
      }
      if (this.$refs.img2_2.picsList.length != 0) {
        this.imgId2_2 = this.$refs.img2_2.picsList[0].id;
      }
      if (this.$refs.img2_6.picsList.length != 0) {
        this.imgId2_6 = this.$refs.img2_6.picsList[0].id;
      }
      if (this.$refs.img2_4.picsList.length != 0) {
        let imgObj2_4 = this.$refs.img2_4.picsList;
        let list = [];
        if (imgObj2_4.length > 0) {
          imgObj2_4.forEach(function(e) {
            list.push(e.id)
          }, this);
        }
        this.imgList2_4 = list;
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
        let temp = false;
        this.otherExpenses.forEach((item)=>{
          if(!item.feeSubjectId){
            temp = true;
          }
          if(!item.periodMonth){
            temp = true;
          }
          if(item.type==1&&!item.price){
            temp = true;
          }
          if(item.type==2&&!item.percent){
            temp = true;
          }
        });
        if(temp){
          this.$message.error('请完善费用信息');
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

        // 暂时不管这个
        if (this.contractForm.contractMedium === 2) {
          if (this.contractForm.templateId === '') {
            this.$message.warning('请选择电子合同模板');
            return;
          }
        }
        let scatteredInfoBefore = JSON.parse(
            JSON.stringify(this.scatteredInfoBefore)
        );
        let scatteredInfoAfter = JSON.parse(
            JSON.stringify(this.scatteredInfoAfter)
        );
        if (this.contractForm.zeroRentPeriod === 1) {
          if (!scatteredInfoBefore.amount || !scatteredInfoBefore.endTime) {
            this.$message.warning('请填写零散租期设置');
            return;
          }
        } else if (this.contractForm.zeroRentPeriod === 2) {
          if (!scatteredInfoAfter.amount || !scatteredInfoAfter.beginTime) {
            this.$message.warning('请填写零散租期设置');
            return;
          }
        } else if (this.contractForm.zeroRentPeriod === 3) {
          if (
              !scatteredInfoBefore.amount ||
              !scatteredInfoAfter.amount ||
              !scatteredInfoAfter.beginTime ||
              !scatteredInfoBefore.endTime
          ) {
            this.$message.warning('请填写零散租期设置');
            return;
          }
        }
        if (!this.contractForm.deptId) {
          this.$message.warning('请选择所属门店(部门)！');
          return;
        }

        if (this.contractForm.contractMedium === 1) {
          this.contractForm.templateId = '';
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
        let postData = {
          beginTime: this.contractForm.beginTime,
          deposit:  Math.round(this.contractForm.deposit * 100),
          depositMonth: this.contractForm.depositMonth,
          endTime: this.contractForm.endTime,
          // freeDays: this.contractForm.freeDays,
          zeroRentPeriod: this.contractForm.zeroRentPeriod,
          otherExpenses: otherExpenses,
          payPattern: this.contractForm.payPattern,
          payPatternValue: this.contractForm.payPatternValue,
          periodMonth: this.contractForm.periodMonth,
          price:  Math.round(this.contractForm.price * 100),
          signType: this.contractForm.signType,
          houseId: this.contractForm.houseId,
          phone: this.contractForm.phone,
          isUseBook: this.contractForm.isUseBook,
          deptId:this.contractForm.deptId,
          isProduceRentDeposit:this.isProduceRentDepositFlag?1:0,
        };

        scatteredInfoBefore.amount =  Math.round(scatteredInfoBefore.amount * 100);
        postData.scatteredInfoBefore = scatteredInfoBefore;

        scatteredInfoAfter.amount =  Math.round(scatteredInfoAfter.amount * 100);
        postData.scatteredInfoAfter = scatteredInfoAfter;

        if (this.tenantContract) {
          postData.contractId = this.tenantContract;
          postData.contractPid = this.tenantContract;
        }
        if (this.gradingData.length > 0) {
          // postData.subLevels = this.gradingData;
          let gradingData = JSON.parse(JSON.stringify(this.gradingData));
          for (let item of gradingData) {
            item.price =  Math.round(item.price * 100);
          }
          postData.customizeInfoList = gradingData;
        }
        if(this.fieldsObj.certificateType.required==1||this.contractForm.contractMedium==2){
          this.lastCheckIdentityCard(this.contractForm.certificateNo, this.contractForm.certificateType,postData)
        }else {
          this.calcBillPreview(postData);
        }
      }
    },
    calcBillPreview(postData) {
      this.saveLoading = true;
      renterContract(postData).then(res => {
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
      // 电子合同
      if (this.contractForm.contractMedium == 2 && !this.contractForm.templateId) {
        this.$message.warning('请选择合同模板!');
        return false;
      }
      if (!this.contractForm.name) {
        this.$message.warning('请输入姓名!');
        return false;
      }
      if (this.checkPhone(this.contractForm.phone)) {
        // 这个是判断字段传的是否正确  电话号码
        return false;
      }
      if ((this.fieldsObj.certificateType.required==1||this.contractForm.contractMedium==2) && (!this.contractForm.certificateType || !this.contractForm.certificateNo)) {
        this.$message.warning('请完善身份信息!');
        return false;
      }
      let checkEach = true;
      this.togetherList.forEach((e) => {
        if (this.fieldsObj.togetherName.required == 1 && !e.name) {
          this.$message.warning('请填写同住人姓名');
          checkEach = false;
          return;
        }
        if (this.fieldsObj.togetherPhone.required == 1 && !e.phone) {
          this.$message.warning('请填写同住人电话');
          checkEach = false;
          return;
        }
        if (this.fieldsObj.togetherCertificateType.required == 1 && !e.certificateNo) {
          this.$message.warning('请填写同住人证件号码');
          checkEach = false;
          return;
        }
        if (this.fieldsObj.togetherCertificateType.required == 1 && !e.certificationType) {
          checkEach = false;
          this.$message.warning('请选择同住人证件类型');
          return;
        }
      });
      if (checkEach == false) {
        return false;
      }
      if (this.fieldsObj.idzhengPng.required == 1 && !this.imgId2_1) {
        this.$message.warning('请上传身份证正面!');
        return false;
      }
      if (this.fieldsObj.idfanPng.required == 1 && !this.imgId2_2) {
        this.$message.warning('请上传身份证反面!');
        return false;
      }
      if (this.fieldsObj.shouidPng.required == 1 && !this.imgId2_6) {
        this.$message.warning('请上传手持身份证!');
        return false;
      }
      if (this.fieldsObj.otherPng.required == 1 && this.imgList2_4.length == 0) {
        this.$message.warning('请上传其它证件!');
        return false;
      }
      if (this.fieldsObj.customerResource.required == 1 && !this.contractForm.customerResource) {
        this.$message.warning('请选择客户来源!');
        return false;
      }
      if (this.fieldsObj.profession.required == 1 && !this.contractForm.profession) {
        this.$message.warning('请选择职业!');
        return false;
      }
      if (this.fieldsObj.employer.required == 1 && !this.contractForm.employer) {
        this.$message.warning('请输入工作单位!');
        return false;
      }
      if (this.fieldsObj.interest.required == 1 && this.interest.length == 0) {
        this.$message.warning('请选择爱好!');
        return false;
      }
      if(this.fieldsObj.paymentType.required == 1&& !this.contractForm.paymentType){
        this.$message.warning('请选择账号类型!');
        return false;
      }
      if(this.fieldsObj.paymentType.required == 1&& !this.contractForm.paymentNo){
        this.$message.warning('请输入承租人收付款账号!');
        return false;
      }
      if(this.fieldsObj.emergencyType.required == 1&& !this.contractForm.emergencyType){
        this.$message.warning('请选择紧急联系人与租户关系!');
        return false;
      }
      if(this.fieldsObj.emergencyType.required == 1&& !this.contractForm.emergencyName){
        this.$message.warning('请输入紧急联系人姓名!');
        return false;
      }
      if(this.fieldsObj.emergencyType.required == 1&&this.checkPhone(this.contractForm.emergencyPhone)){
        this.$message.warning('请输入紧急联系人正确的手机号码!');
        return false;
      }
      if (!this.contractForm.contractNo&&this.fieldsObj.contractNo.required == 1) {
        this.$message.warning('请输入合同编号!');
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
      if(!this.contractForm.depositMonth||!this.contractForm.periodMonth){
        this.$message.warning('请选择付款方式!');
        return false;
      }
      this.payPatternChange();
      if (!this.contractForm.payPatternValue) {
        if(this.contractForm.payPatternValue!=0) {
          this.$message.warning('请设置收租日!');
          return false;
        }
      }
      if(this.fieldsObj.fileIds.required == 1&&this.imgList3_2.length == 0){
        this.$message.warning('请上传合同附件!');
        return false;
      }
      if (!this.contractForm.houseId&&!this.contractForm.deptId) {
        this.$message.warning('请选择所属门店(部门)！');
        return false;
      }
      if (!this.contractForm.signEmpId) {
        this.$message.warning('请选择签约人!');
        return false;
      }
      if(this.fieldsObj.deliveryConfig&&this.fieldsObj.deliveryConfig.required == 1){
        if(!this.propertyDeliveryAddForm){
          this.$message.warning('请填写物业交割单!');
          return false;
        }
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
    contractMedium1() {
      this.contractForm.contractMedium = 1;
      this.certificateDis = false;

    },
    contractMedium2() {
      this.contractForm.contractMedium = 2;
      this.contractForm.certificateType = 1;
      this.certificateDis = true;
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
    templateIdChange(val) {
      this.simpleList.forEach(function(e) {
        if (val == e.id) {
          this.contractForm.certPlatform = e.certPlatform;
        }
      }, this);
    },
    goOn(val){
      this.authenticationFailedFul=false;
      if(val){
        this.contractForm.notCertified = val;
        if(val == 1){
          this.confirmBill();
        }
      }
      else{
        this.saveLoading = false;
      }
    },
    paymentListChange(e){
      this.payListIndex = e;
      this.contractForm.depositMonth = this.fieldsObj.depositPeriodType.depositPeriodTypeList_01[this.payListIndex].deposit;
      this.contractForm.periodMonth = this.fieldsObj.depositPeriodType.depositPeriodTypeList_01[this.payListIndex].periodType;
    }
  }

}
</script>

<style scoped lang="less">
.addTenantContract-box {
  padding: 0 20px 20px 20px;
  height: calc(100vh - 150px);
  overflow: auto;
  .contract-model {
    margin-left: -30px;
    &>div {
      position: relative;
      margin-left: 30px;
      padding: 10px 16px;
      width: calc(50% - 30px);
      height: 110px;
      line-height: 25px;
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      cursor: pointer;
      p:first-child {
        color: @mainFontColor;
      }
      p:last-child {
        color: @tableTitle;
      }
      .choose {
        display: none;
        position: absolute;
        top: 20px;
        right: -2px;
        transform: translateY(-50%);
        color: @themeColor;
        font-size: 36px;
        height: 40px;
        width: 40px;
      }
    }
    .active {
      background-color: @themeBgColor;
      border: 1px solid @themeColor;
      .choose {
        display: block;
      }
      .anticon {
        color: #0A87F8;
      }
      & /deep/.ant-select-selection {
        background-color: @themeBgColor;
      }
    }
    .type-boder {
      border-bottom: 1px solid #DDDDDD;
      padding: 0 0 7px 0;
    }
    .contractType {
      margin-left: 10px;
      font-weight: 500;
      font-size: 16px;
      color: rgba(17, 17, 17, 1);
      .font-12 {
        color: #777777;
        font-size: 12px;
      }
    }
    .htmb {
      height: 32px;
      line-height: 30px;
    }
    .board-box {
      margin-left: 12px;
      background: none;
      & /deep/.ant-select-selection {
        border: none;
        background: none;
      }
    }
  }
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
              // height: 100%;
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
                margin-left: 1px;
                margin-top: 3px;
              }
              /deep/ .ant-select-dropdown-menu{
                li{
                  text-align: left;
                }
              }
            }
            .house-data-item-left{
              margin-left: 40px;
              position: relative;
              .addonBeforeStyle{
                font-size: 14px;
                color: #111111;
                position: absolute;
                left: 0;
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
  .contract-more {
    width: 1160px;
    height: 40px;
    background: rgba(246, 247, 248, 1);
    border-radius: 4px;
    text-align: center;
    .more {
      color: #0A87F8;
      font-size: 14px;
      line-height: 40px;
    }
    .more-font {
      .anticon {
        -moz-transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
      }
    }
  }
  .more-item {
    width: 1160px;
    .interestBox {
      & /deep/.ant-select-selection {
        overflow: hidden;
        height: 32px;
        ul {
          li:first-child{
            padding: 0 20px 0 2px;
          }
          li {
            padding: 0 2px 0 2px;
          }
          .ant-select-search--inline {
            padding: 0;
            width: 2px;
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
        /deep/  .ant-input{
          padding: 0;
        }
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
      right: 94px;
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
      padding-left: 0px;
      padding-right: 0px;
      text-align: left;
    }
    .depositPeriodTypeDiy0_Style{
      & /deep/.ant-select-selection-selected-value {
        padding-left: 20px !important;
        padding-right: 0px;
      }
    }
    .fu-box {
      & /deep/.ant-select-selection-selected-value {
        padding-left: 0px;
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
      margin: 26px 15px 0;
      .zeroRentPeriod {
        & /deep/ .ant-radio-wrapper {
          width: 46%;
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
  .commmonDeliveryStyle{
    height: 40px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #0a87f8;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #0a87f8;
    line-height: 40px;
    text-align: center;
  }
  .editDeliveryStyle{
    width: 163px;
  }
  .addDeliveryStyle{
    width: 140px;
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
  /deep/ .ant-select-selection--multiple .ant-select-selection__placeholder{
    margin-left: 0;
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
