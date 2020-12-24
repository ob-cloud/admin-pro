<template>
    <div class="roleRes-box">
        <div class="setting f-clearfix">
            <div class="left">
                <div class="dictionaryList f-clearfix">
                    <a-list itemLayout="horizontal" :dataSource="dictionaryDataList" :split="false">
                        <a-list-item slot="renderItem" slot-scope="item, index" class="listItemClass"
                                     @click="leftItemClick(item)">
                            <a-list-item-meta>
                                <div slot="title" class="listItemNameClass f-clearfix cursor">
                                    <div :class="item.lable==lable?'bgClick f-clearfix':'f-clearfix'">
                                        <div class="itemIcon" v-if="item.lable=='HOUSE'">
                                            <icon-font type="iconyumengtubiao_fangyuan-2"/>
                                        </div>
                                        <div class="itemIcon" v-if="item.lable=='ITEMCONFIGURATION'">
                                          <icon-font type="iconyumengtubiao_shezhi"/>
                                        </div>
                                        <div class="itemIcon" v-if="item.lable=='CONTRACT'">
                                            <icon-font type="iconyumengtubiao_heyue"/>
                                        </div>
                                        <div class="itemIcon" v-if="item.lable=='FEESUBJECT'">
                                            <icon-font type="iconyumengtubiao_caiwuzhangdan"/>
                                        </div>
                                        <div class="itemIcon" v-if="item.lable=='PAYMENTMETHOD'">
                                            <icon-font type="iconyumengtubiao_shoufukuantujing"/>
                                        </div>
                                        <div class="itemIcon" v-if="item.lable=='CUSTOMER'">
                                            <icon-font type="iconyumengtubiao_kehu"/>
                                        </div>
                                        <div class="itemIcon" v-if="item.lable=='OTHER'">
                                          <icon-font type="iconyumengtubiao_gengduo-1"/>
                                        </div>
                                        <div class="itemName">{{item.name}}</div>
                                    </div>
                                </div>
                            </a-list-item-meta>
                        </a-list-item>
                    </a-list>
                </div>
            </div>
            <div class="right">
                <div v-if="dataList.length > 0" style="width: 96%;margin: 0 auto">
                    <div
                            v-for="(first,indexs) in dataList"
                            :key="indexs*10">
                        <a-row class="rowStyle" :style="indexs===dataList.length-1?'border-bottom:none;':''">
                            <a-col :span="3" class="colNameStyle">
                                {{first.name}}
                            </a-col>
                            <a-col :span="20" class="source-second-box f-clearfix" style="aheight:100%;">
                                <div v-for="(second,index) in first.metaList" :key="index*10">
                                    <div class="source-second-row f-clearfix" @mouseenter="itemEnter(second.id)"
                                         @mouseleave="itemLeave()">
                                        <div class="secondRowName">
                                            <a-checkbox :checked="second.isUse==1"
                                                        @change="value=>enableDisable(value,second)">{{second.name}}
                                            </a-checkbox>
                                        </div>
                                        <div class="secondRowEdit action cursor" v-if="seenOperate&&second.id==current" v-mark="['mk_set_config_bjzd']"
                                             @click="openEditDictionary(second.id,first.id,first.viewNameMaxLength)">
                                            <icon-font type="iconyumengtubiao_bianji-1" class="bgEdit"/>
                                        </div>
                                        <div class="secondRowDelete action cursor" @click="deleteDictionary(second.id,second.name)" v-mark="['mk_set_config_sczd']"
                                             v-if="second.isSystemDefault==0&&seenOperate&&second.id==current">
                                            <icon-font type="iconyumengtubiao_shanchu-" class="bgDelete"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="source-second-row" v-mark="['mk_set_config_tjzd']">
                                    <div class="add-btn-dictionary" @click="openAddDictionary(first.id,first.metaList,first.viewNameMaxLength)">
                                        <icon-font type="iconyumengtubiao_tianjia"></icon-font>
                                        添加
                                    </div>
                                </div>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <a-modal centered :title="addDictionaryTitle" v-model="addDictionaryVisible" class="ownModalBorder titDialog" :footer="null" :destroyOnClose="true">
                <add-dictionary :id="dictionaryId" :pid="dictionaryPId" :lable="dictionaryLable" :viewNameMaxLength="viewNameMaxLength" :orderIndex="dictionaryOrderIndex" @refreshPage="refreshPage"></add-dictionary>
            </a-modal>
        </div>
    </div>
</template>

<script>
    import {dictionaryEnableDisable, dictionaryListDic, dictionaryListLable, dictionaryRemove} from '@/api/set';
    import addDictionary from './addDictionary';

    export default {
        name: "companyDictionary",
        components: {
            addDictionary,
        },
        data() {
            return {
                dictionaryDataList: [],
                dataList: [],
                lable: "HOUSE",             //初始化模块（房源、合约....）
                seenOperate: false,   //角色操作显示标记（删除、标记）
                current: null,        //当前字典
                addDictionaryTitle:false, //字典标题
                addDictionaryVisible:false, //显示添加字典
                dictionaryOrderIndex:0,
                dictionaryId:"",
                dictionaryLable:"",
                dictionaryPId:"",
                viewNameMaxLength:'',
            };
        },
        created: function () {
            this.initDictionaryList();
        },
        methods: {
            //**********************事件相关*******************//
            //左侧某一项点击
            leftItemClick(item) {
                //点击左侧列表项，获取字典列表
                this.lable = item.lable;
                this.dictionaryListDic(this.lable);
            },
            //某一字典鼠标移入事件
            itemEnter(index) {
                this.seenOperate = true;
                this.current = index;
            },
            //某一字典鼠标移出事件
            itemLeave() {
                this.seenOperate = false;
                this.current = null;
            },
            //打开添加字典事件
            openAddDictionary(id, metaList,viewNameMaxLength) {
                let metaListSize = 0;
                if (metaList) {
                    metaListSize = metaList.length;
                }
                this.addDictionaryVisible = true;
                this.addDictionaryTitle = "新增字典";
                this.dictionaryPId = id;
                this.dictionaryId = "";
                this.dictionaryLable = this.lable;
                this.dictionaryOrderIndex = metaListSize;
                this.viewNameMaxLength = viewNameMaxLength;
            },
            //打开修改字典事件
            openEditDictionary(id,pid,viewNameMaxLength) {
                this.addDictionaryVisible = true;
                this.addDictionaryTitle = "修改字典";
                this.dictionaryPId = pid;
                this.dictionaryId = id;
                this.viewNameMaxLength = viewNameMaxLength;
            },
            //添加修改字典后刷新页面
            refreshPage(){
                this.addDictionaryVisible = false;
                this.initDictionaryList();
            },
            //点击删除字典事件
            deleteDictionary(id,name) {
                let parameter = {};
                let that =this;
                this.$modal.confirm({
                        title: '确定要删除字典项 「'+ name+'」吗？',
                        content: '删除后将不可恢复',
                        okText: '确认',
                        cancelText: '取消',
                        icon: () => <icon-font type="iconyumengtubiao_shanchu-1" style="color:#f5222d" />,
                    onOk() {
                        that.dictionaryRemove(id, parameter);
                    },
                    onCancel() {
                    },
                });
            },
            //**********api相关*********************//
            //获取左侧列表
            dictionaryListLable() {
                let parameter = {};
                dictionaryListLable(parameter).then(res => {
                    this.dictionaryDataList = res.data;
                });
            },
            //获取相应字典
            dictionaryListDic(parameter) {
                dictionaryListDic(parameter).then(res => {
                    this.dataList = res.data;
                });
            },
            //禁用/启用某一个字典
            enableDisable(e, second) {
                second.isUse = e.target.checked ? 1 : 0;
                dictionaryEnableDisable(second.id, e.target.checked ? 1 : 0);
            },
            //删除某一字典
            dictionaryRemove(id, parameter) {
                dictionaryRemove(id, parameter).then(res => {
                    this.dictionaryListDic(this.lable);
                });
            },
            //*******************其他*****************//
            //页面初始化
            initDictionaryList() {
                this.dictionaryListLable();
                this.dictionaryListDic(this.lable);
            }
        }
    };


</script>

<style scoped lang="less">
    .roleRes-box {
        height: 100%;
    }

    .bgClick {
        color: @themeColor;
    }

    .setting {
        background-color: #F1F2F5;
        height: 100%;

        .left {
            width: 160px;
            background-color: #FFFFFF;
            float: left;
            position: absolute;
            height: calc(100vh - 135px);
            .dictionaryList {
                margin-top: 15px;

                .listItemClass {
                    height: 40px;
                    line-height: 40px;
                    margin-left: 22px;

                    .itemIcon {
                        float: left;
                        svg{
                          width: 16px;
                          height: 16px;
                        }
                    }

                    .itemName {
                        float: left;
                        margin-left: 8px;
                    }
                }
            }
        }

        .right {
            width: calc(100% - 174px);
            background-color: #FFFFFF;
            float: right;
            min-height: calc(100vh - 220px);
            // height: calc(100%  - 0.1px);
            .rowStyle {
                border-bottom: 1px dashed #ddd;
                height: 100%;
                padding: 20px 0 20px 0;

                .colNameStyle {
                    height: 40px;
                    line-height: 40px;
                    color: #111111;
                }

                .source-second-row {
                    //border-bottom: 1px solid #fafaf9;
                    width: 25%;
                    height: 40px;
                    line-height: 40px;
                    float: left;

                    .secondRowName {
                        float: left;
                        margin-right: 8px;
                    }

                    .secondRowDelete {
                        float: left;
                        margin-left: 8px;
                    }

                    .secondRowEdit {
                        float: left;
                    }

                    .bgDelete {
                        color: @wranColor;
                    }

                    .bgEdit {
                        color: @themeColor;
                    }

                    .add-btn-dictionary {
                        width: 68px;
                        height: 24px;
                        line-height: 24px;
                        color: #0A87F8;
                        font-size: 14px;
                        cursor: pointer;
                        border: 1px solid #0A87F8;
                        margin-top: 8px;
                        text-align: center
                    }
                }
            }
        }
    }
    /deep/ .content{
        background-color:#777777;

    }
</style>
<style lang="less" scoped>
    /deep/ .ant-popover-inner-content {
        padding: 0;

        .action {
            padding: 8px 18px;
        }

        .action:hover {
            cursor: pointer;
            background: rgba(10, 135, 248, 0.1);
        }
    }
</style>
