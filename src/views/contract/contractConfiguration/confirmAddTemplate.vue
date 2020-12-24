<template>
    <!-- 填写模板名称 -->
        <div class="fromStyle">
            <div>
                <label-item class="u-bottom-border" title="模板名称" :mustFill="true" style="margin-top: 26px">
                    <a-input placeholder="请输入" v-model="name"/>
                </label-item>
            </div>
            <div style="margin-top: 20px">
                <label-item title="使用范围" class="setDept u-bottom-border" :mustFill="true">
                  <a-tree-select labelInValue show-search :value="deptValue"
                                 placeholder="选择所属部门"
                                 style="width: 100%"
                                 :treeData="treeData"
                                 v-if="treeData.length"
                                 :treeDefaultExpandedKeys="[treeData[0].key]"
                                 treeNodeFilterProp="title"
                                 @change="onChange">
                  </a-tree-select>
                </label-item>
            </div>
            <div style="margin-top: 20px">
                <label-item class="backupEmail u-bottom-border" title="接收邮箱">
                    <a-input placeholder="请输入" @blur="checkEmail" v-model="backupEmail"/>
                    <div class="backupEmailWarn">
                        <a-icon style="color: rgb(255, 160, 54);margin-right: 4px" type="exclamation-circle" />
                        <span style="color: #999999;font-size: 12px">电子合同签约成功后，将已签字的电子合同发送到此邮箱留存备份</span>
                    </div>
                </label-item>
            </div>
            <div class="lastLine">
                <div class="buttonStyle">
                    <div class="cancelOption">
                        <a-button size="large" @click="cancelAddTemple" type="submit"
                                  class="formItemMarginButton cancelFont">
                            取消
                        </a-button>
                    </div>
                    <div class="saveOption">
                        <a-button size="large" :loading="saveLoading" @click="addTemple" type="primary" class="formItemMarginButton">
                            保存
                        </a-button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import {
        econtTemplateCreate,
        econtTemplateEdit,
    } from '@/api/contractTemple';
    import {getDeptTree} from "@/api/set";

    export default {
        name: "confirm-template",
        props: {
            parameter: {
                type: Object,
                required: true
            },
            type: {
                type: Number,
                default: 1,
            }
        },
        data() {
            return {
                title: "保存模板",
                id: "",
              name:'',
              backupEmail:'',
              relatedOrgId:'',
              deptValue:undefined,
              treeData:[],
              saveLoading:false,
            };
        },
        created() {
            this.initInfo();
        },
        methods: {
            cancelAddTemple() {
                this.$emit('cancelSave');
            },
            checkEmail(){
                let email = this.backupEmail;
                let emailMatch = email.match(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/g);
                if(!emailMatch){
                    this.$message.info('请输入正确邮箱格式');
                    return;
                }
            },
            addTemple() {
                let values = {};
                values.content = this.parameter.content;
                values.partyAFlag = this.parameter.partyAFlag;
                values.partyBFlag = this.parameter.partyBFlag;
                values.type = 1;
                values.id = this.parameter.id;
                //检测名称
                if(!this.name){
                  this.$message.warning('请输入模板名称');
                  return ;
                }
                if(!this.relatedOrgId){
                  this.$message.warning('请选择使用范围');
                  return ;
                }
                values.name = this.name;
                values.relatedOrgId = this.relatedOrgId;
                //检测邮箱
                let email = this.backupEmail;
                if(email){
                    let emailMatch = email.match(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/g);
                    if(!emailMatch){
                        this.$message.info('请输入正确邮箱格式');
                        return;
                    }
                }
                values.backupEmail = this.backupEmail;
                this.saveLoading = true;
                if(this.parameter&&this.parameter.id){
                    values.certPlatform = 1;
                    econtTemplateEdit(values).then(res => {
                        if(!res){
                          this.saveLoading = false;
                        }
                        if (res.code == "200") {
                            this.$message.info('修改成功');
                            //关闭父组件窗口
                            this.$emit('closeCurrent');
                        } else {
                            this.$message.error('修改失败');
                        }
                        this.saveLoading = false;
                    });
                }
                else {
                  values.certPlatform = 0;
                  econtTemplateCreate(values).then(res => {
                    if(!res){
                      this.saveLoading = false;
                    }
                    if (res.code == "200") {
                      this.$message.info('创建成功');
                      //关闭父组件窗口
                      this.$emit('closeCurrent');
                    } else {
                      this.$message.error('创建失败');
                    }
                    this.saveLoading = false;
                  });
                }
            },
            initInfo(){
                if(this.parameter&&this.parameter.id){
                    this.relatedOrgId = this.parameter.relatedOrgId;
                    this.getDeptTree();
                    this.name = this.parameter.name;
                    this.backupEmail = this.parameter.backupEmail;
                }
                else{
                  this.getDeptTree();
                }
            },
          onChange(value){
            this.deptValue = value;
            this.relatedOrgId = value.value;
          },
          addValue(arr) {
            //增加key
            if (arr.length > 0) {
              arr.forEach((item) => { //利用foreach循环遍历
                item.label = item.name;
                item.value = item.id;
                if(item.id == this.relatedOrgId){
                  this.deptValue = {
                    value:item.id,
                    label:item.name,
                  };
                }
                if (item.children.length > 0) //判断chlidren是否有数据
                {
                  this.addValue(item.children);  //递归调用
                }
              });
            }
          },
          getDeptTree() {
            getDeptTree().then(res => {
              let arr = [];
              arr[0] = res.data;
              this.addValue(arr);
              this.treeData = arr;
            });
          },
        },
    };
</script>

<style scoped lang="less">
    .fromStyle {
        width: 480px;
        margin: 0 auto;
        .backupEmail{
            position: relative;
            .backupEmailWarn{
                position: absolute;
                left : 53px;
                top: 2px;
            }
            /deep/ .label-item .title{
                margin-top: 2px;
            }
        }
        .lastLine{
            height: 112px;
            .buttonStyle {
                float: right;
                padding-top: 52px;

                .formItemMarginButton {
                    width: 120px;
                    height: 40px;
                }

                .cancelOption {
                    float: left;
                    margin-right: 20px;

                    .cancelFont {
                        color:#666666;
                    }

                    /deep/ .ant-btn-primary {
                        border-color: #DDDDDD;
                    }
                }

                .saveOption {
                    float: right;
                    margin-left: 20px;
                }
            }
        }
        /deep/ .ant-form-item{
            margin-bottom: 18px;
        }
        /deep/ .label-item .must-fill{
            margin-left: 4px;
        }
        /deep/ .ant-form-vertical .ant-form-item{
            padding-bottom: 0px;
        }
        & /deep/ .ant-form-explain{
            position: absolute;
        }
    }

    & /deep/ .ant-select-selection {
        border: none;
        border-bottom: 1px solid #ddd;
        box-shadow: none;
    }
    /deep/ .label-item .ant-select-selection__rendered{
        margin-left: 0;
    }
    & /deep/ .ant-input {
        box-shadow: none;
    }
    & /deep/ .ant-select-tree li .ant-select-tree-node-content-wrapper.ant-select-tree-node-selected{
      background:rgba(10,135,248,0.1);
    }
</style>