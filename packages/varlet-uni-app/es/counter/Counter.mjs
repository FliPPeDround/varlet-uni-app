import VarButton from '../button/index.mjs';
import VarIcon from '../icon/index.mjs';
import VarFormDetails from '../form-details/index.mjs';
import Ripple from '../ripple/index.mjs';
import { defineComponent, ref, watch, computed, nextTick } from 'vue';
import { Decimal } from 'decimal.js';
import { props } from './props.mjs';
import { toNumber } from '@varlet/shared';
import { toSizeUnit } from '../utils/elements.mjs';
import { useForm } from '../form/provide.mjs';
import { useValidation, createNamespace, call, formatElevation } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('counter');
var SPEED = 100;
var DELAY = 600;
import { resolveComponent as _resolveComponent, createVNode as _createVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, withCtx as _withCtx, vModelText as _vModelText, createElementVNode as _createElementVNode, withDirectives as _withDirectives, mergeProps as _mergeProps, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = ["inputmode", "readonly", "disabled"];
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  var _component_var_button = _resolveComponent("var-button");
  var _component_var_form_details = _resolveComponent("var-form-details");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box')))
  }, [_createElementVNode("div", _mergeProps({
    class: _ctx.classes(_ctx.n('controller'), _ctx.formatElevation(_ctx.elevation, 2), [_ctx.disabled || _ctx.formDisabled, _ctx.n('--disabled')], [_ctx.errorMessage, _ctx.n('--error')]),
    style: {
      background: _ctx.color ? _ctx.color : undefined
    }
  }, _ctx.$attrs), [_createVNode(_component_var_button, {
    class: _normalizeClass(_ctx.classes(_ctx.n('decrement-button'), [!_ctx.decrementButton, _ctx.n('--hidden')], [_ctx.disabled || _ctx.formDisabled, _ctx.n('--not-allowed')])),
    style: _normalizeStyle({
      width: _ctx.toSizeUnit(_ctx.buttonSize),
      height: _ctx.toSizeUnit(_ctx.buttonSize)
    }),
    round: "",
    "var-counter-cover": "",
    ripple: _ctx.ripple && _ctx.decrementButton && !_ctx.disabled && !_ctx.formDisabled && !_ctx.readonly && !_ctx.formReadonly && !_ctx.disableDecrement && !_ctx.isMin,
    onClick: _ctx.decrement,
    onTouchstart: _ctx.pressDecrement,
    onTouchend: _ctx.releaseDecrement,
    onTouchcancel: _ctx.releaseDecrement
  }, {
    default: _withCtx(() => [_createVNode(_component_var_icon, {
      name: "minus"
    })]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["class", "style", "ripple", "onClick", "onTouchstart", "onTouchend", "onTouchcancel"]), _withDirectives(_createElementVNode("input", {
    class: _normalizeClass(_ctx.classes(_ctx.n('input'), [_ctx.disabled || _ctx.formDisabled, _ctx.n('--not-allowed')])),
    style: _normalizeStyle({
      width: _ctx.toSizeUnit(_ctx.inputWidth),
      fontSize: _ctx.toSizeUnit(_ctx.inputTextSize)
    }),
    inputmode: _ctx.toNumber(_ctx.decimalLength) === 0 ? 'numeric' : 'decimal',
    readonly: _ctx.readonly || _ctx.formReadonly,
    disabled: _ctx.disabled || _ctx.formDisabled || _ctx.disableInput,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.inputValue = $event),
    onChange: _cache[1] || (_cache[1] = function () {
      return _ctx.handleChange && _ctx.handleChange(...arguments);
    })
  }, null, 46 /* CLASS, STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_1), [[_vModelText, _ctx.inputValue]]), _createVNode(_component_var_button, {
    class: _normalizeClass(_ctx.classes(_ctx.n('increment-button'), [!_ctx.incrementButton, _ctx.n('--hidden')], [_ctx.disabled || _ctx.formDisabled, _ctx.n('--not-allowed')])),
    style: _normalizeStyle({
      width: _ctx.toSizeUnit(_ctx.buttonSize),
      height: _ctx.toSizeUnit(_ctx.buttonSize)
    }),
    round: "",
    "var-counter-cover": "",
    ripple: _ctx.ripple && _ctx.incrementButton && !_ctx.disabled && !_ctx.formDisabled && !_ctx.readonly && !_ctx.formReadonly && !_ctx.disableIncrement && !_ctx.isMax,
    onClick: _ctx.increment,
    onTouchstart: _ctx.pressIncrement,
    onTouchend: _ctx.releaseIncrement,
    onTouchcancel: _ctx.releaseIncrement
  }, {
    default: _withCtx(() => [_createVNode(_component_var_icon, {
      name: "plus"
    })]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["class", "style", "ripple", "onClick", "onTouchstart", "onTouchend", "onTouchcancel"])], 16 /* FULL_PROPS */), _createVNode(_component_var_form_details, {
    "error-message": _ctx.errorMessage
  }, null, 8 /* PROPS */, ["error-message"])], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarCounter',
  components: {
    VarButton,
    VarIcon,
    VarFormDetails
  },
  directives: {
    Ripple
  },
  inheritAttrs: false,
  props,
  setup(props) {
    var inputValue = ref('');
    var {
      bindForm,
      form
    } = useForm();
    var {
      errorMessage,
      validateWithTrigger: vt,
      validate: v,
      // expose
      resetValidation
    } = useValidation();
    var {
      readonly: formReadonly,
      disabled: formDisabled
    } = form != null ? form : {};
    var incrementTimer;
    var decrementTimer;
    var incrementDelayTimer;
    var decrementDelayTimer;

    // expose
    var validate = () => v(props.rules, props.modelValue);
    var validateWithTrigger = trigger => {
      nextTick(() => {
        var {
          validateTrigger,
          rules,
          modelValue
        } = props;
        vt(validateTrigger, trigger, rules, modelValue);
      });
    };

    // expose
    var reset = () => {
      var {
        min
      } = props;
      call(props['onUpdate:modelValue'], min != null ? toNumber(min) : 0);
      resetValidation();
    };
    var counterProvider = {
      reset,
      validate,
      resetValidation
    };
    var isMax = computed(() => {
      var {
        max,
        modelValue
      } = props;
      return max != null && toNumber(modelValue) >= toNumber(max);
    });
    var isMin = computed(() => {
      var {
        min,
        modelValue
      } = props;
      return min != null && toNumber(modelValue) <= toNumber(min);
    });
    var normalizeValue = value => {
      var {
        decimalLength,
        max,
        min
      } = props;
      var num = toNumber(value);
      if (max != null && num > toNumber(max)) {
        num = toNumber(max);
      }
      if (min != null && num < toNumber(min)) {
        num = toNumber(min);
      }
      value = String(num);
      if (decimalLength != null) {
        value = num.toFixed(toNumber(decimalLength));
      }
      return value;
    };
    var handleChange = event => {
      var {
        lazyChange,
        onBeforeChange
      } = props;
      var {
        value
      } = event.target;
      var normalizedValue = normalizeValue(value);
      lazyChange ? call(onBeforeChange, toNumber(normalizedValue), change) : setNormalizedValue(normalizedValue);
      validateWithTrigger('onInputChange');
    };
    var decrement = () => {
      var {
        disabled,
        readonly,
        disableDecrement,
        decrementButton,
        lazyChange,
        step,
        modelValue,
        onDecrement,
        onBeforeChange
      } = props;
      if (formDisabled != null && formDisabled.value || formReadonly != null && formReadonly.value || disabled || readonly || disableDecrement || !decrementButton) {
        return;
      }
      if (isMin.value) {
        return;
      }
      var value = new Decimal(toNumber(modelValue)).minus(new Decimal(toNumber(step))).toString();
      var normalizedValue = normalizeValue(value);
      var normalizedValueNum = toNumber(normalizedValue);
      call(onDecrement, normalizedValueNum);
      if (lazyChange) {
        call(onBeforeChange, normalizedValueNum, change);
      } else {
        setNormalizedValue(normalizedValue);
        validateWithTrigger('onDecrement');
      }
    };
    var increment = () => {
      var {
        disabled,
        readonly,
        disableIncrement,
        incrementButton,
        lazyChange,
        step,
        modelValue,
        onIncrement,
        onBeforeChange
      } = props;
      if (formDisabled != null && formDisabled.value || formReadonly != null && formReadonly.value || disabled || readonly || disableIncrement || !incrementButton) {
        return;
      }
      if (isMax.value) {
        return;
      }
      var value = new Decimal(toNumber(modelValue)).plus(new Decimal(toNumber(step))).toString();
      var normalizedValue = normalizeValue(value);
      var normalizedValueNum = toNumber(normalizedValue);
      call(onIncrement, normalizedValueNum);
      if (lazyChange) {
        call(onBeforeChange, normalizedValueNum, change);
      } else {
        setNormalizedValue(normalizedValue);
        validateWithTrigger('onIncrement');
      }
    };
    var pressDecrement = () => {
      var {
        press,
        lazyChange
      } = props;
      if (!press || lazyChange) {
        return;
      }
      decrementDelayTimer = window.setTimeout(() => {
        continuedDecrement();
      }, DELAY);
    };
    var pressIncrement = () => {
      var {
        press,
        lazyChange
      } = props;
      if (!press || lazyChange) {
        return;
      }
      incrementDelayTimer = window.setTimeout(() => {
        continuedIncrement();
      }, DELAY);
    };
    var releaseDecrement = () => {
      decrementTimer && clearTimeout(decrementTimer);
      decrementDelayTimer && clearTimeout(decrementDelayTimer);
    };
    var releaseIncrement = () => {
      incrementTimer && clearTimeout(incrementTimer);
      incrementDelayTimer && clearTimeout(incrementDelayTimer);
    };
    var continuedIncrement = () => {
      incrementTimer = window.setTimeout(() => {
        increment();
        continuedIncrement();
      }, SPEED);
    };
    var continuedDecrement = () => {
      decrementTimer = window.setTimeout(() => {
        decrement();
        continuedDecrement();
      }, SPEED);
    };
    var setNormalizedValue = normalizedValue => {
      inputValue.value = normalizedValue;
      var normalizedValueNum = toNumber(normalizedValue);
      call(props['onUpdate:modelValue'], normalizedValueNum);
    };
    var change = value => {
      setNormalizedValue(normalizeValue(String(value)));
      validateWithTrigger('onLazyChange');
    };
    call(bindForm, counterProvider);
    watch(() => props.modelValue, newValue => {
      setNormalizedValue(normalizeValue(String(newValue)));
      call(props.onChange, toNumber(newValue));
    });
    setNormalizedValue(normalizeValue(String(props.modelValue)));
    return {
      n,
      classes,
      formatElevation,
      inputValue,
      errorMessage,
      formDisabled,
      formReadonly,
      isMax,
      isMin,
      validate,
      reset,
      resetValidation,
      handleChange,
      decrement,
      increment,
      pressDecrement,
      pressIncrement,
      releaseDecrement,
      releaseIncrement,
      toSizeUnit,
      toNumber
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;