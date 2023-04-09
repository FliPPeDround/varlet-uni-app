import { defineComponent, ref, computed, reactive, watch } from 'vue';
import dayjs from 'dayjs/esm';
import MonthPickerPanel from './src/month-picker-panel.mjs';
import YearPickerPanel from './src/year-picker-panel.mjs';
import DayPickerPanel from './src/day-picker-panel.mjs';
import { props, MONTH_LIST, WEEK_HEADER } from './props.mjs';
import { isArray, toNumber } from '@varlet/shared';
import { nextTickFrame } from '../utils/elements.mjs';
import { createNamespace, call, formatElevation } from '../utils/components.mjs';
import { padStart } from '../utils/shared.mjs';
import { pack } from '../locale/index.mjs';
var {
  n,
  classes
} = createNamespace('date-picker');
import { renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, createCommentVNode as _createCommentVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeProps as _normalizeProps, mergeProps as _mergeProps, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, normalizeStyle as _normalizeStyle, resolveComponent as _resolveComponent, createBlock as _createBlock } from "vue";
function __render__(_ctx, _cache) {
  var _component_year_picker_panel = _resolveComponent("year-picker-panel");
  var _component_month_picker_panel = _resolveComponent("month-picker-panel");
  var _component_day_picker_panel = _resolveComponent("day-picker-panel");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.formatElevation(_ctx.elevation, 2)))
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('title')),
    style: _normalizeStyle({
      background: _ctx.headerColor || _ctx.color
    })
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('title-year'), [_ctx.isYearPanel, _ctx.n('title-year--active')])),
    onClick: _cache[0] || (_cache[0] = $event => _ctx.clickEl('year'))
  }, [_renderSlot(_ctx.$slots, "year", {
    year: _ctx.chooseYear
  }, () => [_createTextVNode(_toDisplayString(_ctx.chooseYear), 1 /* TEXT */)])], 2 /* CLASS */), _createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('title-date'), [!_ctx.isYearPanel, _ctx.n('title-date--active')], [_ctx.range, _ctx.n('title-date--range')])),
    onClick: _cache[1] || (_cache[1] = $event => _ctx.clickEl('date'))
  }, [_createVNode(_Transition, {
    name: _ctx.multiple ? '' : "" + _ctx.n() + (_ctx.reverse ? '-reverse' : '') + "-translatey"
  }, {
    default: _withCtx(() => {
      var _ctx$chooseMonth, _ctx$chooseMonth2, _ctx$chooseMonth3;
      return [_ctx.type === 'month' ? (_openBlock(), _createElementBlock("div", {
        key: "" + _ctx.chooseYear + ((_ctx$chooseMonth = _ctx.chooseMonth) == null ? void 0 : _ctx$chooseMonth.index)
      }, [_ctx.range ? _renderSlot(_ctx.$slots, "range", {
        key: 0,
        choose: _ctx.getChoose.chooseRangeMonth
      }, () => [_createTextVNode(_toDisplayString(_ctx.getMonthTitle), 1 /* TEXT */)]) : _ctx.multiple ? _renderSlot(_ctx.$slots, "multiple", {
        key: 1,
        choose: _ctx.getChoose.chooseMonths
      }, () => [_createTextVNode(_toDisplayString(_ctx.getMonthTitle), 1 /* TEXT */)]) : _renderSlot(_ctx.$slots, "month", {
        key: 2,
        month: (_ctx$chooseMonth2 = _ctx.chooseMonth) == null ? void 0 : _ctx$chooseMonth2.index,
        year: _ctx.chooseYear
      }, () => [_createTextVNode(_toDisplayString(_ctx.getMonthTitle), 1 /* TEXT */)])])) : (_openBlock(), _createElementBlock("div", {
        key: "" + _ctx.chooseYear + ((_ctx$chooseMonth3 = _ctx.chooseMonth) == null ? void 0 : _ctx$chooseMonth3.index) + _ctx.chooseDay
      }, [_ctx.range ? _renderSlot(_ctx.$slots, "range", {
        key: 0,
        choose: _ctx.formatRange
      }, () => [_createTextVNode(_toDisplayString(_ctx.getDateTitle), 1 /* TEXT */)]) : _ctx.multiple ? _renderSlot(_ctx.$slots, "multiple", {
        key: 1,
        choose: _ctx.getChoose.chooseDays
      }, () => [_createTextVNode(_toDisplayString(_ctx.getDateTitle), 1 /* TEXT */)]) : _renderSlot(_ctx.$slots, "date", _normalizeProps(_mergeProps({
        key: 2
      }, _ctx.slotProps)), () => [_createTextVNode(_toDisplayString(_ctx.getDateTitle), 1 /* TEXT */)])]))];
    }),

    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name"])], 2 /* CLASS */)], 6 /* CLASS, STYLE */), _createElementVNode("div", {
    class: _normalizeClass(_ctx.n('body')),
    onTouchstart: _cache[2] || (_cache[2] = function () {
      return _ctx.handleTouchstart && _ctx.handleTouchstart(...arguments);
    }),
    onTouchmove: _cache[3] || (_cache[3] = function () {
      return _ctx.handleTouchmove && _ctx.handleTouchmove(...arguments);
    }),
    onTouchend: _cache[4] || (_cache[4] = function () {
      return _ctx.handleTouchend && _ctx.handleTouchend(...arguments);
    })
  }, [_createVNode(_Transition, {
    name: _ctx.n() + "-panel-fade"
  }, {
    default: _withCtx(() => [_ctx.getPanelType === 'year' ? (_openBlock(), _createBlock(_component_year_picker_panel, {
      key: 0,
      "component-props": _ctx.componentProps,
      preview: _ctx.previewYear,
      onChooseYear: _ctx.getChooseYear
    }, null, 8 /* PROPS */, ["component-props", "preview", "onChooseYear"])) : _ctx.getPanelType === 'month' ? (_openBlock(), _createBlock(_component_month_picker_panel, {
      key: 1,
      ref: "monthPanelEl",
      current: _ctx.currentDate,
      choose: _ctx.getChoose,
      preview: _ctx.getPreview,
      "click-year": () => _ctx.clickEl('year'),
      "component-props": _ctx.componentProps,
      onChooseMonth: _ctx.getChooseMonth,
      onCheckPreview: _ctx.checkPreview
    }, null, 8 /* PROPS */, ["current", "choose", "preview", "click-year", "component-props", "onChooseMonth", "onCheckPreview"])) : _ctx.getPanelType === 'date' ? (_openBlock(), _createBlock(_component_day_picker_panel, {
      key: 2,
      ref: "dayPanelEl",
      current: _ctx.currentDate,
      choose: _ctx.getChoose,
      preview: _ctx.getPreview,
      "component-props": _ctx.componentProps,
      "click-month": () => _ctx.clickEl('month'),
      onChooseDay: _ctx.getChooseDay,
      onCheckPreview: _ctx.checkPreview
    }, null, 8 /* PROPS */, ["current", "choose", "preview", "component-props", "click-month", "onChooseDay", "onCheckPreview"])) : _createCommentVNode("v-if", true)]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["name"])], 34 /* CLASS, HYDRATE_EVENTS */)], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarDatePicker',
  components: {
    MonthPickerPanel,
    YearPickerPanel,
    DayPickerPanel
  },
  props,
  setup(props) {
    var startX = 0;
    var startY = 0;
    var checkType = '';
    var touchDirection;
    var currentDate = dayjs().format('YYYY-MM-D');
    var [currentYear, currentMonth] = currentDate.split('-');
    var monthDes = MONTH_LIST.find(month => month.index === currentMonth);
    var isYearPanel = ref(false);
    var isMonthPanel = ref(false);
    var rangeDone = ref(true);
    var chooseMonth = ref();
    var chooseYear = ref();
    var chooseDay = ref();
    var previewMonth = ref(monthDes);
    var previewYear = ref(currentYear);
    var reverse = ref(false);
    var chooseMonths = ref([]);
    var chooseDays = ref([]);
    var chooseRangeMonth = ref([]);
    var chooseRangeDay = ref([]);
    var monthPanelEl = ref(null);
    var dayPanelEl = ref(null);
    var componentProps = reactive({
      allowedDates: props.allowedDates,
      type: props.type,
      color: props.color,
      firstDayOfWeek: props.firstDayOfWeek,
      min: props.min,
      max: props.max,
      showCurrent: props.showCurrent,
      multiple: props.multiple,
      range: props.range,
      buttonElevation: props.buttonElevation
    });
    var getChoose = computed(() => ({
      chooseMonth: chooseMonth.value,
      chooseYear: chooseYear.value,
      chooseDay: chooseDay.value,
      chooseMonths: chooseMonths.value,
      chooseDays: chooseDays.value,
      chooseRangeMonth: chooseRangeMonth.value,
      chooseRangeDay: chooseRangeDay.value
    }));
    var getPreview = computed(() => ({
      previewMonth: previewMonth.value,
      previewYear: previewYear.value
    }));
    var getMonthTitle = computed(() => {
      var {
        multiple,
        range
      } = props;
      if (range) {
        return chooseRangeMonth.value.length ? chooseRangeMonth.value[0] + " ~ " + chooseRangeMonth.value[1] : '';
      }
      var monthName = '';
      if (chooseMonth.value) {
        var _pack$value$datePicke, _pack$value$datePicke2;
        monthName = (_pack$value$datePicke = (_pack$value$datePicke2 = pack.value.datePickerMonthDict) == null ? void 0 : _pack$value$datePicke2[chooseMonth.value.index].name) != null ? _pack$value$datePicke : '';
      }
      return multiple ? "" + chooseMonths.value.length + pack.value.datePickerSelected : monthName;
    });
    var getDateTitle = computed(() => {
      var _pack$value$datePicke3, _pack$value$datePicke4, _pack$value$datePicke5, _pack$value$datePicke6;
      var {
        multiple,
        range
      } = props;
      if (range) {
        var formatRangeDays = chooseRangeDay.value.map(date => dayjs(date).format('YYYY-MM-DD'));
        return formatRangeDays.length ? formatRangeDays[0] + " ~ " + formatRangeDays[1] : '';
      }
      if (multiple) return "" + chooseDays.value.length + pack.value.datePickerSelected;
      if (!chooseYear.value || !chooseMonth.value || !chooseDay.value) return '';
      var weekIndex = dayjs(chooseYear.value + "-" + chooseMonth.value.index + "-" + chooseDay.value).day();
      var week = WEEK_HEADER.find(value => value.index === "" + weekIndex);
      var weekName = (_pack$value$datePicke3 = (_pack$value$datePicke4 = pack.value.datePickerWeekDict) == null ? void 0 : _pack$value$datePicke4[week.index].name) != null ? _pack$value$datePicke3 : '';
      var monthName = (_pack$value$datePicke5 = (_pack$value$datePicke6 = pack.value.datePickerMonthDict) == null ? void 0 : _pack$value$datePicke6[chooseMonth.value.index].name) != null ? _pack$value$datePicke5 : '';
      var showDay = padStart(chooseDay.value, 2, '0');
      if (pack.value.lang === 'zh-CN') return chooseMonth.value.index + "-" + showDay + " " + weekName.slice(0, 3);
      return weekName.slice(0, 3) + ", " + monthName.slice(0, 3) + " " + chooseDay.value;
    });
    var getPanelType = computed(() => {
      if (isYearPanel.value) return 'year';
      if (props.type === 'month' || isMonthPanel.value) return 'month';
      if (props.type === 'date') return 'date';
      return '';
    });
    var isUntouchable = computed(() => {
      return !props.touchable || ['', 'year'].includes(getPanelType.value);
    });
    var slotProps = computed(() => {
      var _chooseMonth$value, _chooseYear$value, _chooseMonth$value$in, _chooseMonth$value2;
      var weekIndex = dayjs(chooseYear.value + "-" + ((_chooseMonth$value = chooseMonth.value) == null ? void 0 : _chooseMonth$value.index) + "-" + chooseDay.value).day();
      var date = chooseDay.value ? padStart(chooseDay.value, 2, '0') : '';
      return {
        week: "" + weekIndex,
        year: (_chooseYear$value = chooseYear.value) != null ? _chooseYear$value : '',
        month: (_chooseMonth$value$in = (_chooseMonth$value2 = chooseMonth.value) == null ? void 0 : _chooseMonth$value2.index) != null ? _chooseMonth$value$in : '',
        date
      };
    });
    var formatRange = computed(() => getChoose.value.chooseRangeDay.map(choose => dayjs(choose).format('YYYY-MM-DD')));
    var isSameYear = computed(() => chooseYear.value === previewYear.value);
    var isSameMonth = computed(() => {
      var _chooseMonth$value3;
      return ((_chooseMonth$value3 = chooseMonth.value) == null ? void 0 : _chooseMonth$value3.index) === previewMonth.value.index;
    });
    var clickEl = type => {
      if (type === 'year') isYearPanel.value = true;else if (type === 'month') isMonthPanel.value = true;else {
        isYearPanel.value = false;
        isMonthPanel.value = false;
      }
    };
    var handleTouchstart = event => {
      if (isUntouchable.value) return;
      var {
        clientX,
        clientY
      } = event.touches[0];
      startX = clientX;
      startY = clientY;
    };
    var getDirection = (x, y) => {
      return x >= y && x > 20 ? 'x' : 'y';
    };
    var handleTouchmove = event => {
      if (isUntouchable.value) return;
      var {
        clientX,
        clientY
      } = event.touches[0];
      var x = clientX - startX;
      var y = clientY - startY;
      touchDirection = getDirection(Math.abs(x), Math.abs(y));
      checkType = x > 0 ? 'prev' : 'next';
    };
    var handleTouchend = () => {
      if (isUntouchable.value || touchDirection !== 'x') return;
      var componentRef = getPanelType.value === 'month' ? monthPanelEl : dayPanelEl;
      nextTickFrame(() => {
        componentRef.value.forwardRef(checkType);
        resetState();
      });
    };
    var updateRange = (date, type) => {
      var rangeDate = type === 'month' ? chooseRangeMonth : chooseRangeDay;
      rangeDate.value = rangeDone.value ? [date, date] : [rangeDate.value[0], date];
      rangeDone.value = !rangeDone.value;
      if (rangeDone.value) {
        var isChangeOrder = dayjs(rangeDate.value[0]).isAfter(rangeDate.value[1]);
        var _date = isChangeOrder ? [rangeDate.value[1], rangeDate.value[0]] : [...rangeDate.value];
        call(props['onUpdate:modelValue'], _date);
        call(props.onChange, _date);
      }
    };
    var updateMultiple = (date, type) => {
      var multipleDates = type === 'month' ? chooseMonths : chooseDays;
      var formatType = type === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD';
      var formatDates = multipleDates.value.map(date => dayjs(date).format(formatType));
      var index = formatDates.findIndex(choose => choose === date);
      if (index === -1) formatDates.push(date);else formatDates.splice(index, 1);
      call(props['onUpdate:modelValue'], formatDates);
      call(props.onChange, formatDates);
    };
    var getReverse = (dateType, date) => {
      if (!chooseYear.value || !chooseMonth.value) return false;
      if (!isSameYear.value) return chooseYear.value > previewYear.value;
      if (dateType === 'month') return date.index < chooseMonth.value.index;
      return isSameMonth.value ? date < toNumber(chooseDay.value) : chooseMonth.value.index > previewMonth.value.index;
    };
    var getChooseDay = day => {
      var {
        readonly,
        range,
        multiple,
        onChange,
        'onUpdate:modelValue': updateModelValue
      } = props;
      if (day < 0 || readonly) return;
      reverse.value = getReverse('day', day);
      var date = previewYear.value + "-" + previewMonth.value.index + "-" + day;
      var formatDate = dayjs(date).format('YYYY-MM-DD');
      if (range) updateRange(formatDate, 'day');else if (multiple) updateMultiple(formatDate, 'day');else {
        call(updateModelValue, formatDate);
        call(onChange, formatDate);
      }
    };
    var getChooseMonth = month => {
      var {
        type,
        readonly,
        range,
        multiple,
        onChange,
        onPreview,
        'onUpdate:modelValue': updateModelValue
      } = props;
      reverse.value = getReverse('month', month);
      if (type === 'month' && !readonly) {
        var date = previewYear.value + "-" + month.index;
        if (range) updateRange(date, 'month');else if (multiple) updateMultiple(date, 'month');else {
          call(updateModelValue, date);
          call(onChange, date);
        }
      } else {
        previewMonth.value = month;
        call(onPreview, toNumber(previewYear.value), toNumber(previewMonth.value.index));
      }
      isMonthPanel.value = false;
    };
    var getChooseYear = year => {
      previewYear.value = "" + year;
      isYearPanel.value = false;
      isMonthPanel.value = true;
      call(props.onPreview, toNumber(previewYear.value), toNumber(previewMonth.value.index));
    };
    var checkPreview = (type, checkType) => {
      var changeValue = checkType === 'prev' ? -1 : 1;
      if (type === 'year') {
        previewYear.value = "" + (toNumber(previewYear.value) + changeValue);
      } else {
        var checkIndex = toNumber(previewMonth.value.index) + changeValue;
        if (checkIndex < 1) {
          previewYear.value = "" + (toNumber(previewYear.value) - 1);
          checkIndex = 12;
        }
        if (checkIndex > 12) {
          previewYear.value = "" + (toNumber(previewYear.value) + 1);
          checkIndex = 1;
        }
        previewMonth.value = MONTH_LIST.find(month => toNumber(month.index) === checkIndex);
      }
      call(props.onPreview, toNumber(previewYear.value), toNumber(previewMonth.value.index));
    };
    var checkValue = () => {
      if ((props.multiple || props.range) && !isArray(props.modelValue)) {
        console.error('[Varlet] DatePicker: type of prop "modelValue" should be an Array');
        return false;
      }
      if (!props.multiple && !props.range && isArray(props.modelValue)) {
        console.error('[Varlet] DatePicker: type of prop "modelValue" should be a String');
        return false;
      }
      return true;
    };
    var invalidFormatDate = date => {
      if (isArray(date)) return false;
      if (date === 'Invalid Date') {
        console.error('[Varlet] DatePicker: "modelValue" is an Invalid Date');
        return true;
      }
      return false;
    };
    var rangeInit = (value, type) => {
      var rangeDate = type === 'month' ? chooseRangeMonth : chooseRangeDay;
      var formatType = type === 'month' ? 'YYYY-MM' : 'YYYY-MM-D';
      var formatDateList = value.map(choose => dayjs(choose).format(formatType)).slice(0, 2);
      var isValid = rangeDate.value.some(date => invalidFormatDate(date));
      if (isValid) return;
      rangeDate.value = formatDateList;
      var isChangeOrder = dayjs(rangeDate.value[0]).isAfter(rangeDate.value[1]);
      if (rangeDate.value.length === 2 && isChangeOrder) {
        rangeDate.value = [rangeDate.value[1], rangeDate.value[0]];
      }
    };
    var multipleInit = (value, type) => {
      var rangeDate = type === 'month' ? chooseMonths : chooseDays;
      var formatType = type === 'month' ? 'YYYY-MM' : 'YYYY-MM-D';

      // 需要去重
      var formatDateList = Array.from(new Set(value.map(choose => dayjs(choose).format(formatType))));
      rangeDate.value = formatDateList.filter(date => date !== 'Invalid Date');
    };
    var dateInit = value => {
      var formatDate = dayjs(value).format('YYYY-MM-D');
      if (invalidFormatDate(formatDate)) return;
      var [yearValue, monthValue, dayValue] = formatDate.split('-');
      var monthDes = MONTH_LIST.find(month => month.index === monthValue);
      chooseMonth.value = monthDes;
      chooseYear.value = yearValue;
      chooseDay.value = dayValue;
      previewMonth.value = monthDes;
      previewYear.value = yearValue;
    };
    var resetState = () => {
      startY = 0;
      startX = 0;
      checkType = '';
      touchDirection = undefined;
    };
    watch(() => props.modelValue, value => {
      if (!checkValue() || invalidFormatDate(value) || !value) return;
      if (props.range) {
        if (!isArray(value)) return;
        rangeDone.value = value.length !== 1;
        rangeInit(value, props.type);
      } else if (props.multiple) {
        if (!isArray(value)) return;
        multipleInit(value, props.type);
      } else {
        dateInit(value);
      }
    }, {
      immediate: true
    });
    watch(getPanelType, resetState);
    return {
      n,
      classes,
      monthPanelEl,
      dayPanelEl,
      reverse,
      currentDate,
      chooseMonth,
      chooseYear,
      chooseDay,
      previewYear,
      isYearPanel,
      isMonthPanel,
      getMonthTitle,
      getDateTitle,
      getPanelType,
      getChoose,
      getPreview,
      componentProps,
      slotProps,
      formatRange,
      clickEl,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      getChooseDay,
      getChooseMonth,
      getChooseYear,
      checkPreview,
      formatElevation
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;