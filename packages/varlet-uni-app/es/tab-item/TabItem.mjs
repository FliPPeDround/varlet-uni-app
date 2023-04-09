import VarSwipeItem from '../swipe-item/index.mjs';
import { defineComponent, ref, computed } from 'vue';
import { useTabsItems } from './provide.mjs';
import { props } from './props.mjs';
import { createNamespace } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('tab-item');
import { renderSlot as _renderSlot, createCommentVNode as _createCommentVNode, resolveComponent as _resolveComponent, normalizeClass as _normalizeClass, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_swipe_item = _resolveComponent("var-swipe-item");
  return _openBlock(), _createBlock(_component_var_swipe_item, {
    class: _normalizeClass(_ctx.classes(_ctx.n(), [!_ctx.current, _ctx.n('--inactive')])),
    "var-tab-item-cover": ""
  }, {
    default: _withCtx(() => [_ctx.initSlot ? _renderSlot(_ctx.$slots, "default", {
      key: 0
    }) : _createCommentVNode("v-if", true)]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]);
}
var __sfc__ = defineComponent({
  name: 'VarTabItem',
  components: {
    VarSwipeItem
  },
  props,
  setup(props) {
    var current = ref(false);
    var initSlot = ref(false);
    var name = computed(() => props.name);
    var {
      index,
      bindTabsItems
    } = useTabsItems();
    var setCurrent = value => {
      if (!initSlot.value && value) {
        initSlot.value = true;
      }
      current.value = value;
    };
    var tabItemProvider = {
      index,
      name,
      setCurrent
    };
    bindTabsItems(tabItemProvider);
    return {
      n,
      classes,
      current,
      initSlot
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;