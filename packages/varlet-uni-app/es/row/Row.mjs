import { defineComponent, computed, watch } from 'vue';
import { props } from './props.mjs';
import { useCols } from './provide.mjs';
import { toPxNum, padStartFlex } from '../utils/elements.mjs';
import { call, createNamespace } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('row');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box'))),
    style: _normalizeStyle({
      justifyContent: _ctx.padStartFlex(_ctx.justify),
      alignItems: _ctx.padStartFlex(_ctx.align),
      margin: _ctx.average ? "0 -" + _ctx.average + "px" : undefined
    }),
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.handleClick && _ctx.handleClick(...arguments);
    })
  }, [_renderSlot(_ctx.$slots, "default")], 6 /* CLASS, STYLE */);
}

var __sfc__ = defineComponent({
  name: 'VarRow',
  props,
  setup(props) {
    var {
      cols,
      bindCols,
      length
    } = useCols();
    var average = computed(() => {
      var gutter = toPxNum(props.gutter);
      return gutter / 2;
    });
    var computePadding = () => {
      cols.forEach(col => {
        col.setPadding({
          left: average.value,
          right: average.value
        });
      });
    };
    var handleClick = e => {
      call(props.onClick, e);
    };
    var rowProvider = {
      computePadding
    };
    watch(() => length.value, computePadding);
    watch(() => props.gutter, computePadding);
    bindCols(rowProvider);
    return {
      n,
      classes,
      average,
      handleClick,
      padStartFlex
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;