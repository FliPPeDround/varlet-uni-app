import { computed, defineComponent } from 'vue';
import { useStep } from './provide.mjs';
import { props } from './props.mjs';
import { createNamespace, call } from '../utils/components.mjs';
var {
  n
} = createNamespace('steps');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n()),
    style: _normalizeStyle({
      flexDirection: _ctx.direction === 'horizontal' ? 'row' : 'column'
    })
  }, [_renderSlot(_ctx.$slots, "default")], 6 /* CLASS, STYLE */);
}

var __sfc__ = defineComponent({
  name: 'VarSteps',
  props,
  setup(props) {
    var active = computed(() => props.active);
    var activeColor = computed(() => props.activeColor);
    var inactiveColor = computed(() => props.inactiveColor);
    var direction = computed(() => props.direction);
    var {
      length,
      bindStep
    } = useStep();
    var clickStep = index => {
      call(props.onClickStep, index);
    };
    var stepsProvider = {
      active,
      length,
      direction,
      activeColor,
      inactiveColor,
      clickStep
    };
    bindStep(stepsProvider);
    return {
      n
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;