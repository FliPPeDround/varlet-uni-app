function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import { isNumber, isObject, isString, kebabCase, toNumber } from '@varlet/shared';
import { getGlobalThis } from './shared.mjs';
import { error } from '../utils/logger.mjs';
export function getLeft(element) {
  var {
    left
  } = element.getBoundingClientRect();
  return left + (document.body.scrollLeft || document.documentElement.scrollLeft);
}
export function getTop(element) {
  var {
    top
  } = element.getBoundingClientRect();
  return top + (document.body.scrollTop || document.documentElement.scrollTop);
}
export function getScrollTop(element) {
  var top = 'scrollTop' in element ? element.scrollTop : element.pageYOffset;

  // iOS scroll bounce cause minus scrollTop
  return Math.max(top, 0);
}
export function getScrollLeft(element) {
  var left = 'scrollLeft' in element ? element.scrollLeft : element.pageXOffset;
  return Math.max(left, 0);
}
export function inViewport(_x) {
  return _inViewport.apply(this, arguments);
}
function _inViewport() {
  _inViewport = _asyncToGenerator(function* (element) {
    yield doubleRaf();
    var {
      top,
      bottom,
      left,
      right
    } = element.getBoundingClientRect();
    var {
      innerWidth,
      innerHeight
    } = window;
    var xInViewport = left <= innerWidth && right >= 0;
    var yInViewport = top <= innerHeight && bottom >= 0;
    return xInViewport && yInViewport;
  });
  return _inViewport.apply(this, arguments);
}
export function getTranslate(el) {
  var {
    transform
  } = window.getComputedStyle(el);
  return +transform.slice(transform.lastIndexOf(',') + 2, transform.length - 1);
}
export function getParentScroller(el) {
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
export function getAllParentScroller(el) {
  var allParentScroller = [];
  var element = el;
  while (element !== window) {
    element = getParentScroller(element);
    allParentScroller.push(element);
  }
  return allParentScroller;
}
export function getTarget(target, componentName) {
  if (isString(target)) {
    var el = document.querySelector(target);
    if (!el) {
      error(componentName, 'target element cannot found');
    }
    return el;
  }
  if (isObject(target)) return target;
  error(componentName, 'type of prop "target" should be a selector or an element object');
}
export function getViewportSize() {
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

// example 1rem
export var isRem = value => isString(value) && value.endsWith('rem');

// e.g. 1 || 1px
export var isPx = value => isString(value) && value.endsWith('px') || isNumber(value);

// e.g. 1%
export var isPercent = value => isString(value) && value.endsWith('%');

// e.g. 1vw
export var isVw = value => isString(value) && value.endsWith('vw');

// e.g. 1vh
export var isVh = value => isString(value) && value.endsWith('vh');

// e.g. 1vmin
export var isVMin = value => isString(value) && value.endsWith('vmin');

// e.g. 1vmax
export var isVMax = value => isString(value) && value.endsWith('vmax');

// e.g. calc(1px + 1px)
export var isCalc = value => isString(value) && value.startsWith('calc(');

// e.g. var(--color-primary)
export var isVar = value => isString(value) && value.startsWith('var(');

// e.g. return 1
export var toPxNum = value => {
  if (isNumber(value)) {
    return value;
  }
  if (isPx(value)) {
    return +value.replace('px', '');
  }
  if (isVw(value)) {
    return +value.replace('vw', '') * window.innerWidth / 100;
  }
  if (isVh(value)) {
    return +value.replace('vh', '') * window.innerHeight / 100;
  }
  if (isRem(value)) {
    var num = +value.replace('rem', '');
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

  // % and other
  return 0;
};

// e.g. return 1px 1% 1vw 1vh 1rem null var(--color-primary) calc(1px + 1px)
export var toSizeUnit = value => {
  if (value == null) {
    return undefined;
  }
  if (isPercent(value) || isVw(value) || isVh(value) || isRem(value) || isCalc(value) || isVar(value) || isVMin(value) || isVMax(value)) {
    return value;
  }
  return toPxNum(value) + "px";
};
export var multiplySizeUnit = function (value, quantity) {
  if (quantity === void 0) {
    quantity = 1;
  }
  if (value == null) {
    return undefined;
  }
  var legalSize = toSizeUnit(value);
  var unit = legalSize.match(/(vh|%|rem|px|vw)$/)[0];
  return "" + parseFloat(legalSize) * quantity + unit;
};
export function requestAnimationFrame(fn) {
  var globalThis = getGlobalThis();
  return globalThis.requestAnimationFrame ? globalThis.requestAnimationFrame(fn) : globalThis.setTimeout(fn, 16);
}
export function cancelAnimationFrame(handle) {
  var globalThis = getGlobalThis();
  globalThis.cancelAnimationFrame ? globalThis.cancelAnimationFrame(handle) : globalThis.clearTimeout(handle);
}
export function nextTickFrame(fn) {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn);
  });
}
export function doubleRaf() {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}
export function raf() {
  return new Promise(resolve => {
    requestAnimationFrame(resolve);
  });
}
export function scrollTo(element, _ref) {
  var {
    top = 0,
    left = 0,
    duration = 300,
    animation
  } = _ref;
  var startTime = Date.now();
  var scrollTop = getScrollTop(element);
  var scrollLeft = getScrollLeft(element);
  return new Promise(resolve => {
    var frame = () => {
      var progress = (Date.now() - startTime) / duration;
      if (progress < 1) {
        var nextTop = scrollTop + (top - scrollTop) * animation(progress);
        var nextLeft = scrollLeft + (left - scrollLeft) * animation(progress);
        element.scrollTo(nextLeft, nextTop);
        requestAnimationFrame(frame);
      } else {
        element.scrollTo(left, top);
        resolve();
      }
    };
    requestAnimationFrame(frame);
  });
}
export function formatStyleVars(styleVars) {
  return Object.entries(styleVars != null ? styleVars : {}).reduce((styles, _ref2) => {
    var [key, value] = _ref2;
    var cssVar = key.startsWith('--') ? key : "--" + kebabCase(key);
    styles[cssVar] = value;
    return styles;
  }, {});
}
export function supportTouch() {
  var inBrowser = typeof window !== 'undefined';
  return inBrowser && 'ontouchstart' in window;
}
export function padStartFlex(style) {
  return style === 'start' || style === 'end' ? "flex-" + style : style;
}