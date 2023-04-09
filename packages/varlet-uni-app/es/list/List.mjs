function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import VarLoading from '../loading/index.mjs';
import Ripple from '../ripple/index.mjs';
import { defineComponent, onUnmounted, ref, nextTick } from 'vue';
import { getParentScroller, toPxNum } from '../utils/elements.mjs';
import { props } from './props.mjs';
import { isNumber } from '@varlet/shared';
import { dt } from '../utils/shared.mjs';
import { createNamespace, call } from '../utils/components.mjs';
import { pack } from '../locale/index.mjs';
import { useMounted } from '@varlet/use';
var {
  n,
  classes
} = createNamespace('list');
import { renderSlot as _renderSlot, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, createCommentVNode as _createCommentVNode, createTextVNode as _createTextVNode, resolveDirective as _resolveDirective, openBlock as _openBlock, createElementBlock as _createElementBlock, withDirectives as _withDirectives } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_loading = _resolveComponent("var-loading");
  var _directive_ripple = _resolveDirective("ripple");
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box'))),
    ref: "listEl"
  }, [_renderSlot(_ctx.$slots, "default"), _ctx.loading ? _renderSlot(_ctx.$slots, "loading", {
    key: 0
  }, () => [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('loading'))
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('loading-text'))
  }, _toDisplayString(_ctx.dt(_ctx.loadingText, _ctx.pack.listLoadingText)), 3 /* TEXT, CLASS */), _createVNode(_component_var_loading, {
    size: "mini",
    radius: 10
  })], 2 /* CLASS */)]) : _createCommentVNode("v-if", true), _ctx.finished ? _renderSlot(_ctx.$slots, "finished", {
    key: 1
  }, () => [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('finished'))
  }, _toDisplayString(_ctx.dt(_ctx.finishedText, _ctx.pack.listFinishedText)), 3 /* TEXT, CLASS */)]) : _createCommentVNode("v-if", true), _ctx.error ? _renderSlot(_ctx.$slots, "error", {
    key: 2
  }, () => [_withDirectives((_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n('error')),
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.load && _ctx.load(...arguments);
    })
  }, [_createTextVNode(_toDisplayString(_ctx.dt(_ctx.errorText, _ctx.pack.listErrorText)), 1 /* TEXT */)], 2 /* CLASS */)), [[_directive_ripple]])]) : _createCommentVNode("v-if", true), _createElementVNode("div", {
    class: _normalizeClass(_ctx.n('detector')),
    ref: "detectorEl"
  }, null, 2 /* CLASS */)], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarList',
  directives: {
    Ripple
  },
  components: {
    VarLoading
  },
  props,
  setup(props) {
    var listEl = ref(null);
    var detectorEl = ref(null);
    var scroller;
    var load = () => {
      call(props['onUpdate:error'], false);
      call(props['onUpdate:loading'], true);
      call(props.onLoad);
    };
    var isReachBottom = () => {
      var containerBottom = scroller === window ? window.innerHeight : scroller.getBoundingClientRect().bottom;
      var {
        bottom: detectorBottom
      } = detectorEl.value.getBoundingClientRect();

      // The fractional part of the detectorBottom when bottoming out overflows
      // https://github.com/varletjs/varlet/issues/310
      return Math.floor(detectorBottom) - toPxNum(props.offset) <= containerBottom;
    };

    // expose
    var check = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* () {
        yield nextTick();
        var {
          loading,
          finished,
          error
        } = props;
        if (!loading && !finished && !error && isReachBottom()) {
          load();
        }
      });
      return function check() {
        return _ref.apply(this, arguments);
      };
    }();
    useMounted(() => {
      scroller = getParentScroller(listEl.value);
      props.immediateCheck && check();
      scroller.addEventListener('scroll', check);
    });
    onUnmounted(() => {
      scroller.removeEventListener('scroll', check);
    });
    return {
      pack,
      listEl,
      detectorEl,
      dt,
      isNumber,
      load,
      check,
      n,
      classes
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;