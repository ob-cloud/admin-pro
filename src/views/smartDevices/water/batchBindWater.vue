<template>
  <div class="bindWater-new-box">
    <div class="bindWater-type clearfix">
      <div class="f-fl normal cursor" :class="bindForm.meterType==1?'click':''" @click="changeMeterType(1)">冷水表</div>
      <div class="f-fl normal cursor" :class="bindForm.meterType==2?'click':''" @click="changeMeterType(2)">热水表</div>
    </div>
    <div class="bindWater-box">
      <div class="bindWater-box-top clearfix" >
        <div class="title f-fl">请选择冷表的品牌/类型</div>
        <div class="f-fl" style="font-size: 12px;color: #FFA036;margin-top: 1.5px;">
          <a-icon type="exclamation-circle" style="color: #FFA036;margin:0 4px 0 10px;font-size: 12px;" />只能同时绑定一个品牌/类型
        </div>
      </div>
      <div class="bindWater-box-accounts">
        <div class="bindLick-account clearfix">
          <div class="itemStyle cursor f-fl" :class="bindForm.brand==0?'clickStyle':'unClickStyle'" @click="changeOtherBrand()">
            <div class="otherStyle svgStyle f-fl"><icon-font  type="iconmensuo"></icon-font></div>
            <div class="title f-fl" style="height: 34px;line-height: 34px;margin-left: 11px;">普通水表</div>
            <div v-if="bindForm.brand == 0" :class="bindForm.brand == 0 ?'triangle-top-right-click':'triangle-top-right-unClick'">
            </div>
            <icon-font v-if="bindForm.brand == 0" class="triangle-top-right-choose" type="iconyumengtubiao_xuanzhong-"/>
          </div>
          <div v-if="authAccountList.length>0" class="itemStyle cursor f-fl" v-for="(item) in authAccountList" :key="item.id" @click="changeBrand(item)" :class="bindForm.authAccountId==item.id?'clickStyle':'unClickStyle'">
            <div class="yunDingStyle svgStyle f-fl" v-if="item.brand == 1"><icon-font  type="iconyunding"></icon-font></div>
            <div class="chaoyi svgStyle f-fl" v-if="item.brand == 4"><icon-font  type="iconchaoyi"></icon-font></div>
            <div class="f-fl" style="margin-left: 10px;">
              <div class="title overHidde" style="line-height: 18px;max-width: 120px;" v-if="item.brand == 1">{{item.thirdPartyAccountId}}</div>
              <div class="title overHidde" style="line-height: 18px;max-width: 120px;" v-if="item.brand == 4">{{item.thirdPartyAppId}}</div>
              <div class="overHidde" style="font-size: 12px;color: #777777;line-height: 16px;max-width: 120px;">{{item.comment?item.comment:'-'}}</div>
            </div>
            <div v-if="bindForm.authAccountId==item.id" :class="bindForm.authAccountId==item.id ?'triangle-top-right-click':'triangle-top-right-unClick'"></div>
            <icon-font v-if="bindForm.authAccountId==item.id" class="triangle-top-right-choose" type="iconyumengtubiao_xuanzhong-"/>
          </div>
          <div class="itemStyle cursor f-fl" style="background: #F6F7F8;" v-if="!acceptPlat.yunDing" @click="goToAuth(1)">
            <div class="unHaveStyle svgStyle f-fl"><icon-font  type="iconyunding"></icon-font></div>
            <div class="f-fl" style="margin-left: 10px;">
              <div class="title" style="line-height: 18px;color: #777777;">云丁</div>
              <div class="overHidde" style="font-size: 12px;color: #777777;line-height: 16px;max-width: 120px;">未授权账号</div>
            </div>
          </div>
          <div class="itemStyle cursor f-fl" style="background: #F6F7F8;" v-if="!acceptPlat.chaoyi" @click="goToAuth(4)">
            <div class="unHaveStyle svgStyle f-fl" ><icon-font  type="iconchaoyi"></icon-font></div>
            <div class="f-fl" style="margin-left: 10px;">
              <div class="title" style="line-height: 18px;color: #777777;">超仪</div>
              <div class="overHidde" style="font-size: 12px;color: #777777;line-height: 16px;max-width: 120px;">未授权账号</div>
            </div>
          </div>
          <div class="itemStyle cursor bindStyle f-fl" @click="goToBindAccount()">
            <icon-font type="iconyumengtubiao_tianjia" /> 绑定账号
          </div>
        </div>
      </div>
      <div class="clearfix" style="width: 1260px;" v-if="bindForm.brand==0">
        <div style="padding: 19.5px 0 14.5px 0;">
          <div class="title">未绑{{bindForm.meterType==2?'热':'冷'}}水表房源</div>
        </div>
        <div class="set_info f-clearfix">
          <div class="selectItem selectItem1 f-fl">
            <div class="titleTip1 titleTip1With1 f-fl">部门/人员</div>
            <dept-employee-tree class="f-fl" placeholder="不限" :showNameAll="false" :showEmployee="true" @selectChange="selectDept" placement="bottomLeft" ref="selectDeptEmp" width="151px" @cancelOtherTree="cancelOtherTree(['selectCityTown'])"></dept-employee-tree>
          </div>
          <div class="selectItem selectItem1 f-fl cityTree">
            <div class="titleTip1 titleTip1With1 f-fl">城市/区域</div>
            <city-town-tree class="f-fl" style="width: 151px;" placeholder="不限" ref="selectCityTown" :showArea="true" :showTown="true" @selectChange="selectCityTownChange" @cancelOtherTree="cancelOtherTree(['selectDeptEmp'])"></city-town-tree>
          </div>
          <div class="selectItem selectItem1 f-fl">
            <div class="titleTip1 titleTip1With2 f-fl">房源类型</div>
            <a-select placeholder="全部" style="width:138px;height:34px" v-model="sendData.houseType" :allowClear="true" @change="listUnbindSmartDevice()">
              <a-select-option value="2">合租</a-select-option>
              <a-select-option value="1">整租</a-select-option>
              <a-select-option value="3">独栋</a-select-option>
            </a-select>
          </div>
          <div class="selectItem selectItem1 searchStyle f-fl">
            <a-input placeholder="房源编号/房源地址/项目地址/门牌号" v-model="sendData.fuzzyKeyword" style="width: 490px" @pressEnter="listUnbindSmartDevice" />
          </div>
          <div class="searchButtonStyle cursor f-fl" style="margin-right: 10px;" @click="listUnbindSmartDevice">
            <icon-font type="iconyumengtubiao_sousuo" />
          </div>
          <div class="clearStyle f-fl cursor" @click="clearSearchListUnboundWaterHouse">
            清空
          </div>
        </div>
        <div class="basicsInfo" :style="tableData.length==0?'padding-bottom: 20px;':''">
          <div class="table">
            <div class="table-title">
              <div style="max-width: 45px;text-align: center;border-radius: 4px 0px 0px 0px;">序号</div>
              <div style="max-width: 509px;text-align: left;padding-left: 9px;">房源地址</div>
              <div style="max-width: 113px;text-align: left;padding-left: 9px;">类型</div>
              <div style="max-width: 68px;text-align: center;">绑定</div>
              <div class="cursor" style="max-width: 225px;text-align: left;padding-left: 14px;" @click="goBatchSetOne()">
                表数统计方式/水费单价<icon-font style="color: #0A87F8;margin-left: 5px;" type="iconyumengtubiao_shezhi"/>
              </div>
              <div style="max-width: 300px;text-align: left;padding-left: 14px;border-radius: 0px 4px 0px 0px;">水表描述</div>
            </div>
            <div class="house-data u-no-border" v-for="(item,index) in tableData" :key="item.houseId"
                 @mouseover="mouseOverHouseId=item.houseId;" @mouseleave="mouseOverHouseId=''"
                 :style="mouseOverHouseId==item.houseId?'background-color:fade(#0A87F8,10%)':''">
              <div style="max-width: 45px;text-align: center;" :style="mouseOverHouseId==item.houseId?'background:#E6F3FE':''">{{item.num}}</div>
              <div style="max-width: 509px;text-align: left;padding-left: 9px;" :style="mouseOverHouseId==item.houseId?'background:#E6F3FE':''">
                <a-popover>
                  <template slot="content">
                    <p style="padding: 8px 18px;">
                      <span class="houseAddress" v-if="item.houseAlias">{{item.houseAlias}}</span>{{item.fullAddress}}
                    </p>
                  </template>
                  <div style="max-width:250px;" type="primary">
                    <p class="overHidde">
                      <span class="houseAddress" v-if="item.houseAlias">{{item.houseAlias}}</span>{{item.fullAddress}}
                    </p>
                  </div>
                </a-popover>
              </div>
              <div style="max-width: 113px;text-align: left;padding-left: 9px;" :style="mouseOverHouseId==item.houseId?'background:#E6F3FE':''">{{ item.roomName?item.roomName:'-'}}</div>
              <div style="max-width: 68px;text-align: center;" :style="mouseOverHouseId==item.houseId?'background:#E6F3FE':''">
                <icon-font style="color: #0A87F8;" type="iconyumengtubiao_zhishi"/>
              </div>
              <div class="priceStyle clearfix" :class="item.name&&item.clickSave&&!item.unitPrice?'mustStyle':''"
                   style="max-width: 225px;text-align: left;padding:0 10px;">
                <div class="f-fl">
                  <a-select v-model="item.billingMethod" style="width: 80px;">
                    <a-select-option :value="1">余数</a-select-option>
                    <a-select-option :value="2">底数</a-select-option>
                    <a-select-option :value="3">金额</a-select-option>
                  </a-select>
                </div>
                <div class="splitStyle f-fl">
                </div>
                <div class="f-fl" style="width: 80px;">
                  <a-input v-mustFill:[item.clickSave] :class="item.clickSave&&item.name&&!item.unitPrice?'borderRed':''" v-validate="'money|max(99.99)'" v-model="item.unitPrice" placeholder="单价" @change="getMustFill(index)"></a-input>
                </div>
                <div class="f-fr">
                  {{item.billingMethod==3?'元':'元/m³'}}
                </div>
              </div>
              <div style="max-width: 300px;text-align: left;padding-left: 14px;">
                <a-input v-model="item.name" placeholder="请输入" @change="getMustFill(index)"/>
              </div>
            </div>
            <div class="house-no-data u-no-border" v-if="tableData.length==0">
              <div style="padding-top: 40px;text-align: center;">
                <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
              </div>
              <div style="margin:20px 0 100px 0;color: #777777;font-size: 14px;text-align: center">
                没有可绑定房源
              </div>
            </div>
          </div>
        </div>
        <div class="contFoot" v-show="tableData.length>0">
          <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
        </div>
      </div>
      <div class="smartDeviceStyle clearfix" style="border-bottom: 8px solid #F6F7F8;" v-else>
        <div class="f-fl" style="width: 670px;">
          <div style="padding: 19.5px 0 14.5px 0;">
            <div class="title">未绑{{bindForm.meterType==2?'热':'冷'}}水表房源</div>
          </div>
          <div class="set_info f-clearfix">
            <div class="selectItem selectItem2 f-fl">
              <div class="titleTip1 titleTip1With1 f-fl">部门/人员</div>
              <dept-employee-tree class="f-fl" placeholder="不限" :showNameAll="false" :showEmployee="true" @selectChange="selectDept" placement="bottomLeft" ref="selectDeptEmp" width="81px" @cancelOtherTree="cancelOtherTree(['selectCityTown'])"></dept-employee-tree>
            </div>
            <div class="selectItem selectItem2 f-fl cityTree">
              <div class="titleTip1 titleTip1With1 f-fl">城市/区域</div>
              <city-town-tree class="f-fl" style="width: 81px;" placeholder="不限" ref="selectCityTown" :showArea="true" :showTown="true" @selectChange="selectCityTownChange" @cancelOtherTree="cancelOtherTree(['selectDeptEmp'])"></city-town-tree>
            </div>
            <div class="selectItem selectItem2 f-fl">
              <div class="titleTip1 titleTip1With2 f-fl">房源类型</div>
              <a-select placeholder="全部" style="width:81px;height:34px" v-model="sendData.houseType" :allowClear="true" @change="listUnbindSmartDevice()">
                <a-select-option value="2">合租</a-select-option>
                <a-select-option value="1">整租</a-select-option>
                <a-select-option value="3">独栋</a-select-option>
              </a-select>
            </div>
            <div class="selectItem selectItem2 searchStyle f-fl">
              <a-input class="overHidde" placeholder="房源编号/房源地址/项目地址/门牌号" v-model="sendData.fuzzyKeyword" style="width: 168px" @pressEnter="listUnbindSmartDevice" />
            </div>
            <div class="searchButtonStyle cursor f-fl" @click="listUnbindSmartDevice" style="margin-right: 0px;">
              <icon-font type="iconyumengtubiao_sousuo" />
            </div>
          </div>
          <div class="basicsInfo" :style="tableData.length==0?'padding-bottom: 20px;':''">
            <div class="table">
              <div class="table-title">
                <div style="max-width: 273px;text-align: left;padding-left: 9px;">房源地址</div>
                <div style="max-width: 68px;text-align: left;padding-left: 9px;">类型</div>
                <div style="max-width: 228px;text-align: left;padding-left: 10px;">
                  选择房源/对应水表序列号
                </div>
                <div class="cursor" @click="goBatchSetTwo()" style="max-width: 100px;text-align: left;padding-left: 14px;border-radius: 0px 4px 0px 0px;">
                  水费单价<icon-font style="color: #0A87F8;margin-left: 5px;" type="iconyumengtubiao_shezhi"/>
                </div>
              </div>
              <div class="house-data u-no-border" v-for="(item,index) in tableData" :key="item.houseId"
                    @mouseover="mouseOverHouseId=item.houseId;" @mouseleave="mouseOverHouseId=''"
                    :style="mouseOverHouseId==item.houseId?'background-color:fade(#0A87F8,10%)':''">
                <div style="max-width: 273px;text-align: left;padding-left: 9px;" :style="mouseOverHouseId==item.houseId?'background:#E6F3FE':''">
                  <a-popover>
                    <template slot="content">
                      <p style="padding: 8px 18px;">
                        <span class="houseAddress" v-if="item.houseAlias">{{item.houseAlias}}</span>{{item.fullAddress}}
                      </p>
                    </template>
                    <div style="max-width:250px;" type="primary">
                      <p class="overHidde">
                        <span class="houseAddress" v-if="item.houseAlias">{{item.houseAlias}}</span>{{item.fullAddress}}
                      </p>
                    </div>
                  </a-popover>
                </div>
                <div style="max-width: 68px;text-align: left;padding-left: 9px;" :style="mouseOverHouseId==item.houseId?'background:#E6F3FE':''">{{ item.roomName?item.roomName:'-'}}</div>
                <div class="clearfix cursor" style="max-width: 228px;text-align: left;padding: 0 10px;" :style="mouseOverHouseId==item.houseId?'background:#E6F3FE':''" @click="setSelect(item)">
                  <div class="f-fl " v-if="houseIdList.indexOf(item.houseId)>-1">
                    <icon-font style="color: #0A87F8;" type="iconduoxuanyixuanzhong" />
                  </div>
                  <div class="f-fl" v-else>
                    <icon-font style="color: #777777;" type="iconduoxuanweixuanzhong" />
                  </div>
                  <div class="f-fl" style="width: 120px;margin-left: 10px;">
                    <span v-if="!item.sn">
                      <span v-if="houseIdList.indexOf(item.houseId)>-1" style="color: #FB4246">请选择右边的水表</span>
                      <span v-else style="color: #BBBBBB">请选择右边的水表</span>
                    </span>
                    <span v-else style="color: #111111">{{item.sn}}</span>
                  </div>
                </div>
                <div class="priceStyle clearfix" style="max-width: 100px;text-align: left;padding: 0 10px;">
                  <div class="f-fl" style="width: 60px;">
                    <a-input v-mustFill:[item.clickSave] :class="item.clickSave&&!item.unitPrice?'borderRed':''" v-validate="'money|max(99.99)'" v-model="item.unitPrice" placeholder="单价" @change="getMustFill_smart(index)"></a-input>
                  </div>
                  <div class="f-fr">
                    元
                  </div>
                </div>
              </div>
              <div class="house-no-data u-no-border" v-if="tableData.length==0">
                <div style="padding-top: 40px;text-align: center;">
                  <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
                </div>
                <div style="margin:20px 0 100px 0;color: #777777;font-size: 14px;text-align: center">
                  没有可绑定房源
                </div>
              </div>
            </div>
          </div>
          <div class="contFoot" v-show="tableData.length>0">
            <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
          </div>
        </div>
        <div class="f-fl" style="background: #F6F7F8;width: 6px;margin: 0 10px;height: calc(100vh - 330px);"></div>
        <div class="f-fl yunDingElectricList-box" v-if="bindForm.brand==1">
          <div style="padding: 19.5px 0 14.5px 0;">
            <div class="title">{{bindForm.meterType==2?'热':'冷'}}水表信息</div>
          </div>
          <div class="detail_info">
            <div class="set_info f-clearfix">
              <div class="selectItem f-fl cityTree">
                <div class="titleTip1 titleTip1With1 f-fl">城市/区域</div>
                <city-town-tree class="f-fl" style="width: 114px;" placeholder="不限" ref="selectCityTown" :showArea="true" :showTown="false" @selectChange="selectCityTownChange_info"></city-town-tree>
              </div>
              <div class="selectItem f-fl">
                <div class="titleTip1 titleTip1With2 f-fl">房源名称</div>
                <a-input placeholder="请输入" v-model="sendData_info.houseName" style="width: 70px;height: 34px" @pressEnter="listPullWaterMeter"></a-input>
              </div>
              <div class="selectItem f-fl">
                <div class="titleTip1 titleTip1With2 f-fl">详细地址</div>
                <a-input class="overHidde" placeholder="请输入" v-model="sendData_info.houseAddress" style="width: 134px;height: 34px" @pressEnter="listPullWaterMeter"></a-input>
              </div>
              <div class="selectItem searchButtonStyle cursor f-fl" @click="listPullWaterMeter" style="margin-right: 0px;">
                <icon-font type="iconyumengtubiao_sousuo" />
              </div>
            </div>
            <div class="electricList_info">
              <div class="basicsInfo" :style="tableData_info.length==0?'padding-bottom: 20px;':''">
                <div class="table">
                  <div class="table-title">
                    <div style="max-width: 304px;text-align: left;padding-left: 9px;border-radius: 4px 0px 0px 0px;">安装地址</div>
                    <div style="max-width: 200px;text-align: left;padding-left: 9px;">水表序列号</div>
                    <div style="max-width: 56px;text-align: center;border-radius: 0px 4px 0px 0px;">选择</div>
                  </div>
                  <div class="house-data u-no-border" v-for="(item) in tableData_info" :key="item.houseId">
                    <div class="item" style="text-align: left;padding-left: 9px;display: flex;align-items: center;" :style="item.roomList.length==0?'height:60px;line-height:60px;max-width:304px;':item.roomList.length==1?'height:60px;line-height:60px;max-width:196px;':'height:'+item.roomList.length*40+'px;max-width:196px;'">
                      <div :style="item.roomList.length==0?'height:42px;line-height:21px;margin-top:0px;':''">
                        <span style="font-size: 14px;color: #111111;">{{item.cityName}}{{item.areaName}}{{item.communityName}}<br/></span>
                        <span style="font-size: 13px;color: #777777;">{{item.houseAddress}}</span>
                      </div>
                    </div>
                    <div class="item" v-if="item.roomList.length==0" style="text-align: center;max-width: 256px;height:60px;line-height: 60px;color: #BBBBBB;border-right: 1px solid #EEEEEE;">
                      暂无{{bindForm.meterType==1?'冷':'热'}}水表
                    </div>
                    <div class="item" v-else style="max-width: 366px;" :style="item.roomList.length==1?'height:60px;line-height:60px;':''">
                      <div class="itemDetail" v-for="(temp,index) in item.roomList">
                        <div style="max-width: 108px;text-align: left;padding-left: 9px;">
                          {{temp.roomName}}
                        </div>
                        <div style="max-width: 200px;text-align: left;padding-left: 9px;">
                          {{temp.sn?temp.sn:'-'}}
                        </div>
                        <div class="checkStyle cursor" @click="selectedElectricUuidFn(item,temp)" style="max-width: 56px;text-align: center;">
                          <icon-font class="selectStyle" v-if="selectedWaterIds.indexOf(temp.uuid)>-1" type="iconyumengtubiao_danxuan-yixuanze" />
                          <icon-font class="unSelectStyle" v-else type="iconyumengtubiao_danxuan-weixuanze" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="house-no-data u-no-border" v-if="tableData_info.length==0">
                    <div style="padding-top: 40px;text-align: center;">
                      <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
                    </div>
                    <div style="margin:20px 0 100px 0;color: #777777;font-size: 14px;text-align: center">
                      没有可选择{{bindForm.meterType==1?'冷':'热'}}水表
                    </div>
                  </div>
                </div>
              </div>
              <div class="contFoot" v-show="tableData_info.length>0">
                <span class="cursor" v-if="pagination_info.current>1" style="margin-right: 8px;" @click="onShowSizeChange_pre">上一页</span>
                <span v-else style="color: #BBBBBB;margin-right: 8px;">上一页</span>
                <span class="cursor" v-if="pagination_info.total==pagination_info.pageSize" style="margin-right: 8px;" @click="onShowSizeChange_next">下一页</span>
                <span v-else style="color: #BBBBBB;margin-right: 8px;">下一页</span>
                <a-select style="width: 100px;" v-model="pagination_info.pageSize" @change="onShowSizeChange_info">
                  <a-select-option v-for="(item) in pageSizeOptions" :key="item.key">{{ item.name }}</a-select-option>
                </a-select>
              </div>
            </div>
          </div>
        </div>
        <div class="f-fl yunDingElectricList-box" v-if="bindForm.brand==4">
          <div style="padding: 19.5px 0 14.5px 0;">
            <div class="title">
              {{bindForm.meterType==2?'热':'冷'}}水表信息
              <span style="color: #FFA036;font-size: 14px;margin-left: 20px;">如找不到您要的设备，请点击“同步设备数据”</span>
              <span class="cursor" @click="freshData" style="color: #0A87F8;font-size: 14px;margin-left: 30px;"><icon-font :class="{'imgrotate_common':syncInfoLoading}" style="margin-right: 3px;" type="iconyumengtubiao_zhongzhi" />同步设备数据</span>
            </div>
          </div>
          <div class="detail_info">
            <div class="set_info f-clearfix">
              <div class="selectItem f-fl cityTree">
                <div class="titleTip1 titleTip1With1 f-fl">城市/区域</div>
                <city-town-tree class="f-fl" style="width: 114px;" placeholder="不限" ref="selectCityTown" :showArea="true" :showTown="false" @selectChange="selectCityTownChange_info"></city-town-tree>
              </div>
              <div class="selectItem f-fl">
                <div class="titleTip1 titleTip1With2 f-fl">设备编号</div>
                <a-input placeholder="请输入" v-model="sendData_info.deviceNo" style="width: 70px;height: 34px" @pressEnter="listPullWaterMeter"></a-input>
              </div>
              <div class="selectItem f-fl">
                <div class="titleTip1 titleTip1With2 f-fl">详细地址</div>
                <a-input class="overHidde" placeholder="请输入" v-model="sendData_info.fuzzyKeyword" style="width: 134px;height: 34px" @pressEnter="listPullWaterMeter"></a-input>
              </div>
              <div class="searchButtonStyle cursor f-fl" @click="listPullWaterMeter" style="margin-right: 0px;">
                <icon-font type="iconyumengtubiao_sousuo" />
              </div>
            </div>
            <div class="electricList_info">
              <div class="basicsInfo" :style="tableData_info.length==0?'padding-bottom: 20px;':''">
                <div class="table">
                  <div class="table-title">
                    <div style="max-width: 304px;text-align: left;padding-left: 9px;border-radius: 4px 0px 0px 0px;">安装地址</div>
                    <div style="max-width: 200px;text-align: left;padding-left: 9px;">设备编号</div>
                    <div style="max-width: 56px;text-align: center;border-radius: 0px 4px 0px 0px;">选择</div>
                  </div>
                  <div class="house-data u-no-border" v-for="(item) in tableData_info" :key="item.houseId">
                    <div style="max-width: 304px;text-align: left;padding-left: 9px;border-radius: 4px 0px 0px 0px;">{{item.fullAddress}}</div>
                    <div style="max-width: 200px;text-align: left;padding-left: 9px;">{{item.deviceNo}}</div>
                    <div class="checkStyle cursor" @click="selectedElectricUuidFn_chaoyi(item)" style="max-width: 56px;text-align: center;border-right: 1px solid #EEEEEE;">
                      <icon-font class="selectStyle" v-if="selectedWaterIds.indexOf(item.deviceId)>-1" type="iconyumengtubiao_danxuan-yixuanze" />
                      <icon-font class="unSelectStyle" v-else type="iconyumengtubiao_danxuan-weixuanze" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="contFoot" >
                <a-pagination v-show="tableData_info.length>0" size="small" v-model="pagination_info.current" :total="pagination_info.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination_info.pageSize" showSizeChanger @change="onSizeChange_info" @showSizeChange="onShowSizeChange_info" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix" style="margin-top: 15px;">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelBind">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="bindWater">
            确定绑定
          </a-button>
        </div>
      </div>
      <!-- 去绑定页面 -->
      <a-modal destroyOnClose centered v-model="goToBindDialog" :footer="null" class="ownModalBorder" title="" @cancel="goToBindDialog=false;" width="520px">
        <go-bind-account :goToBindType="goToBindType" @goToBindAccount="goToBindAccount"></go-bind-account>
      </a-modal>
      <!-- 绑定账号 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="bindAccountDialog" class="ownModalBorder titDialog" title="绑定账号">
        <bind-account :brand="goToBindType" @addSuccess="addSuccess" @authSuccess="authSuccess" @cancelAdd="bindAccountCancel"></bind-account>
      </a-modal>
      <!-- 批量设置单价 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="batchSetOneDialog" class="ownModalBorder titDialog" title="批量设置表数统计方式/电费单价">
        <bind-batch-set-one :batchSetOneObj="batchSetOneObj" @cancelSet="cancelSetOne" @setSuccess="setSuccessOne"></bind-batch-set-one>
      </a-modal>
      <!-- 批量设置单价 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="batchSetTwoDialog" class="ownModalBorder titDialog" title="批量设置电费单价">
        <bind-batch-set-two :batchSetTwoObj="batchSetTwoObj" @cancelSet="cancelSetTwo" @setSuccess="setSuccessTwo"></bind-batch-set-two>
      </a-modal>
    </div>
  </div>
</template>

<script>
import * as API  from '@/api/smartDevices';
import DeptEmployeeTree from '@/components/DeptEmployeeTree';
import CityTownTree from '@/components/CityTownTree';
import GoBindAccount from '../lock/goBindAccount';
import BindAccount from '../account/bindAccount';
import BindBatchSetOne from './bindBatchSetOne';
import BindBatchSetTwo from './bindBatchSetTwo';
export default {
  name: "bindLock",
  components: {
    GoBindAccount,
    DeptEmployeeTree,
    CityTownTree,
    BindAccount,
    BindBatchSetOne,
    BindBatchSetTwo,
  },
  data(){
    return {
      authAccountList:[],
      sendData:{
        current:1,
        size:10,
        deptId:'',
        maintainerId:'',
        cityId:'',
        areaId:'',
        townId:'',
        fuzzyKeyword:'',
        fuzzyQueryType:0,
        houseType:undefined,
        deviceType:3,  //1：门锁；2：电表；3：水表
        meterType:1,
      },
      tableData:[],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,//每页中显示20条数据
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
      },
      sendData_info:{
        current:1,
        size:10,
        lastDataRowIndex:1,
        waterMeterType:'',
        authAccountId:'',
        fuzzyKeyword:'',
        cityName:'',
        areaName:'',
        houseName:'',
        houseAddress:'',
        deviceNo:'',
      },
      tableData_info:[],
      pagination_info: {
        total: 0,
        current: 1,
        pageSize: 10,//每页中显示20条数据
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
      },
      pageSizeOptions:[
        { key:10,name:'10条/页'},
        { key:20,name:'20条/页'},
        { key:50,name:'50条/页'},
        { key:100,name:'100条/页'},
      ],
      rightDataLoading:false,
      bindForm:{
        authAccountId:'',     //绑定的授权账号ID（非杂牌锁必传）
        brand:0,              //品牌（0：杂牌；1：云丁；2：果加）
        mixBrandWaterList:[], //杂牌电表绑定数据列表
        yundingWaterList:[],  //云丁
        meterType:1,          //1：冷水表；2：热水表；3：中水表
      },
      saveLoading:false,
      mixBrandWaterList:[],
      selectedWaterList:[],
      houseIdList:[],
      selectedWaterIds:[],
      goToBindDialog:false,
      goToBindType:1,         //1、云丁；2、果加；3、蜂电
      acceptPlat:{
        yunDing:false,
        chaoyi:false,
      },
      bindAccountDialog:false,
      mouseOverHouseId:'',
      batchSetOneDialog:false,
      batchSetOneObj:undefined,
      batchSetTwoDialog:false,
      batchSetTwoObj:undefined,
      syncInfoLoading:false,
    }
  },
  created() {
    this.authAccountListSimpleAll();
    this.listUnbindSmartDevice();
  },
  mounted() {
  },
  methods: {
    freshData(){
      let parameter = {
        id:this.bindForm.authAccountId,
      };
      this.syncInfoLoading = true;
      API.joyDeviceSync(parameter).then(res => {
        if(!res){
          this.syncInfoLoading = false;
        }
        if (res&&res.code === "200") {
          this.$message.success('同步成功');
          this.listPullWaterMeter();
          this.syncInfoLoading = false;
        }
        else{
          this.syncInfoLoading = false;
        }
      })
    },
    selectedElectricUuidFn_chaoyi(item){
      let pos = this.selectedWaterIds.indexOf(item.uuid);
      if(pos>-1){
        this.selectedWaterIds.splice(pos,1);
        let selectedWaterList = [];
        this.selectedWaterList.forEach((water)=>{
          if(water.uuid == item.uuid){
            this.tableData.forEach((house)=>{
              if(house.houseId == water.houseId){
                house.sn = '';
                house.uuid = '';
                house.clickSave = false;
                house.unitPrice = '';
                let housePos = this.houseIdList.indexOf(house.houseId);
                if(housePos>-1){
                  this.houseIdList.splice(housePos,1);
                }
              }
            });
          }
          else{
            selectedWaterList.push(water);
          }
        });
        this.selectedWaterList = selectedWaterList;
      }
      else{
        //检查数据是否完整
        let complete = false;
        this.selectedWaterList.forEach((water)=>{
          if(!water.uuid){
            complete = true;
          }
        });
        if(!complete){
          this.$message.warning('请先选择需要绑定水表的房源');
          return ;
        }
        this.selectedWaterList.forEach((water)=>{
          if(!water.uuid){
            if(this.bindForm.brand==4){
              water.fullAddress = item.fullAddress;
              water.deviceType = item.deviceType;
              water.productNo = item.productNo;
              water.uuid = item.uuid;
              water.deviceId = item.deviceId;
              water.sn = item.deviceNo;
            }
            this.selectedWaterIds.push(item.uuid);
            this.tableData.forEach((house)=>{
              if(house.houseId == water.houseId){
                house.sn = item.deviceNo;
                house.uuid = item.uuid;
                house.clickSave = true;
              }
            });
          }
        });
      }
    },
    selectedElectricUuidFn(item,temp){
      let pos = this.selectedWaterIds.indexOf(temp.uuid);
      if(pos>-1){
        this.selectedWaterIds.splice(pos,1);
        let selectedWaterList = [];
        this.selectedWaterList.forEach((water)=>{
          if(water.uuid == temp.uuid){
            this.tableData.forEach((house)=>{
              if(house.houseId == water.houseId){
                house.sn = '';
                house.uuid = '';
                house.clickSave = false;
                house.unitPrice = '';
                let housePos = this.houseIdList.indexOf(house.houseId);
                if(housePos>-1){
                  this.houseIdList.splice(housePos,1);
                }
              }
            });
          }
          else{
            selectedWaterList.push(water);
          }
        });
        this.selectedWaterList = selectedWaterList;
      }
      else{
        //检查数据是否完整
        let complete = false;
        this.selectedWaterList.forEach((water)=>{
          if(!water.uuid){
            complete = true;
          }
        });
        if(!complete){
          this.$message.warning('请先选择需要绑定水表的房源');
          return ;
        }
        this.selectedWaterList.forEach((water)=>{
          if(!water.uuid){
            if(this.bindForm.brand==1){
              water.houseAddress = item.houseAddress;
              water.deviceHousePid = item.houseId;
              water.deviceHouseId = temp.roomId;
              water.uuid = temp.uuid;
              water.sn = temp.sn;
            }
            this.selectedWaterIds.push(temp.uuid);
            this.tableData.forEach((house)=>{
              if(house.houseId == water.houseId){
                house.sn = temp.sn;
                house.uuid = temp.uuid;
                house.clickSave = true;
              }
            });
          }
        });
      }
    },
    changeMeterType(val){
      if(this.bindForm.meterType == val){
        return ;
      }
      this.bindForm.meterType = val;
      this.listUnbindSmartDevice();
      if(this.bindForm.brand!=0){
        this.listPullWaterMeter();
      }
    },
    listPullWaterMeter(){
      if(this.bindForm.brand==1){
        this.listPullYundingWaterMeter();
      }
      else if(this.bindForm.brand==4){
        this.listPullJoyWaterMeter();
      }
    },
    listPullJoyWaterMeter(){
      this.sendData_info.waterMeterType = this.bindForm.meterType;
      this.rightDataLoading = true;
      API.listPullJoyWaterMeter(this.sendData_info).then(res => {
        this.rightDataLoading = false;
        if (res&&res.code === "200") {
          this.tableData_info = res.data.records;
          this.tableData_info.forEach((item)=>{
            item.uuid = item.deviceId;
          });
          this.pagination_info.total = res.data.total;
          this.sendData_info.lastDataRowIndex = res.data.lastDataRowIndex;
        }
      })
    },
    listPullYundingWaterMeter(){
      this.sendData_info.waterMeterType = this.bindForm.meterType;
      this.rightDataLoading = true;
      API.listPullYundingWaterMeter(this.sendData_info).then(res => {
        this.rightDataLoading = false;
        if (res&&res.code === "200") {
          this.tableData_info = res.data.records;
          this.pagination_info.total = res.data.total;
          this.sendData_info.lastDataRowIndex = res.data.lastDataRowIndex;
        }
      })
    },
    setSelect(item){
      //选中，则移除；没选中则新增；
      if(this.houseIdList.indexOf(item.houseId)>-1){
        let pos = this.houseIdList.indexOf(item.houseId);
        this.houseIdList.splice(pos,1);
        //若有对应的智能门锁也应删除
        let uuid = '';
        let selectedWaterList = [];
        this.selectedWaterList.forEach((temp)=>{
          if(temp.houseId == item.houseId){
            uuid = temp.uuid;
            this.tableData.forEach((house)=>{
              if(house.houseId == item.houseId){
                house.clickSave = false;
                if(this.bindForm.brand == 1){
                  house.sn = '';
                }
                else if(this.bindForm.brand == 4){
                  house.sn = '';
                }
              }
            });
          }
          else{
            selectedWaterList.push(temp);
          }
        });
        this.selectedWaterList = selectedWaterList;
        if(uuid){
          let tempPos = this.selectedWaterIds.indexOf(uuid);
          if(tempPos>-1){
            this.selectedWaterIds.splice(tempPos,1);
          }
        }
      }
      else{
        //判断是否允许操作
        let flag = false;
        let fullAddress = '';
        let unitPrice = undefined;
        this.selectedWaterList.forEach(item=>{
          if(!item.uuid){
            flag = true;
            fullAddress = item.fullAddress;
          }
        });
        if(flag){
          this.$message.warning('请选择「' + fullAddress + '」绑定的水表');
          return ;
        }
        this.houseIdList.push(item.houseId);
        this.tableData.forEach((house)=>{
          if(house.houseId == item.houseId){
            if(item.unitPrice){
              unitPrice = item.unitPrice;
            }
          }
        });
        let obj ={
          houseId:item.houseId,
          fullAddress:item.fullAddress,
          unitPrice:unitPrice,
        };
        this.selectedWaterList.push(obj);
      }
      this.$forceUpdate();
    },
    setSuccessTwo(obj){
      this.batchSetTwoDialog = false;
      this.batchSetTwoObj = obj;
      this.tableData.forEach((item)=>{
        if(this.houseIdList.indexOf(item.houseId)>-1){
          item.unitPrice = this.batchSetTwoObj.unitPrice;
          if(item.unitPrice){
            item.clickSave = false;
          }
        }
      });
      this.selectedWaterList.forEach((item)=>{
        item.unitPrice = this.batchSetTwoObj.unitPrice;
      });
    },
    setSuccessOne(obj){
      this.batchSetOneDialog = false;
      this.batchSetOneObj = obj;
      let houseIdList = [];
      this.mixBrandWaterList.forEach((item)=>{
        houseIdList.push(item.houseId);
      });
      this.tableData.forEach((item)=>{
        item.billingMethod = this.batchSetOneObj.billingMethod;
        item.unitPrice = this.batchSetOneObj.unitPrice;
        let obj = {};
        obj.houseId = item.houseId;
        obj.billingMethod = this.batchSetOneObj.billingMethod;
        obj.unitPrice = this.batchSetOneObj.unitPrice;
        if(houseIdList.indexOf(item.houseId)==-1){
          this.mixBrandWaterList.push(obj);
        }
        else{
          this.mixBrandWaterList.forEach((item)=>{
            item.billingMethod = this.batchSetOneObj.billingMethod;
            item.unitPrice = this.batchSetOneObj.unitPrice;
          })
        }
      });
    },
    cancelSetTwo(){
      this.batchSetTwoDialog = false;
    },
    cancelSetOne(){
      this.batchSetOneDialog = false;
    },
    goBatchSetTwo(){
      this.batchSetTwoDialog = true;
    },
    goBatchSetOne(){
      this.batchSetOneDialog = true;
    },
    bindAccountCancel(){
      this.bindAccountDialog = false;
    },
    authSuccess(){
      this.bindAccountDialog = false;
      this.authAccountListSimpleAll();
    },
    addSuccess(){
      this.bindAccountDialog = false;
      this.authAccountListSimpleAll();
    },
    goToBindAccount(){
      this.goToBindDialog = false;
      this.bindAccountDialog = true;
    },
    goToAuth(val){
      this.goToBindDialog = true;
      this.goToBindType = val;
    },
    bindSuccess(){
      this.$emit('bindSuccess',this.bindForm.brand);
    },
    onShowSizeChange_pre(){
      if(!this.rightDataLoading){
        this.pagination_info.current = this.pagination_info.current-1;
        this.sendData_info.current = this.pagination_info.current;
        this.listPullWaterMeter();
      }
    },
    onShowSizeChange_next(){
      if(!this.rightDataLoading) {
        this.pagination_info.current = this.pagination_info.current + 1;
        this.sendData_info.current = this.pagination_info.current;
        this.listPullWaterMeter();
      }
    },
    onShowSizeChange_info(){
      if(!this.rightDataLoading) {
        this.pagination_info.current = this.pagination_info.current + 1;
        this.sendData_info.current = this.pagination_info.current;
        this.listPullWaterMeter();
      }
    },
    bindWater(){
      if(this.bindForm.brand == 0){
        //检查数据完整性
        let flag = this.checkMixBrandLockListFill();
        if(flag){
          this.$message.warning('请输入水费单价');
          return ;
        }
        //搜集绑锁数据
        this.changeMixBrandLockList();
        if(this.mixBrandWaterList.length==0){
          this.$message.warning('请至少填写一条数据');
          return ;
        }
        //构造数据
        let mixBrandWaterList = [];
        this.mixBrandWaterList.forEach((item)=>{
          let obj ={
            billingMethod:item.billingMethod,
            name:item.name,
            unitPrice:item.unitPrice,
            houseInfo:{
              houseId:item.houseId,
            },
          };
          mixBrandWaterList.push(obj);
        });
        let parameter ={
          authAccountId:'',
          brand:0,
          meterType:this.bindForm.meterType,
          yundingWaterMeterList:[],
          mixBrandWaterMeterList:mixBrandWaterList,
        };
        this.saveLoading = true;
        API.waterMeterBatchBind(parameter).then(res=>{
          if(!res){
            this.saveLoading = false;
          }
          if(res.code === '200'){
            this.saveLoading = false;
            this.$emit('bindComplete',res.data,0,'')
          }
          else{
            this.$message.error('绑表失败');
            this.saveLoading = false;
          }
        });
      }
      if(this.bindForm.brand == 1){
        if(this.selectedWaterList.length==0){
          this.$message.warning('请至少填写一条数据');
          return ;
        }
        let selectedWaterList = [];
        let compeleteFlag = false;
        this.selectedWaterList.forEach((item)=>{
          if(item.uuid&&!item.unitPrice){
            compeleteFlag = true;
          }
          if(item.uuid&&item.unitPrice){
            let obj = {};
            obj.uuid= item.uuid;
            obj.unitPrice= item.unitPrice;
            obj.houseInfo = {
              houseId:item.houseId,
              deviceHousePid:item.deviceHousePid,
              deviceHouseId:item.deviceHouseId,
            };
            selectedWaterList.push(obj);
          }
        });
        if(compeleteFlag){
          this.$message.warning('请完善水费单价');
          return ;
        }
        let parameter ={
          authAccountId:this.bindForm.authAccountId,
          brand:this.bindForm.brand,
          meterType:this.bindForm.meterType,
          yundingWaterMeterList:selectedWaterList,
          mixBrandWaterMeterList:[],
        };
        this.saveLoading = true;
        API.waterMeterBatchBind(parameter).then(res=>{
          if(!res){
            this.saveLoading = false;
          }
          if(res.code === '200'){
            this.saveLoading = false;
            this.$emit('bindComplete',res.data,1,this.bindForm.authAccountId)
          }
          else{
            this.$message.error('绑表失败');
            this.saveLoading = false;
          }
        });
      }
      if(this.bindForm.brand == 4){
        if(this.selectedWaterList.length==0){
          this.$message.warning('请至少填写一条数据');
          return ;
        }
        let selectedWaterList = [];
        let compeleteFlag = false;
        this.selectedWaterList.forEach((item)=>{
          if(item.uuid&&!item.unitPrice){
            compeleteFlag = true;
          }
          if(item.uuid&&item.unitPrice){
            let obj = {};
            obj.uuid= item.uuid;
            obj.unitPrice= item.unitPrice;
            obj.deviceType = item.deviceType;
            obj.productNo = item.productNo;
            obj.deviceId = item.deviceId; //必填
            obj.houseInfo = {
              houseId:item.houseId,
              deviceHousePid:item.deviceHousePid,
              deviceHouseId:item.deviceHouseId,
            };
            selectedWaterList.push(obj);
          }
        });
        if(compeleteFlag){
          this.$message.warning('请完善水费单价');
          return ;
        }
        let parameter ={
          authAccountId:this.bindForm.authAccountId,
          brand:this.bindForm.brand,
          meterType:this.bindForm.meterType,
          yundingWaterMeterList:[],
          mixBrandWaterMeterList:[],
          joyWaterMeterList:selectedWaterList,
        };
        this.saveLoading = true;
        API.waterMeterBatchBind(parameter).then(res=>{
          if(!res){
            this.saveLoading = false;
          }
          if(res.code === '200'){
            this.saveLoading = false;
            this.$emit('bindComplete',res.data,1,this.bindForm.authAccountId)
          }
          else{
            this.$message.error('绑表失败');
            this.saveLoading = false;
          }
        });
      }
    },
    cancelBind(){
      this.$emit('cancelBind');
    },
    clearSearchListUnboundWaterHouse(){
      this.$refs.selectDeptEmp.clearData();
      this.$refs.selectCityTown.clearData();
      this.initSearchConHouse();
      this.listUnbindSmartDevice();
    },
    getMustYunDingFill(index){
      //数据双向绑定，防止输入框不能修改
      this.$set(this.tableData, index, this.tableData[index]);
      this.tableData.forEach((item)=>{
        if(item.unitPrice||item.uuid){
          item.clickSave = true;
        }
        else{
          item.clickSave = false;
        }
      });
    },
    getMustFill_smart(index){
      //数据双向绑定，防止输入框不能修改
      this.$set(this.tableData, index, this.tableData[index]);
      this.tableData.forEach((item)=>{
        if(item.uuid){
          item.clickSave = true;
        }
        else{
          item.clickSave = false;
        }
        this.selectedWaterList.forEach((water)=>{
          if(water.houseId==item.houseId) {
            water.unitPrice = item.unitPrice;
          }
        });
      });
    },
    getMustFill(index){
      //数据双向绑定，防止输入框不能修改
      this.$set(this.tableData, index, this.tableData[index]);
      this.tableData.forEach((item)=>{
        if(item.unitPrice||item.name){
          item.clickSave = true;
        }
        else{
          item.clickSave = false;
        }
      });
    },
    cancelOtherTree(typeRef=[]){
      typeRef.forEach((name)=>{
        if (this.$refs[name]){
          this.$refs[name].showTree = false
        }
      })
    },
    selectCityTownChange(selectObj){
      this.sendData.cityId = selectObj.cityId;
      this.sendData.areaId = selectObj.areaId;
      this.sendData.townId = selectObj.townId;
      this.listUnbindSmartDevice();
    },
    selectCityTownChange_info(selectObj){
      if(selectObj.cityId&&!selectObj.areaId&&selectObj.name){
        this.sendData_info.cityName = selectObj.name;
      }
      if(selectObj.areaId&&selectObj.name){
        this.sendData_info.areaName = selectObj.name;
      }
      if(!selectObj.cityId&&!selectObj.areaId&&!selectObj.name){
        this.sendData_info.cityName = '';
        this.sendData_info.areaName = '';
      }
      this.listPullWaterMeter();
    },
    selectDept(selectObj){
      if (selectObj.type == 'dept') {
        this.sendData.deptId = selectObj.id;
        this.sendData.maintainerId = '';
      } else if (selectObj.type == 'employee') {
        this.sendData.deptId = '';
        this.sendData.maintainerId = selectObj.id;
      }
      else{
        this.sendData.deptId = '';
        this.sendData.maintainerId = '';
      }
      this.listUnbindSmartDevice();
    },
    changeOtherBrand(){
      if(this.bindForm.brand==0){
        return ;
      }
      //清空
      this.batchSetTwoObj = undefined;
      this.bindForm.brand = 0;
      //清空其他
      this.bindForm.authAccountId = '';
      //云丁信息清空
      this.selectedWaterList = [];
      this.houseIdList = [];
      this.selectedWaterIds = [];
      this.initSearchConHouse();
      this.listUnbindSmartDevice();
    },
    changeBrand(item){
      if(this.bindForm.brand == item.brand&&this.bindForm.authAccountId == item.id){
        //不用做任何改变
          return ;
      }
      if(item.brand == 2){
        this.$message.warning('即将上线，敬请期待');
        return ;
      }
      //清空普通门锁的设置
      this.batchSetOneObj = undefined;
      this.bindForm.brand = item.brand;
      this.bindForm.authAccountId = item.id;
      this.selectedWaterList = [];
      this.houseIdList = [];
      this.selectedWaterIds = [];
      //清空杂牌的数据
      this.mixBrandWaterList = [];
      //重置搜索条件
      this.initSearchConHouse();
      this.listUnbindSmartDevice();
      this.initSearchCon();
      this.sendData_info.authAccountId = item.id;
      this.sendData_info.waterMeterType = this.bindForm.meterType;
      this.tableData_info = [];
      this.listPullWaterMeter();
    },
    initSearchConHouse(){
      this.sendData = {
        current:1,
        size:10,
        deptId:'',
        maintainerId:'',
        cityId:'',
        areaId:'',
        townId:'',
        fuzzyKeyword:'',
        fuzzyQueryType:0,
        houseType:undefined,
        deviceType:3,  //1：门锁；2：电表；3：水表
        meterType:1,
      };
    },
    initSearchCon(){
      this.sendData_info = {
        current:1,
        size:10,
        lastDataRowIndex:1,
        waterMeterType:'',
        authAccountId:'',
        fuzzyKeyword:'',
        cityName:'',
        areaName:'',
        houseName:'',
        houseAddress:'',
        deviceNo:'',
      };
      this.pagination_info.current = 1;
      this.pagination_info.pageSize = 10;
    },
    checkMixBrandLockListFill(){
      let flag = false;
      this.tableData.forEach((item)=>{
        if(!item.unitPrice&&item.name){
          flag = true;
        }
      });
      return flag;
    },
    changeMixBrandLockList(){
      let houseIdList = [];
      this.mixBrandWaterList.forEach((item)=>{
        houseIdList.push(item.houseId);
      });
      this.tableData.forEach((item)=>{
        if(item.unitPrice){
          let obj = {
            houseId:item.houseId,
            unitPrice:item.unitPrice,
            name:item.name,
            billingMethod:item.billingMethod
          }
          let pos = houseIdList.indexOf(item.houseId);
          if(pos ==-1){
            this.mixBrandWaterList.push(obj)
          }
          else{
            this.mixBrandWaterList[pos] = obj;
          }
        }
      });
    },
    onSizeChange_info(current){
      this.sendData_info.current = current;
      this.pagination_info.current = current;
      this.listPullWaterMeter();
    },
    onSizeChange(current){
      //普通电表
      if(this.bindForm.brand==0){
        let flag = this.checkMixBrandLockListFill();
        if(flag){
          this.$message.warning('请输入必填项');
        }
        this.changeMixBrandLockList();
      }

      this.sendData.current = current;
      this.pagination.current = current;
      this.listUnbindSmartDevice();
    },
    onShowSizeChange(current, pageSize){
      //检查数据是否完整性
      //普通电表
      if(this.bindForm.brand==0){
        let flag = this.checkMixBrandLockListFill();
        if(flag){
          this.$message.warning('请输入必填项');
        }
        this.changeMixBrandLockList();
      }
      this.sendData.current = current;
      this.sendData.size = pageSize;
      this.pagination.pageSize = pageSize;
      this.pagination.current = current;
      this.listUnbindSmartDevice();
    },
    onSearch(){
      this.searchListUnboundWaterHouse();
    },
    listUnbindSmartDevice(){
      this.sendData.meterType = this.bindForm.meterType;
      API.listUnbindSmartDevice(this.sendData).then(res => {
        if (res&&res.code === "200") {
          this.tableData = res.data.records;
          this.tableData.forEach(function(element, index) {
            element.num = index + 1;
            element.clickSave = false;
            if(this.bindForm.brand==0){
              element.billingMethod = 1;
              if(this.batchSetOneObj&&this.batchSetOneObj.unitPrice){
                element.unitPrice = this.batchSetOneObj.unitPrice;
                element.billingMethod = this.batchSetOneObj.billingMethod;
                if(!element.billingMethod){
                  element.billingMethod = 1;
                }
              }
              this.mixBrandWaterList.forEach((item)=>{
                if(item.houseId==element.houseId){
                  element.unitPrice = item.unitPrice;
                  element.billingMethod = item.billingMethod;
                  element.name = item.name;
                }
              });
            }
            else if(this.bindForm.brand==1||this.bindForm.brand==4){
              if(this.batchSetTwoObj&&this.batchSetTwoObj.unitPrice){
                element.unitPrice = this.batchSetTwoObj.unitPrice;
              }
              let pos = this.houseIdList.indexOf(element.houseId);
              if(pos>-1){
                  this.selectedWaterList.forEach((selectedWater)=>{
                    if(selectedWater.houseId == element.houseId){
                      element.sn = selectedWater.sn;
                      element.unitPrice = selectedWater.unitPrice;
                    }
                  });
              }
            }
          }, this);
          this.pagination.total = res.data.total;
        }
      })
    },
    authAccountListSimpleAll(){
      API.authAccountListSimpleAll().then(res => {
        if (res&&res.code === "200") {
          this.authAccountList = [];
          res.data.forEach((item)=>{
            if(item.brand == 1){
              this.acceptPlat.yunDing = true;
              this.authAccountList.push(item)
            }
            else if(item.brand == 4){
              this.acceptPlat.chaoyi = true;
              this.authAccountList.push(item)
            }
          })
        }
      })
    },
  }
}
</script>

<style scoped lang="less">
  .bindWater-new-box{
    position: relative;
    .bindWater-type{
      position: absolute;
      height: 50px;
      line-height: 50px;
      top: -50px;
      left:575px;
      .normal{
        width: 70px;
        color: #777777;
        font-size: 16px;
        text-align: center;
      }
      .click{
        color: #0A87F8;
        border-bottom:1px solid #0A87F8;
      }
    }
    .bindWater-box{
      padding: 0 20px 20px 20px;
      max-height: calc(100vh - 130px);
      overflow-y: auto;
      .title{
        font-size: 14px;
        color: #111111;
        font-weight: 500;
      }
      .bindWater-box-top{
        margin-top: 16.5px;
      }
      .bindWater-box-accounts{
        padding: 11px 0 10px 0;
        border-bottom: 8px solid #F6F7F8;
        .itemStyle{
          width: 180px;
          height: 50px;
          border-radius: 5px;
          margin:0 10px 10px 0;
          padding: 7px 0px 7px 10px;
          position: relative;
          .triangle-top-right-choose {
            position: absolute;
            color: #FFFFFF;
            top: 2px;
            right: 2px;
          }
          .triangle-top-right-click {
            position: absolute;
            width: 0;
            border: 16px solid #0A87F8;
            border-bottom: 16px solid transparent;
            border-left: 16px solid transparent;
            border-top-right-radius: 4px;
            top: 0px;
            right: -1px;
          }
          .svgStyle{
            width: 34px;
            height: 34px;
            padding: 6px;
            svg{
              width: 22px;
              height: 22px;
              color: #ffffff;
            }
          }
          .otherStyle{
            background: #23AFFA;
            border-radius: 6px;
          }
          .yunDingStyle{
            background: #14AEB8;
            border-radius: 6px;
          }
          .guoJiaStyle{
            background: #424242;
            border-radius: 6px;
          }
          .fengDianStyle{
            background:#1EA7BB;
            border-radius: 6px;
          }
          .chaoyi{
            background:#13c2c2;
            border-radius: 6px;
          }
          .unHaveStyle{
            background: #999999;
            border-radius: 6px;
          }
          svg{
            width: 15px;
            height: 15px;
            color: #ffffff;
          }
        }
        .unClickStyle{
          border: 1px solid #DDDDDD;
          background: #FFFFFF;
        }
        .clickStyle{
          box-shadow: 0px 2px 8px 0px rgba(2, 19, 34, 0.1);
          border: 1px solid #0A87F8;
          background: #F5FAFF;
        }
        .bindStyle{
          border: 1px solid #0A87F8;
          color: #0A87F8;
          text-align: center;
          line-height: 50px;
          padding: 0px !important;
          font-weight: 500;
          svg{
            width: 14px;
            height: 14px;
            color: #0A87F8 !important;
          }
        }
      }
      .set_info {
        margin-bottom: 6px;
        .searchStyle{
          /deep/ .ant-input{
            border-radius:4px !important;
          }
        }
        .searchButtonStyle{
          width: 34px;
          height: 34px;
          background: #0A87F8;
          border-radius: 4px;
          svg{
            margin: 7px;
            width: 20px;
            height: 20px;
            color: #ffffff;
          }
        }
        .clearStyle{
          width: 42px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          background: #EEEEEE;
          border-radius: 4px;
          border: 1px solid #DDDDDD;
          color: #111111;
          font-size: 13px;
        }
        .selectItem1{
          margin:0px 10px 0 0px;
        }
        .selectItem2{
          margin:0px 6px 0 0px;
        }
        .selectItem {

          & > .titleTip1 {
            border: 1px solid @borderColor;
            border-right:0px;
            background: @bigBackgroundColor;
            font-size: 13px;
            color: #777777;
            border-radius:4px 0 0 4px;
            height: 34px;
            line-height: 34px;
            text-align: center;
          }
          .titleTip1With1{
            width: 69px;
          }
          .titleTip1With2{
            width: 62px;
          }
          .titleTip1With3{
            width: 46px;
          }
          & > .titleTip2 {
            border: 1px solid @borderColor;
            border-right:0px;
            background: @bigBackgroundColor;
            font-size: 14px;
            color: @mainFontColor;
            border-radius:4px 0 0 4px;
            width: 50px;
            height: 34px;
            line-height: 34px;
            text-align: center;
          }
          /deep/ .ant-select-selection{
            border-radius:0 4px 4px 0
          }
          /deep/ .ant-select-selection__rendered{
            height: 34px;
            line-height: 34px;
          }
          /deep/ .ant-select-selection--single{
            height: 34px;
            line-height: 34px;
          }
          /deep/ .ant-input{
            border-radius:0 4px 4px 0;
            height: 34px;
            line-height: 34px;
            border: 1px solid #DDDDDD;
            padding-left: 8px;
          }
          /deep/ .tree-wrap .tree{
            width: 400px;
            top:34px !important;
          }
          /deep/ svg{
            color: #0A87F8;
            width: 14px;
            height: 14px;
          }
        }
        .cityTree{
          /deep/ .tree-wrap .tree .content{
            border-top: 1px solid #DDDDDD;
          }
        }
      }
      .basicsInfo{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .table{
          width: 100%;
          border-left: 1px solid #EEEEEE;
          border-top: 1px solid #EEEEEE;
          font-size: 12px;
          border-radius: 4px;
          .table-title{
            width: 100%;
            display: flex;
            background: #F7F8FB;
            color: #777777;
            font-size: 13px;
            border-radius: 4px 4px 0px 0px;
            & > div {
              flex: 1;
              height: 40px;
              line-height: 40px;
              border-right: 1px solid #EEEEEE;
              border-bottom: 1px solid #EEEEEE;
            }
          }
          .house-no-data{
            border-radius: 0px 0px 4px 4px;
            border-right: 1px solid #EEEEEE;
            border-bottom: 1px solid #EEEEEE;
            background-color: #ffffff;
          }
          .house-data {
            display: flex;
            color: #111111;
            font-size: 13px;
            border-radius: 0px 0px 4px 4px;
            & > div {
              flex: 1;
              height: 40px;
              line-height: 40px;
              text-align: left;
              border-right: 1px solid #EEEEEE;
              border-bottom: 1px solid #EEEEEE;
              background-color: #ffffff;
            }
            .houseAddress{
              height:20px;
              border-radius:2px;
              color: #0A87F8;
              background-color: #f0f8ff;
              font-size: 12px;
              text-align: center;
              padding: 5px 5px;
              margin-right: 5px;
            }
            /deep/ .ant-input{
              height: 38px;
              line-height: 38px;
            }
            .borderRed{
              border: 1px solid red !important;
            }
            .mustStyle{
              input::-webkit-input-placeholder {
                color: #FB4246;
              }

              input:-moz-placeholder {
                color: #FB4246;
              }

              input::-moz-placeholder {
                color: #FB4246;
              }

              input::-ms-input-placeholder {
                color: #FB4246;
              }
            }
            .priceStyle2{
              /deep/ .ant-input{
                padding-left: 0px;
              }
            }
            .priceStyle{
              .splitStyle{
                margin: 12px 7px 0 0;
                height: 14px;
                border-right: 1px solid #EEEEEE;
              }
              /deep/ .ant-input{
                padding-left: 5px;
              }
              /deep/ .ant-select-selection{
                background-color:transparent
              }
              /deep/ .ant-select-selection__rendered{
                margin-left: 4px;
                margin-right: 0px;
              }
              /deep/ .ant-select-selection-selected-value{
                padding-right: 0px;
              }
              /deep/ i{
                vertical-align: 0em;
              }
            }
          }
        }
      }
      .smartDeviceStyle{
        .yunDingElectricList-box{
          max-height: calc(100vh - 330px);
          overflow-y: auto;
          .house_info{
            height: 40px;
            line-height: 40px;
            background: #E9F1FF;
            opacity: 0.99;
            color: #777777;
            font-size: 14px;
            padding-left: 20px;
          }
          .detail_info{
            .set_info {
              margin-bottom: 6px;
              .searchButtonStyle{
                width: 34px;
                height: 34px;
                background: #0A87F8;
                border-radius: 4px;
                svg{
                  margin: 7px;
                  width: 20px;
                  height: 20px;
                  color: #ffffff;
                }
              }
              .clearStyle{
                width: 42px;
                height: 34px;
                line-height: 34px;
                text-align: center;
                background: #EEEEEE;
                border-radius: 4px;
                border: 1px solid #DDDDDD;
                color: #111111;
                font-size: 13px;
              }
              .selectItem {
                margin:0px 6px 0 0px;
                & > .titleTip1 {
                  border: 1px solid @borderColor;
                  border-right:0px;
                  background: @bigBackgroundColor;
                  font-size: 13px;
                  color: #777777;
                  border-radius:4px 0 0 4px;
                  height: 34px;
                  line-height: 34px;
                  text-align: center;
                }
                .titleTip1With1{
                  width: 66px;
                }
                .titleTip1With2{
                  width: 60px;
                }
                .titleTip1With3{
                  width: 52px;
                }
                & > .titleTip2 {
                  border: 1px solid @borderColor;
                  border-right:0px;
                  background: @bigBackgroundColor;
                  font-size: 14px;
                  color: @mainFontColor;
                  border-radius:4px 0 0 4px;
                  width: 50px;
                  height: 34px;
                  line-height: 34px;
                  text-align: center;
                }
                /deep/ .ant-select-selection{
                  border-radius:0 4px 4px 0
                }
                /deep/ .ant-select-selection__rendered{
                  height: 34px;
                  line-height: 34px;
                }
                /deep/ .ant-select-selection--single{
                  height: 34px;
                  line-height: 34px;
                }
                /deep/ .ant-input{
                  border-radius:0 4px 4px 0;
                  height: 34px;
                  line-height: 34px;
                  border: 1px solid #DDDDDD;
                  padding-left: 8px;
                }
                /deep/ .tree-wrap .tree{
                  width: 250px;
                  top:34px !important;
                }
              }
              .cityTree{
                /deep/ .tree-wrap .tree .content{
                  border-top: 1px solid #DDDDDD;
                }
              }
            }
            .electricList_info{
              min-height: 400px;
              .basicsInfo{
                width: 100%;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                .table{
                  border-left: 1px solid #EEEEEE;
                  border-top: 1px solid #EEEEEE;
                  font-size: 12px;
                  border-radius: 4px;
                  .table-title{
                    display: flex;
                    background: #F7F8FB;
                    color: #777777;
                    font-size: 13px;
                    border-radius: 4px 4px 0px 0px;
                    & > div {
                      flex: 1;
                      height: 40px;
                      line-height: 40px;
                      border-right: 1px solid #EEEEEE;
                      border-bottom: 1px solid #EEEEEE;
                    }
                  }
                  .house-no-data{
                    border-radius: 0px 0px 4px 4px;
                    border-right: 1px solid #EEEEEE;
                    border-bottom: 1px solid #EEEEEE;
                    background-color: #ffffff;
                  }
                  .house-data {
                    display: flex;
                    color: #111111;
                    font-size: 13px;
                    border-radius: 0px 0px 4px 4px;
                    .selectStyle{
                      color: #0A87F8;
                    }
                    .unSelectStyle{
                      color:#777777;
                    }
                    & > div {
                      flex: 1;
                      height: 40px;
                      line-height: 40px;
                      text-align: left;
                      border-right: 1px solid #EEEEEE;
                      border-bottom: 1px solid #EEEEEE;
                      background-color: #ffffff;
                    }
                    & > div:last-child{
                      border-right:none;
                    }
                    .item {
                      flex: 1;
                      text-align: left;
                      background-color: #ffffff;
                      .itemDetail{
                        display: flex;
                        .checkStyle{
                          svg{
                            width: 16px;
                            height: 16px;
                          }
                        }
                        & > div {
                          flex: 1;
                          height: 40px;
                          line-height: 40px;
                          border-bottom: 1px solid #EEEEEE;
                          border-right: 1px solid #EEEEEE;
                        }
                        & > div:last-child {
                          border-right: none;
                        }
                      }
                    }
                    .houseAddress{
                      height:20px;
                      border-radius:2px;
                      color: #0A87F8;
                      background-color: #f0f8ff;
                      font-size: 12px;
                      text-align: center;
                      padding: 5px 5px;
                      margin-right: 5px;
                    }
                    /deep/ .ant-input{
                      height: 38px;
                      line-height: 38px;
                      padding-left: 14px;
                    }
                    .borderRed{
                      border: 1px solid red !important;
                    }
                    .mustStyle{
                      input::-webkit-input-placeholder {
                        color: #FB4246;
                      }

                      input:-moz-placeholder {
                        color: #FB4246;
                      }

                      input::-moz-placeholder {
                        color: #FB4246;
                      }

                      input::-ms-input-placeholder {
                        color: #FB4246;
                      }
                    }
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
                margin-right: 20px; // position: absolute;
                background-color: #fff;
              }
            }
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
        margin-right: 20px; // position: absolute;
        background-color: #fff;
      }
      .warningStyle{
        height: 40px;
        line-height: 40px;
        svg{
          width: 15px;
          height: 15px;
        }
      }
      .buttonDiv {
        .formItemMarginButton {
          width: 120px;
          height: 40px;
          margin-left: 18px;
        }
        .cancelFont {
          color: #666666;
        }
        .saveFont {
          color: #FFFFFF;
          background-color: #0A87F8;
        }
      }
      /deep/ .ant-pagination-options-size-changer.ant-select{
        margin-right: 0px;
      }
      /deep/ .ant-input-affix-wrapper .ant-input:not(:last-child){
        padding-right: 0px;
      }
    }
    @-webkit-keyframes changeright{
      0%{-webkit-transform:rotate(0deg);}
      50%{-webkit-transform:rotate(-180deg);}
      100%{-webkit-transform:rotate(-360deg);}
    }
    .imgrotate_common{
      -webkit-animation:changeright 3s linear infinite;
    }
    /deep/ ::-webkit-scrollbar{
      width: 2px;
    }
  }
</style>