<template>
    <div class="closeSourceBox clearfix">
        <div class="close-source-detail">
            <div class="sign-type clearfix">
                <div class="i-sign f-fl cursor" :class="closeSourceForm.status==2?'clickBg':'unClickBg'" @click="changeSignType(2)">我签</div>
                <div class="she-sign f-fl cursor" :class="closeSourceForm.status==3?'clickBg':'unClickBg'" @click="changeSignType(3)">被他人签</div>
                <div class="valid f-fl cursor" :class="closeSourceForm.status==4?'clickBg':'unClickBg'" @click="changeSignType(4)">无效</div>
            </div>
            <div class="sign-date" v-if="closeSourceForm.status==2||closeSourceForm.status==3">
                <div class="warnning">选择完整的签约周期，系统会自动提前30天提醒您</div>
                <div class="contentSlot">
                        <div class="sign-date-title">签约周期：</div>
                        <div class="contract-times">
                            <div class="text-date-picker u-no-border address">
                                <a-date-picker v-model="closeSourceForm.signedBeginTime" :format="dateFormat" placeholder="开始时间" @openChange="handleStartOpenChange"/>
                            </div>
                        </div>
                        <div class="contract-times">
                            <div class="text-date-picker u-no-border address">
                                <a-date-picker v-model="closeSourceForm.signedEndTime" :format="dateFormat" placeholder="结束时间" :open="endOpen" @openChange="handleEndOpenChange" />
                            </div>
                        </div>
                        <div class="spiltStyle">
                            -
                        </div>
                        <ul class="year-radio">
                            <li @click="quickSelectYear(1);">1年</li>
                            <li @click="quickSelectYear(2);">2年</li>
                            <li @click="quickSelectYear(3);">3年</li>
                            <li @click="quickSelectYear(5);">5年</li>
                        </ul>
                    </div>
            </div>
            <div class="sign-reason">
                <label-item title="关闭原因" class="u-bottom-border" :valLength="closeSourceForm.closingReason.length" :maxSize="200">
                    <a-textarea v-model="closeSourceForm.closingReason"
                                maxlength="200"
                                placeholder="请输入"
                                :autosize="{ minRows: 1, maxRows: 5 }"
                    />
                </label-item>
            </div>
        </div>
        <div class="buttonDiv f-fr">
            <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelCloseSource">
                取消
            </a-button>
            <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="closeSource">
                保存
            </a-button>
        </div>
    </div>
</template>

<script>
    import  * as API from '@/api/source';
    import moment from 'moment';
    export default {
        name: "shareSource",
        props: {
            sourceId:{
                type: String,
                required:true,
            }
        },
        data() {
            return {
                styleHeightLow:true,
                dateFormat: 'YYYY.MM.DD',           //日期选择器格式
                closeSourceForm:{
                    closingReason:'',
                    id:'',
                    signedBeginTime:undefined,
                    signedEndTime:undefined,
                    status:2,
                },
                endOpen:false,
            }
        },
        methods: {
            handleStartOpenChange(open) {
                if (!open&&!this.closeSourceForm.signedEndTime) {
                    this.endOpen = true;
                }
            },
            handleEndOpenChange(open) {
                this.endOpen = open;
            },
            changeSignType(value){
                this.closeSourceForm.status = value;
                if(value == 4){
                    this.closeSourceForm.signedBeginTime=undefined;
                    this.closeSourceForm.signedEndTime=undefined;
                }
            },
            quickSelectYear(year) {
                if (this.closeSourceForm.signedBeginTime) {
                    let start = this.$moment(this.closeSourceForm.signedBeginTime).format('YYYY-MM-DD').split('-');
                    let yue = start[1];
                    let nian = start[0] * 1 + year;
                    yue = start[1] * 1 ;
                    if (yue > 12) {
                        yue = yue - 12;
                        nian = nian + 1;
                    }
                    let endString = nian + '/' + yue + '/' + start[2];
                    let end = new Date(endString);
                    end = end.getTime() - 86400000;
                    this.closeSourceForm.signedEndTime = this.$moment(end);
                    let data = []
                    data.push(moment(this.closeSourceForm.signedBeginTime));

                    data.push(moment(this.closeSourceForm.signedEndTime));
                } else {
                    this.$message.error('请先选择一个开始日期');
                }
            },
            handleChange(value) {
                console.log(`Selected: ${value}`);
            },
            popupScroll() {
                console.log('popupScroll');
            },
            selectChangeStyle(showSelect){
                if(showSelect){
                    this.styleHeightLow = false;
                } else{
                    this.styleHeightLow = true;
                }
            },
            cancelCloseSource(){
                this.$emit('cancelCloseSource');
            },
            closeSource(){
                this.closeSourceForm.id = this.sourceId;
                API.ownerClueClose(this.closeSourceForm).then(res=>{
                    if (res.code === '200') {
                        this.$message.success('关闭成功');
                    } else {
                        this.$message.success('关闭失败');
                    }
                    this.$emit('successCloseSource');
                })
            },
        }
    }
</script>

<style scoped lang="less">
    .closeSourceBox{
        .close-source-detail {
            .sign-type{
                padding: 16px 0 10px 20px;
                .unClickBg{
                    color: #777777;
                    background: #FFFFFF;
                    border: 1px solid #DDDDDD;
                }
                .clickBg{
                    color: #FFFFFF;
                    background: #0A87F8;
                    border: 1px solid #0A87F8;
                }
                .i-sign{
                    width: 88px;
                    height: 35px;
                    line-height: 35px;
                    text-align: center;
                    border-radius:2px 0px 0px 2px;
                }
                .she-sign{
                    width: 88px;
                    height: 35px;
                    text-align: center;
                    line-height: 35px;
                }
                .valid{
                    width: 88px;
                    height: 35px;
                    line-height: 35px;
                    text-align: center;
                    border-radius:0px 2px 2px 0px;
                }
            }
            .sign-date{
                width: 489px;
                background: #EEEEEE;
                margin-left: 20px;
                .warnning{
                    padding-left: 10px;
                    padding-top: 18px;
                    height:17px;
                    line-height: 17px;
                    font-size:12px;
                    color: #FFA036;
                }
                .contentSlot {
                    padding-left: 10px;
                    padding-top: 22px;
                    padding-bottom: 14px;
                    display: flex;
                    align-items: center;
                    position: relative;
                    .spiltStyle{
                        position: absolute;
                        top:26px;
                        left: 180px;
                    }
                    .sign-date-title{
                        display: flex;
                    }
                    .contract-times {
                        width: 103px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        & /deep/ .text-date-picker {
                            width: 100%;
                            line-height: 1;
                            .ant-calendar-picker-input{
                                height: 30px;
                                padding-left: 10px;
                            }
                            .ant-calendar-range-picker-input {
                                text-align: left; // font-size:12px;
                            }
                            .ant-calendar-picker-icon {
                                display: none;
                            }
                            .ant-calendar-range-picker-separator {
                                line-height: 30px;
                            }
                        }
                        &>span {
                            width: 10%;
                            text-align: left;
                        }
                    }
                    .year-radio {
                        display: flex;
                        flex-wrap: nowrap;
                        justify-content: space-between;
                        li {
                            width: 42px;
                            height: 30px;
                            line-height: 25px;
                            text-align: center;
                            border: 1px solid #e2e2e2;
                            padding: 2px 0;
                            border-radius: 3px;
                            cursor: pointer;
                            margin-left: 2px;
                            font-size: 12px;
                            background: rgba(246, 247, 248, 1);
                        }
                        .active {
                            background: rgba(22, 213, 173, 0.1);
                        ;
                            color: #0A87F8;
                            border: 1px solid #0A87F8;
                        }
                    }
                    .common-time {
                        position: absolute;
                        top: 2px;
                        right: 10px;
                        z-index: 2;
                        font-size: 12px;
                    }
                }
            }
            .sign-reason{
                margin: 20px 20px 0 20px;
            }
        }
        .buttonDiv {
            margin-right: 20px;
            .formItemMarginButton {
                width: 120px;
                height: 40px;
                margin-left: 18px;
                margin-top: 30px;
                margin-bottom: 20px;
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
