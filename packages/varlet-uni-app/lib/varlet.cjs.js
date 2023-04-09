"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const vue = require("vue");
var context = {
  locks: {},
  zIndex: 2e3,
  enableRipple: true
};
var _ContextComponent = vue.reactive(context);
const Context = vue.reactive(context);
const isString = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isNumber = (val) => typeof val === "number";
const isPlainObject = (val) => Object.prototype.toString.call(val) === "[object Object]";
const isObject = (val) => typeof val === "object" && val !== null;
const isFunction = (val) => typeof val === "function";
const isArray = (val) => Array.isArray(val);
const isURL = (val) => {
  if (!val) {
    return false;
  }
  return /^(http)|(\.*\/)/.test(val);
};
const isEmpty = (val) => val === void 0 || val === null || val === "" || Array.isArray(val) && !val.length;
const toNumber = (val) => {
  if (val == null)
    return 0;
  if (isString(val)) {
    val = parseFloat(val);
    val = Number.isNaN(val) ? 0 : val;
    return val;
  }
  if (isBoolean(val))
    return Number(val);
  return val;
};
const removeItem = (arr, item) => {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
};
const throttle = (method, mustRunDelay = 200) => {
  let timer;
  let start2 = 0;
  return function loop(...args) {
    const now = Date.now();
    const elapsed = now - start2;
    if (!start2) {
      start2 = now;
    }
    if (timer) {
      window.clearTimeout(timer);
    }
    if (elapsed >= mustRunDelay) {
      method.apply(this, args);
      start2 = now;
    } else {
      timer = window.setTimeout(() => {
        loop.apply(this, args);
      }, mustRunDelay - elapsed);
    }
  };
};
const inBrowser = () => typeof window !== "undefined";
const uniq = (arr) => [...new Set(arr)];
const camelize = (s) => s.replace(/-(\w)/g, (_, p) => p.toUpperCase());
const kebabCase = (s) => {
  const ret = s.replace(/([A-Z])/g, " $1").trim();
  return ret.split(" ").join("-").toLowerCase();
};
const find = (arr, callback, from = "start") => {
  let i = from === "start" ? 0 : arr.length - 1;
  while (arr.length > 0 && i >= 0 && i <= arr.length - 1) {
    const flag = callback(arr[i], i, arr);
    if (flag) {
      return [arr[i], i];
    }
    from === "start" ? i++ : i--;
  }
  return [null, -1];
};
var isHTMLSupportImage = (val) => {
  if (val == null) {
    return false;
  }
  return val.startsWith("data:image") || /\.(png|jpg|gif|jpeg|svg|webp)$/.test(val);
};
var isHTMLSupportVideo = (val) => {
  if (val == null) {
    return false;
  }
  return val.startsWith("data:video") || /\.(mp4|webm|ogg)$/.test(val);
};
var createCache = (max2) => {
  var cache = [];
  return {
    cache,
    has(key) {
      return this.cache.includes(key);
    },
    add(key) {
      if (this.has(key)) {
        return;
      }
      this.cache.length === max2 && cache.shift();
      this.cache.push(key);
    },
    remove(key) {
      this.has(key) && removeItem(this.cache, key);
    },
    clear() {
      this.cache.length = 0;
    }
  };
};
var linear = (value) => value;
var cubic = (value) => Math.pow(value, 3);
var easeInOutCubic = (value) => value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;
var dt = (value, defaultText) => value == null ? defaultText : value;
var getGlobalThis = () => {
  if (typeof globalThis !== "undefined")
    return globalThis;
  if (typeof window !== "undefined")
    return window;
  return typeof global !== "undefined" ? global : self;
};
var padStart$1 = function(str, maxLength, fillString) {
  if (str === void 0) {
    str = "";
  }
  if (fillString === void 0) {
    fillString = "";
  }
  if (str.length >= maxLength)
    return str;
  var len = maxLength - str.length;
  var repeatCount = Math.floor(len / fillString.length);
  return fillString.repeat(repeatCount) + fillString.slice(0, len % fillString.length) + str;
};
function error$1(source, message) {
  throw Error("Varlet [" + source + "]: " + message);
}
function warn(source, message) {
  console.warn("Varlet [" + source + "]: " + message);
}
function asyncGeneratorStep$e(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error2) {
    reject(error2);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator$e(fn2) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn2.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep$e(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep$e(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
function getLeft(element) {
  var {
    left: left2
  } = element.getBoundingClientRect();
  return left2 + (document.body.scrollLeft || document.documentElement.scrollLeft);
}
function getTop$1(element) {
  var {
    top: top2
  } = element.getBoundingClientRect();
  return top2 + (document.body.scrollTop || document.documentElement.scrollTop);
}
function getScrollTop(element) {
  var top2 = "scrollTop" in element ? element.scrollTop : element.pageYOffset;
  return Math.max(top2, 0);
}
function getScrollLeft(element) {
  var left2 = "scrollLeft" in element ? element.scrollLeft : element.pageXOffset;
  return Math.max(left2, 0);
}
function inViewport(_x) {
  return _inViewport.apply(this, arguments);
}
function _inViewport() {
  _inViewport = _asyncToGenerator$e(function* (element) {
    yield doubleRaf();
    var {
      top: top2,
      bottom: bottom2,
      left: left2,
      right: right2
    } = element.getBoundingClientRect();
    var {
      innerWidth,
      innerHeight
    } = window;
    var xInViewport = left2 <= innerWidth && right2 >= 0;
    var yInViewport = top2 <= innerHeight && bottom2 >= 0;
    return xInViewport && yInViewport;
  });
  return _inViewport.apply(this, arguments);
}
function getTranslate(el) {
  var {
    transform
  } = window.getComputedStyle(el);
  return +transform.slice(transform.lastIndexOf(",") + 2, transform.length - 1);
}
function getParentScroller(el) {
  var element = el;
  while (element) {
    if (!element.parentNode) {
      break;
    }
    element = element.parentNode;
    if (element === document.body || element === document.documentElement) {
      break;
    }
    var scrollRE = /(scroll|auto)/;
    var {
      overflowY,
      overflow
    } = window.getComputedStyle(element);
    if (scrollRE.test(overflowY) || scrollRE.test(overflow)) {
      return element;
    }
  }
  return window;
}
function getAllParentScroller(el) {
  var allParentScroller = [];
  var element = el;
  while (element !== window) {
    element = getParentScroller(element);
    allParentScroller.push(element);
  }
  return allParentScroller;
}
function getTarget(target, componentName) {
  if (isString(target)) {
    var el = document.querySelector(target);
    if (!el) {
      error$1(componentName, "target element cannot found");
    }
    return el;
  }
  if (isObject(target))
    return target;
  error$1(componentName, 'type of prop "target" should be a selector or an element object');
}
function getViewportSize() {
  var {
    innerWidth,
    innerHeight
  } = window;
  return innerWidth > innerHeight ? {
    vMin: innerHeight,
    vMax: innerWidth
  } : {
    vMin: innerWidth,
    vMax: innerHeight
  };
}
var isRem = (value) => isString(value) && value.endsWith("rem");
var isPx = (value) => isString(value) && value.endsWith("px") || isNumber(value);
var isPercent = (value) => isString(value) && value.endsWith("%");
var isVw = (value) => isString(value) && value.endsWith("vw");
var isVh = (value) => isString(value) && value.endsWith("vh");
var isVMin = (value) => isString(value) && value.endsWith("vmin");
var isVMax = (value) => isString(value) && value.endsWith("vmax");
var isCalc = (value) => isString(value) && value.startsWith("calc(");
var isVar = (value) => isString(value) && value.startsWith("var(");
var toPxNum = (value) => {
  if (isNumber(value)) {
    return value;
  }
  if (isPx(value)) {
    return +value.replace("px", "");
  }
  if (isVw(value)) {
    return +value.replace("vw", "") * window.innerWidth / 100;
  }
  if (isVh(value)) {
    return +value.replace("vh", "") * window.innerHeight / 100;
  }
  if (isRem(value)) {
    var num = +value.replace("rem", "");
    var rootFontSize = window.getComputedStyle(document.documentElement).fontSize;
    return num * parseFloat(rootFontSize);
  }
  if (isVMin(value)) {
    return getViewportSize().vMin;
  }
  if (isVMax(value)) {
    return getViewportSize().vMax;
  }
  if (isString(value)) {
    return toNumber(value);
  }
  return 0;
};
var toSizeUnit = (value) => {
  if (value == null) {
    return void 0;
  }
  if (isPercent(value) || isVw(value) || isVh(value) || isRem(value) || isCalc(value) || isVar(value) || isVMin(value) || isVMax(value)) {
    return value;
  }
  return toPxNum(value) + "px";
};
var multiplySizeUnit = function(value, quantity) {
  if (quantity === void 0) {
    quantity = 1;
  }
  if (value == null) {
    return void 0;
  }
  var legalSize = toSizeUnit(value);
  var unit = legalSize.match(/(vh|%|rem|px|vw)$/)[0];
  return "" + parseFloat(legalSize) * quantity + unit;
};
function requestAnimationFrame(fn2) {
  var globalThis2 = getGlobalThis();
  return globalThis2.requestAnimationFrame ? globalThis2.requestAnimationFrame(fn2) : globalThis2.setTimeout(fn2, 16);
}
function cancelAnimationFrame(handle) {
  var globalThis2 = getGlobalThis();
  globalThis2.cancelAnimationFrame ? globalThis2.cancelAnimationFrame(handle) : globalThis2.clearTimeout(handle);
}
function nextTickFrame(fn2) {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn2);
  });
}
function doubleRaf() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}
function raf() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });
}
function scrollTo(element, _ref) {
  var {
    top: top2 = 0,
    left: left2 = 0,
    duration = 300,
    animation
  } = _ref;
  var startTime = Date.now();
  var scrollTop = getScrollTop(element);
  var scrollLeft = getScrollLeft(element);
  return new Promise((resolve) => {
    var frame = () => {
      var progress2 = (Date.now() - startTime) / duration;
      if (progress2 < 1) {
        var nextTop = scrollTop + (top2 - scrollTop) * animation(progress2);
        var nextLeft = scrollLeft + (left2 - scrollLeft) * animation(progress2);
        element.scrollTo(nextLeft, nextTop);
        requestAnimationFrame(frame);
      } else {
        element.scrollTo(left2, top2);
        resolve();
      }
    };
    requestAnimationFrame(frame);
  });
}
function formatStyleVars(styleVars) {
  return Object.entries(styleVars != null ? styleVars : {}).reduce((styles, _ref2) => {
    var [key, value] = _ref2;
    var cssVar = key.startsWith("--") ? key : "--" + kebabCase(key);
    styles[cssVar] = value;
    return styles;
  }, {});
}
function supportTouch() {
  var inBrowser2 = typeof window !== "undefined";
  return inBrowser2 && "ontouchstart" in window;
}
function padStartFlex(style) {
  return style === "start" || style === "end" ? "flex-" + style : style;
}
function useMounted(hook) {
  let isMounted = false;
  vue.onMounted(() => {
    hook();
    vue.nextTick(() => {
      isMounted = true;
    });
  });
  vue.onActivated(() => {
    if (!isMounted) {
      return;
    }
    hook();
  });
}
function useEventListener(target, type, listener, options = {}) {
  if (!inBrowser()) {
    return;
  }
  const { passive: passive2 = false, capture = false } = options;
  let listening = false;
  let cleaned = false;
  const add2 = (target2) => {
    if (listening || cleaned) {
      return;
    }
    const element = vue.unref(target2);
    if (element) {
      element.addEventListener(type, listener, {
        passive: passive2,
        capture
      });
      listening = true;
    }
  };
  const remove = (target2) => {
    if (!listening || cleaned) {
      return;
    }
    const element = vue.unref(target2);
    if (element) {
      element.removeEventListener(type, listener, {
        capture
      });
      listening = false;
    }
  };
  let watchStopHandle;
  if (vue.isRef(target)) {
    watchStopHandle = vue.watch(() => target.value, (newValue, oldValue) => {
      remove(oldValue);
      add2(newValue);
    });
  }
  const cleanup = () => {
    watchStopHandle === null || watchStopHandle === void 0 ? void 0 : watchStopHandle();
    remove(target);
    cleaned = true;
  };
  useMounted(() => {
    add2(target);
  });
  vue.onBeforeUnmount(() => {
    remove(target);
  });
  vue.onDeactivated(() => {
    remove(target);
  });
  return cleanup;
}
function useClickOutside(target, type, listener) {
  if (!inBrowser()) {
    return;
  }
  const handler = (event) => {
    const element = vue.unref(target);
    if (element && !element.contains(event.target)) {
      listener(event);
    }
  };
  useEventListener(document, type, handler);
}
var __rest = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function keyInProvides(key) {
  const instance = vue.getCurrentInstance();
  return key in instance.provides;
}
function useParent(key) {
  if (!keyInProvides(key)) {
    return {
      index: null,
      parentProvider: null,
      bindParent: null
    };
  }
  const provider = vue.inject(key);
  const { childInstances, collect, clear: clear2 } = provider, parentProvider = __rest(provider, ["childInstances", "collect", "clear"]);
  const childInstance = vue.getCurrentInstance();
  const index = vue.computed(() => childInstances.indexOf(childInstance));
  const bindParent = (childProvider) => {
    vue.onMounted(() => {
      vue.nextTick().then(() => {
        collect(childInstance, childProvider);
      });
    });
    vue.onBeforeUnmount(() => {
      vue.nextTick().then(() => {
        clear2(childInstance, childProvider);
      });
    });
  };
  return {
    index,
    parentProvider,
    bindParent
  };
}
function flatVNodes(subTree) {
  const vNodes = [];
  const flat = (subTree2) => {
    if (subTree2 === null || subTree2 === void 0 ? void 0 : subTree2.component) {
      flat(subTree2 === null || subTree2 === void 0 ? void 0 : subTree2.component.subTree);
      return;
    }
    if (Array.isArray(subTree2 === null || subTree2 === void 0 ? void 0 : subTree2.children)) {
      subTree2.children.forEach((child) => {
        if (vue.isVNode(child)) {
          vNodes.push(child);
          flat(child);
        }
      });
    }
  };
  flat(subTree);
  return vNodes;
}
function useChildren(key) {
  const parentInstance = vue.getCurrentInstance();
  const childInstances = vue.reactive([]);
  const childProviders = [];
  const length = vue.computed(() => childInstances.length);
  const sortInstances = () => {
    const vNodes = flatVNodes(parentInstance.subTree);
    childInstances.sort((a, b) => {
      return vNodes.indexOf(a.vnode) - vNodes.indexOf(b.vnode);
    });
  };
  const collect = (childInstance, childProvider) => {
    childInstances.push(childInstance);
    childProviders.push(childProvider);
    sortInstances();
  };
  const clear2 = (childInstance, childProvider) => {
    removeItem(childInstances, childInstance);
    removeItem(childProviders, childProvider);
  };
  const bindChildren = (parentProvider) => {
    vue.provide(key, Object.assign({
      childInstances,
      collect,
      clear: clear2
    }, parentProvider));
  };
  return {
    length,
    childProviders,
    bindChildren
  };
}
function useVModel(props2, key, options = {}) {
  const vm = vue.getCurrentInstance();
  const { passive: passive2 = true, eventName, defaultValue, emit = vm === null || vm === void 0 ? void 0 : vm.emit } = options;
  const event = eventName !== null && eventName !== void 0 ? eventName : `update:${key.toString()}`;
  const getValue = () => props2[key] != null ? props2[key] : defaultValue;
  if (!passive2) {
    return vue.computed({
      get() {
        return getValue();
      },
      set(value) {
        emit(event, value);
      }
    });
  }
  const proxy = vue.ref(getValue());
  vue.watch(() => props2[key], () => {
    proxy.value = getValue();
  });
  vue.watch(() => proxy.value, (newValue) => {
    emit(event, newValue);
  });
  return proxy;
}
function asyncGeneratorStep$d(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error2) {
    reject(error2);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator$d(fn2) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn2.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep$d(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep$d(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
function _extends$n() {
  _extends$n = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$n.apply(this, arguments);
}
function pickProps(props2, propsKey) {
  return Array.isArray(propsKey) ? propsKey.reduce((pickedProps, key) => {
    pickedProps[key] = props2[key];
    return pickedProps;
  }, {}) : props2[propsKey];
}
function mount$1(component) {
  var app = vue.createApp(component);
  var host = document.createElement("div");
  document.body.appendChild(host);
  return {
    instance: app.mount(host),
    unmount() {
      app.unmount();
      document.body.removeChild(host);
    }
  };
}
function mountInstance(component, props2, eventListener) {
  if (props2 === void 0) {
    props2 = {};
  }
  if (eventListener === void 0) {
    eventListener = {};
  }
  var Host = {
    setup() {
      return () => vue.h(component, _extends$n({}, props2, eventListener));
    }
  };
  var {
    unmount: unmount2
  } = mount$1(Host);
  return {
    unmountInstance: unmount2
  };
}
function flatFragment(vNodes) {
  var result2 = [];
  vNodes.forEach((vNode) => {
    if (vNode.type === vue.Comment) {
      return;
    }
    if (vNode.type === vue.Fragment && isArray(vNode.children)) {
      vNode.children.forEach((item) => {
        result2.push(item);
      });
      return;
    }
    result2.push(vNode);
  });
  return result2;
}
function useValidation() {
  var errorMessage = vue.ref("");
  var validate = /* @__PURE__ */ function() {
    var _ref = _asyncToGenerator$d(function* (rules, value, apis) {
      if (!isArray(rules) || !rules.length) {
        return true;
      }
      var resArr = yield Promise.all(rules.map((rule) => rule(value, apis)));
      return !resArr.some((res) => {
        if (res !== true) {
          errorMessage.value = String(res);
          return true;
        }
        return false;
      });
    });
    return function validate2(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
  var resetValidation = () => {
    errorMessage.value = "";
  };
  var validateWithTrigger = /* @__PURE__ */ function() {
    var _ref2 = _asyncToGenerator$d(function* (validateTrigger, trigger, rules, value, apis) {
      if (validateTrigger.includes(trigger)) {
        (yield validate(rules, value, apis)) && (errorMessage.value = "");
      }
    });
    return function validateWithTrigger2(_x4, _x5, _x6, _x7, _x8) {
      return _ref2.apply(this, arguments);
    };
  }();
  return {
    errorMessage,
    validate,
    resetValidation,
    validateWithTrigger
  };
}
function useRouteListener(cb) {
  if (!inBrowser()) {
    return;
  }
  useEventListener(window, "hashchange", cb);
  useEventListener(window, "popstate", cb);
}
function useTeleport() {
  var disabled = vue.ref(false);
  vue.onActivated(() => {
    disabled.value = false;
  });
  vue.onDeactivated(() => {
    disabled.value = true;
  });
  return {
    disabled
  };
}
function createNamespace(name) {
  var namespace = "var";
  var componentName = namespace + "-" + name;
  var createBEM = (suffix) => {
    if (!suffix)
      return componentName;
    if (suffix[0] === "$") {
      return suffix.replace("$", namespace);
    }
    return suffix.startsWith("--") ? "" + componentName + suffix : componentName + "__" + suffix;
  };
  var classes2 = function() {
    for (var _len = arguments.length, classes3 = new Array(_len), _key = 0; _key < _len; _key++) {
      classes3[_key] = arguments[_key];
    }
    return classes3.map((className) => {
      if (isArray(className)) {
        var [condition, truthy, falsy = null] = className;
        return condition ? truthy : falsy;
      }
      return className;
    });
  };
  return {
    n: createBEM,
    classes: classes2
  };
}
function call(fn2) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  if (isArray(fn2)) {
    return fn2.map((f) => f(...args));
  }
  if (fn2) {
    return fn2(...args);
  }
}
function defineListenerProp(fallback) {
  return {
    type: [Function, Array],
    default: fallback
  };
}
function formatElevation(elevation2, defaultLevel) {
  if (elevation2 === false) {
    return null;
  }
  if (elevation2 === true && defaultLevel) {
    elevation2 = defaultLevel;
  }
  return "var-elevation--" + elevation2;
}
function _extends$m() {
  _extends$m = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$m.apply(this, arguments);
}
var {
  n: n$1h
} = createNamespace("ripple");
var ANIMATION_DURATION$1 = 250;
function setStyles(element) {
  var {
    zIndex,
    position
  } = window.getComputedStyle(element);
  element.style.overflow = "hidden";
  element.style.overflowX = "hidden";
  element.style.overflowY = "hidden";
  position === "static" && (element.style.position = "relative");
  zIndex === "auto" && (element.style.zIndex = "1");
}
function computeRippleStyles(element, event) {
  var {
    top: top2,
    left: left2
  } = element.getBoundingClientRect();
  var {
    clientWidth,
    clientHeight
  } = element;
  var radius = Math.sqrt(Math.pow(clientWidth, 2) + Math.pow(clientHeight, 2)) / 2;
  var size = radius * 2;
  var localX = event.touches[0].clientX - left2;
  var localY = event.touches[0].clientY - top2;
  var centerX = (clientWidth - radius * 2) / 2;
  var centerY = (clientHeight - radius * 2) / 2;
  var x = localX - radius;
  var y = localY - radius;
  return {
    x,
    y,
    centerX,
    centerY,
    size
  };
}
function createRipple(event) {
  var _ripple = this._ripple;
  _ripple.removeRipple();
  if (_ripple.disabled || _ripple.tasker || !Context.enableRipple) {
    return;
  }
  var task = () => {
    _ripple.tasker = null;
    var {
      x,
      y,
      centerX,
      centerY,
      size
    } = computeRippleStyles(this, event);
    var ripple2 = document.createElement("div");
    ripple2.classList.add(n$1h());
    ripple2.style.opacity = "0";
    ripple2.style.transform = "translate(" + x + "px, " + y + "px) scale3d(.3, .3, .3)";
    ripple2.style.width = size + "px";
    ripple2.style.height = size + "px";
    _ripple.color && (ripple2.style.backgroundColor = _ripple.color);
    ripple2.dataset.createdAt = String(performance.now());
    setStyles(this);
    this.appendChild(ripple2);
    window.setTimeout(() => {
      ripple2.style.transform = "translate(" + centerX + "px, " + centerY + "px) scale3d(1, 1, 1)";
      ripple2.style.opacity = ".25";
    }, 20);
  };
  _ripple.tasker = window.setTimeout(task, 30);
}
function removeRipple() {
  var _ripple = this._ripple;
  var task = () => {
    var ripples = this.querySelectorAll("." + n$1h());
    if (!ripples.length) {
      return;
    }
    var lastRipple = ripples[ripples.length - 1];
    var delay = ANIMATION_DURATION$1 - performance.now() + Number(lastRipple.dataset.createdAt);
    window.setTimeout(() => {
      lastRipple.style.opacity = "0";
      window.setTimeout(() => {
        var _lastRipple$parentNod;
        return (_lastRipple$parentNod = lastRipple.parentNode) == null ? void 0 : _lastRipple$parentNod.removeChild(lastRipple);
      }, ANIMATION_DURATION$1);
    }, delay);
  };
  _ripple.tasker ? window.setTimeout(task, 30) : task();
}
function forbidRippleTask() {
  if (!supportTouch() || !Context.enableRipple) {
    return;
  }
  var _ripple = this._ripple;
  _ripple.tasker && window.clearTimeout(_ripple.tasker);
  _ripple.tasker = null;
}
function mounted$2(el, binding) {
  var _binding$value;
  el._ripple = _extends$m({
    tasker: null
  }, (_binding$value = binding.value) != null ? _binding$value : {}, {
    removeRipple: removeRipple.bind(el)
  });
  el.addEventListener("touchstart", createRipple, {
    passive: true
  });
  el.addEventListener("touchmove", forbidRippleTask, {
    passive: true
  });
  el.addEventListener("dragstart", removeRipple, {
    passive: true
  });
  document.addEventListener("touchend", el._ripple.removeRipple, {
    passive: true
  });
  document.addEventListener("touchcancel", el._ripple.removeRipple, {
    passive: true
  });
}
function unmounted$1(el) {
  el.removeEventListener("touchstart", createRipple);
  el.removeEventListener("touchmove", forbidRippleTask);
  el.removeEventListener("dragstart", removeRipple);
  document.removeEventListener("touchend", el._ripple.removeRipple);
  document.removeEventListener("touchcancel", el._ripple.removeRipple);
}
function updated$2(el, binding) {
  var _binding$value2, _binding$value3, _el$_ripple, _el$_ripple2;
  var newBinding = {
    color: (_binding$value2 = binding.value) == null ? void 0 : _binding$value2.color,
    disabled: (_binding$value3 = binding.value) == null ? void 0 : _binding$value3.disabled
  };
  var diff2 = newBinding.color !== ((_el$_ripple = el._ripple) == null ? void 0 : _el$_ripple.color) || newBinding.disabled !== ((_el$_ripple2 = el._ripple) == null ? void 0 : _el$_ripple2.disabled);
  if (diff2) {
    var _el$_ripple3, _el$_ripple4;
    el._ripple = _extends$m({
      tasker: newBinding.disabled ? null : (_el$_ripple3 = el._ripple) == null ? void 0 : _el$_ripple3.tasker,
      removeRipple: (_el$_ripple4 = el._ripple) == null ? void 0 : _el$_ripple4.removeRipple
    }, newBinding);
  }
}
var Ripple = {
  mounted: mounted$2,
  unmounted: unmounted$1,
  updated: updated$2,
  install(app) {
    app.directive("ripple", this);
  }
};
var _RippleComponent = Ripple;
const Ripple$1 = Ripple;
function positionValidator$4(position) {
  return ["top", "bottom", "right", "left", "center"].includes(position);
}
var props$19 = {
  show: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: "center",
    validator: positionValidator$4
  },
  transition: {
    type: String
  },
  overlay: {
    type: Boolean,
    default: true
  },
  overlayClass: {
    type: String
  },
  overlayStyle: {
    type: Object
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  defaultStyle: {
    type: Boolean,
    default: true
  },
  teleport: {
    type: String
  },
  onOpen: defineListenerProp(),
  onOpened: defineListenerProp(),
  onClose: defineListenerProp(),
  onClosed: defineListenerProp(),
  onClickOverlay: defineListenerProp(),
  "onUpdate:show": defineListenerProp(),
  // internal for Dialog
  onRouteChange: defineListenerProp()
};
function resolveLock() {
  var lockCounts = Object.keys(Context.locks).length;
  lockCounts <= 0 ? document.body.classList.remove("var--lock") : document.body.classList.add("var--lock");
}
function addLock(uid) {
  Context.locks[uid] = 1;
  resolveLock();
}
function releaseLock(uid) {
  delete Context.locks[uid];
  resolveLock();
}
function useLock(source, useSource) {
  var {
    uid
  } = vue.getCurrentInstance();
  if (useSource) {
    vue.watch(useSource, (newValue) => {
      if (newValue === false) {
        releaseLock(uid);
      } else if (newValue === true && source() === true) {
        addLock(uid);
      }
    });
  }
  vue.watch(source, (newValue) => {
    if (useSource && useSource() === false) {
      return;
    }
    if (newValue === true) {
      addLock(uid);
    } else {
      releaseLock(uid);
    }
  });
  vue.onBeforeMount(() => {
    if (useSource && useSource() === false) {
      return;
    }
    if (source() === true) {
      addLock(uid);
    }
  });
  vue.onUnmounted(() => {
    if (useSource && useSource() === false) {
      return;
    }
    if (source() === true) {
      releaseLock(uid);
    }
  });
  vue.onActivated(() => {
    if (useSource && useSource() === false) {
      return;
    }
    if (source() === true) {
      addLock(uid);
    }
  });
  vue.onDeactivated(() => {
    if (useSource && useSource() === false) {
      return;
    }
    if (source() === true) {
      releaseLock(uid);
    }
  });
}
function useZIndex(source, count) {
  var zIndex = vue.ref(Context.zIndex);
  vue.watch(source, (newValue) => {
    if (newValue) {
      Context.zIndex += count;
      zIndex.value = Context.zIndex;
    }
  }, {
    immediate: true
  });
  return {
    zIndex
  };
}
function _extends$l() {
  _extends$l = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$l.apply(this, arguments);
}
function _isSlot$3(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
var {
  n: n$1g,
  classes: classes$13
} = createNamespace("popup");
const Popup = vue.defineComponent({
  name: "VarPopup",
  inheritAttrs: false,
  props: props$19,
  setup(props2, _ref) {
    var {
      slots,
      attrs
    } = _ref;
    var {
      zIndex
    } = useZIndex(() => props2.show, 3);
    var {
      disabled
    } = useTeleport();
    var hidePopup = () => {
      var {
        closeOnClickOverlay,
        onClickOverlay
      } = props2;
      call(onClickOverlay);
      if (!closeOnClickOverlay) {
        return;
      }
      call(props2["onUpdate:show"], false);
    };
    useLock(() => props2.show, () => props2.lockScroll);
    vue.watch(() => props2.show, (newValue) => {
      newValue ? call(props2.onOpen) : call(props2.onClose);
    });
    useRouteListener(() => call(props2.onRouteChange));
    var renderOverlay = () => {
      var {
        overlayClass = "",
        overlayStyle
      } = props2;
      return vue.createVNode("div", {
        "class": classes$13(n$1g("overlay"), overlayClass),
        "style": _extends$l({
          zIndex: zIndex.value - 1
        }, overlayStyle),
        "onClick": hidePopup
      }, null);
    };
    var renderContent = () => {
      return vue.createVNode("div", vue.mergeProps({
        "class": classes$13(n$1g("content"), n$1g("--" + props2.position), [props2.defaultStyle, n$1g("--content-background-color")], [props2.defaultStyle, n$1g("$-elevation--3")]),
        "style": {
          zIndex: zIndex.value
        }
      }, attrs), [call(slots.default)]);
    };
    var renderPopup = () => {
      var {
        onOpened,
        onClosed,
        show,
        overlay: overlay2,
        transition,
        position
      } = props2;
      return vue.createVNode(vue.Transition, {
        "name": n$1g("$-fade"),
        "onAfterEnter": onOpened,
        "onAfterLeave": onClosed
      }, {
        default: () => [vue.withDirectives(vue.createVNode("div", {
          "class": classes$13(n$1g("$--box"), n$1g()),
          "style": {
            zIndex: zIndex.value - 2
          }
        }, [overlay2 && renderOverlay(), vue.createVNode(vue.Transition, {
          "name": transition || n$1g("$-pop-" + position)
        }, {
          default: () => [show && renderContent()]
        })]), [[vue.vShow, show]])]
      });
    };
    return () => {
      var {
        teleport
      } = props2;
      if (teleport) {
        var _slot;
        return vue.createVNode(vue.Teleport, {
          "to": teleport,
          "disabled": disabled.value
        }, _isSlot$3(_slot = renderPopup()) ? _slot : {
          default: () => [_slot]
        });
      }
      return renderPopup();
    };
  }
});
Popup.install = function(app) {
  app.component(Popup.name, Popup);
};
var _PopupComponent = Popup;
var props$18 = {
  name: {
    type: String
  },
  size: {
    type: [Number, String]
  },
  color: {
    type: String
  },
  namespace: {
    type: String,
    default: "var-icon"
  },
  transition: {
    type: [Number, String],
    default: 0
  },
  animationClass: {
    type: String
  },
  onClick: defineListenerProp()
};
function asyncGeneratorStep$c(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error2) {
    reject(error2);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator$c(fn2) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn2.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep$c(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep$c(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
var {
  n: n$1f,
  classes: classes$12
} = createNamespace("icon");
function __render__$1f(_ctx, _cache) {
  return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.isURL(_ctx.name) ? "img" : "i"), {
    class: vue.normalizeClass(_ctx.classes(_ctx.n(), [_ctx.namespace !== _ctx.n(), _ctx.namespace], _ctx.namespace + "--set", [_ctx.isURL(_ctx.name), _ctx.n("image"), _ctx.namespace + "-" + _ctx.nextName], [_ctx.animateInProgress, _ctx.animationClass == null ? _ctx.n("--shrinking") : _ctx.animationClass])),
    style: vue.normalizeStyle({
      color: _ctx.color,
      "transition-duration": _ctx.toNumber(_ctx.transition) + "ms",
      width: _ctx.isURL(_ctx.name) ? _ctx.toSizeUnit(_ctx.size) : null,
      height: _ctx.isURL(_ctx.name) ? _ctx.toSizeUnit(_ctx.size) : null,
      fontSize: _ctx.toSizeUnit(_ctx.size)
    }),
    src: _ctx.isURL(_ctx.name) ? _ctx.nextName : null,
    onClick: _ctx.onClick
  }, null, 8, ["class", "style", "src", "onClick"]);
}
var __sfc__$1g = vue.defineComponent({
  name: "VarIcon",
  props: props$18,
  setup(props2) {
    var nextName = vue.ref("");
    var animateInProgress = vue.ref(false);
    var handleNameChange = /* @__PURE__ */ function() {
      var _ref = _asyncToGenerator$c(function* (newName, oldName) {
        var {
          transition
        } = props2;
        if (oldName == null || toNumber(transition) === 0) {
          nextName.value = newName;
          return;
        }
        animateInProgress.value = true;
        yield vue.nextTick();
        setTimeout(() => {
          if (oldName != null) {
            nextName.value = newName;
          }
          animateInProgress.value = false;
        }, toNumber(transition));
      });
      return function handleNameChange2(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();
    vue.watch(() => props2.name, handleNameChange, {
      immediate: true
    });
    return {
      n: n$1f,
      classes: classes$12,
      nextName,
      animateInProgress,
      isURL,
      toNumber,
      toSizeUnit
    };
  }
});
__sfc__$1g.render = __render__$1f;
const Icon = __sfc__$1g;
Icon.install = function(app) {
  app.component(Icon.name, Icon);
};
var _IconComponent = Icon;
function _extends$k() {
  _extends$k = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$k.apply(this, arguments);
}
var props$17 = _extends$k({
  show: {
    type: Boolean,
    default: false
  },
  actions: {
    type: Array,
    default: () => []
  },
  title: {
    type: String
  },
  closeOnClickAction: {
    type: Boolean,
    default: true
  },
  onSelect: defineListenerProp(),
  "onUpdate:show": defineListenerProp()
}, pickProps(props$19, [
  "overlay",
  "overlayClass",
  "overlayStyle",
  "lockScroll",
  "closeOnClickOverlay",
  "teleport",
  "onOpen",
  "onClose",
  "onOpened",
  "onClosed",
  "onClickOverlay",
  // internal for function call closes the dialog
  "onRouteChange"
]));
const zhCN = {
  // Dialog
  dialogTitle: "提示",
  dialogConfirmButtonText: "确认",
  dialogCancelButtonText: "取消",
  // ActionSheet
  actionSheetTitle: "请选择",
  // List
  listLoadingText: "加载中",
  listFinishedText: "没有更多了",
  listErrorText: "加载失败",
  // Picker
  pickerTitle: "请选择",
  pickerConfirmButtonText: "确认",
  pickerCancelButtonText: "取消",
  // date-picker
  datePickerMonthDict: {
    "01": {
      name: "一月",
      abbr: "一月"
    },
    "02": {
      name: "二月",
      abbr: "二月"
    },
    "03": {
      name: "三月",
      abbr: "三月"
    },
    "04": {
      name: "四月",
      abbr: "四月"
    },
    "05": {
      name: "五月",
      abbr: "五月"
    },
    "06": {
      name: "六月",
      abbr: "六月"
    },
    "07": {
      name: "七月",
      abbr: "七月"
    },
    "08": {
      name: "八月",
      abbr: "八月"
    },
    "09": {
      name: "九月",
      abbr: "九月"
    },
    "10": {
      name: "十月",
      abbr: "十月"
    },
    "11": {
      name: "十一月",
      abbr: "十一月"
    },
    "12": {
      name: "十二月",
      abbr: "十二月"
    }
  },
  datePickerWeekDict: {
    "0": {
      name: "星期日",
      abbr: "日"
    },
    "1": {
      name: "星期一",
      abbr: "一"
    },
    "2": {
      name: "星期二",
      abbr: "二"
    },
    "3": {
      name: "星期三",
      abbr: "三"
    },
    "4": {
      name: "星期四",
      abbr: "四"
    },
    "5": {
      name: "星期五",
      abbr: "五"
    },
    "6": {
      name: "星期六",
      abbr: "六"
    }
  },
  datePickerSelected: "个被选择",
  // pagination
  paginationItem: "条",
  paginationPage: "页",
  paginationJump: "前往"
};
const enUS = {
  // Dialog
  dialogTitle: "Hint",
  dialogConfirmButtonText: "Confirm",
  dialogCancelButtonText: "Cancel",
  // ActionSheet
  actionSheetTitle: "Select One",
  // List
  listLoadingText: "Loading",
  listFinishedText: "No more",
  listErrorText: "Load fail",
  // Picker
  pickerTitle: "Pick it",
  pickerConfirmButtonText: "Confirm",
  pickerCancelButtonText: "Cancel",
  // date-picker
  datePickerMonthDict: {
    "01": {
      name: "January",
      abbr: "JAN"
    },
    "02": {
      name: "February",
      abbr: "FEB"
    },
    "03": {
      name: "March",
      abbr: "MAR"
    },
    "04": {
      name: "April",
      abbr: "APR"
    },
    "05": {
      name: "May",
      abbr: "MAY"
    },
    "06": {
      name: "June",
      abbr: "JUN"
    },
    "07": {
      name: "July",
      abbr: "JUL"
    },
    "08": {
      name: "August",
      abbr: "AUG"
    },
    "09": {
      name: "September",
      abbr: "SEP"
    },
    "10": {
      name: "October",
      abbr: "OCT"
    },
    "11": {
      name: "November",
      abbr: "NOV"
    },
    "12": {
      name: "December",
      abbr: "DEC"
    }
  },
  datePickerWeekDict: {
    "0": {
      name: "Sunday",
      abbr: "S"
    },
    "1": {
      name: "Monday",
      abbr: "M"
    },
    "2": {
      name: "Tuesday",
      abbr: "T"
    },
    "3": {
      name: "Wednesday",
      abbr: "W"
    },
    "4": {
      name: "Thursday",
      abbr: "T"
    },
    "5": {
      name: "Friday",
      abbr: "F"
    },
    "6": {
      name: "Saturday",
      abbr: "S"
    }
  },
  datePickerSelected: " selected",
  // pagination
  paginationItem: "",
  paginationPage: "page",
  paginationJump: "Go to"
};
function _extends$j() {
  _extends$j = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$j.apply(this, arguments);
}
function useLocale() {
  var packs2 = {};
  var pack2 = vue.ref({});
  var add2 = (lang, pack3) => {
    pack3.lang = lang;
    packs2[lang] = pack3;
  };
  var use2 = (lang) => {
    if (!packs2[lang]) {
      console.warn("The " + lang + " does not exist. You can mount a language package using the add method");
      return {};
    }
    pack2.value = packs2[lang];
  };
  var merge2 = (lang, pack3) => {
    if (!packs2[lang]) {
      console.warn("The " + lang + " does not exist. You can mount a language package using the add method");
      return;
    }
    packs2[lang] = _extends$j({}, packs2[lang], pack3);
    use2(lang);
  };
  return {
    packs: packs2,
    pack: pack2,
    add: add2,
    use: use2,
    merge: merge2
  };
}
var {
  packs,
  pack,
  add: add$2,
  use,
  merge
} = useLocale();
add$2("zh-CN", zhCN);
use("zh-CN");
var _LocaleComponent = {
  zhCN,
  enUS,
  packs,
  pack,
  add: add$2,
  use,
  merge,
  useLocale
};
const Locale = {
  zhCN,
  enUS,
  packs,
  pack,
  add: add$2,
  use,
  merge,
  useLocale
};
var {
  n: n$1e,
  classes: classes$11
} = createNamespace("action-sheet");
var _hoisted_1$r = ["onClick"];
function __render__$1e(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  var _component_var_popup = vue.resolveComponent("var-popup");
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.openBlock(), vue.createBlock(_component_var_popup, vue.mergeProps({
    class: _ctx.n("popup-radius"),
    position: "bottom",
    overlay: _ctx.overlay,
    "overlay-class": _ctx.overlayClass,
    "overlay-style": _ctx.overlayStyle,
    "lock-scroll": _ctx.lockScroll,
    "close-on-click-overlay": _ctx.closeOnClickOverlay,
    teleport: _ctx.teleport,
    show: _ctx.popupShow
  }, {
    "onUpdate:show": _ctx.handlePopupUpdateShow
  }, {
    onOpen: _ctx.onOpen,
    onClose: _ctx.onClose,
    onClosed: _ctx.onClosed,
    onOpened: _ctx.onOpened,
    onRouteChange: _ctx.onRouteChange
  }), {
    default: vue.withCtx(() => [vue.createElementVNode(
      "div",
      vue.mergeProps({
        class: _ctx.classes(_ctx.n(), _ctx.n("$--box"))
      }, _ctx.$attrs),
      [vue.renderSlot(_ctx.$slots, "title", {}, () => [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("title"))
        },
        vue.toDisplayString(_ctx.dt(_ctx.title, _ctx.pack.actionSheetTitle)),
        3
        /* TEXT, CLASS */
      )]), vue.renderSlot(_ctx.$slots, "actions", {}, () => [(vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList(_ctx.actions, (action) => {
          return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
            class: vue.normalizeClass(_ctx.classes(_ctx.n("action-item"), action.className, [action.disabled, _ctx.n("--disabled")])),
            key: action.name,
            style: vue.normalizeStyle({
              color: action.color
            }),
            onClick: ($event) => _ctx.handleSelect(action)
          }, [action.icon ? (vue.openBlock(), vue.createBlock(_component_var_icon, {
            key: 0,
            class: vue.normalizeClass(_ctx.n("action-icon")),
            "var-action-sheet-cover": "",
            name: action.icon,
            size: action.iconSize
          }, null, 8, ["class", "name", "size"])) : vue.createCommentVNode("v-if", true), vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(_ctx.n("action-name"))
            },
            vue.toDisplayString(action.name),
            3
            /* TEXT, CLASS */
          )], 14, _hoisted_1$r)), [[_directive_ripple, {
            disabled: action.disabled
          }]]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))])],
      16
      /* FULL_PROPS */
    )]),
    _: 3
    /* FORWARDED */
  }, 16, ["class", "overlay", "overlay-class", "overlay-style", "lock-scroll", "close-on-click-overlay", "teleport", "show", "onOpen", "onClose", "onClosed", "onOpened", "onRouteChange"]);
}
var __sfc__$1f = vue.defineComponent({
  name: "VarActionSheet",
  directives: {
    Ripple: Ripple$1
  },
  components: {
    VarPopup: Popup,
    VarIcon: Icon
  },
  inheritAttrs: false,
  props: props$17,
  setup(props2) {
    var popupShow = vue.ref(false);
    var handleSelect = (action) => {
      if (action.disabled) {
        return;
      }
      var {
        closeOnClickAction,
        onSelect
      } = props2;
      call(onSelect, action);
      closeOnClickAction && call(props2["onUpdate:show"], false);
    };
    var handlePopupUpdateShow = (value) => call(props2["onUpdate:show"], value);
    vue.watch(() => props2.show, (newValue) => {
      popupShow.value = newValue;
    }, {
      immediate: true
    });
    return {
      n: n$1e,
      classes: classes$11,
      handlePopupUpdateShow,
      popupShow,
      pack,
      dt,
      handleSelect
    };
  }
});
__sfc__$1f.render = __render__$1e;
const VarActionSheet = __sfc__$1f;
function _extends$i() {
  _extends$i = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$i.apply(this, arguments);
}
var singletonOptions$3;
var defaultOptions$3 = {};
function normalizeOptions$3(options) {
  if (options === void 0) {
    options = {};
  }
  return _extends$i({}, defaultOptions$3, options);
}
function ActionSheet(options) {
  if (!inBrowser()) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    ActionSheet.close();
    var reactiveActionSheetOptions = vue.reactive(normalizeOptions$3(options));
    reactiveActionSheetOptions.teleport = "body";
    singletonOptions$3 = reactiveActionSheetOptions;
    var {
      unmountInstance
    } = mountInstance(VarActionSheet, reactiveActionSheetOptions, {
      onSelect: (action) => {
        call(reactiveActionSheetOptions.onSelect, action);
        resolve(action);
      },
      onClose: () => {
        call(reactiveActionSheetOptions.onClose);
        resolve("close");
      },
      onClosed: () => {
        call(reactiveActionSheetOptions.onClosed);
        unmountInstance();
        singletonOptions$3 === reactiveActionSheetOptions && (singletonOptions$3 = null);
      },
      onRouteChange: () => {
        unmountInstance();
        singletonOptions$3 === reactiveActionSheetOptions && (singletonOptions$3 = null);
      },
      "onUpdate:show": (value) => {
        reactiveActionSheetOptions.show = value;
      }
    });
    reactiveActionSheetOptions.show = true;
  });
}
ActionSheet.setDefaultOptions = function(options) {
  defaultOptions$3 = options;
};
ActionSheet.resetDefaultOptions = function() {
  defaultOptions$3 = {};
};
ActionSheet.close = function() {
  if (singletonOptions$3 != null) {
    var prevSingletonOptions = singletonOptions$3;
    singletonOptions$3 = null;
    vue.nextTick().then(() => {
      prevSingletonOptions.show = false;
    });
  }
};
ActionSheet.Component = VarActionSheet;
VarActionSheet.install = function(app) {
  app.component(VarActionSheet.name, VarActionSheet);
};
ActionSheet.install = function(app) {
  app.component(VarActionSheet.name, VarActionSheet);
};
var _ActionSheetComponent = VarActionSheet;
function positionValidator$3(position) {
  var validPositions = ["left", "center", "right"];
  return validPositions.includes(position);
}
var props$16 = {
  color: {
    type: String
  },
  textColor: {
    type: String
  },
  title: {
    type: String
  },
  titlePosition: {
    type: String,
    default: "left",
    validator: positionValidator$3
  },
  elevation: {
    type: [Boolean, String, Number],
    default: true
  },
  round: {
    type: Boolean,
    default: false
  },
  image: {
    type: String
  },
  imageLinearGradient: {
    type: String
  },
  safeAreaTop: {
    type: Boolean,
    default: false
  }
};
var {
  n: n$1d,
  classes: classes$10
} = createNamespace("app-bar");
function __render__$1d(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"), [_ctx.safeAreaTop, _ctx.n("--safe-area-top")], [_ctx.round, _ctx.n("--round")], _ctx.formatElevation(_ctx.elevation, 3))),
      style: vue.normalizeStyle(_ctx.rootStyles)
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("toolbar"))
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("left"))
        },
        [vue.renderSlot(_ctx.$slots, "left"), _ctx.titlePosition === "left" ? (vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: 0,
            class: vue.normalizeClass(_ctx.n("title")),
            style: vue.normalizeStyle({
              paddingLeft: _ctx.paddingLeft
            })
          },
          [vue.renderSlot(_ctx.$slots, "default", {}, () => [vue.createTextVNode(
            vue.toDisplayString(_ctx.title),
            1
            /* TEXT */
          )])],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true)],
        2
        /* CLASS */
      ), _ctx.titlePosition === "center" ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          class: vue.normalizeClass(_ctx.n("title"))
        },
        [vue.renderSlot(_ctx.$slots, "default", {}, () => [vue.createTextVNode(
          vue.toDisplayString(_ctx.title),
          1
          /* TEXT */
        )])],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true), vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("right"))
        },
        [_ctx.titlePosition === "right" ? (vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: 0,
            class: vue.normalizeClass(_ctx.n("title")),
            style: vue.normalizeStyle({
              paddingRight: _ctx.paddingRight
            })
          },
          [vue.renderSlot(_ctx.$slots, "default", {}, () => [vue.createTextVNode(
            vue.toDisplayString(_ctx.title),
            1
            /* TEXT */
          )])],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true), vue.renderSlot(_ctx.$slots, "right")],
        2
        /* CLASS */
      )],
      2
      /* CLASS */
    ), vue.renderSlot(_ctx.$slots, "content")],
    6
    /* CLASS, STYLE */
  );
}
var __sfc__$1e = vue.defineComponent({
  name: "VarAppBar",
  props: props$16,
  setup(props2, _ref) {
    var {
      slots
    } = _ref;
    var paddingLeft = vue.ref();
    var paddingRight = vue.ref();
    var computePadding = () => {
      paddingLeft.value = slots.left ? 0 : void 0;
      paddingRight.value = slots.right ? 0 : void 0;
    };
    var rootStyles = vue.computed(() => {
      var {
        image: image2,
        color,
        textColor,
        imageLinearGradient
      } = props2;
      if (image2 != null) {
        var gradient = imageLinearGradient ? "linear-gradient(" + imageLinearGradient + "), " : "";
        return {
          "background-image": gradient + "url(" + image2 + ")",
          "background-position": "center center",
          "background-size": "cover"
        };
      }
      return {
        background: color,
        color: textColor
      };
    });
    useMounted(computePadding);
    vue.onUpdated(computePadding);
    return {
      n: n$1d,
      classes: classes$10,
      formatElevation,
      rootStyles,
      paddingLeft,
      paddingRight
    };
  }
});
__sfc__$1e.render = __render__$1d;
const AppBar = __sfc__$1e;
AppBar.install = function(app) {
  app.component(AppBar.name, AppBar);
};
var _AppBarComponent = AppBar;
function asyncGeneratorStep$b(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error2) {
    reject(error2);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator$b(fn2) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn2.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep$b(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep$b(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
function _extends$h() {
  _extends$h = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$h.apply(this, arguments);
}
var BACKGROUND_IMAGE_ARG_NAME = "background-image";
var LAZY_LOADING = "lazy-loading";
var LAZY_ERROR = "lazy-error";
var LAZY_ATTEMPT = "lazy-attempt";
var EVENTS = ["scroll", "wheel", "mousewheel", "resize", "animationend", "transitionend", "touchmove"];
var PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
var lazyElements = [];
var listenTargets = [];
var imageCache = createCache(100);
var defaultLazyOptions = {
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
    el.setAttribute("src", src);
  }
}
function setLoading(el) {
  el._lazy.loading && setSRC(el, el._lazy.loading);
  checkAll();
}
function setError(el) {
  el._lazy.error && setSRC(el, el._lazy.error);
  el._lazy.state = "error";
  clear(el);
  checkAll();
}
function setSuccess(el, attemptSRC) {
  setSRC(el, attemptSRC);
  el._lazy.state = "success";
  clear(el);
  checkAll();
}
function bindEvents(listenTarget) {
  var _defaultLazyOptions$e;
  if (listenTargets.includes(listenTarget)) {
    return;
  }
  listenTargets.push(listenTarget);
  (_defaultLazyOptions$e = defaultLazyOptions.events) == null ? void 0 : _defaultLazyOptions$e.forEach((event) => {
    listenTarget.addEventListener(event, checkAllWithThrottle, {
      passive: true
    });
  });
}
function unbindEvents() {
  listenTargets.forEach((listenTarget) => {
    var _defaultLazyOptions$e2;
    (_defaultLazyOptions$e2 = defaultLazyOptions.events) == null ? void 0 : _defaultLazyOptions$e2.forEach((event) => {
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
  el._lazy = _extends$h({
    src: binding.value,
    arg: binding.arg,
    currentAttempt: 0,
    state: "pending",
    attemptLock: false
  }, lazyOptions);
  setSRC(el, PIXEL);
  call(defaultLazyOptions.filter, el._lazy);
}
function createImage(el, attemptSRC) {
  var image2 = new Image();
  image2.src = attemptSRC;
  el._lazy.preloadImage = image2;
  image2.addEventListener("load", () => {
    el._lazy.attemptLock = false;
    imageCache.add(attemptSRC);
    setSuccess(el, attemptSRC);
  });
  image2.addEventListener("error", () => {
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
  _check = _asyncToGenerator$b(function* (el) {
    (yield inViewport(el)) && attemptLoad(el);
  });
  return _check.apply(this, arguments);
}
function checkAll() {
  lazyElements.forEach((el) => check(el));
}
function add$1(_x2) {
  return _add.apply(this, arguments);
}
function _add() {
  _add = _asyncToGenerator$b(function* (el) {
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
function mounted$1(_x3, _x4) {
  return _mounted.apply(this, arguments);
}
function _mounted() {
  _mounted = _asyncToGenerator$b(function* (el, binding) {
    createLazy(el, binding);
    yield add$1(el);
  });
  return _mounted.apply(this, arguments);
}
function updated$1(_x5, _x6) {
  return _updated.apply(this, arguments);
}
function _updated() {
  _updated = _asyncToGenerator$b(function* (el, binding) {
    if (!diff(el, binding)) {
      lazyElements.includes(el) && (yield check(el));
      return;
    }
    yield mounted$1(el, binding);
  });
  return _updated.apply(this, arguments);
}
function mergeLazyOptions(lazyOptions) {
  if (lazyOptions === void 0) {
    lazyOptions = {};
  }
  var {
    events,
    loading: loading2,
    error: error2,
    attempt,
    throttleWait,
    filter
  } = lazyOptions;
  defaultLazyOptions.events = events != null ? events : defaultLazyOptions.events;
  defaultLazyOptions.loading = loading2 != null ? loading2 : defaultLazyOptions.loading;
  defaultLazyOptions.error = error2 != null ? error2 : defaultLazyOptions.error;
  defaultLazyOptions.attempt = attempt != null ? attempt : defaultLazyOptions.attempt;
  defaultLazyOptions.throttleWait = throttleWait != null ? throttleWait : defaultLazyOptions.throttleWait;
  defaultLazyOptions.filter = filter;
}
var Lazy = {
  mounted: mounted$1,
  unmounted: clear,
  updated: updated$1,
  install(app, lazyOptions) {
    mergeLazyOptions(lazyOptions);
    checkAllWithThrottle = throttle(checkAll, defaultLazyOptions.throttleWait);
    app.directive("lazy", this);
  }
};
var _LazyComponent = Lazy;
const Lazy$1 = Lazy;
function fitValidator$2(fit) {
  return ["fill", "contain", "cover", "none", "scale-down"].includes(fit);
}
var internalSizeValidator$1 = (size) => ["mini", "small", "normal", "large"].includes(size);
function sizeValidator$5(size) {
  return internalSizeValidator$1(size) || isNumber(size) || isString(size);
}
var props$15 = {
  round: {
    type: Boolean,
    default: true
  },
  size: {
    type: [String, Number],
    validator: sizeValidator$5,
    default: "normal"
  },
  color: {
    type: String
  },
  src: {
    type: String
  },
  fit: {
    type: String,
    validator: fitValidator$2,
    default: "cover"
  },
  bordered: {
    type: Boolean,
    default: false
  },
  borderColor: {
    type: String
  },
  loading: {
    type: String
  },
  error: {
    type: String
  },
  lazy: {
    type: Boolean,
    default: false
  },
  onClick: defineListenerProp(),
  onLoad: defineListenerProp(),
  onError: defineListenerProp()
};
var {
  n: n$1c,
  classes: classes$$
} = createNamespace("avatar");
var _hoisted_1$q = ["src", "lazy-loading", "lazy-error"];
var _hoisted_2$d = ["src"];
function __render__$1c(_ctx, _cache) {
  var _directive_lazy = vue.resolveDirective("lazy");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      ref: "avatarElement",
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"), [_ctx.internalSizeValidator(_ctx.size), _ctx.n("--" + _ctx.size)], [_ctx.round, _ctx.n("--round")], [_ctx.bordered, _ctx.n("--bordered")])),
      style: vue.normalizeStyle({
        width: !_ctx.internalSizeValidator(_ctx.size) ? _ctx.toSizeUnit(_ctx.size) : void 0,
        height: !_ctx.internalSizeValidator(_ctx.size) ? _ctx.toSizeUnit(_ctx.size) : void 0,
        borderColor: _ctx.borderColor,
        backgroundColor: _ctx.color
      }),
      onClick: _cache[3] || (_cache[3] = function() {
        return _ctx.handleClick && _ctx.handleClick(...arguments);
      })
    },
    [_ctx.src ? (vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      {
        key: 0
      },
      [_ctx.lazy ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("img", {
        key: 0,
        class: vue.normalizeClass(_ctx.n("image")),
        src: _ctx.src,
        style: vue.normalizeStyle({
          objectFit: _ctx.fit
        }),
        "lazy-loading": _ctx.loading,
        "lazy-error": _ctx.error,
        onLoad: _cache[0] || (_cache[0] = function() {
          return _ctx.handleLoad && _ctx.handleLoad(...arguments);
        })
      }, null, 46, _hoisted_1$q)), [[_directive_lazy, _ctx.src]]) : (vue.openBlock(), vue.createElementBlock("img", {
        key: 1,
        class: vue.normalizeClass(_ctx.n("image")),
        src: _ctx.src,
        style: vue.normalizeStyle({
          objectFit: _ctx.fit
        }),
        onLoad: _cache[1] || (_cache[1] = function() {
          return _ctx.handleLoad && _ctx.handleLoad(...arguments);
        }),
        onError: _cache[2] || (_cache[2] = function() {
          return _ctx.handleError && _ctx.handleError(...arguments);
        })
      }, null, 46, _hoisted_2$d))],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    )) : (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 1,
        ref: "textElement",
        class: vue.normalizeClass(_ctx.n("text")),
        style: vue.normalizeStyle({
          transform: "scale(" + _ctx.scale + ")"
        })
      },
      [vue.renderSlot(_ctx.$slots, "default")],
      6
      /* CLASS, STYLE */
    ))],
    6
    /* CLASS, STYLE */
  );
}
var __sfc__$1d = vue.defineComponent({
  name: "VarAvatar",
  directives: {
    Lazy: Lazy$1
  },
  props: props$15,
  setup(props2) {
    var avatarElement = vue.ref(null);
    var textElement = vue.ref(null);
    var scale = vue.ref(1);
    var getScale = () => {
      if (!avatarElement.value || !textElement.value) {
        scale.value = 1;
        return;
      }
      var avatarElementWidth = avatarElement.value.offsetWidth;
      var textElementWidth = textElement.value.offsetWidth;
      if (avatarElementWidth > textElementWidth) {
        scale.value = 1;
      } else {
        scale.value = avatarElementWidth / textElementWidth;
      }
    };
    var handleLoad = (e) => {
      var el = e.currentTarget;
      var {
        lazy,
        onLoad,
        onError
      } = props2;
      if (lazy) {
        el._lazy.state === "success" && call(onLoad, e);
        el._lazy.state === "error" && call(onError, e);
      } else {
        call(onLoad, e);
      }
    };
    var handleError = (e) => {
      call(props2.onError, e);
    };
    var handleClick = (e) => {
      call(props2.onClick, e);
    };
    useMounted(getScale);
    vue.onUpdated(getScale);
    return {
      internalSizeValidator: internalSizeValidator$1,
      sizeValidator: sizeValidator$5,
      toSizeUnit,
      n: n$1c,
      classes: classes$$,
      avatarElement,
      textElement,
      scale,
      handleLoad,
      handleError,
      handleClick
    };
  }
});
__sfc__$1d.render = __render__$1c;
const Avatar = __sfc__$1d;
Avatar.install = function(app) {
  app.component(Avatar.name, Avatar);
};
var _AvatarComponent = Avatar;
var props$14 = {
  offset: {
    type: [Number, String]
  },
  vertical: {
    type: Boolean,
    default: false
  }
};
var {
  n: n$1b,
  classes: classes$_
} = createNamespace("avatar-group");
function __render__$1b(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), [_ctx.vertical, _ctx.n("--column"), _ctx.n("--row")])),
      style: vue.normalizeStyle(_ctx.rootStyles)
    },
    [vue.renderSlot(_ctx.$slots, "default")],
    6
    /* CLASS, STYLE */
  );
}
var __sfc__$1c = vue.defineComponent({
  name: "VarAvatarGroup",
  props: props$14,
  setup(props2) {
    var rootStyles = vue.computed(() => {
      if (props2.offset == null) {
        return {};
      }
      return {
        "--avatar-group-offset": toSizeUnit(props2.offset)
      };
    });
    return {
      n: n$1b,
      classes: classes$_,
      toSizeUnit,
      rootStyles
    };
  }
});
__sfc__$1c.render = __render__$1b;
const AvatarGroup = __sfc__$1c;
AvatarGroup.install = function(app) {
  app.component(AvatarGroup.name, AvatarGroup);
};
var _AvatarGroupComponent = AvatarGroup;
function typeValidator$a(type) {
  return ["circle", "wave", "cube", "rect", "disappear"].includes(type);
}
function sizeValidator$4(size) {
  return ["normal", "mini", "small", "large"].includes(size);
}
var props$13 = {
  type: {
    type: String,
    default: "circle",
    validator: typeValidator$a
  },
  radius: {
    type: [String, Number]
  },
  size: {
    type: String,
    default: "normal",
    validator: sizeValidator$4
  },
  color: {
    type: String
  },
  description: {
    type: String
  },
  loading: {
    type: Boolean,
    default: false
  }
};
var {
  n: n$1a,
  classes: classes$Z
} = createNamespace("loading");
var _withScopeId$6 = (n2) => (vue.pushScopeId(""), n2 = n2(), vue.popScopeId(), n2);
var _hoisted_1$p = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ vue.createElementVNode(
  "svg",
  {
    viewBox: "25 25 50 50"
  },
  [/* @__PURE__ */ vue.createElementVNode("circle", {
    cx: "50",
    cy: "50",
    r: "20",
    fill: "none"
  })],
  -1
  /* HOISTED */
));
var _hoisted_2$c = [_hoisted_1$p];
function __render__$1a(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n())
    },
    [_ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 0,
        class: vue.normalizeClass(_ctx.classes(_ctx.n("content"), [_ctx.loading, _ctx.n("content--active")]))
      },
      [vue.renderSlot(_ctx.$slots, "default"), _ctx.loading ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          class: vue.normalizeClass(_ctx.n("content-mask"))
        },
        null,
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true)],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true), _ctx.isShow ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 1,
        class: vue.normalizeClass(_ctx.classes(_ctx.n("$--box"), _ctx.n("body"), [_ctx.$slots.default, _ctx.n("inside")]))
      },
      [_ctx.type === "circle" ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          class: vue.normalizeClass(_ctx.n("circle"))
        },
        [vue.createElementVNode(
          "span",
          {
            class: vue.normalizeClass(_ctx.classes(_ctx.n("circle-block"), _ctx.n("circle-block--" + _ctx.size))),
            style: vue.normalizeStyle({
              width: _ctx.multiplySizeUnit(_ctx.radius, 2),
              height: _ctx.multiplySizeUnit(_ctx.radius, 2),
              color: _ctx.color
            })
          },
          _hoisted_2$c,
          6
          /* CLASS, STYLE */
        )],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true), (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList(_ctx.loadingTypeDict, (nums, key) => {
          return vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            {
              key
            },
            [_ctx.type === key ? (vue.openBlock(), vue.createElementBlock(
              "div",
              {
                key: 0,
                class: vue.normalizeClass(_ctx.classes(_ctx.n(key), _ctx.n(key + "--" + _ctx.size)))
              },
              [(vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(nums, (num) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "div",
                    {
                      key: num + key,
                      style: vue.normalizeStyle({
                        backgroundColor: _ctx.color
                      }),
                      class: vue.normalizeClass(_ctx.classes(_ctx.n(key + "-item"), _ctx.n(key + "-item--" + _ctx.size)))
                    },
                    null,
                    6
                    /* CLASS, STYLE */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))],
              2
              /* CLASS */
            )) : vue.createCommentVNode("v-if", true)],
            64
            /* STABLE_FRAGMENT */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      )), _ctx.$slots.description || _ctx.description ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 1,
          class: vue.normalizeClass(_ctx.classes(_ctx.n("description"), _ctx.n("description--" + _ctx.size))),
          style: vue.normalizeStyle({
            color: _ctx.color
          })
        },
        [vue.renderSlot(_ctx.$slots, "description", {}, () => [vue.createTextVNode(
          vue.toDisplayString(_ctx.description),
          1
          /* TEXT */
        )])],
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true)],
    2
    /* CLASS */
  );
}
var __sfc__$1b = vue.defineComponent({
  name: "VarLoading",
  props: props$13,
  setup(props2, _ref) {
    var {
      slots
    } = _ref;
    var loadingTypeDict = {
      wave: 5,
      cube: 4,
      rect: 8,
      disappear: 3
    };
    var isShow = vue.computed(() => {
      if (!call(slots.default))
        return true;
      return props2.loading;
    });
    return {
      n: n$1a,
      classes: classes$Z,
      multiplySizeUnit,
      loadingTypeDict,
      isShow
    };
  }
});
__sfc__$1b.render = __render__$1a;
const Loading = __sfc__$1b;
Loading.install = function(app) {
  app.component(Loading.name, Loading);
};
var _LoadingComponent = Loading;
var props$12 = {
  hovering: {
    type: Boolean,
    default: true
  }
};
var {
  n: n$19,
  classes: classes$Y
} = createNamespace("hover-overlay");
function __render__$19(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), [_ctx.hovering, _ctx.n("--hovering")]))
    },
    null,
    2
    /* CLASS */
  );
}
var __sfc__$1a = vue.defineComponent({
  name: "VarHoverOverlay",
  props: props$12,
  setup() {
    return {
      n: n$19,
      classes: classes$Y
    };
  }
});
__sfc__$1a.render = __render__$19;
const HoverOverlay = __sfc__$1a;
HoverOverlay.install = function(app) {
  app.component(HoverOverlay.name, HoverOverlay);
};
function useHoverOverlay() {
  var hovering = vue.ref(false);
  var handleHovering = (value) => {
    hovering.value = value;
  };
  return {
    hovering,
    handleHovering
  };
}
var _HoverOverlayComponent = HoverOverlay;
function shouldDisabled(arg) {
  if (!arg) {
    return false;
  }
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (arg === "desktop" && isMobile) {
    return true;
  }
  if (arg === "mobile" && !isMobile) {
    return true;
  }
  return false;
}
function getStyle(element) {
  var style = element.getAttribute("style");
  if (!style)
    return {};
  return style.split(";").filter(Boolean).reduce((style2, item) => {
    var [key, value] = item.split(":").map((item2) => item2.trim());
    style2[camelize(key)] = value;
    return style2;
  }, {});
}
function updateRawStyle(element) {
  var {
    value
  } = element._hover;
  var style = getStyle(element);
  Object.keys(value).forEach((key) => {
    var camelizedKey = camelize(key);
    var styleValue = value[camelizedKey];
    if (styleValue != null && style[camelizedKey]) {
      element._hover.rawStyle[camelizedKey] = style[camelizedKey];
    }
  });
}
function updateStyle(element, styleValue) {
  Object.keys(styleValue).forEach((key) => {
    var value = styleValue[key];
    if (value != null) {
      element.style[key] = value;
    }
  });
}
function clearStyle(element) {
  Object.keys(element._hover.value).forEach((key) => {
    var value = element._hover.value[key];
    if (value != null) {
      element.style[key] = "";
    }
  });
}
function restoreStyle(element) {
  clearStyle(element);
  updateStyle(element, element._hover.rawStyle);
}
function createHover() {
  var {
    value
  } = this._hover;
  this._hover.hovering = true;
  if (isFunction(value)) {
    value(this._hover.hovering);
    return;
  }
  updateStyle(this, value);
}
function removeHover() {
  this._hover.hovering = false;
  if (isFunction(this._hover.value)) {
    this._hover.value(this._hover.hovering);
    return;
  }
  restoreStyle(this);
}
function mounted(element, binding) {
  var _element$_hover$hover, _element$_hover;
  var {
    arg,
    value
  } = binding;
  if (shouldDisabled(arg)) {
    return;
  }
  element._hover = {
    value,
    hovering: (_element$_hover$hover = (_element$_hover = element._hover) == null ? void 0 : _element$_hover.hovering) != null ? _element$_hover$hover : false,
    rawStyle: {}
  };
  updateRawStyle(element);
  element.addEventListener("mouseenter", createHover);
  element.addEventListener("mouseleave", removeHover);
}
function unmounted(element, binding) {
  if (shouldDisabled(binding.arg)) {
    return;
  }
  restoreStyle(element);
  element.removeEventListener("mouseenter", createHover);
  element.removeEventListener("mouseleave", removeHover);
}
function beforeUpdate(element, binding) {
  if (!element._hover) {
    return;
  }
  unmounted(element, binding);
}
function shouldUpdateStyle(element, binding) {
  return !isFunction(binding.value) && element._hover.hovering;
}
function updated(element, binding) {
  mounted(element, binding);
  if (shouldUpdateStyle(element, binding)) {
    updateStyle(element, binding.value);
  }
}
var Hover = {
  mounted,
  unmounted,
  beforeUpdate,
  updated,
  install(app) {
    app.directive("hover", this);
  }
};
var _HoverComponent = Hover;
const Hover$1 = Hover;
function _extends$g() {
  _extends$g = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$g.apply(this, arguments);
}
function typeValidator$9(type) {
  return ["default", "primary", "info", "success", "warning", "danger"].includes(type);
}
function sizeValidator$3(size) {
  return ["normal", "mini", "small", "large"].includes(size);
}
function nativeTypeValidator(nativeType) {
  return ["button", "reset", "submit"].includes(nativeType);
}
var props$11 = {
  type: {
    type: String,
    validator: typeValidator$9
  },
  nativeType: {
    type: String,
    default: "button",
    validator: nativeTypeValidator
  },
  size: {
    type: String,
    validator: sizeValidator$3
  },
  loading: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  text: {
    type: Boolean,
    default: false
  },
  outline: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  ripple: {
    type: Boolean,
    default: true
  },
  color: {
    type: String
  },
  textColor: {
    type: String
  },
  elevation: {
    type: [Boolean, Number, String],
    default: true
  },
  autoLoading: {
    type: Boolean,
    default: false
  },
  loadingRadius: {
    type: [Number, String]
  },
  loadingType: pickProps(props$13, "type"),
  loadingSize: pickProps(props$13, "size"),
  loadingColor: _extends$g({}, pickProps(props$13, "color"), {
    default: "currentColor"
  }),
  onClick: defineListenerProp(),
  onTouchstart: defineListenerProp()
};
var BUTTON_GROUP_BIND_BUTTON_KEY = Symbol("BUTTON_GROUP_BIND_BUTTON_KEY");
function useButtons() {
  var {
    bindChildren,
    childProviders,
    length
  } = useChildren(BUTTON_GROUP_BIND_BUTTON_KEY);
  return {
    length,
    buttons: childProviders,
    bindButtons: bindChildren
  };
}
function useButtonGroup() {
  var {
    bindParent,
    parentProvider,
    index
  } = useParent(BUTTON_GROUP_BIND_BUTTON_KEY);
  return {
    index,
    buttonGroup: parentProvider,
    bindButtonGroup: bindParent
  };
}
var {
  n: n$18,
  classes: classes$X
} = createNamespace("button");
var _hoisted_1$o = ["type", "disabled"];
function __render__$18(_ctx, _cache) {
  var _component_var_loading = vue.resolveComponent("var-loading");
  var _component_var_hover_overlay = vue.resolveComponent("var-hover-overlay");
  var _directive_ripple = vue.resolveDirective("ripple");
  var _directive_hover = vue.resolveDirective("hover");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", {
    class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"), _ctx.n("--" + _ctx.states.size), [_ctx.block, _ctx.n("$--flex") + " " + _ctx.n("--block"), _ctx.n("$--inline-flex")], [_ctx.disabled, _ctx.n("--disabled")], [_ctx.states.text, _ctx.n("--text-" + _ctx.states.type) + " " + _ctx.n("--text"), _ctx.n("--" + _ctx.states.type) + " " + _ctx.states.elevation], [_ctx.states.text && _ctx.disabled, _ctx.n("--text-disabled")], [_ctx.round, _ctx.n("--round")], [_ctx.states.outline, _ctx.n("--outline")])),
    style: vue.normalizeStyle({
      color: _ctx.states.textColor,
      background: _ctx.states.color
    }),
    type: _ctx.nativeType,
    disabled: _ctx.disabled,
    onClick: _cache[0] || (_cache[0] = function() {
      return _ctx.handleClick && _ctx.handleClick(...arguments);
    }),
    onTouchstart: _cache[1] || (_cache[1] = function() {
      return _ctx.handleTouchstart && _ctx.handleTouchstart(...arguments);
    })
  }, [_ctx.loading || _ctx.pending ? (vue.openBlock(), vue.createBlock(_component_var_loading, {
    key: 0,
    class: vue.normalizeClass(_ctx.n("loading")),
    "var-button-cover": "",
    color: _ctx.loadingColor,
    type: _ctx.loadingType,
    size: _ctx.loadingSize,
    radius: _ctx.loadingRadius
  }, null, 8, ["class", "color", "type", "size", "radius"])) : vue.createCommentVNode("v-if", true), vue.createElementVNode(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n("content"), [_ctx.loading || _ctx.pending, _ctx.n("--hidden")]))
    },
    [vue.renderSlot(_ctx.$slots, "default")],
    2
    /* CLASS */
  ), vue.createVNode(_component_var_hover_overlay, {
    hovering: _ctx.hovering
  }, null, 8, ["hovering"])], 46, _hoisted_1$o)), [[_directive_ripple, {
    disabled: _ctx.disabled || !_ctx.ripple
  }], [_directive_hover, _ctx.handleHovering, "desktop"]]);
}
var __sfc__$19 = vue.defineComponent({
  name: "VarButton",
  components: {
    VarLoading: Loading,
    VarHoverOverlay: HoverOverlay
  },
  directives: {
    Ripple: Ripple$1,
    Hover: Hover$1
  },
  props: props$11,
  setup(props2) {
    var pending = vue.ref(false);
    var {
      buttonGroup: buttonGroup2
    } = useButtonGroup();
    var {
      hovering,
      handleHovering
    } = useHoverOverlay();
    var states = vue.computed(() => {
      if (!buttonGroup2) {
        return {
          elevation: formatElevation(props2.elevation, 2),
          type: props2.type != null ? props2.type : "default",
          size: props2.size != null ? props2.size : "normal",
          color: props2.color,
          text: props2.text,
          textColor: props2.textColor,
          outline: props2.outline
        };
      }
      var {
        type,
        size,
        color,
        textColor,
        mode
      } = buttonGroup2;
      return {
        elevation: "",
        type: props2.type != null ? props2.type : type.value,
        size: props2.size != null ? props2.size : size.value,
        color: props2.color != null ? props2.color : color.value,
        textColor: props2.textColor != null ? props2.textColor : textColor.value,
        text: mode.value !== "normal",
        outline: mode.value === "outline"
      };
    });
    var attemptAutoLoading = (result2) => {
      if (props2.autoLoading) {
        pending.value = true;
        result2 = isArray(result2) ? result2 : [result2];
        Promise.all(result2).then(() => {
          pending.value = false;
        }).catch(() => {
          pending.value = false;
        });
      }
    };
    var handleClick = (e) => {
      var {
        loading: loading2,
        disabled,
        onClick
      } = props2;
      if (!onClick || loading2 || disabled || pending.value) {
        return;
      }
      attemptAutoLoading(call(onClick, e));
    };
    var handleTouchstart = (e) => {
      var {
        loading: loading2,
        disabled,
        onTouchstart
      } = props2;
      if (!onTouchstart || loading2 || disabled || pending.value) {
        return;
      }
      attemptAutoLoading(call(onTouchstart, e));
    };
    return {
      n: n$18,
      classes: classes$X,
      pending,
      states,
      hovering,
      handleHovering,
      handleClick,
      handleTouchstart
    };
  }
});
__sfc__$19.render = __render__$18;
const Button = __sfc__$19;
Button.install = function(app) {
  app.component(Button.name, Button);
};
var _ButtonComponent = Button;
var props$10 = {
  visibilityHeight: {
    type: [Number, String],
    default: 200
  },
  duration: {
    type: Number,
    default: 300
  },
  right: {
    type: [Number, String]
  },
  elevation: {
    type: [Boolean, Number, String],
    default: true
  },
  bottom: {
    type: [Number, String]
  },
  target: {
    type: [String, Object]
  },
  onClick: defineListenerProp()
};
var {
  n: n$17,
  classes: classes$W
} = createNamespace("back-top");
function __render__$17(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  var _component_var_button = vue.resolveComponent("var-button");
  return vue.openBlock(), vue.createBlock(vue.Teleport, {
    to: "body",
    disabled: _ctx.disabled
  }, [vue.createElementVNode(
    "div",
    vue.mergeProps({
      class: _ctx.classes(_ctx.n(), [_ctx.show, _ctx.n("--active")]),
      ref: "backTopEl",
      style: {
        right: _ctx.toSizeUnit(_ctx.right),
        bottom: _ctx.toSizeUnit(_ctx.bottom)
      }
    }, _ctx.$attrs, {
      onClick: _cache[0] || (_cache[0] = vue.withModifiers(function() {
        return _ctx.handleClick && _ctx.handleClick(...arguments);
      }, ["stop"]))
    }),
    [vue.renderSlot(_ctx.$slots, "default", {}, () => [vue.createVNode(_component_var_button, {
      elevation: _ctx.elevation,
      type: "primary",
      round: "",
      "var-back-top-cover": ""
    }, {
      default: vue.withCtx(() => [vue.createVNode(_component_var_icon, {
        name: "chevron-up"
      })]),
      _: 1
      /* STABLE */
    }, 8, ["elevation"])])],
    16
    /* FULL_PROPS */
  )], 8, ["disabled"]);
}
var __sfc__$18 = vue.defineComponent({
  name: "VarBackTop",
  components: {
    VarButton: Button,
    VarIcon: Icon
  },
  inheritAttrs: false,
  props: props$10,
  setup(props2) {
    var show = vue.ref(false);
    var backTopEl = vue.ref(null);
    var disabled = vue.ref(true);
    var scroller;
    var handleClick = (event) => {
      call(props2.onClick, event);
      var left2 = getScrollLeft(scroller);
      scrollTo(scroller, {
        left: left2,
        duration: props2.duration,
        animation: easeInOutCubic
      });
    };
    var handleScroll = throttle(() => {
      show.value = getScrollTop(scroller) >= toPxNum(props2.visibilityHeight);
    }, 200);
    var setScroller = () => {
      scroller = props2.target ? getTarget(props2.target, "BackTop") : getParentScroller(backTopEl.value);
    };
    var addScrollerEventListener = () => {
      scroller.addEventListener("scroll", handleScroll);
    };
    var removeScrollerEventListener = () => {
      scroller.removeEventListener("scroll", handleScroll);
    };
    vue.onMounted(() => {
      setScroller();
      addScrollerEventListener();
      disabled.value = false;
    });
    vue.onActivated(addScrollerEventListener);
    vue.onBeforeUnmount(removeScrollerEventListener);
    vue.onDeactivated(removeScrollerEventListener);
    return {
      disabled,
      show,
      backTopEl,
      toSizeUnit,
      n: n$17,
      classes: classes$W,
      handleClick
    };
  }
});
__sfc__$18.render = __render__$17;
const BackTop = __sfc__$18;
BackTop.install = function(app) {
  app.component(BackTop.name, BackTop);
};
var _BackTopComponent = BackTop;
function typeValidator$8(type) {
  return ["default", "primary", "info", "success", "warning", "danger"].includes(type);
}
function positionValidator$2(position) {
  return ["right-top", "right-bottom", "left-top", "left-bottom"].includes(position);
}
var props$$ = {
  type: {
    type: String,
    default: "default",
    validator: typeValidator$8
  },
  position: {
    type: String,
    default: "right-top",
    validator: positionValidator$2
  },
  hidden: {
    type: Boolean,
    default: false
  },
  value: {
    type: [String, Number],
    default: 0
  },
  maxValue: {
    type: [String, Number]
  },
  dot: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String
  },
  color: {
    type: String
  }
};
var {
  n: n$16,
  classes: classes$V
} = createNamespace("badge");
function __render__$16(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box")))
    },
    [vue.renderSlot(_ctx.$slots, "default"), vue.createVNode(vue.Transition, {
      name: _ctx.n("$-badge-fade")
    }, {
      default: vue.withCtx(() => [vue.withDirectives(vue.createElementVNode(
        "span",
        vue.mergeProps({
          class: _ctx.classes(_ctx.n("content"), _ctx.n("--" + _ctx.type), [_ctx.$slots.default, _ctx.n("--" + _ctx.position)], [_ctx.dot, _ctx.n("--dot")], [_ctx.icon, _ctx.n("--icon")]),
          style: {
            background: _ctx.color
          }
        }, _ctx.$attrs),
        [_ctx.icon ? (vue.openBlock(), vue.createBlock(_component_var_icon, {
          key: 0,
          class: vue.normalizeClass(_ctx.n("icon")),
          "var-badge-cover": "",
          name: _ctx.icon
        }, null, 8, ["class", "name"])) : vue.createCommentVNode("v-if", true), vue.renderSlot(_ctx.$slots, "value", {}, () => [!_ctx.icon && !_ctx.dot ? (vue.openBlock(), vue.createElementBlock(
          "span",
          {
            key: 0,
            class: vue.normalizeClass(_ctx.n("value"))
          },
          vue.toDisplayString(_ctx.value),
          3
          /* TEXT, CLASS */
        )) : vue.createCommentVNode("v-if", true)])],
        16
        /* FULL_PROPS */
      ), [[vue.vShow, !_ctx.hidden]])]),
      _: 3
      /* FORWARDED */
    }, 8, ["name"])],
    2
    /* CLASS */
  );
}
var __sfc__$17 = vue.defineComponent({
  name: "VarBadge",
  components: {
    VarIcon: Icon
  },
  inheritAttrs: false,
  props: props$$,
  setup(props2) {
    var value = vue.computed(() => {
      var {
        value: value2,
        maxValue
      } = props2;
      return value2 != null && maxValue != null && toNumber(value2) > toNumber(maxValue) ? maxValue + "+" : value2;
    });
    return {
      n: n$16,
      classes: classes$V,
      value
    };
  }
});
__sfc__$17.render = __render__$16;
const Badge = __sfc__$17;
Badge.install = function(app) {
  app.component(Badge.name, Badge);
};
var _BadgeComponent = Badge;
var props$_ = {
  active: {
    type: [Number, String],
    default: 0
  },
  fixed: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: false
  },
  safeArea: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: [Number, String],
    default: 1
  },
  activeColor: {
    type: String
  },
  inactiveColor: {
    type: String
  },
  onChange: defineListenerProp(),
  "onUpdate:active": defineListenerProp(),
  onBeforeChange: defineListenerProp(),
  onFabClick: defineListenerProp(),
  fabProps: {
    type: Object
  }
};
var BOTTOM_NAVIGATION_BIND_BOTTOM_NAVIGATION_ITEM_KEY = Symbol("BOTTOM_NAVIGATION_BIND_BOTTOM_NAVIGATION_ITEM_KEY");
function useBottomNavigationItems() {
  var {
    childProviders,
    length,
    bindChildren
  } = useChildren(BOTTOM_NAVIGATION_BIND_BOTTOM_NAVIGATION_ITEM_KEY);
  return {
    length,
    bottomNavigationItems: childProviders,
    bindBottomNavigationItem: bindChildren
  };
}
function _extends$f() {
  _extends$f = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$f.apply(this, arguments);
}
var {
  n: n$15,
  classes: classes$U
} = createNamespace("bottom-navigation");
var {
  n: nItem
} = createNamespace("bottom-navigation-item");
var RIGHT_HALF_SPACE_CLASS = nItem("--right-half-space");
var LEFT_HALF_SPACE_CLASS = nItem("--left-half-space");
var RIGHT_SPACE_CLASS = nItem("--right-space");
var defaultFabProps = {
  type: "primary"
};
function __render__$15(_ctx, _cache) {
  var _component_var_button = vue.resolveComponent("var-button");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"), [_ctx.fixed, _ctx.n("--fixed")], [_ctx.border, _ctx.n("--border")], [_ctx.safeArea, _ctx.n("--safe-area")])),
      ref: "bottomNavigationDom",
      style: vue.normalizeStyle("z-index:" + _ctx.zIndex)
    },
    [vue.renderSlot(_ctx.$slots, "default"), _ctx.$slots.fab ? (vue.openBlock(), vue.createBlock(_component_var_button, vue.mergeProps({
      key: 0,
      class: _ctx.classes(_ctx.n("fab"), [_ctx.length % 2, _ctx.n("--fab-right"), _ctx.n("--fab-center")]),
      "var-bottom-navigation__fab": "",
      onClick: _ctx.handleFabClick
    }, _ctx.fabProps, {
      round: ""
    }), {
      default: vue.withCtx(() => [vue.renderSlot(_ctx.$slots, "fab")]),
      _: 3
      /* FORWARDED */
    }, 16, ["class", "onClick"])) : vue.createCommentVNode("v-if", true)],
    6
    /* CLASS, STYLE */
  );
}
var __sfc__$16 = vue.defineComponent({
  name: "VarBottomNavigation",
  components: {
    VarButton: Button
  },
  props: props$_,
  setup(props2, _ref) {
    var {
      slots
    } = _ref;
    var bottomNavigationDom = vue.ref(null);
    var active = vue.computed(() => props2.active);
    var activeColor = vue.computed(() => props2.activeColor);
    var inactiveColor = vue.computed(() => props2.inactiveColor);
    var fabProps = vue.ref({});
    var {
      length,
      bottomNavigationItems,
      bindBottomNavigationItem
    } = useBottomNavigationItems();
    var matchBoundary = () => {
      if (length.value === 0 || matchName() || matchIndex()) {
        return;
      }
      handleActiveIndex();
    };
    var matchName = () => {
      return bottomNavigationItems.find((_ref2) => {
        var {
          name
        } = _ref2;
        return active.value === name.value;
      });
    };
    var matchIndex = () => {
      return bottomNavigationItems.find((_ref3) => {
        var {
          index
        } = _ref3;
        return active.value === index.value;
      });
    };
    var handleActiveIndex = () => {
      if (!isNumber(active.value)) {
        return;
      }
      if (active.value < 0) {
        call(props2["onUpdate:active"], 0);
      } else if (active.value > length.value - 1) {
        call(props2["onUpdate:active"], length.value - 1);
      }
    };
    var onToggle = (changedValue) => {
      if (active.value === changedValue) {
        return;
      }
      props2.onBeforeChange ? handleBeforeChange(changedValue) : handleChange(changedValue);
    };
    var handleBeforeChange = (changedValue) => {
      var results = call(props2.onBeforeChange, changedValue);
      results = isArray(results) ? results : [results];
      Promise.all(results).then((results2) => {
        if (!results2.some((result2) => !result2)) {
          handleChange(changedValue);
        }
      });
    };
    var handleChange = (changedValue) => {
      call(props2["onUpdate:active"], changedValue);
      call(props2.onChange, changedValue);
    };
    var removeMarginClass = () => {
      var bottomNavigationItems2 = getBottomNavigationItems();
      bottomNavigationItems2.forEach((dom) => {
        dom.classList.remove(RIGHT_HALF_SPACE_CLASS, LEFT_HALF_SPACE_CLASS, RIGHT_SPACE_CLASS);
      });
    };
    var addMarginClass = (length2) => {
      var bottomNavigationItems2 = getBottomNavigationItems();
      var itemsNum = bottomNavigationItems2.length;
      var isEven = length2 % 2 === 0;
      bottomNavigationItems2.forEach((bottomNavigationItem2, i) => {
        handleMarginClass(isEven, bottomNavigationItem2, i, itemsNum);
      });
    };
    var handleMarginClass = (isEven, dom, i, length2) => {
      var isLast = i === length2 - 1;
      if (!isEven && isLast) {
        dom.classList.add(RIGHT_SPACE_CLASS);
        return;
      }
      var isFabLeft = i === length2 / 2 - 1;
      var isFabRight = i === length2 / 2;
      if (isFabLeft) {
        dom.classList.add(RIGHT_HALF_SPACE_CLASS);
      } else if (isFabRight) {
        dom.classList.add(LEFT_HALF_SPACE_CLASS);
      }
    };
    var getBottomNavigationItems = () => {
      return Array.from(bottomNavigationDom.value.querySelectorAll("." + nItem()));
    };
    var handleFabClick = () => {
      call(props2.onFabClick);
    };
    var bottomNavigationProvider = {
      active,
      activeColor,
      inactiveColor,
      onToggle
    };
    bindBottomNavigationItem(bottomNavigationProvider);
    vue.watch(() => length.value, matchBoundary);
    vue.watch(() => props2.fabProps, (newValue) => {
      fabProps.value = _extends$f({}, defaultFabProps, newValue);
    }, {
      immediate: true,
      deep: true
    });
    useMounted(() => {
      if (!slots.fab) {
        return;
      }
      addMarginClass(length.value);
    });
    vue.onUpdated(() => {
      removeMarginClass();
      if (!slots.fab) {
        return;
      }
      addMarginClass(length.value);
    });
    return {
      n: n$15,
      classes: classes$U,
      length,
      bottomNavigationDom,
      handleFabClick,
      fabProps
    };
  }
});
__sfc__$16.render = __render__$15;
const BottomNavigation = __sfc__$16;
BottomNavigation.install = function(app) {
  app.component(BottomNavigation.name, BottomNavigation);
};
var _BottomNavigationComponent = BottomNavigation;
var props$Z = {
  name: {
    type: String
  },
  icon: {
    type: String
  },
  label: {
    type: String
  },
  namespace: {
    type: String,
    default: "var-icon"
  },
  badge: {
    type: [Boolean, Object],
    default: false
  },
  onClick: defineListenerProp()
};
function useBottomNavigation() {
  var {
    parentProvider,
    index,
    bindParent
  } = useParent(BOTTOM_NAVIGATION_BIND_BOTTOM_NAVIGATION_ITEM_KEY);
  if (!bindParent) {
    error$1("BottomNavigationItem", "<var-bottom-navigation-item/> must in <var-bottom-navigation/>");
  }
  return {
    index,
    bottomNavigation: parentProvider,
    bindBottomNavigation: bindParent
  };
}
var {
  n: n$14,
  classes: classes$T
} = createNamespace("bottom-navigation-item");
var defaultBadgeProps = {
  type: "danger",
  dot: true
};
function __render__$14(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  var _component_var_badge = vue.resolveComponent("var-badge");
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock(
    "button",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"), [_ctx.active === _ctx.index || _ctx.active === _ctx.name, _ctx.n("--active")])),
      style: vue.normalizeStyle({
        color: _ctx.computeColorStyle()
      }),
      onClick: _cache[0] || (_cache[0] = function() {
        return _ctx.handleClick && _ctx.handleClick(...arguments);
      })
    },
    [_ctx.icon && !_ctx.$slots.icon ? (vue.openBlock(), vue.createBlock(_component_var_icon, {
      key: 0,
      name: _ctx.icon,
      namespace: _ctx.namespace,
      class: vue.normalizeClass(_ctx.n("icon")),
      "var-bottom-navigation-item-cover": ""
    }, null, 8, ["name", "namespace", "class"])) : vue.createCommentVNode("v-if", true), vue.renderSlot(_ctx.$slots, "icon", {
      active: _ctx.active === _ctx.index || _ctx.active === _ctx.name
    }), _ctx.badge ? (vue.openBlock(), vue.createBlock(_component_var_badge, vue.mergeProps({
      key: 1
    }, _ctx.badgeProps, {
      class: _ctx.n("badge"),
      "var-bottom-navigation-item-cover": ""
    }), null, 16, ["class"])) : vue.createCommentVNode("v-if", true), vue.createElementVNode(
      "span",
      {
        class: vue.normalizeClass(_ctx.n("label"))
      },
      [!_ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        {
          key: 0
        },
        [vue.createTextVNode(
          vue.toDisplayString(_ctx.label),
          1
          /* TEXT */
        )],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      )) : vue.createCommentVNode("v-if", true), vue.renderSlot(_ctx.$slots, "default")],
      2
      /* CLASS */
    )],
    6
    /* CLASS, STYLE */
  )), [[_directive_ripple]]);
}
var __sfc__$15 = vue.defineComponent({
  name: "VarBottomNavigationItem",
  components: {
    VarBadge: Badge,
    VarIcon: Icon
  },
  directives: {
    Ripple: Ripple$1
  },
  props: props$Z,
  setup(props2) {
    var name = vue.computed(() => props2.name);
    var badge2 = vue.computed(() => props2.badge);
    var badgeProps = vue.ref({});
    var {
      index,
      bottomNavigation: bottomNavigation2,
      bindBottomNavigation
    } = useBottomNavigation();
    var {
      active,
      activeColor,
      inactiveColor
    } = bottomNavigation2;
    var bottomNavigationItemProvider = {
      name,
      index
    };
    var computeColorStyle = () => {
      return active.value === name.value || active.value === index.value ? activeColor.value : inactiveColor.value;
    };
    var handleClick = () => {
      var _name$value;
      var active2 = (_name$value = name.value) != null ? _name$value : index.value;
      call(props2.onClick, active2);
      call(bottomNavigation2.onToggle, active2);
    };
    bindBottomNavigation(bottomNavigationItemProvider);
    vue.watch(() => badge2.value, (newValue) => {
      badgeProps.value = newValue === true ? defaultBadgeProps : badge2.value;
    }, {
      immediate: true
    });
    return {
      n: n$14,
      classes: classes$T,
      index,
      active,
      badge: badge2,
      badgeProps,
      computeColorStyle,
      handleClick
    };
  }
});
__sfc__$15.render = __render__$14;
const BottomNavigationItem = __sfc__$15;
BottomNavigationItem.install = function(app) {
  app.component(BottomNavigationItem.name, BottomNavigationItem);
};
var _BottomNavigationItemComponent = BottomNavigationItem;
var props$Y = {
  separator: {
    type: String
  },
  onClick: defineListenerProp()
};
var BREADCRUMBS_BIND_BREADCRUMB_ITEM_KEY = Symbol("BREADCRUMBS_BIND_BREADCRUMB_KEY");
function useBreadcrumbsList() {
  var {
    childProviders,
    bindChildren,
    length
  } = useChildren(BREADCRUMBS_BIND_BREADCRUMB_ITEM_KEY);
  return {
    length,
    breadcrumbList: childProviders,
    bindBreadcrumbList: bindChildren
  };
}
function useBreadcrumb() {
  var {
    parentProvider,
    bindParent,
    index
  } = useParent(BREADCRUMBS_BIND_BREADCRUMB_ITEM_KEY);
  if (!bindParent) {
    error$1("Breadcrumb", "<var-breadcrumb/> must in <var-breadcrumbs/>");
  }
  return {
    index,
    breadcrumb: parentProvider,
    bindBreadcrumb: bindParent
  };
}
var {
  n: n$13,
  classes: classes$S
} = createNamespace("breadcrumb");
function __render__$13(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n())
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.classes(_ctx.n("content"), [!_ctx.isLast, _ctx.n("--active")])),
        onClick: _cache[0] || (_cache[0] = function() {
          return _ctx.handleClick && _ctx.handleClick(...arguments);
        })
      },
      [vue.renderSlot(_ctx.$slots, "default")],
      2
      /* CLASS */
    ), !_ctx.isLast ? vue.renderSlot(_ctx.$slots, "separator", {
      key: 0
    }, () => {
      var _ctx$separator;
      return [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("separator"))
        },
        vue.toDisplayString((_ctx$separator = _ctx.separator) != null ? _ctx$separator : _ctx.parentSeparator),
        3
        /* TEXT, CLASS */
      )];
    }) : vue.createCommentVNode("v-if", true)],
    2
    /* CLASS */
  );
}
var __sfc__$14 = vue.defineComponent({
  name: "VarBreadcrumb",
  props: props$Y,
  setup(props2) {
    var {
      index,
      breadcrumb: breadcrumb2,
      bindBreadcrumb
    } = useBreadcrumb();
    var isLast = vue.computed(() => index.value === breadcrumb2.length.value - 1);
    var parentSeparator = vue.computed(() => breadcrumb2.separator.value);
    var handleClick = (e) => {
      if (isLast.value) {
        return;
      }
      call(props2.onClick, e);
    };
    bindBreadcrumb(null);
    return {
      n: n$13,
      classes: classes$S,
      isLast,
      parentSeparator,
      handleClick
    };
  }
});
__sfc__$14.render = __render__$13;
const Breadcrumb = __sfc__$14;
Breadcrumb.install = function(app) {
  app.component(Breadcrumb.name, Breadcrumb);
};
var _BreadcrumbComponent = Breadcrumb;
var props$X = {
  separator: {
    type: String,
    default: "/"
  }
};
var {
  n: n$12
} = createNamespace("breadcrumbs");
function __render__$12(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n())
    },
    [vue.renderSlot(_ctx.$slots, "default")],
    2
    /* CLASS */
  );
}
var __sfc__$13 = vue.defineComponent({
  name: "VarBreadcrumbs",
  props: props$X,
  setup(props2) {
    var separator = vue.computed(() => props2.separator);
    var {
      bindBreadcrumbList,
      length
    } = useBreadcrumbsList();
    var breadcrumbsProvider = {
      length,
      separator
    };
    bindBreadcrumbList(breadcrumbsProvider);
    return {
      n: n$12
    };
  }
});
__sfc__$13.render = __render__$12;
const Breadcrumbs = __sfc__$13;
Breadcrumbs.install = function(app) {
  app.component(Breadcrumbs.name, Breadcrumbs);
};
var _BreadcrumbsComponent = Breadcrumbs;
function typeValidator$7(type) {
  return ["default", "primary", "info", "success", "warning", "danger"].includes(type);
}
function sizeValidator$2(size) {
  return ["normal", "mini", "small", "large"].includes(size);
}
function modeValidator$1(mode) {
  return ["normal", "text", "outline"].includes(mode);
}
var props$W = {
  type: {
    type: String,
    default: "default",
    validator: typeValidator$7
  },
  size: {
    type: String,
    default: "normal",
    validator: sizeValidator$2
  },
  color: {
    type: String
  },
  textColor: {
    type: String
  },
  mode: {
    type: String,
    default: "normal",
    validator: modeValidator$1
  },
  elevation: {
    type: [Boolean, Number, String],
    default: true
  },
  vertical: {
    type: Boolean,
    default: false
  }
};
var {
  n: n$11,
  classes: classes$R
} = createNamespace("button-group");
function __render__$11(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"), [_ctx.mode, "" + _ctx.n("--mode-" + _ctx.mode)], [_ctx.vertical, _ctx.n("--vertical"), _ctx.n("--horizontal")], [_ctx.mode === "normal", _ctx.formatElevation(_ctx.elevation, 2)]))
    },
    [vue.renderSlot(_ctx.$slots, "default")],
    2
    /* CLASS */
  );
}
var __sfc__$12 = vue.defineComponent({
  name: "VarButtonGroup",
  props: props$W,
  setup(props2) {
    var {
      bindButtons
    } = useButtons();
    var buttonGroupProvider = {
      elevation: vue.computed(() => props2.elevation),
      type: vue.computed(() => props2.type),
      size: vue.computed(() => props2.size),
      color: vue.computed(() => props2.color),
      textColor: vue.computed(() => props2.textColor),
      mode: vue.computed(() => props2.mode)
    };
    bindButtons(buttonGroupProvider);
    return {
      n: n$11,
      classes: classes$R,
      formatElevation
    };
  }
});
__sfc__$12.render = __render__$11;
const ButtonGroup = __sfc__$12;
ButtonGroup.install = function(app) {
  app.component(ButtonGroup.name, ButtonGroup);
};
var _ButtonGroupComponent = ButtonGroup;
function fitValidator$1(fit) {
  return ["fill", "contain", "cover", "none", "scale-down"].includes(fit);
}
var props$V = {
  src: {
    type: String
  },
  fit: {
    type: String,
    validator: fitValidator$1,
    default: "cover"
  },
  imageHeight: {
    type: [String, Number]
  },
  imageWidth: {
    type: [String, Number]
  },
  outline: {
    type: Boolean,
    default: false
  },
  layout: {
    type: String,
    default: "column"
  },
  floating: {
    type: Boolean,
    default: false
  },
  floatingDuration: {
    type: Number,
    default: 250
  },
  alt: {
    type: String
  },
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  description: {
    type: String
  },
  elevation: {
    type: [Boolean, Number, String],
    default: true
  },
  ripple: {
    type: Boolean,
    default: false
  },
  onClick: defineListenerProp(),
  "onUpdate:floating": defineListenerProp()
};
function asyncGeneratorStep$a(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error2) {
    reject(error2);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator$a(fn2) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn2.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep$a(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep$a(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
var {
  n: n$10,
  classes: classes$Q
} = createNamespace("card");
var RIPPLE_DELAY = 500;
var _hoisted_1$n = ["src", "alt"];
function __render__$10(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  var _component_var_button = vue.resolveComponent("var-button");
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock(
    "div",
    {
      ref: "card",
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), [_ctx.isRow, _ctx.n("--layout-row")], [_ctx.outline, _ctx.n("--outline")], _ctx.formatElevation(_ctx.elevation, 1))),
      style: vue.normalizeStyle({
        zIndex: _ctx.floated ? _ctx.zIndex : void 0
      }),
      onClick: _cache[0] || (_cache[0] = function() {
        return _ctx.handleClick && _ctx.handleClick(...arguments);
      })
    },
    [vue.createElementVNode(
      "div",
      {
        ref: "cardFloater",
        class: vue.normalizeClass(_ctx.n("floater")),
        style: vue.normalizeStyle({
          width: _ctx.floaterWidth,
          height: _ctx.floaterHeight,
          top: _ctx.floaterTop,
          left: _ctx.floaterLeft,
          overflow: _ctx.floaterOverflow,
          position: _ctx.floaterPosition,
          transition: _ctx.floated ? "background-color " + _ctx.floatingDuration + "ms, color " + _ctx.floatingDuration + "ms, width " + _ctx.floatingDuration + "ms, height " + _ctx.floatingDuration + "ms, top " + _ctx.floatingDuration + "ms, left " + _ctx.floatingDuration + "ms" : void 0
        })
      },
      [vue.renderSlot(_ctx.$slots, "image", {}, () => [_ctx.src ? (vue.openBlock(), vue.createElementBlock("img", {
        key: 0,
        class: vue.normalizeClass(_ctx.n("image")),
        style: vue.normalizeStyle({
          objectFit: _ctx.fit,
          height: _ctx.toSizeUnit(_ctx.imageHeight),
          width: _ctx.toSizeUnit(_ctx.imageWidth)
        }),
        src: _ctx.src,
        alt: _ctx.alt
      }, null, 14, _hoisted_1$n)) : vue.createCommentVNode("v-if", true)]), vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("container"))
        },
        [vue.renderSlot(_ctx.$slots, "title", {}, () => [_ctx.title ? (vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: 0,
            class: vue.normalizeClass(_ctx.n("title"))
          },
          vue.toDisplayString(_ctx.title),
          3
          /* TEXT, CLASS */
        )) : vue.createCommentVNode("v-if", true)]), vue.renderSlot(_ctx.$slots, "subtitle", {}, () => [_ctx.subtitle ? (vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: 0,
            class: vue.normalizeClass(_ctx.n("subtitle"))
          },
          vue.toDisplayString(_ctx.subtitle),
          3
          /* TEXT, CLASS */
        )) : vue.createCommentVNode("v-if", true)]), vue.renderSlot(_ctx.$slots, "description", {}, () => [_ctx.description ? (vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: 0,
            class: vue.normalizeClass(_ctx.n("description"))
          },
          vue.toDisplayString(_ctx.description),
          3
          /* TEXT, CLASS */
        )) : vue.createCommentVNode("v-if", true)]), _ctx.$slots.extra ? (vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: 0,
            class: vue.normalizeClass(_ctx.n("footer"))
          },
          [vue.renderSlot(_ctx.$slots, "extra")],
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true), _ctx.$slots["floating-content"] && !_ctx.isRow ? (vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: 1,
            class: vue.normalizeClass(_ctx.n("floating-content")),
            style: vue.normalizeStyle({
              height: _ctx.contentHeight,
              opacity: _ctx.opacity,
              transition: "opacity " + _ctx.floatingDuration * 2 + "ms"
            })
          },
          [vue.renderSlot(_ctx.$slots, "floating-content")],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true)],
        2
        /* CLASS */
      ), _ctx.showFloatingButtons ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          class: vue.normalizeClass(_ctx.classes(_ctx.n("floating-buttons"), _ctx.n("$--box"))),
          style: vue.normalizeStyle({
            zIndex: _ctx.zIndex,
            opacity: _ctx.opacity,
            transition: "opacity " + _ctx.floatingDuration * 2 + "ms"
          })
        },
        [vue.renderSlot(_ctx.$slots, "close-button", {}, () => [vue.createVNode(_component_var_button, {
          "var-card-cover": "",
          round: "",
          class: vue.normalizeClass(_ctx.classes(_ctx.n("close-button"), _ctx.n("$-elevation--6"))),
          onClick: vue.withModifiers(_ctx.close, ["stop"])
        }, {
          default: vue.withCtx(() => [vue.createVNode(_component_var_icon, {
            "var-card-cover": "",
            name: "window-close",
            class: vue.normalizeClass(_ctx.n("close-button-icon"))
          }, null, 8, ["class"])]),
          _: 1
          /* STABLE */
        }, 8, ["class", "onClick"])])],
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)],
      6
      /* CLASS, STYLE */
    ), vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("holder")),
        style: vue.normalizeStyle({
          width: _ctx.holderWidth,
          height: _ctx.holderHeight
        })
      },
      null,
      6
      /* CLASS, STYLE */
    )],
    6
    /* CLASS, STYLE */
  )), [[_directive_ripple, {
    disabled: !_ctx.ripple || _ctx.floater
  }]]);
}
var __sfc__$11 = vue.defineComponent({
  name: "VarCard",
  directives: {
    Ripple: Ripple$1
  },
  components: {
    VarIcon: Icon,
    VarButton: Button
  },
  props: props$V,
  setup(props2) {
    var card2 = vue.ref(null);
    var cardFloater = vue.ref(null);
    var holderWidth = vue.ref("auto");
    var holderHeight = vue.ref("auto");
    var floaterWidth = vue.ref("100%");
    var floaterHeight = vue.ref("100%");
    var floaterTop = vue.ref("auto");
    var floaterLeft = vue.ref("auto");
    var floaterPosition = vue.ref(void 0);
    var floaterOverflow = vue.ref("hidden");
    var contentHeight = vue.ref("0px");
    var opacity = vue.ref("0");
    var isRow = vue.computed(() => props2.layout === "row");
    var showFloatingButtons = vue.ref(false);
    var floated = vue.ref(false);
    var {
      zIndex
    } = useZIndex(() => props2.floating, 1);
    useLock(() => props2.floating, () => !isRow.value);
    var dropdownFloaterTop = "auto";
    var dropdownFloaterLeft = "auto";
    var dropper = null;
    var floater = vue.ref(null);
    var floating = /* @__PURE__ */ function() {
      var _ref = _asyncToGenerator$a(function* () {
        clearTimeout(floater.value);
        clearTimeout(dropper);
        floater.value = null;
        floater.value = setTimeout(/* @__PURE__ */ _asyncToGenerator$a(function* () {
          var {
            width,
            height,
            left: left2,
            top: top2
          } = card2.value.getBoundingClientRect();
          holderWidth.value = toSizeUnit(width);
          holderHeight.value = toSizeUnit(height);
          floaterWidth.value = holderWidth.value;
          floaterHeight.value = holderHeight.value;
          floaterTop.value = toSizeUnit(top2);
          floaterLeft.value = toSizeUnit(left2);
          floaterPosition.value = "fixed";
          dropdownFloaterTop = floaterTop.value;
          dropdownFloaterLeft = floaterLeft.value;
          showFloatingButtons.value = true;
          yield doubleRaf();
          floaterTop.value = "0";
          floaterLeft.value = "0";
          floaterWidth.value = "100vw";
          floaterHeight.value = "100vh";
          contentHeight.value = "auto";
          opacity.value = "1";
          floaterOverflow.value = "auto";
          floated.value = true;
        }), props2.ripple ? RIPPLE_DELAY : 0);
      });
      return function floating2() {
        return _ref.apply(this, arguments);
      };
    }();
    var dropdown = () => {
      clearTimeout(dropper);
      clearTimeout(floater.value);
      floater.value = null;
      floaterWidth.value = holderWidth.value;
      floaterHeight.value = holderHeight.value;
      floaterTop.value = dropdownFloaterTop;
      floaterLeft.value = dropdownFloaterLeft;
      contentHeight.value = "0px";
      opacity.value = "0";
      showFloatingButtons.value = false;
      dropper = setTimeout(() => {
        holderWidth.value = "auto";
        holderHeight.value = "auto";
        floaterWidth.value = "100%";
        floaterHeight.value = "100%";
        floaterTop.value = "auto";
        floaterLeft.value = "auto";
        dropdownFloaterTop = "auto";
        dropdownFloaterLeft = "auto";
        floaterOverflow.value = "hidden";
        floaterPosition.value = void 0;
        floated.value = false;
      }, props2.floatingDuration);
    };
    var close = () => {
      call(props2["onUpdate:floating"], false);
    };
    var handleClick = (e) => {
      call(props2.onClick, e);
    };
    vue.watch(() => props2.floating, (value) => {
      if (isRow.value)
        return;
      vue.nextTick(() => {
        value ? floating() : dropdown();
      });
    }, {
      immediate: true
    });
    return {
      n: n$10,
      classes: classes$Q,
      toSizeUnit,
      card: card2,
      cardFloater,
      holderWidth,
      holderHeight,
      floater,
      floaterWidth,
      floaterHeight,
      floaterTop,
      floaterLeft,
      floaterPosition,
      floaterOverflow,
      contentHeight,
      opacity,
      zIndex,
      isRow,
      close,
      showFloatingButtons,
      floated,
      formatElevation,
      handleClick
    };
  }
});
__sfc__$11.render = __render__$10;
const Card = __sfc__$11;
Card.install = function(app) {
  app.component(Card.name, Card);
};
var _CardComponent = Card;
var props$U = {
  title: {
    type: [Number, String]
  },
  icon: {
    type: String
  },
  description: {
    type: String
  },
  border: {
    type: Boolean,
    default: false
  },
  borderOffset: {
    type: [Number, String]
  },
  iconClass: {
    type: String
  },
  titleClass: {
    type: String
  },
  descriptionClass: {
    type: String
  },
  extraClass: {
    type: String
  },
  ripple: {
    type: Boolean,
    default: false
  },
  onClick: defineListenerProp()
};
var {
  n: n$$,
  classes: classes$P
} = createNamespace("cell");
function __render__$$(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), [_ctx.border, _ctx.n("--border")], [_ctx.onClick, _ctx.n("--cursor")])),
      style: vue.normalizeStyle(_ctx.borderOffsetStyles),
      onClick: _cache[0] || (_cache[0] = function() {
        return _ctx.handleClick && _ctx.handleClick(...arguments);
      })
    },
    [vue.renderSlot(_ctx.$slots, "icon", {}, () => [_ctx.icon ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 0,
        class: vue.normalizeClass(_ctx.classes(_ctx.n("icon"), _ctx.iconClass))
      },
      [vue.createVNode(_component_var_icon, {
        name: _ctx.icon
      }, null, 8, ["name"])],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true)]), vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("content"))
      },
      [vue.renderSlot(_ctx.$slots, "default", {}, () => [_ctx.title ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          class: vue.normalizeClass(_ctx.classes(_ctx.n("title"), _ctx.titleClass))
        },
        vue.toDisplayString(_ctx.title),
        3
        /* TEXT, CLASS */
      )) : vue.createCommentVNode("v-if", true)]), vue.renderSlot(_ctx.$slots, "description", {}, () => [_ctx.description ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          class: vue.normalizeClass(_ctx.classes(_ctx.n("description"), _ctx.descriptionClass))
        },
        vue.toDisplayString(_ctx.description),
        3
        /* TEXT, CLASS */
      )) : vue.createCommentVNode("v-if", true)])],
      2
      /* CLASS */
    ), _ctx.$slots.extra ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 0,
        class: vue.normalizeClass(_ctx.classes(_ctx.n("extra"), _ctx.extraClass))
      },
      [vue.renderSlot(_ctx.$slots, "extra")],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true)],
    6
    /* CLASS, STYLE */
  )), [[_directive_ripple, {
    disabled: !_ctx.ripple
  }]]);
}
var __sfc__$10 = vue.defineComponent({
  name: "VarCell",
  components: {
    VarIcon: Icon
  },
  directives: {
    Ripple: Ripple$1
  },
  props: props$U,
  setup(props2) {
    var borderOffsetStyles = vue.computed(() => {
      if (props2.borderOffset == null) {
        return {};
      }
      return {
        "--cell-border-left": toSizeUnit(props2.borderOffset),
        "--cell-border-right": toSizeUnit(props2.borderOffset)
      };
    });
    var handleClick = (e) => {
      call(props2.onClick, e);
    };
    return {
      n: n$$,
      classes: classes$P,
      toSizeUnit,
      borderOffsetStyles,
      handleClick
    };
  }
});
__sfc__$10.render = __render__$$;
const Cell = __sfc__$10;
Cell.install = function(app) {
  app.component(Cell.name, Cell);
};
var _CellComponent = Cell;
var props$T = {
  errorMessage: {
    type: String,
    default: ""
  },
  extraMessage: {
    type: String,
    default: ""
  }
};
var {
  n: n$_
} = createNamespace("form-details");
var _hoisted_1$m = {
  key: 0
};
var _hoisted_2$b = {
  key: 0
};
function __render__$_(_ctx, _cache) {
  return vue.openBlock(), vue.createBlock(vue.Transition, {
    name: _ctx.n()
  }, {
    default: vue.withCtx(() => [_ctx.errorMessage || _ctx.extraMessage ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 0,
        class: vue.normalizeClass(_ctx.n())
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("error-message"))
        },
        [vue.createVNode(vue.Transition, {
          name: _ctx.n("message")
        }, {
          default: vue.withCtx(() => [_ctx.errorMessage ? (vue.openBlock(), vue.createElementBlock(
            "div",
            _hoisted_1$m,
            vue.toDisplayString(_ctx.errorMessage),
            1
            /* TEXT */
          )) : vue.createCommentVNode("v-if", true)]),
          _: 1
          /* STABLE */
        }, 8, ["name"])],
        2
        /* CLASS */
      ), vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("extra-message"))
        },
        [vue.createVNode(vue.Transition, {
          name: _ctx.n("message")
        }, {
          default: vue.withCtx(() => [_ctx.extraMessage ? (vue.openBlock(), vue.createElementBlock(
            "div",
            _hoisted_2$b,
            vue.toDisplayString(_ctx.extraMessage),
            1
            /* TEXT */
          )) : vue.createCommentVNode("v-if", true)]),
          _: 1
          /* STABLE */
        }, 8, ["name"])],
        2
        /* CLASS */
      )],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true)]),
    _: 1
    /* STABLE */
  }, 8, ["name"]);
}
var __sfc__$$ = vue.defineComponent({
  name: "VarFormDetails",
  props: props$T,
  setup: () => ({
    n: n$_
  })
});
__sfc__$$.render = __render__$_;
const FormDetails = __sfc__$$;
FormDetails.install = function(app) {
  app.component(FormDetails.name, FormDetails);
};
var _FormDetailsComponent = FormDetails;
var props$S = {
  modelValue: {
    type: [String, Number, Boolean, Object, Array],
    default: false
  },
  checkedValue: {
    type: [String, Number, Boolean, Object, Array],
    default: true
  },
  uncheckedValue: {
    type: [String, Number, Boolean, Object, Array],
    default: false
  },
  checkedColor: {
    type: String
  },
  uncheckedColor: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  iconSize: {
    type: [String, Number]
  },
  ripple: {
    type: Boolean,
    default: true
  },
  validateTrigger: {
    type: Array,
    default: ["onChange"]
  },
  rules: {
    type: Array
  },
  onClick: defineListenerProp(),
  onChange: defineListenerProp(),
  "onUpdate:modelValue": defineListenerProp()
};
var CHECKBOX_GROUP_BIND_CHECKBOX_KEY = Symbol("CHECKBOX_GROUP_BIND_CHECKBOX_KEY");
function useCheckboxes() {
  var {
    bindChildren,
    childProviders,
    length
  } = useChildren(CHECKBOX_GROUP_BIND_CHECKBOX_KEY);
  return {
    length,
    checkboxes: childProviders,
    bindCheckboxes: bindChildren
  };
}
function useCheckboxGroup() {
  var {
    bindParent,
    parentProvider,
    index
  } = useParent(CHECKBOX_GROUP_BIND_CHECKBOX_KEY);
  return {
    index,
    checkboxGroup: parentProvider,
    bindCheckboxGroup: bindParent
  };
}
function _extends$e() {
  _extends$e = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$e.apply(this, arguments);
}
var FORM_BIND_FORM_ITEM_KEY = Symbol("FORM_BIND_FORM_ITEM_KEY");
function useForm() {
  var {
    parentProvider,
    index,
    bindParent
  } = useParent(FORM_BIND_FORM_ITEM_KEY);
  var instance = vue.getCurrentInstance();
  var bindForm = bindParent ? (formItemProvider) => {
    bindParent(_extends$e({}, formItemProvider, {
      instance
    }));
  } : null;
  return {
    index,
    form: parentProvider,
    bindForm
  };
}
function useFormItems() {
  var {
    childProviders,
    length,
    bindChildren
  } = useChildren(FORM_BIND_FORM_ITEM_KEY);
  return {
    length,
    formItems: childProviders,
    bindFormItems: bindChildren
  };
}
var {
  n: n$Z,
  classes: classes$O
} = createNamespace("checkbox");
function __render__$Z(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  var _component_var_hover_overlay = vue.resolveComponent("var-hover-overlay");
  var _component_var_form_details = vue.resolveComponent("var-form-details");
  var _directive_hover = vue.resolveDirective("hover");
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n("wrap")),
      onClick: _cache[0] || (_cache[0] = function() {
        return _ctx.handleClick && _ctx.handleClick(...arguments);
      })
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n())
      },
      [vue.withDirectives((vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("action"), [_ctx.checked, _ctx.n("--checked"), _ctx.n("--unchecked")], [_ctx.errorMessage || _ctx.checkboxGroupErrorMessage, _ctx.n("--error")], [_ctx.formDisabled || _ctx.disabled, _ctx.n("--disabled")])),
          style: vue.normalizeStyle({
            color: _ctx.checked ? _ctx.checkedColor : _ctx.uncheckedColor
          })
        },
        [_ctx.checked ? vue.renderSlot(_ctx.$slots, "checked-icon", {
          key: 0
        }, () => [vue.createVNode(_component_var_icon, {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("icon"), [_ctx.withAnimation, _ctx.n("--with-animation")])),
          name: "checkbox-marked",
          size: _ctx.iconSize,
          "var-checkbox-cover": ""
        }, null, 8, ["class", "size"])]) : vue.renderSlot(_ctx.$slots, "unchecked-icon", {
          key: 1
        }, () => [vue.createVNode(_component_var_icon, {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("icon"), [_ctx.withAnimation, _ctx.n("--with-animation")])),
          name: "checkbox-blank-outline",
          size: _ctx.iconSize,
          "var-checkbox-cover": ""
        }, null, 8, ["class", "size"])]), vue.createVNode(_component_var_hover_overlay, {
          hovering: !_ctx.disabled && !_ctx.formDisabled && _ctx.hovering
        }, null, 8, ["hovering"])],
        6
        /* CLASS, STYLE */
      )), [[_directive_hover, _ctx.handleHovering, "desktop"], [_directive_ripple, {
        disabled: _ctx.formReadonly || _ctx.readonly || _ctx.formDisabled || _ctx.disabled || !_ctx.ripple
      }]]), vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("text"), [_ctx.errorMessage || _ctx.checkboxGroupErrorMessage, _ctx.n("--error")], [_ctx.formDisabled || _ctx.disabled, _ctx.n("--disabled")]))
        },
        [vue.renderSlot(_ctx.$slots, "default")],
        2
        /* CLASS */
      )],
      2
      /* CLASS */
    ), vue.createVNode(_component_var_form_details, {
      "error-message": _ctx.errorMessage
    }, null, 8, ["error-message"])],
    2
    /* CLASS */
  );
}
var __sfc__$_ = vue.defineComponent({
  name: "VarCheckbox",
  directives: {
    Ripple: Ripple$1,
    Hover: Hover$1
  },
  components: {
    VarIcon: Icon,
    VarFormDetails: FormDetails,
    VarHoverOverlay: HoverOverlay
  },
  props: props$S,
  setup(props2) {
    var value = vue.ref(false);
    var checked = vue.computed(() => value.value === props2.checkedValue);
    var checkedValue = vue.computed(() => props2.checkedValue);
    var withAnimation = vue.ref(false);
    var {
      checkboxGroup: checkboxGroup2,
      bindCheckboxGroup
    } = useCheckboxGroup();
    var {
      hovering,
      handleHovering
    } = useHoverOverlay();
    var {
      form,
      bindForm
    } = useForm();
    var {
      errorMessage,
      validateWithTrigger: vt,
      validate: v,
      // expose
      resetValidation
    } = useValidation();
    var validateWithTrigger = (trigger) => {
      vue.nextTick(() => {
        var {
          validateTrigger,
          rules,
          modelValue
        } = props2;
        vt(validateTrigger, trigger, rules, modelValue);
      });
    };
    var change = (changedValue) => {
      value.value = changedValue;
      var {
        checkedValue: checkedValue2,
        onChange
      } = props2;
      call(props2["onUpdate:modelValue"], value.value);
      call(onChange, value.value);
      validateWithTrigger("onChange");
      changedValue === checkedValue2 ? checkboxGroup2 == null ? void 0 : checkboxGroup2.onChecked(checkedValue2) : checkboxGroup2 == null ? void 0 : checkboxGroup2.onUnchecked(checkedValue2);
    };
    var handleClick = (e) => {
      var {
        disabled,
        readonly,
        checkedValue: checkedValue2,
        uncheckedValue,
        onClick
      } = props2;
      if (form != null && form.disabled.value || disabled) {
        return;
      }
      call(onClick, e);
      if (form != null && form.readonly.value || readonly) {
        return;
      }
      withAnimation.value = true;
      var maximum = checkboxGroup2 ? checkboxGroup2.checkedCount.value >= Number(checkboxGroup2.max.value) : false;
      if (!checked.value && maximum) {
        return;
      }
      change(checked.value ? uncheckedValue : checkedValue2);
    };
    var sync = (values) => {
      var {
        checkedValue: checkedValue2,
        uncheckedValue
      } = props2;
      value.value = values.includes(checkedValue2) ? checkedValue2 : uncheckedValue;
    };
    var resetWithAnimation = () => {
      withAnimation.value = false;
    };
    var reset = () => {
      call(props2["onUpdate:modelValue"], props2.uncheckedValue);
      resetValidation();
    };
    var toggle = (changedValue) => {
      var {
        checkedValue: checkedValue2,
        uncheckedValue
      } = props2;
      var shouldReverse = ![checkedValue2, uncheckedValue].includes(changedValue);
      if (shouldReverse) {
        changedValue = checked.value ? uncheckedValue : checkedValue2;
      }
      change(changedValue);
    };
    var validate = () => v(props2.rules, props2.modelValue);
    vue.watch(() => props2.modelValue, (newValue) => {
      value.value = newValue;
    }, {
      immediate: true
    });
    var checkboxProvider = {
      checkedValue,
      checked,
      sync,
      validate,
      resetValidation,
      reset,
      resetWithAnimation
    };
    call(bindCheckboxGroup, checkboxProvider);
    call(bindForm, checkboxProvider);
    return {
      withAnimation,
      checked,
      errorMessage,
      checkboxGroupErrorMessage: checkboxGroup2 == null ? void 0 : checkboxGroup2.errorMessage,
      formDisabled: form == null ? void 0 : form.disabled,
      formReadonly: form == null ? void 0 : form.readonly,
      hovering,
      handleHovering,
      n: n$Z,
      classes: classes$O,
      handleClick,
      toggle,
      reset,
      validate,
      resetValidation
    };
  }
});
__sfc__$_.render = __render__$Z;
const Checkbox = __sfc__$_;
Checkbox.install = function(app) {
  app.component(Checkbox.name, Checkbox);
};
var _CheckboxComponent = Checkbox;
function directionValidator$5(direction) {
  return ["horizontal", "vertical"].includes(direction);
}
var props$R = {
  modelValue: {
    type: Array,
    default: () => []
  },
  max: {
    type: [String, Number]
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: directionValidator$5
  },
  validateTrigger: {
    type: Array,
    default: ["onChange"]
  },
  rules: {
    type: Array
  },
  onChange: defineListenerProp(),
  "onUpdate:modelValue": defineListenerProp()
};
var {
  n: n$Y,
  classes: classes$N
} = createNamespace("checkbox-group");
function __render__$Y(_ctx, _cache) {
  var _component_var_form_details = vue.resolveComponent("var-form-details");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n("wrap"))
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("--" + _ctx.direction)))
      },
      [vue.renderSlot(_ctx.$slots, "default")],
      2
      /* CLASS */
    ), vue.createVNode(_component_var_form_details, {
      "error-message": _ctx.errorMessage
    }, null, 8, ["error-message"])],
    2
    /* CLASS */
  );
}
var __sfc__$Z = vue.defineComponent({
  name: "VarCheckboxGroup",
  components: {
    VarFormDetails: FormDetails
  },
  props: props$R,
  setup(props2) {
    var max2 = vue.computed(() => props2.max);
    var checkedCount = vue.computed(() => props2.modelValue.length);
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
    var checkboxGroupErrorMessage = vue.computed(() => errorMessage.value);
    var validateWithTrigger = (trigger) => {
      vue.nextTick(() => {
        var {
          validateTrigger,
          rules,
          modelValue
        } = props2;
        vt(validateTrigger, trigger, rules, modelValue);
      });
    };
    var change = (changedModelValue) => {
      call(props2["onUpdate:modelValue"], changedModelValue);
      call(props2.onChange, changedModelValue);
      validateWithTrigger("onChange");
    };
    var onChecked = (changedValue) => {
      var {
        modelValue
      } = props2;
      if (!modelValue.includes(changedValue)) {
        change([...modelValue, changedValue]);
      }
    };
    var onUnchecked = (changedValue) => {
      var {
        modelValue
      } = props2;
      if (!modelValue.includes(changedValue)) {
        return;
      }
      change(modelValue.filter((value) => value !== changedValue));
    };
    var syncCheckboxes = () => checkboxes.forEach((_ref) => {
      var {
        sync
      } = _ref;
      return sync(props2.modelValue);
    });
    var resetWithAnimation = () => {
      checkboxes.forEach((checkbox2) => checkbox2.resetWithAnimation());
    };
    var checkAll2 = () => {
      var checkedValues = checkboxes.map((_ref2) => {
        var {
          checkedValue
        } = _ref2;
        return checkedValue.value;
      });
      var changedModelValue = uniq(checkedValues);
      resetWithAnimation();
      call(props2["onUpdate:modelValue"], changedModelValue);
      return changedModelValue;
    };
    var inverseAll = () => {
      var checkedValues = checkboxes.filter((_ref3) => {
        var {
          checked
        } = _ref3;
        return !checked.value;
      }).map((_ref4) => {
        var {
          checkedValue
        } = _ref4;
        return checkedValue.value;
      });
      var changedModelValue = uniq(checkedValues);
      resetWithAnimation();
      call(props2["onUpdate:modelValue"], changedModelValue);
      return changedModelValue;
    };
    var reset = () => {
      call(props2["onUpdate:modelValue"], []);
      resetValidation();
    };
    var validate = () => v(props2.rules, props2.modelValue);
    vue.watch(() => props2.modelValue, syncCheckboxes, {
      deep: true
    });
    vue.watch(() => length.value, syncCheckboxes);
    var checkboxGroupProvider = {
      max: max2,
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
      n: n$Y,
      classes: classes$N,
      checkAll: checkAll2,
      inverseAll,
      reset,
      validate,
      resetValidation
    };
  }
});
__sfc__$Z.render = __render__$Y;
const CheckboxGroup = __sfc__$Z;
CheckboxGroup.install = function(app) {
  app.component(CheckboxGroup.name, CheckboxGroup);
};
var _CheckboxGroupComponent = CheckboxGroup;
function typeValidator$6(type) {
  return ["default", "primary", "info", "success", "warning", "danger"].includes(type);
}
function sizeValidator$1(size) {
  return ["normal", "mini", "small", "large"].includes(size);
}
var props$Q = {
  type: {
    type: String,
    default: "default",
    validator: typeValidator$6
  },
  size: {
    type: String,
    default: "normal",
    validator: sizeValidator$1
  },
  color: {
    type: String
  },
  textColor: {
    type: String
  },
  iconName: pickProps(props$18, "name"),
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: true
  },
  block: {
    type: Boolean,
    default: false
  },
  closable: {
    type: Boolean,
    default: false
  },
  onClose: defineListenerProp()
};
var {
  n: n$X,
  classes: classes$M
} = createNamespace("chip");
function __render__$X(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  return vue.openBlock(), vue.createBlock(vue.Transition, {
    name: _ctx.n("$-fade")
  }, {
    default: vue.withCtx(() => [vue.createElementVNode(
      "span",
      vue.mergeProps({
        class: _ctx.classes(_ctx.n(), _ctx.n("$--box"), ..._ctx.contentClass),
        style: _ctx.chipStyles
      }, _ctx.$attrs),
      [vue.renderSlot(_ctx.$slots, "left"), vue.createElementVNode(
        "span",
        {
          class: vue.normalizeClass(_ctx.n("text-" + _ctx.size))
        },
        [vue.renderSlot(_ctx.$slots, "default")],
        2
        /* CLASS */
      ), vue.renderSlot(_ctx.$slots, "right"), _ctx.closable ? (vue.openBlock(), vue.createElementBlock(
        "span",
        {
          key: 0,
          class: vue.normalizeClass(_ctx.n("--close")),
          onClick: _cache[0] || (_cache[0] = function() {
            return _ctx.handleClose && _ctx.handleClose(...arguments);
          })
        },
        [vue.createVNode(_component_var_icon, {
          name: "" + (_ctx.iconName ? _ctx.iconName : "close-circle")
        }, null, 8, ["name"])],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true)],
      16
      /* FULL_PROPS */
    )]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
var __sfc__$Y = vue.defineComponent({
  name: "VarChip",
  components: {
    VarIcon: Icon
  },
  inheritAttrs: false,
  props: props$Q,
  setup(props2) {
    var chipStyles = vue.computed(() => {
      var {
        plain,
        textColor,
        color
      } = props2;
      if (plain) {
        return {
          color: textColor || color,
          borderColor: color
        };
      }
      return {
        color: textColor,
        background: color
      };
    });
    var contentClass = vue.computed(() => {
      var {
        size,
        block,
        type,
        plain,
        round: round2
      } = props2;
      var blockClass = block ? n$X("$--flex") : n$X("$--inline-flex");
      var plainTypeClass = plain ? n$X("plain") + " " + n$X("plain-" + type) : n$X("--" + type);
      var roundClass = round2 ? n$X("--round") : null;
      return [n$X("--" + size), blockClass, plainTypeClass, roundClass];
    });
    var handleClose = (e) => {
      call(props2.onClose, e);
    };
    return {
      n: n$X,
      classes: classes$M,
      chipStyles,
      contentClass,
      handleClose
    };
  }
});
__sfc__$Y.render = __render__$X;
const Chip = __sfc__$Y;
Chip.install = function(app) {
  app.component(Chip.name, Chip);
};
var _ChipComponent = Chip;
function directionValidator$4(direction) {
  return ["row", "column"].includes(direction);
}
function justifyValidator$2(justify) {
  return ["start", "end", "center", "space-around", "space-between", "flex-start", "flex-end"].includes(justify);
}
function alignValidator$2(align) {
  return ["stretch", "center", "start", "end", "baseline", "initial", "inherit", "flex-start", "flex-end"].includes(align);
}
var props$P = {
  span: {
    type: [String, Number],
    default: 24
  },
  offset: {
    type: [String, Number],
    default: 0
  },
  direction: {
    type: String,
    default: "row",
    validator: directionValidator$4
  },
  justify: {
    type: String,
    validator: justifyValidator$2
  },
  align: {
    type: String,
    validator: alignValidator$2
  },
  xs: {
    type: [Object, Number, String]
  },
  sm: {
    type: [Object, Number, String]
  },
  md: {
    type: [Object, Number, String]
  },
  lg: {
    type: [Object, Number, String]
  },
  xl: {
    type: [Object, Number, String]
  },
  onClick: defineListenerProp()
};
var ROW_BIND_COL_KEY = Symbol("ROW_BIND_COL_KEY");
function useCols() {
  var {
    bindChildren,
    childProviders,
    length
  } = useChildren(ROW_BIND_COL_KEY);
  return {
    length,
    cols: childProviders,
    bindCols: bindChildren
  };
}
function useRow() {
  var {
    parentProvider,
    index,
    bindParent
  } = useParent(ROW_BIND_COL_KEY);
  return {
    index,
    row: parentProvider,
    bindRow: bindParent
  };
}
var {
  n: n$W,
  classes: classes$L
} = createNamespace("col");
function __render__$W(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"), [_ctx.span >= 0, _ctx.n("--span-" + _ctx.span)], [_ctx.offset, _ctx.n("--offset-" + _ctx.offset)], ..._ctx.getSize("xs", _ctx.xs), ..._ctx.getSize("sm", _ctx.sm), ..._ctx.getSize("md", _ctx.md), ..._ctx.getSize("lg", _ctx.lg), ..._ctx.getSize("xl", _ctx.xl))),
      style: vue.normalizeStyle({
        flexDirection: _ctx.direction,
        justifyContent: _ctx.padStartFlex(_ctx.justify),
        alignItems: _ctx.padStartFlex(_ctx.align),
        paddingLeft: _ctx.toSizeUnit(_ctx.padding.left),
        paddingRight: _ctx.toSizeUnit(_ctx.padding.right)
      }),
      onClick: _cache[0] || (_cache[0] = function() {
        return _ctx.handleClick && _ctx.handleClick(...arguments);
      })
    },
    [vue.renderSlot(_ctx.$slots, "default")],
    6
    /* CLASS, STYLE */
  );
}
var __sfc__$X = vue.defineComponent({
  name: "VarCol",
  props: props$P,
  setup(props2) {
    var padding = vue.ref({
      left: 0,
      right: 0
    });
    var span = vue.computed(() => toNumber(props2.span));
    var offset2 = vue.computed(() => toNumber(props2.offset));
    var {
      row: row2,
      bindRow
    } = useRow();
    var colProvider = {
      setPadding(pad) {
        padding.value = pad;
      }
    };
    var getSize = (mode, size) => {
      var classes2 = [];
      if (size == null) {
        return classes2;
      }
      if (isPlainObject(size)) {
        var {
          offset: _offset,
          span: _span
        } = size;
        Number(_span) >= 0 && classes2.push(n$W("--span-" + mode + "-" + _span));
        _offset && classes2.push(n$W("--offset-" + mode + "-" + _offset));
      } else {
        Number(size) >= 0 && classes2.push(n$W("--span-" + mode + "-" + size));
      }
      return classes2;
    };
    var handleClick = (e) => {
      call(props2.onClick, e);
    };
    vue.watch([() => props2.span, () => props2.offset], () => {
      row2 == null ? void 0 : row2.computePadding();
    });
    call(bindRow, colProvider);
    return {
      n: n$W,
      classes: classes$L,
      padding,
      toNumber,
      toSizeUnit,
      getSize,
      span,
      offset: offset2,
      handleClick,
      padStartFlex
    };
  }
});
__sfc__$X.render = __render__$W;
const Col = __sfc__$X;
Col.install = function(app) {
  app.component(Col.name, Col);
};
var _ColComponent = Col;
var COLLAPSE_BIND_COLLAPSE_ITEM_KEY = Symbol("COLLAPSE_BIND_COLLAPSE_ITEM_KEY");
function useCollapseItem() {
  var {
    childProviders,
    length,
    bindChildren
  } = useChildren(COLLAPSE_BIND_COLLAPSE_ITEM_KEY);
  return {
    length,
    collapseItem: childProviders,
    bindCollapseItem: bindChildren
  };
}
var props$O = {
  modelValue: {
    type: [Array, String, Number]
  },
  accordion: {
    type: Boolean,
    default: false
  },
  offset: {
    type: Boolean,
    default: true
  },
  divider: {
    type: Boolean,
    default: true
  },
  elevation: {
    type: [Boolean, String, Number],
    default: true
  },
  onChange: defineListenerProp(),
  "onUpdate:modelValue": defineListenerProp()
};
var {
  n: n$V
} = createNamespace("collapse");
function __render__$V(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n())
    },
    [vue.renderSlot(_ctx.$slots, "default")],
    2
    /* CLASS */
  );
}
var __sfc__$W = vue.defineComponent({
  name: "VarCollapse",
  props: props$O,
  setup(props2) {
    var {
      length,
      collapseItem: collapseItem2,
      bindCollapseItem
    } = useCollapseItem();
    var active = vue.computed(() => props2.modelValue);
    var offset2 = vue.computed(() => props2.offset);
    var divider2 = vue.computed(() => props2.divider);
    var elevation2 = vue.computed(() => props2.elevation);
    var checkValue = () => {
      if (!props2.accordion && !isArray(props2.modelValue)) {
        console.error('[Varlet] Collapse: type of prop "modelValue" should be an Array');
        return false;
      }
      if (props2.accordion && isArray(props2.modelValue)) {
        console.error('[Varlet] Collapse: type of prop "modelValue" should be a String or Number');
        return false;
      }
      return true;
    };
    var getValue = (value, isExpand) => {
      if (!checkValue())
        return null;
      if (isExpand)
        return props2.accordion ? value : [...props2.modelValue, value];
      return props2.accordion ? null : props2.modelValue.filter((name) => name !== value);
    };
    var updateItem = (value, isExpand) => {
      var modelValue = getValue(value, isExpand);
      call(props2["onUpdate:modelValue"], modelValue);
      call(props2.onChange, modelValue);
    };
    var matchName = () => {
      if (props2.accordion) {
        return collapseItem2.find((_ref) => {
          var {
            name
          } = _ref;
          return props2.modelValue === name.value;
        });
      }
      var filterItem = collapseItem2.filter((_ref2) => {
        var {
          name
        } = _ref2;
        if (name.value === void 0)
          return false;
        return props2.modelValue.includes(name.value);
      });
      return filterItem.length ? filterItem : void 0;
    };
    var matchIndex = () => {
      if (props2.accordion) {
        return collapseItem2.find((_ref3) => {
          var {
            index,
            name
          } = _ref3;
          return name.value === void 0 && props2.modelValue === index.value;
        });
      }
      return collapseItem2.filter((_ref4) => {
        var {
          index,
          name
        } = _ref4;
        return name.value === void 0 && props2.modelValue.includes(index.value);
      });
    };
    var resize = () => {
      if (!checkValue())
        return;
      var matchProviders = matchName() || matchIndex();
      if (props2.accordion && !matchProviders || !props2.accordion && !matchProviders.length) {
        collapseItem2.forEach((provider) => {
          provider.init(props2.accordion, false);
        });
        return;
      }
      collapseItem2.forEach((provider) => {
        var isShow = props2.accordion ? matchProviders === provider : matchProviders.includes(provider);
        provider.init(props2.accordion, isShow);
      });
    };
    var collapseProvider = {
      active,
      offset: offset2,
      divider: divider2,
      elevation: elevation2,
      updateItem
    };
    bindCollapseItem(collapseProvider);
    vue.watch(() => length.value, () => vue.nextTick().then(resize));
    vue.watch(() => props2.modelValue, () => vue.nextTick().then(resize));
    return {
      n: n$V,
      divider: divider2
    };
  }
});
__sfc__$W.render = __render__$V;
const Collapse = __sfc__$W;
Collapse.install = function(app) {
  app.component(Collapse.name, Collapse);
};
var _CollapseComponent = Collapse;
function useCollapse() {
  var {
    parentProvider,
    index,
    bindParent
  } = useParent(COLLAPSE_BIND_COLLAPSE_ITEM_KEY);
  if (!bindParent) {
    error$1("Collapse", "<var-collapse-item/> must in <var-collapse>");
  }
  return {
    index,
    collapse: parentProvider,
    bindCollapse: bindParent
  };
}
var props$N = {
  name: {
    type: [String, Number]
  },
  title: {
    type: String
  },
  icon: {
    type: String,
    default: "chevron-down"
  },
  disabled: {
    type: Boolean,
    default: false
  }
};
var {
  n: n$U,
  classes: classes$K
} = createNamespace("collapse-item");
function __render__$U(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), [_ctx.offset && _ctx.isShow, _ctx.n("--active")], [_ctx.disabled, _ctx.n("--disable")])),
      style: vue.normalizeStyle("--collapse-divider-top: " + (_ctx.divider ? "var(--collapse-border-top)" : "none"))
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.classes(_ctx.n("shadow"), _ctx.formatElevation(_ctx.elevation, 2)))
      },
      null,
      2
      /* CLASS */
    ), vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("header")),
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.toggle())
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("header-title"))
        },
        [vue.renderSlot(_ctx.$slots, "title", {}, () => [vue.createTextVNode(
          vue.toDisplayString(_ctx.title),
          1
          /* TEXT */
        )])],
        2
        /* CLASS */
      ), vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("header-icon"))
        },
        [vue.renderSlot(_ctx.$slots, "icon", {}, () => [vue.createVNode(_component_var_icon, {
          name: _ctx.icon,
          transition: 250,
          class: vue.normalizeClass(_ctx.classes(_ctx.n("header-icon"), [_ctx.isShow && _ctx.icon === "chevron-down", _ctx.n("header-open")], [_ctx.disabled, _ctx.n("header--disable")]))
        }, null, 8, ["name", "class"])])],
        2
        /* CLASS */
      )],
      2
      /* CLASS */
    ), vue.withDirectives(vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("content")),
        ref: "contentEl",
        onTransitionend: _cache[1] || (_cache[1] = function() {
          return _ctx.transitionend && _ctx.transitionend(...arguments);
        }),
        onTransitionstart: _cache[2] || (_cache[2] = function() {
          return _ctx.start && _ctx.start(...arguments);
        })
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("content-wrap"))
        },
        [vue.renderSlot(_ctx.$slots, "default")],
        2
        /* CLASS */
      )],
      34
      /* CLASS, HYDRATE_EVENTS */
    ), [[vue.vShow, _ctx.showContent]])],
    6
    /* CLASS, STYLE */
  );
}
var __sfc__$V = vue.defineComponent({
  name: "VarCollapseItem",
  components: {
    VarIcon: Icon
  },
  props: props$N,
  setup(props2) {
    var {
      index,
      collapse: collapse2,
      bindCollapse
    } = useCollapse();
    var isInitToTrigger = true;
    var contentEl = vue.ref(null);
    var showContent = vue.ref(false);
    var isShow = vue.ref(false);
    var {
      active,
      offset: offset2,
      divider: divider2,
      elevation: elevation2,
      updateItem
    } = collapse2;
    var name = vue.computed(() => props2.name);
    var init = (accordion, show) => {
      if (active.value === void 0 || accordion && isArray(active.value) || show === isShow.value)
        return;
      isShow.value = show;
      toggle(true);
    };
    var toggle = (initOrAccordion) => {
      if (props2.disabled)
        return;
      if (!initOrAccordion) {
        updateItem(props2.name || index.value, !isShow.value);
      }
    };
    var openPanel = () => {
      if (!contentEl.value)
        return;
      contentEl.value.style.height = "";
      showContent.value = true;
      requestAnimationFrame(() => {
        var {
          offsetHeight
        } = contentEl.value;
        contentEl.value.style.height = 0 + "px";
        requestAnimationFrame(() => {
          contentEl.value.style.height = offsetHeight + "px";
          if (!isInitToTrigger)
            return;
          nextTickFrame(() => {
            if (isInitToTrigger)
              transitionend();
          });
        });
      });
    };
    var start2 = () => {
      isInitToTrigger = false;
    };
    var closePanel = () => {
      if (!contentEl.value)
        return;
      var {
        offsetHeight
      } = contentEl.value;
      contentEl.value.style.height = offsetHeight + "px";
      requestAnimationFrame(() => {
        contentEl.value.style.height = 0 + "px";
      });
    };
    var transitionend = () => {
      if (!isShow.value) {
        showContent.value = false;
      }
      contentEl.value.style.height = "";
    };
    var collapseItemProvider = {
      index,
      name,
      init
    };
    bindCollapse(collapseItemProvider);
    vue.watch(isShow, (value) => {
      if (value)
        openPanel();
      else
        closePanel();
    });
    return {
      n: n$U,
      start: start2,
      classes: classes$K,
      showContent,
      isShow,
      offset: offset2,
      divider: divider2,
      elevation: elevation2,
      toggle,
      contentEl,
      transitionend,
      formatElevation
    };
  }
});
__sfc__$V.render = __render__$U;
const CollapseItem = __sfc__$V;
CollapseItem.install = function(app) {
  app.component(CollapseItem.name, CollapseItem);
};
var _CollapseItemComponent = CollapseItem;
var props$M = {
  time: {
    type: [String, Number],
    default: 0
  },
  format: {
    type: String,
    default: "HH : mm : ss"
  },
  autoStart: {
    type: Boolean,
    default: true
  },
  onEnd: defineListenerProp(),
  onChange: defineListenerProp()
};
var {
  n: n$T
} = createNamespace("countdown");
var SECOND = 1e3;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
function __render__$T(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n())
    },
    [vue.renderSlot(_ctx.$slots, "default", vue.normalizeProps(vue.guardReactiveProps(_ctx.timeData)), () => [vue.createTextVNode(
      vue.toDisplayString(_ctx.showTime),
      1
      /* TEXT */
    )])],
    2
    /* CLASS */
  );
}
var __sfc__$U = vue.defineComponent({
  name: "VarCountdown",
  props: props$M,
  setup(props2) {
    var showTime = vue.ref("");
    var timeData = vue.ref({
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
    var parseFormat = (format2, time) => {
      var scannedTimes = Object.values(time);
      var scannedFormats = ["DD", "HH", "mm", "ss"];
      var padValues = [24, 60, 60, 1e3];
      scannedFormats.forEach((scannedFormat, index) => {
        if (!format2.includes(scannedFormat)) {
          scannedTimes[index + 1] += scannedTimes[index] * padValues[index];
        } else {
          format2 = format2.replace(scannedFormat, padStart$1("" + scannedTimes[index], 2, "0"));
        }
      });
      if (format2.includes("S")) {
        var ms = padStart$1("" + scannedTimes[scannedTimes.length - 1], 3, "0");
        if (format2.includes("SSS")) {
          format2 = format2.replace("SSS", ms);
        } else if (format2.includes("SS")) {
          format2 = format2.replace("SS", ms.slice(0, 2));
        } else {
          format2 = format2.replace("S", ms.slice(0, 1));
        }
      }
      return format2;
    };
    var displayTime = (durationTime) => {
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
      call(props2.onChange, timeData.value);
      showTime.value = parseFormat(props2.format, time);
    };
    var countdown = () => {
      var {
        time,
        onEnd
      } = props2;
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
    var start2 = function(resume) {
      if (resume === void 0) {
        resume = false;
      }
      if (isStart && !resume) {
        return;
      }
      isStart = true;
      endTime = performance.now() + (remainingTime || toNumber(props2.time));
      countdown();
    };
    var pause = () => {
      isStart = false;
      cancelAnimationFrame(handle);
    };
    var reset = () => {
      endTime = 0;
      isStart = false;
      cancelAnimationFrame(handle);
      countdown();
    };
    vue.watch(() => props2.time, () => {
      reset();
      if (props2.autoStart) {
        start2();
      }
    }, {
      immediate: true
    });
    vue.onActivated(() => {
      if (cacheIsStart == null) {
        return;
      }
      isStart = cacheIsStart;
      if (isStart === true) {
        start2(true);
      }
    });
    vue.onDeactivated(() => {
      cacheIsStart = isStart;
      pause();
    });
    vue.onUnmounted(pause);
    return {
      showTime,
      timeData,
      n: n$T,
      start: start2,
      pause,
      reset
    };
  }
});
__sfc__$U.render = __render__$T;
const Countdown = __sfc__$U;
Countdown.install = function(app) {
  app.component(Countdown.name, Countdown);
};
var _CountdownComponent = Countdown;
/*!
 *  decimal.js v10.4.3
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
var EXP_LIMIT = 9e15, MAX_DIGITS = 1e9, NUMERALS = "0123456789abcdef", LN10 = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", DEFAULTS = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed at run-time using the `Decimal.config` method.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used when rounding to `precision`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The modulo mode used when calculating the modulus: a mod n.
  // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
  // The remainder (r) is calculated as: r = a - n * q.
  //
  // UP         0 The remainder is positive if the dividend is negative, else is negative.
  // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
  // FLOOR      3 The remainder has the same sign as the divisor (Python %).
  // HALF_EVEN  6 The IEEE 754 remainder function.
  // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
  //
  // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
  // division (9) are commonly used for the modulus operation. The other rounding modes can also
  // be used, but they may not give useful results.
  modulo: 1,
  // 0 to 9
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -EXP_LIMIT
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to EXP_LIMIT
  // The minimum exponent value, beneath which underflow to zero occurs.
  // JavaScript numbers: -324  (5e-324)
  minE: -EXP_LIMIT,
  // -1 to -EXP_LIMIT
  // The maximum exponent value, above which overflow to Infinity occurs.
  // JavaScript numbers: 308  (1.7976931348623157e+308)
  maxE: EXP_LIMIT,
  // 1 to EXP_LIMIT
  // Whether to use cryptographically-secure random number generation, if available.
  crypto: false
  // true/false
}, inexact, quadrant, external = true, decimalError = "[DecimalError] ", invalidArgument = decimalError + "Invalid argument: ", precisionLimitExceeded = decimalError + "Precision limit exceeded", cryptoUnavailable = decimalError + "crypto unavailable", tag = "[object Decimal]", mathfloor = Math.floor, mathpow = Math.pow, isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, BASE = 1e7, LOG_BASE = 7, MAX_SAFE_INTEGER = 9007199254740991, LN10_PRECISION = LN10.length - 1, PI_PRECISION = PI.length - 1, P = { toStringTag: tag };
P.absoluteValue = P.abs = function() {
  var x = new this.constructor(this);
  if (x.s < 0)
    x.s = 1;
  return finalise(x);
};
P.ceil = function() {
  return finalise(new this.constructor(this), this.e + 1, 2);
};
P.clampedTo = P.clamp = function(min2, max2) {
  var k, x = this, Ctor = x.constructor;
  min2 = new Ctor(min2);
  max2 = new Ctor(max2);
  if (!min2.s || !max2.s)
    return new Ctor(NaN);
  if (min2.gt(max2))
    throw Error(invalidArgument + max2);
  k = x.cmp(min2);
  return k < 0 ? min2 : x.cmp(max2) > 0 ? max2 : new Ctor(x);
};
P.comparedTo = P.cmp = function(y) {
  var i, j, xdL, ydL, x = this, xd = x.d, yd = (y = new x.constructor(y)).d, xs = x.s, ys = y.s;
  if (!xd || !yd) {
    return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
  }
  if (!xd[0] || !yd[0])
    return xd[0] ? xs : yd[0] ? -ys : 0;
  if (xs !== ys)
    return xs;
  if (x.e !== y.e)
    return x.e > y.e ^ xs < 0 ? 1 : -1;
  xdL = xd.length;
  ydL = yd.length;
  for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
    if (xd[i] !== yd[i])
      return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
  }
  return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
};
P.cosine = P.cos = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.d)
    return new Ctor(NaN);
  if (!x.d[0])
    return new Ctor(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
};
P.cubeRoot = P.cbrt = function() {
  var e, m, n2, r, rep, s, sd, t, t3, t3plusx, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  external = false;
  s = x.s * mathpow(x.s * x, 1 / 3);
  if (!s || Math.abs(s) == 1 / 0) {
    n2 = digitsToString(x.d);
    e = x.e;
    if (s = (e - n2.length + 1) % 3)
      n2 += s == 1 || s == -2 ? "0" : "00";
    s = mathpow(n2, 1 / 3);
    e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));
    if (s == 1 / 0) {
      n2 = "5e" + e;
    } else {
      n2 = s.toExponential();
      n2 = n2.slice(0, n2.indexOf("e") + 1) + e;
    }
    r = new Ctor(n2);
    r.s = x.s;
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    t3 = t.times(t).times(t);
    t3plusx = t3.plus(x);
    r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
    if (digitsToString(t.d).slice(0, sd) === (n2 = digitsToString(r.d)).slice(0, sd)) {
      n2 = n2.slice(sd - 3, sd + 1);
      if (n2 == "9999" || !rep && n2 == "4999") {
        if (!rep) {
          finalise(t, e + 1, 0);
          if (t.times(t).times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n2 || !+n2.slice(1) && n2.charAt(0) == "5") {
          finalise(r, e + 1, 1);
          m = !r.times(r).times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e, Ctor.rounding, m);
};
P.decimalPlaces = P.dp = function() {
  var w, d = this.d, n2 = NaN;
  if (d) {
    w = d.length - 1;
    n2 = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;
    w = d[w];
    if (w)
      for (; w % 10 == 0; w /= 10)
        n2--;
    if (n2 < 0)
      n2 = 0;
  }
  return n2;
};
P.dividedBy = P.div = function(y) {
  return divide(this, new this.constructor(y));
};
P.dividedToIntegerBy = P.divToInt = function(y) {
  var x = this, Ctor = x.constructor;
  return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
};
P.equals = P.eq = function(y) {
  return this.cmp(y) === 0;
};
P.floor = function() {
  return finalise(new this.constructor(this), this.e + 1, 3);
};
P.greaterThan = P.gt = function(y) {
  return this.cmp(y) > 0;
};
P.greaterThanOrEqualTo = P.gte = function(y) {
  var k = this.cmp(y);
  return k == 1 || k === 0;
};
P.hyperbolicCosine = P.cosh = function() {
  var k, n2, pr, rm, len, x = this, Ctor = x.constructor, one = new Ctor(1);
  if (!x.isFinite())
    return new Ctor(x.s ? 1 / 0 : NaN);
  if (x.isZero())
    return one;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    n2 = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    n2 = "2.3283064365386962890625e-10";
  }
  x = taylorSeries(Ctor, 1, x.times(n2), new Ctor(1), true);
  var cosh2_x, i = k, d8 = new Ctor(8);
  for (; i--; ) {
    cosh2_x = x.times(x);
    x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
  }
  return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.hyperbolicSine = P.sinh = function() {
  var k, pr, rm, len, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;
  if (len < 3) {
    x = taylorSeries(Ctor, 2, x, x, true);
  } else {
    k = 1.4 * Math.sqrt(len);
    k = k > 16 ? 16 : k | 0;
    x = x.times(1 / tinyPow(5, k));
    x = taylorSeries(Ctor, 2, x, x, true);
    var sinh2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
    for (; k--; ) {
      sinh2_x = x.times(x);
      x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
    }
  }
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(x, pr, rm, true);
};
P.hyperbolicTangent = P.tanh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(x.s);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 7;
  Ctor.rounding = 1;
  return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
};
P.inverseCosine = P.acos = function() {
  var halfPi, x = this, Ctor = x.constructor, k = x.abs().cmp(1), pr = Ctor.precision, rm = Ctor.rounding;
  if (k !== -1) {
    return k === 0 ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0) : new Ctor(NaN);
  }
  if (x.isZero())
    return getPi(Ctor, pr + 4, rm).times(0.5);
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x = x.asin();
  halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return halfPi.minus(x);
};
P.inverseHyperbolicCosine = P.acosh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (x.lte(1))
    return new Ctor(x.eq(1) ? 0 : NaN);
  if (!x.isFinite())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
  Ctor.rounding = 1;
  external = false;
  x = x.times(x).minus(1).sqrt().plus(x);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.ln();
};
P.inverseHyperbolicSine = P.asinh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
  Ctor.rounding = 1;
  external = false;
  x = x.times(x).plus(1).sqrt().plus(x);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.ln();
};
P.inverseHyperbolicTangent = P.atanh = function() {
  var pr, rm, wpr, xsd, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.e >= 0)
    return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  xsd = x.sd();
  if (Math.max(xsd, pr) < 2 * -x.e - 1)
    return finalise(new Ctor(x), pr, rm, true);
  Ctor.precision = wpr = xsd - x.e;
  x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
  Ctor.precision = pr + 4;
  Ctor.rounding = 1;
  x = x.ln();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(0.5);
};
P.inverseSine = P.asin = function() {
  var halfPi, k, pr, rm, x = this, Ctor = x.constructor;
  if (x.isZero())
    return new Ctor(x);
  k = x.abs().cmp(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (k !== -1) {
    if (k === 0) {
      halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
      halfPi.s = x.s;
      return halfPi;
    }
    return new Ctor(NaN);
  }
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(2);
};
P.inverseTangent = P.atan = function() {
  var i, j, k, n2, px, t, r, wpr, x2, x = this, Ctor = x.constructor, pr = Ctor.precision, rm = Ctor.rounding;
  if (!x.isFinite()) {
    if (!x.s)
      return new Ctor(NaN);
    if (pr + 4 <= PI_PRECISION) {
      r = getPi(Ctor, pr + 4, rm).times(0.5);
      r.s = x.s;
      return r;
    }
  } else if (x.isZero()) {
    return new Ctor(x);
  } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
    r = getPi(Ctor, pr + 4, rm).times(0.25);
    r.s = x.s;
    return r;
  }
  Ctor.precision = wpr = pr + 10;
  Ctor.rounding = 1;
  k = Math.min(28, wpr / LOG_BASE + 2 | 0);
  for (i = k; i; --i)
    x = x.div(x.times(x).plus(1).sqrt().plus(1));
  external = false;
  j = Math.ceil(wpr / LOG_BASE);
  n2 = 1;
  x2 = x.times(x);
  r = new Ctor(x);
  px = x;
  for (; i !== -1; ) {
    px = px.times(x2);
    t = r.minus(px.div(n2 += 2));
    px = px.times(x2);
    r = t.plus(px.div(n2 += 2));
    if (r.d[j] !== void 0)
      for (i = j; r.d[i] === t.d[i] && i--; )
        ;
  }
  if (k)
    r = r.times(2 << k - 1);
  external = true;
  return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.isFinite = function() {
  return !!this.d;
};
P.isInteger = P.isInt = function() {
  return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
};
P.isNaN = function() {
  return !this.s;
};
P.isNegative = P.isNeg = function() {
  return this.s < 0;
};
P.isPositive = P.isPos = function() {
  return this.s > 0;
};
P.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
P.lessThan = P.lt = function(y) {
  return this.cmp(y) < 0;
};
P.lessThanOrEqualTo = P.lte = function(y) {
  return this.cmp(y) < 1;
};
P.logarithm = P.log = function(base) {
  var isBase10, d, denominator, k, inf, num, sd, r, arg = this, Ctor = arg.constructor, pr = Ctor.precision, rm = Ctor.rounding, guard = 5;
  if (base == null) {
    base = new Ctor(10);
    isBase10 = true;
  } else {
    base = new Ctor(base);
    d = base.d;
    if (base.s < 0 || !d || !d[0] || base.eq(1))
      return new Ctor(NaN);
    isBase10 = base.eq(10);
  }
  d = arg.d;
  if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
    return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
  }
  if (isBase10) {
    if (d.length > 1) {
      inf = true;
    } else {
      for (k = d[0]; k % 10 === 0; )
        k /= 10;
      inf = k !== 1;
    }
  }
  external = false;
  sd = pr + guard;
  num = naturalLogarithm(arg, sd);
  denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
  r = divide(num, denominator, sd, 1);
  if (checkRoundingDigits(r.d, k = pr, rm)) {
    do {
      sd += 10;
      num = naturalLogarithm(arg, sd);
      denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
      r = divide(num, denominator, sd, 1);
      if (!inf) {
        if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
          r = finalise(r, pr + 1, 0);
        }
        break;
      }
    } while (checkRoundingDigits(r.d, k += 10, rm));
  }
  external = true;
  return finalise(r, pr, rm);
};
P.minus = P.sub = function(y) {
  var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.d) {
    if (!x.s || !y.s)
      y = new Ctor(NaN);
    else if (x.d)
      y.s = -y.s;
    else
      y = new Ctor(y.d || x.s !== y.s ? x : NaN);
    return y;
  }
  if (x.s != y.s) {
    y.s = -y.s;
    return x.plus(y);
  }
  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (yd[0])
      y.s = -y.s;
    else if (xd[0])
      y = new Ctor(x);
    else
      return new Ctor(rm === 3 ? -0 : 0);
    return external ? finalise(y, pr, rm) : y;
  }
  e = mathfloor(y.e / LOG_BASE);
  xe = mathfloor(x.e / LOG_BASE);
  xd = xd.slice();
  k = xe - e;
  if (k) {
    xLTy = k < 0;
    if (xLTy) {
      d = xd;
      k = -k;
      len = yd.length;
    } else {
      d = yd;
      e = xe;
      len = xd.length;
    }
    i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
    if (k > i) {
      k = i;
      d.length = 1;
    }
    d.reverse();
    for (i = k; i--; )
      d.push(0);
    d.reverse();
  } else {
    i = xd.length;
    len = yd.length;
    xLTy = i < len;
    if (xLTy)
      len = i;
    for (i = 0; i < len; i++) {
      if (xd[i] != yd[i]) {
        xLTy = xd[i] < yd[i];
        break;
      }
    }
    k = 0;
  }
  if (xLTy) {
    d = xd;
    xd = yd;
    yd = d;
    y.s = -y.s;
  }
  len = xd.length;
  for (i = yd.length - len; i > 0; --i)
    xd[len++] = 0;
  for (i = yd.length; i > k; ) {
    if (xd[--i] < yd[i]) {
      for (j = i; j && xd[--j] === 0; )
        xd[j] = BASE - 1;
      --xd[j];
      xd[i] += BASE;
    }
    xd[i] -= yd[i];
  }
  for (; xd[--len] === 0; )
    xd.pop();
  for (; xd[0] === 0; xd.shift())
    --e;
  if (!xd[0])
    return new Ctor(rm === 3 ? -0 : 0);
  y.d = xd;
  y.e = getBase10Exponent(xd, e);
  return external ? finalise(y, pr, rm) : y;
};
P.modulo = P.mod = function(y) {
  var q, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.s || y.d && !y.d[0])
    return new Ctor(NaN);
  if (!y.d || x.d && !x.d[0]) {
    return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
  }
  external = false;
  if (Ctor.modulo == 9) {
    q = divide(x, y.abs(), 0, 3, 1);
    q.s *= y.s;
  } else {
    q = divide(x, y, 0, Ctor.modulo, 1);
  }
  q = q.times(y);
  external = true;
  return x.minus(q);
};
P.naturalExponential = P.exp = function() {
  return naturalExponential(this);
};
P.naturalLogarithm = P.ln = function() {
  return naturalLogarithm(this);
};
P.negated = P.neg = function() {
  var x = new this.constructor(this);
  x.s = -x.s;
  return finalise(x);
};
P.plus = P.add = function(y) {
  var carry, d, e, i, k, len, pr, rm, xd, yd, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.d) {
    if (!x.s || !y.s)
      y = new Ctor(NaN);
    else if (!x.d)
      y = new Ctor(y.d || x.s === y.s ? x : NaN);
    return y;
  }
  if (x.s != y.s) {
    y.s = -y.s;
    return x.minus(y);
  }
  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (!yd[0])
      y = new Ctor(x);
    return external ? finalise(y, pr, rm) : y;
  }
  k = mathfloor(x.e / LOG_BASE);
  e = mathfloor(y.e / LOG_BASE);
  xd = xd.slice();
  i = k - e;
  if (i) {
    if (i < 0) {
      d = xd;
      i = -i;
      len = yd.length;
    } else {
      d = yd;
      e = k;
      len = xd.length;
    }
    k = Math.ceil(pr / LOG_BASE);
    len = k > len ? k + 1 : len + 1;
    if (i > len) {
      i = len;
      d.length = 1;
    }
    d.reverse();
    for (; i--; )
      d.push(0);
    d.reverse();
  }
  len = xd.length;
  i = yd.length;
  if (len - i < 0) {
    i = len;
    d = yd;
    yd = xd;
    xd = d;
  }
  for (carry = 0; i; ) {
    carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
    xd[i] %= BASE;
  }
  if (carry) {
    xd.unshift(carry);
    ++e;
  }
  for (len = xd.length; xd[--len] == 0; )
    xd.pop();
  y.d = xd;
  y.e = getBase10Exponent(xd, e);
  return external ? finalise(y, pr, rm) : y;
};
P.precision = P.sd = function(z) {
  var k, x = this;
  if (z !== void 0 && z !== !!z && z !== 1 && z !== 0)
    throw Error(invalidArgument + z);
  if (x.d) {
    k = getPrecision(x.d);
    if (z && x.e + 1 > k)
      k = x.e + 1;
  } else {
    k = NaN;
  }
  return k;
};
P.round = function() {
  var x = this, Ctor = x.constructor;
  return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
};
P.sine = P.sin = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x = sine(Ctor, toLessThanHalfPi(Ctor, x));
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
};
P.squareRoot = P.sqrt = function() {
  var m, n2, sd, r, rep, t, x = this, d = x.d, e = x.e, s = x.s, Ctor = x.constructor;
  if (s !== 1 || !d || !d[0]) {
    return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
  }
  external = false;
  s = Math.sqrt(+x);
  if (s == 0 || s == 1 / 0) {
    n2 = digitsToString(d);
    if ((n2.length + e) % 2 == 0)
      n2 += "0";
    s = Math.sqrt(n2);
    e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
    if (s == 1 / 0) {
      n2 = "5e" + e;
    } else {
      n2 = s.toExponential();
      n2 = n2.slice(0, n2.indexOf("e") + 1) + e;
    }
    r = new Ctor(n2);
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);
    if (digitsToString(t.d).slice(0, sd) === (n2 = digitsToString(r.d)).slice(0, sd)) {
      n2 = n2.slice(sd - 3, sd + 1);
      if (n2 == "9999" || !rep && n2 == "4999") {
        if (!rep) {
          finalise(t, e + 1, 0);
          if (t.times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n2 || !+n2.slice(1) && n2.charAt(0) == "5") {
          finalise(r, e + 1, 1);
          m = !r.times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e, Ctor.rounding, m);
};
P.tangent = P.tan = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 10;
  Ctor.rounding = 1;
  x = x.sin();
  x.s = 1;
  x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
};
P.times = P.mul = function(y) {
  var carry, e, i, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
  y.s *= x.s;
  if (!xd || !xd[0] || !yd || !yd[0]) {
    return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y.s / 0 : y.s * 0);
  }
  e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
  xdL = xd.length;
  ydL = yd.length;
  if (xdL < ydL) {
    r = xd;
    xd = yd;
    yd = r;
    rL = xdL;
    xdL = ydL;
    ydL = rL;
  }
  r = [];
  rL = xdL + ydL;
  for (i = rL; i--; )
    r.push(0);
  for (i = ydL; --i >= 0; ) {
    carry = 0;
    for (k = xdL + i; k > i; ) {
      t = r[k] + yd[i] * xd[k - i - 1] + carry;
      r[k--] = t % BASE | 0;
      carry = t / BASE | 0;
    }
    r[k] = (r[k] + carry) % BASE | 0;
  }
  for (; !r[--rL]; )
    r.pop();
  if (carry)
    ++e;
  else
    r.shift();
  y.d = r;
  y.e = getBase10Exponent(r, e);
  return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
};
P.toBinary = function(sd, rm) {
  return toStringBinary(this, 2, sd, rm);
};
P.toDecimalPlaces = P.toDP = function(dp, rm) {
  var x = this, Ctor = x.constructor;
  x = new Ctor(x);
  if (dp === void 0)
    return x;
  checkInt32(dp, 0, MAX_DIGITS);
  if (rm === void 0)
    rm = Ctor.rounding;
  else
    checkInt32(rm, 0, 8);
  return finalise(x, dp + x.e + 1, rm);
};
P.toExponential = function(dp, rm) {
  var str, x = this, Ctor = x.constructor;
  if (dp === void 0) {
    str = finiteToString(x, true);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    x = finalise(new Ctor(x), dp + 1, rm);
    str = finiteToString(x, true, dp + 1);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toFixed = function(dp, rm) {
  var str, y, x = this, Ctor = x.constructor;
  if (dp === void 0) {
    str = finiteToString(x);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    y = finalise(new Ctor(x), dp + x.e + 1, rm);
    str = finiteToString(y, false, dp + y.e + 1);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toFraction = function(maxD) {
  var d, d0, d1, d2, e, k, n2, n0, n1, pr, q, r, x = this, xd = x.d, Ctor = x.constructor;
  if (!xd)
    return new Ctor(x);
  n1 = d0 = new Ctor(1);
  d1 = n0 = new Ctor(0);
  d = new Ctor(d1);
  e = d.e = getPrecision(xd) - x.e - 1;
  k = e % LOG_BASE;
  d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);
  if (maxD == null) {
    maxD = e > 0 ? d : n1;
  } else {
    n2 = new Ctor(maxD);
    if (!n2.isInt() || n2.lt(n1))
      throw Error(invalidArgument + n2);
    maxD = n2.gt(d) ? e > 0 ? d : n1 : n2;
  }
  external = false;
  n2 = new Ctor(digitsToString(xd));
  pr = Ctor.precision;
  Ctor.precision = e = xd.length * LOG_BASE * 2;
  for (; ; ) {
    q = divide(n2, d, 0, 1, 1);
    d2 = d0.plus(q.times(d1));
    if (d2.cmp(maxD) == 1)
      break;
    d0 = d1;
    d1 = d2;
    d2 = n1;
    n1 = n0.plus(q.times(d2));
    n0 = d2;
    d2 = d;
    d = n2.minus(q.times(d2));
    n2 = d2;
  }
  d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
  n0 = n0.plus(d2.times(n1));
  d0 = d0.plus(d2.times(d1));
  n0.s = n1.s = x.s;
  r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];
  Ctor.precision = pr;
  external = true;
  return r;
};
P.toHexadecimal = P.toHex = function(sd, rm) {
  return toStringBinary(this, 16, sd, rm);
};
P.toNearest = function(y, rm) {
  var x = this, Ctor = x.constructor;
  x = new Ctor(x);
  if (y == null) {
    if (!x.d)
      return x;
    y = new Ctor(1);
    rm = Ctor.rounding;
  } else {
    y = new Ctor(y);
    if (rm === void 0) {
      rm = Ctor.rounding;
    } else {
      checkInt32(rm, 0, 8);
    }
    if (!x.d)
      return y.s ? x : y;
    if (!y.d) {
      if (y.s)
        y.s = x.s;
      return y;
    }
  }
  if (y.d[0]) {
    external = false;
    x = divide(x, y, 0, rm, 1).times(y);
    external = true;
    finalise(x);
  } else {
    y.s = x.s;
    x = y;
  }
  return x;
};
P.toNumber = function() {
  return +this;
};
P.toOctal = function(sd, rm) {
  return toStringBinary(this, 8, sd, rm);
};
P.toPower = P.pow = function(y) {
  var e, k, pr, r, rm, s, x = this, Ctor = x.constructor, yn = +(y = new Ctor(y));
  if (!x.d || !y.d || !x.d[0] || !y.d[0])
    return new Ctor(mathpow(+x, yn));
  x = new Ctor(x);
  if (x.eq(1))
    return x;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (y.eq(1))
    return finalise(x, pr, rm);
  e = mathfloor(y.e / LOG_BASE);
  if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
    r = intPow(Ctor, x, k, pr);
    return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
  }
  s = x.s;
  if (s < 0) {
    if (e < y.d.length - 1)
      return new Ctor(NaN);
    if ((y.d[e] & 1) == 0)
      s = 1;
    if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
      x.s = s;
      return x;
    }
  }
  k = mathpow(+x, yn);
  e = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log("0." + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + "").e;
  if (e > Ctor.maxE + 1 || e < Ctor.minE - 1)
    return new Ctor(e > 0 ? s / 0 : 0);
  external = false;
  Ctor.rounding = x.s = 1;
  k = Math.min(12, (e + "").length);
  r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
  if (r.d) {
    r = finalise(r, pr + 5, 1);
    if (checkRoundingDigits(r.d, pr, rm)) {
      e = pr + 10;
      r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);
      if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
        r = finalise(r, pr + 1, 0);
      }
    }
  }
  r.s = s;
  external = true;
  Ctor.rounding = rm;
  return finalise(r, pr, rm);
};
P.toPrecision = function(sd, rm) {
  var str, x = this, Ctor = x.constructor;
  if (sd === void 0) {
    str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    x = finalise(new Ctor(x), sd, rm);
    str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toSignificantDigits = P.toSD = function(sd, rm) {
  var x = this, Ctor = x.constructor;
  if (sd === void 0) {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
  }
  return finalise(new Ctor(x), sd, rm);
};
P.toString = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.truncated = P.trunc = function() {
  return finalise(new this.constructor(this), this.e + 1, 1);
};
P.valueOf = P.toJSON = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() ? "-" + str : str;
};
function digitsToString(d) {
  var i, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
  if (indexOfLastWord > 0) {
    str += w;
    for (i = 1; i < indexOfLastWord; i++) {
      ws = d[i] + "";
      k = LOG_BASE - ws.length;
      if (k)
        str += getZeroString(k);
      str += ws;
    }
    w = d[i];
    ws = w + "";
    k = LOG_BASE - ws.length;
    if (k)
      str += getZeroString(k);
  } else if (w === 0) {
    return "0";
  }
  for (; w % 10 === 0; )
    w /= 10;
  return str + w;
}
function checkInt32(i, min2, max2) {
  if (i !== ~~i || i < min2 || i > max2) {
    throw Error(invalidArgument + i);
  }
}
function checkRoundingDigits(d, i, rm, repeating) {
  var di, k, r, rd;
  for (k = d[0]; k >= 10; k /= 10)
    --i;
  if (--i < 0) {
    i += LOG_BASE;
    di = 0;
  } else {
    di = Math.ceil((i + 1) / LOG_BASE);
    i %= LOG_BASE;
  }
  k = mathpow(10, LOG_BASE - i);
  rd = d[di] % k | 0;
  if (repeating == null) {
    if (i < 3) {
      if (i == 0)
        rd = rd / 100 | 0;
      else if (i == 1)
        rd = rd / 10 | 0;
      r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 5e4 || rd == 0;
    } else {
      r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
    }
  } else {
    if (i < 4) {
      if (i == 0)
        rd = rd / 1e3 | 0;
      else if (i == 1)
        rd = rd / 100 | 0;
      else if (i == 2)
        rd = rd / 10 | 0;
      r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
    } else {
      r = ((repeating || rm < 4) && rd + 1 == k || !repeating && rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 1e3 | 0) == mathpow(10, i - 3) - 1;
    }
  }
  return r;
}
function convertBase(str, baseIn, baseOut) {
  var j, arr = [0], arrL, i = 0, strL = str.length;
  for (; i < strL; ) {
    for (arrL = arr.length; arrL--; )
      arr[arrL] *= baseIn;
    arr[0] += NUMERALS.indexOf(str.charAt(i++));
    for (j = 0; j < arr.length; j++) {
      if (arr[j] > baseOut - 1) {
        if (arr[j + 1] === void 0)
          arr[j + 1] = 0;
        arr[j + 1] += arr[j] / baseOut | 0;
        arr[j] %= baseOut;
      }
    }
  }
  return arr.reverse();
}
function cosine(Ctor, x) {
  var k, len, y;
  if (x.isZero())
    return x;
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    y = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    y = "2.3283064365386962890625e-10";
  }
  Ctor.precision += k;
  x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
  for (var i = k; i--; ) {
    var cos2x = x.times(x);
    x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
  }
  Ctor.precision -= k;
  return x;
}
var divide = function() {
  function multiplyInteger(x, k, base) {
    var temp, carry = 0, i = x.length;
    for (x = x.slice(); i--; ) {
      temp = x[i] * k + carry;
      x[i] = temp % base | 0;
      carry = temp / base | 0;
    }
    if (carry)
      x.unshift(carry);
    return x;
  }
  function compare(a, b, aL, bL) {
    var i, r;
    if (aL != bL) {
      r = aL > bL ? 1 : -1;
    } else {
      for (i = r = 0; i < aL; i++) {
        if (a[i] != b[i]) {
          r = a[i] > b[i] ? 1 : -1;
          break;
        }
      }
    }
    return r;
  }
  function subtract(a, b, aL, base) {
    var i = 0;
    for (; aL--; ) {
      a[aL] -= i;
      i = a[aL] < b[aL] ? 1 : 0;
      a[aL] = i * base + a[aL] - b[aL];
    }
    for (; !a[0] && a.length > 1; )
      a.shift();
  }
  return function(x, y, pr, rm, dp, base) {
    var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign2 = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
    if (!xd || !xd[0] || !yd || !yd[0]) {
      return new Ctor(
        // Return NaN if either NaN, or both Infinity or 0.
        !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : (
          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          xd && xd[0] == 0 || !yd ? sign2 * 0 : sign2 / 0
        )
      );
    }
    if (base) {
      logBase = 1;
      e = x.e - y.e;
    } else {
      base = BASE;
      logBase = LOG_BASE;
      e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
    }
    yL = yd.length;
    xL = xd.length;
    q = new Ctor(sign2);
    qd = q.d = [];
    for (i = 0; yd[i] == (xd[i] || 0); i++)
      ;
    if (yd[i] > (xd[i] || 0))
      e--;
    if (pr == null) {
      sd = pr = Ctor.precision;
      rm = Ctor.rounding;
    } else if (dp) {
      sd = pr + (x.e - y.e) + 1;
    } else {
      sd = pr;
    }
    if (sd < 0) {
      qd.push(1);
      more = true;
    } else {
      sd = sd / logBase + 2 | 0;
      i = 0;
      if (yL == 1) {
        k = 0;
        yd = yd[0];
        sd++;
        for (; (i < xL || k) && sd--; i++) {
          t = k * base + (xd[i] || 0);
          qd[i] = t / yd | 0;
          k = t % yd | 0;
        }
        more = k || i < xL;
      } else {
        k = base / (yd[0] + 1) | 0;
        if (k > 1) {
          yd = multiplyInteger(yd, k, base);
          xd = multiplyInteger(xd, k, base);
          yL = yd.length;
          xL = xd.length;
        }
        xi = yL;
        rem = xd.slice(0, yL);
        remL = rem.length;
        for (; remL < yL; )
          rem[remL++] = 0;
        yz = yd.slice();
        yz.unshift(0);
        yd0 = yd[0];
        if (yd[1] >= base / 2)
          ++yd0;
        do {
          k = 0;
          cmp = compare(yd, rem, yL, remL);
          if (cmp < 0) {
            rem0 = rem[0];
            if (yL != remL)
              rem0 = rem0 * base + (rem[1] || 0);
            k = rem0 / yd0 | 0;
            if (k > 1) {
              if (k >= base)
                k = base - 1;
              prod = multiplyInteger(yd, k, base);
              prodL = prod.length;
              remL = rem.length;
              cmp = compare(prod, rem, prodL, remL);
              if (cmp == 1) {
                k--;
                subtract(prod, yL < prodL ? yz : yd, prodL, base);
              }
            } else {
              if (k == 0)
                cmp = k = 1;
              prod = yd.slice();
            }
            prodL = prod.length;
            if (prodL < remL)
              prod.unshift(0);
            subtract(rem, prod, remL, base);
            if (cmp == -1) {
              remL = rem.length;
              cmp = compare(yd, rem, yL, remL);
              if (cmp < 1) {
                k++;
                subtract(rem, yL < remL ? yz : yd, remL, base);
              }
            }
            remL = rem.length;
          } else if (cmp === 0) {
            k++;
            rem = [0];
          }
          qd[i++] = k;
          if (cmp && rem[0]) {
            rem[remL++] = xd[xi] || 0;
          } else {
            rem = [xd[xi]];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] !== void 0) && sd--);
        more = rem[0] !== void 0;
      }
      if (!qd[0])
        qd.shift();
    }
    if (logBase == 1) {
      q.e = e;
      inexact = more;
    } else {
      for (i = 1, k = qd[0]; k >= 10; k /= 10)
        i++;
      q.e = i + e * logBase - 1;
      finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
    }
    return q;
  };
}();
function finalise(x, sd, rm, isTruncated) {
  var digits, i, j, k, rd, roundUp, w, xd, xdi, Ctor = x.constructor;
  out:
    if (sd != null) {
      xd = x.d;
      if (!xd)
        return x;
      for (digits = 1, k = xd[0]; k >= 10; k /= 10)
        digits++;
      i = sd - digits;
      if (i < 0) {
        i += LOG_BASE;
        j = sd;
        w = xd[xdi = 0];
        rd = w / mathpow(10, digits - j - 1) % 10 | 0;
      } else {
        xdi = Math.ceil((i + 1) / LOG_BASE);
        k = xd.length;
        if (xdi >= k) {
          if (isTruncated) {
            for (; k++ <= xdi; )
              xd.push(0);
            w = rd = 0;
            digits = 1;
            i %= LOG_BASE;
            j = i - LOG_BASE + 1;
          } else {
            break out;
          }
        } else {
          w = k = xd[xdi];
          for (digits = 1; k >= 10; k /= 10)
            digits++;
          i %= LOG_BASE;
          j = i - LOG_BASE + digits;
          rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
        }
      }
      isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));
      roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
      (i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
      if (sd < 1 || !xd[0]) {
        xd.length = 0;
        if (roundUp) {
          sd -= x.e + 1;
          xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
          x.e = -sd || 0;
        } else {
          xd[0] = x.e = 0;
        }
        return x;
      }
      if (i == 0) {
        xd.length = xdi;
        k = 1;
        xdi--;
      } else {
        xd.length = xdi + 1;
        k = mathpow(10, LOG_BASE - i);
        xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
      }
      if (roundUp) {
        for (; ; ) {
          if (xdi == 0) {
            for (i = 1, j = xd[0]; j >= 10; j /= 10)
              i++;
            j = xd[0] += k;
            for (k = 1; j >= 10; j /= 10)
              k++;
            if (i != k) {
              x.e++;
              if (xd[0] == BASE)
                xd[0] = 1;
            }
            break;
          } else {
            xd[xdi] += k;
            if (xd[xdi] != BASE)
              break;
            xd[xdi--] = 0;
            k = 1;
          }
        }
      }
      for (i = xd.length; xd[--i] === 0; )
        xd.pop();
    }
  if (external) {
    if (x.e > Ctor.maxE) {
      x.d = null;
      x.e = NaN;
    } else if (x.e < Ctor.minE) {
      x.e = 0;
      x.d = [0];
    }
  }
  return x;
}
function finiteToString(x, isExp, sd) {
  if (!x.isFinite())
    return nonFiniteToString(x);
  var k, e = x.e, str = digitsToString(x.d), len = str.length;
  if (isExp) {
    if (sd && (k = sd - len) > 0) {
      str = str.charAt(0) + "." + str.slice(1) + getZeroString(k);
    } else if (len > 1) {
      str = str.charAt(0) + "." + str.slice(1);
    }
    str = str + (x.e < 0 ? "e" : "e+") + x.e;
  } else if (e < 0) {
    str = "0." + getZeroString(-e - 1) + str;
    if (sd && (k = sd - len) > 0)
      str += getZeroString(k);
  } else if (e >= len) {
    str += getZeroString(e + 1 - len);
    if (sd && (k = sd - e - 1) > 0)
      str = str + "." + getZeroString(k);
  } else {
    if ((k = e + 1) < len)
      str = str.slice(0, k) + "." + str.slice(k);
    if (sd && (k = sd - len) > 0) {
      if (e + 1 === len)
        str += ".";
      str += getZeroString(k);
    }
  }
  return str;
}
function getBase10Exponent(digits, e) {
  var w = digits[0];
  for (e *= LOG_BASE; w >= 10; w /= 10)
    e++;
  return e;
}
function getLn10(Ctor, sd, pr) {
  if (sd > LN10_PRECISION) {
    external = true;
    if (pr)
      Ctor.precision = pr;
    throw Error(precisionLimitExceeded);
  }
  return finalise(new Ctor(LN10), sd, 1, true);
}
function getPi(Ctor, sd, rm) {
  if (sd > PI_PRECISION)
    throw Error(precisionLimitExceeded);
  return finalise(new Ctor(PI), sd, rm, true);
}
function getPrecision(digits) {
  var w = digits.length - 1, len = w * LOG_BASE + 1;
  w = digits[w];
  if (w) {
    for (; w % 10 == 0; w /= 10)
      len--;
    for (w = digits[0]; w >= 10; w /= 10)
      len++;
  }
  return len;
}
function getZeroString(k) {
  var zs = "";
  for (; k--; )
    zs += "0";
  return zs;
}
function intPow(Ctor, x, n2, pr) {
  var isTruncated, r = new Ctor(1), k = Math.ceil(pr / LOG_BASE + 4);
  external = false;
  for (; ; ) {
    if (n2 % 2) {
      r = r.times(x);
      if (truncate(r.d, k))
        isTruncated = true;
    }
    n2 = mathfloor(n2 / 2);
    if (n2 === 0) {
      n2 = r.d.length - 1;
      if (isTruncated && r.d[n2] === 0)
        ++r.d[n2];
      break;
    }
    x = x.times(x);
    truncate(x.d, k);
  }
  external = true;
  return r;
}
function isOdd(n2) {
  return n2.d[n2.d.length - 1] & 1;
}
function maxOrMin(Ctor, args, ltgt) {
  var y, x = new Ctor(args[0]), i = 0;
  for (; ++i < args.length; ) {
    y = new Ctor(args[i]);
    if (!y.s) {
      x = y;
      break;
    } else if (x[ltgt](y)) {
      x = y;
    }
  }
  return x;
}
function naturalExponential(x, sd) {
  var denominator, guard, j, pow2, sum2, t, wpr, rep = 0, i = 0, k = 0, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (!x.d || !x.d[0] || x.e > 17) {
    return new Ctor(x.d ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  t = new Ctor(0.03125);
  while (x.e > -2) {
    x = x.times(t);
    k += 5;
  }
  guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
  wpr += guard;
  denominator = pow2 = sum2 = new Ctor(1);
  Ctor.precision = wpr;
  for (; ; ) {
    pow2 = finalise(pow2.times(x), wpr, 1);
    denominator = denominator.times(++i);
    t = sum2.plus(divide(pow2, denominator, wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      j = k;
      while (j--)
        sum2 = finalise(sum2.times(sum2), wpr, 1);
      if (sd == null) {
        if (rep < 3 && checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += 10;
          denominator = pow2 = t = new Ctor(1);
          i = 0;
          rep++;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
  }
}
function naturalLogarithm(y, sd) {
  var c, c0, denominator, e, numerator, rep, sum2, t, wpr, x1, x2, n2 = 1, guard = 10, x = y, xd = x.d, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
    return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  Ctor.precision = wpr += guard;
  c = digitsToString(xd);
  c0 = c.charAt(0);
  if (Math.abs(e = x.e) < 15e14) {
    while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
      x = x.times(y);
      c = digitsToString(x.d);
      c0 = c.charAt(0);
      n2++;
    }
    e = x.e;
    if (c0 > 1) {
      x = new Ctor("0." + c);
      e++;
    } else {
      x = new Ctor(c0 + "." + c.slice(1));
    }
  } else {
    t = getLn10(Ctor, wpr + 2, pr).times(e + "");
    x = naturalLogarithm(new Ctor(c0 + "." + c.slice(1)), wpr - guard).plus(t);
    Ctor.precision = pr;
    return sd == null ? finalise(x, pr, rm, external = true) : x;
  }
  x1 = x;
  sum2 = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
  x2 = finalise(x.times(x), wpr, 1);
  denominator = 3;
  for (; ; ) {
    numerator = finalise(numerator.times(x2), wpr, 1);
    t = sum2.plus(divide(numerator, new Ctor(denominator), wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      sum2 = sum2.times(2);
      if (e !== 0)
        sum2 = sum2.plus(getLn10(Ctor, wpr + 2, pr).times(e + ""));
      sum2 = divide(sum2, new Ctor(n2), wpr, 1);
      if (sd == null) {
        if (checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += guard;
          t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
          x2 = finalise(x.times(x), wpr, 1);
          denominator = rep = 1;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
    denominator += 2;
  }
}
function nonFiniteToString(x) {
  return String(x.s * x.s / 0);
}
function parseDecimal(x, str) {
  var e, i, len;
  if ((e = str.indexOf(".")) > -1)
    str = str.replace(".", "");
  if ((i = str.search(/e/i)) > 0) {
    if (e < 0)
      e = i;
    e += +str.slice(i + 1);
    str = str.substring(0, i);
  } else if (e < 0) {
    e = str.length;
  }
  for (i = 0; str.charCodeAt(i) === 48; i++)
    ;
  for (len = str.length; str.charCodeAt(len - 1) === 48; --len)
    ;
  str = str.slice(i, len);
  if (str) {
    len -= i;
    x.e = e = e - i - 1;
    x.d = [];
    i = (e + 1) % LOG_BASE;
    if (e < 0)
      i += LOG_BASE;
    if (i < len) {
      if (i)
        x.d.push(+str.slice(0, i));
      for (len -= LOG_BASE; i < len; )
        x.d.push(+str.slice(i, i += LOG_BASE));
      str = str.slice(i);
      i = LOG_BASE - str.length;
    } else {
      i -= len;
    }
    for (; i--; )
      str += "0";
    x.d.push(+str);
    if (external) {
      if (x.e > x.constructor.maxE) {
        x.d = null;
        x.e = NaN;
      } else if (x.e < x.constructor.minE) {
        x.e = 0;
        x.d = [0];
      }
    }
  } else {
    x.e = 0;
    x.d = [0];
  }
  return x;
}
function parseOther(x, str) {
  var base, Ctor, divisor, i, isFloat, len, p, xd, xe;
  if (str.indexOf("_") > -1) {
    str = str.replace(/(\d)_(?=\d)/g, "$1");
    if (isDecimal.test(str))
      return parseDecimal(x, str);
  } else if (str === "Infinity" || str === "NaN") {
    if (!+str)
      x.s = NaN;
    x.e = NaN;
    x.d = null;
    return x;
  }
  if (isHex.test(str)) {
    base = 16;
    str = str.toLowerCase();
  } else if (isBinary.test(str)) {
    base = 2;
  } else if (isOctal.test(str)) {
    base = 8;
  } else {
    throw Error(invalidArgument + str);
  }
  i = str.search(/p/i);
  if (i > 0) {
    p = +str.slice(i + 1);
    str = str.substring(2, i);
  } else {
    str = str.slice(2);
  }
  i = str.indexOf(".");
  isFloat = i >= 0;
  Ctor = x.constructor;
  if (isFloat) {
    str = str.replace(".", "");
    len = str.length;
    i = len - i;
    divisor = intPow(Ctor, new Ctor(base), i, i * 2);
  }
  xd = convertBase(str, base, BASE);
  xe = xd.length - 1;
  for (i = xe; xd[i] === 0; --i)
    xd.pop();
  if (i < 0)
    return new Ctor(x.s * 0);
  x.e = getBase10Exponent(xd, xe);
  x.d = xd;
  external = false;
  if (isFloat)
    x = divide(x, divisor, len * 4);
  if (p)
    x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p));
  external = true;
  return x;
}
function sine(Ctor, x) {
  var k, len = x.d.length;
  if (len < 3) {
    return x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
  }
  k = 1.4 * Math.sqrt(len);
  k = k > 16 ? 16 : k | 0;
  x = x.times(1 / tinyPow(5, k));
  x = taylorSeries(Ctor, 2, x, x);
  var sin2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
  for (; k--; ) {
    sin2_x = x.times(x);
    x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
  }
  return x;
}
function taylorSeries(Ctor, n2, x, y, isHyperbolic) {
  var j, t, u, x2, pr = Ctor.precision, k = Math.ceil(pr / LOG_BASE);
  external = false;
  x2 = x.times(x);
  u = new Ctor(y);
  for (; ; ) {
    t = divide(u.times(x2), new Ctor(n2++ * n2++), pr, 1);
    u = isHyperbolic ? y.plus(t) : y.minus(t);
    y = divide(t.times(x2), new Ctor(n2++ * n2++), pr, 1);
    t = u.plus(y);
    if (t.d[k] !== void 0) {
      for (j = k; t.d[j] === u.d[j] && j--; )
        ;
      if (j == -1)
        break;
    }
    j = u;
    u = y;
    y = t;
    t = j;
  }
  external = true;
  t.d.length = k + 1;
  return t;
}
function tinyPow(b, e) {
  var n2 = b;
  while (--e)
    n2 *= b;
  return n2;
}
function toLessThanHalfPi(Ctor, x) {
  var t, isNeg = x.s < 0, pi = getPi(Ctor, Ctor.precision, 1), halfPi = pi.times(0.5);
  x = x.abs();
  if (x.lte(halfPi)) {
    quadrant = isNeg ? 4 : 1;
    return x;
  }
  t = x.divToInt(pi);
  if (t.isZero()) {
    quadrant = isNeg ? 3 : 2;
  } else {
    x = x.minus(t.times(pi));
    if (x.lte(halfPi)) {
      quadrant = isOdd(t) ? isNeg ? 2 : 3 : isNeg ? 4 : 1;
      return x;
    }
    quadrant = isOdd(t) ? isNeg ? 1 : 4 : isNeg ? 3 : 2;
  }
  return x.minus(pi).abs();
}
function toStringBinary(x, baseOut, sd, rm) {
  var base, e, i, k, len, roundUp, str, xd, y, Ctor = x.constructor, isExp = sd !== void 0;
  if (isExp) {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
  } else {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  }
  if (!x.isFinite()) {
    str = nonFiniteToString(x);
  } else {
    str = finiteToString(x);
    i = str.indexOf(".");
    if (isExp) {
      base = 2;
      if (baseOut == 16) {
        sd = sd * 4 - 3;
      } else if (baseOut == 8) {
        sd = sd * 3 - 2;
      }
    } else {
      base = baseOut;
    }
    if (i >= 0) {
      str = str.replace(".", "");
      y = new Ctor(1);
      y.e = str.length - i;
      y.d = convertBase(finiteToString(y), 10, base);
      y.e = y.d.length;
    }
    xd = convertBase(str, 10, base);
    e = len = xd.length;
    for (; xd[--len] == 0; )
      xd.pop();
    if (!xd[0]) {
      str = isExp ? "0p+0" : "0";
    } else {
      if (i < 0) {
        e--;
      } else {
        x = new Ctor(x);
        x.d = xd;
        x.e = e;
        x = divide(x, y, sd, rm, 0, base);
        xd = x.d;
        e = x.e;
        roundUp = inexact;
      }
      i = xd[sd];
      k = base / 2;
      roundUp = roundUp || xd[sd + 1] !== void 0;
      roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
      xd.length = sd;
      if (roundUp) {
        for (; ++xd[--sd] > base - 1; ) {
          xd[sd] = 0;
          if (!sd) {
            ++e;
            xd.unshift(1);
          }
        }
      }
      for (len = xd.length; !xd[len - 1]; --len)
        ;
      for (i = 0, str = ""; i < len; i++)
        str += NUMERALS.charAt(xd[i]);
      if (isExp) {
        if (len > 1) {
          if (baseOut == 16 || baseOut == 8) {
            i = baseOut == 16 ? 4 : 3;
            for (--len; len % i; len++)
              str += "0";
            xd = convertBase(str, base, baseOut);
            for (len = xd.length; !xd[len - 1]; --len)
              ;
            for (i = 1, str = "1."; i < len; i++)
              str += NUMERALS.charAt(xd[i]);
          } else {
            str = str.charAt(0) + "." + str.slice(1);
          }
        }
        str = str + (e < 0 ? "p" : "p+") + e;
      } else if (e < 0) {
        for (; ++e; )
          str = "0" + str;
        str = "0." + str;
      } else {
        if (++e > len)
          for (e -= len; e--; )
            str += "0";
        else if (e < len)
          str = str.slice(0, e) + "." + str.slice(e);
      }
    }
    str = (baseOut == 16 ? "0x" : baseOut == 2 ? "0b" : baseOut == 8 ? "0o" : "") + str;
  }
  return x.s < 0 ? "-" + str : str;
}
function truncate(arr, len) {
  if (arr.length > len) {
    arr.length = len;
    return true;
  }
}
function abs(x) {
  return new this(x).abs();
}
function acos(x) {
  return new this(x).acos();
}
function acosh(x) {
  return new this(x).acosh();
}
function add(x, y) {
  return new this(x).plus(y);
}
function asin(x) {
  return new this(x).asin();
}
function asinh(x) {
  return new this(x).asinh();
}
function atan(x) {
  return new this(x).atan();
}
function atanh(x) {
  return new this(x).atanh();
}
function atan2(y, x) {
  y = new this(y);
  x = new this(x);
  var r, pr = this.precision, rm = this.rounding, wpr = pr + 4;
  if (!y.s || !x.s) {
    r = new this(NaN);
  } else if (!y.d && !x.d) {
    r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
    r.s = y.s;
  } else if (!x.d || y.isZero()) {
    r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
    r.s = y.s;
  } else if (!y.d || x.isZero()) {
    r = getPi(this, wpr, 1).times(0.5);
    r.s = y.s;
  } else if (x.s < 0) {
    this.precision = wpr;
    this.rounding = 1;
    r = this.atan(divide(y, x, wpr, 1));
    x = getPi(this, wpr, 1);
    this.precision = pr;
    this.rounding = rm;
    r = y.s < 0 ? r.minus(x) : r.plus(x);
  } else {
    r = this.atan(divide(y, x, wpr, 1));
  }
  return r;
}
function cbrt(x) {
  return new this(x).cbrt();
}
function ceil(x) {
  return finalise(x = new this(x), x.e + 1, 2);
}
function clamp(x, min2, max2) {
  return new this(x).clamp(min2, max2);
}
function config(obj) {
  if (!obj || typeof obj !== "object")
    throw Error(decimalError + "Object expected");
  var i, p, v, useDefaults = obj.defaults === true, ps = [
    "precision",
    1,
    MAX_DIGITS,
    "rounding",
    0,
    8,
    "toExpNeg",
    -EXP_LIMIT,
    0,
    "toExpPos",
    0,
    EXP_LIMIT,
    "maxE",
    0,
    EXP_LIMIT,
    "minE",
    -EXP_LIMIT,
    0,
    "modulo",
    0,
    9
  ];
  for (i = 0; i < ps.length; i += 3) {
    if (p = ps[i], useDefaults)
      this[p] = DEFAULTS[p];
    if ((v = obj[p]) !== void 0) {
      if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2])
        this[p] = v;
      else
        throw Error(invalidArgument + p + ": " + v);
    }
  }
  if (p = "crypto", useDefaults)
    this[p] = DEFAULTS[p];
  if ((v = obj[p]) !== void 0) {
    if (v === true || v === false || v === 0 || v === 1) {
      if (v) {
        if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
          this[p] = true;
        } else {
          throw Error(cryptoUnavailable);
        }
      } else {
        this[p] = false;
      }
    } else {
      throw Error(invalidArgument + p + ": " + v);
    }
  }
  return this;
}
function cos(x) {
  return new this(x).cos();
}
function cosh(x) {
  return new this(x).cosh();
}
function clone(obj) {
  var i, p, ps;
  function Decimal2(v) {
    var e, i2, t, x = this;
    if (!(x instanceof Decimal2))
      return new Decimal2(v);
    x.constructor = Decimal2;
    if (isDecimalInstance(v)) {
      x.s = v.s;
      if (external) {
        if (!v.d || v.e > Decimal2.maxE) {
          x.e = NaN;
          x.d = null;
        } else if (v.e < Decimal2.minE) {
          x.e = 0;
          x.d = [0];
        } else {
          x.e = v.e;
          x.d = v.d.slice();
        }
      } else {
        x.e = v.e;
        x.d = v.d ? v.d.slice() : v.d;
      }
      return;
    }
    t = typeof v;
    if (t === "number") {
      if (v === 0) {
        x.s = 1 / v < 0 ? -1 : 1;
        x.e = 0;
        x.d = [0];
        return;
      }
      if (v < 0) {
        v = -v;
        x.s = -1;
      } else {
        x.s = 1;
      }
      if (v === ~~v && v < 1e7) {
        for (e = 0, i2 = v; i2 >= 10; i2 /= 10)
          e++;
        if (external) {
          if (e > Decimal2.maxE) {
            x.e = NaN;
            x.d = null;
          } else if (e < Decimal2.minE) {
            x.e = 0;
            x.d = [0];
          } else {
            x.e = e;
            x.d = [v];
          }
        } else {
          x.e = e;
          x.d = [v];
        }
        return;
      } else if (v * 0 !== 0) {
        if (!v)
          x.s = NaN;
        x.e = NaN;
        x.d = null;
        return;
      }
      return parseDecimal(x, v.toString());
    } else if (t !== "string") {
      throw Error(invalidArgument + v);
    }
    if ((i2 = v.charCodeAt(0)) === 45) {
      v = v.slice(1);
      x.s = -1;
    } else {
      if (i2 === 43)
        v = v.slice(1);
      x.s = 1;
    }
    return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
  }
  Decimal2.prototype = P;
  Decimal2.ROUND_UP = 0;
  Decimal2.ROUND_DOWN = 1;
  Decimal2.ROUND_CEIL = 2;
  Decimal2.ROUND_FLOOR = 3;
  Decimal2.ROUND_HALF_UP = 4;
  Decimal2.ROUND_HALF_DOWN = 5;
  Decimal2.ROUND_HALF_EVEN = 6;
  Decimal2.ROUND_HALF_CEIL = 7;
  Decimal2.ROUND_HALF_FLOOR = 8;
  Decimal2.EUCLID = 9;
  Decimal2.config = Decimal2.set = config;
  Decimal2.clone = clone;
  Decimal2.isDecimal = isDecimalInstance;
  Decimal2.abs = abs;
  Decimal2.acos = acos;
  Decimal2.acosh = acosh;
  Decimal2.add = add;
  Decimal2.asin = asin;
  Decimal2.asinh = asinh;
  Decimal2.atan = atan;
  Decimal2.atanh = atanh;
  Decimal2.atan2 = atan2;
  Decimal2.cbrt = cbrt;
  Decimal2.ceil = ceil;
  Decimal2.clamp = clamp;
  Decimal2.cos = cos;
  Decimal2.cosh = cosh;
  Decimal2.div = div;
  Decimal2.exp = exp;
  Decimal2.floor = floor;
  Decimal2.hypot = hypot;
  Decimal2.ln = ln;
  Decimal2.log = log;
  Decimal2.log10 = log10;
  Decimal2.log2 = log2;
  Decimal2.max = max$1;
  Decimal2.min = min$1;
  Decimal2.mod = mod;
  Decimal2.mul = mul;
  Decimal2.pow = pow;
  Decimal2.random = random;
  Decimal2.round = round$1;
  Decimal2.sign = sign;
  Decimal2.sin = sin;
  Decimal2.sinh = sinh;
  Decimal2.sqrt = sqrt;
  Decimal2.sub = sub;
  Decimal2.sum = sum;
  Decimal2.tan = tan;
  Decimal2.tanh = tanh;
  Decimal2.trunc = trunc;
  if (obj === void 0)
    obj = {};
  if (obj) {
    if (obj.defaults !== true) {
      ps = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"];
      for (i = 0; i < ps.length; )
        if (!obj.hasOwnProperty(p = ps[i++]))
          obj[p] = this[p];
    }
  }
  Decimal2.config(obj);
  return Decimal2;
}
function div(x, y) {
  return new this(x).div(y);
}
function exp(x) {
  return new this(x).exp();
}
function floor(x) {
  return finalise(x = new this(x), x.e + 1, 3);
}
function hypot() {
  var i, n2, t = new this(0);
  external = false;
  for (i = 0; i < arguments.length; ) {
    n2 = new this(arguments[i++]);
    if (!n2.d) {
      if (n2.s) {
        external = true;
        return new this(1 / 0);
      }
      t = n2;
    } else if (t.d) {
      t = t.plus(n2.times(n2));
    }
  }
  external = true;
  return t.sqrt();
}
function isDecimalInstance(obj) {
  return obj instanceof Decimal || obj && obj.toStringTag === tag || false;
}
function ln(x) {
  return new this(x).ln();
}
function log(x, y) {
  return new this(x).log(y);
}
function log2(x) {
  return new this(x).log(2);
}
function log10(x) {
  return new this(x).log(10);
}
function max$1() {
  return maxOrMin(this, arguments, "lt");
}
function min$1() {
  return maxOrMin(this, arguments, "gt");
}
function mod(x, y) {
  return new this(x).mod(y);
}
function mul(x, y) {
  return new this(x).mul(y);
}
function pow(x, y) {
  return new this(x).pow(y);
}
function random(sd) {
  var d, e, k, n2, i = 0, r = new this(1), rd = [];
  if (sd === void 0)
    sd = this.precision;
  else
    checkInt32(sd, 1, MAX_DIGITS);
  k = Math.ceil(sd / LOG_BASE);
  if (!this.crypto) {
    for (; i < k; )
      rd[i++] = Math.random() * 1e7 | 0;
  } else if (crypto.getRandomValues) {
    d = crypto.getRandomValues(new Uint32Array(k));
    for (; i < k; ) {
      n2 = d[i];
      if (n2 >= 429e7) {
        d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
      } else {
        rd[i++] = n2 % 1e7;
      }
    }
  } else if (crypto.randomBytes) {
    d = crypto.randomBytes(k *= 4);
    for (; i < k; ) {
      n2 = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 127) << 24);
      if (n2 >= 214e7) {
        crypto.randomBytes(4).copy(d, i);
      } else {
        rd.push(n2 % 1e7);
        i += 4;
      }
    }
    i = k / 4;
  } else {
    throw Error(cryptoUnavailable);
  }
  k = rd[--i];
  sd %= LOG_BASE;
  if (k && sd) {
    n2 = mathpow(10, LOG_BASE - sd);
    rd[i] = (k / n2 | 0) * n2;
  }
  for (; rd[i] === 0; i--)
    rd.pop();
  if (i < 0) {
    e = 0;
    rd = [0];
  } else {
    e = -1;
    for (; rd[0] === 0; e -= LOG_BASE)
      rd.shift();
    for (k = 1, n2 = rd[0]; n2 >= 10; n2 /= 10)
      k++;
    if (k < LOG_BASE)
      e -= LOG_BASE - k;
  }
  r.e = e;
  r.d = rd;
  return r;
}
function round$1(x) {
  return finalise(x = new this(x), x.e + 1, this.rounding);
}
function sign(x) {
  x = new this(x);
  return x.d ? x.d[0] ? x.s : 0 * x.s : x.s || NaN;
}
function sin(x) {
  return new this(x).sin();
}
function sinh(x) {
  return new this(x).sinh();
}
function sqrt(x) {
  return new this(x).sqrt();
}
function sub(x, y) {
  return new this(x).sub(y);
}
function sum() {
  var i = 0, args = arguments, x = new this(args[i]);
  external = false;
  for (; x.s && ++i < args.length; )
    x = x.plus(args[i]);
  external = true;
  return finalise(x, this.precision, this.rounding);
}
function tan(x) {
  return new this(x).tan();
}
function tanh(x) {
  return new this(x).tanh();
}
function trunc(x) {
  return finalise(x = new this(x), x.e + 1, 1);
}
P[Symbol.for("nodejs.util.inspect.custom")] = P.toString;
P[Symbol.toStringTag] = "Decimal";
var Decimal = P.constructor = clone(DEFAULTS);
LN10 = new Decimal(LN10);
PI = new Decimal(PI);
var props$L = {
  modelValue: {
    type: [String, Number],
    default: 0
  },
  min: {
    type: [String, Number]
  },
  max: {
    type: [String, Number]
  },
  step: {
    type: [String, Number],
    default: 1
  },
  color: {
    type: String
  },
  inputWidth: {
    type: [String, Number]
  },
  inputTextSize: {
    type: [String, Number]
  },
  buttonSize: {
    type: [String, Number]
  },
  elevation: {
    type: [Boolean, Number, String],
    default: true
  },
  decimalLength: {
    type: [String, Number]
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disableIncrement: {
    type: Boolean,
    default: false
  },
  disableDecrement: {
    type: Boolean,
    default: false
  },
  disableInput: {
    type: Boolean,
    default: false
  },
  lazyChange: {
    type: Boolean,
    default: false
  },
  incrementButton: {
    type: Boolean,
    default: true
  },
  decrementButton: {
    type: Boolean,
    default: true
  },
  press: {
    type: Boolean,
    default: true
  },
  ripple: {
    type: Boolean,
    default: true
  },
  validateTrigger: {
    type: Array,
    default: () => ["onInputChange", "onLazyChange", "onIncrement", "onDecrement"]
  },
  rules: {
    type: Array
  },
  onBeforeChange: defineListenerProp(),
  onChange: defineListenerProp(),
  onIncrement: defineListenerProp(),
  onDecrement: defineListenerProp(),
  "onUpdate:modelValue": defineListenerProp()
};
var {
  n: n$S,
  classes: classes$J
} = createNamespace("counter");
var SPEED = 100;
var DELAY = 600;
var _hoisted_1$l = ["inputmode", "readonly", "disabled"];
function __render__$S(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  var _component_var_button = vue.resolveComponent("var-button");
  var _component_var_form_details = vue.resolveComponent("var-form-details");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box")))
    },
    [vue.createElementVNode(
      "div",
      vue.mergeProps({
        class: _ctx.classes(_ctx.n("controller"), _ctx.formatElevation(_ctx.elevation, 2), [_ctx.disabled || _ctx.formDisabled, _ctx.n("--disabled")], [_ctx.errorMessage, _ctx.n("--error")]),
        style: {
          background: _ctx.color ? _ctx.color : void 0
        }
      }, _ctx.$attrs),
      [vue.createVNode(_component_var_button, {
        class: vue.normalizeClass(_ctx.classes(_ctx.n("decrement-button"), [!_ctx.decrementButton, _ctx.n("--hidden")], [_ctx.disabled || _ctx.formDisabled, _ctx.n("--not-allowed")])),
        style: vue.normalizeStyle({
          width: _ctx.toSizeUnit(_ctx.buttonSize),
          height: _ctx.toSizeUnit(_ctx.buttonSize)
        }),
        round: "",
        "var-counter-cover": "",
        ripple: _ctx.ripple && _ctx.decrementButton && !_ctx.disabled && !_ctx.formDisabled && !_ctx.readonly && !_ctx.formReadonly && !_ctx.disableDecrement && !_ctx.isMin,
        onClick: _ctx.decrement,
        onTouchstart: _ctx.pressDecrement,
        onTouchend: _ctx.releaseDecrement,
        onTouchcancel: _ctx.releaseDecrement
      }, {
        default: vue.withCtx(() => [vue.createVNode(_component_var_icon, {
          name: "minus"
        })]),
        _: 1
        /* STABLE */
      }, 8, ["class", "style", "ripple", "onClick", "onTouchstart", "onTouchend", "onTouchcancel"]), vue.withDirectives(vue.createElementVNode("input", {
        class: vue.normalizeClass(_ctx.classes(_ctx.n("input"), [_ctx.disabled || _ctx.formDisabled, _ctx.n("--not-allowed")])),
        style: vue.normalizeStyle({
          width: _ctx.toSizeUnit(_ctx.inputWidth),
          fontSize: _ctx.toSizeUnit(_ctx.inputTextSize)
        }),
        inputmode: _ctx.toNumber(_ctx.decimalLength) === 0 ? "numeric" : "decimal",
        readonly: _ctx.readonly || _ctx.formReadonly,
        disabled: _ctx.disabled || _ctx.formDisabled || _ctx.disableInput,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.inputValue = $event),
        onChange: _cache[1] || (_cache[1] = function() {
          return _ctx.handleChange && _ctx.handleChange(...arguments);
        })
      }, null, 46, _hoisted_1$l), [[vue.vModelText, _ctx.inputValue]]), vue.createVNode(_component_var_button, {
        class: vue.normalizeClass(_ctx.classes(_ctx.n("increment-button"), [!_ctx.incrementButton, _ctx.n("--hidden")], [_ctx.disabled || _ctx.formDisabled, _ctx.n("--not-allowed")])),
        style: vue.normalizeStyle({
          width: _ctx.toSizeUnit(_ctx.buttonSize),
          height: _ctx.toSizeUnit(_ctx.buttonSize)
        }),
        round: "",
        "var-counter-cover": "",
        ripple: _ctx.ripple && _ctx.incrementButton && !_ctx.disabled && !_ctx.formDisabled && !_ctx.readonly && !_ctx.formReadonly && !_ctx.disableIncrement && !_ctx.isMax,
        onClick: _ctx.increment,
        onTouchstart: _ctx.pressIncrement,
        onTouchend: _ctx.releaseIncrement,
        onTouchcancel: _ctx.releaseIncrement
      }, {
        default: vue.withCtx(() => [vue.createVNode(_component_var_icon, {
          name: "plus"
        })]),
        _: 1
        /* STABLE */
      }, 8, ["class", "style", "ripple", "onClick", "onTouchstart", "onTouchend", "onTouchcancel"])],
      16
      /* FULL_PROPS */
    ), vue.createVNode(_component_var_form_details, {
      "error-message": _ctx.errorMessage
    }, null, 8, ["error-message"])],
    2
    /* CLASS */
  );
}
var __sfc__$T = vue.defineComponent({
  name: "VarCounter",
  components: {
    VarButton: Button,
    VarIcon: Icon,
    VarFormDetails: FormDetails
  },
  directives: {
    Ripple: Ripple$1
  },
  inheritAttrs: false,
  props: props$L,
  setup(props2) {
    var inputValue = vue.ref("");
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
    var {
      readonly: formReadonly,
      disabled: formDisabled
    } = form != null ? form : {};
    var incrementTimer;
    var decrementTimer;
    var incrementDelayTimer;
    var decrementDelayTimer;
    var validate = () => v(props2.rules, props2.modelValue);
    var validateWithTrigger = (trigger) => {
      vue.nextTick(() => {
        var {
          validateTrigger,
          rules,
          modelValue
        } = props2;
        vt(validateTrigger, trigger, rules, modelValue);
      });
    };
    var reset = () => {
      var {
        min: min2
      } = props2;
      call(props2["onUpdate:modelValue"], min2 != null ? toNumber(min2) : 0);
      resetValidation();
    };
    var counterProvider = {
      reset,
      validate,
      resetValidation
    };
    var isMax = vue.computed(() => {
      var {
        max: max2,
        modelValue
      } = props2;
      return max2 != null && toNumber(modelValue) >= toNumber(max2);
    });
    var isMin = vue.computed(() => {
      var {
        min: min2,
        modelValue
      } = props2;
      return min2 != null && toNumber(modelValue) <= toNumber(min2);
    });
    var normalizeValue = (value) => {
      var {
        decimalLength,
        max: max2,
        min: min2
      } = props2;
      var num = toNumber(value);
      if (max2 != null && num > toNumber(max2)) {
        num = toNumber(max2);
      }
      if (min2 != null && num < toNumber(min2)) {
        num = toNumber(min2);
      }
      value = String(num);
      if (decimalLength != null) {
        value = num.toFixed(toNumber(decimalLength));
      }
      return value;
    };
    var handleChange = (event) => {
      var {
        lazyChange,
        onBeforeChange
      } = props2;
      var {
        value
      } = event.target;
      var normalizedValue = normalizeValue(value);
      lazyChange ? call(onBeforeChange, toNumber(normalizedValue), change) : setNormalizedValue(normalizedValue);
      validateWithTrigger("onInputChange");
    };
    var decrement = () => {
      var {
        disabled,
        readonly,
        disableDecrement,
        decrementButton,
        lazyChange,
        step: step2,
        modelValue,
        onDecrement,
        onBeforeChange
      } = props2;
      if (formDisabled != null && formDisabled.value || formReadonly != null && formReadonly.value || disabled || readonly || disableDecrement || !decrementButton) {
        return;
      }
      if (isMin.value) {
        return;
      }
      var value = new Decimal(toNumber(modelValue)).minus(new Decimal(toNumber(step2))).toString();
      var normalizedValue = normalizeValue(value);
      var normalizedValueNum = toNumber(normalizedValue);
      call(onDecrement, normalizedValueNum);
      if (lazyChange) {
        call(onBeforeChange, normalizedValueNum, change);
      } else {
        setNormalizedValue(normalizedValue);
        validateWithTrigger("onDecrement");
      }
    };
    var increment = () => {
      var {
        disabled,
        readonly,
        disableIncrement,
        incrementButton,
        lazyChange,
        step: step2,
        modelValue,
        onIncrement,
        onBeforeChange
      } = props2;
      if (formDisabled != null && formDisabled.value || formReadonly != null && formReadonly.value || disabled || readonly || disableIncrement || !incrementButton) {
        return;
      }
      if (isMax.value) {
        return;
      }
      var value = new Decimal(toNumber(modelValue)).plus(new Decimal(toNumber(step2))).toString();
      var normalizedValue = normalizeValue(value);
      var normalizedValueNum = toNumber(normalizedValue);
      call(onIncrement, normalizedValueNum);
      if (lazyChange) {
        call(onBeforeChange, normalizedValueNum, change);
      } else {
        setNormalizedValue(normalizedValue);
        validateWithTrigger("onIncrement");
      }
    };
    var pressDecrement = () => {
      var {
        press,
        lazyChange
      } = props2;
      if (!press || lazyChange) {
        return;
      }
      decrementDelayTimer = window.setTimeout(() => {
        continuedDecrement();
      }, DELAY);
    };
    var pressIncrement = () => {
      var {
        press,
        lazyChange
      } = props2;
      if (!press || lazyChange) {
        return;
      }
      incrementDelayTimer = window.setTimeout(() => {
        continuedIncrement();
      }, DELAY);
    };
    var releaseDecrement = () => {
      decrementTimer && clearTimeout(decrementTimer);
      decrementDelayTimer && clearTimeout(decrementDelayTimer);
    };
    var releaseIncrement = () => {
      incrementTimer && clearTimeout(incrementTimer);
      incrementDelayTimer && clearTimeout(incrementDelayTimer);
    };
    var continuedIncrement = () => {
      incrementTimer = window.setTimeout(() => {
        increment();
        continuedIncrement();
      }, SPEED);
    };
    var continuedDecrement = () => {
      decrementTimer = window.setTimeout(() => {
        decrement();
        continuedDecrement();
      }, SPEED);
    };
    var setNormalizedValue = (normalizedValue) => {
      inputValue.value = normalizedValue;
      var normalizedValueNum = toNumber(normalizedValue);
      call(props2["onUpdate:modelValue"], normalizedValueNum);
    };
    var change = (value) => {
      setNormalizedValue(normalizeValue(String(value)));
      validateWithTrigger("onLazyChange");
    };
    call(bindForm, counterProvider);
    vue.watch(() => props2.modelValue, (newValue) => {
      setNormalizedValue(normalizeValue(String(newValue)));
      call(props2.onChange, toNumber(newValue));
    });
    setNormalizedValue(normalizeValue(String(props2.modelValue)));
    return {
      n: n$S,
      classes: classes$J,
      formatElevation,
      inputValue,
      errorMessage,
      formDisabled,
      formReadonly,
      isMax,
      isMin,
      validate,
      reset,
      resetValidation,
      handleChange,
      decrement,
      increment,
      pressDecrement,
      pressIncrement,
      releaseDecrement,
      releaseIncrement,
      toSizeUnit,
      toNumber
    };
  }
});
__sfc__$T.render = __render__$S;
const Counter = __sfc__$T;
Counter.install = function(app) {
  app.component(Counter.name, Counter);
};
var _CounterComponent = Counter;
var SECONDS_A_MINUTE = 60;
var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
var MILLISECONDS_A_SECOND = 1e3;
var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND;
var MS = "millisecond";
var S = "second";
var MIN = "minute";
var H = "hour";
var D = "day";
var W = "week";
var M = "month";
var Q = "quarter";
var Y = "year";
var DATE = "date";
var FORMAT_DEFAULT = "YYYY-MM-DDTHH:mm:ssZ";
var INVALID_DATE_STRING = "Invalid Date";
var REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
var REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
const en = {
  name: "en",
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
};
var padStart = function padStart2(string, length, pad) {
  var s = String(string);
  if (!s || s.length >= length)
    return string;
  return "" + Array(length + 1 - s.length).join(pad) + string;
};
var padZoneStr = function padZoneStr2(instance) {
  var negMinutes = -instance.utcOffset();
  var minutes = Math.abs(negMinutes);
  var hourOffset = Math.floor(minutes / 60);
  var minuteOffset = minutes % 60;
  return (negMinutes <= 0 ? "+" : "-") + padStart(hourOffset, 2, "0") + ":" + padStart(minuteOffset, 2, "0");
};
var monthDiff = function monthDiff2(a, b) {
  if (a.date() < b.date())
    return -monthDiff2(b, a);
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
  var anchor = a.clone().add(wholeMonthDiff, M);
  var c = b - anchor < 0;
  var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), M);
  return +(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
};
var absFloor = function absFloor2(n2) {
  return n2 < 0 ? Math.ceil(n2) || 0 : Math.floor(n2);
};
var prettyUnit = function prettyUnit2(u) {
  var special = {
    M,
    y: Y,
    w: W,
    d: D,
    D: DATE,
    h: H,
    m: MIN,
    s: S,
    ms: MS,
    Q
  };
  return special[u] || String(u || "").toLowerCase().replace(/s$/, "");
};
var isUndefined = function isUndefined2(s) {
  return s === void 0;
};
const U = {
  s: padStart,
  z: padZoneStr,
  m: monthDiff,
  a: absFloor,
  p: prettyUnit,
  u: isUndefined
};
var L = "en";
var Ls = {};
Ls[L] = en;
var isDayjs = function isDayjs2(d) {
  return d instanceof Dayjs;
};
var parseLocale = function parseLocale2(preset, object, isLocal) {
  var l;
  if (!preset)
    return L;
  if (typeof preset === "string") {
    if (Ls[preset]) {
      l = preset;
    }
    if (object) {
      Ls[preset] = object;
      l = preset;
    }
  } else {
    var name = preset.name;
    Ls[name] = preset;
    l = name;
  }
  if (!isLocal && l)
    L = l;
  return l || !isLocal && L;
};
var dayjs = function dayjs2(date, c) {
  if (isDayjs(date)) {
    return date.clone();
  }
  var cfg = typeof c === "object" ? c : {};
  cfg.date = date;
  cfg.args = arguments;
  return new Dayjs(cfg);
};
var wrapper = function wrapper2(date, instance) {
  return dayjs(date, {
    locale: instance.$L,
    utc: instance.$u,
    x: instance.$x,
    $offset: instance.$offset
    // todo: refactor; do not use this.$offset in you code
  });
};
var Utils = U;
Utils.l = parseLocale;
Utils.i = isDayjs;
Utils.w = wrapper;
var parseDate = function parseDate2(cfg) {
  var date = cfg.date, utc = cfg.utc;
  if (date === null)
    return new Date(NaN);
  if (Utils.u(date))
    return new Date();
  if (date instanceof Date)
    return new Date(date);
  if (typeof date === "string" && !/Z$/i.test(date)) {
    var d = date.match(REGEX_PARSE);
    if (d) {
      var m = d[2] - 1 || 0;
      var ms = (d[7] || "0").substring(0, 3);
      if (utc) {
        return new Date(Date.UTC(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms));
      }
      return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
    }
  }
  return new Date(date);
};
var Dayjs = /* @__PURE__ */ function() {
  function Dayjs2(cfg) {
    this.$L = parseLocale(cfg.locale, null, true);
    this.parse(cfg);
  }
  var _proto = Dayjs2.prototype;
  _proto.parse = function parse(cfg) {
    this.$d = parseDate(cfg);
    this.$x = cfg.x || {};
    this.init();
  };
  _proto.init = function init() {
    var $d = this.$d;
    this.$y = $d.getFullYear();
    this.$M = $d.getMonth();
    this.$D = $d.getDate();
    this.$W = $d.getDay();
    this.$H = $d.getHours();
    this.$m = $d.getMinutes();
    this.$s = $d.getSeconds();
    this.$ms = $d.getMilliseconds();
  };
  _proto.$utils = function $utils() {
    return Utils;
  };
  _proto.isValid = function isValid() {
    return !(this.$d.toString() === INVALID_DATE_STRING);
  };
  _proto.isSame = function isSame(that, units) {
    var other = dayjs(that);
    return this.startOf(units) <= other && other <= this.endOf(units);
  };
  _proto.isAfter = function isAfter(that, units) {
    return dayjs(that) < this.startOf(units);
  };
  _proto.isBefore = function isBefore(that, units) {
    return this.endOf(units) < dayjs(that);
  };
  _proto.$g = function $g(input2, get, set) {
    if (Utils.u(input2))
      return this[get];
    return this.set(set, input2);
  };
  _proto.unix = function unix() {
    return Math.floor(this.valueOf() / 1e3);
  };
  _proto.valueOf = function valueOf() {
    return this.$d.getTime();
  };
  _proto.startOf = function startOf(units, _startOf) {
    var _this = this;
    var isStartOf = !Utils.u(_startOf) ? _startOf : true;
    var unit = Utils.p(units);
    var instanceFactory = function instanceFactory2(d, m) {
      var ins = Utils.w(_this.$u ? Date.UTC(_this.$y, m, d) : new Date(_this.$y, m, d), _this);
      return isStartOf ? ins : ins.endOf(D);
    };
    var instanceFactorySet = function instanceFactorySet2(method, slice) {
      var argumentStart = [0, 0, 0, 0];
      var argumentEnd = [23, 59, 59, 999];
      return Utils.w(_this.toDate()[method].apply(
        // eslint-disable-line prefer-spread
        _this.toDate("s"),
        (isStartOf ? argumentStart : argumentEnd).slice(slice)
      ), _this);
    };
    var $W = this.$W, $M = this.$M, $D = this.$D;
    var utcPad = "set" + (this.$u ? "UTC" : "");
    switch (unit) {
      case Y:
        return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);
      case M:
        return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);
      case W: {
        var weekStart = this.$locale().weekStart || 0;
        var gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
        return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
      }
      case D:
      case DATE:
        return instanceFactorySet(utcPad + "Hours", 0);
      case H:
        return instanceFactorySet(utcPad + "Minutes", 1);
      case MIN:
        return instanceFactorySet(utcPad + "Seconds", 2);
      case S:
        return instanceFactorySet(utcPad + "Milliseconds", 3);
      default:
        return this.clone();
    }
  };
  _proto.endOf = function endOf(arg) {
    return this.startOf(arg, false);
  };
  _proto.$set = function $set(units, _int) {
    var _C$D$C$DATE$C$M$C$Y$C;
    var unit = Utils.p(units);
    var utcPad = "set" + (this.$u ? "UTC" : "");
    var name = (_C$D$C$DATE$C$M$C$Y$C = {}, _C$D$C$DATE$C$M$C$Y$C[D] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[DATE] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[M] = utcPad + "Month", _C$D$C$DATE$C$M$C$Y$C[Y] = utcPad + "FullYear", _C$D$C$DATE$C$M$C$Y$C[H] = utcPad + "Hours", _C$D$C$DATE$C$M$C$Y$C[MIN] = utcPad + "Minutes", _C$D$C$DATE$C$M$C$Y$C[S] = utcPad + "Seconds", _C$D$C$DATE$C$M$C$Y$C[MS] = utcPad + "Milliseconds", _C$D$C$DATE$C$M$C$Y$C)[unit];
    var arg = unit === D ? this.$D + (_int - this.$W) : _int;
    if (unit === M || unit === Y) {
      var date = this.clone().set(DATE, 1);
      date.$d[name](arg);
      date.init();
      this.$d = date.set(DATE, Math.min(this.$D, date.daysInMonth())).$d;
    } else if (name)
      this.$d[name](arg);
    this.init();
    return this;
  };
  _proto.set = function set(string, _int2) {
    return this.clone().$set(string, _int2);
  };
  _proto.get = function get(unit) {
    return this[Utils.p(unit)]();
  };
  _proto.add = function add2(number, units) {
    var _this2 = this, _C$MIN$C$H$C$S$unit;
    number = Number(number);
    var unit = Utils.p(units);
    var instanceFactorySet = function instanceFactorySet2(n2) {
      var d = dayjs(_this2);
      return Utils.w(d.date(d.date() + Math.round(n2 * number)), _this2);
    };
    if (unit === M) {
      return this.set(M, this.$M + number);
    }
    if (unit === Y) {
      return this.set(Y, this.$y + number);
    }
    if (unit === D) {
      return instanceFactorySet(1);
    }
    if (unit === W) {
      return instanceFactorySet(7);
    }
    var step2 = (_C$MIN$C$H$C$S$unit = {}, _C$MIN$C$H$C$S$unit[MIN] = MILLISECONDS_A_MINUTE, _C$MIN$C$H$C$S$unit[H] = MILLISECONDS_A_HOUR, _C$MIN$C$H$C$S$unit[S] = MILLISECONDS_A_SECOND, _C$MIN$C$H$C$S$unit)[unit] || 1;
    var nextTimeStamp = this.$d.getTime() + number * step2;
    return Utils.w(nextTimeStamp, this);
  };
  _proto.subtract = function subtract(number, string) {
    return this.add(number * -1, string);
  };
  _proto.format = function format2(formatStr) {
    var _this3 = this;
    if (!this.isValid())
      return INVALID_DATE_STRING;
    var str = formatStr || FORMAT_DEFAULT;
    var zoneStr = Utils.z(this);
    var locale = this.$locale();
    var $H = this.$H, $m = this.$m, $M = this.$M;
    var weekdays = locale.weekdays, months = locale.months, meridiem = locale.meridiem;
    var getShort = function getShort2(arr, index, full, length) {
      return arr && (arr[index] || arr(_this3, str)) || full[index].substr(0, length);
    };
    var get$H = function get$H2(num) {
      return Utils.s($H % 12 || 12, num, "0");
    };
    var meridiemFunc = meridiem || function(hour, minute, isLowercase) {
      var m = hour < 12 ? "AM" : "PM";
      return isLowercase ? m.toLowerCase() : m;
    };
    var matches = {
      YY: String(this.$y).slice(-2),
      YYYY: this.$y,
      M: $M + 1,
      MM: Utils.s($M + 1, 2, "0"),
      MMM: getShort(locale.monthsShort, $M, months, 3),
      MMMM: getShort(months, $M),
      D: this.$D,
      DD: Utils.s(this.$D, 2, "0"),
      d: String(this.$W),
      dd: getShort(locale.weekdaysMin, this.$W, weekdays, 2),
      ddd: getShort(locale.weekdaysShort, this.$W, weekdays, 3),
      dddd: weekdays[this.$W],
      H: String($H),
      HH: Utils.s($H, 2, "0"),
      h: get$H(1),
      hh: get$H(2),
      a: meridiemFunc($H, $m, true),
      A: meridiemFunc($H, $m, false),
      m: String($m),
      mm: Utils.s($m, 2, "0"),
      s: String(this.$s),
      ss: Utils.s(this.$s, 2, "0"),
      SSS: Utils.s(this.$ms, 3, "0"),
      Z: zoneStr
      // 'ZZ' logic below
    };
    return str.replace(REGEX_FORMAT, function(match, $1) {
      return $1 || matches[match] || zoneStr.replace(":", "");
    });
  };
  _proto.utcOffset = function utcOffset() {
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  };
  _proto.diff = function diff2(input2, units, _float) {
    var _C$Y$C$M$C$Q$C$W$C$D$;
    var unit = Utils.p(units);
    var that = dayjs(input2);
    var zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE;
    var diff3 = this - that;
    var result2 = Utils.m(this, that);
    result2 = (_C$Y$C$M$C$Q$C$W$C$D$ = {}, _C$Y$C$M$C$Q$C$W$C$D$[Y] = result2 / 12, _C$Y$C$M$C$Q$C$W$C$D$[M] = result2, _C$Y$C$M$C$Q$C$W$C$D$[Q] = result2 / 3, _C$Y$C$M$C$Q$C$W$C$D$[W] = (diff3 - zoneDelta) / MILLISECONDS_A_WEEK, _C$Y$C$M$C$Q$C$W$C$D$[D] = (diff3 - zoneDelta) / MILLISECONDS_A_DAY, _C$Y$C$M$C$Q$C$W$C$D$[H] = diff3 / MILLISECONDS_A_HOUR, _C$Y$C$M$C$Q$C$W$C$D$[MIN] = diff3 / MILLISECONDS_A_MINUTE, _C$Y$C$M$C$Q$C$W$C$D$[S] = diff3 / MILLISECONDS_A_SECOND, _C$Y$C$M$C$Q$C$W$C$D$)[unit] || diff3;
    return _float ? result2 : Utils.a(result2);
  };
  _proto.daysInMonth = function daysInMonth() {
    return this.endOf(M).$D;
  };
  _proto.$locale = function $locale() {
    return Ls[this.$L];
  };
  _proto.locale = function locale(preset, object) {
    if (!preset)
      return this.$L;
    var that = this.clone();
    var nextLocaleName = parseLocale(preset, object, true);
    if (nextLocaleName)
      that.$L = nextLocaleName;
    return that;
  };
  _proto.clone = function clone2() {
    return Utils.w(this.$d, this);
  };
  _proto.toDate = function toDate() {
    return new Date(this.valueOf());
  };
  _proto.toJSON = function toJSON() {
    return this.isValid() ? this.toISOString() : null;
  };
  _proto.toISOString = function toISOString() {
    return this.$d.toISOString();
  };
  _proto.toString = function toString() {
    return this.$d.toUTCString();
  };
  return Dayjs2;
}();
var proto = Dayjs.prototype;
dayjs.prototype = proto;
[["$ms", MS], ["$s", S], ["$m", MIN], ["$H", H], ["$W", D], ["$M", M], ["$y", Y], ["$D", DATE]].forEach(function(g) {
  proto[g[1]] = function(input2) {
    return this.$g(input2, g[0], g[1]);
  };
});
dayjs.extend = function(plugin, option2) {
  if (!plugin.$i) {
    plugin(option2, Dayjs, dayjs);
    plugin.$i = true;
  }
  return dayjs;
};
dayjs.locale = parseLocale;
dayjs.isDayjs = isDayjs;
dayjs.unix = function(timestamp) {
  return dayjs(timestamp * 1e3);
};
dayjs.en = Ls[L];
dayjs.Ls = Ls;
dayjs.p = {};
const isSameOrBefore = function(o, c) {
  c.prototype.isSameOrBefore = function(that, units) {
    return this.isSame(that, units) || this.isBefore(that, units);
  };
};
const isSameOrAfter = function(o, c) {
  c.prototype.isSameOrAfter = function(that, units) {
    return this.isSame(that, units) || this.isAfter(that, units);
  };
};
function typeValidator$5(type) {
  return ["date", "month"].includes(type);
}
var MONTH_LIST = [{
  index: "01"
}, {
  index: "02"
}, {
  index: "03"
}, {
  index: "04"
}, {
  index: "05"
}, {
  index: "06"
}, {
  index: "07"
}, {
  index: "08"
}, {
  index: "09"
}, {
  index: "10"
}, {
  index: "11"
}, {
  index: "12"
}];
var WEEK_HEADER = [{
  index: "0"
}, {
  index: "1"
}, {
  index: "2"
}, {
  index: "3"
}, {
  index: "4"
}, {
  index: "5"
}, {
  index: "6"
}];
var props$K = {
  modelValue: {
    type: [String, Array]
  },
  type: {
    type: String,
    default: "date",
    validator: typeValidator$5
  },
  allowedDates: {
    type: Function
  },
  color: {
    type: String
  },
  headerColor: {
    type: String
  },
  elevation: {
    type: [Boolean, Number, String],
    default: false
  },
  buttonElevation: {
    type: [Boolean, Number, String],
    default: true
  },
  firstDayOfWeek: {
    type: [String, Number],
    default: 0
  },
  min: {
    type: String
  },
  max: {
    type: String
  },
  showCurrent: {
    type: Boolean,
    default: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  },
  range: {
    type: Boolean,
    default: false
  },
  touchable: {
    type: Boolean,
    default: true
  },
  onPreview: defineListenerProp(),
  onChange: defineListenerProp(),
  "onUpdate:modelValue": defineListenerProp()
};
var {
  n: n$R
} = createNamespace("picker-header");
function __render__$R(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  var _component_var_button = vue.resolveComponent("var-button");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n())
    },
    [vue.createVNode(_component_var_button, {
      round: "",
      text: "",
      style: {
        "filter": "opacity(0.54)"
      },
      disabled: _ctx.disabled.left,
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.checkDate("prev"))
    }, {
      default: vue.withCtx(() => [vue.createVNode(_component_var_icon, {
        name: "chevron-left"
      })]),
      _: 1
      /* STABLE */
    }, 8, ["disabled"]), vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("value")),
        onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("check-panel"))
      },
      [vue.createVNode(vue.Transition, {
        name: "var-date-picker" + (_ctx.reverse ? "-reverse" : "") + "-translatex"
      }, {
        default: vue.withCtx(() => [(vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: _ctx.showDate
          },
          vue.toDisplayString(_ctx.showDate),
          1
          /* TEXT */
        ))]),
        _: 1
        /* STABLE */
      }, 8, ["name"])],
      2
      /* CLASS */
    ), vue.createVNode(_component_var_button, {
      round: "",
      text: "",
      style: {
        "filter": "opacity(0.54)"
      },
      disabled: _ctx.disabled.right,
      onClick: _cache[2] || (_cache[2] = ($event) => _ctx.checkDate("next"))
    }, {
      default: vue.withCtx(() => [vue.createVNode(_component_var_icon, {
        name: "chevron-right"
      })]),
      _: 1
      /* STABLE */
    }, 8, ["disabled"])],
    2
    /* CLASS */
  );
}
var __sfc__$S = vue.defineComponent({
  name: "PanelHeader",
  components: {
    VarButton: Button,
    VarIcon: Icon
  },
  props: {
    date: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: "date"
    },
    disabled: {
      type: Object,
      required: true
    }
  },
  emits: ["check-panel", "check-date"],
  setup(props2, _ref) {
    var {
      emit
    } = _ref;
    var reverse = vue.ref(false);
    var forwardOrBackNum = vue.ref(0);
    var showDate = vue.computed(() => {
      var _pack$value$datePicke;
      var {
        date,
        type
      } = props2;
      var {
        previewMonth,
        previewYear
      } = date;
      if (type === "month")
        return toNumber(previewYear) + forwardOrBackNum.value;
      var monthName = (_pack$value$datePicke = pack.value.datePickerMonthDict) == null ? void 0 : _pack$value$datePicke[previewMonth.index].name;
      return pack.value.lang === "zh-CN" ? previewYear + " " + monthName : monthName + " " + previewYear;
    });
    var checkDate = (checkType) => {
      if (checkType === "prev" && props2.disabled.left || checkType === "next" && props2.disabled.right)
        return;
      emit("check-date", checkType);
      reverse.value = checkType === "prev";
      forwardOrBackNum.value += checkType === "prev" ? -1 : 1;
    };
    vue.watch(() => props2.date, () => {
      forwardOrBackNum.value = 0;
    });
    return {
      n: n$R,
      reverse,
      showDate,
      checkDate
    };
  }
});
__sfc__$S.render = __render__$R;
const PanelHeader = __sfc__$S;
function _extends$d() {
  _extends$d = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$d.apply(this, arguments);
}
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
var {
  n: n$Q,
  classes: classes$I
} = createNamespace("month-picker");
var {
  n: nDate$1
} = createNamespace("date-picker");
function __render__$Q(_ctx, _cache) {
  var _component_panel_header = vue.resolveComponent("panel-header");
  var _component_var_button = vue.resolveComponent("var-button");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n())
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("content"))
      },
      [vue.createVNode(_component_panel_header, {
        ref: "headerEl",
        type: "month",
        date: _ctx.preview,
        disabled: _ctx.panelBtnDisabled,
        onCheckPanel: _ctx.clickYear,
        onCheckDate: _ctx.checkDate
      }, null, 8, ["date", "disabled", "onCheckPanel", "onCheckDate"]), vue.createVNode(vue.Transition, {
        name: "" + _ctx.nDate() + (_ctx.reverse ? "-reverse" : "") + "-translatex"
      }, {
        default: vue.withCtx(() => [(vue.openBlock(), vue.createElementBlock("ul", {
          key: _ctx.panelKey
        }, [(vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(_ctx.MONTH_LIST, (month) => {
            return vue.openBlock(), vue.createElementBlock("li", {
              key: month.index
            }, [vue.createVNode(_component_var_button, vue.mergeProps({
              type: "primary",
              "var-month-picker-cover": "",
              ripple: false,
              elevation: _ctx.componentProps.buttonElevation
            }, _extends$d({}, _ctx.buttonProps(month.index)), {
              onClick: (event) => _ctx.chooseMonth(month, event)
            }), {
              default: vue.withCtx(() => [vue.createTextVNode(
                vue.toDisplayString(_ctx.getMonthAbbr(month.index)),
                1
                /* TEXT */
              )]),
              _: 2
              /* DYNAMIC */
            }, 1040, ["elevation", "onClick"])]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))]))]),
        _: 1
        /* STABLE */
      }, 8, ["name"])],
      2
      /* CLASS */
    )],
    2
    /* CLASS */
  );
}
var __sfc__$R = vue.defineComponent({
  name: "MonthPickerPanel",
  components: {
    VarButton: Button,
    PanelHeader
  },
  props: {
    choose: {
      type: Object,
      required: true
    },
    preview: {
      type: Object,
      required: true
    },
    current: {
      type: String,
      required: true
    },
    clickYear: {
      type: Function,
      required: true
    },
    componentProps: {
      type: Object,
      required: true
    }
  },
  emits: ["check-preview", "choose-month"],
  setup(props2, _ref) {
    var {
      emit
    } = _ref;
    var [currentYear, currentMonth] = props2.current.split("-");
    var reverse = vue.ref(false);
    var panelKey = vue.ref(0);
    var headerEl = vue.ref(null);
    var panelBtnDisabled = vue.reactive({
      left: false,
      right: false
    });
    var isSameYear = vue.computed(() => props2.choose.chooseYear === props2.preview.previewYear);
    var isCurrentYear = vue.computed(() => props2.preview.previewYear === currentYear);
    var getMonthAbbr = (key) => {
      var _pack$value$datePicke, _pack$value$datePicke2;
      return (_pack$value$datePicke = (_pack$value$datePicke2 = pack.value.datePickerMonthDict) == null ? void 0 : _pack$value$datePicke2[key].abbr) != null ? _pack$value$datePicke : "";
    };
    var inRange = (key) => {
      var {
        preview: {
          previewYear
        },
        componentProps: {
          min: min2,
          max: max2
        }
      } = props2;
      var isBeforeMax = true;
      var isAfterMin = true;
      var previewDate = previewYear + "-" + key;
      if (max2)
        isBeforeMax = dayjs(previewDate).isSameOrBefore(dayjs(max2), "month");
      if (min2)
        isAfterMin = dayjs(previewDate).isSameOrAfter(dayjs(min2), "month");
      return isBeforeMax && isAfterMin;
    };
    var shouldChoose = (val) => {
      var {
        choose: {
          chooseMonths,
          chooseDays,
          chooseRangeMonth
        },
        componentProps: {
          type,
          range
        }
      } = props2;
      if (range) {
        if (!chooseRangeMonth.length)
          return false;
        var isBeforeMax = dayjs(val).isSameOrBefore(dayjs(chooseRangeMonth[1]), "month");
        var isAfterMin = dayjs(val).isSameOrAfter(dayjs(chooseRangeMonth[0]), "month");
        return isBeforeMax && isAfterMin;
      }
      if (type === "month")
        return chooseMonths.includes(val);
      return chooseDays.some((value) => value.includes(val));
    };
    var buttonProps = (key) => {
      var {
        choose: {
          chooseMonth: chooseMonth2
        },
        preview: {
          previewYear
        },
        componentProps: {
          allowedDates,
          color,
          multiple,
          range
        }
      } = props2;
      var val = previewYear + "-" + key;
      var monthExist = () => {
        if (range || multiple)
          return shouldChoose(val);
        return (chooseMonth2 == null ? void 0 : chooseMonth2.index) === key && isSameYear.value;
      };
      var computeDisabled = () => {
        if (!inRange(key))
          return true;
        if (!allowedDates)
          return false;
        return !allowedDates(val);
      };
      var disabled = computeDisabled();
      var computeText = () => {
        if (disabled)
          return true;
        if (range || multiple)
          return !shouldChoose(val);
        return !isSameYear.value || (chooseMonth2 == null ? void 0 : chooseMonth2.index) !== key;
      };
      var computeOutline = () => {
        if (!(isCurrentYear.value && currentMonth === key && props2.componentProps.showCurrent))
          return false;
        if ((range || multiple || isSameYear.value) && disabled)
          return true;
        if (range || multiple)
          return !shouldChoose(val);
        if (isSameYear.value)
          return (chooseMonth2 == null ? void 0 : chooseMonth2.index) !== currentMonth;
        return true;
      };
      var textColorOrCover = () => {
        if (disabled)
          return "";
        if (computeOutline())
          return color != null ? color : "";
        if (monthExist())
          return "";
        return nDate$1() + "-color-cover";
      };
      var isCover = textColorOrCover().startsWith(nDate$1());
      return {
        outline: computeOutline(),
        text: computeText(),
        color: !computeText() ? color : "",
        textColor: isCover ? "" : textColorOrCover(),
        [nDate$1() + "-color-cover"]: isCover,
        class: classes$I(n$Q("button"), [disabled, n$Q("button--disabled")])
      };
    };
    var chooseMonth = (month, event) => {
      var buttonEl = event.currentTarget;
      if (buttonEl.classList.contains(n$Q("button--disabled")))
        return;
      emit("choose-month", month);
    };
    var checkDate = (checkType) => {
      reverse.value = checkType === "prev";
      panelKey.value += checkType === "prev" ? -1 : 1;
      emit("check-preview", "year", checkType);
    };
    var forwardRef = (checkType) => {
      headerEl.value.checkDate(checkType);
    };
    vue.watch(() => props2.preview.previewYear, (year) => {
      var {
        componentProps: {
          min: min2,
          max: max2
        }
      } = props2;
      if (max2)
        panelBtnDisabled.right = !dayjs("" + (toNumber(year) + 1)).isSameOrBefore(dayjs(max2), "year");
      if (min2)
        panelBtnDisabled.left = !dayjs("" + (toNumber(year) - 1)).isSameOrAfter(dayjs(min2), "year");
    }, {
      immediate: true
    });
    return {
      n: n$Q,
      nDate: nDate$1,
      pack,
      MONTH_LIST,
      headerEl,
      reverse,
      panelKey,
      panelBtnDisabled,
      forwardRef,
      buttonProps,
      getMonthAbbr,
      chooseMonth,
      checkDate
    };
  }
});
__sfc__$R.render = __render__$Q;
const MonthPickerPanel = __sfc__$R;
var {
  n: n$P,
  classes: classes$H
} = createNamespace("year-picker");
var _hoisted_1$k = ["onClick"];
function __render__$P(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "ul",
    {
      class: vue.normalizeClass(_ctx.n())
    },
    [(vue.openBlock(true), vue.createElementBlock(
      vue.Fragment,
      null,
      vue.renderList(_ctx.yearList, (year) => {
        return vue.openBlock(), vue.createElementBlock("li", {
          key: year,
          class: vue.normalizeClass(_ctx.classes(_ctx.n("item"), [year === _ctx.toNumber(_ctx.preview), _ctx.n("item--active")])),
          style: vue.normalizeStyle({
            color: year === _ctx.toNumber(_ctx.preview) ? _ctx.componentProps.color : ""
          }),
          onClick: ($event) => _ctx.chooseYear(year)
        }, vue.toDisplayString(year), 15, _hoisted_1$k);
      }),
      128
      /* KEYED_FRAGMENT */
    ))],
    2
    /* CLASS */
  );
}
var __sfc__$Q = vue.defineComponent({
  name: "YearPickerPanel",
  props: {
    preview: {
      type: String
    },
    componentProps: {
      type: Object,
      required: true
    }
  },
  emits: ["choose-year"],
  setup(props2, _ref) {
    var {
      emit
    } = _ref;
    var yearList = vue.computed(() => {
      var list2 = [];
      var {
        preview,
        componentProps: {
          max: max2,
          min: min2
        }
      } = props2;
      if (!preview)
        return list2;
      var yearRange = [toNumber(preview) + 100, toNumber(preview) - 100];
      if (max2) {
        var formatMax = dayjs(max2).format("YYYY-MM-D");
        var year = toNumber(formatMax.split("-")[0]);
        if (year < yearRange[0] && year > yearRange[1])
          yearRange = [year, yearRange[1]];
        if (year <= yearRange[1])
          return [year];
      }
      if (min2) {
        var formatMin = dayjs(min2).format("YYYY-MM-D");
        var _year = toNumber(formatMin.split("-")[0]);
        if (_year < yearRange[0] && _year > yearRange[1])
          yearRange = [yearRange[0], _year];
        if (_year >= yearRange[0])
          return [_year];
      }
      for (var i = yearRange[0]; i >= yearRange[1]; i--) {
        list2.push(i);
      }
      return list2;
    });
    var chooseYear = (year) => {
      emit("choose-year", year);
    };
    useMounted(() => {
      var activeEl = document.querySelector("." + n$P("item--active"));
      activeEl == null ? void 0 : activeEl.scrollIntoView({
        block: "center"
      });
    });
    return {
      n: n$P,
      classes: classes$H,
      yearList,
      chooseYear,
      toNumber
    };
  }
});
__sfc__$Q.render = __render__$P;
const YearPickerPanel = __sfc__$Q;
function _extends$c() {
  _extends$c = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$c.apply(this, arguments);
}
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
var {
  n: n$O,
  classes: classes$G
} = createNamespace("day-picker");
var {
  n: nDate
} = createNamespace("date-picker");
function __render__$O(_ctx, _cache) {
  var _component_panel_header = vue.resolveComponent("panel-header");
  var _component_var_button = vue.resolveComponent("var-button");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n())
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("content"))
      },
      [vue.createVNode(_component_panel_header, {
        ref: "headerEl",
        type: "day",
        date: _ctx.preview,
        disabled: _ctx.panelBtnDisabled,
        onCheckPanel: _ctx.clickMonth,
        onCheckDate: _ctx.checkDate
      }, null, 8, ["date", "disabled", "onCheckPanel", "onCheckDate"]), vue.createVNode(vue.Transition, {
        name: "" + _ctx.nDate() + (_ctx.reverse ? "-reverse" : "") + "-translatex"
      }, {
        default: vue.withCtx(() => [(vue.openBlock(), vue.createElementBlock("div", {
          key: _ctx.panelKey
        }, [vue.createElementVNode(
          "ul",
          {
            class: vue.normalizeClass(_ctx.n("head"))
          },
          [(vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.sortWeekList, (week) => {
              return vue.openBlock(), vue.createElementBlock(
                "li",
                {
                  key: week.index
                },
                vue.toDisplayString(_ctx.getDayAbbr(week.index)),
                1
                /* TEXT */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))],
          2
          /* CLASS */
        ), vue.createElementVNode(
          "ul",
          {
            class: vue.normalizeClass(_ctx.n("body"))
          },
          [(vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.days, (day, index) => {
              return vue.openBlock(), vue.createElementBlock("li", {
                key: index
              }, [vue.createVNode(_component_var_button, vue.mergeProps({
                type: "primary",
                "var-day-picker-cover": "",
                round: "",
                ripple: false,
                elevation: _ctx.componentProps.buttonElevation
              }, _extends$c({}, _ctx.buttonProps(day)), {
                onClick: (event) => _ctx.chooseDay(day, event)
              }), {
                default: vue.withCtx(() => [vue.createTextVNode(
                  vue.toDisplayString(_ctx.filterDay(day)),
                  1
                  /* TEXT */
                )]),
                _: 2
                /* DYNAMIC */
              }, 1040, ["elevation", "onClick"])]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))],
          2
          /* CLASS */
        )]))]),
        _: 1
        /* STABLE */
      }, 8, ["name"])],
      2
      /* CLASS */
    )],
    2
    /* CLASS */
  );
}
var __sfc__$P = vue.defineComponent({
  name: "DayPickerPanel",
  components: {
    VarButton: Button,
    PanelHeader
  },
  props: {
    choose: {
      type: Object,
      required: true
    },
    preview: {
      type: Object,
      required: true
    },
    current: {
      type: String,
      required: true
    },
    clickMonth: {
      type: Function,
      required: true
    },
    componentProps: {
      type: Object,
      required: true
    }
  },
  emits: ["check-preview", "choose-day"],
  setup(props2, _ref) {
    var {
      emit
    } = _ref;
    var [currentYear, currentMonth, currentDay] = props2.current.split("-");
    var days = vue.ref([]);
    var reverse = vue.ref(false);
    var panelKey = vue.ref(0);
    var headerEl = vue.ref(null);
    var panelBtnDisabled = vue.reactive({
      left: false,
      right: false
    });
    var isCurrent = vue.computed(() => props2.preview.previewYear === currentYear && props2.preview.previewMonth.index === currentMonth);
    var isSame = vue.computed(() => {
      var _props$choose$chooseM;
      return props2.choose.chooseYear === props2.preview.previewYear && ((_props$choose$chooseM = props2.choose.chooseMonth) == null ? void 0 : _props$choose$chooseM.index) === props2.preview.previewMonth.index;
    });
    var sortWeekList = vue.computed(() => {
      var index = WEEK_HEADER.findIndex((week) => week.index === props2.componentProps.firstDayOfWeek);
      if (index === -1 || index === 0)
        return WEEK_HEADER;
      return WEEK_HEADER.slice(index).concat(WEEK_HEADER.slice(0, index));
    });
    var getDayAbbr = (key) => {
      var _pack$value$datePicke, _pack$value$datePicke2;
      return (_pack$value$datePicke = (_pack$value$datePicke2 = pack.value.datePickerWeekDict) == null ? void 0 : _pack$value$datePicke2[key].abbr) != null ? _pack$value$datePicke : "";
    };
    var filterDay = (day) => day > 0 ? day : "";
    var initDate = () => {
      var {
        preview: {
          previewMonth,
          previewYear
        }
      } = props2;
      var monthNum = dayjs(previewYear + "-" + previewMonth.index).daysInMonth();
      var firstDayToWeek = dayjs(previewYear + "-" + previewMonth.index + "-01").day();
      var index = sortWeekList.value.findIndex((week) => week.index === "" + firstDayToWeek);
      days.value = [...Array(index).fill(-1), ...Array.from(Array(monthNum + 1).keys())].filter((value) => value);
    };
    var initHeader = () => {
      var {
        preview: {
          previewYear,
          previewMonth
        },
        componentProps: {
          max: max2,
          min: min2
        }
      } = props2;
      if (max2) {
        var date = previewYear + "-" + (toNumber(previewMonth.index) + 1);
        panelBtnDisabled.right = !dayjs(date).isSameOrBefore(dayjs(max2), "month");
      }
      if (min2) {
        var _date = previewYear + "-" + (toNumber(previewMonth.index) - 1);
        panelBtnDisabled.left = !dayjs(_date).isSameOrAfter(dayjs(min2), "month");
      }
    };
    var inRange = (day) => {
      var {
        preview: {
          previewYear,
          previewMonth
        },
        componentProps: {
          min: min2,
          max: max2
        }
      } = props2;
      var isBeforeMax = true;
      var isAfterMin = true;
      var previewDate = previewYear + "-" + previewMonth.index + "-" + day;
      if (max2)
        isBeforeMax = dayjs(previewDate).isSameOrBefore(dayjs(max2), "day");
      if (min2)
        isAfterMin = dayjs(previewDate).isSameOrAfter(dayjs(min2), "day");
      return isBeforeMax && isAfterMin;
    };
    var shouldChoose = (val) => {
      var {
        choose: {
          chooseDays,
          chooseRangeDay
        },
        componentProps: {
          range
        }
      } = props2;
      if (range) {
        if (!chooseRangeDay.length)
          return false;
        var isBeforeMax = dayjs(val).isSameOrBefore(dayjs(chooseRangeDay[1]), "day");
        var isAfterMin = dayjs(val).isSameOrAfter(dayjs(chooseRangeDay[0]), "day");
        return isBeforeMax && isAfterMin;
      }
      return chooseDays.includes(val);
    };
    var buttonProps = (day) => {
      if (day < 0) {
        return {
          text: true,
          outline: false,
          textColor: "",
          class: n$O("button")
        };
      }
      var {
        choose: {
          chooseDay: chooseDay2
        },
        preview: {
          previewYear,
          previewMonth
        },
        componentProps: {
          allowedDates,
          color,
          multiple,
          range
        }
      } = props2;
      var val = previewYear + "-" + previewMonth.index + "-" + day;
      var dayExist = () => {
        if (range || multiple)
          return shouldChoose(val);
        return toNumber(chooseDay2) === day && isSame.value;
      };
      var computeDisabled = () => {
        if (!inRange(day))
          return true;
        if (!allowedDates)
          return false;
        return !allowedDates(val);
      };
      var disabled = computeDisabled();
      var computeText = () => {
        if (disabled)
          return true;
        if (range || multiple)
          return !shouldChoose(val);
        return !isSame.value || toNumber(chooseDay2) !== day;
      };
      var computeOutline = () => {
        if (!(isCurrent.value && toNumber(currentDay) === day && props2.componentProps.showCurrent))
          return false;
        if ((range || multiple || isSame.value) && disabled)
          return true;
        if (range || multiple)
          return !shouldChoose(val);
        if (isSame.value)
          return chooseDay2 !== currentDay;
        return true;
      };
      var textColorOrCover = () => {
        if (disabled)
          return "";
        if (computeOutline())
          return color != null ? color : "";
        if (dayExist())
          return "";
        return nDate() + "-color-cover";
      };
      var isCover = textColorOrCover().startsWith(nDate());
      return {
        text: computeText(),
        outline: computeOutline(),
        textColor: isCover ? "" : textColorOrCover(),
        [nDate() + "-color-cover"]: isCover,
        class: classes$G(n$O("button"), n$O("button--usable"), [disabled, n$O("button--disabled")])
      };
    };
    var checkDate = (checkType) => {
      reverse.value = checkType === "prev";
      panelKey.value += checkType === "prev" ? -1 : 1;
      emit("check-preview", "month", checkType);
    };
    var chooseDay = (day, event) => {
      var buttonEl = event.currentTarget;
      if (buttonEl.classList.contains(n$O("button--disabled")))
        return;
      emit("choose-day", day);
    };
    var forwardRef = (checkType) => {
      headerEl.value.checkDate(checkType);
    };
    useMounted(() => {
      initDate();
      initHeader();
    });
    vue.watch(() => props2.preview, () => {
      initDate();
      initHeader();
    });
    return {
      n: n$O,
      nDate,
      days,
      reverse,
      headerEl,
      panelKey,
      sortWeekList,
      panelBtnDisabled,
      forwardRef,
      filterDay,
      getDayAbbr,
      checkDate,
      chooseDay,
      buttonProps
    };
  }
});
__sfc__$P.render = __render__$O;
const DayPickerPanel = __sfc__$P;
var {
  n: n$N,
  classes: classes$F
} = createNamespace("date-picker");
function __render__$N(_ctx, _cache) {
  var _component_year_picker_panel = vue.resolveComponent("year-picker-panel");
  var _component_month_picker_panel = vue.resolveComponent("month-picker-panel");
  var _component_day_picker_panel = vue.resolveComponent("day-picker-panel");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.formatElevation(_ctx.elevation, 2)))
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("title")),
        style: vue.normalizeStyle({
          background: _ctx.headerColor || _ctx.color
        })
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("title-year"), [_ctx.isYearPanel, _ctx.n("title-year--active")])),
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.clickEl("year"))
        },
        [vue.renderSlot(_ctx.$slots, "year", {
          year: _ctx.chooseYear
        }, () => [vue.createTextVNode(
          vue.toDisplayString(_ctx.chooseYear),
          1
          /* TEXT */
        )])],
        2
        /* CLASS */
      ), vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("title-date"), [!_ctx.isYearPanel, _ctx.n("title-date--active")], [_ctx.range, _ctx.n("title-date--range")])),
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.clickEl("date"))
        },
        [vue.createVNode(vue.Transition, {
          name: _ctx.multiple ? "" : "" + _ctx.n() + (_ctx.reverse ? "-reverse" : "") + "-translatey"
        }, {
          default: vue.withCtx(() => {
            var _ctx$chooseMonth, _ctx$chooseMonth2, _ctx$chooseMonth3;
            return [_ctx.type === "month" ? (vue.openBlock(), vue.createElementBlock("div", {
              key: "" + _ctx.chooseYear + ((_ctx$chooseMonth = _ctx.chooseMonth) == null ? void 0 : _ctx$chooseMonth.index)
            }, [_ctx.range ? vue.renderSlot(_ctx.$slots, "range", {
              key: 0,
              choose: _ctx.getChoose.chooseRangeMonth
            }, () => [vue.createTextVNode(
              vue.toDisplayString(_ctx.getMonthTitle),
              1
              /* TEXT */
            )]) : _ctx.multiple ? vue.renderSlot(_ctx.$slots, "multiple", {
              key: 1,
              choose: _ctx.getChoose.chooseMonths
            }, () => [vue.createTextVNode(
              vue.toDisplayString(_ctx.getMonthTitle),
              1
              /* TEXT */
            )]) : vue.renderSlot(_ctx.$slots, "month", {
              key: 2,
              month: (_ctx$chooseMonth2 = _ctx.chooseMonth) == null ? void 0 : _ctx$chooseMonth2.index,
              year: _ctx.chooseYear
            }, () => [vue.createTextVNode(
              vue.toDisplayString(_ctx.getMonthTitle),
              1
              /* TEXT */
            )])])) : (vue.openBlock(), vue.createElementBlock("div", {
              key: "" + _ctx.chooseYear + ((_ctx$chooseMonth3 = _ctx.chooseMonth) == null ? void 0 : _ctx$chooseMonth3.index) + _ctx.chooseDay
            }, [_ctx.range ? vue.renderSlot(_ctx.$slots, "range", {
              key: 0,
              choose: _ctx.formatRange
            }, () => [vue.createTextVNode(
              vue.toDisplayString(_ctx.getDateTitle),
              1
              /* TEXT */
            )]) : _ctx.multiple ? vue.renderSlot(_ctx.$slots, "multiple", {
              key: 1,
              choose: _ctx.getChoose.chooseDays
            }, () => [vue.createTextVNode(
              vue.toDisplayString(_ctx.getDateTitle),
              1
              /* TEXT */
            )]) : vue.renderSlot(_ctx.$slots, "date", vue.normalizeProps(vue.mergeProps({
              key: 2
            }, _ctx.slotProps)), () => [vue.createTextVNode(
              vue.toDisplayString(_ctx.getDateTitle),
              1
              /* TEXT */
            )])]))];
          }),
          _: 3
          /* FORWARDED */
        }, 8, ["name"])],
        2
        /* CLASS */
      )],
      6
      /* CLASS, STYLE */
    ), vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("body")),
        onTouchstart: _cache[2] || (_cache[2] = function() {
          return _ctx.handleTouchstart && _ctx.handleTouchstart(...arguments);
        }),
        onTouchmove: _cache[3] || (_cache[3] = function() {
          return _ctx.handleTouchmove && _ctx.handleTouchmove(...arguments);
        }),
        onTouchend: _cache[4] || (_cache[4] = function() {
          return _ctx.handleTouchend && _ctx.handleTouchend(...arguments);
        })
      },
      [vue.createVNode(vue.Transition, {
        name: _ctx.n() + "-panel-fade"
      }, {
        default: vue.withCtx(() => [_ctx.getPanelType === "year" ? (vue.openBlock(), vue.createBlock(_component_year_picker_panel, {
          key: 0,
          "component-props": _ctx.componentProps,
          preview: _ctx.previewYear,
          onChooseYear: _ctx.getChooseYear
        }, null, 8, ["component-props", "preview", "onChooseYear"])) : _ctx.getPanelType === "month" ? (vue.openBlock(), vue.createBlock(_component_month_picker_panel, {
          key: 1,
          ref: "monthPanelEl",
          current: _ctx.currentDate,
          choose: _ctx.getChoose,
          preview: _ctx.getPreview,
          "click-year": () => _ctx.clickEl("year"),
          "component-props": _ctx.componentProps,
          onChooseMonth: _ctx.getChooseMonth,
          onCheckPreview: _ctx.checkPreview
        }, null, 8, ["current", "choose", "preview", "click-year", "component-props", "onChooseMonth", "onCheckPreview"])) : _ctx.getPanelType === "date" ? (vue.openBlock(), vue.createBlock(_component_day_picker_panel, {
          key: 2,
          ref: "dayPanelEl",
          current: _ctx.currentDate,
          choose: _ctx.getChoose,
          preview: _ctx.getPreview,
          "component-props": _ctx.componentProps,
          "click-month": () => _ctx.clickEl("month"),
          onChooseDay: _ctx.getChooseDay,
          onCheckPreview: _ctx.checkPreview
        }, null, 8, ["current", "choose", "preview", "component-props", "click-month", "onChooseDay", "onCheckPreview"])) : vue.createCommentVNode("v-if", true)]),
        _: 1
        /* STABLE */
      }, 8, ["name"])],
      34
      /* CLASS, HYDRATE_EVENTS */
    )],
    2
    /* CLASS */
  );
}
var __sfc__$O = vue.defineComponent({
  name: "VarDatePicker",
  components: {
    MonthPickerPanel,
    YearPickerPanel,
    DayPickerPanel
  },
  props: props$K,
  setup(props2) {
    var startX = 0;
    var startY = 0;
    var checkType = "";
    var touchDirection;
    var currentDate = dayjs().format("YYYY-MM-D");
    var [currentYear, currentMonth] = currentDate.split("-");
    var monthDes = MONTH_LIST.find((month) => month.index === currentMonth);
    var isYearPanel = vue.ref(false);
    var isMonthPanel = vue.ref(false);
    var rangeDone = vue.ref(true);
    var chooseMonth = vue.ref();
    var chooseYear = vue.ref();
    var chooseDay = vue.ref();
    var previewMonth = vue.ref(monthDes);
    var previewYear = vue.ref(currentYear);
    var reverse = vue.ref(false);
    var chooseMonths = vue.ref([]);
    var chooseDays = vue.ref([]);
    var chooseRangeMonth = vue.ref([]);
    var chooseRangeDay = vue.ref([]);
    var monthPanelEl = vue.ref(null);
    var dayPanelEl = vue.ref(null);
    var componentProps = vue.reactive({
      allowedDates: props2.allowedDates,
      type: props2.type,
      color: props2.color,
      firstDayOfWeek: props2.firstDayOfWeek,
      min: props2.min,
      max: props2.max,
      showCurrent: props2.showCurrent,
      multiple: props2.multiple,
      range: props2.range,
      buttonElevation: props2.buttonElevation
    });
    var getChoose = vue.computed(() => ({
      chooseMonth: chooseMonth.value,
      chooseYear: chooseYear.value,
      chooseDay: chooseDay.value,
      chooseMonths: chooseMonths.value,
      chooseDays: chooseDays.value,
      chooseRangeMonth: chooseRangeMonth.value,
      chooseRangeDay: chooseRangeDay.value
    }));
    var getPreview = vue.computed(() => ({
      previewMonth: previewMonth.value,
      previewYear: previewYear.value
    }));
    var getMonthTitle = vue.computed(() => {
      var {
        multiple,
        range
      } = props2;
      if (range) {
        return chooseRangeMonth.value.length ? chooseRangeMonth.value[0] + " ~ " + chooseRangeMonth.value[1] : "";
      }
      var monthName = "";
      if (chooseMonth.value) {
        var _pack$value$datePicke, _pack$value$datePicke2;
        monthName = (_pack$value$datePicke = (_pack$value$datePicke2 = pack.value.datePickerMonthDict) == null ? void 0 : _pack$value$datePicke2[chooseMonth.value.index].name) != null ? _pack$value$datePicke : "";
      }
      return multiple ? "" + chooseMonths.value.length + pack.value.datePickerSelected : monthName;
    });
    var getDateTitle = vue.computed(() => {
      var _pack$value$datePicke3, _pack$value$datePicke4, _pack$value$datePicke5, _pack$value$datePicke6;
      var {
        multiple,
        range
      } = props2;
      if (range) {
        var formatRangeDays = chooseRangeDay.value.map((date) => dayjs(date).format("YYYY-MM-DD"));
        return formatRangeDays.length ? formatRangeDays[0] + " ~ " + formatRangeDays[1] : "";
      }
      if (multiple)
        return "" + chooseDays.value.length + pack.value.datePickerSelected;
      if (!chooseYear.value || !chooseMonth.value || !chooseDay.value)
        return "";
      var weekIndex = dayjs(chooseYear.value + "-" + chooseMonth.value.index + "-" + chooseDay.value).day();
      var week = WEEK_HEADER.find((value) => value.index === "" + weekIndex);
      var weekName = (_pack$value$datePicke3 = (_pack$value$datePicke4 = pack.value.datePickerWeekDict) == null ? void 0 : _pack$value$datePicke4[week.index].name) != null ? _pack$value$datePicke3 : "";
      var monthName = (_pack$value$datePicke5 = (_pack$value$datePicke6 = pack.value.datePickerMonthDict) == null ? void 0 : _pack$value$datePicke6[chooseMonth.value.index].name) != null ? _pack$value$datePicke5 : "";
      var showDay = padStart$1(chooseDay.value, 2, "0");
      if (pack.value.lang === "zh-CN")
        return chooseMonth.value.index + "-" + showDay + " " + weekName.slice(0, 3);
      return weekName.slice(0, 3) + ", " + monthName.slice(0, 3) + " " + chooseDay.value;
    });
    var getPanelType = vue.computed(() => {
      if (isYearPanel.value)
        return "year";
      if (props2.type === "month" || isMonthPanel.value)
        return "month";
      if (props2.type === "date")
        return "date";
      return "";
    });
    var isUntouchable = vue.computed(() => {
      return !props2.touchable || ["", "year"].includes(getPanelType.value);
    });
    var slotProps = vue.computed(() => {
      var _chooseMonth$value, _chooseYear$value, _chooseMonth$value$in, _chooseMonth$value2;
      var weekIndex = dayjs(chooseYear.value + "-" + ((_chooseMonth$value = chooseMonth.value) == null ? void 0 : _chooseMonth$value.index) + "-" + chooseDay.value).day();
      var date = chooseDay.value ? padStart$1(chooseDay.value, 2, "0") : "";
      return {
        week: "" + weekIndex,
        year: (_chooseYear$value = chooseYear.value) != null ? _chooseYear$value : "",
        month: (_chooseMonth$value$in = (_chooseMonth$value2 = chooseMonth.value) == null ? void 0 : _chooseMonth$value2.index) != null ? _chooseMonth$value$in : "",
        date
      };
    });
    var formatRange = vue.computed(() => getChoose.value.chooseRangeDay.map((choose) => dayjs(choose).format("YYYY-MM-DD")));
    var isSameYear = vue.computed(() => chooseYear.value === previewYear.value);
    var isSameMonth = vue.computed(() => {
      var _chooseMonth$value3;
      return ((_chooseMonth$value3 = chooseMonth.value) == null ? void 0 : _chooseMonth$value3.index) === previewMonth.value.index;
    });
    var clickEl = (type) => {
      if (type === "year")
        isYearPanel.value = true;
      else if (type === "month")
        isMonthPanel.value = true;
      else {
        isYearPanel.value = false;
        isMonthPanel.value = false;
      }
    };
    var handleTouchstart = (event) => {
      if (isUntouchable.value)
        return;
      var {
        clientX,
        clientY
      } = event.touches[0];
      startX = clientX;
      startY = clientY;
    };
    var getDirection = (x, y) => {
      return x >= y && x > 20 ? "x" : "y";
    };
    var handleTouchmove = (event) => {
      if (isUntouchable.value)
        return;
      var {
        clientX,
        clientY
      } = event.touches[0];
      var x = clientX - startX;
      var y = clientY - startY;
      touchDirection = getDirection(Math.abs(x), Math.abs(y));
      checkType = x > 0 ? "prev" : "next";
    };
    var handleTouchend = () => {
      if (isUntouchable.value || touchDirection !== "x")
        return;
      var componentRef = getPanelType.value === "month" ? monthPanelEl : dayPanelEl;
      nextTickFrame(() => {
        componentRef.value.forwardRef(checkType);
        resetState();
      });
    };
    var updateRange = (date, type) => {
      var rangeDate = type === "month" ? chooseRangeMonth : chooseRangeDay;
      rangeDate.value = rangeDone.value ? [date, date] : [rangeDate.value[0], date];
      rangeDone.value = !rangeDone.value;
      if (rangeDone.value) {
        var isChangeOrder = dayjs(rangeDate.value[0]).isAfter(rangeDate.value[1]);
        var _date = isChangeOrder ? [rangeDate.value[1], rangeDate.value[0]] : [...rangeDate.value];
        call(props2["onUpdate:modelValue"], _date);
        call(props2.onChange, _date);
      }
    };
    var updateMultiple = (date, type) => {
      var multipleDates = type === "month" ? chooseMonths : chooseDays;
      var formatType = type === "month" ? "YYYY-MM" : "YYYY-MM-DD";
      var formatDates = multipleDates.value.map((date2) => dayjs(date2).format(formatType));
      var index = formatDates.findIndex((choose) => choose === date);
      if (index === -1)
        formatDates.push(date);
      else
        formatDates.splice(index, 1);
      call(props2["onUpdate:modelValue"], formatDates);
      call(props2.onChange, formatDates);
    };
    var getReverse = (dateType, date) => {
      if (!chooseYear.value || !chooseMonth.value)
        return false;
      if (!isSameYear.value)
        return chooseYear.value > previewYear.value;
      if (dateType === "month")
        return date.index < chooseMonth.value.index;
      return isSameMonth.value ? date < toNumber(chooseDay.value) : chooseMonth.value.index > previewMonth.value.index;
    };
    var getChooseDay = (day) => {
      var {
        readonly,
        range,
        multiple,
        onChange,
        "onUpdate:modelValue": updateModelValue
      } = props2;
      if (day < 0 || readonly)
        return;
      reverse.value = getReverse("day", day);
      var date = previewYear.value + "-" + previewMonth.value.index + "-" + day;
      var formatDate = dayjs(date).format("YYYY-MM-DD");
      if (range)
        updateRange(formatDate, "day");
      else if (multiple)
        updateMultiple(formatDate, "day");
      else {
        call(updateModelValue, formatDate);
        call(onChange, formatDate);
      }
    };
    var getChooseMonth = (month) => {
      var {
        type,
        readonly,
        range,
        multiple,
        onChange,
        onPreview,
        "onUpdate:modelValue": updateModelValue
      } = props2;
      reverse.value = getReverse("month", month);
      if (type === "month" && !readonly) {
        var date = previewYear.value + "-" + month.index;
        if (range)
          updateRange(date, "month");
        else if (multiple)
          updateMultiple(date, "month");
        else {
          call(updateModelValue, date);
          call(onChange, date);
        }
      } else {
        previewMonth.value = month;
        call(onPreview, toNumber(previewYear.value), toNumber(previewMonth.value.index));
      }
      isMonthPanel.value = false;
    };
    var getChooseYear = (year) => {
      previewYear.value = "" + year;
      isYearPanel.value = false;
      isMonthPanel.value = true;
      call(props2.onPreview, toNumber(previewYear.value), toNumber(previewMonth.value.index));
    };
    var checkPreview = (type, checkType2) => {
      var changeValue = checkType2 === "prev" ? -1 : 1;
      if (type === "year") {
        previewYear.value = "" + (toNumber(previewYear.value) + changeValue);
      } else {
        var checkIndex = toNumber(previewMonth.value.index) + changeValue;
        if (checkIndex < 1) {
          previewYear.value = "" + (toNumber(previewYear.value) - 1);
          checkIndex = 12;
        }
        if (checkIndex > 12) {
          previewYear.value = "" + (toNumber(previewYear.value) + 1);
          checkIndex = 1;
        }
        previewMonth.value = MONTH_LIST.find((month) => toNumber(month.index) === checkIndex);
      }
      call(props2.onPreview, toNumber(previewYear.value), toNumber(previewMonth.value.index));
    };
    var checkValue = () => {
      if ((props2.multiple || props2.range) && !isArray(props2.modelValue)) {
        console.error('[Varlet] DatePicker: type of prop "modelValue" should be an Array');
        return false;
      }
      if (!props2.multiple && !props2.range && isArray(props2.modelValue)) {
        console.error('[Varlet] DatePicker: type of prop "modelValue" should be a String');
        return false;
      }
      return true;
    };
    var invalidFormatDate = (date) => {
      if (isArray(date))
        return false;
      if (date === "Invalid Date") {
        console.error('[Varlet] DatePicker: "modelValue" is an Invalid Date');
        return true;
      }
      return false;
    };
    var rangeInit = (value, type) => {
      var rangeDate = type === "month" ? chooseRangeMonth : chooseRangeDay;
      var formatType = type === "month" ? "YYYY-MM" : "YYYY-MM-D";
      var formatDateList = value.map((choose) => dayjs(choose).format(formatType)).slice(0, 2);
      var isValid = rangeDate.value.some((date) => invalidFormatDate(date));
      if (isValid)
        return;
      rangeDate.value = formatDateList;
      var isChangeOrder = dayjs(rangeDate.value[0]).isAfter(rangeDate.value[1]);
      if (rangeDate.value.length === 2 && isChangeOrder) {
        rangeDate.value = [rangeDate.value[1], rangeDate.value[0]];
      }
    };
    var multipleInit = (value, type) => {
      var rangeDate = type === "month" ? chooseMonths : chooseDays;
      var formatType = type === "month" ? "YYYY-MM" : "YYYY-MM-D";
      var formatDateList = Array.from(new Set(value.map((choose) => dayjs(choose).format(formatType))));
      rangeDate.value = formatDateList.filter((date) => date !== "Invalid Date");
    };
    var dateInit = (value) => {
      var formatDate = dayjs(value).format("YYYY-MM-D");
      if (invalidFormatDate(formatDate))
        return;
      var [yearValue, monthValue, dayValue] = formatDate.split("-");
      var monthDes2 = MONTH_LIST.find((month) => month.index === monthValue);
      chooseMonth.value = monthDes2;
      chooseYear.value = yearValue;
      chooseDay.value = dayValue;
      previewMonth.value = monthDes2;
      previewYear.value = yearValue;
    };
    var resetState = () => {
      startY = 0;
      startX = 0;
      checkType = "";
      touchDirection = void 0;
    };
    vue.watch(() => props2.modelValue, (value) => {
      if (!checkValue() || invalidFormatDate(value) || !value)
        return;
      if (props2.range) {
        if (!isArray(value))
          return;
        rangeDone.value = value.length !== 1;
        rangeInit(value, props2.type);
      } else if (props2.multiple) {
        if (!isArray(value))
          return;
        multipleInit(value, props2.type);
      } else {
        dateInit(value);
      }
    }, {
      immediate: true
    });
    vue.watch(getPanelType, resetState);
    return {
      n: n$N,
      classes: classes$F,
      monthPanelEl,
      dayPanelEl,
      reverse,
      currentDate,
      chooseMonth,
      chooseYear,
      chooseDay,
      previewYear,
      isYearPanel,
      isMonthPanel,
      getMonthTitle,
      getDateTitle,
      getPanelType,
      getChoose,
      getPreview,
      componentProps,
      slotProps,
      formatRange,
      clickEl,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      getChooseDay,
      getChooseMonth,
      getChooseYear,
      checkPreview,
      formatElevation
    };
  }
});
__sfc__$O.render = __render__$N;
const DatePicker = __sfc__$O;
DatePicker.install = function(app) {
  app.component(DatePicker.name, DatePicker);
};
var _DatePickerComponent = DatePicker;
function _extends$b() {
  _extends$b = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$b.apply(this, arguments);
}
function messageAlignValidator(messageAlign) {
  return ["left", "center", "right"].includes(messageAlign);
}
var props$J = _extends$b({
  show: {
    type: Boolean,
    default: false
  },
  width: {
    type: [Number, String]
  },
  title: {
    type: String
  },
  message: {
    type: String
  },
  messageAlign: {
    type: String,
    default: "left",
    validator: messageAlignValidator
  },
  confirmButton: {
    type: Boolean,
    default: true
  },
  cancelButton: {
    type: Boolean,
    default: true
  },
  confirmButtonText: {
    type: String
  },
  cancelButtonText: {
    type: String
  },
  confirmButtonTextColor: {
    type: String
  },
  cancelButtonTextColor: {
    type: String
  },
  confirmButtonColor: {
    type: String
  },
  cancelButtonColor: {
    type: String
  },
  dialogClass: {
    type: String
  },
  dialogStyle: {
    type: Object
  },
  onBeforeClose: defineListenerProp(),
  onConfirm: defineListenerProp(),
  onCancel: defineListenerProp(),
  "onUpdate:show": defineListenerProp()
}, pickProps(props$19, [
  "overlay",
  "overlayClass",
  "overlayStyle",
  "lockScroll",
  "closeOnClickOverlay",
  "teleport",
  "onOpen",
  "onClose",
  "onOpened",
  "onClosed",
  "onClickOverlay",
  // internal for function call closes the dialog
  "onRouteChange"
]));
function _extends$a() {
  _extends$a = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$a.apply(this, arguments);
}
var {
  n: n$M,
  classes: classes$E
} = createNamespace("dialog");
function __render__$M(_ctx, _cache) {
  var _component_var_button = vue.resolveComponent("var-button");
  var _component_var_popup = vue.resolveComponent("var-popup");
  return vue.openBlock(), vue.createBlock(_component_var_popup, {
    class: vue.normalizeClass(_ctx.n("popup")),
    "var-dialog-cover": "",
    show: _ctx.popupShow,
    overlay: _ctx.overlay,
    "overlay-class": _ctx.overlayClass,
    "overlay-style": _ctx.overlayStyle,
    "lock-scroll": _ctx.lockScroll,
    "close-on-click-overlay": _ctx.popupCloseOnClickOverlay,
    teleport: _ctx.teleport,
    onOpen: _ctx.onOpen,
    onClose: _ctx.onClose,
    onClosed: _ctx.onClosed,
    onOpened: _ctx.onOpened,
    onRouteChange: _ctx.onRouteChange,
    onClickOverlay: _ctx.handleClickOverlay
  }, {
    default: vue.withCtx(() => [vue.createElementVNode(
      "div",
      vue.mergeProps({
        class: _ctx.classes(_ctx.n("$--box"), _ctx.n(), _ctx.dialogClass),
        style: _extends$a({
          width: _ctx.toSizeUnit(_ctx.width)
        }, _ctx.dialogStyle)
      }, _ctx.$attrs),
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("title"))
        },
        [vue.renderSlot(_ctx.$slots, "title", {}, () => [vue.createTextVNode(
          vue.toDisplayString(_ctx.dt(_ctx.title, _ctx.pack.dialogTitle)),
          1
          /* TEXT */
        )])],
        2
        /* CLASS */
      ), vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("message")),
          style: vue.normalizeStyle({
            textAlign: _ctx.messageAlign
          })
        },
        [vue.renderSlot(_ctx.$slots, "default", {}, () => [vue.createTextVNode(
          vue.toDisplayString(_ctx.message),
          1
          /* TEXT */
        )])],
        6
        /* CLASS, STYLE */
      ), vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("actions"))
        },
        [_ctx.cancelButton ? (vue.openBlock(), vue.createBlock(_component_var_button, {
          key: 0,
          class: vue.normalizeClass(_ctx.classes(_ctx.n("button"), _ctx.n("cancel-button"))),
          "var-dialog-cover": "",
          text: "",
          "text-color": _ctx.cancelButtonTextColor,
          color: _ctx.cancelButtonColor,
          onClick: _ctx.cancel
        }, {
          default: vue.withCtx(() => [vue.createTextVNode(
            vue.toDisplayString(_ctx.dt(_ctx.cancelButtonText, _ctx.pack.dialogCancelButtonText)),
            1
            /* TEXT */
          )]),
          _: 1
          /* STABLE */
        }, 8, ["class", "text-color", "color", "onClick"])) : vue.createCommentVNode("v-if", true), _ctx.confirmButton ? (vue.openBlock(), vue.createBlock(_component_var_button, {
          key: 1,
          class: vue.normalizeClass(_ctx.classes(_ctx.n("button"), _ctx.n("confirm-button"))),
          "var-dialog-cover": "",
          text: "",
          "text-color": _ctx.confirmButtonTextColor,
          color: _ctx.confirmButtonColor,
          onClick: _ctx.confirm
        }, {
          default: vue.withCtx(() => [vue.createTextVNode(
            vue.toDisplayString(_ctx.dt(_ctx.confirmButtonText, _ctx.pack.dialogConfirmButtonText)),
            1
            /* TEXT */
          )]),
          _: 1
          /* STABLE */
        }, 8, ["class", "text-color", "color", "onClick"])) : vue.createCommentVNode("v-if", true)],
        2
        /* CLASS */
      )],
      16
      /* FULL_PROPS */
    )]),
    _: 3
    /* FORWARDED */
  }, 8, ["class", "show", "overlay", "overlay-class", "overlay-style", "lock-scroll", "close-on-click-overlay", "teleport", "onOpen", "onClose", "onClosed", "onOpened", "onRouteChange", "onClickOverlay"]);
}
var __sfc__$N = vue.defineComponent({
  name: "VarDialog",
  components: {
    VarPopup: Popup,
    VarButton: Button
  },
  inheritAttrs: false,
  props: props$J,
  setup(props2) {
    var popupShow = vue.ref(false);
    var popupCloseOnClickOverlay = vue.ref(false);
    var done = () => call(props2["onUpdate:show"], false);
    var handleClickOverlay = () => {
      var {
        closeOnClickOverlay,
        onClickOverlay,
        onBeforeClose
      } = props2;
      call(onClickOverlay);
      if (!closeOnClickOverlay) {
        return;
      }
      if (onBeforeClose != null) {
        call(onBeforeClose, "close", done);
        return;
      }
      call(props2["onUpdate:show"], false);
    };
    var confirm = () => {
      var {
        onBeforeClose,
        onConfirm
      } = props2;
      call(onConfirm);
      if (onBeforeClose != null) {
        call(onBeforeClose, "confirm", done);
        return;
      }
      call(props2["onUpdate:show"], false);
    };
    var cancel = () => {
      var {
        onBeforeClose,
        onCancel
      } = props2;
      call(onCancel);
      if (onBeforeClose != null) {
        call(onBeforeClose, "cancel", done);
        return;
      }
      call(props2["onUpdate:show"], false);
    };
    vue.watch(() => props2.show, (newValue) => {
      popupShow.value = newValue;
    }, {
      immediate: true
    });
    vue.watch(() => props2.closeOnClickOverlay, (newValue) => {
      if (props2.onBeforeClose != null) {
        popupCloseOnClickOverlay.value = false;
        return;
      }
      popupCloseOnClickOverlay.value = newValue;
    }, {
      immediate: true
    });
    return {
      n: n$M,
      classes: classes$E,
      pack,
      dt,
      popupShow,
      popupCloseOnClickOverlay,
      handleClickOverlay,
      confirm,
      cancel,
      toSizeUnit
    };
  }
});
__sfc__$N.render = __render__$M;
const VarDialog = __sfc__$N;
function _extends$9() {
  _extends$9 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$9.apply(this, arguments);
}
var singletonOptions$2;
var defaultOptions$2 = {};
function normalizeOptions$2(options) {
  if (options === void 0) {
    options = {};
  }
  if (isString(options)) {
    return _extends$9({}, defaultOptions$2, {
      message: options
    });
  }
  return _extends$9({}, defaultOptions$2, options);
}
function Dialog(options) {
  if (!inBrowser()) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    Dialog.close();
    var dialogOptions = normalizeOptions$2(options);
    var reactiveDialogOptions = vue.reactive(dialogOptions);
    reactiveDialogOptions.teleport = "body";
    singletonOptions$2 = reactiveDialogOptions;
    var {
      unmountInstance
    } = mountInstance(VarDialog, reactiveDialogOptions, {
      onConfirm: () => {
        call(reactiveDialogOptions.onConfirm);
        resolve("confirm");
      },
      onCancel: () => {
        call(reactiveDialogOptions.onCancel);
        resolve("cancel");
      },
      onClose: () => {
        call(reactiveDialogOptions.onClose);
        resolve("close");
      },
      onClosed: () => {
        call(reactiveDialogOptions.onClosed);
        unmountInstance();
        singletonOptions$2 === reactiveDialogOptions && (singletonOptions$2 = null);
      },
      onRouteChange: () => {
        unmountInstance();
        singletonOptions$2 === reactiveDialogOptions && (singletonOptions$2 = null);
      },
      "onUpdate:show": (value) => {
        reactiveDialogOptions.show = value;
      }
    });
    reactiveDialogOptions.show = true;
  });
}
Dialog.setDefaultOptions = function(options) {
  defaultOptions$2 = options;
};
Dialog.resetDefaultOptions = function() {
  defaultOptions$2 = {};
};
Dialog.close = function() {
  if (singletonOptions$2 != null) {
    var prevSingletonOptions = singletonOptions$2;
    singletonOptions$2 = null;
    vue.nextTick().then(() => {
      prevSingletonOptions.show = false;
    });
  }
};
VarDialog.install = function(app) {
  app.component(VarDialog.name, VarDialog);
};
Dialog.install = function(app) {
  app.component(VarDialog.name, VarDialog);
};
Dialog.Component = VarDialog;
var _DialogComponent = VarDialog;
var props$I = {
  inset: {
    type: [Boolean, Number, String],
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  description: {
    type: String
  },
  margin: {
    type: String
  },
  dashed: {
    type: Boolean,
    default: false
  },
  hairline: {
    type: Boolean,
    default: false
  }
};
function _extends$8() {
  _extends$8 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$8.apply(this, arguments);
}
var {
  n: n$L,
  classes: classes$D
} = createNamespace("divider");
function __render__$L(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"), [_ctx.vertical, _ctx.n("--vertical")], [_ctx.withText, _ctx.n("--with-text")], [_ctx.isInset, _ctx.n("--inset")], [_ctx.dashed, _ctx.n("--dashed")], [_ctx.hairline, _ctx.n("--hairline")])),
      style: vue.normalizeStyle(_ctx.style)
    },
    [vue.renderSlot(_ctx.$slots, "default", {}, () => [_ctx.description ? (vue.openBlock(), vue.createElementBlock(
      "span",
      {
        key: 0,
        class: vue.normalizeClass(_ctx.n("text"))
      },
      vue.toDisplayString(_ctx.description),
      3
      /* TEXT, CLASS */
    )) : vue.createCommentVNode("v-if", true)])],
    6
    /* CLASS, STYLE */
  );
}
var __sfc__$M = vue.defineComponent({
  name: "VarDivider",
  props: props$I,
  setup(props2, _ref) {
    var {
      slots
    } = _ref;
    var state = vue.reactive({
      withText: false
    });
    var isInset = vue.computed(() => {
      return isBoolean(props2.inset) ? props2.inset : true;
    });
    var style = vue.computed(() => {
      var {
        inset,
        vertical,
        margin
      } = props2;
      var baseStyle = {
        margin
      };
      if (isBoolean(inset) || inset === 0) {
        return _extends$8({}, baseStyle);
      }
      var _inset = toNumber(inset);
      var absInsetWithUnit = Math.abs(_inset) + (inset + "").replace(_inset + "", "");
      return vertical ? _extends$8({}, baseStyle, {
        height: "calc(80% - " + toSizeUnit(absInsetWithUnit) + ")"
      }) : _extends$8({}, baseStyle, {
        width: "calc(100% - " + toSizeUnit(absInsetWithUnit) + ")",
        left: _inset > 0 ? toSizeUnit(absInsetWithUnit) : toSizeUnit(0)
      });
    });
    var checkHasText = () => {
      state.withText = Boolean(slots.default) || Boolean(props2.description);
    };
    useMounted(() => {
      checkHasText();
    });
    vue.onUpdated(() => {
      checkHasText();
    });
    return _extends$8({
      n: n$L,
      classes: classes$D
    }, vue.toRefs(state), {
      style,
      isInset
    });
  }
});
__sfc__$M.render = __render__$L;
const Divider = __sfc__$M;
Divider.install = function(app) {
  app.component(Divider.name, Divider);
};
var _DividerComponent = Divider;
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash$1[matched];
  });
}
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start$1 = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start$1, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start$1, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash[matched];
  });
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}
var max = Math.max;
var min = Math.min;
var round = Math.round;
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
function listScrollParents(element, list2) {
  var _element$ownerDocumen;
  if (list2 === void 0) {
    list2 = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list2.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
function getVariation(placement) {
  return placement.split("-")[1];
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start$1:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
    }
  }
  return offsets;
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
    if (process.env.NODE_ENV !== "production") {
      console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
    }
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start$1;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check2) {
      return check2;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check2) {
            return check2;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
const flip$1 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
const offset$1 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result2 = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result2.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result2;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return [].concat(args).reduce(function(p, c) {
    return p.replace(/%s/, c);
  }, str);
}
var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function validateModifiers(modifiers) {
  modifiers.forEach(function(modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self2) {
      return self2.indexOf(value) === index;
    }).forEach(function(key) {
      switch (key) {
        case "name":
          if (typeof modifier.name !== "string") {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
          }
          break;
        case "enabled":
          if (typeof modifier.enabled !== "boolean") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
          }
          break;
        case "phase":
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
          }
          break;
        case "fn":
          if (typeof modifier.fn !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "effect":
          if (modifier.effect != null && typeof modifier.effect !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "requires":
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
          }
          break;
        case "requiresIfExists":
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
          }
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
            return '"' + s + '"';
          }).join(", ") + '; but "' + key + '" was provided.');
      }
      modifier.requires && modifier.requires.forEach(function(requirement) {
        if (modifiers.find(function(mod2) {
          return mod2.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}
function uniqueBy(arr, fn2) {
  var identifiers = /* @__PURE__ */ new Set();
  return arr.filter(function(item) {
    var identifier = fn2(item);
    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions2 = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions2;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions2),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions2(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions2, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        if (process.env.NODE_ENV !== "production") {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function(_ref2) {
              var name = _ref2.name;
              return name === "flip";
            });
            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
            }
          }
          var _getComputedStyle = getComputedStyle(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
          if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
          }
        }
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          if (process.env.NODE_ENV !== "production") {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (process.env.NODE_ENV !== "production") {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      if (process.env.NODE_ENV !== "production") {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect2 = _ref3.effect;
        if (typeof effect2 === "function") {
          var cleanupFn = effect2({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var passive = {
  passive: true
};
function effect$1(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
const eventListeners = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect$1,
  data: {}
};
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
const popperOffsets$1 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  if (process.env.NODE_ENV !== "production") {
    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || "";
    if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
const computeStyles$1 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
const applyStyles$1 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};
var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
function _extends$7() {
  _extends$7 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$7.apply(this, arguments);
}
function asyncGeneratorStep$9(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error2) {
    reject(error2);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator$9(fn2) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn2.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep$9(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep$9(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
function usePopover(options) {
  var host = vue.ref(null);
  var popover = vue.ref(null);
  var hostSize = vue.ref({
    width: 0,
    height: 0
  });
  var show = useVModel(options, "show", {
    passive: true,
    defaultValue: false,
    emit(event, value) {
      if (value) {
        resize();
        call(options.onOpen);
      } else {
        call(options.onClose);
      }
    }
  });
  var {
    zIndex
  } = useZIndex(() => show.value, 1);
  var popoverInstance = null;
  var enterPopover = false;
  var enterHost = false;
  var computeHostSize = () => {
    var {
      width,
      height
    } = window.getComputedStyle(host.value);
    hostSize.value = {
      width: toPxNum(width),
      height: toPxNum(height)
    };
  };
  var handleHostMouseenter = () => {
    if (options.trigger !== "hover") {
      return;
    }
    enterHost = true;
    open();
  };
  var handleHostMouseleave = /* @__PURE__ */ function() {
    var _ref = _asyncToGenerator$9(function* () {
      if (options.trigger !== "hover") {
        return;
      }
      enterHost = false;
      yield doubleRaf();
      if (enterPopover) {
        return;
      }
      close();
    });
    return function handleHostMouseleave2() {
      return _ref.apply(this, arguments);
    };
  }();
  var handlePopoverMouseenter = () => {
    if (options.trigger !== "hover") {
      return;
    }
    enterPopover = true;
  };
  var handlePopoverMouseleave = /* @__PURE__ */ function() {
    var _ref2 = _asyncToGenerator$9(function* () {
      if (options.trigger !== "hover") {
        return;
      }
      enterPopover = false;
      yield doubleRaf();
      if (enterHost) {
        return;
      }
      close();
    });
    return function handlePopoverMouseleave2() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleHostClick = () => {
    open();
  };
  var handlePopoverClose = () => {
    show.value = false;
    call(options["onUpdate:show"], false);
  };
  var handleClickOutside = () => {
    if (options.trigger !== "click") {
      return;
    }
    handlePopoverClose();
  };
  var getPosition = () => {
    computeHostSize();
    var offset2 = {
      x: toPxNum(options.offsetX),
      y: toPxNum(options.offsetY)
    };
    switch (options.placement) {
      case "cover-top":
        return {
          placement: "bottom",
          skidding: offset2.x,
          distance: offset2.y - hostSize.value.height
        };
      case "cover-top-start":
        return {
          placement: "bottom-start",
          skidding: offset2.x,
          distance: offset2.y - hostSize.value.height
        };
      case "cover-top-end":
        return {
          placement: "bottom-end",
          skidding: offset2.x,
          distance: offset2.y - hostSize.value.height
        };
      case "cover-bottom":
        return {
          placement: "top",
          skidding: offset2.x,
          distance: -offset2.y - hostSize.value.height
        };
      case "cover-bottom-start":
        return {
          placement: "top-start",
          skidding: offset2.x,
          distance: -offset2.y - hostSize.value.height
        };
      case "cover-bottom-end":
        return {
          placement: "top-end",
          skidding: offset2.x,
          distance: -offset2.y - hostSize.value.height
        };
      case "cover-left":
        return {
          placement: "right",
          skidding: offset2.y,
          distance: offset2.x - hostSize.value.width
        };
      case "cover-right":
        return {
          placement: "left",
          skidding: offset2.y,
          distance: -offset2.x - hostSize.value.width
        };
      case "left":
      case "left-start":
      case "left-end":
        return {
          placement: options.placement,
          skidding: offset2.y,
          distance: -offset2.x
        };
      case "top":
      case "top-start":
      case "top-end":
        return {
          placement: options.placement,
          skidding: offset2.x,
          distance: -offset2.y
        };
      case "bottom":
      case "bottom-start":
      case "bottom-end":
        return {
          placement: options.placement,
          skidding: offset2.x,
          distance: offset2.y
        };
      case "right":
      case "right-start":
      case "right-end":
        return {
          placement: options.placement,
          skidding: offset2.y,
          distance: offset2.x
        };
    }
  };
  var getPopperOptions = () => {
    var {
      placement,
      skidding,
      distance
    } = getPosition();
    var modifiers = [_extends$7({}, flip$1, {
      enabled: show.value
    }), _extends$7({}, offset$1, {
      options: {
        offset: [skidding, distance]
      }
    })];
    return {
      placement,
      modifiers
    };
  };
  var resize = () => {
    popoverInstance.setOptions(getPopperOptions());
  };
  var open = () => {
    var {
      disabled
    } = options;
    if (disabled) {
      return;
    }
    show.value = true;
    call(options["onUpdate:show"], true);
  };
  var close = () => {
    show.value = false;
    call(options["onUpdate:show"], false);
  };
  useClickOutside(host, "click", handleClickOutside);
  vue.watch(() => options.offsetX, resize);
  vue.watch(() => options.offsetY, resize);
  vue.watch(() => options.placement, resize);
  vue.watch(() => options.disabled, close);
  vue.onMounted(() => {
    var _host$value;
    var reference2 = options.reference ? (_host$value = host.value) == null ? void 0 : _host$value.querySelector(options.reference) : host.value;
    popoverInstance = createPopper(reference2 != null ? reference2 : host.value, popover.value, getPopperOptions());
  });
  vue.onUnmounted(() => {
    popoverInstance.destroy();
  });
  return {
    show,
    popover,
    zIndex,
    host,
    hostSize,
    handleHostClick,
    handleHostMouseenter,
    handleHostMouseleave,
    handlePopoverClose,
    handlePopoverMouseenter,
    handlePopoverMouseleave,
    resize,
    open,
    close
  };
}
function triggerValidator$2(trigger) {
  return ["click", "hover"].includes(trigger);
}
function placementValidator$1(alignment) {
  return ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "right", "right-start", "right-end", "left", "left-start", "left-end"].includes(alignment);
}
function typeValidator$4(type) {
  return ["default", "primary", "info", "success", "warning", "danger"].includes(type);
}
var props$H = {
  type: {
    type: String,
    default: "default",
    validator: typeValidator$4
  },
  color: {
    type: String
  },
  content: {
    type: String
  },
  show: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  trigger: {
    type: String,
    default: "hover",
    validator: triggerValidator$2
  },
  reference: {
    type: String
  },
  placement: {
    type: String,
    default: "bottom",
    validator: placementValidator$1
  },
  offsetX: {
    type: [Number, String],
    default: 0
  },
  offsetY: {
    type: [Number, String],
    default: 0
  },
  teleport: {
    type: [String, Object],
    default: "body"
  },
  sameWidth: {
    type: Boolean,
    default: false
  },
  onOpen: defineListenerProp(),
  onOpened: defineListenerProp(),
  onClose: defineListenerProp(),
  onClosed: defineListenerProp(),
  "onUpdate:show": defineListenerProp()
};
var {
  n: n$K,
  classes: classes$C
} = createNamespace("tooltip");
function __render__$K(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      ref: "host",
      class: vue.normalizeClass(_ctx.n()),
      onClick: _cache[3] || (_cache[3] = function() {
        return _ctx.handleHostClick && _ctx.handleHostClick(...arguments);
      }),
      onMouseenter: _cache[4] || (_cache[4] = function() {
        return _ctx.handleHostMouseenter && _ctx.handleHostMouseenter(...arguments);
      }),
      onMouseleave: _cache[5] || (_cache[5] = function() {
        return _ctx.handleHostMouseleave && _ctx.handleHostMouseleave(...arguments);
      })
    },
    [vue.renderSlot(_ctx.$slots, "default"), (vue.openBlock(), vue.createBlock(vue.Teleport, {
      to: _ctx.teleport
    }, [vue.createVNode(vue.Transition, {
      name: _ctx.n(),
      onAfterEnter: _ctx.onOpened,
      onAfterLeave: _ctx.onClosed
    }, {
      default: vue.withCtx(() => [vue.withDirectives(vue.createElementVNode(
        "div",
        {
          ref: "popover",
          class: vue.normalizeClass(_ctx.n("tooltip")),
          style: vue.normalizeStyle({
            zIndex: _ctx.zIndex
          }),
          onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
          }, ["stop"])),
          onMouseenter: _cache[1] || (_cache[1] = function() {
            return _ctx.handlePopoverMouseenter && _ctx.handlePopoverMouseenter(...arguments);
          }),
          onMouseleave: _cache[2] || (_cache[2] = function() {
            return _ctx.handlePopoverMouseleave && _ctx.handlePopoverMouseleave(...arguments);
          })
        },
        [vue.createElementVNode(
          "div",
          {
            style: vue.normalizeStyle({
              background: _ctx.color,
              width: _ctx.sameWidth ? _ctx.toSizeUnit(Math.ceil(_ctx.hostSize.width)) : void 0
            }),
            class: vue.normalizeClass(_ctx.classes(_ctx.n("content-container"), _ctx.n("--" + _ctx.type)))
          },
          [vue.renderSlot(_ctx.$slots, "content", {}, () => [vue.createTextVNode(
            vue.toDisplayString(_ctx.content),
            1
            /* TEXT */
          )])],
          6
          /* CLASS, STYLE */
        )],
        38
        /* CLASS, STYLE, HYDRATE_EVENTS */
      ), [[vue.vShow, _ctx.show]])]),
      _: 3
      /* FORWARDED */
    }, 8, ["name", "onAfterEnter", "onAfterLeave"])], 8, ["to"]))],
    34
    /* CLASS, HYDRATE_EVENTS */
  );
}
var __sfc__$L = vue.defineComponent({
  name: "VarTooltip",
  props: props$H,
  setup(props2) {
    var {
      popover,
      host,
      hostSize,
      show,
      zIndex,
      handleHostClick,
      handleHostMouseenter,
      handleHostMouseleave,
      handlePopoverMouseenter,
      handlePopoverMouseleave,
      handlePopoverClose,
      // expose
      open,
      // expose
      close,
      // expose
      resize
    } = usePopover(props2);
    return {
      toSizeUnit,
      popover,
      host,
      hostSize,
      show,
      zIndex,
      n: n$K,
      classes: classes$C,
      handleHostClick,
      handlePopoverClose,
      handleHostMouseenter,
      handleHostMouseleave,
      handlePopoverMouseenter,
      handlePopoverMouseleave,
      resize,
      open,
      close
    };
  }
});
__sfc__$L.render = __render__$K;
const Tooltip = __sfc__$L;
Tooltip.install = function(app) {
  app.component(Tooltip.name, Tooltip);
};
var _TooltipComponent = Tooltip;
function expandTriggerValidator(expandTrigger) {
  return ["click"].includes(expandTrigger);
}
var props$G = {
  expandTrigger: {
    type: String,
    validator: expandTriggerValidator
  },
  lineClamp: {
    type: [Number, String]
  },
  tooltip: {
    type: [Object, Boolean],
    default: true
  }
};
function _extends$6() {
  _extends$6 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$6.apply(this, arguments);
}
var {
  n: n$J,
  classes: classes$B
} = createNamespace("ellipsis");
var _hoisted_1$j = {
  key: 0
};
function __render__$J(_ctx, _cache) {
  var _component_var_tooltip = vue.resolveComponent("var-tooltip");
  return vue.openBlock(), vue.createBlock(
    _component_var_tooltip,
    vue.normalizeProps(vue.guardReactiveProps(_ctx.tooltip)),
    {
      content: vue.withCtx(() => [vue.renderSlot(_ctx.$slots, "tooltip-content", {}, () => {
        var _ctx$tooltip;
        return [(_ctx$tooltip = _ctx.tooltip) != null && _ctx$tooltip.content ? (vue.openBlock(), vue.createElementBlock(
          "span",
          _hoisted_1$j,
          vue.toDisplayString(_ctx.tooltip.content),
          1
          /* TEXT */
        )) : vue.renderSlot(_ctx.$slots, "default", {
          key: 1
        })];
      })]),
      default: vue.withCtx(() => [vue.createElementVNode(
        "span",
        {
          class: vue.normalizeClass(_ctx.classes(_ctx.n(), [_ctx.lineClamp, _ctx.n("--clamp"), _ctx.n("--line")], [_ctx.expandTrigger, _ctx.n("--cursor")], [_ctx.expanding, _ctx.n("--expand")])),
          style: vue.normalizeStyle(_ctx.rootStyles),
          onClick: _cache[0] || (_cache[0] = function() {
            return _ctx.handleClick && _ctx.handleClick(...arguments);
          })
        },
        [vue.renderSlot(_ctx.$slots, "default")],
        6
        /* CLASS, STYLE */
      )]),
      _: 3
      /* FORWARDED */
    },
    16
    /* FULL_PROPS */
  );
}
var __sfc__$K = vue.defineComponent({
  name: "VarEllipsis",
  components: {
    VarTooltip: Tooltip
  },
  props: props$G,
  setup(props2) {
    var expanding = vue.ref(false);
    var rootStyles = vue.computed(() => {
      if (!props2.lineClamp) {
        return {};
      }
      return {
        "-webkit-line-clamp": props2.lineClamp
      };
    });
    var tooltip2 = vue.computed(() => {
      if (props2.tooltip === false) {
        return {
          disabled: true
        };
      }
      if (props2.tooltip === true) {
        return {
          sameWidth: true
        };
      }
      return _extends$6({
        sameWidth: true
      }, props2.tooltip);
    });
    var handleClick = () => {
      if (!props2.expandTrigger) {
        return;
      }
      expanding.value = !expanding.value;
    };
    return {
      n: n$J,
      classes: classes$B,
      tooltip: tooltip2,
      expanding,
      rootStyles,
      handleClick
    };
  }
});
__sfc__$K.render = __render__$J;
const Ellipsis = __sfc__$K;
Ellipsis.install = function(app) {
  app.component(Ellipsis.name, Ellipsis);
};
var _EllipsisComponent = Ellipsis;
function positionValidator$1(position) {
  return ["left-top", "right-top", "left-bottom", "right-bottom"].includes(position);
}
function directionValidator$3(direction) {
  return ["top", "right", "bottom", "left"].includes(direction);
}
function triggerValidator$1(trigger) {
  return ["click", "hover"].includes(trigger);
}
var props$F = {
  active: {
    type: Boolean,
    default: false
  },
  show: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: "primary",
    validator: typeValidator$9
  },
  position: {
    type: String,
    default: "right-bottom",
    validator: positionValidator$1
  },
  direction: {
    type: String,
    default: "top",
    validator: directionValidator$3
  },
  trigger: {
    type: String,
    default: "click",
    validator: triggerValidator$1
  },
  disabled: {
    type: Boolean,
    default: false
  },
  color: {
    type: String
  },
  inactiveIcon: {
    type: String,
    default: "plus"
  },
  activeIcon: {
    type: String,
    default: "window-close"
  },
  inactiveIconSize: {
    type: [Number, String]
  },
  activeIconSize: {
    type: [Number, String]
  },
  fixed: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: [Number, String],
    default: 90
  },
  top: {
    type: [Number, String]
  },
  bottom: {
    type: [Number, String]
  },
  left: {
    type: [Number, String]
  },
  right: {
    type: [Number, String]
  },
  elevation: {
    type: [Boolean, Number, String],
    default: true
  },
  safeArea: {
    type: Boolean,
    default: false
  },
  teleport: {
    type: String
  },
  onClick: defineListenerProp(),
  onOpen: defineListenerProp(),
  onOpened: defineListenerProp(),
  onClose: defineListenerProp(),
  onClosed: defineListenerProp(),
  "onUpdate:active": defineListenerProp()
};
function _isSlot$2(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
var {
  classes: classes$A,
  n: n$I
} = createNamespace("fab");
const Fab = vue.defineComponent({
  name: "VarFab",
  inheritAttrs: false,
  props: props$F,
  setup(props2, _ref) {
    var {
      slots,
      attrs
    } = _ref;
    var isActive = useVModel(props2, "active", {
      emit: (event, value) => call(props2["onUpdate:active"], value)
    });
    var host = vue.ref(null);
    var {
      disabled
    } = useTeleport();
    var handleClick = (e, value, childrenLength) => {
      e.stopPropagation();
      if (props2.trigger !== "click" || props2.disabled) {
        return;
      }
      if (childrenLength === 0) {
        call(props2.onClick, isActive.value, e);
        return;
      }
      isActive.value = value;
      call(props2.onClick, isActive.value, e);
      call(isActive.value ? props2.onOpen : props2.onClose);
    };
    var handleMouse = (value, childrenLength) => {
      if (props2.trigger !== "hover" || props2.disabled || childrenLength === 0) {
        return;
      }
      isActive.value = value;
      call(isActive.value ? props2.onOpen : props2.onClose);
    };
    var handleClickOutside = () => {
      if (props2.trigger !== "click" || props2.disabled) {
        return;
      }
      if (isActive.value !== false) {
        isActive.value = false;
        call(props2.onClose);
      }
    };
    var renderTrigger = () => {
      if (slots.trigger) {
        return props2.show ? slots.trigger({
          active: isActive.value
        }) : null;
      }
      return vue.withDirectives(vue.createVNode(Button, {
        "var-fab-cover": true,
        "class": n$I("trigger"),
        "type": props2.type,
        "color": props2.color,
        "disabled": props2.disabled,
        "round": true,
        "elevation": props2.elevation
      }, {
        default: () => [vue.createVNode(Icon, {
          "var-fab-cover": true,
          "class": classes$A([isActive.value, n$I("trigger-active-icon"), n$I("trigger-inactive-icon")]),
          "name": isActive.value ? props2.activeIcon : props2.inactiveIcon,
          "size": isActive.value ? props2.inactiveIconSize : props2.activeIconSize,
          "transition": 200,
          "animationClass": n$I("--trigger-icon-animation")
        }, null)]
      }), [[vue.vShow, props2.show]]);
    };
    var renderFab = () => {
      var _slot;
      var _slots$default;
      var children = flatFragment((_slots$default = slots.default == null ? void 0 : slots.default()) != null ? _slots$default : []);
      return vue.createVNode("div", vue.mergeProps({
        "class": classes$A(n$I(), n$I("--position-" + props2.position), n$I("--direction-" + props2.direction), [props2.fixed, n$I("--fixed"), n$I("--absolute")], [props2.safeArea, n$I("--safe-area")]),
        "style": {
          zIndex: toNumber(props2.zIndex),
          top: toSizeUnit(props2.top),
          bottom: toSizeUnit(props2.bottom),
          left: toSizeUnit(props2.left),
          right: toSizeUnit(props2.right)
        },
        "ref": host,
        "onClick": (e) => handleClick(e, !isActive.value, children.length),
        "onMouseleave": () => handleMouse(false, children.length),
        "onMouseenter": () => handleMouse(true, children.length)
      }, attrs), [vue.createVNode(vue.Transition, {
        "name": n$I("--active-transition")
      }, _isSlot$2(_slot = renderTrigger()) ? _slot : {
        default: () => [_slot]
      }), vue.createVNode(vue.Transition, {
        "name": n$I("--actions-transition-" + props2.direction),
        "onAfterEnter": props2.onOpened,
        "onAfterLeave": props2.onClosed
      }, {
        default: () => [vue.withDirectives(vue.createVNode("div", {
          "class": n$I("actions"),
          "onClick": (e) => e.stopPropagation()
        }, [children.map((child) => {
          return vue.createVNode("div", {
            "class": n$I("action")
          }, [child]);
        })]), [[vue.vShow, props2.show && isActive.value && children.length]])]
      })]);
    };
    vue.watch(() => props2.trigger, () => {
      isActive.value = false;
    });
    vue.watch(() => props2.disabled, () => {
      isActive.value = false;
    });
    useClickOutside(host, "click", handleClickOutside);
    return () => {
      var {
        teleport
      } = props2;
      if (teleport) {
        var _slot2;
        return vue.createVNode(vue.Teleport, {
          "to": teleport,
          "disabled": disabled.value
        }, _isSlot$2(_slot2 = renderFab()) ? _slot2 : {
          default: () => [_slot2]
        });
      }
      return renderFab();
    };
  }
});
Fab.install = function(app) {
  app.component(Fab.name, Fab);
};
var _FabComponent = Fab;
function scrollToErrorValidator(status) {
  return ["start", "end"].includes(status);
}
var props$E = {
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  scrollToError: {
    type: String,
    validator: scrollToErrorValidator
  },
  scrollToErrorOffsetY: {
    type: [String, Number],
    default: 0
  }
};
function asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error2) {
    reject(error2);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator$8(fn2) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn2.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
var {
  n: n$H
} = createNamespace("form");
function __render__$I(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n())
    },
    [vue.renderSlot(_ctx.$slots, "default")],
    2
    /* CLASS */
  );
}
var __sfc__$J = vue.defineComponent({
  name: "VarForm",
  props: props$E,
  setup(props2) {
    var disabled = vue.computed(() => props2.disabled);
    var readonly = vue.computed(() => props2.readonly);
    var {
      formItems,
      bindFormItems
    } = useFormItems();
    var scroll = (formItemElement) => {
      setTimeout(() => {
        var scroller = getParentScroller(formItemElement);
        var scrollerTop = scroller === window ? 0 : getTop$1(scroller);
        var top2 = getTop$1(formItemElement) - scrollerTop - toPxNum(props2.scrollToErrorOffsetY);
        scrollTo(scroller, {
          top: top2,
          animation: linear
        });
      }, 300);
    };
    var validate = /* @__PURE__ */ function() {
      var _ref = _asyncToGenerator$8(function* () {
        var res = yield Promise.all(formItems.map((_ref2) => {
          var {
            validate: validate2
          } = _ref2;
          return validate2();
        }));
        if (props2.scrollToError) {
          var [, errorIndex] = find(res, (r) => r === false, props2.scrollToError);
          var hasError = errorIndex > -1;
          if (hasError) {
            var _formItems$errorIndex;
            var formItemElement = (_formItems$errorIndex = formItems[errorIndex].instance.proxy) == null ? void 0 : _formItems$errorIndex.$el;
            scroll(formItemElement);
          }
          return !hasError;
        }
        return res.every((result2) => result2 === true);
      });
      return function validate2() {
        return _ref.apply(this, arguments);
      };
    }();
    var reset = () => formItems.forEach((_ref3) => {
      var {
        reset: reset2
      } = _ref3;
      return reset2();
    });
    var resetValidation = () => formItems.forEach((_ref4) => {
      var {
        resetValidation: resetValidation2
      } = _ref4;
      return resetValidation2();
    });
    var formProvider = {
      disabled,
      readonly
    };
    bindFormItems(formProvider);
    return {
      n: n$H,
      validate,
      reset,
      resetValidation
    };
  }
});
__sfc__$J.render = __render__$I;
const Form = __sfc__$J;
Form.install = function(app) {
  app.component(Form.name, Form);
};
Form.useValidation = useValidation;
Form.useForm = useForm;
var _FormComponent = Form;
function fitValidator(fit) {
  return ["fill", "contain", "cover", "none", "scale-down"].includes(fit);
}
var props$D = {
  src: {
    type: String
  },
  fit: {
    type: String,
    validator: fitValidator,
    default: "fill"
  },
  alt: {
    type: String
  },
  title: {
    type: String
  },
  width: {
    type: [String, Number]
  },
  height: {
    type: [String, Number]
  },
  radius: {
    type: [String, Number],
    default: 0
  },
  loading: {
    type: String
  },
  error: {
    type: String
  },
  lazy: {
    type: Boolean,
    default: false
  },
  ripple: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: true
  },
  onClick: defineListenerProp(),
  onLoad: defineListenerProp(),
  onError: defineListenerProp()
};
var {
  n: n$G,
  classes: classes$z
} = createNamespace("image");
var _hoisted_1$i = ["alt", "title", "lazy-error", "lazy-loading"];
var _hoisted_2$a = ["alt", "title", "src"];
function __render__$H(_ctx, _cache) {
  var _directive_lazy = vue.resolveDirective("lazy");
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"), [!_ctx.block, _ctx.n("$--inline-block")])),
      style: vue.normalizeStyle({
        width: _ctx.toSizeUnit(_ctx.width),
        height: _ctx.toSizeUnit(_ctx.height),
        "border-radius": _ctx.toSizeUnit(_ctx.radius)
      })
    },
    [_ctx.lazy ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("img", {
      key: 0,
      class: vue.normalizeClass(_ctx.n("image")),
      alt: _ctx.alt,
      title: _ctx.title,
      "lazy-error": _ctx.error,
      "lazy-loading": _ctx.loading,
      style: vue.normalizeStyle({
        objectFit: _ctx.fit
      }),
      onLoad: _cache[0] || (_cache[0] = function() {
        return _ctx.handleLoad && _ctx.handleLoad(...arguments);
      }),
      onError: _cache[1] || (_cache[1] = function() {
        return _ctx.handleError && _ctx.handleError(...arguments);
      }),
      onClick: _cache[2] || (_cache[2] = function() {
        return _ctx.handleClick && _ctx.handleClick(...arguments);
      })
    }, null, 46, _hoisted_1$i)), [[_directive_lazy, _ctx.src]]) : (vue.openBlock(), vue.createElementBlock("img", {
      key: 1,
      class: vue.normalizeClass(_ctx.n("image")),
      alt: _ctx.alt,
      title: _ctx.title,
      style: vue.normalizeStyle({
        objectFit: _ctx.fit
      }),
      src: _ctx.src,
      onLoad: _cache[3] || (_cache[3] = function() {
        return _ctx.handleLoad && _ctx.handleLoad(...arguments);
      }),
      onError: _cache[4] || (_cache[4] = function() {
        return _ctx.handleError && _ctx.handleError(...arguments);
      }),
      onClick: _cache[5] || (_cache[5] = function() {
        return _ctx.handleClick && _ctx.handleClick(...arguments);
      })
    }, null, 46, _hoisted_2$a))],
    6
    /* CLASS, STYLE */
  )), [[_directive_ripple, {
    disabled: !_ctx.ripple
  }]]);
}
var __sfc__$I = vue.defineComponent({
  name: "VarImage",
  directives: {
    Lazy: Lazy$1,
    Ripple: Ripple$1
  },
  props: props$D,
  setup(props2) {
    var handleLoad = (e) => {
      var el = e.currentTarget;
      var {
        lazy,
        onLoad,
        onError
      } = props2;
      if (lazy) {
        el._lazy.state === "success" && call(onLoad, e);
        el._lazy.state === "error" && call(onError, e);
      } else {
        call(onLoad, e);
      }
    };
    var handleError = (e) => {
      var {
        lazy,
        onError
      } = props2;
      !lazy && call(onError, e);
    };
    var handleClick = (e) => {
      call(props2.onClick, e);
    };
    return {
      n: n$G,
      classes: classes$z,
      toSizeUnit,
      handleLoad,
      handleError,
      handleClick
    };
  }
});
__sfc__$I.render = __render__$H;
const Image$1 = __sfc__$I;
Image$1.install = function(app) {
  app.component(Image$1.name, Image$1);
};
var _ImageComponent = Image$1;
var SWIPE_BIND_SWIPE_ITEM_KEY = Symbol("SWIPE_BIND_SWIPE_ITEM_KEY");
function useSwipeItems() {
  var {
    childProviders,
    length,
    bindChildren
  } = useChildren(SWIPE_BIND_SWIPE_ITEM_KEY);
  return {
    length,
    swipeItems: childProviders,
    bindSwipeItems: bindChildren
  };
}
var props$C = {
  loop: {
    type: Boolean,
    default: true
  },
  autoplay: {
    type: [String, Number]
  },
  duration: {
    type: [String, Number],
    default: 300
  },
  initialIndex: {
    type: [String, Number],
    default: 0
  },
  indicator: {
    type: Boolean,
    default: true
  },
  indicatorColor: {
    type: String
  },
  vertical: {
    type: Boolean,
    default: false
  },
  touchable: {
    type: Boolean,
    default: true
  },
  onChange: defineListenerProp()
};
function asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error2) {
    reject(error2);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator$7(fn2) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn2.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
var SWIPE_DELAY = 250;
var SWIPE_DISTANCE = 20;
var {
  n: n$F,
  classes: classes$y
} = createNamespace("swipe");
var _hoisted_1$h = ["onClick"];
function __render__$G(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n()),
      ref: "swipeEl"
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.classes(_ctx.n("track"), [_ctx.vertical, _ctx.n("--vertical")])),
        style: vue.normalizeStyle({
          width: !_ctx.vertical ? _ctx.trackSize + "px" : void 0,
          height: _ctx.vertical ? _ctx.trackSize + "px" : void 0,
          transform: "translate" + (_ctx.vertical ? "Y" : "X") + "(" + _ctx.translate + "px)",
          transitionDuration: _ctx.lockDuration ? "0ms" : _ctx.toNumber(_ctx.duration) + "ms"
        }),
        onTouchstart: _cache[0] || (_cache[0] = function() {
          return _ctx.handleTouchstart && _ctx.handleTouchstart(...arguments);
        }),
        onTouchmove: _cache[1] || (_cache[1] = function() {
          return _ctx.handleTouchmove && _ctx.handleTouchmove(...arguments);
        }),
        onTouchend: _cache[2] || (_cache[2] = function() {
          return _ctx.handleTouchend && _ctx.handleTouchend(...arguments);
        })
      },
      [vue.renderSlot(_ctx.$slots, "default")],
      38
      /* CLASS, STYLE, HYDRATE_EVENTS */
    ), vue.renderSlot(_ctx.$slots, "indicator", {
      index: _ctx.index,
      length: _ctx.length
    }, () => [_ctx.indicator && _ctx.length ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 0,
        class: vue.normalizeClass(_ctx.classes(_ctx.n("indicators"), [_ctx.vertical, _ctx.n("--indicators-vertical")]))
      },
      [(vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList(_ctx.length, (l, idx) => {
          return vue.openBlock(), vue.createElementBlock("div", {
            class: vue.normalizeClass(_ctx.classes(_ctx.n("indicator"), [_ctx.index === idx, _ctx.n("--indicator-active")], [_ctx.vertical, _ctx.n("--indicator-vertical")])),
            style: vue.normalizeStyle({
              background: _ctx.indicatorColor
            }),
            key: l,
            onClick: ($event) => _ctx.to(idx)
          }, null, 14, _hoisted_1$h);
        }),
        128
        /* KEYED_FRAGMENT */
      ))],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true)])],
    2
    /* CLASS */
  );
}
var __sfc__$H = vue.defineComponent({
  name: "VarSwipe",
  props: props$C,
  setup(props2) {
    var swipeEl = vue.ref(null);
    var size = vue.ref(0);
    var vertical = vue.computed(() => props2.vertical);
    var trackSize = vue.ref(0);
    var translate = vue.ref(0);
    var lockDuration = vue.ref(false);
    var index = vue.ref(0);
    var {
      swipeItems,
      bindSwipeItems,
      length
    } = useSwipeItems();
    var touching = false;
    var timer = -1;
    var startX;
    var startY;
    var startTime;
    var prevX;
    var prevY;
    var findSwipeItem = (idx) => swipeItems.find((_ref) => {
      var {
        index: index2
      } = _ref;
      return index2.value === idx;
    });
    var dispatchBorrower = () => {
      if (!props2.loop) {
        return;
      }
      if (translate.value >= 0) {
        findSwipeItem(length.value - 1).setTranslate(-trackSize.value);
      }
      if (translate.value <= -(trackSize.value - size.value)) {
        findSwipeItem(0).setTranslate(trackSize.value);
      }
      if (translate.value > -(trackSize.value - size.value) && translate.value < 0) {
        findSwipeItem(length.value - 1).setTranslate(0);
        findSwipeItem(0).setTranslate(0);
      }
    };
    var getSwipeIndex = (targetSwipeIndex) => {
      var swipeIndex = isNumber(targetSwipeIndex) ? targetSwipeIndex : Math.floor((translate.value - size.value / 2) / -size.value);
      var {
        loop
      } = props2;
      if (swipeIndex <= -1) {
        return loop ? -1 : 0;
      }
      if (swipeIndex >= length.value) {
        return loop ? length.value : length.value - 1;
      }
      return swipeIndex;
    };
    var swipeIndexToIndex = (swipeIndex) => {
      var {
        loop
      } = props2;
      if (swipeIndex === -1) {
        return loop ? length.value - 1 : 0;
      }
      if (swipeIndex === length.value) {
        return loop ? 0 : length.value - 1;
      }
      return swipeIndex;
    };
    var boundaryIndex = (index2) => {
      var {
        loop
      } = props2;
      if (index2 < 0) {
        return loop ? length.value - 1 : 0;
      }
      if (index2 > length.value - 1) {
        return loop ? 0 : length.value - 1;
      }
      return index2;
    };
    var fixPosition = (fn2) => {
      var overLeft = translate.value >= size.value;
      var overRight = translate.value <= -trackSize.value;
      var leftTranslate = 0;
      var rightTranslate = -(trackSize.value - size.value);
      lockDuration.value = true;
      if (overLeft || overRight) {
        lockDuration.value = true;
        translate.value = overRight ? leftTranslate : rightTranslate;
        findSwipeItem(0).setTranslate(0);
        findSwipeItem(length.value - 1).setTranslate(0);
      }
      nextTickFrame(() => {
        lockDuration.value = false;
        call(fn2);
      });
    };
    var initialIndex = () => {
      index.value = boundaryIndex(toNumber(props2.initialIndex));
    };
    var startAutoplay = () => {
      var {
        autoplay
      } = props2;
      if (!autoplay || length.value <= 1) {
        return;
      }
      stopAutoplay();
      timer = window.setTimeout(() => {
        next();
        startAutoplay();
      }, toNumber(autoplay));
    };
    var stopAutoplay = () => {
      timer && clearTimeout(timer);
    };
    var getDirection = (x, y) => {
      if (x > y && x > 10) {
        return "horizontal";
      }
      if (y > x && y > 10) {
        return "vertical";
      }
    };
    var handleTouchstart = (event) => {
      if (length.value <= 1 || !props2.touchable) {
        return;
      }
      var {
        clientX,
        clientY
      } = event.touches[0];
      startX = clientX;
      startY = clientY;
      startTime = performance.now();
      touching = true;
      stopAutoplay();
      fixPosition(() => {
        lockDuration.value = true;
      });
    };
    var handleTouchmove = (event) => {
      var {
        touchable,
        vertical: vertical2
      } = props2;
      if (!touching || !touchable) {
        return;
      }
      var {
        clientX,
        clientY
      } = event.touches[0];
      var deltaX = Math.abs(clientX - startX);
      var deltaY = Math.abs(clientY - startY);
      var direction = getDirection(deltaX, deltaY);
      var expectDirection = vertical2 ? "vertical" : "horizontal";
      if (direction === expectDirection) {
        event.preventDefault();
        var moveX = prevX !== void 0 ? clientX - prevX : 0;
        var moveY = prevY !== void 0 ? clientY - prevY : 0;
        prevX = clientX;
        prevY = clientY;
        translate.value += vertical2 ? moveY : moveX;
        dispatchBorrower();
      }
    };
    var handleTouchend = () => {
      if (!touching) {
        return;
      }
      var {
        vertical: vertical2,
        onChange
      } = props2;
      var positive = vertical2 ? prevY < startY : prevX < startX;
      var distance = vertical2 ? Math.abs(startY - prevY) : Math.abs(startX - prevX);
      var quickSwiping = performance.now() - startTime <= SWIPE_DELAY && distance >= SWIPE_DISTANCE;
      var swipeIndex = quickSwiping ? positive ? getSwipeIndex(index.value + 1) : getSwipeIndex(index.value - 1) : getSwipeIndex();
      touching = false;
      lockDuration.value = false;
      prevX = void 0;
      prevY = void 0;
      translate.value = swipeIndex * -size.value;
      var prevIndex = index.value;
      index.value = swipeIndexToIndex(swipeIndex);
      startAutoplay();
      prevIndex !== index.value && call(onChange, index.value);
    };
    var resize = () => {
      if (!swipeEl.value) {
        return;
      }
      lockDuration.value = true;
      size.value = props2.vertical ? swipeEl.value.offsetHeight : swipeEl.value.offsetWidth;
      trackSize.value = size.value * length.value;
      translate.value = index.value * -size.value;
      swipeItems.forEach((swipeItem2) => {
        swipeItem2.setTranslate(0);
      });
      startAutoplay();
      setTimeout(() => {
        lockDuration.value = false;
      });
    };
    var next = (options) => {
      if (length.value <= 1) {
        return;
      }
      var {
        loop,
        onChange
      } = props2;
      var currentIndex = index.value;
      index.value = boundaryIndex(currentIndex + 1);
      if ((options == null ? void 0 : options.event) !== false) {
        call(onChange, index.value);
      }
      fixPosition(() => {
        if (currentIndex === length.value - 1 && loop) {
          findSwipeItem(0).setTranslate(trackSize.value);
          translate.value = length.value * -size.value;
          return;
        }
        if (currentIndex !== length.value - 1) {
          translate.value = index.value * -size.value;
        }
      });
    };
    var prev = (options) => {
      if (length.value <= 1) {
        return;
      }
      var {
        loop,
        onChange
      } = props2;
      var currentIndex = index.value;
      index.value = boundaryIndex(currentIndex - 1);
      if ((options == null ? void 0 : options.event) !== false) {
        call(onChange, index.value);
      }
      fixPosition(() => {
        if (currentIndex === 0 && loop) {
          findSwipeItem(length.value - 1).setTranslate(-trackSize.value);
          translate.value = size.value;
          return;
        }
        if (currentIndex !== 0) {
          translate.value = index.value * -size.value;
        }
      });
    };
    var to = (idx, options) => {
      if (length.value <= 1 || idx === index.value) {
        return;
      }
      idx = idx < 0 ? 0 : idx;
      idx = idx >= length.value ? length.value : idx;
      var task = idx > index.value ? next : prev;
      var count = Math.abs(idx - index.value);
      Array.from({
        length: count
      }).forEach((_, index2) => {
        task({
          event: index2 === count - 1 ? options == null ? void 0 : options.event : false
        });
      });
    };
    var swipeProvider = {
      size,
      vertical
    };
    bindSwipeItems(swipeProvider);
    vue.watch(() => length.value, /* @__PURE__ */ _asyncToGenerator$7(function* () {
      yield doubleRaf();
      initialIndex();
      resize();
    }));
    vue.onActivated(resize);
    vue.onDeactivated(stopAutoplay);
    vue.onUnmounted(stopAutoplay);
    useEventListener(window, "resize", resize);
    return {
      n: n$F,
      classes: classes$y,
      length,
      index,
      swipeEl,
      trackSize,
      translate,
      lockDuration,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      next,
      prev,
      to,
      resize,
      toNumber
    };
  }
});
__sfc__$H.render = __render__$G;
const Swipe = __sfc__$H;
Swipe.install = function(app) {
  app.component(Swipe.name, Swipe);
};
var _SwipeComponent = Swipe;
function useSwipe() {
  var {
    bindParent,
    index,
    parentProvider
  } = useParent(SWIPE_BIND_SWIPE_ITEM_KEY);
  if (!bindParent) {
    error$1("SwipeItem", "<var-swipe-item/> must in <var-swipe/>");
  }
  return {
    index,
    swipe: parentProvider,
    bindSwipe: bindParent
  };
}
var {
  n: n$E
} = createNamespace("swipe-item");
function __render__$F(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n()),
      style: vue.normalizeStyle({
        width: !_ctx.vertical ? _ctx.size + "px" : void 0,
        height: _ctx.vertical ? _ctx.size + "px" : void 0,
        transform: "translate" + (_ctx.vertical ? "Y" : "X") + "(" + _ctx.translate + "px)"
      })
    },
    [vue.renderSlot(_ctx.$slots, "default")],
    6
    /* CLASS, STYLE */
  );
}
var __sfc__$G = vue.defineComponent({
  name: "VarSwipeItem",
  setup() {
    var translate = vue.ref(0);
    var {
      swipe: swipe2,
      bindSwipe,
      index
    } = useSwipe();
    var {
      size,
      vertical
    } = swipe2;
    var setTranslate = (x) => {
      translate.value = x;
    };
    var swipeItemProvider = {
      index,
      setTranslate
    };
    bindSwipe(swipeItemProvider);
    return {
      n: n$E,
      size,
      vertical,
      translate
    };
  }
});
__sfc__$G.render = __render__$F;
const SwipeItem = __sfc__$G;
SwipeItem.install = function(app) {
  app.component(SwipeItem.name, SwipeItem);
};
var _SwipeItemComponent = SwipeItem;
function _extends$5() {
  _extends$5 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$5.apply(this, arguments);
}
var props$B = _extends$5({
  show: {
    type: Boolean,
    default: false
  },
  images: {
    type: Array,
    default: () => []
  },
  current: {
    type: String
  },
  zoom: {
    type: [String, Number],
    default: 2
  },
  closeable: {
    type: Boolean,
    default: false
  },
  "onUpdate:show": defineListenerProp()
}, pickProps(props$C, ["loop", "indicator", "onChange"]), pickProps(props$19, [
  "lockScroll",
  "teleport",
  "onOpen",
  "onClose",
  "onOpened",
  "onClosed",
  // internal for function call closes the dialog
  "onRouteChange"
]));
var {
  n: n$D,
  classes: classes$x
} = createNamespace("image-preview");
var DISTANCE_OFFSET = 12;
var EVENT_DELAY = 200;
var TAP_DELAY = 350;
var ANIMATION_DURATION = 200;
var _hoisted_1$g = ["src", "alt"];
function __render__$E(_ctx, _cache) {
  var _component_var_swipe_item = vue.resolveComponent("var-swipe-item");
  var _component_var_swipe = vue.resolveComponent("var-swipe");
  var _component_var_icon = vue.resolveComponent("var-icon");
  var _component_var_popup = vue.resolveComponent("var-popup");
  return vue.openBlock(), vue.createBlock(_component_var_popup, {
    class: vue.normalizeClass(_ctx.n("popup")),
    "var-image-preview-cover": "",
    transition: _ctx.n("$-fade"),
    show: _ctx.popupShow,
    overlay: false,
    "close-on-click-overlay": false,
    "lock-scroll": _ctx.lockScroll,
    teleport: _ctx.teleport,
    onOpen: _ctx.onOpen,
    onClose: _ctx.onClose,
    onClosed: _ctx.onClosed,
    onOpened: _ctx.onOpened,
    onRouteChange: _ctx.onRouteChange
  }, {
    default: vue.withCtx(() => [vue.createVNode(_component_var_swipe, vue.mergeProps({
      class: _ctx.n("swipe"),
      "var-image-preview-cover": "",
      touchable: _ctx.canSwipe,
      indicator: _ctx.indicator && _ctx.images.length > 1,
      "initial-index": _ctx.initialIndex,
      loop: _ctx.loop,
      onChange: _ctx.onChange
    }, _ctx.$attrs), {
      default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList(_ctx.images, (image2) => {
          return vue.openBlock(), vue.createBlock(_component_var_swipe_item, {
            class: vue.normalizeClass(_ctx.n("swipe-item")),
            "var-image-preview-cover": "",
            key: image2
          }, {
            default: vue.withCtx(() => [vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(_ctx.n("zoom-container")),
                style: vue.normalizeStyle({
                  transform: "scale(" + _ctx.scale + ") translate(" + _ctx.translateX + "px, " + _ctx.translateY + "px)",
                  transitionTimingFunction: _ctx.transitionTimingFunction,
                  transitionDuration: _ctx.transitionDuration
                }),
                onTouchstart: _cache[0] || (_cache[0] = function() {
                  return _ctx.handleTouchstart && _ctx.handleTouchstart(...arguments);
                }),
                onTouchmove: _cache[1] || (_cache[1] = function() {
                  return _ctx.handleTouchmove && _ctx.handleTouchmove(...arguments);
                }),
                onTouchend: _cache[2] || (_cache[2] = function() {
                  return _ctx.handleTouchend && _ctx.handleTouchend(...arguments);
                })
              },
              [vue.createElementVNode("img", {
                class: vue.normalizeClass(_ctx.n("image")),
                src: image2,
                alt: image2
              }, null, 10, _hoisted_1$g)],
              38
              /* CLASS, STYLE, HYDRATE_EVENTS */
            )]),
            _: 2
            /* DYNAMIC */
          }, 1032, ["class"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))]),
      indicator: vue.withCtx((_ref) => {
        var {
          index,
          length
        } = _ref;
        return [vue.renderSlot(_ctx.$slots, "indicator", {
          index,
          length
        }, () => [_ctx.indicator && _ctx.images.length > 1 ? (vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: 0,
            class: vue.normalizeClass(_ctx.n("indicators"))
          },
          vue.toDisplayString(index + 1) + " / " + vue.toDisplayString(length),
          3
          /* TEXT, CLASS */
        )) : vue.createCommentVNode("v-if", true)])];
      }),
      _: 3
      /* FORWARDED */
    }, 16, ["class", "touchable", "indicator", "initial-index", "loop", "onChange"]), vue.renderSlot(_ctx.$slots, "close-icon", {}, () => [_ctx.closeable ? (vue.openBlock(), vue.createBlock(_component_var_icon, {
      key: 0,
      class: vue.normalizeClass(_ctx.n("close-icon")),
      name: "close-circle",
      "var-image-preview-cover": "",
      onClick: _ctx.close
    }, null, 8, ["class", "onClick"])) : vue.createCommentVNode("v-if", true)]), vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("extra"))
      },
      [vue.renderSlot(_ctx.$slots, "extra")],
      2
      /* CLASS */
    )]),
    _: 3
    /* FORWARDED */
  }, 8, ["class", "transition", "show", "lock-scroll", "teleport", "onOpen", "onClose", "onClosed", "onOpened", "onRouteChange"]);
}
var __sfc__$F = vue.defineComponent({
  name: "VarImagePreview",
  components: {
    VarSwipe: Swipe,
    VarSwipeItem: SwipeItem,
    VarPopup: Popup,
    VarIcon: Icon
  },
  inheritAttrs: false,
  props: props$B,
  setup(props2) {
    var popupShow = vue.ref(false);
    var initialIndex = vue.computed(() => {
      var {
        images,
        current
      } = props2;
      var index = images.findIndex((image2) => image2 === current);
      return index >= 0 ? index : 0;
    });
    var scale = vue.ref(1);
    var translateX = vue.ref(0);
    var translateY = vue.ref(0);
    var transitionTimingFunction = vue.ref(void 0);
    var transitionDuration = vue.ref(void 0);
    var canSwipe = vue.ref(true);
    var startTouch = null;
    var prevTouch = null;
    var checker = null;
    var getDistance = (touch, target) => {
      var {
        clientX: touchX,
        clientY: touchY
      } = touch;
      var {
        clientX: targetX,
        clientY: targetY
      } = target;
      return Math.abs(Math.sqrt(Math.pow(targetX - touchX, 2) + Math.pow(targetY - touchY, 2)));
    };
    var createVarTouch = (touches, target) => ({
      clientX: touches.clientX,
      clientY: touches.clientY,
      timestamp: Date.now(),
      target
    });
    var zoomIn = () => {
      scale.value = toNumber(props2.zoom);
      canSwipe.value = false;
      prevTouch = null;
      window.setTimeout(() => {
        transitionTimingFunction.value = "linear";
        transitionDuration.value = "0s";
      }, ANIMATION_DURATION);
    };
    var zoomOut = () => {
      scale.value = 1;
      translateX.value = 0;
      translateY.value = 0;
      canSwipe.value = true;
      prevTouch = null;
      transitionTimingFunction.value = void 0;
      transitionDuration.value = void 0;
    };
    var isDoubleTouch = (currentTouch) => {
      if (!prevTouch) {
        return false;
      }
      return getDistance(prevTouch, currentTouch) <= DISTANCE_OFFSET && currentTouch.timestamp - prevTouch.timestamp <= EVENT_DELAY && prevTouch.target === currentTouch.target;
    };
    var isTapTouch = (target) => {
      if (!target || !startTouch || !prevTouch) {
        return false;
      }
      return getDistance(startTouch, prevTouch) <= DISTANCE_OFFSET && Date.now() - prevTouch.timestamp < TAP_DELAY && (target === startTouch.target || target.parentNode === startTouch.target);
    };
    var handleTouchend = (event) => {
      checker = window.setTimeout(() => {
        isTapTouch(event.target) && close();
        startTouch = null;
      }, EVENT_DELAY);
    };
    var handleTouchstart = (event) => {
      checker && window.clearTimeout(checker);
      var {
        touches
      } = event;
      var currentTouch = createVarTouch(touches[0], event.currentTarget);
      startTouch = currentTouch;
      if (isDoubleTouch(currentTouch)) {
        scale.value > 1 ? zoomOut() : zoomIn();
        return;
      }
      prevTouch = currentTouch;
    };
    var getZoom = (target) => {
      var {
        offsetWidth,
        offsetHeight
      } = target;
      var {
        naturalWidth,
        naturalHeight
      } = target.querySelector("." + n$D("image"));
      return {
        width: offsetWidth,
        height: offsetHeight,
        imageRadio: naturalHeight / naturalWidth,
        rootRadio: offsetHeight / offsetWidth,
        zoom: toNumber(props2.zoom)
      };
    };
    var getLimitX = (target) => {
      var {
        zoom,
        imageRadio,
        rootRadio,
        width,
        height
      } = getZoom(target);
      if (!imageRadio) {
        return 0;
      }
      var displayWidth = imageRadio > rootRadio ? height / imageRadio : width;
      return Math.max(0, (zoom * displayWidth - width) / 2) / zoom;
    };
    var getLimitY = (target) => {
      var {
        zoom,
        imageRadio,
        rootRadio,
        width,
        height
      } = getZoom(target);
      if (!imageRadio) {
        return 0;
      }
      var displayHeight = imageRadio > rootRadio ? height : width * imageRadio;
      return Math.max(0, (zoom * displayHeight - height) / 2) / zoom;
    };
    var getMoveTranslate = (current, move, limit) => {
      if (current + move >= limit) {
        return limit;
      }
      if (current + move <= -limit) {
        return -limit;
      }
      return current + move;
    };
    var handleTouchmove = (event) => {
      if (!prevTouch) {
        return;
      }
      var target = event.currentTarget;
      var {
        touches
      } = event;
      var currentTouch = createVarTouch(touches[0], target);
      if (scale.value > 1) {
        var moveX = currentTouch.clientX - prevTouch.clientX;
        var moveY = currentTouch.clientY - prevTouch.clientY;
        var limitX = getLimitX(target);
        var limitY = getLimitY(target);
        translateX.value = getMoveTranslate(translateX.value, moveX, limitX);
        translateY.value = getMoveTranslate(translateY.value, moveY, limitY);
      }
      prevTouch = currentTouch;
    };
    var close = () => {
      if (scale.value > 1) {
        zoomOut();
        setTimeout(() => call(props2["onUpdate:show"], false), ANIMATION_DURATION);
        return;
      }
      call(props2["onUpdate:show"], false);
    };
    vue.watch(() => props2.show, (newValue) => {
      popupShow.value = newValue;
    }, {
      immediate: true
    });
    return {
      n: n$D,
      classes: classes$x,
      initialIndex,
      popupShow,
      scale,
      translateX,
      translateY,
      canSwipe,
      transitionTimingFunction,
      transitionDuration,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      close
    };
  }
});
__sfc__$F.render = __render__$E;
const VarImagePreview = __sfc__$F;
function _extends$4() {
  _extends$4 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$4.apply(this, arguments);
}
var singletonOptions$1;
var defaultOptions$1 = {};
function normalizeOptions$1(options) {
  if (options === void 0) {
    options = {};
  }
  if (isString(options)) {
    return _extends$4({}, defaultOptions$1, {
      images: [options]
    });
  }
  if (isArray(options)) {
    return _extends$4({}, defaultOptions$1, {
      images: options
    });
  }
  return _extends$4({}, defaultOptions$1, options);
}
function ImagePreview(options) {
  if (!inBrowser()) {
    return;
  }
  ImagePreview.close();
  var imagePreviewOptions = normalizeOptions$1(options);
  var reactiveImagePreviewOptions = vue.reactive(imagePreviewOptions);
  reactiveImagePreviewOptions.teleport = "body";
  singletonOptions$1 = reactiveImagePreviewOptions;
  var {
    unmountInstance
  } = mountInstance(VarImagePreview, reactiveImagePreviewOptions, {
    onClose: () => call(reactiveImagePreviewOptions.onClose),
    onClosed: () => {
      call(reactiveImagePreviewOptions.onClosed);
      unmountInstance();
      singletonOptions$1 === reactiveImagePreviewOptions && (singletonOptions$1 = null);
    },
    onRouteChange: () => {
      unmountInstance();
      singletonOptions$1 === reactiveImagePreviewOptions && (singletonOptions$1 = null);
    },
    "onUpdate:show": (value) => {
      reactiveImagePreviewOptions.show = value;
    }
  });
  reactiveImagePreviewOptions.show = true;
}
ImagePreview.close = () => {
  if (singletonOptions$1 != null) {
    var prevSingletonOptions = singletonOptions$1;
    singletonOptions$1 = null;
    vue.nextTick().then(() => {
      prevSingletonOptions.show = false;
    });
  }
};
ImagePreview.setDefaultOptions = (options) => {
  defaultOptions$1 = options;
};
ImagePreview.resetDefaultOptions = () => {
  defaultOptions$1 = {};
};
VarImagePreview.install = function(app) {
  app.component(VarImagePreview.name, VarImagePreview);
};
ImagePreview.install = function(app) {
  app.component(VarImagePreview.name, VarImagePreview);
};
ImagePreview.Component = VarImagePreview;
var _ImagePreviewComponent = VarImagePreview;
var props$A = {
  offsetTop: {
    type: [String, Number],
    default: 0
  },
  zIndex: {
    type: [String, Number],
    default: 10
  },
  cssMode: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  onScroll: defineListenerProp()
};
function asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error2) {
    reject(error2);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator$6(fn2) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn2.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
var {
  n: n$C,
  classes: classes$w
} = createNamespace("sticky");
function __render__$D(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), [_ctx.enableCSSMode, _ctx.n("--css-mode")])),
      ref: "stickyEl",
      style: vue.normalizeStyle({
        zIndex: _ctx.toNumber(_ctx.zIndex),
        top: _ctx.enableCSSMode ? _ctx.offsetTop + "px" : void 0,
        width: _ctx.enableFixedMode ? _ctx.fixedWidth : void 0,
        height: _ctx.enableFixedMode ? _ctx.fixedHeight : void 0
      })
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("wrapper")),
        ref: "wrapperEl",
        style: vue.normalizeStyle({
          zIndex: _ctx.toNumber(_ctx.zIndex),
          position: _ctx.enableFixedMode ? "fixed" : void 0,
          width: _ctx.enableFixedMode ? _ctx.fixedWrapperWidth : void 0,
          height: _ctx.enableFixedMode ? _ctx.fixedWrapperHeight : void 0,
          left: _ctx.enableFixedMode ? _ctx.fixedLeft : void 0,
          top: _ctx.enableFixedMode ? _ctx.fixedTop : void 0
        })
      },
      [vue.renderSlot(_ctx.$slots, "default")],
      6
      /* CLASS, STYLE */
    )],
    6
    /* CLASS, STYLE */
  );
}
var __sfc__$E = vue.defineComponent({
  name: "VarSticky",
  props: props$A,
  setup(props2) {
    var stickyEl = vue.ref(null);
    var wrapperEl = vue.ref(null);
    var isFixed = vue.ref(false);
    var fixedTop = vue.ref("0px");
    var fixedLeft = vue.ref("0px");
    var fixedWidth = vue.ref("auto");
    var fixedHeight = vue.ref("auto");
    var fixedWrapperWidth = vue.ref("auto");
    var fixedWrapperHeight = vue.ref("auto");
    var enableCSSMode = vue.computed(() => !props2.disabled && props2.cssMode);
    var enableFixedMode = vue.computed(() => !props2.disabled && !props2.cssMode && isFixed.value);
    var offsetTop = vue.computed(() => toPxNum(props2.offsetTop));
    var scroller;
    var computeFixedParams = () => {
      var {
        cssMode,
        disabled
      } = props2;
      if (disabled) {
        return;
      }
      var scrollerTop = 0;
      if (scroller !== window) {
        var {
          top: top2
        } = scroller.getBoundingClientRect();
        scrollerTop = top2;
      }
      var wrapper3 = wrapperEl.value;
      var sticky2 = stickyEl.value;
      var {
        top: stickyTop,
        left: stickyLeft
      } = sticky2.getBoundingClientRect();
      var currentOffsetTop = stickyTop - scrollerTop;
      if (currentOffsetTop <= offsetTop.value) {
        if (!cssMode) {
          fixedWidth.value = sticky2.offsetWidth + "px";
          fixedHeight.value = sticky2.offsetHeight + "px";
          fixedTop.value = scrollerTop + offsetTop.value + "px";
          fixedLeft.value = stickyLeft + "px";
          fixedWrapperWidth.value = wrapper3.offsetWidth + "px";
          fixedWrapperHeight.value = wrapper3.offsetHeight + "px";
          isFixed.value = true;
        }
        return {
          offsetTop: offsetTop.value,
          isFixed: true
        };
      }
      isFixed.value = false;
      return {
        offsetTop: currentOffsetTop,
        isFixed: false
      };
    };
    var handleScroll = () => {
      if (!scroller) {
        return;
      }
      var fixedParams = computeFixedParams();
      if (fixedParams) {
        call(props2.onScroll, fixedParams.offsetTop, fixedParams.isFixed);
      }
    };
    var resize = /* @__PURE__ */ function() {
      var _ref = _asyncToGenerator$6(function* () {
        isFixed.value = false;
        yield raf();
        computeFixedParams();
      });
      return function resize2() {
        return _ref.apply(this, arguments);
      };
    }();
    var addScrollListener = /* @__PURE__ */ function() {
      var _ref2 = _asyncToGenerator$6(function* () {
        yield doubleRaf();
        scroller = getParentScroller(stickyEl.value);
        scroller !== window && scroller.addEventListener("scroll", handleScroll);
        handleScroll();
      });
      return function addScrollListener2() {
        return _ref2.apply(this, arguments);
      };
    }();
    var removeScrollListener = () => {
      scroller !== window && scroller.removeEventListener("scroll", handleScroll);
    };
    vue.watch(() => props2.disabled, resize);
    useMounted(addScrollListener);
    vue.onUnmounted(removeScrollListener);
    vue.onDeactivated(removeScrollListener);
    useEventListener(window, "scroll", handleScroll);
    useEventListener(window, "resize", resize);
    return {
      n: n$C,
      classes: classes$w,
      resize,
      stickyEl,
      wrapperEl,
      isFixed,
      offsetTop,
      fixedTop,
      fixedLeft,
      fixedWidth,
      fixedHeight,
      fixedWrapperWidth,
      fixedWrapperHeight,
      enableCSSMode,
      enableFixedMode,
      toNumber
    };
  }
});
__sfc__$E.render = __render__$D;
const Sticky = __sfc__$E;
Sticky.install = function(app) {
  app.component(Sticky.name, Sticky);
};
var _StickyComponent = Sticky;
var INDEX_BAR_BIND_INDEX_ANCHOR_KEY = Symbol("INDEX_BAR_BIND_INDEX_ANCHOR_KEY");
function useIndexAnchors() {
  var {
    bindChildren,
    length,
    childProviders
  } = useChildren(INDEX_BAR_BIND_INDEX_ANCHOR_KEY);
  return {
    length,
    indexAnchors: childProviders,
    bindIndexAnchors: bindChildren
  };
}
function useIndexBar() {
  var {
    parentProvider,
    index,
    bindParent
  } = useParent(INDEX_BAR_BIND_INDEX_ANCHOR_KEY);
  if (!bindParent) {
    error$1("IndexAnchor", 'You should use this component in "IndexBar"');
  }
  return {
    index,
    indexBar: parentProvider,
    bindIndexBar: bindParent
  };
}
var props$z = {
  index: {
    type: [Number, String]
  }
};
var {
  n: n$B,
  classes: classes$v
} = createNamespace("index-anchor");
function __render__$C(_ctx, _cache) {
  return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.sticky ? _ctx.n("$-sticky") : _ctx.Transition), {
    "offset-top": _ctx.sticky ? _ctx.stickyOffsetTop : null,
    "z-index": _ctx.sticky ? _ctx.zIndex : null,
    disabled: _ctx.disabled && !_ctx.cssMode,
    "css-mode": _ctx.cssMode,
    ref: "anchorEl"
  }, {
    default: vue.withCtx(() => [vue.createElementVNode(
      "div",
      vue.mergeProps({
        class: _ctx.n()
      }, _ctx.$attrs),
      [vue.renderSlot(_ctx.$slots, "default", {}, () => [vue.createTextVNode(
        vue.toDisplayString(_ctx.name),
        1
        /* TEXT */
      )])],
      16
      /* FULL_PROPS */
    )]),
    _: 3
    /* FORWARDED */
  }, 8, ["offset-top", "z-index", "disabled", "css-mode"]);
}
var __sfc__$D = vue.defineComponent({
  name: "VarIndexAnchor",
  components: {
    VarSticky: Sticky
  },
  inheritAttrs: false,
  props: props$z,
  setup(props2) {
    var {
      index,
      indexBar: indexBar2,
      bindIndexBar
    } = useIndexBar();
    var ownTop = vue.ref(0);
    var disabled = vue.ref(false);
    var name = vue.computed(() => props2.index);
    var anchorEl = vue.ref(null);
    var {
      active,
      sticky: sticky2,
      cssMode,
      stickyOffsetTop,
      zIndex
    } = indexBar2;
    var setOwnTop = () => {
      if (!anchorEl.value)
        return;
      ownTop.value = anchorEl.value.$el ? anchorEl.value.$el.offsetTop : anchorEl.value.offsetTop;
    };
    var setDisabled = (value) => {
      disabled.value = value;
    };
    var indexAnchorProvider = {
      index,
      name,
      ownTop,
      setOwnTop,
      setDisabled
    };
    bindIndexBar(indexAnchorProvider);
    return {
      n: n$B,
      classes: classes$v,
      name,
      anchorEl,
      active,
      sticky: sticky2,
      zIndex,
      disabled,
      cssMode,
      stickyOffsetTop,
      Transition: vue.Transition
    };
  }
});
__sfc__$D.render = __render__$C;
const IndexAnchor = __sfc__$D;
IndexAnchor.install = function(app) {
  app.component(IndexAnchor.name, IndexAnchor);
};
var _IndexAnchorComponent = IndexAnchor;
var props$y = {
  sticky: {
    type: Boolean,
    default: true
  },
  stickyOffsetTop: {
    type: [String, Number],
    default: 0
  },
  /** @deprecated Use stickyCssMode to instead. */
  cssMode: {
    type: Boolean,
    default: false
  },
  stickyCssMode: {
    type: Boolean,
    default: false
  },
  hideList: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: [Number, String],
    default: 1
  },
  highlightColor: {
    type: String
  },
  duration: {
    type: [Number, String],
    default: 0
  },
  onClick: defineListenerProp(),
  onChange: defineListenerProp()
};
function asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error2) {
    reject(error2);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator$5(fn2) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn2.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
var {
  n: n$A,
  classes: classes$u
} = createNamespace("index-bar");
var _hoisted_1$f = ["onClick"];
function __render__$B(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n()),
      ref: "barEl"
    },
    [vue.renderSlot(_ctx.$slots, "default"), vue.createElementVNode(
      "ul",
      {
        class: vue.normalizeClass(_ctx.n("anchor-list")),
        style: vue.normalizeStyle({
          zIndex: _ctx.toNumber(_ctx.zIndex) + 2,
          display: _ctx.hideList ? "none" : "block"
        })
      },
      [(vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList(_ctx.anchorNameList, (anchorName) => {
          return vue.openBlock(), vue.createElementBlock("li", {
            key: anchorName,
            class: vue.normalizeClass(_ctx.classes(_ctx.n("anchor-item"), [_ctx.active === anchorName, _ctx.n("anchor-item--active")])),
            style: vue.normalizeStyle({
              color: _ctx.active === anchorName && _ctx.highlightColor ? _ctx.highlightColor : ""
            }),
            onClick: ($event) => _ctx.anchorClick({
              anchorName,
              manualCall: true
            })
          }, vue.toDisplayString(anchorName), 15, _hoisted_1$f);
        }),
        128
        /* KEYED_FRAGMENT */
      ))],
      6
      /* CLASS, STYLE */
    )],
    2
    /* CLASS */
  );
}
var __sfc__$C = vue.defineComponent({
  name: "VarIndexBar",
  props: props$y,
  setup(props2) {
    var {
      length,
      indexAnchors,
      bindIndexAnchors
    } = useIndexAnchors();
    var clickedName = vue.ref("");
    var barEl = vue.ref(null);
    var anchorNameList = vue.ref([]);
    var active = vue.ref();
    var sticky2 = vue.computed(() => props2.sticky);
    var cssMode = vue.computed(() => props2.stickyCssMode || props2.cssMode);
    var stickyOffsetTop = vue.computed(() => toPxNum(props2.stickyOffsetTop));
    var zIndex = vue.computed(() => props2.zIndex);
    var scroller = null;
    var isDeactivated = false;
    var indexBarProvider = {
      active,
      sticky: sticky2,
      cssMode,
      stickyOffsetTop,
      zIndex
    };
    bindIndexAnchors(indexBarProvider);
    var emitEvent = (anchor, options) => {
      var anchorName = isPlainObject(anchor) ? anchor.name.value : anchor;
      if (anchorName === active.value || anchorName === void 0)
        return;
      active.value = anchorName;
      if ((options == null ? void 0 : options.event) !== false) {
        call(props2.onChange, anchorName);
      }
    };
    var getOffsetTop = () => {
      if (!("getBoundingClientRect" in scroller)) {
        return 0;
      }
      var {
        top: parentTop
      } = scroller.getBoundingClientRect();
      var {
        scrollTop
      } = scroller;
      var {
        top: targetTop
      } = barEl.value.getBoundingClientRect();
      return scrollTop - parentTop + targetTop;
    };
    var handleScroll = () => {
      var scrollTop = getScrollTop(scroller);
      var scrollHeight = scroller === window ? document.body.scrollHeight : scroller.scrollHeight;
      var offsetTop = getOffsetTop();
      indexAnchors.forEach((anchor, index) => {
        var anchorTop = anchor.ownTop.value;
        var top2 = scrollTop - anchorTop + stickyOffsetTop.value - offsetTop;
        var distance = index === indexAnchors.length - 1 ? scrollHeight : indexAnchors[index + 1].ownTop.value - anchor.ownTop.value;
        anchor.setDisabled(true);
        if (top2 >= 0 && top2 < distance && clickedName.value === "") {
          anchor.setDisabled(false);
          emitEvent(anchor);
        }
      });
    };
    var anchorClick = /* @__PURE__ */ function() {
      var _ref2 = _asyncToGenerator$5(function* (_ref) {
        var {
          anchorName,
          manualCall = false,
          options
        } = _ref;
        if (manualCall) {
          call(props2.onClick, anchorName);
        }
        if (anchorName === active.value && !isDeactivated) {
          return;
        }
        var indexAnchor = indexAnchors.find((_ref3) => {
          var {
            name
          } = _ref3;
          return anchorName === name.value;
        });
        if (!indexAnchor) {
          return;
        }
        var offsetTop = getOffsetTop();
        var top2 = indexAnchor.ownTop.value - stickyOffsetTop.value + offsetTop;
        var left2 = getScrollLeft(scroller);
        clickedName.value = anchorName;
        emitEvent(anchorName, options);
        yield scrollTo(scroller, {
          left: left2,
          top: top2,
          animation: easeInOutCubic,
          duration: toNumber(props2.duration)
        });
        nextTickFrame(() => {
          clickedName.value = "";
        });
      });
      return function anchorClick2(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    var setScroller = /* @__PURE__ */ function() {
      var _ref4 = _asyncToGenerator$5(function* () {
        yield doubleRaf();
        scroller = getParentScroller(barEl.value);
      });
      return function setScroller2() {
        return _ref4.apply(this, arguments);
      };
    }();
    var addScrollerListener = () => {
      scroller.addEventListener("scroll", handleScroll);
    };
    var removeScrollerListener = () => {
      scroller.removeEventListener("scroll", handleScroll);
    };
    var scrollTo$1 = (index, options) => {
      requestAnimationFrame(() => anchorClick({
        anchorName: index,
        options
      }));
    };
    vue.watch(() => length.value, /* @__PURE__ */ _asyncToGenerator$5(function* () {
      yield doubleRaf();
      indexAnchors.forEach((_ref6) => {
        var {
          name,
          setOwnTop
        } = _ref6;
        if (name.value)
          anchorNameList.value.push(name.value);
        setOwnTop();
      });
    }));
    useMounted(/* @__PURE__ */ _asyncToGenerator$5(function* () {
      yield setScroller();
      addScrollerListener();
    }));
    vue.onBeforeUnmount(removeScrollerListener);
    vue.onDeactivated(() => {
      isDeactivated = true;
      removeScrollerListener();
    });
    vue.onActivated(() => {
      if (!isDeactivated || active.value === void 0)
        return;
      anchorClick({
        anchorName: active.value,
        options: {
          event: false
        }
      });
      isDeactivated = false;
    });
    return {
      n: n$A,
      classes: classes$u,
      barEl,
      active,
      zIndex,
      anchorNameList,
      toNumber,
      scrollTo: scrollTo$1,
      anchorClick
    };
  }
});
__sfc__$C.render = __render__$B;
const IndexBar = __sfc__$C;
IndexBar.install = function(app) {
  app.component(IndexBar.name, IndexBar);
};
var _IndexBarComponent = IndexBar;
function typeValidator$3(type) {
  return ["text", "password", "number"].includes(type);
}
var props$x = {
  modelValue: {
    type: String
  },
  modelModifiers: {
    type: Object,
    default: () => ({})
  },
  type: {
    type: String,
    default: "text",
    validator: typeValidator$3
  },
  textarea: {
    type: Boolean,
    default: false
  },
  rows: {
    type: [String, Number],
    default: 8
  },
  placeholder: {
    type: String
  },
  line: {
    type: Boolean,
    default: true
  },
  hint: {
    type: Boolean,
    default: true
  },
  textColor: {
    type: String
  },
  focusColor: {
    type: String
  },
  blurColor: {
    type: String
  },
  maxlength: {
    type: [String, Number]
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  resize: {
    type: Boolean,
    default: false
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  validateTrigger: {
    type: Array,
    default: () => ["onInput", "onClear"]
  },
  rules: {
    type: Array
  },
  onFocus: defineListenerProp(),
  onBlur: defineListenerProp(),
  onClick: defineListenerProp(),
  onClear: defineListenerProp(),
  onInput: defineListenerProp(),
  onChange: defineListenerProp(),
  "onUpdate:modelValue": defineListenerProp()
};
var {
  n: n$z,
  classes: classes$t
} = createNamespace("input");
var _hoisted_1$e = ["id", "disabled", "type", "value", "maxlength", "rows"];
var _hoisted_2$9 = ["id", "disabled", "type", "value", "maxlength"];
var _hoisted_3$7 = ["for"];
function __render__$A(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  var _component_var_form_details = vue.resolveComponent("var-form-details");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"), [_ctx.disabled, _ctx.n("--disabled")])),
      onClick: _cache[14] || (_cache[14] = function() {
        return _ctx.handleClick && _ctx.handleClick(...arguments);
      })
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.classes(_ctx.n("controller"), [_ctx.isFocus, _ctx.n("--focus")], [_ctx.errorMessage, _ctx.n("--error")], [_ctx.formDisabled || _ctx.disabled, _ctx.n("--disabled")])),
        style: vue.normalizeStyle({
          color: !_ctx.errorMessage ? _ctx.isFocus ? _ctx.focusColor : _ctx.blurColor : void 0
        })
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("icon"), [!_ctx.hint, _ctx.n("--non-hint")]))
        },
        [vue.renderSlot(_ctx.$slots, "prepend-icon")],
        2
        /* CLASS */
      ), vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("wrap"), [!_ctx.hint, _ctx.n("--non-hint")]))
        },
        [_ctx.type === "password" ? (vue.openBlock(), vue.createElementBlock(
          "input",
          {
            key: 0,
            class: vue.normalizeClass(_ctx.n("autocomplete"))
          },
          null,
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true), _ctx.textarea ? (vue.openBlock(), vue.createElementBlock("textarea", {
          key: 1,
          class: vue.normalizeClass(_ctx.classes(_ctx.n("input"), _ctx.n("--textarea"), [_ctx.formDisabled || _ctx.disabled, _ctx.n("--disabled")], [_ctx.errorMessage, _ctx.n("--caret-error")])),
          ref: "el",
          autocomplete: "new-password",
          id: _ctx.id,
          disabled: _ctx.formDisabled || _ctx.disabled || _ctx.formReadonly || _ctx.readonly,
          type: _ctx.type,
          value: _ctx.modelValue,
          maxlength: _ctx.maxlength,
          rows: _ctx.rows,
          style: vue.normalizeStyle({
            color: _ctx.textColor,
            caretColor: !_ctx.errorMessage ? _ctx.focusColor : void 0,
            resize: _ctx.resize ? "vertical" : "none"
          }),
          onFocus: _cache[0] || (_cache[0] = function() {
            return _ctx.handleFocus && _ctx.handleFocus(...arguments);
          }),
          onBlur: _cache[1] || (_cache[1] = function() {
            return _ctx.handleBlur && _ctx.handleBlur(...arguments);
          }),
          onInput: _cache[2] || (_cache[2] = function() {
            return _ctx.handleInput && _ctx.handleInput(...arguments);
          }),
          onChange: _cache[3] || (_cache[3] = function() {
            return _ctx.handleChange && _ctx.handleChange(...arguments);
          }),
          onTouchstart: _cache[4] || (_cache[4] = function() {
            return _ctx.handleTouchstart && _ctx.handleTouchstart(...arguments);
          }),
          onCompositionstart: _cache[5] || (_cache[5] = function() {
            return _ctx.handleCompositionStart && _ctx.handleCompositionStart(...arguments);
          }),
          onCompositionend: _cache[6] || (_cache[6] = function() {
            return _ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...arguments);
          })
        }, "\n        ", 46, _hoisted_1$e)) : (vue.openBlock(), vue.createElementBlock("input", {
          key: 2,
          class: vue.normalizeClass(_ctx.classes(_ctx.n("input"), [_ctx.formDisabled || _ctx.disabled, _ctx.n("--disabled")], [_ctx.errorMessage, _ctx.n("--caret-error")])),
          ref: "el",
          autocomplete: "new-password",
          id: _ctx.id,
          disabled: _ctx.formDisabled || _ctx.disabled || _ctx.formReadonly || _ctx.readonly,
          type: _ctx.type,
          value: _ctx.modelValue,
          maxlength: _ctx.maxlength,
          style: vue.normalizeStyle({
            color: _ctx.textColor,
            caretColor: !_ctx.errorMessage ? _ctx.focusColor : void 0
          }),
          onFocus: _cache[7] || (_cache[7] = function() {
            return _ctx.handleFocus && _ctx.handleFocus(...arguments);
          }),
          onBlur: _cache[8] || (_cache[8] = function() {
            return _ctx.handleBlur && _ctx.handleBlur(...arguments);
          }),
          onInput: _cache[9] || (_cache[9] = function() {
            return _ctx.handleInput && _ctx.handleInput(...arguments);
          }),
          onChange: _cache[10] || (_cache[10] = function() {
            return _ctx.handleChange && _ctx.handleChange(...arguments);
          }),
          onTouchstart: _cache[11] || (_cache[11] = function() {
            return _ctx.handleTouchstart && _ctx.handleTouchstart(...arguments);
          }),
          onCompositionstart: _cache[12] || (_cache[12] = function() {
            return _ctx.handleCompositionStart && _ctx.handleCompositionStart(...arguments);
          }),
          onCompositionend: _cache[13] || (_cache[13] = function() {
            return _ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...arguments);
          })
        }, null, 46, _hoisted_2$9)), vue.createElementVNode("label", {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("$--ellipsis"), [_ctx.isFocus, _ctx.n("--focus")], [_ctx.formDisabled || _ctx.disabled, _ctx.n("--disabled")], [_ctx.errorMessage, _ctx.n("--error")], [_ctx.textarea, _ctx.n("textarea-placeholder"), _ctx.n("placeholder")], _ctx.computePlaceholderState(), [!_ctx.hint, _ctx.n("--placeholder-non-hint")])),
          style: vue.normalizeStyle({
            color: !_ctx.errorMessage ? _ctx.isFocus ? _ctx.focusColor : _ctx.blurColor : void 0
          }),
          for: _ctx.id
        }, vue.toDisplayString(_ctx.placeholder), 15, _hoisted_3$7)],
        2
        /* CLASS */
      ), vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("icon"), [!_ctx.hint, _ctx.n("--non-hint")]))
        },
        [vue.renderSlot(_ctx.$slots, "append-icon", {}, () => [_ctx.clearable && !_ctx.isEmpty(_ctx.modelValue) ? (vue.openBlock(), vue.createBlock(_component_var_icon, {
          key: 0,
          class: vue.normalizeClass(_ctx.n("clear-icon")),
          "var-input-cover": "",
          name: "close-circle",
          onClick: _ctx.handleClear
        }, null, 8, ["class", "onClick"])) : vue.createCommentVNode("v-if", true)])],
        2
        /* CLASS */
      )],
      6
      /* CLASS, STYLE */
    ), _ctx.line ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 0,
        class: vue.normalizeClass(_ctx.classes(_ctx.n("line"), [_ctx.formDisabled || _ctx.disabled, _ctx.n("--line-disabled")], [_ctx.errorMessage, _ctx.n("--line-error")])),
        style: vue.normalizeStyle({
          background: !_ctx.errorMessage ? _ctx.blurColor : void 0
        })
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("dot"), [_ctx.isFocus, _ctx.n("--spread")], [_ctx.formDisabled || _ctx.disabled, _ctx.n("--line-disabled")], [_ctx.errorMessage, _ctx.n("--line-error")])),
          style: vue.normalizeStyle({
            background: !_ctx.errorMessage ? _ctx.focusColor : void 0
          })
        },
        null,
        6
        /* CLASS, STYLE */
      )],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true), vue.createVNode(_component_var_form_details, {
      "error-message": _ctx.errorMessage,
      "extra-message": _ctx.maxlengthText
    }, null, 8, ["error-message", "extra-message"])],
    2
    /* CLASS */
  );
}
var __sfc__$B = vue.defineComponent({
  name: "VarInput",
  components: {
    VarIcon: Icon,
    VarFormDetails: FormDetails
  },
  props: props$x,
  setup(props2) {
    var id = vue.ref("var-input-" + vue.getCurrentInstance().uid);
    var el = vue.ref(null);
    var isFocus = vue.ref(false);
    var isComposing = vue.ref(false);
    var type = vue.computed(() => {
      if (props2.type === "number") {
        return "text";
      }
      return props2.type;
    });
    var maxlengthText = vue.computed(() => {
      var {
        maxlength,
        modelValue
      } = props2;
      if (!maxlength) {
        return "";
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
    var validateWithTrigger = (trigger) => {
      vue.nextTick(() => {
        var {
          validateTrigger,
          rules,
          modelValue
        } = props2;
        vt(validateTrigger, trigger, rules, modelValue);
      });
    };
    var computePlaceholderState = () => {
      var {
        hint,
        modelValue
      } = props2;
      if (!hint && (!isEmpty(modelValue) || isComposing.value)) {
        return n$z("--placeholder-hidden");
      }
      if (hint && (!isEmpty(modelValue) || isFocus.value)) {
        return n$z("--placeholder-hint");
      }
    };
    var handleFocus = (e) => {
      isFocus.value = true;
      call(props2.onFocus, e);
      validateWithTrigger("onFocus");
    };
    var handleBlur = (e) => {
      isFocus.value = false;
      call(props2.onBlur, e);
      validateWithTrigger("onBlur");
    };
    var updateValue = (e) => {
      var target = e.target;
      var {
        value
      } = target;
      if (props2.type === "number") {
        value = formatNumber(value);
      }
      return withMaxlength(withTrim(value));
    };
    var handleCompositionStart = () => {
      isComposing.value = true;
    };
    var handleCompositionEnd = (e) => {
      if (!isComposing.value) {
        return;
      }
      isComposing.value = false;
      e.target.dispatchEvent(new Event("input"));
    };
    var handleInput = (e) => {
      if (isComposing.value) {
        return;
      }
      var value = updateValue(e);
      call(props2["onUpdate:modelValue"], value);
      call(props2.onInput, value, e);
      validateWithTrigger("onInput");
    };
    var handleChange = (e) => {
      var value = updateValue(e);
      call(props2.onChange, value, e);
      validateWithTrigger("onChange");
    };
    var handleClear = () => {
      var {
        disabled,
        readonly,
        clearable,
        onClear
      } = props2;
      if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly || !clearable) {
        return;
      }
      call(props2["onUpdate:modelValue"], "");
      call(onClear, "");
      validateWithTrigger("onClear");
    };
    var handleClick = (e) => {
      var {
        disabled,
        onClick
      } = props2;
      if (form != null && form.disabled.value || disabled) {
        return;
      }
      call(onClick, e);
      validateWithTrigger("onClick");
    };
    var formatNumber = (value) => {
      var minusIndex = value.indexOf("-");
      var dotIndex = value.indexOf(".");
      if (minusIndex > -1) {
        value = minusIndex === 0 ? "-" + value.replace(/-/g, "") : value.replace(/-/g, "");
      }
      if (dotIndex > -1) {
        value = value.slice(0, dotIndex + 1) + value.slice(dotIndex).replace(/\./g, "");
      }
      return value.replace(/[^-0-9.]/g, "");
    };
    var withTrim = (value) => props2.modelModifiers.trim ? value.trim() : value;
    var withMaxlength = (value) => props2.maxlength ? value.slice(0, toNumber(props2.maxlength)) : value;
    var handleTouchstart = (e) => {
      var {
        disabled,
        readonly
      } = props2;
      if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly) {
        return;
      }
      e.stopPropagation();
    };
    var reset = () => {
      call(props2["onUpdate:modelValue"], "");
      resetValidation();
    };
    var validate = () => v(props2.rules, props2.modelValue);
    var focus = () => {
      var _el$value;
      (_el$value = el.value) == null ? void 0 : _el$value.focus();
    };
    var blur = () => {
      el.value.blur();
    };
    var inputProvider = {
      reset,
      validate,
      resetValidation
    };
    call(bindForm, inputProvider);
    useMounted(() => {
      if (props2.autofocus) {
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
      n: n$z,
      classes: classes$t,
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
__sfc__$B.render = __render__$A;
const Input = __sfc__$B;
Input.install = function(app) {
  app.component(Input.name, Input);
};
var _InputComponent = Input;
function typeValidator$2(type) {
  return ["default", "primary", "info", "success", "warning", "danger"].includes(type);
}
function underlineValidator(status) {
  return ["always", "hover", "none"].includes(status);
}
var props$w = {
  type: {
    type: String,
    default: "default",
    validator: typeValidator$2
  },
  href: {
    type: String
  },
  target: {
    type: String
  },
  to: {
    type: [String, Object]
  },
  replace: {
    type: Boolean,
    default: false
  },
  underline: {
    type: String,
    default: "always",
    validator: underlineValidator
  },
  disabled: {
    type: Boolean,
    default: false
  },
  textSize: {
    type: [String, Number]
  },
  textColor: {
    type: String
  },
  onClick: defineListenerProp()
};
var {
  n: n$y,
  classes: classes$s
} = createNamespace("link");
function __render__$z(_ctx, _cache) {
  return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), vue.mergeProps(_ctx.linkProps, {
    class: _ctx.classes(_ctx.n(), _ctx.n("$--box"), _ctx.n("$--inline-flex"), _ctx.n("--" + _ctx.type), [_ctx.underline !== "none", _ctx.n("--underline-" + _ctx.underline)], [_ctx.disabled, _ctx.n("--disabled")]),
    style: {
      color: _ctx.textColor,
      fontSize: _ctx.toSizeUnit(_ctx.textSize)
    },
    onClick: _ctx.handleClick
  }), {
    default: vue.withCtx(() => [vue.renderSlot(_ctx.$slots, "default")]),
    _: 3
    /* FORWARDED */
  }, 16, ["class", "style", "onClick"]);
}
var __sfc__$A = vue.defineComponent({
  name: "VarLink",
  props: props$w,
  setup(props2) {
    var tag2 = vue.computed(() => {
      if (props2.disabled) {
        return "span";
      }
      if (props2.href) {
        return "a";
      }
      if (props2.to) {
        return "router-link";
      }
      return "a";
    });
    var linkProps = vue.computed(() => {
      var {
        disabled,
        href,
        target,
        to,
        replace
      } = props2;
      if (disabled) {
        return {};
      }
      if (href) {
        return {
          href,
          target
        };
      }
      if (to) {
        return {
          to,
          target,
          replace
        };
      }
      return {};
    });
    var handleClick = (e) => {
      var {
        disabled,
        onClick
      } = props2;
      if (disabled) {
        return;
      }
      call(onClick, e);
    };
    return {
      n: n$y,
      classes: classes$s,
      tag: tag2,
      linkProps,
      handleClick,
      toSizeUnit
    };
  }
});
__sfc__$A.render = __render__$z;
const Link = __sfc__$A;
Link.install = function(app) {
  app.component(Link.name, Link);
};
var _LinkComponent = Link;
var props$v = {
  loading: {
    type: Boolean,
    default: false
  },
  immediateCheck: {
    type: Boolean,
    default: true
  },
  finished: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  offset: {
    type: [String, Number],
    default: 0
  },
  loadingText: {
    type: String
  },
  finishedText: {
    type: String
  },
  errorText: {
    type: String
  },
  onLoad: defineListenerProp(),
  "onUpdate:loading": defineListenerProp(),
  "onUpdate:error": defineListenerProp()
};
function asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error2) {
    reject(error2);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator$4(fn2) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn2.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
var {
  n: n$x,
  classes: classes$r
} = createNamespace("list");
function __render__$y(_ctx, _cache) {
  var _component_var_loading = vue.resolveComponent("var-loading");
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"))),
      ref: "listEl"
    },
    [vue.renderSlot(_ctx.$slots, "default"), _ctx.loading ? vue.renderSlot(_ctx.$slots, "loading", {
      key: 0
    }, () => [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("loading"))
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("loading-text"))
        },
        vue.toDisplayString(_ctx.dt(_ctx.loadingText, _ctx.pack.listLoadingText)),
        3
        /* TEXT, CLASS */
      ), vue.createVNode(_component_var_loading, {
        size: "mini",
        radius: 10
      })],
      2
      /* CLASS */
    )]) : vue.createCommentVNode("v-if", true), _ctx.finished ? vue.renderSlot(_ctx.$slots, "finished", {
      key: 1
    }, () => [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("finished"))
      },
      vue.toDisplayString(_ctx.dt(_ctx.finishedText, _ctx.pack.listFinishedText)),
      3
      /* TEXT, CLASS */
    )]) : vue.createCommentVNode("v-if", true), _ctx.error ? vue.renderSlot(_ctx.$slots, "error", {
      key: 2
    }, () => [vue.withDirectives((vue.openBlock(), vue.createElementBlock(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("error")),
        onClick: _cache[0] || (_cache[0] = function() {
          return _ctx.load && _ctx.load(...arguments);
        })
      },
      [vue.createTextVNode(
        vue.toDisplayString(_ctx.dt(_ctx.errorText, _ctx.pack.listErrorText)),
        1
        /* TEXT */
      )],
      2
      /* CLASS */
    )), [[_directive_ripple]])]) : vue.createCommentVNode("v-if", true), vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("detector")),
        ref: "detectorEl"
      },
      null,
      2
      /* CLASS */
    )],
    2
    /* CLASS */
  );
}
var __sfc__$z = vue.defineComponent({
  name: "VarList",
  directives: {
    Ripple: Ripple$1
  },
  components: {
    VarLoading: Loading
  },
  props: props$v,
  setup(props2) {
    var listEl = vue.ref(null);
    var detectorEl = vue.ref(null);
    var scroller;
    var load = () => {
      call(props2["onUpdate:error"], false);
      call(props2["onUpdate:loading"], true);
      call(props2.onLoad);
    };
    var isReachBottom = () => {
      var containerBottom = scroller === window ? window.innerHeight : scroller.getBoundingClientRect().bottom;
      var {
        bottom: detectorBottom
      } = detectorEl.value.getBoundingClientRect();
      return Math.floor(detectorBottom) - toPxNum(props2.offset) <= containerBottom;
    };
    var check2 = /* @__PURE__ */ function() {
      var _ref = _asyncToGenerator$4(function* () {
        yield vue.nextTick();
        var {
          loading: loading2,
          finished,
          error: error2
        } = props2;
        if (!loading2 && !finished && !error2 && isReachBottom()) {
          load();
        }
      });
      return function check3() {
        return _ref.apply(this, arguments);
      };
    }();
    useMounted(() => {
      scroller = getParentScroller(listEl.value);
      props2.immediateCheck && check2();
      scroller.addEventListener("scroll", check2);
    });
    vue.onUnmounted(() => {
      scroller.removeEventListener("scroll", check2);
    });
    return {
      pack,
      listEl,
      detectorEl,
      dt,
      isNumber,
      load,
      check: check2,
      n: n$x,
      classes: classes$r
    };
  }
});
__sfc__$z.render = __render__$y;
const List = __sfc__$z;
List.install = function(app) {
  app.component(List.name, List);
};
var _ListComponent = List;
var props$u = {
  value: {
    type: Number,
    default: 0
  },
  opacity: {
    type: Number,
    default: 0
  },
  error: {
    type: Boolean,
    default: false
  },
  color: {
    type: String
  },
  errorColor: {
    type: String
  },
  height: {
    type: [Number, String]
  },
  top: {
    type: [Number, String]
  }
};
var {
  classes: classes$q,
  n: n$w
} = createNamespace("loading-bar");
const LoadingBarComponent = vue.defineComponent({
  name: "VarLoadingBar",
  props: props$u,
  setup(props2) {
    return () => {
      return vue.createVNode("div", {
        "class": classes$q(n$w(), [props2.error, n$w("--error")]),
        "style": {
          zIndex: Context.zIndex + 10,
          width: props2.value + "%",
          opacity: props2.opacity,
          height: toSizeUnit(props2.height),
          backgroundColor: props2.error ? props2.errorColor : props2.color,
          top: toSizeUnit(props2.top)
        }
      }, null);
    };
  }
});
var valueTimer;
var errorTimer;
var opacityTimer;
var finishTimer;
var isMount$1;
var setOptions = {};
var internalProps = {
  value: 0,
  opacity: 0,
  error: false
};
var props$t = vue.reactive(internalProps);
var mergeConfig = (options) => {
  Object.assign(props$t, options);
};
var setDefaultOptions = (options) => {
  Object.assign(props$t, options);
  setOptions = options;
};
var resetDefaultOptions = () => {
  Object.keys(setOptions).forEach((key) => {
    if (props$t[key] !== void 0) {
      props$t[key] = void 0;
    }
  });
};
var mount = () => {
  if (!isMount$1) {
    isMount$1 = true;
    mountInstance(LoadingBarComponent, props$t);
  }
};
var tickValue = () => {
  valueTimer = window.setTimeout(() => {
    if (props$t.value >= 95)
      return;
    var num = Math.random();
    if (props$t.value < 70)
      num = Math.round(5 * Math.random());
    props$t.value += num;
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
  props$t.error = false;
  props$t.value = 0;
  mount();
  opacityTimer = window.setTimeout(() => {
    props$t.opacity = 1;
  }, 200);
  tickValue();
};
var finish = () => {
  clearTimer();
  props$t.value = 100;
  opacityTimer = window.setTimeout(() => {
    props$t.opacity = 0;
    errorTimer = window.setTimeout(() => {
      props$t.error = false;
    }, 250);
  }, 300);
};
var error = () => {
  clearTimer();
  props$t.error = true;
  if (props$t.value === 100) {
    props$t.value = 0;
  }
  mount();
  opacityTimer = window.setTimeout(() => {
    props$t.opacity = 1;
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
var _LoadingBarComponent = LoadingBar;
const LoadingBar$1 = LoadingBar;
function triggerValidator(trigger) {
  return ["click", "hover"].includes(trigger);
}
function placementValidator(alignment) {
  return ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "right", "right-start", "right-end", "left", "left-start", "left-end", "cover-top", "cover-top-start", "cover-top-end", "cover-bottom", "cover-bottom-start", "cover-bottom-end", "cover-left", "cover-right"].includes(alignment);
}
var props$s = {
  show: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  trigger: {
    type: String,
    default: "click",
    validator: triggerValidator
  },
  reference: {
    type: String
  },
  placement: {
    type: String,
    default: "cover-top-start",
    validator: placementValidator
  },
  offsetX: {
    type: [Number, String],
    default: 0
  },
  offsetY: {
    type: [Number, String],
    default: 0
  },
  teleport: {
    type: [String, Object],
    default: "body"
  },
  sameWidth: {
    type: Boolean,
    default: false
  },
  elevation: {
    type: [Boolean, String, Number],
    default: true
  },
  defaultStyle: {
    type: Boolean,
    default: true
  },
  onOpen: defineListenerProp(),
  onOpened: defineListenerProp(),
  onClose: defineListenerProp(),
  onClosed: defineListenerProp(),
  "onUpdate:show": defineListenerProp()
};
var {
  n: n$v,
  classes: classes$p
} = createNamespace("menu");
function __render__$x(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      ref: "host",
      class: vue.normalizeClass(_ctx.n()),
      onClick: _cache[3] || (_cache[3] = function() {
        return _ctx.handleHostClick && _ctx.handleHostClick(...arguments);
      }),
      onMouseenter: _cache[4] || (_cache[4] = function() {
        return _ctx.handleHostMouseenter && _ctx.handleHostMouseenter(...arguments);
      }),
      onMouseleave: _cache[5] || (_cache[5] = function() {
        return _ctx.handleHostMouseleave && _ctx.handleHostMouseleave(...arguments);
      })
    },
    [vue.renderSlot(_ctx.$slots, "default"), (vue.openBlock(), vue.createBlock(vue.Teleport, {
      to: _ctx.teleport
    }, [vue.createVNode(vue.Transition, {
      name: _ctx.n(),
      onAfterEnter: _ctx.onOpened,
      onAfterLeave: _ctx.onClosed
    }, {
      default: vue.withCtx(() => [vue.withDirectives(vue.createElementVNode(
        "div",
        {
          ref: "popover",
          style: vue.normalizeStyle({
            zIndex: _ctx.zIndex,
            width: _ctx.sameWidth ? _ctx.toSizeUnit(Math.ceil(_ctx.hostSize.width)) : void 0
          }),
          class: vue.normalizeClass(_ctx.classes(_ctx.n("menu"), [_ctx.defaultStyle, _ctx.n("--menu-background-color")], [_ctx.defaultStyle, _ctx.formatElevation(_ctx.elevation, 3)])),
          onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
          }, ["stop"])),
          onMouseenter: _cache[1] || (_cache[1] = function() {
            return _ctx.handlePopoverMouseenter && _ctx.handlePopoverMouseenter(...arguments);
          }),
          onMouseleave: _cache[2] || (_cache[2] = function() {
            return _ctx.handlePopoverMouseleave && _ctx.handlePopoverMouseleave(...arguments);
          })
        },
        [vue.renderSlot(_ctx.$slots, "menu")],
        38
        /* CLASS, STYLE, HYDRATE_EVENTS */
      ), [[vue.vShow, _ctx.show]])]),
      _: 3
      /* FORWARDED */
    }, 8, ["name", "onAfterEnter", "onAfterLeave"])], 8, ["to"]))],
    34
    /* CLASS, HYDRATE_EVENTS */
  );
}
var __sfc__$y = vue.defineComponent({
  name: "VarMenu",
  props: props$s,
  setup(props2) {
    var {
      popover,
      host,
      hostSize,
      show,
      zIndex,
      handleHostClick,
      handleHostMouseenter,
      handleHostMouseleave,
      handlePopoverMouseenter,
      handlePopoverMouseleave,
      handlePopoverClose,
      // expose
      open,
      // expose
      close,
      // expose
      resize
    } = usePopover(props2);
    return {
      popover,
      host,
      hostSize,
      show,
      zIndex,
      formatElevation,
      toSizeUnit,
      n: n$v,
      classes: classes$p,
      handleHostClick,
      handleHostMouseenter,
      handleHostMouseleave,
      handlePopoverMouseenter,
      handlePopoverMouseleave,
      handlePopoverClose,
      resize,
      open,
      close
    };
  }
});
__sfc__$y.render = __render__$x;
const Menu = __sfc__$y;
Menu.install = function(app) {
  app.component(Menu.name, Menu);
};
var _MenuComponent = Menu;
var SELECT_BIND_OPTION_KEY = Symbol("SELECT_BIND_OPTION_KEY");
function useOptions() {
  var {
    length,
    childProviders,
    bindChildren
  } = useChildren(SELECT_BIND_OPTION_KEY);
  return {
    length,
    options: childProviders,
    bindOptions: bindChildren
  };
}
function useSelect() {
  var {
    index,
    parentProvider,
    bindParent
  } = useParent(SELECT_BIND_OPTION_KEY);
  if (!bindParent) {
    error$1("Option", "<var-option/> must in <var-select/>");
  }
  return {
    index,
    select: parentProvider,
    bindSelect: bindParent
  };
}
var props$r = {
  label: {},
  value: {}
};
var {
  n: n$u,
  classes: classes$o
} = createNamespace("option");
function __render__$w(_ctx, _cache) {
  var _component_var_checkbox = vue.resolveComponent("var-checkbox");
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"), [_ctx.optionSelected, _ctx.n("--selected-color")])),
      style: vue.normalizeStyle({
        width: _ctx.wrapWidth,
        color: _ctx.optionSelected ? _ctx.focusColor : void 0
      }),
      onClick: _cache[2] || (_cache[2] = function() {
        return _ctx.handleClick && _ctx.handleClick(...arguments);
      })
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.classes(_ctx.n("cover"), [_ctx.optionSelected, _ctx.n("--selected-background")])),
        style: vue.normalizeStyle({
          background: _ctx.optionSelected ? _ctx.focusColor : void 0
        })
      },
      null,
      6
      /* CLASS, STYLE */
    ), _ctx.multiple ? (vue.openBlock(), vue.createBlock(_component_var_checkbox, {
      key: 0,
      ref: "checkbox",
      "checked-color": _ctx.focusColor,
      modelValue: _ctx.optionSelected,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.optionSelected = $event),
      onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
      }, ["stop"])),
      onChange: _ctx.handleSelect
    }, null, 8, ["checked-color", "modelValue", "onChange"])) : vue.createCommentVNode("v-if", true), vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.classes(_ctx.n("text"), _ctx.n("$--ellipsis")))
      },
      [vue.renderSlot(_ctx.$slots, "default", {}, () => [vue.createTextVNode(
        vue.toDisplayString(_ctx.label),
        1
        /* TEXT */
      )])],
      2
      /* CLASS */
    )],
    6
    /* CLASS, STYLE */
  )), [[_directive_ripple]]);
}
var __sfc__$x = vue.defineComponent({
  name: "VarOption",
  directives: {
    Ripple: Ripple$1
  },
  components: {
    VarCheckbox: Checkbox
  },
  props: props$r,
  setup(props2) {
    var optionSelected = vue.ref(false);
    var selected = vue.computed(() => optionSelected.value);
    var label = vue.computed(() => props2.label);
    var value = vue.computed(() => props2.value);
    var {
      select: select2,
      bindSelect
    } = useSelect();
    var {
      wrapWidth,
      multiple,
      focusColor,
      onSelect,
      computeLabel
    } = select2;
    var handleClick = () => {
      optionSelected.value = !optionSelected.value;
      onSelect(optionProvider);
    };
    var handleSelect = () => onSelect(optionProvider);
    var sync = (checked) => {
      optionSelected.value = checked;
    };
    var optionProvider = {
      label,
      value,
      selected,
      sync
    };
    vue.watch([() => props2.label, () => props2.value], computeLabel);
    bindSelect(optionProvider);
    return {
      n: n$u,
      classes: classes$o,
      optionSelected,
      wrapWidth,
      multiple,
      focusColor,
      handleClick,
      handleSelect
    };
  }
});
__sfc__$x.render = __render__$w;
const Option = __sfc__$x;
Option.install = function(app) {
  app.component(Option.name, Option);
};
var _OptionComponent = Option;
var props$q = {
  show: {
    type: Boolean,
    default: false
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  teleport: {
    type: String
  },
  onClick: defineListenerProp(),
  "onUpdate:show": defineListenerProp()
};
function _isSlot$1(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
var {
  n: n$t
} = createNamespace("overlay");
const Overlay = vue.defineComponent({
  name: "VarOverlay",
  inheritAttrs: false,
  props: props$q,
  setup(props2, _ref) {
    var {
      slots,
      attrs
    } = _ref;
    var {
      zIndex
    } = useZIndex(() => props2.show, 1);
    var {
      disabled
    } = useTeleport();
    var handleClickOverlay = () => {
      call(props2.onClick);
      call(props2["onUpdate:show"], false);
    };
    useLock(() => props2.show, () => props2.lockScroll);
    var renderOverlay = () => {
      return vue.createVNode("div", vue.mergeProps({
        "class": n$t(),
        "style": {
          zIndex: zIndex.value - 1
        }
      }, attrs, {
        "onClick": handleClickOverlay
      }), [call(slots.default)]);
    };
    var renderTransitionOverlay = () => {
      var {
        show
      } = props2;
      return vue.createVNode(vue.Transition, {
        "name": n$t("--fade")
      }, {
        default: () => [show && renderOverlay()]
      });
    };
    return () => {
      var {
        teleport
      } = props2;
      if (teleport) {
        var _slot;
        return vue.createVNode(vue.Teleport, {
          "to": teleport,
          "disabled": disabled.value
        }, _isSlot$1(_slot = renderTransitionOverlay()) ? _slot : {
          default: () => [_slot]
        });
      }
      return renderTransitionOverlay();
    };
  }
});
Overlay.install = function(app) {
  app.component(Overlay.name, Overlay);
};
var _OverlayComponent = Overlay;
var props$p = {
  current: {
    type: [Number, String]
  },
  size: {
    type: [Number, String],
    default: 10
  },
  total: {
    type: [Number, String],
    default: 0
  },
  elevation: {
    type: [Boolean, Number, String],
    default: true
  },
  maxPagerCount: {
    type: Number,
    default: 3
  },
  disabled: {
    type: Boolean,
    default: false
  },
  simple: {
    type: Boolean,
    default: true
  },
  showSizeChanger: {
    type: Boolean,
    default: true
  },
  showQuickJumper: {
    type: Boolean,
    default: false
  },
  sizeOption: {
    type: Array,
    default: () => [10, 20, 50, 100]
  },
  showTotal: {
    type: Function
  },
  onChange: defineListenerProp(),
  "onUpdate:current": defineListenerProp(),
  "onUpdate:size": defineListenerProp()
};
var {
  n: n$s,
  classes: classes$n
} = createNamespace("pagination");
var _hoisted_1$d = ["item-mode", "onClick"];
function __render__$v(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  var _component_var_input = vue.resolveComponent("var-input");
  var _component_var_cell = vue.resolveComponent("var-cell");
  var _component_var_menu = vue.resolveComponent("var-menu");
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.openBlock(), vue.createElementBlock(
    "ul",
    {
      class: vue.normalizeClass(_ctx.n())
    },
    [vue.withDirectives((vue.openBlock(), vue.createElementBlock(
      "li",
      {
        class: vue.normalizeClass(_ctx.classes(_ctx.n("item"), _ctx.n("prev"), [_ctx.current <= 1 || _ctx.disabled, _ctx.n("item--disabled")], [_ctx.simple, _ctx.n("item--simple"), _ctx.formatElevation(_ctx.elevation, 2)])),
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.clickItem("prev"))
      },
      [vue.renderSlot(_ctx.$slots, "prev", {}, () => [vue.createVNode(_component_var_icon, {
        name: "chevron-left"
      })])],
      2
      /* CLASS */
    )), [[_directive_ripple, {
      disabled: _ctx.current <= 1 || _ctx.disabled
    }]]), _ctx.simple ? (vue.openBlock(), vue.createElementBlock(
      "li",
      {
        key: 0,
        class: vue.normalizeClass(_ctx.classes(_ctx.n("simple"), [_ctx.disabled, _ctx.n("item--disabled")]))
      },
      [vue.createVNode(_component_var_input, {
        modelValue: _ctx.simpleCurrentValue,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.simpleCurrentValue = $event),
        disabled: _ctx.disabled,
        "var-pagination-cover": "",
        onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.setPage("simple", _ctx.simpleCurrentValue, $event)),
        onKeydown: _cache[3] || (_cache[3] = vue.withKeys(($event) => _ctx.setPage("simple", _ctx.simpleCurrentValue, $event), ["enter"]))
      }, null, 8, ["modelValue", "disabled"]), vue.createElementVNode("span", null, [vue.createTextVNode(
        " / " + vue.toDisplayString(_ctx.pageCount) + " ",
        1
        /* TEXT */
      ), vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("simple-line"))
        },
        null,
        2
        /* CLASS */
      )])],
      2
      /* CLASS */
    )) : (vue.openBlock(true), vue.createElementBlock(
      vue.Fragment,
      {
        key: 1
      },
      vue.renderList(_ctx.pageList, (item, index) => {
        return vue.withDirectives((vue.openBlock(), vue.createElementBlock("li", {
          key: _ctx.toNumber(item) + index,
          "item-mode": _ctx.getMode(item, index),
          class: vue.normalizeClass(_ctx.classes(_ctx.n("item"), _ctx.formatElevation(_ctx.elevation, 2), [item === _ctx.current && !_ctx.disabled, _ctx.n("item--active")], [_ctx.isHideEllipsis(item, index), _ctx.n("item--hide")], [_ctx.disabled, _ctx.n("item--disabled")], [item === _ctx.current && _ctx.disabled, _ctx.n("item--disabled--active")])),
          onClick: ($event) => _ctx.clickItem(item, index)
        }, [vue.createTextVNode(
          vue.toDisplayString(item),
          1
          /* TEXT */
        )], 10, _hoisted_1$d)), [[_directive_ripple, {
          disabled: _ctx.disabled
        }]]);
      }),
      128
      /* KEYED_FRAGMENT */
    )), vue.withDirectives((vue.openBlock(), vue.createElementBlock(
      "li",
      {
        class: vue.normalizeClass(_ctx.classes(_ctx.n("item"), _ctx.n("next"), [_ctx.current >= _ctx.pageCount || _ctx.disabled, _ctx.n("item--disabled")], [_ctx.simple, _ctx.n("item--simple"), _ctx.formatElevation(_ctx.elevation, 2)])),
        onClick: _cache[4] || (_cache[4] = ($event) => _ctx.clickItem("next"))
      },
      [vue.renderSlot(_ctx.$slots, "next", {}, () => [vue.createVNode(_component_var_icon, {
        name: "chevron-right"
      })])],
      2
      /* CLASS */
    )), [[_directive_ripple, {
      disabled: _ctx.current >= _ctx.pageCount || _ctx.disabled
    }]]), _ctx.showSizeChanger ? (vue.openBlock(), vue.createElementBlock(
      "li",
      {
        key: 2,
        class: vue.normalizeClass(_ctx.classes(_ctx.n("size"), [_ctx.disabled, _ctx.n("item--disabled")]))
      },
      [vue.createVNode(_component_var_menu, {
        disabled: _ctx.disabled,
        show: _ctx.menuVisible,
        "onUpdate:show": _cache[6] || (_cache[6] = ($event) => _ctx.menuVisible = $event),
        "offset-x": -4
      }, {
        menu: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(_ctx.sizeOption, (option2, index) => {
            return vue.withDirectives((vue.openBlock(), vue.createBlock(_component_var_cell, {
              class: vue.normalizeClass(_ctx.classes(_ctx.n("list"), [_ctx.size === option2, _ctx.n("list--active")])),
              key: index,
              onClick: ($event) => _ctx.clickSize(option2)
            }, {
              default: vue.withCtx(() => [vue.createTextVNode(
                vue.toDisplayString(option2) + vue.toDisplayString(_ctx.pack.paginationItem) + " / " + vue.toDisplayString(_ctx.pack.paginationPage),
                1
                /* TEXT */
              )]),
              _: 2
              /* DYNAMIC */
            }, 1032, ["class", "onClick"])), [[_directive_ripple]]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))]),
        default: vue.withCtx(() => [vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass(_ctx.classes(_ctx.n("size--open"), [_ctx.current <= 1 || _ctx.disabled, _ctx.n("size--open--disabled")])),
            onClick: _cache[5] || (_cache[5] = vue.withModifiers(function() {
              return _ctx.showMenu && _ctx.showMenu(...arguments);
            }, ["stop"]))
          },
          [vue.createElementVNode(
            "span",
            null,
            vue.toDisplayString(_ctx.size) + vue.toDisplayString(_ctx.pack.paginationItem) + " / " + vue.toDisplayString(_ctx.pack.paginationPage),
            1
            /* TEXT */
          ), vue.createVNode(_component_var_icon, {
            class: vue.normalizeClass(_ctx.n("size--open-icon")),
            "var-pagination-cover": "",
            name: "menu-down"
          }, null, 8, ["class"])],
          2
          /* CLASS */
        )]),
        _: 1
        /* STABLE */
      }, 8, ["disabled", "show"])],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true), _ctx.showQuickJumper && !_ctx.simple ? (vue.openBlock(), vue.createElementBlock(
      "li",
      {
        key: 3,
        class: vue.normalizeClass(_ctx.classes(_ctx.n("quickly"), [_ctx.disabled, "item--disabled"]))
      },
      [vue.createTextVNode(
        vue.toDisplayString(_ctx.pack.paginationJump) + " ",
        1
        /* TEXT */
      ), vue.createVNode(_component_var_input, {
        modelValue: _ctx.quickJumperValue,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.quickJumperValue = $event),
        disabled: _ctx.disabled,
        "var-pagination-cover": "",
        onBlur: _cache[8] || (_cache[8] = ($event) => _ctx.setPage("quick", _ctx.quickJumperValue, $event)),
        onKeydown: _cache[9] || (_cache[9] = vue.withKeys(($event) => _ctx.setPage("quick", _ctx.quickJumperValue, $event), ["enter"]))
      }, null, 8, ["modelValue", "disabled"])],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true), _ctx.totalText ? (vue.openBlock(), vue.createElementBlock(
      "li",
      {
        key: 4,
        class: vue.normalizeClass(_ctx.n("total"))
      },
      vue.toDisplayString(_ctx.totalText),
      3
      /* TEXT, CLASS */
    )) : vue.createCommentVNode("v-if", true)],
    2
    /* CLASS */
  );
}
var __sfc__$w = vue.defineComponent({
  name: "VarPagination",
  components: {
    VarMenu: Menu,
    VarIcon: Icon,
    VarCell: Cell,
    VarInput: Input
  },
  directives: {
    Ripple: Ripple$1
  },
  props: props$p,
  setup(props2) {
    var menuVisible = vue.ref(false);
    var quickJumperValue = vue.ref("");
    var simpleCurrentValue = vue.ref("1");
    var isHideEllipsisHead = vue.ref(false);
    var isHideEllipsisTail = vue.ref(false);
    var current = vue.ref(toNumber(props2.current) || 1);
    var size = vue.ref(toNumber(props2.size) || 10);
    var pageList = vue.ref([]);
    var activePosition = vue.computed(() => Math.ceil(props2.maxPagerCount / 2));
    var pageCount = vue.computed(() => Math.ceil(toNumber(props2.total) / toNumber(size.value)));
    var range = vue.computed(() => {
      var start2 = size.value * (current.value - 1) + 1;
      var end2 = Math.min(size.value * current.value, toNumber(props2.total));
      return [start2, end2];
    });
    var totalText = vue.computed(() => {
      if (!props2.showTotal)
        return "";
      return props2.showTotal(toNumber(props2.total), range.value);
    });
    var isHideEllipsis = (item, index) => {
      if (isNumber(item))
        return false;
      return index === 1 ? isHideEllipsisHead.value : isHideEllipsisTail.value;
    };
    var getMode = (item, index) => {
      if (isNumber(item))
        return "basic";
      return index === 1 ? "head" : "tail";
    };
    var clickItem = (item, index) => {
      if (item === current.value || props2.disabled) {
        return;
      }
      if (item === "...") {
        current.value = index === 1 ? Math.max(current.value - props2.maxPagerCount, 1) : Math.min(current.value + props2.maxPagerCount, pageCount.value);
        return;
      }
      if (item === "prev") {
        current.value = ensureCurrentBoundary(current.value - 1);
        return;
      }
      if (item === "next") {
        current.value = ensureCurrentBoundary(current.value + 1);
        return;
      }
      if (isNumber(item)) {
        current.value = item;
      }
    };
    var showMenu = () => {
      if (props2.disabled) {
        return;
      }
      menuVisible.value = true;
    };
    var clickSize = (option2) => {
      size.value = option2;
      menuVisible.value = false;
      var targetCurrent = ensureCurrentBoundary(current.value);
      simpleCurrentValue.value = String(targetCurrent);
      current.value = targetCurrent;
    };
    var ensureCurrentBoundary = (targetCurrent) => {
      if (targetCurrent > pageCount.value) {
        return pageCount.value;
      }
      if (targetCurrent < 1) {
        return 1;
      }
      return targetCurrent;
    };
    var setPage = (type, page, event) => {
      event.target.blur();
      var targetCurrent = ensureCurrentBoundary(toNumber(page));
      simpleCurrentValue.value = String(targetCurrent);
      current.value = targetCurrent;
      if (type === "quick") {
        quickJumperValue.value = "";
      }
    };
    vue.watch([() => props2.current, () => props2.size], (_ref) => {
      var [newCurrent, newSize] = _ref;
      current.value = toNumber(newCurrent) || 1;
      size.value = toNumber(newSize || 10);
    });
    vue.watch([current, size, pageCount], (_ref2, _ref3) => {
      var [newCurrent, newSize, newCount] = _ref2;
      var [oldCurrent, oldSize] = _ref3;
      var list2 = [];
      var {
        maxPagerCount,
        total,
        onChange
      } = props2;
      var oldCount = Math.ceil(toNumber(total) / toNumber(oldSize));
      var rEllipseSign = newCount - (maxPagerCount - activePosition.value) - 1;
      simpleCurrentValue.value = "" + newCurrent;
      if (newCount - 2 > maxPagerCount) {
        if (oldCurrent === void 0 || newCount !== oldCount) {
          for (var i = 2; i < maxPagerCount + 2; i++)
            list2.push(i);
        }
        if (newCurrent <= maxPagerCount && newCurrent < rEllipseSign) {
          list2 = [];
          for (var _i = 1; _i < maxPagerCount + 1; _i++) {
            list2.push(_i + 1);
          }
          isHideEllipsisHead.value = true;
          isHideEllipsisTail.value = false;
        }
        if (newCurrent > maxPagerCount && newCurrent < rEllipseSign) {
          list2 = [];
          for (var _i2 = 1; _i2 < maxPagerCount + 1; _i2++) {
            list2.push(newCurrent + _i2 - activePosition.value);
          }
          isHideEllipsisHead.value = newCurrent === 2 && maxPagerCount === 1;
          isHideEllipsisTail.value = false;
        }
        if (newCurrent >= rEllipseSign) {
          list2 = [];
          for (var _i3 = 1; _i3 < maxPagerCount + 1; _i3++) {
            list2.push(newCount - (maxPagerCount - _i3) - 1);
          }
          isHideEllipsisHead.value = false;
          isHideEllipsisTail.value = true;
        }
        list2 = [1, "...", ...list2, "...", newCount];
      } else {
        for (var _i4 = 1; _i4 <= newCount; _i4++)
          list2.push(_i4);
      }
      pageList.value = list2;
      if (oldCurrent != null && newCount > 0) {
        call(onChange, newCurrent, newSize);
      }
      call(props2["onUpdate:current"], newCurrent);
      call(props2["onUpdate:size"], newSize);
    }, {
      immediate: true
    });
    return {
      n: n$s,
      classes: classes$n,
      pack,
      current,
      menuVisible,
      size,
      pageCount,
      pageList,
      quickJumperValue,
      simpleCurrentValue,
      totalText,
      getMode,
      isHideEllipsis,
      clickItem,
      showMenu,
      clickSize,
      setPage,
      toNumber,
      formatElevation
    };
  }
});
__sfc__$w.render = __render__$v;
const Pagination = __sfc__$w;
Pagination.install = function(app) {
  app.component(Pagination.name, Pagination);
};
var _PaginationComponent = Pagination;
var props$o = {
  elevation: {
    type: [Boolean, Number, String],
    default: false
  },
  ripple: {
    type: Boolean,
    default: false
  },
  radius: {
    type: [Number, String]
  },
  width: {
    type: [Number, String]
  },
  height: {
    type: [Number, String]
  },
  round: {
    type: Boolean,
    default: false
  },
  inline: {
    type: Boolean,
    default: false
  },
  onClick: defineListenerProp()
};
var {
  n: n$r,
  classes: classes$m
} = createNamespace("paper");
function __render__$u(_ctx, _cache) {
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"), _ctx.formatElevation(_ctx.elevation, 2), [_ctx.onClick, _ctx.n("--cursor")], [_ctx.round, _ctx.n("--round")], [_ctx.inline, _ctx.n("$--inline-flex")])),
      style: vue.normalizeStyle({
        width: _ctx.toSizeUnit(_ctx.width),
        height: _ctx.toSizeUnit(_ctx.height),
        "border-radius": _ctx.toSizeUnit(_ctx.radius)
      }),
      onClick: _cache[0] || (_cache[0] = function() {
        return _ctx.handleClick && _ctx.handleClick(...arguments);
      })
    },
    [vue.renderSlot(_ctx.$slots, "default")],
    6
    /* CLASS, STYLE */
  )), [[_directive_ripple, {
    disabled: !_ctx.ripple
  }]]);
}
var __sfc__$v = vue.defineComponent({
  name: "VarPaper",
  directives: {
    Ripple: Ripple$1
  },
  props: props$o,
  setup(props2) {
    var handleClick = (e) => {
      call(props2.onClick, e);
    };
    return {
      n: n$r,
      classes: classes$m,
      formatElevation,
      toSizeUnit,
      handleClick
    };
  }
});
__sfc__$v.render = __render__$u;
const Paper = __sfc__$v;
Paper.install = function(app) {
  app.component(Paper.name, Paper);
};
var _PaperComponent = Paper;
function _extends$3() {
  _extends$3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$3.apply(this, arguments);
}
var props$n = _extends$3({
  columns: {
    type: Array,
    default: () => []
  },
  title: {
    type: String
  },
  textKey: {
    type: String,
    default: "text"
  },
  toolbar: {
    type: Boolean,
    default: true
  },
  cascade: {
    type: Boolean,
    default: false
  },
  cascadeInitialIndexes: {
    type: Array,
    default: () => []
  },
  optionHeight: {
    type: [Number, String],
    default: 44
  },
  optionCount: {
    type: [Number, String],
    default: 6
  },
  confirmButtonText: {
    type: String
  },
  cancelButtonText: {
    type: String
  },
  confirmButtonTextColor: {
    type: String
  },
  cancelButtonTextColor: {
    type: String
  },
  // dynamic internal
  dynamic: {
    type: Boolean,
    default: false
  },
  textFormatter: {
    type: Function,
    default: (text) => text
  },
  onChange: defineListenerProp(),
  onConfirm: defineListenerProp(),
  onCancel: defineListenerProp()
}, pickProps(props$19, ["show", "onUpdate:show", "closeOnClickOverlay", "teleport", "onOpen", "onClose", "onOpened", "onClosed", "onClickOverlay", "onRouteChange"]));
var {
  n: n$q,
  classes: classes$l
} = createNamespace("picker");
var MOMENTUM_RECORD_TIME = 300;
var MOMENTUM_ALLOW_DISTANCE = 15;
var sid$1 = 0;
var _hoisted_1$c = ["onTouchstart", "onTouchmove", "onTouchend"];
var _hoisted_2$8 = ["onTransitionend"];
function __render__$t(_ctx, _cache) {
  var _component_var_button = vue.resolveComponent("var-button");
  return vue.openBlock(), vue.createBlock(
    vue.resolveDynamicComponent(_ctx.dynamic ? _ctx.n("$-popup") : _ctx.Transition),
    vue.mergeProps(_ctx.dynamic ? {
      onOpen: _ctx.onOpen,
      onOpened: _ctx.onOpened,
      onClose: _ctx.onClose,
      onClosed: _ctx.onClosed,
      onClickOverlay: _ctx.onClickOverlay,
      onRouteChange: _ctx.onRouteChange,
      closeOnClickOverlay: _ctx.closeOnClickOverlay,
      teleport: _ctx.teleport,
      show: _ctx.show,
      "onUpdate:show": _ctx.handlePopupUpdateShow,
      position: "bottom",
      class: _ctx.n("popup")
    } : null, {
      "var-picker-cover": ""
    }),
    {
      default: vue.withCtx(() => [vue.createElementVNode(
        "div",
        vue.mergeProps({
          class: _ctx.n()
        }, _ctx.$attrs),
        [_ctx.toolbar ? (vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: 0,
            class: vue.normalizeClass(_ctx.n("toolbar"))
          },
          [vue.renderSlot(_ctx.$slots, "cancel", {}, () => [vue.createVNode(_component_var_button, {
            class: vue.normalizeClass(_ctx.n("cancel-button")),
            "var-picker-cover": "",
            text: "",
            "text-color": _ctx.cancelButtonTextColor,
            onClick: _ctx.cancel
          }, {
            default: vue.withCtx(() => [vue.createTextVNode(
              vue.toDisplayString(_ctx.dt(_ctx.cancelButtonText, _ctx.pack.pickerCancelButtonText)),
              1
              /* TEXT */
            )]),
            _: 1
            /* STABLE */
          }, 8, ["class", "text-color", "onClick"])]), vue.renderSlot(_ctx.$slots, "title", {}, () => [vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(_ctx.n("title"))
            },
            vue.toDisplayString(_ctx.dt(_ctx.title, _ctx.pack.pickerTitle)),
            3
            /* TEXT, CLASS */
          )]), vue.renderSlot(_ctx.$slots, "confirm", {}, () => [vue.createVNode(_component_var_button, {
            class: vue.normalizeClass(_ctx.n("confirm-button")),
            text: "",
            "var-picker-cover": "",
            "text-color": _ctx.confirmButtonTextColor,
            onClick: _ctx.confirm
          }, {
            default: vue.withCtx(() => [vue.createTextVNode(
              vue.toDisplayString(_ctx.dt(_ctx.confirmButtonText, _ctx.pack.pickerConfirmButtonText)),
              1
              /* TEXT */
            )]),
            _: 1
            /* STABLE */
          }, 8, ["class", "text-color", "onClick"])])],
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true), vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass(_ctx.n("columns")),
            style: vue.normalizeStyle({
              height: _ctx.columnHeight + "px"
            })
          },
          [(vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.scrollColumns, (c) => {
              return vue.openBlock(), vue.createElementBlock("div", {
                class: vue.normalizeClass(_ctx.n("column")),
                key: c.id,
                onTouchstart: ($event) => _ctx.handleTouchstart($event, c),
                onTouchmove: vue.withModifiers(($event) => _ctx.handleTouchmove($event, c), ["prevent"]),
                onTouchend: ($event) => _ctx.handleTouchend($event, c)
              }, [vue.createElementVNode("div", {
                class: vue.normalizeClass(_ctx.n("scroller")),
                ref_for: true,
                ref: (el) => _ctx.getScrollEl(el, c),
                style: vue.normalizeStyle({
                  transform: "translateY(" + c.translate + "px)",
                  transitionDuration: c.duration + "ms",
                  transitionProperty: c.duration ? "transform" : "none"
                }),
                onTransitionend: ($event) => _ctx.handleTransitionend(c)
              }, [(vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(c.column.texts, (t) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "div",
                    {
                      class: vue.normalizeClass(_ctx.n("option")),
                      style: vue.normalizeStyle({
                        height: _ctx.optionHeight + "px"
                      }),
                      key: t
                    },
                    [vue.createElementVNode(
                      "div",
                      {
                        class: vue.normalizeClass(_ctx.n("text"))
                      },
                      vue.toDisplayString(_ctx.textFormatter(t, c.columnIndex)),
                      3
                      /* TEXT, CLASS */
                    )],
                    6
                    /* CLASS, STYLE */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))], 46, _hoisted_2$8)], 42, _hoisted_1$c);
            }),
            128
            /* KEYED_FRAGMENT */
          )), vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(_ctx.n("picked")),
              style: vue.normalizeStyle({
                top: _ctx.center + "px",
                height: _ctx.optionHeight + "px"
              })
            },
            null,
            6
            /* CLASS, STYLE */
          ), vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(_ctx.n("mask")),
              style: vue.normalizeStyle({
                backgroundSize: "100% " + (_ctx.columnHeight - _ctx.optionHeight) / 2 + "px"
              })
            },
            null,
            6
            /* CLASS, STYLE */
          )],
          6
          /* CLASS, STYLE */
        )],
        16
        /* FULL_PROPS */
      )]),
      _: 3
      /* FORWARDED */
    },
    16
    /* FULL_PROPS */
  );
}
var __sfc__$u = vue.defineComponent({
  name: "VarPicker",
  components: {
    VarButton: Button,
    VarPopup: Popup
  },
  inheritAttrs: false,
  props: props$n,
  setup(props2) {
    var scrollColumns = vue.ref([]);
    var optionHeight = vue.computed(() => toPxNum(props2.optionHeight));
    var optionCount = vue.computed(() => toPxNum(props2.optionCount));
    var center = vue.computed(() => optionCount.value * optionHeight.value / 2 - optionHeight.value / 2);
    var columnHeight = vue.computed(() => optionCount.value * optionHeight.value);
    var prevIndexes = [];
    var getScrollEl = (el, scrollColumn) => {
      scrollColumn.scrollEl = el;
    };
    var handlePopupUpdateShow = (value) => {
      call(props2["onUpdate:show"], value);
    };
    var limitTranslate = (scrollColumn) => {
      var START_LIMIT = optionHeight.value + center.value;
      var END_LIMIT = center.value - scrollColumn.column.texts.length * optionHeight.value;
      if (scrollColumn.translate >= START_LIMIT) {
        scrollColumn.translate = START_LIMIT;
      }
      if (scrollColumn.translate <= END_LIMIT) {
        scrollColumn.translate = END_LIMIT;
      }
    };
    var boundaryIndex = (scrollColumn, index) => {
      var {
        length
      } = scrollColumn.column.texts;
      index = index >= length ? length - 1 : index;
      index = index <= 0 ? 0 : index;
      return index;
    };
    var getIndex = (scrollColumn) => {
      var index = Math.round((center.value - scrollColumn.translate) / optionHeight.value);
      return boundaryIndex(scrollColumn, index);
    };
    var getPicked = () => {
      var texts = scrollColumns.value.map((scrollColumn) => scrollColumn.column.texts[scrollColumn.index]);
      var indexes = scrollColumns.value.map((scrollColumn) => scrollColumn.index);
      return {
        texts,
        indexes
      };
    };
    var scrollTo2 = function(scrollColumn, index, duration, noEmit) {
      if (noEmit === void 0) {
        noEmit = false;
      }
      var translate = center.value - boundaryIndex(scrollColumn, index) * optionHeight.value;
      if (translate === scrollColumn.translate) {
        scrollColumn.scrolling = false;
        !noEmit && change(scrollColumn);
      }
      scrollColumn.translate = translate;
      scrollColumn.duration = duration;
    };
    var momentum = (scrollColumn, distance, duration) => {
      scrollColumn.translate += Math.abs(distance / duration) / 3e-3 * (distance < 0 ? -1 : 1);
    };
    var handleTouchstart = (event, scrollColumn) => {
      scrollColumn.touching = true;
      scrollColumn.scrolling = false;
      scrollColumn.duration = 0;
      scrollColumn.translate = getTranslate(scrollColumn.scrollEl);
    };
    var handleTouchmove = (event, scrollColumn) => {
      if (!scrollColumn.touching) {
        return;
      }
      var {
        clientY
      } = event.touches[0];
      var moveY = scrollColumn.prevY !== void 0 ? clientY - scrollColumn.prevY : 0;
      scrollColumn.prevY = clientY;
      scrollColumn.translate += moveY;
      limitTranslate(scrollColumn);
      var now = performance.now();
      if (now - scrollColumn.momentumTime > MOMENTUM_RECORD_TIME) {
        scrollColumn.momentumTime = now;
        scrollColumn.momentumPrevY = scrollColumn.translate;
      }
    };
    var handleTouchend = (event, scrollColumn) => {
      scrollColumn.touching = false;
      scrollColumn.scrolling = true;
      scrollColumn.prevY = void 0;
      var distance = scrollColumn.translate - scrollColumn.momentumPrevY;
      var duration = performance.now() - scrollColumn.momentumTime;
      var shouldMomentum = Math.abs(distance) >= MOMENTUM_ALLOW_DISTANCE && duration <= MOMENTUM_RECORD_TIME;
      shouldMomentum && momentum(scrollColumn, distance, duration);
      scrollColumn.index = getIndex(scrollColumn);
      scrollTo2(scrollColumn, scrollColumn.index, shouldMomentum ? 1e3 : 200);
    };
    var handleTransitionend = (scrollColumn) => {
      scrollColumn.scrolling = false;
      change(scrollColumn);
    };
    var normalizeNormalColumns = (normalColumns) => {
      return normalColumns.map((column, columnIndex) => {
        var _normalColumn$initial;
        var normalColumn = isArray(column) ? {
          texts: column
        } : column;
        var scrollColumn = {
          id: sid$1++,
          prevY: void 0,
          momentumPrevY: void 0,
          touching: false,
          translate: center.value,
          index: (_normalColumn$initial = normalColumn.initialIndex) != null ? _normalColumn$initial : 0,
          columnIndex,
          duration: 0,
          momentumTime: 0,
          column: normalColumn,
          scrollEl: null,
          scrolling: false
        };
        scrollTo2(scrollColumn, scrollColumn.index, 0, true);
        return scrollColumn;
      });
    };
    var normalizeCascadeColumns = (cascadeColumns) => {
      var scrollColumns2 = [];
      createChildren(scrollColumns2, cascadeColumns, 0, true);
      return scrollColumns2;
    };
    var createChildren = function(scrollColumns2, children, columnIndex, initial) {
      if (initial === void 0) {
        initial = false;
      }
      if (isArray(children) && children.length) {
        var _props$cascadeInitial;
        var index = initial ? (_props$cascadeInitial = props2.cascadeInitialIndexes[scrollColumns2.length]) != null ? _props$cascadeInitial : 0 : 0;
        var scrollColumn = {
          id: sid$1++,
          prevY: void 0,
          momentumPrevY: void 0,
          touching: false,
          translate: center.value,
          index,
          columnIndex,
          duration: 0,
          momentumTime: 0,
          column: {
            texts: children.map((cascadeColumn) => cascadeColumn[props2.textKey])
          },
          columns: children,
          scrollEl: null,
          scrolling: false
        };
        scrollColumns2.push(scrollColumn);
        scrollTo2(scrollColumn, scrollColumn.index, 0, true);
        createChildren(scrollColumns2, scrollColumn.columns[scrollColumn.index].children, columnIndex + 1, initial);
      }
    };
    var rebuildChildren = (scrollColumn) => {
      scrollColumns.value.splice(scrollColumns.value.indexOf(scrollColumn) + 1);
      createChildren(scrollColumns.value, scrollColumn.columns[scrollColumn.index].children, scrollColumn.columnIndex + 1);
    };
    var change = (scrollColumn) => {
      var {
        cascade,
        onChange
      } = props2;
      cascade && rebuildChildren(scrollColumn);
      var hasScrolling = scrollColumns.value.some((scrollColumn2) => scrollColumn2.scrolling);
      if (hasScrolling) {
        return;
      }
      var {
        texts,
        indexes
      } = getPicked();
      var samePicked = indexes.every((index, idx) => index === prevIndexes[idx]);
      if (samePicked) {
        return;
      }
      prevIndexes = [...indexes];
      call(onChange, texts, indexes);
    };
    var stopScroll = () => {
      if (props2.cascade) {
        var currentScrollColumn = scrollColumns.value.find((scrollColumn) => scrollColumn.scrolling);
        if (currentScrollColumn) {
          currentScrollColumn.translate = getTranslate(currentScrollColumn.scrollEl);
          currentScrollColumn.index = getIndex(currentScrollColumn);
          scrollTo2(currentScrollColumn, currentScrollColumn.index, 0, true);
          currentScrollColumn.scrolling = false;
          rebuildChildren(currentScrollColumn);
        }
      } else {
        scrollColumns.value.forEach((scrollColumn) => {
          scrollColumn.translate = getTranslate(scrollColumn.scrollEl);
          scrollColumn.index = getIndex(scrollColumn);
          scrollTo2(scrollColumn, scrollColumn.index, 0);
        });
      }
    };
    var confirm = () => {
      stopScroll();
      var {
        texts,
        indexes
      } = getPicked();
      prevIndexes = [...indexes];
      call(props2.onConfirm, texts, indexes);
    };
    var cancel = () => {
      stopScroll();
      var {
        texts,
        indexes
      } = getPicked();
      prevIndexes = [...indexes];
      call(props2.onCancel, texts, indexes);
    };
    vue.watch(() => props2.columns, (newValue) => {
      scrollColumns.value = props2.cascade ? normalizeCascadeColumns(vue.toRaw(newValue)) : normalizeNormalColumns(vue.toRaw(newValue));
      var {
        indexes
      } = getPicked();
      prevIndexes = [...indexes];
    }, {
      immediate: true,
      deep: true
    });
    return {
      n: n$q,
      classes: classes$l,
      pack,
      optionHeight,
      optionCount,
      scrollColumns,
      columnHeight,
      center,
      Transition: vue.Transition,
      getScrollEl,
      handlePopupUpdateShow,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      handleTransitionend,
      confirm,
      cancel,
      dt
    };
  }
});
__sfc__$u.render = __render__$t;
const VarPicker = __sfc__$u;
var singletonOptions;
function Picker(options) {
  return new Promise((resolve) => {
    Picker.close();
    var pickerOptions = isArray(options) ? {
      columns: options
    } : options;
    var reactivePickerOptions = vue.reactive(pickerOptions);
    reactivePickerOptions.dynamic = true;
    reactivePickerOptions.teleport = "body";
    singletonOptions = reactivePickerOptions;
    var {
      unmountInstance
    } = mountInstance(VarPicker, reactivePickerOptions, {
      onConfirm: (texts, indexes) => {
        call(reactivePickerOptions.onConfirm, texts, indexes);
        resolve({
          state: "confirm",
          texts,
          indexes
        });
        reactivePickerOptions.show = false;
        singletonOptions === reactivePickerOptions && (singletonOptions = null);
      },
      onCancel: (texts, indexes) => {
        call(reactivePickerOptions.onCancel, texts, indexes);
        resolve({
          state: "cancel",
          texts,
          indexes
        });
        reactivePickerOptions.show = false;
        singletonOptions === reactivePickerOptions && (singletonOptions = null);
      },
      onClose: () => {
        call(reactivePickerOptions.onClose);
        resolve({
          state: "close"
        });
        singletonOptions === reactivePickerOptions && (singletonOptions = null);
      },
      onClosed: () => {
        call(reactivePickerOptions.onClosed);
        unmountInstance();
        singletonOptions === reactivePickerOptions && (singletonOptions = null);
      },
      onRouteChange: () => {
        unmountInstance();
        singletonOptions === reactivePickerOptions && (singletonOptions = null);
      },
      "onUpdate:show": (value) => {
        reactivePickerOptions.show = value;
      }
    });
    reactivePickerOptions.show = true;
  });
}
VarPicker.install = function(app) {
  app.component(VarPicker.name, VarPicker);
};
Picker.Component = VarPicker;
Picker.install = function(app) {
  app.component(VarPicker.name, VarPicker);
};
Picker.close = function() {
  if (singletonOptions != null) {
    var prevSingletonOptions = singletonOptions;
    singletonOptions = null;
    vue.nextTick().then(() => {
      prevSingletonOptions.show = false;
    });
  }
};
var _PickerComponent = VarPicker;
function modeValidator(mode) {
  return ["linear", "circle"].includes(mode);
}
var props$m = {
  mode: {
    type: String,
    default: "linear",
    validator: modeValidator
  },
  lineWidth: {
    type: [Number, String],
    default: 4
  },
  color: {
    type: String
  },
  trackColor: {
    type: String
  },
  ripple: {
    type: Boolean,
    default: false
  },
  value: {
    type: [Number, String],
    default: 0
  },
  label: {
    type: Boolean,
    default: false
  },
  labelClass: {
    type: String
  },
  size: {
    type: [Number, String],
    default: 40
  },
  rotate: {
    type: Number,
    default: 0
  },
  track: {
    type: Boolean,
    default: true
  }
};
var {
  n: n$p,
  classes: classes$k
} = createNamespace("progress");
var _hoisted_1$b = ["viewBox"];
var _hoisted_2$7 = ["cx", "cy", "r", "stroke-width"];
var _hoisted_3$6 = ["cx", "cy", "r", "stroke-width"];
function __render__$s(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n())
    },
    [_ctx.mode === "linear" ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 0,
        class: vue.normalizeClass(_ctx.n("linear"))
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("linear-block")),
          style: vue.normalizeStyle({
            height: _ctx.toSizeUnit(_ctx.lineWidth)
          })
        },
        [_ctx.track ? (vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: 0,
            class: vue.normalizeClass(_ctx.n("linear-background")),
            style: vue.normalizeStyle({
              background: _ctx.trackColor
            })
          },
          null,
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true), vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass(_ctx.classes(_ctx.n("linear-certain"), [_ctx.ripple, _ctx.n("linear-ripple")])),
            style: vue.normalizeStyle({
              background: _ctx.color,
              width: _ctx.linearProps.width
            })
          },
          null,
          6
          /* CLASS, STYLE */
        )],
        6
        /* CLASS, STYLE */
      ), _ctx.label ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          class: vue.normalizeClass(_ctx.classes(_ctx.n("linear-label"), [_ctx.labelClass, _ctx.labelClass]))
        },
        [vue.renderSlot(_ctx.$slots, "default", {}, () => [vue.createTextVNode(
          vue.toDisplayString(_ctx.linearProps.roundValue),
          1
          /* TEXT */
        )])],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true)],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true), _ctx.mode === "circle" ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 1,
        class: vue.normalizeClass(_ctx.n("circle")),
        style: vue.normalizeStyle({
          width: _ctx.toSizeUnit(_ctx.size),
          height: _ctx.toSizeUnit(_ctx.size)
        })
      },
      [(vue.openBlock(), vue.createElementBlock("svg", {
        class: vue.normalizeClass(_ctx.n("circle-svg")),
        style: vue.normalizeStyle({
          transform: "rotate(" + (_ctx.rotate - 90) + "deg)"
        }),
        viewBox: _ctx.circleProps.viewBox
      }, [_ctx.track ? (vue.openBlock(), vue.createElementBlock("circle", {
        key: 0,
        class: vue.normalizeClass(_ctx.n("circle-background")),
        cx: _ctx.multiplySizeUnit(_ctx.size, 0.5),
        cy: _ctx.multiplySizeUnit(_ctx.size, 0.5),
        r: _ctx.circleProps.radius,
        fill: "transparent",
        "stroke-width": _ctx.toSizeUnit(_ctx.lineWidth),
        style: vue.normalizeStyle({
          strokeDasharray: _ctx.circleProps.perimeter,
          stroke: _ctx.trackColor
        })
      }, null, 14, _hoisted_2$7)) : vue.createCommentVNode("v-if", true), vue.createElementVNode("circle", {
        class: vue.normalizeClass(_ctx.n("circle-certain")),
        cx: _ctx.multiplySizeUnit(_ctx.size, 0.5),
        cy: _ctx.multiplySizeUnit(_ctx.size, 0.5),
        r: _ctx.circleProps.radius,
        fill: "transparent",
        "stroke-width": _ctx.toSizeUnit(_ctx.lineWidth),
        style: vue.normalizeStyle({
          strokeDasharray: _ctx.circleProps.strokeDasharray,
          stroke: _ctx.color
        })
      }, null, 14, _hoisted_3$6)], 14, _hoisted_1$b)), _ctx.label ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          class: vue.normalizeClass(_ctx.classes(_ctx.n("circle-label"), [_ctx.labelClass, _ctx.labelClass]))
        },
        [vue.renderSlot(_ctx.$slots, "default", {}, () => [vue.createTextVNode(
          vue.toDisplayString(_ctx.circleProps.roundValue),
          1
          /* TEXT */
        )])],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true)],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true)],
    2
    /* CLASS */
  );
}
var __sfc__$t = vue.defineComponent({
  name: "VarProgress",
  props: props$m,
  setup(props2) {
    var linearProps = vue.computed(() => {
      var value = toNumber(props2.value);
      var width = value > 100 ? 100 : value;
      var roundValue = value > 100 ? 100 : Math.round(value);
      return {
        width: width + "%",
        roundValue: roundValue + "%"
      };
    });
    var circleProps = vue.computed(() => {
      var {
        size,
        lineWidth,
        value
      } = props2;
      var viewBox = "0 0 " + toPxNum(size) + " " + toPxNum(size);
      var roundValue = toNumber(value) > 100 ? 100 : Math.round(toNumber(value));
      var radius = (toPxNum(size) - toPxNum(lineWidth)) / 2;
      var perimeter = 2 * Math.PI * radius;
      var strokeDasharray = roundValue / 100 * perimeter + ", " + perimeter;
      return {
        viewBox,
        radius,
        strokeDasharray,
        perimeter,
        roundValue: roundValue + "%"
      };
    });
    return {
      n: n$p,
      classes: classes$k,
      toSizeUnit,
      multiplySizeUnit,
      linearProps,
      circleProps
    };
  }
});
__sfc__$t.render = __render__$s;
const Progress = __sfc__$t;
Progress.install = function(app) {
  app.component(Progress.name, Progress);
};
var _ProgressComponent = Progress;
var props$l = {
  modelValue: {
    type: Boolean
  },
  // 是否禁用下拉刷新
  disabled: {
    type: Boolean,
    default: false
  },
  // 动画时长
  animationDuration: {
    type: [Number, String],
    default: 300
  },
  // 成功提示展示时长
  successDuration: {
    type: [Number, String],
    default: 2e3
  },
  // control 的背景颜色
  bgColor: {
    type: String
  },
  // 成功状态下 control 的背景颜色
  successBgColor: {
    type: String
  },
  // control 的颜色
  color: {
    type: String
  },
  // 成功状态下 control 的颜色
  successColor: {
    type: String
  },
  target: {
    type: [String, Object]
  },
  onRefresh: defineListenerProp(),
  "onUpdate:modelValue": defineListenerProp()
};
function asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error2) {
    reject(error2);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator$3(fn2) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn2.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
var {
  n: n$o,
  classes: classes$j
} = createNamespace("pull-refresh");
var ICON_TRANSITION = 150;
function __render__$r(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      ref: "freshNode",
      class: vue.normalizeClass(_ctx.n()),
      onTouchstart: _cache[0] || (_cache[0] = function() {
        return _ctx.touchStart && _ctx.touchStart(...arguments);
      }),
      onTouchend: _cache[1] || (_cache[1] = function() {
        return _ctx.touchEnd && _ctx.touchEnd(...arguments);
      }),
      onTouchcancel: _cache[2] || (_cache[2] = function() {
        return _ctx.touchEnd && _ctx.touchEnd(...arguments);
      })
    },
    [vue.createElementVNode(
      "div",
      {
        ref: "controlNode",
        class: vue.normalizeClass(_ctx.classes(_ctx.n("control"), _ctx.n("$-elevation--2"), [_ctx.isSuccess, _ctx.n("control-success")])),
        style: vue.normalizeStyle(_ctx.controlStyle)
      },
      [vue.createVNode(_component_var_icon, {
        name: _ctx.iconName,
        transition: _ctx.ICON_TRANSITION,
        class: vue.normalizeClass(_ctx.classes(_ctx.n("icon"), [_ctx.refreshStatus === "loading" && _ctx.iconHasChanged, _ctx.n("animation")])),
        "var-pull-refresh-cover": ""
      }, null, 8, ["name", "transition", "class"])],
      6
      /* CLASS, STYLE */
    ), vue.renderSlot(_ctx.$slots, "default")],
    34
    /* CLASS, HYDRATE_EVENTS */
  );
}
var __sfc__$s = vue.defineComponent({
  name: "VarPullRefresh",
  components: {
    VarIcon: Icon
  },
  props: props$l,
  setup(props2) {
    var controlPosition = vue.ref(0);
    var freshNode = vue.ref(null);
    var controlNode = vue.ref(null);
    var startPosition = vue.ref(0);
    var distance = vue.ref("-125%");
    var iconName = vue.ref("arrow-down");
    var refreshStatus = vue.ref("default");
    var isEnd = vue.ref(false);
    var scroller;
    var eventTargetScroller;
    var changing;
    var startY = 0;
    var deltaY = 0;
    var iconHasChanged = vue.ref(true);
    var isTouchable = vue.computed(() => refreshStatus.value !== "loading" && refreshStatus.value !== "success" && !props2.disabled);
    var controlStyle = vue.computed(() => ({
      transform: "translate3d(0px, " + (isString(distance.value) ? distance.value : distance.value + "px") + ", 0px) translate(-50%, 0)",
      transition: isEnd.value ? "transform " + props2.animationDuration + "ms" : void 0,
      background: isSuccess.value ? props2.successBgColor : props2.bgColor,
      color: isSuccess.value ? props2.successColor : props2.color
    }));
    var maxDistance = vue.computed(() => Math.abs(2 * controlPosition.value));
    var isSuccess = vue.computed(() => refreshStatus.value === "success");
    var changeIcon = () => {
      return new Promise((resolve) => {
        window.setTimeout(() => {
          iconHasChanged.value = true;
          resolve();
        }, ICON_TRANSITION);
      });
    };
    var lockEvent = (action) => {
      var el = "classList" in scroller ? scroller : document.body;
      el.classList[action](n$o() + "--lock");
    };
    var touchStart = (event) => {
      if (controlPosition.value === 0) {
        var {
          width
        } = controlNode.value.getBoundingClientRect();
        controlPosition.value = -(width + width * 0.25);
      }
      startY = event.touches[0].clientY;
      deltaY = 0;
      eventTargetScroller = getParentScroller(event.target);
    };
    var touchMove = (event) => {
      if (!isTouchable.value) {
        return;
      }
      if (eventTargetScroller !== scroller && getScrollTop(eventTargetScroller) > 0) {
        return;
      }
      var scrollTop = getScrollTop(scroller);
      if (scrollTop > 0) {
        return;
      }
      var isReachTop = scrollTop === 0;
      var touch = event.touches[0];
      deltaY = touch.clientY - startY;
      if (isReachTop && deltaY >= 0) {
        event.preventDefault();
      }
      if (refreshStatus.value !== "pulling") {
        refreshStatus.value = "pulling";
        startPosition.value = event.touches[0].clientY;
      }
      if (isReachTop && distance.value > controlPosition.value) {
        lockEvent("add");
      }
      var moveDistance = (event.touches[0].clientY - startPosition.value) / 2 + controlPosition.value;
      distance.value = moveDistance >= maxDistance.value ? maxDistance.value : moveDistance;
      if (distance.value >= maxDistance.value * 0.2) {
        iconHasChanged.value = false;
        iconName.value = "refresh";
        changing = changeIcon();
      } else {
        iconName.value = "arrow-down";
      }
    };
    var touchEnd = /* @__PURE__ */ function() {
      var _ref = _asyncToGenerator$3(function* () {
        if (!isTouchable.value)
          return;
        isEnd.value = true;
        if (distance.value >= maxDistance.value * 0.2) {
          yield changing;
          refreshStatus.value = "loading";
          distance.value = maxDistance.value * 0.3;
          call(props2["onUpdate:modelValue"], true);
          vue.nextTick(() => {
            call(props2.onRefresh);
          });
          lockEvent("remove");
        } else {
          refreshStatus.value = "loosing";
          iconName.value = "arrow-down";
          distance.value = controlPosition.value;
          setTimeout(() => {
            isEnd.value = false;
            lockEvent("remove");
          }, toNumber(props2.animationDuration));
        }
        eventTargetScroller = null;
      });
      return function touchEnd2() {
        return _ref.apply(this, arguments);
      };
    }();
    var setScroller = () => {
      scroller = props2.target ? getTarget(props2.target, "PullRefresh") : getParentScroller(freshNode.value);
    };
    var reset = () => {
      setTimeout(() => {
        refreshStatus.value = "default";
        iconName.value = "arrow-down";
        isEnd.value = false;
      }, toNumber(props2.animationDuration));
    };
    vue.watch(() => props2.modelValue, (newValue) => {
      if (newValue === false) {
        isEnd.value = true;
        refreshStatus.value = "success";
        iconName.value = "checkbox-marked-circle";
        setTimeout(() => {
          distance.value = controlPosition.value;
          reset();
        }, toNumber(props2.successDuration));
      }
    });
    useMounted(setScroller);
    useEventListener(freshNode, "touchmove", touchMove);
    return {
      n: n$o,
      classes: classes$j,
      iconHasChanged,
      ICON_TRANSITION,
      refreshStatus,
      freshNode,
      controlNode,
      touchStart,
      touchMove,
      touchEnd,
      iconName,
      controlStyle,
      isSuccess
    };
  }
});
__sfc__$s.render = __render__$r;
const PullRefresh = __sfc__$s;
PullRefresh.install = function(app) {
  app.component(PullRefresh.name, PullRefresh);
};
var _PullRefreshComponent = PullRefresh;
var props$k = {
  modelValue: {
    type: [String, Number, Boolean, Object, Array],
    default: false
  },
  checkedValue: {
    type: [String, Number, Boolean, Object, Array],
    default: true
  },
  uncheckedValue: {
    type: [String, Number, Boolean, Object, Array],
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  checkedColor: {
    type: String
  },
  uncheckedColor: {
    type: String
  },
  iconSize: {
    type: [String, Number]
  },
  ripple: {
    type: Boolean,
    default: true
  },
  validateTrigger: {
    type: Array,
    default: () => ["onChange"]
  },
  rules: {
    type: Array
  },
  onClick: defineListenerProp(),
  onChange: defineListenerProp(),
  "onUpdate:modelValue": defineListenerProp()
};
var RADIO_GROUP_BIND_RADIO_KEY = Symbol("RADIO_GROUP_BIND_RADIO_KEY");
function useRadios() {
  var {
    bindChildren,
    childProviders,
    length
  } = useChildren(RADIO_GROUP_BIND_RADIO_KEY);
  return {
    length,
    radios: childProviders,
    bindRadios: bindChildren
  };
}
function useRadioGroup() {
  var {
    bindParent,
    parentProvider,
    index
  } = useParent(RADIO_GROUP_BIND_RADIO_KEY);
  return {
    index,
    radioGroup: parentProvider,
    bindRadioGroup: bindParent
  };
}
var {
  n: n$n,
  classes: classes$i
} = createNamespace("radio");
function __render__$q(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  var _component_var_hover_overlay = vue.resolveComponent("var-hover-overlay");
  var _component_var_form_details = vue.resolveComponent("var-form-details");
  var _directive_ripple = vue.resolveDirective("ripple");
  var _directive_hover = vue.resolveDirective("hover");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n("wrap"))
    },
    [vue.createElementVNode(
      "div",
      vue.mergeProps({
        class: _ctx.n(),
        onClick: _cache[0] || (_cache[0] = function() {
          return _ctx.handleClick && _ctx.handleClick(...arguments);
        })
      }, _ctx.$attrs),
      [vue.withDirectives((vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("action"), [_ctx.checked, _ctx.n("--checked"), _ctx.n("--unchecked")], [_ctx.errorMessage || _ctx.radioGroupErrorMessage, _ctx.n("--error")], [_ctx.formDisabled || _ctx.disabled, _ctx.n("--disabled")])),
          style: vue.normalizeStyle({
            color: _ctx.checked ? _ctx.checkedColor : _ctx.uncheckedColor
          })
        },
        [_ctx.checked ? vue.renderSlot(_ctx.$slots, "checked-icon", {
          key: 0
        }, () => [vue.createVNode(_component_var_icon, {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("icon"), [_ctx.withAnimation, _ctx.n("--with-animation")])),
          "var-radio-cover": "",
          name: "radio-marked",
          size: _ctx.iconSize
        }, null, 8, ["class", "size"])]) : vue.renderSlot(_ctx.$slots, "unchecked-icon", {
          key: 1
        }, () => [vue.createVNode(_component_var_icon, {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("icon"), [_ctx.withAnimation, _ctx.n("--with-animation")])),
          "var-radio-cover": "",
          name: "radio-blank",
          size: _ctx.iconSize
        }, null, 8, ["class", "size"])]), vue.createVNode(_component_var_hover_overlay, {
          hovering: !_ctx.disabled && !_ctx.formDisabled && _ctx.hovering
        }, null, 8, ["hovering"])],
        6
        /* CLASS, STYLE */
      )), [[_directive_ripple, {
        disabled: _ctx.formReadonly || _ctx.readonly || _ctx.formDisabled || _ctx.disabled || !_ctx.ripple
      }], [_directive_hover, _ctx.handleHovering, "desktop"]]), vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("text"), [_ctx.errorMessage || _ctx.radioGroupErrorMessage, _ctx.n("--error")], [_ctx.formDisabled || _ctx.disabled, _ctx.n("--disabled")]))
        },
        [vue.renderSlot(_ctx.$slots, "default")],
        2
        /* CLASS */
      )],
      16
      /* FULL_PROPS */
    ), vue.createVNode(_component_var_form_details, {
      "error-message": _ctx.errorMessage
    }, null, 8, ["error-message"])],
    2
    /* CLASS */
  );
}
var __sfc__$r = vue.defineComponent({
  name: "VarRadio",
  directives: {
    Ripple: Ripple$1,
    Hover: Hover$1
  },
  components: {
    VarIcon: Icon,
    VarFormDetails: FormDetails,
    VarHoverOverlay: HoverOverlay
  },
  inheritAttrs: false,
  props: props$k,
  setup(props2) {
    var value = vue.ref(false);
    var checked = vue.computed(() => value.value === props2.checkedValue);
    var withAnimation = vue.ref(false);
    var {
      radioGroup: radioGroup2,
      bindRadioGroup
    } = useRadioGroup();
    var {
      hovering,
      handleHovering
    } = useHoverOverlay();
    var {
      form,
      bindForm
    } = useForm();
    var {
      errorMessage,
      validateWithTrigger: vt,
      validate: v,
      // expose
      resetValidation
    } = useValidation();
    var validateWithTrigger = (trigger) => {
      vue.nextTick(() => {
        var {
          validateTrigger,
          rules,
          modelValue
        } = props2;
        vt(validateTrigger, trigger, rules, modelValue);
      });
    };
    var change = (changedValue) => {
      var {
        checkedValue,
        onChange
      } = props2;
      if (radioGroup2 && value.value === checkedValue) {
        return;
      }
      value.value = changedValue;
      call(props2["onUpdate:modelValue"], value.value);
      call(onChange, value.value);
      radioGroup2 == null ? void 0 : radioGroup2.onToggle(checkedValue);
      validateWithTrigger("onChange");
    };
    var handleClick = (e) => {
      var {
        disabled,
        readonly,
        uncheckedValue,
        checkedValue,
        onClick
      } = props2;
      if (form != null && form.disabled.value || disabled) {
        return;
      }
      call(onClick, e);
      if (form != null && form.readonly.value || readonly) {
        return;
      }
      withAnimation.value = true;
      change(checked.value ? uncheckedValue : checkedValue);
    };
    var sync = (v2) => {
      var {
        checkedValue,
        uncheckedValue
      } = props2;
      value.value = v2 === checkedValue ? checkedValue : uncheckedValue;
    };
    var reset = () => {
      call(props2["onUpdate:modelValue"], props2.uncheckedValue);
      resetValidation();
    };
    var validate = () => v(props2.rules, props2.modelValue);
    var toggle = (changedValue) => {
      var {
        uncheckedValue,
        checkedValue
      } = props2;
      var shouldReverse = ![uncheckedValue, checkedValue].includes(changedValue);
      if (shouldReverse) {
        changedValue = checked.value ? uncheckedValue : checkedValue;
      }
      change(changedValue);
    };
    vue.watch(() => props2.modelValue, (newValue) => {
      value.value = newValue;
    }, {
      immediate: true
    });
    var radioProvider = {
      sync,
      validate,
      resetValidation,
      reset
    };
    call(bindRadioGroup, radioProvider);
    call(bindForm, radioProvider);
    return {
      withAnimation,
      checked,
      errorMessage,
      radioGroupErrorMessage: radioGroup2 == null ? void 0 : radioGroup2.errorMessage,
      formDisabled: form == null ? void 0 : form.disabled,
      formReadonly: form == null ? void 0 : form.readonly,
      hovering,
      handleHovering,
      n: n$n,
      classes: classes$i,
      handleClick,
      toggle,
      reset,
      validate,
      resetValidation
    };
  }
});
__sfc__$r.render = __render__$q;
const Radio = __sfc__$r;
Radio.install = function(app) {
  app.component(Radio.name, Radio);
};
var _RadioComponent = Radio;
function directionValidator$2(direction) {
  return ["horizontal", "vertical"].includes(direction);
}
var props$j = {
  modelValue: {
    type: [String, Number, Boolean, Object, Array],
    default: void 0
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: directionValidator$2
  },
  validateTrigger: {
    type: Array,
    default: () => ["onChange"]
  },
  rules: {
    type: Array
  },
  onChange: defineListenerProp(),
  "onUpdate:modelValue": defineListenerProp()
};
var {
  n: n$m,
  classes: classes$h
} = createNamespace("radio-group");
function __render__$p(_ctx, _cache) {
  var _component_var_form_details = vue.resolveComponent("var-form-details");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n("wrap"))
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("--" + _ctx.direction)))
      },
      [vue.renderSlot(_ctx.$slots, "default")],
      2
      /* CLASS */
    ), vue.createVNode(_component_var_form_details, {
      "error-message": _ctx.errorMessage
    }, null, 8, ["error-message"])],
    2
    /* CLASS */
  );
}
var __sfc__$q = vue.defineComponent({
  name: "VarRadioGroup",
  components: {
    VarFormDetails: FormDetails
  },
  props: props$j,
  setup(props2) {
    var {
      length,
      radios,
      bindRadios
    } = useRadios();
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
    var radioGroupErrorMessage = vue.computed(() => errorMessage.value);
    var validateWithTrigger = (trigger) => {
      vue.nextTick(() => {
        var {
          validateTrigger,
          rules,
          modelValue
        } = props2;
        vt(validateTrigger, trigger, rules, modelValue);
      });
    };
    var syncRadios = () => radios.forEach((_ref) => {
      var {
        sync
      } = _ref;
      return sync(props2.modelValue);
    });
    var onToggle = (changedValue) => {
      call(props2["onUpdate:modelValue"], changedValue);
      call(props2.onChange, changedValue);
      validateWithTrigger("onChange");
    };
    var validate = () => v(props2.rules, props2.modelValue);
    var reset = () => {
      call(props2["onUpdate:modelValue"], void 0);
      resetValidation();
    };
    vue.watch(() => props2.modelValue, syncRadios);
    vue.watch(() => length.value, syncRadios);
    var radioGroupProvider = {
      onToggle,
      validate,
      reset,
      resetValidation,
      errorMessage: radioGroupErrorMessage
    };
    call(bindForm, radioGroupProvider);
    bindRadios(radioGroupProvider);
    return {
      errorMessage,
      n: n$m,
      classes: classes$h,
      reset,
      validate,
      resetValidation
    };
  }
});
__sfc__$q.render = __render__$p;
const RadioGroup = __sfc__$q;
RadioGroup.install = function(app) {
  app.component(RadioGroup.name, RadioGroup);
};
var _RadioGroupComponent = RadioGroup;
var props$i = {
  modelValue: {
    type: [String, Number],
    default: 0
  },
  count: {
    type: [String, Number],
    default: 5
  },
  color: {
    type: String
  },
  icon: {
    type: String,
    default: "star"
  },
  emptyColor: {
    type: String
  },
  emptyIcon: {
    type: String,
    default: "star-outline"
  },
  size: {
    type: [String, Number]
  },
  gap: {
    type: [String, Number]
  },
  namespace: {
    type: String
  },
  half: {
    type: Boolean,
    default: false
  },
  halfIcon: {
    type: String,
    default: "star-half-full"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  disabledColor: {
    type: String
  },
  readonly: {
    type: Boolean,
    default: false
  },
  ripple: {
    type: Boolean,
    default: true
  },
  rules: {
    type: Array
  },
  onChange: defineListenerProp(),
  "onUpdate:modelValue": defineListenerProp()
};
var {
  n: n$l
} = createNamespace("rate");
var _hoisted_1$a = ["onClick"];
function __render__$o(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  var _component_var_hover_overlay = vue.resolveComponent("var-hover-overlay");
  var _component_var_form_details = vue.resolveComponent("var-form-details");
  var _directive_ripple = vue.resolveDirective("ripple");
  var _directive_hover = vue.resolveDirective("hover");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n("wrap"))
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n())
      },
      [(vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList(_ctx.toNumber(_ctx.count), (value) => {
          return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
            key: value,
            style: vue.normalizeStyle(_ctx.getStyle(value)),
            class: vue.normalizeClass(_ctx.getClass(value)),
            onClick: ($event) => _ctx.handleClick(value, $event)
          }, [vue.createVNode(_component_var_icon, {
            class: vue.normalizeClass(_ctx.n("content-icon")),
            "var-rate-cover": "",
            transition: 0,
            namespace: _ctx.namespace,
            name: _ctx.getCurrentState(value).name,
            style: vue.normalizeStyle({
              fontSize: _ctx.toSizeUnit(_ctx.size)
            })
          }, null, 8, ["class", "namespace", "name", "style"]), vue.createVNode(_component_var_hover_overlay, {
            hovering: _ctx.hovering && value === _ctx.currentHoveringValue && !_ctx.disabled && !_ctx.formDisabled
          }, null, 8, ["hovering"])], 14, _hoisted_1$a)), [[_directive_ripple, {
            disabled: _ctx.formReadonly || _ctx.readonly || _ctx.formDisabled || _ctx.disabled || !_ctx.ripple
          }], [_directive_hover, _ctx.createHoverHandler(value), "desktop"]]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))],
      2
      /* CLASS */
    ), vue.createVNode(_component_var_form_details, {
      "error-message": _ctx.errorMessage
    }, null, 8, ["error-message"])],
    2
    /* CLASS */
  );
}
var __sfc__$p = vue.defineComponent({
  name: "VarRate",
  components: {
    VarIcon: Icon,
    VarFormDetails: FormDetails,
    VarHoverOverlay: HoverOverlay
  },
  directives: {
    Ripple: Ripple$1,
    Hover: Hover$1
  },
  props: props$i,
  setup(props2) {
    var {
      form,
      bindForm
    } = useForm();
    var {
      errorMessage,
      validateWithTrigger: vt,
      validate: v,
      resetValidation
    } = useValidation();
    var {
      hovering
    } = useHoverOverlay();
    var currentHoveringValue = vue.ref(-1);
    var getStyle2 = (val) => {
      var {
        count,
        gap
      } = props2;
      return {
        color: getCurrentState(val).color,
        marginRight: val !== toNumber(count) ? toSizeUnit(gap) : 0
      };
    };
    var getClass = (val) => {
      var {
        name,
        color
      } = getCurrentState(val);
      return {
        [n$l("content")]: true,
        [n$l("--disabled")]: (form == null ? void 0 : form.disabled.value) || props2.disabled,
        [n$l("--error")]: errorMessage.value,
        [n$l("--primary")]: name !== props2.emptyIcon && !color
      };
    };
    var getCurrentState = (index) => {
      var {
        modelValue,
        disabled,
        disabledColor,
        color,
        half: half2,
        emptyColor,
        icon: icon2,
        halfIcon,
        emptyIcon
      } = props2;
      var iconColor = color;
      if (disabled || form != null && form.disabled.value)
        iconColor = disabledColor;
      if (index <= toNumber(modelValue)) {
        return {
          color: iconColor,
          name: icon2
        };
      }
      if (half2 && index <= toNumber(modelValue) + 0.5) {
        return {
          color: iconColor,
          name: halfIcon
        };
      }
      return {
        color: disabled || form != null && form.disabled.value ? disabledColor : emptyColor,
        name: emptyIcon
      };
    };
    var changeValue = (score, event) => {
      if (props2.half) {
        var {
          offsetWidth
        } = event.target;
        if (event.offsetX <= Math.floor(offsetWidth / 2))
          score -= 0.5;
      }
      call(props2["onUpdate:modelValue"], score);
    };
    var validate = () => v(props2.rules, toNumber(props2.modelValue));
    var validateWithTrigger = () => vue.nextTick(() => vt(["onChange"], "onChange", props2.rules, props2.modelValue));
    var handleClick = (score, event) => {
      var {
        readonly,
        disabled,
        onChange
      } = props2;
      if (readonly || disabled || form != null && form.disabled.value || form != null && form.readonly.value) {
        return;
      }
      changeValue(score, event);
      call(onChange, score);
      validateWithTrigger();
    };
    var createHoverHandler = (value) => {
      return (isHover) => {
        currentHoveringValue.value = value;
        hovering.value = isHover;
      };
    };
    var reset = () => {
      call(props2["onUpdate:modelValue"], 0);
      resetValidation();
    };
    var rateProvider = {
      reset,
      validate,
      resetValidation
    };
    call(bindForm, rateProvider);
    return {
      errorMessage,
      formDisabled: form == null ? void 0 : form.disabled,
      formReadonly: form == null ? void 0 : form.readonly,
      getStyle: getStyle2,
      getClass,
      getCurrentState,
      handleClick,
      hovering,
      currentHoveringValue,
      createHoverHandler,
      reset,
      validate,
      resetValidation,
      toSizeUnit,
      toNumber,
      n: n$l
    };
  }
});
__sfc__$p.render = __render__$o;
const Rate = __sfc__$p;
Rate.install = function(app) {
  app.component(Rate.name, Rate);
};
var _RateComponent = Rate;
function typeValidator$1(type) {
  return ["info", "success", "warning", "error", "question", "empty"].includes(type);
}
var props$h = {
  imageSize: {
    type: [String, Number]
  },
  type: {
    type: String,
    default: "success",
    validator: typeValidator$1
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  animation: {
    type: Boolean,
    default: true
  }
};
var _withScopeId$5 = (n2) => (vue.pushScopeId(""), n2 = n2(), vue.popScopeId(), n2);
var _hoisted_1$9 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "2 3.6 20 20"
};
var _hoisted_2$6 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode(
  "path",
  {
    d: "M11,9H13V7H11M11,20H13V11H11V20Z"
  },
  null,
  -1
  /* HOISTED */
));
var _hoisted_3$5 = [_hoisted_2$6];
function __render__$n(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$9, _hoisted_3$5);
}
var __sfc__$o = vue.defineComponent({});
__sfc__$o.render = __render__$n;
const Info = __sfc__$o;
var _withScopeId$4 = (n2) => (vue.pushScopeId(""), n2 = n2(), vue.popScopeId(), n2);
var _hoisted_1$8 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "2 2 20 20"
};
var _hoisted_2$5 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ vue.createElementVNode(
  "path",
  {
    d: "M19,3V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z"
  },
  null,
  -1
  /* HOISTED */
));
var _hoisted_3$4 = [_hoisted_2$5];
function __render__$m(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$8, _hoisted_3$4);
}
var __sfc__$n = vue.defineComponent({});
__sfc__$n.render = __render__$m;
const Error$1 = __sfc__$n;
var _withScopeId$3 = (n2) => (vue.pushScopeId(""), n2 = n2(), vue.popScopeId(), n2);
var _hoisted_1$7 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "-6 -4 35 35"
};
var _hoisted_2$4 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ vue.createElementVNode(
  "path",
  {
    d: "M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61M1,11"
  },
  null,
  -1
  /* HOISTED */
));
var _hoisted_3$3 = [_hoisted_2$4];
function __render__$l(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$7, _hoisted_3$3);
}
var __sfc__$m = vue.defineComponent({});
__sfc__$m.render = __render__$l;
const Warning = __sfc__$m;
var {
  n: n$k,
  classes: classes$g
} = createNamespace("result");
function __render__$k(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    vue.Fragment,
    null,
    [vue.createElementVNode(
      "span",
      {
        class: vue.normalizeClass(_ctx.n("success-cover-left"))
      },
      null,
      2
      /* CLASS */
    ), vue.createElementVNode(
      "span",
      {
        class: vue.normalizeClass(_ctx.classes(_ctx.n("success-line"), _ctx.n("success-line-tip"))),
        style: vue.normalizeStyle({
          animationDuration: _ctx.animation ? "760ms" : "0ms",
          borderRadius: "calc(" + _ctx.borderSize + " * 0.625)"
        })
      },
      null,
      6
      /* CLASS, STYLE */
    ), vue.createElementVNode(
      "span",
      {
        class: vue.normalizeClass(_ctx.classes(_ctx.n("success-line"), _ctx.n("success-line-long"))),
        style: vue.normalizeStyle({
          animationDuration: _ctx.animation ? "770ms" : "0ms",
          borderRadius: "calc(" + _ctx.borderSize + " * 0.625)"
        })
      },
      null,
      6
      /* CLASS, STYLE */
    ), vue.createElementVNode(
      "span",
      {
        ref: "circle",
        class: vue.normalizeClass(_ctx.n("success-circle")),
        style: vue.normalizeStyle({
          left: "-" + _ctx.borderSize,
          top: "-" + _ctx.borderSize,
          borderWidth: _ctx.borderSize
        })
      },
      null,
      6
      /* CLASS, STYLE */
    ), vue.createElementVNode(
      "span",
      {
        class: vue.normalizeClass(_ctx.n("success-line-fix"))
      },
      null,
      2
      /* CLASS */
    ), vue.createElementVNode(
      "span",
      {
        class: vue.normalizeClass(_ctx.n("success-cover-right")),
        style: vue.normalizeStyle({
          animationDuration: _ctx.animation ? "4250ms" : "0ms"
        })
      },
      null,
      6
      /* CLASS, STYLE */
    )],
    64
    /* STABLE_FRAGMENT */
  );
}
var __sfc__$l = vue.defineComponent({
  props: {
    animation: {
      type: Boolean
    },
    borderSize: {
      type: String
    }
  },
  setup() {
    return {
      n: n$k,
      classes: classes$g,
      toNumber
    };
  }
});
__sfc__$l.render = __render__$k;
const Success = __sfc__$l;
var _withScopeId$2 = (n2) => (vue.pushScopeId(""), n2 = n2(), vue.popScopeId(), n2);
var _hoisted_1$6 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "-3 -3 30 30"
};
var _hoisted_2$3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ vue.createElementVNode(
  "path",
  {
    d: "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z"
  },
  null,
  -1
  /* HOISTED */
));
var _hoisted_3$2 = [_hoisted_2$3];
function __render__$j(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$6, _hoisted_3$2);
}
var __sfc__$k = vue.defineComponent({});
__sfc__$k.render = __render__$j;
const Question = __sfc__$k;
var _withScopeId$1 = (n2) => (vue.pushScopeId(""), n2 = n2(), vue.popScopeId(), n2);
var _hoisted_1$5 = {
  viewBox: "-4 -4 32 32"
};
var _hoisted_2$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ vue.createElementVNode(
  "path",
  {
    fill: "currentColor",
    d: "M2,10.96C1.5,10.68 1.35,10.07 1.63,9.59L3.13,7C3.24,6.8 3.41,6.66 3.6,6.58L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.66,6.72 20.82,6.88 20.91,7.08L22.36,9.6C22.64,10.08 22.47,10.69 22,10.96L21,11.54V16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V10.96C2.7,11.13 2.32,11.14 2,10.96M12,4.15V4.15L12,10.85V10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V12.69L14,15.59C13.67,15.77 13.3,15.76 13,15.6V19.29L19,15.91M13.85,13.36L20.13,9.73L19.55,8.72L13.27,12.35L13.85,13.36Z"
  },
  null,
  -1
  /* HOISTED */
));
var _hoisted_3$1 = [_hoisted_2$2];
function __render__$i(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$5, _hoisted_3$1);
}
var __sfc__$j = vue.defineComponent({});
__sfc__$j.render = __render__$i;
const Empty = __sfc__$j;
var {
  n: n$j,
  classes: classes$f
} = createNamespace("result");
function __render__$h(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box")))
    },
    [vue.renderSlot(_ctx.$slots, "image", {}, () => [_ctx.type ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 0,
        class: vue.normalizeClass(_ctx.n("image-container"))
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("image"), _ctx.n(_ctx.type))),
          style: vue.normalizeStyle({
            width: _ctx.circleSize,
            height: _ctx.circleSize,
            borderWidth: _ctx.borderSize
          })
        },
        [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.type), {
          "border-size": _ctx.borderSize,
          animation: _ctx.animation
        }, null, 8, ["border-size", "animation"]))],
        6
        /* CLASS, STYLE */
      )],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true)]), vue.renderSlot(_ctx.$slots, "title", {}, () => [_ctx.title ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 0,
        class: vue.normalizeClass(_ctx.n("title"))
      },
      vue.toDisplayString(_ctx.title),
      3
      /* TEXT, CLASS */
    )) : vue.createCommentVNode("v-if", true)]), vue.renderSlot(_ctx.$slots, "description", {}, () => [_ctx.description ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 0,
        class: vue.normalizeClass(_ctx.n("description"))
      },
      vue.toDisplayString(_ctx.description),
      3
      /* TEXT, CLASS */
    )) : vue.createCommentVNode("v-if", true)]), _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 0,
        class: vue.normalizeClass(_ctx.n("footer"))
      },
      [vue.renderSlot(_ctx.$slots, "footer")],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true)],
    2
    /* CLASS */
  );
}
var __sfc__$i = vue.defineComponent({
  name: "VarResult",
  components: {
    Info,
    Success,
    Warning,
    Error: Error$1,
    Question,
    Empty
  },
  props: props$h,
  setup(props2) {
    var circleSize = vue.computed(() => {
      var {
        imageSize
      } = props2;
      return "calc(" + (imageSize ? toSizeUnit(imageSize) : "var(--result-image-size)") + " * 0.9)";
    });
    var borderSize = vue.computed(() => {
      var {
        imageSize
      } = props2;
      return "calc(" + (imageSize ? toSizeUnit(props2.imageSize) : "var(--result-image-size)") + " * 0.05)";
    });
    return {
      n: n$j,
      classes: classes$f,
      toNumber,
      toPxNum,
      toSizeUnit,
      circleSize,
      borderSize
    };
  }
});
__sfc__$i.render = __render__$h;
const Result = __sfc__$i;
Result.install = function(app) {
  app.component(Result.name, Result);
};
var _ResultComponent = Result;
function justifyValidator$1(justify) {
  return ["flex-start", "flex-end", "start", "end", "center", "space-between", "space-around"].includes(justify);
}
function alignValidator$1(align) {
  return ["flex-start", "center", "flex-end", "start", "end"].includes(align);
}
var props$g = {
  gutter: {
    type: [String, Number],
    default: 0
  },
  justify: {
    type: String,
    default: "flex-start",
    validator: justifyValidator$1
  },
  align: {
    type: String,
    default: "flex-start",
    validator: alignValidator$1
  },
  onClick: defineListenerProp()
};
var {
  n: n$i,
  classes: classes$e
} = createNamespace("row");
function __render__$g(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"))),
      style: vue.normalizeStyle({
        justifyContent: _ctx.padStartFlex(_ctx.justify),
        alignItems: _ctx.padStartFlex(_ctx.align),
        margin: _ctx.average ? "0 -" + _ctx.average + "px" : void 0
      }),
      onClick: _cache[0] || (_cache[0] = function() {
        return _ctx.handleClick && _ctx.handleClick(...arguments);
      })
    },
    [vue.renderSlot(_ctx.$slots, "default")],
    6
    /* CLASS, STYLE */
  );
}
var __sfc__$h = vue.defineComponent({
  name: "VarRow",
  props: props$g,
  setup(props2) {
    var {
      cols,
      bindCols,
      length
    } = useCols();
    var average = vue.computed(() => {
      var gutter = toPxNum(props2.gutter);
      return gutter / 2;
    });
    var computePadding = () => {
      cols.forEach((col2) => {
        col2.setPadding({
          left: average.value,
          right: average.value
        });
      });
    };
    var handleClick = (e) => {
      call(props2.onClick, e);
    };
    var rowProvider = {
      computePadding
    };
    vue.watch(() => length.value, computePadding);
    vue.watch(() => props2.gutter, computePadding);
    bindCols(rowProvider);
    return {
      n: n$i,
      classes: classes$e,
      average,
      handleClick,
      padStartFlex
    };
  }
});
__sfc__$h.render = __render__$g;
const Row = __sfc__$h;
Row.install = function(app) {
  app.component(Row.name, Row);
};
var _RowComponent = Row;
function textAlignValidator(textAlign) {
  return ["left", "right", "center"].includes(textAlign);
}
var props$f = {
  modelValue: {
    default: void 0
  },
  placeholder: {
    type: String
  },
  multiple: {
    type: Boolean,
    default: false
  },
  offsetY: {
    type: [String, Number],
    default: 0
  },
  chip: {
    type: Boolean,
    default: false
  },
  line: {
    type: Boolean,
    default: true
  },
  hint: {
    type: Boolean,
    default: true
  },
  textColor: {
    type: String
  },
  focusColor: {
    type: String
  },
  blurColor: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  separator: {
    type: String,
    default: ","
  },
  textAlign: {
    type: String,
    default: "left",
    validator: textAlignValidator
  },
  validateTrigger: {
    type: Array,
    default: () => ["onChange", "onClear", "onClose"]
  },
  rules: {
    type: Array
  },
  onFocus: defineListenerProp(),
  onBlur: defineListenerProp(),
  onClick: defineListenerProp(),
  onClear: defineListenerProp(),
  onClose: defineListenerProp(),
  onChange: defineListenerProp(),
  "onUpdate:modelValue": defineListenerProp()
};
var {
  n: n$h,
  classes: classes$d
} = createNamespace("select");
var _hoisted_1$4 = {
  key: 1
};
function __render__$f(_ctx, _cache) {
  var _component_var_chip = vue.resolveComponent("var-chip");
  var _component_var_icon = vue.resolveComponent("var-icon");
  var _component_var_menu = vue.resolveComponent("var-menu");
  var _component_var_form_details = vue.resolveComponent("var-form-details");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"), [_ctx.formDisabled || _ctx.disabled, _ctx.n("--disabled")])),
      onClick: _cache[3] || (_cache[3] = function() {
        return _ctx.handleClick && _ctx.handleClick(...arguments);
      })
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.classes(_ctx.n("controller"), [_ctx.isFocus, _ctx.n("--focus")], [_ctx.errorMessage, _ctx.n("--error")], [_ctx.formDisabled || _ctx.disabled, _ctx.n("--disabled")])),
        style: vue.normalizeStyle({
          color: !_ctx.errorMessage ? _ctx.isFocus ? _ctx.focusColor : _ctx.blurColor : void 0
        })
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("icon"), [!_ctx.hint, _ctx.n("--non-hint")]))
        },
        [vue.renderSlot(_ctx.$slots, "prepend-icon")],
        2
        /* CLASS */
      ), vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("wrap"), [!_ctx.hint, _ctx.n("--non-hint")])),
          ref: "wrapEl",
          onClick: _cache[2] || (_cache[2] = function() {
            return _ctx.handleFocus && _ctx.handleFocus(...arguments);
          })
        },
        [vue.createVNode(_component_var_menu, {
          "var-select-cover": "",
          class: vue.normalizeClass(_ctx.classes(_ctx.n("menu"))),
          "offset-y": _ctx.offsetY,
          disabled: _ctx.formReadonly || _ctx.readonly || _ctx.formDisabled || _ctx.disabled,
          "default-style": false,
          show: _ctx.isFocus,
          "onUpdate:show": _cache[1] || (_cache[1] = ($event) => _ctx.isFocus = $event),
          onClose: _ctx.handleBlur
        }, {
          menu: vue.withCtx(() => [vue.createElementVNode(
            "div",
            {
              ref: "menuEl",
              class: vue.normalizeClass(_ctx.classes(_ctx.n("scroller"), _ctx.n("$-elevation--3")))
            },
            [vue.renderSlot(_ctx.$slots, "default")],
            2
            /* CLASS */
          )]),
          default: vue.withCtx(() => [vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(_ctx.classes(_ctx.n("select"), [_ctx.errorMessage, _ctx.n("--error")], [_ctx.formDisabled || _ctx.disabled, _ctx.n("--disabled")])),
              style: vue.normalizeStyle({
                textAlign: _ctx.textAlign,
                color: _ctx.textColor
              })
            },
            [vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(_ctx.n("label"))
              },
              [!_ctx.isEmptyModelValue ? vue.renderSlot(_ctx.$slots, "selected", {
                key: 0
              }, () => [_ctx.multiple ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                {
                  key: 0
                },
                [_ctx.chip ? (vue.openBlock(), vue.createElementBlock(
                  "div",
                  {
                    key: 0,
                    class: vue.normalizeClass(_ctx.n("chips"))
                  },
                  [(vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(_ctx.labels, (l) => {
                      return vue.openBlock(), vue.createBlock(_component_var_chip, {
                        class: vue.normalizeClass(_ctx.n("chip")),
                        "var-select-cover": "",
                        closable: "",
                        size: "small",
                        type: _ctx.errorMessage ? "danger" : void 0,
                        key: l,
                        onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                        }, ["stop"])),
                        onClose: () => _ctx.handleClose(l)
                      }, {
                        default: vue.withCtx(() => [vue.createTextVNode(
                          vue.toDisplayString(l),
                          1
                          /* TEXT */
                        )]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["class", "type", "onClose"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))],
                  2
                  /* CLASS */
                )) : (vue.openBlock(), vue.createElementBlock(
                  "div",
                  {
                    key: 1,
                    class: vue.normalizeClass(_ctx.n("values"))
                  },
                  vue.toDisplayString(_ctx.labels.join(_ctx.separator)),
                  3
                  /* TEXT, CLASS */
                ))],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )) : (vue.openBlock(), vue.createElementBlock(
                "span",
                _hoisted_1$4,
                vue.toDisplayString(_ctx.label),
                1
                /* TEXT */
              ))]) : vue.createCommentVNode("v-if", true)],
              2
              /* CLASS */
            ), vue.renderSlot(_ctx.$slots, "arrow-icon", {
              focus: _ctx.isFocus
            }, () => [vue.createVNode(_component_var_icon, {
              class: vue.normalizeClass(_ctx.classes(_ctx.n("arrow"), [_ctx.isFocus, _ctx.n("--arrow-rotate")])),
              "var-select-cover": "",
              name: "menu-down",
              transition: 300
            }, null, 8, ["class"])])],
            6
            /* CLASS, STYLE */
          ), vue.createElementVNode(
            "label",
            {
              class: vue.normalizeClass(_ctx.classes(_ctx.n("placeholder"), _ctx.n("$--ellipsis"), [_ctx.isFocus, _ctx.n("--focus")], [_ctx.errorMessage, _ctx.n("--error")], [_ctx.formDisabled || _ctx.disabled, _ctx.n("--disabled")], _ctx.computePlaceholderState(), [!_ctx.hint, _ctx.n("--placeholder-non-hint")])),
              style: vue.normalizeStyle({
                color: !_ctx.errorMessage ? _ctx.isFocus ? _ctx.focusColor : _ctx.blurColor : void 0
              })
            },
            vue.toDisplayString(_ctx.placeholder),
            7
            /* TEXT, CLASS, STYLE */
          )]),
          _: 3
          /* FORWARDED */
        }, 8, ["class", "offset-y", "disabled", "show", "onClose"])],
        2
        /* CLASS */
      ), vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("icon"), [!_ctx.hint, _ctx.n("--non-hint")]))
        },
        [vue.renderSlot(_ctx.$slots, "append-icon", {}, () => [_ctx.clearable ? (vue.openBlock(), vue.createBlock(_component_var_icon, {
          key: 0,
          class: vue.normalizeClass(_ctx.n("clear-icon")),
          name: "close-circle",
          size: "14px",
          onClick: _ctx.handleClear
        }, null, 8, ["class", "onClick"])) : vue.createCommentVNode("v-if", true)])],
        2
        /* CLASS */
      )],
      6
      /* CLASS, STYLE */
    ), _ctx.line ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 0,
        class: vue.normalizeClass(_ctx.classes(_ctx.n("line"), [_ctx.formDisabled || _ctx.disabled, _ctx.n("--line-disabled")], [_ctx.errorMessage, _ctx.n("--line-error")])),
        style: vue.normalizeStyle({
          background: !_ctx.errorMessage ? _ctx.blurColor : void 0
        })
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("dot"), [_ctx.isFocus, _ctx.n("--spread")], [_ctx.formDisabled || _ctx.disabled, _ctx.n("--line-disabled")], [_ctx.errorMessage, _ctx.n("--line-error")])),
          style: vue.normalizeStyle({
            background: !_ctx.errorMessage ? _ctx.focusColor : void 0
          })
        },
        null,
        6
        /* CLASS, STYLE */
      )],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true), vue.createVNode(_component_var_form_details, {
      "error-message": _ctx.errorMessage
    }, null, 8, ["error-message"])],
    2
    /* CLASS */
  );
}
var __sfc__$g = vue.defineComponent({
  name: "VarSelect",
  components: {
    VarIcon: Icon,
    VarMenu: Menu,
    VarChip: Chip,
    VarFormDetails: FormDetails
  },
  props: props$f,
  setup(props2) {
    var wrapEl = vue.ref(null);
    var isFocus = vue.ref(false);
    var multiple = vue.computed(() => props2.multiple);
    var focusColor = vue.computed(() => props2.focusColor);
    var label = vue.ref("");
    var labels = vue.ref([]);
    var isEmptyModelValue = vue.computed(() => isEmpty(props2.modelValue));
    var wrapWidth = vue.ref("0px");
    var offsetY = vue.ref(0);
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
    var menuEl = vue.ref(null);
    var computeLabel = () => {
      var {
        multiple: multiple2,
        modelValue
      } = props2;
      if (multiple2) {
        var rawModelValue = modelValue;
        labels.value = rawModelValue.map(findLabel);
      }
      if (!multiple2 && !isEmpty(modelValue)) {
        label.value = findLabel(modelValue);
      }
      if (!multiple2 && isEmpty(modelValue)) {
        label.value = "";
      }
    };
    var validateWithTrigger = (trigger) => {
      vue.nextTick(() => {
        var {
          validateTrigger,
          rules,
          modelValue
        } = props2;
        vt(validateTrigger, trigger, rules, modelValue);
      });
    };
    var findValueOrLabel = (_ref) => {
      var {
        value,
        label: label2
      } = _ref;
      if (value.value != null) {
        return value.value;
      }
      return label2.value;
    };
    var findLabel = (modelValue) => {
      var _option$label$value, _option;
      var option2 = options.find((_ref2) => {
        var {
          value
        } = _ref2;
        return value.value === modelValue;
      });
      if (!option2) {
        option2 = options.find((_ref3) => {
          var {
            label: label2
          } = _ref3;
          return label2.value === modelValue;
        });
      }
      return (_option$label$value = (_option = option2) == null ? void 0 : _option.label.value) != null ? _option$label$value : "";
    };
    var computePlaceholderState = () => {
      var {
        hint,
        modelValue
      } = props2;
      if (!hint && !isEmpty(modelValue)) {
        return n$h("--placeholder-hidden");
      }
      if (hint && (!isEmpty(modelValue) || isFocus.value)) {
        return n$h("--placeholder-hint");
      }
    };
    var getWrapWidth = () => {
      return wrapEl.value && window.getComputedStyle(wrapEl.value).width || "0px";
    };
    var handleFocus = () => {
      var {
        disabled,
        readonly,
        onFocus
      } = props2;
      if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly) {
        return;
      }
      wrapWidth.value = getWrapWidth();
      offsetY.value = toPxNum(props2.offsetY);
      isFocus.value = true;
      call(onFocus);
      validateWithTrigger("onFocus");
    };
    var handleBlur = () => {
      var {
        disabled,
        readonly,
        onBlur
      } = props2;
      if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly) {
        return;
      }
      call(onBlur);
      validateWithTrigger("onBlur");
    };
    var onSelect = (option2) => {
      var {
        disabled,
        readonly,
        multiple: multiple2,
        onChange
      } = props2;
      if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly) {
        return;
      }
      var selectedValue = multiple2 ? options.filter((_ref4) => {
        var {
          selected
        } = _ref4;
        return selected.value;
      }).map(findValueOrLabel) : findValueOrLabel(option2);
      call(props2["onUpdate:modelValue"], selectedValue);
      call(onChange, selectedValue);
      validateWithTrigger("onChange");
      !multiple2 && (isFocus.value = false);
    };
    var handleClear = () => {
      var {
        disabled,
        readonly,
        multiple: multiple2,
        clearable,
        onClear
      } = props2;
      if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly || !clearable) {
        return;
      }
      var changedModelValue = multiple2 ? [] : void 0;
      call(props2["onUpdate:modelValue"], changedModelValue);
      call(onClear, changedModelValue);
      validateWithTrigger("onClear");
    };
    var handleClick = (e) => {
      var {
        disabled,
        onClick
      } = props2;
      if (form != null && form.disabled.value || disabled) {
        return;
      }
      call(onClick, e);
      validateWithTrigger("onClick");
    };
    var handleClose = (text) => {
      var {
        disabled,
        readonly,
        modelValue,
        onClose
      } = props2;
      if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly) {
        return;
      }
      var rawModelValue = modelValue;
      var option2 = options.find((_ref5) => {
        var {
          label: label2
        } = _ref5;
        return label2.value === text;
      });
      var currentModelValue = rawModelValue.filter((value) => {
        var _value$value;
        return value !== ((_value$value = option2.value.value) != null ? _value$value : option2.label.value);
      });
      call(props2["onUpdate:modelValue"], currentModelValue);
      call(onClose, currentModelValue);
      validateWithTrigger("onClose");
    };
    var syncOptions = () => {
      var {
        multiple: multiple2,
        modelValue
      } = props2;
      if (multiple2) {
        var rawModelValue = modelValue;
        options.forEach((option2) => option2.sync(rawModelValue.includes(findValueOrLabel(option2))));
      } else {
        options.forEach((option2) => option2.sync(modelValue === findValueOrLabel(option2)));
      }
      computeLabel();
    };
    var focus = () => {
      wrapWidth.value = getWrapWidth();
      offsetY.value = toPxNum(props2.offsetY);
      isFocus.value = true;
    };
    var blur = () => {
      isFocus.value = false;
    };
    var validate = () => v(props2.rules, props2.modelValue);
    var reset = () => {
      call(props2["onUpdate:modelValue"], props2.multiple ? [] : void 0);
      resetValidation();
    };
    vue.watch(() => props2.multiple, () => {
      var {
        multiple: multiple2,
        modelValue
      } = props2;
      if (multiple2 && !isArray(modelValue)) {
        error$1("Select", "The modelValue must be an array when multiple is true");
      }
    });
    vue.watch(() => props2.modelValue, syncOptions, {
      deep: true
    });
    vue.watch(() => length.value, syncOptions);
    var selectProvider = {
      wrapWidth: vue.computed(() => wrapWidth.value),
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
      n: n$h,
      classes: classes$d,
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
__sfc__$g.render = __render__$f;
const Select = __sfc__$g;
Select.install = function(app) {
  app.component(Select.name, Select);
};
var _SelectComponent = Select;
var props$e = {
  loading: {
    type: Boolean,
    default: true
  },
  title: {
    type: Boolean,
    default: false
  },
  card: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: Boolean,
    default: false
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  fullscreenZIndex: {
    type: [Number, String],
    default: 100
  },
  titleWidth: {
    type: [Number, String]
  },
  cardHeight: {
    type: [Number, String]
  },
  avatarSize: {
    type: [Number, String]
  },
  rows: {
    type: [Number, String],
    default: 3
  },
  rowsWidth: {
    type: Array,
    default: () => []
  }
};
var {
  n: n$g,
  classes: classes$c
} = createNamespace("skeleton");
function __render__$e(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n("$--box"), _ctx.n()))
    },
    [!_ctx.loading ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 0,
        class: vue.normalizeClass(_ctx.n("data"))
      },
      [vue.renderSlot(_ctx.$slots, "default")],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true), _ctx.loading && !_ctx.fullscreen ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 1,
        class: vue.normalizeClass(_ctx.n("content"))
      },
      [_ctx.card ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          class: vue.normalizeClass(_ctx.n("card")),
          style: vue.normalizeStyle({
            height: _ctx.toSizeUnit(_ctx.cardHeight)
          })
        },
        [vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass(_ctx.n("--animation"))
          },
          null,
          2
          /* CLASS */
        )],
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true), _ctx.avatar || _ctx.title || _ctx.toNumber(_ctx.rows) > 0 ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 1,
          class: vue.normalizeClass(_ctx.n("article"))
        },
        [_ctx.avatar ? (vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: 0,
            class: vue.normalizeClass(_ctx.n("avatar")),
            style: vue.normalizeStyle({
              width: _ctx.toSizeUnit(_ctx.avatarSize),
              height: _ctx.toSizeUnit(_ctx.avatarSize)
            })
          },
          [vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(_ctx.n("--animation"))
            },
            null,
            2
            /* CLASS */
          )],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true), _ctx.title || _ctx.toNumber(_ctx.rows) > 0 ? (vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: 1,
            class: vue.normalizeClass(_ctx.n("section"))
          },
          [_ctx.title ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(_ctx.n("title")),
              style: vue.normalizeStyle({
                width: _ctx.toSizeUnit(_ctx.titleWidth)
              })
            },
            [vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(_ctx.n("--animation"))
              },
              null,
              2
              /* CLASS */
            )],
            6
            /* CLASS, STYLE */
          )) : vue.createCommentVNode("v-if", true), (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.toNumber(_ctx.rows), (r, index) => {
              return vue.openBlock(), vue.createElementBlock(
                "div",
                {
                  class: vue.normalizeClass(_ctx.n("row")),
                  key: r,
                  style: vue.normalizeStyle({
                    width: _ctx.toSizeUnit(_ctx.rowsWidth[index])
                  })
                },
                [vue.createElementVNode(
                  "div",
                  {
                    class: vue.normalizeClass(_ctx.n("--animation"))
                  },
                  null,
                  2
                  /* CLASS */
                )],
                6
                /* CLASS, STYLE */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))],
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true)],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true)],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true), _ctx.loading && _ctx.fullscreen ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 2,
        class: vue.normalizeClass(_ctx.n("fullscreen")),
        style: vue.normalizeStyle({
          zIndex: _ctx.toNumber(_ctx.fullscreenZIndex)
        })
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("--animation"))
        },
        null,
        2
        /* CLASS */
      )],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true)],
    2
    /* CLASS */
  );
}
var __sfc__$f = vue.defineComponent({
  name: "VarSkeleton",
  props: props$e,
  setup() {
    return {
      n: n$g,
      classes: classes$c,
      toSizeUnit,
      toNumber
    };
  }
});
__sfc__$f.render = __render__$e;
const Skeleton = __sfc__$f;
Skeleton.install = function(app) {
  app.component(Skeleton.name, Skeleton);
};
var _SkeletonComponent = Skeleton;
function labelValidator(label) {
  return ["always", "normal", "never"].includes(label);
}
var Thumbs = /* @__PURE__ */ function(Thumbs2) {
  Thumbs2["First"] = "1";
  Thumbs2["Second"] = "2";
  return Thumbs2;
}({});
var props$d = {
  // 当前进度百分比
  modelValue: {
    type: [Number, Array],
    default: 0
  },
  // 步长
  step: {
    type: [Number, String],
    default: 1
  },
  // 是否开启双滑块模式
  range: {
    type: Boolean,
    default: false
  },
  labelVisible: {
    type: String,
    default: "normal",
    validator: labelValidator
  },
  activeColor: {
    type: String
  },
  trackColor: {
    type: String
  },
  thumbColor: {
    type: String
  },
  labelColor: {
    type: String
  },
  labelTextColor: {
    type: String
  },
  trackHeight: {
    type: [String, Number]
  },
  max: {
    type: [String, Number],
    default: 100
  },
  min: {
    type: [String, Number],
    default: 0
  },
  thumbSize: {
    type: [String, Number]
  },
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否只读
  readonly: {
    type: Boolean,
    default: false
  },
  rules: {
    type: Array
  },
  onChange: defineListenerProp(),
  onStart: defineListenerProp(),
  onEnd: defineListenerProp(),
  "onUpdate:modelValue": defineListenerProp()
};
var {
  n: n$f,
  classes: classes$b
} = createNamespace("slider");
var _hoisted_1$3 = ["onTouchstart", "onTouchmove", "onTouchend", "onTouchcancel"];
function __render__$d(_ctx, _cache) {
  var _component_var_hover_overlay = vue.resolveComponent("var-hover-overlay");
  var _component_var_form_details = vue.resolveComponent("var-form-details");
  var _directive_hover = vue.resolveDirective("hover");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n())
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.classes(_ctx.n("block"), [_ctx.isDisabled, _ctx.n("--disabled")], [_ctx.errorMessage, _ctx.n("--error")])),
        ref: "sliderEl",
        onClick: _cache[0] || (_cache[0] = function() {
          return _ctx.click && _ctx.click(...arguments);
        })
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("track"))
        },
        [vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass(_ctx.n("track-background")),
            style: vue.normalizeStyle({
              background: _ctx.trackColor,
              height: _ctx.multiplySizeUnit(_ctx.trackHeight)
            })
          },
          null,
          6
          /* CLASS, STYLE */
        ), vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass(_ctx.n("track-fill")),
            style: vue.normalizeStyle(_ctx.getFillStyle)
          },
          null,
          6
          /* CLASS, STYLE */
        )],
        2
        /* CLASS */
      ), (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList(_ctx.thumbList, (item) => {
          return vue.openBlock(), vue.createElementBlock("div", {
            class: vue.normalizeClass(_ctx.n("thumb")),
            key: item.enumValue,
            style: vue.normalizeStyle({
              left: item.value + "%",
              zIndex: _ctx.thumbsProps[item.enumValue].active ? 1 : void 0
            }),
            onTouchstart: vue.withModifiers(($event) => _ctx.start($event, item.enumValue), ["stop"]),
            onTouchmove: vue.withModifiers(($event) => _ctx.move($event, item.enumValue), ["stop"]),
            onTouchend: ($event) => _ctx.end(item.enumValue),
            onTouchcancel: ($event) => _ctx.end(item.enumValue)
          }, [vue.renderSlot(_ctx.$slots, "button", {
            currentValue: item.text
          }, () => [vue.withDirectives(vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(_ctx.n("thumb-block")),
              style: vue.normalizeStyle({
                background: _ctx.thumbColor
              })
            },
            null,
            6
            /* CLASS, STYLE */
          ), [[_directive_hover, (value) => _ctx.hover(value, item), "desktop"]]), vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(_ctx.classes(_ctx.n("thumb-ripple"), [_ctx.thumbsProps[item.enumValue].active, _ctx.n("thumb-ripple--active")])),
              style: vue.normalizeStyle({
                background: _ctx.thumbsProps[item.enumValue].active ? _ctx.thumbColor : void 0
              })
            },
            [vue.createVNode(_component_var_hover_overlay, {
              hovering: item.hovering
            }, null, 8, ["hovering"])],
            6
            /* CLASS, STYLE */
          ), vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(_ctx.classes(_ctx.n("thumb-label"), [_ctx.showLabel(item.enumValue), _ctx.n("thumb-label--active")])),
              style: vue.normalizeStyle({
                background: _ctx.labelColor,
                color: _ctx.labelTextColor,
                height: _ctx.thumbSize === void 0 ? _ctx.thumbSize : _ctx.multiplySizeUnit(_ctx.thumbSize, 2),
                width: _ctx.thumbSize === void 0 ? _ctx.thumbSize : _ctx.multiplySizeUnit(_ctx.thumbSize, 2)
              })
            },
            [vue.createElementVNode(
              "span",
              null,
              vue.toDisplayString(item.text),
              1
              /* TEXT */
            )],
            6
            /* CLASS, STYLE */
          )])], 46, _hoisted_1$3);
        }),
        128
        /* KEYED_FRAGMENT */
      ))],
      2
      /* CLASS */
    ), vue.createVNode(_component_var_form_details, {
      "error-message": _ctx.errorMessage,
      class: vue.normalizeClass(_ctx.n("form")),
      "var-slider-cover": ""
    }, null, 8, ["error-message", "class"])],
    2
    /* CLASS */
  );
}
var __sfc__$e = vue.defineComponent({
  name: "VarSlider",
  components: {
    VarFormDetails: FormDetails,
    VarHoverOverlay: HoverOverlay
  },
  directives: {
    Hover: Hover$1
  },
  props: props$d,
  setup(props2) {
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
    var validate = () => v(props2.rules, props2.modelValue);
    var getThumbProps = () => ({
      startPosition: 0,
      currentLeft: 0,
      active: false,
      percentValue: 0
    });
    var validateWithTrigger = () => vue.nextTick(() => vt(["onChange"], "onChange", props2.rules, props2.modelValue));
    var sliderEl = vue.ref(null);
    var maxWidth = vue.ref(0);
    var isScroll = vue.ref(false);
    var thumbsProps = vue.reactive({
      [Thumbs.First]: getThumbProps(),
      [Thumbs.Second]: getThumbProps()
    });
    var scope = vue.computed(() => toNumber(props2.max) - toNumber(props2.min));
    var unitWidth = vue.computed(() => maxWidth.value / scope.value * toNumber(props2.step));
    var thumbList = vue.computed(() => {
      var {
        modelValue,
        range
      } = props2;
      var list2 = [];
      if (range && isArray(modelValue)) {
        list2 = [{
          value: getValue(modelValue[0]),
          enumValue: Thumbs.First,
          text: toPrecision(modelValue[0]),
          hovering: vue.unref(hoveringFirst),
          handleHovering: handleHoveringFirst
        }, {
          value: getValue(modelValue[1]),
          enumValue: Thumbs.Second,
          text: toPrecision(modelValue[1]),
          hovering: vue.unref(hoveringSecond),
          handleHovering: handleHoveringSecond
        }];
      } else if (isNumber(modelValue)) {
        list2 = [{
          value: getValue(modelValue),
          enumValue: Thumbs.First,
          text: toPrecision(modelValue),
          hovering: vue.unref(hoveringFirst),
          handleHovering: handleHoveringFirst
        }];
      }
      return list2;
    });
    var getFillStyle = vue.computed(() => {
      var {
        activeColor,
        range,
        modelValue
      } = props2;
      var left2 = range && isArray(modelValue) ? getValue(Math.min(modelValue[0], modelValue[1])) : 0;
      var width = range && isArray(modelValue) ? getValue(Math.max(modelValue[0], modelValue[1])) - left2 : getValue(modelValue);
      return {
        width: width + "%",
        left: left2 + "%",
        background: activeColor
      };
    });
    var isDisabled = vue.computed(() => props2.disabled || (form == null ? void 0 : form.disabled.value));
    var isReadonly = vue.computed(() => props2.readonly || (form == null ? void 0 : form.readonly.value));
    var showLabel = (type) => {
      if (props2.labelVisible === "always")
        return true;
      if (props2.labelVisible === "never")
        return false;
      return thumbsProps[type].active;
    };
    var getValue = (value) => {
      var {
        min: min2,
        max: max2
      } = props2;
      if (value < toNumber(min2))
        return 0;
      if (value > toNumber(max2))
        return 100;
      return (value - toNumber(min2)) / scope.value * 100;
    };
    var toPrecision = (value) => {
      if (!isNumber(value))
        return 0;
      var num = value;
      if (num < Number(props2.min))
        num = Number(props2.min);
      if (num > Number(props2.max))
        num = Number(props2.max);
      var isInteger = parseInt("" + num, 10) === num;
      return isInteger ? num : toNumber(num.toPrecision(5));
    };
    var hover = (value, item) => {
      if (isDisabled.value)
        return;
      item.handleHovering(value);
    };
    var setPercent = (moveDistance, type) => {
      var rangeValue = [];
      var {
        step: step2,
        range,
        modelValue,
        onChange,
        min: min2
      } = props2;
      var stepNumber = toNumber(step2);
      var roundDistance = Math.round(moveDistance / unitWidth.value);
      var curValue = roundDistance * stepNumber + toNumber(min2);
      var prevValue = thumbsProps[type].percentValue * stepNumber + toNumber(min2);
      thumbsProps[type].percentValue = roundDistance;
      if (range && isArray(modelValue)) {
        rangeValue = type === Thumbs.First ? [curValue, modelValue[1]] : [modelValue[0], curValue];
      }
      if (prevValue !== curValue) {
        var value = range ? rangeValue.map((value2) => toPrecision(value2)) : toPrecision(curValue);
        call(onChange, value);
        call(props2["onUpdate:modelValue"], value);
        validateWithTrigger();
      }
    };
    var getType = (offset2) => {
      if (!props2.range)
        return Thumbs.First;
      var thumb1Distance = thumbsProps[Thumbs.First].percentValue * unitWidth.value;
      var thumb2Distance = thumbsProps[Thumbs.Second].percentValue * unitWidth.value;
      var offsetToThumb1 = Math.abs(offset2 - thumb1Distance);
      var offsetToThumb2 = Math.abs(offset2 - thumb2Distance);
      return offsetToThumb1 <= offsetToThumb2 ? Thumbs.First : Thumbs.Second;
    };
    var start2 = (event, type) => {
      if (!maxWidth.value)
        maxWidth.value = sliderEl.value.offsetWidth;
      if (!isDisabled.value) {
        thumbsProps[type].active = true;
      }
      if (isDisabled.value || isReadonly.value)
        return;
      call(props2.onStart);
      isScroll.value = true;
      thumbsProps[type].startPosition = event.touches[0].clientX;
    };
    var move = (event, type) => {
      if (isDisabled.value || isReadonly.value || !isScroll.value)
        return;
      var moveDistance = event.touches[0].clientX - thumbsProps[type].startPosition + thumbsProps[type].currentLeft;
      if (moveDistance <= 0)
        moveDistance = 0;
      else if (moveDistance >= maxWidth.value)
        moveDistance = maxWidth.value;
      setPercent(moveDistance, type);
    };
    var end2 = (type) => {
      var {
        range,
        modelValue,
        onEnd,
        step: step2,
        min: min2
      } = props2;
      if (!isDisabled.value) {
        thumbsProps[type].active = false;
      }
      if (isDisabled.value || isReadonly.value)
        return;
      var rangeValue = [];
      thumbsProps[type].currentLeft = thumbsProps[type].percentValue * unitWidth.value;
      var curValue = thumbsProps[type].percentValue * toNumber(step2) + toNumber(min2);
      if (range && isArray(modelValue)) {
        rangeValue = type === Thumbs.First ? [curValue, modelValue[1]] : [modelValue[0], curValue];
      }
      call(onEnd, range ? rangeValue : curValue);
      isScroll.value = false;
    };
    var click = (event) => {
      if (isDisabled.value || isReadonly.value)
        return;
      if (event.target.closest("." + n$f("thumb")))
        return;
      var offset2 = event.clientX - getLeft(event.currentTarget);
      var type = getType(offset2);
      setPercent(offset2, type);
      end2(type);
    };
    var stepValidator = () => {
      var stepNumber = toNumber(props2.step);
      if (isNaN(stepNumber)) {
        warn("Slider", 'type of prop "step" should be Number');
        return false;
      }
      if (stepNumber < 0) {
        warn("Slider", '"step" should be > 0');
        return false;
      }
      return true;
    };
    var valueValidator = () => {
      var {
        range,
        modelValue
      } = props2;
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
    var setProps = function(modelValue, step2) {
      if (modelValue === void 0) {
        modelValue = props2.modelValue;
      }
      if (step2 === void 0) {
        step2 = toNumber(props2.step);
      }
      var getPercent = (value) => {
        var {
          min: min2,
          max: max2
        } = props2;
        if (value < toNumber(min2))
          return 0;
        if (value > toNumber(max2))
          return scope.value / step2;
        return (value - toNumber(min2)) / step2;
      };
      if (props2.range && isArray(modelValue)) {
        thumbsProps[Thumbs.First].percentValue = getPercent(modelValue[0]);
        thumbsProps[Thumbs.First].currentLeft = thumbsProps[Thumbs.First].percentValue * unitWidth.value;
        thumbsProps[Thumbs.Second].percentValue = getPercent(modelValue[1]);
        thumbsProps[Thumbs.Second].currentLeft = thumbsProps[Thumbs.Second].percentValue * unitWidth.value;
      } else if (isNumber(modelValue)) {
        thumbsProps[Thumbs.First].currentLeft = getPercent(modelValue) * unitWidth.value;
      }
    };
    var reset = () => {
      var resetValue = props2.range ? [0, 0] : 0;
      call(props2["onUpdate:modelValue"], resetValue);
      resetValidation();
    };
    var sliderProvider = {
      reset,
      validate,
      resetValidation
    };
    call(bindForm, sliderProvider);
    vue.watch([() => props2.modelValue, () => props2.step], (_ref) => {
      var [modelValue, step2] = _ref;
      if (!stepValidator() || !valueValidator() || isScroll.value)
        return;
      setProps(modelValue, toNumber(step2));
    });
    vue.watch(maxWidth, () => setProps());
    useMounted(() => {
      if (!stepValidator() || !valueValidator())
        return;
      maxWidth.value = sliderEl.value.offsetWidth;
    });
    return {
      n: n$f,
      classes: classes$b,
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
      start: start2,
      move,
      end: end2,
      click
    };
  }
});
__sfc__$e.render = __render__$d;
const Slider = __sfc__$e;
Slider.install = function(app) {
  app.component(Slider.name, Slider);
};
var _SliderComponent = Slider;
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
function positionValidator(position) {
  var validPositions = ["top", "center", "bottom"];
  return validPositions.includes(position);
}
function typeValidator(type) {
  return SNACKBAR_TYPE.includes(type);
}
var props$c = {
  type: {
    type: String,
    validator: typeValidator
  },
  // snackbar显示的位置
  position: {
    type: String,
    default: "top",
    validator: positionValidator
  },
  // content内容
  content: {
    type: String
  },
  // 为snackbar content添加自定义类名
  contentClass: {
    type: String
  },
  // snackbar 持续时间
  duration: {
    type: Number,
    default: 3e3
  },
  // 是否将消息条内容堆叠在操作（按钮）之上
  vertical: {
    type: Boolean,
    default: false
  },
  loadingType: pickProps(props$13, "type"),
  loadingSize: pickProps(props$13, "size"),
  loadingRadius: pickProps(props$13, "radius"),
  loadingColor: _extends$2({}, pickProps(props$13, "color"), {
    default: "currentColor"
  }),
  // 是否禁止滚动穿透
  lockScroll: {
    type: Boolean,
    default: false
  },
  // 控制组件可见还是隐藏
  show: {
    type: Boolean,
    default: false
  },
  // teleport
  teleport: {
    type: String,
    default: "body"
  },
  // 是否禁止点击背景
  forbidClick: {
    type: Boolean,
    default: false
  },
  // 打开时的回调函数
  onOpen: defineListenerProp(),
  // 打开动画结束时的回调
  onOpened: defineListenerProp(),
  // 关闭时的回调函数
  onClose: defineListenerProp(),
  // 关闭动画结束时的回调
  onClosed: defineListenerProp(),
  "onUpdate:show": defineListenerProp(),
  _update: {
    type: String
  }
};
var {
  n: n$e,
  classes: classes$a
} = createNamespace("snackbar");
var ICON_TYPE_DICT = {
  success: "checkbox-marked-circle",
  warning: "warning",
  info: "information",
  error: "error",
  loading: ""
};
function __render__$c(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  var _component_var_loading = vue.resolveComponent("var-loading");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n()),
      style: vue.normalizeStyle({
        pointerEvents: _ctx.isForbidClick ? "auto" : "none",
        zIndex: _ctx.zIndex
      })
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.classes(_ctx.n("wrapper"), _ctx.n("wrapper-" + _ctx.position), _ctx.n("$-elevation--4"), [_ctx.vertical, _ctx.n("vertical")], [_ctx.type && _ctx.SNACKBAR_TYPE.includes(_ctx.type), _ctx.n("wrapper-" + _ctx.type)])),
        style: vue.normalizeStyle({
          zIndex: _ctx.zIndex
        })
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass([_ctx.n("content"), _ctx.contentClass])
        },
        [vue.renderSlot(_ctx.$slots, "default", {}, () => [vue.createTextVNode(
          vue.toDisplayString(_ctx.content),
          1
          /* TEXT */
        )])],
        2
        /* CLASS */
      ), vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("action"))
        },
        [_ctx.iconName ? (vue.openBlock(), vue.createBlock(_component_var_icon, {
          key: 0,
          name: _ctx.iconName
        }, null, 8, ["name"])) : vue.createCommentVNode("v-if", true), _ctx.type === "loading" ? (vue.openBlock(), vue.createBlock(_component_var_loading, {
          key: 1,
          type: _ctx.loadingType,
          size: _ctx.loadingSize,
          color: _ctx.loadingColor,
          radius: _ctx.loadingRadius
        }, null, 8, ["type", "size", "color", "radius"])) : vue.createCommentVNode("v-if", true), vue.renderSlot(_ctx.$slots, "action")],
        2
        /* CLASS */
      )],
      6
      /* CLASS, STYLE */
    )],
    6
    /* CLASS, STYLE */
  )), [[vue.vShow, _ctx.show]]);
}
var __sfc__$d = vue.defineComponent({
  name: "VarSnackbarCore",
  components: {
    VarLoading: Loading,
    VarIcon: Icon
  },
  props: props$c,
  setup(props2) {
    var timer = vue.ref(null);
    var {
      zIndex
    } = useZIndex(() => props2.show, 1);
    useLock(() => props2.show, () => props2.lockScroll);
    var isForbidClick = vue.computed(() => props2.type === "loading" || props2.forbidClick);
    var iconName = vue.computed(() => {
      if (!props2.type)
        return "";
      return ICON_TYPE_DICT[props2.type];
    });
    var updateAfterDuration = () => {
      timer.value = setTimeout(() => {
        props2.type !== "loading" && call(props2["onUpdate:show"], false);
      }, props2.duration);
    };
    vue.watch(() => props2.show, (show) => {
      if (show) {
        call(props2.onOpen);
        updateAfterDuration();
      } else if (show === false) {
        clearTimeout(timer.value);
        call(props2.onClose);
      }
    });
    vue.watch(() => props2._update, () => {
      clearTimeout(timer.value);
      updateAfterDuration();
    });
    useMounted(() => {
      if (props2.show) {
        call(props2.onOpen);
        updateAfterDuration();
      }
    });
    return {
      SNACKBAR_TYPE,
      n: n$e,
      classes: classes$a,
      zIndex,
      iconName,
      isForbidClick
    };
  }
});
__sfc__$d.render = __render__$c;
const VarSnackbarCore = __sfc__$d;
var {
  n: n$d
} = createNamespace("snackbar");
function __render__$b(_ctx, _cache) {
  var _component_var_snackbar_core = vue.resolveComponent("var-snackbar-core");
  return vue.openBlock(), vue.createBlock(vue.Teleport, {
    to: _ctx.teleport,
    disabled: _ctx.disabled
  }, [vue.createVNode(vue.Transition, {
    name: _ctx.n() + "-fade",
    onAfterEnter: _ctx.onOpened,
    onAfterLeave: _ctx.onClosed
  }, {
    default: vue.withCtx(() => [vue.createVNode(_component_var_snackbar_core, vue.mergeProps(_ctx.$props, {
      class: _ctx.n("transition")
    }), {
      action: vue.withCtx(() => [vue.renderSlot(_ctx.$slots, "action")]),
      default: vue.withCtx(() => [vue.renderSlot(_ctx.$slots, "default", {}, () => [vue.createTextVNode(
        vue.toDisplayString(_ctx.content),
        1
        /* TEXT */
      )])]),
      _: 3
      /* FORWARDED */
    }, 16, ["class"])]),
    _: 3
    /* FORWARDED */
  }, 8, ["name", "onAfterEnter", "onAfterLeave"])], 8, ["to", "disabled"]);
}
var __sfc__$c = vue.defineComponent({
  name: "VarSnackbar",
  components: {
    VarSnackbarCore
  },
  props: props$c,
  setup() {
    var {
      disabled
    } = useTeleport();
    return {
      n: n$d,
      disabled
    };
  }
});
__sfc__$c.render = __render__$b;
const VarSnackbar = __sfc__$c;
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
var SNACKBAR_TYPE = ["loading", "success", "warning", "info", "error"];
var sid = 0;
var isMount = false;
var unmount;
var isAllowMultiple = false;
var defaultOptionsValue = {
  type: void 0,
  content: "",
  position: "top",
  duration: 3e3,
  vertical: false,
  contentClass: void 0,
  loadingType: "circle",
  loadingSize: "normal",
  lockScroll: false,
  teleport: "body",
  forbidClick: false,
  onOpen: () => {
  },
  onOpened: () => {
  },
  onClose: () => {
  },
  onClosed: () => {
  }
};
var uniqSnackbarOptions = vue.reactive([]);
var defaultOptions = defaultOptionsValue;
var transitionGroupProps = {
  name: "var-snackbar-fade",
  tag: "div",
  class: "var-transition-group"
};
var TransitionGroupHost = {
  setup() {
    return () => {
      var snackbarList = uniqSnackbarOptions.map((_ref) => {
        var {
          id,
          reactiveSnackOptions,
          _update
        } = _ref;
        var transitionGroupEl = document.querySelector(".var-transition-group");
        if (reactiveSnackOptions.forbidClick || reactiveSnackOptions.type === "loading") {
          transitionGroupEl.classList.add("var-pointer-auto");
        } else {
          transitionGroupEl.classList.remove("var-pointer-auto");
        }
        if (isAllowMultiple)
          reactiveSnackOptions.position = "top";
        var position = isAllowMultiple ? "relative" : "absolute";
        var style = _extends$1({
          position
        }, getTop(reactiveSnackOptions.position));
        return vue.createVNode(VarSnackbarCore, vue.mergeProps(reactiveSnackOptions, {
          "key": id,
          "style": style,
          "data-id": id,
          "_update": _update,
          "show": reactiveSnackOptions.show,
          "onUpdate:show": ($event) => reactiveSnackOptions.show = $event
        }), null);
      });
      return vue.createVNode(vue.TransitionGroup, vue.mergeProps(transitionGroupProps, {
        "style": {
          zIndex: Context.zIndex
        },
        "onAfterEnter": opened,
        "onAfterLeave": removeUniqOption
      }), _isSlot(snackbarList) ? snackbarList : {
        default: () => [snackbarList]
      });
    };
  }
};
var Snackbar = function(options) {
  var snackOptions = normalizeOptions(options);
  var reactiveSnackOptions = vue.reactive(_extends$1({}, defaultOptions, snackOptions));
  reactiveSnackOptions.show = true;
  if (!isMount) {
    isMount = true;
    unmount = mountInstance(TransitionGroupHost).unmountInstance;
  }
  var {
    length
  } = uniqSnackbarOptions;
  var uniqSnackbarOptionItem = {
    id: sid++,
    reactiveSnackOptions
  };
  if (length === 0 || isAllowMultiple) {
    addUniqOption(uniqSnackbarOptionItem);
  } else {
    var _update = "update-" + sid;
    updateUniqOption(reactiveSnackOptions, _update);
  }
  return {
    clear() {
      if (!isAllowMultiple && uniqSnackbarOptions.length) {
        uniqSnackbarOptions[0].reactiveSnackOptions.show = false;
      } else {
        reactiveSnackOptions.show = false;
      }
    }
  };
};
SNACKBAR_TYPE.forEach((type) => {
  Snackbar[type] = (options) => {
    if (isPlainObject(options)) {
      options.type = type;
    } else {
      options = {
        content: options,
        type
      };
    }
    return Snackbar(options);
  };
});
Snackbar.install = function(app) {
  app.component(VarSnackbar.name, VarSnackbar);
};
Snackbar.allowMultiple = function(bool) {
  if (bool === void 0) {
    bool = false;
  }
  if (bool !== isAllowMultiple) {
    uniqSnackbarOptions.forEach((option2) => {
      option2.reactiveSnackOptions.show = false;
    });
    isAllowMultiple = bool;
  }
};
Snackbar.clear = function() {
  uniqSnackbarOptions.forEach((option2) => {
    option2.reactiveSnackOptions.show = false;
  });
};
Snackbar.setDefaultOptions = function(options) {
  defaultOptions = options;
};
Snackbar.resetDefaultOptions = function() {
  defaultOptions = defaultOptionsValue;
};
Snackbar.Component = VarSnackbar;
function opened(element) {
  var id = element.getAttribute("data-id");
  var option2 = uniqSnackbarOptions.find((option3) => option3.id === toNumber(id));
  if (option2) {
    call(option2.reactiveSnackOptions.onOpened);
  }
}
function removeUniqOption(element) {
  element.parentElement && element.parentElement.classList.remove("var-pointer-auto");
  var id = element.getAttribute("data-id");
  var option2 = uniqSnackbarOptions.find((option3) => option3.id === toNumber(id));
  if (option2) {
    option2.animationEnd = true;
    call(option2.reactiveSnackOptions.onClosed);
  }
  var isAllAnimationEnd = uniqSnackbarOptions.every((option3) => option3.animationEnd);
  if (isAllAnimationEnd) {
    call(unmount);
    uniqSnackbarOptions = vue.reactive([]);
    isMount = false;
  }
}
function addUniqOption(uniqSnackbarOptionItem) {
  uniqSnackbarOptions.push(uniqSnackbarOptionItem);
}
function normalizeOptions(options) {
  if (options === void 0) {
    options = {};
  }
  return isString(options) ? {
    content: options
  } : options;
}
function updateUniqOption(reactiveSnackOptions, _update) {
  var [firstOption] = uniqSnackbarOptions;
  firstOption.reactiveSnackOptions = _extends$1({}, firstOption.reactiveSnackOptions, reactiveSnackOptions);
  firstOption._update = _update;
}
function getTop(position) {
  if (position === void 0) {
    position = "top";
  }
  if (position === "bottom")
    return {
      [position]: "5%"
    };
  return {
    top: position === "top" ? "5%" : "45%"
  };
}
VarSnackbar.install = function(app) {
  app.component(VarSnackbar.name, VarSnackbar);
};
var _SnackbarComponent = VarSnackbar;
const Snackbar$1 = Snackbar;
var internalSizeValidator = (size) => ["mini", "small", "normal", "large"].includes(size);
var sizeValidator = (size) => {
  return internalSizeValidator(size) || isArray(size) || isNumber(size) || isString(size);
};
var justifyValidator = (justify) => {
  return ["start", "end", "center", "space-around", "space-between", "flex-start", "flex-end"].includes(justify);
};
var alignValidator = (align) => {
  return ["stretch", "center", "start", "end", "baseline", "flex-start", "flex-end"].includes(align);
};
var props$b = {
  size: {
    type: [String, Number, Array],
    default: "normal",
    validator: sizeValidator
  },
  wrap: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String,
    default: "row"
  },
  justify: {
    type: String,
    default: "flex-start",
    validator: justifyValidator
  },
  align: {
    type: String,
    validator: alignValidator
  },
  inline: {
    type: Boolean,
    default: false
  }
};
function half(value) {
  return "calc(" + value + " / 2)";
}
function computeMargin(y, x, options) {
  var {
    direction,
    justify,
    index,
    lastIndex
  } = options;
  var margin = "0";
  if (direction === "row") {
    if (["flex-start", "center", "flex-end", "start", "end"].includes(justify)) {
      if (index !== lastIndex) {
        margin = half(y) + " " + x + " " + half(y) + " 0";
      } else {
        margin = half(y) + " 0";
      }
    } else if (justify === "space-around") {
      margin = half(y) + " " + half(x);
    } else if (justify === "space-between") {
      if (index === 0) {
        margin = half(y) + " " + half(x) + " " + half(y) + " 0";
      } else if (index === lastIndex) {
        margin = half(y) + " 0 " + half(y) + " " + half(x);
      } else {
        margin = half(y) + " " + half(x);
      }
    }
  }
  if (direction === "column" && index !== lastIndex) {
    margin = "0 0 " + y + " 0";
  }
  return margin;
}
var {
  n: n$c,
  classes: classes$9
} = createNamespace("space");
const Space = vue.defineComponent({
  name: "VarSpace",
  props: props$b,
  setup(props2, _ref) {
    var {
      slots
    } = _ref;
    var getSize = (size, isInternalSize) => {
      return isInternalSize ? ["var(--space-size-" + size + "-y)", "var(--space-size-" + size + "-x)"] : isArray(size) ? size.map(toSizeUnit) : [toSizeUnit(size), toSizeUnit(size)];
    };
    return () => {
      var _call;
      var {
        inline,
        justify,
        align,
        wrap,
        direction,
        size
      } = props2;
      var children = (_call = call(slots.default)) != null ? _call : [];
      var isInternalSize = internalSizeValidator(size);
      var [y, x] = getSize(size, isInternalSize);
      children = flatFragment(children);
      var lastIndex = children.length - 1;
      var spacers = children.map((child, index) => {
        var margin = computeMargin(y, x, {
          direction,
          justify,
          index,
          lastIndex
        });
        return vue.createVNode("div", {
          "style": {
            margin
          }
        }, [child]);
      });
      return vue.createVNode("div", {
        "class": classes$9(n$c(), n$c("$--box"), [inline, n$c("--inline")]),
        "style": {
          flexDirection: direction,
          justifyContent: padStartFlex(justify),
          alignItems: padStartFlex(align),
          flexWrap: wrap ? "wrap" : "nowrap",
          margin: direction === "row" ? "calc(-1 * " + y + " / 2) 0" : void 0
        }
      }, [spacers]);
    };
  }
});
Space.install = function(app) {
  app.component(Space.name, Space);
};
var _SpaceComponent = Space;
var props$a = {
  activeIcon: {
    type: String,
    default: "check"
  },
  currentIcon: {
    type: String
  },
  inactiveIcon: {
    type: String
  }
};
var STEPS_BIND_STEP_KEY = Symbol("STEPS_BIND_STEP_KEY");
function useStep() {
  var {
    bindChildren,
    length,
    childProviders
  } = useChildren(STEPS_BIND_STEP_KEY);
  return {
    length,
    step: childProviders,
    bindStep: bindChildren
  };
}
function useSteps() {
  var {
    parentProvider,
    index,
    bindParent
  } = useParent(STEPS_BIND_STEP_KEY);
  if (!bindParent) {
    error$1("Steps", "<step/> must in <steps>");
  }
  return {
    index,
    steps: parentProvider,
    bindSteps: bindParent
  };
}
var {
  n: n$b,
  classes: classes$8
} = createNamespace("step");
var _hoisted_1$2 = {
  key: 3
};
function __render__$a(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n())
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n(_ctx.direction))
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n(_ctx.direction + "-main")),
          ref: _ctx.getRef
        },
        [vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass(_ctx.classes(_ctx.n(_ctx.direction + "-tag"), [_ctx.isActive || _ctx.isCurrent, _ctx.n(_ctx.direction + "-tag--active")])),
            style: vue.normalizeStyle({
              backgroundColor: _ctx.isActive || _ctx.isCurrent ? _ctx.activeColor : _ctx.inactiveColor
            }),
            onClick: _cache[0] || (_cache[0] = function() {
              return _ctx.click && _ctx.click(...arguments);
            })
          },
          [_ctx.isActive ? (vue.openBlock(), vue.createBlock(_component_var_icon, {
            key: 0,
            class: vue.normalizeClass(_ctx.n("icon")),
            "var-step-cover": "",
            name: _ctx.activeIcon
          }, null, 8, ["class", "name"])) : _ctx.isCurrent && _ctx.currentIcon ? (vue.openBlock(), vue.createBlock(_component_var_icon, {
            key: 1,
            class: vue.normalizeClass(_ctx.n("icon")),
            "var-step-cover": "",
            name: _ctx.currentIcon
          }, null, 8, ["class", "name"])) : _ctx.inactiveIcon ? (vue.openBlock(), vue.createBlock(_component_var_icon, {
            key: 2,
            class: vue.normalizeClass(_ctx.n("icon")),
            "var-step-cover": "",
            name: _ctx.inactiveIcon
          }, null, 8, ["class", "name"])) : (vue.openBlock(), vue.createElementBlock(
            "span",
            _hoisted_1$2,
            vue.toDisplayString(_ctx.index + 1),
            1
            /* TEXT */
          ))],
          6
          /* CLASS, STYLE */
        ), vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass(_ctx.classes(_ctx.n(_ctx.direction + "-content"), [_ctx.isActive || _ctx.isCurrent, _ctx.n(_ctx.direction + "-content--active")])),
            onClick: _cache[1] || (_cache[1] = function() {
              return _ctx.click && _ctx.click(...arguments);
            })
          },
          [vue.renderSlot(_ctx.$slots, "default")],
          2
          /* CLASS */
        )],
        2
        /* CLASS */
      ), !_ctx.isLastChild ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          class: vue.normalizeClass(_ctx.n(_ctx.direction + "-line")),
          style: vue.normalizeStyle({
            margin: _ctx.lineMargin
          })
        },
        null,
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)],
      2
      /* CLASS */
    )],
    2
    /* CLASS */
  );
}
var __sfc__$b = vue.defineComponent({
  name: "VarStep",
  components: {
    VarIcon: Icon
  },
  props: props$a,
  setup() {
    var main2 = vue.ref(null);
    var lineMargin = vue.ref("");
    var isLastChild = vue.ref(false);
    var {
      index,
      steps: steps2,
      bindSteps
    } = useSteps();
    var {
      active,
      length,
      activeColor,
      inactiveColor,
      direction,
      clickStep
    } = steps2;
    var isCurrent = vue.computed(() => active.value === index.value);
    var isActive = vue.computed(() => index.value !== -1 && active.value > index.value);
    var stepProvider = {
      index
    };
    var click = () => clickStep(index.value);
    var getRef = (el) => {
      if (direction.value === "horizontal") {
        main2.value = el;
      }
    };
    bindSteps(stepProvider);
    vue.watch(length, (newLength) => {
      isLastChild.value = newLength - 1 === index.value;
      if (main2.value) {
        var margin = main2.value.offsetWidth / 2 - 14;
        lineMargin.value = "0 -" + margin + "px";
      }
    });
    return {
      n: n$b,
      classes: classes$8,
      main: main2,
      index,
      isActive,
      isCurrent,
      direction,
      lineMargin,
      activeColor,
      inactiveColor,
      isLastChild,
      click,
      getRef
    };
  }
});
__sfc__$b.render = __render__$a;
const Step = __sfc__$b;
Step.install = function(app) {
  app.component(Step.name, Step);
};
var _StepComponent = Step;
function directionValidator$1(direction) {
  return ["horizontal", "vertical"].includes(direction);
}
var props$9 = {
  active: {
    type: [String, Number],
    default: 0
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: directionValidator$1
  },
  activeColor: {
    type: String
  },
  inactiveColor: {
    type: String
  },
  onClickStep: defineListenerProp()
};
var {
  n: n$a
} = createNamespace("steps");
function __render__$9(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n()),
      style: vue.normalizeStyle({
        flexDirection: _ctx.direction === "horizontal" ? "row" : "column"
      })
    },
    [vue.renderSlot(_ctx.$slots, "default")],
    6
    /* CLASS, STYLE */
  );
}
var __sfc__$a = vue.defineComponent({
  name: "VarSteps",
  props: props$9,
  setup(props2) {
    var active = vue.computed(() => props2.active);
    var activeColor = vue.computed(() => props2.activeColor);
    var inactiveColor = vue.computed(() => props2.inactiveColor);
    var direction = vue.computed(() => props2.direction);
    var {
      length,
      bindStep
    } = useStep();
    var clickStep = (index) => {
      call(props2.onClickStep, index);
    };
    var stepsProvider = {
      active,
      length,
      direction,
      activeColor,
      inactiveColor,
      clickStep
    };
    bindStep(stepsProvider);
    return {
      n: n$a
    };
  }
});
__sfc__$a.render = __render__$9;
const Steps = __sfc__$a;
Steps.install = function(app) {
  app.component(Steps.name, Steps);
};
var _StepsComponent = Steps;
var props$8 = {
  styleVars: {
    type: Object,
    default: () => ({})
  },
  tag: {
    type: String,
    default: "div"
  }
};
var {
  n: n$9
} = createNamespace("style-provider");
var __sfc__$9 = vue.defineComponent({
  name: "VarStyleProvider",
  props: props$8,
  setup(props2, _ref) {
    var {
      slots
    } = _ref;
    return () => vue.h(props2.tag, {
      class: n$9(),
      style: formatStyleVars(props2.styleVars)
    }, call(slots.default));
  }
});
const VarStyleProvider = __sfc__$9;
var mountedVarKeys = [];
function StyleProvider(styleVars) {
  mountedVarKeys.forEach((key) => document.documentElement.style.removeProperty(key));
  mountedVarKeys.length = 0;
  var styles = formatStyleVars(styleVars != null ? styleVars : {});
  Object.entries(styles).forEach((_ref) => {
    var [key, value] = _ref;
    document.documentElement.style.setProperty(key, value);
    mountedVarKeys.push(key);
  });
}
StyleProvider.Component = VarStyleProvider;
VarStyleProvider.install = function(app) {
  app.component(VarStyleProvider.name, VarStyleProvider);
};
StyleProvider.install = function(app) {
  app.component(VarStyleProvider.name, VarStyleProvider);
};
var _StyleProviderComponent = VarStyleProvider;
var props$7 = {
  modelValue: {
    default: false
  },
  activeValue: {
    default: true
  },
  inactiveValue: {
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  color: {
    type: String
  },
  loadingColor: {
    type: String
  },
  closeColor: {
    type: String
  },
  size: {
    type: [String, Number]
  },
  rules: {
    type: Array
  },
  ripple: {
    type: Boolean,
    default: true
  },
  onClick: defineListenerProp(),
  onChange: defineListenerProp(),
  "onUpdate:modelValue": defineListenerProp()
};
var {
  n: n$8,
  classes: classes$7
} = createNamespace("switch");
function __render__$8(_ctx, _cache) {
  var _component_var_loading = vue.resolveComponent("var-loading");
  var _component_var_hover_overlay = vue.resolveComponent("var-hover-overlay");
  var _component_var_form_details = vue.resolveComponent("var-form-details");
  var _directive_ripple = vue.resolveDirective("ripple");
  var _directive_hover = vue.resolveDirective("hover");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n())
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.classes(_ctx.n("block"), [_ctx.disabled || _ctx.formDisabled, _ctx.n("--disabled")])),
        onClick: _cache[0] || (_cache[0] = function() {
          return _ctx.switchActive && _ctx.switchActive(...arguments);
        }),
        style: vue.normalizeStyle(_ctx.styleComputed.switch)
      },
      [vue.createElementVNode(
        "div",
        {
          style: vue.normalizeStyle(_ctx.styleComputed.track),
          class: vue.normalizeClass(_ctx.classes(_ctx.n("track"), [_ctx.modelValue === _ctx.activeValue, _ctx.n("track--active")], [_ctx.errorMessage, _ctx.n("track--error")]))
        },
        null,
        6
        /* CLASS, STYLE */
      ), vue.withDirectives((vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(_ctx.classes(_ctx.n("ripple"), [_ctx.modelValue === _ctx.activeValue, _ctx.n("ripple--active")])),
          style: vue.normalizeStyle(_ctx.styleComputed.ripple)
        },
        [vue.createElementVNode(
          "div",
          {
            style: vue.normalizeStyle(_ctx.styleComputed.handle),
            class: vue.normalizeClass(_ctx.classes(_ctx.n("handle"), _ctx.n("$-elevation--2"), [_ctx.modelValue === _ctx.activeValue, _ctx.n("handle--active")], [_ctx.errorMessage, _ctx.n("handle--error")]))
          },
          [_ctx.loading ? (vue.openBlock(), vue.createBlock(_component_var_loading, {
            key: 0,
            radius: _ctx.radius,
            color: "currentColor"
          }, null, 8, ["radius"])) : vue.createCommentVNode("v-if", true)],
          6
          /* CLASS, STYLE */
        ), vue.createVNode(_component_var_hover_overlay, {
          hovering: _ctx.hovering
        }, null, 8, ["hovering"])],
        6
        /* CLASS, STYLE */
      )), [[_directive_ripple, {
        disabled: !_ctx.ripple || _ctx.disabled || _ctx.loading || _ctx.formDisabled
      }]])],
      6
      /* CLASS, STYLE */
    ), vue.createVNode(_component_var_form_details, {
      "error-message": _ctx.errorMessage
    }, null, 8, ["error-message"])],
    2
    /* CLASS */
  )), [[_directive_hover, _ctx.hover, "desktop"]]);
}
var __sfc__$8 = vue.defineComponent({
  name: "VarSwitch",
  components: {
    VarLoading: Loading,
    VarFormDetails: FormDetails,
    VarHoverOverlay: HoverOverlay
  },
  directives: {
    Ripple: Ripple$1,
    Hover: Hover$1
  },
  props: props$7,
  setup(props2) {
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
      hovering,
      handleHovering
    } = useHoverOverlay();
    var validate = () => v(props2.rules, props2.modelValue);
    var validateWithTrigger = () => vue.nextTick(() => vt(["onChange"], "onChange", props2.rules, props2.modelValue));
    var styleComputed = vue.computed(() => {
      var {
        size,
        modelValue,
        color,
        closeColor,
        loadingColor,
        activeValue
      } = props2;
      return {
        handle: {
          width: multiplySizeUnit(size),
          height: multiplySizeUnit(size),
          backgroundColor: modelValue === activeValue ? color : closeColor,
          color: loadingColor
        },
        ripple: {
          left: modelValue === activeValue ? multiplySizeUnit(size, 0.5) : "-" + multiplySizeUnit(size, 0.5),
          color: modelValue === activeValue ? color : closeColor || "#999",
          width: multiplySizeUnit(size, 2),
          height: multiplySizeUnit(size, 2)
        },
        track: {
          height: multiplySizeUnit(size, 0.72),
          width: multiplySizeUnit(size, 1.9),
          borderRadius: multiplySizeUnit(size, 2 / 3),
          filter: modelValue === activeValue || errorMessage != null && errorMessage.value ? void 0 : "brightness(.6)",
          backgroundColor: modelValue === activeValue ? color : closeColor
        },
        switch: {
          height: multiplySizeUnit(size, 1.2),
          width: multiplySizeUnit(size, 2)
        }
      };
    });
    var radius = vue.computed(() => {
      var {
        size = "5.333vw"
      } = props2;
      return multiplySizeUnit(size, 0.4);
    });
    var switchActive = (event) => {
      var {
        onClick,
        onChange,
        disabled,
        loading: loading2,
        readonly,
        modelValue,
        activeValue,
        inactiveValue,
        "onUpdate:modelValue": updateModelValue
      } = props2;
      call(onClick, event);
      if (disabled || loading2 || readonly || form != null && form.disabled.value || form != null && form.readonly.value)
        return;
      var newValue = modelValue === activeValue ? inactiveValue : activeValue;
      call(onChange, newValue);
      call(updateModelValue, newValue);
      validateWithTrigger();
    };
    var hover = (value) => {
      if (props2.disabled || form != null && form.disabled.value)
        return;
      handleHovering(value);
    };
    var reset = () => {
      call(props2["onUpdate:modelValue"], props2.inactiveValue);
      resetValidation();
    };
    var switchProvider = {
      reset,
      validate,
      resetValidation
    };
    call(bindForm, switchProvider);
    return {
      n: n$8,
      classes: classes$7,
      switchActive,
      hovering,
      hover,
      radius,
      styleComputed,
      errorMessage,
      formDisabled: form == null ? void 0 : form.disabled,
      formReadonly: form == null ? void 0 : form.readonly
    };
  }
});
__sfc__$8.render = __render__$8;
const Switch = __sfc__$8;
Switch.install = function(app) {
  app.component(Switch.name, Switch);
};
var _SwitchComponent = Switch;
var props$6 = {
  name: {
    type: [String, Number]
  },
  disabled: {
    type: Boolean,
    default: false
  },
  onClick: defineListenerProp()
};
var TABS_BIND_TAB_KEY = Symbol("TABS_BIND_TAB_KEY");
function useTabList() {
  var {
    childProviders,
    bindChildren,
    length
  } = useChildren(TABS_BIND_TAB_KEY);
  return {
    length,
    tabList: childProviders,
    bindTabList: bindChildren
  };
}
function useTabs() {
  var {
    parentProvider,
    bindParent,
    index
  } = useParent(TABS_BIND_TAB_KEY);
  if (!bindParent) {
    error$1("Tab", "<var-tab/> must in <var-tabs/>");
  }
  return {
    index,
    tabs: parentProvider,
    bindTabs: bindParent
  };
}
var {
  n: n$7,
  classes: classes$6
} = createNamespace("tab");
function __render__$7(_ctx, _cache) {
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box"), _ctx.computeColorClass(), _ctx.n("--" + _ctx.itemDirection))),
      ref: "tabEl",
      style: vue.normalizeStyle({
        color: _ctx.computeColorStyle()
      }),
      onClick: _cache[0] || (_cache[0] = function() {
        return _ctx.handleClick && _ctx.handleClick(...arguments);
      })
    },
    [vue.renderSlot(_ctx.$slots, "default")],
    6
    /* CLASS, STYLE */
  )), [[_directive_ripple, {
    disabled: _ctx.disabled
  }]]);
}
var __sfc__$7 = vue.defineComponent({
  name: "VarTab",
  directives: {
    Ripple: Ripple$1
  },
  props: props$6,
  setup(props2) {
    var tabEl = vue.ref(null);
    var name = vue.computed(() => props2.name);
    var disabled = vue.computed(() => props2.disabled);
    var element = vue.computed(() => tabEl.value);
    var {
      index,
      tabs: tabs2,
      bindTabs
    } = useTabs();
    var {
      onTabClick,
      active,
      activeColor,
      inactiveColor,
      disabledColor,
      itemDirection,
      resize
    } = tabs2;
    var tabProvider = {
      name,
      index,
      disabled,
      element
    };
    bindTabs(tabProvider);
    var shouldActive = () => {
      if (props2.name != null) {
        return active.value === props2.name;
      }
      return active.value === (index == null ? void 0 : index.value);
    };
    var computeColorStyle = () => {
      return props2.disabled ? disabledColor.value : shouldActive() ? activeColor.value : inactiveColor.value;
    };
    var computeColorClass = () => {
      return props2.disabled ? n$7("$-tab--disabled") : shouldActive() ? n$7("$-tab--active") : n$7("$-tab--inactive");
    };
    var handleClick = (event) => {
      var {
        disabled: disabled2,
        name: name2,
        onClick
      } = props2;
      if (disabled2) {
        return;
      }
      call(onClick, name2 != null ? name2 : index.value, event);
      onTabClick(tabProvider);
    };
    vue.watch(() => props2.name, resize);
    vue.watch(() => props2.disabled, resize);
    return {
      n: n$7,
      classes: classes$6,
      tabEl,
      active,
      activeColor,
      inactiveColor,
      itemDirection,
      computeColorStyle,
      computeColorClass,
      handleClick
    };
  }
});
__sfc__$7.render = __render__$7;
const Tab = __sfc__$7;
Tab.install = function(app) {
  app.component(Tab.name, Tab);
};
var _TabComponent = Tab;
var TABS_ITEMS_BIND_TAB_ITEM_KEY = Symbol("TABS_ITEMS_BIND_TAB_ITEM_KEY");
function useTabItem() {
  var {
    bindChildren,
    childProviders,
    length
  } = useChildren(TABS_ITEMS_BIND_TAB_ITEM_KEY);
  return {
    length,
    tabItemList: childProviders,
    bindTabItem: bindChildren
  };
}
function useTabsItems() {
  var {
    parentProvider,
    bindParent,
    index
  } = useParent(TABS_ITEMS_BIND_TAB_ITEM_KEY);
  if (!bindParent) {
    error$1("TabItem", "<var-tab-item/> must in <var-tabs-items/>");
  }
  return {
    index,
    tabsItems: parentProvider,
    bindTabsItems: bindParent
  };
}
var props$5 = {
  name: {
    type: [String, Number]
  }
};
var {
  n: n$6,
  classes: classes$5
} = createNamespace("tab-item");
function __render__$6(_ctx, _cache) {
  var _component_var_swipe_item = vue.resolveComponent("var-swipe-item");
  return vue.openBlock(), vue.createBlock(_component_var_swipe_item, {
    class: vue.normalizeClass(_ctx.classes(_ctx.n(), [!_ctx.current, _ctx.n("--inactive")])),
    "var-tab-item-cover": ""
  }, {
    default: vue.withCtx(() => [_ctx.initSlot ? vue.renderSlot(_ctx.$slots, "default", {
      key: 0
    }) : vue.createCommentVNode("v-if", true)]),
    _: 3
    /* FORWARDED */
  }, 8, ["class"]);
}
var __sfc__$6 = vue.defineComponent({
  name: "VarTabItem",
  components: {
    VarSwipeItem: SwipeItem
  },
  props: props$5,
  setup(props2) {
    var current = vue.ref(false);
    var initSlot = vue.ref(false);
    var name = vue.computed(() => props2.name);
    var {
      index,
      bindTabsItems
    } = useTabsItems();
    var setCurrent = (value) => {
      if (!initSlot.value && value) {
        initSlot.value = true;
      }
      current.value = value;
    };
    var tabItemProvider = {
      index,
      name,
      setCurrent
    };
    bindTabsItems(tabItemProvider);
    return {
      n: n$6,
      classes: classes$5,
      current,
      initSlot
    };
  }
});
__sfc__$6.render = __render__$6;
const TabItem = __sfc__$6;
TabItem.install = function(app) {
  app.component(TabItem.name, TabItem);
};
var _TabItemComponent = TabItem;
var props$4 = {
  fullWidth: {
    type: [Number, String],
    default: "100%"
  },
  elevation: {
    type: [Boolean, Number, String],
    default: true
  }
};
var {
  n: n$5,
  classes: classes$4
} = createNamespace("table");
function __render__$5(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.formatElevation(_ctx.elevation, 1), _ctx.n("$--box")))
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("main"))
      },
      [vue.createElementVNode(
        "table",
        {
          class: vue.normalizeClass(_ctx.n("table")),
          style: vue.normalizeStyle({
            width: _ctx.toSizeUnit(_ctx.fullWidth)
          })
        },
        [vue.renderSlot(_ctx.$slots, "default")],
        6
        /* CLASS, STYLE */
      )],
      2
      /* CLASS */
    ), _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 0,
        class: vue.normalizeClass(_ctx.n("footer"))
      },
      [vue.renderSlot(_ctx.$slots, "footer")],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true)],
    2
    /* CLASS */
  );
}
var __sfc__$5 = vue.defineComponent({
  name: "VarTable",
  props: props$4,
  setup() {
    return {
      toSizeUnit,
      n: n$5,
      classes: classes$4,
      formatElevation
    };
  }
});
__sfc__$5.render = __render__$5;
const Table = __sfc__$5;
Table.install = function(app) {
  app.component(Table.name, Table);
};
var _TableComponent = Table;
function directionValidator(direction) {
  return ["horizontal", "vertical"].includes(direction);
}
function scrollableValidator(scrollable) {
  return ["auto", "always"].includes(scrollable);
}
function indicatorPositionValidator(indicatorPosition) {
  return ["normal", "reverse"].includes(indicatorPosition);
}
var props$3 = {
  active: {
    type: [String, Number],
    default: 0
  },
  layoutDirection: {
    type: String,
    default: "horizontal",
    validator: directionValidator
  },
  itemDirection: {
    type: String,
    default: "horizontal",
    validator: directionValidator
  },
  fixedBottom: {
    type: Boolean,
    default: false
  },
  activeColor: {
    type: String
  },
  inactiveColor: {
    type: String
  },
  disabledColor: {
    type: String
  },
  color: {
    type: String
  },
  indicatorColor: {
    type: String
  },
  indicatorSize: {
    type: [String, Number]
  },
  elevation: {
    type: [Boolean, String, Number],
    default: false
  },
  scrollable: {
    type: String,
    default: "auto",
    validator: scrollableValidator
  },
  indicatorPosition: {
    type: String,
    default: "normal",
    validator: indicatorPositionValidator
  },
  safeArea: {
    type: Boolean,
    default: false
  },
  sticky: {
    type: Boolean,
    default: false
  },
  stickyCssMode: pickProps(props$A, "cssMode"),
  stickyZIndex: pickProps(props$A, "zIndex"),
  offsetTop: pickProps(props$A, "offsetTop"),
  onClick: defineListenerProp(),
  onChange: defineListenerProp(),
  "onUpdate:active": defineListenerProp()
};
function asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error2) {
    reject(error2);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator$2(fn2) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn2.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
var {
  n: n$4,
  classes: classes$3
} = createNamespace("tabs");
function __render__$4(_ctx, _cache) {
  return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.sticky ? _ctx.n("$-sticky") : _ctx.Transition), {
    ref: _ctx.sticky ? "stickyComponent" : void 0,
    "css-mode": _ctx.sticky ? _ctx.stickyCssMode : void 0,
    "offset-top": _ctx.sticky ? _ctx.offsetTop : void 0,
    "z-index": _ctx.sticky ? _ctx.stickyZIndex : void 0
  }, {
    default: vue.withCtx(() => [vue.createElementVNode(
      "div",
      vue.mergeProps({
        class: _ctx.classes(_ctx.n(), _ctx.n("$--box"), _ctx.n("--item-" + _ctx.itemDirection), _ctx.n("--layout-" + _ctx.layoutDirection + "-padding"), _ctx.formatElevation(_ctx.elevation, 4), [_ctx.fixedBottom, _ctx.n("--fixed-bottom")], [_ctx.safeArea, _ctx.n("--safe-area")]),
        style: {
          background: _ctx.color
        }
      }, _ctx.$attrs),
      [vue.createElementVNode(
        "div",
        {
          ref: "scrollerEl",
          class: vue.normalizeClass(_ctx.classes(_ctx.n("tab-wrap"), [_ctx.localScrollable, _ctx.n("--layout-" + _ctx.layoutDirection + "-scrollable")], _ctx.n("--layout-" + _ctx.layoutDirection)))
        },
        [vue.renderSlot(_ctx.$slots, "default"), vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass(_ctx.classes(_ctx.n("indicator"), _ctx.n("--layout-" + _ctx.layoutDirection + _ctx.indicatorPosition + "-indicator"))),
            style: vue.normalizeStyle({
              width: _ctx.layoutDirection === "horizontal" ? _ctx.indicatorWidth : _ctx.toSizeUnit(_ctx.indicatorSize),
              height: _ctx.layoutDirection === "horizontal" ? _ctx.toSizeUnit(_ctx.indicatorSize) : _ctx.indicatorHeight,
              transform: _ctx.layoutDirection === "horizontal" ? "translateX(" + _ctx.indicatorX + ")" : "translateY(" + _ctx.indicatorY + ")"
            })
          },
          [vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(_ctx.classes(_ctx.n("indicator-inner"), _ctx.n("--layout-" + _ctx.layoutDirection + "-indicator-inner"))),
              style: vue.normalizeStyle({
                background: _ctx.indicatorColor || _ctx.activeColor
              })
            },
            null,
            6
            /* CLASS, STYLE */
          )],
          6
          /* CLASS, STYLE */
        )],
        2
        /* CLASS */
      )],
      16
      /* FULL_PROPS */
    )]),
    _: 3
    /* FORWARDED */
  }, 8, ["css-mode", "offset-top", "z-index"]);
}
var __sfc__$4 = vue.defineComponent({
  name: "VarTabs",
  components: {
    VarSticky: Sticky
  },
  inheritAttrs: false,
  props: props$3,
  setup(props2) {
    var indicatorWidth = vue.ref("0px");
    var indicatorHeight = vue.ref("0px");
    var indicatorX = vue.ref("0px");
    var indicatorY = vue.ref("0px");
    var localScrollable = vue.ref(false);
    var scrollerEl = vue.ref(null);
    var active = vue.computed(() => props2.active);
    var indicatorPosition = vue.computed(() => props2.indicatorPosition === "reverse" ? "-reverse" : "");
    var activeColor = vue.computed(() => props2.activeColor);
    var inactiveColor = vue.computed(() => props2.inactiveColor);
    var disabledColor = vue.computed(() => props2.disabledColor);
    var itemDirection = vue.computed(() => props2.itemDirection);
    var stickyComponent = vue.ref(null);
    var {
      tabList,
      bindTabList,
      length
    } = useTabList();
    var onTabClick = (tab2) => {
      var _tab$name$value;
      var currentActive = (_tab$name$value = tab2.name.value) != null ? _tab$name$value : tab2.index.value;
      var {
        active: active2,
        onChange,
        onClick
      } = props2;
      call(props2["onUpdate:active"], currentActive);
      call(onClick, currentActive);
      currentActive !== active2 && call(onChange, currentActive);
    };
    var matchName = () => {
      return tabList.find((_ref) => {
        var {
          name
        } = _ref;
        return props2.active === name.value;
      });
    };
    var matchIndex = (activeIndex) => {
      return tabList.find((_ref2) => {
        var {
          index
        } = _ref2;
        return (activeIndex != null ? activeIndex : props2.active) === index.value;
      });
    };
    var matchBoundary = () => {
      if (length.value === 0) {
        return;
      }
      var {
        active: active2
      } = props2;
      if (isNumber(active2)) {
        var activeIndex = active2 > length.value - 1 ? length.value - 1 : 0;
        call(props2["onUpdate:active"], activeIndex);
        return matchIndex(activeIndex);
      }
    };
    var watchScrollable = () => {
      localScrollable.value = props2.scrollable === "always" || tabList.length >= 5;
    };
    var moveIndicator = (_ref3) => {
      var {
        element
      } = _ref3;
      var el = element.value;
      if (!el)
        return;
      if (props2.layoutDirection === "horizontal") {
        indicatorWidth.value = el.offsetWidth + "px";
        indicatorX.value = el.offsetLeft + "px";
      } else {
        indicatorHeight.value = el.offsetHeight + "px";
        indicatorY.value = el.offsetTop + "px";
      }
    };
    var scrollToCenter = (_ref4) => {
      var {
        element
      } = _ref4;
      if (!localScrollable.value) {
        return;
      }
      var scroller = scrollerEl.value;
      var el = element.value;
      if (props2.layoutDirection === "horizontal") {
        var left2 = el.offsetLeft + el.offsetWidth / 2 - scroller.offsetWidth / 2;
        scrollTo(scroller, {
          left: left2,
          animation: linear
        });
      } else {
        var top2 = el.offsetTop + el.offsetHeight / 2 - scroller.offsetHeight / 2;
        scrollTo(scroller, {
          top: top2,
          animation: linear
        });
      }
    };
    var resize = () => {
      var tab2 = matchName() || matchIndex() || matchBoundary();
      if (!tab2 || tab2.disabled.value) {
        return;
      }
      watchScrollable();
      moveIndicator(tab2);
      scrollToCenter(tab2);
    };
    var resizeSticky = /* @__PURE__ */ function() {
      var _ref5 = _asyncToGenerator$2(function* () {
        if (props2.sticky && stickyComponent.value) {
          yield stickyComponent.value.resize();
        }
      });
      return function resizeSticky2() {
        return _ref5.apply(this, arguments);
      };
    }();
    var tabsProvider = {
      active,
      activeColor,
      inactiveColor,
      disabledColor,
      itemDirection,
      resize,
      onTabClick
    };
    bindTabList(tabsProvider);
    vue.watch(() => length.value, /* @__PURE__ */ _asyncToGenerator$2(function* () {
      yield doubleRaf();
      resize();
    }));
    vue.watch(() => props2.active, resize);
    vue.watch(() => props2.scrollable, resize);
    useEventListener(window, "resize", resize);
    vue.onActivated(resize);
    return {
      stickyComponent,
      indicatorWidth,
      indicatorHeight,
      indicatorX,
      indicatorY,
      indicatorPosition,
      localScrollable,
      scrollerEl,
      Transition: vue.Transition,
      toSizeUnit,
      n: n$4,
      classes: classes$3,
      resize,
      resizeSticky,
      formatElevation
    };
  }
});
__sfc__$4.render = __render__$4;
const Tabs = __sfc__$4;
Tabs.install = function(app) {
  app.component(Tabs.name, Tabs);
};
var _TabsComponent = Tabs;
var props$2 = {
  active: {
    type: [String, Number],
    default: 0
  },
  canSwipe: {
    type: Boolean,
    default: true
  },
  loop: {
    type: Boolean,
    default: false
  },
  "onUpdate:active": defineListenerProp()
};
function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error2) {
    reject(error2);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator$1(fn2) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn2.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
var {
  n: n$3
} = createNamespace("tabs-items");
function __render__$3(_ctx, _cache) {
  var _component_var_swipe = vue.resolveComponent("var-swipe");
  return vue.openBlock(), vue.createBlock(_component_var_swipe, {
    class: vue.normalizeClass(_ctx.n()),
    ref: "swipe",
    loop: _ctx.loop,
    touchable: _ctx.canSwipe,
    indicator: false,
    onChange: _ctx.handleSwipeChange
  }, {
    default: vue.withCtx(() => [vue.renderSlot(_ctx.$slots, "default")]),
    _: 3
    /* FORWARDED */
  }, 8, ["class", "loop", "touchable", "onChange"]);
}
var __sfc__$3 = vue.defineComponent({
  name: "VarTabsItems",
  components: {
    VarSwipe: Swipe
  },
  props: props$2,
  setup(props2) {
    var swipe2 = vue.ref(null);
    var {
      tabItemList,
      bindTabItem,
      length
    } = useTabItem();
    var matchName = (active) => {
      return tabItemList.find((_ref) => {
        var {
          name
        } = _ref;
        return active === name.value;
      });
    };
    var matchIndex = (active) => {
      return tabItemList.find((_ref2) => {
        var {
          index
        } = _ref2;
        return active === index.value;
      });
    };
    var matchActive = (active) => {
      return matchName(active) || matchIndex(active);
    };
    var handleActiveChange = (newValue) => {
      var _swipe$value;
      var newActiveTabItemProvider = matchActive(newValue);
      if (!newActiveTabItemProvider) {
        return;
      }
      tabItemList.forEach((_ref3) => {
        var {
          setCurrent
        } = _ref3;
        return setCurrent(false);
      });
      newActiveTabItemProvider.setCurrent(true);
      (_swipe$value = swipe2.value) == null ? void 0 : _swipe$value.to(newActiveTabItemProvider.index.value);
    };
    var handleSwipeChange = (currentIndex) => {
      var _tabItem$name$value;
      var tabItem2 = tabItemList.find((_ref4) => {
        var {
          index
        } = _ref4;
        return index.value === currentIndex;
      });
      var active = (_tabItem$name$value = tabItem2.name.value) != null ? _tabItem$name$value : tabItem2.index.value;
      call(props2["onUpdate:active"], active);
    };
    var getSwipe = () => {
      return swipe2.value;
    };
    var tabsItemsProvider = {};
    bindTabItem(tabsItemsProvider);
    vue.watch(() => props2.active, handleActiveChange);
    vue.watch(() => length.value, /* @__PURE__ */ _asyncToGenerator$1(function* () {
      yield doubleRaf();
      handleActiveChange(props2.active);
    }));
    return {
      swipe: swipe2,
      n: n$3,
      handleSwipeChange,
      getSwipe
    };
  }
});
__sfc__$3.render = __render__$3;
const TabsItems = __sfc__$3;
TabsItems.install = function(app) {
  app.component(TabsItems.name, TabsItems);
};
var _TabsItemsComponent = TabsItems;
const actionSheet$1 = {
  "--action-sheet-background": "#1e1e1e",
  "--action-sheet-title-color": "#aaa",
  "--action-sheet-action-item-color": "#fff"
};
const badge$1 = {
  "--badge-default-color": "#555"
};
const button$1 = {
  "--button-default-color": "#303030"
};
const card$1 = {
  "--card-background": "#303030",
  "--card-title-color": "#ffffff",
  "--card-outline-color": "rgba(255, 255, 255, 0.2)",
  "--card-subtitle-color": "#aaaaaa",
  "--card-description-color": "#aaaaaa"
};
const cell$1 = {
  "--cell-description-color": "#aaa",
  "--cell-border-color": "#545454"
};
const checkbox$1 = {
  "--checkbox-unchecked-color": "#fff"
};
const chip$1 = {
  "--chip-default-color": "#555"
};
const collapse = {
  "--collapse-background": "#303030",
  "--collapse-text-color": "#fff",
  "--collapse-border-top": "thin solid rgba(255, 255, 255, 0.12)"
};
const datePicker$1 = {
  "--date-picker-main-color": "#fff",
  "--date-picker-body-background-color": "#303030",
  "--day-picker-head-item-color": "#aaaaaa"
};
const dialog$1 = {
  "--dialog-background": "#1e1e1e",
  "--dialog-message-color": "#bbb"
};
const divider$1 = {
  "--divider-color": "rgba(255, 255, 255, 0.2)",
  "--divider-text-color": "#aaa"
};
const input$1 = {
  "--input-input-text-color": "#fff",
  "--input-blur-color": "rgb(255, 255, 255, .7)"
};
const pagination$1 = {
  "--pagination-list-bg-color": "#303030",
  "--pagination-hover-bg-color": "#25293a",
  "--pagination-list-active-bg-color": "#25293a",
  "--pagination-list-active-color": "#4a7afe",
  "--pagination-item-background": "#303030"
};
const picker$1 = {
  "--picker-background": "#1e1e1e",
  "--picker-cancel-button-text-color": "#aaa",
  "--picker-picked-border": "1px solid rgba(255, 255, 255, 0.12)",
  "--picker-mask-background-image": "linear-gradient(180deg, hsla(0, 0%, 12%, 0.9), hsla(0, 0%, 12%, 0.4)), linear-gradient(0deg, hsla(0, 0%, 12%, 0.9), hsla(0, 0%, 12%, 0.4))"
};
const popup$1 = {
  "--popup-content-background-color": "#1e1e1e"
};
const pullRefresh$1 = {
  "--pull-refresh-background": "#303030"
};
const radio$1 = {
  "--radio-unchecked-color": "#fff"
};
const result$1 = {
  "--result-background": "#303030",
  "--result-title-color": "#ffffff",
  "--result-description-color": "#aaaaaa",
  "--result-question-color": "#7f8e96",
  "--result-question-border-color": "rgba(151,194,216,0.3)",
  "--result-empty-color": "#adadad",
  "--result-empty-border-color": "rgba(232,229,229,0.3)"
};
const select$1 = {
  "--select-select-text-color": "#fff",
  "--select-blur-color": "rgb(255, 255, 255, .7)",
  "--select-scroller-background": "#303030"
};
const skeleton$1 = {
  "--skeleton-card-background-color": "hsla(0,0%,100%,.12)",
  "--skeleton-animation-background": "linear-gradient(\n        90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.05),hsla(0,0%,100%,0))\n      ",
  "--skeleton-avatar-background-color": "hsla(0,0%,100%,.12)",
  "--skeleton-title-background-color": "hsla(0,0%,100%,.12)"
};
const steps = {
  "--step-content-color": "rgba(255, 255, 255, .38)",
  "--step-content-active-color": "#fff",
  "--step-line-background": "#fff"
};
const switchThemes = {
  "--switch-track-background": "#727272",
  "--switch-handle-background": "#727272"
};
const tab$1 = {
  "--tab-inactive-color": "rgba(255, 255, 255, .65)"
};
const table$1 = {
  "--table-background": "#303030",
  "--table-thead-th-text-color": "rgba(255, 255, 255, 0.6)",
  "--table-tbody-tr-hover-background": "#4c4b4b",
  "--table-thead-border-bottom": "thin solid rgba(255, 255, 255, 0.12)",
  "--table-tbody-tr-border-bottom": "thin solid rgba(255, 255, 255, 0.12)",
  "--table-footer-border-top": "thin solid rgba(255, 255, 255, 0.12)"
};
const timePicker$1 = {
  "--time-picker-clock-container-background": "#545454",
  "--time-picker-body-background": "#303030",
  "--time-picker-clock-item-disable-color": "#aaaaaa"
};
const uploader$1 = {
  "--uploader-action-background": "#303030",
  "--uploader-action-icon-color": "#fff",
  "--uploader-file-name-background": "#303030",
  "--uploader-file-name-color": "#aaa",
  "--uploader-file-cover-background": "#303030"
};
const tabs$1 = {
  "--tabs-background": "#1e1e1e"
};
const appBar$1 = {
  "--app-bar-color": "#272727"
};
const bottomNavigation$1 = {
  "--bottom-navigation-background-color": "#272727",
  "--bottom-navigation-border-color": "#444"
};
const bottomNavigationItem$1 = {
  "--bottom-navigation-item-active-background-color": "#272727"
};
const menu$1 = {
  "--menu-background-color": "#272727"
};
const breadcrumb$1 = {
  "--breadcrumb-inactive-color": "#aaa"
};
const paper$1 = {
  "--paper-background": "#303030"
};
const avatar$1 = {
  "--avatar-background-color": "#303030",
  "--avatar-border": "2px solid #1e1e1e"
};
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
const dark = _extends({
  // common
  "--color-body": "#1e1e1e",
  "--color-text": "#fff",
  "--color-primary": "#4a7afe",
  "--color-info": "#10afef",
  "--color-success": "#10c48f",
  "--color-warning": "#ff8800",
  "--color-danger": "#ef5350",
  "--color-disabled": "#404040",
  "--color-text-disabled": "#757575"
}, button$1, cell$1, card$1, timePicker$1, datePicker$1, skeleton$1, tabs$1, tab$1, popup$1, dialog$1, actionSheet$1, chip$1, badge$1, uploader$1, collapse, pullRefresh$1, switchThemes, steps, pagination$1, table$1, input$1, select$1, radio$1, checkbox$1, divider$1, picker$1, appBar$1, bottomNavigation$1, bottomNavigationItem$1, menu$1, result$1, breadcrumb$1, paper$1, avatar$1);
var Themes = {
  dark
};
var _ThemesComponent = null;
const Themes$1 = Themes;
var hoursAmpm = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
var hours24 = ["00", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
var minSec = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
function formatValidator(type) {
  return ["ampm", "24hr"].includes(type);
}
var props$1 = {
  modelValue: {
    type: String
  },
  elevation: {
    type: [Boolean, Number, String],
    default: false
  },
  color: {
    type: String
  },
  headerColor: {
    type: String
  },
  format: {
    type: String,
    default: "ampm",
    validator: formatValidator
  },
  allowedTime: {
    type: Object
  },
  min: {
    type: String
  },
  max: {
    type: String
  },
  useSeconds: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  "onUpdate:modelValue": defineListenerProp(),
  onChange: defineListenerProp()
};
var notConvert = (format2, ampm) => format2 === "24hr" || ampm === "am";
var convertHour = (format2, ampm, hour) => {
  var index = hoursAmpm.findIndex((hourAmpm) => toNumber(hourAmpm) === toNumber(hour));
  var getHour = notConvert(format2, ampm) ? hour : hours24[index];
  return {
    hourStr: getHour,
    hourNum: toNumber(getHour)
  };
};
var getNumberTime = (time) => {
  var [hour, minute, second] = time.split(":");
  return {
    hour: toNumber(hour),
    minute: toNumber(minute),
    second: toNumber(second)
  };
};
var getIsDisableMinute = (values) => {
  var _values$allowedTime, _values$allowedTime2;
  var {
    time,
    format: format2,
    ampm,
    hour,
    max: max2,
    min: min2,
    disableHour
  } = values;
  var {
    hourStr,
    hourNum
  } = convertHour(format2, ampm, hour);
  var isBetweenMinMax = false;
  var isAllow = false;
  if (disableHour.includes(hourStr))
    return true;
  if (max2 && !min2) {
    var {
      hour: maxHour,
      minute: maxMinute
    } = getNumberTime(max2);
    isBetweenMinMax = maxHour === hourNum && time > maxMinute;
  }
  if (!max2 && min2) {
    var {
      hour: minHour,
      minute: minMinute
    } = getNumberTime(min2);
    isBetweenMinMax = minHour === hourNum && time < minMinute;
  }
  if (max2 && min2) {
    var {
      hour: _maxHour,
      minute: _maxMinute
    } = getNumberTime(max2);
    var {
      hour: _minHour,
      minute: _minMinute
    } = getNumberTime(min2);
    isBetweenMinMax = _minHour === hourNum && time < _minMinute || _maxHour === hourNum && time > _maxMinute;
  }
  if ((_values$allowedTime = values.allowedTime) != null && _values$allowedTime.minutes)
    isAllow = (_values$allowedTime2 = values.allowedTime) == null ? void 0 : _values$allowedTime2.minutes(time);
  return isBetweenMinMax || isAllow;
};
var getIsDisableSecond = (values) => {
  var _values$allowedTime3, _values$allowedTime4;
  var {
    time,
    format: format2,
    ampm,
    hour,
    minute,
    max: max2,
    min: min2,
    disableHour
  } = values;
  var {
    hourStr,
    hourNum
  } = convertHour(format2, ampm, hour);
  var isBetweenMinMax = false;
  var isAllow = false;
  if (disableHour.includes(hourStr))
    return true;
  if (max2 && !min2) {
    var {
      hour: maxHour,
      minute: maxMinute,
      second: maxSecond
    } = getNumberTime(max2);
    isBetweenMinMax = maxHour === hourNum && maxMinute < minute || maxMinute === minute && time > maxSecond;
  }
  if (!max2 && min2) {
    var {
      hour: minHour,
      minute: minMinute,
      second: minSecond
    } = getNumberTime(min2);
    isBetweenMinMax = minHour === hourNum && minMinute > minute || minMinute === minute && time > minSecond;
  }
  if (max2 && min2) {
    var {
      hour: _maxHour2,
      minute: _maxMinute2,
      second: _maxSecond
    } = getNumberTime(max2);
    var {
      hour: _minHour2,
      minute: _minMinute2,
      second: _minSecond
    } = getNumberTime(min2);
    isBetweenMinMax = _maxHour2 === hourNum && _maxMinute2 < minute || _minHour2 === hourNum && _minMinute2 > minute || _maxHour2 === hourNum && _maxMinute2 === minute && time > _maxSecond || _minHour2 === hourNum && _minMinute2 === minute && time < _minSecond;
  }
  if ((_values$allowedTime3 = values.allowedTime) != null && _values$allowedTime3.seconds)
    isAllow = (_values$allowedTime4 = values.allowedTime) == null ? void 0 : _values$allowedTime4.seconds(time);
  return isBetweenMinMax || isAllow;
};
var {
  n: n$2,
  classes: classes$2
} = createNamespace("time-picker");
function __render__$2(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.n("clock"))
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("clock-hand")),
        style: vue.normalizeStyle(_ctx.handStyle)
      },
      null,
      6
      /* CLASS, STYLE */
    ), (vue.openBlock(true), vue.createElementBlock(
      vue.Fragment,
      null,
      vue.renderList(_ctx.timeScales, (timeScale, index) => {
        return vue.openBlock(), vue.createElementBlock(
          "div",
          {
            class: vue.normalizeClass(_ctx.classes(_ctx.n("clock-item"), [_ctx.isActive(index, false), _ctx.n("clock-item--active")], [_ctx.isDisable(timeScale), _ctx.n("clock-item--disable")])),
            key: timeScale,
            style: vue.normalizeStyle(_ctx.getStyle(index, timeScale, false))
          },
          vue.toDisplayString(timeScale),
          7
          /* TEXT, CLASS, STYLE */
        );
      }),
      128
      /* KEYED_FRAGMENT */
    )), _ctx.format === "24hr" && _ctx.type === "hour" ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 0,
        class: vue.normalizeClass(_ctx.n("clock-inner")),
        ref: "inner"
      },
      [(vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList(_ctx.hours24, (hour, index) => {
          return vue.openBlock(), vue.createElementBlock(
            "div",
            {
              class: vue.normalizeClass(_ctx.classes(_ctx.n("clock-item"), [_ctx.isActive(index, true), _ctx.n("clock-item--active")], [_ctx.isDisable(hour), _ctx.n("clock-item--disable")])),
              key: hour,
              style: vue.normalizeStyle(_ctx.getStyle(index, hour, true))
            },
            vue.toDisplayString(hour),
            7
            /* TEXT, CLASS, STYLE */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      ))],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true)],
    2
    /* CLASS */
  );
}
var __sfc__$2 = vue.defineComponent({
  name: "Clock",
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
      default: "ampm"
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
      default: "hour"
    },
    ampm: {
      type: String,
      default: "am"
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
  emits: ["update", "change-prevent-update"],
  setup(props2, _ref) {
    var {
      emit
    } = _ref;
    var inner = vue.ref(null);
    var disableHour = vue.ref([]);
    var disable24HourIndex = vue.ref([]);
    var handStyle = vue.computed(() => ({
      transform: "rotate(" + toNumber(props2.rad) + "deg)",
      height: props2.isInner && props2.type === "hour" ? "calc(50% - 40px)" : "calc(50% - 4px)",
      backgroundColor: getHandleColor(),
      borderColor: getHandleColor()
    }));
    var activeItemIndex = vue.computed(() => {
      if (props2.rad === void 0)
        return;
      var value = props2.rad / 30;
      return value >= 0 ? value : value + 12;
    });
    var timeScales = vue.computed(() => {
      if (props2.type === "hour")
        return hoursAmpm;
      return minSec;
    });
    var isDisableMinSec = (time, isDisable2) => {
      var _time;
      time = (_time = time) != null ? _time : props2.type === "minute" ? props2.time.minute : props2.time.second;
      var disableMethod = props2.type === "minute" ? getIsDisableMinute : getIsDisableSecond;
      var values = {
        time: toNumber(time),
        format: props2.format,
        ampm: props2.ampm,
        hour: props2.time.hour,
        minute: toNumber(props2.time.minute),
        max: props2.max,
        min: props2.min,
        allowedTime: props2.allowedTime,
        disableHour: disableHour.value
      };
      if (isDisable2 && props2.type === "minute")
        Reflect.deleteProperty(values, "minute");
      return disableMethod(values);
    };
    var getHandleColor = () => {
      if (activeItemIndex.value === void 0)
        return props2.color;
      var hour = props2.isInner ? hours24[activeItemIndex.value] : timeScales.value[activeItemIndex.value];
      if (timeScales.value === minSec) {
        return isDisableMinSec() ? "#bdbdbd" : props2.color;
      }
      return isDisable(hour) ? "#bdbdbd" : props2.color;
    };
    var isActive = (index, inner2) => {
      if (inner2)
        return activeItemIndex.value === index && props2.isInner;
      return activeItemIndex.value === index && (!props2.isInner || props2.type !== "hour");
    };
    var isDisable = (time) => {
      if (props2.type === "hour") {
        if (notConvert(props2.format, props2.ampm))
          return disableHour.value.includes(time);
        var timeIndex = hoursAmpm.findIndex((hour) => hour === time);
        return disable24HourIndex.value.includes(timeIndex);
      }
      return isDisableMinSec(time, true);
    };
    var getStyle2 = (index, hour, inner2) => {
      var rad = 2 * Math.PI / 12 * index - Math.PI / 2;
      var left2 = 50 * (1 + Math.cos(rad));
      var top2 = 50 * (1 + Math.sin(rad));
      var computedColor = () => {
        if (!isActive(index, inner2)) {
          return {
            backgroundColor: void 0,
            color: void 0
          };
        }
        if (isDisable(hour)) {
          return {
            backgroundColor: "#bdbdbd",
            color: "#fff"
          };
        }
        return {
          backgroundColor: props2.color,
          color: void 0
        };
      };
      var {
        backgroundColor,
        color
      } = computedColor();
      return {
        left: left2 + "%",
        top: top2 + "%",
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
      if (activeItemIndex.value === void 0)
        return void 0;
      var hours = props2.ampm === "am" ? hoursAmpm : hours24;
      return padStart$1(hours[activeItemIndex.value], 2, "0");
    };
    vue.watch([activeItemIndex, () => props2.isInner], (_ref2, _ref3) => {
      var [index, inner2] = _ref2;
      var [oldIndex, oldInner] = _ref3;
      var isSame = index === oldIndex && inner2 === oldInner;
      if (isSame || props2.type !== "hour" || activeItemIndex.value === void 0)
        return;
      var newHour = inner2 ? hours24[activeItemIndex.value] : getHour();
      var second = props2.useSeconds ? ":" + props2.time.second : "";
      var newTime = newHour + ":" + props2.time.minute + second;
      if (!props2.preventNextUpdate)
        emit("update", newTime);
      emit("change-prevent-update");
    });
    vue.watch(() => props2.rad, (rad, oldRad) => {
      if (props2.type === "hour" || rad === void 0 || oldRad === void 0)
        return;
      var radToMinSec = rad / 6 >= 0 ? rad / 6 : rad / 6 + 60;
      var oldRadToMinSec = oldRad / 6 >= 0 ? oldRad / 6 : oldRad / 6 + 60;
      if (radToMinSec === oldRadToMinSec)
        return;
      var newTime;
      var {
        hourStr
      } = convertHour(props2.format, props2.ampm, props2.time.hour);
      if (props2.type === "minute") {
        var newMinute = dayjs().minute(radToMinSec).format("mm");
        var second = props2.useSeconds ? ":" + props2.time.second : "";
        newTime = hourStr + ":" + newMinute + second;
      }
      if (props2.type === "second") {
        var newSecond = dayjs().second(radToMinSec).format("ss");
        var _second = props2.useSeconds ? ":" + newSecond : "";
        newTime = hourStr + ":" + props2.time.minute + _second;
      }
      emit("update", newTime);
    });
    vue.watch([() => props2.max, () => props2.min, () => props2.allowedTime], (_ref4) => {
      var [max2, min2, allowedTime] = _ref4;
      disableHour.value = [];
      if (max2 && !min2) {
        var {
          hour: maxHour
        } = getNumberTime(max2);
        var disableAmpmHours = hoursAmpm.filter((hour) => toNumber(hour) > maxHour);
        var disable24Hours = hours24.filter((hour) => toNumber(hour) > maxHour);
        disableHour.value = [...disableAmpmHours, ...disable24Hours];
      }
      if (!max2 && min2) {
        var {
          hour: minHour
        } = getNumberTime(min2);
        var _disableAmpmHours = hoursAmpm.filter((hour) => toNumber(hour) < minHour);
        var _disable24Hours = hours24.filter((hour) => toNumber(hour) < minHour);
        disableHour.value = [..._disableAmpmHours, ..._disable24Hours];
      }
      if (max2 && min2) {
        var {
          hour: _maxHour
        } = getNumberTime(max2);
        var {
          hour: _minHour
        } = getNumberTime(min2);
        var _disableAmpmHours2 = hoursAmpm.filter((hour) => toNumber(hour) < _minHour || toNumber(hour) > _maxHour);
        var _disable24Hours2 = hours24.filter((hour) => toNumber(hour) < _minHour || toNumber(hour) > _maxHour);
        disableHour.value = [..._disableAmpmHours2, ..._disable24Hours2];
      }
      if (allowedTime != null && allowedTime.hours) {
        var {
          hours
        } = allowedTime;
        var _disableAmpmHours3 = hoursAmpm.filter((hour) => !hours(toNumber(hour)));
        var _disable24Hours3 = hours24.filter((hour) => !hours(toNumber(hour)));
        disableHour.value = [.../* @__PURE__ */ new Set([...disableHour.value, ..._disableAmpmHours3, ..._disable24Hours3])];
      }
      disable24HourIndex.value = disableHour.value.map((hour) => hours24.findIndex((hour24) => hour === hour24)).filter((hour) => hour >= 0);
    }, {
      immediate: true
    });
    return {
      n: n$2,
      classes: classes$2,
      hours24,
      timeScales,
      inner,
      handStyle,
      disableHour,
      isActive,
      isDisable,
      getSize,
      getStyle: getStyle2,
      activeItemIndex
    };
  }
});
__sfc__$2.render = __render__$2;
const Clock = __sfc__$2;
var {
  n: n$1,
  classes: classes$1
} = createNamespace("time-picker");
var _withScopeId = (n2) => (vue.pushScopeId(""), n2 = n2(), vue.popScopeId(), n2);
var _hoisted_1$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode(
  "span",
  null,
  ":",
  -1
  /* HOISTED */
));
var _hoisted_2$1 = {
  key: 0
};
function __render__$1(_ctx, _cache) {
  var _component_clock = vue.resolveComponent("clock");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.formatElevation(_ctx.elevation, 2))),
      ref: "picker"
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("title")),
        style: vue.normalizeStyle({
          background: _ctx.headerColor || _ctx.color
        })
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("title-time"))
        },
        [vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass(_ctx.classes(_ctx.n("title-btn"), [_ctx.type === "hour", _ctx.n("title-btn--active")])),
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.checkPanel("hour"))
          },
          vue.toDisplayString(_ctx.time.hour),
          3
          /* TEXT, CLASS */
        ), _hoisted_1$1, vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass(_ctx.classes(_ctx.n("title-btn"), [_ctx.type === "minute", _ctx.n("title-btn--active")])),
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.checkPanel("minute"))
          },
          vue.toDisplayString(_ctx.time.minute),
          3
          /* TEXT, CLASS */
        ), _ctx.useSeconds ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2$1, ":")) : vue.createCommentVNode("v-if", true), _ctx.useSeconds ? (vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: 1,
            class: vue.normalizeClass(_ctx.classes(_ctx.n("title-btn"), [_ctx.type === "second", _ctx.n("title-btn--active")])),
            onClick: _cache[2] || (_cache[2] = ($event) => _ctx.checkPanel("second"))
          },
          vue.toDisplayString(_ctx.time.second),
          3
          /* TEXT, CLASS */
        )) : vue.createCommentVNode("v-if", true)],
        2
        /* CLASS */
      ), _ctx.format === "ampm" ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          class: vue.normalizeClass(_ctx.n("title-ampm"))
        },
        [vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass(_ctx.classes(_ctx.n("title-btn"), [_ctx.ampm === "am", _ctx.n("title-btn--active")])),
            onClick: _cache[3] || (_cache[3] = ($event) => _ctx.checkAmpm("am"))
          },
          "AM",
          2
          /* CLASS */
        ), vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass(_ctx.classes(_ctx.n("title-btn"), [_ctx.ampm === "pm", _ctx.n("title-btn--active")])),
            onClick: _cache[4] || (_cache[4] = ($event) => _ctx.checkAmpm("pm"))
          },
          "PM",
          2
          /* CLASS */
        )],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true)],
      6
      /* CLASS, STYLE */
    ), vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("body"))
      },
      [vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(_ctx.n("clock-container")),
          onTouchstart: _cache[5] || (_cache[5] = function() {
            return _ctx.moveHand && _ctx.moveHand(...arguments);
          }),
          onTouchmove: _cache[6] || (_cache[6] = function() {
            return _ctx.moveHand && _ctx.moveHand(...arguments);
          }),
          onTouchend: _cache[7] || (_cache[7] = function() {
            return _ctx.end && _ctx.end(...arguments);
          }),
          ref: "container"
        },
        [vue.createVNode(vue.Transition, {
          name: _ctx.n() + "-panel-fade"
        }, {
          default: vue.withCtx(() => [(vue.openBlock(), vue.createBlock(_component_clock, {
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
          }, null, 8, ["type", "ampm", "color", "is-inner", "format", "allowed-time", "rad", "time", "prevent-next-update", "use-seconds", "max", "min", "onUpdate", "onChangePreventUpdate"]))]),
          _: 1
          /* STABLE */
        }, 8, ["name"])],
        34
        /* CLASS, HYDRATE_EVENTS */
      )],
      2
      /* CLASS */
    )],
    2
    /* CLASS */
  );
}
var __sfc__$1 = vue.defineComponent({
  name: "VarTimePicker",
  components: {
    Clock
  },
  props: props$1,
  setup(props2) {
    var container = vue.ref(null);
    var picker2 = vue.ref(null);
    var inner = vue.ref(null);
    var isInner = vue.ref(false);
    var isPreventNextUpdate = vue.ref(false);
    var isActualInner = vue.ref(false);
    var isChosenUsableHour = vue.ref(false);
    var isChosenUsableMinute = vue.ref(false);
    var hourRad = vue.ref(void 0);
    var minuteRad = vue.ref(0);
    var secondRad = vue.ref(0);
    var type = vue.ref("hour");
    var ampm = vue.ref("am");
    var isDisableHour = vue.ref(false);
    var isDisableMinute = vue.ref(false);
    var time = vue.ref({
      hour: "00",
      minute: "00",
      second: "00"
    });
    var center = vue.reactive({
      x: 0,
      y: 0
    });
    var innerRange = vue.reactive({
      x: [],
      y: []
    });
    var getRad = vue.computed(() => {
      if (type.value === "hour")
        return hourRad.value;
      if (type.value === "minute")
        return minuteRad.value;
      return secondRad.value;
    });
    var update = (newTime) => {
      call(props2["onUpdate:modelValue"], newTime);
      call(props2.onChange, newTime);
    };
    var rad2deg = (rad) => {
      return rad * 57.29577951308232;
    };
    var checkPanel = (panelType) => {
      isChosenUsableHour.value = false;
      isDisableMinute.value = false;
      type.value = panelType;
    };
    var findAvailableHour = (ampm2) => {
      var {
        disableHour
      } = inner.value;
      var index = hoursAmpm.findIndex((hour) => toNumber(hour) === toNumber(time.value.hour));
      var hours = ampm2 === "am" ? hoursAmpm : hours24;
      var realignmentHours = [...hours.slice(index), ...hours.slice(0, index)];
      return realignmentHours.find((hour, index2) => {
        isPreventNextUpdate.value = index2 !== 0;
        return !disableHour.includes(hour);
      });
    };
    var checkAmpm = (ampmType) => {
      if (props2.readonly)
        return;
      ampm.value = ampmType;
      var newHour = findAvailableHour(ampmType);
      if (!newHour)
        return;
      var second = props2.useSeconds ? ":" + time.value.second : "";
      var newTime = padStart$1(newHour, 2, "0") + ":" + time.value.minute + second;
      update(newTime);
    };
    var getInner = (clientX, clientY) => {
      var xIsInRange = clientX >= innerRange.x[0] && clientX <= innerRange.x[1];
      var yIsInRange = clientY >= innerRange.y[0] && clientY <= innerRange.y[1];
      return xIsInRange && yIsInRange;
    };
    var getTime = (value) => {
      var hourFormat = props2.format === "24hr" ? "HH" : "hh";
      var {
        hour,
        minute,
        second
      } = getNumberTime(value);
      return {
        hour: dayjs().hour(hour).format(hourFormat),
        minute: dayjs().minute(minute).format("mm"),
        second: dayjs().second(second).format("ss")
      };
    };
    var getHourIndex = (rad) => {
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
        isInner.value = props2.format === "24hr" ? getInner(clientX, clientY) : false;
      }
      if (isInner.value !== isActualInner.value)
        return;
      var newHour = isInner.value || ampm.value === "pm" ? hours24[index] : hoursAmpm[index];
      isDisableHour.value = disableHour.includes(newHour);
      if (isDisableHour.value)
        return;
      hourRad.value = rad;
      isChosenUsableHour.value = true;
    };
    var setMinuteRad = (roundDeg) => {
      var {
        disableHour
      } = inner.value;
      var rad = Math.round(roundDeg / 6) * 6 + 90;
      var radToMin = rad / 6 >= 0 ? rad / 6 : rad / 6 + 60;
      var values = {
        time: radToMin,
        format: props2.format,
        ampm: ampm.value,
        hour: time.value.hour,
        max: props2.max,
        min: props2.min,
        disableHour,
        allowedTime: props2.allowedTime
      };
      isDisableMinute.value = getIsDisableMinute(values);
      if (isDisableMinute.value)
        return;
      minuteRad.value = rad;
      isChosenUsableMinute.value = true;
    };
    var setSecondRad = (roundDeg) => {
      var {
        disableHour
      } = inner.value;
      var rad = Math.round(roundDeg / 6) * 6 + 90;
      var radToSec = rad / 6 >= 0 ? rad / 6 : rad / 6 + 60;
      var values = {
        time: radToSec,
        format: props2.format,
        ampm: ampm.value,
        hour: time.value.hour,
        minute: toNumber(time.value.minute),
        max: props2.max,
        min: props2.min,
        disableHour,
        allowedTime: props2.allowedTime
      };
      if (!getIsDisableSecond(values))
        secondRad.value = rad;
    };
    var setCenterAndRange = () => {
      var {
        left: left2,
        top: top2,
        width,
        height
      } = container.value.getBoundingClientRect();
      center.x = left2 + width / 2;
      center.y = top2 + height / 2;
      if (type.value === "hour" && props2.format === "24hr") {
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
    var moveHand = (event) => {
      event.preventDefault();
      if (props2.readonly)
        return;
      setCenterAndRange();
      var {
        clientX,
        clientY
      } = event.touches[0];
      var x = clientX - center.x;
      var y = clientY - center.y;
      var roundDeg = Math.round(rad2deg(Math.atan2(y, x)));
      if (type.value === "hour")
        setHourRad(clientX, clientY, roundDeg);
      else if (type.value === "minute")
        setMinuteRad(roundDeg);
      else
        setSecondRad(roundDeg);
    };
    var end2 = () => {
      if (props2.readonly)
        return;
      if (type.value === "hour" && isChosenUsableHour.value) {
        type.value = "minute";
        return;
      }
      if (type.value === "minute" && props2.useSeconds && isChosenUsableMinute.value) {
        type.value = "second";
      }
    };
    var changePreventUpdate = () => {
      isPreventNextUpdate.value = false;
    };
    vue.watch(() => props2.modelValue, (value) => {
      if (value) {
        var {
          hour,
          minute,
          second
        } = getNumberTime(value);
        var formatHour12 = dayjs().hour(hour).format("hh");
        var formatHour24 = dayjs().hour(hour).format("HH");
        var formatMinute = dayjs().minute(minute).format("mm");
        var formatSecond = dayjs().second(second).format("ss");
        hourRad.value = (formatHour12 === "12" ? 0 : toNumber(formatHour12)) * 30;
        minuteRad.value = toNumber(formatMinute) * 6;
        secondRad.value = toNumber(formatSecond) * 6;
        time.value = getTime(value);
        if (props2.format !== "24hr") {
          ampm.value = padStart$1("" + hour, 2, "0") === formatHour24 && hours24.includes(formatHour24) ? "pm" : "am";
        }
        isInner.value = props2.format === "24hr" && hours24.includes(formatHour24);
      }
    }, {
      immediate: true
    });
    return {
      n: n$1,
      classes: classes$1,
      getRad,
      time,
      container,
      inner,
      picker: picker2,
      isInner,
      type,
      ampm,
      isPreventNextUpdate,
      moveHand,
      checkPanel,
      checkAmpm,
      end: end2,
      update,
      changePreventUpdate,
      formatElevation
    };
  }
});
__sfc__$1.render = __render__$1;
const TimePicker = __sfc__$1;
TimePicker.install = function(app) {
  app.component(TimePicker.name, TimePicker);
};
var _TimePickerComponent = TimePicker;
var props = {
  modelValue: {
    type: Array,
    default: () => []
  },
  accept: {
    type: String,
    default: "image/*"
  },
  capture: {
    type: [String, Boolean],
    default: void 0
  },
  multiple: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  elevation: {
    type: [Boolean, Number, String],
    default: true
  },
  removable: {
    type: Boolean,
    default: true
  },
  maxlength: {
    type: [Number, String]
  },
  maxsize: {
    type: [Number, String]
  },
  previewed: {
    type: Boolean,
    default: true
  },
  ripple: {
    type: Boolean,
    default: true
  },
  validateTrigger: {
    type: Array,
    default: () => ["onChange", "onRemove"]
  },
  rules: {
    type: Array
  },
  hideList: {
    type: Boolean,
    default: false
  },
  onBeforeRead: defineListenerProp(),
  onAfterRead: defineListenerProp(),
  onBeforeRemove: defineListenerProp(),
  onRemove: defineListenerProp(),
  onOversize: defineListenerProp(),
  "onUpdate:modelValue": defineListenerProp()
};
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error2) {
    reject(error2);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn2) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn2.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
var {
  n,
  classes
} = createNamespace("uploader");
var fid = 0;
var _hoisted_1 = ["onClick"];
var _hoisted_2 = ["onClick"];
var _hoisted_3 = ["src", "alt"];
var _hoisted_4 = ["multiple", "accept", "capture", "disabled"];
var _hoisted_5 = ["src"];
function __render__(_ctx, _cache) {
  var _component_var_icon = vue.resolveComponent("var-icon");
  var _component_var_hover_overlay = vue.resolveComponent("var-hover-overlay");
  var _component_var_form_details = vue.resolveComponent("var-form-details");
  var _component_var_popup = vue.resolveComponent("var-popup");
  var _directive_ripple = vue.resolveDirective("ripple");
  var _directive_hover = vue.resolveDirective("hover");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.classes(_ctx.n(), _ctx.n("$--box")))
    },
    [vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.n("file-list"))
      },
      [(vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList(_ctx.files, (f) => {
          return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
            class: vue.normalizeClass(_ctx.classes(_ctx.n("file"), _ctx.formatElevation(_ctx.elevation, 2), [f.state === "loading", _ctx.n("--loading")])),
            key: f.id,
            onClick: ($event) => _ctx.preview(f)
          }, [vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(_ctx.n("file-name"))
            },
            vue.toDisplayString(f.name || f.url),
            3
            /* TEXT, CLASS */
          ), _ctx.removable ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass(_ctx.n("file-close")),
            onClick: vue.withModifiers(($event) => _ctx.handleRemove(f), ["stop"])
          }, [vue.createVNode(_component_var_icon, {
            class: vue.normalizeClass(_ctx.n("file-close-icon")),
            "var-uploader-cover": "",
            name: "delete"
          }, null, 8, ["class"])], 10, _hoisted_2)) : vue.createCommentVNode("v-if", true), f.cover ? (vue.openBlock(), vue.createElementBlock("img", {
            key: 1,
            class: vue.normalizeClass(_ctx.n("file-cover")),
            style: vue.normalizeStyle({
              objectFit: f.fit
            }),
            src: f.cover,
            alt: f.name
          }, null, 14, _hoisted_3)) : vue.createCommentVNode("v-if", true), vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(_ctx.classes(_ctx.n("file-indicator"), [f.state === "success", _ctx.n("--success")], [f.state === "error", _ctx.n("--error")]))
            },
            null,
            2
            /* CLASS */
          )], 10, _hoisted_1)), [[_directive_ripple, {
            disabled: _ctx.disabled || _ctx.formDisabled || _ctx.readonly || _ctx.formReadonly || !_ctx.ripple
          }]]);
        }),
        128
        /* KEYED_FRAGMENT */
      )), !_ctx.maxlength || _ctx.modelValue.length < _ctx.maxlength ? vue.withDirectives((vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          class: vue.normalizeClass(_ctx.classes([!_ctx.$slots.default, _ctx.n("action") + " " + _ctx.formatElevation(_ctx.elevation, 2)], [_ctx.disabled || _ctx.formDisabled, _ctx.n("--disabled")])),
          onClick: _cache[1] || (_cache[1] = function() {
            return _ctx.chooseFile && _ctx.chooseFile(...arguments);
          })
        },
        [vue.createElementVNode("input", {
          ref: "input",
          type: "file",
          class: vue.normalizeClass(_ctx.n("action-input")),
          multiple: _ctx.multiple,
          accept: _ctx.accept,
          capture: _ctx.capture,
          disabled: _ctx.disabled || _ctx.formDisabled || _ctx.readonly || _ctx.formReadonly,
          onChange: _cache[0] || (_cache[0] = function() {
            return _ctx.handleChange && _ctx.handleChange(...arguments);
          })
        }, null, 42, _hoisted_4), vue.renderSlot(_ctx.$slots, "default", {}, () => [vue.createVNode(_component_var_icon, {
          class: vue.normalizeClass(_ctx.n("action-icon")),
          "var-uploader-cover": "",
          name: "plus"
        }, null, 8, ["class"]), vue.createVNode(_component_var_hover_overlay, {
          hovering: _ctx.hovering && !_ctx.disabled && !_ctx.formDisabled
        }, null, 8, ["hovering"])])],
        2
        /* CLASS */
      )), [[_directive_ripple, {
        disabled: _ctx.disabled || _ctx.formDisabled || _ctx.readonly || _ctx.formReadonly || !_ctx.ripple || _ctx.$slots.default
      }], [_directive_hover, _ctx.handleHovering, "desktop"]]) : vue.createCommentVNode("v-if", true)],
      2
      /* CLASS */
    ), vue.createVNode(_component_var_form_details, {
      "error-message": _ctx.errorMessage,
      "extra-message": _ctx.maxlengthText
    }, null, 8, ["error-message", "extra-message"]), vue.createVNode(_component_var_popup, {
      class: vue.normalizeClass(_ctx.n("preview")),
      "var-uploader-cover": "",
      position: "center",
      show: _ctx.showPreview,
      "onUpdate:show": _cache[2] || (_cache[2] = ($event) => _ctx.showPreview = $event),
      onClosed: _cache[3] || (_cache[3] = ($event) => _ctx.currentPreview = null)
    }, {
      default: vue.withCtx(() => {
        var _ctx$currentPreview, _ctx$currentPreview2;
        return [_ctx.currentPreview && _ctx.isHTMLSupportVideo((_ctx$currentPreview = _ctx.currentPreview) == null ? void 0 : _ctx$currentPreview.url) ? (vue.openBlock(), vue.createElementBlock("video", {
          key: 0,
          class: vue.normalizeClass(_ctx.n("preview-video")),
          playsinline: "true",
          "webkit-playsinline": "true",
          "x5-playsinline": "true",
          "x5-video-player-type": "h5",
          "x5-video-player-fullscreen": "false",
          controls: "",
          src: (_ctx$currentPreview2 = _ctx.currentPreview) == null ? void 0 : _ctx$currentPreview2.url
        }, null, 10, _hoisted_5)) : vue.createCommentVNode("v-if", true)];
      }),
      _: 1
      /* STABLE */
    }, 8, ["class", "show"])],
    2
    /* CLASS */
  );
}
var __sfc__ = vue.defineComponent({
  name: "VarUploader",
  directives: {
    Ripple: Ripple$1,
    Hover: Hover$1
  },
  components: {
    VarIcon: Icon,
    VarPopup: Popup,
    VarFormDetails: FormDetails,
    VarHoverOverlay: HoverOverlay
  },
  props,
  setup(props2) {
    var input2 = vue.ref(null);
    var showPreview = vue.ref(false);
    var currentPreview = vue.ref(null);
    var maxlengthText = vue.computed(() => {
      var {
        maxlength,
        modelValue: {
          length
        }
      } = props2;
      return isNumber(maxlength) ? length + " / " + maxlength : "";
    });
    var {
      form,
      bindForm
    } = useForm();
    var {
      errorMessage,
      validateWithTrigger: vt,
      validate: v,
      // expose
      resetValidation
    } = useValidation();
    var {
      hovering,
      handleHovering
    } = useHoverOverlay();
    var files = vue.computed(() => {
      var {
        modelValue,
        hideList
      } = props2;
      if (hideList) {
        return [];
      }
      return modelValue;
    });
    var preview = (varFile) => {
      var {
        disabled,
        readonly,
        previewed
      } = props2;
      if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly || !previewed) {
        return;
      }
      var {
        url
      } = varFile;
      if (isString(url) && isHTMLSupportImage(url)) {
        ImagePreview(url);
        return;
      }
      if (isString(url) && isHTMLSupportVideo(url)) {
        currentPreview.value = varFile;
        showPreview.value = true;
      }
    };
    var createVarFile = (file) => {
      return {
        id: fid++,
        url: "",
        cover: "",
        name: file.name,
        file
      };
    };
    var getFiles = (event) => {
      var el = event.target;
      var {
        files: fileList
      } = el;
      return Array.from(fileList);
    };
    var resolver = (varFile) => {
      return new Promise((resolve) => {
        var fileReader = new FileReader();
        fileReader.onload = () => {
          var base64 = fileReader.result;
          varFile.file.type.startsWith("image") && (varFile.cover = base64);
          varFile.url = base64;
          resolve(varFile);
        };
        fileReader.readAsDataURL(varFile.file);
      });
    };
    var getResolvers = (varFiles) => varFiles.map(resolver);
    var getBeforeReaders = (varFiles) => {
      var {
        onBeforeRead
      } = props2;
      return varFiles.map((varFile) => {
        return new Promise((resolve) => {
          if (!onBeforeRead) {
            resolve({
              valid: true,
              varFile
            });
          }
          var results = call(onBeforeRead, vue.reactive(varFile));
          results = isArray(results) ? results : [results];
          Promise.all(results).then((values) => {
            resolve({
              valid: !values.some((value) => !value),
              varFile
            });
          });
        });
      });
    };
    var handleChange = /* @__PURE__ */ function() {
      var _ref = _asyncToGenerator(function* (event) {
        var {
          maxsize,
          maxlength,
          modelValue,
          onOversize,
          onAfterRead,
          readonly,
          disabled
        } = props2;
        if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly) {
          return;
        }
        var getValidSizeVarFile = (varFiles2) => {
          return varFiles2.filter((varFile) => {
            if (varFile.file.size > toNumber(maxsize)) {
              call(onOversize, vue.reactive(varFile));
              return false;
            }
            return true;
          });
        };
        var getValidLengthVarFiles = (varFiles2) => {
          var limit = Math.min(varFiles2.length, toNumber(maxlength) - modelValue.length);
          return varFiles2.slice(0, limit);
        };
        var files2 = getFiles(event);
        var varFiles = files2.map(createVarFile);
        varFiles = maxsize != null ? getValidSizeVarFile(varFiles) : varFiles;
        varFiles = maxlength != null ? getValidLengthVarFiles(varFiles) : varFiles;
        var resolvedVarFiles = yield Promise.all(getResolvers(varFiles));
        var validationVarFiles = yield Promise.all(getBeforeReaders(resolvedVarFiles));
        var validVarFiles = validationVarFiles.filter((_ref2) => {
          var {
            valid
          } = _ref2;
          return valid;
        }).map((_ref3) => {
          var {
            varFile
          } = _ref3;
          return varFile;
        });
        call(props2["onUpdate:modelValue"], [...modelValue, ...validVarFiles]);
        event.target.value = "";
        validVarFiles.forEach((varFile) => call(onAfterRead, vue.reactive(varFile)));
      });
      return function handleChange2(_x) {
        return _ref.apply(this, arguments);
      };
    }();
    var handleRemove = /* @__PURE__ */ function() {
      var _ref4 = _asyncToGenerator(function* (removedVarFile) {
        var {
          disabled,
          readonly,
          modelValue,
          onBeforeRemove,
          onRemove
        } = props2;
        if (form != null && form.disabled.value || form != null && form.readonly.value || disabled || readonly) {
          return;
        }
        if (onBeforeRemove) {
          var results = call(onBeforeRemove, vue.reactive(removedVarFile));
          results = isArray(results) ? results : [results];
          if ((yield Promise.all(results)).some((result2) => !result2)) {
            return;
          }
        }
        var expectedFiles = modelValue.filter((varFile) => varFile !== removedVarFile);
        call(onRemove, vue.reactive(removedVarFile));
        validateWithTrigger("onRemove");
        call(props2["onUpdate:modelValue"], expectedFiles);
      });
      return function handleRemove2(_x2) {
        return _ref4.apply(this, arguments);
      };
    }();
    var getSuccess = () => props2.modelValue.filter((varFile) => varFile.state === "success");
    var getError = () => props2.modelValue.filter((varFile) => varFile.state === "error");
    var getLoading = () => props2.modelValue.filter((varFile) => varFile.state === "loading");
    var chooseFile = () => {
      input2.value.click();
    };
    var closePreview = () => {
      currentPreview.value = null;
      showPreview.value = false;
      ImagePreview.close();
    };
    var varFileUtils = {
      getSuccess,
      getError,
      getLoading
    };
    var validateWithTrigger = (trigger) => {
      vue.nextTick(() => {
        var {
          validateTrigger,
          rules,
          modelValue
        } = props2;
        vt(validateTrigger, trigger, rules, modelValue, varFileUtils);
      });
    };
    var callReset = false;
    var validate = () => v(props2.rules, props2.modelValue, varFileUtils);
    var reset = () => {
      callReset = true;
      call(props2["onUpdate:modelValue"], []);
      resetValidation();
    };
    var uploaderProvider = {
      validate,
      resetValidation,
      reset
    };
    call(bindForm, uploaderProvider);
    vue.watch(() => props2.modelValue, () => {
      !callReset && validateWithTrigger("onChange");
      callReset = false;
    }, {
      deep: true
    });
    return {
      n,
      classes,
      formatElevation,
      input: input2,
      files,
      showPreview,
      currentPreview,
      errorMessage,
      maxlengthText,
      hovering,
      formDisabled: form == null ? void 0 : form.disabled,
      formReadonly: form == null ? void 0 : form.readonly,
      handleHovering,
      isHTMLSupportVideo,
      isHTMLSupportImage,
      preview,
      handleChange,
      handleRemove,
      getSuccess,
      getError,
      getLoading,
      validate,
      resetValidation,
      reset,
      chooseFile,
      closePreview
    };
  }
});
__sfc__.render = __render__;
const Uploader = __sfc__;
Uploader.install = function(app) {
  app.component(Uploader.name, Uploader);
};
var _UploaderComponent = Uploader;
const common = "";
const icon = "";
const ripple = "";
const popup = "";
const actionSheet = "";
const ActionSheetSfc = "";
const elevation = "";
const appBar = "";
const AppBarSfc = "";
const avatar = "";
const AvatarSfc = "";
const avatarGroup = "";
const AvatarGroupSfc = "";
const button = "";
const backTop = "";
const BackTopSfc = "";
const badge = "";
const BadgeSfc = "";
const loading = "";
const bottomNavigation = "";
const BottomNavigationSfc = "";
const bottomNavigationItem = "";
const BottomNavigationItemSfc = "";
const breadcrumb = "";
const BreadcrumbSfc = "";
const breadcrumbs = "";
const BreadcrumbsSfc = "";
const hoverOverlay = "";
const ButtonSfc = "";
const buttonGroup = "";
const ButtonGroupSfc = "";
const card = "";
const CardSfc = "";
const cell = "";
const CellSfc = "";
const formDetails = "";
const checkbox = "";
const CheckboxSfc = "";
const checkboxGroup = "";
const CheckboxGroupSfc = "";
const chip = "";
const ChipSfc = "";
const col = "";
const ColSfc = "";
const CollapseSfc = "";
const collapseItem = "";
const CollapseItemSfc = "";
const CountdownSfc = "";
const counter = "";
const CounterSfc = "";
const datePicker = "";
const DatePickerSfc = "";
const dialog = "";
const DialogSfc = "";
const divider = "";
const DividerSfc = "";
const tooltip = "";
const ellipsis = "";
const EllipsisSfc = "";
const fab = "";
const FormSfc = "";
const FormDetailsSfc = "";
const HoverOverlaySfc = "";
const IconSfc = "";
const image = "";
const ImageSfc = "";
const swipe = "";
const swipeItem = "";
const imagePreview = "";
const ImagePreviewSfc = "";
const sticky = "";
const IndexAnchorSfc = "";
const indexBar = "";
const IndexBarSfc = "";
const input = "";
const InputSfc = "";
const link = "";
const LinkSfc = "";
const list = "";
const ListSfc = "";
const LoadingSfc = "";
const loadingBar = "";
const menu = "";
const MenuSfc = "";
const select = "";
const option = "";
const OptionSfc = "";
const overlay = "";
const pagination = "";
const PaginationSfc = "";
const paper = "";
const PaperSfc = "";
const picker = "";
const PickerSfc = "";
const progress = "";
const ProgressSfc = "";
const pullRefresh = "";
const PullRefreshSfc = "";
const radio = "";
const RadioSfc = "";
const radioGroup = "";
const RadioGroupSfc = "";
const rate = "";
const RateSfc = "";
const result = "";
const ResultSfc = "";
const row = "";
const RowSfc = "";
const SelectSfc = "";
const skeleton = "";
const SkeletonSfc = "";
const slider = "";
const SliderSfc = "";
const SnackbarSfc = "";
const snackbar = "";
const coreSfc = "";
const space = "";
const step = "";
const StepSfc = "";
const StepsSfc = "";
const StickySfc = "";
const StyleProviderSfc = "";
const SwipeSfc = "";
const SwipeItemSfc = "";
const _switch = "";
const SwitchSfc = "";
const tab = "";
const TabSfc = "";
const tabItem = "";
const TabItemSfc = "";
const table = "";
const TableSfc = "";
const tabs = "";
const TabsSfc = "";
const TabsItemsSfc = "";
const timePicker = "";
const TimePickerSfc = "";
const TooltipSfc = "";
const uploader = "";
const UploaderSfc = "";
const version = "2.9.5";
function install(app) {
  ActionSheet.install && app.use(ActionSheet);
  AppBar.install && app.use(AppBar);
  Avatar.install && app.use(Avatar);
  AvatarGroup.install && app.use(AvatarGroup);
  BackTop.install && app.use(BackTop);
  Badge.install && app.use(Badge);
  BottomNavigation.install && app.use(BottomNavigation);
  BottomNavigationItem.install && app.use(BottomNavigationItem);
  Breadcrumb.install && app.use(Breadcrumb);
  Breadcrumbs.install && app.use(Breadcrumbs);
  Button.install && app.use(Button);
  ButtonGroup.install && app.use(ButtonGroup);
  Card.install && app.use(Card);
  Cell.install && app.use(Cell);
  Checkbox.install && app.use(Checkbox);
  CheckboxGroup.install && app.use(CheckboxGroup);
  Chip.install && app.use(Chip);
  Col.install && app.use(Col);
  Collapse.install && app.use(Collapse);
  CollapseItem.install && app.use(CollapseItem);
  Context.install && app.use(Context);
  Countdown.install && app.use(Countdown);
  Counter.install && app.use(Counter);
  DatePicker.install && app.use(DatePicker);
  Dialog.install && app.use(Dialog);
  Divider.install && app.use(Divider);
  Ellipsis.install && app.use(Ellipsis);
  Fab.install && app.use(Fab);
  Form.install && app.use(Form);
  FormDetails.install && app.use(FormDetails);
  Hover$1.install && app.use(Hover$1);
  HoverOverlay.install && app.use(HoverOverlay);
  Icon.install && app.use(Icon);
  Image$1.install && app.use(Image$1);
  ImagePreview.install && app.use(ImagePreview);
  IndexAnchor.install && app.use(IndexAnchor);
  IndexBar.install && app.use(IndexBar);
  Input.install && app.use(Input);
  Lazy$1.install && app.use(Lazy$1);
  Link.install && app.use(Link);
  List.install && app.use(List);
  Loading.install && app.use(Loading);
  LoadingBar$1.install && app.use(LoadingBar$1);
  Locale.install && app.use(Locale);
  Menu.install && app.use(Menu);
  Option.install && app.use(Option);
  Overlay.install && app.use(Overlay);
  Pagination.install && app.use(Pagination);
  Paper.install && app.use(Paper);
  Picker.install && app.use(Picker);
  Popup.install && app.use(Popup);
  Progress.install && app.use(Progress);
  PullRefresh.install && app.use(PullRefresh);
  Radio.install && app.use(Radio);
  RadioGroup.install && app.use(RadioGroup);
  Rate.install && app.use(Rate);
  Result.install && app.use(Result);
  Ripple$1.install && app.use(Ripple$1);
  Row.install && app.use(Row);
  Select.install && app.use(Select);
  Skeleton.install && app.use(Skeleton);
  Slider.install && app.use(Slider);
  Snackbar$1.install && app.use(Snackbar$1);
  Space.install && app.use(Space);
  Step.install && app.use(Step);
  Steps.install && app.use(Steps);
  Sticky.install && app.use(Sticky);
  StyleProvider.install && app.use(StyleProvider);
  Swipe.install && app.use(Swipe);
  SwipeItem.install && app.use(SwipeItem);
  Switch.install && app.use(Switch);
  Tab.install && app.use(Tab);
  TabItem.install && app.use(TabItem);
  Table.install && app.use(Table);
  Tabs.install && app.use(Tabs);
  TabsItems.install && app.use(TabsItems);
  Themes$1.install && app.use(Themes$1);
  TimePicker.install && app.use(TimePicker);
  Tooltip.install && app.use(Tooltip);
  Uploader.install && app.use(Uploader);
}
const index_bundle = {
  version,
  install,
  ActionSheet,
  AppBar,
  Avatar,
  AvatarGroup,
  BackTop,
  Badge,
  BottomNavigation,
  BottomNavigationItem,
  Breadcrumb,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  Cell,
  Checkbox,
  CheckboxGroup,
  Chip,
  Col,
  Collapse,
  CollapseItem,
  Context,
  Countdown,
  Counter,
  DatePicker,
  Dialog,
  Divider,
  Ellipsis,
  Fab,
  Form,
  FormDetails,
  Hover: Hover$1,
  HoverOverlay,
  Icon,
  Image: Image$1,
  ImagePreview,
  IndexAnchor,
  IndexBar,
  Input,
  Lazy: Lazy$1,
  Link,
  List,
  Loading,
  LoadingBar: LoadingBar$1,
  Locale,
  Menu,
  Option,
  Overlay,
  Pagination,
  Paper,
  Picker,
  Popup,
  Progress,
  PullRefresh,
  Radio,
  RadioGroup,
  Rate,
  Result,
  Ripple: Ripple$1,
  Row,
  Select,
  Skeleton,
  Slider,
  Snackbar: Snackbar$1,
  Space,
  Step,
  Steps,
  Sticky,
  StyleProvider,
  Swipe,
  SwipeItem,
  Switch,
  Tab,
  TabItem,
  Table,
  Tabs,
  TabsItems,
  Themes: Themes$1,
  TimePicker,
  Tooltip,
  Uploader
};
exports.ActionSheet = ActionSheet;
exports.AppBar = AppBar;
exports.Avatar = Avatar;
exports.AvatarGroup = AvatarGroup;
exports.BackTop = BackTop;
exports.Badge = Badge;
exports.BottomNavigation = BottomNavigation;
exports.BottomNavigationItem = BottomNavigationItem;
exports.Breadcrumb = Breadcrumb;
exports.Breadcrumbs = Breadcrumbs;
exports.Button = Button;
exports.ButtonGroup = ButtonGroup;
exports.Card = Card;
exports.Cell = Cell;
exports.Checkbox = Checkbox;
exports.CheckboxGroup = CheckboxGroup;
exports.Chip = Chip;
exports.Col = Col;
exports.Collapse = Collapse;
exports.CollapseItem = CollapseItem;
exports.Context = Context;
exports.Countdown = Countdown;
exports.Counter = Counter;
exports.DatePicker = DatePicker;
exports.Dialog = Dialog;
exports.Divider = Divider;
exports.Ellipsis = Ellipsis;
exports.Fab = Fab;
exports.Form = Form;
exports.FormDetails = FormDetails;
exports.Hover = Hover$1;
exports.HoverOverlay = HoverOverlay;
exports.Icon = Icon;
exports.Image = Image$1;
exports.ImagePreview = ImagePreview;
exports.IndexAnchor = IndexAnchor;
exports.IndexBar = IndexBar;
exports.Input = Input;
exports.Lazy = Lazy$1;
exports.Link = Link;
exports.List = List;
exports.Loading = Loading;
exports.LoadingBar = LoadingBar$1;
exports.Locale = Locale;
exports.Menu = Menu;
exports.Option = Option;
exports.Overlay = Overlay;
exports.PIXEL = PIXEL;
exports.Pagination = Pagination;
exports.Paper = Paper;
exports.Picker = Picker;
exports.Popup = Popup;
exports.Progress = Progress;
exports.PullRefresh = PullRefresh;
exports.Radio = Radio;
exports.RadioGroup = RadioGroup;
exports.Rate = Rate;
exports.Result = Result;
exports.Ripple = Ripple$1;
exports.Row = Row;
exports.SNACKBAR_TYPE = SNACKBAR_TYPE;
exports.Select = Select;
exports.Skeleton = Skeleton;
exports.Slider = Slider;
exports.Snackbar = Snackbar$1;
exports.Space = Space;
exports.Step = Step;
exports.Steps = Steps;
exports.Sticky = Sticky;
exports.StyleProvider = StyleProvider;
exports.Swipe = Swipe;
exports.SwipeItem = SwipeItem;
exports.Switch = Switch;
exports.Tab = Tab;
exports.TabItem = TabItem;
exports.Table = Table;
exports.Tabs = Tabs;
exports.TabsItems = TabsItems;
exports.Themes = Themes$1;
exports.TimePicker = TimePicker;
exports.Tooltip = Tooltip;
exports.Uploader = Uploader;
exports._ActionSheetComponent = _ActionSheetComponent;
exports._AppBarComponent = _AppBarComponent;
exports._AvatarComponent = _AvatarComponent;
exports._AvatarGroupComponent = _AvatarGroupComponent;
exports._BackTopComponent = _BackTopComponent;
exports._BadgeComponent = _BadgeComponent;
exports._BottomNavigationComponent = _BottomNavigationComponent;
exports._BottomNavigationItemComponent = _BottomNavigationItemComponent;
exports._BreadcrumbComponent = _BreadcrumbComponent;
exports._BreadcrumbsComponent = _BreadcrumbsComponent;
exports._ButtonComponent = _ButtonComponent;
exports._ButtonGroupComponent = _ButtonGroupComponent;
exports._CardComponent = _CardComponent;
exports._CellComponent = _CellComponent;
exports._CheckboxComponent = _CheckboxComponent;
exports._CheckboxGroupComponent = _CheckboxGroupComponent;
exports._ChipComponent = _ChipComponent;
exports._ColComponent = _ColComponent;
exports._CollapseComponent = _CollapseComponent;
exports._CollapseItemComponent = _CollapseItemComponent;
exports._ContextComponent = _ContextComponent;
exports._CountdownComponent = _CountdownComponent;
exports._CounterComponent = _CounterComponent;
exports._DatePickerComponent = _DatePickerComponent;
exports._DialogComponent = _DialogComponent;
exports._DividerComponent = _DividerComponent;
exports._EllipsisComponent = _EllipsisComponent;
exports._FabComponent = _FabComponent;
exports._FormComponent = _FormComponent;
exports._FormDetailsComponent = _FormDetailsComponent;
exports._HoverComponent = _HoverComponent;
exports._HoverOverlayComponent = _HoverOverlayComponent;
exports._IconComponent = _IconComponent;
exports._ImageComponent = _ImageComponent;
exports._ImagePreviewComponent = _ImagePreviewComponent;
exports._IndexAnchorComponent = _IndexAnchorComponent;
exports._IndexBarComponent = _IndexBarComponent;
exports._InputComponent = _InputComponent;
exports._LazyComponent = _LazyComponent;
exports._LinkComponent = _LinkComponent;
exports._ListComponent = _ListComponent;
exports._LoadingBarComponent = _LoadingBarComponent;
exports._LoadingComponent = _LoadingComponent;
exports._LocaleComponent = _LocaleComponent;
exports._MenuComponent = _MenuComponent;
exports._OptionComponent = _OptionComponent;
exports._OverlayComponent = _OverlayComponent;
exports._PaginationComponent = _PaginationComponent;
exports._PaperComponent = _PaperComponent;
exports._PickerComponent = _PickerComponent;
exports._PopupComponent = _PopupComponent;
exports._ProgressComponent = _ProgressComponent;
exports._PullRefreshComponent = _PullRefreshComponent;
exports._RadioComponent = _RadioComponent;
exports._RadioGroupComponent = _RadioGroupComponent;
exports._RateComponent = _RateComponent;
exports._ResultComponent = _ResultComponent;
exports._RippleComponent = _RippleComponent;
exports._RowComponent = _RowComponent;
exports._SelectComponent = _SelectComponent;
exports._SkeletonComponent = _SkeletonComponent;
exports._SliderComponent = _SliderComponent;
exports._SnackbarComponent = _SnackbarComponent;
exports._SpaceComponent = _SpaceComponent;
exports._StepComponent = _StepComponent;
exports._StepsComponent = _StepsComponent;
exports._StickyComponent = _StickyComponent;
exports._StyleProviderComponent = _StyleProviderComponent;
exports._SwipeComponent = _SwipeComponent;
exports._SwipeItemComponent = _SwipeItemComponent;
exports._SwitchComponent = _SwitchComponent;
exports._TabComponent = _TabComponent;
exports._TabItemComponent = _TabItemComponent;
exports._TableComponent = _TableComponent;
exports._TabsComponent = _TabsComponent;
exports._TabsItemsComponent = _TabsItemsComponent;
exports._ThemesComponent = _ThemesComponent;
exports._TimePickerComponent = _TimePickerComponent;
exports._TooltipComponent = _TooltipComponent;
exports._UploaderComponent = _UploaderComponent;
exports.actionSheetProps = props$17;
exports.add = add$2;
exports.appBarProps = props$16;
exports.avatarGroupProps = props$14;
exports.avatarProps = props$15;
exports.backTopProps = props$10;
exports.badgeProps = props$$;
exports.bottomNavigationItemProps = props$Z;
exports.bottomNavigationProps = props$_;
exports.breadcrumbProps = props$Y;
exports.breadcrumbsProps = props$X;
exports.buttonProps = props$11;
exports.cardProps = props$V;
exports.cellProps = props$U;
exports.checkboxGroupProps = props$R;
exports.checkboxProps = props$S;
exports.chipProps = props$Q;
exports.colProps = props$P;
exports.collapseItemProps = props$N;
exports.collapseProps = props$O;
exports.countdownProps = props$M;
exports.counterProps = props$L;
exports.datePickerProps = props$K;
exports.default = index_bundle;
exports.defaultLazyOptions = defaultLazyOptions;
exports.dialogProps = props$J;
exports.dividerProps = props$I;
exports.enUS = enUS;
exports.formDetailsProps = props$T;
exports.formProps = props$E;
exports.iconProps = props$18;
exports.imageCache = imageCache;
exports.imagePreviewProps = props$B;
exports.imageProps = props$D;
exports.indexAnchorProps = props$z;
exports.indexBarProps = props$y;
exports.inputProps = props$x;
exports.install = install;
exports.linkProps = props$w;
exports.listProps = props$v;
exports.loadingBarProps = props$u;
exports.loadingProps = props$13;
exports.menuProps = props$s;
exports.merge = merge;
exports.optionProps = props$r;
exports.overlayProps = props$q;
exports.pack = pack;
exports.packs = packs;
exports.paginationProps = props$p;
exports.paperProps = props$o;
exports.pickerProps = props$n;
exports.popupProps = props$19;
exports.progressProps = props$m;
exports.pullRefreshProps = props$l;
exports.radioGroupProps = props$j;
exports.radioProps = props$k;
exports.rateProps = props$i;
exports.resultProps = props$h;
exports.rowProps = props$g;
exports.selectProps = props$f;
exports.skeletonProps = props$e;
exports.sliderProps = props$d;
exports.snackbarProps = props$c;
exports.spaceProps = props$b;
exports.stepProps = props$a;
exports.stepsProps = props$9;
exports.stickyProps = props$A;
exports.styleProviderProps = props$8;
exports.swipeProps = props$C;
exports.switchProps = props$7;
exports.tabItemProps = props$5;
exports.tabProps = props$6;
exports.tableProps = props$4;
exports.tabsItemsProps = props$2;
exports.tabsProps = props$3;
exports.timePickerProps = props$1;
exports.tooltipProps = props$H;
exports.uploaderProps = props;
exports.use = use;
exports.useHoverOverlay = useHoverOverlay;
exports.useLocale = useLocale;
exports.version = version;
exports.zhCN = zhCN;
