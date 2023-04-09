function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import { computed, defineComponent, ref, watch, onBeforeUnmount, onDeactivated, onActivated } from 'vue';
import { isPlainObject, toNumber } from '@varlet/shared';
import { easeInOutCubic } from '../utils/shared.mjs';
import { doubleRaf, getParentScroller, getScrollLeft, getScrollTop, nextTickFrame, requestAnimationFrame, scrollTo as varScrollTo, toPxNum } from '../utils/elements.mjs';
import { useIndexAnchors } from './provide.mjs';
import { props } from './props.mjs';
import { createNamespace, call } from '../utils/components.mjs';
import { useMounted } from '@varlet/use';
var {
  n,
  classes
} = createNamespace('index-bar');
import { renderSlot as _renderSlot, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = ["onClick"];
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n()),
    ref: "barEl"
  }, [_renderSlot(_ctx.$slots, "default"), _createElementVNode("ul", {
    class: _normalizeClass(_ctx.n('anchor-list')),
    style: _normalizeStyle({
      zIndex: _ctx.toNumber(_ctx.zIndex) + 2,
      display: _ctx.hideList ? 'none' : 'block'
    })
  }, [(_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.anchorNameList, anchorName => {
    return _openBlock(), _createElementBlock("li", {
      key: anchorName,
      class: _normalizeClass(_ctx.classes(_ctx.n('anchor-item'), [_ctx.active === anchorName, _ctx.n('anchor-item--active')])),
      style: _normalizeStyle({
        color: _ctx.active === anchorName && _ctx.highlightColor ? _ctx.highlightColor : ''
      }),
      onClick: $event => _ctx.anchorClick({
        anchorName,
        manualCall: true
      })
    }, _toDisplayString(anchorName), 15 /* TEXT, CLASS, STYLE, PROPS */, _hoisted_1);
  }), 128 /* KEYED_FRAGMENT */))], 6 /* CLASS, STYLE */)], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarIndexBar',
  props,
  setup(props) {
    var {
      length,
      indexAnchors,
      bindIndexAnchors
    } = useIndexAnchors();
    var clickedName = ref('');
    var barEl = ref(null);
    var anchorNameList = ref([]);
    var active = ref();
    var sticky = computed(() => props.sticky);
    var cssMode = computed(() => props.stickyCssMode || props.cssMode);
    var stickyOffsetTop = computed(() => toPxNum(props.stickyOffsetTop));
    var zIndex = computed(() => props.zIndex);
    var scroller = null;
    var isDeactivated = false;
    var indexBarProvider = {
      active,
      sticky,
      cssMode,
      stickyOffsetTop,
      zIndex
    };
    bindIndexAnchors(indexBarProvider);
    var emitEvent = (anchor, options) => {
      var anchorName = isPlainObject(anchor) ? anchor.name.value : anchor;
      if (anchorName === active.value || anchorName === undefined) return;
      active.value = anchorName;
      if ((options == null ? void 0 : options.event) !== false) {
        call(props.onChange, anchorName);
      }
    };
    var getOffsetTop = () => {
      if (!('getBoundingClientRect' in scroller)) {
        return 0;
      }
      var {
        top: parentTop
      } = scroller.getBoundingClientRect();
      var {
        scrollTop
      } = scroller;
      var {
        top: targetTop
      } = barEl.value.getBoundingClientRect();
      return scrollTop - parentTop + targetTop;
    };
    var handleScroll = () => {
      var scrollTop = getScrollTop(scroller);
      var scrollHeight = scroller === window ? document.body.scrollHeight : scroller.scrollHeight;
      var offsetTop = getOffsetTop();
      indexAnchors.forEach((anchor, index) => {
        var anchorTop = anchor.ownTop.value;
        var top = scrollTop - anchorTop + stickyOffsetTop.value - offsetTop;
        var distance = index === indexAnchors.length - 1 ? scrollHeight : indexAnchors[index + 1].ownTop.value - anchor.ownTop.value;
        anchor.setDisabled(true);
        if (top >= 0 && top < distance && clickedName.value === '') {
          anchor.setDisabled(false);
          emitEvent(anchor);
        }
      });
    };
    var anchorClick = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (_ref) {
        var {
          anchorName,
          manualCall = false,
          options
        } = _ref;
        if (manualCall) {
          call(props.onClick, anchorName);
        }
        if (anchorName === active.value && !isDeactivated) {
          return;
        }
        var indexAnchor = indexAnchors.find(_ref3 => {
          var {
            name
          } = _ref3;
          return anchorName === name.value;
        });
        if (!indexAnchor) {
          return;
        }
        var offsetTop = getOffsetTop();
        var top = indexAnchor.ownTop.value - stickyOffsetTop.value + offsetTop;
        var left = getScrollLeft(scroller);
        clickedName.value = anchorName;
        emitEvent(anchorName, options);
        yield varScrollTo(scroller, {
          left,
          top,
          animation: easeInOutCubic,
          duration: toNumber(props.duration)
        });
        nextTickFrame(() => {
          clickedName.value = '';
        });
      });
      return function anchorClick(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    var setScroller = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(function* () {
        yield doubleRaf();
        scroller = getParentScroller(barEl.value);
      });
      return function setScroller() {
        return _ref4.apply(this, arguments);
      };
    }();
    var addScrollerListener = () => {
      scroller.addEventListener('scroll', handleScroll);
    };
    var removeScrollerListener = () => {
      scroller.removeEventListener('scroll', handleScroll);
    };

    // expose
    var scrollTo = (index, options) => {
      requestAnimationFrame(() => anchorClick({
        anchorName: index,
        options
      }));
    };
    watch(() => length.value, /*#__PURE__*/_asyncToGenerator(function* () {
      yield doubleRaf();
      indexAnchors.forEach(_ref6 => {
        var {
          name,
          setOwnTop
        } = _ref6;
        if (name.value) anchorNameList.value.push(name.value);
        setOwnTop();
      });
    }));
    useMounted( /*#__PURE__*/_asyncToGenerator(function* () {
      yield setScroller();
      addScrollerListener();
    }));
    onBeforeUnmount(removeScrollerListener);
    onDeactivated(() => {
      isDeactivated = true;
      removeScrollerListener();
    });
    onActivated(() => {
      if (!isDeactivated || active.value === undefined) return;
      anchorClick({
        anchorName: active.value,
        options: {
          event: false
        }
      });
      isDeactivated = false;
    });
    return {
      n,
      classes,
      barEl,
      active,
      zIndex,
      anchorNameList,
      toNumber,
      scrollTo,
      anchorClick
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;