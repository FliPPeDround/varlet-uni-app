import { defineListenerProp } from '../utils/components.mjs';
export var props = {
  loading: {
    type: Boolean,
    default: false
  },
  immediateCheck: {
    type: Boolean,
    default: true
  },
  finished: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  offset: {
    type: [String, Number],
    default: 0
  },
  loadingText: {
    type: String
  },
  finishedText: {
    type: String
  },
  errorText: {
    type: String
  },
  onLoad: defineListenerProp(),
  'onUpdate:loading': defineListenerProp(),
  'onUpdate:error': defineListenerProp()
};