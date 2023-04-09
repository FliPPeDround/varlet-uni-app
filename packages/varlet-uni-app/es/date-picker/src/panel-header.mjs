import VarButton from '../../button/index.mjs';
import VarIcon from '../../icon/index.mjs';
import { defineComponent, ref, computed, watch } from 'vue';
import { toNumber } from '@varlet/shared';
import { createNamespace } from '../../utils/components.mjs';
import { pack } from '../../locale/index.mjs';
var {
  n
} = createNamespace('picker-header');
import { resolveComponent as _resolveComponent, createVNode as _createVNode, withCtx as _withCtx, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, Transition as _Transition, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  var _component_var_button = _resolveComponent("var-button");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n())
  }, [_createVNode(_component_var_button, {
    round: "",
    text: "",
    style: {
      "filter": "opacity(0.54)"
    },
    disabled: _ctx.disabled.left,
    onClick: _cache[0] || (_cache[0] = $event => _ctx.checkDate('prev'))
  }, {
    default: _withCtx(() => [_createVNode(_component_var_icon, {
      name: "chevron-left"
    })]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["disabled"]), _createElementVNode("div", {
    class: _normalizeClass(_ctx.n('value')),
    onClick: _cache[1] || (_cache[1] = $event => _ctx.$emit('check-panel'))
  }, [_createVNode(_Transition, {
    name: "var-date-picker" + (_ctx.reverse ? '-reverse' : '') + "-translatex"
  }, {
    default: _withCtx(() => [(_openBlock(), _createElementBlock("div", {
      key: _ctx.showDate
    }, _toDisplayString(_ctx.showDate), 1 /* TEXT */))]),

    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["name"])], 2 /* CLASS */), _createVNode(_component_var_button, {
    round: "",
    text: "",
    style: {
      "filter": "opacity(0.54)"
    },
    disabled: _ctx.disabled.right,
    onClick: _cache[2] || (_cache[2] = $event => _ctx.checkDate('next'))
  }, {
    default: _withCtx(() => [_createVNode(_component_var_icon, {
      name: "chevron-right"
    })]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["disabled"])], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'PanelHeader',
  components: {
    VarButton,
    VarIcon
  },
  props: {
    date: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: 'date'
    },
    disabled: {
      type: Object,
      required: true
    }
  },
  emits: ['check-panel', 'check-date'],
  setup(props, _ref) {
    var {
      emit
    } = _ref;
    var reverse = ref(false);
    var forwardOrBackNum = ref(0);
    var showDate = computed(() => {
      var _pack$value$datePicke;
      var {
        date,
        type
      } = props;
      var {
        previewMonth,
        previewYear
      } = date;
      if (type === 'month') return toNumber(previewYear) + forwardOrBackNum.value;
      var monthName = (_pack$value$datePicke = pack.value.datePickerMonthDict) == null ? void 0 : _pack$value$datePicke[previewMonth.index].name;
      return pack.value.lang === 'zh-CN' ? previewYear + " " + monthName : monthName + " " + previewYear;
    });
    var checkDate = checkType => {
      if (checkType === 'prev' && props.disabled.left || checkType === 'next' && props.disabled.right) return;
      emit('check-date', checkType);
      reverse.value = checkType === 'prev';
      forwardOrBackNum.value += checkType === 'prev' ? -1 : 1;
    };
    watch(() => props.date, () => {
      forwardOrBackNum.value = 0;
    });
    return {
      n,
      reverse,
      showDate,
      checkDate
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;