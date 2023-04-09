function typeValidator(type) {
  return ['info', 'success', 'warning', 'error', 'question', 'empty'].includes(type);
}
export var props = {
  imageSize: {
    type: [String, Number]
  },
  type: {
    type: String,
    default: 'success',
    validator: typeValidator
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  animation: {
    type: Boolean,
    default: true
  }
};