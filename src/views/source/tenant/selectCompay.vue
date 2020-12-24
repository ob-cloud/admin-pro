<template>
    <div @click.stop="showSelect=true;isClick=true" class="tree-wrap">
        <div class="select-type-list" :class="{active: isClick}">
            <ul class="f-clearfix">
                <template  v-if="currentSelectId && currentSelectId.length">
                    <li class="f-fl" @click.stop="deleteTags(item,index)" v-for="(item,index) in currentSelectId">
                        <span>{{currentSelectName[index]}}</span>
                        <icon-font style="margin-left: 5px" type="iconyumengtubiao_guanbi-" />
                    </li>
                </template>
                <template v-else >
                    <div style="margin: 0 0 6px 0;color: rgba(0, 0, 0, 0.25)">
                        请选择
                    </div>
                </template>
            </ul>
            <div class="">
                <a-icon type="down"/>
            </div>
        </div>
        <div v-show="showSelect" @click.stop="showSelect=true;isClick=true" class="select">
            <div style="width: 100%">
                <a-input v-model="name" @keyup.native="getCostTypeData" placeholder="输入名称公寓检索" ></a-input>
            </div>
            <div class="content">
                <ul class="list" v-show="sourceSelect&&sourceSelect.length>0">
                    <li @click="selectChild(item,index)" :class="{active: currentSelectId.indexOf(item.id)>-1}" v-for="(item,index) in sourceSelect">
                        {{item.name}}
                        <icon-font v-show="currentSelectId.indexOf(item.id)>-1" type="iconyumengtubiao_xuanzhong-" />
                    </li>
                </ul>
                <div class="noContentStyle" v-show="sourceSelect&&sourceSelect.length==0">
                    <a-empty style="margin-top:40px;" description="您还没有合作的伙伴，请先前往合作公司模块"/>
                </div>
            </div>
            <div class="footer">
                <a-button @click="resetData">清空</a-button>
                <a-button type="primary" @click.stop="saveData">确认</a-button>
            </div>
        </div>
    </div>
</template>

<script>
    import  * as API from '@/api/source';
    export default {
        name: "costTypeSelect",
        data(){
            return {
                showSelect: false,
                isClick: false,
                size: 'default',
                sourceSelect:[],
                currentSelectId:[],
                currentSelectName:[],
                isSelectAll: false,
                name:'',
            }
        },
        created() {
            document.getElementsByTagName("body")[0].addEventListener('click', () => {
                this.showSelect = false;
                this.isClick = false;
            })
            this.getCostTypeData()
        },
        methods:{
            selectChild(item){
                let pos = this.currentSelectId.indexOf(item.id)
                if(pos > -1){
                    this.currentSelectId.splice(pos,1);
                    this.currentSelectName.splice(pos,1);
                }
                else{
                    this.currentSelectId.push(item.id);
                    this.currentSelectName.push(item.name);
                }
            },
            getCostTypeData(){
                API.resourcePartnerListSelect(this.name).then(res=>{
                    this.sourceSelect = res.data;
                });
            },
            deleteTags(item,index){
                this.currentSelectId.splice(index,1);
                this.$emit('selectChange', this.currentSelectId)
            },
            resetData() {
                this.currentSelectId = [];
                this.$emit('selectChange', this.currentSelectId)
            },
            saveData() {
                this.showSelect = false;
                this.$emit('selectChange', this.currentSelectId)
            },
        },
        watch: {
            showSelect(n) {
                this.$emit('selectChangeStyle',this.showSelect)
            },
        }
    }
</script>

<style scoped lang="less">
.tree-wrap{
    position: relative;
    height: 332px;
    .select-type-list{
        width: 481px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 0 0 0;
        border-bottom: 1px solid @borderColor;
        cursor: pointer;
        z-index: 4;
        &>ul{
            display: flex;
            flex-wrap: wrap;
            li{
                margin: 0 10px 6px 0;
                padding: 2px 5px;
                border: 1px solid @borderColor;
                border-radius: 4px;
                font-size: 12px;
                background: @bigBackgroundColor;
                span{
                    color: @mainFontColor;
                }
            }
        }
        &>div{
            padding-right: 12px;
        }
        &:hover,&.active{
            border-bottom: 1px solid @themeColor;
        }
        i{
            color: #0A87F8;
        }
    }
    .select{
        position: absolute;
        margin-top: -1px;
        z-index: 3;
        width: 481px;
        height: 342px;
        background-color: #ffffff;
        border: 1px solid @borderColor;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        .content{
            height: 258px;
            overflow-y: auto;
            .list{
                display: inline-block;
                width: 100%;
                overflow: hidden;
                &:first-child{
                    border-right: 1px solid @borderColor;
                }
                li {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin: 4px 0;
                    padding: 0px 10px;
                    height: 24px;
                    line-height: 24px;
                    cursor: pointer;

                    &:hover {
                        background-color: @bigBackgroundColor;
                    }

                    &.active {
                        color: @themeColor;
                        background-color: @themeBgColor !important;
                    }
                }
            }
            .noContentStyle{
                text-align: center;
                /deep/ .ant-empty-description{
                    color: #BBBBBB;
                    font-size: 14px;
                }
            }
        }
        .footer {
            padding-top: 10px;
            border-top: 1px solid @borderColor;
            text-align: right;

            .ant-btn {
                margin-right: 10px;
                height: 30px;
                line-height: 30px;
            }
        }
        /deep/ .ant-input{
            border-radius: 0;
        }
    }
}
</style>
