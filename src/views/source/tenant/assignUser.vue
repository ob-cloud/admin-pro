<template>
    <div class="assignUserBox clearfix">
        <div class="assign-user-detail" v-if="loadingFlag&&(!deptList||deptList.length==0)">
            <label-item title="选择指派的员工" :must-fill="true" style="min-height: 180px">
                <dept-employee-tree ref="selectDeptEmp" :resMark="resMark" width="480px" @cancelOtherTree="cancelCityTownTree" @selectChange="selectDeptEmp"></dept-employee-tree>
            </label-item>
        </div>
        <div class="assign-user-detail selectDeptStyle" v-if="loadingFlag&&deptList.length>0" style="margin-bottom: 100px;">
          <label-item title="选择指派的员工" class="u-bottom-border" :must-fill="true">
            <a-select v-model="empId" :showSearch="true" :filterOption="(inputValue,option)=>filterOption(inputValue,option)" :allowClear="true" style="width:100%" placeholder="请选择">
              <a-select-option v-for="(item) in userList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
            </a-select>
          </label-item>
        </div>
        <div class="buttonDiv f-fr">
            <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelAssignUser">
                取消
            </a-button>
            <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="assignUser" :loading="saveLoading">
                保存
            </a-button>
        </div>
    </div>
</template>

<script>
    import deptEmployeeTree from "@/components/DeptEmployeeTree/index";
    import  * as API from '@/api/source';
    import {listSimpleByDeptIds} from '@/api/set';
    import  {moduleFieldConfigGet} from '@/api/decision';
    import { CURRENTDEPTID } from '@/store/mutation-types';
    export default {
        name: "assignUser",
        props: {
            sourceId:{
                type: String,
                required:true,
            },
            clueType:{
                type: Number,
                default: 1,
            },
            resMark:{
                type: String,
                default: '',
            }
        },
        components: {
            deptEmployeeTree,
        },
        data() {
            return {
                size: 'default',
                empId:undefined,
                empName:'',
                saveLoading:false,
              loadingFlag:false,
              deptList:[],
              userList:[],
            }
        },
      created() {
          this.getConfigData();
      },
      methods: {
        //来自自定义搜索
        filterOption(inputValue,option){
          if(!inputValue){
            return true;
          }
          return option.componentOptions.children[0].text.indexOf(inputValue) > -1;
        },
        listSimpleByDeptIds(){
          let idList = [];
          this.deptList.forEach((item)=>{
            idList.push(item.value)
          });
          listSimpleByDeptIds({idList:idList}).then(res=>{
            if (res.code === '200') {
              this.userList = res.data;
            }
          });
        },
        getConfigData(){
          let parameter = {
            features:'default',
            moduleMark:'crm.renterClueDept',
            deptId:this.$ls.get(CURRENTDEPTID),
          };
          moduleFieldConfigGet(parameter).then(res => {
            if (res.code === '200') {
              if(res&&res.data&&res.data.fieldsObj){
                this.deptList = res.data.fieldsObj.deptList;
              }
              else{
                this.deptList = [];
              }
              if(this.deptList&&this.deptList.length>0){
                this.listSimpleByDeptIds();
              }
              this.loadingFlag = true;
            }
          });
        },
            handleChange(value) {
                console.log(`Selected: ${value}`);
            },
            popupScroll() {
                console.log('popupScroll');
            },
            cancelCityTownTree() {
                if (this.$refs.selectCityTown) {
                    this.$refs.selectCityTown.showTree = false
                }
            },
            selectDeptEmp(selectObj) {
                if (selectObj.type == 'employee') {
                    this.empId = selectObj.id;
                    this.empName = selectObj.name;
                }
            },
            cancelAssignUser(){
                this.$emit('cancelAssignUser');
            },
            renterClueAssigned(){
                API.renterClueAssigned(this.empId,this.sourceId).then(res=>{
                    if(!res){
                        this.saveLoading = false;
                    }
                    if (res.code === '200') {
                        this.$message.success('指派成功');
                    } else {
                        this.$message.success('指派失败');
                    }
                    this.saveLoading = false;
                    this.$emit('successAssignUser');
                })
            },
            reservationAssigned(){
                let data ={
                    empId:this.empId,
                    id:this.sourceId
                };
                API.reservationAssigned(data).then(res=>{
                    if(!res){
                        this.saveLoading = false;
                    }
                    if (res.code === '200') {
                        this.$message.success('指派成功');
                    } else {
                        this.$message.success('指派失败');
                    }
                    this.saveLoading = false;
                    this.$emit('successAssignUser');
                })
            },
            assignUser(){
                if(!this.empId){
                    this.$message.error('请选择指派人');
                    return true;
                }
                this.saveLoading = true;
                if(this.clueType==1||this.clueType==2){
                    API.renterClueAssignedLimitCheck(this.empId,this.sourceId).then(res=>{
                        if (res.code === '200') {
                            if(res.data.result==1){
                                this.renterClueAssigned();
                            }
                            else if(res.data.result==2){
                                let _this = this;
                                let temp = res.data;
                                this.$modal.confirm({
                                    title: _this.empName+"在"+ temp.ruleLimitTime+"分钟内接收的线索已经有"+temp.currentClueTotal+"个及以上了，确定还要指派给他吗？",
                                    content: '',
                                    okText: '确定',
                                    cancelText: '返回修改',
                                    onOk() {
                                        _this.renterClueAssigned();
                                    },
                                    onCancel() {
                                        _this.saveLoading = false;
                                    },
                                });
                            }
                        }
                    })
                }
                else if(this.clueType==3){
                    API.renterClueAssignedLimitCheck(this.empId,this.sourceId).then(res=>{
                        if (res.code === '200') {
                            if(res.data.result==1){
                                this.reservationAssigned();
                            }
                            else if(res.data.result==2){
                                let _this = this;
                                let temp = res.data;
                                this.$modal.confirm({
                                    title: _this.empName+"在"+ temp.ruleLimitTime+"分钟内接收的线索已经有"+temp.currentClueTotal+"个及以上了，确定还要指派给他吗？",
                                    content: '',
                                    okText: '确定',
                                    cancelText: '返回修改',
                                    onOk() {
                                        _this.reservationAssigned();
                                    },
                                    onCancel() {
                                        _this.saveLoading = false;
                                    },
                                });
                            }
                        }
                    })
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .assignUserBox{
        position:relative;
        .assign-user-detail {
            margin:20px 20px 0 20px;
            /deep/ .tree-wrap .tree{
                position: static!important
            }
        }
      .selectDeptStyle{
        /deep/ .ant-select-selection__rendered{
          margin-left: 0px;
        }
      }
        .buttonDiv {
            margin-right: 20px;
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
