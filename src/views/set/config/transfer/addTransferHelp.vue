<template>
    <div class="service-agreement-box">
        <div class="title">查看支付宝PID获取流程</div>
        <div class="content">
            <div class="content-follow clearfix">
                <div class="content-follow-left f-fl">
                    <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">1</div>
                    <div class="content-follow-left-line" style="height: 78px;"></div>
                </div>
                <div class="content-follow-right f-fl">
                    <div style="width: 100%;color: #111111;font-size: 14px;margin-top: 2px;">复制支付宝蚂蚁金服地址进入支付宝账户</div>
                    <div style="width: 100%">
                        <div class="clearfix" style="width: 460px;height:38px;line-height:38px;background:rgba(247,248,251,1);border-radius:4px;padding-left: 10px;margin-top: 12px;">
                            <div class="f-fl">https://open.alipay.com/platform/home.htm</div>
                            <div @click="_copy('https://open.alipay.com/platform/home.htm')" class="f-fr cursor" style="margin-right: 20px;color: #0A87F8;font-size: 16px;">复制</div>
                            <div class="f-fr" style="width:1px;height:24px;background-color: #EEEEEE;margin-right: 20px;margin-top: 7px;"></div>
                        </div>
                    </div>
                    <div style="height: 30px;width: 100%">

                    </div>
                </div>
            </div>
            <div class="content-follow clearfix">
                <div class="content-follow-left f-fl">
                    <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">2</div>
                    <div class="content-follow-left-line" style="height: 200px;"></div>
                </div>
                <div class="content-follow-right f-fl">
                    <div style="width: 100%;color: #111111;font-size: 14px;margin-top: 2px;">使用支付宝扫码登录</div>
                    <div class="cursor" style="width: 100%;margin: 10px 0 20px 0;" @click="handlePreview(1)">
                        <img src="../../../../assets/alipay/alipay_help1.jpg" style="width: 460px;height: 160px;">
                    </div>
                </div>
            </div>
            <div class="content-follow clearfix">
                <div class="content-follow-left f-fl">
                    <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">3</div>
                    <div class="content-follow-left-line" style="height: 320px;"></div>
                </div>
                <div class="content-follow-right f-fl">
                    <div style="width: 100%;color: #111111;font-size: 14px;margin-top: 2px;">加入开放平台，选择自研开发服务</div>
                    <div class="cursor" style="width: 100%;margin: 10px 0 50px 0; " @click="handlePreview(2)">
                        <img src="../../../../assets/alipay/alipay_help2.png" style="width: 460px;height: 262px;">
                    </div>
                </div>
            </div>
            <div class="content-follow clearfix">
                <div class="content-follow-left f-fl">
                    <div class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;">4</div>
                </div>
                <div class="content-follow-right f-fl">
                    <div style="width: 100%;color: #111111;font-size: 14px;margin-top: 2px;">加入成功，进入支付宝开放平台首页，选择"账户中心"；在合作伙伴管理目录下的角色身份中复制PID信息</div>
                    <div class="cursor" style="width: 100%;margin: 10px 0 40px 0;" @click="handlePreview(3)">
                        <img src="../../../../assets/alipay/alipay_help3.png" style="width: 701px;height: 203px;">
                    </div>
                </div>
            </div>
        </div>
        <div class="footer cursor" @click="closeThis">我知道了</div>
        <!-- 预览图片 -->
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="cancelPreviewImage">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
    export default {
        name: 'serviceAgreement',
        components: {},
        props: {
        },
        data() {
            return {
                previewVisible:false,
                previewImage: '',
            };
        },
        created() {
        },
        methods: {
            cancelPreviewImage() {
                this.previewVisible = false;
            },
            handlePreview(val) {
                let url='';
                if(val==1){
                    url = 'https://oss.byteox.com/byteox/2020-07-27/f598f8875f6f4994946d273b6b056dbb.jpg';
                }
                else if(val==2){
                    url = 'https://oss.byteox.com/byteox/2020-07-09/c34067606bb7497c93435e2ccb029e65.png';
                }
                else if(val==3){
                    url = 'https://oss.byteox.com/byteox/2020-07-09/1afccebfb65247e0a2b02d946dd62eb1.png';
                }
                // this.previewImage = url;
                // this.previewVisible = true;
                window.open(url);
            },
            closeThis(){
                this.$emit('closeThis');
            },
            _copy(txt){
                var oInput = document.createElement('input');
                oInput.value =  txt ;
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象
                document.execCommand('Copy'); // 执行浏览器复制命令
                oInput.className = 'oInput';
                oInput.style.display = 'none';
                this.$message.info('复制成功');
            },
        },
        watch: {
        }
    };
</script>

<style lang="less" scoped>
    .service-agreement-box {
        width: 100%;
        height: calc(100vh - 100px);
        .title{
            margin-bottom: 24px;
            color: #111111;
            font-size:22px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            text-align: center;
        }
        .content{
            height: calc(100vh - 210px);
            overflow: auto;
            padding:0 5px 0 5px;
            color: #111111;
            font-size: 14px;
            line-height: 20px;
            width: 100%;
            .content-follow{
                width: 100%;
                .content-follow-left{
                    width: 24px;
                    .radius-font {
                        width: 24px;
                        height: 24px;
                        line-height: 24px;
                        border-radius: 50%;
                        font-size:16px;
                        text-align: center;
                    }
                    .content-follow-left-line{
                        margin: 0 0 0 12px;
                        height: 47px;
                        border-left: 0.5px dashed #AED4F5;
                    }
                }
                .content-follow-right{
                    margin-left: 10px;
                    .follow-right-line-one{
                        .name{
                            font-size: 14px;
                            color: #111111;
                            font-weight:400;
                        }
                        .date{
                            color: #777;
                            font-size: 12px;
                        }
                    }
                    .follow-right-line-two{
                        font-size: 13px;
                        color: #999999;
                    }
                    .follow-info{
                        margin-top: 6px;
                        width: 269px;
                        min-height: 29px;
                        line-height:29px;
                        background-color: rgba(247,248,251,1);
                    }
                }
            }
        }
        .footer{
            text-align: center;
            margin-top: 30px;
            color: #0A87F8;
            font-size: 18px;
        }
    }
</style>

