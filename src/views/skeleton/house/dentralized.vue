<template>
    <div id="centralized">
        <content-main>
            <div class="dentralized">
                <div style="height: 336px;border-bottom: 1px solid #EEEEEE">
                    <div class="clearfix">
                        <div class="bgColorStyle animate-box f-fl" style="width: 488px;height: 22px;"></div>
                        <div class="bgColorStyle animate-box f-fr" style="width: 165px;height: 22px;"></div>
                    </div>
                    <div class="bgColorStyle animate-box" style="margin-top:10px;width: 355px;height: 32px;"></div>
                    <div class="clearfix" style="margin-top:10px;">
                        <div class="bgColorStyle animate-box f-fl" style="width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-left:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-left:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-left:10px;width: 198px;height: 90px;"></div>
                    </div>
                    <div class="bgColorStyle animate-box" style="margin-top:20px;width: 355px;height: 32px;"></div>
                    <div class="clearfix" style="margin-top:10px;">
                        <div class="bgColorStyle animate-box f-fl" style="width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-left:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-left:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-left:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-left:10px;width: 198px;height: 90px;"></div>
                    </div>
                </div>
                <div style="height: 336px;margin: 20px 0 27px 0">
                    <div class="clearfix">
                        <div class="bgColorStyle animate-box f-fl" style="width: 488px;height: 22px;"></div>
                        <div class="bgColorStyle animate-box f-fr" style="width: 165px;height: 22px;"></div>
                    </div>
                    <div class="bgColorStyle animate-box" style="margin-top:10px;width: 355px;height: 32px;"></div>
                    <div class="clearfix" style="margin-top:10px;">
                        <div class="bgColorStyle animate-box f-fl" style="width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-left:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-left:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-left:10px;width: 198px;height: 90px;"></div>
                    </div>
                    <div class="bgColorStyle animate-box" style="margin-top:20px;width: 355px;height: 32px;"></div>
                    <div class="clearfix" style="margin-top:10px;">
                        <div class="bgColorStyle animate-box f-fl" style="width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-left:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-left:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-left:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-left:10px;width: 198px;height: 90px;"></div>
                    </div>
                </div>
            </div>
        </content-main>
    </div>
</template>
<script>
    export default {
        name: "centralized",
        components: {},
        data(){
            return {
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped lang="less">
    .dentralized{
        min-height: calc(100% - 24px);
        .bgColorStyle{
            background:rgba(244,245,247,1);
        }
        .animate-box{
            flex-wrap: wrap;
            animation: skeleton-blink 1.2s ease infinite;
            -webkit-animation: skeleton-blink 1.2s ease infinite;
            background-image: -webkit-gradient(linear, left top, right top, color-stop(25%, #f0f0f0), color-stop(37%, #e3e3e3), color-stop(63%, #f0f0f0));
            background-image: -o-linear-gradient(left, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
            background-image: linear-gradient(90deg, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
            background-size: 400% 100%;
        }
        @-webkit-keyframes skeleton-blink {
            0% {
                background-position: 100% 50%
            }

            to {
                background-position: 0 50%
            }
        }
        @keyframes skeleton-blink {
            0% {
                background-position: 100% 50%
            }

            to {
                background-position: 0 50%
            }

        }
    }
</style>
