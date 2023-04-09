import { defineListenerProp } from '../utils/components.mjs';
export var props = {
  modelValue: {
    type: [Array, String, Number]
  },
  accordion: {
    type: Boolean,
    default: false
  },
  offset: {
    type: Boolean,
    default: true
  },
  divider: {
    type: Boolean,
    default: true
  },
  elevation: {
    type: [Boolean, String, Number],
    default: true
  },
  onChange: defineListenerProp(),
  'onUpdate:modelValue': defineListenerProp()
};