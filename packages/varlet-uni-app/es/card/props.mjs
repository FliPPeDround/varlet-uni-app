import { defineListenerProp } from '../utils/components.mjs';
function fitValidator(fit) {
  return ['fill', 'contain', 'cover', 'none', 'scale-down'].includes(fit);
}
export var props = {
  src: {
    type: String
  },
  fit: {
    type: String,
    validator: fitValidator,
    default: 'cover'
  },
  imageHeight: {
    type: [String, Number]
  },
  imageWidth: {
    type: [String, Number]
  },
  outline: {
    type: Boolean,
    default: false
  },
  layout: {
    type: String,
    default: 'column'
  },
  floating: {
    type: Boolean,
    default: false
  },
  floatingDuration: {
    type: Number,
    default: 250
  },
  alt: {
    type: String
  },
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  description: {
    type: String
  },
  elevation: {
    type: [Boolean, Number, String],
    default: true
  },
  ripple: {
    type: Boolean,
    default: false
  },
  onClick: defineListenerProp(),
  'onUpdate:floating': defineListenerProp()
};