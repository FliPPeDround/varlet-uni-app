import VarLoading from '../loading/index.mjs';
import VarIcon from '../icon/index.mjs';
import { defineComponent, watch, ref, computed } from 'vue';
import { useZIndex } from '../context/zIndex.mjs';
import { props } from './props.mjs';
import { useLock } from '../context/lock.mjs';
import { SNACKBAR_TYPE } from './index.mjs';
import { call, createNamespace } from '../utils/components.mjs';
import { useMounted } from '@varlet/use';
var {
  n,
  classes
} = createNamespace('snackbar');
var ICON_TYPE_DICT = {
  success: 'checkbox-marked-circle',
  warning: 'warning',
  info: 'information',
  error: 'error',
  loading: ''
};
import { renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, normalizeStyle as _normalizeStyle, vShow as _vShow, withDirectives as _withDirectives, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  var _component_var_icon = _resolveComponent("var-icon");
  var _component_var_loading = _resolveComponent("var-loading");
  return _withDirectives((_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n()),
    style: _normalizeStyle({
      pointerEvents: _ctx.isForbidClick ? 'auto' : 'none',
      zIndex: _ctx.zIndex
    })
  }, [_createElementVNode("div", {
    class: _normalizeClass(_ctx.classes(_ctx.n('wrapper'), _ctx.n("wrapper-" + _ctx.position), _ctx.n('$-elevation--4'), [_ctx.vertical, _ctx.n('vertical')], [_ctx.type && _ctx.SNACKBAR_TYPE.includes(_ctx.type), _ctx.n("wrapper-" + _ctx.type)])),
    style: _normalizeStyle({
      zIndex: _ctx.zIndex
    })
  }, [_createElementVNode("div", {
    class: _normalizeClass([_ctx.n('content'), _ctx.contentClass])
  }, [_renderSlot(_ctx.$slots, "default", {}, () => [_createTextVNode(_toDisplayString(_ctx.content), 1 /* TEXT */)])], 2 /* CLASS */), _createElementVNode("div", {
    class: _normalizeClass(_ctx.n('action'))
  }, [_ctx.iconName ? (_openBlock(), _createBlock(_component_var_icon, {
    key: 0,
    name: _ctx.iconName
  }, null, 8 /* PROPS */, ["name"])) : _createCommentVNode("v-if", true), _ctx.type === 'loading' ? (_openBlock(), _createBlock(_component_var_loading, {
    key: 1,
    type: _ctx.loadingType,
    size: _ctx.loadingSize,
    color: _ctx.loadingColor,
    radius: _ctx.loadingRadius
  }, null, 8 /* PROPS */, ["type", "size", "color", "radius"])) : _createCommentVNode("v-if", true), _renderSlot(_ctx.$slots, "action")], 2 /* CLASS */)], 6 /* CLASS, STYLE */)], 6 /* CLASS, STYLE */)), [[_vShow, _ctx.show]]);
}
var __sfc__ = defineComponent({
  name: 'VarSnackbarCore',
  components: {
    VarLoading,
    VarIcon
  },
  props,
  setup(props) {
    var timer = ref(null);
    var {
      zIndex
    } = useZIndex(() => props.show, 1);
    useLock(() => props.show, () => props.lockScroll);
    var isForbidClick = computed(() => props.type === 'loading' || props.forbidClick);
    var iconName = computed(() => {
      if (!props.type) return '';
      return ICON_TYPE_DICT[props.type];
    });
    var updateAfterDuration = () => {
      timer.value = setTimeout(() => {
        props.type !== 'loading' && call(props['onUpdate:show'], false);
      }, props.duration);
    };
    watch(() => props.show, show => {
      if (show) {
        call(props.onOpen);
        updateAfterDuration();
      } else if (show === false) {
        clearTimeout(timer.value);
        call(props.onClose);
      }
    });
    watch(() => props._update, () => {
      clearTimeout(timer.value);
      updateAfterDuration();
    });
    useMounted(() => {
      if (props.show) {
        call(props.onOpen);
        updateAfterDuration();
      }
    });
    return {
      SNACKBAR_TYPE,
      n,
      classes,
      zIndex,
      iconName,
      isForbidClick
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;