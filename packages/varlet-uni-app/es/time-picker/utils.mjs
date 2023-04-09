import { hours24, hoursAmpm } from './props.mjs';
import { toNumber } from '@varlet/shared';
export var notConvert = (format, ampm) => format === '24hr' || ampm === 'am';
export var convertHour = (format, ampm, hour) => {
  var index = hoursAmpm.findIndex(hourAmpm => toNumber(hourAmpm) === toNumber(hour));
  var getHour = notConvert(format, ampm) ? hour : hours24[index];
  return {
    hourStr: getHour,
    hourNum: toNumber(getHour)
  };
};
export var getNumberTime = time => {
  var [hour, minute, second] = time.split(':');
  return {
    hour: toNumber(hour),
    minute: toNumber(minute),
    second: toNumber(second)
  };
};
export var getIsDisableMinute = values => {
  var _values$allowedTime, _values$allowedTime2;
  var {
    time,
    format,
    ampm,
    hour,
    max,
    min,
    disableHour
  } = values;
  var {
    hourStr,
    hourNum
  } = convertHour(format, ampm, hour);
  var isBetweenMinMax = false;
  var isAllow = false;
  if (disableHour.includes(hourStr)) return true;
  if (max && !min) {
    var {
      hour: maxHour,
      minute: maxMinute
    } = getNumberTime(max);
    isBetweenMinMax = maxHour === hourNum && time > maxMinute;
  }
  if (!max && min) {
    var {
      hour: minHour,
      minute: minMinute
    } = getNumberTime(min);
    isBetweenMinMax = minHour === hourNum && time < minMinute;
  }
  if (max && min) {
    var {
      hour: _maxHour,
      minute: _maxMinute
    } = getNumberTime(max);
    var {
      hour: _minHour,
      minute: _minMinute
    } = getNumberTime(min);
    isBetweenMinMax = _minHour === hourNum && time < _minMinute || _maxHour === hourNum && time > _maxMinute;
  }
  if ((_values$allowedTime = values.allowedTime) != null && _values$allowedTime.minutes) isAllow = (_values$allowedTime2 = values.allowedTime) == null ? void 0 : _values$allowedTime2.minutes(time);
  return isBetweenMinMax || isAllow;
};
export var getIsDisableSecond = values => {
  var _values$allowedTime3, _values$allowedTime4;
  var {
    time,
    format,
    ampm,
    hour,
    minute,
    max,
    min,
    disableHour
  } = values;
  var {
    hourStr,
    hourNum
  } = convertHour(format, ampm, hour);
  var isBetweenMinMax = false;
  var isAllow = false;
  if (disableHour.includes(hourStr)) return true;
  if (max && !min) {
    var {
      hour: maxHour,
      minute: maxMinute,
      second: maxSecond
    } = getNumberTime(max);
    isBetweenMinMax = maxHour === hourNum && maxMinute < minute || maxMinute === minute && time > maxSecond;
  }
  if (!max && min) {
    var {
      hour: minHour,
      minute: minMinute,
      second: minSecond
    } = getNumberTime(min);
    isBetweenMinMax = minHour === hourNum && minMinute > minute || minMinute === minute && time > minSecond;
  }
  if (max && min) {
    var {
      hour: _maxHour2,
      minute: _maxMinute2,
      second: _maxSecond
    } = getNumberTime(max);
    var {
      hour: _minHour2,
      minute: _minMinute2,
      second: _minSecond
    } = getNumberTime(min);
    isBetweenMinMax = _maxHour2 === hourNum && _maxMinute2 < minute || _minHour2 === hourNum && _minMinute2 > minute || _maxHour2 === hourNum && _maxMinute2 === minute && time > _maxSecond || _minHour2 === hourNum && _minMinute2 === minute && time < _minSecond;
  }
  if ((_values$allowedTime3 = values.allowedTime) != null && _values$allowedTime3.seconds) isAllow = (_values$allowedTime4 = values.allowedTime) == null ? void 0 : _values$allowedTime4.seconds(time);
  return isBetweenMinMax || isAllow;
};