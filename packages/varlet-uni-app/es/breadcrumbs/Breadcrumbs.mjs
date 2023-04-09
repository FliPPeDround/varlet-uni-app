import { defineComponent, computed } from 'vue';
import { props } from './props.mjs';
import { useBreadcrumbsList } from './provide.mjs';
import { createNamespace } from '../utils/components.mjs';
var {
  n
} = createNamespace('breadcrumbs');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n())
  }, [_renderSlot(_ctx.$slots, "default")], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarBreadcrumbs',
  props,
  setup(props) {
    var separator = computed(() => props.separator);
    var {
      bindBreadcrumbList,
      length
    } = useBreadcrumbsList();
    var breadcrumbsProvider = {
      length,
      separator
    };
    bindBreadcrumbList(breadcrumbsProvider);
    return {
      n
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;