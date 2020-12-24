<template>
    <div class="fromStyle">
      <div>
        <a-form :form="form" :layout="formLayout">
            <div class="nameStyle">
                <div>已选员工：{{names}}</div>
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
            <div v-if="type == 3">
                <a-form-item class="u-bottom-border">
                    <label-item title="角色" :mustFill="true">
                        <set-role ref="setRoleChild" @getSelectRoleId="getMsgFromRole"
                                  v-decorator="[ 'roleId',{ rules: [{ required: true, message: '选择所属角色' }]  } ]">
                        </set-role>
                    </label-item>
                </a-form-item>
            </div>
        </a-form>
      </div>
      <div class="clearfix" style="padding: 30px 0 20px 0;">
        <div class="buttonStyle">
        <div class="cancelOption">
          <a-button size="large" @click="cancelMoveDept" type="submit"
                    class="formItemMarginButton cancelFont">
            取消
          </a-button>
        </div>
        <div class="saveOption">
          <a-button size="large" :loading="saveLoading" @click="moveDistributeDept" type="primary" class="formItemMarginButton">
            保存
          </a-button>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import {employeeMoveDept, employeeAssignDept, employeeApplyBatchPass, getDeptTree} from '@/api/set';
    import setRole from '../role/setRole';

    export default {
        name: "moveDept",
        data() {
            return {
                formLayout: 'vertical',
                form: this.$form.createForm(this, {name: 'coordinated'}),
                ids:"",               //选择的员工id集合
                names:"",             //选择的员工名称
                deptDecoratorMessage:"", //部门必填的提示信息
                fromStyle:"fromStyle",   //form的样式
              saveLoading:false,
              deptId:undefined,
              deptValue:undefined,
              treeData:[],
            };
        },
        props: {
          idList: {
            type: Array,
          },
          nameList:{
            type: Array,
          },
          type:{
            //是否移动 1是移动；2分配；3:批量审核员工
            type:Number,
          }
        },
        components: {setRole},
      created() {
          this.ids = this.idList;
          this.names = this.nameList.join("、");
          if(this.type == 1){
            this.fromStyle="fromStyle";
            this.deptDecoratorMessage="选择需要移动到的部门";
          }
          if(this.type == 2){
            this.fromStyle="fromStyle";
            this.deptDecoratorMessage="选择需要分配到的部门";
          }
          if(this.type == 3){
            this.fromStyle="verifyUserStyle";
            this.deptDecoratorMessage="选择所属部门";
          }
          this.getDeptTree();
      },
      methods: {
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
            getMsgFromDept(data) {
                this.form.setFieldsValue({
                    deptId: data,
                });
            },
            getMsgFromRole(data) {
                this.form.setFieldsValue({
                    roleId: data,
                });
            },
            cancelMoveDept() {
                this.$emit('cancelMove');
            },
            moveDistributeDept() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let assistDeptIdList = [];
                        if(this.deptValue&&this.deptValue.length>0){
                          this.deptValue.forEach((item)=>{
                            if(item.value!=this.deptId){
                              assistDeptIdList.push(item.value);
                            }
                          });
                        }
                        let parameter ={
                            deptId : this.deptId,
                            assistDeptIdList:assistDeptIdList
                        }
                        this.saveLoading = true;
                        if(this.type == 1){
                            parameter.empIdList = this.ids;
                            //移动
                            employeeMoveDept(parameter).then(res => {
                                if(!res){
                                  this.saveLoading = false;
                                }
                                if(res.code == "200"){
                                    this.$message.info('移动成功');
                                    this.$emit('moveSuccess');
                                }else {
                                    this.$message.error('移动失败');
                                }
                                this.saveLoading = false;
                            });
                        }
                        else if(this.type == 2){
                            parameter.empIdList = this.ids;
                            //分配
                            employeeAssignDept(parameter).then(res => {
                                if(!res){
                                  this.saveLoading = false;
                                }
                                if(res.code == "200"){
                                    this.$message.info('分配成功');
                                    this.$emit('moveSuccess');
                                }else {
                                    this.$message.error('分配失败');
                                }
                                this.saveLoading = false;
                            });
                        }
                        else if(this.type == 3){
                            parameter.empApplyIdList = this.ids;
                            parameter.roleId = values.roleId;
                            //批量审核
                            employeeApplyBatchPass(parameter).then(res => {
                                if(!res){
                                  this.saveLoading = false;
                                }
                                if(res.code == "200"){
                                    this.$message.info('审核通过成功');
                                    this.$emit('moveSuccess');
                                }else {
                                    this.$message.error('审核通过失败');
                                }
                                this.saveLoading = false;
                            });
                        }
                    }
                });
            }
        },
    };
</script>

<style scoped lang="less">
    .fromStyle {
        //分配移动部门的样式
        width: 480px;
        margin: 0 auto;
        .nameStyle{
          margin: 15px 0 18px 0;
        }
        /deep/ .ant-select-search__field__placeholder{
          left:0px;
        }
        /deep/ .ant-select-selection__rendered{
          margin-left: 0px !important;
        }
        .buttonStyle {
        float: right;
        margin-top: 48px;

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
          /deep/ .ant-btn-primary{
            border-color: #DDDDDD;
          }
        }
        .saveOption {
          float: right;
          margin-left: 20px;
        }
      }
        /deep/ .ant-select-selection__rendered{
          margin-left: 0px !important;
        }
        & /deep/ .ant-select-selection {
          border: none;
          border-bottom: 1px solid #ddd;
          box-shadow: none;
        }
        & /deep/ .ant-form-explain{
          position: absolute;
        }
        & /deep/ .ant-input {
          box-shadow: none;
        }
        /deep/ .ant-form-item{
          margin-bottom: 15px;
        }
        & /deep/ .ant-select-tree li .ant-select-tree-node-content-wrapper.ant-select-tree-node-selected{
          background:rgba(10,135,248,0.1);
        }
    }
</style>