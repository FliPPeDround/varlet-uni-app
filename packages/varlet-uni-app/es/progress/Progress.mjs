import { defineComponent, computed } from 'vue';
import { props } from './props.mjs';
import { toNumber } from '@varlet/shared';
import { toSizeUnit, multiplySizeUnit, toPxNum } from '../utils/elements.mjs';
import { createNamespace } from '../utils/components.mjs';
var {
  n,
  classes
} = createNamespace('progress');
import { normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
var _withScopeId = n => (_pushScopeId(""), n = n(), _popScopeId(), n);
var _hoisted_1 = ["viewBox"];
var _hoisted_2 = ["cx", "cy", "r", "stroke-width"];
var _hoisted_3 = ["cx", "cy", "r", "stroke-width"];
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n())
  }, [_ctx.mode === 'linear' ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('linear'))
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.n('linear-block')),
    style: _normalizeStyle({
      height: _ctx.toSizeUnit(_ctx.lineWidth)
    })
  }, [_ctx.track ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.n('linear-background')),
    style: _normalizeStyle({
      background: _ctx.trackColor
    })
  }, null, 6 /* CLASS, STYLE */)) : _createCommentVNode("v-if", true), _createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('linear-certain'), [_ctx.ripple, _ctx.n('linear-ripple')])),
    style: _normalizeStyle({
      background: _ctx.color,
      width: _ctx.linearProps.width
    })
  }, null, 6 /* CLASS, STYLE */)], 6 /* CLASS, STYLE */), _ctx.label ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.classes(_ctx.n('linear-label'), [_ctx.labelClass, _ctx.labelClass]))
  }, [_renderSlot(_ctx.$slots, "default", {}, () => [_createTextVNode(_toDisplayString(_ctx.linearProps.roundValue), 1 /* TEXT */)])], 2 /* CLASS */)) : _createCommentVNode("v-if", true)], 2 /* CLASS */)) : _createCommentVNode("v-if", true), _ctx.mode === 'circle' ? (_openBlock(), _createElementBlock("div", {
    key: 1,
    class: _normalizeClass(_ctx.n('circle')),
    style: _normalizeStyle({
      width: _ctx.toSizeUnit(_ctx.size),
      height: _ctx.toSizeUnit(_ctx.size)
    })
  }, [(_openBlock(), _createElementBlock("svg", {
    class: _normalizeClass(_ctx.n('circle-svg')),
    style: _normalizeStyle({
      transform: "rotate(" + (_ctx.rotate - 90) + "deg)"
    }),
    viewBox: _ctx.circleProps.viewBox
  }, [_ctx.track ? (_openBlock(), _createElementBlock("circle", {
    key: 0,
    class: _normalizeClass(_ctx.n('circle-background')),
    cx: _ctx.multiplySizeUnit(_ctx.size, 0.5),
    cy: _ctx.multiplySizeUnit(_ctx.size, 0.5),
    r: _ctx.circleProps.radius,
    fill: "transparent",
    "stroke-width": _ctx.toSizeUnit(_ctx.lineWidth),
    style: _normalizeStyle({
      strokeDasharray: _ctx.circleProps.perimeter,
      stroke: _ctx.trackColor
    })
  }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_2)) : _createCommentVNode("v-if", true), _createElementVNode("circle", {
    class: _normalizeClass(_ctx.n('circle-certain')),
    cx: _ctx.multiplySizeUnit(_ctx.size, 0.5),
    cy: _ctx.multiplySizeUnit(_ctx.size, 0.5),
    r: _ctx.circleProps.radius,
    fill: "transparent",
    "stroke-width": _ctx.toSizeUnit(_ctx.lineWidth),
    style: _normalizeStyle({
      strokeDasharray: _ctx.circleProps.strokeDasharray,
      stroke: _ctx.color
    })
  }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_3)], 14 /* CLASS, STYLE, PROPS */, _hoisted_1)), _ctx.label ? (_openBlock(), _createElementBlock("div", {
    key: 0,
    class: _normalizeClass(_ctx.classes(_ctx.n('circle-label'), [_ctx.labelClass, _ctx.labelClass]))
  }, [_renderSlot(_ctx.$slots, "default", {}, () => [_createTextVNode(_toDisplayString(_ctx.circleProps.roundValue), 1 /* TEXT */)])], 2 /* CLASS */)) : _createCommentVNode("v-if", true)], 6 /* CLASS, STYLE */)) : _createCommentVNode("v-if", true)], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarProgress',
  props,
  setup(props) {
    var linearProps = computed(() => {
      var value = toNumber(props.value);
      var width = value > 100 ? 100 : value;
      var roundValue = value > 100 ? 100 : Math.round(value);
      return {
        width: width + "%",
        roundValue: roundValue + "%"
      };
    });
    var circleProps = computed(() => {
      var {
        size,
        lineWidth,
        value
      } = props;
      var viewBox = "0 0 " + toPxNum(size) + " " + toPxNum(size);
      var roundValue = toNumber(value) > 100 ? 100 : Math.round(toNumber(value));
      var radius = (toPxNum(size) - toPxNum(lineWidth)) / 2;
      var perimeter = 2 * Math.PI * radius;
      var strokeDasharray = roundValue / 100 * perimeter + ", " + perimeter;
      return {
        viewBox,
        radius,
        strokeDasharray,
        perimeter,
        roundValue: roundValue + "%"
      };
    });
    return {
      n,
      classes,
      toSizeUnit,
      multiplySizeUnit,
      linearProps,
      circleProps
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;