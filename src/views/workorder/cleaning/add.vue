<template>
    <div class="addCleanBox">
        <div class="sourceType clearfix">
            <div class="sourceTypeLeft f-fl clearfix cursor" :class="addCleanForm.sourceType==1?'clickBorder clickBg':'normalBorder normalBg'" @click="changeSourceType(1)">
                <div class="name1 f-fl">租客</div>
                <div class="name2 f-fl">（帮助租客申请保洁工单）</div>
                <div class="triangle-top-right"
                     :class="addCleanForm.sourceType == 1 ?'choose-display-block':'choose-display-none'">
                </div>
                <icon-font class="triangle-top-right-choose"
                           :class="addCleanForm.sourceType == 1 ?'choose-display-block':'choose-display-none'"
                           type="iconyumengtubiao_xuanzhong-"/>
            </div>
            <div class="sourceTypeLeft sourceTypeRight f-fl clearfix cursor" :class="addCleanForm.sourceType==2?'clickBorder clickBg':'normalBorder normalBg'" @click="changeSourceType(2)">
                <div class="name1 f-fl">公司</div>
                <div class="name2 f-fl">（公司自己的保洁工单）</div>
                <div class="triangle-top-right"
                     :class="addCleanForm.sourceType == 2 ?'choose-display-block':'choose-display-none'">
                </div>
                <icon-font class="triangle-top-right-choose"
                           :class="addCleanForm.sourceType == 2 ?'choose-display-block':'choose-display-none'"
                           type="iconyumengtubiao_xuanzhong-"/>
            </div>
        </div>
        <div class="basicInfo">
            <div class="title">保洁地址<span style="color: red;">*</span></div>
            <label-item border :mustFill="true">
                <div class="u-bottom-border address" :class="(searchAddressHaveValue==false&&this.communityList.length==0)?'noSearchAddress':''" v-if="!searchLoading">
                    <a-select showSearch placeholder="请输入房源编号/小区地址/项目名称/门牌号/租客姓名/租客电话检索房源" :disabled="houseFul" :value="addCleanForm.fullAddress?addCleanForm.fullAddress:undefined" :class="{ 'must-fill-border': mustFillBorder  }" style="width: 100%;" :defaultActiveFirstOption="false" :showArrow="false"
                              :filterOption="false" @change="getCommunity" @search="selectCommunity" :not-found-content="null" @focus="focusCommunity" @blur="isEmpty">
                        <a-select-option v-for="(item,index) in communityList" :key="item.houseId">{{ item.viewAddress }}</a-select-option>
                    </a-select>
                </div>
                <div class="u-bottom-border address" :class="(searchAddressHaveValue==false&&this.communityList.length==0)?'noSearchAddress':''" v-else>
                    <a-select showSearch placeholder="请输入房源编号/小区地址/项目名称/门牌号/租客姓名/租客电话检索房源" :value="addCleanForm.fullAddress?addCleanForm.fullAddress:undefined" :class="{ 'must-fill-border': mustFillBorder  }" style="width: 100%;" :defaultActiveFirstOption="false" :showArrow="false"
                              :filterOption="false" @change="getCommunity" @search="selectCommunity" @focus="focusCommunity" @blur="isEmpty">
                        <div slot="notFoundContent">
                            <div style="width:100%;text-align: center;color: #FFA036;font-size: 14px;margin-top: 65px;" :style="!cleanMustRelated?'':'margin-bottom: 65px;'">未在系统中检索到该房源，请核对房源信息是否输入有误</div>
                            <div v-if="!cleanMustRelated" style="width:100%;text-align: center;color: #000000;font-size: 14px;margin-bottom: 130px;">您也可以先添加，后续再进行关联操作</div>
                        </div>
                        <a-select-option v-for="(item,index) in communityList" :key="item.houseId">{{ item.viewAddress }}</a-select-option>
                    </a-select>
                </div>
                <div class="close-icon-style cursor" v-if="addCleanForm.fullAddress&&canClearHouseIdflag" @click="clearFullAddress">
                    <icon-font class="close-icon cursor" type="iconyumengtubiao_guanbi-3" />
                </div>
                <p v-if="errFul" class="err-p">未在系统检测到该房源信息；您可以先添加保洁工单，后续再进行关联操作</p>
                <p v-if="mustRelatedFul" class="err-p-red">请完善保洁地址：在保洁地址框内输入地址并在检索结果中选择</p>
            </label-item>
        </div>
        <div class="demandInfo">
            <div class="title">保洁信息</div>
            <div class="clearfix" style="width: 100%;margin-bottom: 20px;">
                <div class="f-fl">
                    <label-item title="申请人姓名" :mustFill="true">
                        <div class="u-bottom-border normalWidth">
                            <a-input v-model="addCleanForm.applyName" placeholder="请输入" />
                        </div>
                    </label-item>
                </div>
                <div class="f-fl">
                    <label-item title="申请人电话" :mustFill="true" style="margin-left: 30px">
                        <div class="u-bottom-border normalWidth">
                            <a-input v-model="addCleanForm.applyPhone" :maxlength="11" @keyup.native="mixin_integerFilter('addCleanForm.applyPhone')" @blur="checkPhone(addCleanForm.applyPhone)" placeholder="请输入" />
                        </div>
                    </label-item>
                </div>
            </div>
            <div class="clearfix" style="width: 100%;margin-bottom: 20px;">
                <div class="f-fl" style="width: 310px;">
                    <label-item title="期望上门时间" :mustFill="(cleanCheck.visitDate.required==1||cleanCheck.visitTime.required==1)">
                        <div class="u-bottom-border clearfix">
                            <div class="normalWidth f-fl">
                                <a-date-picker v-model="addCleanForm.visitDate" :format="dateFormat" />
                            </div>
                            <div class="f-fl" style="width: 30px;height: 32px;border-bottom: 1px solid #DDDDDD;">
                            </div>
                            <div class="f-fl" style="width: 140px;">
                                <a-select v-model="addCleanForm.visitTime" style="width:100%" placeholder="请选择上门时段">
                                    <a-select-option :value="1">9:00 - 13:00</a-select-option>
                                    <a-select-option :value="2">13:00 - 18:00</a-select-option>
                                    <a-select-option :value="3">18:00 - 22:00</a-select-option>
                                </a-select>
                            </div>
                        </div>
                    </label-item>
                </div>
                <div class="f-fl" style="margin-left: 25px;">
                    <label-item title="需要保洁的类型" :mustFill="cleanCheck.cleanType.required==1">
                        <div class="u-bottom-border normalWidth">
                            <a-select v-model="addCleanForm.cleanType" style="width:100%" placeholder="请选择">
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
                        </div>
                    </label-item>
                </div>
            </div>
            <div style="width: 100%;margin-bottom: 20px;">
                <label-item
                        class="item u-bottom-border"
                        style="width: 100%"
                        title="需求描述" :mustFill="cleanCheck.promotionDesc.required==1"
                        :valLength="addCleanForm.promotionDesc.length"
                        :maxSize="200"
                >
                    <a-textarea v-model="addCleanForm.promotionDesc"
                                maxlength="200"
                                placeholder="请输入"
                                :autosize="{ minRows: 1, maxRows: 5 }"
                    />
                </label-item>
            </div>
            <div class="cleanPicList" style="width: 100%;margin-bottom: 10px;">
                <label-item style="width: 100%;" title="附件" :mustFill="cleanCheck.cleanPicList.required==1">
                    <own-upload-video style="width: 100%;min-height: 76px;margin-top: 6px" ref="cleanPicList" :showTips="false" :picList="addCleanForm.cleanPicList" :videoObject="addCleanForm.videoObject" :uploadParms="uploadParms"></own-upload-video>
                </label-item>
                <div class="warn"><span style="font-size: 12px;color: #FFA036;">（附件支持格式：jpg、png、jpeg、mp4、avi、mov）</span></div>
            </div>
            <div class="applyComment" style="width: 100%;margin-bottom: 20px;">
                <label-item
                    class="item u-bottom-border"
                    title="备注" :mustFill="cleanCheck.applyComment.required==1"
                    style="width: 100%"
                    :valLength="addCleanForm.applyComment.length"
                    :maxSize="500"
            >
                <a-textarea v-model="addCleanForm.applyComment"
                            maxlength="500"
                            placeholder="请输入"
                            :autosize="{ minRows: 1, maxRows: 5 }"
                />
            </label-item>
                <div class="warn"><span style="font-size: 12px;color: #FFA036;">（此备注信息仅限公司内部可见）</span></div>
            </div>
            <div class="clearfix" style="width: 100%;height: 75px;margin-top: 30px;">
                <div class="assignment f-fl cursor" @click="assignmentClean">
                    直接指派<icon-font type="iconyumengtubiao_zhishi"/>
                </div>
                <div class="buttonDiv f-fr">
                    <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
                        取消
                    </a-button>
                    <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="saveClean">
                        保存
                    </a-button>
                </div>
            </div>
        </div>
        <!-- 派单/改派 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="assignmentDialog" class="ownModalBorder titDialog" :title="assignmentTitle" @cancel="closeAssignmentClean">
            <assignment-detail :infoData="infoData" :assignmentType="assignmentType" :source="source" @successSave="successSave" @cancelSave="closeAssignmentClean"></assignment-detail>
        </a-modal>
    </div>
</template>

<script>
    import { moduleFieldConfigGet,bizDecisionGet } from '@/api/decision';
    import { employeeUserInfo } from '@/api/enterprise';
    import * as API from '@/api/workorder';
    import AssignmentDetail from './derectAssignment';
    import ownUploadVideo from '@/components/OwnUpload/uploadVideo';
    import { CURRENTDEPTID } from '@/store/mutation-types';
    export default {
        name: "addClean",
        components: {
            AssignmentDetail,
            ownUploadVideo,
        },
        props: {
            cleanId:{
                type: String,
            },
            houseFul:{        //房源详情录入合同
                type: Boolean,
                default: false
            },
            roomData:{
                type:Object,
                required: false
            },
        },
        data() {
            return {
                mustFillBorder:false,
                communityList:[],
                errFul:false,
                dateFormat: 'YYYY.MM.DD',           //日期选择器格式
                addCleanForm:{
                    sourceType:1,     //1、租客；2、公客
                    applyName:undefined,    //申请人
                    applyPhone:undefined,   //申请人电话
                    applyComment:'',        //申请备注
                    houseId:'',             //房源id
                    housePid:'',            //父房源id
                    fullAddress:undefined,         //房源详细地址
                    visitDate:this.$moment(new Date().getTime()),            //期望上门日期
                    visitTime:undefined,                    //具体上门时间
                    cleanType:undefined,            //维修物件类型
                    promotionDesc:'',               //故障描述
                    cleanPicIdList:[],              //故障图片
                },
                uploadParms:{
                    // 上传时附带的额外参数
                    bizId: '', // 保洁id
                    bizType: 6, // 图片大类标识 租客
                    subBizType: 1, // 图片子类标识 身份证正面
                    orderIndex: 1 // 排序值
                },
                infoData:{},
                assignmentDialog:false,
                source:2,
                assignmentType:1,
                assignmentTitle:'派单',
                tempInfo:{
                    tentantName:undefined,
                    tentantPhone:undefined,
                    companyName:undefined,
                    companyPhone:undefined,
                },
                saveLoading:false,
                searchAddressHaveValue:false,
                searchLoading:false,
                cleanCheck:{
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
                cleanMustRelated:false,
                canClearHouseIdflag:true,
                mustRelatedFul:false,
            }
        },
        created() {
            this.bizDecisionGet();
            this.initData();
        },
        methods: {
            getUserInfo(){
                employeeUserInfo().then(res => {
                    this.addCleanForm.applyName = res.data.name;
                    this.addCleanForm.applyPhone = res.data.phone;
                    this.tempInfo.companyName = res.data.name;
                    this.tempInfo.companyPhone = res.data.phone;
                });
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
            successSave(){
                this.$emit('successSave');
            },
            closeAssignmentClean(){
                this.assignmentDialog = false;
            },
            initData(){
                if(this.cleanId){
                    API.cleanGet(this.cleanId).then(res=>{
                        this.addCleanForm = res.data;
                        if(this.addCleanForm.visitDate){
                            this.addCleanForm.visitDate = this.$moment(this.addCleanForm.visitDate);
                        }
                        if(!this.addCleanForm.cleanPicList){
                            this.addCleanForm.cleanPicList=[];
                        }
                        else{
                            let temp = [];
                            this.addCleanForm.cleanPicList.forEach((item)=>{
                                if('mp4,avi,mov'.indexOf(item.fileExt)>-1){
                                    this.addCleanForm.videoObject = item;
                                }
                                else{
                                    temp.push(item);
                                }
                            });
                            this.addCleanForm.cleanPicList = temp;
                        }
                        this.uploadParms = {
                            bizId: this.cleanId, // 保洁id
                            bizType: 6, // 图片大类标识 租后服务
                            subBizType: 1, // 图片子类标识 租后服务申请
                            orderIndex: 1 // 排序值
                        };
                        if(this.addCleanForm.status == 2){
                            this.assignmentType = this.addCleanForm.status;
                            this.assignmentTitle = '改派';
                        }
                        if(this.addCleanForm.status == 1){
                            this.assignmentType = this.addCleanForm.status;
                            this.assignmentTitle = '派单';
                        }
                        if(this.addCleanForm.deptId){
                            this.moduleFieldConfigGet(this.addCleanForm.deptId);
                        }

                        else{
                            this.moduleFieldConfigGet(this.addCleanForm.createrId);
                        }
                    })
                }
                else{
                    if(this.houseFul){ //如果是房源详情的签约
                        this.houseFun(this.roomData);
                        this.canClearHouseIdflag = false;
                        this.houseBizContract(this.roomData.id);
                    }
                    else{
                      this.moduleFieldConfigGet();
                    }
                }
            },
            houseFun(res) {
                this.addressFul = true;
                this.addCleanForm.fullAddress = res.cityName + res.areaName + res.townName + res.fullAddress;
                this.addCleanForm.houseId = res.id;
              if(res.deptId){
                //整租、独栋
                this.moduleFieldConfigGet(res.deptId);
              }
              else{
                //合租
                if (res.houseInfo) {
                  this.moduleFieldConfigGet(res.houseInfo.deptId);
                }
                else{
                  this.moduleFieldConfigGet();
                }
              }
            },
            //获取租客信息
            houseBizContract(id) {
                API.houseBizContract(id).then(res => {
                    if (res && res.data) {
                        this.addCleanForm.applyName = res.data.renterName;
                        this.addCleanForm.applyPhone = res.data.renterPhone;
                        this.tempInfo.tentantName = res.data.renterName;
                        this.tempInfo.tentantPhone = res.data.renterPhone;
                    }
                });
            },
            //获取决策配置
            bizDecisionGet(){
                let paramter ={
                    bizPoint:'AFTER_RENT_PROCESS',
                    mark:'CLEAN_MUST_RELATED',
                    module:'AFTER_RENT',
                };
                bizDecisionGet(paramter).then(res=>{
                    if(res.data&&res.data.onOff==1){
                        this.cleanMustRelated = true;
                    }
                    else{
                        this.cleanMustRelated = false;
                    }
                });
            },
            //获取初始化配置
            moduleFieldConfigGet(val){
                let paramter ={
                    features:'default',
                    moduleMark:'workorder.clean',
                };
                //若存在策略人
                if(val){
                    paramter.deptId = val;
                }
                else {
                    paramter.deptId = this.$ls.get(CURRENTDEPTID);
                }
                moduleFieldConfigGet(paramter).then(res=>{
                    if(res&&res.data&&res.data.fieldsObj){
                        this.cleanCheck = res.data.fieldsObj;
                        //编辑不初始化字段
                        if(!this.cleanId){
                            //初始化默认值
                            if(!this.addCleanForm.visitTime&&this.cleanCheck.visitTime.default){
                                this.addCleanForm.visitTime = this.cleanCheck.visitTime.default;
                            }
                            if(!this.addCleanForm.cleanType&&this.cleanCheck.cleanType.default){
                                this.addCleanForm.cleanType = this.cleanCheck.cleanType.default;
                            }
                        }
                    }
                    else{
                        this.cleanCheck = {
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
                        //编辑不初始化字段
                        if(!this.cleanId){
                            //初始化默认值
                            if(!this.addCleanForm.visitTime&&this.cleanCheck.visitTime.default){
                                this.addCleanForm.visitTime = this.cleanCheck.visitTime.default;
                            }
                            if(!this.addCleanForm.cleanType&&this.cleanCheck.cleanType.default){
                                this.addCleanForm.cleanType = this.cleanCheck.cleanType.default;
                            }
                        }
                    }
                });
            },
            assignmentClean(){
                //图片处理
                this.addCleanForm.tempPicList = [];
                if(this.$refs.cleanPicList.videoObj&&this.$refs.cleanPicList.videoObj.id){
                    this.addCleanForm.tempPicList.push(this.$refs.cleanPicList.videoObj)
                }
                if(this.$refs.cleanPicList.picsList){
                    this.$refs.cleanPicList.picsList.forEach((item)=>{
                        this.addCleanForm.tempPicList.push(item);
                    })
                }
                //检验必填性
                let checkValidateResult = this.checkValidate(2);
                if(checkValidateResult == false){
                    return;
                }
                this.infoData = this.addCleanForm;
                this.assignmentDialog = true;
            },
            changeSourceType(val){
                this.addCleanForm.sourceType = val;
                this.addCleanForm.applyName = undefined;
                this.addCleanForm.applyPhone = undefined;
                if(val==1){
                    if(this.tempInfo.tentantName) {
                        this.addCleanForm.applyName = this.tempInfo.tentantName;
                        this.addCleanForm.applyPhone = this.tempInfo.tentantPhone;
                    }
                }
                if(val == 2){
                    if(this.tempInfo.companyName){
                        this.addCleanForm.applyName = this.tempInfo.companyName;
                        this.addCleanForm.applyPhone = this.tempInfo.companyPhone;
                    }else{
                        this.getUserInfo();
                    }
                }
            },
            getCommunity(communityId) {
                this.addCleanForm.houseId = communityId;
                this.mustFillBorder = false;
                this.communityList.forEach(function(e) {
                    if (e.houseId == communityId) {
                        this.addCleanForm.fullAddress = e.fullAddress;
                        this.addCleanForm.housePid = e.housePid;
                        if(this.addCleanForm.sourceType==1){
                            if(e.renterName) {
                                this.addCleanForm.applyName = e.renterName;
                                this.addCleanForm.applyPhone = e.renterPhone;
                                this.tempInfo.tentantName = e.renterName;
                                this.tempInfo.tentantPhone = e.renterPhone;
                            }
                            else{
                                this.addCleanForm.applyName = undefined;
                                this.addCleanForm.applyPhone = undefined;
                                this.tempInfo.tentantName = undefined;
                                this.tempInfo.tentantPhone = undefined;
                            }
                        }
                        this.moduleFieldConfigGet(e.deptId);
                        this.bizDecisionGet();
                        this.mustRelatedFul = false;
                    }
                }, this);
            },
            focusCommunity(searchVal){
                if(searchVal== undefined||searchVal==''){
                    this.searchAddressHaveValue = false;
                    this.communityList = [];
                    this.searchLoading = false;
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
                    useBiz:5,
                }
                this.addCleanForm.fullAddress = searchVal;
                API.searchHouse(data).then(res => {
                    if (res.code == "200") {
                        if (res.data.length > 0) {
                            this.communityList = res.data;
                            this.errFul = false;
                        } else {
                            this.communityList = [];
                            this.errFul = true;
                        }
                        if(this.cleanMustRelated){
                            this.errFul = false;
                            this.mustRelatedFul = true;
                        }
                        this.searchLoading = true;
                    }

                })
            },
            isEmpty() {
                if (!this.addCleanForm.houseId) {
                    this.mustFillBorder = true
                } else {
                    this.mustFillBorder = false
                }
            },
            clearFullAddress(){
                this.addCleanForm.fullAddress = '';
                this.addCleanForm.houseId = '';
                this.communityList = [];
            },
            cancelSave(){
                this.$emit('cancelSave');
            },
            saveClean(){
                //图片处理
                let cleanPicList = [...this.$refs.cleanPicList.picsList];
                let videoObj = this.$refs.cleanPicList.videoObj;
                let faultPicIdList = [];
                if(cleanPicList && cleanPicList.length > 0) {
                    cleanPicList.forEach((val, i) => {
                        faultPicIdList.push(val.id)
                    })
                }
                if(videoObj&&videoObj.id){
                    faultPicIdList.push(videoObj.id);
                }
                this.addCleanForm.cleanPicIdList = faultPicIdList;
                let checkValidateResult = this.checkValidate(1);
                if(checkValidateResult == false){
                    return;
                }
                if(this.cleanId){
                    this.addCleanForm.id = this.cleanId;
                    this.saveLoading = true;
                    API.cleanEdit(this.addCleanForm).then(res=>{
                        if(!res){
                            this.saveLoading= false
                        }
                        if (res.code === '200') {
                            this.$message.success('修改成功');
                            this.saveLoading= false;
                            this.$emit('successSave',res);
                        } else {
                            this.saveLoading= false
                            this.$message.success('修改失败');
                        }
                    })
                }
                else {
                    this.saveLoading = true;
                    API.cleanAdd(this.addCleanForm).then(res => {
                        if(!res){
                            this.saveLoading= false
                        }
                        if (res.code === '200') {
                            this.$message.success('添加成功');
                            this.saveLoading= false;
                            this.$emit('successSave',res);
                        } else {
                            this.saveLoading = false;
                            this.$message.success('添加失败');
                        }
                    });
                }
            },
            checkValidate(val){
                //val 1、来自添加；2、来自直接指派
                //必填检验
                if(!this.addCleanForm.fullAddress){
                    this.$message.warning('请填写保洁地址');
                    return false;
                }
                if(this.cleanMustRelated&&!this.addCleanForm.houseId){
                    this.$message.warning('请完善保洁地址：在保洁地址框内输入地址并在检索结果中选择');
                    return false;
                }
                if(!this.addCleanForm.applyName){
                    this.$message.warning('请填写申请人姓名');
                    return false;
                }
                if(!this.addCleanForm.applyPhone){
                    this.$message.warning('请填写申请人电话');
                    return false;
                }
                else{
                    if (this.checkPhone(this.addCleanForm.applyPhone)) {
                        // 这个是判断字段传的是否正确  电话号码
                        return false;
                    }
                }
                if(!this.addCleanForm.visitDate&&this.cleanCheck.visitDate.required==1){
                    this.$message.warning('请选择上门时间');
                    return false;
                }
                if(!this.addCleanForm.visitTime&&this.cleanCheck.visitTime.required==1){
                    this.$message.warning('请选择上门时段');
                    return false;
                }
                if(!this.addCleanForm.cleanType&&this.cleanCheck.cleanType.required==1){
                    this.$message.warning('请选择保洁类型');
                    return false;
                }
                if(!this.addCleanForm.promotionDesc&&this.cleanCheck.promotionDesc.required==1){
                    this.$message.warning('请输入需求描述');
                    return false;
                }
                if(val == 1){
                    if((!this.addCleanForm.cleanPicIdList||this.addCleanForm.cleanPicIdList.length==0)&&this.cleanCheck.cleanPicList.required==1){
                        this.$message.warning('请上传附件');
                        return false;
                    }
                }
                else if(val == 2){
                    if((!this.addCleanForm.tempPicList||this.addCleanForm.tempPicList.length==0)&&this.cleanCheck.cleanPicList.required==1){
                        this.$message.warning('请上传附件');
                        return false;
                    }
                }
                if(!this.addCleanForm.applyComment&&this.cleanCheck.applyComment.required==1){
                    this.$message.warning('请输入备注');
                    return false;
                }
            }
        },
    }
</script>

<style scoped lang="less">
    .addCleanBox{
        width: 520px;
        max-height: calc(100vh - 90px);
        overflow: auto;
        .sourceType{
            padding:20px;
            width: 100%;
            .sourceTypeLeft{
                width: 226px;
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
            .sourceTypeRight{
                margin-left: 20px;
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
        .title{
            width: 100%;
            color: #111111;
            font-size: 18px;
            font-weight:500;
            margin: 10px 0;
        }
        .basicInfo{
            width: 100%;
            height: 90px;
            padding:0 20px 0 20px;
            .name{
                position: relative;
                .gender{
                    position: absolute;
                    right: 0px;
                    bottom: 5px;
                }
            }
            .close-icon-style{
                position: absolute;
                right: 5px;
                top: 5px;
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
        }
        .demandInfo{
            width: 100%;
            padding:0px 20px 0 20px;
            .demandLabel{
                width: 100%;min-height: 80px;
                & /deep/ .ant-input {
                    box-shadow: none;
                }
                .selectDemandLabelItem{
                    min-width: 71px;
                    height: 20px;
                    line-height: 20px;
                    font-size: 12px;
                    border-radius:4px;
                    border:1px solid rgba(221,221,221,1);
                    margin-top: 7px;
                    margin-right: 5px;
                    text-align:center;
                    background:rgba(246,247,248,1);
                }
                .demandLabelAll{
                    height:40px;
                    line-height: 40px;
                    background:rgba(247,248,251,1);
                    .demandLabelItem{
                        width: 63px;
                        height: 20px;
                        line-height: 20px;
                        font-size: 12px;
                        border-radius:4px;
                        border:1px solid rgba(221,221,221,1);
                        margin-left: 5px;
                        margin-top: 10px;
                        text-align:center;
                    }
                    .normalBg{
                        background:rgba(246,247,248,1);
                    }
                    .clickBg{
                        background:rgba(226,237,248,1);
                    }
                }
            }
            .cleanPicList{
                position: relative;
                .warn{
                    position: absolute;
                    top: 1px;
                    left: 25px;
                }
            }
            .applyComment{
                position: relative;
                .warn{
                    position: absolute;
                    top: 1px;
                    left: 25px;
                }
            }
        }
        .normalWidth{
            width: 140px;
            & /deep/ .input_end_css1 {
            }
            & /deep/ .input-item-box{
                margin-top: 10px;
            }
        }
        .assignment{
            height: 75px;
            line-height: 75px;
            color: #0A87F8;
        }
        .buttonDiv {
            height: 75px;
            .formItemMarginButton {
                width: 120px;
                height: 40px;
                margin-left: 18px;
                margin-top: 15px;
            }
            .cancelFont {
                color: #666666;
            }
            .saveFont {
                color: #FFFFFF;
                background-color: #0A87F8;
            }
        }
        .ant-upload-text{
        }
        /deep/ .ant-select-selection__rendered{
            margin-left: 0px;
        }
    }
</style>
