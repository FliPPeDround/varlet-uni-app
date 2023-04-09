function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import VarActionSheet from './ActionSheet.mjs';
import { nextTick, reactive } from 'vue';
import { inBrowser } from '@varlet/shared';
import { call, mountInstance } from '../utils/components.mjs';
var singletonOptions;
var defaultOptions = {};
function normalizeOptions(options) {
  if (options === void 0) {
    options = {};
  }
  return _extends({}, defaultOptions, options);
}
function ActionSheet(options) {
  if (!inBrowser()) {
    return Promise.resolve();
  }
  return new Promise(resolve => {
    ActionSheet.close();
    var reactiveActionSheetOptions = reactive(normalizeOptions(options));
    reactiveActionSheetOptions.teleport = 'body';
    singletonOptions = reactiveActionSheetOptions;
    var {
      unmountInstance
    } = mountInstance(VarActionSheet, reactiveActionSheetOptions, {
      onSelect: action => {
        call(reactiveActionSheetOptions.onSelect, action);
        resolve(action);
      },
      onClose: () => {
        call(reactiveActionSheetOptions.onClose);
        resolve('close');
      },
      onClosed: () => {
        call(reactiveActionSheetOptions.onClosed);
        unmountInstance();
        singletonOptions === reactiveActionSheetOptions && (singletonOptions = null);
      },
      onRouteChange: () => {
        unmountInstance();
        singletonOptions === reactiveActionSheetOptions && (singletonOptions = null);
      },
      'onUpdate:show': value => {
        reactiveActionSheetOptions.show = value;
      }
    });
    reactiveActionSheetOptions.show = true;
  });
}
ActionSheet.setDefaultOptions = function (options) {
  defaultOptions = options;
};
ActionSheet.resetDefaultOptions = function () {
  defaultOptions = {};
};
ActionSheet.close = function () {
  if (singletonOptions != null) {
    var prevSingletonOptions = singletonOptions;
    singletonOptions = null;
    nextTick().then(() => {
      prevSingletonOptions.show = false;
    });
  }
};
ActionSheet.Component = VarActionSheet;
VarActionSheet.install = function (app) {
  app.component(VarActionSheet.name, VarActionSheet);
};
ActionSheet.install = function (app) {
  app.component(VarActionSheet.name, VarActionSheet);
};
export { props as actionSheetProps } from './props.mjs';
export var _ActionSheetComponent = VarActionSheet;
export default ActionSheet;