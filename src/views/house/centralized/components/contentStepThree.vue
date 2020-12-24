<template>
	<div class="step_three_css">
		<head-title title="项目信息"></head-title>
		<div class="item_info">
			<input-item title="门店电话" :must="true" width="190px" :required="requeredData.contactNumber.required" :error="requeredData.contactNumber.error">
				<a-input slot="content" placeholder="请输入门店电话" v-model="projectExtendInfoData.contactNumber" @change="changeValidate('contactNumber')" />
			</input-item>
			<input-item title="用水" :must="true" width="190px">
				<a-select slot="content" style="width:100%" v-model="projectExtendInfoData.waterType">
					<a-select-option :value="1">民水</a-select-option>
                    <a-select-option :value="2">商业用水</a-select-option>
				</a-select>
			</input-item>
			<input-item title="用电" :must="true" width="190px">
				<a-select slot="content" style="width:100%" v-model="projectExtendInfoData.electricityType">
                    <a-select-option :value="1">民电</a-select-option>
                    <a-select-option :value="2">商业用电</a-select-option>
				</a-select>
			</input-item>
			<input-item title="供暖信息" :must="true" width="190px">
				<a-select slot="content" style="width:100%" v-model="projectExtendInfoData.heatingType">
					<a-select-option :value="0">未知</a-select-option>
                    <a-select-option :value="1">自采暖</a-select-option>
                    <a-select-option :value="2">集中供暖</a-select-option>
				</a-select>
			</input-item>
			<div style="width: 100px;margin-top: -3px">
				<a-checkbox slot="content" v-model="gasTypeFlag">
                    有燃气
				</a-checkbox>
			</div>
      <input-item title="门店核验码" width="190px" style="margin-right: 0px;">
        <a-input slot="content" placeholder="请输入门店核验码" v-model="projectExtendInfoData.checkCode" maxlength="30" />
      </input-item>
            <div class="projectConfig">
                <label-item
                    class="item u-bottom-border"
                    style="width: 100%;margin-bottom: 0px;"
                    title="- --"
                >
                    <div class="checkAllStyle">
                        <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="value => checkAllProjectConfig(value)" v-model="projectConfigCheckAll">项目特色</a-checkbox>
                    </div>
                    <a-checkbox-group class="public-config" v-model="projectConfigIdList" @change="changeProjectConfigCheckAll()">
                        <a-checkbox :value="item.id" v-for="(item) in housePublicConfig" :key="item.id">{{item.name}}</a-checkbox>
                    </a-checkbox-group>
                </label-item>
            </div>
            <label-item
                class="item u-bottom-border"
                style="width: 100%;margin-top: 5px;"
                title="VR看房地址"
                :valLength="projectExtendInfoData.vrUrl.length"
                :maxSize="100"
            >
              <a-textarea v-model="projectExtendInfoData.vrUrl"
                          maxlength="100"
                          placeholder="请输入VR看房链接地址"
                          :autosize="{ minRows: 1, maxRows: 5 }"
              />
            </label-item>
            <label-item
                    class="item u-bottom-border"
                    style="width: 100%;margin-top: 5px;"
                    title="项目介绍"
                    :valLength="projectExtendInfoData.projectIntro.length"
                    :maxSize="500"
            >
                <a-textarea v-model="projectExtendInfoData.projectIntro"
							maxlength="500"
                            placeholder="请输入项目介绍"
                            :autosize="{ minRows: 1, maxRows: 5 }"
                />
            </label-item>
			<label-item
				class="item u-bottom-border"
				style="width: 100%;margin-top: 5px;"
				title="周边介绍"
				:valLength="projectExtendInfoData.peripheryIntro.length"
				:maxSize="500"
			>
				<a-textarea v-model="projectExtendInfoData.peripheryIntro"
							maxlength="500"
					placeholder="请输入周边介绍"
					:autosize="{ minRows: 1, maxRows: 5 }"
				/>
			</label-item>
      <label-item
          class="item labelStyle bigTitleStyle1 u-bottom-border"
          style="width: 100%;margin-top: 5px;position: relative;"
          title="项目标签"
      >
        <label-item class=" u-bottom-border f-fl" style="width:100%;border-radius:4px;position: relative">
          <div class="clearfix" style="border-bottom: 1px solid #DDDDDD;">
            <div v-for="(itemTemp,index) in projectExtendInfoData.lableList" :key="index" class="itemLableStyle f-fl clearfix" style="margin-bottom: 5px;">
              <div class="f-fl">{{itemTemp}}</div>
              <icon-font style="color: #FB4246;margin-top: 5px;" class="cursor f-fl" @click="removeHouseLableList(index)" type="iconyumengtubiao_guanbi-"/>
            </div>
            <label-item class="f-fl u-no-border" v-if="projectExtendInfoData.lableList.length<10">
              <a-input v-model="houseLableInput" style="text-align: left;" maxLength="10" @click="currentClickIndex=1" :placeholder="projectExtendInfoData.lableList.length==0?'可输入补充标签，回车添加':'继续输入回车添加'" @keyup.enter="value=>addHouseLabel(value)" />
            </label-item>
          </div>
        </label-item>
        <div style="position: absolute;top: 6px;left:76px;">
          <div style="height: 24px;line-height: 24px;">
            <span style="color: #FFA036;font-size: 12px;">(仅内部可见)</span>
          </div>
        </div>
      </label-item>
      <label-item
          class="item bigTitleStyle2 u-bottom-border"
          style="width: 100%;margin-top: 5px;position: relative;"
          title="备注"
          :valLength="projectExtendInfoData.comment.length"
          :maxSize="500"
      >
        <a-textarea v-model="projectExtendInfoData.comment"
                    maxlength="500"
                    placeholder="请输入备注信息"
                    :autosize="{ minRows: 1, maxRows: 5 }"
        />
        <div style="position: absolute;top: 6px;left:40px;">
          <div style="height: 24px;line-height: 24px;">
            <span style="color: #FFA036;font-size: 12px;">(仅内部可见)</span>
          </div>
        </div>
        <div class="poperLabelStyle2" v-if="currentClickIndex&&houseLableList.length>0" style="max-height: 200px;overflow-y: auto" @mouseenter="currentClickIndex=1" @mouseleave="currentClickIndex=undefined">
          <div style="width: 100%;font-size: 12px;color: #666666;line-height: 17px;margin: 0 0 2px 0;">常用标签</div>
          <div v-for="(itemTemp,index3) in houseLableList" :key="index3" @click.stop="changeLabelList(itemTemp)" class="selectDemandLabelItem cursor f-fl clearfix" style="margin:0 5px 5px 0;" :style="projectExtendInfoData.lableList.indexOf(itemTemp)>-1?'':'background:#F4F4F4;'">
            <div class="f-fl">{{itemTemp}}</div>
          </div>
        </div>
      </label-item>
			<label-item
				class="item bigTitleStyle3 u-bottom-border clearfix"
				style="width: 100%;margin-top: 5px;min-height: 372px;"
				title="项目图片"
			>
        <house-video ref="projectExtendInfoDataPicList" :showPicTypeFlag="false" :picList="projectExtendInfoData.picList" :uploadParms="uploadParms"></house-video>
			</label-item>
		</div>
	</div>
</template>
<script>
	import headTitle from "./headTitle";
	import inputItem from "@/components/inputBox/inputItem";
	import LabelItem from "@/components/FormItem/LabelItem";
  import  * as API from '@/api/centralizedHouse';
  import HouseVideo from '@/components/OwnUpload/houseVideo';
	export default {
		name: "ContentStepThree",
		components: { headTitle, inputItem, LabelItem,HouseVideo },
        props: {
            buildingProjectId:{
                //楼盘id
                type: String,
                default: ""
            }
        },
        created(){
            this.initData();
            this.listHouseLable();
        },
		data() {
			return {
                housePublicConfig:[],
                projectExtendInfoData:{
                    buildingProjectId:"",
                    contactNumber:undefined,
                    electricityType:2,
                    gasType:0,
                    heatingType:0,
                    peripheryIntro:"",
                    picIdList:[],
                    picList:[],
                    projectConfig:[],
                    projectIntro:"",
                    waterType:2,
                  checkCode:'',
                  lableList:[],
                  comment:"",
                  vrUrl:'',
                },
                projectConfigIdList:[],
                projectExtendInfoCopyData:{},
                gasTypeFlag:false,
                uploadParms:{},
                requeredData: {
                    contactNumber: {
                        required: false,
                        error: "请输入门店电话",
                    },
                },
                projectConfigCheckAll:false,
                indeterminate: true,
                checkAll: false,
                houseLableList:[],
                houseLableInput:'',
                currentClickIndex:undefined,
            };
		},
		mounted() {},
		methods: {
      changeLabelList(itemTemp){
        let pos =this.projectExtendInfoData.lableList.indexOf(itemTemp);
        if(pos>-1){
          this.projectExtendInfoData.lableList.splice(pos,1);
        }
        else{
          if(this.projectExtendInfoData.lableList.length>=10){
            return;
          }
          this.projectExtendInfoData.lableList.push(itemTemp);
        }
      },
      addHouseLabel(){
        let value = this.houseLableInput;
        if(value){
          let pos = this.projectExtendInfoData.lableList.indexOf(value)
          if(pos > -1){
            //有了就不添加了
            this.$message.warning('该标签已存在，不可重复添加');
          }
          else{
            this.projectExtendInfoData.lableList.push(value);
            this.houseLableInput='';
          }
        }
      },
      removeHouseLableList(index){
          this.projectExtendInfoData.lableList.splice(index,1);
      },
      listHouseLable(){
        API.getListHouseLable().then(res => {
          if (res.code == "200") {
            this.houseLableList = res.data;
          }
        })
      },
            changeProjectConfigCheckAll(){
                if(this.projectConfigIdList.length == this.housePublicConfig.length){
                    this.projectConfigCheckAll = true;
                    this.checkAll = true;
                }else{
                    this.projectConfigCheckAll = false;
                    this.checkAll = false;
                }
                this.indeterminate = !!this.projectConfigIdList.length && this.projectConfigIdList.length < this.housePublicConfig.length;
            },
            checkAllProjectConfig(e){
                if(e.target.checked){
                    this.projectConfigIdList = [];
                    this.housePublicConfig.forEach((item)=>{
                        this.projectConfigIdList.push(item.id);
                    })
                }else{
                    this.projectConfigIdList = [];
                }
                this.indeterminate = false;
                this.checkAll = e.target.checked;
            },
		        initData(){
                this.uploadParms = {
                    bizId: this.buildingProjectId,
                    bizType: 1,
                    subBizType: '',
                }
                if(this.buildingProjectId!=""){
                    //将字典获取放入获取详情之后
                    this.projectExtendInfoView();
                }else{
                    this.getDictionaryList();
                }
            },
            // 公区配置、房间配置
            getDictionaryList() {
                API.getCentralizedHouseDictionary().then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.housePublicConfig = res.data;
                    }
                    this.changeProjectConfigCheckAll();
                })
            },
            //查看楼盘项目扩展信息
            projectExtendInfoView(){
                API.projectExtendInfoView(this.buildingProjectId).then(res => {
                    if (res.code == "200") {
                        this.projectExtendInfoData = res.data;
                        this.gasTypeFlag = this.projectExtendInfoData.gasType == 1?true:false;
                        //用水用电处理
                        if(res.data.waterType == 0){
                            this.projectExtendInfoData.waterType = 2;
                        }
                        if(res.data.electricityType == 0){
                            this.projectExtendInfoData.electricityType = 2;
                        }
                        if(res.data.picIdList == null){
                            this.projectExtendInfoData.picIdList = [];
                        }
                        if(res.data.picList == null){
                            this.projectExtendInfoData.picList = [];
                        }
                        if(res.data.picList == null){
                            this.projectExtendInfoData.picList = [];
                        } else{
                            for (let i = 0; i < this.projectExtendInfoData.picList.length; i++) {
                                this.projectExtendInfoData.picList[i].status='done';
                            }
                        }
                        if(res.data.projectConfig == null){
                            this.projectConfigIdList = [];
                        }
                        else{
                            let array = [];
                            for (let i = 0; i < res.data.projectConfig.length; i++) {
                                array.push(res.data.projectConfig[i].id);
                            }
                            this.projectConfigIdList = array;
                        }
                    }
                    this.getDictionaryList();
                })
            },
            //添加楼盘项目扩展信息
            projectExtendInfoAdd(){
                let flag = this.checkData();
                if(!flag){
                    this.$message.warning('请输入必填项！');
                    return false;
                }
		            this.projectExtendInfoData.buildingProjectId = this.buildingProjectId;
                this.projectExtendInfoData.gasType = this.gasTypeFlag?1:2;
                //图片处理
                let projectExtendInfoDataPicList = [...this.$refs.projectExtendInfoDataPicList .picsList];
                if(projectExtendInfoDataPicList && projectExtendInfoDataPicList.length > 0) {
                    let picIdList = [];
                    projectExtendInfoDataPicList.forEach((val, i) => {
                        picIdList.push(val.id)
                    })
                    this.projectExtendInfoData.picIdList = picIdList;
                }
                this.projectExtendInfoData.projectConfigIdList = this.projectConfigIdList;
                this.$emit('changeLoading',true);
                API.projectExtendInfoAdd(this.projectExtendInfoData).then(res => {
                    this.$emit('changeLoading',false);
                    if (res.code == "200") {
                        this.$message.info("推广描述修改成功");
                        this.$emit('refreshinfoFun',true);
                    }else{
                        this.$message.info("推广描述修改失败");
                    }
                });
                return true;
            },
            //检验数据
            checkData(){
                //检验
                let flag = true;
                if(!this.projectExtendInfoData.contactNumber){
                    this.requeredData.contactNumber.required = true;
                    flag = false;
                }
                return flag;
            },
            changeValidate(value){
                if (this.projectExtendInfoData[value]) {
                    this.requeredData[value].required = false;
                } else {
                    this.requeredData[value].required = true;
                }
            },
        }
	};
</script>
<style lang='less' scoped>
::-webkit-scrollbar{
  width: 2px;
}
.step_three_css {
	position: relative;
	overflow-y: scroll;
    overflow-x: hidden;
	width: 100%;
    height: 100%;
  padding: 0 20px;
	.item_info {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		overflow: hidden;
		position: relative;
	}
	.item {
		margin-top: -10px;
		margin-bottom: 20px;
        /deep/ .ant-input{
            color: #111;
        }
	}
  .itemLableStyle{
    color: #111111;
    font-size: 12px;
    background: #F0F8FF;
    border-radius:4px;
    height: 22px;
    line-height: 22px;
    padding: 0 5px;
    margin-right: 5px;
  }
  .poperLabelStyle2{
    position: absolute;
    padding: 10px 10px 10px 10px;
    width:1150px;
    min-height:60px;
    top:-25px;
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
    .projectConfig{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 10px;
        margin-top: 5px;
        .public-config {
            display: flex;
            flex-wrap: wrap;
            label {
                width: 140px;
                margin: 10px 0 10px 0;
                padding-right: 30px;
            }
        }
        .checkAllStyle{
            position: absolute;
            left: 0px;
            top: 5px;
            font-size: 16px;
        }
    }
    /deep/ .form-input-item .slot-content{
        font-weight: 400;
    }
  /deep/ .label-item textarea.ant-input{
    padding: 4px 0;
  }
  .labelStyle{
    /deep/ .ant-input{
      height: 22px;
      line-height: 22px;
    }
  }
  .bigTitleStyle1{
    /deep/ .title{
      margin-bottom: 18px;
      font-size: 18px !important;
      color: #111111 !important;
      font-weight: 500 !important;
    }
  }
  .bigTitleStyle2{
    /deep/ .title{
      margin-bottom: 9px;
      font-size: 18px !important;
      color: #111111 !important;
      font-weight: 500 !important;
    }
  }
  .bigTitleStyle3{
    /deep/ .title{
      margin-bottom: 18px;
      font-size: 18px !important;
      color: #111111 !important;
      font-weight: 500 !important;
    }
  }
}
</style>
