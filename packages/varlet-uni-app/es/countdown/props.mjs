import { defineListenerProp } from '../utils/components.mjs';
export var props = {
  time: {
    type: [String, Number],
    default: 0
  },
  format: {
    type: String,
    default: 'HH : mm : ss'
  },
  autoStart: {
    type: Boolean,
    default: true
  },
  onEnd: defineListenerProp(),
  onChange: defineListenerProp()
};