function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import Ripple from '../ripple/index.mjs';
import VarIcon from '../icon/index.mjs';
import VarButton from '../button/index.mjs';
import { ref, defineComponent, watch, computed, nextTick } from 'vue';
import { props } from './props.mjs';
import { doubleRaf, toSizeUnit } from '../utils/elements.mjs';
import { call, createNamespace, formatElevation } from '../utils/components.mjs';
import { useZIndex } from '../context/zIndex.mjs';
import { useLock } from '../context/lock.mjs';
var {
  n,
  classes
} = createNamespace('card');
var RIPPLE_DELAY = 500;
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, withModifiers as _withModifiers, withCtx as _withCtx, resolveDirective as _resolveDirective, withDirectives as _withDirectives, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = ["src", "alt"];
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  var _component_var_button = _resolveComponent("var-button");
  var _directive_ripple = _resolveDirective("ripple");
  return _withDirectives((_openBlock(), _createElementBlock("div", {
    ref: "card",
    class: _normalizeClass(_ctx.classes(_ctx.n(), [_ctx.isRow, _ctx.n('--layout-row')], [_ctx.outline, _ctx.n('--outline')], _ctx.formatElevation(_ctx.elevation, 1))),
    style: _normalizeStyle({
      zIndex: _ctx.floated ? _ctx.zIndex : undefined
    }),
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.handleClick && _ctx.handleClick(...arguments);
    })
  }, [_createElementVNode("div", {
    ref: "cardFloater",
    class: _normalizeClass(_ctx.n('floater')),
    style: _normalizeStyle({
      width: _ctx.floaterWidth,
      height: _ctx.floaterHeight,
      top: _ctx.floaterTop,
      left: _ctx.floaterLeft,
      overflow: _ctx.floaterOverflow,
      position: _ctx.floaterPosition,
      transition: _ctx.floated ? "background-color " + _ctx.floatingDuration + "ms, color " + _ctx.floatingDuration + "ms, width " + _ctx.floatingDuration + "ms, height " + _ctx.floatingDuration + "ms, top " + _ctx.floatingDuration + "ms, left " + _ctx.floatingDuration + "ms" : undefined
    })
  }, [_renderSlot(_ctx.$slots, "image", {}, () => [_ctx.src ? (_openBlock(), _createElementBlock("img", {
    key: 0,
    class: _normalizeClass(_ctx.n('image')),
    style: _normalizeStyle({
      objectFit: _ctx.fit,
      height: _ctx.toSizeUnit(_ctx.imageHeight),
      width: _ctx.toSizeUnit(_ctx.imageWidth)
    }),
    src: _ctx.src,
    alt: _ctx.alt
  }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_1)) : _createCommentVNode("v-if", true)]), _createElementVNode("div", {
    class: _normalizeClass(_ctx.n('container'))
  }, [_renderSlot(_ctx.$slots, "title", {}, () => [_ctx.title ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('title'))
  }, _toDisplayString(_ctx.title), 3 /* TEXT, CLASS */)) : _createCommentVNode("v-if", true)]), _renderSlot(_ctx.$slots, "subtitle", {}, () => [_ctx.subtitle ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('subtitle'))
  }, _toDisplayString(_ctx.subtitle), 3 /* TEXT, CLASS */)) : _createCommentVNode("v-if", true)]), _renderSlot(_ctx.$slots, "description", {}, () => [_ctx.description ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('description'))
  }, _toDisplayString(_ctx.description), 3 /* TEXT, CLASS */)) : _createCommentVNode("v-if", true)]), _ctx.$slots.extra ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('footer'))
  }, [_renderSlot(_ctx.$slots, "extra")], 2 /* CLASS */)) : _createCommentVNode("v-if", true), _ctx.$slots['floating-content'] && !_ctx.isRow ? (_openBlock(), _createElementBlock("div", {
    key: 1,
    class: _normalizeClass(_ctx.n('floating-content')),
    style: _normalizeStyle({
      height: _ctx.contentHeight,
      opacity: _ctx.opacity,
      transition: "opacity " + _ctx.floatingDuration * 2 + "ms"
    })
  }, [_renderSlot(_ctx.$slots, "floating-content")], 6 /* CLASS, STYLE */)) : _createCommentVNode("v-if", true)], 2 /* CLASS */), _ctx.showFloatingButtons ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.classes(_ctx.n('floating-buttons'), _ctx.n('$--box'))),
    style: _normalizeStyle({
      zIndex: _ctx.zIndex,
      opacity: _ctx.opacity,
      transition: "opacity " + _ctx.floatingDuration * 2 + "ms"
    })
  }, [_renderSlot(_ctx.$slots, "close-button", {}, () => [_createVNode(_component_var_button, {
    "var-card-cover": "",
    round: "",
    class: _normalizeClass(_ctx.classes(_ctx.n('close-button'), _ctx.n('$-elevation--6'))),
    onClick: _withModifiers(_ctx.close, ["stop"])
  }, {
    default: _withCtx(() => [_createVNode(_component_var_icon, {
      "var-card-cover": "",
      name: "window-close",
      class: _normalizeClass(_ctx.n('close-button-icon'))
    }, null, 8 /* PROPS */, ["class"])]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["class", "onClick"])])], 6 /* CLASS, STYLE */)) : _createCommentVNode("v-if", true)], 6 /* CLASS, STYLE */), _createElementVNode("div", {
    class: _normalizeClass(_ctx.n('holder')),
    style: _normalizeStyle({
      width: _ctx.holderWidth,
      height: _ctx.holderHeight
    })
  }, null, 6 /* CLASS, STYLE */)], 6 /* CLASS, STYLE */)), [[_directive_ripple, {
    disabled: !_ctx.ripple || _ctx.floater
  }]]);
}
var __sfc__ = defineComponent({
  name: 'VarCard',
  directives: {
    Ripple
  },
  components: {
    VarIcon,
    VarButton
  },
  props,
  setup(props) {
    var card = ref(null);
    var cardFloater = ref(null);
    var holderWidth = ref('auto');
    var holderHeight = ref('auto');
    var floaterWidth = ref('100%');
    var floaterHeight = ref('100%');
    var floaterTop = ref('auto');
    var floaterLeft = ref('auto');
    var floaterPosition = ref(undefined);
    var floaterOverflow = ref('hidden');
    var contentHeight = ref('0px');
    var opacity = ref('0');
    var isRow = computed(() => props.layout === 'row');
    var showFloatingButtons = ref(false);
    var floated = ref(false);
    var {
      zIndex
    } = useZIndex(() => props.floating, 1);
    useLock(() => props.floating, () => !isRow.value);
    var dropdownFloaterTop = 'auto';
    var dropdownFloaterLeft = 'auto';
    var dropper = null;
    var floater = ref(null);
    var floating = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* () {
        clearTimeout(floater.value);
        clearTimeout(dropper);
        floater.value = null;
        floater.value = setTimeout( /*#__PURE__*/_asyncToGenerator(function* () {
          var {
            width,
            height,
            left,
            top
          } = card.value.getBoundingClientRect();
          holderWidth.value = toSizeUnit(width);
          holderHeight.value = toSizeUnit(height);
          floaterWidth.value = holderWidth.value;
          floaterHeight.value = holderHeight.value;
          floaterTop.value = toSizeUnit(top);
          floaterLeft.value = toSizeUnit(left);
          floaterPosition.value = 'fixed';
          dropdownFloaterTop = floaterTop.value;
          dropdownFloaterLeft = floaterLeft.value;
          showFloatingButtons.value = true;
          yield doubleRaf();
          floaterTop.value = '0';
          floaterLeft.value = '0';
          floaterWidth.value = '100vw';
          floaterHeight.value = '100vh';
          contentHeight.value = 'auto';
          opacity.value = '1';
          floaterOverflow.value = 'auto';
          floated.value = true;
        }), props.ripple ? RIPPLE_DELAY : 0);
      });
      return function floating() {
        return _ref.apply(this, arguments);
      };
    }();
    var dropdown = () => {
      clearTimeout(dropper);
      clearTimeout(floater.value);
      floater.value = null;
      floaterWidth.value = holderWidth.value;
      floaterHeight.value = holderHeight.value;
      floaterTop.value = dropdownFloaterTop;
      floaterLeft.value = dropdownFloaterLeft;
      contentHeight.value = '0px';
      opacity.value = '0';
      showFloatingButtons.value = false;
      dropper = setTimeout(() => {
        holderWidth.value = 'auto';
        holderHeight.value = 'auto';
        floaterWidth.value = '100%';
        floaterHeight.value = '100%';
        floaterTop.value = 'auto';
        floaterLeft.value = 'auto';
        dropdownFloaterTop = 'auto';
        dropdownFloaterLeft = 'auto';
        floaterOverflow.value = 'hidden';
        floaterPosition.value = undefined;
        floated.value = false;
      }, props.floatingDuration);
    };
    var close = () => {
      call(props['onUpdate:floating'], false);
    };
    var handleClick = e => {
      call(props.onClick, e);
    };
    watch(() => props.floating, value => {
      if (isRow.value) return;
      nextTick(() => {
        value ? floating() : dropdown();
      });
    }, {
      immediate: true
    });
    return {
      n,
      classes,
      toSizeUnit,
      card,
      cardFloater,
      holderWidth,
      holderHeight,
      floater,
      floaterWidth,
      floaterHeight,
      floaterTop,
      floaterLeft,
      floaterPosition,
      floaterOverflow,
      contentHeight,
      opacity,
      zIndex,
      isRow,
      close,
      showFloatingButtons,
      floated,
      formatElevation,
      handleClick
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;