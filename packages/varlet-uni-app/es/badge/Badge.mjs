import VarIcon from '../icon/index.mjs';
import { toNumber } from '@varlet/shared';
import { computed, defineComponent } from 'vue';
import { props } from './props.mjs';
import { createNamespace } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('badge');
import { renderSlot as _renderSlot, resolveComponent as _resolveComponent, normalizeClass as _normalizeClass, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementBlock as _createElementBlock, vShow as _vShow, mergeProps as _mergeProps, createElementVNode as _createElementVNode, withDirectives as _withDirectives, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box')))
  }, [_renderSlot(_ctx.$slots, "default"), _createVNode(_Transition, {
    name: _ctx.n('$-badge-fade')
  }, {
    default: _withCtx(() => [_withDirectives(_createElementVNode("span", _mergeProps({
      class: _ctx.classes(_ctx.n('content'), _ctx.n("--" + _ctx.type), [_ctx.$slots.default, _ctx.n("--" + _ctx.position)], [_ctx.dot, _ctx.n('--dot')], [_ctx.icon, _ctx.n('--icon')]),
      style: {
        background: _ctx.color
      }
    }, _ctx.$attrs), [_ctx.icon ? (_openBlock(), _createBlock(_component_var_icon, {
      key: 0,
      class: _normalizeClass(_ctx.n('icon')),
      "var-badge-cover": "",
      name: _ctx.icon
    }, null, 8 /* PROPS */, ["class", "name"])) : _createCommentVNode("v-if", true), _renderSlot(_ctx.$slots, "value", {}, () => [!_ctx.icon && !_ctx.dot ? (_openBlock(), _createElementBlock("span", {
      key: 0,
      class: _normalizeClass(_ctx.n('value'))
    }, _toDisplayString(_ctx.value), 3 /* TEXT, CLASS */)) : _createCommentVNode("v-if", true)])], 16 /* FULL_PROPS */), [[_vShow, !_ctx.hidden]])]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name"])], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarBadge',
  components: {
    VarIcon
  },
  inheritAttrs: false,
  props,
  setup(props) {
    var value = computed(() => {
      var {
        value,
        maxValue
      } = props;
      return value != null && maxValue != null && toNumber(value) > toNumber(maxValue) ? maxValue + "+" : value;
    });
    return {
      n,
      classes,
      value
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;