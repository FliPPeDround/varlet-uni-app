import { defineListenerProp } from '../utils/components.mjs';
function typeValidator(type) {
  return ['default', 'primary', 'info', 'success', 'warning', 'danger'].includes(type);
}
function underlineValidator(status) {
  return ['always', 'hover', 'none'].includes(status);
}
export var props = {
  type: {
    type: String,
    default: 'default',
    validator: typeValidator
  },
  href: {
    type: String
  },
  target: {
    type: String
  },
  to: {
    type: [String, Object]
  },
  replace: {
    type: Boolean,
    default: false
  },
  underline: {
    type: String,
    default: 'always',
    validator: underlineValidator
  },
  disabled: {
    type: Boolean,
    default: false
  },
  textSize: {
    type: [String, Number]
  },
  textColor: {
    type: String
  },
  onClick: defineListenerProp()
};