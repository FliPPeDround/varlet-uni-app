import VarIcon from '../icon/index.mjs';
import VarMenu from '../menu/index.mjs';
import VarChip from '../chip/index.mjs';
import VarFormDetails from '../form-details/index.mjs';
import { computed, defineComponent, ref, watch, nextTick } from 'vue';
import { isArray, isEmpty } from '@varlet/shared';
import { props } from './props.mjs';
import { useValidation, createNamespace, call } from '../utils/components.mjs';
import { useOptions } from './provide.mjs';
import { useForm } from '../form/provide.mjs';
import { toPxNum } from '../utils/elements.mjs';
import { error } from '../utils/logger.mjs';
var {
  n,
  classes
} = createNamespace('select');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, resolveComponent as _resolveComponent, withModifiers as _withModifiers, withCtx as _withCtx, createBlock as _createBlock, createCommentVNode as _createCommentVNode, createVNode as _createVNode, normalizeStyle as _normalizeStyle, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = {
  key: 1
};
function __render__(_ctx, _cache) {
  var _component_var_chip = _resolveComponent("var-chip");
  var _component_var_icon = _resolveComponent("var-icon");
  var _component_var_menu = _resolveComponent("var-menu");
  var _component_var_form_details = _resolveComponent("var-form-details");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box'), [_ctx.formDisabled || _ctx.disabled, _ctx.n('--disabled')])),
    onClick: _cache[3] || (_cache[3] = function () {
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
    class: _normalizeClass(_ctx.classes(_ctx.n('wrap'), [!_ctx.hint, _ctx.n('--non-hint')])),
    ref: "wrapEl",
    onClick: _cache[2] || (_cache[2] = function () {
      return _ctx.handleFocus && _ctx.handleFocus(...arguments);
    })
  }, [_createVNode(_component_var_menu, {
    "var-select-cover": "",
    class: _normalizeClass(_ctx.classes(_ctx.n('menu'))),
    "offset-y": _ctx.offsetY,
    disabled: _ctx.formReadonly || _ctx.readonly || _ctx.formDisabled || _ctx.disabled,
    "default-style": false,
    show: _ctx.isFocus,
    "onUpdate:show": _cache[1] || (_cache[1] = $event => _ctx.isFocus = $event),
    onClose: _ctx.handleBlur
  }, {
    menu: _withCtx(() => [_createElementVNode("div", {
      ref: "menuEl",
      class: _normalizeClass(_ctx.classes(_ctx.n('scroller'), _ctx.n('$-elevation--3')))
    }, [_renderSlot(_ctx.$slots, "default")], 2 /* CLASS */)]),

    default: _withCtx(() => [_createElementVNode("div", {
      class: _normalizeClass(_ctx.classes(_ctx.n('select'), [_ctx.errorMessage, _ctx.n('--error')], [_ctx.formDisabled || _ctx.disabled, _ctx.n('--disabled')])),
      style: _normalizeStyle({
        textAlign: _ctx.textAlign,
        color: _ctx.textColor
      })
    }, [_createElementVNode("div", {
      class: _normalizeClass(_ctx.n('label'))
    }, [!_ctx.isEmptyModelValue ? _renderSlot(_ctx.$slots, "selected", {
      key: 0
    }, () => [_ctx.multiple ? (_openBlock(), _createElementBlock(_Fragment, {
      key: 0
    }, [_ctx.chip ? (_openBlock(), _createElementBlock("div", {
      key: 0,
      class: _normalizeClass(_ctx.n('chips'))
    }, [(_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.labels, l => {
      return _openBlock(), _createBlock(_component_var_chip, {
        class: _normalizeClass(_ctx.n('chip')),
        "var-select-cover": "",
        closable: "",
        size: "small",
        type: _ctx.errorMessage ? 'danger' : undefined,
        key: l,
        onClick: _cache[0] || (_cache[0] = _withModifiers(() => {}, ["stop"])),
        onClose: () => _ctx.handleClose(l)
      }, {
        default: _withCtx(() => [_createTextVNode(_toDisplayString(l), 1 /* TEXT */)]),

        _: 2 /* DYNAMIC */
      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "type", "onClose"]);
    }), 128 /* KEYED_FRAGMENT */))], 2 /* CLASS */)) : (_openBlock(), _createElementBlock("div", {
      key: 1,
      class: _normalizeClass(_ctx.n('values'))
    }, _toDisplayString(_ctx.labels.join(_ctx.separator)), 3 /* TEXT, CLASS */))], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */)) : (_openBlock(), _createElementBlock("span", _hoisted_1, _toDisplayString(_ctx.label), 1 /* TEXT */))]) : _createCommentVNode("v-if", true)], 2 /* CLASS */), _renderSlot(_ctx.$slots, "arrow-icon", {
      focus: _ctx.isFocus
    }, () => [_createVNode(_component_var_icon, {
      class: _normalizeClass(_ctx.classes(_ctx.n('arrow'), [_ctx.isFocus, _ctx.n('--arrow-rotate')])),
      "var-select-cover": "",
      name: "menu-down",
      transition: 300
    }, null, 8 /* PROPS */, ["class"])])], 6 /* CLASS, STYLE */), _createElementVNode("label", {
      class: _normalizeClass(_ctx.classes(_ctx.n('placeholder'), _ctx.n('$--ellipsis'), [_ctx.isFocus, _ctx.n('--focus')], [_ctx.errorMessage, _ctx.n('--error')], [_ctx.formDisabled || _ctx.disabled, _ctx.n('--disabled')], _ctx.computePlaceholderState(), [!_ctx.hint, _ctx.n('--placeholder-non-hint')])),
      style: _normalizeStyle({
        color: !_ctx.errorMessage ? _ctx.isFocus ? _ctx.focusColor : _ctx.blurColor : undefined
      })
    }, _toDisplayString(_ctx.placeholder), 7 /* TEXT, CLASS, STYLE */)]),

    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class", "offset-y", "disabled", "show", "onClose"])], 2 /* CLASS */), _createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('icon'), [!_ctx.hint, _ctx.n('--non-hint')]))
  }, [_renderSlot(_ctx.$slots, "append-icon", {}, () => [_ctx.clearable ? (_openBlock(), _createBlock(_component_var_icon, {
    key: 0,
    class: _normalizeClass(_ctx.n('clear-icon')),
    name: "close-circle",
    size: "14px",
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
    "error-message": _ctx.errorMessage
  }, null, 8 /* PROPS */, ["error-message"])], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarSelect',
  components: {
    VarIcon,
    VarMenu,
    VarChip,
    VarFormDetails
  },
  props,
  setup(props) {
    var wrapEl = ref(null);
    var isFocus = ref(false);
    var multiple = computed(() => props.multiple);
    var focusColor = computed(() => props.focusColor);
    var label = ref('');
    var labels = ref([]);
    var isEmptyModelValue = computed(() => isEmpty(props.modelValue));
    var wrapWidth = ref('0px');
    var offsetY = ref(0);
    var {
      bindForm,
      form
    } = useForm();
    var {
      length,
      options,
      bindOptions
    } = useOptions();
    var {
      errorMessage,
      validateWithTrigger: vt,
      validate: v,
      // expose
      resetValidation
    } = useValidation();
    var menuEl = ref(null);
    var computeLabel = () => {
      var {
        multiple,
        modelValue
      } = props;
      if (multiple) {
        var rawModelValue = modelValue;
        labels.value = rawModelValue.map(findLabel);
      }
      if (!multiple && !isEmpty(modelValue)) {
        label.value = findLabel(modelValue);
      }
      if (!multiple && isEmpty(modelValue)) {
        label.value = '';
      }
    };
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
    var findValueOrLabel = _ref => {
      var {
        value,
        label
      } = _ref;
      if (value.value != null) {
        return value.value;
      }
      return label.value;
    };
    var findLabel = modelValue => {
      var _option$label$value, _option;
      var option = options.find(_ref2 => {
        var {
          value
        } = _ref2;
        return value.value === modelValue;
      });
      if (!option) {
        option = options.find(_ref3 => {
          var {
            label
          } = _ref3;
          return label.value === modelValue;
        });
      }
      return (_option$label$value = (_option = option) == null ? void 0 : _option.label.value) != null ? _option$label$value : '';
    };
    var computePlaceholderState = () => {
      var {
        hint,
        modelValue
      } = props;
      if (!hint && !isEmpty(modelValue)) {
        return n('--placeholder-hidden');
      }
      if (hint && (!isEmpty(modelValue) || isFocus.value)) {
        return n('--placeholder-hint');
      }
    };
    var getWrapWidth = () => {
      return wrapEl.value && window.getComputedStyle(wrapEl.value).width || '0px';
    };
    var handleFocus = () => {
      var {
        disabled,
        readonly,
        onFocus
      } = props;
      if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly) {
        return;
      }
      wrapWidth.value = getWrapWidth();
      offsetY.value = toPxNum(props.offsetY);
      isFocus.value = true;
      call(onFocus);
      validateWithTrigger('onFocus');
    };
    var handleBlur = () => {
      var {
        disabled,
        readonly,
        onBlur
      } = props;
      if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly) {
        return;
      }
      call(onBlur);
      validateWithTrigger('onBlur');
    };
    var onSelect = option => {
      var {
        disabled,
        readonly,
        multiple,
        onChange
      } = props;
      if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly) {
        return;
      }
      var selectedValue = multiple ? options.filter(_ref4 => {
        var {
          selected
        } = _ref4;
        return selected.value;
      }).map(findValueOrLabel) : findValueOrLabel(option);
      call(props['onUpdate:modelValue'], selectedValue);
      call(onChange, selectedValue);
      validateWithTrigger('onChange');
      !multiple && (isFocus.value = false);
    };
    var handleClear = () => {
      var {
        disabled,
        readonly,
        multiple,
        clearable,
        onClear
      } = props;
      if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly || !clearable) {
        return;
      }
      var changedModelValue = multiple ? [] : undefined;
      call(props['onUpdate:modelValue'], changedModelValue);
      call(onClear, changedModelValue);
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
    var handleClose = text => {
      var {
        disabled,
        readonly,
        modelValue,
        onClose
      } = props;
      if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly) {
        return;
      }
      var rawModelValue = modelValue;
      var option = options.find(_ref5 => {
        var {
          label
        } = _ref5;
        return label.value === text;
      });
      var currentModelValue = rawModelValue.filter(value => {
        var _value$value;
        return value !== ((_value$value = option.value.value) != null ? _value$value : option.label.value);
      });
      call(props['onUpdate:modelValue'], currentModelValue);
      call(onClose, currentModelValue);
      validateWithTrigger('onClose');
    };
    var syncOptions = () => {
      var {
        multiple,
        modelValue
      } = props;
      if (multiple) {
        var rawModelValue = modelValue;
        options.forEach(option => option.sync(rawModelValue.includes(findValueOrLabel(option))));
      } else {
        options.forEach(option => option.sync(modelValue === findValueOrLabel(option)));
      }
      computeLabel();
    };

    // expose
    var focus = () => {
      wrapWidth.value = getWrapWidth();
      offsetY.value = toPxNum(props.offsetY);
      isFocus.value = true;
    };

    // expose
    var blur = () => {
      isFocus.value = false;
    };

    // expose
    var validate = () => v(props.rules, props.modelValue);

    // expose
    var reset = () => {
      call(props['onUpdate:modelValue'], props.multiple ? [] : undefined);
      resetValidation();
    };
    watch(() => props.multiple, () => {
      var {
        multiple,
        modelValue
      } = props;
      if (multiple && !isArray(modelValue)) {
        error('Select', 'The modelValue must be an array when multiple is true');
      }
    });
    watch(() => props.modelValue, syncOptions, {
      deep: true
    });
    watch(() => length.value, syncOptions);
    var selectProvider = {
      wrapWidth: computed(() => wrapWidth.value),
      multiple,
      focusColor,
      computeLabel,
      onSelect,
      reset,
      validate,
      resetValidation
    };
    bindOptions(selectProvider);
    call(bindForm, selectProvider);
    return {
      wrapEl,
      offsetY,
      isFocus,
      errorMessage,
      formDisabled: form == null ? void 0 : form.disabled,
      formReadonly: form == null ? void 0 : form.readonly,
      label,
      labels,
      isEmptyModelValue,
      menuEl,
      n,
      classes,
      computePlaceholderState,
      handleFocus,
      handleBlur,
      handleClear,
      handleClick,
      handleClose,
      reset,
      validate,
      resetValidation,
      focus,
      blur
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;