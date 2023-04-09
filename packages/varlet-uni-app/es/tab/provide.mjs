import { useParent } from '@varlet/use';
import { error } from '../utils/logger.mjs';
import { TABS_BIND_TAB_KEY } from '../tabs/provide.mjs';
export function useTabs() {
  var {
    parentProvider,
    bindParent,
    index
  } = useParent(TABS_BIND_TAB_KEY);
  if (!bindParent) {
    error('Tab', '<var-tab/> must in <var-tabs/>');
  }
  return {
    index,
    tabs: parentProvider,
    bindTabs: bindParent
  };
}