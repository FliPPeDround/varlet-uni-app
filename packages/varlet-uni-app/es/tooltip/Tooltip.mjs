import { createNamespace } from '../utils/components.mjs';
import { defineComponent } from 'vue';
import { toSizeUnit } from '../utils/elements.mjs';
import { usePopover } from '../menu/usePopover.mjs';
import { props } from './props.mjs';
var {
  n,
  classes
} = createNamespace('tooltip');
import { renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, vShow as _vShow, withModifiers as _withModifiers, withDirectives as _withDirectives, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, Teleport as _Teleport, openBlock as _openBlock, createBlock as _createBlock, createElementBlock as _createElementBlock } from "vue";
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
      class: _normalizeClass(_ctx.n('tooltip')),
      style: _normalizeStyle({
        zIndex: _ctx.zIndex
      }),
      onClick: _cache[0] || (_cache[0] = _withModifiers(() => {}, ["stop"])),
      onMouseenter: _cache[1] || (_cache[1] = function () {
        return _ctx.handlePopoverMouseenter && _ctx.handlePopoverMouseenter(...arguments);
      }),
      onMouseleave: _cache[2] || (_cache[2] = function () {
        return _ctx.handlePopoverMouseleave && _ctx.handlePopoverMouseleave(...arguments);
      })
    }, [_createElementVNode("div", {
      style: _normalizeStyle({
        background: _ctx.color,
        width: _ctx.sameWidth ? _ctx.toSizeUnit(Math.ceil(_ctx.hostSize.width)) : undefined
      }),
      class: _normalizeClass(_ctx.classes(_ctx.n('content-container'), _ctx.n("--" + _ctx.type)))
    }, [_renderSlot(_ctx.$slots, "content", {}, () => [_createTextVNode(_toDisplayString(_ctx.content), 1 /* TEXT */)])], 6 /* CLASS, STYLE */)], 38 /* CLASS, STYLE, HYDRATE_EVENTS */), [[_vShow, _ctx.show]])]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["name", "onAfterEnter", "onAfterLeave"])], 8 /* PROPS */, ["to"]))], 34 /* CLASS, HYDRATE_EVENTS */);
}

var __sfc__ = defineComponent({
  name: 'VarTooltip',
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
      toSizeUnit,
      popover,
      host,
      hostSize,
      show,
      zIndex,
      n,
      classes,
      handleHostClick,
      handlePopoverClose,
      handleHostMouseenter,
      handleHostMouseleave,
      handlePopoverMouseenter,
      handlePopoverMouseleave,
      resize,
      open,
      close
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;