<template>
    <div @click.stop="showTree=true" class="u-bottom-border tree-wrap">
        <a-input @focus="cancelTree" v-model="selectName" style="width: 100%" :placeholder="placeholderName">
            <a-icon slot="suffix" type="down" style="color: #0A87F8;"/>
        </a-input>
        <div v-show="showTree" @click.stop="showTree=true" class="tree">
            <div class="content" v-show="!switchListTag">
                <ul>
                    <li @click="selectCityChange(item,index)" :class="{active: selectCityIndex==index}"
                        v-for="(item,index) in cityList" :key="index">{{item.name}}
                    </li>
                </ul>
                <ul v-if="showArea">
                    <li @click="selectAreaChange(item,index)" :class="{active: selectAreaIndex==index}"
                        v-for="(item,index) in areaList" :key="index">{{item.name}}
                    </li>
                </ul>
                <ul v-if="showTown">
                    <li @click="selectTownChange(item,index)" :class="{active: selectTownIndex==index}"
                        v-for="(item,index) in townList" :key="index">{{item.name}}
                    </li>
                </ul>
            </div>
            <div class="content" v-show="switchListTag">
                <ul class="list">
                    <a-empty style="margin-top: 20px" v-show="!searchList.length"/>
                    <li @click="selectListChange(item,index)" :class="{active: selectListIndex==index}"
                        v-for="(item,index) in searchList" :key="index">{{item.name}}
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
        name: "cityTownTree",
        props: {
            //是否显示所有名称（false来自报表的搜索）
            showNameAll:{
                type: Boolean,
                default: true
            },
            showArea: {
                type: Boolean,
                default: true,
            },
            showTown: {
                type: Boolean,
                default: true,
            },
            placeholder:{
                type:String,
                default:'',
            },
        },
        data() {
            return {
                showTree: false,
                selectCityIndex: 0,
                selectAreaIndex: 0,
                selectTownIndex: 0,
                selectListIndex: 0,
                selectObj: {
                    cityId: '',
                    areaId: '',
                    townId: '',
                    name: '',
                },
                cityList: [
                    {
                        name: '城市名称',
                        id: '',
                    }
                ],
                areaList: [
                    {
                        name: '全部',
                        id: '',
                    }
                ],
                townList: [
                    {
                        name: '全部',
                        id: '',
                    }
                ],
                selectName: '',
                searchList: {},
                switchListTag: false,
                placeholderName:'请选择城市/区域',
            }
        },
        watch: {
            selectName() {
                if (this.selectObj.name != this.selectName) {
                    if (this.selectName) {
                        this.switchListTag = true;
                        PublicAPI.searchRegionByKeyword(this.selectName).then(res => {
                            if (res.code == 200) {
                                this.searchList = res.data;
                            }
                        })
                    }
                }
                if (!this.selectName && this.switchListTag) {
                    this.switchListTag = false;
                }
            }
        },
        created() {
            document.getElementsByTagName("body")[0].addEventListener('click', () => {
                this.showTree = false;
                if (this.selectObj.name != this.selectName) {
                    this.selectName = this.selectObj.name;
                }
            })
            if(!this.showArea){
                this.placeholderName = '请选择城市';
            }
            if(this.placeholder){
              this.placeholderName = this.placeholder;
            }
            this.getCityData();
        },
        methods: {
            getCityData() {
                PublicAPI.getCityList().then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.cityList.push(...res.data)
                    }
                })
            },
            getAreaData(cityId) {
                PublicAPI.getAreaListByCityId(cityId).then(res => {
                    this.areaList = [
                        {
                            name: '全部',
                            id: '',
                        }
                    ]
                    this.townList = [
                        {
                            name: '全部',
                            id: '',
                        }
                    ]
                    if (res.code == 200) {
                        this.areaList.push(...res.data)
                    }
                })
            },
            getTownData(townId) {
                PublicAPI.getTownListByAreaId(townId).then(res => {
                    this.townList = [
                        {
                            name: '全部',
                            id: '',
                        }
                    ]
                    if (res.code == 200) {
                        this.townList.push(...res.data)
                    }
                })

            },
            selectCityChange(item, index) {
                this.selectCityIndex = index;
                this.selectAreaIndex = 0;
                this.selectTownIndex = 0;
                if (index) {
                    this.getAreaData(item.id)
                    this.selectObj = {
                        cityId: item.id,
                        areaId: '',
                        townId: '',
                        name: item.name,
                    }
                } else {
                    this.selectObj = {
                        cityId: '',
                        areaId: '',
                        townId: '',
                        name: '',
                    }
                    this.areaList = [
                        {
                            name: '全部',
                            id: '',
                        }
                    ]
                    this.townList = [
                        {
                            name: '全部',
                            id: '',
                        }
                    ]
                }
            },
            selectAreaChange(item, index) {
                this.selectAreaIndex = index;
                this.selectTownIndex = 0;
                if (index) {
                    this.getTownData(item.id)
                    this.selectObj = {
                        cityId: '',
                        areaId: item.id,
                        townId: '',
                        name: item.name,
                    }
                } else {
                    this.selectObj = {
                        cityId: this.cityList[this.selectCityIndex].id,
                        areaId: '',
                        townId: '',
                        name: this.cityList[this.selectCityIndex].name,
                    }
                    this.townList = [
                        {
                            name: '全部',
                            id: '',
                        }
                    ]
                }
            },
            selectTownChange(item, index) {
                this.selectTownIndex = index;
                if (index) {
                    this.selectObj = {
                        cityId: '',
                        areaId: '',
                        townId: item.id,
                        name: item.name,
                    }
                } else {
                    this.selectObj = {
                        cityId: '',
                        areaId: this.areaList[this.selectAreaIndex].id,
                        townId: '',
                        name: this.areaList[this.selectAreaIndex].name,
                    }
                }
            },
            selectListChange(item, index) {
                this.selectListIndex = index;
                if (item.level == 3) {
                    this.selectObj = {
                        cityId: item.id,
                        areaId: '',
                        townId: '',
                        name: item.name,
                    }
                } else if (item.level == 4) {
                    this.selectObj = {
                        cityId: '',
                        areaId: item.id,
                        townId: '',
                        name: item.name,
                    }
                } else if (item.level == 5) {
                    this.selectObj = {
                        cityId: '',
                        areaId: '',
                        townId: item.id,
                        name: item.name,
                    }
                }
            },
          clearData(){
            this.selectCityIndex = 0;
            this.selectAreaIndex = 0;
            this.selectTownIndex = 0;
            this.selectObj = {
              cityId: '',
              areaId: '',
              townId: '',
              name: '',
            }
            this.selectName = '';
            if(this.showNameAll==false){
              this.showTree = false;
            }
            this.areaList =  [
              {
                name: '全部',
                id: '',
              }
            ];
            this.townList =  [
              {
                name: '全部',
                id: '',
              }
            ];
          },
            resetData() {
                this.selectCityIndex = 0;
                this.selectAreaIndex = 0;
                this.selectTownIndex = 0;
                this.selectObj = {
                    cityId: '',
                    areaId: '',
                    townId: '',
                    name: '',
                }
                this.selectName = '';
                if(this.showNameAll==false){
                    this.showTree = false;
                }
                this.areaList =  [
                    {
                        name: '全部',
                        id: '',
                    }
                ];
                this.townList =  [
                    {
                        name: '全部',
                        id: '',
                    }
                ];
                this.$emit('selectChange', this.selectObj)
            },
            saveData() {
                this.showTree = false;
                this.selectName = this.selectObj.name;
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
        margin-bottom: 10px;

        .tree {
            position: absolute;
            top: 32px;
            z-index: 6;
            width: 100%;
            height: 300px;
            background-color: #ffffff;
            border: 1px solid @borderColor;
            border-top: none;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;

            .content {
                height: 246px;
                display: flex;

                ul {
                    flex: 1;
                    height: 100%;
                    overflow: auto;
                    border-right: 1px solid @borderColor;

                    &:last-child {
                        border-right: none;
                    }

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
</style>
