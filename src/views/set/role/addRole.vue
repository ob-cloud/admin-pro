<template>
    <a-modal centered :title="title" v-model="visible" class="ownModalBorder titDialog" :footer="null" :destroyOnClose="true">
        <div>
            <div class="fromStyle">
                <a-form :form="form" :layout="formLayout" class="formMargin">
                    <div class="marginTop">
                    </div>
                    <a-form-item class="u-bottom-border">
                        <label-item title="角色名称" :mustFill="true">
                            <a-input placeholder="输入角色名称"
                                     v-decorator="['name', { rules: [{ required: true, message: '角色名称必填', trigger: 'blur' }] }]"
                            />
                        </label-item>
                    </a-form-item>
                    <div class="u-bottom-border">
                        <label-item title="角色描述" :maxSize="500" :valLength="commentValue.length">
                            <a-textarea placeholder="输入角色描述" maxlength="500" v-model="commentValue"/>
                        </label-item>
                    </div>
                    <div class="buttonStyle">
                        <div class="cancelOption">
                            <a-button size="large" type="submit" @click="cancelAddRole"
                                      class="formItemMarginButton cancelFont">
                                取消
                            </a-button>
                        </div>
                        <div class="saveOption">
                            <a-button size="large" type="primary" @click="roleSave" class="formItemMarginButton">
                                保存
                            </a-button>
                        </div>
                    </div>
                </a-form>
            </div>
        </div>
    </a-modal>
</template>

<script>
    import {roleCreate,roleUpdate,roleGet} from '@/api/set';
    import ATextarea from "ant-design-vue/es/input/TextArea";

    export default {
        name: "addRole",
        components: {ATextarea},
        data() {
            return {
                title: "",
                visible: false,
                formLayout: 'vertical',
                form: this.$form.createForm(this, {name: 'coordinated'}),
                roleId: "",
                commentValue:"",
            };
        },
        methods: {
            getMsgFromAddRole() {
                this.commentValue = "";
                this.roleId="";
                this.visible = true;
                this.title = "添加角色";
            },
            getMsgFromEditRole(roleId) {
                this.visible = true;
                this.title = "修改角色";
                this.roleId = roleId;
                this.getRoleInfo(roleId);
            },
            cancelAddRole() {
                this.visible = false;
                this.$parent.roleListAll();
            },
            getRoleInfo(roleId){
                roleGet(roleId).then(res => {
                    this.form.setFieldsValue({
                        name:res.data.name,
                        comment:res.data.comment,
                    });
                    this.commentValue = res.data.comment;
                    this.roleId = roleId;
                });
            },
            roleSave() {
                if (this.roleId == "") {
                    this.form.validateFields((err, values) => {
                        values.orderIndex = 1;
                        values.comment = this.commentValue;
                        if(!err) {
                            roleCreate(values).then(res => {
                                if (res.code == "200") {
                                    this.$message.info('添加成功');
                                } else {
                                    this.$message.error('添加失败');
                                }
                                this.visible = false;
                                this.$parent.roleListAll();
                            });
                        }
                    });
                }else{
                    this.form.validateFields((err, values) => {
                        values.orderIndex = 1;
                        values.comment = this.commentValue;
                        if(!err) {
                            roleUpdate(this.roleId, values).then(res => {
                                if (res.code == "200") {
                                    this.$message.info('修改成功');
                                } else {
                                    this.$message.error('修改失败');
                                }
                                this.visible = false;
                                this.$parent.roleListAll();
                            });
                        }
                    });
                }
            }
        },
    };
</script>

<style scoped lang="less">
    .fromStyle {
        width: 480px;
        height: 280px;
        margin: 0 auto;

        .marginTop {
            margin-top: 26px;
        }

        .buttonStyle {
            float: right;
            margin-top: 45px;

            .formItemMarginButton {
                width: 120px;
                height: 40px;
            }

            .cancelOption {
                float: left;
                margin-right: 20px;

                /deep/ .ant-btn-primary{
                    border-color: #DDDDDD;
                }
                .cancelFont {
                    color:#666666;
                }
            }

            .saveOption {
                float: right;
                margin-left: 20px;
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
        padding-left: 0;
        border: none;
        border-bottom: 1px solid #ddd;
        box-shadow: none;
        border-radius: 0;
        width: 480px;
        height: 24px;
    }

    & /deep/ .ant-select-selection {
        border: none;
        border-bottom: 1px solid #ddd;
        box-shadow: none;
    }
</style>
