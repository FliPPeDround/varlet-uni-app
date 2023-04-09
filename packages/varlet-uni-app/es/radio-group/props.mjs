import { defineListenerProp } from '../utils/components.mjs';
export function directionValidator(direction) {
  return ['horizontal', 'vertical'].includes(direction);
}
export var props = {
  modelValue: {
    type: [String, Number, Boolean, Object, Array],
    default: undefined
  },
  direction: {
    type: String,
    default: 'horizontal',
    validator: directionValidator
  },
  validateTrigger: {
    type: Array,
    default: () => ['onChange']
  },
  rules: {
    type: Array
  },
  onChange: defineListenerProp(),
  'onUpdate:modelValue': defineListenerProp()
};