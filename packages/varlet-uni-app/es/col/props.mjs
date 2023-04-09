import { defineListenerProp } from '../utils/components.mjs';
function directionValidator(direction) {
  return ['row', 'column'].includes(direction);
}
function justifyValidator(justify) {
  return ['start', 'end', 'center', 'space-around', 'space-between', 'flex-start', 'flex-end'].includes(justify);
}
function alignValidator(align) {
  return ['stretch', 'center', 'start', 'end', 'baseline', 'initial', 'inherit', 'flex-start', 'flex-end'].includes(align);
}
export var props = {
  span: {
    type: [String, Number],
    default: 24
  },
  offset: {
    type: [String, Number],
    default: 0
  },
  direction: {
    type: String,
    default: 'row',
    validator: directionValidator
  },
  justify: {
    type: String,
    validator: justifyValidator
  },
  align: {
    type: String,
    validator: alignValidator
  },
  xs: {
    type: [Object, Number, String]
  },
  sm: {
    type: [Object, Number, String]
  },
  md: {
    type: [Object, Number, String]
  },
  lg: {
    type: [Object, Number, String]
  },
  xl: {
    type: [Object, Number, String]
  },
  onClick: defineListenerProp()
};