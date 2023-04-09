import { defineListenerProp } from '../utils/components.mjs';
export var props = {
  sticky: {
    type: Boolean,
    default: true
  },
  stickyOffsetTop: {
    type: [String, Number],
    default: 0
  },
  /** @deprecated Use stickyCssMode to instead. */
  cssMode: {
    type: Boolean,
    default: false
  },
  stickyCssMode: {
    type: Boolean,
    default: false
  },
  hideList: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: [Number, String],
    default: 1
  },
  highlightColor: {
    type: String
  },
  duration: {
    type: [Number, String],
    default: 0
  },
  onClick: defineListenerProp(),
  onChange: defineListenerProp()
};