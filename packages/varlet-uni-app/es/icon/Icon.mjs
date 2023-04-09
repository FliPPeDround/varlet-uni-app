function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import { defineComponent, watch, ref, nextTick } from 'vue';
import { isURL, toNumber } from '@varlet/shared';
import { props } from './props.mjs';
import { toSizeUnit } from '../utils/elements.mjs';
import { createNamespace } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('icon');
import { resolveDynamicComponent as _resolveDynamicComponent, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createBlock as _createBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createBlock(_resolveDynamicComponent(_ctx.isURL(_ctx.name) ? 'img' : 'i'), {
    class: _normalizeClass(_ctx.classes(_ctx.n(), [_ctx.namespace !== _ctx.n(), _ctx.namespace], _ctx.namespace + "--set", [_ctx.isURL(_ctx.name), _ctx.n('image'), _ctx.namespace + "-" + _ctx.nextName], [_ctx.animateInProgress, _ctx.animationClass == null ? _ctx.n('--shrinking') : _ctx.animationClass])),
    style: _normalizeStyle({
      color: _ctx.color,
      'transition-duration': _ctx.toNumber(_ctx.transition) + "ms",
      width: _ctx.isURL(_ctx.name) ? _ctx.toSizeUnit(_ctx.size) : null,
      height: _ctx.isURL(_ctx.name) ? _ctx.toSizeUnit(_ctx.size) : null,
      fontSize: _ctx.toSizeUnit(_ctx.size)
    }),
    src: _ctx.isURL(_ctx.name) ? _ctx.nextName : null,
    onClick: _ctx.onClick
  }, null, 8 /* PROPS */, ["class", "style", "src", "onClick"]);
}
var __sfc__ = defineComponent({
  name: 'VarIcon',
  props,
  setup(props) {
    var nextName = ref('');
    var animateInProgress = ref(false);
    var handleNameChange = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (newName, oldName) {
        var {
          transition
        } = props;
        if (oldName == null || toNumber(transition) === 0) {
          nextName.value = newName;
          return;
        }
        animateInProgress.value = true;
        yield nextTick();
        setTimeout(() => {
          if (oldName != null) {
            nextName.value = newName;
          }
          animateInProgress.value = false;
        }, toNumber(transition));
      });
      return function handleNameChange(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();
    watch(() => props.name, handleNameChange, {
      immediate: true
    });
    return {
      n,
      classes,
      nextName,
      animateInProgress,
      isURL,
      toNumber,
      toSizeUnit
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;