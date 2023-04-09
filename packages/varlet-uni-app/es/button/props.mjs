function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { props as loadingProps } from '../loading/props.mjs';
import { defineListenerProp, pickProps } from '../utils/components.mjs';
export function typeValidator(type) {
  return ['default', 'primary', 'info', 'success', 'warning', 'danger'].includes(type);
}
export function sizeValidator(size) {
  return ['normal', 'mini', 'small', 'large'].includes(size);
}
export function nativeTypeValidator(nativeType) {
  return ['button', 'reset', 'submit'].includes(nativeType);
}
export var props = {
  type: {
    type: String,
    validator: typeValidator
  },
  nativeType: {
    type: String,
    default: 'button',
    validator: nativeTypeValidator
  },
  size: {
    type: String,
    validator: sizeValidator
  },
  loading: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  text: {
    type: Boolean,
    default: false
  },
  outline: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  ripple: {
    type: Boolean,
    default: true
  },
  color: {
    type: String
  },
  textColor: {
    type: String
  },
  elevation: {
    type: [Boolean, Number, String],
    default: true
  },
  autoLoading: {
    type: Boolean,
    default: false
  },
  loadingRadius: {
    type: [Number, String]
  },
  loadingType: pickProps(loadingProps, 'type'),
  loadingSize: pickProps(loadingProps, 'size'),
  loadingColor: _extends({}, pickProps(loadingProps, 'color'), {
    default: 'currentColor'
  }),
  onClick: defineListenerProp(),
  onTouchstart: defineListenerProp()
};