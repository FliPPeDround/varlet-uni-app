import { useParent } from '@varlet/use';
import { error } from '../utils/logger.mjs';
import { BREADCRUMBS_BIND_BREADCRUMB_ITEM_KEY } from '../breadcrumbs/provide.mjs';
export function useBreadcrumb() {
  var {
    parentProvider,
    bindParent,
    index
  } = useParent(BREADCRUMBS_BIND_BREADCRUMB_ITEM_KEY);
  if (!bindParent) {
    error('Breadcrumb', '<var-breadcrumb/> must in <var-breadcrumbs/>');
  }
  return {
    index,
    breadcrumb: parentProvider,
    bindBreadcrumb: bindParent
  };
}