function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import VarSticky from '../sticky/index.mjs';
import { defineComponent, watch, ref, computed, Transition, onActivated } from 'vue';
import { props } from './props.mjs';
import { useTabList } from './provide.mjs';
import { isNumber } from '@varlet/shared';
import { linear } from '../utils/shared.mjs';
import { toSizeUnit, scrollTo, doubleRaf } from '../utils/elements.mjs';
import { createNamespace, call, formatElevation } from '../utils/components.mjs';
import { useEventListener } from '@varlet/use';
var {
  n,
  classes
} = createNamespace('tabs');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, mergeProps as _mergeProps, resolveDynamicComponent as _resolveDynamicComponent, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createBlock(_resolveDynamicComponent(_ctx.sticky ? _ctx.n('$-sticky') : _ctx.Transition), {
    ref: _ctx.sticky ? 'stickyComponent' : undefined,
    "css-mode": _ctx.sticky ? _ctx.stickyCssMode : undefined,
    "offset-top": _ctx.sticky ? _ctx.offsetTop : undefined,
    "z-index": _ctx.sticky ? _ctx.stickyZIndex : undefined
  }, {
    default: _withCtx(() => [_createElementVNode("div", _mergeProps({
      class: _ctx.classes(_ctx.n(), _ctx.n('$--box'), _ctx.n("--item-" + _ctx.itemDirection), _ctx.n("--layout-" + _ctx.layoutDirection + "-padding"), _ctx.formatElevation(_ctx.elevation, 4), [_ctx.fixedBottom, _ctx.n('--fixed-bottom')], [_ctx.safeArea, _ctx.n('--safe-area')]),
      style: {
        background: _ctx.color
      }
    }, _ctx.$attrs), [_createElementVNode("div", {
      ref: "scrollerEl",
      class: _normalizeClass(_ctx.classes(_ctx.n('tab-wrap'), [_ctx.localScrollable, _ctx.n("--layout-" + _ctx.layoutDirection + "-scrollable")], _ctx.n("--layout-" + _ctx.layoutDirection)))
    }, [_renderSlot(_ctx.$slots, "default"), _createElementVNode("div", {
      class: _normalizeClass(_ctx.classes(_ctx.n('indicator'), _ctx.n("--layout-" + _ctx.layoutDirection + _ctx.indicatorPosition + "-indicator"))),
      style: _normalizeStyle({
        width: _ctx.layoutDirection === 'horizontal' ? _ctx.indicatorWidth : _ctx.toSizeUnit(_ctx.indicatorSize),
        height: _ctx.layoutDirection === 'horizontal' ? _ctx.toSizeUnit(_ctx.indicatorSize) : _ctx.indicatorHeight,
        transform: _ctx.layoutDirection === 'horizontal' ? "translateX(" + _ctx.indicatorX + ")" : "translateY(" + _ctx.indicatorY + ")"
      })
    }, [_createElementVNode("div", {
      class: _normalizeClass(_ctx.classes(_ctx.n('indicator-inner'), _ctx.n("--layout-" + _ctx.layoutDirection + "-indicator-inner"))),
      style: _normalizeStyle({
        background: _ctx.indicatorColor || _ctx.activeColor
      })
    }, null, 6 /* CLASS, STYLE */)], 6 /* CLASS, STYLE */)], 2 /* CLASS */)], 16 /* FULL_PROPS */)]),

    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["css-mode", "offset-top", "z-index"]);
}
var __sfc__ = defineComponent({
  name: 'VarTabs',
  components: {
    VarSticky
  },
  inheritAttrs: false,
  props,
  setup(props) {
    var indicatorWidth = ref('0px');
    var indicatorHeight = ref('0px');
    var indicatorX = ref('0px');
    var indicatorY = ref('0px');
    var localScrollable = ref(false);
    var scrollerEl = ref(null);
    var active = computed(() => props.active);
    var indicatorPosition = computed(() => props.indicatorPosition === 'reverse' ? '-reverse' : '');
    var activeColor = computed(() => props.activeColor);
    var inactiveColor = computed(() => props.inactiveColor);
    var disabledColor = computed(() => props.disabledColor);
    var itemDirection = computed(() => props.itemDirection);
    var stickyComponent = ref(null);
    var {
      tabList,
      bindTabList,
      length
    } = useTabList();
    var onTabClick = tab => {
      var _tab$name$value;
      var currentActive = (_tab$name$value = tab.name.value) != null ? _tab$name$value : tab.index.value;
      var {
        active,
        onChange,
        onClick
      } = props;
      call(props['onUpdate:active'], currentActive);
      call(onClick, currentActive);
      currentActive !== active && call(onChange, currentActive);
    };
    var matchName = () => {
      return tabList.find(_ref => {
        var {
          name
        } = _ref;
        return props.active === name.value;
      });
    };
    var matchIndex = activeIndex => {
      return tabList.find(_ref2 => {
        var {
          index
        } = _ref2;
        return (activeIndex != null ? activeIndex : props.active) === index.value;
      });
    };
    var matchBoundary = () => {
      if (length.value === 0) {
        return;
      }
      var {
        active
      } = props;
      if (isNumber(active)) {
        var activeIndex = active > length.value - 1 ? length.value - 1 : 0;
        call(props['onUpdate:active'], activeIndex);
        return matchIndex(activeIndex);
      }
    };
    var watchScrollable = () => {
      localScrollable.value = props.scrollable === 'always' || tabList.length >= 5;
    };
    var moveIndicator = _ref3 => {
      var {
        element
      } = _ref3;
      var el = element.value;
      if (!el) return;
      if (props.layoutDirection === 'horizontal') {
        indicatorWidth.value = el.offsetWidth + "px";
        indicatorX.value = el.offsetLeft + "px";
      } else {
        indicatorHeight.value = el.offsetHeight + "px";
        indicatorY.value = el.offsetTop + "px";
      }
    };
    var scrollToCenter = _ref4 => {
      var {
        element
      } = _ref4;
      if (!localScrollable.value) {
        return;
      }
      var scroller = scrollerEl.value;
      var el = element.value;
      if (props.layoutDirection === 'horizontal') {
        var left = el.offsetLeft + el.offsetWidth / 2 - scroller.offsetWidth / 2;
        scrollTo(scroller, {
          left,
          animation: linear
        });
      } else {
        var top = el.offsetTop + el.offsetHeight / 2 - scroller.offsetHeight / 2;
        scrollTo(scroller, {
          top,
          animation: linear
        });
      }
    };

    // expose
    var resize = () => {
      var tab = matchName() || matchIndex() || matchBoundary();
      if (!tab || tab.disabled.value) {
        return;
      }
      watchScrollable();
      moveIndicator(tab);
      scrollToCenter(tab);
    };

    // expose
    var resizeSticky = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(function* () {
        if (props.sticky && stickyComponent.value) {
          yield stickyComponent.value.resize();
        }
      });
      return function resizeSticky() {
        return _ref5.apply(this, arguments);
      };
    }();
    var tabsProvider = {
      active,
      activeColor,
      inactiveColor,
      disabledColor,
      itemDirection,
      resize,
      onTabClick
    };
    bindTabList(tabsProvider);
    watch(() => length.value, /*#__PURE__*/_asyncToGenerator(function* () {
      yield doubleRaf();
      resize();
    }));
    watch(() => props.active, resize);
    watch(() => props.scrollable, resize);
    useEventListener(window, 'resize', resize);
    onActivated(resize);
    return {
      stickyComponent,
      indicatorWidth,
      indicatorHeight,
      indicatorX,
      indicatorY,
      indicatorPosition,
      localScrollable,
      scrollerEl,
      Transition,
      toSizeUnit,
      n,
      classes,
      resize,
      resizeSticky,
      formatElevation
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;