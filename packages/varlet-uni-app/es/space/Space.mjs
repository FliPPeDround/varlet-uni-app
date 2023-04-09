import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import { internalSizeValidator, props } from './props.mjs';
import { isArray } from '@varlet/shared';
import { call, createNamespace, flatFragment } from '../utils/components.mjs';
import { padStartFlex, toSizeUnit } from '../utils/elements.mjs';
import { computeMargin } from './margin.mjs';


var {
  n,
  classes
} = createNamespace('space');
export default defineComponent({
  name: 'VarSpace',
  props,
  setup(props, _ref) {
    var {
      slots
    } = _ref;
    var getSize = (size, isInternalSize) => {
      return isInternalSize ? ["var(--space-size-" + size + "-y)", "var(--space-size-" + size + "-x)"] : isArray(size) ? size.map(toSizeUnit) : [toSizeUnit(size), toSizeUnit(size)];
    };
    return () => {
      var _call;
      var {
        inline,
        justify,
        align,
        wrap,
        direction,
        size
      } = props;
      var children = (_call = call(slots.default)) != null ? _call : [];
      var isInternalSize = internalSizeValidator(size);
      var [y, x] = getSize(size, isInternalSize);
      children = flatFragment(children);
      var lastIndex = children.length - 1;
      var spacers = children.map((child, index) => {
        var margin = computeMargin(y, x, {
          direction,
          justify,
          index,
          lastIndex
        });
        return _createVNode("div", {
          "style": {
            margin
          }
        }, [child]);
      });
      return _createVNode("div", {
        "class": classes(n(), n('$--box'), [inline, n('--inline')]),
        "style": {
          flexDirection: direction,
          justifyContent: padStartFlex(justify),
          alignItems: padStartFlex(align),
          flexWrap: wrap ? 'wrap' : 'nowrap',
          margin: direction === 'row' ? "calc(-1 * " + y + " / 2) 0" : undefined
        }
      }, [spacers]);
    };
  }
});