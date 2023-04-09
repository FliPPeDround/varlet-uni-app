import { useParent } from '@varlet/use'
import { error } from '../utils/logger'
import { TABS_BIND_TAB_KEY, type TabsProvider } from '../tabs/provide'
import type { ComputedRef } from 'vue'

export interface TabProvider {
  name: ComputedRef<number | string | undefined>
  index: ComputedRef<number>
  disabled: ComputedRef<boolean>
  element: ComputedRef<HTMLElement | null>
}

export function useTabs() {
  const { parentProvider, bindParent, index } = useParent<TabsProvider, TabProvider>(TABS_BIND_TAB_KEY)

  if (!bindParent) {
    error('Tab', '<var-tab/> must in <var-tabs/>')
  }

  return {
    index,
    tabs: parentProvider,
    bindTabs: bindParent,
  }
}
