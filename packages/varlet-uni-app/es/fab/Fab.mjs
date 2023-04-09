import { mergeProps as _mergeProps, isVNode as _isVNode, withDirectives as _withDirectives, vShow as _vShow, createVNode as _createVNode } from "vue";
import Button from '../button/index.mjs';
import Icon from '../icon/index.mjs';
import { defineComponent, ref, Teleport, Transition, watch } from 'vue';
import { useClickOutside, useVModel } from '@varlet/use';
import { call, createNamespace, flatFragment, useTeleport } from '../utils/components.mjs';
import { toSizeUnit } from '../utils/elements.mjs';
import { toNumber } from '@varlet/shared';
import { props } from './props.mjs';







function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}
var {
  classes,
  n
} = createNamespace('fab');
export default defineComponent({
  name: 'VarFab',
  inheritAttrs: false,
  props,
  setup(props, _ref) {
    var {
      slots,
      attrs
    } = _ref;
    var isActive = useVModel(props, 'active', {
      emit: (event, value) => call(props['onUpdate:active'], value)
    });
    var host = ref(null);
    var {
      disabled
    } = useTeleport();
    var handleClick = (e, value, childrenLength) => {
      e.stopPropagation();
      if (props.trigger !== 'click' || props.disabled) {
        return;
      }
      if (childrenLength === 0) {
        call(props.onClick, isActive.value, e);
        return;
      }
      isActive.value = value;
      call(props.onClick, isActive.value, e);
      call(isActive.value ? props.onOpen : props.onClose);
    };
    var handleMouse = (value, childrenLength) => {
      if (props.trigger !== 'hover' || props.disabled || childrenLength === 0) {
        return;
      }
      isActive.value = value;
      call(isActive.value ? props.onOpen : props.onClose);
    };
    var handleClickOutside = () => {
      if (props.trigger !== 'click' || props.disabled) {
        return;
      }
      if (isActive.value !== false) {
        isActive.value = false;
        call(props.onClose);
      }
    };
    var renderTrigger = () => {
      if (slots.trigger) {
        return props.show ? slots.trigger({
          active: isActive.value
        }) : null;
      }
      return _withDirectives(_createVNode(Button, {
        "var-fab-cover": true,
        "class": n('trigger'),
        "type": props.type,
        "color": props.color,
        "disabled": props.disabled,
        "round": true,
        "elevation": props.elevation
      }, {
        default: () => [_createVNode(Icon, {
          "var-fab-cover": true,
          "class": classes([isActive.value, n('trigger-active-icon'), n('trigger-inactive-icon')]),
          "name": isActive.value ? props.activeIcon : props.inactiveIcon,
          "size": isActive.value ? props.inactiveIconSize : props.activeIconSize,
          "transition": 200,
          "animationClass": n('--trigger-icon-animation')
        }, null)]
      }), [[_vShow, props.show]]);
    };
    var renderFab = () => {
      var _slot;
      var _slots$default;
      var children = flatFragment((_slots$default = slots.default == null ? void 0 : slots.default()) != null ? _slots$default : []);
      return _createVNode("div", _mergeProps({
        "class": classes(n(), n("--position-" + props.position), n("--direction-" + props.direction), [props.fixed, n('--fixed'), n('--absolute')], [props.safeArea, n('--safe-area')]),
        "style": {
          zIndex: toNumber(props.zIndex),
          top: toSizeUnit(props.top),
          bottom: toSizeUnit(props.bottom),
          left: toSizeUnit(props.left),
          right: toSizeUnit(props.right)
        },
        "ref": host,
        "onClick": e => handleClick(e, !isActive.value, children.length),
        "onMouseleave": () => handleMouse(false, children.length),
        "onMouseenter": () => handleMouse(true, children.length)
      }, attrs), [_createVNode(Transition, {
        "name": n("--active-transition")
      }, _isSlot(_slot = renderTrigger()) ? _slot : {
        default: () => [_slot]
      }), _createVNode(Transition, {
        "name": n("--actions-transition-" + props.direction),
        "onAfterEnter": props.onOpened,
        "onAfterLeave": props.onClosed
      }, {
        default: () => [_withDirectives(_createVNode("div", {
          "class": n('actions'),
          "onClick": e => e.stopPropagation()
        }, [children.map(child => {
          return _createVNode("div", {
            "class": n('action')
          }, [child]);
        })]), [[_vShow, props.show && isActive.value && children.length]])]
      })]);
    };
    watch(() => props.trigger, () => {
      isActive.value = false;
    });
    watch(() => props.disabled, () => {
      isActive.value = false;
    });
    useClickOutside(host, 'click', handleClickOutside);
    return () => {
      var {
        teleport
      } = props;
      if (teleport) {
        var _slot2;
        return _createVNode(Teleport, {
          "to": teleport,
          "disabled": disabled.value
        }, _isSlot(_slot2 = renderFab()) ? _slot2 : {
          default: () => [_slot2]
        });
      }
      return renderFab();
    };
  }
});