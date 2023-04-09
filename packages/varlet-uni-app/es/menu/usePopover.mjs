function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import flip from '@popperjs/core/lib/modifiers/flip';
import offset from '@popperjs/core/lib/modifiers/offset';
import { useClickOutside, useVModel } from '@varlet/use';
import { doubleRaf, toPxNum } from '../utils/elements.mjs';
import { call } from '../utils/components.mjs';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { createPopper } from '@popperjs/core/lib/popper-lite';
import { useZIndex } from '../context/zIndex.mjs';
export function usePopover(options) {
  var host = ref(null);
  var popover = ref(null);
  var hostSize = ref({
    width: 0,
    height: 0
  });
  var show = useVModel(options, 'show', {
    passive: true,
    defaultValue: false,
    emit(event, value) {
      if (value) {
        resize();
        call(options.onOpen);
      } else {
        call(options.onClose);
      }
    }
  });
  var {
    zIndex
  } = useZIndex(() => show.value, 1);
  var popoverInstance = null;
  var enterPopover = false;
  var enterHost = false;
  var computeHostSize = () => {
    var {
      width,
      height
    } = window.getComputedStyle(host.value);
    hostSize.value = {
      width: toPxNum(width),
      height: toPxNum(height)
    };
  };
  var handleHostMouseenter = () => {
    if (options.trigger !== 'hover') {
      return;
    }
    enterHost = true;
    open();
  };
  var handleHostMouseleave = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* () {
      if (options.trigger !== 'hover') {
        return;
      }
      enterHost = false;
      yield doubleRaf();
      if (enterPopover) {
        return;
      }
      close();
    });
    return function handleHostMouseleave() {
      return _ref.apply(this, arguments);
    };
  }();
  var handlePopoverMouseenter = () => {
    if (options.trigger !== 'hover') {
      return;
    }
    enterPopover = true;
  };
  var handlePopoverMouseleave = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* () {
      if (options.trigger !== 'hover') {
        return;
      }
      enterPopover = false;
      yield doubleRaf();
      if (enterHost) {
        return;
      }
      close();
    });
    return function handlePopoverMouseleave() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleHostClick = () => {
    open();
  };
  var handlePopoverClose = () => {
    show.value = false;
    call(options['onUpdate:show'], false);
  };
  var handleClickOutside = () => {
    if (options.trigger !== 'click') {
      return;
    }
    handlePopoverClose();
  };
  var getPosition = () => {
    computeHostSize();
    var offset = {
      x: toPxNum(options.offsetX),
      y: toPxNum(options.offsetY)
    };
    switch (options.placement) {
      case 'cover-top':
        return {
          placement: 'bottom',
          skidding: offset.x,
          distance: offset.y - hostSize.value.height
        };
      case 'cover-top-start':
        return {
          placement: 'bottom-start',
          skidding: offset.x,
          distance: offset.y - hostSize.value.height
        };
      case 'cover-top-end':
        return {
          placement: 'bottom-end',
          skidding: offset.x,
          distance: offset.y - hostSize.value.height
        };
      case 'cover-bottom':
        return {
          placement: 'top',
          skidding: offset.x,
          distance: -offset.y - hostSize.value.height
        };
      case 'cover-bottom-start':
        return {
          placement: 'top-start',
          skidding: offset.x,
          distance: -offset.y - hostSize.value.height
        };
      case 'cover-bottom-end':
        return {
          placement: 'top-end',
          skidding: offset.x,
          distance: -offset.y - hostSize.value.height
        };
      case 'cover-left':
        return {
          placement: 'right',
          skidding: offset.y,
          distance: offset.x - hostSize.value.width
        };
      case 'cover-right':
        return {
          placement: 'left',
          skidding: offset.y,
          distance: -offset.x - hostSize.value.width
        };
      case 'left':
      case 'left-start':
      case 'left-end':
        return {
          placement: options.placement,
          skidding: offset.y,
          distance: -offset.x
        };
      case 'top':
      case 'top-start':
      case 'top-end':
        return {
          placement: options.placement,
          skidding: offset.x,
          distance: -offset.y
        };
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        return {
          placement: options.placement,
          skidding: offset.x,
          distance: offset.y
        };
      case 'right':
      case 'right-start':
      case 'right-end':
        return {
          placement: options.placement,
          skidding: offset.y,
          distance: offset.x
        };
    }
  };
  var getPopperOptions = () => {
    var {
      placement,
      skidding,
      distance
    } = getPosition();
    var modifiers = [_extends({}, flip, {
      enabled: show.value
    }), _extends({}, offset, {
      options: {
        offset: [skidding, distance]
      }
    })];
    return {
      placement,
      modifiers
    };
  };

  // expose
  var resize = () => {
    popoverInstance.setOptions(getPopperOptions());
  };

  // expose
  var open = () => {
    var {
      disabled
    } = options;
    if (disabled) {
      return;
    }
    show.value = true;
    call(options['onUpdate:show'], true);
  };

  // expose
  var close = () => {
    show.value = false;
    call(options['onUpdate:show'], false);
  };
  useClickOutside(host, 'click', handleClickOutside);
  watch(() => options.offsetX, resize);
  watch(() => options.offsetY, resize);
  watch(() => options.placement, resize);
  watch(() => options.disabled, close);
  onMounted(() => {
    var _host$value;
    var reference = options.reference ? (_host$value = host.value) == null ? void 0 : _host$value.querySelector(options.reference) : host.value;
    popoverInstance = createPopper(reference != null ? reference : host.value, popover.value, getPopperOptions());
  });
  onUnmounted(() => {
    popoverInstance.destroy();
  });
  return {
    show,
    popover,
    zIndex,
    host,
    hostSize,
    handleHostClick,
    handleHostMouseenter,
    handleHostMouseleave,
    handlePopoverClose,
    handlePopoverMouseenter,
    handlePopoverMouseleave,
    resize,
    open,
    close
  };
}