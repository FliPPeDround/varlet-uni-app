function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import VarIcon from '../icon/index.mjs';
import { defineComponent, ref, computed, watch, nextTick } from 'vue';
import { getParentScroller, getScrollTop, getTarget } from '../utils/elements.mjs';
import { props } from './props.mjs';
import { isString, toNumber } from '@varlet/shared';
import { call, createNamespace } from '../utils/components.mjs';
import { useEventListener, useMounted } from '@varlet/use';
var {
  n,
  classes
} = createNamespace('pull-refresh');
var ICON_TRANSITION = 150;
import { resolveComponent as _resolveComponent, normalizeClass as _normalizeClass, createVNode as _createVNode, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  return _openBlock(), _createElementBlock("div", {
    ref: "freshNode",
    class: _normalizeClass(_ctx.n()),
    onTouchstart: _cache[0] || (_cache[0] = function () {
      return _ctx.touchStart && _ctx.touchStart(...arguments);
    }),
    onTouchend: _cache[1] || (_cache[1] = function () {
      return _ctx.touchEnd && _ctx.touchEnd(...arguments);
    }),
    onTouchcancel: _cache[2] || (_cache[2] = function () {
      return _ctx.touchEnd && _ctx.touchEnd(...arguments);
    })
  }, [_createElementVNode("div", {
    ref: "controlNode",
    class: _normalizeClass(_ctx.classes(_ctx.n('control'), _ctx.n('$-elevation--2'), [_ctx.isSuccess, _ctx.n('control-success')])),
    style: _normalizeStyle(_ctx.controlStyle)
  }, [_createVNode(_component_var_icon, {
    name: _ctx.iconName,
    transition: _ctx.ICON_TRANSITION,
    class: _normalizeClass(_ctx.classes(_ctx.n('icon'), [_ctx.refreshStatus === 'loading' && _ctx.iconHasChanged, _ctx.n('animation')])),
    "var-pull-refresh-cover": ""
  }, null, 8 /* PROPS */, ["name", "transition", "class"])], 6 /* CLASS, STYLE */), _renderSlot(_ctx.$slots, "default")], 34 /* CLASS, HYDRATE_EVENTS */);
}

var __sfc__ = defineComponent({
  name: 'VarPullRefresh',
  components: {
    VarIcon
  },
  props,
  setup(props) {
    var controlPosition = ref(0);
    var freshNode = ref(null);
    var controlNode = ref(null);
    var startPosition = ref(0);
    var distance = ref('-125%');
    var iconName = ref('arrow-down');
    var refreshStatus = ref('default');
    var isEnd = ref(false);
    var scroller;
    var eventTargetScroller;
    var changing;
    var startY = 0;
    var deltaY = 0;

    // https://github.com/varletjs/varlet/issues/509
    var iconHasChanged = ref(true);
    var isTouchable = computed(() => refreshStatus.value !== 'loading' && refreshStatus.value !== 'success' && !props.disabled);
    var controlStyle = computed(() => ({
      transform: "translate3d(0px, " + (isString(distance.value) ? distance.value : distance.value + "px") + ", 0px) translate(-50%, 0)",
      transition: isEnd.value ? "transform " + props.animationDuration + "ms" : undefined,
      background: isSuccess.value ? props.successBgColor : props.bgColor,
      color: isSuccess.value ? props.successColor : props.color
    }));
    var maxDistance = computed(() => Math.abs(2 * controlPosition.value));
    var isSuccess = computed(() => refreshStatus.value === 'success');
    var changeIcon = () => {
      return new Promise(resolve => {
        window.setTimeout(() => {
          iconHasChanged.value = true;
          resolve();
        }, ICON_TRANSITION);
      });
    };
    var lockEvent = action => {
      var el = 'classList' in scroller ? scroller : document.body;
      el.classList[action](n() + "--lock");
    };
    var touchStart = event => {
      if (controlPosition.value === 0) {
        var {
          width
        } = controlNode.value.getBoundingClientRect();
        controlPosition.value = -(width + width * 0.25);
      }
      startY = event.touches[0].clientY;
      deltaY = 0;
      eventTargetScroller = getParentScroller(event.target);
    };
    var touchMove = event => {
      if (!isTouchable.value) {
        return;
      }
      if (eventTargetScroller !== scroller && getScrollTop(eventTargetScroller) > 0) {
        return;
      }
      var scrollTop = getScrollTop(scroller);
      if (scrollTop > 0) {
        return;
      }
      var isReachTop = scrollTop === 0;
      var touch = event.touches[0];
      deltaY = touch.clientY - startY;
      if (isReachTop && deltaY >= 0) {
        event.preventDefault();
      }
      if (refreshStatus.value !== 'pulling') {
        refreshStatus.value = 'pulling';
        startPosition.value = event.touches[0].clientY;
      }
      if (isReachTop && distance.value > controlPosition.value) {
        lockEvent('add');
      }
      var moveDistance = (event.touches[0].clientY - startPosition.value) / 2 + controlPosition.value;
      distance.value = moveDistance >= maxDistance.value ? maxDistance.value : moveDistance;
      if (distance.value >= maxDistance.value * 0.2) {
        iconHasChanged.value = false;
        iconName.value = 'refresh';
        changing = changeIcon();
      } else {
        iconName.value = 'arrow-down';
      }
    };
    var touchEnd = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* () {
        if (!isTouchable.value) return;
        isEnd.value = true;
        if (distance.value >= maxDistance.value * 0.2) {
          yield changing;
          refreshStatus.value = 'loading';
          distance.value = maxDistance.value * 0.3;
          call(props['onUpdate:modelValue'], true);
          nextTick(() => {
            call(props.onRefresh);
          });
          lockEvent('remove');
        } else {
          refreshStatus.value = 'loosing';
          iconName.value = 'arrow-down';
          distance.value = controlPosition.value;
          setTimeout(() => {
            isEnd.value = false;
            lockEvent('remove');
          }, toNumber(props.animationDuration));
        }
        eventTargetScroller = null;
      });
      return function touchEnd() {
        return _ref.apply(this, arguments);
      };
    }();
    var setScroller = () => {
      scroller = props.target ? getTarget(props.target, 'PullRefresh') : getParentScroller(freshNode.value);
    };
    var reset = () => {
      setTimeout(() => {
        refreshStatus.value = 'default';
        iconName.value = 'arrow-down';
        isEnd.value = false;
      }, toNumber(props.animationDuration));
    };
    watch(() => props.modelValue, newValue => {
      if (newValue === false) {
        isEnd.value = true;
        refreshStatus.value = 'success';
        iconName.value = 'checkbox-marked-circle';
        setTimeout(() => {
          distance.value = controlPosition.value;
          reset();
        }, toNumber(props.successDuration));
      }
    });
    useMounted(setScroller);
    useEventListener(freshNode, 'touchmove', touchMove);
    return {
      n,
      classes,
      iconHasChanged,
      ICON_TRANSITION,
      refreshStatus,
      freshNode,
      controlNode,
      touchStart,
      touchMove,
      touchEnd,
      iconName,
      controlStyle,
      isSuccess
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;