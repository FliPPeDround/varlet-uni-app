import { computed, defineComponent, nextTick, watch } from 'vue';
import { useCollapseItem } from './provide.mjs';
import { props } from './props.mjs';
import { call, createNamespace } from '../utils/components.mjs';
import { isArray } from '@varlet/shared';
var {
  n
} = createNamespace('collapse');
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(_ctx.n())
  }, [_renderSlot(_ctx.$slots, "default")], 2 /* CLASS */);
}

var __sfc__ = defineComponent({
  name: 'VarCollapse',
  props,
  setup(props) {
    var {
      length,
      collapseItem,
      bindCollapseItem
    } = useCollapseItem();
    var active = computed(() => props.modelValue);
    var offset = computed(() => props.offset);
    var divider = computed(() => props.divider);
    var elevation = computed(() => props.elevation);
    var checkValue = () => {
      if (!props.accordion && !isArray(props.modelValue)) {
        console.error('[Varlet] Collapse: type of prop "modelValue" should be an Array');
        return false;
      }
      if (props.accordion && isArray(props.modelValue)) {
        console.error('[Varlet] Collapse: type of prop "modelValue" should be a String or Number');
        return false;
      }
      return true;
    };
    var getValue = (value, isExpand) => {
      if (!checkValue()) return null;
      if (isExpand) return props.accordion ? value : [...props.modelValue, value];
      return props.accordion ? null : props.modelValue.filter(name => name !== value);
    };
    var updateItem = (value, isExpand) => {
      var modelValue = getValue(value, isExpand);
      call(props['onUpdate:modelValue'], modelValue);
      call(props.onChange, modelValue);
    };
    var matchName = () => {
      if (props.accordion) {
        return collapseItem.find(_ref => {
          var {
            name
          } = _ref;
          return props.modelValue === name.value;
        });
      }
      var filterItem = collapseItem.filter(_ref2 => {
        var {
          name
        } = _ref2;
        if (name.value === undefined) return false;
        return props.modelValue.includes(name.value);
      });
      return filterItem.length ? filterItem : undefined;
    };
    var matchIndex = () => {
      if (props.accordion) {
        return collapseItem.find(_ref3 => {
          var {
            index,
            name
          } = _ref3;
          return name.value === undefined && props.modelValue === index.value;
        });
      }
      return collapseItem.filter(_ref4 => {
        var {
          index,
          name
        } = _ref4;
        return name.value === undefined && props.modelValue.includes(index.value);
      });
    };
    var resize = () => {
      if (!checkValue()) return;
      var matchProviders = matchName() || matchIndex();
      if (props.accordion && !matchProviders || !props.accordion && !matchProviders.length) {
        collapseItem.forEach(provider => {
          provider.init(props.accordion, false);
        });
        return;
      }
      collapseItem.forEach(provider => {
        var isShow = props.accordion ? matchProviders === provider : matchProviders.includes(provider);
        provider.init(props.accordion, isShow);
      });
    };
    var collapseProvider = {
      active,
      offset,
      divider,
      elevation,
      updateItem
    };
    bindCollapseItem(collapseProvider);
    watch(() => length.value, () => nextTick().then(resize));
    watch(() => props.modelValue, () => nextTick().then(resize));
    return {
      n,
      divider
    };
  }
});
__sfc__.render = __render__;
export default __sfc__;