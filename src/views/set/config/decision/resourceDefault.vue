<template>
    <div class="resource-default-box">
        <div class="header clearfix">
            <div class="item left-item cursor f-fl" :class="activekey==1?'active-item':'not-active-item not-left-active-item'" @click="changeActivekey(1)">租客线索</div>
            <div class="item right-item cursor f-fl" :class="activekey==2?'active-item':'not-active-item not-right-active-item'" @click="changeActivekey(2)">业主线索</div>
        </div>
        <div v-if="activekey==1" class="content">
            <div class="bigTitle">添加租客线索默认字段配置</div>
            <div class="content-content">
                <div class="title">基本信息</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">姓名</span><span class="mustFill">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                                <div class="man-style cursor" :class="result.gender.default==1?'selected':'noSelected'" @click="result.gender.default=1">先生</div>
                                <div class="woman-style cursor" :class="result.gender.default==2?'selected':'noSelected'" @click="result.gender.default=2">女士</div>
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
                        <div class="left">
                            <div class="left-top"><span  class="name">微信/QQ/其它</span><span class="mustFill" v-if="result.socialAccount.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result.socialAccount.required==0" @click="result.socialAccount.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result.socialAccount.required==1" @click="result.socialAccount.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13" style="margin-right: 0">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">来源</span><span class="mustFill" v-if="result.sourceChannelId.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle">
                                <a-select style="width: 170px;height: 34px;" placeholder="设置默认值" v-model="result.sourceChannelId.default" :allowClear="true" v-if="sourceChannelList&&sourceChannelList.length>0">
                                    <a-select-option v-for="(item) in sourceChannelList" :key="item.id">
                                        {{ item.name }}
                                    </a-select-option>
                                </a-select>
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result.sourceChannelId.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result.sourceChannelId.unEditable==0&&result.sourceChannelId.required==0" @click="result.sourceChannelId.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result.sourceChannelId.unEditable==0&&result.sourceChannelId.required==1" @click="result.sourceChannelId.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont secondLine margin-top-3" v-if="!result.sourceChannelId.default" style="color: #999999"><icon-font style="color: #DDDDDD;margin-right: 2px;" type="icondanxuan-bukexuan" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result.sourceChannelId.default&&result.sourceChannelId.unEditable==0" @click="result.sourceChannelId.unEditable=1;result.sourceChannelId.required=1;"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result.sourceChannelId.default&&result.sourceChannelId.unEditable==1" @click="result.sourceChannelId.unEditable=0;"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                        </div>
                    </div>
                </div>
                <div class="title" style="margin-top: 30px;">需求信息</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">紧急程度</span><span class="mustFill" v-if="result.urgencyLevel.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle">
                                <a-select style="width: 170px;height: 34px;" placeholder="设置默认值" v-model="result.urgencyLevel.default" :allowClear="true" v-if="urgencyLevelList&&urgencyLevelList.length>0">
                                    <a-select-option v-for="(item) in urgencyLevelList" :key="item.id">
                                        {{ item.name }}
                                    </a-select-option>
                                </a-select>
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result.urgencyLevel.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result.urgencyLevel.unEditable==0&&result.urgencyLevel.required==0" @click="result.urgencyLevel.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result.urgencyLevel.unEditable==0&&result.urgencyLevel.required==1" @click="result.urgencyLevel.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont secondLine margin-top-3" v-if="!result.urgencyLevel.default" style="color: #999999"><icon-font style="color: #DDDDDD;margin-right: 2px;" type="icondanxuan-bukexuan" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result.urgencyLevel.default&&result.urgencyLevel.unEditable==0" @click="result.urgencyLevel.unEditable=1;result.urgencyLevel.required=1;"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result.urgencyLevel.default&&result.urgencyLevel.unEditable==1" @click="result.urgencyLevel.unEditable=0;"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">预计入住周期</span><span class="mustFill" v-if="result.leasePeriod.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle">
                                <a-select style="width: 170px;height: 34px;" placeholder="设置默认值" v-model="result.leasePeriod.default" :allowClear="true" v-if="leasePeriodList&&leasePeriodList.length>0">
                                    <a-select-option v-for="(item) in leasePeriodList" :key="item.id">
                                        {{ item.name }}
                                    </a-select-option>
                                </a-select>
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result.leasePeriod.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result.leasePeriod.unEditable==0&&result.leasePeriod.required==0" @click="result.leasePeriod.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result.leasePeriod.unEditable==0&&result.leasePeriod.required==1" @click="result.leasePeriod.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont secondLine margin-top-3" v-if="!result.leasePeriod.default" style="color: #999999"><icon-font style="color: #DDDDDD;margin-right: 2px;" type="icondanxuan-bukexuan" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result.leasePeriod.default&&result.leasePeriod.unEditable==0" @click="result.leasePeriod.unEditable=1;result.leasePeriod.required=1;"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result.leasePeriod.default&&result.leasePeriod.unEditable==1" @click="result.leasePeriod.unEditable=0;"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">意向租房位置</span><span class="mustFill" v-if="result.cityId.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle">
                                <a-select style="width: 170px;height: 34px;" placeholder="设置默认值" :allowClear="true" v-model="result.cityId.default" v-if="cityList&&cityList.length>0">
                                    <a-select-option v-for="(item) in cityList" :key="item.id">
                                        {{ item.name }}
                                    </a-select-option>
                                </a-select>
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="result.cityId.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result.cityId.unEditable==0&&result.cityId.required==0" @click="result.cityId.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result.cityId.unEditable==0&&result.cityId.required==1" @click="result.cityId.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont secondLine margin-top-3" v-if="!result.cityId.default" style="color: #999999"><icon-font style="color: #DDDDDD;margin-right: 2px;" type="icondanxuan-bukexuan" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result.cityId.default&&result.cityId.unEditable==0" @click="result.cityId.unEditable=1;result.cityId.required=1;"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="result.cityId.default&&result.cityId.unEditable==1" @click="result.cityId.unEditable=0;"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">可接受租金范围</span><span class="mustFill" v-if="result.acceptMoney.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result.acceptMoney.required==0" @click="result.acceptMoney.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result.acceptMoney.required==1" @click="result.acceptMoney.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">需求户型</span><span class="mustFill" v-if="result.demandType.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result.demandType.required==0" @click="result.demandType.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result.demandType.required==1" @click="result.demandType.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">其他需求</span><span class="mustFill" v-if="result.otherDemandType.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result.otherDemandType.required==0" @click="result.otherDemandType.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result.otherDemandType.required==1" @click="result.otherDemandType.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">备注</span><span class="mustFill" v-if="result.comment.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="result.comment.required==0" @click="result.comment.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="result.comment.required==1" @click="result.comment.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="btnStyle" style="padding-right: 10px;">
                    <div class="warning"><a-icon type="exclamation-circle" style="margin-right: 5px;"/>保存成功后，该门店下的员工录入租客线索，按照配置好的信息来录入</div>
                    <a-button class="cancel cursor" @click="defaultConfig(1)">恢复默认配置</a-button>
                    <a-button class="sure cursor" @click="saveConfig(1)" :loading="saveLoading">确定</a-button>
                </div>
            </div>
        </div>
        <div v-if="activekey==1" class="content" style="margin-top: 30px;">
          <div class="bigTitle">设置出房部门</div>
          <div class="content-content">
            <div class="selectDeptStyle">
              <label-item class="u-bottom-border" title="指定出房部门">
                <a-tree-select
                    show-search
                    labelInValue
                    style="width: 600px"
                    :value="deptValue"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    placeholder="请选择部门"
                    allow-clear
                    multiple :treeData="deptData"
                    treeNodeFilterProp="title"
                    tree-default-expand-all
                    @change="onChange"
                    @search="onSearch"
                    @select="onSelect"
                >
                </a-tree-select>
              </label-item>
            </div>
            <div class="btnStyle" style="padding-right: 10px;">
              <div class="warning"><a-icon type="exclamation-circle" style="margin-right: 5px;"/>保存成功后，此门店下的租客线索指派时，默认读取配置好的出房部门管家</div>
              <a-button class="cancel cursor" @click="defaultConfig(2)">恢复默认配置</a-button>
              <a-button class="sure cursor" @click="saveConfig(2)" :loading="saveLoading_dept">确定</a-button>
            </div>
          </div>
        </div>
        <div v-if="activekey==2" class="content">
            <div class="bigTitle">添加业主线索默认字段配置</div>
            <div class="content-content">
                <div class="title">基本信息</div>
                <div class="basicsInfo">
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">姓名</span><span class="mustFill">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                                <div class="man-style cursor" :class="ownerResult.gender.default==1?'selected':'noSelected'" @click="ownerResult.gender.default=1">先生</div>
                                <div class="woman-style cursor" :class="ownerResult.gender.default==2?'selected':'noSelected'" @click="ownerResult.gender.default=2">女士</div>
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
                        <div class="left">
                            <div class="left-top"><span  class="name">微信/QQ/其它</span><span class="mustFill" v-if="ownerResult.socialAccount.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="ownerResult.socialAccount.required==0" @click="ownerResult.socialAccount.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="ownerResult.socialAccount.required==1" @click="ownerResult.socialAccount.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">来源</span><span class="mustFill" v-if="ownerResult.sourceChannelId.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle">
                                <a-select style="width: 170px;height: 34px;" placeholder="设置默认值" :allowClear="true" v-model="ownerResult.sourceChannelId.default" v-if="sourceChannelList&&sourceChannelList.length>0">
                                    <a-select-option v-for="(item) in sourceChannelList" :key="item.id">
                                        {{ item.name }}
                                    </a-select-option>
                                </a-select>
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="ownerResult.sourceChannelId.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="ownerResult.sourceChannelId.unEditable==0&&ownerResult.sourceChannelId.required==0" @click="ownerResult.sourceChannelId.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="ownerResult.sourceChannelId.unEditable==0&&ownerResult.sourceChannelId.required==1" @click="ownerResult.sourceChannelId.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont secondLine margin-top-3" v-if="!ownerResult.sourceChannelId.default" style="color: #999999"><icon-font style="color: #DDDDDD;margin-right: 2px;" type="icondanxuan-bukexuan" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="ownerResult.sourceChannelId.default&&ownerResult.sourceChannelId.unEditable==0" @click="ownerResult.sourceChannelId.unEditable=1;ownerResult.sourceChannelId.required=1;"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="ownerResult.sourceChannelId.default&&ownerResult.sourceChannelId.unEditable==1" @click="ownerResult.sourceChannelId.unEditable=0;"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left blankBg bottomBlankBg">
                            <div class="left-top"><span  class="name">紧急程度</span><span class="mustFill" v-if="ownerResult.urgencyLevel.required==1">*</span></div>
                            <label-item title="" class="u-no-border deptStyle">
                                <a-select style="width: 170px;height: 34px;" placeholder="设置默认值" v-model="ownerResult.urgencyLevel.default" v-if="ownerUrgencyLevelList&&ownerUrgencyLevelList.length>0">
                                    <a-select-option v-for="(item) in ownerUrgencyLevelList" :key="item.id">
                                        {{ item.name }}
                                    </a-select-option>
                                </a-select>
                            </label-item>
                        </div>
                        <div class="right">
                            <div class="mustFillFont" v-if="ownerResult.urgencyLevel.unEditable==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="ownerResult.urgencyLevel.unEditable==0&&ownerResult.urgencyLevel.required==0" @click="ownerResult.urgencyLevel.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="ownerResult.urgencyLevel.unEditable==0&&ownerResult.urgencyLevel.required==1" @click="ownerResult.urgencyLevel.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            <div class="mustFillFont secondLine margin-top-3" v-if="!ownerResult.urgencyLevel.default" style="color: #999999"><icon-font style="color: #DDDDDD;margin-right: 2px;" type="icondanxuan-bukexuan" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="ownerResult.urgencyLevel.default&&ownerResult.urgencyLevel.unEditable==0" @click="ownerResult.urgencyLevel.unEditable=1;ownerResult.urgencyLevel.required=1;"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />不可修改</div>
                            <div class="mustFillFont secondLine margin-top-3 cursor" v-if="ownerResult.urgencyLevel.default&&ownerResult.urgencyLevel.unEditable==1" @click="ownerResult.urgencyLevel.unEditable=0;"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />不可修改</div>
                        </div>
                    </div>
                    <div class="item margin-top-13">
                        <div class="left">
                            <div class="left-top"><span  class="name">备注</span><span class="mustFill" v-if="ownerResult.comment.required==1">*</span></div>
                            <div class="left-bottom">
                                不支持设置默认值
                            </div>
                        </div>
                        <div class="right">
                            <div class="mustFillFont cursor" v-if="ownerResult.comment.required==0" @click="ownerResult.comment.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                            <div class="mustFillFont cursor" v-if="ownerResult.comment.required==1" @click="ownerResult.comment.required=0"><icon-font class="editStyle selectStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                        </div>
                    </div>
                </div>
                <div class="title" style="margin-top: 30px;">委托信息</div>
                <div class="basicsInfo">
                    <div class="table" style="margin-top: 13px;">
                        <div class="table-title">
                            <div style="width: 130px;text-align: left;padding-left: 9px;background: #EEF1FB;color: #111111;">单套房源信息配置</div>
                            <div style="max-width: 94px;padding-left: 9px">房源所属城市<span class="mustFill" v-if="ownerResult.deCentralizedHouse.cityId.required==1">*</span></div>
                            <div style="max-width: 90px;padding-left: 9px">房源地址<span class="mustFill" v-if="ownerResult.deCentralizedHouse.fullAddress.required==1">*</span></div>
                            <div style="max-width: 78px;padding-left: 9px">装修状况<span class="mustFill" v-if="ownerResult.deCentralizedHouse.decorationType.required==1">*</span></div>
                            <div style="max-width: 60px;padding-left: 9px">室<span class="mustFill" v-if="ownerResult.deCentralizedHouse.room.required==1">*</span></div>
                            <div style="max-width: 60px;padding-left: 9px">厅<span class="mustFill" v-if="ownerResult.deCentralizedHouse.livingRoom.required==1">*</span></div>
                            <div style="max-width: 60px;padding-left: 9px">厨<span class="mustFill" v-if="ownerResult.deCentralizedHouse.kitchen.required==1">*</span></div>
                            <div style="max-width: 60px;padding-left: 9px">卫<span class="mustFill" v-if="ownerResult.deCentralizedHouse.toilet.required==1">*</span></div>
                            <div style="max-width: 70px;padding-left: 9px">面积<span class="mustFill" v-if="ownerResult.deCentralizedHouse.area.required==1">*</span></div>
                            <div style="max-width: 78px;padding-left: 9px">期望租金<span class="mustFill" v-if="ownerResult.deCentralizedHouse.price.required==1">*</span></div>
                            <div style="max-width: 66px;padding-left: 9px">委托年限<span class="mustFill" v-if="ownerResult.deCentralizedHouse.leasePeriod.required==1">*</span></div>
                            <div style="max-width: 102px;padding-left: 9px">是否接受免租期<span class="mustFill" v-if="ownerResult.deCentralizedHouse.isFree.required==1">*</span></div>
                            <div style="max-width: 110px;padding-left: 9px">房源图片<span class="mustFill" v-if="ownerResult.deCentralizedHouse.picList.required==1">*</span></div>
                        </div>
                        <div class="house-data u-no-border ">
                            <div style="width: 130px;padding-left: 9px;background: #F4F4F4;color: #777777">
                                默认值设置
                            </div>
                            <div style="max-width: 94px;padding-left: 9px;">
                                <label-item title="" class="u-no-border deptStyle">
                                    <a-select style="width: 80px;height: 34px;" placeholder="设置" :allowClear="true" v-model="ownerResult.deCentralizedHouse.cityId.default" v-if="cityList&&cityList.length>0">
                                        <a-select-option v-for="(item) in cityList" :key="item.id">
                                            {{ item.name }}
                                        </a-select-option>
                                    </a-select>
                                </label-item>
                            </div>
                            <div style="max-width: 90px;text-align: left;padding-left: 9px;background: #FAFAFA;color: #BBBBBB;font-size: 14px;">
                                不支持设置
                            </div>
                            <div style="max-width: 78px;text-align: left;padding-left: 9px;">
                                <label-item title="" class="u-no-border deptStyle">
                                    <a-select style="width: 68px;height: 34px;" placeholder="设置" :allowClear="true" v-model="ownerResult.deCentralizedHouse.decorationType.default" v-if="cityList&&cityList.length>0">
                                        <a-select-option :value="2">精装</a-select-option>
                                        <a-select-option :value="4">毛坯</a-select-option>
                                        <a-select-option :value="3">简装</a-select-option>
                                        <a-select-option :value="1">豪华装</a-select-option>
                                    </a-select>
                                </label-item>
                            </div>
                            <div style="max-width: 60px;text-align: left;padding-left: 9px;">
                                <a-input v-model="ownerResult.deCentralizedHouse.room.default" v-validate="'naturalNum|min(1)'" placeholder="设置" />
                            </div>
                            <div style="max-width: 60px;text-align: left;padding-left: 9px;">
                                <a-input v-model="ownerResult.deCentralizedHouse.livingRoom.default" v-validate="'naturalNum'" placeholder="设置" />
                            </div>
                            <div style="max-width: 60px;text-align: left;padding-left: 9px;">
                                <a-input v-model="ownerResult.deCentralizedHouse.kitchen.default" v-validate="'naturalNum'" placeholder="设置" />
                            </div>
                            <div style="max-width: 60px;text-align: left;padding-left: 9px;">
                                <a-input v-model="ownerResult.deCentralizedHouse.toilet.default" v-validate="'naturalNum'" placeholder="设置" />
                            </div>
                            <div style="max-width: 70px;padding-left: 9px;">
                                <a-input style="width: 45px" v-model="ownerResult.deCentralizedHouse.area.default" v-validate="'area'" placeholder="设置"/><span class="addonAfterStyle">㎡</span>
                            </div>
                            <div style="max-width: 78px;padding-left: 9px">
                                <a-input style="width: 53px" v-model="ownerResult.deCentralizedHouse.price.default" v-validate="'moneyNoDot'" placeholder="设置" /><span class="addonAfterStyle">元</span>
                            </div>
                            <div style="max-width: 66px;padding-left: 9px">
                                <a-input style="width: 41px" v-model="ownerResult.deCentralizedHouse.leasePeriod.default" v-validate="'naturalNum|min(1)'" placeholder="设置" /><span class="addonAfterStyle">年</span>
                            </div>
                            <div style="max-width: 102px;padding-left: 9px">
                                <a-checkbox v-model="ownerResult.deCentralizedHouse.isFree.default" @change="(value)=>changeIsFree(value)"><span style="color: #111111;font-size: 12px;">接受</span></a-checkbox>
                            </div>
                            <div style="max-width: 110px;padding-left: 9px">
                                <a-input style="width: 80px" v-model="ownerResult.deCentralizedHouse.picList.default" v-validate="'naturalNum|min(1)|max(9)'" placeholder="最多上传张数" /><span class="addonAfterStyle">张</span>
                            </div>
                        </div>
                        <div class="house-data u-no-border ">
                            <div style="width: 130px;padding-left: 9px;background: #F4F4F4;color: #777777">
                                是否必填
                            </div>
                            <div class="mustFillStyle" style="max-width: 94px;padding-left: 9px;">
                                <div class="mustFillFont" v-if="ownerResult.deCentralizedHouse.cityId.required==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                            <div class="mustFillStyle" style="max-width: 90px;text-align: left;padding-left: 9px;">
                                <div class="mustFillFont" v-if="ownerResult.deCentralizedHouse.fullAddress.required==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                            <div class="mustFillStyle" style="max-width: 78px;text-align: left;padding-left: 9px;">
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.decorationType.required==0" @click="ownerResult.deCentralizedHouse.decorationType.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.decorationType.required==1" @click="ownerResult.deCentralizedHouse.decorationType.required=0"><icon-font class="selectStyle editStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                            <div class="mustFillStyle" style="max-width: 60px;text-align: left;padding-left: 9px;">
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.room.required==0" @click="ownerResult.deCentralizedHouse.room.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.room.required==1" @click="ownerResult.deCentralizedHouse.room.required=0"><icon-font class="selectStyle editStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                            <div class="mustFillStyle" style="max-width: 60px;text-align: left;padding-left: 9px;">
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.livingRoom.required==0" @click="ownerResult.deCentralizedHouse.livingRoom.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.livingRoom.required==1" @click="ownerResult.deCentralizedHouse.livingRoom.required=0"><icon-font class="selectStyle editStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                            <div class="mustFillStyle" style="max-width: 60px;text-align: left;padding-left: 9px;">
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.kitchen.required==0" @click="ownerResult.deCentralizedHouse.kitchen.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.kitchen.required==1" @click="ownerResult.deCentralizedHouse.kitchen.required=0"><icon-font class="selectStyle editStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                            <div class="mustFillStyle" style="max-width: 60px;text-align: left;padding-left: 9px;">
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.toilet.required==0" @click="ownerResult.deCentralizedHouse.toilet.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.toilet.required==1" @click="ownerResult.deCentralizedHouse.toilet.required=0"><icon-font class="selectStyle editStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                            <div class="mustFillStyle" style="max-width: 70px;padding-left: 9px">
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.area.required==0" @click="ownerResult.deCentralizedHouse.area.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.area.required==1" @click="ownerResult.deCentralizedHouse.area.required=0"><icon-font class="selectStyle editStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                            <div class="mustFillStyle" style="max-width: 78px;padding-left: 9px">
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.price.required==0" @click="ownerResult.deCentralizedHouse.price.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.price.required==1" @click="ownerResult.deCentralizedHouse.price.required=0"><icon-font class="selectStyle editStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                            <div class="mustFillStyle" style="max-width: 66px;padding-left: 9px">
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.leasePeriod.required==0" @click="ownerResult.deCentralizedHouse.leasePeriod.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.leasePeriod.required==1" @click="ownerResult.deCentralizedHouse.leasePeriod.required=0"><icon-font class="selectStyle editStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                            <div class="mustFillStyle" style="max-width: 102px;padding-left: 9px">
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.isFree.required==0" @click="ownerResult.deCentralizedHouse.isFree.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.isFree.required==1" @click="ownerResult.deCentralizedHouse.isFree.required=0"><icon-font class="selectStyle editStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                            <div class="mustFillStyle" style="max-width: 110px;padding-left: 9px">
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.picList.required==0" @click="ownerResult.deCentralizedHouse.picList.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                                <div class="mustFillFont cursor" v-if="ownerResult.deCentralizedHouse.picList.required==1" @click="ownerResult.deCentralizedHouse.picList.required=0"><icon-font class="selectStyle editStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                        </div>
                    </div>
                    <div class="table" style="margin-top: 25px;">
                        <div class="table-title">
                            <div style="width: 130px;text-align: left;padding-left: 9px;background: #EEF1FB;color: #111111;">独栋(集中)信息配置</div>
                            <div style="max-width: 123px;padding-left: 9px">项目所属城市<span class="mustFill" v-if="ownerResult.centralizedHouse.cityId.required==1">*</span></div>
                            <div style="max-width: 128px;padding-left: 9px">项目地址<span class="mustFill" v-if="ownerResult.centralizedHouse.fullAddress.required==1">*</span></div>
                            <div style="max-width: 116px;padding-left: 9px">房型数量<span class="mustFill" v-if="ownerResult.centralizedHouse.roomTypeQuantity.required==1">*</span></div>
                            <div style="max-width: 116px;padding-left: 9px">房间数量<span class="mustFill" v-if="ownerResult.centralizedHouse.roomQuantity.required==1">*</span></div>
                            <div style="max-width: 108px;padding-left: 9px">期望价格<span class="mustFill" v-if="ownerResult.centralizedHouse.price.required==1">*</span></div>
                            <div style="max-width: 120px;padding-left: 9px">委托年限<span class="mustFill" v-if="ownerResult.centralizedHouse.leasePeriod.required==1">*</span></div>
                            <div style="width: 242px;padding-left: 9px">项目图片<span class="mustFill" v-if="ownerResult.centralizedHouse.picList.required==1">*</span></div>
                        </div>
                        <div class="house-data u-no-border ">
                            <div style="width: 130px;padding-left: 9px;background: #F4F4F4;color: #777777">
                                默认值设置
                            </div>
                            <div style="max-width: 123px;padding-left: 9px;">
                                <label-item title="" class="u-no-border deptStyle">
                                    <a-select style="width: 110px;height: 34px;" placeholder="设置" :allowClear="true" v-model="ownerResult.centralizedHouse.cityId.default" v-if="cityList&&cityList.length>0">
                                        <a-select-option v-for="(item) in cityList" :key="item.id">
                                            {{ item.name }}
                                        </a-select-option>
                                    </a-select>
                                </label-item>
                            </div>
                            <div style="max-width: 128px;text-align: left;padding-left: 9px;background: #FAFAFA;color: #BBBBBB;font-size: 14px;">
                                不支持设置
                            </div>
                            <div style="max-width: 116px;padding-left: 9px;">
                                <a-input style="width: 90px" v-model="ownerResult.centralizedHouse.roomTypeQuantity.default" v-validate="'naturalNum|min(1)'" placeholder="设置"/><span class="addonAfterStyle">个</span>
                            </div>
                            <div style="max-width: 116px;padding-left: 9px;">
                                <a-input style="width: 90px" v-model="ownerResult.centralizedHouse.roomQuantity.default" v-validate="'naturalNum|min(1)'" placeholder="设置"/><span class="addonAfterStyle">个</span>
                            </div>
                            <div style="max-width: 108px;padding-left: 9px">
                                <a-input style="width: 83px" v-model="ownerResult.centralizedHouse.price.default" v-validate="'moneyNoDot'" placeholder="设置" /><span class="addonAfterStyle">元</span>
                            </div>
                            <div style="max-width: 120px;padding-left: 9px">
                                <a-input style="width: 90px" v-model="ownerResult.centralizedHouse.leasePeriod.default" v-validate="'naturalNum|min(1)'" placeholder="设置" /><span class="addonAfterStyle">年</span>
                            </div>
                            <div style="max-width: 242px;padding-left: 9px">
                                <a-input style="width: 138px" v-model="ownerResult.centralizedHouse.picList.default" placeholder="最多上传张数" v-validate="'naturalNum|min(1)|max(9)'"/><span class="addonAfterStyle">张</span>
                            </div>
                        </div>
                        <div class="house-data u-no-border ">
                            <div style="width: 130px;padding-left: 9px;background: #F4F4F4;color: #777777">
                                是否必填
                            </div>
                            <div class="mustFillStyle" style="max-width: 123px;padding-left: 9px;">
                                <div class="mustFillFont" v-if="ownerResult.centralizedHouse.cityId.required==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                            <div class="mustFillStyle" style="max-width: 128px;text-align: left;padding-left: 9px;">
                                <div class="mustFillFont" v-if="ownerResult.centralizedHouse.fullAddress.required==1"><icon-font class="unEditStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                            <div class="mustFillStyle" style="max-width: 116px;text-align: left;padding-left: 9px;">
                                <div class="mustFillFont cursor" v-if="ownerResult.centralizedHouse.roomTypeQuantity.required==0" @click="ownerResult.centralizedHouse.roomTypeQuantity.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                                <div class="mustFillFont cursor" v-if="ownerResult.centralizedHouse.roomTypeQuantity.required==1" @click="ownerResult.centralizedHouse.roomTypeQuantity.required=0"><icon-font class="selectStyle editStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                            <div class="mustFillStyle" style="max-width: 116px;text-align: left;padding-left: 9px;">
                                <div class="mustFillFont cursor" v-if="ownerResult.centralizedHouse.roomQuantity.required==0" @click="ownerResult.centralizedHouse.roomQuantity.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                                <div class="mustFillFont cursor" v-if="ownerResult.centralizedHouse.roomQuantity.required==1" @click="ownerResult.centralizedHouse.roomQuantity.required=0"><icon-font class="selectStyle editStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                            <div class="mustFillStyle" style="max-width: 108px;padding-left: 9px">
                                <div class="mustFillFont cursor" v-if="ownerResult.centralizedHouse.price.required==0" @click="ownerResult.centralizedHouse.price.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                                <div class="mustFillFont cursor" v-if="ownerResult.centralizedHouse.price.required==1" @click="ownerResult.centralizedHouse.price.required=0"><icon-font class="selectStyle editStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                            <div class="mustFillStyle" style="max-width: 120px;padding-left: 9px">
                                <div class="mustFillFont cursor" v-if="ownerResult.centralizedHouse.leasePeriod.required==0" @click="ownerResult.centralizedHouse.leasePeriod.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                                <div class="mustFillFont cursor" v-if="ownerResult.centralizedHouse.leasePeriod.required==1" @click="ownerResult.centralizedHouse.leasePeriod.required=0"><icon-font class="selectStyle editStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                            <div class="mustFillStyle" style="max-width: 242px;padding-left: 9px">
                                <div class="mustFillFont cursor" v-if="ownerResult.centralizedHouse.picList.required==0" @click="ownerResult.centralizedHouse.picList.required=1"><icon-font class="editStyle" type="iconyumengtubiao_danxuan-weixuanze" />必填</div>
                                <div class="mustFillFont cursor" v-if="ownerResult.centralizedHouse.picList.required==1" @click="ownerResult.centralizedHouse.picList.required=0"><icon-font class="selectStyle editStyle" type="iconyumengtubiao_danxuan-yixuanze" />必填</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btnStyle">
                    <div class="warning"><a-icon type="exclamation-circle" style="margin-right: 5px;"/>保存成功后，该门店下的员工录入业主线索，按照配置好的信息来录入</div>
                    <a-button class="cancel cursor" @click="defaultConfig(1)">恢复默认配置</a-button>
                    <a-button class="sure cursor" @click="saveConfig(1)" :loading="saveLoading">确定</a-button>
                </div>
            </div>
        </div>
        <div v-if="activekey==2" class="content" style="margin-top: 30px;">
          <div class="bigTitle">设置收房部门</div>
          <div class="content-content">
            <div class="selectDeptStyle">
              <label-item class="u-bottom-border" title="指定收房部门">
                <a-tree-select
                    show-search
                    labelInValue
                    style="width: 600px"
                    :value="deptValue"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    placeholder="请选择部门"
                    allow-clear
                    multiple :treeData="deptData"
                    tree-default-expand-all
                    @change="onChange"
                    @search="onSearch"
                    @select="onSelect"
                    treeNodeFilterProp="title"
                >
                </a-tree-select>
              </label-item>
            </div>
            <div class="btnStyle" style="padding-right: 10px;">
              <div class="warning"><a-icon type="exclamation-circle" style="margin-right: 5px;"/>保存成功后，此门店下的租客线索指派时，默认读取配置好的出房部门管家</div>
              <a-button class="cancel cursor" @click="defaultConfig(2)">恢复默认配置</a-button>
              <a-button class="sure cursor" @click="saveConfig(2)" :loading="saveLoading_dept">确定</a-button>
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
    import {getSourceChannel} from '@/api/source';
    import {getCityList,getAuthDeptTree} from '@/api/public';
    import  * as API from '@/api/decision'
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
                activekey:1,        //1、租客线索；2、业主线索
                result:{
                    gender:{
                        default:1,      //1、男；2、女
                    },
                    socialAccount:{
                        required:0,     //是否必填
                    },
                    sourceChannelId:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:undefined,     //初始值
                    },
                    urgencyLevel:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:undefined,     //初始值
                    },
                    leasePeriod:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改 1、不可修改；0、可修改
                        default:undefined,     //初始值
                    },
                    cityId:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:undefined,     //初始值
                    },
                    acceptMoney:{
                        required:0,     //是否必填
                    },
                    demandType:{
                        required:0,     //是否必填
                    },
                    otherDemandType:{
                        required:0,     //是否必填
                    },
                    comment:{
                        required:0,     //是否必填
                    },
                },
                result_dept:{
                  deptList:[],
                },
                ownerResult:{
                    gender:{
                        default:1,      //1、男；2、女
                    },
                    socialAccount:{
                        required:0,     //是否必填
                    },
                    sourceChannelId:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:undefined,     //初始值
                    },
                    urgencyLevel:{
                        required:0,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:1,     //初始值
                    },
                    comment:{
                        required:0,     //是否必填
                    },
                    centralizedHouse:{
                        cityId:{
                            required:1,     //是否必填
                            default:undefined,     //初始值
                        },
                        fullAddress:{
                            required:1,     //是否必填
                        },
                        roomTypeQuantity:{
                            required:0,     //是否必填
                            default:undefined,     //初始值
                        },
                        roomQuantity:{
                            required:0,     //是否必填
                            default:undefined,     //初始值
                        },
                        price:{
                            required:0,     //是否必填
                            default:undefined,     //初始值
                        },
                        leasePeriod:{
                            required:0,     //是否必填
                            default:undefined,     //初始值
                        },
                        picList:{
                            required:0,     //是否必填
                            default:9,     //初始值
                        },
                    },
                    deCentralizedHouse:{      //分散
                        cityId:{
                            required:1,     //是否必填
                            default:undefined,     //初始值
                        },
                        fullAddress:{
                            required:1,     //是否必填
                        },
                        decorationType:{
                            required:0,     //是否必填
                            default:2,     //初始值
                        },
                        room:{
                            required:0,     //是否必填
                            default:2,     //初始值
                        },
                        livingRoom:{
                            required:0,     //是否必填
                            default:1,     //初始值
                        },
                        kitchen:{
                            required:0,     //是否必填
                            default:1,     //初始值
                        },
                        toilet:{
                            required:0,     //是否必填
                            default:1,     //初始值
                        },
                        area:{
                            required:0,     //是否必填
                            default:undefined,     //初始值
                        },
                        price:{
                            required:0,     //是否必填
                            default:undefined,     //初始值
                        },
                        leasePeriod:{
                            required:0,     //是否必填
                            default:undefined,     //初始值
                        },
                        isFree:{
                            required:0,     //是否必填
                            default:false,     //初始值
                        },
                        picList:{
                            required:0,     //是否必填
                            default:9,     //初始值
                        },
                    },
                },
                ownerResult_dept:{
                  deptList:[],
                },
                id:'',
                id_dept:'',
                saveLoading:false,
                saveLoading_dept:false,
                sourceChannelList:[],
                urgencyLevelList:[
                    {
                        id:1,
                        name:'紧急（7天以内）',
                    },
                    {
                        id:2,
                        name:'一般（15天以内）',
                    },
                    {
                        id:3,
                        name:'暂缓（30天以内）',
                    },
                    {
                        id:4,
                        name:'更久（30天以上）',
                    },
                ],
                ownerUrgencyLevelList:[
                    {
                        id:1,
                        name:'紧急',
                    },
                    {
                        id:2,
                        name:'一般',
                    },
                    {
                        id:3,
                        name:'暂缓',
                    },
                    {
                        id:4,
                        name:'更久',
                    },
                ],
                leasePeriodList:[
                    {
                        id:1,
                        name:'一个月',
                    },
                    {
                        id:2,
                        name:'三个月',
                    },
                    {
                        id:3,
                        name:'半年',
                    },
                    {
                        id:4,
                        name:'一年',
                    },
                    {
                        id:5,
                        name:'一年以上',
                    },
                ],
                cityList: [],//获取小区地址相关
                deptData:[],
                deptValue:undefined,
                data:{},
                confirmSaveDialog:false,
                operateType:1,    //1、基本信息操作；2、设置出房部门操作
                fromType:2,
            }
        },
        created: function () {
            this.getSourceChannel();
            this.initData([1,2]);
            this.getAuthDeptTree();
        },
        methods: {
          successSave(){
            this.confirmSaveDialog = false;
            this.initData([this.operateType]);
          },
          onChange(value) {
            this.deptValue = value;
          },
          onSearch() {
          },
          onSelect() {
          },
          addValue(arr){
            if (arr.length > 0) {
              arr.forEach((item) => { //利用foreach循环遍历
                item.value = item.id;
                if(item.isStore==1&&item.id!=this.deptData[0].id){
                  item.title = item.title + '@门店';
                }
                if (item.children.length > 0) //判断chlidren是否有数据
                {
                  this.addValue(item.children);  //递归调用
                }
              });
            }
          },
          getAuthDeptTree(){
            getAuthDeptTree(this.resMark).then(res => {
              if (res.code == 200) {
                this.deptData = [];
                this.deptData.push(res.data);
                this.addValue(this.deptData);
              }
            });
          },
            initDefault(val){
              if(val==1){
                this.result = {
                  gender:{
                    default:1,      //1、男；2、女
                  },
                  socialAccount:{
                    required:0,     //是否必填
                  },
                  sourceChannelId:{
                    required:0,     //是否必填
                    unEditable:0,  //是否不可修改
                    default:undefined,     //初始值
                  },
                  urgencyLevel:{
                    required:0,     //是否必填
                    unEditable:0,  //是否不可修改
                    default:undefined,     //初始值
                  },
                  leasePeriod:{
                    required:0,     //是否必填
                    unEditable:0,  //是否不可修改 1、不可修改；0、可修改
                    default:undefined,     //初始值
                  },
                  cityId:{
                    required:0,     //是否必填
                    unEditable:0,  //是否不可修改
                    default:undefined,     //初始值
                  },
                  acceptMoney:{
                    required:0,     //是否必填
                  },
                  demandType:{
                    required:0,     //是否必填
                  },
                  otherDemandType:{
                    required:0,     //是否必填
                  },
                  comment:{
                    required:0,     //是否必填
                  },
                };
                this.ownerResult = {
                  gender:{
                    default:1,      //1、男；2、女
                  },
                  socialAccount:{
                    required:0,     //是否必填
                  },
                  sourceChannelId:{
                    required:0,     //是否必填
                    unEditable:0,  //是否不可修改
                    default:undefined,     //初始值
                  },
                  urgencyLevel:{
                    required:0,     //是否必填
                    unEditable:0,  //是否不可修改
                    default:1,     //初始值
                  },
                  comment:{
                    required:0,     //是否必填
                  },
                  centralizedHouse:{
                    cityId:{
                      required:1,     //是否必填
                      default:undefined,     //初始值
                    },
                    fullAddress:{
                      required:1,     //是否必填
                    },
                    roomTypeQuantity:{
                      required:0,     //是否必填
                      default:undefined,     //初始值
                    },
                    roomQuantity:{
                      required:0,     //是否必填
                      default:undefined,     //初始值
                    },
                    price:{
                      required:0,     //是否必填
                      default:undefined,     //初始值
                    },
                    leasePeriod:{
                      required:0,     //是否必填
                      default:undefined,     //初始值
                    },
                    picList:{
                      required:0,     //是否必填
                      default:9,     //初始值
                    },
                  },
                  deCentralizedHouse:{      //分散
                    cityId:{
                      required:1,     //是否必填
                      default:undefined,     //初始值
                    },
                    fullAddress:{
                      required:1,     //是否必填
                    },
                    decorationType:{
                      required:0,     //是否必填
                      default:2,     //初始值
                    },
                    room:{
                      required:0,     //是否必填
                      default:2,     //初始值
                    },
                    livingRoom:{
                      required:0,     //是否必填
                      default:1,     //初始值
                    },
                    kitchen:{
                      required:0,     //是否必填
                      default:1,     //初始值
                    },
                    toilet:{
                      required:0,     //是否必填
                      default:1,     //初始值
                    },
                    area:{
                      required:0,     //是否必填
                      default:undefined,     //初始值
                    },
                    price:{
                      required:0,     //是否必填
                      default:undefined,     //初始值
                    },
                    leasePeriod:{
                      required:0,     //是否必填
                      default:undefined,     //初始值
                    },
                    isFree:{
                      required:0,     //是否必填
                      default:false,     //初始值
                    },
                    picList:{
                      required:0,     //是否必填
                      default:9,     //初始值
                    },
                  },
                };
              }
              if(val==2){
                this.result_dept = {
                    deptList:[],
                };
                this.deptValue = [];
                this.ownerResult_dept = {
                    deptList:[],
                };
              }
            },
            changeIsFree(val){
                this.ownerResult.deCentralizedHouse.isFree.default = val.target.checked;
            },
            //获取小区地址相关
            getCity(){
              if(!this.cityList||this.cityList.length==0){
                getCityList().then(res=>{
                  this.cityList = res.data;
                  if(this.cityList&&this.cityList.length>0){
                    if(!this.ownerResult.deCentralizedHouse.cityId.default){
                      this.ownerResult.deCentralizedHouse.cityId.default = this.cityList[0].id;
                    }
                    if(!this.ownerResult.centralizedHouse.cityId.default){
                      this.ownerResult.centralizedHouse.cityId.default = this.cityList[0].id;
                    }
                  }
                })
              }
              else{
                if(!this.ownerResult.deCentralizedHouse.cityId.default){
                  this.ownerResult.deCentralizedHouse.cityId.default = this.cityList[0].id;
                }
                if(!this.ownerResult.centralizedHouse.cityId.default){
                  this.ownerResult.centralizedHouse.cityId.default = this.cityList[0].id;
                }
              }
            },
            getSourceChannel(){
                getSourceChannel().then(res=>{
                    this.sourceChannelList = res.data;
                })
            },
            initData(val){
                let moduleMark = 'crm.renterClue';
                let moduleMark_dept = 'crm.renterClueDept';
                if(this.activekey == 1){
                  moduleMark = 'crm.renterClue';
                  moduleMark_dept = 'crm.renterClueDept';
                }
                else if(this.activekey == 2){
                  moduleMark = 'crm.ownerClue';
                  moduleMark_dept = 'crm.ownerClueDept';
                }
                if(val.indexOf(1)>-1){
                  let parameter = {
                    features:'default',
                    moduleMark:moduleMark,
                    storeId:this.storeDeptId,
                  };
                  API.moduleFieldConfigList(parameter).then(res => {
                    if (res.code === '200') {
                      let resultList = res.data;
                      if(resultList&&resultList.length>0){
                        if(this.activekey == 1){
                          this.result = resultList[0].fieldsObj;
                        }
                        else if(this.activekey == 2){
                          this.ownerResult = resultList[0].fieldsObj;
                        }
                        this.id = resultList[0].id;
                      }
                      else{
                        this.id = '';
                        this.initDefault(1);
                      }
                      this.getCity();
                    }
                  });
                }
                if(val.indexOf(2)>-1){
                  let parameter_dept = {
                    features:'default',
                    moduleMark:moduleMark_dept,
                    storeId:this.storeDeptId,
                  };
                  API.moduleFieldConfigList(parameter_dept).then(res => {
                    if (res.code === '200') {
                      let resultList = res.data;
                      if(resultList&&resultList.length>0){
                        if(this.activekey == 1){
                          this.result_dept = resultList[0].fieldsObj;
                          if(this.result_dept){
                            this.deptValue = this.result_dept.deptList;
                          }
                          else{
                            this.deptValue = undefined;
                          }
                        }
                        else if(this.activekey == 2){
                          this.ownerResult_dept = resultList[0].fieldsObj;
                          if(this.ownerResult_dept){
                            this.deptValue = this.ownerResult_dept.deptList;
                          }
                          else{
                            this.deptValue = [];
                          }
                        }
                        this.id_dept = resultList[0].id;
                      }
                      else{
                        this.id_dept = '';
                        this.initDefault(2);
                      }
                    }
                  });
                }
            },
            changeActivekey(val){
                this.activekey = val;
                this.initData([1,2]);
            },
            saveConfig(val){
                let moduleMark = 'crm.renterClue';
                let fieldsObj = {};
                let id ='';
                if(this.activekey == 1){
                    if(val==1){
                      moduleMark = 'crm.renterClue';
                      fieldsObj = this.result;
                      id = this.id;
                    }
                    if(val==2){
                      moduleMark = 'crm.renterClueDept';
                      this.result_dept.deptList = this.deptValue;
                      fieldsObj = this.result_dept;
                      id = this.id_dept;
                    }
                }
                else if(this.activekey == 2){
                    if(val==1){
                      moduleMark = 'crm.ownerClue';
                      fieldsObj = this.ownerResult;
                      id = this.id;
                    }
                    if(val==2){
                      this.ownerResult_dept.deptList = this.deptValue;
                      moduleMark = 'crm.ownerClueDept';
                      fieldsObj = this.ownerResult_dept;
                      id = this.id_dept;
                    }
                }

                let parameter = {
                    features:'default',
                    moduleMark:moduleMark,
                    storeId:this.storeDeptId,
                    fieldsObj:fieldsObj,
                };
                if(id){
                  parameter.id = id;
                }
                this.confirmSaveDialog = true;
                this.data = parameter;
                this.operateType = val;
            },
            defaultConfig(val){
              let id = '';
              if(val==1){
                id =  this.id;
              }
              if(val==2){
                id = this.id_dept;
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
                                    _this.initData([val]);
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
                this.initData([1,2]);
            },
        },
    }
</script>

<style scoped lang="less">
    .resource-default-box{
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
                        width: 1050px;
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
                            .selectStyle{
                                color: #0A87F8 !important;
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
                                .unEditStyle{
                                    margin-right: 2px;
                                    color: #BBBBBB;
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
                .selectDeptStyle{
                  /deep/ .ant-select-search__field__placeholder{
                    left:0px;
                  }
                  /deep/ .ant-select-selection__rendered{
                    margin-left: 0px;
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
        /deep/ .ant-select-selection__clear{

        }
      /deep/ .ant-select-tree li .ant-select-tree-node-content-wrapper.ant-select-tree-node-selected{
        background: @themeBgColor;
      }
    }
</style>