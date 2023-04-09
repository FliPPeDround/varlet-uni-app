function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import VarDialog from './Dialog.mjs';
import { reactive, nextTick } from 'vue';
import { inBrowser, isString } from '@varlet/shared';
import { call, mountInstance } from '../utils/components.mjs';
var singletonOptions;
var defaultOptions = {};
function normalizeOptions(options) {
  if (options === void 0) {
    options = {};
  }
  if (isString(options)) {
    return _extends({}, defaultOptions, {
      message: options
    });
  }
  return _extends({}, defaultOptions, options);
}
function Dialog(options) {
  if (!inBrowser()) {
    return Promise.resolve();
  }
  return new Promise(resolve => {
    Dialog.close();
    var dialogOptions = normalizeOptions(options);
    var reactiveDialogOptions = reactive(dialogOptions);
    reactiveDialogOptions.teleport = 'body';
    singletonOptions = reactiveDialogOptions;
    var {
      unmountInstance
    } = mountInstance(VarDialog, reactiveDialogOptions, {
      onConfirm: () => {
        call(reactiveDialogOptions.onConfirm);
        resolve('confirm');
      },
      onCancel: () => {
        call(reactiveDialogOptions.onCancel);
        resolve('cancel');
      },
      onClose: () => {
        call(reactiveDialogOptions.onClose);
        resolve('close');
      },
      onClosed: () => {
        call(reactiveDialogOptions.onClosed);
        unmountInstance();
        singletonOptions === reactiveDialogOptions && (singletonOptions = null);
      },
      onRouteChange: () => {
        unmountInstance();
        singletonOptions === reactiveDialogOptions && (singletonOptions = null);
      },
      'onUpdate:show': value => {
        reactiveDialogOptions.show = value;
      }
    });
    reactiveDialogOptions.show = true;
  });
}
Dialog.setDefaultOptions = function (options) {
  defaultOptions = options;
};
Dialog.resetDefaultOptions = function () {
  defaultOptions = {};
};
Dialog.close = function () {
  if (singletonOptions != null) {
    var prevSingletonOptions = singletonOptions;
    singletonOptions = null;
    nextTick().then(() => {
      prevSingletonOptions.show = false;
    });
  }
};
VarDialog.install = function (app) {
  app.component(VarDialog.name, VarDialog);
};
Dialog.install = function (app) {
  app.component(VarDialog.name, VarDialog);
};
Dialog.Component = VarDialog;
export { props as dialogProps } from './props.mjs';
export var _DialogComponent = VarDialog;
export default Dialog;