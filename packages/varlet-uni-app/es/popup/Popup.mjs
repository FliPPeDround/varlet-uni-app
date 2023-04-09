import { isVNode as _isVNode, withDirectives as _withDirectives, vShow as _vShow, mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { defineComponent, watch, Transition, Teleport } from 'vue';
import { props } from './props.mjs';
import { useLock } from '../context/lock.mjs';
import { useZIndex } from '../context/zIndex.mjs';
import { useRouteListener, useTeleport, createNamespace, call } from '../utils/components.mjs';


function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}
var {
  n,
  classes
} = createNamespace('popup');
export default defineComponent({
  name: 'VarPopup',
  inheritAttrs: false,
  props,
  setup(props, _ref) {
    var {
      slots,
      attrs
    } = _ref;
    var {
      zIndex
    } = useZIndex(() => props.show, 3);
    var {
      disabled
    } = useTeleport();
    var hidePopup = () => {
      var {
        closeOnClickOverlay,
        onClickOverlay
      } = props;
      call(onClickOverlay);
      if (!closeOnClickOverlay) {
        return;
      }
      call(props['onUpdate:show'], false);
    };
    useLock(() => props.show, () => props.lockScroll);
    watch(() => props.show, newValue => {
      newValue ? call(props.onOpen) : call(props.onClose);
    });

    // internal for Dialog
    useRouteListener(() => call(props.onRouteChange));
    var renderOverlay = () => {
      var {
        overlayClass = '',
        overlayStyle
      } = props;
      return _createVNode("div", {
        "class": classes(n('overlay'), overlayClass),
        "style": _extends({
          zIndex: zIndex.value - 1
        }, overlayStyle),
        "onClick": hidePopup
      }, null);
    };
    var renderContent = () => {
      return _createVNode("div", _mergeProps({
        "class": classes(n('content'), n("--" + props.position), [props.defaultStyle, n('--content-background-color')], [props.defaultStyle, n('$-elevation--3')]),
        "style": {
          zIndex: zIndex.value
        }
      }, attrs), [call(slots.default)]);
    };
    var renderPopup = () => {
      var {
        onOpened,
        onClosed,
        show,
        overlay,
        transition,
        position
      } = props;
      return _createVNode(Transition, {
        "name": n('$-fade'),
        "onAfterEnter": onOpened,
        "onAfterLeave": onClosed
      }, {
        default: () => [_withDirectives(_createVNode("div", {
          "class": classes(n('$--box'), n()),
          "style": {
            zIndex: zIndex.value - 2
          }
        }, [overlay && renderOverlay(), _createVNode(Transition, {
          "name": transition || n("$-pop-" + position)
        }, {
          default: () => [show && renderContent()]
        })]), [[_vShow, show]])]
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
        }, _isSlot(_slot = renderPopup()) ? _slot : {
          default: () => [_slot]
        });
      }
      return renderPopup();
    };
  }
});