import { defineComponent } from 'vue';
import { createNamespace } from '../utils/components.mjs';
import { toNumber } from '@varlet/shared';
var {
  n,
  classes
} = createNamespace('result');
import { normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock(_Fragment, null, [_createElementVNode("span", {
    class: _normalizeClass(_ctx.n('success-cover-left'))
  }, null, 2 /* CLASS */), _createElementVNode("span", {
    class: _normalizeClass(_ctx.classes(_ctx.n('success-line'), _ctx.n('success-line-tip'))),
    style: _normalizeStyle({
      animationDuration: _ctx.animation ? "760ms" : '0ms',
      borderRadius: "calc(" + _ctx.borderSize + " * 0.625)"
    })
  }, null, 6 /* CLASS, STYLE */), _createElementVNode("span", {
    class: _normalizeClass(_ctx.classes(_ctx.n('success-line'), _ctx.n('success-line-long'))),
    style: _normalizeStyle({
      animationDuration: _ctx.animation ? "770ms" : '0ms',
      borderRadius: "calc(" + _ctx.borderSize + " * 0.625)"
    })
  }, null, 6 /* CLASS, STYLE */), _createElementVNode("span", {
    ref: "circle",
    class: _normalizeClass(_ctx.n('success-circle')),
    style: _normalizeStyle({
      left: "-" + _ctx.borderSize,
      top: "-" + _ctx.borderSize,
      borderWidth: _ctx.borderSize
    })
  }, null, 6 /* CLASS, STYLE */), _createElementVNode("span", {
    class: _normalizeClass(_ctx.n('success-line-fix'))
  }, null, 2 /* CLASS */), _createElementVNode("span", {
    class: _normalizeClass(_ctx.n('success-cover-right')),
    style: _normalizeStyle({
      animationDuration: _ctx.animation ? "4250ms" : '0ms'
    })
  }, null, 6 /* CLASS, STYLE */)], 64 /* STABLE_FRAGMENT */);
}

var __sfc__ = defineComponent({
  props: {
    animation: {
      type: Boolean
    },
    borderSize: {
      type: String
    }
  },
  setup() {
    return {
      n,
      classes,
      toNumber
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;