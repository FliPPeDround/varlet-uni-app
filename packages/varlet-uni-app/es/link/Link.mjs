import { computed, defineComponent } from 'vue';
import { props } from './props.mjs';
import { call, createNamespace } from '../utils/components.mjs';
import { toSizeUnit } from '../utils/elements.mjs';
var {
  n,
  classes
} = createNamespace('link');
import { renderSlot as _renderSlot, resolveDynamicComponent as _resolveDynamicComponent, mergeProps as _mergeProps, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createBlock(_resolveDynamicComponent(_ctx.tag), _mergeProps(_ctx.linkProps, {
    class: _ctx.classes(_ctx.n(), _ctx.n('$--box'), _ctx.n('$--inline-flex'), _ctx.n("--" + _ctx.type), [_ctx.underline !== 'none', _ctx.n("--underline-" + _ctx.underline)], [_ctx.disabled, _ctx.n('--disabled')]),
    style: {
      color: _ctx.textColor,
      fontSize: _ctx.toSizeUnit(_ctx.textSize)
    },
    onClick: _ctx.handleClick
  }), {
    default: _withCtx(() => [_renderSlot(_ctx.$slots, "default")]),
    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */, ["class", "style", "onClick"]);
}
var __sfc__ = defineComponent({
  name: 'VarLink',
  props,
  setup(props) {
    var tag = computed(() => {
      if (props.disabled) {
        return 'span';
      }
      if (props.href) {
        return 'a';
      }
      if (props.to) {
        return 'router-link';
      }
      return 'a';
    });
    var linkProps = computed(() => {
      var {
        disabled,
        href,
        target,
        to,
        replace
      } = props;
      if (disabled) {
        return {};
      }
      if (href) {
        return {
          href,
          target
        };
      }
      if (to) {
        return {
          to,
          target,
          replace
        };
      }
      return {};
    });
    var handleClick = e => {
      var {
        disabled,
        onClick
      } = props;
      if (disabled) {
        return;
      }
      call(onClick, e);
    };
    return {
      n,
      classes,
      tag,
      linkProps,
      handleClick,
      toSizeUnit
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;