import { computed, defineComponent, ref, watch } from 'vue';
import dayjs from 'dayjs/esm';
import { hoursAmpm, hours24, minSec } from './props.mjs';
import { notConvert, convertHour, getIsDisableMinute, getIsDisableSecond, getNumberTime } from './utils.mjs';
import { toNumber } from '@varlet/shared';
import { createNamespace } from '../utils/components.mjs';
import { padStart } from '../utils/shared.mjs';
var {
  n,
  classes
} = createNamespace('time-picker');
import { normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createCommentVNode as _createCommentVNode } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n('clock'))
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('clock-hand')),
    style: _normalizeStyle(_ctx.handStyle)
  }, null, 6 /* CLASS, STYLE */), (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.timeScales, (timeScale, index) => {
    return _openBlock(), _createElementBlock("div", {
      class: _normalizeClass(_ctx.classes(_ctx.n('clock-item'), [_ctx.isActive(index, false), _ctx.n('clock-item--active')], [_ctx.isDisable(timeScale), _ctx.n('clock-item--disable')])),
      key: timeScale,
      style: _normalizeStyle(_ctx.getStyle(index, timeScale, false))
    }, _toDisplayString(timeScale), 7 /* TEXT, CLASS, STYLE */);
  }), 128 /* KEYED_FRAGMENT */)), _ctx.format === '24hr' && _ctx.type === 'hour' ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('clock-inner')),
    ref: "inner"
  }, [(_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.hours24, (hour, index) => {
    return _openBlock(), _createElementBlock("div", {
      class: _normalizeClass(_ctx.classes(_ctx.n('clock-item'), [_ctx.isActive(index, true), _ctx.n('clock-item--active')], [_ctx.isDisable(hour), _ctx.n('clock-item--disable')])),
      key: hour,
      style: _normalizeStyle(_ctx.getStyle(index, hour, true))
    }, _toDisplayString(hour), 7 /* TEXT, CLASS, STYLE */);
  }), 128 /* KEYED_FRAGMENT */))], 2 /* CLASS */)) : _createCommentVNode("v-if", true)], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'Clock',
  props: {
    isInner: {
      type: Boolean,
      required: true
    },
    rad: {
      type: Number
    },
    format: {
      type: String,
      default: 'ampm'
    },
    allowedTime: {
      type: Object
    },
    time: {
      type: Object,
      required: true
    },
    useSeconds: {
      type: Boolean,
      default: false
    },
    preventNextUpdate: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'hour'
    },
    ampm: {
      type: String,
      default: 'am'
    },
    color: {
      type: String
    },
    min: {
      type: String
    },
    max: {
      type: String
    }
  },
  emits: ['update', 'change-prevent-update'],
  setup(props, _ref) {
    var {
      emit
    } = _ref;
    var inner = ref(null);
    var disableHour = ref([]);
    var disable24HourIndex = ref([]);
    var handStyle = computed(() => ({
      transform: "rotate(" + toNumber(props.rad) + "deg)",
      height: props.isInner && props.type === 'hour' ? 'calc(50% - 40px)' : 'calc(50% - 4px)',
      backgroundColor: getHandleColor(),
      borderColor: getHandleColor()
    }));
    var activeItemIndex = computed(() => {
      if (props.rad === undefined) return;
      var value = props.rad / 30;
      return value >= 0 ? value : value + 12;
    });
    var timeScales = computed(() => {
      if (props.type === 'hour') return hoursAmpm;
      return minSec;
    });
    var isDisableMinSec = (time, isDisable) => {
      var _time;
      time = (_time = time) != null ? _time : props.type === 'minute' ? props.time.minute : props.time.second;
      var disableMethod = props.type === 'minute' ? getIsDisableMinute : getIsDisableSecond;
      var values = {
        time: toNumber(time),
        format: props.format,
        ampm: props.ampm,
        hour: props.time.hour,
        minute: toNumber(props.time.minute),
        max: props.max,
        min: props.min,
        allowedTime: props.allowedTime,
        disableHour: disableHour.value
      };
      if (isDisable && props.type === 'minute') Reflect.deleteProperty(values, 'minute');
      return disableMethod(values);
    };
    var getHandleColor = () => {
      if (activeItemIndex.value === undefined) return props.color;
      var hour = props.isInner ? hours24[activeItemIndex.value] : timeScales.value[activeItemIndex.value];
      if (timeScales.value === minSec) {
        return isDisableMinSec() ? '#bdbdbd' : props.color;
      }
      return isDisable(hour) ? '#bdbdbd' : props.color;
    };
    var isActive = (index, inner) => {
      if (inner) return activeItemIndex.value === index && props.isInner;
      return activeItemIndex.value === index && (!props.isInner || props.type !== 'hour');
    };
    var isDisable = time => {
      if (props.type === 'hour') {
        if (notConvert(props.format, props.ampm)) return disableHour.value.includes(time);
        var timeIndex = hoursAmpm.findIndex(hour => hour === time);
        return disable24HourIndex.value.includes(timeIndex);
      }
      return isDisableMinSec(time, true);
    };
    var getStyle = (index, hour, inner) => {
      var rad = 2 * Math.PI / 12 * index - Math.PI / 2;
      var left = 50 * (1 + Math.cos(rad));
      var top = 50 * (1 + Math.sin(rad));
      var computedColor = () => {
        if (!isActive(index, inner)) {
          return {
            backgroundColor: undefined,
            color: undefined
          };
        }
        if (isDisable(hour)) {
          return {
            backgroundColor: '#bdbdbd',
            color: '#fff'
          };
        }
        return {
          backgroundColor: props.color,
          color: undefined
        };
      };
      var {
        backgroundColor,
        color
      } = computedColor();
      return {
        left: left + "%",
        top: top + "%",
        backgroundColor,
        color
      };
    };
    var getSize = () => {
      var {
        width,
        height
      } = inner.value.getBoundingClientRect();
      return {
        width,
        height
      };
    };
    var getHour = () => {
      if (activeItemIndex.value === undefined) return undefined;
      var hours = props.ampm === 'am' ? hoursAmpm : hours24;
      return padStart(hours[activeItemIndex.value], 2, '0');
    };
    watch([activeItemIndex, () => props.isInner], (_ref2, _ref3) => {
      var [index, inner] = _ref2;
      var [oldIndex, oldInner] = _ref3;
      var isSame = index === oldIndex && inner === oldInner;
      if (isSame || props.type !== 'hour' || activeItemIndex.value === undefined) return;
      var newHour = inner ? hours24[activeItemIndex.value] : getHour();
      var second = props.useSeconds ? ":" + props.time.second : '';
      var newTime = newHour + ":" + props.time.minute + second;
      if (!props.preventNextUpdate) emit('update', newTime);
      emit('change-prevent-update');
    });
    watch(() => props.rad, (rad, oldRad) => {
      if (props.type === 'hour' || rad === undefined || oldRad === undefined) return;
      var radToMinSec = rad / 6 >= 0 ? rad / 6 : rad / 6 + 60;
      var oldRadToMinSec = oldRad / 6 >= 0 ? oldRad / 6 : oldRad / 6 + 60;
      if (radToMinSec === oldRadToMinSec) return;
      var newTime;
      var {
        hourStr
      } = convertHour(props.format, props.ampm, props.time.hour);
      if (props.type === 'minute') {
        var newMinute = dayjs().minute(radToMinSec).format('mm');
        var second = props.useSeconds ? ":" + props.time.second : '';
        newTime = hourStr + ":" + newMinute + second;
      }
      if (props.type === 'second') {
        var newSecond = dayjs().second(radToMinSec).format('ss');
        var _second = props.useSeconds ? ":" + newSecond : '';
        newTime = hourStr + ":" + props.time.minute + _second;
      }
      emit('update', newTime);
    });
    watch([() => props.max, () => props.min, () => props.allowedTime], _ref4 => {
      var [max, min, allowedTime] = _ref4;
      disableHour.value = [];
      if (max && !min) {
        var {
          hour: maxHour
        } = getNumberTime(max);
        var disableAmpmHours = hoursAmpm.filter(hour => toNumber(hour) > maxHour);
        var disable24Hours = hours24.filter(hour => toNumber(hour) > maxHour);
        disableHour.value = [...disableAmpmHours, ...disable24Hours];
      }
      if (!max && min) {
        var {
          hour: minHour
        } = getNumberTime(min);
        var _disableAmpmHours = hoursAmpm.filter(hour => toNumber(hour) < minHour);
        var _disable24Hours = hours24.filter(hour => toNumber(hour) < minHour);
        disableHour.value = [..._disableAmpmHours, ..._disable24Hours];
      }
      if (max && min) {
        var {
          hour: _maxHour
        } = getNumberTime(max);
        var {
          hour: _minHour
        } = getNumberTime(min);
        var _disableAmpmHours2 = hoursAmpm.filter(hour => toNumber(hour) < _minHour || toNumber(hour) > _maxHour);
        var _disable24Hours2 = hours24.filter(hour => toNumber(hour) < _minHour || toNumber(hour) > _maxHour);
        disableHour.value = [..._disableAmpmHours2, ..._disable24Hours2];
      }
      if (allowedTime != null && allowedTime.hours) {
        var {
          hours
        } = allowedTime;
        var _disableAmpmHours3 = hoursAmpm.filter(hour => !hours(toNumber(hour)));
        var _disable24Hours3 = hours24.filter(hour => !hours(toNumber(hour)));
        disableHour.value = [...new Set([...disableHour.value, ..._disableAmpmHours3, ..._disable24Hours3])];
      }
      disable24HourIndex.value = disableHour.value.map(hour => hours24.findIndex(hour24 => hour === hour24)).filter(hour => hour >= 0);
    }, {
      immediate: true
    });
    return {
      n,
      classes,
      hours24,
      timeScales,
      inner,
      handStyle,
      disableHour,
      isActive,
      isDisable,
      getSize,
      getStyle,
      activeItemIndex
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;