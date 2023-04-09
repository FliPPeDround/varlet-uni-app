import Ripple from '../ripple/index.mjs';
import VarLoading from '../loading/index.mjs';
import VarHoverOverlay, { useHoverOverlay } from '../hover-overlay/index.mjs';
import Hover from '../hover/index.mjs';
import { computed, defineComponent, ref } from 'vue';
import { props } from './props.mjs';
import { call, createNamespace, formatElevation } from '../utils/components.mjs';
import { useButtonGroup } from './provide.mjs';
import { isArray } from '@varlet/shared';
var {
  n,
  classes
} = createNamespace('button');
import { resolveComponent as _resolveComponent, normalizeClass as _normalizeClass, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createElementVNode as _createElementVNode, createVNode as _createVNode, normalizeStyle as _normalizeStyle, resolveDirective as _resolveDirective, createElementBlock as _createElementBlock, withDirectives as _withDirectives, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = ["type", "disabled"];
function __render__(_ctx, _cache) {
  var _component_var_loading = _resolveComponent("var-loading");
  var _component_var_hover_overlay = _resolveComponent("var-hover-overlay");
  var _directive_ripple = _resolveDirective("ripple");
  var _directive_hover = _resolveDirective("hover");
  return _withDirectives((_openBlock(), _createElementBlock("button", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box'), _ctx.n("--" + _ctx.states.size), [_ctx.block, _ctx.n('$--flex') + " " + _ctx.n('--block'), _ctx.n('$--inline-flex')], [_ctx.disabled, _ctx.n('--disabled')], [_ctx.states.text, _ctx.n("--text-" + _ctx.states.type) + " " + _ctx.n('--text'), _ctx.n("--" + _ctx.states.type) + " " + _ctx.states.elevation], [_ctx.states.text && _ctx.disabled, _ctx.n('--text-disabled')], [_ctx.round, _ctx.n('--round')], [_ctx.states.outline, _ctx.n('--outline')])),
    style: _normalizeStyle({
      color: _ctx.states.textColor,
      background: _ctx.states.color
    }),
    type: _ctx.nativeType,
    disabled: _ctx.disabled,
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.handleClick && _ctx.handleClick(...arguments);
    }),
    onTouchstart: _cache[1] || (_cache[1] = function () {
      return _ctx.handleTouchstart && _ctx.handleTouchstart(...arguments);
    })
  }, [_ctx.loading || _ctx.pending ? (_openBlock(), _createBlock(_component_var_loading, {
    key: 0,
    class: _normalizeClass(_ctx.n('loading')),
    "var-button-cover": "",
    color: _ctx.loadingColor,
    type: _ctx.loadingType,
    size: _ctx.loadingSize,
    radius: _ctx.loadingRadius
  }, null, 8 /* PROPS */, ["class", "color", "type", "size", "radius"])) : _createCommentVNode("v-if", true), _createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('content'), [_ctx.loading || _ctx.pending, _ctx.n('--hidden')]))
  }, [_renderSlot(_ctx.$slots, "default")], 2 /* CLASS */), _createVNode(_component_var_hover_overlay, {
    hovering: _ctx.hovering
  }, null, 8 /* PROPS */, ["hovering"])], 46 /* CLASS, STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_1)), [[_directive_ripple, {
    disabled: _ctx.disabled || !_ctx.ripple
  }], [_directive_hover, _ctx.handleHovering, "desktop"]]);
}
var __sfc__ = defineComponent({
  name: 'VarButton',
  components: {
    VarLoading,
    VarHoverOverlay
  },
  directives: {
    Ripple,
    Hover
  },
  props,
  setup(props) {
    var pending = ref(false);
    var {
      buttonGroup
    } = useButtonGroup();
    var {
      hovering,
      handleHovering
    } = useHoverOverlay();
    var states = computed(() => {
      if (!buttonGroup) {
        return {
          elevation: formatElevation(props.elevation, 2),
          type: props.type != null ? props.type : 'default',
          size: props.size != null ? props.size : 'normal',
          color: props.color,
          text: props.text,
          textColor: props.textColor,
          outline: props.outline
        };
      }
      var {
        type,
        size,
        color,
        textColor,
        mode
      } = buttonGroup;
      return {
        elevation: '',
        type: props.type != null ? props.type : type.value,
        size: props.size != null ? props.size : size.value,
        color: props.color != null ? props.color : color.value,
        textColor: props.textColor != null ? props.textColor : textColor.value,
        text: mode.value !== 'normal',
        outline: mode.value === 'outline'
      };
    });
    var attemptAutoLoading = result => {
      if (props.autoLoading) {
        pending.value = true;
        result = isArray(result) ? result : [result];
        Promise.all(result).then(() => {
          pending.value = false;
        }).catch(() => {
          pending.value = false;
        });
      }
    };
    var handleClick = e => {
      var {
        loading,
        disabled,
        onClick
      } = props;
      if (!onClick || loading || disabled || pending.value) {
        return;
      }
      attemptAutoLoading(call(onClick, e));
    };
    var handleTouchstart = e => {
      var {
        loading,
        disabled,
        onTouchstart
      } = props;
      if (!onTouchstart || loading || disabled || pending.value) {
        return;
      }
      attemptAutoLoading(call(onTouchstart, e));
    };
    return {
      n,
      classes,
      pending,
      states,
      hovering,
      handleHovering,
      handleClick,
      handleTouchstart
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;