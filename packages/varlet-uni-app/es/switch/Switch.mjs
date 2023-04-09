import { defineComponent, computed, nextTick } from 'vue';
import { useValidation, createNamespace, call } from '../utils/components.mjs';
import { multiplySizeUnit } from '../utils/elements.mjs';
import { useForm } from '../form/provide.mjs';
import VarHoverOverlay, { useHoverOverlay } from '../hover-overlay/index.mjs';
import Hover from '../hover/index.mjs';
import { props } from './props.mjs';
import VarFormDetails from '../form-details/index.mjs';
import VarLoading from '../loading/index.mjs';
import Ripple from '../ripple/index.mjs';
var {
  n,
  classes
} = createNamespace('switch');
import { normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, createVNode as _createVNode, resolveDirective as _resolveDirective, createElementBlock as _createElementBlock, withDirectives as _withDirectives } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_loading = _resolveComponent("var-loading");
  var _component_var_hover_overlay = _resolveComponent("var-hover-overlay");
  var _component_var_form_details = _resolveComponent("var-form-details");
  var _directive_ripple = _resolveDirective("ripple");
  var _directive_hover = _resolveDirective("hover");
  return _withDirectives((_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n())
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('block'), [_ctx.disabled || _ctx.formDisabled, _ctx.n('--disabled')])),
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.switchActive && _ctx.switchActive(...arguments);
    }),
    style: _normalizeStyle(_ctx.styleComputed.switch)
  }, [_createElementVNode("div", {
    style: _normalizeStyle(_ctx.styleComputed.track),
    class: _normalizeClass(_ctx.classes(_ctx.n('track'), [_ctx.modelValue === _ctx.activeValue, _ctx.n('track--active')], [_ctx.errorMessage, _ctx.n('track--error')]))
  }, null, 6 /* CLASS, STYLE */), _withDirectives((_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('ripple'), [_ctx.modelValue === _ctx.activeValue, _ctx.n('ripple--active')])),
    style: _normalizeStyle(_ctx.styleComputed.ripple)
  }, [_createElementVNode("div", {
    style: _normalizeStyle(_ctx.styleComputed.handle),
    class: _normalizeClass(_ctx.classes(_ctx.n('handle'), _ctx.n('$-elevation--2'), [_ctx.modelValue === _ctx.activeValue, _ctx.n('handle--active')], [_ctx.errorMessage, _ctx.n('handle--error')]))
  }, [_ctx.loading ? (_openBlock(), _createBlock(_component_var_loading, {
    key: 0,
    radius: _ctx.radius,
    color: "currentColor"
  }, null, 8 /* PROPS */, ["radius"])) : _createCommentVNode("v-if", true)], 6 /* CLASS, STYLE */), _createVNode(_component_var_hover_overlay, {
    hovering: _ctx.hovering
  }, null, 8 /* PROPS */, ["hovering"])], 6 /* CLASS, STYLE */)), [[_directive_ripple, {
    disabled: !_ctx.ripple || _ctx.disabled || _ctx.loading || _ctx.formDisabled
  }]])], 6 /* CLASS, STYLE */), _createVNode(_component_var_form_details, {
    "error-message": _ctx.errorMessage
  }, null, 8 /* PROPS */, ["error-message"])], 2 /* CLASS */)), [[_directive_hover, _ctx.hover, "desktop"]]);
}
var __sfc__ = defineComponent({
  name: 'VarSwitch',
  components: {
    VarLoading,
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
      bindForm,
      form
    } = useForm();
    var {
      errorMessage,
      validateWithTrigger: vt,
      validate: v,
      resetValidation
    } = useValidation();
    var {
      hovering,
      handleHovering
    } = useHoverOverlay();
    var validate = () => v(props.rules, props.modelValue);
    var validateWithTrigger = () => nextTick(() => vt(['onChange'], 'onChange', props.rules, props.modelValue));
    var styleComputed = computed(() => {
      var {
        size,
        modelValue,
        color,
        closeColor,
        loadingColor,
        activeValue
      } = props;
      return {
        handle: {
          width: multiplySizeUnit(size),
          height: multiplySizeUnit(size),
          backgroundColor: modelValue === activeValue ? color : closeColor,
          color: loadingColor
        },
        ripple: {
          left: modelValue === activeValue ? multiplySizeUnit(size, 0.5) : "-" + multiplySizeUnit(size, 0.5),
          color: modelValue === activeValue ? color : closeColor || '#999',
          width: multiplySizeUnit(size, 2),
          height: multiplySizeUnit(size, 2)
        },
        track: {
          height: multiplySizeUnit(size, 0.72),
          width: multiplySizeUnit(size, 1.9),
          borderRadius: multiplySizeUnit(size, 2 / 3),
          filter: modelValue === activeValue || errorMessage != null && errorMessage.value ? undefined : 'brightness(.6)',
          backgroundColor: modelValue === activeValue ? color : closeColor
        },
        switch: {
          height: multiplySizeUnit(size, 1.2),
          width: multiplySizeUnit(size, 2)
        }
      };
    });
    var radius = computed(() => {
      var {
        size = '5.333vw'
      } = props;
      return multiplySizeUnit(size, 0.4);
    });
    var switchActive = event => {
      var {
        onClick,
        onChange,
        disabled,
        loading,
        readonly,
        modelValue,
        activeValue,
        inactiveValue,
        'onUpdate:modelValue': updateModelValue
      } = props;
      call(onClick, event);
      if (disabled || loading || readonly || form != null && form.disabled.value || form != null && form.readonly.value) return;
      var newValue = modelValue === activeValue ? inactiveValue : activeValue;
      call(onChange, newValue);
      call(updateModelValue, newValue);
      validateWithTrigger();
    };
    var hover = value => {
      if (props.disabled || form != null && form.disabled.value) return;
      handleHovering(value);
    };
    var reset = () => {
      call(props['onUpdate:modelValue'], props.inactiveValue);
      resetValidation();
    };
    var switchProvider = {
      reset,
      validate,
      resetValidation
    };
    call(bindForm, switchProvider);
    return {
      n,
      classes,
      switchActive,
      hovering,
      hover,
      radius,
      styleComputed,
      errorMessage,
      formDisabled: form == null ? void 0 : form.disabled,
      formReadonly: form == null ? void 0 : form.readonly
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;