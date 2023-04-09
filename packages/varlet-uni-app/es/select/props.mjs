import { defineListenerProp } from '../utils/components.mjs';
export function textAlignValidator(textAlign) {
  return ['left', 'right', 'center'].includes(textAlign);
}
export var props = {
  modelValue: {
    default: undefined
  },
  placeholder: {
    type: String
  },
  multiple: {
    type: Boolean,
    default: false
  },
  offsetY: {
    type: [String, Number],
    default: 0
  },
  chip: {
    type: Boolean,
    default: false
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
  separator: {
    type: String,
    default: ','
  },
  textAlign: {
    type: String,
    default: 'left',
    validator: textAlignValidator
  },
  validateTrigger: {
    type: Array,
    default: () => ['onChange', 'onClear', 'onClose']
  },
  rules: {
    type: Array
  },
  onFocus: defineListenerProp(),
  onBlur: defineListenerProp(),
  onClick: defineListenerProp(),
  onClear: defineListenerProp(),
  onClose: defineListenerProp(),
  onChange: defineListenerProp(),
  'onUpdate:modelValue': defineListenerProp()
};