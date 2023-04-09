import dayjs from 'dayjs/esm';
import { defineComponent, computed } from 'vue';
import { toNumber } from '@varlet/shared';
import { createNamespace } from '../../utils/components.mjs';
import { useMounted } from '@varlet/use';
var {
  n,
  classes
} = createNamespace('year-picker');
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = ["onClick"];
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("ul", {
    class: _normalizeClass(_ctx.n())
  }, [(_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.yearList, year => {
    return _openBlock(), _createElementBlock("li", {
      key: year,
      class: _normalizeClass(_ctx.classes(_ctx.n('item'), [year === _ctx.toNumber(_ctx.preview), _ctx.n('item--active')])),
      style: _normalizeStyle({
        color: year === _ctx.toNumber(_ctx.preview) ? _ctx.componentProps.color : ''
      }),
      onClick: $event => _ctx.chooseYear(year)
    }, _toDisplayString(year), 15 /* TEXT, CLASS, STYLE, PROPS */, _hoisted_1);
  }), 128 /* KEYED_FRAGMENT */))], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'YearPickerPanel',
  props: {
    preview: {
      type: String
    },
    componentProps: {
      type: Object,
      required: true
    }
  },
  emits: ['choose-year'],
  setup(props, _ref) {
    var {
      emit
    } = _ref;
    var yearList = computed(() => {
      var list = [];
      var {
        preview,
        componentProps: {
          max,
          min
        }
      } = props;
      if (!preview) return list;
      var yearRange = [toNumber(preview) + 100, toNumber(preview) - 100];
      if (max) {
        var formatMax = dayjs(max).format('YYYY-MM-D');
        var year = toNumber(formatMax.split('-')[0]);
        if (year < yearRange[0] && year > yearRange[1]) yearRange = [year, yearRange[1]];
        if (year <= yearRange[1]) return [year];
      }
      if (min) {
        var formatMin = dayjs(min).format('YYYY-MM-D');
        var _year = toNumber(formatMin.split('-')[0]);
        if (_year < yearRange[0] && _year > yearRange[1]) yearRange = [yearRange[0], _year];
        if (_year >= yearRange[0]) return [_year];
      }
      for (var i = yearRange[0]; i >= yearRange[1]; i--) {
        list.push(i);
      }
      return list;
    });
    var chooseYear = year => {
      emit('choose-year', year);
    };
    useMounted(() => {
      var activeEl = document.querySelector("." + n('item--active'));
      activeEl == null ? void 0 : activeEl.scrollIntoView({
        block: 'center'
      });
    });
    return {
      n,
      classes,
      yearList,
      chooseYear,
      toNumber
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;