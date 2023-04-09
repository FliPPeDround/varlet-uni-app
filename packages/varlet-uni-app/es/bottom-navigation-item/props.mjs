import { defineListenerProp } from '../utils/components.mjs';
export var props = {
  name: {
    type: String
  },
  icon: {
    type: String
  },
  label: {
    type: String
  },
  namespace: {
    type: String,
    default: 'var-icon'
  },
  badge: {
    type: [Boolean, Object],
    default: false
  },
  onClick: defineListenerProp()
};