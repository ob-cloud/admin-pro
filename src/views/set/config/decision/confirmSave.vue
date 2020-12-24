<template>
  <div class="batchSetOther-box" @click="showOtherFlag=false;">
    <div class="headStyle clearfix">
      <div class="iconStyle f-fl"><icon-font style="color: #FFA036;" type="iconyumengtubiao_tishi"></icon-font></div>
      <div class="bigTitleStyle f-fl">当前设置将应用于「{{storeDeptName}}」门店</div>
    </div>
    <div style="margin:25px 0 0 4px;">
      <a-checkbox v-model="checkOtherFlag" :disabled="onlyFirstStoreDeptFlag"><span class="checkStyle">批量应用到其他门店</span></a-checkbox>
    </div>
    <div v-show="checkOtherFlag" class="checkOtherFlagStyle u-bottom-border" style="margin:12px 0 0 33px;" @click.stop="">
        <a-select style="width: 100%" :open="showOtherFlag" mode="multiple" optionFilterProp="children" :showArrow="true" v-model=" applyStoreIdList"
                  @change="handleChange" @mouseenter="showOtherFlag=true" placeholder="请选择">
          <div slot="dropdownRender" slot-scope="menu">
            <v-nodes :vnodes="menu" />
            <a-divider style="margin: 4px 0;" />
            <div class="otherStyle" @mousedown="e => e.preventDefault()">
              <div class="item"><a-checkbox v-model="checkAllFlag" @click.stop="">全选</a-checkbox></div>
              <div class="itemButton">
                <div class="clearStyle cursor" @click.stop="selectAllClear">清空</div>
                <div class="confirmStyle cursor" @click="confirmSelect">确认</div>
              </div>
            </div>
          </div>
          <a-select-option v-for="(item) in storeDeptList" :value="item.value" label="item.label">{{item.name}}</a-select-option>
        </a-select>
    </div>
    <div class="clearfix" style="width: 100%;" :style="checkOtherFlag?'padding:168px 0px 0px 0;':'padding:210px 0px 0px 0;'">
      <div class="buttonDiv f-fr">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="batchSet">
          保存
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/decision";

export default {
  name: "batchSetOther",
  props: {
    data:{
      type:Object,
      required:true,
    },
    storeDeptId: {
      type: String,
    },
    storeDeptName: {
      type: String,
    },
    onlyFirstStoreDeptFlag:{
      type:Boolean,
    },
    fromType:{
      type:Number,
      default:1,
    },
  },
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  created() {
    document.getElementsByTagName("body")[0].addEventListener('click', () => {

    })
    this.listStoreDept();
  },
  computed: {
  },
  data() {
    return {
      storeDeptList:[],
      applyStoreIdList:[],
      checkOtherFlag:false,
      showOtherFlag:true,
      saveLoading:false,
      checkAllFlag:false,
    }
  },
  methods: {
    confirmSelect(){
      if(this.checkAllFlag){
        let applyStoreIdList = [];
        this.storeDeptList.forEach((item)=>{
          applyStoreIdList.push(item.id);
        });
        this.applyStoreIdList = applyStoreIdList;
      }
      this.showOtherFlag =false;
    },
    selectAllClear(){
      this.applyStoreIdList = [];
    },
    cancelSave(){
      this.$emit('cancelSave');
    },
    handleChange(val){
      this.applyStoreIdList = val;
    },
    batchSet(){
      let sendData = {};
      sendData = Object.assign({},this.data);
      sendData.applyStoreIdList = this.applyStoreIdList;
      this.saveLoading = true;
      if(sendData.mark == 'ELECTRIC_METER_CHARGE_AMOUNT_MIN_LIMIT'){
        sendData.value = sendData.value*100;
      }
      if(this.fromType == 1){
        if(this.data.id){
          API.decisionEdit(sendData).then(res => {
            if(!res){
              this.saveLoading = false;
            }
            if (res.code === '200') {
              this.$message.info('修改成功');
              this.$emit('successSave');
            }
            else{
              this.$message.info('修改失败');
            }
            this.saveLoading = false;
          });
        }else{
          API.decisionAdd(sendData).then(res => {
            if(!res){
              this.saveLoading = false;
            }
            if (res.code === '200') {
              this.$message.info('添加成功');
              this.$emit('successSave');
            }
            else{
              this.$message.info('添加失败');
            }
            this.saveLoading = false;
          });
        }
      }
      else if(this.fromType == 2){
        if(this.data.id){
          API.moduleFieldConfigEdit(sendData).then(res => {
            if(!res){
              this.saveLoading = false;
            }
            if (res.code === '200') {
              this.$message.info('修改成功!');
              this.$emit('successSave');
            }
            else{
              this.$message.error('修改失败!');
            }
          });
        }
        else{
          API.moduleFieldConfigAdd(sendData).then(res => {
            if(!res){
              this.saveLoading = false;
            }
            if (res.code === '200') {
              this.$message.info('添加成功!');
              this.$emit('successSave');
            }
            else{
              this.$message.error('添加失败!');
            }
          });
        }
      }
    },
    listStoreDept(){
      API.listStoreDept().then(res => {
        if (res.code === '200') {
          let storeDeptList = [];
          res.data.forEach((item)=>{
            if(item.id!=this.storeDeptId){
              item.value = item.id;
              item.label = item.name;
              storeDeptList.push(item);
            }
          });
          this.storeDeptList = storeDeptList;
        }
      });
    },
  },
  watch: {
    applyStoreIdList() {
      if(this.applyStoreIdList.length == this.storeDeptList.length){
        this.checkAllFlag = true;
      }
      else{
        this.checkAllFlag = false;
      }
    }
  }
}
</script>

<style scoped lang="less">
.batchSetOther-box{
  padding: 20px;
  /deep/ .ant-select-selection__rendered{
    margin-left: 0;
  }
  /deep/ .ant-select-selection__placeholder{
    margin-left: 0;
  }
  /deep/ .label-item .title{
    margin-bottom: 4px;
  }
  .headStyle{
    .iconStyle{
      height: 30px;
      line-height: 30px;
      svg{
        width: 24px;
        height: 24px;
      }
      i{
        width: 24px;
        height: 24px;
        vertical-align: -0.55em;
      }
    }
    .bigTitleStyle{
      font-size: 20px;
      font-weight: 500;
      color: #111111;
      margin-left: 8px;
    }
  }
  .checkStyle{
    font-size: 16px;
    color: #111111;
    margin-left: 5px;
  }
  .checkOtherFlagStyle{
    .otherStyle{
      width:100%;
      height:30px;
      line-height:30px;
      display: flex;
      justify-content:space-between;
      padding: 0 10px;
      .item{
        flex: 1;
      }
      .itemButton{
        display: flex;
        justify-content:flex-end;
        .clearStyle{
          width: 54px;
          height: 23px;
          line-height: 23px;
          font-size: 14px;
          color: #666666;
          background: #F6F7F8;
          border-radius: 4px;
          border: 1px solid #DDDDDD;
          text-align: center;
          margin-right: 10px;
        }
        .confirmStyle{
          width: 54px;
          height: 23px;
          line-height: 23px;
          text-align: center;
          font-size: 14px;
          color: #FFFFFF;
          background: #0A87F8;
          border-radius: 4px;
        }
      }
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