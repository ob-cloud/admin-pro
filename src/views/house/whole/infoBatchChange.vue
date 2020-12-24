<template>
  <div class="infoBatchChange-box">
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
        <span class="titleStyle">房源基本信息</span><span style="color: #FFA036;font-size: 12px;margin-left: 10px;">(值为“请选择”时不会改变原房源的值)</span>
      </div>
      <div class="line2Style clearfix">
        <label-item title="房源模式" class="f-fl u-bottom-border" style="margin-right: 30px;">
          <a-select v-model="formData.targetHouseBizMode" placeholder="请选择" style="width: 200px;">
            <a-select-option :value="1">直营</a-select-option>
            <a-select-option :value="3">加盟(全托)</a-select-option>
            <a-select-option :value="4">加盟(半托)</a-select-option>
            <a-select-option :value="2">代理</a-select-option>
          </a-select>
        </label-item>
        <label-item title="装修类型" class="f-fl u-bottom-border" style="margin-right: 30px;">
          <a-select v-model="formData.targetDecorationType" placeholder="请选择" style="width: 200px;">
            <a-select-option :value="2">精装</a-select-option>
            <a-select-option :value="4">毛坯</a-select-option>
            <a-select-option :value="3">简装</a-select-option>
            <a-select-option :value="1">豪华装</a-select-option>
          </a-select>
        </label-item>
        <label-item title="短租信息" class="f-fl u-bottom-border">
          <a-select v-model="formData.targetIsShortRent" placeholder="请选择" style="width: 200px;">
            <a-select-option :value="1">可短租</a-select-option>
            <a-select-option :value="0">不可短租</a-select-option>
          </a-select>
        </label-item>
      </div>
      <div class="line1Style" style="margin: 25px 0 2px 0;">
        <span class="titleStyle">房源特色</span>
        <a-radio-group v-model="formData.tagOperateType" style="margin-left: 20px;">
          <a-radio :value="1">
            <span :class="formData.tagOperateType==1?'checkStyle':'unCheckStyle'">追加</span>
          </a-radio>
          <a-radio :value="2">
            <span :class="formData.tagOperateType==2?'checkStyle':'unCheckStyle'">覆盖</span><span class="otherCheckStyle">(不勾选则不做覆盖处理)</span>
          </a-radio>
        </a-radio-group>
      </div>
      <div>
        <label-item class="u-bottom-border" title="">
          <a-checkbox-group class="public-config" v-model="formData.tagList" @change="changeTagCheckAll">
            <a-checkbox :value="item.name" v-for="(item,i) in houseTagConfig" :key="i">{{item.name}}</a-checkbox>
          </a-checkbox-group>
        </label-item>
      </div>
      <div class="line1Style" style="margin-top: 20px;">
        <span class="titleStyle">房源标题</span><span style="color: #111111;font-size: 14px;">(广告语)</span>
        <a-radio-group v-model="formData.titleOperateType" style="margin-left: 20px;">
          <a-radio :value="1">
            <span :class="formData.titleOperateType==1?'checkStyle':'unCheckStyle'">追加</span><span class="otherCheckStyle">(超出后只提取前面的字段)</span>
          </a-radio>
          <a-radio :value="2">
            <span :class="formData.titleOperateType==2?'checkStyle':'unCheckStyle'">覆盖</span><span class="otherCheckStyle">(不输入则不做覆盖处理)</span>
          </a-radio>
        </a-radio-group>
      </div>
      <div>
        <label-item class="u-bottom-border" title="" :maxSize="30" :valLength="formData.title.length">
          <a-input maxlength="30" autosize placeholder="请输入房源标题" v-model="formData.title"></a-input>
        </label-item>
      </div>
      <div class="line1Style" style="margin-top: 25px;">
        <span class="titleStyle">房源描述</span>
        <a-radio-group v-model="formData.promotionDescOperateType" style="margin-left: 20px;">
          <a-radio :value="1">
            <span :class="formData.promotionDescOperateType==1?'checkStyle':'unCheckStyle'">追加</span><span class="otherCheckStyle">(超出后只提取前面的字段)</span>
          </a-radio>
          <a-radio :value="2">
            <span :class="formData.promotionDescOperateType==2?'checkStyle':'unCheckStyle'">覆盖</span><span class="otherCheckStyle">(不输入则不做覆盖处理)</span>
          </a-radio>
        </a-radio-group>
      </div>
      <div>
        <label-item class="u-bottom-border" title="" :maxSize="500" :valLength="formData.promotionDesc.length">
          <a-textarea maxlength="500" autosize placeholder="请输入房源描述" v-model="formData.promotionDesc"></a-textarea>
        </label-item>
      </div>
      <div class="line1Style" style="margin-top: 25px;">
        <span class="titleStyle">房源图片</span>
        <a-radio-group v-model="formData.picOperateType" style="margin-left: 20px;">
          <a-radio :value="1">
            <span :class="formData.picOperateType==1?'checkStyle':'unCheckStyle'">追加</span><span class="otherCheckStyle">(超出后只提取前面的几张)</span>
          </a-radio>
          <a-radio :value="2">
            <span :class="formData.picOperateType==2?'checkStyle':'unCheckStyle'">覆盖</span><span class="otherCheckStyle">(不上传则不做覆盖处理)</span>
          </a-radio>
        </a-radio-group>
      </div>
      <div style="margin-top: 5px;color: #FFA036;">批量修改中，如果是合租房源，只修改其子间的图片信息</div>
      <div style="margin-top: 10px;">
        <house-video :show-tips="false" :uploadParms="uploadParms" ref="housePicList"></house-video>
      </div>
      <div class="line1Style" style="margin-top: 17px;">
        <span class="titleStyle">房源标签</span>
        <a-radio-group v-model="formData.lableOperateType" style="margin-left: 20px;">
          <a-radio :value="1">
            <span :class="formData.lableOperateType==1?'checkStyle':'unCheckStyle'">追加</span>
          </a-radio>
          <a-radio :value="2">
            <span :class="formData.lableOperateType==2?'checkStyle':'unCheckStyle'">覆盖</span><span class="otherCheckStyle">(不添加则不做覆盖处理)</span>
          </a-radio>
        </a-radio-group>
      </div>
      <div>
        <label-item class="item u-bottom-border" style="width: 100%;margin-right: 0px;">
          <div style="border-bottom: 1px solid #DDDDDD;" class="clearfix">
            <div v-for="(itemTemp,index) in formData.lableList" :key="index" class="itemLableStyle f-fl clearfix" style="margin-top: 5px;">
              <div class="f-fl">{{itemTemp}}</div>
              <icon-font style="color: #FB4246;margin-top: 5px;" class="cursor f-fl" @click="removeHouseLableList(index)" type="iconyumengtubiao_guanbi-"/>
            </div>
            <label-item class="f-fl u-no-border" v-if="formData.lableList.length<10">
              <a-input v-model="houseLableInput" style="text-align: left;" maxLength="10" @click="currentClickIndex=1" :placeholder="formData.lableList.length==0?'可输入补充标签，回车添加':'继续输入回车添加'" @keyup.enter="value=>addHouseLabel(value)" />
            </label-item>
          </div>
        </label-item>
      </div>
    </div>
    <div style="height: 67px;position: relative">
      <div class="poperLabelStyle2" v-if="currentClickIndex&&houseLableList.length>0" style="max-height: 200px;overflow-y: auto" @mouseenter="currentClickIndex=1" @mouseleave="currentClickIndex=undefined">
        <div style="width: 100%;font-size: 12px;color: #666666;line-height: 17px;margin: 0 0 2px 0;">常用标签</div>
        <div v-for="(itemTemp,index3) in houseLableList" :key="index3" @click.stop="changeLabelList(itemTemp)" class="selectDemandLabelItem cursor f-fl clearfix" style="margin:0 5px 5px 0;" :style="formData.lableList.indexOf(itemTemp)>-1?'':'background:#F4F4F4;'">
          <div class="f-fl">{{itemTemp}}</div>
        </div>
      </div>
    </div>
    <div class="clearfix">
      <div class="buttonDiv f-fr">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelChange">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="confirmChange">
          确定
        </a-button>
      </div>
      <div class="f-fr" style="height: 40px;line-height: 40px;">
        <span style="color: #FFA036;font-size: 12px;margin-left: 10px;">保存成功后，已选择的房源信息将批量修改成最新的</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from '@/api/decentralizedHouse';
import HouseVideo from '@/components/OwnUpload/houseVideo';
import * as PublicAPI from "@/api/public";
import {getListHouseLable} from "@/api/centralizedHouse";
export default {
  name: "infoTransfer",
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
  components: {
    HouseVideo,
  },
  data() {
    return {
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
      operateFlag:true,
      formData:{
        targetHouseBizMode:undefined,
        targetDecorationType:undefined,
        targetIsShortRent:undefined,
        title:'',
        titleOperateType:1,
        promotionDesc:'',
        promotionDescOperateType:1,
        picIdList:[],
        picOperateType:1,
        tagList:[],
        tagOperateType:1,
        lableList:[],
        lableOperateType:1,
      },
      uploadParms: {
        bizId: '',
        bizType: 1,
        subBizType: '',
      },
      houseLableInput:'',
      currentClickIndex:undefined,
      houseTagConfig: [],
      houseLableList:[],
    };
  },
  created() {
    this.getDictionaryList();
    this.listHouseLable();
    this.initStatus();
    this.initFirstSearch();
    this.initSearchCon();
  },
  methods: {
    changeTagCheckAll(){
      if(this.formData.tagList==null){
        this.formData.tagList = [];
      }
    },
    listHouseLable(){
      getListHouseLable().then(res => {
        if (res.code == "200") {
          this.houseLableList = res.data;
        }
      })
    },
    // 获取字典
    getDictionaryList() {
      // 特色
      PublicAPI.getTagDictionary().then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.houseTagConfig = res.data;
        }
      })
    },
    changeLabelList(itemTemp){
      let pos =this.formData.lableList.indexOf(itemTemp);
      if(pos>-1){
        this.formData.lableList.splice(pos,1);
      }
      else{
        if(this.formData.lableList.length>=10){
          return;
        }
        this.formData.lableList.push(itemTemp);
      }
    },
    addHouseLabel(){
      let value = this.houseLableInput;
      if(value){
        let pos = this.formData.lableList.indexOf(value)
        if(pos > -1){
          //有了就不添加了
          this.$message.warning('该标签已存在，不可重复添加');
        }
        else{
          this.formData.lableList.push(value);
          this.houseLableInput='';
        }
      }
    },
    removeHouseLableList(index){
      this.formData.lableList.splice(index,1);
    },
    selectDeptEmp(selectObj){
      if (selectObj.type == 'employee') {
        this.maintainerId = selectObj.id;
      }
    },
    //来自自定义搜索
    filterOption(inputValue,option){
      if(!inputValue){
        return true;
      }
      return option.componentOptions.children[0].text.indexOf(inputValue) > -1;
    },
    handleChange(value){
      this.storeDeptId = value;
    },
    goBack(){
      this.$emit('changeSuccess');
    },
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
      let sendData = Object.assign({},this.sendData);
      let formData = Object.assign({},this.formData)
      for(var key in formData){
        if(formData.hasOwnProperty(key) == true){
          sendData[key] = formData[key];
        }
      }
      let picIdList=[];
      let housePicList = [...this.$refs.housePicList.picsList];
      if(housePicList && housePicList.length > 0) {
        housePicList.forEach((val) => {
          picIdList.push(val.id)
        })
        sendData.picIdList = picIdList;
      }
      this.saveLoading = true;
      API.batchModifyHouseInfo(sendData).then(res=>{
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
.infoBatchChange-box{
  max-height: calc(100vh - 100px);
  overflow-y: auto;
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
      /deep/ .ant-select-selection__rendered{
        margin-left: 0px;
      }
      width: 100%;
      .deptStyle{
        width: 100%;
      }
    }
    .checkStyle{
      color: #0A87F8;
      font-size: 14px;
    }
    .unCheckStyle{
      color: #333333;
      font-size: 14px;
    }
    .otherCheckStyle{
      color: #999999;
      font-size: 12px;
    }
    /deep/ span.ant-radio + *{
      padding-left: 4px;
    }
    .public-config {
      display: flex;
      flex-wrap: wrap;
      label {
        width: 100px;
        margin: 5px 0 5px 0;
        padding: 0;
      }
    }
    .itemLableStyle{
      color: #111111;
      font-size: 12px;
      background: #F0F8FF;
      border-radius:4px;
      height: 22px;
      line-height: 23px;
      padding: 0 5px;
      margin-right: 5px;
    }
  }
  .poperLabelStyle2{
    position: absolute;
    margin-left: 20px;
    padding: 10px 10px 10px 10px;
    width:956px;
    min-height:60px;
    top:0px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 10px 0px rgba(0,0,0,0.1);
    border-radius:4px;
    border:1px solid rgba(238,238,238,1);
    z-index: 99;
  }
  .selectDemandLabelItem{
    height: 24px;
    line-height: 24px;
    padding: 0 5px;
    font-size: 12px;
    color: #111111;
    border-radius:4px;
    margin-top: 8px;
    margin-right: 5px;
    text-align:center;
    background:#F0F8FF;
  }
  .buttonDiv {
    margin: 0 20px 20px 0;
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