function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import VarPopup from '../popup/index.mjs';
import VarButton from '../button/index.mjs';
import { props } from './props.mjs';
import { defineComponent, ref, watch } from 'vue';
import { dt } from '../utils/shared.mjs';
import { pack } from '../locale/index.mjs';
import { call, createNamespace } from '../utils/components.mjs';
import { toSizeUnit } from '../utils/elements.mjs';
var {
  n,
  classes
} = createNamespace('dialog');
import { renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, resolveComponent as _resolveComponent, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, mergeProps as _mergeProps } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_button = _resolveComponent("var-button");
  var _component_var_popup = _resolveComponent("var-popup");
  return _openBlock(), _createBlock(_component_var_popup, {
    class: _normalizeClass(_ctx.n('popup')),
    "var-dialog-cover": "",
    show: _ctx.popupShow,
    overlay: _ctx.overlay,
    "overlay-class": _ctx.overlayClass,
    "overlay-style": _ctx.overlayStyle,
    "lock-scroll": _ctx.lockScroll,
    "close-on-click-overlay": _ctx.popupCloseOnClickOverlay,
    teleport: _ctx.teleport,
    onOpen: _ctx.onOpen,
    onClose: _ctx.onClose,
    onClosed: _ctx.onClosed,
    onOpened: _ctx.onOpened,
    onRouteChange: _ctx.onRouteChange,
    onClickOverlay: _ctx.handleClickOverlay
  }, {
    default: _withCtx(() => [_createElementVNode("div", _mergeProps({
      class: _ctx.classes(_ctx.n('$--box'), _ctx.n(), _ctx.dialogClass),
      style: _extends({
        width: _ctx.toSizeUnit(_ctx.width)
      }, _ctx.dialogStyle)
    }, _ctx.$attrs), [_createElementVNode("div", {
      class: _normalizeClass(_ctx.n('title'))
    }, [_renderSlot(_ctx.$slots, "title", {}, () => [_createTextVNode(_toDisplayString(_ctx.dt(_ctx.title, _ctx.pack.dialogTitle)), 1 /* TEXT */)])], 2 /* CLASS */), _createElementVNode("div", {
      class: _normalizeClass(_ctx.n('message')),
      style: _normalizeStyle({
        textAlign: _ctx.messageAlign
      })
    }, [_renderSlot(_ctx.$slots, "default", {}, () => [_createTextVNode(_toDisplayString(_ctx.message), 1 /* TEXT */)])], 6 /* CLASS, STYLE */), _createElementVNode("div", {
      class: _normalizeClass(_ctx.n('actions'))
    }, [_ctx.cancelButton ? (_openBlock(), _createBlock(_component_var_button, {
      key: 0,
      class: _normalizeClass(_ctx.classes(_ctx.n('button'), _ctx.n('cancel-button'))),
      "var-dialog-cover": "",
      text: "",
      "text-color": _ctx.cancelButtonTextColor,
      color: _ctx.cancelButtonColor,
      onClick: _ctx.cancel
    }, {
      default: _withCtx(() => [_createTextVNode(_toDisplayString(_ctx.dt(_ctx.cancelButtonText, _ctx.pack.dialogCancelButtonText)), 1 /* TEXT */)]),

      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["class", "text-color", "color", "onClick"])) : _createCommentVNode("v-if", true), _ctx.confirmButton ? (_openBlock(), _createBlock(_component_var_button, {
      key: 1,
      class: _normalizeClass(_ctx.classes(_ctx.n('button'), _ctx.n('confirm-button'))),
      "var-dialog-cover": "",
      text: "",
      "text-color": _ctx.confirmButtonTextColor,
      color: _ctx.confirmButtonColor,
      onClick: _ctx.confirm
    }, {
      default: _withCtx(() => [_createTextVNode(_toDisplayString(_ctx.dt(_ctx.confirmButtonText, _ctx.pack.dialogConfirmButtonText)), 1 /* TEXT */)]),

      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["class", "text-color", "color", "onClick"])) : _createCommentVNode("v-if", true)], 2 /* CLASS */)], 16 /* FULL_PROPS */)]),

    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class", "show", "overlay", "overlay-class", "overlay-style", "lock-scroll", "close-on-click-overlay", "teleport", "onOpen", "onClose", "onClosed", "onOpened", "onRouteChange", "onClickOverlay"]);
}
var __sfc__ = defineComponent({
  name: 'VarDialog',
  components: {
    VarPopup,
    VarButton
  },
  inheritAttrs: false,
  props,
  setup(props) {
    var popupShow = ref(false);
    var popupCloseOnClickOverlay = ref(false);
    var done = () => call(props['onUpdate:show'], false);
    var handleClickOverlay = () => {
      var {
        closeOnClickOverlay,
        onClickOverlay,
        onBeforeClose
      } = props;
      call(onClickOverlay);
      if (!closeOnClickOverlay) {
        return;
      }
      if (onBeforeClose != null) {
        call(onBeforeClose, 'close', done);
        return;
      }
      call(props['onUpdate:show'], false);
    };
    var confirm = () => {
      var {
        onBeforeClose,
        onConfirm
      } = props;
      call(onConfirm);
      if (onBeforeClose != null) {
        call(onBeforeClose, 'confirm', done);
        return;
      }
      call(props['onUpdate:show'], false);
    };
    var cancel = () => {
      var {
        onBeforeClose,
        onCancel
      } = props;
      call(onCancel);
      if (onBeforeClose != null) {
        call(onBeforeClose, 'cancel', done);
        return;
      }
      call(props['onUpdate:show'], false);
    };
    watch(() => props.show, newValue => {
      popupShow.value = newValue;
    }, {
      immediate: true
    });
    watch(() => props.closeOnClickOverlay, newValue => {
      if (props.onBeforeClose != null) {
        popupCloseOnClickOverlay.value = false;
        return;
      }
      popupCloseOnClickOverlay.value = newValue;
    }, {
      immediate: true
    });
    return {
      n,
      classes,
      pack,
      dt,
      popupShow,
      popupCloseOnClickOverlay,
      handleClickOverlay,
      confirm,
      cancel,
      toSizeUnit
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;