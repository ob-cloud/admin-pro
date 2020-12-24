<template>
  <div class="addWarehouse-box">
    <div style="margin-top: 10px;">
      <label-item class="u-bottom-border" title="库房名称" :must-fill="true" :maxSize="15" :valLength="sendData.name.length">
        <a-input placeholder="请输入" v-model="sendData.name" maxlength="15"></a-input>
      </label-item>
    </div>
    <div class="clearfix addressStyle">
      <label-item class="u-bottom-border" title="详细地址" :maxSize="50" :valLength="sendData.address.length">
        <city-town-tree class="f-fl" style="width: 140px;" ref="selectCityTown" :showTown="false" placeholder="所在城市/区域"
                        @selectChange="selectCityTownChange($event)">
        </city-town-tree>
        <a-input class="f-fl" style="width: calc(100% - 140px)" placeholder="请输入" v-model="sendData.address" maxlength="50"></a-input>
      </label-item>
    </div>
    <div class="clearfix" style="margin-top: 19px;">
      <div class="f-fl" style="margin-right: 30px;width: 225px;">
        <label-item class="u-bottom-border" title="负责人姓名">
          <a-input placeholder="请输入" v-model="sendData.maintainerName" maxlength="15"></a-input>
        </label-item>
      </div>
      <div class="f-fl" style="width: 225px;">
        <label-item class="u-bottom-border" title="负责人电话">
          <a-input placeholder="请输入" v-model="sendData.maintainerPhone" maxlength="15"></a-input>
        </label-item>
      </div>
    </div>
    <div class="clearfix" style="width: 100%;padding:120px 0px 20px 0;">
      <div class="buttonDiv f-fr">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="addWarehouse">
          保存
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import CityTownTree from '@/components/CityTownTree/customer'
import * as API from "@/api/assets";
export default {
  name: "addWareHouse",
  components: {
    CityTownTree,
  },
  data() {
    return {
      sendData:{
        name:'',
        cityId:'',
        cityName:'',
        areaId:'',
        areaName:'',
        address:'',
        maintainerName:'',
        maintainerPhone:'',
      },
      saveLoading:false,
    }
  },
  created() {
  },
  methods: {
    addWarehouse(){
      if(!this.sendData.name){
        this.$message.warning('请输入库房名称!');
        return ;
      }
      if (this.sendData.maintainerPhone&&!/^0?(13|14|15|16|17|18|19)[0-9]{9}$/.test(this.sendData.maintainerPhone)) {
        this.$message.warning('手机号码输入错误');
        return;
      }
      this.saveLoading = true;
      API.warehouseSave(this.sendData).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.$message.success('库房添加成功');
          this.saveLoading = false;
          this.$emit('addSuccess');
        }
        else{
          this.$message.error('库房添加失败');
          this.saveLoading = false;
        }
      });
    },
    cancelSave(){
      this.$emit('cancelSave');
    },
    selectCityTownChange(selectObj) {
      this.sendData.cityId = selectObj.cityId;
      this.sendData.cityName = selectObj.cityName;
      this.sendData.areaId = selectObj.areaId;
      this.sendData.areaName = selectObj.areaName;
    },
  },
  filters: {
  },
}
</script>

<style scoped lang="less">
.addWarehouse-box{
  margin: 20px 20px 0 20px;
  .addressStyle{
    padding-top: 19px;
    /deep/ .tree{
      width: 300px;
      top: 33px !important;
    }
    /deep/ .tree-wrap{
      margin-bottom:  0px;
    }
    /deep/ .label-item .max-size{
      bottom: -24px !important;
    }
  }
  .buttonDiv {
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
}
</style>