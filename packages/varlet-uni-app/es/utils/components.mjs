function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { useEventListener } from '@varlet/use';
import { createApp, h, getCurrentInstance, isVNode, ref, onActivated, onDeactivated, Comment, Fragment } from 'vue';
import { inBrowser, isArray } from '@varlet/shared';
export function pickProps(props, propsKey) {
  return Array.isArray(propsKey) ? propsKey.reduce((pickedProps, key) => {
    pickedProps[key] = props[key];
    return pickedProps;
  }, {}) : props[propsKey];
}
export function mount(component) {
  var app = createApp(component);
  var host = document.createElement('div');
  document.body.appendChild(host);
  return {
    instance: app.mount(host),
    unmount() {
      app.unmount();
      document.body.removeChild(host);
    }
  };
}
export function mountInstance(component, props, eventListener) {
  if (props === void 0) {
    props = {};
  }
  if (eventListener === void 0) {
    eventListener = {};
  }
  var Host = {
    setup() {
      return () => h(component, _extends({}, props, eventListener));
    }
  };
  var {
    unmount
  } = mount(Host);
  return {
    unmountInstance: unmount
  };
}
export function flatFragment(vNodes) {
  var result = [];
  vNodes.forEach(vNode => {
    if (vNode.type === Comment) {
      return;
    }
    if (vNode.type === Fragment && isArray(vNode.children)) {
      vNode.children.forEach(item => {
        result.push(item);
      });
      return;
    }
    result.push(vNode);
  });
  return result;
}
export function flatVNodes(subTree) {
  var vNodes = [];
  var flat = subTree => {
    if (subTree != null && subTree.component) {
      flat(subTree == null ? void 0 : subTree.component.subTree);
      return;
    }
    if (Array.isArray(subTree == null ? void 0 : subTree.children)) {
      subTree.children.forEach(child => {
        if (isVNode(child)) {
          vNodes.push(child);
          flat(child);
        }
      });
    }
  };
  flat(subTree);
  return vNodes;
}
export function keyInProvides(key) {
  var instance = getCurrentInstance();
  return key in instance.provides;
}
export function useValidation() {
  var errorMessage = ref('');
  var validate = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (rules, value, apis) {
      if (!isArray(rules) || !rules.length) {
        return true;
      }
      var resArr = yield Promise.all(rules.map(rule => rule(value, apis)));
      return !resArr.some(res => {
        if (res !== true) {
          errorMessage.value = String(res);
          return true;
        }
        return false;
      });
    });
    return function validate(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
  var resetValidation = () => {
    errorMessage.value = '';
  };
  var validateWithTrigger = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* (validateTrigger, trigger, rules, value, apis) {
      if (validateTrigger.includes(trigger)) {
        ;
        (yield validate(rules, value, apis)) && (errorMessage.value = '');
      }
    });
    return function validateWithTrigger(_x4, _x5, _x6, _x7, _x8) {
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
export function useRouteListener(cb) {
  if (!inBrowser()) {
    return;
  }
  useEventListener(window, 'hashchange', cb);
  useEventListener(window, 'popstate', cb);
}
export function useTeleport() {
  var disabled = ref(false);
  onActivated(() => {
    disabled.value = false;
  });
  onDeactivated(() => {
    disabled.value = true;
  });
  return {
    disabled
  };
}
export function exposeApis(apis) {
  var instance = getCurrentInstance();
  if (instance) {
    Object.assign(instance.proxy, apis);
  }
}
export function createNamespace(name) {
  var namespace = "var";
  var componentName = namespace + "-" + name;
  var createBEM = suffix => {
    if (!suffix) return componentName;
    if (suffix[0] === '$') {
      return suffix.replace('$', namespace);
    }
    return suffix.startsWith('--') ? "" + componentName + suffix : componentName + "__" + suffix;
  };
  var classes = function () {
    for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
      classes[_key] = arguments[_key];
    }
    return classes.map(className => {
      if (isArray(className)) {
        var [condition, truthy, falsy = null] = className;
        return condition ? truthy : falsy;
      }
      return className;
    });
  };
  return {
    n: createBEM,
    classes
  };
}
export function call(fn) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  if (isArray(fn)) {
    return fn.map(f => f(...args));
  }
  if (fn) {
    return fn(...args);
  }
}
export function defineListenerProp(fallback) {
  return {
    type: [Function, Array],
    default: fallback
  };
}
export function formatElevation(elevation, defaultLevel) {
  if (elevation === false) {
    return null;
  }
  if (elevation === true && defaultLevel) {
    elevation = defaultLevel;
  }
  return "var-elevation--" + elevation;
}