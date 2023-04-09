import VarButton from '../button/index.mjs';
import VarPopup from '../popup/index.mjs';
import { defineComponent, watch, ref, computed, Transition, toRaw } from 'vue';
import { props } from './props.mjs';
import { isArray } from '@varlet/shared';
import { dt } from '../utils/shared.mjs';
import { toPxNum, getTranslate } from '../utils/elements.mjs';
import { pack } from '../locale/index.mjs';
import { createNamespace, call } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('picker');
var MOMENTUM_RECORD_TIME = 300;
var MOMENTUM_ALLOW_DISTANCE = 15;
var sid = 0;
import { renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, resolveComponent as _resolveComponent, normalizeClass as _normalizeClass, withCtx as _withCtx, createVNode as _createVNode, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, normalizeStyle as _normalizeStyle, withModifiers as _withModifiers, mergeProps as _mergeProps, resolveDynamicComponent as _resolveDynamicComponent, createBlock as _createBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = ["onTouchstart", "onTouchmove", "onTouchend"];
var _hoisted_2 = ["onTransitionend"];
function __render__(_ctx, _cache) {
  var _component_var_button = _resolveComponent("var-button");
  return _openBlock(), _createBlock(_resolveDynamicComponent(_ctx.dynamic ? _ctx.n('$-popup') : _ctx.Transition), _mergeProps(_ctx.dynamic ? {
    onOpen: _ctx.onOpen,
    onOpened: _ctx.onOpened,
    onClose: _ctx.onClose,
    onClosed: _ctx.onClosed,
    onClickOverlay: _ctx.onClickOverlay,
    onRouteChange: _ctx.onRouteChange,
    closeOnClickOverlay: _ctx.closeOnClickOverlay,
    teleport: _ctx.teleport,
    show: _ctx.show,
    'onUpdate:show': _ctx.handlePopupUpdateShow,
    position: 'bottom',
    class: _ctx.n('popup')
  } : null, {
    "var-picker-cover": ""
  }), {
    default: _withCtx(() => [_createElementVNode("div", _mergeProps({
      class: _ctx.n()
    }, _ctx.$attrs), [_ctx.toolbar ? (_openBlock(), _createElementBlock("div", {
      key: 0,
      class: _normalizeClass(_ctx.n('toolbar'))
    }, [_renderSlot(_ctx.$slots, "cancel", {}, () => [_createVNode(_component_var_button, {
      class: _normalizeClass(_ctx.n('cancel-button')),
      "var-picker-cover": "",
      text: "",
      "text-color": _ctx.cancelButtonTextColor,
      onClick: _ctx.cancel
    }, {
      default: _withCtx(() => [_createTextVNode(_toDisplayString(_ctx.dt(_ctx.cancelButtonText, _ctx.pack.pickerCancelButtonText)), 1 /* TEXT */)]),

      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["class", "text-color", "onClick"])]), _renderSlot(_ctx.$slots, "title", {}, () => [_createElementVNode("div", {
      class: _normalizeClass(_ctx.n('title'))
    }, _toDisplayString(_ctx.dt(_ctx.title, _ctx.pack.pickerTitle)), 3 /* TEXT, CLASS */)]), _renderSlot(_ctx.$slots, "confirm", {}, () => [_createVNode(_component_var_button, {
      class: _normalizeClass(_ctx.n('confirm-button')),
      text: "",
      "var-picker-cover": "",
      "text-color": _ctx.confirmButtonTextColor,
      onClick: _ctx.confirm
    }, {
      default: _withCtx(() => [_createTextVNode(_toDisplayString(_ctx.dt(_ctx.confirmButtonText, _ctx.pack.pickerConfirmButtonText)), 1 /* TEXT */)]),

      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["class", "text-color", "onClick"])])], 2 /* CLASS */)) : _createCommentVNode("v-if", true), _createElementVNode("div", {
      class: _normalizeClass(_ctx.n('columns')),
      style: _normalizeStyle({
        height: _ctx.columnHeight + "px"
      })
    }, [(_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.scrollColumns, c => {
      return _openBlock(), _createElementBlock("div", {
        class: _normalizeClass(_ctx.n('column')),
        key: c.id,
        onTouchstart: $event => _ctx.handleTouchstart($event, c),
        onTouchmove: _withModifiers($event => _ctx.handleTouchmove($event, c), ["prevent"]),
        onTouchend: $event => _ctx.handleTouchend($event, c)
      }, [_createElementVNode("div", {
        class: _normalizeClass(_ctx.n('scroller')),
        ref_for: true,
        ref: el => _ctx.getScrollEl(el, c),
        style: _normalizeStyle({
          transform: "translateY(" + c.translate + "px)",
          transitionDuration: c.duration + "ms",
          transitionProperty: c.duration ? 'transform' : 'none'
        }),
        onTransitionend: $event => _ctx.handleTransitionend(c)
      }, [(_openBlock(true), _createElementBlock(_Fragment, null, _renderList(c.column.texts, t => {
        return _openBlock(), _createElementBlock("div", {
          class: _normalizeClass(_ctx.n('option')),
          style: _normalizeStyle({
            height: _ctx.optionHeight + "px"
          }),
          key: t
        }, [_createElementVNode("div", {
          class: _normalizeClass(_ctx.n('text'))
        }, _toDisplayString(_ctx.textFormatter(t, c.columnIndex)), 3 /* TEXT, CLASS */)], 6 /* CLASS, STYLE */);
      }), 128 /* KEYED_FRAGMENT */))], 46 /* CLASS, STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_2)], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_1);
    }), 128 /* KEYED_FRAGMENT */)), _createElementVNode("div", {
      class: _normalizeClass(_ctx.n('picked')),
      style: _normalizeStyle({
        top: _ctx.center + "px",
        height: _ctx.optionHeight + "px"
      })
    }, null, 6 /* CLASS, STYLE */), _createElementVNode("div", {
      class: _normalizeClass(_ctx.n('mask')),
      style: _normalizeStyle({
        backgroundSize: "100% " + (_ctx.columnHeight - _ctx.optionHeight) / 2 + "px"
      })
    }, null, 6 /* CLASS, STYLE */)], 6 /* CLASS, STYLE */)], 16 /* FULL_PROPS */)]),

    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */);
}

var __sfc__ = defineComponent({
  name: 'VarPicker',
  components: {
    VarButton,
    VarPopup
  },
  inheritAttrs: false,
  props,
  setup(props) {
    var scrollColumns = ref([]);
    var optionHeight = computed(() => toPxNum(props.optionHeight));
    var optionCount = computed(() => toPxNum(props.optionCount));
    var center = computed(() => optionCount.value * optionHeight.value / 2 - optionHeight.value / 2);
    var columnHeight = computed(() => optionCount.value * optionHeight.value);
    var prevIndexes = [];
    var getScrollEl = (el, scrollColumn) => {
      scrollColumn.scrollEl = el;
    };
    var handlePopupUpdateShow = value => {
      call(props['onUpdate:show'], value);
    };
    var limitTranslate = scrollColumn => {
      var START_LIMIT = optionHeight.value + center.value;
      var END_LIMIT = center.value - scrollColumn.column.texts.length * optionHeight.value;
      if (scrollColumn.translate >= START_LIMIT) {
        scrollColumn.translate = START_LIMIT;
      }
      if (scrollColumn.translate <= END_LIMIT) {
        scrollColumn.translate = END_LIMIT;
      }
    };
    var boundaryIndex = (scrollColumn, index) => {
      var {
        length
      } = scrollColumn.column.texts;
      index = index >= length ? length - 1 : index;
      index = index <= 0 ? 0 : index;
      return index;
    };
    var getIndex = scrollColumn => {
      var index = Math.round((center.value - scrollColumn.translate) / optionHeight.value);
      return boundaryIndex(scrollColumn, index);
    };
    var getPicked = () => {
      var texts = scrollColumns.value.map(scrollColumn => scrollColumn.column.texts[scrollColumn.index]);
      var indexes = scrollColumns.value.map(scrollColumn => scrollColumn.index);
      return {
        texts,
        indexes
      };
    };
    var scrollTo = function (scrollColumn, index, duration, noEmit) {
      if (noEmit === void 0) {
        noEmit = false;
      }
      var translate = center.value - boundaryIndex(scrollColumn, index) * optionHeight.value;
      if (translate === scrollColumn.translate) {
        scrollColumn.scrolling = false;
        !noEmit && change(scrollColumn);
      }
      scrollColumn.translate = translate;
      scrollColumn.duration = duration;
    };
    var momentum = (scrollColumn, distance, duration) => {
      scrollColumn.translate += Math.abs(distance / duration) / 0.003 * (distance < 0 ? -1 : 1);
    };
    var handleTouchstart = (event, scrollColumn) => {
      scrollColumn.touching = true;
      scrollColumn.scrolling = false;
      scrollColumn.duration = 0;
      scrollColumn.translate = getTranslate(scrollColumn.scrollEl);
    };
    var handleTouchmove = (event, scrollColumn) => {
      if (!scrollColumn.touching) {
        return;
      }
      var {
        clientY
      } = event.touches[0];
      var moveY = scrollColumn.prevY !== undefined ? clientY - scrollColumn.prevY : 0;
      scrollColumn.prevY = clientY;
      scrollColumn.translate += moveY;
      limitTranslate(scrollColumn);
      var now = performance.now();
      if (now - scrollColumn.momentumTime > MOMENTUM_RECORD_TIME) {
        scrollColumn.momentumTime = now;
        scrollColumn.momentumPrevY = scrollColumn.translate;
      }
    };
    var handleTouchend = (event, scrollColumn) => {
      scrollColumn.touching = false;
      scrollColumn.scrolling = true;
      scrollColumn.prevY = undefined;
      var distance = scrollColumn.translate - scrollColumn.momentumPrevY;
      var duration = performance.now() - scrollColumn.momentumTime;
      var shouldMomentum = Math.abs(distance) >= MOMENTUM_ALLOW_DISTANCE && duration <= MOMENTUM_RECORD_TIME;
      shouldMomentum && momentum(scrollColumn, distance, duration);
      scrollColumn.index = getIndex(scrollColumn);
      scrollTo(scrollColumn, scrollColumn.index, shouldMomentum ? 1000 : 200);
    };
    var handleTransitionend = scrollColumn => {
      scrollColumn.scrolling = false;
      change(scrollColumn);
    };
    var normalizeNormalColumns = normalColumns => {
      return normalColumns.map((column, columnIndex) => {
        var _normalColumn$initial;
        var normalColumn = isArray(column) ? {
          texts: column
        } : column;
        var scrollColumn = {
          id: sid++,
          prevY: undefined,
          momentumPrevY: undefined,
          touching: false,
          translate: center.value,
          index: (_normalColumn$initial = normalColumn.initialIndex) != null ? _normalColumn$initial : 0,
          columnIndex,
          duration: 0,
          momentumTime: 0,
          column: normalColumn,
          scrollEl: null,
          scrolling: false
        };
        scrollTo(scrollColumn, scrollColumn.index, 0, true);
        return scrollColumn;
      });
    };
    var normalizeCascadeColumns = cascadeColumns => {
      var scrollColumns = [];
      createChildren(scrollColumns, cascadeColumns, 0, true);
      return scrollColumns;
    };
    var createChildren = function (scrollColumns, children, columnIndex, initial) {
      if (initial === void 0) {
        initial = false;
      }
      if (isArray(children) && children.length) {
        var _props$cascadeInitial;
        var index = initial ? (_props$cascadeInitial = props.cascadeInitialIndexes[scrollColumns.length]) != null ? _props$cascadeInitial : 0 : 0;
        var scrollColumn = {
          id: sid++,
          prevY: undefined,
          momentumPrevY: undefined,
          touching: false,
          translate: center.value,
          index,
          columnIndex,
          duration: 0,
          momentumTime: 0,
          column: {
            texts: children.map(cascadeColumn => cascadeColumn[props.textKey])
          },
          columns: children,
          scrollEl: null,
          scrolling: false
        };
        scrollColumns.push(scrollColumn);
        scrollTo(scrollColumn, scrollColumn.index, 0, true);
        createChildren(scrollColumns, scrollColumn.columns[scrollColumn.index].children, columnIndex + 1, initial);
      }
    };
    var rebuildChildren = scrollColumn => {
      scrollColumns.value.splice(scrollColumns.value.indexOf(scrollColumn) + 1);
      createChildren(scrollColumns.value, scrollColumn.columns[scrollColumn.index].children, scrollColumn.columnIndex + 1);
    };
    var change = scrollColumn => {
      var {
        cascade,
        onChange
      } = props;
      cascade && rebuildChildren(scrollColumn);
      var hasScrolling = scrollColumns.value.some(scrollColumn => scrollColumn.scrolling);
      if (hasScrolling) {
        return;
      }
      var {
        texts,
        indexes
      } = getPicked();
      var samePicked = indexes.every((index, idx) => index === prevIndexes[idx]);
      if (samePicked) {
        return;
      }
      prevIndexes = [...indexes];
      call(onChange, texts, indexes);
    };
    var stopScroll = () => {
      if (props.cascade) {
        var currentScrollColumn = scrollColumns.value.find(scrollColumn => scrollColumn.scrolling);
        if (currentScrollColumn) {
          currentScrollColumn.translate = getTranslate(currentScrollColumn.scrollEl);
          currentScrollColumn.index = getIndex(currentScrollColumn);
          scrollTo(currentScrollColumn, currentScrollColumn.index, 0, true);
          currentScrollColumn.scrolling = false;
          rebuildChildren(currentScrollColumn);
        }
      } else {
        scrollColumns.value.forEach(scrollColumn => {
          scrollColumn.translate = getTranslate(scrollColumn.scrollEl);
          scrollColumn.index = getIndex(scrollColumn);
          scrollTo(scrollColumn, scrollColumn.index, 0);
        });
      }
    };

    // expose
    var confirm = () => {
      stopScroll();
      var {
        texts,
        indexes
      } = getPicked();
      prevIndexes = [...indexes];
      call(props.onConfirm, texts, indexes);
    };

    // expose
    var cancel = () => {
      stopScroll();
      var {
        texts,
        indexes
      } = getPicked();
      prevIndexes = [...indexes];
      call(props.onCancel, texts, indexes);
    };
    watch(() => props.columns, newValue => {
      scrollColumns.value = props.cascade ? normalizeCascadeColumns(toRaw(newValue)) : normalizeNormalColumns(toRaw(newValue));
      var {
        indexes
      } = getPicked();
      prevIndexes = [...indexes];
    }, {
      immediate: true,
      deep: true
    });
    return {
      n,
      classes,
      pack,
      optionHeight,
      optionCount,
      scrollColumns,
      columnHeight,
      center,
      Transition,
      getScrollEl,
      handlePopupUpdateShow,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      handleTransitionend,
      confirm,
      cancel,
      dt
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;