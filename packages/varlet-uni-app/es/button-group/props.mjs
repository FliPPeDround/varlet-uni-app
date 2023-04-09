function typeValidator(type) {
  return ['default', 'primary', 'info', 'success', 'warning', 'danger'].includes(type);
}
function sizeValidator(size) {
  return ['normal', 'mini', 'small', 'large'].includes(size);
}
function modeValidator(mode) {
  return ['normal', 'text', 'outline'].includes(mode);
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
  mode: {
    type: String,
    default: 'normal',
    validator: modeValidator
  },
  elevation: {
    type: [Boolean, Number, String],
    default: true
  },
  vertical: {
    type: Boolean,
    default: false
  }
};