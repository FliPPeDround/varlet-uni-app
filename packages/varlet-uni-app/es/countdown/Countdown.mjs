import { defineComponent, onActivated, onDeactivated, onUnmounted, ref, watch } from 'vue';
import { props } from './props.mjs';
import { requestAnimationFrame, cancelAnimationFrame } from '../utils/elements.mjs';
import { call, createNamespace } from '../utils/components.mjs';
import { padStart } from '../utils/shared.mjs';
import { toNumber } from '@varlet/shared';
var {
  n
} = createNamespace('countdown');
var SECOND = 1000;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
import { normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n())
  }, [_renderSlot(_ctx.$slots, "default", _normalizeProps(_guardReactiveProps(_ctx.timeData)), () => [_createTextVNode(_toDisplayString(_ctx.showTime), 1 /* TEXT */)])], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarCountdown',
  props,
  setup(props) {
    var showTime = ref('');
    var timeData = ref({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    });
    var endTime = 0;
    var isStart = false;
    var handle = 0;
    var remainingTime = 0;
    var cacheIsStart;
    var parseFormat = (format, time) => {
      var scannedTimes = Object.values(time);
      var scannedFormats = ['DD', 'HH', 'mm', 'ss'];
      var padValues = [24, 60, 60, 1000];
      scannedFormats.forEach((scannedFormat, index) => {
        if (!format.includes(scannedFormat)) {
          scannedTimes[index + 1] += scannedTimes[index] * padValues[index];
        } else {
          format = format.replace(scannedFormat, padStart("" + scannedTimes[index], 2, '0'));
        }
      });
      if (format.includes('S')) {
        var ms = padStart("" + scannedTimes[scannedTimes.length - 1], 3, '0');
        if (format.includes('SSS')) {
          format = format.replace('SSS', ms);
        } else if (format.includes('SS')) {
          format = format.replace('SS', ms.slice(0, 2));
        } else {
          format = format.replace('S', ms.slice(0, 1));
        }
      }
      return format;
    };
    var displayTime = durationTime => {
      var days = Math.floor(durationTime / DAY);
      var hours = Math.floor(durationTime % DAY / HOUR);
      var minutes = Math.floor(durationTime % HOUR / MINUTE);
      var seconds = Math.floor(durationTime % MINUTE / SECOND);
      var milliseconds = Math.floor(durationTime % SECOND);
      var time = {
        days,
        hours,
        minutes,
        seconds,
        milliseconds
      };
      timeData.value = time;
      call(props.onChange, timeData.value);
      showTime.value = parseFormat(props.format, time);
    };
    var countdown = () => {
      var {
        time,
        onEnd
      } = props;
      var now = performance.now();
      if (!endTime) {
        endTime = now + toNumber(time);
      }
      remainingTime = endTime - now;
      if (remainingTime < 0) {
        remainingTime = 0;
      }
      displayTime(remainingTime);
      if (remainingTime === 0) {
        call(onEnd);
        return;
      }
      if (isStart) {
        handle = requestAnimationFrame(countdown);
      }
    };

    // expose
    var start = function (resume) {
      if (resume === void 0) {
        resume = false;
      }
      if (isStart && !resume) {
        return;
      }
      isStart = true;
      endTime = performance.now() + (remainingTime || toNumber(props.time));
      countdown();
    };

    // expose
    var pause = () => {
      isStart = false;
      cancelAnimationFrame(handle);
    };

    // expose
    var reset = () => {
      endTime = 0;
      isStart = false;
      cancelAnimationFrame(handle);
      countdown();
    };
    watch(() => props.time, () => {
      reset();
      if (props.autoStart) {
        start();
      }
    }, {
      immediate: true
    });
    onActivated(() => {
      if (cacheIsStart == null) {
        return;
      }
      isStart = cacheIsStart;
      if (isStart === true) {
        start(true);
      }
    });
    onDeactivated(() => {
      cacheIsStart = isStart;
      pause();
    });
    onUnmounted(pause);
    return {
      showTime,
      timeData,
      n,
      start,
      pause,
      reset
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;