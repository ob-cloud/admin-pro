<template>
    <a-locale-provider :locale="zh_CN">
        <a-config-provider :getPopupContainer="getPopupContainer">
            <div id="app" @click.capture="captureClick" @mousedown="mouseDownEvent" @mouseup.stop="mouseUpEvent">
                <router-view/>
            </div>
        </a-config-provider>
    </a-locale-provider>
</template>
<script>
    import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

    export default {
        data() {
            return {
                zh_CN,
                mouseDownX: null,
                mouseDownY: null,
                mouseUpX: null,
                mouseUpY: null,
            };
        },
        methods:{
            getPopupContainer(triggerNode) {
                return triggerNode.parentNode;
            },
            captureClick(){
                if (Math.abs(this.mouseDownX - this.mouseUpX)<=5 && (Math.abs(this.mouseDownY - this.mouseUpY)<=5)){
                }else{
                    event.stopPropagation()
                }
            },
            mouseDownEvent(){
                this.mouseDownX = event.screenX
                this.mouseDownY = event.screenY
            },
            mouseUpEvent(){
                this.mouseUpX = event.screenX
                this.mouseUpY = event.screenY
            }
        }
    };
</script>
<style lang="less">
    body{
        overflow: hidden;
    }

</style>
