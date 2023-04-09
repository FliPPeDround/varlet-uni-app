import { defineListenerProp, pickProps } from '../utils/components.mjs';
import { props as iconProps } from '../icon/props.mjs';
function typeValidator(type) {
  return ['default', 'primary', 'info', 'success', 'warning', 'danger'].includes(type);
}
function sizeValidator(size) {
  return ['normal', 'mini', 'small', 'large'].includes(size);
}
export var props = {
  type: {
    type: String,
    default: 'default',
    validator: typeValidator
  },
  size: {
    type: String,
    default: 'normal',
    validator: sizeValidator
  },
  color: {
    type: String
  },
  textColor: {
    type: String
  },
  iconName: pickProps(iconProps, 'name'),
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: true
  },
  block: {
    type: Boolean,
    default: false
  },
  closable: {
    type: Boolean,
    default: false
  },
  onClose: defineListenerProp()
};