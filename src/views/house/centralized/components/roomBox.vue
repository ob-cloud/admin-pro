<template >
	<div
		class="room_box_css cursor"
		:class="{ checkCss: isCheck, isClose: currentIsClose === 2 }"
		:style="'width:' + width"
        @mouseenter="itemEnter()" @mouseleave="itemLeave()" @click="selectOneRoom">
		<div class="item_row1">
			<span>{{ name }}</span>
            <div v-show="isCheck">
                <icon-font type="iconyumengtubiao_xuanzhong-1" class="checked_icon"/>
            </div>
            <div v-show="iconView">
                <div v-show="currentIsClose==1">
                    <icon-font type="iconyumengtubiao_jinyong" class="close_icon cursor" @click.stop="housePubOpenClose"/>
                    <icon-font type="iconyumengtubiao_guanbi-3" class="del_icon cursor" @click.stop="housePubDeleteRoom"/>
                </div>
                <div v-show="currentIsClose==2">
                    <icon-font type="iconyumengtubiao_jihuo" class="edit_icon cursor" @click.stop="housePubOpenClose"/>
                    <icon-font type="iconyumengtubiao_guanbi-3" class="del_icon cursor" @click.stop="housePubDeleteRoom"/>
                </div>
            </div>
		</div>
		<div class="item_row2">
			{{ tipName }}
		</div>
	</div>
</template>
<script>
    import  * as API from '@/api/centralizedHouse';
	export default {
		name: "RoomBox",
		props: {
			name: {
				//代表房间的编号：102、203等
				type: String,
				required: true
			},
			id: {
				//组件的标识，一个页面多个区域调用时需传递，将会在回调函数中返回给父级时间
				type: String,
				default: ""
			},
			isClose: {
				//isClose===1:正常
				//isClose===2:禁用
				type: Number,
				default: 1
			},
			tipName: {
				//代表 房间类型的灰色提示标签
				type: String,
				default: ""
			},
			isCheck: {
				type: Boolean,
				default: false
			},
			width: {
				type: String,
				default: "110px"
			}
		},
		components: {},
		data() {
			return {
			    currentIsClose:1,
			    iconView:false,
            };
		},
		created() {
		    this.currentIsClose = this.isClose;
        },
		beforeMount() {},
		mounted() {},
		computed: {},
		watch: {},
		methods: {
            itemEnter(){
                this.iconView = true;
            },
            itemLeave(){
                this.iconView = false;
            },
            selectOneRoom(){
                this.$emit('selectOneRoom',this.id,this.name);
            },
            housePubOpenClose(){
                let parameter = {};
                parameter.housePid = this.id;
                parameter.op = this.currentIsClose == 1?2:1;
                API.housePubEnableDisable(parameter).then(res => {
                    if (res.code == "200") {
                        this.$message.info(this.currentIsClose == 1?'禁用成功':'启用成功');
                        this.currentIsClose = parameter.op;
                    }else{
                        this.$message.info(this.currentIsClose == 1?'禁用失败':'启用失败');
                    }
                })
            },
            housePubDeleteRoom(){
                let that = this;
                this.$modal.confirm({
                    title: '删除',
                    content: '确认删除房间 「'+this.name+ '」吗？',
                    width:"433px",
                    height:"192px",
                    okText: '确认',
                    cancelText: '取消',
                    icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
                    onOk() {
                        API.housePubDeleteRoom(that.id).then(res => {
                            if (res.code == "200") {
                                that.$message.info('删除成功');
                                that.$emit('listFloorRoom');
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
	};
</script>
<style lang="less" scoped>
.checkCss {
	border: 1px solid @themeColor !important;
}
.isClose {
	background: @bigBackgroundColor !important;
}
.room_box_css {
	border: 1px solid @borderColor;
	background: #fff;
	position: relative;
	overflow: hidden;
	padding: 6px 8px;
	border-radius: 4px;
	margin-bottom: 10px;
    height: 50px;
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
			font-size: 14px !important;
			color: @mainFontColor !important;
		}

		& > i {
			margin-left: 3px;
			font-size: 14px;
			flex-shrink: 0;
			color: @themeColor;
			cursor: pointer;
		}
		.close_icon {
			color: @placeholderColor !important;
		}
        .edit_icon{
            color: @themeColor !important;
        }
        .checked_icon{
            color: @themeColor !important;
        }
		.del_icon {
			color: @wranColor !important;
		}
	}
	.item_row2 {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 3px 0 0;
		min-height: 1em;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-height: 1;
		font-size: 12px !important;
		color: @secondaryFontColor !important;
	}
}
</style>
