<template>
    <div class="userInfoItem" style="max-height: calc(100vh - 100px);overflow: auto">
        <div :class="fromStyle">
            <div v-if="type!=3" class="firstLine">
                <label-item class="nameLine clearfix" title="">
                    <div class="urseImg f-fl">{{nameJc}}</div>
                    <span class="name f-fl">
                        {{name}}
                    </span>
                    <span class="statusFont">账号状态：</span>
                    <span class="normalStatus" v-if="isLock==0">正常</span>
                    <span class="prohibitStatus" v-if="isLock==1">已禁用</span>
                </label-item>
                <div class="operation" v-if="infoStatus">
                    <span @click="editUser" class="cursor" v-if="isAdmin!=1" v-show="permissionList.indexOf('5')>-1&&isLock==0">
                        <icon-font type="iconyumengtubiao_bianji-1"/>
                        编辑
                    </span>
                    <!-- <a-divider type="vertical"/> -->
                    <span @click="prohibitUser" class="prohibitUser cursor" v-if="isAdmin!=1&&isLock==0" v-show="permissionList.indexOf('7')>-1">
                         <icon-font type="iconyumengtubiao_jinyong"/>
                        禁用账号
                    </span>
                    <span @click="enableUser" class="prohibitUser cursor" v-if="isAdmin!=1&&isLock==1" v-show="permissionList.indexOf('8')>-1">
                         <icon-font type="iconyumengtubiao_jinyong"/>
                        启用账号
                    </span>
                </div>
            </div>
            <a-form :form="form" :layout="formLayout">
                <div class="formTop">
                </div>
                <div>
                    <a-form-item :class="type==1?'u-no-border':'u-bottom-border'">
                        <label-item title="员工编号" class="userLabel" :skeletonLoading="skeletonLoading">
                            <a-input placeholder="输入员工编号" :disabled="infoStatus"
                                     v-decorator="['empNo']"
                            />
                        </label-item>
                    </a-form-item>
                </div>
                <div>
                    <a-form-item class="userNameStyle" :class="type==1||type==3?'u-no-border':'u-bottom-border'">
                        <label-item title="员工姓名" :mustFill="true"  class="userLabel" :skeletonLoading="skeletonLoading">
                            <a-input class="f-fl" style="width: calc(100% - 100px)" placeholder="输入员工姓名" :disabled="infoNameStatus"
                                     v-decorator="['name', { rules: [{ required: true,message: '请输入员工姓名', trigger: 'blur' }] }]"
                            />
                            <a-select class="f-fl" style="width: 100px;" :style="type==3?'border-bottom: 1px solid #DDDDDD;':''" :class="infoStatus?'unIconStyle':''" v-model="empTypeId" placeholder="请选择" :disabled="infoStatus">
                              <a-select-option v-for="(item) in empTypeList" :key="item.id">
                                {{ item.name }}
                              </a-select-option>
                            </a-select>
                            <div style="position: absolute;height: 16px;width: 1px;background: #E8E8E8;bottom:-29px;right: 110px;" v-if="type==1||type==2"></div>
                        </label-item>
                    </a-form-item>
                </div>
                <div>
                    <a-form-item :class="type==1||type==3?'u-no-border':'u-bottom-border'">
                        <label-item title="员工电话(登录手机号)"  class="userLabel" :skeletonLoading="skeletonLoading">
                            <a-input placeholder="输入员工电话" :disabled="true" :maxlength="11"
                                     v-decorator="['phone', { rules: [{ required: true,message: '请输入员工电话', trigger: 'blur' }] }]"
                            />
                        </label-item>
                    </a-form-item>
                </div>
                <div v-if="!infoStatus">
                    <a-form-item class="u-no-border">
                        <div class="formItemDept" :style="type==2||type==3?'border-bottom: 1px solid #ddd;':'border-bottom: 0px solid #ddd;'">
                            <div class="deptInfo" v-if="type==2">
                              <label-item title="直属部门" :mustFill="true" class="userLabel">
                                <a-tree-select labelInValue show-search
                                               placeholder="选择直属部门"
                                               style="width: 100%" :value="deptOneValue"
                                               :treeData="treeData"
                                               v-if="treeData.length"
                                               :treeDefaultExpandedKeys="[treeData[0].key]"
                                               treeNodeFilterProp="title"
                                               @change="onChange">
                                </a-tree-select>
                              </label-item>
                            </div>
                            <div class="deptInfo" v-if="type==3">
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
                                <a-checkbox v-model="isLeader" :disabled="infoStatus">本部门领导</a-checkbox>
                            </div>
                        </div>
                    </a-form-item>
                </div>
                <div v-if="infoStatus" style="margin-bottom: 23px;">
                  <div class="formItemDept" style="border-bottom: 0px solid #ddd;">
                    <div class="deptInfo" style="width: 100%">
                      <label-item title="直属部门" :mustFill="true" class="userLabel">
                        <div style="width: 100%;background: #f5f5f5;height: 30px;line-height: 30px;color: #111111;">{{deptName?deptName:'-'}}</div>
                      </label-item>
                    </div>
                    <div class="isLeader">
                      <a-checkbox v-model="isLeader" :disabled="infoStatus">本部门领导</a-checkbox>
                    </div>
                  </div>
                </div>
                <div v-if="!infoStatus">
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
                <div v-if="infoStatus" style="margin-bottom: 23px;">
                  <div class="formItemDept" style="border-bottom: 0px solid #ddd;">
                    <div class="deptInfo" style="width: 100%;">
                      <label-item title="兼职部门（可选）" class="userLabel">
                        <div style="width: 100%;background: #f5f5f5;line-height: 30px;color: #111111;">{{deptNameList&&deptNameList.length>0?deptNameList.join('、'):'-'}}</div>
                      </label-item>
                    </div>
                  </div>
                </div>
                <div>
                    <a-form-item :class="type==1?'u-no-border':'u-bottom-border'">
                        <label-item title="角色" :mustFill="true" :class="infoStatus?'unIconStyle':''"  class="userLabel roleStyle" :skeletonLoading="skeletonLoading">
                            <a-input v-model="roleName" :disabled="true" v-if="isAdmin==1"/>
                            <set-role v-show="isAdmin==0" ref="setRoleChild" @getSelectRoleId="getMsgFromRole" :infoStatus="infoStatus"
                                      v-decorator="[ 'roleId',{ rules: [{ required: true, message: '选择所属角色' }]  } ]">
                            </set-role>
                        </label-item>
                    </a-form-item>
                </div>
                <div>
                    <a-form-item :class="type==1?'u-no-border':'u-bottom-border'">
                        <div class="userInfo">
                            <label-item title="员工身份证号" class="idCardNo userLabel" :skeletonLoading="skeletonLoading">
                                <a-input placeholder="输入身份证号" v-decorator="['idCardNo']" :disabled="infoStatus"/>
                            </label-item>
                            <div class="gender">
                                <a-radio-group name="radioGroup" v-model="gender" :disabled="infoStatus">
                                    <a-radio :value="1">男</a-radio>
                                    <a-radio :value="2">女</a-radio>
                                </a-radio-group>
                            </div>
                        </div>
                    </a-form-item>
                </div>
                <div class="buttonDiv">
                    <div v-if="!infoStatus">
                        <a-button size="large" @click="closeForm" class="formItemMarginButton cancelFont">
                            取消
                        </a-button>
                        <a-button size="large" @click="employeeUpdate" :loading="saveLoading" type="primary" class="formItemMarginButton saveFont">
                            保存
                        </a-button>
                    </div>
                </div>
            </a-form>
        </div>
      <!--  员工禁用 -->
      <a-modal destroyOnClose centered width="520px" :maskClosable="false" v-model="userDisabledDialog" title="禁用员工"
               :footer="null" class="ownModalBorder titDialog" @cancel="userDisabledDialog=false;">
        <user-disable :userRecord="userRecord" :currentUserId="currentUserId" @cancelDisable="userDisabledDialog=false;" @successDisable="successDisable()"></user-disable>
      </a-modal>
    </div>
</template>

<script>
import {employeeViewInfo, employeeLockEmp, employeeUpdate, employeeApplyPass, getDeptTree} from '@/api/set';

import setRole from '../role/setRole';
import UserDisable from './userDisable';
import {listEnableDict} from "@/api/contract";

export default {
    name: "userInfo",
    data() {
        return {
            formLayout: 'vertical',
            form: this.$form.createForm(this, {name: 'coordinated'}),
            infoStatus: true,   //是否可编辑，false可以编辑：修改；false不可以
            infoNameStatus:true, //单独控制名字是否可编辑
            isLeader: false,    //是否领导
            gender: 0,          //性别
            name: "",           //用来存放姓名，禁用提示
            phone:"",           //用来存放电话，禁用提示
            isLock: 0,          //是否锁定
            empId:"",           //员工id
            type:1,             //来自1、查看；2、编辑；3、审核
            fromStyle:"fromStyle", //样式
            isAdmin:0,            //是否管理员
            roleName:'',          //超级管理员
            nameJc:'',
            skeletonLoading:false,
            saveLoading:false,
            deptId:undefined,
            deptName:'',
            deptOneValue:'',
            deptValue:undefined,
            deptNameList:[],
            treeData:[],
            permissionList:[],
            empTypeList:[],
            empTypeId:undefined,
            userDisabledDialog:false,
            userRecord:{},
        }
    },
    components: {
      setRole,
      UserDisable,
    },
    props: {
      userId:{
        type:String,
      },
      currentUserId:{
        type:String,
      },
      viewUserType:{
        type:Number,
      },
      viewUserPassInfo:{
        type:Object,
      },
    },
  created() {
      this.type = this.viewUserType;
      if(this.viewUserType ==1 ){
        this.infoStatus = true;
        this.infoNameStatus = true;
        this.employeeViewInfo(this.userId);
        this.fromStyle="fromStyle";
      }
      if(this.viewUserType ==2 ){
        this.infoStatus = false;  //是否可查看
        this.infoNameStatus = false;
        this.employeeViewInfo(this.userId);
        this.fromStyle="fromStyle";
      }
      if(this.viewUserType ==3){
        this.infoStatus = false;
        this.infoNameStatus = true;
        this.$nextTick(() => {
          this.form.setFieldsValue({
            name: this.viewUserPassInfo.name,
            phone: this.viewUserPassInfo.phone,
            idCardNo:this.viewUserPassInfo.idCardNo,
          });
        });
        this.gender = this.viewUserPassInfo.gender;
        this.empId = this.viewUserPassInfo.empId;
        this.fromStyle="verifyUserStyle";
        this.getEmpTypeList();
      }
      this.getDeptTree();
      this.initPermission();
  },
  methods: {
    getEmpTypeList(){
      let id = '29ad979b026c437f951a29af0332f2c3';
      // 品牌
      listEnableDict(id).then(res => {
        if (res.code == 200) {
          this.empTypeList = res.data;
          this.empTypeList.forEach((item)=>{
            if(!this.empTypeId&&item.name == '员工'){
              this.empTypeId = item.id;
            }
          });
        }
      })
    },
    initPermission(){
      //支援权限集合：1、添加部门；2、编辑部门；3、删除部门；4、添加员工；5、编辑员工；6、移动部门；7、禁用员工；8、启用员工；9、删除员工；10、驳回；11、通过；12、分配部门
      this.permissionList = [];
      let permissions = JSON.parse(sessionStorage.getItem('permissions'));
      let markArr = [];
      let btnArr = [];
      markArr.push('mk_set_user_tjbm');
      markArr.push('mk_set_user_bjbm');
      markArr.push('mk_set_user_scbm');
      markArr.push('mk_set_user_tjyg');
      markArr.push('mk_set_user_bjyg');
      markArr.push('mk_set_user_ydbm');
      markArr.push('mk_set_user_jyyg');
      markArr.push('mk_set_user_qyyg');
      markArr.push('mk_set_user_scyg');
      markArr.push('mk_set_user_bhyg');
      markArr.push('mk_set_user_tgyg');
      markArr.push('mk_set_user_fpbm');
      //判断资源权限
      markArr.forEach(ele => {
        permissions.some(function(value){
          if (ele == value.mark){
            if(value.mark == 'mk_set_user_tjbm'){
              btnArr.push('1');
            }else if(value.mark == 'mk_set_user_bjbm'){
              btnArr.push('2');
            }else if(value.mark == 'mk_set_user_scbm'){
              btnArr.push('3');
            }else if(value.mark == 'mk_set_user_tjyg'){
              btnArr.push('4');
            }else if(value.mark == 'mk_set_user_bjyg'){
              btnArr.push('5');
            }else if(value.mark == 'mk_set_user_ydbm'){
              btnArr.push('6');
            }else if(value.mark == 'mk_set_user_jyyg'){
              btnArr.push('7');
            }else if(value.mark == 'mk_set_user_qyyg'){
              btnArr.push('8');
            }else if(value.mark == 'mk_set_user_scyg'){
              btnArr.push('9');
            }else if(value.mark == 'mk_set_user_bhyg'){
              btnArr.push('10');
            }else if(value.mark == 'mk_set_user_tgyg'){
              btnArr.push('11');
            }else if(value.mark == 'mk_set_user_fpbm'){
              btnArr.push('12');
            }
            return true;
          }
        });

      });

      this.permissionList = btnArr;
    },
    onChange_deptValue(value){
      this.deptValue = value;
    },
    onChange(value){
      this.deptId = value.value;
      this.deptOneValue =value;
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
        closeForm() {
            if(this.type==3){
              this.$emit('cancelPassUser');
            }
            else{
              this.infoStatus = true;
              this.infoNameStatus = true;
              this.type = 1;
            }
        },
        editUser() {
            this.title = "编辑员工";
            this.infoStatus = false;
            this.infoNameStatus = false;
            this.type = 2;
            if(!this.deptId){
              this.deptOneValue = undefined;
            }
        },
        prohibitUser() {
            this.userDisabledDialog = true;
        },
        enableUser(){
            let that = this;
            this.$modal.confirm({
                title: '确定要启用员工 「' + this.name +'/'+ this.phone + '」 吗？',
                content: '启用后该员工可正常登录本系统',
                width:"433px",
                height:"192px",
                okText: '确认',
                cancelText: '取消',
                icon: () => <icon-font type="iconyumengtubiao_chenggong" style="color:green" />,
                onOk() {
                    that.employeeLockEmp(that.empId, 0);
                },
                onCancel() {
                },
            });
        },
        //**********与api相关方法********//
        employeeLockEmp(id, lockedOrNot) {
            //锁定、解锁
            let parameter = {
                id: id,
                lockedOrNot: lockedOrNot,
            };
            employeeLockEmp(parameter).then(res => {
                if(lockedOrNot == 0){
                    if (res.code == "200") {
                        this.$emit('refreshinfoFun',true);
                        this.$message.info('启用成功');
                        this.employeeViewInfo(this.userId,true);
                    } else {
                        this.$message.info('启用失败');
                    }
                }
            });
        },
        employeeUpdate(){
            if(this.empId == ""){
                return;
            }
            if(this.type == 1 || this.type == 2) {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        values.isLeader = this.isLeader ? 1 : 0;
                        values.gender = this.gender;
                        values.empId = this.empId;
                        values.isLeader = values.isLeader ? 1 : 0;
                        let assistDeptIdList = [];
                        values.deptId = this.deptId;
                        values.empTypeId = this.empTypeId;
                        if(this.deptValue&&this.deptValue.length>0){
                          this.deptValue.forEach((item)=>{
                            if(item.value!=this.deptId){
                              assistDeptIdList.push(item.value);
                            }
                          });
                        }
                        values.assistDeptIdList = assistDeptIdList;
                        //修改员工
                        this.saveLoading = true;
                        employeeUpdate(values).then(res => {
                            if(!res){
                              this.saveLoading = false;
                            }
                            if (res.code == "200") {
                                this.$message.info('修改成功');
                                this.$emit('editSuccess');
                            } else {
                                this.$message.info('修改失败');
                            }
                            this.saveLoading = false;
                        });
                    }
                });
            }
            if(this.type == 3) {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        values.isLeader = this.isLeader ? 1 : 0;
                        values.gender = this.gender;
                        values.id = this.empId;
                        values.isLeader = values.isLeader ? 1 : 0;
                        let assistDeptIdList = [];
                        values.deptId = this.deptId;
                        values.empTypeId = this.empTypeId;
                        if(this.deptValue&&this.deptValue.length>0){
                          this.deptValue.forEach((item)=>{
                            if(item.value!=this.deptId){
                              assistDeptIdList.push(item.value);
                            }
                          });
                        }
                        values.assistDeptIdList = assistDeptIdList;
                        //审核员工
                        this.saveLoading = true;
                        employeeApplyPass(values).then(res => {
                            if(!res){
                              this.saveLoading = false;
                            }
                            if (res.code == "200") {
                                this.$message.info('审核成功');
                                this.$emit('editSuccess');
                            } else {
                                this.$message.error('审核失败');
                            }
                            this.saveLoading = false;
                        });
                    }
                });
            }
        },
        successDisable(){
          this.userDisabledDialog=false;
          this.$emit('refreshinfoFun',true);
          this.initData();
        },
        initData(){
          this.employeeViewInfo(this.userId,true);
        },
        employeeViewInfo(empId,val) {
            //val代表来自启用禁用(局部刷新)
            this.skeletonLoading = true;
            if (empId == "") {
                this.$message.info("无效数据");
            }
            employeeViewInfo(empId).then(res => {
                if (res.code == "200") {
                  this.userRecord = res.data;
                  this.userRecord.id = this.userRecord.empId;
                    //解析取出deptId、deptName
                  if(!val) { //启用禁用只刷新部分数据
                    let empDeptList = res.data.empDeptList;
                    let empDeptOtherList = [];
                    let deptNameList = [];
                    empDeptList.forEach((item) => {
                      if (item.isMainDept == 1) {
                        this.deptId = item.deptId;
                        this.deptOneValue = {
                          value: item.deptId,
                          label: item.deptName,
                        }
                        this.deptName = item.deptName;
                      } else {
                        let obj = {
                          value: item.deptId,
                          label: item.deptName,
                        };
                        empDeptOtherList.push(obj);
                        deptNameList.push(item.deptName);
                      }
                    });
                    this.deptValue = empDeptOtherList;
                    this.deptNameList = deptNameList;
                    this.form.setFieldsValue({
                      empNo: res.data.empNo,
                      name: res.data.name,
                      phone: res.data.phone,
                      idCardNo: res.data.idCardNo,
                      roleId: res.data.roleId,
                    });
                    this.isAdmin = res.data.isAdmin;
                    this.roleName = res.data.roleName;
                    this.empId = res.data.empId;
                    this.name = res.data.name;
                    this.empTypeId = res.data.empTypeId;
                    this.phone = res.data.phone;
                    this.gender = res.data.gender;
                    this.isLock = res.data.isLocked;
                    this.isLeader = res.data.isLeader == 1 ? true : false;

                    if (/^[a-zA-Z]*$/.test(this.name)) {
                      this.nameJc = this.name.substr(0, 1);
                    } else {
                      this.nameJc = this.name.substring(this.name.length - 2);
                    }
                    setTimeout(() => {
                      this.$refs.setRoleChild && this.$refs.setRoleChild.initRoleName(res.data.roleId);
                    }, 100)
                  }
                  else{
                    this.isLock = res.data.isLocked;
                    setTimeout(()=>{
                      this.form.setFieldsValue({
                        empNo: res.data.empNo,
                        name: res.data.name,
                        phone: res.data.phone,
                        idCardNo: res.data.idCardNo,
                        roleId: res.data.roleId,
                      });
                      this.$refs.setRoleChild && this.$refs.setRoleChild.initRoleName(res.data.roleId);
                    },100)
                  }
                  this.getEmpTypeList();
                }
                this.skeletonLoading = false;
            });
        }
    },
};
</script>

<style scoped lang="less">
    /deep/ .ant-select-search__field__placeholder{
      left: 0px;
    }
    & /deep/ .ant-select-tree li .ant-select-tree-node-content-wrapper.ant-select-tree-node-selected{
      background:rgba(10,135,248,0.1);
    }
    .fromStyle {
        width: 100%;
        height: 100%;
        // margin: 0 auto;
        padding: 0 20px;
    }
    .verifyUserStyle {
        width: 480px;
        margin: 0 auto;
    }
    .firstLine {
        width: 100%;
        height: 80px;
        line-height: 80px;
        .nameLine {
            width: 60%;
            float: left;
            height: 80px;
            line-height: 80px;
            .urseImg{
                font-size:12px;
                height: 40px;
                width:40px;
                border-radius: 50%;
                background:rgba(10,135,248,1);
                color: #ffffff;
                line-height: 40px;
                text-align: center;
                margin-top: 20px;
            }
            .name {
                margin-left: 10px;
                margin-right: 10px;
                color:#111111;
                font-size: 16px;
                font-weight: 500;
            }
            .statusFont{
                font-size: 12px;
                font-weight: 400;
                color: rgba(119,119,119,1);
            }

            .normalStatus {
                font-size: 12px;
                color: #3DB302;
            }

            .prohibitStatus {
                color: #111111;
            }
        }

        .operation {
            float: right;
            color: #0A87F8;
            .prohibitUser{
                margin-left: 20px;
            }
        }
    }
    .formTop {
        margin-top: 10px;
    }
    .formItemDept {
        height: 63px;
        position:relative;
        .deptInfo {
            width: 70%;
            float: left;
            margin-top: -6px;
        }
        .isLeader {
            position: absolute;
            top:35px;
            right:0px;
        }
    }
    .userInfo {
        position:relative;
        .gender {
            position: absolute;
            top:35px;
            right:0px;
        }
    }
    .buttonDiv {
        height: 75px;
        margin-left: 200px;
        .formItemMarginButton {
            width: 120px;
            height: 40px;
            margin-left: 18px;
            margin-top: 15px;
        }
        .formItemCloseButton{
            width: 120px;
            height: 40px;
            margin-left: 160px;
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
    .userLabel{
        & /deep/ .title{
          margin-bottom: 6px;
        }
        & /deep/ .ant-input{
          padding-left:0px;
        }
        & /deep/ .ant-select-selection__rendered{
           margin-left:0px;
        }
    }
    .userInfoBox{
        .userInfoItem{
          .roleStyle{
            /deep/ .title{
              margin-top: 1px !important;
            }
          }
          & /deep/ .ant-form-item{
            margin-bottom: 12px;
          }
          & /deep/ .ant-form-explain{
            position: absolute;
          }
          /deep/ .ant-input{
            color: #111111;
          }
          /deep/ .ant-input-disabled{
            background-color: #F6F7F8;
          }
          /deep/ .ant-select{
            color: #111111;
          }
          /deep/ .ant-select-disabled{
            color: #111111;
          }
          /deep/ .ant-checkbox{
            color: #111111;
          }
          /deep/ .ant-checkbox-disabled + span{
            color: #111111;
          }
          /deep/ .ant-radio-wrapper{
            color: #111111;
          }
          /deep/ .ant-radio-disabled + span{
            color: #111111;
          }
          .unIconStyle{
            /deep/ i{
              display: none;
            }
          }
          .userNameStyle{
            /deep/ .ant-select-selection__rendered{
              margin-right: 0;
              margin-left: 10px;
            }
          }
        }
    }
</style>