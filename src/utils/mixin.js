/*
注意：
    混入对象(mixin.js)需保证路由的属性的唯一性  以免发生覆盖
    混入对象(mixin.js)中务必保证通用性，避免使用this对象调用除了当前混入对象(mixin.js)外 其他组件中的属性、方法
 */
import { clearNoNum, setInteger, clearArea, delSpecialMark } from '@/utils/util';
export default {
  data() {
    return {};
  },

  methods: {
    mixin_integerFilter(str, isZero = true, max = -1) {
      /**
       * 正整数过滤 max默认值设置为-1是因为setInteger方法中已处理，此方法中也可不设置
       * */
      let keyArr = str.split('.');
      if (keyArr.length === 1) {
        this[str] = setInteger(this[str], isZero);
      } else if (keyArr.length === 2) {
        this[keyArr[0]][keyArr[1]] = setInteger(this[keyArr[0]][keyArr[1]], isZero, max);
      } else if (keyArr.length === 3) {
        this[keyArr[0]][keyArr[1]][keyArr[2]] = setInteger(
          this[keyArr[0]][keyArr[1]][keyArr[2]], isZero, max
        );
      }
    },
    mixin_moneyFilter(str, max = -1) {
      /**
       * 金额过滤 小数点后两位
       * max默认值设置为-1是因为setInteger方法中已处理，此方法中也可不设置
      */
      let keyArr = str.split('.');
      if (keyArr.length === 1) {
        this[str] = clearNoNum(this[str]);
      } else if (keyArr.length === 2) {
        this[keyArr[0]][keyArr[1]] = clearNoNum(this[keyArr[0]][keyArr[1]], max);
      } else if (keyArr.length === 3) {
        this[keyArr[0]][keyArr[1]][keyArr[2]] = clearNoNum(
          this[keyArr[0]][keyArr[1]][keyArr[2]], max
        );
      }
    },
    // 面积过滤 小数点后两位 最大9999.99
    mixin_areaFilter(str) {
      let keyArr = str.split('.');
      if (keyArr.length === 1) {
        this[str] = clearArea(this[str]);
      } else if (keyArr.length === 2) {
        this[keyArr[0]][keyArr[1]] = clearArea(this[keyArr[0]][keyArr[1]]);
      } else if (keyArr.length === 3) {
        this[keyArr[0]][keyArr[1]][keyArr[2]] = clearArea(
          this[keyArr[0]][keyArr[1]][keyArr[2]]
        );
      }
    },
    // 特殊字符过滤
    mixin_specialMarkFilter(str, isAll = true) {
      let keyArr = str.split('.');
      if (keyArr.length === 1) {
        this[str] = delSpecialMark(this[str], isAll);
      } else if (keyArr.length === 2) {
        this[keyArr[0]][keyArr[1]] = delSpecialMark(this[keyArr[0]][keyArr[1]], isAll);
      } else if (keyArr.length === 3) {
        this[keyArr[0]][keyArr[1]][keyArr[2]] = delSpecialMark(
          this[keyArr[0]][keyArr[1]][keyArr[2]], isAll
        );
      }
    }
  }
};
