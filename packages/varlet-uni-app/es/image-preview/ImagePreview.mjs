import VarSwipe from '../swipe/index.mjs';
import VarSwipeItem from '../swipe-item/index.mjs';
import VarIcon from '../icon/index.mjs';
import VarPopup from '../popup/index.mjs';
import { defineComponent, ref, computed, watch } from 'vue';
import { props } from './props.mjs';
import { toNumber } from '@varlet/shared';
import { call, createNamespace } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('image-preview');
var DISTANCE_OFFSET = 12;
var EVENT_DELAY = 200;
var TAP_DELAY = 350;
var ANIMATION_DURATION = 200;
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, resolveComponent as _resolveComponent, withCtx as _withCtx, createBlock as _createBlock, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createCommentVNode as _createCommentVNode, mergeProps as _mergeProps, createVNode as _createVNode, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = ["src", "alt"];
function __render__(_ctx, _cache) {
  var _component_var_swipe_item = _resolveComponent("var-swipe-item");
  var _component_var_swipe = _resolveComponent("var-swipe");
  var _component_var_icon = _resolveComponent("var-icon");
  var _component_var_popup = _resolveComponent("var-popup");
  return _openBlock(), _createBlock(_component_var_popup, {
    class: _normalizeClass(_ctx.n('popup')),
    "var-image-preview-cover": "",
    transition: _ctx.n('$-fade'),
    show: _ctx.popupShow,
    overlay: false,
    "close-on-click-overlay": false,
    "lock-scroll": _ctx.lockScroll,
    teleport: _ctx.teleport,
    onOpen: _ctx.onOpen,
    onClose: _ctx.onClose,
    onClosed: _ctx.onClosed,
    onOpened: _ctx.onOpened,
    onRouteChange: _ctx.onRouteChange
  }, {
    default: _withCtx(() => [_createVNode(_component_var_swipe, _mergeProps({
      class: _ctx.n('swipe'),
      "var-image-preview-cover": "",
      touchable: _ctx.canSwipe,
      indicator: _ctx.indicator && _ctx.images.length > 1,
      "initial-index": _ctx.initialIndex,
      loop: _ctx.loop,
      onChange: _ctx.onChange
    }, _ctx.$attrs), {
      default: _withCtx(() => [(_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.images, image => {
        return _openBlock(), _createBlock(_component_var_swipe_item, {
          class: _normalizeClass(_ctx.n('swipe-item')),
          "var-image-preview-cover": "",
          key: image
        }, {
          default: _withCtx(() => [_createElementVNode("div", {
            class: _normalizeClass(_ctx.n('zoom-container')),
            style: _normalizeStyle({
              transform: "scale(" + _ctx.scale + ") translate(" + _ctx.translateX + "px, " + _ctx.translateY + "px)",
              transitionTimingFunction: _ctx.transitionTimingFunction,
              transitionDuration: _ctx.transitionDuration
            }),
            onTouchstart: _cache[0] || (_cache[0] = function () {
              return _ctx.handleTouchstart && _ctx.handleTouchstart(...arguments);
            }),
            onTouchmove: _cache[1] || (_cache[1] = function () {
              return _ctx.handleTouchmove && _ctx.handleTouchmove(...arguments);
            }),
            onTouchend: _cache[2] || (_cache[2] = function () {
              return _ctx.handleTouchend && _ctx.handleTouchend(...arguments);
            })
          }, [_createElementVNode("img", {
            class: _normalizeClass(_ctx.n('image')),
            src: image,
            alt: image
          }, null, 10 /* CLASS, PROPS */, _hoisted_1)], 38 /* CLASS, STYLE, HYDRATE_EVENTS */)]),

          _: 2 /* DYNAMIC */
        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]);
      }), 128 /* KEYED_FRAGMENT */))]),

      indicator: _withCtx(_ref => {
        var {
          index,
          length
        } = _ref;
        return [_renderSlot(_ctx.$slots, "indicator", {
          index: index,
          length: length
        }, () => [_ctx.indicator && _ctx.images.length > 1 ? (_openBlock(), _createElementBlock("div", {
          key: 0,
          class: _normalizeClass(_ctx.n('indicators'))
        }, _toDisplayString(index + 1) + " / " + _toDisplayString(length), 3 /* TEXT, CLASS */)) : _createCommentVNode("v-if", true)])];
      }),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */, ["class", "touchable", "indicator", "initial-index", "loop", "onChange"]), _renderSlot(_ctx.$slots, "close-icon", {}, () => [_ctx.closeable ? (_openBlock(), _createBlock(_component_var_icon, {
      key: 0,
      class: _normalizeClass(_ctx.n('close-icon')),
      name: "close-circle",
      "var-image-preview-cover": "",
      onClick: _ctx.close
    }, null, 8 /* PROPS */, ["class", "onClick"])) : _createCommentVNode("v-if", true)]), _createElementVNode("div", {
      class: _normalizeClass(_ctx.n('extra'))
    }, [_renderSlot(_ctx.$slots, "extra")], 2 /* CLASS */)]),

    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class", "transition", "show", "lock-scroll", "teleport", "onOpen", "onClose", "onClosed", "onOpened", "onRouteChange"]);
}
var __sfc__ = defineComponent({
  name: 'VarImagePreview',
  components: {
    VarSwipe,
    VarSwipeItem,
    VarPopup,
    VarIcon
  },
  inheritAttrs: false,
  props,
  setup(props) {
    var popupShow = ref(false);
    var initialIndex = computed(() => {
      var {
        images,
        current
      } = props;
      var index = images.findIndex(image => image === current);
      return index >= 0 ? index : 0;
    });
    var scale = ref(1);
    var translateX = ref(0);
    var translateY = ref(0);
    var transitionTimingFunction = ref(undefined);
    var transitionDuration = ref(undefined);
    var canSwipe = ref(true);
    var startTouch = null;
    var prevTouch = null;
    var checker = null;
    var getDistance = (touch, target) => {
      var {
        clientX: touchX,
        clientY: touchY
      } = touch;
      var {
        clientX: targetX,
        clientY: targetY
      } = target;
      return Math.abs(Math.sqrt(Math.pow(targetX - touchX, 2) + Math.pow(targetY - touchY, 2)));
    };
    var createVarTouch = (touches, target) => ({
      clientX: touches.clientX,
      clientY: touches.clientY,
      timestamp: Date.now(),
      target
    });
    var zoomIn = () => {
      scale.value = toNumber(props.zoom);
      canSwipe.value = false;
      prevTouch = null;
      window.setTimeout(() => {
        transitionTimingFunction.value = 'linear';
        transitionDuration.value = '0s';
      }, ANIMATION_DURATION);
    };
    var zoomOut = () => {
      scale.value = 1;
      translateX.value = 0;
      translateY.value = 0;
      canSwipe.value = true;
      prevTouch = null;
      transitionTimingFunction.value = undefined;
      transitionDuration.value = undefined;
    };
    var isDoubleTouch = currentTouch => {
      if (!prevTouch) {
        return false;
      }
      return getDistance(prevTouch, currentTouch) <= DISTANCE_OFFSET && currentTouch.timestamp - prevTouch.timestamp <= EVENT_DELAY && prevTouch.target === currentTouch.target;
    };
    var isTapTouch = target => {
      if (!target || !startTouch || !prevTouch) {
        return false;
      }
      return getDistance(startTouch, prevTouch) <= DISTANCE_OFFSET && Date.now() - prevTouch.timestamp < TAP_DELAY && (target === startTouch.target || target.parentNode === startTouch.target);
    };
    var handleTouchend = event => {
      checker = window.setTimeout(() => {
        isTapTouch(event.target) && close();
        startTouch = null;
      }, EVENT_DELAY);
    };
    var handleTouchstart = event => {
      checker && window.clearTimeout(checker);
      var {
        touches
      } = event;
      var currentTouch = createVarTouch(touches[0], event.currentTarget);
      startTouch = currentTouch;
      if (isDoubleTouch(currentTouch)) {
        scale.value > 1 ? zoomOut() : zoomIn();
        return;
      }
      prevTouch = currentTouch;
    };
    var getZoom = target => {
      var {
        offsetWidth,
        offsetHeight
      } = target;
      var {
        naturalWidth,
        naturalHeight
      } = target.querySelector("." + n('image'));
      return {
        width: offsetWidth,
        height: offsetHeight,
        imageRadio: naturalHeight / naturalWidth,
        rootRadio: offsetHeight / offsetWidth,
        zoom: toNumber(props.zoom)
      };
    };
    var getLimitX = target => {
      var {
        zoom,
        imageRadio,
        rootRadio,
        width,
        height
      } = getZoom(target);
      if (!imageRadio) {
        return 0;
      }
      var displayWidth = imageRadio > rootRadio ? height / imageRadio : width;
      return Math.max(0, (zoom * displayWidth - width) / 2) / zoom;
    };
    var getLimitY = target => {
      var {
        zoom,
        imageRadio,
        rootRadio,
        width,
        height
      } = getZoom(target);
      if (!imageRadio) {
        return 0;
      }
      var displayHeight = imageRadio > rootRadio ? height : width * imageRadio;
      return Math.max(0, (zoom * displayHeight - height) / 2) / zoom;
    };
    var getMoveTranslate = (current, move, limit) => {
      if (current + move >= limit) {
        return limit;
      }
      if (current + move <= -limit) {
        return -limit;
      }
      return current + move;
    };
    var handleTouchmove = event => {
      if (!prevTouch) {
        return;
      }
      var target = event.currentTarget;
      var {
        touches
      } = event;
      var currentTouch = createVarTouch(touches[0], target);
      if (scale.value > 1) {
        var moveX = currentTouch.clientX - prevTouch.clientX;
        var moveY = currentTouch.clientY - prevTouch.clientY;
        var limitX = getLimitX(target);
        var limitY = getLimitY(target);
        translateX.value = getMoveTranslate(translateX.value, moveX, limitX);
        translateY.value = getMoveTranslate(translateY.value, moveY, limitY);
      }
      prevTouch = currentTouch;
    };
    var close = () => {
      if (scale.value > 1) {
        zoomOut();
        setTimeout(() => call(props['onUpdate:show'], false), ANIMATION_DURATION);
        return;
      }
      call(props['onUpdate:show'], false);
    };
    watch(() => props.show, newValue => {
      popupShow.value = newValue;
    }, {
      immediate: true
    });
    return {
      n,
      classes,
      initialIndex,
      popupShow,
      scale,
      translateX,
      translateY,
      canSwipe,
      transitionTimingFunction,
      transitionDuration,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      close
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;