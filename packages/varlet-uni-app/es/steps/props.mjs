import { defineListenerProp } from '../utils/components.mjs';
function directionValidator(direction) {
  return ['horizontal', 'vertical'].includes(direction);
}
export var props = {
  active: {
    type: [String, Number],
    default: 0
  },
  direction: {
    type: String,
    default: 'horizontal',
    validator: directionValidator
  },
  activeColor: {
    type: String
  },
  inactiveColor: {
    type: String
  },
  onClickStep: defineListenerProp()
};