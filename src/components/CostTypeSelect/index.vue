<template>
    <div @click.stop="showTree=true;isClick=true" class="tree-wrap">
        <div class="select-type-list" :class="{active: isClick}" :style="showAll?'border-bottom: 1px solid @borderColor;':'border-bottom: none;'">
            <ul class="f-clearfix" v-if="showAll">
                <template  v-if="selectObj.metaList && selectObj.metaList.length">
                    <li class="f-fl" @click.stop="deleteTags(item,index)" v-for="(item,index) in selectObj.metaList" :key="index">
                        <span>{{item.name}}</span>
                        <icon-font style="margin-left: 5px" type="iconyumengtubiao_guanbi-" />
                    </li>
                </template>
                <template v-else >
                    <div style="margin: 0 0 6px 0;color: rgba(0, 0, 0, 0.25)">
                        {{defaultName}}
                    </div>
                </template>
            </ul>
            <ul class="f-clearfix" v-else>
                <template  v-if="selectObj.metaList">
                     <div class="f-fl" v-for="(item,index) in selectObj.metaList" :key="index">
                        <div v-if="index==0">{{currentSelectParent.name}}({{selectObj.metaList.length}})</div>
                    </div>
                </template>
                <template v-else >
                    <div :style="showAll?'margin: 0 0 6px 0;color: rgba(0, 0, 0, 0.25)':'color: rgba(0, 0, 0, 0.25);'">
                        不限
                    </div>
                </template>
            </ul>
            <div class="" style="color: #0A87F8;">
                <a-icon type="down"/>
            </div>
        </div>
        <div v-show="showTree" @click.stop="showTree=true;isClick=true" class="tree">
            <div class="content">
                <ul class="list">
                    <li @click="selectParent(item,index)" :class="{active: currentSelectParent.id==item.id}" v-for="(item,index) in costTypeListParent" :key="index">
                        {{item.name}}
                        <icon-font v-show="currentSelectParent.id==item.id" type="iconyumengtubiao_xuanzhong-" />
                    </li>
                </ul>
                <ul class="list">
                    <li @click="selectChild(item,index)" :class="{active: isSelectAll ? index == 0 : item.isSelect}" v-for="(item,index) in costTypeListChild" :key="index">
                        {{item.name}}
                        <icon-font v-show="isSelectAll ? index == 0 : item.isSelect" type="iconyumengtubiao_xuanzhong-" />
                    </li>
                </ul>
            </div>
            <div class="footer">
                <a-button @click="resetData" v-if="showAll">清空</a-button>
                <a-button @click.stop="resetData" v-else>清空</a-button>
                <a-button type="primary" @click.stop="saveData">确认</a-button>
            </div>
        </div>
    </div>
</template>

<script>
    import * as PublicAPI from '@/api/public'
    export default {
        name: "costTypeSelect",
        props: {
            // 是否显示所有（false来自报表的搜索）
            showAll: {
                type: Boolean,
                default: true
            },
            defaultName:{
                type:String,
                default:'请选择收支类型',
            },
        },
        data(){
            return {
                showTree: true,
                isClick: false,
                costTypeListParent:[],
                costTypeListChild:[],
                selectObj:{},
                currentSelectParent:{},
                currentSelectChild:[],
                isSelectAll: false,         //  是否选择了全部子类

            }
        },
        created() {
            document.getElementsByTagName("body")[0].addEventListener('click', () => {
                this.showTree = false;
                this.isClick = false;
            })
            this.getCostTypeData()
        },
        methods:{
            getCostTypeData(){
                PublicAPI.getCostType().then(res=>{
                    // console.log(res)
                    if (res.code == 200){
                        this.costTypeListParent = res.data;
                        this.costTypeListChild.push({
                            id: this.costTypeListParent[0].id,
                            name: '全部',
                        })
                        this.costTypeListChild.push(...this.costTypeListParent[0].metaList);
                        this.isSelectAll = true;
                        this.currentSelectParent = this.costTypeListParent[0]
                        this.currentSelectChild.push(...this.costTypeListParent[0].metaList)
                    }
                })
            },
            deleteTags(item,index){
                this.selectObj.selectAll = false;
                this.selectObj.metaList.splice(index,1);
                this.$emit('selectChange', this.selectObj)
            },
            selectParent(item,index){
                if (item.id != this.currentSelectParent.id){
                    this.costTypeListChild.forEach((val,i)=>{
                        val.isSelect = false
                    })
                    this.costTypeListChild = [];
                    this.costTypeListChild.push({
                        id: item.id,
                        name: '全部',
                    })

                    this.costTypeListChild.push(...item.metaList)
                    this.currentSelectParent = item
                    this.isSelectAll = true;
                    this.currentSelectChild = [];
                    this.currentSelectChild.push(...item.metaList);
                }
            },
            selectChild(item,index){
                item.isSelect = !item.isSelect;
                if (index == 0){
                    this.currentSelectChild = [...this.costTypeListChild];
                    this.currentSelectChild.splice(0,1);
                    this.isSelectAll = true;
                    this.costTypeListChild.forEach(value => {
                        value.isSelect = false
                    })
                }else{
                    if (this.isSelectAll){
                        this.currentSelectChild = [];
                        this.currentSelectChild.push(item);
                        this.isSelectAll = false;
                        this.costTypeListChild.forEach(value => {
                            value.isSelect = false
                        })
                        item.isSelect = !item.isSelect;
                    }else{
                        let arr = [...this.currentSelectChild]
                        let hasSelect = false;
                        arr.forEach((val,i)=>{
                            if (val.id == item.id){
                                this.currentSelectChild.splice(i,1)
                                hasSelect = true;
                                this.isSelectAll = false;
                            }
                        })
                        if (!hasSelect){
                            this.currentSelectChild.push(item)
                        }
                    }
                }
                this.costTypeListChild = [...this.costTypeListChild]
            },
          clearData(){
            this.selectObj = {};
            if(this.showAll==false){
              this.showTree = false;
            }
            this.currentSelectParent = this.costTypeListParent[0];
            this.costTypeListChild = [];
            this.costTypeListChild.push({
              id: this.costTypeListParent[0].id,
              name: '全部',
            })
            this.costTypeListChild.push(...this.costTypeListParent[0].metaList);
            this.isSelectAll = true;
          },
            resetData() {
                this.clearData();
                this.$emit('selectChange', this.selectObj);
            },
            saveData() {
                this.showTree = false;
                this.selectObj = JSON.parse(JSON.stringify(this.currentSelectParent))
                if (this.currentSelectChild.length == this.costTypeListChild.length - 1){
                    this.isSelectAll = true
                }
                this.selectObj.selectAll = this.isSelectAll;
                if (!this.isSelectAll){
                    this.selectObj.metaList = [...this.currentSelectChild]
                }
                this.$emit('selectChange', this.selectObj)
            },
        }
    }
</script>

<style scoped lang="less">
.tree-wrap{
    position: relative;
    .select-type-list{
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
    }
    .tree{
        position: absolute;
        margin-top: -1px;
        z-index: 3;
        width: 100%;
        height: 300px;
        background-color: #ffffff;
        border: 1px solid @borderColor;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        .content{
            height: 246px;
            .list{
                display: inline-block;
                width: 50%;
                height: 100%;
                overflow: auto;
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

    }
}
</style>
