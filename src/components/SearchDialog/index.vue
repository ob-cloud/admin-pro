<template>
    <div class="search-dialog">
        <div class="search-input-wrap">
            <ul v-if="searchDataArr.length" class="search-list">
                <li v-for="(item,index) in searchDataArr" :key="index" v-if="index<2" @click="clickFocus">
                    <p class="overHidde"><span class="title">{{item.title ? item.title : '综合检索'}}：</span><span>{{item.val}}</span></p>
                    <icon-font @click.stop="deleteTag(index)" class="close-icon" type="iconyumengtubiao_guanbi-3" />
                </li>
                <li v-if="searchDataArr.length > 2" @click="clickFocus">
                    <p>+ {{searchDataArr.length - 2}}</p>
                </li>
            </ul>
            <a-input-search class="search-input" :placeholder="copyPlaceholder" style="width: 472px" @click="clickFocus"/>
        </div>
        <a-drawer
                placement="right"
                :width="620"
                :closable="false"
                @close="closeDrawer"
                :visible="visible"
        >
            <div class="search-wrap">
                <div class="search-content">
                    <a-input-group compact class="top-search"
                                   v-for="(item,index) in searchList" :key="index"
                                   v-if="item.key == 'fuzzyQueryType'">
                        <a-select v-if="!fuzzyQueryTypeProhibitSelected" :defaultValue="item.list[0].label"
                                  @select="changeFuzzyQueryType"
                                  style="width: 100px">
                            <a-select-option :value="val.value" v-for="(val,i) in item.list" :key="i">{{val.label}}
                            </a-select-option>
                        </a-select>
                        <a-input-search id="searchInput" class="search-input" @change="changeFuzzyQuerySearchFlag" @pressEnter="searchFuzzyQuery" @blur="searchFuzzyQuery"
                                        v-model="searchData.fuzzyKeyword" :placeholder="placeholder" :class="fuzzyQueryTypeProhibitSelected?'prohibitStyle':''"
                                        :style="fuzzyQueryTypeProhibitSelected?'width:100%':'width: calc(100% - 100px)'"/>
                    </a-input-group>
                  <label-item title="录入人" border style="margin-bottom: 18px;position: relative" v-if="sourceSpecialFlag">
                    <dept-employee-tree ref="selectDeptEmpSource" placeholder="请选择录入人或录入人所属部门" :showEmployee="showEmployee" :resMark="resMark"
                                        @cancelOtherTree="cancelOtherTree(['selectDeptEmp','selectCostType','selectCityTown'])"
                                        @selectChange="selectSourceSpecial">
                    </dept-employee-tree>
                    <div style="position:absolute;font-size: 14px;color: #777777;top:8px;left:52px;" >(所属部门或人员)</div>
                  </label-item>
                    <label-item :title="deptEmpTitle" border v-if="showDeptEmp" style="margin-bottom: 18px;position: relative">
                        <dept-employee-tree ref="selectDeptEmp" :placeholder="deptPlaceholder" :showEmployee="showEmployee" :resMark="resMark"
                                            @cancelOtherTree="cancelOtherTree(['selectCostType','selectCityTown'])"
                                            @selectChange="selectDeptEmp">
                        </dept-employee-tree>
                      <div v-if="deptEmpTitle=='账单所属人'" style="position:absolute;font-size: 14px;color: #777777;top:8px;left:84px;" >(所属部门或人员)</div>
                      <div v-if="deptEmpTitle=='物品录入人'" style="position:absolute;font-size: 14px;color: #777777;top:8px;left:84px;" >(所属部门或人员)</div>
                      <div v-if="deptEmpTitle=='所属人'" style="position:absolute;font-size: 14px;color: #777777;top:8px;left:52px;" >(所属部门或人员)</div>
                      <div v-if="deptEmpTitle=='维护人'" style="position:absolute;font-size: 14px;color: #777777;top:8px;left:52px;" >(所属部门或人员)</div>
                      <div v-if="deptEmpTitleOtherFlag" style="position:absolute;font-size: 14px;color: #777777;top:8px;left:84px;" >(所属部门或人员)</div>
                    </label-item>
                  <label-item title="确认人" border style="margin-bottom: 18px;position: relative" v-if="billSpecialFlag">
                    <dept-employee-tree ref="selectDeptEmpBill" placeholder="请选择确认人或确认人所属部门" :showEmployee="showEmployee" :resMark="resMark"
                                        @cancelOtherTree="cancelOtherTree(['selectDeptEmp','selectCostType','selectCityTown'])"
                                        @selectChange="selectDeptEmpSpecial">
                    </dept-employee-tree>
                    <div v-if="deptEmpTitle=='账单所属人'" style="position:absolute;font-size: 14px;color: #777777;top:8px;left:84px;" >(所属部门或人员)</div>
                    <div v-if="deptEmpTitle=='所属人'" style="position:absolute;font-size: 14px;color: #777777;top:8px;left:52px;" >(所属部门或人员)</div>
                  </label-item>
                  <label-item title="确认人" class="u-bottom-border billSpecialInputFlagStyle" border style="margin-bottom: 18px;position: relative" v-if="billSpecialInputFlag">
                    <a-select
                        mode="multiple"
                        placeholder="请选择确认人"
                        :value="selectedItems"
                        :allowClear="true"
                        style="width: 100%"
                        @change="handleChange"
                        :filter-option="filterOption"
                    >
                      <a-select-option v-for="item in filteredOptions" :key="item.id" :value="item.id">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </label-item>
                    <label-item :title="cityTownTitle" border v-if="showCityTown" style="margin-bottom: 18px;">
                        <city-town-tree ref="selectCityTown" :showArea="showArea" :showTown="showTown" @cancelOtherTree="cancelOtherTree(['selectCostType','selectDeptEmp'])"
                                        :placeholder="cityPlaceholder" @selectChange="selectCityTownChange">
                        </city-town-tree>
                    </label-item>
                    <label-item :title="showCostTypePlaceholder" border v-if="showCostType" style="margin-bottom: 10px;">
                        <cost-type-select ref="selectCostType" :defaultName="showCostTypeDefaultName" @cancelOtherTree="cancelOtherTree(['selectDeptEmp','selectCityTown'])"
                                          @selectChange="selectCostType">
                        </cost-type-select>
                    </label-item>
                    <label-item title="物品" border v-if="showGoodsType" style="margin-bottom: 10px;">
                      <goods-type-select ref="selectGoodsType" @cancelOtherTree="cancelOtherTree(['selectDeptEmp','selectCityTown'])"
                                        @selectChange="selectGoodsType">
                      </goods-type-select>
                    </label-item>
                    <label-item :title="item.title" border v-for="(item,index) in searchList" :key="index"
                                v-if="item.key != 'fuzzyQueryType'">
                        <div class="list workorder" v-if="item.type&&item.type=='checkbox'" style="background:rgba(247,248,251,1);margin-right:10px;padding-left: 5px;">
                            <div v-for="(val,index) in item.list" style="width: 23%">
                                <a-checkbox @change="onChange(val,item.list,index,item)" v-model="val.checked">{{val.label}}</a-checkbox>
                            </div>
                        </div>
                        <div class="list" v-else-if="item.type&&item.type=='input'" style="margin: 0 10px 18px 0">
                            <a-input-group style="display: inline-block;width: auto;" compact>
                                <a-input v-model="item.value_start" @blur="inputTypeChange(item,item.key[0])" style=" width: 190px; text-align: center" :placeholder="item.placeholderNames[0]" />
                                <a-input
                                        style=" width: 34px; border-left: 0; pointer-events: none; backgroundColor: #fff"
                                        placeholder="~"
                                        disabled
                                />
                                <a-input v-model="item.value_end" @blur="inputTypeChange(item,item.key[1])" style="width: 190px; text-align: center; border-left: 0" :placeholder="item.placeholderNames[1]" />
                            </a-input-group>
                            <span class="current cursor" @click="clearInputType(item)" style="color: #0A87F8;font-size: 14px;line-height: 32px;margin-left: 20px;"><icon-font type="iconyumengtubiao_shanchu-" /> 清空</span>
                        </div>
                        <div class="list u-bottom-border selectListStyle" v-else-if="item.type&&item.type=='select'" style="margin: 0 0px 18px 0">
                          <a-select placeholder="请选择" :showSearch="true" :filterOption="(inputValue,option)=>filterSelectOption(inputValue,option,item)"  v-model="item.id" @change="goSelect(item)" style="width: 100%;" :allowClear="true">
                            <a-select-option v-for="itemTemp in item.list" :key="itemTemp.id" :value="itemTemp.id">
                              {{ itemTemp.showName }}
                            </a-select-option>
                          </a-select>
                        </div>
                        <div class="list" v-else>
                            <span class="item" :class="{active: item.currentActiveIndex==i}"
                                  v-for="(val,i) in item.list" :key="i"
                                  v-if="val.label !== '自定义'" :style="val.label.length>9?'padding:0 5px':''"
                                  @click="selectSearchValue(item,index,val,i)">
                                {{val.label}}
                            </span>
                            <span class="item" :class="{active: item.currentActiveIndex==i}"
                                  @click="showCustom(item,index,val,i)"
                                  :key="i" v-else-if="val.label === '自定义'">{{val.label}}
                            </span>
                            <div v-for="(val,i) in item.list">
                                <a-range-picker v-if="val.label === '自定义' && item.currentActiveIndex==i && val.type != 'input'" :autoFocus="true"
                                                :style="item.style?item.style:''"
                                                @change="(date,dateString)=>changeDate(date, dateString ,item, i, val)"
                                />
                                <a-input-group v-if="val.label === '自定义' && item.currentActiveIndex==i && val.type == 'input'" style="display: inline-block;width: auto;" compact>
                                    <a-input @change="inputChange(item,'start')" style=" width: 100px; text-align: center" placeholder="最短时长" />
                                    <a-input
                                            style=" width: 34px; border-left: 0; pointer-events: none; backgroundColor: #fff"
                                            placeholder="~"
                                            disabled
                                    />
                                    <a-input @change="inputChange(item,'end')" style="width: 100px; text-align: center; border-left: 0" placeholder="最长时长" />
                                </a-input-group>
                            </div>
                        </div>
                    </label-item>
                </div>
                <div class="search-footer f-clearfix">
                    <p class="f-fl clear" @click.stop="resetData">
                        <icon-font type="iconyumengtubiao_zhongzhi"/>
                        <span>重置筛选条件</span>
                    </p>
                    <a-button class="f-fr" type="primary" @click="closeThis">确定</a-button>
                </div>
            </div>
        </a-drawer>

    </div>
</template>

<script>
    import Vue from 'vue'
    import DeptEmployeeTree from '@/components/DeptEmployeeTree'
    import CityTownTree from '@/components/CityTownTree'
    import CostTypeSelect from '@/components/CostTypeSelect/index';
    import GoodsTypeSelect from '@/components/goodsTypeSelect/index';
    import * as PublicAPI from "@/api/public";
    export default {
        name: "searchDialog",
        props: {
          sourceSpecialFlag:{
            type:Boolean,
            default:false,
          },
          billSpecialInputFlag:{
            type:Boolean,
            default:false,
          },
          billSpecialFlag:{
            type:Boolean,
            default:false,
          },
            placeholder: {
                type: String,
                default: '房源编号/房源地址/门牌号/租客姓名/租客电话/业主姓名/业主电话/标签',
            },
            showCostTypePlaceholder: {
                type: String,
                default: '收支类型',
            },
            showCostTypeDefaultName:{
                type: String,
                default: '请选择收支类型',
            },
            resMark:{
                type: String,
                default:'',
            },
            deptEmpTitleOtherFlag:{
                type: Boolean,
                default: false,
            },
            deptTitle:{
                type: String,
                default:'',
            },
            deptPlaceholder:{
                type: String,
                default:'',
            },
            showDeptEmp: {
                type: Boolean,
                default: true,
            },
            showEmployee: {
                type: Boolean,
                default: true,
            },
            showCityTown: {
                type: Boolean,
                default: true,
            },
            showArea: {
                type: Boolean,
                default: true,
            },
            showTown: {
                type: Boolean,
                default: true,
            },
            cityDefaultTitle:{
              type: String,
              default:'',
            },
            cityPlaceholder:{
              type: String,
              default:'',
            },
            showCostType: {
                type: Boolean,
                default: false,
            },
            showGoodsType: {
              type: Boolean,
              default: false,
            },
            searchList: {
                type: Array,
                default: () => {
                    let currentTime = Vue.prototype.$moment().startOf('day').valueOf()
                    let currentWeek = Vue.prototype.$moment().endOf('week').valueOf()
                    let currentMonth = Vue.prototype.$moment().endOf('month').valueOf()
                    return [
                        {
                            key: 'fuzzyQueryType',
                            title: '综合检索',
                            list: [
                                {
                                    label: '综合检索',
                                    value: 0,
                                },
                                {
                                    label: '房源编号',
                                    value: 1
                                },
                                {
                                    label: '房源地址',
                                    value: 2
                                },
                                {
                                    label: '门牌号',
                                    value: 3
                                },
                                {
                                    label: '租客姓名',
                                    value: 4
                                },
                                {
                                    label: '租客电话',
                                    value: 5
                                },
                                {
                                    label: '业主姓名',
                                    value: 6
                                },
                                {
                                    label: '业主电话',
                                    value: 7
                                },
                                {
                                  label: '标签',
                                  value: 8
                                },
                            ],
                        },
                        {
                            key: 'houseType',
                            title: '房源类型',
                            currentActiveIndex: 0,
                            list: [
                                {
                                    label: '全部',
                                    value: ''
                                },
                                {
                                    label: '合租',
                                    value: 2
                                },
                                {
                                    label: '整租',
                                    value: 1
                                },
                            ],
                        },
                        {
                            key: 'bizStatus',
                            title: '业务状态',
                            currentActiveIndex: 0,
                            list: [
                                {
                                    label: '全部',
                                    value: ''
                                },
                                {
                                    label: '已预定',
                                    value: 1
                                },
                                {
                                    label: '租约待录',
                                    value: 2
                                },
                                {
                                    label: '租约待签字',
                                    value: 3
                                },
                                {
                                    label: '租约待确认',
                                    value: 4
                                },
                                {
                                    label: '即将搬入',
                                    value: 5
                                },
                                {
                                    label: '租约快到期',
                                    value: 6
                                },
                                {
                                    label: '租约到期未退',
                                    value: 7
                                },
                                {
                                    label: '近期待收款',
                                    value: 8
                                },
                                {
                                    label: '有欠款',
                                    value: 9
                                }
                            ],
                        },
                        {
                            key: 'room',
                            title: '户型',
                            currentActiveIndex: 0,
                            list: [
                                {
                                    label: '不限',
                                    value: ''
                                },
                                {
                                    label: '一居',
                                    value: 1
                                },
                                {
                                    label: '两居',
                                    value: 2
                                },
                                {
                                    label: '三居',
                                    value: 3
                                },
                                {
                                    label: '四居',
                                    value: 4
                                },
                                {
                                    label: '五居及以上',
                                    value: 9
                                },
                            ],
                        },
                        {
                            key: ['actualPriceBegin', 'actualPriceEnd'],
                            title: '出租价格',
                            currentActiveIndex: 0,
                            list: [
                                {
                                    label: '不限',
                                    value: ['', '']
                                },
                                {
                                    label: '≤1000元',
                                    value: [0, 100000]
                                },
                                {
                                    label: '1000-1500元',
                                    value: [100000, 150000]
                                },
                                {
                                    label: '1500-2000元',
                                    value: [150000, 200000]
                                },
                                {
                                    label: '2000-3000元',
                                    value: [200000, 300000]
                                },
                                {
                                    label: '3000-5000元',
                                    value: [300000, 500000]
                                },
                                {
                                    label: '5000-8000元',
                                    value: [500000, 800000]
                                },
                                {
                                    label: '>8000元',
                                    value: [800000, '']
                                }
                            ],
                        },
                        {
                            key: ['houseAreaBegin', 'houseAreaEnd'],
                            title: '房屋面积',
                            currentActiveIndex: 0,
                            list: [
                                {
                                    label: '不限',
                                    value: ['', '']
                                },
                                {
                                    label: '≤10㎡',
                                    value: [0, 10]
                                },
                                {
                                    label: '10-30㎡',
                                    value: [10, 30]
                                },
                                {
                                    label: '30-50㎡',
                                    value: [30, 50]
                                },
                                {
                                    label: '50-70㎡',
                                    value: [50, 70]
                                },
                                {
                                    label: '70-90㎡',
                                    value: [70, 90]
                                },
                                {
                                    label: '90-110㎡',
                                    value: [90, 110]
                                },
                                {
                                    label: '≥110㎡',
                                    value: [110, '']
                                }
                            ],
                        },
                        {
                            key: ['vacantDaysBegin', 'vacantDaysEnd'],
                            title: '空置天数',
                            currentActiveIndex: 0,
                            list: [
                                {
                                    label: '不限',
                                    value: ['', '']
                                },
                                {
                                    label: '≤10天',
                                    value: [0, 10]
                                },
                                {
                                    label: '10-20天',
                                    value: [10, 20]
                                },
                                {
                                    label: '20-30天',
                                    value: [20, 30]
                                },
                                {
                                    label: '＞30天',
                                    value: [30, '']
                                }
                            ],
                        },
                        {
                            key: 'orientation',
                            title: '朝向',
                            currentActiveIndex: 0,
                            list: [
                                {
                                    label: '不限',
                                    value: ''
                                },
                                {
                                    label: '东',
                                    value: 1
                                },
                                {
                                    label: '南',
                                    value: 2
                                },
                                {
                                    label: '西',
                                    value: 3
                                },
                                {
                                    label: '北',
                                    value: 4
                                },
                                {
                                    label: '南北',
                                    value: 5
                                },
                            ],
                        },
                        {
                            key: 'decorationType',
                            title: '装修类型',
                            currentActiveIndex: 0,
                            list: [
                                {
                                    label: '不限',
                                    value: ''
                                },
                                {
                                    label: '毛坯',
                                    value: 4
                                },
                                {
                                    label: '简装',
                                    value: 3
                                },
                                {
                                    label: '精装',
                                    value: 2
                                },
                                {
                                    label: '豪华装',
                                    value: 1
                                }
                            ],
                        },
                        {
                            key: 'isHavePic',
                            title: '是否有图',
                            currentActiveIndex: 0,
                            list: [
                                {
                                    label: '不限',
                                    value: ''
                                },
                                {
                                    label: '有图',
                                    value: 1
                                },
                                {
                                    label: '无图',
                                    value: 0
                                }
                            ],
                        },
                        {
                            key: ['checkoutBeginDate', 'checkoutEndDate'],
                            title: '预计离房时间',
                            currentActiveIndex: 0,
                            list: [
                                {
                                    label: '不限',
                                    value: ['', '']
                                },
                                {
                                    label: '本周离房',
                                    value: [currentTime, currentWeek]
                                },
                                {
                                    label: '本月离房',
                                    value: [currentTime, currentMonth]
                                },
                                {
                                    label: '自定义',
                                    value: ['', '']
                                }
                            ],
                        },
                    ]
                },
            }
        },
        data() {
            return {
                visible: false,
                searchData: {},
                selectIndex: 0,
                deptEmpTitle: '部门/人员',
                cityTownTitle:'城市/区域',
                searchDataArr: [
                ],
                fuzzyQueryObj: {
                    title: '全部',
                    val: '',
                },
                copyPlaceholder: '',
                fuzzyQueryTypeProhibitSelected:false,    //若搜索只有1个全部，不用下拉
                fuzzyQuerySearchFlag:false,              //综合检索是否刷新主页面
              selectedItems:[],
              idNameList:[],
              filteredOptions:[],
            }
        },
        components: {
            DeptEmployeeTree,
            CityTownTree,
            CostTypeSelect,
            GoodsTypeSelect,
        },
      computed: {
      },
        created() {
          if(this.billSpecialInputFlag){
            PublicAPI.listIdName().then(res => {
              if (res.code == 200) {
                this.idNameList = [];
                this.idNameList.push(...res.data);
                this.filteredOptions = [];
                this.filteredOptions.push(...res.data);
              }
            })
          }
            if(this.deptTitle){
                this.deptEmpTitle = this.deptTitle;
            }
            else{
                if (!this.showEmployee){
                    this.deptEmpTitle = '部门'
                }
            }
            if(!this.showArea){
                this.cityTownTitle = '城市'
            }
            if(this.cityDefaultTitle){
              this.cityTownTitle = this.cityDefaultTitle;
            }
            this.copyPlaceholder = this.placeholder;
            this.initFuzzyQueryTypeProhibitSelected();
        },
        methods: {
          filterSelectOption(inputValue, option,item){
            if(!inputValue){
              return true;
            }
            let flag = false;
            item.list.forEach((item)=>{
              if(option.key === item.id&&item.showName.indexOf(inputValue)>-1){
                flag = true;
              }
            });
            return flag;
          },
          filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
          },
          handleChange(selectedItems) {
            this.selectedItems = selectedItems;
          },
            initFuzzyQueryTypeProhibitSelected(){
                this.searchList.forEach((listItem)=>{
                    if(listItem.key&&listItem.key == 'fuzzyQueryType'){
                        if(listItem.list&&listItem.list.length==1){
                            this.fuzzyQueryTypeProhibitSelected = true;
                        }
                    }
                });
            },
            changeFuzzyQueryType(value,option) {
                this.searchData.fuzzyQueryType = value;
                this.fuzzyQueryObj.title = option.componentOptions.children[0].text;
                if(this.searchData.fuzzyKeyword){
                    this.confirm();
                }
            },
            onChange(val,list,index,item){
                if(val.checked){
                    for (let i = 0; i < list.length; i++) {
                        if(i!=index){
                            list[i].checked = false;
                        }
                    }
                    this.searchData[item.key] = val.value;
                    this.searchDataArr.push({
                        title: '上门时段',
                        val: val.label,
                    })
                } else{
                    let tag = -2;
                    this.searchDataArr.forEach((listItem,idx)=> {
                        if (listItem.title == '上门时段') {
                            tag = idx;
                        }
                    });
                    if (tag > -1){
                        this.searchDataArr.splice(tag,1)
                    }
                }
                this.confirm();
            },
            selectSearchValue(item, index, val, i) {
                item.currentActiveIndex = i
                if (typeof item.key === "string") {
                    let key = item.key;
                    this.searchData[key] = val.value
                } else {
                    let keyStart = item.key[0];
                    let keyEnd = item.key[1];
                    this.searchData[keyStart] = val.value[0]
                    this.searchData[keyEnd] = val.value[1]
                }
                //判断是否存在互斥
               if(item.mutexIndex){
                 this.searchList.forEach((temp,tempIndex)=>{
                    if(item.mutexIndex == tempIndex){
                      //还原互斥选中项
                      temp.currentActiveIndex = 0;
                      //清除互斥文本框显示值
                      this.changeSearchDataArr(temp.title,'');
                      //清除筛选值
                      if (typeof temp.key === "string") {
                        let key = temp.key;
                        this.searchData[key] = '';
                      } else {
                        let keyStart = temp.key[0];
                        let keyEnd = temp.key[1];
                        this.searchData[keyStart] = '';
                        this.searchData[keyEnd] = '';
                      }
                    }
                 });
               }
                let tag = -2;
                this.searchDataArr.forEach((listItem,idx)=>{
                    if (listItem.title == item.title){
                        listItem.val = val.label
                        tag = -1;
                        if (typeof item.key === "string") {
                            if (!val.value && !i){
                                tag = idx
                            }
                        } else {
                            if (!val.value[0] && !val.value[1] && !i){
                                tag = idx
                            }
                        }
                    }
                })
                if (tag == -2){
                  let typeName = typeof val.value;
                  if((typeName=='string'||typeName=='number')&&val.value){
                    this.searchDataArr.push({
                      title: item.title,
                      val: val.label,
                    })
                  }
                  if(typeName=='object'){
                    let haveValue = false;
                    val.value.forEach((item)=>{
                      if(item){
                        haveValue = true;
                      }
                    });
                    if(haveValue){
                      this.searchDataArr.push({
                        title: item.title,
                        val: val.label,
                      })
                    }
                  }
                }
                if (tag > -1){
                    this.searchDataArr.splice(tag,1)
                }
                this.confirm();
            },
            closeDrawer() {
                this.visible=!this.visible
            },
            closeThis(){
                this.visible = false;
            },
            changeFuzzyQuerySearchFlag(){
                this.fuzzyQuerySearchFlag = true;
            },
            searchFuzzyQuery(){
                if(this.fuzzyQuerySearchFlag){
                    this.confirm();
                }
            },
            confirm() {
                this.fuzzyQuerySearchFlag = false;
                this.fuzzyQueryObj.val = this.searchData.fuzzyKeyword;
                if (this.searchData.fuzzyKeyword){
                    if (!this.searchData.fuzzyQueryType){
                        this.searchData.fuzzyQueryType = 0;
                    }
                    if (this.searchDataArr[0] && this.searchDataArr[0].title == this.fuzzyQueryObj.title){
                        this.searchDataArr[0].val = this.fuzzyQueryObj.val
                    }else{
                        this.searchDataArr.unshift(this.fuzzyQueryObj)
                    }
                }else{
                    if (this.searchDataArr.length && this.searchDataArr[0].title == this.fuzzyQueryObj.title){
                        this.searchDataArr.splice(0,1)
                    }
                }
                if (this.searchDataArr.length){
                    this.copyPlaceholder = ''
                }else{
                    this.copyPlaceholder = this.placeholder
                }
                this.searchData.current = 1;
                this.$emit('search', this.searchData)
            },
            resetData() {
                this.searchDataArr = [];
                this.searchList.forEach((val) => {
                    if(val.type=='select'){
                      val.id = undefined;
                    }
                    if (val.currentActiveIndex) {
                        val.currentActiveIndex = 0;
                        if (typeof val.key === "string") {
                            let key = val.key;
                            this.searchData[key] = ''
                        } else {
                            let keyStart = val.key[0];
                            let keyEnd = val.key[1];
                            this.searchData[keyStart] = ''
                            this.searchData[keyEnd] = ''
                        }
                    }
                })
                for (let i in this.searchData) {
                    this.searchData[i] = '';
                }
                if (this.$refs.selectDeptEmp) {
                    this.$refs.selectDeptEmp.selectName = '';
                    this.$refs.selectDeptEmp.selectObj = {
                        id: '',
                        name: '',
                        type: '',
                    }
                }
                if (this.$refs.selectCityTown) {
                    this.$refs.selectCityTown.selectName = '';
                    this.$refs.selectCityTown.selectObj = {
                        cityId: '',
                        areaId: '',
                        townId: '',
                        name: '',
                    }
                }
                if (this.$refs.selectCostType){
                    this.$refs.selectCostType.selectObj = {}
                }
                this.searchData.current = 1;
                this.copyPlaceholder = this.placeholder;
                if(this.selectedItems.length>0){
                  this.selectedItems = [];
                }
                this.$emit('search', this.searchData)
            },
            showCustom(item, index, val, i) {
                item.currentActiveIndex = i;
                let keyStart = item.key[0];
                let keyEnd = item.key[1];
                this.searchData[keyStart] = val.value[0];
                this.searchData[keyEnd] = val.value[1];
            },
            changeDate(date, dateString, item, i, val) {
                // console.log(date, dateString, item, i, val);
                let keyStart = item.key[0];
                let keyEnd = item.key[1];
                this.searchData[keyStart] = this.$moment(dateString[0]).valueOf();
                this.searchData[keyEnd] = this.$moment(dateString[1]).valueOf();
                let dateStr = dateString[0] + ' ~ ' + dateString[1];
                if(dateString[0]||dateString[1]){
                  this.changeSearchDataArr(item.title,dateStr);
                }
                else{
                  this.changeSearchDataArr(item.title,'');
                }

                this.confirm();
            },
            cancelOtherTree(typeRef=[]){
                typeRef.forEach((name)=>{
                    if (this.$refs[name]){
                        this.$refs[name].showTree = false
                    }
                })
            },
            selectCityTownChange(selectObj) {
                // console.log(selectObj)
                this.searchData.cityId = selectObj.cityId;
                this.searchData.areaId = selectObj.areaId;
                this.searchData.townId = selectObj.townId;
                this.changeSearchDataArr('城市/区域',selectObj.name);
                this.confirm();
            },
            selectDeptEmp(selectObj) {
                if (selectObj.type == 'dept') {
                    this.searchData.deptId = selectObj.id;
                    this.searchData.maintainerId = '';
                    this.changeSearchDataArr('部门/人员',selectObj.name);
                } else if (selectObj.type == 'employee') {
                    this.searchData.deptId = '';
                    this.searchData.maintainerId = selectObj.id;
                    this.changeSearchDataArr('部门/人员',selectObj.name);
                }
                else if(selectObj.type == ''){
                    this.searchData.deptId = '';
                    this.searchData.maintainerId = '';
                    this.changeSearchDataArr('部门/人员','');
                }
                this.confirm();
            },
          selectSourceSpecial(selectObj){
            if (selectObj.type == 'dept') {
              this.searchData.createrDeptId = selectObj.id;
              this.searchData.createrId = '';
              this.changeSearchDataArr('录入人部门/人员',selectObj.name);
            } else if (selectObj.type == 'employee') {
              this.searchData.createrDeptId = '';
              this.searchData.createrId = selectObj.id;
              this.changeSearchDataArr('录入人部门/人员',selectObj.name);
            }
            else if(selectObj.type == ''){
              this.searchData.createrDeptId = '';
              this.searchData.createrId = '';
              this.changeSearchDataArr('录入人部门/人员','');
            }
            this.confirm();
          },
          selectDeptEmpSpecial(selectObj){
            if (selectObj.type == 'dept') {
              this.searchData.affirmEmpDeptId = selectObj.id;
              this.searchData.affirmEmpId = '';
              this.changeSearchDataArr('确认人部门/人员',selectObj.name);
            } else if (selectObj.type == 'employee') {
              this.searchData.affirmEmpDeptId = '';
              this.searchData.affirmEmpId = selectObj.id;
              this.changeSearchDataArr('确认人部门/人员',selectObj.name);
            }
            else if(selectObj.type == ''){
              this.searchData.affirmEmpDeptId = '';
              this.searchData.affirmEmpId = '';
              this.changeSearchDataArr('确认人部门/人员','');
            }
            this.confirm();
          },
            selectCostType(selectObj){
                this.searchData.feeSubjectIdList = [];
                let nameStr = ''
                selectObj.metaList && selectObj.metaList.forEach((item)=>{
                    this.searchData.feeSubjectIdList.push(item.id)
                    nameStr = nameStr + item.name + ';'
                })
                this.changeSearchDataArr('收支类型',nameStr);
                this.confirm();
            },
            selectGoodsType(selectObj){
              this.searchData.goodsIdList = [];
              let nameStr = ''
              selectObj.metaList && selectObj.metaList.forEach((item)=>{
                this.searchData.goodsIdList.push(item.id)
                nameStr = nameStr + item.name + ';'
              })
              this.changeSearchDataArr('物品',nameStr);
              this.confirm();
            },
            clickFocus() {
                this.visible = !this.visible;
                this.$nextTick(() => {
                    document.getElementById('searchInput').focus()
                })
            },
            changeSearchDataArr(title,value){
                let flag = false;
                this.searchDataArr.forEach((listItem,idx)=>{
                    if (listItem.title == title){
                        listItem.val = value;
                        flag = true
                    }
                })
                //清空处理
                if(flag){
                    if(!value){
                        let temp = [];
                        this.searchDataArr.forEach((listItem)=>{
                            if(listItem.title != title){
                                temp.push(listItem);
                            }
                        });
                        this.searchDataArr = temp;
                    }
                }
                if (!flag){
                    if(value){
                        this.searchDataArr.push({
                            title: title,
                            val: value
                        })
                    }
                }
            },
            deleteTag(index){
                if (this.fuzzyQueryObj.val && this.searchDataArr[index].title == this.fuzzyQueryObj.title){
                    this.searchData.fuzzyQueryType = 0;
                    this.searchData.fuzzyKeyword = '';
                    this.fuzzyQueryObj.val = '';
                }else if (this.searchDataArr[index].title == '城市/区域'){
                    this.searchData.cityId = ''
                    this.searchData.areaId = ''
                    this.searchData.townId = ''
                    this.$refs.selectCityTown.selectName = '';
                    this.$refs.selectCityTown.selectObj = {
                        cityId: '',
                        areaId: '',
                        townId: '',
                        name: '',
                    }
                }else if (this.searchDataArr[index].title == '部门/人员'){
                    this.searchData.deptId = '';
                    this.searchData.maintainerId = '';
                    this.$refs.selectDeptEmp.selectName = '';
                    this.$refs.selectDeptEmp.selectObj = {
                        id: '',
                        name: '',
                        type: '',
                    }
                }else if (this.searchDataArr[index].title == '确认人部门/人员'){
                  this.searchData.affirmEmpDeptId = '';
                  this.searchData.affirmEmpId = '';
                  this.$refs.selectDeptEmpBill.selectName = '';
                  this.$refs.selectDeptEmpBill.selectObj = {
                    id: '',
                    name: '',
                    type: '',
                  }
                }
                else if (this.searchDataArr[index].title == '录入人部门/人员'){
                  this.searchData.createrDeptId = '';
                  this.searchData.createrId = '';
                  this.$refs.selectDeptEmpSource.selectName = '';
                  this.$refs.selectDeptEmpSource.selectObj = {
                    id: '',
                    name: '',
                    type: '',
                  }
                }
                else if (this.searchDataArr[index].title == '确认人'&&this.billSpecialInputFlag){
                  this.searchData.affirmEmpIdList = [];
                  this.selectedItems = [];
                  //有监听调用，防止重复提交
                  return ;
                }
                else if (this.searchDataArr[index].title == '收支类型'){
                    this.searchData.feeSubjectIdList = [];
                    this.$refs.selectCostType.clearData();
                }
                else if (this.searchDataArr[index].title == '物品'){
                  this.searchData.goodsIdList = [];
                  this.$refs.selectGoodsType.clearData();
                }
                else{
                    this.searchList.forEach((val,i)=>{
                        if (this.searchDataArr[index].title == val.title){
                            val.currentActiveIndex = 0;
                            if (typeof val.key == "string"){
                                this.searchData[val.key] = ''
                            }else{
                                this.searchData[val.key[0]] = ''
                                this.searchData[val.key[1]] = ''
                            }
                            if(val.type == 'input'){
                                val.value_start = '';
                                val.value_end = '';
                            }
                            if(val.type == 'select'){
                                val.id = undefined;
                                val.name = '';
                            }
                        }
                    })
                }
                this.searchDataArr.splice(index,1)
                this.confirm()
            },
            inputChange(item,type){
                let keyStart = item.key[0];
                let keyEnd = item.key[1];
                if (type == 'start'){
                    this.searchData[keyStart] = event.target.value;
                }else{
                    this.searchData[keyEnd] = event.target.value;
                }
                let monthStr = this.searchData[keyStart] + '~' + this.searchData[keyEnd] + '个月'

                this.changeSearchDataArr(item.title,monthStr);
                this.confirm();
            },
            inputTypeChange(item,val){
                let keyStart = item.key[0];
                let keyEnd = item.key[1];
                if (val == item.key[0]){
                    this.searchData[keyStart] = item.value_start;
                }else{
                    this.searchData[keyEnd] = item.value_end;
                }
                if(this.searchData[keyStart]&&this.searchData[keyEnd]){
                    let valueStr = this.searchData[keyStart] + '~' + this.searchData[keyEnd];
                    this.changeSearchDataArr(item.title,valueStr);
                }
                else if(this.searchData[keyStart]&&!this.searchData[keyEnd]){
                    let valueStr = this.searchData[keyStart];
                    this.changeSearchDataArr(item.title,valueStr);
                }
                else if(!this.searchData[keyStart]&&this.searchData[keyEnd]){
                    let valueStr = this.searchData[keyEnd];
                    this.changeSearchDataArr(item.title,valueStr);
                }
                else{
                    this.changeSearchDataArr(item.title,'');
                }
                this.confirm();
            },
            clearInputType(item) {
                item.value_start = '';
                item.value_end = '';
                let keyStart = item.key[0];
                let keyEnd = item.key[1];
                this.searchData[keyStart] = '';
                this.searchData[keyEnd] = '';
                this.changeSearchDataArr(item.title,'');
                this.confirm();
            },
            goSelect(item){
              if(item.id){
                item.list.forEach((temp)=>{
                  if(item.id == temp.id){
                    this.changeSearchDataArr(item.title,temp.name);
                  }
                })
                this.searchData[item.key] = item.id;
              }
              else{
                this.changeSearchDataArr(item.title,'');
                this.searchData[item.key] = '';
              }
              this.confirm();
            },
        },
      watch:{
        selectedItems(){
          let names = [];
          this.idNameList.forEach((item)=>{
            if(this.selectedItems.indexOf(item.id)>-1){
              names.push(item.name)
            }
          });
          this.changeSearchDataArr('确认人',names.join('/'));
          this.searchData.affirmEmpIdList = this.selectedItems;
          this.confirm();
        },
      },
    }
</script>

<style scoped lang="less">
    .search-dialog {
        .search-input-wrap{
            position: relative;
            .search-list{
                display: flex;
                position: absolute;
                top: 14px;
                left: 6px;
                z-index: 1;
                li{
                    display: flex;
                    align-items: center;
                    padding: 0 4px;
                    margin-right: 4px;
                    height: 22px;
                    line-height: 22px;
                    border-radius:12px;
                    font-size: 12px;
                    background: #EDF2FA;
                    cursor: pointer;
                    p{
                        min-width: 40px;
                        max-width: 180px;
                        text-align: center;
                        .title{
                            color: @secondaryFontColor;
                        }
                    }
                    .close-icon{
                        color: #FB4246;
                        font-size: 14px
                    }
                }
            }
            .search-input {
                & /deep/ .ant-input {
                    border-radius: 20px;
                }
            }
        }


    }
    & /deep/ .label-item .title .ft-bolder{
        line-height: 36px;
        height: 36px;
    }
    & /deep/ .ant-input-group.ant-input-group-compact > .ant-select:first-child > .ant-select-selection {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }

    & /deep/ .ant-input-group > .ant-input-affix-wrapper:not(:first-child) .ant-input {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
    }
    .prohibitStyle{
        & /deep/ .ant-input{
            border-radius: 16px;
        }
    }
    .search-wrap {
        position: relative;
        min-height: 100%;

        .search-content {
            padding: 30px 25px 87px 25px;
            height: 100%;

            .top-search {
                margin-bottom: 10px;
                /deep/ .ant-select-dropdown{
                    padding: 5px 0;
                }
                /deep/ .ant-select-selection__rendered{
                    margin: 0 11px !important;
                }
            }

            .workorder {
                background: rgba(247, 248, 251, 1);
                margin-right: 10px;
                height: 40px;
                line-height: 40px;
            }
            .selectListStyle{
              /deep/ svg{
                width: 14px;
                height: 14px;
              }
            }
            .list {
                display: flex;
                flex-wrap: wrap;
                margin-right: -20px;

                .item {
                    display: inline-block;
                    margin: 0 23px 10px 0;
                    min-width: 94px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    cursor: pointer;
                    color: @mainFontColor;
                    border-radius: 3px;
                    font-size: 12px;
                    border: 1px solid @borderColor;
                }

                .active {
                    color: @themeColor;
                    border: 1px solid @themeColor;
                }
            }
          .billSpecialInputFlagStyle{
            /deep/ .ant-select-selection__rendered{
              margin-left: 0px;
            }
            /deep/ .ant-select-selection__placeholder{
              margin-left: 0px;
            }
            /deep/ .ant-select-dropdown{
              max-height: 300px;
              overflow-y: auto;
            }
          }
        }

        .search-footer {
            position: fixed;
            bottom: 0;
            width: 620px;
            padding: 15px 25px;
            background-color: #ffffff;
            border-top: 1px solid @borderColor;

            .clear {
                cursor: pointer;
                line-height: 32px;
                i {
                    margin-right: 4px;
                    font-size: 16px;
                }
            }
        }
      /deep/ .ant-select-selection__rendered{
        margin-left: 0px;
      }
    }
</style>
