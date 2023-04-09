import { defineComponent, h } from 'vue';
import { formatStyleVars } from '../utils/elements.mjs';
import { call, createNamespace } from '../utils/components.mjs';
import { props } from './props.mjs';
var {
  n
} = createNamespace('style-provider');
var __sfc__ = defineComponent({
  name: 'VarStyleProvider',
  props,
  setup(props, _ref) {
    var {
      slots
    } = _ref;
    return () => h(props.tag, {
      class: n(),
      style: formatStyleVars(props.styleVars)
    }, call(slots.default));
  }
});
export default __sfc__;