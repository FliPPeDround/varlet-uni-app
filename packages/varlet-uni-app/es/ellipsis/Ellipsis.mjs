function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import VarTooltip from '../tooltip/index.mjs';
import { computed, defineComponent, ref } from 'vue';
import { createNamespace } from '../utils/components.mjs';
import { props } from './props.mjs';
var {
  n,
  classes
} = createNamespace('ellipsis');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveComponent as _resolveComponent, normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, withCtx as _withCtx, createBlock as _createBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = {
  key: 0
};
function __render__(_ctx, _cache) {
  var _component_var_tooltip = _resolveComponent("var-tooltip");
  return _openBlock(), _createBlock(_component_var_tooltip, _normalizeProps(_guardReactiveProps(_ctx.tooltip)), {
    content: _withCtx(() => [_renderSlot(_ctx.$slots, "tooltip-content", {}, () => {
      var _ctx$tooltip;
      return [(_ctx$tooltip = _ctx.tooltip) != null && _ctx$tooltip.content ? (_openBlock(), _createElementBlock("span", _hoisted_1, _toDisplayString(_ctx.tooltip.content), 1 /* TEXT */)) : _renderSlot(_ctx.$slots, "default", {
        key: 1
      })];
    })]),
    default: _withCtx(() => [_createElementVNode("span", {
      class: _normalizeClass(_ctx.classes(_ctx.n(), [_ctx.lineClamp, _ctx.n('--clamp'), _ctx.n('--line')], [_ctx.expandTrigger, _ctx.n('--cursor')], [_ctx.expanding, _ctx.n('--expand')])),
      style: _normalizeStyle(_ctx.rootStyles),
      onClick: _cache[0] || (_cache[0] = function () {
        return _ctx.handleClick && _ctx.handleClick(...arguments);
      })
    }, [_renderSlot(_ctx.$slots, "default")], 6 /* CLASS, STYLE */)]),

    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */);
}

var __sfc__ = defineComponent({
  name: 'VarEllipsis',
  components: {
    VarTooltip
  },
  props,
  setup(props) {
    var expanding = ref(false);
    var rootStyles = computed(() => {
      if (!props.lineClamp) {
        return {};
      }
      return {
        '-webkit-line-clamp': props.lineClamp
      };
    });
    var tooltip = computed(() => {
      if (props.tooltip === false) {
        return {
          disabled: true
        };
      }
      if (props.tooltip === true) {
        return {
          sameWidth: true
        };
      }
      return _extends({
        sameWidth: true
      }, props.tooltip);
    });
    var handleClick = () => {
      if (!props.expandTrigger) {
        return;
      }
      expanding.value = !expanding.value;
    };
    return {
      n,
      classes,
      tooltip,
      expanding,
      rootStyles,
      handleClick
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;