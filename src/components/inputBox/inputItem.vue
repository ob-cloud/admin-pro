<template>
	<!-- 输入框方块  注:非必要情况下切勿修改此模板，请使用 deep 语法修改样式  -->
	<div
		class="form-input-item"
		:style="{ width: width, height: height, marginRight: right }"
	>
		<div class="input-item-box">
			<span class="input-item-label">{{ title }}</span>
			<span class="must-tips" v-if="must">*</span>
			<span class="input-item-text" v-if="tipTxt">{{ tipTxt }}</span>
		</div>
		<div class="slot-content">
			<slot name="content"></slot>
		</div>
        <div v-if="required" class="must-tips-text">&nbsp;{{ error }}</div>
	</div>
</template>

<script>
	import { create } from "domain";
	export default {
		name: "inputItem",
		props: {
			title: {
				Type: String,
				default: "标题"
			},
			tipTxt: {
				Type: String,
				default: ""
			},
			must: {
				Type: Boolean,
				default: false
			},
			required: {
				Type: Boolean,
				default: false
			},
			error: {
				Type: String,
				default: "请输入..."
			},
			right: {
				Type: String,
				default: "26px"
			},
			width: {
				Type: String,
				default: "267px"
			},
			height: {
				Type: String,
				default: "50px"
			}
		},
		data() {
			return {};
		},
		create() {}
	};
</script>

<style lang="less" scoped>
.form-input-item {
	min-height: 50px;
	padding: 0;
	position: relative;
	background-color: #fff;
	flex-shrink: 0;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	margin-bottom: 20px;
	.input-item-box {
		line-height: 1;
		position: relative;
		overflow: hidden;
	}
	.must-tips {
        color: red;
        vertical-align: middle;
        font-size: 12px;
        padding-left: 5px;
	}
    .must-tips-text {
        position: absolute;
        color: red;
        vertical-align: middle;
        font-size: 12px;
        bottom: -20px;
    }
	.input-item-label {
		font-size: 12px;
		color: @secondaryFontColor;
	}
	.input-item-text {
		color: @placeholderColor;
		font-size: 12px;
	}
	.slot-content {
		font-size: 14px;
		color: #777;
		line-height: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		& /deep/ .ant-input {
			border: none;
			box-shadow: none;
			border-bottom: 1px solid @borderColor;
			border-radius: 0;
			font-size: 14px;
			color: @mainFontColor;
			padding-left: 0;
			&:focus {
				border-bottom: 1px solid @themeColor;
			}
		}
		& /deep/ .ant-input-affix-wrapper {
			.ant-input-prefix {
				left: 0;
			}
			.ant-input-suffix {
				right: 0;
			}
		}
		& /deep/ .ant-select {
			border: none;
			box-shadow: none;
			border-radius: 0;
			.ant-select-selection {
				border: none;
				box-shadow: none;
				border-bottom: 1px solid @borderColor;
				border-radius: 0;
				font-size: 14px;
				color: @mainFontColor;
				.ant-select-selection__rendered {
					margin-left: 0;
				}
			}
		}
	}
}
</style>

