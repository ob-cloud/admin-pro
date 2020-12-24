<template>
<!-- 分阶 -->
  <div class="gradContract-owner">
    <div v-if="custom===2" class="addContract-form-input-item">
      <div class="contract-modular addContract-form-input addContract-box-1" style="width:1000px;"  v-if="subLevelsData.length>0">
        <div class="content-row">
          <div class="together-item">
            <div class="together-detail">
                <div class="together-title">
                    <div style="max-width: 240px">合同周期</div>
                    <div style="max-width: 243px">共计时长 </div>
                    <div style="max-width: 102px">租金 </div>
                    <div style="max-width: 112px">付款方式</div>
                    <div style="max-width: 92px">免租天数</div>
                    <div style="max-width: 118px">抵扣期数</div>
                    <div style="max-width: 92px">增长比率</div>
                </div>
              <div class="together-data u-no-border" v-for="(subLevels,index) in subLevelsData" :key="index">
                <div style="max-width: 240px;padding: 0 9px;" class="time-content time-content-style">
                  <a-date-picker :disabled="true" :index="index" v-model="subLevels.beginTime" :format="dateFormat" />
                  <span class="splitStyle">-</span>
                  <a-date-picker placeholder="结束日期" :disabled="true" :index="index" :disabledDate="disabledEndDate" v-model="subLevels.endTime" :format="dateFormat" />
                </div>
                <div style="max-width: 81px;padding-left: 9px;">
                  <a-input v-model.number="subLevels.year" @keyup.native="changeBeginDate" :disabled="!judgeShow(subLevels)" maxlength="4">
                    <p slot="suffix">年</p>
                  </a-input>
                </div>
                <div style="max-width: 81px;padding-left: 9px;">
                  <a-input v-model.number="subLevels.month" maxlength="2" @keyup.native="changeBeginDate" :disabled="!judgeShow(subLevels)">
                    <p slot="suffix">月</p>
                  </a-input>
                </div>
                <div style="max-width: 81px;padding:0 9px;" class="time-content-style">
                  <a-input disabled v-model.number="subLevels.day" @keyup.native="changeBeginDate" >
                    <p slot="suffix">日</p>
                  </a-input>
                </div>
                <div class="payment feiyong time-content-style2" style="max-width: 102px;padding-left: 10px;">
                  <a-input style="width: 91px;" v-model.number="subLevels.price" maxlength="7" @change="saveGrading">
                    <p slot="suffix">元/月</p>
                  </a-input>
                </div>
                <div style="max-width: 112px;padding-left: 9px;text-align: left">
                  <span style="font-size: 14px;margin-right: 6px;" v-if="subLevels.periodMonth!==99">付</span>
                  <a-select style="width: 82px;" v-model="subLevels.periodMonth" @change="saveGrading" placeholder="请选择">
                    <a-select-option v-for="(item) in periodMonthOptions" :key="item.value" :value="item.value">{{item.value===99?'一次性付':item.value}}</a-select-option>
                  </a-select>
                </div>
                  <div class="payment feiyong" style="max-width: 92px;padding-left: 9px;">
                      <a-input style="width: 80px;" v-model.number="subLevels.freeDays" maxlength="7" @keyup.native="changeFreeDays" >
                          <p slot="suffix">天</p>
                      </a-input>
                  </div>
                  <div style="max-width: 118px;padding: 0 9px;">
                      <a-select style="width: 100px;" v-model="subLevels.periodNumValue" @change="saveGrading" placeholder="请选择">
                          <a-select-option v-for="(item) in subLevels.periodNumList" :key="item.key" :value="item.key">{{item.value}}</a-select-option>
                      </a-select>
                  </div>
                  <div class="payment feiyong time-content-style" style="max-width: 92px;padding: 0 9px;">
                      <a-input style="width: 74px;" v-model.number="subLevels.scale" maxlength="7" @change="saveGrading" :disabled="index==0" @keyup.native="changeBeginDate">
                          <p slot="suffix">%</p>
                      </a-input>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import textDatepicker from '_c/datepicker-text';
import { renterSubleveld } from '@/api/contract';
import { oneCalcSublevel } from '@/api/ownerContract'
export default {
  name: 'Grading',
  components: {
    // textDatepicker
  },
  props: {
    openGradingMath: {
      type: Number
    },
    resetGradingMath: {
      type: Number
    },
    gradingData: {
      type: Object,
      required: true
    },
    tenantFirst: {  //零散租期设置  
      type: Number
    },
    custom: {
      type: Number
    },
    beginTime: {
      type: Object,
      required: true
    },
    endTime: {
      type: Object,
      required: true
    },
    price: {
      type: Number
    }
  },
  data() {
    return {
      dateFormat: 'YYYY.MM.DD',           //日期选择器格式
      zeroSubLevelAfter: {
        amount: '',
        beginTime: null,
        endTime: null,
        isMerge: 0,
        ratio: '',
        price: ''
      },
      zeroSubLevelBefore: {
        amount: '',
        beginTime: null,
        endTime: null,
        isMerge: 0,
        ratio: '',
        price: ''
      },
      contractForm: {
        beginTime: null,
        endTime: null,
        deposit: '',
        deposit1: ''
      },
      useIndex: -1,
      subLevelsData: [],
      pickerValue: '',
      startTimetagsfocus: false,
      startTimetags: {
        focus: false
      },
      startTimetags2: {
        focus: false
      },
      ownDialog: {
        show: false,
        width: '95%',
        title: '设置分阶费用'
      },
      periodMonthOptions: [
        {
          value: 1
        },
        {
          value: 2
        },
        {
          value: 3
        },
        {
          value: 4
        },
        {
          value: 5
        },
        {
          value: 6
        },
        {
          value: 7
        },
        {
          value: 8
        },
        {
          value: 9
        },
        {
          value: 10
        },
        {
          value: 11
        },
        {
          value: 12
        },
        {
          value: 99
        }
      ],
      mergeListAfter: [
        {
          label: '与首期分开支付',
          value: 0
        },
        {
          label: '与首期合并支付',
          value: 1
        }
      ],
      mergeListBefore: [
        {
          label: '与末期分开支付',
          value: 0
        },
        {
          label: '与末期合并支付',
          value: 1
        }
      ],
      value13: '',
      input: '',
      options: [],
      value: '',
      disabledshow: true,
      showbtn: false,
      saveData: []
    };
  },
  created() {
    this.tebabtshowful();
  },
  methods: {
    disabledEndDate(endValue) {
      let endTime = this.endTime;
      const startValue = this.zeroSubLevelBefore.beginTime
      if (this.zeroSubLevelAfter.beginTime) {
        endTime = this.zeroSubLevelAfter.beginTime;
      }

      if (!endValue || !startValue) {
        return false;
      }
      return (
        startValue.valueOf() >= endValue.valueOf() ||
        endValue.valueOf() > this.$moment(endTime).valueOf()
      )
    },
    disabledStartDate(startValue) {
      let beginTime = this.beginTime;
      const endValue = this.zeroSubLevelAfter.endTime;
      if (this.zeroSubLevelBefore.endTime) {
        beginTime = this.zeroSubLevelBefore.endTime;
      }
      if (!startValue || !endValue) {
        return false;
      }
      return (
        startValue.valueOf() > endValue.valueOf() ||
        startValue.valueOf() < this.$moment(beginTime).valueOf() + 86400000
      )
    },
    tebabtshowful() {
      let endTime = this.endTime;
      let beginTime = this.beginTime;
      let begin = this.$moment(this.beginTime).valueOf();
      this.zeroSubLevelBefore.beginTime = this.$moment(begin)
      let After = this.$moment(this.endTime).valueOf();
      this.zeroSubLevelAfter.endTime = this.$moment(After)
      this.saveData = [];
      this.subLevelsData = [];
      this.$emit('haveGrading', true);
    },
    clickitem(num) {
      if (num === 2) {
        // this.gradingData = [];
        this.$emit('haveGrading', false);
      } else {
        this.saveData = [];
        this.subLevelsData = [];
        this.$emit('haveGrading', true);
      }
    },
    judgeShow(data) {
      // 如果吗没年 没 月  只有日 禁用 不显示
      if (data.year === 0 && data.year === 0 && data.day !== 0) {
        return false;
      } else {
        return true;
      }
    },
    changeFreeDays() {
      let dayold = 0;
      this.subLevelsData.forEach((item, index) => {
        let num = this.subLevelsData[index].freeDays * 1;
        dayold += parseInt(num);
      });
      this.$emit('changeFreeDays', dayold);
      this.saveGrading();
    },
    saveZero() {
      this.$emit('emitZeroAfter', this.zeroSubLevelAfter);
      this.$emit('emitZeroBefore', this.zeroSubLevelBefore);
    },
    saveGrading() {
      let postData = {
        subLevelsData: this.subLevelsData
      };

      this.saveData = [];
      for (let item of this.subLevelsData) {
        this.saveData.push(item);
      }
      this.$emit('emitGrading', postData);
    },
    closeThis() {
      this.ownDialog.show = false;
      // this.subLevelsData = [];
    },
    zeroSubLevel() {
      let postData = {};
      if (this.tenantFirst === 2) {
        if (this.zeroSubLevelAfter.beginTime !== '' && this.zeroSubLevelAfter.beginTime !== null) {
          postData = Object.assign({}, this.zeroSubLevelAfter);
          renterSubleveld(postData).then(res => {
            if (res.code == "200") {
              this.zeroSubLevelAfter.amount = res.data.amount / 100;
              this.zeroSubLevelAfter.ratio = res.data.ratio;
              this.saveZero();
            }
          })
        }
      } else if (this.tenantFirst === 1) {
        if (this.zeroSubLevelBefore.endTime !== '' && this.zeroSubLevelBefore.endTime !== null) {
          postData = Object.assign({}, this.zeroSubLevelBefore);
          renterSubleveld(postData).then(res => {
            if (res.code === '200') {
              this.zeroSubLevelBefore.amount = res.data.amount / 100;
              this.zeroSubLevelBefore.ratio = res.data.ratio;
              this.saveZero();
            }
          });
        }
      } else {
        if (this.zeroSubLevelAfter.beginTime !== '' && this.zeroSubLevelAfter.beginTime !== null) {
          postData = Object.assign({}, this.zeroSubLevelAfter);
          renterSubleveld(postData).then(res => {
            if (res.code === '200') {
              this.zeroSubLevelAfter.amount = res.data.amount / 100;
              this.zeroSubLevelAfter.ratio = res.data.ratio;
              this.saveZero();
            }
          });
        }
        if (this.zeroSubLevelBefore.endTime !== '' && this.zeroSubLevelBefore.endTime !== null) {
          let postData2 = Object.assign({}, this.zeroSubLevelBefore);
          renterSubleveld(postData2).then(res => {
            if (res.code === '200') {
              this.zeroSubLevelBefore.amount = res.data.amount / 100;
              this.zeroSubLevelBefore.ratio = res.data.ratio;
              this.saveZero();
            }
          });
        }
      }
    },
    calcSublevel(sublevel) {
      let postData = Object.assign({}, this.gradingData);
      if (sublevel) {
        let subLevelsData = JSON.parse(JSON.stringify(this.subLevelsData));
        for (let item of subLevelsData) {
          item.price =  Math.round(item.price * 100);
        }
        postData.subLevels = subLevelsData;
        postData.stagedList = subLevelsData;
      }
      if (this.tenantFirst === 2) {
        postData.afterBeginDate = this.zeroSubLevelAfter.beginTime;
      } else if (this.tenantFirst === 1) {
        postData.beforeEndDate = this.zeroSubLevelBefore.endTime;
      } else if (this.tenantFirst === 3) {
        postData.afterBeginDate = this.zeroSubLevelAfter.beginTime;
        postData.beforeEndDate = this.zeroSubLevelBefore.endTime;
      }
      if (this.tenantFirst !== 4) {
        postData.beginTime = this.zeroSubLevelBefore.beginTime;
        postData.endTime = this.zeroSubLevelAfter.endTime;
      }
      postData.isFirst = this.tenantFirst;
      postData.zeroRentPeriod = this.tenantFirst;
      // 金额转为分
      postData.price =  Math.round(postData.price * 100);
      // return;
      oneCalcSublevel(postData).then(res => {
        if (res.code === '200') {
          for (let item of res.data) {
            // let beginDate = new Date(item.beginTime);
            // let beginDates = beginDate.getTime();
            // item.beginTime = this.$moment(item.beginTime)

            // let endDate = new Date(item.endTime);
            // let endDates = endDate.getTime();
            // item.endTime = stampToTimeString(endDates);

            // item.beginTime = item.beginTime.substring(0, 10);
            // item.endTime = item.endTime.substring(0, 10);
            item.beginTime = this.$moment(item.beginTime)
            item.endTime = this.$moment(item.endTime)
            item.periodMonth = postData.periodMonth;
            item.price = item.price / 100;
            item.scale = item.scale - 0;
            let temp = [];
            for (let i = 0; i < item.periodNum; i++) {
                let t = {};
                t.key = i+1;
                t.value = '第'+(i+1)+'期抵扣';
                temp.push(t);
            }
              item.periodNumList = temp;
          }
          this.subLevelsData = res.data;
          this.saveGrading();
        }
      })
    },
    creatTimes(number) {
      let arr = [];
      for (let i = 0; i < number; i++) {
        arr.push({
          label: `第${i + 1}期抵扣`,
          value: i + 1
        });
      }
      return arr;
    },
    changeBeginDate(e) {
      // 改变开始时间
      // console.log(e)
      // this.subLevelsData[data.index].beginDate = data.date;
      if (e.keyCode !== 8) {
        this.calcSublevel(true);
      }
    },
    changeLs(e) {
      this.zeroSubLevel();
    },
    changeAfterBeginTime(data) {
      this.zeroSubLevelAfter.beginTime = data;
      this.zeroSubLevel();
      if (this.custom === 2) {
        this.calcSublevel(true);
      }
    },
    changeAfterEndTime(data) {
      this.zeroSubLevelAfter.endTime = data;
      this.zeroSubLevel();
      if (this.custom === 2) {
        this.calcSublevel(true);
      }
    },
    changeBeforeBeginTime(data) {
      this.zeroSubLevelBefore.beginTime = data;
      this.zeroSubLevel();
      if (this.custom === 2) {
        this.calcSublevel(true);
      }
    },
    changeBeforeEndTime(data) {
      this.zeroSubLevelBefore.endTime = data;
      this.zeroSubLevel();
      if (this.custom === 2) {
        this.calcSublevel(true);
      }
    },
    changeEndDate(data) {
      // 改变开始时间

      this.subLevelsData[data.index].endTime = data.date;
      this.calcSublevel(true);
    },
    refrese() {
      // console.log(this.subLevelsData);
      this.calcSublevel(this.subLevelsData);
    },
    priceReg(e) {
      // 通过正则过滤小数点后两位
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
      this.saveZero();
    },
    changeDate(date) {
      this.contractForm.beginTime = date;
      this.resetGradingMath = Math.random();
      this.resetGrading();
      this.getCoTime();
      // this.showGrading()
    }
  },
  watch: {
    resetGradingMath(n) {
      this.saveData = [];
      this.subLevelsData = [];
    },
    openGradingMath(n) {
      if (this.custom === 2) {
        this.calcSublevel(true);
      }
      if (this.tenantFirst !== 4) {
        this.zeroSubLevelBefore.beginTime = this.$moment(this.$moment(this.beginTime).valueOf())
        this.zeroSubLevelAfter.endTime = this.$moment(this.$moment(this.endTime).valueOf())
        this.zeroSubLevelAfter.price = this.price;
        this.zeroSubLevelBefore.price = this.price;
        this.zeroSubLevel();
      }
    },
    tenantFirst(n) {
      if (this.custom === 2) {
        this.calcSublevel(true);
      }
      //this.tebabtshowful();
    },
    custom() {
      this.calcSublevel(true);
    }
  }
};
</script>

<style lang="less" scoped>
.gradContract-owner {
  width: 1000px;
  //overflow: hidden;
  position: relative;
  margin-top: 21px;
  .contract-modular {
    .titleInfo {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      position: relative;
      box-sizing: border-box;
      margin: 11px 0;
      b {
        font-weight: normal;
      }
    }
    .content-row {


      .together-item {
        margin-bottom: 20px;
        .delete-icon {
          color: red;
          font-size: 14px;
        }
        .together-detail {
          border-left: 1px solid @borderColor;
          border-top: 1px solid @borderColor;
          text-align: center;
          font-size: 12px;
          .together-title {
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
          .together-data {
            position: relative;
            display: flex;
            &>div {
              flex: 1;
              height: 100%;
              height: 40px;
              line-height: 40px;
              text-align: center;
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
            .payPattern {
              padding: 0 9px;
            }
            input {
              // text-align: center;
              padding: 0 9px;
              height: 100%;
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
                // margin-left: 16px;
                margin-top: 6px;
              }
            }
          }
          .together-foot {
            height: 40px;
            line-height: 40px;
            border-right: 1px solid @borderColor;
            border-bottom: 1px solid @borderColor;
            .togetherAdd {
              width: 100px;
              margin: 0 auto;
              text-align: center;
            }
          }
        }
      }
    }
  }
  .time-content {
          width: 250px;
          line-height: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          & /deep/ .ant-calendar-picker{
              width: 122.5px;
          }
          & /deep/ .text-date-picker {
            line-height: 1;
            height: auto;
          }
          &>span {
            // width: 10%;
            text-align: left;
          }
        }
  .time-content-style{
        .splitStyle{
            margin: 0 10px;
        }
        /deep/ .ant-input-disabled{
            padding: 0 10px;
            border-radius: 4px;
        }
        /deep/ .ant-input-disabled{
            padding-left: 8px;
            border-radius: 4px;
        }
    }
  .time-content-style2{
      /deep/ .ant-input-affix-wrapper .ant-input-suffix{
          right: 8px;
      }
  }
  & /deep/ .ant-calendar-picker-icon {
    display: none;
  }
  & /deep/ .ant-input-disabled {
    height: 20px;
  }
  & /deep/ .ant-input{  
    padding: 0px 8px;
  }
}
</style>
