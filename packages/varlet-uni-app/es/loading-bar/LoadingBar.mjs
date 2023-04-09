import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import context from '../context/index.mjs';
import { createNamespace } from '../utils/components.mjs';
import { toSizeUnit } from '../utils/elements.mjs';
import { props } from './props.mjs';


var {
  classes,
  n
} = createNamespace('loading-bar');
export default defineComponent({
  name: 'VarLoadingBar',
  props,
  setup(props) {
    return () => {
      return _createVNode("div", {
        "class": classes(n(), [props.error, n('--error')]),
        "style": {
          zIndex: context.zIndex + 10,
          width: props.value + "%",
          opacity: props.opacity,
          height: toSizeUnit(props.height),
          backgroundColor: props.error ? props.errorColor : props.color,
          top: toSizeUnit(props.top)
        }
      }, null);
    };
  }
});