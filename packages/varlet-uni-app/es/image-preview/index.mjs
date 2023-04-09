function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import VarImagePreview from './ImagePreview.mjs';
import { nextTick, reactive } from 'vue';
import { inBrowser, isArray, isString } from '@varlet/shared';
import { call, mountInstance } from '../utils/components.mjs';
var singletonOptions;
var defaultOptions = {};
function normalizeOptions(options) {
  if (options === void 0) {
    options = {};
  }
  if (isString(options)) {
    return _extends({}, defaultOptions, {
      images: [options]
    });
  }
  if (isArray(options)) {
    return _extends({}, defaultOptions, {
      images: options
    });
  }
  return _extends({}, defaultOptions, options);
}
function ImagePreview(options) {
  if (!inBrowser()) {
    return;
  }
  ImagePreview.close();
  var imagePreviewOptions = normalizeOptions(options);
  var reactiveImagePreviewOptions = reactive(imagePreviewOptions);
  reactiveImagePreviewOptions.teleport = 'body';
  singletonOptions = reactiveImagePreviewOptions;
  var {
    unmountInstance
  } = mountInstance(VarImagePreview, reactiveImagePreviewOptions, {
    onClose: () => call(reactiveImagePreviewOptions.onClose),
    onClosed: () => {
      call(reactiveImagePreviewOptions.onClosed);
      unmountInstance();
      singletonOptions === reactiveImagePreviewOptions && (singletonOptions = null);
    },
    onRouteChange: () => {
      unmountInstance();
      singletonOptions === reactiveImagePreviewOptions && (singletonOptions = null);
    },
    'onUpdate:show': value => {
      reactiveImagePreviewOptions.show = value;
    }
  });
  reactiveImagePreviewOptions.show = true;
}
ImagePreview.close = () => {
  if (singletonOptions != null) {
    var prevSingletonOptions = singletonOptions;
    singletonOptions = null;
    nextTick().then(() => {
      prevSingletonOptions.show = false;
    });
  }
};
ImagePreview.setDefaultOptions = options => {
  defaultOptions = options;
};
ImagePreview.resetDefaultOptions = () => {
  defaultOptions = {};
};
VarImagePreview.install = function (app) {
  app.component(VarImagePreview.name, VarImagePreview);
};
ImagePreview.install = function (app) {
  app.component(VarImagePreview.name, VarImagePreview);
};
ImagePreview.Component = VarImagePreview;
export { props as imagePreviewProps } from './props.mjs';
export var _ImagePreviewComponent = VarImagePreview;
export default ImagePreview;