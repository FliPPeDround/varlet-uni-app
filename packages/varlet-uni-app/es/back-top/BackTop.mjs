import VarButton from '../button/index.mjs';
import VarIcon from '../icon/index.mjs';
import { defineComponent, ref, onBeforeUnmount, onDeactivated, onMounted, onActivated } from 'vue';
import { props } from './props.mjs';
import { throttle } from '@varlet/shared';
import { easeInOutCubic } from '../utils/shared.mjs';
import { getScrollTop, getScrollLeft, scrollTo, getParentScroller, toPxNum, toSizeUnit, getTarget } from '../utils/elements.mjs';
import { call, createNamespace } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('back-top');
import { renderSlot as _renderSlot, resolveComponent as _resolveComponent, createVNode as _createVNode, withCtx as _withCtx, withModifiers as _withModifiers, mergeProps as _mergeProps, createElementVNode as _createElementVNode, Teleport as _Teleport, openBlock as _openBlock, createBlock as _createBlock } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  var _component_var_button = _resolveComponent("var-button");
  return _openBlock(), _createBlock(_Teleport, {
    to: "body",
    disabled: _ctx.disabled
  }, [_createElementVNode("div", _mergeProps({
    class: _ctx.classes(_ctx.n(), [_ctx.show, _ctx.n('--active')]),
    ref: "backTopEl",
    style: {
      right: _ctx.toSizeUnit(_ctx.right),
      bottom: _ctx.toSizeUnit(_ctx.bottom)
    }
  }, _ctx.$attrs, {
    onClick: _cache[0] || (_cache[0] = _withModifiers(function () {
      return _ctx.handleClick && _ctx.handleClick(...arguments);
    }, ["stop"]))
  }), [_renderSlot(_ctx.$slots, "default", {}, () => [_createVNode(_component_var_button, {
    elevation: _ctx.elevation,
    type: "primary",
    round: "",
    "var-back-top-cover": ""
  }, {
    default: _withCtx(() => [_createVNode(_component_var_icon, {
      name: "chevron-up"
    })]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["elevation"])])], 16 /* FULL_PROPS */)], 8 /* PROPS */, ["disabled"]);
}
var __sfc__ = defineComponent({
  name: 'VarBackTop',
  components: {
    VarButton,
    VarIcon
  },
  inheritAttrs: false,
  props,
  setup(props) {
    var show = ref(false);
    var backTopEl = ref(null);
    var disabled = ref(true);
    var scroller;
    var handleClick = event => {
      call(props.onClick, event);
      var left = getScrollLeft(scroller);
      scrollTo(scroller, {
        left,
        duration: props.duration,
        animation: easeInOutCubic
      });
    };
    var handleScroll = throttle(() => {
      show.value = getScrollTop(scroller) >= toPxNum(props.visibilityHeight);
    }, 200);
    var setScroller = () => {
      scroller = props.target ? getTarget(props.target, 'BackTop') : getParentScroller(backTopEl.value);
    };
    var addScrollerEventListener = () => {
      scroller.addEventListener('scroll', handleScroll);
    };
    var removeScrollerEventListener = () => {
      scroller.removeEventListener('scroll', handleScroll);
    };
    onMounted(() => {
      setScroller();
      addScrollerEventListener();
      disabled.value = false;
    });
    onActivated(addScrollerEventListener);
    onBeforeUnmount(removeScrollerEventListener);
    onDeactivated(removeScrollerEventListener);
    return {
      disabled,
      show,
      backTopEl,
      toSizeUnit,
      n,
      classes,
      handleClick
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;