import { defineListenerProp } from '../utils/components.mjs';
export var props = {
  modelValue: {
    type: [String, Number],
    default: 0
  },
  min: {
    type: [String, Number]
  },
  max: {
    type: [String, Number]
  },
  step: {
    type: [String, Number],
    default: 1
  },
  color: {
    type: String
  },
  inputWidth: {
    type: [String, Number]
  },
  inputTextSize: {
    type: [String, Number]
  },
  buttonSize: {
    type: [String, Number]
  },
  elevation: {
    type: [Boolean, Number, String],
    default: true
  },
  decimalLength: {
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
  disableIncrement: {
    type: Boolean,
    default: false
  },
  disableDecrement: {
    type: Boolean,
    default: false
  },
  disableInput: {
    type: Boolean,
    default: false
  },
  lazyChange: {
    type: Boolean,
    default: false
  },
  incrementButton: {
    type: Boolean,
    default: true
  },
  decrementButton: {
    type: Boolean,
    default: true
  },
  press: {
    type: Boolean,
    default: true
  },
  ripple: {
    type: Boolean,
    default: true
  },
  validateTrigger: {
    type: Array,
    default: () => ['onInputChange', 'onLazyChange', 'onIncrement', 'onDecrement']
  },
  rules: {
    type: Array
  },
  onBeforeChange: defineListenerProp(),
  onChange: defineListenerProp(),
  onIncrement: defineListenerProp(),
  onDecrement: defineListenerProp(),
  'onUpdate:modelValue': defineListenerProp()
};