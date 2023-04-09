import { useChildren } from '@varlet/use';
export var ROW_BIND_COL_KEY = Symbol('ROW_BIND_COL_KEY');
export function useCols() {
  var {
    bindChildren,
    childProviders,
    length
  } = useChildren(ROW_BIND_COL_KEY);
  return {
    length,
    cols: childProviders,
    bindCols: bindChildren
  };
}