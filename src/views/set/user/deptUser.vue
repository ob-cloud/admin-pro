<template>
    <div class="content">
        <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
        <div class="setting clearfix">
            <div class="left">
                <div class="organization">
                    <div class="title">
                        <span class="iconFont">
                            <icon-font type="iconyumengtubiao_jiagou" />
                        </span>
                        <span>组织架构</span>
                    </div>
                    <div class="operate" style="color:#0a87f8" v-if="permissionList.indexOf('1')>-1">
                        <icon-font type="iconyumengtubiao_tianjia" @click="openAddDept"/>
                    </div>
                </div>
                <div class="leftDetail">
                    <div class="tree">
                        <a-tree class="draggable-tree" draggable @dragenter="onDragEnter" @drop="onDrop" @select="onSelect" showIcon :treeData="treeData" v-if="treeData.length" :defaultExpandedKeys="[treeData[0].key]">
                            <icon-font slot="orgnization" type="iconyumengtubiao_fangyuan-1" />
                            <template slot="user" slot-scope="{selected}">
                                <icon-font :type="selected ? 'iconyumengtubiao_bumenrenyuan':'iconyumengtubiao_bumenrenyuan'" />
                            </template>
                          <template slot="custom" slot-scope="item">
                            <span class="deptStyle" v-if="item.isStore==1&&item.id!=treeData[0].id">门店</span>
                            <span class="node-title">{{ item.title }}</span>
                            <span class="node-title">{{'('+item.empCount+'人)'}} </span>
                            <span class="icon-wrap cursor" v-if="(isApplication==0&&listType==1)&&selectedTreeKey==item.id&&selectedTreeKey!=[treeData[0].key]" style="margin-left: 20px;" @click.stop="editDept" v-show="permissionList.indexOf('2')>-1">
                              <icon-font type="iconyumengtubiao_bianji-1" />
                            </span>
                            <span class="icon-wrap cursor" v-if="(isApplication==0&&listType==1)&&selectedTreeKey==item.id" style="margin-left: 4px;" @click.stop="transferDept" v-show="permissionList.indexOf('13')>-1">
                              <icon-font type="iconyumengtubiao_fenpei" />
                            </span>
                            <span class="icon-wrap cursor" v-if="(isApplication==0&&listType==1)&&selectedTreeKey==item.id&&selectedTreeKey!=[treeData[0].key]" style="margin-left: 4px;" @click.stop="deleteDept" v-show="permissionList.indexOf('3')>-1">
                              <icon-font type="iconyumengtubiao_shanchu-" />
                            </span>
                          </template>
                        </a-tree>
                    </div>
                    <div class="unallocatedRow cursor" @click="unallocatedUser" :style="(isApplication==0&&listType==2)?'color:#0A87F8;background-color:rgba(10,135,248,0.1)':''">
                        <div class="unallocated">
                            <span>
                                <span class="iconFont">
                                    <icon-font type="iconyumengtubiao_weifenpeirenyuan"  />
                                </span>
                                <span>未分配员工（{{unallocatedCount}}人）</span>
                            </span>
                        </div>
                    </div>
                    <div class="applicationRow cursor" @click="applicationUser" :style="(isApplication==1&&listType==1)?'color:#0A87F8;background-color:rgba(10,135,248,0.1)':''">
                    <div class="application">
                        <div class="iconFont iconFloat">
                            <icon-font type="iconyumengtubiao_daishenpirenyuan" />
                        </div>
                        <div class="applicationFont">
                            申请加入员工（{{applicationCount}}人）
                            <div class="redIconRadius" v-if="applicationCount>0"></div>
                        </div>

                    </div>
                </div>
                </div>
                <div class="leftAdd" v-show="permissionList.indexOf('1')>-1" @click="openAddDept">
                    <icon-font type="iconyumengtubiao_tianjia"/>添加部门
                </div>
            </div>
            <div class="right">
                <div class="table">
                    <div class="checkOption" v-if="isApplication == 0" id="checkOption">
                        <div class="dealOption">
                          <span class="headSpan">已选中
                              <span class="themeColor">{{checkedCount}}</span>项
                              <a-divider type="vertical" />
                          </span>
                          <span @click="moveDept" v-if="listType == 1" v-show="permissionList.indexOf('6')>-1">
                              <span class="fontSpacing">
                                  <icon-font type="iconyumengtubiao_yidong" class="themeColor" />
                              </span>
                              <span class="themeColor fontSpacing cursor">移动部门</span>
                              <a-divider type="vertical" v-show="permissionList.indexOf('7')>-1" />
                          </span>
                          <span @click="distributionDept" v-if="listType == 2" v-show="permissionList.indexOf('12')>-1">
                              <span class="fontSpacing">
                                  <icon-font type="iconyumengtubiao_fenpei" class="themeColor" />
                              </span>
                              <span class="themeColor fontSpacing cursor">分配部门</span>
                              <a-divider type="vertical" v-show="permissionList.indexOf('7')>-1" />
                          </span>
                          <span @click="employeeBatchDisable" v-show="permissionList.indexOf('7')>-1">
                            <span class="fontSpacing">
                                <icon-font type="iconyumengtubiao_jinyong" class="themeColor" />
                            </span>
                            <span class="themeColor fontSpacing cursor">禁用成员</span>
                          </span>
                          <span class="unPermissionStyle" v-show="permissionList.indexOf('6')==-1&&permissionList.indexOf('7')==-1">
                            暂无批量操作（移动部门、禁用成员）权限，请联系管理员开通
                          </span>
                        </div>
                        <div class="themeColor cancelOption cursor">
                            <span @click="cancelOption ">取消选择</span>
                        </div>
                    </div>
                    <div class="applicationCheckOption" v-if="isApplication==1" id="applicationCheckOption">
                        <div class="dealOption">
                        <span class="headSpan">已选中
                            <span class="themeColor">{{checkedCount}}</span>项
                            <a-divider type="vertical" />
                        </span>
                        <span @click="passUsers" class="cursor" v-show="permissionList.indexOf('11')>-1">
                            <span class="fontSpacing">
                                <icon-font type="iconyumengtubiao_jihuo" class="themeColor" />
                            </span>
                            <span class="themeColor fontSpacing">通过</span>
                            <a-divider v-show="permissionList.indexOf('10')>-1" type="vertical" />
                        </span>
                        <span @click="rejectUsers" class="cursor" v-show="permissionList.indexOf('10')>-1">
                            <span class="fontSpacing">
                                <icon-font type="iconyumengtubiao_fanhui" class="themeColor"/>
                            </span>
                            <span class="themeColor fontSpacing">驳回</span>
                        </span>
                        <span class="unPermissionStyle" v-show="permissionList.indexOf('10')==-1&&permissionList.indexOf('11')==-1">
                          暂无审核权限，请联系管理员开通
                        </span>
                        </div>
                        <div class="cancelOption cursor themeColor">
                            <span @click="cancelOption">取消选择</span>
                        </div>
                    </div>
                    <div class="deptManage clearfix" >
                        <div class="deptManageName">{{title}}</div>
                        <div class="deptManageOperate" v-if="isApplication==0&&listType==1" style="color:#0a87f8">
                        <span class="deptManageOperateEdit cursor" @click="editDept" v-show="permissionList.indexOf('2')>-1">
                            <span class="deptManageOperateEditIcon" :style="!selectedTreeKey||!selectedTreePid?'color:#999999':'color:#0a87f8'">
                                <icon-font type="iconyumengtubiao_bianji-1" />
                            </span>
                            <span :style="!selectedTreeKey||!selectedTreePid?'color:#999999':'color:#0a87f8'">编辑</span>
                        </span>
                        <span class="deptManageOperateEdit cursor" @click="transferDept" v-show="permissionList.indexOf('13')>-1">
                          <span class="deptManageOperateEditIcon" :style="!selectedTreeKey?'color:#999999':'color:#0a87f8'">
                              <icon-font type="iconyumengtubiao_fenpei" />
                          </span>
                          <span :style="!selectedTreeKey?'color:#999999':'color:#0a87f8'">数据转移</span>
                        </span>
                        <span class="deptManageOperateDelete cursor" @click="deleteDept" v-show="permissionList.indexOf('3')>-1">
                            <span class="deptManageOperateDeleteIcon" :style="!selectedTreeKey||!selectedTreePid?'color:#999999':'color:#0a87f8'">
                                <icon-font type="iconyumengtubiao_shanchu-" />
                            </span>
                            <span :style="!selectedTreeKey||!selectedTreePid?'color:#999999':'color:#0a87f8'">删除</span>
                        </span>
                        </div>
                    </div>
                    <div class="userManage clearfix">
                        <div class="userManageName">成员管理</div>
                        <div class="userManageOperate">
                            <div class="userSearch" v-if="isApplication==0">
                                <search-dialog placeholder="员工编号/员工姓名/员工电话" :showDeptEmp="false" :showEmployee="false" :showCityTown="false" :searchList="searchList" @search="assetsFormData"></search-dialog>
                            </div>
                            <div class="f-fr cursor exportExcel-box"><span @click="exportExcel"><icon-font class="f-ftc-blue" type="iconyumengtubiao_xiazai1" /></span></div>
                            <div class="userAdd" v-show="permissionList.indexOf('4')>-1">
                                <a-button type="primary" shape="round" icon="plus" @click="openAddUser">添加员工</a-button>
                            </div>
                        </div>
                    </div>
                    <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :customRow="openUserInfo" :bordered="true" :pagination="false" :columns="tableColumns" @change="handleTableChange" :dataSource="tableData">
                        <div slot="isLocked" slot-scope="text">
                            <div v-if="text==0" class="fontNormal">
                                <div class="IconRadius normalBg floatLeft fontNormalColor"></div>
                                <div class="cursor">
                                    <span >正常</span>
                                </div>
                            </div>
                            <div v-if="text==1" class="fontProhibit">
                                <div class="IconRadius prohibitBg floatLeft fontProhibitColor"></div>
                                <div>
                                    <span>已禁用</span>
                                </div>
                            </div>
                        </div>
                        <div slot="empNo" slot-scope="text">
                          <span>{{text?text:'-'}}</span>
                        </div>
                        <div slot="applyStatus" slot-scope="text">
                            <div v-if="text==0" class="fontNormal">
                                <div class="IconRadius normalBg floatLeft fontNormalColor"></div>
                                <div>
                                    <span>待申请</span>
                                </div>
                            </div>
                            <div v-if="text==1" class="fontProhibit">
                                <div class="IconRadius inviteBg floatLeft fontProhibitColor"></div>
                                <div>
                                    <span>待审核</span>
                                </div>
                            </div>
                            <div v-if="text==3" class="fontNormal">
                                <div class="IconRadius normalBg floatLeft fontNormalColor"></div>
                                <div>
                                    <span>申请通过</span>
                                </div>
                            </div>
                            <div v-if="text==4" class="fontNormal">
                                <div class="IconRadius normalBg floatLeft fontNormalColor"></div>
                                <div>
                                    <span>驳回</span>
                                </div>
                            </div>
                        </div>
                        <div slot="gender" slot-scope="text" >{{text==1?'男':text==2?'女':'-'}}</div>
                        <div slot="deptName" slot-scope="text,record" >
                          <div class="overHidde" style="width: 240px;padding-top: 13.33px;padding-bottom: 8.33px;" v-if="record.empDeptList&&record.empDeptList.length>0">
                            <div class="deptNameStyle clearfix">
                              <div class="itemStyle clearfix f-fl" v-for="(item) in record.empDeptList">
                                <div v-if="item.deptId&&item.isMainDept==1" class="itemLeft f-fl">直属</div>
                                <div v-if="item.deptId" class="itemRight f-fl" :class="item.isMainDept==1?'itemStyleIstMain':'itemStyleNotMain'">{{item.deptName}}</div>
                                <div v-if="!item.deptId">-</div>
                              </div>
                            </div>
                          </div>
                          <div v-else style="padding-top: 13.33px;padding-bottom: 13.33px;">
                            -
                          </div>
                        </div>
                        <div slot="createTime" slot-scope="text" >{{$moment(text).format('YYYY.MM.DD HH:mm:ss')}}</div>
                        <div slot="name" slot-scope="text, record">
                            <div class="nameColumn clearfix" style="padding-top: 13.33px;padding-bottom: 13.33px;">
                                <div v-if="record.isLeader=='1'" class="leaderFlag">
                                  <div class="leaderLength">
                                    <span>领导</span>
                                  </div>
                                </div>
                                <div class="name">
                                  <span>{{record.name}}</span>
                                  <span style="color: #FFA036 ;font-size: 12px;">{{record.empTypeName?'('+record.empTypeName+')':''}}</span>
                                </div>
                            </div>
                        </div>
                        <div slot="action" slot-scope="text, record">
                            <a-popover :title="null" trigger="hover" placement="bottom" v-if="checkOpts(record) == true">
                                <template slot="content">
                                    <div v-if="record.isAdmin != 1&&isApplication==0 && record.isLocked==0" @click.stop="editUser(record)" class="action cursor" style="text-align:center;" v-show="permissionList.indexOf('5')>-1">编辑</div>
                                    <div v-if="isApplication==0 && record.isLocked==0" @click.stop="transferUser(record)" class="action cursor" style="text-align:center;" v-show="permissionList.indexOf('14')>-1">数据转移</div>
                                    <div v-if="record.isAdmin != 1&&isApplication==0 && record.isLocked==0" @click.stop="prohibitUser(record)" class="action cursor" style="text-align:center;" v-show="permissionList.indexOf('7')>-1">禁用</div>
                                    <div v-if="record.isAdmin != 1&&isApplication==0 && record.isLocked==1" @click.stop="normalUser(record)" class="action cursor" style="text-align:center;" v-show="permissionList.indexOf('8')>-1">启用</div>
                                    <div v-if="record.isAdmin != 1&&isApplication==0" @click.stop="deleteUser(record)" class="action cursor" style="text-align:center;" v-show="permissionList.indexOf('9')>-1">删除</div>
                                    <div v-if="record.isAdmin != 1&&isApplication==1" class="action cursor" @click.stop="passUser(record)" style="text-align:center;" v-show="permissionList.indexOf('11')>-1">通过</div>
                                    <div v-if="record.isAdmin != 1&&isApplication==1" @click.stop="rejectApplicationUser(record)" class="action cursor" style="text-align:center;" v-show="permissionList.indexOf('10')>-1">驳回</div>
                                </template>
                                <div style="width: 100%;height: 100%">
                                    <icon-font type="iconyumengtubiao_gengduo-" class="moreColor cursor"></icon-font>
                                </div>
                            </a-popover>
                        </div>
                    </a-table>
                    <div class="contFoot" v-show="tableData.length>0">
                        <!-- 分页 -->
                        <a-pagination size="small" :total="pagination.total" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
                    </div>
                </div>
            </div>
        </div>
        <div>
          <a-modal title="" centered v-model="addUserDialog" class="ownModalBorder titDialog" :footer="null" :destroyOnClose="true" :maskClosable="false">
            <add-user @cancelAdd="cancelAddUser" @saveSuccess="saveUserSuccess"></add-user>
          </a-modal>
          <a-modal :title="addDeptTitle" centered v-model="addDeptDialog" class="ownModalBorder titDialog" :footer="null" :destroyOnClose="true" :maskClosable="false">
            <add-dept :dept-id="deptId" @cancelAdd="cancelAddDept" @saveSuccess="saveDeptSuccess"></add-dept>
          </a-modal>
          <a-modal :title="moveDeptTitle" centered v-model="moveDeptDialog" class="ownModalBorder titDialog" :footer="null" :destroyOnClose="true">
            <move-dept :idList="selectedRowKeys" :nameList="selectedRowNames" :type="moveDeptType" @cancelMove="cancelMoveDept"  @moveSuccess="moveDeptSuccess"></move-dept>
          </a-modal>
          <a-modal :title="viewUserTitle" centered v-model="viewUserDialog" :maskClosable="false" class="ownModalBorder userInfoBox titDialog" :footer="null" :destroyOnClose="true" @cancel="isRefreshFun">
            <user-info :userId="viewUserId" :currentUserId="currentUserId" :viewUserType="viewUserType" :viewUserPassInfo="viewUserPassInfo" @refreshinfoFun="refreshinfoFun" @cancelPassUser="cancelPassUser" @editSuccess="editUserSuccess"></user-info>
          </a-modal>
          <!-- 导出框-->
          <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="exportExcelShow" class="ownModalBorder titDialog" title="导出提示">
            <exportExcel @closeThis="exportExcelShow=false" @saveSure="exportExcelShow=false" :exportData="exportData" :exportUrl='exportUrl'></exportExcel>
          </a-modal>
          <!--  部门数据转移 -->
          <a-modal destroyOnClose centered width="520px" :maskClosable="false" v-model="deptTransferDialog" title="数据转移"
                   :footer="null" class="ownModalBorder titDialog" @cancel="deptTransferDialog=false;">
            <dept-transfer :deptName="title" :deptId="deptId" @cancelTransfer="deptTransferDialog=false;" @successTransfer="deptTransferDialog=false;"></dept-transfer>
          </a-modal>
          <!--  部门删除 -->
          <a-modal destroyOnClose centered width="520px" :maskClosable="false" v-model="deptDeleteDialog" title="删除部门"
                   :footer="null" class="ownModalBorder titDialog" @cancel="deptDeleteDialog=false;">
            <dept-delete :deptName="title" :deptId="deptId" @cancelDelete="deptDeleteDialog=false;" @successDelete="deptDeleteDialog=false;refreshTableAndTree()"></dept-delete>
          </a-modal>
          <!--  员工数据转移 -->
          <a-modal destroyOnClose centered width="520px" :maskClosable="false" v-model="userTransferDialog" title="数据转移"
                   :footer="null" class="ownModalBorder titDialog" @cancel="userTransferDialog=false;">
            <user-transfer :userRecord="userRecord" @cancelTransfer="userTransferDialog=false;" @successTransfer="userTransferDialog=false;"></user-transfer>
          </a-modal>
          <!--  员工删除 -->
          <a-modal destroyOnClose centered width="520px" :maskClosable="false" v-model="userDeleteDialog" title="删除员工"
                   :footer="null" class="ownModalBorder titDialog" @cancel="userDeleteDialog=false;">
            <user-delete :userRecord="userRecord" :currentUserId="currentUserId" @cancelDelete="userDeleteDialog=false;" @successDelete="userDeleteDialog=false;refreshTableAndTree()"></user-delete>
          </a-modal>
          <!--  员工禁用 -->
          <a-modal destroyOnClose centered width="520px" :maskClosable="false" v-model="userDisabledDialog" title="禁用员工"
                   :footer="null" class="ownModalBorder titDialog" @cancel="userDisabledDialog=false;">
            <user-disable :userRecord="userRecord" :currentUserId="currentUserId" @cancelDisable="userDisabledDialog=false;" @successDisable="userDisabledDialog=false;refreshTableAndTree()"></user-disable>
          </a-modal>
        </div>
    </div>
</template>

<script>
import {
    deptRemove,
    employeeBatchDisable,
    employeeLockEmp,
    getDeptTreeWithStat,
    listEmpExtendInfo,
    dragDept,
    employeeApplyList,
    employeeApplyRejected,
    employeeApplyBatchRejected,
    roleSimpleList,
} from '@/api/set';
import { employeeUserInfo } from '@/api/enterprise';
import addDept from '../dept/addDept';
import addUser from './addUser';
import UserInfo from "./userInfo";
import MoveDept from "../dept/moveDept";
import SearchDialog from '@/components/SearchDialog';
import DeptTransfer from './../dept/deptTransfer';
import DeptDelete from './../dept/deptDelete';
import UserTransfer from './userTransfer';
import UserDelete from './userDelete';
import UserDisable from './userDisable';
import ExportExcel from '@/components/exportExcel/index';
import { getDateHaoMiao } from '@/utils/util';
import {listEnableDict} from "@/api/contract";
const treeData = [];
const tableColumnsDistribution = [
    {
        title: '状态',
        dataIndex: 'isLocked',
        key: 'isLocked',
        align: 'left',
        scopedSlots: { customRender: 'isLocked' },
        width:70,
    },
    {
        title: '员工编号',
        dataIndex: 'empNo',
        key: 'empNo',
        scopedSlots: { customRender: 'empNo' },
        align: 'left',
    },
    {
        title: '员工姓名',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: { customRender: 'name' },
        align: 'left',
    },
    {
        title: '员工电话(登录账号)',
        key: 'phone',
        dataIndex: 'phone',
        align: 'left',
    },
    {
        title: '性别',
        key: 'gender',
        dataIndex: 'gender',
        align: 'center',
        scopedSlots: { customRender: 'gender' },
    },
    {
        title: '部门',
        key: 'deptName',
        dataIndex: 'deptName',
        align: 'left',
      scopedSlots: { customRender: 'deptName' },
    },
    {
        title: '角色',
        key: 'roleName',
        dataIndex: 'roleName',
        align: 'left',
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
        align: 'center',
        width: '73px',
        customCell:() =>{
            return {
                on:{
                    click:()=>{
                        event.stopPropagation();
                    }
                }
            }
        },
    },
];
const tableColumnsToDistribution = [
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'left',
        scopedSlots: { customRender: 'applyStatus' },
        width:90,
    },
    {
        title: '申请人名称',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: { customRender: 'name' },
        align: 'left',
    },
    {
        title: '申请人电话',
        key: 'phone',
        dataIndex: 'phone',
        align: 'left',
    },
    {
        title: '性别',
        key: 'gender',
        dataIndex: 'gender',
        align: 'center',
        scopedSlots: { customRender: 'gender' },
    },
    {
        title: '身份证号',
        key: 'idCardNo',
        dataIndex: 'idCardNo',
        align: 'left',
    },
    {
        title: '申请时间',
        key: 'createTime',
        dataIndex: 'createTime',
        scopedSlots: { customRender: 'createTime' },
        align: 'left',
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
        align: 'center',
        width: '73px',
        customCell:() =>{
            return {
                on:{
                    click:()=>{
                        event.stopPropagation();
                    }
                }
            }
        },
    },
];
const tableData = [];
//分页
const pagination = {
    total: 0,
    current: 0,
    pageSize: 10,//每页中显示10条数据
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
}
export default {
    components: {
        MoveDept,
        UserInfo,
        addDept,
        addUser,
        SearchDialog,
        ExportExcel,
        DeptTransfer,
        DeptDelete,
        UserTransfer,
        UserDelete,
        UserDisable,
    },
    data() {
        return {
            treeData: treeData,  //部门树数据
            tableData: tableData, //员工列表数据
            tableColumns: tableColumnsDistribution, //已分配员工表头
            unallocatedCount: 0,   //未分配员工数
            applicationCount: 0,   //申请加入员工数
            selectedRowKeys: [],   //表格选中key集合
            selectedRowNames: [],   //表格选中names集合
            checkedCount: 0,       //表格选中数
            pagination: pagination, //分页
            selectedTreeKey: "",   //部门树选中部门key
            selectedTreeName: "",   //部门树选中部门名称
            selectedTreePid: "pid",   //部门树选中父id
            treeParentIds: [],      //拖拽前一部门id集合 用于获取拖拽的父id
            listType:1,   //是否分配(1、已分配；2未分配)
            isApplication:0, //是否是申请员工(0、不是；1、是)
            title: "",
            searchList:[
              {
                key:'fuzzyQueryType',
                list:[
                  {
                    label: '综合检索',
                    value: 0,
                  },
                  {
                    label: '员工编号',
                    value: 1
                  },
                  {
                    label: '员工姓名',
                    value: 2
                  },
                  {
                    label: '员工电话',
                    value: 3
                  },
                ],
              },
              {
                key:'roleId',
                title:'角色',
                currentActiveIndex:0,
                list:[],
              },
              {
                key:'gender',
                title:'性别',
                currentActiveIndex:0,
                list:[
                  {
                    label: '全部',
                    value: '',
                  },
                  {
                    label: '男',
                    value: 1
                  },
                  {
                    label: '女',
                    value: 2
                  },
                ],
              },
              {
                key:'empTypeId',
                title:'员工类型',
                currentActiveIndex:0,
                list:[],
              },
            ],          //搜索列表
            searchCriteria : {
                deptId: "",
                roleId: "",
                empTypeId:'',
                gender: "",  // 男 1  女 2
                matchType: '',
                fuzzyKeyword: "",
                listType: 1,
                current: 0,
                size: 10,
            },                   //搜索条件
            spinLoading:false,
            currentUserId:'',
          addUserDialog:false,
          addDeptDialog:false,
          addDeptTitle:'添加部门',
          deptId:'',
          moveDeptDialog:false,
          moveDeptTitle:'移动部门',
          moveDeptType:1,       //1、移动部门；2、分配部门；3、审核通过-完善信息
          viewUserDialog:false,
          viewUserTitle:'',     //1、员工详情；2、编辑员工;3、审核通过-完善信息
          viewUserId:'',
          viewUserType:1,
          viewUserPassInfo:{},
          isRefresh:false,
          permissionList:[],
          exportExcelShow:false,
          exportUrl: '/basic/employee/list_export',
          exportData:{},
          deptTransferDialog:false,
          deptDeleteDialog:false,
          userTransferDialog:false,
          userRecord:'',
          userDeleteDialog:false,
          userDisabledDialog:false,
          deptHaveSubFlag:false,
          deptHaveEmpFlag:false,
        };
    },
    watch: {
        checkedKeys(val) {
            console.log('onCheck', val);
        },
    },
    created: function() {
        this.refreshTableAndTree();
        this.getUserInfo();
        this.initPermission();
        this.getEmpTypeList();
    },
    methods: {
      transferDept(){
        //编辑部门
        if (typeof (this.selectedTreeKey) == "undefined" || this.selectedTreeKey == "") {
          this.$message.info('请选择编辑的部门');
          return;
        }
        this.deptTransferDialog = true;
        this.deptId = this.selectedTreeKey;
      },
      getEmpTypeList(){
        let id = '29ad979b026c437f951a29af0332f2c3';
        // 品牌
        listEnableDict(id).then(res => {
          let empTypeList = [];
          let tempAll = {};
          tempAll.label = "不限";
          tempAll.value= "";
          empTypeList.push(tempAll);
          if (res.code == 200) {
            res.data.forEach((item) => {
              let temp = {};
              temp.label = item.name;
              temp.value= item.id;
              empTypeList.push(temp);
            });
            //构造搜索数据结构
            this.searchList.forEach((item)=>{
              if(item.key == 'empTypeId'){
                item.list = empTypeList;
              }
            });
          }
        })
      },
      initPermission(){
        //资源权限集合：1、添加部门；2、编辑部门；3、删除部门；4、添加员工；5、编辑员工；6、移动部门；7、禁用员工；8、启用员工；9、删除员工；10、驳回；11、通过；12、分配部门;13、部门数据转移，14、员工数据转移
        this.permissionList = [];
        let permissions = JSON.parse(sessionStorage.getItem('permissions'));
        let markArr = [];
        let btnArr = [];
        markArr.push('mk_set_user_tjbm');
        markArr.push('mk_set_user_bjbm');
        markArr.push('mk_set_user_scbm');
        markArr.push('mk_set_user_tjyg');
        markArr.push('mk_set_user_bjyg');
        markArr.push('mk_set_user_ydbm');
        markArr.push('mk_set_user_jyyg');
        markArr.push('mk_set_user_qyyg');
        markArr.push('mk_set_user_scyg');
        markArr.push('mk_set_user_bhyg');
        markArr.push('mk_set_user_tgyg');
        markArr.push('mk_set_user_fpbm');
        markArr.push('mk_set_user_bmsjzy');
        markArr.push('mk_set_user_ygsjzy');
        //判断资源权限
        markArr.forEach(ele => {
          permissions.some(function(value){
            if (ele == value.mark){
              if(value.mark == 'mk_set_user_tjbm'){
                btnArr.push('1');
              }else if(value.mark == 'mk_set_user_bjbm'){
                btnArr.push('2');
              }else if(value.mark == 'mk_set_user_scbm'){
                btnArr.push('3');
              }else if(value.mark == 'mk_set_user_tjyg'){
                btnArr.push('4');
              }else if(value.mark == 'mk_set_user_bjyg'){
                btnArr.push('5');
              }else if(value.mark == 'mk_set_user_ydbm'){
                btnArr.push('6');
              }else if(value.mark == 'mk_set_user_jyyg'){
                btnArr.push('7');
              }else if(value.mark == 'mk_set_user_qyyg'){
                btnArr.push('8');
              }else if(value.mark == 'mk_set_user_scyg'){
                btnArr.push('9');
              }else if(value.mark == 'mk_set_user_bhyg'){
                btnArr.push('10');
              }else if(value.mark == 'mk_set_user_tgyg'){
                btnArr.push('11');
              }else if(value.mark == 'mk_set_user_fpbm'){
                btnArr.push('12');
              }else if(value.mark == 'mk_set_user_bmsjzy'){
                btnArr.push('13');
              }else if(value.mark == 'mk_set_user_ygsjzy'){
                btnArr.push('14');
              }
              return true;
            }
          });

        });

        this.permissionList = btnArr;
      },
      refreshinfoFun(res){  //详情有改变的操作  就改变状态
        if(res){
          this.isRefresh = res
        }
      },
      isRefreshFun(){      //根据详情有改变数据的操作 需要刷新
        if(this.isRefresh){
          this.refreshTableAndTree();
          this.isRefresh = false;
        }
      },
        checkOpts(record){
            let markArr = []
            let flag = false;
            if(this.permissionList.indexOf('14')>-1){
              flag = true;
            }
            if(this.isApplication == 1){
                if(this.permissionList.indexOf('10')>-1||this.permissionList.indexOf('11')>-1){
                  flag = true;
                }
            }
            if(this.isApplication == 0){
                if(record.isLocked==0){
                  if(this.permissionList.indexOf('5')>-1||this.permissionList.indexOf('7')>-1||this.permissionList.indexOf('9')>-1){
                    flag = true;
                  }
                }
                if(record.isLocked==1){
                    markArr.push('mk_set_user_qyyg');
                  if(this.permissionList.indexOf('8')>-1||this.permissionList.indexOf('9')>-1){
                    flag = true;
                  }
                }
            }
            return flag
        },
        //******************ant design框架类方法*****************//
        //***树相关***//
        onSelect(selectedKeys, info) {
            //清除表格操作
            this.layerChange(-1);
            //已分配部门成员
            this.listType = 1;
            //清空选中行
            this.initSelectTable();
            //恢复搜索框
            this.isApplication = 0;
            //树选中
            if (selectedKeys.length > 0) {
                this.selectedTreeKey = selectedKeys[0];
                this.selectedTreeName = info.selectedNodes[0].data.props.name;
                this.selectedTreePid = info.selectedNodes[0].data.props.pid;
                this.title = info.selectedNodes[0].data.props.name;
                if(info.selectedNodes[0].data.props.dataRef.children.length>0){
                  this.deptHaveSubFlag = true;
                }
                else{
                  this.deptHaveSubFlag = false;
                }
                if(info.selectedNodes[0].data.props.empCount>0){
                  this.deptHaveEmpFlag = true;
                }
                else{
                  this.deptHaveEmpFlag = false;
                }
            }
            this.listEmpExtendInfo();
        },
        onDragEnter() {
            this.refreshTableAndTree();
        },
        onDrop(info) {
            const dropKey = info.node.eventKey;
            const dragKey = info.dragNode.eventKey;
            const dropPos = info.node.pos.split('-');

            const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
            const loop = (data, key, callback) => {
                data.forEach((item, index, arr) => {
                    if (item.key === key) {
                        return callback(item, index, arr);
                    }
                    if (item.children) {
                        return loop(item.children, key, callback);
                    }
                });
            };
            const data = [...this.treeData];

            // Find dragObject
            let dragObj;
            loop(data, dragKey, (item, index, arr) => {
                arr.splice(index, 1);
                dragObj = item;
            });
            if (!info.dropToGap) {
                // Drop on the content
                loop(data, dropKey, item => {
                    item.children = item.children || [];
                    // where to insert 示例添加到尾部，可以是随意位置
                    item.children.push(dragObj);
                });
            } else if (
                (info.node.children || []).length > 0 && // Has children
                info.node.expanded && // Is expanded
                dropPosition === 1 // On the bottom gap
            ) {
                loop(data, dropKey, item => {
                    item.children = item.children || [];
                    // where to insert 示例添加到尾部，可以是随意位置
                    item.children.unshift(dragObj);
                });
            } else {
                let ar;
                let i;
                loop(data, dropKey, (item, index, arr) => {
                    ar = arr;
                    i = index;
                });
                if (dropPosition === -1) {
                    ar.splice(i, 0, dragObj);
                } else {
                    ar.splice(i + 1, 0, dragObj);
                }
            }
            this.treeData = data;
            this.draggingDept(data, dragKey);
        },
        //获取父节点及前一个节点 数据保存
        draggingDept(data, dragKey) {
            for (let i = 0; i < data.length; i++) {
                this.treeParentIds.push(data[i].key);
                let pid = "";
                if (data[i].key == dragKey) {
                    let previousDeptId = "";
                    if (i > 0) {
                        previousDeptId = data[i - 1].key;
                        pid = data[i - 1].pid;
                    } else {
                        pid = this.treeParentIds[this.treeParentIds.length - 2];
                    }

                    //提交后台拖拽成功
                    let parameter = {
                        deptId: dragKey,
                        pid: pid,
                        previousDeptId: previousDeptId,
                    }
                    this.dragDept(parameter);
                    return;
                }
                this.draggingDept(data[i].children, dragKey);
            }
        },
        //***表格相关**//
        onSelectChange(selectedRowKeys, selectedRows) {
            //表格选中项发生变化时的回调
            this.selectedRowKeys = selectedRowKeys;
            this.checkedCount = selectedRowKeys.length;
            //先清空，再添加，防止添加重复
            this.selectedRowNames = [];
            if (selectedRowKeys.length > 0) {
                this.layerChange(1);
                for (let i = 0; i < selectedRows.length; i++) {
                    this.selectedRowNames.push(selectedRows[i].name);
                }
            } else {
                this.layerChange(-1);
            }
        },
        onSizeChange(current){
            this.pagination.current = current;
            if (this.isApplication == 0) {
                this.listEmpExtendInfo();
            }
            if (this.isApplication == 1) {
                this.employeeApplyList();
            }
        },
        onShowSizeChange(current, pageSize){
            this.pagination.current = current;
            this.pagination.size = pageSize;
            this.pagination.pageSize = pageSize;
            if (this.isApplication == 0) {
                this.listEmpExtendInfo();
            }
            if (this.isApplication == 1) {
                this.employeeApplyList();
            }
        },
        handleTableChange(pagination) {
            this.pagination.current = pagination.current;
            this.pagination.pageSize = pagination.pageSize;
            if (this.isApplication == 0) {
                this.listEmpExtendInfo();
            }
            if (this.isApplication == 1) {
                this.employeeApplyList();
            }
        },

        //**************基本事件方法************//
        //***部门相关***//
        openAddDept() {
            //弹出添加部门
            this.addDeptDialog = true;
            this.deptId = '';
        },
        cancelAddDept(){
          this.addDeptDialog = false;
        },
        saveDeptSuccess(){
          this.addDeptDialog = false;
          this.refreshTableAndTree();
        },
        editDept() {
            //编辑部门
            if (typeof (this.selectedTreeKey) == "undefined" || this.selectedTreeKey == "") {
                this.$message.info('请选择编辑的部门');
                return;
            }
            if (this.selectedTreePid == "") {
                this.$message.info('该部门不允许修改');
                return;
            }
            //弹出添加部门
            this.addDeptDialog = true;
            this.addDeptTitle = '编辑部门';
            this.deptId = this.selectedTreeKey;
        },
        cancelMoveDept(){
          this.moveDeptDialog = false;
        },
        moveDeptSuccess(){
          this.moveDeptDialog = false;
          this.selectedRowKeys = [];
          this.selectedRowNames = [];
          this.layerChange(-1);
          this.refreshTableAndTree();
        },
        deleteDept() {
            //删除部门
            if (typeof (this.selectedTreeKey) == "undefined" || this.selectedTreeKey == "") {
                this.$message.warning('请选择删除的部门');
                return;
            }
            if (this.selectedTreePid == "") {
                this.$message.info('该部门不允许删除');
                return;
            }
            if(this.deptHaveSubFlag){
              this.$message.warning("当前部门下存在子部门，不允许删除！");
              return;
            }
            if(this.deptHaveEmpFlag){
              this.$message.warning("需要先删除该部门下的员工，再删除该部门！");
              return;
            }
            this.deptDeleteDialog = true;
            this.deptId = this.selectedTreeKey;
        },
        moveDept() {
            this.moveDeptDialog = true;
            this.moveDeptType = 1;
            this.moveDeptTitle = '移动部门';
        },
        distributionDept() {
            this.moveDeptDialog = true;
            this.moveDeptType = 2;
            this.moveDeptTitle = '分配部门';
        },
        //***员工相关***//
        openAddUser() {
          this.addUserDialog = true;
        },
        exportExcel(){
          this.exportExcelShow = true;
          this.exportData = Object.assign({}, this.searchCriteria);
        },
        cancelAddUser(){
          this.addUserDialog = false;
        },
        saveUserSuccess(){
          this.addUserDialog = false;
          this.refreshTableAndTree();
        },
        transferUser(record){
          this.userTransferDialog = true;
          this.userRecord = record;
        },
        editUser(record) {
          this.viewUserDialog = true;
          this.viewUserTitle = '编辑员工';
          this.viewUserType = 2;
          this.viewUserId = record.id
        },
        cancelPassUser(){
          this.viewUserDialog = false;
        },
        editUserSuccess(){
          this.viewUserDialog = false;
          this.cancelOption();
          this.refreshTableAndTree();
        },
        openUserInfo(record) {
            return {
                on: {
                    click: () => {
                        if(this.isApplication == 0) {
                            this.viewUserDialog = true;
                            this.viewUserTitle = '员工详情';
                            this.viewUserType = 1;
                            this.viewUserId = record.id
                        }
                    }
                }
            }
        },
        normalUser(record) {
            let that = this;
            this.$modal.confirm({
                title: '确定要启用员工 「' + record.name + '/' + record.phone + '」 吗？',
                content: '启用后该员工可正常登录本系统',
                width:"433px",
                height:"192px",
                okText: '确认',
                cancelText: '取消',
                icon: () => <icon-font type="iconyumengtubiao_chenggong" style="color:green" />,
                onOk() {
                    that.employeeLockEmp(record.id, 0);
                },
                onCancel() {
                },
            });
        },
        prohibitUser(record) {
            this.userDisabledDialog = true;
            this.userRecord = record;
        },
        deleteUser(record) {
            this.userDeleteDialog = true;
            this.userRecord = record;
        },
        passUser(record) {
          this.viewUserDialog = true;
          this.viewUserTitle = '审核通过-完善信息';
          this.viewUserType = 3;
          this.viewUserPassInfo = {
            empId:record.id,
            name:record.name,
            phone:record.phone,
            idCardNo:record.idCardNo,
            gender: record.gender,
          };
        },
        passUsers() {
            this.moveDeptDialog = true;
            this.moveDeptType = 3;
            this.moveDeptTitle = '审核通过-完善信息';
        },
        rejectUsers() {
            let ids = this.selectedRowKeys;
            if (ids.length <= 0) {
                return;
            }
            //驳回员工申请
            let that = this;
            this.$modal.confirm({
                title: '确定要驳回所选员工的申请信息？',
                content: '',
                width:"433px",
                height:"192px",
                okText: '确认',
                cancelText: '取消',
                icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
                onOk() {
                    let parameter = {
                        empApplyIdList: that.selectedRowKeys,
                    };
                    that.employeeApplyBatchRejected(parameter);
                },
                onCancel() {
                },
            });
        },
        employeeBatchDisable() {
            //批量禁用
            let ids = this.selectedRowKeys;
            let that = this;
            if (ids.length <= 0) {
                return;
            }
            let parameter = ids.join(",");
            this.$modal.confirm({
                title: '确定要禁用所选员工吗？',
                content: '禁用后该员工将不能登录本系统',
                okText: '确认',
                width:"433px",
                height:"192px",
                cancelText: '取消',
                onOk() {
                    //调用api接口
                    employeeBatchDisable(parameter).then(res => {
                        that.messageInfo(res, '禁用');
                        that.refreshTableAndTree();
                    });
                },
                onCancel() {
                },
            });
        },
        unallocatedUser() {
            this.title = "未分配部门员工";
            //未分配部门
            this.listType = 2;
            //清理选中表格数据
            this.initSelectTable();
            //清除选中树数据
            //this.initSelectTree();
            //清除表格操作
            this.layerChange(-1);
            //恢复搜索框
            this.isApplication = 0;
            //获取表格数据
            this.listEmpExtendInfo()
        },
        applicationUser() {
            this.title = "新成员申请";
            //已分配部门
            this.listType = 1;
            //清理选中表格数据
            this.initSelectTable();
            //清除表格操作
            this.layerChange(-1);
            //清楚选中树数据
            //this.initSelectTree();
            //去除搜索框
            this.isApplication = 1;

            this.employeeApplyList();
        },
        rejectApplicationUser(record) {
            //驳回员工申请
            let that = this;
            this.$modal.confirm({
                title: '确定要驳回 「' + record.name + record.phone + '」 的申请？',
                width:"433px",
                height:"192px",
                content: '',
                okText: '确认',
                cancelText: '取消',
                icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
                onOk() {
                    that.employeeApplyRejected(record.id);
                },
                onCancel() {
                },
            });
        },
        //获取所有角色，搜索框使用
        roleListAll() {
            let roleList = [];
            let tempAll = {};
            tempAll.label = "不限";
            tempAll.value= "";
            roleList.push(tempAll);
            //获取角色
            roleSimpleList().then(res => {
                res.data.forEach((item) => {
                    let temp = {};
                    temp.label = item.name;
                    temp.value= item.id;
                    roleList.push(temp);
                });
                //构造搜索数据结构
                this.searchList.forEach((item)=>{
                  if(item.key == 'roleId'){
                    item.list = roleList;
                  }
                });
            });
        },
        //***其他***//
        cancelOption() {
            //取消选中员工，取消相关操作
            this.selectedRowKeys = [];
            this.selectedRowNames = [];
            //清除操作图层
            this.layerChange(-1);
        },
        openSearchDrawer() {
            //弹出搜索框
            this.drawerVisible = true;
        },
        closeSearchDrawer() {
            //关闭搜索框
            this.drawerVisible = false;
        },
        //*************初始化数据******************//
        initSelectTable() {
            this.selectedRowKeys = [];   //表格选中key集合
            this.selectedRowNames = [];
            this.checkedCount = 0;       //表格选中数
        },
        initSelectTree() {
            this.selectedTreeKey = ""; //部门树选中部门key
            this.selectedTreeName = "";   //部门树选中部门名称
            this.treeParentIds = [];     //拖拽前一部门id集合 用于获取拖拽的父id
        },

        //*************构造参数类方法**************//
        addTreeIcon(arr) {
            //增加图标
            if (arr.length > 0) {
                arr.forEach((item) => { //利用foreach循环遍历
                    item.scopedSlots = { icon: 'user',title:'custom' };
                    if (item.children.length > 0) //判断chlidren是否有数据
                    {
                        this.addTreeIcon(item.children);  //递归调用
                    }
                });
            }
        },
        addKey(arr) {
            //table数据增加key属性值
            if (arr.length > 0) {
                arr.forEach((item) => { //利用foreach循环遍历
                    item.key = item.id;
                });
            }
        },
        //********获取接口数据方法**********//
        //***部门相关***//
        getDeptTreeWithStat() {
            //获取带统计的部门树
            getDeptTreeWithStat().then(res => {
                let arr = [];
                arr[0] = res.data;
                arr[0].slots = { icon: 'orgnization', }
                this.addTreeIcon(arr);
                this.treeData = arr;
                if(!this.title){
                  this.title = res.data.name;
                }
                //未分配员工数
                this.unallocatedCount = res.data["withoutDeptEmpTotal"];
                //申请加入员工
                this.applicationCount = res.data["applyJoinInEmpTotal"];
                //清空拖拽数据,防止内容过多内存耗损
                this.treeParentIds = [];
            });
        },
        deptRemove(id) {
            //获取带统计的部门树
            deptRemove(id).then(res => {
                this.messageInfo(res, '部门删除');
                this.refreshTableAndTree();
            });
        },
        dragDept(parameter) {
            //获取带统计的部门树
            dragDept(parameter).then(res => {
                this.messageInfo(res, '修改排序');
                this.refreshTableAndTree();
            });
        },
        //****员工相关****//
        listEmpExtendInfo() {
            this.tableColumns = tableColumnsDistribution;
            if (this.listType == 2) {
                //未分配部门
                this.searchCriteria.deptId = "";
            }
            else {
                this.searchCriteria.deptId = this.selectedTreeKey;
            }
            this.searchCriteria.listType = this.listType;
            this.searchCriteria.current = this.pagination.current;
            this.searchCriteria.size = this.pagination.pageSize;
            this.spinLoading = true;
            listEmpExtendInfo(this.searchCriteria).then(res => {
                this.addKey(res.data.records);
                const pagination = { ...this.pagination };
                pagination.total = res.data.total;
                this.pagination = pagination;
                this.tableData = res.data.records;
                setTimeout(()=>{
                    this.spinLoading = false;
                },500)
            });
        },
        employeeLockEmp(id, lockedOrNot) {
            //锁定、解锁
            let parameter = {
                id: id,
                lockedOrNot: lockedOrNot,
            };
            employeeLockEmp(parameter).then(res => {
                if (lockedOrNot == 0) {
                    this.messageInfo(res, '启用');
                }
                this.refreshTableAndTree();
            });
        },
        employeeApplyList() {
            this.tableColumns = tableColumnsToDistribution;
            let parameter = {
                current: this.pagination.current,
                size: this.pagination.pageSize,
            };
            employeeApplyList(parameter).then(res => {
                this.addKey(res.data.records);
                this.tableData = res.data.records;
                const pagination = { ...this.pagination };
                pagination.total = res.data.total;
                this.pagination = pagination;
            });
        },
        //****员工申请相关****//
        employeeApplyRejected(id) {
            let parameter = {
                id: id,
            }
            employeeApplyRejected(parameter).then(res => {
                this.messageInfo(res, '驳回');
                if(res.code == "200"){
                    this.refreshTableAndTree();
                }
            });
        },
        employeeApplyBatchRejected(parameter) {
            employeeApplyBatchRejected(parameter).then(res => {
                this.messageInfo(res, '驳回');
                if(res.code == "200"){
                    this.refreshTableAndTree();
                }
            });
        },
        //***其他***//
        refreshTableAndTree() {
            //���新表格及树数据
            this.getDeptTreeWithStat();
            if (this.isApplication == 0) {
                this.listEmpExtendInfo();
            }
            if (this.isApplication == 1) {
                this.employeeApplyList();
            }
            this.roleListAll();
        },
        getUserInfo(){
            employeeUserInfo().then(res => {
                this.currentUserId =  res.data.empId;
            });
        },
        //提示框
        messageInfo(res, msg) {
            if (res.code == "200") {
                this.$message.info(msg + '成功');
            }
            else {
                this.$message.error(msg + '失败');
            }
        },
        layerChange(index) {
            let checkOptionDoc = document.getElementById("checkOption");
            let applicationCheckOptionDoc = document.getElementById("applicationCheckOption");
            if (checkOptionDoc != null) {
                document.getElementById("checkOption").style.zIndex = index;
            }
            if (applicationCheckOptionDoc != null) {
                document.getElementById("applicationCheckOption").style.zIndex = index;
            }
        },
        assetsFormData(data) {
            this.drawerVisible = false;
            this.searchCriteria.gender = data.gender;
            this.searchCriteria.fuzzyKeyword = data.fuzzyKeyword;
            this.searchCriteria.roleId = data.roleId;
            this.searchCriteria.empTypeId = data.empTypeId;
            this.searchCriteria.matchType = data.fuzzyQueryType;
            this.searchCriteria.current = 1;
            this.pagination.current = 1;
            this.listEmpExtendInfo();
        }
    },
    filters: {
        formatTime: function(value) {
            if (!value) return '-';
            value = getDateHaoMiao(value,"秒");
            return value;
        },
    }
};


</script>

<style scoped lang="less">
.content {
    height: 100%;
    &/deep/.ant-tree li span.ant-tree-iconEle {
        margin: -2px;
    }
}

.moreColor {
    color: #0A87F8;
}

.setting {
    background-color: #F1F2F5;
    height: calc(100vh - 100px);
    .left {
        width: 20%;
        background-color: #FFFFFF;
        float: left;
        height: calc(100vh - 135px);
        .organization {
            margin: 0px 10px 0px 10px;
            border-bottom: 1px solid #F1F2F5;
            height: 40px;
            line-height: 40px;

            .title {
                float: left;
            }

            .operate {
                float: right;
            }
        }
        .leftDetail {
            height: calc(100vh - 215px);
            overflow: auto;

            .tree {
                margin: 10px 10px 0px 10px;
                border-bottom: 1px solid #F1F2F5;
              .deptStyle{
                border-radius: 2px;
                color: #0a87f8;
                background-color: #f0f8ff;
                font-size: 11px;
                text-align: center;
                padding: 3px;
                margin-right: 3px;
              }
            }

            .unallocatedRow {
                .unallocated {
                    margin: 0px 10px 0px 10px;
                    border-bottom: 1px solid #F1F2F5;
                    height: 40px;
                    line-height: 40px;
                }
            }

            .unallocatedRow:hover {
                background-color: #F6F7F8;
            }

            .applicationRow:hover {
                background-color: #F6F7F8;
            }

            .application {
                margin: 0px 10px 10px 10px;
                border-bottom: 1px solid #F1F2F5;
                height: 40px;
                line-height: 40px;

                .iconFloat {
                    float: left;
                }

                .applicationFont {
                    position: relative;

                    .redIconRadius {
                        position: absolute;
                        top: 10px;
                        left: 163px;
                        width: 6px;
                        height: 6px;
                        background-color: #FF3B30;
                        border-radius: 4px;
                    }
                }
            }

            .iconFont {
                margin-right: 5px;
            }
        }
        .leftAdd {
            cursor: pointer;
            border-top: 1px solid #F1F2F5;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: @themeColor;
        }
    }

    .right {
        width: 79%;
        background-color: #FFFFFF;
        float: right;
        height: calc(100vh - 135px);
        overflow: auto;
        .floatLeft {
            float: left;
        }
        .themeColor {
            color: @themeColor;
        }
        .deptManage {
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #F1F2F5;
            .deptManageName {
                float: left;
                font-weight: bold;
                font-size: 14px;
                margin-left: 10px;
            }
            .deptManageOperate {
                float: right;
                .deptManageOperateEdit {
                    margin-left: 8px;
                    margin-right: 8px;
                    .deptManageOperateEditIcon {
                        margin-right: 6px;
                        color:#666666;
                    }
                }
                .deptManageOperateDelete {
                    margin-left: 8px;
                    margin-right: 4px;
                    .deptManageOperateDeleteIcon {
                        margin-right: 6px;
                        color:#666666;
                    }
                }
            }
        }
        .userManage {
            height: 50px;
            line-height: 50px;
            width: 100%;
            .userManageName {
                margin-left: 10px;
                float: left;
            }
            .userManageOperate {
                margin-right: 2px;
                float: right;
                .userSearch {
                    float: left;
                    margin-right: 5px;
                }
                .userAdd {
                    float: right;
                    margin-left: 15px;
                }
                & /deep/ .exportExcel-box {
                  width: 24px;
                  height: 24px;
                  margin-left: 6px;
                  margin-top: 4px;
                  & /deep/ svg {
                    width: 24px;
                    height: 24px;
                  }
                }
            }
        }
        .table {
            margin: 0 10px 0 10px;
            position:relative;
            .unPermissionStyle{
              font-size: 12px;
              color: #FFA036;
            }
            .checkOption {
                .fontSpacing {
                    margin-left: 3px;
                    margin-right: 3px;
                }
                position: absolute;
                z-index: -1;
                background-color: #fafafa;
                margin-top: 91px;
                height: 45px;
                margin-left: 64px;
                line-height: 45px;
                width: 92%;
                .dealOption {
                    float: left;

                    .headSpan {
                        margin-left: 16px;
                    }
                }
                .cancelOption {
                    font-size: 14px;
                    float: right;
                    margin-right: 20px;
                }
            }
            .applicationCheckOption {
                .fontSpacing {
                    margin-left: 3px;
                    margin-right: 3px;
                }
                position: absolute;
                z-index: -1;
                background-color: #fafafa;
                margin-top: 91px;
                margin-left: 64px;
                height: 45px;
                line-height: 45px;
                width: 92%;
                .dealOption {
                    font-size: 13pt;
                    float: left;

                    .headSpan {
                        margin-left: 16px;
                    }
                }
                .cancelOption {
                    font-size: 14px;
                    float: right;
                    margin-right: 20px;
                }
            }
            .action:hover {
                background-color: @themeBgColor;
                color: @themeColor;
            }
            .IconRadius {
                margin-top: 8px;
                margin-right: 5px;
                width: 6px;
                height: 6px;
                border-radius: 4px;
            }
            .fontNormal {
                .normalBg {
                    background-color: #3DB302;
                }
            }
            .fontProhibit {
                .prohibitBg {
                    background-color: #777777;
                }
                .inviteBg{
                  background-color:#FFAF6D;
                }
            }
            .fontNormalColor {
                color: #3DB302;
            }
            .fontProhibitColor {
                color: #111111;
            }
            .nameColumn {
                width: 100%;
                .name {
                    float: left;
                }
                .leaderFlag {
                    color: #777777;
                    border-radius: 4px;
                    background-color: rgba(10, 135, 248);
                    float: left;
                    text-align: center;
                    margin-right: 4px;
                    color: #FFFFFF;
                    padding: 1px 4px;
                    .leaderLength {
                        font-size: 12px;
                    }
                }
            }
          .deptNameStyle{
            .itemStyle{
              margin:0 5px 5px 0;
              .itemLeft{
                padding: 0 5px;
                height: 24px;
                line-height: 24px;
                color: #0A87F8;
                font-size: 12px;
                background: #E6F3FF;
                border-radius:4px 0 0 4px;
                border: 1px solid #EEEEEE;
                border-right: none;
              }
              .itemRight{
                background: #F6F7F8;
                font-size: 14px;
                color: #111111;
                height: 24px;
                line-height: 24px;
                padding: 0 5px;
              }
              .itemStyleIstMain{
                border-radius:  0 4px 4px 0;
                border: 1px solid #EEEEEE;
                border-right: none;
              }
              .itemStyleNotMain{
                padding: 0 5px;
                border-radius: 4px;
                border: 1px solid #EEEEEE;
              }
            }
          }
            .contFoot {
                margin-top: 0px;
                width: 100%;
                height: 56px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-right: 20px;
                // position: absolute;
                // bottom: 0px;
                // right: 0;
                background-color: #fff;
            }
            & /deep/ .ant-table-thead > tr {
                height: 46px;
                padding: 0 10px 0px 8px;
            }
            & /deep/ .ant-table-thead > tr > th{
                padding: 13.33px 8px
            }
            & /deep/ .ant-table-tbody > tr > td{
                padding: 0px 8px;
                &:not(:first-child) {
                    cursor: pointer;
                }
            }
        }
    }

    .drawerContent {
        height: 90%;
    }
    .drawerBottom {}
}
</style>
<style lang="less" scoped>
    /deep/ .ant-popover-inner-content{
        padding: 4px 0;
        .action{
          padding: 8px;
        }
        .action:hover{
            cursor: pointer;
            background:rgba(10,135,248,0.1);
        }
    }
    /deep/ .ant-tree li.ant-tree-treenode-switcher-close.ant-tree-treenode-selected {
            background: rgba(10, 135, 248, 0.1);
    }
    /deep/ .ant-tree span.ant-tree-node-content-wrapper.ant-tree-node-selected{
        background: rgba(10, 135, 248, 0.02);
    }
    /deep/ .ant-tree .ant-tree-treenode-switcher-open .ant-tree-node-selected{
        background: rgba(10, 135, 248, 0.1);
        color: rgb(10, 135, 248);
    }
    /deep/ .ant-tree > li{
        justify-content: center;
    }
    /deep/ .ant-tree-child-tree > li:first-child{
        padding-top: 4px;
    }
    /deep/ .ant-tree-child-tree > li:last-child{
        padding-bottom: 4px;
    }
</style>
