<template>
  <div class="priceBatchChange-box">
    <div class="numStyle">
      <span>（已选择</span><span style="color: #0A87F8;">「{{ changeCount }}」</span><span>间房源）</span>
    </div>
    <div class="searchStyle">
      <div class="titleStyle">确定要对以下条件范围内的数据批量修改吗？</div>
      <div class="contentStyle clearfix">
        <div class="f-fl itemStyle" v-for="(item,index) in searchData" :key="index">
          {{item.title}}：<span :style="item.style">{{item.val}}</span>
        </div>
      </div>
    </div>
    <div class="priceStyle">
      <div class="line1Style">
        <span class="titleStyle">房源价格设置</span>
        <span class="redStyle">*</span>
      </div>
      <div class="line2Style clearfix">
          <div class="leftStyle clearfix f-fl">
            <div class="itemStyle left f-fl cursor" :class="direction==1?'selected':'unSelect'" @click="direction=1">上浮</div>
            <div class="itemStyle right f-fl cursor" :class="direction==2?'selected':'unSelect'" @click="direction=2">下调</div>
          </div>
          <div class="rightStyle f-fl">
            <label-item style="width: 100%;" class="u-bottom-border">
              <div style="width: 100%;" class="clearfix">
                <a-select class="f-fl" v-model="modifyType" style="width: 130px" >
                  <a-select-option :value="1">按固定金额</a-select-option>
                  <a-select-option :value="2">按租金百分比</a-select-option>
                </a-select>
                <a-input v-if="modifyType==1" class="f-fl" placeholder="请输入" v-model="priceValue" style="width: calc(100% - 130px)"></a-input>
                <a-input v-if="modifyType==2" class="f-fl" placeholder="请输入" v-model="percentValue" v-validate="'rate|max(100)'" style="width: calc(100% - 130px)"></a-input>
                <div class="splitStyle"></div>
                <div class="priceIconStyle">¥</div>
                <div class="unitPriceStyle">{{modifyType==1?'元':'%'}}</div>
              </div>
            </label-item>
          </div>
      </div>
      <div class="line3Style">
        <span v-if="direction==1&&modifyType==1">
          计算规则：原房屋租金 + 固定金额 = 最后的房屋价格
        </span>
        <span v-if="direction==1&&modifyType==2">
          计算规则：原房屋租金 + 原房屋租金 * 租金百分比 = 最后的房屋价格
        </span>
        <span v-if="direction==2&&modifyType==1">
          计算规则：原房屋租金 - 固定金额 = 最后的房屋价格(如下调的固定金额大于或等于原房源的金额，原房源金额则不做改变)
        </span>
        <span v-if="direction==2&&modifyType==2">
          计算规则：原房屋租金 - 原房屋租金 * 租金百分比 = 最后的房屋价格
        </span>
      </div>
    </div>
    <div class="clearfix">
      <div class="buttonDiv f-fr" :style="direction==2&&modifyType==1?'margin-top:89px;':'margin-top:107px;'">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelChange">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="confirmChange">
          确定
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from '@/api/decentralizedHouse';
export default {
  name: "priceBatchChange",
  props: {
    statusIndex:{
      Type:Number,
    },
    changeCount:{
      Type:Number,
    },
    setSearchCondition:{
      Type:Object,
    },
    sendData:{
      Type:Object,
    },
  },
  components: {},
  data() {
    return {
      direction:1, //1、上浮，2、下调
      modifyType:1, //1、固定金额，2、百分比
      priceValue:'',
      percentValue:'',
      saveLoading:false,
      originSearchCon:[
        '部门/人员','城市/区域','房源类型','业务状态','户型','出租价格','房屋面积','空置天数', '朝向','装修类型','是否有图','预计离房时间'

      ],
      firstSearchCon:[
        '全部','综合检索','房源编号','房源地址','门牌号','租客姓名','租客电话','业主姓名','业主电话','标签'
      ],
      searchData:[],
      statusObj:{},
      firstSearchObj:undefined,
    };
  },
  created() {
    this.initStatus();
    this.initFirstSearch();
    this.initSearchCon();
  },
  methods: {
    initFirstSearch(){
      this.setSearchCondition.forEach((item)=>{
        this.firstSearchCon.forEach((temp)=>{
          if(item.title==temp){
            let title = '';
            if(temp == '全部'){
              title = '综合检索';
            } else {
              title = temp;
            }
            let obj = {
              title:title,
              val:item.val,
              style:'color:#111111',
            }
            this.firstSearchObj = obj;
          }
        });
      });
    },
    initSearchCon(){
      let titleList = [];
      this.setSearchCondition.forEach((item)=>{
        this.originSearchCon.forEach((temp)=>{
          if(item.title==temp){
            titleList.push(temp);
          }
        });
      });
      this.searchData.push(this.statusObj);
      if(this.firstSearchObj){
        this.searchData.push(this.firstSearchObj);
      }
      this.originSearchCon.forEach((temp)=>{
        if(titleList.indexOf(temp)>-1){
          this.setSearchCondition.forEach((item)=>{
            if(item.title == temp){
              let obj = {
                title:temp,
                val:item.val,
                style:'color:#111111',
              };
              this.searchData.push(obj);
            }
          });
        }
        else{
          let obj ={
            title:temp,
            val:'全部',
            style:'color:#777777',
          };
          this.searchData.push(obj);
        }
      });
    },
    initStatus(){
      let obj ={};
      if(this.statusIndex==0){
        obj = {
          title:'房源状态',
          val:'全部',
          style:'color:#777777',
        };
      }
      else if(this.statusIndex==1){
        obj = {
          title:'房源状态',
          val:'空置',
          style:'color:#111111',
        };
      }
      else if(this.statusIndex==2){
        obj = {
          title:'房源状态',
          val:'已租',
          style:'color:#111111',
        };
      }
      else if(this.statusIndex==3){
        obj = {
          title:'房源状态',
          val:'配置',
          style:'color:#111111',
        };
      }
      else if(this.statusIndex==4){
        obj = {
          title:'房源状态',
          val:'锁房',
          style:'color:#111111',
        };
      }
      else if(this.statusIndex==5){
        obj = {
          title:'房源状态',
          val:'关闭',
          style:'color:#111111',
        };
      }
      this.statusObj = obj;
    },
    cancelChange(){
      this.$emit('cancel');
    },
    confirmChange(){
      if(this.modifyType==1&&!this.priceValue){
        let title = this.direction==1?'上浮':'下调';
        this.$message.warning('请填写'+title+'金额');
        return
      }
      if(this.modifyType==2&&!this.percentValue){
        let title = this.direction==1?'上浮':'下调';
        this.$message.warning('请填写'+title+'比例');
        return
      }
      let sendData = Object.assign({},this.sendData);
      sendData.direction = this.direction;
      sendData.modifyType = this.modifyType;
      if(sendData.modifyType==1){
        sendData.modifyValue = this.priceValue * 100;
      }
      else if(sendData.modifyType==2){
        sendData.modifyValue = this.percentValue * 100;
      }
      this.saveLoading = true;
      API.batchModifyHousePrice(sendData).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.saveLoading = false;
          this.$emit('changeSuccess');
        }
        else{
          this.saveLoading = false;
        }
      });
    },
  },
}
</script>

<style lang="less" scoped>
.priceBatchChange-box{
  .numStyle{
    color: #777777;
    font-size: 12px;
    position: absolute;
    top:15px;
    left: 154px;
  }
  .searchStyle{
    background: #E7F1FF;
    padding: 15px 20px 10px 20px;
    .titleStyle{
      font-size: 13px;
      color: #777777;
      width: 100%;
      margin-bottom: 10px;
    }
    .contentStyle{
      & > div:last-child {
        margin-right: 0;
      }
      .itemStyle{
        padding: 3px 8px;
        font-size: 12px;
        color: #777777;
        background: #FFFFFF;
        border-radius: 11px;
        margin:0 5px 5px 0;
      }
    }
  }
  .priceStyle{
    padding: 24px 20px 0 20px;
    .line1Style{
      .titleStyle{
        font-size: 16px;
        font-weight: 500;
        color: #111111;
      }
      .redStyle{
        color: #FB4246;
        margin-left: 4px;
      }
    }
    .line2Style{
      margin-top: 20px;
      .leftStyle{
        width: 100px;
        margin-right: 20px;
        .itemStyle{
          width: 50px;
          text-align: center;
          height: 32px;
          line-height: 32px;
          font-size: 14px;
        }
        .left{
          border-radius: 4px 0px 0px 4px;
        }
        .right{
          border-radius: 0px 4px 4px 0px;
        }
        .selected{
          background: #0A87F8;
          border: 1px solid #0A87F8;
          color: #ffffff;
        }
        .unSelect{
          background: #FFFFFF;
          border: 1px solid #E8E8E8;
          color: #777777;
        }
      }
      .rightStyle{
        width: calc(100% - 120px);
        /deep/ .ant-input{
          padding-left: 100px;
        }
        .splitStyle{
          position: absolute;
          left: 150px;
          top:9px;
          height: 14px;
          border-left: 1px dashed #BBBBBB;
        }
        .priceIconStyle{
          position: absolute;
          left: 180px;
          top:6px;
          color: #111111;
          font-weight: 500;
          font-size: 14px;
        }
        .unitPriceStyle{
          position: absolute;
          right: 0px;
          top:6px;
          color: #111111;
          font-size: 14px;
        }
      }
    }
    .line3Style{
      margin-top: 15px;
      color: #FFA036;
      font-size: 12px;
    }
  }
  .buttonDiv {
    margin: 107px 20px 20px 0;
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