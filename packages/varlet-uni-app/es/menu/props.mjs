import { defineListenerProp } from '../utils/components.mjs';
function triggerValidator(trigger) {
  return ['click', 'hover'].includes(trigger);
}
function placementValidator(alignment) {
  return ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'right', 'right-start', 'right-end', 'left', 'left-start', 'left-end', 'cover-top', 'cover-top-start', 'cover-top-end', 'cover-bottom', 'cover-bottom-start', 'cover-bottom-end', 'cover-left', 'cover-right'].includes(alignment);
}
export var props = {
  show: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  trigger: {
    type: String,
    default: 'click',
    validator: triggerValidator
  },
  reference: {
    type: String
  },
  placement: {
    type: String,
    default: 'cover-top-start',
    validator: placementValidator
  },
  offsetX: {
    type: [Number, String],
    default: 0
  },
  offsetY: {
    type: [Number, String],
    default: 0
  },
  teleport: {
    type: [String, Object],
    default: 'body'
  },
  sameWidth: {
    type: Boolean,
    default: false
  },
  elevation: {
    type: [Boolean, String, Number],
    default: true
  },
  defaultStyle: {
    type: Boolean,
    default: true
  },
  onOpen: defineListenerProp(),
  onOpened: defineListenerProp(),
  onClose: defineListenerProp(),
  onClosed: defineListenerProp(),
  'onUpdate:show': defineListenerProp()
};