export function typeValidator(type) {
  return ['circle', 'wave', 'cube', 'rect', 'disappear'].includes(type);
}
export function sizeValidator(size) {
  return ['normal', 'mini', 'small', 'large'].includes(size);
}
export var props = {
  type: {
    type: String,
    default: 'circle',
    validator: typeValidator
  },
  radius: {
    type: [String, Number]
  },
  size: {
    type: String,
    default: 'normal',
    validator: sizeValidator
  },
  color: {
    type: String
  },
  description: {
    type: String
  },
  loading: {
    type: Boolean,
    default: false
  }
};