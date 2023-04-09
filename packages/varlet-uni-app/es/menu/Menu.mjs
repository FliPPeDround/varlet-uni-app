import { createNamespace, formatElevation } from '../utils/components.mjs';
import { defineComponent } from 'vue';
import { props } from './props.mjs';
import { usePopover } from './usePopover.mjs';
import { toSizeUnit } from '../utils/elements.mjs';
var {
  n,
  classes
} = createNamespace('menu');
import { renderSlot as _renderSlot, vShow as _vShow, withModifiers as _withModifiers, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, withDirectives as _withDirectives, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, Teleport as _Teleport, openBlock as _openBlock, createBlock as _createBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    ref: "host",
    class: _normalizeClass(_ctx.n()),
    onClick: _cache[3] || (_cache[3] = function () {
      return _ctx.handleHostClick && _ctx.handleHostClick(...arguments);
    }),
    onMouseenter: _cache[4] || (_cache[4] = function () {
      return _ctx.handleHostMouseenter && _ctx.handleHostMouseenter(...arguments);
    }),
    onMouseleave: _cache[5] || (_cache[5] = function () {
      return _ctx.handleHostMouseleave && _ctx.handleHostMouseleave(...arguments);
    })
  }, [_renderSlot(_ctx.$slots, "default"), (_openBlock(), _createBlock(_Teleport, {
    to: _ctx.teleport
  }, [_createVNode(_Transition, {
    name: _ctx.n(),
    onAfterEnter: _ctx.onOpened,
    onAfterLeave: _ctx.onClosed
  }, {
    default: _withCtx(() => [_withDirectives(_createElementVNode("div", {
      ref: "popover",
      style: _normalizeStyle({
        zIndex: _ctx.zIndex,
        width: _ctx.sameWidth ? _ctx.toSizeUnit(Math.ceil(_ctx.hostSize.width)) : undefined
      }),
      class: _normalizeClass(_ctx.classes(_ctx.n('menu'), [_ctx.defaultStyle, _ctx.n('--menu-background-color')], [_ctx.defaultStyle, _ctx.formatElevation(_ctx.elevation, 3)])),
      onClick: _cache[0] || (_cache[0] = _withModifiers(() => {}, ["stop"])),
      onMouseenter: _cache[1] || (_cache[1] = function () {
        return _ctx.handlePopoverMouseenter && _ctx.handlePopoverMouseenter(...arguments);
      }),
      onMouseleave: _cache[2] || (_cache[2] = function () {
        return _ctx.handlePopoverMouseleave && _ctx.handlePopoverMouseleave(...arguments);
      })
    }, [_renderSlot(_ctx.$slots, "menu")], 38 /* CLASS, STYLE, HYDRATE_EVENTS */), [[_vShow, _ctx.show]])]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name", "onAfterEnter", "onAfterLeave"])], 8 /* PROPS */, ["to"]))], 34 /* CLASS, HYDRATE_EVENTS */);
}

var __sfc__ = defineComponent({
  name: 'VarMenu',
  props,
  setup(props) {
    var {
      popover,
      host,
      hostSize,
      show,
      zIndex,
      handleHostClick,
      handleHostMouseenter,
      handleHostMouseleave,
      handlePopoverMouseenter,
      handlePopoverMouseleave,
      handlePopoverClose,
      // expose
      open,
      // expose
      close,
      // expose
      resize
    } = usePopover(props);
    return {
      popover,
      host,
      hostSize,
      show,
      zIndex,
      formatElevation,
      toSizeUnit,
      n,
      classes,
      handleHostClick,
      handleHostMouseenter,
      handleHostMouseleave,
      handlePopoverMouseenter,
      handlePopoverMouseleave,
      handlePopoverClose,
      resize,
      open,
      close
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;