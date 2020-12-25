<template>
  <!---   该页面为编辑页面 -->
	<a-modal
		v-model="visible"
		@cancel="onCancel"
		:maskClosable="false"
		:width="1200"
		centered
		wrapClassName="titDialog add_centralized_modal_css "
	>
		<label slot="title" class="add_title_css">修改独栋</label>
		<title-steps :steps="stepsNum" :buildingProjectId="buildingProjectId" @changeStepsNum="changeStepsNum"></title-steps>
		<content-step-one v-if="stepsNum === 1" :typeFlag="2" ref="contentStepOne" :buildingProjectId="buildingProjectId" @initBuildingProjectId="initBuildingProjectId" @refreshinfoFun="refreshinfoFun" @changeLoading="changeLoading"></content-step-one>
		<content-step-two v-else-if="stepsNum === 2" ref="contentStepTwo" :buildingProjectId="buildingProjectId" @refreshinfoFun="refreshinfoFun" @changeLoading="changeLoading"></content-step-two>
		<content-step-Three v-else-if="stepsNum === 3" ref="contentStepThree" :buildingProjectId="buildingProjectId" @refreshinfoFun="refreshinfoFun" @changeLoading="changeLoading"></content-step-Three>
		<template slot="footer">
			<label
				class="config_lbl_css"
				@click="goConfig"
				v-if="stepsNum === 1 || stepsNum === 2"
			>
				保存并去{{ stepsNum === 1 ? "配置房间" : "完善推广信息" }}
			</label>
			<a-button
				class="save_btn_css"
				key="submit"
				type="primary"
				:loading="loading"
				@click="handleOk"
			>
				保存
			</a-button>
		</template>
	</a-modal>
</template>
<script>
	import TitleSteps from "./TitleSteps";
	import contentStepOne from "./contentStepOne";
	import contentStepTwo from "./contentStepTwo";
	import contentStepThree from "./contentStepThree";
	export default {
		name: "AddCentralizedDialog",
		components: {
			TitleSteps,
			contentStepOne,
			contentStepTwo,
			contentStepThree
		},
    props: {
        currentBuildingProjectId: {
            type: String,
        },
      defaultStepsNum:{
          type:Number,
        default:1,
      }
    },
		data() {
			return {
				stepsNum: 1,
				loading: false,
				visible: true,
                buildingProjectId:"",
			};
		},
		mounted() {},
    created() {
        this.buildingProjectId = this.currentBuildingProjectId;
        this.stepsNum = this.defaultStepsNum;
    },
		methods: {
      changeLoading(val){
        this.loading = val;
      },
      refreshinfoFun(){
          this.$emit('refreshinfoFun',true);
      },
			onCancel() {
				this.$emit("cancel-dig");
			},
      initBuildingProjectId(value){
          this.buildingProjectId = value;
      },
			handleOk() {
          let flag = true;  //同意跳转
			    if( this.stepsNum == 1 ) {
            if(this.buildingProjectId == ""){
                //新增或者修改
                flag = this.$refs.contentStepOne.houseCentralizedAdd();
            }else{
                flag = this.$refs.contentStepOne.houseCentralizedEdit();
            }
          }
          else if(this.stepsNum == 2){
              flag = this.$refs.contentStepTwo.configRooms(true);
          }
          else if(this.stepsNum == 3){
              flag = this.$refs.contentStepThree.projectExtendInfoAdd();
          }
			},
			goConfig() {
			    let flag = true;  //同意跳转
          if(this.stepsNum == 1){
              if(this.buildingProjectId == ""){
                  //新增或者修改
                  flag = this.$refs.contentStepOne.houseCentralizedAdd();
              }else{
                  flag = this.$refs.contentStepOne.houseCentralizedEdit();
              }
          }
          else if(this.stepsNum == 2){
              flag =  this.$refs.contentStepTwo.configRooms(false);
          }
          else{
              this.$emit("cancel-dig");
          }
          if(this.stepsNum == 1 && this.buildingProjectId == ""){
              if(flag){
                  this.stepsNum++;
              }
          }else {
              if (flag) {
                  this.stepsNum++;
              }
          }
			},
      changeStepsNum(value){
          this.stepsNum = value;
      }
		}
	};
</script>
<style lang='less'>
.add_centralized_modal_css {
	.ant-modal-body {
		height: calc(100vh - 150px);
		overflow: hidden;
		padding: 20px 0;
	}
}
</style>
<style scoped lang="less">
.add_title_css {
	color: @themeColor;
}
.config_lbl_css {
	margin-right: 10px;
	color: @themeColor;
	font-size: 16px;
	cursor: pointer;
}
.save_btn_css {
	width: 120px;
	height: 40px;
	line-height: 40px;
}
</style>
