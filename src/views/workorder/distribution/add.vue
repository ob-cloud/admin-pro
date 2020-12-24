<template>
    <div class="addDistributionBox">
        <div class="basicInfo" style="margin-top: 16px;">
            <div style="font-size: 12px;margin-bottom: 4px;">配货地址<span style="color: red;">*</span></div>
            <label-item border :mustFill="true">
                <div class="u-bottom-border address" :class="(searchAddressHaveValue==false&&this.communityList.length==0)?'noSearchAddress':''" v-if="!searchLoading">
                    <a-select showSearch placeholder="请输入房源编号/小区地址/项目名称/门牌号/租客姓名/租客电话检索房源" :disabled="houseFul" :value="addDistributionForm.fullAddress?addDistributionForm.fullAddress:undefined" :class="{ 'must-fill-border': mustFillBorder  }" style="width: 100%;" :defaultActiveFirstOption="false" :showArrow="false"
                              :filterOption="false" @change="getCommunity" @search="selectCommunity" :not-found-content="null" @focus="focusCommunity" @blur="isEmpty">
                        <a-select-option v-for="(item) in communityList" :key="item.houseId">{{ item.viewAddress }}</a-select-option>
                    </a-select>
                </div>
                <div class="u-bottom-border address" :class="(searchAddressHaveValue==false&&this.communityList.length==0)?'noSearchAddress':''" v-else>
                    <a-select showSearch placeholder="请输入房源编号/小区地址/项目名称/门牌号/租客姓名/租客电话检索房源" :value="addDistributionForm.fullAddress?addDistributionForm.fullAddress:undefined" :class="{ 'must-fill-border': mustFillBorder  }" style="width: 100%;" :defaultActiveFirstOption="false" :showArrow="false"
                              :filterOption="false" @change="getCommunity" @search="selectCommunity" @focus="focusCommunity" @blur="isEmpty">
                        <div slot="notFoundContent">
                            <div style="width:100%;text-align: center;color: #FFA036;font-size: 14px;margin-top: 65px;" :style="!distributionMustRelated?'':'margin-bottom: 65px;'">未在系统中检索到该房源，请核对房源信息是否输入有误</div>
                            <div v-if="!distributionMustRelated" style="width:100%;text-align: center;color: #000000;font-size: 14px;margin-bottom: 130px;">您也可以先添加，后续再进行关联操作</div>
                        </div>
                        <a-select-option v-for="(item) in communityList" :key="item.houseId">{{ item.viewAddress }}</a-select-option>
                    </a-select>
                </div>
                <div class="close-icon-style cursor" v-if="addDistributionForm.fullAddress&&canClearHouseIdflag" @click="clearFullAddress">
                    <icon-font class="close-icon cursor" type="iconyumengtubiao_guanbi-3" />
                </div>
                <p v-if="errFul" class="err-p">未在系统检测到该房源信息；您可以先添加配货工单，后续再进行关联操作</p>
                <p v-if="mustRelatedFul" class="err-p-red">请完善配货地址：在配货地址框内输入地址并在检索结果中选择</p>
            </label-item>
        </div>
        <div class="demandInfo">
            <div class="clearfix" style="width: 100%;margin: 20px 0 30px 0;">
                <div class="f-fl">
                    <label-item title="申请人姓名" :mustFill="true">
                        <div class="u-bottom-border normalWidth">
                            <a-input v-model="addDistributionForm.applyName" placeholder="请输入" />
                        </div>
                    </label-item>
                </div>
                <div class="f-fl">
                    <label-item title="申请人电话" :mustFill="true" style="margin-left: 27px">
                        <div class="u-bottom-border normalWidth">
                            <a-input v-model="addDistributionForm.applyPhone" :maxlength="11" @keyup.native="mixin_integerFilter('addDistributionForm.applyPhone')" @blur="checkPhone(addDistributionForm.applyPhone)" placeholder="请输入" />
                        </div>
                    </label-item>
                </div>
                <div class="f-fl">
                    <label-item title="期望配货完成日期" :mustFill="distributionCheck.expectCompleteDate.required==1" style="margin-left: 27px">
                        <div class="u-bottom-border">
                            <div class="normalWidth">
                                <a-date-picker v-model="addDistributionForm.expectCompleteDate" :format="dateFormat" />
                            </div>
                        </div>
                    </label-item>
                </div>
            </div>
            <div class="title">配货信息</div>
            <div class="basicsInfo">
                <div class="table" style="margin: 5.5px 0 20px 0;">
                    <div class="table-title">
                        <div style="max-width: 120px;text-align: left;padding-left: 12px;background: #F5F7FF;color: #111111;">物品<span v-if="distributionCheck.quantity.required==1" style="font-size: 14px;color: #FB4246">*</span></div>
                        <div style="max-width: 84px;text-align: left;padding-left: 14px;background: #F5F7FF;color: #111111;">数量<span v-if="distributionCheck.quantity.required==1" style="font-size: 14px;color: #FB4246">*</span></div>
                        <div style="max-width: 202px;text-align: left;padding-left: 14px;background: #F5F7FF;color: #111111;">描述<span v-if="distributionCheck.promotionDesc.required==1" style="font-size: 14px;color: #FB4246">*</span></div>
                        <div style="max-width: 69px;text-align: center;background: #F5F7FF;color: #111111;">操作</div>
                    </div>
                    <div class="house-data u-no-border" v-for="(item,index) in addDistributionForm.distributionGoodsDTOList" :key="index">
                        <div class="clearfix" style="max-width: 120px;" >
                            <div class="house-data-item-left" style="width: 106px;padding-left:12px; ">
                                <a-cascader style="width: 106px;" class="myCascader" placeholder="请选择" v-model="item.goodId" :options="costTabsContent" :allowClear="true" :fieldNames="elcostcascaderValue" @change="(value) => costSelect(value, index,item)"></a-cascader>
                            </div>
                        </div>
                        <div class="clearfix" style="max-width: 84px;">
                            <div class="house-data-item-left" style="width: 68px;padding-left: 14px;">
                                <a-input style="width: 60px" v-model="item.quantity" v-validate="'naturalNum|min(1)|max(999)'" placeholder="请输入" />
                            </div>
                        </div>
                        <div class="clearfix" style="max-width: 202px;">
                            <div class="house-data-item-left" style="width: 171px;padding-left: 14px;">
                                <a-input style="width: 170px" v-model="item.promotionDesc" maxLength="50" placeholder="简单描述" />
                            </div>
                        </div>
                        <div style="max-width: 69px;text-align: center;">
                            <icon-font @click="deleteGoodObj(index,item.id)" class="delete-icon" type="iconyumengtubiao_shanchu-"></icon-font>
                        </div>
                    </div>
                    <div class="house-data u-no-border cursor" @click="AddGoodObj()" v-if="addDistributionForm.distributionGoodsDTOList.length==0">
                        <div class="continueAddStyle">
                            <icon-font type="iconyumengtubiao_tianjia" />添加
                        </div>
                    </div>
                    <div class="house-data u-no-border cursor" @click="AddGoodObj()" v-if="addDistributionForm.distributionGoodsDTOList.length>0">
                        <div class="continueAddStyle">
                            <icon-font type="iconyumengtubiao_tianjia" />继续添加
                        </div>
                    </div>
                </div>
            </div>
            <div class="faultPicList" style="width: 100%;margin-bottom: 20px;">
                <label-item style="width: 100%;" title="附件" :mustFill="distributionCheck.fileIdList.required==1">
                    <own-upload-video style="width: 100%;min-height: 76px;margin-top: 9px" ref="faultPicList" :showTips="false" :picList="addDistributionForm.fileDTOList" :videoObject="addDistributionForm.videoObject" :uploadParms="uploadParms"></own-upload-video>
                </label-item>
                <div class="warn"><span style="font-size: 12px;color: #FFA036;">（附件支持格式：jpg、png、jpeg、mp4、avi、mov）</span></div>
            </div>
            <div class="applyComment" style="width: 100%;margin-bottom: 20px;">
                <label-item
                        class="item u-bottom-border"
                        style="width: 100%"
                        title="备注" :mustFill="distributionCheck.applyComment.required==1"
                        :valLength="addDistributionForm.applyComment.length"
                        :maxSize="500"
                >
                    <a-textarea v-model="addDistributionForm.applyComment"
                                maxlength="500"
                                placeholder="请输入"
                                :autosize="{ minRows: 1, maxRows: 5 }"
                    />
                    <div class="warn"><span style="font-size: 12px;color: #FFA036;">（此备注信息仅限公司内部可见）</span></div>
                </label-item>
            </div>
            <div class="clearfix"  style="width: 100%;height: 75px;margin-top: 30px;">
                <div class="f-fl assignment cursor" @click="assignmentDistribution">
                    直接指派<icon-font type="iconyumengtubiao_zhishi"/>
                </div>
                <div class="f-fr buttonDiv">
                    <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
                        取消
                    </a-button>
                    <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="saveDistribution">
                        保存
                    </a-button>
                </div>
            </div>
        </div>
        <!-- 派单/改派 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="assignmentDialog" class="ownModalBorder titDialog" :title="assignmentTitle" @cancel="closeAssignmentRepair">
            <assignment-detail :infoData="infoData" :assignmentType="assignmentType" :source="source" @refreshPage="refreshPage" @cancelSave="closeAssignmentRepair"></assignment-detail>
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
        name: "addRepair",
        components: {
            AssignmentDetail,
            ownUploadVideo
        },
        props: {
            distributionId:{
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
                addDistributionForm:{
                    applyName:undefined,    //申请人
                    applyPhone:undefined,   //申请人电话
                    applyComment:'',        //申请备注
                    houseId:'',             //房源id
                    housePid:'',            //父房源id
                    fullAddress:undefined,         //房源详细地址
                    promotionDesc:'',               //故障描述
                    fileIdList:[],              //附件
                    distributionGoodsList:[],
                    distributionGoodsDTOList:[],
                },
                uploadParms:{
                    // 上传时附带的额外参数
                    bizId: '', // 配货id
                    bizType: 6, // 图片大类标识 租后服务申请
                    subBizType: 1, // 图片子类标识 租后服务申请
                    orderIndex: 1 // 排序值
                },
                infoData:{},
                assignmentDialog:false,
                source:2,
                assignmentType:1,
                assignmentTitle:'派单',
                saveLoading:false,
                searchAddressHaveValue:false,
                searchLoading:false,
                distributionCheck:{
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
                distributionMustRelated:false,
                costTabsContent: [
                    {
                        goodId:'1',
                        name: '家具',
                        metaList: [ {goodId:'1-1',name:'床'},{goodId:'1-2',name:'床头柜'},{goodId:'1-3',name:'衣柜'},
                            {goodId:'1-4',name:'茶几'},{goodId:'1-5',name:'沙发'},{goodId:'1-6',name:'餐桌'},
                            {goodId:'1-7',name:'餐椅'},{goodId:'1-8',name:'电脑桌'},{goodId:'1-9',name:'电脑椅'},{goodId:'1-10',name:'电视柜'},
                            {goodId:'1-11',name:'梳妆台'},{goodId:'1-12',name:'梳妆凳'},
                        ]
                    },
                    {
                        goodId:'2',
                        name: '电器',
                        metaList:  [ {goodId:'2-1',name:'冰箱'},{goodId:'2-2',name:'空调'},{goodId:'2-3',name:'洗衣机'},
                            {goodId:'2-4',name:'电视'},{goodId:'2-5',name:'电磁炉'},{goodId:'2-6',name:'吹风机'},
                            {goodId:'2-7',name:'微波炉'},{goodId:'2-8',name:'电烤箱'},{goodId:'2-9',name:'热水器'},
                        ]
                    },
                    {
                        goodId:'3',
                        name: '装饰',
                        metaList: [ {goodId:'3-1',name:'灯'},{goodId:'3-2',name:'窗帘'},{goodId:'3-3',name:'摆件'},{goodId:'3-4',name:'绿化植物'},]
                    },
                    {
                        goodId:'4',
                        name: '其他',
                        metaList: [ {goodId:'4-1',name:'被褥'},{goodId:'4-2',name:'地毯'},{goodId:'4-3',name:'桌布'},{goodId:'4-4',name:'其他'},]
                    }
                ],
                goodObj:{
                    goodsSubType:'',
                    goodsType:'',
                    promotionDesc:'',
                    quantity:'',
                },
                elcostcascaderValue: {
                    value: 'goodId',
                    label: 'name',
                    children: 'metaList'
                },
                removeGoodsIdList:[],
                canClearHouseIdflag:true,
                mustRelatedFul:false,
            }
        },
        created() {
            this.bizDecisionGet();
            this.initData();
        },
        methods: {
            deleteGoodObj(index,val){
                this.addDistributionForm.distributionGoodsDTOList.splice(index,1);
                if(val){
                    this.removeGoodsIdList.push(val);
                }
            },
            AddGoodObj(){
                let obj = Object.assign({},this.goodObj);
                //必填检验
                let temp = false;
                this.addDistributionForm.distributionGoodsDTOList.forEach((item)=>{
                    if(!item.goodIds&&this.distributionCheck.quantity.required==1){
                        temp = true;
                    }
                    if(!item.quantity&&this.distributionCheck.quantity.required==1){
                        temp = true;
                    }
                    if(!item.promotionDesc&&this.distributionCheck.promotionDesc.required==1){
                        temp = true;
                    }
                });
                if(temp){
                    this.$message.warning('请完善物品信息');
                    return;
                }
                this.addDistributionForm.distributionGoodsDTOList.push(obj);
            },
            // 费用类型方法
            costSelect(value, index,item) {
                if (value[1]) {
                    item.goodIds = value[1];
                } else {
                    item.goodIds = value[0];
                }
            },
            getUserInfo(){
                employeeUserInfo().then(res => {
                    this.addDistributionForm.applyName = res.data.name;
                    this.addDistributionForm.applyPhone = res.data.phone;
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
            refreshPage(){
                this.$emit('successSave');
            },
            closeAssignmentRepair(){
                this.assignmentDialog = false;
            },
            initData(){
                if(this.distributionId){
                    API.distributionGet(this.distributionId).then(res=>{
                        this.addDistributionForm = res.data;
                        if(this.addDistributionForm.expectCompleteDate ){
                            this.addDistributionForm.expectCompleteDate = this.$moment(this.addDistributionForm.expectCompleteDate);
                        }
                        if(!this.addDistributionForm.distributionGoodsDTOList){
                            this.addDistributionForm.distributionGoodsDTOList=[];
                        }
                        else{
                            this.addDistributionForm.distributionGoodsDTOList.forEach((item)=>{
                                item.goodIds = item.goodsType+'-'+item.goodsSubType;
                                let temp = [];
                                temp.push(item.goodsType+'');
                                temp.push(item.goodsType+'-'+item.goodsSubType);
                                item.goodId = temp;
                            });
                        }
                        if(!this.addDistributionForm.fileDTOList){
                            this.addDistributionForm.fileDTOList=[];
                        }
                        else{
                            let temp = [];
                            this.addDistributionForm.fileDTOList.forEach((item)=>{
                                if('mp4,avi,mov'.indexOf(item.fileExt)>-1){
                                    this.addDistributionForm.videoObject = item;
                                }
                                else{
                                    temp.push(item);
                                }
                            });
                            this.addDistributionForm.fileDTOList = temp;
                        }
                        this.uploadParms = {
                            bizId: this.distributionId, // 配货id
                            bizType: 6, // 图片大类标识 租客
                            subBizType: 1, // 图片子类标识 身份证正面
                            orderIndex: 1 // 排序值
                        };
                        if(this.addDistributionForm.status == 2){
                            this.assignmentType = this.addDistributionForm.status;
                            this.assignmentTitle = '改派';
                        }
                        if(this.addDistributionForm.status == 1){
                            this.assignmentType = this.addDistributionForm.status;
                            this.assignmentTitle = '派单';
                        }
                      this.moduleFieldConfigGet(this.addDistributionForm.deptId);
                    })
                }
                else{
                    this.getUserInfo();
                    if(this.houseFul){ //如果是房源详情的签约
                        this.houseFun(this.roomData);
                        this.canClearHouseIdflag = false;
                    }
                    else{
                      this.moduleFieldConfigGet();
                    }
                }
            },
            houseFun(res) {
                this.addressFul = true;
                this.addDistributionForm.fullAddress = res.cityName + res.areaName + res.townName + res.fullAddress;
                this.addDistributionForm.houseId = res.id;
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
            //获取决策配置
            bizDecisionGet(){
                let paramter ={
                    bizPoint:'AFTER_RENT_PROCESS',
                    mark:'DISTRIBUTION_MUST_RELATED',
                    module:'AFTER_RENT',
                };
                bizDecisionGet(paramter).then(res=>{
                    if(res.data&&res.data.onOff==1){
                        this.distributionMustRelated = true;
                    }
                    else{
                        this.distributionMustRelated = false;
                    }
                });
            },
            //获取初始化配置
            moduleFieldConfigGet(val){
                let paramter ={
                    features:'default',
                    moduleMark:'workorder.distribution',
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
                        this.distributionCheck = res.data.fieldsObj;
                        if(!this.distributionId){
                            if(this.distributionCheck&&this.distributionCheck.quantity&&this.distributionCheck.quantity.default){
                                this.goodObj.quantity = this.distributionCheck.quantity.default;
                            }
                            //若存在一条
                            if(this.distributionCheck&&this.addDistributionForm.distributionGoodsDTOList.length==0){
                                if(this.distributionCheck.quantity.required==1||this.distributionCheck.promotionDesc.required==1){
                                    this.goodObj.quantity = this.distributionCheck.quantity.default;
                                    this.goodObj.promotionDesc = this.distributionCheck.promotionDesc.default;
                                    let good = Object.assign({},this.goodObj);
                                    this.addDistributionForm.distributionGoodsDTOList.push(good);
                                }
                            }
                        }
                   }
                   else{
                       this.distributionCheck = {
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
                           default:undefined,     //初始值
                           },
                           promotionDesc:{
                               required:0,
                           },
                       }
                       if(!this.distributionId&&this.addDistributionForm.distributionGoodsDTOList.length==0){
                           if(this.distributionCheck&&this.distributionCheck.quantity&&this.distributionCheck.quantity.default){
                               this.goodObj.quantity = this.distributionCheck.quantity.default;
                           }
                           //若存在一条
                           if(this.distributionCheck){
                               if(this.distributionCheck.quantity.required==1||this.distributionCheck.promotionDesc.required==1){
                                   this.goodObj.quantity = this.distributionCheck.quantity.default;
                                   this.goodObj.promotionDesc = this.distributionCheck.promotionDesc.default;
                                   let good = Object.assign({},this.goodObj);
                                   this.addDistributionForm.distributionGoodsDTOList.push(good);
                               }
                           }
                       }
                   }
                });
            },
            assignmentDistribution(){
                this.addDistributionForm.tempPicList = [];
                if(this.$refs.faultPicList.videoObj&&this.$refs.faultPicList.videoObj.id){
                    this.addDistributionForm.tempPicList.push(this.$refs.faultPicList.videoObj)
                }
                if(this.$refs.faultPicList .picsList){
                    this.$refs.faultPicList .picsList.forEach((item)=>{
                        this.addDistributionForm.tempPicList.push(item);
                    })
                }
                let checkValidateResult = this.checkValidate(2);   //2、直接指派
                if(checkValidateResult == false){
                    return;
                }
                this.addDistributionForm.distributionGoodsDTOList.forEach((item)=>{
                    if(item.goodIds){
                        let goodTypes = item.goodIds.split('-');
                        let type = goodTypes[0];
                        let subType = goodTypes[1];
                        item.goodsName = this.costTabsContent[type-1].name+'/'+this.costTabsContent[type-1].metaList[subType-1].name;
                    }
                });
                this.infoData = this.addDistributionForm;
                this.assignmentDialog = true;
            },
            getCommunity(communityId) {
                this.addDistributionForm.houseId = communityId;
                this.mustFillBorder = false;
                this.communityList.forEach(function(e) {
                    if (e.houseId == communityId) {
                        this.addDistributionForm.fullAddress = e.fullAddress;
                        this.addDistributionForm.housePid = e.housePid;
                        this.moduleFieldConfigGet(e.maintainerId);
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
                this.addDistributionForm.fullAddress = searchVal;
                API.searchHouse(data).then(res => {
                    if (res.code == "200") {
                        if (res.data.length > 0) {
                            this.communityList = res.data;
                            this.errFul = false;
                        } else {
                            this.communityList = [];
                            this.errFul = true;
                        }
                        if(this.distributionMustRelated){
                            this.errFul = false;
                            this.mustRelatedFul = true;
                        }
                        this.searchLoading = true;
                    }

                })
            },
            isEmpty() {
                if (!this.addDistributionForm.houseId) {
                    this.mustFillBorder = true
                } else {
                    this.mustFillBorder = false
                }
            },
            clearFullAddress(){
                this.addDistributionForm.fullAddress = '';
                this.addDistributionForm.houseId = '';
                this.communityList = [];
            },
            cancelSave(){
                this.$emit('cancelSave');
            },
            saveDistribution(){
                //图片处理
                let faultPicList = [...this.$refs.faultPicList .picsList];
                let videoObj = this.$refs.faultPicList.videoObj;
                let faultPicIdList = [];
                if(faultPicList && faultPicList.length > 0) {
                    faultPicList.forEach((val) => {
                        faultPicIdList.push(val.id)
                    })

                }
                if(videoObj&&videoObj.id){
                    faultPicIdList.push(videoObj.id);
                }
                this.addDistributionForm.fileIdList = faultPicIdList;
                let checkValidateResult = this.checkValidate(1);
                if(checkValidateResult == false){
                    return;
                }
                let goodsTemp = [];
                this.addDistributionForm.distributionGoodsDTOList.forEach((item)=>{
                    let good = Object.assign({},item);
                    if(item.goodIds){
                        let goodTypes = item.goodIds.split('-');
                        good.goodsType = goodTypes[0];
                        good.goodsSubType = goodTypes[1];
                    }
                    goodsTemp.push(good);
                });
                this.addDistributionForm.distributionGoodsList = goodsTemp;
                if(this.distributionId){
                    this.addDistributionForm.id = this.distributionId;
                    this.addDistributionForm.removeGoodsIdList = this.removeGoodsIdList;
                    this.saveLoading = true;
                    API.distributionEdit(this.addDistributionForm).then(res=>{
                        if(!res){
                            this.saveLoading= false
                        }
                        if (res.code === '200') {
                            this.$message.success('修改成功');
                            this.saveLoading= false;
                            this.$emit('successSave',res);
                        } else {
                            this.saveLoading = false;
                            this.$message.success('修改失败');
                        }
                    })
                }
                else {
                    this.saveLoading = true;
                    API.distributionAdd(this.addDistributionForm).then(res => {
                        if(!res){
                            this.saveLoading= false;
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
                //必填检验
                if(!this.addDistributionForm.fullAddress){
                    this.$message.warning('请填写配货地址');
                    return false;
                }
                if(this.distributionMustRelated&&!this.addDistributionForm.houseId){
                    this.$message.warning('请完善配货地址：在配货地址框内输入地址并在检索结果中选择');
                    return false;
                }
                if(!this.addDistributionForm.applyName){
                    this.$message.warning('请填写申请人姓名');
                    return false;
                }
                if(!this.addDistributionForm.applyPhone){
                    this.$message.warning('请填写申请人电话');
                    return false;
                }
                else{
                    if (this.checkPhone(this.addDistributionForm.applyPhone)) {
                        // 这个是判断字段传的是否正确  电话号码
                        return false;
                    }
                }
                if(!this.addDistributionForm.expectCompleteDate&&this.distributionCheck.expectCompleteDate.required==1){
                    this.$message.warning('请选择期望配货完成日期');
                    return false;
                }
                //若有一条必填项则必须有一条配货信息
                if((this.distributionCheck.quantity.required==1||this.distributionCheck.promotionDesc.required==1)&&this.addDistributionForm.distributionGoodsDTOList.length==0){
                    this.$message.warning('请添加配货物品信息');
                    return false;
                }
                //必填检验
                let temp = false;
                this.addDistributionForm.distributionGoodsDTOList.forEach((item)=>{
                    if(!item.goodIds&&this.distributionCheck.quantity.required==1){
                        temp = true;
                    }
                    if(!item.quantity&&this.distributionCheck.quantity.required==1){
                        temp = true;
                    }
                    if(!item.promotionDesc&&this.distributionCheck.promotionDesc.required==1){
                        temp = true;
                    }
                });
                if(temp){
                    this.$message.warning('请完善配货物品信息');
                    return false;
                }
                if(val == 1){
                    //1、来自添加；2、来自直接指派
                    if((!this.addDistributionForm.fileIdList||this.addDistributionForm.fileIdList.length==0)&&this.distributionCheck.fileIdList.required==1){
                        this.$message.warning('请上传附件');
                        return false;
                    }
                }
                else if(val == 2){
                    //1、来自添加；2、来自直接指派
                    if((!this.addDistributionForm.tempPicList||this.addDistributionForm.tempPicList.length==0)&&this.distributionCheck.fileIdList.required==1){
                        this.$message.warning('请上传附件');
                        return false;
                    }
                }
                if(!this.addDistributionForm.applyComment&&this.distributionCheck.applyComment.required==1){
                    this.$message.warning('请输入备注');
                    return false;
                }
            }
        },
    }
</script>

<style scoped lang="less">
    .addDistributionBox{
        width: 520px;
        max-height: calc(100vh - 90px);
        overflow: auto;
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
            .faultPicList{
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
                    width: 475px;
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
        & /deep/ .ant-select-selection__rendered{
            margin-left: 0px;
        }
        .ant-upload-text{
        }
        /deep/ .ant-cascader-picker-label{
            padding: 0;
        }
    }
</style>
