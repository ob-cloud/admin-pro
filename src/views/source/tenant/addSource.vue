<template>
    <div class="addSourceBox">
        <div class="clueType clearfix" v-mark="['mk_source_tenant_tjzy']">
            <div v-mark="['mk_source_tenant_gk_tjzy']">
                <div class="clueTypeLeft f-fl clearfix cursor" :class="clueType==1?'clickBorder clickBg':'normalBorder normalBg'" @click="changeClueType(1)">
                    <div class="name1 f-fl">私客</div>
                    <div class="name2 f-fl">（他人不可见）</div>
                    <div class="triangle-top-right"
                         :class="clueType == 1 ?'choose-display-block':'choose-display-none'">
                    </div>
                    <icon-font class="triangle-top-right-choose"
                               :class="clueType == 1 ?'choose-display-block':'choose-display-none'"
                               type="iconyumengtubiao_xuanzhong-"/>
                </div>
                <div class="clueTypeLeft clueTypeRight f-fl clearfix cursor" :class="clueType==2?'clickBorder clickBg':'normalBorder normalBg'" @click="changeClueType(2)">
                    <div class="name1 f-fl">公客</div>
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
                    <label-item title="姓名" :mustFill="true">
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
                    <label-item title="电话" :mustFill="true">
                        <div class="u-bottom-border normalWidth">
                            <a-input v-model="addSourceForm.phone" :maxlength="11" @keyup.native="mixin_integerFilter('addSourceForm.phone')" @blur="checkPhone(addSourceForm.phone)" placeholder="请输入电话" />
                        </div>
                    </label-item>
                </div>
                <div class="f-fl" style="margin-left: 30px">
                    <label-item title="微信/QQ/其它" :mustFill="renterCheck.socialAccount.required==1">
                        <div class="u-bottom-border normalWidth">
                            <a-input v-model="addSourceForm.socialAccount" placeholder="请输入其他联系方式" />
                        </div>
                    </label-item>
                </div>
                <div class="f-fl" style="margin-left: 30px">
                    <label-item title="来源" :mustFill="renterCheck.sourceChannelId.required==1">
                        <div class="u-bottom-border normalWidth">
                            <a-select :showSearch="true" :filterOption="(inputValue,option)=>filterOption(inputValue,option)" v-model="addSourceForm.sourceChannelId" style="width:100%" placeholder="请选择">
                                <a-select-option v-for="(item) in sourceChannelList" :disabled="item.disabled" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
                            </a-select>
                        </div>
                    </label-item>
                </div>
            </div>
        </div>
        <div class="demandInfo">
            <div class="title">需求信息</div>
            <div class="clearfix" style="width: 100%;height: 80px">
                <div class="f-fl">
                    <label-item title="紧急程度" :mustFill="renterCheck.urgencyLevel.required==1">
                        <div class="u-bottom-border normalWidth">
                            <a-select v-model="addSourceForm.urgencyLevel" style="width:100%" placeholder="请选择">
                                <a-select-option v-for="(item,index) in urgencyLevelList" :disabled="item.disabled" :key="index" :value="item.id">{{item.name}}</a-select-option>
                            </a-select>
                        </div>
                    </label-item>
                </div>
                <div class="f-fl" style="margin-left: 30px">
                    <label-item title="预计入住周期" :mustFill="renterCheck.leasePeriod.required==1">
                        <div class="u-bottom-border normalWidth">
                            <a-select v-model="addSourceForm.leasePeriod" style="width:100%" placeholder="请选择">
                                <a-select-option v-for="(item,index) in leasePeriodList" :disabled="item.disabled" :key="index" :value="item.id">{{item.name}}</a-select-option>
                            </a-select>
                        </div>
                    </label-item>
                </div>
                <div class="f-fl" style="margin-left: 30px;width: 365px;">
                    <label-item title="意向位置" :mustFill="renterCheck.cityId.required==1">
                        <div class="clearfix u-bottom-border">
                            <div class="f-fl">
                                <a-select style="width: 100px" v-model="addSourceForm.cityId"  @change="selectCity">
                                    <a-select-option :value="item.id" :key="item.id" :disabled="item.disabled" v-for="(item,index) in cityList">{{ item.name }}</a-select-option>
                                </a-select>
                            </div>
                            <div class="f-fl" style="width: 265px;">
                                <a-input v-model="addSourceForm.locationInfo" placeholder="请输入意向位置" />
                            </div>
                        </div>
                    </label-item>
                </div>
            </div>
            <div class="clearfix" style="width: 100%;height: 80px">
                <div class="normalWidth f-fl">
                    <input-item title="可接受租金范围" width="167px" height="60px" :must="renterCheck.acceptMoney.required==1">
                        <template slot="content">
                            <a-input placeholder="请输入" v-model="addSourceForm.minMoney" v-validate="'max(999999999)'" class="input_end_css1" @input.native="priceReg1" >
                                <span slot="suffix">~</span>
                            </a-input>
                            <a-input placeholder="请输入" v-model="addSourceForm.maxMoney" v-validate="'max(999999999)'" class="input_end_css2" @input.native="priceReg2">
                                <span slot="suffix">元</span>
                            </a-input>
                        </template>
                    </input-item>
                </div>
                <div class="f-fl" style="margin-left: 30px">
                    <label-item title="需求户型" :mustFill="renterCheck.demandType.required==1">
                        <div class="u-bottom-border" style="width:562px">
                            <a-select mode="multiple" style="width: 100%" :showArrow="true"
                                      v-model="addSourceForm.demandTypeList" placeholder="请选择需求户型"  @change="handleChange" >
                                <a-select-option v-for="(item,index) in demandTypeList" :key="index" :value="item.id">{{item.name}}</a-select-option>
                            </a-select>
                        </div>
                    </label-item>
                </div>
            </div>
            <div class="demandLabel">
                <label-item title="其他需求（可多选）" style="width: 760px;min-height: 60px;" :mustFill="renterCheck.otherDemandType.required==1">
                    <div class="clearfix u-no-border" style="width: 100%;">
                        <div v-for="(item,index) in addSourceForm.demandLabelList" :key="index" class="selectDemandLabelItem f-fl">
                            {{item}} <icon-font class="cursor" @click="removeDemandLabelList(item)" type="iconyumengtubiao_guanbi-"/>
                        </div>
                        <div class="f-fl"><a-input v-model="demandLabel"  placeholder="可输入补充标签，回车添加" @keyup.enter="addDemandLabel" /></div>
                    </div>
                </label-item>
                <div class="demandLabelAll clearfix cursor">
                    <div v-for="(item,index) in demandLabelList" :key="index" class="demandLabelItem f-fl" :class="(addSourceForm.demandLabelList&&addSourceForm.demandLabelList.indexOf(item)>-1)?'clickBg':'normalBg'" @click="addRemoveDemandLabel(item)">
                        {{item}}
                    </div>
                </div>
            </div>
            <label-item
                    class="item u-bottom-border"
                    style="width: 100%;margin-top: 25px;"
                    title="备注" :mustFill="renterCheck.comment.required==1"
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
    </div>
</template>

<script>
    import { moduleFieldConfigGet } from '@/api/decision';
    import InputItem from "@/components/inputBox/inputItem";
    import * as PublicAPI from '@/api/public';
    import * as API from '@/api/source';
    import { CURRENTDEPTID } from '@/store/mutation-types';
    const demandTypeList = [
        {
            id:'1',
            name:'整租1室',
        },
        {
            id:'2',
            name:'整租2室',
        },
        {
            id:'3',
            name:'整租3室',
        },
        {
            id:'11',
            name:'合租主卧',
        },
        {
            id:'12',
            name:'合租次卧',
        },
        {
            id:'21',
            name:'床位',
        },
    ];
    const demandLabelList =[
        '交通便利','精装修','近超市','带独卫','带阳台','高层','朝南','可养宠物','全男室友','电梯房','有地铁'
    ];
    export default {
        name: "addSource",
        components: {
            InputItem,
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
                    phone:'',
                    gender:1,
                    comment:'',
                    cityId:'',
                    cityName:'',
                    sourceChannelId:'',
                    urgencyLevel:1,
                    leasePeriod:2,
                    demandTypeList:[],
                    demandLabelList:[],
                    locationInfo:'',
                    minMoney:'',
                    maxMoney:'',
                    socialAccount:'',
                },
                //获取小区地址相关
                cityList: [],
                communityList: [],
                searchCommunityVal: undefined,
                sourceChannelList:[],               //渠道来源
                urgencyLevelList:[
                    {
                        id:1,
                        name:'紧急（7天以内）',
                        disabled:false
                    },
                    {
                        id:2,
                        name:'一般（15天以内）',
                        disabled:false
                    },
                    {
                        id:3,
                        name:'暂缓（30天以内）',
                        disabled:false
                    },
                    {
                        id:4,
                        name:'更久（30天以上）',
                        disabled:false
                    },
                ],  //紧急程度
                leasePeriodList:[
                    {
                        id:1,
                        name:'一个月',
                        disabled:false
                    },
                    {
                        id:2,
                        name:'三个月',
                        disabled:false
                    },
                    {
                        id:3,
                        name:'半年',
                        disabled:false
                    },
                    {
                        id:4,
                        name:'一年',
                        disabled:false
                    },
                    {
                        id:5,
                        name:'一年以上',
                        disabled:false
                    },
                ],    //租期
                demandTypeList:demandTypeList,      //需求户型
                demandLabelList:demandLabelList,    //其他需求
                demandLabel:'',                     //添加的其他需求
                demandTypeListStr:[],               //解析
                saveLoading:false,
                copyAddSourceForm:{},
                renterCheck:{
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
            }
        },
        created() {
            this.initData();
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
            //获取初始化配置
            moduleFieldConfigGet(){
                let paramter ={
                    features:'default',
                    moduleMark:'crm.renterClue',
                    deptId:this.$ls.get(CURRENTDEPTID),
                };
                moduleFieldConfigGet(paramter).then(res=>{
                    if(res&&res.data&&res.data.fieldsObj){
                        this.renterCheck = res.data.fieldsObj;
                        this.initDefault();
                        //紧急程度初始化
                        if(this.renterCheck.urgencyLevel.unEditable==1&&this.renterCheck.urgencyLevel.default){
                            this.urgencyLevelList.forEach((item)=>{
                                if(item.id == this.renterCheck.urgencyLevel.default){
                                    item.disabled = false;
                                }
                                else{
                                    item.disabled = true;
                                }
                            });
                        }
                        else{
                            this.urgencyLevelList.forEach((item)=>{
                                item.disabled = false;
                            });
                        }
                        //预计入住周期初始化
                        if(this.renterCheck.leasePeriod.unEditable==1&&this.renterCheck.leasePeriod.default){
                            this.leasePeriodList.forEach((item)=>{
                                if(item.id == this.renterCheck.leasePeriod.default){
                                    item.disabled = false;
                                }
                                else{
                                    item.disabled = true;
                                }
                            })
                        }
                        else{
                            this.leasePeriodList.forEach((item)=>{
                                item.disabled = false;
                            });
                        }
                    }
                    else{
                        this.renterCheck = {
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
                    }
                    // 获取租户的授权城市信息列表
                    this.getCity();
                    this.getSourceChannel();
                });
            },
            initDefault(){
                //初始化默认值
                if(this.renterCheck.gender&&this.renterCheck.gender.default){
                    this.gender = this.renterCheck.gender.default;
                }
                if(this.renterCheck.sourceChannelId&&this.renterCheck.sourceChannelId.default){
                    this.addSourceForm.sourceChannelId = this.renterCheck.sourceChannelId.default;
                }
                if(this.renterCheck.urgencyLevel&&this.renterCheck.urgencyLevel.default){
                    this.addSourceForm.urgencyLevel = this.renterCheck.urgencyLevel.default;
                }
                if(this.renterCheck.leasePeriod&&this.renterCheck.leasePeriod.default){
                    this.addSourceForm.leasePeriod = this.renterCheck.leasePeriod.default;
                }
                if(this.renterCheck.cityId&&this.renterCheck.cityId.default){
                    this.addSourceForm.cityId = this.renterCheck.cityId.default;
                }
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
                    this.addSourceForm.cityId = this.cityList[0].id
                    this.addSourceForm.cityName = this.cityList[0].name;
                    if(this.renterCheck.cityId.unEditable==1&&this.renterCheck.cityId.default){
                        this.cityList&&this.cityList.forEach((item)=>{
                            if(item.id==this.renterCheck.cityId.default){
                                item.disabled = false;
                            }
                            else{
                                item.disabled = true;
                            }
                        });
                    }
                    else{
                        this.cityList&&this.cityList.forEach((item)=>{
                            item.disabled = false;
                        });
                    }
                })
            },
            getSourceChannel(){
                API.getSourceChannel().then(res=>{
                    this.sourceChannelList = res.data;
                    if(!this.sourceId&&!this.renterCheck.sourceChannelId.default) {
                        this.addSourceForm.sourceChannelId = this.sourceChannelList[0].id;
                    }
                    if(this.renterCheck.sourceChannelId.unEditable==1&&this.renterCheck.sourceChannelId.default){
                        this.sourceChannelList&&this.sourceChannelList.forEach((item)=>{
                            if(item.id==this.renterCheck.sourceChannelId.default){
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
                })
            },
            initData(){
                if(this.defalutClueType){
                    this.clueType = this.defalutClueType;
                    this.addSourceForm.clueType = this.defalutClueType;
                }
                if(this.sourceId){
                    API.enterClueView(this.sourceId).then(res=>{
                        this.addSourceForm = res.data;
                        this.addSourceForm.phone = this.addSourceForm.originPhone;
                        this.addSourceForm.socialAccount = this.addSourceForm.originSocialAccount;
                        this.addSourceForm.minMoney = this.addSourceForm.minMoney/100;
                        this.addSourceForm.maxMoney = this.addSourceForm.maxMoney/100;
                        if(this.addSourceForm.demandTypeList) {
                            let tempList = this.addSourceForm.demandTypeList;
                            for (let i = 0; i <tempList.length; i++) {
                                if(tempList[i] == '1'){
                                    this.demandTypeListStr.push('整租1室');
                                }
                                else if(tempList[i] == '2'){
                                    this.demandTypeListStr.push('整租2室');
                                }
                                else if(tempList[i] == '3'){
                                    this.demandTypeListStr.push('整租3室');
                                }
                                else if(tempList[i] == '11'){
                                    this.demandTypeListStr.push('合租主卧');
                                }
                                else if(tempList[i] == '12'){
                                    this.demandTypeListStr.push('合租次卧');
                                }
                                else if(tempList[i] == '21'){
                                    this.demandTypeListStr.push('床位');
                                }
                            }
                        }else{
                            this.addSourceForm.demandTypeList = [];
                        }
                        if(!this.addSourceForm.demandLabelList){
                            this.addSourceForm.demandLabelList = [];
                        }
                        if(!this.addSourceForm.sourceChannelId){
                            this.addSourceForm.sourceChannelId = this.sourceChannelList[0].id;
                        }
                        if(!this.addSourceForm.urgencyLevel){
                            this.addSourceForm.urgencyLevel = 1;
                        }
                        if(!this.addSourceForm.leasePeriod){
                            this.addSourceForm.leasePeriod = 2;
                        }
                        this.copyAddSourceForm = Object.assign({}, this.addSourceForm);
                    })
                }
            },
            selectCity(val){
                this.addSourceForm.cityId = val;
                for (let i = 0; i < this.cityList.length; i++) {
                    if(this.cityList[i].id == val){
                        this.addSourceForm.cityName = this.cityList[i].name;
                    }
                }
            },
            handleChange(value) {
                this.addSourceForm.demandTypeList = value;
            },
            addRemoveDemandLabel(value){
                let pos = this.addSourceForm.demandLabelList.indexOf(value)
                if(pos > -1){
                    this.addSourceForm.demandLabelList.splice(pos,1);
                }
                else{
                    this.addSourceForm.demandLabelList.push(value);
                }
            },
            addDemandLabel(){
                let value = this.demandLabel;
                if(this.demandLabel){
                    let pos = this.addSourceForm.demandLabelList.indexOf(value)
                    if(pos > -1){
                      this.$message.warning('该需求已存在，不可重复添加');
                    }
                    else{
                        this.addSourceForm.demandLabelList.push(value);
                        this.demandLabel='';
                    }
                }
            },
            cancelSave(){
                this.$emit('cancelSave');
            },
            checkValidate(){
                //必填检验
                if(!this.addSourceForm.name){
                    this.$message.warning('请填写租客姓名');
                    return false;
                }
                if(!this.addSourceForm.phone){
                    this.$message.warning('请填写租客���话');
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
                if(!this.addSourceForm.socialAccount&&this.renterCheck.socialAccount.required==1){
                    this.$message.warning('请输入其他联系方式');
                    return false;
                }
                if(!this.addSourceForm.sourceChannelId&&this.renterCheck.sourceChannelId.required==1){
                    this.$message.warning('请选择来源');
                    return false;
                }
                if(!this.addSourceForm.urgencyLevel&&this.renterCheck.urgencyLevel.required==1){
                    this.$message.warning('请选择紧急程度');
                    return false;
                }
                if(!this.addSourceForm.leasePeriod&&this.renterCheck.leasePeriod.required==1){
                    this.$message.warning('请选择预计入住周期');
                    return false;
                }
                if((!this.addSourceForm.cityId||!this.addSourceForm.locationInfo)&&this.renterCheck.cityId.required==1){
                    this.$message.warning('请选择意向租房位置');
                    return false;
                }
                if(!this.addSourceForm.minMoney&&!this.addSourceForm.maxMoney&&this.renterCheck.acceptMoney.required==1){
                    this.$message.warning('请输入可接受租金范围');
                    return false;
                }
                if((!this.addSourceForm.demandTypeList||this.addSourceForm.demandTypeList.length==0)&&this.renterCheck.demandType.required==1){
                    this.$message.warning('请选择需求户型');
                    return false;
                }
                if((!this.addSourceForm.demandLabelList||this.addSourceForm.demandLabelList.length==0)&&this.renterCheck.otherDemandType.required==1){
                    this.$message.warning('请输入其他需求');
                    return false;
                }
                if(!this.addSourceForm.comment&&this.renterCheck.comment.required==1){
                    this.$message.warning('请输入备注');
                    return false;
                }
            },
            saveSource(){
                let checkValidateResult = this.checkValidate();
                if(checkValidateResult == false){
                    return;
                }
                if(this.addSourceForm.clueType == 2) {
                    if (this.addSourceForm.socialAccount) {
                        if (this.addSourceForm.socialAccount == this.copyAddSourceForm.socialAccount) {
                            this.addSourceForm.socialAccount = this.addSourceForm.originSocialAccount;
                        }
                    }
                }
                //阻止页面金额变化
                let addSourceFormCopy = Object.assign({},this.addSourceForm);
                addSourceFormCopy.maxMoney =  Math.round(addSourceFormCopy.maxMoney * 100);
                addSourceFormCopy.minMoney =  Math.round(addSourceFormCopy.minMoney * 100);
                //公客加密问题处理
                if(this.addSourceForm.clueType == 2){
                    if(this.addSourceForm.phone == this.copyAddSourceForm.phone) {
                        addSourceFormCopy.phone = this.addSourceForm.originPhone;
                    }
                    if(this.addSourceForm.socialAccount){
                        if(this.addSourceForm.socialAccount == this.copyAddSourceForm.socialAccount){
                            addSourceFormCopy.socialAccount = this.addSourceForm.originSocialAccount;
                        }
                    }
                }
                this.saveLoading = true;
                if(this.sourceId){
                    if(this.fromType == 2){
                        API.renterClueEdit(addSourceFormCopy).then(res => {
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
                        API.renterClueReactivate(addSourceFormCopy).then(res=>{
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
                    API.renterClueAdd(addSourceFormCopy).then(res => {
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
            removeDemandLabelList(item){
                let pos = this.addSourceForm.demandLabelList.indexOf(item);
                if(pos > -1){
                    this.addSourceForm.demandLabelList.splice(pos,1);
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .addSourceBox{
        max-height: calc(100vh - 100px);
        overflow: auto;
        .clueType{
            width: 100%;
            &>div{
                padding:20px 20px 0 20px;
            }
            .clueTypeLeft{
                width: 370px;
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
        .title{
            width: 100%;
            color: #111111;
            font-size: 18px;
            font-weight:500;
        }
        .basicInfo{
            width: 100%;
            padding:20px 20px 0 20px;
            .name{
                position: relative;
                .gender{
                    position: absolute;
                    right: 0px;
                    bottom: 5px;
                }
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
            padding:20px 20px 0 20px;
            .demandLabel{
                width: 100%;min-height: 80px;
                & /deep/ .ant-input {
                    box-shadow: none;
                    width: 190px;
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
                    width:760px;
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
                    border-top: 1px solid #DDDDDD;
                }
            }
        }
        .normalWidth{
            width: 167px;
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
            bottom: 0px;
            right: 20px;
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
    }
</style>
