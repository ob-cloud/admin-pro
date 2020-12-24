<template >
	<div
		class="room_type_box_css"
		:class="{ checkCss: isCheck }"
		:style="'width:' + width"
	>
		<div class="item_row1">
			<span class="itemtype">{{ tipName || "房型名称" }}</span>
			<icon-font type="iconyumengtubiao_bianji-" class="edit_icon cursor" @click="editRoomType"/>
			<icon-font type="iconyumengtubiao_shanchu-" class="del_icon" @click="deleteRoomType"/>
		</div>
		<div class="item_row2">
            <div class="overHidde">{{ name }}</div>
		</div>
	</div>
</template>
<script>
    import * as API from '@/api/centralizedHouse';
	export default {
		name: "RoomTypeBox",
		props: {
			name: {
				//类房型的名称：精装一居，精装二局等
				type: String,
				required: true
			},
			id: {
				//组件的标识，一个页面多个区域调用时需传递，将会在回调函数中返回给父级时间
				type: String,
				default: ""
			},
			tipName: {
				//房型名称灰色标题
				type: String,
				default: ""
			},
			isCheck: {
				type: Boolean,
				default: false
			},
			width: {
				type: String,
				default: "100%"
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
            editRoomType() {
                this.$emit('editRoomType', this.id);
            },
            deleteRoomType() {
                let that = this;
                this.$modal.confirm({
                    title: '确认删除房型 「'+this.name+ '」吗？',
                    content: '删除后将不可恢复',
                    width:"433px",
                    height:"192px",
                    okText: '确认',
                    cancelText: '取消',
                    icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
                    onOk() {
                        API.roomTypeDelete(that.id).then(res => {
                            if (res.code == "200") {
                                that.$message.info('删除成功');
                                that.$emit('initPage');
                            }else{
                                that.$message.info('删除失败');
                            }
                        });
                    },
                    onCancel() {
                    },
                });
            },
        },
		activated() {},
		deactivated() {},
		beforeDestroy() {}
	}
</script>
<style lang="less" scoped>
.checkCss {
	border: 1px solid @themeColor !important;
}
.room_type_box_css {
	border: 1px solid @borderColor;
	background: #fff;
	position: relative;
	overflow: hidden;
	padding: 8px;
	width: 100%;
	border-radius: 4px;
	margin-bottom: 10px;
	.item_row1 {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		& > span {
			flex-grow: 1;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-size: 12px !important;
			color: @secondaryFontColor !important;
		}

		& > i {
			margin-left: 3px;
			font-size: 14px;
			cursor: pointer;
			flex-shrink: 0;
		}
		.edit_icon {
			color: #0A87F8;
		}
		.del_icon {
			color: @wranColor;
		}
	}
	.item_row2 {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 6px 0 0;
		min-height: 1em;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-weight: bold;
		line-height: 1;
		font-size: 14px !important;
		color: @mainFontColor !important;
		font-weight: bold;
	}
}
</style>
