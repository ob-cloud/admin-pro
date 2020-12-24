<template >
	<div class="add_box_css cursor" :style="buildingProjectId?'height:50px;':'height:56px;margin-top:10px;margin-left: 10px;'" @click="addBuildingHouseRoom">
		<icon-font type="iconyumengtubiao_tianjia" />
	</div>
</template>
<script>
    import  * as API from '@/api/centralizedHouse';
	export default {
		name: "AddBox",
		props: {
			height: {
				type: String,
				default: "50px"
			},
            buildingProjectId: {
                //楼盘id
                type: String,
                default: ""
            },
            floorNo: {
                //楼层
                type: String,
                default: ""
            },
            typeFlag:{
                type: Number,
                default: 1,
            },
			width: {
				type: String,
				default: "110px"
			}
		},
		components: {},
		data() {
			return {};
		},
		created() {},
		beforeMount() {},
		mounted() {},
		computed: {},
		watch: {},
		methods: {
            addBuildingHouseRoom(){
                if(this.typeFlag == 1) {
                    let parameter = {};
                    parameter.buildingProjectId = this.buildingProjectId;
                    parameter.floorNo = this.floorNo;
                    API.addBuildingHouseRoom(parameter).then(res => {
                        if (res.code == "200") {
                            this.listFloorRoomData = res.data;
                            this.$emit('initPage');
                        }
                    });
                }
                else if(this.typeFlag == 2){
                    this.$emit('openAddRoomType');
                }
            },
        },
		activated() {},
		deactivated() {},
		beforeDestroy() {}
	};
</script>
<style lang="less" scoped>
.add_box_css {
	border: 1px dashed @placeholderColor;
	padding: 10px;
	width: 112px;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	position: relative;
	background: #fff;
	border-radius: 4px;
	margin-bottom: 10px;
	cursor: pointer;
	i {
		font-size: 18px;
		color: @themeColor;
	}
}
</style>
