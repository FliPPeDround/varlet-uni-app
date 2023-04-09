import { defineListenerProp } from '../utils/components.mjs';
export var props = {
  active: {
    type: [String, Number],
    default: 0
  },
  canSwipe: {
    type: Boolean,
    default: true
  },
  loop: {
    type: Boolean,
    default: false
  },
  'onUpdate:active': defineListenerProp()
};