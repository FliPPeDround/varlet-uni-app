import Ripple from '../ripple/index.mjs';
import { defineComponent, ref, computed, watch } from 'vue';
import { props } from './props.mjs';
import { call, createNamespace } from '../utils/components.mjs';
import { useTabs } from './provide.mjs';
var {
  n,
  classes
} = createNamespace('tab');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, resolveDirective as _resolveDirective, openBlock as _openBlock, createElementBlock as _createElementBlock, withDirectives as _withDirectives } from "vue";
function __render__(_ctx, _cache) {
  var _directive_ripple = _resolveDirective("ripple");
  return _withDirectives((_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box'), _ctx.computeColorClass(), _ctx.n("--" + _ctx.itemDirection))),
    ref: "tabEl",
    style: _normalizeStyle({
      color: _ctx.computeColorStyle()
    }),
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.handleClick && _ctx.handleClick(...arguments);
    })
  }, [_renderSlot(_ctx.$slots, "default")], 6 /* CLASS, STYLE */)), [[_directive_ripple, {
    disabled: _ctx.disabled
  }]]);
}
var __sfc__ = defineComponent({
  name: 'VarTab',
  directives: {
    Ripple
  },
  props,
  setup(props) {
    var tabEl = ref(null);
    var name = computed(() => props.name);
    var disabled = computed(() => props.disabled);
    var element = computed(() => tabEl.value);
    var {
      index,
      tabs,
      bindTabs
    } = useTabs();
    var {
      onTabClick,
      active,
      activeColor,
      inactiveColor,
      disabledColor,
      itemDirection,
      resize
    } = tabs;
    var tabProvider = {
      name,
      index,
      disabled,
      element
    };
    bindTabs(tabProvider);
    var shouldActive = () => {
      if (props.name != null) {
        return active.value === props.name;
      }
      return active.value === (index == null ? void 0 : index.value);
    };
    var computeColorStyle = () => {
      return props.disabled ? disabledColor.value : shouldActive() ? activeColor.value : inactiveColor.value;
    };
    var computeColorClass = () => {
      return props.disabled ? n('$-tab--disabled') : shouldActive() ? n('$-tab--active') : n('$-tab--inactive');
    };
    var handleClick = event => {
      var {
        disabled,
        name,
        onClick
      } = props;
      if (disabled) {
        return;
      }
      call(onClick, name != null ? name : index.value, event);
      onTabClick(tabProvider);
    };
    watch(() => props.name, resize);
    watch(() => props.disabled, resize);
    return {
      n,
      classes,
      tabEl,
      active,
      activeColor,
      inactiveColor,
      itemDirection,
      computeColorStyle,
      computeColorClass,
      handleClick
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;