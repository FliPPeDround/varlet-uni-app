import { defineComponent, ref, computed, watch } from 'vue';
import { isPlainObject, toNumber } from '@varlet/shared';
import { props } from './props.mjs';
import { useRow } from './provide.mjs';
import { padStartFlex, toSizeUnit } from '../utils/elements.mjs';
import { createNamespace, call } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('col');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box'), [_ctx.span >= 0, _ctx.n("--span-" + _ctx.span)], [_ctx.offset, _ctx.n("--offset-" + _ctx.offset)], ..._ctx.getSize('xs', _ctx.xs), ..._ctx.getSize('sm', _ctx.sm), ..._ctx.getSize('md', _ctx.md), ..._ctx.getSize('lg', _ctx.lg), ..._ctx.getSize('xl', _ctx.xl))),
    style: _normalizeStyle({
      flexDirection: _ctx.direction,
      justifyContent: _ctx.padStartFlex(_ctx.justify),
      alignItems: _ctx.padStartFlex(_ctx.align),
      paddingLeft: _ctx.toSizeUnit(_ctx.padding.left),
      paddingRight: _ctx.toSizeUnit(_ctx.padding.right)
    }),
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.handleClick && _ctx.handleClick(...arguments);
    })
  }, [_renderSlot(_ctx.$slots, "default")], 6 /* CLASS, STYLE */);
}

var __sfc__ = defineComponent({
  name: 'VarCol',
  props,
  setup(props) {
    var padding = ref({
      left: 0,
      right: 0
    });
    var span = computed(() => toNumber(props.span));
    var offset = computed(() => toNumber(props.offset));
    var {
      row,
      bindRow
    } = useRow();
    var colProvider = {
      setPadding(pad) {
        padding.value = pad;
      }
    };
    var getSize = (mode, size) => {
      var classes = [];
      if (size == null) {
        return classes;
      }
      if (isPlainObject(size)) {
        var {
          offset: _offset,
          span: _span
        } = size;
        Number(_span) >= 0 && classes.push(n("--span-" + mode + "-" + _span));
        _offset && classes.push(n("--offset-" + mode + "-" + _offset));
      } else {
        Number(size) >= 0 && classes.push(n("--span-" + mode + "-" + size));
      }
      return classes;
    };
    var handleClick = e => {
      call(props.onClick, e);
    };
    watch([() => props.span, () => props.offset], () => {
      row == null ? void 0 : row.computePadding();
    });
    call(bindRow, colProvider);
    return {
      n,
      classes,
      padding,
      toNumber,
      toSizeUnit,
      getSize,
      span,
      offset,
      handleClick,
      padStartFlex
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;