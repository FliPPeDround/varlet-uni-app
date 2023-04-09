import { useParent } from '@varlet/use';
import { error } from '../utils/logger.mjs';
import { TABS_ITEMS_BIND_TAB_ITEM_KEY } from '../tabs-items/provide.mjs';
export function useTabsItems() {
  var {
    parentProvider,
    bindParent,
    index
  } = useParent(TABS_ITEMS_BIND_TAB_ITEM_KEY);
  if (!bindParent) {
    error('TabItem', '<var-tab-item/> must in <var-tabs-items/>');
  }
  return {
    index,
    tabsItems: parentProvider,
    bindTabsItems: bindParent
  };
}