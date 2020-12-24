<template>
    <div class="afterRenter-decision-box">
        <div class="source">
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">维修服务工单开启验收流程</div>
            </div>
            <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
                ① 开启验收流程后：完成的工单需要验收才算完成；已完成的工单不受影响
            </div>
            <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
                ② 关闭验收流程后：完成工单不需要再次进行验收；已产生待验收的工单不受影响，还是需要验收
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="afterRenter1.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&afterRenter1.onOff==0" @click="changeResrource(afterRenter1,1)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="allCheck f-fl clearfix" v-if="storeDeptId!=firstStoreDeptId&&afterRenter1.onOff==0">
                        <div class="f-fl" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                </div>
                <div class="f-fl" v-if="afterRenter1.onOff==1">
                    <label-item title="" class="selectStyle">
                        <a-select style="width: 170px;height: 24px;" :allowClear="false" placeholder="设置默认值" v-model="afterRenter1.value" :disabled="storeDeptId!=firstStoreDeptId">
                            <a-select-option :value="'0'">不生成账单</a-select-option>
                            <a-select-option :value="'1'">验收时生成账单</a-select-option>
                        </a-select>
                    </label-item>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="afterRenter1.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&afterRenter1.onOff==1" @click="changeResrource(afterRenter1,0)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix" v-if="storeDeptId!=firstStoreDeptId&&afterRenter1.onOff==1">
                        <div class="f-fl" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                </div>
                <div class="f-fl" v-if="afterRenter1.onOff==0">
                    <label-item title="" class="selectStyle">
                        <a-select style="width: 170px;height: 24px;" :allowClear="false" placeholder="设置默认值" v-model="afterRenter1.value" :disabled="storeDeptId!=firstStoreDeptId">
                            <a-select-option :value="'0'">不生成账单</a-select-option>
                            <a-select-option :value="'1'">完成时生成账单</a-select-option>
                        </a-select>
                    </label-item>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(afterRenter1)" v-if="storeDeptId==firstStoreDeptId">
                    保存
                </a-button>
                <div class="formItemMarginButton unClickStyle f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    保存
                </div>
                <div class="warning f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    <a-icon type="exclamation-circle" style="margin-right: 5px;"/>仅支持在总店设置
                </div>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">申请维修工单时，是否必须关联系统内的房源</div>
            </div>
            <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
                ① 可不关联：申请维修工单时，可先不关联房源，录入完成后再关联在房源上
            </div>
            <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
                ② 必须关联：申请维修工单时，必须关联已录入至系统内的房源
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="afterRenter4.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&afterRenter4.onOff==1" @click="changeResrource(afterRenter4,0)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="storeDeptId!=firstStoreDeptId&&afterRenter4.onOff==1" @click="changeResrource(afterRenter4,0)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="afterRenter4.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&afterRenter4.onOff==0" @click="changeResrource(afterRenter4,1)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                    <div class="allCheck clearfix" v-if="storeDeptId!=firstStoreDeptId&&afterRenter4.onOff==0">
                        <div class="f-fl" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(afterRenter4)" v-if="storeDeptId==firstStoreDeptId">
                    保存
                </a-button>
                <div class="formItemMarginButton unClickStyle f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    保存
                </div>
                <div class="warning f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    <a-icon type="exclamation-circle" style="margin-right: 5px;"/>仅支持在总店设置
                </div>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">保洁服务工单开启验收流程</div>
            </div>
            <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
                ① 开启验收流程后：完成的工单需要验收才算完成；已完成的工单不受影响
            </div>
            <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
                ② 关闭验收流程后：完成工单不需要再次进行验收；已产生待验收的工单不受影响，还是需要验收
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="afterRenter2.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&afterRenter2.onOff==0" @click="changeResrource(afterRenter2,1)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="allCheck f-fl clearfix" v-if="storeDeptId!=firstStoreDeptId&&afterRenter2.onOff==0">
                        <div class="f-fl" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                </div>
                <div class="f-fl" v-if="afterRenter2.onOff==1">
                    <label-item title="" class="selectStyle">
                        <a-select style="width: 170px;height: 24px;" :allowClear="false" placeholder="设置默认值" v-model="afterRenter2.value" :disabled="storeDeptId!=firstStoreDeptId">
                            <a-select-option :value="'0'">不生成账单</a-select-option>
                            <a-select-option :value="'1'">验收时生成账单</a-select-option>
                        </a-select>
                    </label-item>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="afterRenter2.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&afterRenter2.onOff==1" @click="changeResrource(afterRenter2,0)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix" v-if="storeDeptId!=firstStoreDeptId&&afterRenter2.onOff==1">
                        <div class="f-fl" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                </div>
                <div class="f-fl" v-if="afterRenter2.onOff==0">
                    <label-item title="" class="selectStyle">
                        <a-select style="width: 170px;height: 24px;" :allowClear="false" placeholder="设置默认值" v-model="afterRenter2.value" :disabled="storeDeptId!=firstStoreDeptId">
                            <a-select-option :value="'0'">不生成账单</a-select-option>
                            <a-select-option :value="'1'">完成时生成账单</a-select-option>
                        </a-select>
                    </label-item>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(afterRenter2)" v-if="storeDeptId==firstStoreDeptId">
                    保存
                </a-button>
                <div class="formItemMarginButton unClickStyle f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    保存
                </div>
                <div class="warning f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    <a-icon type="exclamation-circle" style="margin-right: 5px;"/>仅支持在总店设置
                </div>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">申请保洁工单时，是否必须关联系统内的房源</div>
            </div>
            <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
                ① 可不关联：申请保洁工单时，可先不关联房源，录入完成后再关联在房源上
            </div>
            <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
                ② 必须关联：申请保洁工单时，必须关联已录入至系统内的房源
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="afterRenter5.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&afterRenter5.onOff==1" @click="changeResrource(afterRenter5,0)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                    <div class="allCheck f-fl clearfix" v-if="storeDeptId!=firstStoreDeptId&&afterRenter5.onOff==1">
                        <div class="f-fl" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="afterRenter5.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&afterRenter5.onOff==0" @click="changeResrource(afterRenter5,1)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                    <div class="allCheck clearfix" v-if="storeDeptId!=firstStoreDeptId&&afterRenter5.onOff==0">
                        <div class="f-fl" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(afterRenter5)" v-if="storeDeptId==firstStoreDeptId">
                    保存
                </a-button>
                <div class="formItemMarginButton unClickStyle f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    保存
                </div>
                <div class="warning f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    <a-icon type="exclamation-circle" style="margin-right: 5px;"/>仅支持在总店设置
                </div>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">投诉服务工单开启验收流程</div>
            </div>
            <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
                ① 开启验收流程后：完成的工单需要验收才算完成；已完成的工单不受影响
            </div>
            <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
                ② 关闭验收流程后：完成工单不需要再次进行验收；已产生待验收的工单不受影响，还是需要验收
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="afterRenter3.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&afterRenter3.onOff==0" @click="changeResrource(afterRenter3,1)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="allCheck f-fl clearfix" v-if="storeDeptId!=firstStoreDeptId&&afterRenter3.onOff==0">
                        <div class="f-fl" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="afterRenter3.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&afterRenter3.onOff==1" @click="changeResrource(afterRenter3,0)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix" v-if="storeDeptId!=firstStoreDeptId&&afterRenter3.onOff==1">
                        <div class="f-fl" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(afterRenter3)" v-if="storeDeptId==firstStoreDeptId">
                    保存
                </a-button>
                <div class="formItemMarginButton unClickStyle f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    保存
                </div>
                <div class="warning f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    <a-icon type="exclamation-circle" style="margin-right: 5px;"/>仅支持在总店设置
                </div>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">配货工单是否开启验收流程</div>
            </div>
            <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
                ① 开启验收流程后：完成的工单需要验收才算完成；已完成的工单不受影响
            </div>
            <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
                ② 关闭验收流程后：完成工单不需要再次进行验收；已产生待验收的工单不受影响，还是需要验收
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="afterRenter6.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&afterRenter6.onOff==0" @click="changeResrource(afterRenter6,1)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="allCheck f-fl clearfix" v-if="storeDeptId!=firstStoreDeptId&&afterRenter6.onOff==0">
                        <div class="f-fl" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                </div>
                <div class="f-fl" v-if="afterRenter6.onOff==1">
                    <label-item title="" class="selectStyle">
                        <a-select style="width: 170px;height: 24px;" :allowClear="false" placeholder="设置默认值" v-model="afterRenter6.value" :disabled="storeDeptId!=firstStoreDeptId">
                            <a-select-option :value="'0'">不生成账单</a-select-option>
                            <a-select-option :value="'1'">验收时生成账单</a-select-option>
                        </a-select>
                    </label-item>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="afterRenter6.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&afterRenter6.onOff==1" @click="changeResrource(afterRenter6,0)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix" v-if="storeDeptId!=firstStoreDeptId&&afterRenter6.onOff==1">
                        <div class="f-fl" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                </div>
                <div class="f-fl" v-if="afterRenter6.onOff==0">
                    <label-item title="" class="selectStyle">
                        <a-select style="width: 170px;height: 24px;" :allowClear="false" placeholder="设置默认值" v-model="afterRenter6.value" :disabled="storeDeptId!=firstStoreDeptId">
                            <a-select-option :value="'0'">不生成账单</a-select-option>
                            <a-select-option :value="'1'">完成时生成账单</a-select-option>
                        </a-select>
                    </label-item>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(afterRenter6)" v-if="storeDeptId==firstStoreDeptId">
                    保存
                </a-button>
                <div class="formItemMarginButton unClickStyle f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    保存
                </div>
                <div class="warning f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    <a-icon type="exclamation-circle" style="margin-right: 5px;"/>仅支持在总店设置
                </div>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">申请配货服务时，是否必须关联系统内的房源</div>
            </div>
            <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
                ① 可不关联：申请配货服务时，可先不关联房源，录入完成后再关联在房源上
            </div>
            <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
                ② 必须关联：申请配货服务时，必须关联已录入至系统内的房源
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="afterRenter7.onOff==0" >
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&afterRenter7.onOff==1" @click="changeResrource(afterRenter7,0)">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                    <div class="allCheck f-fl clearfix" v-if="storeDeptId!=firstStoreDeptId&&afterRenter7.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="afterRenter7.onOff==1" >
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&afterRenter7.onOff==0" @click="changeResrource(afterRenter7,1)">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                    <div class="allCheck clearfix" v-if="storeDeptId!=firstStoreDeptId&&afterRenter7.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(afterRenter7)" v-if="storeDeptId==firstStoreDeptId">
                    保存
                </a-button>
                <div class="formItemMarginButton unClickStyle f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    保存
                </div>
                <div class="warning f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    <a-icon type="exclamation-circle" style="margin-right: 5px;"/>仅支持在总店设置
                </div>
            </div>
        </div>
        <a-modal destroyOnClose centered :footer="null" width="520px" :maskClosable="false" v-model="confirmSaveDialog" class="ownModalBorder titDialog" title="提示" @cancel="confirmSaveDialog=false">
          <confirm-save :storeDeptName="storeDeptName" :storeDeptId="storeDeptId" :data="data" @cancelSave="confirmSaveDialog=false" @successSave="successSave"></confirm-save>
        </a-modal>
    </div>
</template>

<script>
    import ConfirmSave from './confirmSave';
    import  * as API from '@/api/decision';
    export default {
        name: "resourceDecision",
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
            firstStoreDeptId:{
                type: String,
            },
        },
        data() {
            return {
                afterRenter1:{},
                afterRenter2:{},
                afterRenter3:{},
                afterRenter4:{},
                afterRenter5:{},
                afterRenter6:{},
                afterRenter7:{},
                afterRenterDefault1:{
                    onOff:false,
                    value:'0',
                    module:'AFTER_RENT',
                    mark:'REPAIR_ACCEPTANCE',
                    bizPoint:'AFTER_RENT_PROCESS',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'维修服务工单开启验收流程',
                },
                afterRenterDefault2:{
                    onOff:false,
                    value:'0',
                    module:'AFTER_RENT',
                    mark:'CLEAN_ACCEPTANCE',
                    bizPoint:'AFTER_RENT_PROCESS',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'保洁服务工单开启验收流程',
                },
                afterRenterDefault3:{
                    onOff:false,
                    value:'0',
                    module:'AFTER_RENT',
                    mark:'COMPLAINT_ACCEPTANCE',
                    bizPoint:'AFTER_RENT_PROCESS',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'投诉服务工单开启验收流程',
                },
                afterRenterDefault4:{
                    onOff:false,
                    value:0,
                    module:'AFTER_RENT',
                    mark:'REPAIR_MUST_RELATED',
                    bizPoint:'AFTER_RENT_PROCESS',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'维修服务工单是否必须关联系统内的房源',
                },
                afterRenterDefault5:{
                    onOff:false,
                    value:0,
                    module:'AFTER_RENT',
                    mark:'CLEAN_MUST_RELATED',
                    bizPoint:'AFTER_RENT_PROCESS',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'保洁服务工单是否必须关联系统内的房源',
                },
                afterRenterDefault6:{
                    onOff:false,
                    value:'0',
                    module:'AFTER_RENT',
                    mark:'DISTRIBUTION_ACCEPTANCE',
                    bizPoint:'AFTER_RENT_PROCESS',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'配货服务工单开启验收流程',
                },
                afterRenterDefault7:{
                    onOff:false,
                    value:0,
                    module:'AFTER_RENT',
                    mark:'DISTRIBUTION_MUST_RELATED',
                    bizPoint:'AFTER_RENT_PROCESS',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'配货服务工单是否必须关联系统内的房源',
                },
                data:{},
                confirmSaveDialog:false,
            }
        },
        created: function () {
            this.initDecisionList();
        },
        methods: {
            successSave(){
              this.confirmSaveDialog = false;
              this.initDecisionList();
            },
            changeResrource(data,val){
                data.onOff = val;
                data.value = '0';
            },
            save(data){
                //开启的带输入框的要求必填值
                if((data.chooseType == 5&&data.onOff==1)||data.chooseType == 1){
                    if(!data.value){
                        this.$message.warning('请输入必填项');
                        return;
                    }
                }
                //设置分店id
                data.storeId = this.storeDeptId;
                this.confirmSaveDialog = true;
                this.data = data;
            },
            initDecisionList(){
                let parameter = {
                    module: 'AFTER_RENT',
                    storeId:this.storeDeptId,
                };
                API.decisionList(parameter).then(res => {
                    if (res.code === '200') {
                        this.afterRenter1 = Object.assign({},this.afterRenterDefault1);
                        this.afterRenter2 = Object.assign({},this.afterRenterDefault2);
                        this.afterRenter3 = Object.assign({},this.afterRenterDefault3);
                        this.afterRenter4 = Object.assign({},this.afterRenterDefault4);
                        this.afterRenter5 = Object.assign({},this.afterRenterDefault5);
                        this.afterRenter6 = Object.assign({},this.afterRenterDefault6);
                        this.afterRenter7 = Object.assign({},this.afterRenterDefault7);
                        if(res.data && res.data.length > 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                //租后相关
                                if(res.data[i].mark == 'REPAIR_ACCEPTANCE'){
                                    this.afterRenter1 = res.data[i];
                                }
                                else if(res.data[i].mark == 'CLEAN_ACCEPTANCE'){
                                    this.afterRenter2 = res.data[i];
                                }
                                else if(res.data[i].mark == 'COMPLAINT_ACCEPTANCE'){
                                    this.afterRenter3 = res.data[i];
                                }
                                else if(res.data[i].mark == 'REPAIR_MUST_RELATED'){
                                    this.afterRenter4 = res.data[i];
                                }
                                else if(res.data[i].mark == 'CLEAN_MUST_RELATED'){
                                    this.afterRenter5 = res.data[i];
                                }
                                else if(res.data[i].mark == 'DISTRIBUTION_ACCEPTANCE'){
                                    this.afterRenter6 = res.data[i];
                                }
                                else if(res.data[i].mark == 'DISTRIBUTION_MUST_RELATED'){
                                    this.afterRenter7 = res.data[i];
                                }
                            }
                        }
                    }
                });
            },
        },
        watch:{
            storeDeptId() {
                this.initDecisionList();
            },
        },
    }
</script>

<style scoped lang="less">
    .source{
        .title{
            width: 100%;
            .blueStyle{
                width:4px;
                height:16px;
                background:rgba(10,135,248,1);
                border-radius:2px;
            }
            .titleFont{
                height:16px;
                line-height: 16px;
                font-size:16px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:#111111;
                margin-left: 10px;
            }
        }
        .describe{
            margin: 10px 20px 0 14px;
            padding-left: 5px;
            height:34px;
            line-height: 34px;
            background:rgba(247,248,251,1);
            color: #777777;
        }
        .checkBox{
            margin: 11px 0 0 14px;
            .allCheck{
                height: 30px;
                line-height: 30px;
            }
            .checked{
                color: #0A87F8;
                .iconSize{
                    width: 16px;
                    height: 16px;
                }
            }
            .unEditStyle{
                color: #BBBBBB !important;
            }
            .fontStyle{
                margin-left: 8px;
                height:30px;
                font-size:14px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:#111111;
                line-height:30px;
            }
            .inputStyleDiv {
                margin-left: 15px;
                font-size: 12px;
                .mustFill{
                    color:#FB4246;
                    margin-left: 4px;
                }
            }
            .inputStyle {
                width: 56px;
                height: 24px;
            }
            .margin50{
                margin-left: 50px;
            }
            /deep/ .ant-input{
                padding: 4px 5px;
                font-size: 12px;
            }
        }
        .saveButton{
            margin: 20px 0 20px 14px;
            .formItemMarginButton{
                width:100px;
                height:28px;
                background:rgba(10,135,248,1);
                border-radius:4px;
                color: #FFFFFF;
            }
            .unClickStyle{
                background:#DDDDDD !important;
                color: #FFFFFF;
                border:none;
                text-align: center;
                height: 28px;
                line-height: 28px;
            }
            .warning{
                height: 28px;
                line-height: 28px;
                color: #FFA036;
                font-size: 12px;
                margin-left: 13px;
                svg{
                    width: 14px;
                    height: 14px;
                }
            }
        }
        .line{
            margin: 0 20px 20px 14px;
            height:1px;
            border: 1px dashed #DDDDDD;
        }
        .selectStyle{
            margin-left: 12px;
            /deep/ i{
                width: 14px;
                height: 14px;
            }
            /deep/ svg{
                width: 14px;
                height: 14px;
            }
        }
    }
</style>