function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import context from '../context/index.mjs';
import { supportTouch } from '../utils/elements.mjs';
import { createNamespace } from '../utils/components.mjs';


var {
  n
} = createNamespace('ripple');
var ANIMATION_DURATION = 250;
function setStyles(element) {
  var {
    zIndex,
    position
  } = window.getComputedStyle(element);
  element.style.overflow = 'hidden';
  element.style.overflowX = 'hidden';
  element.style.overflowY = 'hidden';
  position === 'static' && (element.style.position = 'relative');
  zIndex === 'auto' && (element.style.zIndex = '1');
}
function computeRippleStyles(element, event) {
  var {
    top,
    left
  } = element.getBoundingClientRect();
  var {
    clientWidth,
    clientHeight
  } = element;
  var radius = Math.sqrt(Math.pow(clientWidth, 2) + Math.pow(clientHeight, 2)) / 2;
  var size = radius * 2;
  var localX = event.touches[0].clientX - left;
  var localY = event.touches[0].clientY - top;
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
  if (_ripple.disabled || _ripple.tasker || !context.enableRipple) {
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
    var ripple = document.createElement('div');
    ripple.classList.add(n());
    ripple.style.opacity = "0";
    ripple.style.transform = "translate(" + x + "px, " + y + "px) scale3d(.3, .3, .3)";
    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    _ripple.color && (ripple.style.backgroundColor = _ripple.color);
    ripple.dataset.createdAt = String(performance.now());
    setStyles(this);
    this.appendChild(ripple);
    window.setTimeout(() => {
      ripple.style.transform = "translate(" + centerX + "px, " + centerY + "px) scale3d(1, 1, 1)";
      ripple.style.opacity = ".25";
    }, 20);
  };
  _ripple.tasker = window.setTimeout(task, 30);
}
function removeRipple() {
  var _ripple = this._ripple;
  var task = () => {
    var ripples = this.querySelectorAll("." + n());
    if (!ripples.length) {
      return;
    }
    var lastRipple = ripples[ripples.length - 1];
    var delay = ANIMATION_DURATION - performance.now() + Number(lastRipple.dataset.createdAt);
    window.setTimeout(() => {
      lastRipple.style.opacity = "0";
      window.setTimeout(() => {
        var _lastRipple$parentNod;
        return (_lastRipple$parentNod = lastRipple.parentNode) == null ? void 0 : _lastRipple$parentNod.removeChild(lastRipple);
      }, ANIMATION_DURATION);
    }, delay);
  };
  _ripple.tasker ? window.setTimeout(task, 30) : task();
}
function forbidRippleTask() {
  if (!supportTouch() || !context.enableRipple) {
    return;
  }
  var _ripple = this._ripple;
  _ripple.tasker && window.clearTimeout(_ripple.tasker);
  _ripple.tasker = null;
}
function mounted(el, binding) {
  var _binding$value;
  el._ripple = _extends({
    tasker: null
  }, (_binding$value = binding.value) != null ? _binding$value : {}, {
    removeRipple: removeRipple.bind(el)
  });
  el.addEventListener('touchstart', createRipple, {
    passive: true
  });
  el.addEventListener('touchmove', forbidRippleTask, {
    passive: true
  });
  el.addEventListener('dragstart', removeRipple, {
    passive: true
  });
  document.addEventListener('touchend', el._ripple.removeRipple, {
    passive: true
  });
  document.addEventListener('touchcancel', el._ripple.removeRipple, {
    passive: true
  });
}
function unmounted(el) {
  el.removeEventListener('touchstart', createRipple);
  el.removeEventListener('touchmove', forbidRippleTask);
  el.removeEventListener('dragstart', removeRipple);
  document.removeEventListener('touchend', el._ripple.removeRipple);
  document.removeEventListener('touchcancel', el._ripple.removeRipple);
}
function updated(el, binding) {
  var _binding$value2, _binding$value3, _el$_ripple, _el$_ripple2;
  var newBinding = {
    color: (_binding$value2 = binding.value) == null ? void 0 : _binding$value2.color,
    disabled: (_binding$value3 = binding.value) == null ? void 0 : _binding$value3.disabled
  };
  var diff = newBinding.color !== ((_el$_ripple = el._ripple) == null ? void 0 : _el$_ripple.color) || newBinding.disabled !== ((_el$_ripple2 = el._ripple) == null ? void 0 : _el$_ripple2.disabled);
  if (diff) {
    var _el$_ripple3, _el$_ripple4;
    el._ripple = _extends({
      tasker: newBinding.disabled ? null : (_el$_ripple3 = el._ripple) == null ? void 0 : _el$_ripple3.tasker,
      removeRipple: (_el$_ripple4 = el._ripple) == null ? void 0 : _el$_ripple4.removeRipple
    }, newBinding);
  }
}
var Ripple = {
  mounted,
  unmounted,
  updated,
  install(app) {
    app.directive('ripple', this);
  }
};
export var _RippleComponent = Ripple;
export default Ripple;