import VarIcon from '../icon/index.mjs';
import VarFormDetails from '../form-details/index.mjs';
import Ripple from '../ripple/index.mjs';
import Hover from '../hover/index.mjs';
import { defineComponent, ref, computed, watch, nextTick } from 'vue';
import { props } from './props.mjs';
import { useValidation, createNamespace, call } from '../utils/components.mjs';
import { useCheckboxGroup } from './provide.mjs';
import { useForm } from '../form/provide.mjs';
import VarHoverOverlay, { useHoverOverlay } from '../hover-overlay/index.mjs';
var {
  n,
  classes
} = createNamespace('checkbox');
import { renderSlot as _renderSlot, resolveComponent as _resolveComponent, normalizeClass as _normalizeClass, createVNode as _createVNode, normalizeStyle as _normalizeStyle, resolveDirective as _resolveDirective, openBlock as _openBlock, createElementBlock as _createElementBlock, withDirectives as _withDirectives, createElementVNode as _createElementVNode } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  var _component_var_hover_overlay = _resolveComponent("var-hover-overlay");
  var _component_var_form_details = _resolveComponent("var-form-details");
  var _directive_hover = _resolveDirective("hover");
  var _directive_ripple = _resolveDirective("ripple");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n('wrap')),
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.handleClick && _ctx.handleClick(...arguments);
    })
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n())
  }, [_withDirectives((_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('action'), [_ctx.checked, _ctx.n('--checked'), _ctx.n('--unchecked')], [_ctx.errorMessage || _ctx.checkboxGroupErrorMessage, _ctx.n('--error')], [_ctx.formDisabled || _ctx.disabled, _ctx.n('--disabled')])),
    style: _normalizeStyle({
      color: _ctx.checked ? _ctx.checkedColor : _ctx.uncheckedColor
    })
  }, [_ctx.checked ? _renderSlot(_ctx.$slots, "checked-icon", {
    key: 0
  }, () => [_createVNode(_component_var_icon, {
    class: _normalizeClass(_ctx.classes(_ctx.n('icon'), [_ctx.withAnimation, _ctx.n('--with-animation')])),
    name: "checkbox-marked",
    size: _ctx.iconSize,
    "var-checkbox-cover": ""
  }, null, 8 /* PROPS */, ["class", "size"])]) : _renderSlot(_ctx.$slots, "unchecked-icon", {
    key: 1
  }, () => [_createVNode(_component_var_icon, {
    class: _normalizeClass(_ctx.classes(_ctx.n('icon'), [_ctx.withAnimation, _ctx.n('--with-animation')])),
    name: "checkbox-blank-outline",
    size: _ctx.iconSize,
    "var-checkbox-cover": ""
  }, null, 8 /* PROPS */, ["class", "size"])]), _createVNode(_component_var_hover_overlay, {
    hovering: !_ctx.disabled && !_ctx.formDisabled && _ctx.hovering
  }, null, 8 /* PROPS */, ["hovering"])], 6 /* CLASS, STYLE */)), [[_directive_hover, _ctx.handleHovering, "desktop"], [_directive_ripple, {
    disabled: _ctx.formReadonly || _ctx.readonly || _ctx.formDisabled || _ctx.disabled || !_ctx.ripple
  }]]), _createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('text'), [_ctx.errorMessage || _ctx.checkboxGroupErrorMessage, _ctx.n('--error')], [_ctx.formDisabled || _ctx.disabled, _ctx.n('--disabled')]))
  }, [_renderSlot(_ctx.$slots, "default")], 2 /* CLASS */)], 2 /* CLASS */), _createVNode(_component_var_form_details, {
    "error-message": _ctx.errorMessage
  }, null, 8 /* PROPS */, ["error-message"])], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarCheckbox',
  directives: {
    Ripple,
    Hover
  },
  components: {
    VarIcon,
    VarFormDetails,
    VarHoverOverlay
  },
  props,
  setup(props) {
    var value = ref(false);
    var checked = computed(() => value.value === props.checkedValue);
    var checkedValue = computed(() => props.checkedValue);
    var withAnimation = ref(false);
    var {
      checkboxGroup,
      bindCheckboxGroup
    } = useCheckboxGroup();
    var {
      hovering,
      handleHovering
    } = useHoverOverlay();
    var {
      form,
      bindForm
    } = useForm();
    var {
      errorMessage,
      validateWithTrigger: vt,
      validate: v,
      // expose
      resetValidation
    } = useValidation();
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
    var change = changedValue => {
      value.value = changedValue;
      var {
        checkedValue,
        onChange
      } = props;
      call(props['onUpdate:modelValue'], value.value);
      call(onChange, value.value);
      validateWithTrigger('onChange');
      changedValue === checkedValue ? checkboxGroup == null ? void 0 : checkboxGroup.onChecked(checkedValue) : checkboxGroup == null ? void 0 : checkboxGroup.onUnchecked(checkedValue);
    };
    var handleClick = e => {
      var {
        disabled,
        readonly,
        checkedValue,
        uncheckedValue,
        onClick
      } = props;
      if (form != null && form.disabled.value || disabled) {
        return;
      }
      call(onClick, e);
      if (form != null && form.readonly.value || readonly) {
        return;
      }
      withAnimation.value = true;
      var maximum = checkboxGroup ? checkboxGroup.checkedCount.value >= Number(checkboxGroup.max.value) : false;
      if (!checked.value && maximum) {
        return;
      }
      change(checked.value ? uncheckedValue : checkedValue);
    };
    var sync = values => {
      var {
        checkedValue,
        uncheckedValue
      } = props;
      value.value = values.includes(checkedValue) ? checkedValue : uncheckedValue;
    };
    var resetWithAnimation = () => {
      withAnimation.value = false;
    };

    // expose
    var reset = () => {
      call(props['onUpdate:modelValue'], props.uncheckedValue);
      resetValidation();
    };

    // expose
    var toggle = changedValue => {
      var {
        checkedValue,
        uncheckedValue
      } = props;
      var shouldReverse = ![checkedValue, uncheckedValue].includes(changedValue);
      if (shouldReverse) {
        changedValue = checked.value ? uncheckedValue : checkedValue;
      }
      change(changedValue);
    };

    // expose
    var validate = () => v(props.rules, props.modelValue);
    watch(() => props.modelValue, newValue => {
      value.value = newValue;
    }, {
      immediate: true
    });
    var checkboxProvider = {
      checkedValue,
      checked,
      sync,
      validate,
      resetValidation,
      reset,
      resetWithAnimation
    };
    call(bindCheckboxGroup, checkboxProvider);
    call(bindForm, checkboxProvider);
    return {
      withAnimation,
      checked,
      errorMessage,
      checkboxGroupErrorMessage: checkboxGroup == null ? void 0 : checkboxGroup.errorMessage,
      formDisabled: form == null ? void 0 : form.disabled,
      formReadonly: form == null ? void 0 : form.readonly,
      hovering,
      handleHovering,
      n,
      classes,
      handleClick,
      toggle,
      reset,
      validate,
      resetValidation
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;