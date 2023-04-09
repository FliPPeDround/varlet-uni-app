function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import dayjs from 'dayjs/esm';
import isSameOrBefore from 'dayjs/esm/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/esm/plugin/isSameOrAfter';
import PanelHeader from './panel-header.mjs';
import VarButton from '../../button/index.mjs';
import { defineComponent, ref, computed, watch, reactive } from 'vue';
import { WEEK_HEADER } from '../props.mjs';
import { toNumber } from '@varlet/shared';
import { createNamespace } from '../../utils/components.mjs';
import { pack } from '../../locale/index.mjs';
import { useMounted } from '@varlet/use';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
var {
  n,
  classes
} = createNamespace('day-picker');
var {
  n: nDate
} = createNamespace('date-picker');
import { resolveComponent as _resolveComponent, createVNode as _createVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, createTextVNode as _createTextVNode, mergeProps as _mergeProps, withCtx as _withCtx, Transition as _Transition } from "vue";
function __render__(_ctx, _cache) {
  var _component_panel_header = _resolveComponent("panel-header");
  var _component_var_button = _resolveComponent("var-button");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n())
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('content'))
  }, [_createVNode(_component_panel_header, {
    ref: "headerEl",
    type: "day",
    date: _ctx.preview,
    disabled: _ctx.panelBtnDisabled,
    onCheckPanel: _ctx.clickMonth,
    onCheckDate: _ctx.checkDate
  }, null, 8 /* PROPS */, ["date", "disabled", "onCheckPanel", "onCheckDate"]), _createVNode(_Transition, {
    name: "" + _ctx.nDate() + (_ctx.reverse ? '-reverse' : '') + "-translatex"
  }, {
    default: _withCtx(() => [(_openBlock(), _createElementBlock("div", {
      key: _ctx.panelKey
    }, [_createElementVNode("ul", {
      class: _normalizeClass(_ctx.n('head'))
    }, [(_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.sortWeekList, week => {
      return _openBlock(), _createElementBlock("li", {
        key: week.index
      }, _toDisplayString(_ctx.getDayAbbr(week.index)), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))], 2 /* CLASS */), _createElementVNode("ul", {
      class: _normalizeClass(_ctx.n('body'))
    }, [(_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.days, (day, index) => {
      return _openBlock(), _createElementBlock("li", {
        key: index
      }, [_createVNode(_component_var_button, _mergeProps({
        type: "primary",
        "var-day-picker-cover": "",
        round: "",
        ripple: false,
        elevation: _ctx.componentProps.buttonElevation
      }, _extends({}, _ctx.buttonProps(day)), {
        onClick: event => _ctx.chooseDay(day, event)
      }), {
        default: _withCtx(() => [_createTextVNode(_toDisplayString(_ctx.filterDay(day)), 1 /* TEXT */)]),

        _: 2 /* DYNAMIC */
      }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["elevation", "onClick"])]);
    }), 128 /* KEYED_FRAGMENT */))], 2 /* CLASS */)]))]),

    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["name"])], 2 /* CLASS */)], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'DayPickerPanel',
  components: {
    VarButton,
    PanelHeader
  },
  props: {
    choose: {
      type: Object,
      required: true
    },
    preview: {
      type: Object,
      required: true
    },
    current: {
      type: String,
      required: true
    },
    clickMonth: {
      type: Function,
      required: true
    },
    componentProps: {
      type: Object,
      required: true
    }
  },
  emits: ['check-preview', 'choose-day'],
  setup(props, _ref) {
    var {
      emit
    } = _ref;
    var [currentYear, currentMonth, currentDay] = props.current.split('-');
    var days = ref([]);
    var reverse = ref(false);
    var panelKey = ref(0);
    var headerEl = ref(null);
    var panelBtnDisabled = reactive({
      left: false,
      right: false
    });
    var isCurrent = computed(() => props.preview.previewYear === currentYear && props.preview.previewMonth.index === currentMonth);
    var isSame = computed(() => {
      var _props$choose$chooseM;
      return props.choose.chooseYear === props.preview.previewYear && ((_props$choose$chooseM = props.choose.chooseMonth) == null ? void 0 : _props$choose$chooseM.index) === props.preview.previewMonth.index;
    });
    var sortWeekList = computed(() => {
      var index = WEEK_HEADER.findIndex(week => week.index === props.componentProps.firstDayOfWeek);
      if (index === -1 || index === 0) return WEEK_HEADER;
      return WEEK_HEADER.slice(index).concat(WEEK_HEADER.slice(0, index));
    });
    var getDayAbbr = key => {
      var _pack$value$datePicke, _pack$value$datePicke2;
      return (_pack$value$datePicke = (_pack$value$datePicke2 = pack.value.datePickerWeekDict) == null ? void 0 : _pack$value$datePicke2[key].abbr) != null ? _pack$value$datePicke : '';
    };
    var filterDay = day => day > 0 ? day : '';
    var initDate = () => {
      var {
        preview: {
          previewMonth,
          previewYear
        }
      } = props;
      var monthNum = dayjs(previewYear + "-" + previewMonth.index).daysInMonth();
      var firstDayToWeek = dayjs(previewYear + "-" + previewMonth.index + "-01").day();
      var index = sortWeekList.value.findIndex(week => week.index === "" + firstDayToWeek);
      days.value = [...Array(index).fill(-1), ...Array.from(Array(monthNum + 1).keys())].filter(value => value);
    };
    var initHeader = () => {
      var {
        preview: {
          previewYear,
          previewMonth
        },
        componentProps: {
          max,
          min
        }
      } = props;
      if (max) {
        var date = previewYear + "-" + (toNumber(previewMonth.index) + 1);
        panelBtnDisabled.right = !dayjs(date).isSameOrBefore(dayjs(max), 'month');
      }
      if (min) {
        var _date = previewYear + "-" + (toNumber(previewMonth.index) - 1);
        panelBtnDisabled.left = !dayjs(_date).isSameOrAfter(dayjs(min), 'month');
      }
    };
    var inRange = day => {
      var {
        preview: {
          previewYear,
          previewMonth
        },
        componentProps: {
          min,
          max
        }
      } = props;
      var isBeforeMax = true;
      var isAfterMin = true;
      var previewDate = previewYear + "-" + previewMonth.index + "-" + day;
      if (max) isBeforeMax = dayjs(previewDate).isSameOrBefore(dayjs(max), 'day');
      if (min) isAfterMin = dayjs(previewDate).isSameOrAfter(dayjs(min), 'day');
      return isBeforeMax && isAfterMin;
    };
    var shouldChoose = val => {
      var {
        choose: {
          chooseDays,
          chooseRangeDay
        },
        componentProps: {
          range
        }
      } = props;
      if (range) {
        if (!chooseRangeDay.length) return false;
        var isBeforeMax = dayjs(val).isSameOrBefore(dayjs(chooseRangeDay[1]), 'day');
        var isAfterMin = dayjs(val).isSameOrAfter(dayjs(chooseRangeDay[0]), 'day');
        return isBeforeMax && isAfterMin;
      }
      return chooseDays.includes(val);
    };
    var buttonProps = day => {
      if (day < 0) {
        return {
          text: true,
          outline: false,
          textColor: '',
          class: n('button')
        };
      }
      var {
        choose: {
          chooseDay
        },
        preview: {
          previewYear,
          previewMonth
        },
        componentProps: {
          allowedDates,
          color,
          multiple,
          range
        }
      } = props;
      var val = previewYear + "-" + previewMonth.index + "-" + day;
      var dayExist = () => {
        if (range || multiple) return shouldChoose(val);
        return toNumber(chooseDay) === day && isSame.value;
      };
      var computeDisabled = () => {
        if (!inRange(day)) return true;
        if (!allowedDates) return false;
        return !allowedDates(val);
      };
      var disabled = computeDisabled();
      var computeText = () => {
        if (disabled) return true;
        if (range || multiple) return !shouldChoose(val);
        return !isSame.value || toNumber(chooseDay) !== day;
      };
      var computeOutline = () => {
        // 不满足基本条件， 基本条件为当前年、当前月、当前日并且 showCurrent 为true的情况
        if (!(isCurrent.value && toNumber(currentDay) === day && props.componentProps.showCurrent)) return false;

        // 存在着 disabled
        if ((range || multiple || isSame.value) && disabled) return true;

        // 在选择范围之外
        if (range || multiple) return !shouldChoose(val);

        // 同一年但是未被选择的情况
        if (isSame.value) return chooseDay !== currentDay;
        return true;
      };
      var textColorOrCover = () => {
        if (disabled) return '';
        if (computeOutline()) return color != null ? color : '';
        if (dayExist()) return '';
        return nDate() + "-color-cover";
      };
      var isCover = textColorOrCover().startsWith(nDate());
      return {
        text: computeText(),
        outline: computeOutline(),
        textColor: isCover ? '' : textColorOrCover(),
        [nDate() + "-color-cover"]: isCover,
        class: classes(n('button'), n('button--usable'), [disabled, n('button--disabled')])
      };
    };
    var checkDate = checkType => {
      reverse.value = checkType === 'prev';
      panelKey.value += checkType === 'prev' ? -1 : 1;
      emit('check-preview', 'month', checkType);
    };
    var chooseDay = (day, event) => {
      var buttonEl = event.currentTarget;
      if (buttonEl.classList.contains(n('button--disabled'))) return;
      emit('choose-day', day);
    };

    // expose for internal
    var forwardRef = checkType => {
      headerEl.value.checkDate(checkType);
    };
    useMounted(() => {
      initDate();
      initHeader();
    });
    watch(() => props.preview, () => {
      initDate();
      initHeader();
    });
    return {
      n,
      nDate,
      days,
      reverse,
      headerEl,
      panelKey,
      sortWeekList,
      panelBtnDisabled,
      forwardRef,
      filterDay,
      getDayAbbr,
      checkDate,
      chooseDay,
      buttonProps
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;