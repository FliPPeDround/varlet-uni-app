import { isFunction, camelize } from '@varlet/shared';
function shouldDisabled(arg) {
  if (!arg) {
    return false;
  }
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (arg === 'desktop' && isMobile) {
    return true;
  }
  if (arg === 'mobile' && !isMobile) {
    return true;
  }
  return false;
}
function getStyle(element) {
  var style = element.getAttribute('style');
  if (!style) return {};
  return style.split(';').filter(Boolean).reduce((style, item) => {
    var [key, value] = item.split(':').map(item => item.trim());
    style[camelize(key)] = value;
    return style;
  }, {});
}
function updateRawStyle(element) {
  var {
    value
  } = element._hover;
  var style = getStyle(element);
  Object.keys(value).forEach(key => {
    var camelizedKey = camelize(key);
    var styleValue = value[camelizedKey];
    if (styleValue != null && style[camelizedKey]) {
      element._hover.rawStyle[camelizedKey] = style[camelizedKey];
    }
  });
}
function updateStyle(element, styleValue) {
  Object.keys(styleValue).forEach(key => {
    var value = styleValue[key];
    if (value != null) {
      element.style[key] = value;
    }
  });
}
function clearStyle(element) {
  Object.keys(element._hover.value).forEach(key => {
    var value = element._hover.value[key];
    if (value != null) {
      element.style[key] = '';
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
  element.addEventListener('mouseenter', createHover);
  element.addEventListener('mouseleave', removeHover);
}
function unmounted(element, binding) {
  if (shouldDisabled(binding.arg)) {
    return;
  }
  restoreStyle(element);
  element.removeEventListener('mouseenter', createHover);
  element.removeEventListener('mouseleave', removeHover);
}
function beforeUpdate(element, binding) {
  if (!element._hover) {
    // issue #942
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
    app.directive('hover', this);
  }
};
export var _HoverComponent = Hover;
export default Hover;