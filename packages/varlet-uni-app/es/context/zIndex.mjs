import context from './index.mjs';
import { watch, ref } from 'vue';
export function useZIndex(source, count) {
  var zIndex = ref(context.zIndex);
  watch(source, newValue => {
    if (newValue) {
      context.zIndex += count;
      zIndex.value = context.zIndex;
    }
  }, {
    immediate: true
  });
  return {
    zIndex
  };
}