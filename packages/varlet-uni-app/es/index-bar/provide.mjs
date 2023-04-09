import { useChildren } from '@varlet/use';
export var INDEX_BAR_BIND_INDEX_ANCHOR_KEY = Symbol('INDEX_BAR_BIND_INDEX_ANCHOR_KEY');
export function useIndexAnchors() {
  var {
    bindChildren,
    length,
    childProviders
  } = useChildren(INDEX_BAR_BIND_INDEX_ANCHOR_KEY);
  return {
    length,
    indexAnchors: childProviders,
    bindIndexAnchors: bindChildren
  };
}