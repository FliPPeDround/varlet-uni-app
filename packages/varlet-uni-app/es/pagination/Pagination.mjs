import VarMenu from '../menu/index.mjs';
import Ripple from '../ripple/index.mjs';
import VarIcon from '../icon/index.mjs';
import VarCell from '../cell/index.mjs';
import VarInput from '../input/index.mjs';
import { defineComponent, ref, computed, watch } from 'vue';
import { props } from './props.mjs';
import { isNumber, toNumber } from '@varlet/shared';
import { pack } from '../locale/index.mjs';
import { call, createNamespace, formatElevation } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('pagination');
import { renderSlot as _renderSlot, resolveComponent as _resolveComponent, createVNode as _createVNode, normalizeClass as _normalizeClass, resolveDirective as _resolveDirective, openBlock as _openBlock, createElementBlock as _createElementBlock, withDirectives as _withDirectives, withKeys as _withKeys, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createTextVNode as _createTextVNode, createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, withModifiers as _withModifiers, withCtx as _withCtx, createBlock as _createBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = ["item-mode", "onClick"];
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  var _component_var_input = _resolveComponent("var-input");
  var _component_var_cell = _resolveComponent("var-cell");
  var _component_var_menu = _resolveComponent("var-menu");
  var _directive_ripple = _resolveDirective("ripple");
  return _openBlock(), _createElementBlock("ul", {
    class: _normalizeClass(_ctx.n())
  }, [_withDirectives((_openBlock(), _createElementBlock("li", {
    class: _normalizeClass(_ctx.classes(_ctx.n('item'), _ctx.n('prev'), [_ctx.current <= 1 || _ctx.disabled, _ctx.n('item--disabled')], [_ctx.simple, _ctx.n('item--simple'), _ctx.formatElevation(_ctx.elevation, 2)])),
    onClick: _cache[0] || (_cache[0] = $event => _ctx.clickItem('prev'))
  }, [_renderSlot(_ctx.$slots, "prev", {}, () => [_createVNode(_component_var_icon, {
    name: "chevron-left"
  })])], 2 /* CLASS */)), [[_directive_ripple, {
    disabled: _ctx.current <= 1 || _ctx.disabled
  }]]), _ctx.simple ? (_openBlock(), _createElementBlock("li", {
    key: 0,
    class: _normalizeClass(_ctx.classes(_ctx.n('simple'), [_ctx.disabled, _ctx.n('item--disabled')]))
  }, [_createVNode(_component_var_input, {
    modelValue: _ctx.simpleCurrentValue,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => _ctx.simpleCurrentValue = $event),
    disabled: _ctx.disabled,
    "var-pagination-cover": "",
    onBlur: _cache[2] || (_cache[2] = $event => _ctx.setPage('simple', _ctx.simpleCurrentValue, $event)),
    onKeydown: _cache[3] || (_cache[3] = _withKeys($event => _ctx.setPage('simple', _ctx.simpleCurrentValue, $event), ["enter"]))
  }, null, 8 /* PROPS */, ["modelValue", "disabled"]), _createElementVNode("span", null, [_createTextVNode(" / " + _toDisplayString(_ctx.pageCount) + " ", 1 /* TEXT */), _createElementVNode("div", {
    class: _normalizeClass(_ctx.n('simple-line'))
  }, null, 2 /* CLASS */)])], 2 /* CLASS */)) : (_openBlock(true), _createElementBlock(_Fragment, {
    key: 1
  }, _renderList(_ctx.pageList, (item, index) => {
    return _withDirectives((_openBlock(), _createElementBlock("li", {
      key: _ctx.toNumber(item) + index,
      "item-mode": _ctx.getMode(item, index),
      class: _normalizeClass(_ctx.classes(_ctx.n('item'), _ctx.formatElevation(_ctx.elevation, 2), [item === _ctx.current && !_ctx.disabled, _ctx.n('item--active')], [_ctx.isHideEllipsis(item, index), _ctx.n('item--hide')], [_ctx.disabled, _ctx.n('item--disabled')], [item === _ctx.current && _ctx.disabled, _ctx.n('item--disabled--active')])),
      onClick: $event => _ctx.clickItem(item, index)
    }, [_createTextVNode(_toDisplayString(item), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_1)), [[_directive_ripple, {
      disabled: _ctx.disabled
    }]]);
  }), 128 /* KEYED_FRAGMENT */)), _withDirectives((_openBlock(), _createElementBlock("li", {
    class: _normalizeClass(_ctx.classes(_ctx.n('item'), _ctx.n('next'), [_ctx.current >= _ctx.pageCount || _ctx.disabled, _ctx.n('item--disabled')], [_ctx.simple, _ctx.n('item--simple'), _ctx.formatElevation(_ctx.elevation, 2)])),
    onClick: _cache[4] || (_cache[4] = $event => _ctx.clickItem('next'))
  }, [_renderSlot(_ctx.$slots, "next", {}, () => [_createVNode(_component_var_icon, {
    name: "chevron-right"
  })])], 2 /* CLASS */)), [[_directive_ripple, {
    disabled: _ctx.current >= _ctx.pageCount || _ctx.disabled
  }]]), _ctx.showSizeChanger ? (_openBlock(), _createElementBlock("li", {
    key: 2,
    class: _normalizeClass(_ctx.classes(_ctx.n('size'), [_ctx.disabled, _ctx.n('item--disabled')]))
  }, [_createVNode(_component_var_menu, {
    disabled: _ctx.disabled,
    show: _ctx.menuVisible,
    "onUpdate:show": _cache[6] || (_cache[6] = $event => _ctx.menuVisible = $event),
    "offset-x": -4
  }, {
    menu: _withCtx(() => [(_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.sizeOption, (option, index) => {
      return _withDirectives((_openBlock(), _createBlock(_component_var_cell, {
        class: _normalizeClass(_ctx.classes(_ctx.n('list'), [_ctx.size === option, _ctx.n('list--active')])),
        key: index,
        onClick: $event => _ctx.clickSize(option)
      }, {
        default: _withCtx(() => [_createTextVNode(_toDisplayString(option) + _toDisplayString(_ctx.pack.paginationItem) + " / " + _toDisplayString(_ctx.pack.paginationPage), 1 /* TEXT */)]),

        _: 2 /* DYNAMIC */
      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "onClick"])), [[_directive_ripple]]);
    }), 128 /* KEYED_FRAGMENT */))]),

    default: _withCtx(() => [_createElementVNode("div", {
      class: _normalizeClass(_ctx.classes(_ctx.n('size--open'), [_ctx.current <= 1 || _ctx.disabled, _ctx.n('size--open--disabled')])),
      onClick: _cache[5] || (_cache[5] = _withModifiers(function () {
        return _ctx.showMenu && _ctx.showMenu(...arguments);
      }, ["stop"]))
    }, [_createElementVNode("span", null, _toDisplayString(_ctx.size) + _toDisplayString(_ctx.pack.paginationItem) + " / " + _toDisplayString(_ctx.pack.paginationPage), 1 /* TEXT */), _createVNode(_component_var_icon, {
      class: _normalizeClass(_ctx.n('size--open-icon')),
      "var-pagination-cover": "",
      name: "menu-down"
    }, null, 8 /* PROPS */, ["class"])], 2 /* CLASS */)]),

    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["disabled", "show"])], 2 /* CLASS */)) : _createCommentVNode("v-if", true), _ctx.showQuickJumper && !_ctx.simple ? (_openBlock(), _createElementBlock("li", {
    key: 3,
    class: _normalizeClass(_ctx.classes(_ctx.n('quickly'), [_ctx.disabled, 'item--disabled']))
  }, [_createTextVNode(_toDisplayString(_ctx.pack.paginationJump) + " ", 1 /* TEXT */), _createVNode(_component_var_input, {
    modelValue: _ctx.quickJumperValue,
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => _ctx.quickJumperValue = $event),
    disabled: _ctx.disabled,
    "var-pagination-cover": "",
    onBlur: _cache[8] || (_cache[8] = $event => _ctx.setPage('quick', _ctx.quickJumperValue, $event)),
    onKeydown: _cache[9] || (_cache[9] = _withKeys($event => _ctx.setPage('quick', _ctx.quickJumperValue, $event), ["enter"]))
  }, null, 8 /* PROPS */, ["modelValue", "disabled"])], 2 /* CLASS */)) : _createCommentVNode("v-if", true), _ctx.totalText ? (_openBlock(), _createElementBlock("li", {
    key: 4,
    class: _normalizeClass(_ctx.n('total'))
  }, _toDisplayString(_ctx.totalText), 3 /* TEXT, CLASS */)) : _createCommentVNode("v-if", true)], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarPagination',
  components: {
    VarMenu,
    VarIcon,
    VarCell,
    VarInput
  },
  directives: {
    Ripple
  },
  props,
  setup(props) {
    var menuVisible = ref(false);
    var quickJumperValue = ref('');
    var simpleCurrentValue = ref('1');
    var isHideEllipsisHead = ref(false);
    var isHideEllipsisTail = ref(false);
    var current = ref(toNumber(props.current) || 1);
    var size = ref(toNumber(props.size) || 10);
    var pageList = ref([]);
    var activePosition = computed(() => Math.ceil(props.maxPagerCount / 2));
    var pageCount = computed(() => Math.ceil(toNumber(props.total) / toNumber(size.value)));
    var range = computed(() => {
      var start = size.value * (current.value - 1) + 1;
      var end = Math.min(size.value * current.value, toNumber(props.total));
      return [start, end];
    });
    var totalText = computed(() => {
      if (!props.showTotal) return '';
      return props.showTotal(toNumber(props.total), range.value);
    });
    var isHideEllipsis = (item, index) => {
      if (isNumber(item)) return false;
      return index === 1 ? isHideEllipsisHead.value : isHideEllipsisTail.value;
    };
    var getMode = (item, index) => {
      if (isNumber(item)) return 'basic';
      return index === 1 ? 'head' : 'tail';
    };
    var clickItem = (item, index) => {
      if (item === current.value || props.disabled) {
        return;
      }
      if (item === '...') {
        current.value = index === 1 ? Math.max(current.value - props.maxPagerCount, 1) : Math.min(current.value + props.maxPagerCount, pageCount.value);
        return;
      }
      if (item === 'prev') {
        current.value = ensureCurrentBoundary(current.value - 1);
        return;
      }
      if (item === 'next') {
        current.value = ensureCurrentBoundary(current.value + 1);
        return;
      }
      if (isNumber(item)) {
        current.value = item;
      }
    };
    var showMenu = () => {
      if (props.disabled) {
        return;
      }
      menuVisible.value = true;
    };
    var clickSize = option => {
      size.value = option;
      menuVisible.value = false;
      var targetCurrent = ensureCurrentBoundary(current.value);
      simpleCurrentValue.value = String(targetCurrent);
      current.value = targetCurrent;
    };
    var ensureCurrentBoundary = targetCurrent => {
      if (targetCurrent > pageCount.value) {
        return pageCount.value;
      }
      if (targetCurrent < 1) {
        return 1;
      }
      return targetCurrent;
    };
    var setPage = (type, page, event) => {
      ;
      event.target.blur();
      var targetCurrent = ensureCurrentBoundary(toNumber(page));
      simpleCurrentValue.value = String(targetCurrent);
      current.value = targetCurrent;
      if (type === 'quick') {
        quickJumperValue.value = '';
      }
    };
    watch([() => props.current, () => props.size], _ref => {
      var [newCurrent, newSize] = _ref;
      current.value = toNumber(newCurrent) || 1;
      size.value = toNumber(newSize || 10);
    });
    watch([current, size, pageCount], (_ref2, _ref3) => {
      var [newCurrent, newSize, newCount] = _ref2;
      var [oldCurrent, oldSize] = _ref3;
      var list = [];
      var {
        maxPagerCount,
        total,
        onChange
      } = props;
      var oldCount = Math.ceil(toNumber(total) / toNumber(oldSize));
      var rEllipseSign = newCount - (maxPagerCount - activePosition.value) - 1;
      simpleCurrentValue.value = "" + newCurrent;
      if (newCount - 2 > maxPagerCount) {
        if (oldCurrent === undefined || newCount !== oldCount) {
          for (var i = 2; i < maxPagerCount + 2; i++) list.push(i);
        }

        // 左边不需要出现省略符号占位
        if (newCurrent <= maxPagerCount && newCurrent < rEllipseSign) {
          list = [];
          for (var _i = 1; _i < maxPagerCount + 1; _i++) {
            list.push(_i + 1);
          }
          isHideEllipsisHead.value = true;
          isHideEllipsisTail.value = false;
        }
        // 两边都需要出现省略符号占位
        if (newCurrent > maxPagerCount && newCurrent < rEllipseSign) {
          list = [];
          for (var _i2 = 1; _i2 < maxPagerCount + 1; _i2++) {
            list.push(newCurrent + _i2 - activePosition.value);
          }

          // 针对 maxPagerCount===1 的特殊处理
          isHideEllipsisHead.value = newCurrent === 2 && maxPagerCount === 1;
          isHideEllipsisTail.value = false;
        }
        // 右边不需要出现省略符号占位
        if (newCurrent >= rEllipseSign) {
          list = [];
          for (var _i3 = 1; _i3 < maxPagerCount + 1; _i3++) {
            list.push(newCount - (maxPagerCount - _i3) - 1);
          }
          isHideEllipsisHead.value = false;
          isHideEllipsisTail.value = true;
        }
        list = [1, '...', ...list, '...', newCount];
      } else {
        for (var _i4 = 1; _i4 <= newCount; _i4++) list.push(_i4);
      }
      pageList.value = list;
      if (oldCurrent != null && newCount > 0) {
        call(onChange, newCurrent, newSize);
      }
      call(props['onUpdate:current'], newCurrent);
      call(props['onUpdate:size'], newSize);
    }, {
      immediate: true
    });
    return {
      n,
      classes,
      pack,
      current,
      menuVisible,
      size,
      pageCount,
      pageList,
      quickJumperValue,
      simpleCurrentValue,
      totalText,
      getMode,
      isHideEllipsis,
      clickItem,
      showMenu,
      clickSize,
      setPage,
      toNumber,
      formatElevation
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;