<template>
    <div class="source-detail-box clearfix" @mousedown="closeAddFollowDetail">
        <div class="left-detail f-fl">
            <div class="top f-clearfix" v-if="sourceDetails.clueHouseType == 1" style="margin-bottom: 5px;">
                <div class="f-fl title">
                    <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                    <span class="radius-font status2" style="margin-top: 9px" v-if="sourceDetails.status==1&&!skeletonLoading"><icon-font type="iconyumengtubiao_xuanzhong-" /></span>
                    <span class="radius-font status" style="margin-top: 9px" v-else-if="sourceDetails.status==2&&!skeletonLoading"><icon-font type="icon-yumengtubiao_guanbi-" /></span>
                    <span class="radius-font status" style="margin-top: 9px" v-else-if="sourceDetails.status==3&&!skeletonLoading"><icon-font type="icon-yumengtubiao_guanbi-" /></span>
                    <span class="radius-font status" style="margin-top: 9px" v-else-if="sourceDetails.status==4&&!skeletonLoading"><icon-font type="icon-yumengtubiao_guanbi-" /></span>
                    <div>
                        <label-item title="当前状态">
                            <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                            <div v-if="sourceDetails.status==1&&!skeletonLoading">正常</div>
                            <div v-else-if="sourceDetails.status==2&&!skeletonLoading">关闭·我签</div>
                            <div v-else-if="sourceDetails.status==3&&!skeletonLoading">关闭·他签</div>
                            <div v-else-if="sourceDetails.status==4&&!skeletonLoading">关闭·无效</div>
                        </label-item>
                    </div>
                </div>
                <div class="f-fl detail">
                    <div class="blank-box"></div>
                    <div class="item" style="width:240px">
                        <span style="margin-top: 7px;" class="radius-font radius-font-greed">
                            <icon-font type="iconyumengtubiao_jiaosequanxian" />
                        </span>
                        <label-item title="业主信息" :skeletonLoading="skeletonLoading">
                            <div>{{sourceDetails.name|blankVal}} - {{sourceDetails.phone|blankVal}}</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:160px">
                        <span style="margin-top: 7px;" class="radius-font radius-font-red">
                            <icon-font type="icon-yumengtubiao_jiaji" />
                        </span>
                        <label-item title="紧急程度" :skeletonLoading="skeletonLoading">
                            <div>{{sourceDetails.urgencyLevelName|blankVal}}</div>
                        </label-item>
                    </div>
                    <div class="blank-box"></div>
                    <div class="item" style="width:240px">
                        <span style="margin-top: 7px;" class="radius-font radius-font-person">
                            <icon-font type="iconyumengtubiao_dingwei" />
                        </span>
                        <label-item title="委托房源地址" :skeletonLoading="skeletonLoading" style="width: 198px;">
                            <div>{{sourceDetails.cityName}} - {{sourceDetails.fullAddress}}</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:160px">
                        <span style="margin-top: 7px;" class="radius-font radius-font-yellow">
                            <icon-font type="icon-yumengtubiao_zujin" />
                        </span>
                        <label-item title="期望租金" :skeletonLoading="skeletonLoading">
                            <div>{{sourceDetails.price?sourceDetails.price/100+'元':'-'}}</div>
                        </label-item>
                    </div>

                </div>
            </div>
            <div class="top f-clearfix" v-if="sourceDetails.clueHouseType == 2">
                <div class="f-fl title" style="margin:0 0 15px 0;">
                    <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                    <span class="radius-font status2" style="margin-top: 9px" v-if="sourceDetails.status==1&&!skeletonLoading"><icon-font type="iconyumengtubiao_xuanzhong-" /></span>
                    <span class="radius-font status" style="margin-top: 9px" v-else-if="sourceDetails.status==2&&!skeletonLoading"><icon-font type="icon-yumengtubiao_guanbi-" /></span>
                    <span class="radius-font status" style="margin-top: 9px" v-else-if="sourceDetails.status==3&&!skeletonLoading"><icon-font type="icon-yumengtubiao_guanbi-" /></span>
                    <span class="radius-font status" style="margin-top: 9px" v-else-if="sourceDetails.status==4&&!skeletonLoading"><icon-font type="icon-yumengtubiao_guanbi-" /></span>
                    <div>
                        <label-item title="当前状态">
                            <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                            <div v-if="sourceDetails.status==1&&!skeletonLoading">正常</div>
                            <div v-else-if="sourceDetails.status==2&&!skeletonLoading">关闭·我签</div>
                            <div v-else-if="sourceDetails.status==3&&!skeletonLoading">关闭·他签</div>
                            <div v-else-if="sourceDetails.status==4&&!skeletonLoading">关闭·无效</div>
                        </label-item>
                    </div>
                </div>
                <div class="f-fl detail" style="height: 70px;">
                    <div class="blank-box"></div>
                    <div class="item" style="width:240px;margin-bottom: 10px;">
                        <span style="margin-top: 7px;" class="radius-font radius-font-greed">
                            <icon-font type="iconyumengtubiao_jiaosequanxian" />
                        </span>
                        <label-item title="业主信息" :skeletonLoading="skeletonLoading">
                            <div>{{sourceDetails.name|blankVal}} - {{sourceDetails.phone|blankVal}}</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:160px;margin-bottom: 10px;">
                        <span style="margin-top: 7px;" class="radius-font radius-font-red">
                            <icon-font type="icon-yumengtubiao_jiaji" />
                        </span>
                        <label-item title="紧急程度" :skeletonLoading="skeletonLoading">
                            <div>{{sourceDetails.urgencyLevelName|blankVal}}</div>
                        </label-item>
                    </div>
                </div>
            </div>
            <div class="tabs-content">
                <a-tabs size="small" defaultActiveKey="1">
                    <a-tab-pane key="1">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_jibenxinxi" /> 基本信息
                        </span>
                        <div class="basic-info">
                            <div class="input-info" :style="isEdit?'margin-top:8px':''">
                                <label-item class="item margin1" title="业主姓名" :skeletonLoading="skeletonLoading" :mustFill="isEdit?true:false">
                                    <span v-show="!isEdit">{{sourceDetails.name|blankVal}}</span>
                                    <a-input v-show="isEdit" v-model="sourceDetails.name" />
                                </label-item>
                                <label-item class="item margin1" title="业主电话" :skeletonLoading="skeletonLoading" :mustFill="isEdit?true:false">
                                    <span v-show="!isEdit">{{sourceDetails.phone|blankVal}}</span>
                                    <a-input v-show="isEdit" v-model="sourceDetails.phone" :maxlength="11" @keyup.native="mixin_integerFilter('sourceDetails.phone')" @blur="checkPhone(sourceDetails.phone)" />
                                </label-item>
                                <label-item class="item margin2" title="性别" :skeletonLoading="skeletonLoading">
                                    <span v-show="!isEdit">{{sourceDetails.gender == 1 ?'男':'女'}}</span>
                                    <a-radio-group v-show="isEdit" v-model="sourceDetails.gender">
                                        <a-radio :value="1">男</a-radio>
                                        <a-radio :value="2">女</a-radio>
                                    </a-radio-group>
                                </label-item>
                                <label-item class="item margin1" title="微信/QQ/其他" :skeletonLoading="skeletonLoading" :mustFill="isEdit?ownerCheck.socialAccount.required==1?true:false:false">
                                    <span v-show="!isEdit">{{sourceDetails.socialAccount|blankVal}}</span>
                                    <a-input v-show="isEdit" placeholder="请输入" v-model="sourceDetails.socialAccount" />
                                </label-item>
                                <label-item class="item margin1" title="客户来源" :skeletonLoading="skeletonLoading" :mustFill="isEdit?ownerCheck.sourceChannelId.required==1?true:false:false">
                                    <span v-show="!isEdit">{{sourceDetails.sourceChannelName|blankVal}}</span>
                                    <a-select v-show="isEdit" :showSearch="true" :filterOption="(inputValue,option)=>filterOption(inputValue,option)" v-model="sourceDetails.sourceChannelId"  placeholder="请选择">
                                        <a-select-option v-for="(item) in sourceChannelList" :disabled="item.disabled" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
                                    </a-select>
                                </label-item>
                                <label-item class="item" title="紧急程度" :skeletonLoading="skeletonLoading" :mustFill="isEdit?ownerCheck.urgencyLevel.required==1?true:false:false">
                                    <span v-show="!isEdit" :style="sourceDetails.urgencyLevel==1?'color:#FB4246':''">{{sourceDetails.urgencyLevelName|blankVal}}</span>
                                    <div v-show="isEdit" class=".ant-inputnormalWidth">
                                        <a-select v-model="sourceDetails.urgencyLevel" style="width:100%" placeholder="请选择">
                                            <a-select-option v-for="(item,index) in urgencyLevelList" :disabled="item.disabled" :key="index" :value="item.id">{{item.name}}</a-select-option>
                                        </a-select>
                                    </div>
                                </label-item>
                            </div>
                            <div class="input-info" v-for="(item,index) in sourceDetails.houseList" :key="index" style="border:1px solid rgba(244,244,244,1);border-radius:4px 4px 4px 4px;" :style="index < sourceDetails.houseList.length-1?'margin-bottom:12px;':''">
                                <div class="clearfix" style="width: 100%;background:#F6F7F8;border-radius:4px 4px 0px 0px;height:30px;line-height:30px;">
                                    <div class="f-fl" style="color:#111111;font-size: 16px;font-weight: 500;padding-left:10px;" v-if="item.clueHouseType==1">房源{{index+1}}</div>
                                    <div class="f-fl" style="color:#111111;font-size: 16px;font-weight: 500;padding-left:10px;" v-if="item.clueHouseType==2">项目{{index+1}}</div>
                                    <div v-if="isEdit&&sourceDetails.houseList.length>1" class="f-fr cursor" style="margin-right:10px;color: #FB4246;font-size: 14px;" @click="deleteHouse(index)">
                                        <icon-font type="iconyumengtubiao_shanchu-" />
                                        <span style="margin-left: 4px;">删除</span>
                                    </div>
                                </div>
                                <div class="clearfix" style="width: 100%;padding:0 10px;margin-top: 10px;border-radius:0px 0px 4px 4px;">
                                    <label-item class="f-fl item margin1" style="width: 170px;" title="委托房源地址" :skeletonLoading="skeletonLoading" v-if="item.clueHouseType==1" :mustFill="isEdit?true:false">
                                        <span style="max-width: 150px"><p v-show="!isEdit" class="overHidde" >{{item.cityName|blankVal}} {{item.fullAddress}}</p></span>
                                        <a-input-group  v-show="isEdit" compact  class="address clearfix">
                                            <a-select v-model="item.cityId"  @change="selectCity" style="width: 35%;float: left">
                                                <a-select-option :value="cityItem.id" :key="cityItem.id" v-for="(cityItem) in cityList">{{ cityItem.name }}</a-select-option>
                                            </a-select>
                                            <a-input style="width: 65%;float: left;border-top-right-radius: 4px;border-bottom-right-radius: 4px;" placeholder="详细地址" v-model="item.fullAddress"></a-input>
                                        </a-input-group>
                                    </label-item>
                                    <label-item class="f-fl item margin1" style="width: 170px;" title="项目地址" :skeletonLoading="skeletonLoading" v-if="item.clueHouseType==2" :mustFill="isEdit?true:false">
                                        <span style="max-width: 150px"><p v-show="!isEdit" class="overHidde" >{{item.cityName|blankVal}} {{item.fullAddress}}</p></span>
                                        <a-input-group  v-show="isEdit" compact  class="address clearfix">
                                            <a-select v-model="item.cityId"  @change="selectCity" style="width: 35%;float: left">
                                                <a-select-option :value="cityItem.id" :key="cityItem.id" v-for="(cityItem) in cityList">{{ cityItem.name }}</a-select-option>
                                            </a-select>
                                            <a-input style="width: 65%;float: left;border-top-right-radius: 4px;border-bottom-right-radius: 4px;" placeholder="详细地址" v-model="item.fullAddress"></a-input>
                                        </a-input-group>
                                    </label-item>
                                    <label-item class="f-fl item margin1" title="户型" :skeletonLoading="skeletonLoading" v-if="item.clueHouseType==1" :mustFill="isEdit?(ownerCheck.deCentralizedHouse.room.required==1||ownerCheck.deCentralizedHouse.livingRoom.required==1||ownerCheck.deCentralizedHouse.kitchen.required==1||ownerCheck.deCentralizedHouse.toilet.required==1)?true:false:false">
                                        <span v-show="!isEdit">{{item.room|blankVal}}室{{item.livingRoom|blankVal}}厅{{item.kitchen|blankVal}}厨{{item.toilet|blankVal}}卫</span>
                                        <label-item v-show="isEdit">
                                            <a-input-group compact style="position: relative;width: 180px">
                                                <a-input v-model="item.room" style=" width: 25%;" />
                                                <span class="addon-after-position" style="left: calc(25% - 18px);">室</span>
                                                <a-input v-model="item.livingRoom" style=" width: 25%;" />
                                                <span class="addon-after-position" style="left: calc(50% - 20px);">厅</span>
                                                <a-input v-model="item.kitchen" style=" width: 25%;" />
                                                <span class="addon-after-position" style="left: calc(75% - 20px);">厨</span>
                                                <span class="addon-after-position" style="left: calc(100% - 20px);">卫</span>
                                                <a-input v-model="item.toilet" style=" width: 25%;" />
                                            </a-input-group>
                                        </label-item>
                                    </label-item>
                                    <label-item class="f-fl item margin1" title="房型数量" :skeletonLoading="skeletonLoading" v-if="item.clueHouseType==2" :mustFill="isEdit?ownerCheck.centralizedHouse.roomTypeQuantity.required==1?true:false:false">
                                        <span v-show="!isEdit">{{item.roomTypeQuantity?item.roomTypeQuantity+'个':'-'}}</span>
                                        <label-item v-show="isEdit" addonAfter="个">
                                            <a-input v-model="item.roomTypeQuantity" v-validate="'naturalNum|min(1)|max(50)'" placeholder="请输入" />
                                        </label-item>
                                    </label-item>
                                    <label-item class="f-fl item margin2" style="width: 168px;" title="面积" :skeletonLoading="skeletonLoading" v-if="item.clueHouseType==1" :mustFill="isEdit?ownerCheck.deCentralizedHouse.area.required==1?true:false:false">
                                        <span v-show="!isEdit">{{item.area?item.area+'㎡':'-'}}</span>
                                        <label-item v-show="isEdit" addonAfter="㎡">
                                            <a-input v-model="item.area" v-validate="'area'" placeholder="请输入" />
                                        </label-item>
                                    </label-item>
                                    <label-item class="f-fl item margin2" style="width: 168px;" title="房间数量" :skeletonLoading="skeletonLoading" v-if="item.clueHouseType==2" :mustFill="isEdit?ownerCheck.centralizedHouse.roomQuantity.required==1?true:false:false">
                                        <span v-show="!isEdit">{{item.roomQuantity?item.roomQuantity+'间':'-'}}</span>
                                        <label-item v-show="isEdit" addonAfter="间">
                                            <a-input v-model="item.roomQuantity" v-validate="'naturalNum'" placeholder="请输入" />
                                        </label-item>
                                    </label-item>
                                    <label-item class="f-fl item margin1" style="width: 170px;" title="装修状况" :skeletonLoading="skeletonLoading" v-if="item.clueHouseType==1" :mustFill="isEdit?ownerCheck.deCentralizedHouse.decorationType.required==1?true:false:false">
                                        <span v-show="!isEdit">{{item.decorationTypeName|blankVal}}</span>
                                        <a-select v-show="isEdit" style="width: 100%;box-sizing: border-box"  v-model="item.decorationType" placeholder="请选择">
                                            <a-select-option :value="2">精装</a-select-option>
                                            <a-select-option :value="4">毛坯</a-select-option>
                                            <a-select-option :value="3">简装</a-select-option>
                                            <a-select-option :value="1">豪华装</a-select-option>
                                        </a-select>
                                    </label-item>
                                    <label-item class="f-fl item margin1" v-if="item.clueHouseType==1" title="期望租金" :skeletonLoading="skeletonLoading" :mustFill="isEdit?ownerCheck.deCentralizedHouse.price.required==1?true:false:false">
                                        <span v-show="!isEdit">{{item.price?item.price+'元':'-'}}</span>
                                        <label-item v-show="isEdit" addonAfter="元">
                                            <a-input v-model="item.price" v-validate="'naturalNum|min(1)|max(999999999)'" placeholder="请输入"/>
                                        </label-item>
                                    </label-item>
                                    <label-item class="f-fl item margin1" v-if="item.clueHouseType==2" style="width:170px;" title="期望租金" :skeletonLoading="skeletonLoading" :mustFill="isEdit?ownerCheck.centralizedHouse.price.required==1?true:false:false">
                                        <span v-show="!isEdit">{{item.price?item.price+'元':'-'}}</span>
                                        <label-item v-show="isEdit" addonAfter="元">
                                            <a-input v-model="item.price" v-validate="'naturalNum|min(1)|max(999999999)'" placeholder="请输入"/>
                                        </label-item>
                                    </label-item>
                                    <label-item class="f-fl item margin2" style="width: 168px;" title="期望委托年限" :skeletonLoading="skeletonLoading" v-if="item.clueHouseType==1" :mustFill="isEdit?ownerCheck.deCentralizedHouse.leasePeriod.required==1?true:false:false">
                                        <span v-show="!isEdit">{{item.leasePeriod?item.leasePeriod+'年':'-'}}/{{item.isFree==1?'接受免租期':'不接受免租期'}}</span>
                                        <label-item v-show="isEdit" class="clearfix">
                                            <label-item addonAfter="年" class="f-fl" style="width: 66px;">
                                                <a-input v-model="item.leasePeriod" v-validate="'naturalNum|min(1)|max(50)'" maxlength="3" placeholder="请输入" />
                                            </label-item>
                                            <a-checkbox v-model="item.checked" class="f-fl" style="height: 24px;line-height: 24px;margin-left: 10px;" @change="(value)=>changeIsFree(value,item)">接受免租期</a-checkbox>
                                        </label-item>
                                    </label-item>
                                    <label-item class="f-fl item margin2" title="期望委托年限" :skeletonLoading="skeletonLoading" v-if="item.clueHouseType==2" :mustFill="isEdit?ownerCheck.centralizedHouse.leasePeriod.required==1?true:false:false">
                                        <span v-show="!isEdit">{{item.leasePeriod?item.leasePeriod+'年':'-'}}</span>
                                        <label-item v-show="isEdit" addonAfter="年">
                                            <a-input v-model="item.leasePeriod" v-validate="'naturalNum|min(1)|max(50)'" placeholder="请输入"/>
                                        </label-item>
                                    </label-item>
                                    <label-item title="房源图片" v-if="item.clueHouseType==1" class="item u-bottom-border f-fl clearfix" style="width: 100%;" :style="isEdit?'margin-bottom:0px':(!item.picList||item.picList.length==0)?'margin-bottom: 15px;':'margin-bottom: 10px;'" :skeletonLoading="skeletonLoading" :mustFill="isEdit?ownerCheck.deCentralizedHouse.picList.required==1:false">
                                        <div v-show="!isEdit" class="room-img-list clearfix">
                                            <span v-if="!item.picList||item.picList.length==0">-</span>
                                            <div class="f-fl cursor" v-for="(itemPic,i) in item.picList" :key="i" style="margin-bottom: 10px;">
                                                <div @click="handlePreview(itemPic)"><img :src="itemPic.small" alt=""></div>
                                            </div>
                                        </div>
                                        <own-upload v-show="isEdit" :showTips="false" :maxLength="maxLength" :picList="item.picList" :uploadParms="uploadParms" @deletePic="deletePic(index)" :ref="'housePicList'+index"></own-upload>
                                    </label-item>
                                    <label-item title="房源图片" v-if="item.clueHouseType==2" class="item u-bottom-border f-fl clearfix" style="width: 100%;" :style="isEdit?'margin-bottom:0px':(!item.picList||item.picList.length==0)?'margin-bottom: 15px;':'margin-bottom: 10px;'" :skeletonLoading="skeletonLoading" :mustFill="isEdit?ownerCheck.centralizedHouse.picList.required==1:false">
                                        <div v-show="!isEdit" class="room-img-list clearfix">
                                            <span v-if="!item.picList||item.picList.length==0">-</span>
                                            <div class="f-fl cursor" v-for="(itemPic,i) in item.picList" :key="i" style="margin-bottom: 10px;">
                                                <div @click="handlePreview(itemPic)"><img :src="itemPic.small" alt=""></div>
                                            </div>
                                        </div>
                                        <own-upload v-show="isEdit" :showTips="false" :maxLength="maxLength" :picList="item.picList" :uploadParms="uploadParms" @deletePic="deletePic(index)" :ref="'housePicList'+index"></own-upload>
                                    </label-item>
                                    <label-item class="item f-fl clearfix" style="width: 100%;" :style="item.lableList&&item.lableList.length>0?'margin-bottom:15px;':''" title="标签(仅内部可见)" :skeletonLoading="skeletonLoading" v-if="item.clueHouseType==2">
                                        <div v-show="!isEdit" v-if="!item.lableList||item.lableList.length==0">-</div>
                                        <div class="f-fl itemLableStyle" v-show="!isEdit" v-for="(itemTemp) in item.lableList">{{itemTemp}}</div>
                                        <label-item class="clearfix f-fl" v-show="isEdit" style="width:100%;border-radius:4px;border:1px solid #DDDDDD;padding: 8px 5px 3px 5px;height:64px;position: relative">
                                            <div v-for="(itemTemp,index2) in item.lableList" :key="index2" class="itemLableStyle f-fl clearfix" style="margin-bottom: 5px;">
                                                <div class="f-fl">{{itemTemp}}</div>
                                                <icon-font style="color: #FB4246;margin-top: 6px;" class="cursor f-fl" @click="removeDemandLabelList(itemTemp,index)" type="iconyumengtubiao_guanbi-"/>
                                            </div>
                                            <label-item class="f-fl u-no-border" v-if="item.lableList.length<5">
                                                <a-input v-model="demandLabelList[index]" style="text-align: left;" maxLength="10" @click="currentClickIndex=index" :style="item.lableList.length==0?'width:160px;':'width:110px;'" :placeholder="item.lableList.length==0?'可输入补充标签，回车添加':'继续输入回车添加'" @keyup.enter="value=>addDemandLabel(value,index)" />
                                            </label-item>
                                            <div class="poperLabelStyle2" v-if="currentClickIndex==index&&houseLableList.length>0" style="max-height: 200px;overflow-y: auto" @mouseenter="currentClickIndex=index" @mouseleave="currentClickIndex=undefined">
                                                <div style="width: 100%;font-size: 12px;color: #666666;line-height: 17px;margin: 0 0 2px 0;">常用标签</div>
                                                <div v-for="(itemTemp,index3) in houseLableList" :key="index3" @click.stop="changeLabelList(item.lableList,itemTemp)" class="selectDemandLabelItem cursor f-fl clearfix" style="margin:0 5px 5px 0;" :style="item.lableList.indexOf(itemTemp)>-1?'':'background:#F4F4F4;'">
                                                    <div class="f-fl">{{itemTemp}}</div>
                                                </div>
                                            </div>
                                        </label-item>
                                    </label-item>
                                </div>
                            </div>
                            <div class="input-info" v-show="isEdit" style="margin-top: 12px;">
                                <div class="addHouse cursor" @click="addHouse">
                                    <span><icon-font type="iconyumengtubiao_tianjiazijian" /></span>
                                    <span style="margin-left: 4px;">继续添加房源</span>
                                </div>
                            </div>
                            <div class="input-info">
                                <label-item v-show="!isEdit" class="item u-bottom-border" style="width: 100%;margin: 12px 0 20px 0;" title="备注信息" :valLength="sourceDetails.comment ? sourceDetails.comment.length : 0" :skeletonLoading="skeletonLoading">
                                    <span>{{sourceDetails.comment ? sourceDetails.comment : '-'}}</span>
                                </label-item>
                                <label-item v-show="isEdit" class="item" style="width: 100%;margin: 15px 0 20px 0;" title="备注信息" :valLength="sourceDetails.comment ? sourceDetails.comment.length : 0" :maxSize="500" :skeletonLoading="skeletonLoading" :mustFill="isEdit?ownerCheck.comment.required==1?true:false:false">
                                    <a-textarea style="height: 80px;" v-model="sourceDetails.comment" maxlength="500" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入备注信息" />
                                </label-item>
                                <label-item class="item" style="width: 100%;margin: 0 0 26px 0;" title="维护人" :skeletonLoading="skeletonLoading">
                                    <span>{{sourceDetails.assigneeName}}</span>
                                </label-item>
                                <div v-if="sourceDetails.status==2||sourceDetails.status==3||sourceDetails.status==4" class="closeDosh"></div>
                                <div v-if="sourceDetails.status==2||sourceDetails.status==3||sourceDetails.status==4" class="closeTitle">关闭详情</div>
                                <label-item v-if="sourceDetails.status==2||sourceDetails.status==3||sourceDetails.status==4" class="item u-bottom-border margin1" title="关闭时间" :skeletonLoading="skeletonLoading">
                                    <span>{{sourceDetails.closingTime?$moment(sourceDetails.closingTime).format('YYYY.MM.DD HH:mm'):''}}</span>
                                </label-item>
                                <label-item style="width: 200px;" v-if="sourceDetails.status==2||sourceDetails.status==3" class="item u-bottom-border margin1" title="签约周期" :skeletonLoading="skeletonLoading">
                                    <span>{{sourceDetails.signedBeginTime?$moment(sourceDetails.signedBeginTime).format('YYYY.MM.DD'):''}} - {{sourceDetails.signedEndTime?$moment(sourceDetails.signedEndTime).format('YYYY.MM.DD'):''}}</span>
                                </label-item>
                                <label-item v-if="sourceDetails.status==2||sourceDetails.status==3||sourceDetails.status==4" class="item u-bottom-border" style="width: 100%;margin: 0 0 20px 0;" title="关闭原因" :skeletonLoading="skeletonLoading">
                                    <span>{{sourceDetails.closingReason|blankVal}}</span>
                                </label-item>
                            </div>
                        </div>
                        <div class="bottom">
                            <span>{{sourceDetails.creater}}创建于 {{$moment(sourceDetails.createTime).format('lll')}}</span>
                            <span>{{sourceDetails.updater}}更新于 {{$moment(sourceDetails.updateTime).format('lll')}}</span>
                        </div>
                    </a-tab-pane>
                    <div v-show="!isEdit&&sourceDetails.status==1&&!skeletonLoading" slot="tabBarExtraContent" class="tabs-options">
                        <div v-if="markList.indexOf('mk_source_owner_bj')>-1||markList.indexOf('mk_source_owner_gp_bj')>-1" @click="editData" v-mark="sourceDetails.clueType == 1 ? ['mk_source_owner_bj'] : ['mk_source_owner_gp_bj']">
                            <icon-font type="iconyumengtubiao_bianji-" />
                            <span>&nbsp;编辑</span>
                        </div>
                        <div v-if="sourceDetails.clueType==2&&markList.indexOf('mk_source_owner_gp_zrsp')>-1" @click="changePrivate" v-mark="['mk_source_owner_gp_zrsp']">
                            <icon-font type="iconyumengtubiao_qiangdan" />
                            <span>&nbsp;转入私盘</span>
                        </div>
                        <div v-if="markList.indexOf('mk_source_owner_zp')>-1||markList.indexOf('mk_source_owner_gp_zp')>-1" @click="openAssignUser" v-mark="sourceDetails.clueType == 1 ? ['mk_source_owner_zp'] : ['mk_source_owner_gp_zp']">
                            <icon-font type="iconyumengtubiao_zhipai"/>
                            <span>&nbsp;指派</span>
                        </div>
                        <div v-if="sourceDetails.clueType==1&&markList.indexOf('mk_source_owner_gb')>-1" @click="openCloseSource" v-mark="['mk_source_owner_gb']">
                            <icon-font type="iconyumengtubiao_jinyong" />
                            <span>&nbsp;关闭</span>
                        </div>
                        <div v-if="showMoreOperate==false&&sourceDetails.clueType==1&&markList.indexOf('mk_source_owner_zrgp')>-1" @click="changPublic" v-mark="['mk_source_owner_zrgp']">
                            <icon-font type="iconzhuanrugongke" />
                            <span>&nbsp;转入公盘</span>
                        </div>
                        <div v-if="showMoreOperate==false&&sourceDetails.clueType==2&&markList.indexOf('mk_source_owner_gp_gb')>-1" @click="openCloseSource" v-mark="['mk_source_owner_gp_gb']">
                            <icon-font type="iconyumengtubiao_jinyong" />
                            <span>&nbsp;关闭</span>
                        </div>
                        <div v-if="showMoreOperate==false&&(markList.indexOf('mk_source_owner_gxzy')>-1||markList.indexOf('mk_source_owner_gp_gxzy')>-1)" @click="openShareSource" v-mark="sourceDetails.clueType == 1 ? ['mk_source_owner_gxzy'] : ['mk_source_owner_gp_gxzy']">
                            <icon-font type="icongongxiang" />
                            <span>&nbsp;共享</span>
                        </div>
                        <a-popover :title="null" trigger="hover" placement="bottom" v-if="showMoreOperate">
                            <template slot="content">
                                <div style="width: 100%;text-align: center;" v-if="sourceDetails.clueType==1" v-mark="['mk_source_owner_zrgp']" @click.stop="changPublic" class="action cursor">转入公盘</div>
                                <div style="width: 100%;text-align: center;" v-if="sourceDetails.clueType==2" v-mark="['mk_source_owner_gp_gb']" @click.stop="openCloseSource" class="action cursor">关闭</div>
                                <div style="width: 100%;text-align: center;" @click.stop="openShareSource()" v-mark="sourceDetails.clueType == 1 ? ['mk_source_owner_gxzy'] : ['mk_source_owner_gp_gxzy']" class="action cursor">共享</div>
                            </template>
                            <div><icon-font type="iconyumengtubiao_gengduo-1" />&nbsp;更多</div>
                        </a-popover>
                    </div>
                    <div v-if="(sourceDetails.status==2||sourceDetails.status==3)&&!skeletonLoading" slot="tabBarExtraContent" class="tabs-options">
                        <div @click="addSource" v-mark="sourceDetails.clueType == 1 ? ['mk_source_owner_cxjh'] : ['mk_source_owner_gp_cxjh']">
                            <icon-font type="iconyumengtubiao_bianji-" />
                            <span>&nbsp;重新激活</span>
                        </div>
                    </div>
                    <div v-if="sourceDetails.status==4&&!skeletonLoading" slot="tabBarExtraContent" class="tabs-options">
                        <div @click="addSource" v-mark="sourceDetails.clueType == 1 ? ['mk_source_owner_cxjh'] : ['mk_source_owner_gp_cxjh']">
                            <icon-font type="iconyumengtubiao_bianji-" />
                            <span>&nbsp;重新激活</span>
                        </div>
                        <div @click="deleteChild" v-mark="sourceDetails.clueType == 1 ? ['mk_source_owner_sc'] : ['mk_source_owner_gp_sc']">
                            <icon-font type="iconyumengtubiao_shanchu-" />
                            <span>&nbsp;删除</span>
                        </div>
                    </div>
                    <div v-show="isEdit&&sourceDetails.status==1&&!skeletonLoading" slot="tabBarExtraContent" class="tabs-options" style="height:36px;">
                        <span @click="cancelEdit" style="margin-top:6px;">取消</span>
                        <span @click="save" style="margin-top:6px;">保存</span>
                    </div>
                </a-tabs>
            </div>
        </div>
        <div class="right-detail f-fr">
            <a-tabs size="small" defaultActiveKey="1" @change="handleCallback">
                <a-tab-pane key="1">
                    <span slot="tab">
                        跟进记录
                    </span>
                    <div style="margin-top: 20px;"></div>
                    <div class="skeletonLoadingListStyle" v-show="skeletonLoading">
                        <div class="clearfix">
                            <div class="f-fl">
                                <div class="bgColorStyle animate-box" style="width:32px;height: 32px;border-radius: 50%"></div>
                            </div>
                            <div class="f-fl" style="margin-left: 10px;width: calc(100% - 42px)">
                                <div class="clearfix" style="width: 100%">
                                    <div class="bgColorStyle animate-box f-fl" style="width: 51px;height: 20px;"></div>
                                    <div class="bgColorStyle animate-box f-fr" style="width: 115px;height: 17px;"></div>
                                </div>
                                <div class="bgColorStyle animate-box" style="width: 100%;height: 36px;margin-top:7px">
                                </div>
                            </div>
                        </div>
                        <div class="clearfix" style="margin-top: 25px">
                            <div class="f-fl">
                                <div class="bgColorStyle animate-box" style="width:32px;height: 32px;border-radius: 50%"></div>
                            </div>
                            <div class="f-fl" style="margin-left: 10px;width: calc(100% - 42px)">
                                <div class="clearfix" style="width: 100%">
                                    <div class="bgColorStyle animate-box f-fl" style="width: 51px;height: 20px;"></div>
                                    <div class="bgColorStyle animate-box f-fr" style="width: 115px;height: 17px;"></div>
                                </div>
                                <div class="bgColorStyle animate-box" style="width: 100%;height: 36px;margin-top:7px">
                                </div>
                            </div>
                        </div>
                        <div class="clearfix" style="margin-top: 25px">
                            <div class="f-fl">
                                <div class="bgColorStyle animate-box" style="width:32px;height: 32px;border-radius: 50%"></div>
                            </div>
                            <div class="f-fl" style="margin-left: 10px;width: calc(100% - 42px)">
                                <div class="clearfix" style="width: 100%">
                                    <div class="bgColorStyle animate-box f-fl" style="width: 51px;height: 20px;"></div>
                                    <div class="bgColorStyle animate-box f-fr" style="width: 115px;height: 17px;"></div>
                                </div>
                                <div class="bgColorStyle animate-box" style="width: 100%;height: 36px;margin-top:7px">
                                </div>
                            </div>
                        </div>
                    </div>
                    <a-empty v-show="followUpList&&followUpList.length === 0&&!skeletonLoading" style="margin-top:100px;"/>
                    <div class="content-follow" v-for="(followUp,index) in followUpList" :key="index" v-show="!skeletonLoading" :style="index==0?'margin-top: 10px;':''">
                      <div class="content-follow-type">
                            <span class="content-follow-type1" :style="followUp.followType=='关闭'?'background-color: rgba(119,119,119,0.1);':'background-color: rgba(10, 135, 248, 0.1);'">
                              <span class="content-follow-type2" :style="followUp.followType=='关闭'?'background-color: rgba(119,119,119);':'background-color: rgba(10, 135, 248);'"></span>
                            </span>
                        <div class="content-follow-left-line" v-if="index<followUpList.length-1"></div>
                      </div>
                        <div class="content-follow-right">
                            <div class="follow-right-line-one clearfix">
                                <div class="name f-fl">{{followUp.person}}</div>
                                <div class="followType f-fl">{{followUp.followType}}</div>
                                <div class="date f-fr">{{$moment(followUp.time).format('YYYY.MM.DD HH:mm')}}</div>
                            </div>
                            <div class="follow-right-line-two" style="margin-top: 5px;width: 100%">{{followUp.content}}</div>
                            <div class="follow-right-line-two" v-if="followUp.reserveSeeTime" style="margin-top: 5px;color: #0A87F8;">预约了 {{$moment(followUp.reserveSeeTime).format('YYYY.MM.DD HH:mm')}} 看房</div>
                            <div class="follow-right-line-two" v-if="followUp.followType=='关闭'&&sourceDetails.signedBeginTime&&sourceDetails.signedEndTime" style="margin-top: 5px;color: #0A87F8;">合同周期：{{$moment(sourceDetails.signedBeginTime).format('YYYY.MM.DD')}} - {{$moment(sourceDetails.signedEndTime).format('YYYY.MM.DD')}}</div>
                            <div class="img-list" style="margin-top: 5px;">
                              <div class="f-fl cursor" v-for="(item,i) in followUp.picList" :key="i">
                                <div @click="handlePreview(item,i)">
                                  <img :src="item.small" alt="">
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </a-tab-pane>
                <a-tab-pane key="2">
                    <span slot="tab">
                        共享记录
                    </span>
                    <div style="margin-top: 20px;"></div>
                    <a-empty v-show="sharedList&&sharedList.length === 0" style="margin-top:100px;"/>
                    <div class="content-follow"  v-for="(shared,index) in sharedList" :key="index" :style="index==0?'margin-top: 10px;':''">
                        <div class="content-follow-left">
                            <span class="radius-font radius-font-close" v-if="shared.status!=1">关闭</span>
                            <span class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;" v-if="shared.status==1">正常</span>
                            <div class="content-follow-left-line" v-if="index<sharedList.length-1"></div>
                        </div>
                        <div class="content-follow-right">
                            <div class="follow-right-line-one">
                                <div class="follow-right-line-two" style="color: #777777;font-size: 14px;">{{shared.sharedPerson}} 于 {{$moment(shared.sharedTime).format('YYYY.MM.DD HH:mm')}}共享给了</div>
                            </div>
                            <div class="name">{{shared.partnerName}}</div>
                            <div class="follow-info" v-if="shared.statusChangeTime">
                                <div style="width: 100%">{{$moment(shared.statusChangeTime).format('YYYY.MM.DD HH:mm')}} 置为「{{shared.status==1?'正常':shared.status==2?'我签':shared.status==3?'他签':shared.status==4?'无效':'-'}}」</div>
                                <div style="width: 100%" v-if="shared.signedBeginTime">合同周期：{{$moment(shared.signedBeginTime).format('YYYY.MM.DD')}} - {{$moment(shared.signedEndTime).format('YYYY.MM.DD')}}</div>
                            </div>
                        </div>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
        <div class="add-follow-panel" @click.stop="" @mousedown.stop="">
            <div class="add-follow cursor" v-if="sourceDetails.status==1&&!openAddFollowDetailFlag&&activekey==1" @click="openAddFollowDetail" v-mark="sourceDetails.clueType == 1 ? ['mk_source_owner_gj'] : ['mk_source_owner_gp_gj']">
                添加跟进记录
            </div>
            <div class="add-follow cursor" style="border: 1px solid #0A87F8;text-align: center;color: #0A87F8;" v-if="sourceDetails.status==1&&!openShareSourceDialogFlag&&activekey==2" @click="openShareSource" v-mark="sourceDetails.clueType == 1 ? ['mk_source_owner_gxzy'] : ['mk_source_owner_gp_gxzy']">
                共享潜在业主线索
            </div>
            <div class="add-follow-detail cursor" v-show="openAddFollowDetailFlag&&activekey==1">
            <div class="followType clearfix">
              <div class="f-fl cursor" v-for="(item) in typeList" :key="item.id" :class="addFollowDetail.followType==item.name?'click':'normal'" @click="changeTypeName(item)">{{item.name}}</div>
            </div>
            <div style="height:110px ">
                <label-item
                        :valLength="addFollowDetail.comment ? addFollowDetail.comment.length : 0"
                        class="u-no-border"
                        style="width: 100%;height: 100px;"
                >
                    <a-textarea id="addFollowDetailContent" v-model="addFollowDetail.content" style="height: 100px;padding:4px 5px 0 5px"
                                placeholder="添加跟进记录" maxlength="200"
                                :autosize="{ minRows: 1, maxRows: 5 }"
                    />
                </label-item>
            </div>
            <div class="picStyle">
              <own-upload :picList="item2_1" v-if="openAddFollowDetailFlag" :uploadParms="sendData2_1" :maxLength="6" :showTips="false" ref="img2_1">
                <div style="padding-top: 10px;">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">图片</div>
                </div>
              </own-upload>
            </div>
            <div class="isReserveBeltSee clearfix">
                <div class="f-fl"><a-checkbox @change="onChange" v-model="addFollowDetail.checked">已约看房</a-checkbox></div>
                <div class="f-fl" style="margin-left: 5px" v-if="addFollowDetail.isReserveBeltSee==1"><a-date-picker style="width: 165px;" v-model="addFollowDetail.reserveSeeTime" show-time :format="dateFormat"  @ok="onOk"/></div>
                <div class="send f-fr" @click="addFollow">发送</div>
            </div>
        </div>
        </div>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="shareSourceDialog" class="ownModalBorder titDialog" title="共享潜在线索池">
            <share-source :sourceId="sourceId" @cancelShareSource="cancelShareSource" @successShareSource="successShareSource"></share-source>
        </a-modal>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="closeSourceDialog" class="ownModalBorder titDialog" title="关闭">
            <close-source :sourceId="sourceId" @cancelCloseSource="cancelCloseSource" @successCloseSource="successCloseSource"></close-source>
        </a-modal>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="assignUserDialog" class="ownModalBorder titDialog" title="指派员工">
            <assign-user :sourceId="sourceId" @cancelAssignUser="cancelAssignUser" @successAssignUser="successAssignUser"></assign-user>
        </a-modal>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1004px" v-model="addSourceDialog" class="ownModalBorder titDialog" :title="addSourceTitle">
            <add-source :fromType="fromType" :sourceId="sourceId" @cancelSave="cancelSave" @successSave="successSave"></add-source>
        </a-modal>
        <!-- 预览图片 -->
        <a-modal :visible="previewVisible" centered :footer="null" @cancel="cancelPreviewImage">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
import ShareSource from './shareSource';
import CloseSource from './closeSource';
import AssignUser from './assignUser';
import AddSource from './addSource';
import  * as API from '@/api/source';
import * as PublicAPI from '@/api/public';
import { moduleFieldConfigGet } from '@/api/decision';
import {listEnableDict} from "@/api/contract";
import { CURRENTDEPTID } from '@/store/mutation-types';
export default {
    name: "sourceDetails",
    props: {
        sourceId:{
            type: String,
            required:true,
        },
        clueHouseType:{
            type:Number,
            default:1,
        },
    },
    components: {
        ShareSource,
        CloseSource,
        AssignUser,
        AddSource,
    },
    data() {
        return {
            key:1,
            activekey: 1,
            isEdit: false,
            activeIndex: 0,
            sourceDetails:{
                clueType:1,
                name:'',
                phone:'',
                gender:1,
                comment:'',
                cityId:'',
                cityName:'',
                sourceChannelId:'',
                urgencyLevel:1,
                leasePeriod:2,
                locationInfo:'',
                minMoney:'',
                maxMoney:'',
                socialAccount:'',
            },
            cityList: [],                       //城市
            sourceChannelList:[],               //渠道来源
            urgencyLevelList:[
                {
                    id:1,
                    name:'紧急',
                    disabled:false,
                },
                {
                    id:2,
                    name:'一般',
                    disabled:false,
                },
                {
                    id:3,
                    name:'暂缓',
                    disabled:false,
                },
                {
                    id:4,
                    name:'更久',
                    disabled:false,
                },
            ],  //紧急程度
            demandLabel:'',                     //添加的其他需求
            followUpList:[],                    //跟进记录
            sharedList:[],                      //共享记录
            shareSourceDialog:false,        //显示共享线索池
            closeSourceDialog:false,        //是否显示关闭线索池
            assignUserDialog:false,         //显示指派员工
            addSourceDialog:false,          //添加线索池
            addSourceTitle:'激活潜在业主线索',               //添加线索池标题
            openAddFollowDetailFlag:false,                     //是否编写明细
            openShareSourceDialogFlag:false,                    //是否资源共享
            addFollowDetail:{
                content:'',
                isReserveBeltSee:0,
                type:1,                     //跟进方式【1、带看，2、来电，3、去电，4、来访，5、到访】
                reserveSeeTime:null,
                checked:false,
                followType:'带看',
                picIdList:[],
            },
            dateFormat: 'YYYY.MM.DD HH:mm',           //日期选择器格式
            copySourceDetails:{},                                        //原始数据
            copySourceDetailsList:[],
            fromType:3,                     //1、添加；2、修改；3、激活
            skeletonLoading:true,
            markList:[],
            showMoreOperate:false,          //是否显示更多按钮
            uploadParms: {
                bizId: '',
                bizType: 1,
                subBizType: '',
            },
            previewVisible:false,
            previewImage:'',
            houseObj:{
                cityId:'',
                cityName:'',
                fullAddress:'',
                decorationType:2,
                room: 2,
                livingRoom: 1,                  // 客厅（几客厅）
                kitchen: 1,                     // 厨房（几厨房）
                toilet: 1,                      // 卫生间（几卫生间）
                area:'',
                price:'',
                leasePeriod:'',
                isFree:0,
                picList:[],
                picIdList:[],
                lableList:[],
                roomTypeQuantity:'',
                roomQuantity:'',
            },
            houseIdList:[],
            houseLableList:[],
            demandLabelList:[],         //标签数组
            currentClickIndex:undefined,    //当前点击的列
            ownerCheck:{
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
                        default:undefined,     //初始值
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
                        default:undefined,     //初始值
                    },
                    room:{
                        required:0,     //是否必填
                        default:undefined,     //初始值
                    },
                    livingRoom:{
                        required:0,     //是否必填
                        default:undefined,     //初始值
                    },
                    kitchen:{
                        required:0,     //是否必填
                        default:undefined,     //初始值
                    },
                    toilet:{
                        required:0,     //是否必填
                        default:undefined,     //初始值
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
                        default:undefined,     //初始值
                    },
                },
            },
            maxLength:9,                       //图片上传最大张数
            typeList:[],
            item2_1: [],
            sendData2_1: {},
        }
    },
    created() {
        this.ownerClueListHouseLable();
        this.moduleFieldConfigGet();
        this.getTypeList();
    },
    mounted() {
      this.sendData2_1 = { //
        // 上传时附带的额外参数
        bizId: '', // 业务id
        bizType: 25, // 图片大类标识 租客
        subBizType: 1, // 图片子类标识 身份证正面
        orderIndex: 1 // 排序值
      }
    },
    methods: {
      getTypeList(){
        let params = 'a834b429ae2b4d1bab98c20191d77ecf';
        listEnableDict(params).then(res => {
          // console.log(res)
          if (res.code === "200") {
            this.typeList = res.data;
            if(this.typeList&&this.typeList.length>0){
              this.addFollowDetail.followType = this.typeList[0].name;
            }
          }
        })
      },
      //来自自定义搜索
      filterOption(inputValue,option){
        if(!inputValue){
          return true;
        }
        return option.componentOptions.children[0].text.indexOf(inputValue) > -1;
      },
        initDefault(){
            this.houseObj.lableList = [];
            this.houseObj.room = 2;
            this.houseObj.livingRoom = 1;
            this.houseObj.kitchen = 1;
            this.houseObj.toilet = 1;
            if(this.ownerCheck.deCentralizedHouse.decorationType.default){
                this.houseObj.decorationType = this.ownerCheck.deCentralizedHouse.decorationType.default;
            }
            if(this.ownerCheck.deCentralizedHouse.room.default){
                this.houseObj.room = this.ownerCheck.deCentralizedHouse.room.default;
            }
            if(this.ownerCheck.deCentralizedHouse.livingRoom.default){
                this.houseObj.livingRoom = this.ownerCheck.deCentralizedHouse.livingRoom.default;
            }
            if(this.ownerCheck.deCentralizedHouse.kitchen.default){
                this.houseObj.kitchen = this.ownerCheck.deCentralizedHouse.kitchen.default;
            }
            if(this.ownerCheck.deCentralizedHouse.toilet.default){
                this.houseObj.toilet = this.ownerCheck.deCentralizedHouse.toilet.default;
            }
            if(this.ownerCheck.deCentralizedHouse.area.default){
                this.houseObj.area = this.ownerCheck.deCentralizedHouse.area.default;
            }
            if(this.ownerCheck.deCentralizedHouse.isFree.default){
                this.houseObj.isFree = 1;
            }
            else{
                this.houseObj.isFree = 0;
            }
            if(this.ownerCheck.centralizedHouse.roomTypeQuantity.default){
                this.houseObj.roomTypeQuantity = this.ownerCheck.centralizedHouse.roomTypeQuantity.default;
            }
            if(this.ownerCheck.centralizedHouse.roomQuantity.default){
                this.houseObj.roomQuantity = this.ownerCheck.centralizedHouse.roomQuantity.default;
            }
            if(this.clueHouseType ==1){
                this.houseObj.clueHouseType = 1;
                if(this.ownerCheck.deCentralizedHouse.cityId.default){
                    this.houseObj.cityId = this.ownerCheck.deCentralizedHouse.cityId.default;
                }
                if(this.ownerCheck.deCentralizedHouse.price.default){
                    this.houseObj.price = this.ownerCheck.deCentralizedHouse.price.default;
                }
                if(this.ownerCheck.deCentralizedHouse.leasePeriod.default){
                    this.houseObj.leasePeriod = this.ownerCheck.deCentralizedHouse.leasePeriod.default;
                }
                if(this.ownerCheck.deCentralizedHouse.picList.default){
                    this.maxLength = Number(this.ownerCheck.deCentralizedHouse.picList.default);
                }
            }
            else if(this.clueHouseType ==2){
                this.houseObj.clueHouseType = 2;
                if(this.ownerCheck.centralizedHouse.cityId.default){
                    this.houseObj.cityId = this.ownerCheck.centralizedHouse.cityId.default;
                }
                if(this.ownerCheck.centralizedHouse.price.default){
                    this.houseObj.price = this.ownerCheck.centralizedHouse.price.default;
                }
                if(this.ownerCheck.centralizedHouse.leasePeriod.default){
                    this.houseObj.leasePeriod = this.ownerCheck.centralizedHouse.leasePeriod.default;
                }
                if(this.ownerCheck.centralizedHouse.picList.default){
                    this.maxLength = Number(this.ownerCheck.centralizedHouse.picList.default);
                }
            }
        },
        //获取初始化配置
        moduleFieldConfigGet(){
            let paramter ={
                features:'default',
                moduleMark:'crm.ownerClue',
                deptId:this.$ls.get(CURRENTDEPTID),
            };
            moduleFieldConfigGet(paramter).then(res=>{
                if(res&&res.data&&res.data.fieldsObj){
                    this.ownerCheck = res.data.fieldsObj;
                }
                this.getCity();
                this.getSourceChannel();
                this.initDefault();
                //紧急程度初始化
                if(this.ownerCheck.urgencyLevel.unEditable==1&&this.ownerCheck.urgencyLevel.default){
                    this.urgencyLevelList.forEach((item)=>{
                        if(item.id == this.ownerCheck.urgencyLevel.default){
                            item.disabled = false;
                        }
                        else{
                            item.disabled = true;
                        }
                    });
                } else{
                    this.urgencyLevelList.forEach((item)=>{
                        item.disabled = false;
                    });
                }
            });
        },
        removeDemandLabelList(item,index){
            let pos = this.sourceDetails.houseList[index].lableList.indexOf(item);
            if(pos > -1){
                this.sourceDetails.houseList[index].lableList.splice(pos,1);
            }
        },
        changeLabelList(list,itemTemp){
            let pos =list.indexOf(itemTemp);
            if(pos>-1){
                list.splice(pos,1);
            }
            else{
                if(list.length>=5){
                    return;
                }
                list.push(itemTemp);
            }
        },
        addDemandLabel(val,index){
            let value = this.demandLabelList[index];
            if(value){
                let pos = this.sourceDetails.houseList[index].lableList.indexOf(value)
                if(pos > -1){
                  this.$message.warning('该标签已存在，不可重复添加');
                }
                else{
                    this.sourceDetails.houseList[index].lableList.push(value);
                    this.demandLabelList[index]='';
                }
            }
        },
        deletePic(index){
            let param = 'housePicList'+index;
            let housePicList = [...this.$refs[param][0].picsList];
            this.copySourceDetailsList[index].picList = housePicList;
        },
        addHouse(){
            let obj = Object.assign({},this.houseObj);
            this.sourceDetails.houseList.push(obj);
            this.demandLabelList.push('');
        },
        deleteHouse(index){
            this.demandLabelList.splice(index,1);
            if (this.sourceDetails.houseList.length == 1) {
                this.$message.warning('不能再删咯！');
            }
            else{
                this.houseIdList.push(this.sourceDetails.houseList[index].id);
                this.sourceDetails.houseList.splice(index,1);
            }
        },
        cancelPreviewImage() {
            this.previewVisible = false;
        },
        handlePreview(file) {
          this.previewImage = file.url || file.origin;
          this.previewVisible = true;
        },
        changeIsFree(value,item){
            if(value.target.checked){
                item.isFree = 1;
            }
            else{
                item.isFree = 0;
            }
        },
        //获取小区地址相关
        getCity(){
            PublicAPI.getCityList().then(res=>{
                this.cityList = res.data;
                this.houseObj.cityId = this.cityList[0].id;
                this.houseObj.cityName = this.cityList[0].name;
            })
        },
        ownerClueListHouseLable(){
            API.ownerClueListHouseLable().then(res=>{
                this.houseLableList = res.data;
            })
        },
        getSourceChannel(){
            API.getSourceChannel().then(res=>{
                this.sourceChannelList = res.data;
                if(this.ownerCheck.sourceChannelId.unEditable==1&&this.ownerCheck.sourceChannelId.default){
                    this.sourceChannelList&&this.sourceChannelList.forEach((item)=>{
                        if(item.id==this.ownerCheck.sourceChannelId.default){
                            item.disabled = false;
                        }
                        else{
                            item.disabled = true;
                        }
                    });
                }
                else{
                    this.sourceChannelList&&this.sourceChannelList.forEach((item)=>{
                        item.disabled = false;
                    });
                }
                this.initData();
            })
        },
        initData(){
            this.enterClueView();
            if(this.activekey == 1){
                this.listFollowUp();
            }
            else{
                this.listShared();
            }
        },
        enterClueView(){
            this.skeletonLoading = true;
            this.copySourceDetailsList = [];
            API.ownerClueView(this.sourceId).then(res=>{
                this.sourceDetails = res.data;
                //默认值不显示问题处理
                if(!this.sourceDetails.urgencyLevel){
                    this.sourceDetails.urgencyLevel = undefined;
                }
                if(!this.sourceDetails.sourceChannelId){
                    this.sourceDetails.sourceChannelId = undefined;
                }
                this.copySourceDetails = Object.assign({}, this.sourceDetails);
                this.uploadParms = {
                    bizId: this.sourceId,
                    bizType: 1,
                    subBizType: '',
                }
                if(this.sourceDetails.houseList.length == 0){
                    this.sourceDetails.houseList.push(this.houseObj);
                }
                else {
                    this.demandLabelList = [];
                    this.sourceDetails.houseList.forEach((item) => {
                        item.price = item.price / 100;
                        item.checked = (item.isFree == 1);
                        if (item.picList == null) {
                            item.picList = [];
                        }
                        else {
                            for (let i = 0; i < item.picList.length; i++) {
                                item.picList[i].status = 'done';
                                let subBizType = item.picList[i].subBizType;
                                if (subBizType == 3) {
                                    item.picList[i].fileOriginName = '卧室';
                                } else if (subBizType == 4) {
                                    item.picList[i].fileOriginName = '客厅';
                                } else if (subBizType == 5) {
                                    item.picList[i].fileOriginName = '厨房';
                                } else if (subBizType == 6) {
                                    item.picList[i].fileOriginName = '卫生间';
                                } else if (subBizType == 7) {
                                    item.picList[i].fileOriginName = '阳台';
                                } else if (subBizType == 8) {
                                    item.picList[i].fileOriginName = '吧台';
                                } else if (subBizType == 2) {
                                    item.picList[i].fileOriginName = '户型图';
                                } else if (subBizType == 10) {
                                    item.picList[i].fileOriginName = '环境';
                                } else if (subBizType == 11) {
                                    item.picList[i].fileOriginName = '其他';
                                } else {
                                    item.picList[i].fileOriginName = '-';
                                }
                            }
                        }
                        if(!item.decorationType){
                            item.decorationType = undefined;
                        }
                        let temp = Object.assign({}, item);
                        this.copySourceDetailsList.push(temp);
                        this.demandLabelList.push('');
                    });
                }
                //按钮显示处理
                this.markList = [];
                if(this.sourceDetails.clueType == 1){
                    //私客
                    JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                        if (value.mark == "mk_source_owner_bj"||value.mark == "mk_source_owner_zp"||value.mark == "mk_source_owner_gb"||value.mark == "mk_source_owner_zrgp"||value.mark == "mk_source_owner_gxzy"){
                            this.markList.push(value.mark);
                        }
                    });
                }
                else if(this.sourceDetails.clueType == 2){
                    //公客
                    JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                        if (value.mark == "mk_source_owner_gp_bj" || value.mark == "mk_source_owner_gp_zrsp" || value.mark == "mk_source_owner_gp_zp" || value.mark == "mk_source_owner_gp_gb" || value.mark == "mk_source_owner_gp_gxzy") {
                            this.markList.push(value.mark);
                        }
                    });
                }
                if(this.markList.length > 4){
                    this.showMoreOperate = true;
                }
                else{
                    this.showMoreOperate = false;
                }

                this.skeletonLoading = false;
            })
        },
        listFollowUp(){
            API.ownerClueListFollowUp(this.sourceId).then(res=>{
                this.followUpList = res.data;
            })
        },
        listShared(){
            API.ownerClueListSharedByOwnerClue(this.sourceId).then(res=>{
                this.sharedList = res.data;
            })
        },
        selectCity(val){
            this.sourceDetails.cityId = val;
            for (let i = 0; i < this.cityList.length; i++) {
                if(this.cityList[i].id == val){
                    this.sourceDetails.cityName = this.cityList[i].name;
                }
            }
        },
        priceReg1(e) {
            // 通过正则过滤小数点后两位
            let a = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
            this.sourceDetails.minMoney = a;
            e.target.value = a;
        },
        priceReg2(e) {
            // 通过正则过滤小数点后两位
            let a = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
            this.sourceDetails.maxMoney = a;
            e.target.value = a;
        },
        deleteChild() {
            let _this = this;
            let id = this.sourceDetails.id
            this.$modal.confirm({
                title: '确定要删除潜在业主线索 「' + this.sourceDetails.name + '/' + this.sourceDetails.phone + '」 的信息吗？',
                content: '删除后将不可恢复',
                okText: '确定',
                cancelText: '取消',
                icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
                onOk() {
                    API.ownerClueRemove({id:id}).then(res => {
                        if (res.code == 200) {
                            _this.$message.success('操作成功！');
                            _this.$emit('refreshinfoFun', true);
                            setTimeout(() => {
                                _this.$emit('deleteRefrsh');
                            }, 500)
                        }
                    })
                },
                onCancel() {
                },
            });
        },
        editData() {
            this.isEdit = !this.isEdit;
            this.sourceDetails.phone = this.sourceDetails.originPhone;
            this.sourceDetails.socialAccount = this.sourceDetails.originSocialAccount;
        },
        save() {
            let checkFlag = this.checkData();
            if(!checkFlag){
                return;
            }
            let data = Object.assign({}, this.sourceDetails);
            //公客加密问题处理
            if(this.sourceDetails.clueType == 2){
                if(this.sourceDetails.phone == this.copySourceDetails.phone) {
                    data.phone = this.sourceDetails.originPhone;
                }
                if(this.sourceDetails.socialAccount){
                    if(this.sourceDetails.socialAccount == this.copySourceDetails.socialAccount){
                        data.socialAccount = this.sourceDetails.originSocialAccount;
                    }
                }
            }
            data.id = this.sourceId;
            let houseList = [];
            let exsitFullAddressNull = false;
            data.houseList.forEach((item,index)=>{
                let temp = Object.assign({}, item);
                temp.price =  Math.round(temp.price * 100);
                let param = 'housePicList'+index;
                let housePicList = [...this.$refs[param][0].picsList];
                let picIdLists=[];
                if(housePicList && housePicList.length > 0) {
                    housePicList.forEach((val) => {
                        picIdLists.push(val.id)
                    })
                }
                temp.picIdList = picIdLists;
                if(!item.fullAddress){
                    exsitFullAddressNull = true;
                }
                houseList.push(temp);
            });
            data.houseList = houseList;
            if(exsitFullAddressNull){
                this.$message.warning('系统检测到您有房源地址未完善，请先完善房源地址');
                return;
            }
            data.houseIdList = this.houseIdList;
            API.ownerClueEdit(data).then(res => {
                if (res.code === '200') {
                    this.$message.success('修改成功');
                    this.houseIdList = [];
                    this.$emit('refreshinfoFun', true);
                } else {
                    this.$message.success('修改失败');
                }
                this.isEdit = !this.isEdit;
                this.initData();
            });
        },
        cancelEdit() {
            this.isEdit = !this.isEdit;
            this.sourceDetails = Object.assign({}, this.copySourceDetails);
            this.sourceDetails.houseList = this.copySourceDetailsList;
        },
        handleCallback(val) {
            this.activekey = val;
            if(this.activekey == 1){
                this.listFollowUp();
            }
            else{
                this.listShared();
            }
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
        checkData() {
            //必填检验
            if(!this.sourceDetails.name){
                this.$message.error('请填写业主姓名');
                return false;
            }
            if(!this.sourceDetails.phone){
                this.$message.error('请填写业主电话');
                return false;
            }
            this.lastCheck = true;
            if (!this.sourceDetails.name) {
                this.$message.error('请输入姓名!');
                return false;
            }
            if(this.sourceDetails.clueType == 2) {
                if (this.sourceDetails.phone != this.copySourceDetails.phone) {
                    if (this.checkPhone(this.sourceDetails.phone)) {
                        // 这个是判断字段传的是否正确  电话号码
                        return false;
                    }
                }
            }
            //检验初始化的字段
            if(!this.sourceDetails.socialAccount&&this.ownerCheck.socialAccount.required==1){
                this.$message.warning('请输入其他联系方式');
                return false;
            }
            if(!this.sourceDetails.sourceChannelId&&this.ownerCheck.sourceChannelId.required==1){
                this.$message.warning('请选择来源');
                return false;
            }
            if(!this.sourceDetails.urgencyLevel&&this.ownerCheck.urgencyLevel.required==1){
                this.$message.warning('请选择紧急程度');
                return false;
            }
            if(this.sourceDetails.clueHouseType == 1){
                let temp = false;
                this.sourceDetails.houseList.forEach((item)=>{
                    if(!item.cityId&&this.ownerCheck.deCentralizedHouse.cityId.required==1){
                        temp = true;
                    }
                    if(!item.fullAddress&&this.ownerCheck.deCentralizedHouse.fullAddress.required==1){
                        temp = true;
                    }
                    if(!item.decorationType&&this.ownerCheck.deCentralizedHouse.decorationType.required==1){
                        temp = true;
                    }
                    if(!item.room&&this.ownerCheck.deCentralizedHouse.room.required==1){
                        temp = true;
                    }
                    if(!item.livingRoom&&this.ownerCheck.deCentralizedHouse.livingRoom.required==1){
                        temp = true;
                    }
                    if(!item.kitchen&&this.ownerCheck.deCentralizedHouse.kitchen.required==1){
                        temp = true;
                    }
                    if(!item.toilet&&this.ownerCheck.deCentralizedHouse.toilet.required==1){
                        temp = true;
                    }
                    if(!item.area&&this.ownerCheck.deCentralizedHouse.area.required==1){
                        temp = true;
                    }
                    if(!item.price&&this.ownerCheck.deCentralizedHouse.price.required==1){
                        temp = true;
                    }
                    if(!item.leasePeriod&&this.ownerCheck.deCentralizedHouse.leasePeriod.required==1){
                        temp = true;
                    }
                    if(!item.picList&&this.ownerCheck.deCentralizedHouse.picList.required==1){
                        temp = true;
                    }
                })
                if(temp){
                    this.$message.warning('请完善委托房源信息');
                    return false;
                }
            }
            else if(this.sourceDetails.clueHouseType == 2){
                let temp = false;
                this.sourceDetails.houseList.forEach((item)=>{
                    if(!item.cityId&&this.ownerCheck.centralizedHouse.cityId.required==1){
                        temp = true;
                    }
                    if(!item.fullAddress&&this.ownerCheck.centralizedHouse.fullAddress.required==1){
                        temp = true;
                    }
                    if(!item.roomTypeQuantity&&this.ownerCheck.centralizedHouse.roomTypeQuantity.required==1){
                        temp = true;
                    }
                    if(!item.roomQuantity&&this.ownerCheck.centralizedHouse.roomQuantity.required==1){
                        temp = true;
                    }
                    if(!item.price&&this.ownerCheck.centralizedHouse.price.required==1){
                        temp = true;
                    }
                    if(!item.leasePeriod&&this.ownerCheck.centralizedHouse.leasePeriod.required==1){
                        temp = true;
                    }
                    if(!item.picList&&this.ownerCheck.centralizedHouse.picList.required==1){
                        temp = true;
                    }
                });
                if(temp){
                    this.$message.warning('请完善委托项目信息');
                    return false;
                }
            }
            if(!this.sourceDetails.comment&&this.ownerCheck.comment.required==1){
                this.$message.warning('请输入备注');
                return false;
            }
            return true;
        },
        addSource() {
            this.addSourceDialog = true;
        },
        cancelSave(){
            this.addSourceDialog = false;
        },
        successSave(sourceId){
            this.addSourceDialog = false;
            //this.initData();
            this.$emit('changeSourceId', sourceId);
            this.$emit('refreshinfoFun', true);
        },
        cancelCloseSource(){
            this.closeSourceDialog = false;
        },
        successCloseSource(){
            this.closeSourceDialog = false;
            this.initData();
            this.$emit('refreshinfoFun', true);
        },
        cancelAssignUser(){
            this.assignUserDialog = false;
        },
        successAssignUser(){
            this.assignUserDialog = false;
            this.initData();
            this.$emit('refreshinfoFun', true);
        },
        openAssignUser(){
            this.sourceId = this.sourceId;
            this.assignUserDialog = true;
        },
        cancelShareSource(){
            this.shareSourceDialog = false;
        },
        successShareSource(){
            this.shareSourceDialog = false;
            this.initData();
            this.$emit('refreshinfoFun', true);
        },
        openCloseSource(){
            this.sourceId = this.sourceId;
            this.closeSourceDialog = true;
        },
        openShareSource(){
            this.sourceId = this.sourceId;
            this.shareSourceDialog = true;
        },
        changePrivate(){
            let _this = this;
            this.$modal.confirm({
                title: '确定要将潜在业主线索 「 ' + this.sourceDetails.name+'/'+this.sourceDetails.phone + ' 」 转入私盘吗',
                content: '转入后，会在您的私盘新增一条记',
                width:"433px",
                height:"192px",
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    API.ownerClueTurnPrivate({id:_this.sourceId}).then(res=>{
                        if (res.code === '200') {
                            _this.$message.success('转入私盘成功');
                            _this.initData();
                            _this.$emit('refreshinfoFun', true);
                        } else {
                            _this.$message.success('转入私盘失败');
                            _this.initData();
                        }
                    })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        },
        changPublic(){
            let _this = this;
            this.$modal.confirm({
                title: '确定要将潜在业主线索 「 ' + this.sourceDetails.name+'/'+this.sourceDetails.phone + ' 」 转入公盘吗？',
                content: '转入后，公司所有人员都可查看到',
                width:"433px",
                height:"192px",
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    API.ownerClueTurnPub({id:_this.sourceId}).then(res=>{
                        if (res.code === '200') {
                            _this.$message.success('转入公盘成功');
                            _this.initData();
                            _this.$emit('refreshinfoFun', true);
                        } else {
                            _this.$message.success('转入公盘失败');
                            _this.initData();
                        }
                    })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        },
        openAddFollowDetail(){
            this.addFollowDetail.type = 1;
            this.addFollowDetail.content = "";
            this.addFollowDetail.isReserveBeltSee = 0;
            this.addFollowDetail.reserveSeeTime = null;
            this.openAddFollowDetailFlag = true;
            this.addFollowDetail.checked = false;
            if(this.$refs.img2_1){
              this.$refs.img2_1.picsList = [];
            }
            this.addFollowDetail.picIdList = [];
            this.$nextTick(() => {
              document.getElementById('addFollowDetailContent').focus();
            });
        },
        closeAddFollowDetail(){
            this.addFollowDetail.type = 1;
            this.addFollowDetail.content = "";
            this.addFollowDetail.isReserveBeltSee = 0;
            this.addFollowDetail.reserveSeeTime = null;
            this.openAddFollowDetailFlag = false;
        },
        onOk(value) {
            console.log('onOk: ', value);
        },
        onChange(e) {
            if(e.target.checked){
                this.addFollowDetail.isReserveBeltSee = 1;
            }
            else{
                this.addFollowDetail.isReserveBeltSee = 0;
            }
        },
        changeTypeName(item){
          this.addFollowDetail.followType = item.name;
        },
        addFollow(){
            this.addFollowDetail.ownerClueId = this.sourceId;
            if (this.$refs.img2_1&&this.$refs.img2_1.picsList.length != 0) {
              let picsIdList = [];
              this.$refs.img2_1.picsList.forEach((item)=>{
                picsIdList.push(item.id);
              });
              this.addFollowDetail.picIdList = picsIdList;
            }
            API.ownerClueFollowUp(this.addFollowDetail).then(res=>{
                if (res.code === '200') {
                    this.$emit('refreshinfoFun', true);
                    this.initData();
                } else {
                    this.initData();
                }
                this.openAddFollowDetailFlag = false;
            })
        },
    },
    filters: {
        urgencyLevelVal(val) {
            return val == 1 ? '紧急' : val == 2 ? '一般' : val == 3 ? '暂缓' : val == 4 ? '更久' : '-';
        },
        blankVal(val){
            if(!val){
                return '-';
            }else{
                return  val;
            }
        },
    },
    watch:{
        sourceId(){
            this.initData();
        },
    }
}
</script>

<style scoped lang="less">
.source-detail-box {
    width: 1000px;
    background: rgba(247,248,251,1);
    position:relative;
    & /deep/ .form-input-item{
        margin-top: 10px;
    }
    & /deep/ .input-item-box{
        margin-top: 2px;
    }

    .line{
        width: 100%;
        border: 0.5px solid #DDDDDD;
    }
    .left-detail {
        width: 640px;
        height: calc(100vh - 100px);
        overflow: auto;
        background: #FFFFFF;
        .top {
            padding: 20px 20px 0 20px;
            .title {
                display: flex;
                align-items: center;
                width: 138px;
                margin-top: 25px;
                height: 75px;
                padding-bottom: 10px;
                border-right: 1px dashed @borderColor;
                .radius-font {
                    width: 44px;
                    height: 44px;
                    line-height: 44px;
                    border-radius: 50%;
                    font-size:28px;
                }
                .status2 {
                    background: rgba(10, 135, 248, 0.1);
                    color: #0A87F8;
                }

                .status {
                    background: rgba(119, 119, 119, 0.1);
                    color: #777777;
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
                    margin-bottom: 20px;
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
                            font-size:14px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(17,17,17,1);
                      }
                    }
                    .itemLableStyle{
                        color: #111111;
                        font-size: 12px;
                        background: #F0F8FF;
                        border-radius:4px;
                        height: 22px;
                        line-height: 22px;
                        padding: 0 5px;
                        margin-bottom: 5px;
                    }
                }
                .blank-box {
                    width: 30px;
                    height: 30px;
                }
            }
        }

        .tabs-content {
            & /deep/ .ant-tabs-bar{
                margin: 0 18px;
            }
            // padding: 0 18px;
            .basic-info {
                padding: 0 18px;
                // min-height: 410px;
                // min-height: calc(100vh - 282px);
                .input-info {
                    display: flex;
                    flex-wrap: wrap;
                    .addon-after-position {
                        position: absolute;
                        top: 4px;
                        z-index: 2;
                        font-size: 12px;
                    }
                    .margin1{
                        margin-right: 30px;
                    }
                    margin2{
                        margin-right: 20px;
                    }
                    .item {
                        width: 180px;
                        margin-bottom: 20px;
                        & /deep/ .title {
                            margin-bottom: 4px;
                        }
                        & /deep/ .ant-select {
                            width: 100%;
                        }
                        .itemLableStyle{
                            color: #111111;
                            font-size: 12px;
                            background: #F0F8FF;
                            border-radius:4px;
                            height: 22px;
                            line-height: 22px;
                            padding: 0 5px;
                            margin-right: 5px;
                        }
                        .poperLabelStyle2{
                            position: absolute;
                            padding: 10px 10px 10px 10px;
                            width:568px;
                            min-height:60px;
                            top:64px;
                            background:rgba(255,255,255,1);
                            box-shadow:0px 2px 10px 0px rgba(0,0,0,0.1);
                            border-radius:4px;
                            border:1px solid rgba(238,238,238,1);
                            z-index: 99;
                        }
                        .selectDemandLabelItem{
                            height: 24px;
                            line-height: 24px;
                            padding: 0 5px;
                            font-size: 12px;
                            color: #111111;
                            border-radius:4px;
                            margin-top: 8px;
                            margin-right: 5px;
                            text-align:center;
                            background:#F0F8FF;
                        }
                    }
                    .closeDosh{
                        width: 100%;
                        height: 2px;
                        border-bottom: 1px dashed #DDDDDD;
                    }
                    .closeTitle{
                        height: 20px;
                        width: 100%;
                        margin: 20px 0;
                        font-size: 16px;
                        color: #111111;
                        font-weight: 500;
                    }
                    .room-img-list {
                        >div {
                            height: 116px;
                            width: 174px;
                            margin-right: 10px;
                            >div{
                                width: 100%;
                                height: 100%;
                                line-height: 116px;
                                border: 1px solid #eeeeee;
                                background-color: #f6f7f8;
                                text-align: center;
                                border-radius: 6px;
                                overflow: hidden;
                                img {
                                    width: auto;
                                    max-width: 174px;
                                    height: auto;
                                    max-height: 116px;
                                    overflow: hidden;
                                }
                            }
                        }
                        >div:last-child{
                            margin-right: 0px;
                        }
                    }
                    & /deep/ .label-item textarea.ant-input {
                        padding-left: 5px;
                    }
                }
                .addHouse{
                    width: 100%;
                    font-size:14px;
                    color:#0A87F8;
                    border: 1px dashed #DDDDDD;
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    margin: 0 auto;
                    i{
                        vertical-align: -0.125em;
                    }
                }
            }
        }
    }
    .right-detail{
        padding:0 20px 0 25px;
        width: 352px;
        height: calc(100vh - 100px);
        background: #FFFFFF;
        overflow: auto;
        /deep/ .ant-tabs-bar{
            margin: 0px;
            width: 302px;
        }
        &/deep/ .ant-tabs-nav .ant-tabs-tab{
            margin-right: 30px;
        }
        .content-follow{
            display: flex;
            justify-content: flex-start;
            .content-follow-type{
            width: 18px;
            .content-follow-left-line{
              margin: 0 0 0 9px;
              height: calc(100% - 18px);
              border-left: 0.5px dashed #AED4F5;
            }
            .content-follow-type1 {
              display: inline-block;
              margin-right: 10px;
              width: 20px;
              height: 20px;
              line-height: 20px ;
              border-radius: 50%;
              .content-follow-type2{
                margin:5px 0 0 5px;
                display: inline-block;
                width: 10px;
                height: 10px;
                line-height: 10px ;
                border-radius: 50%;
              }
            }
          }
            .content-follow-left{
                width: 32px;
                .content-follow-left-line{
                    margin: 0 0 0 16px;
                    height: calc(100% - 32px);
                    border-left: 0.5px dashed #AED4F5;
                }
            }
            .content-follow-right{
                margin-left: 10px;
                margin-bottom: 25px;
                width: 270px;
                .follow-right-line-one{
                    .name{
                        font-size: 14px;
                        color: #111111;
                        font-weight:400;
                    }
                    .date{
                        color: #777;
                        font-size: 12px;
                    }
                    .followType{
                      color: rgba(10, 135, 248);
                      font-size: 13px;
                      background: rgba(10, 135, 248, 0.1);
                      padding: 0px 4px;
                      border-radius: 4px;
                      margin-left: 4px;
                    }
                }
                .follow-right-line-two{
                    font-size: 13px;
                    color: #999999;
                }
                .follow-info{
                    margin-top: 2px;
                    padding:4px 0 4px 6px;
                    width: 269px;
                    min-height: 18px;
                    line-height:18px;
                    background-color: rgba(247,248,251,1);
                    color: #777777;
                    font-size: 12px;
                }
                .name{
                    color: #111111;
                    font-size: 14px;
                }
                .img-list {
                >div {
                  height: 47px;
                  width: 85px;
                  margin-right: 5px;
                  margin-bottom: 5px;
                  >div{
                    width: 100%;
                    height: 100%;
                    line-height: 47px;
                    border: 1px solid #eeeeee;
                    background-color: #f6f7f8;
                    text-align: center;
                    border-radius: 6px;
                    overflow: hidden;
                    img {
                      width: auto;
                      max-width: 85px;
                      height: auto;
                      max-height: 47px;
                      overflow: hidden;
                    }
                  }
                }
                >div:last-child{
                  margin-right: 0px;
                }
              }
            }
        }
        .skeletonLoadingListStyle{
            width: 100%;
        }
    }
    .add-follow-panel {
        width: 332px;
        position: absolute;
        bottom: 0px;
        border-bottom: 10px solid #FFFFFF;
        right: 10px;

        .add-follow {
            background-color: #FFFFFF;
            border: 1px solid #DDDDDD;
            width: 332px;
            height: 40px;
            line-height: 40px;
            padding: 0px 10px 0 10px;
        }

        .add-follow-detail {
            border: 1px solid #DDDDDD;
            width: 332px;
            padding: 0px 10px 0 10px;
            background-color: #FFFFFF;
            border-radius: 4px;
            .followType {
                border-bottom: 1px solid #EEEEEE;
                padding-bottom: 10px;
                .normal {
                    padding: 0 5px;
                    height: 24px;
                    line-height: 24px;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 4px;
                    border: 1px solid rgba(221, 221, 221, 1);
                    color: #111111;
                    font-size: 13px;
                    margin-right: 8px;
                    text-align: center;
                    margin-top: 10px;
                }

                .click {
                    padding: 0 5px;
                    height: 24px;
                    line-height: 24px;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 4px;
                    border: 1px solid rgba(10, 135, 248, 1);
                    color: #0A87F8;
                    font-size: 13px;
                    margin-right: 8px;
                    text-align: center;
                    margin-top: 10px;
                }
            }

            .send {
                width: 54px;
                height: 22px;
                background: rgba(10, 135, 248, 1);
                border-radius: 4px;
                color: #FFFFFF;
                font-size: 14px;
                text-align: center;
            }
            .picStyle{
              /deep/ .file-list{
                margin: 0 5px 10px 0
              }
              /deep/ .enclosure{
                width: 100px;
                height: 63px;
              }
              /deep/ .ant-upload.ant-upload-select-picture-card{
                width: 100px;
                height: 63px;
              }
              /deep/ .file-list .enclosure-img-list{
                width: 100px;
                height: 63px;
                margin-right: 5px;
                border: 1px solid #eeeeee;
              }
              /deep/ .file-list .enclosure-img-list > div{
                border:none;
              }
              /deep/ .file-list .enclosure-img-list > div img{
                width: auto;
                max-width: 100px;
                height: auto;
                max-height: 63px;
                overflow: hidden;
                vertical-align:baseline;
              }
            }
            .isReserveBeltSee {
                & /deep/ .ant-input {
                    width: 155px;
                    padding: 4px 6px;
                }
            }

            & /deep/ .label-item textarea.ant-input {
                max-height: 100px;
            }
        }
    }
    .bottom {
        margin: 0 20px;
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
    .tabs-options {
        font-size: 0;
        cursor: pointer;
        div {
            display: inline-block;
            font-size: 14px;
            color: #0a87f8;
            span {
                margin-right: 14px;
            }
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
    }
    .demandLabelAll{
        width:100%;
        padding-bottom: 10px;
        line-height: 40px;
        background:rgba(247,248,251,1);
        .demandLabelItem{
            width: 63px;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            border-radius:4px;
            border:1px solid rgba(221,221,221,1);
            margin-right: 10px;
            margin-top: 10px;
            text-align:center;
        }
        .normalBg{
            background:rgba(246,247,248,1);
        }
        .clickBg{
            background:rgba(226,237,248,1);
        }
        border-top: 1px solid #DDDDDD;
    }
    & /deep/ .ant-tabs-nav .ant-tabs-tab {
        margin: 0;
        padding: 8px 0;
    }
    & /deep/ .ant-input,
    .ant-select,
    .ant-checkbox-wrapper,
    .ant-select-dropdown {
        font-size: 12px;
        height: 24px;
        color: @mainFontColor;
    }
    /deep/ .ant-checkbox-wrapper span{
        padding-left: 4px;
    }
    /deep/ .ant-input{
        padding-left: 5px;
    }
    /deep/ .ant-select-selection-selected-value{
        padding-left: 5px;
    }
    & /deep/ .ant-select-selection__rendered{
        font-size: 12px;
        height: 24px;
        line-height: 24px;
        margin-left: 0px;
    }
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
    /deep/ .ant-select-selection--multiple .ant-select-selection__placeholder{
        margin-left: 0;
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
    & /deep/ .ant-popover {
        position: fixed;
        .ant-popover-inner-content {
            padding: 5px 0;
            width: 80px;
            .action {
                color: #111111;
                width: 100%;
                height: 36px;
                line-height: 36px;
            }
            .action:hover {
                color: #0a87f8;
                cursor: pointer;
                background: rgba(10, 135, 248, 0.1);
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
    /deep/ .ant-select-selection__placeholder{
        padding-left: 5px;
    }
    /deep/ .ant-select-selection-selected-value{
        padding-right: 0;
    }
}
</style>
