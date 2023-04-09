import { defineComponent } from 'vue';
import VarSnackbarCore from './core.mjs';
import { createNamespace, useTeleport } from '../utils/components.mjs';
import { props } from './props.mjs';
var {
  n
} = createNamespace('snackbar');
import { renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, resolveComponent as _resolveComponent, mergeProps as _mergeProps, withCtx as _withCtx, createVNode as _createVNode, Transition as _Transition, Teleport as _Teleport, openBlock as _openBlock, createBlock as _createBlock } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_snackbar_core = _resolveComponent("var-snackbar-core");
  return _openBlock(), _createBlock(_Teleport, {
    to: _ctx.teleport,
    disabled: _ctx.disabled
  }, [_createVNode(_Transition, {
    name: _ctx.n() + "-fade",
    onAfterEnter: _ctx.onOpened,
    onAfterLeave: _ctx.onClosed
  }, {
    default: _withCtx(() => [_createVNode(_component_var_snackbar_core, _mergeProps(_ctx.$props, {
      class: _ctx.n('transition')
    }), {
      action: _withCtx(() => [_renderSlot(_ctx.$slots, "action")]),
      default: _withCtx(() => [_renderSlot(_ctx.$slots, "default", {}, () => [_createTextVNode(_toDisplayString(_ctx.content), 1 /* TEXT */)])]),

      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */, ["class"])]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name", "onAfterEnter", "onAfterLeave"])], 8 /* PROPS */, ["to", "disabled"]);
}
var __sfc__ = defineComponent({
  name: 'VarSnackbar',
  components: {
    VarSnackbarCore
  },
  props,
  setup() {
    var {
      disabled
    } = useTeleport();
    return {
      n,
      disabled
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;