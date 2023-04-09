import { useChildren } from '@varlet/use';
export var BOTTOM_NAVIGATION_BIND_BOTTOM_NAVIGATION_ITEM_KEY = Symbol('BOTTOM_NAVIGATION_BIND_BOTTOM_NAVIGATION_ITEM_KEY');
export function useBottomNavigationItems() {
  var {
    childProviders,
    length,
    bindChildren
  } = useChildren(BOTTOM_NAVIGATION_BIND_BOTTOM_NAVIGATION_ITEM_KEY);
  return {
    length,
    bottomNavigationItems: childProviders,
    bindBottomNavigationItem: bindChildren
  };
}