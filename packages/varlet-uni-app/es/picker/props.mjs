function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { defineListenerProp, pickProps } from '../utils/components.mjs';
import { props as popupProps } from '../popup/props.mjs';
export var props = _extends({
  columns: {
    type: Array,
    default: () => []
  },
  title: {
    type: String
  },
  textKey: {
    type: String,
    default: 'text'
  },
  toolbar: {
    type: Boolean,
    default: true
  },
  cascade: {
    type: Boolean,
    default: false
  },
  cascadeInitialIndexes: {
    type: Array,
    default: () => []
  },
  optionHeight: {
    type: [Number, String],
    default: 44
  },
  optionCount: {
    type: [Number, String],
    default: 6
  },
  confirmButtonText: {
    type: String
  },
  cancelButtonText: {
    type: String
  },
  confirmButtonTextColor: {
    type: String
  },
  cancelButtonTextColor: {
    type: String
  },
  // dynamic internal
  dynamic: {
    type: Boolean,
    default: false
  },
  textFormatter: {
    type: Function,
    default: text => text
  },
  onChange: defineListenerProp(),
  onConfirm: defineListenerProp(),
  onCancel: defineListenerProp()
}, pickProps(popupProps, ['show', 'onUpdate:show', 'closeOnClickOverlay', 'teleport', 'onOpen', 'onClose', 'onOpened', 'onClosed', 'onClickOverlay', 'onRouteChange']));