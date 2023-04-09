import VarCheckbox from '../checkbox/index.mjs';
import Ripple from '../ripple/index.mjs';
import { defineComponent, computed, ref, watch } from 'vue';
import { useSelect } from './provide.mjs';
import { createNamespace } from '../utils/components.mjs';
import { props } from './props.mjs';
var {
  n,
  classes
} = createNamespace('option');
import { normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, withModifiers as _withModifiers, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, resolveDirective as _resolveDirective, createElementBlock as _createElementBlock, withDirectives as _withDirectives } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_checkbox = _resolveComponent("var-checkbox");
  var _directive_ripple = _resolveDirective("ripple");
  return _withDirectives((_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n(), _ctx.n('$--box'), [_ctx.optionSelected, _ctx.n('--selected-color')])),
    style: _normalizeStyle({
      width: _ctx.wrapWidth,
      color: _ctx.optionSelected ? _ctx.focusColor : undefined
    }),
    onClick: _cache[2] || (_cache[2] = function () {
      return _ctx.handleClick && _ctx.handleClick(...arguments);
    })
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('cover'), [_ctx.optionSelected, _ctx.n('--selected-background')])),
    style: _normalizeStyle({
      background: _ctx.optionSelected ? _ctx.focusColor : undefined
    })
  }, null, 6 /* CLASS, STYLE */), _ctx.multiple ? (_openBlock(), _createBlock(_component_var_checkbox, {
    key: 0,
    ref: "checkbox",
    "checked-color": _ctx.focusColor,
    modelValue: _ctx.optionSelected,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.optionSelected = $event),
    onClick: _cache[1] || (_cache[1] = _withModifiers(() => {}, ["stop"])),
    onChange: _ctx.handleSelect
  }, null, 8 /* PROPS */, ["checked-color", "modelValue", "onChange"])) : _createCommentVNode("v-if", true), _createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('text'), _ctx.n('$--ellipsis')))
  }, [_renderSlot(_ctx.$slots, "default", {}, () => [_createTextVNode(_toDisplayString(_ctx.label), 1 /* TEXT */)])], 2 /* CLASS */)], 6 /* CLASS, STYLE */)), [[_directive_ripple]]);
}
var __sfc__ = defineComponent({
  name: 'VarOption',
  directives: {
    Ripple
  },
  components: {
    VarCheckbox
  },
  props,
  setup(props) {
    var optionSelected = ref(false);
    var selected = computed(() => optionSelected.value);
    var label = computed(() => props.label);
    var value = computed(() => props.value);
    var {
      select,
      bindSelect
    } = useSelect();
    var {
      wrapWidth,
      multiple,
      focusColor,
      onSelect,
      computeLabel
    } = select;
    var handleClick = () => {
      optionSelected.value = !optionSelected.value;
      onSelect(optionProvider);
    };
    var handleSelect = () => onSelect(optionProvider);
    var sync = checked => {
      optionSelected.value = checked;
    };
    var optionProvider = {
      label,
      value,
      selected,
      sync
    };
    watch([() => props.label, () => props.value], computeLabel);
    bindSelect(optionProvider);
    return {
      n,
      classes,
      optionSelected,
      wrapWidth,
      multiple,
      focusColor,
      handleClick,
      handleSelect
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;