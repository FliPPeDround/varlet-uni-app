import { useChildren } from '@varlet/use';
export var COLLAPSE_BIND_COLLAPSE_ITEM_KEY = Symbol('COLLAPSE_BIND_COLLAPSE_ITEM_KEY');
export function useCollapseItem() {
  var {
    childProviders,
    length,
    bindChildren
  } = useChildren(COLLAPSE_BIND_COLLAPSE_ITEM_KEY);
  return {
    length,
    collapseItem: childProviders,
    bindCollapseItem: bindChildren
  };
}