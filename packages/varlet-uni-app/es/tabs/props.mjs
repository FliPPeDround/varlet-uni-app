import { defineListenerProp, pickProps } from '../utils/components.mjs';
import { props as stickyProps } from '../sticky/props.mjs';
function directionValidator(direction) {
  return ['horizontal', 'vertical'].includes(direction);
}
function scrollableValidator(scrollable) {
  return ['auto', 'always'].includes(scrollable);
}
function indicatorPositionValidator(indicatorPosition) {
  return ['normal', 'reverse'].includes(indicatorPosition);
}
export var props = {
  active: {
    type: [String, Number],
    default: 0
  },
  layoutDirection: {
    type: String,
    default: 'horizontal',
    validator: directionValidator
  },
  itemDirection: {
    type: String,
    default: 'horizontal',
    validator: directionValidator
  },
  fixedBottom: {
    type: Boolean,
    default: false
  },
  activeColor: {
    type: String
  },
  inactiveColor: {
    type: String
  },
  disabledColor: {
    type: String
  },
  color: {
    type: String
  },
  indicatorColor: {
    type: String
  },
  indicatorSize: {
    type: [String, Number]
  },
  elevation: {
    type: [Boolean, String, Number],
    default: false
  },
  scrollable: {
    type: String,
    default: 'auto',
    validator: scrollableValidator
  },
  indicatorPosition: {
    type: String,
    default: 'normal',
    validator: indicatorPositionValidator
  },
  safeArea: {
    type: Boolean,
    default: false
  },
  sticky: {
    type: Boolean,
    default: false
  },
  stickyCssMode: pickProps(stickyProps, 'cssMode'),
  stickyZIndex: pickProps(stickyProps, 'zIndex'),
  offsetTop: pickProps(stickyProps, 'offsetTop'),
  onClick: defineListenerProp(),
  onChange: defineListenerProp(),
  'onUpdate:active': defineListenerProp()
};