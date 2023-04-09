import { defineListenerProp } from '../utils/components.mjs';
export var props = {
  separator: {
    type: String
  },
  onClick: defineListenerProp()
};