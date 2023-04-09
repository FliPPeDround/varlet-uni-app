import VarFormDetails from '../form-details/index.mjs';
import { defineComponent, ref, computed, reactive, nextTick, watch, unref } from 'vue';
import { useValidation, createNamespace, call } from '../utils/components.mjs';
import { useForm } from '../form/provide.mjs';
import VarHoverOverlay, { useHoverOverlay } from '../hover-overlay/index.mjs';
import Hover from '../hover/index.mjs';
import { getLeft, multiplySizeUnit } from '../utils/elements.mjs';
import { warn } from '../utils/logger.mjs';
import { isArray, isNumber, toNumber } from '@varlet/shared';
import { props, Thumbs } from './props.mjs';
import { useMounted } from '@varlet/use';
var {
  n,
  classes
} = createNamespace('slider');
import { normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, renderSlot as _renderSlot, resolveDirective as _resolveDirective, withDirectives as _withDirectives, resolveComponent as _resolveComponent, createVNode as _createVNode, toDisplayString as _toDisplayString, withModifiers as _withModifiers, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = ["onTouchstart", "onTouchmove", "onTouchend", "onTouchcancel"];
function __render__(_ctx, _cache) {
  var _component_var_hover_overlay = _resolveComponent("var-hover-overlay");
  var _component_var_form_details = _resolveComponent("var-form-details");
  var _directive_hover = _resolveDirective("hover");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n())
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('block'), [_ctx.isDisabled, _ctx.n('--disabled')], [_ctx.errorMessage, _ctx.n('--error')])),
    ref: "sliderEl",
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.click && _ctx.click(...arguments);
    })
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('track'))
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('track-background')),
    style: _normalizeStyle({
      background: _ctx.trackColor,
      height: _ctx.multiplySizeUnit(_ctx.trackHeight)
    })
  }, null, 6 /* CLASS, STYLE */), _createElementVNode("div", {
    class: _normalizeClass(_ctx.n('track-fill')),
    style: _normalizeStyle(_ctx.getFillStyle)
  }, null, 6 /* CLASS, STYLE */)], 2 /* CLASS */), (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.thumbList, item => {
    return _openBlock(), _createElementBlock("div", {
      class: _normalizeClass(_ctx.n('thumb')),
      key: item.enumValue,
      style: _normalizeStyle({
        left: item.value + "%",
        zIndex: _ctx.thumbsProps[item.enumValue].active ? 1 : undefined
      }),
      onTouchstart: _withModifiers($event => _ctx.start($event, item.enumValue), ["stop"]),
      onTouchmove: _withModifiers($event => _ctx.move($event, item.enumValue), ["stop"]),
      onTouchend: $event => _ctx.end(item.enumValue),
      onTouchcancel: $event => _ctx.end(item.enumValue)
    }, [_renderSlot(_ctx.$slots, "button", {
      currentValue: item.text
    }, () => [_withDirectives(_createElementVNode("div", {
      class: _normalizeClass(_ctx.n('thumb-block')),
      style: _normalizeStyle({
        background: _ctx.thumbColor
      })
    }, null, 6 /* CLASS, STYLE */), [[_directive_hover, value => _ctx.hover(value, item), "desktop"]]), _createElementVNode("div", {
      class: _normalizeClass(_ctx.classes(_ctx.n('thumb-ripple'), [_ctx.thumbsProps[item.enumValue].active, _ctx.n('thumb-ripple--active')])),
      style: _normalizeStyle({
        background: _ctx.thumbsProps[item.enumValue].active ? _ctx.thumbColor : undefined
      })
    }, [_createVNode(_component_var_hover_overlay, {
      hovering: item.hovering
    }, null, 8 /* PROPS */, ["hovering"])], 6 /* CLASS, STYLE */), _createElementVNode("div", {
      class: _normalizeClass(_ctx.classes(_ctx.n('thumb-label'), [_ctx.showLabel(item.enumValue), _ctx.n('thumb-label--active')])),
      style: _normalizeStyle({
        background: _ctx.labelColor,
        color: _ctx.labelTextColor,
        height: _ctx.thumbSize === undefined ? _ctx.thumbSize : _ctx.multiplySizeUnit(_ctx.thumbSize, 2),
        width: _ctx.thumbSize === undefined ? _ctx.thumbSize : _ctx.multiplySizeUnit(_ctx.thumbSize, 2)
      })
    }, [_createElementVNode("span", null, _toDisplayString(item.text), 1 /* TEXT */)], 6 /* CLASS, STYLE */)])], 46 /* CLASS, STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_1);
  }), 128 /* KEYED_FRAGMENT */))], 2 /* CLASS */), _createVNode(_component_var_form_details, {
    "error-message": _ctx.errorMessage,
    class: _normalizeClass(_ctx.n('form')),
    "var-slider-cover": ""
  }, null, 8 /* PROPS */, ["error-message", "class"])], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarSlider',
  components: {
    VarFormDetails,
    VarHoverOverlay
  },
  directives: {
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
      hovering: hoveringFirst,
      handleHovering: handleHoveringFirst
    } = useHoverOverlay();
    var {
      hovering: hoveringSecond,
      handleHovering: handleHoveringSecond
    } = useHoverOverlay();
    var validate = () => v(props.rules, props.modelValue);
    var getThumbProps = () => ({
      startPosition: 0,
      currentLeft: 0,
      active: false,
      percentValue: 0
    });
    var validateWithTrigger = () => nextTick(() => vt(['onChange'], 'onChange', props.rules, props.modelValue));
    var sliderEl = ref(null);
    var maxWidth = ref(0);
    var isScroll = ref(false);
    var thumbsProps = reactive({
      [Thumbs.First]: getThumbProps(),
      [Thumbs.Second]: getThumbProps()
    });
    var scope = computed(() => toNumber(props.max) - toNumber(props.min));
    var unitWidth = computed(() => maxWidth.value / scope.value * toNumber(props.step));
    var thumbList = computed(() => {
      var {
        modelValue,
        range
      } = props;
      var list = [];
      if (range && isArray(modelValue)) {
        list = [{
          value: getValue(modelValue[0]),
          enumValue: Thumbs.First,
          text: toPrecision(modelValue[0]),
          hovering: unref(hoveringFirst),
          handleHovering: handleHoveringFirst
        }, {
          value: getValue(modelValue[1]),
          enumValue: Thumbs.Second,
          text: toPrecision(modelValue[1]),
          hovering: unref(hoveringSecond),
          handleHovering: handleHoveringSecond
        }];
      } else if (isNumber(modelValue)) {
        list = [{
          value: getValue(modelValue),
          enumValue: Thumbs.First,
          text: toPrecision(modelValue),
          hovering: unref(hoveringFirst),
          handleHovering: handleHoveringFirst
        }];
      }
      return list;
    });
    var getFillStyle = computed(() => {
      var {
        activeColor,
        range,
        modelValue
      } = props;
      var left = range && isArray(modelValue) ? getValue(Math.min(modelValue[0], modelValue[1])) : 0;
      var width = range && isArray(modelValue) ? getValue(Math.max(modelValue[0], modelValue[1])) - left : getValue(modelValue);
      return {
        width: width + "%",
        left: left + "%",
        background: activeColor
      };
    });
    var isDisabled = computed(() => props.disabled || (form == null ? void 0 : form.disabled.value));
    var isReadonly = computed(() => props.readonly || (form == null ? void 0 : form.readonly.value));
    var showLabel = type => {
      if (props.labelVisible === 'always') return true;
      if (props.labelVisible === 'never') return false;
      return thumbsProps[type].active;
    };
    var getValue = value => {
      var {
        min,
        max
      } = props;
      if (value < toNumber(min)) return 0;
      if (value > toNumber(max)) return 100;
      return (value - toNumber(min)) / scope.value * 100;
    };
    var toPrecision = value => {
      if (!isNumber(value)) return 0;
      var num = value;
      if (num < Number(props.min)) num = Number(props.min);
      if (num > Number(props.max)) num = Number(props.max);
      var isInteger = parseInt("" + num, 10) === num;
      return isInteger ? num : toNumber(num.toPrecision(5));
    };
    var hover = (value, item) => {
      if (isDisabled.value) return;
      item.handleHovering(value);
    };
    var setPercent = (moveDistance, type) => {
      var rangeValue = [];
      var {
        step,
        range,
        modelValue,
        onChange,
        min
      } = props;
      var stepNumber = toNumber(step);
      var roundDistance = Math.round(moveDistance / unitWidth.value);
      var curValue = roundDistance * stepNumber + toNumber(min);
      var prevValue = thumbsProps[type].percentValue * stepNumber + toNumber(min);
      thumbsProps[type].percentValue = roundDistance;
      if (range && isArray(modelValue)) {
        rangeValue = type === Thumbs.First ? [curValue, modelValue[1]] : [modelValue[0], curValue];
      }
      if (prevValue !== curValue) {
        var value = range ? rangeValue.map(value => toPrecision(value)) : toPrecision(curValue);
        call(onChange, value);
        call(props['onUpdate:modelValue'], value);
        validateWithTrigger();
      }
    };
    var getType = offset => {
      if (!props.range) return Thumbs.First;
      var thumb1Distance = thumbsProps[Thumbs.First].percentValue * unitWidth.value;
      var thumb2Distance = thumbsProps[Thumbs.Second].percentValue * unitWidth.value;
      var offsetToThumb1 = Math.abs(offset - thumb1Distance);
      var offsetToThumb2 = Math.abs(offset - thumb2Distance);
      return offsetToThumb1 <= offsetToThumb2 ? Thumbs.First : Thumbs.Second;
    };
    var start = (event, type) => {
      if (!maxWidth.value) maxWidth.value = sliderEl.value.offsetWidth;
      if (!isDisabled.value) {
        thumbsProps[type].active = true;
      }
      if (isDisabled.value || isReadonly.value) return;
      call(props.onStart);
      isScroll.value = true;
      thumbsProps[type].startPosition = event.touches[0].clientX;
    };
    var move = (event, type) => {
      if (isDisabled.value || isReadonly.value || !isScroll.value) return;
      var moveDistance = event.touches[0].clientX - thumbsProps[type].startPosition + thumbsProps[type].currentLeft;
      if (moveDistance <= 0) moveDistance = 0;else if (moveDistance >= maxWidth.value) moveDistance = maxWidth.value;
      setPercent(moveDistance, type);
    };
    var end = type => {
      var {
        range,
        modelValue,
        onEnd,
        step,
        min
      } = props;
      if (!isDisabled.value) {
        thumbsProps[type].active = false;
      }
      if (isDisabled.value || isReadonly.value) return;
      var rangeValue = [];
      thumbsProps[type].currentLeft = thumbsProps[type].percentValue * unitWidth.value;
      var curValue = thumbsProps[type].percentValue * toNumber(step) + toNumber(min);
      if (range && isArray(modelValue)) {
        rangeValue = type === Thumbs.First ? [curValue, modelValue[1]] : [modelValue[0], curValue];
      }
      call(onEnd, range ? rangeValue : curValue);
      isScroll.value = false;
    };
    var click = event => {
      if (isDisabled.value || isReadonly.value) return;
      if (event.target.closest("." + n('thumb'))) return;
      var offset = event.clientX - getLeft(event.currentTarget);
      var type = getType(offset);
      setPercent(offset, type);
      end(type);
    };
    var stepValidator = () => {
      var stepNumber = toNumber(props.step);
      if (isNaN(stepNumber)) {
        warn('Slider', 'type of prop "step" should be Number');
        return false;
      }
      if (stepNumber < 0) {
        warn('Slider', '"step" should be > 0');
        return false;
      }
      return true;
    };
    var valueValidator = () => {
      var {
        range,
        modelValue
      } = props;
      if (range && !isArray(modelValue)) {
        console.error('[Varlet] Slider: "modelValue" should be an Array');
        return false;
      }
      if (!range && isArray(modelValue)) {
        console.error('[Varlet] Slider: "modelValue" should be a Number');
        return false;
      }
      if (range && isArray(modelValue) && modelValue.length < 2) {
        console.error('[Varlet] Slider: "modelValue" should have two value');
        return false;
      }
      return true;
    };
    var setProps = function (modelValue, step) {
      if (modelValue === void 0) {
        modelValue = props.modelValue;
      }
      if (step === void 0) {
        step = toNumber(props.step);
      }
      var getPercent = value => {
        var {
          min,
          max
        } = props;
        if (value < toNumber(min)) return 0;
        if (value > toNumber(max)) return scope.value / step;
        return (value - toNumber(min)) / step;
      };
      if (props.range && isArray(modelValue)) {
        thumbsProps[Thumbs.First].percentValue = getPercent(modelValue[0]);
        thumbsProps[Thumbs.First].currentLeft = thumbsProps[Thumbs.First].percentValue * unitWidth.value;
        thumbsProps[Thumbs.Second].percentValue = getPercent(modelValue[1]);
        thumbsProps[Thumbs.Second].currentLeft = thumbsProps[Thumbs.Second].percentValue * unitWidth.value;
      } else if (isNumber(modelValue)) {
        thumbsProps[Thumbs.First].currentLeft = getPercent(modelValue) * unitWidth.value;
      }
    };
    var reset = () => {
      var resetValue = props.range ? [0, 0] : 0;
      call(props['onUpdate:modelValue'], resetValue);
      resetValidation();
    };
    var sliderProvider = {
      reset,
      validate,
      resetValidation
    };
    call(bindForm, sliderProvider);
    watch([() => props.modelValue, () => props.step], _ref => {
      var [modelValue, step] = _ref;
      if (!stepValidator() || !valueValidator() || isScroll.value) return;
      setProps(modelValue, toNumber(step));
    });
    watch(maxWidth, () => setProps());
    useMounted(() => {
      if (!stepValidator() || !valueValidator()) return;
      maxWidth.value = sliderEl.value.offsetWidth;
    });
    return {
      n,
      classes,
      Thumbs,
      sliderEl,
      getFillStyle,
      isDisabled,
      errorMessage,
      thumbsProps,
      thumbList,
      hover,
      multiplySizeUnit,
      toNumber,
      showLabel,
      start,
      move,
      end,
      click
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;