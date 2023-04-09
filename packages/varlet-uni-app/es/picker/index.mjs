import VarPicker from './Picker.mjs';
import { nextTick, reactive } from 'vue';
import { isArray } from '@varlet/shared';
import { call, mountInstance } from '../utils/components.mjs';
var singletonOptions;
function Picker(options) {
  return new Promise(resolve => {
    Picker.close();
    var pickerOptions = isArray(options) ? {
      columns: options
    } : options;
    var reactivePickerOptions = reactive(pickerOptions);
    reactivePickerOptions.dynamic = true;
    reactivePickerOptions.teleport = 'body';
    singletonOptions = reactivePickerOptions;
    var {
      unmountInstance
    } = mountInstance(VarPicker, reactivePickerOptions, {
      onConfirm: (texts, indexes) => {
        call(reactivePickerOptions.onConfirm, texts, indexes);
        resolve({
          state: 'confirm',
          texts,
          indexes
        });
        reactivePickerOptions.show = false;
        singletonOptions === reactivePickerOptions && (singletonOptions = null);
      },
      onCancel: (texts, indexes) => {
        call(reactivePickerOptions.onCancel, texts, indexes);
        resolve({
          state: 'cancel',
          texts,
          indexes
        });
        reactivePickerOptions.show = false;
        singletonOptions === reactivePickerOptions && (singletonOptions = null);
      },
      onClose: () => {
        call(reactivePickerOptions.onClose);
        resolve({
          state: 'close'
        });
        singletonOptions === reactivePickerOptions && (singletonOptions = null);
      },
      onClosed: () => {
        call(reactivePickerOptions.onClosed);
        unmountInstance();
        singletonOptions === reactivePickerOptions && (singletonOptions = null);
      },
      onRouteChange: () => {
        unmountInstance();
        singletonOptions === reactivePickerOptions && (singletonOptions = null);
      },
      'onUpdate:show': value => {
        reactivePickerOptions.show = value;
      }
    });
    reactivePickerOptions.show = true;
  });
}
VarPicker.install = function (app) {
  app.component(VarPicker.name, VarPicker);
};
Picker.Component = VarPicker;
Picker.install = function (app) {
  app.component(VarPicker.name, VarPicker);
};
Picker.close = function () {
  if (singletonOptions != null) {
    var prevSingletonOptions = singletonOptions;
    singletonOptions = null;
    nextTick().then(() => {
      prevSingletonOptions.show = false;
    });
  }
};
export { props as pickerProps } from './props.mjs';
export var _PickerComponent = VarPicker;
export default Picker;