<template>
	<div class="steps_title_css">
		<div class="title_row">
        <div class="step_item_1" :class="{ stepsBorderNum: steps >= 1 }">
            <span class="stepIcon cursor" :class="{ stepNum: steps >= 1 }">
                <label>1</label>
            </span>
        </div>
        <div class="step_item_2" :class="{ stepsBorderNum: steps >= 2 }">
            <span class="stepIcon cursor" :class="{ stepNum: steps >= 2 }">
                <label>2</label>
            </span>
        </div>
		</div>
		<div class="step_mian_css">
			<div :class="{ stepsNum: steps >= 1 }" >
        输入闲鱼淘宝会员名
			</div>
			<div :class="{ stepsNum: steps >= 2 }" >
        使用闲鱼APP扫码授权绑定
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "OpenXyTitle",
		props: {
			steps: {
				type: Number,
				default: 1
			},
		},
		data() {
			return {};
		},
		created() {},
		mounted() {},
		methods: {
    },
	};
</script>
<style lang='less' scoped>
.steps_title_css {
	margin: 0 auto;
	position: relative;
	overflow: hidden;
	width: 70%;
	padding: 25px 0 20px;
    height: 101px;
	.title_row {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0 0 8px;
        & > div {
            width: calc(50% - 10em);
            display: flex;
            justify-content: center;
            align-items: center;
        }
		.stepIcon {
			border: 1px solid @placeholderColor;
			border-radius: 100%;
			width: 24px;
			height: 24px;
			background: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			& > label {
				background: @placeholderColor;
				width: 20px;
				height: 20px;
				border-radius: 100%;
				color: #fff;
				text-align: center;
				line-height: 19px;
				font-size: 14px;
			}
		}
      .step_item_1 {
        &::before {
        width: 25%;
        left: 100px;
        height: 0;
        position: absolute;
        border-top: 1px solid @placeholderColor;
        content: "";
      }
      &::after {
        width: 25%;
        left: 100px;
        height: 0;
        position: absolute;
        border-top: 1px solid @placeholderColor;
        content: "";
      }
    }
    .step_item_2 {
      &::before {
        width: 25%;
        left: 100px;
        height: 0;
        position: absolute;
        border-top: 1px solid @placeholderColor;
        content: "";
      }
      &::after {
        width: 25%;
        right: 100px;
        height: 0;
        position: absolute;
        border-top: 1px solid @placeholderColor;
        content: "";
      }
    }
    .stepNum {
      color: @themeColor!important;
      border: 1px solid @themeColor !important;
      & > label {
        background: @themeColor!important;
      }
    }
    .stepsBorderNum{
      color: @themeColor!important;
      &::before,
      &::after {
        border-top: 1px solid @themeColor !important;
        z-index:99;
      }
    }
	}
	.step_mian_css {
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: relative;
		overflow: hidden;
		& > div {
			position: relative;
			overflow: hidden;
			flex-grow: 1;
			text-align: center;
			font-size: 14px;
			color: @placeholderColor;
		}
		.stepsNum {
			color: @themeColor!important;
		}
	}
}
</style>
