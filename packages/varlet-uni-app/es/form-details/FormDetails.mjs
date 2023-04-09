import { defineComponent } from 'vue';
import { createNamespace } from '../utils/components.mjs';
import { props } from './props.mjs';
var {
  n
} = createNamespace('form-details');
import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, createBlock as _createBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = {
  key: 0
};
var _hoisted_2 = {
  key: 0
};
function __render__(_ctx, _cache) {
  return _openBlock(), _createBlock(_Transition, {
    name: _ctx.n()
  }, {
    default: _withCtx(() => [_ctx.errorMessage || _ctx.extraMessage ? (_openBlock(), _createElementBlock("div", {
      key: 0,
      class: _normalizeClass(_ctx.n())
    }, [_createElementVNode("div", {
      class: _normalizeClass(_ctx.n('error-message'))
    }, [_createVNode(_Transition, {
      name: _ctx.n('message')
    }, {
      default: _withCtx(() => [_ctx.errorMessage ? (_openBlock(), _createElementBlock("div", _hoisted_1, _toDisplayString(_ctx.errorMessage), 1 /* TEXT */)) : _createCommentVNode("v-if", true)]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["name"])], 2 /* CLASS */), _createElementVNode("div", {
      class: _normalizeClass(_ctx.n('extra-message'))
    }, [_createVNode(_Transition, {
      name: _ctx.n('message')
    }, {
      default: _withCtx(() => [_ctx.extraMessage ? (_openBlock(), _createElementBlock("div", _hoisted_2, _toDisplayString(_ctx.extraMessage), 1 /* TEXT */)) : _createCommentVNode("v-if", true)]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["name"])], 2 /* CLASS */)], 2 /* CLASS */)) : _createCommentVNode("v-if", true)]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["name"]);
}
var __sfc__ = defineComponent({
  name: 'VarFormDetails',
  props,
  setup: () => ({
    n
  })
});
__sfc__.render = __render__;
export default __sfc__;