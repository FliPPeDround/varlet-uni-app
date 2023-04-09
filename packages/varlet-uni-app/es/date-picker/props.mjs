import { defineListenerProp } from '../utils/components.mjs';
function typeValidator(type) {
  return ['date', 'month'].includes(type);
}
export var MONTH_LIST = [{
  index: '01'
}, {
  index: '02'
}, {
  index: '03'
}, {
  index: '04'
}, {
  index: '05'
}, {
  index: '06'
}, {
  index: '07'
}, {
  index: '08'
}, {
  index: '09'
}, {
  index: '10'
}, {
  index: '11'
}, {
  index: '12'
}];
export var WEEK_HEADER = [{
  index: '0'
}, {
  index: '1'
}, {
  index: '2'
}, {
  index: '3'
}, {
  index: '4'
}, {
  index: '5'
}, {
  index: '6'
}];
export var props = {
  modelValue: {
    type: [String, Array]
  },
  type: {
    type: String,
    default: 'date',
    validator: typeValidator
  },
  allowedDates: {
    type: Function
  },
  color: {
    type: String
  },
  headerColor: {
    type: String
  },
  elevation: {
    type: [Boolean, Number, String],
    default: false
  },
  buttonElevation: {
    type: [Boolean, Number, String],
    default: true
  },
  firstDayOfWeek: {
    type: [String, Number],
    default: 0
  },
  min: {
    type: String
  },
  max: {
    type: String
  },
  showCurrent: {
    type: Boolean,
    default: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  },
  range: {
    type: Boolean,
    default: false
  },
  touchable: {
    type: Boolean,
    default: true
  },
  onPreview: defineListenerProp(),
  onChange: defineListenerProp(),
  'onUpdate:modelValue': defineListenerProp()
};