import { defineListenerProp } from '../utils/components.mjs';
function labelValidator(label) {
  return ['always', 'normal', 'never'].includes(label);
}
export var Thumbs = /*#__PURE__*/function (Thumbs) {
  Thumbs["First"] = "1";
  Thumbs["Second"] = "2";
  return Thumbs;
}({});
export var props = {
  // 当前进度百分比
  modelValue: {
    type: [Number, Array],
    default: 0
  },
  // 步长
  step: {
    type: [Number, String],
    default: 1
  },
  // 是否开启双滑块模式
  range: {
    type: Boolean,
    default: false
  },
  labelVisible: {
    type: String,
    default: 'normal',
    validator: labelValidator
  },
  activeColor: {
    type: String
  },
  trackColor: {
    type: String
  },
  thumbColor: {
    type: String
  },
  labelColor: {
    type: String
  },
  labelTextColor: {
    type: String
  },
  trackHeight: {
    type: [String, Number]
  },
  max: {
    type: [String, Number],
    default: 100
  },
  min: {
    type: [String, Number],
    default: 0
  },
  thumbSize: {
    type: [String, Number]
  },
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否只读
  readonly: {
    type: Boolean,
    default: false
  },
  rules: {
    type: Array
  },
  onChange: defineListenerProp(),
  onStart: defineListenerProp(),
  onEnd: defineListenerProp(),
  'onUpdate:modelValue': defineListenerProp()
};