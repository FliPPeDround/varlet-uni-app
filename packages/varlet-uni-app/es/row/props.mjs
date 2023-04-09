import { defineListenerProp } from '../utils/components.mjs';
function justifyValidator(justify) {
  return ['flex-start', 'flex-end', 'start', 'end', 'center', 'space-between', 'space-around'].includes(justify);
}
function alignValidator(align) {
  return ['flex-start', 'center', 'flex-end', 'start', 'end'].includes(align);
}
export var props = {
  gutter: {
    type: [String, Number],
    default: 0
  },
  justify: {
    type: String,
    default: 'flex-start',
    validator: justifyValidator
  },
  align: {
    type: String,
    default: 'flex-start',
    validator: alignValidator
  },
  onClick: defineListenerProp()
};