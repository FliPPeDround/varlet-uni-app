import { defineListenerProp } from '../utils/components.mjs';
export function typeValidator(type) {
  return ['text', 'password', 'number'].includes(type);
}
export var props = {
  modelValue: {
    type: String
  },
  modelModifiers: {
    type: Object,
    default: () => ({})
  },
  type: {
    type: String,
    default: 'text',
    validator: typeValidator
  },
  textarea: {
    type: Boolean,
    default: false
  },
  rows: {
    type: [String, Number],
    default: 8
  },
  placeholder: {
    type: String
  },
  line: {
    type: Boolean,
    default: true
  },
  hint: {
    type: Boolean,
    default: true
  },
  textColor: {
    type: String
  },
  focusColor: {
    type: String
  },
  blurColor: {
    type: String
  },
  maxlength: {
    type: [String, Number]
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  resize: {
    type: Boolean,
    default: false
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  validateTrigger: {
    type: Array,
    default: () => ['onInput', 'onClear']
  },
  rules: {
    type: Array
  },
  onFocus: defineListenerProp(),
  onBlur: defineListenerProp(),
  onClick: defineListenerProp(),
  onClear: defineListenerProp(),
  onInput: defineListenerProp(),
  onChange: defineListenerProp(),
  'onUpdate:modelValue': defineListenerProp()
};