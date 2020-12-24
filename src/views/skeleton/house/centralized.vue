<template>
    <div id="centralized">
        <content-main>
            <div class="centralized">
                <div style="border-bottom: 1px solid #EEEEEE;padding-bottom: 5px;">
                    <div class="bgColorStyle animate-box" style="width: 99px;height: 22px;"></div>
                    <div class="clearfix" style="margin-top: 13px">
                        <div class="bgColorStyle animate-box f-fl" style="margin-right:10px;margin-bottom:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-right:10px;margin-bottom:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-right:10px;margin-bottom:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-right:10px;margin-bottom:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-bottom:10px;width: 198px;height: 90px;"></div>
                    </div>
                </div>
                <div style="margin-top:14px;border-bottom: 1px solid #EEEEEE;padding-bottom: 5px;">
                    <div class="bgColorStyle animate-box" style="width: 99px;height: 22px;"></div>
                    <div class="clearfix" style="margin-top: 13px">
                        <div class="bgColorStyle animate-box f-fl" style="margin-bottom:10px;margin-right:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-bottom:10px;margin-right:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-bottom:10px;margin-right:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-bottom:10px;width: 198px;height: 90px;"></div>
                    </div>
                </div>
                <div style="margin-top: 16px;padding-bottom: 5px;">
                    <div class="bgColorStyle animate-box" style="width: 99px;height: 22px;"></div>
                    <div class="clearfix" style="margin-top: 12px">
                        <div class="bgColorStyle animate-box f-fl" style="margin-bottom:10px;margin-right:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-bottom:10px;margin-right:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-bottom:10px;margin-right:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-bottom:10px;margin-right:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-bottom:10px;width: 198px;height: 90px;"></div>
                    </div>
                    <div class="clearfix" style="margin-top: 10px">
                        <div class="bgColorStyle animate-box f-fl" style="margin-bottom:10px;margin-right:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-bottom:10px;margin-right:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-bottom:10px;margin-right:10px;width: 198px;height: 90px;"></div>
                        <div class="bgColorStyle animate-box f-fl" style="margin-bottom:10px;width: 198px;height: 90px;"></div>
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
    .centralized{
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
