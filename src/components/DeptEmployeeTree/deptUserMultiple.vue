<template>
    <!-- 该组件用于多选 -->
    <div @click.stop="showSelect=true;isClick=true" class="tree-wrap">
        <div class="select-type-list" :class="{active: isClick}" :style="selectInputStyle">
            <ul class="f-clearfix">
                <template  v-if="currentSelectId && currentSelectId.length">
                    <li class="f-fl" @click.stop="deleteTags(item,index)" v-for="(item,index) in currentSelectId" v-if="item.indexOf('_all')==-1">
                        <span>{{currentSelectName[index]}}</span>
                        <icon-font style="margin-left: 5px;" type="iconyumengtubiao_guanbi-" />
                    </li>
                    <div class="f-fl">
                        <label-item title="" class="u-no-border" style="margin-top: 3px;">
                            <a-input style="height: 22px;" v-model="name" @keyup.native="getEmployeeListByKeyword" :placeholder="placeholderName" ></a-input>
                        </label-item>
                    </div>
                </template>
                <template v-else >
                    <label-item title="" class="u-no-border">
                        <a-input :style="currentInputInputStyle" v-model="name" @keyup.native="getEmployeeListByKeyword" :placeholder="placeholderName" ></a-input>
                    </label-item>
                </template>
            </ul>
            <div class="">
                <a-icon type="down"/>
            </div>
        </div>
        <div v-show="showSelect" @click.stop="showSelect=true;isClick=true" class="select" :style="currentSelectStyle">
            <div class="f-clearfix content">
                <div class="f-fl department">
                    <a-directory-tree
                            :showIcon="false"
                            :treeData="deptData"
                            v-if="deptData.length"
                            :defaultSelectedKeys="[deptData[0].key]"
                            :defaultExpandedKeys="[deptData[0].key]"
                            :selectedKeys="selectedKeys"
                            @select="getEmployeeListData"
                            @expand=""
                    >
                    </a-directory-tree>
                </div>
                <ul class="f-fr person">
                    <li :class="{active: currentSelectId.indexOf(item.id)>-1}" @click="selectChild(item,index)"
                        v-for="(item,index) in employeeData" :key="index">{{item.name}}
                        <div v-if="currentSelectId.indexOf(item.id)>-1" class="personCheck"><a-icon type="check" /></div>
                    </li>
                </ul>
            </div>
            <div class="footer">
                <a-button @click="resetData">清空</a-button>
                <a-button type="primary" @click.stop="saveData">确认</a-button>
            </div>
        </div>
    </div>
</template>

<script>
    import * as PublicAPI from '@/api/public'
    export default {
        name: "workflowDeptUser",
        props: {
            placeholderName:{
                type: String,
            },
            resMark:{
                type: String,
                default:'',
            },
            selectInputStyle:{
                type: String,
                default:'',
            },
            currentInputInputStyle:{
                type: String,
                default:'',
            },
            currentSelectStyle:{
                type: String,
                default:'',
            },
            selectIdList:{
                type: Array,
            },
            selectNameList:{
                type: Array,
            },
        },
        data(){
            return {
                showSelect: false,
                isClick: false,
                size: 'default',
                deptData:[],
                currentSelectId:[],
                submitSelectId:[],
                currentSelectName:[],
                submitSelectName:[],
                isSelectAll: false,
                name:'',
                employeeData: [
                    {
                        name: '全部',
                        id: '',
                    }
                ],
                selectIndex: 0,
                employeeDataKeyValue:{
                    key:'',
                    employeeData:[],
                },
            }
        },
        created() {
            document.getElementsByTagName("body")[0].addEventListener('click', () => {
                this.showSelect = false;
                this.isClick = false;
            })
            this.getDeptTreeData();
            if(this.selectIdList&&this.selectIdList.length>0){
                this.currentSelectId = this.selectIdList;
            }
            if(this.selectNameList&&this.selectNameList.length>0){
                this.currentSelectName = this.selectNameList;
            }
        },
        methods:{
            selectChild(item){
                if(!item.id){
                    return;
                }
                let pos = this.currentSelectId.indexOf(item.id)
                if(pos > -1){
                    //判断取消全选
                    if(item.id.indexOf('_all')>-1) {
                        let temp = this.employeeDataKeyValue.employeeData;
                        temp.forEach((item)=>{
                            let pos = this.currentSelectId.indexOf(item.id);
                            if(pos > -1){
                                this.currentSelectId.splice(pos, 1);
                                this.currentSelectName.splice(pos, 1);
                            }
                        });
                    }
                    else{
                        this.currentSelectId.splice(pos, 1);
                        this.currentSelectName.splice(pos, 1);
                        //如果有全选，全选清掉
                        let allPos = this.currentSelectId.indexOf(this.employeeDataKeyValue.key);
                        if(allPos>-1){
                            this.currentSelectId.splice(allPos, 1);
                            this.currentSelectName.splice(allPos, 1);
                        }
                    }
                }
                else{
                    //判断是否全选
                    if(item.id.indexOf('_all')>-1){
                        let temp = this.employeeDataKeyValue.employeeData;
                        temp.forEach((item)=>{
                            let pos = this.currentSelectId.indexOf(item.id);
                            if(pos == -1){
                                this.currentSelectId.push(item.id);
                                this.currentSelectName.push(item.name);
                            }
                        });
                    }
                    else{
                        this.currentSelectId.push(item.id);
                        this.currentSelectName.push(item.name);
                        //判断是否要选中全部
                        let isAll = true;
                        let temp = this.employeeDataKeyValue.employeeData;
                        temp.forEach((item)=>{
                            if(item.id.indexOf('_all')==-1){
                                let pos = this.currentSelectId.indexOf(item.id);
                                if(pos == -1){
                                    isAll = false;
                                }
                            }
                        });
                        if(isAll){
                            temp.forEach((item)=>{
                                if(item.id.indexOf('_all')>-1){
                                    let pos = this.currentSelectId.indexOf(item.id);
                                    if(pos == -1){
                                        this.currentSelectId.push(item.id);
                                        this.currentSelectName.push(item.name);
                                    }
                                }
                            });
                        }
                    }
                }
            },
            getEmployeeListByKeyword(){
                if(!this.name){
                    return;
                }
                PublicAPI.getEmployeeListByKeyword(this.name,this.resMark).then(res => {
                    if (res.code == 200) {
                        this.employeeData = [];
                        this.employeeData.push(...res.data);
                    }
                })
            },
            addValue(arr){
              if (arr.length > 0) {
                arr.forEach((item) => { //利用foreach循环遍历
                  if(item.isStore==1&&item.id!=this.deptData[0].id){
                    item.title = item.title + '@门店';
                  }
                  if (item.children.length > 0) //判断chlidren是否有数据
                  {
                    this.addValue(item.children);  //递归调用
                  }
                });
              }
            },
            getDeptTreeData(){
                PublicAPI.getAuthDeptTree(this.resMark).then(res => {
                    if (res.code == 200) {
                        this.deptData = [];
                        this.deptData.push(res.data);
                        this.addValue(this.deptData);
                        this.getEmployeeListData([this.deptData[0].key])
                    }
                })
            },
            deleteTags(item,index){
                //判断是否要取消全选
                this.currentSelectId.splice(index,1);
                this.currentSelectName.splice(index,1);
                let allPos = this.currentSelectId.indexOf(this.employeeDataKeyValue.key);
                if(allPos>-1){
                    this.currentSelectId.splice(allPos, 1);
                    this.currentSelectName.splice(allPos, 1);
                }
                //提交的时候过滤全部（务必处理）
                this.initSubmitInfo();
                this.$emit('selectChange', this.submitSelectId,this.submitSelectName)
            },
            resetData() {
                this.currentSelectId = [];
                this.currentSelectName = [];
                this.$emit('selectChange', this.currentSelectId,this.currentSelectName)
            },
            saveData() {
                this.showSelect = false;
                this.initSubmitInfo();
                this.$emit('selectChange', this.submitSelectId,this.submitSelectName)
            },
            initSubmitInfo(){
                this.submitSelectId = [];
                this.submitSelectName = [];
                if(this.currentSelectId.length>0){
                    for (let i = 0; i < this.currentSelectId.length; i++) {
                        if(this.currentSelectId[i].indexOf('_all')==-1){
                            this.submitSelectId.push(this.currentSelectId[i]);
                            this.submitSelectName.push(this.currentSelectName[i]);
                        }
                    }
                }
            },
            getEmployeeListData(keys, selectedNodes) {
                this.selectedKeys = keys;
                this.selectIndex = 0;
                this.employeeData = [
                    {
                        name: '全部',
                        id: keys[0]+'_all',
                    }
                ]
                if (!this.disableDept){
                    if (selectedNodes) {
                        this.selectObj = {
                            id: keys[0],
                            name: selectedNodes.node.title,
                            type: 'dept',
                        };
                    }
                }

                PublicAPI.getEmployeeList(keys,this.resMark).then(res => {
                    if (res.code == 200) {
                        this.employeeDataKeyValue = {
                            key:'',
                            employeeData:[],
                        };
                        this.employeeData.push(...res.data);
                        this.employeeDataKeyValue = {
                            key:keys[0]+'_all',
                            employeeData:this.employeeData,
                        };
                    }
                })
            },
        },
        watch: {
            selectName() {
                if(this.defaultValue) {
                    this.selectName = this.defaultValue
                }
                if (this.selectObj.name != this.selectName) {
                    if (this.selectName&&!this.isAllowChange) {
                        PublicAPI.getEmployeeListByKeyword(this.selectName,this.resMark).then(res => {
                            // console.log(res)
                            this.employeeData = [];
                            this.employeeData.push(...res.data)
                        })
                    }
                }
            },
            defaultValue(){
                this.selectName = this.defaultValue
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
        border-bottom: 1px solid @borderColor;
        cursor: pointer;
        z-index: 4;
        &>ul{
            display: flex;
            flex-wrap: wrap;
            li{
                margin: 0 10px 6px 0;
                padding: 2px 5px;
                border-radius: 4px;
                font-size: 12px;
                background:rgba(64,158,255,0.08);
                span{
                    color: #0A87F8;
                }
            }
            i{
                color: #f5222d;
            }
        }
        &>div{
            padding-right: 0px;
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
        .content {
            height: 246px;
            .department {
                width: 65%;
                height: 100%;
                overflow: auto;
                border-right: 1px solid @borderColor;
            }

            .no-show-employee {
                width: 100%;
                border-right: none;
            }

            .person {
                padding: 3px 0;
                width: 35%;
                height: 100%;
                overflow: auto;
                li {
                    margin: 4px 0;
                    padding: 0px 10px;
                    height: 24px;
                    line-height: 24px;
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
        width: 100px;
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
}
</style>
