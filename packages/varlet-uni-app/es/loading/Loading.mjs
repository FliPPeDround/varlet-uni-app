import { computed, defineComponent } from 'vue';
import { props } from './props.mjs';
import { createNamespace, call } from '../utils/components.mjs';
import { multiplySizeUnit } from '../utils/elements.mjs';
var {
  n,
  classes
} = createNamespace('loading');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, renderList as _renderList, Fragment as _Fragment, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/_createElementVNode("svg", {
  viewBox: "25 25 50 50"
}, [/*#__PURE__*/_createElementVNode("circle", {
  cx: "50",
  cy: "50",
  r: "20",
  fill: "none"
})], -1 /* HOISTED */));
var _hoisted_2 = [_hoisted_1];
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n())
  }, [_ctx.$slots.default ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.classes(_ctx.n('content'), [_ctx.loading, _ctx.n('content--active')]))
  }, [_renderSlot(_ctx.$slots, "default"), _ctx.loading ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('content-mask'))
  }, null, 2 /* CLASS */)) : _createCommentVNode("v-if", true)], 2 /* CLASS */)) : _createCommentVNode("v-if", true), _ctx.isShow ? (_openBlock(), _createElementBlock("div", {
    key: 1,
    class: _normalizeClass(_ctx.classes(_ctx.n('$--box'), _ctx.n('body'), [_ctx.$slots.default, _ctx.n('inside')]))
  }, [_ctx.type === 'circle' ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('circle'))
  }, [_createElementVNode("span", {
    class: _normalizeClass(_ctx.classes(_ctx.n('circle-block'), _ctx.n("circle-block--" + _ctx.size))),
    style: _normalizeStyle({
      width: _ctx.multiplySizeUnit(_ctx.radius, 2),
      height: _ctx.multiplySizeUnit(_ctx.radius, 2),
      color: _ctx.color
    })
  }, _hoisted_2, 6 /* CLASS, STYLE */)], 2 /* CLASS */)) : _createCommentVNode("v-if", true), (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.loadingTypeDict, (nums, key) => {
    return _openBlock(), _createElementBlock(_Fragment, {
      key: key
    }, [_ctx.type === key ? (_openBlock(), _createElementBlock("div", {
      key: 0,
      class: _normalizeClass(_ctx.classes(_ctx.n(key), _ctx.n(key + "--" + _ctx.size)))
    }, [(_openBlock(true), _createElementBlock(_Fragment, null, _renderList(nums, num => {
      return _openBlock(), _createElementBlock("div", {
        key: num + key,
        style: _normalizeStyle({
          backgroundColor: _ctx.color
        }),
        class: _normalizeClass(_ctx.classes(_ctx.n(key + "-item"), _ctx.n(key + "-item--" + _ctx.size)))
      }, null, 6 /* CLASS, STYLE */);
    }), 128 /* KEYED_FRAGMENT */))], 2 /* CLASS */)) : _createCommentVNode("v-if", true)], 64 /* STABLE_FRAGMENT */);
  }), 128 /* KEYED_FRAGMENT */)), _ctx.$slots.description || _ctx.description ? (_openBlock(), _createElementBlock("div", {
    key: 1,
    class: _normalizeClass(_ctx.classes(_ctx.n('description'), _ctx.n("description--" + _ctx.size))),
    style: _normalizeStyle({
      color: _ctx.color
    })
  }, [_renderSlot(_ctx.$slots, "description", {}, () => [_createTextVNode(_toDisplayString(_ctx.description), 1 /* TEXT */)])], 6 /* CLASS, STYLE */)) : _createCommentVNode("v-if", true)], 2 /* CLASS */)) : _createCommentVNode("v-if", true)], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarLoading',
  props,
  setup(props, _ref) {
    var {
      slots
    } = _ref;
    var loadingTypeDict = {
      wave: 5,
      cube: 4,
      rect: 8,
      disappear: 3
    };
    var isShow = computed(() => {
      if (!call(slots.default)) return true;
      return props.loading;
    });
    return {
      n,
      classes,
      multiplySizeUnit,
      loadingTypeDict,
      isShow
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;