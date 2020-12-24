import { axios } from '@/utils/request'

// 门锁授权账号绑定
export function lockAuthAccountBind(data) {
  return axios({
    url: '/pc2b/sd/auth_account/bind',
    data: data,
    method: 'post'
  });
}
// 门锁授权账号编辑
export function lockAuthAccountEdit(data) {
  return axios({
    url: '/pc2b/sd/auth_account/edit',
    data: data,
    method: 'post'
  });
}
// 门锁授权账号分页列表
export function lockAuthAccountList(data) {
  return axios({
    url: '/pc2b/sd/auth_account/list',
    data: data,
    method: 'post'
  });
}
// 门锁授权账号解绑
export function lockAuthAccountUnBind(data) {
  return axios({
    url: '/pc2b/sd/auth_account/un_bind',
    data: data,
    method: 'post'
  });
}
// 门锁授权账号查看
export function lockAuthAccountView(data) {
  return axios({
    url: '/pc2b/sd/auth_account/view',
    data: data,
    method: 'post'
  });
}
// 获取云丁授权地址
export function yudingGetAuthUrl() {
  return axios({
    url: '/pc2b/sd/yunding/get_auth_url',
    method: 'get'
  });
}
// 获取所有授权账号简单信息列表
export function authAccountListSimpleAll() {
  return axios({
    url: '/pc2b/sd/auth_account/list_simple_all',
    method: 'get'
  });
}

//门锁管理
//门锁列表统计
export function doorLockListStat(data) {
  return axios({
    url: '/pc2b/sd/door_lock/list_stat',
    data: data,
    method: 'post'
  });
}
//门锁分页列表
export function doorLockList(data) {
  return axios({
    url: '/pc2b/sd/door_lock/list',
    data: data,
    method: 'post'
  });
}
//未绑定门锁房源分页列表
export function listUnboundDoorLock(data) {
  return axios({
    url: '/pc2b/house_pub/list_unbound_door_lock',
    data: data,
    method: 'post'
  });
}
//门锁单个绑定
export function doorLockSingleBind(data) {
  return axios({
    url: '/pc2b/sd/door_lock/single_bind',
    data: data,
    method: 'post'
  });
}
//门锁批量绑定
export function doorLockBatchBind(data) {
  return axios({
    url: '/pc2b/sd/door_lock/batch_bind',
    data: data,
    method: 'post'
  });
}
//拉取云丁门锁分页列表
export function listPullYundingLock(data) {
  return axios({
    url: '/pc2b/sd/door_lock/list_pull_yunding_lock',
    data: data,
    method: 'post'
  });
}
//拉取果加门锁分页列表
export function listPullGuojiaLock(data) {
  return axios({
    url: '/pc2b/sd/door_lock/list_pull_guojia_lock',
    data: data,
    method: 'post'
  });
}
//门锁解除绑定
export function doorLockUnbind(data) {
  return axios({
    url: '/pc2b/sd/door_lock/unbind',
    data: data,
    method: 'post'
  });
}
//门锁批量解除绑定
export function doorLockBatchUnbind(data) {
  return axios({
    url: '/pc2b/sd/door_lock/batch_unbind',
    data: data,
    method: 'post'
  });
}
//新增门锁密码授权
export function doorLockPwdAuthAdd(data) {
  return axios({
    url: '/pc2b/sd/door_lock/pwd_auth/add',
    data: data,
    method: 'post'
  });
}
//查看详情
export function doorLockView(data) {
  return axios({
    url: '/pc2b/sd/door_lock/view',
    data: data,
    method: 'post'
  });
}
//同步门锁信息
export function doorLockSyncInfo(data) {
  return axios({
    url: '/pc2b/sd/door_lock/sync_info',
    data: data,
    method: 'post'
  });
}
//门锁临时密码获取
export function doorLockGetTempPwd(data) {
  return axios({
    url: '/pc2b/sd/door_lock/get_temp_pwd',
    data: data,
    method: 'post'
  });
}
//普通门锁密码获取
export function doorLockPwdView(data) {
  return axios({
    url: '/pc2b/sd/door_lock/pwd_view',
    data: data,
    method: 'post'
  });
}
//普通门锁密码修改
export function doorLockPwdEdit(data) {
  return axios({
    url: '/pc2b/sd/door_lock/pwd_edit',
    data: data,
    method: 'post'
  });
}
//门锁授权密码分页列表
export function pwdAuthList(data) {
  return axios({
    url: '/pc2b/sd/door_lock/pwd_auth/list',
    data: data,
    method: 'post'
  });
}
//门锁授权密码列表统计
export function pwdAuthListStat(data) {
  return axios({
    url: '/pc2b/sd/door_lock/pwd_auth/list_stat',
    data: data,
    method: 'post'
  });
}
//门锁开锁记录分页列表
export function listUnlockRecord(data) {
  return axios({
    url: '/pc2b/sd/door_lock/list_unlock_record',
    data: data,
    method: 'post'
  });
}
//删除门锁密码授权
export function pwdAuthRemove(data) {
  return axios({
    url: '/pc2b/sd/door_lock/pwd_auth/remove',
    data: data,
    method: 'post'
  });
}
//冻结门锁密码授权
export function pwdAuthFrozen(data) {
  return axios({
    url: '/pc2b/sd/door_lock/pwd_auth/frozen',
    data: data,
    method: 'post'
  });
}
//冻结门锁密码授权
export function pwdAuthUnfrozen(data) {
  return axios({
    url: '/pc2b/sd/door_lock/pwd_auth/unfrozen',
    data: data,
    method: 'post'
  });
}
//房源门锁列表
export function listHousedoorLock(data) {
  return axios({
    url: '/pc2b/house_decentralized/list_house_door_lock',
    data: data,
    method: 'post'
  });
}

///电表相关
//电表列表统计
export function electricMeterListStat(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/list_stat',
    data: data,
    method: 'post'
  });
}
//电表分页列表
export function electricMeterList(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/list',
    data: data,
    method: 'post'
  });
}
//未绑定智能设备房源
export function listUnbindSmartDevice(data) {
  return axios({
    url: '/pc2b/house_pub/list_unbind_smart_device',
    data: data,
    method: 'post'
  });
}
//批量绑定电表
export function electricMeterBatchBind(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/batch_bind',
    data: data,
    method: 'post'
  });
}
//单个绑定电表
export function electricMeterSingleBind(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/single_bind',
    data: data,
    method: 'post'
  });
}
//拉取所有云丁电表
export function listPullYundingElectricMeter(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/list_pull_yunding_electric_meter',
    data: data,
    method: 'post'
  });
}
//电表解除绑定
export function electricMeterUnbind(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/unbind',
    data: data,
    method: 'post'
  });
}
//电表批量解除绑定
export function batchUnbind(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/batch_unbind',
    data: data,
    method: 'post'
  });
}
//电表单价设置
export function electricMeterUnitPriceset(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/unit_price_set',
    data: data,
    method: 'post'
  });
}
//电表充电
export function electricMeterChargeAmount(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/charge/charge_amount',
    data: data,
    method: 'post'
  });
}
//电表透支额度设置
export function electricMeterOverdraftSet(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/overdraft_set',
    data: data,
    method: 'post'
  });
}
//电表透支额度设置
export function overdraftBatchSet(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/overdraft_batch_set',
    data: data,
    method: 'post'
  });
}
//电表付费模式设置
export function electricMeterPaymentModeSet(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/payment_mode_set',
    data: data,
    method: 'post'
  });
}
//电表清零
export function electricMeterClearing(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/clearing',
    data: data,
    method: 'post'
  });
}
//电表断电
export function electricMeterPowerOff(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/power_off',
    data: data,
    method: 'post'
  });
}
//电表供电
export function electricMeterPowerOn(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/power_on',
    data: data,
    method: 'post'
  });
}
//电表手动抄表
export function electricMeterManualReading(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/manual_reading',
    data: data,
    method: 'post'
  });
}
//电表查看
export function electricMeterView(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/view',
    data: data,
    method: 'post'
  });
}
//同步电表信息
export function electricMeterSyncInfo(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/sync_info',
    data: data,
    method: 'post'
  });
}
//获取异步操作���果
export function electricMeterOperationResult(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/get_operation_result',
    data: data,
    method: 'post'
  });
}
//电表修改日志分页列表
export function modifyLogList(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/modify_log/list',
    data: data,
    method: 'post'
  });
}
//电表抄表记录分页列表
export function readRecordList(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/read_record/list',
    data: data,
    method: 'post'
  });
}
//电表充值分页列表
export function chargeList(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/charge/list',
    data: data,
    method: 'post'
  });
}
//电表抄表记录删除
export function readRecordRemove(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/read_record/remove',
    data: data,
    method: 'post'
  });
}
//电表充电计算
export function getChargeCalc(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/charge/get_charge_calc',
    data: data,
    method: 'post'
  });
}
//生产账单（1、充值电量；2、抄表）
export function readRecordGenBill(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/read_record/gen_bill',
    data: data,
    method: 'post'
  });
}
//获取房源电表简单信息列表
export function listHouseElectricMeterSimple(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/list_house_electric_meter_simple',
    data: data,
    method: 'post'
  });
}

//拉取所有蜂电电表
export function listPullPowerbeeElectricMeter(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/list_pull_powerbee_electric_meter',
    data: data,
    method: 'post'
  });
}
//刷新蜂电(--暂未使用，已有新方法替换)
export function powerbeeElectricMeterHouseRefresh(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/powerbee_electric_meter_house_refresh',
    data: data,
    method: 'post'
  });
}
export function powerbeeDeviceSync(data) {
  return axios({
    url: '/pc2b/sd/powerbee/device_sync',
    data: data,
    method: 'post'
  });
}
//刷新蜂电(new)
//拉取所有超仪电表
export function listPullJoyElectricMeter(data) {
  return axios({
    url: '/pc2b/sd/electric_meter/list_pull_joy_electric_meter',
    data: data,
    method: 'post'
  });
}
//获取房间在租租客信息
export function getHouseCurrentRenterInfo(data) {
  return axios({
    url: '/pc2b/house_pub/get_house_current_renter_info',
    data: data,
    method: 'post'
  });
}
//获取所有房间在租租客信息
export function listHouseCurrentRenterInfoByHousePid(data) {
  return axios({
    url: '/pc2b/house_pub/list_house_current_renter_info_by_house_pid',
    data: data,
    method: 'post'
  });
}
//---------------------水表相关-------------------------
//水表分页列表
export function waterMeterList(data) {
  return axios({
    url: '/pc2b/sd/water_meter/list',
    data: data,
    method: 'post'
  });
}
//水表列表统计
export function waterMeterListStat(data) {
  return axios({
    url: '/pc2b/sd/water_meter/list_stat',
    data: data,
    method: 'post'
  });
}
//水表查看
export function waterMeterView(data) {
  return axios({
    url: '/pc2b/sd/water_meter/view',
    data: data,
    method: 'post'
  });
}
//水表批量解除绑定
export function waterMeterBatchUnbind(data) {
  return axios({
    url: '/pc2b/sd/water_meter/batch_unbind',
    data: data,
    method: 'post'
  });
}
//水表解除绑定
export function waterMeterUnbind(data) {
  return axios({
    url: '/pc2b/sd/water_meter/unbind',
    data: data,
    method: 'post'
  });
}
//拉取云丁水表分页列表
export function listPullYundingWaterMeter(data) {
  return axios({
    url: '/pc2b/sd/water_meter/list_pull_yunding_water_meter',
    data: data,
    method: 'post'
  });
}
//水表批量绑定
export function waterMeterBatchBind(data) {
  return axios({
    url: '/pc2b/sd/water_meter/batch_bind',
    data: data,
    method: 'post'
  });
}
//水表单个绑定
export function waterMeterBind(data) {
  return axios({
    url: '/pc2b/sd/water_meter/bind',
    data: data,
    method: 'post'
  });
}
//获取房源水表简单信息列表
export function listHouseWaterMeterSimple(data) {
  return axios({
    url: '/pc2b/sd/water_meter/list_house_water_meter_simple',
    data: data,
    method: 'post'
  });
}
//水表透支额度批量设置
export function waterMeterOverdraftBatchSet(data) {
  return axios({
    url: '/pc2b/sd/water_meter/overdraft_batch_set',
    data: data,
    method: 'post'
  });
}
//水表透支额度批量设置
export function waterMeterOverdraftSet(data) {
  return axios({
    url: '/pc2b/sd/water_meter/overdraft_set',
    data: data,
    method: 'post'
  });
}
//水表单价设置
export function waterMeterUnitPriceset(data) {
  return axios({
    url: '/pc2b/sd/water_meter/unit_price_set',
    data: data,
    method: 'post'
  });
}
//水表付费模式设置
export function waterMeterPaymentModeSet(data) {
  return axios({
    url: '/pc2b/sd/water_meter/payment_mode_set',
    data: data,
    method: 'post'
  });
}
//水表手动抄表
export function waterMeterManualReading(data) {
  return axios({
    url: '/pc2b/sd/water_meter/manual_reading',
    data: data,
    method: 'post'
  });
}
//水表抄表记录分页列表
export function waterMeterReadRecordList(data) {
  return axios({
    url: '/pc2b/sd/water_meter/read_record/list',
    data: data,
    method: 'post'
  });
}
//水表抄表记录删除
export function waterMeterReadRecordRemove(data) {
  return axios({
    url: '/pc2b/sd/water_meter/read_record/remove',
    data: data,
    method: 'post'
  });
}
//电表修改日志分页列表
export function waterMeterModifyLogList(data) {
  return axios({
    url: '/pc2b/sd/water_meter/modify_log/list',
    data: data,
    method: 'post'
  });
}
//水表充值分页列表
export function waterMeterChargeList(data) {
  return axios({
    url: '/pc2b/sd/water_meter/charge/list',
    data: data,
    method: 'post'
  });
}
//生产账单（1、充值电量；2、抄表）
export function waterMeterReadRecordGenBill(data) {
  return axios({
    url: '/pc2b/sd/water_meter/read_record/gen_bill',
    data: data,
    method: 'post'
  });
}
//拉取超仪水表分页列表
export function listPullJoyWaterMeter(data) {
  return axios({
    url: '/pc2b/sd/water_meter/list_pull_joy_water_meter',
    data: data,
    method: 'post'
  });
}
//刷新超仪
export function joyDeviceSync(data) {
  return axios({
    url: '/pc2b/sd/joy/device_sync',
    data: data,
    method: 'post'
  });
}
//水表断水
export function waterMeterPowerOff(data) {
  return axios({
    url: '/pc2b/sd/water_meter/power_off',
    data: data,
    method: 'post'
  });
}
//水表断水
export function waterMeterPowerOn(data) {
  return axios({
    url: '/pc2b/sd/water_meter/power_on',
    data: data,
    method: 'post'
  });
}
//同步水表信息
export function waterMeterSyncInfo(data) {
  return axios({
    url: '/pc2b/sd/water_meter/sync_info',
    data: data,
    method: 'post'
  });
}
//水表充电
export function waterMeterChargeAmount(data) {
  return axios({
    url: '/pc2b/sd/water_meter/charge/charge_amount',
    data: data,
    method: 'post'
  });
}