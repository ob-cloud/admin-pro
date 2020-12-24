<template>
    <div class="company-info-box" :style="status==2?'padding-top:73px':''">
        <div class="toCheck" v-if="status==2">
            <span>您的认证信息我们已收到，正在紧急审核中，请耐心等待～</span>
        </div>
        <div class="company-info-content">
            <div class="line1 clearfix">
                <div class="line1-logo f-fl" @mouseenter="showUploadPic=true;" @mouseleave="showUploadPic=false">
                    <img :src="logoSrc">
                    <div class="operateStyle" v-if="isEdit" :style="showUploadPic?'background:rgba(0,0,0,0.5);':''">
                        <a-upload
                                :action="action"
                                listType="picture-card"
                                @change="handleChange($event)"
                                :data="uploadParms"
                                :headers="uploadHeader"
                                :file-list="fileList"
                                style="width: 66px;height: 66px">
                            <div class="updateOperateFontStyle" v-if="fileList.length==0&&showUploadPic">上传logo</div>
                        </a-upload>
                    </div>
                </div>
                <div class="line1-apartment f-fl">
                    <div class="apartment">
                        <span class="companyType" v-if="dataForm.auditStatus==2&&dataForm.type==1" >企业</span>
                        <span class="personType" v-if="dataForm.auditStatus==2&&dataForm.type==2" >个人房东</span>
                        <span class="name">{{dataForm.name|blankVal}}</span>
                        <span class="number">(企业号：{{dataForm.tenantId|blankVal}})</span>
                    </div>
                    <div class="line1-icon">
                        <span class="line1-icon-status notCertified" v-show="dataForm.auditStatus==0"><icon-font type="iconyumengtubiao_guanbi-3"></icon-font> 未认证</span>
                        <span class="line1-icon-status underReview" v-show="dataForm.auditStatus==1"><icon-font type="iconshenhezhong"></icon-font> 审核中…</span>
                        <span class="line1-icon-status pass" v-show="dataForm.auditStatus==2"><icon-font type="iconshenhetongguo"></icon-font> 已认证</span>
                        <span class="line1-icon-status fail" v-show="dataForm.auditStatus==3"><icon-font type="iconweirenzheng"></icon-font> 认证失败</span>
                        <span class="line1-icon-view cursor" @click="openAuthentication" v-if="dataForm.auditStatus==0" v-mark="['mk_set_company_rzqy']">
                        <span  style="margin-right: 5px;">立即去认证</span>
                        <icon-font type="iconyumengtubiao_zhishi"></icon-font>
                    </span>
                        <span class="line1-icon-view cursor" @click="openAuthentication" v-else v-mark="['mk_set_company_rzxx']">
                        <span style="margin-right: 5px;">查看认证信息</span>
                        <icon-font type="iconyumengtubiao_zhishi"></icon-font>
                    </span>
                    </div>
                </div>
            </div>
            <div class="line2">
                <div class="line2-tr clearfix">
                    <div class=" line2-name f-fl">品牌名称：</div>
                    <div v-if="isEdit" class="line2-nameInput f-fl">
                        <a-input style="width: 100%;height: 30px" maxlength="10" v-model="dataForm.apartmentName" placeholder="请输入"></a-input>
                    </div>
                    <div class="line2-nameInput viewStyle f-fl" v-else>{{dataForm.apartmentName|blankVal}}</div>
                </div>
                <div class="line2-tr clearfix">
                    <div class="line2-name f-fl">公寓简介：</div>
                    <div v-if="isEdit" class="line2-nameInput f-fl">
                        <a-input style="width: 100%;height: 30px" maxlength="20" v-model="dataForm.apartmentSlogan" placeholder="请输入"></a-input>
                    </div>
                    <div class="line2-nameInput viewStyle f-fl" v-else>{{dataForm.apartmentSlogan|blankVal}}</div>
                </div>
                <div class="clearfix">
                    <div class="line2-name f-fl">公寓介绍：</div>
                    <div v-if="isEdit" class="line2-desc f-fl">
                        <a-textarea style="width: 100%;height: 78px" maxlength="500" v-model="dataForm.apartmentIntro" placeholder="请输入"></a-textarea>
                    </div>
                    <div class="line2-desc viewStyle f-fl" v-else>{{dataForm.apartmentIntro|blankVal}}</div>
                </div>
            </div>
            <div class="line3">
                <div class="line2-tr clearfix">
                    <div class="line2-name f-fl">企业域名：</div>
                    <div v-if="isEdit" class="line2-nameInput f-fl">
                        <a-input style="width: 100%;height: 30px" placeholder="设置你的专属独有域名" v-model="dataForm.domain" @input.native="domainChange"></a-input>
                        <div class="line2-name-domain">.yumeng.work</div>
                    </div>
                    <div class="line2-nameInput viewStyle f-fl" v-else>{{dataForm.domain?dataForm.domain+'.yumeng.work':'-'}}</div>
                </div>
            </div>
            <div class="buttonStyle">
                <div class="line1-edit-before cursor" @click="editInfo" v-if="!isEdit" v-mark="['mk_set_company_bjqyxx']">
                    编辑
                </div>
                <a-button size="large" type="primary" class="line1-edit cursor" @click="saveInfo" :loading="saveLoading" v-if="isEdit">
                    保存
                </a-button>
            </div>
        </div>
        <!-- 添加认证 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="521px" v-model="addAuthenticationDialog" class="ownModalBorder titDialog" title="立即认证" @cancel="initData()">
            <add-authentication @cancelAdd="cancelAuthentication()" @addSuccess="initData()"></add-authentication>
        </a-modal>
        <!-- 查看个人认证信息 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="522px" v-model="authenticationPersonDialog" class="ownModalBorder titDialog" title="查看认证信息" @cancel="initData()">
            <authentication-info-person></authentication-info-person>
        </a-modal>
        <!-- 查看企业认证信息 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="522px" v-model="authenticationCompanyDialog" class="ownModalBorder titDialog" title="查看认证信息" @cancel="initData()">
            <authentication-info-company></authentication-info-company>
        </a-modal>
    </div>
</template>

<script>
    import {ACCESS_TOKEN} from '@/store/mutation-types';
    import  AddAuthentication from './addAuthentication';
    import  AuthenticationInfoPerson from './authenticationInfoPerson';
    import  AuthenticationInfoCompany from './authenticationInfoCompany';
    import ATextarea from "ant-design-vue/es/input/TextArea";
    import * as API from '@/api/setCompany';
    import * as PublicAPI from '@/api/public'

    export default {
        name: "companyInfo",
        components: {
            ATextarea,
            AddAuthentication,
            AuthenticationInfoPerson,
            AuthenticationInfoCompany
        },
        data() {
            return {
                isEdit:false,       //是否处理编辑状态
                status:1,           //1、未认证；2、审核中；3、审核通过
                addAuthenticationDialog:false,
                authenticationPersonDialog:false,
                authenticationCompanyDialog:false,
                uploadHeader: {
                    Authorization: ""
                },
                action: process.env.VUE_APP_BASE_FILESERVER_URL + "/file_upload",  //上传地址
                uploadParms:{
                    bizId: '', // 房源id
                    bizType: 0, // 图片大类标识 // 合同
                    subBizType: 6, // 图片子类标识 // 合同附件
                    orderIndex: 1 // 排序值
                },
                dataForm:{
                    apartmentIntro:'',              //企业介绍
                    apartmentName:'',               //品牌名称【公寓名称】
                    apartmentSlogan:'',             //公寓简介【宣传标语】
                    domain:'',                      //域名【二级域名】
                    id:'',                          //机构ID
                    logo:'',                        //logo图片id
                    logoPic:{},                     //logo图片对象
                    name:'',                        //公司名称
                    type:'',                        //类型（1.企业；2.个人）
                    auditStatus:0,                 //企业认证审核状态（0.未申请；1.待审批；2.已审批；3.已驳回）
                    tenantId:'',                    //机构tenantId
                },
                logoSrc:'http://byteox.oss-cn-zhangjiakou.aliyuncs.com/byteox/2020-05-20/37d80766bd4d430dbe52fccbe47df979.png',
                beforeLogoId:'',
                fileList:[],
                saveLoading:false,
                showUploadPic:false,
            };
        },
        created: function () {
            const token = this.$ls.get(ACCESS_TOKEN);
            this.uploadHeader.Authorization = "Bearer " + token;
            this.initData();
        },
        methods: {
            domainChange(e) {
                e.target.value = e.target.value.replace(/[^a-z0-9]+/gi, '');
                this.dataForm.domain = e.target.value;
            },
            cancelAuthentication(){
              this.addAuthenticationDialog = false;
            },
            initData(){
                this.isEdit = false;
                this.addAuthenticationDialog = false;
                this.authenticationPersonDialog = false;
                this.authenticationCompanyDialog = false;
                API.organizationView().then(res => {
                    if (res.code == 200) {
                        this.dataForm = res.data;
                        if(this.dataForm.logoPic != null && this.dataForm.logoPic && this.dataForm.logoPic.origin){
                            this.logoSrc = this.dataForm.logoPic.origin;
                            this.beforeLogoId = this.dataForm.logoPic.id;
                        }
                    }
                });
            },
            saveData(){
                if(this.checkData()){
                    this.saveLoading = true;
                    if(this.dataForm.logo){
                        if(this.dataForm.logo!=this.beforeLogoId&&this.beforeLogoId){
                            //删除原图片
                            PublicAPI.removePic(this.beforeLogoId).then(res => {

                            });
                        }
                    }
                    API.organizationEidt(this.dataForm).then(res => {
                        if (res.code == "200") {
                            this.$message.info('修改成功');
                        } else {
                            this.$message.error('修改失败');
                        }
                        this.fileList = [];
                        this.saveLoading = false;
                        this.initData();
                    }).catch(err => {
                        this.saveLoading = false;
                    });
                }
                else{
                    this.initData();
                }
            },
            checkData(){
                if(this.dataForm.apartmentName&&this.dataForm.apartmentName.length>10){
                    this.$message.error('品牌名称不能超过10个字!');
                    return false;
                }
                if(this.dataForm.apartmentName&&this.dataForm.apartmentSlogan.length>20){
                    this.$message.error('公寓简介不能超过20个字');
                    return false;
                }
                if(this.dataForm.apartmentName&&this.dataForm.apartmentIntro.length>500){
                    this.$message.error('公寓介绍不能超过500个字');
                    return false;
                }
                return true;
            },
            //上传图片
            handleChange(info) {
                this.fileList = info.fileList;
                if (info.fileList && info.fileList.length > 0 && info.fileList[0].response) {
                    this.dataForm.logo = info.fileList[0].response.data.id;
                    this.logoSrc = info.fileList[0].response.data.origin;
                    this.fileList = [];
                    this.showUploadPic = false;
                }
            },
            openAuthentication(){
                if (this.dataForm.auditStatus== 0){
                    this.addAuthenticationDialog = true;
                }
                else {
                    if(this.dataForm.type == 1){
                        this.authenticationCompanyDialog = true;
                    }
                    else if(this.dataForm.type == 2){
                        this.authenticationPersonDialog = true;
                    }
                }
            },
            editInfo(){
                this.isEdit = true;
            },
            saveInfo(){
                this.isEdit = false;
                this.saveData();
            },
        },
        filters: {
            blankVal(val){
                if(!val){
                    return '-';
                }else{
                    return  val;
                }
            }
        }
    };


</script>

<style lang="less" scoped>
.company-info-box{
    background:rgba(255,255,255,1);
    padding: 50px 0 20px 0;
    position: relative;
    .toCheck{
        position: absolute;
        top: 0;
        left: 0;
        padding-left: 20px;
        width: 100%;
        height:40px;
        line-height: 40px;
        background-color: #FEF9E5;
        color: #FFA036;
    }
    .company-info-content{
        width: 560px;
        margin: 0 auto;
        .line1{
            width: 100%;
            height: 66px;
            .line1-logo{
                width: 66px;
                height: 66px;
                background:linear-gradient(133deg,rgba(255,152,44,1) 0%,rgba(255,87,65,1) 100%);
                border-radius:5px;
                position: relative;
                img{
                    width: 66px;
                    height: 66px;
                    border-radius:5px;
                }
            }
            .operateStyle{
                top:0;
                z-index: 10;
                position: absolute;
                width: 66px;
                height: 66px;
                .updateOperateFontStyle{
                    width: 66px;
                    color: #FFFFFF;
                    font-size: 12px;
                }
                /deep/ .ant-upload.ant-upload-select-picture-card > .ant-upload{
                    padding: 0;
                }
                /deep/ .ant-upload.ant-upload-select-picture-card{
                    width: 66px;
                    height: 66px;
                    border: none;
                    background:rgba(0,0,0,0);
                }
                /deep/ .ant-upload-list-picture-card .ant-upload-list-item{
                    width: 66px;
                    height: 66px;
                    margin: 0;
                    border: none;
                    padding: 0;
                }
                /deep/ .ant-upload-list-item-actions{
                    width: 66px;
                    height: 10px;
                }
            }
            .line1-apartment{
                padding: 3px 0 3px 20px;
                .apartment{
                    height: 25px;
                    .name{
                        color: #111111;
                        font-size: 18px;
                    }
                    .number{
                        color: #777777;
                        font-size: 14px;
                        margin-left: 5px;
                    }
                    .companyType{
                        width:38px;
                        height:24px;
                        line-height: 24px;
                        background:rgba(10,135,248,0.1);
                        border-radius:4px;
                        border:1px solid rgba(10,135,248,1);
                        text-align: center;
                        color: #0A87F8;
                        font-size: 14px;
                        padding: 3px;
                        margin-right: 5px;
                    }
                    .personType{
                        width:66px;
                        height:24px;
                        line-height: 24px;
                        background:rgba(255,160,54,0.1);
                        border-radius:4px;
                        border:1px solid rgba(255,160,54,1);
                        text-align: center;
                        color: #E77F0B;
                        font-size: 14px;
                        padding: 3px;
                        margin-right: 5px;
                    }
                }
                .line1-icon{
                    padding-top: 12px;
                    .line1-icon-status{
                        font-size: 14px;
                    }
                    .notCertified{
                        color: #FB4246
                    }
                    .pass{
                        color: #03C683;
                    }
                    .fail{
                        color: #FB4246
                    }
                    .underReview{
                        color: #FFA036;
                    }
                    .line1-icon-view{
                        margin-left: 30px;
                        color: #0A87F8;
                    }
                }
            }
        }
        .line2{
            padding: 40px 0 15px 0;
            border-bottom: 1px dashed #EEEEEE;
            .line2-tr{
                height: 30px;
                line-height: 30px;
            }
        }
        .line2 , .line3{
            .line2-tr{
                width: 100%;
                margin-bottom: 10px;
                font-size: 14px;

            }
            .line2-nameInput{
                color: #111111;
                font-size: 14px;
                position: relative;
                width: calc(100% - 70px);
                .line2-name-domain{
                    position: absolute;
                    top:0px;
                    right: 10px;
                    color: #BBBBBB;
                    font-size: 14px;
                }
            }
            .viewStyle{
                padding-left: 10px;
                background:rgba(250,251,252,1);
                border-radius:2px;
            }
            .line2-name{
                color: #777777;
            }
            .line2-desc{
                width: calc(100% - 70px);
                font-size: 14px;
                line-height: 20px;
            }
        }
        .line3{
            padding: 10px 0 40px 0;
            .line2-tr{
                height: 30px;
                line-height: 30px;
            }
        }
        .buttonStyle{
            height: 38px;
            margin: 0 auto;
            text-align: center;
            .line1-edit-before{
                width:160px;
                height:38px;
                line-height: 38px;
                text-align: center;
                border:1px solid rgba(10,135,248,1);
                color: rgba(10,135,248,1);
                margin: 0 auto;
            }
            .line1-edit{
                width:160px;
                height:38px;
                line-height: 38px;
                border-radius:5px;
                border:1px solid rgba(10,135,248,1);
                margin: 0 auto;
                text-align: center;
            }
        }
    }
    /deep/ .ant-input{
        color: #111111;
        font-size: 14px;
    }
}
</style>