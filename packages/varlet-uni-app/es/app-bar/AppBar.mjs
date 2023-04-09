import { defineComponent, ref, onUpdated, computed } from 'vue';
import { props } from './props.mjs';
import { createNamespace, formatElevation } from '../utils/components.mjs';
import { useMounted } from '@varlet/use';
var {
  n,
  classes
} = createNamespace('app-bar');
import { renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box'), [_ctx.safeAreaTop, _ctx.n('--safe-area-top')], [_ctx.round, _ctx.n('--round')], _ctx.formatElevation(_ctx.elevation, 3))),
    style: _normalizeStyle(_ctx.rootStyles)
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('toolbar'))
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('left'))
  }, [_renderSlot(_ctx.$slots, "left"), _ctx.titlePosition === 'left' ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('title')),
    style: _normalizeStyle({
      paddingLeft: _ctx.paddingLeft
    })
  }, [_renderSlot(_ctx.$slots, "default", {}, () => [_createTextVNode(_toDisplayString(_ctx.title), 1 /* TEXT */)])], 6 /* CLASS, STYLE */)) : _createCommentVNode("v-if", true)], 2 /* CLASS */), _ctx.titlePosition === 'center' ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('title'))
  }, [_renderSlot(_ctx.$slots, "default", {}, () => [_createTextVNode(_toDisplayString(_ctx.title), 1 /* TEXT */)])], 2 /* CLASS */)) : _createCommentVNode("v-if", true), _createElementVNode("div", {
    class: _normalizeClass(_ctx.n('right'))
  }, [_ctx.titlePosition === 'right' ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('title')),
    style: _normalizeStyle({
      paddingRight: _ctx.paddingRight
    })
  }, [_renderSlot(_ctx.$slots, "default", {}, () => [_createTextVNode(_toDisplayString(_ctx.title), 1 /* TEXT */)])], 6 /* CLASS, STYLE */)) : _createCommentVNode("v-if", true), _renderSlot(_ctx.$slots, "right")], 2 /* CLASS */)], 2 /* CLASS */), _renderSlot(_ctx.$slots, "content")], 6 /* CLASS, STYLE */);
}

var __sfc__ = defineComponent({
  name: 'VarAppBar',
  props,
  setup(props, _ref) {
    var {
      slots
    } = _ref;
    var paddingLeft = ref();
    var paddingRight = ref();
    var computePadding = () => {
      paddingLeft.value = slots.left ? 0 : undefined;
      paddingRight.value = slots.right ? 0 : undefined;
    };
    var rootStyles = computed(() => {
      var {
        image,
        color,
        textColor,
        imageLinearGradient
      } = props;
      if (image != null) {
        var gradient = imageLinearGradient ? "linear-gradient(" + imageLinearGradient + "), " : '';
        return {
          'background-image': gradient + "url(" + image + ")",
          'background-position': 'center center',
          'background-size': 'cover'
        };
      }
      return {
        background: color,
        color: textColor
      };
    });
    useMounted(computePadding);
    onUpdated(computePadding);
    return {
      n,
      classes,
      formatElevation,
      rootStyles,
      paddingLeft,
      paddingRight
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;