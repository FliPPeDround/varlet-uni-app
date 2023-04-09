import VarSticky from '../sticky/index.mjs';
import { computed, defineComponent, ref, Transition } from 'vue';
import { useIndexBar } from './provide.mjs';
import { props } from './props.mjs';
import { createNamespace } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('index-anchor');
import { renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, mergeProps as _mergeProps, createElementVNode as _createElementVNode, resolveDynamicComponent as _resolveDynamicComponent, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createBlock(_resolveDynamicComponent(_ctx.sticky ? _ctx.n('$-sticky') : _ctx.Transition), {
    "offset-top": _ctx.sticky ? _ctx.stickyOffsetTop : null,
    "z-index": _ctx.sticky ? _ctx.zIndex : null,
    disabled: _ctx.disabled && !_ctx.cssMode,
    "css-mode": _ctx.cssMode,
    ref: "anchorEl"
  }, {
    default: _withCtx(() => [_createElementVNode("div", _mergeProps({
      class: _ctx.n()
    }, _ctx.$attrs), [_renderSlot(_ctx.$slots, "default", {}, () => [_createTextVNode(_toDisplayString(_ctx.name), 1 /* TEXT */)])], 16 /* FULL_PROPS */)]),

    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["offset-top", "z-index", "disabled", "css-mode"]);
}
var __sfc__ = defineComponent({
  name: 'VarIndexAnchor',
  components: {
    VarSticky
  },
  inheritAttrs: false,
  props,
  setup(props) {
    var {
      index,
      indexBar,
      bindIndexBar
    } = useIndexBar();
    var ownTop = ref(0);
    var disabled = ref(false);
    var name = computed(() => props.index);
    var anchorEl = ref(null);
    var {
      active,
      sticky,
      cssMode,
      stickyOffsetTop,
      zIndex
    } = indexBar;
    var setOwnTop = () => {
      if (!anchorEl.value) return;
      ownTop.value = anchorEl.value.$el ? anchorEl.value.$el.offsetTop : anchorEl.value.offsetTop;
    };
    var setDisabled = value => {
      disabled.value = value;
    };
    var indexAnchorProvider = {
      index,
      name,
      ownTop,
      setOwnTop,
      setDisabled
    };
    bindIndexBar(indexAnchorProvider);
    return {
      n,
      classes,
      name,
      anchorEl,
      active,
      sticky,
      zIndex,
      disabled,
      cssMode,
      stickyOffsetTop,
      Transition
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;