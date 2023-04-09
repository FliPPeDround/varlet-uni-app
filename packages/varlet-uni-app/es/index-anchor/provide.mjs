import { useParent } from '@varlet/use';
import { error } from '../utils/logger.mjs';
import { INDEX_BAR_BIND_INDEX_ANCHOR_KEY } from '../index-bar/provide.mjs';
export function useIndexBar() {
  var {
    parentProvider,
    index,
    bindParent
  } = useParent(INDEX_BAR_BIND_INDEX_ANCHOR_KEY);
  if (!bindParent) {
    error('IndexAnchor', 'You should use this component in "IndexBar"');
  }
  return {
    index,
    indexBar: parentProvider,
    bindIndexBar: bindParent
  };
}