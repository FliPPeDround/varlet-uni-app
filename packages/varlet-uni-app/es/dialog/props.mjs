function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { defineListenerProp, pickProps } from '../utils/components.mjs';
import { props as popupProps } from '../popup/props.mjs';
function messageAlignValidator(messageAlign) {
  return ['left', 'center', 'right'].includes(messageAlign);
}
export var props = _extends({
  show: {
    type: Boolean,
    default: false
  },
  width: {
    type: [Number, String]
  },
  title: {
    type: String
  },
  message: {
    type: String
  },
  messageAlign: {
    type: String,
    default: 'left',
    validator: messageAlignValidator
  },
  confirmButton: {
    type: Boolean,
    default: true
  },
  cancelButton: {
    type: Boolean,
    default: true
  },
  confirmButtonText: {
    type: String
  },
  cancelButtonText: {
    type: String
  },
  confirmButtonTextColor: {
    type: String
  },
  cancelButtonTextColor: {
    type: String
  },
  confirmButtonColor: {
    type: String
  },
  cancelButtonColor: {
    type: String
  },
  dialogClass: {
    type: String
  },
  dialogStyle: {
    type: Object
  },
  onBeforeClose: defineListenerProp(),
  onConfirm: defineListenerProp(),
  onCancel: defineListenerProp(),
  'onUpdate:show': defineListenerProp()
}, pickProps(popupProps, ['overlay', 'overlayClass', 'overlayStyle', 'lockScroll', 'closeOnClickOverlay', 'teleport', 'onOpen', 'onClose', 'onOpened', 'onClosed', 'onClickOverlay',
// internal for function call closes the dialog
'onRouteChange']));