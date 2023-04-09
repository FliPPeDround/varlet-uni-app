import VarFormDetails from '../form-details/index.mjs';
import { defineComponent, computed, watch, nextTick } from 'vue';
import { props } from './props.mjs';
import { useValidation, createNamespace, call } from '../utils/components.mjs';
import { useCheckboxes } from './provide.mjs';
import { useForm } from '../form/provide.mjs';
import { uniq } from '@varlet/shared';
var {
  n,
  classes
} = createNamespace('checkbox-group');
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
  name: 'VarCheckboxGroup',
  components: {
    VarFormDetails
  },
  props,
  setup(props) {
    var max = computed(() => props.max);
    var checkedCount = computed(() => props.modelValue.length);
    var {
      length,
      checkboxes,
      bindCheckboxes
    } = useCheckboxes();
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
    var checkboxGroupErrorMessage = computed(() => errorMessage.value);
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
    var change = changedModelValue => {
      call(props['onUpdate:modelValue'], changedModelValue);
      call(props.onChange, changedModelValue);
      validateWithTrigger('onChange');
    };
    var onChecked = changedValue => {
      var {
        modelValue
      } = props;
      if (!modelValue.includes(changedValue)) {
        change([...modelValue, changedValue]);
      }
    };
    var onUnchecked = changedValue => {
      var {
        modelValue
      } = props;
      if (!modelValue.includes(changedValue)) {
        return;
      }
      change(modelValue.filter(value => value !== changedValue));
    };
    var syncCheckboxes = () => checkboxes.forEach(_ref => {
      var {
        sync
      } = _ref;
      return sync(props.modelValue);
    });
    var resetWithAnimation = () => {
      checkboxes.forEach(checkbox => checkbox.resetWithAnimation());
    };

    // expose
    var checkAll = () => {
      var checkedValues = checkboxes.map(_ref2 => {
        var {
          checkedValue
        } = _ref2;
        return checkedValue.value;
      });
      var changedModelValue = uniq(checkedValues);
      resetWithAnimation();
      call(props['onUpdate:modelValue'], changedModelValue);
      return changedModelValue;
    };

    // expose
    var inverseAll = () => {
      var checkedValues = checkboxes.filter(_ref3 => {
        var {
          checked
        } = _ref3;
        return !checked.value;
      }).map(_ref4 => {
        var {
          checkedValue
        } = _ref4;
        return checkedValue.value;
      });
      var changedModelValue = uniq(checkedValues);
      resetWithAnimation();
      call(props['onUpdate:modelValue'], changedModelValue);
      return changedModelValue;
    };

    // expose
    var reset = () => {
      call(props['onUpdate:modelValue'], []);
      resetValidation();
    };

    // expose
    var validate = () => v(props.rules, props.modelValue);
    watch(() => props.modelValue, syncCheckboxes, {
      deep: true
    });
    watch(() => length.value, syncCheckboxes);
    var checkboxGroupProvider = {
      max,
      checkedCount,
      onChecked,
      onUnchecked,
      validate,
      resetValidation,
      reset,
      errorMessage: checkboxGroupErrorMessage
    };
    bindCheckboxes(checkboxGroupProvider);
    call(bindForm, checkboxGroupProvider);
    return {
      errorMessage,
      n,
      classes,
      checkAll,
      inverseAll,
      reset,
      validate,
      resetValidation
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;