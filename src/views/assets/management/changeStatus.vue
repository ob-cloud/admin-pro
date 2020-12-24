<template>
  <div class="changeStatus-box">
    <div class="line1Style clearfix">
      <div class="bigTitleStyle f-fl">修改状态</div>
      <div class="f-fl" style="margin-left: 20px;">
        <a-radio-group name="radioGroup" v-model="status" @change="changeStatus">
          <a-radio :value="1">
            <span :class="status==1?'color1':'color2'">闲置</span>
          </a-radio>
          <a-radio :value="2">
            <span :class="status==2?'color1':'color2'">使用中</span>
          </a-radio>
        </a-radio-group>
      </div>
    </div>
    <div class="splitStyle"></div>
    <div class="warehouseStyle u-bottom-border" v-if="status==1">
      <a-select style="width: 100%" :allowClear="true" v-model="warehouseId" placeholder="请选择库房">
        <a-select-option v-for="(item) in warehouseList" :key="item.id">
          {{ item.name }}
        </a-select-option>
      </a-select>
      <div class="bigTitleStyle houseBeforeStyle">闲置在</div>
    </div>
    <div class="houseStyle u-bottom-border" v-if="status==2">
      <a-select style="width: 100%" showSearch placeholder="请输入房源编号/小区地址/项目名称/门牌号信息检索房源" v-if="status==2" v-model="allFullAddress"  :defaultActiveFirstOption="false" :showArrow="false" :filterOption="false" @change="getCommunity" @search="selectCommunity" >
        <a-select-option v-for="(item) in communityList" :key="item.houseId">{{ item.viewAddress }}</a-select-option>
      </a-select>
      <div class="bigTitleStyle houseBeforeStyle">在</div>
      <div class="bigTitleStyle houseAfterStyle">使用</div>
    </div>
    <div class="clearfix" style="width: 100%;padding:178px 0px 0px 0px;">
      <div class="buttonDiv f-fr">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="changeStatusFun">
          保存
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/assets";
import {searchHouse} from "@/api/reserve";

export default {
  name: "changeStatus",
  components: {
  },
  props: {
    record:{
      type:Object,
    }
  },
  data() {
    return {
      saveLoading:false,
      status:1,
      communityList: [],
      warehouseList:[],
      houseId:undefined,
      allFullAddress:undefined,
      warehouseId:undefined,
    }
  },
  created() {
    if(this.record.locationType==1){
      this.status = 2;
      this.houseId = this.record.houseId;
      this.allFullAddress = this.record.fullAddress;
    }
    if(this.record.locationType==2){
      this.status = 1;
      this.warehouseId = this.record.warehouseId;
    }
    this.warehouseListSimple();
  },
  mounted() {
  },
  methods: {
    changeStatus(){
      if(this.locationType == 1){
        this.warehouseId = undefined;
      }
      else if(this.locationType == 2){
        this.houseId = undefined;
      }
    },
    warehouseListSimple(){
      API.warehouseListSimple().then(res => {
        if (res.code == 200) {
          this.warehouseList = res.data;
        }
      })
    },
    selectCommunity(searchVal) {
      let data = {
        fuzzyKeyword: searchVal,
        useBiz:7,
      }
      searchHouse(data).then(res => {
        if (res.code == "200") {
          if (res.data.length > 0) {
            this.communityList = res.data;
          } else {
            this.communityList = [];
          }
        }
      })
    },
    getCommunity(communityId) {
      this.houseId = communityId;
    },
    cancelSave(){
      this.$emit('cancelSave');
    },
    changeStatusFun(){
      if(this.status == 1 && !this.warehouseId){
        this.$message.warning('请选择物品当前所在地');
        return ;
      }
      if(this.status == 2 && !this.houseId){
        this.$message.warning('请选择物品当前所在地');
        return ;
      }
      let parameter = {
        id:this.record.id,
        status:this.status,
        houseId:this.houseId,
        warehouseId:this.warehouseId,
      };
      this.saveLoading = true;
      API.assetsModifyStatus(parameter).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.$message.success('状态改变成功');
          this.saveLoading = false;
          this.$emit('changeStatusSuccess');
        }
        else{
          this.$message.error('状态改变失败');
          this.saveLoading = false;
        }
      });
    },
  },
  filters: {
  },
}
</script>

<style scoped lang="less">
.changeStatus-box{
  padding: 20px;
  .line1Style{
    /deep/ .ant-radio-group{
      line-height: 24px;
    }
    /deep/ span.ant-radio + *{
      padding-left: 5px;
      padding-right: 22px;
    }
    .color1{
      font-size: 14px;
      color: #111111;
    }
    .color2{
      font-size: 14px;
      color: #777777;
    }
  }
  .bigTitleStyle{
    color: #111111;
    font-size: 16px;
  }
  .splitStyle{
    margin: 19px 0 30px 0;
    height: 8px;
    width: 100%;
    background: #F6F7F8;
  }
  .houseStyle{
    /deep/ .ant-select-selection__rendered{
      margin-left: 26px;
      margin-right: 50px;
    }
    position: relative;
    .houseBeforeStyle{
      position: absolute;
      height: 32px;
      line-height: 32px;
      left:0px;
      top:0px;
    }
    .houseAfterStyle{
      position: absolute;
      height: 32px;
      line-height: 32px;
      right:0px;
      top:0px;
    }
  }
  .warehouseStyle{
    position: relative;
    /deep/ .ant-select-selection__rendered{
      margin-left: 78px;
      margin-right: 0px;
    }
    .houseBeforeStyle{
      position: absolute;
      height: 32px;
      line-height: 32px;
      left:0px;
      top:0px;
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
  /deep/ .ant-select-selection-selected-value{
    color: #111111;
  }
}
</style>