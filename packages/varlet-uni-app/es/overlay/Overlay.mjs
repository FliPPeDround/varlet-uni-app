import { isVNode as _isVNode, createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { defineComponent, Teleport, Transition } from 'vue';
import { props } from './props.mjs';
import { useLock } from '../context/lock.mjs';
import { useZIndex } from '../context/zIndex.mjs';
import { createNamespace, useTeleport, call } from '../utils/components.mjs';


function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}
var {
  n
} = createNamespace('overlay');
export default defineComponent({
  name: 'VarOverlay',
  inheritAttrs: false,
  props,
  setup(props, _ref) {
    var {
      slots,
      attrs
    } = _ref;
    var {
      zIndex
    } = useZIndex(() => props.show, 1);
    var {
      disabled
    } = useTeleport();
    var handleClickOverlay = () => {
      call(props.onClick);
      call(props['onUpdate:show'], false);
    };
    useLock(() => props.show, () => props.lockScroll);
    var renderOverlay = () => {
      return _createVNode("div", _mergeProps({
        "class": n(),
        "style": {
          zIndex: zIndex.value - 1
        }
      }, attrs, {
        "onClick": handleClickOverlay
      }), [call(slots.default)]);
    };
    var renderTransitionOverlay = () => {
      var {
        show
      } = props;
      return _createVNode(Transition, {
        "name": n('--fade')
      }, {
        default: () => [show && renderOverlay()]
      });
    };
    return () => {
      var {
        teleport
      } = props;
      if (teleport) {
        var _slot;
        return _createVNode(Teleport, {
          "to": teleport,
          "disabled": disabled.value
        }, _isSlot(_slot = renderTransitionOverlay()) ? _slot : {
          default: () => [_slot]
        });
      }
      return renderTransitionOverlay();
    };
  }
});