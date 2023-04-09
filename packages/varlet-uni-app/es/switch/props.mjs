import { defineListenerProp } from '../utils/components.mjs';
export var props = {
  modelValue: {
    default: false
  },
  activeValue: {
    default: true
  },
  inactiveValue: {
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  color: {
    type: String
  },
  loadingColor: {
    type: String
  },
  closeColor: {
    type: String
  },
  size: {
    type: [String, Number]
  },
  rules: {
    type: Array
  },
  ripple: {
    type: Boolean,
    default: true
  },
  onClick: defineListenerProp(),
  onChange: defineListenerProp(),
  'onUpdate:modelValue': defineListenerProp()
};