import { defineComponent, ref } from 'vue';
import { useSwipe } from './provide.mjs';
import { createNamespace } from '../utils/components.mjs';
var {
  n
} = createNamespace('swipe-item');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n()),
    style: _normalizeStyle({
      width: !_ctx.vertical ? _ctx.size + "px" : undefined,
      height: _ctx.vertical ? _ctx.size + "px" : undefined,
      transform: "translate" + (_ctx.vertical ? 'Y' : 'X') + "(" + _ctx.translate + "px)"
    })
  }, [_renderSlot(_ctx.$slots, "default")], 6 /* CLASS, STYLE */);
}

var __sfc__ = defineComponent({
  name: 'VarSwipeItem',
  setup() {
    var translate = ref(0);
    var {
      swipe,
      bindSwipe,
      index
    } = useSwipe();
    var {
      size,
      vertical
    } = swipe;
    var setTranslate = x => {
      translate.value = x;
    };
    var swipeItemProvider = {
      index,
      setTranslate
    };
    bindSwipe(swipeItemProvider);
    return {
      n,
      size,
      vertical,
      translate
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;