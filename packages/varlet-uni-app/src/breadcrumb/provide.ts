import { useParent } from '@varlet/use'
import { error } from '../utils/logger'
import { BREADCRUMBS_BIND_BREADCRUMB_ITEM_KEY, type BreadcrumbsProvider } from '../breadcrumbs/provide'

export function useBreadcrumb() {
  const { parentProvider, bindParent, index } = useParent<BreadcrumbsProvider, null>(
    BREADCRUMBS_BIND_BREADCRUMB_ITEM_KEY
  )

  if (!bindParent) {
    error('Breadcrumb', '<var-breadcrumb/> must in <var-breadcrumbs/>')
  }

  return {
    index,
    breadcrumb: parentProvider,
    bindBreadcrumb: bindParent,
  }
}
