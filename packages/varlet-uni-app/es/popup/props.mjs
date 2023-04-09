import { defineListenerProp } from '../utils/components.mjs';
function positionValidator(position) {
  return ['top', 'bottom', 'right', 'left', 'center'].includes(position);
}
export var props = {
  show: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: 'center',
    validator: positionValidator
  },
  transition: {
    type: String
  },
  overlay: {
    type: Boolean,
    default: true
  },
  overlayClass: {
    type: String
  },
  overlayStyle: {
    type: Object
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  defaultStyle: {
    type: Boolean,
    default: true
  },
  teleport: {
    type: String
  },
  onOpen: defineListenerProp(),
  onOpened: defineListenerProp(),
  onClose: defineListenerProp(),
  onClosed: defineListenerProp(),
  onClickOverlay: defineListenerProp(),
  'onUpdate:show': defineListenerProp(),
  // internal for Dialog
  onRouteChange: defineListenerProp()
};