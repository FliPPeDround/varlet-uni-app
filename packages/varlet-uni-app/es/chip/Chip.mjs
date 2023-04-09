import VarIcon from '../icon/index.mjs';
import { defineComponent, computed } from 'vue';
import { props } from './props.mjs';
import { call, createNamespace } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('chip');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, mergeProps as _mergeProps, Transition as _Transition, withCtx as _withCtx, createBlock as _createBlock } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  return _openBlock(), _createBlock(_Transition, {
    name: _ctx.n('$-fade')
  }, {
    default: _withCtx(() => [_createElementVNode("span", _mergeProps({
      class: _ctx.classes(_ctx.n(), _ctx.n('$--box'), ..._ctx.contentClass),
      style: _ctx.chipStyles
    }, _ctx.$attrs), [_renderSlot(_ctx.$slots, "left"), _createElementVNode("span", {
      class: _normalizeClass(_ctx.n("text-" + _ctx.size))
    }, [_renderSlot(_ctx.$slots, "default")], 2 /* CLASS */), _renderSlot(_ctx.$slots, "right"), _ctx.closable ? (_openBlock(), _createElementBlock("span", {
      key: 0,
      class: _normalizeClass(_ctx.n('--close')),
      onClick: _cache[0] || (_cache[0] = function () {
        return _ctx.handleClose && _ctx.handleClose(...arguments);
      })
    }, [_createVNode(_component_var_icon, {
      name: "" + (_ctx.iconName ? _ctx.iconName : 'close-circle')
    }, null, 8 /* PROPS */, ["name"])], 2 /* CLASS */)) : _createCommentVNode("v-if", true)], 16 /* FULL_PROPS */)]),

    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name"]);
}
var __sfc__ = defineComponent({
  name: 'VarChip',
  components: {
    VarIcon
  },
  inheritAttrs: false,
  props,
  setup(props) {
    var chipStyles = computed(() => {
      var {
        plain,
        textColor,
        color
      } = props;
      if (plain) {
        return {
          color: textColor || color,
          borderColor: color
        };
      }
      return {
        color: textColor,
        background: color
      };
    });
    var contentClass = computed(() => {
      var {
        size,
        block,
        type,
        plain,
        round
      } = props;
      var blockClass = block ? n('$--flex') : n('$--inline-flex');
      var plainTypeClass = plain ? n('plain') + " " + n("plain-" + type) : n("--" + type);
      var roundClass = round ? n('--round') : null;
      return [n("--" + size), blockClass, plainTypeClass, roundClass];
    });
    var handleClose = e => {
      call(props.onClose, e);
    };
    return {
      n,
      classes,
      chipStyles,
      contentClass,
      handleClose
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;