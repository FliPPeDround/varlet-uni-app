function scrollToErrorValidator(status) {
  return ['start', 'end'].includes(status);
}
export var props = {
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  scrollToError: {
    type: String,
    validator: scrollToErrorValidator
  },
  scrollToErrorOffsetY: {
    type: [String, Number],
    default: 0
  }
};