import { useChildren } from '@varlet/use';
export var TABS_ITEMS_BIND_TAB_ITEM_KEY = Symbol('TABS_ITEMS_BIND_TAB_ITEM_KEY');
export function useTabItem() {
  var {
    bindChildren,
    childProviders,
    length
  } = useChildren(TABS_ITEMS_BIND_TAB_ITEM_KEY);
  return {
    length,
    tabItemList: childProviders,
    bindTabItem: bindChildren
  };
}