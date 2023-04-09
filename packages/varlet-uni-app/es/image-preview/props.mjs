function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { defineListenerProp, pickProps } from '../utils/components.mjs';
import { props as swipeProps } from '../swipe/props.mjs';
import { props as popupProps } from '../popup/props.mjs';
export var props = _extends({
  show: {
    type: Boolean,
    default: false
  },
  images: {
    type: Array,
    default: () => []
  },
  current: {
    type: String
  },
  zoom: {
    type: [String, Number],
    default: 2
  },
  closeable: {
    type: Boolean,
    default: false
  },
  'onUpdate:show': defineListenerProp()
}, pickProps(swipeProps, ['loop', 'indicator', 'onChange']), pickProps(popupProps, ['lockScroll', 'teleport', 'onOpen', 'onClose', 'onOpened', 'onClosed',
// internal for function call closes the dialog
'onRouteChange']));