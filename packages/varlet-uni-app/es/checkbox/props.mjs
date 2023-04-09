import { defineListenerProp } from '../utils/components.mjs';
export var props = {
  modelValue: {
    type: [String, Number, Boolean, Object, Array],
    default: false
  },
  checkedValue: {
    type: [String, Number, Boolean, Object, Array],
    default: true
  },
  uncheckedValue: {
    type: [String, Number, Boolean, Object, Array],
    default: false
  },
  checkedColor: {
    type: String
  },
  uncheckedColor: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  iconSize: {
    type: [String, Number]
  },
  ripple: {
    type: Boolean,
    default: true
  },
  validateTrigger: {
    type: Array,
    default: ['onChange']
  },
  rules: {
    type: Array
  },
  onClick: defineListenerProp(),
  onChange: defineListenerProp(),
  'onUpdate:modelValue': defineListenerProp()
};