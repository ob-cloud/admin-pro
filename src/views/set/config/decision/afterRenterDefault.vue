<template>
    <div class="afterRenter-default-box">
        <div class="header clearfix">
            <div class="item left-item cursor f-fl" :class="activekey==1?'active-item':'not-active-item'" :style="(activekey==2||activekey==3)?'border-right: none;':''" @click="changeActivekey(1)">维修</div>
            <div class="item cursor f-fl" :class="activekey==2?'active-item':'not-active-item'" :style="activekey==1?' border-left: none;':activekey==3?'border-right: none;':''" @click="changeActivekey(2)">保洁</div>
            <div class="item right-item cursor f-fl" :class="activekey==3?'active-item':'not-active-item'" :style="(activekey==1||activekey==2)?' border-left: none;':''" @click="changeActivekey(3)">配货</div>
        </div>
        <div v-if="activekey==1" class="content">
            <div class="bigTitle">发起维修工单默认字段配置</div>
            <div class="content-content">
                <div class="title">报修地址</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">报修地址</span><span class="mustFill">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="title" style="margin-top: 28px;">报修信息</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">报修人姓名</span><span class="mustFill">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">报修人电话</span><span class="mustFill">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">期望上门日期</span><span class="mustFill" v-if="repairResult.visitDate.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="repairResult.visitDate.required==0" @click="repairResult.visitDate.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="repairResult.visitDate.required==1" @click="repairResult.visitDate.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">期望上门时间段</span><span class="mustFill" v-if="repairResult.visitTime.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle">
                                <a-select style="width: 170px;height: 34px;" :allowClear="true" placeholder="设置默认值" v-model="repairResult.visitTime.default">
                                    <a-select-option :value="1">9:00 - 13:00</a-select-option>
                                    <a-select-option :value="2">13:00 - 18:00</a-select-option>
                                    <a-select-option :value="3">18:00 - 22:00</a-select-option>
                                </a-select>
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="repairResult.visitTime.required==0" @click="repairResult.visitTime.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="repairResult.visitTime.required==1" @click="repairResult.visitTime.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">需要维修物件</span><span class="mustFill" v-if="repairResult.repairType.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle">
                                <a-select style="width: 170px;height: 34px;" placeholder="设置默认值" :allowClear="true" v-model="repairResult.repairType.default">
                                    <a-select-option :value="1">家电</a-select-option>
                                    <a-select-option :value="2">家具</a-select-option>
                                    <a-select-option :value="3">水电暖</a-select-option>
                                    <a-select-option :value="4">墙面/地板</a-select-option>
                                    <a-select-option :value="5">锁类</a-select-option>
                                    <a-select-option :value="6">疏通</a-select-option>
                                    <a-select-option :value="7">其他</a-select-option>
                                </a-select>
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="repairResult.repairType.required==0" @click="repairResult.repairType.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="repairResult.repairType.required==1" @click="repairResult.repairType.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">故障描述</span><span class="mustFill" v-if="repairResult.promotionDesc.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="repairResult.promotionDesc.required==0" @click="repairResult.promotionDesc.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="repairResult.promotionDesc.required==1" @click="repairResult.promotionDesc.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">附件</span><span class="mustFill" v-if="repairResult.faultPicList.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="repairResult.faultPicList.required==0" @click="repairResult.faultPicList.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="repairResult.faultPicList.required==1" @click="repairResult.faultPicList.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">备注(仅公司内部可见)</span><span class="mustFill" v-if="repairResult.applyComment.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="repairResult.applyComment.required==0" @click="repairResult.applyComment.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="repairResult.applyComment.required==1" @click="repairResult.applyComment.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="btnStyle">
                    <div class="warning"><a-icon type="exclamation-circle" style="margin-right: 5px;"/>保存成功后，该门店下的所有房源申请工单时，按照配置好的信息来录入</div>
                    <a-button class="cancel cursor" @click="defaultConfig(1)">恢复默认配置</a-button>
                    <a-button class="sure cursor" @click="saveConfig(1)" :loading="saveLoading_01">确定</a-button>
                </div>
            </div>
        </div>
        <div v-if="activekey==1" class="content" style="margin-top: 30px;">
            <div class="bigTitle">完成工单费用配置</div>
            <div class="content-content">
                <div class="title">费用明细</div>
                <div class="basicsInfo">
                    <div v-if="repairSubject.subjectList.length==0" class="add-subject-style margin-top-13 cursor" @click="AddSubjectObj(true)">
                        <icon-font type="iconyumengtubiao_tianjia" />设置费用
                    </div>
                    <div class="table margin-top-13" v-if="repairSubject.subjectList.length>0">
                        <div class="table-title">
                            <div style="max-width: 254px;text-align: left;padding-left: 14px;background: #F5F7FF;color: #111111;">费用承担方</div>
                            <div style="max-width: 320px;text-align: left;padding-left: 14px;background: #F5F7FF;color: #111111;">默认费用类型</div>
                            <div style="max-width: 279px;text-align: left;padding-left: 14px;background: #F5F7FF;color: #111111;">费用金额</div>
                            <div style="max-width: 68px;text-align: center;background: #F5F7FF;color: #111111;">操作</div>
                        </div>
                        <div class="house-data u-no-border" v-for="(item,index) in repairSubject.subjectList" :key="index">
                            <div class="clearfix" style="max-width: 254px;" >
                                <div class="house-data-item-left f-fl" style="width: 147px;padding-left: 14px;">
                                    <label-item title="" class="u-no-border deptStyle">
                                        <a-select style="width: 130px;height: 34px;" :allowClear="true" placeholder="设置默认值" v-model="item.undertaker">
                                            <a-select-option :value="1">租客</a-select-option>
                                            <a-select-option :value="2">业主</a-select-option>
                                            <a-select-option :value="3">公司</a-select-option>
                                        </a-select>
                                    </label-item>
                                </div>
                                <div class="house-data-item-right f-fl">
                                    <div class="deptStyle cursor" v-if="item.undertakerUnEditable==0" @click="item.undertakerUnEditable=1"><icon-font class="editStyle noSelected" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                                    <div class="deptStyle cursor" v-if="item.undertakerUnEditable==1" @click="item.undertakerUnEditable=0"><icon-font class="editStyle selected" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                                </div>
                            </div>
                            <div class="clearfix" style="max-width: 320px;">
                                <div class="house-data-item-left f-fl" style="width: 212px;padding-left:15px; ">
                                    <a-cascader class="myCascader" style="width: 190px;" :popupVisible="item.popupVisible" @click="changeOtherPopup(item,1)" :id="'repairSubeject_'+index" @blur="cancleOtherPopup(item)" placeholder="请选择" v-model="item.id" :options="costTabsContent_01" :allowClear="false" :fieldNames="elcostcascaderValue" @change="(value) => costSelect(value, index,item)"></a-cascader>
                                </div>
                                <div class="house-data-item-right f-fl">
                                    <div class="deptStyle cursor" v-if="item.feeSubjectIdUnEditable==0" @click="item.feeSubjectIdUnEditable=1"><icon-font class="editStyle noSelected" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                                    <div class="deptStyle cursor" v-if="item.feeSubjectIdUnEditable==1" @click="item.feeSubjectIdUnEditable=0"><icon-font class="editStyle selected" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                                </div>
                            </div>
                            <div class="clearfix" style="max-width: 279px;">
                                <div class="house-data-item-left f-fl" style="width: 172px;padding-left: 14px;">
                                    <a-input style="width: 70px" v-model="item.money" v-validate="'moneyNoDot'" placeholder="设置" /><span class="addonAfterStyle">元</span>
                                </div>
                                <div class="house-data-item-right f-fl">
                                    <div class="deptStyle cursor" v-if="item.moneyUnEditable==0" @click="item.moneyUnEditable=1"><icon-font class="editStyle noSelected" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                                    <div class="deptStyle cursor" v-if="item.moneyUnEditable==1" @click="item.moneyUnEditable=0"><icon-font class="editStyle selected" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                                </div>
                            </div>
                            <div style="max-width: 68px;text-align: center;">
                                <icon-font @click="deleteSubject(index)" class="delete-icon" type="iconyumengtubiao_shanchu-"></icon-font>
                            </div>
                        </div>
                        <div class="house-data u-no-border cursor" @click="AddSubjectObj(false)">
                            <div class="continueAddStyle">
                                <icon-font type="iconyumengtubiao_tianjia" />继续添加
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btnStyle">
                    <div class="warning"><a-icon type="exclamation-circle" style="margin-right: 5px;"/>保存成功后，该门店下的所有房源在完成/验收工单时，按照配置好的信息来生成费用清单</div>
                    <a-button class="cancel cursor" @click="defaultConfig(2)">恢复默认配置</a-button>
                    <a-button class="sure cursor" @click="saveConfig(2)" :loading="saveLoading_02">确定</a-button>
                </div>
            </div>
        </div>
        <div v-if="activekey==2" class="content">
            <div class="bigTitle">发起保洁工单默认字段配置</div>
            <div class="content-content">
                <div class="title">保洁地址</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">保洁地址</span><span class="mustFill">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="title" style="margin-top: 28px;">保洁信息</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">申请人姓名</span><span class="mustFill">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">申请人电话</span><span class="mustFill">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">期望上门日期</span><span class="mustFill" v-if="cleanResult.visitDate.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="cleanResult.visitDate.required==0" @click="cleanResult.visitDate.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="cleanResult.visitDate.required==1" @click="cleanResult.visitDate.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">期望上门时间段</span><span class="mustFill" v-if="cleanResult.visitTime.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle">
                                <a-select style="width: 170px;height: 34px;" :allowClear="true" placeholder="设置默认值" v-model="cleanResult.visitTime.default">
                                    <a-select-option :value="1">9:00 - 13:00</a-select-option>
                                    <a-select-option :value="2">13:00 - 18:00</a-select-option>
                                    <a-select-option :value="3">18:00 - 22:00</a-select-option>
                                </a-select>
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="cleanResult.visitTime.required==0" @click="cleanResult.visitTime.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="cleanResult.visitTime.required==1" @click="cleanResult.visitTime.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">需要保洁的类型</span><span class="mustFill" v-if="cleanResult.cleanType.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle">
                                <a-select style="width: 170px;height: 34px;" :allowClear="true" placeholder="设置默认值" v-model="cleanResult.cleanType.default">
                                    <a-select-option :value="1">日常保洁</a-select-option>
                                    <a-select-option :value="2">深度保洁</a-select-option>
                                    <a-select-option :value="3">开荒保洁</a-select-option>
                                    <a-select-option :value="4">擦玻璃</a-select-option>
                                    <a-select-option :value="5">空调清理</a-select-option>
                                    <a-select-option :value="6">油烟机清洗</a-select-option>
                                    <a-select-option :value="7">冰箱清洗</a-select-option>
                                    <a-select-option :value="8">除螨清洁</a-select-option>
                                    <a-select-option :value="9">皮质家具护理</a-select-option>
                                    <a-select-option :value="10">其他</a-select-option>
                                </a-select>
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="cleanResult.cleanType.required==0" @click="cleanResult.cleanType.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="cleanResult.cleanType.required==1" @click="cleanResult.cleanType.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">需求描述</span><span class="mustFill" v-if="cleanResult.promotionDesc.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="cleanResult.promotionDesc.required==0" @click="cleanResult.promotionDesc.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="cleanResult.promotionDesc.required==1" @click="cleanResult.promotionDesc.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">附件</span><span class="mustFill" v-if="cleanResult.cleanPicList.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="cleanResult.cleanPicList.required==0" @click="cleanResult.cleanPicList.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="cleanResult.cleanPicList.required==1" @click="cleanResult.cleanPicList.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">备注(仅公司内部可见)</span><span class="mustFill" v-if="cleanResult.applyComment.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="cleanResult.applyComment.required==0" @click="cleanResult.applyComment.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="cleanResult.applyComment.required==1" @click="cleanResult.applyComment.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="btnStyle">
                    <div class="warning"><a-icon type="exclamation-circle" style="margin-right: 5px;"/>保存成功后，该门店下的所有房源申请工单时，按照配置好的信息来录入</div>
                    <a-button class="cancel cursor" @click="defaultConfig(1)">恢复默认配置</a-button>
                    <a-button class="sure cursor" @click="saveConfig(1)" :loading="saveLoading_01">确定</a-button>
                </div>
            </div>
        </div>
        <div v-if="activekey==2" class="content" style="margin-top: 30px;">
            <div class="bigTitle">完成工单费用配置</div>
            <div class="content-content">
                <div class="title">费用明细</div>
                <div class="basicsInfo">
                    <div v-if="cleanSubject.subjectList.length==0" class="add-subject-style margin-top-13 cursor" @click="AddSubjectObj(true)">
                        <icon-font type="iconyumengtubiao_tianjia" />设置费用
                    </div>
                    <div class="table margin-top-13" v-if="cleanSubject.subjectList.length>0">
                        <div class="table-title">
                            <div style="max-width: 254px;text-align: left;padding-left: 14px;background: #F5F7FF;color: #111111;">费用承担方</div>
                            <div style="max-width: 320px;text-align: left;padding-left: 14px;background: #F5F7FF;color: #111111;">默认费用类型</div>
                            <div style="max-width: 279px;text-align: left;padding-left: 14px;background: #F5F7FF;color: #111111;">费用金额</div>
                            <div style="max-width: 68px;text-align: center;background: #F5F7FF;color: #111111;">操作</div>
                        </div>
                        <div class="house-data u-no-border" v-for="(item,index) in cleanSubject.subjectList" :key="index">
                            <div class="clearfix" style="max-width: 254px;" >
                                <div class="house-data-item-left f-fl" style="width: 147px;padding-left: 14px;">
                                    <label-item title="" class="u-no-border deptStyle">
                                        <a-select style="width: 130px;height: 34px;" :allowClear="true" placeholder="设置默认值" v-model="item.undertaker">
                                            <a-select-option :value="1">租客</a-select-option>
                                            <a-select-option :value="2">业主</a-select-option>
                                            <a-select-option :value="3">公司</a-select-option>
                                        </a-select>
                                    </label-item>
                                </div>
                                <div class="house-data-item-right f-fl">
                                    <div class="deptStyle cursor" v-if="item.undertakerUnEditable==0" @click="item.undertakerUnEditable=1"><icon-font class="editStyle noSelected" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                                    <div class="deptStyle cursor" v-if="item.undertakerUnEditable==1" @click="item.undertakerUnEditable=0"><icon-font class="editStyle selected" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                                </div>
                            </div>
                            <div class="clearfix" style="max-width: 320px;">
                                <div class="house-data-item-left f-fl" style="width: 212px;padding-left:15px; ">
                                    <a-cascader class="myCascader" style="width: 190px;" :popupVisible="item.popupVisible" @click="changeOtherPopup(item,2)" :id="'cleanSubeject_'+index" @blur="item.popupVisible=false" placeholder="请选择" v-model="item.id" :options="costTabsContent_02" :allowClear="false" :fieldNames="elcostcascaderValue" @change="(value) => costSelect(value, index,item)"></a-cascader>
                                </div>
                                <div class="house-data-item-right f-fl">
                                    <div class="deptStyle cursor" v-if="item.feeSubjectIdUnEditable==0" @click="item.feeSubjectIdUnEditable=1"><icon-font class="editStyle noSelected" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                                    <div class="deptStyle cursor" v-if="item.feeSubjectIdUnEditable==1" @click="item.feeSubjectIdUnEditable=0"><icon-font class="editStyle selected" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                                </div>
                            </div>
                            <div class="clearfix" style="max-width: 279px;">
                                <div class="house-data-item-left f-fl" style="width: 172px;padding-left: 14px;">
                                    <a-input style="width: 70px" v-model="item.money" v-validate="'moneyNoDot'" placeholder="设置" /><span class="addonAfterStyle">元</span>
                                </div>
                                <div class="house-data-item-right f-fl">
                                    <div class="deptStyle cursor" v-if="item.moneyUnEditable==0" @click="item.moneyUnEditable=1"><icon-font class="editStyle noSelected" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                                    <div class="deptStyle cursor" v-if="item.moneyUnEditable==1" @click="item.moneyUnEditable=0"><icon-font class="editStyle selected" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                                </div>
                            </div>
                            <div style="max-width: 68px;text-align: center;">
                                <icon-font @click="deleteSubject(index)" class="delete-icon" type="iconyumengtubiao_shanchu-"></icon-font>
                            </div>
                        </div>
                        <div class="house-data u-no-border cursor" @click="AddSubjectObj(false)">
                            <div class="continueAddStyle">
                                <icon-font type="iconyumengtubiao_tianjia" />继续添加
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btnStyle">
                    <div class="warning"><a-icon type="exclamation-circle" style="margin-right: 5px;"/>保存成功后，该门店下的所有房源在完成/验收工单时，按照配置好的信息来生成费用清单</div>
                    <a-button class="cancel cursor" @click="defaultConfig(2)">恢复默认配置</a-button>
                    <a-button class="sure cursor" @click="saveConfig(2)" :loading="saveLoading_02">确定</a-button>
                </div>
            </div>
        </div>
        <div v-if="activekey==3" class="content">
            <div class="bigTitle">发起配货工单默认字段配置</div>
            <div class="content-content">
                <div class="title">配货地址</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">配货地址</span><span class="mustFill">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="title" style="margin-top: 28px;">配货信息</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">申请人姓名</span><span class="mustFill">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">申请人电话</span><span class="mustFill">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">期望配货完成日期</span><span class="mustFill" v-if="distributionResult.expectCompleteDate.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="distributionResult.expectCompleteDate.required==0" @click="distributionResult.expectCompleteDate.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="distributionResult.expectCompleteDate.required==1" @click="distributionResult.expectCompleteDate.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">附件</span><span class="mustFill" v-if="distributionResult.fileIdList.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="distributionResult.fileIdList.required==0" @click="distributionResult.fileIdList.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="distributionResult.fileIdList.required==1" @click="distributionResult.fileIdList.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">备注(仅公司内部可见)</span><span class="mustFill" v-if="distributionResult.applyComment.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="distributionResult.applyComment.required==0" @click="distributionResult.applyComment.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="distributionResult.applyComment.required==1" @click="distributionResult.applyComment.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="title" style="margin-top: 28px;">物品信息</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">物品</span><span class="mustFill" v-if="distributionResult.quantity.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">物品数量</span><span class="mustFill" v-if="distributionResult.quantity.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle" style="padding-left: 4px;">
                                <a-input v-model="distributionResult.quantity.default" v-validate="'naturalNum|min(1)|max(999)'" placeholder="设置" />
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="distributionResult.quantity.required==0" @click="distributionResult.quantity.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="distributionResult.quantity.required==1" @click="distributionResult.quantity.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">物品描述</span><span class="mustFill" v-if="distributionResult.promotionDesc.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="distributionResult.promotionDesc.required==0" @click="distributionResult.promotionDesc.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="distributionResult.promotionDesc.required==1" @click="distributionResult.promotionDesc.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="btnStyle">
                    <div class="warning"><a-icon type="exclamation-circle" style="margin-right: 5px;"/>保存成功后，该门店下的所有房源申请工单时，按照配置好的信息来录入</div>
                    <a-button class="cancel cursor" @click="defaultConfig(1)">恢复默认配置</a-button>
                    <a-button class="sure cursor" @click="saveConfig(1)" :loading="saveLoading_01">确定</a-button>
                </div>
            </div>
        </div>
        <div v-if="activekey==3" class="content" style="margin-top: 30px;">
            <div class="bigTitle">完成工单费用配置</div>
            <div class="content-content">
                <div class="title">费用明细</div>
                <div class="basicsInfo">
                    <div v-if="distributionSubject.subjectList.length==0" class="add-subject-style margin-top-13 cursor" @click="AddSubjectObj(true)">
                        <icon-font type="iconyumengtubiao_tianjia" />设置费用
                    </div>
                    <div class="table margin-top-13" v-if="distributionSubject.subjectList.length>0">
                        <div class="table-title">
                            <div style="max-width: 254px;text-align: left;padding-left: 14px;background: #F5F7FF;color: #111111;">费用承担方</div>
                            <div style="max-width: 320px;text-align: left;padding-left: 14px;background: #F5F7FF;color: #111111;">默认费用类型</div>
                            <div style="max-width: 279px;text-align: left;padding-left: 14px;background: #F5F7FF;color: #111111;">费用金额</div>
                            <div style="max-width: 68px;text-align: center;background: #F5F7FF;color: #111111;">操作</div>
                        </div>
                        <div class="house-data u-no-border" v-for="(item,index) in distributionSubject.subjectList" :key="index">
                            <div class="clearfix" style="max-width: 254px;" >
                                <div class="house-data-item-left f-fl" style="width: 147px;padding-left: 14px;">
                                    <label-item title="" class="u-no-border deptStyle">
                                        <a-select style="width: 130px;height: 34px;" :allowClear="true" placeholder="设置默认值" v-model="item.undertaker">
                                            <a-select-option :value="1">租客</a-select-option>
                                            <a-select-option :value="2">业主</a-select-option>
                                            <a-select-option :value="3">公司</a-select-option>
                                        </a-select>
                                    </label-item>
                                </div>
                                <div class="house-data-item-right f-fl">
                                    <div class="deptStyle cursor" v-if="item.undertakerUnEditable==0" @click="item.undertakerUnEditable=1"><icon-font class="editStyle noSelected" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                                    <div class="deptStyle cursor" v-if="item.undertakerUnEditable==1" @click="item.undertakerUnEditable=0"><icon-font class="editStyle selected" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                                </div>
                            </div>
                            <div class="clearfix" style="max-width: 320px;">
                                <div class="house-data-item-left f-fl" style="width: 212px;padding-left:15px; ">
                                    <a-cascader class="myCascader" style="width: 190px;" :popupVisible="item.popupVisible" @click="changeOtherPopup(item,3)" :id="'distributionSubeject_'+index" @blur="item.popupVisible=false" placeholder="请选择" v-model="item.id" :options="costTabsContent_03" :allowClear="false" :fieldNames="elcostcascaderValue" @change="(value) => costSelect(value, index,item)"></a-cascader>
                                </div>
                                <div class="house-data-item-right f-fl">
                                    <div class="deptStyle cursor" v-if="item.feeSubjectIdUnEditable==0" @click="item.feeSubjectIdUnEditable=1"><icon-font class="editStyle noSelected" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                                    <div class="deptStyle cursor" v-if="item.feeSubjectIdUnEditable==1" @click="item.feeSubjectIdUnEditable=0"><icon-font class="editStyle selected" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                                </div>
                            </div>
                            <div class="clearfix" style="max-width: 279px;">
                                <div class="house-data-item-left f-fl" style="width: 172px;padding-left: 14px;">
                                    <a-input style="width: 70px" v-model="item.money" v-validate="'moneyNoDot'" placeholder="设置" /><span class="addonAfterStyle">元</span>
                                </div>
                                <div class="house-data-item-right f-fl">
                                    <div class="deptStyle cursor" v-if="item.moneyUnEditable==0" @click="item.moneyUnEditable=1"><icon-font class="editStyle noSelected" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                                    <div class="deptStyle cursor" v-if="item.moneyUnEditable==1" @click="item.moneyUnEditable=0"><icon-font class="editStyle selected" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                                </div>
                            </div>
                            <div style="max-width: 68px;text-align: center;">
                                <icon-font @click="deleteSubject(index)" class="delete-icon" type="iconyumengtubiao_shanchu-"></icon-font>
                            </div>
                        </div>
                        <div class="house-data u-no-border cursor" @click="AddSubjectObj(false)">
                            <div class="continueAddStyle">
                                <icon-font type="iconyumengtubiao_tianjia" />继续添加
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btnStyle">
                    <div class="warning"><a-icon type="exclamation-circle" style="margin-right: 5px;"/>保存成功后，该门店下的所有房源在完成/验收工单时，按照配置好的信息来生成费用清单</div>
                    <a-button class="cancel cursor" @click="defaultConfig(2)">恢复默认配置</a-button>
                    <a-button class="sure cursor" @click="saveConfig(2)" :loading="saveLoading_02">确定</a-button>
                </div>
            </div>
        </div>
        <a-modal destroyOnClose centered :footer="null" width="520px" :maskClosable="false" v-model="confirmSaveDialog" class="ownModalBorder titDialog" title="提示" @cancel="confirmSaveDialog=false">
          <confirm-save :storeDeptName="storeDeptName" :storeDeptId="storeDeptId" :fromType="fromType" :data="data" @cancelSave="confirmSaveDialog=false" @successSave="successSave"></confirm-save>
        </a-modal>
    </div>
</template>

<script>
    import ConfirmSave from './confirmSave';
    import  * as API from '@/api/decision';
    import {
        listFeeSubjectWithoutRentalFee,
    } from '@/api/contract.js';
    export default {
        name: "resourceDefault",
        components: {
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
                activekey:1,        //1、维修；2、保洁；3、配货；
                resultId_01:'',
                subjectId_01:'',
                resultId_02:'',
                subjectId_02:'',
                resultId_03:'',
                subjectId_03:'',
                saveLoading_01:false,
                saveLoading_02:false,
                repairResult:{
                    visitDate:{
                        required:1,
                    },
                    visitTime:{
                        required:1,     //是否必填
                        default:undefined,     //初始值
                    },
                    repairType:{
                        required:1,     //是否必填
                        default:undefined,     //初始值
                    },
                    promotionDesc:{
                        required:0,
                    },
                    faultPicList:{
                        required:0,
                    },
                    applyComment:{
                        required:0,
                    },
                },
                repairSubject:{
                    subjectList:[
                    ],
                },
                cleanResult:{
                    visitDate:{
                        required:1,
                    },
                    visitTime:{
                        required:1,     //是否必填
                        default:undefined,     //初始值
                    },
                    cleanType:{
                        required:1,     //是否必填
                        default:undefined,     //初始值
                    },
                    promotionDesc:{
                        required:0,
                    },
                    cleanPicList:{
                        required:0,
                    },
                    applyComment:{
                        required:0,
                    },
                },
                cleanSubject:{
                    subjectList:[
                    ],
                },
                distributionResult:{
                    expectCompleteDate:{
                        required:1,
                    },
                    fileIdList:{
                        required:0,
                    },
                    applyComment:{
                        required:0,
                    },
                    quantity:{
                        required:1,     //是否必填
                        default:1,     //初始值
                    },
                    promotionDesc:{
                        required:0,
                    },
                },
                distributionSubject:{
                    subjectList:[
                    ],
                },
                subjectObj:{
                    undertaker:undefined,
                    undertakerUnEditable:0,  //是否不可修改
                    feeSubjectId: undefined,
                    feeSubjectName:undefined,
                    feeSubjectIdUnEditable:0,  //是否不可修改
                    money:'',
                    moneyUnEditable:0,  //是否不可修改
                    popupVisible:false,
                },
                elcostcascaderValue: {
                    value: 'id',
                    label: 'name',
                    children: 'metaList'
                },
                costTabsContent_01: [], // 费用类型(维修)
                checkedFeeSubjectIds_01:[], //已选择的费用科目(维修)
                costTabsContent_02: [], // 费用类型（保洁）
                checkedFeeSubjectIds_02:[], //已选择的费用科目（保洁）
                costTabsContent_03: [], // 费用类型（配货）
                checkedFeeSubjectIds_03:[], //已选择的费用科目（配货）
                originCostTabsContent:[],//原始的所有费用科目
                data:{},
                confirmSaveDialog:false,
                operateType:1,    //1、基本信息操作；2、设置出房部门操作
                fromType:2,
            }
        },
        created: function () {
            this.getCost();
            this.initData();
        },
        methods: {
            successSave(){
              this.confirmSaveDialog = false;
              this.initData([this.operateType]);
            },
            cancleOtherPopup(item){
                item.popupVisible = false;
            },
            changeOtherPopup(item,val){
                if(val==1){
                    this.repairSubject.subjectList&&this.repairSubject.subjectList.forEach((item)=>{
                        item.popupVisible = false;
                    });
                }
                if(val==2){
                    this.cleanSubject.subjectList&&this.cleanSubject.subjectList.forEach((item)=>{
                        item.popupVisible = false;
                    });
                }
                if(val==3){
                    this.distributionSubject.subjectList&&this.distributionSubject.subjectList.forEach((item)=>{
                        item.popupVisible = false;
                    });
                }
                item.popupVisible = true;
            },
            initDefault(val){
                if(val==1){
                    this.repairResult = {
                        visitDate:{
                            required:1,
                        },
                        visitTime:{
                            required:1,     //是否必填
                            default:undefined,     //初始值
                        },
                        repairType:{
                            required:1,     //是否必填
                            default:undefined,     //初始值
                        },
                        promotionDesc:{
                            required:0,
                        },
                        faultPicList:{
                            required:0,
                        },
                        applyComment:{
                            required:0,
                        },
                    };
                    this.cleanResult = {
                        visitDate:{
                            required:1,
                        },
                        visitTime:{
                            required:1,     //是否必填
                            default:undefined,     //初始值
                        },
                        cleanType:{
                            required:1,     //是否必填
                            default:undefined,     //初始值
                        },
                        promotionDesc:{
                            required:0,
                        },
                        cleanPicList:{
                            required:0,
                        },
                        applyComment:{
                            required:0,
                        },
                    };
                    this.distributionResult = {
                        expectCompleteDate:{
                            required:1,
                        },
                        fileIdList:{
                            required:0,
                        },
                        applyComment:{
                            required:0,
                        },
                        quantity:{
                            required:1,     //是否必填
                            default:1,     //初始值
                        },
                        promotionDesc:{
                            required:0,
                        },
                    };
                }
                else if(val==2){
                    this.repairSubject = {
                        subjectList:[
                        ],
                    };
                    this.cleanSubject = {
                        subjectList:[
                        ],
                    };
                    this.distributionSubject = {
                        subjectList:[
                        ],
                    };
                }
                else{
                    this.repairResult = {
                        visitDate:{
                            required:1,
                        },
                        visitTime:{
                            required:1,     //是否必填
                            default:undefined,     //初始值
                        },
                        repairType:{
                            required:1,     //是否必填
                            default:undefined,     //初始值
                        },
                        promotionDesc:{
                            required:0,
                        },
                        faultPicList:{
                            required:0,
                        },
                        applyComment:{
                            required:0,
                        },
                    };
                    this.cleanResult = {
                        visitDate:{
                            required:1,
                        },
                        visitTime:{
                            required:1,     //是否必填
                            default:undefined,     //初始值
                        },
                        cleanType:{
                            required:1,     //是否必填
                            default:undefined,     //初始值
                        },
                        promotionDesc:{
                            required:0,
                        },
                        cleanPicList:{
                            required:0,
                        },
                        applyComment:{
                            required:0,
                        },
                    };
                    this.distributionResult = {
                        expectCompleteDate:{
                            required:1,
                        },
                        fileIdList:{
                            required:0,
                        },
                        applyComment:{
                            required:0,
                        },
                        quantity:{
                            required:1,     //是否必填
                            default:1,     //初始值
                        },
                        promotionDesc:{
                            required:0,
                        },
                    };
                    this.repairSubject = {
                        subjectList:[
                        ],
                    };
                    this.cleanSubject = {
                        subjectList:[
                        ],
                    };
                    this.distributionSubject = {
                        subjectList:[
                        ],
                    };
                }
            },
            // 获取费用类型
            getCost() {
                const params = 'FEESUBJECT';
                listFeeSubjectWithoutRentalFee(params).then(res => {
                    if (res.code === "200") {
                        this.originCostTabsContent = res.data;
                        this.costTabsContent_01 = res.data;
                        this.costTabsContent_02 = res.data;
                        this.costTabsContent_03 = res.data;
                    }
                })
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
                            item.popupVisible = false;
                        }
                    });
                });
            },
            deleteSubject(index){
                if(this.activekey==1){
                    this.repairSubject.subjectList.splice(index,1);
                    this.checkedFeeSubjectIds_01 = [];
                    this.repairSubject.subjectList.forEach((item)=>{
                        this.checkedFeeSubjectIds_01.push(item.feeSubjectId);
                    });
                    this.costTabsContent_01 = this.originCostTabsContent;
                    this.costTabsContent_01.forEach((item)=>{
                        item.metaList.forEach((temp)=>{
                            let pos = this.checkedFeeSubjectIds_01.indexOf(temp.id);
                            if(pos > -1){
                                temp.disabled = true;
                            }else{
                                temp.disabled = false;
                            }
                        })
                    });
                }
                else if(this.activekey==2){
                    this.cleanSubject.subjectList.splice(index,1);
                    this.checkedFeeSubjectIds_02 = [];
                    this.cleanSubject.subjectList.forEach((item)=>{
                        this.checkedFeeSubjectIds_02.push(item.feeSubjectId);
                    });
                    this.costTabsContent_02 = this.originCostTabsContent;
                    this.costTabsContent_02.forEach((item)=>{
                        item.metaList.forEach((temp)=>{
                            let pos = this.checkedFeeSubjectIds_02.indexOf(temp.id);
                            if(pos > -1){
                                temp.disabled = true;
                            }else{
                                temp.disabled = false;
                            }
                        })
                    });
                }
                else if(this.activekey==3){
                    this.distributionSubject.subjectList.splice(index,1);
                    this.checkedFeeSubjectIds_03 = [];
                    this.distributionSubject.subjectList.forEach((item)=>{
                        this.checkedFeeSubjectIds_03.push(item.feeSubjectId);
                    });
                    this.costTabsContent_03 = this.originCostTabsContent;
                    this.costTabsContent_03.forEach((item)=>{
                        item.metaList.forEach((temp)=>{
                            let pos = this.checkedFeeSubjectIds_03.indexOf(temp.id);
                            if(pos > -1){
                                temp.disabled = true;
                            }else{
                                temp.disabled = false;
                            }
                        })
                    });
                }
            },
            AddSubjectObj(firstFlag){
                let obj = Object.assign({},this.subjectObj);
                if(!firstFlag){
                    let subjectList = [];
                    let temp = false;
                    if(this.activekey==1){
                        subjectList = this.repairSubject.subjectList;
                    }
                    else if(this.activekey==2){
                        subjectList = this.cleanSubject.subjectList;
                    }
                    else if(this.activekey==3){
                        subjectList = this.distributionSubject.subjectList;
                    }
                    subjectList.forEach((item)=>{
                        if(!item.feeSubjectId){
                            temp = true;
                        }
                    });
                    if(temp){
                        this.$message.warning('请完善费用信息');
                        return;
                    }
                    if(this.activekey==1){
                        //获取所有选中费用科目
                        this.checkedFeeSubjectIds_01 = [];
                        subjectList.forEach((item)=>{
                            this.checkedFeeSubjectIds_01.push(item.feeSubjectId);
                        });
                        this.costTabsContent_01 = this.originCostTabsContent;
                        this.costTabsContent_01.forEach((item)=>{
                            item.metaList.forEach((temp)=>{
                                let pos = this.checkedFeeSubjectIds_01.indexOf(temp.id);
                                if(pos > -1){
                                    temp.disabled = true;
                                }
                            })
                        });
                        this.repairSubject.subjectList.push(obj);
                    }
                    else if(this.activekey==2){
                        //获取所有选中费用科目
                        this.checkedFeeSubjectIds_02 = [];
                        subjectList.forEach((item)=>{
                            this.checkedFeeSubjectIds_02.push(item.feeSubjectId);
                        });
                        this.costTabsContent_02 = this.originCostTabsContent;
                        this.costTabsContent_02.forEach((item)=>{
                            item.metaList.forEach((temp)=>{
                                let pos = this.checkedFeeSubjectIds_02.indexOf(temp.id);
                                if(pos > -1){
                                    temp.disabled = true;
                                }
                            })
                        });
                        this.cleanSubject.subjectList.push(obj);
                    }
                    else if(this.activekey==3){
                        //获取所有选中费用科目
                        this.checkedFeeSubjectIds_03 = [];
                        subjectList.forEach((item)=>{
                            this.checkedFeeSubjectIds_03.push(item.feeSubjectId);
                        });
                        this.costTabsContent_03 = this.originCostTabsContent;
                        this.costTabsContent_03.forEach((item)=>{
                            item.metaList.forEach((temp)=>{
                                let pos = this.checkedFeeSubjectIds_03.indexOf(temp.id);
                                if(pos > -1){
                                    temp.disabled = true;
                                }
                            })
                        });
                        this.distributionSubject.subjectList.push(obj);
                    }
                }
                else{
                    if(this.activekey==1){
                        this.checkedFeeSubjectIds_01 = [];
                        this.costTabsContent_01 = this.originCostTabsContent;
                        this.costTabsContent_01.forEach((item)=>{
                            item.metaList.forEach((temp)=>{
                                temp.disabled = false;
                            })
                        })
                        this.repairSubject.subjectList.push(obj);
                    }
                    else if(this.activekey==2){
                        this.checkedFeeSubjectIds_02 = [];
                        this.costTabsContent_02 = this.originCostTabsContent;
                        this.costTabsContent_02.forEach((item)=>{
                            item.metaList.forEach((temp)=>{
                                temp.disabled = false;
                            })
                        })
                        this.cleanSubject.subjectList.push(obj);
                    }
                    else if(this.activekey==3){
                        this.checkedFeeSubjectIds_03 = [];
                        this.costTabsContent_03 = this.originCostTabsContent;
                        this.costTabsContent_03.forEach((item)=>{
                            item.metaList.forEach((temp)=>{
                                temp.disabled = false;
                            })
                        })
                        this.distributionSubject.subjectList.push(obj);
                    }
                }
            },
            initData(val){
                let searchResult = true;
                let searchSubject = true;
                let features = '';
                if(val== 1){
                    searchSubject = false;
                    features = 'default';
                }
                else if(val == 2){
                    searchSubject = true;
                    features = 'subject';
                }
                let moduleMark = 'workorder.repair';
                if(this.activekey == 1){
                    moduleMark = 'workorder.repair';
                }
                else if(this.activekey == 2){
                    moduleMark = 'workorder.clean';
                }
                else if(this.activekey == 3){
                    moduleMark = 'workorder.distribution';
                }
                let parameter = {
                    features:features,
                    moduleMark:moduleMark,
                    storeId:this.storeDeptId,
                };
                this.initDefault(val);
                API.moduleFieldConfigList(parameter).then(res => {
                    if (res.code === '200') {
                        let resultList = res.data;
                        if(val== 1){
                            if(this.activekey==1){
                                this.resultId_01 = '';
                            }
                            else if(this.activekey==2){
                                this.resultId_02 = '';
                            }
                            else if(this.activekey==3){
                                this.resultId_03 = '';
                            }
                        }
                        else if(val == 2){
                            if(this.activekey==1){
                                this.subjectId_01 = '';
                            }
                            else if(this.activekey==2){
                                this.subjectId_02 = '';
                            }
                            else if(this.activekey==3){
                                this.subjectId_03 = '';
                            }
                        }
                        else{
                            if(this.activekey==1){
                                this.resultId_01 = '';
                                this.subjectId_01 = '';
                            }
                            else if(this.activekey==2){
                                this.resultId_02 = '';
                                this.subjectId_02 = '';
                            }
                            else if(this.activekey==3){
                                this.resultId_03 = '';
                                this.subjectId_03 = '';
                            }
                        }
                        if(resultList&&resultList.length>0){
                            resultList.forEach((item)=>{
                                if(item.features == 'default'&&searchResult){
                                    if(this.activekey == 1){
                                        this.repairResult = item.fieldsObj;
                                        this.resultId_01 = item.id;
                                    }
                                    else if(this.activekey == 2){
                                        this.cleanResult = item.fieldsObj;
                                        this.resultId_02 = item.id;
                                    }
                                    else if(this.activekey == 3){
                                        this.distributionResult = item.fieldsObj;
                                        this.resultId_03 = item.id;
                                    }
                                }
                                else if(item.features == 'subject'&&searchSubject){
                                    if(this.activekey == 1){
                                        this.repairSubject = item.fieldsObj;
                                        this.subjectId_01 = item.id;
                                    }
                                    else if(this.activekey == 2){
                                        this.cleanSubject= item.fieldsObj;
                                        this.subjectId_02 = item.id;
                                    }
                                    else if(this.activekey == 3){
                                        this.distributionSubject= item.fieldsObj;
                                        this.subjectId_03 = item.id;
                                    }
                                }
                            });
                        }
                        else{
                            this.resultId_01 = '';
                            this.subjectId_01 = '';
                            this.resultId_02 = '';
                            this.subjectId_02 = '';
                            this.resultId_03 = '';
                            this.subjectId_03 = '';
                        }
                    }
                });
            },
            changeActivekey(val){
                this.activekey = val;
                this.initData();
            },
            saveConfig(val){
                let moduleMark = 'workorder.repair';
                let fieldsObj = {};
                let features = 'default';
                let id = '';
                if(this.activekey == 1){
                    moduleMark = 'workorder.repair';
                    if(val==1){
                        fieldsObj = this.repairResult;
                        features = 'default';
                        id = this.resultId_01;
                    }
                    else if(val==2){
                        fieldsObj = this.repairSubject;
                        features = 'subject';
                        id = this.subjectId_01;
                    }
                }
                else if(this.activekey == 2){
                    moduleMark = 'workorder.clean';
                    if(val==1){
                        fieldsObj = this.cleanResult;
                        features = 'default';
                        id = this.resultId_02;
                    }
                    else if(val==2){
                        fieldsObj = this.cleanSubject;
                        features = 'subject';
                        id = this.subjectId_02;
                    }
                }
                else if(this.activekey == 3){
                    moduleMark = 'workorder.distribution';
                    if(val==1){
                        fieldsObj = this.distributionResult;
                        features = 'default';
                        id = this.resultId_03;
                    }
                    else if(val==2){
                        fieldsObj = this.distributionSubject;
                        features = 'subject';
                        id = this.subjectId_03;
                    }
                }
                let parameter = {
                    features:features,
                    moduleMark:moduleMark,
                    storeId:this.storeDeptId,
                    fieldsObj:fieldsObj,
                };
                if(id) {
                  parameter.id = id;
                }
                this.confirmSaveDialog = true;
                this.data = parameter;
                this.operateType = val;
            },
            defaultConfig(val){
                let id = '';
                if(this.activekey == 1){
                    if(val == 1){
                        id = this.resultId_01;
                    }
                    else if(val==2){
                        id = this.subjectId_01;
                    }
                }
                else if(this.activekey == 2){
                    if(val == 1){
                        id = this.resultId_02;
                    }
                    else if(val==2){
                        id = this.subjectId_02;
                    }
                }
                else if(this.activekey == 3){
                    if(val == 1){
                        id = this.resultId_03;
                    }
                    else if(val==2){
                        id = this.subjectId_03;
                    }
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
    .afterRenter-default-box{
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
                    .margin-top-13{
                        margin-top: 13px;
                    }
                    .margin-top-25{
                        margin-top: 25px;
                    }
                    .table{
                        width: 921px;
                        border-left: 1px solid #EEEEEE;
                        border-top: 1px solid #EEEEEE;
                        font-size: 12px;
                        .table-title{
                            display: flex;
                            //background-color: @themeBgColor;
                            background:rgba(246,247,251,1);
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
                                .house-data-item-left{
                                    height: 46px;
                                    line-height: 46px;
                                }
                                .house-data-item-right{
                                    width: 106px;
                                    height: 45px;
                                    line-height: 45px;
                                    background:#F8F9FA;
                                    .deptStyle{
                                        margin-left: 10px;
                                        color: #777777;
                                        font-size: 12px;
                                        .unSelect{
                                            color: #777777;
                                        }
                                        .selected{
                                            color: #0A87F8;
                                        }
                                        i{
                                            vertical-align: -0.1em;
                                            margin-right: 4px;
                                        }
                                        /deep/ svg{
                                            width: 12px;
                                            height: 12px;
                                        }
                                    }
                                }
                                .delete-icon {
                                    color: red;
                                    font-size: 14px;
                                }
                            }
                            /deep/ .ant-select-selection__rendered{
                                font-size: 12px;
                                margin-left: 0;
                            }
                            /deep/ .ant-select-arrow i{
                            }
                            /deep/ .ant-select-selection__rendered{
                                margin-right: 0;
                            }
                            /deep/ .ant-input{
                                font-size: 12px;
                            }
                            /deep/ .ant-checkbox-inner{
                                width: 12px;
                                height: 12px;
                            }
                            .addonAfterStyle{
                                font-size: 12px;
                                color: #111111;
                                right: 2px;
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
                    .add-subject-style{
                        width: 104px;
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
                .btnStyle{
                    margin: 40px 0 0 0;
                    padding-right: 10px;
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
        .selectStyle{
            /deep/ svg{
                width: 14px;
                height: 14px;
            }
        }
        .delete-icon{
            /deep/ svg{
                width: 14px;
                height: 14px;
            }
        }
        /deep/ .ant-cascader-picker-label{
            padding: 0;
        }
    }
</style>