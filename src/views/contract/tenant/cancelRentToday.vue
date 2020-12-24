<template>
    <!-- 今天确认 -->
    <div class="cancelRentToday-box">
        <div class="line1 clearfix">
            <div class="line1-line1 f-fl"><div style="text-align: center">?</div></div>
            <div class="line1-line2 f-fl">
                <span>系统自动检测到此合同为今日新签</span>
            </div>
        </div>
        <div class="line2">
          您是不是想操作「作废」合同
        </div>
        <div class="line4">
            <a-button size="large" class="formItemMarginButton cancelFont" @click="goToCancelRent">
                继续退租
            </a-button>
            <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="goToVoid">
                去作废
            </a-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cancelRentToday",
        props: {
          cancelRentTodayRecord:{
            Type:Object,
          },
          cancelRentFlag:{
            Type:Boolean,
          }
        },
        components: {
        },
        data() {
            return {
            };
        },
        created: function () {
        },
        methods: {
          goToCancelRent(){
            this.$emit('goToCancelRent',this.cancelRentTodayRecord);
          },
          goToVoid(){
            if(!this.cancelRentFlag){
              this.$message.warning('您没有作废合同的权限，请联系管理员处理');
              return ;
            }
            this.$emit('goToVoid',this.cancelRentTodayRecord);
          },
        },
    };


</script>

<style lang="less" scoped>
    .cancelRentToday-box{
        background:rgba(255,255,255,1);
        width: 520px;
        padding: 20px;
        .line1{
            height: 24px;
            line-height: 24px;
            .line1-line1{
                width: 22px;
                height: 22px;
                background-color: #FAAD14;
                color: #FFFFFF;
                border-radius: 50%;
            }
            .line1-line2{
                padding-left: 10px;
                color: #111111;
                font-size: 16px;
                font-weight: 500;
            }
        }
        .line2{
            width: 100%;
            padding:8px 6px 0 32px;
        }
        .line3{
            width: 448px;
            height: 172px;
            background: #F7F8FB;
            margin: 20px 0 20px 32px;
            padding: 15px;
            .line3-line1{
                .line3-yanzheng{
                    color: #111111;
                    font-weight:400;
                    font-size: 16px;
                }
                .line3-phone{
                    color: #777777;
                    font-weight:400;
                    font-size: 16px;
                    margin-left: 15px;
                }
            }
            .border_blue{
                border: 1px solid #0A87F8;
            }
            .border_dddddd{
                border: 1px solid #DDDDDD;
            }
            .line3-line2{
                margin-top: 12px;
                /deep/ .drag_verify{
                    border-radius: 4px;
                    color: #111111!important;
                }
                /deep/ .drag_verify .dv_handler {
                    width: 40px !important;
                    height: 40px !important;
                    margin-top: -1px;
                    border: 1px solid #dddddd;
                }
                /deep/ .dv_handler_ok_bg {
                    background: #0A87F8!important;
                }
                /deep/ .drag_verify .dv_handler_ok_bg i{
                    color: #FFFFFF;
                }
                /deep/ .dv_text {
                    color: #111111!important;
                }
            }
            .line3-line3 {
                margin-top: 15px;
                width: 418px;
                height: 38px;
                line-height: 38px;
                background-color: #FFFFFF;
                .part_value {
                    .input_wrap {
                        width: 300px;
                    }
                    .verification {
                        height: 38px;
                        line-height: 38px;
                        width: 100px;
                        color: #999999;
                        cursor: pointer;
                        text-align: center;
                    }

                    .isPass {
                        color: #0A87F8;
                    }

                    .eyes_wrap {
                        text-align: right;
                        // padding-right: 30px;
                    }
                }
            }
        }
        .line4 {
            text-align: right;
            .formItemMarginButton {
                width: 120px;
                height: 40px;
                margin-left: 18px;
                margin-top: 50px;
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