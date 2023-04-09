import { defineListenerProp } from '../utils/components.mjs';
export var hoursAmpm = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
export var hours24 = ['00', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
export var minSec = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
function formatValidator(type) {
  return ['ampm', '24hr'].includes(type);
}
export var props = {
  modelValue: {
    type: String
  },
  elevation: {
    type: [Boolean, Number, String],
    default: false
  },
  color: {
    type: String
  },
  headerColor: {
    type: String
  },
  format: {
    type: String,
    default: 'ampm',
    validator: formatValidator
  },
  allowedTime: {
    type: Object
  },
  min: {
    type: String
  },
  max: {
    type: String
  },
  useSeconds: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  'onUpdate:modelValue': defineListenerProp(),
  onChange: defineListenerProp()
};