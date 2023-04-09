function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import { defineComponent, ref, onUnmounted, onDeactivated, computed, watch } from 'vue';
import { props } from './props.mjs';
import { doubleRaf, getParentScroller, raf, toPxNum } from '../utils/elements.mjs';
import { toNumber } from '@varlet/shared';
import { call, createNamespace } from '../utils/components.mjs';
import { useEventListener, useMounted } from '@varlet/use';
var {
  n,
  classes
} = createNamespace('sticky');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), [_ctx.enableCSSMode, _ctx.n('--css-mode')])),
    ref: "stickyEl",
    style: _normalizeStyle({
      zIndex: _ctx.toNumber(_ctx.zIndex),
      top: _ctx.enableCSSMode ? _ctx.offsetTop + "px" : undefined,
      width: _ctx.enableFixedMode ? _ctx.fixedWidth : undefined,
      height: _ctx.enableFixedMode ? _ctx.fixedHeight : undefined
    })
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('wrapper')),
    ref: "wrapperEl",
    style: _normalizeStyle({
      zIndex: _ctx.toNumber(_ctx.zIndex),
      position: _ctx.enableFixedMode ? 'fixed' : undefined,
      width: _ctx.enableFixedMode ? _ctx.fixedWrapperWidth : undefined,
      height: _ctx.enableFixedMode ? _ctx.fixedWrapperHeight : undefined,
      left: _ctx.enableFixedMode ? _ctx.fixedLeft : undefined,
      top: _ctx.enableFixedMode ? _ctx.fixedTop : undefined
    })
  }, [_renderSlot(_ctx.$slots, "default")], 6 /* CLASS, STYLE */)], 6 /* CLASS, STYLE */);
}

var __sfc__ = defineComponent({
  name: 'VarSticky',
  props,
  setup(props) {
    var stickyEl = ref(null);
    var wrapperEl = ref(null);
    var isFixed = ref(false);
    var fixedTop = ref('0px');
    var fixedLeft = ref('0px');
    var fixedWidth = ref('auto');
    var fixedHeight = ref('auto');
    var fixedWrapperWidth = ref('auto');
    var fixedWrapperHeight = ref('auto');
    var enableCSSMode = computed(() => !props.disabled && props.cssMode);
    var enableFixedMode = computed(() => !props.disabled && !props.cssMode && isFixed.value);
    var offsetTop = computed(() => toPxNum(props.offsetTop));
    var scroller;
    var computeFixedParams = () => {
      var {
        cssMode,
        disabled
      } = props;
      if (disabled) {
        return;
      }
      var scrollerTop = 0;
      if (scroller !== window) {
        var {
          top
        } = scroller.getBoundingClientRect();
        scrollerTop = top;
      }
      var wrapper = wrapperEl.value;
      var sticky = stickyEl.value;
      var {
        top: stickyTop,
        left: stickyLeft
      } = sticky.getBoundingClientRect();
      var currentOffsetTop = stickyTop - scrollerTop;
      if (currentOffsetTop <= offsetTop.value) {
        if (!cssMode) {
          fixedWidth.value = sticky.offsetWidth + "px";
          fixedHeight.value = sticky.offsetHeight + "px";
          fixedTop.value = scrollerTop + offsetTop.value + "px";
          fixedLeft.value = stickyLeft + "px";
          fixedWrapperWidth.value = wrapper.offsetWidth + "px";
          fixedWrapperHeight.value = wrapper.offsetHeight + "px";
          isFixed.value = true;
        }
        return {
          offsetTop: offsetTop.value,
          isFixed: true
        };
      }
      isFixed.value = false;
      return {
        offsetTop: currentOffsetTop,
        isFixed: false
      };
    };
    var handleScroll = () => {
      if (!scroller) {
        return;
      }

      // returns undefined when disabled = true
      var fixedParams = computeFixedParams();
      if (fixedParams) {
        call(props.onScroll, fixedParams.offsetTop, fixedParams.isFixed);
      }
    };

    // expose
    var resize = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* () {
        isFixed.value = false;
        yield raf();
        computeFixedParams();
      });
      return function resize() {
        return _ref.apply(this, arguments);
      };
    }();
    var addScrollListener = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* () {
        yield doubleRaf();
        scroller = getParentScroller(stickyEl.value);
        scroller !== window && scroller.addEventListener('scroll', handleScroll);
        handleScroll();
      });
      return function addScrollListener() {
        return _ref2.apply(this, arguments);
      };
    }();
    var removeScrollListener = () => {
      scroller !== window && scroller.removeEventListener('scroll', handleScroll);
    };
    watch(() => props.disabled, resize);
    useMounted(addScrollListener);
    onUnmounted(removeScrollListener);
    onDeactivated(removeScrollListener);
    useEventListener(window, 'scroll', handleScroll);
    useEventListener(window, 'resize', resize);
    return {
      n,
      classes,
      resize,
      stickyEl,
      wrapperEl,
      isFixed,
      offsetTop,
      fixedTop,
      fixedLeft,
      fixedWidth,
      fixedHeight,
      fixedWrapperWidth,
      fixedWrapperHeight,
      enableCSSMode,
      enableFixedMode,
      toNumber
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;