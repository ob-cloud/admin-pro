<template>
    <div class="fromStyle">
        <div class="formTop">
        </div>
        <div class="deptStore">
            <div class="u-bottom-border">
                <label-item title="部门名称" class="dept" :mustFill="true">
                    <a-input placeholder="输入部门名称" v-model="name" maxLength="10"/>
                    <div class="store">
                        <a-checkbox v-model="store">门店</a-checkbox>
                    </div>
                </label-item>
            </div>
        </div>
        <div style="margin-top: 10px;">
        </div>
        <div class="setDept">
            <div>
                <label-item title="所属部门" class="setDept u-bottom-border" :mustFill="true">
                  <a-tree-select labelInValue show-search :value="deptValue"
                                 placeholder="选择所属部门"
                                 style="width: 100%"
                                 :treeData="treeData"
                                 v-if="treeData.length"
                                 :treeDefaultExpandedKeys="[treeData[0].key]"
                                 v-decorator="[ 'deptId',{ rules: [{ required: true, message: '请选择所属部门' }]  } ]"
                                 treeNodeFilterProp="title"
                                 @change="onChange">
                  </a-tree-select>
                </label-item>
            </div>
        </div>
        <div class="buttonStyle">
            <div class="cancelOption" >
                <a-button size="large" @click="cancelAddDept" type="submit" class="formItemMarginButton cancelFont" >
                    取消
                </a-button>
            </div>
            <div class="saveOption" >
                <a-button size="large" @click="addDept" type="primary" :loading="saveLoading" class="formItemMarginButton">
                    保存
                </a-button>
            </div>
        </div>
    </div>
</template>

<script>
import {deptCreate, getDeptInfo, deptUpdate, getDeptTree} from '@/api/set';

    export default {
        name: "addDept",
        data() {
            return {
                store:false,
                id:"",
                saveLoading:false,
                name:'',
                deptPid:'',
                deptValue:undefined,
                treeData:[],
            };
        },
        props: {
          deptId: {
            type: String
          },
        },
        created() {
          this.id = this.deptId;
          if(this.deptId){
            this.getDeptInfo();
          }
          else{
            this.getDeptTree();
          }
        },
      methods: {
          onChange(value){
            this.deptValue = value;
            this.deptPid = value.value;
          },
          addValue(arr) {
            //增加key
            if (arr.length > 0) {
              arr.forEach((item) => { //利用foreach循环遍历
                item.label = item.name;
                item.value = item.id;
                if(item.id == this.deptPid){
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
            cancelAddDept(){
              this.$emit('cancelAdd');
            },
            getDeptInfo(){
                getDeptInfo(this.deptId).then(res => {
                  this.name = res.data.name;
                  this.deptPid = res.data.pid
                  this.store = res.data.isStore == 1?true:false;
                  this.getDeptTree();
                });
            },
            addDept() {
                if(!this.name){
                  this.$message.warning('请输入部门名称');
                  return ;
                }
                if(!this.deptPid){
                  this.$message.warning('请选择所属部门');
                  return ;
                }
                this.saveLoading = true;
                if(this.id == "") {
                    //添加部门
                    let parameter = {
                        name: this.name,
                        pid: this.deptPid,
                        isStore: this.store ? 1 : 0,
                    };
                    deptCreate(parameter).then(res => {
                        if(!res){
                          this.saveLoading = false;
                        }
                        if (res.code == "200") {
                            this.$message.info('添加成功');
                            this.$emit('saveSuccess');
                        }
                        else{
                            this.$message.error('添加失败');
                        }
                        this.saveLoading = false;
                    });
                }
                else{
                    //修改部门
                    let parameter = {
                      name: this.name,
                      pid: this.deptPid,
                      isStore: this.store ? 1 : 0,
                      id:this.id,
                    };
                    deptUpdate(parameter).then(res => {
                        if(!res){
                          this.saveLoading = false;
                        }
                        if (res.code == "200") {
                            this.$message.info('修改成功');
                            this.$emit('saveSuccess');
                        }
                        else{
                            this.$message.error('修改失败');
                        }
                        this.saveLoading = false;
                    });
                }
            }
        },
    };
</script>

<style scoped lang="less">
    .fromStyle {
        width: 480px;
        height: 306px;
        margin: 0 auto;
        .formTop{
            margin-top: 25px;
        }
        .deptStore{
            height: 75px;
            .dept {
                position:relative;
            }
            .store {
                position: absolute;
                top:25px;
                right:0px;
            }
        }
        .setDept{
            height: 47px;
        }
        .buttonStyle{
            float: right;
            margin-top: 88px;
            .formItemMarginButton{
                width: 120px;
                height: 40px;
            }
            .cancelOption{
                float: left;
                margin-right: 20px;
                .cancelFont{
                    color:#666666;
                }
                /deep/ .ant-btn-primary{
                    border-color: #DDDDDD;
                }
            }
            .saveOption{
                float: right;
                margin-left: 20px;
            }
        }
    }
    & /deep/ .ant-select-selection {
        border: none;
        border-bottom: 1px solid #ddd;
        box-shadow: none;
    }
    & /deep/ .ant-input {
        box-shadow: none;
    }
    & /deep/ .ant-form-explain{
        position: absolute;
    }
    .label-item & /deep/ .ant-select-selection__rendered{
        margin-left: 0px;
    }
    & /deep/ .ant-select-tree li .ant-select-tree-node-content-wrapper.ant-select-tree-node-selected{
        background:rgba(10,135,248,0.1);
    }
</style>
