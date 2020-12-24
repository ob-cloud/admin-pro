<template>
    <!-- 添加认证信息 -->
    <div class="add-authentication-box">
        <div class="company-name">
            <div class="company-name-title">企业名称</div>
            <div class="company-info clearfix">
                <div class="f-fl"><a-input style="width:226px;height: 34px;" v-model="sendData.name" placeholder="请输入企业名称"></a-input></div>
                <div class="authentication-type f-fl clearfix">
                    <div class="authentication-type-company cursor" @click="changeType(1)" :style="sendData.type == 1?' border: 1px solid #0A87F8;':' border: #DDD solid 1px;background-color:#FFFFFF;'">
                        <div class="authentication-type-font">企业认证</div>
                        <div :class="sendData.type == 1 ?'triangle-top-right-click':'triangle-top-right-unClick'">
                        </div>
                        <icon-font class="triangle-top-right-choose" type="iconyumengtubiao_xuanzhong-"/>
                    </div>
                    <div class="authentication-type-person cursor" @click="changeType(2)" :style="sendData.type == 2?' border: 1px solid #0A87F8;':' border: #DDD solid 1px;background-color:#FFFFFF;'">
                        <div class="authentication-type-font">个人房东</div>
                        <div :class="sendData.type == 2 ?'triangle-top-right-click':'triangle-top-right-unClick'">
                        </div>
                        <icon-font class="triangle-top-right-choose" type="iconyumengtubiao_xuanzhong-"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="company-detail">
            <div class="part" style="margin-top: 20px">
                <div class="part_title">
                    运营模式
                    <span class="must">*</span>
                </div>
                <div class="part_value border-bm u-bottom-border" style="padding: 4px 0;">
                    <a-checkbox-group :options="checkedTypes" v-model="bizModeList" />
                </div>
            </div>
            <div class="part">
                <div class="part_title">
                    运营覆盖城市
                    <span class="must">*</span>
                </div>
                <div class="part_value u-bottom-border">
                    <a-form-item label="" has-feedback>
                        <a-select mode="multiple" labelInValue :value="value" placeholder="请输入城市关键字选择城市" style="width: 100%" :filterOption="false" @search="fetchUser" @change="handleChange" :notFoundContent="fetching ? undefined : null" v-model="sendData.cityList">
                            <a-spin v-if="fetching" slot="notFoundContent" size="small" />
                            <a-select-option v-for="d in data" :key="d.value">{{d.text}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
            </div>
            <div class="part clearfix">
                <div class="f-fl" style="margin-right: 20px">
                    <div class="part_title">
                        法人姓名
                        <span class="must">*</span>
                    </div>
                    <div class="u-bottom-border" style="height: 30px">
                        <a-input placeholder="请输入" style="width: 220px;height: 30px;" v-model="sendData.legalPersonName"></a-input>
                    </div>
                </div>
                <div class="f-fl">
                    <div class="part_title">
                        法人身份证号
                        <span class="must">*</span>
                    </div>
                    <div class="u-bottom-border" style="height: 30px">
                        <a-input placeholder="请输入" style="width: 220px;height: 30px;" v-model="sendData.legalPersonIdCard" maxlength="18"></a-input>
                    </div>
                </div>
            </div>
            <div class="part clearfix" v-if="sendData.type==1">
                <div class="f-fl" style="margin-right: 20px">
                    <div class="part_title">
                        是否三证合一
                        <span class="must">*</span>
                    </div>
                    <div class="border-bm u-no-border" style="padding: 6px 0;width: 220px;height: 30px;">
                        <a-radio-group v-model="sendData.isTriple">
                            <a-radio :value="1">是</a-radio>
                            <a-radio :value="0">否</a-radio>
                        </a-radio-group>
                    </div>
                </div>
                <div class="f-fl">
                    <div class="part_title">
                        营业执照号
                        <span class="must">*</span>
                    </div>
                    <div class="u-bottom-border" style="height: 30px">
                        <a-input placeholder="请输入" style="width: 220px;height: 30px;" v-model="sendData.businessLicenseNo" maxlength="18"></a-input>
                    </div>
                </div>
            </div>
            <div class="part clearfix" v-if="sendData.isTriple==0">
                <div class="f-fl" style="margin-right: 20px">
                    <div class="part_title">
                        组织机构代码
                        <span class="must">*</span>
                    </div>
                    <div class="u-bottom-border" style="height: 34px">
                        <a-input placeholder="请输入" style="width: 220px;height: 34px;" v-model="sendData.organizationCode" maxlength="18"></a-input>
                    </div>
                </div>
                <div class="f-fl">
                    <div class="part_title">
                        税务登记证号
                        <span class="must">*</span>
                    </div>
                    <div class="u-bottom-border" style="height: 34px;">
                        <a-input placeholder="请输入" style="width: 220px;height: 34px;" v-model="sendData.taxRegistrationNo" maxlength="18"></a-input>
                    </div>
                </div>
            </div>
            <div class="part" v-show="sendData.type==2">
                <div class="part_title">
                    证件信息
                    <span class="must">*</span>
                    <span style="color:#FFA036;font-size: 12px;margin-left:4px;">(附件支持格式：jpg、png、jpeg)</span>
                </div>
                <div class="part_value clearfix u-no-border" style="padding: 4px 0;">
                    <own-upload style="padding-right: 15px" class="f-fl" :picList="item1_1" :uploadParms="sendData1_1" :maxLength="1" :showTips="false" ref="img1_1">
                        <img src="../../../assets/login/idzheng.png" style="width: 120px;height: 76px"/>
                    </own-upload>
                    <own-upload style="padding-right: 15px" class="f-fl" :picList="item1_2" :uploadParms="sendData1_2" :maxLength="1" :showTips="false" ref="img1_2">
                        <img src="../../../assets/login/idfan.png" style="width: 120px;height: 76px"/>
                    </own-upload>
                </div>
            </div>
            <div class="part" v-if="sendData.type==1">
                <div class="part_title">
                    营业执照
                    <span class="must">*</span>
                    <span style="color:#FFA036;font-size: 12px;margin-left:4px;">(附件支持格式：jpg、png、jpeg)</span>
                </div>
                <div class="part_value u-no-border" style="padding: 8px 0 4px 0;">
                    <own-upload :picList="item2_1" :uploadParms="sendData2_1" :maxLength="1" :showTips="false" ref="img2_1">
                        <div v-if="item2_1.length < 1" style="padding-top: 17px">
                            <a-icon type="plus" style="color: #BBBBBB"/>
                            <div style="color: #666666;font-size: 12px">上传图片</div>
                        </div>
                    </own-upload>
                </div>
            </div>
            <div class="part" style="margin-top: 10px" v-if="sendData.type==1">
                <div class="part_title">
                    企业注册地址
                    <span class="must">*</span>
                </div>
                <div class="part_value u-bottom-border">
                    <a-input style="height: 30px;" maxlength="40" placeholder="请输入" v-model="sendData.businessRegisterdAddress"></a-input>
                </div>
            </div>
            <div class="line3" :style="sendData.type==2?'margin-top:15px':''">
                <div class="line3-line1"><span class="line3-yanzheng">验证信息</span><span class="line3-phone">管理员账号：{{phoneEncryption}}</span></div>
                <div class="line3-line2" :class="isPass?'border_blue':'border_dddddd'">
                    <drag-verify :width="448" :height="38" :handler-icon="handlerIcon" :success-icon="successIcon" text="向右滑动完成验证" success-text="验证通过" background="#FFFFFF" color="#111111" progress-bar-bg="#E6F3FE" completedBg="#E6F3FE" text-size="14px" :circle="false" @passcallback="isPass=true" ref="regVerify"></drag-verify>
                </div>
                <div class="line3-line3">
                    <div class="part_value clearfix">
                        <div class="input_wrap f-fl u-no-border">
                            <a-input style="width: 300px;margin-left: 10px;" v-model="sendData.verifyCode" maxlength="6" @input.native="phoneChangeVerification" placeholder="请输入验证码"></a-input>
                        </div>
                        <div class="f-fl">
                            <span><a-divider type="vertical" style="height: 24px"/></span>
                        </div>
                        <div class="verification f-fl">
                            <span style="text-align: center" v-if="canGetVerification" :class="isPass?'isPass':''" @click="getVerification">获取验证码</span>
                            <span style="text-align: center" v-else>{{intervalText}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="part" style="margin-top: 20px">
            </div>
            <div class="line5">
                <a-button size="large" type="submit" class="formItemMarginButton cancelFont" @click="cancelAddAuthentication">
                    取消
                </a-button>
                <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="addAuthentication" :loading="saveLoading">
                    保存
                </a-button>
            </div>
        </div>
    </div>
</template>

<script>
    import dragVerify from 'vue-drag-verify';
    import {searchCity} from '@/api/enterprise';
    import { sendVerifyCode } from '@/api/enterprise';
    import 'font-awesome/css/font-awesome.min.css';
    import * as API from '@/api/setCompany';

    export default {
        name: "addAuthentication",
        props: {
        },
        components: {
            dragVerify,
        },
        data() {
            return {
                bizModeList: [],
                checkedTypes: ['合/整租', '独栋'],
                value: [],
                fetching: false,
                lastFetchId:'',
                data: [],
                sendData:{
                    type:1,                     //1、企业认证；2、个人房东
                    bizMode:'',                 //经营模式（1.分散；2.集中；）多个用逗号隔开
                    businessLicense:'',         //营业执照
                    businessLicenseNo:'',       //营业执照号
                    businessRegisterdAddress:'',//企业注册地址
                    cityList:[],                //运营城市
                    contactPhone:'',            //管理员联系电话
                    id:'',                      //机构id
                    isAllowedOtherPlatform:'',  //认证信息是否允许使用于第三方认证
                    isTriple:1,             //是否3合一
                    legalPersonIdCard:'',       //法人身份证号
                    legalPersonName:'',         //法人姓名
                    name:'',                    //企业【机构】名称
                    organizationCode:'',        //组织机构代码
                    taxRegistrationNo:'',       //税务登记号
                    verifyCode:'',              //验证码
                },
                canGetVerification: true,
                countdown: 60,
                intervalText: '60s后重新获取',
                isPass: false,
                handlerIcon: "fa fa-angle-right",
                successIcon: "fa fa-check",
                phoneEncryption:'',
                saveLoading:false,
                item1_1: [],
                item1_2: [],
                item2_1: [],
                sendData1_1: {},
                sendData1_2: {},
                sendData2_1: {},
                imgId1_1: '',
                imgId1_2: '',
                imgId2_1:'',
            };
        },
        created: function () {
            this.initData();
        },
        mounted() {
            this.sendData1_1 = { //
                // 法人身份证正面
                bizId: '', // 房源id
                bizType: 0, // 图片大类标识 租客
                subBizType: 4, // 图片子类标识 身份证正面
                orderIndex: 1 // 排序值
            }
            this.sendData1_2 = {
                // 法人身份证反面
                bizId: '', // 房源id
                bizType: 0, // 图片大类标识  租客
                subBizType: 5, // 图片子类标识 身份证反面
                orderIndex: 2 // 排序值
            }
            this.sendData2_1 = {
                // 营业执照
                bizId: '', // 房源id
                bizType: 0, // 图片大类标识 // 合同
                subBizType: 1, // 图片子类标识 // 合同附件
                orderIndex: 1 // 排序值
            }
        },
        methods: {
            cancelAddAuthentication(){
                this.$emit('cancelAdd');
            },
            addAuthentication(){
                //运营模式处理
                if(this.bizModeList.length > 0){
                    let bizModeListParam = [];
                    this.bizModeList.forEach((item)=>{
                        if (item == '合/整租') {
                            bizModeListParam.push('1');
                        }
                        if (item == '独栋') {
                            bizModeListParam.push('2');
                        }
                    });
                    this.sendData.bizMode = bizModeListParam.join(',');
                }
                else{
                    this.sendData.bizMode = '';
                }
                //运营城市
                this.sendData.cityList.forEach((item)=>{
                    item.id = item.key;
                    item.name = item.label;
                });
                //图片处理
                let picIdList = [];
                if(this.sendData.type==1){
                    //企业
                    if (this.$refs.img2_1.picsList.length != 0) {
                        this.imgId2_1 = this.$refs.img2_1.picsList[0].id;
                        picIdList.push(this.imgId2_1);
                    }
                }
                if(this.sendData.type==2){
                    if (this.$refs.img1_1.picsList.length != 0) {
                        this.imgId1_1 = this.$refs.img1_1.picsList[0].id;
                        picIdList.push(this.imgId1_1);
                    }
                    if (this.$refs.img1_2.picsList.length != 0) {
                        this.imgId1_2 = this.$refs.img1_2.picsList[0].id;
                        picIdList.push(this.imgId1_2);
                    }
                }
                this.sendData.picList = picIdList;
                if (this.checkData()) {
                    //检查必填项
                    this.saveLoading = true;
                    API.organizationApplyApprove(this.sendData).then(res => {
                        if(!res){
                            this.saveLoading = false;
                        }
                        if (res.code == "200") {
                            this.saveLoading = false;
                            this.$message.info('申请认证成功');
                            this.$emit("addSuccess");
                        } else {
                            this.$message.error('申请认证失败');
                            this.saveLoading = false;
                        }
                    });
                }
            },
            checkData() {
                if (!this.sendData.name) {
                    this.$message.error('请输入企业名称!');
                    return false;
                }
                if (this.bizModeList.length == 0) {
                    this.$message.error('请选择运营模式!');
                    return false;
                }
                if (this.sendData.cityList.length == 0) {
                    this.$message.error('请选择运营覆盖城市!');
                    return false;
                }
                if(!this.sendData.legalPersonName){
                    this.$message.error('请输入法人姓名!');
                    return false;
                }
                if(!this.sendData.legalPersonIdCard){
                    this.$message.error('请输入法人身份证!');
                    return false;
                }
                if(this.sendData.type == 1){
                    if(!this.sendData.businessLicenseNo){
                        this.$message.error('请输入法人身份证!');
                        return false;
                    }
                    if(this.sendData.isTriple == 0){
                        if(!this.sendData.organizationCode){
                            this.$message.error('请输入组织机构代码!');
                            return false;
                        }
                        if(!this.sendData.taxRegistrationNo){
                            this.$message.error('请输入税务登记号!');
                            return false;
                        }
                    }
                    if(!this.imgId2_1){
                        this.$message.error('请上传营业执照!');
                        return false;
                    }
                    if(!this.sendData.businessRegisterdAddress){
                        this.$message.error('请输入企业注册地址!');
                        return false;
                    }
                }
                else if(this.sendData.type == 2){
                    if(!this.imgId1_1){
                        this.$message.error('请上传房东身份证正面照片!');
                        return false;
                    }
                    if(!this.imgId1_2){
                        this.$message.error('请上传房东身份证反面面照片!');
                        return false;
                    }
                }
                if(!this.sendData.verifyCode){
                    this.$message.error('请输入验证码!');
                    return false;
                }
                return true;
            },
            onChangeSolved(e) {
                if(e.target.checked){
                   this.sendData.isAllowedOtherPlatform = 1;
                }
                else{
                    this.sendData.isAllowedOtherPlatform = 0;
                }
            },
            initData(){
                API.organizationViewApprove().then(res => {
                    if (res.code == 200) {
                        this.sendData = res.data;
                        if(!this.sendData.type){
                          this.sendData.type = 1;
                        }
                        //解析bizMode
                        if(this.sendData.bizMode!=null){
                            this.bizModeList = [];
                            let temp = this.sendData.bizMode.split(',');
                            if(temp.length > 0 ){
                                temp.forEach((item)=>{
                                    if(item==1){
                                        this.bizModeList.push('合/整租');
                                    }
                                    if(item==2){
                                        this.bizModeList.push('独栋');
                                    }
                                })
                            }
                        }
                        if(this.sendData.cityList!=null){
                            this.sendData.cityList.forEach((item)=>{
                                item.key = item.id;
                                item.label = item.name;
                            })
                        }
                        if( this.sendData.picList == null){
                            this.item1_1 = [];
                        }
                        else{
                            let item1_1_temp = [];
                            let item1_2_temp = [];
                            let item2_1_temp = [];
                            this.sendData.picList.forEach((item)=>{
                                item.status = 'done';
                                if(item.subBizType == 1){
                                    item2_1_temp.push(item);
                                }
                                else if(item.subBizType == 4){
                                    item1_1_temp.push(item);
                                }
                                else if(item.subBizType == 5){
                                    item1_2_temp.push(item);
                                }
                            });
                            if(this.sendData.type == 1){
                                this.item2_1 = item2_1_temp;
                            }
                            else if(this.sendData.type == 2){
                                this.item1_1 = item1_1_temp;
                                this.item1_2 = item1_2_temp;
                            }

                        }
                        this.phoneEncryption = this.resetPhone(this.sendData.contactPhone);
                    }
                });
            },
            changeType(val){
                this.sendData.type = val;
            },
            fetchUser(value) {
                this.lastFetchId += 1;
                const fetchId = this.lastFetchId;
                this.data = [];
                if (value !== '') {
                    this.fetching = true;
                    searchCity(value).then(res => {
                        if (res.code === '200') {
                            if (fetchId !== this.lastFetchId) {
                                // for fetch callback order
                                return;
                            }
                            const data = res.data.map(user => ({
                                text: user.name,
                                value: user.id,
                            }));
                            this.data = data;
                            this.fetching = false;
                        }
                    });
                } else {
                    this.data = [];
                }

            },
            handleChange(value) {
                Object.assign(this, {
                    value,
                    data: [],
                    fetching: false,
                });
                this.sendData.cityList = value;
            },
            resetPhone(phone) {
                var str = String(phone)
                var len = str.length;
                if (len >= 7) {
                    var reg = str.slice(-8, -4)
                    return str.replace(reg, "****")
                } else if (len < 7 && len >= 6) {
                    //1234567
                    var reg = str.slice(-4, -2)
                    return str.replace(reg, "**")
                }
            },
            settime() {
                const _this = this;
                if (_this.countdown == 0) {
                    _this.canGetVerification = true;
                    _this.intervalText = '获取验证码';
                    _this.countdown = 60;
                    return false;
                } else {
                    _this.canGetVerification = false;
                    _this.intervalText = _this.countdown + 's后重新获取';
                    _this.countdown--;
                }
                setTimeout(function() {
                    _this.settime();
                }, 1000);
            },
            // 发送验证码
            getVerification() {
                const _this = this;
                if (!_this.sendData.contactPhone) {
                    this.$message.error('请输入手机号!');
                    return;
                }
                if (!_this.$refs.regVerify.isPassing) {
                    _this.$message.warning('请将滑块拖动到右侧');
                    return;
                } else {
                    const regTel = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                    if (regTel.test(_this.sendData.contactPhone)) {
                        if (_this.canGetVerification) {
                            _this.canGetVerification = false;
                            let sendData = _this.sendData.contactPhone;
                            _this.settime();
                            sendVerifyCode(sendData).then(res => {
                                if (res.code === '200') {
                                    this.$message.success('短信发送成功，请注意接收！');
                                }
                            });
                        }
                    } else {
                        this.$message.error('手机号有误');
                    }
                }
            },
            phoneChangeVerification(e){
                e.target.value = e.target.value.replace(/[^\.\d]/g, '');
                this.sendData.verifyCode = e.target.value;
            },
        },
    };


</script>

<style lang="less" scoped>
.add-authentication-box{
    background:rgba(255,255,255,1);
    width: 520px;
    height: calc(100vh - 100px);
    overflow: auto;
  border-radius: 0 0 4px 4px;
    .company-name{
        margin-top: 10px;
        padding: 14px 20px;
        height: 88px;
        background:rgba(245,247,254,1);
        .company-name-title{
            color: #111;
            font-size: 18px;
            font-weight: 500;
            height:24px;
        }
        .company-info{
            margin-top: 8px;
            .authentication-type {
                margin-left: 10px;
                .authentication-type-font {
                    margin-left: 10px;
                }
                .triangle-top-right-choose {
                    position: absolute;
                    color: #FFFFFF;
                    top: 2px;
                    right: 2px;
                }
                .triangle-top-right-click {
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-top: 32px solid #0A87F8;
                    border-left: 32px solid transparent;
                    top: 0px;
                    right: 0px;
                }
                .triangle-top-right-unClick {
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-top: 32px solid #DDDDDD;
                    border-left: 32px solid transparent;
                    top: 0px;
                    right: 0px;
                }
                .authentication-type-company {
                    float: left;
                    text-align: left;
                    width: 114px;
                    height: 34px;
                    margin-right: 10px;
                    line-height: 34px;
                    border-radius: 3px;
                    position: relative;
                }

                .authentication-type-person {
                    float: left;
                    text-align: left;
                    width: 114px;
                    height: 34px;
                    line-height: 34px;
                    border-radius: 3px;
                    position: relative;
                }
            }
        }
    }
    .company-detail{
        .part {
            width: 480px;
            margin: 25px auto 0;
            color: #111111;
            font-size: 14px;
            .must {
                display: inline-block;
                margin-left: 1px;
                color: #FB4246;
            }
            .border-bm {
                border-bottom: 1px solid #dddddd;
            }
            .part_title{
                color: #777777;
                font-size: 12px;
                height: 18px;
            }
            .part_value {
                .input_wrap {
                    width: calc(100% - 100px);
                }
                .verification {
                    width: 100px;
                    height: 38px;
                    line-height: 38px; // color: @mainColor;
                    cursor: pointer;
                    text-align: right;
                }
                .eyes_wrap {
                    text-align: right; // padding-right: 30px;
                }
            }
            /deep/ .title span:not(.must-fill){
                color: #111111;
                font-size: 14px;
            }
            /deep/ .must-fill {
                display: inline-block;
                margin-left: 8px;
                font-size: 14px;
            }
            /deep/ .ant-input{
                color: #111111;
                font-size: 14px;
            }
            /deep/ .ant-checkbox-group-item span{
                color: #111111;
                font-size: 14px;
            }
            /deep/ .ant-select-selection__placeholder{
                color: #BBBBBB;
                font-size: 14px;
            }
            /deep/ .ant-select-selection__rendered > ul > li{
                color: #111111;
                font-size: 14px;
            }
            /deep/ .ant-select-selection__rendered{
                margin-left: 0;
                margin-right: 0px;
            }
            /deep/ .ant-select-selection--multiple .ant-select-selection__placeholder{
                margin-left: 0;
            }
        }
        .line3{
            width: 480px;
            height: 172px;
            background: #F7F8FB;
            margin: 25px 20px 20px 20px;
            padding: 15px;
            .line3-line1{
                .line3-yanzheng{
                    color: #111111;
                    font-weight:400;
                    font-size: 16px;
                }
                .line3-phone{
                    color: #777777;
                    font-weight:400;
                    font-size: 16px;
                    margin-left: 15px;
                }
            }
            .border_blue{
                border: 1px solid #0A87F8;
            }
            .border_dddddd{
                border: 1px solid #DDDDDD;
            }
            .line3-line2{
                margin-top: 12px;
                /deep/ .drag_verify{
                    border-radius: 4px;
                    color: #111111!important;
                }
                /deep/ .drag_verify .dv_handler {
                    width: 40px !important;
                    height: 40px !important;
                    margin-top: -1px;
                    border: 1px solid #dddddd;
                }
                /deep/ .dv_handler_ok_bg {
                    background: #0A87F8!important;
                }
                /deep/ .drag_verify .dv_handler_ok_bg i{
                    color: #FFFFFF;
                }
                /deep/ .dv_text {
                    color: #111111!important;
                }
                /deep/ .drag_verify .dv_handler i{
                    vertical-align: -0.1em;
                }
            }
            .line3-line3 {
                margin-top: 15px;
                width: 450px;
                height: 38px;
                line-height: 38px;
                background-color: #FFFFFF;
                .part_value {
                    .input_wrap {
                        width: 320px;
                    }
                    .verification {
                        height: 38px;
                        line-height: 38px;
                        width: 104px;
                        color: #999999;
                        cursor: pointer;
                        text-align: center;
                    }

                    .isPass {
                        color: #0A87F8;
                    }

                    .eyes_wrap {
                        text-align: right;
                        // padding-right: 30px;
                    }
                }
            }
        }
        .line5 {
            margin: 20px;
            text-align: right;
          border-radius: 0 0 4px 4px;
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
}
</style>