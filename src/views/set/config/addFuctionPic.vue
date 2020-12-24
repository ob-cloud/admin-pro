<template>
    <div class="fromStyle">
        <a-form :form="form" :layout="formLayout" class="formMargin">
            <div class="marginTop">
            </div>
            <a-form-item class="u-bottom-border">
                <label-item title="名称" :mustFill="true">
                    <a-select v-model="featuresData.type">
                        <a-select-option :value="1">合/整租</a-select-option>
                        <a-select-option :value="2">独栋公寓</a-select-option>
                        <a-select-option :value="3">合租</a-select-option>
                        <a-select-option :value="4">整租</a-select-option>
                       <!-- <a-select-option :value="5">地图找房</a-select-option>
                        <a-select-option :value="6">消息</a-select-option>-->
                    </a-select>
                </label-item>
            </a-form-item>
            <div class="dictionaryPic">
                    <label-item title="图标">
                        <div style="height: 4px;"></div>
                        <div>
                            <a-upload
                                    :action="action"
                                    listType="picture-card"
                                    @change="handleChange"
                                    :headers="uploadHeader"
                                    :fileList="fileList"
                            >
                                <div v-if="fileList.length < 1">
                                    <a-icon type="plus"/>
                                    <div class="ant-upload-text">上传图片</div>
                                </div>
                            </a-upload>
                        </div>
                    </label-item>
                </div>
            <div class="buttonDiv clearfix">
                <div class="saveOption f-fr">
                    <a-button size="large" type="primary" @click="functionPicSave" class="formItemMarginButton saveFont">
                        保存
                    </a-button>
                </div>
                <div class="cancelOption f-fr">
                    <a-button size="large" type="primary" @click="cancelSave"
                              class="formItemMarginButton cancelFont">
                        取消
                    </a-button>
                </div>
            </div>
        </a-form>
    </div>
</template>

<script>
    import {ACCESS_TOKEN} from '@/store/mutation-types'
    import {featuresAdd} from '@/api/setConfig';

    export default {
        name: "addDictionary",
        components: {},
        props: {
        },
        data() {
            return {
                uploadHeader: {
                    Authorization: ""
                },                    //上传相关
                formLayout: 'vertical',  //表单相关
                form: this.$form.createForm(this, {name: 'coordinated'}), //表单相关
                commentValue: "",    //描述的值，用于控制长度
                action: process.env.VUE_APP_BASE_FILESERVER_URL + "/file_upload",  //上传地址
                fileList: [],         //图片列表
                iconUrl: "",          //上传后的iconUrl及数据库回显的iconUrl
                featuresData:{
                    name:'',
                    iconUrl:'',
                    scenes:1,   //使用场景【1、C端小程序，2、...】
                    type:1,     //类型【1、快速找房，2、独栋公寓，3、合租，4、整租，5、地图找房，6、消息】
                    status:1,
                    sort:0,
                    webRouter:'test',
                },
            };
        },
        created: function () {
            const token = this.$ls.get(ACCESS_TOKEN)
            this.uploadHeader.Authorization =
                "Bearer " + token;
        },
        methods: {
            //上传图片
            handleChange(info) {
                this.fileList = info.fileList;
                if (info.fileList && info.fileList.length>0 && info.fileList[0].response) {
                    this.iconUrl = info.fileList[0].response.data.origin;
                    this.featuresData.iconUrl = info.fileList[0].response.data.origin;
                }
            },
            //取消保存操作
            cancelSave() {
                this.$emit("refreshPage");
            },
            //新增及修改
            functionPicSave() {
                    //新增
                this.form.validateFields((err) => {
                    if (!err) {
                        this.featuresData.sort = this.featuresData.type;
                        if(this.featuresData.type == 1){
                            this.featuresData.name = '合/整租';
                        } else if(this.featuresData.type == 2){
                            this.featuresData.name = '独栋公寓';
                        } else if(this.featuresData.type == 3){
                            this.featuresData.name = '合租';
                        } else if(this.featuresData.type == 4){
                            this.featuresData.name = '整租';
                        } else if(this.featuresData.type == 5){
                            this.featuresData.name = '地图找房';
                        } else if(this.featuresData.type == 6){
                            this.featuresData.name = '消息';
                        }
                        featuresAdd(this.featuresData).then(res => {
                            if (res.code == "200") {
                                this.$message.info('添加成功');
                            } else {
                                this.$message.error('添加失败');
                            }
                            this.$emit("refreshPage");
                        });
                    }
                });
            }
        },
    };
</script>

<style scoped lang="less">
    .fromStyle {
        width: 520px;
        height: 440px;

        .formMargin {
            width: 92%;
            margin: 0 auto;

            .marginTop {
                margin-top: 26px;
            }
            .dictionaryPic {
                height: 150px;
            }
            .buttonDiv {
                height: 80px;
                line-height: 80px;
                margin-left: 200px;

                .formItemMarginButton {
                    width: 120px;
                    height: 40px;
                    margin-left: 18px;
                }

                .cancelFont {
                    color: #666666;
                }
                .cancelOption {
                    & /deep/ .ant-btn-primary {
                        border: 1px solid #d9d9d9;
                    }
                }

                .saveFont {
                    color: #FFFFFF;
                    background-color: #0A87F8;
                }
            }

            .marginStyle {
                margin-top: 25px;
                margin-bottom: 5px;
            }

            .bordered {
                border-bottom: 1px solid #ddd;

                .deptName {
                    float: left;
                }

                .store {
                    float: right;
                }

                .inputDept {
                    width: 400px;
                }
            }
        }
    }
    & /deep/ .ant-input {
        height: 24px;
    }

</style>
