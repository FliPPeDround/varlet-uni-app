import { defineComponent, computed } from 'vue';
import { props } from './props.mjs';
import { createNamespace } from '../utils/components.mjs';
import { toSizeUnit } from '../utils/elements.mjs';
var {
  n,
  classes
} = createNamespace('avatar-group');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), [_ctx.vertical, _ctx.n('--column'), _ctx.n('--row')])),
    style: _normalizeStyle(_ctx.rootStyles)
  }, [_renderSlot(_ctx.$slots, "default")], 6 /* CLASS, STYLE */);
}

var __sfc__ = defineComponent({
  name: 'VarAvatarGroup',
  props,
  setup(props) {
    var rootStyles = computed(() => {
      if (props.offset == null) {
        return {};
      }
      return {
        '--avatar-group-offset': toSizeUnit(props.offset)
      };
    });
    return {
      n,
      classes,
      toSizeUnit,
      rootStyles
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;