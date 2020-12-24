<template>
    <div @click.stop="showTree=true" class="tree-wrap cursor" :class="bottomBorder ? 'u-bottom-border' : ''">
        <a-input @focus="cancelTree" autocomplete="off" v-if="showEmployee && !disableDept"
                 :style="{width}" style="z-index: 4" :placeholder="placeholder ? placeholder : '请选择部门/人员'" v-model="selectName">
            <a-icon slot="suffix" style="z-index: 4;color: #0a87f8;" type="down"/>
        </a-input>
        <a-input @focus="cancelTree" disabled autocomplete="off" v-if="!showEmployee && !disableDept"
                 :style="{width}" :class="showNameAll?'':'overHiddeSpan'" style="z-index: 4" :placeholder="placeholder ? placeholder : '请选择部门'" v-model="selectName">
            <a-icon slot="suffix" style="z-index: 4;color: #0a87f8;" type="down"/>
        </a-input>
        <a-input @focus="cancelTree" autocomplete="off" v-if="disableDept"
                 :style="{width}" style="z-index: 4" :placeholder="placeholder ? placeholder : '请选择人员'" v-model="selectName">
            <a-icon slot="suffix" style="z-index: 4;color: #0a87f8;" type="down"/>
        </a-input>
        <div v-show="showTree" @click.stop="showTree=true" :style="{width,top: placementTop,bottom: placementBottom,left: placementLeft,right: placementRight,minWidth: minWidth}" class="tree">
            <div class="f-clearfix content">
                <div class="f-fl department" :class="{'no-show-employee': showEmployee==false}">
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
                <ul class="f-fr person" v-if="showEmployee">
                    <li :class="{active: selectIndex==index}" @dblclick="selectEmployee(item,index);saveData()" @click="selectEmployee(item,index)"
                        v-for="(item,index) in employeeData" :key="index">{{item.name}}
                    </li>
                </ul>
            </div>
            <div class="footer">
                <a-button @click="resetData" v-if="showNameAll">清空</a-button>
                <a-button @click.stop="resetData" v-else>清空</a-button>
                <a-button type="primary" @click.stop="saveData">确认</a-button>
            </div>
        </div>
    </div>
</template>

<script>
    import * as PublicAPI from '@/api/public'

    export default {
        name: "deptEmployeeTree",
        props: {
            // 是否显示人员列表
            showEmployee: {
                type: Boolean,
                default: true
            },
            width: {
                type: String,
                default: '100%'
            },
            minWidth:{
                type: String,
                default: '400px'
            },
            // 下拉框显示的位置
            placement: {
                type: String,
                default: 'bottomLeft'
            },
            // 禁用部门
            disableDept: {
                type: Boolean,
                default: false,
            },
            defaultValue: {
                type: String,
                default: ''
            },
            bottomBorder: {
                type: Boolean,
                default: true
            },
            placeholder: {
                type: String,
                default: ''
            },
            //默认不允许改值
            isAllowChange:{
                type: Boolean,
                default: false
            },
            //是否显示所有名称（false来自报表的搜索）
            showNameAll:{
                type: Boolean,
                default: true
            },
            resMark:{
                type: String,
                default:'',
            },
        },
        data() {
            return {
                showTree: false,
                selectIndex: 0,
                deptData: [],
                employeeData: [
                    {
                        name: '全部',
                        id: '',
                    }
                ],
                selectObj: {
                    id: '',
                    name: this.defaultValue,
                    type: '',
                },
                selectName: this.defaultValue,
                selectedKeys: [],
                placementTop: '',
                placementBottom: '',
                placementRight: '',
                placementLeft: '',
            }
        },
        watch: {
            selectName() {
                if (this.selectObj.name != this.selectName) {
                    if (this.selectName&&!this.isAllowChange) {
                        PublicAPI.getEmployeeListByKeyword(this.selectName,this.resMark).then(res => {
                            // console.log(res)
                            this.employeeData = [];
                            this.employeeData.push(...res.data)
                        })
                    }
                    if(!this.selectName){
                      this.getEmployeeListData([this.deptData[0].key])
                    }
                }
            },
            defaultValue(){
                this.selectName = this.defaultValue;
                this.selectObj.name = this.defaultValue;
            },
            resMark(){
                this.getDeptTreeData();
            },
        },
        created() {
            switch (this.placement) {
                case 'topLeft':
                    this.placementTop = '-302px'
                    this.placementBottom = ''
                    this.placementRight = ''
                    this.placementLeft = ''
                    break;
                // case 'topRight':
                //     this.placementTop = ''
                //     this.placementBottom = ''
                //     this.placementRight = ''
                //     this.placementLeft = ''
                //     break;
                case 'bottomLeft':
                    this.placementTop = '31px'
                    this.placementBottom = ''
                    this.placementRight = ''
                    this.placementLeft = '0'
                    break;
                case 'bottomRight':
                    this.placementTop = '31px'
                    this.placementBottom = ''
                    this.placementRight = '0'
                    this.placementLeft = ''
                    break;
                default:
                    this.placementTop = '31px'
                    this.placementBottom = ''
                    this.placementRight = '0'
                    this.placementLeft = ''
            }
          if(this.defaultValue) {
            this.selectName = this.defaultValue;
            this.selectObj.name = this.defaultValue;
          }
            document.getElementsByTagName("body")[0].addEventListener('click', () => {
                this.showTree = false;
                if (this.selectObj.name != this.selectName) {
                    this.selectName = this.selectObj.name;
                    this.$emit('selectChange', this.selectObj)
                }
            })
            this.getDeptTreeData()
        },
        methods: {
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
            getDeptTreeData() {
                // PublicAPI.getDeptTree().then(res => {
                //     // console.log(res.data)
                //     if (res.code == 200) {
                //         this.deptData = [];
                //         this.deptData.push(res.data);
                //         this.getEmployeeListData([this.deptData[0].key])
                //     }
                // })
                PublicAPI.getAuthDeptTree(this.resMark).then(res => {
                    if (res.code == 200) {
                        this.deptData = [];
                        this.deptData.push(res.data);
                        this.addValue(this.deptData);
                        this.getEmployeeListData([this.deptData[0].key])
                    }
                })
            },
            getEmployeeListData(keys, selectedNodes) {
                this.selectedKeys = keys;
                this.selectIndex = 0;
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
                        this.employeeData = [
                          {
                            name: '全部',
                            id: '',
                          }
                        ]
                        this.employeeData.push(...res.data)
                    }
                })
            },
            selectEmployee(item, index) {
                if (index || (index == 0 && this.employeeData[0].id != '')) {
                    this.selectIndex = index;
                    this.selectObj = {
                        id: item.id,
                        name: item.name,
                        type: 'employee',
                    };
                }
            },
            clearData(){
              this.selectedKeys = [this.deptData[0].key];
              this.selectObj = {
                id: '',
                name: '',
                type: '',
              };
              this.selectIndex = 0;
              this.selectName = '';
              if(this.showNameAll==false){
                this.showTree = false;
              }
            },
            resetData() {
                this.selectedKeys = [this.deptData[0].key];
                this.selectObj = {
                    id: '',
                    name: '',
                    type: '',
                };
                this.selectIndex = 0;
                this.selectName = '';
                if(this.showNameAll==false){
                    this.showTree = false;
                }
                this.$emit('selectChange', this.selectObj)
            },
            saveData() {
                this.showTree = false;
                this.selectName = this.selectObj.name;
                // if(!this.selectName){
                //     //如果没有人，取根节点
                //     this.selectObj = {
                //         id: this.deptData[0].id,
                //         name: this.deptData[0].name,
                //         type: 'dept',
                //     };
                //     this.selectName = this.deptData[0].name;
                // }
                this.$emit('selectChange', this.selectObj)
            },
            cancelTree() {
                this.$emit('cancelOtherTree')
            }
        }
    }
</script>

<style scoped lang="less">
    .tree-wrap {
        position: relative;
        .overHiddeSpan{
            //用于报表部门名称过长隐藏
            /deep/ .ant-input{
                width: calc(100% - 24px);
                float: left;
                padding: 0;
                white-space: normal;
                text-overflow: ellipsis;
            }
        }
        .tree {
            position: absolute;
            top: 31px;
            z-index: 6;
            width: 100%;
            height: 300px;
            background-color: #ffffff;
            border: 1px solid @borderColor;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;

            .content {
                height: 246px;

                .department {
                    width: calc(100% - 200px);
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
                    width: 200px;
                    height: 100%;
                    overflow: auto;

                    li {
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
</style>
