import VarIcon from '../icon/index.mjs';
import VarFormDetails from '../form-details/index.mjs';
import Ripple from '../ripple/index.mjs';
import VarHoverOverlay, { useHoverOverlay } from '../hover-overlay/index.mjs';
import Hover from '../hover/index.mjs';
import { defineComponent, nextTick, ref } from 'vue';
import { useForm } from '../form/provide.mjs';
import { useValidation, call, createNamespace } from '../utils/components.mjs';
import { toSizeUnit } from '../utils/elements.mjs';
import { toNumber } from '@varlet/shared';
import { props } from './props.mjs';
var {
  n
} = createNamespace('rate');
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveComponent as _resolveComponent, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createVNode as _createVNode, resolveDirective as _resolveDirective, withDirectives as _withDirectives, createElementVNode as _createElementVNode, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = ["onClick"];
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  var _component_var_hover_overlay = _resolveComponent("var-hover-overlay");
  var _component_var_form_details = _resolveComponent("var-form-details");
  var _directive_ripple = _resolveDirective("ripple");
  var _directive_hover = _resolveDirective("hover");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n('wrap'))
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n())
  }, [(_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.toNumber(_ctx.count), value => {
    return _withDirectives((_openBlock(), _createElementBlock("div", {
      key: value,
      style: _normalizeStyle(_ctx.getStyle(value)),
      class: _normalizeClass(_ctx.getClass(value)),
      onClick: $event => _ctx.handleClick(value, $event)
    }, [_createVNode(_component_var_icon, {
      class: _normalizeClass(_ctx.n('content-icon')),
      "var-rate-cover": "",
      transition: 0,
      namespace: _ctx.namespace,
      name: _ctx.getCurrentState(value).name,
      style: _normalizeStyle({
        fontSize: _ctx.toSizeUnit(_ctx.size)
      })
    }, null, 8 /* PROPS */, ["class", "namespace", "name", "style"]), _createVNode(_component_var_hover_overlay, {
      hovering: _ctx.hovering && value === _ctx.currentHoveringValue && !_ctx.disabled && !_ctx.formDisabled
    }, null, 8 /* PROPS */, ["hovering"])], 14 /* CLASS, STYLE, PROPS */, _hoisted_1)), [[_directive_ripple, {
      disabled: _ctx.formReadonly || _ctx.readonly || _ctx.formDisabled || _ctx.disabled || !_ctx.ripple
    }], [_directive_hover, _ctx.createHoverHandler(value), "desktop"]]);
  }), 128 /* KEYED_FRAGMENT */))], 2 /* CLASS */), _createVNode(_component_var_form_details, {
    "error-message": _ctx.errorMessage
  }, null, 8 /* PROPS */, ["error-message"])], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarRate',
  components: {
    VarIcon,
    VarFormDetails,
    VarHoverOverlay
  },
  directives: {
    Ripple,
    Hover
  },
  props,
  setup(props) {
    var {
      form,
      bindForm
    } = useForm();
    var {
      errorMessage,
      validateWithTrigger: vt,
      validate: v,
      resetValidation
    } = useValidation();
    var {
      hovering
    } = useHoverOverlay();
    var currentHoveringValue = ref(-1);
    var getStyle = val => {
      var {
        count,
        gap
      } = props;
      return {
        color: getCurrentState(val).color,
        marginRight: val !== toNumber(count) ? toSizeUnit(gap) : 0
      };
    };
    var getClass = val => {
      var {
        name,
        color
      } = getCurrentState(val);
      return {
        [n('content')]: true,
        [n('--disabled')]: (form == null ? void 0 : form.disabled.value) || props.disabled,
        [n('--error')]: errorMessage.value,
        [n('--primary')]: name !== props.emptyIcon && !color
      };
    };
    var getCurrentState = index => {
      var {
        modelValue,
        disabled,
        disabledColor,
        color,
        half,
        emptyColor,
        icon,
        halfIcon,
        emptyIcon
      } = props;
      var iconColor = color;
      if (disabled || form != null && form.disabled.value) iconColor = disabledColor;
      if (index <= toNumber(modelValue)) {
        return {
          color: iconColor,
          name: icon
        };
      }
      if (half && index <= toNumber(modelValue) + 0.5) {
        return {
          color: iconColor,
          name: halfIcon
        };
      }
      return {
        color: disabled || form != null && form.disabled.value ? disabledColor : emptyColor,
        name: emptyIcon
      };
    };
    var changeValue = (score, event) => {
      if (props.half) {
        var {
          offsetWidth
        } = event.target;
        if (event.offsetX <= Math.floor(offsetWidth / 2)) score -= 0.5;
      }
      call(props['onUpdate:modelValue'], score);
    };
    var validate = () => v(props.rules, toNumber(props.modelValue));
    var validateWithTrigger = () => nextTick(() => vt(['onChange'], 'onChange', props.rules, props.modelValue));
    var handleClick = (score, event) => {
      var {
        readonly,
        disabled,
        onChange
      } = props;
      if (readonly || disabled || form != null && form.disabled.value || form != null && form.readonly.value) {
        return;
      }
      changeValue(score, event);
      call(onChange, score);
      validateWithTrigger();
    };
    var createHoverHandler = value => {
      return isHover => {
        currentHoveringValue.value = value;
        hovering.value = isHover;
      };
    };
    var reset = () => {
      call(props['onUpdate:modelValue'], 0);
      resetValidation();
    };
    var rateProvider = {
      reset,
      validate,
      resetValidation
    };
    call(bindForm, rateProvider);
    return {
      errorMessage,
      formDisabled: form == null ? void 0 : form.disabled,
      formReadonly: form == null ? void 0 : form.readonly,
      getStyle,
      getClass,
      getCurrentState,
      handleClick,
      hovering,
      currentHoveringValue,
      createHoverHandler,
      reset,
      validate,
      resetValidation,
      toSizeUnit,
      toNumber,
      n
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;