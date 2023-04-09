import { defineListenerProp } from '../utils/components.mjs';
export var props = {
  active: {
    type: [Number, String],
    default: 0
  },
  fixed: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: false
  },
  safeArea: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: [Number, String],
    default: 1
  },
  activeColor: {
    type: String
  },
  inactiveColor: {
    type: String
  },
  onChange: defineListenerProp(),
  'onUpdate:active': defineListenerProp(),
  onBeforeChange: defineListenerProp(),
  onFabClick: defineListenerProp(),
  fabProps: {
    type: Object
  }
};