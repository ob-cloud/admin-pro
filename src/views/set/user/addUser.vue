<template>
   <div class="addUserBox" :style="key==1?'max-height: calc(100vh - 60px);overflow: auto;':''">
      <a-tabs defaultActiveKey="1" @change="callback"
              :tabBarStyle="{'background-color':'#F6F7F8'}">
          <a-tab-pane tab="添加员工" key="1">
              <div class="addUserForm">
                  <a-form :form="form" :layout="formLayout">
                      <div class="formTop">

                      </div>
                      <div>
                          <a-form-item class="u-bottom-border">
                              <label-item title="员工编号">
                                  <a-input placeholder="输入员工编号"
                                           v-decorator="['empNo']"
                                  />
                              </label-item>
                          </a-form-item>
                      </div>
                      <div>
                          <a-form-item class="u-bottom-border userNameStyle">
                              <label-item title="员工姓名" :mustFill="true">
                                  <a-input class="f-fl" style="width: calc(100% - 100px)" placeholder="输入员工姓名"
                                           v-decorator="['name', { rules: [{ required: true,message: '请输入员工姓名', trigger: 'blur' }] }]"
                                  />
                                  <a-select class="f-fl" style="width: 100px;" v-model="empTypeId" placeholder="请选择">
                                    <a-select-option v-for="(item) in empTypeList" :key="item.id">
                                      {{ item.name }}
                                    </a-select-option>
                                  </a-select>
                                  <div style="position: absolute;height: 16px;width: 1px;background: #E8E8E8;bottom:-28px;right: 110px;"></div>
                              </label-item>
                          </a-form-item>
                      </div>
                      <div>
                          <a-form-item class="u-bottom-border">
                              <label-item title="员工电话(登录手机号)" :mustFill="true">
                                  <a-input placeholder="输入员工电话" :maxlength="11"
                                           v-decorator="['phone', { rules: [{ required: true,message: '请输入员工电话', trigger: 'blur' }] }]"
                                  />
                              </label-item>
                          </a-form-item>
                      </div>
                      <div>
                          <a-form-item>
                              <div class="formItemDept">
                                  <div class="deptInfo u-bottom-border">
                                      <label-item title="直属部门" :mustFill="true" class="userLabel">
                                        <a-tree-select labelInValue show-search
                                            placeholder="选择直属部门"
                                            style="width: 100%"
                                            :treeData="treeData"
                                            v-if="treeData.length"
                                            :treeDefaultExpandedKeys="[treeData[0].key]"
                                            v-decorator="[ 'deptId',{ rules: [{ required: true, message: '请选择直属部门' }]  } ]"
                                            treeNodeFilterProp="title"
                                            @change="onChange">
                                        </a-tree-select>
                                      </label-item>
                                  </div>
                                  <div class="isLeader">
                                      <a-checkbox v-model="isLeader">本部门领导</a-checkbox>
                                  </div>
                              </div>
                          </a-form-item>
                      </div>
                      <div class="selectDeptStyle">
                        <a-form-item>
                          <div class="formItemDept" style="border-bottom: none">
                            <div class="u-bottom-border">
                              <label-item title="兼职部门（可选）" class="userLabel">
                                <a-tree-select
                                    show-search
                                    labelInValue
                                    style="width: 100%"
                                    :value="deptValue"
                                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                    placeholder="请选择兼职部门"
                                    allow-clear
                                    multiple :treeData="treeData"
                                    tree-default-expand-all
                                    treeNodeFilterProp="title"
                                    @change="onChange_deptValue"
                                    @search="onSearch"
                                    @select="onSelect"
                                >
                                </a-tree-select>
                              </label-item>
                            </div>
                          </div>
                        </a-form-item>
                      </div>
                      <div>
                          <a-form-item class="u-bottom-border">
                              <label-item title="角色" :mustFill="true">
                                  <set-role @getSelectRoleId="getMsgFromRole"
                                            v-decorator="[ 'roleId',{ rules: [{ required: true, message: '请选择所属角色' }]  } ]">
                                  </set-role>
                              </label-item>
                          </a-form-item>
                      </div>
                      <div>
                          <a-form-item class="u-bottom-border">
                              <div class="userInfo">
                                  <label-item title="员工身份证号" class="idCardNo">
                                      <a-input placeholder="输入身份证号" v-decorator="['idCardNo']"/>
                                  </label-item>
                                  <div class="gender">
                                      <a-radio-group name="radioGroup" v-model="gender">
                                          <a-radio :value="1">男</a-radio>
                                          <a-radio :value="2">女</a-radio>
                                      </a-radio-group>
                                  </div>
                              </div>
                          </a-form-item>
                      </div>
                      <div class="buttonDiv">
                          <a-button size="large" @click="cancelAddDept" class="formItemMarginButton cancelFont">
                              取消
                          </a-button>
                          <a-button size="large" @click="employeeCreate" :loading="saveLoading" class="formItemMarginButton saveFont">
                              保存
                          </a-button>
                      </div>
                  </a-form>
              </div>
          </a-tab-pane>
          <a-tab-pane tab="邀请注册" key="2">
              <div class="inviteContent" :forceRender="false">
                  <div class="explain">
                      <span>发送邀请地址给企业成员，发送到公司的微信群或者QQ群，企业成员可以通过该地址直接注册账号</span>
                  </div>
                  <div class="inviteUrlCopy clearfix">
                      <div class="inviteUrl">
                          <a-input :value="inviteUrl" disabled/>
                      </div>
                      <textarea style="position:absolute;left:-11111px" id="copyDom"></textarea>
                      <div class="inviteCopy" @click="copyFunction">
                          <span class="inviteCopyFont">复制链接</span>
                      </div>
                  </div>
                  <div class="inviteTerm">
                      <span>链接有效期3天</span>
                  </div>
                  <div class="cancelButton">
                      <a-button size="large" @click="cancelAddDept" type="primary" class="formItemMarginButton">
                          关闭
                      </a-button>
                  </div>
              </div>
          </a-tab-pane>
      </a-tabs>
   </div>
</template>

<script>
    import {employeeCreate, getInviteAuthCode,getDeptTree} from '@/api/set';
    import setRole from '../role/setRole';
    import {listEnableDict} from "@/api/contract";

    let url = '';
    if (process.env.NODE_ENV == 'production'&&process.env.VUE_APP_API_BASE_URL == 'https://gw.yumeng.work'){
      url = "https://invitation.yumeng.work/#/addPersonInfo?authCode=";
    }
    else if(process.env.NODE_ENV == 'production'&&process.env.VUE_APP_API_BASE_URL == 'https://gw.52ejia.cn'){
      url = "https://invitation.52ejia.cn/#/addPersonInfo?authCode=";
    }
    else{
      url = "https://invitation.dev.yumeng.work/#/addPersonInfo?authCode=";
    }


    export default {
        name: "addUser",
        data() {
            return {
                formLayout: 'vertical',
                form: this.$form.createForm(this, {name: 'coordinated'}),
                inviteUrl: url,
                isLeader: false,
                gender: 1,
                key: 1,
                saveLoading:false,
                deptId:undefined,
                deptValue:undefined,
                treeData:[],
                empTypeList:[],
                empTypeId:'',
            };
        },
        components: {setRole},
        created: function () {
          this.getDeptTree();
          this.getEmpTypeList();
        },
        methods: {
          getEmpTypeList(){
            let id = '29ad979b026c437f951a29af0332f2c3';
            // 品牌
            listEnableDict(id).then(res => {
              if (res.code == 200) {
                this.empTypeList = res.data;
                this.empTypeList.forEach((item)=>{
                  if(item.name == '员工'){
                    this.empTypeId = item.id;
                  }
                });
              }
            })
          },
          onChange_deptValue(value){
            this.deptValue = value;
          },
          onChange(value){
            this.deptId = value.value;
          },
          onSearch() {
          },
          onSelect() {
          },
            addValue(arr,disabledFlag) {
              //增加key
              if (arr.length > 0) {
                arr.forEach((item) => { //利用foreach循环遍历
                  item.label = item.name;
                  item.value = item.id;
                  if(disabledFlag){
                    if(item.id == this.deptId){
                        item.disabled = true;
                    }
                    else{
                      item.disabled = false;
                    }
                  }
                  if (item.children.length > 0) //判断chlidren是否有数据
                  {
                    this.addValue(item.children,disabledFlag);  //递归调用
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
            callback(key) {
                this.key = key;
                if (key == 2) {
                    this.getInviteAuthCode();
                }
            },
            cancelAddDept() {
                this.$emit('cancelAdd');
            },
            getMsgFromRole(data) {
                this.form.setFieldsValue({
                    roleId: data,
                });
            },
            employeeCreate() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        values.isLeader = this.isLeader ? 1 : 0;
                        values.gender = this.gender;
                        values.isLeader = values.isLeader ? 1 : 0;
                        let assistDeptIdList = [];
                        values.deptId = this.deptId;
                        if(this.deptValue&&this.deptValue.length>0){
                          this.deptValue.forEach((item)=>{
                            if(item.value!=this.deptId){
                              assistDeptIdList.push(item.value);
                            }
                          });
                        }
                        values.assistDeptIdList = assistDeptIdList;
                        values.empTypeId = this.empTypeId;
                        this.saveLoading = true;
                        //添加人员
                        employeeCreate(values).then(res => {
                            if(!res){
                                this.saveLoading = false;
                            }
                            if (res.code == "200") {
                                this.$message.info('添加成功');
                                this.$emit('saveSuccess');
                            } else {
                                this.$message.error('添加失败');
                            }
                            this.saveLoading= false;
                        });
                    }
                });
            },
            getInviteAuthCode() {
                getInviteAuthCode().then(res => {
                    this.inviteUrl = url + res.data;
                });
            },
            copyFunction() {
                // 复制
                //let tenantId = sessionStorage.getItem("tenantId");
                if (this.inviteUrl) {
                    var dom = document.getElementById("copyDom");
                    dom.value = this.inviteUrl;

                    dom.select(); // 选中文本
                    document.execCommand("copy"); // 执行浏览器复制命令
                    this.$message.info("复制成功");
                } else {
                    this.$message.error("复制失败");
                }
            },
        },
        watch: {
        }
    };
</script>

<style scoped lang="less">

    .addUserForm {
        width: 100%;
        // margin: 0 auto;
        padding: 0 20px;

        .formTop {
            // margin-top: 10px;
        }
        .userNameStyle{
          /deep/ .ant-form-explain{
            bottom: -20px;
          }
          /deep/ .ant-select-selection__rendered{
            margin-right: 0;
            margin-left: 10px;
          }
        }
        .formItemDept {
            padding-bottom: 5px;
            border-bottom: 1px solid #ddd;
            height: 61px;
            position:relative;
            .deptInfo {
                width: 70%;
                float: left;
                margin-top: -5px;
            }

            .isLeader {
                position: absolute;
                top:33px;
                right:0px;
            }
        }

        .userInfo {
            position:relative;
            .gender {
                position: absolute;
                top:33px;
                right:0px;
            }
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

            .saveFont {
                color: #FFFFFF;
                background-color: #0A87F8;
            }
        }

        & /deep/ .ant-input {
            box-shadow: none;
        }

    }

    .inviteContent {
        width: 90%;
        margin: 0 auto;
        height: 240px;

        .explain {
            margin-top: 25px;
            margin-bottom: 25px;
            color: rgba(17, 17, 17, 1);
        }

        .inviteUrlCopy {
            background-color: #F5F7FE;

            .inviteUrl {
                background-color: #F5F7FE;
                float: left;
                width: 385px;
                height: 46px;
                line-height: 46px;
            }

            .inviteCopy {
                background-color: #CEE8FF;
                float: right;
                width: 80px;
                height: 46px;
                line-height: 46px;
                border-radius: 4px;

                .inviteCopyFont {
                    width: 60px;
                    text-align: center;
                    margin-left: 10px;
                    color: #0A87F8;
                }
                .inviteCopyFont:hover{
                    color:rgba(10,135,248,0.8);
                }
            }
        }

        .cancelButton {
            margin-top: 40px;

            .formItemMarginButton {
                width: 120px;
                height: 40px;
                float: right;
            }
        }

        .inviteTerm {
            margin-top: 10px;
        }

        & /deep/ .ant-input {
            border: none;
            background-color: #F5F7FE;
            color: rgba(17, 17, 17, 1);
        }
    }

    //    .userLabel{
    //        & /deep/ .ant-select-selection__rendered{
    //            margin-left:10px;
    //         }
    //    }

    .addUserForm {
        & /deep/ .ant-form-item {
            margin-bottom: 12px;
        }
        & /deep/  ant-select-selection{
            height: 28px;
        }
        & /deep/ .ant-form-explain{
          position: absolute;
        }
        & /deep/ .label-item .title{
          margin-bottom: 4px;
        }
    }
    .addUserBox{
        & /deep/ .ant-tabs-nav .ant-tabs-tab{
           margin: 0 22px;
           padding: 12px 0;
        }
      .selectDeptStyle{
        /deep/ .ant-select-search__field__placeholder{
          left:0px;
        }
        /deep/ .ant-select-selection__rendered{
          margin-left: 0px;
        }
      }
    }
    .label-item & /deep/ .ant-select-selection__rendered{
        margin-left: 0px;
    }
    & /deep/ .ant-select-tree li .ant-select-tree-node-content-wrapper.ant-select-tree-node-selected{
        background:rgba(10,135,248,0.1);
    }
</style>
