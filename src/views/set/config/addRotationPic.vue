<template>
    <div class="addRotationPic-box" :style="sendData.type==1?' height: calc(100vh - 90px);':'height: calc(100vh - 260px);'">
        <div class="topStyle clearfix">
            <div class="addPicStyle f-fl">
                <own-upload :picList="picList" :uploadParms="sendData1_1" :maxLength="1" :showTips="false" ref="img1_1">
                    <div style="padding-top: 25px;text-align: center;width: 174px;">
                        <a-icon type="plus"/>
                        <div class="ant-upload-text">上传轮播图</div>
                    </div>
                </own-upload>
            </div>
            <div class="picDesStyle f-fl">
                <div class="tile">建议</div>
                <div class="normal">图片格式： jpg、png、jpeg</div>
                <div class="normal">建议尺寸：750*420</div>
            </div>
        </div>
        <div class="secondStyle clearfix">
            <div class="descFontStyle f-fl">页面详情</div>
            <div class="checkBoxStyle f-fl" v-show="false">
                <div class="f-fl clearfix" style="margin-left: 30px">
                    <div class="allCheck f-fl checked" v-if="sendData.type==1">
                        <div class="f-fl"><icon-font class="icon iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">富文本</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-else @click="sendData.type=1">
                        <div class="f-fl"><icon-font class="icon iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">富文本</div>
                    </div>
                </div>
                <div class="f-fl cursor" style="margin-left: 30px" @click="sendData.type=2">
                    <div class="allCheck checked clearfix" v-if="sendData.type==2">
                        <div class="f-fl"><icon-font class="icon iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">链接</div>
                    </div>
                    <div class="allCheck clearfix" v-else>
                        <div class="f-fl " ><icon-font class="icon iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">链接</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="thirdStyle">
            <div v-if="sendData.type==1">
                <div class="ckeditor-document">
                    <div class="right-ckeditor-document">
                        <jodit-editor v-model="sendData.content" :config="joditConfig" />
                    </div>
                </div>
            </div>
            <div v-else>
                <label-item>
                    <div class="thirdStyleUrl clearfix">
                        <div class="thirdStyleUrlDomain f-fl">
                            https://
                        </div>
                        <div class="u-no-border f-fl" style="width: calc(100% - 68px)">
                            <a-input v-model="linkStr"  placeholder="请输入链接地址" />
                        </div>
                    </div>
                </label-item>
            </div>
        </div>
        <div class="clearfix"  style="width: 100%;height: 75px;padding: 30px 14px 0 14px;">
            <div class="f-fl assignment cursor" v-if="sendData.type==1" @click="preview">
                <icon-font type="iconyumengtubiao_yanjing-1"></icon-font> 预览
            </div>
            <div class="f-fr buttonDiv">
                <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
                    取消
                </a-button>
                <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="saveData">
                    保存
                </a-button>
            </div>
        </div>
        <a-modal title="模板预览" centered  v-model="showPreview" class="ownModalBorder titDialog" width="1000px" :footer="null" :destroyOnClose="true">
            <template-detail :templateTxt="appendEditorTxt"></template-detail>
        </a-modal>
    </div>
</template>

<script>
    import 'jodit/build/jodit.min.css';
    import * as API from '@/api/setConfig';
    import { JoditEditor } from 'jodit-vue';
    import templateDetail from './templateDetail';
    export default {
        name: "addRotationPic",
        components: {
            JoditEditor,
            templateDetail,
        },
        props: {
            currentRotationId: {   //当前轮播id
                type: String,
                default: ''
            },
            type: {
                type: Number,
                default: 1
            },
        },
        data() {
            return {
                picList: [],
                sendData1_1: {},
                linkStr:'',
                sendData:{
                    content:'',
                    link:'',
                    name:'',
                    picId:'',
                    scenes:1,
                    type:1,
                },
                joditConfig:{
                    "showXPathInStatusbar": false,
                    "askBeforePasteFromWord": false,
                    "askBeforePasteHTML": false,
                    "uploader": {
                        "insertImageAsBase64URI": true
                    },
                    "placeholder":'',
                },
                joditButtons:['bold','strikethrough','underline','italic','eraser','|','superscript','subscript','|',
                    'ul','ol','|','outdent','indent','|','font','fontsize','brush','paragraph','|','image',
                    'table','link','|','align','|','symbol','hr','fullsize','print'],
                appendEditorTxt:'',
                showPreview:false,
            };
        },
        created() {
            this.sendData1_1 = { //
                // 上传时附带的额外参数
                bizId: '', // 房源id
                bizType: 9, // 图片大类标识 web管理
                subBizType: 1, // 图片子类标识 banner
                orderIndex: 1 // 排序值
            }
            this.sendData.type = this.type;
            this.initData();
        },
        mounted() {
            this.sendData1_1 = { //
                // 上传时附带的额外参数
                bizId: '', // 房源id
                bizType: 9, // 图片大类标识 web管理
                subBizType: 1, // 图片子类标识 banner
                orderIndex: 1 // 排序值
            }
        },
        methods: {
            initData(){
                if(!this.currentRotationId){
                    return
                }
                API.carouselView(this.currentRotationId).then(res => {
                    if (res.code == 200) {
                        this.sendData= res.data;
                        this.picList = [];
                        if(this.sendData.pic){
                            this.picList.push(this.sendData.pic);
                            this.sendData.picId = this.sendData.pic.id;
                        }
                        if(this.sendData.link){
                            if(this.sendData.link.indexOf('://') > -1){
                                let tempLink = this.sendData.link.split('://');
                                this.linkStr = tempLink[1];
                            }else{
                                this.linkStr = this.sendData.link;
                            }
                        }
                    }
                },error => {
                });
            },
            //预览
            preview() {
                this.appendEditorTxt = this.sendData.content;
                this.showPreview = true;
            },
            cancelSave(){
                this.$emit("cancelSave");
            },
            saveData(){
                if (this.$refs.img1_1.picsList.length != 0) {
                    this.sendData.picId = this.$refs.img1_1.picsList[0].id;
                }
                else {
                    this.$message.warn('请上传轮播图图片!');
                    return;
                }
                if(this.linkStr){
                    this.sendData.link = 'https://'+ this.linkStr;
                }
                if(this.currentRotationId){
                    API.carouselEdit(this.sendData).then(res => {
                        if (res.code == "200") {
                            this.$message.info('添加成功');
                        } else {
                            this.$message.error('添加失败');
                        }
                        this.$emit("saveRefresh");
                    });
                }else{
                    API.carouselAdd(this.sendData).then(res => {
                        if (res.code == "200") {
                            this.$message.info('添加成功');
                        } else {
                            this.$message.error('添加失败');
                        }
                        this.$emit("saveRefresh");
                    });
                }
            },
        },
    };
</script>

<style scoped lang="less">
    .addRotationPic-box {
        width: 810px;
        overflow: auto;
        .topStyle{
            margin: 20px;
            height: 98px;
            .addPicStyle{
                /deep/ .ant-upload.ant-upload-select-picture-card{
                    width: 174px;
                    height: 98px;
                }
            }
            .picDesStyle{
                padding: 18px 0 10px 20px;
                height: 98px;
                .tile{
                    color: #111111;
                    font-size: 14px;
                    margin-bottom: 10px;
                }
                .normal{
                    color: #777777;
                    font-size: 12px;
                    height: 22px;
                    line-height: 22px;
                }
            }
        }
        .secondStyle{
            margin: 10px 20px 10px 20px;
            .descFontStyle{
                color: #777777;
                font-size: 16px;
            }
            .checkBoxStyle {
                .allCheck {
                    height: 24px;
                    line-height: 24px;
                    .icon{
                        vertical-align: middle;
                        margin-top: -2px;
                    }
                }
                .checked {
                    color: #0A87F8;

                    .iconSize {
                        width: 16px;
                        height: 16px;
                    }
                }
                .fontStyle{
                    color: #111111;
                    font-size: 14px;
                    margin-left: 7px;
                }
            }
        }
        .thirdStyle{
            margin: 0 20px 0 20px;
            .thirdStyleUrl{
                width: 100%;
                height: 34px;
                line-height: 34 px;
                border-radius:2px;
                border:1px solid #EEEEEE;
                .thirdStyleUrlDomain{
                    background:#F7F8FB;
                    border-radius:2px;
                    width: 68px;
                    height: 32px;
                    line-height: 32px;
                    color: #111111;
                    font-size: 14px;
                    text-align: center;
                }
                /deep/ .ant-input{
                    padding-left: 10px;
                }
            }
            .ckeditor-document{
                .right-ckeditor-document{
                    height: 280px;
                    /deep/ .jodit_wysiwyg{
                        height: 240px;
                    }
                }
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
    }
</style>
