import { defineListenerProp } from '../utils/components.mjs';
import { isNumber, isString } from '@varlet/shared';
function fitValidator(fit) {
  return ['fill', 'contain', 'cover', 'none', 'scale-down'].includes(fit);
}
export var internalSizeValidator = size => ['mini', 'small', 'normal', 'large'].includes(size);
export function sizeValidator(size) {
  return internalSizeValidator(size) || isNumber(size) || isString(size);
}
export var props = {
  round: {
    type: Boolean,
    default: true
  },
  size: {
    type: [String, Number],
    validator: sizeValidator,
    default: 'normal'
  },
  color: {
    type: String
  },
  src: {
    type: String
  },
  fit: {
    type: String,
    validator: fitValidator,
    default: 'cover'
  },
  bordered: {
    type: Boolean,
    default: false
  },
  borderColor: {
    type: String
  },
  loading: {
    type: String
  },
  error: {
    type: String
  },
  lazy: {
    type: Boolean,
    default: false
  },
  onClick: defineListenerProp(),
  onLoad: defineListenerProp(),
  onError: defineListenerProp()
};