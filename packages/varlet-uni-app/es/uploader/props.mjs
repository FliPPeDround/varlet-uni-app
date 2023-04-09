import { defineListenerProp } from '../utils/components.mjs';
export var props = {
  modelValue: {
    type: Array,
    default: () => []
  },
  accept: {
    type: String,
    default: 'image/*'
  },
  capture: {
    type: [String, Boolean],
    default: undefined
  },
  multiple: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  elevation: {
    type: [Boolean, Number, String],
    default: true
  },
  removable: {
    type: Boolean,
    default: true
  },
  maxlength: {
    type: [Number, String]
  },
  maxsize: {
    type: [Number, String]
  },
  previewed: {
    type: Boolean,
    default: true
  },
  ripple: {
    type: Boolean,
    default: true
  },
  validateTrigger: {
    type: Array,
    default: () => ['onChange', 'onRemove']
  },
  rules: {
    type: Array
  },
  hideList: {
    type: Boolean,
    default: false
  },
  onBeforeRead: defineListenerProp(),
  onAfterRead: defineListenerProp(),
  onBeforeRemove: defineListenerProp(),
  onRemove: defineListenerProp(),
  onOversize: defineListenerProp(),
  'onUpdate:modelValue': defineListenerProp()
};