import Lazy from '../lazy/index.mjs';
import { defineComponent, ref, onUpdated } from 'vue';
import { props, internalSizeValidator, sizeValidator } from './props.mjs';
import { toSizeUnit } from '../utils/elements.mjs';
import { createNamespace, call } from '../utils/components.mjs';
import { useMounted } from '@varlet/use';
var {
  n,
  classes
} = createNamespace('avatar');
import { normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, resolveDirective as _resolveDirective, withDirectives as _withDirectives, openBlock as _openBlock, createElementBlock as _createElementBlock, Fragment as _Fragment, renderSlot as _renderSlot, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = ["src", "lazy-loading", "lazy-error"];
var _hoisted_2 = ["src"];
function __render__(_ctx, _cache) {
  var _directive_lazy = _resolveDirective("lazy");
  return _openBlock(), _createElementBlock("div", {
    ref: "avatarElement",
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box'), [_ctx.internalSizeValidator(_ctx.size), _ctx.n("--" + _ctx.size)], [_ctx.round, _ctx.n('--round')], [_ctx.bordered, _ctx.n('--bordered')])),
    style: _normalizeStyle({
      width: !_ctx.internalSizeValidator(_ctx.size) ? _ctx.toSizeUnit(_ctx.size) : undefined,
      height: !_ctx.internalSizeValidator(_ctx.size) ? _ctx.toSizeUnit(_ctx.size) : undefined,
      borderColor: _ctx.borderColor,
      backgroundColor: _ctx.color
    }),
    onClick: _cache[3] || (_cache[3] = function () {
      return _ctx.handleClick && _ctx.handleClick(...arguments);
    })
  }, [_ctx.src ? (_openBlock(), _createElementBlock(_Fragment, {
    key: 0
  }, [_ctx.lazy ? _withDirectives((_openBlock(), _createElementBlock("img", {
    key: 0,
    class: _normalizeClass(_ctx.n('image')),
    src: _ctx.src,
    style: _normalizeStyle({
      objectFit: _ctx.fit
    }),
    "lazy-loading": _ctx.loading,
    "lazy-error": _ctx.error,
    onLoad: _cache[0] || (_cache[0] = function () {
      return _ctx.handleLoad && _ctx.handleLoad(...arguments);
    })
  }, null, 46 /* CLASS, STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_1)), [[_directive_lazy, _ctx.src]]) : (_openBlock(), _createElementBlock("img", {
    key: 1,
    class: _normalizeClass(_ctx.n('image')),
    src: _ctx.src,
    style: _normalizeStyle({
      objectFit: _ctx.fit
    }),
    onLoad: _cache[1] || (_cache[1] = function () {
      return _ctx.handleLoad && _ctx.handleLoad(...arguments);
    }),
    onError: _cache[2] || (_cache[2] = function () {
      return _ctx.handleError && _ctx.handleError(...arguments);
    })
  }, null, 46 /* CLASS, STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_2))], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */)) : (_openBlock(), _createElementBlock("div", {
    key: 1,
    ref: "textElement",
    class: _normalizeClass(_ctx.n('text')),
    style: _normalizeStyle({
      transform: "scale(" + _ctx.scale + ")"
    })
  }, [_renderSlot(_ctx.$slots, "default")], 6 /* CLASS, STYLE */))], 6 /* CLASS, STYLE */);
}

var __sfc__ = defineComponent({
  name: 'VarAvatar',
  directives: {
    Lazy
  },
  props,
  setup(props) {
    var avatarElement = ref(null);
    var textElement = ref(null);
    var scale = ref(1);
    var getScale = () => {
      if (!avatarElement.value || !textElement.value) {
        scale.value = 1;
        return;
      }
      var avatarElementWidth = avatarElement.value.offsetWidth;
      var textElementWidth = textElement.value.offsetWidth;
      if (avatarElementWidth > textElementWidth) {
        scale.value = 1;
      } else {
        scale.value = avatarElementWidth / textElementWidth;
      }
    };
    var handleLoad = e => {
      var el = e.currentTarget;
      var {
        lazy,
        onLoad,
        onError
      } = props;
      if (lazy) {
        el._lazy.state === 'success' && call(onLoad, e);
        el._lazy.state === 'error' && call(onError, e);
      } else {
        call(onLoad, e);
      }
    };
    var handleError = e => {
      call(props.onError, e);
    };
    var handleClick = e => {
      call(props.onClick, e);
    };
    useMounted(getScale);
    onUpdated(getScale);
    return {
      internalSizeValidator,
      sizeValidator,
      toSizeUnit,
      n,
      classes,
      avatarElement,
      textElement,
      scale,
      handleLoad,
      handleError,
      handleClick
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;