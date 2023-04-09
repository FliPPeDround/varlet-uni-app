import { useChildren } from '@varlet/use';
export var SWIPE_BIND_SWIPE_ITEM_KEY = Symbol('SWIPE_BIND_SWIPE_ITEM_KEY');
export function useSwipeItems() {
  var {
    childProviders,
    length,
    bindChildren
  } = useChildren(SWIPE_BIND_SWIPE_ITEM_KEY);
  return {
    length,
    swipeItems: childProviders,
    bindSwipeItems: bindChildren
  };
}