import { useParent } from '@varlet/use';
import { error } from '../utils/logger.mjs';
import { COLLAPSE_BIND_COLLAPSE_ITEM_KEY } from '../collapse/provide.mjs';
export function useCollapse() {
  var {
    parentProvider,
    index,
    bindParent
  } = useParent(COLLAPSE_BIND_COLLAPSE_ITEM_KEY);
  if (!bindParent) {
    error('Collapse', '<var-collapse-item/> must in <var-collapse>');
  }
  return {
    index,
    collapse: parentProvider,
    bindCollapse: bindParent
  };
}