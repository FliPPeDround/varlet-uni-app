import { computed, defineComponent, ref, watch } from 'vue';
import { props } from './props.mjs';
import { useSteps } from './provide.mjs';
import VarIcon from '../icon/index.mjs';
import { createNamespace } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('step');
import { resolveComponent as _resolveComponent, normalizeClass as _normalizeClass, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementBlock as _createElementBlock, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, renderSlot as _renderSlot, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = {
  key: 3
};
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n())
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n(_ctx.direction))
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n(_ctx.direction + "-main")),
    ref: _ctx.getRef
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(_ctx.direction + "-tag"), [_ctx.isActive || _ctx.isCurrent, _ctx.n(_ctx.direction + "-tag--active")])),
    style: _normalizeStyle({
      backgroundColor: _ctx.isActive || _ctx.isCurrent ? _ctx.activeColor : _ctx.inactiveColor
    }),
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.click && _ctx.click(...arguments);
    })
  }, [_ctx.isActive ? (_openBlock(), _createBlock(_component_var_icon, {
    key: 0,
    class: _normalizeClass(_ctx.n('icon')),
    "var-step-cover": "",
    name: _ctx.activeIcon
  }, null, 8 /* PROPS */, ["class", "name"])) : _ctx.isCurrent && _ctx.currentIcon ? (_openBlock(), _createBlock(_component_var_icon, {
    key: 1,
    class: _normalizeClass(_ctx.n('icon')),
    "var-step-cover": "",
    name: _ctx.currentIcon
  }, null, 8 /* PROPS */, ["class", "name"])) : _ctx.inactiveIcon ? (_openBlock(), _createBlock(_component_var_icon, {
    key: 2,
    class: _normalizeClass(_ctx.n('icon')),
    "var-step-cover": "",
    name: _ctx.inactiveIcon
  }, null, 8 /* PROPS */, ["class", "name"])) : (_openBlock(), _createElementBlock("span", _hoisted_1, _toDisplayString(_ctx.index + 1), 1 /* TEXT */))], 6 /* CLASS, STYLE */), _createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(_ctx.direction + "-content"), [_ctx.isActive || _ctx.isCurrent, _ctx.n(_ctx.direction + "-content--active")])),
    onClick: _cache[1] || (_cache[1] = function () {
      return _ctx.click && _ctx.click(...arguments);
    })
  }, [_renderSlot(_ctx.$slots, "default")], 2 /* CLASS */)], 2 /* CLASS */), !_ctx.isLastChild ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n(_ctx.direction + "-line")),
    style: _normalizeStyle({
      margin: _ctx.lineMargin
    })
  }, null, 6 /* CLASS, STYLE */)) : _createCommentVNode("v-if", true)], 2 /* CLASS */)], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarStep',
  components: {
    VarIcon
  },
  props,
  setup() {
    var main = ref(null);
    var lineMargin = ref('');
    var isLastChild = ref(false);
    var {
      index,
      steps,
      bindSteps
    } = useSteps();
    var {
      active,
      length,
      activeColor,
      inactiveColor,
      direction,
      clickStep
    } = steps;
    var isCurrent = computed(() => active.value === index.value);
    var isActive = computed(() => index.value !== -1 && active.value > index.value);
    var stepProvider = {
      index
    };
    var click = () => clickStep(index.value);
    var getRef = el => {
      if (direction.value === 'horizontal') {
        main.value = el;
      }
    };
    bindSteps(stepProvider);
    watch(length, newLength => {
      isLastChild.value = newLength - 1 === index.value;
      if (main.value) {
        var margin = main.value.offsetWidth / 2 - 14;
        lineMargin.value = "0 -" + margin + "px";
      }
    });
    return {
      n,
      classes,
      main,
      index,
      isActive,
      isCurrent,
      direction,
      lineMargin,
      activeColor,
      inactiveColor,
      isLastChild,
      click,
      getRef
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;