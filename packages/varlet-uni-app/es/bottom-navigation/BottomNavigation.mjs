function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import VarButton from '../button/index.mjs';
import { defineComponent, ref, computed, onUpdated, watch } from 'vue';
import { props } from './props.mjs';
import { useBottomNavigationItems } from './provide.mjs';
import { createNamespace, call } from '../utils/components.mjs';
import { isNumber, isArray } from '@varlet/shared';
import { useMounted } from '@varlet/use';
var {
  n,
  classes
} = createNamespace('bottom-navigation');
var {
  n: nItem
} = createNamespace('bottom-navigation-item');
var RIGHT_HALF_SPACE_CLASS = nItem('--right-half-space');
var LEFT_HALF_SPACE_CLASS = nItem('--left-half-space');
var RIGHT_SPACE_CLASS = nItem('--right-space');
var defaultFabProps = {
  type: 'primary'
};
import { renderSlot as _renderSlot, resolveComponent as _resolveComponent, mergeProps as _mergeProps, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_button = _resolveComponent("var-button");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box'), [_ctx.fixed, _ctx.n('--fixed')], [_ctx.border, _ctx.n('--border')], [_ctx.safeArea, _ctx.n('--safe-area')])),
    ref: "bottomNavigationDom",
    style: _normalizeStyle("z-index:" + _ctx.zIndex)
  }, [_renderSlot(_ctx.$slots, "default"), _ctx.$slots.fab ? (_openBlock(), _createBlock(_component_var_button, _mergeProps({
    key: 0,
    class: _ctx.classes(_ctx.n('fab'), [_ctx.length % 2, _ctx.n('--fab-right'), _ctx.n('--fab-center')]),
    "var-bottom-navigation__fab": "",
    onClick: _ctx.handleFabClick
  }, _ctx.fabProps, {
    round: ""
  }), {
    default: _withCtx(() => [_renderSlot(_ctx.$slots, "fab")]),
    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */, ["class", "onClick"])) : _createCommentVNode("v-if", true)], 6 /* CLASS, STYLE */);
}

var __sfc__ = defineComponent({
  name: 'VarBottomNavigation',
  components: {
    VarButton
  },
  props,
  setup(props, _ref) {
    var {
      slots
    } = _ref;
    var bottomNavigationDom = ref(null);
    var active = computed(() => props.active);
    var activeColor = computed(() => props.activeColor);
    var inactiveColor = computed(() => props.inactiveColor);
    var fabProps = ref({});
    var {
      length,
      bottomNavigationItems,
      bindBottomNavigationItem
    } = useBottomNavigationItems();
    var matchBoundary = () => {
      if (length.value === 0 || matchName() || matchIndex()) {
        return;
      }
      handleActiveIndex();
    };
    var matchName = () => {
      return bottomNavigationItems.find(_ref2 => {
        var {
          name
        } = _ref2;
        return active.value === name.value;
      });
    };
    var matchIndex = () => {
      return bottomNavigationItems.find(_ref3 => {
        var {
          index
        } = _ref3;
        return active.value === index.value;
      });
    };
    var handleActiveIndex = () => {
      if (!isNumber(active.value)) {
        return;
      }
      if (active.value < 0) {
        call(props['onUpdate:active'], 0);
      } else if (active.value > length.value - 1) {
        call(props['onUpdate:active'], length.value - 1);
      }
    };
    var onToggle = changedValue => {
      if (active.value === changedValue) {
        return;
      }
      props.onBeforeChange ? handleBeforeChange(changedValue) : handleChange(changedValue);
    };
    var handleBeforeChange = changedValue => {
      var results = call(props.onBeforeChange, changedValue);
      results = isArray(results) ? results : [results];
      Promise.all(results).then(results => {
        if (!results.some(result => !result)) {
          handleChange(changedValue);
        }
      });
    };
    var handleChange = changedValue => {
      call(props['onUpdate:active'], changedValue);
      call(props.onChange, changedValue);
    };
    var removeMarginClass = () => {
      var bottomNavigationItems = getBottomNavigationItems();
      bottomNavigationItems.forEach(dom => {
        dom.classList.remove(RIGHT_HALF_SPACE_CLASS, LEFT_HALF_SPACE_CLASS, RIGHT_SPACE_CLASS);
      });
    };
    var addMarginClass = length => {
      var bottomNavigationItems = getBottomNavigationItems();
      var itemsNum = bottomNavigationItems.length;
      var isEven = length % 2 === 0;
      bottomNavigationItems.forEach((bottomNavigationItem, i) => {
        handleMarginClass(isEven, bottomNavigationItem, i, itemsNum);
      });
    };
    var handleMarginClass = (isEven, dom, i, length) => {
      var isLast = i === length - 1;
      if (!isEven && isLast) {
        dom.classList.add(RIGHT_SPACE_CLASS);
        return;
      }
      var isFabLeft = i === length / 2 - 1;
      var isFabRight = i === length / 2;
      if (isFabLeft) {
        dom.classList.add(RIGHT_HALF_SPACE_CLASS);
      } else if (isFabRight) {
        dom.classList.add(LEFT_HALF_SPACE_CLASS);
      }
    };
    var getBottomNavigationItems = () => {
      return Array.from(bottomNavigationDom.value.querySelectorAll("." + nItem()));
    };
    var handleFabClick = () => {
      call(props.onFabClick);
    };
    var bottomNavigationProvider = {
      active,
      activeColor,
      inactiveColor,
      onToggle
    };
    bindBottomNavigationItem(bottomNavigationProvider);
    watch(() => length.value, matchBoundary);
    watch(() => props.fabProps, newValue => {
      fabProps.value = _extends({}, defaultFabProps, newValue);
    }, {
      immediate: true,
      deep: true
    });
    useMounted(() => {
      if (!slots.fab) {
        return;
      }
      addMarginClass(length.value);
    });
    onUpdated(() => {
      removeMarginClass();
      if (!slots.fab) {
        return;
      }
      addMarginClass(length.value);
    });
    return {
      n,
      classes,
      length,
      bottomNavigationDom,
      handleFabClick,
      fabProps
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;