import { useParent } from '@varlet/use';
import { error } from '../utils/logger.mjs';
import { SWIPE_BIND_SWIPE_ITEM_KEY } from '../swipe/provide.mjs';
export function useSwipe() {
  var {
    bindParent,
    index,
    parentProvider
  } = useParent(SWIPE_BIND_SWIPE_ITEM_KEY);
  if (!bindParent) {
    error('SwipeItem', '<var-swipe-item/> must in <var-swipe/>');
  }
  return {
    index,
    swipe: parentProvider,
    bindSwipe: bindParent
  };
}