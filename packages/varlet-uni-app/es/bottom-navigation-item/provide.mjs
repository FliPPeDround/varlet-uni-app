import { useParent } from '@varlet/use';
import { error } from '../utils/logger.mjs';
import { BOTTOM_NAVIGATION_BIND_BOTTOM_NAVIGATION_ITEM_KEY } from '../bottom-navigation/provide.mjs';
export function useBottomNavigation() {
  var {
    parentProvider,
    index,
    bindParent
  } = useParent(BOTTOM_NAVIGATION_BIND_BOTTOM_NAVIGATION_ITEM_KEY);
  if (!bindParent) {
    error('BottomNavigationItem', '<var-bottom-navigation-item/> must in <var-bottom-navigation/>');
  }
  return {
    index,
    bottomNavigation: parentProvider,
    bindBottomNavigation: bindParent
  };
}