import LoadingBarComponent from './LoadingBar.mjs';
import { reactive } from 'vue';
import { mountInstance } from '../utils/components.mjs';
var valueTimer;
var errorTimer;
var opacityTimer;
var finishTimer;
var isMount;
var setOptions = {};
var internalProps = {
  value: 0,
  opacity: 0,
  error: false
};
var props = reactive(internalProps);
var mergeConfig = options => {
  Object.assign(props, options);
};
var setDefaultOptions = options => {
  Object.assign(props, options);
  setOptions = options;
};
var resetDefaultOptions = () => {
  Object.keys(setOptions).forEach(key => {
    if (props[key] !== undefined) {
      props[key] = undefined;
    }
  });
};
var mount = () => {
  if (!isMount) {
    isMount = true;
    mountInstance(LoadingBarComponent, props);
  }
};
var tickValue = () => {
  valueTimer = window.setTimeout(() => {
    if (props.value >= 95) return;
    var num = Math.random();
    if (props.value < 70) num = Math.round(5 * Math.random());
    props.value += num;
    tickValue();
  }, 200);
};
var clearTimer = () => {
  window.clearTimeout(errorTimer);
  window.clearTimeout(valueTimer);
  window.clearTimeout(opacityTimer);
  window.clearTimeout(finishTimer);
};
var start = () => {
  clearTimer();
  props.error = false;
  props.value = 0;
  mount();
  opacityTimer = window.setTimeout(() => {
    props.opacity = 1;
  }, 200);
  tickValue();
};
var finish = () => {
  clearTimer();
  props.value = 100;
  opacityTimer = window.setTimeout(() => {
    props.opacity = 0;
    errorTimer = window.setTimeout(() => {
      props.error = false;
    }, 250);
  }, 300);
};
var error = () => {
  clearTimer();
  props.error = true;
  if (props.value === 100) {
    props.value = 0;
  }
  mount();
  opacityTimer = window.setTimeout(() => {
    props.opacity = 1;
  }, 200);
  tickValue();
  finishTimer = window.setTimeout(finish, 300);
};
var LoadingBar = {
  start,
  finish,
  error,
  /** @deprecated Use setDefaultOptions to instead. */
  mergeConfig,
  setDefaultOptions,
  resetDefaultOptions
};
export { props as loadingBarProps } from './props.mjs';
export var _LoadingBarComponent = LoadingBar;
export default LoadingBar;