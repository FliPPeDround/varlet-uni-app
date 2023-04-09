import { defineComponent } from 'vue';
import { toSizeUnit } from '../utils/elements.mjs';
import { createNamespace, formatElevation } from '../utils/components.mjs';
import { props } from './props.mjs';
var {
  n,
  classes
} = createNamespace('table');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.formatElevation(_ctx.elevation, 1), _ctx.n('$--box')))
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('main'))
  }, [_createElementVNode("table", {
    class: _normalizeClass(_ctx.n('table')),
    style: _normalizeStyle({
      width: _ctx.toSizeUnit(_ctx.fullWidth)
    })
  }, [_renderSlot(_ctx.$slots, "default")], 6 /* CLASS, STYLE */)], 2 /* CLASS */), _ctx.$slots.footer ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('footer'))
  }, [_renderSlot(_ctx.$slots, "footer")], 2 /* CLASS */)) : _createCommentVNode("v-if", true)], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarTable',
  props,
  setup() {
    return {
      toSizeUnit,
      n,
      classes,
      formatElevation
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;