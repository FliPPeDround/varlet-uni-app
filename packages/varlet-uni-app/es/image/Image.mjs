import Ripple from '../ripple/index.mjs';
import Lazy from '../lazy/index.mjs';
import { defineComponent } from 'vue';
import { props } from './props.mjs';
import { toSizeUnit } from '../utils/elements.mjs';
import { createNamespace, call } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('image');
import { normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, resolveDirective as _resolveDirective, withDirectives as _withDirectives, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = ["alt", "title", "lazy-error", "lazy-loading"];
var _hoisted_2 = ["alt", "title", "src"];
function __render__(_ctx, _cache) {
  var _directive_lazy = _resolveDirective("lazy");
  var _directive_ripple = _resolveDirective("ripple");
  return _withDirectives((_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box'), [!_ctx.block, _ctx.n('$--inline-block')])),
    style: _normalizeStyle({
      width: _ctx.toSizeUnit(_ctx.width),
      height: _ctx.toSizeUnit(_ctx.height),
      'border-radius': _ctx.toSizeUnit(_ctx.radius)
    })
  }, [_ctx.lazy ? _withDirectives((_openBlock(), _createElementBlock("img", {
    key: 0,
    class: _normalizeClass(_ctx.n('image')),
    alt: _ctx.alt,
    title: _ctx.title,
    "lazy-error": _ctx.error,
    "lazy-loading": _ctx.loading,
    style: _normalizeStyle({
      objectFit: _ctx.fit
    }),
    onLoad: _cache[0] || (_cache[0] = function () {
      return _ctx.handleLoad && _ctx.handleLoad(...arguments);
    }),
    onError: _cache[1] || (_cache[1] = function () {
      return _ctx.handleError && _ctx.handleError(...arguments);
    }),
    onClick: _cache[2] || (_cache[2] = function () {
      return _ctx.handleClick && _ctx.handleClick(...arguments);
    })
  }, null, 46 /* CLASS, STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_1)), [[_directive_lazy, _ctx.src]]) : (_openBlock(), _createElementBlock("img", {
    key: 1,
    class: _normalizeClass(_ctx.n('image')),
    alt: _ctx.alt,
    title: _ctx.title,
    style: _normalizeStyle({
      objectFit: _ctx.fit
    }),
    src: _ctx.src,
    onLoad: _cache[3] || (_cache[3] = function () {
      return _ctx.handleLoad && _ctx.handleLoad(...arguments);
    }),
    onError: _cache[4] || (_cache[4] = function () {
      return _ctx.handleError && _ctx.handleError(...arguments);
    }),
    onClick: _cache[5] || (_cache[5] = function () {
      return _ctx.handleClick && _ctx.handleClick(...arguments);
    })
  }, null, 46 /* CLASS, STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_2))], 6 /* CLASS, STYLE */)), [[_directive_ripple, {
    disabled: !_ctx.ripple
  }]]);
}
var __sfc__ = defineComponent({
  name: 'VarImage',
  directives: {
    Lazy,
    Ripple
  },
  props,
  setup(props) {
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
      var {
        lazy,
        onError
      } = props;
      !lazy && call(onError, e);
    };
    var handleClick = e => {
      call(props.onClick, e);
    };
    return {
      n,
      classes,
      toSizeUnit,
      handleLoad,
      handleError,
      handleClick
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;