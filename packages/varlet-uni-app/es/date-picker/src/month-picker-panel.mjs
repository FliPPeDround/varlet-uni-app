function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { defineComponent, ref, computed, reactive, watch } from 'vue';
import dayjs from 'dayjs/esm';
import isSameOrBefore from 'dayjs/esm/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/esm/plugin/isSameOrAfter';
import { MONTH_LIST } from '../props.mjs';
import PanelHeader from './panel-header.mjs';
import VarButton from '../../button/index.mjs';
import { toNumber } from '@varlet/shared';
import { createNamespace } from '../../utils/components.mjs';
import { pack } from '../../locale/index.mjs';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
var {
  n,
  classes
} = createNamespace('month-picker');
var {
  n: nDate
} = createNamespace('date-picker');
import { resolveComponent as _resolveComponent, createVNode as _createVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, mergeProps as _mergeProps, withCtx as _withCtx, Transition as _Transition, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode } from "vue";
function __render__(_ctx, _cache) {
  var _component_panel_header = _resolveComponent("panel-header");
  var _component_var_button = _resolveComponent("var-button");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n())
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('content'))
  }, [_createVNode(_component_panel_header, {
    ref: "headerEl",
    type: "month",
    date: _ctx.preview,
    disabled: _ctx.panelBtnDisabled,
    onCheckPanel: _ctx.clickYear,
    onCheckDate: _ctx.checkDate
  }, null, 8 /* PROPS */, ["date", "disabled", "onCheckPanel", "onCheckDate"]), _createVNode(_Transition, {
    name: "" + _ctx.nDate() + (_ctx.reverse ? '-reverse' : '') + "-translatex"
  }, {
    default: _withCtx(() => [(_openBlock(), _createElementBlock("ul", {
      key: _ctx.panelKey
    }, [(_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.MONTH_LIST, month => {
      return _openBlock(), _createElementBlock("li", {
        key: month.index
      }, [_createVNode(_component_var_button, _mergeProps({
        type: "primary",
        "var-month-picker-cover": "",
        ripple: false,
        elevation: _ctx.componentProps.buttonElevation
      }, _extends({}, _ctx.buttonProps(month.index)), {
        onClick: event => _ctx.chooseMonth(month, event)
      }), {
        default: _withCtx(() => [_createTextVNode(_toDisplayString(_ctx.getMonthAbbr(month.index)), 1 /* TEXT */)]),

        _: 2 /* DYNAMIC */
      }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["elevation", "onClick"])]);
    }), 128 /* KEYED_FRAGMENT */))]))]),

    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["name"])], 2 /* CLASS */)], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'MonthPickerPanel',
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
    clickYear: {
      type: Function,
      required: true
    },
    componentProps: {
      type: Object,
      required: true
    }
  },
  emits: ['check-preview', 'choose-month'],
  setup(props, _ref) {
    var {
      emit
    } = _ref;
    var [currentYear, currentMonth] = props.current.split('-');
    var reverse = ref(false);
    var panelKey = ref(0);
    var headerEl = ref(null);
    var panelBtnDisabled = reactive({
      left: false,
      right: false
    });
    var isSameYear = computed(() => props.choose.chooseYear === props.preview.previewYear);
    var isCurrentYear = computed(() => props.preview.previewYear === currentYear);
    var getMonthAbbr = key => {
      var _pack$value$datePicke, _pack$value$datePicke2;
      return (_pack$value$datePicke = (_pack$value$datePicke2 = pack.value.datePickerMonthDict) == null ? void 0 : _pack$value$datePicke2[key].abbr) != null ? _pack$value$datePicke : '';
    };
    var inRange = key => {
      var {
        preview: {
          previewYear
        },
        componentProps: {
          min,
          max
        }
      } = props;
      var isBeforeMax = true;
      var isAfterMin = true;
      var previewDate = previewYear + "-" + key;
      if (max) isBeforeMax = dayjs(previewDate).isSameOrBefore(dayjs(max), 'month');
      if (min) isAfterMin = dayjs(previewDate).isSameOrAfter(dayjs(min), 'month');
      return isBeforeMax && isAfterMin;
    };
    var shouldChoose = val => {
      var {
        choose: {
          chooseMonths,
          chooseDays,
          chooseRangeMonth
        },
        componentProps: {
          type,
          range
        }
      } = props;
      if (range) {
        if (!chooseRangeMonth.length) return false;
        var isBeforeMax = dayjs(val).isSameOrBefore(dayjs(chooseRangeMonth[1]), 'month');
        var isAfterMin = dayjs(val).isSameOrAfter(dayjs(chooseRangeMonth[0]), 'month');
        return isBeforeMax && isAfterMin;
      }
      if (type === 'month') return chooseMonths.includes(val);
      return chooseDays.some(value => value.includes(val));
    };
    var buttonProps = key => {
      var {
        choose: {
          chooseMonth
        },
        preview: {
          previewYear
        },
        componentProps: {
          allowedDates,
          color,
          multiple,
          range
        }
      } = props;
      var val = previewYear + "-" + key;
      var monthExist = () => {
        if (range || multiple) return shouldChoose(val);
        return (chooseMonth == null ? void 0 : chooseMonth.index) === key && isSameYear.value;
      };
      var computeDisabled = () => {
        if (!inRange(key)) return true;
        if (!allowedDates) return false;
        return !allowedDates(val);
      };
      var disabled = computeDisabled();
      var computeText = () => {
        if (disabled) return true;
        if (range || multiple) return !shouldChoose(val);
        return !isSameYear.value || (chooseMonth == null ? void 0 : chooseMonth.index) !== key;
      };
      var computeOutline = () => {
        // 不满足基本条件， 基本条件为当前年、当前月并且 showCurrent 为true的情况
        if (!(isCurrentYear.value && currentMonth === key && props.componentProps.showCurrent)) return false;

        // 存在着 disabled
        if ((range || multiple || isSameYear.value) && disabled) return true;

        // 在选择范围之外
        if (range || multiple) return !shouldChoose(val);

        // 同一年但是未被选择的情况
        if (isSameYear.value) return (chooseMonth == null ? void 0 : chooseMonth.index) !== currentMonth;
        return true;
      };
      var textColorOrCover = () => {
        if (disabled) return '';
        if (computeOutline()) return color != null ? color : '';
        if (monthExist()) return '';
        return nDate() + "-color-cover";
      };
      var isCover = textColorOrCover().startsWith(nDate());
      return {
        outline: computeOutline(),
        text: computeText(),
        color: !computeText() ? color : '',
        textColor: isCover ? '' : textColorOrCover(),
        [nDate() + "-color-cover"]: isCover,
        class: classes(n('button'), [disabled, n('button--disabled')])
      };
    };
    var chooseMonth = (month, event) => {
      var buttonEl = event.currentTarget;
      if (buttonEl.classList.contains(n('button--disabled'))) return;
      emit('choose-month', month);
    };
    var checkDate = checkType => {
      reverse.value = checkType === 'prev';
      panelKey.value += checkType === 'prev' ? -1 : 1;
      emit('check-preview', 'year', checkType);
    };

    // expose for internal
    var forwardRef = checkType => {
      headerEl.value.checkDate(checkType);
    };
    watch(() => props.preview.previewYear, year => {
      var {
        componentProps: {
          min,
          max
        }
      } = props;
      if (max) panelBtnDisabled.right = !dayjs("" + (toNumber(year) + 1)).isSameOrBefore(dayjs(max), 'year');
      if (min) panelBtnDisabled.left = !dayjs("" + (toNumber(year) - 1)).isSameOrAfter(dayjs(min), 'year');
    }, {
      immediate: true
    });
    return {
      n,
      nDate,
      pack,
      MONTH_LIST,
      headerEl,
      reverse,
      panelKey,
      panelBtnDisabled,
      forwardRef,
      buttonProps,
      getMonthAbbr,
      chooseMonth,
      checkDate
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;