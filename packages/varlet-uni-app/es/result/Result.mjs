import { computed, defineComponent } from 'vue';
import { toNumber } from '@varlet/shared';
import { props } from './props.mjs';
import { createNamespace } from '../utils/components.mjs';
import { toPxNum, toSizeUnit } from '../utils/elements.mjs';
import Info from './Info.mjs';
import Error from './Error.mjs';
import Warning from './Warning.mjs';
import Success from './Success.mjs';
import Question from './Question.mjs';
import Empty from './Empty.mjs';
var {
  n,
  classes
} = createNamespace('result');
import { renderSlot as _renderSlot, resolveDynamicComponent as _resolveDynamicComponent, openBlock as _openBlock, createBlock as _createBlock, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box')))
  }, [_renderSlot(_ctx.$slots, "image", {}, () => [_ctx.type ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('image-container'))
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('image'), _ctx.n(_ctx.type))),
    style: _normalizeStyle({
      width: _ctx.circleSize,
      height: _ctx.circleSize,
      borderWidth: _ctx.borderSize
    })
  }, [(_openBlock(), _createBlock(_resolveDynamicComponent(_ctx.type), {
    "border-size": _ctx.borderSize,
    animation: _ctx.animation
  }, null, 8 /* PROPS */, ["border-size", "animation"]))], 6 /* CLASS, STYLE */)], 2 /* CLASS */)) : _createCommentVNode("v-if", true)]), _renderSlot(_ctx.$slots, "title", {}, () => [_ctx.title ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('title'))
  }, _toDisplayString(_ctx.title), 3 /* TEXT, CLASS */)) : _createCommentVNode("v-if", true)]), _renderSlot(_ctx.$slots, "description", {}, () => [_ctx.description ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('description'))
  }, _toDisplayString(_ctx.description), 3 /* TEXT, CLASS */)) : _createCommentVNode("v-if", true)]), _ctx.$slots.footer ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('footer'))
  }, [_renderSlot(_ctx.$slots, "footer")], 2 /* CLASS */)) : _createCommentVNode("v-if", true)], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarResult',
  components: {
    Info,
    Success,
    Warning,
    Error,
    Question,
    Empty
  },
  props,
  setup(props) {
    var circleSize = computed(() => {
      var {
        imageSize
      } = props;
      return "calc(" + (imageSize ? toSizeUnit(imageSize) : 'var(--result-image-size)') + " * 0.9)";
    });
    var borderSize = computed(() => {
      var {
        imageSize
      } = props;
      return "calc(" + (imageSize ? toSizeUnit(props.imageSize) : 'var(--result-image-size)') + " * 0.05)";
    });
    return {
      n,
      classes,
      toNumber,
      toPxNum,
      toSizeUnit,
      circleSize,
      borderSize
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;