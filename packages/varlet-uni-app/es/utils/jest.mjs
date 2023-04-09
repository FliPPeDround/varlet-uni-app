function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import { nextTick } from 'vue';
import { config } from '@vue/test-utils';
import { isPlainObject } from '@varlet/shared';
export var delay = time => new Promise(resolve => setTimeout(resolve, time));
export function getTouch(el, x, y) {
  return {
    identifier: Date.now(),
    target: el,
    pageX: x,
    pageY: y,
    clientX: x,
    clientY: y,
    radiusX: 2.5,
    radiusY: 2.5,
    rotationAngle: 10,
    force: 0.5
  };
}
export function mockDoubleRaf() {
  var originMethod = window.requestAnimationFrame;
  Object.assign(window, {
    requestAnimationFrame(fn) {
      setTimeout(fn, 16);
    }
  });
  return {
    mockRestore() {
      window.requestAnimationFrame = originMethod;
    }
  };
}
export function trigger(wrapper, eventName, x, y, offsetX, offsetY) {
  if (x === void 0) {
    x = 0;
  }
  if (y === void 0) {
    y = 0;
  }
  if (offsetX === void 0) {
    offsetX = 0;
  }
  if (offsetY === void 0) {
    offsetY = 0;
  }
  var el = 'element' in wrapper ? wrapper.element : wrapper;
  var touchList = [getTouch(el, x, y)];
  var event = new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true,
    detail: {}
  });
  Object.assign(event, {
    clientX: x,
    clientY: y,
    offsetX,
    offsetY,
    touches: touchList,
    targetTouches: touchList,
    changedTouches: touchList
  });
  el.dispatchEvent(event);
  return nextTick();
}
export function mockOffset(_temp) {
  var {
    offsetWidth,
    offsetHeight,
    clientWidth,
    clientHeight,
    offsetLeft,
    offsetTop
  } = _temp === void 0 ? {} : _temp;
  Object.defineProperties(HTMLElement.prototype, {
    offsetWidth: {
      get() {
        return offsetWidth != null ? offsetWidth : parseFloat(window.getComputedStyle(this).width) || 0;
      }
    },
    offsetHeight: {
      get() {
        return offsetHeight != null ? offsetHeight : parseFloat(window.getComputedStyle(this).height) || 0;
      }
    },
    clientWidth: {
      get() {
        return clientWidth != null ? clientWidth : parseFloat(window.getComputedStyle(this).width) || 0;
      }
    },
    clientHeight: {
      get() {
        return clientHeight != null ? clientHeight : parseFloat(window.getComputedStyle(this).height) || 0;
      }
    },
    offsetLeft: {
      get() {
        return offsetLeft != null ? offsetLeft : parseFloat(window.getComputedStyle(this).marginLeft) || 0;
      }
    },
    offsetTop: {
      get() {
        return offsetTop != null ? offsetTop : parseFloat(window.getComputedStyle(this).marginTop) || 0;
      }
    },
    offsetParent: {
      get() {
        var _this$parentNode;
        return (_this$parentNode = this.parentNode) != null ? _this$parentNode : {};
      }
    }
  });
}
export function mockImageNaturalSize(naturalWidth, naturalHeight) {
  Object.defineProperties(HTMLImageElement.prototype, {
    naturalWidth: {
      get() {
        return naturalWidth;
      }
    },
    naturalHeight: {
      get() {
        return naturalHeight;
      }
    }
  });
}
export function triggerDrag(_x, _x2, _x3) {
  return _triggerDrag.apply(this, arguments);
}
function _triggerDrag() {
  _triggerDrag = _asyncToGenerator(function* (el, x, y) {
    if (x === void 0) {
      x = 0;
    }
    if (y === void 0) {
      y = 0;
    }
    yield trigger(el, 'touchstart', 0, 0);
    yield trigger(el, 'touchmove', x / 4, y / 4);
    yield trigger(el, 'touchmove', x / 3, y / 3);
    yield trigger(el, 'touchmove', x / 2, y / 2);
    yield trigger(el, 'touchmove', x, y);
    yield trigger(el, 'touchend', x, y);
  });
  return _triggerDrag.apply(this, arguments);
}
export function mockTranslate() {
  var originMethod = window.getComputedStyle;
  var XRE = /translateX\((\d+)px\)/;
  var YRE = /translateY\((\d+)px\)/;
  Object.assign(window, {
    getComputedStyle: el => {
      var _styles$transform$mat, _styles$transform$mat2, _styles$transform$mat3, _styles$transform$mat4;
      var styles = originMethod.call(window, el);
      var x = (_styles$transform$mat = (_styles$transform$mat2 = styles.transform.match(XRE)) == null ? void 0 : _styles$transform$mat2[1]) != null ? _styles$transform$mat : 0;
      var y = (_styles$transform$mat3 = (_styles$transform$mat4 = styles.transform.match(YRE)) == null ? void 0 : _styles$transform$mat4[1]) != null ? _styles$transform$mat3 : 0;
      styles.transform = "matrix(1, 0, 0, 1, " + x + ", " + y + ")";
      return styles;
    }
  });
  return {
    mockRestore() {
      window.getComputedStyle = originMethod;
    }
  };
}
export function mockFileReader(url) {
  var originMethod = window.FileReader;
  class FileReader {
    constructor() {
      this.result = '';
    }
    onload() {}
    readAsDataURL() {
      this.result = url;
      this.onload();
    }
  }
  Object.assign(window, {
    FileReader
  });
  return {
    mockRestore() {
      window.FileReader = originMethod;
    }
  };
}
export function mockStubs() {
  var originStubs = config.global.stubs;
  config.global.stubs = {};
  return {
    mockRestore() {
      config.global.stubs = originStubs;
    }
  };
}
export function mockConsole(method, fn) {
  if (fn === void 0) {
    fn = () => {};
  }
  var originMethod = console[method];
  console[method] = fn;
  return {
    mockRestore() {
      console[method] = originMethod;
    }
  };
}
export function mockScrollTo(Element) {
  Element.prototype.scrollTo = function (x, y) {
    if (isPlainObject(x)) {
      this.scrollLeft = x.left;
      this.scrollTop = x.top;
    } else {
      this.scrollLeft = x;
      this.scrollTop = y;
    }
  };
}
export function mockUserAgent(userAgent) {
  var originUserAgent = navigator.userAgent;
  Object.defineProperty(window.navigator, 'userAgent', {
    configurable: true,
    get() {
      return userAgent;
    }
  });
  return {
    restore() {
      Object.defineProperty(window.navigator, 'userAgent', {
        configurable: true,
        get() {
          return originUserAgent;
        }
      });
    }
  };
}