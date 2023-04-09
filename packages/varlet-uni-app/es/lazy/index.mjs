function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { getAllParentScroller, inViewport } from '../utils/elements.mjs';
import { removeItem, throttle } from '@varlet/shared';
import { createCache } from '../utils/shared.mjs';
import { call } from '../utils/components.mjs';
var BACKGROUND_IMAGE_ARG_NAME = 'background-image';
var LAZY_LOADING = 'lazy-loading';
var LAZY_ERROR = 'lazy-error';
var LAZY_ATTEMPT = 'lazy-attempt';
var EVENTS = ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'];
export var PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
var lazyElements = [];
var listenTargets = [];
export var imageCache = createCache(100);
export var defaultLazyOptions = {
  loading: PIXEL,
  error: PIXEL,
  attempt: 3,
  throttleWait: 300,
  events: EVENTS
};
var checkAllWithThrottle = throttle(checkAll, defaultLazyOptions.throttleWait);
function setSRC(el, src) {
  if (el._lazy.arg === BACKGROUND_IMAGE_ARG_NAME) {
    el.style.backgroundImage = "url(" + src + ")";
  } else {
    el.setAttribute('src', src);
  }
}
function setLoading(el) {
  el._lazy.loading && setSRC(el, el._lazy.loading);
  checkAll();
}
function setError(el) {
  el._lazy.error && setSRC(el, el._lazy.error);
  el._lazy.state = 'error';
  clear(el);
  checkAll();
}
function setSuccess(el, attemptSRC) {
  setSRC(el, attemptSRC);
  el._lazy.state = 'success';
  clear(el);
  checkAll();
}
function bindEvents(listenTarget) {
  var _defaultLazyOptions$e;
  if (listenTargets.includes(listenTarget)) {
    return;
  }
  listenTargets.push(listenTarget);
  (_defaultLazyOptions$e = defaultLazyOptions.events) == null ? void 0 : _defaultLazyOptions$e.forEach(event => {
    listenTarget.addEventListener(event, checkAllWithThrottle, {
      passive: true
    });
  });
}
function unbindEvents() {
  listenTargets.forEach(listenTarget => {
    var _defaultLazyOptions$e2;
    (_defaultLazyOptions$e2 = defaultLazyOptions.events) == null ? void 0 : _defaultLazyOptions$e2.forEach(event => {
      listenTarget.removeEventListener(event, checkAllWithThrottle);
    });
  });
  listenTargets.length = 0;
}
function createLazy(el, binding) {
  var _el$getAttribute, _el$getAttribute2;
  var lazyOptions = {
    loading: (_el$getAttribute = el.getAttribute(LAZY_LOADING)) != null ? _el$getAttribute : defaultLazyOptions.loading,
    error: (_el$getAttribute2 = el.getAttribute(LAZY_ERROR)) != null ? _el$getAttribute2 : defaultLazyOptions.error,
    attempt: el.getAttribute(LAZY_ATTEMPT) ? Number(el.getAttribute(LAZY_ATTEMPT)) : defaultLazyOptions.attempt
  };
  el._lazy = _extends({
    src: binding.value,
    arg: binding.arg,
    currentAttempt: 0,
    state: 'pending',
    attemptLock: false
  }, lazyOptions);
  setSRC(el, PIXEL);
  call(defaultLazyOptions.filter, el._lazy);
}
function createImage(el, attemptSRC) {
  var image = new Image();
  image.src = attemptSRC;
  el._lazy.preloadImage = image;
  image.addEventListener('load', () => {
    el._lazy.attemptLock = false;
    imageCache.add(attemptSRC);
    setSuccess(el, attemptSRC);
  });
  image.addEventListener('error', () => {
    el._lazy.attemptLock = false;
    el._lazy.currentAttempt >= el._lazy.attempt ? setError(el) : attemptLoad(el);
  });
}
function attemptLoad(el) {
  if (el._lazy.attemptLock) {
    return;
  }
  el._lazy.attemptLock = true;
  el._lazy.currentAttempt++;
  var {
    src: attemptSRC
  } = el._lazy;
  if (imageCache.has(attemptSRC)) {
    setSuccess(el, attemptSRC);
    el._lazy.attemptLock = false;
    return;
  }
  setLoading(el);
  createImage(el, attemptSRC);
}
function check(_x) {
  return _check.apply(this, arguments);
}
function _check() {
  _check = _asyncToGenerator(function* (el) {
    ;
    (yield inViewport(el)) && attemptLoad(el);
  });
  return _check.apply(this, arguments);
}
function checkAll() {
  lazyElements.forEach(el => check(el));
}
function add(_x2) {
  return _add.apply(this, arguments);
}
function _add() {
  _add = _asyncToGenerator(function* (el) {
    !lazyElements.includes(el) && lazyElements.push(el);
    getAllParentScroller(el).forEach(bindEvents);
    yield check(el);
  });
  return _add.apply(this, arguments);
}
function clear(el) {
  removeItem(lazyElements, el);
  lazyElements.length === 0 && unbindEvents();
}
function diff(el, binding) {
  var {
    src,
    arg
  } = el._lazy;
  return src !== binding.value || arg !== binding.arg;
}
function mounted(_x3, _x4) {
  return _mounted.apply(this, arguments);
}
function _mounted() {
  _mounted = _asyncToGenerator(function* (el, binding) {
    createLazy(el, binding);
    yield add(el);
  });
  return _mounted.apply(this, arguments);
}
function updated(_x5, _x6) {
  return _updated.apply(this, arguments);
}
function _updated() {
  _updated = _asyncToGenerator(function* (el, binding) {
    if (!diff(el, binding)) {
      lazyElements.includes(el) && (yield check(el));
      return;
    }
    yield mounted(el, binding);
  });
  return _updated.apply(this, arguments);
}
function mergeLazyOptions(lazyOptions) {
  if (lazyOptions === void 0) {
    lazyOptions = {};
  }
  var {
    events,
    loading,
    error,
    attempt,
    throttleWait,
    filter
  } = lazyOptions;
  defaultLazyOptions.events = events != null ? events : defaultLazyOptions.events;
  defaultLazyOptions.loading = loading != null ? loading : defaultLazyOptions.loading;
  defaultLazyOptions.error = error != null ? error : defaultLazyOptions.error;
  defaultLazyOptions.attempt = attempt != null ? attempt : defaultLazyOptions.attempt;
  defaultLazyOptions.throttleWait = throttleWait != null ? throttleWait : defaultLazyOptions.throttleWait;
  defaultLazyOptions.filter = filter;
}
var Lazy = {
  mounted,
  unmounted: clear,
  updated,
  install(app, lazyOptions) {
    mergeLazyOptions(lazyOptions);
    checkAllWithThrottle = throttle(checkAll, defaultLazyOptions.throttleWait);
    app.directive('lazy', this);
  }
};
export var _LazyComponent = Lazy;
export default Lazy;