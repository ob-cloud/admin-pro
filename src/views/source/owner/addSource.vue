<template>
    <div class="addSourceBox">
        <div class="clueType clearfix" v-mark="['mk_source_owner_tjzy']">
            <div v-mark="['mk_source_owner_gp_tjzy']">
                <div class="clueTypeLeft f-fl clearfix cursor" :class="clueType==1?'clickBorder clickBg':'normalBorder normalBg'" @click="changeClueType(1)">
                    <div class="name1 f-fl">私盘</div>
                    <div class="name2 f-fl">（他人不可见）</div>
                    <div class="triangle-top-right"
                         :class="clueType == 1 ?'choose-display-block':'choose-display-none'">
                    </div>
                    <icon-font class="triangle-top-right-choose"
                               :class="clueType == 1 ?'choose-display-block':'choose-display-none'"
                               type="iconyumengtubiao_xuanzhong-"/>
                </div>
                <div class="clueTypeLeft clueTypeRight f-fl clearfix cursor" :class="clueType==2?'clickBorder clickBg':'normalBorder normalBg'" @click="changeClueType(2)">
                    <div class="name1 f-fl">公盘</div>
                    <div class="name2 f-fl">（公司内共享）</div>
                    <div class="triangle-top-right"
                         :class="clueType == 2 ?'choose-display-block':'choose-display-none'">
                    </div>
                    <icon-font class="triangle-top-right-choose"
                               :class="clueType == 2 ?'choose-display-block':'choose-display-none'"
                               type="iconyumengtubiao_xuanzhong-"/>
                </div>
            </div>
        </div>
        <div class="basicInfo">
            <div class="title">基本信息</div>
            <div style="width: 100%" class="clearfix">
                <div class="name f-fl">
                    <label-item title="业主姓名" :mustFill="true">
                        <div class="u-bottom-border normalWidth">
                            <a-input v-model="addSourceForm.name" placeholder="请输入姓名" />
                        </div>
                        <div class="gender">
                            <span class="cursor" :style="gender==1?'color:#0A87F8':''" @click="changeGender(1)">先生</span>
                            <span class="cursor" :style="gender==2?'color:#0A87F8;margin-left:5px;':'margin-left:5px;'" @click="changeGender(2)">女士</span>
                        </div>
                    </label-item>
                </div>
                <div class="f-fl" style="margin-left: 30px">
                    <label-item title="业主电话" :mustFill="true">
                        <div class="u-bottom-border normalWidth">
                            <a-input v-model="addSourceForm.phone" :maxlength="11" @keyup.native="mixin_integerFilter('addSourceForm.phone')" @blur="checkPhone(addSourceForm.phone)" placeholder="请输入电话" />
                        </div>
                    </label-item>
                </div>
                <div class="f-fl" style="margin-left: 30px">
                    <label-item title="微信/QQ/其它" :mustFill="ownerCheck.socialAccount.required==1">
                        <div class="u-bottom-border normalWidth">
                            <a-input v-model="addSourceForm.socialAccount" placeholder="请输入其他联系方式" />
                        </div>
                    </label-item>
                </div>
                <div class="f-fl" style="margin-left: 30px">
                    <label-item title="来源" :mustFill="ownerCheck.sourceChannelId.required==1">
                        <div class="u-bottom-border normalWidth">
                            <a-select :showSearch="true" :filterOption="(inputValue,option)=>filterOption(inputValue,option)" v-model="addSourceForm.sourceChannelId" style="width:100%" placeholder="请选择">
                                <a-select-option v-for="(item) in sourceChannelList" :disabled="item.disabled" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
                            </a-select>
                        </div>
                    </label-item>
                </div>
                <div class="f-fl" style="margin-left: 30px">
                    <label-item title="紧急程度" :mustFill="ownerCheck.urgencyLevel.required==1">
                        <div class="u-bottom-border normalWidth">
                            <a-select v-model="addSourceForm.urgencyLevel" style="width:100%" placeholder="请选择">
                                <a-select-option v-for="(item,index) in urgencyLevelList" :key="index" :disabled="item.disabled" :value="item.id">{{item.name}}</a-select-option>
                            </a-select>
                        </div>
                    </label-item>
                </div>
            </div>
        </div>
        <div class="demandInfo">
            <div class="clearfix">
                <div class="title f-fl" style="margin-bottom: 11px;">委托信息</div>
                <div class="clearfix font16Style f-fl" style="margin-left: 20px;font-size: 14px;line-height: 27px;">
                    <div class="f-fl" v-if="addSourceForm.clueHouseType==1"><icon-font style="color: #0A87F8;margin-right: 5px;"  type="iconyumengtubiao_danxuan-yixuanze" />单套</div>
                    <div class="cursor f-fl" v-if="addSourceForm.clueHouseType==2" @click="changeClueHouseType(1)"><icon-font style="color: #777777;margin-right: 5px;"  type="iconyumengtubiao_danxuan-weixuanze" />单套</div>
                    <div class="f-fl" style="margin-left: 20px;" v-if="addSourceForm.clueHouseType==2"><icon-font style="color: #0A87F8;margin-right: 5px;" type="iconyumengtubiao_danxuan-yixuanze" />独栋(集中)</div>
                    <div class="cursor f-fl" style="margin-left: 20px;" v-if="addSourceForm.clueHouseType==1" @click="changeClueHouseType(2)"><icon-font style="color: #777777;margin-right: 5px;" type="iconyumengtubiao_danxuan-weixuanze" />独栋(集中)</div>
                </div>
                <div class="f-fr" style="margin-top: 5px">
                    <span style="color:#666666;font-size: 12px;margin-right: 10px;">已添加<span style="color: #0A87F8">{{addSourceForm.houseList.length}}</span>套</span>
                    <span class="cursor" style="color: #0A87F8;font-size: 14px" @click="addHouse">继续添加</span>
                </div>
            </div>
            <div class="house-list" v-if="addSourceForm.clueHouseType==1">
                <div class="house-item">
                    <div class="house-detail">
                        <div class="house-title">
                            <div style="max-width: 228px;text-align: left;padding-left: 10px">房源地址<span class="mustFillStyle">*</span></div>
                            <div style="max-width: 94px;text-align: left;padding-left: 10px">装修状况<span v-if="ownerCheck.deCentralizedHouse.decorationType.required==1" class="mustFillStyle">*</span></div>
                            <div style="max-width: 35px;text-align: center;" >室<span v-if="ownerCheck.deCentralizedHouse.room.required==1" class="mustFillStyle">*</span></div>
                            <div style="max-width: 35px;text-align: center;">厅<span v-if="ownerCheck.deCentralizedHouse.livingRoom.required==1" class="mustFillStyle">*</span></div>
                            <div style="max-width: 35px;text-align: center;">厨<span v-if="ownerCheck.deCentralizedHouse.kitchen.required==1" class="mustFillStyle">*</span></div>
                            <div style="max-width: 35px;text-align: center;">卫<span v-if="ownerCheck.deCentralizedHouse.toilet.required==1" class="mustFillStyle">*</span></div>
                            <div style="max-width: 75px;text-align: left;padding-left: 11px;">面积<span v-if="ownerCheck.deCentralizedHouse.area.required==1" class="mustFillStyle">*</span></div>
                            <div style="max-width: 83px;text-align: left;padding-left: 11px;">期望租金<span v-if="ownerCheck.deCentralizedHouse.price.required==1" class="mustFillStyle">*</span></div>
                            <div style="max-width: 90px;text-align: left;padding-left: 11px;">期望委托年限<span v-if="ownerCheck.deCentralizedHouse.leasePeriod.required==1" class="mustFillStyle">*</span></div>
                            <div style="max-width: 102px;text-align: left;padding-left: 11px;">是否接受免租期<span v-if="ownerCheck.deCentralizedHouse.isFree.required==1" class="mustFillStyle">*</span></div>
                            <div style="max-width: 94px;text-align: left;padding-left: 11px;">房源图片<span v-if="ownerCheck.deCentralizedHouse.picList.required==1" class="mustFillStyle">*</span></div>
                            <div style="max-width: 53px;text-align: center;">操作</div>
                        </div>
                        <div class="house-data u-no-border " v-for="(item,index) in addSourceForm.houseList" :key="index">
                            <div style="max-width: 228px" class="clearfix">
                                <a-select style="width: 65px;float: left;margin-left: 10px;height: 32px;line-height: 32px;margin-top: 4px;" v-model="item.cityId"  @change="(value)=>selectCity(value,index)">
                                    <a-select-option :value="temp.id" :key="temp.id" v-for="(temp) in cityList">{{ temp.name }}</a-select-option>
                                </a-select>
                                <a-input style="width: 150px;float: left;text-align: left;padding-left: 5px;margin-top: 3px;" :maxLength="20" class="f-fl" v-model="item.fullAddress" placeholder="详细地址" />
                            </div>
                            <div style="max-width: 94px">
                                <a-select style="width: 100%;padding: 0 10px;box-sizing: border-box"  v-model="item.decorationType">
                                    <a-select-option :value="2">精装</a-select-option>
                                    <a-select-option :value="4">毛坯</a-select-option>
                                    <a-select-option :value="3">简装</a-select-option>
                                    <a-select-option :value="1">豪华装</a-select-option>
                                </a-select>
                            </div>
                            <div style="max-width: 35px;">
                                <a-input style="text-align: center;" v-model="item.room" placeholder="请输入" />
                            </div>
                            <div style="max-width: 35px">
                                <a-input style="text-align: center;" v-model="item.livingRoom" placeholder="请输入" />
                            </div>
                            <div style="max-width: 35px">
                                <a-input style="text-align: center;" v-model="item.kitchen" placeholder="请输入" />
                            </div>
                            <div style="max-width: 35px;">
                                <a-input style="text-align: center;" v-model="item.toilet" placeholder="请输入" />
                            </div>
                            <div style="position: relative;max-width: 75px;padding-left: 11px;">
                                <a-input v-model="item.area" v-validate="'area'" placeholder="请输入" /><span style="position: absolute;right: 4px">㎡</span>
                            </div>
                            <div style="position: relative;max-width: 83px;padding-left: 11px;">
                                <a-input v-validate="'naturalNum|min(1)|max(999999999)'" v-model="item.price" placeholder="请输入"/><span style="position: absolute;right: 4px">元</span>
                            </div>
                            <div style="position: relative;max-width: 90px;padding-left: 11px;">
                                <a-input v-validate="'naturalNum|min(1)|max(50)'" maxlength="3" v-model="item.leasePeriod" placeholder="请输入"/><span style="position: absolute;right: 4px">年</span>
                            </div>
                            <div style="max-width: 102px;padding-left: 11px;">
                                <a-checkbox v-model="freeFlagCheckList[index].checked" @change="(value)=>changeIsFree(value,item)"><span style="color: #111111;">接受</span></a-checkbox>
                            </div>
                            <div style="max-width: 94px;padding-left: 11px;" @click="showPic(item.picList,index)" >
                                <a-popover placement="bottomRight" v-show="item.picList.length" >
                                    <template slot="content">
                                        <label-item title="房源图片">
                                            <ul class="pic-list" style="">
                                                <li v-for="(val,i) in item.picList" :key="i" >
                                                    <div><img :src="val.origin"/></div>
                                                    <span style="width: auto;padding: 2px 10px;margin-left: 6px">{{val.fileOriginName}}</span>
                                                </li>
                                            </ul>
                                        </label-item>
                                    </template>
                                    <p class="popover">
                                        <span :style="item.picList.length == 0?'color:#BBBBBB;':'color:#111111;'"> {{ item.picList.length == 0 ? '暂无图片' : `已上传${item.picList.length}张` }}</span>
                                        <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                    </p>
                                </a-popover>
                                <p class="popover" v-show="item.picList.length==0">
                                    <span style="color:#BBBBBB;">请上传图片</span>
                                    <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                </p>
                            </div>
                            <div style="max-width: 53px;text-align: center;">
                                <icon-font @click="deleteHouse(index)" class="delete-icon" type="iconyumengtubiao_shanchu-" v-if="addSourceForm.houseList.length>1"></icon-font>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="house-list" v-if="addSourceForm.clueHouseType==2">
                <div class="house-item">
                    <div class="house-detail">
                        <div class="house-title">
                            <div style="max-width: 228px;text-align: left;padding-left: 9px">项目地址<span class="mustFillStyle">*</span></div>
                            <div style="max-width: 76px;text-align: left;padding-left: 9px">房型数量<span v-if="ownerCheck.centralizedHouse.roomTypeQuantity.required==1" class="mustFillStyle">*</span></div>
                            <div style="max-width: 76px;text-align: left;padding-left: 9px">房间数量<span v-if="ownerCheck.centralizedHouse.roomQuantity.required==1" class="mustFillStyle">*</span></div>
                            <div style="max-width: 76px;text-align: left;padding-left: 9px">期望价格<span v-if="ownerCheck.centralizedHouse.price.required==1" class="mustFillStyle">*</span></div>
                            <div style="max-width: 90px;text-align: left;padding-left: 9px">期望委托年限<span v-if="ownerCheck.centralizedHouse.leasePeriod.required==1" class="mustFillStyle">*</span></div>
                            <div style="max-width: 110px;text-align: left;padding-left: 9px">项目图片<span v-if="ownerCheck.centralizedHouse.picList.required==1" class="mustFillStyle">*</span></div>
                            <div style="max-width: 250px;text-align: left;padding-left: 9px">标签(仅内部可见)</div>
                            <div style="max-width: 53px">操作</div>
                        </div>
                        <div class="house-data u-no-border " v-for="(item,index) in addSourceForm.houseList" :key="index">
                            <div style="max-width: 228px;padding-left: 9px" class="clearfix">
                                <a-select style="width: 65px;float: left;height: 32px;line-height: 32px;margin-top: 4px;" v-model="item.cityId"  @change="(value)=>selectCity(value,index)">
                                    <a-select-option :value="temp.id" :key="temp.id" v-for="(temp) in cityList">{{ temp.name }}</a-select-option>
                                </a-select>
                                <a-input style="width: 150px;float: left;text-align: left;padding-left: 5px;margin-top: 3px;" class="f-fl" v-model="item.fullAddress" :maxLength="20" placeholder="详细地址" />
                            </div>
                            <div style="position: relative;max-width: 76px;text-align: left;padding-left: 9px">
                                <a-input v-validate="'naturalNum|max(50)'" v-model="item.roomTypeQuantity" placeholder="请输入"/><span style="position: absolute;right: 4px">个</span>
                            </div>
                            <div style="position: relative;max-width: 76px;text-align: left;padding-left: 9px">
                                <a-input v-validate="'naturalNum|max(9999)'" v-model="item.roomQuantity" placeholder="请输入"/><span style="position: absolute;right: 4px">间</span>
                            </div>
                            <div style="position: relative;max-width: 76px;text-align: left;padding-left: 9px">
                                <a-input v-validate="'naturalNum|max(999999999)'" v-model="item.price" placeholder="请输入"/><span style="position: absolute;right: 4px">元</span>
                            </div>
                            <div style="position: relative;max-width: 90px;text-align: left;padding-left: 9px">
                                <a-input v-validate="'naturalNum|max(50)'" maxlength="3" v-model="item.leasePeriod" placeholder="请输入"/><span style="position: absolute;right: 4px">年</span>
                            </div>
                            <div style="max-width: 110px;text-align: left;padding-left: 11px" @click="showPic(item.picList,index)" >
                                <a-popover placement="bottomRight" v-show="item.picList.length" >
                                    <template slot="content">
                                        <label-item title="房源图片">
                                            <ul class="pic-list" style="">
                                                <li v-for="(val,i) in item.picList" :key="i" >
                                                    <div><img :src="val.origin"/></div>
                                                    <span style="width: auto;padding: 2px 10px;margin-left: 6px">{{val.fileOriginName}}</span>
                                                </li>
                                            </ul>
                                        </label-item>
                                    </template>
                                    <p class="popover">
                                        <span :style="item.picList.length == 0?'color:#BBBBBB;':'color:#111111;'"> {{ item.picList.length == 0 ? '暂无图片' : `已上传${item.picList.length}张` }}</span>
                                        <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                    </p>
                                </a-popover>
                                <p class="popover" v-show="item.picList.length==0">
                                    <span style="color:#BBBBBB;">请上传图片</span>
                                    <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                </p>
                            </div>
                            <div class="clearfix" style="position: relative;max-width: 250px;padding-left: 9px;" @mouseenter="currentIndex=index;" @mouseleave="currentIndex=undefined;">
                                <div v-for="(itemTemp,index2) in item.lableList" :key="index2" class="selectDemandLabelItem f-fl clearfix" v-if="item.lableList.length==1">
                                    <div class="f-fl overHideStyle" style="max-width: 80px;" v-if="index2==0">{{itemTemp}}</div>
                                    <icon-font style="color: #FB4246;margin-top: 6px;" class="cursor f-fl" @click="removeDemandLabelList(itemTemp,index)" type="iconyumengtubiao_guanbi-"/>
                                </div>
                                <div v-for="(itemTemp,index2) in item.lableList" :key="index2" class="selectDemandLabelItem f-fl clearfix" v-if="item.lableList.length>1&&index2==0">
                                    <div class="f-fl overHideStyle" style="max-width: 80px;">{{itemTemp}}</div>
                                    <div class="f-fl" style="margin:0 2px 0 8px;color: #777777">(+{{item.lableList.length - 1}})</div>
                                    <icon-font style="color: #FB4246;margin-top: 6px;" class="cursor f-fl" @click="removeDemandLabelList(itemTemp,index)" type="iconyumengtubiao_guanbi-"/>
                                </div>
                                <div class="f-fl" v-if="item.lableList.length<5"><a-input v-model="demandLabel[index]" style="text-align: left;" maxLength="10" @click="currentIndex=undefined;currentClickIndex=index" :style="item.lableList.length==0?'width:150px;':'width:100px;'" :placeholder="item.lableList.length==0?'可输入补充标签，回车添加':'继续输入回车添加'" @keyup.enter="value=>addDemandLabel(value,index)" /></div>
                                <div class="poperLabelStyle1" v-if="currentIndex==index&&item.lableList.length>0">
                                    <div v-for="(itemTemp,index3) in item.lableList" :key="index3" class="selectDemandLabelItem f-fl clearfix">
                                        <div class="f-fl">{{itemTemp}}</div>
                                        <icon-font style="color: #FB4246;margin-top: 6px;" class="cursor f-fl" @click="removeDemandLabelList(itemTemp,index)" type="iconyumengtubiao_guanbi-"/>
                                    </div>
                                </div>
                                <div class="poperLabelStyle2" v-if="currentClickIndex==index&&houseLableList.length>0" style="max-height: 200px;overflow-y: auto" @mouseenter="currentClickIndex=index" @mouseleave="currentClickIndex=undefined">
                                    <div style="width: 100%;font-size: 12px;color: #666666;line-height: 17px;margin: 12px 0 2px 0;">常用标签</div>
                                    <div v-for="(itemTemp,index3) in houseLableList" :key="index3" @click.stop="changeLabelList(item.lableList,itemTemp)" class="selectDemandLabelItem cursor f-fl clearfix" style="margin-top: 0;margin-bottom: 5px;" :style="item.lableList.indexOf(itemTemp)>-1?'':'background:#F4F4F4;'">
                                        <div class="f-fl">{{itemTemp}}</div>
                                    </div>
                                </div>
                            </div>
                            <div style="max-width: 53px;text-align: center">
                                <icon-font @click="deleteHouse(index)" class="delete-icon" type="iconyumengtubiao_shanchu-" v-if="addSourceForm.houseList.length>1"></icon-font>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <label-item
                    class="item u-bottom-border"
                    style="width: 100%;margin-top: 25px;"
                    title="备注" :mustFill="ownerCheck.comment.required==1"
                    :valLength="addSourceForm.comment.length"
                    :maxSize="500"
            >
                <a-textarea v-model="addSourceForm.comment"
                            maxlength="500"
                            placeholder="请输入"
                            :autosize="{ minRows: 1, maxRows: 5 }"
                />
            </label-item>
            <div class="buttonDiv">
                <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
                    取消
                </a-button>
                <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="saveSource" :loading="saveLoading">
                    保存
                </a-button>
            </div>
        </div>
        <a-modal title="编辑房源图片" centered v-model='showPicDialog'  width="588px" destroyOnClose class="ownModalBorder titDialog" @ok="savePic" okText="确认" cancelText="取消">
            <label-item  style="margin: 0 20px 20px 20px;max-height: calc(100vh - 230px);overflow: auto;overflow-x: hidden" title="房源图片" leftLine border class="u-bottom-border" >
                <own-upload :picList="picList" ref="publicPic" :maxLength="maxLength"></own-upload>
            </label-item>
        </a-modal>
    </div>
</template>

<script>
    import { moduleFieldConfigGet } from '@/api/decision';
    import * as PublicAPI from '@/api/public';
    import * as API from '@/api/source';
    import { CURRENTDEPTID } from '@/store/mutation-types';
    export default {
        name: "addSource",
        components: {
        },
        props: {
            sourceId:{
                type: String,
            },
            defalutClueType:{
                type:Number,
            },
            fromType:{
                type:Number,
                default:1,  //1、添加；2、修改；3、激活
            },
        },
        data() {
            return {
                clueType:1,
                gender:1,
                addSourceForm:{
                    clueType:1,
                    name:'',
                    gender:1,
                    phone:'',
                    socialAccount:'',
                    sourceChannelId:'',
                    urgencyLevel:1,
                    comment:'',
                    houseList:[{
                        cityId:'',
                        cityName:'',
                        fullAddress:'',
                        decorationType:2,
                        room: '',
                        livingRoom: '',                  // 客厅（几客厅）
                        kitchen: '',                     // 厨房（几厨房）
                        toilet: '',                      // 卫生间（几卫生间）
                        area:'',
                        price:'',
                        leasePeriod:'',
                        isFree:0,
                        picList:[],
                        picIdList:[],
                        lableList:[],
                    }],
                    clueHouseType:1,        //1、分散；2、集中
                },
                //获取小区地址相关
                cityList: [],
                communityList: [],
                searchCommunityVal: undefined,
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
                saveLoading:false,
                picList:[],
                showPicDialog:false,
                currentSelectHouseIndex:'',
                copyHouse:{},
                freeFlagCheckList:[
                    {checked:false}
                ],
                copyAddSourceForm:{},
                houseIdList:[],
                demandLabel:[],                     //添加的其他需求
                currentIndex:undefined,             //鼠标移入时所在的序号
                currentClickIndex:undefined,             //鼠标移入时所在的序号
                houseLableList:[],                  //集中常用标签
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
                            default:undefined,     //初始值
                        },
                    },
                },
                maxLength:24,                       //图片上传最大张数
            }
        },
        created() {
            // 获取租户的授权城市信息列表
            this.getCity();
            this.ownerClueListHouseLable();
            this.moduleFieldConfigGet();
        },
        methods: {
          //来自自定义搜索
          filterOption(inputValue,option){
            if(!inputValue){
              return true;
            }
            return option.componentOptions.children[0].text.indexOf(inputValue) > -1;
          },
            changeClueHouseType(val){
                this.addSourceForm.clueHouseType = val;
                if(val==1){
                    this.initDefault();
                }
                else if(val==2){
                    this.initDefault();
                }
                if(this.addSourceForm.houseList){
                    this.addSourceForm.houseList.forEach((item)=>{
                        if(!item.id){
                            if(item.cityId&&item.cityId!=this.cityList[0].id){
                                //存在并且不是城市第一个值，不清空
                            }
                            else{
                                if(this.copyHouse.cityId){
                                    item.cityId = this.copyHouse.cityId;
                                }
                            }
                            if(this.copyHouse.price){
                                item.price = this.copyHouse.price;
                            }
                            if(this.copyHouse.leasePeriod){
                                item.leasePeriod = this.copyHouse.leasePeriod;
                            }
                        }
                    });
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
                        //初始化默认值
                        if(this.ownerCheck.gender&&this.ownerCheck.gender.default){
                            this.gender = this.ownerCheck.gender.default;
                        }
                        if(this.ownerCheck.sourceChannelId&&this.ownerCheck.sourceChannelId.default){
                            this.addSourceForm.sourceChannelId = this.ownerCheck.sourceChannelId.default;
                        }
                        if(this.ownerCheck.urgencyLevel&&this.ownerCheck.urgencyLevel.default){
                            this.addSourceForm.urgencyLevel = this.ownerCheck.urgencyLevel.default;
                        }
                        //初始化默认值
                        this.initDefault();
                        this.addDefault(true);
                    }
                    else{
                        this.ownerCheck = {
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
                                    default:undefined,     //初始值
                                },
                            },
                        };
                    }
                    this.getSourceChannel();
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
            addDemandLabel(val,index){
                let value = this.demandLabel[index];
                if(value){
                    let pos = this.addSourceForm.houseList[index].lableList.indexOf(value)
                    if(pos > -1){
                      this.$message.warning('该标签已存在，不可重复添加');
                    }
                    else{
                        this.addSourceForm.houseList[index].lableList.push(value);
                        this.demandLabel[index]='';
                    }
                }
            },
            removeDemandLabelListLast(index) {
                this.addSourceForm.houseList[index].lableList.splice(this.addSourceForm.houseList[index].lableList.length-1,1);
            },
            removeDemandLabelList(item,index){
                let pos = this.addSourceForm.houseList[index].lableList.indexOf(item);
                if(pos > -1){
                    this.addSourceForm.houseList[index].lableList.splice(pos,1);
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
            changeIsFree(value,item){
               if(value.target.checked){
                   item.isFree = 1;
               }
               else{
                   item.isFree = 0;
               }
            },
            initDefault(){
                this.copyHouse.lableList = [];
                if(this.ownerCheck.deCentralizedHouse.decorationType.default){
                    this.copyHouse.decorationType = this.ownerCheck.deCentralizedHouse.decorationType.default;
                }
                if(this.ownerCheck.deCentralizedHouse.room.default){
                    this.copyHouse.room = this.ownerCheck.deCentralizedHouse.room.default;
                }
                if(this.ownerCheck.deCentralizedHouse.livingRoom.default){
                    this.copyHouse.livingRoom = this.ownerCheck.deCentralizedHouse.livingRoom.default;
                }
                if(this.ownerCheck.deCentralizedHouse.kitchen.default){
                    this.copyHouse.kitchen = this.ownerCheck.deCentralizedHouse.kitchen.default;
                }
                if(this.ownerCheck.deCentralizedHouse.toilet.default){
                    this.copyHouse.toilet = this.ownerCheck.deCentralizedHouse.toilet.default;
                }
                if(this.ownerCheck.deCentralizedHouse.area.default){
                    this.copyHouse.area = this.ownerCheck.deCentralizedHouse.area.default;
                }
                if(this.ownerCheck.deCentralizedHouse.isFree.default){
                    this.copyHouse.isFree = 1;
                }
                else{
                    this.copyHouse.isFree = 0;
                }
                if(this.ownerCheck.centralizedHouse.roomTypeQuantity.default){
                    this.copyHouse.roomTypeQuantity = this.ownerCheck.centralizedHouse.roomTypeQuantity.default;
                }
                if(this.ownerCheck.centralizedHouse.roomQuantity.default){
                    this.copyHouse.roomQuantity = this.ownerCheck.centralizedHouse.roomQuantity.default;
                }
                if(this.addSourceForm.clueHouseType ==1){
                    if(this.ownerCheck.deCentralizedHouse.cityId.default){
                        this.copyHouse.cityId = this.ownerCheck.deCentralizedHouse.cityId.default;
                    }
                    if(this.ownerCheck.deCentralizedHouse.price.default){
                        this.copyHouse.price = this.ownerCheck.deCentralizedHouse.price.default;
                    }
                    if(this.ownerCheck.deCentralizedHouse.leasePeriod.default){
                        this.copyHouse.leasePeriod = this.ownerCheck.deCentralizedHouse.leasePeriod.default;
                    }
                }
                else if(this.addSourceForm.clueHouseType ==2){
                    if(this.ownerCheck.centralizedHouse.cityId.default){
                        this.copyHouse.cityId = this.ownerCheck.centralizedHouse.cityId.default;
                    }
                    if(this.ownerCheck.centralizedHouse.price.default){
                        this.copyHouse.price = this.ownerCheck.centralizedHouse.price.default;
                    }
                    if(this.ownerCheck.centralizedHouse.leasePeriod.default){
                        this.copyHouse.leasePeriod = this.ownerCheck.centralizedHouse.leasePeriod.default;
                    }
                }
            },
            addDefault(firstFlag){
                let obj = Object.assign({},this.copyHouse);
                if(firstFlag){
                    this.addSourceForm.houseList = [];
                    this.freeFlagCheckList = [];
                }
                if(this.copyHouse.isFree==1){
                    this.freeFlagCheckList.push({checked:true});
                } else{
                    this.freeFlagCheckList.push({checked:false});
                }
                this.addSourceForm.houseList.push(obj);
                this.demandLabel.push('');
            },
            addHouse(){
                this.initDefault();
                this.addDefault(false);
            },
            deleteHouse(index){
                if (this.addSourceForm.houseList.length == 1) {
                    this.$message.warning('不能再删咯！');
                }
                else{
                    this.houseIdList.push(this.addSourceForm.houseList[index].id);
                    this.addSourceForm.houseList.splice(index,1);
                    this.freeFlagCheckList.slice(index,1);
                }
                this.demandLabel.splice(index,1);
            },
            showPic(list,houseIndex){
                this.showPicDialog = true;
                //获取最大张数
                if(this.addSourceForm.clueHouseType==1&&this.ownerCheck.deCentralizedHouse&&this.ownerCheck.deCentralizedHouse.picList&&this.ownerCheck.deCentralizedHouse.picList.default){
                    this.maxLength = Number(this.ownerCheck.deCentralizedHouse.picList.default);
                }
                else if(this.addSourceForm.clueHouseType==2&&this.ownerCheck.centralizedHouse&&this.ownerCheck.centralizedHouse.picList&&this.ownerCheck.centralizedHouse.picList.default){
                    this.maxLength = Number(this.ownerCheck.centralizedHouse.picList.default);
                }
                this.currentSelectHouseIndex = houseIndex;
                this.picList = [];
                this.picList.push(...list);
                this.picList.forEach((item)=>{
                    item.bizId = item.id;
                    item.notRealDelete = true;
                });
            },
            savePic(){
                let picList = [...this.$refs.publicPic.picsList];
                let houseIndex = this.currentSelectHouseIndex;
                let list = this.addSourceForm.houseList[houseIndex];
                list.picList = picList;
                this.showPicDialog = false;
            },
            changeClueType(val){
                this.clueType = val;
                this.addSourceForm.clueType = val;
            },
            changeGender(val){
                this.gender = val;
                this.addSourceForm.gender = val;
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
            priceReg1(e) {
                // 通过正则过滤小数点后两位
                let a = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
                this.addSourceForm.minMoney = a;
                e.target.value = a;
            },
            priceReg2(e) {
                // 通过正则过滤小数点后两位
                let a = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
                this.addSourceForm.maxMoney = a;
                e.target.value = a;
            },
            //获取小区地址相关
            getCity(){
                PublicAPI.getCityList().then(res=>{
                    this.cityList = res.data;
                    this.addSourceForm.houseList.forEach((item)=>{
                        item.cityId = this.cityList[0].id;
                        item.cityName = this.cityList[0].name;
                        let obj = this.addSourceForm.houseList[0];
                        obj.cityId = this.cityList[0].id;
                        obj.cityName = this.cityList[0].name;
                        this.copyHouse = Object.assign({},obj);
                    });
                })
            },
            getSourceChannel(){
                API.getSourceChannel().then(res=>{
                    let sourceChannelList = res.data;
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
                    this.sourceChannelList = sourceChannelList;
                    this.initData();
                })
            },
            ownerClueListHouseLable(){
                API.ownerClueListHouseLable().then(res=>{
                    this.houseLableList = res.data;
                })
            },
            initData(){
                if(this.defalutClueType){
                    this.clueType = this.defalutClueType;
                    this.addSourceForm.clueType = this.defalutClueType;
                }
                if(this.sourceId){
                    API.ownerClueView(this.sourceId).then(res=>{
                        this.addSourceForm = res.data;
                        this.addSourceForm.phone = this.addSourceForm.originPhone;
                        this.addSourceForm.socialAccount = this.addSourceForm.originSocialAccount;
                        this.freeFlagCheckList = [];
                        if(this.addSourceForm.houseList.length == 0){
                            this.addSourceForm.houseList.push(this.copyHouse);
                            this.freeFlagCheckList.push({checked: false});
                        }
                        else{
                            this.addSourceForm.houseList.forEach((item)=>{
                                item.price = item.price/100;
                                this.freeFlagCheckList.push({checked: (item.isFree == 1)});
                                item.picList.forEach((item)=>{
                                    item.status = 'done';
                                    let subBizType = item.subBizType;
                                    if (subBizType == 3) {
                                        item.fileOriginName = '卧室';
                                    } else if (subBizType == 4) {
                                        item.fileOriginName = '客厅';
                                    } else if (subBizType == 5) {
                                        item.fileOriginName = '厨房';
                                    } else if (subBizType == 6) {
                                        item.fileOriginName = '卫生间';
                                    } else if (subBizType == 7) {
                                        item.fileOriginName = '阳台';
                                    } else if (subBizType == 8) {
                                        item.fileOriginName = '吧台';
                                    } else if (subBizType == 2) {
                                        item.fileOriginName = '户型图';
                                    } else if (subBizType == 10) {
                                        item.fileOriginName = '环境';
                                    } else if (subBizType == 11) {
                                        item.fileOriginName = '其他';
                                    } else {
                                        item.fileOriginName = '-';
                                    }
                                });
                                //初始化装修类型
                                if(!item.decorationType){
                                    item.decorationType = 2;
                                }
                            });
                        }
                        //初始化客户来源
                        if(!this.addSourceForm.sourceChannelId){
                            this.addSourceForm.sourceChannelId = this.sourceChannelList[1].id;
                        }
                        //初始化紧急程度
                        if(!this.addSourceForm.urgencyLevel){
                            this.addSourceForm.urgencyLevel = 1;
                        }
                        this.copyAddSourceForm = Object.assign({}, this.addSourceForm);
                    })
                }
                else{
                    //初始化客户来源
                    if(!this.addSourceForm.sourceChannelId){
                        this.addSourceForm.sourceChannelId = this.sourceChannelList[1].id;
                    }
                    //初始化紧急程度
                    if(!this.addSourceForm.urgencyLevel){
                        this.addSourceForm.urgencyLevel = 1;
                    }
                }
            },
            selectCity(value,index){
                this.addSourceForm.houseList[index].cityId = value;
                this.cityList.forEach((item)=>{
                    if(item.id == value){
                        this.addSourceForm.houseList[index].cityName = item.name;
                    }
                });
            },
            handleChange(value) {
                this.addSourceForm.demandTypeList = value;
            },
            cancelSave(){
                this.$emit('cancelSave');
            },
            checkValidate(){
                //必填检验
                if(!this.addSourceForm.name){
                    this.$message.warning('请填写业主姓名');
                    return false;
                }
                if(!this.addSourceForm.phone){
                    this.$message.warning('请填写业主电话');
                    return false;
                }
                else{
                    if(this.addSourceForm.clueType == 2) {
                        if (this.addSourceForm.phone != this.copyAddSourceForm.phone) {
                            if (this.checkPhone(this.addSourceForm.phone)) {
                                // 这个是判断字段传的是否正确  电话号码
                                return false;
                            }
                        }
                    }
                    else{
                        if (this.checkPhone(this.addSourceForm.phone)) {
                            // 这个是判断字段传的是否正确  电话号码
                            return false;
                        }
                    }
                }
                //检验初始化的字段
                if(!this.addSourceForm.socialAccount&&this.ownerCheck.socialAccount.required==1){
                    this.$message.warning('请输入其他联系方式');
                    return false;
                }
                if(!this.addSourceForm.sourceChannelId&&this.ownerCheck.sourceChannelId.required==1){
                    this.$message.warning('请选择来源');
                    return false;
                }
                if(!this.addSourceForm.urgencyLevel&&this.ownerCheck.urgencyLevel.required==1){
                    this.$message.warning('请选择紧急程度');
                    return false;
                }
                if(this.addSourceForm.clueHouseType == 1){
                    let temp = false;
                    this.addSourceForm.houseList.forEach((item)=>{
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
                        if((!item.picList||item.picList.length==0)&&this.ownerCheck.deCentralizedHouse.picList.required==1){
                            temp = true;
                        }
                    })
                    if(temp){
                        this.$message.warning('请完善委托房源信息');
                        return false;
                    }
                }
                else if(this.addSourceForm.clueHouseType == 2){
                    let temp = false;
                    this.addSourceForm.houseList.forEach((item)=>{
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
                        if((!item.picList||item.picList.length==0)&&this.ownerCheck.centralizedHouse.picList.required==1){
                            temp = true;
                        }
                    });
                    if(temp){
                        this.$message.warning('请完善委托项目信息');
                        return false;
                    }
                }
                if(!this.addSourceForm.comment&&this.ownerCheck.comment.required==1){
                    this.$message.warning('请输入备注');
                    return false;
                }
            },
            saveSource(){
                let checkValidateResult = this.checkValidate();
                if(checkValidateResult == false){
                    return;
                }
                //处理房源价格
                let addSourceFormCopy = Object.assign({},this.addSourceForm);
                //防止加密
                if(this.addSourceForm.clueType == 2) {
                    if (this.addSourceForm.phone == this.copyAddSourceForm.phone) {
                        addSourceFormCopy.phone = this.addSourceForm.originPhone
                    }
                    if (this.addSourceForm.socialAccount) {
                        if (this.addSourceForm.socialAccount == this.copyAddSourceForm.socialAccount) {
                            addSourceFormCopy.socialAccount = this.addSourceForm.originSocialAccount;
                        }
                    }
                }
                let houseList = [];
                let exsitFullAddressNull = false;
                addSourceFormCopy.houseList.forEach((item)=>{
                    if(item.fullAddress){
                        let temp =  Object.assign({},item);
                        temp.price =  Math.round(temp.price * 100);
                        let picIds = [];
                        temp.picList.forEach((item1)=>{
                            picIds.push(item1.id);
                        });
                        temp.picIdList = picIds;
                        houseList.push(temp);
                    }
                    else {
                        exsitFullAddressNull = true;
                    }
                });
                addSourceFormCopy.houseList = houseList;
                addSourceFormCopy.houseIdList = this.houseIdList;
                this.saveLoading = true;
                if(this.sourceId){
                    if(exsitFullAddressNull){
                        this.$message.warning('系统检测到您有房源地址未完善，请先完善房源地址');
                        return;
                    }
                    if(this.fromType == 2){
                        API.ownerClueEdit(addSourceFormCopy).then(res => {
                            if (res.code === '200') {
                                this.$message.success('修改成功');
                                this.$emit('successSave');
                            } else {
                                this.$message.success('修改失败');
                                this.saveLoading = false;
                            }
                        });
                    }
                    else if(this.fromType == 3){
                        API.ownerClueReactivate(addSourceFormCopy).then(res=>{
                            if (res.code === '200') {
                                this.$message.success('重新激活成功');
                                this.$emit('successSave',res.data);
                            } else {
                                this.$message.success('重新激活失败');
                                this.saveLoading = false;
                            }
                        })
                    }
                }
                else {
                    API.ownerClueAdd(addSourceFormCopy).then(res => {
                        if (res.code === '200') {
                            this.$message.success('添加成功');
                            this.$emit('successSave');
                        } else {
                            this.$message.success('添加失败');
                            this.saveLoading = false;
                        }
                    });
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .addSourceBox{
        height: calc(100vh - 100px);
        overflow: auto;
        .clueType{
            width: 100%;
            &>div{
                padding:20px 20px 0 20px;
            }
            .clueTypeLeft{
                width: 465px;
                height: 42px;
                line-height: 42px;
                position: relative;
                .name1{
                    color: #111111;
                    font-size: 16px;
                    margin-left: 10px;
                }
                .name2{
                    color: #666666;
                    font-size: 12px;
                }
                .choose-display-none {
                    display: none;
                }
                .choose-display-block {
                    display: block;
                }
                .triangle-top-right-choose {
                    position: absolute;
                    color: #FFFFFF;
                    top: 5px;
                    right: 5px;
                }
                .triangle-top-right {
                    position: absolute;
                    width: 0;
                    height: 0;
                    border: 20px solid #0A87F8;
                    border-bottom: 20px solid transparent;
                    border-left: 20px solid transparent;
                    border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
                    top: 0px;
                    right: 0px;
                }
            }
            .clueTypeRight{
                margin-left: 30px;
            }

            .normalBorder{
                border: 1px solid #DDDDDD;
                border-radius:8px;
            }
            .normalBg{
                background-color: #FFFFFF;
            }
            .clickBorder{
                border: 1px solid #0A87F8;
                border-radius:8px;
            }
            .clickBg{
                background-color: rgba(245,250,255,1);
            }
        }
        .title{
            color: #111111;
            font-size: 18px;
            font-weight:500;
        }
        .basicInfo{
            width: 100%;
            padding:30px 20px 0 20px;
            .name{
                position: relative;
                .gender{
                    position: absolute;
                    right: 0px;
                    bottom: 5px;
                }
            }
            /deep/ .ant-input{
                color: #111111;
            }
            /deep/ .ant-select{
                color: #111111;
            }
        }
        /deep/ .ant-select-selection__rendered{
            margin-left: 0px;
        }
        /deep/ .label-item .ant-select-selection__rendered{
            margin-left: 0px;
        }
        /deep/ .ant-select-selection--multiple .ant-select-selection__placeholder{
            margin-left: 0px;
        }
        .demandInfo{
            width: 100%;
            padding:28px 20px 0 20px;
            .house-list {
                width: 960px;
                .house-item {
                    margin-bottom: 20px;

                    .delete-icon {
                        color: red;
                        font-size: 14px;
                    }

                    .house-detail {
                        border-left: 1px solid @borderColor;
                        border-top: 1px solid @borderColor;
                        text-align: center;
                        font-size: 12px;

                        .house-title {
                            display: flex;
                            background-color: @themeBgColor;

                            & > div {
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

                        .house-data {
                            position: relative;
                            display: flex;
                            /deep/ .ant-select{
                                font-size: 12px;
                                color: #111111;
                            }
                            /deep/ .ant-input{
                                font-size: 12px;
                                color: #111111;
                            }
                            /deep/ .ant-select-selection-selected-value{
                              padding-right: 0px;
                            }
                            /deep/ .ant-select-dropdown-menu-item{
                              padding: 5px 10px;
                            }

                            & > div {
                                flex: 1;
                                height: 40px;
                                line-height: 40px;
                                text-align: left;
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
                            .pic-list{
                                display: flex;
                                flex-wrap: wrap;
                                /*justify-content: space-around;*/
                                max-width: 315px;
                                margin-right: -5px;
                                margin-bottom: 5px;
                                li{
                                    position: relative;
                                    div{
                                        width: 100px;
                                        height: 68px;
                                        line-height: 68px;
                                        border: 1px solid #eeeeee;
                                        background-color: #f6f7f8;
                                        margin: 5px 5px 0 0;
                                        border-radius: 6px;
                                        text-align: center;
                                        overflow: hidden;
                                        img{
                                            width: auto;
                                            max-width: 100px;
                                            height: auto;
                                            max-height: 68px;
                                            overflow: hidden;
                                        }
                                    }
                                    span{
                                        position: absolute;
                                        left: -10px;
                                        top: 3px;
                                        font-size: 12px;
                                        transform: scale(0.8);
                                        display: inline-block;
                                        background: rgba(0, 0, 0, 0.6);
                                        border-radius: 5px 0px 5px 0px;
                                        color: #fff;max-width: 100px;
                                    }
                                }
                            }

                            input:focus {
                                border: 1px solid @themeColor !important;
                            }

                            .select-border {
                                border: 1px solid @themeColor;
                            }

                            .options {
                                i, span {
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
                                .overHideStyle{
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                }
                            }
                            .poperLabelStyle1{
                                position: absolute;
                                padding: 6px 0px 14px 10px;
                                width:240px;
                                min-height:45px;
                                top:40px;
                                background:rgba(255,255,255,1);
                                box-shadow:0px 2px 10px 0px rgba(0,0,0,0.1);
                                border-radius:4px;
                                border:1px solid rgba(238,238,238,1);
                                z-index: 99;
                            }
                            .poperLabelStyle2{
                                position: absolute;
                                padding: 0px 10px 10px 10px;
                                width:240px;
                                min-height:80px;
                                top:40px;
                                background:rgba(255,255,255,1);
                                box-shadow:0px 2px 10px 0px rgba(0,0,0,0.1);
                                border-radius:4px;
                                border:1px solid rgba(238,238,238,1);
                                z-index: 99;
                            }
                        }
                    }

                    .house-child {
                        border: 1px solid @borderColor;
                        border-top: none;
                        padding: 0 15px 15px 15px;
                        background-color: @bigBackgroundColor;

                        h3 {
                            font-size: 12px;

                            p {
                                color: @themeColor;
                            }
                        }

                        .house-title {
                            background-color: @bigBackgroundColor;
                        }

                        .add-child {
                            font-size: 12px;
                            cursor: pointer;

                            span {
                                margin-right: 6px;
                            }

                            i {
                                font-size: 14px;
                            }
                        }
                    }

                }
            }
            .font16Style{
                i{
                    vertical-align: -0.2em;
                }
                svg{
                    width: 16px;
                    height: 16px;
                }
            }
        }
        .normalWidth{
            width: 168px;
            & /deep/ .input_end_css1 {
            }
            & /deep/ .input-item-box{
                margin-top: 10px;
            }
            & /deep/ .input_end_css2 {
                .ant-input {
                    padding-left: 6px;
                    padding-right: 31px;
                }
            }
        }
        .buttonDiv {
            float: right;
            height: 75px;
            .formItemMarginButton {
                width: 120px;
                height: 40px;
                margin: 76px 0 20px 18px;
            }
            .cancelFont {
                color: #666666;
            }
            .saveFont {
                color: #FFFFFF;
                background-color: #0A87F8;
            }
        }
        .mustFillStyle{
            color: @wranColor;
            font-size: 14px;
        }
    }
</style>
