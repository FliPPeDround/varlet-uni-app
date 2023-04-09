import Ripple from '../ripple/index.mjs';
import { defineComponent } from 'vue';
import { call, createNamespace, formatElevation } from '../utils/components.mjs';
import { props } from './props.mjs';
import { toSizeUnit } from '../utils/elements.mjs';
var {
  n,
  classes
} = createNamespace('paper');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, resolveDirective as _resolveDirective, openBlock as _openBlock, createElementBlock as _createElementBlock, withDirectives as _withDirectives } from "vue";
function __render__(_ctx, _cache) {
  var _directive_ripple = _resolveDirective("ripple");
  return _withDirectives((_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box'), _ctx.formatElevation(_ctx.elevation, 2), [_ctx.onClick, _ctx.n('--cursor')], [_ctx.round, _ctx.n('--round')], [_ctx.inline, _ctx.n('$--inline-flex')])),
    style: _normalizeStyle({
      width: _ctx.toSizeUnit(_ctx.width),
      height: _ctx.toSizeUnit(_ctx.height),
      'border-radius': _ctx.toSizeUnit(_ctx.radius)
    }),
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.handleClick && _ctx.handleClick(...arguments);
    })
  }, [_renderSlot(_ctx.$slots, "default")], 6 /* CLASS, STYLE */)), [[_directive_ripple, {
    disabled: !_ctx.ripple
  }]]);
}
var __sfc__ = defineComponent({
  name: 'VarPaper',
  directives: {
    Ripple
  },
  props,
  setup(props) {
    var handleClick = e => {
      call(props.onClick, e);
    };
    return {
      n,
      classes,
      formatElevation,
      toSizeUnit,
      handleClick
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;