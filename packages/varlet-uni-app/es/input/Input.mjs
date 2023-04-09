import VarFormDetails from '../form-details/index.mjs';
import VarIcon from '../icon/index.mjs';
import { defineComponent, getCurrentInstance, ref, computed, nextTick } from 'vue';
import { props } from './props.mjs';
import { isEmpty, toNumber } from '@varlet/shared';
import { useValidation, createNamespace, call } from '../utils/components.mjs';
import { useForm } from '../form/provide.mjs';
import { useMounted } from '@varlet/use';
var {
  n,
  classes
} = createNamespace('input');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeStyle as _normalizeStyle, toDisplayString as _toDisplayString, resolveComponent as _resolveComponent, createBlock as _createBlock, createVNode as _createVNode, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = ["id", "disabled", "type", "value", "maxlength", "rows"];
var _hoisted_2 = ["id", "disabled", "type", "value", "maxlength"];
var _hoisted_3 = ["for"];
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  var _component_var_form_details = _resolveComponent("var-form-details");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box'), [_ctx.disabled, _ctx.n('--disabled')])),
    onClick: _cache[14] || (_cache[14] = function () {
      return _ctx.handleClick && _ctx.handleClick(...arguments);
    })
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('controller'), [_ctx.isFocus, _ctx.n('--focus')], [_ctx.errorMessage, _ctx.n('--error')], [_ctx.formDisabled || _ctx.disabled, _ctx.n('--disabled')])),
    style: _normalizeStyle({
      color: !_ctx.errorMessage ? _ctx.isFocus ? _ctx.focusColor : _ctx.blurColor : undefined
    })
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('icon'), [!_ctx.hint, _ctx.n('--non-hint')]))
  }, [_renderSlot(_ctx.$slots, "prepend-icon")], 2 /* CLASS */), _createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('wrap'), [!_ctx.hint, _ctx.n('--non-hint')]))
  }, [_ctx.type === 'password' ? (_openBlock(), _createElementBlock("input", {
    key: 0,
    class: _normalizeClass(_ctx.n('autocomplete'))
  }, null, 2 /* CLASS */)) : _createCommentVNode("v-if", true), _ctx.textarea ? (_openBlock(), _createElementBlock("textarea", {
    key: 1,
    class: _normalizeClass(_ctx.classes(_ctx.n('input'), _ctx.n('--textarea'), [_ctx.formDisabled || _ctx.disabled, _ctx.n('--disabled')], [_ctx.errorMessage, _ctx.n('--caret-error')])),
    ref: "el",
    autocomplete: "new-password",
    id: _ctx.id,
    disabled: _ctx.formDisabled || _ctx.disabled || _ctx.formReadonly || _ctx.readonly,
    type: _ctx.type,
    value: _ctx.modelValue,
    maxlength: _ctx.maxlength,
    rows: _ctx.rows,
    style: _normalizeStyle({
      color: _ctx.textColor,
      caretColor: !_ctx.errorMessage ? _ctx.focusColor : undefined,
      resize: _ctx.resize ? 'vertical' : 'none'
    }),
    onFocus: _cache[0] || (_cache[0] = function () {
      return _ctx.handleFocus && _ctx.handleFocus(...arguments);
    }),
    onBlur: _cache[1] || (_cache[1] = function () {
      return _ctx.handleBlur && _ctx.handleBlur(...arguments);
    }),
    onInput: _cache[2] || (_cache[2] = function () {
      return _ctx.handleInput && _ctx.handleInput(...arguments);
    }),
    onChange: _cache[3] || (_cache[3] = function () {
      return _ctx.handleChange && _ctx.handleChange(...arguments);
    }),
    onTouchstart: _cache[4] || (_cache[4] = function () {
      return _ctx.handleTouchstart && _ctx.handleTouchstart(...arguments);
    }),
    onCompositionstart: _cache[5] || (_cache[5] = function () {
      return _ctx.handleCompositionStart && _ctx.handleCompositionStart(...arguments);
    }),
    onCompositionend: _cache[6] || (_cache[6] = function () {
      return _ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...arguments);
    })
  }, "\n        ", 46 /* CLASS, STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_1)) : (_openBlock(), _createElementBlock("input", {
    key: 2,
    class: _normalizeClass(_ctx.classes(_ctx.n('input'), [_ctx.formDisabled || _ctx.disabled, _ctx.n('--disabled')], [_ctx.errorMessage, _ctx.n('--caret-error')])),
    ref: "el",
    autocomplete: "new-password",
    id: _ctx.id,
    disabled: _ctx.formDisabled || _ctx.disabled || _ctx.formReadonly || _ctx.readonly,
    type: _ctx.type,
    value: _ctx.modelValue,
    maxlength: _ctx.maxlength,
    style: _normalizeStyle({
      color: _ctx.textColor,
      caretColor: !_ctx.errorMessage ? _ctx.focusColor : undefined
    }),
    onFocus: _cache[7] || (_cache[7] = function () {
      return _ctx.handleFocus && _ctx.handleFocus(...arguments);
    }),
    onBlur: _cache[8] || (_cache[8] = function () {
      return _ctx.handleBlur && _ctx.handleBlur(...arguments);
    }),
    onInput: _cache[9] || (_cache[9] = function () {
      return _ctx.handleInput && _ctx.handleInput(...arguments);
    }),
    onChange: _cache[10] || (_cache[10] = function () {
      return _ctx.handleChange && _ctx.handleChange(...arguments);
    }),
    onTouchstart: _cache[11] || (_cache[11] = function () {
      return _ctx.handleTouchstart && _ctx.handleTouchstart(...arguments);
    }),
    onCompositionstart: _cache[12] || (_cache[12] = function () {
      return _ctx.handleCompositionStart && _ctx.handleCompositionStart(...arguments);
    }),
    onCompositionend: _cache[13] || (_cache[13] = function () {
      return _ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...arguments);
    })
  }, null, 46 /* CLASS, STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_2)), _createElementVNode("label", {
    class: _normalizeClass(_ctx.classes(_ctx.n('$--ellipsis'), [_ctx.isFocus, _ctx.n('--focus')], [_ctx.formDisabled || _ctx.disabled, _ctx.n('--disabled')], [_ctx.errorMessage, _ctx.n('--error')], [_ctx.textarea, _ctx.n('textarea-placeholder'), _ctx.n('placeholder')], _ctx.computePlaceholderState(), [!_ctx.hint, _ctx.n('--placeholder-non-hint')])),
    style: _normalizeStyle({
      color: !_ctx.errorMessage ? _ctx.isFocus ? _ctx.focusColor : _ctx.blurColor : undefined
    }),
    for: _ctx.id
  }, _toDisplayString(_ctx.placeholder), 15 /* TEXT, CLASS, STYLE, PROPS */, _hoisted_3)], 2 /* CLASS */), _createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('icon'), [!_ctx.hint, _ctx.n('--non-hint')]))
  }, [_renderSlot(_ctx.$slots, "append-icon", {}, () => [_ctx.clearable && !_ctx.isEmpty(_ctx.modelValue) ? (_openBlock(), _createBlock(_component_var_icon, {
    key: 0,
    class: _normalizeClass(_ctx.n('clear-icon')),
    "var-input-cover": "",
    name: "close-circle",
    onClick: _ctx.handleClear
  }, null, 8 /* PROPS */, ["class", "onClick"])) : _createCommentVNode("v-if", true)])], 2 /* CLASS */)], 6 /* CLASS, STYLE */), _ctx.line ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.classes(_ctx.n('line'), [_ctx.formDisabled || _ctx.disabled, _ctx.n('--line-disabled')], [_ctx.errorMessage, _ctx.n('--line-error')])),
    style: _normalizeStyle({
      background: !_ctx.errorMessage ? _ctx.blurColor : undefined
    })
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('dot'), [_ctx.isFocus, _ctx.n('--spread')], [_ctx.formDisabled || _ctx.disabled, _ctx.n('--line-disabled')], [_ctx.errorMessage, _ctx.n('--line-error')])),
    style: _normalizeStyle({
      background: !_ctx.errorMessage ? _ctx.focusColor : undefined
    })
  }, null, 6 /* CLASS, STYLE */)], 6 /* CLASS, STYLE */)) : _createCommentVNode("v-if", true), _createVNode(_component_var_form_details, {
    "error-message": _ctx.errorMessage,
    "extra-message": _ctx.maxlengthText
  }, null, 8 /* PROPS */, ["error-message", "extra-message"])], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarInput',
  components: {
    VarIcon,
    VarFormDetails
  },
  props,
  setup(props) {
    var id = ref("var-input-" + getCurrentInstance().uid);
    var el = ref(null);
    var isFocus = ref(false);
    var isComposing = ref(false);
    var type = computed(() => {
      if (props.type === 'number') {
        return 'text';
      }
      return props.type;
    });
    var maxlengthText = computed(() => {
      var {
        maxlength,
        modelValue
      } = props;
      if (!maxlength) {
        return '';
      }
      if (isEmpty(modelValue)) {
        return "0 / " + maxlength;
      }
      return String(modelValue).length + "/" + maxlength;
    });
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
    var computePlaceholderState = () => {
      var {
        hint,
        modelValue
      } = props;
      if (!hint && (!isEmpty(modelValue) || isComposing.value)) {
        return n('--placeholder-hidden');
      }
      if (hint && (!isEmpty(modelValue) || isFocus.value)) {
        return n('--placeholder-hint');
      }
    };
    var handleFocus = e => {
      isFocus.value = true;
      call(props.onFocus, e);
      validateWithTrigger('onFocus');
    };
    var handleBlur = e => {
      isFocus.value = false;
      call(props.onBlur, e);
      validateWithTrigger('onBlur');
    };
    var updateValue = e => {
      var target = e.target;
      var {
        value
      } = target;
      if (props.type === 'number') {
        value = formatNumber(value);
      }
      return withMaxlength(withTrim(value));
    };
    var handleCompositionStart = () => {
      isComposing.value = true;
    };
    var handleCompositionEnd = e => {
      if (!isComposing.value) {
        return;
      }
      isComposing.value = false;
      e.target.dispatchEvent(new Event('input'));
    };
    var handleInput = e => {
      if (isComposing.value) {
        return;
      }
      var value = updateValue(e);
      call(props['onUpdate:modelValue'], value);
      call(props.onInput, value, e);
      validateWithTrigger('onInput');
    };
    var handleChange = e => {
      var value = updateValue(e);
      call(props.onChange, value, e);
      validateWithTrigger('onChange');
    };
    var handleClear = () => {
      var {
        disabled,
        readonly,
        clearable,
        onClear
      } = props;
      if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly || !clearable) {
        return;
      }
      call(props['onUpdate:modelValue'], '');
      call(onClear, '');
      validateWithTrigger('onClear');
    };
    var handleClick = e => {
      var {
        disabled,
        onClick
      } = props;
      if (form != null && form.disabled.value || disabled) {
        return;
      }
      call(onClick, e);
      validateWithTrigger('onClick');
    };
    var formatNumber = value => {
      var minusIndex = value.indexOf('-');
      var dotIndex = value.indexOf('.');
      if (minusIndex > -1) {
        value = minusIndex === 0 ? '-' + value.replace(/-/g, '') : value.replace(/-/g, '');
      }
      if (dotIndex > -1) {
        value = value.slice(0, dotIndex + 1) + value.slice(dotIndex).replace(/\./g, '');
      }
      return value.replace(/[^-0-9.]/g, '');
    };
    var withTrim = value => props.modelModifiers.trim ? value.trim() : value;
    var withMaxlength = value => props.maxlength ? value.slice(0, toNumber(props.maxlength)) : value;
    var handleTouchstart = e => {
      var {
        disabled,
        readonly
      } = props;
      if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly) {
        return;
      }
      e.stopPropagation();
    };

    // expose
    var reset = () => {
      call(props['onUpdate:modelValue'], '');
      resetValidation();
    };

    // expose
    var validate = () => v(props.rules, props.modelValue);

    // expose
    var focus = () => {
      var _el$value;
      ;
      (_el$value = el.value) == null ? void 0 : _el$value.focus();
    };

    // expose
    var blur = () => {
      ;
      el.value.blur();
    };
    var inputProvider = {
      reset,
      validate,
      resetValidation
    };
    call(bindForm, inputProvider);
    useMounted(() => {
      if (props.autofocus) {
        focus();
      }
    });
    return {
      el,
      id,
      isFocus,
      isComposing,
      errorMessage,
      type,
      maxlengthText,
      formDisabled: form == null ? void 0 : form.disabled,
      formReadonly: form == null ? void 0 : form.readonly,
      n,
      classes,
      isEmpty,
      computePlaceholderState,
      handleFocus,
      handleBlur,
      handleInput,
      handleChange,
      handleClear,
      handleClick,
      handleTouchstart,
      handleCompositionStart,
      handleCompositionEnd,
      validate,
      resetValidation,
      reset,
      focus,
      blur
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;