<template>
  <div class="status">
    <div class="project" v-if="projectList == undefined || projectList.length <= 0">
      <span class="projectName f-fl" style="margin-left: 20px;">暂无项目</span>
      <span class="delete f-fl"></span>
    </div>
    <div class="project" v-if="projectList !==undefined && projectList.length > 0">
      <div class="projectName f-fl u-no-border">
        <a-select v-model="currentBuildingProjectId" :showSearch="true" :filterOption="(inputValue,option)=>filterOption(inputValue,option)" :allowClear="projectList.length>1?true:false" @change="selectProject" placeholder="全部">
          <a-select-option :value="item.id" :key="item.id" v-for="(item) in projectList"><div class="itemName overHidde">{{ item.name }}</div></a-select-option>
        </a-select>
      </div>
      <div class="edit f-fl cursor" @click="editBuildingProject" v-if="currentBuildingProjectId" v-mark="['mk_house_centralized_bjxm']"><icon-font type="iconyumengtubiao_bianji-" /></div>
      <div class="edit f-fl" v-else v-mark="['mk_house_centralized_bjxm']"><icon-font style="color: #BBBBBB;" type="iconyumengtubiao_bianji-" /></div>
      <div class="delete  f-fl cursor" @click="removeBuildingProject" v-if="currentBuildingProjectId" v-mark="['mk_house_centralized_scxm']"><icon-font type="iconyumengtubiao_shanchu-" /></div>
      <div class="delete f-fl" v-else v-mark="['mk_house_centralized_scxm']"><icon-font style="color: #BBBBBB;" type="iconyumengtubiao_shanchu-" /></div>
    </div>
    <p :class="{ active: currentActiveIndex === index ,specilLine: item.line}" v-for="(item,index) in statusData" :key="index" @click="changeStatus(item,index)">
      <span :class="{leftLine: item.line}">{{ item.title }}</span>
      <span :style="{ color: item.color }">({{ item.status }})</span>
    </p>
  </div>
</template>

<script>
import  * as API from '@/api/centralizedHouse';
export default {
  name: "topStatus",
  props: {
    statusData: {
      type: Array
    },
    activeIndex: {
      type: Number,
      default: 0,
    }
  },
  data(){
    return {
      currentActiveIndex: 0,
      currentBuildingProjectId:undefined,
      projectList:[],
    }
  },
  created(){
    this.currentActiveIndex = this.activeIndex
    this.listBuildingProject();
  },
  methods: {
    //来自自定义搜索
    filterOption(inputValue,option){
      if(!inputValue){
        return true;
      }
      let flag = false;
      this.projectList.forEach((item)=>{
        if(option.key === item.id&&item.name.indexOf(inputValue)>-1){
          flag = true;
        }
      });
      return flag;
    },
    listBuildingProject(val){
      if(val){
        this.currentBuildingProjectId = val;
      }
      API.listBuildingProject().then(res => {
        // console.log(res)
        if (res.code === '200') {
          this.projectList = res.data;
          if(this.projectList.length>1){
            let obj ={
              id:'',
              name:'全部'
            };
            this.projectList.splice(0,0,obj);
          }
          else if(this.projectList.length == 1){
            this.currentBuildingProjectId = this.projectList[0].id;
            this.currentBuildingProjectName = this.projectList[0].name;
            let obj ={
              key:this.currentBuildingProjectId,
              label:this.currentBuildingProjectName
            };
            if(!val){
              this.$emit('changeProject', obj);
            }
          }
        }
      })
    },
    changeStatus(status,index) {
      this.$emit('changeStatus', status);
      this.currentActiveIndex = index;
    },
    selectProject(value){
      if(value){
        this.currentBuildingProjectId = value;
        for (let i = 0; i < this.projectList.length; i++) {
          if(this.currentBuildingProjectId == this.projectList[i].id){
            this.currentBuildingProjectName = this.projectList[i].name;
          }
        }
        let obj ={
          key:value,
          label:this.currentBuildingProjectName
        };
        this.$emit('changeProject', obj);
      }
      else{
        this.currentBuildingProjectId = undefined;
        let obj = {key:"",label:''};
        this.$emit('changeProject', obj);
      }
    },
    removeBuildingProject(){
      let that = this;
      this.$modal.confirm({
        title: '确认删除 「'+that.currentBuildingProjectName+ '」吗？',
        content: '删除后将不可恢复',
        width:"433px",
        height:"192px",
        okText: '确认',
        cancelText: '取消',
        icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
          onOk() {
        API.removeBuildingProject(that.currentBuildingProjectId).then(res => {
          // console.log(res)
          if (res.code == "200") {
            that.currentBuildingProjectId = '';
            that.$message.info('删除成功');
            that.$emit('removeRefreshPage');
          } else {
            that.$message.error('删除失败');
          }
        })
      },
      onCancel() {
      },
    });
    },
    editBuildingProject(){
      this.$emit('editHouse');
    },
  }
}
</script>

<style scoped lang="less">
.status {
  display: flex;
  .active {
    color: #0A87F8;
    border-bottom: 2px solid #0A87F8;
  }
  .project{
    min-width : 200px;
    .projectName{
      min-width: 150px;
      .itemName{
        max-width: 150px;
        color:#111111;
        font-weight: 500;
        font-size: 14px;
      }
      & /deep/ .ant-select{
        width: 150px;
      }
      /deep/ .ant-select-selection__placeholder{
        color: #111111;
      }
    }
    .edit{
      margin-left: 14px;
    }
    .delete{
      padding-right: 20px;
      margin-left: 14px;
      margin-top: 16px;
      height: 19px;
      line-height: 19px;
      border-right: 1px dashed #dddddd;
      margin-right: 20px;
    }
  }
  &>p {
    box-sizing: border-box;
    margin-right: 20px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    .leftLine{
      position: relative;
    }
    .leftLine::before {
      content: "";
      position: absolute;
      top: 2px;
      left: -20px;
      height: 14px;
      width: 1px;
      border-left: 1px dashed #dddddd;
    }
  }
  .specilLine{
    margin-left: 20px;
  }
}
</style>