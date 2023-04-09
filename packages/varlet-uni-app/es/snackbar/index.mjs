import { isVNode as _isVNode, createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import VarSnackbarCore from './core.mjs';
import VarSnackbar from './Snackbar.mjs';
import context from '../context/index.mjs';
import { reactive, TransitionGroup } from 'vue';
import { call, mountInstance } from '../utils/components.mjs';
import { isPlainObject, isString, toNumber } from '@varlet/shared';
function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}
export var SNACKBAR_TYPE = ['loading', 'success', 'warning', 'info', 'error'];
var sid = 0;
var isMount = false;
var unmount;
var isAllowMultiple = false;
var defaultOptionsValue = {
  type: undefined,
  content: '',
  position: 'top',
  duration: 3000,
  vertical: false,
  contentClass: undefined,
  loadingType: 'circle',
  loadingSize: 'normal',
  lockScroll: false,
  teleport: 'body',
  forbidClick: false,
  onOpen: () => {},
  onOpened: () => {},
  onClose: () => {},
  onClosed: () => {}
};
var uniqSnackbarOptions = reactive([]);
var defaultOptions = defaultOptionsValue;
var transitionGroupProps = {
  name: 'var-snackbar-fade',
  tag: 'div',
  class: 'var-transition-group'
};
var TransitionGroupHost = {
  setup() {
    return () => {
      var snackbarList = uniqSnackbarOptions.map(_ref => {
        var {
          id,
          reactiveSnackOptions,
          _update
        } = _ref;
        var transitionGroupEl = document.querySelector('.var-transition-group');
        if (reactiveSnackOptions.forbidClick || reactiveSnackOptions.type === 'loading') {
          ;
          transitionGroupEl.classList.add('var-pointer-auto');
        } else {
          ;
          transitionGroupEl.classList.remove('var-pointer-auto');
        }
        if (isAllowMultiple) reactiveSnackOptions.position = 'top';
        var position = isAllowMultiple ? 'relative' : 'absolute'; // avoid stylelint value-keyword-case error

        var style = _extends({
          position
        }, getTop(reactiveSnackOptions.position));
        return _createVNode(VarSnackbarCore, _mergeProps(reactiveSnackOptions, {
          "key": id,
          "style": style,
          "data-id": id,
          "_update": _update,
          'show': reactiveSnackOptions.show,
          "onUpdate:show": $event => reactiveSnackOptions.show = $event
        }), null);
      });
      return _createVNode(TransitionGroup, _mergeProps(transitionGroupProps, {
        "style": {
          zIndex: context.zIndex
        },
        "onAfterEnter": opened,
        "onAfterLeave": removeUniqOption
      }), _isSlot(snackbarList) ? snackbarList : {
        default: () => [snackbarList]
      });
    };
  }
};
var Snackbar = function (options) {
  var snackOptions = normalizeOptions(options);
  var reactiveSnackOptions = reactive(_extends({}, defaultOptions, snackOptions));
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
SNACKBAR_TYPE.forEach(type => {
  Snackbar[type] = options => {
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
Snackbar.install = function (app) {
  app.component(VarSnackbar.name, VarSnackbar);
};
Snackbar.allowMultiple = function (bool) {
  if (bool === void 0) {
    bool = false;
  }
  if (bool !== isAllowMultiple) {
    uniqSnackbarOptions.forEach(option => {
      option.reactiveSnackOptions.show = false;
    });
    isAllowMultiple = bool;
  }
};
Snackbar.clear = function () {
  uniqSnackbarOptions.forEach(option => {
    option.reactiveSnackOptions.show = false;
  });
};
Snackbar.setDefaultOptions = function (options) {
  defaultOptions = options;
};
Snackbar.resetDefaultOptions = function () {
  defaultOptions = defaultOptionsValue;
};
Snackbar.Component = VarSnackbar;
function opened(element) {
  var id = element.getAttribute('data-id');
  var option = uniqSnackbarOptions.find(option => option.id === toNumber(id));
  if (option) {
    call(option.reactiveSnackOptions.onOpened);
  }
}
function removeUniqOption(element) {
  element.parentElement && element.parentElement.classList.remove('var-pointer-auto');
  var id = element.getAttribute('data-id');
  var option = uniqSnackbarOptions.find(option => option.id === toNumber(id));
  if (option) {
    option.animationEnd = true;
    call(option.reactiveSnackOptions.onClosed);
  }
  var isAllAnimationEnd = uniqSnackbarOptions.every(option => option.animationEnd);
  if (isAllAnimationEnd) {
    call(unmount);
    uniqSnackbarOptions = reactive([]);
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
  firstOption.reactiveSnackOptions = _extends({}, firstOption.reactiveSnackOptions, reactiveSnackOptions);
  firstOption._update = _update;
}
function getTop(position) {
  if (position === void 0) {
    position = 'top';
  }
  if (position === 'bottom') return {
    [position]: '5%'
  };
  return {
    top: position === 'top' ? '5%' : '45%'
  };
}
VarSnackbar.install = function (app) {
  app.component(VarSnackbar.name, VarSnackbar);
};
export { props as snackbarProps } from './props.mjs';
export var _SnackbarComponent = VarSnackbar;
export default Snackbar;