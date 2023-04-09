import { isArray, isNumber, isString } from '@varlet/shared';
export var internalSizeValidator = size => ['mini', 'small', 'normal', 'large'].includes(size);
export var sizeValidator = size => {
  return internalSizeValidator(size) || isArray(size) || isNumber(size) || isString(size);
};
var justifyValidator = justify => {
  return ['start', 'end', 'center', 'space-around', 'space-between', 'flex-start', 'flex-end'].includes(justify);
};
var alignValidator = align => {
  return ['stretch', 'center', 'start', 'end', 'baseline', 'flex-start', 'flex-end'].includes(align);
};
export var props = {
  size: {
    type: [String, Number, Array],
    default: 'normal',
    validator: sizeValidator
  },
  wrap: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String,
    default: 'row'
  },
  justify: {
    type: String,
    default: 'flex-start',
    validator: justifyValidator
  },
  align: {
    type: String,
    validator: alignValidator
  },
  inline: {
    type: Boolean,
    default: false
  }
};