export function expandTriggerValidator(expandTrigger) {
  return ['click'].includes(expandTrigger);
}
export var props = {
  expandTrigger: {
    type: String,
    validator: expandTriggerValidator
  },
  lineClamp: {
    type: [Number, String]
  },
  tooltip: {
    type: [Object, Boolean],
    default: true
  }
};