import { defineComponent, ref, watch, computed } from 'vue';
import { nextTickFrame, requestAnimationFrame } from '../utils/elements.mjs';
import { isArray } from '@varlet/shared';
import { createNamespace, formatElevation } from '../utils/components.mjs';
import { useCollapse } from './provide.mjs';
import { props } from './props.mjs';
import VarIcon from '../icon/index.mjs';
var {
  n,
  classes
} = createNamespace('collapse-item');
import { normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, vShow as _vShow, withDirectives as _withDirectives, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), [_ctx.offset && _ctx.isShow, _ctx.n('--active')], [_ctx.disabled, _ctx.n('--disable')])),
    style: _normalizeStyle("--collapse-divider-top: " + (_ctx.divider ? 'var(--collapse-border-top)' : 'none'))
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('shadow'), _ctx.formatElevation(_ctx.elevation, 2)))
  }, null, 2 /* CLASS */), _createElementVNode("div", {
    class: _normalizeClass(_ctx.n('header')),
    onClick: _cache[0] || (_cache[0] = $event => _ctx.toggle())
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('header-title'))
  }, [_renderSlot(_ctx.$slots, "title", {}, () => [_createTextVNode(_toDisplayString(_ctx.title), 1 /* TEXT */)])], 2 /* CLASS */), _createElementVNode("div", {
    class: _normalizeClass(_ctx.n('header-icon'))
  }, [_renderSlot(_ctx.$slots, "icon", {}, () => [_createVNode(_component_var_icon, {
    name: _ctx.icon,
    transition: 250,
    class: _normalizeClass(_ctx.classes(_ctx.n('header-icon'), [_ctx.isShow && _ctx.icon === 'chevron-down', _ctx.n('header-open')], [_ctx.disabled, _ctx.n('header--disable')]))
  }, null, 8 /* PROPS */, ["name", "class"])])], 2 /* CLASS */)], 2 /* CLASS */), _withDirectives(_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('content')),
    ref: "contentEl",
    onTransitionend: _cache[1] || (_cache[1] = function () {
      return _ctx.transitionend && _ctx.transitionend(...arguments);
    }),
    onTransitionstart: _cache[2] || (_cache[2] = function () {
      return _ctx.start && _ctx.start(...arguments);
    })
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('content-wrap'))
  }, [_renderSlot(_ctx.$slots, "default")], 2 /* CLASS */)], 34 /* CLASS, HYDRATE_EVENTS */), [[_vShow, _ctx.showContent]])], 6 /* CLASS, STYLE */);
}

var __sfc__ = defineComponent({
  name: 'VarCollapseItem',
  components: {
    VarIcon
  },
  props,
  setup(props) {
    var {
      index,
      collapse,
      bindCollapse
    } = useCollapse();
    var isInitToTrigger = true; // ensure to trigger transitionend
    var contentEl = ref(null);
    var showContent = ref(false);
    var isShow = ref(false);
    var {
      active,
      offset,
      divider,
      elevation,
      updateItem
    } = collapse;
    var name = computed(() => props.name);
    var init = (accordion, show) => {
      if (active.value === undefined || accordion && isArray(active.value) || show === isShow.value) return;
      isShow.value = show;
      toggle(true);
    };
    var toggle = initOrAccordion => {
      if (props.disabled) return;
      if (!initOrAccordion) {
        updateItem(props.name || index.value, !isShow.value);
      }
    };
    var openPanel = () => {
      if (!contentEl.value) return;
      contentEl.value.style.height = '';
      showContent.value = true;
      requestAnimationFrame(() => {
        var {
          offsetHeight
        } = contentEl.value;
        contentEl.value.style.height = 0 + 'px';
        requestAnimationFrame(() => {
          ;
          contentEl.value.style.height = offsetHeight + 'px';
          if (!isInitToTrigger) return;
          nextTickFrame(() => {
            if (isInitToTrigger) transitionend();
          });
        });
      });
    };
    var start = () => {
      isInitToTrigger = false;
    };
    var closePanel = () => {
      if (!contentEl.value) return;
      var {
        offsetHeight
      } = contentEl.value;
      contentEl.value.style.height = offsetHeight + 'px';
      requestAnimationFrame(() => {
        ;
        contentEl.value.style.height = 0 + 'px';
      });
    };
    var transitionend = () => {
      if (!isShow.value) {
        showContent.value = false;
      }
      ;
      contentEl.value.style.height = '';
    };
    var collapseItemProvider = {
      index,
      name,
      init
    };
    bindCollapse(collapseItemProvider);
    watch(isShow, value => {
      if (value) openPanel();else closePanel();
    });
    return {
      n,
      start,
      classes,
      showContent,
      isShow,
      offset,
      divider,
      elevation,
      toggle,
      contentEl,
      transitionend,
      formatElevation
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;