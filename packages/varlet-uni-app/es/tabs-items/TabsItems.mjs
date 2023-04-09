function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import VarSwipe from '../swipe/index.mjs';
import { defineComponent, watch, ref } from 'vue';
import { useTabItem } from './provide.mjs';
import { call, createNamespace } from '../utils/components.mjs';
import { props } from './props.mjs';
import { doubleRaf } from '../utils/elements.mjs';
var {
  n
} = createNamespace('tabs-items');
import { renderSlot as _renderSlot, resolveComponent as _resolveComponent, normalizeClass as _normalizeClass, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_swipe = _resolveComponent("var-swipe");
  return _openBlock(), _createBlock(_component_var_swipe, {
    class: _normalizeClass(_ctx.n()),
    ref: "swipe",
    loop: _ctx.loop,
    touchable: _ctx.canSwipe,
    indicator: false,
    onChange: _ctx.handleSwipeChange
  }, {
    default: _withCtx(() => [_renderSlot(_ctx.$slots, "default")]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class", "loop", "touchable", "onChange"]);
}
var __sfc__ = defineComponent({
  name: 'VarTabsItems',
  components: {
    VarSwipe
  },
  props,
  setup(props) {
    var swipe = ref(null);
    var {
      tabItemList,
      bindTabItem,
      length
    } = useTabItem();
    var matchName = active => {
      return tabItemList.find(_ref => {
        var {
          name
        } = _ref;
        return active === name.value;
      });
    };
    var matchIndex = active => {
      return tabItemList.find(_ref2 => {
        var {
          index
        } = _ref2;
        return active === index.value;
      });
    };
    var matchActive = active => {
      return matchName(active) || matchIndex(active);
    };
    var handleActiveChange = newValue => {
      var _swipe$value;
      var newActiveTabItemProvider = matchActive(newValue);
      if (!newActiveTabItemProvider) {
        return;
      }
      tabItemList.forEach(_ref3 => {
        var {
          setCurrent
        } = _ref3;
        return setCurrent(false);
      });
      newActiveTabItemProvider.setCurrent(true);
      (_swipe$value = swipe.value) == null ? void 0 : _swipe$value.to(newActiveTabItemProvider.index.value);
    };
    var handleSwipeChange = currentIndex => {
      var _tabItem$name$value;
      var tabItem = tabItemList.find(_ref4 => {
        var {
          index
        } = _ref4;
        return index.value === currentIndex;
      });
      var active = (_tabItem$name$value = tabItem.name.value) != null ? _tabItem$name$value : tabItem.index.value;
      call(props['onUpdate:active'], active);
    };

    // expose
    var getSwipe = () => {
      return swipe.value;
    };
    var tabsItemsProvider = {};
    bindTabItem(tabsItemsProvider);
    watch(() => props.active, handleActiveChange);
    watch(() => length.value, /*#__PURE__*/_asyncToGenerator(function* () {
      yield doubleRaf();
      handleActiveChange(props.active);
    }));
    return {
      swipe,
      n,
      handleSwipeChange,
      getSwipe
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;