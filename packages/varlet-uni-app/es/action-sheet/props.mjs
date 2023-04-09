function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { defineListenerProp, pickProps } from '../utils/components.mjs';
import { props as popupProps } from '../popup/props.mjs';
export var props = _extends({
  show: {
    type: Boolean,
    default: false
  },
  actions: {
    type: Array,
    default: () => []
  },
  title: {
    type: String
  },
  closeOnClickAction: {
    type: Boolean,
    default: true
  },
  onSelect: defineListenerProp(),
  'onUpdate:show': defineListenerProp()
}, pickProps(popupProps, ['overlay', 'overlayClass', 'overlayStyle', 'lockScroll', 'closeOnClickOverlay', 'teleport', 'onOpen', 'onClose', 'onOpened', 'onClosed', 'onClickOverlay',
// internal for function call closes the dialog
'onRouteChange']));