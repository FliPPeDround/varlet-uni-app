function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import { defineComponent, ref, computed, watch, onUnmounted, onDeactivated, onActivated } from 'vue';
import { useSwipeItems } from './provide.mjs';
import { doubleRaf, nextTickFrame } from '../utils/elements.mjs';
import { props } from './props.mjs';
import { isNumber, toNumber } from '@varlet/shared';
import { call, createNamespace } from '../utils/components.mjs';
import { useEventListener } from '@varlet/use';
var SWIPE_DELAY = 250;
var SWIPE_DISTANCE = 20;
var {
  n,
  classes
} = createNamespace('swipe');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = ["onClick"];
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n()),
    ref: "swipeEl"
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('track'), [_ctx.vertical, _ctx.n('--vertical')])),
    style: _normalizeStyle({
      width: !_ctx.vertical ? _ctx.trackSize + "px" : undefined,
      height: _ctx.vertical ? _ctx.trackSize + "px" : undefined,
      transform: "translate" + (_ctx.vertical ? 'Y' : 'X') + "(" + _ctx.translate + "px)",
      transitionDuration: _ctx.lockDuration ? "0ms" : _ctx.toNumber(_ctx.duration) + "ms"
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
  }, [_renderSlot(_ctx.$slots, "default")], 38 /* CLASS, STYLE, HYDRATE_EVENTS */), _renderSlot(_ctx.$slots, "indicator", {
    index: _ctx.index,
    length: _ctx.length
  }, () => [_ctx.indicator && _ctx.length ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.classes(_ctx.n('indicators'), [_ctx.vertical, _ctx.n('--indicators-vertical')]))
  }, [(_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.length, (l, idx) => {
    return _openBlock(), _createElementBlock("div", {
      class: _normalizeClass(_ctx.classes(_ctx.n('indicator'), [_ctx.index === idx, _ctx.n('--indicator-active')], [_ctx.vertical, _ctx.n('--indicator-vertical')])),
      style: _normalizeStyle({
        background: _ctx.indicatorColor
      }),
      key: l,
      onClick: $event => _ctx.to(idx)
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_1);
  }), 128 /* KEYED_FRAGMENT */))], 2 /* CLASS */)) : _createCommentVNode("v-if", true)])], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarSwipe',
  props,
  setup(props) {
    var swipeEl = ref(null);
    var size = ref(0);
    var vertical = computed(() => props.vertical);
    var trackSize = ref(0);
    var translate = ref(0);
    var lockDuration = ref(false);
    var index = ref(0);
    var {
      swipeItems,
      bindSwipeItems,
      length
    } = useSwipeItems();
    var touching = false;
    var timer = -1;
    var startX;
    var startY;
    var startTime;
    var prevX;
    var prevY;
    var findSwipeItem = idx => swipeItems.find(_ref => {
      var {
        index
      } = _ref;
      return index.value === idx;
    });
    var dispatchBorrower = () => {
      if (!props.loop) {
        return;
      }
      // track out of bounds from left
      if (translate.value >= 0) {
        findSwipeItem(length.value - 1).setTranslate(-trackSize.value);
      }
      // track out of bounds from right
      if (translate.value <= -(trackSize.value - size.value)) {
        findSwipeItem(0).setTranslate(trackSize.value);
      }
      // track not out of bounds
      if (translate.value > -(trackSize.value - size.value) && translate.value < 0) {
        findSwipeItem(length.value - 1).setTranslate(0);
        findSwipeItem(0).setTranslate(0);
      }
    };
    var getSwipeIndex = targetSwipeIndex => {
      var swipeIndex = isNumber(targetSwipeIndex) ? targetSwipeIndex : Math.floor((translate.value - size.value / 2) / -size.value);
      var {
        loop
      } = props;
      if (swipeIndex <= -1) {
        return loop ? -1 : 0;
      }
      if (swipeIndex >= length.value) {
        return loop ? length.value : length.value - 1;
      }
      return swipeIndex;
    };
    var swipeIndexToIndex = swipeIndex => {
      var {
        loop
      } = props;
      if (swipeIndex === -1) {
        return loop ? length.value - 1 : 0;
      }
      if (swipeIndex === length.value) {
        return loop ? 0 : length.value - 1;
      }
      return swipeIndex;
    };
    var boundaryIndex = index => {
      var {
        loop
      } = props;
      if (index < 0) {
        return loop ? length.value - 1 : 0;
      }
      if (index > length.value - 1) {
        return loop ? 0 : length.value - 1;
      }
      return index;
    };
    var fixPosition = fn => {
      var overLeft = translate.value >= size.value;
      var overRight = translate.value <= -trackSize.value;
      var leftTranslate = 0;
      var rightTranslate = -(trackSize.value - size.value);
      lockDuration.value = true;
      // 检测是否有越界情况 越界修正
      if (overLeft || overRight) {
        lockDuration.value = true;
        translate.value = overRight ? leftTranslate : rightTranslate;
        findSwipeItem(0).setTranslate(0);
        findSwipeItem(length.value - 1).setTranslate(0);
      }
      nextTickFrame(() => {
        lockDuration.value = false;
        call(fn);
      });
    };
    var initialIndex = () => {
      index.value = boundaryIndex(toNumber(props.initialIndex));
    };
    var startAutoplay = () => {
      var {
        autoplay
      } = props;
      if (!autoplay || length.value <= 1) {
        return;
      }
      stopAutoplay();
      timer = window.setTimeout(() => {
        next();
        startAutoplay();
      }, toNumber(autoplay));
    };
    var stopAutoplay = () => {
      timer && clearTimeout(timer);
    };
    var getDirection = (x, y) => {
      if (x > y && x > 10) {
        return 'horizontal';
      }
      if (y > x && y > 10) {
        return 'vertical';
      }
    };
    var handleTouchstart = event => {
      if (length.value <= 1 || !props.touchable) {
        return;
      }
      var {
        clientX,
        clientY
      } = event.touches[0];
      startX = clientX;
      startY = clientY;
      startTime = performance.now();
      touching = true;
      stopAutoplay();
      fixPosition(() => {
        lockDuration.value = true;
      });
    };
    var handleTouchmove = event => {
      var {
        touchable,
        vertical
      } = props;
      if (!touching || !touchable) {
        return;
      }
      var {
        clientX,
        clientY
      } = event.touches[0];
      var deltaX = Math.abs(clientX - startX);
      var deltaY = Math.abs(clientY - startY);
      var direction = getDirection(deltaX, deltaY);
      var expectDirection = vertical ? 'vertical' : 'horizontal';
      if (direction === expectDirection) {
        event.preventDefault();
        var moveX = prevX !== undefined ? clientX - prevX : 0;
        var moveY = prevY !== undefined ? clientY - prevY : 0;
        prevX = clientX;
        prevY = clientY;
        translate.value += vertical ? moveY : moveX;
        dispatchBorrower();
      }
    };
    var handleTouchend = () => {
      if (!touching) {
        return;
      }
      var {
        vertical,
        onChange
      } = props;
      var positive = vertical ? prevY < startY : prevX < startX;
      var distance = vertical ? Math.abs(startY - prevY) : Math.abs(startX - prevX);
      var quickSwiping = performance.now() - startTime <= SWIPE_DELAY && distance >= SWIPE_DISTANCE;
      var swipeIndex = quickSwiping ? positive ? getSwipeIndex(index.value + 1) : getSwipeIndex(index.value - 1) : getSwipeIndex();
      touching = false;
      lockDuration.value = false;
      prevX = undefined;
      prevY = undefined;
      translate.value = swipeIndex * -size.value;
      var prevIndex = index.value;
      index.value = swipeIndexToIndex(swipeIndex);
      startAutoplay();
      prevIndex !== index.value && call(onChange, index.value);
    };

    // expose
    var resize = () => {
      if (!swipeEl.value) {
        return;
      }
      lockDuration.value = true;
      size.value = props.vertical ? swipeEl.value.offsetHeight : swipeEl.value.offsetWidth;
      trackSize.value = size.value * length.value;
      translate.value = index.value * -size.value;
      swipeItems.forEach(swipeItem => {
        swipeItem.setTranslate(0);
      });
      startAutoplay();
      setTimeout(() => {
        lockDuration.value = false;
      });
    };
    // expose
    var next = options => {
      if (length.value <= 1) {
        return;
      }
      var {
        loop,
        onChange
      } = props;
      var currentIndex = index.value;
      index.value = boundaryIndex(currentIndex + 1);
      if ((options == null ? void 0 : options.event) !== false) {
        call(onChange, index.value);
      }
      fixPosition(() => {
        if (currentIndex === length.value - 1 && loop) {
          findSwipeItem(0).setTranslate(trackSize.value);
          translate.value = length.value * -size.value;
          return;
        }
        if (currentIndex !== length.value - 1) {
          translate.value = index.value * -size.value;
        }
      });
    };
    // expose
    var prev = options => {
      if (length.value <= 1) {
        return;
      }
      var {
        loop,
        onChange
      } = props;
      var currentIndex = index.value;
      index.value = boundaryIndex(currentIndex - 1);
      if ((options == null ? void 0 : options.event) !== false) {
        call(onChange, index.value);
      }
      fixPosition(() => {
        if (currentIndex === 0 && loop) {
          findSwipeItem(length.value - 1).setTranslate(-trackSize.value);
          translate.value = size.value;
          return;
        }
        if (currentIndex !== 0) {
          translate.value = index.value * -size.value;
        }
      });
    };
    // expose
    var to = (idx, options) => {
      if (length.value <= 1 || idx === index.value) {
        return;
      }
      idx = idx < 0 ? 0 : idx;
      idx = idx >= length.value ? length.value : idx;
      var task = idx > index.value ? next : prev;
      var count = Math.abs(idx - index.value);
      Array.from({
        length: count
      }).forEach((_, index) => {
        task({
          event: index === count - 1 ? options == null ? void 0 : options.event : false
        });
      });
    };
    var swipeProvider = {
      size,
      vertical
    };
    bindSwipeItems(swipeProvider);
    watch(() => length.value, /*#__PURE__*/_asyncToGenerator(function* () {
      // In nuxt, the size of the swipe cannot got when the route is change, need double raf
      yield doubleRaf();
      initialIndex();
      resize();
    }));
    onActivated(resize);
    onDeactivated(stopAutoplay);
    onUnmounted(stopAutoplay);
    useEventListener(window, 'resize', resize);
    return {
      n,
      classes,
      length,
      index,
      swipeEl,
      trackSize,
      translate,
      lockDuration,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      next,
      prev,
      to,
      resize,
      toNumber
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;