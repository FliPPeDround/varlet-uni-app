import { useParent } from '@varlet/use';
import { ROW_BIND_COL_KEY } from '../row/provide.mjs';
export function useRow() {
  var {
    parentProvider,
    index,
    bindParent
  } = useParent(ROW_BIND_COL_KEY);
  return {
    index,
    row: parentProvider,
    bindRow: bindParent
  };
}