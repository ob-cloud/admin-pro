<template>
    <div class="contract-default-box">
        <div class="header clearfix">
            <div class="item left-item cursor f-fl" :class="activekey==1?'active-item':'not-active-item not-left-active-item'" @click="changeActivekey(1)">租客合同</div>
            <div class="item right-item cursor f-fl" :class="activekey==2?'active-item':'not-active-item not-right-active-item'" @click="changeActivekey(2)">预定管理</div>
        </div>
        <div v-if="activekey==1" class="content">
            <div class="bigTitle">添加租客合同默认字段配置</div>
            <div class="content-content">
                <div class="title">合同类型</div>
                <div class="basicsInfo">
                    <div class="table" style="margin-top: 13px;width: 617px;" >
                        <div class="table-title">
                            <div class="fixedStyle" style="max-width: 508px;padding-left: 12px">合同类型</div>
                            <div class="fixedStyle" style="max-width: 108px;padding-left: 14px">默认合同类型</div>
                        </div>
                        <div class="house-data u-no-border ">
                            <div class="fixedStyle clearfix" style="max-width: 508px;padding-left: 12px">
                                <div class="defaultFont cursor f-fl" v-if="result_01.contractMedium.contractMedium_01.checked==0" @click="result_01.contractMedium.contractMedium_01.checked=1" style="font-weight: 500;"><icon-font class="editStyle" type="iconyumengtubiao_duoxuan-weixuanze" style="margin-right: 8px;" />纸质合同</div>
                                <div class="defaultFont cursor
                                 f-fl" v-if="result_01.contractMedium.contractMedium_01.checked==1" @click="checkContractMedium(1)" style="font-weight: 500;"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_duoxuan-yixuanze" style="margin-right: 8px;" />纸质合同</div>
                                <div class="f-fl" style="color: #777777;font-size: 14px;margin-left: 20px;">给租客发送短信邀请线上确认租客合同：</div>
                                <div class="svg14Style f-fl" style="margin-right: 15px;" v-if="result_01.contractMedium.contractMedium_01.sendFlag==1"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" style="margin-right: 4px;" />发送</div>
                                <div class="svg14Style cursor f-fl" v-if="result_01.contractMedium.contractMedium_01.sendFlag==1" @click="result_01.contractMedium.contractMedium_01.sendFlag=0"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" style="margin-right: 4px;" />不发送</div>
                                <div class="svg14Style cursor f-fl" style="margin-right: 15px;" v-if="result_01.contractMedium.contractMedium_01.sendFlag==0" @click="result_01.contractMedium.contractMedium_01.sendFlag=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" style="margin-right: 4px;" />发送</div>
                                <div class="svg14Style  f-fl" v-if="result_01.contractMedium.contractMedium_01.sendFlag==0" ><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" style="margin-right: 4px;" />不发送</div>
                            </div>
                            <div class="fixedStyle clearfix" style="max-width: 108px;padding-left: 12px">
                              <div class="defaultFont f-fl" v-if="result_01.contractMedium.default==2&&result_01.contractMedium.contractMedium_01.checked==0"><icon-font style="color: #BBBBBB;margin-right: 2px;" type="iconyumengtubiao_danxuan-weixuanze" />默认</div>
                                <div class="defaultFont cursor f-fl" v-if="result_01.contractMedium.default==2&&result_01.contractMedium.contractMedium_01.checked==1" @click="result_01.contractMedium.default=1" ><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />默认</div>
                                <div class="defaultFont f-fl" v-if="result_01.contractMedium.default==1" ><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />默认</div>
                            </div>
                        </div>
                        <div class="house-data u-no-border " style="min-height: 84px;height: auto;">
                            <div style="max-width: 508px;padding-left: 12px;min-height: 84px;height: auto;">
                                <div class="defaultFont cursor" style="padding:13px 0 10px 0;line-height: 20px;font-weight: 500;" v-if="result_01.contractMedium.contractMedium_02.checked==0" @click="result_01.contractMedium.contractMedium_02.checked=1"><icon-font class="editStyle" type="iconyumengtubiao_duoxuan-weixuanze" style="margin-right: 8px;" />电子合同</div>
                                <div class="defaultFont cursor" style="padding:13px 0 10px 0;line-height: 20px;font-weight: 500;" v-if="result_01.contractMedium.contractMedium_02.checked==1" @click="checkContractMedium(2)"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_duoxuan-yixuanze" style="margin-right: 8px;" />电子合同</div>
                                <div class="f-fl" style="font-size: 14px;color: #111111;">
                                    默认模板：
                                </div>
                                <select-template class="f-fl" :selectIdList="result_01.contractMedium.contractMedium_02.templateIdList" :selectNameList="result_01.contractMedium.contractMedium_02.templateNameList" :selectCheckList="result_01.contractMedium.contractMedium_02.templateDefaultList" @changeTemplate="changeTemplate"></select-template>
                            </div>
                            <div class="clearfix" style="max-width: 108px;padding-left: 12px;min-height: 84px;height: auto;">
                              <div class="defaultFont f-fl" style="height: 84px;line-height: 84px;" v-if="result_01.contractMedium.default==1&&result_01.contractMedium.contractMedium_02.checked==0"><icon-font style="color: #BBBBBB;margin-right: 2px;" type="iconyumengtubiao_danxuan-weixuanze" />默认</div>
                              <div class="defaultFont cursor f-fl" style="height: 84px;line-height: 84px;" v-if="result_01.contractMedium.default==1&&result_01.contractMedium.contractMedium_02.checked==1" @click="result_01.contractMedium.default=2"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />默认</div>
                              <div class="defaultFont f-fl" style="height: 84px;line-height: 84px;" v-if="result_01.contractMedium.default==2" ><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />默认</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="title margin-top-28">房源信息</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">房源信息</span><span class="mustFill">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="title margin-top-28">承租信息</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">租客姓名</span><span class="mustFill">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                                <div class="man-style cursor" :class="result_01.gender.default==1?'selected':'noSelected'" @click="result_01.gender.default=1">先生</div>
                                <div class="woman-style cursor" :class="result_01.gender.default==2?'selected':'noSelected'" @click="result_01.gender.default=2">女士</div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">租客电话</span><span class="mustFill">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">身份类型</span><span class="mustFill" v-if="result_01.certificateType.required==1">*</span><span style="color:rgb(255, 175, 109);margin-left:2px;font-size: 12px;">只对纸质合同生效</span></div>
                            <label-item title="" class="u-no-border deptStyle">
                                <a-select style="width: 170px;height: 34px;" placeholder="设置默认值" :allowClear="true" v-model="result_01.certificateType.default">
                                    <a-select-option :value="1">身份证</a-select-option>
                                    <a-select-option :value="2">护照</a-select-option>
                                    <a-select-option :value="3">港澳通行证</a-select-option>
                                    <a-select-option :value="4">台湾同胞证</a-select-option>
                                    <a-select-option :value="5">企业营业执照</a-select-option>
                                    <a-select-option :value="6">其他</a-select-option>
                                </a-select>
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result_01.certificateType.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.certificateType.unEditable==0&&result_01.certificateType.required==0" @click="result_01.certificateType.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.certificateType.unEditable==0&&result_01.certificateType.required==1" @click="result_01.certificateType.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont secondLine margin-top-3" v-if="!result_01.certificateType.default" style="color: #999999"><icon-font style="color: #DDDDDD;margin-right: 2px;" type="icondanxuan-bukexuan" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_01.certificateType.default&&result_01.certificateType.unEditable==0" @click="result_01.certificateType.unEditable=1;result_01.certificateType.required=1;"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_01.certificateType.default&&result_01.certificateType.unEditable==1" @click="result_01.certificateType.unEditable=0;"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">证件号码</span><span class="mustFill" v-if="result_01.certificateType.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result_01.certificateType.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.certificateType.unEditable==0&&result_01.certificateType.required==0" @click="result_01.certificateType.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.certificateType.unEditable==0&&result_01.certificateType.required==1" @click="result_01.certificateType.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="title margin-top-28">证件照片</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">身份证正面照</span><span class="mustFill" v-if="result_01.idzhengPng.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result_01.idzhengPng.required==0" @click="result_01.idzhengPng.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.idzhengPng.required==1" @click="result_01.idzhengPng.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">身份证反面照</span><span class="mustFill" v-if="result_01.idfanPng.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result_01.idfanPng.required==0" @click="result_01.idfanPng.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.idfanPng.required==1" @click="result_01.idfanPng.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">手持身份证照</span><span class="mustFill" v-if="result_01.shouidPng.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result_01.shouidPng.required==0" @click="result_01.shouidPng.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.shouidPng.required==1" @click="result_01.shouidPng.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">其他证件照</span><span class="mustFill" v-if="result_01.otherPng.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result_01.otherPng.required==0" @click="result_01.otherPng.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.otherPng.required==1" @click="result_01.otherPng.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="title margin-top-28">同住人信息</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">同住人姓名</span><span class="mustFill" v-if="result_01.togetherName.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                                <div class="man-style cursor" :class="result_01.togetherGender.default==1?'selected':'noSelected'" @click="result_01.togetherGender.default=1">先生</div>
                                <div class="woman-style cursor" :class="result_01.togetherGender.default==2?'selected':'noSelected'" @click="result_01.togetherGender.default=2">女士</div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result_01.togetherName.required==0" @click="result_01.togetherName.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.togetherName.required==1" @click="result_01.togetherName.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">同住人电话</span><span class="mustFill" v-if="result_01.togetherPhone.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result_01.togetherPhone.required==0" @click="result_01.togetherPhone.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.togetherPhone.required==1" @click="result_01.togetherPhone.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">身份类型</span><span class="mustFill" v-if="result_01.togetherCertificateType.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle">
                                <a-select style="width: 170px;height: 34px;" placeholder="设置默认值" :allowClear="true" v-model="result_01.togetherCertificateType.default">
                                    <a-select-option :value="1">身份证</a-select-option>
                                    <a-select-option :value="2">护照</a-select-option>
                                    <a-select-option :value="3">港澳通行证</a-select-option>
                                    <a-select-option :value="4">台湾同胞证</a-select-option>
                                    <a-select-option :value="5">企业营业执照</a-select-option>
                                    <a-select-option :value="6">其他</a-select-option>
                                </a-select>
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result_01.togetherCertificateType.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.togetherCertificateType.unEditable==0&&result_01.togetherCertificateType.required==0" @click="result_01.togetherCertificateType.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.togetherCertificateType.unEditable==0&&result_01.togetherCertificateType.required==1" @click="result_01.togetherCertificateType.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont secondLine margin-top-3" v-if="!result_01.togetherCertificateType.default" style="color: #999999"><icon-font style="color: #DDDDDD;margin-right: 2px;" type="icondanxuan-bukexuan" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_01.togetherCertificateType.default&&result_01.togetherCertificateType.unEditable==0" @click="result_01.togetherCertificateType.unEditable=1;result_01.togetherCertificateType.required=1;"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_01.togetherCertificateType.default&&result_01.togetherCertificateType.unEditable==1" @click="result_01.togetherCertificateType.unEditable=0;"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">证件号码</span><span class="mustFill" v-if="result_01.togetherCertificateType.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result_01.togetherCertificateType.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.togetherCertificateType.unEditable==0&&result_01.togetherCertificateType.required==0" @click="result_01.togetherCertificateType.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.togetherCertificateType.unEditable==0&&result_01.togetherCertificateType.required==1" @click="result_01.togetherCertificateType.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="title margin-top-28">租客其他信息</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">客户来源</span><span class="mustFill" v-if="result_01.customerResource.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle">
                                <a-select style="width: 170px;height: 34px;" placeholder="设置默认值" v-model="result_01.customerResource.default" :allowClear="true" v-if="channelList&&channelList.length>0">
                                    <a-select-option v-for="(item) in channelList" :key="item.id">
                                        {{ item.name }}
                                    </a-select-option>
                                </a-select>
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result_01.customerResource.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.customerResource.unEditable==0&&result_01.customerResource.required==0" @click="result_01.customerResource.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.customerResource.unEditable==0&&result_01.customerResource.required==1" @click="result_01.customerResource.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont secondLine margin-top-3" v-if="!result_01.customerResource.default" style="color: #999999"><icon-font style="color: #DDDDDD;margin-right: 2px;" type="icondanxuan-bukexuan" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_01.customerResource.default&&result_01.customerResource.unEditable==0" @click="result_01.customerResource.unEditable=1;result_01.customerResource.required=1;"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_01.customerResource.default&&result_01.customerResource.unEditable==1" @click="result_01.customerResource.unEditable=0;"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">职业</span><span class="mustFill" v-if="result_01.profession.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result_01.profession.required==0" @click="result_01.profession.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.profession.required==1" @click="result_01.profession.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">爱好</span><span class="mustFill" v-if="result_01.interest.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result_01.interest.required==0" @click="result_01.interest.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.interest.required==1" @click="result_01.interest.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">工作单位</span><span class="mustFill" v-if="result_01.employer.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result_01.employer.required==0" @click="result_01.employer.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.employer.required==1" @click="result_01.employer.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">承租人收/付款账号类型</span><span class="mustFill" v-if="result_01.paymentType.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle">
                                <a-select style="width: 170px;height: 34px;" placeholder="设置默认值" :allowClear="true" v-model="result_01.paymentType.default">
                                    <a-select-option :value="1">银联</a-select-option>
                                    <a-select-option :value="2">支付宝</a-select-option>
                                    <a-select-option :value="3">微信</a-select-option>
                                </a-select>
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result_01.paymentType.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.paymentType.unEditable==0&&result_01.paymentType.required==0" @click="result_01.paymentType.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.paymentType.unEditable==0&&result_01.paymentType.required==1" @click="result_01.paymentType.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont secondLine margin-top-3" v-if="!result_01.paymentType.default" style="color: #999999"><icon-font style="color: #DDDDDD;margin-right: 2px;" type="icondanxuan-bukexuan" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_01.paymentType.default&&result_01.paymentType.unEditable==0" @click="result_01.paymentType.unEditable=1;result_01.paymentType.required=1;"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_01.paymentType.default&&result_01.paymentType.unEditable==1" @click="result_01.paymentType.unEditable=0;"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">承租人收/付款账号</span><span class="mustFill" v-if="result_01.paymentType.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result_01.paymentType.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.paymentType.unEditable==0&&result_01.paymentType.required==0" @click="result_01.paymentType.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.paymentType.unEditable==0&&result_01.paymentType.required==1" @click="result_01.paymentType.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">与紧急联系人关系</span><span class="mustFill" v-if="result_01.emergencyType.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle">
                                <a-select style="width: 170px;height: 34px;" placeholder="设置默认值" :allowClear="true" v-model="result_01.emergencyType.default">
                                    <a-select-option v-for="(item,index) in relationshipList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                </a-select>
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result_01.emergencyType.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.emergencyType.unEditable==0&&result_01.emergencyType.required==0" @click="result_01.emergencyType.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.emergencyType.unEditable==0&&result_01.emergencyType.required==1" @click="result_01.emergencyType.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont secondLine margin-top-3" v-if="!result_01.emergencyType.default" style="color: #999999"><icon-font style="color: #DDDDDD;margin-right: 2px;" type="icondanxuan-bukexuan" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_01.emergencyType.default&&result_01.emergencyType.unEditable==0" @click="result_01.emergencyType.unEditable=1;result_01.emergencyType.required=1;"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_01.emergencyType.default&&result_01.emergencyType.unEditable==1" @click="result_01.emergencyType.unEditable=0;"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">紧急联系人信息</span><span class="mustFill" v-if="result_01.emergencyType.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result_01.emergencyType.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.emergencyType.unEditable==0&&result_01.emergencyType.required==0" @click="result_01.emergencyType.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.emergencyType.unEditable==0&&result_01.emergencyType.required==1" @click="result_01.emergencyType.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="title margin-top-28">合同信息</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">合同编号</span><span class="mustFill" v-if="result_01.contractNo.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result_01.contractNo.required==0" @click="result_01.contractNo.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.contractNo.required==1" @click="result_01.contractNo.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg" style="width: 696px;">
                            <div class="left-top"><span  class="name">收租日设置</span><span class="mustFill" v-if="result_01.payPattern.required==1">*</span></div>
                            <div class="left-bottom clearfix">
                                <div class="f-fl payPattern payPattern_01 clearfix">
                                    <div class="mustFillFont cursor f-fl" style="font-size: 14px;" v-if="result_01.payPattern.payPattern_01.checked==0" @click="result_01.payPattern.payPattern_01.checked=1"><icon-font class="editStyle" type="iconyumengtubiao_duoxuan-weixuanze" />提前</div>
                                    <div class="mustFillFont cursor f-fl" style="font-size: 14px;" v-if="result_01.payPattern.payPattern_01.checked==1" @click="payPatternChecked(1)"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_duoxuan-yixuanze" />提前</div>
                                    <label-item title="" class="u-no-border f-fl deptStyle" style="width: 40px;height: 20px;margin: 0 10px;">
                                        <a-input v-model="result_01.payPattern.payPattern_01.default" v-validate="'moneyNoDot'" placeholder="请输入" />
                                    </label-item>
                                    <div class="mustFillFont f-fl" style="font-size: 14px;">天收租</div>
                                </div>
                                <div class="f-fl payPattern payPattern_02">
                                    <div class="mustFillFont cursor f-fl" style="font-size: 14px;margin-left: 15px;" v-if="result_01.payPattern.payPattern_02.checked==0" @click="result_01.payPattern.payPattern_02.checked=1"><icon-font class="editStyle" type="iconyumengtubiao_duoxuan-weixuanze" />固定</div>
                                    <div class="mustFillFont cursor f-fl" style="font-size: 14px;margin-left: 15px;" v-if="result_01.payPattern.payPattern_02.checked==1" @click="payPatternChecked(2)"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_duoxuan-yixuanze" />固定</div>
                                    <label-item title="" class="u-no-border f-fl deptStyle" style="width: 40px;height: 20px;margin: 0 10px;">
                                        <a-input v-model="result_01.payPattern.payPattern_02.default" v-validate="'moneyNoDot|max(31)'" placeholder="请输入" />
                                    </label-item>
                                    <div class="mustFillFont f-fl" style="font-size: 14px;">号收租</div>
                                    <div class="f-fl" style="font-size: 12px;color: #777777;line-height: 23px;">(每期第一个月)</div>
                                </div>
                                <div class="f-fl payPattern payPattern_03">
                                    <div class="mustFillFont cursor f-fl" style="font-size: 14px;margin-left: 15px;" v-if="result_01.payPattern.payPattern_03.checked==0" @click="result_01.payPattern.payPattern_03.checked=1"><icon-font class="editStyle" type="iconyumengtubiao_duoxuan-weixuanze" />固定</div>
                                    <div class="mustFillFont cursor f-fl" style="font-size: 14px;margin-left: 15px;" v-if="result_01.payPattern.payPattern_03.checked==1" @click="payPatternChecked(3)"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_duoxuan-yixuanze" />固定</div>
                                    <label-item title="" class="u-no-border f-fl deptStyle" style="width: 40px;height: 20px;margin: 0 10px;">
                                        <a-input v-model="result_01.payPattern.payPattern_03.default" v-validate="'moneyNoDot|max(31)'" placeholder="请输入" />
                                    </label-item>
                                    <div class="mustFillFont f-fl" style="font-size: 14px;">号收租</div>
                                    <div class="f-fl" style="font-size: 12px;color: #777777;line-height: 23px;">(每期提前一个月)</div>
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result_01.payPattern.required==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="title margin-top-28 clearfix">
                    <div class="f-fl">付款方式</div>
                    <div class="f-fl clearfix" style="margin-left: 20px;font-size: 14px;line-height: 24px;">
                        <div class="mustFillFont f-fl" v-if="result_01.depositPeriodType.depositPeriodTypeDiy==1"><icon-font style="color: #0A87F8;"  type="iconyumengtubiao_danxuan-yixuanze" />固定付款方式</div>
                        <div class="mustFillFont cursor f-fl" v-if="result_01.depositPeriodType.depositPeriodTypeDiy==0" @click="result_01.depositPeriodType.depositPeriodTypeDiy=1"><icon-font style="color: #777777;"  type="iconyumengtubiao_danxuan-weixuanze" />固定付款方式</div>
                        <div class="mustFillFont f-fl" style="margin-left: 30px;" v-if="result_01.depositPeriodType.depositPeriodTypeDiy==0"><icon-font style="color: #0A87F8;" type="iconyumengtubiao_danxuan-yixuanze" />不固定付款方式</div>
                        <div class="mustFillFont cursor f-fl" style="margin-left: 30px;" v-if="result_01.depositPeriodType.depositPeriodTypeDiy==1" @click="result_01.depositPeriodType.depositPeriodTypeDiy=0"><icon-font style="color: #777777;" type="iconyumengtubiao_danxuan-weixuanze" />不固定付款方式</div>
                    </div>
                </div>
                <div class="basicsInfo">
                    <div v-if="result_01.depositPeriodType.depositPeriodTypeList_01.length==0&&result_01.depositPeriodType.depositPeriodTypeDiy==1" class="add-subject-style margin-top-13 cursor" @click="addDepositPeriodType(true)">
                        <icon-font type="iconyumengtubiao_tianjia" />设置固定付款方式
                    </div>
                    <div class="table" style="margin-top: 13px;width: 535px;" v-if="result_01.depositPeriodType.depositPeriodTypeDiy==0">
                        <div class="table-title">
                            <div class="fixedStyle" style="max-width: 201px;padding-left: 12px">押金方式</div>
                            <div class="fixedStyle" style="max-width: 189px;padding-left: 12px">付款方式</div>
                            <div class="fixedStyle" style="max-width: 143px;padding-left: 14px">操作</div>
                        </div>
                        <div class="house-data u-no-border " v-for="(item,index) in result_01.depositPeriodType.depositPeriodTypeList_02" :key="index">
                            <div class="fixedStyle clearfix" style="max-width: 201px;padding-left: 12px">
                                <span class="f-fl" style="color: #111111;font-size: 14px;margin-right: 40px;">押</span>
                                <label-item title="" class="u-no-border deptStyle f-fl">
                                    <a-select style="width: 110px;height: 34px;margin-top: 9px;" :allowClear="true" placeholder="请选择" v-model="item.deposit">
                                        <a-select-option v-for="(item,index) in options12" :key="index" :value="item.value">{{item.value===90?'自定义':item.value}}</a-select-option>
                                    </a-select>
                                </label-item>
                            </div>
                            <div class="fixedStyle clearfix" style="max-width: 189px;padding-left: 14px">
                                <span class="f-fl" style="color: #111111;font-size: 14px;margin-right: 40px;">付</span>
                                <label-item title="" class="u-no-border deptStyle f-fl">
                                    <a-select style="width: 110px;height: 34px;margin-top: 9px;" :allowClear="true" placeholder="请选择" v-model="item.periodType">
                                        <a-select-option v-for="(item,index) in options13" :key="index" :value="item.value">{{item.value===99?'一次性付':item.value}}</a-select-option>
                                    </a-select>
                                </label-item>
                            </div>
                            <div class="fixedStyle clearfix" style="max-width: 143px;padding-left: 14px">
                                <div class="defaultFont cursor f-fl" v-if="item.default==0" @click="checkDepositPeriodTypeDefault(item,1,index,false)"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />默认</div>
                                <div class="defaultFont cursor f-fl" v-if="item.default==1" @click="checkDepositPeriodTypeDefault(item,0,index,false)"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />默认</div>
                            </div>
                        </div>
                    </div>
                    <div class="table" style="margin-top: 13px;width: 535px;" v-if="result_01.depositPeriodType.depositPeriodTypeList_01.length>0&&result_01.depositPeriodType.depositPeriodTypeDiy==1">
                        <div class="table-title">
                            <div class="fixedStyle" style="max-width: 201px;padding-left: 12px">押金方式</div>
                            <div class="fixedStyle" style="max-width: 189px;padding-left: 12px">付款方式</div>
                            <div class="fixedStyle" style="max-width: 143px;padding-left: 14px;">操作</div>
                        </div>
                        <div class="house-data u-no-border " v-for="(item,index) in result_01.depositPeriodType.depositPeriodTypeList_01" :key="index">
                            <div class="fixedStyle clearfix" style="max-width: 201px;padding-left: 12px">
                                <span class="f-fl" style="color: #111111;font-size: 14px;margin-right: 40px;">押</span>
                                <label-item title="" class="u-no-border deptStyle f-fl">
                                    <a-select style="width: 110px;height: 34px;margin-top: 9px;" :allowClear="true" placeholder="请选择" v-model="item.deposit">
                                        <a-select-option v-for="(item,index) in options12" :key="index" :value="item.value">{{item.value===90?'自定义':item.value}}</a-select-option>
                                    </a-select>
                                </label-item>
                            </div>
                            <div class="fixedStyle clearfix" style="max-width: 189px;padding-left: 14px">
                                <span class="f-fl" style="color: #111111;font-size: 14px;margin-right: 40px;">付</span>
                                <label-item title="" class="u-no-border deptStyle f-fl">
                                    <a-select style="width: 110px;height: 34px;margin-top: 9px;" :allowClear="true" placeholder="请选择" v-model="item.periodType">
                                        <a-select-option v-for="(item,index) in options13" :key="index" :value="item.value">{{item.value===99?'一次性付':item.value}}</a-select-option>
                                    </a-select>
                                </label-item>
                            </div>
                            <div class="fixedStyle clearfix" style="max-width: 143px;padding-left: 14px">
                                <div class="defaultFont cursor f-fl" v-if="item.default==0" @click="checkDepositPeriodTypeDefault(item,1,index,true)"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />默认</div>
                                <div class="defaultFont cursor f-fl" v-if="item.default==1" @click="checkDepositPeriodTypeDefault(item,0,index,true)"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />默认</div>
                                <div class="defaultFont cursor f-fl" style="margin-left: 30px;"><icon-font @click="deleteDepositPeriodType(index)" class="delete-icon" type="iconyumengtubiao_shanchu-"></icon-font></div>
                            </div>
                        </div>
                        <div class="house-data u-no-border cursor" @click="addDepositPeriodType(false)">
                            <div class="fixedStyle continueAddStyle">
                                <icon-font type="iconyumengtubiao_tianjia" />继续添加
                            </div>
                        </div>
                    </div>
                </div>
                <div class="title margin-top-28">加收费用</div>
                <div class="basicsInfo">
                    <div v-if="result_01.otherExpenses.length==0" class="add-subject-style margin-top-13 cursor" style="width: 174px;" @click="AddSubjectObj(true)">
                        <icon-font type="iconyumengtubiao_tianjia" />设置默认加收费用项
                    </div>
                    <div class="table" style="margin-top: 13px;width: 1070px;" v-if="result_01.otherExpenses.length>0">
                        <div class="table-title">
                            <div class="fixedStyle" style="max-width: 201px;padding-left: 12px">费用类型</div>
                            <div class="fixedStyle" style="max-width: 219px;padding-left: 14px">付款方式</div>
                            <div class="fixedStyle" style="max-width: 411px;padding-left: 14px">金额</div>
                            <div class="fixedStyle" style="max-width: 236px;text-align: center;">操作</div>
                        </div>
                        <div class="house-data u-no-border " v-for="(item,index) in result_01.otherExpenses" :key="index">
                            <div class="fixedStyle myCascader" style="max-width: 201px;padding-left: 12px">
                                <a-cascader placeholder="请选择" :popupVisible="item.popupVisible" @focus="changeOtherPopup(item)" :id="'contractSubeject_'+index" @blur="cancleOtherPopup(item)" v-model="item.id" :options="costTabsContent" :allowClear="false" :fieldNames="elcostcascaderValue" @change="(value) => costSelect(value, index,item)"></a-cascader>
                            </div>
                            <div class="fixedStyle" style="max-width: 219px;padding-left: 14px">
                                <label-item title="" class="u-no-border deptStyle">
                                    <a-select style="width: 180px;height: 34px;margin-top: 9px;" :allowClear="true" placeholder="请选择" v-model="item.periodMonth">
                                        <a-select-option v-for="(item,index) in options14" :key="index" :value="item.value">{{item.value===99?'一次性付':item.value===100?'随房租付':item.value===1?'月付':item.value===2?'2月付':item.value===3?'季付':item.value===6?'半年付':item.value===12?'年付':'自定义'}}</a-select-option>
                                    </a-select>
                                </label-item>
                            </div>
                            <div class="fixedStyle clearfix" style="max-width: 411px;padding-left: 14px">
                                <label-item title="" class="u-no-border deptStyle f-fl">
                                    <a-select style="width: 130px;height: 34px;margin-top: 9px;" :allowClear="false" placeholder="请选择" v-model="item.type">
                                        <a-select-option :value="1">按固定金额</a-select-option>
                                        <a-select-option :value="2">按租金百分比</a-select-option>
                                    </a-select>
                                </label-item>
                                <div class="fixedStyle house-data-item-left f-fl" style="width: 171px;padding-left: 21px;" v-show="item.type==1">
                                    <span class="addonBeforeStyle">¥</span>
                                    <a-input style="width: 80px" v-model="item.price" v-validate="'money'" placeholder="请输入" />
                                    <span class="addonAfterStyle">元</span>
                                </div>
                                <div class="fixedStyle house-data-item-left f-fl" style="width: 171px;padding-left: 21px;" v-show="item.type==2">
                                    <a-input style="width: 80px" v-model="item.percent" v-validate="'naturalNum|min(1)|max(100)'" placeholder="请输入" />
                                    <span class="addonAfterStyle">%</span>
                                </div>
                            </div>
                            <div class="fixedStyle" style="max-width: 236px;text-align: center;">
                                <icon-font class="delete-icon cursor" type="iconyumengtubiao_shanchu-" @click="deleteSubject(index)"></icon-font>
                            </div>
                        </div>
                        <div class="house-data u-no-border cursor" @click="AddSubjectObj(false)">
                            <div class="fixedStyle continueAddStyle">
                                <icon-font type="iconyumengtubiao_tianjia" />继续添加
                            </div>
                        </div>
                    </div>
                </div>
                <div class="title margin-top-28">租金和押金账单<span style="font-size: 12px;color: #FFA036;"> (选择不生成租金和押金账单，则在保存合同时，系统将不生成相应的租金和押金账单，只生成相应的加收费用账单)</span></div>
                <div class="basicsInfo">
                  <div class="item margin-top-13">
                    <div class="left">
                      <div class="left-top"><span  class="name">是否生成租金和押金账单</span><span class="mustFill" v-if="result_01.isProduceRentDeposit.required==1">*</span></div>
                      <label-item title="" class="u-no-border deptStyle">
                        <a-select style="width: 170px;height: 34px;" placeholder="设置默认值" v-model="result_01.isProduceRentDeposit.default">
                          <a-select-option :value='1'>生成</a-select-option>
                          <a-select-option :value='0'>不生成</a-select-option>
                        </a-select>
                      </label-item>
                    </div>
                    <div class="right">
                      <div class="mustFillFont cursor" v-if="result_01.isProduceRentDeposit.unEditable==0" @click="result_01.isProduceRentDeposit.unEditable=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                      <div class="mustFillFont cursor" v-if="result_01.isProduceRentDeposit.unEditable==1" @click="result_01.isProduceRentDeposit.unEditable=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                    </div>
                  </div>
                </div>
                <div class="title margin-top-28">合同附件</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">合同附件</span><span class="mustFill" v-if="result_01.fileIds.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result_01.fileIds.required==0" @click="result_01.fileIds.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_01.fileIds.required==1" @click="result_01.fileIds.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="title margin-top-28">物业交割单</div>
                <div class="delivery">
                  <div class="delivery-style delivery-style-radius1 margin-top-13" v-if="result_01.deliveryConfig.required==1">
                    <div class="delivery-item-style clearfix" style="border-right: 1px solid #F4F4F4;">
                      <div class="f-fl">
                        <div><icon-font style="color: #0A87F8;"  type="iconyumengtubiao_danxuan-yixuanze" /></div>
                      </div>
                      <div class="f-fl" style="padding-left: 8px;">
                        <div style="color: #111111;font-size: 14px;">必须现场填写</div>
                        <div style="color: #777777;font-size: 13px;">即:在签订合同时必须填写交割单信息</div>
                      </div>
                    </div>
                    <div class="delivery-item-style clearfix cursor" @click="result_01.deliveryConfig.required=0;result_01.deliveryConfig.scenePic=0;">
                      <div class="f-fl">
                        <div><icon-font style="color: #777777;"  type="iconyumengtubiao_danxuan-weixuanze" /></div>
                      </div>
                      <div class="f-fl" style="padding-left: 8px;">
                        <div style="color: #111111;font-size: 14px;">可后续补充交割信息</div>
                        <div style="color: #777777;font-size: 13px;">即:先签订合同，后续再补充交割单信息</div>
                      </div>
                    </div>
                  </div>
                  <div class="delivery-pic-style" v-if="result_01.deliveryConfig.required==1">
                    <div class="cursor" v-if="result_01.deliveryConfig.scenePic==0" @click="result_01.deliveryConfig.scenePic=1">
                      <icon-font style="color: #777777;"  type="iconyumengtubiao_danxuan-weixuanze" />
                      <span style="color: #111111;font-size: 12px;margin-left: 10px;">交割图片必须现场拍摄</span>
                      <span style="color: #777777;font-size: 12px;margin-left: 6px;">(开启后，在电脑端填写交割单信息将不可上传附件)</span>
                    </div>
                    <div class="cursor" v-if="result_01.deliveryConfig.scenePic==1" @click="result_01.deliveryConfig.scenePic=0">
                      <icon-font style="color: #0A87F8;"  type="iconyumengtubiao_danxuan-yixuanze" />
                      <span style="color: #111111;font-size: 12px;margin-left: 10px;">交割图片必须现场拍摄</span>
                      <span style="color: #777777;font-size: 12px;margin-left: 6px;">(开启后，在电脑端填写交割单信息将不可上传附件)</span>
                    </div>
                  </div>
                  <div class="delivery-style delivery-style-radius2 margin-top-13 cursor" v-if="result_01.deliveryConfig.required==0" @click="result_01.deliveryConfig.required=1">
                    <div class="delivery-item-style clearfix" style="border-right: 1px solid #F4F4F4;">
                      <div class="f-fl">
                        <div><icon-font style="color: #777777;"  type="iconyumengtubiao_danxuan-weixuanze" /></div>
                      </div>
                      <div class="f-fl" style="padding-left: 8px;">
                        <div style="color: #111111;font-size: 14px;">必须现场填写</div>
                        <div style="color: #777777;font-size: 13px;">即:在签订合同时必须填写交割单信息</div>
                      </div>
                    </div>
                    <div class="delivery-item-style clearfix">
                      <div class="f-fl">
                        <div><icon-font style="color: #0A87F8;"  type="iconyumengtubiao_danxuan-yixuanze" /></div>
                      </div>
                      <div class="f-fl" style="padding-left: 8px;">
                        <div style="color: #111111;font-size: 14px;">可后续补充交割信息</div>
                        <div style="color: #777777;font-size: 13px;">即:先签订合同，后续再补充交割单信息</div>
                      </div>
                    </div>
                  </div>
                  <div class="goodList-style">
                    <div class="goodList-head-style clearfix" :class="result_01.deliveryConfig.goodDefault==0?'goodList-head-style-radius1':'goodList-head-style-radius2'">
                      <div class="f-fl" style="margin-left: 10px;">默认交割物品</div>
                      <div class="f-fl" style="height: 24px;border-right: 1px solid #E3E3E3;margin: 8px 20px;"></div>
                      <div class="f-fl">
                        <div class="cursor" @click="result_01.deliveryConfig.goodDefault=0" v-if="result_01.deliveryConfig.goodDefault==1">
                          <icon-font style="color: #777777;"  type="iconyumengtubiao_danxuan-weixuanze" />
                          <span style="margin-left: 5px;">读取房屋配置</span>
                          <span style="color: #777777;font-size: 12px;">（在完善交割信息时，默认读取房屋配置）</span>
                        </div>
                        <div v-if="result_01.deliveryConfig.goodDefault==0">
                          <icon-font style="color: #0A87F8;"  type="iconyumengtubiao_danxuan-yixuanze" />
                          <span style="margin-left: 5px;">默认交割物品</span>
                          <span style="color: #777777;font-size: 12px;">（在完善交割信息时，默认读取房屋配置）</span>
                        </div>
                      </div>
                      <div class="f-fl" style="margin-left: 20px;">
                        <div class="cursor" @click="result_01.deliveryConfig.goodDefault=1" v-if="result_01.deliveryConfig.goodDefault==0">
                          <icon-font style="color: #777777;"  type="iconyumengtubiao_danxuan-weixuanze" />
                          <span style="margin-left: 5px;">自定义配置</span>
                          <span style="color: #777777;font-size: 12px;">（在完善交割信息时，默认展示选中的物品）</span>
                        </div>
                        <div v-if="result_01.deliveryConfig.goodDefault==1">
                          <icon-font style="color: #0A87F8;"  type="iconyumengtubiao_danxuan-yixuanze" />
                          <span style="margin-left: 5px;">自定义配置</span>
                          <span style="color: #777777;font-size: 12px;">（在完善交割信息时，默认展示选中的物品）</span>
                        </div>
                      </div>
                    </div>
                    <div class="goodList-detail-style" v-if="result_01.deliveryConfig.goodDefault==1">
                      <div class="goodList-detail-head" style="margin-bottom: 10px;">
                        <div class="leftLine"></div>合租
                      </div>
                      <div class="goodList-detail-item clearfix">
                        <div class="goodList-detail-item-left f-fl">
                          <div style="height: 42px;align-self: center;width: 100%">
                            <div style="text-align: center;">房间</div>
                            <div style="text-align: center;">
                              <a-checkbox v-model="result_01.deliveryConfig.roomList[0].selectAll" @change="value => setAll(value,0)"
                                          :indeterminate="result_01.deliveryConfig.roomList[0].indeterminate">全选</a-checkbox></div>
                          </div>
                        </div>
                        <div class="goodList-detail-item-right f-fl clearfix">
                          <div class="item-name clearfix f-fl" v-for="(item,index) in result_01.deliveryConfig.roomList[0].names" @mouseover="deliveryConfig0_index=index" @mouseleave="deliveryConfig0_index=undefined">
                            <div class="f-fl item-name-font overHidde" style="width:auto;max-width: 125px;"><a-checkbox v-model="item.selected" @change="getIndeterminate(0)">{{item.name}}</a-checkbox></div>
                            <div class="f-fl" v-if="deliveryConfig0_index==index">
                              <icon-font @click="editGood(index,0)" type="iconyumengtubiao_bianji-1" class="bgEdit cursor"/>
                              <icon-font @click="deleteItem(index,0)" type="iconyumengtubiao_shanchu-" class="bgDelete cursor"/>
                            </div>
                          </div>
                          <div class="item-name f-fl">
                            <div class="addItem cursor" @click="addGood(0)">
                              <icon-font type="iconyumengtubiao_tianjia"></icon-font>
                              添加
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="goodList-detail-item" style="margin-top: 15px;">
                        <div class="goodList-detail-item-left f-fl">
                          <div style="height: 42px;align-self: center;width: 100%">
                            <div style="text-align: center;">公区</div>
                            <div style="text-align: center;">
                              <a-checkbox v-model="result_01.deliveryConfig.roomList[1].selectAll" @change="value => setAll(value,1)"
                                          :indeterminate="result_01.deliveryConfig.roomList[1].indeterminate">全选</a-checkbox></div>
                          </div>
                        </div>
                        <div class="goodList-detail-item-right f-fl clearfix">
                          <div class="item-name clearfix f-fl" v-for="(item,index) in result_01.deliveryConfig.roomList[1].names" @mouseover="deliveryConfig1_index=index" @mouseleave="deliveryConfig1_index=undefined">
                            <div class="f-fl item-name-font overHidde" style="width:auto;max-width: 125px;"><a-checkbox v-model="item.selected" @change="getIndeterminate(1)">{{item.name}}</a-checkbox></div>
                            <div class="f-fl" v-if="deliveryConfig1_index==index">
                              <icon-font @click="editGood(index,1)" type="iconyumengtubiao_bianji-1" class="bgEdit cursor"/>
                              <icon-font @click="deleteItem(index,1)" type="iconyumengtubiao_shanchu-" class="bgDelete cursor"/>
                            </div>
                          </div>
                          <div class="item-name f-fl">
                            <div class="addItem cursor" @click="addGood(1)">
                              <icon-font type="iconyumengtubiao_tianjia"></icon-font>
                              添加
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="goodList-detail-head" style="margin: 20px 0 10px 0">
                        <div class="leftLine"></div>整租/独栋
                      </div>
                      <div class="goodList-detail-item">
                        <div class="goodList-detail-item-left f-fl">
                          <div style="height: 42px;align-self: center;width: 100%">
                            <div style="text-align: center;">整租/独栋</div>
                            <div style="text-align: center;">
                              <a-checkbox v-model="result_01.deliveryConfig.roomList[2].selectAll" @change="value => setAll(value,2)"
                                          :indeterminate="result_01.deliveryConfig.roomList[2].indeterminate">全选</a-checkbox></div>
                          </div>
                        </div>
                        <div class="goodList-detail-item-right f-fl clearfix">
                          <div class="item-name clearfix f-fl" v-for="(item,index) in result_01.deliveryConfig.roomList[2].names" @mouseover="deliveryConfig2_index=index" @mouseleave="deliveryConfig2_index=undefined">
                            <div class="f-fl item-name-font overHidde" style="width:auto;max-width: 125px;"><a-checkbox v-model="item.selected" @change="getIndeterminate(2)">{{item.name}}</a-checkbox></div>
                            <div class="f-fl" v-if="deliveryConfig2_index==index">
                              <icon-font @click="editGood(index,2)" type="iconyumengtubiao_bianji-1" class="bgEdit cursor"/>
                              <icon-font @click="deleteItem(index,2)" type="iconyumengtubiao_shanchu-" class="bgDelete cursor"/>
                            </div>
                          </div>
                          <div class="item-name f-fl">
                            <div class="addItem cursor" @click="addGood(2)">
                              <icon-font type="iconyumengtubiao_tianjia"></icon-font>
                              添加
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="btnStyle">
                    <div class="warning"><a-icon type="exclamation-circle" style="margin-right: 5px;"/>保存成功后，该门店下的所有房源签约时，按照配置好的信息来录入</div>
                    <a-button class="cancel cursor" @click="defaultConfig()">恢复默认配置</a-button>
                    <a-button class="sure cursor" @click="saveConfig" :loading="saveLoading">确定</a-button>
                </div>
            </div>
        </div>
        <div v-if="activekey==2" class="content">
            <div class="bigTitle">发起预定默认字段配置</div>
            <div class="content-content">
                <div class="title">房源信息</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">房源信息</span><span class="mustFill">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="title margin-top-28">定金</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">定金</span><span class="mustFill" v-if="result_02.money.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle" style="padding-left: 4px;">
                                <a-input v-model="result_02.money.default" v-validate="'moneyNoDot|max(9999999)'" placeholder="设置" />
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result_02.money.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_02.money.unEditable==0&&result_02.money.required==0" @click="result_02.money.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_02.money.unEditable==0&&result_02.money.required==1" @click="result_02.money.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont secondLine margin-top-3" v-if="!result_02.money.default" style="color: #999999"><icon-font style="color: #DDDDDD;margin-right: 2px;" type="icondanxuan-bukexuan" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_02.money.default&&result_02.money.unEditable==0" @click="result_02.money.unEditable=1;result_02.money.required=1;"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_02.money.default&&result_02.money.unEditable==1" @click="result_02.money.unEditable=0;"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                        </div>
                    </div>
                  <div class="item margin-top-13">
                    <div class="left blankBg bottomBlankBg">
                      <div class="left-top"><span  class="name">定金收款</span></div>
                      <label-item title="" class="u-no-border deptStyle" style="padding-left: 4px;height: 32px;line-height: 32px;color: rgba(0, 0, 0, 0.65);">
                        <div class="f-fl" style="margin-right: 15px;" v-if="result_02.bookType.default==2&&result_02.bookType.unEditable==1"><icon-font style="margin-right: 2px;color: #BBBBBB;" type="iconyumengtubiao_danxuan-yixuanze" />未收款</div>
                        <div class="f-fl" v-if="result_02.bookType.default==2&&result_02.bookType.unEditable==1"><icon-font style="margin-right: 2px;color: #BBBBBB;" type="iconyumengtubiao_danxuan-weixuanze" />已收款</div>
                        <div class="f-fl" style="margin-right: 15px;" v-if="result_02.bookType.default==1&&result_02.bookType.unEditable==1"><icon-font style="margin-right: 2px;color: #BBBBBB;" type="iconyumengtubiao_danxuan-weixuanze" />未收款</div>
                        <div class="f-fl" v-if="result_02.bookType.default==1&&result_02.bookType.unEditable==1"><icon-font style="margin-right: 2px;color: #BBBBBB;" type="iconyumengtubiao_danxuan-yixuanze" />已收款</div>
                        <div class="f-fl cursor" @click="result_02.bookType.default=2" style="margin-right: 15px;" v-if="result_02.bookType.default==1&&result_02.bookType.unEditable==0"><icon-font style="margin-right: 2px;color: #BBBBBB;" type="iconyumengtubiao_danxuan-weixuanze" />未收款</div>
                        <div class="f-fl" v-if="result_02.bookType.default==1&&result_02.bookType.unEditable==0"><icon-font style="margin-right: 2px;color: #0A87F8;" type="iconyumengtubiao_danxuan-yixuanze" />已收款</div>
                        <div class="f-fl" style="margin-right: 15px;" v-if="result_02.bookType.default==2&&result_02.bookType.unEditable==0"><icon-font style="margin-right: 2px;color: #0A87F8;" type="iconyumengtubiao_danxuan-yixuanze" />未收款</div>
                        <div class="f-fl cursor" @click="result_02.bookType.default=1" v-if="result_02.bookType.default==2&&result_02.bookType.unEditable==0"><icon-font style="margin-right: 2px;color: #BBBBBB;" type="iconyumengtubiao_danxuan-weixuanze" />已收款</div>
                      </label-item>
                    </div>
                    <div class="right">
                      <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_02.bookType.unEditable==0" @click="result_02.bookType.unEditable=1;"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                      <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_02.bookType.unEditable==1" @click="result_02.bookType.unEditable=0;"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                    </div>
                  </div>
                </div>
                <div class="title margin-top-28">预定信息</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">姓名</span><span class="mustFill">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                                <div class="man-style cursor" :class="result_02.gender.default==1?'selected':'noSelected'" @click="result_02.gender.default=1">先生</div>
                                <div class="woman-style cursor" :class="result_02.gender.default==2?'selected':'noSelected'" @click="result_02.gender.default=2">女士</div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">电话</span><span class="mustFill">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">身份类型</span><span class="mustFill" v-if="result_02.certificateType.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle">
                                <a-select style="width: 170px;height: 34px;" placeholder="设置默认值" :allowClear="true" v-model="result_02.certificateType.default">
                                    <a-select-option :value="1">身份证</a-select-option>
                                    <a-select-option :value="2">护照</a-select-option>
                                    <a-select-option :value="3">港澳通行证</a-select-option>
                                    <a-select-option :value="4">台湾同胞证</a-select-option>
                                    <a-select-option :value="5">企业营业执照</a-select-option>
                                    <a-select-option :value="6">其他</a-select-option>
                                </a-select>
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result_02.certificateType.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_02.certificateType.unEditable==0&&result_02.certificateType.required==0" @click="result_02.certificateType.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_02.certificateType.unEditable==0&&result_02.certificateType.required==1" @click="result_02.certificateType.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont secondLine margin-top-3" v-if="!result_02.certificateType.default" style="color: #999999"><icon-font style="color: #DDDDDD;margin-right: 2px;" type="icondanxuan-bukexuan" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_02.certificateType.default&&result_02.certificateType.unEditable==0" @click="result_02.certificateType.unEditable=1;result_02.certificateType.required=1;"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_02.certificateType.default&&result_02.certificateType.unEditable==1" @click="result_02.certificateType.unEditable=0;"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">证件号码</span><span class="mustFill" v-if="result_02.certificateType.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result_02.certificateType.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_02.certificateType.unEditable==0&&result_02.certificateType.required==0" @click="result_02.certificateType.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_02.certificateType.unEditable==0&&result_02.certificateType.required==1" @click="result_02.certificateType.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">最晚签约日</span><span class="mustFill" v-if="result_02.signDate.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result_02.signDate.required==0" @click="result_02.signDate.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_02.signDate.required==1" @click="result_02.signDate.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">预计租住时长</span><span class="mustFill" v-if="result_02.rentMonth.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle" style="padding-left: 4px;">
                                <a-input style="width: 130px;" v-model="result_02.rentMonth.default" v-validate="'moneyNoDot'" placeholder="设置" /><span style="color: #777777;font-size: 14px;">个月</span>
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result_02.rentMonth.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_02.rentMonth.unEditable==0&&result_02.rentMonth.required==0" @click="result_02.rentMonth.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_02.rentMonth.unEditable==0&&result_02.rentMonth.required==1" @click="result_02.rentMonth.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont secondLine margin-top-3" v-if="!result_02.rentMonth.default" style="color: #999999"><icon-font style="color: #DDDDDD;margin-right: 2px;" type="icondanxuan-bukexuan" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_02.rentMonth.default&&result_02.rentMonth.unEditable==0" @click="result_02.rentMonth.unEditable=1;result_02.rentMonth.required=1;"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result_02.rentMonth.default&&result_02.rentMonth.unEditable==1" @click="result_02.rentMonth.unEditable=0;"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">预定备注</span><span class="mustFill" v-if="result_02.comment.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result_02.comment.required==0" @click="result_02.comment.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_02.comment.required==1" @click="result_02.comment.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">预定凭证</span><span class="mustFill" v-if="result_02.picIdList.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result_02.picIdList.required==0" @click="result_02.picIdList.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result_02.picIdList.required==1" @click="result_02.picIdList.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="btnStyle">
                    <div class="warning"><a-icon type="exclamation-circle" style="margin-right: 5px;" />保存成功后，该门店下的所有房源预定时，按照配置好的信息来录入</div>
                    <a-button class="cancel cursor" @click="defaultConfig()">恢复默认配置</a-button>
                    <a-button class="sure cursor" @click="saveConfig" :loading="saveLoading">确定</a-button>
                </div>
            </div>
        </div>
      <!-- 添加物品 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="addGoodDialog" class="ownModalBorder titDialog" :title="addGoodTitle" @cancel="addGoodDialog=false;">
        <add-good :houseType="houseType" :roomList="result_01.deliveryConfig.roomList" :index="deliveryConfig_index" @cancelAdd="addGoodDialog=false;" @successAdd="successAdd"></add-good>
      </a-modal>
      <a-modal destroyOnClose centered :footer="null" width="520px" :maskClosable="false" v-model="confirmSaveDialog" class="ownModalBorder titDialog" title="提示" @cancel="confirmSaveDialog=false">
        <confirm-save :storeDeptName="storeDeptName" :storeDeptId="storeDeptId" :fromType="fromType" :data="data" @cancelSave="confirmSaveDialog=false" @successSave="successSave"></confirm-save>
      </a-modal>
    </div>
</template>

<script>
    import  * as API from '@/api/decision';
    import {
      listEnableDict, listFeeSubjectWithoutRentalFee,
    } from '@/api/contract.js';
    import SelectTemplate from './selectTemplate';
    import AddGood from './addGood';
    import ConfirmSave from './confirmSave';
    export default {
        name: "resourceDefault",
        components: {
            SelectTemplate,
            AddGood,
            ConfirmSave,
        },
        props: {
            storeDeptId: {
                type: String,
            },
            storeDeptName: {
              type: String,
            },
        },
        data() {
            return {
                activekey:1,        //1、租客合同；2、预定管理
                result_01:{         //租客合同信息配置
                    contractMedium: {
                        default:1,               //默认纸质 1、纸质；2、电子
                        contractMedium_01: {     //纸质合同
                            checked:1,          //是否选择（可用）1、可用；0禁用
                            sendFlag:0,         //1、发送；0、不发送
                        },
                        contractMedium_02: {     //电子合同
                            checked:1,          //是否选择（可用）1、可用；0禁用
                            templateIdList:[],
                            templateNameList:[],
                            templateDefaultList:[],
                            templateList:[],
                        },
                    },
                    gender:{
                        default:1,      //1、男；2、女
                    },
                    certificateNo:{
                        required:1,
                    },
                    certificateType:{
                        required:1,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:1,     //初始值
                    },
                    idzhengPng:{
                        required:1,
                    },
                    idfanPng:{
                        required:1,
                    },
                    shouidPng:{
                        required:0,
                    },
                    otherPng:{
                        required:0,
                    },
                    togetherName:{
                        required:0,
                    },
                    togetherGender:{
                        default:1,      //1、男；2、女
                    },
                    togetherPhone:{
                        required:0,
                    },
                    togetherCertificateType:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:1,     //初始值
                    },
                    customerResource:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:undefined,     //初始值
                    },
                    profession:{
                        required:0,
                    },
                    interest:{
                        required:0,
                    },
                    employer:{
                        required:0,
                    },
                    paymentType:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:1,     //初始值
                    },
                    emergencyType:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:'1',     //初始值
                    },
                    contractNo:{
                        required:0,
                    },
                    isProduceRentDeposit:{
                      required:0,     //是否必填
                      unEditable:0,  //是否不可修改
                      default:1,     //初始值
                    },
                    payPattern:{
                        payPattern_01:{
                            checked:1,
                            default:15,
                        },
                        payPattern_02:{
                            checked:1,
                            default:undefined,
                        },
                        payPattern_03:{
                            checked:1,
                            default:undefined,
                        },
                        required:1,
                    },
                    depositPeriodType:{
                        depositPeriodTypeList_01:[
                            {
                                deposit:undefined,
                                periodType:undefined,
                                default:0,              //不是默认
                            }
                        ],       //固定付款方式集合
                        depositPeriodTypeList_02:[
                            {
                                deposit:1,
                                periodType:3,
                                default:1,              //不是默认
                            }
                        ],       //不固定
                        depositPeriodTypeDiy:0,         //1、固定；0不固定
                    },
                    otherExpenses:[],
                    fileIds:{           //合同附件
                        required:0,
                    },
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
                result_02:{         //发起预定信息配置
                    money:{
                        required:1,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:'',     //初始值
                    },
                  bookType:{
                    required:1,     //是否必填
                    unEditable:0,  //是否不可修改
                    default:1,     //初始值 1、已收款；2、未收款
                  },
                    gender:{
                        default:1,      //1、男；2、女
                    },
                    certificateType:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:1,     //初始值
                    },
                    signDate:{
                        required:1,
                    },
                    rentMonth:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:undefined,     //初始值
                    },
                    comment:{
                        required:0,
                    },
                    picIdList:{
                        required:0,
                    },
                },
                id_01:'',
                id_02:'',
                saveLoading:false,
                channelList:[],
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
                options13: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }, { value: 99 }],
                options12: [{ value: 90 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }],
                options14: [{ value:99 }, { value: 100 },{ value: 1 },{ value: 2 }, { value: 3 }, { value: 6 }, { value: 12 }],
                depositPeriodTypeObj:{
                    deposit:undefined,
                    periodType:undefined,
                    default:0,              //不是默认
                },
                otherExpenseObj: {
                    feeSubjectId: undefined,
                    periodMonth:undefined,
                    price:undefined,
                    percent:undefined,
                    type:1,         //  1、固定金额；2、按比例
                    popupVisible:false,
                },
                elcostcascaderValue: {
                    value: 'id',
                    label: 'name',
                    children: 'metaList'
                },
                originCostTabsContent:[],
                costTabsContent: [], // 费用类型(维修)
                checkedFeeSubjectIds:[], //已选择的费用科目(维修)
              deliveryConfig0_index:undefined,  //合租-房间
              deliveryConfig1_index:undefined,  //合租-公区
              deliveryConfig2_index:undefined,  //整租/独栋
              addGoodDialog:false,
              addGoodTitle:'房间-添加物品',
              deliveryConfig_index:undefined,
              houseType:'',
              data:{},
              confirmSaveDialog:false,
              operateType:1,    //1、基本信息操作；2、设置出房部门操作
              fromType:2,
            }
        },
        created: function () {
            this.getDict();
            this.initData();
        },
        methods: {
          successSave(){
            this.confirmSaveDialog = false;
            this.initData();
          },
          editGood(index,val){
            if(val==0||val==1){
              this.addGoodTitle = '房间-编辑物品';
            }
            if(val==2){
              this.addGoodTitle = '整租/独栋-编辑物品';
            }
            this.addGoodDialog = true;
            this.houseType = val;
            this.deliveryConfig_index = index;
          },
          addGood(val){
            if(val==0||val==1){
              this.addGoodTitle = '房间-添加物品';
            }
            if(val==2){
              this.addGoodTitle = '整租/独栋-添加物品';
            }
            this.addGoodDialog = true;
            this.houseType = val;
            this.deliveryConfig_index = undefined;
          },
          successAdd(houseType,index,goodName){
            this.addGoodDialog = false;
            if(index){
              let obj ={
                name:goodName,
                selected:true,
              };
              this.result_01.deliveryConfig.roomList[houseType].names[index] = obj;
            }
            else{
              let obj ={
                name:goodName,
                selected:true,
              };
              this.result_01.deliveryConfig.roomList[houseType].names.push(obj);
            }
          },
          deleteItem(index,val){
            let _this = this;
            this.$modal.confirm({
              title: '确定要删除 「' + _this.result_01.deliveryConfig.roomList[val].names[index].name + '」 名称吗？',
              content: '删除点击保存后才生效',
              okText: '确定',
              cancelText: '取消',
              onOk() {
                _this.result_01.deliveryConfig.roomList[val].names.splice(index,1);
              },
              onCancel() {
                // console.log('Cancel');
              },
            });

          },
          setAll(all,index){
            if(all.target.checked){
              if(this.result_01.deliveryConfig.roomList[index].indeterminate){
                this.result_01.deliveryConfig.roomList[index].names.forEach((item)=>{
                  item.selected = true;
                });
                this.result_01.deliveryConfig.roomList[index].indeterminate = false;
              }
              else{
                this.result_01.deliveryConfig.roomList[index].selectAll = true;
                this.result_01.deliveryConfig.roomList[index].names.forEach((item)=>{
                  item.selected = true;
                });
                this.result_01.deliveryConfig.roomList[index].indeterminate = false;
              }
            }
            else{
              this.result_01.deliveryConfig.roomList[index].selectAll = false;
              this.result_01.deliveryConfig.roomList[index].names.forEach((item)=>{
                item.selected = false;
              });
              this.result_01.deliveryConfig.roomList[index].indeterminate = false;
            }
          },
          getIndeterminate(val){
            let names = this.result_01.deliveryConfig.roomList[val].names;
            let namesLen = names.length;
            let namesSelected = 0;
            names.forEach((item)=>{
              if(item.selected){
                namesSelected = namesSelected + 1;
              }
            });
            if(namesSelected == 0){
              this.result_01.deliveryConfig.roomList[val].selectAll = false;
              this.result_01.deliveryConfig.roomList[val].indeterminate = false;
            }
            if(namesSelected == namesLen){
              this.result_01.deliveryConfig.roomList[val].selectAll = true;
              this.result_01.deliveryConfig.roomList[val].indeterminate = false;
            }
            else if (namesSelected > 0 && namesSelected < namesLen){
              this.result_01.deliveryConfig.roomList[val].selectAll = false;
              this.result_01.deliveryConfig.roomList[val].indeterminate = true;
            }
          },
            checkContractMedium(val){
                //电子合同与纸质合同至少保留一个
                if(val==1){
                    if(this.result_01.contractMedium.contractMedium_02.checked==0){
                        return;
                    }
                    this.result_01.contractMedium.contractMedium_01.checked = 0;
                    this.result_01.contractMedium.default = 2;
                }
                else if(val==2){
                    if(this.result_01.contractMedium.contractMedium_01.checked==0){
                        return;
                    }
                    this.result_01.contractMedium.contractMedium_02.checked = 0;
                    this.result_01.contractMedium.default = 1;
                }
            },
            changeTemplate(currentSelectId,currentSelectName,currentSelectCheck,templateList){
                this.result_01.contractMedium.contractMedium_02.templateIdList = currentSelectId;
                this.result_01.contractMedium.contractMedium_02.templateNameList = currentSelectName;
                this.result_01.contractMedium.contractMedium_02.templateDefaultList = currentSelectCheck;
                this.result_01.contractMedium.contractMedium_02.templateList = templateList;
            },
            payPatternChecked(val){
                if(val==1){
                    if(this.result_01.payPattern.payPattern_02.checked==0&&this.result_01.payPattern.payPattern_03.checked==0){
                        return;
                    }
                    this.result_01.payPattern.payPattern_01.checked = 0;
                }
                else if(val==2){
                    if(this.result_01.payPattern.payPattern_01.checked==0&&this.result_01.payPattern.payPattern_03.checked==0){
                        return;
                    }
                    this.result_01.payPattern.payPattern_02.checked = 0;
                }
                else if(val==3){
                    if(this.result_01.payPattern.payPattern_01.checked==0&&this.result_01.payPattern.payPattern_02.checked==0){
                        return;
                    }
                    this.result_01.payPattern.payPattern_03.checked = 0;
                }
            },
            initDefault(){
                this.result_01 = {         //租客合同信息配置
                    contractMedium: {
                        default:1,               //默认纸质 1、纸质；2、电子
                        contractMedium_01: {     //纸质合同
                            checked:1,          //是否选择（可用）1、可用；0禁用
                            sendFlag:0,         //1、发送；0、不发送
                        },
                        contractMedium_02: {     //电子合同
                            checked:1,          //是否选择（可用）1、可用；0禁用
                            templateIdList:[],
                            templateNameList:[],
                            templateDefaultList:[],
                            templateList:[],
                        },
                    },
                    gender:{
                        default:1,      //1、男；2、女
                    },
                    certificateType:{
                        required:1,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:1,     //初始值
                    },
                    idzhengPng:{
                        required:1,
                    },
                    idfanPng:{
                        required:1,
                    },
                    shouidPng:{
                        required:0,
                    },
                    otherPng:{
                        required:0,
                    },
                    togetherName:{
                        required:0,
                    },
                    togetherGender:{
                        default:1,      //1、男；2、女
                    },
                    togetherPhone:{
                        required:0,
                    },
                    togetherCertificateType:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:1,     //初始值
                    },
                    customerResource:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:undefined,     //初始值
                    },
                    profession:{
                        required:0,
                    },
                    interest:{
                        required:0,
                    },
                    employer:{
                        required:0,
                    },
                    paymentType:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:1,     //初始值
                    },
                    emergencyType:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:'1',     //初始值
                    },
                    contractNo:{
                        required:0,
                    },
                    isProduceRentDeposit:{
                      required:0,     //是否必填
                      unEditable:0,  //是否不可修改
                      default:1,     //初始值
                    },
                    payPattern:{
                        payPattern_01:{
                            checked:1,
                            default:15,
                        },
                        payPattern_02:{
                            checked:1,
                            default:undefined,
                        },
                        payPattern_03:{
                            checked:1,
                            default:undefined,
                        },
                        required:1,
                    },
                    depositPeriodType:{
                        depositPeriodTypeList_01:[
                            {
                                deposit:undefined,
                                periodType:undefined,
                                default:0,              //不是默认
                            }
                        ],       //固定付款方式集合
                        depositPeriodTypeList_02:[
                            {
                                deposit:1,
                                periodType:3,
                                default:0,              //不是默认
                            }
                        ],       //不固定
                        depositPeriodTypeDiy:0,         //1、固定；0不固定
                    },
                    otherExpenses:[],
                    fileIds:{           //合同附件
                        required:0,
                    },
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
                };
                this.result_02 = {         //发起预定信息配置
                    money:{
                        required:1,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:'',     //初始值
                    },
                  bookType:{
                    required:1,     //是否必填
                    unEditable:0,  //是否不可修改
                    default:1,     //初始值
                  },
                    gender:{
                    default:1,      //1、男；2、女
                    },
                    certificateType:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:1,     //初始值
                    },
                    signDate:{
                        required:1,
                    },
                    rentMonth:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:undefined,     //初始值
                    },
                    comment:{
                        required:0,
                    },
                    picIdList:{
                        required:0,
                    },
                };
            },
            // 费用类型方法
            costSelect(value, index,item) {
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
            cancleOtherPopup(item){
                item.popupVisible = false;
            },
            changeOtherPopup(item){
                this.result_01.otherExpenses&&this.result_01.otherExpenses.forEach((item)=>{
                    item.popupVisible = false;
                });
                item.popupVisible = true;
            },
            deleteSubject(index){
                this.result_01.otherExpenses.splice(index,1);
                this.checkedFeeSubjectIds = [];
                this.result_01.otherExpenses.forEach((item)=>{
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
            AddSubjectObj(firstFlag){
                let obj = Object.assign({},this.otherExpenseObj);
                if(!firstFlag){
                    let temp = false;
                    this.result_01.otherExpenses.forEach((item)=>{
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
                        this.$message.warning('请完善费用信息');
                        return;
                    }
                    //获取所有选中费用科目
                    this.checkedFeeSubjectIds = [];
                    this.result_01.otherExpenses.forEach((item)=>{
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
                    this.result_01.otherExpenses.push(obj);
                }
                else{
                    this.checkedFeeSubjectIds = [];
                    this.costTabsContent = this.originCostTabsContent;
                    this.costTabsContent.forEach((item)=>{
                        item.metaList.forEach((temp)=>{
                            temp.disabled = false;
                        })
                    })
                    this.result_01.otherExpenses.push(obj);
                }
            },
            checkDepositPeriodTypeDefault(item,val,indext,flag){
                if(val==0){
                    item.default = val;
                }
                else if(val==1){
                    item.default = val;
                    //若默认该项，将其他置为非默认
                    if(flag){
                        this.result_01.depositPeriodType.depositPeriodTypeList_01.forEach((item,index)=>{
                            if(indext!=index){
                                item.default = 0;
                            }
                        });
                    }
                }
            },
            deleteDepositPeriodType(index){
                this.result_01.depositPeriodType.depositPeriodTypeList_01.splice(index,1);
            },
            addDepositPeriodType(firstFlag){
                let obj = Object.assign({},this.depositPeriodTypeObj);
                if(!firstFlag){
                    let temp = false;
                    this.result_01.depositPeriodType.depositPeriodTypeList_01.forEach((item)=>{
                        if(!item.deposit){
                            temp = true;
                        }
                        if(!item.periodType){
                            temp = true;
                        }
                    });
                    if(temp){
                        this.$message.warning('请完善付款方式');
                        return;
                    }
                }
                this.result_01.depositPeriodType.depositPeriodTypeList_01.push(obj);
            },
            getDict(){
                // 客户来源
                listEnableDict('add63a4f45ba444e8ca3c57ec4193a35').then(res => {
                    this.channelList = res.data;
                    let obj = {
                        id: '',
                        name: '请选择'
                    }
                    this.channelList.unshift(obj);
                });
                const params = 'FEESUBJECT';
                listFeeSubjectWithoutRentalFee(params).then(res => {
                    if (res.code === "200") {
                        this.originCostTabsContent = res.data;
                        this.costTabsContent = res.data;
                    }
                })
            },
            initData(){
                let moduleMark = 'contract.renterContract';
                if(this.activekey == 1){
                    moduleMark = 'contract.renterContract';
                }
                else if(this.activekey == 2){
                    moduleMark = 'contract.houseBook';
                }
                let parameter = {
                    features:'default',
                    moduleMark:moduleMark,
                    storeId:this.storeDeptId,
                };
                this.initDefault();
                API.moduleFieldConfigList(parameter).then(res => {
                    if (res.code === '200') {
                        let resultList = res.data;
                        if(resultList&&resultList.length>0){
                            if(this.activekey == 1){
                                this.result_01 = resultList[0].fieldsObj;
                                if(!this.result_01.deliveryConfig){
                                  let obj = {
                                    required:0,
                                    scenePic:0,
                                    goodDefault:0,
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
                                  }
                                  this.$set(this.result_01, 'deliveryConfig', obj);
                                }
                                if(!this.result_01.isProduceRentDeposit){
                                  let obj = {
                                    required:0,     //是否必填
                                    unEditable:0,  //是否不可修改
                                    default:1,     //初始值
                                  };
                                  this.$set(this.result_01, 'isProduceRentDeposit', obj);
                                }
                                this.id_01 = resultList[0].id;
                            }
                            else if(this.activekey == 2){
                                this.result_02 = resultList[0].fieldsObj;
                                this.id_02 = resultList[0].id;
                                if(!this.result_02.bookType){
                                  let obj = {
                                    required:1,     //是否必填
                                    unEditable:0,  //是否不可修改
                                    default:1,     //初始值
                                  };
                                  this.$set(this.result_02, 'bookType', obj);
                                }
                            }
                        }
                        else{
                            this.id_01 = '';
                            this.id_02 = '';
                        }
                    }
                });
            },
            changeActivekey(val){
                this.activekey = val;
                this.initData();
            },
            saveConfig(){
                let moduleMark = 'contract.renterContract';
                let fieldsObj = {};
                let id = '';
                if(this.activekey == 1){
                    //检验下
                    if(this.result_01.depositPeriodType.depositPeriodTypeDiy==1){
                        if(this.result_01.depositPeriodType.depositPeriodTypeList_01&&this.result_01.depositPeriodType.depositPeriodTypeList_01.length>0){
                            let temp = false;
                            this.result_01.depositPeriodType.depositPeriodTypeList_01.forEach((item)=>{
                                if(!item.deposit){
                                    temp = true;
                                }
                                if(!item.periodType){
                                    temp = true;
                                }
                            });
                            if(temp){
                                this.$message.warning('请完善固定付款方式信息');
                                return;
                            }
                        }
                        else{
                            this.$message.warning('至少选择一种固定付款方式');
                            return;
                        }
                    }
                    moduleMark = 'contract.renterContract';
                    fieldsObj = this.result_01;
                    id = this.id_01;
                }
                else if(this.activekey == 2){
                    moduleMark = 'contract.houseBook';
                    fieldsObj = this.result_02;
                    id = this.id_02;
                }

                let parameter = {
                    features:'default',
                    moduleMark:moduleMark,
                    storeId:this.storeDeptId,
                    fieldsObj:fieldsObj,
                };
                if(id) {
                  parameter.id = id;
                }
                this.confirmSaveDialog = true;
                this.data = parameter;
            },
            defaultConfig(){
                let id = '';
                if(this.activekey == 1){
                    id = this.id_01;
                }
                else if(this.activekey == 2){
                    id = this.id_02;
                }
                let _this = this;
                this.$modal.confirm({
                    title: '确定要恢复默认配置吗？',
                    content: '恢复默认配置后，此模块的默认字段配置信息将恢复成系统原有的配置',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        API.moduleFieldConfigRemove({id:id}).then(res => {
                            if (res.code == 200) {
                                _this.$message.success('恢复默认配置成功！');
                                setTimeout(() => {
                                    _this.initData();
                                }, 200)
                            }
                        })
                    },
                    onCancel() {
                        // console.log('Cancel');
                    },
                });
            },
        },
        watch:{
            storeDeptId() {
                this.initData();
            },
        },
    }
</script>

<style scoped lang="less">
    .contract-default-box{
        width: 100%;
        .header{
            height: 32px;
            .item{
                width: 88px;
                height: 32px;
                line-height: 32px;
                text-align: center;
            }
            .left-item{
                border-radius:4px 0px 0px 4px;
            }
            .right-item{
                border-radius:0px 4px 4px 0px;
            }
            .active-item{
                border:1px solid rgba(10,135,248,1);
                color: #0A87F8;
            }
            .not-active-item{
                border:1px solid rgba(187,187,187,1);
            }
            .not-left-active-item{
                border-right: none !important;
            }
            .not-right-active-item{
                border-left: none !important;
            }
        }
        .content{
            width: 100%;
            margin-top: 23px;
            box-shadow:0px 0px 10px 0px rgba(187,187,187,0.1);
            border-radius:4px;
            border:1px solid rgba(238,238,238,1);
            .bigTitle{
                height:40px;
                background:rgba(246,247,251,1);
                border-radius:4px 4px 0px 0px;
                border-bottom:1px solid rgba(238,238,238,1);
                line-height: 40px;
                text-align: center;
                color: #777777;
            }
            .content-content{
                padding: 20px 10px;
                .selected{
                    color: #0A87F8;
                }
                .noSelected{
                    color: #777777;
                }
                .title{
                    font-size: 16px;
                    color: #111111;
                    font-weight: 500;
                    i{
                        vertical-align: -0.2em;
                        margin-right: 2px;
                    }
                }
                .basicsInfo{
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    .item{
                        display: flex;
                        justify-content: flex-start;
                        margin-right: 15px;
                        .left{
                            width:174px;
                            height:58px;
                            background:rgba(250,250,250,1);
                            .left-top{
                                margin-top: 4px;
                                margin-left: 4px;
                                .name{
                                    color: #777777;
                                    font-size: 12px;
                                }
                                .mustFill{
                                    margin-left: 2px;
                                    color: #FB4246;
                                }
                            }
                            .left-bottom{
                                margin-left: 4px;
                                margin-top: 5px;
                                color: #BBBBBB;
                                position: relative;
                                font-size: 13px;
                                .man-style{
                                    font-size: 12px;
                                    position: absolute;
                                    right: 33px;
                                    top:1px;
                                }
                                .woman-style{
                                    font-size: 12px;
                                    position: absolute;
                                    right: 5px;
                                    top:1px;
                                }
                                .payPattern{
                                    border-right: 0.5px solid #EEEEEE;
                                    svg{
                                        width: 14px;
                                        height: 14px;
                                    }
                                    .mustFillFont{
                                        color: #111111;
                                        font-size: 12px;
                                        text-align: left;
                                        .unEditStyle{
                                            margin-right: 2px;
                                            color: #BBBBBB;
                                        }
                                        .editStyle{
                                            margin-right: 2px;
                                            color: #777777;
                                        }
                                        .notChangeStyle{
                                            margin-right: 2px;
                                            color: #DDDDDD;
                                        }
                                        .selectStyle{
                                            color: #0A87F8;
                                        }
                                    }
                                    /deep/ .ant-input{
                                        height: 19px;
                                    }
                                }
                                .payPattern_01{
                                    height: 24px;
                                    width: 165px;
                                }
                                .payPattern_02{
                                    height: 24px;
                                    width: 260px;
                                }
                                .payPattern_03{
                                    height: 24px;
                                    width: 260px;
                                    border-right: none !important;
                                }
                            }
                        }
                        .right{
                            width:72px;
                            height:58px;
                            background:rgba(246,247,251,1);
                            border-top-right-radius: 2px;
                            border-bottom-right-radius: 2px;
                            display: flex;
                            flex-direction:column;
                            justify-content : center;
                            .secondLine{
                                i{
                                    vertical-align: -0.1em !important;
                                }
                            }
                            .mustFillFont{
                                color: #777777;
                                font-size: 12px;
                                text-align: left;
                                margin-left: 6px;
                                i{
                                    vertical-align: -0.2em;
                                }
                                svg{
                                    width: 12px;
                                    height: 12px;
                                }
                                .unEditStyle{
                                    margin-right: 2px;
                                    color: #BBBBBB;
                                }
                                .editStyle{
                                    margin-right: 2px;
                                    color: #777777;
                                }
                                .notChangeStyle{
                                    margin-right: 2px;
                                    color: #DDDDDD;
                                }
                                .selectStyle{
                                    color: #0A87F8;
                                }
                            }
                            .margin-top-3{
                                margin-top: 3px;
                            }
                        }
                        .blankBg{
                            background-color: #FFFFFF !important;
                        }
                        .bottomBlankBg{
                            background-color: #FFFFFF !important;
                            border-bottom: 1px solid rgba(221,221,221,1);
                        }
                    }
                    .table{
                        width: 1050px;
                        border-left: 1px solid #EEEEEE;
                        border-top: 1px solid #EEEEEE;
                        font-size: 12px;
                        .table-title{
                            display: flex;
                            background:rgba(246,247,251,1);
                            color: #666666;
                            & > div {
                                flex: 1;
                                border-right: 1px solid #EEEEEE;
                                border-bottom: 1px solid #EEEEEE;
                            }
                            .fixedStyle{
                                height: 40px;
                                line-height: 40px;
                            }
                            .mustFill{
                                margin-left: 2px;
                                color: #FB4246;
                            }
                        }
                        .house-data {
                            display: flex;
                            position: relative;
                            .depositPeriodTypeDiy{
                                left:2px;
                                position: absolute;
                                .editStyle{
                                    margin-right: 2px;
                                    color: #777777;
                                }
                                .selectStyle{
                                    color: #0A87F8;
                                }
                                svg{
                                    height: 14px;
                                    width: 14px;
                                }
                            }
                            & > div{
                                flex: 1;
                                text-align: left;
                                border-right: 1px solid #EEEEEE;
                                border-bottom: 1px solid #EEEEEE;
                                background-color: #ffffff;
                            }
                            .fixedStyle{
                                height: 46px;
                                line-height: 46px;
                            }
                            /deep/ .ant-select-selection__rendered{
                                font-size: 14px;
                                margin-left: 0;
                            }
                            /deep/ .ant-select-arrow i{
                            }
                            /deep/ .ant-select-selection__rendered{
                                margin-right: 0;
                            }
                            /deep/ .ant-input{
                                font-size: 14px;
                            }
                            /deep/ .ant-checkbox-inner{
                                width: 12px;
                                height: 12px;
                            }
                            .addonAfterStyle{
                                font-size: 14px;
                                color: #111111;
                                margin-left: 20px;
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

                            .myCascader{
                                /deep/ .ant-cascader-picker-arrow {
                                   margin-top: -4px;
                                }
                                /deep/ svg{
                                    width: 12px;
                                    height: 12px;
                                }
                            }
                        }
                        .svg14Style{
                            /deep/ svg{
                                width: 14px;
                                height: 14px;
                            }
                            font-size: 12px;
                            color: #111111;
                            line-height: 44px;
                            height: 44px;
                            margin-top: 2px;
                            .editStyle{
                                margin-right: 2px;
                                color: #777777;
                            }
                            .selectStyle{
                                color: #0A87F8;
                            }
                        }
                        .defaultFont{
                            /deep/ svg{
                                width: 16px;
                                height: 16px;
                            }
                            i {
                                vertical-align: -0.2em;

                            }
                            color: #111111;
                            font-size: 14px;
                            .editStyle{
                                margin-right: 2px;
                                color: #777777;
                            }
                            .selectStyle{
                                color: #0A87F8;
                            }
                        }
                        .delete-icon{
                            color: red;
                            font-size: 14px;
                        }
                    }
                    .add-subject-style{
                        width: 160px;
                        height: 38px;
                        line-height: 38px;
                        font-size: 14px;
                        border-radius:4px;
                        border:1px solid rgba(10,135,248,1);
                        text-align: center;
                        color: #0A87F8;
                        i{
                            vertical-align: 0em;
                            margin-right: 4px;
                        }
                        svg{
                            width: 12px;
                            height: 12px;
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
                }
              .delivery{
                .delivery-style{
                  width: 600px;
                  background: #FFFFFF;
                  border: 1px solid #E8E8E8;
                  height: 66px;
                  display: flex;
                  justify-content: flex-start;
                  .delivery-item-style{
                    margin: 10px 12px;
                    flex: 1;
                  }
                }
                .delivery-pic-style{
                  border-radius: 0 0 5px 5px;
                  width: 600px;
                  height: 34px;
                  line-height: 34px;
                  background: #F6F7F8;
                  padding-left: 12px;
                }
                .delivery-style-radius1{
                  border-radius: 5px 5px 0 0;
                }
                .delivery-style-radius2{
                  border-radius: 5px;
                }
                .goodList-style{
                  margin-top: 15px;
                  width: 100%;
                  .goodList-head-style{
                    height: 40px;
                    line-height: 40px;
                    background: #F6F7FB;
                    border: 1px solid #EEEEEE;
                  }
                  .goodList-head-style-radius1{
                    border-radius: 4px;
                  }
                  .goodList-head-style-radius2{
                    border-radius: 4px 4px 0px 0px;
                  }
                  .goodList-detail-style{
                    padding: 15px 20px 15px 10px;
                    border-radius: 0px 0px 4px 4px;
                    width: 100%;
                    border: 1px solid #EEEEEE;
                    border-top: none;
                    .goodList-detail-head{
                      padding-left: 8px;
                      position: relative;
                      .leftLine{
                        content: "";
                        position: absolute;
                        top: 2px;
                        left: 0px;
                        height: 14px;
                        width: 1px;
                        border-left: 2px solid #0A87F8;
                      }
                    }
                    .goodList-detail-item{
                      width: 100%;
                      border-radius: 4px;
                      border: 1px solid #EEEEEE;
                      display: flex;
                      /deep/ .ant-checkbox-inner{
                        width: 14px;
                        height: 14px;
                      }
                      .goodList-detail-item-left{
                        width: 75px;
                        background: #F5F7FF;
                        border-radius: 4px 0px 0px 4px;
                        display: flex;
                      }
                      .goodList-detail-item-right{
                        width: calc(100% - 75px);
                        padding: 0 0 10px 20px;
                        .item-name{
                          margin-top: 10px;
                          .item-name-font{
                            /deep/ span{
                              font-size: 13px;
                              color: #777777;
                            }
                          }
                          width: 170px;
                          svg{
                            width: 14px;
                            height: 14px;
                          }
                          .bgDelete {
                            margin-left: 8px;
                            color: @wranColor;
                          }

                          .bgEdit {
                            margin-left: 8px;
                            color: @themeColor;
                          }
                          .addItem {
                            width: 68px;
                            height: 20px;
                            line-height: 20px;
                            color: #0A87F8;
                            font-size: 14px;
                            cursor: pointer;
                            border: 1px solid #0A87F8;
                            text-align: center
                          }
                        }
                      }
                    }
                  }
                }
              }
                .btnStyle{
                    margin: 70px 0 0 0;
                    display: flex;
                    justify-content : flex-end;
                    .warning{
                        line-height: 40px;
                        font-size: 12px;
                        color: #FFA036;
                        margin-right: 10px;
                        svg{
                            width: 14px;
                            height: 14px;
                        }
                    }
                    .sure{
                        width:120px;
                        height:40px;
                        line-height: 40px;
                        background:rgba(10,135,248,1);
                        border-radius:5px;
                        color: #FFFFFF;
                        text-align: center;
                        font-weight:500;
                        font-size: 14px;
                        border:none;
                    }
                    .cancel{
                        width:120px ;
                        height:40px;
                        line-height: 40px;
                        background:#F6F7FB;
                        border-radius:5px;
                        color: #666666;
                        text-align: center;
                        font-weight:500;
                        font-size: 14px;
                        border:none;
                        border: 1px solid #DDDDDD;
                        margin-right: 20px;
                    }
                }
                .margin-top-13{
                    margin-top: 13px;
                }
                .margin-top-25{
                    margin-top: 25px;
                }
                .margin-top-28{
                    margin-top: 28px;
                }
            }
        }
        .deptStyle{
            /deep/ .ant-select-arrow{
                margin-bottom: 10px;
            }
            /deep/ svg{
                width: 12px;
                height: 12px;
            }
        }
        /deep/ .ant-select-selection__clear{

        }
        /deep/ .ant-cascader-picker-label{
            padding: 0;
        }
    }
</style>