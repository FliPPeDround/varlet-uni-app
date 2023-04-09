import { defineListenerProp } from '../utils/components.mjs';
export var props = {
  name: {
    type: [String, Number]
  },
  disabled: {
    type: Boolean,
    default: false
  },
  onClick: defineListenerProp()
};