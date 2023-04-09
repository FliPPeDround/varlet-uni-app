import { computed, defineComponent } from 'vue';
import { useButtons } from './provide.mjs';
import { createNamespace, formatElevation } from '../utils/components.mjs';
import { props } from './props.mjs';
var {
  n,
  classes
} = createNamespace('button-group');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box'), [_ctx.mode, "" + _ctx.n("--mode-" + _ctx.mode)], [_ctx.vertical, _ctx.n('--vertical'), _ctx.n('--horizontal')], [_ctx.mode === 'normal', _ctx.formatElevation(_ctx.elevation, 2)]))
  }, [_renderSlot(_ctx.$slots, "default")], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarButtonGroup',
  props,
  setup(props) {
    var {
      bindButtons
    } = useButtons();
    var buttonGroupProvider = {
      elevation: computed(() => props.elevation),
      type: computed(() => props.type),
      size: computed(() => props.size),
      color: computed(() => props.color),
      textColor: computed(() => props.textColor),
      mode: computed(() => props.mode)
    };
    bindButtons(buttonGroupProvider);
    return {
      n,
      classes,
      formatElevation
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;