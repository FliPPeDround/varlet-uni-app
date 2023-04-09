import { defineListenerProp } from '../utils/components.mjs';
import { typeValidator } from '../button/props.mjs';
export function positionValidator(position) {
  return ['left-top', 'right-top', 'left-bottom', 'right-bottom'].includes(position);
}
export function directionValidator(direction) {
  return ['top', 'right', 'bottom', 'left'].includes(direction);
}
export function triggerValidator(trigger) {
  return ['click', 'hover'].includes(trigger);
}
export var props = {
  active: {
    type: Boolean,
    default: false
  },
  show: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'primary',
    validator: typeValidator
  },
  position: {
    type: String,
    default: 'right-bottom',
    validator: positionValidator
  },
  direction: {
    type: String,
    default: 'top',
    validator: directionValidator
  },
  trigger: {
    type: String,
    default: 'click',
    validator: triggerValidator
  },
  disabled: {
    type: Boolean,
    default: false
  },
  color: {
    type: String
  },
  inactiveIcon: {
    type: String,
    default: 'plus'
  },
  activeIcon: {
    type: String,
    default: 'window-close'
  },
  inactiveIconSize: {
    type: [Number, String]
  },
  activeIconSize: {
    type: [Number, String]
  },
  fixed: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: [Number, String],
    default: 90
  },
  top: {
    type: [Number, String]
  },
  bottom: {
    type: [Number, String]
  },
  left: {
    type: [Number, String]
  },
  right: {
    type: [Number, String]
  },
  elevation: {
    type: [Boolean, Number, String],
    default: true
  },
  safeArea: {
    type: Boolean,
    default: false
  },
  teleport: {
    type: String
  },
  onClick: defineListenerProp(),
  onOpen: defineListenerProp(),
  onOpened: defineListenerProp(),
  onClose: defineListenerProp(),
  onClosed: defineListenerProp(),
  'onUpdate:active': defineListenerProp()
};