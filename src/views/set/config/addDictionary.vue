<template>
    <div class="fromStyle">
        <div class="marginTop">
        </div>
        <div class="u-bottom-border">
            <label-item title="名称" :mustFill="true" :maxSize="maxlength" :valLength="name.length">
                <a-textarea placeholder="输入字典名称" :disabled="disabledName" v-model="name" :maxlength="maxlength"/>
            </label-item>
        </div>
        <div class="dictionaryPic" style="margin-top: 25px;">
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
        <div class="u-bottom-border">
            <label-item title="描述" :maxSize="100" :valLength="comment.length">
                <a-textarea placeholder="请输入描述文字" autosize v-model="comment" maxlength="100"/>
            </label-item>
        </div>
        <div class="buttonDiv clearfix" style="margin-top: 60px;">
            <div class="saveOption f-fr">
                <a-button size="large" type="primary" @click="dictionarySave" :loading="saveLoading" class="formItemMarginButton saveFont">
                    保存
                </a-button>
            </div>
            <div class="cancelOption f-fr">
                <a-button size="large" type="submit" @click="cancelSave"
                          class="formItemMarginButton cancelFont">
                    取消
                </a-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {ACCESS_TOKEN} from '@/store/mutation-types'
    import {dictionaryGet, dictionaryInsert, dictionaryUpdate} from '@/api/set';
    import ATextarea from "ant-design-vue/es/input/TextArea";

    export default {
        name: "addDictionary",
        components: {ATextarea},
        props: {
            pid: {
                type: String,
                required: "",
            },
            id:{
                type: String,
                default: "",
            },
            lable:{
                type: String,
                default: "",
            },
            orderIndex:{
                type: Number,
                default: 0,
            },
            viewNameMaxLength:{
              type: Number,
              default:10,
            },
        },
        data() {
            return {
                uploadHeader: {
                    Authorization: ""
                },                    //上传相关
                name:'',
                comment: "",    //描述的值，用于控制长度
                action: process.env.VUE_APP_BASE_FILESERVER_URL + "/file_upload",  //上传地址
                fileList: [],         //图片列表
                iconUrl: "",          //上传后的iconUrl及数据库回显的iconUrl
                disabledName:false,
                maxlength:10,
              saveLoading:false,
            };
        },
        created: function () {
            this.getInfo();
            const token = this.$ls.get(ACCESS_TOKEN)
            this.uploadHeader.Authorization =
                "Bearer " + token;
            if(this.viewNameMaxLength){
                this.maxlength = this.viewNameMaxLength;
            }
        },
        methods: {
            //上传图片
            handleChange(info) {
                this.fileList = info.fileList;
                if (info.fileList && info.fileList.length>0 && info.fileList[0].response) {
                    this.iconUrl = info.fileList[0].response.data.origin;
                }
            },
            //取消保存操作
            cancelSave() {
                this.$emit("refreshPage");
            },
            //获取字典详情
            getInfo() {
                if (this.id != "") {
                    dictionaryGet(this.id).then(res => {
                        this.name = res.data.name;
                        this.comment = res.data.comment;
                        this.iconUrl = res.data.iconUrl;
                        if(res.data.iconUrl!=""){
                            //回显图片，初始化fileList
                            this.fileList = [
                                {
                                    uid: res.data.id,
                                    name: res.data.name,
                                    status: 'done',
                                    url: this.iconUrl,
                                    thumbUrl: this.iconUrl,
                                },
                            ];
                        }
                        if(res.data.isSystemDefault == 1){
                            this.disabledName = true;
                        }else{
                            this.disabledName = false;
                        }
                    });
                }
            },
            //新增及修改
            dictionarySave() {
                if (this.id == "") {
                    if(!this.name){
                      this.$message.warning('请输入输入字典名称');
                      return ;
                    }
                    //新增
                    let values = {};
                    values.name = this.name;
                    values.comment = this.comment
                    //构造字段参数
                    values.orderIndex = this.orderIndex;  //索引：排序相关
                    values.isUse = 0;                     //是否可用：默认不可用
                    values.lable = this.lable + '@TAGS '; //模块
                    values.pid = this.pid;                //哪个模块下的业务
                    values.iconUrl = this.iconUrl;        //图标url
                    this.saveLoading = true;
                    dictionaryInsert(values).then(res => {
                        if(!res){
                          this.saveLoading = false;
                        }
                        if (res.code == "200") {
                            this.$message.info('添加成功');
                            this.$emit("refreshPage");
                        } else {
                            this.$message.error('添加失败');
                        }
                        this.saveLoading = false;
                    });
                } else {
                    if(!this.name){
                      this.$message.warning('请输入输入字典名称');
                      return ;
                    }
                    let values = {};
                    values.name = this.name
                    values.comment = this.comment
                    //修改
                    values.iconUrl = this.iconUrl;      //图标url
                    this.saveLoading = true;
                    dictionaryUpdate(this.id, values).then(res => {
                        if(!res){
                          this.saveLoading = false;
                        }
                        if (res.code == "200") {
                            this.$message.info('修改成功');
                            this.$emit("refreshPage");
                        } else {
                            this.$message.error('修改失败');
                        }
                        this.saveLoading = false;
                    });
                }
            },
        },
    };
</script>

<style scoped lang="less">
    .fromStyle {
        width: 520px;
        padding: 0 20px;

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
    & /deep/ .ant-input {
        height: 24px;
    }

</style>
