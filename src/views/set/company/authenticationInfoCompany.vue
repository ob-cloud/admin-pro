<template>
    <!-- 查看认证信息 -->
    <div class="authentication-company-box">
        <div class="content">
            <div class="apartment clearfix">
                <div v-if="skeletonLoading==false">
                    <span class="title">{{sendData.name}} </span>
                    <span class="number">(企业号：{{sendData.tenantId}})</span>
                    <span class="icon underReview" v-if="sendData.auditStatus ==1"><icon-font type="iconshenhezhong"></icon-font></span>
                    <span class="iconDesc underReview" v-if="sendData.auditStatus ==1">审核中…</span>
                    <span class="icon pass" v-if="sendData.auditStatus ==2"><icon-font type="iconshenhetongguo"></icon-font></span>
                    <span class="iconDesc pass" v-if="sendData.auditStatus ==2">已认证</span>
                    <span class="icon fail" v-if="sendData.auditStatus ==3"><icon-font type="iconweirenzheng"></icon-font></span>
                    <span class="iconDesc fail" v-if="sendData.auditStatus ==3">认证失败</span>
                    <span class="f-fr cursor button" v-if="sendData.auditStatus ==3" @click="addAuthenticationDialog=true">
                        重新认证
                    </span>
                </div>
                <label-item  :skeletonLoading="skeletonLoading" style="margin-top: 20px">
                </label-item>
            </div>
            <div class="content-detail">
                <div class="content-detail-line clearfix">
                    <div class="content-detail-line-title f-fl">运营模式：</div>
                    <label-item title="" :skeletonLoading="skeletonLoading">
                        <div class="content-detail-line-value f-fl">{{bizModeList.length>0?bizModeList.join('、'):'-'}}</div>
                    </label-item>
                </div>
                <div class="content-detail-line clearfix">
                    <div class="content-detail-line-title f-fl">运营覆盖城市：</div>
                    <label-item title="" :skeletonLoading="skeletonLoading">
                        <div class="content-detail-line-value f-fl">{{cityList.length>0?cityList.join('、'):'-'}}</div>
                    </label-item>
                </div>
                <div class="content-detail-line clearfix">
                    <div class="content-detail-line-title f-fl">法人姓名：</div>
                    <label-item title="" :skeletonLoading="skeletonLoading">
                        <div class="content-detail-line-value f-fl">{{sendData.legalPersonName|blankVal}}</div>
                    </label-item>
                </div>
                <div class="content-detail-line clearfix">
                    <div class="content-detail-line-title f-fl">法人身份证号：</div>
                    <label-item title="" :skeletonLoading="skeletonLoading">
                        <div class="content-detail-line-value f-fl">{{sendData.legalPersonIdCard|blankVal}}</div>
                    </label-item>
                </div>
                <div class="content-detail-line clearfix" v-if="sendData.isTriple==1">
                    <div class="content-detail-line-title f-fl">是否三证合一：</div>
                    <label-item title="" :skeletonLoading="skeletonLoading">
                        <div class="content-detail-line-value f-fl">是</div>
                    </label-item>
                </div>
                <div class="content-detail-line clearfix" v-else>
                    <div class="content-detail-line-title f-fl">是否三证合一：</div>
                    <label-item title="" :skeletonLoading="skeletonLoading">
                        <div class="content-detail-line-value f-fl">否</div>
                    </label-item>
                </div>
                <div class="content-detail-line clearfix">
                    <div class="content-detail-line-title f-fl">营业执照号：</div>
                    <label-item title="" :skeletonLoading="skeletonLoading">
                        <div class="content-detail-line-value f-fl">{{sendData.businessLicenseNo|blankVal}}</div>
                    </label-item>
                </div>
                <div class="content-detail-line clearfix" v-if="sendData.isTriple==0">
                    <div class="content-detail-line-title f-fl">组织机构代码：</div>
                    <label-item title="" :skeletonLoading="skeletonLoading">
                        <div class="content-detail-line-value f-fl">{{sendData.organizationCode|blankVal}}</div>
                    </label-item>
                </div>
                <div class="content-detail-line clearfix" v-if="sendData.isTriple==0">
                    <div class="content-detail-line-title f-fl">税务登记证号</div>
                    <label-item title="" :skeletonLoading="skeletonLoading">
                        <div class="content-detail-line-value f-fl">{{sendData.taxRegistrationNo|blankVal}}</div>
                    </label-item>
                </div>
                <div class="content-detail-line clearfix">
                    <div class="content-detail-line-title f-fl">营业执照图片：</div>
                    <div class="content-detail-line-img f-fl clearfix">
                        <label-item title="" :skeletonLoading="skeletonLoading">
                            <div v-if="picSrc" class="f-fl cursor" style="margin-right: 10px" @click="handlePreview(picSrc)">
                                <img :src="picSrc" >
                            </div>
                            <div v-else>
                                -
                            </div>
                        </label-item>
                    </div>
                </div>
                <div class="content-detail-line clearfix">
                    <div class="content-detail-line-title f-fl">企业注册地址：</div>
                    <label-item title="" :skeletonLoading="skeletonLoading">
                        <div class="content-detail-line-value f-fl">{{sendData.businessRegisterdAddress|blankVal}}</div>
                    </label-item>
                </div>
                <div class="tips waitting" v-if="skeletonLoading==false&&sendData.auditStatus==1">
                    您的认证信息我们已收到，正在紧急审核中，请耐心等待～
                </div>
                <div class="tips failReason" v-if="skeletonLoading==false&&sendData.auditStatus==3">
                    失败原因：{{sendData.auditComment|blankVal}}
                </div>
            </div>
        </div>
        <div class="footer">
            {{sendData.approveEmpName}}提交于 {{$moment(sendData.approveDate).format('lll')}}
        </div>
        <!-- 添加认证 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="521px" v-model="addAuthenticationDialog" class="ownModalBorder titDialog" title="重新认证" @cancel="addAuthenticationDialog=false;">
            <add-authentication @cancelAdd="cancelAuthentication" @addSuccess="initData"></add-authentication>
        </a-modal>
        <!-- 预览图片 -->
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="cancelPreviewImage">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
    import * as API from '@/api/setCompany';
    import  AddAuthentication from './addAuthentication';
    export default {
        name: "authenticationPerson",
        props: {
        },
        components: {
            AddAuthentication,
        },
        data() {
            return {
                bizModeList:[],
                cityList:[],
                picSrc:'',
                sendData:{
                    isTriple:1,             //是否3合一
                    auditStatus:1,          //待审核
                },
                addAuthenticationDialog:false,
                skeletonLoading:false,
                previewVisible:false,
                previewImage: '',
            };
        },
        created: function () {
            this.initData();
        },
        methods: {
            cancelPreviewImage() {
                this.previewVisible = false;
            },
            handlePreview(url) {
                this.previewImage = url;
                this.previewVisible = true;
            },
            cancelAuthentication(){
              this.addAuthenticationDialog = false;
            },
            initData(){
                this.addAuthenticationDialog = false;
                this.skeletonLoading = true;
                API.organizationViewApprove().then(res => {
                    if (res.code == 200) {
                        this.sendData = res.data;
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
                            this.cityList = [];
                            this.sendData.cityList.forEach((item)=>{
                                this.cityList.push(item.name);
                            })
                        }
                        if(this.sendData.picList!=null){
                            if(this.sendData.picList&&this.sendData.picList.length>0){
                                this.sendData.picList.forEach((item)=>{
                                    if(item.subBizType == 1){
                                        this.picSrc = item.origin
                                    }
                                });
                            }
                        }
                        this.skeletonLoading = false;
                    }
                });
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
    .authentication-company-box{
        background:rgba(255,255,255,1);
        width: 520px;
        max-height: calc(100vh - 100px);
        overflow: auto;
        .content{
            border-bottom: 1px solid #DDDDDD;
            .apartment{
                margin-top: 10px;
                background: #F5F7FE;
                height: 56px;
                line-height: 56px;
                padding:0 20px;
                .title{
                    color: #111111;
                    font-size:18px;
                    font-weight:400;
                }
                .number{
                    color: #777777;
                    font-size: 14px;
                }
                .icon{
                    margin-left: 12px;
                }
                .iconDesc{
                    margin-left: 3px;
                }
                .underReview{
                    color: #FFA036;
                }
                .pass{
                    color: #03C683;
                }
                .fail{
                    color: #FB4246;
                }
                .button{
                    width:88px;
                    height:32px;
                    line-height: 32px;
                    background:#0A87F8;
                    color: #FFFFFF;
                    text-align: center;
                    border-radius: 4px;
                    margin-top: 16px;
                }
            }
            .content-detail{
                padding: 20px;
                .content-detail-line{
                  margin-bottom: 14px;
                    .content-detail-line-title{
                        color: #777777;
                        height: 20px;
                        width: 98px;
                        line-height: 20px;
                    }
                    .content-detail-line-value{
                        margin-left: 10px;
                        width:calc(100% - 108px);
                        color: rgba(0, 0, 0, 0.85);
                    }
                    .content-detail-line-img{
                        margin-left: 10px;
                        width: calc(100% - 108px);
                        img{
                            width: 120px;
                            height: 76px;
                        }
                    }
                }
                .waitting{
                    background-color: #FEF9E5;
                    color: #FFA036;
                }
                .failReason{
                    background-color: #FFF0F1;
                    color: #FB4246;
                }
                .tips{
                    margin: 50px 0 10px 0;
                    height: 34px;
                    line-height: 34px;
                    text-align: center;
                }
            }
        }
        .footer{
            height: 50px;
            line-height: 50px;
            padding-left: 20px;
        }
    }
</style>