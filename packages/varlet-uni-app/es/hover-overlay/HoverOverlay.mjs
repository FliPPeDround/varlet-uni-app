import { defineComponent } from 'vue';
import { props } from './props.mjs';
import { createNamespace } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('hover-overlay');
import { normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), [_ctx.hovering, _ctx.n('--hovering')]))
  }, null, 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarHoverOverlay',
  props,
  setup() {
    return {
      n,
      classes
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;