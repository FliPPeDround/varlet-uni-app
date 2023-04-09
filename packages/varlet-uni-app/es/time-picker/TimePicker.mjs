import { computed, defineComponent, reactive, ref, watch } from 'vue';
import dayjs from 'dayjs/esm';
import Clock from './clock.mjs';
import { props, hoursAmpm, hours24 } from './props.mjs';
import { toNumber } from '@varlet/shared';
import { createNamespace, call, formatElevation } from '../utils/components.mjs';
import { padStart } from '../utils/shared.mjs';
import { getNumberTime, getIsDisableMinute, getIsDisableSecond } from './utils.mjs';
var {
  n,
  classes
} = createNamespace('time-picker');
import { toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeStyle as _normalizeStyle, resolveComponent as _resolveComponent, createBlock as _createBlock, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/_createElementVNode("span", null, ":", -1 /* HOISTED */));
var _hoisted_2 = {
  key: 0
};
function __render__(_ctx, _cache) {
  var _component_clock = _resolveComponent("clock");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.formatElevation(_ctx.elevation, 2))),
    ref: "picker"
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('title')),
    style: _normalizeStyle({
      background: _ctx.headerColor || _ctx.color
    })
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('title-time'))
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('title-btn'), [_ctx.type === 'hour', _ctx.n('title-btn--active')])),
    onClick: _cache[0] || (_cache[0] = $event => _ctx.checkPanel('hour'))
  }, _toDisplayString(_ctx.time.hour), 3 /* TEXT, CLASS */), _hoisted_1, _createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('title-btn'), [_ctx.type === 'minute', _ctx.n('title-btn--active')])),
    onClick: _cache[1] || (_cache[1] = $event => _ctx.checkPanel('minute'))
  }, _toDisplayString(_ctx.time.minute), 3 /* TEXT, CLASS */), _ctx.useSeconds ? (_openBlock(), _createElementBlock("span", _hoisted_2, ":")) : _createCommentVNode("v-if", true), _ctx.useSeconds ? (_openBlock(), _createElementBlock("div", {
    key: 1,
    class: _normalizeClass(_ctx.classes(_ctx.n('title-btn'), [_ctx.type === 'second', _ctx.n('title-btn--active')])),
    onClick: _cache[2] || (_cache[2] = $event => _ctx.checkPanel('second'))
  }, _toDisplayString(_ctx.time.second), 3 /* TEXT, CLASS */)) : _createCommentVNode("v-if", true)], 2 /* CLASS */), _ctx.format === 'ampm' ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('title-ampm'))
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('title-btn'), [_ctx.ampm === 'am', _ctx.n('title-btn--active')])),
    onClick: _cache[3] || (_cache[3] = $event => _ctx.checkAmpm('am'))
  }, "AM", 2 /* CLASS */), _createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('title-btn'), [_ctx.ampm === 'pm', _ctx.n('title-btn--active')])),
    onClick: _cache[4] || (_cache[4] = $event => _ctx.checkAmpm('pm'))
  }, "PM", 2 /* CLASS */)], 2 /* CLASS */)) : _createCommentVNode("v-if", true)], 6 /* CLASS, STYLE */), _createElementVNode("div", {
    class: _normalizeClass(_ctx.n('body'))
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('clock-container')),
    onTouchstart: _cache[5] || (_cache[5] = function () {
      return _ctx.moveHand && _ctx.moveHand(...arguments);
    }),
    onTouchmove: _cache[6] || (_cache[6] = function () {
      return _ctx.moveHand && _ctx.moveHand(...arguments);
    }),
    onTouchend: _cache[7] || (_cache[7] = function () {
      return _ctx.end && _ctx.end(...arguments);
    }),
    ref: "container"
  }, [_createVNode(_Transition, {
    name: _ctx.n() + "-panel-fade"
  }, {
    default: _withCtx(() => [(_openBlock(), _createBlock(_component_clock, {
      key: _ctx.type,
      ref: "inner",
      type: _ctx.type,
      ampm: _ctx.ampm,
      color: _ctx.color,
      "is-inner": _ctx.isInner,
      format: _ctx.format,
      "allowed-time": _ctx.allowedTime,
      rad: _ctx.getRad,
      time: _ctx.time,
      "prevent-next-update": _ctx.isPreventNextUpdate,
      "use-seconds": _ctx.useSeconds,
      max: _ctx.max,
      min: _ctx.min,
      onUpdate: _ctx.update,
      onChangePreventUpdate: _ctx.changePreventUpdate
    }, null, 8 /* PROPS */, ["type", "ampm", "color", "is-inner", "format", "allowed-time", "rad", "time", "prevent-next-update", "use-seconds", "max", "min", "onUpdate", "onChangePreventUpdate"]))]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["name"])], 34 /* CLASS, HYDRATE_EVENTS */)], 2 /* CLASS */)], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarTimePicker',
  components: {
    Clock
  },
  props,
  setup(props) {
    var container = ref(null);
    var picker = ref(null);
    var inner = ref(null);
    var isInner = ref(false);
    var isPreventNextUpdate = ref(false);
    var isActualInner = ref(false);
    var isChosenUsableHour = ref(false);
    var isChosenUsableMinute = ref(false);
    var hourRad = ref(undefined);
    var minuteRad = ref(0);
    var secondRad = ref(0);
    var type = ref('hour');
    var ampm = ref('am');
    var isDisableHour = ref(false);
    var isDisableMinute = ref(false);
    var time = ref({
      hour: '00',
      minute: '00',
      second: '00'
    });
    var center = reactive({
      x: 0,
      y: 0
    });
    var innerRange = reactive({
      x: [],
      y: []
    });
    var getRad = computed(() => {
      if (type.value === 'hour') return hourRad.value;
      if (type.value === 'minute') return minuteRad.value;
      return secondRad.value;
    });
    var update = newTime => {
      call(props['onUpdate:modelValue'], newTime);
      call(props.onChange, newTime);
    };
    var rad2deg = rad => {
      return rad * 57.29577951308232;
    };
    var checkPanel = panelType => {
      isChosenUsableHour.value = false;
      isDisableMinute.value = false;
      type.value = panelType;
    };
    var findAvailableHour = ampm => {
      var {
        disableHour
      } = inner.value;
      var index = hoursAmpm.findIndex(hour => toNumber(hour) === toNumber(time.value.hour));
      var hours = ampm === 'am' ? hoursAmpm : hours24;
      var realignmentHours = [...hours.slice(index), ...hours.slice(0, index)];
      return realignmentHours.find((hour, index) => {
        isPreventNextUpdate.value = index !== 0;
        return !disableHour.includes(hour);
      });
    };
    var checkAmpm = ampmType => {
      if (props.readonly) return;
      ampm.value = ampmType;
      var newHour = findAvailableHour(ampmType);
      if (!newHour) return;
      var second = props.useSeconds ? ":" + time.value.second : '';
      var newTime = padStart(newHour, 2, '0') + ":" + time.value.minute + second;
      update(newTime);
    };
    var getInner = (clientX, clientY) => {
      var xIsInRange = clientX >= innerRange.x[0] && clientX <= innerRange.x[1];
      var yIsInRange = clientY >= innerRange.y[0] && clientY <= innerRange.y[1];
      return xIsInRange && yIsInRange;
    };
    var getTime = value => {
      var hourFormat = props.format === '24hr' ? 'HH' : 'hh';
      var {
        hour,
        minute,
        second
      } = getNumberTime(value);
      return {
        hour: dayjs().hour(hour).format(hourFormat),
        minute: dayjs().minute(minute).format('mm'),
        second: dayjs().second(second).format('ss')
      };
    };
    var getHourIndex = rad => {
      var value = rad / 30;
      return value >= 0 ? value : value + 12;
    };
    var getRangeSize = () => {
      var {
        width: innerWidth,
        height: innerHeight
      } = inner.value.getSize();
      var rangeXMin = center.x - innerWidth / 2 - 8;
      var rangeXMax = center.x + innerWidth / 2 + 8;
      var rangeYMin = center.y - innerHeight / 2 - 8;
      var rangeYMax = center.y + innerHeight / 2 + 8;
      return {
        rangeXMin,
        rangeXMax,
        rangeYMin,
        rangeYMax
      };
    };
    var setHourRad = (clientX, clientY, roundDeg) => {
      var {
        disableHour
      } = inner.value;
      isActualInner.value = getInner(clientX, clientY);
      var rad = Math.round(roundDeg / 30) * 30 + 90;
      var index = getHourIndex(rad);
      var anotherHour = isInner.value ? hoursAmpm[index] : hours24[index];
      if (!disableHour.includes(anotherHour)) {
        isInner.value = props.format === '24hr' ? getInner(clientX, clientY) : false;
      }
      if (isInner.value !== isActualInner.value) return;
      var newHour = isInner.value || ampm.value === 'pm' ? hours24[index] : hoursAmpm[index];
      isDisableHour.value = disableHour.includes(newHour);
      if (isDisableHour.value) return;
      hourRad.value = rad;
      isChosenUsableHour.value = true;
    };
    var setMinuteRad = roundDeg => {
      var {
        disableHour
      } = inner.value;
      var rad = Math.round(roundDeg / 6) * 6 + 90;
      var radToMin = rad / 6 >= 0 ? rad / 6 : rad / 6 + 60;
      var values = {
        time: radToMin,
        format: props.format,
        ampm: ampm.value,
        hour: time.value.hour,
        max: props.max,
        min: props.min,
        disableHour,
        allowedTime: props.allowedTime
      };
      isDisableMinute.value = getIsDisableMinute(values);
      if (isDisableMinute.value) return;
      minuteRad.value = rad;
      isChosenUsableMinute.value = true;
    };
    var setSecondRad = roundDeg => {
      var {
        disableHour
      } = inner.value;
      var rad = Math.round(roundDeg / 6) * 6 + 90;
      var radToSec = rad / 6 >= 0 ? rad / 6 : rad / 6 + 60;
      var values = {
        time: radToSec,
        format: props.format,
        ampm: ampm.value,
        hour: time.value.hour,
        minute: toNumber(time.value.minute),
        max: props.max,
        min: props.min,
        disableHour,
        allowedTime: props.allowedTime
      };
      if (!getIsDisableSecond(values)) secondRad.value = rad;
    };
    var setCenterAndRange = () => {
      var {
        left,
        top,
        width,
        height
      } = container.value.getBoundingClientRect();
      center.x = left + width / 2;
      center.y = top + height / 2;
      if (type.value === 'hour' && props.format === '24hr') {
        var {
          rangeXMin,
          rangeXMax,
          rangeYMin,
          rangeYMax
        } = getRangeSize();
        innerRange.x = [rangeXMin, rangeXMax];
        innerRange.y = [rangeYMin, rangeYMax];
      }
    };
    var moveHand = event => {
      event.preventDefault();
      if (props.readonly) return;
      setCenterAndRange();
      var {
        clientX,
        clientY
      } = event.touches[0];
      var x = clientX - center.x;
      var y = clientY - center.y;
      var roundDeg = Math.round(rad2deg(Math.atan2(y, x)));
      if (type.value === 'hour') setHourRad(clientX, clientY, roundDeg);else if (type.value === 'minute') setMinuteRad(roundDeg);else setSecondRad(roundDeg);
    };
    var end = () => {
      if (props.readonly) return;
      if (type.value === 'hour' && isChosenUsableHour.value) {
        type.value = 'minute';
        return;
      }
      if (type.value === 'minute' && props.useSeconds && isChosenUsableMinute.value) {
        type.value = 'second';
      }
    };
    var changePreventUpdate = () => {
      isPreventNextUpdate.value = false;
    };
    watch(() => props.modelValue, value => {
      if (value) {
        var {
          hour,
          minute,
          second
        } = getNumberTime(value);
        var formatHour12 = dayjs().hour(hour).format('hh');
        var formatHour24 = dayjs().hour(hour).format('HH');
        var formatMinute = dayjs().minute(minute).format('mm');
        var formatSecond = dayjs().second(second).format('ss');
        hourRad.value = (formatHour12 === '12' ? 0 : toNumber(formatHour12)) * 30;
        minuteRad.value = toNumber(formatMinute) * 6;
        secondRad.value = toNumber(formatSecond) * 6;
        time.value = getTime(value);
        if (props.format !== '24hr') {
          ampm.value = padStart("" + hour, 2, '0') === formatHour24 && hours24.includes(formatHour24) ? 'pm' : 'am';
        }
        isInner.value = props.format === '24hr' && hours24.includes(formatHour24);
      }
    }, {
      immediate: true
    });
    return {
      n,
      classes,
      getRad,
      time,
      container,
      inner,
      picker,
      isInner,
      type,
      ampm,
      isPreventNextUpdate,
      moveHand,
      checkPanel,
      checkAmpm,
      end,
      update,
      changePreventUpdate,
      formatElevation
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;