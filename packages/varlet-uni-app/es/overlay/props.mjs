import { defineListenerProp } from '../utils/components.mjs';
export var props = {
  show: {
    type: Boolean,
    default: false
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  teleport: {
    type: String
  },
  onClick: defineListenerProp(),
  'onUpdate:show': defineListenerProp()
};