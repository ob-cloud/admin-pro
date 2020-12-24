<template>
    <!-- 添加/修改认证 -->
    <div class="add-authentication-box" :class="orgType == 1?'heightBig':'heightSmall'">
        <a-form :form="form" :layout="formLayout">
            <div class="authentication-head">
                由「e签宝」提供法律认证
            </div>
            <div class="authentication">
                <div class="authentication-type-name bolderSpan" v-if="operateType==1 || operateType==4">
                    <b>公司类型</b>
                </div>
                <div class="authentication-type clearfix" v-if="operateType==1 || operateType==4">
                    <div class="authentication-type-company cursor" @click="orgType = 1" :style="orgType == 1?' border: 1px solid #0A87F8;background-color: rgba(10, 135, 248, 0.1);':' '">
                        <div class="authentication-type-font">公司</div>
                        <div class="triangle-top-right"
                             :class="orgType == 1 ?'choose-display-block':'choose-display-none'">
                        </div>
                        <icon-font class="triangle-top-right-choose"
                                   :class="orgType == 1 ?'choose-display-block':'choose-display-none'"
                                   type="iconyumengtubiao_xuanzhong-"/>
                    </div>
                    <div class="authentication-type-person cursor" @click="orgType = 2" :style="orgType == 2?' border: 1px solid #0A87F8;background-color: rgba(10, 135, 248, 0.1);':' '">
                        <div class="authentication-type-font">个人</div>
                        <div class="triangle-top-right"
                             :class="orgType == 2 ?'choose-display-block':'choose-display-none'">
                        </div>
                        <icon-font class="triangle-top-right-choose"
                                   :class="orgType == 2 ?'choose-display-block':'choose-display-none'"
                                   type="iconyumengtubiao_xuanzhong-"/>
                    </div>
                </div>
                <div v-if="orgType==1">
                    <div class="authentication-company-title bolderSpan">
                        <b>公司信息</b>
                    </div>
                    <div class="authentication-company-info">
                        <div class="person-info-first clearfix">
                            <div class="authentication-person-item">
                                <a-form-item class="u-bottom-border">
                                    <label-item title="公司名称" :mustFill="true">
                                        <span v-if="operateType==2" class="viewStyle">{{detail.name}}</span>
                                        <a-input v-else placeholder="请输入"
                                                 v-decorator="['name', { rules: [{ required: true,message: '请输入公司名称', trigger: 'blur' }] }]"/>
                                    </label-item>
                                </a-form-item>
                            </div>
                            <div class="authentication-person-item">
                                <a-form-item class="u-bottom-border">
                                    <label-item title="统一社会信用代码" :mustFill="true">
                                        <span v-if="operateType==2" class="viewStyle">{{detail.certCode}}</span>
                                        <a-input v-else placeholder="请输入"
                                                 v-decorator="['certCode', { rules: [{ required: true,message: '请输入统一社会信用代码', trigger: 'blur' }] }]"/>
                                    </label-item>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="person-info-second clearfix">
                            <div class="authentication-person-item">
                                <a-form-item class="u-bottom-border">
                                    <label-item title="法人姓名" :mustFill="true">
                                        <span v-if="operateType==2" class="viewStyle">{{detail.legalPerson}}</span>
                                        <a-input v-else placeholder="请输入"
                                                 v-decorator="['legalPerson', { rules: [{ required: true,message: '请输入法人姓名姓名', trigger: 'blur' }] }]"/>
                                    </label-item>
                                </a-form-item>
                            </div>
                            <div class="authentication-person-item">
                                <a-form-item class="u-bottom-border">
                                    <label-item title="法人身份信息" :mustFill="true">
                                        <span v-if="operateType==2" class="viewStyle">{{detail.legalPersonCertType|certificate}}/{{detail.legalPersonCertCode}}</span>
                                        <div v-else>
                                            <a-select @change="handleChangeLegalPersonCert" :defaultValue="1"
                                                      v-model="legalPersonCertType"
                                                      style="width: 120px">
                                                <a-select-option :value='1'>身份证号</a-select-option>
                                                <a-select-option :value='2'>护照</a-select-option>
                                                <a-select-option :value='3'>香港来往大陆通行证</a-select-option>
                                                <a-select-option :value='4'>澳门来往大陆通行证</a-select-option>
                                                <a-select-option :value='5'>台湾同胞证</a-select-option>
                                                <a-select-option :value='6'>其他</a-select-option>
                                            </a-select>
                                            <a-input placeholder="请输入" :disabled="operateType==2"
                                                     v-decorator="['legalPersonCertCode', { rules: [{ required: true,message: '请输入法人身份信息', trigger: 'blur' }] }]"
                                                     style="width: 250px;"/>
                                        </div>
                                    </label-item>
                                </a-form-item>
                            </div>
                        </div>
                    </div>
                    <div class="authentication-pic clearfix">
                        <div class="authentication-pic-license" style="position:relative;">
                            <div class="authentication-pic-font">
                                <span>营业执照</span>
                                <span style="color: #FB4246;margin-left:1px;">*</span>
                            </div>
                            <div v-if="operateType==2" class="showImg">
                                <div class="f-fl cursor" v-if="bizLicenceUrl">
                                    <div @click="handlePreview(bizLicenceUrl)"><img :src="bizLicenceUrl" alt=""/></div>
                                </div>
                            </div>
                            <div v-else>
                                <a-upload
                                        :action="action"
                                        listType="picture-card"
                                        @change="handleChangeLicense"
                                        :headers="uploadHeader"
                                        :fileList="businessLicenseList"
                                        :accept="accept"
                                        :beforeUpload="beforeUpload"
                                        style="width: 120px;height: 76px">
                                    <div v-if="businessLicenseList.length < 1">
                                        <a-icon type="plus"/>
                                        <div class="ant-upload-text">上传图片</div>
                                    </div>
                                </a-upload>
                            </div>
                            <div v-show="bizLicenceErrorShow" style="position:absolute;color:#f5222d;bottom:-15px">
                                请上传营业执照图片
                            </div>
                        </div>
                        <div class="authentication-pic-seal" style="position:relative;">
                            <div class="authentication-pic-font">
                                <span>电子印章</span>
                                <span style="color: #FB4246;margin-left:1px;">*</span>
                            </div>

                            <div v-if="operateType==2" class="showImg">
                                <div class="f-fl cursor" v-if="esealUrl">
                                    <div  @click="handlePreview(esealUrl)"><img :src="esealUrl" alt=""/></div>
                                </div>
                            </div>
                            <div v-else>
                                <a-upload
                                        :action="action"
                                        listType="picture-card"
                                        @change="handleChangeElectronicSeal"
                                        :headers="uploadHeader"
                                        :accept="accept"
                                        :beforeUpload="beforeUpload"
                                        :fileList="electronicSealList">
                                    <div v-if="electronicSealList.length < 1">
                                        <a-icon type="plus"/>
                                        <div class="ant-upload-text">上传图片</div>
                                    </div>
                                </a-upload>
                            </div>
                            <div v-show="esealErroShow" style="position:absolute;color:#f5222d;bottom:-15px">
                                请上传电子印章图片
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="authentication-person-title bolderSpan">
                        <b>经办人信息</b>
                    </div>
                    <div class="authentication-person-info">
                        <div class="person-info-first clearfix">
                            <div class="authentication-person-item">
                                <a-form-item class="u-bottom-border">
                                    <label-item title="经办人姓名" :mustFill="true">
                                        <span v-if="operateType==2" class="viewStyle">{{detail.agentName}}</span>
                                        <a-input v-else placeholder="请输入"
                                                 v-decorator="['agentName', { rules: [{ required: true,message: '请输入经办人姓名', trigger: 'blur' }] }]"/>
                                    </label-item>
                                </a-form-item>
                            </div>
                            <div class="authentication-person-item">
                                <a-form-item class="u-bottom-border">
                                    <label-item title="经办人联系电话" :mustFill="true">
                                        <span v-if="operateType==2" class="viewStyle">{{detail.agentPhone}}</span>
                                        <a-input v-else placeholder="请输入"
                                                 v-decorator="['agentPhone', { rules: [{ required: true,message: '请输入经办人联系电话', trigger: 'blur' }] }]"/>
                                    </label-item>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="person-info-second clearfix">
                            <div class="authentication-person-item">
                                <a-form-item class="u-bottom-border">
                                    <label-item title="经办人身份信息" :mustFill="true">
                                        <span v-if="operateType==2" class="viewStyle">{{detail.agentCertType|certificate}}/{{detail.agentCertCode}}</span>
                                        <div v-else>
                                            <a-select @change="handleChangeAgentCert" :defaultValue="1" :disabled="operateType==2"
                                                      v-model="agentCertType"
                                                      style="width: 120px;">
                                                <a-select-option :value='1'>身份证号</a-select-option>
                                                <a-select-option :value='2'>护照</a-select-option>
                                                <a-select-option :value='3'>香港来往大陆通行证</a-select-option>
                                                <a-select-option :value='4'>澳门来往大陆通行证</a-select-option>
                                                <a-select-option :value='5'>台湾同胞证</a-select-option>
                                                <a-select-option :value='6'>其他</a-select-option>
                                            </a-select>
                                            <a-input placeholder="请输入" :disabled="operateType==2"
                                                     v-decorator="['agentCertCode', { rules: [{ required: true,message: '请输入经办人身份信息', trigger: 'blur' }] }]"
                                                     style="width: 250px;"/>
                                        </div>
                                    </label-item>
                                </a-form-item>
                            </div>
                            <div class="authentication-person-item">
                                <a-form-item class="u-bottom-border">
                                    <label-item title="联系邮箱">
                                        <span v-if="operateType==2" class="viewStyle">{{detail.agentEmail}}</span>
                                        <a-input v-else placeholder="请输入" v-decorator="['agentEmail']" :disabled="operateType==2"/>
                                    </label-item>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="buttonStyle">
                            <div class="cancelOption" v-show="operateType!=3">
                                <a-button size="large" type="warning" :loading="spinLoadingCancel"
                                          class="formItemMarginButton cancelFont" @click="cancelAddAuthentication">
                                    {{cancelButtonTitle}}
                                </a-button>
                            </div>
                            <div class="saveOption">
                                <a-button :loading="spinLoadingSave" size="large" type="primary" class="formItemMarginButton"
                                          @click="addAuthentication">
                                    {{saveButtonTitle}}
                                </a-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a-form>
        <!-- 预览图片 -->
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="cancelPreviewImage">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
    import {econtPlatformCancel, econtPlatformReg,econtRePlatformReg,econtTemplateCert} from '@/api/contractTemple';
    import {
        checkCard,
    } from '@/api/contract.js';
    import {ACCESS_TOKEN} from '@/store/mutation-types';

    export default {
        name: "addAuthentication",
        components: {},
        props: {
            authenticationId: {
                type: String,
                required: true
            },
            itemInfo:{
                type: Object,
                default: undefined,
            },
            operateTypeReg:{
                type: Number,
                default: 1,
            },
            templateId:{
                type: String,
                default:"",
            }
        },
        data() {
            return {
                orgType: 1,              //1、公司；2、个人
                formLayout: 'vertical',
                form: this.$form.createForm(this, {name: 'coordinated'}),
                action: process.env.VUE_APP_BASE_FILESERVER_URL + "/file_upload",  //上传地址
                businessLicenseList: [],         //营业执照图片列表
                bizLicenceUrl: "",               //营业执照url
                bizLicenceErrorShow: false,         //营业执照无图片提醒
                electronicSealList: [],          //电子印章图片列表
                esealUrl: "",                    //电子印章url
                esealErroShow: false,               //电子印章无图片提醒
                uploadHeader: {
                    Authorization: ""
                },                    //上传相关
                cancelButtonTitle: "取消",
                saveButtonTitle: "保存",
                agentCertType: 1,    //经办人证件类型
                legalPersonCertType: 1, //法人证件类型
                operateType:1,          //操作类型
                detail:{},
                previewVisible:false,
                previewImage: '',
                accept: '.jpg, .jpeg, .png',
                spinLoadingSave:false,
                spinLoadingCancel:false,
            }
        },
        created() {
            this.initPage();
            const token = this.$ls.get(ACCESS_TOKEN)
            this.uploadHeader.Authorization =
                "Bearer " + token;
        },
        mounted() {
        },
        methods: {
            beforeUpload(file, fileList){
                for (let i = 0; i< fileList.length;i++){
                    if (fileList[i].size > 1024*1024*5){
                        this.$message.info('文件大小不能大于5M，请重新选择');
                        this.flag = true;
                        fileList.splice(0,fileList.length)
                        return false
                    }
                }
                this.flag = false;
            },
            cancelPreviewImage() {
                this.previewVisible = false;
            },
            handlePreview(url) {
                this.previewImage = url;
                this.previewVisible = true;
            },
            //上传图片
            handleChangeLicense(info) {
                this.businessLicenseList = info.fileList;
                if (info.fileList && info.fileList.length > 0 && info.fileList[0].response) {
                    this.bizLicenceErrorShow = false;
                    this.bizLicenceUrl = info.fileList[0].response.data.origin;
                }
            },
            handleChangeElectronicSeal(info) {
                this.electronicSealList = info.fileList;
                if (info.fileList && info.fileList.length > 0 && info.fileList[0].response) {
                    this.esealErroShow = false;
                    this.esealUrl = info.fileList[0].response.data.origin;
                }
            },
            //初始化页面字段值
            initPage(){
                if(this.authenticationId == ""){
                    this.saveButtonTitle = "立刻开通";
                    this.cancelButtonTitle = "取消";
                    this.operateType = 1;
                    this.detail = {};
                }
                if(this.authenticationId != ""){
                    this.saveButtonTitle = "重新认证";
                    this.cancelButtonTitle = "关闭认证";
                    this.operateType = 2;
                    this.initData(this.itemInfo);
                }
                if(this.operateTypeReg == 4){
                    this.operateType = 4;
                }
            },
            //页面事件操作
            //经办人下拉证件类型
            handleChangeAgentCert(value) {
                this.agentCertType = value;
            },
            //法人下拉证件类型
            handleChangeLegalPersonCert(value) {
                this.legalPersonCertType = value;
            },
            //取消
            cancelAddAuthentication() {
                if (this.operateType == 1) {
                    //取消
                    this.$emit('cancelCloseCurrent');
                }
                let that = this;
                if (this.operateType == 2 || this.operateType == 3) {
                    //关闭认证
                    this.$modal.confirm({
                        title: '确定要关闭 「' + this.detail.agentName + '经办人」 的电子合同认证吗？',
                        content: '关闭后，签约时使用的电子合同模板将不再具备法律效应',
                        width: "433px",
                        height: "192px",
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            that.econtPlatformCancel();
                            that.$emit('closeCurrent');

                        },
                        onCancel() {
                        },
                    });
                }
                if(this.operateType == 4){
                    //关闭当前
                    this.$emit('cancelCloseCurrent');
                }
            },
            //保存
            addAuthentication() {
                //检查图片
                if(this.orgType==1) {
                    if (this.esealUrl == "") {
                        this.esealErroShow = true;
                    } else {
                        this.esealErroShow = false;
                    }
                    if (this.bizLicenceUrl == "") {
                        this.bizLicenceErrorShow = true;
                    } else {
                        this.bizLicenceErrorShow = false;
                    }
                }
                //1、新增；3、修改；4、认证
                if(this.operateType==1 || this.operateType==3 || this.operateType==4) {
                    this.form.validateFields((err, values) => {
                        if(this.orgType==1) {
                            if (this.esealErroShow) {
                                //未上传必传图片
                                this.$message.warn('请上传电子印章图片');
                                return;
                            }
                            if (this.bizLicenceErrorShow) {
                                //未上传必传图片
                                this.$message.warn('请上传营业执照图片');
                                return;
                            }
                        }
                        values.agentCertType = this.agentCertType;
                        values.orgType = this.orgType;
                        values.platform = 1;
                        if (this.orgType == 1) {
                            //法人证件
                            values.legalPersonCertType = this.legalPersonCertType;
                            //若是企业，则需要检验图片地址
                            values.esealUrl = this.esealUrl;
                            values.bizLicenceUrl = this.bizLicenceUrl;
                        }
                        if (!err) {
                            //检查身份正确性
                            if(values.legalPersonCertType&&values.legalPersonCertType==1){
                                checkCard(values.legalPersonCertCode).then(res => {
                                    if (res === undefined) {
                                        this.$message.error('请输入正确法人身份证号');
                                        return;
                                    } else {
                                        if (res.code === '200') {
                                            if(values.agentCertType==1){
                                                checkCard(values.agentCertCode).then(res => {
                                                    if (res === undefined) {
                                                        this.$message.error('请输入正确经办人身份证号');
                                                        return;
                                                    } else {
                                                        if (res.code === '200') {
                                                            this.submitData(values);
                                                        } else {
                                                            this.$message.error('请输入正确经办人身份证号');
                                                            return;
                                                        }
                                                    }

                                                });
                                            }
                                            else{
                                                this.submitData(values);
                                            }
                                        } else {
                                            this.$message.error('请输入正确法人身份证号');
                                            return;
                                        }
                                    }

                                });
                            }
                            else{
                                if(values.agentCertType==1){
                                    checkCard(values.agentCertCode).then(res => {
                                        if (res === undefined) {
                                            this.$message.error('请输入正确经办人身份证号');
                                            return;
                                        } else {
                                            if (res.code === '200') {
                                                this.submitData(values);
                                            } else {
                                                this.$message.error('请输入正确经办人身份证号');
                                                return;
                                            }
                                        }

                                    });
                                }
                                else{
                                    this.submitData(values);
                                }
                            }
                        }
                    });
                }
                else if(this.operateType==2){
                    this.operateType = 3;
                    setTimeout(() => {
                        if (this.orgType == 2) {
                            this.form.setFieldsValue({
                                agentCertCode: this.detail.agentCertCode,
                                agentPhone: this.detail.agentPhone,
                                agentName: this.detail.agentName,
                                agentEmail: this.detail.agentEmail,
                            });
                            this.agentCertType = this.detail.agentCertType;
                        }
                        if (this.orgType == 1) {
                            this.form.setFieldsValue({
                                //经办人
                                agentCertCode: this.detail.agentCertCode,
                                agentPhone: this.detail.agentPhone,
                                agentName: this.detail.agentName,
                                agentEmail: this.detail.agentEmail,
                                //公司信息
                                name: this.detail.name,
                                certCode: this.detail.certCode,
                                legalPerson: this.detail.legalPerson,
                                legalPersonCertCode: this.detail.legalPersonCertCode,
                            });
                            //经办人证件类型
                            this.agentCertType = this.detail.agentCertType;
                            //法人证件类型
                            this.legalPersonCertType = this.detail.legalPersonCertType;
                            //营业执照图片地址
                            this.businessLicenseList = [{
                                uid: "-1",
                                name: "",
                                status: 'done',
                                url: this.detail.bizLicenceUrl,
                                thumbUrl: this.detail.bizLicenceUrl,
                            }];
                            this.bizLicenceUrl = this.detail.bizLicenceUrl;
                            //电子印章图片地址
                            this.electronicSealList = [{
                                uid: "-2",
                                name: "",
                                status: 'done',
                                url: this.detail.eSealUrl,
                                thumbUrl: this.detail.eSealUrl,
                            }];
                            this.esealUrl = this.detail.eSealUrl;
                        }
                    }, 50);
                }
            },
            //暂时未调用
            checkIdentityCard(certificateNo, certificateType,otherType){
                let otherTypeName = '法人';
                if(otherType==1){
                    otherTypeName = '法人';
                }
                else{
                    otherTypeName = '经办人';
                }
                if (certificateType === 1) {
                    if (certificateNo === '') {
                        this.$message.error('请输入'+otherTypeName+'身份证号');
                        return true;
                    } else {
                        checkCard(certificateNo).then(res => {
                            if (res === undefined) {
                                this.$message.error('请输入'+otherTypeName+'正确身份证号');
                                return true;
                            } else {
                                if (res.code === '200') {
                                    return false;
                                } else {
                                    this.$message.error('请输入'+otherTypeName+'正确身份证号');
                                    return true;
                                }
                            }

                        });
                    }
                } else {
                    if (certificateNo === '') {
                        this.$message.error('请输入'+otherTypeName+'证件号');
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            //提交数据
            submitData(values){
                this.spinLoadingSave = true;
                if(this.operateType==1) {
                    econtPlatformReg(values).then(res => {
                        if(!res){
                            this.spinLoadingSave = false;
                        }
                        if (res.code == "200") {
                            this.$message.info('开通成功');
                        } else {
                            this.$message.error('开通失败');
                        }
                        this.spinLoadingSave = false;
                        this.$emit('closeCurrent');
                    });
                }
                else if(this.operateType==3){
                    values.regId = this.authenticationId;
                    econtRePlatformReg(values).then(res => {
                        if(!res){
                            this.spinLoadingSave = false;
                        }
                        if (res.code == "200") {
                            this.$message.info('重新开通成功');
                        } else {
                            this.$message.error('重新开通失败');
                        }
                        this.spinLoadingSave = false;
                        this.$emit('closeCurrent');
                    });
                }
                else if(this.operateType==4){
                    econtPlatformReg(values).then(res => {
                        if(!res){
                            this.spinLoadingSave = false;
                        }
                        if (res.code == "200") {
                            let parameter = {};
                            parameter.id = this.templateId;
                            parameter.certBodyId = res.data;
                            econtTemplateCert(parameter).then(res => {
                                if (res.code == "200") {
                                    this.$message.info('认证成功');
                                } else {
                                    this.$message.error('认证失败');
                                }
                                this.spinLoadingSave = false;
                                this.$emit('closeCurrent');
                            });
                        } else {
                            this.spinLoadingSave = false;
                            this.$message.error('认证失败');
                        }

                    });
                }
            },
            //初始化数据
            initData(item) {
                this.orgType = item.orgType;
                if (this.orgType == 2) {
                    this.detail = item;
                }
                else if (this.orgType == 1) {
                    this.detail = item;
                    this.bizLicenceUrl = item.bizLicenceUrl;
                    this.esealUrl = item.eSealUrl;
                }
            },
            //**********与api相关
            econtPlatformCancel() {
                let parameter = {};
                parameter.platform = 1;
                parameter.regId = this.authenticationId;
                this.spinLoadingCancel = true;
                econtPlatformCancel(parameter).then(res => {
                    if(!res){
                        this.spinLoadingCancel = false;
                    }
                    if (res.code == "200") {
                        this.$message.info('关闭成功');
                        this.$emit('closeCurrent');
                    } else {
                        this.$message.error('关闭失败');
                    }
                    this.spinLoadingCancel = false;
                });
            }
        },
        filters: {
            certificate(val) {
                return val == 1 ? '身份证' : val == 2 ? '护照' : val == 3 ? '香港来往大陆通行证' : val == 4 ? '澳门来往大陆通行证' : val == 5 ? '台湾同胞证' : val == 6 ? '其他' : '-';
            },
        }
    }
</script>

<style scoped lang="less">
    .heightBig{
        height: calc(100vh - 100px);
    }
    .heightSmall{
        height: calc(100vh - 180px);
    }
    .add-authentication-box {
        overflow-y: auto;
        overflow-x: hidden;
        .authentication-head {
            width: 800px;
            height: 40px;
            line-height: 40px;
            color: #FFA036;
            font-size: 16px;
            background: rgba(233, 241, 255, 0.99);
            text-align: center;
        }
        .authentication-type-name {
            margin: 20px 0px 15px 20px;
            height: 24px;
            line-height: 24px;
        }
        .authentication-type {

            margin-left: 20px;

            .authentication-type-font {
                margin-left: 10px;
                font-size: 16px;
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
                border-top: 40px solid #0A87F8;
                border-left: 43px solid transparent;
                top: 0px;
                right: 0px;
            }

            .authentication-type-company {
                float: left;
                text-align: left;
                width: 370px;
                height: 50px;
                margin-right: 20px;
                line-height: 50px;
                border-radius: 3px;
                position: relative;
                box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
            }

            .authentication-type-person {
                float: left;
                text-align: left;
                width: 366px;
                height: 50px;
                margin-right: 20px;
                line-height: 50px;
                border-radius: 3px;
                position: relative;
                box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
            }
        }
        .authentication {
            .authentication-person-title {
                margin: 30px 0px 10px 20px;
                height: 24px;
                line-height: 24px;
            }
            .authentication-company-title {
                margin: 30px 0px 10px 20px;
                height: 24px;
                line-height: 24px;
            }
            .bolderSpan {
                color: #111111;
                font-size: 18px;
            }
            .authentication-person-info {
                height: 220px;
                width: 800px;
                position: relative;
                .buttonStyle {
                    position: absolute;
                    right: 20px;
                    bottom: 20px;
                    .cancelOption {
                        float: left;
                    }
                    .formItemMarginButton {
                        width: 120px;
                        height: 40px;
                    }
                    .cancelOption {
                        float: left;
                        margin-right: 20px;
                        .cancelFont {
                            color: #666666;
                        }
                    }
                    .saveOption {
                        float: left;
                    }
                }
            }
            .authentication-company-info {
                height: 170px;
                width: 800px;
            }
            .authentication-person-info, .authentication-company-info {
                .person-info-first {
                    width: 780px;
                    height: 70px;
                    .authentication-person-item {
                        width: 370px;
                        float: left;
                        margin-left: 20px;
                    }
                }
                .person-info-second {
                    width: 780px;
                    height: 70px;
                    .authentication-person-item {
                        width: 370px;
                        float: left;
                        margin-left: 20px;
                    }
                }
            }
            .authentication-pic {
                height: 120px;
                .authentication-pic-license {
                    width: 370px;
                    float: left;
                    margin-left: 20px;
                    .showImg {
                        >div {
                            height: 76px;
                            width: 120px;
                            margin-right: 10px;
                            >div{
                                width: 100%;
                                height: 100%;
                                line-height: 76px;
                                border: 1px solid #eeeeee;
                                background-color: #f6f7f8;
                                text-align: center;
                                border-radius: 6px;
                                overflow: hidden;
                                img {
                                    width: auto;
                                    max-width: 120px;
                                    height: auto;
                                    max-height: 76px;
                                    overflow: hidden;
                                }
                            }
                        }
                        >div:last-child{
                            margin-right: 0px;
                        }
                    }
                    /deep/ .ant-upload-list-item {
                        width: 120px;
                        height: 76px;
                        padding: 0px;
                    }
                    /deep/ .ant-upload-select-picture-card {
                        width: 120px;
                        height: 76px;
                    }
                    /deep/ .ant-upload-list-item-error {
                        width: 120px;
                        height: 76px;
                    }
                }
                .authentication-pic-seal {
                    width: 370px;
                    float: left;
                    margin-left: 20px;
                    .showImg {
                        >div {
                            height: 76px;
                            width: 76px;
                            margin-right: 10px;
                            >div{
                                width: 100%;
                                height: 100%;
                                line-height: 50px;
                                border: 1px solid #eeeeee;
                                background-color: #f6f7f8;
                                text-align: center;
                                border-radius: 6px;
                                overflow: hidden;
                                img {
                                    width: auto;
                                    max-width: 76px;
                                    height: auto;
                                    max-height: 76px;
                                    overflow: hidden;
                                }
                            }
                        }
                        >div:last-child{
                            margin-right: 0px;
                        }
                    }
                    /deep/ .ant-upload-list-item {
                        width: 78px;
                        height: 78px;
                        padding: 0px;
                    }
                    /deep/ .ant-upload-select-picture-card {
                        width: 78px;
                        height: 78px;
                    }
                    /deep/ .ant-upload-list-item-error {
                        width: 78px;
                        height: 78px;
                    }
                }
                .authentication-pic-font {
                    height: 17px;
                    margin-bottom: 13px;
                }
            }
        }
        .viewStyle{
            color: #111100;
            font-size: 14px;
        }
        & /deep/ .ant-form-item {
            margin-bottom: 15px;
            padding-bottom: 0px;
        }
        & /deep/ .ant-form-explain {
            position: absolute;
        }
        & /deep/ .ant-input {
            color: #111;
            height: 32px;
        }
        & /deep/ .ant-select-selection--single,& /deep/ .ant-select-selection__rendered {
            height: 31px;
            margin-left: 0;
        }
    }
</style>
