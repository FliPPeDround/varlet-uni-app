import { removeItem } from '@varlet/shared';
export var isHTMLSupportImage = val => {
  if (val == null) {
    return false;
  }
  return val.startsWith('data:image') || /\.(png|jpg|gif|jpeg|svg|webp)$/.test(val);
};
export var isHTMLSupportVideo = val => {
  if (val == null) {
    return false;
  }
  return val.startsWith('data:video') || /\.(mp4|webm|ogg)$/.test(val);
};
export var createCache = max => {
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
      this.cache.length === max && cache.shift();
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
export var linear = value => value;
export var cubic = value => Math.pow(value, 3);
export var easeInOutCubic = value => value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;
export var dt = (value, defaultText) => value == null ? defaultText : value;
export var getGlobalThis = () => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof window !== 'undefined') return window;
  return typeof global !== 'undefined' ? global : self;
};
export var padStart = function (str, maxLength, fillString) {
  if (str === void 0) {
    str = '';
  }
  if (fillString === void 0) {
    fillString = '';
  }
  if (str.length >= maxLength) return str;
  var len = maxLength - str.length;
  var repeatCount = Math.floor(len / fillString.length);
  return fillString.repeat(repeatCount) + fillString.slice(0, len % fillString.length) + str;
};