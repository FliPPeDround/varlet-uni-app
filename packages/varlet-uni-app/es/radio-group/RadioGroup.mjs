import VarFormDetails from '../form-details/index.mjs';
import { computed, defineComponent, nextTick, watch } from 'vue';
import { props } from './props.mjs';
import { useValidation, createNamespace, call } from '../utils/components.mjs';
import { useRadios } from './provide.mjs';
import { useForm } from '../form/provide.mjs';
var {
  n,
  classes
} = createNamespace('radio-group');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_form_details = _resolveComponent("var-form-details");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n('wrap'))
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("--" + _ctx.direction)))
  }, [_renderSlot(_ctx.$slots, "default")], 2 /* CLASS */), _createVNode(_component_var_form_details, {
    "error-message": _ctx.errorMessage
  }, null, 8 /* PROPS */, ["error-message"])], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarRadioGroup',
  components: {
    VarFormDetails
  },
  props,
  setup(props) {
    var {
      length,
      radios,
      bindRadios
    } = useRadios();
    var {
      bindForm
    } = useForm();
    var {
      errorMessage,
      validateWithTrigger: vt,
      validate: v,
      // expose
      resetValidation
    } = useValidation();
    var radioGroupErrorMessage = computed(() => errorMessage.value);
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
    var syncRadios = () => radios.forEach(_ref => {
      var {
        sync
      } = _ref;
      return sync(props.modelValue);
    });
    var onToggle = changedValue => {
      call(props['onUpdate:modelValue'], changedValue);
      call(props.onChange, changedValue);
      validateWithTrigger('onChange');
    };

    // expose
    var validate = () => v(props.rules, props.modelValue);

    // expose
    var reset = () => {
      call(props['onUpdate:modelValue'], undefined);
      resetValidation();
    };
    watch(() => props.modelValue, syncRadios);
    watch(() => length.value, syncRadios);
    var radioGroupProvider = {
      onToggle,
      validate,
      reset,
      resetValidation,
      errorMessage: radioGroupErrorMessage
    };
    call(bindForm, radioGroupProvider);
    bindRadios(radioGroupProvider);
    return {
      errorMessage,
      n,
      classes,
      reset,
      validate,
      resetValidation
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;