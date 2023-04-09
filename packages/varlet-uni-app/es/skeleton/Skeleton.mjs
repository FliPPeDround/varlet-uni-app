import { defineComponent } from 'vue';
import { props } from './props.mjs';
import { toSizeUnit } from '../utils/elements.mjs';
import { toNumber } from '@varlet/shared';
import { createNamespace } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('skeleton');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, renderList as _renderList, Fragment as _Fragment } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('$--box'), _ctx.n()))
  }, [!_ctx.loading ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('data'))
  }, [_renderSlot(_ctx.$slots, "default")], 2 /* CLASS */)) : _createCommentVNode("v-if", true), _ctx.loading && !_ctx.fullscreen ? (_openBlock(), _createElementBlock("div", {
    key: 1,
    class: _normalizeClass(_ctx.n('content'))
  }, [_ctx.card ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('card')),
    style: _normalizeStyle({
      height: _ctx.toSizeUnit(_ctx.cardHeight)
    })
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('--animation'))
  }, null, 2 /* CLASS */)], 6 /* CLASS, STYLE */)) : _createCommentVNode("v-if", true), _ctx.avatar || _ctx.title || _ctx.toNumber(_ctx.rows) > 0 ? (_openBlock(), _createElementBlock("div", {
    key: 1,
    class: _normalizeClass(_ctx.n('article'))
  }, [_ctx.avatar ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('avatar')),
    style: _normalizeStyle({
      width: _ctx.toSizeUnit(_ctx.avatarSize),
      height: _ctx.toSizeUnit(_ctx.avatarSize)
    })
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('--animation'))
  }, null, 2 /* CLASS */)], 6 /* CLASS, STYLE */)) : _createCommentVNode("v-if", true), _ctx.title || _ctx.toNumber(_ctx.rows) > 0 ? (_openBlock(), _createElementBlock("div", {
    key: 1,
    class: _normalizeClass(_ctx.n('section'))
  }, [_ctx.title ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('title')),
    style: _normalizeStyle({
      width: _ctx.toSizeUnit(_ctx.titleWidth)
    })
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('--animation'))
  }, null, 2 /* CLASS */)], 6 /* CLASS, STYLE */)) : _createCommentVNode("v-if", true), (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.toNumber(_ctx.rows), (r, index) => {
    return _openBlock(), _createElementBlock("div", {
      class: _normalizeClass(_ctx.n('row')),
      key: r,
      style: _normalizeStyle({
        width: _ctx.toSizeUnit(_ctx.rowsWidth[index])
      })
    }, [_createElementVNode("div", {
      class: _normalizeClass(_ctx.n('--animation'))
    }, null, 2 /* CLASS */)], 6 /* CLASS, STYLE */);
  }), 128 /* KEYED_FRAGMENT */))], 2 /* CLASS */)) : _createCommentVNode("v-if", true)], 2 /* CLASS */)) : _createCommentVNode("v-if", true)], 2 /* CLASS */)) : _createCommentVNode("v-if", true), _ctx.loading && _ctx.fullscreen ? (_openBlock(), _createElementBlock("div", {
    key: 2,
    class: _normalizeClass(_ctx.n('fullscreen')),
    style: _normalizeStyle({
      zIndex: _ctx.toNumber(_ctx.fullscreenZIndex)
    })
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('--animation'))
  }, null, 2 /* CLASS */)], 6 /* CLASS, STYLE */)) : _createCommentVNode("v-if", true)], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarSkeleton',
  props,
  setup() {
    return {
      n,
      classes,
      toSizeUnit,
      toNumber
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;