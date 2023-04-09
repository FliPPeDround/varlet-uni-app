import { defineListenerProp } from '../utils/components.mjs';
function triggerValidator(trigger) {
  return ['click', 'hover'].includes(trigger);
}
function placementValidator(alignment) {
  return ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'right', 'right-start', 'right-end', 'left', 'left-start', 'left-end'].includes(alignment);
}
function typeValidator(type) {
  return ['default', 'primary', 'info', 'success', 'warning', 'danger'].includes(type);
}
export var props = {
  type: {
    type: String,
    default: 'default',
    validator: typeValidator
  },
  color: {
    type: String
  },
  content: {
    type: String
  },
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
    default: 'hover',
    validator: triggerValidator
  },
  reference: {
    type: String
  },
  placement: {
    type: String,
    default: 'bottom',
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
  onOpen: defineListenerProp(),
  onOpened: defineListenerProp(),
  onClose: defineListenerProp(),
  onClosed: defineListenerProp(),
  'onUpdate:show': defineListenerProp()
};