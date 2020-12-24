<template>
  <div>
    <a-row>
      <a-col :span="20" style="aheight:100%; margin-top: 25px;position: relative">
        <a-checkbox-group style="width:100%;"  v-model="checkList" @change="bindCheckBox">
          <a-checkbox class="itemStyle" :style="(item.value==0||item.value==1)?'width: 15%':'width: 32%'" :value="item.value" v-for="(item,i) in options" :key="i">
            <span>{{item.label}}</span>
          </a-checkbox>
        </a-checkbox-group>
        <div v-if="checkList[0] ==2||checkList[0] ==3" class="checkSubStyle" :class="checkList[0] ==2?'position1':'position2'"><a-checkbox style="font-size: 12px;color: #777777;" v-model="includeChildren" @change.stop="changeIncludeChildren">可查看子级部门数据</a-checkbox></div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="3">
      </a-col>
      <a-col :span="20">
        <div v-for="(dept,index) in depts" :key="index" v-if="checkList[0] !=0">
          <div style="float: left;margin-right: 20px">
            <div class="dept-btn">
              <span style="color: #777777;margin-right: 5px;margin-left: 8px;">{{dept.name}}</span>
              <span v-if="dept.isIncludeChildren==1" style="font-size:12px;background-color:#F7F8FB;color:#777777;height: 18px;line-height: 18px;padding: 2px 5px;margin-right: 5px">子级部门数据可看</span>
              <icon-font style="color: red;margin-right: 8px;" type="iconyumengtubiao_guanbi-3" @click="deleteDept(dept)"></icon-font>
            </div>
          </div>
        </div>
        <div style="float: left" :id="data.id">
          <a-popover :title="null" trigger="click" :visible="leaderFlag" @visibleChange="handleClickChange">
            <template slot="content">
              <div  class="tree">
                <div class="f-clearfix content">
                  <div class="f-fl department no-show-employee">
                    <a-input-search style="margin-bottom: 8px" placeholder="输入名称检索" @change="onChange" />
                    <a-directory-tree
                        :showIcon="false"
                        :treeData="treeData"
                        v-if="treeData.length"
                        :defaultSelectedKeys="[treeData[0].key]"
                        :defaultExpandedKeys="[treeData[0].key]"
                        :expanded-keys="expandedKeys"
                        :auto-expand-parent="autoExpandParent"
                        :selectedKeys="selectedKeys"
                        @select="changeRole"
                        @expand="onExpand"
                    >
                    </a-directory-tree>
                  </div>
                </div>
                <div class="footer clearfix">
                  <span class="checkStyle f-fl"><a-checkbox v-model="isViewSub" @click.stop="">可查看子级部门数据</a-checkbox></span>
                  <span class="cancelStyle cursor" @click.stop="cancelConfirmData"> 清空</span>
                  <span class="confirmStyle cursor" @click.stop="confirmData">确认</span>
                </div>
              </div>
            </template>
            <div class="add-btn" :class="{'departmentDisabled':!departmentDisabled}" v-if="checkList[0] !=0">
              <icon-font type="iconyumengtubiao_tianjia"></icon-font>
              指定部门
            </div>
          </a-popover>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";

const treeData = [];
const options = [
  { label: '全部', value: 0 },
  { label: '本店', value: 2 },
  { label: '本部', value: 3 },
  { label: '本人相关', value: 1 },
];
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
export default {
  name:"setDept",
  components: {ARow},
  props: {
    allDepartment: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean
    },
    choose: {
      type: Object,
      required: true
    },
    isIncludeChildren:{
      type: Number,
    },
    scope: {
      required: true
    }
  },
  data() {
    return {
      value: "",
      treeData,
      visible: false,
      scopeData: this.data,
      depts: this.data.extraDeptList,
      partOrangeize: [],
      leaderFlag: false,
      chooseDept: [],
      departmentDisabled: true,
      checked: true,
      checkList: [],
      options:options,
      twiceId:'',
      selectedKey:"",
      selectedName:"",
      isViewSub:true,
      includeChildren:false,
      selectedKeys:[],
      expandedKeys: [],
      autoExpandParent: true,
      dataList:[],
      allSearchKeys:[],
      allKeys:[],
    };
  },
  watch: {
    value(key) {
      console.log(key);
    },
  },
  created: function () {
    this.getDeptTree();
  },
  mounted() {
    this.$nextTick(() => {
      this.registerEvent();
      const scope = this.scope;
      this.checkList.push(scope);
      this.includeChildren = (this.isIncludeChildren ==1);
      this.departmentDisabled = scope !== 0;
    });
  },
  methods: {
    setStyle(arr,values){
      if (arr.length > 0) {
        arr.forEach((item) => { //利用foreach循环遍历
          if(values.indexOf(item.id)>-1){
            item.style = 'display:block';
          }
          else{
            item.style = 'display:none';
          }
          if (item.children.length > 0) //判断chlidren是否有数据
          {
            this.setStyle(item.children,values);  //递归调用
          }
        });
      }
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onChange(e) {
      const value = e.target.value;
      if(value){
        this.allSearchKeys = [];
        const expandedKeys = this.dataList
            .map(item => {
              if (item.value.indexOf(value) > -1) {
                this.allSearchKeys.push(item.id);
                let parentKey =  getParentKey(item.id, this.treeData);
                this.allSearchKeys.push(parentKey);
                return parentKey;
              }
              return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        this.allSearchKeys.push(this.treeData[0].key);
        this.setStyle(this.treeData,this.allSearchKeys);
        Object.assign(this, {
          expandedKeys,
          autoExpandParent: true,
        });
      }
      else{
        this.allSearchKeys = this.allKeys;
        this.setStyle(this.treeData,this.allSearchKeys);
        Object.assign(this, {
          expandedKeys:[this.treeData[0].key],
          autoExpandParent: true,
        });
      }
    },
    handleClickChange(visible){
      this.leaderFlag = visible;
    },
    closeThis(){
      this.leaderFlag = false;
      setTimeout(() => {
        this.isViewSub = true;
      }, 500);
    },
    addValue(arr) {
      //增加key
      if (arr.length > 0) {
        arr.forEach((item) => { //利用foreach循环遍历
          if(item.isStore==1&&item.id!=this.allDepartment.data.id){
            item.title = item.value + '@门店';
          }
          else{
            item.title = item.name;
          }
          item.value = item.name;
          item.scopedSlots = { title: 'title' };
          item.style = 'display:block';
          const id = item.id;
          const value =item.name;
          this.dataList.push({ id, value });
          this.allKeys.push(id);
          if (item.children.length > 0) //判断chlidren是否有数据
          {
            this.addValue(item.children);  //递归调用
          }
        });
      }
    },
    getDeptTree() {
      let arr = [];
      arr[0] = this.allDepartment.data;
      this.dataList = [];
      this.addValue(arr);
      this.treeData = arr;
      this.selectedKeys = [this.treeData[0].key];
      this.expandedKeys = [this.treeData[0].key];
    },
    changeIncludeChildren(e){
      this.includeChildren  = e.target.checked;
      let temp = 1;
      if(!e.target.checked){
        temp = 0;
      }
      else{
        temp = 1;
      }
      const upDateIncludeChildren = {
        id: this.data.id,
        pid: this.data.pid,
        isIncludeChildren: temp,
      };
      this.$emit('upDateIncludeChildren', upDateIncludeChildren);
    },
    bindCheckBox(value) {
      //清除指定部门弹窗
      this.leaderFlag = false;
      let scope = 0;
      if(value.length == 0){
        scope = 0;
        this.checkList = [];
        this.checkList.push(0);
      }else{
        scope = value[1];
        this.checkList = [];
        this.checkList.push(value[1]);
      }
      this.includeChildren = true;
      const upDateScope = {
        id: this.data.id,
        pid: this.data.pid,
        scope: scope,
        isIncludeChildren:1,
      };
      this.departmentDisabled = scope !== 0;
      this.$emit('upDateScope', upDateScope);
    },
    //  获取 部门
    registerEvent() {
      // 点击除本组件外的 隐藏掉选择部分
      setTimeout(() => {
        document.addEventListener('click', this.closeThis);
        document.getElementById(this.data.id).onclick = function (
            ev
        ) {
          var oEvent = ev || event;
          oEvent.stopPropagation();
          return false;
        };
      },100);
    },
    updateData() {
      const emitData = {
        id: this.data.id,
        pid: this.data.pid,
        choooseDept: this.depts
      };
      this.$emit('updateData', emitData);
    },
    deleteDept(dept) {
      for (let i = 0; i < this.depts.length; i++) {
        if (dept.id === this.depts[i].id) {
          this.depts.splice(i, 1);
        }
      }
      this.updateData();
    },
    changeRole(selectedKeys, info) {
      this.selectedKeys = selectedKeys;
      this.selectedKey = selectedKeys[0];
      this.selectedName = info.node.value;
    },
    cancelConfirmData(){
      this.selectedKeys = [this.treeData[0].key];
      this.leaderFlag = false;
      this.isViewSub = true;
    },
    confirmData(){
      if(this.selectedKey!=""){
        if(this.selectedKey == this.treeData[0].key){
          //根节点不允许选择
          return;
        }
        let item = {};
        item.id = this.selectedKey;
        item.name = this.selectedName;
        if (this.depts === undefined) {
          this.depts = [];
        }
        const had =
            this.depts.length === 0
                ? false
                : this.depts.some(dept => dept.id === item.id);
        // 如果depts里面已经有此id 那么不添加 如果有就添加
        if (!had) {
          let isIncludeChildren = 1;
          if(!this.isViewSub){
            isIncludeChildren = 0;
          }
          this.depts.push({
            id: item.id,
            name: item.name,
            isIncludeChildren:isIncludeChildren,
          });
          setTimeout(() => {
            this.leaderFlag = false;
            this.isViewSub = true;
          }, 100);
        }
        this.updateData();
      }
    },
  }
};
</script>
<style scoped lang="less">
.add-btn {
  width: 90px;
  height: 24px;
  line-height: 24px;
  color: #0A87F8;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #0A87F8;
  margin-top:  8px;
  text-align: center;
  border-radius: 5px;
}
.dept-btn {
  min-width: 90px;
  color: #DDDDDD;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #DDDDDD;
  margin-top: 8px;
  text-align: center;
  border-radius: 5px;
}
.itemStyle{
  /deep/ .ant-checkbox-wrapper{
    padding-right: 0px !important;
  }
}
.position1{
  left:calc(15% + 60px);
}
.position2{
  left:calc(48% + 60px);
}
.checkSubStyle{
  top:0px;
  position: absolute;
  padding: 0 5px 0 4.5px;
  border-radius:2px;
  background-color: #F7F8FB;
  margin-left: 15px;
  height: 21px;
  /deep/ .ant-checkbox-input{
    width: 12px;
    height: 12px;
  }
  /deep/ .ant-checkbox-input{
    width: 12px;
    height: 12px;
  }
  /deep/ .ant-checkbox-inner{
    width: 12px;
    height: 12px;
  }
  /deep/ .ant-checkbox-checked{
    width: 12px;
    height: 12px;
  }
  /deep/ .ant-checkbox{
    width: 12px;
    height: 12px;
  }
}
.departmentDisabled {
  color: #ddd;
  border-color: #ddd;
  .addDepartment-icon {
    color: #ddd;
  }
  pointer-events: none;//防止div被点击
}
/deep/ .ant-popover-inner-content{
  padding: 0;
  .action{
    padding: 8px 18px;
  }
  .action:hover{
    cursor: pointer;
    background:rgba(10,135,248,0.1);
  }
}
.tree {
  z-index: 3;
  width: 320px;
  min-height: 200px;
  background-color: #ffffff;
  border: 1px solid @borderColor;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  .content {
    min-height: 154px;

    .department {
      width: calc(100% - 200px);
      height: 100%;
      overflow: auto;
      border-right: 1px solid @borderColor;
    }

    .no-show-employee {
      width: 100%;
      border-right: none;
      max-height: 500px;
      overflow-y: auto;
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
    padding: 10px 0;
    border-top: 1px solid @borderColor;
    text-align: right;
    .checkStyle{
      margin-left: 10px;
      /deep/ .ant-checkbox-wrapper{
        span {
          padding-left: 5px;
          color: #777777;
        }
      }
    }
    .cancelStyle{
      margin-right: 10px;
      background:rgba(246,247,248,1);
      color: #DDDDDD;
      font-size: 14px;
      width: 54px;
      padding:4px 13px ;
      height: 22px;
      line-height: 22px;
      text-align: center;
      border-radius: 4px;
      color: #666666;
    }
    .confirmStyle {
      background-color: #0A87F8;
      color: #FFFFFF;
      font-size: 14px;
      width: 54px;
      margin-right: 15px;
      padding:4px 13px ;
      height: 22px;
      line-height: 22px;
      text-align: center;
      border-radius: 4px;
    }
  }
}
/deep/ .ant-popover-inner-content {
  width: 300px!important;
}
/deep/ .ant-checkbox-group-item{
  width: 120px;
  margin-right: 40px;
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
