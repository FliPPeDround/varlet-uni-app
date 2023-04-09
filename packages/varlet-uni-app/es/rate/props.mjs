import { defineListenerProp } from '../utils/components.mjs';
export var props = {
  modelValue: {
    type: [String, Number],
    default: 0
  },
  count: {
    type: [String, Number],
    default: 5
  },
  color: {
    type: String
  },
  icon: {
    type: String,
    default: 'star'
  },
  emptyColor: {
    type: String
  },
  emptyIcon: {
    type: String,
    default: 'star-outline'
  },
  size: {
    type: [String, Number]
  },
  gap: {
    type: [String, Number]
  },
  namespace: {
    type: String
  },
  half: {
    type: Boolean,
    default: false
  },
  halfIcon: {
    type: String,
    default: 'star-half-full'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  disabledColor: {
    type: String
  },
  readonly: {
    type: Boolean,
    default: false
  },
  ripple: {
    type: Boolean,
    default: true
  },
  rules: {
    type: Array
  },
  onChange: defineListenerProp(),
  'onUpdate:modelValue': defineListenerProp()
};