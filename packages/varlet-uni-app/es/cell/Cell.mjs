import VarIcon from '../icon/index.mjs';
import Ripple from '../ripple/index.mjs';
import { computed, defineComponent } from 'vue';
import { props } from './props.mjs';
import { call, createNamespace } from '../utils/components.mjs';
import { toSizeUnit } from '../utils/elements.mjs';
var {
  n,
  classes
} = createNamespace('cell');
import { renderSlot as _renderSlot, resolveComponent as _resolveComponent, createVNode as _createVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, resolveDirective as _resolveDirective, withDirectives as _withDirectives } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  var _directive_ripple = _resolveDirective("ripple");
  return _withDirectives((_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), [_ctx.border, _ctx.n('--border')], [_ctx.onClick, _ctx.n('--cursor')])),
    style: _normalizeStyle(_ctx.borderOffsetStyles),
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.handleClick && _ctx.handleClick(...arguments);
    })
  }, [_renderSlot(_ctx.$slots, "icon", {}, () => [_ctx.icon ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.classes(_ctx.n('icon'), _ctx.iconClass))
  }, [_createVNode(_component_var_icon, {
    name: _ctx.icon
  }, null, 8 /* PROPS */, ["name"])], 2 /* CLASS */)) : _createCommentVNode("v-if", true)]), _createElementVNode("div", {
    class: _normalizeClass(_ctx.n('content'))
  }, [_renderSlot(_ctx.$slots, "default", {}, () => [_ctx.title ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.classes(_ctx.n('title'), _ctx.titleClass))
  }, _toDisplayString(_ctx.title), 3 /* TEXT, CLASS */)) : _createCommentVNode("v-if", true)]), _renderSlot(_ctx.$slots, "description", {}, () => [_ctx.description ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.classes(_ctx.n('description'), _ctx.descriptionClass))
  }, _toDisplayString(_ctx.description), 3 /* TEXT, CLASS */)) : _createCommentVNode("v-if", true)])], 2 /* CLASS */), _ctx.$slots.extra ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.classes(_ctx.n('extra'), _ctx.extraClass))
  }, [_renderSlot(_ctx.$slots, "extra")], 2 /* CLASS */)) : _createCommentVNode("v-if", true)], 6 /* CLASS, STYLE */)), [[_directive_ripple, {
    disabled: !_ctx.ripple
  }]]);
}
var __sfc__ = defineComponent({
  name: 'VarCell',
  components: {
    VarIcon
  },
  directives: {
    Ripple
  },
  props,
  setup(props) {
    var borderOffsetStyles = computed(() => {
      if (props.borderOffset == null) {
        return {};
      }
      return {
        '--cell-border-left': toSizeUnit(props.borderOffset),
        '--cell-border-right': toSizeUnit(props.borderOffset)
      };
    });
    var handleClick = e => {
      call(props.onClick, e);
    };
    return {
      n,
      classes,
      toSizeUnit,
      borderOffsetStyles,
      handleClick
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;