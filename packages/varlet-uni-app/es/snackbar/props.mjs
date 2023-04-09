function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { defineListenerProp, pickProps } from '../utils/components.mjs';
import { props as loadingProps } from '../loading/props.mjs';
import { SNACKBAR_TYPE } from './index.mjs';
export function positionValidator(position) {
  var validPositions = ['top', 'center', 'bottom'];
  return validPositions.includes(position);
}
export function typeValidator(type) {
  return SNACKBAR_TYPE.includes(type);
}
export var props = {
  type: {
    type: String,
    validator: typeValidator
  },
  // snackbar显示的位置
  position: {
    type: String,
    default: 'top',
    validator: positionValidator
  },
  // content内容
  content: {
    type: String
  },
  // 为snackbar content添加自定义类名
  contentClass: {
    type: String
  },
  // snackbar 持续时间
  duration: {
    type: Number,
    default: 3000
  },
  // 是否将消息条内容堆叠在操作（按钮）之上
  vertical: {
    type: Boolean,
    default: false
  },
  loadingType: pickProps(loadingProps, 'type'),
  loadingSize: pickProps(loadingProps, 'size'),
  loadingRadius: pickProps(loadingProps, 'radius'),
  loadingColor: _extends({}, pickProps(loadingProps, 'color'), {
    default: 'currentColor'
  }),
  // 是否禁止滚动穿透
  lockScroll: {
    type: Boolean,
    default: false
  },
  // 控制组件可见还是隐藏
  show: {
    type: Boolean,
    default: false
  },
  // teleport
  teleport: {
    type: String,
    default: 'body'
  },
  // 是否禁止点击背景
  forbidClick: {
    type: Boolean,
    default: false
  },
  // 打开时的回调函数
  onOpen: defineListenerProp(),
  // 打开动画结束时的回调
  onOpened: defineListenerProp(),
  // 关闭时的回调函数
  onClose: defineListenerProp(),
  // 关闭动画结束时的回调
  onClosed: defineListenerProp(),
  'onUpdate:show': defineListenerProp(),
  _update: {
    type: String
  }
};