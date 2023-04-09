function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { defineComponent, computed, reactive, onUpdated, toRefs } from 'vue';
import { toSizeUnit } from '../utils/elements.mjs';
import { isBoolean, toNumber } from '@varlet/shared';
import { props } from './props.mjs';
import { createNamespace } from '../utils/components.mjs';
import { useMounted } from '@varlet/use';
var {
  n,
  classes
} = createNamespace('divider');
import { renderSlot as _renderSlot, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeStyle as _normalizeStyle } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box'), [_ctx.vertical, _ctx.n('--vertical')], [_ctx.withText, _ctx.n('--with-text')], [_ctx.isInset, _ctx.n('--inset')], [_ctx.dashed, _ctx.n('--dashed')], [_ctx.hairline, _ctx.n('--hairline')])),
    style: _normalizeStyle(_ctx.style)
  }, [_renderSlot(_ctx.$slots, "default", {}, () => [_ctx.description ? (_openBlock(), _createElementBlock("span", {
    key: 0,
    class: _normalizeClass(_ctx.n('text'))
  }, _toDisplayString(_ctx.description), 3 /* TEXT, CLASS */)) : _createCommentVNode("v-if", true)])], 6 /* CLASS, STYLE */);
}

var __sfc__ = defineComponent({
  name: 'VarDivider',
  props,
  setup(props, _ref) {
    var {
      slots
    } = _ref;
    var state = reactive({
      withText: false
    });
    var isInset = computed(() => {
      return isBoolean(props.inset) ? props.inset : true;
    });
    var style = computed(() => {
      var {
        inset,
        vertical,
        margin
      } = props;
      var baseStyle = {
        margin
      };
      if (isBoolean(inset) || inset === 0) {
        return _extends({}, baseStyle);
      }
      var _inset = toNumber(inset);
      var absInsetWithUnit = Math.abs(_inset) + (inset + '').replace(_inset + '', '');
      return vertical ? _extends({}, baseStyle, {
        height: "calc(80% - " + toSizeUnit(absInsetWithUnit) + ")"
      }) : _extends({}, baseStyle, {
        width: "calc(100% - " + toSizeUnit(absInsetWithUnit) + ")",
        left: _inset > 0 ? toSizeUnit(absInsetWithUnit) : toSizeUnit(0)
      });
    });
    var checkHasText = () => {
      state.withText = Boolean(slots.default) || Boolean(props.description);
    };
    useMounted(() => {
      checkHasText();
    });
    onUpdated(() => {
      checkHasText();
    });
    return _extends({
      n,
      classes
    }, toRefs(state), {
      style,
      isInset
    });
  }
});
__sfc__.render = __render__;
export default __sfc__;