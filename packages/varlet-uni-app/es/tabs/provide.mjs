import { useChildren } from '@varlet/use';
export var TABS_BIND_TAB_KEY = Symbol('TABS_BIND_TAB_KEY');
export function useTabList() {
  var {
    childProviders,
    bindChildren,
    length
  } = useChildren(TABS_BIND_TAB_KEY);
  return {
    length,
    tabList: childProviders,
    bindTabList: bindChildren
  };
}