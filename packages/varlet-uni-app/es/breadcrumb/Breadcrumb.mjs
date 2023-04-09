import { defineComponent, computed } from 'vue';
import { props } from './props.mjs';
import { useBreadcrumb } from './provide.mjs';
import { call, createNamespace } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('breadcrumb');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, createCommentVNode as _createCommentVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n())
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('content'), [!_ctx.isLast, _ctx.n('--active')])),
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.handleClick && _ctx.handleClick(...arguments);
    })
  }, [_renderSlot(_ctx.$slots, "default")], 2 /* CLASS */), !_ctx.isLast ? _renderSlot(_ctx.$slots, "separator", {
    key: 0
  }, () => {
    var _ctx$separator;
    return [_createElementVNode("div", {
      class: _normalizeClass(_ctx.n('separator'))
    }, _toDisplayString((_ctx$separator = _ctx.separator) != null ? _ctx$separator : _ctx.parentSeparator), 3 /* TEXT, CLASS */)];
  }) : _createCommentVNode("v-if", true)], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarBreadcrumb',
  props,
  setup(props) {
    var {
      index,
      breadcrumb,
      bindBreadcrumb
    } = useBreadcrumb();
    var isLast = computed(() => index.value === breadcrumb.length.value - 1);
    var parentSeparator = computed(() => breadcrumb.separator.value);
    var handleClick = e => {
      if (isLast.value) {
        return;
      }
      call(props.onClick, e);
    };
    bindBreadcrumb(null);
    return {
      n,
      classes,
      isLast,
      parentSeparator,
      handleClick
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;