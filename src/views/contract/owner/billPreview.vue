<template>
  <div>
    <a-modal v-model="ownDialog.show" centered :footer="null" class="ownModalBorder titDialog" :width="ownDialog.width" :title="ownDialog.title" @cancel="closeThis" centered>
      <div class="bill-preview">
        <div class="content-row">
          <div class="bill-item">
            <div class="bill-detail">
              <div class="bill-title" style="font-size: 14px;">
                <div style="max-width: 130px">期数</div>
                <div :style="showPaymentFlag?'max-width: 136px':'max-width: 157px'">账单总额（元）</div>
                <div :style="showPaymentFlag?'max-width: 191px':'max-width: 212px'">账单日期</div>
                <div :style="showPaymentFlag?'max-width: 233px':'max-width: 254px'">账单周期</div>
                <div :style="showPaymentFlag?'max-width: 185px':'max-width: 207px'">操作</div>
                <div style="max-width: 85px" v-if="showPaymentFlag">已付账单</div>
              </div>
              <div v-for="(bills,index) in list" v-if="list.length>0" :key="index">
                <div class="bill-name">
                  <span class="bill-name-span">{{bills.name}}</span>
                  <span class="checkbox-box" v-if="showPaymentFlag">
                    <a-checkbox v-model="bills.checked" @change="checkedAll(bills)"></a-checkbox>
                  </span>
                </div>
                <div class="bill-data u-no-border" v-for="(bill,index2) in bills.bills" :key="index2">
                  <div class="f-clearfix" style="display: flex;">
                    <div @click="showFinaceFu(index2,index)" class="bill-content-list cursor" :style="showPaymentFlag?'width: calc(100% - 84px);':'width:100%;'">
                      <div style="max-width: 130px">
                        第{{bill.num}}期
                      </div>
                      <div :style="showPaymentFlag?'max-width: 136px':'max-width: 157px'">
                        {{bill.totalAmount.toFixed(2)}}
                      </div>
                      <div :style="showPaymentFlag?'max-width: 191px':'max-width: 212px'">
                        {{bill.billDate | formatTime}}
                      </div>
                      <div class="options f-clearfix" :style="showPaymentFlag?'max-width: 233px':'max-width: 254px'">
                        {{bill.beginDate | formatTime}}~{{bill.endDate | formatTime}}
                      </div>
                      <div style="color:#0A87F8" :style="showPaymentFlag?'max-width: 185px':'max-width: 207px'" class="cursor">查看明细</div>
                    </div>
                    <div style="width: 85px;" class="left-check" v-if="showPaymentFlag">
                      <a-checkbox v-model="bill.checked" @change.stop="checkItem($event,index,index2)"></a-checkbox>
                    </div>
                  </div>
                  <div v-if="haveShowFinaceIndex(index2+''+index)" class="inputBor">
                    <div class="bill-title child-box">
                      <div style="max-width: 110px">收支类型</div>
                      <div style="max-width: 136px">费用类型</div>
                      <div style="max-width: 191px">账单金额（元）</div>
                      <div style="max-width: 233px">收/付款日期</div>
                      <div style="max-width: 185px;">费用周期</div>
                    </div>
                    <div class="bill-data child-data u-no-border" v-for="(finance,index3) in bill.billDetails" :key="index3">
                      <div style="max-width: 110px">
                        {{finance.feeDirection==1?'收':'支'}}
                      </div>
                      <div style="max-width: 136px">
                        {{finance.feeSubjectName}}
                      </div>
                      <div style="max-width: 191px">
                        <div class="u-bottom-border">
                            <a-input v-validate="'money'" style="height: 32px" @input.native="priceReg" :disabled="finance.unchangeable==1" @blur="setSameAmount(index,index2,index3,finance)" v-model="finance.amount" @keyup.native="changeAmount(finance,bill)"></a-input>
                        </div>
                      </div>
                      <div style="max-width: 233px">
                        {{finance.payDate | formatTime}}
                      </div>
                      <div style="max-width: 185px">
                        {{finance.beginDate | formatTime}}~{{finance.endDate | formatTime}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="list.length==0" style="border-right: 1px solid #dddddd;border-bottom: 1px solid #dddddd;">
                <div style="padding:30px 0 0 0;width: 100%;">
                  <img src="../../../assets/login/no-collect.png" style="margin:0 100px;height:95px;width:102px;">
                </div>
                <div style="color: #BBBBBB;font-size: 14px;text-align: center;margin: 20px 0 50px 0;">
                  没有账单数据哟~
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="contHead" v-if="this.checkedBillIds.length>0&&showPaymentFlag">
        <div class="elsectBox">
          已收账单支付途径
          <a-select v-model="paymentMethod" style="width:114px" placeholder="请选择">
            <a-select-option v-for="(item,index) in costTabsContent" :key="index" :value="item.id">{{item.name}}</a-select-option>
          </a-select>
        </div>
        <div class="tips">（勾选已收账单，该账单将自动处理生成流水!)</div>
      </div>
      <div style="width:100%;" class="clearfix">
        <a-button @click="confirmBill" type="warning" class="saveBtn f-fr" style="width:98px;" :loading="saveLoading">确定</a-button>
        <a-button @click="cancel" type="warning" class="f-fr cancelBtn" style="width:98px;">取消</a-button>
        <p class="btn-p f-fr" v-if="list.length>0">
          <icon-font style="width:16px;height:16px;margin-right:8px;line-height:20px;color:#FFA036;" type="iconyumengtubiao_tishi" />保存后，金额为“0”的收支或账单将不生成
        </p>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { getDateHaoMiao } from '@/utils/util';
import {
  listEnableDict
} from '@/api/contract.js';
import {bizDecisionGet} from "@/api/decision";
export default {
  name: 'BillPreview',
  components: {
  },
  props: {
    billData: {
      type: Array,
      required: true
    },
    show: {
      type: Number,
      required: true
    },
    phone: {
      type: String,
      required: ''
    },
    houseId: {
      type: String,
      required: ''
    },
    deptId:{
      type: String,
      required: true,
    },
    postBillData: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      paymentMethod: '',
      costTabsContent: [],
      saveLoading: false,
      showFinaceIndex: [],
      showIndex: [],
      showFinace: false,
      ownDialog: {
        show: true,
        width: '1000px',
        title: '账单预览'
      },
      list: [],
      listData: [],
      haveIndex: '',
      checkBox: {
        checked: false,
        items: []
      },
      checkedFul: false,
      name: '',
      certificateNo: '',
      price: '',
      certificateType: '',
      postData: {},
      checkedBillIds:[],
      showPaymentFlag:true,
    };
  },
  created() {
    this.postData = Object.assign({}, this.postBillData);
    this.bizDecisionGetFun();
  },
  mounted() {
    this.init();

  },
  methods: {
    //获取决策配置
    bizDecisionGetFun(){
      let paramter ={
        bizPoint: 'CONTRACT_BASE_RULE',
        // empId: id,
        mark: 'OWNER_CONTRACT_ALLOW_AFFIRM_BILL',
        module: 'CONTRACT',
        deptId:this.deptId,
      };
      bizDecisionGet(paramter).then(res=>{
        if(res.data&&res.data.onOff==0){
          this.showPaymentFlag = false;
        }
        else{
          this.showPaymentFlag = true;
        }
      });
    },
      changeAmount(finance,bill){
          bill.totalAmount = 0;
          bill.billDetails.forEach((da)=>{
              if(finance.feeDirection == 1){
                  bill.totalAmount += Number(da.amount);
              }
              else {
                  bill.totalAmount -= Number(da.amount);
              }
          });
      },
    init(val) {
      this.getCost();
      if (val) {
        const list = JSON.parse(JSON.stringify(val));
        list.forEach((item, index) => {
          item.checked = false;
          if (item.bills) {
            item.bills.forEach((data, i) => {
              data.checked = false;
              data.totalAmount = data.totalAmount / 100;
              data.billDetails.forEach((da, j) => {
                da.amount = da.amount / 100;
                da.originAmount = da.amount;
              });
            });
          }
        });
        this.list = list;
      } else {
        const list = JSON.parse(JSON.stringify(this.billData));
        list.forEach((item, index) => {
          item.checked = false;
          if (item.bills) {
            item.bills.forEach((data, i) => {
              data.checked = false;
              data.totalAmount = data.totalAmount / 100;
              data.billDetails.forEach((da, j) => {
                da.amount = da.amount / 100;
                da.originAmount = da.amount;
              });
            });
          }
        });
        this.list = list;
      }
      // const list = JSON.parse(JSON.stringify(this.poDate));
        this.checkedBillIds = [];
    },
    getCost() {
      listEnableDict('7bf14df972f64b94b7da8d3ff88ead18').then(res => {
        this.costTabsContent = res.data;
        res.data.forEach((data, i) => {
          if (data.name === '现金') {
            this.paymentMethod = data.id;
          }
        });
      });

    },
    saveLoadingChange(){
        this.saveLoading = false;
    },
    cancel() {
      this.$emit('closeThis', true);
    },
    confirmBill() {
      const list = JSON.parse(JSON.stringify(this.list));
      list.forEach((item, index) => {
        let newItem = [...item.bills];
        newItem.forEach((data, index2) => {
          if (data.checked) {
            data.isDealWith = 1;
          } else {
            data.isDealWith = 0;
          }
        });
      });
      list.forEach((item, index) => {
        if (item.bills) {
          item.bills.forEach((data, i) => {
            data.totalAmount = Math.round(data.totalAmount * 100 * 100) / 100;
            data.billDetails.forEach((da, j) => {
              da.amount = Math.round(da.amount * 100 * 100) / 100;
            });
          });
        }
      });
      this.listData = list;
      this.$emit('listDatafu', this.listData);
      this.$emit('paymentMethod', this.paymentMethod);
      this.saveLoading = true;
      this.$emit('confirmBill', true);
    },
    closeThis() {
      this.ownDialog.show = false;
      this.$emit('closeThis', true);
    },
      simpleCloseThis(){
          this.ownDialog.show = false;
      },
    showFinaceFu(index2, index) {
      let string = index2 + '' + index;
      if (this.haveShowFinaceIndex(string)) {
        let i = this.showFinaceIndex.indexOf(string);
        this.showFinaceIndex.splice(i, 1);
      } else {
        this.showFinaceIndex.push(string);
      }
    },
    haveShowFinaceIndex(index) {
      return this.showFinaceIndex.some(item => item === index);
    },
    haveBorder(q, w, e) {
      return q + '' + w + '' + e === this.haveIndex;
    },
    inpFulcus(i1, i2, i3) {
      this.haveIndex = i1 + '' + i2 + '' + i3;
    },
    inpFulBlur(i1, i2, i3, data) {
      if (data === '') {
        this.list[i1].bills[i2].billDetails[i3].amount = 0;
      }
      this.haveIndex = '';
    },
    checkedAll(bills) {
      this.checkedFul = !this.checkedFul;
      if(bills.checked) {
          bills.bills.forEach((da, j) => {
              da.checked = true;
              let temp = this.checkedBillIds.indexOf(da.id);
              if (temp == -1) {
                  this.checkedBillIds.push(da.id);
              }
          });
      }else{
          bills.bills.forEach((da, j) => {
              da.checked = false;
              let temp = this.checkedBillIds.indexOf(da.id);
              if(temp > -1){
                  this.checkedBillIds.splice(temp,1);
              }
          });
      }
    },
    checkItem(val, i1, i2) {
      this.list[i1].bills.forEach((da, j) => {
        if (!da.checked) {
            this.list[i1].checked = false;
            let temp = this.checkedBillIds.indexOf(da.id);
            if(temp > -1){
                this.checkedBillIds.splice(temp,1);
            }
        }else{
            let temp = this.checkedBillIds.indexOf(da.id);
            if(temp == -1) {
                this.checkedBillIds.push(da.id);
            }
        }
      });
    },
    priceReg(e) {
      // 通过正则过滤小数点后两位
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
    },
    setSameAmount(index,index2,index3,finance){
      let content1 = '① 保存本条：只保存当前修改的账单金额';
      let content2 = '② 向下保存：默认将同费用类型的金额都修改成当前修改的金额';
      let feeSubjectId = finance.feeSubjectId;
      let amount = finance.amount;
      let originAmount = finance.originAmount;
      let _this = this;
      if(originAmount!=amount) {
        this.$modal.confirm({
          title: '是否向下保存？',
          content: () => <p>{content1}
            <br/>
            {content2}
          </p>,
          okText: '保存本条',
          cancelText: '向下保存',
          onOk() {
            finance.originAmount = amount;
          },
          onCancel() {
            finance.originAmount = amount;
            _this.list.forEach((itemList, int1) => {
              itemList.bills.forEach((itemBills, int2) => {
                itemBills.billDetails.forEach((itemBillDetail, int3) => {
                  if (((int1 == index && ((int2 == index2 && int3 > index3) || int2 > index2)) || int1 > index)
                      && feeSubjectId == itemBillDetail.feeSubjectId) {
                    itemBillDetail.amount = amount;
                    itemBillDetail.originAmount = amount;
                  }
                });
              });
            });
            _this.list.forEach((itemList) => {
              itemList.bills.forEach((itemBills) => {
                let totalAmount = 0;
                itemBills.billDetails.forEach((itemBillDetail) => {
                  if(finance.feeDirection == 1){
                    if(!isNaN(Number(itemBillDetail.amount))){
                      totalAmount += Number(itemBillDetail.amount);
                    }
                  }
                  else {
                    if(!isNaN(Number(itemBillDetail.amount))) {
                      totalAmount -= Number(itemBillDetail.amount);
                    }
                  }
                });
                itemBills.totalAmount = totalAmount;
              });
            })
          },
        });
      }
    },
  },
  filters: {
    formatTime: function(value) {
      if (!value) return '';
      value = getDateHaoMiao(value);
      return value;
    }
  },
  watch: {
    show(n) {
      if (n) {
        this.ownDialog.show = n;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.bill-preview {
  .listContract-box{
    &>.listContract:nth-last-child(1) {
      border:none;
    }
  }
  .listContract {
    height: 40px;
    border-bottom: 1px solid #dddddd;
    margin: 0 20px;
    >p {
      height: 20px;
      margin-top: 10px;
    }
    .listOne {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(17, 17, 17, 1);
    }
    .listTwo {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(17, 17, 17, 1);
      padding-right: 20px;
      border-right: 1px solid #dddddd;
    }
    .listTress {
      padding-left: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400; // color: rgba(10, 135, 248, 1);
    }
  }
  .content-row {
    margin: 20px 20px;
    .bill-item {
      margin-bottom: 20px;
      .delete-icon {
        color: red;
        font-size: 14px;
      }
      .bill-detail {
        border-left: 1px solid @borderColor;
        border-top: 1px solid @borderColor;
        text-align: center;
        font-size: 12px;
        .bill-name {
          height: 48px;
          line-height: 46px;
          font-weight: 600;
          border-bottom: 1px solid @borderColor;
          border-right: 1px solid @borderColor;
          background: rgba(238, 239, 243, 1);
          position: relative;
          .checkbox-box {
            float: right;
            margin-right: 34px;
          }
          .bill-name-span {
            float: left;
            margin-left: 10px;
          }
        }
        .bill-title {
          display: flex;
          background: rgba(247, 248, 251, 1);
          text-align: left;
          &>div {
            padding: 0px 9px;
            flex: 1;
            height: 40px;
            line-height: 40px;
            border-right: 1px solid @borderColor;
            border-bottom: 1px solid @borderColor;
          }
          .must-fill {
            color: #FB4246;
          }
        }
        .bill-data {
          position: relative;
          .left-check {
            border-right: 1px solid @borderColor;
            border-bottom: 1px solid @borderColor;
            width: 56px;
            height: 40px;
            line-height: 40px;
          }
          .bill-content-list {
            display: flex;
            &>div {
              font-size: 14px;
              color: rgba(17, 17, 17, 1);
              text-align: left;
              padding: 0px 9px;
              flex: 1;
              height: 100%;
              height: 40px;
              line-height: 40px; // text-align: center;
              border-right: 1px solid @borderColor;
              border-bottom: 1px solid @borderColor;
              background-color: #ffffff;
              .popover:hover {
                height: 39px;
                line-height: 38px;
                border: 1px solid @themeColor;
                cursor: pointer;
              }
            }
          }
          .payPattern {
            padding: 0 9px;
          }
          input {
            padding: 0 9px; // height: 24px;
            height: calc(100% - 2px); // text-align: left;
          }
          input:focus {
            border: 1px solid @themeColor!important;
          }
          .select-border {
            border: 1px solid @themeColor;
          }
          .options {
            i,
            span {
              display: inline-block;
              width: 50%;
              height: 39px;
              cursor: pointer;
            }
            i {
              line-height: 39px;
              font-size: 14px;
            }
            span {
              padding: 3px 4px;
              line-height: 18px;
              background-color: #DCEFFF;
              color: @themeColor;
            }
          }
          .togeAddress {
            padding: 0 9px;
            display: flex; // width: calc(50% - 15px);
            width: 100%;
            height: 100%;
            & /deep/ .ant-select-selection__rendered {
              margin-top: 6px;
            }
          }
          .bill-span {
            float: left;
            margin-left: 10px;
          }
        }
        .bill-foot {
          height: 40px;
          line-height: 40px;
          border-right: 1px solid @borderColor;
          border-bottom: 1px solid @borderColor;
          .billAdd {
            width: 100px;
            margin: 0 auto;
            text-align: center;
          }
        }
      }
    }
  }
  .child-box {
    padding: 15px 0 0 20px;
    background: rgba(245, 247, 254, 1); // border-left: 1px solid @borderColor;
    &>div {
      padding: 0px 9px;
      flex: 1;
      height: 40px;
      line-height: 40px;
      border-top: 1px solid @borderColor;
    }
    &>div:nth-child(1) {
      border-left: 1px solid @borderColor;
    }
  }
  .child-data {
    padding: 0 0 0 20px;
    position: relative;
    display: flex; //  border-bottom: 1px solid @borderColor;
    &>div {
      flex: 1;
      padding: 0px 9px;
      height: 100%;
      height: 40px;
      line-height: 40px;
      text-align: left;
      border-right: 1px solid @borderColor;
      border-bottom: 1px solid @borderColor;
      background-color: #ffffff;
      .popover:hover {
        height: 39px;
        line-height: 38px;
        border: 1px solid @themeColor;
        cursor: pointer;
      }
    }
    &>div:nth-child(1) {
      border-left: 1px solid @borderColor;
    }
  }
  .inputBor {
    background: rgba(252, 252, 255, 1);
    border-right: 1px solid @borderColor;
    border-bottom: 1px solid @borderColor;
    &>div:nth-last-child(1) {
      padding-bottom: 15px;
    }
  }
  .content-row .bill-item .bill-detail .bill-data .inputBor .child-box {
    background: rgba(252, 252, 255, 1);
  }
}
.saveBtn {
  width: 120px;
  height: 40px;
  background: rgba(10, 135, 248, 1);
  border-radius: 5px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.cancelBtn {
  width: 120px;
  height: 40px;
  background: rgba(246, 247, 248, 1);
  border-radius: 5px;
  border: 1px solid rgba(221, 221, 221, 1);
  margin-right: 20px;
  margin-bottom: 20px;
}
.btn-p {
  padding: 12px 20px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(251, 180, 0, 1);
  float: right;
}
.contHead {
  height: 52px;
  .tips {
    float: right; // color: rgba(251, 180, 0, 1);
    font-size: 14px;
    font-weight: 400;
    line-height: 52px;
    margin-right: 34px;
  }
  .elsectBox {
    margin-right: 15px;
    line-height: 52px;
    float: right;
    color: #111111;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
