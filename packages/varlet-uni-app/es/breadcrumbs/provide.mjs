import { useChildren } from '@varlet/use';
export var BREADCRUMBS_BIND_BREADCRUMB_ITEM_KEY = Symbol('BREADCRUMBS_BIND_BREADCRUMB_KEY');
export function useBreadcrumbsList() {
  var {
    childProviders,
    bindChildren,
    length
  } = useChildren(BREADCRUMBS_BIND_BREADCRUMB_ITEM_KEY);
  return {
    length,
    breadcrumbList: childProviders,
    bindBreadcrumbList: bindChildren
  };
}