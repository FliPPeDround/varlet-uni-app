import Ripple from '../ripple/index.mjs';
import VarPopup from '../popup/index.mjs';
import VarIcon from '../icon/index.mjs';
import { defineComponent, ref, watch } from 'vue';
import { props } from './props.mjs';
import { dt } from '../utils/shared.mjs';
import { pack } from '../locale/index.mjs';
import { createNamespace, call } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('action-sheet');
import { renderSlot as _renderSlot, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveComponent as _resolveComponent, createBlock as _createBlock, createCommentVNode as _createCommentVNode, normalizeStyle as _normalizeStyle, resolveDirective as _resolveDirective, withDirectives as _withDirectives, mergeProps as _mergeProps, withCtx as _withCtx, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = ["onClick"];
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  var _component_var_popup = _resolveComponent("var-popup");
  var _directive_ripple = _resolveDirective("ripple");
  return _openBlock(), _createBlock(_component_var_popup, _mergeProps({
    class: _ctx.n('popup-radius'),
    position: "bottom",
    overlay: _ctx.overlay,
    "overlay-class": _ctx.overlayClass,
    "overlay-style": _ctx.overlayStyle,
    "lock-scroll": _ctx.lockScroll,
    "close-on-click-overlay": _ctx.closeOnClickOverlay,
    teleport: _ctx.teleport,
    show: _ctx.popupShow
  }, {
    'onUpdate:show': _ctx.handlePopupUpdateShow
  }, {
    onOpen: _ctx.onOpen,
    onClose: _ctx.onClose,
    onClosed: _ctx.onClosed,
    onOpened: _ctx.onOpened,
    onRouteChange: _ctx.onRouteChange
  }), {
    default: _withCtx(() => [_createElementVNode("div", _mergeProps({
      class: _ctx.classes(_ctx.n(), _ctx.n('$--box'))
    }, _ctx.$attrs), [_renderSlot(_ctx.$slots, "title", {}, () => [_createElementVNode("div", {
      class: _normalizeClass(_ctx.n('title'))
    }, _toDisplayString(_ctx.dt(_ctx.title, _ctx.pack.actionSheetTitle)), 3 /* TEXT, CLASS */)]), _renderSlot(_ctx.$slots, "actions", {}, () => [(_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.actions, action => {
      return _withDirectives((_openBlock(), _createElementBlock("div", {
        class: _normalizeClass(_ctx.classes(_ctx.n('action-item'), action.className, [action.disabled, _ctx.n('--disabled')])),
        key: action.name,
        style: _normalizeStyle({
          color: action.color
        }),
        onClick: $event => _ctx.handleSelect(action)
      }, [action.icon ? (_openBlock(), _createBlock(_component_var_icon, {
        key: 0,
        class: _normalizeClass(_ctx.n('action-icon')),
        "var-action-sheet-cover": "",
        name: action.icon,
        size: action.iconSize
      }, null, 8 /* PROPS */, ["class", "name", "size"])) : _createCommentVNode("v-if", true), _createElementVNode("div", {
        class: _normalizeClass(_ctx.n('action-name'))
      }, _toDisplayString(action.name), 3 /* TEXT, CLASS */)], 14 /* CLASS, STYLE, PROPS */, _hoisted_1)), [[_directive_ripple, {
        disabled: action.disabled
      }]]);
    }), 128 /* KEYED_FRAGMENT */))])], 16 /* FULL_PROPS */)]),

    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */, ["class", "overlay", "overlay-class", "overlay-style", "lock-scroll", "close-on-click-overlay", "teleport", "show", "onOpen", "onClose", "onClosed", "onOpened", "onRouteChange"]);
}
var __sfc__ = defineComponent({
  name: 'VarActionSheet',
  directives: {
    Ripple
  },
  components: {
    VarPopup,
    VarIcon
  },
  inheritAttrs: false,
  props,
  setup(props) {
    var popupShow = ref(false);
    var handleSelect = action => {
      if (action.disabled) {
        return;
      }
      var {
        closeOnClickAction,
        onSelect
      } = props;
      call(onSelect, action);
      closeOnClickAction && call(props['onUpdate:show'], false);
    };
    var handlePopupUpdateShow = value => call(props['onUpdate:show'], value);
    watch(() => props.show, newValue => {
      popupShow.value = newValue;
    }, {
      immediate: true
    });
    return {
      n,
      classes,
      handlePopupUpdateShow,
      popupShow,
      pack,
      dt,
      handleSelect
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;