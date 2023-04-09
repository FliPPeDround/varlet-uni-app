import Ripple from '../ripple/index.mjs';
import VarBadge from '../badge/index.mjs';
import VarIcon from '../icon/index.mjs';
import { defineComponent, computed, ref, watch } from 'vue';
import { props } from './props.mjs';
import { useBottomNavigation } from './provide.mjs';
import { createNamespace, call } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('bottom-navigation-item');
var defaultBadgeProps = {
  type: 'danger',
  dot: true
};
import { resolveComponent as _resolveComponent, normalizeClass as _normalizeClass, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, mergeProps as _mergeProps, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, Fragment as _Fragment, createElementBlock as _createElementBlock, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, resolveDirective as _resolveDirective, withDirectives as _withDirectives } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  var _component_var_badge = _resolveComponent("var-badge");
  var _directive_ripple = _resolveDirective("ripple");
  return _withDirectives((_openBlock(), _createElementBlock("button", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box'), [_ctx.active === _ctx.index || _ctx.active === _ctx.name, _ctx.n('--active')])),
    style: _normalizeStyle({
      color: _ctx.computeColorStyle()
    }),
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.handleClick && _ctx.handleClick(...arguments);
    })
  }, [_ctx.icon && !_ctx.$slots.icon ? (_openBlock(), _createBlock(_component_var_icon, {
    key: 0,
    name: _ctx.icon,
    namespace: _ctx.namespace,
    class: _normalizeClass(_ctx.n('icon')),
    "var-bottom-navigation-item-cover": ""
  }, null, 8 /* PROPS */, ["name", "namespace", "class"])) : _createCommentVNode("v-if", true), _renderSlot(_ctx.$slots, "icon", {
    active: _ctx.active === _ctx.index || _ctx.active === _ctx.name
  }), _ctx.badge ? (_openBlock(), _createBlock(_component_var_badge, _mergeProps({
    key: 1
  }, _ctx.badgeProps, {
    class: _ctx.n('badge'),
    "var-bottom-navigation-item-cover": ""
  }), null, 16 /* FULL_PROPS */, ["class"])) : _createCommentVNode("v-if", true), _createElementVNode("span", {
    class: _normalizeClass(_ctx.n('label'))
  }, [!_ctx.$slots.default ? (_openBlock(), _createElementBlock(_Fragment, {
    key: 0
  }, [_createTextVNode(_toDisplayString(_ctx.label), 1 /* TEXT */)], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */)) : _createCommentVNode("v-if", true), _renderSlot(_ctx.$slots, "default")], 2 /* CLASS */)], 6 /* CLASS, STYLE */)), [[_directive_ripple]]);
}
var __sfc__ = defineComponent({
  name: 'VarBottomNavigationItem',
  components: {
    VarBadge,
    VarIcon
  },
  directives: {
    Ripple
  },
  props,
  setup(props) {
    var name = computed(() => props.name);
    var badge = computed(() => props.badge);
    var badgeProps = ref({});
    var {
      index,
      bottomNavigation,
      bindBottomNavigation
    } = useBottomNavigation();
    var {
      active,
      activeColor,
      inactiveColor
    } = bottomNavigation;
    var bottomNavigationItemProvider = {
      name,
      index
    };
    var computeColorStyle = () => {
      return active.value === name.value || active.value === index.value ? activeColor.value : inactiveColor.value;
    };
    var handleClick = () => {
      var _name$value;
      var active = (_name$value = name.value) != null ? _name$value : index.value;
      call(props.onClick, active);
      call(bottomNavigation.onToggle, active);
    };
    bindBottomNavigation(bottomNavigationItemProvider);
    watch(() => badge.value, newValue => {
      badgeProps.value = newValue === true ? defaultBadgeProps : badge.value;
    }, {
      immediate: true
    });
    return {
      n,
      classes,
      index,
      active,
      badge,
      badgeProps,
      computeColorStyle,
      handleClick
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;