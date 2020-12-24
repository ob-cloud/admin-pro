<template>
    <!-- 该组件用于多选 -->
    <div @click.stop="showSelect=true;isClick=true" class="tree-wrap">
        <div class="select-type-list" :class="{active: isClick}">
            <ul class="f-clearfix">
                <template  v-if="currentSelectId && currentSelectId.length">
                    <li class="f-fl" v-for="(item,index) in currentSelectId">
                        <span>{{currentSelectName[index]}}</span>
                        <icon-font class="cursor" style="margin-left: 5px;color: #f5222d;" @click.stop="deleteTags(item,index)" type="iconyumengtubiao_guanbi-" />
                        <icon-font class="selectType" style="margin-left: 10px;" v-if="currentSelectCheck[index]==1" type="iconyumengtubiao_danxuan-yixuanze" /><span v-if="currentSelectCheck[index]==1" style="margin-left: 4px;">默认</span>
                        <icon-font class="cursor" style="margin-left: 10px;color: #777777" v-if="currentSelectCheck[index]==0" @click.stop="selectCheck(index)" type="iconyumengtubiao_danxuan-weixuanze" /><span v-if="currentSelectCheck[index]==0" style="margin-left: 4px;">默认</span>
                    </li>
                    <div class="f-fl">
                        <label-item title="" class="u-no-border">
                            <a-input style="height: 22px;" placeholder="继续选择可用模板" v-model="searchValue" @change="changeSearchSimpleList"></a-input>
                        </label-item>
                    </div>
                    <div class="down">
                        <a-icon type="down"/>
                    </div>
                </template>
                <template v-else >
                    <label-item title="" class="u-no-border">
                        <a-input placeholder="选择可用模板" v-model="searchValue"  @change="changeSearchSimpleList"></a-input>
                    </label-item>
                    <div class="down">
                        <a-icon type="down"/>
                    </div>
                </template>
            </ul>
        </div>
        <div v-show="showSelect" @click.stop="showSelect=true;isClick=true" class="select">
            <a-empty v-if="!simpleList||simpleList.length==0" style="margin: 10px 0;"></a-empty>
            <div class="f-clearfix content" v-if="simpleList&&simpleList.length > 0">
                <ul class="f-fr person" v-if="!searchValue">
                    <li :class="{active: currentSelectId.indexOf(item.id)>-1}" @click="selectChild(item,index)"
                        v-for="(item,index) in simpleList" :key="index">{{item.name}}
                        <div v-if="currentSelectId.indexOf(item.id)>-1" class="personCheck"><icon-font class="selectedStyle" type="iconyumengtubiao_duoxuan-yixuanze" /></div>
                        <div v-if="currentSelectId.indexOf(item.id)==-1" class="personCheck"><icon-font style="color: #666666" type="iconyumengtubiao_duoxuan-weixuanze" /></div>
                    </li>
                </ul>
              <ul class="f-fr person" v-else>
                <li :class="{active: currentSelectId.indexOf(item.id)>-1}" @click="selectChild(item,index)"
                    v-for="(item,index) in searchSimpleList" :key="index">{{item.name}}
                  <div v-if="currentSelectId.indexOf(item.id)>-1" class="personCheck"><icon-font class="selectedStyle" type="iconyumengtubiao_duoxuan-yixuanze" /></div>
                  <div v-if="currentSelectId.indexOf(item.id)==-1" class="personCheck"><icon-font style="color: #666666" type="iconyumengtubiao_duoxuan-weixuanze" /></div>
                </li>
              </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getSimpleList,
    } from '@/api/contract.js';
    export default {
        name: "selectTemplate",
        props: {
            selectIdList:{
                type: Array,
            },
            selectNameList:{
                type: Array,
            },
            selectCheckList:{
                type: Array,
            },
        },
        data(){
            return {
                showSelect: false,
                isClick: false,
                size: 'default',
                currentSelectId:[],
                currentSelectName:[],
                currentSelectCheck:[],
                simpleList:[],
              searchValue:'',
              nextSearchValue:'',
              searchSimpleList:[],
            }
        },
        created() {
            this.getSimpleListFun();
            document.getElementsByTagName("body")[0].addEventListener('click', () => {
                this.showSelect = false;
                this.isClick = false;
            })
            if(this.selectIdList&&this.selectIdList.length>0){
                this.currentSelectId = this.selectIdList;
            }
            if(this.selectNameList&&this.selectNameList.length>0){
                this.currentSelectName = this.selectNameList;
            }
            if(this.selectCheckList&&this.selectCheckList.length>0){
                this.currentSelectCheck = this.selectCheckList;
            }
        },
        methods:{
          changeSearchSimpleList(){
            if(this.searchValue){
              let searchSimpleList = [];
              this.simpleList.forEach((item)=>{
                if(item.name.indexOf(this.searchValue)!=-1){
                  searchSimpleList.push(item);
                }
              })
              this.searchSimpleList = searchSimpleList
            }
            else{

            }
          },
            selectCheck(indext){
                let temp = [];
                this.currentSelectCheck.forEach((item,index)=>{
                    if(indext==index){
                        temp.push(1);
                    }
                    else{
                        temp.push(0);
                    }
                });
                this.currentSelectCheck = temp;
                let currentSelectArray = [];
                this.currentSelectId.forEach((item)=>{
                    this.simpleList.forEach((itemTemp)=>{
                        if(item == itemTemp.id){
                            currentSelectArray.push(itemTemp);
                        }
                    });
                });
                this.$emit('changeTemplate',this.currentSelectId,this.currentSelectName,this.currentSelectCheck,currentSelectArray);
            },
            getSimpleListFun(id) {
                getSimpleList(id).then(res => {
                    if (res.code == "200") {
                        this.simpleList = res.data;
                    }
                });
            },
            selectChild(item){
                if(!item.id){
                    return;
                }
                let pos = this.currentSelectId.indexOf(item.id)
                if(pos > -1){
                    //判断取消全选
                    this.currentSelectId.splice(pos, 1);
                    this.currentSelectName.splice(pos, 1);
                    this.currentSelectCheck.splice(pos, 1);
                    if(this.currentSelectCheck.length>0){
                        let haveDefault = false;
                        this.currentSelectCheck.forEach((item)=>{
                            if(item==1){
                                haveDefault = true;
                            }
                        });
                        if(!haveDefault){
                            this.currentSelectCheck[0] = 1;
                        }
                    }
                }
                else{
                    if(this.currentSelectId.length==0){
                        this.currentSelectCheck.push(1);
                    } else{
                        this.currentSelectCheck.push(0);
                    }
                    //判断是否全选
                    this.currentSelectId.push(item.id);
                    this.currentSelectName.push(item.name);
                }
                let currentSelectArray = [];
                this.currentSelectId.forEach((item)=>{
                    this.simpleList.forEach((itemTemp)=>{
                        if(item == itemTemp.id){
                            currentSelectArray.push(itemTemp);
                        }
                    });
                });
                this.searchValue = '';
                this.$emit('changeTemplate',this.currentSelectId,this.currentSelectName,this.currentSelectCheck,currentSelectArray);
            },
            deleteTags(item,index){
                //判断是否要取消全选
                this.currentSelectId.splice(index,1);
                this.currentSelectName.splice(index,1);
                this.currentSelectCheck.splice(index, 1);
                if(this.currentSelectCheck.length>0){
                    let haveDefault = false;
                    this.currentSelectCheck.forEach((item)=>{
                        if(item==1){
                            haveDefault = true;
                        }
                    });
                    if(!haveDefault){
                        this.currentSelectCheck[0] = 1;
                    }
                }
                let currentSelectArray = [];
                this.currentSelectId.forEach((item)=>{
                    this.simpleList.forEach((itemTemp)=>{
                        if(item == itemTemp.id){
                            currentSelectArray.push(itemTemp);
                        }
                    });
                });
                this.$emit('changeTemplate',this.currentSelectId,this.currentSelectName,this.currentSelectCheck);
            },
        },
        watch: {
            selectIdList(){
                this.currentSelectId = this.selectIdList;
            },
            selectNameList(){
                this.currentSelectName = this.selectNameList;
            },
            selectCheckList(){
                this.currentSelectCheck = this.selectCheckList;
            },
        }
    }
</script>

<style scoped lang="less">
    .tree-wrap{
        width: 420px;
        position: relative;
        .select-type-list{
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            z-index: 4;
            &>ul{
                display: flex;
                flex-wrap: wrap;
                .down{
                    svg{
                        width: 12px;
                        height: 12px;
                    }
                    i{
                        color: #0A87F8;
                        vertical-align: -0.4em;
                    }
                }
                li{
                    margin: 0 5px 5px 0;
                    padding: 0 5px;
                    border-radius: 4px;
                    font-size: 12px;
                    height: 24px;
                    line-height: 24px;
                    border-radius:4px;
                    border:1px solid rgba(238,238,238,1);
                    span{
                        color: #111111;
                        font-size: 12px;
                    }
                    .selectType {
                        color: #0A87F8;
                    }
                    svg{
                        width: 12px;
                        height: 12px;
                    }
                }
            }
            &>div{
                padding-right: 0px;
                svg{
                    width: 12px;
                    height: 12px;
                }
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
            background-color: #ffffff;
            border: 1px solid @borderColor;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            width: 100%;
            .content {
                min-height: 80px;
                .no-show-employee {
                    width: 100%;
                    border-right: none;
                }
                width: 100%;
                .person {
                    width: 100%;
                    padding: 3px 0;
                    height: 100%;
                    overflow: auto;
                    li {
                        margin: 4px 0;
                        padding: 0px 10px;
                        height: 34px;
                        line-height: 34px;
                        cursor: pointer;
                        position: relative;
                        .personCheck{
                            position: absolute;
                            right: 8px;
                            top:1px;
                        }
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
                padding: 10px 0;
                border-top: 1px solid @borderColor;
                text-align: right;

                .ant-btn {
                    margin-right: 10px;
                    height: 30px;
                    line-height: 30px;
                }
            }
        }
        /deep/ .ant-input{
            border-radius: 0;
            width: 120px;
            height: 20px;
        }
        /deep/ .ant-input:focus{
            -webkit-box-shadow:none;
            box-shadow:none;
        }
        & /deep/ .ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-node-content-wrapper::before,
        & /deep/ .ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-node-content-wrapper::before {
            background: @themeBgColor;
        }

        & /deep/ .ant-tree.ant-tree-directory > li span.ant-tree-node-content-wrapper.ant-tree-node-selected,
        & /deep/ .ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-node-content-wrapper.ant-tree-node-selected {
            color: @themeColor;
        }

        & /deep/ .ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-switcher,
        & /deep/ .ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-switcher {
            color: @commonTextColor;
        }

        & /deep/ .ant-input-disabled {
            color: @commonTextColor;
            background: none;
            cursor: pointer;
        }
        /deep/ .ant-empty-description{
            color: #BBBBBB;
        }
    }
</style>
